/* ==========================================================
   NIHONGO CHAT 4.0 — motor de conversa
   - Normaliza o que o aluno escreve (romaji, hiragana, katakana
     e kanji conhecidos) para comparar por intenção, não por frase exata.
   - Classifica a resposta: natural, pouco natural socialmente,
     erro de escrita, erro gramatical, erro de vocabulário ou não reconhecida.
   - Consulta a Academia (lições aprovadas, status dos itens) para
     decidir o que pode ser exigido e o que precisa ser apresentado.
   Não é uma IA generativa: são roteiros com intenções e ramificações.
   A camada CHAT_BRAINS permite trocar o "cérebro" por um backend no futuro.
   ========================================================== */

/* ---------- romaji: kana -> romaji (Hepburn) ---------- */
const CH_KR = (() => {
  const base = {
    あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o', か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
    さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
    だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do', な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
    ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po', ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
    や: 'ya', ゆ: 'yu', よ: 'yo', ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', わ: 'wa', を: 'o', ん: 'n', ゔ: 'vu',
    ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o', ゃ: 'ya', ゅ: 'yu', ょ: 'yo', ゎ: 'wa'
  };
  const y = { き: 'ky', ぎ: 'gy', し: 'sh', じ: 'j', ち: 'ch', に: 'ny', ひ: 'hy', び: 'by', ぴ: 'py', み: 'my', り: 'ry' };
  const t = Object.assign({}, base);
  Object.keys(y).forEach(k => { t[k + 'ゃ'] = y[k] + 'a'; t[k + 'ゅ'] = y[k] + 'u'; t[k + 'ょ'] = y[k] + 'o'; });
  Object.assign(t, { ふぁ: 'fa', ふぃ: 'fi', ふぇ: 'fe', ふぉ: 'fo', てぃ: 'ti', でぃ: 'di', とぅ: 'tu', しぇ: 'she', じぇ: 'je', ちぇ: 'che', うぃ: 'wi', うぇ: 'we', うぉ: 'wo', ゔぁ: 'va', ゔぃ: 'vi', ゔぇ: 've', ゔぉ: 'vo' });
  return t;
})();
const kataToHira = s => String(s).replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function kanaToRomaji(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], two = s.substr(i, 2);
    if (c === 'っ') { const nx = CH_KR[s.substr(i + 1, 2)] || CH_KR[s[i + 1]]; if (nx) out += nx[0] === 'c' ? 't' : nx[0]; continue; }
    if (c === 'ー') { const m = out.match(/[aeiou]$/); if (m) out += m[0]; continue; }
    if (CH_KR[two] && two.length === 2) { out += CH_KR[two]; i++; continue; }
    if (CH_KR[c]) { out += CH_KR[c]; continue; }
    out += c;
  }
  return out;
}

/* ---------- leituras de palavras com kanji (da própria Academia + extras do chat) ---------- */
let CH_KJ = null;
function chatKanjiMap() {
  if (CH_KJ) return CH_KJ;
  const m = new Map();
  const add = (jp, say) => { jp = String(jp || '').replace(/[。、！？!?.,…「」〜~\s]/g, ''); say = String(say || '').replace(/[。、！？!?.,…「」〜~\s]/g, ''); if (jp && say && /[一-鿿々]/.test(jp) && jp.length <= 8 && !m.has(jp)) m.set(jp, say); };
  Object.values(ITEM).forEach(it => { if (it.say && !/\s/.test(it.jp)) add(it.jp, it.say); });
  Object.keys(CHAT_KANJI).forEach(k => add(k, CHAT_KANJI[k]));
  CHAT_PACK.items.forEach(it => { if (it.say && !/\s/.test(it.jp)) add(it.jp, it.say); });
  CH_KJ = [...m.entries()].sort((a, b) => b[0].length - a[0].length);
  return CH_KJ;
}

/* ---------- normalização ---------- */
function chCanon(s) {
  s = String(s || '').normalize('NFKC').toLowerCase();
  s = s.replace(/(\d{1,2})\s*(時|じ|ji)/g, (m, n) => (+n >= 1 && +n <= 12 ? HOUR_RO[+n] + 'ji' : m)).replace(/\d{1,4}/g, n => chNumRo(+n));
  s = s.replace(/([ァ-ヶー])人/g, '$1じん');
  if (/[一-鿿々]/.test(s)) for (const [k, v] of chatKanjiMap()) if (s.includes(k)) s = s.split(k).join(v);
  s = kanaToRomaji(kataToHira(s));
  s = s.replace(/[āâ]/g, 'aa').replace(/[ōô]/g, 'ou').replace(/[ūû]/g, 'uu').replace(/[ēê]/g, 'ee').replace(/[īî]/g, 'ii');
  s = s.replace(/[^a-z*]/g, '');
  // romanizações alternativas (Kunrei/Nihon-shiki) viram Hepburn
  s = s.replace(/sy([auo])/g, 'sh$1').replace(/ty([auo])/g, 'ch$1').replace(/(zy|jy)([auo])/g, 'j$2')
    .replace(/si/g, 'shi').replace(/ti/g, 'chi').replace(/tu/g, 'tsu').replace(/(^|[^sc])hu/g, '$1fu').replace(/zi/g, 'ji').replace(/di/g, 'ji').replace(/du/g, 'zu')
    .replace(/shhi/g, 'shi').replace(/chhi/g, 'chi').replace(/tsshu/g, 'tsu').replace(/wo/g, 'o');
  s = s.replace(/konnichiha/g, 'konnichiwa').replace(/konbanha/g, 'konbanwa').replace(/konichiha/g, 'konichiwa');
  return s;
}
/* forma "solta": tolera vogais longas, consoantes dobradas e n/m (variações comuns de romaji) */
function chLoose(c) {
  return c.replace(/ou/g, 'o').replace(/ei/g, 'e').replace(/([aeiou])\1+/g, '$1').replace(/tch/g, 'ch').replace(/([bcdfghjkmprstwz])\1/g, '$1').replace(/nn/g, 'n').replace(/m(?=[bpm])/g, 'n');
}
function chLev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < best) best = cur[j]; }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/* ---------- padrões de resposta ----------
   Escritos em romaji com espaços entre as palavras:
   "(un )?genki (da )?(yo|ne)?"  ->  grupos (a|b), opcionais com ?,
   {food} = lista de opções (CHAT_SLOTS), * = qualquer palavra (nome, título).
   Partículas soltas wa/e/o aceitam は/へ/を digitados em kana. */
