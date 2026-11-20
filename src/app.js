'use strict';
/* ==========================================================
   Nihongo Quest — lógica do app
   ========================================================== */
const APP_VERSION = '2.0.0';
const SCHEMA_VERSION = 2;
const SAVE_KEY = 'nihongoQuest:save';
const BACKUP_KEY = 'nihongoQuest:backup';
const PASS = 80;
const SRS_DAYS = [0, 1, 2, 4, 7, 15];

/* ---------- utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const sp = s => { const i = String(s).indexOf('|'); return i < 0 ? { jp: String(s), ro: '' } : { jp: s.slice(0, i), ro: s.slice(i + 1) }; };
const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function dayDiff(a, b) { const pa = a.split('-').map(Number), pb = b.split('-').map(Number); return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86400000); }
const isPlainObj = o => o && typeof o === 'object' && !Array.isArray(o);
const isKanaOnly = s => /^[぀-ゟ゠-ヿ]+$/.test(s);

/* ---------- índice do conteúdo ---------- */
const LESSON = {}, ITEM = {}, CAT = {};
const ALL_LESSONS = [];
CATS.forEach(c => {
  CAT[c.id] = c;
  c.lessons.forEach((l, i) => {
    l.cat = c; l.index = i; LESSON[l.id] = l; ALL_LESSONS.push(l);
    l.items.forEach(it => { it.id = l.id + ':' + it.k; it.lesson = l; ITEM[it.id] = it; });
  });
});
const TOTAL_LESSONS = ALL_LESSONS.length;
/* itens da Academia Auditiva (2.0) entram no mesmo índice, com ids estáveis "pacote:chave" */
const AUDIO_CAT = { id: 'aud', title: 'Academia Auditiva' };
AUDIO_PACKS.forEach(pk => {
  pk.kind = 'audio'; pk.cat = AUDIO_CAT; pk.index = 0;
  pk.items.forEach(it => { it.id = pk.id + ':' + it.k; it.lesson = pk; it.group = pk.group; if (!it.say) it.say = it.jp; ITEM[it.id] = it; });
});
Object.keys(EXTEND).forEach(id => { if (ITEM[id]) Object.assign(ITEM[id], EXTEND[id]); });

/* ---------- salvamento ---------- */
function defaultState() {
  return {
    schemaVersion: SCHEMA_VERSION, appVersion: APP_VERSION, createdAt: Date.now(), updatedAt: Date.now(),
    profile: { name: '', onboarded: false },
    xp: 0, coins: 20,
    streak: { current: 0, best: 0, last: null, freezes: 1 },
    lessons: {}, catExams: {}, items: {}, history: [],
    achievements: {}, daily: { day: null, missions: [] },
    stats: { answers: 0, correct: 0, lessonsPassed: 0, perfect: 0, reviews: 0, missionsDone: 0, studyDays: 0 },
    shop: { owned: [], equipped: null },
    flags: { comeback: false },
    settings: { romaji: true, sound: true, theme: 'system', rate: 'normal', academyMode: 'trad' },
    listening: defaultListening(),
    discoveries: {}
  };
}
function defaultListening() {
  const ac = () => ({ a: 0, c: 0 });
  return {
    level: 'iniciante',
    stats: { answers: 0, correct: 0, ms: 0, sessions: 0,
      byLevel: { iniciante: ac(), intermediario: ac(), avancado: ac() },
      byType: { palavra: ac(), som: ac(), frase: ac(), expressao: ac(), anime: ac(), dialogo: ac() } },
    recognized: {}, phrases: {}, dialogs: {}
  };
}
/* Migrações: MIGRATIONS[n] converte um save da versão n para n+1.
   Futuras versões: adicione MIGRATIONS[1] = s => {...; return s} e aumente SCHEMA_VERSION. */
const MIGRATIONS = {
  0: s => { // saves sem versão (protótipos) -> v1
    if (typeof s.xp !== 'number') s.xp = Number(s.xp) || 0;
    if (s.completed && !s.lessons) { s.lessons = {}; Object.keys(s.completed).forEach(id => { s.lessons[id] = { passed: true, best: 80, attempts: 1 }; }); delete s.completed; }
    return s;
  },
  1: s => { // 1.0 -> 2.0: só ACRESCENTA campos; nada da v1 é removido ou alterado
    if (!isPlainObj(s.listening)) s.listening = defaultListening();
    if (!isPlainObj(s.discoveries)) s.discoveries = {};
    if (!isPlainObj(s.settings)) s.settings = {};
    if (!s.settings.rate) s.settings.rate = 'normal';
    if (!s.settings.academyMode) s.settings.academyMode = 'trad';
    s.migratedFrom = s.migratedFrom || { schema: 1, at: Date.now() };
    return s;
  }
};
function fillDefaults(target, def) {
  Object.keys(def).forEach(k => {
    if (!(k in target) || target[k] === null && def[k] !== null) target[k] = def[k];
    else if (isPlainObj(def[k]) && isPlainObj(target[k]) && Object.keys(def[k]).length) fillDefaults(target[k], def[k]);
  });
  return target;
}
let storageOK = true, loadNotice = '';
function normalize(data) {
  if (!isPlainObj(data)) throw new Error('Formato inválido');
  let v = Number(data.schemaVersion) || 0;
  let s = JSON.parse(JSON.stringify(data));
  if (v > SCHEMA_VERSION) loadNotice = 'Este progresso foi salvo por uma versão mais nova do app. Tudo foi mantido.';
  while (v < SCHEMA_VERSION) { const m = MIGRATIONS[v]; if (m) s = m(s) || s; v++; s.schemaVersion = v; }
  s = fillDefaults(s, defaultState());
  ['lessons', 'catExams', 'items', 'achievements'].forEach(k => { if (!isPlainObj(s[k])) s[k] = {}; });
  if (!Array.isArray(s.history)) s.history = [];
  if (!Array.isArray(s.shop.owned)) s.shop.owned = [];
  if (!Array.isArray(s.daily.missions)) s.daily.missions = [];
  s.xp = Math.max(0, Number(s.xp) || 0); s.coins = Math.max(0, Number(s.coins) || 0);
  s.schemaVersion = Math.max(SCHEMA_VERSION, Number(data.schemaVersion) || 0);
  s.appVersion = APP_VERSION;
  return s;
}
function load() {
  let raw = null;
  try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { storageOK = false; }
  if (!raw) return defaultState();
  try {
    const data = JSON.parse(raw);
    const oldV = Number(data.schemaVersion) || 0;
    if (oldV < SCHEMA_VERSION) {
      // cópia de segurança antes de migrar: chave padrão + uma por versão que nunca é sobrescrita
      try { localStorage.setItem(BACKUP_KEY, raw); } catch (e) {}
      try { const k = BACKUP_KEY + ':schema' + oldV; if (!localStorage.getItem(k)) localStorage.setItem(k, raw); } catch (e) {}
    }
    return normalize(data);
  } catch (e) {
    try { localStorage.setItem(SAVE_KEY + ':corrompido:' + Date.now(), raw); } catch (_) {}
    loadNotice = 'Não consegui ler o progresso salvo. Uma cópia foi guardada e um novo perfil foi criado.';
    return defaultState();
  }
}
let S = load();
let saveTimer = null;
let saveSuspended = false;
function saveNow() {
  clearTimeout(saveTimer); saveTimer = null;
  if (saveSuspended) return;
  S.updatedAt = Date.now();
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); storageOK = true; }
  catch (e) { if (storageOK) toast('!', 'Não foi possível salvar automaticamente. Use Perfil → Exportar progresso.'); storageOK = false; }
}
function save() { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 250); }
window.addEventListener('pagehide', saveNow);
// outra aba salvou progresso: recarrega para não sobrescrever com dados antigos
window.addEventListener('storage', e => { if (e.key === SAVE_KEY && e.newValue && !P) { try { S = normalize(JSON.parse(e.newValue)); applyTheme(); render(); } catch (_) {} } });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });

/* ---------- níveis, XP, moedas ---------- */
function levelInfo(xp) { let L = 1, need = 100, rem = xp; while (rem >= need) { rem -= need; L++; need = 100 + (L - 1) * 50; } return { level: L, into: rem, need }; }
function rankOf(L) { let r = RANKS[0]; RANKS.forEach(x => { if (L >= x.min) r = x; }); return r; }
let pending = []; // celebrações a exibir depois da lição
let sessionGain = null; // {xp, coins} durante uma sessão de estudo
function addXP(n, quiet) {
  if (n <= 0) return;
  const before = levelInfo(S.xp).level;
  S.xp += n;
  if (sessionGain) sessionGain.xp += n;
  if (!quiet) missionEvent('xp', n);
  const after = levelInfo(S.xp).level;
  if (after > before) pending.push({ type: 'level', level: after });
  save();
}
function addCoins(n) { if (n <= 0) return; S.coins += n; if (sessionGain) sessionGain.coins += n; save(); }

/* ---------- sequência diária (sem punição pesada) ---------- */
function streakView() {
  const st = S.streak, today = dayKey();
  if (!st.last) return { n: 0, state: 'new' };
  const d = dayDiff(st.last, today);
  if (d === 0) return { n: st.current, state: 'done' };
  if (d === 1) return { n: st.current, state: 'pending' };
  if (d - 1 <= st.freezes) return { n: st.current, state: 'protected' };
  return { n: 0, state: 'broken' };
}
function touchStudy() {
  const st = S.streak, today = dayKey();
  if (st.last === today) return;
  if (!st.last) st.current = 1;
  else {
    const d = dayDiff(st.last, today);
    if (d === 1) st.current++;
    else if (d > 1) {
      const missed = d - 1;
      if (st.freezes >= missed) { st.freezes -= missed; st.current++; toast('盾', missed === 1 ? 'Um protetor guardou sua sequência!' : missed + ' protetores guardaram sua sequência!'); }
      else { st.current = 1; }
      if (d >= 4) S.flags.comeback = true;
    } else st.current = Math.max(1, st.current);
  }
  st.last = today; st.best = Math.max(st.best, st.current); S.stats.studyDays++;
  save();
}

/* ---------- missões diárias ---------- */
function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function ensureDaily() {
  const today = dayKey();
  if (S.daily.day === today && S.daily.missions.length) return;
  let h = hashStr(today), pool = MISSION_POOL.slice(), chosen = [];
  while (chosen.length < 3 && pool.length) { const i = h % pool.length; chosen.push(pool.splice(i, 1)[0]); h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0; }
  S.daily = { day: today, missions: chosen.map(m => ({ id: m.id, progress: 0, claimed: false })) };
  save();
}
function missionEvent(ev, n = 1) {
  ensureDaily();
  S.daily.missions.forEach(m => {
    const def = MISSION_POOL.find(x => x.id === m.id); if (!def || def.ev !== ev || m.claimed) return;
    const was = m.progress >= def.goal;
    m.progress = Math.min(def.goal, m.progress + n);
    if (!was && m.progress >= def.goal) toast('任', 'Missão concluída: ' + def.txt + '. Resgate a recompensa no Início!');
  });
  save(); updateTabDots();
}
function claimMission(id) {
  const m = S.daily.missions.find(x => x.id === id), def = MISSION_POOL.find(x => x.id === id);
  if (!m || !def || m.claimed || m.progress < def.goal) return;
  m.claimed = true; S.stats.missionsDone++;
  addCoins(def.coins); addXP(def.xp, true);
  sfx('coin'); toast('金', '+' + def.coins + ' moedas' + (def.xp ? ' e +' + def.xp + ' XP' : '') + '!');
  checkAchievements(); flushPending(); render();
}

/* ---------- conquistas ---------- */
function countPassed(s) { return ALL_LESSONS.filter(l => s.lessons[l.id] && s.lessons[l.id].passed).length; }
function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (S.achievements[a.id]) return;
    let ok = false; try { ok = a.test(S); } catch (e) {}
    if (ok) { S.achievements[a.id] = Date.now(); addCoins(20); toast(a.icon, 'Conquista: ' + a.name + ' (+20 moedas)'); sfx('level'); }
  });
  save();
}

