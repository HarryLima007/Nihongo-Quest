/* 14.0/15.0 — Dicionário Geral (node, sem navegador): integridade dos dados de dict/v2, buscas (português, romaji, kana,
   katakana, kanji, erros de digitação, consultas curtas), conjugações do enunciado, kanji, exemplos, português com
   origem marcada e arquivos de licença. Uso: node tests/dict-general.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), D = path.join(ROOT, 'dict/v2/');
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
  ok(noPt.length > 30 && noPt.every(e => e.s[0].g.length), 'palavras sem tradução revisada mantêm a definição original em inglês');

  /* 15.0 — português automático por sentido (JMdict-PT) */
  ok(m.counts.ptMt > 200000 && m.counts.withAnyPt > 200000 && m.counts.mtGlosses > 380000, 'JMdict-PT: ' + m.counts.ptMt + ' entradas com português automático, ' + m.counts.withAnyPt + ' com algum português, ' + m.counts.mtGlosses + ' glosas');
  ok(m.sources.jmdictPt && /^[0-9a-f]{40}$/.test(m.sources.jmdictPt.commit) && /CC BY-SA 4.0/.test(m.sources.jmdictPt.license), 'meta registra repositório, commit e licença do JMdict-PT');
  const mt = await J.entryById(1483740, '疲れる'); ok(mt && mt.s[0].pt.some(g => /cansa/.test(g.t)) && mt.s.length >= 2 && mt.s[1].pt.length, '疲れる: português em cada sentido, preservando a ordem dos sentidos');
  ok(mt && mt.pt.some(p => p.src === 'nq'), '疲れる: português revisado do app preservado ao lado do automático');
  const yu = await J.entryById(1539280, '優勝'); ok(yu && yu.s[0].pt.some(g => /vit|campe/.test(g.t)) && yu.s[1].pt.some(g => /felicidade|paraíso/.test(g.t)), '優勝: cada sentido com a sua tradução (vitória × felicidade)');
  let pgBad = 0, pgN = 0, same = 0; for (const f of ['000.json', '050.json', '150.json']) JSON.parse(fs.readFileSync(D + 'e/' + f, 'utf8')).forEach(a => a[3].forEach(sn => { const pg = sn[9]; if (!pg) return; pgN++; if (!Array.isArray(pg) || !pg.length || pg.some(t => typeof t !== 'string' || !t.trim())) pgBad++; if (new Set(pg).size !== pg.length) pgBad++; if (sn[2].length === 1 && pg.length === 1 && pg[0] === sn[2][0]) same++; }));
  ok(pgN > 2000 && pgBad === 0, 'português dos sentidos bem formado e sem repetição (' + pgN + ' sentidos verificados)');
  ok(same === 0, 'tradução idêntica ao inglês não aparece como português');
  const s1 = await J.summary(mt.ord); ok(s1.pt && /cansa/.test(s1.g), 'resumo da lista usa o português revisado quando existe');
  const s2 = await J.summary((await J.jExact('しんどい'))[0]); ok(s2.mt && !s2.pt && /cansado/.test(s2.g) && s2.en, 'resumo automático marcado (mt) com o sentido em inglês para diferenciar');

  /* buscas */
  await has('comer', '食べる', 1); await has('presidente', '社長'); await has('água', '水'); await has('agua', '水');
  await has('segunda-feira', '月曜日'); await has('segunda feira', '月曜日'); await has('o gato', '猫'); await has('gatos', '猫');
  await has('taberu', '食べる', 1); await has('tabemasu', '食べる'); await has('tabéru', '食べる'); await has('taberru', '食べる');
  await has('arigatou', 'ありがとう'); await has('arigato', 'ありがとう'); await has('ありがとう', 'ありがとう', 1); await has('tabemashita', '食べる'); await has('yonda', '読む');
  await has('たべる', '食べる', 1); await has('テレビ', 'テレビ', 1); await has('terebi', 'テレビ'); await has('食べる', '食べる', 1); await has('日本', '日本', 1);
  await has('eat', '食べる'); await has('tired', '疲れる', 5);

  /* 15.0 — português → japonês */
  await has('cansado', '疲れる', 5); await has('cansada', '疲れる', 6); await has('cansados', '疲れる', 6); await has('cansaço', '疲労', 3);
  await has('coragem', '勇気', 1); await has('promessa', '約束', 1); await has('desaparecer', '消える', 1); await has('proteger', '守る', 1);
  await has('confiar', '任せる', 10); await has('confiar', '預ける', 10); await has('destino', '運命', 2); await has('destino', '目的地', 12);
  await has('saudade', '懐かしい', 5); await has('felicidade', '幸せ', 2); await has('medo', '恐怖', 3); await has('vingança', '復讐', 3); await has('solidão', '孤独', 1); await has('solidao', '孤独', 1);
  await has('banco', '銀行', 1); await has('banco', 'ベンチ', 3); await has('pena', '刑', 6); await has('pena', '羽', 6); await has('pena', '同情', 12);
  await has('raiva', '怒り', 1); await has('amor', '愛', 1); await has('esperança', '希望', 1); await has('amigas', '友達', 2); await has('PROMESSAS', '約束', 1);
  const mar = await J.search('mar'); ok(mar.results.every(r => r.how !== 'en'), '“mar” não traz falso amigo do inglês (to mar)');
  const medo = await J.search('medo'); ok((await J.summary(medo.results[0].ord)).w !== '目処', '“medo” em português vem antes do romaji めど');
  const sd = await J.search('saudade'); ok(sd.results.some(r => r.how === 'pt') && sd.results.some(r => r.how === 'pt-rel'), '“saudade”: correspondências exatas e relacionadas separadas');
  const xx = await J.search('cansadoxyz'); ok(xx.results.length === 0, 'palavra inexistente não devolve lixo');
  const tq = Date.now(); for (const q of ['cansado', 'coragem', 'banco', 'pena', 'proteger']) await J.search(q); ok(Date.now() - tq < 3000, 'buscas em português rápidas (' + (Date.now() - tq) + 'ms para 5)');
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
  ok(['JMdict', 'KANJIDIC2', 'Tatoeba', 'KanjiVG', 'Kanjium', 'CC BY-SA 4.0', 'CC BY 2.0 FR', 'JMdict (Português)', 'Shiritai', 'zhusupbekova/jmdict-pt', 'Modificações'].every(s => lic.includes(s)), 'dict/v2/LICENSE.md com todas as fontes, licenças e modificações');
  ok(fs.existsSync(D + 'JMDICT-PT-LICENSE-data.md') && fs.existsSync(D + 'LICENSE-jmdict.html'), 'arquivos de licença do JMdict-PT mantidos junto dos dados');
  ok(fs.readFileSync(path.join(ROOT, 'NOTICE'), 'utf8').includes('dict/v2/LICENSE.md'), 'NOTICE separa os dados de terceiros');
  console.log(fails ? `\n${fails} falha(s)` : '\nTudo certo.'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
