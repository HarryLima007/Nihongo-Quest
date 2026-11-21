/* ==========================================================
   Nihongo Quest 6.0 — LISTENING ACADEMY
   Área de compreensão auditiva: 5 categorias progressivas, lições com
   exercícios variados, "ouvir primeiro" e revelação gradual (japonês,
   romaji, tradução). Usa os sistemas existentes: XP, Revisão (SRS),
   Caderno, histórico, estatísticas por habilidade e missões.
   Áudio: arquivo gravado quando a fala tiver `audio`, senão a voz
   japonesa do próprio aparelho (Web Speech), com perfil por personagem.
   ========================================================== */

const LA_PASS = 70;
const LA_SPEEDS = [0.75, 1, 1.25, 1.5];
const LA_ACAT = { id: 'la', title: 'Listening Academy' };
/* perfis de voz: com uma só voz japonesa no aparelho, os personagens se diferenciam pelo tom e ritmo;
   com várias vozes instaladas, cada personagem recebe uma voz diferente. */
const LA_VOICES = {
  aiko: { name: 'Aiko-sensei', pitch: 1.08, rate: 0.92, order: 0, color: '#6c43dd', style: 'educada e paciente' },
  ren: { name: 'Ren', pitch: 0.82, rate: 1.04, order: 1, color: '#3553d1', style: 'casual e descontraído' },
  yumi: { name: 'Yumi', pitch: 1.32, rate: 1.06, order: 2, color: '#d0517a', style: 'expressiva e espontânea' },
  takeshi: { name: 'Takeshi', pitch: 0.7, rate: 0.95, order: 3, color: '#1f9461', style: 'formal (keigo de atendimento)' },
  haruto: { name: 'Haruto', pitch: 0.95, rate: 1, order: 4, color: '#c77d12', style: 'colega de turma' }
};
const LA_INTENTS = { pergunta: 'Perguntando algo', agradecimento: 'Agradecendo', convite: 'Convidando', recusa: 'Recusando', pedido: 'Pedindo algo / pedindo permissão', desculpa: 'Pedindo desculpas', cumprimento: 'Cumprimentando', despedida: 'Se despedindo', oferta: 'Oferecendo algo' };
const LA_REG = [['casual', 'Casual', 'entre amigos, sem です/ます'], ['educado', 'Educado', 'です/ます, com professores e desconhecidos'], ['formal', 'Formal', 'keigo de atendimento e avisos']];
const LA_REG_WHY = { casual: 'Casual: frases curtas, sem です/ます, como entre amigos.', educado: 'Educado: termina com です/ます. É o jeito seguro com professores e desconhecidos.', formal: 'Formal: keigo de atendimento (ございます, かしこまりました, いらっしゃいませ, お〜ください).' };
const LA_TYPE = { id: 'Identificação', rec: 'Reconhecimento', mean: 'Compreensão da frase', spot: 'Palavra na frase', order: 'Ordem das palavras', tf: 'Verdadeiro ou falso', intent: 'Intenção', reply: 'Resposta adequada', comp: 'Compreensão do diálogo', gist: 'Sentido geral', line: 'Fala do diálogo', reg: 'Casual, educado ou formal' };
const LA_LEVELS = ['', 'Reconhecimento', 'Frases', 'Conversação', 'Naturalidade', 'Compreensão avançada'];

/* ---------- índice: lições, palavras e itens (integrados ao ITEM da Academia) ---------- */
const LA_LESSON = {}, LA_LESSONS = [], LA_CAT = {};
const laTL = s => { const o = typeof s === 'object' && s ? s : { l: s }; const [jp, ro, pt] = String(o.l || '').split('|'); return { jp: jp || '', ro: ro || '', pt: pt || '', audio: o.audio || null }; };
const laKana = s => String(s || '').replace(/[。、！？!?.,…「」〜~\s・（）()]/g, '');
(function laIndex() {
  const byKana = {};
  const put = (k, id) => { if (k && !byKana[k]) byKana[k] = id; };
  ALL_LESSONS.forEach(l => l.items.forEach(it => { put(laKana(it.say || it.jp), it.id); put(laKana(it.jp), it.id); }));
  AUDIO_PACKS.forEach(p => p.items.forEach(it => { put(laKana(it.say || it.jp), it.id); put(laKana(it.jp), it.id); }));
  LA_CATS.forEach((c, ci) => {
    LA_CAT[c.id] = c; c.index = ci;
    c.lessons.forEach((L, i) => {
      Object.assign(L, { cat: c, index: i, kind: 'audio', la: true, items: [], wordRefs: [] });
      L.lv = L.lv || c.lv;
      LA_LESSON[L.id] = L; LA_LESSONS.push(L);
      (L.words || []).forEach(w => {
        const [key, line, group, note] = w, t = laTL(line);
        const ref = byKana[laKana(t.jp)];
        if (ref && ITEM[ref]) { L.wordRefs.push({ key, id: ref, jp: t.jp, reused: true }); return; }
        const it = { k: key, jp: t.jp, ro: t.ro, pt: t.pt, say: t.jp, group: group || 'palavra', note: note || '', id: 'la:' + key, lesson: L };
        ITEM[it.id] = it; L.items.push(it); L.wordRefs.push({ key, id: it.id, jp: t.jp, reused: false });
      });
    });
  });
})();
function laWord(L, key) { const r = L.wordRefs.find(x => x.key === key); return r ? ITEM[r.id] : null; }

/* ---------- estado salvo (S.lacad, esquema 6) ---------- */
function laState() {
  if (!isPlainObj(S.lacad)) S.lacad = defaultLacad();
  const a = S.lacad;
  ['lessons', 'exams', 'words', 'dialogs'].forEach(k => { if (!isPlainObj(a[k])) a[k] = {}; });
  if (!isPlainObj(a.stats)) a.stats = { a: 0, c: 0, ms: 0, byCat: {}, byType: {} };
  if (!isPlainObj(a.stats.byCat)) a.stats.byCat = {};
  if (!isPlainObj(a.stats.byType)) a.stats.byType = {};
  if (!LA_SPEEDS.includes(a.speed)) a.speed = 1;
  return a;
}

/* ---------- progressão e desbloqueio ---------- */
const laLessonPassed = id => !!(laState().lessons[id] && laState().lessons[id].passed);
const laExamPassed = id => !!(laState().exams[id] && laState().exams[id].passed);
function laCatMissing(c) {
  const miss = [];
  const prev = LA_CATS[c.index - 1];
  if (prev && !laExamPassed(prev.id)) miss.push('a avaliação de “' + prev.title + '”');
  (c.acad || []).forEach(id => { if (CAT[id] && !catPassed(id)) miss.push('a ala “' + CAT[id].title + '” da Academia'); });
  return miss;
}
const laCatUnlocked = c => !laCatMissing(c).length;
const laLessonUnlocked = L => laCatUnlocked(L.cat) && (L.index === 0 || laLessonPassed(L.cat.lessons[L.index - 1].id));
const laExamUnlocked = c => laCatUnlocked(c) && c.lessons.every(l => laLessonPassed(l.id));
function laCatProgress(c) { const tot = c.lessons.length + 1; const done = c.lessons.filter(l => laLessonPassed(l.id)).length + (laExamPassed(c.id) ? 1 : 0); return { done, tot }; }
function laNext() {
  for (const c of LA_CATS) {
    if (!laCatUnlocked(c)) return { locked: c };
    const L = c.lessons.find(l => !laLessonPassed(l.id));
    if (L) return { lesson: L };
    if (!laExamPassed(c.id)) return { exam: c };
  }
  return null;
}
function laReqText(c) { const m = laCatMissing(c); return m.length ? 'Para abrir: conclua ' + m.join(' e ') + '.' : ''; }

