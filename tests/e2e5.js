const { chromium, devices } = require('playwright');
/* Testes da 4.0.0 (Nihongo Chat): migração do save real da 3.0, desbloqueio pelos dados da Academia,
   personagens bloqueados, envio e respostas, respostas equivalentes, classificação dos erros,
   conteúdo novo apresentado antes de ser cobrado, romaji/tradução, áudio, histórico salvo,
   iniciativa sem repetição, XP sem farm, revisão e telas pequenas. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V30 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v3.0-save.json'), 'utf8'));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m);
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null; window.__spoken = [];
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate }); cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) cur = null; u.onend && u.onend(); }, 30); } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const loadSave = async (page, data) => { const raw = JSON.stringify(data); await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await page.reload(); await closeModals(page); return raw; };
  const send = async (page, t) => { await page.fill('#chatIn', t); await page.press('#chatIn', 'Enter'); await page.waitForTimeout(80); };
  const scene = (page, id) => page.evaluate(id => { chStartScene(__NQ.CHV.id, id); chRenderLog(); chRenderExtra(); }, id);
  const lastMe = page => page.evaluate(() => { const th = __NQ.CHAT.thread(__NQ.CHV.id); return [...th].reverse().find(m => m.from === 'me'); });

  /* ---------- 1. save real da 3.0 ---------- */
  const page = await mk();
  const raw = await loadSave(page, V30);
  let S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 9 && S.appVersion === '9.0.0', '3.0: migrado para o esquema 6');
  same(S.lessons, V30.lessons, '3.0: lições preservadas');
  same(S.catExams, V30.catExams, '3.0: avaliações preservadas');
  same(Object.fromEntries(Object.keys(V30.items).map(k => [k, S.items[k]])), V30.items, '3.0: itens de revisão idênticos');
  ok(S.xp === V30.xp && S.profile.name === V30.profile.name && S.streak.best === V30.streak.best, '3.0: XP, perfil e sequência preservados');
  same(S.skills, V30.skills, '3.0: estatísticas por habilidade preservadas');
  same(S.exStats, V30.exStats, '3.0: histórico de exercícios preservado');
  ok(S.history.length === V30.history.length, '3.0: histórico preservado');
  ok(S.chat && S.chat.v === 2, '3.0: dados do chat adicionados');
  const st = await page.evaluate(() => ({ bk: localStorage.getItem('nihongoQuest:backup:schema3'), stored: JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion }));
  ok(st.bk === raw, '3.0: cópia do save antigo guardada antes da migração');
  ok(st.stored === 9, '3.0: save regravado no esquema 7');

  /* ---------- 2. desbloqueio pelos dados reais ---------- */
  const un = await page.evaluate(() => __NQ.CHAT.chars.map(c => c.id + ':' + __NQ.CHAT.unlocked(c)));
  same(un, ['ren:true', 'aiko:true', 'yumi:false', 'takeshi:false'], 'desbloqueio: Ren e Aiko (Primeiros Passos aprovada); Yumi e Takeshi bloqueados');
  await page.click('.tab[data-view="chat"]'); await page.waitForTimeout(200);
  ok(await page.isVisible('#ch-yumi.locked') && await page.isVisible('#ch-takeshi.locked'), 'central: personagens bloqueados aparecem como bloqueados');
  ok(!(await page.$('[data-act="chatOpen"][data-id="yumi"]')) && await page.evaluate(() => { chatOpen('yumi'); return !__NQ.CHV; }) && await page.isHidden('.chat-pane'), 'bloqueado: não abre conversa');
  const yumiMsgs = await page.evaluate(() => __NQ.CHAT.thread('yumi').length + __NQ.CHAT.thread('takeshi').length);
  ok(yumiMsgs === 0, 'bloqueado: nenhuma mensagem/iniciativa de personagem bloqueado');
  const pend = await page.evaluate(() => ['ren', 'aiko'].map(id => __NQ.CHAT.state(id).pending).filter(Boolean).length);
  ok(pend >= 1 && pend <= 2, 'iniciativa: personagens liberados puxaram assunto (' + pend + ')');
  ok(await page.isVisible('.tab[data-view="chat"] .dot:not([hidden])'), 'iniciativa: indicador de mensagem nova na aba Chat');

  /* ---------- 3. iniciativa não se repete ---------- */
  const n1 = await page.evaluate(() => ['ren', 'aiko'].map(id => __NQ.CHAT.thread(id).filter(m => m.init).length));
  await page.reload(); await closeModals(page);
  const pend2 = await page.evaluate(() => ['ren', 'aiko'].map(id => ({ p: __NQ.CHAT.state(id).pending, n: __NQ.CHAT.thread(id).filter(m => m.init).length })));
  ok(pend2.every((x, i) => x.n === n1[i]), 'iniciativa: recarregar no mesmo dia não cria mensagens novas');
  await page.evaluate(() => { const S = __NQ.S; ['ren', 'aiko'].forEach(id => { const st = __NQ.CHAT.state(id); st.lastInit = '2000-01-01'; }); S.chat.ini.day = '2000-01-01'; });
  const again = await page.evaluate(() => __NQ.CHAT.initiative());
  ok(again === 0, 'iniciativa: com mensagem pendente, o personagem não manda outra');

  /* ---------- 4. conversa com a Aiko (registro educado) ---------- */
  // o aluno estuda a lição c1l4 (expressões do dia a dia), que libera novos assuntos com a professora
  await page.evaluate(() => { const st = __NQ.CHAT.state('aiko'); st.pending = null; st.active = null; __NQ.S.lessons.c1l4 = { passed: true, best: 100, attempts: 1 }; __NQ.setState(__NQ.S); });
  await page.goto(URL + '#chat'); await closeModals(page);
  await page.click('[data-act="chatOpen"][data-id="aiko"]'); await page.waitForTimeout(150);
  ok(await page.isVisible('.chat-pane'), 'Aiko: conversa abre');
  ok(await page.evaluate(() => __NQ.CHAT.state('aiko').active && __NQ.CHAT.state('aiko').active.free && __NQ.CHAT.state('aiko').active.topic === 'intro'), 'Aiko: começa pela apresentação (conversa livre)');
  await scene(page, 'aiko-hajime');
  await send(page, 'yoroshiku');
  let me = await lastMe(page);
  ok(me.kind === 'social', 'Aiko: “yoroshiku” casual com a professora = inadequado socialmente (' + me.kind + ')');
  ok(await page.isVisible('.cm-card.fb-social'), 'Aiko: explicação da formalidade aparece');
  await send(page, 'watashi wa burajirujin san desu');
  me = await lastMe(page);
  ok(me.kind === 'grammar', 'Aiko: さん em si mesmo é corrigido (' + me.kind + ')');
  await send(page, 'はい、ブラジル人です。');
  me = await lastMe(page);
  ok(me.kind === 'ok', 'Aiko: resposta em japonês com kanji reconhecida (' + me.kind + ')');
  ok(await page.evaluate(() => { const a = __NQ.CHAT.state('aiko').active; return !a || a.free; }), 'Aiko: apresentação concluída');

  // romaji e tradução
  const roBefore = await page.$$eval('.cm.char .ro', e => e.length);
  await page.click('[data-act="chatOpt"][data-k="ro"]'); await page.click('[data-act="chatOpt"][data-k="pt"]');
  const roAfter = await page.$$eval('.cm.char .ro', e => e.length), ptAfter = await page.$$eval('.cm.char .cb-pt', e => e.length), trBtn = await page.$$eval('.cm.char .cb-tr', e => e.length);
  ok(roBefore > 0 && roAfter === 0 && ptAfter === 0 && trBtn > 0, 'romaji e tradução podem ser ocultados (' + roBefore + '→' + roAfter + ')');
  await page.click('.cm.char .cb-tr'); await page.waitForTimeout(50);
  ok(await page.$$eval('.cm.char .cb-pt', e => e.length) === 1, 'tradução de uma fala sob demanda');
  await page.click('[data-act="chatOpt"][data-k="ro"]'); await page.click('[data-act="chatOpt"][data-k="pt"]');

  // áudio
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.cm.char [data-act="chatPlay"]'); await page.waitForTimeout(100);
  const sp = await page.evaluate(() => window.__spoken);
  ok(sp.length === 1 && sp[0].lang === 'ja-JP' && /[ぁ-ん一-龯]/.test(sp[0].text), 'áudio: fala do personagem com voz japonesa');
  await page.fill('#chatIn', 'konnichiwa'); await page.evaluate(() => { window.__spoken = []; });
  await page.click('[data-act="chatSpeakMine"]'); await page.waitForTimeout(80);
  ok((await page.evaluate(() => window.__spoken))[0].text === 'こんにちわ' || (await page.evaluate(() => window.__spoken))[0].text.startsWith('こんにち'), 'áudio: ouvir a própria frase antes de enviar');
  await page.fill('#chatIn', '');
  // ouvir primeiro
  await page.click('[data-act="chatOpt"][data-k="listen"]');
  await scene(page, 'aiko-mouichido'); await page.waitForTimeout(100);
  ok(await page.isVisible('.cb-listen'), 'ouvir primeiro: texto escondido até ouvir/mostrar');
  await send(page, 'mou ichido onegaishimasu');
  ok(await page.evaluate(() => __NQ.CHAT.thread('aiko').some(m => m.slow)), 'pedir para repetir: a professora repete devagar');
  await send(page, 'mittsu desu');
  me = await lastMe(page);
  ok(me.kind === 'vocab', 'compreensão: número errado = erro de vocabulário (' + me.kind + ')');
  await send(page, '2');
  me = await lastMe(page);
  ok(me.kind === 'ok', 'compreensão: algarismo “2” aceito como ふたつ (' + me.kind + ')');
  await page.click('[data-act="chatOpt"][data-k="listen"]');

  // dicas em níveis
  await scene(page, 'aiko-itadakimasu'); await page.waitForTimeout(100);
  for (let i = 0; i < 5; i++) await page.click('[data-act="chatHint"]');
  const hints = await page.evaluate(() => __NQ.CHAT.thread('aiko').filter(m => m.kind === 'hint').slice(-5).map(m => m.lv));
  same(hints, [1, 2, 3, 4, 5], 'dicas: cinco níveis, um por vez');
  const lvl1 = await page.evaluate(() => __NQ.CHAT.thread('aiko').filter(m => m.kind === 'hint').slice(-5)[0]);
  ok(!lvl1.model, 'dicas: a primeira dica não revela a resposta');
  await send(page, 'itadakimasu');
  me = await lastMe(page); ok(me.kind === 'vocab', 'erro previsto: いただきます depois de comer = vocabulário');
  await send(page, 'gochisousama deshita');
  me = await lastMe(page); ok(me.kind === 'ok' && me.xp === 1, 'resposta certa depois de usar a sugestão vale pouco XP (' + me.xp + ')');
  await page.click('[data-act="chatClose"]'); await page.waitForTimeout(150);

  // histórico salvo
  const nAiko = await page.evaluate(() => __NQ.CHAT.thread('aiko').length);
  await page.reload(); await closeModals(page);
  ok(await page.evaluate(() => __NQ.CHAT.thread('aiko').length) === nAiko && nAiko > 10, 'histórico permanece salvo depois de recarregar (' + nAiko + ')');
  await page.click('[data-act="chatOpen"][data-id="aiko"]'); await page.waitForTimeout(100);
  await page.click('[data-act="chatHistFromPane"]'); await page.waitForTimeout(100);
  await page.click('[data-act="chatHistTab"][data-t="corr"]');
  ok(await page.$$eval('.row', e => e.length) >= 3, 'histórico: correções recebidas listadas');
  ok(await page.evaluate(() => __NQ.S.chat.corrections.some(c => c.kind === 'social') && __NQ.S.chat.corrections.some(c => c.kind === 'grammar')), 'correções separadas por tipo');

  /* ---------- 5. motor: respostas equivalentes e erros ---------- */
  const fresh = await mk();
  await fresh.goto(URL); await fresh.fill('#nameInput', 'Ana'); await fresh.click('[data-act="onboard"]'); await fresh.waitForTimeout(200);
  const ev = await fresh.evaluate(() => {
    const C = __NQ.CHAT, sc = C.scenes.find(s => s.id === 'ren-genki'), nd = sc.nodes[0];
    const r = t => C.evaluate(nd, t, 'c', {}).kind;
    const nd3 = C.scenes.find(s => s.id === 'ren-oi').nodes[2];
    return { genki: r('genki!'), kanji: r('元気！'), kana: r('げんき'), desu: r('genki desu'), daijoubu: r('Daijoubu!'), daijobu: r('daijobu'), spelling: r('genkk'), tired: r('つかれた'),
      macron: r('daijōbu'), part: C.evaluate(nd3, 'anime ni suki', 'c', {}).kind, part2: C.evaluate(nd3, 'アニメがすき', 'c', {}).kind, slot: C.evaluate(nd3, 'raamen ga daisuki', 'c', {}).cap.like.ro, other: r('arigatou'), nonsense: r('xyzabc') };
  });
  same([ev.genki, ev.kanji, ev.kana, ev.daijoubu, ev.tired], ['ok', 'ok', 'ok', 'ok', 'ok'], 'equivalentes: genki / 元気 / げんき / daijoubu / つかれた aceitos');
  ok(ev.desu === 'social', 'げんきです com amigo = correto, mas pouco natural socialmente');
  ok(ev.daijobu === 'ok' && ev.macron === 'ok', 'variações de romaji (daijobu, daijōbu) aceitas');
  ok(ev.spelling === 'spelling', 'erro de escrita reconhecido (genkk)');
  ok(ev.part === "grammar" && ev.part2 === "ok", JSON.stringify([ev.part, ev.part2]) + " " + 'partícula errada = erro gramatical; certa em kana = ok');
  ok(ev.slot === 'raamen', 'lista de opções capturada (ラーメン)');
  ok(ev.other === 'vocab' && ev.nonsense === 'unknown', 'frase válida fora de contexto = vocabulário; texto sem sentido = não reconhecida');

  /* ---------- 6. conteúdo desconhecido não é cobrado sem introdução ---------- */
  const gate = await fresh.evaluate(() => {
    const C = __NQ.CHAT, out = [];
    // todas as cenas: o modelo de cada pergunta ou é conhecido, ou vira cartão "Novo" antes de ser cobrado
    C.scenes.forEach(sc => (sc.nodes || []).forEach(nd => { if (!nd.ask) return; const b = C.bestForm(nd, 'p'); if (!b) out.push('sem modelo: ' + sc.id + '/' + nd.id); }));
    return out;
  });
  same(gate, [], 'toda pergunta tem uma resposta-modelo para apresentar');
  const kj = await fresh.evaluate(() => { const out = []; const chk = (f, w) => { if (!f || !f.jp || /（/.test(f.jp) || /\{(?!name)/.test(f.jp)) return; const jp = f.jp.replace(/\{name\}/g, __NQ.S.profile.name); if (!chMatchForm(jp, Object.assign({}, f, { jp: null }))) out.push(w + ': ' + jp); };
    CHAT_SCENES.forEach(sc => (sc.nodes || []).forEach(nd => nd.ask && nd.ask.b.forEach(b => b.f.forEach(f => chk(f, sc.id))))); CHAT_INTENTS_ALL().forEach(it => it.f.forEach(f => chk(f, it.id))); return out; });
  same(kj, [], 'toda resposta-modelo escrita com kanji/kana é reconhecida pelos padrões de romaji');
  await fresh.click('.tab[data-view="chat"]'); await fresh.waitForTimeout(150);
  await fresh.click('[data-act="chatOpen"][data-id="ren"]'); await fresh.waitForTimeout(150);
  await send(fresh, 'yoroshiku!'); await send(fresh, 'un, suki!'); await send(fresh, 'un');
  ok(await fresh.evaluate(() => __NQ.CHAT.state('ren').met), 'Ren: apresentação concluída');
  await scene(fresh, 'ren-genki'); await fresh.waitForTimeout(100);
  ok(await fresh.isVisible('.cm-card .chip.k-new'), 'aluno novo: Ren apresenta a expressão como “Novo” antes de pedir a resposta');
  ok(await fresh.evaluate(() => __NQ.CHAT.thread('ren').some(m => m.kind === 'new' && (m.fresh || []).includes('chat:genki'))), 'palavra nova げんき marcada como Novo');
  ok(await fresh.evaluate(() => __NQ.S.items['chat:genki'] && __NQ.S.items['chat:genki'].seen > 0), 'palavra nova registrada como apresentada (vai para a revisão)');
  ok(await fresh.evaluate(() => !Object.keys(__NQ.S.items).some(k => !k.startsWith('chat:'))), 'o chat não mexe nos registros da Academia de quem não estudou');
  await send(fresh, 'genki!');
  me = await lastMe(fresh); ok(me.kind === 'ok', 'resposta natural aceita');
  ok(await fresh.evaluate(() => __NQ.S.items['chat:genki'].c === 1), 'expressão usada certo = compreendida');
  await send(fresh, 'donmai'); await fresh.waitForTimeout(80);
  ok(await fresh.evaluate(() => __NQ.S.chat.facts['ren:perdeu'] > 0), 'memória: o Ren lembra que perdeu a partida');
  ok(await fresh.evaluate(() => __NQ.CHAT.scenesFor('ren').some(s => s.id === 'ren-revanche')), 'memória: assunto da revanche só aparece depois');
  ok(await fresh.evaluate(() => !__NQ.CHAT.scenesFor('ren').some(s => s.id === 'ren-ima')), 'assunto com gramática não estudada (forma て) fica bloqueado');
  // anti-farm: repetir a mesma cena no mesmo dia não dá XP de novo
  const xp0 = await fresh.evaluate(() => __NQ.S.xp);
  await scene(fresh, 'ren-genki'); await send(fresh, 'genki'); await send(fresh, 'donmai');
  const xp1 = await fresh.evaluate(() => __NQ.S.xp);
  ok(xp1 === xp0, JSON.stringify(await fresh.evaluate(() => __NQ.CHAT.thread('ren').slice(-9).map(m => [m.from, m.kind, m.xp, m.text || m.jp]))) + ' ' + 'XP: repetir a mesma conversa no mesmo dia não rende XP de novo (' + xp0 + '→' + xp1 + ')');
  // desafio cumprido pela cena
  ok(await fresh.evaluate(() => !!__NQ.S.chat.challenges['ren-oi-genki']), 'desafio: responder naturalmente a “げんき？”');
  await fresh.screenshot({ path: path.resolve(__dirname, '../shots/chat.png') }).catch(() => {});
  await fresh.click('[data-act="chatClose"]'); await fresh.waitForTimeout(150);
  // revisão das expressões do chat
  await fresh.click('.tab[data-view="chat"]'); await fresh.waitForTimeout(100);
  await fresh.click('[data-act="startReview"][data-mode="chat"]'); await fresh.waitForTimeout(150);
  ok(await fresh.evaluate(() => __NQ.P && __NQ.P.phase === 'quiz' && __NQ.P.qs.length >= 1 && __NQ.P.qs.every(q => q.itemId && q.itemId.startsWith('chat:'))), 'revisão: expressões do chat entram na revisão inteligente');
  await fresh.evaluate(() => { document.querySelector('[data-act="pClose"]').click(); }); await fresh.waitForTimeout(80);
  const ex = await fresh.$('[data-act="pExit"]'); if (ex) await ex.click();
  await fresh.click('.tab[data-view="caderno"]'); await fresh.waitForTimeout(100);
  ok(await fresh.isVisible('text=Nihongo Chat · Expressões'), 'caderno: expressões do chat aparecem com a origem');

  /* ---------- 7. Academia continua funcionando ---------- */
  await fresh.click('.tab[data-view="academia"]'); await fresh.waitForTimeout(100);
  await fresh.evaluate(() => { const b = document.querySelector('[data-act="openLesson"][data-id="c1l1"]'); b && b.click(); }); await fresh.waitForTimeout(100);
  await fresh.click('#modal [data-act="startLesson"]'); await fresh.waitForTimeout(100);
  ok(await fresh.evaluate(() => __NQ.P && __NQ.P.L && __NQ.P.L.id === 'c1l1'), 'Academia: lição abre normalmente');
  await fresh.evaluate(() => document.querySelector('[data-act="pClose"]').click()); await fresh.waitForTimeout(50);
  const ex2 = await fresh.$('[data-act="pExit"]'); if (ex2) await ex2.click();

  /* ---------- 8. com a Academia completa: todos liberam e todos os assuntos terminam ---------- */
  const all = await mk();
  await loadSave(all, V30);
  await all.evaluate(() => {
    const S = __NQ.S;
    __NQ.CATS.forEach(c => { S.catExams[c.id] = { passed: true, best: 100 }; c.lessons.forEach(l => { S.lessons[l.id] = { passed: true, best: 100, attempts: 1 }; }); });
    Object.assign(S.chat.facts, { 'ren:perdeu': 1, 'yumi:anime': 1, 'yumi:tame': 1 });
    __NQ.setState(S);
  });
  same(await all.evaluate(() => __NQ.CHAT.chars.filter(c => !__NQ.CHAT.unlocked(c)).map(c => c.id)), [], 'com a Academia completa, todos os personagens liberam');
  const walk = await all.evaluate(async () => {
    const C = __NQ.CHAT, out = []; let n = 0;
    for (const sc of C.scenes) {
      const st = C.state(sc.char); st.active = null; st.pending = null; st.met = true;
      chatOpen(sc.char);
      if (!__NQ.CHV) { out.push('não abriu ' + sc.char); continue; }
      st.active = null;
      if (!sc.intro && !chSceneOpen(sc)) { out.push('assunto indisponível: ' + sc.id); chatClose(); continue; }
      chStartScene(sc.char, sc.id); chRenderLog(); chRenderExtra();
      for (let k = 0; k < 10 && C.state(sc.char).active && C.state(sc.char).active.scene === sc.id; k++) {
        const act = C.state(sc.char).active, nd = C.node(act);
        if (!nd || !nd.ask) { out.push('nó sem pergunta ativo: ' + sc.id); break; }
        const b = C.bestForm(nd, C.want(sc.char, act));
        if (!b) { out.push('sem modelo: ' + sc.id + '/' + nd.id); break; }
        const text = chFillF(b.f, chCtx(act)).jp.replace(/（[^）]*）/g, 'ゲーム');
        document.querySelector('#chatIn').value = text;
        await chatSend();
        const me = [...C.thread(sc.char)].reverse().find(m => m.from === 'me');
        if (!['ok', 'odd', 'variant'].includes(me.kind)) { out.push(sc.id + '/' + nd.id + ': “' + text + '” → ' + me.kind); break; }
        n++;
      }
      if (C.state(sc.char).active && C.state(sc.char).active.scene === sc.id) out.push('não terminou: ' + sc.id);
      chatClose();
    }
    return { out, n };
  });
  same(walk.out, [], 'todos os ' + await all.evaluate(() => __NQ.CHAT.scenes.length) + ' assuntos terminam respondendo com a resposta-modelo (' + walk.n + ' respostas) ' + JSON.stringify(walk.out.slice(0, 6)));

  /* ---------- 9. telas pequenas ---------- */
  const small = await mk({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await loadSave(small, V30);
  await small.click('.tab[data-view="chat"]'); await small.waitForTimeout(150);
  let w = await small.evaluate(() => document.documentElement.scrollWidth);
  ok(w <= 320, 'central do chat sem rolagem horizontal em 320px (' + w + ')');
  await small.click('[data-act="chatOpen"][data-id="aiko"]'); await small.waitForTimeout(150);
  for (let i = 0; i < 3; i++) await small.click('[data-act="chatHint"]').catch(() => {});
  w = await small.evaluate(() => Math.max(document.documentElement.scrollWidth, document.querySelector('.chat-log').scrollWidth));
  ok(w <= 320, 'conversa sem rolagem horizontal em 320px (' + w + ')');
  const inp = await small.evaluate(() => { const r = document.querySelector('#chatIn').getBoundingClientRect(); return r.bottom <= innerHeight && r.width > 120; });
  ok(inp, 'campo de resposta visível e confortável em 320px');

  ok(!errors.length, 'sem erros de JavaScript' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await browser.close();
  console.log(fails ? '\n' + fails + ' FALHA(S)' : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
