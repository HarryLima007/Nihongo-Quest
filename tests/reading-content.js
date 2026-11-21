/* Testes de conteúdo da 9.0 — Japanese Reading (node; usa kuromoji, que já é usado por tests/readings.js)
   Uso: npm install kuromoji && node tests/reading-content.js
   Verifica: hiragana e katakana completos (básico, ゛/゜, combinados, っ/ッ, ー, sons estrangeiros),
   romaji de cada palavra (conversão kana → romaji própria), leituras de palavras com kanji e de frases
   (dicionário morfológico kuromoji), partes das frases, progressão (nada usa caractere ainda não estudado),
   cobertura (cada caractere aparece em palavras) e kanji com leituras em palavras reais. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = fs.readFileSync(path.resolve(__dirname, '../src/reading-data.js'), 'utf8');
const ctx = {}; vm.createContext(ctx); vm.runInContext(src + '\nthis.READ_COURSE = READ_COURSE; this.READ_SIMILAR = READ_SIMILAR; this.READ_SIGNS = READ_SIGNS;', ctx);
const { READ_COURSE, READ_SIMILAR, READ_SIGNS } = ctx;
let fails = 0, passes = 0; const ok = (c, m) => { if (c) passes++; else { fails++; console.log('FAIL ' + m); } };
const pass = m => console.log('PASS ' + m);

/* ---------- kana → romaji (Hepburn do app: ou, ee, ii; っ dobra; ー alonga) ---------- */
const K = {}; ('あa いi うu えe おo かka きki くku けke こko がga ぎgi ぐgu げge ごgo さsa しshi すsu せse そso ざza じji ずzu ぜze ぞzo たta ちchi つtsu てte とto だda ぢji づzu でde どdo なna にni ぬnu ねne のno はha ひhi ふfu へhe ほho ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa をo んn ゔvu').split(' ').forEach(t => { K[t[0]] = t.slice(1); });
const SPECIAL = { 'てぃ': 'ti', 'でぃ': 'di', 'うぃ': 'wi', 'うぇ': 'we', 'うぉ': 'wo', 'ふぁ': 'fa', 'ふぃ': 'fi', 'ふぇ': 'fe', 'ふぉ': 'fo', 'しぇ': 'she', 'じぇ': 'je', 'ちぇ': 'che', 'ゔぁ': 'va', 'ゔぃ': 'vi', 'ゔぇ': 've', 'ゔぉ': 'vo' };
const hira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function kana2ro(s, particles) {
  s = hira(s); let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], n = s[i + 1] || '';
    if (c === 'っ') { out += 'Q'; continue; }
    if (c === 'ー') { const m = out.match(/[aiueo]$/); out += m ? m[0] : ''; continue; }
    if (SPECIAL[c + n]) { out += SPECIAL[c + n]; i++; continue; }
    let r = K[c]; if (r === undefined) { out += c === ' ' ? ' ' : ''; continue; }
    if (n && 'ゃゅょ'.includes(n)) { const v = { 'ゃ': 'a', 'ゅ': 'u', 'ょ': 'o' }[n]; r = /^(shi|chi|ji)$/.test(r) ? r.slice(0, -1) + v : r.slice(0, -1) + 'y' + v; i++; }
    // partículas: は/へ no fim de um pedaço (antes de espaço ou do fim) podem ser "wa"/"e"
    if (particles && (c === 'は' || c === 'へ') && (i === s.length - 1 || /[\s]/.test(n))) r = c === 'は' ? 'wa' : 'e';
    out += r;
  }
  return out.replace(/Q(ch)/g, 't$1').replace(/Q(.)/g, '$1$1').replace(/Q/g, '');
}
const normRo = r => String(r).toLowerCase().replace(/[^a-z]/g, '');
const romajiOK = (kana, ro) => normRo(kana2ro(kana, true)) === normRo(ro) || normRo(kana2ro(kana, false)) === normRo(ro);

/* ---------- conjunto completo esperado ---------- */
const BASIC_H = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
const DAKU_H = 'がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ';
const YOON_H = 'きしちにひみりぎじびぴ'.split('').flatMap(c => ['ゃ', 'ゅ', 'ょ'].map(y => c + y));
const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const BASIC_K = toKata(BASIC_H), DAKU_K = toKata(DAKU_H);