/* ==========================================================
   MOTOR DE ÁUDIO DA LISTENING ACADEMY
   Reproduzir, pausar (retoma da fala atual), repetir, velocidade, por partes,
   diálogo completo e fala por fala. Nunca toca dois áudios ao mesmo tempo.
   ========================================================== */
const LA = { state: 'idle', idx: 0, lines: [], mode: 'all', my: 0, fileFail: {}, el: null };
function laJaVoices() { return (AUDIO.voices || []).filter(v => String(v.lang || '').replace('_', '-').toLowerCase().startsWith('ja')); }
function laVoiceInfo() {
  const n = laJaVoices().length;
  if (audioBlocked()) return 'Sem voz japonesa no aparelho: use o modo leitura (romaji) e veja como ativar a voz.';
  if (n >= 2) return n + ' vozes japonesas encontradas no aparelho: cada personagem usa uma voz e um tom diferentes.';
  return 'Voz sintetizada do aparelho. Há uma só voz japonesa instalada, então os personagens se diferenciam pelo tom e pelo ritmo.';
}
function laVoiceFor(sp) {
  const p = LA_VOICES[sp] || LA_VOICES.aiko, vs = laJaVoices();
  let voice = AUDIO.ja || null;
  if (vs.length >= 2) { const local = vs.filter(v => v.localService); const list = local.length >= 2 ? local : vs; voice = list[p.order % list.length]; }
  return { voice, pitch: p.pitch, rate: p.rate };
}
function laRate(sp) { const v = LA_VOICES[sp] || LA_VOICES.aiko; return Math.max(0.5, Math.min(2, (RATES.normal || 0.95) * laState().speed * v.rate)); }
function laPlayFile(url, my) {
  return new Promise(resolve => {
    let a; try { a = new Audio(url); } catch (e) { return resolve(null); }
    LA.el = a; a.playbackRate = laState().speed; try { a.preservesPitch = true; a.mozPreservesPitch = true; a.webkitPreservesPitch = true; } catch (e) {}
    a.onended = () => resolve(AUDIO.token === my);
    a.onerror = () => { LA.fileFail[url] = true; resolve(null); };
    const p = a.play(); if (p && p.catch) p.catch(() => { LA.fileFail[url] = true; resolve(null); });
  });
}
async function laSay(line, my) {
  if (line.audio && !LA.fileFail[line.audio]) { const r = await laPlayFile(line.audio, my); if (r !== null) return r; }
  const v = laVoiceFor(line.sp);
  AUDIO.token = my - 1;
  return speak(line.say || line.jp, { rate: laRate(line.sp), pitch: v.pitch, voice: v.voice });
}
function laStopFile() { if (LA.el) { try { LA.el.pause(); } catch (e) {} LA.el = null; } }
/* toca as falas a partir de `from`; mode: 'all' (sequência) | 'one' (só uma fala) | 'parts' (partes com pausa maior) */
async function laPlay(lines, from = 0, mode = 'all') {
  if (!lines || !lines.length) return false;
  if (audioBlocked() && !lines.some(l => l.audio && !LA.fileFail[l.audio])) { audioProblem(true); return false; }
  laStopFile();
  const my = ++AUDIO.token;
  try { if (AUDIO.supported) speechSynthesis.cancel(); } catch (e) {}
  Object.assign(LA, { state: 'playing', lines, mode, my, idx: from });
  laSync();
  const end = mode === 'one' ? from + 1 : lines.length;
  for (let i = from; i < end; i++) {
    if (AUDIO.token !== my) return false;
    LA.idx = i; laSync();
    const ok = await laSay(lines[i], my);
    if (AUDIO.token !== my) return false;
    if (!ok) { LA.state = 'idle'; laSync(); return false; }
    if (i < end - 1) await new Promise(r => setTimeout(r, (mode === 'parts' ? 650 : 380) / laState().speed));
  }
  if (AUDIO.token === my) { LA.state = 'idle'; LA.idx = 0; laSync(); }
  return true;
}
function laPause() { if (LA.state !== 'playing') return; LA.state = 'paused'; const keep = LA.idx; AUDIO.token++; laStopFile(); try { if (AUDIO.supported) speechSynthesis.cancel(); } catch (e) {} LA.idx = keep; laSync(); }
function laStop() { AUDIO.token++; laStopFile(); try { if (AUDIO.supported) speechSynthesis.cancel(); } catch (e) {} LA.state = 'idle'; LA.idx = 0; laSync(); }
function laSync() {
  const playing = LA.state === 'playing';
  document.body.classList.toggle('is-playing', playing);
  document.querySelectorAll('[data-la-toggle]').forEach(b => {
    b.innerHTML = (playing ? IC.pause : IC.play) + `<span>${playing ? 'Pausar' : LA.state === 'paused' ? 'Continuar' : 'Ouvir'}</span>`;
    b.setAttribute('aria-label', playing ? 'Pausar o áudio' : LA.state === 'paused' ? 'Continuar o áudio' : 'Ouvir o áudio');
  });
  document.querySelectorAll('.la-line').forEach(el => el.classList.toggle('playing', playing && LA.mode !== 'parts' && +el.dataset.i === LA.idx));
  document.querySelectorAll('.la-part').forEach(el => el.classList.toggle('playing', playing && LA.mode === 'parts' && +el.dataset.i === LA.idx));
}
if (!IC.pause) IC.pause = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.5" height="14" rx="1.2"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2"/></svg>';

