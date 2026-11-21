/* ==========================================================
   Nihongo Quest 11.0 — ADVENTURE MODE RPG (motor e interface)
   - Exploração em mapa de blocos (toque no destino ou use as setas), NPCs, baús, descobertas, coleta e missões.
   - Batalha por turnos: 攻撃 atacar · 言霊 palavra · 魔法 magia · 防御 defender · 道具 itens · 逃げる fugir.
     O “言霊” usa SÓ palavras que o aluno já estudou no app (nqKnownWords) ou que a própria aventura ensinou antes
     (S.rpg.taught). Errar nunca tira vida: o golpe só sai mais fraco e a resposta certa é mostrada com áudio.
   - Progressão própria e separada: nível do herói, EXP de aventura, HP, Ki, equipamentos e inventário (S.rpg).
     O XP e as moedas do Nihongo Quest só vêm de recompensas únicas (nqRewardOnce): missões, chefes, descobertas e baús.
   - Nada aqui marca lições, avaliações, histórico ou o SRS de outras áreas. Palavras da aventura só entram no
     Caderno/Revisão se o aluno tocar em “Salvar no Caderno”.
   ========================================================== */
const RPG_LESSON = { id: 'rpg', title: 'Adventure Mode', kind: 'audio', cat: { id: 'rpg', title: 'Adventure Mode' }, index: 0, items: [] };
const RW = {};
Object.keys(RPG_WORDS).forEach(k => {
  const [jp, kana, ro, pt, note] = RPG_WORDS[k].split('|');
  const it = { k, jp, say: kana, ro, pt, group: 'palavra', kanji: /[一-鿿]/.test(jp) ? jp : '', note: note || '', id: 'rpg:' + k, lesson: RPG_LESSON };
  if (!ITEM[it.id]) { ITEM[it.id] = it; RPG_LESSON.items.push(it); }
  RW[k] = { key: k, jp, kana, ro, pt, note: note || '', itemId: it.id, say: kana };
});
const RPG_W = 9, RPG_H = 11, RPG_T = 32;
const RPG_SLOTS = [['weapon', 'Arma', '剣'], ['shield', 'Escudo', '盾'], ['armor', 'Armadura', '鎧'], ['helm', 'Cabeça', '兜'], ['acc', 'Acessório', '飾']];
const RPG_RARITY = ['', 'Comum', 'Raro', 'Épico'];
const RPG_DIR = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const RPG_SOLID = new Set(['T', '~', 'H', 'I', 'R', '^', 'F', 'X']);

/* ---------- estado ---------- */
function defaultRpg() {
  return { v: 1, started: 0, intro: 0, area: 'vila', x: 4, y: 5, respawn: 'vila',
    hero: { lv: 1, exp: 0, hp: 30, ki: 10 }, equip: { weapon: null, shield: null, armor: 'nuno', helm: null, acc: null },
    inv: {}, spells: {}, quests: {}, flags: {}, opened: {}, spots: {}, gather: {}, signs: {}, visited: {}, kills: {}, taught: {},
    words: {}, riddles: 0, stats: { battles: 0, wins: 0, losses: 0, flees: 0, words: 0, wordsOk: 0 }, opt: { ro: true, pt: true, listen: false }, news: 0 };
}
function rpgState() {
  if (!isPlainObj(S.rpg)) S.rpg = defaultRpg();
  const r = S.rpg, d = defaultRpg();
  ['hero', 'equip', 'inv', 'spells', 'quests', 'flags', 'opened', 'spots', 'gather', 'signs', 'visited', 'kills', 'taught', 'words', 'stats', 'opt'].forEach(k => { if (!isPlainObj(r[k])) r[k] = d[k]; });
  if (!RPG_AREAS[r.area]) { r.area = 'vila'; r.x = 4; r.y = 5; }
  ['lv', 'exp', 'hp', 'ki'].forEach(k => { r.hero[k] = Math.max(0, Number(r.hero[k]) || 0); });
  if (r.hero.lv < 1) r.hero.lv = 1;
  return r;
}
const rq = id => rpgState().quests[id] || null;
const rqDone = id => !!(rq(id) && rq(id).st === 'done');
const rqOn = id => !!(rq(id) && rq(id).st === 'on');
const rFlag = f => { if (!f) return true; if (f.startsWith('q:')) return rqOn(f.slice(2)); return !!rpgState().flags[f]; };
const rName = () => (S.profile && S.profile.name || '').trim() || 'Aluno';
const rFill = s => String(s || '').replace(/\{name\}/g, rName());
const RPG_EXP_CAP = 20;
const rpgExpNeed = L => 15 + L * 10;

/* ---------- herói ---------- */
function rpgStats() {
  const r = rpgState(), L = r.hero.lv;
  const s = { lv: L, maxHp: 30 + 7 * (L - 1), maxKi: 10 + 2 * (L - 1), atk: 5 + 2 * (L - 1), def: 1 + Math.floor((L - 1) / 2), crit: 6, flee: 0 };
  RPG_SLOTS.forEach(([slot]) => { const it = RPG_ITEMS[r.equip[slot]]; if (!it) return; s.maxHp += it.hp || 0; s.maxKi += it.ki || 0; s.atk += it.atk || 0; s.def += it.def || 0; s.crit += it.crit || 0; s.flee += it.flee || 0; });
  r.hero.hp = Math.min(r.hero.hp, s.maxHp); r.hero.ki = Math.min(r.hero.ki, s.maxKi);
  return s;
}
function rpgHealAll() { const r = rpgState(), s = rpgStats(); r.hero.hp = s.maxHp; r.hero.ki = s.maxKi; save(); }
function rpgItemName(id) { const it = RPG_ITEMS[id]; if (!it) return id; const w = RW[it.w]; return { jp: it.jp || (w ? w.jp : ''), ro: it.ro || (w ? w.ro : ''), pt: it.pt }; }
function invN(id) { return rpgState().inv[id] || 0; }
function invAdd(id, n = 1) { const r = rpgState(); r.inv[id] = Math.max(0, (r.inv[id] || 0) + n); if (!r.inv[id]) delete r.inv[id]; save(); }
function rpgOwned(id) { const r = rpgState(); return invN(id) > 0 || Object.values(r.equip).includes(id); }
function rpgEquip(id) {
  const r = rpgState(), it = RPG_ITEMS[id]; if (!it || !RPG_SLOTS.some(([s]) => s === it.slot) || !invN(id)) return false;
  const old = r.equip[it.slot]; invAdd(id, -1); if (old) invAdd(old, 1);
  r.equip[it.slot] = id; rpgStats(); save(); return true;
}
function rpgUnequip(slot) { const r = rpgState(), old = r.equip[slot]; if (!old) return; r.equip[slot] = null; invAdd(old, 1); rpgStats(); save(); }
/* equipa sozinho o que for melhor quando o item chega (só se o espaço estiver vazio ou o novo for mais forte) */
function rpgAutoEquip(id) {
  const r = rpgState(), it = RPG_ITEMS[id]; if (!it || !RPG_SLOTS.some(([s]) => s === it.slot)) return;
  const score = x => x ? (x.atk || 0) * 2 + (x.def || 0) * 2 + (x.hp || 0) / 3 + (x.ki || 0) / 2 + (x.crit || 0) / 4 + (x.flee || 0) / 10 : -1;
  if (score(it) > score(RPG_ITEMS[r.equip[it.slot]])) rpgEquip(id);
}
function rpgGainExp(n) {
  const r = rpgState(), ups = [];
  if (r.hero.lv >= RPG_EXP_CAP) return ups;
  r.hero.exp += n;
  while (r.hero.lv < RPG_EXP_CAP && r.hero.exp >= rpgExpNeed(r.hero.lv)) { r.hero.exp -= rpgExpNeed(r.hero.lv); r.hero.lv++; ups.push(r.hero.lv); }
  if (r.hero.lv >= RPG_EXP_CAP) r.hero.exp = 0;
  if (ups.length) rpgHealAll();
  save(); return ups;
}

/* ---------- palavras: o que pode ser cobrado ---------- */
const rpgPtShort = pt => String(pt || '').split(/\s*[;／/]\s*/)[0].replace(/\s*\([^)]*\)/g, '').trim().slice(0, 30);
const rpgPtKey = pt => nqPtNorm(rpgPtShort(pt));
function rpgTaught(k) { return !!rpgState().taught[k]; }
/* palavras conhecidas: estudadas no app (qualquer área) + ensinadas na aventura. Sem repetir a mesma escrita. */
function rpgPool() {
  const out = [], seen = new Set();
  const add = (id, jp, ro, pt, say, src) => {
    const k = nqJpKey(jp); if (!k || seen.has(k) || !pt || !ro) return;
    if (k.length > 8 || rpgPtShort(pt).length < 2 || /[。？！?!]/.test(jp)) return;
    seen.add(k); out.push({ id, jp: String(jp).replace(/[〜~]/g, ''), ro, pt: rpgPtShort(pt), say: say || jp, src });
  };
  nqKnownWords().forEach(w => add(w.id, w.jp, w.ro, w.pt, w.say, 'app'));
  Object.keys(rpgState().taught).forEach(k => { const w = RW[k]; if (w) add(w.itemId, w.jp, w.ro, w.pt, w.say, 'rpg'); });
  return out;
}
/* ensinar uma palavra da aventura (antes de qualquer cobrança): marca como ensinada, nada mais */
function rpgTeach(k) { const r = rpgState(); if (!RW[k]) return false; const first = !r.taught[k]; if (first) r.taught[k] = Date.now(); save(); return first; }
function rpgWordKnownInApp(k) { const w = RW[k]; return !!(w && (nqWordKnown(w.itemId) || nqKnownWords().some(x => nqJpKey(x.jp) === nqJpKey(w.jp)))); }
function rpgWordSaved(k) { const w = RW[k]; return !!(w && nqWordKnown(w.itemId)); }
function rpgSaveWord(k) { const w = RW[k]; if (!w || rpgWordSaved(k)) return false; markSeen(w.itemId); save(); return true; }
function rpgNextToTeach() { return RPG_TEACH_ORDER.find(k => !rpgTaught(k)) || null; }

/* ---------- desafios de palavras (言霊) ---------- */
function rpgMora(kana) { const out = []; for (const ch of String(kana)) { if (/[ゃゅょぁぃぅぇぉャュョァィゥェォー]/.test(ch) && out.length) out[out.length - 1] += ch; else out.push(ch); } return out; }
function rpgQuizTypes(pool) {
  const L = rpgState().hero.lv, t = ['ler'];
  if (AUDIO.supported) t.push('ouvir', 'ouvir');
  if (L >= 2 && pool.length >= 3) t.push('inverso');
  if (L >= 3 && pool.length >= 6) t.push('pares');
  if (L >= 4 && pool.some(w => /^[ぁ-ゖァ-ヺー]+$/.test(w.say) && rpgMora(w.say).length >= 2 && rpgMora(w.say).length <= 5)) t.push('montar');
  return t;
}
function rpgPickWord(pool, avoid) {
  const r = rpgState();
  const w8 = w => { const s = r.words[w.id]; return (s ? 1 / (1 + s.c - s.w * 2) : 3) + Math.random() * 1.5; };
  const cand = pool.filter(w => !avoid || !avoid.has(w.id));
  return (cand.length ? cand : pool).map(w => [w8(w), w]).sort((a, b) => b[0] - a[0])[0][1];
}
function rpgDistract(word, pool, n, field) {
  const key = field === 'pt' ? w => rpgPtKey(w.pt) : w => nqJpKey(w.jp);
  const used = new Set([key(word)]), out = [];
  const tryAdd = w => { if (out.length >= n || !w) return; const k = key(w); if (!k || used.has(k)) return; used.add(k); out.push(w); };
  shuffle(pool).forEach(tryAdd);
  if (out.length < n) shuffle(Object.values(RW).map(w => ({ id: w.itemId, jp: w.jp, ro: w.ro, pt: rpgPtShort(w.pt), say: w.say }))).forEach(tryAdd);
  return out;
}
function rpgMakeQuiz(forceType) {
  const pool = rpgPool(); if (pool.length < 2) return null;
  const types = rpgQuizTypes(pool), type = forceType && types.includes(forceType) ? forceType : pick(types);
  const nOpt = rpgState().hero.lv < 3 ? 3 : 4;
  if (type === 'pares') {
    const ws = []; const avoid = new Set();
    while (ws.length < 3) { const w = rpgPickWord(pool, avoid); avoid.add(w.id); if (!ws.some(x => rpgPtKey(x.pt) === rpgPtKey(w.pt))) ws.push(w); if (avoid.size >= pool.length) break; }
    if (ws.length < 3) return rpgMakeQuiz('ler');
    return { type, words: ws, right: shuffle(ws.map((w, i) => i)), done: [], sel: null, miss: 0 };
  }
  if (type === 'montar') {
    const cands = pool.filter(w => /^[ぁ-ゖァ-ヺー]+$/.test(w.say) && rpgMora(w.say).length >= 2 && rpgMora(w.say).length <= 5);
    const w = rpgPickWord(cands); const m = rpgMora(w.say);
    let tiles = shuffle(m.map((x, i) => i)); if (tiles.every((x, i) => x === i)) tiles = tiles.reverse();
    return { type, word: w, mora: m, tiles, got: [], miss: 0 };
  }
  const w = rpgPickWord(pool);
  const field = type === 'inverso' ? 'jp' : 'pt';
  const opts = shuffle([w].concat(rpgDistract(w, pool, nOpt - 1, field)));
  return { type, word: w, opts, ans: opts.indexOf(w), wrong: [], rev: type !== 'ouvir' };
}
function rpgRecordWord(id, ok) { const r = rpgState(), s = r.words[id] || (r.words[id] = { c: 0, w: 0 }); if (ok) s.c++; else s.w++; r.stats.words++; if (ok) r.stats.wordsOk++; save(); }

/* ---------- missões ---------- */
function rqStart(id) { const r = rpgState(), q = RPG_QUESTS[id]; if (!q || r.quests[id]) return false; r.quests[id] = { st: 'on', at: Date.now(), n: 0 }; save(); return true; }
function rqAvailable(id) { const q = RPG_QUESTS[id]; return !!q && !rq(id) && (!q.need || rqDone(q.need)); }
function rqProgress(id) {
  const q = RPG_QUESTS[id], r = rpgState(), g = q.goal, st = rq(id);
  if (g.talk) return { n: 0, of: 1 };
  if (g.kill) return { n: Math.min(g.n, st ? st.n || 0 : 0), of: g.n };
  if (g.items) { const [k, n] = Object.entries(g.items)[0]; return { n: Math.min(n, invN(k)), of: n }; }
  if (g.flag) return { n: r.flags[g.flag] ? 1 : 0, of: 1 };
  if (g.boss) return { n: r.flags['boss_' + g.boss] ? 1 : 0, of: 1 };
  if (g.spots) return { n: Math.min(g.spots, Object.keys(r.spots).length), of: g.spots };
  if (g.riddles) return { n: Math.min(g.riddles, r.riddles || 0), of: g.riddles };
  return { n: 0, of: 1 };
}
function rqReady(id) { if (!rqOn(id)) return false; const p = rqProgress(id); return RPG_QUESTS[id].goal.talk ? true : p.n >= p.of; }
/* conclui: entrega itens pedidos, dá a recompensa (itens/magias/flags) e o XP único do Nihongo Quest */
function rqComplete(id) {
  const q = RPG_QUESTS[id], r = rpgState(), st = rq(id); if (!q || !st || st.st === 'done') return null;
  if (q.goal.items) Object.entries(q.goal.items).forEach(([k, n]) => invAdd(k, -n));
  st.st = 'done'; st.done = Date.now();
  const rw = q.reward || {}, got = [];
  Object.entries(rw.items || {}).forEach(([k, n]) => { invAdd(k, n); got.push({ item: k, n }); rpgAutoEquip(k); });
  if (rw.spell) { r.spells[rw.spell] = Date.now(); got.push({ spell: rw.spell }); }
  if (rw.flag) r.flags[rw.flag] = Date.now();
  const paid = nqRewardOnce('rpg:q:' + id, q.xp || 0, q.coins || 0);
  // a próxima missão principal começa sozinha
  Object.keys(RPG_QUESTS).forEach(k => { const x = RPG_QUESTS[k]; if (x.main && x.need === id) rqStart(k); });
  checkAchievements(); save();
  return { got, xp: paid ? q.xp || 0 : 0, coins: paid ? q.coins || 0 : 0 };
}
function rqEvent(kind, val) {
  const r = rpgState();
  Object.keys(RPG_QUESTS).forEach(id => { if (!rqOn(id)) return; const g = RPG_QUESTS[id].goal; if (kind === 'kill' && g.kill === val) r.quests[id].n = (r.quests[id].n || 0) + 1; });
  save();
}
/* missões que concluem sozinhas (sem NPC para entregar) */
function rqAutoComplete() { const out = []; Object.keys(RPG_QUESTS).forEach(id => { const q = RPG_QUESTS[id]; if (q.turn === null && rqReady(id)) out.push([id, rqComplete(id)]); }); return out; }
function rqNpcMark(npc) {
  return Object.keys(RPG_QUESTS).some(id => { const q = RPG_QUESTS[id]; return (q.turn === npc && rqReady(id)) || (q.giver === npc && rqAvailable(id)); }) ? '!' : '';
}