/* ---------- revisão espaçada ---------- */
function rec(id) { return S.items[id] || (S.items[id] = { seen: 0, c: 0, w: 0, box: 0, due: 0, last: 0 }); }
function markSeen(id) { const r = rec(id); if (!r.seen) { r.seen = Date.now(); save(); } }
function recordAnswer(id, ok, ctx) {
  S.stats.answers++; if (ok) S.stats.correct++;
  missionEvent('answer'); if (ok) missionEvent('correct');
  if (id && ITEM[id]) {
    const r = rec(id); if (!r.seen) r.seen = Date.now();
    if (ok) { r.c++; r.box = Math.min(5, r.box + 1); } else { r.w++; r.box = 0; }
    r.due = Date.now() + SRS_DAYS[r.box] * 86400000; r.last = Date.now();
  }
  S.history.push({ t: Date.now(), id: id || null, ok: !!ok, ctx });
  if (S.history.length > 400) S.history.splice(0, S.history.length - 400);
  save();
}
function itemStatus(id) {
  const r = S.items[id];
  if (!r || r.c + r.w === 0) return 'nova';
  if (r.box >= 3) return 'dominada';
  if (r.w > 0 && r.box < 2) return 'revisar';
  return 'aprendendo';
}
const STATUS_LABEL = { nova: 'Nova', aprendendo: 'Aprendendo', dominada: 'Dominada', revisar: 'Revisar' };
function seenItems() { return Object.keys(S.items).filter(id => ITEM[id] && S.items[id].seen); }
function dueItems() { const now = Date.now(); return seenItems().filter(id => { const r = S.items[id]; return (r.c + r.w > 0 && r.due <= now && r.box < 5) || itemStatus(id) === 'revisar'; }); }

/* ---------- desbloqueio ---------- */
const lessonPassed = id => !!(S.lessons[id] && S.lessons[id].passed);
const catPassed = id => !!(S.catExams[id] && S.catExams[id].passed);
const catHasContent = c => c.lessons.length > 0;
function catUnlocked(c) { return !c.requires || catPassed(c.requires); }
function lessonUnlocked(l) { return catUnlocked(l.cat) && (l.index === 0 || lessonPassed(l.cat.lessons[l.index - 1].id)); }
function examUnlocked(c) { return catUnlocked(c) && catHasContent(c) && c.lessons.every(l => lessonPassed(l.id)); }
function catProgress(c) { const tot = c.lessons.length + (catHasContent(c) ? 1 : 0); const done = c.lessons.filter(l => lessonPassed(l.id)).length + (catPassed(c.id) ? 1 : 0); return { done, tot }; }
function overallProgress() { let d = 0, t = 0; CATS.forEach(c => { const p = catProgress(c); d += p.done; t += p.tot; }); return t ? Math.round(d / t * 100) : 0; }
function nextStep() {
  for (const c of CATS) {
    if (!catUnlocked(c) || !catHasContent(c)) continue;
    for (const l of c.lessons) if (!lessonPassed(l.id)) return { lesson: l };
    if (!catPassed(c.id)) return { exam: c };
  }
  return null;
}
function reqText(c) { if (c.reqNote) return c.reqNote; const r = CAT[c.requires]; return r ? 'Passe na avaliação final de “' + r.title + '” para liberar.' : ''; }

/* ---------- números dinâmicos (11–100) ---------- */
const DIG = [null, ['いち', 'ichi'], ['に', 'ni'], ['さん', 'san'], ['よん', 'yon'], ['ご', 'go'], ['ろく', 'roku'], ['なな', 'nana'], ['はち', 'hachi'], ['きゅう', 'kyuu']];
function numJp(n) {
  if (n === 100) return { jp: 'ひゃく', ro: 'hyaku', how: '100 tem palavra própria: ひゃく.' };
  if (n <= 9) return { jp: DIG[n][0], ro: DIG[n][1], how: '' };
  if (n === 10) return { jp: 'じゅう', ro: 'juu', how: '' };
  const t = Math.floor(n / 10), o = n % 10;
  const jp = (t > 1 ? DIG[t][0] : '') + 'じゅう' + (o ? DIG[o][0] : '');
  const ro = (t > 1 ? DIG[t][1] : '') + 'juu' + (o ? DIG[o][1] : '');
  const how = (t > 1 ? t + ' × 10' : '10') + (o ? ' + ' + o : '') + ' = ' + (t > 1 ? DIG[t][0] + ' + ' : '') + 'じゅう' + (o ? ' + ' + DIG[o][0] : '');
  return { jp, ro, how };
}
function numDistractors(n) {
  const set = new Set(), t = Math.floor(n / 10), o = n % 10;
  const cands = [n + 1, n - 1, n + 10, n - 10, o * 10 + t, t * 10 + ((o + 2) % 10), n + 5];
  cands.forEach(x => { if (x >= 11 && x <= 99 && x !== n) set.add(x); });
  while (set.size < 3) { const x = 11 + Math.floor(Math.random() * 89); if (x !== n) set.add(x); }
  return shuffle([...set]).slice(0, 3);
}
function genNumQ() {
  const n = 11 + Math.floor(Math.random() * 89), J = numJp(n);
  if (Math.random() < .5) return { type: 'num_type', prompt: 'Escreva este número em algarismos', jp: J.jp, ro: J.ro, answer: n, answerText: String(n), explain: J.jp + ' (' + J.ro + ') = ' + n + '. ' + J.how, itemId: null };
  const opts = shuffle([n, ...numDistractors(n)]).map(x => { const k = numJp(x); return { label: k.jp, sub: k.ro, correct: x === n }; });
  return { type: 'mc', prompt: 'Como se diz este número em japonês?', big: String(n), bigClass: 'pt', options: opts, explain: n + ' = ' + J.jp + ' (' + J.ro + '). ' + J.how, answerText: J.jp + ' (' + J.ro + ')', itemId: null };
}

/* ---------- geração de perguntas ---------- */
function poolFor(item, n, field) {
  const same = item.lesson.items.filter(x => x !== item);
  const kind = item.lesson.kind;
  let others = ALL_LESSONS.filter(l => l !== item.lesson && l.kind === kind).flatMap(l => l.items);
  const seen = new Set([item[field]]); const out = [];
  for (const x of shuffle(same).concat(shuffle(others))) { if (out.length >= n) break; if (seen.has(x[field])) continue; seen.add(x[field]); out.push(x); }
  return out;
}
function explainItem(it) { return it.jp + ' (' + it.ro + ') = ' + it.pt + '. ' + (it.note || ''); }
function genItemQ(it, forceType) {
  const kind = it.lesson.kind;
  if (kind === 'audio') return genListenQ(it, it.group === 'frase' ? 'phrase' : 'word', S.listening.level);
  const types = { number: ['num_type', 'num_pick', 'jp2pt'], vocab: ['jp2pt', 'pt2jp'], grammar: ['jp2pt', 'pt2jp'], kana: ['kana_read', 'kana_find'], kanaword: ['word_read', 'jp2pt', 'pt2jp'] }[kind];
  const type = forceType || pick(types);
  const base = { itemId: it.id, explain: explainItem(it) };
  if (type === 'num_type') return { ...base, type: 'num_type', prompt: 'Escreva este número em algarismos', jp: it.jp, ro: it.ro, answer: it.val, answerText: String(it.val) };
  if (type === 'num_pick') { const d = poolFor(it, 3, 'jp'); return { ...base, type: 'mc', prompt: 'Como se diz este número em japonês?', big: String(it.val), bigClass: 'pt', options: shuffle([it, ...d]).map(x => ({ label: x.jp, sub: x.ro, correct: x === it })), answerText: it.jp + ' (' + it.ro + ')' }; }
  if (type === 'kana_read' || type === 'word_read') { const d = poolFor(it, 3, 'ro'); return { ...base, type: 'mc', grid: true, prompt: type === 'kana_read' ? 'Qual é o som deste caractere?' : 'Como se lê esta palavra?', big: it.jp, bigClass: type === 'kana_read' ? 'huge' : '', noRomaji: true, options: shuffle([it, ...d]).map(x => ({ label: x.ro, correct: x === it, plain: true })), answerText: it.ro }; }
  if (type === 'kana_find') { const d = poolFor(it, 3, 'jp'); return { ...base, type: 'mc', grid: true, prompt: 'Encontre o caractere com o som “' + it.ro + '”', big: '“' + it.ro + '”', bigClass: 'pt', noRomaji: true, options: shuffle([it, ...d]).map(x => ({ label: x.jp, kana: true, correct: x === it })), answerText: it.jp }; }
  if (type === 'pt2jp') { const d = poolFor(it, 3, 'jp'); return { ...base, type: 'mc', prompt: kind === 'grammar' ? 'Escolha a frase em japonês' : 'Como se diz em japonês?', big: it.pt, bigClass: 'pt', options: shuffle([it, ...d]).map(x => ({ label: x.jp, sub: x.ro, correct: x === it })), answerText: it.jp + ' (' + it.ro + ')' }; }
  // jp2pt
  const d = poolFor(it, 3, 'pt');
  return { ...base, type: 'mc', prompt: kind === 'grammar' ? 'O que significa esta frase?' : kind === 'number' ? 'Que número é este?' : 'Escolha a tradução correta', big: it.jp, ro: it.ro, noRomaji: kind === 'kanaword', options: shuffle([it, ...d]).map(x => ({ label: x.pt, plain: true, correct: x === it })), answerText: it.pt };
}
function genMatch(items) {
  const kind = items[0].lesson.kind;
  const right = it => kind === 'kana' ? it.ro : kind === 'number' ? String(it.val) : it.pt;
  const L = items.map((it, i) => ({ i, label: it.jp, sub: kind === 'kana' || kind === 'kanaword' ? '' : it.ro, kana: kind === 'kana' }));
  const R = shuffle(items.map((it, i) => ({ i, label: right(it) })));
  return { type: 'match', prompt: kind === 'kana' ? 'Ligue cada caractere ao seu som' : 'Ligue os pares correspondentes', left: shuffle(L), right: R, items: items.map(x => x.id), explain: items.map(it => it.jp + ' = ' + right(it)).join(' · ') };
}
function authoredQ(ex, lesson) {
  const base = { explain: ex.explain, itemId: null, authored: true, lessonId: lesson.id, noRomaji: !!ex.noRomaji };
  if (ex.t === 'fill' || ex.t === 'situation') {
    const opts = ex.opts.map((o, i) => { const s = sp(o); return { label: s.jp, sub: s.ro, correct: i === ex.ans, kana: ex.noRomaji && isKanaOnly(s.jp) && s.jp.length <= 2 }; });
    const right = sp(ex.opts[ex.ans]);
    return { ...base, type: 'mc', grid: ex.noRomaji, tag: ex.t === 'fill' ? 'Complete a frase' : 'Situação', prompt: ex.prompt, big: ex.t === 'fill' ? ex.jp : '', bigClass: 'fill', ctx: ex.pt, options: shuffle(opts), answerText: right.jp + (right.ro ? ' (' + right.ro + ')' : '') };
  }
  if (ex.t === 'order' || ex.t === 'translate') {
    const isT = ex.t === 'translate';
    const tiles = ex.tiles.map(sp), extra = (ex.extra || []).map(sp);
    return { ...base, type: 'build', prompt: isT ? 'Traduza para o português' : (ex.prompt || 'Organize as palavras'), ctx: isT ? '' : ex.pt, jp: isT ? ex.jp : '', ro: isT ? ex.ro : '', bank: shuffle(tiles.concat(extra)), answer: tiles.map(t => t.jp), answerText: tiles.map(t => t.jp).join(isT ? ' ' : (ex.noRomaji ? '' : ' ')), plainTiles: isT, kanaTiles: ex.noRomaji };
  }
  if (ex.t === 'error') {
    const toks = ex.tokens.map(sp);
    return { ...base, type: 'error', prompt: 'Toque na parte errada da frase', ctx: ex.ctx, tokens: toks, wrong: ex.wrong, answerText: 'A parte errada é “' + toks[ex.wrong].jp + '”.' };
  }
  return null;
}
function reviewPool(excludeLesson) {
  // itens de lições anteriores, priorizando os mais errados
  return seenItems().map(id => ITEM[id]).filter(it => it.lesson !== excludeLesson)
    .sort((a, b) => ((S.items[b.id].w - S.items[b.id].c * .3) - (S.items[a.id].w - S.items[a.id].c * .3)) + (Math.random() - .5));
}
function buildPractice(L) {
  const items = shuffle(L.items), qs = [];
  items.slice(0, 5).forEach(it => qs.push(genItemQ(it)));
  if (items.length >= 4) qs.splice(1, 0, genMatch(items.slice(0, 4)));
  shuffle(L.exercises || []).slice(0, 2).forEach(ex => { const q = authoredQ(ex, L); if (q) qs.push(q); });
  if (L.dyn) qs.push(genNumQ());
  return qs;
}
function buildExam(L) {
  const items = shuffle(L.items), qs = [];
  const nGen = L.dyn ? 4 : 5;
  items.slice(0, nGen).forEach(it => qs.push(genItemQ(it)));
  shuffle(L.exercises || []).slice(0, 3).forEach(ex => { const q = authoredQ(ex, L); if (q) qs.push(q); });
  if (items.length >= 8) qs.push(genMatch(items.slice(nGen, nGen + 4).length === 4 ? items.slice(nGen, nGen + 4) : items.slice(0, 4)));
  if (L.dyn) { qs.push(genNumQ()); qs.push(genNumQ()); }
  const rv = reviewPool(L).slice(0, 2).map(it => ({ ...genItemQ(it), review: true }));
  let out = shuffle(qs.concat(rv));
  if (out[0] && out[0].type === 'match') out.push(out.shift());
  return out.slice(0, 12);
}
function buildCatExam(c) {
  let qs = [];
  const lessons = c.lessons.concat((c.examExtra || []).map(id => LESSON[id]));
  const per = Math.max(2, Math.ceil(11 / lessons.length));
  lessons.forEach(L => {
    shuffle(L.items).slice(0, per).forEach(it => qs.push(genItemQ(it)));
    const ex = shuffle(L.exercises || [])[0]; if (ex) { const q = authoredQ(ex, L); if (q) qs.push(q); }
    if (L.dyn) qs.push(genNumQ());
  });
  return shuffle(qs).slice(0, 15);
}
function buildReview(mode) {
  let ids;
  if (mode === 'due') ids = dueItems();
  else if (mode === 'hard') ids = seenItems().filter(id => S.items[id].w > 0).sort((a, b) => S.items[b].w - S.items[a].w);
  else ids = seenItems();
  ids = shuffle(ids);
  if (mode === 'due' && ids.length < 6) ids = ids.concat(shuffle(seenItems().filter(id => !ids.includes(id))).slice(0, 6 - ids.length));
  return ids.slice(0, 10).map(id => genItemQ(ITEM[id]));
}