function chParse(p) {
  let i = 0;
  function seq(stop) {
    const items = []; let word = '';
    const flush = () => { if (word.trim()) word.trim().split(/\s+/).forEach(w => items.push({ w })); word = ''; };
    while (i < p.length) {
      const c = p[i];
      if (c === '(') { flush(); i++; const alts = [seq(true)]; while (p[i] === '|') { i++; alts.push(seq(true)); } i++; let opt = false; if (p[i] === '?') { opt = true; i++; } items.push({ alts, opt }); continue; }
      if (stop && (c === '|' || c === ')')) break;
      if (c === '{') { flush(); const j = p.indexOf('}', i); items.push({ slot: p.slice(i + 1, j) }); i = j + 1; continue; }
      if (c === '*') { flush(); items.push({ wild: true }); i++; continue; }
      word += c; i++;
    }
    flush(); return items;
  }
  return seq(false);
}
const PARTICLE_ALT = { wa: ['wa', 'ha'], e: ['e', 'he'] };
function chExpand(items, cap = 600) {
  let out = [{ toks: [], cap: {} }];
  for (const it of items) {
    let opts;
    if (it.w != null) { const w = it.w.toLowerCase().replace(/[^a-z']/g, '').replace(/'/g, ''); opts = (PARTICLE_ALT[w] || [w]).map(x => ({ toks: x ? [x] : [], cap: {} })); }
    else if (it.wild) opts = [{ toks: ['*'], cap: {} }];
    else if (it.slot === 'name') { const nm = chCanon(S.profile.name || ''); opts = nm ? [{ toks: [nm], cap: {} }] : []; }
    else if (it.slot) opts = (CHAT_SLOTS[it.slot] || []).flatMap(v => chExpand(chParse(String(v.p || v.ro).toLowerCase()), 40).map(e => ({ toks: e.toks, cap: { [it.slot]: v } })));
    else { opts = it.alts.flatMap(a => chExpand(a, cap)); if (it.opt) opts.push({ toks: [], cap: {} }); }
    const nx = [];
    for (const a of out) for (const b of opts) { if (nx.length >= cap) break; nx.push({ toks: a.toks.concat(b.toks), cap: Object.assign({}, a.cap, b.cap) }); }
    out = nx;
  }
  return out;
}
const CH_CACHE = new Map();
function chCompile(pattern) {
  if (/\{name\}/.test(pattern)) pattern = pattern + '\u0000' + (S.profile.name || '');
  if (CH_CACHE.has(pattern)) return CH_CACHE.get(pattern);
  const clean = String(pattern).split('\u0000')[0].toLowerCase().replace(/[,.!…。、！？~〜"“”]|(?<!\))\?/g, ' ');
  const ex = chExpand(chParse(clean)).map(e => {
    const c = chCanon(e.toks.join(''));
    const o = { toks: e.toks, cap: e.cap, c, l: chLoose(c) };
    if (c.includes('*')) { const parts = c.split('*'); o.re = new RegExp('^' + parts.map(x => x.replace(/[^a-z]/g, '')).join('([a-z]{1,40})') + '$'); o.reL = new RegExp('^' + parts.map(x => chLoose(x)).join('([a-z]{1,40})') + '$'); }
    return o;
  });
  CH_CACHE.set(pattern, ex);
  return ex;
}
/* padrões de uma forma: o romaji de exibição + variações extras */
function formPatterns(f) { return (f.alt || []).concat([f.ro]); }
/* compara o texto do aluno com uma forma. Retorna {q: 'exact'|'variant'|'spelling', cap, wild} ou null */
function chMatchForm(input, f, inC, inL) {
  inC = inC != null ? inC : chCanon(input); inL = inL != null ? inL : chLoose(inC);
  if (!inC) return null;
  if (f.jp) { const j = String(f.jp).replace(/[。、！？!?.,…「」〜~\s]/g, ''), x = String(input).normalize('NFKC').replace(/[。、！？!?.,…「」〜~\s]/g, ''); if (j && kataToHira(j) === kataToHira(x)) return { q: 'exact', cap: {} }; }
  if (f.re && f.re.test(inC)) return { q: 'exact', cap: {} };
  let best = null;
  for (const p of formPatterns(f)) {
    for (const e of chCompile(p)) {
      if (e.re) {
        let m = inC.match(e.re); if (m) return { q: 'exact', cap: e.cap, wild: m[1] };
        m = inL.match(e.reL); if (m && !best) best = { q: 'variant', cap: e.cap, wild: m[1] };
        continue;
      }
      if (e.c === inC) return { q: 'exact', cap: e.cap };
      if (e.l === inL) { if (!best || best.q !== 'variant') best = { q: 'variant', cap: e.cap }; continue; }
      if (!best && e.l.length >= 4) {
        const max = e.l.length >= 12 ? 2 : 1;
        if (chLev(inL, e.l, max) <= max) best = { q: 'spelling', cap: e.cap, target: e };
      }
    }
  }
  return best;
}
/* troca de partícula: a frase só difere por UMA partícula (は/が/を/に/で/へ/と/も) */
const PARTICLES = ['wa', 'ga', 'o', 'ni', 'de', 'e', 'to', 'mo', 'no'];
function chParticleSwap(inL, f) {
  for (const p of formPatterns(f)) {
    for (const e of chCompile(p)) {
      if (e.re) continue;
      for (let k = 0; k < e.toks.length; k++) {
        const t = e.toks[k] === 'ha' ? 'wa' : e.toks[k] === 'he' ? 'e' : e.toks[k];
        if (!PARTICLES.includes(t) || k === 0) continue;
        for (const alt of PARTICLES.concat([''])) {
          if (alt === t) continue;
          const toks = e.toks.slice(); toks[k] = alt;
          if (chLoose(chCanon(toks.join(''))) === inL) return { right: t, used: alt, cap: e.cap };
        }
      }
    }
  }
  return null;
}

/* ---------- o que o aluno já estudou (dados reais da Academia) ---------- */
function chKnows(uses) {
  return [].concat(uses || []).every(id => {
    if (!id) return true;
    if (id.startsWith('chat:')) { const r = S.items[id]; return !!(r && r.seen); }
    if (LESSON[id]) return lessonPassed(id);
    if (CAT[id]) return catPassed(id);
    return true;
  });
}
/* quanto o aluno domina as lições usadas (itens dominados/aprendendo) — prioriza o que foi revisado */
function chMastery(uses) {
  const ls = [].concat(uses || []).filter(id => LESSON[id]);
  if (!ls.length) return 0.5;
  let t = 0, n = 0;
  ls.forEach(id => LESSON[id].items.forEach(it => { const s = itemStatus(it.id); n++; t += s === 'dominada' ? 1 : s === 'aprendendo' ? 0.6 : s === 'revisar' ? 0.3 : s === 'vista' ? 0.15 : 0; }));
  return n ? t / n : 0;
}
/* nível da conversa: acompanha o progresso real, não um nível escolhido */
function chTier() {
  const st = currentStage();
  if (st === 'pro') return 4;
  if (st === 'ava') return 3;
  if (st === 'int') return 2;
  return 1;
}
const CH_TIER_NAME = ['', 'Iniciante', 'Intermediário', 'Avançado', 'Proficiente'];

/* ---------- registro (formalidade) ----------
   c = casual, n = neutro, p = polido (です/ます), k = keigo/atendimento */
const REG_NAME = { c: 'casual', n: 'neutro', p: 'polido (です/ます)', k: 'muito formal (keigo)' };
function chRegVerdict(want, got) {
  if (!got || got === 'n' || got === want) return 'ok';
  if (want === 'c') return got === 'p' ? 'stiff' : 'stiff2';
  if (want === 'p') return got === 'k' ? 'ok' : 'casual';
  if (want === 'k') return got === 'p' ? 'ok' : 'casual';
  return 'ok';
}

/* ---------- estado salvo ---------- */
function defaultChat() {
  return {
    v: 1,
    settings: { ro: true, pt: true, listen: false, sugg: false },
    chars: {}, threads: {}, facts: {}, scenes: {}, challenges: {},
    corrections: [], ini: { day: null, count: 0 },
    xp: { day: null, n: 0, got: {} },
    stats: { sent: 0, ok: 0, social: 0, gram: 0, vocab: 0, spell: 0, unknown: 0, scenes: 0, hints: 0 }
  };
}
function chState(id) {
  const c = S.chat.chars[id] || (S.chat.chars[id] = {});
  return fillDefaults(c, { met: false, unread: 0, pending: null, lastInit: null, recent: [], active: null, lastAt: 0, unlockSeen: false });
}
function chThread(id) { return S.chat.threads[id] || (S.chat.threads[id] = []); }
const CH_THREAD_MAX = 160;
function chPush(id, msg) {
  const th = chThread(id); msg.t = msg.t || Date.now(); th.push(msg);
  if (th.length > CH_THREAD_MAX) th.splice(0, th.length - CH_THREAD_MAX);
  return msg;
}
function chFact(k) { return S.chat.facts[k]; }

/* ---------- personagens: desbloqueio pelos dados reais ---------- */
function chUnlocked(c) { try { return !c.unlock || c.unlock.test(); } catch (e) { return false; } }
function chUnlockProgress(c) { try { return c.unlock && c.unlock.progress ? c.unlock.progress() : null; } catch (e) { return null; } }

/* ---------- cenas ---------- */
const CH_SCENE = {};
CHAT_SCENES.forEach(sc => { CH_SCENE[sc.id] = sc; });
function chSceneOpen(sc) {
  if (!chKnows(sc.need)) return false;
  if (sc.after && !chFact(sc.after)) return false;
  if (sc.notAfter && chFact(sc.notAfter)) return false;
  return true;
}
function chScenesFor(cid) { return CHAT_SCENES.filter(sc => sc.char === cid && !sc.intro && chSceneOpen(sc)); }
function chLockedScenes(cid) { return CHAT_SCENES.filter(sc => sc.char === cid && !sc.intro && !sc.hidden && !chSceneOpen(sc) && !(sc.after && !chFact(sc.after))); }
function chNodes(act) { return act.nodes || (CH_SCENE[act.scene] && CH_SCENE[act.scene].nodes) || []; }
function chNode(act) { const ns = chNodes(act); return ns.find(n => n.id === act.node) || null; }

/* ---------- vocabulário do chat no sistema de revisão ---------- */
function chItem(k) { return ITEM['chat:' + k]; }
function chPresent(k) {
  const it = chItem(k); if (!it) return false;
  const was = S.items[it.id] && S.items[it.id].seen;
  markSeen(it.id);
  if (!was) chGain(1, 'novo:' + k, true);
  return !was;
}

/* ---------- XP do chat (complementar, com limite diário e sem farm) ---------- */
const CH_XP_CAP = 150;
function chGain(n, key, once) {
  const x = S.chat.xp, today = dayKey();
  if (x.day !== today) { x.day = today; x.n = 0; x.got = {}; }
  if (key) { const k = once ? 'sempre:' + key : key; if (once) { S.chat.xpOnce = S.chat.xpOnce || {}; if (S.chat.xpOnce[key]) return 0; S.chat.xpOnce[key] = 1; } else { if (x.got[k]) return 0; x.got[k] = 1; } }
  n = Math.max(0, Math.min(n, CH_XP_CAP - x.n));
  if (!n) return 0;
  x.n += n; addXP(n);
  if (CHV) CHV.gain += n;
  return n;
}

/* ---------- textos dinâmicos ({name}, {food}, {*}) ---------- */
function chFill(str, ctx, field) {
  return String(str || '').replace(/\{(\w+|\*)\}/g, (m, k) => {
    if (k === 'name') return field === 'say' ? '' : (S.profile.name || '');
    const v = ctx && ctx[k];
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[field === 'say' ? 'jp' : field] || v.jp || '';
  });
}
function chLine(l, ctx) {
  const o = { jp: chFill(l.jp, ctx, 'jp'), ro: chFill(l.ro, ctx, 'ro'), pt: chFill(l.pt, ctx, 'pt'), say: l.say ? chFill(l.say, ctx, 'say') : chFill(l.jp, ctx, 'say') };
  if (l.slow) o.slow = true;
  return o;
}
function chTod() { const h = new Date().getHours(); return h < 11 ? 'manha' : h < 18 ? 'tarde' : 'noite'; }
function chLinesOf(ls, ctx) {
  const out = [];
  [].concat(ls || []).forEach(l => {
    if (!l) return;
    if (l.tod) l = l.tod[chTod()] || l.tod.tarde;
    if (l.v) { const ok = l.v.filter(x => chKnows(x.need)); l = (ok[ok.length - 1] || l.v[0]); }
    if (l.fact && !chFact(l.fact)) return;
    if (l.dyn) { const r = CHAT_DYN_LINES[l.dyn] && CHAT_DYN_LINES[l.dyn](ctx); if (r) [].concat(r).forEach(x => out.push(chLine(x, ctx))); return; }
    out.push(chLine(l, ctx));
  });
  return out;
}

/* ---------- avaliação da resposta (o "cérebro" local) ---------- */
function chFormsKnown(forms) { return forms.filter(f => chKnows(f.uses)); }
function chBestForm(node, want) {
  const br = (node.ask && node.ask.b || []).filter(b => !b.meta && !b.silent);
  const main = br.length ? br[0] : null; if (!main) return null;
  const all = br.flatMap(b => b.f.map(f => ({ f, b })));
  const okReg = x => chRegVerdict(want, x.f.reg) === 'ok';
  const known = all.filter(x => chKnows(x.f.uses) && !x.f.wild);
  const pickFrom = arr => arr.slice().sort((a, b) => (okReg(b) - okReg(a)) || (chMastery(b.f.uses) - chMastery(a.f.uses)))[0];
  return pickFrom(known.filter(x => x.b === main)) || pickFrom(known) || pickFrom(all.filter(x => x.b === main && !x.f.wild)) || null;
}
function chEvaluate(node, text, want, ctx) {
  const inC = chCanon(text), inL = chLoose(inC);
  const res = { input: text, kind: 'unknown' };
  if (!inC) { res.kind = 'empty'; return res; }
  const branches = (node.ask && node.ask.b) || [];
  // 1) intenções esperadas neste ponto da conversa
  let hit = null;
  for (const b of branches) {
    for (const f of b.f) {
      const m = chMatchForm(text, f, inC, inL);
      if (!m) continue;
      const rank = { exact: 3, variant: 2, spelling: 1 }[m.q];
      if (!hit || rank > hit.rank) hit = { b, f, m, rank };
      if (rank === 3) break;
    }
    if (hit && hit.rank === 3) break;
  }
  // erro previsto e escrito certinho vale mais que uma resposta certa "quase" (erro de escrita)
  if (hit && hit.m.q === 'spelling' && chNearHit(node, inC, inL)) hit = null;
  // o curinga (*) não pode "engolir" uma partícula trocada: アニメに すき é erro de partícula, não "(animeni) ga suki"
  if (hit && hit.m.wild != null && branches.some(b => !b.meta && b.f.some(f => !f.wild && (() => { const sw = chParticleSwap(inL, f); return sw && sw.used; })()))) hit = null;
  if (hit) {
    res.branch = hit.b; res.form = hit.f; res.cap = Object.assign({}, hit.m.cap); if (hit.m.wild) res.cap['*'] = chWildVal(hit.m.wild, text);
    const rv = chRegVerdict(hit.b.reg || want, hit.f.reg);
    res.reg = rv;
    if (hit.m.q === 'spelling') res.kind = 'spelling';
    else if (rv !== 'ok') res.kind = 'social';
    else res.kind = hit.f.odd ? 'odd' : 'ok';
    res.variant = hit.m.q === 'variant';
    return res;
  }
  // 2) erros comuns previstos para esta pergunta
  const nr = chNearHit(node, inC, inL);
  if (nr) {
    { res.kind = nr.kind || 'vocab'; res.why = nr.why; res.fix = nr.fix ? chFormRef(branches, nr.fix) : null; return res; }
  }
  // 3) partícula trocada ou ausente
  for (const b of branches) {
    if (b.meta) continue;
    for (const f of b.f) {
      const sw = chParticleSwap(inL, f);
      if (!sw) continue;
      res.branch = b; res.form = f; res.cap = sw.cap;
      if (!sw.used && (want === 'c' || f.reg === 'c')) { res.kind = (b.reg || want) === 'c' ? 'ok' : 'social'; res.dropped = sw.right; res.reg = chRegVerdict(b.reg || want, f.reg); return res; }
      res.kind = 'grammar'; res.particle = sw; return res;
    }
  }
  // 4) frases que o app conhece, mas que não respondem a esta pergunta
  for (const it of CHAT_INTENTS_ALL()) {
    if (branches.some(b => b.intent === it.id)) continue;
    for (const f of it.f) { const m = chMatchForm(text, f, inC, inL); if (m && m.q !== 'spelling') { res.kind = 'vocab'; res.other = { intent: it, form: f }; return res; } }
  }
  return res;
}
function chNearHit(node, inC, inL) {
  return ((node.ask && node.ask.near) || []).find(nr => [].concat(nr.p).some(p => chCompile(p).some(e => e.re ? e.re.test(inC) : (e.c === inC || e.l === inL)))) || null;
}
function chWildVal(w, text) {
  // devolve o trecho original quando possível (nome, título digitado em kana)
  const t = String(text).trim().replace(/[。、！？!?.,]/g, '');
  return t.length <= 24 && !/\s/.test(t) && /[^\x00-\x7f]/.test(t) ? w : w.charAt(0).toUpperCase() + w.slice(1);
}
function chFormRef(branches, ref) { if (typeof ref === 'object') return ref; const [bi, fi] = String(ref).split('.').map(Number); const b = branches[bi || 0]; return b && b.f[fi || 0]; }

/* ---------- camada de "cérebros" (preparada para um backend futuro) ----------
   O app só conversa com CHAT_BRAINS[chatBrainId()].reply(pedido).
   Pedido: { char, text, scene, node, register, tier, known: [ids de lições aprovadas] }
   Resposta: { result, lines } — o mesmo formato para roteiro ou IA.
   Regras para um backend generativo no futuro: a chave fica NO SERVIDOR (nunca aqui),
   o pedido não leva nome, e-mail nem dados pessoais, e a resposta continua passando
   pelo controle pedagógico (chKnows) antes de aparecer para o aluno. */
const CHAT_BRAINS = {
  roteiro: {
    id: 'roteiro', label: 'Roteiros e intenções (funciona sem internet)', generative: false,
    reply(req) { return Promise.resolve(chLocalReply(req)); }
  }
  // servidor: { id: 'servidor', generative: true, reply(req) { return fetch(CHAT_BACKEND.url, {...}) } }  — desativado
};
const CHAT_BACKEND = { url: null, enabled: false };
function chatBrainId() { return CHAT_BACKEND.enabled && CHAT_BACKEND.url && CHAT_BRAINS.servidor ? 'servidor' : 'roteiro'; }
/* entrada por voz (futuro): o reconhecimento de fala entrará aqui sem mudar o resto */
const CHAT_VOICE_INPUT = { available: typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition), enabled: false };

/* ---------- motor da conversa ---------- */
let CHV = null; // conversa aberta: { id, gain, busy }
function chChar(id) { return CHAT_CHARS.find(c => c.id === id); }
function chWant(cid, act) {
  const c = chChar(cid), sc = act && act.scene ? CH_SCENE[act.scene] : null, nd = act ? chNode(act) : null;
  let w = (nd && nd.reg) || (sc && sc.reg) || c.reg;
  if (typeof w === 'function') w = w();
  return w;
}
function chCtx(act) { return Object.assign({}, S.chat.facts.ctx || {}, act && act.ctx || {}); }
function chStartScene(cid, sid, opts = {}) {
  const sc = CH_SCENE[sid]; const st = chState(cid);
  if (!sc || !chUnlocked(chChar(cid))) return false;
  const act = { scene: sid, node: null, tries: 0, hint: 0, tags: [], start: Date.now(), ctx: {}, helped: false };
  if (sc.build) { const b = sc.build(); if (!b) return false; act.nodes = b.nodes; Object.assign(act.ctx, b.ctx || {}); }
  const ns = chNodes(act); if (!ns.length) return false;
  act.node = ns[0].id;
  st.active = act; st.lastAt = Date.now();
  if (!opts.initiative) chPush(cid, { from: 'sys', kind: 'topic', txt: sc.title });
  chPresentNode(cid, act, opts);
  return true;
}
function chStartFree(cid) {
  const st = chState(cid);
  st.active = { scene: null, node: 'free', tries: 0, hint: 0, tags: [], start: Date.now(), ctx: {}, free: true };
  chPush(cid, { from: 'sys', kind: 'topic', txt: 'Conversa livre' });
  const c = chChar(cid);
  chPushLines(cid, chLinesOf(c.freeOpen, {}));
}
function chPushLines(cid, lines, extra = {}) {
  lines.forEach(l => chPush(cid, Object.assign({ from: 'char', jp: l.jp, ro: l.ro, pt: l.pt, say: l.say }, l.slow ? { slow: true } : {}, extra)));
}
function chFillF(f, ctx) { return f ? { jp: chFill(f.jp, ctx, 'jp'), ro: chFill(f.ro, ctx, 'ro'), pt: chFill(f.pt, ctx, 'pt'), reg: f.reg } : null; }
/* mostra as falas do nó e, se o aluno ainda não estudou o que a resposta exige, apresenta a expressão */
function chPresentNode(cid, act, opts = {}) {
  const nd = chNode(act); if (!nd) return;
  const ctx = chCtx(act);
  chPushLines(cid, chLinesOf(nd.say, ctx), opts.initiative ? { init: true } : {});
  if (nd.card && CHAT_CARDS[nd.card]) chPush(cid, { from: 'sys', kind: 'card', card: nd.card });
  chTeach(cid, act, nd);
  if (!nd.ask) { chAdvance(cid, act, nd.next); }
}
function chTeach(cid, act, nd) {
  const want = chWant(cid, act);
  const shown = [];
  (nd.teach || []).forEach(k => {
    const it = chItem(k) || ITEM[k]; if (!it) return;
    const own = String(it.id).startsWith('chat:');
    if (own) { const r = S.items[it.id]; const st = itemStatus(it.id); if (st === 'dominada') return; const isNew = !(r && r.seen); chPresent(k); shown.push({ k: it.id, isNew, own }); }
    else if (!chKnows([it.lesson && it.lesson.id])) shown.push({ k: it.id, isNew: true, own });
  });
  // a resposta principal exige algo que o aluno ainda não estudou: o personagem apresenta antes de cobrar
  if (nd.ask) {
    const best = chBestForm(nd, want);
    if (best && !chKnows(best.f.uses)) {
      const f = best.f;
      [].concat(f.uses || []).filter(u => u.startsWith('chat:')).forEach(u => { if (!shown.some(s => s.k === u)) { chPresent(u.slice(5)); shown.push({ k: u, isNew: true, own: true }); } });
      chPush(cid, { from: 'sys', kind: 'teach', model: chFillF(f, chCtx(act)), why: nd.ask.why || 'Você ainda não estudou tudo o que esta resposta usa. Aqui está um modelo para continuar a conversa.' });
    }
  }
  if (shown.length) chPush(cid, { from: 'sys', kind: 'new', items: shown.map(s => s.k), fresh: shown.filter(s => s.isNew).map(s => s.k) });
}
function chAdvance(cid, act, next) {
  const st = chState(cid);
  const ns = chNodes(act);
  if (next === 'end' || (next == null && ns.indexOf(chNode(act)) === ns.length - 1)) return chEndScene(cid, act);
  const nx = next != null ? ns.find(n => n.id === next) : ns[ns.indexOf(chNode(act)) + 1];
  if (!nx) return chEndScene(cid, act);
  act.node = nx.id; act.tries = 0; act.hint = 0; act.helped = false;
  st.active = act;
  chPresentNode(cid, act);
}
function chEndScene(cid, act) {
  const st = chState(cid), sc = CH_SCENE[act.scene];
  st.active = null; st.pending = null;
  if (!sc) return;
  const rec = S.chat.scenes[sc.id] || (S.chat.scenes[sc.id] = { n: 0, last: 0 });
  const first = !rec.n;
  rec.n++; rec.last = Date.now();
  S.chat.stats.scenes++;
  (sc.set || []).forEach(k => { if (!S.chat.facts[k]) S.chat.facts[k] = Date.now(); });
  if (sc.char && !st.met) st.met = true;
  const g = chGain(first ? 8 : 3, 'cena:' + sc.id);
  touchStudy();
  chPush(cid, { from: 'sys', kind: 'done', txt: sc.title, xp: g, first });
  chCheckChallenges(cid, act);
}
function chRecordCorrection(cid, res, fix) {
  const c = { t: Date.now(), c: cid, kind: res.kind, said: res.input, why: res.whyTxt || '', fix: fix ? { jp: fix.jp, ro: fix.ro, pt: fix.pt } : null };
  S.chat.corrections.push(c);
  if (S.chat.corrections.length > 120) S.chat.corrections.splice(0, S.chat.corrections.length - 120);
}
function chFbText(res, want, cid) {
  const c = chChar(cid);
  if (res.kind === 'social') {
    const r = res.reg;
    if (r === 'casual') return `A frase está certa, mas é casual demais para falar com ${c.pt.quem}. Com ${c.pt.quem}, o natural é a forma ${REG_NAME[want]}.`;
    if (r === 'stiff') return `Está certo! Só ficou mais formal do que o normal entre amigos. Com ${c.pt.quem}, a forma casual soa mais natural.`;
    if (r === 'stiff2') return `Está certo, mas é formal demais para falar com ${c.pt.quem}: soa distante ou até engraçado. Prefira a forma casual.`;
  }
  if (res.kind === 'spelling') return 'Entendi o que você quis dizer! Só a escrita tem um pequeno erro. Compare com a forma correta abaixo.';
  if (res.kind === 'grammar' && res.particle) {
    const P = { wa: 'は (wa) marca o assunto da frase', ga: 'が (ga) marca quem faz a ação ou o que é desejado/existe', o: 'を (o) marca o objeto direto da ação', ni: 'に (ni) marca destino, horário ou quem recebe', de: 'で (de) marca o lugar da ação ou o meio', e: 'へ (e) marca a direção', to: 'と (to) significa "e" ou "com"', mo: 'も (mo) significa "também"', no: 'の (no) liga palavras: "de"' };
    const u = res.particle.used, rt = res.particle.right;
    return (u ? `A partícula ${PJ[u] || u} não funciona aqui. ` : `Faltou a partícula ${PJ[rt] || rt}. `) + 'Use ' + (PJ[rt] || rt) + ': ' + (P[rt] || '') + '.';
  }
  if (res.kind === 'vocab' && res.other) return `“${res.other.form.jp}” (${res.other.form.ro}) significa “${res.other.form.pt}”. É uma frase válida, mas não responde ao que ${c.name} disse.`;
  if (res.why) return res.why;
  if (res.kind === 'odd') return res.form && res.form.why || 'Dá para entender, mas não é o mais natural aqui.';
  return '';
}
const PJ = { wa: 'は (wa)', ga: 'が (ga)', o: 'を (o)', ni: 'に (ni)', de: 'で (de)', e: 'へ (e)', to: 'と (to)', mo: 'も (mo)', no: 'の (no)' };
const KIND_INFO = {
  ok: { t: 'Correta e natural', ic: '✓' }, variant: { t: 'Correta', ic: '✓' },
  odd: { t: 'Correta, mas pouco natural', ic: '〜' },
  social: { t: 'Certa, mas inadequada socialmente', ic: '敬' }, spelling: { t: 'Erro de escrita', ic: '✎' },
  grammar: { t: 'Erro gramatical', ic: '文' }, vocab: { t: 'Erro de vocabulário', ic: '語' }, unknown: { t: 'Não reconhecida', ic: '?' }
};

/* resposta local (roteiro): devolve o resultado e já aplica no estado */
const CH_ADVANCE = ['ok', 'social', 'spelling', 'odd'];
function chLocalReply(req) {
  const cid = req.char, st = chState(cid), act = st.active;
  const c = chChar(cid);
  if (!act) return { kind: 'none' };
  if (act.free) return chFreeReply(cid, act, req.text);
  const nd = chNode(act); if (!nd || !nd.ask) return { kind: 'none' };
  const want = chWant(cid, act), ctx = chCtx(act);
  const res = chEvaluate(nd, req.text, want, ctx);
  const me = chPush(cid, { from: 'me', txt: req.text, kind: res.kind });
  S.chat.stats.sent++;
  const helped = act.hint >= 4 || act.helped;
  // pedidos de ajuda dentro da conversa: "mou ichido", "wakarimasen"...
  if (res.kind === 'unknown' || (res.kind === 'vocab' && res.other)) {
    const meta = chMeta(req.text);
    if (meta) { me.kind = 'meta'; return chDoMeta(cid, act, nd, meta); }
  }
  if (CH_ADVANCE.includes(res.kind) && res.branch) {
    const b = res.branch;
    const key = act.scene + '#' + act.node;
    const base = res.kind === 'ok' ? (helped ? 1 : act.tries ? 3 : 4) : 2;
    const got = chGain(base, key);
    S.chat.stats[res.kind === 'social' ? 'social' : res.kind === 'spelling' ? 'spell' : 'ok']++;
    const cap = Object.assign({}, ctx, res.cap);
    if (res.kind !== 'ok' || res.variant || res.dropped) {
      const fix = res.kind === 'social' ? chBestForm(nd, want) : null;
      const model = res.kind === 'spelling' ? res.form : fix ? fix.f : res.form;
      const txt = res.dropped && res.kind === 'ok' ? `Na fala casual é comum omitir a partícula ${PJ[res.dropped] || res.dropped}. Ficou natural!` : res.variant && res.kind === 'ok' ? 'Pequena variação de romaji, aceita. Grafia padrão:' : chFbText(res, want, cid);
      res.whyTxt = txt;
      if (res.kind !== 'ok') chRecordCorrection(cid, res, chFillF(model, cap));
      chPush(cid, { from: 'sys', kind: 'fb', res: res.kind === 'ok' ? 'variant' : res.kind, txt, model: model && !model.wild ? chFillF(model, cap) : null, alts: res.kind === 'social' ? chAltForms(nd, want, res.form, cap) : null });
    }
    me.xp = got; me.kind = res.kind === 'ok' && res.variant ? 'variant' : res.kind;
    // vocabulário do chat usado corretamente vai para a revisão
    [].concat(res.form.uses || []).filter(u => u.startsWith('chat:') && ITEM[u]).forEach(u => { const first = !(S.items[u] && S.items[u].c); recordAnswer(u, true, 'chat'); if (first) chGain(3, 'usou:' + u, true); });
    if (b.tag) [].concat(b.tag).forEach(t => { if (!act.tags.includes(t)) act.tags.push(t); });
    if (res.kind === 'ok' && !helped) { if (!act.tags.includes('natural') && !act.unnatural) act.tags.push('natural'); }
    else { act.unnatural = true; act.tags = act.tags.filter(t => t !== 'natural'); }
    if (b.set) [].concat(b.set).forEach(k => { S.chat.facts[k] = Date.now(); });
    if (b.keep) { S.chat.facts.ctx = S.chat.facts.ctx || {}; const v = res.cap[b.keep.from || '*']; if (v != null) S.chat.facts.ctx[b.keep.as] = typeof v === 'string' ? { jp: v, ro: v, pt: v } : { jp: v.jp, ro: v.ro, pt: v.pt }; }
    Object.keys(res.cap).forEach(k => { const v = res.cap[k]; act.ctx[k] = typeof v === 'string' ? v : { jp: v.jp, ro: v.ro, pt: v.pt }; });
    if (b.dyn && CHAT_DYN_ANSWER[b.dyn]) CHAT_DYN_ANSWER[b.dyn](cid, act, res, true);
    chPushLines(cid, chLinesOf(b.r, chCtx(act)));
    chAdvance(cid, act, b.next);
    if (b.chain && !chState(cid).active) chStartScene(cid, b.chain);
    return res;
  }
  // erro: a conversa não avança; mostra a correção (curta) e deixa tentar de novo
  act.tries++;
  if (res.kind === 'unknown') S.chat.stats.unknown++;
  else S.chat.stats[res.kind === 'grammar' ? 'gram' : res.kind === 'social' ? 'social' : 'vocab']++;
  if (nd.ask.dynWrong && CHAT_DYN_ANSWER[nd.ask.dynWrong]) { me.kind = res.kind === 'unknown' ? 'vocab' : res.kind; if (CHAT_DYN_ANSWER[nd.ask.dynWrong](cid, act, res, false)) return res; }
  if (res.kind !== 'unknown') {
    act.unnatural = true;
    const fixF = res.fix || (res.form && res.kind === 'grammar' ? res.form : null) || (chBestForm(nd, want) || {}).f;
    const txt = chFbText(res, want, cid); res.whyTxt = txt;
    const model = fixF && !fixF.wild ? chFillF(fixF, Object.assign({}, ctx, res.cap)) : chModel(nd, want, ctx);
    chRecordCorrection(cid, res, model);
    chPush(cid, { from: 'sys', kind: 'fb', res: res.kind, txt, model, retry: true });
    [].concat((fixF && fixF.uses) || []).filter(u => u.startsWith('chat:') && ITEM[u]).forEach(u => recordAnswer(u, false, 'chat'));
    return res;
  }
  chPushLines(cid, chLinesOf([pick(c.confused)], {}));
  if (act.tries >= 2) chPush(cid, { from: 'sys', kind: 'hint', lv: 4, txt: 'Não reconheci essa resposta. Veja um modelo (ou toque em Dica para ajuda passo a passo):', model: chModel(nd, want, ctx) });
  return res;
}
function chModel(nd, want, ctx) { const b = chBestForm(nd, want); return b ? chFillF(b.f, ctx) : null; }
function chAltForms(nd, want, used, ctx) {
  const br = (nd.ask.b || []).filter(b => !b.meta && b.f.includes(used));
  return (br[0] ? br[0].f : []).filter(f => f !== used && !f.wild && chKnows(f.uses)).slice(0, 4).map(f => chFillF(f, ctx));
}
/* pedidos de ajuda que funcionam em qualquer ponto */
function chMeta(text) {
  for (const m of CHAT_META) for (const f of m.f) { const r = chMatchForm(text, f); if (r && r.q !== 'spelling') return m.id; }
  return null;
}
function chDoMeta(cid, act, nd, meta) {
  const c = chChar(cid);
  if (meta === 'repeat' || meta === 'slow') {
    const th = chThread(cid); const last = [...th].reverse().find(m => m.from === 'char');
    chPushLines(cid, chLinesOf(c.repeat, {}));
    if (last) chPush(cid, { from: 'char', jp: last.jp, ro: last.ro, pt: last.pt, say: last.say, slow: true });
    return { kind: 'meta', meta };
  }
  if (meta === 'dontknow') {
    chPushLines(cid, chLinesOf(c.dontknow, {}));
    act.hint = Math.max(act.hint, 2);
    chPush(cid, { from: 'sys', kind: 'hint', lv: 3, txt: chHintText(cid, act, nd, 3), model: null });
    return { kind: 'meta', meta };
  }
  return { kind: 'meta', meta };
}

/* ---------- conversa livre ---------- */
function chFreeReply(cid, act, text) {
  const c = chChar(cid);
  const me = chPush(cid, { from: 'me', txt: text, kind: 'free' });
  S.chat.stats.sent++;
  const want = chWant(cid, act);
  const inC = chCanon(text), inL = chLoose(inC);
  const rank = { exact: 3, variant: 2, spelling: 1 };
  let hit = null;
  const intents = CHAT_INTENTS_ALL().filter(it => c.free[it.id]);
  // a resposta que o personagem acabou de pedir tem prioridade (ex.: ele perguntou “e você?”)
  const order = act.expect ? intents.filter(it => it.id === act.expect).concat(intents.filter(it => it.id !== act.expect)) : intents;
  for (const it of order) {
    for (const f of it.f) { const m = chMatchForm(text, f, inC, inL); if (m && (!hit || rank[m.q] > rank[hit.m.q])) hit = { it, f, m }; }
    if (hit && hit.m.q === 'exact' && act.expect && hit.it.id === act.expect) break;
  }
  act.expect = null;
  if (!hit) {
    const meta = chMeta(text);
    if (meta === 'repeat' || meta === 'slow') { me.kind = 'meta'; return chDoMeta(cid, act, { ask: { b: [] } }, meta); }
    S.chat.stats.unknown++;
    me.kind = 'unknown';
    chPushLines(cid, chLinesOf([pick(c.confused)], {}));
    chPush(cid, { from: 'sys', kind: 'hint', lv: 0, txt: 'Na conversa livre eu reconheço cumprimentos, perguntas do dia a dia e reações (é um sistema de roteiros, não uma IA). Experimente uma das ideias abaixo ou escolha um assunto.', ideas: chFreeIdeas(cid).slice(0, 4) });
    return { kind: 'unknown' };
  }
  const rv = chRegVerdict(want, hit.f.reg);
  const kind = hit.m.q === 'spelling' ? 'spelling' : rv !== 'ok' ? 'social' : 'ok';
  me.kind = kind === 'ok' && hit.m.q === 'variant' ? 'variant' : kind;
  const got = chGain(kind === 'ok' ? 3 : 1, 'livre:' + cid + ':' + hit.it.id);
  me.xp = got;
  S.chat.stats[kind === 'ok' ? 'ok' : kind === 'social' ? 'social' : 'spell']++;
  [].concat(hit.f.uses || []).filter(u => u.startsWith('chat:') && ITEM[u]).forEach(u => { if (S.items[u] && S.items[u].seen) recordAnswer(u, kind !== 'spelling', 'chat'); });
  if (kind !== 'ok') {
    const better = kind === 'spelling' ? hit.f : hit.it.f.filter(f => chRegVerdict(want, f.reg) === 'ok' && chKnows(f.uses))[0] || hit.it.f.filter(f => chRegVerdict(want, f.reg) === 'ok')[0] || hit.f;
    const res = { kind, reg: rv, input: text };
    res.whyTxt = chFbText(res, want, cid);
    chRecordCorrection(cid, res, chFillF(better, {}));
    chPush(cid, { from: 'sys', kind: 'fb', res: kind, txt: res.whyTxt, model: chFillF(better, {}) });
    act.unnatural = true; act.tags = act.tags.filter(t => t !== 'natural');
  }
  if (!act.tags.includes(hit.it.id)) act.tags.push(hit.it.id);
  if (kind === 'ok' && !act.unnatural && !act.tags.includes('natural')) act.tags.push('natural');
  const rep = c.free[hit.it.id];
  const lines = Array.isArray(rep[0]) ? pick(rep) : rep;
  chPushLines(cid, chLinesOf(lines, chCtx(act)));
  if (hit.it.then) act.expect = hit.it.then;
  if (hit.it.id === 'bye') chEndFree(cid, act);
  chCheckChallenges(cid, act);
  return { kind };
}
function chEndFree(cid, act) { const st = chState(cid); st.active = null; st.met = true; touchStudy(); chPush(cid, { from: 'sys', kind: 'done', txt: 'Conversa livre', xp: 0 }); }
function chFreeIdeas(cid) {
  const c = chChar(cid);
  return CHAT_INTENTS_ALL().filter(it => c.free[it.id] && it.idea).map(it => { const f = it.f.filter(x => chKnows(x.uses) && chRegVerdict(chWant(cid, chState(cid).active), x.reg) === 'ok')[0] || it.f.filter(x => chKnows(x.uses))[0]; return f ? { idea: it.idea, jp: f.jp, ro: f.ro, pt: f.pt } : null; }).filter(Boolean);
}

/* ---------- dicas em cinco níveis ---------- */
const HINT_LV = ['', 'Dica de vocabulário', 'Dica gramatical', 'Explicação da pergunta', 'Sugestão de resposta', 'Tradução completa'];
function chHintText(cid, act, nd, lv) {
  const c = chChar(cid), want = chWant(cid, act), h = (nd.ask && nd.ask.h) || [];
  const last = [...chThread(cid)].reverse().find(m => m.from === 'char');
  const best = chBestForm(nd, want);
  if (lv === 1) {
    if (h[0]) return h[0];
    const toks = best ? best.f.ro.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(w => w.length > 2) : [];
    const found = toks.map(w => RO_WORD()[w]).filter(Boolean).slice(0, 3);
    return found.length ? 'Palavras úteis: ' + found.map(it => it.jp + ' (' + it.ro + ') = ' + it.pt).join(' · ') : 'Pense nas palavras que você estudou sobre este assunto.';
  }
  if (lv === 2) return h[1] || (want === 'c' ? `Com ${c.pt.quem}, responda de forma casual: frases curtas, sem です/ます.` : `Com ${c.pt.quem}, use a forma educada: termine com です ou ます.`);
  if (lv === 3) return (nd.ask && nd.ask.ex) || (last ? `${c.name} disse algo como “${last.pt}”. Responda a isso.` : 'Responda ao que foi dito.');
  if (lv === 5) return last ? `Tradução: “${last.pt}”` : '';
  return '';
}
let RO_IDX = null;
function RO_WORD() {
  if (RO_IDX) return RO_IDX;
  RO_IDX = {};
  Object.values(ITEM).forEach(it => { const r = String(it.ro || '').toLowerCase(); if (/^[a-z']+$/.test(r) && it.lesson && it.lesson.kind !== 'kana' && !RO_IDX[r]) RO_IDX[r] = it; });
  return RO_IDX;
}
function chHint(cid) {
  const st = chState(cid), act = st.active; if (!act) return;
  if (act.free) { chPush(cid, { from: 'sys', kind: 'hint', lv: 0, txt: 'Ideias para puxar assunto:', ideas: chFreeIdeas(cid).slice(0, 5) }); return; }
  const nd = chNode(act); if (!nd || !nd.ask) return;
  act.hint = Math.min(5, act.hint + 1);
  S.chat.stats.hints++;
  const lv = act.hint, want = chWant(cid, act);
  const msg = { from: 'sys', kind: 'hint', lv, txt: chHintText(cid, act, nd, lv) };
  if (lv === 4) { msg.model = chModel(nd, want); act.helped = true; }
  if (lv === 5) { act.helped = true; msg.models = (nd.ask.b || []).filter(b => !b.meta).map(b => b.f.find(f => chKnows(f.uses) && !f.wild && chRegVerdict(want, f.reg) === 'ok') || b.f.find(f => !f.wild)).filter(Boolean).slice(0, 4).map(f => ({ jp: f.jp, ro: f.ro, pt: f.pt, reg: f.reg })); }
  chPush(cid, msg);
}
/* sugestões opcionais: formas já estudadas, priorizando as mais dominadas */
function chSuggestions(cid) {
  const st = chState(cid), act = st.active; if (!act) return [];
  if (act.free) return chFreeIdeas(cid).slice(0, 3).map(x => ({ jp: x.jp, ro: x.ro, pt: x.pt }));
  const nd = chNode(act); if (!nd || !nd.ask) return [];
  const want = chWant(cid, act), out = [];
  (nd.ask.b || []).filter(b => !b.meta).forEach(b => {
    const f = b.f.filter(x => !x.wild && chKnows(x.uses)).sort((x, y) => (chRegVerdict(want, y.reg) === 'ok') - (chRegVerdict(want, x.reg) === 'ok') || chMastery(y.uses) - chMastery(x.uses))[0];
    if (f) out.push({ jp: chFill(f.jp, chCtx(act), 'jp'), ro: chFill(f.ro, chCtx(act), 'ro'), pt: chFill(f.pt, chCtx(act), 'pt') });
  });
  if (!out.length) { const m = chModel(nd, want); if (m) out.push(m); }
  return out.slice(0, 3);
}

/* ---------- desafios ---------- */
function chCheckChallenges(cid, act) {
  CHAT_CHALLENGES.forEach(ch => {
    if (S.chat.challenges[ch.id] || ch.char !== cid) return;
    if (ch.scene && (!act.scene || act.scene !== ch.scene)) return;
    if (ch.tags && !ch.tags.every(t => act.tags.includes(t))) return;
    if (ch.natural && !act.tags.includes('natural')) return;
    if (ch.scenesDone && !ch.scenesDone.every(id => S.chat.scenes[id] && S.chat.scenes[id].n)) return;
    S.chat.challenges[ch.id] = Date.now();
    addXP(ch.xp); if (CHV) CHV.gain += ch.xp;
    chPush(cid, { from: 'sys', kind: 'challenge', txt: ch.title, xp: ch.xp });
    sfx('level');
  });
}

/* ---------- iniciativa dos personagens ----------
   Só quando o aluno abre o site ou o Chat; nunca durante uma conversa aberta.
   No máximo uma mensagem pendente por personagem, duas novas por dia no total,
   sem cobranças por ausência e sem repetir as últimas conversas. */
function chInitiative() {
  if (!S.profile.onboarded) return 0;
  const today = dayKey(), ini = S.chat.ini;
  if (ini.day !== today) { ini.day = today; ini.count = 0; }
  let made = 0;
  let h = hashStr(today + (S.profile.name || ''));
  const order = CHAT_CHARS.slice().sort((a, b) => ((hashStr(a.id + h) % 97) - (hashStr(b.id + h) % 97)));
  for (const c of order) {
    if (ini.count >= 2) break;
    if (!chUnlocked(c)) continue;
    if (CHV && CHV.id === c.id) continue;
    const st = chState(c.id);
    if (st.pending || st.active || st.lastInit === today) continue;
    let sc = null;
    if (!st.met) sc = CH_SCENE[c.intro];
    else {
      const cands = CHAT_SCENES.filter(x => x.char === c.id && x.init && !x.intro && chSceneOpen(x) && !st.recent.includes(x.id));
      cands.sort((a, b) => ((S.chat.scenes[a.id] || {}).n || 0) - ((S.chat.scenes[b.id] || {}).n || 0) || (hashStr(a.id + today) % 13) - (hashStr(b.id + today) % 13));
      sc = cands[0];
    }
    if (!sc) continue;
    if (!chStartScene(c.id, sc.id, { initiative: true })) continue;
    st.pending = sc.id; st.unread = 1; st.lastInit = today;
    st.recent.push(sc.id); if (st.recent.length > 4) st.recent.shift();
    ini.count++; made++;
  }
  if (made) save();
  return made;
}
function chUnreadTotal() { return CHAT_CHARS.reduce((a, c) => a + (chUnlocked(c) ? (chState(c.id).unread || 0) : 0), 0); }
function chDismiss(cid) {
  const st = chState(cid);
  if (!st.pending) return;
  st.pending = null; st.active = null; st.unread = 0;
  chPush(cid, { from: 'sys', kind: 'note', txt: 'Conversa deixada para depois. Sem problema!' });
  save();
}
