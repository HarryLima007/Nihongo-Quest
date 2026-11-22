const { chromium } = require('playwright');
/* Testes da 15.0.0 — Dicionário em português: save real da 14.0 preservado (sem mudança de esquema), busca
   português → japonês no navegador (exatas × relacionadas, sentido em inglês para diferenciar, selo “auto”), ficha com
   o português de cada sentido e o aviso de tradução automática, Caderno/Revisão só por ação explícita e sem XP,
   pesquisar sem mudar o aprendizado, uso offline (dict/v2 pelo service worker) e 360px no claro e no escuro. */
const http = require('http'), path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const V14 = JSON.parse(fs.readFileSync(path.join(__dirname, 'v14.0-save.json'), 'utf8'));
Object.values(V14.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.md': 'text/markdown' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/' ) p = '/index.html';
  const f = p === '/nihongo-quest.html' ? path.join(ROOT, 'dist/nihongo-quest.html') : path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
const stub = `(() => { class U { constructor(t) { this.text = t; } } window.SpeechSynthesisUtterance = U; window.__spoken = [];
  Object.defineProperty(window, 'speechSynthesis', { value: { getVoices: () => [{ lang: 'ja-JP', name: 'ja', localService: true }], addEventListener() {}, resume() {}, cancel() {}, speak(u) { window.__spoken.push({ text: u.text, rate: u.rate }); setTimeout(() => u.onend && u.onend(), 10); }, speaking: false, paused: false }, configurable: true }); })();`;