/* ---------- mapa ---------- */
const rTile = (area, x, y) => (RPG_AREAS[area].map[y] || '')[x] || 'X';
function rObjActive(o) {
  const r = rpgState();
  if (o.need && o.t !== 'exit' && o.t !== 'gate' && !rFlag(o.need)) return false;
  if (o.t === 'gate') return !rFlag(o.need);
  if (o.t === 'boss') return !r.flags[o.flag];
  if (o.t === 'cat') return rqOn('s2') && !r.flags.found_tama;
  if (o.t === 'enemy') return !(AV && AV.beaten.has(o.id));
  return true;
}
function rObjs(area) { return RPG_AREAS[area].obj.filter(rObjActive).map(o => (o.t === 'enemy' && AV && AV.foePos[o.id]) ? Object.assign({}, o, AV.foePos[o.id]) : o); }
function rObjAt(area, x, y) { return rObjs(area).find(o => o.x === x && o.y === y) || null; }
function rWalkable(area, x, y) { if (x < 0 || y < 0 || x >= RPG_W || y >= RPG_H) return false; return !RPG_SOLID.has(rTile(area, x, y)); }
function rPath(area, sx, sy, tx, ty) {
  const key = (x, y) => x + ',' + y, prev = { [key(sx, sy)]: null }, q = [[sx, sy]];
  const goalBlocked = !!rObjAt(area, tx, ty) || !rWalkable(area, tx, ty);
  while (q.length) {
    const [x, y] = q.shift();
    if (x === tx && y === ty) break;
    for (const [dx, dy] of Object.values(RPG_DIR)) {
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (k in prev) continue;
      if (nx === tx && ny === ty && goalBlocked) { prev[k] = [x, y]; q.unshift([nx, ny]); break; }
      if (!rWalkable(area, nx, ny)) continue;
      const o = rObjAt(area, nx, ny); if (o && o.t !== 'enemy' && !(nx === tx && ny === ty)) continue; // inimigo no caminho = batalha
      prev[k] = [x, y]; q.push([nx, ny]);
    }
  }
  if (!(key(tx, ty) in prev)) return null;
  const path = []; let c = [tx, ty];
  while (c && !(c[0] === sx && c[1] === sy)) { path.unshift(c); c = prev[key(c[0], c[1])]; }
  return path;
}

