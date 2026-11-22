const { chromium, devices } = require('playwright');
/* Testes da 8.0.0 — Living Japanese World: migração do save real da 7.0 (com backup), mapa e lugares,
   conversas (escolhas, reações, mal-entendidos), escuta (repetir, devagar, por partes, velocidade, ouvir primeiro),
   romaji/tradução, escolha por escuta, Dicionário, Caderno/Revisão sem duplicar, XP sem farm, personagens que
   lembram de você, isolamento do currículo (Academia e Listening Academy), todas as cenas jogáveis e layout no celular. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const RAW7 = fs.readFileSync(path.resolve(__dirname, 'v7.0-save.json'), 'utf8');
const V70 = JSON.parse(RAW7);
Object.values(V70.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null; window.__spoken = [];
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { window.__spoken.push({ text: u.text, rate: u.rate, pitch: u.pitch }); cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) { cur = null; u.onend && u.onend(); } }, 20); },
    get speaking() { return !!cur; } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const raw = JSON.stringify(V70);

  /* ---------- 1. migração 7.0 -> 8.0 ---------- */
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '16.0.0', '7.0: migrado para o esquema 8 (versão 8.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema7') === r, raw), 'backup do save 7.0 guardado (nihongoQuest:backup:schema7) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict'].forEach(k => ok(JSON.stringify(k === "dict" && S[k] ? { fav: S[k].fav, recent: S[k].recent } : S[k]) === JSON.stringify(k === "dict" && V70[k] ? { fav: V70[k].fav, recent: V70[k].recent } : V70[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V70.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V70.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(JSON.stringify(S.lacad) === JSON.stringify(V70.lacad), 'preservado: Listening Academy inteira (lições, avaliações, ensinados, estatísticas)');
  ok(S.world && S.world.v === 1 && !Object.keys(S.world.scenes).length, 'mundo criado vazio');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 14, 'save regravado no esquema 8');
  const before = await page.evaluate(() => ({ lessons: JSON.stringify(__NQ.S.lessons), lacad: JSON.stringify(__NQ.S.lacad), catExams: JSON.stringify(__NQ.S.catExams), xp: __NQ.S.xp }));

  /* ---------- 2. navegação: aba Mundo, mapa, lugar ---------- */
  ok(await page.isVisible('.tab[data-view="mundo"]'), 'aba “Mundo” na navegação');
  ok(await page.isVisible('[data-act="gotoWorld"]'), 'cartão do Living Japanese World no Início');
  await page.click('.tab[data-view="mundo"]');
  ok(await page.isVisible('.w-map') && (await page.$$('.w-pin')).length === 5, 'mapa ilustrado com os 5 lugares');
  ok(await page.isVisible('.w-intro'), 'apresentação do mundo na primeira visita');
  await page.click('[data-act="wIntroOk"]');
  await page.click('.w-place-row[data-p="konbini"]');
  ok(await page.isVisible('.w-banner') && (await page.textContent('.w-banner')).includes('コンビニ'), 'entrou no konbini');
  ok(await page.isVisible('.w-greet') && (await page.textContent('.w-greet')).includes('いらっしゃいませ'), 'atendente cumprimenta ao entrar');
  ok(await page.isVisible('.w-scene[data-id="k1"]') && await page.$eval('.w-scene[data-id="k2"]', b => b.classList.contains('locked')), 'situações: a primeira aberta, as seguintes liberam aos poucos');
  await page.click('.w-char');
  ok(await page.isVisible('.w-prof'), 'perfil do personagem (personalidade e jeito de falar)');
  await closeModals(page);

  /* ---------- 3. conversa: k1 com um mal-entendido ---------- */
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.w-scene[data-id="k1"]');
  ok(await page.isVisible('.w-pane'), 'situação aberta em tela cheia');
  await page.waitForTimeout(150);
  ok(await page.evaluate(() => __spoken.some(s => s.text.includes('いらっしゃいませ'))), 'fala do personagem tocada em japonês (voz do aparelho)');
  ok(await page.evaluate(() => { const p = __spoken.find(s => s.text.includes('いらっしゃいませ')); return p && p.pitch === 1.25; }), 'cada personagem tem tom próprio');
  ok((await page.textContent('.w-log')).includes('irasshaimase') && (await page.textContent('.w-log')).includes('Bem-vindo'), 'romaji e tradução visíveis');
  await page.click('[data-act="wGo"]');
  ok(await page.isVisible('.w-teach'), 'palavra nova apresentada no contexto (cartão)');
  ok((await page.$$('.w-opt')).length === 3, 'escolhas de resposta');
  // ouvir a resposta antes de escolher
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.w-opt-row [data-act="wSayText"]');
  await page.waitForTimeout(120);
  ok(await page.evaluate(() => __spoken.some(s => s.text.includes('これ'))), 'dá para ouvir cada resposta antes de escolher');
  // mal-entendido
  await page.click('.w-opt[data-j="2"]');
  ok(await page.isVisible('.w-fb-x') && (await page.textContent('.w-log')).includes('どういたしまして'), 'mal-entendido: reação engraçada do personagem + explicação');
  await page.click('[data-act="wBack"]');
  await page.click('.w-opt[data-j="0"]');
  ok((await page.textContent('.w-log')).includes('唐揚げ'), 'resposta certa: a conversa continua com outra reação');
  // romaji / tradução / ouvir primeiro / partes / velocidade
  await page.click('[data-act="wOpt"][data-k="pt"]');
  ok(!(await page.isVisible('.w-log .w-pt')), 'tradução pode ser escondida');
  await page.click('[data-act="wOpt"][data-k="pt"]');
  await page.click('[data-act="wOpt"][data-k="ro"]');
  ok(await page.$$eval('.w-log .w-bub .ro', els => els.length) === 0, 'romaji pode ser escondido ' + await page.$$eval('.w-log .w-bub .ro', els => els.map(e => e.textContent).join(',')));
  await page.click('[data-act="wOpt"][data-k="ro"]');
  await page.click('[data-act="wOpt"][data-k="listen"]');
  ok((await page.$$('.w-hidden')).length > 0, 'modo “ouvir primeiro” esconde o texto até tocar');
  await page.click('.w-hidden');
  await page.click('[data-act="wOpt"][data-k="listen"]');
  const lastLine = await page.$$eval('.w-line:not(.me)', els => els.length);
  ok(lastLine >= 2, 'várias falas no histórico da cena');
  const partsBtn = await page.$('[data-act="wParts"]');
  ok(!!partsBtn, 'botão “Por partes” nas falas longas');
  await partsBtn.click();
  const nParts = (await page.$$('.w-part')).length;
  ok(nParts >= 2, 'fala dividida em partes (' + nParts + ')');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.w-part');
  await page.waitForTimeout(120);
  ok(await page.evaluate(() => __spoken.length === 1 && __spoken[0].text.length < 8), 'tocar uma parte reproduz só aquela parte');
  await page.click('[data-act="wSpeed"][data-v="lenta"]');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('[data-act="wPlay"]');
  await page.waitForTimeout(120);
  ok(await page.evaluate(() => __spoken.length && Math.abs(__spoken[0].rate - 0.7) < 0.01), 'repetir fala na velocidade escolhida (lenta)');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('[data-act="wSlow"]');
  await page.waitForTimeout(120);
  ok(await page.evaluate(() => __spoken.length && __spoken[0].rate === 0.6), 'botão “Devagar”');
  await page.click('[data-act="wSpeed"][data-v="normal"]');
  // terminar a cena
  const playToEnd = async () => { for (let k = 0; k < 40; k++) { const m = await page.evaluate(() => __NQ.WV && __NQ.WV.mode); if (!m || m === 'end') return m; await page.evaluate(() => __NQ.auto()); } return 'stuck'; };
  ok(await playToEnd() === 'end', 'situação concluída até o fim');
  const r1 = await page.evaluate(() => ({ xp: __NQ.S.xp, st: __NQ.S.world.scenes.k1 }));
  ok(r1.xp - before.xp === 20 && r1.st.done && !r1.st.perfect, 'primeira conclusão: +20 XP (sem bônus, houve um mal-entendido)');
  ok(await page.isVisible('.w-end') && await page.isVisible('[data-act="wReplay"]'), 'resumo final com palavras e opção de viver de novo');

  /* ---------- 4. Caderno, Revisão e Dicionário ---------- */
  const sv = await page.evaluate(() => {
    const ids = () => Object.keys(__NQ.S.items).filter(x => __NQ.S.items[x].seen);
    const n0 = ids().length;
    const r1 = wSaveWord('ikura'); const n1 = ids().length; const r2 = wSaveWord('ikura'); const n2 = ids().length;
    // palavra que o aluno já tem no Caderno por outra área (ex.: Listening Academy): não duplica
    const e = wEntry('kore'); const other = e.items.find(id => !id.startsWith('world:'));
    if (other) markSeen(other);
    const r3 = wSaveWord('kore');
    return { r1, r2, n0, n1, n2, other, r3, worldKore: !!(__NQ.S.items['world:kore'] && __NQ.S.items['world:kore'].seen), taught: JSON.stringify(__NQ.S.lacad.taught) };
  });
  ok(sv.r1 && sv.n1 === sv.n0 + 1, 'palavra salva no Caderno e na Revisão');
  ok(!sv.r2 && sv.n2 === sv.n1, 'salvar de novo não duplica');
  ok(!sv.other || (!sv.r3 && !sv.worldKore), 'palavra que já está no Caderno por outra área não é duplicada (' + sv.other + ')');
  await page.click('.w-end [data-act="wSaveAll"]').catch(() => {});
  const fuku = await page.evaluate(() => wWordSaved('fukuro'));
  ok(fuku, '“Salvar todas” guarda as palavras da cena');
  await page.click('.w-end [data-act="wDict"][data-k="fukuro"]');
  ok(await page.isVisible('#modal .d-entry') && (await page.textContent('#modal .d-entry')).includes('袋'), 'consulta ao Dicionário a partir do mundo (significado, leitura, áudio)');
  await page.click('#modal [data-act="closeModal"], #modal [data-act="dictClose"]');
  const rev = await page.evaluate(() => { const it = __NQ.ITEM['world:fukuro']; let q = null; try { q = genItemQ(it); } catch (e) { return 'erro ' + e.message; } return !!q && originOf(it) === 'Living Japanese World' && itemSource(it) === 'mundo'; });
  ok(rev === true, 'palavras do mundo funcionam na Revisão, com origem “Living Japanese World” ' + rev);

  /* ---------- 5. XP sem farm ---------- */
  await page.click('[data-act="wReplay"]');
  ok(await playToEnd() === 'end', 'viver a situação de novo');
  const xpA = await page.evaluate(() => __NQ.S.xp);
  ok(xpA - r1.xp === 5, 'repetir sem erros: só o bônus único de +5 XP');
  await page.click('[data-act="wReplay"]'); await playToEnd();
  ok(await page.evaluate(() => __NQ.S.xp) === xpA, 'repetir de novo: nenhum XP (sem farm)');
  ok(await page.evaluate(() => __NQ.S.world.scenes.k1.n === 3), 'contagem de vezes guardada');

  /* ---------- 6. escolha por escuta (k3) e personagem que lembra (k4) ---------- */
  await page.click('[data-act="wClose"]'); await closeModals(page);
  ok(await page.isVisible('.w-placev') && !(await page.$eval('.w-scene[data-id="k3"]', b => b.classList.contains('locked'))), 'voltou ao lugar; novas situações liberadas');
  await page.click('.w-scene[data-id="k3"]');
  for (let k = 0; k < 10; k++) { if (await page.evaluate(() => __NQ.WV.mode) === 'pick') break; await page.evaluate(() => __NQ.auto()); }
  ok(await page.isVisible('.w-pk'), 'escolha por escuta (achar o produto pedido)');
  ok(await page.isVisible('.w-line .w-hidden'), 'na escuta, o texto da fala fica escondido até acertar');
  await page.click('.w-pk[data-j="0"]');
  ok(await page.isVisible('.w-miss') && await page.$eval('.w-pk[data-j="0"]', b => b.disabled), 'errou: dica e a fala toca de novo');
  await page.click('.w-pk[data-j="1"]');
  ok(await page.isVisible('.w-fb-ok'), 'acertou o produto');
  ok(await playToEnd() === 'end', 'k3 concluída');
  await page.evaluate(() => { wStart('k2'); }); await playToEnd();
  await page.evaluate(() => { wStart('k4'); }); await page.waitForTimeout(100);
  const first4 = await page.textContent('.w-log');
  await playToEnd();
  await page.evaluate(() => { wStart('k4'); }); await page.waitForTimeout(100);
  const again4 = await page.textContent('.w-log');
  ok(first4.includes('また来てくれた') && again4.includes('常連'), 'personagem reconhece o aluno em visitas futuras');
  await page.click('[data-act="wClose"]'); await closeModals(page);

  /* ---------- 7. todas as situações jogáveis + estrutura dos dados ---------- */
  const integ = await page.evaluate(() => {
    const bad = [];
    WORLD_SCENES.forEach(sc => {
      if (!WPL[sc.place]) bad.push(sc.id + ': lugar');
      sc.chars.forEach(c => { if (!WORLD_CHARS[c]) bad.push(sc.id + ': personagem ' + c); });
      sc.words.forEach(k => { if (!WW[k]) bad.push(sc.id + ': palavra ' + k); });
      (sc.need || []).forEach(n => { if (!WSC[n]) bad.push(sc.id + ': requisito ' + n); });
      Object.entries(sc.nodes).forEach(([id, n]) => {
        const tg = [n.go, n.b && n.b.y, n.b && n.b.n, n.p && n.p.go].concat((n.o || []).map(o => o[2])).filter(Boolean);
        tg.forEach(t => { if (!sc.nodes[t]) bad.push(sc.id + '.' + id + ' → ' + t); });
        [].concat(n.s || []).concat(n.p && n.p.say ? [n.p.say] : []).forEach(s => { const sp = s.split('|')[0]; if (!WORLD_CHARS[sp]) bad.push(sc.id + '.' + id + ' fala de ' + sp); if (s.split('|').length < 4) bad.push(sc.id + '.' + id + ' fala incompleta'); });
        (n.t || []).forEach(k => { if (!WW[k]) bad.push(sc.id + '.' + id + ' ensina ' + k); });
        (n.o || []).forEach(o => { if (o[0].split('|').length < 3 || !['g', 'k', 'x'].includes(o[1])) bad.push(sc.id + '.' + id + ' opção ' + o[0]); if (o[1] === 'x' && !(sc.nodes[o[2]] && sc.nodes[o[2]].back)) bad.push(sc.id + '.' + id + ' mal-entendido sem volta'); });
        if (n.p && n.p.items.filter(i => i[1]).length !== 1) bad.push(sc.id + '.' + id + ' escuta sem 1 resposta certa');
        if (n.p && n.p.say && !n.p.say.includes('|')) bad.push(sc.id + ' p.say');
        const kinds = ['o', 'p', 'go', 'end', 'back', 'b'].filter(k => n[k]);
        if (kinds.length !== 1) bad.push(sc.id + '.' + id + ' nó ambíguo ' + kinds.join(','));
      });
      sc.words.forEach(k => { if (!Object.values(sc.nodes).some(n => (n.t || []).includes(k))) bad.push(sc.id + ': palavra ' + k + ' nunca ensinada'); });
    });
    return bad;
  });
  ok(integ.length === 0, 'estrutura das ' + await page.evaluate(() => WORLD_SCENES.length) + ' situações íntegra ' + integ.slice(0, 5).join(' | '));
  const all = await page.evaluate(async () => {
    const out = { ended: 0, stuck: [] };
    const order = WORLD_SCENES.slice();
    for (let pass = 0; pass < 4; pass++) for (const sc of order) {
      if (wDone(sc.id) || !wOpen(sc)) continue;
      wStart(sc.id);
      let k = 0; while (__NQ.WV && __NQ.WV.mode !== 'end' && k++ < 60) __NQ.auto(true);
      if (__NQ.WV && __NQ.WV.mode === 'end') out.ended++; else out.stuck.push(sc.id);
      wClose();
    }
    out.notDone = WORLD_SCENES.filter(sc => !wDone(sc.id)).map(sc => sc.id);
    out.words = Object.keys(__NQ.S.world.words).length; out.totalWords = Object.keys(WW).length;
    return out;
  });
  ok(all.stuck.length === 0 && all.notDone.length === 0, 'todas as situações podem ser concluídas (' + all.ended + ' agora) ' + all.stuck.concat(all.notDone).join(','));
  ok(all.words === all.totalWords, 'todas as palavras do mundo aparecem nas situações (' + all.words + '/' + all.totalWords + ')');
  // rua: dar uma volta
  await closeModals(page);
  await page.click('.tab[data-view="mundo"]');
  await page.click('.w-place-row[data-p="machi"]');
  ok(await page.isVisible('[data-act="wWalk"]'), '“Dar uma volta” na rua comercial');
  await page.click('[data-act="wWalk"]');
  ok(await page.isVisible('.w-pane') && await page.evaluate(() => __NQ.WV.sc.kind === 'evento'), 'acontecimento inesperado na rua');
  await page.click('[data-act="wClose"]'); await closeModals(page);
  for (const p of ['resutoran', 'eki', 'gakkou']) { await page.click('[data-act="wMap"]'); await page.click(`.w-place-row[data-p="${p}"]`); }
  await page.waitForTimeout(150);
  const ach = await page.evaluate(() => ({ a: !!__NQ.S.achievements.world_first, b: !!__NQ.S.achievements.world_places }));
  ok(ach.a && ach.b, 'conquistas do mundo (primeira situação, visitar os 5 lugares)');
  await page.click('[data-act="wMap"]'); await page.click('.w-place-row[data-p="konbini"]');
  ok(await page.evaluate(() => { const g = document.querySelector('.w-greet'); return g && g.textContent.includes('また来てくれました'); }), 'cumprimento muda quando você volta a um lugar');

  /* ---------- 8. isolamento do currículo ---------- */
  const iso = await page.evaluate(b => {
    const S = __NQ.S, bad = [];
    if (JSON.stringify(S.lessons) !== b.lessons) bad.push('lições da Academia mudaram');
    if (JSON.stringify(S.catExams) !== b.catExams) bad.push('avaliações mudaram');
    if (JSON.stringify(S.lacad) !== b.lacad) bad.push('Listening Academy mudou');
    if (curriculumItems().some(it => it.lesson === WORLD_LESSON)) bad.push('palavra do mundo virou alternativa de avaliação');
    for (let k = 0; k < 20; k++) ALL_LESSONS.slice(0, 40).forEach(L => buildExam(L).forEach(q => { if (q.itemId && q.itemId.startsWith('world:')) bad.push('avaliação ' + L.id + ' cobrou ' + q.itemId); }));
    if (typeof laBuildExam === 'function') LA_CATS.forEach(c => laBuildExam(c).forEach(q => { if (q.it && String(q.it.id).startsWith('world:')) bad.push('LA ' + c.id); }));
    return bad.slice(0, 5);
  }, before);
  ok(iso.length === 0, 'mundo não altera Academia, avaliações nem Listening Academy ' + iso.join(' | '));
  const xpWorld = await page.evaluate(b => __NQ.S.xp - b.xp, before);
  ok(xpWorld > 0 && xpWorld < 700, 'XP do mundo equilibrado (' + xpWorld + ' XP por todas as situações)');

  /* ---------- 9. Caderno mostra a origem; persistência ---------- */
  await page.click('.tab[data-view="caderno"]');
  ok((await page.textContent('#view')).includes('袋'), 'palavra do mundo aparece no Caderno');
  await page.evaluate(() => { saveNow(); }); await page.reload(); await closeModals(page);
  ok(await page.evaluate(() => __NQ.S.world.scenes.k1 && __NQ.S.world.scenes.k1.done && __NQ.S.schemaVersion === 14), 'progresso do mundo salvo após recarregar');

  /* ---------- 10. celular pequeno ---------- */
  const small = await mk({ viewport: { width: 360, height: 700 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await small.goto(URL); await small.evaluate(r => { localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await small.reload(); await closeModals(small);
  await small.click('.tab[data-view="mundo"]');
  const ov = await small.evaluate(() => ({ doc: document.documentElement.scrollWidth <= window.innerWidth + 1, tabs: [...document.querySelectorAll('.tab span:last-child')].every(s => s.scrollWidth <= s.parentElement.clientWidth + 1) }));
  ok(ov.doc, 'mapa sem rolagem horizontal em 360px');
  ok(ov.tabs, '7 abas cabem na barra em 360px');
  await small.click('.w-place-row[data-p="resutoran"]');
  await small.click('.w-scene[data-id="r1"]');
  await small.click('[data-act="wGo"]');
  const sv2 = await small.evaluate(() => { const f = document.querySelector('.w-foot').getBoundingClientRect(); const opts = [...document.querySelectorAll('.w-opt')]; return { fits: document.querySelector('.w-pane').scrollWidth <= window.innerWidth + 1, foot: f.bottom <= window.innerHeight + 1, big: opts.every(o => o.getBoundingClientRect().height >= 44) }; });
  ok(sv2.fits && sv2.foot, 'cena cabe na tela do celular, respostas visíveis');
  ok(sv2.big, 'botões de resposta grandes para o toque (≥ 44px)');
  await small.screenshot({ path: path.resolve(__dirname, '../dist/w-scene-360.png') });
  await small.click('[data-act="wClose"]'); await small.click('[data-act="wMap"]');
  await small.screenshot({ path: path.resolve(__dirname, '../dist/w-map-360.png'), fullPage: true });

  ok(errors.length === 0, 'sem erros no console ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK');
  process.exit(fails ? 1 : 0);
})();
