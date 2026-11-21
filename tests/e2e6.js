const { chromium, devices } = require('playwright');
/* Testes da 5.0.0 (Nihongo Chat Evolution): caso obrigatório "watashi mo", respostas curtas pelo contexto,
   romaji/kana/kanji, resposta não reconhecida (nunca tratada como erro), erro × pouco natural × não reconhecida,
   indicador de digitação e ordem das mensagens, figurinhas e emojis, conversa livre sem cara de prova,
   desafios separados, Academia/Revisão/Caderno, migração do save real da 4.0 e telas pequenas. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V40 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v4.0-save.json'), 'utf8'));
// a conversa pendente fica "recente" (o personagem só puxa outro assunto depois de 6 h sem conversa)
Object.values(V40.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
const V30 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v3.0-save.json'), 'utf8'));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + (JSON.stringify(a) === JSON.stringify(b) ? '' : ' → ' + JSON.stringify(a)));
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
  const mk = async (vp, fast = true) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); if (fast) await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const loadSave = async (page, data) => { const raw = JSON.stringify(data); await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await page.reload(); await closeModals(page); return raw; };
  const send = async (page, t) => { await page.fill('#chatIn', t); await page.press('#chatIn', 'Enter'); await page.waitForTimeout(60); };
  const tail = (page, cid, n) => page.evaluate(([cid, n]) => __NQ.CHAT.thread(cid).slice(-n), [cid, n]);
  const lastMe = (page, cid) => page.evaluate(cid => [...__NQ.CHAT.thread(cid)].reverse().find(m => m.from === 'me'), cid);
  const afterMe = (page, cid) => page.evaluate(cid => { const th = __NQ.CHAT.thread(cid); let i = th.length - 1; while (i >= 0 && th[i].from !== 'me') i--; return th.slice(i + 1); }, cid);

  /* ---------- 1. save real da 4.0: migração e caso "watashi mo" ---------- */
  const page = await mk();
  const raw = await loadSave(page, V40);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 7 && S.appVersion === '7.0.0', '4.0: migrado para o esquema 6 (versão 6.0.0)');
  const bk = await page.evaluate(() => localStorage.getItem('nihongoQuest:backup:schema4'));
  ok(bk === raw, '4.0: cópia de segurança do save antigo guardada antes da migração');
  same(S.lessons, V40.lessons, '4.0: lições preservadas');
  same(S.catExams, V40.catExams, '4.0: avaliações preservadas');
  same(Object.fromEntries(Object.keys(V40.items).map(k => [k, S.items[k]])), V40.items, '4.0: revisão e Caderno (itens) preservados');
  ok(S.xp === V40.xp && S.coins === V40.coins && S.history.length === V40.history.length, '4.0: XP, moedas e histórico preservados');
  same(S.settings, V40.settings, '4.0: configurações preservadas');
  same(Object.keys(S.chat.threads).map(k => [k, S.chat.threads[k].length]), Object.keys(V40.chat.threads).map(k => [k, V40.chat.threads[k].length]), '4.0: conversas preservadas');
  same([S.chat.facts, S.chat.scenes, S.chat.challenges, S.chat.corrections.length, S.chat.xp], [V40.chat.facts, V40.chat.scenes, V40.chat.challenges, V40.chat.corrections.length, V40.chat.xp], '4.0: fatos, desafios, correções e XP do chat preservados');
  ok(S.chat.chars.ren.met === V40.chat.chars.ren.met && S.chat.chars.aiko.active && S.chat.chars.aiko.active.scene === V40.chat.chars.aiko.active.scene, '4.0: personagens conhecidos e desafio em andamento preservados');
  ok(S.chat.chars.ren.active.ex === 'ren.ex.sleep', '4.0: a pergunta pendente do Ren (“dormi tarde… e você?”) vira contexto da 5.0');
  ok(S.chat.stk && Array.isArray(S.chat.stk.fav), '4.0: figurinhas adicionadas ao save');

  await page.click('.tab[data-view="chat"]'); await page.waitForTimeout(150);
  await page.click('[data-act="chatOpen"][data-id="ren"]'); await page.waitForTimeout(150);
  const lastRen = await page.evaluate(() => [...__NQ.CHAT.thread('ren')].reverse().find(m => m.from === 'char').jp);
  ok(/ねるの おそかった/.test(lastRen), 'caso real: a última fala do Ren é 「きのう ねるの おそかった（笑）。…は？」');
  await send(page, 'わたしも');
  let me = await lastMe(page, 'ren'), rep = await afterMe(page, 'ren');
  ok(me.kind !== 'unknown' && !rep.some(m => m.kind === 'unk'), 'OBRIGATÓRIO: 「わたしも」 é entendido no contexto (' + me.kind + ')');
  ok(rep.some(m => m.from === 'char' && /なかま|も？|ねむい/.test(m.jp || '')), 'OBRIGATÓRIO: o Ren responde ao “eu também” (dormi tarde também): ' + rep.filter(m => m.jp).map(m => m.jp).join(' / '));
  ok(await page.$$eval('.cm.me .cm-kind', e => e.filter(x => /Não|erro/i.test(x.textContent)).length) === 0, 'conversa livre: “eu também” não recebe rótulo de erro');

  // variações de "eu também" no mesmo contexto
  const variants = await page.evaluate(() => {
    const out = {};
    ['わたしも', 'Watashi mo', 'watashi mo.', 'WATASHI MO!', '私も', 'ワタシモ', 'watshi mo', 'boku mo', 'ぼくも', '僕も', 'ore mo', 'atashi mo', 'watashi mo nemui', 'うん', 'un', 'mo', 'onaji', 'eu também'].forEach(t => {
      const st = __NQ.CHAT.state('ren'); st.active.ex = 'ren.ex.sleep'; st.active.topic = null;
      const n = __NQ.CHAT.thread('ren').length;
      const r = __NQ.CHAT.reply('ren', t);
      const added = __NQ.CHAT.thread('ren').slice(n);
      out[t] = r.kind + ':' + (r.intent || '') + ':' + (added.some(m => m.kind === 'unk') ? 'UNK' : 'ok');
    });
    return out;
  });
  const bad = Object.entries(variants).filter(([, v]) => /unknown|UNK/.test(v));
  same(bad, [], 'variações de “eu também” (romaji, kana, katakana, kanji, maiúsculas, erro de digitação, ぼく/おれ/あたし, うん, português) entendidas no contexto');

  /* ---------- 2. respostas curtas dependem do contexto ---------- */
  const ctxs = await page.evaluate(() => {
    const R = (cid, ex, t) => { const st = __NQ.CHAT.state(cid); if (!st.active || !st.active.free) st.active = null; const a = st.active || (__NQ.CHAT.reply, null); const s2 = __NQ.CHAT.state(cid); if (!s2.active || !s2.active.free) { s2.active = { free: true, n: 0, ex: null, topic: null, step: 0, ctx: {}, tags: [], fb: {}, fbAt: -99, lull: 0, miss: 0 }; } s2.active.ex = ex; s2.active.topic = null; const n = __NQ.CHAT.thread(cid).length; const r = __NQ.CHAT.reply(cid, t); const lines = __NQ.CHAT.thread(cid).slice(n).filter(m => m.from === 'char' && m.jp).map(m => m.jp); return { k: r.kind, i: r.intent, l: lines.join(' / ') }; };
    return {
      ramenYes: R('ren', 'ren.t.ramen.0.ex', 'un'), ramenNo: R('ren', 'ren.t.ramen.0.ex', 'ううん'), ramenSame: R('ren', 'ren.t.ramen.0.ex', 'watashi mo daisuki'),
      gameLaugh: R('ren', 'ren.t.game.0.ex', 'www'), gamePraise: R('ren', 'ren.t.game.0.ex', 'すごい！'), gameAsk: R('ren', 'ren.t.game.0.ex', 'nande?'),
      stateGood: R('ren', 'ren.state', 'genki'), stateTired: R('ren', 'ren.state', 'つかれた…'), stateBack: R('ren', 'ren.ex.sleep', 'ren wa?'),
      aikoTeaYes: R('aiko', 'aiko.t.tea.0.ex', 'hai'), aikoTeaNo: R('aiko', 'aiko.t.tea.0.ex', 'iie')
    };
  });
  ok(/とんこつ/.test(ctxs.ramenYes.l) && /マジか/.test(ctxs.ramenNo.l), 'うん e ううん têm sentidos opostos conforme a pergunta (' + ctxs.ramenYes.l + ' | ' + ctxs.ramenNo.l + ')');
  ok(/とんこつ/.test(ctxs.ramenSame.l), 'resposta que continua o assunto (“eu também adoro”) é aceita');
  ok(/わらう|わらい/.test(ctxs.gameLaugh.l) && /だろ|さいこう/.test(ctxs.gamePraise.l) && /れんしゅう/.test(ctxs.gameAsk.l), 'risada, elogio e “por quê?” recebem reações diferentes no mesmo assunto');
  ok(/よかった|いいね|げんき/.test(ctxs.stateGood.l) && /おつかれ/.test(ctxs.stateTired.l) && /ゲーム/.test(ctxs.stateBack.l), '“tudo bem?”: げんき, つかれた e “e você?” têm respostas próprias');
  ok(/おしえ/.test(ctxs.aikoTeaYes.l) && /コーヒー/.test(ctxs.aikoTeaNo.l), 'Aiko-sensei: はい / いいえ pelo contexto da pergunta');

  /* ---------- 3. romaji, kana e kanji ---------- */
  const forms = await page.evaluate(() => { const f = t => (__NQ.CHAT.analyze(t).intents[0] || {}).id || ''; return {
    kana: f('げんき'), kanji: f('元気'), kata: f('ゲンキ'), romaji: f('Genki!'), hira2: f('ありがとう'), kanji2: f('嬉しい'), loose: f('arigato'), kunrei: f('arigatou gozaimasu'),
    laugh: [f('www'), f('（笑）'), f('kkkk'), f('hahaha'), f('😂')], surprise: [f('マジ？'), f('ほんとう？'), f('uso!'), f('えええ！')], ack: [f('へえ'), f('なるほど'), f('sou nan da')] }; });
  ok(['kana', 'kanji', 'kata', 'romaji'].every(k => forms[k] === 'good') && forms.hira2 === 'thanks' && forms.loose === 'thanks' && forms.kunrei === 'thanks' && forms.kanji2 === 'good', 'げんき / 元気 / ゲンキ / Genki! e ありがとう / arigato / 嬉しい reconhecidos ' + JSON.stringify(forms).slice(0, 120));
  ok(forms.laugh.every(x => x === 'laugh') && forms.surprise.every(x => x === 'surprise') && forms.ack.every(x => x === 'ack'), 'risadas (www, 笑, kkkk, haha, 😂), surpresa e “へえ / なるほど” reconhecidas');

  /* ---------- 4. resposta não reconhecida nunca é tratada como erro ---------- */
  await page.evaluate(() => { const st = __NQ.CHAT.state('ren'); st.active.ex = null; st.active.topic = null; st.active.miss = 0; });
  const corr0 = await page.evaluate(() => __NQ.S.chat.corrections.length);
  await send(page, 'xqzt bvnm');
  me = await lastMe(page, 'ren'); rep = await afterMe(page, 'ren');
  ok(me.kind === 'unknown', 'texto sem sentido = não reconhecido');
  ok(rep.some(m => m.from === 'char' && /もう一回|どういう|わかんなかった/.test(m.jp || '')), 'o personagem reage naturalmente: 「ん？ もう一回 言って くれる？」');
  ok(rep.some(m => m.kind === 'unk' && /não quer dizer que você errou/.test(m.txt)), 'aviso deixa claro que não é erro do aluno');
  ok(!rep.some(m => m.kind === 'fb') && await page.evaluate(() => __NQ.S.chat.corrections.length) === corr0, 'não reconhecida não gera correção nem rótulo de erro');
  await send(page, 'zzkkq plmn');
  rep = await afterMe(page, 'ren');
  ok(rep.filter(m => m.from === 'char').length >= 2 && !rep.some(m => m.kind === 'unk'), 'na segunda vez o personagem muda de assunto naturalmente (sem repetir o aviso)');

  /* ---------- 5. erro × pouco natural × não reconhecida (desafios e conversa livre) ---------- */
  const kinds = await page.evaluate(() => {
    const C = __NQ.CHAT, nd = C.scenes.find(s => s.id === 'ren-oi').nodes[2], nd1 = C.scenes.find(s => s.id === 'ren-genki').nodes[0];
    return { wrong: C.evaluate(nd, 'anime ni suki', 'c', {}).kind, social: C.evaluate(nd1, 'genki desu', 'c', {}).kind, unknown: C.evaluate(nd1, 'xqzt', 'c', {}).kind, right: C.evaluate(nd1, 'genki!', 'c', {}).kind };
  });
  same(kinds, { wrong: 'grammar', social: 'social', unknown: 'unknown', right: 'ok' }, 'desafio: erro gramatical, certo mas pouco natural, não reconhecida e correta são classificados separadamente');
  // desafio: não reconhecida não conta tentativa e mostra o rótulo "não conta como erro"
  await page.click('[data-act="chatChal"]'); await page.waitForTimeout(120);
  await page.click('#modal [data-act="chatScene"][data-id="ren-genki"]'); await page.waitForTimeout(120);
  ok(await page.isVisible('.ch-chal') && await page.isVisible('text=挑 Desafio'), 'desafio: faixa “Desafio” deixa claro que é uma atividade');
  await send(page, 'xqzt bvnm');
  ok(await page.evaluate(() => __NQ.CHAT.state('ren').active.tries === 0), 'desafio: resposta não reconhecida não conta como tentativa errada');
  ok(await page.isVisible('.cm-kind.k-unknown') && /não conta como erro/.test(await page.textContent('.cm-kind.k-unknown')), 'desafio: rótulo “Não entendi (não conta como erro)”');
  await send(page, 'genki desu');
  me = await lastMe(page, 'ren');
  ok(me.kind === 'social' && await page.isVisible('.cm-card.fb-social'), 'desafio: forma educada com amigo = certa, mas pouco natural, com explicação');
  await send(page, 'donmai');
  ok(await page.evaluate(() => { const a = __NQ.CHAT.state('ren').active; return !a || a.free; }), 'desafio concluído: volta para a conversa livre');
  ok(await page.isHidden('.ch-chal'), 'faixa do desafio some ao terminar');
  // conversa livre com a professora: casual demais = dica gentil (não erro), uma vez só
  await closeModals(page);
  await page.click('[data-act="chatClose"]'); await page.waitForTimeout(100);
  await page.evaluate(() => { const st = __NQ.CHAT.state('aiko'); st.active = null; st.met = true; });
  await page.click('[data-act="chatOpen"][data-id="aiko"]'); await page.waitForTimeout(120);
  await send(page, 'arigato');
  ok(await page.isVisible('.cm-card.fb.soft') && /forma educada/.test(await page.textContent('.cm-card.fb.soft')), 'conversa livre: “arigato” com a professora gera uma dica gentil de naturalidade');
  ok(/ありがとうございます/.test(await page.textContent('.cm-card.fb.soft')), 'dica mostra a forma japonesa, romaji e tradução (ありがとうございます)');
  await send(page, 'arigato');
  ok(await page.$$eval('.cm-card.fb.soft', e => e.length) === 1, 'a dica não interrompe de novo na mesma conversa');
  ok(await page.$$eval('.cm.me', e => e.slice(-2).filter(x => x.querySelector('.cm-kind')).length) === 0, 'conversa livre: mensagens do aluno sem rótulos de avaliação');
  await page.click('[data-act="chatClose"]'); await page.waitForTimeout(100);

  /* ---------- 6. digitação, tempos e ordem das mensagens ---------- */
  const slow = await mk(undefined, false);
  await loadSave(slow, V30);
  await slow.click('.tab[data-view="chat"]'); await slow.waitForTimeout(120);
  await slow.click('[data-act="chatOpen"][data-id="ren"]');
  await slow.waitForFunction(() => !__NQ.CHV.typing && __NQ.CHV.shown >= __NQ.CHAT.thread('ren').length, null, { timeout: 15000 });
  const t0 = Date.now();
  await slow.fill('#chatIn', 'yoroshiku'); await slow.press('#chatIn', 'Enter');
  ok(await slow.isVisible('.cm.me >> text=yoroshiku'), 'a mensagem do aluno aparece na hora');
  await slow.waitForSelector('.cm.typing', { timeout: 2500 });
  ok(/Ren está digitando/.test(await slow.textContent('.cm.typing')) && /digitando/.test(await slow.textContent('#chHsub')), 'indicador “Ren está digitando…” no balão e no cabeçalho');
  // manda outra mensagem enquanto o Ren digita
  await slow.fill('#chatIn', 'konnichiwa'); await slow.press('#chatIn', 'Enter');
  await slow.waitForFunction(() => !__NQ.CHV.typing && __NQ.CHV.shown >= __NQ.CHAT.thread('ren').length, null, { timeout: 15000 });
  const dt = Date.now() - t0;
  ok(dt < 9000, 'respostas sem esperas exageradas (' + dt + ' ms para duas trocas)');
  const order = await slow.evaluate(() => {
    const th = __NQ.CHAT.thread('ren').filter(m => m.from === 'me' || (m.from === 'char' && m.jp));
    const dom = [...document.querySelectorAll('#chatLog .cm:not(.typing)')].filter(e => e.querySelector('.cb-jp, .cb-me')).map(e => (e.querySelector('.cb-jp') || e.querySelector('.cb-me')).textContent);
    return { th: th.slice(-dom.length).map(m => m.jp || m.txt), dom };
  });
  same(order.dom, order.th, 'mensagens na tela na mesma ordem do histórico (nada fora de ordem ao mandar durante a digitação)');
  const iY = order.dom.indexOf('yoroshiku'), iK = order.dom.indexOf('konnichiwa');
  ok(iY >= 0 && iK > iY + 1, 'a resposta à primeira mensagem aparece antes da segunda mensagem do aluno');
  // tempos diferentes por personagem
  const sty = await slow.evaluate(() => ['ren', 'aiko', 'yumi', 'takeshi'].map(id => { const s = __NQ.CHAT.talk[id].style; return id + ':' + s.base + '/' + s.max; }));
  ok(new Set(sty.map(x => x.split(':')[1])).size === 4, 'cada personagem tem o próprio ritmo de digitação ' + sty.join(' '));
  // balões divididos
  ok(await slow.evaluate(() => { const th = __NQ.CHAT.thread('ren'); for (let i = 1; i < th.length; i++) if (th[i].from === 'char' && th[i - 1].from === 'char') return true; return false; }), 'respostas em mais de um balão quando faz sentido');
  // modo de respostas imediatas
  await slow.evaluate(() => { __NQ.S.chat.settings.instant = true; });
  await slow.fill('#chatIn', 'www'); await slow.press('#chatIn', 'Enter'); await slow.waitForTimeout(80);
  ok(await slow.evaluate(() => __NQ.CHV.shown >= __NQ.CHAT.thread('ren').length && !__NQ.CHV.typing), 'opção “Respostas imediatas” desliga o tempo de digitação');

  /* ---------- 7. figurinhas e emojis ---------- */
  const fresh = await mk();
  await fresh.goto(URL); await fresh.fill('#nameInput', 'Ana'); await fresh.click('[data-act="onboard"]'); await fresh.waitForTimeout(200); await closeModals(fresh);
  await fresh.click('.tab[data-view="chat"]'); await fresh.waitForTimeout(120);
  await fresh.click('[data-act="chatOpen"][data-id="ren"]'); await fresh.waitForTimeout(150);
  ok(await fresh.evaluate(() => __NQ.CHAT.state('ren').active.free && __NQ.CHAT.state('ren').active.topic === 'intro'), 'primeiro contato: o Ren puxa conversa livre (sem exercício)');
  await send(fresh, 'yoroshiku!'); await send(fresh, 'un, suki!'); await send(fresh, 'un');
  ok(await fresh.evaluate(() => __NQ.CHAT.state('ren').met && __NQ.S.chat.facts['ren:met'] > 0), 'apresentação pela conversa: Ren e aluno se conhecem');
  ok(await fresh.evaluate(() => !__NQ.S.chat.stats.scenes), 'conversa livre não é contada como desafio');
  await fresh.click('#stkBtn'); await fresh.waitForTimeout(100);
  ok(await fresh.isVisible('.stk-panel') && await fresh.$$eval('.stk-pick', e => e.length) >= 10, 'área de figurinhas abre com a coleção');
  const sets = await fresh.$$eval('.stk-tab', e => e.map(x => x.textContent));
  ok(sets.includes('Hikari') && sets.includes('Ren') && !sets.includes('Yumi'), 'conjuntos: Hikari + personagens já conhecidos (' + sets.join(', ') + ')');
  await fresh.click('[data-act="stkFav"][data-id="hikari-celebrate"]'); await fresh.waitForTimeout(60);
  ok(await fresh.evaluate(() => __NQ.S.chat.stk.fav.includes('hikari-celebrate')), 'marcar figurinha favorita');
  await fresh.click('[data-act="chatStkTab"][data-t="fav"]'); await fresh.waitForTimeout(60);
  ok(await fresh.$$eval('.stk-pick', e => e.length) === 1, 'aba de favoritas mostra a favorita');
  await fresh.click('[data-act="chatStkTab"][data-t="hikari"]');
  await fresh.click('[data-act="chatStkSend"][data-id="hikari-laugh"]'); await fresh.waitForTimeout(100);
  me = await lastMe(fresh, 'ren'); rep = await afterMe(fresh, 'ren');
  ok(me.stk === 'hikari-laugh' && !me.txt, 'enviar só a figurinha');
  ok(rep.some(m => m.from === 'char') && !rep.some(m => m.kind === 'unk'), 'o personagem interpreta a figurinha de risada (' + rep.filter(m => m.from === 'char').map(m => m.jp || m.stk).join(' / ') + ')');
  ok(await fresh.evaluate(() => !!(__NQ.S.items['chat:wara'] && __NQ.S.items['chat:wara'].seen)), 'figurinha que ensina: 笑 (wara) entra nas expressões do chat');
  await fresh.fill('#chatIn', 'sugoi');
  await fresh.click('#stkBtn'); await fresh.click('[data-act="chatStkSend"][data-id="hikari-excited"]'); await fresh.waitForTimeout(100);
  me = await lastMe(fresh, 'ren');
  ok(me.stk === 'hikari-excited' && me.txt === 'sugoi', 'texto + figurinha na mesma mensagem');
  ok(await fresh.isVisible('.cm.me .stk-b'), 'figurinha aparece no balão do aluno');
  await send(fresh, '😂');
  rep = await afterMe(fresh, 'ren');
  ok(!rep.some(m => m.kind === 'unk'), 'emoji 😂 entendido como risada');
  await fresh.click('#stkBtn'); await fresh.click('[data-act="chatStkTab"][data-t="emoji"]'); await fresh.click('[data-act="chatEmoji"]'); await fresh.waitForTimeout(40);
  ok((await fresh.inputValue('#chatIn')).length > 0, 'emoji inserido no campo de mensagem');
  await fresh.fill('#chatIn', '');
  // o personagem manda figurinha quando faz sentido
  let gotStk = false;
  for (let i = 0; i < 6 && !gotStk; i++) { await send(fresh, 'www'); gotStk = (await afterMe(fresh, 'ren')).some(m => m.from === 'char' && m.stk); }
  ok(gotStk, 'o Ren responde a uma risada com figurinha de risada');
  const stkMsg = await fresh.evaluate(() => [...__NQ.CHAT.thread('ren')].reverse().find(m => m.from === 'char' && m.stk));
  ok(stkMsg && stkMsg.stk.startsWith('ren-'), 'figurinha do próprio conjunto do Ren (' + (stkMsg && stkMsg.stk) + ')');
  await fresh.click('.cm.char.stk .stk-b >> nth=-1'); await fresh.waitForTimeout(100);
  ok(await fresh.isVisible('#modal .stk-svg') && /Figurinha|Risada|Alegria|Empolga|Aprova|Vergonha|Comemora|Surpresa/.test(await fresh.textContent('#modal')), 'tocar na figurinha mostra o significado (japonês, romaji, tradução)');
  await closeModals(fresh);
  const stkCount = await fresh.evaluate(() => { const by = {}; Object.values(__NQ.CHAT.stickers).forEach(s => { by[s.set] = (by[s.set] || 0) + 1; }); return by; });
  ok(['ren', 'aiko', 'yumi', 'takeshi'].every(k => stkCount[k] >= 10) && stkCount.hikari >= 10, 'cada personagem tem o próprio conjunto de figurinhas ' + JSON.stringify(stkCount));
  // figurinhas ficam fora dos desafios
  await fresh.click('[data-act="chatChal"]'); await fresh.click('#modal [data-act="chatScene"][data-id="ren-genki"]'); await fresh.waitForTimeout(100);
  ok(await fresh.evaluate(() => document.querySelector('#stkBtn').disabled), 'durante um desafio, o botão de figurinhas fica desativado');
  await fresh.click('[data-act="chatEnd"]'); await fresh.waitForTimeout(80);
  ok(await fresh.evaluate(() => __NQ.CHAT.state('ren').active.free), 'sair do desafio volta para a conversa livre');

  /* ---------- 8. conversa livre: sem exercício obrigatório, com assuntos e continuidade ---------- */
  const flow = await fresh.evaluate(() => {
    const out = [];
    ['こんにちは', 'genki?', 'genki!', 'へえ', 'www', 'すごい', 'ren wa?', 'un', 'jaa ne'].forEach(t => { const n = __NQ.CHAT.thread('ren').length; const r = __NQ.CHAT.reply('ren', t); out.push([t, r.kind, __NQ.CHAT.thread('ren').slice(n).filter(m => m.from === 'char').length]); });
    return out;
  });
  ok(flow.every(x => x[1] !== 'unknown' && x[2] >= 1), 'conversa livre do dia a dia: todas as mensagens recebem resposta natural ' + JSON.stringify(flow.map(x => x[0] + ':' + x[2])));
  const topics = await fresh.evaluate(() => Object.keys(__NQ.CHAT.state('ren').topics || {}));
  ok(topics.length >= 2, 'o Ren puxa assuntos novos sozinho quando a conversa esfria (' + topics.join(', ') + ')');
  const reps = await fresh.evaluate(() => { const ls = __NQ.CHAT.thread('ren').filter(m => m.from === 'char' && m.jp).map(m => m.jp); const c = {}; ls.forEach(l => { c[l] = (c[l] || 0) + 1; }); return Object.entries(c).filter(([l, n]) => n > 3 && l.length > 6); });
  same(reps, [], 'sem respostas prontas repetidas à exaustão');
  ok(await fresh.evaluate(() => __NQ.S.chat.corrections.length === 0), 'conversa livre com amigo, em registro casual: nenhuma correção');

  /* ---------- 9. Academia, Revisão e Caderno ---------- */
  ok(await fresh.evaluate(() => !__NQ.CHAT.scenesFor('ren').some(s => s.id === 'ren-ima')), 'desafios continuam respeitando o que foi estudado (forma て bloqueada)');
  const sg = await fresh.evaluate(() => { const st = __NQ.CHAT.state('ren'); st.active.ex = 'ren.t.game.1.ex'; return __NQ.CHAT.sugg('ren'); });
  ok(sg.length >= 2 && sg.every(x => x.jp && x.ro && x.pt), 'sugestões de resposta com japonês, romaji e tradução');
  ok(await fresh.evaluate(() => ['kawaii', 'yatta', 'kakkoii', 'wara', 'naruhodo'].every(k => __NQ.ITEM['chat:' + k] && __NQ.CHAT.pack.items.some(i => i.id === 'chat:' + k))), 'expressões novas (かわいい, やった, かっこいい, 笑, なるほど) no pacote do chat');
  await fresh.click('[data-act="chatClose"]'); await fresh.waitForTimeout(120);
  await fresh.click('.tab[data-view="caderno"]'); await fresh.waitForTimeout(100);
  ok(await fresh.isVisible('text=Nihongo Chat · Expressões'), 'Caderno: expressões do chat aparecem com a origem');
  await fresh.click('.tab[data-view="chat"]'); await fresh.waitForTimeout(100);
  await fresh.click('[data-act="startReview"][data-mode="chat"]'); await fresh.waitForTimeout(150);
  ok(await fresh.evaluate(() => __NQ.P && __NQ.P.qs.length >= 1 && __NQ.P.qs.every(q => q.itemId && q.itemId.startsWith('chat:'))), 'Revisão: expressões do chat (inclusive as das figurinhas) entram na revisão');
  await fresh.evaluate(() => { document.querySelector('[data-act="pClose"]').click(); }); await fresh.waitForTimeout(80);
  const ex = await fresh.$('[data-act="pExit"]'); if (ex) await ex.click();

  /* ---------- 10. mensagens espontâneas ---------- */
  const ini = await mk();
  await loadSave(ini, V30);
  const p1 = await ini.evaluate(() => ['ren', 'aiko'].map(id => ({ id, p: __NQ.CHAT.state(id).pending, n: __NQ.CHAT.thread(id).filter(m => m.init).length })));
  ok(p1.some(x => x.p) && p1.every(x => !x.p || String(x.p).startsWith('talk:')), 'mensagem espontânea é um assunto de conversa livre (não um exercício) ' + JSON.stringify(p1));
  await ini.reload(); await closeModals(ini);
  const p2 = await ini.evaluate(() => ['ren', 'aiko'].map(id => __NQ.CHAT.thread(id).filter(m => m.init).length));
  same(p2, p1.map(x => x.n), 'recarregar não cria novas mensagens espontâneas no mesmo dia');
  ok(await ini.evaluate(() => __NQ.CHAT.thread('yumi').length === 0), 'personagem bloqueado não manda mensagem');

  /* ---------- 11. todos os personagens: assuntos e respostas principais funcionam ---------- */
  const all = await mk();
  await loadSave(all, V30);
  await all.evaluate(() => { const S = __NQ.S; __NQ.CATS.forEach(c => { S.catExams[c.id] = { passed: true, best: 100 }; c.lessons.forEach(l => { S.lessons[l.id] = { passed: true, best: 100, attempts: 1 }; }); }); __NQ.setState(S); });
  const walk = await all.evaluate(() => {
    const out = [], T = __NQ.CHAT.talk; let n = 0;
    Object.keys(T).forEach(cid => T[cid].topics.forEach(t => t.steps.forEach((s, i) => {
      if (!s.ex || !s.ex.on) return;
      Object.keys(s.ex.on).forEach(k => {
        const st = __NQ.CHAT.state(cid); st.active = null; st.met = true;
        const probe = { yes: cid === 'aiko' || cid === 'takeshi' ? 'はい' : 'うん', no: cid === 'aiko' || cid === 'takeshi' ? 'いいえ' : 'ううん', same: 'わたしも', laugh: 'www', praise: 'すごい', ack: 'へえ', surprise: 'ほんとう？', good: 'げんき', bad: 'げんきじゃない', tired: 'つかれた', sleepy: 'ねむい', hungry: 'おなか すいた', ilike: 'アニメが すき', dislike: 'きらい', some: 'ときどき', okay: 'りょうかい', decline: 'ちょっと…', yay: 'やった', congrats: 'おめでとう', question: 'どんな アニメ？', why: 'なんで？', dontknow: 'わからない', want: 'たべたい', thanks: 'ありがとう', nice: 'よろしく', greet: 'こんにちは', price: 'いくらですか', browsing: 'みて いる だけです', shy: 'はずかしい', studying: 'にほんごを べんきょうしてる', meh: 'まあまあ', hard: 'むずかしい', bye: 'じゃあね', sympathy: 'ざんねん' }[k];
        if (!probe) { out.push('sem frase de teste: ' + k); return; }
        const r0 = __NQ.CHAT.reply; const s2 = __NQ.CHAT.state(cid); s2.active = { free: true, n: 5, ex: s.ex.__id, topic: null, step: 0, ctx: {}, tags: [], fb: {}, fbAt: -99, lull: 0, miss: 0 };
        const before = __NQ.CHAT.thread(cid).length; const r = r0(cid, probe); n++;
        const added = __NQ.CHAT.thread(cid).slice(before);
        if (r.kind === 'unknown' || !added.some(m => m.from === 'char')) out.push(cid + '/' + t.id + '/' + k + ': “' + probe + '” → ' + r.kind + ' ' + r.intent);
      });
    })));
    return { out, n };
  });
  same(walk.out, [], 'todas as ramificações dos assuntos respondem à intenção esperada (' + walk.n + ' respostas testadas)');
  const opens = await all.evaluate(() => ['ren', 'aiko', 'yumi', 'takeshi'].map(id => { const st = __NQ.CHAT.state(id); st.met = false; st.active = null; chatOpen(id); const ok = __NQ.CHAT.state(id).active.topic === 'intro' && __NQ.CHAT.thread(id).some(m => m.from === 'char'); chatClose(); return id + ':' + ok; }));
  same(opens, ['ren:true', 'aiko:true', 'yumi:true', 'takeshi:true'], 'os quatro personagens se apresentam pela conversa livre');
  const tame = await all.evaluate(() => { const st = __NQ.CHAT.state('yumi'); st.active = { free: true, n: 3, ex: 'yumi.t.intro.1.ex', topic: null, step: 0, ctx: {}, tags: [], fb: {}, fbAt: -99, lull: 0, miss: 0 }; delete __NQ.S.chat.facts['yumi:tame']; __NQ.CHAT.reply('yumi', 'うん、いいよ！'); return !!__NQ.S.chat.facts['yumi:tame'] && __NQ.CHAT.want('yumi', null) === 'c'; });
  ok(tame, 'Yumi: aceitar a タメ口 muda a relação (ela passa a esperar a forma casual)');
  const tk = await all.evaluate(() => { const st = __NQ.CHAT.state('takeshi'); st.active = null; st.met = true; const n = __NQ.CHAT.thread('takeshi').length; __NQ.CHAT.reply('takeshi', 'genki desu ka'); return __NQ.CHAT.thread('takeshi').slice(n); });
  ok(tk.some(m => m.kind === 'tip' && /おかげさまで/.test(m.jp)), 'Takeshi explica a formalidade na prática (nota sobre おかげさまで)');

  /* ---------- 12. telas pequenas ---------- */
  const small = await mk({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await loadSave(small, V40);
  await small.click('.tab[data-view="chat"]'); await small.waitForTimeout(150);
  let w = await small.evaluate(() => document.documentElement.scrollWidth);
  ok(w <= 320, 'lista de conversas sem rolagem horizontal em 320px (' + w + ')');
  await small.click('[data-act="chatOpen"][data-id="ren"]'); await small.waitForTimeout(150);
  await small.click('#stkBtn'); await small.waitForTimeout(100);
  w = await small.evaluate(() => Math.max(document.documentElement.scrollWidth, document.querySelector('.chat-log').scrollWidth, document.querySelector('.chat-foot').scrollWidth));
  ok(w <= 320, 'conversa com figurinhas abertas sem rolagem horizontal em 320px (' + w + ')');
  const fit = await small.evaluate(() => { const r = document.querySelector('#chatIn').getBoundingClientRect(), g = document.querySelector('.stk-grid').getBoundingClientRect(); return r.bottom <= innerHeight && r.width >= 100 && g.height > 60; });
  ok(fit, 'campo de mensagem e figurinhas visíveis e confortáveis em 320px');
  await small.click('[data-act="chatStkSend"][data-id="hikari-joy"]'); await small.waitForTimeout(120);
  w = await small.evaluate(() => document.querySelector('.chat-log').scrollWidth);
  ok(w <= 320, 'figurinhas no histórico sem rolagem horizontal (' + w + ')');

  same(errors, [], 'sem erros de JavaScript');
  await browser.close();
  console.log(fails ? '\n' + fails + ' FALHA(S)' : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
