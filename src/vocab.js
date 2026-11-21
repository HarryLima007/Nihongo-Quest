/* ==========================================================
   Nihongo Quest 12.0 — ACADEMIA DE VOCABULÁRIO (motor e interface)
   - Quinta aba da Academia (“Palavras”). Categorias (VOCAB_CATS, vocab-data.js) → lições de 5 a 10 palavras.
   - Ciclo de cada lição: A. Descobrir (cartão por palavra: escrita, kana, romaji, significado, classe, tema,
     áudio normal / devagar / 3×) → B. Escutar (ouvir sem ler, revelar depois) → C. Compreender (nota e
     exemplo no próprio cartão, só quando ajudam) → D. Praticar (exercícios variados) → E. Revisar
     (Revisão de sempre, com prioridade para o que você erra).
   - Regras: só cobra palavras já apresentadas (a lição atual + lições aprovadas). Alternativas também vêm só
     dessas palavras. Aprovação com VC_PASS%. XP só na primeira aprovação de cada lição e de cada avaliação
     de categoria; treinos de revisão dão no máximo VC_XP_DAY por dia (sem farming).
   - Itens: 'vc:<escrita>' (+ '・kana' quando há kanji) no S.items de sempre (Caderno, Revisão, SRS).
     A mesma palavra de outra área é unificada (nqSiblings, 10.0): nada duplica no Caderno nem na Revisão.
   - Separação: nada aqui marca lição da Academia, da Listening Academy ou da Leitura como feita
     (itemSource() devolve 'outro' para estes itens).
   ========================================================== */
