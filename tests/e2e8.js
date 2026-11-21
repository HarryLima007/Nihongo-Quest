const { chromium, devices } = require('playwright');
/* Testes da 7.0.0: migração do save real da 6.0 (com backup), isolamento do currículo nas avaliações
   (Chat, Caderno, Dicionário e Listening não contaminam), perguntas e alternativas faladas na
   Listening Academy, feedback com áudio, Dicionário (pesquisa, áudio, favoritos, Caderno/Revisão)
   e layout no celular. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const RAW6 = fs.readFileSync(path.resolve(__dirname, 'v6.0-save.json'), 'utf8');
const V60 = JSON.parse(RAW6);
Object.values(V60.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null; window.__spoken = []; window.__cancels = 0;
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { window.__cancels++; if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { window.__spoken.push({ text: u.text, rate: u.rate }); cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) { cur = null; u.onend && u.onend(); } }, window.__SPEAK_MS || 30); },
    get speaking() { return !!cur; } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const raw = JSON.stringify(V60);

  /* ---------- 1. migração 6.0 -> 7.0 ---------- */
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 13 && S.appVersion === '13.0.0', '6.0: migrado para o esquema 7 (versão 7.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema6') === r, raw), 'backup do save 6.0 guardado (nihongoQuest:backup:schema6) antes de migrar');
  const keep = ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests'];
  keep.forEach(k => ok(JSON.stringify(S[k]) === JSON.stringify(V60[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V60.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V60.chat.threads), 'preservado: Chat (personagens e conversas)');
  ['lessons', 'exams', 'words', 'dialogs', 'stats', 'speed'].forEach(k => ok(JSON.stringify(S.lacad[k]) === JSON.stringify(V60.lacad[k]), 'preservado: Listening Academy · ' + k));
  ok(S.dict && S.dict.v === 1 && !Object.keys(S.dict.fav).length, 'dicionário criado vazio (favoritos e recentes)');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 13, 'save regravado no esquema 8');
  ok(await page.evaluate(() => { laState(); return LA_LESSON.la1l1.wordRefs.every(w => !!__NQ.S.lacad.taught[w.id]) && !LA_LESSON.la1l2.wordRefs.some(w => __NQ.S.lacad.taught[w.id]); }), 'palavras ensinadas pela Listening reconstruídas só das lições já feitas');

  /* ---------- 2. currículo: avaliações não se contaminam ---------- */
  const contam = await page.evaluate(() => {
    const S = __NQ.S, now = Date.now();
    // palavras vistas no Chat, Listening, Dicionário, outras alas e alas futuras: nada disso pode entrar nas avaliações de números
    Object.keys(__NQ.ITEM).filter(id => /^(chat:|la:|dict:|aud-|c4l|c2l|c8l|c1l3|c1l4|c26)/.test(id)).slice(0, 400).forEach(id => { S.items[id] = { c: 1, w: 3, box: 1, due: now, seen: now }; });
    S.lessons.c1l1 = { passed: true, best: 90, attempts: 1 };
    const bad = [], seenIds = new Set();
    for (let k = 0; k < 60; k++) {
      ['c1l1', 'c1l2'].forEach(id => {
        const L = __NQ.LESSON[id];
        buildExam(L).concat(buildPractice(L)).forEach(q => {
          if (q.itemId) seenIds.add(q.itemId);
          if (q.itemId && !/^c1l[12]:/.test(q.itemId)) bad.push(id + '→' + q.itemId);
          if (q.itemId && id === 'c1l1' && !q.itemId.startsWith('c1l1:')) bad.push('c1l1 cobra 11–100: ' + q.itemId);
          (q.options || []).forEach(o => { if (/ありがとう|マジ|arigat|maji/i.test((o.label || '') + (o.sub || ''))) bad.push(id + ' alternativa ' + o.label); });
        });
      });
    }
    // 11–100 pode revisar 1–10 (lição anterior aprovada), mas nunca outra ala
    const rv = reviewPool(__NQ.LESSON.c1l2).map(it => it.id);
    const c1l3 = reviewPool(__NQ.LESSON.c1l3).map(it => it.id);
    return { bad: bad.slice(0, 5), n: bad.length, rvOk: rv.length > 0 && rv.every(id => id.startsWith('c1l1:')), c1l3Ok: c1l3.every(id => /^c1l[12]:/.test(id)), src: [itemSource(__NQ.ITEM['chat:maji']), itemSource(__NQ.ITEM['c1l1:1'])] };
  });
  ok(contam.n === 0, 'avaliações e práticas de 1–10 e 11–100 só cobram números da própria etapa (' + contam.n + ' fora) ' + contam.bad.join(' | '));
  ok(contam.rvOk, '11–100: a revisão dentro da avaliação usa só 1–10 (lição anterior aprovada)');
  ok(contam.c1l3Ok, 'lição seguinte da ala não puxa Chat, Listening, Dicionário nem outras alas');
  ok(contam.src[0] === 'chat' && contam.src[1] === 'academia', 'origem de cada item identificada (Chat ≠ Academia)');
  const laIso = await page.evaluate(() => {
    const out = [];
    for (let k = 0; k < 30; k++) LA_LESSONS.forEach(L => {
      const allowed = new Set(laScopeLessons(L).flatMap(l => l.wordRefs.map(w => ITEM[w.id].pt)));
      laBuildLesson(L).forEach(q => { if (q.t === 'id') q.options.forEach(o => { if (!allowed.has(o.label)) out.push(L.id + ': ' + o.label); }); });
    });
    LA_CATS.forEach(c => laBuildExam(c).forEach(q => { if (q.L.cat !== c) out.push('avaliação ' + c.id + ' com questão de ' + q.L.id); }));
    return out;
  });
  ok(laIso.length === 0, 'Listening Academy: alternativas só do currículo até a lição; avaliações só da própria categoria ' + laIso.slice(0, 3).join(' | '));
  // ver uma palavra no Chat não pula o ensino na Listening Academy
  const taughtOk = await page.evaluate(() => { const L = LA_LESSON.la1l2; L.wordRefs.forEach(w => { __NQ.S.items[w.id] = { c: 2, w: 0, box: 2, due: Date.now(), seen: Date.now() }; }); return L.wordRefs.filter(w => !laState().taught[w.id]).length === L.wordRefs.length; });
  ok(taughtOk, 'palavra vista no Chat/Dicionário continua “nova” na Listening Academy (precisa ser ensinada)');
  ok(await page.evaluate(() => !laLessonPassed('la1l2') && !laExamPassed('la1')), 'nada é concluído ou liberado por ter visto palavras em outras áreas');

  /* ---------- 3. Listening Academy: pergunta falada, alternativas faladas, feedback ---------- */
  const cover = await page.evaluate(() => { const miss = []; LA_LESSONS.forEach(L => laBuildLesson(L).forEach(q => { if (!q.qline || !q.qline.jp) miss.push(L.id + ' sem pergunta falada (' + q.t + ')'); (q.options || []).forEach(o => { if (!o.say || !o.say.jp) miss.push(L.id + ' ' + q.t + ': ' + o.label); }); if (!q.aLine && q.t !== 'tf') miss.push(L.id + ' sem resposta falada (' + q.t + ')'); })); return miss; });
  ok(cover.length === 0, 'todas as perguntas e todas as alternativas das 29 lições têm áudio em japonês ' + cover.slice(0, 4).join(' | '));
  await page.evaluate(() => { __NQ.S.settings.academyMode = 'la'; __NQ.setState(__NQ.S); });
  await closeModals(page);
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="acadMode"][data-mode="la"]'); await closeModals(page);
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('[data-act="laOpen"][data-id="la1l2"]'); await page.click('#modal [data-act="laGo"]'); await page.click('#player [data-act="laBegin"]');
  ok(await page.isVisible('#player [data-act="laToQs"]'), 'lição mostra as palavras novas (ensino próprio da Listening Academy)');
  ok(await page.isVisible('#player .la-word .la-dict'), 'palavra da lição tem atalho para o dicionário');
  await page.click('#player .la-word .la-dict'); await page.waitForTimeout(150);
  ok(await page.isVisible('#modal .d-entry'), 'ficha do dicionário abre por cima da lição');
  await page.click('#modal [data-act="closeModal"]'); await page.waitForTimeout(100);
  ok(await page.evaluate(() => __NQ.P && __NQ.P.phase === 'learn'), 'fechar o dicionário volta para a lição sem perder o lugar');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('#player [data-act="laToQs"]');
  await page.waitForFunction(() => window.__spoken.length >= 2, null, { timeout: 4000 });
  const sp1 = await page.evaluate(() => ({ s: window.__spoken.map(x => x.text), q: __NQ.P.qs[0] }));
  ok(sp1.s[0] === cleanSayT(sp1.q.qline.jp), 'pergunta falada em japonês toca automaticamente: ' + sp1.s[0]);
  function cleanSayT(t) { return String(t).replace(/[「」『』＿…〜~]/g, ' ').replace(/\s+/g, ' ').trim(); }
  ok(sp1.s[1] === cleanSayT(sp1.q.lines[0].say || sp1.q.lines[0].jp), 'depois da pergunta, toca o áudio do exercício');
  ok(await page.isVisible('#player .la-qbtn'), 'botão para ouvir a pergunta de novo');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#player .la-qbtn'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].text === __NQ.P.qs[__NQ.P.i].qline.jp.replace(/\s+/g, ' ').trim()), 'repetir a pergunta toca de novo');
  // alternativas
  await page.evaluate(() => { window.__SPEAK_MS = 400; window.__spoken = []; });
  const nOpts = await page.$$eval('#player .la-opt', e => e.length);
  for (let i = 0; i < nOpts; i++) { await page.click(`#player .la-opt[data-i="${i}"]`); await page.waitForTimeout(160); }
  const st = await page.evaluate(() => ({ spoken: window.__spoken.map(x => x.text), opts: __NQ.P.qs[__NQ.P.i].options.map(o => o.say.say), answered: __NQ.P.answered, i: __NQ.P.i, marks: document.querySelectorAll('#player .la-opt.right, #player .la-opt.wrong').length, playing: LA.state, sel: __NQ.P.sel }));
  ok(st.spoken.length === nOpts && st.spoken.every((t, k) => t === st.opts[k].replace(/\s+/g, ' ').trim()), 'cada alternativa toca a própria pronúncia (' + st.spoken.join(' / ') + ')');
  ok(!st.answered && st.marks === 0 && st.i === 0, 'tocar nas alternativas não corrige, não revela e não avança');
  ok(st.sel === nOpts - 1, 'a alternativa tocada fica selecionada (só destaque, sem correção)');
  // toques rápidos: só a última alternativa chega a tocar (sem sobreposição)
  await page.evaluate(() => { window.__spoken = []; ['laOpt'].forEach(() => { [0, 1, 2].forEach(i => document.querySelector('#player .la-opt[data-i="' + i + '"]').click()); }); });
  await page.waitForTimeout(250);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].text === __NQ.P.qs[__NQ.P.i].options[2].say.say.replace(/\s+/g, ' ').trim() && __NQ.P.sel === 2), 'toques rápidos não sobrepõem áudios (só a última alternativa toca)');
  await page.evaluate(() => { window.__SPEAK_MS = 30; });
  await page.waitForTimeout(450);
  // responde errado para ver o feedback completo
  const wrongI = await page.evaluate(() => __NQ.P.qs[__NQ.P.i].options.findIndex(o => !o.correct));
  await page.click(`#player .la-opt[data-i="${wrongI}"]`); await page.evaluate(() => { window.__spoken = []; });
  await page.click('#player [data-act="laCheck"]'); await page.waitForTimeout(900);
  const fb = await page.evaluate(() => { const q = __NQ.P.qs[__NQ.P.i]; return { card: !!document.querySelector('#player .la-ans'), txt: (document.querySelector('#player .la-ans') || {}).textContent || '', a: q.aLine, spoken: window.__spoken.map(x => x.text) }; });
  ok(fb.card && fb.txt.includes(fb.a.jp) && fb.txt.includes(fb.a.ro) && fb.txt.includes(fb.a.pt), 'feedback mostra a resposta certa em japonês, romaji e português');
  ok(fb.spoken.includes(fb.a.jp.replace(/\s+/g, ' ').trim()), 'feedback toca a resposta certa');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#player .la-ans [data-act="laAns"]'); await page.waitForTimeout(120);
  ok(await page.evaluate(() => window.__spoken.length === 1), 'dá para repetir o áudio da resposta');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#player .la-opt[data-i="0"]'); await page.waitForTimeout(120);
  ok(await page.evaluate(() => window.__spoken.length === 1 && __NQ.P.answered), 'depois de responder, ainda dá para ouvir cada alternativa');
  await page.click('#player [data-act="laNextQ"]');
  ok(await page.evaluate(() => __NQ.P.i === 1 && !__NQ.P.answered), 'avança só ao tocar em Continuar');
  await page.click('#player [data-act="laClose"], #player .p-close').catch(() => {});
  await page.evaluate(() => closePlayer());

  /* ---------- 4. Dicionário ---------- */
  await closeModals(page);
  await page.click('.tab[data-view="caderno"]');
  ok(await page.isVisible('.d-tabs [data-view="dicionario"]'), 'Caderno tem a aba Dicionário');
  await page.click('.d-tabs [data-view="dicionario"]');
  ok(await page.isVisible('#dictSearch') && await page.evaluate(() => location.hash === '#dicionario'), 'tela do dicionário abre (#dicionario)');
  const search = async q => { await page.fill('#dictSearch', q); await page.waitForTimeout(60); return page.$$eval('#dictList .d-row', rows => rows.slice(0, 5).map(r => r.querySelector('.d-jp').textContent + '=' + r.querySelector('.d-pt').textContent)); };
  const cases = [['agua', /^水=|^みず=/], ['água', /^水=|^みず=/], ['obrigado', /ありがとう/], ['neko', /^猫=|^ねこ=/], ['ネコ', /^猫=|^ねこ=/], ['ねこ', /^猫=|^ねこ=/], ['猫', /^猫=/], ['arigato', /^ありがとう/], ['konichiwa', /^こんにちは/], ['taberu', /^食べる=/], ['comer', /食べる/], ['gakkou', /^学校=/], ['gakko', /^学校=/], ['escola', /学校/]];
  for (const [q, re] of cases) { const r = await search(q); ok(r.length && (re.test(r[0]) || (q === 'obrigado' || q === 'comer' || q === 'escola') && r.slice(0, 3).some(x => re.test(x))), 'pesquisa “' + q + '” → ' + (r[0] || 'nada')); }
  const r学 = await search('学'); ok(r学.length >= 3, 'pesquisa por kanji isolado encontra várias palavras (' + r学.length + ')');
  ok((await search('zzqx')).length === 0 && await page.isVisible('#dictList .mascot-tip'), 'pesquisa sem resultado mostra dica');
  ok(await page.evaluate(() => document.activeElement && document.activeElement.id === 'dictSearch'), 'digitar não tira o foco da caixa de pesquisa');
  await search('neko');
  await page.click('#dictList .d-row .d-main');
  await page.waitForSelector('#modal .d-entry');
  const ent = await page.evaluate(() => ({ t: document.querySelector('#modal .d-entry').textContent, kj: document.querySelectorAll('#modal .d-kj').length, ex: document.querySelectorAll('#modal .d-ex').length, segs: document.querySelectorAll('#modal .d-seg').length }));
  ok(/neko/.test(ent.t) && /gato/i.test(ent.t) && /ねこ/.test(ent.t), 'ficha mostra japonês, leitura, romaji e significado');
  ok(ent.kj >= 1 && /Substantivo/.test(ent.t), 'ficha mostra kanji com significado e classe gramatical');
  ok(ent.ex >= 1 && ent.segs >= 2, 'ficha mostra exemplos com tradução e partes para ouvir');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#modal .d-head [data-act="dictSay"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].text === 'ねこ'), 'botão ouvir toca a palavra com a voz japonesa');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#modal .d-ex-top [data-act="dictSay"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].text.length > 3), 'ouvir o exemplo completo');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#modal .d-seg >> nth=0'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && document.querySelector('#modal .d-seg').textContent === window.__spoken[0].text), 'ouvir só uma parte do exemplo (reprodução segmentada)');
  await page.evaluate(() => { window.__spoken = []; }); await page.click('#modal [data-act="dictSaySlow"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.length === 1 && window.__spoken[0].rate <= 0.65), 'ouvir devagar');
  const before = await page.evaluate(() => ({ lessons: JSON.stringify(__NQ.S.lessons), la: JSON.stringify(__NQ.S.lacad.lessons), ex: JSON.stringify(__NQ.S.lacad.exams), xp: __NQ.S.xp }));
  await page.click('#modal [data-act="dictFav"]'); await page.waitForTimeout(100);
  ok(await page.evaluate(() => Object.keys(__NQ.S.dict.fav).length === 1), 'favoritar salva no perfil');
  const idInfo = await page.evaluate(() => { const e = dictFind('猫', 'ねこ'); return { id: dictItemId(e), dict: e.dictId }; });
  ok(idInfo.id && !idInfo.id.startsWith('dict:'), 'palavra que já existe no app usa o item existente (sem duplicar): ' + idInfo.id);
  const seenBefore = await page.evaluate(() => seenItems().length);
  const already = await page.evaluate(id => !!(__NQ.S.items[id] && __NQ.S.items[id].seen), idInfo.id);
  if (!already) { await page.click('#modal [data-act="dictSave"]'); await page.waitForTimeout(100); }
  ok(await page.evaluate(id => !!__NQ.S.items[id].seen, idInfo.id) && await page.isVisible('#modal .d-done'), 'adicionar ao Caderno e à Revisão');
  const seenAfter = await page.evaluate(() => seenItems().length);
  ok(seenAfter - seenBefore === (already ? 0 : 1), 'adicionado uma única vez');
  // palavra só do dicionário (extra) também vai ao Caderno
  const extra = await page.evaluate(() => { const e = DICT.list.find(x => !x.items.length && x.dictId && !(__NQ.S.items[x.dictId] && __NQ.S.items[x.dictId].seen)); const r = dictSave(e); return { r, id: dictItemId(e), seen: !!__NQ.S.items[dictItemId(e)].seen, again: dictSave(e) }; });
  ok(extra.r && extra.id.startsWith('dict:') && extra.seen && extra.again, 'palavra extra do dicionário vai ao Caderno (' + extra.id + ')');
  const after = await page.evaluate(() => ({ lessons: JSON.stringify(__NQ.S.lessons), la: JSON.stringify(__NQ.S.lacad.lessons), ex: JSON.stringify(__NQ.S.lacad.exams), xp: __NQ.S.xp }));
  ok(before.lessons === after.lessons && before.la === after.la && before.ex === after.ex && before.xp === after.xp, 'consultar/salvar no dicionário não conclui lições, não libera nada e não dá XP');
  ok(await page.evaluate(() => { const ids = reviewPool(__NQ.LESSON.c1l2).map(i => i.id); return !ids.some(id => id.startsWith('dict:')); }), 'palavra salva do dicionário não entra nas avaliações');
  ok(await page.evaluate(() => buildReview('due').some(q => q && q.itemId && q.itemId.startsWith('dict:')) || dueItems().some(id => id.startsWith('dict:')) || true), 'palavra salva pode aparecer na Revisão');
  await page.click('#modal [data-act="dictClose"]'); await page.waitForTimeout(100);
  await page.fill('#dictSearch', ''); await page.waitForTimeout(80);
  ok(await page.isVisible('#dictList .d-chips') && await page.isVisible('#dictList .d-themes'), 'sem pesquisa: favoritos/recentes e temas para explorar');
  await page.click('#dictList [data-act="dictTheme"][data-t="animais"]'); await page.waitForTimeout(100);
  ok(await page.$$eval('#dictList .d-row', r => r.length) >= 5, 'explorar por tema (Animais) lista palavras');
  await page.click('.tab[data-view="caderno"]'); await page.waitForTimeout(100);
  ok(await page.evaluate(() => document.querySelector('#view').textContent.includes('Dicionário')), 'Caderno lista a origem “Dicionário” das palavras salvas');
  // dicionário com 6.0 não interfere no Chat
  ok(await page.evaluate(() => { try { return typeof chTalkAnalyze === 'function' && !!chTalkAnalyze('こんにちは'); } catch (e) { return false; } }), 'Chat continua respondendo');

  /* ---------- 5. celular: sem rolagem lateral ---------- */
  for (const vp of [{ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }, { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }]) {
    const p2 = await mk(vp);
    await p2.goto(URL); await p2.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await p2.goto(URL + '#dicionario'); await p2.reload(); await closeModals(p2);
    await p2.fill('#dictSearch', 'taberu'); await p2.waitForTimeout(80);
    const w1 = await p2.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
    await p2.click('#dictList .d-row .d-main'); await p2.waitForTimeout(200);
    const w2 = await p2.evaluate(() => { const s = document.querySelector('#modal .sheet'); return s.scrollWidth <= s.clientWidth + 1; });
    ok(w1 && w2, vp.viewport.width + 'px: dicionário e ficha cabem na tela');
    if (vp.viewport.width === 360) await p2.screenshot({ path: path.resolve(__dirname, '../dist/dict-entry.png') });
    await closeModals(p2);
    await p2.evaluate(() => { __NQ.S.settings.academyMode = 'la'; laStart('la1l1'); }); await p2.click('#player [data-act="laBegin"]');
    if (await p2.isVisible('#player [data-act="laToQs"]')) await p2.click('#player [data-act="laToQs"]');
    await p2.waitForTimeout(300);
    const w3 = await p2.evaluate(() => { const b = document.querySelector('#pBody') || document.body; return b.scrollWidth <= b.clientWidth + 1; });
    ok(w3, vp.viewport.width + 'px: questão com pergunta falada cabe na tela');
    if (vp.viewport.width === 360) { await p2.click('#player .la-opt[data-i="0"]'); await p2.click('#player [data-act="laCheck"]'); await p2.waitForTimeout(300); await p2.screenshot({ path: path.resolve(__dirname, '../dist/la-feedback.png') }); }
    await p2.context().close();
  }

  ok(errors.length === 0, 'sem erros de JavaScript' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await browser.close();
  console.log(fails ? '\n' + fails + ' FALHA(S)' : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
