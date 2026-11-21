/* Conferência do conteúdo da Academia de Vocabulário (12.0):
   - formato de cada linha (kanji|kana|romaji|sentidos|classe|nota|exJP|exRo|exPt);
   - romaji coerente com o kana (o mesmo critério de tests/readings.js);
   - ids de categoria/lição únicos, lições de 5 a 10 palavras, sem palavra repetida;
   - exemplo contém a palavra e tem tradução;
   - (com kuromoji instalado) leitura do kanji conferida pelo dicionário morfológico.
   Uso: node tests/vocab-content.js   (kuromoji: npm install --no-save kuromoji) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = fs.readFileSync(path.resolve(__dirname, '../src/vocab-data.js'), 'utf8');
const ctx = {}; vm.createContext(ctx); vm.runInContext(src + ';this.VOCAB_CATS = VOCAB_CATS;', ctx);
const CATS = ctx.VOCAB_CATS;
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const K2R = {};
(() => { const t = 'あ a い i う u え e お o か ka き ki く ku け ke こ ko が ga ぎ gi ぐ gu げ ge ご go さ sa し shi す su せ se そ so ざ za じ ji ず zu ぜ ze ぞ zo た ta ち chi つ tsu て te と to だ da ぢ ji づ zu で de ど do な na に ni ぬ nu ね ne の no は ha ひ hi ふ fu へ he ほ ho ば ba び bi ぶ bu べ be ぼ bo ぱ pa ぴ pi ぷ pu ぺ pe ぽ po ま ma み mi む mu め me も mo や ya ゆ yu よ yo ら ra り ri る ru れ re ろ ro わ wa を o ん n ゔ vu'.split(' '); for (let i = 0; i < t.length; i += 2) K2R[t[i]] = t[i + 1]; })();
const SMALL = { 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o' };
const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function kana2ro(s) {
  s = toHira(s); let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], n = s[i + 1];
    if (c === 'っ') { out += 'Q'; continue; }
    if (c === 'ー') { const m = out.match(/[aiueo]$/); out += m ? m[0] : ''; continue; }
    let r = K2R[c]; if (r === undefined) continue;
    if (n && SMALL[n]) { const sm = SMALL[n]; if ('ゃゅょ'.includes(n)) r = /^(shi|chi|ji)$/.test(r) ? r.slice(0, -1) + sm.slice(1) : r.slice(0, -1) + sm; else r = r.slice(0, -1) + sm; i++; }
    out += r;
  }
  return out.replace(/Q(.)/g, '$1$1').replace(/Q/g, '');
}
const macron = s => s.replace(/ā/g, 'aa').replace(/ī/g, 'ii').replace(/ū/g, 'uu').replace(/ē/g, 'ee').replace(/ō/g, 'ou');
const flat = r => r.replace(/ou/g, 'oo').replace(/ei/g, 'ee').replace(/([aiueo])\1+/g, '$1').replace(/n'/g, 'n');
const normRo = r => macron(String(r).toLowerCase()).replace(/[^a-z']/g, '');

const words = [], bad = [], badRo = [], badEx = [];
const catIds = new Set(), lessonIds = new Set(); let dupIds = 0;
CATS.forEach(c => {
  if (catIds.has(c.id)) dupIds++; catIds.add(c.id);
  c.lessons.forEach(L => {
    if (lessonIds.has(L.id)) dupIds++; lessonIds.add(L.id);
    if (L.words.length < 5 || L.words.length > 10) bad.push(L.id + ': ' + L.words.length + ' palavras');
    L.words.forEach(line => {
      const f = line.split('|');
      if (f.length < 4 || f.length > 9 || !f[1] || !f[2] || !f[3]) { bad.push(L.id + ': ' + line); return; }
      const [k, kana, ro, senses, pos, note, exJp, exRo, exPt] = f;
      words.push({ L: L.id, k, kana, ro, senses });
      if (!/^[ぁ-ゖァ-ヺー・]+$/.test(kana)) bad.push(L.id + ': kana inválido ' + kana);
      if (flat(normRo(kana2ro(kana))) !== flat(normRo(ro).replace(/'/g, ''))) badRo.push(`${L.id} ${k || kana} ${kana} ≠ ${ro} (${kana2ro(kana)})`);
      if (exJp && (!exPt || !(exJp.includes(k || kana) || exJp.includes(kana)))) badEx.push(`${L.id} ${k || kana}: ${exJp}`);
    });
  });
});
ok(CATS.length >= 20, CATS.length + ' categorias');
ok(words.length >= 600, words.length + ' palavras');
ok(dupIds === 0, 'ids de categoria e lição únicos');
ok(bad.length === 0, 'formato das linhas e tamanho das lições ' + bad.slice(0, 5).join(' | '));
ok(badRo.length === 0, 'romaji coerente com o kana ' + badRo.slice(0, 8).join(' | '));
ok(badEx.length <= Math.ceil(words.length * 0.05), 'exemplos contêm a palavra (' + badEx.length + ' conjugados/flexionados) ' + badEx.slice(0, 4).join(' | '));
const seen = {}; words.forEach(w => { const key = (w.k || w.kana) + '|' + w.kana; (seen[key] = seen[key] || []).push(w.L); });
const dups = Object.entries(seen).filter(([, v]) => v.length > 1);
ok(dups.length === 0, 'nenhuma palavra repetida entre lições ' + dups.slice(0, 5).map(([k, v]) => k + ' ' + v.join(',')).join(' | '));

let kuromoji; try { kuromoji = require('kuromoji'); } catch (e) { console.log('(kuromoji não instalado: leitura dos kanji não conferida)'); finish(); return; }
kuromoji.builder({ dicPath: path.join(path.dirname(require.resolve('kuromoji')), '../dict') }).build((err, tk) => {
  if (err) throw err;
  const reading = jp => toHira(tk.tokenize(jp).map(t => t.reading && t.reading !== '*' ? t.reading : t.surface_form).join(''));
  const diff = words.filter(w => w.k && /[一-鿿]/.test(w.k)).filter(w => { const r = reading(w.k); return flat(kana2ro(r)) !== flat(kana2ro(w.kana)); }).map(w => `${w.k} ${w.kana} (kuromoji: ${reading(w.k)})`);
  console.log('kanji com leitura diferente do kuromoji (conferir à mão): ' + diff.length); diff.forEach(d => console.log('   ' + d));
  ok(diff.length <= 25, 'leituras dos kanji conferidas com o kuromoji (' + diff.length + ' diferenças, ver lista)');
  finish();
});
function finish() { console.log(fails ? fails + ' FALHA(S)' : 'TUDO OK'); process.exit(fails ? 1 : 0); }