/* ---------- som e voz ---------- */
let actx = null;
function sfx(kind) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { ok: [[660, .08], [880, .12]], bad: [[220, .16], [180, .18]], coin: [[988, .06], [1319, .14]], level: [[523, .1], [659, .1], [784, .1], [1047, .2]], tap: [[440, .03]] }[kind] || [];
    let t = actx.currentTime;
    seq.forEach(([f, d]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d + .02); t += d * .9; });
  } catch (e) {}
}
/* ---------- ícones ---------- */
const IC = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
  academy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="M2 4c3 1 17 1 20 0"/><path d="M6 7v14M18 7v14"/><path d="M5 12h14"/></svg>',
  review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M9 8h6M9 12h4"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="#ff9d3b" stroke="#ffd877" stroke-width="1.2"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z"/></svg>',
  coin: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#f2b632" stroke="#ffe08a" stroke-width="2"/><rect x="9" y="8" width="6" height="8" rx="1" fill="none" stroke="#8a5a00" stroke-width="1.6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="#ffd877"><path d="M12 2l2.6 6.6L21 9.3l-5 4.4 1.5 6.8L12 17l-5.5 3.5L8 13.7 3 9.3l6.4-.7z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>',
  lock: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="30" height="30" fill="#7690ff" stroke="#ffd877" stroke-width="1.5"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/></svg>'
};

/* ---------- mascote Hikari (SVG original) ---------- */
function mascot(mood = 'happy', size = 90, cls = 'float', acc) {
  acc = acc === undefined ? S.shop.equipped : acc;
  const eyes = {
    happy: '<path d="M41 63q7-9 14 0M65 63q7-9 14 0" stroke="#2a2560" stroke-width="4" fill="none" stroke-linecap="round"/>',
    neutral: '<ellipse cx="48" cy="62" rx="6" ry="8" fill="#2a2560"/><ellipse cx="72" cy="62" rx="6" ry="8" fill="#2a2560"/><circle cx="50" cy="59" r="2.4" fill="#fff"/><circle cx="74" cy="59" r="2.4" fill="#fff"/><circle cx="46" cy="65" r="1.2" fill="#fff"/><circle cx="70" cy="65" r="1.2" fill="#fff"/>',
    sad: '<ellipse cx="48" cy="63" rx="5.5" ry="7" fill="#2a2560"/><ellipse cx="72" cy="63" rx="5.5" ry="7" fill="#2a2560"/><circle cx="50" cy="60" r="2.2" fill="#fff"/><circle cx="74" cy="60" r="2.2" fill="#fff"/><path d="M40 52l12 3M80 52l-12 3" stroke="#2a2560" stroke-width="2.5" stroke-linecap="round"/>',
    wow: '<path d="M48 54l2.2 5.3 5.6.5-4.3 3.7 1.4 5.5L48 66l-4.9 3 1.4-5.5-4.3-3.7 5.6-.5z" fill="#f2a91c"/><path d="M72 54l2.2 5.3 5.6.5-4.3 3.7 1.4 5.5L72 66l-4.9 3 1.4-5.5-4.3-3.7 5.6-.5z" fill="#f2a91c"/>'
  }[mood] || '';
  const mouth = { happy: '<path d="M53 74q7 9 14 0z" fill="#d8476a"/>', neutral: '<path d="M54 75q6 5 12 0" stroke="#2a2560" stroke-width="2.6" fill="none" stroke-linecap="round"/>', sad: '<path d="M54 79q6-5 12 0" stroke="#2a2560" stroke-width="2.6" fill="none" stroke-linecap="round"/>', wow: '<ellipse cx="60" cy="77" rx="5" ry="6" fill="#d8476a"/>' }[mood];
  const accs = {
    sakura: '<g transform="translate(80 30)"><circle cx="0" cy="-6" r="6" fill="#ffb3c7"/><circle cx="6" cy="-1" r="6" fill="#ffb3c7"/><circle cx="3" cy="6" r="6" fill="#ffb3c7"/><circle cx="-4" cy="6" r="6" fill="#ffb3c7"/><circle cx="-6" cy="-1" r="6" fill="#ffb3c7"/><circle cx="0" cy="1" r="3" fill="#f2a91c"/></g>',
    hachimaki: '<path d="M30 46q30-8 60 0v8q-30-8-60 0z" fill="#fff" stroke="#c9cde8" stroke-width="1"/><circle cx="60" cy="47" r="4.5" fill="#d23c55"/><path d="M89 49l14 6-12 4" fill="#fff" stroke="#c9cde8" stroke-width="1"/>',
    wizard: '<path d="M36 36L68 -4 84 36z" fill="#5b3cc4"/><path d="M58 18l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="#ffd877"/><ellipse cx="60" cy="36" rx="30" ry="6" fill="#4a2fa6"/>',
    crown: '<path d="M40 38l4-18 9 10 7-14 7 14 9-10 4 18z" fill="#f2b632" stroke="#b97a00" stroke-width="1.5"/><circle cx="60" cy="31" r="2.6" fill="#d23c55"/>'
  };
  return `<svg class="mascot ${cls}" width="${size}" height="${size}" viewBox="0 -6 120 128" role="img" aria-label="${MASCOT_NAME}, o espírito guia">
    <defs><radialGradient id="mg${size}" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#ffffff"/><stop offset=".65" stop-color="#e4dcff"/><stop offset="1" stop-color="#b9a6ff"/></radialGradient>
    <radialGradient id="mh${size}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd877" stop-opacity=".55"/><stop offset="1" stop-color="#ffd877" stop-opacity="0"/></radialGradient></defs>
    <circle cx="60" cy="62" r="56" fill="url(#mh${size})"/>
    <ellipse cx="60" cy="114" rx="22" ry="4" fill="#2a2560" opacity=".18"/>
    <path d="M60 18c6 12 30 18 32 42 2 24-14 44-32 44S26 84 28 60c1-15 12-22 18-30 4-5 8-9 14-12z" fill="url(#mg${size})" stroke="#9a86f0" stroke-width="2"/>
    <path d="M60 18c2-8 10-12 16-8-6 0-9 4-10 9" fill="#e4dcff" stroke="#9a86f0" stroke-width="2" stroke-linejoin="round"/>
    <path d="M78 6l1.8 4.2 4.2 1.8-4.2 1.8L78 18l-1.8-4.2L72 12l4.2-1.8z" fill="#f2b632"/>
    <ellipse cx="25" cy="78" rx="6" ry="8" fill="url(#mg${size})" stroke="#9a86f0" stroke-width="2" transform="rotate(25 25 78)"/>
    <ellipse cx="95" cy="78" rx="6" ry="8" fill="url(#mg${size})" stroke="#9a86f0" stroke-width="2" transform="rotate(-25 95 78)"/>
    ${eyes}
    <ellipse cx="39" cy="73" rx="6" ry="3.4" fill="#ff8fb0" opacity=".55"/><ellipse cx="81" cy="73" rx="6" ry="3.4" fill="#ff8fb0" opacity=".55"/>
    ${mouth}
    ${acc && accs[acc] ? accs[acc] : ''}
  </svg>`;
}

/* ---------- toasts, modal, confete ---------- */
function toast(icon, text) {
  const box = $('#toasts'); if (!box) return;
  const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
  el.innerHTML = `<span class="ti">${esc(icon)}</span><span>${esc(text)}</span>`;
  box.appendChild(el);
  while (box.children.length > 2) box.firstElementChild.remove();
  setTimeout(() => { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 320); }, 2800);
}
function openModal(html, cls = '') { const m = $('#modal'); m.innerHTML = `<div class="sheet wrap ${cls}" role="dialog" aria-modal="true">${html}</div>`; m.hidden = false; }
function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; setTimeout(flushPending, 50); }
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('div'); c.className = 'confetti';
  const cols = ['#f2b632', '#6c43dd', '#3553d1', '#ffffff', '#ff8fb0'];
  for (let i = 0; i < 46; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = pick(cols); p.style.animationDuration = 1.6 + Math.random() * 1.6 + 's'; p.style.animationDelay = Math.random() * .4 + 's'; c.appendChild(p); }
  document.body.appendChild(c); setTimeout(() => c.remove(), 3800);
}
function flushPending() {
  if (P || !$('#modal').hidden || !pending.length) return;
  const ev = pending.shift();
  if (ev.type === 'level') {
    const r = rankOf(ev.level); sfx('level'); confetti();
    openModal(`<div class="stack" style="align-items:center">${mascot('wow', 120, 'hop')}<span class="eyebrow">Subiu de nível!</span><h2>Nível ${ev.level}</h2><p class="muted" style="margin:0">Título: <b>${esc(r.name)}</b> <span class="jp">${esc(r.jp)}</span></p><p style="margin:0">${MASCOT_NAME}: “Você está brilhando cada vez mais! Vamos continuar?”</p><button class="btn btn-gold btn-block" data-act="closeModal">Continuar</button></div>`, 'center');
  } else if (ev.type === 'comeback') {
    openModal(`<div class="stack" style="align-items:center">${mascot('happy', 110, 'hop')}<h2>Que bom te ver de novo!</h2><p style="margin:0">Sua sequência recomeça hoje, mas <b>todo o seu XP, moedas, conquistas e lições continuam aqui</b>. Uma liçãozinha já coloca a chama acesa de novo.</p><button class="btn btn-primary btn-block" data-act="closeModal">Vamos lá!</button></div>`, 'center');
  }
}

/* ==========================================================
   TELAS PRINCIPAIS
   ========================================================== */
