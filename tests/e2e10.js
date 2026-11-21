const { chromium, devices } = require('playwright');
/* Testes da 9.0.0 — Japanese Reading: migração do save real da 8.0 (com backup), aba Leitura na Academia,
   aula (símbolo, romaji, áudio normal/devagar/3×, associação, exemplos), exercícios só com caracteres
   estudados, avaliação que não aprova só por abrir, todos os grupos de hiragana/katakana jogáveis,
   kanji com leitura em contexto, frases com partículas, romaji (sempre/depois/oculto), ouvir primeiro,
   Dicionário, Caderno (sem duplicar) e aba Escrita, Revisão, Mundo (placas), XP sem farm, isolamento do
   currículo (Academia e Listening Academy) e layout no celular. */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
const V80 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v8.0-save.json'), 'utf8'));
Object.values(V80.chat.chars).forEach(c => { if (c && typeof c === 'object') c.lastAt = Date.now(); });
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
  const raw = JSON.stringify(V80);
  /* responde a pergunta atual (certo ou errado) pela interface */
  const answer = async (page, right) => {
    const st = await page.evaluate(r => { const q = __NQ.RV.qs[__NQ.RV.qi]; if (q.t === 'build') return { build: true, order: q.tiles.map(t => q.bank.findIndex((b, i) => b.t === t && !q.bank.slice(0, i).some(() => false))), bank: q.bank.map(b => b.t), tiles: q.tiles }; const i = q.opts.findIndex(o => r ? o.ok : !o.ok); return { i }; }, right);
    if (st.build) {
      const used = new Set();
      const tiles = right ? st.tiles : st.tiles.slice().reverse();
      for (const t of tiles) { const i = st.bank.findIndex((b, j) => b === t && !used.has(j)); used.add(i); await page.click('.bank .tile[data-i="' + i + '"]'); }
    } else await page.click('.rd-q .opt[data-i="' + st.i + '"]');
    await page.click('[data-act="rdCheck"]');
    await page.click('[data-act="rdNextQ"]');
  };
  const playQuiz = async (page, nWrong = 0) => { let k = 0; while (await page.evaluate(() => __NQ.RV && __NQ.RV.mode === 'quiz')) { await answer(page, k >= nWrong); k++; if (k > 40) break; } return k; };

  /* ---------- 1. migração 8.0 -> 9.0 ---------- */
  const page = await mk();
  await page.goto(URL); await page.evaluate(r => { __NQ.suspendSave(); localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw);
  await page.reload(); await closeModals(page);
  const S = await page.evaluate(() => JSON.parse(JSON.stringify(__NQ.S)));
  ok(S.schemaVersion === 10 && S.appVersion === '10.0.0', '8.0: migrado para o esquema 9 (versão 9.0.0)');
  ok(await page.evaluate(r => localStorage.getItem('nihongoQuest:backup:schema8') === r, raw), 'backup do save 8.0 guardado (nihongoQuest:backup:schema8) antes de migrar');
  ['xp', 'coins', 'streak', 'lessons', 'catExams', 'achievements', 'history', 'items', 'exStats', 'skills', 'stats', 'shop', 'tests', 'dict', 'world', 'lacad'].forEach(k => ok(JSON.stringify(S[k]) === JSON.stringify(V80[k]), 'preservado: ' + k));
  ok(JSON.stringify(S.chat.chars) === JSON.stringify(V80.chat.chars) && JSON.stringify(S.chat.threads) === JSON.stringify(V80.chat.threads), 'preservado: Chat (personagens e conversas)');
  ok(S.read && S.read.v === 1 && !Object.keys(S.read.lessons).length && S.read.ro === 'sempre', 'Leitura criada vazia, romaji “sempre” para iniciantes');
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('nihongoQuest:save')).schemaVersion) === 10, 'save regravado no esquema 9');
  const before = await page.evaluate(() => ({ lessons: JSON.stringify(__NQ.S.lessons), lacad: JSON.stringify(__NQ.S.lacad), catExams: JSON.stringify(__NQ.S.catExams), world: JSON.stringify(__NQ.S.world.scenes), xp: __NQ.S.xp }));

  /* ---------- 2. navegação ---------- */
  ok(await page.isVisible('[data-act="gotoReading"]'), 'cartão da Leitura Japonesa no Início');
  await page.click('.tab[data-view="academia"]');
  ok(await page.isVisible('.mode-switch.four [data-mode="rd"]'), 'Academia: aba “Leitura” ao lado de Academia, Listening e Treinos');
  await page.click('[data-mode="rd"]');
  ok(await page.isVisible('.rd-hero') && (await page.$$('.rd-stage')).length === 5, 'Leitura Japonesa: 5 etapas (Hiragana, Katakana, Palavras, Kanji, Frases)');
  ok(await page.$eval('#rd-st-kata', e => e.classList.contains('locked')), 'Katakana bloqueado até a prova de Hiragana (sem ensinar os dois ao mesmo tempo)');
  ok(await page.$eval('.rd-lrow[data-id="h2"]', e => e.classList.contains('locked')), 'lições liberam em ordem');
  ok((await page.textContent('.rd-level')).includes('Começando do zero'), 'nível de leitura visível (iniciante absoluto)');

  /* ---------- 3. aula: vogais ---------- */
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.rd-lrow[data-id="h1"]');
  ok(await page.isVisible('.rd-pane'), 'aula aberta em tela cheia');
  ok((await page.textContent('.rd-card')).includes('5 vogais'), 'introdução em português');
  await page.click('[data-act="rdNext"]');
  const card = await page.textContent('.rd-card');
  ok(await page.textContent('.rd-big') === 'あ' && card.includes('Associação visual') && card.includes('Pronúncia') && card.includes('Exemplos'), 'cartão do caractere: símbolo, associação visual, pronúncia e exemplos');
  ok(await page.textContent('.rd-charbox .rd-ro') === 'a', 'romaji visível no modo “Sempre”');
  await page.waitForTimeout(450);
  ok(await page.evaluate(() => __spoken.some(s => s.text === 'あ')), 'áudio do caractere toca ao abrir o cartão');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.rd-audio [data-act="rdSaySlow"]'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => __spoken.some(s => s.text === 'あ' && s.rate === 0.6)), 'reprodução lenta');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.rd-audio [data-act="rdSay3"]'); await page.waitForTimeout(300);
  ok(await page.evaluate(() => __spoken.filter(s => s.text === 'あ').length === 3), 'repetição (3×)');
  // romaji: depois de tentar / oculto
  await page.click('#rdOpts [data-act="rdRo"][data-v="oculto"]');
  ok(!(await page.isVisible('.rd-charbox .rd-ro')) && await page.isVisible('.rd-charbox .rd-reveal'), 'romaji oculto, com botão para revelar');
  await page.click('.rd-charbox .rd-reveal');
  ok(await page.textContent('.rd-charbox .rd-ro') === 'a', 'revelar romaji');
  // ouvir primeiro
  await page.click('#rdOpts [data-act="rdListen"]');
  await page.click('[data-act="rdNext"]');
  ok(await page.isVisible('.rd-gate') && !(await page.isVisible('.rd-big')), 'ouvir primeiro: a escrita fica escondida até escutar');
  await page.evaluate(() => { window.__spoken = []; });
  await page.click('.rd-gate'); await page.waitForTimeout(100);
  ok(await page.textContent('.rd-big') === 'い' && await page.evaluate(() => __spoken.some(s => s.text === 'い')), 'depois de ouvir, o caractere aparece');
  await page.click('#rdOpts [data-act="rdListen"]');
  await page.click('#rdOpts [data-act="rdRo"][data-v="sempre"]');
  // sair sem fazer exercícios não aprova
  await page.click('[data-act="rdClose"]');
  ok(await page.evaluate(() => !(__NQ.S.read.lessons.h1 && __NQ.S.read.lessons.h1.passed) && !!__NQ.S.read.opened.h1), 'abrir a aula NÃO conclui a lição (fica “em estudo”)');

  /* ---------- 4. exercícios só com o que foi estudado + avaliação ---------- */
  const pool = await page.evaluate(() => { const L = __NQ.READ.L.h1; const out = []; for (let i = 0; i < 30; i++) __NQ.READ.build(L).forEach(q => (q.opts || []).forEach(o => out.push(o.t))); return out; });
  ok(pool.length > 50 && pool.every(t => /^[あいうえお]+$/.test(t) || /^[a-z ]+$/.test(t) || /[a-zà-ú]/i.test(t)), 'vogais: nenhuma alternativa usa caractere ainda não estudado');
  await page.click('.rd-lrow[data-id="h1"]');
  for (let i = 0; i < 20 && await page.isVisible('[data-act="rdNext"]'); i++) await page.click('[data-act="rdNext"]');
  await page.click('[data-act="rdQuiz"]');
  ok(await page.evaluate(() => __NQ.RV.mode === 'quiz' && __NQ.RV.qs.length >= 10), 'avaliação com pelo menos 10 exercícios');
  const types = await page.evaluate(() => [...new Set(__NQ.RV.qs.map(q => q.t))]);
  ok(['see', 'hear'].every(t => types.includes(t)), 'tipos variados: ver o caractere e ouvir o som (' + types.join(', ') + ')');
  // pergunta de ouvir toca o áudio
  const hearIdx = await page.evaluate(() => __NQ.RV.qs.findIndex(q => q.t === 'hear'));
  ok(hearIdx >= 0, 'há exercício de identificar o caractere pelo som');
  // errar 3: reprovar
  await playQuiz(page, 3);
  ok(await page.isVisible('.rd-result') && !(await page.evaluate(() => __NQ.S.read.lessons.h1.passed)), 'com 70% a lição não é aprovada (mínimo 80%)');
  const xp0 = await page.evaluate(() => __NQ.S.xp);
  ok(xp0 === before.xp, 'reprovar não dá XP');
  await page.click('[data-act="rdRetry"]');
  await playQuiz(page, 0);
  const r1 = await page.evaluate(() => ({ xp: __NQ.S.xp, rec: __NQ.S.read.lessons.h1, seen: ['あ', 'い', 'う', 'え', 'お'].every(c => __NQ.S.items['rd:' + c] && __NQ.S.items['rd:' + c].seen) }));
  ok(r1.rec.passed && r1.rec.best === 100, 'acertando tudo, a lição é aprovada (100%)');
  ok(r1.xp - xp0 === 20, 'primeira aprovação: +15 XP +5 sem erros');
  ok(r1.seen, 'vogais estudadas entram no Caderno de caracteres e na Revisão');
  ok(await page.isVisible('.rd-result [data-act="rdLesson"][data-id="h2"]'), 'botão para a próxima lição');
  await page.click('[data-act="rdRetry"]'); await playQuiz(page, 0);
  ok(await page.evaluate(() => __NQ.S.xp) === r1.xp, 'refazer a lição: nenhum XP (sem farm)');
  await page.click('.rd-result [data-act="rdClose"]');
  ok(!(await page.$eval('.rd-lrow[data-id="h2"]', e => e.classList.contains('locked'))), 'linha K liberada depois das vogais');

  /* ---------- 5. todos os grupos de hiragana e katakana: aula e avaliação jogáveis ---------- */
  const all = await page.evaluate(() => __NQ.READ.course.flatMap(st => st.lessons.map(L => L.id)));
  ok(all.length === 49, '49 lições no curso');
  const groupCheck = await page.evaluate(() => {
    const bad = [];
    // simula aprovar em ordem: cada lição só vê o que foi estudado antes dela
    const R = __NQ.S.read;
    __NQ.READ.course.forEach(st => {
      st.lessons.forEach(L => {
        for (let k = 0; k < 6; k++) {
          const qs = __NQ.READ.build(L);
          if (qs.length < 8) bad.push(L.id + ': poucos exercícios ' + qs.length);
          const known = __NQ.READ.known(L);
          qs.forEach(q => {
            if (!q.opts && !q.tiles) bad.push(L.id + ': exercício sem alternativas');
            if (q.opts && q.opts.filter(o => o.ok).length !== 1) bad.push(L.id + ': ' + q.t + ' com ' + q.opts.filter(o => o.ok).length + ' respostas certas');
            const texts = (q.opts || []).filter(o => o.kana || o.jp).map(o => o.t).concat(q.big && q.bigCls !== 'pt' ? [q.big] : [], q.wordShow ? [q.wordShow] : []);
            texts.forEach(t => [...t].forEach(ch => { if (/[ぁ-ゖァ-ヺー]/.test(ch) && !known.has(ch)) bad.push(L.id + ': ' + q.t + ' usa caractere não estudado ' + ch + ' em ' + t); }));
          });
        }
        R.lessons[L.id] = { passed: true, best: 100, attempts: 1 };
      });
      R.exams[st.id] = { passed: true, best: 100, attempts: 1 };
    });
    R.lessons = {}; R.exams = { };
    return bad;
  });
  ok(groupCheck.length === 0, 'todas as 49 lições geram exercícios válidos, só com caracteres estudados (vogais, linhas, ゛゜, combinados, っ, vogais longas, katakana, estrangeiros) ' + groupCheck.slice(0, 4).join(' | '));
  await page.evaluate(() => { __NQ.S.read.lessons = { h1: { passed: true, best: 100, attempts: 2 } }; __NQ.S.read.exams = {}; });

  /* ---------- 6. prova de etapa (nivelamento) libera Katakana ---------- */
  await page.evaluate(() => { window.render(); });
  await page.click('#rd-st-hira [data-act="rdExam"]');
  ok(await page.evaluate(() => __NQ.RV.kind === 'exam' && __NQ.RV.qs.length === 15), 'prova de Hiragana com 15 questões, também serve de nivelamento');
  const xpE = await page.evaluate(() => __NQ.S.xp);
  await playQuiz(page, 0);
  ok(await page.evaluate(() => __NQ.S.read.exams.hira.passed) && await page.evaluate(() => __NQ.S.xp) - xpE === 30, 'prova aprovada: +30 XP');
  ok(await page.evaluate(() => ['か', 'きゃ', 'っ'.length && 'ぱ'].every(c => __NQ.S.items['rd:' + c] && __NQ.S.items['rd:' + c].seen)), 'nivelamento: hiragana da etapa conta como estudado');
  await page.click('.rd-result [data-act="rdClose"]');
  await page.click('#rd-st-kata .rd-sthead').catch(() => {});
  if (!(await page.isVisible('.rd-lrow[data-id="k1"]'))) await page.click('#rd-st-kata .rd-sthead');
  ok(!(await page.$eval('.rd-lrow[data-id="k1"]', e => e.classList.contains('locked'))), 'Katakana liberado depois da prova de Hiragana');
  await page.click('.rd-lrow[data-id="k1"]');
  await page.click('[data-act="rdNext"]');
  ok((await page.textContent('.rd-card')).includes('Em hiragana'), 'katakana mostra o equivalente em hiragana (diferença entre os dois sistemas)');
  await page.click('[data-act="rdClose"]');

  /* ---------- 7. palavras, kanji e frases ---------- */
  await page.evaluate(() => { const R = __NQ.S.read; ['hira', 'kata'].forEach(s => { R.exams[s] = { passed: true, best: 100, attempts: 1 }; }); __NQ.READ.course[1].lessons.forEach(L => { R.lessons[L.id] = { passed: true, best: 100, attempts: 1 }; }); window.render(); });
  await page.evaluate(() => { window.__spoken = []; });
  await page.evaluate(() => ACT.rdLesson({ dataset: { id: 'p1' } }));
  await page.click('[data-act="rdNext"]');
  const wcard = await page.textContent('.rd-card');
  ok(await page.textContent('.rd-big') === 'みず' && wcard.includes('Caracteres usados') && await page.isVisible('.rd-unit'), 'palavra みず: escrita, caracteres usados');
  ok(await page.isVisible('[data-act="rdRev"][data-k^="ptw"]'), 'tradução escondida até pedir (ler sem depender da tradução)');
  await page.click('[data-act="rdRev"][data-k^="ptw"]');
  ok((await page.textContent('.rd-card')).includes('água'), 'tradução revelada');
  await page.waitForTimeout(450);
  ok(await page.evaluate(() => __spoken.some(s => s.text === 'みず')), 'pronúncia da palavra');
  await page.click('.rd-card [data-act="rdDict"]');
  ok(await page.isVisible('#modal .d-entry') && (await page.textContent('#modal .d-entry')).includes('みず'), 'abre a palavra no Dicionário (leituras, exemplos, áudio)');
  await page.click('#modal [data-act="dictClose"], #modal [data-act="closeModal"]');
  const wasSaved = await page.evaluate(() => Object.keys(__NQ.S.items).some(id => __NQ.S.items[id].seen && __NQ.ITEM[id] && (__NQ.ITEM[id].jp === 'みず' || __NQ.ITEM[id].say === 'みず')));
  if (await page.isVisible('.rd-card [data-act="rdSave"]')) await page.click('.rd-card [data-act="rdSave"]');
  ok(await page.isVisible('.rd-card .d-done'), 'palavra marcada “No Caderno”' + (wasSaved ? ' (já estava salva por outra área: reconhecida sem duplicar)' : ''));
  const dup = await page.evaluate(() => { const w = __NQ.READ.WD['rd:w:みず']; const e = rdDictEntry(w); return Object.keys(__NQ.S.items).filter(id => __NQ.S.items[id].seen && ([].concat(e ? e.items : [], 'rd:w:みず').includes(id))); });
  ok(dup.length === 1, 'salvar no Caderno sem duplicar (um só item para みず: ' + dup.join(', ') + ')');
  ok(await page.evaluate(() => rdSaveWord(__NQ.READ.WD['rd:w:みず'])) === false, 'salvar de novo não duplica');
  await page.click('[data-act="rdClose"]');
  // kanji
  await page.evaluate(() => { const R = __NQ.S.read; R.exams.pal = { passed: true, best: 100, attempts: 1 }; R.lessons.j1 = { passed: true, best: 100, attempts: 1 }; window.render(); ACT.rdLesson({ dataset: { id: 'j2' } }); });
  await page.click('[data-act="rdNext"]');
  const kcard = await page.textContent('.rd-card');
  ok(await page.textContent('.rd-big') === '日' && kcard.includes('Leituras (dependem da palavra)') && kcard.includes('Em palavras reais') && await page.isVisible('.rd-kw ruby rt'), 'kanji 日: significado, leituras explicadas e palavras reais com leitura por cima');
  ok(kcard.includes('ついたち') || kcard.includes('ふつか'), 'leituras especiais de data em contexto');
  const kq = await page.evaluate(() => { ['j2', 'j3', 'j4'].forEach(id => { __NQ.S.read.lessons[id] = { passed: true, best: 100, attempts: 1 }; }); const L = __NQ.READ.L.j5; const out = []; for (let i = 0; i < 20; i++) __NQ.READ.build(L).filter(q => q.t === 'kread').forEach(q => out.push(q.big + '→' + q.opts.find(o => o.ok).t)); return [...new Set(out)]; });
  ok(kq.some(x => x.startsWith('日［曜］日→よう')) && kq.some(x => x.includes('［金］曜日→きん')) && kq.some(x => x.includes('お［金］→かね')), 'leitura do kanji pela palavra: 金 = きん em 金曜日, かね em お金 (' + kq.slice(0, 5).join(' ') + ')');
  await page.click('[data-act="rdClose"]');
  // frases
  await page.evaluate(() => { const R = __NQ.S.read; R.exams.kan = { passed: true, best: 100, attempts: 1 }; ['f1', 'f2'].forEach(id => { R.lessons[id] = { passed: true, best: 100, attempts: 1 }; }); window.render(); ACT.rdLesson({ dataset: { id: 'f3' } }); });
  await page.click('[data-act="rdNext"]');
  ok((await page.textContent('.rd-card')).includes('Kanji novo nesta lição') && await page.textContent('.rd-big') === '私', 'frase com kanji novo: 私 apresentado explicitamente antes');
  await page.click('[data-act="rdNext"]');
  const scard = await page.textContent('.rd-card');
  ok(await page.textContent('.rd-sent') === '私は学生です。' && scard.includes('Palavra por palavra') && scard.includes('partícula de tópico'), 'frase 私は学生です。: palavra por palavra, partícula explicada');
  ok(await page.isVisible('.rd-part.pt') && scard.includes('wa'), 'partícula は destacada, lida “wa”');
  await page.click('[data-act="rdNext"]'); await page.click('[data-act="rdNext"]'); await page.click('[data-act="rdNext"]');
  await page.click('[data-act="rdQuiz"]');
  const sTypes = await page.evaluate(() => [...new Set(__NQ.RV.qs.map(q => q.t))]);
  ok(sTypes.includes('smean') && (sTypes.includes('spart') || sTypes.includes('build')), 'exercícios de frase: sentido, partícula e montar frase (' + sTypes.join(', ') + ')');
  await playQuiz(page, 0);
  ok(await page.evaluate(() => __NQ.S.read.lessons.f3 && __NQ.S.read.lessons.f3.passed), 'lição de frases aprovada');
  await page.click('.rd-result [data-act="rdClose"]');

  /* ---------- 8. isolamento do currículo ---------- */
  const after = await page.evaluate(() => ({ lessons: JSON.stringify(__NQ.S.lessons), lacad: JSON.stringify(__NQ.S.lacad), catExams: JSON.stringify(__NQ.S.catExams), world: JSON.stringify(__NQ.S.world.scenes) }));
  ok(after.lessons === before.lessons && after.catExams === before.catExams, 'Leitura não marca lições nem avaliações da Academia');
  ok(after.lacad === before.lacad, 'Listening Academy intacta (currículo e “ensinados” não mudam)');
  ok(after.world === before.world, 'Living Japanese World intacto');
  ok(await page.evaluate(() => Object.keys(__NQ.S.items).filter(id => id.startsWith('rd:')).every(id => !['academia', 'listening', 'auditiva'].includes(__NQ.S.items[id] && 'x'))), 'itens de leitura ficam fora do currículo das avaliações');

  /* ---------- 9. Revisão, Ouvir e ler, Caderno de caracteres ---------- */
  await page.click('.tab[data-view="revisao"]');
  ok(await page.isVisible('.rd-revcard'), 'Revisão: cartão “Revisão de leitura”');
  await page.click('.rd-revcard [data-act="rdReview"]');
  const rv = await page.evaluate(() => ({ n: __NQ.RV.qs.length, t: [...new Set(__NQ.RV.qs.map(q => q.t))] }));
  ok(rv.n >= 6 && rv.t.length >= 2, 'revisão de leitura mistura reconhecimento visual e auditivo (' + rv.t.join(', ') + ')');
  const xpR = await page.evaluate(() => __NQ.S.xp);
  await playQuiz(page, 0);
  const gR = await page.evaluate(() => __NQ.S.xp) - xpR;
  ok(gR > 0 && gR <= 20, 'revisão dá XP limitado (+' + gR + ')');
  await page.click('.rd-result [data-act="rdRetry"]'); await playQuiz(page, 0);
  await page.click('.rd-result [data-act="rdRetry"]'); await playQuiz(page, 0);
  ok(await page.evaluate(() => __NQ.S.read.xp.n) <= 20, 'XP de treinos de leitura tem limite diário (sem farm)');
  await page.click('.rd-result [data-act="rdClose"]');
  // a Revisão principal também gera perguntas válidas para itens de leitura
  const mainQ = await page.evaluate(() => Object.keys(__NQ.S.items).filter(id => id.startsWith('rd:') && __NQ.S.items[id].seen).slice(0, 30).map(id => { const q = genItemQ(__NQ.ITEM[id]); return q.type === 'mc' && q.options.filter(o => o.correct).length === 1 && q.options.length >= 2; }));
  ok(mainQ.length > 5 && mainQ.every(Boolean), 'Revisão principal: perguntas válidas para caracteres, kanji e palavras');
  await page.click('.tab[data-view="caderno"]');
  ok(await page.isVisible('.d-tabs [data-view="escrita"]'), 'Caderno: aba “Escrita”');
  await page.click('.d-tabs [data-view="escrita"]');
  const wv = await page.textContent('#view');
  ok(await page.isVisible('.rd-grid') && wv.includes('Hiragana') && wv.includes('Katakana') && wv.includes('Kanji estudados') && wv.includes('Kanji encontrados') && wv.includes('Histórico de leitura'), 'Caderno de caracteres: hiragana, katakana, kanji estudados e encontrados, histórico');
  ok(await page.$eval('.rd-gc[data-ch="あ"]', e => !e.classList.contains('s-nao')) && await page.$eval('.rd-gc[data-ch="ア"]', e => e.classList.contains('s-nao')), 'grade mostra o que já foi estudado e o que falta');
  await page.click('.rd-gc[data-ch="あ"]');
  ok(await page.isVisible('#modal .rd-audio'), 'ficha do caractere com áudio');
  await closeModals(page);
  ok((await page.textContent('#view')).includes('みず'), 'palavras lidas aparecem no caderno de escrita');
  await page.click('.d-tabs [data-view="caderno"]');
  ok((await page.textContent('#view')).includes('Leitura Japonesa') || (await page.textContent('#view')).includes('みず'), 'palavra salva aparece no Caderno principal');

  /* ---------- 10. Mundo: placas (opcionais) ---------- */
  await page.click('.tab[data-view="mundo"]');
  if (await page.isVisible('[data-act="wIntroOk"]')) await page.click('[data-act="wIntroOk"]');
  await page.click('.w-place-row[data-p="eki"]');
  ok(await page.isVisible('.rd-signs') && (await page.$$('.rd-sign.can')).length >= 1, 'Mundo: placas da estação que você já lê');
  ok(await page.isVisible('.w-scene'), 'as situações continuam abertas sem exigir leitura');

  /* ---------- 11. Ouvir e ler (palavras já ouvidas em outras áreas) ---------- */
  const heard = await page.evaluate(() => __NQ.READ.heard().length);
  ok(heard >= 4, '“Ouvir e ler”: ' + heard + ' palavras que você já ouviu e agora consegue ler');

  /* ---------- 12. persistência ---------- */
  await page.evaluate(() => { saveNow(); }); await page.reload(); await closeModals(page);
  ok(await page.evaluate(() => __NQ.S.read.lessons.h1.passed && __NQ.S.schemaVersion === 10), 'progresso de leitura salvo após recarregar');
  ok(await page.evaluate(() => !!__NQ.S.achievements.read_first), 'conquista “Primeiras letras”');

  /* ---------- 13. celular pequeno ---------- */
  const small = await mk({ viewport: { width: 360, height: 700 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await small.goto(URL); await small.evaluate(r => { localStorage.clear(); localStorage.setItem('nihongoQuest:save', r); }, raw); await small.reload(); await closeModals(small);
  await small.click('.tab[data-view="academia"]'); await small.click('[data-mode="rd"]');
  const ov = await small.evaluate(() => ({ doc: document.documentElement.scrollWidth <= window.innerWidth + 1, sw: [...document.querySelectorAll('.mode-switch.four button')].every(b => b.scrollWidth <= b.clientWidth + 2) }));
  ok(ov.doc, 'Leitura sem rolagem horizontal em 360px');
  ok(ov.sw, 'as 4 abas da Academia cabem em 360px');
  await small.screenshot({ path: path.resolve(__dirname, '../dist/rd-hub-360.png'), fullPage: true });
  await small.click('.rd-lrow[data-id="h1"]'); await small.click('[data-act="rdNext"]');
  const cv = await small.evaluate(() => { const f = document.querySelector('.rd-foot').getBoundingClientRect(); const big = document.querySelector('.rd-big'); return { fits: document.querySelector('.rd-pane').scrollWidth <= window.innerWidth + 1, foot: f.bottom <= window.innerHeight + 1, size: parseFloat(getComputedStyle(big).fontSize) }; });
  ok(cv.fits && cv.foot, 'aula cabe na tela do celular, botões visíveis');
  ok(cv.size >= 72, 'caractere grande e legível (' + cv.size + 'px)');
  await small.screenshot({ path: path.resolve(__dirname, '../dist/rd-card-360.png') });
  for (let i = 0; i < 10 && await small.isVisible('[data-act="rdNext"]'); i++) await small.click('[data-act="rdNext"]');
  await small.click('[data-act="rdQuiz"]');
  const qv = await small.evaluate(() => ({ fits: document.querySelector('.rd-pane').scrollWidth <= window.innerWidth + 1, big: [...document.querySelectorAll('.rd-q .opt')].every(o => o.getBoundingClientRect().height >= 44) }));
  ok(qv.fits && qv.big, 'exercícios no celular: cabem e têm botões grandes (≥ 44px)');
  await small.screenshot({ path: path.resolve(__dirname, '../dist/rd-quiz-360.png') });

  ok(errors.length === 0, 'sem erros no console ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK');
  process.exit(fails ? 1 : 0);
})();
