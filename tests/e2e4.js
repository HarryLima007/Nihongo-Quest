const { chromium, devices } = require('playwright');
/* Testes da 3.0.0: migração de saves reais da 2.0 e da 2.1, estágios e pré-requisitos,
   todas as lições e alas geram perguntas válidas, modos de revisão, cópia automática,
   proteção contra salvar perfil vazio por cima do progresso e o treino “Responder certo”. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V20 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v2.0-save.json'), 'utf8'));
const V21 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v2.1-save.json'), 'utf8'));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const same = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m);
const stub = `(() => {
  class U { constructor(t) { this.text = t; this.lang = ''; this.rate = 1; this.pitch = 1; this.voice = null; } }
  window.SpeechSynthesisUtterance = U; let cur = null;
  const ss = { paused: false, getVoices: () => [{ lang: 'ja-JP', name: 'Japonês (teste)', localService: true }], addEventListener() {}, resume() {},
    cancel() { if (cur) { const u = cur; cur = null; u.onerror && u.onerror({ error: 'interrupted' }); } },
    speak(u) { cur = u; setTimeout(() => u.onstart && u.onstart(), 5); setTimeout(() => { if (cur === u) cur = null; u.onend && u.onend(); }, 40); } };
  Object.defineProperty(window, 'speechSynthesis', { value: ss, configurable: true });
})();`;
async function answer(page, correct) {
  const q = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.P.qs[__NQ.P.i])));
  if (q.type === 'listen' || q.type === 'mc') {
    let i = q.options.findIndex(o => o.correct); if (!correct) i = q.options.findIndex(o => !o.correct);
    await page.click(`[data-act="opt"][data-i="${i}"]`); await page.click('[data-act="check"]');
  } else if (q.type === 'num_type') { await page.fill('#numInput', String(correct ? q.answer : q.answer + 1)); await page.click('[data-act="check"]'); }
  else if (q.type === 'build') { const order = correct ? q.answer : q.answer.slice().reverse(); const used = new Set(); for (const tok of order) { const i = q.bank.findIndex((t, k) => t.jp === tok && !used.has(k)); used.add(i); await page.click(`[data-act="build"][data-i="${i}"]`); } await page.click('[data-act="check"]'); }
  else if (q.type === 'error') { await page.click(`[data-act="opt"][data-i="${correct ? q.wrong : (q.wrong ? 0 : 1)}"]`); await page.click('[data-act="check"]'); }
  else if (q.type === 'match') { for (let i = 0; i < q.items.length; i++) { await page.click(`[data-act="mL"][data-i="${i}"]`); await page.click(`[data-act="mR"][data-i="${i}"]`); } }
  await page.click('[data-act="next"]');
}
async function runQuiz(page, f = () => true) { let n = 0; while (await page.evaluate(() => __NQ.P && __NQ.P.phase === 'quiz')) await answer(page, f(n++)); return n; }
async function closeModals(page) { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"]'); if (!b) break; await b.click(); await page.waitForTimeout(150); } }
const keepOld = (now, old) => Object.fromEntries(Object.keys(old).map(k => [k, Object.fromEntries(Object.keys(old[k]).map(f => [f, (now[k] || {})[f]]))]));

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { ...devices['Pixel 5'] }); await ctx.addInitScript(stub); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return require('./reveal')(p); };
  const loadSave = async (page, data) => { const raw = JSON.stringify(data); await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await page.reload(); await closeModals(page); return raw; };

  /* ---------- 1. saves reais da 2.0 e da 2.1 abrem sem perder nada ---------- */
  const page = await mk();
  for (const [name, V] of [['2.0', V20], ['2.1', V21]]) {
    const raw = await loadSave(page, V);
    const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
    ok(S.schemaVersion === 6 && S.appVersion === '6.0.0', name + ': migrado para o esquema 6 (' + S.schemaVersion + ', ' + S.appVersion + ')');
    same(S.lessons, V.lessons, name + ': lições preservadas (' + Object.keys(S.lessons).length + ')');
    same(S.catExams, V.catExams, name + ': avaliações finais preservadas');
    same(keepOld(S.items, V.items), V.items, name + ': itens de revisão preservados campo a campo (' + Object.keys(V.items).length + ')');
    ok(Object.keys(S.items).length === Object.keys(V.items).length, name + ': nenhum item a mais ou a menos');
    const newAch = Object.keys(S.achievements).filter(k => !V.achievements[k]);
    ok(Object.keys(V.achievements).every(k => JSON.stringify(S.achievements[k]) === JSON.stringify(V.achievements[k])), name + ': conquistas antigas preservadas');
    ok(S.xp === V.xp && S.coins === V.coins + 20 * newAch.length && S.streak.best === V.streak.best && S.profile.name === V.profile.name, name + ': XP, moedas (+20 por conquista nova: ' + newAch.length + '), sequência e perfil preservados');
    same(S.discoveries, V.discoveries, name + ': descobertas preservadas');
    same(S.listening.stats.answers, V.listening.stats.answers, name + ': estatísticas auditivas preservadas');
    same([S.settings.theme, S.settings.romaji, S.settings.rate], [V.settings.theme, V.settings.romaji, V.settings.rate], name + ': configurações preservadas');
    ok(S.history.length === V.history.length, name + ': histórico preservado (' + S.history.length + ')');
    const st = await page.evaluate(() => ({ bk: localStorage.getItem('nihongoQuest:backup:schema2'), auto: localStorage.getItem('nihongoQuest:backup:auto'), stored: JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion }));
    ok(st.bk === raw, name + ': cópia de segurança do save antigo guardada antes da migração');
    ok(st.stored === 6, name + ': save regravado no esquema 6');
    ok(st.auto && JSON.parse(st.auto).xp === V.xp, name + ': cópia automática diária criada');
    ok(Object.entries(S.items).every(([id, r]) => r.c > 0 ? r.d >= 1 : r.d === 0), name + ': dias de acerto (d) calculados para todos os itens');
    ok(Object.keys(S.skills).length > 0 && Object.keys(S.log).length > 0, name + ': estatísticas por habilidade e registro diário criados');
  }

  /* ---------- 2. proteção contra perfil vazio por cima do progresso ---------- */
  await page.evaluate(() => { S = defaultState(); saveNow(); });
  ok(await page.evaluate(x => JSON.parse(localStorage.getItem('nihongoQuest:save')).xp === x, V21.xp), 'perfil vazio não sobrescreve o progresso salvo');
  await page.reload(); await closeModals(page);
  ok(await page.evaluate(x => __NQ.S.xp === x && __NQ.S.profile.onboarded, V21.xp), 'progresso continua lá depois de recarregar');

  /* ---------- 3. estrutura: 4 estágios, pré-requisitos sempre antes ---------- */
  const st = await page.evaluate(() => {
    const ord = CATS.map(c => c.id), bad = [];
    CATS.forEach(c => reqsOf(c).forEach(r => { if (ord.indexOf(r) < 0 || ord.indexOf(r) >= ord.indexOf(c.id)) bad.push(c.id + '←' + r); }));
    const by = {}; CATS.forEach(c => { (by[stageOf(c)] = by[stageOf(c)] || []).push(c.id); });
    return { bad, by, lessons: ALL_LESSONS.length, stages: STAGES.map(s => s.id), ids: new Set(ALL_LESSONS.map(l => l.id)).size };
  });
  ok(st.lessons >= 340, st.lessons + ' lições');
  ok(st.ids === st.lessons, 'ids de lições únicos');
  same(st.stages, ['ini', 'int', 'ava', 'pro'], 'quatro estágios: Iniciante, Intermediário, Avançado, Proficiente');
  ok(st.stages.every(s => (st.by[s] || []).length >= 4), 'cada estágio tem alas: ' + st.stages.map(s => s + '=' + (st.by[s] || []).length).join(' '));
  ok(!st.bad.length, 'todo pré-requisito vem antes da ala ' + st.bad.join(' '));
  same(st.by.pro, ['c31', 'c32', 'c33', 'c34', 'c35'], 'alas do Proficiente');

  // interface: abas de estágio e alas bloqueadas com o motivo
  await page.click('.tab[data-view="academia"]');
  if (await page.isVisible('[data-act="acadMode"][data-mode="trad"]')) await page.click('[data-act="acadMode"][data-mode="trad"]');
  ok((await page.$$eval('.stage-tabs [data-act="stage"]', e => e.length)) === 4, 'quatro abas de estágio no mapa');
  await page.click('[data-act="stage"][data-st="pro"]');
  const pro = await page.$$eval('.wing', w => w.map(x => ({ id: x.id, locked: !!x.querySelector('.wing-head.locked'), txt: x.textContent })));
  ok(pro.length === 5 && pro.every(w => w.locked), 'Proficiente: 5 alas, todas bloqueadas para este save');
  ok(pro.every(w => /Requer|Exige|Conclua|Passe|depois/i.test(w.txt)), 'alas bloqueadas explicam o pré-requisito');
  await page.click('[data-act="wingToggle"][data-cat="c31"]');
  ok(await page.evaluate(() => [...document.querySelectorAll('#wing-c31 [data-act="openLesson"]')].length === LESSON.c31l1.cat.lessons.length), 'ala aberta mostra as lições (bloqueadas)');
  await page.click('[data-act="openLesson"][data-id="c31l1"]'); await page.waitForTimeout(200);
  ok(!(await page.isVisible('#modal [data-act="startLesson"][data-id="c31l1"]:not([data-mode])')), 'lição do Proficiente não abre sem os pré-requisitos');
  await closeModals(page);

  /* ---------- 4. todas as lições, alas, áudios e diálogos geram perguntas válidas ---------- */
  const val = await page.evaluate(() => {
    const bad = [];
    const check = (q, where) => {
      if (!q) { bad.push(where + ': pergunta nula'); return; }
      if (q.type === 'mc' || q.type === 'listen') {
        const c = q.options.filter(o => o.correct).length, labels = q.options.map(o => o.label + '|' + (o.sub || ''));
        if (q.options.length < 2 || c !== 1) bad.push(where + ': ' + q.options.length + ' opções, ' + c + ' certas');
        if (new Set(labels).size !== labels.length) bad.push(where + ': opções repetidas');
        if (q.options.some(o => !String(o.label || '').trim())) bad.push(where + ': opção vazia');
      } else if (q.type === 'build') { if (!q.answer.length || !q.answer.every(t => q.bank.some(b => b.jp === t))) bad.push(where + ': montar frase inválida'); }
      else if (q.type === 'error') { if (!(q.wrong >= 0 && q.wrong < q.tokens.length)) bad.push(where + ': erro fora do intervalo'); }
      else if (q.type === 'match') { if (q.items.length < 2) bad.push(where + ': ligar pares com poucos itens'); }
      else if (q.type !== 'num_type') bad.push(where + ': tipo ' + q.type);
    };
    let n = 0;
    for (const L of ALL_LESSONS) {
      for (let k = 0; k < 2; k++) { buildPractice(L).forEach(q => { n++; check(q, L.id + ' prática'); }); buildExam(L).forEach(q => { n++; check(q, L.id + ' exame'); }); }
      (L.exercises || []).forEach((ex, i) => { n++; check(authoredQ(ex, L), L.id + '#' + i); });
      L.items.forEach(it => { n++; check(genItemQ(it), it.id); });
      if (!L.items.length) bad.push(L.id + ': sem itens');
      if (L.text && !(L.text.length >= 4)) bad.push(L.id + ': texto curto');
    }
    CATS.forEach(c => buildCatExam(c).forEach(q => { n++; check(q, c.id + ' avaliação'); }));
    AUDIO_PACKS.forEach(p => p.items.forEach(it => { n++; check(genItemQ(it), it.id); }));
    PRON_SETS.forEach(s => { n++; check(genPronQ(s, 'avancado'), 'som ' + s.id); });
    DIALOGS.forEach(d => genDialogQs(d).forEach(q => { n++; check(q, d.id); }));
    ['iniciante', 'intermediario', 'avancado'].forEach(lv => ['palavra', 'som', 'frase', 'misto', 'resposta'].forEach(t => buildListenSession(t, lv).forEach(q => { n++; check(q, 'treino ' + t + ' ' + lv); })));
    return { bad, n };
  });
  ok(!val.bad.length, val.n + ' perguntas geradas e válidas' + (val.bad.length ? ': ' + val.bad.slice(0, 8).join(' · ') : ''));

  /* ---------- 5. modos de revisão ---------- */
  const rv = await page.evaluate(() => ['due', 'hard', 'cat:c1', 'lesson:c1l1', 'test', 'weak'].map(m => { const qs = buildReview(m); return [m, qs.length, qs.every(q => q && q.type)]; }));
  rv.forEach(([m, n, good]) => ok(good && (n > 0 || m === 'weak'), 'revisão ' + m + ': ' + n + ' perguntas'));
  const before = await page.evaluate(() => ({ xp: __NQ.S.xp, a: __NQ.S.stats.answers }));
  await page.click('.tab[data-view="revisao"]');
  await page.evaluate(() => startReview('due'));
  const nq = await runQuiz(page, i => i % 4 !== 0);
  const after = await page.evaluate(() => ({ xp: __NQ.S.xp, a: __NQ.S.stats.answers, phase: __NQ.P && __NQ.P.phase }));
  ok(nq > 0 && after.a > before.a && after.phase === 'result', 'revisão de vencidos respondida (' + nq + ' perguntas, ' + (after.a - before.a) + ' respostas registradas)');
  await page.click('[data-act="pExit"]'); await closeModals(page);
  const status = await page.evaluate(() => { const c = {}; seenItems().forEach(id => { const s = itemStatus(id); c[s] = (c[s] || 0) + 1; }); return c; });
  ok(Object.keys(status).every(s => ['vista', 'aprendendo', 'revisar', 'dominada'].includes(s)), 'status dos itens: ' + JSON.stringify(status));
  ok(await page.isVisible('text=Pontos fracos') || await page.isVisible('text=pontos fracos') || await page.isVisible('text=Assuntos fracos'), 'tela de revisão mostra os pontos fracos');

  /* ---------- 6. Academia Auditiva: Responder certo ---------- */
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="acadMode"][data-mode="aud"]');
  ok(await page.isVisible('[data-act="listen"][data-type="resposta"]'), 'treino “Responder certo” no hub auditivo');
  await page.click('[data-act="listen"][data-type="resposta"]');
  const nr = await runQuiz(page, i => i !== 1);
  const rs = await page.evaluate(() => __NQ.S.listening.stats.byType.resposta);
  ok(nr >= 6 && rs && rs.a === nr && rs.c === nr - 1, 'Responder certo: ' + nr + ' perguntas, estatística ' + JSON.stringify(rs));
  await page.click('[data-act="pExit"]'); await closeModals(page);
  await page.click('.tab[data-view="caderno"]'); await page.click('[data-act="nbType"][data-t="resposta"]');
  ok((await page.$$eval('.nb-entry', e => e.length)) >= 1 && await page.isVisible('text=Resposta adequada'), 'caderno mostra as respostas treinadas');
  await page.click('.tab[data-view="academia"]'); await page.click('[data-act="audSub"][data-sub="dlg"]');
  await page.click('[data-act="dialog"][data-id="dlg-kansai"]');
  ok(await page.evaluate(() => __NQ.P && __NQ.P.kind === 'dialog' && __NQ.P.D.id === 'dlg-kansai'), 'diálogo novo (Kansai) abre no laboratório');
  await page.click('[data-act="pClose"]').catch(() => {}); if (await page.isVisible('[data-act="pExit"]')) await page.click('[data-act="pExit"]');

  /* ---------- 7. celular estreito: sem rolagem horizontal ---------- */
  const small = await mk({ viewport: { width: 320, height: 640 }, deviceScaleFactor: 1 });
  await loadSave(small, V21);
  for (const [v, extra] of [['academia', '[data-act="stage"][data-st="pro"]'], ['academia', '[data-act="stage"][data-st="ava"]'], ['revisao', null], ['caderno', null], ['perfil', null]]) {
    await small.click(`.tab[data-view="${v}"]`);
    if (v === 'academia' && await small.isVisible('[data-act="acadMode"][data-mode="trad"]')) await small.click('[data-act="acadMode"][data-mode="trad"]');
    if (extra) await small.click(extra);
    const ov = await small.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(ov <= 0, '320px: ' + v + (extra ? ' ' + extra.match(/st="(\w+)"/)[1] : '') + ' sem rolagem horizontal (' + ov + ')');
  }

  ok(!errors.length, 'sem erros de JavaScript: ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TODOS OS TESTES PASSARAM');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