let view = 'inicio';
const VIEWS = ['inicio', 'academia', 'revisao', 'caderno', 'perfil'];
const nb = { q: '', f: 'todas' };

function render() {
  const root = $('#view');
  if (!S.profile.onboarded) { root.innerHTML = viewWelcome(); $('#tabbar').hidden = true; return; }
  $('#tabbar').hidden = false;
  ensureDaily();
  root.innerHTML = ({ inicio: viewHome, academia: viewAcademyRoot, revisao: viewReview, caderno: viewNotebook, perfil: viewProfile }[view] || viewHome)();
  document.querySelectorAll('.tab').forEach(t => { t.classList.toggle('active', t.dataset.view === view); t.setAttribute('aria-current', t.dataset.view === view ? 'page' : 'false'); });
  updateTabDots();
}
function updateTabDots() {
  const tabs = document.querySelectorAll('.tab'); if (!tabs.length) return;
  const claim = S.daily.missions.some(m => { const d = MISSION_POOL.find(x => x.id === m.id); return d && !m.claimed && m.progress >= d.goal; });
  const due = dueItems().length > 0;
  tabs.forEach(t => { const dot = t.querySelector('.dot'); const on = (t.dataset.view === 'inicio' && claim) || (t.dataset.view === 'revisao' && due); if (dot) dot.hidden = !on; });
}
function go(v) { if (!VIEWS.includes(v)) v = 'inicio'; view = v; if (location.hash !== '#' + v) { try { history.replaceState(null, '', '#' + v); } catch (e) { location.hash = v; } } render(); window.scrollTo(0, 0); }

function viewWelcome() {
  return `<div class="welcome wrap">
    ${mascot('happy', 150, 'float', null)}
    <div><div class="jp-title jp">日本語クエスト</div><h1>Nihongo Quest</h1><p class="muted" style="margin:4px 0 0">Academia de japonês para brasileiros</p></div>
    <div class="bubble"><b>${MASCOT_NAME}:</b> Olá! Eu sou ${MASCOT_NAME} (ひかり, “luz”), o espírito guardião da Academia. Vou te acompanhar do zero até suas primeiras frases em japonês. Como posso te chamar?</div>
    <label for="nameInput" class="eyebrow" style="align-self:flex-start">Seu nome</label>
    <input id="nameInput" maxlength="24" placeholder="Digite seu nome" autocomplete="nickname">
    <button class="btn btn-gold btn-block" data-act="onboard">Entrar na Academia</button>
    <p class="muted" style="font-size:.85rem;margin:0">Seu progresso fica salvo neste aparelho. Você pode exportá-lo no Perfil.</p>
    ${!storageOK ? '<div class="banner">Este navegador não permite salvamento automático (modo anônimo?). Use Exportar progresso no Perfil para não perder nada.</div>' : ''}
  </div>`;
}

function viewHome() {
  const li = levelInfo(S.xp), r = rankOf(li.level), st = streakView(), nx = nextStep(), prog = overallProgress();
  const stLabel = { new: 'Estude hoje para começar sua sequência!', done: 'Sequência garantida hoje. Muito bem!', pending: 'Estude hoje para manter sua sequência.', protected: 'Sua sequência está protegida. Estude hoje!', broken: 'Recomece hoje: seu progresso continua salvo.' }[st.state];
  let cont;
  if (nx && nx.lesson) cont = `<div class="card continue-card"><div class="emb jp">${esc(nx.lesson.emblem)}</div><div class="meta"><span class="eyebrow">${esc(nx.lesson.cat.title)} · Lição ${nx.lesson.index + 1}</span><h3>${esc(nx.lesson.title)}</h3></div></div><button class="btn btn-gold btn-block" data-act="startLesson" data-id="${nx.lesson.id}">${S.lessons[nx.lesson.id] ? 'Continuar lição' : 'Começar próxima lição'}</button>`;
  else if (nx && nx.exam) cont = `<div class="card continue-card"><div class="emb jp">${esc(nx.exam.emblem)}</div><div class="meta"><span class="eyebrow">Avaliação final</span><h3>${esc(nx.exam.title)}</h3></div></div><button class="btn btn-gold btn-block" data-act="openCatExam" data-cat="${nx.exam.id}">Fazer avaliação final</button>`;
  else cont = `<div class="card"><h3>Você concluiu todo o conteúdo da versão 1.0!</h3><p class="muted" style="margin:6px 0 0">Continue revisando para dominar cada palavra. Novas categorias chegam nas próximas atualizações.</p></div><button class="btn btn-gold btn-block" data-act="startReview" data-mode="due">Revisar agora</button>`;
  const missions = S.daily.missions.map(m => {
    const d = MISSION_POOL.find(x => x.id === m.id); if (!d) return '';
    const done = m.progress >= d.goal;
    return `<div class="mission"><div class="m-ic jp">任</div><div class="m-body"><span class="m-txt">${esc(d.txt)}</span><div class="bar light"><i style="width:${Math.round(m.progress / d.goal * 100)}%"></i></div><span class="m-sub">${m.progress}/${d.goal} · +${d.coins} moedas${d.xp ? ' · +' + d.xp + ' XP' : ''}</span></div>${m.claimed ? '<span class="done-chip">Resgatada</span>' : `<button class="btn btn-small ${done ? 'btn-gold' : 'btn-ghost'}" data-act="claim" data-id="${m.id}" ${done ? '' : 'disabled'}>Resgatar</button>`}</div>`;
  }).join('');
  const cats = CATS.map(c => {
    const p = catProgress(c), unlocked = catUnlocked(c), has = catHasContent(c);
    const status = !has ? 'Em breve' : !unlocked ? 'Bloqueada' : p.done + '/' + p.tot + ' concluídas';
    return `<button class="cat-tile ${unlocked && has ? '' : 'locked'}" data-act="gotoCat" data-cat="${c.id}"><span class="emb">${esc(c.emblem)}</span><span class="t">${c.num}. ${esc(c.title)}</span><span class="s">${status}</span></button>`;
  }).join('');
  return `<header class="hero"><div class="hero-in wrap">
      <div class="brand"><div class="brand-name"><span class="jp">日本語クエスト</span><strong>Nihongo Quest</strong></div>
      <div class="pill-row"><span class="stat-pill" title="Sequência de dias">${IC.fire}${st.n}</span><span class="stat-pill" title="Moedas">${IC.coin}${S.coins}</span></div></div>
      <div class="profile-card"><div class="avatar">${mascot(st.state === 'broken' ? 'neutral' : 'happy', 70)}</div>
        <div class="profile-meta"><span class="name">${esc(S.profile.name)}</span><span class="rank">Nível ${li.level} · ${esc(r.name)} <span class="jp">${esc(r.jp)}</span></span>
        <div class="bar"><i style="width:${Math.round(li.into / li.need * 100)}%"></i></div><div class="xp-line"><span>${S.xp} XP no total</span><span>${li.need - li.into} XP para o nível ${li.level + 1}</span></div></div></div>
    </div></header>
    <div class="wrap">
    ${loadNotice ? `<div class="banner">${esc(loadNotice)}</div>` : ''}
    ${!storageOK ? '<div class="banner">O salvamento automático não está disponível neste navegador. Use Perfil → Exportar progresso.</div>' : ''}
    <section class="section">${cont}</section>
    ${homeListenCard()}
    <section class="section"><div class="mascot-tip">${mascot('neutral', 56)}<div class="bubble"><b>${MASCOT_NAME}:</b> ${esc(st.state === 'broken' || st.state === 'new' || st.state === 'pending' ? stLabel + ' ' : '')}${esc(pick(MSG.tips))}</div></div></section>
    <section class="section"><div class="section-h"><h2>Progresso geral</h2><span class="muted tabnum">${prog}%</span></div>
      <div class="bar light" style="height:12px"><i style="width:${prog}%"></i></div>
      <div class="stats-grid"><div class="kpi"><b>${countPassed(S)}<small class="muted" style="font-size:.9rem">/${TOTAL_LESSONS}</small></b><span>lições aprovadas</span></div><div class="kpi"><b>${seenItems().length}</b><span>palavras e frases estudadas</span></div></div></section>
    <section class="section"><div class="section-h"><h2>Missões de hoje</h2><span class="muted" style="font-size:.8rem">renovam à meia-noite</span></div><div class="card missions">${missions}</div></section>
    <section class="section"><div class="section-h"><h2>Categorias</h2><button class="link-btn" data-act="nav" data-view="academia">Ver mapa</button></div><div class="cat-grid">${cats}</div></section>
    </div>`;
}

function viewAcademy() {
  const offs = [0, 46, 70, 46, 0, -46, -70, -46];
  const nx = nextStep();
  const wings = CATS.map(c => {
    const unlocked = catUnlocked(c), has = catHasContent(c), p = catProgress(c);
    let sub = !has ? 'Em breve' : !unlocked ? 'Bloqueada' : p.done + ' de ' + p.tot + ' etapas';
    const head = `<div class="wing-head ${unlocked && has ? '' : 'locked'}"><div class="emb">${esc(c.emblem)}</div><div class="meta"><span class="sub">Categoria ${c.num} · <span class="jp">${esc(c.jp)}</span></span><h2>${esc(c.title)}</h2><span class="sub">${sub}</span></div>${unlocked && has ? '' : IC.lock}</div>`;
    let nodes = [], k = 0;
    c.lessons.forEach(l => {
      const done = lessonPassed(l.id), open = lessonUnlocked(l), cur = nx && nx.lesson === l;
      const best = S.lessons[l.id] ? S.lessons[l.id].best : null;
      nodes.push(`<button class="node ${done ? 'done' : open ? 'open' : ''} ${cur ? 'current' : ''}" style="transform:translateX(${offs[k++ % 8]}px)" data-act="openLesson" data-id="${l.id}" aria-label="${esc(l.title)}${done ? ' (aprovada)' : open ? '' : ' (bloqueada)'}"><span class="disc jp">${open || done ? esc(l.emblem) : IC.lock}</span>${done && best != null ? `<span class="badge">${best}%</span>` : ''}<span class="lbl">${esc(l.title)}</span></button>`);
    });
    if (has) {
      const done = catPassed(c.id), open = examUnlocked(c);
      nodes.push(`<button class="node exam ${done ? 'done' : open ? 'open' : ''} ${nx && nx.exam === c ? 'current' : ''}" style="transform:translateX(${offs[k++ % 8]}px)" data-act="openCatExam" data-cat="${c.id}"><span class="disc jp">${open || done ? '試' : IC.lock}</span><span class="lbl">Avaliação final</span></button>`);
    }
    const soon = c.soon.length ? `<div class="soon-box"><span class="eyebrow">${has ? 'Próximas lições · em breve' : 'Conteúdo planejado · em breve'}</span><ul>${c.soon.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` : '';
    const req = has && !unlocked ? `<p class="muted" style="margin:10px 4px 0;font-size:.88rem">${esc(reqText(c))}</p>` : '';
    return `<section class="wing" id="wing-${c.id}">${head}${req}${nodes.length ? `<div class="path">${nodes.join('')}</div>` : ''}${soon}</section>`;
  }).join('');
  return `<div class="wrap"><div class="page-title"><div><span class="jp">がくえん</span><h1>Mapa da Academia</h1></div></div>
  <p class="muted" style="margin:0">Cada categoria é uma ala da Academia. Passe nas avaliações (mínimo de ${PASS}%) para abrir o próximo caminho.</p>${wings}</div>`;
}

