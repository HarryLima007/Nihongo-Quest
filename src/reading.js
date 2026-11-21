/* ==========================================================
   Nihongo Quest 9.0 — JAPANESE READING (motor e interface)
   - Academia de leitura: Hiragana → Katakana → Palavras → Kanji → Frases (READ_COURSE, reading-data.js).
   - Cada lição: aula em cartões (símbolo, romaji, áudio normal/devagar/repetir, associação visual,
     exemplos) → exercícios graduais → avaliação (80%). Abrir a aula não conclui nada.
   - Prova de cada etapa (também serve de nivelamento) libera a etapa seguinte. Nada aqui bloqueia
     outras áreas do app.
   - Exercícios só usam caracteres já estudados (lições aprovadas, etapas com prova aprovada ou a
     própria lição). Romaji: sempre / depois de tentar / oculto. Modo "ouvir primeiro".
   - Itens próprios: 'rd:<caractere>', 'rd:k:<kanji>', 'rd:w:<palavra>' (Caderno/Revisão/SRS de sempre).
     Palavras usam o item que o Dicionário já tem quando existe (sem duplicar).
   - Separação: nada aqui marca lição da Academia, avaliação ou conteúdo da Listening Academy como
     estudado (itemSource() devolve 'outro' para estes itens). XP: só na 1ª aprovação de cada lição e
     prova; práticas e revisões dão no máximo RD_XP_DAY por dia.
   ========================================================== */