/* ---------- desenho (SVG original) ---------- */
const RPG_THEME = {
  vila: { g: '#a6d672', g2: '#94c862', p: '#ead6a4', tree: '#3f8f4e', tree2: '#57a85e' },
  campo: { g: '#bce27f', g2: '#acd66e', p: '#ead6a4', tree: '#4a9a52', tree2: '#62b065' },
  mori: { g: '#6fae5f', g2: '#5f9f53', p: '#cdb47c', tree: '#2c6e3e', tree2: '#3c8048' },
  jinja: { g: '#86c06c', g2: '#78b45f', p: '#e2cfa0', tree: '#336f42', tree2: '#46864e' },
  kawa: { g: '#a2d473', g2: '#92c664', p: '#e2cc98', tree: '#3f8f4e', tree2: '#57a85e' },
  dokutsu: { g: '#5c5874', g2: '#55516c', p: '#6a6684', tree: '#2e2b40', tree2: '#3a3650' }
};
function rTileSVG(area, x, y) {
  const t = rTile(area, x, y), th = RPG_THEME[RPG_AREAS[area].theme], X = x * RPG_T, Y = y * RPG_T, T = RPG_T;
  const base = `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${(x + y) % 2 ? th.g : th.g2}"/>`;
  const seed = (x * 7 + y * 13) % 5;
  switch (t) {
    case ',': return base + `<circle cx="${X + 8 + seed}" cy="${Y + 10}" r="2.6" fill="#ffb7cc"/><circle cx="${X + 22}" cy="${Y + 18 + seed}" r="2.6" fill="#fff4a8"/><circle cx="${X + 12}" cy="${Y + 24}" r="2.2" fill="#ffffff"/>`;
    case '=': return base + `<rect x="${X + 1}" y="${Y + 1}" width="${T - 2}" height="${T - 2}" rx="7" fill="${th.p}"/>`;
    case 'T': return base + `<rect x="${X + 13}" y="${Y + 20}" width="6" height="9" rx="2" fill="#7a5134"/><circle cx="${X + 16}" cy="${Y + 14}" r="12" fill="${th.tree}"/><circle cx="${X + 12}" cy="${Y + 11}" r="6" fill="${th.tree2}"/>`;
    case '~': return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="#5aa8e0"/><path d="M${X + 4} ${Y + 12 + seed}q4-3 8 0t8 0M${X + 10} ${Y + 24 - seed}q4-3 8 0t8 0" stroke="#bfe6ff" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'B': return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="#5aa8e0"/><rect x="${X}" y="${Y + 3}" width="${T}" height="${T - 6}" fill="#b07a4a"/><path d="M${X + 8} ${Y + 3}v26M${X + 16} ${Y + 3}v26M${X + 24} ${Y + 3}v26" stroke="#8a5a34" stroke-width="1.5"/><rect x="${X}" y="${Y + 2}" width="${T}" height="3" fill="#7a4a2a"/><rect x="${X}" y="${Y + T - 5}" width="${T}" height="3" fill="#7a4a2a"/>`;
    case 'H': case 'I': {
      const top = rTile(area, x, y - 1) !== t, shrine = t === 'I';
      if (top) return base + `<path d="M${X - 1} ${Y + T}L${X + 4} ${Y + 6}H${X + T - 4}L${X + T + 1} ${Y + T}z" fill="${shrine ? '#d2463c' : '#b4553f'}"/><rect x="${X - 1}" y="${Y + T - 4}" width="${T + 2}" height="4" fill="${shrine ? '#9a2a22' : '#8a3a2a'}"/>`;
      const door = rTile(area, x, y + 1) !== t && (x % 2 === 0 || shrine);
      return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${shrine ? '#f1e3c4' : '#f3e2c4'}"/><rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="none" stroke="#c9a77c" stroke-width="1"/>${door ? `<rect x="${X + 10}" y="${Y + 12}" width="12" height="20" rx="2" fill="#6a4a34"/>` : `<rect x="${X + 8}" y="${Y + 9}" width="16" height="12" fill="#bfe6ff" stroke="#8fb8d8" stroke-width="1.5"/><path d="M${X + 16} ${Y + 9}v12" stroke="#8fb8d8" stroke-width="1.5"/>`}`;
    }
    case 'R': return base + `<ellipse cx="${X + 16}" cy="${Y + 20}" rx="12" ry="9" fill="#9a9db4"/><ellipse cx="${X + 13}" cy="${Y + 17}" rx="5" ry="3" fill="#c2c5d8"/>`;
    case '^': return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${th.g2}"/><path d="M${X - 2} ${Y + T}L${X + 14} ${Y + 2}L${X + T + 2} ${Y + T}z" fill="#8a8fa8"/><path d="M${X + 9} ${Y + 8}L${X + 14} ${Y + 2}L${X + 19} ${Y + 8}l-3 2-2-2-2 2z" fill="#fff"/>`;
    case 'F': return base + `<path d="M${X} ${Y + 14}h${T}M${X} ${Y + 22}h${T}" stroke="#b08a5a" stroke-width="3"/><path d="M${X + 6} ${Y + 10}v16M${X + 26} ${Y + 10}v16" stroke="#8a6a3a" stroke-width="3"/>`;
    case ':': return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${(x + y) % 2 ? th.g : th.g2}"/>${seed === 2 ? `<circle cx="${X + 9}" cy="${Y + 22}" r="2" fill="#77738f"/>` : ''}`;
    case 'X': return `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${th.tree}"/><path d="M${X + 3} ${Y + 10}l8-5 9 4 9-3M${X + 2} ${Y + 24}l10-4 8 5 10-3" stroke="${th.tree2}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    default: return base + (seed === 1 ? `<path d="M${X + 9} ${Y + 20}l2-5 2 5M${X + 20} ${Y + 12}l2-5 2 5" stroke="${th.g2}" stroke-width="1.6" fill="none"/>` : '');
  }
}
function rChibi(L, extra = '') {
  return `<ellipse cx="16" cy="29" rx="9" ry="2.6" fill="#000" opacity=".2"/><rect x="9" y="17" width="14" height="11" rx="5" fill="${L.top}"/><circle cx="16" cy="12" r="8" fill="${L.skin || '#ffe2cc'}"/><path d="M8 12a8 8 0 0 1 16 0c-3-3-5-4-8-4s-5 1-8 4z" fill="${L.hair}"/><circle cx="13" cy="13" r="1.15" fill="#2a2560"/><circle cx="19" cy="13" r="1.15" fill="#2a2560"/>${L.band ? `<path d="M8.5 9.5h15" stroke="${L.band}" stroke-width="2.4"/>` : ''}${L.hat ? '<path d="M5 8h22l-3-4H8z" fill="#d9b26a"/>' : ''}${L.phones ? '<path d="M8 11a8 8 0 0 1 16 0" stroke="#f2b632" stroke-width="2" fill="none"/><rect x="6" y="10" width="3.4" height="6" rx="1.5" fill="#f2b632"/><rect x="22.6" y="10" width="3.4" height="6" rx="1.5" fill="#f2b632"/>' : ''}${extra}`;
}
const RPG_HERO_LOOK = { hair: '#2a2350', top: '#3553d1', band: '#f2b632' };
const RPG_REN_LOOK = { hair: '#22224a', top: '#ffd877', phones: true };
function rFox(s = 1) { return `<g transform="scale(${s})"><ellipse cx="16" cy="29" rx="9" ry="2.6" fill="#000" opacity=".2"/><path d="M22 26q8-2 6-12-4 6-8 6z" fill="#f08a3a"/><path d="M27 15l1-3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="15" cy="21" rx="7" ry="8" fill="#f5a04a"/><path d="M8 13l1-9 5 6zM22 13l-1-9-5 6z" fill="#f08a3a"/><circle cx="15" cy="13" r="7" fill="#f5a04a"/><path d="M11 16q4 4 8 0" fill="#fff"/><path d="M12 12l2 1M18 12l-2 1" stroke="#2a2560" stroke-width="1.5" stroke-linecap="round"/><circle cx="15" cy="16" r="1" fill="#2a2560"/><path d="M11 24h8" stroke="#e0343c" stroke-width="2"/></g>`; }
function rCat() { return `<ellipse cx="16" cy="29" rx="8" ry="2.4" fill="#000" opacity=".2"/><path d="M8 26q-1-9 8-9t8 9z" fill="#fff" stroke="#c8cfe2" stroke-width="1"/><circle cx="16" cy="15" r="6.5" fill="#fff" stroke="#c8cfe2" stroke-width="1"/><path d="M10.5 12l.5-6 4 4zM21.5 12l-.5-6-4 4z" fill="#fff" stroke="#c8cfe2" stroke-width="1"/><circle cx="13.6" cy="15" r="1" fill="#2a2560"/><circle cx="18.4" cy="15" r="1" fill="#2a2560"/><circle cx="16" cy="21.5" r="2" fill="#f2b632" stroke="#8a5a00" stroke-width=".6"/><path d="M23 26q6-2 4-8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; }
/* inimigos: viewBox 0 0 100 100 */
function rFoeArt(k) {
  const A = {
    mochi: '<ellipse cx="50" cy="92" rx="30" ry="5" fill="#000" opacity=".15"/><path d="M14 80q0-46 36-46t36 46q0 10-36 10T14 80z" fill="#fff" stroke="#d9dbe8" stroke-width="3"/><circle cx="38" cy="62" r="4" fill="#2a2560"/><circle cx="62" cy="62" r="4" fill="#2a2560"/><path d="M45 71q5 5 10 0" stroke="#2a2560" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="30" cy="70" rx="6" ry="3.5" fill="#ffb7cc"/><ellipse cx="70" cy="70" rx="6" ry="3.5" fill="#ffb7cc"/><path d="M50 34q-4-10 4-14 2 8-4 14z" fill="#62b065"/><circle cx="58" cy="30" r="6" fill="#ffb7cc"/>',
    karasu: '<ellipse cx="50" cy="92" rx="24" ry="4" fill="#000" opacity=".15"/><path d="M20 58q-14-18 6-26l18 16z" fill="#22223a"/><path d="M80 58q14-18-6-26L56 48z" fill="#22223a"/><ellipse cx="50" cy="62" rx="22" ry="24" fill="#2e2e48"/><circle cx="50" cy="38" r="16" fill="#2e2e48"/><path d="M58 38l20 5-20 5z" fill="#f2b632"/><circle cx="54" cy="34" r="3.6" fill="#fff"/><circle cx="55" cy="34" r="1.8" fill="#e0343c"/><path d="M40 84l-4 8M60 84l4 8" stroke="#f2b632" stroke-width="3" stroke-linecap="round"/>',
    kodama: '<ellipse cx="50" cy="92" rx="22" ry="4" fill="#000" opacity=".12"/><path d="M50 18q30 20 26 48-3 24-26 24T24 66q-4-28 26-48z" fill="#e6f7e4" stroke="#b9dcb6" stroke-width="3"/><ellipse cx="40" cy="56" rx="4" ry="6" fill="#3a5a48"/><ellipse cx="60" cy="56" rx="4" ry="6" fill="#3a5a48"/><ellipse cx="50" cy="72" rx="4" ry="3" fill="#3a5a48"/><path d="M50 18q-2-12 10-14-2 10-10 14z" fill="#62b065"/><circle cx="18" cy="40" r="3" fill="#d9ffd6" opacity=".9"/><circle cx="84" cy="30" r="2.4" fill="#d9ffd6" opacity=".9"/>',
    tanuki: '<ellipse cx="50" cy="92" rx="28" ry="5" fill="#000" opacity=".15"/><ellipse cx="50" cy="70" rx="26" ry="22" fill="#a77a4f"/><ellipse cx="50" cy="74" rx="15" ry="13" fill="#e9d2b0"/><circle cx="50" cy="42" r="20" fill="#a77a4f"/><circle cx="34" cy="26" r="6" fill="#7a5134"/><circle cx="66" cy="26" r="6" fill="#7a5134"/><path d="M32 44q8-10 16 0-8 6-16 0zM52 44q8-10 16 0-8 6-16 0z" fill="#4a3424"/><circle cx="41" cy="43" r="2.6" fill="#fff"/><circle cx="59" cy="43" r="2.6" fill="#fff"/><ellipse cx="50" cy="52" rx="4" ry="3" fill="#2a2020"/><path d="M50 22q-6-14 8-16-1 12-8 16z" fill="#62b065"/><path d="M76 78q16 2 12-16" stroke="#7a5134" stroke-width="9" fill="none" stroke-linecap="round"/>',
    koumori: '<ellipse cx="50" cy="92" rx="18" ry="3" fill="#000" opacity=".15"/><path d="M48 52Q30 26 6 38q10 4 8 12 8-4 12 4 6-6 12 2zM52 52Q70 26 94 38q-10 4-8 12-8-4-12 4-6-6-12 2z" fill="#5b4a8a"/><ellipse cx="50" cy="56" rx="13" ry="16" fill="#6c5aa0"/><path d="M41 42l-3-12 9 8zM59 42l3-12-9 8z" fill="#6c5aa0"/><circle cx="45" cy="52" r="3" fill="#ffd877"/><circle cx="55" cy="52" r="3" fill="#ffd877"/><path d="M45 62l2 4 2-4M51 62l2 4 2-4" fill="#fff"/>',
    ishi: '<ellipse cx="50" cy="93" rx="32" ry="5" fill="#000" opacity=".15"/><path d="M16 88l4-38 18-22 28 4 18 26-2 30z" fill="#8a8fa8" stroke="#5a5f78" stroke-width="3"/><path d="M30 34l10 10M62 34l-8 12M24 70l14-4" stroke="#6a6f88" stroke-width="3"/><path d="M34 54l12 4M66 54l-12 4" stroke="#2a2560" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="62" r="3.4" fill="#ffd877"/><circle cx="60" cy="62" r="3.4" fill="#ffd877"/><path d="M40 76h20" stroke="#2a2560" stroke-width="3.4" stroke-linecap="round"/><path d="M38 28q8-8 20-2" stroke="#62b065" stroke-width="6" fill="none" stroke-linecap="round"/>',
    kappa: '<ellipse cx="50" cy="94" rx="30" ry="5" fill="#000" opacity=".15"/><ellipse cx="50" cy="72" rx="24" ry="20" fill="#5aa86a"/><path d="M30 64q20-12 40 0v20q-20 10-40 0z" fill="#c9a24a" stroke="#8a6a2a" stroke-width="2"/><circle cx="50" cy="40" r="22" fill="#6bbf7a"/><ellipse cx="50" cy="22" rx="16" ry="6" fill="#bfe6ff" stroke="#e8f6ff" stroke-width="3"/><path d="M34 22q16 8 32 0" stroke="#2c6e3e" stroke-width="5" fill="none"/><path d="M38 50q12 10 24 0l-12 8z" fill="#f2b632"/><circle cx="41" cy="40" r="3.4" fill="#2a2560"/><circle cx="59" cy="40" r="3.4" fill="#2a2560"/><path d="M22 72l-8 8M78 72l8 8" stroke="#5aa86a" stroke-width="7" stroke-linecap="round"/>',
    oni: '<ellipse cx="50" cy="95" rx="34" ry="5" fill="#000" opacity=".18"/><path d="M22 92q0-34 28-34t28 34z" fill="#d2463c"/><path d="M30 80h40v10H30z" fill="#f2b632"/><path d="M36 80l4 10M48 80l2 10M60 80l2 10" stroke="#2a2020" stroke-width="3"/><circle cx="50" cy="42" r="24" fill="#e0574c"/><path d="M34 24l-6-18 14 12zM66 24l6-18-14 12z" fill="#f3e2c4" stroke="#c9a77c" stroke-width="2"/><path d="M26 34q24-14 48 0" stroke="#2a2020" stroke-width="7" fill="none"/><path d="M36 40l10 4M64 40l-10 4" stroke="#2a2020" stroke-width="3.4" stroke-linecap="round"/><circle cx="42" cy="48" r="3.6" fill="#ffd877"/><circle cx="58" cy="48" r="3.6" fill="#ffd877"/><path d="M38 60q12 6 24 0" stroke="#2a2020" stroke-width="3" fill="none"/><path d="M42 60v5M58 60v5" stroke="#fff" stroke-width="3"/><path d="M84 40l6 50" stroke="#7a5134" stroke-width="9" stroke-linecap="round"/><circle cx="84" cy="44" r="3" fill="#3a3a4a"/><circle cx="87" cy="58" r="3" fill="#3a3a4a"/>'
  };
  return A[k] || A.mochi;
}
function rObjSVG(o) {
  const X = o.x * RPG_T, Y = o.y * RPG_T, r = rpgState();
  const g = (inner, cls = '', label = '') => `<g class="av-o ${cls}" transform="translate(${X} ${Y})"${label ? ` aria-label="${esc(label)}"` : ''}>${inner}</g>`;
  const mark = t => t ? `<g transform="translate(24 -2)"><circle r="7" cx="0" cy="6" fill="${t === '!' ? '#e0343c' : '#f2b632'}" stroke="#fff" stroke-width="1.6"/><text x="0" y="10" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">${t}</text></g>` : '';
  switch (o.t) {
    case 'npc': { const n = RPG_NPCS[o.id]; const inner = n.fox ? rFox() : rChibi(n.look); return g(inner + mark(rqNpcMark(o.id)), 'npc', n.name); }
    case 'chest': { const open = !!r.opened[o.id]; return g(`<ellipse cx="16" cy="28" rx="11" ry="2.6" fill="#000" opacity=".2"/><rect x="5" y="${open ? 14 : 12}" width="22" height="15" rx="2" fill="#b07a3a" stroke="#6a4a24" stroke-width="1.6"/>${open ? '<path d="M5 14l3-8h16l3 8z" fill="#8a5a2a"/><rect x="9" y="15" width="14" height="4" fill="#3a2a1a"/>' : '<path d="M5 12q11-8 22 0v4H5z" fill="#c98a42" stroke="#6a4a24" stroke-width="1.6"/><rect x="14" y="14" width="4" height="6" rx="1" fill="#f2b632"/>'}`, 'chest', open ? 'Baú aberto' : 'Baú do tesouro'); }
    case 'sign': return g(`<rect x="14.5" y="16" width="3" height="13" fill="#7a5134"/><rect x="5" y="6" width="22" height="13" rx="2" fill="#d9b26a" stroke="#8a6a3a" stroke-width="1.6"/><path d="M9 11h14M9 15h9" stroke="#8a6a3a" stroke-width="1.6"/>`, 'sign', 'Placa');
    case 'spot': { const seen = !!r.spots[o.id]; const art = { ido: '<rect x="7" y="14" width="18" height="13" rx="2" fill="#9a9db4" stroke="#6a6f88" stroke-width="1.5"/><ellipse cx="16" cy="14" rx="9" ry="3" fill="#3a6aa8"/><path d="M6 10h20M8 10v-6M24 10v-6" stroke="#7a5134" stroke-width="2"/>', jizou: '<ellipse cx="16" cy="28" rx="8" ry="2.4" fill="#000" opacity=".2"/><rect x="10" y="14" width="12" height="14" rx="5" fill="#a9acc0"/><circle cx="16" cy="11" r="6" fill="#b8bbcf"/><path d="M9 17h14l-2 4H11z" fill="#e0343c"/>', goshinboku: '<rect x="11" y="12" width="10" height="17" rx="3" fill="#7a5134"/><path d="M9 16h14" stroke="#e9d9a6" stroke-width="2.4"/><path d="M12 18v4M16 18v5M20 18v4" stroke="#fff" stroke-width="1.6"/><circle cx="16" cy="6" r="9" fill="#2c6e3e"/>', ema: '<path d="M6 8h20M8 8v20M24 8v20" stroke="#7a5134" stroke-width="2"/><path d="M10 12h5l1 2v4h-7v-4zM17 12h5l1 2v4h-7v-4zM12 20h5l1 2v4h-7v-4z" fill="#e9c98a" stroke="#8a6a3a" stroke-width=".8"/>', tourou: '<rect x="13" y="20" width="6" height="9" fill="#8a8fa8"/><rect x="9" y="12" width="14" height="9" rx="1" fill="#9a9db4"/><rect x="13" y="14" width="6" height="5" fill="#ffd877"/><path d="M7 12l9-6 9 6z" fill="#7a7f98"/>', hekiga: '<rect x="4" y="6" width="24" height="18" rx="2" fill="#4a4660"/><circle cx="11" cy="14" r="3" fill="#e9c98a"/><path d="M14 14h6M14 11h8M14 17h5" stroke="#ffd877" stroke-width="1.4"/><circle cx="23" cy="20" r="3" fill="#d2463c"/>' }[o.id] || ''; return g(art + (seen ? '' : mark('✦')), 'spot', RPG_SPOTS[o.id] ? RPG_SPOTS[o.id].pt : ''); }
    case 'gather': { const done = r.gather[o.id] === dayKey(); const ore = o.item === 'tetsu'; return g(done ? `<ellipse cx="16" cy="24" rx="7" ry="2.4" fill="#000" opacity=".12"/>` : ore ? '<path d="M6 26l4-10 8-4 8 6 1 8z" fill="#6a6684" stroke="#3a3650" stroke-width="1.4"/><path d="M12 20l3-2M19 18l3 3M14 24l4-1" stroke="#d9b26a" stroke-width="2" stroke-linecap="round"/>' : '<path d="M16 28v-9" stroke="#3c8048" stroke-width="2"/><path d="M16 21q-8-2-8-10 7 1 8 10zM16 19q7-3 9-11-8 2-9 11z" fill="#62b065"/><circle cx="16" cy="9" r="2.6" fill="#ffd877"/>', 'gather', ore ? 'Minério' : 'Erva'); }
    case 'gate': return g(o.kind === 'log' ? '<rect x="1" y="12" width="30" height="13" rx="6" fill="#8a5a34" stroke="#5a3a20" stroke-width="1.6"/><circle cx="6" cy="18.5" r="4" fill="#c99a6a" stroke="#5a3a20" stroke-width="1"/>' : '<ellipse cx="10" cy="20" rx="9" ry="8" fill="#8a8fa8"/><ellipse cx="22" cy="18" rx="9" ry="10" fill="#9a9db4"/><ellipse cx="16" cy="26" rx="12" ry="5" fill="#7a7f98"/>', 'gate', 'Passagem bloqueada');
    case 'shrine': return g('<path d="M3 8h26M6 13h20M8 8v21M24 8v21" stroke="#d2463c" stroke-width="3"/><rect x="11" y="18" width="10" height="9" fill="#7a5134"/><path d="M12 21h8M12 24h8" stroke="#3a2a1a" stroke-width="1.2"/>' + (rqOn('m3') ? mark('!') : ''), 'shrine', 'Santuário');
    case 'cat': return g(rCat(), 'cat', 'Gata');
    case 'enemy': return g(`<g class="av-bob" transform="translate(1 0) scale(.3)">${rFoeArt(o.e)}</g>`, 'foe', RPG_ENEMIES[o.e].name);
    case 'boss': return g(`<g class="av-bob" transform="translate(-6 -10) scale(.44)">${rFoeArt(o.e)}</g>`, 'foe boss', RPG_ENEMIES[o.e].name);
    default: return '';
  }
}
function rMapSVG(area) {
  let tiles = '';
  for (let y = 0; y < RPG_H; y++) for (let x = 0; x < RPG_W; x++) tiles += rTileSVG(area, x, y);
  return `<svg class="av-map" id="avMap" viewBox="0 0 ${RPG_W * RPG_T} ${RPG_H * RPG_T}" role="application" aria-label="Mapa: ${esc(RPG_AREAS[area].name)}. Toque num lugar para andar até lá.">
    <g id="avTiles">${tiles}</g><g id="avObjs"></g>
    <g id="avRen" class="av-actor" style="display:none">${rChibi(RPG_REN_LOOK)}</g>
    <g id="avHero" class="av-actor">${rChibi(RPG_HERO_LOOK)}</g>
    <rect id="avTap" width="${RPG_W * RPG_T}" height="${RPG_H * RPG_T}" fill="transparent"/>
  </svg>`;
}

/* ---------- exploração (tela cheia) ---------- */
let AV = null;
function rpgOpen() {
  const r = rpgState();
  stopAudio(); closeModal();
  if (!r.started) { r.started = Date.now(); r.opt.ro = S.settings.romaji !== false; }
  AV = { area: r.area, beaten: new Set(), foePos: {}, walking: null, dlg: null, bt: null, face: 'down', trail: null, steps: 0 };
  $('#player').hidden = false; document.body.style.overflow = 'hidden';
  rpgEnterArea(r.area, r.x, r.y, true);
  if (!r.intro) rpgTalk(rpgIntroBeats());
  else { const auto = rqAutoComplete(); if (auto.length) rpgTalk(rpgRewardBeats(auto)); }
  save();
}
function rpgClose() {
  stopAudio(); if (AV && AV.walking) clearTimeout(AV.walking);
  AV = null; QZ = null;
  $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = '';
  render(); setTimeout(flushPending, 200);
}
function rpgPaneHTML() {
  const a = RPG_AREAS[AV.area];
  return `<div class="av-pane av-th-${a.theme}">
    <header class="av-head"><button class="icon-btn" data-act="avClose" aria-label="Sair da aventura">${IC.back}</button>
      <div class="grow av-where" style="min-width:0"><small class="eyebrow">${esc(RPG_REGION.name)}</small><b><span class="jp">${esc(a.jp)}</span> · ${esc(a.name)}</b></div>
      <div id="avBars" class="av-bars"></div>
      <button class="icon-btn av-menu-btn" data-act="avMenu" data-tab="heroi" aria-label="Menu do herói"><span class="jp" style="font-weight:800">冒</span></button></header>
    <div class="av-stage" id="avStage">${rMapSVG(AV.area)}<div class="av-msg" id="avMsg" role="status" aria-live="polite"></div></div>
    <div class="av-ctrl" id="avCtrl">
      <div class="av-dpad" role="group" aria-label="Andar">
        <button class="av-d up" data-act="avMove" data-d="up" aria-label="Andar para cima">▲</button>
        <button class="av-d left" data-act="avMove" data-d="left" aria-label="Andar para a esquerda">◀</button>
        <button class="av-d ok" data-act="avInteract" aria-label="Examinar ou falar">調</button>
        <button class="av-d right" data-act="avMove" data-d="right" aria-label="Andar para a direita">▶</button>
        <button class="av-d down" data-act="avMove" data-d="down" aria-label="Andar para baixo">▼</button>
      </div>
      <div class="av-side">
        <button class="av-sb" data-act="avMenu" data-tab="missoes"><span class="jp">任</span><span>Missões</span></button>
        <button class="av-sb" data-act="avMenu" data-tab="bolsa"><span class="jp">袋</span><span>Bolsa</span></button>
        <button class="av-sb" data-act="avMenu" data-tab="mapa"><span class="jp">図</span><span>Mapa</span></button>
      </div>
    </div>
    <div class="av-dlg" id="avDlg" hidden></div>
    <div class="av-battle" id="avBattle" hidden></div>
  </div>`;
}
function rpgEnterArea(area, x, y, first) {
  const r = rpgState(), changed = !AV.area || AV.area !== area || first;
  if (AV.area !== area) { AV.beaten = new Set(); AV.foePos = {}; }
  AV.area = area; r.area = area; r.x = x; r.y = y; AV.trail = null;
  const newVisit = !r.visited[area]; r.visited[area] = r.visited[area] || Date.now();
  if (changed) { $('#player').innerHTML = rpgPaneHTML(); }
  rpgDraw(true); save();
  if (newVisit && !first) rpgMsg(`<b>${esc(RPG_AREAS[area].name)}</b> · ${esc(RPG_AREAS[area].desc)}`, 3800);
  checkAchievements();
}
function rpgBarsHTML() {
  const r = rpgState(), s = rpgStats();
  const bar = (v, m, cls, lab) => `<div class="av-bar ${cls}" role="img" aria-label="${lab} ${v} de ${m}"><i style="width:${Math.round(v / m * 100)}%"></i><span class="tabnum">${lab} ${v}/${m}</span></div>`;
  return `<span class="av-lv tabnum">Nv ${s.lv}</span><div class="av-bwrap">${bar(r.hero.hp, s.maxHp, 'hp', 'HP')}${bar(r.hero.ki, s.maxKi, 'ki', 'Ki')}</div>`;
}
function rpgDraw(snap) {
  if (!AV) return;
  const r = rpgState(), objs = $('#avObjs'); if (!objs) return;
  objs.innerHTML = rObjs(AV.area).map(rObjSVG).join('');
  const hero = $('#avHero'), ren = $('#avRen');
  const place = (el, x, y) => { el.style.transition = snap ? 'none' : ''; el.style.transform = `translate(${x * RPG_T}px, ${y * RPG_T}px)`; };
  place(hero, r.x, r.y);
  if (rqDone('m1') && AV.trail) { ren.style.display = ''; place(ren, AV.trail[0], AV.trail[1]); } else ren.style.display = 'none';
  const b = $('#avBars'); if (b) b.innerHTML = rpgBarsHTML();
}
let _avMsgT = null;
function rpgMsg(html, ms = 2600) { const m = $('#avMsg'); if (!m) return; m.innerHTML = html; m.classList.add('on'); clearTimeout(_avMsgT); _avMsgT = setTimeout(() => { const n = $('#avMsg'); if (n) n.classList.remove('on'); }, window.__NQ_FAST ? 50 : ms); }
const rpgBusy = () => !AV || !!AV.dlg || !!AV.bt;
function rpgStep(dir) {
  if (rpgBusy()) return false;
  const r = rpgState(), [dx, dy] = RPG_DIR[dir]; AV.face = dir;
  const nx = r.x + dx, ny = r.y + dy;
  const o = rObjAt(AV.area, nx, ny);
  if (o && o.t === 'exit') {
    if (o.need && !rFlag(o.need)) { rpgMsg('O caminho está bloqueado.'); return false; }
    rpgEnterArea(o.to, o.tx, o.ty); return true;
  }
  if (o) { rpgInteract(o); return false; }
  if (!rWalkable(AV.area, nx, ny)) { sfx('tap'); return false; }
  AV.trail = [r.x, r.y]; r.x = nx; r.y = ny; AV.steps++;
  rpgWander();
  rpgDraw(); save();
  return true;
}
/* inimigos comuns andam um pouco; se encostarem no herói, começa a batalha */
function rpgWander() {
  const r = rpgState();
  if (AV.steps % 2) return;
  RPG_AREAS[AV.area].obj.filter(o => o.t === 'enemy' && rObjActive(o)).forEach(o => {
    if (Math.random() > 0.45) return;
    const cur = AV.foePos[o.id] || { x: o.x, y: o.y };
    const [dx, dy] = pick(Object.values(RPG_DIR)); const nx = cur.x + dx, ny = cur.y + dy;
    if (Math.abs(nx - o.x) > 2 || Math.abs(ny - o.y) > 2) return;
    if (!rWalkable(AV.area, nx, ny) || rObjAt(AV.area, nx, ny) || (nx === r.x && ny === r.y) || (AV.trail && nx === AV.trail[0] && ny === AV.trail[1])) return;
    AV.foePos[o.id] = { x: nx, y: ny };
  });
}
function rpgWalkTo(tx, ty) {
  if (rpgBusy()) return;
  const r = rpgState(); if (AV.walking) { clearTimeout(AV.walking); AV.walking = null; }
  if (tx === r.x && ty === r.y) return;
  const path = rPath(AV.area, r.x, r.y, tx, ty);
  if (!path || !path.length) { rpgMsg('Não dá para chegar lá por aqui.'); return; }
  const stepTo = i => {
    AV && (AV.walking = null);
    if (!AV || rpgBusy() || i >= path.length) return;
    const st = rpgState(), [px, py] = path[i];
    const dir = Object.keys(RPG_DIR).find(d => st.x + RPG_DIR[d][0] === px && st.y + RPG_DIR[d][1] === py);
    if (!dir) return;
    const area = AV.area, moved = rpgStep(dir);
    if (moved && AV && AV.area === area) AV.walking = setTimeout(() => stepTo(i + 1), window.__NQ_FAST ? 0 : 150);
  };
  stepTo(0);
}
function rpgInteractFacing() { if (rpgBusy()) return; const r = rpgState(), [dx, dy] = RPG_DIR[AV.face]; const o = rObjAt(AV.area, r.x + dx, r.y + dy); if (o && o.t !== 'exit') rpgInteract(o); else rpgMsg('Nada para examinar aqui. Encoste num personagem, baú ou ✦.'); }
function rpgInteract(o) {
  const r = rpgState();
  if (o.t === 'npc') return rpgTalk(rpgNpcBeats(o.id));
  if (o.t === 'enemy') return rpgBattle(o.e, o);
  if (o.t === 'boss') return rpgTalk(rpgBossIntro(o));
  if (o.t === 'gate') return rpgTalk([{ n: o.msg }]);
  if (o.t === 'sign') { const first = !r.signs[o.id]; r.signs[o.id] = Date.now(); save(); return rpgTalk([{ s: o.text }].concat(first && o.w ? [{ teach: o.w }] : [])); }
  if (o.t === 'spot') return rpgTalk(rpgSpotBeats(o.id));
  if (o.t === 'chest') return rpgTalk(rpgChestBeats(o));
  if (o.t === 'gather') return rpgTalk(rpgGatherBeats(o));
  if (o.t === 'shrine') return rpgTalk(rpgShrineBeats());
  if (o.t === 'cat') return rpgTalk([{ n: 'Uma gata branca com um guizo dourado no pescoço. Deve ser a Tama!' }, { s: 'cat|にゃー。|nyaa.|Miau.' }, { fn: () => { r.flags.found_tama = Date.now(); save(); rpgDraw(); } }, { s: 'ren|いた！ タマ だ！|ita! Tama da!|Achamos! É a Tama!' }, { n: 'A Tama parece entender e corre de volta para a vila. Conte para o Sora!' }]);
}

/* ---------- diálogos ---------- */
/* beats: {s:'quem|jp|ro|pt'} fala · {n} narração · {teach:k} palavra nova · {fn} ação · {choice:[[rótulo, beats]]} · {quiz:{...}} enigma · {reward:{...}} */
function rpgTalk(beats) {
  if (!AV) return;
  if (AV.walking) { clearTimeout(AV.walking); AV.walking = null; }
  AV.dlg = { q: beats.slice(), cur: null };
  rpgNextBeat();
}
function rpgNextBeat() {
  if (!AV || !AV.dlg) return;
  const d = AV.dlg;
  while (d.q.length) {
    const b = d.q.shift();
    if (b.fn) { const more = b.fn(); if (Array.isArray(more)) d.q.unshift(...more); continue; }
    if (b.if !== undefined && !b.if) continue;
    if (b.teach && !RW[b.teach]) continue;
    if (b.teach) { b.first = rpgTeach(b.teach); b.known = rpgWordKnownInApp(b.teach); }
    d.cur = b; rpgDlgRender(); rpgDlgSpeak(b); return;
  }
  AV.dlg = null; const el = $('#avDlg'); if (el) { el.hidden = true; el.innerHTML = ''; }
  rpgDraw(); save();
  if (AV.after) { const f = AV.after; AV.after = null; f(); }
}
function rLine(str) {
  const [sp, jp, ro, pt] = rFill(str).split('|');
  return { sp, jp, ro: ro || '', pt: pt || '', say: /[぀-ヿ一-鿿]/.test(jp) ? jp.replace(/[（(][^）)]*[）)]/g, '').replace(/[…・↑→]/g, '') : '' };
}
function rPortrait(sp, size = 46) {
  const n = RPG_NPCS[sp];
  if (sp === 'me') return `<span class="w-me-av" style="width:${size}px;height:${size}px" aria-hidden="true">${esc(rName().slice(0, 1).toUpperCase())}</span>`;
  if (n && n.chat && typeof chPortrait === 'function') return chPortrait(n.chat, size);
  if (n && n.mascot) return mascot('happy', size, '');
  if (sp === 'sign') return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#f3e2c4"/>${rObjSVG({ t: 'sign', x: 0, y: 0 }).replace(/<g[^>]*>|<\/g>/g, '')}</svg>`;
  if (sp === 'cat') return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#e8f6ff"/>${rCat()}</svg>`;
  if (RPG_ENEMIES[sp]) return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="24" fill="#e8f6ff"/>${rFoeArt(sp)}</svg>`;
  if (n && n.fox) return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#fff3d1"/>${rFox()}</svg>`;
  if (n) return `<svg width="${size}" height="${size}" viewBox="0 2 32 30" aria-hidden="true"><rect y="2" width="32" height="30" rx="8" fill="#e8f6ff"/>${rChibi(n.look)}</svg>`;
  return '';
}
function rSpName(sp) { if (sp === 'me') return 'Você'; if (sp === 'sign') return 'Placa'; if (sp === 'cat') return 'Tama'; const n = RPG_NPCS[sp]; return n ? n.name : RPG_ENEMIES[sp] ? RPG_ENEMIES[sp].name : ''; }
function rpgWordCard(k, b) {
  const w = RW[k], saved = rpgWordSaved(k), inDict = typeof dictFind === 'function' && !!dictFind(w.jp, w.kana);
  const tag = b && b.known ? '<span class="chip aprendendo">Você já conhece</span>' : b && !b.first ? '<span class="chip vista">Já vista na aventura</span>' : '<span class="chip nova">Nova</span>';
  return `<div class="av-word"><div class="av-word-h">${tag}<span class="muted" style="font-size:.78rem">Palavra da aventura</span></div>
    <div class="av-word-b"><span class="jp av-wjp">${esc(w.jp)}</span>${w.jp !== w.kana ? `<span class="jp muted">${esc(w.kana)}</span>` : ''}<span class="ro">${esc(w.ro)}</span><b>${esc(w.pt)}</b>${w.note ? `<small class="muted">${esc(w.note)}</small>` : ''}</div>
    <div class="av-word-a">${AUDIO.supported ? `<button class="w-a" data-act="avSay" data-text="${esc(w.say)}">${IC.sound}<span>Ouvir</span></button>` : ''}${inDict ? `<button class="w-a" data-act="avDict" data-k="${k}"><span class="jp">辞</span><span>Dicionário</span></button>` : ''}${saved ? '<span class="w-a done">✓ No Caderno</span>' : `<button class="w-a" data-act="avSaveWord" data-k="${k}"><span>＋ Caderno</span></button>`}</div></div>`;
}
function rpgDlgRender() {
  const el = $('#avDlg'); if (!el || !AV.dlg) return;
  const b = AV.dlg.cur, o = rpgState().opt; let body = '', foot = `<button class="btn btn-primary btn-block" data-act="avNext">Continuar</button>`;
  if (b.s) {
    const L = rLine(b.s), hide = o.listen && !b.rev && L.say && L.sp !== 'sign';
    body = `<div class="av-line">${rPortrait(L.sp)}<div class="av-bub"><b class="w-who">${esc(rSpName(L.sp))}</b>${hide ? `<button class="w-hidden" data-act="avReveal">${IC.sound}<span>Ouça primeiro · toque para ver o texto</span></button>` : `<span class="jp av-jp">${esc(L.jp)}</span>${o.ro && L.ro ? `<span class="ro">${esc(L.ro)}</span>` : ''}${o.pt && L.pt ? `<span class="w-pt">${esc(L.pt)}</span>` : ''}`}
      ${L.say && AUDIO.supported ? `<div class="w-acts"><button class="w-a" data-act="avSayLine">${IC.sound}<span>Ouvir</span></button><button class="w-a" data-act="avSayLine" data-slow="1"><span>Devagar</span></button></div>` : ''}</div></div>`;
  } else if (b.n) body = `<p class="av-nar">${esc(rFill(b.n))}</p>`;
  else if (b.teach) body = rpgWordCard(b.teach, b);
  else if (b.reward) body = rpgRewardHTML(b.reward);
  else if (b.choice) { body = b.q ? `<p class="av-nar">${esc(b.q)}</p>` : ''; foot = `<div class="av-choices">${b.choice.map((c, j) => `<button class="btn ${j === 0 ? 'btn-primary' : 'btn-ghost'} btn-block" data-act="avChoice" data-j="${j}">${esc(c[0])}</button>`).join('')}</div>`; }
  else if (b.quiz) { body = rpgQuizHTML(); foot = QZ && QZ.result ? `<button class="btn btn-primary btn-block" data-act="avNext">Continuar</button>` : ''; }
  el.innerHTML = `<div class="av-dlg-in">${body}</div><div class="av-dlg-foot">${foot}</div>`;
  el.hidden = false;
}
function rpgDlgSpeak(b) {
  if (S.settings.sound === false) return;
  if (b.s) { const L = rLine(b.s); if (L.say) rSay(L.say, L.sp); }
  else if (b.teach) rSay(RW[b.teach].say);
}
function rSay(text, sp, slow) { const n = RPG_NPCS[sp]; if (!text || !AUDIO.supported) return; speak(text, { pitch: n ? n.pitch : 1, rate: slow ? 0.6 : undefined }); }
function rpgRewardHTML(rw) {
  const rows = [];
  (rw.got || []).forEach(g => {
    if (g.item) { const n = rpgItemName(g.item), it = RPG_ITEMS[g.item]; rows.push(`<div class="av-rw"><span class="av-ric r${it.r || 1}">${rpgItemIcon(g.item)}</span><span class="grow"><b>${esc(n.pt)}${g.n > 1 ? ' ×' + g.n : ''}</b><small><span class="jp">${esc(n.jp)}</span>${n.ro ? ' · ' + esc(n.ro) : ''}${it.slot && RPG_SLOTS.some(([s]) => s === it.slot) ? ' · ' + rpgItemBonus(it) : ''}</small></span></div>`); }
    if (g.spell) { const sp = RPG_SPELLS[g.spell], w = RW[sp.w]; rows.push(`<div class="av-rw"><span class="av-ric r2 jp">${esc(w.jp)}</span><span class="grow"><b>Magia: ${esc(sp.pt)}</b><small><span class="jp">${esc(w.jp)}</span> · ${esc(w.ro)} · custa ${sp.ki} Ki</small></span></div>`); }
  });
  if (rw.exp) rows.push(`<div class="av-rw"><span class="av-ric r1">★</span><span class="grow"><b>+${rw.exp} EXP de aventura</b><small>Nível do herói</small></span></div>`);
  (rw.ups || []).forEach(L => rows.push(`<div class="av-rw up"><span class="av-ric r3">↑</span><span class="grow"><b>Nível ${L}!</b><small>HP e Ki recuperados, mais força e defesa.</small></span></div>`));
  if (rw.xp || rw.coins) rows.push(`<div class="av-rw nq"><span class="av-ric r2">${IC.star}</span><span class="grow"><b>${rw.xp ? '+' + rw.xp + ' XP' : ''}${rw.xp && rw.coins ? ' · ' : ''}${rw.coins ? '+' + rw.coins + ' moedas' : ''}</b><small>Nihongo Quest (só na primeira vez)</small></span></div>`);
  return `<div class="av-reward"><span class="eyebrow">${esc(rw.title || 'Recompensa')}</span>${rw.text ? `<p style="margin:2px 0 4px">${esc(rw.text)}</p>` : ''}${rows.join('') || '<p class="muted" style="margin:0">Nada desta vez.</p>'}</div>`;
}
function rpgItemBonus(it) { return [it.atk && '+' + it.atk + ' ataque', it.def && '+' + it.def + ' defesa', it.hp && '+' + it.hp + ' HP', it.ki && '+' + it.ki + ' Ki', it.crit && '+' + it.crit + '% crítico', it.flee && '+' + it.flee + '% fuga', it.heal && 'recupera ' + it.heal + ' HP', it.kiHeal && 'recupera ' + it.kiHeal + ' Ki'].filter(Boolean).join(', '); }
function rpgItemIcon(id) { const it = RPG_ITEMS[id]; const w = it && RW[it.w]; return `<span class="jp">${esc(it && it.jp ? it.jp.slice(0, 1) : w ? w.jp.slice(0, 1) : '?')}</span>`; }
function rpgRewardBeats(list) {
  const out = [];
  list.forEach(([id, res]) => { if (!res) return; const q = RPG_QUESTS[id]; out.push({ reward: Object.assign({ title: (q.main ? 'Missão principal concluída' : 'Missão concluída') + ': ' + q.title }, res) }); res.got.forEach(g => { const w = g.item ? RPG_ITEMS[g.item].w : g.spell ? RPG_SPELLS[g.spell].w : ''; if (w) out.push({ teach: w }); }); });
  const nextMain = Object.keys(RPG_QUESTS).find(k => RPG_QUESTS[k].main && rqOn(k));
  if (list.some(([id]) => RPG_QUESTS[id].main) && nextMain) out.push({ n: 'Nova missão: ' + RPG_QUESTS[nextMain].title + '. ' + RPG_QUESTS[nextMain].desc });
  return out;
}
function rpgTurnIn(id) { const res = rqComplete(id); return res ? rpgRewardBeats([[id, res]]) : []; }

