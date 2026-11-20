/* Validação do conteúdo (sem navegador): node tests/content.js
   Confere ids estáveis da 2.0, estrutura de lições e exercícios,
   diálogos, pares de som e palavras duplicadas. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = f => fs.readFileSync(path.resolve(__dirname, '../src', f), 'utf8');
const code = ['content.js', 'content2.js', 'content3.js', 'content4.js', 'content5.js'].map(src).join('\n').replace(/^const /gm, 'var ');
const C = {}; vm.createContext(C); vm.runInContext(code, C);
const { CATS, AUDIO_PACKS, PRON_SETS, DIALOGS, CHARS, LISTEN_V1, LISTEN_V1_FRASES, ACHIEVEMENTS } = C;
let fails = 0; const ok = (c, m) => { if (!c) { console.log('FAIL ' + m); fails++; } };

/* índice */
const LESSON = {}, ITEM = {};
CATS.forEach(c => c.lessons.forEach(l => { ok(!LESSON[l.id], 'lição duplicada ' + l.id); LESSON[l.id] = Object.assign(l, { cat: c }); l.items.forEach(it => { const id = l.id + ':' + it.k; ok(!ITEM[id], 'item duplicado ' + id); ITEM[id] = Object.assign(it, { lesson: l }); }); }));
AUDIO_PACKS.forEach(p => p.items.forEach(it => { const id = p.id + ':' + it.k; ok(!ITEM[id], 'item duplicado ' + id); ITEM[id] = Object.assign(it, { lesson: p }); }));

/* 1. todos os ids da 2.0 continuam existindo */
const old = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'v2.0-ids.json'), 'utf8'));
old.cats.forEach(id => ok(CATS.some(c => c.id === id), 'categoria da 2.0 sumiu: ' + id));
old.lessons.forEach(id => ok(LESSON[id], 'lição da 2.0 sumiu: ' + id));
old.items.forEach(id => ok(ITEM[id], 'item da 2.0 sumiu: ' + id));
old.dialogs.forEach(id => ok(DIALOGS.some(d => d.id === id), 'diálogo da 2.0 sumiu: ' + id));
old.pron.forEach(id => ok(PRON_SETS.some(p => p.id === id), 'par de som da 2.0 sumiu: ' + id));
/* a lição da 2.0 mantém a mesma posição dentro da categoria (o desbloqueio depende da ordem) */
old.lessons.forEach(id => { const l = LESSON[id]; if (l) ok(l.cat.lessons.indexOf(l) === old.lessons.filter(x => x.slice(0, x.indexOf('l')) === id.slice(0, id.indexOf('l'))).indexOf(id), 'lição da 2.0 mudou de posição: ' + id); });

/* 2. categorias e desbloqueio */
const catIds = new Set(CATS.map(c => c.id));
CATS.forEach(c => {
  ok(!c.requires || catIds.has(c.requires), c.id + ': requisito inexistente ' + c.requires);
  ok(c.lessons.length > 0, c.id + ': categoria sem lições');
  ok(Array.isArray(c.soon) && c.soon.length === 0, c.id + ': ainda tem “em breve”');
  let k = c, n = 0; while (k && k.requires && n < 20) { k = CATS.find(x => x.id === k.requires); n++; } ok(n < 20, c.id + ': ciclo de requisitos');
});
ok(CATS.map(c => c.num).join() === CATS.map((_, i) => i + 1).join(), 'numeração das categorias');

/* 3. lições, itens e exercícios */
const KINDS = ['number', 'vocab', 'grammar', 'kana', 'kanaword'];
const kanaOnly = s => /^[぀-ゟ゠-ヿー\s、。！？…・「」〜~0-9０-９]+$/.test(s);
let nLessons = 0, nItems = 0, nEx = 0;
Object.values(LESSON).forEach(l => {
  nLessons++;
  ok(KINDS.includes(l.kind), l.id + ': kind inválido');
  ok(l.title && l.emblem && Array.isArray(l.intro) && l.intro.length && l.tip, l.id + ': teoria incompleta');
  ok(l.items.length >= 4, l.id + ': menos de 4 itens');
  ok(Array.isArray(l.examples) && l.examples.length, l.id + ': sem exemplos');
  ok(Array.isArray(l.exercises) && l.exercises.length >= 3, l.id + ': menos de 3 exercícios');
  const keys = new Set();
  l.items.forEach(it => {
    nItems++;
    ok(!keys.has(it.k), l.id + ': chave repetida ' + it.k); keys.add(it.k);
    ok(it.jp && it.ro && it.pt, l.id + ':' + it.k + ': jp/ro/pt faltando');
    if (it.say) ok(kanaOnly(it.say), l.id + ':' + it.k + ': say com kanji: ' + it.say);
    if (l.kind === 'grammar' || l.kind === 'vocab') ok(kanaOnly(it.jp.replace(/[〜]/g, '')) || it.say, l.id + ':' + it.k + ': kanji sem say (a voz pode ler errado)');
    if (it.ex) ok(it.ex.jp && it.ex.ro && it.ex.pt, l.id + ':' + it.k + ': exemplo incompleto');
  });
  /* pt distintos dentro da lição (as alternativas não podem empatar) */
  const pts = l.items.map(i => i.pt); ok(new Set(pts).size === pts.length, l.id + ': traduções repetidas');
  if (l.kind === 'kana') { const ros = l.items.map(i => i.ro); ok(new Set(ros).size === ros.length, l.id + ': sons repetidos (pergunta ambígua)'); }
  l.exercises.forEach((ex, i) => {
    nEx++;
    const tag = l.id + ' ex' + i + ' (' + ex.t + ')';
    ok(ex.explain, tag + ': sem explicação');
    if (ex.t === 'fill' || ex.t === 'situation') {
      ok(Array.isArray(ex.opts) && ex.opts.length >= 2 && ex.ans >= 0 && ex.ans < ex.opts.length, tag + ': opções/resposta');
      ok(new Set(ex.opts).size === ex.opts.length, tag + ': opções repetidas');
      if (ex.t === 'fill') ok(/＿/.test(ex.jp), tag + ': lacuna ＿ ausente');
    } else if (ex.t === 'order' || ex.t === 'translate') {
      ok(Array.isArray(ex.tiles) && ex.tiles.length >= 2, tag + ': peças');
      const all = ex.tiles.concat(ex.extra || []).map(t => t.split('|')[0]);
      ok((ex.extra || []).every(e => !ex.tiles.map(t => t.split('|')[0]).includes(e.split('|')[0])), tag + ': peça extra igual a uma peça correta');
    } else if (ex.t === 'error') {
      ok(Array.isArray(ex.tokens) && ex.tokens.length >= 2 && ex.wrong >= 0 && ex.wrong < ex.tokens.length, tag + ': tokens/erro');
    } else ok(false, tag + ': tipo desconhecido');
  });
});

