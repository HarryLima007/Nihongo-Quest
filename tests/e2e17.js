const { chromium } = require('playwright');
/* Testes da 16.0.0 — Dicionário português completo: save da 15.0 preservado (sem mudança de esquema), as entradas que
   estavam só em inglês agora com português por sentido e origem marcada (cognato, WordNet, tradução do app, nome),
   a única não resolvida em inglês, busca das novas traduções, Caderno sem XP, cache offline renovado (nq-dict-v2-16)
   e 360px no claro e no escuro. */
const http = require('http'), path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const V15 = JSON.parse(fs.readFileSync(path.join(__dirname, 'v15.0-save.json'), 'utf8'));
Object.values(V15.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
  const raw = JSON.stringify(V15);
  await page.goto(BASE + 'nihongo-quest.html'); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals();

  /* 1. save da 15.0 */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '16.0.0', '15.0: aberto na 16.0.0 sem mudar o esquema (14)');
  ['xp', 'coins', 'streak', 'lessons', 'items', 'history', 'achievements', 'vocab', 'rpg', 'read', 'world', 'lacad', 'chat', 'learn', 'journey', 'settings', 'dict', 'profile'].forEach(k => {
    const a = JSON.parse(JSON.stringify(S[k])), b = JSON.parse(JSON.stringify(V15[k]));
    if (k === 'journey') { delete a.seenVersion; delete b.seenVersion; } if (k === 'learn') [a, b].forEach(x => Object.values(x.snaps || {}).forEach(v => delete v.t));
    if (k === 'chat') [a, b].forEach(x => Object.values(x.chars || {}).forEach(c => { if (c && typeof c === 'object') delete c.lastAt; }));
    ok(JSON.stringify(a) === JSON.stringify(b), 'preservado: ' + k);
  });
  ok(S.dict.fav['j:1381380'] && S.dict.coll.Cores && S.dict.words['j:1381380'] && S.dict.hist.includes('cansado'), 'favoritos, coleção, palavras salvas e histórico do Dicionário intactos');
  ok(await page.waitForFunction(() => __NQ.S.journey.seenVersion === '16.0.0', null, { timeout: 9000 }).then(() => true).catch(() => false), 'novidades da 16.0 registradas como vistas');
  await page.reload(); await closeModals();
  ok(await page.evaluate(x => __NQ.S.xp === x.xp && JSON.stringify(__NQ.S.items) === JSON.stringify(x.items), S), 'recarregar não altera o save (migração idempotente)');

  /* 2. busca: novas traduções e regressões */
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals();
  await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 20000 }).catch(() => {});
  const cnt = await page.evaluate(() => JMUI.meta && JMUI.meta.counts);
  ok(cnt && cnt.withAnyPt === 217478 && cnt.entries === 217479 && cnt.pt16 && cnt.pt16.entries === 4178, 'dados da 16.0: ' + (cnt && cnt.withAnyPt) + ' de ' + (cnt && cnt.entries) + ' entradas com português');
  const before = await page.evaluate(() => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h, __NQ.S.learn.days]));
  const search = async q => { await page.fill('#dictSearch', q); await page.waitForTimeout(250); await page.waitForFunction(() => !JMUI.busy, null, { timeout: 10000 }).catch(() => {}); await page.waitForTimeout(200); return page.$eval('#dictList', e => e.innerText); };
  const pairs = [['metal', /金属/], ['semifinal', /準決勝/], ['retina', /網膜/], ['sudoku', /数独/], ['cansado', /疲れる/], ['cansaço', /疲労/], ['coragem', /勇気/], ['promessa', /約束/], ['desaparecer', /消える/], ['proteger', /守る/], ['confiar', /信頼/], ['solidão', /孤独/], ['vingança', /復讐|報復/], ['felicidade', /幸せ/], ['medo', /恐れ|恐怖/], ['saudade', /名残|懐かしい/], ['destino', /運命/], ['pena', /羽|刑/]];
  for (const [q, re] of pairs) { const t = await search(q); ok(re.test(t), 'português: "' + q + '" → ' + re.source); }
  let t = await search('banco'); ok(/銀行/.test(t) && /ベンチ/.test(t), '“banco”: 銀行 e ベンチ');
  t = await search('solidao'); ok(/孤独/.test(t), 'sem acento: "solidao"');
  t = await search('じゅんけっしょう'); ok(/準決勝/.test(t) && /semifinal/.test(t), 'kana: じゅんけっしょう mostra o português novo');
  t = await search('junkesshou'); ok(/準決勝/.test(t), 'romaji: junkesshou');
  t = await search('tabemashita'); ok(/食べる/.test(t), 'forma conjugada continua reconhecida');
  ok(await page.evaluate(b => JSON.stringify([__NQ.S.xp, __NQ.S.items, __NQ.S.learn.h, __NQ.S.learn.days]) === b, before), 'pesquisar não muda XP, itens nem aprendizado');

  /* 3. fichas com a origem do português */
  const openFirst = async q => { await search(q); await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(900); return page.$eval('#modal', e => e.innerText); };
  let m = await openFirst('準決勝');
  ok(/semifinal/.test(m) && /tradução do app/.test(m) && /feita com IA/.test(m) && /Sem revisão humana/.test(m), '準決勝: português com a origem “tradução do app” (IA, sem revisão humana)');
  ok(!/undefined|null|NaN/.test(m) && (await noScroll(page)).bad === 0, 'ficha sem campos vazios e sem rolagem em 360px');
  const xp0 = await page.evaluate(() => __NQ.S.xp);
  await page.click('#modal [data-act="jmSave"]'); await page.waitForTimeout(400);
  const sv = await page.evaluate(() => { const i = JMUI.cur.i; return { it: ITEM['jm:' + i], w: __NQ.S.dict.words['j:' + i] }; });
  ok(sv.it && /semifinal/.test(sv.it.pt) && sv.w && await page.evaluate(x => __NQ.S.xp === x, xp0), 'Adicionar ao Caderno: item com o português novo, sem XP');
  ok(await page.evaluate(() => itemStatus('jm:' + JMUI.cur.i) !== 'dominada'), 'palavra salva não aparece como dominada');
  await closeModals();
  m = await openFirst('金属');
  ok(/metal/.test(m) && /confirmada como palavra do português/.test(m), '金属: cognato do JMdict-PT confirmado como português');
  await closeModals();
  m = await openFirst('ピカチュウ');
  ok(/Pikachu/.test(m) && /nome usado em português/.test(m), 'ピカチュウ: nome usado igual em português');
  await closeModals();
  m = await openFirst('ギャモン');
  ok(/gammon/.test(m) && /Ainda sem tradução para o português/.test(m), 'ギャモン (ambígua): fica em inglês, sem tradução inventada');
  await closeModals();
  m = await openFirst('しんどい');
  ok(/cansado/.test(m) && /JMdict-PT/.test(m) && !/tradução do app/.test(m), 'entradas da 15.0 continuam com a origem JMdict-PT');
  await closeModals();

  /* 4. claro/escuro em 360px */
  for (const th of ['light', 'dark']) {
    await page.evaluate(x => { __NQ.S.settings.theme = x; applyTheme && applyTheme(); }, th).catch(() => {});
    await search('semifinal'); const ns = await noScroll(page);
    ok(ns.bad === 0 && ns.sw <= ns.cw + 1, 'tema ' + th + ': resultados em 360px sem rolagem horizontal ' + JSON.stringify(ns));
    if (process.env.SHOTS) await page.screenshot({ path: process.env.SHOTS + '/busca16-' + th + '.png' });
    await page.click('#dictList [data-act="jmOpen"]'); await page.waitForTimeout(800);
    if (process.env.SHOTS) await page.screenshot({ path: process.env.SHOTS + '/ficha16-' + th + '.png', fullPage: false });
    const ns2 = await noScroll(page); ok(ns2.bad === 0, 'tema ' + th + ': ficha em 360px sem rolagem horizontal');
    await closeModals();
  }

  /* 5. offline com o cache novo */
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 8000 }).catch(() => {});
  if (!(await page.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller)))) { await page.reload(); await page.waitForTimeout(800); }
  await page.goto(BASE + 'nihongo-quest.html#dicionario'); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  await search('semifinal');
  ok(await page.evaluate(async () => { const k = await caches.keys(); return k.includes('nq-dict-v2-16') && !k.includes('nq-dict-v2') && k.includes('nq-app-v16'); }), 'cache novo do dicionário (nq-dict-v2-16); o da 15.0 é apagado');
  await ctx.setOffline(true);
  await page.reload(); await closeModals(); await page.waitForFunction(() => JMUI.ok === true, null, { timeout: 15000 }).catch(() => {});
  t = await search('semifinal'); ok(/準決勝/.test(t), 'sem internet: busca repetida pelo cache');
  await ctx.setOffline(false);

  ok(errors.length === 0, 'sem erros no console ' + JSON.stringify(errors.slice(0, 4)));
  await browser.close(); server.close();
  console.log(fails ? `\n${fails} falha(s)` : '\nTudo certo.'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