function viewReview() {
  const seen = seenItems(), due = dueItems();
  const mastered = seen.filter(id => itemStatus(id) === 'dominada'), need = seen.filter(id => itemStatus(id) === 'revisar');
  const hard = seen.filter(id => S.items[id].w > 0).sort((a, b) => S.items[b].w - S.items[a].w).slice(0, 8);
  const byLesson = ALL_LESSONS.filter(l => l.items.some(it => S.items[it.id] && S.items[it.id].seen)).map(l => {
    const m = l.items.filter(it => itemStatus(it.id) === 'dominada').length;
    return `<div class="row"><span class="jpw" style="width:44px;text-align:center">${esc(l.emblem)}</span><div class="grow"><b>${esc(l.title)}</b><div class="bar light" style="margin-top:6px"><i style="width:${Math.round(m / l.items.length * 100)}%"></i></div></div><span class="muted tabnum" style="font-size:.85rem">${m}/${l.items.length}</span></div>`;
  }).join('');
  if (!seen.length) return `<div class="wrap"><div class="page-title"><div><span class="jp">ふくしゅう</span><h1>Revisão</h1></div></div>
    <div class="card mascot-tip" style="box-shadow:none">${mascot('neutral', 70)}<div><b>Ainda não há nada para revisar.</b><p class="muted" style="margin:4px 0 0">Estude sua primeira lição e eu trago as palavras de volta aqui na hora certa.</p></div></div>
    <button class="btn btn-gold btn-block" style="margin-top:14px" data-act="continue">Ir para a próxima lição</button></div>`;
  return `<div class="wrap"><div class="page-title"><div><span class="jp">ふくしゅう</span><h1>Revisão</h1></div></div>
    <div class="kpis"><div class="kpi"><b>${seen.length}</b><span>aprendidas</span></div><div class="kpi"><b>${mastered.length}</b><span>dominadas</span></div><div class="kpi"><b>${need.length}</b><span>precisam de revisão</span></div></div>
    <section class="section"><div class="card stack">
      <div class="mascot-tip">${mascot(due.length ? 'neutral' : 'happy', 56)}<div><b>${due.length ? due.length + (due.length === 1 ? ' item espera' : ' itens esperam') + ' por você' : 'Tudo em dia!'}</b><p class="muted" style="margin:2px 0 0;font-size:.9rem">${due.length ? 'Revisar no momento certo é o segredo para não esquecer.' : 'Você pode treinar livremente para fixar ainda mais.'}</p></div></div>
      <button class="btn btn-gold btn-block" data-act="startReview" data-mode="due">${due.length ? 'Começar revisão do dia' : 'Revisão rápida'}</button>
      <div class="row-btns"><button class="btn btn-ghost btn-small" data-act="startReview" data-mode="hard" ${hard.length ? '' : 'disabled'}>Treinar meus erros</button><button class="btn btn-ghost btn-small" data-act="startReview" data-mode="free">Treino livre</button></div>
    </div></section>
    <section class="section"><h2 style="font-size:1.1rem">Palavras com mais erros</h2><div class="card list">${hard.length ? hard.map(id => { const it = ITEM[id]; return `<div class="row"><div class="grow"><div class="jpw">${esc(it.jp)}</div><div class="muted" style="font-size:.85rem">${esc(it.ro)} · ${esc(it.pt)}</div></div><span class="chip revisar tabnum">${S.items[id].w} erro${S.items[id].w > 1 ? 's' : ''}</span></div>`; }).join('') : '<p class="muted" style="margin:0">Nenhum erro registrado até agora. Excelente!</p>'}</div></section>
    <section class="section"><h2 style="font-size:1.1rem">Domínio por lição</h2><div class="card list">${byLesson}</div></section></div>`;
}

function viewProfile() {
  const li = levelInfo(S.xp), r = rankOf(li.level), acc = S.stats.answers ? Math.round(S.stats.correct / S.stats.answers * 100) : 0;
  const medals = CATS.filter(catHasContent).map(c => {
    const e = S.catExams[c.id], best = e && e.passed ? e.best : null;
    const m = best == null ? 'none' : best === 100 ? 'ouro' : best >= 90 ? 'prata' : 'bronze';
    const name = { none: 'Sem medalha', ouro: 'Ouro', prata: 'Prata', bronze: 'Bronze' }[m];
    return `<div class="cmedal"><span class="m ${m} jp">${esc(c.emblem)}</span><span class="t">${esc(c.title)}<br><span class="muted" style="font-weight:700">${name}${best != null ? ' · ' + best + '%' : ''}</span></span></div>`;
  }).join('');
  const achs = ACHIEVEMENTS.map(a => `<button class="ach ${S.achievements[a.id] ? '' : 'off'}" data-act="achInfo" data-id="${a.id}"><span class="medal">${esc(a.icon)}</span><span class="an">${esc(a.name)}</span></button>`).join('');
  const shop = SHOP.map(it => {
    const owned = S.shop.owned.includes(it.id), eq = S.shop.equipped === it.id;
    let btn;
    if (it.type === 'freeze') btn = `<button class="btn btn-small btn-gold" data-act="buy" data-id="${it.id}" ${S.coins < it.price || S.streak.freezes >= 3 ? 'disabled' : ''}>${IC.coin.replace('<svg', '<svg width="16" height="16"')} ${it.price}</button>`;
    else if (owned) btn = `<button class="btn btn-small ${eq ? 'btn-ok' : 'btn-ghost'}" data-act="equip" data-id="${it.id}">${eq ? 'Usando' : 'Usar'}</button>`;
    else btn = `<button class="btn btn-small btn-gold" data-act="buy" data-id="${it.id}" ${S.coins < it.price ? 'disabled' : ''}>${IC.coin.replace('<svg', '<svg width="16" height="16"')} ${it.price}</button>`;
    const icon = it.type === 'freeze' ? IC.shield : mascot('happy', 50, '', it.id);
    return `<div class="shop-item"><div class="si">${icon}</div><div class="grow"><div class="n">${esc(it.name)}${it.type === 'freeze' ? ` <span class="muted tabnum">(${S.streak.freezes}/3)</span>` : ''}</div><div class="d">${esc(it.desc)}</div></div>${btn}</div>`;
  }).join('');
  const seg = (key, opts) => `<div class="seg">${opts.map(([v, t]) => `<button class="${String(S.settings[key]) === String(v) ? 'on' : ''}" data-act="setting" data-key="${key}" data-val="${v}">${t}</button>`).join('')}</div>`;
  const tog = key => `<button class="toggle ${S.settings[key] ? 'on' : ''}" role="switch" aria-checked="${!!S.settings[key]}" data-act="toggle" data-key="${key}" aria-label="Alternar"></button>`;
  return `<header class="hero"><div class="hero-in wrap"><div class="profile-card"><div class="avatar">${mascot('happy', 70)}</div><div class="profile-meta">
      <span class="name">${esc(S.profile.name)}</span><span class="rank">Nível ${li.level} · ${esc(r.name)} <span class="jp">${esc(r.jp)}</span></span>
      <div class="bar"><i style="width:${Math.round(li.into / li.need * 100)}%"></i></div><div class="xp-line"><span>${S.xp} XP</span><span>${li.into}/${li.need}</span></div></div>
      <button class="btn btn-small btn-ghost" style="background:#ffffff1a;color:#fff;border-color:#ffffff33" data-act="editName">Editar</button></div>
      <div class="pill-row"><span class="stat-pill">${IC.fire}${streakView().n} ${streakView().n === 1 ? 'dia' : 'dias'}</span><span class="stat-pill">${IC.coin}${S.coins} moedas</span><span class="stat-pill">${IC.star}${Object.keys(S.achievements).length}/${ACHIEVEMENTS.length}</span></div></div></header>
    <div class="wrap">
    <section class="section"><h2 style="font-size:1.1rem">Academia tradicional</h2><div class="stats-grid">
      <div class="kpi"><b>${countPassed(S)}</b><span>lições aprovadas</span></div><div class="kpi"><b>${acc}%</b><span>de acertos no total (${S.stats.correct}/${S.stats.answers})</span></div>
      <div class="kpi"><b>${S.streak.best}</b><span>melhor sequência (dias)</span></div><div class="kpi"><b>${S.stats.reviews}</b><span>revisões feitas</span></div></div></section>
    ${profileListenStats()}
    <section class="section"><h2 style="font-size:1.1rem">Medalhas das categorias</h2><p class="muted" style="margin:0;font-size:.85rem">Bronze a partir de 80%, prata com 90% e ouro com 100% na avaliação final.</p><div class="medal-row">${medals}</div></section>
    <section class="section"><h2 style="font-size:1.1rem">Conquistas</h2><div class="ach-grid">${achs}</div></section>
    <section class="section"><div class="section-h"><h2 style="font-size:1.1rem">Loja da Academia</h2><span class="muted tabnum">${S.coins} moedas</span></div><div class="card">${shop}</div></section>
    <section class="section"><h2 style="font-size:1.1rem">Configurações</h2><div class="card">
      <div class="setting"><div><b>Mostrar romaji</b><div class="muted" style="font-size:.82rem">Leitura em letras latinas abaixo do japonês</div></div>${tog('romaji')}</div>
      <div class="setting"><div><b>Efeitos sonoros</b></div>${tog('sound')}</div>
      <div class="setting"><div><b>Tema</b></div>${seg('theme', [['system', 'Auto'], ['light', 'Claro'], ['dark', 'Escuro']])}</div>
      <div class="setting"><div><b>Velocidade da voz</b></div>${seg('rate', [['lenta', 'Lenta'], ['normal', 'Normal'], ['rapida', 'Rápida']])}</div>
      <div class="setting"><div style="min-width:0"><b>Voz japonesa</b><div class="muted" style="font-size:.82rem" data-audio-status>${esc(audioStatusText())}</div></div><button class="btn btn-small btn-ghost" data-act="voiceHelp">Testar</button></div></div></section>
    <section class="section"><h2 style="font-size:1.1rem">Seus dados</h2><div class="card stack">
      <p class="muted" style="margin:0;font-size:.88rem">O progresso é salvo automaticamente neste aparelho${storageOK ? '' : ' (indisponível neste navegador)'}. Exporte um arquivo JSON para guardar uma cópia ou levar para outro aparelho.</p>
      <div class="row-btns"><button class="btn btn-primary btn-small" data-act="export">Exportar progresso</button><button class="btn btn-ghost btn-small" data-act="import">Importar progresso</button></div>
      <button class="link-btn" style="color:var(--bad);align-self:flex-start" data-act="resetAsk">Apagar todo o progresso</button></div></section>
    <p class="muted" style="text-align:center;font-size:.78rem">Nihongo Quest v${APP_VERSION} · dados v${S.schemaVersion}</p></div>`;
}

/* ==========================================================
   PLAYER (teoria, exercícios, avaliações)
   ========================================================== */
let P = null;
function openPlayer() { $('#player').hidden = false; document.body.style.overflow = 'hidden'; }
function closePlayer() { stopAudio(); P = null; sessionGain = null; $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = ''; render(); setTimeout(flushPending, 200); }

function startLesson(id, mode = 'full') {
  const L = LESSON[id]; if (!L || !lessonUnlocked(L)) return;
  closeModal();
  P = { kind: 'lesson', L, mode, phase: mode === 'exam' ? 'examIntro' : 'theory', card: 0 };
  sessionGain = { xp: 0, coins: 0 };
  openPlayer(); renderPlayer();
}
function startCatExam(cid) {
  const c = CAT[cid]; if (!c || !examUnlocked(c)) return;
  closeModal();
  P = { kind: 'catexam', C: c, phase: 'examIntro' };
  sessionGain = { xp: 0, coins: 0 };
  openPlayer(); renderPlayer();
}
function startReview(mode) {
  const qs = buildReview(mode);
  if (!qs.length) { toast('復', 'Estude uma lição primeiro para ter o que revisar.'); return; }
  P = { kind: 'review', mode, phase: 'quiz', quiz: 'review' };
  sessionGain = { xp: 0, coins: 0 };
  setupQuiz(qs, 'review'); openPlayer(); renderPlayer();
}
function setupQuiz(qs, quiz) { Object.assign(P, { phase: 'quiz', quiz, qs, i: 0, total: qs.length, correct: 0, graded: 0, errors: [], answered: false, sel: null, built: [], match: null }); }