/* ---------- componente: cartão de áudio ---------- */
function laSpeedSeg() {
  const sp = laState().speed;
  return `<div class="seg la-speed" role="group" aria-label="Velocidade">${LA_SPEEDS.map(v => `<button class="${sp === v ? 'on' : ''}" data-act="laSpeed" data-v="${v}" aria-pressed="${sp === v}">${String(v).replace('.', ',')}x</button>`).join('')}</div>`;
}
function laWho(sp) { const v = LA_VOICES[sp] || { name: sp, color: 'var(--muted)' }; return v; }
function laAvatar(sp, size = 28) {
  const p = typeof chPortrait === 'function' ? chPortrait(sp, size) : '';
  if (p) return p;
  const v = laWho(sp); return `<span class="la-av" style="width:${size}px;height:${size}px;background:${v.color}">${esc((v.name || '?')[0])}</span>`;
}
function laAudioCard(q, show) {
  const multi = q.lines.length > 1;
  let h = `<div class="audio-card la-audio">
    <button class="play-big" data-act="laToggle" data-la-toggle aria-label="Ouvir o áudio">${IC.play}<span>Ouvir</span></button>
    <div class="audio-ctrls"><button class="btn btn-ghost btn-small" data-act="laRestart">${IC.repeat.replace('<svg', '<svg width="18" height="18"')} ${multi ? 'Do começo' : 'Repetir'}</button>${q.parts && q.parts.length > 1 ? `<button class="btn btn-ghost btn-small" data-act="laParts">Por partes</button>` : ''}</div>
    <div class="la-speed-row"><span class="eyebrow">Velocidade</span>${laSpeedSeg()}</div>`;
  if (multi) {
    h += `<div class="la-lines" role="list">${q.lines.map((l, i) => { const v = laWho(l.sp); return `<div class="la-line" role="listitem" data-i="${i}"><button class="la-line-btn" data-act="laLine" data-i="${i}" aria-label="Ouvir a fala ${i + 1} (${esc(v.name)})">${laAvatar(l.sp, 30)}<span class="la-line-meta"><b style="color:${v.color}">${esc(v.name)}</b><span class="muted">Fala ${i + 1} · ouvir</span></span>${IC.play.replace('<svg', '<svg width="16" height="16"')}</button>${laTextHTML(l, show)}</div>`; }).join('')}</div>`;
  } else if (show.jp || show.ro || show.pt) h += laTextHTML(q.lines[0], show, true);
  if (q.parts && q.parts.length > 1 && (show.jp || show.ro)) h += `<div class="la-parts">${q.parts.map((p, i) => `<span class="la-part" data-i="${i}"><span class="jp">${show.jp ? esc(p.jp) : ''}</span>${show.ro ? `<span class="ro">${esc(p.ro)}</span>` : ''}</span>`).join('')}</div>`;
  if (audioBlocked() && !q.lines.some(l => l.audio)) h += `<div class="banner" style="margin:0">Sem voz japonesa neste aparelho. Modo leitura: mostre o romaji e leia em voz alta. <button class="link-btn" data-act="voiceHelp">Como ativar a voz</button></div>`;
  return h + '</div>';
}
function laTextHTML(l, show, big) {
  if (!show.jp && !show.ro && !show.pt) return '';
  return `<div class="la-text ${big ? 'big' : ''}">${show.jp ? `<span class="jp la-jp">${esc(l.jp)}</span>` : ''}${show.ro ? `<span class="ro">${esc(l.ro)}</span>` : ''}${show.pt ? `<span class="la-pt">${esc(l.pt)}</span>` : ''}</div>`;
}

/* ==========================================================
   EXERCÍCIOS
   ========================================================== */
function laLine(sp, s) { const t = laTL(s); return { sp, jp: t.jp, ro: t.ro, pt: t.pt, say: t.jp, audio: t.audio }; }
function laDialog(L, ex) { return (ex.d || L.d || []).map(([sp, s]) => laLine(sp, s)); }
function laPtPool(L, not) {
  const out = [], seen = new Set([not]);
  const add = pt => { if (pt && !seen.has(pt)) { seen.add(pt); out.push(pt); } };
  shuffle(L.wordRefs).forEach(r => add(ITEM[r.id].pt));
  shuffle(L.cat.lessons.flatMap(l => l.wordRefs)).forEach(r => add(ITEM[r.id].pt));
  shuffle(LA_LESSONS.flatMap(l => l.wordRefs)).forEach(r => add(ITEM[r.id].pt));
  return out;
}
/* palavras da lição presentes no áudio (para a revisão e o caderno) */
function laItemsIn(L, text) { const k = laKana(text); return L.wordRefs.filter(r => { const w = laKana(r.jp); return w.length >= 2 && k.includes(w); }).map(r => r.id); }
function laBuildQ(ex, L, n) {
  const sp = ex.sp || L.sp || 'aiko';
  const base = { t: ex.t, ex, L, n, lv: L.lv, why: ex.why || '', items: [], parts: null };
  const opts = (right, wrong, sub) => shuffle([{ label: right, correct: true, sub: sub ? sub[0] : '' }].concat(wrong.map((w, i) => ({ label: w, correct: false, sub: sub ? sub[i + 1] : '' }))));
  let q = null;
  if (ex.t === 'id') {
    const it = laWord(L, ex.w); if (!it) return null;
    const line = { sp, jp: it.jp, ro: it.ro, pt: it.pt, say: it.say || it.jp };
    q = { ...base, prompt: 'O que significa a palavra que você ouviu?', lines: [line], options: opts(it.pt, laPtPool(L, it.pt).slice(0, 3)), ans: it.pt, items: [it.id] };
  } else if (ex.t === 'rec') {
    const s = laLine(sp, ex.s), alts = ex.alts.map(laTL);
    q = { ...base, prompt: 'Qual destas você ouviu?', lines: [s], roOpts: true, options: shuffle([{ label: s.ro, sub: s.jp, correct: true }].concat(alts.map(a => ({ label: a.ro, sub: a.jp, correct: false })))), ans: s.ro };
  } else if (ex.t === 'mean') {
    const s = laLine(sp, ex.s);
    q = { ...base, prompt: 'O que a pessoa disse?', lines: [s], options: opts(s.pt, ex.alts), ans: s.pt };
  } else if (ex.t === 'spot') {
    const s = laLine(sp, ex.s);
    q = { ...base, prompt: ex.prompt || 'Qual destas palavras aparece no áudio?', lines: [s], options: opts(ex.ans, ex.alts), ans: ex.ans };
  } else if (ex.t === 'order') {
    const s = laLine(sp, ex.s), parts = ex.parts.map(p => { const [jp, ro] = p.split('|'); return { jp, ro }; });
    q = { ...base, prompt: 'Ouça e monte a frase na ordem em que foi dita.', lines: [s], parts, bank: shuffle(parts.map((p, i) => ({ ...p, i }))), answer: parts.map((_, i) => i), ans: parts.map(p => p.ro).join(' ') };
    if (q.bank.every((b, i) => b.i === i) && parts.length > 1) q.bank.push(q.bank.shift());
  } else if (ex.t === 'tf') {
    const lines = ex.s ? [laLine(sp, ex.s)] : laDialog(L, ex);
    q = { ...base, prompt: 'Ouça e responda: verdadeiro ou falso?', claim: ex.claim, lines, tf: true, options: [{ label: 'Verdadeiro', correct: !!ex.ans }, { label: 'Falso', correct: !ex.ans }], ans: ex.ans ? 'Verdadeiro' : 'Falso' };
  } else if (ex.t === 'intent') {
    const s = laLine(sp, ex.s), others = shuffle(Object.keys(LA_INTENTS).filter(k => k !== ex.ans)).slice(0, 3);
    q = { ...base, prompt: 'O que a pessoa está fazendo?', lines: [s], options: opts(LA_INTENTS[ex.ans], others.map(k => LA_INTENTS[k])), ans: LA_INTENTS[ex.ans] };
  } else if (ex.t === 'reply') {
    const s = laLine(sp, ex.s), ok = laTL(ex.ok), bad = ex.bad.map(laTL);
    q = { ...base, prompt: 'Ouça. Qual é a melhor resposta?', lines: [s], roOpts: true, replyOpts: true, options: shuffle([{ label: ok.ro, sub: ok.jp, pt: ok.pt, correct: true }].concat(bad.map(b => ({ label: b.ro, sub: b.jp, pt: b.pt, correct: false })))), ans: ok.ro + ' (' + ok.pt + ')' };
  } else if (ex.t === 'comp' || ex.t === 'gist') {
    const lines = laDialog(L, ex);
    q = { ...base, prompt: ex.q, lines, options: shuffle(ex.opts.map((o, i) => ({ label: o, correct: i === ex.ans }))), ans: ex.opts[ex.ans] };
  } else if (ex.t === 'line') {
    const dl = laDialog(L, ex), l = dl[ex.i]; if (!l) return null;
    q = { ...base, prompt: 'Ouça esta fala do diálogo (' + laWho(l.sp).name + '). O que ela significa?', lines: [l], options: opts(l.pt, ex.alts), ans: l.pt };
  } else if (ex.t === 'reg') {
    const s = laLine(sp, ex.s);
    q = { ...base, prompt: 'Como a pessoa está falando?', lines: [s], fixed: true, options: LA_REG.map(([k, t, d]) => ({ label: t, sub: d, correct: k === ex.ans })), ans: LA_REG.find(r => r[0] === ex.ans)[1], why: (ex.why ? ex.why + ' ' : '') + LA_REG_WHY[ex.ans] };
  }
  if (!q) return null;
  if (!q.items.length) q.items = laItemsIn(L, q.lines.map(l => l.jp).join(' ')).slice(0, 2);
  q.noPre = L.lv >= 5; // nível 5: menos apoio visual antes da resposta
  return q;
}
function laBuildLesson(L) { return L.ex.map((ex, i) => laBuildQ(ex, L, i)).filter(Boolean); }
function laBuildExam(c) {
  const per = Math.max(2, Math.ceil(10 / c.lessons.length));
  let qs = [];
  c.lessons.forEach(L => { shuffle(L.ex.map((ex, i) => [ex, i])).slice(0, per).forEach(([ex, i]) => { const q = laBuildQ(ex, L, i); if (q) qs.push(q); }); });
  return shuffle(qs).slice(0, 10);
}

