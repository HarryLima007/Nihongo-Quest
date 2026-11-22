const { chromium } = require('playwright');
/* Testes da 11.0.0 — Adventure Mode RPG: migração do save da 10.0 (com backup), entrada pelo Início e pelo Mundo,
   mapas (blocos, objetos e saídas válidos), movimentação (setas, toque, bloqueios), NPCs, missões, baús, coleta,
   descobertas, equipamentos, inventário, loja, batalha (atacar, palavra, magia, defender, itens, fugir, derrota),
   regra pedagógica (só palavras estudadas ou ensinadas antes), recompensas únicas sem farming, jogo completo
   até o chefe final, salvamento, opções de romaji, áudio e telas de 360px. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V10 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v10.0-save.json'), 'utf8'));
Object.values(V10.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null; window.__spoken = [];
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { window.__spoken.push({ text: u.text, rate: u.rate }); cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) { cur = null; u.onend && u.onend(); } }, 20); },
    get speaking() { return !!cur; } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async () => { const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"], #modal [data-act="dictClose"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  /* avança diálogos: escolhe a opção cujo texto contém `want` (ou a primeira), responde enigmas certo */
  const dlg = async (page, want = []) => {
    for (let i = 0; i < 80; i++) {
      const st = await page.evaluate(() => { const A = __NQ.AV; if (!A || !A.dlg) return null; const c = A.dlg.cur; return { choice: c && c.choice ? c.choice.map(x => x[0]) : null, quiz: !!(c && c.quiz), res: __NQ.RPG.QZ && __NQ.RPG.QZ.result }; });
      if (!st) return;
      if (st.choice) { const j = Math.max(0, st.choice.findIndex(t => want.some(w => t.includes(w)))); await page.click(`#avDlg [data-act="avChoice"][data-j="${j}"]`); continue; }
      if (st.quiz && !st.res) { await page.evaluate(() => { const q = __NQ.RPG.QZ.q; document.querySelector(`#avDlg [data-act="qzAns"][data-j="${q.ans}"]`).click(); }); continue; }
      await page.click('#avDlg [data-act="avNext"]');
    }
  };
  /* luta: usa 言霊 acertando (ou a estratégia pedida) até acabar */
  const fight = async (page, mode = 'word') => {
    for (let i = 0; i < 200; i++) {
      const st = await page.evaluate(() => { const b = __NQ.AV && __NQ.AV.bt; if (!b) return null; const r = __NQ.S.rpg; return { mode: b.mode, hp: r.hero.hp, max: __NQ.RPG.stats().maxHp, kusuri: r.inv.kusuri || 0, joyaku: r.inv.joyaku || 0, qz: !!__NQ.RPG.QZ, res: __NQ.RPG.QZ && __NQ.RPG.QZ.result }; });
      if (!st) return;
      if (st.mode === 'wait') { await page.waitForTimeout(20); continue; }
      if (st.mode === 'end') { await page.click('#avBattle [data-act="btEnd"]'); continue; }
      if (st.mode === 'quiz') {
        if (st.res) { await page.click('#avBattle [data-act="qzGo"]'); continue; }
        await page.evaluate(() => {
          const Q = __NQ.RPG.QZ, q = Q.q, c = s => document.querySelector('#avBattle ' + s).click();
          if (q.type === 'pares') { for (let i = 0; i < 3; i++) { c(`[data-act="qzPairL"][data-i="${i}"]`); c(`[data-act="qzPairR"][data-i="${i}"]`); } }
          else if (q.type === 'montar') { for (let k = 0; k < q.mora.length; k++) { const j = q.tiles.indexOf(k); c(`[data-act="qzTile"][data-j="${j}"]`); } }
          else c(`[data-act="qzAns"][data-j="${q.ans}"]`);
        });
        continue;
      }
      if (st.mode !== 'cmd') { await page.click('#avBattle [data-act="btBack"]'); continue; }
      if (st.hp < st.max * 0.35 && (st.joyaku || st.kusuri)) { await page.click('#avBattle [data-act="btItems"]'); await page.click(`#avBattle [data-act="btUse"][data-id="${st.joyaku ? 'joyaku' : 'kusuri'}"]`); continue; }
      await page.click(`#avBattle [data-act="${mode === 'word' ? 'btWord' : 'btAttack'}"]`);
    }
  };
  /* anda até (x, y); se um inimigo cruzar o caminho, luta e tenta de novo */
  const go = async (page, x, y) => {
    for (let i = 0; i < 6; i++) {
      await page.evaluate(([x, y]) => __NQ.RPG.walkTo(x, y), [x, y]); await page.waitForTimeout(30);
      const st = await page.evaluate(([x, y]) => ({ bt: !!__NQ.AV.bt, dlg: !!__NQ.AV.dlg, at: __NQ.S.rpg.x === x && __NQ.S.rpg.y === y }), [x, y]);
      if (st.bt && !(await page.evaluate(([x, y]) => { const o = __NQ.AV.bt.obj; return o && o.x === x && o.y === y; }, [x, y]))) { await fight(page); continue; }
      return;
    }
  };
  const area = page => page.evaluate(() => __NQ.S.rpg.area);
  const travel = async (page, a) => { await dlg(page); await page.click('[data-act="avMenu"][data-tab="mapa"]'); await page.click(`#modal [data-act="avTravel"][data-a="${a}"]`); await page.waitForTimeout(60); };
  const raw = JSON.stringify(V10);

  /* ---------- 0. mapas válidos ---------- */
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const mapv = await page.evaluate(() => {
    const R = __NQ.RPG, bad = [];
    Object.keys(R.areas).forEach(a => {
      const A = R.areas[a];
      if (A.map.length !== 11 || A.map.some(l => l.length !== 9)) bad.push(a + ': tamanho');
      A.obj.forEach(o => { const t = A.map[o.y][o.x]; if (o.t === 'exit') { if (!R.areas[o.to] || !R.walkable(o.to, o.tx, o.ty)) bad.push(a + ': saída ' + o.to); } else if (!R.walkable(a, o.x, o.y)) bad.push(a + ': ' + (o.id || o.t) + ' em bloco sólido ' + t); });
    });
    return bad;
  });
  ok(!mapv.length, 'mapas: 6 áreas 9×11, objetos em blocos andáveis e saídas válidas ' + mapv.join('; '));

  /* ---------- 1. migração 10.0 -> 11.0 ---------- */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '15.0.0', '10.0: migrado para o esquema 11 (versão 11.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema10') === r, raw), 'backup do save 10.0 guardado (nihongoQuest:backup:schema10) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict', 'world', 'lacad', 'read', 'journey', 'settings', 'profile', 'discoveries', 'listening'].forEach(k => ok(JSON.stringify(k === "dict" && S[k] ? { fav: S[k].fav, recent: S[k].recent } : S[k]) === JSON.stringify(k === "dict" && V10[k] ? { fav: V10[k].fav, recent: V10[k].recent } : V10[k]) || (k === 'journey' && S.journey.seenVersion !== undefined && JSON.stringify(S.journey.claimed) === JSON.stringify(V10.journey.claimed)), 'preservado: ' + k));
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V10.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V10.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(S.rpg && S.rpg.v === 1 && !S.rpg.started && S.rpg.hero.lv === 1 && !Object.keys(S.rpg.quests).length, 'aventura criada vazia (nada iniciado na migração)');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 14, 'save regravado no esquema 11');

  /* ---------- 2. entradas ---------- */
  ok(await page.isVisible('.av-homecard') && await page.isVisible('.nq-tiles'), 'Início: cartão do Adventure Mode acima de “Sua jornada” (8 áreas mantidas)');
  ok((await page.$$('.nq-tiles .nq-tile')).length === 10, 'Sua jornada continua com 10 áreas (com Progresso)');
  await page.click('.tab[data-view="mundo"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.w-mapcard') && await page.isVisible('.av-homecard'), 'Mundo: atalho para a aventura sem esconder o mapa de Hikari-machi');
  await page.click('.av-homecard'); await page.waitForTimeout(100);
  ok(await page.evaluate(() => location.hash === '#aventura') && await page.isVisible('[data-act="avOpen"]'), 'tela da aventura (#aventura) com botão de começar');
  ok(await page.evaluate(() => document.querySelector('.tab.active').dataset.view === 'mundo'), 'aba Mundo destacada na aventura');
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= 360), '360px: tela da aventura sem rolagem lateral');

  /* ---------- 3. regra pedagógica: o que pode ser cobrado ---------- */
  const ped = await page.evaluate(() => {
    const R = __NQ.RPG, pool = R.pool(), known = new Set(pool.map(w => w.id));
    const rpgSrc = pool.filter(w => w.src === 'rpg');
    let bad = 0, types = new Set();
    for (let i = 0; i < 200; i++) { const q = R.quiz(); if (!q) continue; types.add(q.type); (q.words || [q.word]).forEach(w => { if (!known.has(w.id)) bad++; }); }
    return { n: pool.length, rpg: rpgSrc.length, bad, types: [...types] };
  });
  ok(ped.n >= 20 && ped.rpg === 0, 'save real: o 言霊 usa só palavras estudadas no app (' + ped.n + ' palavras, nenhuma da aventura ainda)');
  ok(ped.bad === 0, '200 desafios gerados: todas as palavras cobradas estão entre as conhecidas');

  /* ---------- 4. começo da aventura ---------- */
  const xp0 = await page.evaluate(() => __NQ.S.xp), coins0 = await page.evaluate(() => __NQ.S.coins), items0 = await page.evaluate(() => JSON.stringify(__NQ.S.items)), hist0 = await page.evaluate(() => __NQ.S.history.length);
  await page.click('[data-act="avOpen"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.av-pane') && await page.isVisible('#avDlg'), 'aventura aberta em tela cheia com a narrativa inicial');
  ok(await page.evaluate(() => document.querySelector('#avDlg').textContent.includes('Hikari')), 'narrativa inicial com a Hikari');
  await page.click('#avDlg [data-act="avNext"]');
  ok(await page.evaluate(() => document.querySelector('#avDlg').textContent.includes('Terra das Palavras')), 'narrativa apresenta o mundo (Terra das Palavras)');
  await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.__spoken.some(s => /言葉の国/.test(s.text))), 'falas em japonês tocadas com a voz do aparelho');
  ok(await page.evaluate(() => !document.querySelector('#avDlg .ro') && __NQ.S.rpg.opt.ro === false), 'romaji segue a configuração do app (desligado neste save)');
  await page.evaluate(() => { __NQ.S.rpg.opt.ro = true; }); await page.click('#avDlg [data-act="avNext"]');
  ok(await page.evaluate(() => !!document.querySelector('#avDlg .ro')), 'romaji aparece quando ligado nas opções da aventura');
  await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.m1 && __NQ.S.rpg.quests.m1.st === 'on' && !!__NQ.S.rpg.taught.bouken), 'missão 1 recebida e 冒険 ensinada antes de qualquer cobrança');
  ok(await page.evaluate(() => document.querySelectorAll('#avObjs .av-o.npc').length === 4 && !!document.querySelector('#avObjs text')), 'vila com 4 NPCs e marcador de missão (!)');
  // setas e bloqueio
  const p0 = await page.evaluate(() => [__NQ.S.rpg.x, __NQ.S.rpg.y]);
  await page.click('[data-act="avMove"][data-d="right"]'); await page.waitForTimeout(30);
  const p1 = await page.evaluate(() => [__NQ.S.rpg.x, __NQ.S.rpg.y]);
  ok(p1[0] === p0[0] + 1 && p1[1] === p0[1], 'seta para a direita move o herói um bloco');
  await page.evaluate(() => { __NQ.S.rpg.x = 1; __NQ.S.rpg.y = 1; });
  await page.click('[data-act="avMove"][data-d="left"]'); await page.waitForTimeout(30);
  ok(await page.evaluate(() => __NQ.S.rpg.x === 1), 'árvore bloqueia a passagem');
  await page.evaluate(() => { __NQ.S.rpg.x = 4; __NQ.S.rpg.y = 5; });
  // toque no mapa
  const box = await page.$eval('#avMap', e => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  ok(box.w >= 340 && box.w <= 360, '360px: mapa ocupa a largura da tela (' + Math.round(box.w) + 'px)');
  await page.mouse.click(box.x + box.w / 9 * 6.5, box.y + box.h / 11 * 5.5); await page.waitForTimeout(80);
  ok(await page.evaluate(() => __NQ.S.rpg.x === 6 && __NQ.S.rpg.y === 5), 'tocar num bloco leva o herói até lá pelo caminho');
  const dsz = await page.$eval('.av-d.up', e => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); });
  ok(dsz >= 44, 'setas com toque confortável (' + Math.round(dsz) + 'px)');
  ok(await page.evaluate(() => document.querySelector('.av-pane').scrollWidth <= 360), '360px: exploração sem rolagem lateral');
  // falar com a Vovó Chiyo
  await go(page, 1, 4); await dlg(page);
  const m1 = await page.evaluate(() => ({ q: __NQ.S.rpg.quests, eq: __NQ.S.rpg.equip, inv: __NQ.S.rpg.inv, xp: __NQ.S.xp }));
  ok(m1.q.m1.st === 'done' && m1.q.m2.st === 'on', 'missão 1 concluída e missão 2 começa sozinha');
  ok(m1.eq.weapon === 'bokutou' && m1.inv.kusuri === 2 && m1.inv.chizu === 1, 'recompensa: espada de madeira equipada, 2 remédios e mapa');
  ok(m1.xp === xp0 + 20, 'XP do Nihongo Quest só pela missão (+20, recompensa única)');
  ok(await page.evaluate(() => document.querySelector('#avRen').style.display !== 'none'), 'Ren segue o herói como companheiro depois da missão 1');

  /* ---------- 5. menu, equipamentos, opções ---------- */
  await page.click('[data-act="avMenu"][data-tab="heroi"]'); await page.waitForTimeout(60);
  ok(await page.isVisible('#modal .av-hero') && (await page.textContent('#modal')).includes('Espada de madeira'), 'menu do herói: nível, HP, Ki, ataque, defesa e equipamentos');
  ok((await page.textContent('#modal')).includes('só da aventura'), 'nível do herói separado do XP de estudo (explicado)');
  await page.click('#modal [data-act="avUnequip"][data-slot="weapon"]');
  const atkA = await page.evaluate(() => __NQ.RPG.stats().atk);
  await page.click('#modal [data-act="avMenu"][data-tab="bolsa"]'); await page.click('#modal [data-act="avEquip"][data-id="bokutou"]');
  const atkB = await page.evaluate(() => __NQ.RPG.stats().atk);
  ok(atkB === atkA + 2, 'tirar e equipar a espada muda o ataque (+2)');
  await page.click('#modal [data-act="avMenu"][data-tab="opcoes"]'); await page.click('#modal [data-act="avOpt"][data-k="ro"]');
  await page.click('#modal [data-act="avMenu"][data-tab="missoes"]');
  ok((await page.textContent('#modal')).includes('Os mochis do campo') && (await page.textContent('#modal')).includes('0/3'), 'missões: em andamento com progresso (0/3)');
  await page.click('#modal [data-act="avMenu"][data-tab="mapa"]');
  ok(await page.isVisible('#modal .av-region') && (await page.textContent('#modal .av-region')).includes('Montanha Kumo'), 'mapa da região com lugares bloqueados para o futuro');
  await closeModals(page);
  // romaji desligado
  await go(page, 3, 2); await page.click('[data-act="avInteract"]'); await page.evaluate(() => { __NQ.AV.face = 'up'; });
  await page.evaluate(() => document.querySelector('[data-act="avInteract"]').click()); await page.waitForTimeout(40);
  ok(await page.isVisible('#avDlg') && !(await page.$('#avDlg .av-bub .ro')), 'placa lida com o botão 調, sem romaji quando a opção está desligada');
  await dlg(page); await page.evaluate(() => { __NQ.S.rpg.opt.ro = true; });

  /* ---------- 6. campo, porteira e batalha ---------- */
  await go(page, 4, 0); await page.waitForTimeout(40);
  ok(await area(page) === 'campo', 'saída norte leva ao Campo Nohara');
  await go(page, 7, 5); await page.waitForTimeout(40);
  ok(await page.isVisible('#avDlg') && (await page.textContent('#avDlg')).includes('tronco'), 'tronco bloqueia a floresta antes da missão 2');
  await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.area === 'campo'), 'não dá para passar pelo tronco');
  const eco0 = await page.evaluate(() => [__NQ.S.xp, __NQ.S.coins]);
  // batalha manual: atacar, defender, palavra errada, item, fugir
  await page.evaluate(() => { const o = __NQ.RPG.objs('campo').find(o => o.e === 'mochi'); __NQ.RPG.battle('mochi', o); });
  ok(await page.isVisible('#avBattle .av-cmds'), 'batalha: comandos 攻撃 言霊 魔法 防御 道具 逃げる');
  ok(await page.evaluate(() => document.querySelector('#avBattle').scrollWidth <= 360 && [...document.querySelectorAll('.av-cmd')].every(b => b.getBoundingClientRect().height >= 60)), '360px: batalha sem rolagem lateral e botões grandes');
  ok(await page.evaluate(() => document.querySelector('[data-act="btMagicMenu"]').disabled && document.querySelector('[data-act="btFlee"]').disabled === false), 'magia bloqueada sem pergaminho; fugir permitido contra inimigo comum');
  const fhp0 = await page.evaluate(() => __NQ.AV.bt.hp);
  await page.click('#avBattle [data-act="btAttack"]'); await page.waitForTimeout(40);
  const fa = await page.evaluate(() => ({ hp: __NQ.AV.bt ? __NQ.AV.bt.hp : 0, log: __NQ.AV.bt ? __NQ.AV.bt.log.map(l => l.txt).join(' ') : '' }));
  ok(fa.hp < fhp0 || /desviou/.test(fa.log), 'atacar causa dano');
  ok(/ataca/.test(fa.log), 'inimigo responde no turno dele');
  if (await page.evaluate(() => !!__NQ.AV.bt)) {
    const hpBefore = await page.evaluate(() => __NQ.S.rpg.hero.hp);
    await page.click('#avBattle [data-act="btWord"]'); await page.waitForTimeout(30);
    const wrong = await page.evaluate(() => { const q = __NQ.RPG.QZ.q; if (q.opts) { const j = q.opts.findIndex((x, i) => i !== q.ans); document.querySelector(`#avBattle [data-act="qzAns"][data-j="${j}"]`).click(); return 'mc'; } return q.type; });
    if (wrong === 'mc') {
      ok(await page.evaluate(() => __NQ.RPG.QZ.result === 'x' && !!document.querySelector('.av-fb.x')), 'palavra errada: mostra a resposta certa com áudio');
      ok(await page.evaluate(h => __NQ.S.rpg.hero.hp === h, hpBefore), 'errar a palavra não tira vida do herói');
      await page.click('#avBattle [data-act="qzGo"]'); await page.waitForTimeout(40);
    } else await fight(page);
  }
  if (await page.evaluate(() => !!__NQ.AV.bt)) {
    await page.click('#avBattle [data-act="btFlee"]'); await page.waitForTimeout(40);
    for (let i = 0; i < 10 && await page.evaluate(() => !!(__NQ.AV.bt && __NQ.AV.bt.mode !== 'end')); i++) { await page.evaluate(() => __NQ.AV.bt.mode === 'cmd' && document.querySelector('#avBattle [data-act="btFlee"]').click()); await page.waitForTimeout(30); }
  }
  await fight(page);
  ok(await page.evaluate(() => !__NQ.AV.bt && !__NQ.AV.dlg), 'batalha termina e volta ao mapa');
  const far = await page.evaluate(() => [__NQ.S.xp, __NQ.S.coins]);
  ok(far[0] === eco0[0] && far[1] === eco0[1], 'batalhas não dão XP nem moedas do Nihongo Quest (sem farming)');
  ok(await page.evaluate(i => JSON.stringify(__NQ.S.items) === i, items0) && await page.evaluate(h => __NQ.S.history.length === h, hist0), 'batalhas não mexem no SRS, no Caderno nem no histórico das outras áreas');
  // vencer 3 mochis
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => { const o = __NQ.RPG.objs('campo').find(o => o.e === 'mochi'); __NQ.RPG.battle('mochi', o || { t: 'enemy', id: 'x' + Math.random(), e: 'mochi' }); });
    await fight(page);
  }
  const k = await page.evaluate(() => ({ kills: __NQ.S.rpg.kills.mochi, lv: __NQ.S.rpg.hero.lv, n: __NQ.S.rpg.quests.m2.n }));
  ok(k.n >= 3 && k.lv >= 2, 'mochis derrotados contam na missão e o herói sobe de nível (nível ' + k.lv + ')');
  ok(await page.evaluate(() => __NQ.S.rpg.stats.words > 0 && __NQ.S.rpg.stats.wordsOk > 0), 'desafios de palavras registrados só na aventura');
  // coleta e baú
  await go(page, 1, 1); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.inv.yakusou === 1 && !!__NQ.S.rpg.taught.yakusou), 'erva colhida (e a palavra 薬草 ensinada)');
  await go(page, 1, 1); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.inv.yakusou === 1), 'a mesma erva só pode ser colhida uma vez por dia');
  await go(page, 7, 3); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.equip.weapon === 'takeyumi' && !!__NQ.S.rpg.opened.b1 && !!__NQ.S.rpg.taught.takarabako), 'baú: arco de bambu equipado automaticamente (mais forte) e 宝箱 ensinada');
  await go(page, 7, 3); await dlg(page);
  ok(await page.evaluate(() => (__NQ.S.rpg.inv.takeyumi || 0) === 0 && __NQ.S.rpg.inv.bokutou === 1), 'baú aberto não dá o item de novo');
  await go(page, 6, 9); await dlg(page);
  ok(await page.evaluate(() => !!__NQ.S.rpg.spots.jizou && !!__NQ.S.journey.claimed['rpg:spot:jizou']), 'descoberta (✦) registrada com recompensa única');

  /* ---------- 7. jogo completo ---------- */
  await travel(page, 'vila'); await go(page, 1, 4); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.m2.st === 'done' && !!__NQ.S.rpg.spells.hi && !!__NQ.S.rpg.flags.gate_mori), 'missão 2: pergaminho de 火 (fogo) e caminho da floresta aberto');
  // missões secundárias na vila
  await go(page, 7, 4); await dlg(page, ['ajuda']);
  await go(page, 6, 9); await dlg(page, ['procuro']);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.s1.st === 'on' && __NQ.S.rpg.quests.s2.st === 'on'), 'missões secundárias aceitas (Hana e Sora)');
  await go(page, 7, 4); await dlg(page, ['loja']);
  ok(await page.isVisible('#modal .av-shop-row'), 'loja da Hana abre');
  const c1 = await page.evaluate(() => __NQ.S.coins);
  await page.click('#modal [data-act="avBuy"][data-id="kusuri"]');
  ok(await page.evaluate(c => __NQ.S.coins === c - 5 && __NQ.S.rpg.inv.kusuri === 3, c1), 'comprar remédio usa as moedas do Nihongo Quest');
  await closeModals(page);
  await travel(page, 'campo'); await go(page, 7, 8); await dlg(page);
  await go(page, 8, 5); await page.waitForTimeout(40);
  ok(await area(page) === 'mori', 'campo → Floresta Sussurrante');
  await go(page, 7, 3); await dlg(page);
  await go(page, 6, 1); await dlg(page);
  await go(page, 7, 9); await dlg(page);
  await go(page, 6, 2); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.equip.armor === 'kawayoroi' && !!__NQ.S.rpg.spells.mizu), 'floresta: armadura de couro e magia 水 nos baús');
  await go(page, 1, 9); await dlg(page);
  ok(await page.evaluate(() => !!__NQ.S.rpg.flags.found_tama), 'a gata Tama foi encontrada');
  // kodama com magia de fogo
  await page.evaluate(() => { const o = __NQ.RPG.objs('mori').find(o => o.e === 'kodama'); __NQ.RPG.battle('kodama', o); });
  await page.click('#avBattle [data-act="btMagicMenu"]');
  const kh = await page.evaluate(() => __NQ.AV.bt.hp);
  await page.click('#avBattle [data-act="btCast"][data-k="hi"]'); await page.waitForTimeout(30);
  ok(await page.evaluate(h => (!__NQ.AV.bt || __NQ.AV.bt.hp < h || __NQ.AV.bt.mode === 'end') && __NQ.S.rpg.hero.ki < __NQ.RPG.stats().maxKi + 1, kh) && await page.evaluate(() => !__NQ.AV.bt || __NQ.AV.bt.log.some(l => /super eficaz/.test(l.txt))), 'magia de fogo gasta Ki e é super eficaz contra o kodama');
  await fight(page);
  await go(page, 4, 0); await page.waitForTimeout(40);
  ok(await area(page) === 'jinja', 'floresta → Santuário da Raposa');
  await go(page, 7, 8); await dlg(page);
  await go(page, 2, 1); await dlg(page);
  await go(page, 2, 7); await dlg(page);
  await go(page, 4, 4); await dlg(page);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.m3.st === 'done' && !!__NQ.S.rpg.spells.kaifuku && __NQ.S.rpg.equip.acc === 'omamori' && __NQ.S.rpg.respawn === 'jinja'), 'missão 3: rezar no santuário cura, ensina 回復 e dá o amuleto');
  await go(page, 6, 5); await dlg(page, ['Aceitar']);
  for (let i = 0; i < 3; i++) { await go(page, 6, 5); await dlg(page, ['enigma']); }
  await go(page, 6, 5); await dlg(page, ['máscara']);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.s4.st === 'done' && __NQ.RPG.state().inv.kitsunemen === 1 || __NQ.S.rpg.equip.acc === 'kitsunemen'), 'enigmas da raposa: 3 acertos e a máscara de raposa');
  // treinar um pouco antes do chefe
  for (let i = 0; i < 4; i++) { await page.evaluate(() => __NQ.RPG.battle('tanuki', { t: 'enemy', id: 'tr' + Math.random(), e: 'tanuki' })); await fight(page); }
  await page.evaluate(() => { const r = __NQ.S.rpg; r.hero.hp = __NQ.RPG.stats().maxHp; r.hero.ki = __NQ.RPG.stats().maxKi; });
  await travel(page, 'mori'); await go(page, 8, 8); await page.waitForTimeout(40);
  ok(await area(page) === 'kawa', 'floresta → Rio Kiyokawa');
  await go(page, 1, 6); await dlg(page, ['Perguntar']);
  ok(await page.evaluate(() => __NQ.S.rpg.quests.s5 && __NQ.S.rpg.quests.s5.st === 'on'), 'Seu Gen dá a missão dos lugares especiais');
  await go(page, 4, 8); await dlg(page);
  ok(await page.evaluate(() => !!(__NQ.AV.bt && __NQ.AV.bt.E.boss)), 'chefe: duelo com o kappa na ponte');
  ok(await page.evaluate(() => document.querySelector('[data-act="btFlee"]').disabled), 'não dá para fugir de chefe');
  await fight(page);
  await dlg(page);
  ok(await page.evaluate(() => !!__NQ.S.rpg.flags.boss_kappa && __NQ.S.rpg.quests.m4.st === 'done' && __NQ.S.rpg.quests.m5.st === 'on'), 'kappa derrotado: ponte livre, missão 5 começa');
  ok(await page.evaluate(() => !!__NQ.S.achievements.rpg_kappa && !!__NQ.S.achievements.rpg_start), 'conquistas do Adventure Mode no sistema de conquistas do app');
  await go(page, 7, 6); await dlg(page); await go(page, 7, 1); await dlg(page);
  await go(page, 8, 8); await page.waitForTimeout(40);
  ok(await area(page) === 'dokutsu', 'ponte → Caverna do Eco');
  for (const [x, y] of [[1, 7], [7, 7], [1, 2], [7, 9], [1, 9], [7, 2]]) { await go(page, x, y); await fight(page); await dlg(page); }
  ok(await page.evaluate(() => __NQ.S.rpg.inv.tetsu >= 3 && !!__NQ.S.rpg.spells.kaze && !!__NQ.S.rpg.spots.hekiga), 'caverna: 3 minérios, magia 風 e a pintura antiga');
  await travel(page, 'vila'); await go(page, 2, 9); await dlg(page, ['espadas']); await go(page, 2, 9); await dlg(page, ['Entregar']);
  ok(await page.evaluate(() => __NQ.S.rpg.equip.weapon === 'tetsuken' && __NQ.S.rpg.quests.s3.st === 'done'), 'ferreiro forja a espada de ferro');
  await go(page, 6, 9); await dlg(page);
  await go(page, 7, 6); await dlg(page);
  await go(page, 7, 4); await dlg(page, ['Entregar']);
  await travel(page, 'kawa'); await go(page, 1, 6); await dlg(page, ['Contar']);
  const side = await page.evaluate(() => ['s1', 's2', 's3', 's4', 's5'].map(k => __NQ.S.rpg.quests[k] && __NQ.S.rpg.quests[k].st));
  ok(side.every(s => s === 'done'), 'as 5 missões secundárias concluídas ' + side.join(','));
  for (let i = 0; i < 6; i++) { await page.evaluate(() => __NQ.RPG.battle('ishi', { t: 'enemy', id: 'tr' + Math.random(), e: 'ishi' })); await fight(page); }
  await travel(page, 'dokutsu'); await page.evaluate(() => { const r = __NQ.S.rpg; r.hero.hp = __NQ.RPG.stats().maxHp; r.hero.ki = __NQ.RPG.stats().maxKi; });
  const lvBoss = await page.evaluate(() => __NQ.S.rpg.hero.lv);
  await go(page, 4, 1); await dlg(page);
  ok(await page.evaluate(() => !!(__NQ.AV.bt && __NQ.AV.bt.key === 'oni')), 'chefe final: Oni do Silêncio (herói nível ' + lvBoss + ')');
  await fight(page);
  await dlg(page);
  const fin = await page.evaluate(() => ({ f: __NQ.S.rpg.flags, q: __NQ.S.rpg.quests.m5, w: __NQ.S.rpg.inv.hikariken || (__NQ.S.rpg.equip.weapon === 'hikariken' ? 1 : 0), a: __NQ.S.achievements.rpg_oni, ex: __NQ.S.achievements.rpg_explorer }));
  ok(fin.f.boss_oni && fin.f.cleared && fin.q.st === 'done' && fin.w, 'Oni derrotado: Vale Asahi salvo, Espada da Luz recebida');
  ok(fin.a && fin.ex, 'conquistas finais (As palavras voltaram, Olhos de explorador)');
  const xpEnd = await page.evaluate(() => __NQ.S.xp), claimed = await page.evaluate(() => Object.keys(__NQ.S.journey.claimed).filter(k => k.startsWith('rpg:')).length);
  ok(xpEnd - xp0 <= 380 && claimed >= 15, 'XP total do Nihongo Quest pela aventura limitado (+' + (xpEnd - xp0) + ' XP em ' + claimed + ' recompensas únicas)');
  ok(await page.evaluate(i => JSON.stringify(__NQ.S.items) === i, items0) && await page.evaluate(h => __NQ.S.history.length === h, hist0), 'a aventura inteira não mexeu no SRS, no Caderno nem no histórico');

  /* ---------- 8. Caderno opcional, derrota, salvamento ---------- */
  await page.click('.av-menu-btn'); await page.click('#modal [data-act="avMenu"][data-tab="palavras"]');
  ok((await page.textContent('#modal')).includes('palavras da aventura'), 'aba Palavras lista o vocabulário aprendido na aventura');
  await page.click('#modal [data-act="avSaveWord"]');
  const savedId = await page.evaluate(() => Object.keys(__NQ.S.items).find(id => id.startsWith('rpg:')));
  ok(!!savedId, 'salvar no Caderno é opcional e cria o item da aventura (' + savedId + ')');
  await closeModals(page);
  await page.evaluate(() => { __NQ.S.rpg.hero.hp = 1; __NQ.RPG.battle('ishi', { t: 'enemy', id: 'zz', e: 'ishi' }); });
  for (let i = 0; i < 150 && await page.evaluate(() => !!(__NQ.AV.bt && __NQ.AV.bt.mode !== 'end')); i++) { await page.evaluate(() => __NQ.AV.bt.mode === 'cmd' && document.querySelector('#avBattle [data-act="btAttack"]').click()); await page.waitForTimeout(60); }
  const lost = await page.evaluate(() => __NQ.AV.bt && __NQ.AV.bt.result && __NQ.AV.bt.result.win === false);
  const invBefore = await page.evaluate(() => JSON.stringify(__NQ.S.rpg.inv));
  if (lost) { await page.click('#avBattle [data-act="btEnd"]'); await page.waitForTimeout(40); }
  ok(lost && await page.evaluate(() => __NQ.S.rpg.area === 'jinja' && __NQ.S.rpg.hero.hp === __NQ.RPG.stats().maxHp), 'derrota: volta ao santuário com HP cheio');
  ok(await page.evaluate(i => JSON.stringify(__NQ.S.rpg.inv) === i, invBefore), 'derrota não tira itens');
  await dlg(page);
  await page.click('[data-act="avClose"]'); await page.waitForTimeout(100);
  const snap = await page.evaluate(() => JSON.stringify(__NQ.S.rpg));
  await page.reload(); await closeModals(page);
  ok(await page.evaluate(s => JSON.stringify(__NQ.S.rpg) === s, snap), 'aventura, inventário, missões e posição salvos após recarregar');
  ok(await page.evaluate(() => location.hash === '#aventura') && (await page.textContent('#view')).includes('Continuar aventura'), 'abrir #aventura direto mostra “Continuar aventura”');
  await page.click('.tab[data-view="caderno"]'); await page.waitForTimeout(100);
  ok((await page.textContent('#view')).includes('Adventure Mode'), 'palavra salva aparece no Caderno com origem Adventure Mode');
  ok(await page.evaluate(() => { const S = __NQ.S; return Object.keys(S.lessons).length && S.read && S.lacad && S.world && S.dict; }), 'Academia, Listening, Leitura, Mundo e Dicionário continuam no save');

  /* ---------- 9. aluno novo ---------- */
  const pn = await mk();
  await pn.goto(URL); await pn.evaluate(() => localStorage.clear()); await pn.reload();
  await pn.fill('#nameInput', 'Novo'); await pn.click('[data-act="onboard"]'); await closeModals(pn);
  await pn.evaluate(() => { location.hash = '#aventura'; }); await pn.waitForTimeout(100);
  await pn.click('[data-act="avOpen"]'); await dlg(pn);
  const fresh = await pn.evaluate(() => { const R = __NQ.RPG, pool = R.pool(); return { n: pool.length, allTaught: pool.every(w => w.src === 'rpg' && __NQ.S.rpg.taught[w.id.slice(4)]) }; });
  ok(fresh.allTaught && fresh.n >= 1, 'aluno sem estudo: o 言霊 só usa palavras que a própria aventura ensinou antes (' + fresh.n + ')');
  await pn.evaluate(() => { __NQ.S.rpg.taught = {}; __NQ.RPG.battle('mochi', { t: 'enemy', id: 'q', e: 'mochi' }); });
  await pn.click('#avBattle [data-act="btWord"]'); await pn.waitForTimeout(30);
  ok(await pn.evaluate(() => !__NQ.RPG.QZ && Object.keys(__NQ.S.rpg.taught).length === 1 && __NQ.AV.bt.log.some(l => /ensina/.test(l.txt))), 'sem palavras conhecidas: Ren ensina uma palavra em vez de cobrar');
  ok(await pn.evaluate(() => __NQ.S.schemaVersion === 14 && __NQ.S.xp === 0), 'aluno novo: esquema 11, sem XP indevido');

  ok(!errors.length, 'sem erros de JavaScript ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  console.log(fails ? `\n${fails} FALHA(S)` : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
