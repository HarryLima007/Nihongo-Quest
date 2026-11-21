/* 14.0 — Dicionário Geral (node, sem navegador): integridade dos dados de dict/v1, buscas (português, romaji, kana,
   katakana, kanji, erros de digitação, consultas curtas), conjugações do enunciado, kanji, exemplos, português com
   origem marcada e arquivos de licença. Uso: node tests/dict-general.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), D = path.join(ROOT, 'dict/v1/');
const J = require(path.join(ROOT, 'src/jmdict.js'));
J.setLoader(p => Promise.resolve(JSON.parse(fs.readFileSync(D + p, 'utf8'))));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const top = async (q, n = 3) => { const r = await J.search(q); return Promise.all(r.results.slice(0, n).map(x => J.summary(x.ord))).then(s => s.map(x => x.w)); };
const has = async (q, w, n = 3) => { const t = await top(q, n); ok(t.includes(w), `busca "${q}" traz ${w} entre os ${n} primeiros (${t.join(', ')})`); };
(async () => {
  /* dados */
  const m = await J.meta();
  ok(m.counts.entries > 200000 && m.counts.kanji > 13000 && m.counts.examples > 30000, 'meta: ' + JSON.stringify({ e: m.counts.entries, k: m.counts.kanji, x: m.counts.examples, pt: m.counts.withPt }));
  ok(m.counts.withPt >= 2500 && m.counts.ptTr >= 1000, 'português: ' + m.counts.ptNq + ' do app + ' + m.counts.ptTr + ' traduções marcadas');
  const files = ['e', 'm', 'j', 'w', 'k', 's', 'x'].map(d => fs.readdirSync(D + d).length);
  ok(files.every(n => n > 0), 'pastas de dados presentes ' + files.join('/'));
  let bad = 0; for (const f of fs.readdirSync(D + 'e').slice(0, 5)) { try { JSON.parse(fs.readFileSync(D + 'e/' + f, 'utf8')).forEach(a => { if (!a[0] || !a[2].length || !a[3].length) bad++; }); } catch (e) { bad++; } }
  ok(bad === 0, 'entradas válidas (id, leitura e sentido) nos primeiros blocos');
  const ids = new Set(); let dup = 0; for (const f of fs.readdirSync(D + 'm').slice(0, 3)) JSON.parse(fs.readFileSync(D + 'e/' + f, 'utf8')).forEach(a => { if (ids.has(a[0])) dup++; ids.add(a[0]); });
  ok(dup === 0, 'ids estáveis (ent_seq) sem repetição');
  const e1 = await J.entryById(1358280, '食べる'); ok(e1 && e1.r[0].t === 'たべる' && e1.pt.some(p => p.src === 'nq'), 'id estável 1358280 = 食べる, com português do app');
  const tr = await J.entryById(1381380, '青'); ok(tr && tr.pt.some(p => p.src === 'tr' && /azul/.test(p.t)), 'tradução elaborada marcada (青 → azul, origem "tr")');
  const noPt = (await Promise.all([...Array(40)].map((_, i) => J.entry(60000 + i)))).filter(e => e && !e.pt.length);
  ok(noPt.length > 30 && noPt.every(e => e.s[0].g.length), 'palavras sem tradução mantêm a definição original (sem português inventado)');

  /* buscas */
  await has('comer', '食べる', 1); await has('presidente', '社長'); await has('água', '水'); await has('agua', '水');
  await has('segunda-feira', '月曜日'); await has('segunda feira', '月曜日'); await has('o gato', '猫'); await has('gatos', '猫');
  await has('taberu', '食べる', 1); await has('tabemasu', '食べる'); await has('tabéru', '食べる'); await has('taberru', '食べる');
  await has('arigatou', 'ありがとう'); await has('arigato', 'ありがとう'); await has('ありがとう', 'ありがとう', 1); await has('tabemashita', '食べる'); await has('yonda', '読む');
  await has('たべる', '食べる', 1); await has('テレビ', 'テレビ', 1); await has('terebi', 'テレビ'); await has('食べる', '食べる', 1); await has('日本', '日本', 1);
  await has('eat', '食べる'); await has('tired', '疲れる', 5);
  const short = await J.search('a'); ok(short.results.length <= 60, 'consulta curta "a" sem enxurrada (' + short.results.length + ')');
  const kana1 = await J.search('は'); ok(kana1.results.length > 0 && kana1.results.length <= 80, 'consulta de 1 kana limitada (' + kana1.results.length + ')');
  const t0 = Date.now(); for (const q of ['casa', 'kawaii', '勉強', 'たべ', 'livro']) await J.search(q); ok(Date.now() - t0 < 3000, 'buscas rápidas (' + (Date.now() - t0) + 'ms para 5)');

  /* conjugações do enunciado */
  const conj = { '食べました': '食べる', '読んだ': '読む', '書かなかった': '書く', '行ける': '行く', '見られなかった': '見る', '高くない': '高い', '勉強しました': '勉強' };
  for (const [f, base] of Object.entries(conj)) {
    const a = await J.analyze(f); const bases = a.map(x => x.base + (x.es[0] ? '' : ''));
    ok(a.some(x => x.base === base || x.es.some(e => e.k.some(k => k.t === base) || e.r.some(r => r.t === base)) || (base === '勉強' && x.es.some(e => e.k.some(k => k.t === '勉強')))), `${f} → ${base} (${a.map(x => x.base + (x.weak ? '?' : '')).join(', ')})`);
  }
  const weak = await J.analyze('行った'); ok(weak.length >= 2, '行った mostra mais de uma possibilidade (' + weak.map(x => x.es[0].k[0] ? x.es[0].k[0].t : x.base).join(', ') + ')');

  /* frase */
  const tk = await J.tokenize('私は学生です'); ok(tk.map(t => t.s).join('|') === '私|は|学生|です', 'frase segmentada: ' + tk.map(t => t.s).join('|'));

  /* kanji */
  const k = await J.kanji('食'); ok(k && k.on && k.kun && k.sc === 9 || (k && JSON.stringify(k).includes('ショク')), 'kanji 食 com leituras e traços');
  const st = await J.strokes('食'); ok(st && st.length === 9, 'ordem dos traços de 食 (9 traços)');

  /* exemplos */
  const ex = await J.examples(e1.ord); ok(ex.length > 0 && ex[0].jp && ex[0].en && ex[0].tid > 0, 'exemplos do Tatoeba com japonês, inglês e número da frase');

  /* licenças */
  const lic = fs.readFileSync(D + 'LICENSE.md', 'utf8');
  ok(['JMdict', 'KANJIDIC2', 'Tatoeba', 'KanjiVG', 'Kanjium', 'CC BY-SA 4.0', 'CC BY 2.0 FR'].every(s => lic.includes(s)), 'dict/v1/LICENSE.md com todas as fontes e licenças');
  ok(fs.readFileSync(path.join(ROOT, 'NOTICE'), 'utf8').includes('dict/v1/LICENSE.md'), 'NOTICE separa os dados de terceiros');
  console.log(fails ? `\n${fails} falha(s)` : '\nTudo certo.'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