/* ==========================================================
   PLAYER DA LISTENING ACADEMY
   ========================================================== */
function laStart(id, mode = 'lesson') {
  const L = LA_LESSON[id], c = LA_CAT[id];
  if (mode === 'lesson' && (!L || !laLessonUnlocked(L))) return;
  if (mode === 'exam' && (!c || !laExamUnlocked(c))) return;
  closeModal(); laStop();
  P = { kind: 'lacad', mode, L: L || null, C: c || (L && L.cat), phase: mode === 'exam' ? 'examIntro' : 'intro', startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  openPlayer(); renderPlayer();
}
function laSetupQs(qs) { Object.assign(P, { phase: 'q', qs, i: 0, correct: 0, graded: 0, errors: [], sel: null, built: [], answered: false, show: { jp: false, ro: false, pt: false }, hinted: false, autoplayed: -1 }); }
function laRender() {
  if (P.phase === 'intro') return laRenderIntro();
  if (P.phase === 'learn') return laRenderLearn();
  if (P.phase === 'examIntro') return laRenderExamIntro();
  if (P.phase === 'q') return laRenderQ();
  if (P.phase === 'result') return laRenderResult();
  return '';
}
function laRenderIntro() {
  const L = P.L, r = laState().lessons[L.id];
  const sps = [...new Set([L.sp].concat((L.d || []).map(x => x[0]), L.ex.map(e => e.sp).filter(Boolean)))].filter(Boolean);
  const nNew = L.wordRefs.filter(w => !(S.items[w.id] && S.items[w.id].seen)).length;
  const body = `<span class="mode-tag">Listening Academy · ${esc(L.cat.title)} · Nível ${L.lv}: ${esc(LA_LEVELS[L.lv])}</span>
    <h1 style="font-size:1.45rem">${esc(L.title)}</h1>${L.situ ? `<p class="muted" style="margin:0">${esc(L.situ)}</p>` : ''}
    <div class="theory-card"><p>${esc(L.intro)}</p></div>
    <div class="card la-how"><span class="eyebrow">Como funciona</span><ol class="steps"><li><b>Ouça</b> o áudio quantas vezes quiser, na velocidade que preferir.</li><li><b>Tente entender</b> e responda.</li><li>Depois, <b>revele</b> o japonês, o romaji e a tradução.</li></ol>${L.lv >= 5 ? '<p class="muted" style="margin:6px 0 0;font-size:.85rem">Nível 5: o texto só aparece depois da resposta.</p>' : '<p class="muted" style="margin:6px 0 0;font-size:.85rem">Se travar, você pode ver o japonês ou o romaji antes de responder. A resposta continua valendo (com menos XP).</p>'}</div>
    <div class="la-cast"><span class="eyebrow">Vozes nesta lição</span><div class="la-cast-row">${sps.map(s => `<span class="la-chip">${laAvatar(s, 26)}<span><b>${esc(laWho(s).name)}</b><small>${esc(laWho(s).style || '')}</small></span></span>`).join('')}</div></div>
    <p class="muted tabnum" style="margin:0;font-size:.85rem">${L.ex.length} exercícios · ${L.wordRefs.length} palavras e expressões${nNew ? ' · ' + nNew + ' nova' + (nNew > 1 ? 's' : '') : ''}${r ? ' · melhor nota ' + r.best + '%' : ''}</p>`;
  return playerShell(0, body, `<button class="btn btn-gold btn-block" data-act="laBegin">${nNew ? 'Conhecer as palavras novas' : 'Começar'}</button>`);
}
/* palavras novas: identificadas, explicadas, com romaji, escrita e áudio; vão para o Caderno e a Revisão */
function laRenderLearn() {
  const L = P.L, list = P.learn;
  const cards = list.map(w => { const it = ITEM[w.id]; return `<div class="card la-word"><div class="la-word-top"><span class="chip k-new">Nova</span><button class="icon-btn" data-act="laSayWord" data-id="${esc(it.id)}" aria-label="Ouvir ${esc(it.ro)}">${IC.sound}</button></div>
    <span class="jp la-word-jp">${esc(it.jp)}</span><span class="la-word-ro">${esc(it.ro)}</span><span class="la-word-pt">${esc(it.pt)}</span>${it.note ? `<span class="muted" style="font-size:.88rem">${esc(it.note)}</span>` : ''}</div>`; }).join('');
  const known = L.wordRefs.filter(w => !list.includes(w));
  const body = `<span class="mode-tag">Palavras novas · ${list.length}</span><h2>Antes de ouvir</h2>
    <p class="muted" style="margin:0">Toque no alto-falante para ouvir cada uma. Elas vão para o seu Caderno e para a Revisão.</p>
    <div class="la-words">${cards}</div>
    ${known.length ? `<div class="card"><span class="eyebrow">Você vai reencontrar</span><p style="margin:4px 0 0">${known.map(w => `<span class="jp">${esc(ITEM[w.id].jp)}</span> <span class="muted">(${esc(ITEM[w.id].ro)})</span>`).join(' · ')}</p></div>` : ''}`;
  return playerShell(0, body, `<button class="btn btn-gold btn-block" data-act="laToQs">Começar os exercícios</button>`);
}
function laRenderExamIntro() {
  const c = P.C, r = laState().exams[c.id];
  const body = `<div class="result-hero">${mascot('neutral', 110)}<span class="mode-tag">Avaliação da categoria</span><h2>${esc(c.title)}</h2>
    <p style="margin:0">10 exercícios auditivos das lições desta categoria. Acerte pelo menos <b>${LA_PASS}%</b> para concluir a categoria${LA_CATS[c.index + 1] ? ' e liberar “' + esc(LA_CATS[c.index + 1].title) + '”' : ''}.</p>
    <p class="muted" style="margin:0">Pode ouvir quantas vezes quiser. Tentativas ilimitadas.</p>${r ? `<p class="muted tabnum" style="margin:0">Tentativas: ${r.attempts} · melhor nota: ${r.best}%</p>` : ''}</div>`;
  return playerShell(0, body, `<button class="btn btn-gold btn-block" data-act="laExamGo">Começar avaliação</button>`);
}
function laOptHTML(o, i, q) {
  let cls = 'opt la-opt';
  if (P.answered) { if (o.correct) cls += ' right'; else if (i === P.sel) cls += ' wrong'; } else if (i === P.sel) cls += ' sel';
  // opções em romaji: a escrita japonesa só aparece se o aluno revelou o japonês (ou depois da resposta)
  const sub = q.roOpts ? ((P.show.jp || P.answered) && o.sub ? `<span class="o-ro jp">${esc(o.sub)}</span>` : '') : o.sub ? `<span class="o-ro">${esc(o.sub)}</span>` : '';
  const pt = q.replyOpts && P.answered && o.pt ? `<span class="o-ro">${esc(o.pt)}</span>` : '';
  return `<button class="${cls}" data-act="laOpt" data-i="${i}" ${P.answered ? 'disabled' : ''}><span>${esc(o.label)}</span>${sub}${pt}</button>`;
}
function laRenderQ() {
  const q = P.qs[P.i], isExam = P.mode === 'exam';
  const show = P.answered ? P.show : { jp: P.show.jp && !q.noPre, ro: P.show.ro && !q.noPre, pt: false };
  let body = `<span class="mode-tag ${isExam ? '' : 'rev'}">${isExam ? 'Avaliação' : 'Listening'} · ${esc(LA_TYPE[q.t] || '')}</span><div class="q-prompt">${esc(q.prompt)}</div>`;
  if (q.claim) body += `<div class="q-card la-claim"><span class="ctx">Afirmação</span><b>${esc(q.claim)}</b></div>`;
  body += laAudioCard(q, show);
  // ouvir primeiro: antes da resposta, só japonês e romaji (como dica); a tradução vem depois
  if (!P.answered && !q.noPre) body += `<div class="reveal-row"><button class="link-btn" data-act="laShow" data-k="jp">${P.show.jp ? 'Esconder japonês' : 'Ver japonês'}</button><button class="link-btn" data-act="laShow" data-k="ro">${P.show.ro ? 'Esconder romaji' : 'Ver romaji'}</button></div>${P.hinted ? '<p class="muted" style="margin:0;font-size:.8rem;text-align:center">Com dica, a resposta vale menos XP, mas conta como acerto.</p>' : ''}`;
  else if (!P.answered) body += `<p class="muted" style="margin:0;font-size:.85rem;text-align:center">Nível 5: ouça com atenção; o texto aparece depois da resposta.</p>`;
  let canCheck = P.sel !== null;
  if (q.bank) {
    const tile = (t, inLine) => `<button class="tile ${!inLine && P.built.includes(t.i) ? 'used' : ''}" data-act="${inLine ? 'laUnbuild' : 'laBuild'}" data-i="${t.i}" ${P.answered ? 'disabled' : ''}><span class="t-jp" style="font-family:var(--f-body)">${esc(t.ro)}</span>${P.show.jp || P.answered ? `<span class="t-ro jp">${esc(t.jp)}</span>` : ''}</button>`;
    body += `<div class="answer-line ${P.built.length ? '' : 'empty'}">${P.built.map(i => tile(q.bank.find(b => b.i === i), true)).join('')}</div><div class="bank">${q.bank.map(t => tile(t, false)).join('')}</div>`;
    canCheck = P.built.length === q.bank.length;
  } else body += `<div class="opts ${q.tf ? 'grid' : ''}">${q.options.map((o, i) => laOptHTML(o, i, q)).join('')}</div>`;
  let foot, footCls = '';
  if (!P.answered) foot = `<button class="btn btn-primary btn-block" data-act="laCheck" ${canCheck ? '' : 'disabled'}>Verificar</button>`;
  else {
    const ok = P.lastOk; footCls = ok ? 'ok' : 'bad';
    const tg = (k, t) => `<button class="filter ${P.show[k] ? 'on' : ''}" data-act="laShow" data-k="${k}" aria-pressed="${!!P.show[k]}">${t}</button>`;
    foot = `<div class="fb">${mascot(ok ? 'happy' : 'sad', 50, 'hop')}<div class="fb-text"><h3>${esc(P.fbTitle)}</h3>${!ok ? `<p class="answer">Resposta certa: ${esc(q.ans)}</p>` : ''}${q.why ? `<p>${esc(q.why)}</p>` : ''}
      <div class="la-reveal"><span class="eyebrow">Revelar</span><div class="filters">${tg('jp', 'Japonês')}${tg('ro', 'Romaji')}${tg('pt', 'Tradução')}<button class="filter" data-act="laShowAll">Tudo</button></div></div></div></div>
      <button class="btn ${ok ? 'btn-ok' : 'btn-bad'} btn-block" data-act="laNextQ">Continuar</button>`;
  }
  return playerShell(P.i / P.qs.length, body, foot, footCls, (P.i + 1) + '/' + P.qs.length);
}
function laCheck() {
  const q = P.qs[P.i]; if (P.answered) return;
  let ok;
  if (q.bank) { if (P.built.length !== q.bank.length) return; ok = P.built.join(',') === q.answer.join(','); }
  else { if (P.sel === null) return; ok = !!q.options[P.sel].correct; }
  P.answered = true; P.lastOk = ok; P.fbTitle = ok ? pick(MSG.correct) : pick(MSG.wrong);
  sfx(ok ? 'ok' : 'bad');
  const a = laState(), ctx = 'lacad:' + (P.L ? P.L.id : P.C.id);
  // integra com a revisão: a palavra principal do áudio entra no SRS; sem palavra, conta só a habilidade auditiva
  if (q.items.length) q.items.forEach((id, k) => { if (k === 0) recordAnswer(id, ok, ctx, 'audicao'); else if (ok) markSeen(id); });
  else recordAnswer(null, ok, ctx, 'audicao');
  if (ok) q.items.forEach(id => { a.words[id] = Date.now(); });
  a.stats.a++; if (ok) a.stats.c++;
  const bc = a.stats.byCat[q.L.cat.id] || (a.stats.byCat[q.L.cat.id] = { a: 0, c: 0 }); bc.a++; if (ok) bc.c++;
  const bt = a.stats.byType[q.t] || (a.stats.byType[q.t] = { a: 0, c: 0 }); bt.a++; if (ok) bt.c++;
  missionEvent('listen');
  P.graded++; if (ok) P.correct++; else P.errors.push(q);
  addXP(ok ? (P.hinted ? 4 : 8) : 1);
  save();
  P.keepScroll = true; renderPlayer();
  const f = $('.p-foot .btn'); if (f) f.focus({ preventScroll: true });
}
function laNextQ() {
  laStop();
  P.i++; Object.assign(P, { sel: null, built: [], answered: false, show: { jp: false, ro: false, pt: false }, hinted: false });
  if (P.i >= P.qs.length) return laFinish();
  renderPlayer();
}
function laFinish() {
  const a = laState(), pct = P.graded ? Math.round(P.correct / P.graded * 100) : 0, pass = pct >= LA_PASS;
  a.stats.ms += Math.min(Date.now() - (P.startedAt || Date.now()), P.graded * 120000);
  touchStudy();
  if (P.mode === 'lesson') {
    const L = P.L, r = a.lessons[L.id] || (a.lessons[L.id] = { passed: false, best: 0, attempts: 0 });
    const first = pass && !r.passed;
    r.attempts++; r.best = Math.max(r.best, pct); r.last = pct; r.at = Date.now();
    if (pass) { if (first) { r.passed = true; r.passedAt = Date.now(); addXP(30); addCoins(10); } else { addXP(5); addCoins(2); } missionEvent('lesson_pass'); }
    if (pass && L.d) { const d = a.dialogs[L.id]; a.dialogs[L.id] = { best: Math.max(pct, d ? d.best : 0), at: Date.now(), times: (d ? d.times : 0) + 1 }; missionEvent('dialog_done'); }
    P.firstPass = first;
  } else {
    const c = P.C, r = a.exams[c.id] || (a.exams[c.id] = { passed: false, best: 0, attempts: 0 });
    const first = pass && !r.passed;
    r.attempts++; r.best = Math.max(r.best, pct); r.last = pct; r.at = Date.now();
    if (pass) { if (first) { r.passed = true; r.passedAt = Date.now(); addXP(100); addCoins(30); } else { addXP(10); addCoins(3); } }
    P.firstPass = first;
  }
  if (pct === 100) { addXP(10); }
  P.pct = pct; P.pass = pass; P.phase = 'result';
  checkAchievements(); saveNow();
  if (pass) { sfx('level'); confetti(); }
  renderPlayer();
}
function laRenderResult() {
  const g = sessionGain || { xp: 0, coins: 0 }, isExam = P.mode === 'exam';
  const title = P.pass ? (isExam ? 'Categoria concluída!' : 'Lição concluída!') : 'Quase lá!';
  let msg;
  if (P.pass) {
    if (isExam) msg = P.firstPass && LA_CATS[P.C.index + 1] ? 'Você liberou o próximo passo: ' + LA_CATS[P.C.index + 1].title + (laCatMissing(LA_CATS[P.C.index + 1]).length ? ' (depois de: ' + laCatMissing(LA_CATS[P.C.index + 1]).join(', ') + ')' : '') + '.' : 'Seu ouvido está cada vez mais afiado.';
    else msg = P.pct === 100 ? 'Você entendeu tudo! ' : 'Muito bem! ';
    if (!isExam) msg += P.firstPass ? 'A próxima etapa foi liberada.' : 'Repetir é ótimo para fixar.';
  } else msg = 'Você precisa de ' + LA_PASS + '% para concluir. Ouça de novo as partes difíceis (em 0,75x, se precisar) e tente outra vez.';
  const errs = P.errors.length ? `<section class="section"><h2 style="font-size:1.05rem">Para ouvir de novo</h2><div class="card">${P.errors.map((q, k) => `<div class="err-item"><b>${esc(q.prompt)}</b>${q.lines.length === 1 ? `<span class="jp">${esc(q.lines[0].jp)}</span><span class="ro">${esc(q.lines[0].ro)} · ${esc(q.lines[0].pt)}</span>` : ''}<span>Resposta: ${esc(q.ans)}</span>${AUDIO.supported || q.lines.some(l => l.audio) ? `<button class="link-btn" style="padding:2px 0;align-self:flex-start" data-act="laErrPlay" data-k="${k}">Ouvir de novo</button>` : ''}</div>`).join('')}</div></section>` : '';
  const next = laNext();
  const nextBtn = P.pass && next && next.lesson && next.lesson !== P.L ? `<button class="btn btn-ghost btn-block" data-act="laNextLesson" data-id="${next.lesson.id}">Próxima: ${esc(next.lesson.title)}</button>` : P.pass && next && next.exam && !isExam ? `<button class="btn btn-ghost btn-block" data-act="laNextExam" data-id="${next.exam.id}">Fazer a avaliação da categoria</button>` : '';
  const body = `<div class="result-hero">${mascot(P.pass ? 'wow' : 'neutral', 120, 'hop')}<h2>${title}</h2><div class="score-big ${P.pass ? 'pass' : 'fail'}">${P.pct}%</div>
    <p class="muted tabnum" style="margin:0">${P.correct} de ${P.graded} respostas certas</p><p style="margin:0">${esc(msg)}</p>
    <div class="reward-row"><div class="reward"><b>+${g.xp}</b><span>XP</span></div><div class="reward"><b>+${g.coins}</b><span>moedas</span></div><div class="reward"><b>${Object.keys(laState().words).length}</b><span>palavras reconhecidas</span></div></div></div>${errs}`;
  const foot = P.pass ? `<button class="btn btn-gold btn-block" data-act="laExit">Concluir</button>${nextBtn}` : `<button class="btn btn-gold btn-block" data-act="laRetry">Tentar de novo</button><button class="btn btn-ghost btn-block" data-act="laExit">Sair</button>`;
  return playerShell(1, body, foot);
}
function laAfterRender() {
  if (!P || P.kind !== 'lacad' || P.phase !== 'q' || P.answered) { laSync(); return; }
  const q = P.qs[P.i];
  if (P.autoplayed !== P.i && (!audioBlocked() || q.lines.some(l => l.audio))) { P.autoplayed = P.i; setTimeout(() => { if (P && P.kind === 'lacad' && P.qs && P.qs[P.i] === q && !P.answered && LA.state === 'idle') laPlay(q.lines, 0, 'all'); }, 350); }
  laSync();
}
const _laRenderPlayer = renderPlayer;
renderPlayer = function () {
  if (P && P.kind === 'lacad' && P.phase !== 'confirmExit') {
    const el = $('#player'); el.innerHTML = laRender();
    const b = $('#pBody'); if (b && !P.keepScroll) b.scrollTop = 0; P.keepScroll = false;
    laAfterRender(); return;
  }
  _laRenderPlayer();
};
const _laClosePlayer = closePlayer;
closePlayer = function () { laStop(); _laClosePlayer(); };

/* ==========================================================
   TELA: LISTENING ACADEMY
   ========================================================== */
const laUI = { open: {} };
function laStats() {
  const a = laState();
  const lessons = LA_LESSONS.filter(l => laLessonPassed(l.id)).length, cats = LA_CATS.filter(c => laExamPassed(c.id)).length;
  return { a, lessons, cats, words: Object.keys(a.words).length, dialogs: Object.keys(a.dialogs).length, acc: a.stats.a ? Math.round(a.stats.c / a.stats.a * 100) : 0 };
}
function viewLA() {
  const st = laStats(), nx = laNext();
  const offs = [0, 46, 70, 46, 0, -46, -70, -46];
  let cont;
  if (nx && nx.lesson) cont = `<button class="btn btn-gold btn-block" data-act="laOpen" data-id="${nx.lesson.id}">${laState().lessons[nx.lesson.id] ? 'Continuar' : 'Começar'}: ${esc(nx.lesson.title)}</button>`;
  else if (nx && nx.exam) cont = `<button class="btn btn-gold btn-block" data-act="laExamOpen" data-id="${nx.exam.id}">Avaliação: ${esc(nx.exam.title)}</button>`;
  else if (nx && nx.locked) cont = `<div class="banner" style="margin:0">${esc(laReqText(nx.locked))}</div>`;
  else cont = `<div class="banner" style="margin:0">Você concluiu toda a Listening Academy! Refaça as lições em 1,25x ou 1,5x para treinar a velocidade natural.</div>`;
  const cats = LA_CATS.map(c => {
    const unlocked = laCatUnlocked(c), p = laCatProgress(c), complete = p.done === p.tot;
    const open = laUI.open[c.id] != null ? laUI.open[c.id] : unlocked && !complete;
    const chev = `<svg class="chev ${open ? 'open' : ''}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
    const sub = !unlocked ? 'Bloqueada' : complete ? 'Concluída' : p.done + ' de ' + p.tot + ' etapas';
    const head = `<button class="wing-head wing-btn ${unlocked ? '' : 'locked'} ${complete ? 'done-wing' : ''}" data-act="laCatToggle" data-id="${c.id}" aria-expanded="${open}"><div class="emb">${esc(c.emblem)}</div><div class="meta"><span class="sub">Categoria ${c.n} · <span class="jp">${esc(c.jp)}</span> · Nível ${c.lv}${c.lessons.some(l => l.lv > c.lv) ? '–' + Math.max(...c.lessons.map(l => l.lv)) : ''}</span><h2>${esc(c.title)}</h2><span class="sub">${sub}</span></div>${unlocked ? '' : IC.lock}${chev}</button>`;
    if (!open) return `<section class="wing" id="la-${c.id}">${head}${!unlocked ? `<p class="muted" style="margin:8px 4px 0;font-size:.85rem">${esc(laReqText(c))}</p>` : ''}</section>`;
    let k = 0;
    const nodes = c.lessons.map(L => {
      const done = laLessonPassed(L.id), lopen = laLessonUnlocked(L), cur = nx && nx.lesson === L, best = laState().lessons[L.id] ? laState().lessons[L.id].best : null;
      return `<button class="node ${done ? 'done' : lopen ? 'open' : ''} ${cur ? 'current' : ''}" style="transform:translateX(${offs[k++ % 8]}px)" data-act="laOpen" data-id="${L.id}" aria-label="${esc(L.title)}${done ? ' (concluída)' : lopen ? '' : ' (bloqueada)'}"><span class="disc jp">${lopen || done ? esc(L.emblem) : IC.lock}</span>${done && best != null ? `<span class="badge">${best}%</span>` : ''}<span class="lbl">${esc(L.title)}</span></button>`;
    });
    const eDone = laExamPassed(c.id), eOpen = laExamUnlocked(c);
    nodes.push(`<button class="node exam ${eDone ? 'done' : eOpen ? 'open' : ''} ${nx && nx.exam === c ? 'current' : ''}" style="transform:translateX(${offs[k++ % 8]}px)" data-act="laExamOpen" data-id="${c.id}"><span class="disc jp">${eOpen || eDone ? '試' : IC.lock}</span>${eDone ? `<span class="badge">${laState().exams[c.id].best}%</span>` : ''}<span class="lbl">Avaliação</span></button>`);
    return `<section class="wing" id="la-${c.id}">${head}<p class="muted" style="margin:10px 4px 0;font-size:.88rem">${esc(c.desc)}</p>${!unlocked ? `<p class="muted" style="margin:6px 4px 0;font-size:.88rem"><b>${esc(laReqText(c))}</b></p>` : ''}<div class="path">${nodes.join('')}</div></section>`;
  }).join('');
  return `<div class="wrap">
    <div class="aud-hero"><div class="aud-hero-in">${mascot('happy', 64)}<div style="min-width:0"><span class="jp" style="color:#ffd877;letter-spacing:.14em;font-size:.8rem">リスニング・アカデミー</span><h1 style="font-size:1.35rem">Listening Academy</h1><p style="margin:2px 0 0;font-size:.9rem;opacity:.9">Ouça primeiro, entenda depois. Palavras, frases, perguntas, diálogos e conversas naturais, no seu ritmo.</p></div></div></div>
    <section class="section">${audioStatusCard()}<p class="muted" style="margin:6px 2px 0;font-size:.82rem">${esc(laVoiceInfo())}</p></section>
    <section class="section">${cont}</section>
    <section class="section"><div class="stats-grid">
      <div class="kpi"><b>${st.cats}<small class="muted" style="font-size:.9rem">/${LA_CATS.length}</small></b><span>categorias concluídas</span></div>
      <div class="kpi"><b>${st.lessons}<small class="muted" style="font-size:.9rem">/${LA_LESSONS.length}</small></b><span>lições concluídas</span></div>
      <div class="kpi"><b>${st.words}</b><span>palavras reconhecidas</span></div>
      <div class="kpi"><b>${st.dialogs}</b><span>diálogos compreendidos</span></div></div>
      <p class="muted tabnum" style="margin:6px 2px 0;font-size:.82rem">${st.a.stats.c} acertos e ${st.a.stats.a - st.a.stats.c} erros${st.a.stats.a ? ' · ' + st.acc + '% de acertos' : ''} · sem metas diárias obrigatórias: avance no seu ritmo.</p></section>
    ${cats}
    <section class="section"><div class="card mascot-tip" style="align-items:center"><span class="mod-ic big">${IC.headphones}</span><div class="grow" style="min-width:0"><b>Treinos livres</b><p class="muted" style="margin:2px 0 0;font-size:.85rem">Sons parecidos, Detetive dos Animes, Laboratório de Diálogos e mais.</p></div><button class="btn btn-small btn-ghost" data-act="acadMode" data-mode="aud">Abrir</button></div></section>
  </div>`;
}
function laProfileStats() {
  const st = laStats(), pct = o => o && o.a ? Math.round(o.c / o.a * 100) + '%' : '—';
  return `<section class="section"><h2 style="font-size:1.1rem">Listening Academy</h2><div class="stats-grid">
    <div class="kpi"><b>${st.cats}/${LA_CATS.length}</b><span>categorias concluídas</span></div><div class="kpi"><b>${st.lessons}/${LA_LESSONS.length}</b><span>lições concluídas</span></div>
    <div class="kpi"><b>${st.words}</b><span>palavras reconhecidas</span></div><div class="kpi"><b>${st.dialogs}</b><span>diálogos compreendidos</span></div>
    <div class="kpi"><b class="tabnum">${st.a.stats.c}/${st.a.stats.a - st.a.stats.c}</b><span>acertos / erros</span></div><div class="kpi"><b>${fmtMin(st.a.stats.ms)}</b><span>tempo de escuta (medido nas lições)</span></div></div>
    <div class="card"><span class="eyebrow">Acertos por categoria</span><div class="list">${LA_CATS.map(c => `<div class="row"><span class="grow">${c.n}. ${esc(c.title)}</span><span class="muted tabnum">${(st.a.stats.byCat[c.id] || {}).a || 0} respostas · ${pct(st.a.stats.byCat[c.id])}</span></div>`).join('')}</div></div></section>`;
}
function laHomeCard() {
  const nx = laNext(), st = laStats();
  const t = nx && nx.lesson ? nx.lesson.title : nx && nx.exam ? 'Avaliação: ' + nx.exam.title : nx && nx.locked ? nx.locked.title : 'Tudo concluído';
  return `<section class="section"><div class="card aud-home"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big">${IC.headphones}</span><div style="min-width:0"><span class="eyebrow">Novo · Listening Academy</span><h3 style="font-size:1.05rem">Entenda japonês falado</h3><span class="muted tabnum" style="font-size:.85rem">${st.lessons}/${LA_LESSONS.length} lições · ${st.words} palavras reconhecidas · próximo: ${esc(t)}</span></div></div>
    <div class="row-btns">${nx && nx.lesson ? `<button class="btn btn-primary btn-small" data-act="laOpen" data-id="${nx.lesson.id}">Continuar</button>` : ''}<button class="btn btn-ghost btn-small" data-act="gotoLA">Abrir</button><button class="btn btn-ghost btn-small" data-act="listen" data-type="misto">Treino rápido</button></div></div></section>`;
}
/* revisão auditiva: palavras e frases da Listening Academy que já foram apresentadas */
function laReviewIds() { return seenItems().filter(id => LA_LESSONS.some(L => L.wordRefs.some(w => w.id === id))); }

/* ---------- integrações com as telas existentes ---------- */
homeListenCard = function () { return laHomeCard(); };
const _laProfileListen = profileListenStats;
profileListenStats = function () { return laProfileStats() + _laProfileListen(); };
const _laOrigin = originOf;
originOf = function (it) { return it && it.lesson && it.lesson.la ? 'Listening Academy · ' + it.lesson.title : _laOrigin(it); };
const _laBuildReview = buildReview;
buildReview = function (mode) {
  if (mode !== 'la') return _laBuildReview(mode);
  const ids = laReviewIds().sort((a, b) => (S.items[b].w - S.items[b].c * .3) - (S.items[a].w - S.items[a].c * .3) + (Math.random() - .5));
  return shuffle(ids.slice(0, 10).map(id => { const it = ITEM[id]; return genListenQ(it, groupOf(it) === 'frase' ? 'phrase' : 'word', S.listening.level); }).filter(Boolean));
};

/* ---------- ações ---------- */
Object.assign(ACT, {
  gotoLA: () => { S.settings.academyMode = 'la'; go('academia'); },
  laCatToggle: el => { const c = LA_CAT[el.dataset.id]; if (!c) return; const p = laCatProgress(c); const cur = laUI.open[c.id] != null ? laUI.open[c.id] : laCatUnlocked(c) && p.done < p.tot; laUI.open[c.id] = !cur; render(); },
  laOpen: el => {
    const L = LA_LESSON[el.dataset.id]; if (!L) return;
    if (!laLessonUnlocked(L)) { toast('鍵', laCatUnlocked(L.cat) ? 'Conclua a lição anterior (' + LA_PASS + '% ou mais) para liberar esta.' : laReqText(L.cat)); return; }
    const r = laState().lessons[L.id];
    const words = L.wordRefs.map(w => ITEM[w.id]);
    openModal(`<div class="mascot-tip">${mascot('happy', 60)}<div><span class="eyebrow">Listening · ${esc(L.cat.title)} · Nível ${L.lv}</span><h2>${esc(L.title)}</h2></div></div>
      <p style="margin:0">${esc(L.situ || L.intro)}</p>
      <div><span class="eyebrow">Você vai ouvir</span><p style="margin:4px 0 0">${words.map(it => `<span class="jp">${esc(it.jp)}</span>`).join('　')}</p></div>
      ${r ? `<p class="muted tabnum" style="margin:0">${r.passed ? 'Concluída' : 'Ainda não concluída'} · melhor nota ${r.best}% · ${r.attempts} tentativa${r.attempts === 1 ? '' : 's'}</p>` : ''}
      <button class="btn btn-gold btn-block" data-act="laGo" data-id="${L.id}">${r && r.passed ? 'Refazer lição' : 'Começar lição'}</button>
      <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>`);
  },
  laGo: el => laStart(el.dataset.id, 'lesson'),
  laExamOpen: el => { const c = LA_CAT[el.dataset.id]; if (!c) return; if (!laExamUnlocked(c)) { toast('鍵', laCatUnlocked(c) ? 'Conclua todas as lições da categoria para liberar a avaliação.' : laReqText(c)); return; } laStart(c.id, 'exam'); },
  laBegin: () => { const L = P.L; const fresh = L.wordRefs.filter(w => !(S.items[w.id] && S.items[w.id].seen)); if (fresh.length) { P.learn = fresh; P.phase = 'learn'; fresh.forEach(w => markSeen(w.id)); renderPlayer(); } else { laSetupQs(laBuildLesson(L)); renderPlayer(); } },
  laToQs: () => { laStop(); laSetupQs(laBuildLesson(P.L)); renderPlayer(); },
  laExamGo: () => { laSetupQs(laBuildExam(P.C)); renderPlayer(); },
  laSayWord: el => { const it = ITEM[el.dataset.id]; if (it) laPlay([{ sp: P.L.sp, jp: it.jp, say: it.say || it.jp }], 0, 'one'); },
  laToggle: () => {
    const q = P && P.qs && P.qs[P.i]; if (!q) return;
    if (LA.state === 'playing') laPause();
    else if (LA.state === 'paused' && LA.lines === q.lines) laPlay(q.lines, LA.idx, LA.mode === 'one' ? 'one' : 'all');
    else laPlay(q.lines, 0, 'all');
  },
  laRestart: () => { const q = P.qs[P.i]; laPlay(q.lines, 0, 'all'); },
  laLine: el => { const q = P.qs[P.i]; laPlay(q.lines, +el.dataset.i, 'one'); },
  laParts: () => { const q = P.qs[P.i]; if (!q.parts) return; const sp = q.lines[0].sp; laPlay(q.parts.map(p => ({ sp, jp: p.jp, say: p.jp })), 0, 'parts'); },
  laSpeed: el => {
    laState().speed = +el.dataset.v; save();
    document.querySelectorAll('.la-speed button').forEach(b => { const on = +b.dataset.v === laState().speed; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    const q = P && P.qs && P.qs[P.i]; if (q && LA.state === 'playing') laPlay(q.lines, LA.idx, LA.mode);
  },
  laShow: el => { const k = el.dataset.k; P.show[k] = !P.show[k]; if (!P.answered && P.show[k]) P.hinted = true; P.keepScroll = true; renderPlayer(); },
  laShowAll: () => { P.show = { jp: true, ro: true, pt: true }; P.keepScroll = true; renderPlayer(); },
  laOpt: el => { if (P.answered) return; P.sel = +el.dataset.i; P.keepScroll = true; renderPlayer(); },
  laBuild: el => { if (P.answered) return; const i = +el.dataset.i; if (!P.built.includes(i)) P.built.push(i); P.keepScroll = true; renderPlayer(); },
  laUnbuild: el => { if (P.answered) return; P.built = P.built.filter(x => x !== +el.dataset.i); P.keepScroll = true; renderPlayer(); },
  laCheck: () => laCheck(),
  laNextQ: () => laNextQ(),
  laErrPlay: el => { const q = P.errors[+el.dataset.k]; if (q) laPlay(q.lines, 0, 'all'); },
  laRetry: () => { const m = P.mode, id = m === 'exam' ? P.C.id : P.L.id; closePlayer(); laStart(id, m); },
  laExit: () => closePlayer(),
  laNextLesson: el => { closePlayer(); ACT.laOpen(el); },
  laNextExam: el => { closePlayer(); laStart(el.dataset.id, 'exam'); }
});

/* novidade da 6.0: aviso único para quem já usava o app */
setTimeout(() => { try { if (S.profile.onboarded && S.lacad && !S.lacad.news) { S.lacad.news = Date.now(); save(); toast('聴', 'Novo na 6.0: Listening Academy! Abra Academia → Listening para treinar o ouvido.'); } } catch (e) {} }, 1200);
