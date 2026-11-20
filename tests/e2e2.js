const { chromium, devices } = require('playwright');
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const shots = path.resolve(__dirname, '../shots2'); fs.mkdirSync(shots, { recursive: true });
const V1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v1-save.json'), 'utf8'));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
// voz simulada: registra o que foi falado, a velocidade e se houve sobreposição
const stub = (voices) => `(() => {
  window.__spoken = []; window.__overlap = 0; let speaking = null;
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U;
  const ss = { paused: false, _l: [], getVoices: () => ${JSON.stringify(voices)},
    addEventListener(e, f) { this._l.push(f); }, resume() {},
    cancel() { if (speaking) { const u = speaking; speaking = null; clearTimeout(u._t); u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { if (speaking) window.__overlap++; const ja = ${JSON.stringify(voices)}.some(v => /^ja/.test(v.lang));
      if (!ja) return; speaking = u; window.__spoken.push({ text: u.text, rate: u.rate, pitch: u.pitch });
      setTimeout(() => u.onstart && u.onstart(), 5); u._t = setTimeout(() => { if (speaking === u) speaking = null; u.onend && u.onend(); }, 60); } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;
const JA = [{ lang: 'en-US', name: 'English', localService: true }, { lang: 'ja-JP', name: 'Japonês (teste)', localService: true }];
async function answer(page, correct) {
  const q = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.P.qs[__NQ.P.i])));
  if (q.type === 'listen' || q.type === 'mc') {
    let i = q.options.findIndex(o => o.correct); if (!correct) i = q.options.findIndex(o => !o.correct);
    await page.click(`[data-act="opt"][data-i="${i}"]`); await page.click('[data-act="check"]');
  } else if (q.type === 'num_type') { await page.fill('#numInput', String(correct ? q.answer : q.answer + 1)); await page.click('[data-act="check"]'); }
  else if (q.type === 'build') { const order = correct ? q.answer : q.answer.slice().reverse(); const used = new Set(); for (const tok of order) { const i = q.bank.findIndex((t, k) => t.jp === tok && !used.has(k)); used.add(i); await page.click(`[data-act="build"][data-i="${i}"]`); } await page.click('[data-act="check"]'); }
  else if (q.type === 'error') { await page.click(`[data-act="opt"][data-i="${correct ? q.wrong : (q.wrong ? 0 : 1)}"]`); await page.click('[data-act="check"]'); }
  else if (q.type === 'match') { for (let i = 0; i < q.items.length; i++) { await page.click(`[data-act="mL"][data-i="${i}"]`); await page.click(`[data-act="mR"][data-i="${i}"]`); } }
  const got = await page.evaluate(() => __NQ.P.lastOk); if (got !== correct) { fails++; console.log('  mismatch', q.type, q.prompt); }
  await page.click('[data-act="next"]');
}
async function runQuiz(page, f = () => true) { let n = 0; while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'quiz')) await answer(page, f(n++)); return n; }
async function closeModals(page) { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(150); } }
const snap = p => p.evaluate(() => { const S = __NQ.S; return { name: S.profile.name, xp: S.xp, coins: S.coins, level: __NQ.levelInfo(S.xp).level, streak: S.streak, lessons: S.lessons, catExams: S.catExams, ach: S.achievements, items: S.items, stats: S.stats, shop: S.shop, settings: { romaji: S.settings.romaji, sound: S.settings.sound, theme: S.settings.theme }, daily: S.daily, history: S.history.length }; });

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (voices, vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); if (voices !== 'none') await ctx.addInitScript(stub(voices)); else await ctx.addInitScript(() => { delete window.speechSynthesis; delete window.SpeechSynthesisUtterance; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/ERR_FAILED|fonts/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };

  /* ---------- 1. preservação de um save real da v1.0 ---------- */
  const page = await mk(JA);
  await page.goto(URL);
  const v1raw = JSON.stringify(V1.data);
  await page.evaluate(raw => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', raw); }, v1raw);
  await page.reload();
  const after = await snap(page);
  const before = V1.data;
  const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m);
  same(after.xp, before.xp, 'XP preservado (' + after.xp + ')'); same(after.coins, before.coins, 'moedas preservadas (' + after.coins + ')');
  same(after.level, (await page.evaluate(x => __NQ.levelInfo(x).level, before.xp)), 'nível preservado (' + after.level + ')');
  same(after.streak, before.streak, 'sequência preservada'); same(after.lessons, before.lessons, 'lições aprovadas preservadas (' + Object.keys(after.lessons).length + ')');
  same(after.catExams, before.catExams, 'avaliações finais preservadas'); same(after.ach, before.achievements, 'conquistas preservadas (' + Object.keys(after.ach).length + ')');
  same(after.items, before.items, 'caderno/revisão preservados (' + Object.keys(after.items).length + ' itens)'); same(after.stats, before.stats, 'estatísticas preservadas');
  same(after.shop, before.shop, 'loja preservada'); same(after.settings, { romaji: before.settings.romaji, sound: before.settings.sound, theme: before.settings.theme }, 'configurações preservadas');
  same(after.history, before.history.length, 'histórico preservado'); same(after.name, before.profile.name, 'perfil preservado');
  const mig = await page.evaluate(raw => ({ v: __NQ.S.schemaVersion, app: __NQ.S.appVersion, lst: !!__NQ.S.listening && __NQ.S.listening.level, disc: typeof __NQ.S.discoveries, bk: localStorage.getItem('nihongoQuest:backup') === raw, bk1: localStorage.getItem('nihongoQuest:backup:schema1') === raw, stored: JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion }), v1raw);
  ok(mig.v === 2 && mig.app === '2.0.0' && mig.lst === 'iniciante' && mig.disc === 'object' && mig.stored === 2, 'migração para esquema 2 ' + JSON.stringify(mig));
  ok(mig.bk && mig.bk1, 'cópia de segurança do save v1 criada antes da migração');
  await closeModals(page);
  await page.screenshot({ path: shots + '/01-home-v2.png', fullPage: true });

  /* ---------- 2. Academia tradicional continua funcionando ---------- */
  await page.click('.tab[data-view="academia"]');
  ok(await page.isVisible('[data-act="openLesson"][data-id="c5l2"]'), 'mapa tradicional abre');
  await page.click('[data-act="openLesson"][data-id="c5l2"]'); await page.click('#modal [data-act="startLesson"][data-mode="exam"]'); await page.click('[data-act="startExam"]');
  await runQuiz(page, n => n % 2 === 0); ok(!(await page.evaluate(() => __NQ.P.pass)), 'reprovação continua funcionando');
  await page.click('[data-act="retryExam"]'); await page.click('[data-act="startExam"]'); await runQuiz(page);
  ok(await page.evaluate(() => __NQ.P.pass && __NQ.P.pct === 100), 'aprovação continua funcionando'); await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('.tab[data-view="revisao"]'); await page.click('[data-act="startReview"][data-mode="due"]'); const nr = await runQuiz(page); ok(nr > 0, 'revisão tradicional (' + nr + ')'); await page.click('[data-act="pExit"]'); await closeModals(page);

  /* ---------- 3. Academia Auditiva ---------- */
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="acadMode"][data-mode="aud"]');
  await page.waitForTimeout(400);
  ok(await page.isVisible('.aud-hero'), 'Academia Auditiva aparece dentro da Academia');
  ok(/Voz encontrada/.test(await page.textContent('[data-audio-status]')), 'voz japonesa detectada');
  await page.screenshot({ path: shots + '/02-aud-hub.png', fullPage: true });
  const xp0 = await page.evaluate(() => __NQ.S.xp), st0 = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S.listening.stats)));
  await page.click('[data-act="listen"][data-type="palavra"]'); await page.waitForTimeout(600);
  let q = await page.evaluate(() => __NQ.P.qs[__NQ.P.i]);
  let spoken = await page.evaluate(() => __spoken.map(s => s.text));
  ok(spoken.length >= 1 && spoken[spoken.length - 1] === q.say.replace(/[「」『』＿…〜~]/g, ' ').trim(), 'áudio toca automaticamente: ' + spoken[spoken.length - 1]);
  const body = await page.innerText('.p-body');
  ok(!body.includes(q.ro) || q.ro === q.pt, 'romaji escondido antes da resposta'); ok(!body.includes(q.jp), 'escrita escondida antes da resposta');
  await page.screenshot({ path: shots + '/03-listen-q.png' });
  await page.click('.audio-ctrls [data-act="playQ"]'); await page.waitForTimeout(300);
  ok((await page.evaluate(() => __spoken.length)) === spoken.length + 1, 'repetir áudio');
  await page.click('#player .rate-seg [data-val="lenta"]'); await page.waitForTimeout(300);
  ok((await page.evaluate(() => __spoken[__spoken.length - 1].rate)) === 0.7, 'velocidade lenta aplicada');
  await page.click('#player .rate-seg [data-val="rapida"]'); await page.waitForTimeout(300);
  ok((await page.evaluate(() => __spoken[__spoken.length - 1].rate)) === 1.15, 'velocidade rápida aplicada');
  await page.click('#player .rate-seg [data-val="normal"]');
  await page.click('[data-act="revealJp"]'); ok((await page.innerText('.p-body')).includes(q.jp), 'revelar escrita sob demanda');
  ok(await page.evaluate(() => __NQ.P.qs[__NQ.P.i].hinted), 'dica registrada (XP reduzido)');
  let i = q.options.findIndex(o => o.correct); await page.click(`[data-act="opt"][data-i="${i}"]`); await page.click('[data-act="check"]');
  const fb = await page.innerText('.p-foot');
  ok(fb.includes(q.jp) && fb.includes(q.ro) && fb.includes(q.pt), 'depois da resposta: escrita, romaji e tradução');
  await page.screenshot({ path: shots + '/04-listen-feedback.png' });
  await page.click('[data-act="next"]');
  const nl = await runQuiz(page, n => n !== 2) + 1;
  ok(await page.evaluate(() => __NQ.P.phase === 'result'), 'treino de palavras concluído (' + nl + ' perguntas)');
  await page.screenshot({ path: shots + '/05-listen-result.png' });
  await page.click('[data-act="pExit"]'); await closeModals(page);
  const st1 = await page.evaluate(() => __NQ.S.listening.stats);
  ok(st1.answers === st0.answers + nl && st1.correct === st0.correct + nl - 1 && st1.byLevel.iniciante.a === nl && st1.byType.palavra.a + st1.byType.expressao.a >= 1 && st1.ms > 0 && st1.sessions === 1, 'estatísticas auditivas registradas ' + JSON.stringify({ a: st1.answers, c: st1.correct, ms: st1.ms }));
  ok((await page.evaluate(() => __NQ.S.xp)) > xp0, 'XP auditivo integrado');
  // sons
  await page.click('[data-act="listen"][data-type="som"]'); await page.waitForTimeout(400);
  await page.screenshot({ path: shots + '/06-sons.png' });
  const ns = await runQuiz(page); ok(ns === 8, 'treino de sons (' + ns + ')'); await page.click('[data-act="pExit"]'); await closeModals(page);
  // nível intermediário: frases
  await page.click('[data-act="setLevel"][data-lv="intermediario"]'); ok(await page.evaluate(() => __NQ.S.listening.level === 'intermediario'), 'escolher nível');
  await page.click('[data-act="listen"][data-type="frase"]'); await page.waitForTimeout(300);
  const fq = await page.evaluate(() => __NQ.P.qs.map(q => q.itemId));
  ok(fq.every(id => /aud-fra|c5l/.test(id)), 'frases do nível intermediário');
  ok(await page.isVisible('[data-act="hintRo"]'), 'dica de romaji disponível no intermediário');
  await runQuiz(page); await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('[data-act="setLevel"][data-lv="avancado"]');
  await page.click('[data-act="listen"][data-type="frase"]'); await page.waitForTimeout(300);
  ok(!(await page.isVisible('[data-act="hintRo"]')), 'avançado: sem dica de romaji');
  await runQuiz(page); await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('[data-act="listen"][data-type="misto"]'); await runQuiz(page); await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('[data-act="setLevel"][data-lv="iniciante"]');

  /* ---------- 4. Detetive dos Animes ---------- */
  await page.click('[data-act="audSub"][data-sub="det"]');
  await page.screenshot({ path: shots + '/07-detetive.png', fullPage: true });
  const nCases = await page.$$eval('[data-act="case"]', e => e.length);
  ok(nCases >= 25, 'casos do Detetive: ' + nCases);
  await page.click('[data-act="case"][data-id="aud-ani:akatsuki"]'); await page.waitForTimeout(800);
  ok((await page.innerText('.p-body')).includes('Pista'), 'caso mostra pista');
  ok((await page.evaluate(() => __spoken[__spoken.length - 1].text)) === 'あかつき', 'pronúncia do caso tocada');
  await runQuiz(page);
  const res = await page.innerText('.p-body');
  ok(res.includes('暁') && res.includes('amanhecer') && res.includes('赤い月'), 'descoberta mostra escrita, significado e alerta sobre 赤い月');
  await page.screenshot({ path: shots + '/08-descoberta.png', fullPage: true });
  for (let k = 0; k < 4; k++) { await page.click('[data-act="caseNext"]'); await page.waitForTimeout(150); await runQuiz(page, () => k !== 1); }
  await page.click('[data-act="pExitTo"]'); await closeModals(page);
  ok(await page.evaluate(() => Object.keys(__NQ.S.discoveries).length === 5), 'coleção com 5 descobertas (inclusive caso errado)');
  ok(await page.isVisible('.disc-card'), 'coleção visível');
  await page.click('.disc-card >> nth=0'); ok(await page.isVisible('#modal .disc-detail'), 'consulta de descoberta'); await page.click('#modal [data-act="speak"]'); await page.click('#modal [data-act="closeModal"]');
  await page.click('[data-act="listen"][data-type="anime"]'); const na = await runQuiz(page); ok(na === 5, 'desafio de áudio da coleção (' + na + ')'); await page.click('[data-act="pExit"]'); await closeModals(page);

  /* ---------- 5. Expressões ---------- */
  await page.click('[data-act="audSub"][data-sub="hub"]'); await page.click('[data-act="audSub"][data-sub="expr"]');
  const nE = await page.$$eval('details.expr', e => e.length); ok(nE >= 20, 'expressões: ' + nE);
  await page.click('details.expr[data-id="aud-expr:sugoi"] summary'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => !!__NQ.S.items['aud-expr:sugoi'].seen), 'expressão aberta vai para o caderno');
  const exprTxt = await page.textContent('details.expr[data-id="aud-expr:sugoi"]'); ok(exprTxt.includes('Quando usar') && exprTxt.includes('Formalidade') && exprTxt.includes('その絵'), 'expressão com uso, formalidade e exemplo');
  await page.screenshot({ path: shots + '/09-expressoes.png', fullPage: true });
  await page.click('[data-act="listen"][data-type="expressao"]'); await runQuiz(page); await page.click('[data-act="pExit"]'); await closeModals(page);

  /* ---------- 6. Diálogos ---------- */
  await page.click('[data-act="audSub"][data-sub="hub"]'); await page.click('[data-act="audSub"][data-sub="dlg"]');
  ok((await page.$$eval('.dlg-card', e => e.length)) === 8, '8 diálogos');
  await page.click('[data-act="dialog"][data-id="dlg-hobby"]');
  const before6 = await page.evaluate(() => __spoken.length);
  await page.click('[data-act="dlgAll"]'); await page.waitForTimeout(2200);
  const sp6 = await page.evaluate(n => __spoken.slice(n), before6);
  ok(sp6.length === 4 && new Set(sp6.map(s => s.pitch)).size === 2, 'diálogo completo com 4 falas e vozes diferentes');
  await page.click('[data-act="dlgLine"][data-i="2"]'); await page.waitForTimeout(200);
  ok((await page.evaluate(() => __spoken[__spoken.length - 1].text)).includes('ギター'), 'fala individual');
  ok(!(await page.innerText('.dlg')).includes('shumi'), 'texto escondido por padrão');
  await page.click('[data-act="dlgShow"][data-k="ro"]'); ok((await page.innerText('.dlg')).includes('shumi wa nani'), 'revelar romaji');
  await page.click('[data-act="dlgShow"][data-k="pt"]'); ok((await page.innerText('.dlg')).includes('hobby'), 'revelar tradução');
  await page.click('details.card summary'); ok((await page.innerText('details.card')).includes('passatempo'), 'explicação das palavras');
  await page.screenshot({ path: shots + '/10-dialogo.png', fullPage: true });
  // sobreposição: tocar tudo e interromper com uma fala
  await page.click('[data-act="dlgAll"]'); await page.waitForTimeout(30); await page.click('[data-act="dlgLine"][data-i="0"]'); await page.waitForTimeout(600);
  ok((await page.evaluate(() => __overlap)) === 0, 'nunca toca dois áudios ao mesmo tempo');
  await page.click('[data-act="dlgQuiz"]'); await page.waitForTimeout(200); await page.screenshot({ path: shots + '/11-dialogo-q.png' });
  const nd = await runQuiz(page); ok(nd === 3, 'perguntas do diálogo (' + nd + ')');
  ok(await page.evaluate(() => __NQ.S.listening.dialogs['dlg-hobby'].best === 100), 'diálogo concluído registrado');
  await page.click('[data-act="pExit"]'); await closeModals(page);

  /* ---------- 7. Caderno ---------- */
  await page.click('.tab[data-view="caderno"]');
  for (const t of ['palavra', 'expressao', 'anime', 'frase', 'dialogo', 'dificeis']) { await page.click(`[data-act="nbType"][data-t="${t}"]`); const n = await page.$$eval('.nb-entry', e => e.length); ok(n > 0, 'caderno filtro ' + t + ': ' + n); if (t === 'anime') await page.screenshot({ path: shots + '/12-caderno-anime.png', fullPage: true }); }
  await page.click('[data-act="nbType"][data-t="todas"]'); await page.fill('#nbSearch', 'akatsuki'); ok((await page.$$eval('.nb-entry', e => e.length)) === 1, 'busca por romaji');
  await page.fill('#nbSearch', '暁'); ok((await page.$$eval('.nb-entry', e => e.length)) >= 1, 'busca por japonês');
  await page.fill('#nbSearch', 'alvorada'); ok((await page.$$eval('.nb-entry', e => e.length)) === 1, 'busca por português');
  const meta = await page.innerText('.nb-meta'); ok(/Detetive dos Animes/.test(meta) && /desde/.test(meta) && /acerto/.test(meta), 'registro com origem, data e acertos: ' + meta.replace(/\n/g, ' '));
  await page.fill('#nbSearch', '');
  const ids = await page.evaluate(() => Object.keys(__NQ.S.items)); ok(new Set(ids).size === ids.length, 'sem entradas duplicadas');

  /* ---------- 8. perfil, missões, conquistas ---------- */
  await page.click('.tab[data-view="perfil"]'); const prof = await page.innerText('#view');
  ok(prof.includes('Academia tradicional') && prof.includes('Academia Auditiva') && prof.includes('diálogos concluídos'), 'estatísticas separadas no Perfil');
  await page.screenshot({ path: shots + '/13-perfil.png', fullPage: true });
  ok(await page.evaluate(() => !!__NQ.S.achievements.ear50 || __NQ.S.listening.stats.correct < 50), 'conquista auditiva coerente');
  // persistência + exportação/importação
  const s1 = await page.evaluate(() => JSON.stringify({ d: __NQ.S.discoveries, l: __NQ.S.listening, xp: __NQ.S.xp }));
  await page.reload(); await closeModals(page);
  ok((await page.evaluate(() => JSON.stringify({ d: __NQ.S.discoveries, l: __NQ.S.listening, xp: __NQ.S.xp }))) === s1, 'descobertas e progresso auditivo persistem após recarregar');
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="export"]'); const exp = await page.inputValue('#exportText'); await page.click('#modal [data-act="closeModal"]');
  ok(JSON.parse(exp).schemaVersion === 2 && JSON.parse(exp).appVersion === '2.0.0', 'exportação v2');
  await page.click('[data-act="resetAsk"]'); await page.click('[data-act="resetConfirm"]'); await page.fill('#nameInput', 'X'); await page.click('[data-act="onboard"]');
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="import"]'); await page.fill('#importText', exp); await page.click('[data-act="importCheck"]'); await page.click('[data-act="importConfirm"]');
  ok((await page.evaluate(() => JSON.stringify({ d: __NQ.S.discoveries, l: __NQ.S.listening, xp: __NQ.S.xp }))) === s1, 'importação v2 restaura tudo');
  // importar arquivo exportado pela v1.0
  await page.click('.tab[data-view="perfil"]'); await page.click('[data-act="import"]'); await page.fill('#importText', JSON.stringify(V1)); await page.click('[data-act="importCheck"]'); await page.click('[data-act="importConfirm"]');
  ok(await page.evaluate(x => __NQ.S.xp === x && __NQ.S.schemaVersion === 2 && !!__NQ.S.listening, V1.data.xp), 'importação de arquivo exportado pela v1.0');

  /* ---------- 9. sem voz japonesa ---------- */
  const p2 = await mk([{ lang: 'en-US', name: 'English', localService: true }, { lang: 'pt-BR', name: 'Português', localService: true }]);
  await p2.goto(URL); await p2.evaluate(raw => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', raw); }, v1raw); await p2.reload(); await closeModals(p2);
  await p2.waitForTimeout(3500);
  await p2.click('.tab[data-view="academia"]'); await p2.click('[data-act="acadMode"][data-mode="aud"]');
  const hub2 = await p2.innerText('#view'); ok(/Nenhuma voz japonesa/.test(hub2) && /Saída de texto para voz/.test(hub2), 'sem voz: aviso claro com instruções do Android');
  await p2.screenshot({ path: shots + '/14-sem-voz.png', fullPage: true });
  await p2.click('[data-act="listen"][data-type="palavra"]'); await p2.waitForTimeout(300);
  const qb = await p2.evaluate(() => __NQ.P.qs[0]);
  ok((await p2.innerText('.p-body')).includes(qb.ro) && /Modo leitura/.test(await p2.innerText('.p-body')), 'sem voz: modo leitura com romaji');
  ok((await p2.evaluate(() => __spoken.length)) === 0, 'sem voz: não finge tocar áudio');
  await p2.screenshot({ path: shots + '/15-sem-voz-q.png' });
  const n2 = await runQuiz(p2); ok(n2 > 0, 'sem voz: treino continua funcionando');
  await p2.click('[data-act="pExit"]');
  /* ---------- 10. navegador sem síntese de voz ---------- */
  const p3 = await mk('none');
  await p3.goto(URL); await p3.evaluate(raw => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', raw); }, v1raw); await p3.reload(); await closeModals(p3);
  await p3.click('.tab[data-view="caderno"]'); ok((await p3.$$('[data-act="speak"]')).length === 0, 'sem síntese: botões de áudio escondidos');
  await p3.click('.tab[data-view="academia"]'); await p3.click('[data-act="acadMode"][data-mode="aud"]');
  ok(/não tem leitura em voz alta/.test(await p3.innerText('#view')), 'sem síntese: aviso');
  await p3.click('[data-act="listen"][data-type="som"]'); ok((await runQuiz(p3)) === 8, 'sem síntese: treino de sons em modo leitura');
  await p3.click('[data-act="pExit"]');

  /* ---------- 11. tela pequena ---------- */
  const p4 = await mk(JA, { viewport: { width: 320, height: 640 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await p4.goto(URL); await p4.evaluate(raw => { __NQ.suspendSave(); localStorage.setItem('nihongoQuest:save', raw); }, exp.length ? JSON.stringify(JSON.parse(exp).data) : v1raw); await p4.reload(); await closeModals(p4);
  const ov = async m => { const w = await p4.evaluate(() => Math.max(document.documentElement.scrollWidth - innerWidth, ...[...document.querySelectorAll('.p-body')].map(b => b.scrollWidth - b.clientWidth))); ok(w <= 0, '320px ' + m + ' (' + w + ')'); };
  for (const v of ['inicio', 'revisao', 'caderno', 'perfil']) { await p4.click(`.tab[data-view="${v}"]`); await ov(v); }
  await p4.click('.tab[data-view="academia"]'); await p4.click('[data-act="acadMode"][data-mode="aud"]'); await ov('hub auditivo');
  for (const sub of ['det', 'expr', 'dlg']) { await p4.click(`[data-act="audSub"][data-sub="${sub}"]`); await ov(sub); if (sub !== 'dlg') await p4.click('[data-act="audSub"][data-sub="hub"]'); }
  await p4.click('[data-act="dialog"][data-id="dlg-loja"]'); await p4.click('[data-act="dlgShow"][data-k="ro"]'); await p4.click('[data-act="dlgShow"][data-k="pt"]'); await p4.click('[data-act="dlgShow"][data-k="jp"]'); await ov('diálogo com textos'); await p4.screenshot({ path: shots + '/16-320-dialogo.png', fullPage: true });
  await p4.click('[data-act="dlgQuiz"]'); await ov('pergunta do diálogo'); await runQuiz(p4); await p4.click('[data-act="pExit"]');
  await p4.click('[data-act="audSub"][data-sub="hub"]'); await p4.click('[data-act="listen"][data-type="frase"]'); await p4.click('[data-act="revealJp"]'); await ov('pergunta de frase'); await p4.screenshot({ path: shots + '/17-320-frase.png' });
  await runQuiz(p4); await p4.click('[data-act="pExit"]');
  await p4.click('[data-act="audSub"][data-sub="det"]'); await p4.click('[data-act="case"] >> nth=0'); await runQuiz(p4); await ov('descoberta'); await p4.screenshot({ path: shots + '/18-320-descoberta.png', fullPage: true });

  ok(errors.length === 0, 'sem erros de JavaScript ' + errors.join(' | '));
  console.log(fails ? fails + ' FALHAS' : 'TODOS OS TESTES PASSARAM');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
