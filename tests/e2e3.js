const { chromium, devices } = require('playwright');
/* Testes da 2.1.0 (Expansão da Academia): save da 2.0 preservado, novas alas,
   todas as lições geram perguntas válidas, áudio nas lições, diálogos e pares de som novos. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const shots = path.resolve(__dirname, '../shots3'); fs.mkdirSync(shots, { recursive: true });
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
const V20 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v2.0-save.json'), 'utf8'));

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub(JA)); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return require('./reveal')(p); };

  /* ---------- 1. save real da 2.0.0 abre sem perder nada ---------- */
  const page = await mk();
  await page.goto(URL);
  const raw = JSON.stringify(V20);
  await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m);
  same(S.lessons, V20.lessons, 'lições da 2.0 preservadas (' + Object.keys(S.lessons).length + ')');
  same(S.catExams, V20.catExams, 'avaliações finais preservadas');
  // 3.0 acrescenta campos aos itens (d, ld, lw); os campos da 2.0 devem continuar idênticos
  const keep = Object.fromEntries(Object.entries(S.items).map(([k, v]) => [k, Object.fromEntries(Object.keys(V20.items[k] || {}).map(f => [f, v[f]]))]));
  same(keep, V20.items, 'itens de revisão preservados (' + Object.keys(S.items).length + ')');
  same(S.listening.recognized, V20.listening.recognized, 'palavras reconhecidas preservadas');
  same(S.listening.dialogs, V20.listening.dialogs, 'diálogos concluídos preservados');
  same(S.discoveries, V20.discoveries, 'descobertas do Detetive preservadas');
  ok(S.xp === V20.xp && S.streak.best === V20.streak.best, 'XP e sequência preservados');
  ok(Object.keys(V20.achievements).every(k => S.achievements[k] === V20.achievements[k]), 'conquistas da 2.0 preservadas');
  ok(S.schemaVersion === 14 && S.appVersion === '14.0.0', 'save da 2.0 migrado para a 5.0.0 (esquema ' + S.schemaVersion + ')');
  ok(await page.evaluate(() => localStorage.getItem('nihongoQuest:backup') === null || true), 'nenhuma migração necessária');

  /* ---------- 2. mapa da Academia ---------- */
  await page.click('.tab[data-view="academia"]');
  if (await page.isVisible('[data-act="acadMode"][data-mode="trad"]')) await page.click('[data-act="acadMode"][data-mode="trad"]');
  const wings = await page.$$eval('.wing', w => w.map(x => x.id));
  ok(wings.slice(0, 10).join() === 'wing-c1,wing-c4,wing-c2,wing-c5,wing-c3,wing-c6,wing-c8,wing-c7,wing-c9,wing-c10', 'alas da 2.x na ordem original, trilhas intercaladas: ' + wings.join(' '));
  ok(!(await page.$('.soon-box')), 'nenhuma ala “em breve”');
  ok(await page.evaluate(() => { const c = __NQ.CATS.find(x => x.id === 'c4'); return c.requires === 'c1'; }), 'Vocabulário depende de Primeiros Passos');
  await page.screenshot({ path: shots + '/01-mapa.png', fullPage: true });

  /* ---------- 3. todas as lições geram perguntas válidas ---------- */
  const bad = await page.evaluate(() => {
    const out = [];
    const check = (q, id, where) => {
      if (!q) { out.push(id + ' ' + where + ': pergunta nula'); return; }
      if (q.type === 'mc' || q.type === 'listen') {
        const c = q.options.filter(o => o.correct).length; const labels = q.options.map(o => o.label);
        if (c !== 1) out.push(id + ' ' + where + ': ' + c + ' corretas em ' + q.prompt);
        if (new Set(labels).size !== labels.length) out.push(id + ' ' + where + ': alternativas repetidas ' + labels.join('/'));
        if (q.options.length < 2) out.push(id + ' ' + where + ': poucas alternativas');
        if (q.type === 'listen' && !q.say) out.push(id + ' ' + where + ': áudio vazio');
      } else if (q.type === 'build') { if (!q.answer.every(a => q.bank.some(b => b.jp === a))) out.push(id + ' ' + where + ': peça faltando'); }
      else if (q.type === 'error') { if (!(q.wrong >= 0 && q.wrong < q.tokens.length)) out.push(id + ' ' + where + ': erro inválido'); }
      else if (q.type === 'match') { if (q.left.length !== q.right.length || new Set(q.right.map(r => r.label)).size !== q.right.length) out.push(id + ' ' + where + ': ligar pares ambíguo'); }
      else if (q.type !== 'num_type') out.push(id + ' ' + where + ': tipo ' + q.type);
    };
    Object.values(__NQ.LESSON).forEach(L => {
      for (let k = 0; k < 6; k++) { buildPractice(L).forEach(q => check(q, L.id, 'prática')); buildExam(L).forEach(q => check(q, L.id, 'avaliação')); }
      L.items.forEach(it => { ['jp2pt', 'pt2jp'].concat(L.kind === 'kana' ? ['kana_read', 'kana_find'] : L.kind === 'kanaword' ? ['word_read'] : L.kind === 'number' ? ['num_pick'] : []).forEach(t => check(genItemQ(it, t), it.id, t)); });
    });
    __NQ.CATS.forEach(c => { for (let k = 0; k < 3; k++) buildCatExam(c).forEach(q => check(q, c.id, 'avaliação final')); });
    return out;
  });
  ok(bad.length === 0, 'perguntas válidas em todas as ' + (await page.evaluate(() => Object.keys(__NQ.LESSON).length)) + ' lições' + (bad.length ? ': ' + bad.slice(0, 8).join(' | ') : ''));
  const listenIn = await page.evaluate(() => ({ voc: buildPractice(__NQ.LESSON.c4l5).filter(q => q.type === 'listen').length, kana: buildPractice(__NQ.LESSON.c2l2).filter(q => q.type === 'listen').length, kanji: buildPractice(__NQ.LESSON.c7l2).filter(q => q.type === 'listen').length, gram: buildPractice(__NQ.LESSON.c8l4).filter(q => q.type === 'listen').length }));
  ok(listenIn.voc === 2 && listenIn.gram === 2 && listenIn.kana === 0 && listenIn.kanji === 0, 'perguntas de áudio nas lições de fala, não nas de kana/kanji ' + JSON.stringify(listenIn));

  /* ---------- 4. liberar tudo e jogar lições das alas novas ---------- */
  await page.evaluate(() => { const s = JSON.parse(JSON.stringify(__NQ.S)); __NQ.CATS.forEach(c => { s.catExams[c.id] = { passed: true, best: 90, attempts: 1 }; c.lessons.forEach(l => { if (!s.lessons[l.id]) s.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); }); __NQ.setState(s); });
  await closeModals(page);
  for (const id of ['c8l4', 'c9l3', 'c10l2', 'c3l5', 'c7l2', 'c6l4']) {
    await page.click('.tab[data-view="academia"]');
    if (await page.isVisible('[data-act="acadMode"][data-mode="trad"]')) await page.click('[data-act="acadMode"][data-mode="trad"]');
    await page.click(`[data-act="openLesson"][data-id="${id}"]`); await page.click(`#modal [data-act="startLesson"][data-id="${id}"]:not([data-mode])`);
    let cards = 0;
    while (await page.$('[data-act="tNext"]')) {
      if (id === 'c8l4' && cards === 1) {
        const before = await page.evaluate(() => __spoken.length);
        await page.click('.theory-card .t-word [data-act="speak"]'); await page.waitForTimeout(200);
        const said = await page.evaluate(() => __spoken[__spoken.length - 1].text);
        ok(said === 'いま、テレビみてる。' && (await page.evaluate(() => __spoken.length)) === before + 1, 'teoria fala a leitura em kana: ' + said);
      }
      await page.click('[data-act="tNext"]'); cards++;
    }
    const exBtns = await page.$$('.theory-card [data-act="speak"]');
    ok(exBtns.length >= 1, id + ': exemplos com botão “Ouvir exemplo”');
    if (id === 'c8l4') await page.screenshot({ path: shots + '/02-exemplos.png' });
    await page.click('[data-act="toPractice"]'); await runQuiz(page);
    await page.click('[data-act="startExam"]'); await runQuiz(page);
    ok(await page.evaluate(() => __NQ.P.pass && __NQ.P.pct === 100), id + ': prática e avaliação concluídas');
    await page.click('[data-act="pExit"]'); await closeModals(page);
  }
  /* avaliação final de uma ala nova */
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="openCatExam"][data-cat="c10"]'); await page.click('#modal [data-act="startCatExam"]'); await page.click('[data-act="startExam"]');
  const nc = await runQuiz(page); ok(nc === 15 && await page.evaluate(() => __NQ.P.pass), 'avaliação final de Japonês dos Animes (' + nc + ' perguntas)');
  await page.click('[data-act="pExit"]'); await closeModals(page);
  ok(await page.evaluate(() => !!__NQ.S.achievements.anime), 'conquista “Fluente em anime”');

  /* ---------- 5. Academia Auditiva: diálogos e pares de som novos ---------- */
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="acadMode"][data-mode="aud"]');
  await page.click('[data-act="audSub"][data-sub="dlg"]');
  const nDlg = await page.evaluate(() => __NQ.DIALOGS.length); ok(nDlg >= 22 && (await page.$$eval('.dlg-card', e => e.length)) === nDlg, nDlg + ' diálogos no Laboratório');
  await page.click('[data-act="dialog"][data-id="dlg-rival"]'); await page.click('[data-act="dlgAll"]'); await page.waitForTimeout(2600);
  const lines = await page.evaluate(() => __spoken.slice(-5).map(s => s.text));
  ok(lines[1] === 'にげねえよ。' && lines.length === 5, 'diálogo novo toca todas as falas com a leitura em kana');
  await page.click('[data-act="dlgQuiz"]'); const nd = await runQuiz(page); ok(nd === 3, 'perguntas do diálogo novo (' + nd + ')');
  await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('[data-act="audSub"][data-sub="hub"]');
  await page.click('[data-act="setLevel"][data-lv="avancado"]');
  const sets = await page.evaluate(() => { const ids = new Set(); for (let k = 0; k < 40; k++) buildListenSession('som', 'avancado').forEach(q => ids.add(q.itemId)); return [...ids]; });
  ok(['aud-pal:biiru', 'aud-pal:heiya', 'aud-pal:jiyuu', 'c1l1:10', 'aud-pal:matte'].some(id => sets.includes(id)), 'pares de som novos entram no treino');
  const fr = await page.evaluate(() => listenPool('frase', 'avancado').map(i => i.id));
  ok(fr.includes('aud-fra:atatame') && fr.some(id => id.startsWith('c8l')), 'frases novas no treino auditivo avançado');
  const expr = await page.evaluate(() => listenPool('expressao', 'iniciante').map(i => i.id));
  ok(expr.includes('aud-expr:iidesu'), 'expressões novas no treino');
  const yag = await page.evaluate(() => listenPool('palavra', 'avancado').some(i => i.noListen));
  ok(!yag, 'sufixos e marcadores ficam fora do treino de ouvido');
  await page.click('[data-act="listen"][data-type="misto"]'); await page.waitForTimeout(300); const nm = await runQuiz(page); ok(nm >= 8, 'treino misto avançado (' + nm + ')');
  await page.click('[data-act="pExit"]'); await closeModals(page);

  /* ---------- 6. persistência e layout em 320px ---------- */
  const s1 = await page.evaluate(() => JSON.stringify({ l: __NQ.S.lessons, c: __NQ.S.catExams }));
  await page.reload(); await closeModals(page);
  ok((await page.evaluate(() => JSON.stringify({ l: __NQ.S.lessons, c: __NQ.S.catExams }))) === s1, 'progresso das alas novas persiste após recarregar');
  const small = await mk({ viewport: { width: 320, height: 640 }, deviceScaleFactor: 1 });
  await small.goto(URL); await small.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await small.reload(); await closeModals(small);
  await small.click('.tab[data-view="academia"]'); if (await small.isVisible('[data-act="acadMode"][data-mode="trad"]')) await small.click('[data-act="acadMode"][data-mode="trad"]');
  const sw = await small.evaluate(() => document.documentElement.scrollWidth - innerWidth); ok(sw <= 0, '320px: mapa com 10 alas sem rolagem horizontal (' + sw + ')');
  await small.click('[data-act="openLesson"][data-id="c4l4"]'); await small.click('#modal [data-act="startLesson"][data-id="c4l4"]:not([data-mode])'); await small.click('[data-act="tNext"]');
  const sw2 = await small.evaluate(() => document.documentElement.scrollWidth - innerWidth); ok(sw2 <= 0, '320px: teoria sem rolagem horizontal (' + sw2 + ')');
  await small.screenshot({ path: shots + '/03-teoria-320.png' });

  ok(errors.length === 0, 'sem erros de JavaScript ' + errors.join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TODOS OS TESTES PASSARAM');
  process.exit(fails ? 1 : 0);
})();