function playerShell(progress, body, foot, footCls = '', countTxt = '') {
  return `<div class="p-top wrap"><button class="p-close" data-act="pClose" aria-label="Sair">${IC.close}</button><div class="bar"><i style="width:${Math.round(progress * 100)}%"></i></div><span class="p-count">${countTxt}</span></div>
  <div class="p-body" id="pBody"><div class="p-body-in wrap">${body}</div></div>
  <div class="p-foot ${footCls}"><div class="p-foot-in wrap">${foot}</div></div>`;
}
function renderPlayer() {
  if (!P) return;
  const el = $('#player');
  if (P.phase === 'theory') el.innerHTML = renderTheory();
  else if (P.phase === 'examIntro') el.innerHTML = renderExamIntro();
  else if (P.phase === 'quiz') el.innerHTML = renderQuiz();
  else if (P.phase === 'result') el.innerHTML = renderResult();
  else if (P.phase === 'confirmExit') el.innerHTML = renderConfirmExit();
  else if (P.phase === 'dialog') el.innerHTML = renderDialogLab();
  const b = $('#pBody'); if (b && !P.keepScroll) b.scrollTop = 0; P.keepScroll = false;
  const inp = $('#numInput'); if (inp) setTimeout(() => inp.focus(), 50);
  afterRenderPlayer();
}
function renderConfirmExit() {
  return playerShell(0, `<div class="result-hero">${mascot('sad', 120)}<h2>Sair agora?</h2><p class="muted" style="margin:0">${P.prev === 'theory' ? 'Você pode voltar à teoria quando quiser.' : 'As respostas desta tentativa não contarão para a aprovação. O XP já ganho fica com você.'}</p></div>`,
    `<button class="btn btn-primary btn-block" data-act="pStay">Continuar estudando</button><button class="btn btn-ghost btn-block" data-act="pExit">Sair</button>`);
}

/* --- teoria --- */
function theoryCards(L) {
  const cards = [{ t: 'intro' }]; L.items.forEach(it => cards.push({ t: 'item', it })); cards.push({ t: 'examples' }); return cards;
}
function renderTheory() {
  const L = P.L, cards = theoryCards(L), c = cards[P.card], last = P.card === cards.length - 1;
  let body = '';
  if (c.t === 'intro') {
    body = `<span class="mode-tag">Teoria · ${esc(L.cat.title)}</span><h1 style="font-size:1.5rem">${esc(L.title)}</h1>
      <div class="theory-card">${L.intro.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <div class="mascot-tip">${mascot('happy', 64)}<div class="bubble"><b>Dica da ${MASCOT_NAME}:</b> ${esc(L.tip)}</div></div>`;
  } else if (c.t === 'item') {
    const it = c.it; markSeen(it.id);
    const huge = L.kind === 'kana';
    body = `<span class="mode-tag">Teoria · ${P.card} de ${L.items.length}</span>
      <div class="theory-card"><div class="t-word"><span class="big ${huge ? 'huge' : ''}">${esc(it.jp)}</span><span class="rr">${esc(it.ro)}</span><span class="pt">${esc(it.pt)}</span>${speakBtn(it.jp)}</div>
      <dl class="kv"><dt>Japonês</dt><dd class="jp">${esc(it.jp)}</dd><dt>Romaji</dt><dd>${esc(it.ro)}</dd><dt>Tradução</dt><dd>${esc(it.pt)}</dd>${it.alt ? `<dt>Outra leitura</dt><dd>${esc(it.alt)}</dd>` : ''}${it.kanji ? `<dt>Em kanji</dt><dd class="jp">${esc(it.kanji)} <span class="muted" style="font-family:var(--f-body);font-size:.85rem">(você verá na categoria Kanji)</span></dd>` : ''}</dl>
      ${it.note ? `<div class="note">${esc(it.note)}</div>` : ''}
      ${it.ex ? `<div><span class="eyebrow">Exemplo</span><div class="ex"><span class="ej">${esc(it.ex.jp)}</span><span class="ro">${esc(it.ex.ro)}</span><span class="ep">${esc(it.ex.pt)}</span></div></div>` : ''}</div>`;
  } else {
    body = `<span class="mode-tag">Teoria · Na prática</span><h2>Exemplos práticos</h2>
      <div class="theory-card">${L.examples.map(e => `<div class="ex"><span class="ej">${esc(e.jp)}</span><span class="ro">${esc(e.ro)}</span><span class="ep">${esc(e.pt)}</span></div>`).join('')}</div>
      <div class="mascot-tip">${mascot('wow', 64)}<div class="bubble"><b>${MASCOT_NAME}:</b> ${P.mode === 'theory' ? 'Revisão da teoria concluída! Quer testar seus conhecimentos?' : 'Agora vamos praticar! Na prática você vê a explicação depois de cada resposta, sem pressão. Depois vem a avaliação.'}</div></div>`;
  }
  body += `<div class="dots">${cards.map((_, i) => `<i class="${i === P.card ? 'on' : ''}"></i>`).join('')}</div>`;
  const foot = `<div class="row-btns">${P.card > 0 ? '<button class="btn btn-ghost" data-act="tPrev">Voltar</button>' : ''}${last
    ? (P.mode === 'theory' ? '<button class="btn btn-ghost" data-act="pExit">Concluir</button><button class="btn btn-gold" data-act="toExamIntro">Avaliação</button>' : '<button class="btn btn-gold" data-act="toPractice">Praticar</button>')
    : '<button class="btn btn-primary" data-act="tNext">Próximo</button>'}</div>`;
  return playerShell((P.card + 1) / cards.length, body, foot, '', (P.card + 1) + '/' + cards.length);
}

/* --- introdução da avaliação --- */
function renderExamIntro() {
  const isCat = P.kind === 'catexam';
  const title = isCat ? 'Avaliação final: ' + P.C.title : 'Avaliação: ' + P.L.title;
  const prev = isCat ? S.catExams[P.C.id] : S.lessons[P.L.id];
  const n = isCat ? '15' : 'cerca de 10';
  const body = `<div class="result-hero">${mascot('neutral', 120)}<span class="mode-tag">Avaliação</span><h2>${esc(title)}</h2>
    <p style="margin:0">São ${n} perguntas, uma de cada vez. Você precisa acertar pelo menos <b>${PASS}%</b> para ser aprovado${isCat ? ' e liberar a próxima ala da Academia' : ' e liberar a próxima lição'}.</p>
    <p class="muted" style="margin:0">Depois de cada resposta eu mostro uma explicação. Se não passar, pode tentar de novo quantas vezes quiser!${isCat ? '' : ' Algumas perguntas revisam lições anteriores.'}</p>
    ${prev && prev.attempts ? `<p class="muted tabnum" style="margin:0">Tentativas: ${prev.attempts} · Melhor nota: ${prev.best}%</p>` : ''}</div>`;
  return playerShell(0, body, `<button class="btn btn-gold btn-block" data-act="startExam">Começar avaliação</button>`);
}