/* ---------- roteiros ---------- */
function rpgIntroBeats() {
  return [
    { n: 'Hikari, o espírito guardião da Academia, abre um portal de luz diante de você.' },
    { s: 'hikari|ここは 言葉の国です。|koko wa kotoba no kuni desu.|Aqui é a Terra das Palavras.' },
    { s: 'hikari|この 国では、言葉に 力が あります。|kono kuni de wa, kotoba ni chikara ga arimasu.|Neste reino, as palavras têm poder.' },
    { n: 'Mas o Oni do Silêncio roubou as palavras do Vale Asahi. Sem elas, as pessoas esquecem o que querem dizer.' },
    { s: 'hikari|{name}さん、たすけて ください！|{name}-san, tasukete kudasai!|{name}, por favor, ajude!' },
    { n: 'Você acorda no meio da Vila Asahi. Alguém conhecido está do seu lado.' },
    { s: 'ren|おっ、{name}！ ここ、どこ？ RPGみたい じゃん！|o, {name}! koko, doko? RPG mitai jan!|Opa, {name}! Onde a gente tá? Parece um RPG!' },
    { s: 'ren|いっしょに 冒険 しよう！|issho ni bouken shiyou!|Bora viver uma aventura juntos!' },
    { teach: 'bouken' },
    { n: 'Como jogar: toque num lugar do mapa para andar até lá (ou use as setas). Encoste em pessoas, baús e ✦ para interagir.' },
    { fn: () => { const r = rpgState(); r.intro = Date.now(); rqStart('m1'); save(); } },
    { n: 'Missão: fale com a Vovó Chiyo. Ela está à esquerda, na frente da casa grande.' }
  ];
}
function rpgNpcBeats(id) {
  const r = rpgState(), ready = q => rqReady(q), on = q => rqOn(q), done = q => rqDone(q);
  if (id === 'chiyo') {
    if (on('m1')) return [
      { s: 'chiyo|おや、旅の 方 ですね。|oya, tabi no kata desu ne.|Oh, você é de fora, não é?' },
      { s: 'chiyo|わたしは ちよ。この 村の おばあさんです。|watashi wa Chiyo. kono mura no obaasan desu.|Eu sou a Chiyo, a vovó desta vila.' },
      { s: 'chiyo|鬼が 村の 言葉を ぬすみました。|oni ga mura no kotoba o nusumimashita.|Um ogro roubou as palavras da vila.' },
      { teach: 'oni' },
      { s: 'ren|言葉を とりもどそう！|kotoba o torimodosou!|Vamos recuperar as palavras!' },
      { teach: 'kotoba' },
      { s: 'chiyo|この 木刀を どうぞ。|kono bokutou o douzo.|Pegue esta espada de madeira.' },
      { fn: () => rpgTurnIn('m1') },
      { s: 'chiyo|野原に もちが います。気を つけて！|nohara ni mochi ga imasu. ki o tsukete!|Tem mochis no campo. Tome cuidado!' },
      { n: 'O Campo Nohara fica ao norte da vila (siga o caminho para cima). Ren vai com você.' }
    ];
    if (ready('m2')) return [
      { s: 'chiyo|すごい！ ありがとう ございます。|sugoi! arigatou gozaimasu.|Incrível! Muito obrigada.' },
      { s: 'chiyo|この 巻物を あげます。|kono makimono o agemasu.|Vou te dar este pergaminho.' },
      { teach: 'makimono' },
      { fn: () => rpgTurnIn('m2') },
      { n: 'Os moradores tiraram o tronco que fechava o caminho para a floresta (a leste do campo).' },
      { s: 'chiyo|森の 神社へ 行って ください。|mori no jinja e itte kudasai.|Por favor, vá ao santuário da floresta.' }
    ];
    if (on('m2')) { const p = rqProgress('m2'); return [{ s: 'chiyo|もちは 野原に いますよ。|mochi wa nohara ni imasu yo.|Os mochis estão no campo.' }, { n: `Derrotados: ${p.n} de ${p.of}. O campo fica ao norte.` }]; }
    if (on('m3')) return [{ s: 'chiyo|森の 神社は 北です。|mori no jinja wa kita desu.|O santuário da floresta fica ao norte.' }, { n: 'Entre na floresta pelo leste do campo e siga para o norte.' }];
    if (on('m4')) return [{ s: 'chiyo|川に 河童が います。風が きらいですよ。|kawa ni kappa ga imasu. kaze ga kirai desu yo.|Tem um kappa no rio. Ele detesta vento.' }, { teach: 'kappa' }];
    if (on('m5')) return [{ s: 'chiyo|洞窟は 暗いです。気を つけて。|doukutsu wa kurai desu. ki o tsukete.|A caverna é escura. Tome cuidado.' }];
    if (r.flags.cleared) return [{ s: 'chiyo|言葉が もどりました！ ありがとう、勇者さま。|kotoba ga modorimashita! arigatou, yuusha-sama.|As palavras voltaram! Obrigada, herói.' }, { teach: 'yuusha' }];
    return [{ s: 'chiyo|いい 天気ですね。|ii tenki desu ne.|Que tempo bom, não?' }];
  }
  if (id === 'hana') {
    const s1 = [];
    if (rqAvailable('s1')) s1.push(['Perguntar se ela precisa de ajuda', [{ s: 'hana|薬草を 三つ ください。薬を 作ります。|yakusou o mittsu kudasai. kusuri o tsukurimasu.|Me traz três ervas medicinais? Eu faço remédio.' }, { teach: 'yakusou' }, { fn: () => { rqStart('s1'); } }, { n: 'Missão aceita: Ervas para a Hana. As ervas (🌿) crescem no campo, na floresta e no santuário. Renascem todo dia.' }]]);
    if (ready('s1')) s1.push(['Entregar as 3 ervas', [{ s: 'hana|わあ、ありがとう！|waa, arigatou!|Uau, obrigada!' }, { fn: () => rpgTurnIn('s1') }]]);
    return [
      { s: r.hero.hp < rpgStats().maxHp ? 'hana|いらっしゃいませ！ つかれて いますね。|irasshaimase! tsukarete imasu ne.|Bem-vindo(a)! Parece cansado(a).' : 'hana|いらっしゃいませ！|irasshaimase!|Bem-vindo(a)!' },
      { choice: [
        ['Descansar na pousada (grátis)', [{ fn: () => { rpgHealAll(); rpgDraw(); } }, { s: 'hana|ゆっくり 休んで ください。|yukkuri yasunde kudasai.|Descanse bem.' }, { n: 'HP e Ki recuperados.' }]],
        ['Ver a loja', [{ fn: () => { AV.after = () => rpgOpenShop('hana'); } }]],
        ...s1,
        ['Até logo', [{ s: 'hana|また どうぞ！|mata douzo!|Volte sempre!' }]]
      ] }
    ];
  }
  if (id === 'tetsu') {
    const extra = [];
    if (rqAvailable('s3')) extra.push(['Perguntar sobre espadas', [{ s: 'tetsu|洞窟の 鉄を 三つ もって こい。いい 剣を 作って やる。|doukutsu no tetsu o mittsu motte koi. ii ken o tsukutte yaru.|Traz três ferros da caverna. Eu faço uma espada boa pra você.' }, { teach: 'tetsu' }, { fn: () => { rqStart('s3'); } }, { n: 'Missão aceita: Ferro para o ferreiro. O minério aparece nas paredes da Caverna do Eco.' }]]);
    if (ready('s3')) extra.push(['Entregar o ferro', [{ s: 'tetsu|おお、いい 鉄だ！ ちょっと まって。|oo, ii tetsu da! chotto matte.|Opa, ferro bom! Espera um pouco.' }, { n: 'Clang, clang, clang! Faíscas voam na forja.' }, { fn: () => rpgTurnIn('s3') }, { teach: 'ken' }]]);
    return [
      { s: 'tetsu|おう。鍛冶屋の てつだ。|ou. kajiya no Tetsu da.|E aí. Sou o Tetsu, o ferreiro.' },
      { if: !done('m4') && !rq('s3'), s: 'tetsu|洞窟に 鉄が ある。でも 橋に 河童が いる からな。|doukutsu ni tetsu ga aru. demo hashi ni kappa ga iru kara na.|Tem ferro na caverna. Mas tem um kappa na ponte, né.' },
      { choice: [['Ver a forja', [{ fn: () => { AV.after = () => rpgOpenShop('tetsu'); } }]], ...extra, ['Até mais', [{ s: 'tetsu|じゃあな。|jaa na.|Falou.' }]]] }
    ];
  }
  if (id === 'sora') {
    if (ready('s2')) return [{ s: 'sora|タマ！ かえって きた！ ありがとう！|Tama! kaette kita! arigatou!|A Tama voltou! Obrigado!' }, { n: 'Sora tira o guizo da coleira antiga da Tama e te dá de presente.' }, { fn: () => rpgTurnIn('s2') }];
    if (on('s2')) return [{ s: 'sora|タマ、森に いるかな…|Tama, mori ni iru kana...|Será que a Tama está na floresta…' }, { n: 'Procure no canto sudoeste da floresta.' }];
    if (rqAvailable('s2')) return [{ s: 'sora|ぼくの 猫、タマが いないんだ。森に いるかも…|boku no neko, Tama ga inai n da. mori ni iru kamo...|Minha gata, a Tama, sumiu. Talvez esteja na floresta…' }, { teach: 'neko' }, { choice: [['Eu procuro a Tama!', [{ fn: () => { rqStart('s2'); } }, { s: 'sora|ほんと？ ありがとう！|honto? arigatou!|Sério? Obrigado!' }, { n: 'Missão aceita: O gato perdido.' }]], ['Agora não', [{ s: 'sora|そっか…|sokka...|Ah, tá…' }]]] }];
    if (done('s2')) return [{ s: 'sora|タマ、げんき だよ！|Tama, genki da yo!|A Tama tá ótima!' }];
    return [{ s: 'sora|ぼくの 猫が いない…|boku no neko ga inai...|Minha gata sumiu…' }, { n: 'Sora parece triste. Talvez você possa ajudar quando a floresta abrir.' }];
  }
  if (id === 'gen') {
    const ch = [];
    if (rqAvailable('s5')) ch.push(['Perguntar sobre o vale', [{ s: 'gen|この 谷には ふしぎな 場所が 六つ ある。|kono tani ni wa fushigi na basho ga muttsu aru.|Este vale tem seis lugares misteriosos.' }, { fn: () => { rqStart('s5'); } }, { n: 'Missão aceita: Olhos de explorador. Os lugares têm ✦ no mapa. Encoste neles para examinar.' }]]);
    if (ready('s5')) ch.push(['Contar o que você viu', [{ s: 'gen|ほう！ ぜんぶ 見たのか。|hou! zenbu mita no ka.|Opa! Você viu todos?' }, { fn: () => rpgTurnIn('s5') }]]);
    return [
      { s: 'gen|よう、若いの。|you, wakai no.|E aí, jovem.' },
      { if: !r.flags.boss_kappa, s: 'gen|橋に 河童が いる。とても れいぎ正しい やつだ。|hashi ni kappa ga iru. totemo reigitadashii yatsu da.|Tem um kappa na ponte. Um sujeito muito educado.' },
      { if: !r.flags.boss_kappa, n: 'Dica do Seu Gen: quando você acerta uma palavra (言霊) contra o kappa, ele faz uma reverência, derrama a água do prato da cabeça e fica tonto.' },
      { if: !!r.flags.boss_kappa, s: 'gen|今日は 魚が よく つれる。|kyou wa sakana ga yoku tsureru.|Hoje os peixes estão mordendo bem.' },
      ...(ch.length ? [{ choice: ch.concat([['Até mais', [{ s: 'gen|じゃあな。|jaa na.|Até.' }]]]) }] : [])
    ];
  }
  if (id === 'kitsune') {
    const ch = [];
    if (rqAvailable('s4')) ch.push(['Aceitar o desafio dos enigmas', [{ s: 'kitsune|なぞなぞに 三つ 答えたら、お面を あげる。|nazonazo ni mittsu kotaetara, omen o ageru.|Se você acertar três enigmas, te dou uma máscara.' }, { teach: 'kitsune' }, { fn: () => { rqStart('s4'); } }]]);
    if (on('s4') && !ready('s4')) ch.push([`Responder um enigma (${rqProgress('s4').n}/3)`, [{ fn: () => rpgRiddleBeats() }]]);
    if (ready('s4')) ch.push(['Pegar a máscara', [{ s: 'kitsune|すごい！ 約束の お面よ。|sugoi! yakusoku no omen yo.|Incrível! A máscara prometida.' }, { fn: () => rpgTurnIn('s4') }]]);
    return [
      { s: rq('s4') ? 'kitsune|また 来たの？ うふふ。|mata kita no? ufufu.|Voltou? Hihi.' : 'kitsune|こんにちは、人間さん。わたしは こはく。|konnichiwa, ningen-san. watashi wa Kohaku.|Olá, humano(a). Eu sou a Kohaku.' },
      { if: !rq('s4'), s: 'kitsune|なぞなぞが 大好き！|nazonazo ga daisuki!|Eu adoro enigmas!' },
      ...(ch.length ? [{ choice: ch.concat([['Até logo', [{ s: 'kitsune|またね。|mata ne.|Até mais.' }]]]) }] : [{ s: 'kitsune|この 神社で 休んで いってね。|kono jinja de yasunde itte ne.|Descanse um pouco neste santuário.' }])
    ];
  }
  return [{ n: '…' }];
}
function rpgRiddleBeats() {
  const q = rpgMakeQuiz(pick(['ler', 'ouvir', 'inverso']));
  if (!q) { const k = rpgNextToTeach(); return [{ s: 'kitsune|まず 言葉を おぼえてね。|mazu kotoba o oboete ne.|Primeiro, aprenda umas palavras.' }].concat(k ? [{ teach: k }] : []).concat([{ n: 'Os enigmas usam palavras que você já estudou no Nihongo Quest ou aprendeu nesta aventura.' }]); }
  QZ = { q, ctx: 'riddle', result: null };
  return [{ s: 'kitsune|なぞなぞ です！|nazonazo desu!|Lá vai um enigma!' }, { quiz: true }, { fn: () => { const ok = QZ && QZ.result === 'ok'; QZ = null; if (ok) { rpgState().riddles = (rpgState().riddles || 0) + 1; save(); return [{ s: 'kitsune|せいかい！|seikai!|Acertou!' }].concat(rqReady('s4') ? [{ n: 'Três enigmas certos! Fale com a Kohaku de novo para pegar a máscara.' }] : []); } return [{ s: 'kitsune|ざんねん！ また ちょうせん してね。|zannen! mata chousen shite ne.|Que pena! Tente de novo depois.' }]; } }];
}
function rpgSpotBeats(id) {
  const r = rpgState(), sp = RPG_SPOTS[id], first = !r.spots[id];
  return [{ n: sp.text }, { teach: sp.w }, { fn: () => {
    if (!first) return;
    r.spots[id] = Date.now(); save();
    const paid = nqRewardOnce('rpg:spot:' + id, 5, 0);
    checkAchievements();
    return [{ reward: { title: 'Descoberta: ' + sp.pt, xp: paid ? 5 : 0, text: `Lugares especiais encontrados: ${Object.keys(r.spots).length} de ${Object.keys(RPG_SPOTS).length}.` } }];
  } }];
}
function rpgChestBeats(o) {
  const r = rpgState();
  if (r.opened[o.id]) return [{ n: 'O baú está vazio.' }];
  const L = o.loot, firstChest = !Object.keys(r.opened).length;
  return [{ fn: () => {
    r.opened[o.id] = Date.now();
    const got = [];
    if (L.item) { invAdd(L.item, L.n || 1); got.push({ item: L.item, n: L.n || 1 }); rpgAutoEquip(L.item); }
    if (L.spell) { r.spells[L.spell] = Date.now(); got.push({ spell: L.spell }); }
    const paid = L.coins ? nqRewardOnce('rpg:chest:' + o.id, 0, L.coins) : false;
    save(); rpgDraw();
    const w = L.item ? RPG_ITEMS[L.item].w : L.spell ? RPG_SPELLS[L.spell].w : '';
    sfx('coin');
    return [{ n: L.spell ? 'Dentro do baú há um pergaminho (巻物) com uma magia!' : 'Você abriu o baú!' }].concat(firstChest ? [{ teach: 'takarabako' }] : [])
      .concat([{ reward: { title: 'Tesouro', got, coins: paid ? L.coins : 0 } }]).concat(w ? [{ teach: w }] : []);
  } }];
}
function rpgGatherBeats(o) {
  const r = rpgState(), today = dayKey(), it = RPG_ITEMS[o.item];
  if (r.gather[o.id] === today) return [{ n: o.item === 'tetsu' ? 'Você já tirou o minério daqui hoje. Volte amanhã.' : 'Você já colheu esta erva hoje. Ela cresce de novo amanhã.' }];
  return [{ fn: () => { r.gather[o.id] = today; invAdd(o.item, 1); save(); rpgDraw(); sfx('ok'); return [{ reward: { title: o.item === 'tetsu' ? 'Minério encontrado' : 'Erva colhida', got: [{ item: o.item, n: 1 }] } }, { teach: it.w }]; } }];
}
function rpgShrineBeats() {
  const r = rpgState(), first = !r.flags.prayed;
  return [{ n: 'Um pequeno santuário. Você toca o sino, faz duas reverências, bate palmas duas vezes e junta as mãos.' },
    { fn: () => { rpgHealAll(); r.respawn = 'jinja'; r.flags.prayed = r.flags.prayed || Date.now(); save(); rpgDraw(); const auto = rqAutoComplete(); return [{ n: 'Uma luz suave envolve você. HP e Ki recuperados. Se cair numa batalha, você volta para cá.' }].concat(first ? [{ teach: 'jinja' }] : []).concat(rpgRewardBeats(auto)); } }];
}
function rpgBossIntro(o) {
  if (o.e === 'kappa') return [
    { s: 'kappa|こんにちは。ここは 通れません。|konnichiwa. koko wa tooremasen.|Boa tarde. Por aqui não se passa.' },
    { s: 'kappa|しょうぶ です！|shoubu desu!|Vamos duelar!' },
    { s: 'ren|れいぎ正しい 河童だ！（笑）|reigitadashii kappa da! (wara)|Que kappa educado! (risos)' },
    { fn: () => { AV.after = () => rpgBattle('kappa', o); } }];
  return [
    { s: 'oni|…………|…|(silêncio)' },
    { n: 'O ogro vermelho levanta a mão, e todos os sons da caverna somem. Até o eco fica calado.' },
    { s: 'ren|{name}、言葉で たたかおう！|{name}, kotoba de tatakaou!|{name}, vamos lutar com palavras!' },
    { teach: 'kotodama' },
    { fn: () => { AV.after = () => rpgBattle('oni', o); } }];
}