const RD_CAT = { id: 'rd', title: 'Leitura Japonesa' };
const RD_PACK = {
  hira: { id: 'rd-hira', title: 'Hiragana', kind: 'rd', rd: true, cat: RD_CAT, index: 0, items: [] },
  kata: { id: 'rd-kata', title: 'Katakana', kind: 'rd', rd: true, cat: RD_CAT, index: 0, items: [] },
  kan: { id: 'rd-kanji', title: 'Kanji', kind: 'rd', rd: true, cat: RD_CAT, index: 0, items: [] },
  word: { id: 'rd-words', title: 'Palavras lidas', kind: 'rd', rd: true, cat: RD_CAT, index: 0, items: [] }
};
const RD_WORDS_PACK = RD_PACK.word;
const RD_XP_DAY = 20;
const RD_PASS = 80;
const RD_L = {}, RD_ST = {}, RD_CH = {}, RD_KJ = {}, RD_WD = {};
const RD_LESSONS = [];
const rdHira = s => String(s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const rdKata = s => String(s || '').replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const rdHasKanji = s => /[一-鿿々]/.test(s || '');
/* divide uma palavra em kana em "unidades" de leitura (きゃ, っ, ー, ファ contam como uma unidade) */
function rdUnits(s) { const out = []; for (const ch of String(s)) { if (/[ゃゅょぁぃぅぇぉャュョァィゥェォ]/.test(ch) && out.length) out[out.length - 1] += ch; else out.push(ch); } return out.filter(u => u.trim()); }

READ_COURSE.forEach((st, si) => {
  RD_ST[st.id] = st; st.index = si;
  st.lessons.forEach((L, i) => {
    L.stage = st; L.index = i; RD_L[L.id] = L; RD_LESSONS.push(L);
    if (!L.kind) L.kind = st.id === 'hira' || st.id === 'kata' ? 'chars' : st.id === 'pal' ? 'words' : st.id === 'kan' ? 'kanji' : 'sent';
    if (L.kind === 'story' || L.kind === 'manga') L.sub = L.kind, L.kind = 'sent';
    L.C = (L.chars || []).map(s => { const [ch, ro, mn, note] = s.split('|'); return { ch, ro, mn, note: note || '', sign: /^\(/.test(ro), L }; });
    L.C.forEach(c => {
      if (c.sign) return;
      c.id = 'rd:' + c.ch; RD_CH[c.ch] = c;
      const pack = st.id === 'kata' ? RD_PACK.kata : RD_PACK.hira;
      const it = { k: c.ch, jp: c.ch, ro: c.ro, pt: 'som “' + c.ro + '”', say: c.ch, group: 'escrita', note: c.mn, id: c.id, lesson: pack, rdType: 'char', script: st.id };
      if (!ITEM[it.id]) { ITEM[it.id] = it; pack.items.push(it); }
    });
    L.K = (L.kanji || []).concat(L.novo || []).map(s => { const [k, m, r, mn] = s.split('|'); return { k, m, r, mn, L, novo: (L.novo || []).includes(s) }; });
    L.K.forEach(x => {
      x.id = 'rd:k:' + x.k; RD_KJ[x.k] = x;
      const it = { k: x.k, jp: x.k, ro: '', pt: x.m, say: '', group: 'escrita', note: x.r, id: x.id, lesson: RD_PACK.kan, rdType: 'kanji' };
      if (!ITEM[it.id]) { ITEM[it.id] = it; RD_PACK.kan.items.push(it); }
    });
    L.W = (L.words || []).map(s => {
      const f = s.split('|');
      const w = f.length >= 4 && rdHasKanji(f[0])
        ? { jp: f[0].replace(/・/g, ''), seg: f[0].split('・'), kana: f[1].replace(/・/g, ''), kseg: f[1].split('・'), ro: f[2], pt: f[3], note: f[4] || '' }
        : { jp: f[0], kana: f[0].replace(/\s/g, ''), ro: f[1], pt: f[2], tag: f[3] || '', note: '' };
      w.L = L; w.special = !!(w.seg && w.seg.length === 1 && w.jp.length > 1);
      w.id = 'rd:w:' + w.jp.replace(/\s/g, '');
      if (!RD_WD[w.id]) RD_WD[w.id] = w;
      const it = { k: w.jp, jp: w.jp, ro: w.ro, pt: w.pt, say: w.kana, kanji: rdHasKanji(w.jp) ? w.jp : '', group: /^\(/.test(w.pt) ? 'expressao' : 'palavra', note: w.note || (w.seg && !w.special ? 'Leitura: ' + w.seg.map((g, j) => g + ' = ' + w.kseg[j]).join(' · ') : ''), id: w.id, lesson: RD_PACK.word, rdType: 'word' };
      if (!ITEM[it.id]) { ITEM[it.id] = it; RD_PACK.word.items.push(it); }
      return w;
    });
    L.S = (L.sentences || []).map(s => { const [jp, kana, ro, pt, parts, note] = s.split('|'); return { jp, kana, ro, pt, note: note || '', parts: parts.split('/').map(p => { const [t, r, g] = p.split('='); return { t, r, g }; }), L }; });
    L.P = (L.pairs || []).map(s => { const [cs, tip] = s.split('|'); return { chars: cs.split(' '), tip }; });
  });
});
const RD_PARTICLES = ['は', 'が', 'の', 'を', 'に', 'へ', 'も', 'か', 'と'];

/* ---------- estado ---------- */
function rdState() {
  if (!isPlainObj(S.read)) S.read = defaultRead();
  const r = S.read;
  ['lessons', 'exams', 'opened'].forEach(k => { if (!isPlainObj(r[k])) r[k] = {}; });
  if (!Array.isArray(r.log)) r.log = [];
  if (!['sempre', 'depois', 'oculto'].includes(r.ro)) r.ro = 'sempre';
  if (!RATES[r.speed]) r.speed = 'normal';
  if (!isPlainObj(r.xp)) r.xp = { d: '', n: 0 };
  return r;
}
const rdPassed = id => { const x = rdState().lessons[id]; return !!(x && x.passed); };
const rdExamPassed = sid => { const x = rdState().exams[sid]; return !!(x && x.passed); };
function rdStageUnlocked(st) { return st.index === 0 || rdExamPassed(READ_COURSE[st.index - 1].id); }
function rdLessonUnlocked(L) { return rdStageUnlocked(L.stage) && (L.index === 0 || rdPassed(L.stage.lessons[L.index - 1].id) || rdExamPassed(L.stage.id)); }
function rdStageProgress(st) { const d = st.lessons.filter(L => rdPassed(L.id)).length; return { done: d, total: st.lessons.length, exam: rdExamPassed(st.id) }; }
/* lições cujo conteúdo conta como estudado (lição aprovada ou etapa com prova aprovada) */
function rdStudied(L) { return rdPassed(L.id) || rdExamPassed(L.stage.id); }
/* caracteres conhecidos (para alternativas e para filtrar palavras): estudados + os da lição atual */
function rdKnownSet(cur) {
  const set = new Set();
  RD_LESSONS.forEach(L => { if (L === cur || rdStudied(L)) L.C.forEach(c => [...c.ch].forEach(x => set.add(x))); });
  if (cur && cur.stage.index >= 2) RD_LESSONS.forEach(L => { if (L.stage.index < 2) L.C.forEach(c => [...c.ch].forEach(x => set.add(x))); });
  return set;
}
function rdKnownKanji(cur) { const set = new Set(); RD_LESSONS.forEach(L => { if (L === cur || rdStudied(L)) L.K.forEach(x => set.add(x.k)); }); return set; }
function rdCanRead(text, cur) {
  const k = rdKnownSet(cur), kj = rdKnownKanji(cur);
  return [...String(text)].every(ch => /[\s。、！？「」…・〜ー]/.test(ch) && ch !== 'ー' || k.has(ch) || kj.has(ch));
}
function rdKnownChars(cur, script) {
  const out = [];
  RD_LESSONS.forEach(L => { if ((L === cur || rdStudied(L)) && (!script || L.stage.id === script)) L.C.forEach(c => { if (!c.sign) out.push(c); }); });
  return out;
}
function rdKnownWords(cur) { const out = []; RD_LESSONS.forEach(L => { if (L === cur || rdStudied(L)) L.W.forEach(w => out.push(w)); }); return out; }
function rdXP(n) {
  const r = rdState(), d = dayKey();
  if (r.xp.d !== d) r.xp = { d, n: 0 };
  const g = Math.max(0, Math.min(n, RD_XP_DAY - r.xp.n));
  r.xp.n += g; if (g) addXP(g, true);
  return g;
}

/* ---------- áudio ---------- */
const rdRate = () => RATES[rdState().speed] || RATES.normal;
function rdSay(text, slow, times = 1) {
  if (!text) return Promise.resolve(false);
  if (times <= 1) return speak(text, { rate: slow ? 0.6 : rdRate() });
  const my = ++AUDIO.token;
  return (async () => {
    for (let i = 0; i < times; i++) {
      if (AUDIO.token !== my) return false;
      AUDIO.token = my - 1;
      const ok = await speak(text, { rate: slow ? 0.6 : rdRate() });
      if (!ok || AUDIO.token !== my) return false;
      if (!window.__NQ_FAST) await new Promise(r => setTimeout(r, 450));
    }
    return true;
  })();
}
const rdAudioBtns = (text, big) => AUDIO.supported && text ? `<div class="rd-audio">
  <button class="btn ${big ? 'btn-primary' : 'btn-ghost'} btn-small" data-act="rdSay" data-text="${esc(text)}">${IC.sound.replace('<svg', '<svg width="18" height="18"')} Ouvir</button>
  <button class="btn btn-ghost btn-small" data-act="rdSaySlow" data-text="${esc(text)}">Devagar</button>
  <button class="btn btn-ghost btn-small" data-act="rdSay3" data-text="${esc(text)}">${IC.repeat.replace('<svg', '<svg width="16" height="16"')} 3×</button></div>` : '';
const rdSnd = (text, label) => AUDIO.supported && text ? `<button class="icon-btn" data-act="rdSay" data-text="${esc(text)}" aria-label="${esc(label || 'Ouvir')}">${IC.sound}</button>` : '';

/* ---------- palavras: Dicionário e Caderno (sem duplicar) ---------- */
function rdDictEntry(w) {
  if (typeof dictBuild !== 'function') return null;
  dictBuild();
  const list = DICT.byWord[rdHira(w.kana)] || [];
  return list.find(e => e.items.includes(w.id)) || list.find(e => (e.kanji || e.kana) === w.jp || e.kana === w.jp) || null;
}
function rdWordSaved(w) { const e = rdDictEntry(w); if (e && dictInNotebook(e)) return true; const r = S.items[w.id]; return !!(r && r.seen); }
function rdSaveWord(w) {
  if (rdWordSaved(w)) return false;
  const e = rdDictEntry(w);
  if (e && dictItemId(e) && ITEM[dictItemId(e)]) dictSave(e); else markSeen(w.id);
  save(); return true;
}
function rdOpenDict(w) { const e = rdDictEntry(w); if (e) dictOpen(e); else if (typeof dictOpenWord === 'function') dictOpenWord(w.jp); }

/* ==========================================================
   EXERCÍCIOS (gerados a partir dos dados, sempre com conteúdo já estudado)
   q = { t, prompt, big, bigCls, ro, say, hide (ouvir antes de ver), opts:[{t, sub, ok, kana}], ans, explain, itemId }
   ========================================================== */
function rdPickOpts(right, pool, key, n = 3) {
  const seen = new Set([right[key]]), out = [];
  for (const x of shuffle(pool)) { if (out.length >= n) break; if (!x || seen.has(x[key])) continue; seen.add(x[key]); out.push(x); }
  return out;
}
function rdSimilarOf(ch, known) { const g = READ_SIMILAR.find(s => s.includes(ch)); return g ? [...g].filter(x => x !== ch && known.has(x)) : []; }
function rdCharQ(c, type, L) {
  const script = c.L.stage.id;
  const same = c.L.C.filter(x => !x.sign && x !== c);
  const pool = same.concat(rdKnownChars(L, script).filter(x => x !== c && !same.includes(x)));
  const base = { itemId: c.id, explain: c.ch + ' = ' + c.ro + '. ' + c.mn + (c.note ? ' ' + c.note : '') };
  if (type === 'hear' && AUDIO.supported && !audioBlocked()) {
    const d = rdPickOpts(c, pool, 'ch');
    return { ...base, t: 'hear', prompt: 'Ouça e escolha o caractere', say: c.ch, grid: true, opts: shuffle([c, ...d]).map(x => ({ t: x.ch, kana: true, ok: x === c })), ans: c.ch + ' (' + c.ro + ')' };
  }
  if (type === 'sim') {
    const known = rdKnownSet(L); const sim = rdSimilarOf(c.ch[0], known).map(x => RD_CH[x]).filter(Boolean);
    const d = sim.concat(rdPickOpts(c, pool, 'ch', 3).filter(x => !sim.includes(x))).slice(0, 3);
    return { ...base, t: 'sim', prompt: 'Cuidado com os parecidos: qual é “' + c.ro + '”?', say: c.ch, grid: true, opts: shuffle([c, ...d]).map(x => ({ t: x.ch, kana: true, ok: x === c })), ans: c.ch, tag: 'parecidos' };
  }
  if (type === 'find' || type === 'hear') {
    const d = rdPickOpts(c, pool, 'ch');
    return { ...base, t: 'find', prompt: 'Qual caractere tem o som “' + c.ro + '”?', big: '“' + c.ro + '”', bigCls: 'pt', say: c.ch, grid: true, opts: shuffle([c, ...d]).map(x => ({ t: x.ch, kana: true, ok: x === c })), ans: c.ch };
  }
  // see: caractere → som
  const d = rdPickOpts(c, pool, 'ro');
  return { ...base, t: 'see', prompt: 'Qual é o som deste caractere?', big: c.ch, bigCls: 'huge', say: c.ch, noRo: true, grid: true, opts: shuffle([c, ...d]).map(x => ({ t: x.ro, ok: x === c })), ans: c.ro };
}
function rdWordQ(w, type, L) {
  const pool = L.W.filter(x => x !== w).concat(rdKnownWords(L).filter(x => x.L !== L && rdCanRead(x.jp, L)));
  const base = { itemId: w.id, explain: w.jp + (w.kana !== w.jp ? ' (' + w.kana + ')' : '') + ' = ' + w.ro + ' — ' + w.pt + '.' + (w.note ? ' ' + w.note : '') };
  if (type === 'inword') {
    const units = rdUnits(w.kana === w.jp ? w.jp : w.kana).filter(u => RD_CH[u]);
    const uniq = [...new Set(units)];
    if (w.kana === w.jp && uniq.length >= 2) {
      const target = pick(uniq), c = RD_CH[target];
      return { ...base, t: 'inword', prompt: 'Toque no caractere “' + c.ro + '” dentro da palavra', ctx: w.pt, say: w.kana, grid: uniq.length > 3, opts: uniq.map(u => ({ t: u, kana: true, ok: u === target })), ans: target + ' (' + c.ro + ')', itemId: c.id, wordShow: w.jp };
    }
    type = 'wread';
  }
  if (type === 'complete') {
    const units = rdUnits(w.jp);
    const idx = units.map((u, i) => RD_CH[u] ? i : -1).filter(i => i >= 0);
    if (w.kana === w.jp && units.length >= 2 && idx.length) {
      const i = pick(idx), c = RD_CH[units[i]];
      const known = rdKnownSet(L);
      const sim = rdSimilarOf(c.ch[0], known).map(x => RD_CH[x]).filter(Boolean);
      const d = sim.concat(rdPickOpts(c, rdKnownChars(L, c.L.stage.id).filter(x => x !== c), 'ch', 3)).filter((x, j, a) => a.indexOf(x) === j && x.ch !== c.ch).slice(0, 3);
      const shown = units.map((u, j) => j === i ? '＿' : u).join('');
      return { ...base, t: 'complete', prompt: 'Complete a palavra', big: shown, bigCls: 'word', ctx: w.pt, say: w.kana, noRo: true, grid: true, opts: shuffle([c, ...d]).map(x => ({ t: x.ch, kana: true, ok: x === c })), ans: w.jp + ' (' + w.ro + ')' };
    }
    type = 'wmean';
  }
  if (type === 'whear' && AUDIO.supported && !audioBlocked()) {
    const d = rdSimilarWords(w, pool);
    return { ...base, t: 'whear', prompt: 'Ouça e escolha a palavra escrita', say: w.kana, opts: shuffle([w, ...d]).map(x => ({ t: x.jp, jp: true, ok: x === w })), ans: w.jp };
  }
  if (type === 'wpt' || type === 'whear') {
    const d = rdPickOpts(w, pool, 'jp');
    return { ...base, t: 'wpt', prompt: 'Como se escreve em japonês?', big: w.pt, bigCls: 'pt', say: w.kana, opts: shuffle([w, ...d]).map(x => ({ t: x.jp, jp: true, ok: x === w })), ans: w.jp + ' (' + w.ro + ')' };
  }
  if (type === 'wread') {
    const d = rdSimilarWords(w, pool, 'ro');
    return { ...base, t: 'wread', prompt: 'Como se lê esta palavra?', big: w.jp, bigCls: 'word', say: w.kana, noRo: true, opts: shuffle([w, ...d]).map(x => ({ t: x.ro, ok: x === w })), ans: w.ro };
  }
  if (type === 'kword') {
    const d = rdSimilarWords(w, pool, 'kana');
    return { ...base, t: 'kword', prompt: 'Qual é a leitura desta palavra?', big: w.jp, bigCls: 'word', say: w.kana, noRo: true, opts: shuffle([w, ...d]).map(x => ({ t: x.kana, sub: x.ro, jp: true, ok: x === w })), ans: w.kana + ' (' + w.ro + ')' };
  }
  // wmean: palavra → significado
  const d = rdPickOpts(w, pool, 'pt');
  return { ...base, t: 'wmean', prompt: 'O que significa?', big: w.jp, bigCls: 'word', ro: w.ro, say: w.kana, opts: shuffle([w, ...d]).map(x => ({ t: x.pt, ok: x === w })), ans: w.pt };
}
/* alternativas parecidas (pares mínimos: きて/きって, びょういん/びよういん, おばさん/おばあさん) */
function rdSimilarWords(w, pool, key = 'jp') {
  const a = rdHira(w.kana);
  const score = x => { const b = rdHira(x.kana); let s = Math.abs(a.length - b.length); for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) s++; return s; };
  const cands = pool.filter(x => x !== w && x[key] !== w[key]).sort((x, y) => score(x) - score(y) || Math.random() - .5);
  const out = [], seen = new Set([w[key]]);
  for (const x of cands.slice(0, 3).concat(shuffle(cands.slice(3)))) { if (out.length >= 3) break; if (seen.has(x[key])) continue; seen.add(x[key]); out.push(x); }
  return out;
}
function rdKanjiQ(x, type, L) {
  const pool = L.K.filter(y => y !== x).concat(RD_LESSONS.filter(l => l !== L && rdStudied(l)).flatMap(l => l.K)).concat(RD_LESSONS.filter(l => l.stage.id === 'kan').flatMap(l => l.K));
  const base = { itemId: x.id, explain: x.k + ' = ' + x.m + '. ' + x.r };
  if (type === 'kpick') {
    const d = rdPickOpts(x, pool, 'k');
    return { ...base, t: 'kpick', prompt: 'Qual kanji significa “' + x.m + '”?', big: x.m, bigCls: 'pt', grid: true, opts: shuffle([x, ...d]).map(y => ({ t: y.k, kana: true, ok: y === x })), ans: x.k };
  }
  if (type === 'kread') {
    // leitura do kanji dentro de uma palavra real (contexto)
    const words = rdKnownWords(L).concat(L.W).filter(w => w.seg && !w.special && w.seg.includes(x.k) && rdCanRead(w.jp, L));
    if (words.length) {
      const w = pick(words), i = w.seg.indexOf(x.k), right = w.kseg[i];
      const all = [...new Set(RD_LESSONS.flatMap(l => l.W).filter(v => v.seg && !v.special).flatMap(v => v.seg.map((g, j) => g === x.k ? v.kseg[j] : null)).filter(Boolean))].filter(r => r !== right);
      const others = shuffle([...new Set(RD_LESSONS.flatMap(l => l.W).filter(v => v.seg && !v.special).flatMap(v => v.kseg.filter((g, j) => rdHasKanji(v.seg[j]))))]).filter(r => r !== right && !all.includes(r));
      const d = shuffle(all).slice(0, 3).concat(others).slice(0, 3);
      const shown = w.seg.map((g, j) => j === i ? '［' + g + '］' : g).join('');
      return { ...base, t: 'kread', prompt: 'Nesta palavra, como se lê o kanji destacado?', big: shown, bigCls: 'word', ctx: w.pt, say: w.kana, noRo: true, opts: shuffle([right, ...d]).map(r => ({ t: r, jp: true, ok: r === right })), ans: right + ' — ' + w.jp + ' = ' + w.kana + ' (' + w.ro + ')', explain: x.k + ' em ' + w.jp + ' se lê ' + right + '. ' + x.r };
    }
  }
  const d = rdPickOpts(x, pool, 'm');
  return { ...base, t: 'kmean', prompt: 'O que significa este kanji?', big: x.k, bigCls: 'huge', opts: shuffle([x, ...d]).map(y => ({ t: y.m, ok: y === x })), ans: x.m };
}
function rdTaughtParticles(L) {
  const set = new Set();
  RD_ST.fra.lessons.forEach(l => { if (l === L || rdStudied(l) || l.index <= L.index) l.S.forEach(s => s.parts.forEach(p => { if (RD_PARTICLES.includes(p.t)) set.add(p.t); })); });
  return [...set];
}
function rdSentQ(s, type, L) {
  const pool = L.S.filter(x => x !== s).concat(RD_LESSONS.filter(l => l !== L && l.stage.id === 'fra' && rdStudied(l)).flatMap(l => l.S));
  const base = { itemId: null, explain: s.jp + ' (' + s.ro + ') = ' + s.pt + (s.note ? ' ' + s.note : '') };
  const parts = s.parts.filter(p => p.t !== '。');
  if (type === 'spart') {
    const idx = parts.map((p, i) => RD_PARTICLES.includes(p.t) ? i : -1).filter(i => i >= 0);
    if (idx.length) {
      const i = pick(idx), right = parts[i].t;
      const taught = rdTaughtParticles(L).filter(p => p !== right);
      const d = shuffle(taught.length >= 2 ? taught : RD_PARTICLES.filter(p => p !== right)).slice(0, 3);
      const shown = s.parts.map(p => p === parts[i] ? '（　）' : p.t).join('');
      return { ...base, t: 'spart', prompt: 'Qual partícula completa a frase?', big: shown, bigCls: 'sent', ctx: s.pt, say: s.kana, noRo: true, grid: true, opts: shuffle([right, ...d]).map(p => ({ t: p, kana: true, ok: p === right })), ans: right + ' (' + parts[i].r + '): ' + parts[i].g };
    }
    type = 'sorder';
  }
  if (type === 'sorder') {
    const tiles = parts.map(p => p.t);
    if (tiles.length >= 3 && tiles.length <= 8) return { ...base, t: 'build', prompt: 'Monte a frase', ctx: s.pt, say: s.kana, tiles, bank: shuffle(tiles.map((t, i) => ({ t, i }))), ans: s.jp };
    type = 'smean';
  }
  if (type === 'shear' && AUDIO.supported && !audioBlocked() && pool.length >= 2) {
    const d = shuffle(pool).slice(0, 3);
    return { ...base, t: 'shear', prompt: 'Ouça e escolha a frase escrita', say: s.kana, opts: shuffle([s, ...d]).map(x => ({ t: x.jp, jp: true, ok: x === s })), ans: s.jp };
  }
  if (type === 'sword') {
    const cands = parts.filter(p => !RD_PARTICLES.includes(p.t) && p.t.length >= 1 && !/^[。、！？「」…]+$/.test(p.t));
    if (cands.length >= 2) {
      const p = pick(cands);
      const others = shuffle(RD_LESSONS.filter(l => l.stage.id === 'fra').flatMap(l => l.S.flatMap(x => x.parts)).filter(o => o.g !== p.g && !RD_PARTICLES.includes(o.t) && o.t !== '。')).map(o => o.g);
      const d = [...new Set(others)].slice(0, 3);
      return { ...base, t: 'sword', prompt: 'Nesta frase, o que significa “' + p.t + '”?', big: s.jp, bigCls: 'sent', ro: s.ro, say: s.kana, opts: shuffle([p.g, ...d]).map(g => ({ t: g, ok: g === p.g })), ans: p.g };
    }
  }
  const d = shuffle(pool).slice(0, 3);
  if (d.length < 2) d.push(...shuffle(RD_ST.fra.lessons.flatMap(l => l.S)).filter(x => x !== s && !d.includes(x)).slice(0, 3 - d.length));
  return { ...base, t: 'smean', prompt: 'O que a frase diz?', big: s.jp, bigCls: 'sent', ro: s.ro, say: s.kana, opts: shuffle([s, ...d]).map(x => ({ t: x.pt, ok: x === s })), ans: s.pt };
}
/* monta os exercícios de uma lição, do mais fácil ao mais difícil */
function rdBuildLesson(L, n = 10) {
  const qs = [];
  if (L.kind === 'chars') {
    const cs = L.C.filter(c => !c.sign), big = cs.length > 10;
    const ws = L.W.filter(w => rdCanRead(w.jp, L));
    if (cs.length) {
      shuffle(cs).slice(0, big ? 5 : 4).forEach(c => qs.push(rdCharQ(c, 'see', L)));
      shuffle(cs).slice(0, big ? 3 : 2).forEach(c => qs.push(rdCharQ(c, 'hear', L)));
      shuffle(cs).slice(0, 1).forEach(c => qs.push(rdCharQ(c, rdSimilarOf(c.ch[0], rdKnownSet(L)).length ? 'sim' : 'find', L)));
      shuffle(ws).slice(0, 1).forEach(w => qs.push(rdWordQ(w, 'inword', L)));
      shuffle(ws).slice(0, 1).forEach(w => qs.push(rdWordQ(w, 'complete', L)));
      shuffle(ws).slice(0, big ? 2 : 1).forEach(w => qs.push(rdWordQ(w, pick(['wmean', 'wread']), L)));
    } else {
      // lições de sinais (っ, vogais longas): pares mínimos pelo som e pela leitura
      shuffle(ws).slice(0, 4).forEach(w => qs.push(rdWordQ(w, 'whear', L)));
      shuffle(ws).slice(0, 3).forEach(w => qs.push(rdWordQ(w, 'wread', L)));
      shuffle(ws).slice(0, 3).forEach(w => qs.push(rdWordQ(w, 'wmean', L)));
    }
  } else if (L.kind === 'similar') {
    const known = rdKnownSet(L);
    L.P.forEach(p => { const c = RD_CH[pick(p.chars)]; if (c) qs.push({ ...rdCharQ(c, 'sim', L), explain: p.tip }); });
    shuffle(L.P).slice(0, 3).forEach(p => { const c = RD_CH[pick(p.chars)]; if (c) qs.push({ ...rdCharQ(c, 'see', L), explain: p.tip }); });
    void known;
  } else if (L.kind === 'words') {
    const ws = shuffle(L.W);
    ws.slice(0, 3).forEach(w => qs.push(rdWordQ(w, 'wmean', L)));
    ws.slice(3, 5).forEach(w => qs.push(rdWordQ(w, 'whear', L)));
    ws.slice(5, 7).forEach(w => qs.push(rdWordQ(w, 'wread', L)));
    ws.slice(7).concat(ws.slice(0, 2)).slice(0, 2).forEach(w => qs.push(rdWordQ(w, pick(['inword', 'wpt']), L)));
    qs.push(rdWordQ(ws[ws.length - 1], 'wmean', L));
  } else if (L.kind === 'kanji') {
    L.K.forEach(x => qs.push(rdKanjiQ(x, 'kmean', L)));
    shuffle(L.K).slice(0, 2).forEach(x => qs.push(rdKanjiQ(x, 'kpick', L)));
    L.K.forEach(x => qs.push(rdKanjiQ(x, 'kread', L)));
    shuffle(L.W.filter(w => rdHasKanji(w.jp) && w.jp.length > 1)).slice(0, 2).forEach(w => qs.push(rdWordQ(w, 'kword', L)));
    shuffle(L.W).slice(0, 2).forEach(w => qs.push(rdWordQ(w, 'wmean', L)));
  } else {
    const ss = shuffle(L.S);
    ss.forEach(s => qs.push(rdSentQ(s, 'smean', L)));
    ss.slice(0, 2).forEach(s => qs.push(rdSentQ(s, 'spart', L)));
    ss.slice(0, 2).forEach(s => qs.push(rdSentQ(s, 'sword', L)));
    ss.slice(2, 4).forEach(s => qs.push(rdSentQ(s, 'sorder', L)));
    ss.slice(0, 1).forEach(s => qs.push(rdSentQ(s, 'shear', L)));
  }
  return qs.filter(q => q && (q.opts ? q.opts.length >= 2 && q.opts.some(o => o.ok) : q.tiles)).slice(0, Math.max(n, 10));
}
function rdQFor(L, rnd) {
  if (L.kind === 'chars' && L.C.some(c => !c.sign) && rnd < .6) { const c = pick(L.C.filter(x => !x.sign)); return rdCharQ(c, pick(['see', 'hear', 'find']), L); }
  if (L.kind === 'similar') { const p = pick(L.P); return rdCharQ(RD_CH[pick(p.chars)], 'sim', L); }
  if (L.kind === 'kanji' && rnd < .5) return rdKanjiQ(pick(L.K), pick(['kmean', 'kread', 'kpick']), L);
  if (L.kind === 'sent') return rdSentQ(pick(L.S), pick(['smean', 'spart', 'sword']), L);
  const ws = L.W.filter(w => rdCanRead(w.jp, L)); if (!ws.length) return null;
  return rdWordQ(pick(ws), L.kind === 'kanji' ? pick(['kword', 'wmean']) : pick(['wmean', 'whear', 'wread']), L);
}
function rdBuildExam(st) {
  const qs = [];
  for (let i = 0; qs.length < 15 && i < 80; i++) { const L = st.lessons[i % st.lessons.length]; const q = rdQFor(L, Math.random()); if (q && q.opts && q.opts.length >= 2) qs.push(q); }
  return shuffle(qs).slice(0, 15);
}
/* revisão de leitura: itens de leitura já estudados, os que vencem primeiro, misturando visual e áudio */
function rdBuildReview() {
  const ids = Object.keys(S.items).filter(id => id.startsWith('rd:') && ITEM[id] && S.items[id].seen);
  const now = Date.now();
  ids.sort((a, b) => ((itemStatus(b) === 'revisar') - (itemStatus(a) === 'revisar')) || ((S.items[a].due || 0) - (S.items[b].due || 0)));
  const pickIds = ids.filter(id => (S.items[id].due || 0) <= now || itemStatus(id) === 'revisar').slice(0, 10);
  shuffle(ids).forEach(id => { if (pickIds.length < 10 && !pickIds.includes(id)) pickIds.push(id); });
  return shuffle(pickIds).map(id => rdQForItem(ITEM[id])).filter(q => q && q.opts && q.opts.length >= 2);
}
function rdQForItem(it) {
  if (it.rdType === 'char') { const c = RD_CH[it.k]; return c ? rdCharQ(c, pick(['see', 'hear', 'find', 'sim']), c.L) : null; }
  if (it.rdType === 'kanji') { const x = RD_KJ[it.k]; return x ? rdKanjiQ(x, pick(['kmean', 'kread', 'kpick']), x.L) : null; }
  const w = RD_WD[it.id]; if (!w) return null;
  return rdWordQ(w, rdHasKanji(w.jp) ? pick(['kword', 'wmean', 'whear']) : pick(['wmean', 'whear', 'wread', 'inword']), w.L);
}
/* "Ouvir e ler": palavras que você já ouviu em outras áreas (Listening Academy, Mundo, Chat, Academia)
   e que agora consegue ler — só palavras escritas com caracteres já estudados. Não muda nada nelas. */
function rdHeardPool() {
  const known = rdKnownSet(null);
  if (known.size < 10) return [];
  const out = [], seen = new Set();
  Object.keys(S.items).forEach(id => {
    const it = ITEM[id], r = S.items[id];
    if (!it || !r || !r.seen || id.startsWith('rd:') || it.rdType) return;
    const src = itemSource(it); if (!['listening', 'mundo', 'chat', 'academia', 'auditiva', 'dicionario'].includes(src)) return;
    const jp = String(it.jp || '').replace(/[！？。、!?〜~]/g, '');
    if (!jp || jp.length > 8 || !/^[぀-ヿ]+$/.test(jp) || ![...jp].every(ch => known.has(ch)) || seen.has(jp)) return;
    seen.add(jp); out.push({ jp, kana: it.say && /^[぀-ヿ]+$/.test(it.say) ? it.say : jp, ro: it.ro, pt: it.pt, id: it.id, src });
  });
  return out;
}
function rdBuildHeard() {
  const pool = rdHeardPool(); if (pool.length < 4) return [];
  return shuffle(pool).slice(0, 8).map(w => {
    const d = rdSimilarWords(w, pool);
    const hear = AUDIO.supported && !audioBlocked();
    return hear ? { t: 'whear', prompt: 'Você já ouviu esta palavra. Agora, qual é a escrita?', say: w.kana, opts: shuffle([w, ...d]).map(x => ({ t: x.jp, jp: true, ok: x === w })), ans: w.jp + ' (' + w.ro + ') — ' + w.pt, explain: 'Encontrada em: ' + ({ listening: 'Listening Academy', mundo: 'Living Japanese World', chat: 'Nihongo Chat', academia: 'Academia', auditiva: 'Academia Auditiva', dicionario: 'Dicionário' }[w.src] || '') + '.', itemId: null }
      : { t: 'wmean', prompt: 'Você já encontrou esta palavra. O que significa?', big: w.jp, bigCls: 'word', ro: w.ro, say: w.kana, opts: shuffle([w, ...rdPickOpts(w, pool, 'pt')]).map(x => ({ t: x.pt, ok: x === w })), ans: w.pt, explain: '', itemId: null };
  });
}

/* ==========================================================
   TELA PRINCIPAL (Academia → Leitura)
   ========================================================== */
const RDUI = { open: null };
function rdRoSeg() {
  const r = rdState();
  return `<div class="seg rd-roseg" role="group" aria-label="Romaji">${[['sempre', 'Sempre'], ['depois', 'Depois de tentar'], ['oculto', 'Oculto']].map(([v, t]) => `<button class="${r.ro === v ? 'on' : ''}" data-act="rdRo" data-v="${v}" aria-pressed="${r.ro === v}">${t}</button>`).join('')}</div>`;
}
function rdOptsHTML() {
  const r = rdState();
  return `<div class="rd-opts"><span class="eyebrow">Romaji</span>${rdRoSeg()}
    <button class="w-a ${r.listen ? 'on' : ''}" data-act="rdListen" aria-pressed="${!!r.listen}">${IC.headphones.replace('<svg', '<svg width="15" height="15"')} Ouvir primeiro</button>
    <div class="seg w-speed" role="group" aria-label="Velocidade da voz">${[['lenta', 'Lenta'], ['normal', 'Normal'], ['rapida', 'Rápida']].map(([v, t]) => `<button class="${r.speed === v ? 'on' : ''}" data-act="rdSpeed" data-v="${v}">${t}</button>`).join('')}</div></div>`;
}
function rdLevel() {
  const hp = rdStageProgress(RD_ST.hira), kp = rdStageProgress(RD_ST.kata), kj = rdStageProgress(RD_ST.kan), fr = rdStageProgress(RD_ST.fra);
  if (fr.exam) return ['読', 'Leitor iniciante completo', 'Você lê frases curtas com kana, kanji básicos e partículas.'];
  if (kj.exam || fr.done) return ['文', 'Leitura de frases', 'Já reconhece kanji básicos; agora, frases.'];
  if (rdExamPassed('pal') || kj.done) return ['漢', 'Primeiros kanji', 'Lê palavras em kana e está começando os kanji.'];
  if (kp.exam || rdStageProgress(RD_ST.pal).done) return ['語', 'Leitura de palavras', 'Reconhece hiragana e katakana.'];
  if (hp.exam || kp.done) return ['ア', 'Katakana', 'Hiragana dominado; aprendendo katakana.'];
  if (hp.done) return ['あ', 'Hiragana', hp.done + ' de ' + hp.total + ' lições de hiragana.'];
  return ['初', 'Começando do zero', 'Nenhum conhecimento prévio é necessário.'];
}
function viewReading() {
  const r = rdState();
  const lv = rdLevel();
  const nextL = RD_LESSONS.find(L => rdLessonUnlocked(L) && !rdPassed(L.id) && !rdExamPassed(L.stage.id));
  const nextExam = !nextL && READ_COURSE.find(st => rdStageUnlocked(st) && !rdExamPassed(st.id));
  const revIds = Object.keys(S.items).filter(id => id.startsWith('rd:') && ITEM[id] && S.items[id].seen);
  const toRev = revIds.filter(id => itemStatus(id) === 'revisar').length;
  const heard = rdHeardPool().length;
  const learnedH = RD_PACK.hira.items.filter(it => S.items[it.id] && S.items[it.id].seen).length, learnedK = RD_PACK.kata.items.filter(it => S.items[it.id] && S.items[it.id].seen).length, learnedJ = RD_PACK.kan.items.filter(it => S.items[it.id] && S.items[it.id].seen).length;
  const stageHTML = st => {
    const p = rdStageProgress(st), unlocked = rdStageUnlocked(st), open = RDUI.open === st.id || (RDUI.open == null && (nextL ? nextL.stage === st : nextExam === st));
    const lessons = st.lessons.map(L => {
      const u = rdLessonUnlocked(L), done = rdPassed(L.id), best = r.lessons[L.id] && r.lessons[L.id].best;
      return `<button class="rd-lrow ${done ? 'done' : ''} ${u ? '' : 'locked'}" data-act="rdLesson" data-id="${L.id}" ${u ? '' : 'aria-disabled="true"'}><span class="rd-lem jp">${esc(L.emblem)}</span><span class="grow"><b>${esc(L.title)}</b><small>${done ? 'Concluída · ' + best + '%' : u ? (r.opened[L.id] ? 'Em estudo' : 'Disponível') : 'Conclua a lição anterior'}</small></span><span class="rd-lst" aria-hidden="true">${done ? '✓' : u ? '›' : '鍵'}</span></button>`;
    }).join('');
    const ex = r.exams[st.id];
    return `<section class="rd-stage ${unlocked ? '' : 'locked'}" style="--sc:${st.color}" id="rd-st-${st.id}">
      <button class="rd-sthead" data-act="rdStage" data-id="${st.id}" aria-expanded="${open}"><span class="rd-stem jp">${esc(st.emblem)}</span><span class="grow"><small class="eyebrow">Etapa ${st.index + 1} · <span class="jp">${esc(st.jp)}</span></small><b>${esc(st.title)}</b><span class="rd-stbar"><i style="width:${Math.round((p.done + (p.exam ? 1 : 0)) / (p.total + 1) * 100)}%"></i></span></span><span class="rd-stn tabnum">${p.done}/${p.total}${p.exam ? ' ✓' : ''}</span></button>
      ${open ? `<div class="rd-stbody">${unlocked ? `<p class="muted rd-stdesc">${esc(st.desc)}</p>${lessons}
        <div class="rd-exam ${p.exam ? 'done' : ''}"><div class="grow"><b>Prova: ${esc(st.title)}</b><small>${p.exam ? 'Aprovada · ' + ex.best + '%' : p.done < p.total ? 'Também serve de nivelamento: se você já sabe, faça a prova e libere a próxima etapa.' : 'Conclua para liberar a próxima etapa.'}</small></div><button class="btn ${p.exam ? 'btn-ghost' : 'btn-gold'} btn-small" data-act="rdExam" data-id="${st.id}">${p.exam ? 'Refazer' : 'Fazer prova'}</button></div>` : `<p class="muted rd-stdesc">Liberada ao passar na prova de ${esc(READ_COURSE[st.index - 1].title)}. ${esc(st.desc)}</p>`}</div>` : ''}</section>`;
  };
  return `<div class="wrap">
    <div class="rd-hero"><div class="rd-hero-in"><span class="rd-hero-kana jp" aria-hidden="true">${esc(lv[0])}</span><div style="min-width:0"><span class="jp" style="color:#ffd877;letter-spacing:.14em;font-size:.8rem">よみかたアカデミー</span><h1 style="font-size:1.35rem">Leitura Japonesa</h1><p style="margin:2px 0 0;font-size:.9rem;opacity:.92">Do zero ao primeiro mangá: hiragana, katakana, palavras, kanji e frases. Sempre com áudio.</p></div></div>
      <div class="rd-level"><span class="eyebrow" style="color:rgba(255,255,255,.8)">Seu nível de leitura</span><b>${esc(lv[1])}</b><small>${esc(lv[2])}</small></div></div>
    <section class="section"><div class="kpis kpis4">
      <div class="kpi"><b>${learnedH}</b><span>hiragana</span></div><div class="kpi"><b>${learnedK}</b><span>katakana</span></div><div class="kpi"><b>${learnedJ}</b><span>kanji</span></div><div class="kpi"><b>${toRev}</b><span>a revisar</span></div></div>
      ${nextL ? `<button class="btn btn-primary btn-block" data-act="rdLesson" data-id="${nextL.id}">${r.opened[nextL.id] ? 'Continuar' : 'Começar'}: ${esc(nextL.title)}</button>` : nextExam ? `<button class="btn btn-gold btn-block" data-act="rdExam" data-id="${nextExam.id}">Fazer a prova: ${esc(nextExam.title)}</button>` : `<div class="card" style="box-shadow:none"><b>Curso de leitura concluído!</b> <span class="muted">Revise para manter tudo fresco.</span></div>`}
      <div class="mod-grid">
        <button class="mod-card" data-act="rdReview" ${revIds.length ? '' : 'disabled'}><span class="mod-ic">${IC.repeat}</span><span class="mod-t">Revisar leitura</span><span class="mod-s">${revIds.length ? 'Caracteres, kanji e palavras que você estudou, com áudio' : 'Conclua uma lição para revisar'}</span>${toRev ? `<span class="mod-m">${toRev} precisam de revisão</span>` : ''}</button>
        <button class="mod-card" data-act="rdHeard" ${heard >= 4 ? '' : 'disabled'}><span class="mod-ic">${IC.headphones}</span><span class="mod-t">Ouvir e ler</span><span class="mod-s">${heard >= 4 ? 'Palavras que você já ouviu na Listening Academy, no Mundo e no Chat, agora por escrito' : 'Libera quando você conseguir ler palavras que já ouviu'}</span>${heard >= 4 ? `<span class="mod-m">${heard} palavras</span>` : ''}</button>
        <button class="mod-card" data-act="nav" data-view="escrita"><span class="mod-ic jp" style="font-weight:800">字</span><span class="mod-t">Caderno de caracteres</span><span class="mod-s">O que você já lê, o que falta e o que revisar</span></button>
      </div></section>
    <section class="section"><div class="section-h"><h2>Opções de leitura</h2></div>${rdOptsHTML()}
      <p class="muted" style="margin:0;font-size:.82rem">Comece com o romaji “Sempre”. Quando estiver confortável, passe para “Depois de tentar” e, por fim, “Oculto”. “Ouvir primeiro” esconde a escrita até você escutar.</p></section>
    <section class="section"><h2>Etapas</h2>${READ_COURSE.map(stageHTML).join('')}</section>
    <p class="muted" style="margin:14px 2px 0;font-size:.82rem">A leitura é uma habilidade extra: ela nunca bloqueia a Academia, a Listening Academy, o Chat ou o Mundo.</p>
  </div>`;
}

/* ==========================================================
   PAINEL DE ESTUDO (aula → exercícios → resultado)
   ========================================================== */
let RV = null;
function rdOpenPane() { stopAudio(); closeModal(); $('#player').hidden = false; document.body.style.overflow = 'hidden'; }
function rdClose() { stopAudio(); RV = null; $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = ''; render(); setTimeout(flushPending, 200); }
function rdCards(L) {
  const cards = [{ k: 'intro' }];
  if (L.kind === 'chars') L.C.forEach(c => cards.push({ k: 'char', c }));
  if (L.kind === 'chars' && !L.C.length) L.W.forEach(w => cards.push({ k: 'word', w }));
  if (L.kind === 'similar') L.P.forEach(p => cards.push({ k: 'pair', p }));
  if (L.kind === 'words') L.W.forEach(w => cards.push({ k: 'word', w }));
  if (L.kind === 'kanji') L.K.forEach(x => cards.push({ k: 'kanji', x }));
  if (L.kind === 'sent') { L.K.forEach(x => cards.push({ k: 'kanji', x })); L.S.forEach(s => cards.push({ k: 'sent', s })); }
  if (L.kind === 'chars' && L.C.length) cards.push({ k: 'words' });
  return cards;
}
function rdStartLesson(id, toQuiz) {
  const L = RD_L[id]; if (!L) return;
  if (!rdLessonUnlocked(L)) { toast('鍵', 'Conclua antes a lição anterior (ou a prova desta etapa).'); return; }
  const r = rdState(); if (!r.opened[L.id]) { r.opened[L.id] = Date.now(); save(); }
  rdOpenPane();
  RV = { kind: 'lesson', L, cards: rdCards(L), ci: 0, heard: {}, rev: {}, mode: 'learn' };
  if (toQuiz) rdBeginQuiz(); else rdRender();
}
function rdStartQuiz(kind, title, qs, extra) {
  if (!qs.length) { toast('!', 'Ainda não há conteúdo suficiente para este treino.'); return; }
  rdOpenPane();
  RV = Object.assign({ kind, title, L: null, mode: 'quiz', qs, qi: 0, sel: null, answered: false, score: 0, wrong: [], heard: {}, rev: {} }, extra || {});
  rdRender();
}
function rdBeginQuiz() {
  const qs = rdBuildLesson(RV.L);
  Object.assign(RV, { mode: 'quiz', qs, qi: 0, sel: null, answered: false, score: 0, wrong: [], built: [] });
  rdRender();
}
function rdHeadHTML() {
  const L = RV.L, st = L ? L.stage : null;
  const title = L ? L.title : RV.title;
  const prog = RV.mode === 'learn' ? (RV.ci + 1) / RV.cards.length : RV.mode === 'quiz' ? RV.qi / RV.qs.length : 1;
  return `<header class="rd-head" style="--sc:${st ? st.color : '#3553d1'}"><button class="icon-btn" data-act="rdClose" aria-label="Sair">${IC.back}</button>
    <div class="grow" style="min-width:0"><small class="eyebrow">${esc(st ? st.title : 'Leitura Japonesa')} · ${RV.mode === 'learn' ? 'Aula' : RV.mode === 'quiz' ? (RV.kind === 'lesson' ? 'Avaliação' : RV.kind === 'exam' ? 'Prova' : 'Treino') : 'Resultado'}</small><b class="rd-htitle">${esc(title)}</b>
    <span class="rd-hbar"><i style="width:${Math.round(prog * 100)}%"></i></span></div></header>
    <div id="rdOpts">${rdOptsHTML()}</div>`;
}
function rdRoLine(ro, key) {
  if (!ro) return '';
  const m = rdState().ro;
  if (m === 'sempre' || RV.rev[key]) return `<span class="rd-ro">${esc(ro)}</span>`;
  return `<button class="rd-reveal" data-act="rdRev" data-k="${esc(key)}">Mostrar romaji</button>`;
}
function rdPtLine(pt, key) {
  return RV.rev['pt' + key] ? `<span class="rd-pt">${esc(pt)}</span>` : `<button class="rd-reveal" data-act="rdRev" data-k="pt${esc(key)}">Ver tradução</button>`;
}
function rdNeedListen(key, say) { return rdState().listen && say && AUDIO.supported && !audioBlocked() && !RV.heard[key]; }
const rdListenGate = (key, say) => `<button class="rd-gate" data-act="rdHear" data-k="${esc(key)}" data-text="${esc(say)}">${IC.headphones.replace('<svg', '<svg width="28" height="28"')}<b>Ouça primeiro</b><small>Toque para ouvir; depois a escrita aparece.</small></button>`;
function rdWordMini(w, key) {
  const saved = rdWordSaved(w);
  return `<div class="rd-wrow"><div class="grow"><span class="jp rd-wjp">${esc(w.jp)}</span>${w.kana !== w.jp && w.kana !== w.jp.replace(/\s/g, '') ? ` <span class="jp muted rd-wk">${esc(w.kana)}</span>` : ''} ${rdRoLine(w.ro, key)}<small class="rd-wpt">${esc(w.pt)}</small></div>${rdSnd(w.kana, 'Ouvir ' + w.ro)}<button class="icon-btn" data-act="rdDict" data-id="${esc(w.id)}" aria-label="Abrir no dicionário"><span class="jp" style="font-weight:800">辞</span></button>${saved ? '<span class="w-saved" aria-label="No Caderno">✓</span>' : `<button class="icon-btn" data-act="rdSave" data-id="${esc(w.id)}" aria-label="Salvar no Caderno e na Revisão">＋</button>`}</div>`;
}
function rdCardHTML(card, i) {
  const L = RV.L;
  if (card.k === 'intro') return `<div class="card rd-card"><span class="rd-cem jp">${esc(L.emblem)}</span><h2>${esc(L.title)}</h2>${L.intro.map(p => `<p>${esc(p)}</p>`).join('')}${L.tip ? `<div class="rd-tip"><b>Dica</b> ${esc(L.tip)}</div>` : ''}<p class="muted" style="margin:0;font-size:.85rem">${RV.cards.length - 1} cartões e depois uma avaliação curta. Você passa com ${RD_PASS}% de acertos.</p></div>`;
  if (card.k === 'char') {
    const c = card.c, key = 'c' + i;
    const ex = L.W.filter(w => rdCanRead(w.jp, L) && rdHira(w.kana).includes(rdHira(c.ch))).slice(0, 3);
    const twin = L.stage.id === 'kata' && !c.sign ? rdHira(c.ch) : '';
    const body = rdNeedListen(key, c.sign ? '' : c.ch) ? rdListenGate(key, c.ch) : `<div class="rd-big jp ${c.ch.length > 1 ? 'two' : ''}">${esc(c.ch)}</div>${c.sign ? `<span class="rd-ro">${esc(c.ro)}</span>` : rdRoLine(c.ro, key)}`;
    return `<div class="card rd-card"><div class="rd-charbox">${body}</div>${c.sign ? '' : rdAudioBtns(c.ch, true)}
      <div class="rd-sec"><span class="eyebrow">Associação visual</span><p>${esc(c.mn)}</p></div>
      ${c.note ? `<div class="rd-sec"><span class="eyebrow">Pronúncia</span><p>${esc(c.note)}</p></div>` : ''}
      ${twin && twin !== c.ch ? `<div class="rd-sec"><span class="eyebrow">Em hiragana</span><p><span class="jp" style="font-size:1.5rem;font-weight:800">${esc(twin)}</span> — mesmo som, outro desenho.</p></div>` : ''}
      ${ex.length ? `<div class="rd-sec"><span class="eyebrow">Exemplos</span>${ex.map((w, j) => rdWordMini(w, key + 'w' + j)).join('')}</div>` : ''}</div>`;
  }
  if (card.k === 'pair') {
    const p = card.p;
    return `<div class="card rd-card"><span class="eyebrow">Compare</span><div class="rd-pair">${p.chars.map((ch, j) => { const c = RD_CH[ch]; return `<button class="rd-pch" data-act="rdSay" data-text="${esc(ch)}"><span class="jp">${esc(ch)}</span>${rdState().ro === 'sempre' || RV.rev['p' + i] ? `<small>${esc(c ? c.ro : '')}</small>` : ''}</button>`; }).join('')}</div>
      ${rdState().ro !== 'sempre' && !RV.rev['p' + i] ? `<button class="rd-reveal" data-act="rdRev" data-k="p${i}">Mostrar romaji</button>` : ''}
      <div class="rd-tip"><b>Como diferenciar</b> ${esc(p.tip)}</div><p class="muted" style="margin:0;font-size:.85rem">Toque em cada caractere para ouvir.</p></div>`;
  }
  if (card.k === 'word') {
    const w = card.w, key = 'w' + i;
    const units = rdUnits(w.kana === w.jp ? w.jp.replace(/\s/g, '') : '');
    const body = rdNeedListen(key, w.kana) ? rdListenGate(key, w.kana) : `<div class="rd-big jp word">${esc(w.jp)}</div>${rdRoLine(w.ro, key)}`;
    const saved = rdWordSaved(w);
    return `<div class="card rd-card"><div class="rd-charbox">${body}</div>${rdAudioBtns(w.kana, true)}
      <div class="rd-sec"><span class="eyebrow">Tradução</span>${rdPtLine(w.pt, key)}</div>
      ${units.length > 1 ? `<div class="rd-sec"><span class="eyebrow">Caracteres usados</span><div class="rd-units">${units.map(u => { const c = RD_CH[u]; return `<button class="rd-unit" data-act="rdSay" data-text="${esc(u)}"><span class="jp">${esc(u)}</span><small>${esc(c ? c.ro : u === 'っ' || u === 'ッ' ? 'pausa' : u === 'ー' ? 'alonga' : '')}</small></button>`; }).join('')}</div></div>` : ''}
      ${w.tag ? `<div class="rd-sec"><span class="eyebrow">Uso do katakana</span><p>${esc({ lugar: 'Nome de lugar estrangeiro', nome: 'Nome de pessoa estrangeira', 'empréstimo': 'Palavra emprestada de outra língua', produto: 'Produto', som: 'Onomatopeia / efeito sonoro' }[w.tag] || w.tag)}</p></div>` : ''}
      <div class="rd-btns"><button class="btn btn-ghost btn-small" data-act="rdDict" data-id="${esc(w.id)}"><span class="jp" style="font-weight:800">辞</span> Dicionário</button>${saved ? '<span class="btn btn-ghost btn-small d-done" aria-disabled="true">✓ No Caderno</span>' : `<button class="btn btn-ghost btn-small" data-act="rdSave" data-id="${esc(w.id)}">＋ Caderno</button>`}</div></div>`;
  }
  if (card.k === 'kanji') {
    const x = card.x, ws = RD_LESSONS.flatMap(l => l.W).filter(w => w.jp.includes(x.k) && rdCanRead(w.jp, L)).slice(0, 6);
    const wsS = L.kind === 'sent' ? L.S.filter(s => s.jp.includes(x.k)).slice(0, 2) : [];
    return `<div class="card rd-card">${x.novo ? '<span class="chip k-new" style="align-self:flex-start">Kanji novo nesta lição</span>' : ''}<div class="rd-charbox"><div class="rd-big jp">${esc(x.k)}</div><span class="rd-mean">${esc(x.m)}</span></div>
      <div class="rd-sec"><span class="eyebrow">Associação visual</span><p>${esc(x.mn)}</p></div>
      <div class="rd-sec"><span class="eyebrow">Leituras (dependem da palavra)</span><p>${esc(x.r)}</p></div>
      ${ws.length ? `<div class="rd-sec"><span class="eyebrow">Em palavras reais</span>${ws.map(w => `<div class="rd-kw"><ruby class="jp">${w.seg && !w.special ? w.seg.map((g, j) => rdHasKanji(g) ? `${esc(g)}<rt>${esc(w.kseg[j])}</rt>` : esc(g)).join('') : `${esc(w.jp)}<rt>${esc(w.kana)}</rt>`}</ruby><span class="grow"><small>${esc(w.pt)}${w.special ? ' · leitura especial' : ''}</small>${rdRoLine(w.ro, 'k' + i + w.jp)}</span>${rdSnd(w.kana)}</div>`).join('')}</div>` : ''}
      ${wsS.length ? `<div class="rd-sec"><span class="eyebrow">Na frase</span>${wsS.map(s => `<p class="jp" style="font-weight:700;margin:0">${esc(s.jp)}</p>`).join('')}</div>` : ''}</div>`;
  }
  if (card.k === 'sent') {
    const s = card.s, key = 's' + i;
    const body = rdNeedListen(key, s.kana) ? rdListenGate(key, s.kana) : `<div class="rd-sent jp ${L.sub === 'manga' ? 'manga' : ''}">${esc(s.jp)}</div>${rdRoLine(s.ro, key)}`;
    return `<div class="card rd-card">${L.sub === 'manga' ? '<span class="eyebrow">Balão / efeito sonoro</span>' : ''}<div class="rd-charbox">${body}</div>${rdAudioBtns(s.kana, true)}
      <div class="rd-sec"><span class="eyebrow">Tradução</span>${rdPtLine(s.pt, key)}</div>
      <div class="rd-sec"><span class="eyebrow">Palavra por palavra</span><div class="rd-parts">${s.parts.filter(p => p.t !== '。').map(p => `<button class="rd-part ${RD_PARTICLES.includes(p.t) ? 'pt' : ''}" data-act="rdSay" data-text="${esc(p.t.replace(/[「」！？…。]/g, ''))}"><span class="jp">${esc(p.t)}</span>${rdState().ro === 'sempre' || RV.rev[key] ? `<small class="rd-pr">${esc(p.r)}</small>` : ''}<small>${esc(p.g)}</small></button>`).join('')}</div></div>
      ${s.note ? `<div class="rd-tip"><b>Atenção</b> ${esc(s.note)}</div>` : ''}</div>`;
  }
  if (card.k === 'words') {
    const ws = L.W.filter(w => rdCanRead(w.jp, L));
    return `<div class="card rd-card"><h2>Palavras para ler</h2><p class="muted" style="margin:0">Todas usam só caracteres que você já estudou. Tente ler antes de olhar o romaji.</p>${ws.map((w, j) => rdWordMini(w, 'ws' + j)).join('')}</div>`;
  }
  return '';
}
function rdQHTML() {
  const q = RV.qs[RV.qi], key = 'q' + RV.qi;
  const m = rdState().ro;
  const roShown = q.ro && !q.noRo && (m === 'sempre' || (RV.answered && m === 'depois') || RV.rev[key]);
  const canReveal = q.ro && !q.noRo && !roShown && m === 'depois' && !RV.answered;
  const gate = q.big && q.say && q.bigCls !== 'pt' && rdNeedListen(key, q.say);
  let h = `<div class="rd-q"><span class="mode-tag">${RV.kind === 'exam' ? 'Prova' : RV.kind === 'lesson' ? 'Avaliação' : 'Treino'}${q.tag ? ' · ' + esc(q.tag) : ''}</span><div class="q-prompt">${esc(q.prompt)}</div>`;
  if (q.t === 'hear' || q.t === 'whear' || q.t === 'shear' || q.t === 'sim') {
    h += `<div class="rd-listen"><button class="play-big" data-act="rdQSay" aria-label="Ouvir">${IC.play}<span>Ouvir</span></button><div class="audio-ctrls"><button class="btn btn-ghost btn-small" data-act="rdQSay">${IC.repeat.replace('<svg', '<svg width="18" height="18"')} Repetir</button><button class="btn btn-ghost btn-small" data-act="rdQSlow">Devagar</button></div></div>`;
  }
  if (q.wordShow) h += `<div class="q-card"><span class="rd-qword jp">${esc(q.wordShow)}</span>${q.ctx ? `<span class="ctx">${esc(q.ctx)}</span>` : ''}${rdSnd(q.say)}</div>`;
  else if (q.big) h += gate ? rdListenGate(key, q.say) : `<div class="q-card"><span class="rd-qbig ${q.bigCls || ''} ${q.bigCls === 'pt' ? '' : 'jp'}">${esc(q.big)}</span>${roShown ? `<span class="ro">${esc(q.ro)}</span>` : ''}${canReveal ? `<button class="rd-reveal" data-act="rdRev" data-k="${key}">Mostrar romaji</button>` : ''}${q.ctx ? `<span class="ctx">${esc(q.ctx)}</span>` : ''}${q.say && q.bigCls !== 'pt' && (q.t !== 'see' || RV.answered) && !['complete', 'spart'].includes(q.t) || (RV.answered && q.say) ? rdSnd(q.say) : ''}</div>`;
  else if (q.ctx && q.t !== 'build') h += `<div class="q-card"><span class="ctx">${esc(q.ctx)}</span></div>`;
  if (q.t === 'build') {
    h += `<div class="q-card"><span class="ctx">Significado</span><b style="font-size:1.15rem">${esc(q.ctx)}</b></div>`;
    h += `<div class="answer-line ${RV.built.length ? '' : 'empty'}">${RV.built.map(i => `<button class="tile" data-act="rdUnbuild" data-i="${i}" ${RV.answered ? 'disabled' : ''}><span class="t-jp">${esc(q.bank[i].t)}</span></button>`).join('')}</div><div class="bank">${q.bank.map((b, i) => `<button class="tile ${RV.built.includes(i) ? 'used' : ''}" data-act="rdBuild" data-i="${i}" ${RV.answered || RV.built.includes(i) ? 'disabled' : ''}><span class="t-jp">${esc(b.t)}</span></button>`).join('')}</div>`;
  } else {
    h += `<div class="opts ${q.grid ? 'grid' : ''}">${q.opts.map((o, i) => { let cls = 'opt'; if (RV.answered) { if (o.ok) cls += ' right'; else if (i === RV.sel) cls += ' wrong'; } else if (i === RV.sel) cls += ' sel'; return `<button class="${cls}" data-act="rdOpt" data-i="${i}" ${RV.answered ? 'disabled' : ''}>${o.kana ? `<span class="o-jp kana">${esc(o.t)}</span>` : o.jp ? `<span class="o-jp">${esc(o.t)}</span>` : `<span>${esc(o.t)}</span>`}${o.sub && (m === 'sempre' || RV.answered) ? `<span class="o-ro">${esc(o.sub)}</span>` : ''}</button>`; }).join('')}</div>`;
  }
  return h + '</div>';
}
function rdFootHTML() {
  if (RV.mode === 'learn') {
    const last = RV.ci >= RV.cards.length - 1;
    return `<div class="rd-nav">${RV.ci > 0 ? '<button class="btn btn-ghost" data-act="rdPrev">Anterior</button>' : '<span></span>'}${last ? '<button class="btn btn-gold" data-act="rdQuiz">Começar exercícios</button>' : '<button class="btn btn-primary" data-act="rdNext">Próximo</button>'}</div>`;
  }
  if (RV.mode === 'quiz') {
    const q = RV.qs[RV.qi];
    if (!RV.answered) return `<button class="btn btn-primary btn-block" data-act="rdCheck" ${(q.t === 'build' ? RV.built.length : RV.sel !== null) ? '' : 'disabled'}>Verificar</button>`;
    return `<div class="fb ${RV.lastOk ? 'ok' : 'bad'}">${mascot(RV.lastOk ? 'happy' : 'sad', 50, 'hop')}<div class="fb-text"><h3>${RV.lastOk ? pick(['Isso!', 'Muito bem!', 'Certo!', 'すごい！']) : 'Quase!'}</h3>${!RV.lastOk ? `<p class="answer">Resposta certa: ${esc(q.ans)}</p>` : ''}<p>${esc(q.explain || '')}</p></div></div><button class="btn ${RV.lastOk ? 'btn-ok' : 'btn-bad'} btn-block" data-act="rdNextQ">Continuar</button>`;
  }
  return '';
}
function rdResultHTML() {
  const pct = RV.pct, passed = RV.passed;
  const title = RV.kind === 'lesson' ? (passed ? 'Lição concluída!' : 'Quase lá!') : RV.kind === 'exam' ? (passed ? 'Prova aprovada!' : 'Ainda não foi desta vez') : 'Treino concluído';
  const needs = RV.kind === 'lesson' || RV.kind === 'exam';
  return `<div class="rd-result">${mascot(passed || !needs ? 'happy' : 'sad', 96)}<h2>${title}</h2>
    <div class="rd-score tabnum">${pct}%</div><p class="muted" style="margin:0">${RV.score} de ${RV.qs.length} certas${needs ? ' · mínimo ' + RD_PASS + '%' : ''}</p>
    ${RV.gain ? `<p class="rd-xp">+${RV.gain} XP</p>` : needs && passed ? '<p class="muted" style="margin:0">XP desta lição já foi ganho na primeira aprovação.</p>' : ''}
    ${RV.msg ? `<p>${esc(RV.msg)}</p>` : ''}
    ${RV.wrong.length ? `<div class="card rd-wrongs"><span class="eyebrow">Para rever</span>${RV.wrong.slice(0, 6).map(q => `<p><b>${esc(q.ans)}</b><br><span class="muted">${esc(q.explain || '')}</span></p>`).join('')}</div>` : ''}
    <div class="rd-btns">${RV.kind === 'lesson' ? `<button class="btn btn-ghost" data-act="rdRedoLesson">Rever a aula</button><button class="btn ${passed ? 'btn-ghost' : 'btn-gold'}" data-act="rdRetry">${passed ? 'Praticar de novo' : 'Tentar de novo'}</button>` : RV.kind === 'exam' ? `<button class="btn btn-ghost" data-act="rdRetry">Refazer</button>` : `<button class="btn btn-ghost" data-act="rdRetry">Mais um treino</button>`}
    ${RV.next ? `<button class="btn btn-primary" data-act="rdLesson" data-id="${RV.next.id}">Próxima: ${esc(RV.next.title)}</button>` : ''}<button class="btn ${RV.next ? 'btn-ghost' : 'btn-primary'}" data-act="rdClose">Voltar</button></div></div>`;
}
function rdRender() {
  if (!RV) return;
  let body = '';
  if (RV.mode === 'learn') body = rdCardHTML(RV.cards[RV.ci], RV.ci);
  else if (RV.mode === 'quiz') body = rdQHTML();
  else body = rdResultHTML();
  $('#player').innerHTML = `<div class="rd-pane">${rdHeadHTML()}<div class="rd-body" id="rdBody">${body}</div>${RV.mode === 'result' ? '' : `<footer class="rd-foot">${rdFootHTML()}</footer>`}</div>`;
  const b = $('#rdBody'); if (b) b.scrollTop = 0;
  // áudio automático (respeita a opção de som): ao abrir um cartão ou uma pergunta de ouvir
  if (S.settings.sound !== false && AUDIO.supported && !audioBlocked() && !RV._spoke) {
    RV._spoke = true;
    if (RV.mode === 'quiz' && !RV.answered) { const q = RV.qs[RV.qi]; if (['hear', 'whear', 'shear', 'sim'].includes(q.t)) setTimeout(() => rdSay(q.say), 150); }
    if (RV.mode === 'learn' && !rdState().listen) { const c = RV.cards[RV.ci]; const t = c.k === 'char' && !c.c.sign ? c.c.ch : c.k === 'word' ? c.w.kana : c.k === 'sent' ? c.s.kana : ''; if (t) setTimeout(() => rdSay(t), 150); }
  }
}
function rdCheck() {
  const q = RV.qs[RV.qi];
  let ok;
  if (q.t === 'build') ok = RV.built.map(i => q.bank[i].t).join('') === q.tiles.join('');
  else ok = !!(q.opts[RV.sel] && q.opts[RV.sel].ok);
  RV.answered = true; RV.lastOk = ok;
  if (ok) RV.score++; else RV.wrong.push(q);
  if (q.itemId && ITEM[q.itemId]) recordAnswer(q.itemId, ok, 'leitura', 'leitura');
  else recordAnswer(null, ok, 'leitura', 'leitura');
  sfx(ok ? 'ok' : 'bad');
  if (RV.kind !== 'lesson' && RV.kind !== 'exam' && ok) { const g = rdXP(1); RV.gain = (RV.gain || 0) + g; }
  rdRender();
}
function rdFinish() {
  const r = rdState();
  const pct = RV.qs.length ? Math.round(RV.score / RV.qs.length * 100) : 0;
  RV.pct = pct; RV.passed = pct >= RD_PASS; RV.mode = 'result'; RV.gain = RV.gain || 0; RV.msg = ''; RV.next = null;
  touchStudy();
  if (RV.kind === 'lesson') {
    const L = RV.L, rec = r.lessons[L.id] || (r.lessons[L.id] = { passed: false, best: 0, attempts: 0 });
    const first = RV.passed && !rec.passed;
    rec.attempts++; rec.best = Math.max(rec.best || 0, pct); rec.last = Date.now();
    if (RV.passed) {
      rec.passed = true; if (!rec.at) rec.at = Date.now();
      // conteúdo estudado entra no Caderno e na Revisão (caracteres e kanji sempre; palavras das etapas de leitura de palavras e kanji)
      L.C.forEach(c => { if (c.id) markSeen(c.id); });
      L.K.forEach(x => markSeen(x.id));
      if (L.kind === 'words' || L.kind === 'kanji') L.W.forEach(w => rdSaveWord(w));
      const nx = L.stage.lessons[L.index + 1]; RV.next = nx || null;
      if (!nx) RV.msg = 'Você concluiu todas as lições de ' + L.stage.title + '. Agora faça a prova da etapa para liberar a próxima.';
    } else RV.msg = 'Reveja a aula e tente de novo. Os cartões continuam disponíveis.';
    if (first) { RV.gain = 15 + (pct === 100 ? 5 : 0); addXP(RV.gain); addCoins(3); }
    r.log.unshift({ t: Date.now(), id: L.id, pct, ok: RV.passed }); r.log = r.log.slice(0, 40);
  } else if (RV.kind === 'exam') {
    const st = RV.stage, rec = r.exams[st.id] || (r.exams[st.id] = { passed: false, best: 0, attempts: 0 });
    const first = RV.passed && !rec.passed;
    rec.attempts++; rec.best = Math.max(rec.best || 0, pct); rec.last = Date.now();
    if (RV.passed) {
      rec.passed = true; if (!rec.at) rec.at = Date.now();
      // nivelamento: o conteúdo da etapa passa a contar como estudado
      st.lessons.forEach(L => { L.C.forEach(c => { if (c.id) markSeen(c.id); }); L.K.forEach(x => markSeen(x.id)); });
      const ns = READ_COURSE[st.index + 1];
      RV.msg = ns ? 'Etapa liberada: ' + ns.title + '!' : 'Você concluiu todo o curso de leitura!';
      RV.next = ns ? ns.lessons[0] : null;
    } else RV.msg = 'Revise as lições desta etapa e tente de novo quando quiser.';
    if (first) { RV.gain = 30; addXP(30); addCoins(10); }
    r.log.unshift({ t: Date.now(), id: 'prova:' + st.id, pct, ok: RV.passed }); r.log = r.log.slice(0, 40);
  } else {
    r.log.unshift({ t: Date.now(), id: RV.kind, pct, ok: true }); r.log = r.log.slice(0, 40);
  }
  if (RV.passed || !['lesson', 'exam'].includes(RV.kind)) confettiSafe();
  save(); checkAchievements();
  rdRender();
}
function confettiSafe() { try { if (RV && RV.passed && typeof confetti === 'function') confetti(); } catch (e) {} }

/* ---------- Caderno de caracteres (Caderno → Escrita) ---------- */
const RD_GOJUON = ['あいうえお', 'かきくけこ', 'さしすせそ', 'たちつてと', 'なにぬねの', 'はひふへほ', 'まみむめも', 'や ゆ よ', 'らりるれろ', 'わ   を', 'ん    ', 'がぎぐげご', 'ざじずぜぞ', 'だぢづでど', 'ばびぶべぼ', 'ぱぴぷぺぽ'];
function rdCharStatus(id) { const r = S.items[id]; if (!r || !r.seen) return 'nao'; return itemStatus(id); }
function rdGrid(script) {
  const rows = RD_GOJUON.map(r => script === 'kata' ? rdKata(r) : r);
  return `<div class="rd-grid">${rows.map(row => [...row.padEnd(5, ' ')].slice(0, 5).map(ch => { if (ch === ' ') return '<span class="rd-gc empty"></span>'; const c = RD_CH[ch]; if (!c) return '<span class="rd-gc empty"></span>'; const s = rdCharStatus(c.id); return `<button class="rd-gc s-${s}" data-act="rdCharInfo" data-ch="${esc(ch)}" aria-label="${esc(ch + ' ' + c.ro + ' — ' + (s === 'nao' ? 'não estudado' : STATUS_LABEL[s] || s))}"><span class="jp">${esc(ch)}</span><small>${esc(c.ro)}</small></button>`; }).join('')).join('')}</div>`;
}
function rdCharInfoHTML(ch) {
  const c = RD_CH[ch]; if (!c) return '';
  const s = rdCharStatus(c.id), r = S.items[c.id];
  const ex = RD_LESSONS.flatMap(l => l.W).filter(w => w.kana === w.jp && rdHira(w.jp).includes(rdHira(ch))).slice(0, 3);
  return `<div class="stack" style="align-items:center;text-align:center"><span class="rd-big jp" style="font-size:5rem">${esc(ch)}</span><b style="font-size:1.3rem">${esc(c.ro)}</b>
    <span class="chip ${s === 'nao' ? 'nova' : s}">${s === 'nao' ? 'Ainda não estudado' : STATUS_LABEL[s]}</span>${rdAudioBtns(ch, true)}
    <p style="margin:0">${esc(c.mn)}</p>${c.note ? `<p class="muted" style="margin:0">${esc(c.note)}</p>` : ''}
    ${ex.length ? `<div style="align-self:stretch;text-align:left">${ex.map(w => `<div class="rd-wrow"><div class="grow"><span class="jp rd-wjp">${esc(w.jp)}</span> <span class="ro">${esc(w.ro)}</span><small class="rd-wpt">${esc(w.pt)}</small></div>${rdSnd(w.kana)}</div>`).join('')}</div>` : ''}
    <p class="muted" style="margin:0;font-size:.82rem">Lição: ${esc(c.L.stage.title)} · ${esc(c.L.title)}${r && r.c + r.w ? ' · ' + r.c + ' acerto(s), ' + r.w + ' erro(s)' : ''}</p>
    <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`;
}
function viewWriting() {
  const r = rdState();
  const cnt = pack => pack.items.filter(it => S.items[it.id] && S.items[it.id].seen).length;
  const revIds = Object.keys(S.items).filter(id => id.startsWith('rd:') && ITEM[id] && itemStatus(id) === 'revisar');
  const kStudied = RD_PACK.kan.items.filter(it => S.items[it.id] && S.items[it.id].seen);
  // kanji encontrados em qualquer área do app (palavras vistas na Academia, Chat, Mundo, Dicionário...)
  const found = new Set();
  Object.keys(S.items).forEach(id => { const it = ITEM[id]; if (!it || !S.items[id].seen) return; [...String(it.kanji || '') + String(it.jp || '')].forEach(ch => { if (/[一-鿿]/.test(ch)) found.add(ch); }); });
  const kStudiedSet = new Set(kStudied.map(it => it.k));
  const foundOnly = [...found].filter(k => !kStudiedSet.has(k));
  const words = RD_PACK.word.items.filter(it => rdWordSaved(RD_WD[it.id]));
  const log = r.log.slice(0, 8).map(x => { const L = RD_L[x.id]; const name = L ? L.title : x.id.startsWith('prova:') ? 'Prova: ' + (RD_ST[x.id.slice(6)] || {}).title : x.id === 'review' ? 'Revisão de leitura' : x.id === 'heard' ? 'Ouvir e ler' : x.id; return `<div class="rd-log"><span class="grow">${esc(name)}</span><span class="chip ${x.ok ? 'dominada' : 'revisar'} tabnum">${x.pct}%</span><small class="muted">${new Date(x.t).toLocaleDateString('pt-BR')}</small></div>`; }).join('');
  return `<div class="wrap"><div class="page-title"><div><span class="jp">もじノート</span><h1>Caderno de caracteres</h1></div>${nbTabs('escrita')}</div>
    <section class="section"><div class="kpis kpis4"><div class="kpi"><b>${cnt(RD_PACK.hira)}</b><span>hiragana de ${RD_PACK.hira.items.length}</span></div><div class="kpi"><b>${cnt(RD_PACK.kata)}</b><span>katakana de ${RD_PACK.kata.items.length}</span></div><div class="kpi"><b>${kStudied.length}</b><span>kanji estudados</span></div><div class="kpi"><b>${revIds.length}</b><span>a revisar</span></div></div>
      <div class="rd-legend"><span class="rd-gc s-nao mini"></span>não estudado <span class="rd-gc s-vista mini"></span>estudado <span class="rd-gc s-dominada mini"></span>dominado <span class="rd-gc s-revisar mini"></span>revisar</div>
      ${revIds.length ? `<button class="btn btn-gold btn-block" data-act="rdReview">Revisar ${revIds.length} item(ns) agora</button>` : ''}</section>
    <section class="section"><div class="section-h"><h2>Hiragana</h2><button class="link-btn" data-act="rdGoLesson" data-st="hira">Estudar</button></div>${rdGrid('hira')}</section>
    <section class="section"><div class="section-h"><h2>Katakana</h2><button class="link-btn" data-act="rdGoLesson" data-st="kata">Estudar</button></div>${rdGrid('kata')}</section>
    <section class="section"><div class="section-h"><h2>Kanji estudados</h2><span class="muted" style="font-size:.8rem">${kStudied.length}/${RD_PACK.kan.items.length}</span></div>
      ${kStudied.length ? `<div class="rd-kgrid">${kStudied.map(it => { const s = itemStatus(it.id); return `<button class="rd-kc s-${s}" data-act="dictTry" data-q="${esc(it.k)}"><span class="jp">${esc(it.k)}</span><small>${esc(it.pt)}</small></button>`; }).join('')}</div>` : '<p class="muted" style="margin:0">Nenhum ainda. Eles chegam na etapa 4 (Introdução aos kanji).</p>'}</section>
    <section class="section"><div class="section-h"><h2>Kanji encontrados pelo app</h2><span class="muted" style="font-size:.8rem">${foundOnly.length}</span></div>
      <p class="muted" style="margin:0;font-size:.85rem">Kanji que apareceram em palavras que você já viu (Academia, Chat, Mundo, Dicionário). Encontrar não é estudar: toque para consultar no dicionário.</p>
      ${foundOnly.length ? `<div class="d-chips">${foundOnly.slice(0, 60).map(k => `<button class="d-chip" data-act="dictTry" data-q="${esc(k)}"><span class="jp">${esc(k)}</span></button>`).join('')}</div>` : ''}</section>
    <section class="section"><div class="section-h"><h2>Palavras lidas no Caderno</h2><span class="muted" style="font-size:.8rem">${words.length}</span></div>
      ${words.length ? `<div class="d-chips">${words.slice(0, 40).map(it => `<button class="d-chip" data-act="rdDict" data-id="${esc(it.id)}"><span class="jp">${esc(it.jp)}</span><small>${esc(it.pt)}</small></button>`).join('')}</div><button class="link-btn" style="align-self:flex-start" data-act="nav" data-view="caderno">Ver tudo no Caderno</button>` : '<p class="muted" style="margin:0">As palavras das lições de leitura (e as que você salvar com ＋) aparecem aqui e no Caderno, sem duplicar.</p>'}</section>
    ${log ? `<section class="section"><h2>Histórico de leitura</h2><div class="card">${log}</div></section>` : ''}
  </div>`;
}

/* ---------- ações ---------- */
Object.assign(ACT, {
  rdStage: el => { RDUI.open = RDUI.open === el.dataset.id ? '' : el.dataset.id; render(); },
  rdLesson: el => { const L = RD_L[el.dataset.id]; if (!L) return; if (RV) { RV = null; } rdStartLesson(L.id); },
  rdExam: el => { const st = RD_ST[el.dataset.id]; if (!st || !rdStageUnlocked(st)) { toast('鍵', 'Passe antes na prova da etapa anterior.'); return; } rdStartQuiz('exam', 'Prova: ' + st.title, rdBuildExam(st), { stage: st }); },
  rdReview: () => { closeModal(); rdStartQuiz('review', 'Revisão de leitura', rdBuildReview()); },
  rdHeard: () => rdStartQuiz('heard', 'Ouvir e ler', rdBuildHeard()),
  rdClose: () => rdClose(),
  rdNext: () => { if (RV && RV.ci < RV.cards.length - 1) { RV.ci++; RV._spoke = false; rdRender(); } },
  rdPrev: () => { if (RV && RV.ci > 0) { RV.ci--; rdRender(); } },
  rdQuiz: () => { if (RV && RV.L) rdBeginQuiz(); },
  rdRetry: () => { if (!RV) return; if (RV.kind === 'lesson') rdBeginQuiz(); else if (RV.kind === 'exam') ACT.rdExam({ dataset: { id: RV.stage.id } }); else if (RV.kind === 'review') ACT.rdReview(); else ACT.rdHeard(); },
  rdRedoLesson: () => { if (RV && RV.L) { Object.assign(RV, { mode: 'learn', ci: 0, cards: rdCards(RV.L) }); rdRender(); } },
  rdOpt: el => { if (!RV || RV.answered) return; RV.sel = +el.dataset.i; rdRender(); },
  rdBuild: el => { if (!RV || RV.answered) return; const i = +el.dataset.i; if (!RV.built.includes(i)) RV.built.push(i); rdRender(); },
  rdUnbuild: el => { if (!RV || RV.answered) return; RV.built = RV.built.filter(x => x !== +el.dataset.i); rdRender(); },
  rdCheck: () => { if (RV && !RV.answered) rdCheck(); },
  rdNextQ: () => { if (!RV) return; RV.qi++; RV.sel = null; RV.answered = false; RV.built = []; RV._spoke = false; if (RV.qi >= RV.qs.length) rdFinish(); else rdRender(); },
  rdQSay: () => { const q = RV && RV.qs[RV.qi]; if (q) rdSay(q.say); },
  rdQSlow: () => { const q = RV && RV.qs[RV.qi]; if (q) rdSay(q.say, true); },
  rdSay: el => rdSay(el.dataset.text),
  rdSaySlow: el => rdSay(el.dataset.text, true),
  rdSay3: el => rdSay(el.dataset.text, false, 3),
  rdHear: el => { if (!RV) return; RV.heard[el.dataset.k] = true; rdSay(el.dataset.text); rdRender(); },
  rdRev: el => { if (!RV) return; RV.rev[el.dataset.k] = true; rdRender(); },
  rdRo: el => { rdState().ro = el.dataset.v; save(); if (RV) rdRender(); else render(); },
  rdListen: () => { const r = rdState(); r.listen = !r.listen; save(); if (RV) rdRender(); else render(); },
  rdSpeed: el => { rdState().speed = el.dataset.v; save(); if (RV) { const o = $('#rdOpts'); if (o) o.innerHTML = rdOptsHTML(); } else render(); },
  rdSave: el => { const w = RD_WD[el.dataset.id]; if (!w) return; if (rdSaveWord(w)) toast('帳', 'No Caderno e na Revisão!'); else toast('帳', 'Essa palavra já estava no Caderno.'); if (RV) rdRender(); else render(); },
  rdDict: el => { const w = RD_WD[el.dataset.id]; if (w) rdOpenDict(w); },
  rdCharInfo: el => openModal(rdCharInfoHTML(el.dataset.ch), 'rd-sheet'),
  rdGoLesson: el => { RDUI.open = el.dataset.st; S.settings.academyMode = 'rd'; go('academia'); },
  gotoReading: () => { S.settings.academyMode = 'rd'; go('academia'); }
});

/* ---------- integrações com as telas existentes ---------- */
/* Academia: quarta aba "Leitura" ao lado de Academia, Listening e Treinos */
viewAcademyRoot = function () {
  const mode = ['aud', 'la', 'rd'].includes(S.settings.academyMode) ? S.settings.academyMode : 'trad';
  const b = (m, ic, txt) => `<button role="tab" aria-selected="${mode === m}" class="${mode === m ? 'on' : ''}" data-act="acadMode" data-mode="${m}">${ic} ${txt}</button>`;
  const sw = `<div class="wrap"><div class="mode-switch four" role="tablist">${b('trad', IC.academy, 'Academia')}${b('la', IC.headphones, 'Listening')}${b('rd', '<span class="jp rd-swic" aria-hidden="true">あ</span>', 'Leitura')}${b('aud', IC.wave, 'Treinos')}</div></div>`;
  if (mode === 'trad') return sw + viewAcademy();
  if (mode === 'la') return sw + viewLA();
  if (mode === 'rd') return sw + viewReading();
  return sw + ({ hub: viewAudioHub, expr: viewExpressions, det: viewDetective, dlg: viewDialogs }[aud.sub] || viewAudioHub)();
};
VIEWS.push('escrita', 'leitura');
const _rdRender = render;
render = function () {
  if (view === 'leitura') { S.settings.academyMode = 'rd'; view = 'academia'; try { history.replaceState(null, '', '#academia'); } catch (e) {} }
  if (view === 'escrita' && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = viewWriting();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'caderno'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _rdRender();
};
/* Caderno: terceira aba "Escrita" */
nbTabs = function (cur) {
  const t = (v, txt) => `<button class="${cur === v ? 'on' : ''}" data-act="nav" data-view="${v}" role="tab" aria-selected="${cur === v}">${txt}</button>`;
  return `<div class="seg d-tabs" role="tablist">${t('caderno', 'Caderno')}${t('dicionario', 'Dicionário')}${t('escrita', 'Escrita')}</div>`;
};
/* Revisão: exercícios gerados para itens de leitura (o mesmo SRS de sempre) */
const _rdGenItemQ = genItemQ;
genItemQ = function (it, forceType) {
  if (it && it.lesson && it.lesson.rd) {
    const q = rdQForItem(it);
    if (q && q.opts && q.t !== 'build') {
      const listen = ['hear', 'whear', 'sim'].includes(q.t);
      return { type: 'mc', itemId: it.id, prompt: listen ? (q.t === 'whear' ? 'Qual é a escrita desta palavra?' : 'Qual caractere tem este som?') : q.prompt, big: listen ? (it.rdType === 'char' ? '“' + it.ro + '”' : it.pt) : q.big || q.wordShow || '', bigClass: listen ? 'pt' : q.bigCls === 'huge' ? 'huge' : '', ro: q.ro || '', noRomaji: !!q.noRo || it.rdType === 'char', say: q.say || it.say, grid: !!q.grid, options: q.opts.map(o => ({ label: o.t, kana: !!o.kana, plain: !o.kana && !o.jp, correct: !!o.ok })), answerText: q.ans, explain: q.explain };
    }
    return { type: 'mc', itemId: it.id, prompt: 'O que significa?', big: it.jp, ro: it.ro, noRomaji: true, say: it.say, options: shuffle([it].concat(shuffle(it.lesson.items.filter(x => x !== it && x.pt !== it.pt)).slice(0, 3))).map(x => ({ label: x.pt, plain: true, correct: x === it })), answerText: it.pt, explain: it.note || '' };
  }
  return _rdGenItemQ(it, forceType);
};
const _rdSkill = skillOfItem;
skillOfItem = function (it) { return it && it.lesson && it.lesson.rd ? 'leitura' : _rdSkill(it); };
const _rdOrigin = originOf;
originOf = function (it) { return it && it.lesson && it.lesson.rd ? 'Leitura Japonesa · ' + it.lesson.title : _rdOrigin(it); };
if (typeof GROUP_LABEL !== 'undefined') GROUP_LABEL.escrita = 'Escrita';
const _rdReview = viewReview;
viewReview = function () {
  const h = _rdReview();
  const n = Object.keys(S.items).filter(id => id.startsWith('rd:') && ITEM[id] && S.items[id].seen).length;
  if (!n) return h;
  const card = `<section class="section"><div class="card rd-revcard"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big jp" style="font-size:1.3rem">読</span><div style="min-width:0"><h3 style="font-size:1.02rem">Revisão de leitura</h3><span class="muted" style="font-size:.85rem">${n} caracteres, kanji e palavras, com exercícios de ver e de ouvir.</span></div></div><button class="btn btn-ghost btn-small" data-act="rdReview">Revisar leitura</button></div></section>`;
  const i = h.lastIndexOf('</div>');
  return i > 0 ? h.slice(0, i) + card + h.slice(i) : h + card;
};
/* Living Japanese World: placas que você já consegue ler (nunca exigidas para explorar) */
const _rdPlace = viewWorldPlace;
viewWorldPlace = function (p) {
  const h = _rdPlace(p);
  const list = (READ_SIGNS[p.id] || []).map(jp => RD_LESSONS.flatMap(L => L.W.map(w => ({ w, L }))).find(x => x.w.jp === jp)).filter(Boolean);
  if (!list.length) return h;
  const signs = list.map(({ w, L }) => { const can = rdStudied(L) || rdCanRead(w.jp, null) && rdKnownSet(null).size > 40; return `<div class="rd-sign ${can ? 'can' : ''}"><span class="jp">${esc(w.jp)}</span><small>${can ? esc(w.ro) + ' · ' + esc(w.pt) : 'Ainda não estudada · ' + esc(w.pt)}</small>${rdSnd(w.kana, 'Ouvir ' + w.ro)}</div>`; }).join('');
  const nCan = list.filter(({ w, L }) => rdStudied(L) || rdCanRead(w.jp, null) && rdKnownSet(null).size > 40).length;
  return h + `<div class="wrap"><section class="section"><div class="section-h"><h2 style="font-size:1rem">Placas deste lugar</h2><span class="muted" style="font-size:.8rem">${nCan}/${list.length} você já lê</span></div><div class="rd-signs">${signs}</div>
    <p class="muted" style="margin:0;font-size:.8rem">Ler as placas é opcional: você explora o mundo normalmente. <button class="link-btn" style="padding:0" data-act="gotoReading">Aprender a ler</button></p></section></div>`;
};
/* celebrações esperam o fim da lição */
const _rdFlush = flushPending;
flushPending = function () { if (RV) return; _rdFlush(); };
const _rdHome = homeListenCard;
homeListenCard = function () {
  const n = Object.values(rdState().lessons).filter(x => x && x.passed).length;
  return `<section class="section"><div class="card rd-homecard"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big jp" style="font-size:1.3rem">あ</span><div style="min-width:0"><span class="eyebrow">Novo · Leitura Japonesa</span><h3 style="font-size:1.05rem">Aprenda a ler japonês</h3><span class="muted" style="font-size:.85rem">${n ? n + ' lição(ões) de leitura concluída(s). Continue de onde parou.' : 'Hiragana, katakana, palavras, kanji e frases, do zero e com áudio.'}</span></div></div><button class="btn btn-ghost btn-small" data-act="gotoReading">Começar a ler</button></div></section>` + _rdHome();
};
ACHIEVEMENTS.push(
  { id: 'read_first', icon: 'あ', name: 'Primeiras letras', desc: 'Conclua sua primeira lição de Leitura Japonesa.', test: s => !!(s.read && Object.values(s.read.lessons || {}).some(x => x && x.passed)) },
  { id: 'read_hira', icon: 'ひ', name: 'Leitor de hiragana', desc: 'Passe na prova de Hiragana da Leitura Japonesa.', test: s => !!(s.read && s.read.exams && s.read.exams.hira && s.read.exams.hira.passed) },
  { id: 'read_kata', icon: 'カ', name: 'Leitor de katakana', desc: 'Passe na prova de Katakana da Leitura Japonesa.', test: s => !!(s.read && s.read.exams && s.read.exams.kata && s.read.exams.kata.passed) },
  { id: 'read_kanji', icon: '漢', name: 'Primeiros kanji', desc: 'Passe na prova de Introdução aos kanji.', test: s => !!(s.read && s.read.exams && s.read.exams.kan && s.read.exams.kan.passed) }
);
/* novidade da 9.0: aviso único para quem já usava o app */
setTimeout(() => { try { const r = rdState(); if (S.profile.onboarded && !r.news) { r.news = Date.now(); save(); toast('読', 'Novo na 9.0: Leitura Japonesa! Academia → Leitura, do hiragana ao kanji.'); } } catch (e) {} }, 3400);