const noScroll = page => page.evaluate(() => { const sw = document.documentElement.clientWidth; const bad = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > sw + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.confetti,.filters,.d-segs,.jm-filters,.d-chips,.jm-kstrip,.mode-switch,.seg,.stage-tabs,[style*="overflow"]'); }); return { sw: document.documentElement.scrollWidth, cw: sw, bad: bad.length, el: bad.slice(0, 3).map(e => e.className) }; });

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch(); const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; });
  await ctx.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  const page = await ctx.newPage(); page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED|ERR_INTERNET_DISCONNECTED/.test(m.text())) errors.push(m.text()); });
  const closeModals = async () => { await page.waitForTimeout(300); for (let i = 0; i < 6 && await page.isVisible('#modal .sheet'); i++) { const b = await page.$('#modal [data-act="closeModal"], #modal [data-act="dictClose"]'); if (!b) { await page.evaluate(() => closeModal()); break; } await b.click(); await page.waitForTimeout(120); } };
  const raw = JSON.stringify(V14);
  await page.goto(BASE + 'nihongo-quest.html'); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals();

  /* 1. save real da 14.0 */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '15.0.0', '14.0: aberto na 15.0.0 sem mudar o esquema (14)');
  ['xp', 'coins', 'streak', 'lessons', 'items', 'history', 'achievements', 'vocab', 'rpg', 'read', 'world', 'lacad', 'chat', 'learn', 'journey', 'settings', 'dict'].forEach(k => {
    const a = JSON.parse(JSON.stringify(S[k])), b = JSON.parse(JSON.stringify(V14[k]));
    if (k === 'journey') { delete a.seenVersion; delete b.seenVersion; } if (k === 'learn') [a, b].forEach(x => Object.values(x.snaps || {}).forEach(v => delete v.t)); // retrato diário do progresso: só a hora muda
    ok(JSON.stringify(a) === JSON.stringify(b), 'preservado: ' + k);
  });
  ok(S.dict.fav['j:1381380'] && S.dict.coll.Cores && S.dict.words['j:1381380'] && S.dict.hist.includes('cansado'), 'favoritos, coleção, palavras salvas e histórico do Dicionário intactos');
  await page.reload(); await closeModals();
  ok(await page.evaluate(x => __NQ.S.xp === x.xp && JSON.stringify(__NQ.S.items) === JSON.stringify(x.items), S), 'recarregar não altera o save');

  /* 2. busca em português */
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals();
  await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 20000 }).catch(() => {});
  const cnt = await page.evaluate(() => JMUI.meta && JMUI.meta.counts);
  ok(cnt && cnt.withAnyPt > 200000, 'Dicionário Geral v2 carregado (' + (cnt && cnt.withAnyPt) + ' entradas com português)');
  ok(/com português/.test(await page.$eval('#dictList', e => e.innerText)), 'início mostra quantas entradas têm português');
  const before = await page.evaluate(() => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h, __NQ.S.learn.days]));
  const search = async q => { await page.fill('#dictSearch', q); await page.waitForTimeout(250); await page.waitForFunction(() => !JMUI.busy, null, { timeout: 10000 }).catch(() => {}); await page.waitForTimeout(200); return page.$eval('#dictList', e => e.innerText); };
  const pairs = [['cansado', /疲れる|しんどい/], ['coragem', /勇気/], ['promessa', /約束/], ['desaparecer', /消える/], ['proteger', /守る/], ['confiar', /任せる|預ける/], ['solidão', /孤独/], ['vingança', /復讐|報復/], ['felicidade', /幸せ/], ['medo', /恐怖|恐れ/]];
  for (const [q, re] of pairs) { const t = await search(q); ok(re.test(t), 'português: "' + q + '" → ' + re.source); }
  let t = await search('banco');
  ok(/銀行/.test(t) && /ベンチ/.test(t) && await page.$('#dictList .jm-enh'), '“banco”: 銀行 e ベンチ separados, com o sentido em inglês para diferenciar');
  t = await search('saudade');
  ok(/Relacionadas/.test(t) && /懐かしい|郷愁/.test(t), '“saudade”: correspondências relacionadas identificadas como relacionadas');
  t = await search('destino'); ok(/運命/.test(t) && /目的地|行き先/.test(t), '“destino”: sentido de fado e de lugar de chegada');
  ok(await page.$('#dictList .jm-tag.auto') && /tradução automática, não revisada/.test(t), 'selo “auto” discreto com explicação única');
  t = await search('CANSADAS'); ok(/疲れる|しんどい|くたびれる/.test(t), 'maiúsculas, gênero e plural: "CANSADAS"');
  t = await search('mar'); ok(/海/.test(t) && !/損なう/.test(t), '“mar” sem falso amigo do inglês');
  t = await search('taberu'); ok(/食べる/.test(t), 'romaji continua funcionando');
  t = await search('勇気'); ok(/勇気/.test(t), 'kanji continua funcionando');
  t = await search('qwrtyzx'); ok(/Nada encontrado/.test(t), 'busca sem sentido não devolve lixo');
  ok(await page.evaluate(b => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h, __NQ.S.learn.days]) === b, before), 'pesquisar não muda XP, itens nem aprendizado');

  /* 3. ficha com português por sentido */
  await search('しんどい'); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(900);
  let m = await page.$eval('#modal', e => e.innerText);
  ok(/cansado/.test(m) && /INGLÊS|inglês/.test(m) && /tired/i.test(m), 'ficha: português de cada sentido com o inglês do JMdict abaixo');
  ok(/tradução automática do inglês \(JMdict-PT\), sem revisão humana/.test(m), 'ficha: aviso de tradução automática (não revisada)');
  ok(!/undefined|null|NaN/.test(m), 'ficha sem campos vazios');
  ok((await noScroll(page)).bad === 0, 'ficha em 360px sem rolagem horizontal');
  const ord = await page.evaluate(() => JMUI.cur.ord), xp0 = await page.evaluate(() => __NQ.S.xp);
  ok(await page.evaluate(() => !__NQ.S.items['jm:' + JMUI.cur.i]), 'abrir a ficha não cria item de aprendizado');
  await page.click('#modal [data-act="jmSave"]'); await page.waitForTimeout(400);
  const sv = await page.evaluate(() => { const i = JMUI.cur.i; return { it: ITEM['jm:' + i], w: __NQ.S.dict.words['j:' + i], st: __NQ.S.items['jm:' + i] }; });
  ok(sv.it && /cansado/.test(sv.it.pt) && sv.w && !/\(inglês\)/.test(sv.w.g) && await page.evaluate(x => __NQ.S.xp === x, xp0), 'Adicionar ao Caderno: item com o português, sem XP');
  await page.click('#modal [data-act="jmSave"]').catch(() => {}); await page.waitForTimeout(200);
  ok(await page.evaluate(() => Object.keys(ITEM).filter(k => k === 'jm:' + JMUI.cur.i).length === 1 && DICT_LESSON.items.filter(x => x.k === 'jm:' + JMUI.cur.i).length === 1), 'sem duplicar no Caderno');
  ok(await page.evaluate(() => itemStatus('jm:' + JMUI.cur.i) !== 'dominada'), 'palavra salva não aparece como dominada');
  await closeModals();
  await search('青'); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(900);
  m = await page.$eval('#modal', e => e.innerText);
  ok(/azul/.test(m) && /tradução do Nihongo Quest/i.test(m), 'português das lições/elaborado continua em primeiro, com a origem marcada');
  await closeModals();

  /* 4. claro/escuro em 360px */
  for (const th of ['light', 'dark']) {
    await page.evaluate(x => { __NQ.S.settings.theme = x; applyTheme && applyTheme(); }, th).catch(() => {});
    await search('banco'); const ns = await noScroll(page);
    ok(ns.bad === 0 && ns.sw <= ns.cw + 1, 'tema ' + th + ': resultados em 360px sem rolagem horizontal ' + JSON.stringify(ns));
    if (process.env.SHOTS) await page.screenshot({ path: process.env.SHOTS + '/busca-' + th + '.png' });
    await search('しんどい'); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(800);
    if (process.env.SHOTS) await page.screenshot({ path: process.env.SHOTS + '/ficha-' + th + '.png' });
    const ns2 = await noScroll(page); ok(ns2.bad === 0, 'tema ' + th + ': ficha em 360px sem rolagem horizontal');
    await closeModals();
  }

  /* 5. offline */
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 8000 }).catch(() => {});
  if (!(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller)))) { await page.reload(); await page.waitForTimeout(800); }
  ok(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller)), 'service worker ativo');
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  await search('coragem');
  ok(await page.evaluate(async () => (await caches.keys()).includes('nq-dict-v2') && !(await caches.keys()).includes('nq-dict-v1')), 'cache do dicionário v2 (o v1 da 14.0 é apagado)');
  await ctx.setOffline(true);
  await page.reload(); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  t = await search('coragem'); ok(/勇気/.test(t), 'sem internet: busca em português repetida pelo cache');
  await ctx.setOffline(false);

  ok(errors.length === 0, 'sem erros no console ' + JSON.stringify(errors.slice(0, 4)));
  await browser.close(); server.close();
  console.log(fails ? `\n${fails} falha(s)` : '\nTudo certo.'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
