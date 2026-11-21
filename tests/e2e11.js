const { chromium, devices } = require('playwright');
/* Testes da 10.0.0 — Integration & Expansion: migração do save real da 9.0 (com backup), "Sua jornada" no Início,
   área Sobre (informações e links oficiais), palavras unificadas entre as áreas (Caderno, Dicionário, Mundo,
   Leitura e Revisão sem duplicar), XP e recompensas sem contabilização indevida, base do Adventure Mode (11.0),
   aviso de novidades único e telas de 360px. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V90 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v9.0-save.json'), 'utf8'));
Object.values(V90.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
  const mk = async (vp) => { const ctx = await browser.newContext(vp || { viewport: { width: 360, height: 740 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); await ctx.addInitScript(stub); await ctx.addInitScript(() => { window.__NQ_FAST = true; window.__toasts = []; document.addEventListener('DOMContentLoaded', () => { const t = document.querySelector('#toasts'); if (t) new MutationObserver(() => window.__toasts.push(t.textContent)).observe(t, { childList: true, subtree: true }); }); }); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort()); return p; };
  const closeModals = async page => { await page.waitForTimeout(250); while (await page.isVisible('#modal .sheet')) { const b = await page.$('#modal [data-act="closeModal"], #modal [data-act="dictClose"]'); if (!b) break; await b.click(); await page.waitForTimeout(120); } };
  const raw = JSON.stringify(V90);

  /* ---------- 1. migração 9.0 -> 10.0 ---------- */
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 12 && S.appVersion === '12.0.0', '9.0: migrado para o esquema 10 (versão 10.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema9') === r, raw), 'backup do save 9.0 guardado (nihongoQuest:backup:schema9) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict', 'world', 'lacad', 'read', 'settings', 'profile', 'discoveries', 'listening'].forEach(k => ok(JSON.stringify(S[k]) === JSON.stringify(V90[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V90.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V90.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(S.journey && S.journey.v === 1 && !Object.keys(S.journey.claimed).length, 'jornada criada vazia (nenhuma recompensa paga na migração)');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 12, 'save regravado no esquema 10');

  /* ---------- 2. Início: Sua jornada ---------- */
  const tiles = await page.$$eval('.nq-tiles .nq-tile', b => b.map(x => x.querySelector('.nq-tn').textContent));
  ok(JSON.stringify(tiles) === JSON.stringify(['Academia', 'Vocabulário', 'Listening', 'Leitura', 'Mundo', 'Chat', 'Dicionário', 'Caderno', 'Revisão']), 'Sua jornada: as 9 áreas no Início (' + tiles.join(', ') + ')');
  ok(!(await page.isVisible('.rd-homecard')) && !(await page.isVisible('.w-homecard')) && !(await page.isVisible('.d-home')), 'cartões “Novo” empilhados substituídos pela jornada');
  ok((await page.textContent('.nq-tile[data-act="acadMode"] .nq-ts')).includes(S && Object.values(S.lessons).filter(x => x.passed).length + '/349'), 'Academia: lições aprovadas corretas');
  ok((await page.textContent('.nq-tile[data-act="gotoReading"] .nq-ts')).startsWith('1/'), 'Leitura: 1 lição do save 9.0');
  const nav = async (sel, check, label) => { await page.evaluate(() => { location.hash = 'inicio'; }); await page.waitForTimeout(150); await page.click(sel); await page.waitForTimeout(200); ok(await page.evaluate(check), label); };
  await nav('.nq-tile[data-act="acadMode"]', () => location.hash === '#academia' && __NQ.S.settings.academyMode === 'trad', 'jornada → Academia');
  await nav('.nq-tile[data-act="gotoLA"]', () => location.hash === '#academia' && __NQ.S.settings.academyMode === 'la', 'jornada → Listening Academy');
  await nav('.nq-tile[data-act="gotoReading"]', () => location.hash === '#academia' && __NQ.S.settings.academyMode === 'rd' && !!document.querySelector('.rd-hero'), 'jornada → Leitura');
  await nav('.nq-tile[data-act="gotoWorld"]', () => location.hash === '#mundo', 'jornada → Mundo');
  await nav('.nq-tile[data-view="chat"]', () => location.hash === '#chat', 'jornada → Chat');
  await nav('.nq-tile[data-act="gotoDict"]', () => location.hash === '#dicionario' && !!document.querySelector('#dictSearch'), 'jornada → Dicionário');
  await nav('.nq-tile[data-view="caderno"]', () => location.hash === '#caderno', 'jornada → Caderno');
  await nav('.nq-tile[data-view="revisao"]', () => location.hash === '#revisao', 'jornada → Revisão');
  await page.evaluate(() => { location.hash = 'inicio'; }); await page.waitForTimeout(150);
  const dueTxt = await page.textContent('.nq-tile[data-view="revisao"] .nq-ts');
  const dueN = await page.evaluate(() => dueItems().length);
  ok(dueN ? dueTxt === dueN + ' agora' : dueTxt === 'em dia', 'Revisão: pendentes no Início (' + dueTxt + ')');

  /* ---------- 3. Sobre o Nihongo Quest ---------- */
  await page.click('.nq-foot [data-view="sobre"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => location.hash === '#sobre') && await page.isVisible('.nq-about'), 'Sobre: link no rodapé do Início');
  await page.click('.tab[data-view="perfil"]'); await page.click('.nq-about-row');
  ok(await page.isVisible('.nq-about') && await page.$eval('.tab[data-view="perfil"]', t => t.classList.contains('active')), 'Sobre: acessível pelo Perfil (aba Perfil ativa)');
  const about = await page.textContent('.nq-about');
  ok(about.includes('Nihongo Quest') && about.includes('日本語クエスト'), 'nome oficial: Nihongo Quest — 日本語クエスト');
  ok(about.includes('Harry Lima') && about.includes('criador e responsável'), 'criador e responsável: Harry Lima');
  ok(about.includes('projeto independente') && !/Ltda|S\.A\.|LLC|Inc\.|®|marca registrada/i.test(about), 'nenhuma empresa ou registro inventado');
  ok(about.includes('Versão 12.0.0'), 'versão atual exibida');
  const hrefs = await page.$$eval('.nq-about a', a => a.map(x => ({ h: x.href, t: x.target, r: x.rel })));
  ok(hrefs.some(x => x.h === 'https://harrylima007.github.io/Nihongo-Quest/') && hrefs.some(x => x.h === 'https://github.com/HarryLima007/Nihongo-Quest'), 'links oficiais: site e repositório');
  ok(hrefs.every(x => x.t === '_blank' && x.r.includes('noopener')), 'links abrem em nova aba com noopener');
  const hist = await page.$$eval('.nq-hist li b', b => b.map(x => x.textContent));
  ok(JSON.stringify(hist) === JSON.stringify(['12.0.0', '11.0.0', '10.0.0', '9.0.0', '8.0.0', '7.0.0', '6.0.0', '5.0.0', '4.0.0', '3.0.0', '2.1.0', '2.0.0', '1.0.0']), 'histórico com todas as versões');
  ok(about.includes('© 2026 Harry Lima. Todos os direitos reservados.') && about.includes('autorização do criador'), 'direitos autorais: todos os direitos reservados, reutilização depende de autorização');
  ok(!/\bMIT\b|domínio público|Creative Commons|licença livre/i.test(about.replace('não têm licença de uso livre', '')), 'nenhuma licença permissiva declarada por engano');
  ok(about.includes('SIL Open Font License') && about.includes('Web Speech') && about.includes('kuromoji') && about.includes('Claude Code'), 'créditos de terceiros e assistência de IA declarados');
  ok(fs.existsSync(path.resolve(__dirname, '../NOTICE')) && fs.readFileSync(path.resolve(__dirname, '../NOTICE'), 'utf8').includes('Todos os direitos reservados'), 'arquivo NOTICE no repositório');
  ok(!fs.existsSync(path.resolve(__dirname, '../LICENSE')), 'nenhum LICENSE permissivo criado');
  // abrir direto pelo endereço
  const pd = await mk(); await pd.goto(URL); await pd.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await pd.goto(URL + '#sobre'); await pd.reload(); await closeModals(pd);
  ok(await pd.isVisible('.nq-about'), 'Sobre abre direto por #sobre');
  await pd.context().close();

  /* ---------- 4. palavras unificadas ---------- */
  const cl = await page.evaluate(() => ({ konn: nqSiblings('c1l3:konnichiwa'), mou: nqSiblings('c10l3:mou'), ni: nqSiblings('rd:に'), two: nqSiblings('c1l1:2'), hj: nqSiblings('world:hajimemashite') }));
  ok(cl.konn.includes('rd:w:こんにちは') && cl.konn.includes('dict:こんにちは'), 'こんにちは da Academia, Leitura e Dicionário é a mesma palavra');
  ok(!cl.mou.includes('dict:もう'), 'homógrafos com outro sentido não se juntam (もう “poxa” × もう “já”)');
  ok(cl.ni.length === 1 && !cl.two.includes('rd:に'), 'caracteres isolados (に da Leitura) não se juntam a palavras (に = 2)');
  ok(cl.hj.includes('c1l3:hajimemashite'), 'はじめまして do Mundo = はじめまして da Academia');
  const lessonsBefore = await page.evaluate(() => JSON.stringify([__NQ.S.lessons, __NQ.S.lacad.lessons, __NQ.S.read.lessons, __NQ.S.world.scenes, __NQ.S.xp]));
  // a Leitura "vê" こんにちは (já estudada na Academia): o Caderno mostra uma entrada só
  await page.evaluate(() => { markSeen('rd:w:こんにちは'); });
  await page.click('.tab[data-view="caderno"]');
  await page.fill('#nbSearch', 'こんにちは'); await page.waitForTimeout(250);
  const nbE = await page.$$eval('.nb-entry .jpw', e => e.map(x => x.textContent).filter(t => t === 'こんにちは'));
  ok(nbE.length === 1, 'Caderno: こんにちは aparece uma vez (estudada na Academia e na Leitura)');
  ok((await page.textContent('#nbList')).includes('também em Leitura Japonesa'), 'Caderno: mostra as outras áreas onde a palavra apareceu');
  ok(await page.isVisible('.nb-entry [data-act="nqDict"]'), 'Caderno: atalho para o Dicionário em cada palavra');
  await page.click('.nb-entry [data-act="nqDict"]'); await page.waitForTimeout(200);
  ok(await page.isVisible('#modal .d-entry') && (await page.textContent('#modal .d-big')) === 'こんにちは', 'Caderno → ficha do Dicionário');
  ok(await page.isVisible('#modal .d-done') && !(await page.isVisible('#modal [data-act="dictSave"]')), 'Dicionário: “✓ No Caderno” (sem botão de adicionar de novo)');
  await closeModals(page);
  await page.fill('#nbSearch', ''); await page.waitForTimeout(150);
  const cnt = await page.evaluate(() => ({ uniq: nqUniqueCount(seenItems()), raw: seenItems().length }));
  ok(cnt.uniq < cnt.raw && (await page.textContent('.wrap p.muted.tabnum')).startsWith(cnt.uniq + ' itens estudados'), 'Caderno: contagem sem repetições (' + cnt.uniq + ' de ' + cnt.raw + ' registros)');
  // Mundo: palavra já estudada na Academia conta como salva; salvar não cria outro registro
  const wd = await page.evaluate(() => { const had = !!(__NQ.S.items['c1l3:hajimemashite'] || {}).seen; if (!had) markSeen('c1l3:hajimemashite'); const before = JSON.stringify(__NQ.S.items['world:hajimemashite'] || null); const saved = wWordSaved('hajimemashite'); const r = wSaveWord('hajimemashite'); return { saved, r, same: before === JSON.stringify(__NQ.S.items['world:hajimemashite'] || null) }; });
  ok(wd.saved && !wd.r && wd.same, 'Mundo: palavra já estudada aparece como salva e não é duplicada');
  // Leitura: palavra que já está no Caderno por outra área
  const rdw = await page.evaluate(() => { const w = __NQ.READ.WD['こんにちは'] || Object.values(__NQ.READ.WD).find(x => x.jp === 'こんにちは'); return w ? { saved: rdWordSaved(w), r: rdSaveWord(w) } : null; });
  ok(rdw && rdw.saved && !rdw.r, 'Leitura: palavra já no Caderno não é salva de novo');

  /* ---------- 5. Revisão sem duplicar ---------- */
  const rv = await page.evaluate(() => {
    const now = Date.now(), a = 'c1l3:konnichiwa', b = 'rd:w:こんにちは';
    [a, b].forEach(id => { const r = rec(id); r.seen = r.seen || now; r.c = Math.max(1, r.c); r.box = 1; r.due = now - 1000; r.lastOk = true; });
    const due = dueItems(); const both = due.includes(a) && due.includes(b);
    const qs = []; for (let i = 0; i < 15; i++) qs.push(...buildReview('due').filter(q => q && q.itemId).map(q => q.itemId));
    const sess = []; for (let i = 0; i < 15; i++) { const ids = buildReview('due').filter(q => q && q.itemId).map(q => q.itemId); sess.push(ids.filter(id => id === a || id === b).length); }
    const cBefore = S.items[b].c, boxBefore = S.items[b].box;
    recordAnswer(a, true, 'review');
    return { one: due.includes(a) !== due.includes(b), both, maxPerSession: Math.max(...sess), postponed: S.items[b].due >= S.items[a].due && S.items[b].due > now, untouched: S.items[b].c === cBefore && S.items[b].box === boxBefore };
  });
  ok(rv.one && !rv.both, 'Revisão: a mesma palavra conta uma vez nas pendentes');
  ok(rv.maxPerSession <= 1, 'Revisão: a mesma palavra no máximo uma vez por sessão');
  ok(rv.postponed && rv.untouched, 'acertar a palavra adia a revisão da “irmã” sem mexer em acertos, caixa ou domínio');
  const wrongSync = await page.evaluate(() => { const a = 'c1l3:konnichiwa', b = 'rd:w:こんにちは'; const before = JSON.stringify(S.items[b]); recordAnswer(a, false, 'review'); return before === JSON.stringify(S.items[b]); });
  ok(wrongSync, 'erro em uma área não penaliza a outra');

  /* ---------- 6. XP, recompensas e progresso ---------- */
  const xp = await page.evaluate(() => { const x0 = __NQ.S.xp; const e = (dictBuild(), DICT.list.find(d => d.items.length && !dictInNotebook(d))); dictSave(e); const x1 = __NQ.S.xp; const r1 = nqRewardOnce('test:boss1', 10, 5); const x2 = __NQ.S.xp, c2 = __NQ.S.coins; const r2 = nqRewardOnce('test:boss1', 10, 5); const r3 = nqRewardOnce('test:big', 999, 999); return { dictXp: x1 - x0, r1, r2, gain: x2 - x1, again: __NQ.S.xp - x2 - 50, coinsSame: true, r3, cap: __NQ.S.xp - x2 }; });
  ok(xp.dictXp === 0, 'salvar do Dicionário não dá XP');
  ok(xp.r1 && xp.gain === 10, 'recompensa única: paga na primeira vez');
  ok(!xp.r2, 'recompensa única: a mesma chave não paga de novo');
  ok(xp.r3 && xp.cap === 50, 'recompensa única tem teto (50 XP)');
  const after = await page.evaluate(() => JSON.stringify([__NQ.S.lessons, __NQ.S.lacad.lessons, __NQ.S.read.lessons, __NQ.S.world.scenes]));
  ok(after === JSON.stringify(JSON.parse(lessonsBefore).slice(0, 4)), 'nada disso concluiu lições, provas ou cenas em outra área');
  const ach = await page.evaluate(() => { const n = Object.keys(__NQ.S.achievements).length, c = __NQ.S.coins; checkAchievements(); checkAchievements(); return Object.keys(__NQ.S.achievements).length - n === 0 ? __NQ.S.coins === c : true; });
  ok(ach, 'conquistas não pagam duas vezes');

  /* ---------- 7. base do Adventure Mode (11.0) ---------- */
  const rpg = await page.evaluate(() => { const w = nqKnownWords(); const keys = w.map(x => x.ids.slice().sort().join(',')); const lv = nqLearnerLevel(); const dom = nqKnownWords({ minStatus: 'dominada' }); return { n: w.length, uniq: new Set(w.map(x => nqSiblings(x.id).join(','))).size, konn: w.filter(x => x.jp === 'こんにちは').length, chars: w.some(x => nqIsCharItem(ITEM[x.id])), lv, domOk: dom.every(x => x.status === 'dominada'), fields: w.every(x => x.jp && x.pt && x.status && x.sources.length) }; });
  ok(rpg.n > 0 && rpg.n === rpg.uniq && rpg.konn === 1, 'nqKnownWords: palavras aprendidas sem repetição (' + rpg.n + ')');
  ok(!rpg.chars && rpg.fields, 'nqKnownWords: só palavras/expressões, com japonês, tradução, status e origem');
  ok(rpg.domOk, 'nqKnownWords: filtro por status (dominadas)');
  ok(rpg.lv.level >= 1 && typeof rpg.lv.lessons === 'number' && Array.isArray(rpg.lv.reading) && typeof rpg.lv.listening === 'number' && typeof rpg.lv.world === 'number', 'nqLearnerLevel: nível por área ' + JSON.stringify(rpg.lv));
  ok(fs.existsSync(path.resolve(__dirname, '../docs/RPG-11-PREP.md')), 'documento de preparação da 11.0');

  /* ---------- 8. novidade única + persistência ---------- */
  await page.waitForTimeout(5400);
  const toastTxt = await page.evaluate(() => window.__toasts.join(' '));
  ok(toastTxt.includes('Novo na 12.0') && await page.evaluate(() => __NQ.S.journey.seenVersion === '12.0.0'), 'aviso de novidades da 10.0 para quem já usava o app');
  await page.evaluate(() => saveNow());
  await page.reload(); await closeModals(page); await page.waitForTimeout(5600);
  ok(!(await page.evaluate(() => window.__toasts.join(' '))).includes('Novo na 12.0'), 'aviso não se repete');
  ok(await page.evaluate(() => !!__NQ.S.journey.claimed['test:boss1'] && __NQ.S.schemaVersion === 12), 'recompensas registradas sobrevivem ao recarregar');

  /* ---------- 9. aluno novo ---------- */
  const pn = await mk(); await pn.goto(URL); await pn.evaluate(() => { __NQ.suspendSave(); localStorage.clear(); }); await pn.reload();
  await pn.fill('#nameInput', 'Teste'); await pn.click('[data-act="onboard"]'); await pn.waitForTimeout(300);
  ok(await pn.isVisible('.nq-tiles') && (await pn.$$('.nq-tile')).length === 9, 'aluno novo: jornada aparece no Início');
  ok(await pn.evaluate(() => __NQ.S.schemaVersion === 12 && __NQ.S.journey && __NQ.S.xp === 0), 'aluno novo: esquema 10, sem XP indevido');
  await pn.context().close();

  /* ---------- 10. 360px ---------- */
  for (const [v, mode] of [['inicio'], ['academia', 'trad'], ['academia', 'la'], ['academia', 'rd'], ['academia', 'aud'], ['chat'], ['mundo'], ['revisao'], ['caderno'], ['dicionario'], ['escrita'], ['perfil'], ['sobre']]) {
    await page.evaluate(([v, m]) => { if (m) __NQ.S.settings.academyMode = m; location.hash = v === 'inicio' ? 'x' : 'inicio'; location.hash = v; }, [v, mode]); await page.waitForTimeout(250);
    const o = await page.evaluate(() => { const w = document.documentElement.clientWidth; const bad = [...document.querySelectorAll('#view .nq-tile, #view .card, #view .btn, #view h1, #view h2, #view .nq-about a')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > w + 1 || r.left < -1); }).length; return { sw: document.documentElement.scrollWidth, w, bad }; });
    ok(o.sw <= 360 && o.bad === 0, '360px sem rolagem lateral: ' + v + (mode ? ' (' + mode + ')' : '') + ' ' + JSON.stringify(o));
  }
  await page.evaluate(() => { location.hash = 'inicio'; }); await page.waitForTimeout(200);
  ok(await page.$$eval('.nq-tile', t => t.every(x => { const r = x.getBoundingClientRect(); const s = x.querySelector('.nq-ts'); return r.width >= 70 && r.height >= 44 && s.scrollWidth <= s.clientWidth + 1; })), 'blocos da jornada com área de toque adequada e texto sem cortes');

  ok(!errors.length, 'sem erros de JavaScript' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK');
  process.exit(fails ? 1 : 0);
})();
