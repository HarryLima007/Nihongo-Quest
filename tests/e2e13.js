const { chromium } = require('playwright');
/* Testes da 12.0.0 — Expansão de vocabulário: migração do save da 11.0 (com backup, idempotente), Academia de
   Vocabulário (categorias, lições, ciclo descobrir → praticar, só palavras ensinadas, XP só na 1ª aprovação, teto
   diário da revisão), integração com Revisão, Caderno, Início e Dicionário 2.0 (partículas, leituras de kanji,
   busca inteligente), aluno novo e telas de 360px. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V11 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v11.0-save.json'), 'utf8'));
Object.values(V11.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
  const mk = async () => { const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; window.__toasts = []; document.addEventListener('DOMContentLoaded', () => { const t = document.querySelector('#toasts'); if (t) new MutationObserver(() => window.__toasts.push(t.textContent)).observe(t, { childList: true, subtree: true }); }); }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"], #modal [data-act="dictClose"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  /* responde a questão atual do painel de vocabulário (certo ou errado) */
  const answer = (page, right) => page.evaluate(right => {
    const q = VV.qs[VV.qi], c = s => document.querySelector('#player ' + s).click();
    if (q.t === 'pares') {
      if (right) q.L.forEach(o => { c(`[data-act="vcPair"][data-side="l"][data-i="${o.i}"]`); c(`[data-act="vcPair"][data-side="r"][data-i="${o.i}"]`); });
      else { const n = q.L.length; for (let k = 0; k < n; k++) { if (VV.answered) break; const l = VV.pairs.done.length; const i = q.L.find(o => !VV.pairs.done.includes(o.i)).i; const j = q.R.find(o => o.i !== i && !VV.pairs.done.includes(o.i)); c(`[data-act="vcPair"][data-side="l"][data-i="${i}"]`); c(`[data-act="vcPair"][data-side="r"][data-i="${j ? j.i : i}"]`); if (VV.pairs.done.length === l && !j) break; } q.L.forEach(o => { if (!VV.answered && !VV.pairs.done.includes(o.i)) { c(`[data-act="vcPair"][data-side="l"][data-i="${o.i}"]`); c(`[data-act="vcPair"][data-side="r"][data-i="${o.i}"]`); } }); }
      return;
    }
    if (q.t === 'montar') {
      const used = [];
      if (right) q.tiles.forEach(t => { const i = q.bank.findIndex((b, k) => b.t === t && !used.includes(k)); used.push(i); c(`[data-act="vcBuild"][data-i="${i}"]`); });
      else c(`[data-act="vcBuild"][data-i="${q.bank.findIndex(b => b.t !== q.tiles[0])}"]`);
    } else {
      const i = q.opts.findIndex(o => right ? o.ok : !o.ok); c(`[data-act="vcOpt"][data-i="${i}"]`);
    }
    c('[data-act="vcCheck"]');
  }, right);
  const runQuiz = async (page, right = true) => {
    for (let k = 0; k < 40 && await page.evaluate(() => VV && VV.mode === 'quiz'); k++) {
      if (!(await page.evaluate(() => VV.answered))) await answer(page, typeof right === 'function' ? right(k) : right);
      await page.click('#player [data-act="vcNextQ"]');
    }
  };
  const raw = JSON.stringify(V11);
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);

  /* ---------- 1. migração 11.0 -> 12.0 ---------- */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 14 && S.appVersion === '16.0.0', '11.0: migrado para o esquema 12 (versão 12.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema11') === r, raw), 'backup do save 11.0 guardado (nihongoQuest:backup:schema11) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict', 'world', 'lacad', 'read', 'rpg', 'settings', 'profile', 'discoveries', 'listening'].forEach(k => ok(JSON.stringify(k === "dict" && S[k] ? { fav: S[k].fav, recent: S[k].recent } : S[k]) === JSON.stringify(k === "dict" && V11[k] ? { fav: V11[k].fav, recent: V11[k].recent } : V11[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.journey.claimed) === JSON.stringify(V11.journey.claimed), 'preservado: recompensas únicas da jornada');
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V11.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V11.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(S.rpg.coins === V11.rpg.coins && JSON.stringify(S.rpg.inv) === JSON.stringify(V11.rpg.inv) && JSON.stringify(S.rpg.quests) === JSON.stringify(V11.rpg.quests), 'preservado: aventura (moedas, itens e missões)');
  ok(S.vocab && S.vocab.v === 1 && !Object.keys(S.vocab.lessons).length && !Object.keys(S.vocab.exams).length, 'Academia de Vocabulário criada vazia (nada aprovado na migração)');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 14, 'save regravado no esquema 12');
  // idempotente: recarregar não muda nada; migrar de novo um save já com progresso não apaga o vocabulário
  await page.reload(); await closeModals(page);
  const S2 = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S2.xp === S.xp && S2.coins === S.coins && JSON.stringify(S2.items) === JSON.stringify(S.items) && JSON.stringify(S2.vocab) === JSON.stringify(S.vocab), 'recarregar não altera o save (migração idempotente)');
  const reMig = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(__NQ.S)); s.vocab.lessons.vfo1 = { passed: true, best: 100, attempts: 1 }; s.schemaVersion = 11; const n = normalize(s); return { v: n.schemaVersion, kept: !!(n.vocab.lessons.vfo1 && n.vocab.lessons.vfo1.passed), xp: n.xp === s.xp }; });
  ok(reMig.v === 14 && reMig.kept && reMig.xp, 'migrar de novo não apaga o progresso de vocabulário ' + JSON.stringify(reMig));
  ok(await page.evaluate(() => !!localStorage.getItem('nihongoQuest:backup:schema11')), 'backup continua guardado');

  /* ---------- 2. Academia → Palavras ---------- */
  await page.click('.tab[data-view="academia"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.mode-switch.five [data-mode="vc"]'), 'Academia: aba “Palavras” ao lado de Academia, Listening, Leitura e Treinos');
  await page.click('.mode-switch [data-mode="vc"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.vc-hero'), 'Academia de Vocabulário aberta');
  const cats = await page.$$eval('.vc-cat', b => b.length);
  ok(cats === 20, '20 categorias (' + cats + ')');
  const info = await page.evaluate(() => ({ words: new Set(VC_LESSONS.flatMap(L => L.W.map(w => w.id))).size, lessons: VC_LESSONS.length, sizes: VC_LESSONS.every(L => L.W.length >= 5 && L.W.length <= 10), ids: new Set(VC_LESSONS.map(L => L.id)).size === VC_LESSONS.length, cats: VOCAB_CATS.map(c => c.id) }));
  ok(info.words >= 600 && info.lessons >= 80, info.words + ' palavras em ' + info.lessons + ' lições');
  ok(info.sizes && info.ids, 'lições de 5 a 10 palavras, ids únicos');
  ok(['formas', 'animais', 'roupas', 'casa', 'adverbios'].every(c => info.cats.includes(c)), 'lacunas do audit da 11.0 cobertas (formas, animais, roupas, casa, advérbios)');
  ok(await page.evaluate(() => !vcLessonUnlocked(VC_L.vfo2) && vcLessonUnlocked(VC_L.vfo1) && vcLessonUnlocked(VC_C.animais.lessons[0])), 'lições em sequência dentro da categoria; todas as categorias abertas');

  /* ---------- 3. lição: descobrir → praticar ---------- */
  await page.click('.vc-cat[data-id="formas"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('[data-act="vcLesson"][data-id="vfo1"]'), 'categoria mostra as lições');
  const xp0 = await page.evaluate(() => __NQ.S.xp), c0 = await page.evaluate(() => __NQ.S.coins);
  await page.click('[data-act="vcLesson"][data-id="vfo1"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.vc-pane'), 'lição abre no painel');
  let cards = 0;
  while (await page.isVisible('#player [data-act="vcNext"]') && cards < 20) { await page.click('#player [data-act="vcNext"]'); cards++; }
  const seen = await page.evaluate(() => VC_L.vfo1.W.every(w => __NQ.S.items[w.id] && __NQ.S.items[w.id].seen));
  ok(cards >= 6 && seen, 'cartões de descoberta (' + cards + ') marcam as palavras como vistas');
  await page.click('#player [data-act="vcPrev"]'); await page.waitForTimeout(60);
  await page.evaluate(() => { __spoken.length = 0; }); await page.click('#player .rd-audio [data-act="vcSay"]'); await page.waitForTimeout(120);
  ok(await page.evaluate(() => __spoken.length > 0), 'áudio das palavras toca (' + await page.evaluate(() => JSON.stringify(__spoken)) + ')');
  await page.click('#player [data-act="vcNext"]');
  await page.click('#player [data-act="vcQuiz"]'); await page.waitForTimeout(80);
  const qinfo = await page.evaluate(() => { const allowed = new Set(VC_L.vfo1.W.map(w => w.id)); const types = VV.qs.map(q => q.t); const bad = VV.qs.filter(q => q.opts && q.opts.length < 2 || q.opts && q.opts.filter(o => o.ok).length !== 1).length; const outside = VV.qs.filter(q => q.itemId && !allowed.has(q.itemId)).length; const optsOut = VV.qs.filter(q => q.opts && q.opts.some(o => o.jp && !VC_L.vfo1.W.some(w => w.jp === o.t))).length; return { types, bad, outside, optsOut }; });
  ok(qinfo.bad === 0 && qinfo.outside === 0 && qinfo.optsOut === 0, 'exercícios válidos e só com palavras ensinadas ' + JSON.stringify(qinfo));
  ok(new Set(qinfo.types).size >= 5, 'exercícios variados (' + [...new Set(qinfo.types)].join(', ') + ')');
  await runQuiz(page, true);
  const r1 = await page.evaluate(() => ({ mode: VV.mode, pct: VV.pct, gain: VV.gain, passed: __NQ.S.vocab.lessons.vfo1 && __NQ.S.vocab.lessons.vfo1.passed, xp: __NQ.S.xp, coins: __NQ.S.coins }));
  ok(r1.mode === 'result' && r1.pct === 100 && r1.passed, 'lição aprovada com 100%');
  ok(r1.gain === 20 && r1.xp - xp0 >= 20 && r1.coins - c0 >= 3, 'primeira aprovação: +20 XP (15 + 5 perfeita) e moedas');
  ok(await page.evaluate(() => vcLessonUnlocked(VC_L.vfo2)), 'próxima lição liberada');
  // repetir não dá XP de novo
  await page.click('#player [data-act="vcRetry"]'); await page.waitForTimeout(60);
  await runQuiz(page, true);
  const r2 = await page.evaluate(() => ({ gain: VV.gain, xp: __NQ.S.xp }));
  ok(r2.gain === 0 && r2.xp === r1.xp, 'repetir a lição não dá XP de novo (sem farming) ' + JSON.stringify([r1, r2]));
  ok((await page.textContent('#player')).includes('já foi ganho'), 'resultado explica que o XP já foi ganho');
  await page.click('#player [data-act="vcClose"]'); await page.waitForTimeout(80);

  /* ---------- 4. reprovação → Revisão ---------- */
  await page.evaluate(() => vcStartLesson('vfo2')); await page.waitForTimeout(60);
  await page.evaluate(() => vcBeginQuiz()); await page.waitForTimeout(40);
  const xpF = await page.evaluate(() => __NQ.S.xp);
  await runQuiz(page, false);
  const rf = await page.evaluate(() => ({ passed: !!(__NQ.S.vocab.lessons.vfo2 && __NQ.S.vocab.lessons.vfo2.passed), gain: VV.gain, xp: __NQ.S.xp, wrong: VV.wrong.length, next: vcLessonUnlocked(VC_L.vfo3) }));
  ok(!rf.passed && rf.gain === 0 && rf.xp === xpF && !rf.next, 'reprovado: sem XP e a próxima lição continua fechada');
  ok(await page.evaluate(() => VC_L.vfo2.W.some(w => __NQ.S.items[w.id] && __NQ.S.items[w.id].w > 0 && __NQ.S.items[w.id].lastOk === false)), 'palavras erradas registradas para a Revisão');
  await page.click('#player [data-act="vcClose"]'); await page.waitForTimeout(60);

  /* ---------- 5. revisão de vocabulário: XP com teto diário ---------- */
  const xpR = await page.evaluate(() => __NQ.S.xp);
  let revGain = 0;
  for (let k = 0; k < 4; k++) {
    await page.evaluate(() => vcStartReview()); await page.waitForTimeout(40);
    ok(await page.evaluate(() => VV && VV.qs.length >= 3 && VV.qs.every(q => !q.itemId || q.itemId.startsWith('vc:'))), 'revisão ' + (k + 1) + ': só palavras do vocabulário já vistas');
    await runQuiz(page, true);
    revGain += await page.evaluate(() => VV.gain || 0);
    await page.click('#player [data-act="vcClose"]'); await page.waitForTimeout(40);
  }
  const xpR2 = await page.evaluate(() => __NQ.S.xp);
  ok(revGain <= 20 && xpR2 - xpR <= 20 + 5, 'revisão: XP limitado a 20 por dia (' + revGain + ')');

  /* ---------- 6. integrações: Revisão geral, Caderno, Início, conquista ---------- */
  const gq = await page.evaluate(() => { const ids = Object.keys(__NQ.S.items).filter(id => id.startsWith('vc:')); return ids.map(id => { const q = genItemQ(__NQ.ITEM[id]); return q && q.options && q.options.length >= 2 && q.options.filter(o => o.correct).length === 1; }); });
  ok(gq.length >= 5 && gq.every(Boolean), 'Revisão geral gera perguntas válidas para as palavras novas (' + gq.length + ')');
  ok(await page.evaluate(() => originOf(__NQ.ITEM[VC_L.vfo1.W[0].id]).includes('Vocabulário')), 'origem “Academia de Vocabulário” nas palavras');
  ok(await page.evaluate(() => itemSource(__NQ.ITEM[VC_L.vfo1.W[0].id]) === 'outro'), 'palavras de vocabulário não entram nas avaliações da Academia principal');
  ok(await page.evaluate(() => nqKnownWords().some(w => String(w.id).startsWith('vc:'))), 'palavras aprendidas chegam ao Adventure Mode (nqKnownWords)');
  ok(await page.evaluate(() => !!__NQ.S.achievements.vc_first), 'conquista “Primeiras palavras”');
  await page.click('.tab[data-view="revisao"]'); await page.waitForTimeout(100);
  ok((await page.textContent('#view')).includes('Vocabulário'), 'Revisão: atalho para a revisão de vocabulário');
  await page.click('.tab[data-view="caderno"]'); await page.waitForTimeout(150);
  ok((await page.textContent('#view')).includes(await page.evaluate(() => VC_L.vfo1.W[0].jp)), 'Caderno mostra as palavras estudadas');
  await page.evaluate(() => { location.hash = 'inicio'; }); await page.waitForTimeout(200);
  ok((await page.$$eval('.nq-tiles .nq-tn', t => t.map(x => x.textContent))).includes('Vocabulário'), 'Início: Vocabulário em “Sua jornada”');
  await page.click('.nq-tile[data-act="gotoVocab"]'); await page.waitForTimeout(120);
  ok(await page.isVisible('.vc-hero'), 'bloco abre a Academia de Vocabulário');

  /* ---------- 7. Dicionário 2.0 ---------- */
  const d = await page.evaluate(() => {
    dictBuild();
    const parts = DICT.list.filter(e => e.particle).map(e => e.jp);
    const top = q => dictSearch(q).slice(0, 3).map(e => e.jp);
    return { parts, wa: dictSearch('wa')[0], ha: dictSearch('は')[0], part: top('particula'), kado: top('角'), sq: top('quadrado'), chifre: top('chifre'), tsuno: top('つの'), prof: top('professora'), sug: dictSearch('geladera').length === 0 ? dictSuggest('geladera') : null, dupl: (() => { const m = {}; DICT.list.forEach(e => { const k = e.jp + '|' + e.kana; m[k] = (m[k] || 0) + 1; }); return Object.values(m).filter(n => n > 1).length; })(), multi: DICT.list.filter(e => e.pt && e.pt.length > 1).length, n: DICT.list.length };
  });
  ok(['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'の', 'も', 'か', 'から', 'まで', 'よ', 'ね'].every(p => d.parts.includes(p)) && d.parts.length >= 14, '14 partículas no Dicionário (e as da 14.0)');
  ok(d.wa && d.wa.particle && d.wa.jp === 'は' && d.ha && d.ha.particle, '“wa” e “は” acham a partícula は primeiro');
  ok(d.part.length >= 3, '“partícula” lista as partículas');
  ok(d.kado[0] === '角' && d.sq.includes('四角') && d.chifre.includes('角') && d.tsuno.includes('角'), 'quadrado → 四角, chifre/つの → 角, 角 com várias leituras ' + JSON.stringify([d.kado, d.sq, d.chifre, d.tsuno]));
  ok(d.prof.includes('先生'), 'forma feminina: “professora” acha 先生');
  ok(Array.isArray(d.sug) ? d.sug.length > 0 : !!d.sug, 'sem resultado: sugestões “Você quis dizer…”');
  ok(d.dupl === 0, 'nenhuma entrada duplicada no Dicionário (' + d.n + ' entradas)');
  ok(d.multi >= 200 && d.n >= 1900, 'entradas com vários sentidos / dicionário ampliado (' + d.n + ')');
  await page.evaluate(() => { location.hash = 'dicionario'; }); await page.waitForTimeout(200);
  await page.fill('#dictSearch', '角'); await page.waitForTimeout(400);
  const kTxt = await page.textContent('#view');
  ok(/かど/.test(kTxt) && /つの/.test(kTxt) && /かく/.test(kTxt), 'kanji 角: leituras em contexto (かど, つの, かく)');
  await page.fill('#dictSearch', 'wa'); await page.waitForTimeout(400);
  await page.click('#view .d-row [data-act="dictOpen"]'); await page.waitForTimeout(200);
  const pTxt = await page.textContent('body');
  ok(/wa/.test(pTxt) && /tópico/i.test(pTxt), 'ficha da partícula は explica o uso (tópico) com exemplos');
  await closeModals(page);

  /* ---------- 8. Mundo: novas situações ---------- */
  const wNew = await page.evaluate(() => ['m5', 'm6', 'g5', 'v5'].every(id => WORLD_SCENES.some(s => s.id === id)));
  ok(wNew, 'Mundo: provar roupa, farmácia, zoológico e templo');
  ok(await page.evaluate(() => READ_COURSE.find(s => s.id === 'fra').lessons.some(l => l.id === 'f8')), 'Leitura: nova leitura com o vocabulário novo');
  ok(await page.evaluate(() => TALK.yumi.topics.some(t => t.id === 'zoo')), 'Chat: novo assunto da Yumi (zoológico)');

  /* ---------- 9. persistência + novidade única ---------- */
  await page.waitForTimeout(5400);
  ok((await page.evaluate(() => window.__toasts.join(' '))).includes('Novo na 16.0'), 'aviso de novidades da 12.0 para quem já usava o app');
  await page.evaluate(() => saveNow()); await page.reload(); await closeModals(page); await page.waitForTimeout(5600);
  ok(!(await page.evaluate(() => window.__toasts.join(' '))).includes('Novo na 15.0'), 'aviso não se repete');
  ok(await page.evaluate(() => __NQ.S.vocab.lessons.vfo1.passed && __NQ.S.schemaVersion === 14), 'progresso de vocabulário salvo após recarregar');

  /* ---------- 10. 360px ---------- */
  const wide = async label => { const o = await page.evaluate(() => { const w = document.documentElement.clientWidth; const bad = [...document.querySelectorAll('#view .card, #view .btn, #view h1, #view h2, #view .vc-cat, #player .btn, #player .opt')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > w + 1 || r.left < -1); }).length; return { sw: document.documentElement.scrollWidth, bad }; }); ok(o.sw <= 360 && o.bad === 0, '360px sem rolagem lateral: ' + label + ' ' + JSON.stringify(o)); };
  await page.evaluate(() => { __NQ.S.settings.academyMode = 'vc'; VCUI.cat = null; location.hash = 'academia'; render(); }); await page.waitForTimeout(150); await wide('Academia de Vocabulário');
  await page.click('.vc-cat[data-id="profissoes"]'); await page.waitForTimeout(100); await wide('categoria');
  await page.evaluate(() => vcStartLesson(VC_C.profissoes.lessons[0].id)); await page.waitForTimeout(80); await wide('cartão de palavra');
  await page.evaluate(() => vcBeginQuiz()); await page.waitForTimeout(60); await wide('exercício');
  await page.click('#player [data-act="vcClose"]'); await page.waitForTimeout(60);
  await page.evaluate(() => { location.hash = 'dicionario'; }); await page.waitForTimeout(200); await wide('Dicionário');

  /* ---------- 11. aluno novo ---------- */
  const pn = await mk();
  await pn.goto(URL); await pn.evaluate(() => localStorage.clear()); await pn.reload(); await pn.waitForTimeout(300);
  ok(await pn.evaluate(() => __NQ.S.schemaVersion === 14 && __NQ.S.vocab && __NQ.S.vocab.v === 1 && __NQ.S.xp === 0), 'aluno novo: esquema 12, vocabulário vazio, sem XP indevido');

  ok(errors.length === 0, 'sem erros no console ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK');
  process.exit(fails ? 1 : 0);
})();