/* --- perguntas --- */
function showRo(q) { return S.settings.romaji && !q.noRomaji; }
function optHTML(o, i, q) {
  let cls = 'opt';
  if (P.answered) { if (o.correct) cls += ' right'; else if (i === P.sel) cls += ' wrong'; }
  else if (i === P.sel) cls += ' sel';
  const sub = o.sub && showRo(q) ? `<span class="o-ro">${esc(o.sub)}</span>` : '';
  const label = o.plain ? `<span>${esc(o.label)}</span>` : `<span class="o-jp ${o.kana ? 'kana' : ''}">${esc(o.label)}</span>`;
  return `<button class="${cls}" data-act="opt" data-i="${i}" ${P.answered ? 'disabled' : ''}>${label}${sub}</button>`;
}
function renderQuiz() {
  const q = P.qs[P.i];
  const label = { practice: 'Prática', review: 'Revisão', listen: 'Treino auditivo', dialog: 'Diálogo', case: 'Caso do Detetive' }[P.quiz] || 'Avaliação';
  let tag = `<span class="mode-tag ${q.review || P.quiz === 'review' ? 'rev' : ''}">${label}${q.review ? ' · revisão de lição anterior' : ''}${q.retry ? ' · de novo' : ''}${q.tag ? ' · ' + esc(q.tag) : ''}</span>`;
  let body = tag + `<div class="q-prompt">${esc(q.prompt)}</div>`;
  let canCheck = false;
  if (q.type === 'mc') {
    if (q.big || q.ctx) {
      const bigCls = q.bigClass === 'fill' ? 'fill-sentence' : 'big ' + (q.bigClass || '');
      body += `<div class="q-hero"><div class="q-card">${q.big ? `<span class="${bigCls} ${q.bigClass === 'fill' ? 'jp' : ''}">${esc(q.big)}</span>` : ''}${q.ro && showRo(q) ? `<span class="ro">${esc(q.ro)}</span>` : ''}${q.ctx ? `<span class="ctx">${esc(q.ctx)}</span>` : ''}${q.big && q.bigClass !== 'pt' && q.bigClass !== 'fill' && !q.noRomaji ? speakBtn(q.big) : ''}</div></div>`;
    }
    body += `<div class="opts ${q.grid ? 'grid' : ''}">${q.options.map((o, i) => optHTML(o, i, q)).join('')}</div>`;
    canCheck = P.sel !== null;
  } else if (q.type === 'listen') {
    body += renderListenBody(q);
    canCheck = P.sel !== null;
  } else if (q.type === 'num_type') {
    body += `<div class="q-card"><span class="big">${esc(q.jp)}</span>${showRo(q) ? `<span class="ro">${esc(q.ro)}</span>` : ''}${speakBtn(q.jp)}</div>
      <input id="numInput" class="num-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" placeholder="?" value="${esc(P.typed || '')}" ${P.answered ? 'disabled' : ''} aria-label="Número em algarismos">`;
    canCheck = !!(P.typed && P.typed.trim());
  } else if (q.type === 'build') {
    if (q.jp) body += `<div class="q-card"><span class="big" style="font-size:1.6rem">${esc(q.jp)}</span>${showRo(q) ? `<span class="ro">${esc(q.ro)}</span>` : ''}${speakBtn(q.jp)}</div>`;
    if (q.ctx) body += `<div class="q-card"><span class="ctx">Significado</span><span style="font-weight:800;font-size:1.2rem">${esc(q.ctx)}</span></div>`;
    const tileHTML = (t, i, inLine) => `<button class="tile ${!inLine && P.built.includes(i) ? 'used' : ''}" data-act="${inLine ? 'unbuild' : 'build'}" data-i="${i}" ${P.answered ? 'disabled' : ''}>${q.plainTiles ? `<span>${esc(t.jp)}</span>` : `<span class="t-jp ${q.kanaTiles ? 'kana' : ''}">${esc(t.jp)}</span>${t.ro && showRo(q) ? `<span class="t-ro">${esc(t.ro)}</span>` : ''}`}</button>`;
    body += `<div class="answer-line ${P.built.length ? '' : 'empty'}">${P.built.map(i => tileHTML(q.bank[i], i, true)).join('')}</div><div class="bank">${q.bank.map((t, i) => tileHTML(t, i, false)).join('')}</div>`;
    canCheck = P.built.length > 0;
  } else if (q.type === 'error') {
    body += `<div class="q-card"><span class="ctx">${esc(q.ctx)}</span></div><div class="tokens">${q.tokens.map((t, i) => {
      let cls = 'tile'; if (P.answered) { if (i === q.wrong) cls += ' opt right'; else if (i === P.sel) cls += ' opt wrong'; } else if (i === P.sel) cls += ' opt sel';
      return `<button class="${cls}" data-act="opt" data-i="${i}" ${P.answered ? 'disabled' : ''}><span class="t-jp ${q.noRomaji ? 'kana' : ''}">${esc(t.jp)}</span>${t.ro && showRo(q) ? `<span class="t-ro">${esc(t.ro)}</span>` : ''}</button>`;
    }).join('')}</div>`;
    canCheck = P.sel !== null;
  } else if (q.type === 'match') {
    const M = P.match || (P.match = { l: null, r: null, done: [], mistakes: 0, missed: new Set() });
    const col = (arr, side) => arr.map(o => {
      const d = M.done.includes(o.i); const sel = M[side] === o.i;
      return `<button class="opt ${d ? 'right gone' : sel ? 'sel' : ''}" data-act="m${side.toUpperCase()}" data-i="${o.i}" ${d || P.answered ? 'disabled' : ''}><span class="${side === 'l' ? 'o-jp' + (o.kana ? ' kana' : '') : ''}">${esc(o.label)}</span>${o.sub && showRo(q) ? `<span class="o-ro">${esc(o.sub)}</span>` : ''}</button>`;
    }).join('');
    body += `<div class="match"><div class="col">${col(q.left, 'l')}</div><div class="col">${col(q.right, 'r')}</div></div>`;
  }
  let foot, footCls = '';
  if (!P.answered) {
    foot = q.type === 'match' ? `<p class="muted" style="margin:0;text-align:center">Toque em um item de cada coluna para formar o par.</p>` : `<button class="btn btn-primary btn-block" data-act="check" ${canCheck ? '' : 'disabled'}>Verificar</button>`;
  } else {
    const ok = P.lastOk; footCls = ok ? 'ok' : 'bad';
    foot = `<div class="fb">${mascot(ok ? 'happy' : 'sad', 54, 'hop')}<div class="fb-text"><h3>${esc(P.fbTitle)}</h3>${!ok && q.answerText ? `<p class="answer">Resposta certa: ${esc(q.answerText)}</p>` : ''}${q.type === 'listen' ? listenReveal(q) : ''}<p>${esc(q.explain || '')}</p></div></div>
      <button class="btn ${ok ? 'btn-ok' : 'btn-bad'} btn-block" data-act="next">Continuar</button>`;
  }
  const prog = P.i / P.qs.length;
  return playerShell(prog, body, foot, footCls, (P.i + 1) + '/' + P.qs.length);
}
function checkAnswer() {
  const q = P.qs[P.i]; if (P.answered) return;
  let ok = false;
  if (q.type === 'mc' || q.type === 'listen') { if (P.sel === null) return; ok = !!q.options[P.sel].correct; }
  else if (q.type === 'num_type') { const v = parseInt(String(P.typed || '').replace(/\D/g, ''), 10); if (isNaN(v)) return; ok = v === q.answer; }
  else if (q.type === 'build') { if (!P.built.length) return; ok = P.built.map(i => q.bank[i].jp).join('|') === q.answer.join('|'); }
  else if (q.type === 'error') { if (P.sel === null) return; ok = P.sel === q.wrong; }
  finishQuestion(ok);
}
function finishQuestion(ok) {
  const q = P.qs[P.i];
  P.answered = true; P.lastOk = ok; P.fbTitle = ok ? pick(MSG.correct) : pick(MSG.wrong);
  sfx(ok ? 'ok' : 'bad');
  const ctx = P.quiz + ':' + (P.L ? P.L.id : P.C ? P.C.id : 'rev');
  if (q.type === 'match') q.items.forEach((id, i) => recordAnswer(id, !P.match.missed.has(i), ctx));
  else recordAnswer(q.itemId, ok, ctx);
  if (q.type === 'listen') recordListen(q, ok);
  if (!q.retry) { P.graded++; if (ok) P.correct++; else P.errors.push(q); }
  let xp = ok ? (P.quiz === 'practice' ? 5 : P.quiz === 'review' || P.quiz === 'listen' ? 6 : P.quiz === 'dialog' || P.quiz === 'case' ? 8 : 10) : 1;
  if (ok && q.hinted) xp = Math.ceil(xp / 2);
  addXP(xp);
  if (P.quiz === 'practice' && !ok && !q.retry) {
    const again = q.type === 'match' ? { ...q, left: shuffle(q.left), right: shuffle(q.right), retry: true } : q.type === 'mc' ? { ...q, options: shuffle(q.options), retry: true } : q.type === 'build' ? { ...q, bank: shuffle(q.bank), retry: true } : { ...q, retry: true };
    P.qs.push(again);
  }
  P.keepScroll = true; renderPlayer();
  const f = $('.p-foot .btn'); if (f) f.focus({ preventScroll: true });
}
function nextQuestion() {
  stopAudio();
  P.i++; P.answered = false; P.sel = null; P.built = []; P.match = null; P.typed = '';
  if (P.i >= P.qs.length) return endQuiz();
  renderPlayer();
}
function endQuiz() {
  if (P.quiz === 'practice') { P.phase = 'examIntro'; renderPlayer(); return; }
  if (endListenQuiz()) return;
  const pct = P.graded ? Math.round(P.correct / P.graded * 100) : 0;
  const pass = pct >= PASS;
  touchStudy();
  if (P.quiz === 'review') {
    S.stats.reviews++; missionEvent('review_done'); addCoins(5);
  } else if (P.kind === 'lesson') {
    const id = P.L.id, r = S.lessons[id] || (S.lessons[id] = { passed: false, best: 0, attempts: 0 });
    const first = pass && !r.passed;
    r.attempts++; r.best = Math.max(r.best, pct); r.last = pct; r.lastAt = Date.now();
    if (pass) { if (first) { r.passed = true; r.passedAt = Date.now(); S.stats.lessonsPassed++; } addXP(first ? 40 : 10); addCoins(first ? 15 : 3); missionEvent('lesson_pass'); }
    if (pct === 100) { S.stats.perfect++; addXP(20); addCoins(10); missionEvent('perfect'); }
    P.firstPass = first;
  } else if (P.kind === 'catexam') {
    const id = P.C.id, r = S.catExams[id] || (S.catExams[id] = { passed: false, best: 0, attempts: 0 });
    const first = pass && !r.passed;
    r.attempts++; r.best = Math.max(r.best, pct); r.last = pct;
    if (pass) { if (first) { r.passed = true; r.passedAt = Date.now(); } addXP(first ? 150 : 20); addCoins(first ? 50 : 5); missionEvent('lesson_pass'); }
    if (pct === 100) { S.stats.perfect++; addXP(20); addCoins(10); missionEvent('perfect'); }
    P.firstPass = first;
  }
  P.pct = pct; P.pass = pass; P.phase = 'result';
  checkAchievements(); saveNow();
  if (pass || P.quiz === 'review') { sfx('level'); confetti(); }
  renderPlayer();
}
function renderResult() {
  if (P.kind === 'case') return renderCaseResult();
  const isReview = P.quiz === 'review' || P.quiz === 'listen' || P.quiz === 'dialog';
  const pass = P.pass, g = sessionGain || { xp: 0, coins: 0 };
  let title, msg, mood;
  if (isReview) { const t = listenResultText(); title = t.title; msg = t.msg; mood = 'happy'; }
  else if (pass) { title = P.kind === 'catexam' ? 'Ala concluída!' : 'Aprovado!'; mood = 'wow'; msg = P.pct === 100 ? 'Nota máxima! Você é uma estrela da Academia.' : P.kind === 'catexam' ? (P.firstPass ? 'Você ganhou uma medalha e abriu um novo caminho na Academia!' : 'Você melhorou ainda mais nesta ala!') : (P.firstPass ? 'A próxima lição foi liberada no mapa.' : 'Ótima revisão desta lição!'); }
  else { title = 'Quase lá!'; mood = 'neutral'; msg = 'Você precisa de ' + PASS + '% para passar. Revise os erros abaixo e tente de novo, eu acredito em você!'; }
  const errs = P.errors.length ? `<section class="section"><h2 style="font-size:1.05rem">Para revisar</h2><div class="card">${P.errors.map(q => `<div class="err-item"><b>${esc(q.prompt)}${q.type === 'listen' ? (q.mode === 'dialog' ? '' : ' Áudio: ' + esc(q.jp) + ' (' + esc(q.ro) + ')') : q.big && q.bigClass !== 'fill' ? ': ' + esc(q.big) : q.jp ? ': ' + esc(q.jp) : ''}</b>${q.answerText ? `<span>Resposta: ${esc(q.answerText)}</span>` : ''}<span class="muted">${esc(q.explain || '')}</span></div>`).join('')}</div></section>` : '';
  let medal = '';
  if (P.kind === 'catexam' && pass) { const m = P.pct === 100 ? 'ouro' : P.pct >= 90 ? 'prata' : 'bronze'; medal = `<div class="cmedal" style="justify-content:center"><span class="m ${m} jp">${esc(P.C.emblem)}</span><span class="t">Medalha de ${m} · ${esc(P.C.title)}</span></div>`; }
  const body = `<div class="result-hero">${mascot(mood, 130, 'hop')}<h2>${title}</h2>
    ${isReview && P.quiz === 'review' ? '' : `<div class="score-big ${pass ? 'pass' : 'fail'}">${P.pct}%</div>`}
    <p class="muted tabnum" style="margin:0">${P.correct} de ${P.graded} respostas certas</p><p style="margin:0">${esc(msg)}</p>${medal}
    <div class="reward-row"><div class="reward"><b>+${g.xp}</b><span>XP</span></div><div class="reward"><b>+${g.coins}</b><span>moedas</span></div><div class="reward"><b>${streakView().n}</b><span>sequência</span></div></div></div>${errs}`;
  let foot;
  if (isReview) foot = listenResultFoot();
  else if (pass) foot = `<button class="btn btn-gold btn-block" data-act="pExit">Continuar</button>${P.pct < 100 ? '<button class="btn btn-ghost btn-block" data-act="retryExam">Tentar 100%</button>' : ''}`;
  else foot = `<button class="btn btn-gold btn-block" data-act="retryExam">Tentar de novo</button><div class="row-btns">${P.kind === 'lesson' ? '<button class="btn btn-ghost btn-small" data-act="reTheory">Rever teoria</button>' : ''}<button class="btn btn-ghost btn-small" data-act="pExit">Sair</button></div>`;
  return playerShell(1, body, foot, '', '');
}

/* ==========================================================
   AÇÕES
   ========================================================== */