/* ---------- loja e forja ---------- */
function rpgShopList(who) { return who === 'hana' ? ['kusuri', 'ocha', 'kitate', 'hachimaki'] : ['tetsutate']; }
function rpgShopHTML(who) {
  const n = RPG_NPCS[who];
  const row = id => {
    const it = RPG_ITEMS[id], nm = rpgItemName(id), owned = rpgOwned(id) && it.slot !== 'use';
    const mats = it.forge ? Object.entries(it.forge).map(([k, q]) => `${q}× ${RPG_ITEMS[k].pt} (tem ${invN(k)})`).join(', ') : '';
    const can = S.coins >= (it.price || 0) && (!it.forge || Object.entries(it.forge).every(([k, q]) => invN(k) >= q)) && !owned;
    return `<div class="av-shop-row"><span class="av-ric r${it.r}">${rpgItemIcon(id)}</span><div class="grow" style="min-width:0"><b>${esc(nm.pt)}</b> <span class="jp muted">${esc(nm.jp)}</span><small class="muted">${esc(rpgItemBonus(it) || it.desc)}${mats ? ' · ' + esc(mats) : ''}</small></div>
      <button class="btn btn-small ${can ? 'btn-gold' : 'btn-ghost'}" data-act="avBuy" data-id="${id}" data-who="${who}" ${can ? '' : 'disabled'}>${owned ? 'Já tem' : (it.price ? IC.coin + ' ' + it.price : 'Forjar')}</button></div>`;
  };
  const trade = who === 'tetsu' ? `<div class="av-shop-row"><span class="av-ric r1">${rpgItemIcon('hane')}</span><div class="grow"><b>Trocar 3 penas por 1 chá</b><small class="muted">Você tem ${invN('hane')} pena(s).</small></div><button class="btn btn-small ${invN('hane') >= 3 ? 'btn-gold' : 'btn-ghost'}" data-act="avTrade" ${invN('hane') >= 3 ? '' : 'disabled'}>Trocar</button></div>` : '';
  return `<div class="stack av-sheet"><div class="av-shop-h">${rPortrait(who, 52)}<div><h2 style="font-size:1.15rem">${who === 'hana' ? 'Loja da Hana' : 'Forja do Tetsu'}</h2><span class="muted">${esc(n.role)}</span></div></div>
    <p class="muted" style="margin:0;font-size:.85rem">Você usa as moedas que ganha estudando no Nihongo Quest. Elas não acabam com batalhas: a aventura não dá moedas repetidas. Você tem ${IC.coin} <b class="tabnum">${S.coins}</b>.</p>
    <div class="card list">${rpgShopList(who).map(row).join('')}${trade}</div>
    <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`;
}
function rpgOpenShop(who) { openModal(rpgShopHTML(who), 'av-modal'); }
function rpgBuy(id) {
  const it = RPG_ITEMS[id]; if (!it) return false;
  if ((it.price || 0) > S.coins) { toast('銭', 'Moedas insuficientes. Estude um pouco para ganhar mais!'); return false; }
  if (it.forge && !Object.entries(it.forge).every(([k, q]) => invN(k) >= q)) return false;
  if (it.slot !== 'use' && rpgOwned(id)) return false;
  S.coins -= it.price || 0; if (it.forge) Object.entries(it.forge).forEach(([k, q]) => invAdd(k, -q));
  invAdd(id, 1); rpgAutoEquip(id); if (it.w) rpgTeach(it.w); sfx('coin'); save(); return true;
}