/* 4. Academia Auditiva */
AUDIO_PACKS.forEach(p => p.items.forEach(it => {
  ok(it.jp && it.ro && it.pt && it.lv >= 1 && it.lv <= 3, p.id + ':' + it.k + ': campos');
  if (it.say) ok(kanaOnly(it.say), p.id + ':' + it.k + ': say com kanji');
  if (p.group === 'expressao') ok(it.when && it.formal, p.id + ':' + it.k + ': expressão sem uso/formalidade');
}));
PRON_SETS.forEach(s => { ok(s.ids.length >= 2 && s.ids.every(id => ITEM[id]), 'par de som inválido ' + s.id); const r = s.ids.map(id => ITEM[id] && ITEM[id].ro); ok(new Set(r).size === r.length, 'par de som com romaji igual ' + s.id); });
ok(new Set(PRON_SETS.map(s => s.id)).size === PRON_SETS.length, 'ids de pares de som repetidos');
Object.values(LISTEN_V1).concat(Object.values(LISTEN_V1_FRASES)).flat().forEach(id => ok(LESSON[id], 'LISTEN: lição inexistente ' + id));
ok(new Set(DIALOGS.map(d => d.id)).size === DIALOGS.length, 'ids de diálogos repetidos');
DIALOGS.forEach(d => {
  ok(d.lv >= 1 && d.lv <= 3 && d.title && d.situ, d.id + ': campos');
  d.lines.forEach((ln, i) => { ok(CHARS[ln.sp], d.id + ' fala ' + i + ': personagem ' + ln.sp); ok(ln.jp && ln.ro && ln.pt, d.id + ' fala ' + i + ': texto'); if (ln.say) ok(kanaOnly(ln.say), d.id + ' fala ' + i + ': say com kanji'); });
  d.qs.forEach((q, i) => ok(q.opts.length >= 2 && q.ans >= 0 && q.ans < q.opts.length && new Set(q.opts).size === q.opts.length, d.id + ' pergunta ' + i));
});
ok(new Set(ACHIEVEMENTS.map(a => a.id)).size === ACHIEVEMENTS.length, 'ids de conquistas repetidos');

/* 5. palavras duplicadas: a mesma palavra não pode ser item em dois lugares
   (lições de caracteres, kana e kanji, ensinam a escrita e ficam de fora) */
const norm = s => String(s || '').replace(/[\s、。！？!?…〜~「」]/g, '');
const seen = new Map();
const ALLOW = new Set(['いいえ']); // já duplicado na 2.0: c1l4 (expressão) e c2l1 (leitura de hiragana)
const isCharLesson = it => it.lesson.kind === 'kana' || (it.lesson.cat && it.lesson.cat.id === 'c7') || it.lesson.kind === 'number';
Object.entries(ITEM).forEach(([id, it]) => {
  if (isCharLesson(it)) return;
  [...new Set([norm(it.jp), norm(it.say)].filter(Boolean))].forEach(k => {
    if (seen.has(k) && !ALLOW.has(k)) ok(false, 'palavra duplicada: ' + k + ' em ' + seen.get(k) + ' e ' + id); else seen.set(k, id);
  });
});

console.log(`Conteúdo: ${CATS.length} categorias, ${nLessons} lições, ${nItems} itens de lição, ${nEx} exercícios, ` +
  `${AUDIO_PACKS.reduce((a, p) => a + p.items.length, 0)} itens auditivos, ${PRON_SETS.length} pares de som, ${DIALOGS.length} diálogos.`);
console.log(fails ? fails + ' FALHA(S)' : 'TODOS OS TESTES PASSARAM');
process.exit(fails ? 1 : 0);
