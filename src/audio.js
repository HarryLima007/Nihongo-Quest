/* ==========================================================
   Nihongo Quest 2.0 — Academia Auditiva
   Áudio (speechSynthesis), treino auditivo, Detetive dos Animes,
   Expressões do Cotidiano, Laboratório de Diálogos e Caderno expandido.
   ========================================================== */

/* ---------- ícones extras ---------- */
Object.assign(IC, {
  headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="2.5" y="14" width="5" height="7" rx="2"/><rect x="16.5" y="14" width="5" height="7" rx="2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M18 9h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3h-4"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z"/></svg>'
});

/* ==========================================================
   MOTOR DE ÁUDIO
   status: checking | ok | unknown (motor existe, lista de vozes vazia)
           | missing (sem voz japonesa) | unsupported
   ========================================================== */
const RATES = { lenta: 0.7, normal: 0.95, rapida: 1.15 };
const AUDIO = { supported: typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window, voices: [], ja: null, loaded: false, status: 'checking', token: 0, lastWarn: 0 };
function pickJaVoice(vs) {
  const norm = v => String(v.lang || '').replace('_', '-').toLowerCase();
  let list = vs.filter(v => norm(v) === 'ja-jp');
  if (!list.length) list = vs.filter(v => norm(v).startsWith('ja'));
  if (!list.length) return null;
  return list.find(v => v.localService) || list[0];
}
function refreshVoices() {
  if (!AUDIO.supported) { AUDIO.status = 'unsupported'; return; }
  let vs = [];
  try { vs = speechSynthesis.getVoices() || []; } catch (e) {}
  AUDIO.voices = vs; AUDIO.ja = pickJaVoice(vs);
  if (AUDIO.ja) AUDIO.status = 'ok';
  else if (vs.length && AUDIO.status !== 'heard') AUDIO.status = AUDIO.loaded ? 'missing' : 'checking';
  else if (!vs.length && AUDIO.status !== 'heard') AUDIO.status = AUDIO.loaded ? 'unknown' : 'checking';
  updateAudioUI();
}
function initAudio() {
  if (!AUDIO.supported) { AUDIO.status = 'unsupported'; return; }
  refreshVoices();
  try { if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', refreshVoices); else speechSynthesis.onvoiceschanged = refreshVoices; } catch (e) {}
  let tries = 0;
  const poll = setInterval(() => { tries++; if (AUDIO.ja || tries >= 12) { clearInterval(poll); AUDIO.loaded = true; } refreshVoices(); }, 250);
}
function audioOK() { return AUDIO.status === 'ok' || AUDIO.status === 'heard'; }
function audioBlocked() { return AUDIO.status === 'missing' || AUDIO.status === 'unsupported'; }
function audioStatusText() {
  return {
    checking: 'Procurando vozes no aparelho...',
    ok: 'Voz encontrada: ' + (AUDIO.ja ? AUDIO.ja.name : 'japonês'),
    heard: 'Voz japonesa funcionando.',
    unknown: 'O navegador não listou as vozes. Toque em Testar para conferir.',
    missing: 'Nenhuma voz japonesa instalada. Toque em Testar para ver como ativar.',
    unsupported: 'Este navegador não tem leitura em voz alta.'
  }[AUDIO.status] || '';
}
function updateAudioUI() {
  document.querySelectorAll('[data-audio-status]').forEach(el => { el.textContent = audioStatusText(); });
  document.querySelectorAll('[data-audio-dot]').forEach(el => { el.dataset.state = audioOK() ? 'ok' : audioBlocked() ? 'bad' : 'wait'; });
}
function cleanSay(t) { return String(t || '').replace(/[「」『』＿…〜~]/g, ' ').replace(/\s+/g, ' ').trim(); }
function setPlaying(on, key) {
  document.body.classList.toggle('is-playing', !!on);
  document.querySelectorAll('.dlg-line.playing').forEach(el => el.classList.remove('playing'));
  if (on && key != null) { const el = document.querySelector('.dlg-line[data-line="' + key + '"]'); if (el) el.classList.add('playing'); }
}
function stopAudio() { AUDIO.token++; try { if (AUDIO.supported) speechSynthesis.cancel(); } catch (e) {} setPlaying(false); }
function audioProblem(force) {
  if (!force && Date.now() - AUDIO.lastWarn < 15000) return;
  AUDIO.lastWarn = Date.now();
  toast('音', AUDIO.status === 'unsupported' ? 'Este navegador não reproduz voz. Use o Chrome atualizado no Android.' : 'Não há voz japonesa neste aparelho. Veja em Perfil → Voz japonesa → Testar como ativar.');
}
/* Fala um texto em japonês. Resolve true quando terminou de tocar. Nunca toca dois áudios ao mesmo tempo. */
function speak(text, opts = {}) {
  return new Promise(resolve => {
    if (!AUDIO.supported || AUDIO.status === 'unsupported') { AUDIO.status = 'unsupported'; audioProblem(); return resolve(false); }
    if (AUDIO.status === 'missing') { audioProblem(); return resolve(false); }
    const my = ++AUDIO.token;
    try { speechSynthesis.cancel(); } catch (e) {}
    setTimeout(() => {
      if (my !== AUDIO.token) return resolve(false);
      let u;
      try { u = new SpeechSynthesisUtterance(cleanSay(text)); } catch (e) { AUDIO.status = 'unsupported'; audioProblem(); return resolve(false); }
      u.lang = 'ja-JP'; if (AUDIO.ja) u.voice = AUDIO.ja;
      u.rate = opts.rate || RATES[S.settings.rate] || RATES.normal; u.pitch = opts.pitch || 1;
      let started = false;
      const guard = setTimeout(() => {
        if (started || my !== AUDIO.token) return;
        // nada começou a tocar: sem voz utilizável (não fingimos que tocou)
        if (!audioOK()) { AUDIO.status = 'missing'; updateAudioUI(); audioProblem(true); }
        try { speechSynthesis.cancel(); } catch (e) {}
        setPlaying(false); resolve(false);
      }, 4500);
      u.onstart = () => { started = true; if (!audioOK()) { AUDIO.status = 'heard'; updateAudioUI(); } setPlaying(true, opts.key); };
      u.onend = () => { clearTimeout(guard); if (my === AUDIO.token) setPlaying(false); resolve(my === AUDIO.token && started); };
      u.onerror = e => {
        clearTimeout(guard); if (my === AUDIO.token) setPlaying(false);
        if (e && /language-unavailable|voice-unavailable|synthesis-unavailable|synthesis-failed/.test(e.error || '')) { AUDIO.status = 'missing'; updateAudioUI(); audioProblem(true); }
        resolve(false);
      };
      try { if (speechSynthesis.paused) speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { clearTimeout(guard); resolve(false); }
    }, 70);
  });
}
/* toca uma sequência de falas (diálogos), cada personagem com tom diferente */
async function speakSeq(lines) {
  const my = ++AUDIO.token;
  for (let i = 0; i < lines.length; i++) {
    if (my !== AUDIO.token) return false;
    AUDIO.token = my - 1; // speak() incrementa; mantém a sequência como dona do token
    const ok = await speak(lines[i].say || lines[i].jp, { pitch: (CHARS[lines[i].sp] || {}).pitch || 1, key: lines[i].key });
    if (!ok || AUDIO.token !== my) return false;
    await new Promise(r => setTimeout(r, 350));
  }
  return true;
}
const speakBtn = text => AUDIO.supported ? `<button class="icon-btn" data-act="speak" data-text="${esc(text)}" aria-label="Ouvir pronúncia">${IC.sound}</button>` : '';
function rateSeg() {
  return `<div class="seg rate-seg" role="group" aria-label="Velocidade">${[['lenta', 'Lenta'], ['normal', 'Normal'], ['rapida', 'Rápida']].map(([v, t]) => `<button class="${S.settings.rate === v ? 'on' : ''}" data-act="rate" data-val="${v}">${t}</button>`).join('')}</div>`;
}
function voiceHelpHTML() {
  return `<div class="stack" style="gap:10px">
    <p style="margin:0"><b>Como ativar a voz japonesa no Android</b> (o caminho muda um pouco conforme a marca do celular):</p>
    <ol class="steps"><li>Abra <b>Configurações</b> do Android.</li><li>Procure por <b>“Saída de texto para voz”</b> (às vezes em Sistema → Idiomas e entrada, ou em Gerenciamento geral nos Samsung).</li><li>Em Mecanismo preferido, escolha <b>“Serviços de fala do Google”</b>.</li><li>Toque na engrenagem ⚙ → <b>Instalar dados de voz</b> → <b>Japonês (日本語)</b> e baixe.</li><li>Feche o Chrome por completo e abra o Nihongo Quest de novo.</li></ol>
    <p class="muted" style="margin:0;font-size:.88rem">Sem voz japonesa, os exercícios auditivos continuam funcionando em modo leitura: o app mostra o romaji para você ler em voz alta.</p></div>`;
}

/* ==========================================================
   PERGUNTAS AUDITIVAS
   ========================================================== */
const levelNum = l => LV[l] || 1;
function packItems(id) { const p = AUDIO_PACKS.find(x => x.id === id); return p ? p.items : []; }
function listenPool(type, level) {
  const L = levelNum(level);
  const v1 = lids => lids.flatMap(id => LESSON[id] ? LESSON[id].items : []);
  const v1Words = Object.keys(LISTEN_V1).filter(k => +k <= L).flatMap(k => v1(LISTEN_V1[k]));
  const pal = packItems('aud-pal').filter(it => it.lv <= L);
  const expr = packItems('aud-expr').filter(it => it.lv <= L).concat((AUDIO_PACKS.find(p => p.id === 'aud-expr').refs || []).map(id => ITEM[id]).filter(Boolean));
  const fra = packItems('aud-fra').filter(it => it.lv <= L).concat(Object.keys(LISTEN_V1_FRASES).filter(k => +k <= L).flatMap(k => v1(LISTEN_V1_FRASES[k])));
  const ani = packItems('aud-ani').filter(it => it.lv <= L && it.kind === 'palavra');
  if (type === 'palavra') return v1Words.concat(pal, L >= 3 ? ani.filter(it => S.discoveries[it.id]) : []);
  if (type === 'expressao') return packItems('aud-expr').concat(expr.filter(it => !it.id.startsWith('aud-expr')));
  if (type === 'frase') return L === 1 ? expr.concat(v1(['c5l1'])) : fra.filter(it => L === 3 ? (it.lv === 3 || it.lesson.kind === 'grammar') : true);
  if (type === 'anime') return packItems('aud-ani');
  return v1Words.concat(pal, expr, L >= 2 ? fra : []);
}
function groupOf(it) {
  if (it.group) return it.group;
  const l = it.lesson;
  if (l.kind === 'grammar') return 'frase';
  if (l.id === 'c1l3' || l.id === 'c1l4') return 'expressao';
  return 'palavra';
}
function sayOf(it) { return it.say || it.jp; }
function ptDistractors(it, pool, n = 3) {
  const seen = new Set([it.pt]), out = [];
  const g = groupOf(it);
  const cands = shuffle(pool.filter(x => groupOf(x) === g)).concat(shuffle(pool), shuffle(Object.values(ITEM).filter(x => groupOf(x) === g)));
  for (const x of cands) { if (out.length >= n) break; if (x === it || seen.has(x.pt)) continue; seen.add(x.pt); out.push(x); }
  return out;
}
function genListenQ(it, mode = 'word', level = 'iniciante', pool) {
  pool = pool || listenPool(groupOf(it) === 'anime' ? 'anime' : groupOf(it), level);
  const d = ptDistractors(it, pool);
  const g = groupOf(it);
  const prompt = mode === 'case' ? 'Investigue: o que significa a palavra que você ouviu?' : g === 'frase' ? 'O que foi dito?' : g === 'expressao' ? 'O que significa a expressão que você ouviu?' : 'O que significa a palavra que você ouviu?';
  return {
    type: 'listen', mode, lvl: level, itemId: it.id, say: sayOf(it), jp: it.jp, ro: it.ro, pt: it.pt,
    prompt, ctx: mode === 'case' ? it.clue : '', allowRoHint: levelNum(level) < 3 && mode !== 'case',
    options: shuffle([it, ...d]).map(x => ({ label: x.pt, plain: true, correct: x === it })),
    answerText: it.pt, explain: (it.note || it.when || '') + (it.formal ? ' ' + it.formal : ''), stat: mode === 'case' ? 'anime' : g
  };
}
function genPronQ(set, level) {
  const items = set.ids.map(id => ITEM[id]).filter(Boolean);
  const it = pick(items);
  return {
    type: 'listen', mode: 'pron', lvl: level, itemId: it.id, say: sayOf(it), jp: it.jp, ro: it.ro, pt: it.pt,
    prompt: 'Qual palavra você ouviu? Preste atenção nos sons longos e nas pausas.', allowRoHint: false, grid: true,
    options: shuffle(items).map(x => ({ label: x.ro, correct: x === it })),
    answerText: it.ro + ' (' + it.pt + ')', explain: items.map(x => x.ro + ' = ' + x.pt).join(' · ') + '. ' + (it.note || ''), stat: 'som'
  };
}
function genDialogQs(dlg) {
  return dlg.qs.map((qq, i) => ({
    type: 'listen', mode: 'dialog', lvl: ['iniciante', 'intermediario', 'avancado'][dlg.lv - 1], itemId: null, dialogId: dlg.id,
    say: null, jp: dlg.lines.map(l => (CHARS[l.sp] || {}).name + ': ' + l.jp).join('\n'), ro: dlg.lines.map(l => l.ro).join(' / '), pt: '',
    prompt: qq.q, allowRoHint: false, options: shuffle(qq.opts.map((o, k) => ({ label: o, plain: true, correct: k === qq.ans }))),
    answerText: qq.opts[qq.ans], explain: qq.explain, stat: 'dialogo'
  }));
}
function buildListenSession(type, level) {
  const L = levelNum(level), qs = [];
  if (type === 'som') {
    const sets = PRON_SETS.filter(s => s.lv <= L);
    const order = shuffle(sets.filter(s => s.lv === L)).concat(shuffle(sets.filter(s => s.lv < L)));
    for (let i = 0; i < 8; i++) qs.push(genPronQ(order[i % order.length], level));
    return qs;
  }
  if (type === 'misto') {
    const words = shuffle(listenPool('palavra', level)).slice(0, 4).map(it => genListenQ(it, 'word', level));
    const fr = shuffle(listenPool('frase', level)).slice(0, 3).map(it => genListenQ(it, 'phrase', level));
    const so = shuffle(PRON_SETS.filter(s => s.lv <= L)).slice(0, 2).map(s => genPronQ(s, level));
    const ex = shuffle(listenPool('expressao', level).filter(it => (it.lv || 1) <= L)).slice(0, 1).map(it => genListenQ(it, 'word', level));
    return shuffle(words.concat(fr, so, ex));
  }
  let pool = listenPool(type, level);
  if (type === 'anime') pool = pool.filter(it => S.discoveries[it.id]);
  // prioriza os itens com mais dificuldade e os nunca ouvidos
  const score = it => { const r = S.items[it.id]; return r ? (r.w * 2 - r.c + (r.due <= Date.now() ? 1 : 0)) : 1.5; };
  const chosen = shuffle(pool).sort((a, b) => score(b) - score(a) + (Math.random() - .5) * 2).slice(0, 10);
  return shuffle(chosen).map(it => genListenQ(it, type === 'frase' ? 'phrase' : 'word', level, pool));
}

/* registra estatísticas auditivas (o SRS já é atualizado por recordAnswer) */
function recordListen(q, ok) {
  const st = S.listening.stats; st.answers++; if (ok) st.correct++;
  const bl = st.byLevel[q.lvl] || (st.byLevel[q.lvl] = { a: 0, c: 0 }); bl.a++; if (ok) bl.c++;
  const bt = st.byType[q.stat] || (st.byType[q.stat] = { a: 0, c: 0 }); bt.a++; if (ok) bt.c++;
  if (ok && q.itemId) { if (q.stat === 'frase') S.listening.phrases[q.itemId] = Date.now(); else S.listening.recognized[q.itemId] = Date.now(); }
  missionEvent('listen');
  save();
}
function recommendLevel() {
  const cur = S.listening.level, L = levelNum(cur), b = S.listening.stats.byLevel[cur] || { a: 0, c: 0 };
  const acc = b.a ? b.c / b.a : 0;
  if (L < 3 && b.a >= 20 && acc >= .85) return { to: LEVELS[L].id, msg: 'Você acertou ' + Math.round(acc * 100) + '% no nível ' + LEVELS[L - 1].name + '. Que tal subir para ' + LEVELS[L].name + '?' };
  if (L > 1 && b.a >= 12 && acc < .5) return { to: LEVELS[L - 2].id, msg: 'Este nível está difícil (' + Math.round(acc * 100) + '% de acertos). Voltar um nível ajuda a fixar a base.' };
  if (b.a < 20) return { to: null, msg: 'Responda ' + (20 - b.a) + ' perguntas neste nível para eu recomendar o próximo passo.' };
  return { to: null, msg: 'Você está indo bem neste nível (' + Math.round(acc * 100) + '% de acertos). Continue praticando!' };
}

/* ---------- sessões no player ---------- */
function startListen(type, level) {
  level = level || S.listening.level;
  const qs = buildListenSession(type, level);
  if (!qs.length) { toast('聴', type === 'anime' ? 'Desvende pelo menos um caso para treinar a coleção.' : 'Não há conteúdo para este treino ainda.'); return; }
  closeModal();
  P = { kind: 'listen', ltype: type, phase: 'quiz', startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  setupQuiz(qs, 'listen'); openPlayer(); renderPlayer();
}
function startCase(id) {
  const it = ITEM[id]; if (!it) return;
  closeModal();
  P = { kind: 'case', item: it, phase: 'quiz', startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  setupQuiz([genListenQ(it, 'case', ['iniciante', 'intermediario', 'avancado'][(it.lv || 1) - 1], packItems('aud-ani'))], 'case');
  openPlayer(); renderPlayer();
}
function startDialog(id) {
  const d = DIALOGS.find(x => x.id === id); if (!d) return;
  closeModal();
  P = { kind: 'dialog', D: d, phase: 'dialog', show: { jp: false, ro: false, pt: false }, startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  openPlayer(); renderPlayer();
}
function afterRenderPlayer() {
  if (!P || P.phase !== 'quiz') return;
  const q = P.qs[P.i];
  if (q && q.type === 'listen' && !P.answered && P.autoplayed !== P.i && !audioBlocked()) { P.autoplayed = P.i; setTimeout(() => { if (P && P.qs && P.qs[P.i] === q && !P.answered) playQ(); }, 300); }
}
function playQ() {
  const q = P && P.qs && P.qs[P.i]; if (!q) return;
  if (q.mode === 'dialog') { const d = DIALOGS.find(x => x.id === q.dialogId); speakSeq(d.lines); return; }
  speak(q.say);
}
function endListenQuiz() {
  if (!['listen', 'dialog', 'case'].includes(P.quiz)) return false;
  const pct = P.graded ? Math.round(P.correct / P.graded * 100) : 0;
  P.pct = pct; P.pass = pct >= 50; P.phase = 'result';
  const st = S.listening.stats;
  st.ms += Math.min(Date.now() - (P.startedAt || Date.now()), P.graded * 120000);
  st.sessions++;
  touchStudy();
  if (P.quiz === 'listen') { if (P.graded >= 5) addCoins(5); }
  if (P.quiz === 'dialog') {
    const r = S.listening.dialogs[P.D.id], first = !r;
    S.listening.dialogs[P.D.id] = { best: Math.max(pct, r ? r.best : 0), at: Date.now(), times: (r ? r.times : 0) + 1 };
    if (first) { addXP(10); addCoins(5); }
    missionEvent('dialog_done');
  }
  if (P.quiz === 'case') {
    const it = P.item;
    if (!S.discoveries[it.id]) S.discoveries[it.id] = Date.now();
    markSeen(it.id); missionEvent('case');
  }
  checkAchievements(); saveNow();
  sfx('level'); if (P.correct === P.graded) confetti();
  renderPlayer();
  return true;
}
function listenResultText() {
  if (P.quiz === 'review') return { title: 'Revisão concluída!', msg: 'Revisar é o que transforma estudo em memória de verdade. Volte amanhã para mais!' };
  if (P.quiz === 'dialog') return { title: 'Diálogo concluído!', msg: P.pct === 100 ? 'Você entendeu tudo! Seu ouvido está ficando afiado.' : 'Ouça de novo as falas que deixaram dúvida e tente outra vez.' };
  const rec = recommendLevel();
  return { title: 'Treino auditivo concluído!', msg: (P.pct >= 80 ? 'Ótimo ouvido! ' : P.pct >= 50 ? 'Bom treino! ' : 'Cada repetição treina o ouvido. ') + rec.msg };
}
function listenResultFoot() {
  if (P.quiz === 'dialog') return `<button class="btn btn-gold btn-block" data-act="pExit">Concluir</button><div class="row-btns"><button class="btn btn-ghost btn-small" data-act="dlgAgain">Ouvir o diálogo de novo</button></div>`;
  if (P.quiz === 'listen') return `<button class="btn btn-gold btn-block" data-act="pExit">Concluir</button><button class="btn btn-ghost btn-block" data-act="listenAgain">Treinar de novo</button>`;
  return `<button class="btn btn-gold btn-block" data-act="pExit">Concluir</button>`;
}

/* ---------- renderização da pergunta auditiva ---------- */
function renderListenBody(q) {
  const blocked = audioBlocked();
  const showJp = q.revealJp && !P.answered;
  let h = `<div class="audio-card">
    <button class="play-big" data-act="playQ" aria-label="Ouvir o áudio">${IC.play}<span>Ouvir</span></button>
    <div class="audio-ctrls"><button class="btn btn-ghost btn-small" data-act="playQ">${IC.repeat.replace('<svg', '<svg width="18" height="18"')} Repetir</button>${rateSeg()}</div>`;
  if (q.ctx) h += `<p class="clue"><b>Pista:</b> ${esc(q.ctx)}</p>`;
  if (blocked) h += `<div class="banner" style="margin:0">${AUDIO.status === 'unsupported' ? 'Este navegador não reproduz voz.' : 'Não há voz japonesa neste aparelho.'} Modo leitura: leia em voz alta <b class="tabnum">${esc(q.mode === 'dialog' ? q.ro : q.ro)}</b> e responda. <button class="link-btn" data-act="voiceHelp">Como ativar a voz</button></div>`;
  if (!P.answered && !blocked) {
    h += `<div class="reveal-row">${!q.revealJp ? `<button class="link-btn" data-act="revealJp">${q.mode === 'dialog' ? 'Ver transcrição' : 'Mostrar escrita'}</button>` : ''}${q.allowRoHint && !q.hintRo ? '<button class="link-btn" data-act="hintRo">Dica: romaji</button>' : ''}</div>`;
    if (showJp) h += `<div class="reveal-box jp">${esc(q.jp).replace(/\n/g, '<br>')}${q.say && q.say !== q.jp && !isKanaOnly(q.jp.replace(/[。、？！]/g, '')) ? `<div class="ro" style="font-family:var(--f-display)">${esc(q.say)}</div>` : ''}</div>`;
    if (q.hintRo) h += `<div class="reveal-box">${esc(q.ro)}</div>`;
    if (q.revealJp || q.hintRo) h += `<p class="muted" style="margin:0;font-size:.8rem">Com dica, o acerto vale metade do XP.</p>`;
  }
  h += `</div><div class="opts ${q.grid ? 'grid' : ''}">${q.options.map((o, i) => optHTML(o, i, q)).join('')}</div>`;
  return h;
}
function listenReveal(q) {
  if (q.mode === 'dialog') return '';
  const kana = q.say && q.say !== q.jp ? `<span class="ro jp">${esc(q.say)}</span>` : '';
  return `<div class="reveal-ans"><span class="jp" style="font-size:1.25rem;font-weight:800">${esc(q.jp)}</span>${kana}<span><b>${esc(q.ro)}</b> · ${esc(q.pt)}</span>${AUDIO.supported ? `<button class="link-btn" style="padding:2px 0;align-self:flex-start" data-act="playQ">${IC.sound.replace('<svg', '<svg width="16" height="16" style="vertical-align:-3px"')} Ouvir de novo</button>` : ''}</div>`;
}

/* ---------- resultado do caso do Detetive ---------- */
const KIND_LABEL = { palavra: 'Palavra do japonês', titulo: 'Título de obra', nome: 'Nome próprio criado para a obra' };
function discoveryHTML(it) {
  return `<div class="disc-detail">
    <div class="t-word"><span class="eyebrow">${esc(KIND_LABEL[it.kind] || '')}</span><span class="big jp" style="font-size:${it.jp.length > 6 ? '1.7rem' : '2.6rem'}">${esc(it.jp)}</span>${it.say !== it.jp ? `<span class="ro jp">${esc(it.say)}</span>` : ''}<span class="rr">${esc(it.ro)}</span><span class="pt">${esc(it.pt)}</span>${speakBtn(it.say)}</div>
    <dl class="kv"><dt>Significado</dt><dd>${esc(it.pt)}</dd><dt>Explicação</dt><dd>${esc(it.note)}</dd></dl>
    ${it.parts ? `<div><span class="eyebrow">Composição</span><div class="parts">${it.parts.map(p => `<div class="part"><span class="jp">${esc(p[0])}</span><span class="ro">${esc(p[1])}</span><span>${esc(p[2])}</span></div>`).join('')}</div></div>` : ''}
    ${it.ctx ? `<div class="note"><b>Onde aparece e interpretação:</b> ${esc(it.ctx)}</div>` : ''}
    ${it.ex ? `<div><span class="eyebrow">Exemplo</span><div class="ex"><span class="ej">${esc(it.ex.jp)}</span><span class="ro">${esc(it.ex.ro)}</span><span class="ep">${esc(it.ex.pt)}</span></div></div>` : ''}
  </div>`;
}
function renderCaseResult() {
  const it = P.item, ok = P.correct === 1;
  const body = `<div class="result-hero">${mascot(ok ? 'wow' : 'happy', 110, 'hop')}<span class="mode-tag">${ok ? 'Caso resolvido!' : 'Caso encerrado'}</span><h2>${ok ? 'Descoberta desbloqueada!' : 'Agora você sabe!'}</h2>
    <p style="margin:0">${ok ? 'Boa dedução, detetive!' : 'Não foi dessa vez, mas a descoberta foi para a sua coleção.'} <span class="muted tabnum">+${(sessionGain || {}).xp || 0} XP</span></p></div>
    <div class="theory-card">${discoveryHTML(it)}</div>`;
  const next = nextCase(it.id);
  return playerShell(1, body, `${next ? `<button class="btn btn-gold btn-block" data-act="caseNext" data-id="${next.id}">Próximo caso</button>` : ''}<button class="btn btn-ghost btn-block" data-act="pExitTo" data-to="detetive">Ver coleção</button>`);
}
function nextCase(afterId) {
  const list = packItems('aud-ani').filter(it => !S.discoveries[it.id] && it.id !== afterId);
  const L = levelNum(S.listening.level);
  return list.find(it => it.lv <= L) || list[0] || null;
}

/* ---------- Laboratório de Diálogos (player) ---------- */
function renderDialogLab() {
  const d = P.D, sh = P.show;
  const lines = d.lines.map((l, i) => {
    const c = CHARS[l.sp] || { name: l.sp, color: 'var(--muted)' };
    return `<div class="dlg-line" data-line="${i}"><div class="dlg-who" style="color:${c.color}">${esc(c.name)}</div>
      <div class="dlg-bubble"><button class="icon-btn" data-act="dlgLine" data-i="${i}" aria-label="Ouvir fala ${i + 1}">${IC.play.replace('<svg', '<svg width="18" height="18"')}</button>
      <div class="dlg-text">${sh.jp ? `<span class="jp" style="font-weight:700;font-size:1.05rem">${esc(l.jp)}</span>` : ''}${sh.ro ? `<span class="ro">${esc(l.ro)}</span>` : ''}${sh.pt ? `<span>${esc(l.pt)}</span>` : ''}${!sh.jp && !sh.ro && !sh.pt ? `<span class="muted">Fala ${i + 1} · toque para ouvir</span>` : ''}</div></div></div>`;
  }).join('');
  const tg = (k, t) => `<button class="filter ${sh[k] ? 'on' : ''}" data-act="dlgShow" data-k="${k}">${t}</button>`;
  const body = `<span class="mode-tag rev">Laboratório de Diálogos · ${esc(LEVELS[d.lv - 1].name)}</span><h2>${esc(d.title)}</h2><p class="muted" style="margin:0">${esc(d.situ)}</p>
    ${audioBlocked() ? `<div class="banner" style="margin:0">Sem voz japonesa: ative o romaji abaixo e leia as falas em voz alta. <button class="link-btn" data-act="voiceHelp">Como ativar a voz</button></div>` : ''}
    <div class="row-btns"><button class="btn btn-primary" data-act="dlgAll">${IC.play.replace('<svg', '<svg width="18" height="18"')} Ouvir tudo</button><button class="btn btn-ghost" data-act="dlgStop">${IC.stop.replace('<svg', '<svg width="16" height="16"')} Parar</button></div>
    <div class="audio-ctrls" style="justify-content:space-between"><span class="eyebrow">Velocidade</span>${rateSeg()}</div>
    <div class="filters" role="group" aria-label="Mostrar texto">${tg('ro', 'Romaji')}${tg('pt', 'Tradução')}${tg('jp', 'Japonês')}</div>
    <div class="dlg">${lines}</div>
    <details class="card"><summary><b>Palavras do diálogo</b></summary><div class="list" style="margin-top:8px">${d.words.map(w => `<div class="row"><div class="grow"><span class="jp" style="font-weight:700">${esc(w[0])}</span> <span class="ro">${esc(w[1])}</span><div style="font-size:.9rem">${esc(w[2])}</div></div>${speakBtn(w[0])}</div>`).join('')}</div></details>`;
  return playerShell(0, body, `<button class="btn btn-gold btn-block" data-act="dlgQuiz">Responder perguntas (${d.qs.length})</button>`, '', '');
}

/* ==========================================================
   TELAS: Academia (tradicional / auditiva) e submódulos
   ========================================================== */
const aud = { sub: 'hub', detTab: 'casos' };
function viewAcademyRoot() {
  const mode = S.settings.academyMode === 'aud' ? 'aud' : 'trad';
  const sw = `<div class="wrap"><div class="mode-switch" role="tablist"><button role="tab" aria-selected="${mode === 'trad'}" class="${mode === 'trad' ? 'on' : ''}" data-act="acadMode" data-mode="trad">${IC.academy} Academia</button><button role="tab" aria-selected="${mode === 'aud'}" class="${mode === 'aud' ? 'on' : ''}" data-act="acadMode" data-mode="aud">${IC.headphones} Auditiva</button></div></div>`;
  if (mode === 'trad') return sw + viewAcademy();
  return sw + ({ hub: viewAudioHub, expr: viewExpressions, det: viewDetective, dlg: viewDialogs }[aud.sub] || viewAudioHub)();
}
function backBar(title, jp) {
  return `<div class="page-title"><div style="min-width:0"><button class="link-btn" style="padding:0" data-act="audSub" data-sub="hub">← Academia Auditiva</button><span class="jp" style="display:block">${esc(jp)}</span><h1>${esc(title)}</h1></div></div>`;
}
function audioStatusCard() {
  if (audioOK()) return `<div class="audio-status ok"><span class="adot" data-audio-dot data-state="ok"></span><span data-audio-status>${esc(audioStatusText())}</span></div>`;
  if (AUDIO.status === 'checking' || AUDIO.status === 'unknown') return `<div class="audio-status"><span class="adot" data-audio-dot data-state="wait"></span><span data-audio-status style="flex:1">${esc(audioStatusText())}</span><button class="btn btn-small btn-ghost" data-act="voiceHelp">Testar voz</button></div>`;
  return `<div class="card stack" style="border-color:var(--bad)"><div class="audio-status bad" style="padding:0;border:0;background:none"><span class="adot" data-audio-dot data-state="bad"></span><b data-audio-status>${esc(audioStatusText())}</b></div>${voiceHelpHTML()}<button class="btn btn-ghost btn-small" data-act="voiceHelp">Testar de novo</button></div>`;
}
function viewAudioHub() {
  const st = S.listening.stats, lv = S.listening.level, rec = recommendLevel();
  const acc = st.answers ? Math.round(st.correct / st.answers * 100) : 0;
  const disc = Object.keys(S.discoveries).length, totalDisc = packItems('aud-ani').length;
  const dDone = Object.keys(S.listening.dialogs).length;
  const exprSeen = packItems('aud-expr').filter(it => S.items[it.id] && S.items[it.id].seen).length;
  const mod = (act, data, icon, title, sub, meta) => `<button class="mod-card" data-act="${act}" ${data}><span class="mod-ic">${icon}</span><span class="mod-t">${title}</span><span class="mod-s">${sub}</span>${meta ? `<span class="mod-m tabnum">${meta}</span>` : ''}</button>`;
  return `<div class="wrap">
    <div class="aud-hero"><div class="aud-hero-in">${mascot('happy', 64)}<div style="min-width:0"><span class="jp" style="color:#ffd877;letter-spacing:.14em;font-size:.8rem">聴解アカデミー</span><h1 style="font-size:1.35rem">Academia Auditiva</h1><p style="margin:2px 0 0;font-size:.9rem;opacity:.9">Ouça. Descubra. Compreenda. Aqui você aprende pelo ouvido, sem precisar ler kana ou kanji.</p></div></div></div>
    <section class="section">${audioStatusCard()}</section>
    <section class="section"><div class="section-h"><h2>Seu nível</h2><span class="muted" style="font-size:.8rem">você escolhe</span></div>
      <div class="level-pick">${LEVELS.map(l => `<button class="${lv === l.id ? 'on' : ''}" data-act="setLevel" data-lv="${l.id}"><b>${l.name}</b><span class="jp">${l.jp}</span></button>`).join('')}</div>
      <p class="muted" style="margin:0;font-size:.88rem">${esc(LEVELS[levelNum(lv) - 1].desc)}</p>
      <div class="mascot-tip">${mascot('neutral', 48)}<div class="bubble">${esc(rec.msg)}${rec.to ? ` <button class="link-btn" data-act="setLevel" data-lv="${rec.to}">Mudar para ${esc(LEVELS[levelNum(rec.to) - 1].name)}</button>` : ''}</div></div>
      <div class="audio-ctrls" style="justify-content:space-between"><span class="eyebrow">Velocidade da voz</span>${rateSeg()}</div></section>
    <section class="section"><h2>Treinos</h2><div class="mod-grid">
      ${mod('listen', 'data-type="palavra"', IC.headphones, 'Reconhecer palavras', 'Ouça e escolha o significado', '')}
      ${mod('listen', 'data-type="som"', IC.wave, 'Distinguir sons', 'Sons longos, curtos e pausas', '')}
      ${mod('listen', 'data-type="frase"', IC.chat, 'Compreender frases', levelNum(lv) === 1 ? 'Expressões e frases bem curtas' : 'O que foi dito?', '')}
      ${mod('listen', 'data-type="misto"', IC.spark, 'Treino misto', 'Um pouco de tudo do seu nível', '')}
    </div></section>
    <section class="section"><h2>Módulos</h2><div class="mod-grid">
      ${mod('audSub', 'data-sub="det"', IC.search, 'Detetive dos Animes', 'アニメ探偵 · palavras de títulos, nomes e técnicas', disc + '/' + totalDisc + ' casos')}
      ${mod('audSub', 'data-sub="expr"', '<span class="jp" style="font-weight:800">声</span>', 'Expressões do Cotidiano', 'すごい, まじで, やった...', exprSeen + '/' + packItems('aud-expr').length + ' aprendidas')}
      ${mod('audSub', 'data-sub="dlg"', IC.chat, 'Laboratório de Diálogos', 'Conversas originais para ouvir', dDone + '/' + DIALOGS.length + ' concluídos')}
    </div></section>
    <section class="section"><h2>Progresso auditivo</h2><div class="stats-grid">
      <div class="kpi"><b>${Object.keys(S.listening.recognized).length}</b><span>palavras reconhecidas pelo áudio</span></div>
      <div class="kpi"><b>${Object.keys(S.listening.phrases).length}</b><span>frases compreendidas</span></div>
      <div class="kpi"><b>${acc}%</b><span>de acertos (${st.correct}/${st.answers})</span></div>
      <div class="kpi"><b>${fmtMin(st.ms)}</b><span>de treino auditivo</span></div></div></section>
  </div>`;
}
function fmtMin(ms) { const m = Math.round(ms / 60000); return m < 60 ? m + ' min' : Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0'); }

function viewExpressions() {
  const items = packItems('aud-expr').concat((AUDIO_PACKS.find(p => p.id === 'aud-expr').refs || []).map(id => ITEM[id]).filter(Boolean));
  const card = it => {
    const s = itemStatus(it.id);
    return `<details class="card expr" data-id="${it.id}"><summary><span class="expr-top"><span class="jpw jp">${esc(it.jp2 || it.jp)}</span><span class="chip ${s}">${STATUS_LABEL[s]}</span></span><span class="expr-sub"><b>${esc(it.ro)}</b> · ${esc(it.pt)}</span></summary>
      <div class="stack" style="gap:8px;margin-top:10px">${speakBtn(it.say || it.jp).replace('class="icon-btn"', 'class="btn btn-ghost btn-small" style="align-self:flex-start"').replace(IC.sound, IC.sound.replace('<svg', '<svg width="18" height="18"') + ' Ouvir')}
      ${it.when ? `<div><span class="eyebrow">Quando usar</span><div>${esc(it.when)}</div></div>` : ''}
      ${it.formal ? `<div><span class="eyebrow">Formalidade</span><div>${esc(it.formal)}</div></div>` : ''}
      ${it.ex ? `<div class="ex"><span class="ej">${esc(it.ex.jp)}</span><span class="ro">${esc(it.ex.ro)}</span><span class="ep">${esc(it.ex.pt)}</span>${AUDIO.supported ? `<button class="link-btn" style="align-self:flex-start;padding:2px 0" data-act="speak" data-text="${esc(it.ex.jp)}">Ouvir exemplo</button>` : ''}</div>` : ''}</div></details>`;
  };
  return `<div class="wrap">${backBar('Expressões do Cotidiano', 'にちじょうのひょうげん')}
    <p class="muted" style="margin:0">Expressões que aparecem o tempo todo em animes e conversas. Toque para ver quando usar, a formalidade e um exemplo.</p>
    <section class="section"><button class="btn btn-gold btn-block" data-act="listen" data-type="expressao">${IC.headphones.replace('<svg', '<svg width="20" height="20"')} Treino auditivo de expressões</button></section>
    <section class="section">${items.map(card).join('')}</section></div>`;
}

function viewDetective() {
  const all = packItems('aud-ani'), found = all.filter(it => S.discoveries[it.id]), open = all.filter(it => !S.discoveries[it.id]);
  const tab = aud.detTab;
  const tabs = `<div class="filters"><button class="filter ${tab === 'casos' ? 'on' : ''}" data-act="detTab" data-t="casos">Casos abertos (${open.length})</button><button class="filter ${tab === 'colecao' ? 'on' : ''}" data-act="detTab" data-t="colecao">Coleção (${found.length}/${all.length})</button></div>`;
  let list;
  if (tab === 'casos') {
    list = open.length ? open.sort((a, b) => a.lv - b.lv).map((it, i) => `<div class="case-card"><div class="case-n jp">${esc(String(all.indexOf(it) + 1).padStart(2, '0'))}</div><div class="grow"><span class="eyebrow">${esc(KIND_LABEL[it.kind])} · ${esc(LEVELS[it.lv - 1].name)}</span><p style="margin:2px 0 0">${esc(it.clue)}</p></div><button class="btn btn-small btn-primary" data-act="case" data-id="${it.id}">Investigar</button></div>`).join('')
      : `<div class="card mascot-tip" style="box-shadow:none">${mascot('wow', 60)}<div><b>Todos os casos foram desvendados!</b><p class="muted" style="margin:4px 0 0">Revise sua coleção com o desafio de áudio.</p></div></div>`;
  } else {
    list = found.length ? `<div class="disc-grid">${found.map(it => `<button class="disc-card" data-act="discOpen" data-id="${it.id}"><span class="jp dj">${esc(it.jp)}</span><span class="dr">${esc(it.ro)}</span><span class="dp">${esc(it.pt)}</span></button>`).join('')}</div>`
      : `<p class="muted">Sua coleção está vazia. Investigue um caso para fazer sua primeira descoberta!</p>`;
  }
  return `<div class="wrap">${backBar('Detetive dos Animes', 'アニメ探偵')}
    <p class="muted" style="margin:0">Ouça a palavra, leia a pista e deduza o significado. Cada caso revela a escrita, a pronúncia, a composição real e onde a palavra aparece, sempre separando o significado real da interpretação e dos nomes próprios.</p>
    <section class="section">${found.length >= 4 ? `<button class="btn btn-gold btn-block" data-act="listen" data-type="anime">${IC.headphones.replace('<svg', '<svg width="20" height="20"')} Desafio de áudio da coleção</button>` : `<p class="muted" style="margin:0;font-size:.88rem">Desvende 4 casos para liberar o desafio de áudio da coleção.</p>`}</section>
    <section class="section">${tabs}${list}</section></div>`;
}

function viewDialogs() {
  return `<div class="wrap">${backBar('Laboratório de Diálogos', 'かいわラボ')}
    <p class="muted" style="margin:0">Conversas originais entre Ren, Aoi e outros personagens. Ouça tudo, repita cada fala, mostre o romaji ou a tradução quando quiser e responda às perguntas.</p>
    <section class="section">${LEVELS.map((l, k) => {
      const ds = DIALOGS.filter(d => d.lv === k + 1);
      return `<h2 style="font-size:1rem">${esc(l.name)} <span class="jp muted" style="font-size:.8rem">${l.jp}</span></h2>` + ds.map(d => {
        const r = S.listening.dialogs[d.id];
        return `<button class="dlg-card" data-act="dialog" data-id="${d.id}"><span class="mod-ic">${IC.chat}</span><span class="grow" style="text-align:left"><b>${esc(d.title)}</b><span class="muted" style="display:block;font-size:.85rem">${esc(d.situ)}</span></span>${r ? `<span class="chip dominada tabnum">${r.best}%</span>` : '<span class="chip nova">Novo</span>'}</button>`;
      }).join('');
    }).join('')}</section></div>`;
}

/* ---------- cartão no Início e estatísticas no Perfil ---------- */
function homeListenCard() {
  const st = S.listening.stats, lv = LEVELS[levelNum(S.listening.level) - 1];
  return `<section class="section"><div class="card aud-home"><div class="mascot-tip" style="align-items:center">${`<span class="mod-ic big">${IC.headphones}</span>`}<div style="min-width:0"><span class="eyebrow">Novo · Academia Auditiva</span><h3 style="font-size:1.05rem">Treine o ouvido para animes</h3><span class="muted tabnum" style="font-size:.85rem">Nível ${esc(lv.name)} · ${Object.keys(S.listening.recognized).length} palavras reconhecidas · ${Object.keys(S.discoveries).length} descobertas</span></div></div>
    <div class="row-btns"><button class="btn btn-primary btn-small" data-act="listen" data-type="misto">Treino rápido</button><button class="btn btn-ghost btn-small" data-act="gotoAud" data-sub="hub">Abrir</button></div></div></section>`;
}
function profileListenStats() {
  const st = S.listening.stats;
  const pct = o => o && o.a ? Math.round(o.c / o.a * 100) + '%' : '—';
  const hard = Object.keys(S.items).filter(id => ITEM[id] && ITEM[id].lesson.kind === 'audio' && S.items[id].w > 0).sort((a, b) => S.items[b].w - S.items[a].w).slice(0, 5);
  return `<section class="section"><h2 style="font-size:1.1rem">Academia Auditiva</h2><div class="stats-grid">
    <div class="kpi"><b>${Object.keys(S.listening.recognized).length}</b><span>palavras reconhecidas pelo áudio</span></div>
    <div class="kpi"><b>${Object.keys(S.listening.phrases).length}</b><span>frases compreendidas</span></div>
    <div class="kpi"><b>${Object.keys(S.listening.dialogs).length}</b><span>diálogos concluídos</span></div>
    <div class="kpi"><b>${Object.keys(S.discoveries).length}</b><span>descobertas do Detetive</span></div>
    <div class="kpi"><b class="tabnum">${st.correct}/${st.answers - st.correct}</b><span>respostas auditivas certas / erradas</span></div>
    <div class="kpi"><b>${fmtMin(st.ms)}</b><span>tempo de treino auditivo (medido nas sessões)</span></div></div>
    <div class="card"><span class="eyebrow">Acertos por nível</span><div class="list">${LEVELS.map(l => `<div class="row"><span class="grow">${l.name}</span><span class="muted tabnum">${(st.byLevel[l.id] || {}).a || 0} respostas · ${pct(st.byLevel[l.id])}</span></div>`).join('')}</div></div>
    ${hard.length ? `<div class="card"><span class="eyebrow">Palavras mais difíceis de ouvir</span><div class="list">${hard.map(id => `<div class="row"><div class="grow"><b>${esc(ITEM[id].ro)}</b> <span class="muted">· ${esc(ITEM[id].pt)}</span></div><span class="chip revisar">${S.items[id].w} erro${S.items[id].w > 1 ? 's' : ''}</span></div>`).join('')}</div></div>` : ''}</section>`;
}

/* ==========================================================
   CADERNO (expandido): v1 + descobertas + diálogos
   ========================================================== */
const NB_TYPES = [['todas', 'Todas'], ['palavra', 'Palavras'], ['expressao', 'Expressões'], ['anime', 'Animes'], ['frase', 'Frases'], ['dialogo', 'Diálogos'], ['dificeis', 'Mais difíceis']];
const GROUP_LABEL = { palavra: 'Palavra', expressao: 'Expressão', anime: 'Anime', frase: 'Frase', dialogo: 'Diálogo' };
function originOf(it) {
  const l = it.lesson;
  if (l.kind !== 'audio') return l.cat.title + ' · ' + l.title;
  return { 'aud-pal': 'Academia Auditiva · Palavras', 'aud-expr': 'Expressões do Cotidiano', 'aud-fra': 'Academia Auditiva · Frases', 'aud-ani': 'Detetive dos Animes' }[l.id] || 'Academia Auditiva';
}
function viewNotebook() {
  if (!nb.t) nb.t = 'todas';
  const q = nb.q.trim().toLowerCase();
  const statusOk = id => { const s = itemStatus(id); return nb.f === 'todas' || (nb.f === 'dominadas' && s === 'dominada') || (nb.f === 'revisar' && s === 'revisar') || (nb.f === 'aprendendo' && (s === 'aprendendo' || s === 'nova')); };
  const match = (...f) => !q || f.some(x => String(x || '').toLowerCase().includes(q));
  const ids = seenItems();
  let entries = [];
  if (nb.t !== 'dialogo') {
    entries = ids.map(id => ITEM[id]).filter(it => {
      const g = groupOf(it);
      if (nb.t === 'dificeis') { if (!(S.items[it.id].w > 0)) return false; } else if (nb.t !== 'todas' && g !== nb.t) return false;
      return statusOk(it.id) && match(it.jp, it.ro, it.pt, it.kanji, it.say);
    });
    if (nb.t === 'dificeis') entries.sort((a, b) => S.items[b.id].w - S.items[a.id].w);
  }
  const dlgs = (nb.t === 'todas' || nb.t === 'dialogo') && nb.f === 'todas' ? DIALOGS.filter(d => S.listening.dialogs[d.id] && match(d.title, d.situ, ...d.lines.map(l => l.jp + ' ' + l.ro + ' ' + l.pt))) : [];
  const entryHTML = it => {
    const s = itemStatus(it.id), r = S.items[it.id], g = groupOf(it);
    return `<div class="nb-entry"><div class="nb-top"><span class="jpw">${esc(it.jp2 || it.jp)}</span><span class="chip ${s}">${STATUS_LABEL[s]}</span>${speakBtn(sayOf(it))}</div>
      <div><b>${esc(it.pt)}</b> <span class="ro">· ${esc(it.ro)}${it.alt ? ' · também ' + esc(it.alt) : ''}</span>${it.kanji ? ` <span class="ro">· kanji: <span class="jp">${esc(it.kanji)}</span></span>` : ''}</div>
      ${it.note ? `<div class="muted" style="font-size:.88rem">${esc(it.note)}</div>` : ''}
      ${it.when ? `<div class="muted" style="font-size:.88rem">Quando usar: ${esc(it.when)}</div>` : ''}
      ${it.ex ? `<div class="nb-ex"><span class="jp" style="font-weight:700">${esc(it.ex.jp)}</span><br><span class="ro">${esc(it.ex.ro)}</span><br>${esc(it.ex.pt)}</div>` : ''}
      <div class="nb-meta"><span class="chip nova">${GROUP_LABEL[g]}</span><span>${esc(originOf(it))}</span><span>· desde ${new Date(r.seen).toLocaleDateString('pt-BR')}</span>${r.c + r.w ? `<span class="tabnum">· ${r.c} acerto${r.c === 1 ? '' : 's'}, ${r.w} erro${r.w === 1 ? '' : 's'}</span>` : ''}${g === 'anime' ? `<button class="link-btn" style="padding:0" data-act="discOpen" data-id="${it.id}">Ver descoberta</button>` : ''}</div></div>`;
  };
  // agrupa pela origem, mantendo a ordem do conteúdo
  const order = ALL_LESSONS.concat(AUDIO_PACKS);
  let groups;
  if (nb.t === 'dificeis') groups = entries.length ? `<section class="section"><div class="card">${entries.map(entryHTML).join('')}</div></section>` : '';
  else groups = order.map(l => { const list = entries.filter(it => it.lesson === l); return list.length ? `<section class="section"><div class="section-h"><h2 style="font-size:1rem">${esc(l.kind === 'audio' ? originOf(list[0]) : l.title)}</h2><span class="muted" style="font-size:.8rem">${esc(l.cat.title)}</span></div><div class="card">${list.map(entryHTML).join('')}</div></section>` : ''; }).join('');
  if (dlgs.length) groups += `<section class="section"><div class="section-h"><h2 style="font-size:1rem">Diálogos concluídos</h2><span class="muted" style="font-size:.8rem">Laboratório de Diálogos</span></div><div class="card">${dlgs.map(d => { const r = S.listening.dialogs[d.id]; return `<div class="nb-entry"><div class="nb-top"><span class="jpw" style="font-size:1.1rem;font-family:var(--f-body)">${esc(d.title)}</span><span class="chip dominada tabnum">${r.best}%</span><button class="icon-btn" data-act="dialog" data-id="${d.id}" aria-label="Abrir diálogo">${IC.play.replace('<svg', '<svg width="18" height="18"')}</button></div>${d.lines.map(l => `<div style="font-size:.9rem"><b>${esc((CHARS[l.sp] || {}).name)}:</b> <span class="jp">${esc(l.jp)}</span><br><span class="ro">${esc(l.ro)}</span> · ${esc(l.pt)}</div>`).join('')}<div class="nb-meta"><span class="chip nova">Diálogo</span><span>concluído em ${new Date(r.at).toLocaleDateString('pt-BR')}</span></div></div>`; }).join('')}</div></section>`;
  const total = entries.length + dlgs.length;
  const fl = [['todas', 'Qualquer status'], ['aprendendo', 'Aprendendo'], ['revisar', 'Revisar'], ['dominadas', 'Dominadas']];
  return `<div class="wrap"><div class="page-title"><div><span class="jp">がくしゅうノート</span><h1>Caderno de Aprendizado</h1></div></div>
    <div class="stack"><input class="search" id="nbSearch" type="search" placeholder="Buscar em japonês, romaji ou português" value="${esc(nb.q)}" aria-label="Buscar no caderno">
    <div class="filters">${NB_TYPES.map(([k, t]) => `<button class="filter ${nb.t === k ? 'on' : ''}" data-act="nbType" data-t="${k}">${t}</button>`).join('')}</div>
    <div class="filters">${fl.map(([k, t]) => `<button class="filter small ${nb.f === k ? 'on' : ''}" data-act="nbFilter" data-f="${k}">${t}</button>`).join('')}</div>
    <p class="muted tabnum" style="margin:0;font-size:.85rem">${ids.length} itens estudados · ${Object.keys(S.listening.dialogs).length} diálogos${q || nb.f !== 'todas' || nb.t !== 'todas' ? ' · ' + total + ' encontrados' : ''}</p></div>
    <div id="nbList">${groups || (ids.length ? '<p class="muted">Nada encontrado com esse filtro.</p>' : `<div class="card mascot-tip" style="margin-top:14px;box-shadow:none">${mascot('neutral', 64)}<div><b>Seu caderno está vazio.</b><p class="muted" style="margin:4px 0 0">As palavras das lições, os treinos auditivos, as expressões e as descobertas do Detetive aparecem aqui, com áudio, romaji, tradução e exemplos.</p></div></div>`)}</div></div>`;
}

/* ==========================================================
   AÇÕES NOVAS
   ========================================================== */
Object.assign(ACT, {
  speak: el => speak(el.dataset.text),
  playQ: () => playQ(),
  rate: el => { S.settings.rate = el.dataset.val; save(); document.querySelectorAll('.rate-seg button').forEach(b => b.classList.toggle('on', b.dataset.val === S.settings.rate)); if (P && P.phase === 'quiz') playQ(); },
  revealJp: () => { const q = P.qs[P.i]; q.revealJp = true; q.hinted = true; P.keepScroll = true; renderPlayer(); },
  hintRo: () => { const q = P.qs[P.i]; q.hintRo = true; q.hinted = true; P.keepScroll = true; renderPlayer(); },
  acadMode: el => { S.settings.academyMode = el.dataset.mode; if (el.dataset.mode === 'aud') aud.sub = 'hub'; save(); render(); window.scrollTo(0, 0); },
  audSub: el => { aud.sub = el.dataset.sub; S.settings.academyMode = 'aud'; render(); window.scrollTo(0, 0); },
  gotoAud: el => { aud.sub = el.dataset.sub || 'hub'; S.settings.academyMode = 'aud'; go('academia'); },
  setLevel: el => { S.listening.level = el.dataset.lv; save(); render(); toast('聴', 'Nível auditivo: ' + LEVELS[levelNum(el.dataset.lv) - 1].name); },
  listen: el => startListen(el.dataset.type),
  listenAgain: () => { const t = P.ltype; closePlayer(); startListen(t); },
  case: el => startCase(el.dataset.id),
  caseNext: el => { closePlayer(); startCase(el.dataset.id); },
  detTab: el => { aud.detTab = el.dataset.t; render(); },
  discOpen: el => { const it = ITEM[el.dataset.id]; if (!it) return; openModal(`${discoveryHTML(it)}<button class="btn btn-primary btn-block" data-act="closeModal">Fechar</button>`); },
  dialog: el => startDialog(el.dataset.id),
  dlgLine: el => { const i = +el.dataset.i, l = P.D.lines[i]; speak(l.say || l.jp, { pitch: (CHARS[l.sp] || {}).pitch, key: i }); },
  dlgAll: () => speakSeq(P.D.lines.map((l, i) => ({ ...l, key: i }))),
  dlgStop: () => stopAudio(),
  dlgShow: el => { P.show[el.dataset.k] = !P.show[el.dataset.k]; P.keepScroll = true; renderPlayer(); },
  dlgQuiz: () => { stopAudio(); setupQuiz(genDialogQs(P.D), 'dialog'); renderPlayer(); },
  dlgAgain: () => { sessionGain = { xp: 0, coins: 0 }; P.phase = 'dialog'; P.startedAt = Date.now(); renderPlayer(); },
  pExitTo: el => { const to = el.dataset.to; closePlayer(); if (to === 'detetive') { aud.sub = 'det'; aud.detTab = 'colecao'; S.settings.academyMode = 'aud'; go('academia'); } },
  nbType: el => { nb.t = el.dataset.t; render(); },
  voiceHelp: async () => {
    openModal(`<h2>Voz japonesa</h2><p style="margin:0" data-audio-status>${esc(audioStatusText())}</p><div id="voiceTest" class="muted" style="font-size:.9rem">Tocando um teste: “こんにちは”...</div>${voiceHelpHTML()}<button class="btn btn-ghost btn-block" data-act="voiceRetest">Testar de novo</button><button class="btn btn-primary btn-block" data-act="closeModal">Fechar</button>`);
    runVoiceTest();
  },
  voiceRetest: () => { if (AUDIO.status === 'missing') AUDIO.status = AUDIO.voices.length ? 'missing' : 'unknown'; refreshVoices(); if (AUDIO.status === 'missing' && !AUDIO.ja) { AUDIO.status = 'unknown'; } runVoiceTest(); }
});
async function runVoiceTest() {
  const box = $('#voiceTest'); if (box) box.textContent = 'Tocando um teste: “こんにちは”...';
  if (AUDIO.status === 'missing') AUDIO.status = 'unknown'; // permite uma nova tentativa real
  const ok = await speak('こんにちは');
  const b = $('#voiceTest'); if (b) b.innerHTML = ok ? '<b style="color:var(--ok)">Funcionou! Você ouviu “konnichiwa”.</b>' : '<b style="color:var(--bad)">Não foi possível tocar a voz japonesa.</b> Siga os passos abaixo.';
  updateAudioUI();
}
// marca expressões como estudadas quando o cartão é aberto
document.addEventListener('toggle', e => { const d = e.target; if (d.classList && d.classList.contains('expr') && d.open) markSeen(d.dataset.id); }, true);

/* ---------- início do app ---------- */
(function init() {
  initAudio();
  applyTheme();
  if (S.profile.onboarded && S.streak.last && dayDiff(S.streak.last, dayKey()) >= 4) pending.push({ type: 'comeback' });
  const h = (location.hash || '').replace('#', '');
  view = VIEWS.includes(h) ? h : 'inicio';
  render();
  checkAchievements();
  saveNow(); // grava o esquema 2 logo após a migração (o backup do esquema 1 já foi guardado)
  setTimeout(flushPending, 400);
  window.addEventListener('hashchange', () => { const v = location.hash.replace('#', ''); if (VIEWS.includes(v) && v !== view && !P) { view = v; render(); } });
})();

/* gancho para testes automatizados */
window.__NQ = { get S() { return S; }, get P() { return P; }, get AUDIO() { return AUDIO; }, CATS, LESSON, ITEM, DIALOGS, AUDIO_PACKS, numJp, levelInfo, dayDiff, normalize, setState(s) { S = s; saveNow(); render(); }, suspendSave() { saveSuspended = true; } };