/* ---------- menu do herói (folha) ---------- */
let AVM = { tab: 'heroi' };
function rpgMenuHTML() {
  const tabs = [['heroi', 'Herói'], ['bolsa', 'Bolsa'], ['missoes', 'Missões'], ['mapa', 'Mapa'], ['palavras', 'Palavras'], ['opcoes', 'Opções']];
  const body = { heroi: rpgHeroTab, bolsa: rpgBagTab, missoes: rpgQuestTab, mapa: rpgMapTab, palavras: rpgWordsTab, opcoes: rpgOptTab }[AVM.tab] || rpgHeroTab;
  return `<div class="stack av-sheet"><div class="av-tabs" role="tablist">${tabs.map(([k, t]) => `<button class="${AVM.tab === k ? 'on' : ''}" role="tab" aria-selected="${AVM.tab === k}" data-act="avMenu" data-tab="${k}">${t}</button>`).join('')}</div>${body()}<button class="btn btn-ghost btn-block" data-act="closeModal">Voltar à aventura</button></div>`;
}
function rpgHeroTab() {
  const r = rpgState(), s = rpgStats(), need = rpgExpNeed(s.lv);
  const slot = ([k, lab, jp]) => { const id = r.equip[k], nm = id ? rpgItemName(id) : null; return `<div class="av-slot"><span class="av-ric ${id ? 'r' + RPG_ITEMS[id].r : ''} jp">${jp}</span><div class="grow" style="min-width:0"><small class="muted">${lab}</small><b>${nm ? esc(nm.pt) : '—'}</b>${nm ? `<small class="muted"><span class="jp">${esc(nm.jp)}</span> · ${esc(rpgItemBonus(RPG_ITEMS[id]))}</small>` : ''}</div>${id ? `<button class="btn btn-small btn-ghost" data-act="avUnequip" data-slot="${k}">Tirar</button>` : ''}</div>`; };
  return `<div class="card av-hero"><div class="av-hero-h"><svg width="56" height="56" viewBox="0 2 32 30" aria-hidden="true"><rect y="2" width="32" height="30" rx="8" fill="#e8f6ff"/>${rChibi(RPG_HERO_LOOK)}</svg><div class="grow"><span class="eyebrow">勇者 · Herói</span><h2 style="font-size:1.2rem">${esc(rName())}</h2><span class="muted tabnum">Nível ${s.lv}${s.lv >= RPG_EXP_CAP ? ' (máximo)' : ` · EXP ${r.hero.exp}/${need}`}</span></div></div>
    ${s.lv < RPG_EXP_CAP ? `<div class="av-bar exp"><i style="width:${Math.round(r.hero.exp / need * 100)}%"></i></div>` : ''}
    <div class="av-stats"><div><b class="tabnum">${r.hero.hp}/${s.maxHp}</b><small>HP</small></div><div><b class="tabnum">${r.hero.ki}/${s.maxKi}</b><small>Ki (magias)</small></div><div><b class="tabnum">${s.atk}</b><small>Ataque</small></div><div><b class="tabnum">${s.def}</b><small>Defesa</small></div></div>
    <p class="muted" style="margin:6px 0 0;font-size:.8rem">O nível do herói é só da aventura. Seu nível de estudo continua no Perfil (XP do Nihongo Quest).</p></div>
    <section class="stack" style="gap:8px"><h3 style="font-size:1rem">Equipamentos</h3><div class="card list">${RPG_SLOTS.map(slot).join('')}</div></section>
    <section class="stack" style="gap:8px"><h3 style="font-size:1rem">Magias</h3><div class="card list">${Object.keys(RPG_SPELLS).filter(k => r.spells[k]).map(k => { const sp = RPG_SPELLS[k], w = RW[sp.w]; return `<div class="av-slot"><span class="av-ric r2 jp">${esc(w.jp)}</span><div class="grow"><b>${esc(sp.pt)}</b> <span class="ro">${esc(w.ro)}</span><small class="muted">${esc(sp.desc)} · ${sp.ki} Ki</small></div></div>`; }).join('') || '<p class="muted" style="margin:0">Nenhuma ainda. Pergaminhos (巻物) ensinam magias.</p>'}</div></section>
    <div class="card av-stats"><div><b class="tabnum">${r.stats.wins}</b><small>vitórias</small></div><div><b class="tabnum">${r.stats.wordsOk}/${r.stats.words}</b><small>palavras certas</small></div><div><b class="tabnum">${Object.keys(r.spots).length}/${Object.keys(RPG_SPOTS).length}</b><small>descobertas</small></div></div>`;
}
function rpgBagTab() {
  const r = rpgState(), ids = Object.keys(r.inv).filter(k => RPG_ITEMS[k] && r.inv[k] > 0);
  const grp = [['Equipamentos', i => RPG_SLOTS.some(([s]) => s === RPG_ITEMS[i].slot)], ['Consumíveis', i => RPG_ITEMS[i].slot === 'use'], ['Materiais', i => RPG_ITEMS[i].slot === 'mat'], ['Itens importantes', i => RPG_ITEMS[i].slot === 'key']];
  const row = id => { const it = RPG_ITEMS[id], nm = rpgItemName(id); const eq = RPG_SLOTS.some(([s]) => s === it.slot); return `<div class="av-shop-row"><span class="av-ric r${it.r}">${rpgItemIcon(id)}</span><div class="grow" style="min-width:0"><b>${esc(nm.pt)}${r.inv[id] > 1 ? ' ×' + r.inv[id] : ''}</b> <span class="jp muted">${esc(nm.jp)}</span>${it.r > 1 ? ` <span class="chip ${it.r === 3 ? 'dominada' : 'aprendendo'}">${RPG_RARITY[it.r]}</span>` : ''}<small class="muted">${esc(it.desc)}${rpgItemBonus(it) ? ' · ' + esc(rpgItemBonus(it)) : ''}</small></div>${eq ? `<button class="btn btn-small btn-primary" data-act="avEquip" data-id="${id}">Equipar</button>` : it.slot === 'use' ? `<button class="btn btn-small btn-primary" data-act="avUse" data-id="${id}">Usar</button>` : ''}</div>`; };
  const html = grp.map(([t, f]) => { const l = ids.filter(f); return l.length ? `<section class="stack" style="gap:8px"><h3 style="font-size:1rem">${t}</h3><div class="card list">${l.map(row).join('')}</div></section>` : ''; }).join('');
  return `<p class="muted" style="margin:0;font-size:.85rem">${IC.coin} <b class="tabnum">${S.coins}</b> moedas do Nihongo Quest</p>` + (html || '<p class="muted">A bolsa está vazia. Abra baús e colha ervas para encontrar itens.</p>');
}
function rpgQuestTab() {
  const r = rpgState();
  const row = id => { const q = RPG_QUESTS[id], st = rq(id), p = rqProgress(id), ready = rqReady(id); return `<div class="av-q ${st.st === 'done' ? 'done' : ''}"><span class="av-ric ${q.main ? 'r3' : 'r2'} jp">${q.main ? '主' : '副'}</span><div class="grow" style="min-width:0"><b>${esc(q.title)}</b> <span class="jp muted" style="font-size:.85rem">${esc(q.jp)}</span><small class="muted">${esc(q.desc)}</small>${st.st === 'done' ? '<small class="av-ok">✓ Concluída</small>' : ready && q.turn ? `<small class="av-ready">Pronta! Fale com ${esc(RPG_NPCS[q.turn].name)}.</small>` : p.of > 1 ? `<small class="tabnum">${p.n}/${p.of}</small>` : ''}</div></div>`; };
  const ids = Object.keys(RPG_QUESTS).filter(id => rq(id));
  const act = ids.filter(id => rq(id).st !== 'done'), done = ids.filter(id => rq(id).st === 'done');
  const avail = Object.keys(RPG_QUESTS).filter(id => !RPG_QUESTS[id].main && rqAvailable(id));
  return `${act.length ? `<div class="card list">${act.map(row).join('')}</div>` : '<p class="muted" style="margin:0">Nenhuma missão em andamento.</p>'}
    ${avail.length ? `<p class="muted" style="margin:0;font-size:.85rem">Pessoas com <b style="color:#e0343c">!</b> no mapa têm missões para você: ${avail.map(id => esc(RPG_NPCS[RPG_QUESTS[id].giver].name)).join(', ')}.</p>` : ''}
    ${done.length ? `<section class="stack" style="gap:8px"><h3 style="font-size:1rem">Registro de missões</h3><div class="card list">${done.map(row).join('')}</div></section>` : ''}`;
}
function rpgRegionSVG(cur) {
  const r = rpgState(), N = RPG_REGION.nodes;
  const lines = RPG_REGION.links.map(([a, b]) => `<path d="M${N[a][0]} ${N[a][1]}L${N[b][0]} ${N[b][1]}" stroke="${r.visited[a] && r.visited[b] ? '#c9a24a' : '#b8bccf'}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${r.visited[a] && r.visited[b] ? '0' : '2 10'}"/>`).join('');
  const fut = RPG_REGION.future.map(f => { const from = N[f.from] || RPG_REGION.future.find(x => x.id === f.from).pos; return `<path d="M${from[0]} ${from[1]}L${f.pos[0]} ${f.pos[1]}" stroke="#b8bccf" stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/><g transform="translate(${f.pos[0]} ${f.pos[1]})" aria-label="${esc(f.name)}: bloqueada"><circle r="20" fill="#8a8fa8" opacity=".55"/><g transform="translate(-11 -12)" stroke="#fff">${IC.lock.replace('width="22" height="22"', 'width="22" height="22"')}</g><text y="34" text-anchor="middle" font-size="10" font-weight="800" fill="#62678f">${esc(f.name)}</text></g>`; }).join('');
  const nodes = Object.keys(N).map(id => { const a = RPG_AREAS[id], [x, y] = N[id], v = !!r.visited[id], here = id === cur; return `<g class="av-node ${v ? 'v' : ''}" ${v ? `data-act="avTravel" data-a="${id}" role="button" tabindex="0"` : ''} transform="translate(${x} ${y})" aria-label="${esc(a.name)}${here ? ' (você está aqui)' : v ? '' : ' (ainda não visitado)'}"><circle r="22" fill="${v ? '#fff' : '#dfe2f3'}" stroke="${here ? '#e0343c' : v ? '#3553d1' : '#b8bccf'}" stroke-width="${here ? 5 : 3}"/><text y="7" text-anchor="middle" font-size="18" font-weight="800" fill="${v ? '#1c1f45' : '#9a9db4'}" font-family="M PLUS Rounded 1c, sans-serif">${v ? esc(a.jp.slice(-1)) : '?'}</text><text y="38" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1c1f45">${v ? esc(a.name) : '???'}</text>${here ? '<g transform="translate(0 -34)"><path d="M0 10l-7-10h14z" fill="#e0343c"/></g>' : ''}</g>`; }).join('');
  return `<svg class="av-region" viewBox="0 0 360 400" role="group" aria-label="Mapa do ${esc(RPG_REGION.name)}"><rect width="360" height="400" rx="20" fill="#cfe9b4"/><path d="M262 0q-22 90 0 170t-12 230h-28q24-120 2-230t10-170z" fill="#9fd0f0"/><path d="M0 0h170l-40 50-70 14L0 40z" fill="#b8bccf" opacity=".6"/><path d="M0 250q40 20 30 80t-30 70z" fill="#9fd0f0" opacity=".8"/>${lines}${fut}${nodes}</svg>`;
}
function rpgMapTab() {
  return `<div class="card" style="padding:8px">${rpgRegionSVG(AV ? AV.area : rpgState().area)}</div><p class="muted" style="margin:0;font-size:.85rem">Toque num lugar já visitado para viajar até ele. Regiões com cadeado chegam em próximas aventuras.</p>`;
}
function rpgWordsTab() {
  const r = rpgState(), keys = Object.keys(r.taught).filter(k => RW[k]).sort((a, b) => r.taught[b] - r.taught[a]);
  const pool = rpgPool();
  return `<div class="card av-stats"><div><b class="tabnum">${keys.length}</b><small>palavras da aventura</small></div><div><b class="tabnum">${pool.length}</b><small>no seu 言霊</small></div><div><b class="tabnum">${r.stats.wordsOk}</b><small>acertos</small></div></div>
    <p class="muted" style="margin:0;font-size:.85rem">O 言霊 (kotodama) usa só palavras que você já estudou no Nihongo Quest (Academia, Listening, Leitura, Mundo, Chat, Dicionário) e as que a aventura te ensinou. Quanto mais você estuda, mais variadas ficam as batalhas.</p>
    <div class="card list">${keys.map(k => { const w = RW[k]; return `<div class="av-shop-row"><span class="jp av-wl">${esc(w.jp)}</span><div class="grow" style="min-width:0"><b>${esc(w.pt)}</b><small class="muted">${esc(w.kana)} · ${esc(w.ro)}</small></div>${AUDIO.supported ? `<button class="icon-btn" data-act="avSay" data-text="${esc(w.say)}" aria-label="Ouvir ${esc(w.ro)}">${IC.sound}</button>` : ''}${rpgWordSaved(k) ? '<span class="chip dominada">✓</span>' : `<button class="btn btn-small btn-ghost" data-act="avSaveWord" data-k="${k}">＋ Caderno</button>`}</div>`; }).join('') || '<p class="muted" style="margin:0">Nenhuma palavra ainda.</p>'}</div>`;
}
function rpgOptTab() {
  const o = rpgState().opt;
  const tg = (k, t, d) => `<button class="av-opt ${o[k] ? 'on' : ''}" data-act="avOpt" data-k="${k}" aria-pressed="${!!o[k]}"><b>${t}</b><small class="muted">${d}</small><span class="av-sw" aria-hidden="true"></span></button>`;
  return `<div class="card list">${tg('ro', 'Romaji', 'Mostra a pronúncia em letras latinas.')}${tg('pt', 'Tradução', 'Mostra o português embaixo das falas.')}${tg('listen', 'Ouvir primeiro', 'Esconde o texto das falas até você tocar.')}</div>
    <p class="muted" style="margin:0;font-size:.85rem">A voz e a velocidade são as mesmas do resto do app (Perfil). Seu progresso na aventura é salvo automaticamente neste aparelho.</p>`;
}
function rpgOpenMenu(tab) { AVM.tab = tab || AVM.tab; openModal(rpgMenuHTML(), 'av-modal'); }
function rpgUseItem(id, inBattle) {
  const it = RPG_ITEMS[id], r = rpgState(), s = rpgStats(); if (!it || it.slot !== 'use' || !invN(id)) return null;
  if (it.heal && r.hero.hp >= s.maxHp && !inBattle) { toast('薬', 'Seu HP já está cheio.'); return null; }
  if (it.kiHeal && !it.heal && r.hero.ki >= s.maxKi && !inBattle) { toast('茶', 'Seu Ki já está cheio.'); return null; }
  const hp0 = r.hero.hp, ki0 = r.hero.ki;
  if (it.heal) r.hero.hp = Math.min(s.maxHp, r.hero.hp + it.heal);
  if (it.kiHeal) r.hero.ki = Math.min(s.maxKi, r.hero.ki + it.kiHeal);
  invAdd(id, -1); save();
  return { hp: r.hero.hp - hp0, ki: r.hero.ki - ki0 };
}

