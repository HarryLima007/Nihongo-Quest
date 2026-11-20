/* Conferência das leituras (opcional, para quem escreve conteúdo):
   compara a leitura que o dicionário morfológico kuromoji dá para o
   japonês (jp) com o romaji (ro) de cada item, exemplo e fala.
   Uso:  npm install kuromoji  &&  node tests/readings.js [prefixo-de-lição]
   Diferenças não são necessariamente erros (o dicionário erra leituras
   ambíguas como 何, 方, 今日), mas cada uma deve ser conferida à mão. */
const path = require('path');
let kuromoji; try { kuromoji = require('kuromoji'); } catch (e) { console.log('kuromoji não instalado: npm install kuromoji'); process.exit(0); }
const C = require('./load-content');
const ACCEPT = require('./readings-ok.json');
const only = process.argv[2] || '';

const K2R = {};
(() => {
  const base = 'あa い i う u え e お o か ka き ki く ku け ke こ ko が ga ぎ gi ぐ gu げ ge ご go さ sa し shi す su せ se そ so ざ za じ ji ず zu ぜ ze ぞ zo た ta ち chi つ tsu て te と to だ da ぢ ji づ zu で de ど do な na に ni ぬ nu ね ne の no は ha ひ hi ふ fu へ he ほ ho ば ba び bi ぶ bu べ be ぼ bo ぱ pa ぴ pi ぷ pu ぺ pe ぽ po ま ma み mi む mu め me も mo や ya ゆ yu よ yo ら ra り ri る ru れ re ろ ro わ wa を o ん n ゔ vu';
  const t = base.replace('あa', 'あ a').split(' ');
  for (let i = 0; i < t.length; i += 2) K2R[t[i]] = t[i + 1];
})();
const SMALL = { 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o' };
const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function kana2ro(s) {
  s = toHira(s); let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], n = s[i + 1];
    if (c === 'っ') { out += 'Q'; continue; }
    if (c === 'ー') { const m = out.match(/[aiueo]$/); out += m ? m[0] : ''; continue; }
    let r = K2R[c];
    if (r === undefined) continue;
    if (n && SMALL[n]) { const sm = SMALL[n]; if ('ゃゅょ'.includes(n)) r = /^(shi|chi|ji)$/.test(r) ? r.slice(0, -1) + sm.slice(1) : r.slice(0, -1) + sm; else r = r.slice(0, -1) + sm; i++; }
    out += r;
  }
  return out.replace(/Q(.)/g, '$1$1').replace(/Q/g, '');
}
const normRo = r => String(r).toLowerCase().replace(/[^a-z']/g, '').replace(/'/g, '');
const flat = r => r.replace(/ou/g, 'oo').replace(/ei/g, 'ee').replace(/([aiueo])\1+/g, '$1').replace(/tch/g, 'cch').replace(/n(?=[aiueoy])/g, 'n');

kuromoji.builder({ dicPath: path.join(path.dirname(require.resolve('kuromoji')), '../dict') }).build((err, tk) => {
  if (err) throw err;
  const reading = jp => tk.tokenize(jp).map(t => {
    if (t.pos === '記号') return '';
    if (t.pos === '助詞' && t.pronunciation) return t.pronunciation;
    if (/^[ぁ-ゟ゠-ヿー]+$/.test(t.surface_form)) return t.surface_form; // kana escrito: lê como está
    if (/^[0-9０-９]+$/.test(t.surface_form)) return '#';
    return t.pronunciation || t.reading || t.surface_form;
  }).join('');
  const rows = [];
  const check = (where, jp, ro) => {
    if (!jp || !ro || !/[一-鿿々]/.test(jp) || /[0-9０-９]/.test(jp)) return;
    if (only && !where.startsWith(only)) return;
    const a = flat(kana2ro(reading(jp.replace(/[〜~＿]/g, '')))), b = flat(normRo(ro));
    // partículas: は→wa, へ→e, を→o já vêm da pronúncia; compara sem as que o romaji separa
    const A = a.replace(/[^a-z]/g, ''), B = b;
    if (A !== B && !ACCEPT[where]) rows.push(where + '\n   jp: ' + jp + '\n   ro: ' + ro + '\n   kuromoji: ' + A + '\n   romaji:   ' + B);
  };
  C.CATS.forEach(c => c.lessons.forEach(l => {
    l.items.forEach(it => { if (l.kind === 'kanaword' && it.jp.length <= 2) return; check(l.id + ':' + it.k, it.jp, it.ro); if (it.ex) check(l.id + ':' + it.k + ':ex', it.ex.jp, it.ex.ro); });
    l.examples.forEach((e, i) => check(l.id + ':exemplo' + i, e.jp, e.ro));
    (l.text || []).forEach((e, i) => check(l.id + ':texto' + i, e.jp, e.ro));
  }));
  C.AUDIO_PACKS.forEach(p => p.items.forEach(it => { check(p.id + ':' + it.k, it.jp, it.ro); if (it.ex) check(p.id + ':' + it.k + ':ex', it.ex.jp, it.ex.ro); }));
  C.DIALOGS.forEach(d => d.lines.forEach((ln, i) => check(d.id + ':' + i, ln.jp, ln.ro)));
  console.log(rows.join('\n'));
  console.log(rows.length + ' leitura(s) para conferir.');
});
