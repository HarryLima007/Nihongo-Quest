const { chromium, devices } = require('playwright');
const path = require('path');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const shots = path.resolve(__dirname, '../shots'); require('fs').mkdirSync(shots, { recursive: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

async function answer(page, correct) {
  const q = await page.evaluate(() => { const P = __NQ.P; const q = P.qs[P.i]; return JSON.parse(JSON.stringify(q)); });
  if (q.type === 'mc' || q.type === 'listen') {
    let i = q.options.findIndex(o => o.correct); if (!correct) i = q.options.findIndex(o => !o.correct);
    await page.click(`[data-act="opt"][data-i="${i}"]`); await page.click('[data-act="check"]');
  } else if (q.type === 'num_type') {
    await page.fill('#numInput', String(correct ? q.answer : q.answer + 1)); await page.click('[data-act="check"]');
  } else if (q.type === 'build') {
    const order = correct ? q.answer : q.answer.slice().reverse();
    const used = new Set();
    for (const tok of order) { const i = q.bank.findIndex((t, k) => t.jp === tok && !used.has(k)); used.add(i); await page.click(`[data-act="build"][data-i="${i}"]`); }
    await page.click('[data-act="check"]');
  } else if (q.type === 'error') {
    const i = correct ? q.wrong : (q.wrong === 0 ? 1 : 0);
    await page.click(`[data-act="opt"][data-i="${i}"]`); await page.click('[data-act="check"]');
  } else if (q.type === 'match') {
    if (!correct) { await page.click('[data-act="mL"][data-i="0"]'); await page.click('[data-act="mR"][data-i="1"]'); }
    for (let i = 0; i < q.items.length; i++) { await page.click(`[data-act="mL"][data-i="${i}"]`); await page.click(`[data-act="mR"][data-i="${i}"]`); }
  }
  const fb = await page.evaluate(() => __NQ.P.lastOk);
  if (fb !== correct) { console.log('  answer mismatch on', q.type, q.prompt); fails++; }
  await page.click('[data-act="next"]');
}
async function runQuiz(page, correctFn) {
  let n = 0;
  while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'quiz')) { await answer(page, correctFn(n++)); }
  return n;
}
async function doLesson(page, id, correctFn = () => true) {
  await page.evaluate(id => window.__go = id, id);
  await page.evaluate(id => { document.querySelector('[data-act="nav"][data-view="academia"]').click(); }, id);
  await page.click(`[data-act="openLesson"][data-id="${id}"]`);
  await page.click(`#modal [data-act="startLesson"][data-id="${id}"]:not([data-mode])`);
  while (await page.$('[data-act="tNext"]')) await page.click('[data-act="tNext"]');
  await page.click('[data-act="toPractice"]');
  await runQuiz(page, () => true);
  ok(await page.evaluate(() => __NQ.P.phase === 'examIntro'), id + ': prática leva à introdução da avaliação');
  await page.click('[data-act="startExam"]');
  const n = await runQuiz(page, correctFn);
  const res = await page.evaluate(() => ({ pct: __NQ.P.pct, pass: __NQ.P.pass }));
  return { n, ...res };
}
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['Pixel 5'] });
  const page = require('./reveal')(await ctx.newPage());
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); });
  await page.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await page.goto(URL);
  ok(await page.isVisible('#nameInput'), 'tela de boas-vindas aparece');
  await page.screenshot({ path: shots + '/01-welcome.png' });
  await page.click('[data-act="onboard"]');
  ok(await page.isVisible('#nameInput'), 'nome vazio não avança');
  await page.fill('#nameInput', 'Harry');
  await page.click('[data-act="onboard"]');
  ok(await page.isVisible('.hero'), 'início renderizado');
  await page.screenshot({ path: shots + '/02-home.png', fullPage: true });
  for (const v of ['academia', 'revisao', 'caderno', 'perfil', 'inicio']) {
    await page.click(`.tab[data-view="${v}"]`);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    ok(sw <= 0, `aba ${v} abre sem rolagem horizontal (${sw})`);
    if (v !== 'inicio') await page.screenshot({ path: shots + `/03-${v}.png`, fullPage: true });
  }
  // locked lesson toast
  await page.click('.tab[data-view="academia"]');
  await page.click('[data-act="openLesson"][data-id="c1l2"]');
  ok(await page.isHidden('#modal') || !(await page.isVisible('#modal .sheet')), 'lição 2 bloqueada não abre');

  // theory screenshot
  await page.click('[data-act="openLesson"][data-id="c1l1"]');
  await page.click('#modal [data-act="startLesson"][data-id="c1l1"]');
  await page.click('[data-act="tNext"]');
  await page.screenshot({ path: shots + '/04-theory.png' });
  // exit confirm
  await page.click('[data-act="pClose"]'); ok(await page.isVisible('[data-act="pStay"]'), 'confirmação de saída aparece');
  await page.click('[data-act="pExit"]');

  // lesson 1 fail then pass
  let r = await doLesson(page, 'c1l1', n => n % 2 === 0);
  ok(!r.pass && r.pct < 80, `c1l1 reprovação com ${r.pct}% (${r.n} perguntas)`);
  ok(!(await page.evaluate(() => __NQ.S.lessons.c1l1.passed)), 'c1l1 não marcada como aprovada');
  await page.screenshot({ path: shots + '/05-fail.png' });
  await page.click('[data-act="retryExam"]'); await page.click('[data-act="startExam"]');
  // screenshot a question
  await page.screenshot({ path: shots + '/06-question.png' });
  await runQuiz(page, () => true);
  r = await page.evaluate(() => ({ pct: __NQ.P.pct, pass: __NQ.P.pass }));
  ok(r.pass && r.pct === 100, 'c1l1 aprovada após nova tentativa');
  await page.screenshot({ path: shots + '/07-pass.png' });
  await page.click('[data-act="pExit"]');
  await page.waitForTimeout(500);
  if (await page.isVisible('#modal .sheet')) { await page.screenshot({ path: shots + '/08-levelup.png' }); await page.click('#modal [data-act="closeModal"]'); }

  for (const id of ['c1l2', 'c1l3', 'c1l4', 'c1l5']) {
    r = await doLesson(page, id, n => n !== 1); // erra 1
    ok(r.pass, `${id} aprovada com ${r.pct}% (${r.n} perguntas)`);
    await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
    while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  }
  await page.reveal('[data-act="openLesson"][data-id="c2l1"]');
  ok(!(await page.evaluate(() => document.querySelector('[data-act="openLesson"][data-id="c2l1"] .disc').textContent.trim().length > 3)), 'Hiragana ainda bloqueada antes da avaliação final');
  // category exam
  await page.click('.tab[data-view="academia"]');
  await page.click('[data-act="openCatExam"][data-cat="c1"]');
  await page.click('#modal [data-act="startCatExam"]');
  await page.click('[data-act="startExam"]');
  const ncat = await runQuiz(page, n => n > 1); // erra 2 de 15 → 86%
  r = await page.evaluate(() => ({ pct: __NQ.P.pct, pass: __NQ.P.pass }));
  ok(ncat === 15 && r.pass, `avaliação final c1: ${ncat} perguntas, ${r.pct}%`);
  await page.screenshot({ path: shots + '/09-cat-pass.png' });
  await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
  while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  const unl = await page.evaluate(() => ({ c2: !!__NQ.S.catExams.c1.passed }));
  ok(unl.c2, 'Hiragana desbloqueada');
  r = await doLesson(page, 'c2l1'); ok(r.pass, 'c2l1 aprovada'); await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
  while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  // 2.1: Vocabulário já abre depois de Primeiros Passos (trilha da fala em paralelo à escrita)
  await page.click('.tab[data-view="academia"]');
  await page.click('[data-act="openLesson"][data-id="c4l1"]');
  ok(await page.isVisible('#modal .sheet'), 'Vocabulário liberado depois de Primeiros Passos');
  await page.click('#modal [data-act="closeModal"]').catch(() => {}); await page.waitForTimeout(150);
  await page.reveal('[data-act="openLesson"][data-id="c3l1"]');
  ok(!(await page.evaluate(() => document.querySelector('[data-act="openLesson"][data-id="c3l1"] .disc').textContent.trim().length > 3)), 'Katakana bloqueado antes da avaliação de Hiragana');
  for (const id of ['c2l2', 'c2l3', 'c2l4', 'c2l5', 'c2l6', 'c2l7', 'c2l8']) { r = await doLesson(page, id); ok(r.pass, id + ' aprovada (' + r.n + ' perguntas)'); await page.click('[data-act="pExit"]'); await page.waitForTimeout(300); while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); } }
  await page.click('.tab[data-view="academia"]');
  await page.click('[data-act="openCatExam"][data-cat="c2"]'); await page.click('#modal [data-act="startCatExam"]'); await page.click('[data-act="startExam"]');
  await runQuiz(page, () => true); ok(await page.evaluate(() => __NQ.P.pass), 'avaliação final Hiragana aprovada');
  await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
  while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  for (const id of ['c4l1', 'c4l2', 'c4l3', 'c4l4', 'c4l5', 'c4l6', 'c4l7', 'c4l8', 'c4l9']) { r = await doLesson(page, id); ok(r.pass, id + ' aprovada (' + r.n + ' perguntas)'); await page.click('[data-act="pExit"]'); await page.waitForTimeout(300); while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); } }
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="openCatExam"][data-cat="c4"]'); await page.click('#modal [data-act="startCatExam"]'); await page.click('[data-act="startExam"]');
  await runQuiz(page, () => true); await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
  while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  for (const id of ['c5l1', 'c5l2', 'c5l3']) {
    await page.click('.tab[data-view="academia"]'); await page.click(`[data-act="openLesson"][data-id="${id}"]`); await page.click(`#modal [data-act="startLesson"][data-id="${id}"]:not([data-mode])`);
    while (await page.$('[data-act="tNext"]')) await page.click('[data-act="tNext"]');
    await page.click('[data-act="toPractice"]');
    if (id === 'c5l3') { // screenshot each exercise type encountered
      let k = 0; while (await page.evaluate(() => __NQ.P.phase === 'quiz')) { const t = await page.evaluate(() => __NQ.P.qs[__NQ.P.i].type); await page.screenshot({ path: shots + `/10-${id}-${k++}-${t}.png` }); await answer(page, true); }
    } else await runQuiz(page, () => true);
    await page.click('[data-act="startExam"]'); await runQuiz(page, () => true);
    ok(await page.evaluate(() => __NQ.P.pass), id + ' aprovada'); await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
    while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  }
  // review
  await page.click('.tab[data-view="revisao"]'); await page.screenshot({ path: shots + '/11-review.png', fullPage: true });
  await page.click('[data-act="startReview"][data-mode="due"]');
  const nrev = await runQuiz(page, n => n % 3 !== 0);
  ok(nrev > 0 && await page.evaluate(() => __NQ.P.phase === 'result'), `sessão de revisão com ${nrev} perguntas`);
  await page.click('[data-act="pExit"]'); await page.waitForTimeout(300);
  while (await page.isVisible('#modal .sheet')) { await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(150); }
  // notebook search & filter
  await page.click('.tab[data-view="caderno"]');
  const nbCount = await page.$$eval('.nb-entry', e => e.length);
  ok(nbCount >= 54, 'caderno com ' + nbCount + ' itens');
  await page.fill('#nbSearch', 'água'); const nbS = await page.$$eval('.nb-entry', e => e.length); ok(nbS >= 1 && nbS < 5, 'busca “água” encontra ' + nbS);
  await page.fill('#nbSearch', ''); await page.click('[data-act="nbFilter"][data-f="revisar"]');
  await page.screenshot({ path: shots + '/12-notebook.png', fullPage: true });
  // home missions claim
  await page.click('.tab[data-view="inicio"]');
  const claimBtns = await page.$$('[data-act="claim"]:not([disabled])');
  const coinsBefore = await page.evaluate(() => __NQ.S.coins);
  if (claimBtns.length) { await claimBtns[0].click(); ok(await page.evaluate(() => __NQ.S.coins) > coinsBefore, 'resgate de missão dá moedas'); } else ok(false, 'nenhuma missão concluída para resgatar');
  await page.screenshot({ path: shots + '/13-home-after.png', fullPage: true });
  // shop
  await page.click('.tab[data-view="perfil"]');
  const coins = await page.evaluate(() => __NQ.S.coins);
  await page.click('[data-act="buy"][data-id="sakura"]');
  ok(await page.evaluate(() => __NQ.S.shop.equipped === 'sakura'), 'compra e equipa acessório (moedas antes ' + coins + ')');
  await page.click('[data-act="toggle"][data-key="romaji"]'); ok(await page.evaluate(() => __NQ.S.settings.romaji === false), 'romaji desligado');
  await page.click('[data-act="setting"][data-key="theme"][data-val="dark"]'); ok(await page.evaluate(() => document.documentElement.dataset.theme === 'dark'), 'tema escuro');
  await page.screenshot({ path: shots + '/14-profile-dark.png', fullPage: true });
  // persistence
  const snap = await page.evaluate(() => ({ xp: __NQ.S.xp, coins: __NQ.S.coins, passed: Object.keys(__NQ.S.lessons).length, ach: Object.keys(__NQ.S.achievements).length }));
  await page.reload();
  const snap2 = await page.evaluate(() => ({ xp: __NQ.S.xp, coins: __NQ.S.coins, passed: Object.keys(__NQ.S.lessons).length, ach: Object.keys(__NQ.S.achievements).length }));
  ok(JSON.stringify(snap) === JSON.stringify(snap2), 'progresso preservado após recarregar ' + JSON.stringify(snap2));
  // export / reset / import
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="export"]');
  const exported = await page.inputValue('#exportText');
  ok(await page.isVisible('[data-act="downloadExport"]'), 'botão de baixar arquivo disponível fora do iframe');
  await page.click('#modal [data-act="closeModal"]');
  await page.click('[data-act="resetAsk"]'); await page.click('[data-act="resetConfirm"]');
  ok(await page.isVisible('#nameInput'), 'apagar progresso volta para boas-vindas');
  await page.fill('#nameInput', 'Teste'); await page.click('[data-act="onboard"]');
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="import"]');
  await page.fill('#importText', '{"bad": true}'); await page.click('[data-act="importCheck"]');
  ok(await page.isVisible('[data-act="importCheck"]'), 'JSON inválido é recusado');
  // texto grande com muitas linhas: preencher direto (page.fill fica lento demais com ~80 KB formatados)
  await page.$eval('#importText', (el, v) => { el.value = v; }, exported); await page.click('[data-act="importCheck"]'); await page.click('[data-act="importConfirm"]');
  const snap3 = await page.evaluate(() => ({ xp: __NQ.S.xp, coins: __NQ.S.coins, passed: Object.keys(__NQ.S.lessons).length, ach: Object.keys(__NQ.S.achievements).length }));
  ok(JSON.stringify(snap3) === JSON.stringify(snap2), 'importação restaura ' + JSON.stringify(snap3));
  // file import
  require('fs').writeFileSync(shots + '/export.json', exported);
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="import"]');
  await page.setInputFiles('#importFile', shots + '/export.json'); await page.waitForTimeout(200);
  ok((await page.inputValue('#importText')).length > 100, 'arquivo .json carregado no importador');
  await page.click('#modal [data-act="closeModal"]');
  // migration of old save + corrupt save
  await page.evaluate(() => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', JSON.stringify({ xp: '250', completed: { c1l1: true }, profile: { name: 'Antigo', onboarded: true } })); });
  await page.reload();
  const mig = await page.evaluate(() => ({ v: __NQ.S.schemaVersion, xp: __NQ.S.xp, l: __NQ.S.lessons.c1l1 && __NQ.S.lessons.c1l1.passed, streak: typeof __NQ.S.streak.freezes, backup: !!localStorage.getItem('nihongoQuest:backup') }));
  ok(mig.v === 3 && mig.xp === 250 && mig.l && mig.streak === 'number' && mig.backup, 'save antigo migrado ' + JSON.stringify(mig));
  await page.evaluate(() => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', '{quebrado'); });
  await page.reload();
  ok(await page.isVisible('#nameInput') && await page.evaluate(() => Object.keys(localStorage).some(k => k.includes('corrompido'))), 'save corrompido guardado e app abre');
  // streak logic
  const st = await page.evaluate(() => { const S = __NQ.S; return true; });
  ok(errors.length === 0, 'sem erros de JavaScript: ' + errors.join(' | '));
  // small phone
  const p2 = require('./reveal')(await (await browser.newContext({ viewport: { width: 320, height: 640 }, deviceScaleFactor: 1 })).newPage());
  await p2.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await p2.goto(URL); await p2.evaluate(s => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', s); }, JSON.stringify(JSON.parse(exported).data)); await p2.reload();
  for (const v of ['inicio', 'academia', 'revisao', 'caderno', 'perfil']) { await p2.click(`.tab[data-view="${v}"]`); const sw = await p2.evaluate(() => document.documentElement.scrollWidth - innerWidth); ok(sw <= 0, `320px: ${v} sem rolagem horizontal (${sw})`); }
  await p2.click('.tab[data-view="academia"]'); await p2.click('[data-act="openLesson"][data-id="c5l2"]'); await p2.click('#modal [data-act="startLesson"][data-mode="exam"]'); await p2.click('[data-act="startExam"]');
  for (let k = 0; k < 6; k++) { const sw = await p2.evaluate(() => document.querySelector('.p-body').scrollWidth - document.querySelector('.p-body').clientWidth); if (sw > 0) ok(false, '320px pergunta com overflow ' + sw); await answer(p2, true); }
  await p2.screenshot({ path: shots + '/15-320.png' });
  console.log(fails ? fails + ' FALHAS' : 'TODOS OS TESTES PASSARAM');
  await browser.close();
})();
