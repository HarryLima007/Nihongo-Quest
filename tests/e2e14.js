const { chromium } = require('playwright');
/* Testes da 13.0.0 — Learning Intelligence: migração do save real da 12.0 (backup, idempotente, reversível), Central
   de Aprendizagem (estágios apresentado/estudado/lembrado/dominado, palavra única entre áreas, encontros em contexto),
   Revisão inteligente 2.0 (só conteúdo ensinado, sem repetir a mesma palavra, formatos variados, foco por habilidade),
   recomendações, Painel de progresso, avaliações (inicial adaptativa sem mexer no progresso, por área, prova de
   etapa, sem XP duplicado), Dicionário (formas conjugadas, seu aprendizado), prática de fala, aluno novo e 360px. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V12 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v12.0-save.json'), 'utf8'));
Object.values(V12.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
async function answer(page, correct) {
  const q = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.P.qs[__NQ.P.i])));
  if (q.type === 'listen' || q.type === 'mc') {
    let i = q.options.findIndex(o => o.correct); if (!correct) i = q.options.findIndex(o => !o.correct);
    await page.click(`#player [data-act="opt"][data-i="${i}"]`); await page.click('#player [data-act="check"]');
  } else if (q.type === 'num_type') { await page.fill('#numInput', String(correct ? q.answer : q.answer + 1)); await page.click('#player [data-act="check"]'); }
  else if (q.type === 'build') { const order = correct ? q.answer : q.answer.slice().reverse(); const used = new Set(); for (const tok of order) { const i = q.bank.findIndex((t, k) => t.jp === tok && !used.has(k)); used.add(i); await page.click(`#player [data-act="build"][data-i="${i}"]`); } await page.click('#player [data-act="check"]'); }
  else if (q.type === 'error') { await page.click(`#player [data-act="opt"][data-i="${correct ? q.wrong : (q.wrong ? 0 : 1)}"]`); await page.click('#player [data-act="check"]'); }
  else if (q.type === 'match') { for (let i = 0; i < q.items.length; i++) { await page.click(`#player [data-act="mL"][data-i="${i}"]`); await page.click(`#player [data-act="mR"][data-i="${i}"]`); } }
  await page.click('#player [data-act="next"]');
}
async function runQuiz(page, f = () => true) { let n = 0; while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'quiz') && n < 80) await answer(page, f(n++)); return n; }
const noScroll = page => page.evaluate(() => { const sw = document.documentElement.clientWidth; const bad = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > sw + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.confetti,.filters,.conv-sub,.ln-chips,.stage-tabs,.d-segs,.mode-switch,.seg,.act-chart,.nq-tiles,.ln-weeks,.ln-evo,[style*="overflow"]'); }); return { sw: document.documentElement.scrollWidth, bad: bad.length, el: bad.slice(0, 3).map(e => e.className + '<' + (e.parentElement && e.parentElement.className)) }; });

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async () => { const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(400); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"], #modal [data-act="dictClose"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const raw = JSON.stringify(V12);
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);

  /* ---------- 1. migração 12.0 -> 13.0 ---------- */
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 13 && S.appVersion === '13.0.0', '12.0: migrado para o esquema 13 (versão 13.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema12') === r, raw), 'backup do save 12.0 guardado (nihongoQuest:backup:schema12) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict', 'world', 'lacad', 'read', 'rpg', 'vocab', 'settings', 'profile', 'discoveries', 'listening', 'log'].forEach(k => ok(JSON.stringify(S[k]) === JSON.stringify(V12[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.journey.claimed) === JSON.stringify(V12.journey.claimed), 'preservado: recompensas únicas da jornada');
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V12.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V12.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(S.learn && S.learn.v === 1 && S.learn.bf === 1, 'Central de Aprendizagem criada e histórico antigo aproveitado (bf=1)');
  const hN = Object.keys(S.learn.h).length, histIds = new Set(V12.history.filter(h => h.id).map(h => h.id)).size;
  ok(hN > 0 && hN <= histIds, 'histórico curto reconstruído do histórico salvo (' + hN + ' itens de ' + histIds + ')');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 13, 'save regravado no esquema 13');
  await page.reload(); await closeModals(page);
  const S2 = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S2.xp === S.xp && S2.coins === S.coins && JSON.stringify(S2.items) === JSON.stringify(S.items) && JSON.stringify(S2.learn.h) === JSON.stringify(S.learn.h), 'recarregar não altera o save (migração idempotente, sem duplicar histórico)');
  const rev = await page.evaluate(r => { const s = JSON.parse(JSON.stringify(__NQ.S)), o = JSON.parse(r); delete s.learn; delete s.migratedFrom13; ['schemaVersion', 'appVersion', 'updatedAt'].forEach(k => { delete s[k]; delete o[k]; }); const ks = new Set(Object.keys(s).concat(Object.keys(o))); return [...ks].filter(k => JSON.stringify(s[k]) !== JSON.stringify(o[k])); }, raw);
  ok(rev.length === 0, 'reversível: sem S.learn o save é exatamente o da 12.0 ' + JSON.stringify(rev));
  const reMig = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(__NQ.S)); s.schemaVersion = 12; const n = normalize(s); return n.schemaVersion === 13 && JSON.stringify(n.learn.h) === JSON.stringify(s.learn.h); });
  ok(reMig, 'migrar de novo um save que já tem a Central não apaga nada');

  /* ---------- 2. Central: estágios, palavra única, encontros ---------- */
  const st = await page.evaluate(() => {
    const id = Object.keys(ITEM).find(k => ITEM[k].lesson && ITEM[k].lesson.id === 'c4l1' && !__NQ.S.items[k]);
    const r = n => lnUnitOf(id).stage, out = {};
    const DAY = 864e5, realNow = Date.now;
    out.novo = r();
    markSeen(id); out.apresentado = r();
    recordAnswer(id, true, 'review:rev'); out.um = r(); // uma resposta certa NÃO é domínio
    recordAnswer(id, true, 'review:rev'); out.mesmoDia = r();
    const nd = () => { __NQ.S.items[id].ld = 'x'; }; try { Date.now = () => realNow() + DAY; nd(); recordAnswer(id, true, 'review:rev'); out.dia2 = r(); Date.now = () => realNow() + 2 * DAY; nd(); recordAnswer(id, true, 'review:rev'); out.dia3 = r(); out.box = __NQ.S.items[id].box; out.d = __NQ.S.items[id].d; Date.now = () => realNow() + 3 * DAY; nd(); recordAnswer(id, false, 'review:rev'); out.erro = r(); out.rec = lnRecovering(lnUnitOf(id)); out.review = lnNeedsReview(lnUnitOf(id)); out.keep = __NQ.S.items[id].c; } finally { Date.now = realNow; }
    out.h = (__NQ.S.learn.h[id] || []).length;
    // mesma palavra em duas áreas = uma unidade
    const cl = Object.values(nqClusters()).find(ids => ids.length >= 2 && ids.some(x => ITEM[x].lesson && ITEM[x].lesson.vc));
    if (cl) { cl.forEach(x => markSeen(x)); const keys = new Set(lnUnits().filter(u => u.ids.some(i => cl.includes(i))).map(u => u.key)); out.cluster = keys.size; out.cl = cl; }
    // caractere: あ da Academia e あ da Leitura são o mesmo conteúdo
    const a1 = Object.keys(ITEM).find(k => ITEM[k].jp === 'あ' && ITEM[k].lesson && ITEM[k].lesson.kind === 'kana'), a2 = Object.keys(ITEM).find(k => ITEM[k].jp === 'あ' && ITEM[k].rdType === 'char');
    out.chars = a1 && a2 && lnUnitMap().of[a1] === lnUnitMap().of[a2];
    out.dom = lnUnitOf(a1).dom;
    return out;
  });
  ok(st.novo === 'novo' && st.apresentado === 'apresentado', 'estágios: novo → apresentado (só viu na teoria)');
  ok(st.um === 'estudado' && st.mesmoDia === 'estudado', 'uma resposta certa (ou várias no mesmo dia) = estudado, não domínio');
  ok(st.dia2 === 'lembrado', 'acertou em 2 dias diferentes = lembrado');
  ok(st.dia3 === 'dominado' && st.box >= 3 && st.d >= 3, 'dominado só com acertos em 3 dias e intervalos crescentes (caixa ' + st.box + ')');
  ok(st.erro === 'estudado' && st.rec && st.review && st.keep === 4, 'errar não apaga: acertos mantidos, conteúdo vai para “recuperar” e para a revisão');
  ok(st.h === 5, 'histórico curto por item registrado (' + st.h + ')');
  ok(st.cluster === 1, 'a mesma palavra em áreas diferentes conta como uma unidade ' + JSON.stringify(st.cl));
  ok(st.chars && st.dom === 'hiragana', 'あ da Academia e da Leitura são o mesmo conteúdo (hiragana)');
  const enc = await page.evaluate(() => {
    const w = WORLD_SCENES.find(sc => sc.words.some(k => WW[k] && ITEM[WW[k].itemId]));
    const k = w.words.find(k => WW[k] && ITEM[WW[k].itemId]), id = WW[k].itemId;
    markSeen(id);
    lnExposeKnown([id], 'mundo');
    recordAnswer(Object.keys(ITEM).find(x => x.startsWith('chat:')), true, 'chat');
    const u = lnUnitOf(id);
    return { mundo: !!(u.areas & LN_AREAS.mundo), chatDom: __NQ.S.learn.days[dayKey()].conversacao };
  });
  ok(enc.mundo, 'encontrar a palavra no Mundo fica registrado como encontro (sem contar acerto)');
  ok(enc.chatDom && enc.chatDom[0] >= 1, 'Chat alimenta a habilidade Conversação');

  /* ---------- 3. Revisão inteligente 2.0 ---------- */
  await page.click('.tab[data-view="revisao"]'); await page.waitForTimeout(150);
  ok(await page.isVisible('.ln-smart [data-mode="smart"]'), 'Revisão: “Revisão inteligente” no topo');
  ok(await page.$$eval('.ln-chips .ln-chip', b => b.length) >= 9, 'revisão focada: erros, antigos, vocabulário, kanji, gramática, partículas, expressões, escuta e leitura');
  ok(await page.isVisible('[data-mode="due"]') && await page.isVisible('[data-mode="hard"]'), 'revisões de sempre continuam disponíveis');
  await page.click('.ln-smart [data-mode="smart"]'); await page.waitForTimeout(150);
  const sm = await page.evaluate(() => { const P = __NQ.P, keys = P.qs.filter(q => q.itemId).map(q => lnUnitMap().of[q.itemId]); const untaught = P.qs.filter(q => q.itemId && !(__NQ.S.items[q.itemId] && __NQ.S.items[q.itemId].seen)).length; const exBad = P.qs.filter(q => q.exId && !lessonPassed(q.exId.split('#')[0]) && !__NQ.S.exStats[q.exId]).length; return { n: P.qs.length, dup: keys.length - new Set(keys).size, untaught, exBad, fmts: [...new Set(P.qs.map(q => q.fmt))], doms: [...new Set(P.qs.map(q => q.dom))], xp: __NQ.S.xp, h: JSON.stringify(__NQ.S.learn.h).length }; });
  ok(sm.n >= 6, 'sessão com ' + sm.n + ' perguntas');
  ok(sm.dup === 0, 'a mesma palavra não se repete na sessão');
  ok(sm.untaught === 0 && sm.exBad === 0, 'só conteúdo já ensinado (itens vistos e exercícios de lições aprovadas)');
  ok(sm.fmts.length >= 2, 'formatos variados (' + sm.fmts.join(', ') + ')');
  ok(sm.doms.length >= 2, 'mistura habilidades (' + sm.doms.join(', ') + ')');
  const nq = await runQuiz(page, n => n % 4 !== 1);
  const after = await page.evaluate(() => ({ phase: __NQ.P.phase, xp: __NQ.S.xp, gain: __NQ.P && sessionGain ? sessionGain.xp : 0, c: __NQ.P.correct, g: __NQ.P.graded, h: JSON.stringify(__NQ.S.learn.h).length, change: !!document.querySelector('#player .ln-change') }));
  ok(after.phase === 'result' && after.change, 'resultado mostra “O que mudou” nos estágios');
  ok(after.h > sm.h, 'respostas da revisão entram na Central');
  ok(after.gain === after.c * 6 + (after.g - after.c) * 1, 'XP da revisão igual ao de sempre (6 por acerto, sem duplicar): +' + after.gain);
  await page.click('#player [data-act="pExit"]').catch(() => page.evaluate(() => closePlayer())); await page.waitForTimeout(100);
  const foc = await page.evaluate(() => { const out = {}; ['kanji', 'vocabulario', 'particulas', 'erros', 'gramatica'].forEach(f => { const qs = buildReview('smart:' + f); out[f] = { n: qs.length, ok: qs.every(q => { if (q.exId) return f === 'gramatica' || f === 'particulas' || f === 'erros'; const u = lnUnitOf(q.itemId); return f === 'particulas' ? u.part : f === 'erros' ? (u.lastOk === false || u.a > u.c) : u.dom === f; }) }; }); return out; });
  ok(Object.values(foc).every(x => x.ok), 'revisão focada respeita o foco ' + JSON.stringify(foc));
  const maint = await page.evaluate(() => { const id = Object.keys(__NQ.S.items).find(k => ITEM[k] && __NQ.S.items[k].c > 0); const r = __NQ.S.items[id]; const bk = JSON.stringify(r); r.box = 5; r.mt = 1; r.due = Date.now() - 1000; const inDue = dueItems().some(x => nqSiblings(x).includes(id)); Object.assign(r, JSON.parse(bk)); delete r.mt; if (!JSON.parse(bk).mt) delete r.mt; return inDue; });
  ok(maint, 'conteúdo dominado volta em manutenção quando chega a hora (não some da revisão)');

  /* ---------- 4. Início, recomendações e Painel ---------- */
  await page.click('.tab[data-view="inicio"]'); await page.waitForTimeout(150);
  ok(await page.isVisible('.ln-teacher .ln-rec.main'), 'Início: “Seu professor” com a recomendação principal');
  const recs = await page.evaluate(() => lnRecommend(6).map(r => r.k));
  ok(recs.length >= 2 && new Set(recs).size === recs.length, 'recomendações variadas e sem repetição (' + recs.join(', ') + ')');
  ok(await page.isVisible('.nq-tile[data-view="progresso"]'), 'Sua jornada: atalho Progresso');
  await page.click('.nq-tile[data-view="progresso"]'); await page.waitForTimeout(150);
  ok(await page.isVisible('.ln-prog .ln-hero'), 'Painel de progresso abre');
  ok(await page.$$eval('.ln-doms .ln-dom', b => b.length) === 9, '9 habilidades (vocabulário, gramática, hiragana, katakana, kanji, leitura, escuta, conversação, expressões)');
  const txt = await page.textContent('.ln-prog');
  ok(/XP, lições concluídas e tempo de uso não entram/.test(txt.replace(/\s+/g, ' ')), 'indicadores honestos: avisa que XP e lições não são domínio');
  ok(/Não é uma certificação oficial do JLPT/.test(txt), 'estimativa JLPT com aviso de que não é certificação');
  ok(/Pontos fortes|Principais dificuldades|Conteúdos que mais custam/.test(txt) && /Histórico de desempenho/.test(txt), 'pontos fortes/dificuldades e histórico de desempenho');
  const sumChk = await page.evaluate(() => { const s = lnSummary(); const units = lnUnits(); const counted = units.filter(u => u.stage !== 'novo').length; const tot = Object.values(s.dom).reduce((a, o) => a + o.apresentado + o.estudado + o.lembrado + o.dominado, 0); return { counted, tot, dom: units.filter(u => u.stage === 'dominado').every(u => u.ids.some(id => itemStatus(id) === 'dominada') || u.ex) }; });
  ok(sumChk.counted === sumChk.tot, 'cada conteúdo contado uma única vez no painel (' + sumChk.tot + ')');
  ok(sumChk.dom, 'dominado no painel = dominada no Caderno (mesmo critério)');
  ok(await page.evaluate(() => document.querySelector('.tab[data-view="revisao"]').classList.contains('active')), 'Painel destaca a aba Revisão');
  const s1 = await noScroll(page); ok(s1.sw <= 360 && s1.bad === 0, '360px sem rolagem lateral: Painel ' + JSON.stringify(s1));

  /* ---------- 5. Avaliações ---------- */
  await page.click('.ln-prog [data-view="avaliacoes"]'); await page.waitForTimeout(150);
  ok(await page.isVisible('.ln-assess [data-k="inicial"]'), 'Avaliações abre');
  ok(await page.$$eval('.ln-assess [data-k^="etapa:"]', b => b.length) === 4, 'provas das 4 etapas listadas');
  const s2 = await noScroll(page); ok(s2.sw <= 360 && s2.bad === 0, '360px sem rolagem lateral: Avaliações ' + JSON.stringify(s2));
  const pre = await page.evaluate(() => ({ items: JSON.stringify(__NQ.S.items), ans: __NQ.S.stats.answers, xp: __NQ.S.xp, lst: JSON.stringify(__NQ.S.listening.stats), ex: JSON.stringify(__NQ.S.exStats), hist: __NQ.S.history.length }));
  await page.click('.ln-assess [data-k="inicial"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => __NQ.P && __NQ.P.assess && __NQ.P.assess.noRecord && __NQ.P.qs.every(q => q.lvl === 'N5')), 'avaliação inicial começa no N5');
  await runQuiz(page, () => true);
  const pl = await page.evaluate(() => ({ phase: __NQ.P.phase, est: __NQ.S.learn.placement && __NQ.S.learn.placement.est, lvls: Object.keys(__NQ.S.learn.placement.levels), items: JSON.stringify(__NQ.S.items), ans: __NQ.S.stats.answers, xp: __NQ.S.xp, lst: JSON.stringify(__NQ.S.listening.stats), ex: JSON.stringify(__NQ.S.exStats), hist: __NQ.S.history.length, txt: document.querySelector('#player').textContent }));
  ok(pl.phase === 'result' && pl.est === 'N1' && pl.lvls.length === 5, 'adaptativa: acertando tudo sobe do N5 ao N1 (' + pl.lvls.join(', ') + ')');
  ok(pl.items === pre.items && pl.ans === pre.ans && pl.ex === pre.ex && pl.lst === pre.lst && pl.hist === pre.hist, 'avaliação inicial não mexe em SRS, Caderno, histórico nem estatísticas');
  ok(pl.xp - pre.xp === 10, 'avaliação inicial: só a recompensa única (+' + (pl.xp - pre.xp) + ' XP), sem XP por pergunta');
  ok(/não um resultado oficial do JLPT/.test(pl.txt), 'resultado deixa claro que não é JLPT oficial');
  await page.click('#player [data-act="pExit"]'); await page.waitForTimeout(80);
  await page.evaluate(() => lnStartAssess('inicial')); await runQuiz(page, () => false);
  const pl2 = await page.evaluate(() => ({ est: __NQ.S.learn.placement.est, xp: __NQ.S.xp, n: __NQ.P.qs.length }));
  ok(pl2.est === null && pl2.n <= 6 && pl2.xp === pl.xp, 'errando no N5 a avaliação para cedo (pré-N5) e não paga de novo');
  await page.evaluate(() => closePlayer());
  const av = await page.evaluate(() => LN_TESTS.map(([k]) => [k, lnTestAvail(k).ok]));
  ok(av.find(x => x[0] === 'vocabulario')[1] && av.find(x => x[0] === 'cumulativa')[1], 'testes de vocabulário e cumulativo liberados ' + JSON.stringify(av));
  const x0 = await page.evaluate(() => __NQ.S.xp);
  await page.evaluate(() => lnStartAssess('vocabulario'));
  const vt = await page.evaluate(() => ({ untaught: __NQ.P.qs.filter(q => q.itemId && !(__NQ.S.items[q.itemId] && __NQ.S.items[q.itemId].seen)).length, dom: __NQ.P.qs.every(q => q.dom === 'vocabulario'), n: __NQ.P.qs.length }));
  ok(vt.untaught === 0 && vt.dom && vt.n >= 6, 'teste de vocabulário só com palavras ensinadas (' + vt.n + ' perguntas)');
  await runQuiz(page, n => n % 3 !== 0);
  const vr = await page.evaluate(() => ({ xp: __NQ.S.xp, last: __NQ.S.learn.assess.slice(-1)[0] }));
  ok(vr.xp - x0 === 10 && vr.last.k === 'vocabulario' && vr.last.pct > 0 && vr.last.pct < 100, 'resultado guardado no histórico; só +10 XP únicos (' + (vr.xp - x0) + ')');
  await page.evaluate(() => closePlayer()); await page.evaluate(() => lnStartAssess('vocabulario')); await runQuiz(page, () => true);
  ok(await page.evaluate(x => __NQ.S.xp === x, vr.xp), 'refazer o teste não dá XP de novo');
  await page.evaluate(() => closePlayer());
  // prova de etapa (forçando as alas do estágio Iniciante como aprovadas numa cópia)
  const stg = await page.evaluate(() => { lnStageCats('ini').forEach(c => { __NQ.S.catExams[c.id] = { passed: true, best: 90, attempts: 1 }; c.lessons.forEach(l => { __NQ.S.lessons[l.id] = { passed: true, best: 90, attempts: 1 }; }); }); return !!lnStageExamReady(); });
  ok(stg, 'prova da etapa libera quando todas as alas da etapa estão concluídas');
  const xs = await page.evaluate(() => __NQ.S.xp);
  await page.evaluate(() => lnStartAssess('etapa:ini')); await runQuiz(page, () => true);
  const se = await page.evaluate(() => ({ r: __NQ.S.learn.stageEx.ini, xp: __NQ.S.xp, n: __NQ.P.graded }));
  ok(se.r && se.r.passed && se.n >= 15, 'prova da etapa Iniciante aprovada (' + se.n + ' perguntas)');
  ok(se.xp - xs === 50, 'recompensa única da etapa (+' + (se.xp - xs) + ' XP)');
  await page.evaluate(() => closePlayer()); await page.evaluate(() => lnStartAssess('etapa:ini')); await runQuiz(page, () => true);
  ok(await page.evaluate(x => __NQ.S.xp === x, se.xp), 'refazer a prova da etapa não paga de novo');
  const s3 = await noScroll(page); ok(s3.sw <= 360 && s3.bad === 0, '360px sem rolagem lateral: resultado da avaliação ' + JSON.stringify(s3));
  await page.evaluate(() => closePlayer());

  /* ---------- 6. Dicionário: formas conjugadas e seu aprendizado ---------- */
  const forms = await page.evaluate(() => { const t = q => { const f = lnDeinflect(q); return f ? f.base + '|' + f.lesson : null; }; return { tabemashita: t('食べました'), ikimasu: t('行きます'), nomanai: t('飲まない'), itte: t('行って'), mite: t('見ています'), takakunai: t('高くない'), benkyou: t('勉強します'), kimashita: t('来ました'), word: t('ありがとう'), ikimasuWord: !!dictSearch('行きます')[0] && dictSearch('行きます')[0].kana === 'いきます', kaki: t('書きます'), yonda: t('読んだ'), oyoide: t('泳いで'), first: dictSearch('食べました')[0] && dictSearch('食べました')[0].kanji }; });
  ok(forms.tabemashita === '食べる|c13l2' && forms.first === '食べる', '食べました → 食べる (forma ます) e aparece primeiro na busca ' + JSON.stringify(forms));
  ok(forms.ikimasu && forms.ikimasu.startsWith('行く') && forms.ikimasuWord && forms.kaki === '書く|c13l2' && forms.yonda === '読む|c8l3' && forms.oyoide === '泳ぐ|c13l3' && forms.nomanai && forms.nomanai.startsWith('飲む') && forms.itte && forms.itte.startsWith('行く'), 'godan: 行きます, 飲まない e 行って → forma de dicionário');
  ok(forms.mite && forms.mite.startsWith('見る') && forms.takakunai && forms.takakunai.startsWith('高い'), '〜ています e adjetivo い (高くない → 高い)');
  ok(forms.benkyou && forms.benkyou.startsWith('勉強') && forms.kimashita && forms.kimashita.startsWith('来る'), 'する e 来る reconhecidos');
  ok(forms.word === null, 'palavra comum não é “desconjugada”; 行きます continua com a própria ficha primeiro e a explicação de 行く');
  await page.evaluate(() => { dictUI.q = '食べました'; go('dicionario'); }); await page.waitForTimeout(150);
  ok(await page.isVisible('.ln-form [data-act="openLesson"][data-id="c13l2"]'), 'Dicionário explica a forma e liga à lição de gramática');
  await page.evaluate(() => { const e = dictSearch('ねこ')[0]; dictOpen(e); }); await page.waitForTimeout(100);
  ok(await page.isVisible('#modal .ln-dlearn'), 'ficha mostra “Seu aprendizado” (estágio e onde a palavra apareceu)');
  await closeModals(page);

  /* ---------- 7. prática de fala ---------- */
  const spk = await page.evaluate(() => { const items = JSON.stringify(__NQ.S.items); lnStartSpeak(); return { kind: __NQ.P && __NQ.P.kind, n: __NQ.P && __NQ.P.cards.length, items }; });
  if (spk.kind === 'speak') {
    await page.click('#player [data-act="lnSay"][data-slow="1"]'); await page.waitForTimeout(80);
    ok(await page.evaluate(() => __spoken.some(s => s.rate <= .65)), 'ouvir devagar');
    ok(!(await page.isVisible('#player .ln-speak-txt')), 'compreensão sem tradução antecipada: texto escondido até pedir');
    await page.click('#player [data-act="lnSpeakShow"]'); ok(await page.isVisible('#player .ln-speak-txt'), 'mostrar frase e tradução');
    const s4 = await noScroll(page); ok(s4.sw <= 360 && s4.bad === 0, '360px sem rolagem lateral: prática de fala ' + JSON.stringify(s4));
    for (let i = 0; i < spk.n; i++) await page.click('#player [data-act="lnSpeakRate"][data-ok="' + (i % 2) + '"]');
    const se2 = await page.evaluate(() => ({ items: JSON.stringify(__NQ.S.items), sp: __NQ.S.learn.speak }));
    ok(se2.items === spk.items && se2.sp.n === spk.n, 'prática de fala registrada à parte, sem mexer no domínio (' + spk.n + ' frases)');
    await page.click('#player [data-act="pExit"]');
  } else ok(true, 'prática de fala: poucas frases estudadas neste save (ok)');

  /* ---------- 8. Academia e outras telas ---------- */
  await page.click('.tab[data-view="academia"]'); await page.evaluate(() => { S.settings.academyMode = 'trad'; render(); }); await page.waitForTimeout(100);
  ok(await page.isVisible('.ln-wing'), 'Academia: domínio real em cada ala estudada');
  await page.click('.tab[data-view="perfil"]'); await page.waitForTimeout(100);
  ok(await page.isVisible('.ln-prow'), 'Perfil: atalho para o painel');
  for (const v of ['inicio', 'revisao', 'caderno', 'mundo', 'chat']) { await page.click(`.tab[data-view="${v}"]`); await page.waitForTimeout(120); const s = await noScroll(page); ok(s.sw <= 360 && s.bad === 0, '360px sem rolagem lateral: ' + v + ' ' + JSON.stringify(s)); }
  await page.evaluate(() => saveNow()); await page.reload(); await closeModals(page);
  ok(await page.evaluate(() => __NQ.S.learn.assess.length >= 4 && !!__NQ.S.learn.placement && __NQ.S.learn.stageEx.ini.passed), 'avaliações e Central salvas após recarregar');

  /* ---------- 9. aluno novo ---------- */
  const p2 = await mk();
  await p2.goto(URL); await p2.evaluate(() => localStorage.clear()); await p2.reload();
  await p2.fill('#nameInput', 'Teste').catch(() => {});
  const fresh = await p2.evaluate(() => { if (!__NQ.S.profile.onboarded) { __NQ.S.profile.name = 'Teste'; __NQ.S.profile.onboarded = true; render(); } const r = lnRecommend(4).map(x => x.k); go('progresso'); const okP = !!document.querySelector('.ln-prog'); go('avaliacoes'); return { v: __NQ.S.schemaVersion, learn: !!__NQ.S.learn, xp: __NQ.S.xp, r, okP }; });
  ok(fresh.v === 13 && fresh.learn && fresh.xp === 0 && fresh.okP, 'aluno novo: esquema 13, Central vazia, painel abre, sem XP indevido');
  ok(fresh.r.includes('place') && fresh.r.includes('lesson'), 'aluno novo: recomenda a avaliação inicial e a primeira lição (' + fresh.r.join(', ') + ')');

  ok(errors.length === 0, 'sem erros no console ' + errors.slice(0, 5).join(' | '));
  console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK');
  await browser.close(); process.exit(fails ? 1 : 0);
})();