/* ---------- batalha ---------- */
let QZ = null; // desafio de palavras em andamento (batalha ou enigma)
function rpgBattle(key, obj) {
  if (!AV) return;
  if (AV.walking) { clearTimeout(AV.walking); AV.walking = null; }
  const E = RPG_ENEMIES[key]; if (!E) return;
  const r = rpgState(); r.stats.battles++;
  AV.bt = { key, E, obj, hp: E.hp, max: E.hp, st: {}, turn: 0, log: [], mode: 'cmd', guard: false, hint: 1, silence: 0, silenced: false, missed: [], firstTeach: !r.flags.battleTut, fx: null };
  sfx('tap'); rpgBattleRender();
  const tut = [];
  if (!r.flags.battleTut) {
    r.flags.battleTut = Date.now(); save();
    tut.push('ren|バトル だ！ いくぞ！|batoru da! iku zo!|Batalha! Vamos nessa!');
  }
  rpgLog(`${E.name} apareceu!`);
  if (tut.length) { rpgLog(rLine(tut[0]).pt, 'ren'); AV.bt.tut = true; }
  rpgBattleRender();
}
function rpgLog(txt, who) { const b = AV && AV.bt; if (!b) return; b.log.push({ txt, who }); if (b.log.length > 30) b.log.shift(); }
function rpgBattleHTML() {
  const b = AV.bt, E = b.E, r = rpgState(), s = rpgStats(), w = RW[E.w], o = r.opt;
  const status = [b.st.stun && '<span class="av-st">tonto</span>', b.st.trick && '<span class="av-st">ilusão</span>', b.st.charge && '<span class="av-st warn">concentrando!</span>', b.silence > 0 && '<span class="av-st warn">silêncio</span>'].filter(Boolean).join('');
  const log = b.log.slice(-3).map((l, i, a) => `<p class="${i === a.length - 1 ? 'new' : ''}">${l.who === 'ren' ? '<b>Ren:</b> ' : ''}${esc(l.txt)}</p>`).join('');
  let pane = '';
  if (b.mode === 'cmd') {
    const cmd = (act, k, label, dis, extra = '') => { const wd = RW[k]; return `<button class="av-cmd" data-act="${act}" ${extra} ${dis ? 'disabled' : ''}><span class="jp av-ck">${esc(wd.jp)}</span><span class="av-cl">${label}</span>${o.ro ? `<span class="ro">${esc(wd.ro)}</span>` : ''}</button>`; };
    const pool = rpgPool();
    const anySpell = Object.keys(RPG_SPELLS).some(k => r.spells[k]);
    pane = `<div class="av-cmds">${cmd('btAttack', 'kougeki', 'Atacar')}${cmd('btWord', 'kotodama', pool.length >= 2 ? 'Palavra' : 'Aprender')}${cmd('btMagicMenu', 'mahou', 'Magia', !anySpell || b.silence > 0)}${cmd('btDefend', 'bougyo', 'Defender')}${cmd('btItems', 'kaifuku', 'Itens')}${cmd('btFlee', 'nigeru', 'Fugir', !!E.boss)}</div>
      ${b.tut ? '<p class="av-tip">Dica: <b>言霊 (Palavra)</b> usa uma palavra que você já conhece. Acertar dá um golpe forte. Errar não tira vida: o golpe só sai mais fraco.</p>' : ''}`;
  } else if (b.mode === 'quiz') pane = rpgQuizHTML();
  else if (b.mode === 'magic') pane = `<div class="av-sub">${Object.keys(RPG_SPELLS).filter(k => r.spells[k]).map(k => { const sp = RPG_SPELLS[k], wd = RW[sp.w], can = r.hero.ki >= sp.ki; return `<button class="av-cmd" data-act="btCast" data-k="${k}" ${can ? '' : 'disabled'}><span class="jp av-ck">${esc(wd.jp)}</span><span class="av-cl">${esc(sp.pt)}</span><span class="ro">${o.ro ? esc(wd.ro) + ' · ' : ''}${sp.ki} Ki</span></button>`; }).join('')}<button class="av-cmd back" data-act="btBack"><span class="av-cl">Voltar</span></button></div>`;
  else if (b.mode === 'items') { const ids = Object.keys(r.inv).filter(k => RPG_ITEMS[k] && RPG_ITEMS[k].slot === 'use' && r.inv[k] > 0); pane = `<div class="av-sub">${ids.map(k => { const nm = rpgItemName(k); return `<button class="av-cmd" data-act="btUse" data-id="${k}"><span class="jp av-ck">${esc(nm.jp)}</span><span class="av-cl">${esc(nm.pt)} ×${r.inv[k]}</span><span class="ro">${esc(rpgItemBonus(RPG_ITEMS[k]))}</span></button>`; }).join('') || '<p class="muted" style="grid-column:1/-1;margin:0">Nenhum item para usar. Compre remédios na loja da Hana.</p>'}<button class="av-cmd back" data-act="btBack"><span class="av-cl">Voltar</span></button></div>`; }
  else if (b.mode === 'wait') pane = '<div class="av-wait" aria-hidden="true"><span></span><span></span><span></span></div>';
  else if (b.mode === 'end') pane = rpgBattleEndHTML();
  return `<div class="av-bt av-th-${RPG_AREAS[AV.area].theme}">
    <div class="av-foe ${b.fx === 'hit' ? 'hit' : ''} ${b.fx === 'crit' ? 'hit crit' : ''}">
      <div class="av-foe-art"><svg viewBox="0 0 100 100" role="img" aria-label="${esc(E.name)}">${rFoeArt(b.key)}</svg>${b.dmg ? `<span class="av-dmg ${b.dmgCls || ''}">${esc(b.dmg)}</span>` : ''}</div>
      <div class="av-foe-info"><b>${esc(E.name)}</b> ${w ? `<span class="jp">${esc(w.jp)}</span>${o.ro ? ` <span class="ro">${esc(w.ro)}</span>` : ''}` : ''}<div class="av-bar hp foe"><i style="width:${Math.round(b.hp / b.max * 100)}%"></i><span class="tabnum">${b.hp}/${b.max}</span></div><div class="av-sts">${status}${E.weak ? `<button class="link-btn av-info" data-act="btInfo">ver detalhes</button>` : ''}</div></div>
    </div>
    <div class="av-log" aria-live="polite">${log}</div>
    <div class="av-me ${b.hurt ? 'hurt' : ''}"><div class="av-me-h">${rPortrait('me', 30)}<b>${esc(rName())}</b><span class="muted tabnum">Nv ${s.lv}</span>${rqDone('m1') ? `<span class="av-ren">${rPortrait('ren', 26)}</span>` : ''}</div>
      <div class="av-bar hp"><i style="width:${Math.round(r.hero.hp / s.maxHp * 100)}%"></i><span class="tabnum">HP ${r.hero.hp}/${s.maxHp}</span></div><div class="av-bar ki"><i style="width:${Math.round(r.hero.ki / s.maxKi * 100)}%"></i><span class="tabnum">Ki ${r.hero.ki}/${s.maxKi}</span></div></div>
    <div class="av-pane2">${pane}</div></div>`;
}
function rpgBattleRender() { const el = $('#avBattle'); if (!el || !AV || !AV.bt) return; el.innerHTML = rpgBattleHTML(); el.hidden = false; }
function rpgDmg(atk, def, mult = 1) { return Math.max(1, Math.round((atk - def * 0.5) * mult * (0.85 + Math.random() * 0.3))); }
function rpgHitFoe(n, cls, txt) {
  const b = AV.bt; b.hp = Math.max(0, b.hp - n); b.dmg = '-' + n; b.dmgCls = cls || ''; b.fx = cls === 'crit' ? 'crit' : 'hit';
  if (txt) rpgLog(txt);
  sfx(cls === 'crit' ? 'level' : 'ok');
}
/* depois da ação do jogador: Ren ajuda às vezes, o inimigo responde (com uma pausa curta) */
function rpgAfterPlayer() {
  const b = AV.bt; b.turn++;
  if (b.hp <= 0) return rpgVictory();
  if (rqDone('m1') && b.turn % 3 === 0) rpgRenAct();
  if (b.hp <= 0) return rpgVictory();
  b.mode = 'wait'; rpgBattleRender();
  setTimeout(() => { if (!AV || !AV.bt) return; AV.bt.fx = null; AV.bt.dmg = ''; rpgEnemyTurn(); }, window.__NQ_FAST ? 0 : 650);
}
function rpgRenAct() {
  const b = AV.bt, r = rpgState(), s = rpgStats();
  if (r.hero.hp < s.maxHp * 0.4) { const h = 5 + s.lv * 2; r.hero.hp = Math.min(s.maxHp, r.hero.hp + h); rpgLog(`がんばれ！ (Força!) Ren te passa um onigiri: +${h} HP.`, 'ren'); }
  else { const d = 3 + s.lv * 2; b.hp = Math.max(0, b.hp - d); rpgLog(`いくぞ！ (Lá vou eu!) Ren ataca: ${d} de dano.`, 'ren'); }
}
function rpgEnemyTurn() {
  const b = AV.bt, E = b.E, r = rpgState(), s = rpgStats();
  if (b.silence > 0) b.silence--;
  const hit = (mult, txt) => { let d = rpgDmg(E.atk, s.def, mult); if (b.guard) d = Math.max(1, Math.round(d * 0.4)); r.hero.hp = Math.max(0, r.hero.hp - d); rpgLog(`${txt || E.name + ' ataca!'} Você perde ${d} HP.${b.guard ? ' (defendeu)' : ''}`); b.hurt = true; sfx('bad'); };
  if (b.st.stun) { b.st.stun = 0; rpgLog(`${E.name} está tonto e não consegue agir.`); }
  else if (b.st.charge) { b.st.charge = 0; hit(2.2, `${E.name} solta o golpe concentrado!`); }
  else {
    const ai = E.ai, rnd = Math.random();
    if (ai === 'quick') { hit(1); if (rnd < 0.3 && r.hero.hp > 0) hit(0.8, `${E.name} ataca de novo!`); }
    else if (ai === 'trick' && !b.st.trick && rnd < 0.35) { b.st.trick = 1; rpgLog(`${E.name} cria uma ilusão! O próximo golpe comum pode errar. Uma palavra (言霊) desfaz o truque.`); }
    else if (ai === 'charge' && rnd < 0.35) { b.st.charge = 1; rpgLog(`${E.name} está concentrando força… Defenda (防御) no próximo turno!`); }
    else if (ai === 'boss-kappa') {
      if (b.hp < b.max * 0.4 && !b.st.healed) { b.st.healed = 1; b.hp = Math.min(b.max, b.hp + 14); rpgLog('O kappa enche o prato da cabeça com água do rio e recupera 14 HP!'); }
      else if (rnd < 0.25) hit(1.4, 'O kappa cospe um jato de água!'); else hit(1);
    } else if (ai === 'boss-oni') {
      if (b.hp < b.max * 0.6 && !b.silenced) { b.silenced = true; b.silence = 3; rpgLog('O Oni ruge sem som… As magias foram caladas por 3 turnos! Só palavras (言霊) quebram o silêncio.'); }
      else if (b.turn % 4 === 3) { b.st.charge = 1; rpgLog('O Oni levanta o porrete bem alto… Defenda (防御)!'); }
      else hit(1);
    } else hit(1);
  }
  b.guard = false;
  if (r.hero.hp <= 0) return rpgDefeat();
  b.mode = 'cmd'; save(); rpgBattleRender();
  setTimeout(() => { if (AV && AV.bt) { AV.bt.hurt = false; } }, 400);
}
function rpgAttack() {
  const b = AV.bt, E = b.E, s = rpgStats();
  b.tut = false;
  if (b.st.trick) { b.st.trick = 0; rpgLog(`Você ataca… mas era só uma ilusão! ${E.name} escapou.`); return rpgAfterPlayer(); }
  if (E.ai === 'ghost' && Math.random() < 0.5) { rpgLog('Sua espada atravessa o kodama sem acertar. Palavras sempre acertam espíritos!'); return rpgAfterPlayer(); }
  if (E.eva && Math.random() * 100 < E.eva) { rpgLog(`${E.name} desviou!`); return rpgAfterPlayer(); }
  const crit = Math.random() * 100 < s.crit;
  const d = rpgDmg(s.atk, E.def, crit ? 1.6 : 1);
  rpgHitFoe(d, crit ? 'crit' : '', crit ? `Golpe crítico! ${d} de dano.` : `Você ataca: ${d} de dano.`);
  rpgAfterPlayer();
}
function rpgDefend() { const b = AV.bt, r = rpgState(), s = rpgStats(); b.tut = false; b.guard = true; r.hero.ki = Math.min(s.maxKi, r.hero.ki + 3); rpgLog('Você se defende (防御) e respira fundo: +3 Ki.'); rpgAfterPlayer(); }
function rpgCast(k) {
  const b = AV.bt, E = b.E, r = rpgState(), s = rpgStats(), sp = RPG_SPELLS[k];
  if (!sp || !r.spells[k] || r.hero.ki < sp.ki || b.silence > 0) return;
  r.hero.ki -= sp.ki; b.tut = false;
  const wd = RW[sp.w]; if (S.settings.sound !== false) rSay(wd.say);
  if (sp.heal) { const h = Math.round(s.maxHp * sp.heal); r.hero.hp = Math.min(s.maxHp, r.hero.hp + h); rpgLog(`${wd.jp}（${wd.ro}）! Você recupera ${h} HP.`); sfx('ok'); return rpgAfterPlayer(); }
  let mult = sp.pow, note = '';
  if (E.weak === sp.el) { mult *= 2; note = ' É super eficaz!'; } else if (E.resist === sp.el) { mult *= 0.5; note = ' Não teve muito efeito…'; }
  const d = Math.max(1, Math.round((s.atk * mult + 4) * (0.9 + Math.random() * 0.2) - E.def * 0.25));
  if (b.st.trick) b.st.trick = 0;
  rpgHitFoe(d, E.weak === sp.el ? 'crit' : '', `${wd.jp}（${wd.ro}）! ${d} de dano.${note}`);
  rpgAfterPlayer();
}
function rpgUseInBattle(id) { const res = rpgUseItem(id, true); if (!res) return; const nm = rpgItemName(id); AV.bt.tut = false; rpgLog(`Você usa ${nm.pt} (${nm.jp}).${res.hp ? ' +' + res.hp + ' HP.' : ''}${res.ki ? ' +' + res.ki + ' Ki.' : ''}`); sfx('ok'); rpgAfterPlayer(); }
function rpgFlee() {
  const b = AV.bt, r = rpgState(), s = rpgStats();
  if (b.E.boss) return;
  if (Math.random() * 100 < 60 + s.flee) { r.stats.flees++; rpgLog('Você fugiu (逃げる)!'); rpgEndBattle('flee'); return; }
  rpgLog('Não conseguiu fugir!'); rpgAfterPlayer();
}
/* 言霊: com poucas palavras conhecidas, Ren ensina uma (sem cobrar). Com palavras suficientes, vira desafio. */
function rpgWordAction() {
  const b = AV.bt; b.tut = false;
  const q = rpgMakeQuiz();
  if (!q) {
    const k = rpgNextToTeach();
    if (k) { rpgTeach(k); const w = RW[k]; b.mode = 'cmd'; b.teachCard = k; rpgLog(`Ren te ensina uma palavra: ${w.jp} (${w.ro}) = ${w.pt}. Agora ela pode virar 言霊!`, 'ren'); if (S.settings.sound !== false) rSay(w.say); }
    else rpgLog('Estude algumas palavras no Nihongo Quest para usar o 言霊.');
    rpgBattleRender(); return;
  }
  QZ = { q, ctx: 'battle', result: null, hint: b.hint > 0 && rqDone('m1') };
  b.mode = 'quiz'; rpgBattleRender();
  if (q.type === 'ouvir' || q.type === 'montar') setTimeout(() => rpgQuizPlay(), 150);
}
function rpgQuizPlay(slow) { if (!QZ) return; const q = QZ.q; const w = q.word || (q.words && q.words[0]); if (w) rSay(w.say, null, slow); }
function rpgQuizHTML() {
  if (!QZ) return '';
  const q = QZ.q, o = rpgState().opt, res = QZ.result;
  const w = q.word, snd = (t, l = 'Ouvir') => AUDIO.supported ? `<button class="w-a" data-act="avSay" data-text="${esc(t)}">${IC.sound}<span>${l}</span></button>` : '';
  const head = { ouvir: 'Ouça e escolha o significado', ler: 'O que significa?', inverso: 'Como se diz em japonês?', montar: 'Ouça e monte a palavra', pares: 'Ligue cada palavra ao significado' }[q.type];
  let body = '';
  if (q.type === 'pares') {
    body = `<div class="av-pairs"><div>${q.words.map((x, i) => `<button class="av-pk ${q.done.includes(i) ? 'ok' : ''} ${q.sel === i ? 'sel' : ''}" data-act="qzPairL" data-i="${i}" ${q.done.includes(i) ? 'disabled' : ''}><span class="jp">${esc(x.jp)}</span>${o.ro ? `<span class="ro">${esc(x.ro)}</span>` : ''}</button>`).join('')}</div><div>${q.right.map(i => `<button class="av-pk ${q.done.includes(i) ? 'ok' : ''}" data-act="qzPairR" data-i="${i}" ${q.done.includes(i) ? 'disabled' : ''}>${esc(q.words[i].pt)}</button>`).join('')}</div></div>`;
  } else if (q.type === 'montar') {
    body = `<div class="av-build"><div class="av-slots">${q.mora.map((m, i) => `<span class="av-slotk ${i < q.got.length ? 'on' : ''}">${i < q.got.length ? `<span class="jp">${esc(m)}</span>` : ''}</span>`).join('')}</div>
      <div class="av-tiles">${q.tiles.map((ti, j) => { const used = q.got.includes(ti) && q.got.indexOf(ti) < q.got.length; return `<button class="av-tile" data-act="qzTile" data-j="${j}" ${used || res ? 'disabled' : ''}><span class="jp">${esc(q.mora[ti])}</span><span class="ro">${esc(KANA.toRomaji(q.mora[ti]))}</span></button>`; }).join('')}</div>
      ${!res ? `<div class="w-acts" style="justify-content:center">${snd(w.say, 'Ouvir de novo')}<span class="muted" style="font-size:.8rem;align-self:center">${o.pt ? 'Significa: ' + esc(w.pt) : ''}</span></div>` : ''}</div>`;
  } else {
    const prompt = q.type === 'ouvir' ? `<div class="av-qp">${AUDIO.supported ? `<button class="av-play" data-act="qzPlay" aria-label="Ouvir a palavra">${IC.sound}</button><button class="w-a" data-act="qzPlay" data-slow="1"><span>Devagar</span></button>` : ''}${res ? `<span class="jp av-qjp">${esc(w.jp)}</span><span class="ro">${esc(w.ro)}</span>` : ''}</div>`
      : q.type === 'ler' ? `<div class="av-qp"><span class="jp av-qjp">${esc(w.jp)}</span>${o.ro || res ? `<span class="ro">${esc(w.ro)}</span>` : ''}${snd(w.say)}</div>`
        : `<div class="av-qp"><b class="av-qpt">${esc(w.pt)}</b></div>`;
    const opt = (x, j) => { const isAns = j === q.ans, bad = q.wrong.includes(j), hid = QZ.hidden && QZ.hidden.includes(j); const cls = res && isAns ? 'ok' : bad ? 'bad' : ''; return `<div class="av-opt-row"><button class="av-ans ${cls}" data-act="qzAns" data-j="${j}" ${res || bad || hid ? 'disabled' : ''} ${hid ? 'style="opacity:.25"' : ''}>${q.type === 'inverso' ? `<span class="jp">${esc(x.jp)}</span>${o.ro ? `<span class="ro">${esc(x.ro)}</span>` : ''}` : esc(x.pt)}</button>${q.type === 'inverso' && AUDIO.supported ? `<button class="icon-btn" data-act="avSay" data-text="${esc(x.say)}" aria-label="Ouvir esta opção">${IC.sound}</button>` : ''}</div>`; };
    body = prompt + `<div class="av-anss">${q.opts.map(opt).join('')}</div>`;
  }
  const fb = res ? `<div class="av-fb ${res === 'ok' ? 'ok' : 'x'}"><b>${res === 'ok' ? 'Isso! A palavra brilhou com força.' : 'Quase! A palavra saiu fraca.'}</b>${w ? `<span><span class="jp">${esc(w.jp)}</span> · ${esc(w.ro)} · ${esc(w.pt)}</span>${snd(w.say)}` : ''}</div>` : '';
  const hint = !res && QZ.hint && q.opts && !(QZ.hidden && QZ.hidden.length) ? `<button class="link-btn" data-act="qzHint">Pedir dica ao Ren</button>` : '';
  const go = res && QZ.ctx === 'battle' ? `<button class="btn btn-primary btn-block" data-act="qzGo">Continuar a batalha</button>` : '';
  return `<div class="av-quiz"><p class="av-qh">${esc(head)} ${hint}</p>${body}${fb}${go}</div>`;
}
function rpgQuizRefresh() { if (!AV) return; if (QZ && QZ.ctx === 'battle') rpgBattleRender(); else rpgDlgRender(); }
function rpgQuizAnswer(j) {
  if (!QZ || QZ.result) return; const q = QZ.q;
  if (j === q.ans) { QZ.result = q.wrong.length ? 'meh' : 'ok'; }
  else { q.wrong.push(j); sfx('bad'); if (q.wrong.length >= 1) QZ.result = 'x'; }
  rpgQuizResolve();
}
function rpgQuizResolve() {
  const q = QZ.q, ok = QZ.result === 'ok', w = q.word;
  if (w) rpgRecordWord(w.id, ok);
  if (ok) sfx('ok');
  if (w && S.settings.sound !== false) rSay(w.say);
  if (QZ.ctx === 'battle' && !ok && w && !AV.bt.missed.some(x => x.id === w.id)) AV.bt.missed.push(w);
  rpgQuizRefresh();
}
function rpgQuizGo() {
  if (!QZ || !AV || !AV.bt) return;
  const b = AV.bt, E = b.E, s = rpgStats(), r = rpgState(), q = QZ.q;
  let mult = 0;
  if (q.type === 'pares') mult = q.done.length === 3 ? (q.miss ? 1.6 : 2.1) : 0.6;
  else mult = QZ.result === 'ok' ? 1.9 : QZ.result === 'meh' ? 1.1 : 0.5;
  const good = mult >= 1.5;
  if (E.weak === 'kotoba' && good) mult *= 1.5;
  const d = Math.max(1, Math.round(s.atk * mult + (good ? s.lv : 0)));
  QZ = null; b.mode = 'cmd';
  if (good) {
    r.hero.ki = Math.min(s.maxKi, r.hero.ki + 2);
    b.st.trick = 0;
    rpgHitFoe(d, 'crit', `言霊! A palavra acerta em cheio: ${d} de dano. +2 Ki.${E.weak === 'kotoba' ? ' O Oni não suporta palavras!' : ''}`);
    if (E.ai === 'boss-kappa' && !b.st.stun) { b.st.stun = 1; rpgLog('O kappa faz uma reverência educada… e a água do prato cai! Ele ficou tonto.'); }
    if (b.silence > 0) { b.silence = 0; rpgLog('A palavra quebrou o silêncio! As magias voltaram.'); }
  } else rpgHitFoe(d, '', `A palavra saiu fraca, mas ainda acertou: ${d} de dano.`);
  rpgAfterPlayer();
}
function rpgQuizHint() { if (!QZ || !QZ.q.opts || !QZ.hint) return; const q = QZ.q; const wrong = q.opts.map((x, j) => j).filter(j => j !== q.ans && !q.wrong.includes(j)); QZ.hidden = [pick(wrong)]; QZ.hint = false; if (AV.bt) { AV.bt.hint = 0; } rpgLog('Ren: “Essa aqui não é!” (uma opção a menos)', 'ren'); rpgQuizRefresh(); }
function rpgQuizPair(side, i) {
  const q = QZ.q; if (QZ.result) return;
  if (side === 'L') { q.sel = i; return rpgQuizRefresh(); }
  if (q.sel === null || q.sel === undefined) return;
  if (q.sel === i) { q.done.push(i); sfx('ok'); rpgRecordWord(q.words[i].id, true); } else { q.miss++; sfx('bad'); rpgRecordWord(q.words[q.sel].id, false); if (AV.bt && !AV.bt.missed.some(x => x.id === q.words[q.sel].id)) AV.bt.missed.push(q.words[q.sel]); }
  q.sel = null;
  if (q.done.length === 3 || q.miss >= 3) QZ.result = q.done.length === 3 ? 'ok' : 'x';
  rpgQuizRefresh();
}
function rpgQuizTile(j) {
  const q = QZ.q; if (QZ.result) return; const ti = q.tiles[j];
  if (ti === q.got.length) { q.got.push(ti); sfx('tap'); if (q.got.length === q.mora.length) { QZ.result = q.miss ? 'meh' : 'ok'; return rpgQuizResolve(); } }
  else { q.miss++; sfx('bad'); if (q.miss >= 3) { QZ.result = 'x'; q.got = q.mora.map((m, i) => i); return rpgQuizResolve(); } }
  rpgQuizRefresh();
}
function rpgVictory() {
  const b = AV.bt, E = b.E, r = rpgState();
  r.stats.wins++; r.kills[b.key] = (r.kills[b.key] || 0) + 1;
  rqEvent('kill', b.key);
  const ups = rpgGainExp(E.exp);
  const got = [];
  (E.drop || []).forEach(([id, p]) => { if (Math.random() < p) { invAdd(id, 1); got.push({ item: id, n: 1 }); } });
  if (b.obj && b.obj.t === 'enemy') AV.beaten.add(b.obj.id);
  let bossRes = [];
  if (E.boss && b.obj) { r.flags[b.obj.flag] = Date.now(); bossRes = rqAutoComplete(); }
  b.result = { win: true, exp: E.exp, ups, got, bossRes };
  b.mode = 'end'; sfx('level'); if (E.boss) confetti();
  checkAchievements(); save(); rpgBattleRender();
}
function rpgDefeat() {
  const b = AV.bt, r = rpgState(); r.stats.losses++;
  b.result = { win: false }; b.mode = 'end'; save(); rpgBattleRender();
}
function rpgBattleEndHTML() {
  const b = AV.bt, res = b.result;
  const missed = b.missed.length ? `<div class="av-review"><span class="eyebrow">Para revisar</span>${b.missed.map(w => `<div class="av-rv"><span class="jp">${esc(w.jp)}</span><span class="ro">${esc(w.ro)}</span><b>${esc(w.pt)}</b>${AUDIO.supported ? `<button class="icon-btn" data-act="avSay" data-text="${esc(w.say)}" aria-label="Ouvir ${esc(w.ro)}">${IC.sound}</button>` : ''}</div>`).join('')}</div>` : '';
  if (!res.win) return `<div class="av-end"><h3>Você desmaiou…</h3><p style="margin:0">Ren te carrega de volta para ${rpgState().respawn === 'jinja' ? 'o santuário' : 'a pousada da Hana'}. Você não perde nada: HP e Ki voltam ao máximo.</p>${missed}<button class="btn btn-primary btn-block" data-act="btEnd">Continuar</button></div>`;
  return `<div class="av-end"><h3>Vitória!</h3>${rpgRewardHTML({ title: b.E.name + ' derrotado', exp: res.exp, ups: res.ups, got: res.got })}${missed}<button class="btn btn-primary btn-block" data-act="btEnd">Voltar ao mapa</button></div>`;
}
function rpgEndBattle(how) {
  const b = AV.bt; if (!b) return;
  const res = b.result || {}, r = rpgState();
  AV.bt = null; QZ = null;
  const el = $('#avBattle'); if (el) { el.hidden = true; el.innerHTML = ''; }
  if (how !== 'flee' && res.win === false) {
    rpgHealAll(); const sp = r.respawn === 'jinja' ? ['jinja', 4, 5] : ['vila', 6, 4];
    rpgEnterArea(sp[0], sp[1], sp[2]);
    return rpgTalk([{ s: r.respawn === 'jinja' ? 'kitsune|だいじょうぶ？ ゆっくり 休んでね。|daijoubu? yukkuri yasunde ne.|Tudo bem? Descanse um pouco.' : 'hana|だいじょうぶ？ ゆっくり 休んで ください。|daijoubu? yukkuri yasunde kudasai.|Tudo bem? Descanse bem.' }, { s: 'ren|つぎは かてるよ！|tsugi wa kateru yo!|Da próxima a gente vence!' }]);
  }
  rpgDraw();
  if (res.win && b.E.boss) {
    if (b.key === 'kappa') return rpgTalk([{ s: 'kappa|まいりました。どうぞ、お通り ください。|mairimashita. douzo, otoori kudasai.|Eu me rendo. Por favor, pode passar.' }, { teach: 'hashi' }, { n: 'O kappa faz mais uma reverência e mergulha no rio. A ponte para a Caverna do Eco está livre.' }].concat(rpgRewardBeats(res.bossRes || [])));
    if (b.key === 'oni') return rpgTalk([{ n: 'O ogro solta um grito, e mil luzinhas saem da caverna: são as palavras do vale voltando para casa.' }, { s: 'oni|……ごめんなさい。|…gomen nasai.|…Desculpa.' }, { n: 'Sem as palavras roubadas, o Oni encolhe até ficar do tamanho de uma criança. Ele só queria que alguém conversasse com ele.' }, { s: 'ren|じゃあ、ともだち に なろう！|jaa, tomodachi ni narou!|Então vamos ser amigos!' }, { s: 'hikari|ありがとう、{name}さん！ 谷に 言葉が もどりました。|arigatou, {name}-san! tani ni kotoba ga modorimashita.|Obrigada, {name}! As palavras voltaram ao vale.' }, { teach: 'hikari' }].concat(rpgRewardBeats(res.bossRes || [])).concat([{ reward: { title: 'Região 1 concluída: Vale Asahi', text: 'Você terminou a primeira região do Adventure Mode! A Montanha Kumo, a Costa Shio e o Castelo do Silêncio aparecem no mapa e chegam em próximas aventuras. Você pode continuar explorando, completar missões e treinar palavras.' } }]));
  }
}