const VC_CAT = { id: 'vc', title: 'Academia de Vocabulário' };
const VC_PASS = 80;
const VC_XP_DAY = 20;
const VC_C = {}, VC_L = {}, VC_W = {};
const VC_LESSONS = [];
const vcHasKanji = s => /[一-鿿々]/.test(s || '');
const vcHira = s => String(s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
VOCAB_CATS.forEach((c, ci) => {
  VC_C[c.id] = c; c.index = ci;
  c.lessons.forEach((L, i) => {
    Object.assign(L, { vcat: c, index: i, kind: 'vocab', vc: true, cat: VC_CAT, items: [] });
    VC_L[L.id] = L; VC_LESSONS.push(L);
    L.W = L.words.map(line => {
      const [write, kana, ro, pt, pos, note, ej, er, ep] = line.split('|');
      const jp = write || kana;
      const id = 'vc:' + (write && write !== kana ? write + '・' + kana : kana);
      const senses = pt.split(';').map(x => x.trim()).filter(Boolean);
      const ex = ej ? { jp: ej, ro: er || '', pt: ep || '', say: vcHasKanji(ej) ? NQK.r2k(er) : ej } : null;
      let it = ITEM[id];
      if (!it) {
        it = { k: id.slice(3), id, jp, write: write || '', kana, say: kana, ro, pt: senses.join(' / '), senses, pos: pos || '', tag: c.theme, note: note || '', ex, kanji: vcHasKanji(jp) ? jp : '', group: pos === 'expr' || pos === 'interj' ? 'expressao' : 'palavra', lesson: L };
        ITEM[id] = it; L.items.push(it);
      }
      VC_W[id] = it;
      return it;
    });
  });
});

/* ---------- estado ---------- */
function defaultVocab() { return { v: 1, lessons: {}, exams: {}, opened: {}, listen: false, log: [], xp: { d: '', n: 0 }, news: 0 }; }
function vcState() {
  if (!isPlainObj(S.vocab)) S.vocab = defaultVocab();
  const v = S.vocab;
  ['lessons', 'exams', 'opened'].forEach(k => { if (!isPlainObj(v[k])) v[k] = {}; });
  if (!Array.isArray(v.log)) v.log = [];
  if (!isPlainObj(v.xp)) v.xp = { d: '', n: 0 };
  return v;
}
const vcPassed = id => { const x = vcState().lessons[id]; return !!(x && x.passed); };
const vcExamPassed = cid => { const x = vcState().exams[cid]; return !!(x && x.passed); };
function vcLessonUnlocked(L) { return L.index === 0 || vcPassed(L.vcat.lessons[L.index - 1].id) || vcExamPassed(L.vcat.id); }
function vcExamUnlocked(c) { return c.lessons.every(L => vcPassed(L.id)); }
function vcCatProgress(c) { const d = c.lessons.filter(L => vcPassed(L.id)).length; return { done: d, total: c.lessons.length, exam: vcExamPassed(c.id), pct: Math.round((d + (vcExamPassed(c.id) ? 1 : 0)) / (c.lessons.length + 1) * 100) }; }
/* palavras já apresentadas (podem ser cobradas e servir de alternativa): lições aprovadas + a atual */
function vcKnown(cur) {
  const out = [], seen = new Set();
  const push = it => { if (!seen.has(it.id)) { seen.add(it.id); out.push(it); } };
  if (cur) cur.W.forEach(push);
  VC_LESSONS.forEach(L => { if (vcPassed(L.id) || vcExamPassed(L.vcat.id)) L.W.forEach(push); });
  return out;
}
function vcStats() {
  const total = new Set(VC_LESSONS.flatMap(L => L.W.map(w => w.id))).size;
  const learned = new Set(VC_LESSONS.filter(L => vcPassed(L.id)).flatMap(L => L.W.map(w => w.id))).size;
  return { total, learned, lessons: VC_LESSONS.filter(L => vcPassed(L.id)).length, cats: VOCAB_CATS.filter(c => vcExamPassed(c.id)).length };
}
function vcNext() {
  for (const c of VOCAB_CATS) { const L = c.lessons.find(L => !vcPassed(L.id) && vcLessonUnlocked(L)); if (L && c.lessons.some(x => vcPassed(x.id) || vcState().opened[x.id])) return L; }
  for (const c of VOCAB_CATS) { const L = c.lessons.find(L => !vcPassed(L.id) && vcLessonUnlocked(L)); if (L) return L; }
  return null;
}
function vcXP(n) {
  const v = vcState(), d = dayKey();
  if (v.xp.d !== d) v.xp = { d, n: 0 };
  const g = Math.max(0, Math.min(n, VC_XP_DAY - v.xp.n));
  v.xp.n += g; if (g) addXP(g, true);
  return g;
}
const vcPtMain = it => it.senses ? it.senses[0] : String(it.pt).split(/\s*[;/]\s*/)[0];

/* ---------- áudio ---------- */
function vcSay(text, slow, times = 1) {
  if (!text) return Promise.resolve(false);
  const opt = slow ? { rate: 0.6 } : {};
  if (times <= 1) return speak(text, opt);
  const my = ++AUDIO.token;
  return (async () => {
    for (let i = 0; i < times; i++) {
      if (AUDIO.token !== my) return false;
      AUDIO.token = my - 1;
      const ok = await speak(text, opt);
      if (!ok || AUDIO.token !== my) return false;
      if (!window.__NQ_FAST) await new Promise(r => setTimeout(r, 450));
    }
    return true;
  })();
}
const vcAudioBtns = (text, big) => AUDIO.supported && text ? `<div class="rd-audio">
  <button class="btn ${big ? 'btn-primary' : 'btn-ghost'} btn-small" data-act="vcSay" data-text="${esc(text)}">${IC.sound.replace('<svg', '<svg width="18" height="18"')} Ouvir</button>
  <button class="btn btn-ghost btn-small" data-act="vcSaySlow" data-text="${esc(text)}">Devagar</button>
  <button class="btn btn-ghost btn-small" data-act="vcSay3" data-text="${esc(text)}">${IC.repeat.replace('<svg', '<svg width="16" height="16"')} 3×</button></div>` : '';
const vcSnd = (text, label) => AUDIO.supported && text ? `<button class="icon-btn" data-act="vcSay" data-text="${esc(text)}" aria-label="${esc(label || 'Ouvir')}">${IC.sound}</button>` : '';

/* ==========================================================
   EXERCÍCIOS — q = { t, prompt, big, bigCls, ro, ctx, say, audio (ouvir sem ver), opts:[{t, sub, ok, jp}],
   ans, explain, itemId, skill } · t: ouvir, ouvirjp, ver, pt2jp, ler, frase, parecidos, montar, pares
   ========================================================== */
function vcKanaDist(a, b) {
  a = [...vcHira(a)]; b = [...vcHira(b)];
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
/* alternativas: mesma lição e mesma categoria primeiro; nunca o mesmo texto da resposta */
function vcPick(w, pool, key, n = 3, near) {
  const val = x => key === 'pt' ? vcPtMain(x) : x[key];
  const seen = new Set([val(w)]), out = [];
  let cands = shuffle(pool.filter(x => x !== w));
  if (near) cands.sort((a, b) => vcKanaDist(a.kana, w.kana) - vcKanaDist(b.kana, w.kana));
  else cands.sort((a, b) => (b.lesson === w.lesson) - (a.lesson === w.lesson) || (b.lesson.vcat === w.lesson.vcat) - (a.lesson.vcat === w.lesson.vcat));
  for (const x of cands) { if (out.length >= n) break; const v = val(x); if (!v || seen.has(v) || (key === 'pt' && x.kana === w.kana && x.jp === w.jp)) continue; seen.add(v); out.push(x); }
  return out;
}
const vcExplain = w => w.jp + (w.write && w.write !== w.kana ? ' (' + w.kana + ')' : '') + ' = ' + w.ro + ' — ' + w.pt + '.' + (w.note ? ' ' + w.note : '');
const vcOptJp = (x, w) => ({ t: x.jp, sub: x.ro, ok: x === w, jp: true });
const vcOptPt = (x, w) => ({ t: vcPtMain(x), ok: x === w });
function vcMora(kana) { const out = []; for (const ch of String(kana)) { if (/[ゃゅょぁぃぅぇぉャュョァィゥェォー]/.test(ch) && out.length) out[out.length - 1] += ch; else out.push(ch); } return out; }
function vcExampleHas(w) { return !!(w.ex && w.ex.jp && (w.ex.jp.includes(w.jp) || w.ex.jp.includes(w.kana))); }
function vcQ(w, type, pool) {
  const base = { itemId: w.id, explain: vcExplain(w), say: w.say, skill: 'vocabulario' };
  const ptPool = pool.filter(x => vcPtMain(x) !== vcPtMain(w));
  if (type === 'ouvir') return { ...base, t: 'ouvir', skill: 'audicao', audio: true, prompt: 'Ouça. O que significa?', opts: shuffle([w, ...vcPick(w, ptPool, 'pt')]).map(x => vcOptPt(x, w)), ans: vcPtMain(w) };
  if (type === 'ouvirjp') return { ...base, t: 'ouvirjp', skill: 'audicao', audio: true, prompt: 'Ouça. Qual palavra foi dita?', opts: shuffle([w, ...vcPick(w, pool, 'jp')]).map(x => vcOptJp(x, w)), ans: w.jp + ' (' + w.ro + ')' };
  if (type === 'parecidos') {
    const d = vcPick(w, pool, 'kana', 3, true);
    return { ...base, t: 'parecidos', skill: 'audicao', audio: true, tag: 'Sons parecidos', prompt: 'Preste atenção: qual destas você ouviu?', opts: shuffle([w, ...d]).map(x => ({ t: x.jp, sub: x.ro, ok: x === w, jp: true })), ans: w.jp + ' (' + w.ro + ')', explain: vcExplain(w) + (d[0] ? ' Compare: ' + d.map(x => x.jp + ' (' + x.ro + ')').join(', ') + '.' : '') };
  }
  if (type === 'pt2jp') return { ...base, t: 'pt2jp', prompt: 'Como se diz em japonês?', big: vcPtMain(w), bigCls: 'pt', opts: shuffle([w, ...vcPick(w, pool, 'jp')]).map(x => vcOptJp(x, w)), ans: w.jp + ' (' + w.ro + ')' };
  if (type === 'ler') return { ...base, t: 'ler', skill: 'leitura', prompt: 'Como se lê esta palavra?', big: w.jp, noRo: true, opts: shuffle([w, ...vcPick(w, pool, 'ro')]).map(x => ({ t: x.ro, ok: x === w })), ans: w.ro, grid: true };
  if (type === 'frase' && vcExampleHas(w)) {
    const key = w.ex.jp.includes(w.jp) ? w.jp : w.kana;
    return { ...base, t: 'frase', tag: 'Na frase', prompt: 'Qual palavra completa a frase?', big: w.ex.jp.replace(key, '＿＿'), bigCls: 'fill', ctx: w.ex.pt, sayAfter: w.ex.say, opts: shuffle([w, ...vcPick(w, pool, 'jp')]).map(x => vcOptJp(x, w)), ans: w.jp + ' (' + w.ro + ')', explain: w.ex.jp + ' (' + w.ex.ro + ') = ' + w.ex.pt };
  }
  if (type === 'montar') {
    const tiles = vcMora(w.kana);
    if (tiles.length >= 2 && tiles.length <= 5 && /^[ぁ-ゖァ-ヺー]+$/.test(w.kana)) {
      const extra = shuffle(pool.filter(x => x !== w).flatMap(x => vcMora(x.kana)).filter(m => !tiles.includes(m) && /^[ぁ-ゖァ-ヺー]+$/.test(m))).slice(0, 2);
      return { ...base, t: 'montar', tag: 'Monte a palavra', prompt: 'Ouça e monte a palavra em kana', ctx: vcPtMain(w), tiles, bank: shuffle(tiles.concat(extra)).map(t => ({ t })), ans: w.kana + ' (' + w.ro + ')' };
    }
  }
  // ver: japonês → português
  return { ...base, t: 'ver', prompt: 'O que significa?', big: w.jp, ro: w.ro, opts: shuffle([w, ...vcPick(w, ptPool, 'pt')]).map(x => vcOptPt(x, w)), ans: vcPtMain(w) };
}
function vcPairs(ws) {
  ws = ws.slice(0, 4);
  return { t: 'pares', prompt: 'Ligue cada palavra ao significado', items: ws.map(w => w.id), L: shuffle(ws.map((w, i) => ({ i, t: w.jp, sub: w.ro }))), R: shuffle(ws.map((w, i) => ({ i, t: vcPtMain(w) }))), ans: ws.map(w => w.jp + ' = ' + vcPtMain(w)).join(' · '), explain: '', skill: 'vocabulario' };
}
const VC_TYPES = ['ouvir', 'ver', 'ouvirjp', 'pt2jp', 'frase', 'ler', 'parecidos', 'montar'];
function vcBuild(words, pool, n) {
  const ws = shuffle(words).slice(0, n);
  let types = shuffle(VC_TYPES);
  if (!AUDIO.supported) types = types.filter(t => !['ouvir', 'ouvirjp', 'parecidos', 'montar'].includes(t));
  const qs = ws.map((w, i) => {
    let t = types[i % types.length];
    if (t === 'frase' && !vcExampleHas(w)) t = AUDIO.supported ? 'ouvir' : 'ver';
    if (t === 'ler' && w.ro.length < 3) t = 'ver';
    return vcQ(w, t, pool);
  });
  if (words.length >= 4) qs.splice(Math.min(3, qs.length), 0, vcPairs(shuffle(words)));
  return qs;
}
function vcBuildLesson(L) { return vcBuild(L.W, vcKnown(L), Math.min(9, L.W.length)); }
function vcBuildExam(c) { const ws = c.lessons.flatMap(L => L.W); return vcBuild(ws, vcKnown(null).concat(ws), 12); }
/* revisão: palavras da Academia de Vocabulário já vistas, primeiro as que você erra e as atrasadas */
function vcReviewIds() {
  const now = Date.now();
  return seenItems().filter(id => id.startsWith('vc:')).sort((a, b) => {
    const ra = S.items[a], rb = S.items[b], sc = r => (r.lastOk === false ? 100 : 0) + (r.w || 0) * 5 + (r.c + r.w > 0 && r.due <= now ? 20 : 0) - (r.box || 0) * 3;
    return sc(rb) - sc(ra) + (Math.random() - .5);
  });
}
function vcBuildReview() { const ws = vcReviewIds().slice(0, 10).map(id => ITEM[id]); return ws.length < 3 ? [] : vcBuild(ws, vcKnown(null).concat(ws), 10); }

/* ==========================================================
   TELAS
   ========================================================== */
const VCUI = { cat: null };
function vcLessonRow(L) {
  const done = vcPassed(L.id), open = vcLessonUnlocked(L), rec = vcState().lessons[L.id];
  return `<button class="rd-lrow ${done ? 'done' : ''} ${open ? '' : 'locked'}" data-act="vcLesson" data-id="${L.id}" ${open ? '' : 'aria-disabled="true"'}><span class="rd-lem jp">${esc(L.W[0].jp.length <= 2 ? L.W[0].jp : L.vcat.emblem)}</span><span class="grow"><b>${esc(L.title)}</b><small>${L.W.length} palavras · ${esc(L.W.slice(0, 3).map(w => w.jp).join('、'))}…</small></span><span class="rd-lst">${done ? '✓' + (rec && rec.best != null ? ' ' + rec.best + '%' : '') : open ? '›' : IC.lock}</span></button>`;
}
function viewVocabCat(c) {
  const p = vcCatProgress(c), eo = vcExamUnlocked(c), ep = vcExamPassed(c.id);
  return `<div class="wrap vc-wrap"><div class="page-title"><div style="min-width:0"><button class="link-btn" style="padding:0" data-act="vcCat" data-id="">← Todas as categorias</button><span class="jp" style="display:block">${esc(c.jp)}</span><h1>${esc(c.title)}</h1></div></div>
    <p class="muted" style="margin:0">${esc(c.desc)}</p>
    <div class="rd-stage" style="--sc:${c.color};margin-top:12px"><div class="rd-stbody" style="padding-top:12px">
      <span class="rd-stbar" style="margin:0 2px 4px"><i style="width:${p.pct}%"></i></span>
      <p class="muted tabnum" style="margin:0 2px 4px;font-size:.85rem">${p.done} de ${p.total} lições${ep ? ' · avaliação aprovada' : ''}</p>
      ${c.lessons.map(vcLessonRow).join('')}
      <button class="rd-exam ${ep ? 'done' : ''}" data-act="vcExam" data-id="${c.id}" ${eo || ep ? '' : 'aria-disabled="true"'}><span class="rd-lem jp">試</span><span class="grow" style="text-align:left"><b>Avaliação da categoria</b><small>${ep ? 'Aprovada · ' + (vcState().exams[c.id].best || 0) + '%' : eo ? 'Todas as palavras da categoria · mínimo ' + VC_PASS + '%' : 'Conclua todas as lições para liberar'}</small></span><span class="rd-lst">${ep ? '✓' : eo ? '›' : IC.lock}</span></button>
    </div></div>
    <div class="vc-links"><button class="btn btn-ghost btn-small" data-act="dictTheme" data-t="${esc(c.theme)}"><span class="jp" style="font-weight:800">辞</span> Ver no Dicionário</button><button class="btn btn-ghost btn-small" data-act="vcReview">${IC.repeat.replace('<svg', '<svg width="16" height="16"')} Revisar palavras</button></div></div>`;
}
function viewVocab() {
  vcState();
  if (VCUI.cat && VC_C[VCUI.cat]) return viewVocabCat(VC_C[VCUI.cat]);
  const st = vcStats(), nx = vcNext(), rv = vcReviewIds().length;
  const cards = VOCAB_CATS.map(c => {
    const p = vcCatProgress(c), complete = p.done === p.total;
    return `<button class="vc-cat ${complete ? 'done' : ''}" style="--sc:${c.color}" data-act="vcCat" data-id="${c.id}"><span class="vc-cem jp">${esc(c.emblem)}</span><span class="vc-ct">${esc(c.title)}</span><span class="vc-cs tabnum">${complete ? (p.exam ? '✓ concluída' : '✓ lições feitas') : p.done + '/' + p.total + ' lições'}</span><span class="rd-stbar"><i style="width:${p.pct}%"></i></span></button>`;
  }).join('');
  return `<div class="wrap vc-wrap"><div class="page-title"><div><span class="jp">たんご</span><h1>Academia de Vocabulário</h1></div></div>
    <div class="vc-hero"><div class="vc-hero-in"><span class="vc-hero-ic jp">語</span><div style="min-width:0"><b>${st.learned} de ${st.total} palavras aprendidas</b><small>${VOCAB_CATS.length} categorias · lições de 5 a 10 palavras · descobrir, escutar, entender, praticar e revisar</small></div></div>
      ${nx ? `<button class="btn btn-gold btn-block" data-act="vcLesson" data-id="${nx.id}">${vcState().opened[nx.id] ? 'Continuar' : 'Começar'}: ${esc(nx.vcat.title)} · ${esc(nx.title)}</button>` : '<p style="margin:0">Você concluiu todas as lições! Revise para manter as palavras vivas.</p>'}</div>
    <div class="vc-links"><button class="btn btn-ghost btn-small" data-act="vcReview" ${rv >= 3 ? '' : 'disabled'}>${IC.repeat.replace('<svg', '<svg width="16" height="16"')} Revisar${rv ? ' (' + rv + ')' : ''}</button><button class="btn btn-ghost btn-small" data-act="gotoDict"><span class="jp" style="font-weight:800">辞</span> Dicionário</button><button class="btn btn-ghost btn-small" data-act="dictTheme" data-t="particulas"><span class="jp" style="font-weight:800">は</span> Partículas</button><button class="btn btn-ghost btn-small" data-act="nav" data-view="caderno"><span class="jp" style="font-weight:800">帳</span> Caderno</button></div>
    <div class="vc-opts"><button class="filter ${vcState().listen ? 'on' : ''}" data-act="vcListen" aria-pressed="${vcState().listen}">${IC.headphones.replace('<svg', '<svg width="16" height="16"')} Ouvir primeiro</button><span class="muted" style="font-size:.8rem">${vcState().listen ? 'A escrita e a tradução aparecem depois que você ouve.' : 'Ative para ouvir cada palavra antes de ver a escrita.'}</span></div>
    <div class="vc-grid">${cards}</div>
    <p class="muted" style="margin:14px 2px 0;font-size:.82rem">Todas as categorias estão abertas: escolha por onde começar. Dentro de cada categoria, as lições abrem em ordem. As palavras estudadas entram no Caderno, na Revisão e no Adventure Mode.</p></div>`;
}

/* ---------- painel da lição (usa o mesmo layout da Leitura) ---------- */
let VV = null;
function vcOpenPane() { stopAudio(); closeModal(); $('#player').hidden = false; document.body.style.overflow = 'hidden'; }
function vcClose() { stopAudio(); VV = null; $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = ''; render(); setTimeout(flushPending, 200); }
function vcStartLesson(id, toQuiz) {
  const L = VC_L[id]; if (!L) return;
  if (!vcLessonUnlocked(L)) { toast('鍵', 'Conclua antes a lição anterior desta categoria.'); return; }
  const v = vcState(); if (!v.opened[L.id]) { v.opened[L.id] = Date.now(); save(); }
  vcOpenPane();
  VV = { kind: 'lesson', L, c: L.vcat, cards: [{ k: 'intro' }].concat(L.W.map(w => ({ k: 'word', w })), [{ k: 'listen' }]), ci: 0, heard: {}, rev: {}, mode: 'learn' };
  if (toQuiz) vcBeginQuiz(); else vcRender();
}
function vcStartQuiz(kind, title, qs, extra) {
  if (!qs.length) { toast('!', 'Estude algumas palavras primeiro: a revisão usa só o que você já viu.'); return; }
  vcOpenPane();
  VV = Object.assign({ kind, title, L: null, mode: 'quiz', qs, qi: 0, sel: null, answered: false, score: 0, wrong: [], heard: {}, rev: {}, built: [], pairs: null }, extra || {});
  vcRender();
}
function vcBeginQuiz() { Object.assign(VV, { mode: 'quiz', qs: vcBuildLesson(VV.L), gain: 0, qi: 0, sel: null, answered: false, score: 0, wrong: [], built: [], pairs: null, _spoke: false }); vcRender(); }
function vcHeadHTML() {
  const c = VV.c, title = VV.L ? VV.L.title : VV.title;
  const prog = VV.mode === 'learn' ? (VV.ci + 1) / VV.cards.length : VV.mode === 'quiz' ? VV.qi / VV.qs.length : 1;
  const stage = VV.mode === 'learn' ? (VV.cards[VV.ci].k === 'listen' ? 'Escutar' : VV.cards[VV.ci].k === 'intro' ? 'Lição' : 'Descobrir') : VV.mode === 'quiz' ? (VV.kind === 'lesson' ? 'Praticar' : VV.kind === 'exam' ? 'Avaliação' : 'Revisão') : 'Resultado';
  return `<header class="rd-head" style="--sc:${c ? c.color : '#3553d1'}"><button class="icon-btn" data-act="vcClose" aria-label="Sair">${IC.back}</button>
    <div class="grow" style="min-width:0"><small class="eyebrow">${esc(c ? c.title : 'Academia de Vocabulário')} · ${stage}</small><b class="rd-htitle">${esc(title)}</b>
    <span class="rd-hbar"><i style="width:${Math.round(prog * 100)}%"></i></span></div></header>`;
}
function vcNeedListen(key, say) { return vcState().listen && say && AUDIO.supported && !audioBlocked() && !VV.heard[key]; }
const vcGate = (key, say) => `<button class="rd-gate" data-act="vcHear" data-k="${esc(key)}" data-text="${esc(say)}">${IC.headphones.replace('<svg', '<svg width="28" height="28"')}<b>Ouça primeiro</b><small>Toque para ouvir; depois a palavra aparece.</small></button>`;
function vcRoLine(ro, key) { return S.settings.romaji || VV.rev[key] ? `<span class="rd-ro">${esc(ro)}</span>` : `<button class="rd-reveal" data-act="vcRev" data-k="${esc(key)}">Mostrar romaji</button>`; }
function vcCardHTML(card, i) {
  const L = VV.L;
  if (card.k === 'intro') return `<div class="card rd-card"><span class="rd-cem jp" style="color:${L.vcat.color}">${esc(L.vcat.emblem)}</span><h2>${esc(L.title)}</h2>
    <p>${L.W.length} palavras de <b>${esc(L.vcat.title)}</b>. Para cada uma: ouça, veja a escrita e o significado e, quando houver, um exemplo. Depois, escute todas sem ler e pratique.</p>
    <div class="vc-chips">${L.W.map(w => `<span class="chip nova jp">${esc(w.jp)}</span>`).join('')}</div>
    <div class="rd-tip"><b>Dica</b> Toque em “Devagar” para ouvir cada som com calma. Repetir em voz alta ajuda a memorizar.</div>
    <p class="muted" style="margin:0;font-size:.85rem">Aprovação com ${VC_PASS}% de acertos. As palavras já entram no Caderno e na Revisão enquanto você estuda.</p></div>`;
  if (card.k === 'word') {
    const w = card.w, key = 'w' + i;
    markSeen(w.id);
    const gate = vcNeedListen(key, w.say);
    const head = gate ? vcGate(key, w.say) : `<div class="rd-big jp word">${esc(w.jp)}</div>${w.write && w.write !== w.kana ? `<span class="jp vc-kana">${esc(w.kana)}</span>` : ''}${vcRoLine(w.ro, key)}`;
    return `<div class="card rd-card"><div class="vc-tags">${w.pos ? `<span class="chip nova">${esc(VOCAB_POS[w.pos] || w.pos)}</span>` : ''}<span class="chip" style="background:color-mix(in srgb, ${L.vcat.color} 16%, var(--surface));color:var(--text)">${esc(L.vcat.title)}</span></div>
      <div class="rd-charbox">${head}</div>${vcAudioBtns(w.say, true)}
      ${gate ? '' : `<div class="rd-sec"><span class="eyebrow">${w.senses.length > 1 ? 'Significados' : 'Significado'}</span>${w.senses.length > 1 ? `<ol class="vc-senses">${w.senses.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : `<p class="vc-pt">${esc(w.senses[0])}</p>`}</div>
      ${w.note ? `<div class="rd-tip"><b>Entenda</b> ${esc(w.note)}</div>` : ''}
      ${w.ex ? `<div class="rd-sec"><span class="eyebrow">Exemplo</span><div class="vc-ex"><div class="vc-ex-top"><span class="jp vc-ex-jp">${esc(w.ex.jp)}</span>${vcSnd(w.ex.say, 'Ouvir o exemplo')}</div>${vcRoLine(w.ex.ro, key + 'e')}<span>${esc(w.ex.pt)}</span></div></div>` : ''}`}
      <div class="rd-btns"><button class="btn btn-ghost btn-small" data-act="vcDict" data-id="${esc(w.id)}"><span class="jp" style="font-weight:800">辞</span> Dicionário</button><span class="btn btn-ghost btn-small d-done" aria-disabled="true">✓ No Caderno</span></div></div>`;
  }
  if (card.k === 'listen') {
    const showJp = !!VV.rev.allJp, showPt = !!VV.rev.allPt;
    return `<div class="card rd-card"><h2>Escute sem ler</h2><p class="muted">Toque em cada número para ouvir. Tente lembrar a palavra e o significado antes de revelar.</p>
      ${AUDIO.supported ? `<button class="btn btn-primary btn-small" style="align-self:flex-start" data-act="vcPlayAll">${IC.play.replace('<svg', '<svg width="16" height="16"')} Ouvir todas</button>` : ''}
      <div class="filters" role="group" aria-label="Mostrar"><button class="filter ${showJp ? 'on' : ''}" data-act="vcRev" data-k="allJp">Mostrar escrita</button><button class="filter ${showPt ? 'on' : ''}" data-act="vcRev" data-k="allPt">Mostrar tradução</button></div>
      <div class="vc-listen">${L.W.map((w, j) => { const r = VV.rev['l' + j]; return `<div class="vc-lrow"><button class="vc-num" data-act="vcSay" data-text="${esc(w.say)}" aria-label="Ouvir palavra ${j + 1}">${j + 1}</button><div class="grow" style="min-width:0">${showJp || r ? `<span class="jp vc-ljp">${esc(w.jp)}</span> <span class="muted" style="font-size:.85rem">${esc(w.ro)}</span>` : '<span class="muted">• • •</span>'}${showPt || r ? `<small class="rd-wpt">${esc(vcPtMain(w))}</small>` : ''}</div>${!(showJp && showPt) && !r ? `<button class="rd-reveal" data-act="vcRev" data-k="l${j}">Revelar</button>` : ''}</div>`; }).join('')}</div></div>`;
  }
  return '';
}
function vcQHTML() {
  const q = VV.qs[VV.qi], key = 'q' + VV.qi;
  let h = `<div class="rd-q"><span class="mode-tag">${VV.kind === 'exam' ? 'Avaliação' : VV.kind === 'lesson' ? 'Praticar' : 'Revisão'}${q.tag ? ' · ' + esc(q.tag) : ''}</span><div class="q-prompt">${esc(q.prompt)}</div>`;
  if (q.audio || q.t === 'montar') h += `<div class="rd-listen"><button class="play-big" data-act="vcQSay" aria-label="Ouvir">${IC.play}<span>Ouvir</span></button><div class="audio-ctrls"><button class="btn btn-ghost btn-small" data-act="vcQSay">${IC.repeat.replace('<svg', '<svg width="18" height="18"')} Repetir</button><button class="btn btn-ghost btn-small" data-act="vcQSlow">Devagar</button></div></div>`;
  if (q.big) {
    const roShown = q.ro && !q.noRo && (S.settings.romaji || VV.rev[key] || VV.answered);
    h += `<div class="q-card"><span class="${q.bigCls === 'fill' ? 'fill-sentence jp' : 'rd-qbig ' + (q.bigCls || '') + (q.bigCls === 'pt' ? '' : ' jp')}">${esc(q.big)}</span>${roShown ? `<span class="ro">${esc(q.ro)}</span>` : q.ro && !q.noRo ? `<button class="rd-reveal" data-act="vcRev" data-k="${key}">Mostrar romaji</button>` : ''}${q.ctx ? `<span class="ctx">${esc(q.ctx)}</span>` : ''}${(q.bigCls !== 'pt' && q.bigCls !== 'fill' && q.t !== 'ler') || VV.answered ? vcSnd(VV.answered && q.sayAfter ? q.sayAfter : q.say) : ''}</div>`;
  } else if (q.ctx && q.t !== 'montar') h += `<div class="q-card"><span class="ctx">${esc(q.ctx)}</span></div>`;
  if (q.t === 'montar') {
    h += `<div class="q-card"><span class="ctx">Significado</span><b style="font-size:1.15rem">${esc(q.ctx)}</b></div>`;
    h += `<div class="answer-line ${VV.built.length ? '' : 'empty'}">${VV.built.map(i => `<button class="tile" data-act="vcUnbuild" data-i="${i}" ${VV.answered ? 'disabled' : ''}><span class="t-jp kana">${esc(q.bank[i].t)}</span></button>`).join('')}</div><div class="bank">${q.bank.map((b, i) => `<button class="tile ${VV.built.includes(i) ? 'used' : ''}" data-act="vcBuild" data-i="${i}" ${VV.answered || VV.built.includes(i) ? 'disabled' : ''}><span class="t-jp kana">${esc(b.t)}</span></button>`).join('')}</div>`;
  } else if (q.t === 'pares') {
    const M = VV.pairs || (VV.pairs = { l: null, r: null, done: [], miss: new Set() });
    const col = (arr, side) => arr.map(o => { const d = M.done.includes(o.i), s = M[side] === o.i; return `<button class="opt ${d ? 'right gone' : s ? 'sel' : ''}" data-act="vcPair" data-side="${side}" data-i="${o.i}" ${d || VV.answered ? 'disabled' : ''}><span class="${side === 'l' ? 'o-jp' : ''}">${esc(o.t)}</span>${side === 'l' && o.sub && S.settings.romaji ? `<span class="o-ro">${esc(o.sub)}</span>` : ''}</button>`; }).join('');
    h += `<div class="match"><div class="col">${col(q.L, 'l')}</div><div class="col">${col(q.R, 'r')}</div></div>`;
  } else {
    h += `<div class="opts ${q.grid ? 'grid' : ''}">${q.opts.map((o, i) => { let cls = 'opt'; if (VV.answered) { if (o.ok) cls += ' right'; else if (i === VV.sel) cls += ' wrong'; } else if (i === VV.sel) cls += ' sel'; return `<button class="${cls}" data-act="vcOpt" data-i="${i}" ${VV.answered ? 'disabled' : ''}>${o.jp ? `<span class="o-jp">${esc(o.t)}</span>` : `<span>${esc(o.t)}</span>`}${o.sub && (S.settings.romaji && !q.audio || VV.answered) ? `<span class="o-ro">${esc(o.sub)}</span>` : ''}</button>`; }).join('')}</div>`;
  }
  return h + '</div>';
}
function vcFootHTML() {
  if (VV.mode === 'learn') {
    const last = VV.ci >= VV.cards.length - 1;
    return `<div class="rd-nav">${VV.ci > 0 ? '<button class="btn btn-ghost" data-act="vcPrev">Anterior</button>' : '<span></span>'}${last ? '<button class="btn btn-gold" data-act="vcQuiz">Praticar</button>' : '<button class="btn btn-primary" data-act="vcNext">Próximo</button>'}</div>`;
  }
  if (VV.mode === 'quiz') {
    const q = VV.qs[VV.qi];
    if (q.t === 'pares' && !VV.answered) return `<p class="muted" style="margin:0;text-align:center">Toque em um item de cada coluna para formar o par.</p>`;
    if (!VV.answered) return `<button class="btn btn-primary btn-block" data-act="vcCheck" ${(q.t === 'montar' ? VV.built.length : VV.sel !== null) ? '' : 'disabled'}>Verificar</button>`;
    return `<div class="fb ${VV.lastOk ? 'ok' : 'bad'}">${mascot(VV.lastOk ? 'happy' : 'sad', 50, 'hop')}<div class="fb-text"><h3>${VV.lastOk ? pick(['Isso!', 'Muito bem!', 'Certo!', 'すごい！']) : 'Quase!'}</h3>${!VV.lastOk ? `<p class="answer">Resposta certa: ${esc(q.ans)}</p>` : ''}<p>${esc(q.explain || '')}</p></div></div><button class="btn ${VV.lastOk ? 'btn-ok' : 'btn-bad'} btn-block" data-act="vcNextQ">Continuar</button>`;
  }
  return '';
}
function vcResultHTML() {
  const pct = VV.pct, passed = VV.passed, needs = VV.kind === 'lesson' || VV.kind === 'exam';
  const title = VV.kind === 'lesson' ? (passed ? 'Lição concluída!' : 'Quase lá!') : VV.kind === 'exam' ? (passed ? 'Categoria dominada!' : 'Ainda não foi desta vez') : 'Revisão concluída';
  return `<div class="rd-result">${mascot(passed || !needs ? 'happy' : 'sad', 96)}<h2>${title}</h2>
    <div class="rd-score tabnum">${pct}%</div><p class="muted" style="margin:0">${VV.score} de ${VV.qs.length} certas${needs ? ' · mínimo ' + VC_PASS + '%' : ''}</p>
    ${VV.gain ? `<p class="rd-xp">+${VV.gain} XP</p>` : needs && passed ? '<p class="muted" style="margin:0">O XP desta etapa já foi ganho na primeira aprovação.</p>' : ''}
    ${VV.msg ? `<p>${esc(VV.msg)}</p>` : ''}
    ${VV.wrong.length ? `<div class="card rd-wrongs"><span class="eyebrow">Para rever (já estão na Revisão)</span>${VV.wrong.slice(0, 6).map(q => `<p><b>${esc(q.ans)}</b><br><span class="muted">${esc(q.explain || '')}</span></p>`).join('')}</div>` : ''}
    <div class="rd-btns">${VV.kind === 'lesson' ? `<button class="btn btn-ghost" data-act="vcRedo">Rever as palavras</button><button class="btn ${passed ? 'btn-ghost' : 'btn-gold'}" data-act="vcRetry">${passed ? 'Praticar de novo' : 'Tentar de novo'}</button>` : `<button class="btn btn-ghost" data-act="vcRetry">${VV.kind === 'exam' ? 'Refazer' : 'Mais uma revisão'}</button>`}
    ${VV.next ? `<button class="btn btn-primary" data-act="vcLesson" data-id="${VV.next.id}">Próxima: ${esc(VV.next.title)}</button>` : VV.examNext ? `<button class="btn btn-primary" data-act="vcExam" data-id="${VV.examNext.id}">Fazer a avaliação da categoria</button>` : ''}<button class="btn ${VV.next || VV.examNext ? 'btn-ghost' : 'btn-primary'}" data-act="vcClose">Voltar</button></div></div>`;
}
function vcRender() {
  if (!VV) return;
  let body = VV.mode === 'learn' ? vcCardHTML(VV.cards[VV.ci], VV.ci) : VV.mode === 'quiz' ? vcQHTML() : vcResultHTML();
  $('#player').innerHTML = `<div class="rd-pane vc-pane">${vcHeadHTML()}<div class="rd-body" id="vcBody">${body}</div>${VV.mode === 'result' ? '' : `<footer class="rd-foot">${vcFootHTML()}</footer>`}</div>`;
  if (!VV.keep) { const b = $('#vcBody'); if (b) b.scrollTop = 0; } VV.keep = false;
  if (S.settings.sound !== false && AUDIO.supported && !audioBlocked() && !VV._spoke) {
    VV._spoke = true;
    if (VV.mode === 'quiz' && !VV.answered) { const q = VV.qs[VV.qi]; if (q.audio || q.t === 'montar') setTimeout(() => vcSay(q.say), 150); }
    if (VV.mode === 'learn' && !vcState().listen) { const c = VV.cards[VV.ci]; if (c.k === 'word') setTimeout(() => vcSay(c.w.say), 150); }
  }
}
function vcAnswer(ok) {
  const q = VV.qs[VV.qi];
  VV.answered = true; VV.lastOk = ok;
  if (ok) VV.score++; else VV.wrong.push(q);
  if (q.t === 'pares') q.items.forEach((id, i) => recordAnswer(id, !VV.pairs.miss.has(i), 'vocab', 'vocabulario'));
  else recordAnswer(q.itemId, ok, 'vocab', q.skill || 'vocabulario');
  sfx(ok ? 'ok' : 'bad');
  if (VV.kind === 'review' && ok) VV.gain = (VV.gain || 0) + vcXP(1);
  vcRender();
}
function vcCheck() {
  const q = VV.qs[VV.qi]; if (VV.answered) return;
  if (q.t === 'montar') { if (!VV.built.length) return; vcAnswer(VV.built.map(i => q.bank[i].t).join('') === q.tiles.join('')); }
  else { if (VV.sel === null) return; vcAnswer(!!q.opts[VV.sel].ok); }
}
function vcFinish() {
  const v = vcState();
  const pct = VV.qs.length ? Math.round(VV.score / VV.qs.length * 100) : 0;
  Object.assign(VV, { pct, passed: pct >= VC_PASS, mode: 'result', gain: VV.gain || 0, msg: '', next: null, examNext: null });
  touchStudy();
  if (VV.kind === 'lesson') {
    const L = VV.L, rec = v.lessons[L.id] || (v.lessons[L.id] = { passed: false, best: 0, attempts: 0 });
    const first = VV.passed && !rec.passed;
    rec.attempts++; rec.best = Math.max(rec.best || 0, pct); rec.last = Date.now();
    if (VV.passed) {
      rec.passed = true; if (!rec.at) rec.at = Date.now();
      L.W.forEach(w => markSeen(w.id));
      const nx = L.vcat.lessons[L.index + 1]; VV.next = nx || null;
      if (!nx) { VV.msg = 'Você concluiu todas as lições de ' + L.vcat.title + '. A avaliação da categoria está liberada.'; if (!vcExamPassed(L.vcat.id)) VV.examNext = L.vcat; }
    } else VV.msg = 'Reveja as palavras e tente de novo. As que você errou já estão na Revisão.';
    if (first) { VV.gain = 15 + (pct === 100 ? 5 : 0); addXP(VV.gain); addCoins(3); }
    v.log.unshift({ t: Date.now(), id: L.id, pct, ok: VV.passed });
  } else if (VV.kind === 'exam') {
    const c = VV.c, rec = v.exams[c.id] || (v.exams[c.id] = { passed: false, best: 0, attempts: 0 });
    const first = VV.passed && !rec.passed;
    rec.attempts++; rec.best = Math.max(rec.best || 0, pct); rec.last = Date.now();
    if (VV.passed) { rec.passed = true; if (!rec.at) rec.at = Date.now(); VV.msg = 'Todas as palavras de ' + c.title + ' estão na sua Revisão. Volte de vez em quando para mantê-las vivas.'; }
    else VV.msg = 'Revise as lições desta categoria e tente de novo quando quiser.';
    if (first) { VV.gain = 30; addXP(30); addCoins(10); }
    v.log.unshift({ t: Date.now(), id: 'prova:' + c.id, pct, ok: VV.passed });
  } else v.log.unshift({ t: Date.now(), id: 'revisao', pct, ok: true });
  v.log = v.log.slice(0, 40);
  if (VV.passed || !['lesson', 'exam'].includes(VV.kind)) { try { if (typeof confetti === 'function' && (VV.passed)) confetti(); } catch (e) {} }
  save(); checkAchievements();
  vcRender();
}
function vcStartExam(cid) {
  const c = VC_C[cid]; if (!c) return;
  if (!vcExamUnlocked(c) && !vcExamPassed(c.id)) { toast('鍵', 'Conclua todas as lições desta categoria primeiro.'); return; }
  vcStartQuiz('exam', 'Avaliação: ' + c.title, vcBuildExam(c), { c });
}
function vcStartReview() { vcStartQuiz('review', 'Revisão de vocabulário', vcBuildReview(), { c: null }); }

Object.assign(ACT, {
  vcCat: el => { VCUI.cat = el.dataset.id || null; S.settings.academyMode = 'vc'; if (view !== 'academia') go('academia'); else render(); window.scrollTo(0, 0); },
  vcLesson: el => vcStartLesson(el.dataset.id),
  vcExam: el => vcStartExam(el.dataset.id),
  vcReview: () => vcStartReview(),
  vcListen: () => { const v = vcState(); v.listen = !v.listen; save(); render(); },
  vcClose: () => vcClose(),
  vcNext: () => { if (VV.ci < VV.cards.length - 1) { VV.ci++; VV._spoke = false; vcRender(); } },
  vcPrev: () => { if (VV.ci > 0) { VV.ci--; VV._spoke = true; vcRender(); } },
  vcQuiz: () => vcBeginQuiz(),
  vcRedo: () => { if (!VV.L) return; vcStartLesson(VV.L.id); },
  vcRetry: () => { if (VV.kind === 'lesson') vcBeginQuiz(); else if (VV.kind === 'exam') vcStartExam(VV.c.id); else vcStartReview(); },
  vcSay: el => vcSay(el.dataset.text),
  vcSaySlow: el => vcSay(el.dataset.text, true),
  vcSay3: el => vcSay(el.dataset.text, false, 3),
  vcHear: el => { VV.heard[el.dataset.k] = true; vcSay(el.dataset.text); VV.keep = true; vcRender(); },
  vcRev: el => { VV.rev[el.dataset.k] = !VV.rev[el.dataset.k]; VV.keep = true; vcRender(); },
  vcPlayAll: () => { if (VV && VV.L) speakSeq(VV.L.W.map(w => ({ say: w.say, jp: w.jp }))); },
  vcDict: el => { const it = VC_W[el.dataset.id]; if (!it) return; dictBuild(); const e = DICT.list.find(x => x.items.includes(it.id)); if (e) dictOpen(e); else dictOpenWord(it.write || it.kana); },
  vcQSay: () => { const q = VV.qs[VV.qi]; vcSay(q.say); },
  vcQSlow: () => { const q = VV.qs[VV.qi]; vcSay(q.say, true); },
  vcOpt: el => { if (VV.answered) return; VV.sel = +el.dataset.i; VV.keep = true; vcRender(); },
  vcBuild: el => { if (VV.answered) return; const i = +el.dataset.i; if (!VV.built.includes(i)) VV.built.push(i); VV.keep = true; vcRender(); },
  vcUnbuild: el => { if (VV.answered) return; VV.built = VV.built.filter(i => i !== +el.dataset.i); VV.keep = true; vcRender(); },
  vcPair: el => {
    const q = VV.qs[VV.qi], M = VV.pairs; if (VV.answered || !M) return;
    const side = el.dataset.side, i = +el.dataset.i; M[side] = i;
    if (M.l != null && M.r != null) {
      if (M.l === M.r) { M.done.push(M.l); sfx('ok'); } else { M.miss.add(M.l); M.miss.add(M.r); sfx('bad'); }
      M.l = M.r = null;
      if (M.done.length === q.items.length) return vcAnswer(M.miss.size === 0);
    }
    VV.keep = true; vcRender();
  },
  vcCheck: () => vcCheck(),
  vcNextQ: () => { stopAudio(); VV.qi++; VV.sel = null; VV.answered = false; VV.built = []; VV.pairs = null; VV._spoke = false; if (VV.qi >= VV.qs.length) vcFinish(); else vcRender(); },
  gotoVocab: () => { VCUI.cat = null; S.settings.academyMode = 'vc'; go('academia'); }
});

/* ---------- integrações com as telas existentes ---------- */
/* Academia: quinta aba “Palavras” (Academia · Palavras · Listening · Leitura · Treinos) */
const _vcAcadRoot = viewAcademyRoot;
viewAcademyRoot = function () {
  const mode = ['aud', 'la', 'rd', 'vc'].includes(S.settings.academyMode) ? S.settings.academyMode : 'trad';
  const b = (m, ic, txt) => `<button role="tab" aria-selected="${mode === m}" class="${mode === m ? 'on' : ''}" data-act="acadMode" data-mode="${m}">${ic}<span>${txt}</span></button>`;
  const sw = `<div class="wrap"><div class="mode-switch five" role="tablist">${b('trad', IC.academy, 'Academia')}${b('vc', '<span class="jp rd-swic" aria-hidden="true">語</span>', 'Palavras')}${b('la', IC.headphones, 'Listening')}${b('rd', '<span class="jp rd-swic" aria-hidden="true">あ</span>', 'Leitura')}${b('aud', IC.wave, 'Treinos')}</div></div>`;
  if (mode === 'vc') return sw + viewVocab();
  return _vcAcadRoot().replace(/^<div class="wrap"><div class="mode-switch four"[\s\S]*?<\/div><\/div>/, sw);
};
VIEWS.push('vocabulario');
const _vcRender = render;
render = function () {
  if (view === 'vocabulario') { S.settings.academyMode = 'vc'; view = 'academia'; try { history.replaceState(null, '', '#academia'); } catch (e) {} }
  _vcRender();
};
/* Revisão: perguntas da Revisão de sempre para palavras da Academia de Vocabulário (visual e auditiva) */
const _vcGenItemQ = genItemQ;
/* partículas salvas do Dicionário: “qual é uma função desta partícula?” (sem pares que se confundem, como に × へ) */
const VC_PCONF = { 'に': ['へ'], 'へ': ['に'], 'で': ['から'], 'から': ['で'], 'か': ['の'], 'の': ['か'] };
function vcParticleQ(it) {
  const P = it.particle, right = pick(P.pt);
  const others = shuffle(DICT_PARTICLES.filter(x => x !== P && !(VC_PCONF[P.p] || []).includes(x.p))).slice(0, 3);
  return { type: 'mc', itemId: it.id, prompt: 'Qual é uma das funções desta partícula?', big: P.p, ro: P.ro, say: it.say, options: shuffle([{ label: right, plain: true, correct: true }].concat(others.map(x => ({ label: x.pt[0], plain: true, correct: false })))), answerText: right, explain: P.p + ' (' + P.ro + '): ' + P.pt.join('; ') + '.' };
}
genItemQ = function (it, forceType) {
  if (it && it.particle) return vcParticleQ(it);
  if (it && it.lesson && it.lesson.vc) {
    const pool = vcKnown(null).concat(it.lesson.W);
    if (AUDIO.supported && !forceType && Math.random() < .4) return genListenQ(it, 'word', S.listening.level, pool.filter(x => x !== it && vcPtMain(x) !== vcPtMain(it)).map(x => ({ ...x, pt: vcPtMain(x) })).concat([it]));
    const t = forceType === 'pt2jp' || (!forceType && Math.random() < .35) ? 'pt2jp' : !forceType && Math.random() < .3 && it.ro.length >= 3 ? 'ler' : 'ver';
    const q = vcQ(it, t, pool);
    return { type: 'mc', itemId: it.id, prompt: q.prompt, big: q.big || '', bigClass: q.bigCls === 'pt' ? 'pt' : '', ro: q.ro || '', noRomaji: !!q.noRo, say: it.say, grid: !!q.grid, options: q.opts.map(o => ({ label: o.t, sub: o.jp ? o.sub : '', plain: !o.jp, correct: !!o.ok })), answerText: q.ans, explain: q.explain };
  }
  return _vcGenItemQ(it, forceType);
};
const _vcOrigin = originOf;
originOf = function (it) { return it && it.lesson && it.lesson.vc ? 'Academia de Vocabulário · ' + it.lesson.vcat.title : _vcOrigin(it); };
const _vcReview = viewReview;
viewReview = function () {
  const h = _vcReview(), n = vcReviewIds().length;
  if (n < 3) return h;
  const card = `<section class="section"><div class="card mascot-tip vc-revcard" style="align-items:center"><span class="mod-ic big jp" style="font-size:1.3rem">語</span><div style="min-width:0" class="grow"><b>Vocabulário</b><span class="muted" style="display:block;font-size:.85rem">${n} palavras da Academia de Vocabulário · ouvir e reconhecer, com prioridade para o que você erra.</span></div><button class="btn btn-primary btn-small" data-act="vcReview">Revisar</button></div></section>`;
  return h.replace(/(<section class="section")/, card + '$1');
};
const _vcFlush = flushPending;
flushPending = function () { if (VV) return; _vcFlush(); };
/* Início: o bloco “Sua jornada” ganha a Academia de Vocabulário logo depois da Academia */
const _vcTiles = nqJourneyTiles;
nqJourneyTiles = function () {
  const st = vcStats();
  const tile = `<button class="nq-tile" data-act="gotoVocab"><span class="nq-ic jp">語</span><span class="nq-tn">Vocabulário</span><span class="nq-ts">${st.learned}/${st.total}</span></button>`;
  return _vcTiles().replace(/(<\/button>)/, '$1' + tile);
};
ACHIEVEMENTS.push(
  { id: 'vc_first', icon: '語', name: 'Primeiras palavras', desc: 'Conclua a primeira lição da Academia de Vocabulário.', test: s => !!(s.vocab && Object.values(s.vocab.lessons || {}).some(x => x && x.passed)) },
  { id: 'vc_cat', icon: '冠', name: 'Categoria dominada', desc: 'Passe na avaliação de uma categoria de vocabulário.', test: s => !!(s.vocab && Object.values(s.vocab.exams || {}).some(x => x && x.passed)) },
  { id: 'vc_100', icon: '百', name: 'Cem palavras', desc: 'Aprenda 100 palavras na Academia de Vocabulário.', test: s => !!(s.vocab && VC_LESSONS.filter(L => s.vocab.lessons[L.id] && s.vocab.lessons[L.id].passed).reduce((n, L) => n + L.W.length, 0) >= 100) }
);
