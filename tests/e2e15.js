const { chromium } = require('playwright');
/* Testes da 14.0.0 — Dicionário Completo: migração do save real da 13.0 (backup, idempotente, favoritos preservados),
   Dicionário Geral no navegador (busca por português/romaji/kana/kanji, conjugação, ficha completa, kanji com traços,
   análise de frase, histórico, coleção, comparação, salvar no Caderno sem XP, pesquisar sem mudar progresso), uso
   offline pelo service worker e 360px no claro e no escuro. O próprio teste sobe um servidor http (o Dicionário Geral
   não carrega por file://). */
const http = require('http'), path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const V13 = JSON.parse(fs.readFileSync(path.join(__dirname, 'v13.0-save.json'), 'utf8'));
Object.values(V13.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
  const raw = JSON.stringify(V13);
  await page.goto(BASE + 'nihongo-quest.html'); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals();

  /* 1. migração */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '16.0.0', '13.0: migrado para o esquema 14 (versão 14.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema13') === r, raw), 'backup do save 13.0 guardado (nihongoQuest:backup:schema13)');
  ['xp', 'coins', 'streak', 'lessons', 'items', 'vocab', 'rpg', 'read', 'world', 'lacad', 'journey', 'settings'].forEach(k => ok(JSON.stringify(S[k]) === JSON.stringify(V13[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.learn.h) === JSON.stringify(V13.learn.h), 'preservado: histórico da Central de Aprendizagem');
  ok(JSON.stringify(S.dict.fav) === JSON.stringify(V13.dict.fav) && JSON.stringify(S.dict.recent) === JSON.stringify(V13.dict.recent), 'favoritos e recentes do Dicionário preservados');
  ok(Array.isArray(S.dict.hist) && S.dict.coll && S.dict.words && S.dict.opts, 'Dicionário ganhou histórico, coleções, palavras salvas e opções');
  await page.reload(); await closeModals();
  ok(await page.evaluate(x => __NQ.S.xp === x.xp && JSON.stringify(__NQ.S.dict.fav) === JSON.stringify(x.dict.fav), S), 'recarregar não altera o save (migração idempotente)');

  /* 2. busca */
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals();
  await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  ok(await page.evaluate(() => JMUI.ok === true && JMUI.meta.counts.entries > 200000), 'Dicionário Geral carregado (' + await page.evaluate(() => JMUI.meta && JMUI.meta.counts.entries) + ' palavras)');
  const before = await page.evaluate(() => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h]));
  const search = async q => { await page.fill('#dictSearch', q); await page.waitForTimeout(250); await page.waitForFunction(() => !JMUI.busy, null, { timeout: 10000 }).catch(() => {}); await page.waitForTimeout(150); return page.$eval('#dictList', e => e.innerText); };
  let t = await search('cachorro'); ok(/犬/.test(t), 'português: "cachorro" → 犬');
  t = await search('presidente'); ok(/社長/.test(t) && /大統領/.test(t), 'português com vários sentidos: 社長, 大統領');
  t = await search('benkyou'); ok(/勉強/.test(t), 'romaji: "benkyou" → 勉強');
  t = await search('とけい'); ok(/時計/.test(t), 'kana: とけい → 時計');
  t = await search('コンビニ'); ok(/コンビニ/.test(t), 'katakana: コンビニ');
  t = await search('dormir'); ok(/寝る|眠る/.test(t), 'verbo em português: dormir');
  t = await search('食べました'); ok(/食べる/.test(t) && /(forma|Forma|conjuga)/i.test(t), 'conjugação: 食べました → 食べる (com explicação da forma)');
  t = await search('見られなかった'); ok(/見る/.test(t), 'conjugação: 見られなかった → 見る');
  t = await search('tabemashita'); ok(/食べる/.test(t), 'romaji conjugado: tabemashita → 食べる');
  t = await search('学'); ok(await page.$('#dictList [data-act="jmKanji"]') && /学/.test(t), 'kanji avulso mostra atalho para a ficha do kanji');
  await page.press('#dictSearch', 'Enter');
  ok(await page.evaluate(() => __NQ.S.dict.hist[0] === '学'), 'histórico de pesquisas registrado');
  ok(await page.evaluate(b => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h]) === b, before), 'pesquisar não muda XP, itens nem domínio');

  /* 3. ficha */
  await search('青'); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(900);
  let m = await page.$eval('#modal', e => e.innerText);
  ok(/azul/.test(m) && /tradução do Nihongo Quest/i.test(m), 'ficha: português com origem marcada (青 → azul)');
  ok(/JMdict/.test(m), 'ficha: fonte citada');
  ok(!/undefined|null|NaN/.test(m), 'ficha sem campos vazios ou “undefined”');
  await page.click('#modal [data-act="dictSpeak"], #modal [data-act="jmSpeak"], #modal .d-say, #modal [data-act^="say"]').catch(() => {});
  const xp0 = await page.evaluate(() => __NQ.S.xp);
  await page.click('#modal [data-act="jmSave"]'); await page.waitForTimeout(400);
  ok(await page.evaluate(x => __NQ.S.xp === x && !!__NQ.S.dict.words['j:1381380'] && !!ITEM['jm:1381380'], xp0), 'salvar no Caderno: palavra registrada sem XP');
  await page.selectOption('#modal .jm-coll-sel', '__new'); await page.fill('#jmCollName', 'Cores'); await page.click('#modal [data-act="jmCollNew"]'); await page.waitForTimeout(400);
  ok(await page.evaluate(() => (__NQ.S.dict.coll['Cores'] || { k: [] }).k.includes('j:1381380')), 'coleção criada com a palavra');
  await page.click('#modal [data-act="jmFav"]'); await page.waitForTimeout(300);
  ok(await page.evaluate(() => !!__NQ.S.dict.fav['j:1381380']), 'favorito de palavra do Dicionário Geral');
  ok((await noScroll(page)).bad === 0, 'ficha em 360px sem rolagem horizontal ' + JSON.stringify(await noScroll(page)));

  /* 4. kanji */
  await closeModals();
  await search('食べる'); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(900);
  m = await page.$eval('#modal', e => e.innerText);
  ok(/comer/.test(m) && /(Exemplo|exemplo)/.test(m) && /Tatoeba/.test(m), 'ficha de 食べる: português, exemplos e crédito do Tatoeba');
  ok(/(食べます|食べない|食べた)/.test(await page.$eval('#modal', e => e.textContent)), 'ficha de 食べる: tabela de conjugação'); if (process.env.DBG) console.log(m);
  await page.click('#modal [data-act="jmKanji"]'); await page.waitForTimeout(1200);
  m = await page.$eval('#modal', e => e.innerText);
  ok(await page.$('#modal svg.jm-strokes') && /ショク/.test(m) && /(た|く)/.test(m), 'kanji 食: traços animados e leituras on/kun');
  ok(/9/.test(m) && /KANJIDIC2/.test(m), 'kanji 食: número de traços e fonte');
  ok((await noScroll(page)).bad === 0, 'ficha do kanji em 360px sem rolagem horizontal');
  await closeModals();

  /* 5. frase */
  t = await search('私は学生です'); await page.waitForTimeout(600); t = await page.$eval('#dictList', e => e.innerText);
  ok(/学生/.test(t) && /(wa|partícula)/i.test(t), 'análise de frase: tokens, partícula e romaji');

  /* 6. início do Dicionário, claro/escuro */
  await search(''); await page.fill('#dictSearch', ''); await page.dispatchEvent('#dictSearch', 'input'); await page.waitForTimeout(400);
  t = await page.$eval('#dictList', e => e.innerText);
  if (process.env.DBG) console.log(t); ok(/Cores/.test(t) && /Pesquisas recentes/.test(t), 'início do Dicionário mostra histórico e coleções');
  for (const th of ['light', 'dark']) {
    await page.evaluate(x => { __NQ.S.settings.theme = x; applyTheme && applyTheme(); }, th).catch(() => {});
    await page.waitForTimeout(200); const ns = await noScroll(page);
    ok(ns.bad === 0 && ns.sw <= ns.cw + 1, 'tema ' + th + ': 360px sem rolagem horizontal ' + JSON.stringify(ns));
  }

  /* 7. offline (service worker + cache) */
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 8000 }).catch(() => {});
  if (!(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller)))) { await page.reload(); await page.waitForTimeout(800); }
  ok(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller)), 'service worker ativo');
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  await search('cachorro'); await search('とけい');
  await ctx.setOffline(true);
  await page.reload(); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  t = await search('cachorro');
  ok(/犬/.test(t), 'sem internet: app abre e repete a busca pelo cache');
  await ctx.setOffline(false);

  ok(errors.length === 0, 'sem erros no console ' + JSON.stringify(errors.slice(0, 4)));
  await browser.close(); server.close();
  console.log(fails ? `\n${fails} falha(s)` : '\nTudo certo.'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
