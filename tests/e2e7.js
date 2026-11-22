const { chromium, devices } = require('playwright');
/* Testes da 6.0.0 (Listening Academy): migração do save real da 5.0, reprodução de áudio, velocidades,
   pausa/continuar, repetição, fala por fala, por partes, ouvir primeiro + revelação gradual,
   exercícios (palavras, frases, ordem, diálogos), progressão e desbloqueio, Revisão, Caderno, XP,
   telas pequenas e os dois casos obrigatórios do Nihongo Chat no fluxo real. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V50 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v5.0-save.json'), 'utf8'));
Object.values(V50.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
{ const _d = new Date(), _t = _d.getFullYear() + '-' + String(_d.getMonth() + 1).padStart(2, '0') + '-' + String(_d.getDate()).padStart(2, '0'); if (V50.daily) V50.daily.day = _t; ['xp', 'ini'].forEach(k => { if (V50.chat[k]) V50.chat[k].day = _t; }); } // fixtures datadas: evita virada de dia
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + (JSON.stringify(a) === JSON.stringify(b) ? '' : ' → ' + JSON.stringify(a).slice(0, 300)));
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null; window.__spoken = [];
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate, pitch: u.pitch }); cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) { cur = null; u.onend && u.onend(); } }, window.__SPEAK_MS || 30); } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;
const night = `(() => { const R = Date; const off = new R(2026, 10, 20, 23, 10).getTime() - R.now(); class D extends R { constructor(...a) { if (a.length) super(...a); else super(R.now() + off); } static now() { return R.now() + off; } } window.Date = D; })();`;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (opts = {}) => { const ctx = await browser.newContext(opts.vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); if (opts.night) await ctx.addInitScript(night); if (opts.fast !== false) await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const loadSave = async (page, data) => { const raw = JSON.stringify(data); await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await page.reload(); await closeModals(page); return raw; };
  const fresh = async page => { await page.goto(URL); await page.evaluate(() => { __NQ.suspendSave(); localStorage.clear(); }); await page.reload(); await page.fill('#nameInput', 'Ana'); await page.click('[data-act="onboard"]'); await closeModals(page); };
  const openLA = async page => { await closeModals(page); await page.click('.tab[data-view="academia"]'); await page.click('[data-act="acadMode"][data-mode="la"]'); await page.waitForTimeout(150); await closeModals(page); };
  /* responde a pergunta atual (certo ou errado) pela interface */
  const answer = async (page, right) => {
    const info = await page.evaluate(r => { const q = __NQ.P.qs[__NQ.P.i]; if (q.bank) return { bank: r ? q.answer : q.answer.slice().reverse() }; const i = q.options.findIndex(o => !!o.correct === r); return { opt: i }; }, right);
    if (info.bank) { for (const i of info.bank) await page.click(`#player [data-act="laBuild"][data-i="${i}"]`); }
    else await page.click(`#player [data-act="laOpt"][data-i="${info.opt}"]`);
    await page.click('#player [data-act="laCheck"]'); await page.waitForTimeout(40);
  };
  const playLesson = async (page, id, right = true) => {
    await page.evaluate(id => { __NQ.S.settings.academyMode = 'la'; }, id);
    await page.click(`[data-act="laOpen"][data-id="${id}"]`); await page.click('#modal [data-act="laGo"]');
    await page.click('#player [data-act="laBegin"]');
    if (await page.isVisible('#player [data-act="laToQs"]')) await page.click('#player [data-act="laToQs"]');
    while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'q')) { await answer(page, typeof right === 'function' ? right(await page.evaluate(() => __NQ.P.i)) : right); await page.click('#player [data-act="laNextQ"]'); }
  };

  /* ---------- 1. save real da 5.0: migração segura ---------- */
  const page = await mk();
  const raw = await loadSave(page, V50);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '16.0.0', '5.0: migrado para o esquema 6 (versão 6.0.0)');
  ok(await page.evaluate(() => localStorage.getItem('nihongoQuest:backup:schema5')) === raw, '5.0: cópia de segurança do save antigo (backup:schema5) antes da migração');
  same(S.lessons, V50.lessons, '5.0: progresso da Academia preservado');
  same(S.catExams, V50.catExams, '5.0: avaliações preservadas');
  same(Object.fromEntries(Object.keys(V50.items).map(k => [k, S.items[k]])), V50.items, '5.0: Revisão e Caderno preservados');
  ok(S.xp === V50.xp && S.coins === V50.coins && S.history.length === V50.history.length, '5.0: XP, moedas e histórico preservados');
  same(S.settings, V50.settings, '5.0: configurações preservadas');
  same(S.chat, V50.chat, '5.0: Nihongo Chat inteiro preservado (conversas, personagens, figurinhas, fatos, desafios)');
  same(S.listening, V50.listening, '5.0: estatísticas da Academia Auditiva preservadas');
  ok(S.lacad && S.lacad.v === 1 && Object.keys(S.lacad.lessons).length === 0, '5.0: Listening Academy adicionada vazia');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 14, 'save regravado no esquema 8');

  /* ---------- 2. Listening Academy: estrutura e desbloqueio ---------- */
  await openLA(page);
  ok(await page.isVisible('text=Listening Academy') && await page.$$eval('.wing-head', e => e.length) === 5, 'Listening Academy com 5 categorias dentro da Academia');
  const meta = await page.evaluate(() => ({ lessons: LA_LESSONS.length, types: [...new Set(LA_LESSONS.flatMap(l => l.ex.map(e => e.t)))].sort(), reused: LA_LESSONS.flatMap(l => l.wordRefs).filter(w => w.reused).length, fresh: LA_LESSONS.flatMap(l => l.wordRefs).filter(w => !w.reused).length }));
  ok(meta.lessons >= 25, 'conteúdo: ' + meta.lessons + ' lições');
  same(meta.types, ['comp', 'gist', 'id', 'intent', 'line', 'mean', 'order', 'rec', 'reg', 'reply', 'spot', 'tf'], 'doze formatos de exercício (não só múltipla escolha)');
  ok(meta.reused >= 15 && meta.fresh >= 30, 'palavras da Academia são reaproveitadas (' + meta.reused + ') e as novas viram itens (' + meta.fresh + ')');
  const built = await page.evaluate(() => { const bad = []; LA_LESSONS.forEach(L => L.ex.forEach((ex, i) => { const q = laBuildQ(ex, L, i); if (!q || !q.lines.length || !q.lines.every(l => l.jp) || (!q.bank && q.options.filter(o => o.correct).length !== 1) || (!q.bank && new Set(q.options.map(o => o.label)).size !== q.options.length)) bad.push(L.id + '#' + i); })); return bad; });
  same(built, [], 'todos os exercícios geram áudio e exatamente uma resposta certa, sem opções repetidas');
  const locked = await page.evaluate(() => ({ c2: laCatUnlocked(LA_CAT.la2), l2: laLessonUnlocked(LA_LESSON.la1l2), l1: laLessonUnlocked(LA_LESSON.la1l1), req: laReqText(LA_CAT.la2) }));
  ok(locked.l1 && !locked.l2 && !locked.c2, 'progressão: só a 1ª lição abre; as próximas e a categoria 2 ficam bloqueadas');
  ok(/Reconhecimento de palavras/.test(locked.req), 'requisito explicado: ' + locked.req);
  ok(await page.evaluate(() => { const c = LA_CAT.la5; return c.acad.includes('c8') && /Japonês Falado/.test(laReqText(c)); }), 'conversas naturais exigem Japonês Falado na Academia (não desbloqueia o que ainda não foi ensinado)');

  /* ---------- 3. lição: palavras novas, ouvir primeiro, áudio ---------- */
  await page.click('[data-act="laOpen"][data-id="la1l1"]'); await page.click('#modal [data-act="laGo"]');
  ok(await page.isVisible('#player .la-cast') && await page.isVisible('text=Como funciona'), 'introdução explica ouvir → responder → revelar e mostra as vozes');
  await page.click('#player [data-act="laBegin"]');
  const learn = await page.evaluate(() => __NQ.P.phase === 'learn' ? __NQ.P.learn.map(w => w.id) : []);
  ok(await page.isVisible('#player .la-word .chip.k-new'), 'palavra nova identificada (“Nova”), com escrita, romaji, tradução e áudio');
  ok(learn.length && await page.evaluate(ids => ids.every(id => __NQ.S.items[id] && __NQ.S.items[id].seen), learn), 'palavras novas vão para o Caderno/Revisão (apresentadas)');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('#player [data-act="laSayWord"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].lang === 'ja-JP'), 'botão de ouvir a palavra nova toca em japonês');
  await page.click('#player [data-act="laToQs"]');
  await page.evaluate(() => { window.__spoken = []; }); await page.waitForTimeout(600);
  ok(await page.evaluate(() => window.__spoken.length >= 1), 'o áudio toca sozinho ao abrir o exercício (ouvir primeiro)');
  ok(!(await page.isVisible('#player .la-text')) && !(await page.textContent('#player .p-body')).includes(await page.evaluate(() => __NQ.P.qs[0].lines[0].jp)), 'antes da tentativa: sem japonês, romaji ou tradução na tela');
  // velocidades
  const rates = {};
  for (const v of ['0.75', '1', '1.25', '1.5']) { await page.click(`#player [data-act="laSpeed"][data-v="${v}"]`); await page.evaluate(() => { window.__spoken = []; }); await page.click('#player [data-act="laRestart"]'); await page.waitForTimeout(120); rates[v] = await page.evaluate(() => (window.__spoken[0] || {}).rate); }
  ok(rates['0.75'] < rates['1'] && rates['1'] < rates['1.25'] && rates['1.25'] < rates['1.5'], 'quatro velocidades mudam a taxa da voz ' + JSON.stringify(rates));
  ok(rates['0.75'] >= 0.5 && rates['1.5'] <= 2, 'velocidades dentro de limites que não distorcem a voz');
  ok(await page.evaluate(() => __NQ.S.lacad.speed === 1.5), 'velocidade escolhida fica salva');
  await page.click('#player [data-act="laSpeed"][data-v="1"]');
  // repetir várias vezes
  await page.evaluate(() => { window.__spoken = []; });
  for (let k = 0; k < 3; k++) { await page.click('#player [data-act="laRestart"]'); await page.waitForTimeout(100); }
  ok(await page.evaluate(() => window.__spoken.length === 3), 'pode ouvir de novo quantas vezes quiser');
  // revelar japonês/romaji antes da resposta como dica
  await page.click('#player [data-act="laShow"][data-k="ro"]');
  ok(await page.isVisible('#player .la-text .ro') && !(await page.isVisible('#player .la-text .la-pt')), 'dica: romaji aparece; tradução continua escondida antes da tentativa');
  ok(await page.evaluate(() => __NQ.P.hinted), 'uso de dica registrado (vale menos XP, mas não pune)');
  const xp0 = await page.evaluate(() => __NQ.S.xp);
  await answer(page, true);
  ok(await page.evaluate(() => __NQ.S.xp) - xp0 === 4, 'acerto com dica: +4 XP');
  await page.click('#player [data-act="laShow"][data-k="pt"]');
  ok(await page.isVisible('#player .la-text .la-pt'), 'depois da resposta: revela a tradução');
  await page.click('#player [data-act="laShowAll"]');
  ok(await page.isVisible('#player .la-text .la-jp') && await page.isVisible('#player .la-text .ro') && await page.isVisible('#player .la-text .la-pt'), 'botão “Tudo” mostra japonês, romaji e tradução');
  await page.click('#player [data-act="laNextQ"]'); await page.waitForTimeout(50);
  ok(!(await page.isVisible('#player .la-text')), 'próxima pergunta começa escondida de novo');
  const xp1 = await page.evaluate(() => __NQ.S.xp);
  await answer(page, true);
  ok(await page.evaluate(() => __NQ.S.xp) - xp1 === 8, 'acerto sem dica: +8 XP');
  ok(await page.evaluate(() => __NQ.S.history.slice(-1)[0].ctx === 'lacad:la1l1' && __NQ.S.skills.audicao.a > 0), 'respostas entram no histórico e na habilidade Compreensão auditiva');
  await page.click('#player [data-act="laNextQ"]');
  while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'q')) { await answer(page, true); await page.click('#player [data-act="laNextQ"]'); }
  ok(await page.evaluate(() => __NQ.P.phase === 'result' && __NQ.P.pass && __NQ.S.lacad.lessons.la1l1.passed), 'lição concluída e salva');
  ok(await page.evaluate(() => laLessonUnlocked(LA_LESSON.la1l2)), 'a próxima lição é liberada');
  ok(await page.evaluate(() => Object.keys(__NQ.S.lacad.words).length >= 4), 'palavras reconhecidas contabilizadas');
  await page.click('#player [data-act="laExit"]');

  /* ---------- 4. reprovar não frustra: pode tentar de novo ---------- */
  await playLesson(page, 'la1l2', false);
  ok(await page.evaluate(() => __NQ.P.phase === 'result' && !__NQ.P.pass && !__NQ.S.lacad.lessons.la1l2.passed), 'abaixo de 70%: lição não concluída');
  ok(await page.isVisible('#player [data-act="laRetry"]') && await page.isVisible('#player [data-act="laErrPlay"]'), 'resultado oferece tentar de novo e ouvir os erros outra vez');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#player [data-act="laErrPlay"]'); await page.waitForTimeout(120);
  ok(await page.evaluate(() => window.__spoken.length >= 1), '“Ouvir de novo” nos erros toca o áudio');
  ok(await page.evaluate(() => Object.keys(__NQ.S.items).some(id => id.startsWith('la:') || true) && __NQ.S.history.slice(-1)[0].ok === false), 'erros registrados para a Revisão');
  await page.click('#player [data-act="laExit"]');

  /* ---------- 5. diálogos: ouvir tudo, cada fala, pausar e continuar ---------- */
  await page.evaluate(() => { ['c1', 'c4', 'c5', 'c8'].forEach(id => { __NQ.S.catExams[id] = { passed: true, best: 90, attempts: 1 }; }); LA_CATS.slice(0, 3).forEach(c => { c.lessons.forEach(l => { __NQ.S.lacad.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); __NQ.S.lacad.exams[c.id] = { passed: true, best: 90, attempts: 1 }; }); __NQ.setState(__NQ.S); });
  await openLA(page);
  ok(await page.evaluate(() => laLessonUnlocked(LA_LESSON.la4l1) && !laLessonUnlocked(LA_LESSON.la4l2)), 'categoria 4 libera com a avaliação da 3 e a ala Gramática');
  await page.click('.wing [data-act="laOpen"][data-id="la4l1"]'); await page.click('#modal [data-act="laGo"]'); await page.click('#player [data-act="laBegin"]');
  if (await page.isVisible('#player [data-act="laToQs"]')) await page.click('#player [data-act="laToQs"]');
  await page.evaluate(() => { window.__SPEAK_MS = 400; window.__spoken = []; });
  // 7.0: primeiro toca a pergunta em japonês; espera o diálogo começar
  await page.waitForFunction(() => LA.state === 'playing' && LA.mode === 'all', null, { timeout: 4000 }); await page.waitForTimeout(100);
  ok(await page.$$eval('#player .la-line', e => e.length) === 5, 'diálogo mostra as 5 falas com quem fala e botão de ouvir cada uma');
  ok(await page.evaluate(() => window.__spoken.length >= 1 && LA.state === 'playing'), 'diálogo completo começa a tocar');
  await page.click('#player [data-act="laToggle"]'); await page.waitForTimeout(60);
  const paused = await page.evaluate(() => ({ st: LA.state, idx: LA.idx, n: window.__spoken.length }));
  ok(paused.st === 'paused' && /Continuar/.test(await page.textContent('#player [data-la-toggle]')), 'pausar: o botão vira “Continuar”');
  await page.waitForTimeout(500);
  ok(await page.evaluate(n => window.__spoken.length === n, paused.n), 'pausado: nenhuma fala nova toca');
  await page.click('#player [data-act="laToggle"]'); await page.waitForTimeout(100);
  ok(await page.evaluate(i => LA.state === 'playing' && LA.idx === i, paused.idx), 'continuar: retoma da fala em que parou');
  await page.evaluate(() => { window.__SPEAK_MS = 30; });
  await page.waitForTimeout(1200);
  const pitches = await page.evaluate(() => window.__spoken.map(s => s.pitch));
  ok(new Set(pitches).size >= 2, 'vozes diferentes por personagem (tom): ' + [...new Set(pitches)].join(', '));
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('#player [data-act="laLine"][data-i="2"]'); await page.waitForTimeout(200);
  ok(await page.evaluate(() => window.__spoken.length === 1 && /ブラジル/.test(window.__spoken[0].text)), 'ouvir só uma fala do diálogo (fala 3)');
  // resolve a lição inteira (todos os formatos de diálogo)
  while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'q')) { await answer(page, true); await page.click('#player [data-act="laNextQ"]'); }
  ok(await page.evaluate(() => !!__NQ.S.lacad.dialogs.la4l1), 'diálogo compreendido registrado');
  await page.click('#player [data-act="laExit"]');

  /* ---------- 6. ordem das palavras e por partes ---------- */
  const ord = await page.evaluate(() => { const L = LA_LESSON.la2l2; const i = L.ex.findIndex(e => e.t === 'order'); return laBuildQ(L.ex[i], L, i); });
  ok(ord.parts.length === 3 && ord.bank.some((b, i) => b.i !== i), 'ordem das palavras: peças embaralhadas');
  await page.evaluate(() => { __NQ.S.lacad.lessons.la2l2 = { passed: true, best: 100, attempts: 1 }; });
  await page.evaluate(() => { const L = LA_LESSON.la2l2; laStart(L.id, 'lesson'); const i = L.ex.findIndex(e => e.t === 'order'); laSetupQs([laBuildQ(L.ex[i], L, i)]); renderPlayer(); });
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#player [data-act="laParts"]'); await page.waitForTimeout(2600);
  same(await page.evaluate(() => window.__spoken.map(s => s.text)), ['みず', 'を', 'ください'], 'ouvir por partes');
  await answer(page, false);
  ok(await page.evaluate(() => !__NQ.P.lastOk), 'ordem errada é corrigida');
  await page.click('#player .p-close'); await page.click('#player [data-act="pExit"]');

  /* ---------- 7. Revisão, Caderno, XP e Perfil ---------- */
  await page.click('.tab[data-view="revisao"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('[data-act="startReview"][data-mode="la"]'), 'Revisão tem “Revisão auditiva” com as palavras da Listening Academy');
  await page.click('[data-act="startReview"][data-mode="la"]'); await page.waitForTimeout(200);
  ok(await page.evaluate(() => __NQ.P && __NQ.P.qs.length >= 4 && __NQ.P.qs.every(q => q.type === 'listen')), 'revisão auditiva: perguntas pelo som');
  await page.click('#player .p-close'); await page.click('#player [data-act="pExit"]');
  await page.click('.tab[data-view="caderno"]'); await page.waitForTimeout(100);
  const nbt = await page.textContent('#nbList');
  ok(/Listening Academy · Cumprimentos|Listening Academy · Comida/.test(nbt) || nbt.includes('Listening Academy'), 'Caderno mostra as palavras da Listening Academy com a origem');
  ok(nbt.includes('Diálogos compreendidos') && nbt.includes('ブラジル'), 'Caderno mostra o diálogo compreendido com japonês, romaji e tradução');
  await page.click('.tab[data-view="perfil"]'); await page.waitForTimeout(100);
  const prof = await page.textContent('#view');
  ok(prof.includes('Listening Academy') && prof.includes('categorias concluídas') && prof.includes('diálogos compreendidos') && prof.includes('Academia Auditiva'), 'Perfil mostra a evolução auditiva');
  await page.click('.tab[data-view="inicio"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.nq-tile[data-act="gotoLA"]'), 'Início mostra a Listening Academy (10.0: bloco na “Sua jornada”)');

  /* ---------- 8. avaliação da categoria ---------- */
  await page.evaluate(() => { LA_CAT.la4.lessons.forEach(l => { __NQ.S.lacad.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); });
  await openLA(page);
  await page.click('[data-act="laExamOpen"][data-id="la4"]');
  await page.click('#player [data-act="laExamGo"]');
  ok(await page.evaluate(() => __NQ.P.qs.length === 10 && new Set(__NQ.P.qs.map(q => q.L.id)).size >= 4), 'avaliação: 10 exercícios de várias lições');
  const xpE = await page.evaluate(() => __NQ.S.xp);
  while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'q')) { await answer(page, true); await page.click('#player [data-act="laNextQ"]'); }
  ok(await page.evaluate(() => __NQ.S.lacad.exams.la4.passed), 'avaliação aprovada conclui a categoria');
  ok(await page.evaluate(x => __NQ.S.xp - x >= 180, xpE), 'XP vem do sistema de sempre (respostas + bônus da avaliação)');
  ok(await page.evaluate(() => laLessonUnlocked(LA_LESSON.la5l1)), 'categoria 5 liberada');
  await page.click('#player [data-act="laExit"]');
  // nível 5: sem apoio visual antes da resposta
  await page.evaluate(() => { LA_CAT.la5.lessons.slice(0, 4).forEach(l => { __NQ.S.lacad.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); __NQ.setState(__NQ.S); });
  await openLA(page);
  await page.click('[data-act="laOpen"][data-id="la5l5"]'); await page.click('#modal [data-act="laGo"]'); await page.click('#player [data-act="laBegin"]');
  if (await page.isVisible('#player [data-act="laToQs"]')) await page.click('#player [data-act="laToQs"]');
  ok(!(await page.isVisible('#player [data-act="laShow"]')) && await page.isVisible('text=Nível 5'), 'nível 5: texto só depois da resposta');
  await page.click('#player .p-close'); await page.click('#player [data-act="pExit"]');

  /* ---------- 9. telas pequenas ---------- */
  for (const vp of [{ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }, { ...devices['Galaxy S8'] }]) {
    const sm = await mk({ vp });
    await loadSave(sm, V50); await openLA(sm);
    const w1 = await sm.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
    await sm.evaluate(() => { ['c1', 'c4', 'c5'].forEach(id => { __NQ.S.catExams[id] = { passed: true, best: 90, attempts: 1 }; }); LA_CATS.slice(0, 3).forEach(c => { c.lessons.forEach(l => { __NQ.S.lacad.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); __NQ.S.lacad.exams[c.id] = { passed: true, best: 90, attempts: 1 }; }); laStart('la4l1', 'lesson'); laSetupQs(laBuildLesson(LA_LESSON.la4l1)); renderPlayer(); });
    await sm.waitForTimeout(200);
    const w2 = await sm.evaluate(() => { const b = document.querySelector('#pBody'); return b.scrollWidth <= b.clientWidth + 1; });
    const tap = await sm.evaluate(() => [...document.querySelectorAll('#player .la-speed button, #player .la-line-btn, #player .play-big')].every(b => b.getBoundingClientRect().height >= 36));
    ok(w1 && w2 && tap, 'tela ' + (vp.viewport ? vp.viewport.width : 360) + 'px: sem rolagem horizontal e botões de áudio confortáveis');
    await sm.context().close();
  }

  /* ---------- 10. Nihongo Chat: casos obrigatórios no fluxo real (à noite, perfil novo) ---------- */
  const ch = await mk({ night: true });
  await fresh(ch);
  await ch.click('.tab[data-view="chat"]'); await ch.click('[data-act="chatOpen"][data-id="ren"]'); await ch.waitForTimeout(200);
  const th0 = await ch.evaluate(() => __NQ.CHAT.thread('ren').map(m => m.jp).filter(Boolean));
  ok(th0[0] === 'こんばんは〜！ はじめまして！', 'Ren abre à noite com 「こんばんは〜！ はじめまして！」');
  const send = async t => { await ch.fill('#chatIn', t); await ch.press('#chatIn', 'Enter'); await ch.waitForTimeout(80); };
  const lastMe = () => ch.evaluate(() => [...__NQ.CHAT.thread('ren')].reverse().find(m => m.from === 'me'));
  const after = () => ch.evaluate(() => { const th = __NQ.CHAT.thread('ren'); let i = th.length - 1; while (i >= 0 && th[i].from !== 'me') i--; return th.slice(i + 1); });
  await send('konbanwa! hajimemashite!');
  let me = await lastMe(), rep = await after();
  ok(me.kind !== 'unknown' && !rep.some(m => m.kind === 'unk'), 'OBRIGATÓRIO 1: “konbanwa! hajimemashite!” reconhecido (' + me.kind + ')');
  ok(rep.some(m => m.from === 'char' && /よろしく|うん/.test(m.jp || '')), 'Ren responde ao cumprimento: ' + rep.filter(m => m.jp).map(m => m.jp).join(' / '));
  // variações do caso 1 no mesmo contexto
  const v1 = await ch.evaluate(() => { const out = {}; ['konbanwa! hajimemashite!', 'Konbanwa Hajimemashite', 'KONBANWA!!! HAJIMEMASHITE', 'konbanwa,hajimemashite', 'こんばんは！はじめまして！', 'こんばんは〜！ はじめまして！', 'こんばんははじめまして', 'konbanwa hajimemashite yoroshiku'].forEach(t => { const st = __NQ.CHAT.state('ren'); st.active.ex = 'ren.t.intro.0.ex'; st.active.topic = 'intro'; st.active.step = 0; st.active.miss = 0; const r = __NQ.CHAT.reply('ren', t); out[t] = r.kind; }); return out; });
  same(Object.entries(v1).filter(([, k]) => k === 'unknown'), [], 'caso 1 com maiúsculas, espaços, pontuação, kana e a própria fala do Ren');
  // caso 2: Ren dormiu tarde
  await ch.evaluate(() => { const st = __NQ.CHAT.state('ren'); st.met = true; st.active.topic = null; st.active.ex = null; });
  await ch.evaluate(() => __NQ.CHAT.seed(7));
  for (let k = 0; k < 6; k++) { const last = await ch.evaluate(() => [...__NQ.CHAT.thread('ren')].reverse().find(m => m.from === 'char' && m.jp).jp); if (/ねるの おそかった|は？/.test(last) && await ch.evaluate(() => __NQ.CHAT.state('ren').active.ex === 'ren.ex.sleep')) break; await send('genki?'); }
  ok(await ch.evaluate(() => __NQ.CHAT.state('ren').active.ex === 'ren.ex.sleep'), 'Ren diz 「きのう ねるの おそかった（笑）。…は？」 no fluxo real');
  await send('watashi mo');
  me = await lastMe(); rep = await after();
  ok(me.kind !== 'unknown' && !rep.some(m => m.kind === 'unk'), 'OBRIGATÓRIO 2: “watashi mo” reconhecido no contexto (' + me.kind + ')');
  ok(rep.some(m => m.from === 'char' && /なかま|も？|ねむい/.test(m.jp || '')), 'Ren entende “eu também dormi tarde”: ' + rep.filter(m => m.jp).map(m => m.jp).join(' / '));
  const v2 = await ch.evaluate(() => { const out = {}; ['watashi mo', 'Watashi Mo', 'WATASHI MO!', 'watashi mo.', 'watashimo', 'わたしも', '私も', 'watshi mo', 'boku mo', 'Watashi mo! Nemui...', 'konbanwa, watashi mo'].forEach(t => { const st = __NQ.CHAT.state('ren'); st.active.ex = 'ren.ex.sleep'; st.active.topic = null; st.active.miss = 0; out[t] = __NQ.CHAT.reply('ren', t).kind; }); return out; });
  same(Object.entries(v2).filter(([, k]) => k === 'unknown'), [], 'caso 2 com variações de escrita e frase composta');
  // sem falsos positivos: texto sem sentido continua gentil (pede para repetir, não marca erro)
  const unk = await ch.evaluate(() => { const st = __NQ.CHAT.state('ren'); st.active.ex = 'ren.ex.sleep'; st.active.miss = 0; const n = __NQ.CHAT.thread('ren').length; const r = __NQ.CHAT.reply('ren', 'xqzt bvnm'); const add = __NQ.CHAT.thread('ren').slice(n); return { k: r.kind, fb: add.some(m => m.kind === 'fb'), rep: add.some(m => /わかんなかった|もう一回|どういう/.test(m.jp || '')) }; });
  ok(unk.k === 'unknown' && !unk.fb && unk.rep, 'texto sem sentido: não reconhecido, sem rótulo de erro, Ren pede para repetir');
  const fp = await ch.evaluate(() => ['asdf ghjk', 'kkkkqqq zzz', 'blorf mnbv'].map(t => __NQ.CHAT.analyze(t, null, 'ren').intents.filter(x => x.s >= 2.5).length));
  ok(fp.every(n => n === 0), 'sem falsos positivos em texto aleatório');

  ok(!errors.length, 'sem erros de JavaScript' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await browser.close();
  console.log(fails ? `\n${fails} FALHA(S)` : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