const ACT = {
  nav: el => go(el.dataset.view),
  onboard: () => {
    const v = ($('#nameInput').value || '').trim();
    if (!v) { $('#nameInput').focus(); toast('名', 'Digite um nome para começar.'); return; }
    S.profile.name = v.slice(0, 24); S.profile.onboarded = true; ensureDaily(); saveNow(); sfx('level'); go('inicio');
    toast('光', MASCOT_NAME + ': Bem-vindo(a) à Academia, ' + S.profile.name + '!');
  },
  continue: () => { const nx = nextStep(); if (nx && nx.lesson) startLesson(nx.lesson.id); else if (nx && nx.exam) ACT.openCatExam({ dataset: { cat: nx.exam.id } }); else go('revisao'); },
  gotoCat: el => { const c = CAT[el.dataset.cat]; go('academia'); setTimeout(() => { const w = document.getElementById('wing-' + c.id); if (w) w.scrollIntoView({ block: 'start' }); }, 30); },
  openLesson: el => {
    const L = LESSON[el.dataset.id]; if (!L) return;
    if (!lessonUnlocked(L)) { toast('鍵', catUnlocked(L.cat) ? 'Passe na lição anterior (' + PASS + '% ou mais) para liberar esta.' : reqText(L.cat)); return; }
    const r = S.lessons[L.id];
    openModal(`<div class="mascot-tip">${mascot('happy', 60)}<div><span class="eyebrow">${esc(L.cat.title)} · Lição ${L.index + 1}</span><h2>${esc(L.title)}</h2></div></div>
      <p style="margin:0">${esc(L.intro[0])}</p>
      <div><span class="eyebrow">Você vai aprender</span><p class="jp" style="margin:4px 0 0;font-size:1.05rem">${L.items.map(it => esc(it.jp)).join('　')}</p></div>
      ${r ? `<p class="muted tabnum" style="margin:0">${r.passed ? 'Aprovada' : 'Ainda não aprovada'} · melhor nota ${r.best}% · ${r.attempts} tentativa${r.attempts === 1 ? '' : 's'}</p>` : ''}
      <button class="btn btn-gold btn-block" data-act="startLesson" data-id="${L.id}">${r && r.passed ? 'Refazer lição completa' : 'Começar lição'}</button>
      ${r ? `<div class="row-btns"><button class="btn btn-ghost btn-small" data-act="startLesson" data-id="${L.id}" data-mode="theory">Rever teoria</button><button class="btn btn-ghost btn-small" data-act="startLesson" data-id="${L.id}" data-mode="exam">Só a avaliação</button></div>` : ''}
      <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>`);
  },
  startLesson: el => startLesson(el.dataset.id, el.dataset.mode || 'full'),
  openCatExam: el => {
    const c = CAT[el.dataset.cat]; if (!c) return;
    if (!catUnlocked(c)) { toast('鍵', reqText(c)); return; }
    if (!examUnlocked(c)) { toast('鍵', 'Seja aprovado em todas as lições de “' + c.title + '” para liberar a avaliação final.'); return; }
    const r = S.catExams[c.id];
    const next = CATS.filter(x => x.requires === c.id && catHasContent(x)).map(x => x.title).join(' e ');
    openModal(`<div class="mascot-tip">${mascot('neutral', 60)}<div><span class="eyebrow">Avaliação final</span><h2>${esc(c.title)}</h2></div></div>
      <p style="margin:0">15 perguntas sobre todas as lições desta ala. Com ${PASS}% ou mais você ganha uma medalha${next ? ' e libera: <b>' + esc(next) + '</b>' : ''}.</p>
      ${r ? `<p class="muted tabnum" style="margin:0">${r.passed ? 'Aprovada' : 'Ainda não aprovada'} · melhor nota ${r.best}%</p>` : ''}
      <button class="btn btn-gold btn-block" data-act="startCatExam" data-cat="${c.id}">Começar avaliação final</button>
      <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>`);
  },
  startCatExam: el => startCatExam(el.dataset.cat),
  soon: el => { const c = CAT[el.dataset.cat]; toast('予', 'Este conteúdo chega numa próxima atualização' + (c && catHasContent(c) ? '. Enquanto isso, domine as lições disponíveis!' : '.')); },
  closeModal: () => closeModal(),
  achInfo: el => { const a = ACHIEVEMENTS.find(x => x.id === el.dataset.id); const t = S.achievements[a.id];
    openModal(`<div class="stack" style="align-items:center"><div class="ach ${t ? '' : 'off'}" style="border:0;background:none"><span class="medal" style="width:84px;height:84px;font-size:2.2rem">${esc(a.icon)}</span></div><h2>${esc(a.name)}</h2><p style="margin:0">${esc(a.desc)}</p><p class="muted" style="margin:0">${t ? 'Conquistada em ' + new Date(t).toLocaleDateString('pt-BR') : 'Ainda não conquistada · recompensa: 20 moedas'}</p><button class="btn btn-primary btn-block" data-act="closeModal">Fechar</button></div>`, 'center'); },
  claim: el => claimMission(el.dataset.id),
  buy: el => {
    const it = SHOP.find(x => x.id === el.dataset.id); if (!it || S.coins < it.price) { toast('金', 'Moedas insuficientes. Conclua lições e missões para ganhar mais!'); return; }
    if (it.type === 'freeze') { if (S.streak.freezes >= 3) return; S.streak.freezes++; }
    else { if (S.shop.owned.includes(it.id)) return; S.shop.owned.push(it.id); S.shop.equipped = it.id; }
    S.coins -= it.price; sfx('coin'); toast('金', 'Comprado: ' + it.name + '!'); checkAchievements(); saveNow(); render();
  },
  equip: el => { const id = el.dataset.id; S.shop.equipped = S.shop.equipped === id ? null : id; saveNow(); render(); },
  toggle: el => { const k = el.dataset.key; S.settings[k] = !S.settings[k]; saveNow(); render(); },
  setting: el => { S.settings[el.dataset.key] = el.dataset.val; applyTheme(); saveNow(); render(); },
  editName: () => openModal(`<h2>Seu nome</h2><input id="nameEdit" class="search" maxlength="24" value="${esc(S.profile.name)}" aria-label="Seu nome"><button class="btn btn-gold btn-block" data-act="saveName">Salvar</button><button class="btn btn-ghost btn-block" data-act="closeModal">Cancelar</button>`),
  saveName: () => { const v = $('#nameEdit').value.trim(); if (!v) { toast('名', 'O nome não pode ficar vazio.'); return; } S.profile.name = v.slice(0, 24); saveNow(); closeModal(); render(); toast('名', 'Nome atualizado!'); },
  export: () => {
    const data = JSON.stringify({ app: 'nihongo-quest', exportedAt: new Date().toISOString(), schemaVersion: S.schemaVersion, appVersion: APP_VERSION, data: S }, null, 1);
    const inFrame = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
    openModal(`<h2>Exportar progresso</h2><p class="muted" style="margin:0">Copie o texto abaixo e guarde num lugar seguro (bloco de notas, e-mail para você mesmo). Para restaurar, use “Importar progresso”.</p>
      <textarea id="exportText" readonly>${esc(data)}</textarea>
      <button class="btn btn-gold btn-block" data-act="copyExport">Copiar texto</button>
      ${inFrame ? '' : '<button class="btn btn-primary btn-block" data-act="downloadExport">Baixar arquivo .json</button>'}
      <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>`);
  },
  copyExport: () => {
    const ta = $('#exportText'); const txt = ta.value;
    const fallback = () => { ta.focus(); ta.select(); try { document.execCommand('copy'); toast('写', 'Texto selecionado e copiado.'); } catch (e) { toast('写', 'Texto selecionado: use “Copiar” do seu teclado.'); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => toast('写', 'Progresso copiado!'), fallback); else fallback();
  },
  downloadExport: () => {
    const blob = new Blob([$('#exportText').value], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nihongo-quest-progresso-' + dayKey() + '.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); toast('写', 'Arquivo gerado.');
  },
  import: () => openModal(`<h2>Importar progresso</h2><p class="muted" style="margin:0">Escolha um arquivo .json exportado antes ou cole o texto abaixo.</p>
      <input type="file" id="importFile" accept=".json,application/json,text/plain" class="search" style="padding:10px">
      <textarea id="importText" placeholder="Cole aqui o texto exportado"></textarea>
      <button class="btn btn-gold btn-block" data-act="importCheck">Verificar e importar</button>
      <button class="btn btn-ghost btn-block" data-act="closeModal">Cancelar</button>`),
  importCheck: () => {
    const raw = $('#importText').value.trim();
    if (!raw) { toast('!', 'Escolha um arquivo ou cole o texto exportado.'); return; }
    let parsed;
    try {
      const j = JSON.parse(raw);
      const d = j && j.app === 'nihongo-quest' && j.data ? j.data : j;
      if (!d || typeof d !== 'object' || !('xp' in d) || !('lessons' in d)) throw new Error('x');
      parsed = normalize(d);
    } catch (e) { toast('!', 'Esse conteúdo não parece um progresso do Nihongo Quest. Confira se copiou o texto completo.'); return; }
    window.__importCandidate = parsed;
    openModal(`<h2>Substituir o progresso atual?</h2><p style="margin:0">Progresso encontrado: <b>${esc(parsed.profile.name || 'sem nome')}</b>, ${parsed.xp} XP, ${countPassed(parsed)} lições aprovadas.</p><p class="muted" style="margin:0">O progresso atual (${S.xp} XP) será guardado como cópia de segurança neste aparelho antes da troca.</p>
      <button class="btn btn-gold btn-block" data-act="importConfirm">Sim, importar</button><button class="btn btn-ghost btn-block" data-act="closeModal">Cancelar</button>`);
  },
  importConfirm: () => {
    const c = window.__importCandidate; if (!c) return;
    try { localStorage.setItem(BACKUP_KEY, JSON.stringify(S)); } catch (e) {}
    S = c; S.profile.onboarded = true; window.__importCandidate = null; saveNow(); applyTheme(); closeModal(); go('inicio'); toast('入', 'Progresso importado com sucesso!');
  },
  resetAsk: () => openModal(`<div class="stack" style="align-items:center">${mascot('sad', 90)}<h2>Apagar todo o progresso?</h2><p style="margin:0">XP, moedas, conquistas, lições e o caderno serão zerados. Dica: exporte seu progresso antes. Uma cópia de segurança ficará guardada neste aparelho.</p>
      <button class="btn btn-bad btn-block" data-act="resetConfirm">Apagar tudo</button><button class="btn btn-ghost btn-block" data-act="closeModal">Cancelar</button></div>`, 'center'),
  resetConfirm: () => { try { localStorage.setItem(BACKUP_KEY, JSON.stringify(S)); } catch (e) {} S = defaultState(); saveNow(); applyTheme(); closeModal(); view = 'inicio'; render(); },
  nbFilter: el => { nb.f = el.dataset.f; render(); },
  speak: el => speak(el.dataset.text),
  startReview: el => startReview(el.dataset.mode),
  // player
  pClose: () => { if (P.phase === 'result') return closePlayer(); P.prev = P.phase; P.phase = 'confirmExit'; renderPlayer(); },
  pStay: () => { P.phase = P.prev; P.keepScroll = false; renderPlayer(); },
  pExit: () => closePlayer(),
  tNext: () => { P.card++; renderPlayer(); },
  tPrev: () => { P.card = Math.max(0, P.card - 1); renderPlayer(); },
  toPractice: () => { missionEvent('theory'); setupQuiz(buildPractice(P.L), 'practice'); renderPlayer(); },
  toExamIntro: () => { missionEvent('theory'); P.phase = 'examIntro'; renderPlayer(); },
  startExam: () => { setupQuiz(P.kind === 'catexam' ? buildCatExam(P.C) : buildExam(P.L), 'exam'); renderPlayer(); },
  retryExam: () => { sessionGain = { xp: 0, coins: 0 }; P.phase = 'examIntro'; renderPlayer(); },
  reTheory: () => { sessionGain = { xp: 0, coins: 0 }; P.mode = 'full'; P.phase = 'theory'; P.card = 0; renderPlayer(); },
  opt: el => { if (P.answered) return; P.sel = +el.dataset.i; sfx('tap'); P.keepScroll = true; renderPlayer(); },
  check: () => checkAnswer(),
  next: () => nextQuestion(),
  build: el => { if (P.answered) return; const i = +el.dataset.i; if (!P.built.includes(i)) P.built.push(i); sfx('tap'); P.keepScroll = true; renderPlayer(); },
  unbuild: el => { if (P.answered) return; const i = +el.dataset.i; P.built = P.built.filter(x => x !== i); P.keepScroll = true; renderPlayer(); },
  mL: el => matchPick('l', +el.dataset.i),
  mR: el => matchPick('r', +el.dataset.i)
};
function matchPick(side, i) {
  const M = P.match; if (!M || P.answered) return;
  M[side] = M[side] === i ? null : i;
  if (M.l !== null && M.r !== null) {
    if (M.l === M.r) { M.done.push(M.l); sfx('ok'); }
    else { M.mistakes++; M.missed.add(M.l); M.missed.add(M.r); sfx('bad'); P.shake = true; }
    M.l = M.r = null;
  } else sfx('tap');
  P.keepScroll = true; renderPlayer();
  if (P.shake) { P.shake = false; const m = $('.match'); if (m) m.classList.add('shake'); }
  if (M.done.length === P.qs[P.i].items.length) finishQuestion(M.mistakes === 0);
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
  const fn = ACT[el.dataset.act]; if (fn) { e.preventDefault(); fn(el, e); }
});
document.addEventListener('input', e => {
  if (e.target.id === 'nbSearch') { nb.q = e.target.value; const pos = e.target.selectionStart; render(); const s = $('#nbSearch'); if (s) { s.focus(); try { s.setSelectionRange(pos, pos); } catch (_) {} } }
  if (e.target.id === 'numInput' && P) { P.typed = e.target.value.replace(/\D/g, '').slice(0, 3); e.target.value = P.typed; const b = $('[data-act="check"]'); if (b) b.disabled = !P.typed; }
});
document.addEventListener('change', e => {
  if (e.target.id === 'importFile') {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const rd = new FileReader(); rd.onload = () => { $('#importText').value = String(rd.result || ''); toast('入', 'Arquivo carregado. Toque em “Verificar e importar”.'); }; rd.onerror = () => toast('!', 'Não consegui ler o arquivo.'); rd.readAsText(f);
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && P && P.phase === 'quiz') { e.preventDefault(); if (P.answered) nextQuestion(); else checkAnswer(); }
  if (e.key === 'Enter' && e.target.id === 'nameInput') ACT.onboard();
  if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
});
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });

/* ---------- tema ---------- */
const hostTheme = document.documentElement.getAttribute('data-theme');
function applyTheme() {
  const t = S.settings.theme;
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  else if (hostTheme) document.documentElement.setAttribute('data-theme', hostTheme);
  else document.documentElement.removeAttribute('data-theme');
}