/* ---------- parse ---------- */
const parseChar = s => { const [ch, ro, mn, note] = s.split('|'); return { ch, ro, mn, note }; };
const parseWord = s => { const f = s.split('|'); return f.length >= 4 && /[一-鿿々]/.test(f[0]) ? { jp: f[0].replace(/・/g, ''), seg: f[0].split('・'), kana: f[1].replace(/・/g, ''), kseg: f[1].split('・'), ro: f[2], pt: f[3] } : { jp: f[0], kana: f[0], ro: f[1], pt: f[2], tag: f[3] }; };
const parseSent = s => { const [jp, kana, ro, pt, parts, note] = s.split('|'); return { jp, kana, ro, pt, parts: (parts || '').split('/').filter(Boolean).map(p => p.split('=')), note }; };
const ids = new Set();
const allChars = { hira: [], kata: [] };
const known = new Set(' 　'.split(''));
const PUNCT = '。、！？「」…・〜';
let wordsChecked = 0, kanjiWords = 0, sentences = 0;
const usedLater = {}; // caractere → aparece em alguma palavra
const kanjiKnown = new Set();
const wordReadings = []; // para o kuromoji
READ_COURSE.forEach(st => {
  ok(['hira', 'kata', 'pal', 'kan', 'fra'].includes(st.id), 'etapa conhecida ' + st.id);
  st.lessons.forEach(L => {
    ok(!ids.has(L.id), 'id de lição único: ' + L.id); ids.add(L.id);
    ok(L.title && Array.isArray(L.intro) && L.intro.length, L.id + ': título e explicação em português');
    // caracteres da lição
    (L.chars || []).forEach(s => {
      const c = parseChar(s);
      ok(c.ch && c.ro && c.mn, L.id + ': caractere completo (símbolo, romaji, associação visual) ' + s);
      if (st.id === 'hira' || st.id === 'kata') allChars[st.id].push(c.ch);
      [...c.ch].forEach(ch => known.add(ch));
      if (!/^\(/.test(c.ro)) ok(normRo(kana2ro(c.ch)) === normRo(c.ro), L.id + ': romaji do caractere ' + c.ch + ' = ' + c.ro + ' (calculado ' + kana2ro(c.ch) + ')');
    });
    (L.kanji || []).concat(L.novo || []).forEach(s => { const [k, m, r, mn] = s.split('|'); ok(/^[一-鿿]$/.test(k) && m && r && mn, L.id + ': kanji completo (significado, leituras explicadas, associação) ' + k); ok(/[ぁ-ゖ]/.test(r) && /\([a-z]/.test(r), L.id + ': leituras de ' + k + ' explicadas com kana e romaji'); kanjiKnown.add(k); known.add(k); });
    (L.pairs || []).forEach(p => { const [cs, tip] = p.split('|'); cs.split(' ').forEach(ch => ok(known.has(ch), L.id + ': parecido ' + ch + ' já estudado')); ok(tip && cs.split(' ').length >= 2, L.id + ': par com dica ' + cs); });
    // palavras
    (L.words || []).forEach(s => {
      const w = parseWord(s); wordsChecked++;
      ok(w.jp && w.ro && w.pt, L.id + ': palavra completa ' + s);
      const bad = [...w.jp].filter(ch => !known.has(ch));
      ok(!bad.length, L.id + ': palavra ' + w.jp + ' só usa caracteres já estudados' + (bad.length ? ' (falta: ' + bad.join(' ') + ')' : ''));
      ok(romajiOK(w.kana, w.ro), L.id + ': romaji de ' + w.jp + ' (' + w.kana + ') = ' + w.ro + ' (calculado ' + kana2ro(w.kana, true) + ')');
      if (w.seg) { kanjiWords++; ok(w.seg.length === w.kseg.length, L.id + ': ' + s + ' escrita e leitura com o mesmo número de pedaços'); w.seg.forEach((g, i) => { if (!/[一-鿿]/.test(g)) ok(hira(g) === hira(w.kseg[i] || ''), L.id + ': ' + s + ' pedaço em kana igual na leitura (' + g + ')'); }); wordReadings.push({ where: L.id + ':' + w.jp, jp: w.jp, kana: w.kana, ro: w.ro }); }
      const k = hira(w.kana); for (let i = 0; i < k.length; i++) { usedLater[k[i]] = 1; if (k[i + 1] && 'ゃゅょぁぃぅぇぉ'.includes(k[i + 1])) usedLater[k[i] + k[i + 1]] = 1; }
      [...w.jp].forEach(ch => { usedLater['@' + ch] = 1; });
      for (let i = 0; i < w.jp.length; i++) if (w.jp[i + 1] && 'ャュョァィゥェォ'.includes(w.jp[i + 1])) usedLater['@' + w.jp[i] + w.jp[i + 1]] = 1;
    });
    (L.sentences || []).forEach(s => {
      const x = parseSent(s); sentences++;
      ok(x.jp && x.kana && x.ro && x.pt && x.parts.length, L.id + ': frase completa (japonês, leitura, romaji, tradução, partes) ' + x.jp);
      const bad = [...x.jp].filter(ch => !known.has(ch) && !PUNCT.includes(ch));
      ok(!bad.length, L.id + ': frase ' + x.jp + ' só usa o que já foi estudado ou apresentado como novo' + (bad.length ? ' (falta: ' + bad.join(' ') + ')' : ''));
      const strip = t => t.replace(/[。、！？「」…\s]/g, '');
      ok(strip(x.parts.map(p => p[0]).join('')) === strip(x.jp), L.id + ': as partes formam a frase ' + x.jp);
      ok(x.parts.every(p => p.length === 3 && p[2]), L.id + ': cada parte tem romaji e explicação ' + x.jp);
      const kanaOnly = !/[一-鿿]/.test(x.jp);
      if (kanaOnly) ok(strip(hira(x.jp)) === strip(hira(x.kana)), L.id + ': leitura da frase só em kana igual ao texto ' + x.jp);
      wordReadings.push({ where: L.id + ':' + x.jp, jp: x.jp, kana: x.kana, ro: x.ro, sent: true });
    });
  });
});
/* ---------- completude ---------- */
const H = allChars.hira, Kt = allChars.kata;
[...BASIC_H].forEach(c => ok(H.includes(c), 'hiragana básico presente: ' + c));
[...DAKU_H].forEach(c => ok(H.includes(c), 'hiragana com ゛/゜ presente: ' + c));
YOON_H.forEach(c => ok(H.includes(c), 'hiragana combinado presente: ' + c));
ok(H.includes('っ'), 'pequeno っ presente');
[...BASIC_K].forEach(c => ok(Kt.includes(c), 'katakana básico presente: ' + c));
[...DAKU_K].forEach(c => ok(Kt.includes(c), 'katakana com ゛/゜ presente: ' + c));
['ッ', 'ー', 'シャ', 'ジュ', 'チョ', 'ファ', 'ティ', 'ディ', 'ウィ', 'シェ', 'ヴ'].forEach(c => ok(Kt.includes(c), 'katakana especial presente: ' + c));
ok(READ_COURSE.find(s => s.id === 'hira').lessons.some(L => L.id === 'h17' && L.words.some(w => w.startsWith('わたしは')) && L.words.some(w => w.startsWith('がっこうへ'))), 'vogais longas e partículas は (wa) / へ (e) ensinadas');
/* ---------- cobertura: cada caractere aparece em pelo menos uma palavra ---------- */
const RARE = ['みゅ', 'ヲ', 'ヂ', 'ヅ'];
H.forEach(c => { if (c === 'っ' || RARE.includes(c)) return; ok(usedLater[c] || usedLater['@' + c], 'hiragana ' + c + ' aparece em alguma palavra'); });
Kt.forEach(c => { if (/^[ーッ]$/.test(c) || RARE.includes(c)) return; ok(usedLater['@' + c], 'katakana ' + c + ' aparece em alguma palavra'); });
/* ---------- kanji: cada um com pelo menos 2 palavras reais ---------- */
READ_COURSE.find(s => s.id === 'kan').lessons.forEach(L => L.kanji.forEach(s => { const k = s[0]; const n = READ_COURSE.flatMap(st => st.lessons.flatMap(l => (l.words || []).concat(l.sentences || []))).filter(w => w.split('|')[0].includes(k)).length; ok(n >= 2, 'kanji ' + k + ' aparece em ' + n + ' palavras/frases (mínimo 2)'); }));
/* ---------- parecidos e placas ---------- */
READ_SIMILAR.forEach(g => ok([...g].every(c => H.includes(c) || Kt.includes(c)), 'grupo de parecidos só com caracteres do curso: ' + g));
const palWords = new Set(READ_COURSE.flatMap(s => s.lessons.flatMap(l => (l.words || []).map(w => w.split('|')[0]))));
Object.keys(READ_SIGNS).forEach(p => READ_SIGNS[p].forEach(w => ok(palWords.has(w), 'placa do mundo (' + p + ') é palavra estudada no curso: ' + w)));
pass('estrutura: ' + ids.size + ' lições, ' + H.length + ' hiragana, ' + Kt.length + ' katakana, ' + kanjiKnown.size + ' kanji, ' + wordsChecked + ' palavras, ' + sentences + ' frases');

/* ---------- leituras com kuromoji ---------- */
let kuromoji; try { kuromoji = require('kuromoji'); } catch (e) { console.log('FAIL kuromoji não instalado (npm install kuromoji): leituras com kanji não verificadas'); process.exit(1); }
/* Diferenças aceitas, uma a uma: o kuromoji escolhe UMA leitura sem contexto para kanji isolados e não
   conhece leituras especiais de datas/contagem. Cada uma foi conferida à mão. */
const ACCEPT = {
  'j2:二日': 'ふつか (dia 2) é a leitura de data; kuromoji lê ににち',
  'j2:三日': 'みっか (dia 3) é a leitura de data',
  'j2:一日': 'ついたち (dia 1 do mês): leitura especial; いちにち (um dia) também existe',
  'j5:土': 'つち (terra) sozinho; kuromoji escolhe ど',
  'j6:二人': 'ふたり: leitura especial',
  'j6:一人': 'ひとり: leitura especial',
  'j8:三本': 'さんぼん (contador; kuromoji lê さんほん)'
};
kuromoji.builder({ dicPath: path.join(path.dirname(require.resolve('kuromoji')), '../dict') }).build((err, tk) => {
  if (err) { console.log('FAIL kuromoji: ' + err.message); process.exit(1); }
  const reading = jp => tk.tokenize(jp).map(t => {
    if (t.pos === '記号') return '';
    if (t.pos === '助詞' && t.pronunciation) return t.pronunciation;
    if (/^[ぁ-ゟ゠-ヿー]+$/.test(t.surface_form)) return t.surface_form;
    return t.reading || t.surface_form;
  }).join('');
  const readingPron = jp => tk.tokenize(jp).map(t => t.pos === '記号' ? '' : (/^[ぁ-ゟ゠-ヿー]+$/.test(t.surface_form) && t.pos !== '助詞') ? t.surface_form : (t.pronunciation || t.reading || t.surface_form)).join('').replace(/ニッポン/g, 'ニホン');
  const flat = r => normRo(r).replace(/ou/g, 'oo').replace(/ei/g, 'ee').replace(/([aiueo])\1+/g, '$1');
  let diff = 0, accepted = 0; const usedAccept = new Set();
  wordReadings.forEach(w => {
    const clean = w.jp.replace(/[「」…]/g, '');
    // 日本 tem duas leituras corretas (にほん, a mais comum, e にっぽん); o kuromoji sempre escolhe にっぽん
    const kuro = hira(reading(clean)).replace(/[^ぁ-ゖー]/g, '').replace(/にっぽん/g, 'にほん');
    const mine = hira(w.kana).replace(/[^ぁ-ゖー]/g, '');
    // 1) leitura em kana: kuromoji (escrita) × leitura do curso, comparando o som (ou/oo, ei/ee)
    const same = flat(kana2ro(kuro)) === flat(kana2ro(mine)) || flat(kana2ro(hira(readingPron(clean)))) === flat(kana2ro(mine)) || (w.sent && romajiSent(mine, kana2ro(hira(readingPron(clean))))) || (w.sent && romajiSent(mine, kana2ro(kuro)));
    // 2) romaji: pronúncia (partículas は→wa, へ→e, を→o) × romaji do curso
    const roOK = flat(kana2ro(hira(readingPron(clean)))) === flat(w.ro) || flat(kana2ro(mine, true)) === flat(w.ro) || (w.sent && flat(kana2ro(mine).replace(/ha(?=[^aiueo]|$)/g, 'wa')) === flat(w.ro));
    if (!same) { if (ACCEPT[w.where]) { accepted++; usedAccept.add(w.where); } else { diff++; console.log('FAIL leitura (kuromoji) ' + w.where + '\n   curso: ' + mine + '\n   kuromoji: ' + kuro); } }
    else passes++;
    // o romaji do curso precisa bater com a leitura do curso (com partículas) ou com a pronúncia do kuromoji
    const roMine = flat(kana2ro(mine, true)) === flat(w.ro) || roOK || romajiSent(mine, w.ro);
    ok(roMine, 'romaji ' + w.where + ': ' + w.ro + ' (leitura ' + mine + ')');
  });
  function romajiSent(kana, ro) {
    // frases: は, へ e を como partículas podem soar wa / e / o; testa as combinações possíveis
    const pos = []; for (let i = 0; i < kana.length; i++) if (kana[i] === 'は' || kana[i] === 'へ') pos.push(i);
    for (let m = 0; m < (1 << Math.min(pos.length, 10)); m++) { let s = kana.split(''); pos.forEach((p, j) => { if (m & (1 << j)) s[p] = s[p] === 'は' ? 'わ' : 'え'; }); if (flat(kana2ro(s.join(''))) === flat(ro)) return true; }
    return false;
  }
  Object.keys(ACCEPT).forEach(k => ok(usedAccept.has(k), 'exceção aceita é realmente necessária (senão, remova): ' + k));
  pass('leituras com kanji conferidas pelo kuromoji: ' + wordReadings.length + ' (' + accepted + ' leituras especiais/isoladas aceitas, ' + diff + ' diferenças)');
  console.log('\n' + (fails ? fails + ' FALHA(S)' : 'OK') + ' — ' + passes + ' verificações');
  process.exit(fails ? 1 : 0);
});