/* ---------- tela de entrada (#aventura) ---------- */
function viewAdventure() {
  const r = rpgState(), s = rpgStats();
  const main = Object.keys(RPG_QUESTS).find(k => RPG_QUESTS[k].main && rqOn(k));
  const doneMain = Object.keys(RPG_QUESTS).filter(k => RPG_QUESTS[k].main && rqDone(k)).length, totalMain = Object.keys(RPG_QUESTS).filter(k => RPG_QUESTS[k].main).length;
  const pool = rpgPool().length;
  return `<div class="wrap av-root"><div class="page-title"><div><span class="jp">言葉の国の冒険</span><h1>Adventure Mode</h1></div></div>
    <div class="stack">
      <div class="card av-hub"><div class="av-hub-art" aria-hidden="true"><svg viewBox="0 0 120 80"><rect width="120" height="80" rx="14" fill="#cfe9b4"/><path d="M0 60q30-14 60 0t60 0v20H0z" fill="#a6d672"/><path d="M76 40l14-22 14 22z" fill="#8a8fa8"/><path d="M86 26l4-8 4 8z" fill="#fff"/><circle cx="20" cy="18" r="8" fill="#ffd877"/><g transform="translate(30 36) scale(1.2)">${rChibi(RPG_HERO_LOOK)}</g><g transform="translate(52 40)">${rChibi(RPG_REN_LOOK)}</g></svg></div>
        <div style="min-width:0"><span class="eyebrow">${r.started ? 'Sua aventura' : 'Novo · Aventura em japonês'}</span><h2 style="font-size:1.15rem">${r.started ? esc(rName()) + ' · Nível ' + s.lv : 'A Terra das Palavras te espera'}</h2>
        <p class="muted" style="margin:4px 0 0;font-size:.88rem">${r.started ? (r.flags.cleared ? 'Você salvou o Vale Asahi! Continue explorando e treinando.' : main ? 'Missão: ' + esc(RPG_QUESTS[main].title) + '.' : '') : 'Explore um mundo de fantasia japonesa, encontre tesouros, enfrente inimigos com o poder das palavras (言霊) e evolua com Ren ao seu lado.'}</p></div></div>
      <button class="btn btn-gold btn-block" data-act="avOpen">${r.started ? 'Continuar aventura' : 'Começar a aventura'}</button>
      ${r.started ? `<div class="card w-stats"><div><b class="tabnum">${doneMain}/${totalMain}</b><small>missões principais</small></div><div><b class="tabnum">${Object.keys(r.spots).length}/${Object.keys(RPG_SPOTS).length}</b><small>descobertas</small></div><div><b class="tabnum">${pool}</b><small>palavras no 言霊</small></div></div>
      <section class="section" style="padding-top:4px"><h2 style="font-size:1.05rem">${esc(RPG_REGION.name)} <span class="jp muted" style="font-size:.9rem">${esc(RPG_REGION.jp)}</span></h2><div class="card" style="padding:8px">${rpgRegionSVG(r.area)}</div></section>` : ''}
      <div class="card av-how"><b>Como funciona</b><ul><li>Toque no mapa para andar. Encoste em pessoas, baús e ✦ para interagir.</li><li>Nas batalhas, <b>言霊 (Palavra)</b> usa só palavras que você já estudou no app ou aprendeu na aventura. Errar nunca tira vida.</li><li>O nível do herói é só da aventura. O XP e as moedas do Nihongo Quest vêm apenas da primeira vez que você conclui missões, chefes, baús e descobertas.</li><li>A aventura não conta como lição nem mexe nas suas revisões. Palavras só vão para o Caderno se você salvar.</li></ul></div>
    </div></div>`;
}

/* ---------- ações ---------- */
Object.assign(ACT, {
  avOpen: () => rpgOpen(),
  gotoAdventure: () => go('aventura'),
  avClose: () => rpgClose(),
  avMove: el => { if (AV && AV.walking) { clearTimeout(AV.walking); AV.walking = null; } rpgStep(el.dataset.d); },
  avInteract: () => rpgInteractFacing(),
  avNext: () => { if (AV && AV.dlg) { if (AV.dlg.cur && AV.dlg.cur.quiz && (!QZ || !QZ.result)) return; rpgNextBeat(); } },
  avChoice: el => { const d = AV && AV.dlg; if (!d || !d.cur || !d.cur.choice) return; const c = d.cur.choice[+el.dataset.j]; if (!c) return; d.q.unshift(...c[1]); rpgNextBeat(); },
  avReveal: () => { if (AV && AV.dlg && AV.dlg.cur) { AV.dlg.cur.rev = true; rpgDlgRender(); } },
  avSayLine: el => { const b = AV && AV.dlg && AV.dlg.cur; if (b && b.s) { const L = rLine(b.s); rSay(L.say, L.sp, !!el.dataset.slow); } },
  avSay: el => rSay(el.dataset.text),
  avDict: el => { const w = RW[el.dataset.k]; if (w) dictOpenWord(w.jp); },
  avSaveWord: el => { if (rpgSaveWord(el.dataset.k)) toast('帳', 'No Caderno e na Revisão!'); else toast('帳', 'Essa palavra já está no seu Caderno.'); if (!$('#modal').hidden && $('#modal .av-sheet')) $('#modal .sheet').innerHTML = rpgMenuHTML(); else if (AV && AV.dlg) rpgDlgRender(); },
  avMenu: el => { if (rpgBusy() && $('#modal').hidden) return; AVM.tab = el.dataset.tab || AVM.tab; if (!$('#modal').hidden && $('#modal .av-sheet')) { $('#modal .sheet').innerHTML = rpgMenuHTML(); } else rpgOpenMenu(); },
  avEquip: el => { if (rpgEquip(el.dataset.id)) { sfx('ok'); $('#modal .sheet').innerHTML = rpgMenuHTML(); rpgDraw(); } },
  avUnequip: el => { rpgUnequip(el.dataset.slot); $('#modal .sheet').innerHTML = rpgMenuHTML(); rpgDraw(); },
  avUse: el => { const res = rpgUseItem(el.dataset.id); if (res) { sfx('ok'); toast('薬', (res.hp ? '+' + res.hp + ' HP ' : '') + (res.ki ? '+' + res.ki + ' Ki' : '')); } $('#modal .sheet').innerHTML = rpgMenuHTML(); rpgDraw(); },
  avOpt: el => { const o = rpgState().opt; o[el.dataset.k] = !o[el.dataset.k]; save(); $('#modal .sheet').innerHTML = rpgMenuHTML(); },
  avTravel: el => { const a = el.dataset.a; if (!AV) { const r = rpgState(); r.area = a; const e = rpgTravelPoint(a); r.x = e[0]; r.y = e[1]; save(); rpgOpen(); return; } closeModal(); const e = rpgTravelPoint(a); rpgEnterArea(a, e[0], e[1]); },
  avBuy: el => { if (rpgBuy(el.dataset.id)) toast('銭', 'Comprado: ' + RPG_ITEMS[el.dataset.id].pt + '!'); $('#modal .sheet').innerHTML = rpgShopHTML(el.dataset.who); rpgDraw(); },
  avTrade: () => { if (invN('hane') >= 3) { invAdd('hane', -3); invAdd('ocha', 1); sfx('coin'); toast('茶', 'Trocou 3 penas por 1 chá verde.'); } $('#modal .sheet').innerHTML = rpgShopHTML('tetsu'); },
  btAttack: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') { if (S.settings.sound !== false) rSay(RW.kougeki.say); rpgAttack(); } },
  btDefend: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') rpgDefend(); },
  btWord: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') rpgWordAction(); },
  btMagicMenu: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') { AV.bt.mode = 'magic'; rpgBattleRender(); } },
  btItems: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') { AV.bt.mode = 'items'; rpgBattleRender(); } },
  btBack: () => { if (AV && AV.bt) { AV.bt.mode = 'cmd'; rpgBattleRender(); } },
  btCast: el => { if (AV && AV.bt && AV.bt.mode === 'magic') rpgCast(el.dataset.k); },
  btUse: el => { if (AV && AV.bt && AV.bt.mode === 'items') rpgUseInBattle(el.dataset.id); },
  btFlee: () => { if (AV && AV.bt && AV.bt.mode === 'cmd') rpgFlee(); },
  btEnd: () => rpgEndBattle(),
  btInfo: () => { const E = AV && AV.bt && AV.bt.E; if (!E) return; const el = { hi: 'fogo (火)', mizu: 'água (水)', kaze: 'vento (風)', kotoba: 'palavras (言霊)' }; openModal(`<div class="stack av-sheet"><div class="av-shop-h"><svg width="72" height="72" viewBox="0 0 100 100" aria-hidden="true">${rFoeArt(AV.bt.key)}</svg><div><h2 style="font-size:1.15rem">${esc(E.name)}</h2>${RW[E.w] ? `<span class="jp">${esc(RW[E.w].jp)}</span> <span class="ro">${esc(RW[E.w].ro)}</span>` : ''}</div></div><p style="margin:0">${esc(E.desc)}</p>${E.weak ? `<p style="margin:0"><b>Fraqueza:</b> ${el[E.weak]}</p>` : ''}${E.resist ? `<p style="margin:0"><b>Resiste a:</b> ${el[E.resist]}</p>` : ''}<button class="btn btn-ghost btn-block" data-act="closeModal">Voltar à batalha</button></div>`, 'av-modal'); },
  qzAns: el => rpgQuizAnswer(+el.dataset.j),
  qzPlay: el => rpgQuizPlay(!!el.dataset.slow),
  qzGo: () => rpgQuizGo(),
  qzHint: () => rpgQuizHint(),
  qzPairL: el => { if (QZ) rpgQuizPair('L', +el.dataset.i); },
  qzPairR: el => { if (QZ) rpgQuizPair('R', +el.dataset.i); },
  qzTile: el => { if (QZ) rpgQuizTile(+el.dataset.j); }
});
function rpgTravelPoint(a) { const pts = { vila: [4, 5], campo: [4, 8], mori: [4, 5], jinja: [4, 7], kawa: [1, 8], dokutsu: [4, 9] }; return pts[a] || [4, 5]; }
/* toque no mapa: anda até o bloco tocado (ou até o lado dele, se houver alguém ou algo ali) */
document.addEventListener('click', e => {
  if (!AV || e.target.id !== 'avTap') return;
  const svg = $('#avMap'); if (!svg) return;
  const rc = svg.getBoundingClientRect(), x = Math.floor((e.clientX - rc.left) / rc.width * RPG_W), y = Math.floor((e.clientY - rc.top) / rc.height * RPG_H);
  rpgWalkTo(Math.max(0, Math.min(RPG_W - 1, x)), Math.max(0, Math.min(RPG_H - 1, y)));
});
document.addEventListener('keydown', e => {
  if (!AV || !$('#modal').hidden) return;
  if (AV.dlg && (e.key === 'Enter' || e.key === ' ') && !(AV.dlg.cur && (AV.dlg.cur.choice || AV.dlg.cur.quiz))) { e.preventDefault(); return rpgNextBeat(); }
  if (rpgBusy()) return;
  const k = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }[e.key];
  if (k) { e.preventDefault(); rpgStep(k); }
  else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rpgInteractFacing(); }
});

/* ---------- integrações ---------- */
VIEWS.push('aventura');
const _rpgRender = render;
render = function () {
  if (view === 'aventura' && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = viewAdventure();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'mundo'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _rpgRender();
};
const _rpgFlush = flushPending;
flushPending = function () { if (AV) return; _rpgFlush(); };
const _rpgOrigin = originOf;
originOf = function (it) { return it && it.lesson === RPG_LESSON ? 'Adventure Mode' : _rpgOrigin(it); };
/* Início: cartão da aventura acima de “Sua jornada”; Mundo: atalho no topo */
const _rpgHome = homeListenCard;
homeListenCard = function () {
  const r = rpgState(), s = rpgStats();
  return `<section class="section"><button class="card av-homecard" data-act="gotoAdventure"><span class="mod-ic big jp" style="font-size:1.3rem">冒</span><span class="grow" style="min-width:0;text-align:left"><span class="eyebrow">${r.started ? 'Adventure Mode · Nível ' + s.lv : 'Novo · Adventure Mode'}</span><b style="display:block;font-family:var(--f-display)">${r.started ? (r.flags.cleared ? 'Vale Asahi salvo! Continue explorando.' : 'Continue sua aventura no Vale Asahi') : 'Uma aventura de RPG usando o seu japonês'}</b></span><span class="av-go" aria-hidden="true">▶</span></button></section>` + _rpgHome();
};
const _rpgWorld = viewWorld;
viewWorld = function () { const h = _rpgWorld(); if (WUI.place) return h; return h.replace('<div class="stack">', `<div class="stack"><button class="card av-homecard" data-act="gotoAdventure"><span class="mod-ic big jp" style="font-size:1.3rem">冒</span><span class="grow" style="min-width:0;text-align:left"><span class="eyebrow">Adventure Mode</span><b style="display:block;font-family:var(--f-display)">Saia da cidade e viva uma aventura de fantasia</b></span><span class="av-go" aria-hidden="true">▶</span></button>`); };
ACHIEVEMENTS.push(
  { id: 'rpg_start', icon: '冒', name: 'Começo da jornada', desc: 'Receba sua primeira espada no Adventure Mode.', test: s => !!(s.rpg && s.rpg.quests && s.rpg.quests.m1 && s.rpg.quests.m1.st === 'done') },
  { id: 'rpg_kappa', icon: '橋', name: 'A ponte está livre', desc: 'Vença o kappa guardião da ponte no Adventure Mode.', test: s => !!(s.rpg && s.rpg.flags && s.rpg.flags.boss_kappa) },
  { id: 'rpg_oni', icon: '光', name: 'As palavras voltaram', desc: 'Vença o Oni do Silêncio e salve o Vale Asahi.', test: s => !!(s.rpg && s.rpg.flags && s.rpg.flags.boss_oni) },
  { id: 'rpg_explorer', icon: '✦', name: 'Olhos de explorador', desc: 'Encontre os 6 lugares especiais do Vale Asahi.', test: s => !!(s.rpg && s.rpg.spots && Object.keys(s.rpg.spots).length >= 6) }
);
