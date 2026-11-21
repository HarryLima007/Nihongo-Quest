/* ==========================================================
   Nihongo Quest 14.0 — DICIONÁRIO GERAL: motor (sem interface)
   Base: dict/v1/ (gerada por tools/dict/build-dict.mjs a partir do JMdict, KANJIDIC2, Tatoeba,
   KanjiVG e Kanjium — licenças em dict/v1/LICENSE.md). Tudo é carregado sob demanda, em blocos
   pequenos, e fica guardado pelo service worker (sw.js) para funcionar sem internet.
   - Posição (ord) = ordem de frequência: as palavras comuns ficam nos primeiros blocos.
   - Identificador estável de uma entrada = número do JMdict (ent_seq), campo i.
   - Este arquivo não usa o DOM: os testes (tests/dict-general.js) o carregam no Node.
   ========================================================== */
const JMD = (() => {
  const BASE = 'dict/v1/';
  let loader = p => fetch(BASE + p, { cache: 'force-cache' }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + p); return r.json(); });
  const files = new Map(); // caminho -> Promise (com limite: os blocos menos usados saem da memória)
  const MAX_FILES = 90;
  function get(p) {
    let pr = files.get(p);
    if (pr) { files.delete(p); files.set(p, pr); return pr; }
    pr = loader(p).catch(e => { files.delete(p); throw e; });
    files.set(p, pr);
    if (files.size > MAX_FILES) { const k = files.keys().next().value; if (k !== 'meta.json') files.delete(k); }
    return pr;
  }
  let META = null, metaErr = null;
  async function meta() { if (META) return META; try { META = await get('meta.json'); metaErr = null; return META; } catch (e) { metaErr = e; throw e; } }
  async function available() { try { await meta(); return true; } catch (e) { return false; } }

  /* ---------- kana ---------- */
  const hira = s => String(s || '').replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  const kata = s => String(s || '').replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  const strip = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const isJp = s => /[぀-ヿ㐀-䶿一-鿿々〆ヶ０-９Ａ-ｚ]/.test(s || '');
  const isKanjiCh = ch => /[一-鿿㐀-䶿々〆]/.test(ch) || (ch && ch.codePointAt(0) >= 0x20000 && ch.codePointAt(0) <= 0x3134f);
  const hasKanji = s => [...String(s || '')].some(isKanjiCh);
  const RT = {};
  ('a:あ i:い u:う e:え o:お ka:か ki:き ku:く ke:け ko:こ sa:さ shi:し si:し su:す se:せ so:そ ta:た chi:ち ti:ち tsu:つ tu:つ te:て to:と ' +
    'na:な ni:に nu:ぬ ne:ね no:の ha:は hi:ひ fu:ふ hu:ふ he:へ ho:ほ ma:ま mi:み mu:む me:め mo:も ya:や yu:ゆ yo:よ ra:ら ri:り ru:る re:れ ro:ろ ' +
    'wa:わ wi:ゐ we:ゑ wo:を ga:が gi:ぎ gu:ぐ ge:げ go:ご za:ざ ji:じ zi:じ zu:ず ze:ぜ zo:ぞ da:だ di:ぢ du:づ de:で do:ど ba:ば bi:び bu:ぶ be:べ bo:ぼ ' +
    'pa:ぱ pi:ぴ pu:ぷ pe:ぺ po:ぽ kya:きゃ kyu:きゅ kyo:きょ sha:しゃ shu:しゅ sho:しょ she:しぇ sya:しゃ syu:しゅ syo:しょ cha:ちゃ chu:ちゅ cho:ちょ che:ちぇ ' +
    'tya:ちゃ tyu:ちゅ tyo:ちょ cya:ちゃ cyu:ちゅ cyo:ちょ nya:にゃ nyu:にゅ nyo:にょ hya:ひゃ hyu:ひゅ hyo:ひょ mya:みゃ myu:みゅ myo:みょ rya:りゃ ryu:りゅ ryo:りょ ' +
    'gya:ぎゃ gyu:ぎゅ gyo:ぎょ ja:じゃ ju:じゅ jo:じょ je:じぇ jya:じゃ jyu:じゅ jyo:じょ zya:じゃ zyu:じゅ zyo:じょ dya:ぢゃ dyu:ぢゅ dyo:ぢょ ' +
    'bya:びゃ byu:びゅ byo:びょ pya:ぴゃ pyu:ぴゅ pyo:ぴょ fa:ふぁ fi:ふぃ fe:ふぇ fo:ふぉ fyu:ふゅ va:ゔぁ vi:ゔぃ vu:ゔ ve:ゔぇ vo:ゔぉ ' +
    'thi:てぃ dhi:でぃ dhu:でゅ twu:とぅ dwu:どぅ wha:うぁ whi:うぃ whe:うぇ who:うぉ tsa:つぁ tse:つぇ tso:つぉ ye:いぇ ' +
    'xa:ぁ xi:ぃ xu:ぅ xe:ぇ xo:ぉ la:ぁ li:ぃ lu:ぅ le:ぇ lo:ぉ xya:ゃ xyu:ゅ xyo:ょ xtsu:っ xtu:っ ltu:っ').split(' ').forEach(p => { const [a, b] = p.split(':'); RT[a] = b; });
  /* romaji → hiragana. Aceita Hepburn, Kunrei e digitação de teclado (shi/si, tsu/tu, ou/ō/oo, n/nn/n', consoante dobrada).
     Devolve '' quando sobra algo que não é romaji (aí a consulta é tratada só como português/inglês). */
  function toKana(q) {
    let s = strip(String(q || '').toLowerCase()).replace(/[âāà]/g, 'aa').replace(/[îīì]/g, 'ii').replace(/[ûūù]/g, 'uu').replace(/[êēè]/g, 'ee').replace(/[ôōò]/g, 'ou');
    s = s.replace(/\s+/g, '').replace(/[-‐]/g, 'ー');
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i], n1 = s[i + 1] || '';
      if (c === 'ー') { out += 'ー'; i++; continue; }
      if (c === "'") { i++; continue; }
      if (c === 'n') {
        if (n1 === "'") { out += 'ん'; i += 2; continue; }
        if (n1 === 'n' && !'aiueoy'.includes(s[i + 2] || '_')) { out += 'ん'; i += 2; continue; }
        if (!n1 || !'aiueoy'.includes(n1)) { out += 'ん'; i++; continue; }
      }
      if (c === 'm' && 'bpm'.includes(n1) && n1) { out += 'ん'; i++; continue; }
      if (c === n1 && /[bcdfghjkpqrstvwxyz]/.test(c)) { out += 'っ'; i++; continue; }
      if (c === 't' && n1 === 'c' && s[i + 2] === 'h') { out += 'っ'; i++; continue; }
      let hit = false;
      for (const L of [4, 3, 2, 1]) { const k = s.substr(i, L); if (RT[k]) { out += RT[k]; i += L; hit = true; break; } }
      if (!hit) return '';
    }
    return out;
  }
  const RK = {}; Object.keys(RT).sort((a, b) => a.length - b.length || (a < b ? -1 : 1)).forEach(k => { if (!/^(si|ti|tu|hu|zi|di|du|sy|ty|cy|zy|jy|x|l|wh|tw|dw|dh|th|wi|we)/.test(k) || !RK[RT[k]]) { if (!RK[RT[k]] || /^(shi|chi|tsu|fu|ji|sh|ch|j)/.test(k)) RK[RT[k]] = k; } });
  RK['ぢ'] = 'ji'; RK['づ'] = 'zu'; RK['を'] = 'o'; RK['ゐ'] = 'i'; RK['ゑ'] = 'e';
  /* kana → romaji (Hepburn moderno, sem macrons: とうきょう = toukyou, como o resto do app) */
  function toRomaji(kana) {
    const s = hira(kana); let out = '';
    for (let i = 0; i < s.length; i++) {
      const two = s.substr(i, 2);
      if (/[ゃゅょぁぃぅぇぉ]/.test(s[i + 1] || '') && RK[two]) { out += RK[two]; i++; continue; }
      const ch = s[i];
      if (ch === 'っ') { const nx = RK[s.substr(i + 1, /[ゃゅょ]/.test(s[i + 2] || '') ? 2 : 1)] || ''; out += nx.startsWith('ch') ? 't' : nx[0] || ''; continue; }
      if (ch === 'ん') { out += /^[aiueoy]/.test(RK[s[i + 1]] || '') ? "n'" : 'n'; continue; }
      if (ch === 'ー') { const m = out.match(/[aiueo]$/); out += m ? m[0] : ''; continue; }
      out += RK[ch] || (/[a-z0-9]/i.test(ch) ? ch.toLowerCase() : /[\s　・]/.test(ch) ? ' ' : '');
    }
    return out;
  }
  /* chave fonética: ignora vogal longa e grafias alternativas (toukyou = tokyo = tōkyō; shi = si) */
  function phon(s) {
    let r = /[぀-ヿ]/.test(s) ? toRomaji(s) : strip(String(s).toLowerCase());
    return r.replace(/[^a-z]/g, '').replace(/sh/g, 's').replace(/ch/g, 't').replace(/ts/g, 't').replace(/j/g, 'z').replace(/f/g, 'h').replace(/(.)\1+/g, '$1').replace(/ou/g, 'o').replace(/ei/g, 'e').replace(/n'/g, 'n');
  }
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) { const cur = [i]; let lo = i; for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < lo) lo = cur[j]; } if (lo > max) return max + 1; prev = cur; }
    return prev[b.length];
  }
  const normW = s => strip(String(s || '').toLowerCase()).replace(/\([^)]*\)/g, ' ').replace(/[“”"'!?.,;:]/g, ' ').replace(/[-‐]/g, ' ').replace(/\s+/g, ' ').trim();

  /* ---------- entradas ---------- */
  function parse(a, ord) {
    const [i, k = [], r = [], s = [], f = 100000, fl = 0, pt, pa, nq, qx, xn] = a;
    return {
      i, ord, f, c: !!(fl & 1), u: !!(fl & 2),
      k: k.map(([t, m = '']) => ({ t, m: m ? m.split(',') : [] })),
      r: r.map(([t, m = '', only = '', nok = 0]) => ({ t, m: m ? m.split(',') : [], only: only ? only.split(',') : [], nok: !!nok })),
      s: s.map(([p = '', m = '', g = [], x = '', an = '', n = '', l = '', of = '', or = '']) => ({
        pos: p ? p.split(',') : [], misc: m ? m.split(',') : [], g: g.map(t => { const mm = /^\[(lit|expl|fig|tm)\]/.exec(t); return mm ? { t: t.slice(mm[0].length), kind: mm[1] } : { t }; }),
        x: x ? x.split('|') : [], a: an ? an.split('|') : [], n, l: l ? l.split('|').map(v => { const at = v.indexOf('~'), fl2 = v.slice(0, at); return { lang: fl2.replace(/[pw]+$/, ''), t: v.slice(at + 1), wasei: /w/.test(fl2.slice(3)) }; }) : [], of: of ? of.split('|') : [], or: or ? or.split('|') : []
      })),
      pt: (pt || []).map(([t, src, si = -1]) => ({ t, src, s: si })), pa: pa || [], nq: nq || [], qx: (qx || []).map(([jp, ro, ptx]) => ({ jp, ro, pt: ptx })), xn: xn || 0
    };
  }
  const pad = n => String(n).padStart(3, '0');
  async function entry(ord) { const m = await meta(); const a = (await get('e/' + pad(Math.floor(ord / m.shard)) + '.json'))[ord % m.shard]; return a ? parse(a, ord) : null; }
  async function entries(ords) { return Promise.all(ords.map(entry)); }
  async function summary(ord) { const m = await meta(); const a = (await get('m/' + pad(Math.floor(ord / m.shard)) + '.json'))[ord % m.shard]; if (!a) return null; const [w, r = '', p = '', g = '', fl = 0] = a; return { ord, w, r: r || w, p, g, c: !!(fl & 1), pt: !!(fl & 4) }; }
  async function examples(ord) { const m = await meta(); const sh = Math.floor(ord / m.shard); if (!m.xShards.includes(sh)) return []; const x = await get('x/' + pad(sh) + '.json'); return (x[ord] || []).map(([s, jp, en, lv, tid, aj, ae, form]) => ({ s, jp, en, lv, tid: parseInt(tid, 36), aj, ae, form })); }
  /* abre pela identificação estável (favoritos, Caderno): procura a escrita no índice e confere o número do JMdict */
  async function entryById(id, key) {
    const ords = key ? await jExact(key) : [];
    for (const o of ords.slice(0, 40)) { const e = await entry(o); if (e && e.i === id) return e; }
    return null;
  }

  /* ---------- índice japonês (chave = escrita ou leitura em hiragana) ---------- */
  const jBucket = key => { const ch = [...key][0]; const cp = ch.codePointAt(0); if (cp >= 0x3040 && cp <= 0x30ff) return 'h' + cp.toString(16); if (isKanjiCh(ch) || ch === 'ヶ' || ch === '〆') return 'k' + (cp % 64); return 'o'; };
  const jKey = s => { const t = String(s || '').trim().replace(/[\s　]/g, ''); return /^[぀-ヿー]+$/.test(t) ? hira(t) : t; };
  async function jRows(b) { const m = await meta(); if (!m.jBuckets.includes(b)) return []; return get('j/' + b + '.json'); }
  function lowerBound(rows, key) { let lo = 0, hi = rows.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (rows[mid][0] < key) lo = mid + 1; else hi = mid; } return lo; }
  async function jExact(q) {
    const key = jKey(q); if (!key) return [];
    const keys = [key]; const h = hira(key); if (h !== key) keys.push(h);
    const out = [];
    for (const k of keys) { const rows = await jRows(jBucket(k)); const i = lowerBound(rows, k); if (rows[i] && rows[i][0] === k) rows[i].slice(1).forEach(o => { if (!out.includes(o)) out.push(o); }); }
    return out;
  }
  async function jPrefix(q, limit = 60) {
    const key = jKey(q); if (!key) return [];
    const rows = await jRows(jBucket(key)); const out = [];
    for (let i = lowerBound(rows, key); i < rows.length && rows[i][0].startsWith(key); i++) out.push(rows[i]);
    return out.sort((a, b) => Math.min(...a.slice(1)) - Math.min(...b.slice(1)) || a[0].length - b[0].length).slice(0, limit);
  }
  /* romaji/kana parecido: mesma chave fonética (vogal longa, grafia) ou 1 letra de diferença, no bloco da primeira letra */
  async function jFuzzy(kana, { phonOnly = false, max = 1 } = {}) {
    const key = hira(kana); if (!key) return [];
    const rows = await jRows(jBucket(key)); const ph = phon(key), out = [];
    for (const row of rows) {
      const k = row[0]; if (!/^[぀-ゟー]+$/.test(k) || Math.abs(k.length - key.length) > 3) continue;
      if (phon(k) === ph) out.push([0, row]); else if (!phonOnly && key.length >= 3 && lev(key, k, max) <= max) out.push([1, row]);
    }
    return out.sort((a, b) => a[0] - b[0] || Math.min(...a[1].slice(1)) - Math.min(...b[1].slice(1))).map(x => x[1]);
  }

  /* ---------- índice de significados (p = português, e = inglês) ---------- */
  const wBucket = (lang, term) => lang + (/^[a-z0-9]{2}/.test(term) ? term.slice(0, 2) : /^[a-z0-9]/.test(term) ? term[0] + '_' : '__');
  async function wRows(b) { const m = await meta(); if (!m.wBuckets.includes(b)) return []; return get('w/' + b + '.json'); }
  async function wExact(lang, term) {
    const t = normW(term); if (!t) return [];
    const rows = await wRows(wBucket(lang, t)); const i = lowerBound(rows, t);
    if (!rows[i] || rows[i][0] !== t) return [];
    const r = rows[i], out = []; for (let j = 1; j < r.length; j += 2) out.push([r[j], r[j + 1]]); return out;
  }
  async function wPrefix(lang, term, limit = 12) {
    const t = normW(term); if (t.length < 3) return [];
    const rows = await wRows(wBucket(lang, t)); const out = [];
    for (let i = lowerBound(rows, t); i < rows.length && rows[i][0].startsWith(t) && out.length < limit; i++) if (rows[i][0] !== t) out.push(rows[i][0]);
    return out;
  }
  async function wFuzzy(lang, term, max) {
    const t = normW(term); if (t.length < 4) return [];
    const rows = await wRows(wBucket(lang, t)); const out = [];
    rows.forEach(r => { if (Math.abs(r[0].length - t.length) <= max && !r[0].includes(' ')) { const d = lev(t, r[0], max); if (d && d <= max) out.push([d, r[0], r[1]]); } });
    // também erro nas duas primeiras letras: troca de letras vizinhas
    return out.sort((a, b) => a[0] - b[0] || a[2] - b[2]).map(x => x[1]).slice(0, 6);
  }

  /* ---------- kanji ---------- */
  async function kanji(ch) { const m = await meta(); const b = 'k' + (ch.codePointAt(0) % 64); if (!m.kBuckets.includes(b)) return null; return (await get('k/' + b + '.json'))[ch] || null; }
  async function strokes(ch) { const m = await meta(); const b = 'k' + (ch.codePointAt(0) % 64); if (!m.sBuckets.includes(b)) return null; const p = (await get('s/' + b + '.json'))[ch]; return p ? p.split('|') : null; }

  /* ==========================================================
     CONJUGAÇÕES — análise de formas flexionadas (deflexão)
     Cada regra: [terminação da forma, terminação da base, tipos que a forma pode ter, tipo da base, nome da regra, fraca?]
     Começa da forma digitada (sem tipo) e aplica as regras em cadeia; cada base só vale se o JMdict tiver a palavra com a
     classe gramatical certa (v1, v5, vk, vs, adj-i…). Assim 書かなかった → 書かない → 書く, e 食べさせられる → 食べさせる → 食べる.
     ========================================================== */
  const U = 'うくぐすつぬぶむる', Ia = 'いきぎしちにびみり', Aa = 'わかがさたなばまら', Ea = 'えけげせてねべめれ', Oa = 'おこごそとのぼもろ';
  const TE5 = { う: 'って', く: 'いて', ぐ: 'いで', す: 'して', つ: 'って', ぬ: 'んで', ぶ: 'んで', む: 'んで', る: 'って' };
  const RULES = [];
  const R = (inf, base, inT, outT, name, weak) => RULES.push({ inf, base, inT, outT, name, weak: !!weak });
  const godan = (fn) => [...U].forEach((u, i) => fn(u, Ia[i], Aa[i], Ea[i], Oa[i]));
  // educada (ます)
  [['ます', 'polite'], ['ません', 'polite-neg'], ['ました', 'polite-past'], ['ませんでした', 'polite-past-neg'], ['ましょう', 'polite-vol'], ['まして', 'polite-te'], ['ませんか', 'polite-inv'], ['ましょうか', 'polite-vol']].forEach(([s, n]) => {
    R(s, 'る', [], 'v1', n); godan((u, i) => R(i + s, u, [], 'v5', n)); R('き' + s, 'くる', [], 'vk', n); R('来' + s, '来る', [], 'vk', n); R('し' + s, 'する', [], 'vs', n);
    R('い' + s, 'る', [], 'v5aru', n); // くださいます、いらっしゃいます、ございます
  });
  // negativa (ない tem forma de adjetivo -i: 書かなかった → 書かない)
  R('ない', 'る', ['adj-i'], 'v1', 'neg'); godan((u, i, a) => R(a + 'ない', u, ['adj-i'], 'v5', 'neg'));
  R('こない', 'くる', ['adj-i'], 'vk', 'neg'); R('来ない', '来る', ['adj-i'], 'vk', 'neg'); R('しない', 'する', ['adj-i'], 'vs', 'neg');
  R('ず', 'る', [], 'v1', 'zu'); godan((u, i, a) => R(a + 'ず', u, [], 'v5', 'zu')); R('せず', 'する', [], 'vs', 'zu'); R('こず', 'くる', [], 'vk', 'zu');
  R('ずに', 'る', [], 'v1', 'zuni'); godan((u, i, a) => R(a + 'ずに', u, [], 'v5', 'zuni')); R('せずに', 'する', [], 'vs', 'zuni');
  R('ん', 'る', [], 'v1', 'neg-n', true); godan((u, i, a) => { if (u !== 'る') R(a + 'ん', u, [], 'v5', 'neg-n', true); });
  // passado (た) e forma て, com たら / たり / ても / ては
  const TA = [['', 'past'], ['ら', 'tara'], ['り', 'tari'], ['ろう', 'tarou']], TE = [['', 'te'], ['も', 'temo'], ['は', 'tewa']];
  TA.forEach(([x, n]) => { R('た' + x, 'る', ['ta'], 'v1', n); R('きた' + x, 'くる', [], 'vk', n); R('来た' + x, '来る', [], 'vk', n); R('した' + x, 'する', [], 'vs', n); R('かった' + x, 'い', [], 'adj-i', n === 'past' ? 'adj-past' : n); R('った' + x, 'く', ['ta'], 'v5k-s', n); });
  TE.forEach(([x, n]) => { R('て' + x, 'る', ['te'], 'v1', n); R('きて' + x, 'くる', ['te'], 'vk', n); R('来て' + x, '来る', ['te'], 'vk', n); R('して' + x, 'する', ['te'], 'vs', n); R('くて' + x, 'い', ['te'], 'adj-i', n === 'te' ? 'adj-te' : n); R('って' + x, 'く', ['te'], 'v5k-s', n); });
  [...U].forEach(u => { const te = TE5[u], ta = te.slice(0, -1) + (te.endsWith('で') ? 'だ' : 'た'); TA.forEach(([x, n]) => R(ta + x, u, ['ta'], 'v5', n)); TE.forEach(([x, n]) => R(te + x, u, ['te'], 'v5', n)); });
  // auxiliares depois da forma て (ている, てしまう…): voltam para a forma て
  [['ている', 'v1', 'teiru'], ['てる', 'v1', 'teiru'], ['ておる', 'v5', 'teiru'], ['てしまう', 'v5', 'teshimau'], ['ちゃう', 'v5', 'teshimau'], ['ちまう', 'v5', 'teshimau'], ['ておく', 'v5', 'teoku'], ['とく', 'v5', 'teoku'], ['てある', 'v5', 'tearu'], ['てみる', 'v1', 'temiru'], ['ていく', 'v5', 'teiku'], ['てく', 'v5', 'teiku'], ['てくる', 'vk', 'tekuru'], ['てあげる', 'v1', 'teageru'], ['てくれる', 'v1', 'tekureru'], ['てもらう', 'v5', 'temorau'], ['ていただく', 'v5', 'temorau'], ['てほしい', 'adj-i', 'tehoshii'], ['てください', '', 'tekudasai'], ['てくださいませんか', '', 'tekudasai'], ['てすみません', '', 'tesumimasen'], ['てから', '', 'tekara'], ['てもいい', 'adj-i', 'temoii'], ['てはいけない', 'adj-i', 'tewaikenai'], ['ちゃいけない', 'adj-i', 'tewaikenai'], ['ちゃだめ', '', 'tewaikenai']].forEach(([s, t, n]) => {
    R(s, 'て', t ? [t] : [], 'te', n);
    if (s[0] === 'て') R('で' + s.slice(1), 'で', t ? [t] : [], 'te', n);
    if (s.startsWith('ちゃ') || s.startsWith('ちま')) R('じ' + s.slice(1), 'で', t ? [t] : [], 'te', n);
    if (s === 'とく') R('どく', 'で', ['v5'], 'te', n);
  });
  R('て', 'て', ['te'], 'te', '', true); // (marca interna)
  RULES.pop();
  // potencial, passiva, causativa
  R('られる', 'る', ['v1'], 'v1', 'pot-pass'); R('れる', 'る', ['v1'], 'v1', 'pot-ranuki', true);
  godan((u, i, a, e) => { R(e + 'る', u, ['v1'], 'v5', 'pot'); R(a + 'れる', u, ['v1'], 'v5', 'pass'); R(a + 'せる', u, ['v1'], 'v5', 'caus'); R(a + 'される', u, ['v1'], 'v5', 'caus-pass'); R(a + 'す', u, ['v5'], 'v5', 'caus-short', true); });
  R('させる', 'る', ['v1'], 'v1', 'caus'); R('させる', 'する', ['v1'], 'vs', 'caus'); R('さす', 'る', ['v5'], 'v1', 'caus-short', true);
  R('される', 'する', ['v1'], 'vs', 'pass'); R('できる', 'する', ['v1'], 'vs', 'pot-suru');
  R('こられる', 'くる', ['v1'], 'vk', 'pot-pass'); R('来られる', '来る', ['v1'], 'vk', 'pot-pass'); R('これる', 'くる', ['v1'], 'vk', 'pot-ranuki', true); R('来れる', '来る', ['v1'], 'vk', 'pot-ranuki', true);
  R('こさせる', 'くる', ['v1'], 'vk', 'caus'); R('来させる', '来る', ['v1'], 'vk', 'caus');
  // condicional ば, volitiva, imperativa
  R('れば', 'る', [], 'v1', 'ba'); godan((u, i, a, e) => R(e + 'ば', u, [], 'v5', 'ba')); R('くれば', 'くる', [], 'vk', 'ba'); R('来れば', '来る', [], 'vk', 'ba'); R('すれば', 'する', [], 'vs', 'ba'); R('ければ', 'い', [], 'adj-i', 'adj-ba');
  R('よう', 'る', [], 'v1', 'vol'); godan((u, i, a, e, o) => R(o + 'う', u, [], 'v5', 'vol')); R('こよう', 'くる', [], 'vk', 'vol'); R('来よう', '来る', [], 'vk', 'vol'); R('しよう', 'する', [], 'vs', 'vol');
  R('ろ', 'る', [], 'v1', 'imp'); R('よ', 'る', [], 'v1', 'imp', true); godan((u, i, a, e) => R(e, u, [], 'v5', 'imp', true)); R('こい', 'くる', [], 'vk', 'imp'); R('来い', '来る', [], 'vk', 'imp'); R('しろ', 'する', [], 'vs', 'imp'); R('せよ', 'する', [], 'vs', 'imp');
  godan(u => R(u + 'な', u, [], 'v', 'imp-neg', true)); R('するな', 'する', [], 'vs', 'imp-neg', true); R('くるな', 'くる', [], 'vk', 'imp-neg', true);
  R('なさい', 'る', [], 'v1', 'nasai'); godan((u, i) => R(i + 'なさい', u, [], 'v5', 'nasai')); R('しなさい', 'する', [], 'vs', 'nasai'); R('きなさい', 'くる', [], 'vk', 'nasai');
  // desejo (たい é adjetivo -i: 食べたくない → 食べたい → 食べる), ながら, そう, すぎる
  R('たい', 'る', ['adj-i'], 'v1', 'tai'); godan((u, i) => R(i + 'たい', u, ['adj-i'], 'v5', 'tai')); R('きたい', 'くる', ['adj-i'], 'vk', 'tai'); R('来たい', '来る', ['adj-i'], 'vk', 'tai'); R('したい', 'する', ['adj-i'], 'vs', 'tai');
  R('たがる', 'る', ['v5'], 'v1', 'tagaru'); godan((u, i) => R(i + 'たがる', u, ['v5'], 'v5', 'tagaru')); R('したがる', 'する', ['v5'], 'vs', 'tagaru');
  R('ながら', 'る', [], 'v1', 'nagara'); godan((u, i) => R(i + 'ながら', u, [], 'v5', 'nagara')); R('しながら', 'する', [], 'vs', 'nagara'); R('きながら', 'くる', [], 'vk', 'nagara');
  R('そう', 'る', [], 'v1', 'sou'); godan((u, i) => R(i + 'そう', u, [], 'v5', 'sou')); R('そう', 'い', [], 'adj-i', 'adj-sou'); R('しそう', 'する', [], 'vs', 'sou');
  R('すぎる', 'る', ['v1'], 'v1', 'sugiru'); godan((u, i) => R(i + 'すぎる', u, ['v1'], 'v5', 'sugiru')); R('すぎる', 'い', ['v1'], 'adj-i', 'sugiru'); R('しすぎる', 'する', ['v1'], 'vs', 'sugiru');
  R('やすい', 'る', ['adj-i'], 'v1', 'yasui'); godan((u, i) => R(i + 'やすい', u, ['adj-i'], 'v5', 'yasui')); R('にくい', 'る', ['adj-i'], 'v1', 'nikui'); godan((u, i) => R(i + 'にくい', u, ['adj-i'], 'v5', 'nikui'));
  R('たことがある', 'た', ['v5'], 'ta', 'experience'); R('だことがある', 'だ', ['v5'], 'ta', 'experience');
  // adjetivo -i
  R('くない', 'い', ['adj-i'], 'adj-i', 'adj-neg'); R('く', 'い', [], 'adj-i', 'adj-adv'); R('さ', 'い', [], 'adj-i', 'adj-sa', true); R('かろう', 'い', [], 'adj-i', 'adj-vol'); R('くなる', 'い', ['v5'], 'adj-i', 'adj-naru'); R('くありません', 'い', [], 'adj-i', 'adj-neg');
  R('くて', 'い', ['te'], 'adj-i', 'adj-te'); R('き', 'い', [], 'adj-i', 'adj-ki', true); R('げ', 'い', [], 'adj-i', 'adj-sa', true);
  R('です', '', [], 'any', 'desu'); R('でした', '', [], 'na', 'deshita'); R('だった', '', [], 'na', 'datta'); R('じゃない', '', ['adj-i'], 'na', 'janai'); R('ではない', '', ['adj-i'], 'na', 'janai'); R('じゃありません', '', [], 'na', 'janai'); R('ではありません', '', [], 'na', 'janai'); R('だ', '', [], 'na', 'da', true); R('な', '', [], 'na', 'na-adj', true); R('に', '', [], 'na', 'ni-adv', true); R('じゃなかった', '', [], 'na', 'janakatta'); R('ではなかった', '', [], 'na', 'janakatta');
  // する verbal: 勉強する → 勉強 (substantivo + する)
  R('する', '', ['vs'], 'vs-n', 'suru'); R('た', 'た', [], 'ta', '', true); RULES.pop();
  // forma de ligação (連用形) sozinha: 読み、食べ — só como possibilidade
  const BY_END = new Map(); RULES.forEach(r => { const k = r.inf.slice(-1); (BY_END.get(k) || BY_END.set(k, []).get(k)).push(r); });
  const RULE_SET = RULES.filter(r => r.inf);
  function deinflect(word) {
    const out = [{ w: word, t: null, chain: [], weak: false }], seen = new Set([word + '|']);
    for (let i = 0; i < out.length && out.length < 400; i++) {
      const c = out[i]; if (c.chain.length >= 6) continue;
      for (const r of RULE_SET) {
        if (!c.w.endsWith(r.inf)) continue;
        if (c.t !== null && c.t !== 'any' && !r.inT.includes(c.t) && !(c.t === 'v5k-s' && r.inT.includes('v5')) && !(c.t === 'v5aru' && r.inT.includes('v5'))) continue;
        const stem = c.w.slice(0, c.w.length - r.inf.length);
        if (!stem && r.outT !== 'vk' && r.base !== 'する' && r.base !== 'くる' && r.base !== '来る' && r.base !== 'い') continue;
        const w = stem + r.base; if (!w) continue;
        const key = w + '|' + r.outT; if (seen.has(key)) continue; seen.add(key);
        out.push({ w, t: r.outT, chain: c.chain.concat(r.name ? [r.name] : []), weak: c.weak || r.weak });
      }
      if (c.t === null) { // forma de ligação: só a partir da forma digitada
        godan((u, iRow) => { if (c.w.length >= 2 && c.w.endsWith(iRow)) { const w = c.w.slice(0, -1) + u; const key = w + '|v5'; if (!seen.has(key)) { seen.add(key); out.push({ w, t: 'v5', chain: ['stem'], weak: true }); } } });
        if (c.w.length >= 2 && /[えけげせぜてでねへべぺめれいきぎしじちぢにひびぴみり]$/.test(c.w)) { const w = c.w + 'る'; const key = w + '|v1'; if (!seen.has(key)) { seen.add(key); out.push({ w, t: 'v1', chain: ['stem'], weak: true }); } }
      }
    }
    return out.slice(1);
  }
  /* classe gramatical do JMdict compatível com o tipo pedido pela regra */
  function posFits(e, t, w) {
    const P = new Set(e.s.flatMap(s => s.pos));
    const any = re => [...P].some(p => re.test(p));
    switch (t) {
      case 'v1': return any(/^v1/);
      case 'v5': { const end = w.slice(-1); const map = { う: /^v5u/, く: /^v5k/, ぐ: /^v5g/, す: /^v5s/, つ: /^v5t/, ぬ: /^v5n/, ぶ: /^v5b/, む: /^v5m/, る: /^v5r|^v5aru/ }; return map[end] ? any(map[end]) : any(/^v5/); }
      case 'v5k-s': return any(/^v5k-s/);
      case 'v5aru': return any(/^v5aru/);
      case 'vk': return any(/^vk/);
      case 'vs': return any(/^vs-(i|s)|^vz/) || (w.endsWith('する') && any(/^vs/));
      case 'vs-n': return any(/^vs$/);
      case 'adj-i': return any(/^adj-i/);
      case 'na': return any(/^adj-na|^n$|^adj-no|^pn|^n-adv|^adv/);
      case 'v': return any(/^v/);
      case 'te': case 'ta': return false;
      default: return true;
    }
  }
  /* analisa uma forma: devolve as possibilidades confirmadas no dicionário (base, entradas, cadeia de regras) */
  async function analyze(q, { max = 6 } = {}) {
    const word = String(q || '').trim().replace(/[。、！？!?\s　]/g, '');
    if (!word || !/[぀-ゟ]$/.test(word)) return [];
    const cands = deinflect(word), out = [];
    for (const c of cands) {
      if (!c.t || c.t === 'te' || c.t === 'ta') continue;
      if (c.w.length < 1) continue;
      const ords = await jExact(c.w); if (!ords.length) continue;
      const es = (await entries(ords.slice(0, 8))).filter(e => e && posFits(e, c.t, c.w));
      if (!es.length) continue;
      out.push({ q: word, base: c.w, t: c.t, chain: c.chain, weak: c.weak, es });
      if (out.length >= max * 3) break;
    }
    // menos passos e regras fortes primeiro; a mesma entrada só uma vez (fica a análise mais simples)
    out.sort((a, b) => (a.weak - b.weak) || a.chain.length - b.chain.length || a.es[0].ord - b.es[0].ord);
    const seen = new Set(), res = [];
    for (const a of out) { a.es = a.es.filter(e => !seen.has(e.ord)); if (!a.es.length) continue; a.es.forEach(e => seen.add(e.ord)); res.push(a); if (res.length >= max) break; }
    return res;
  }

  /* ---------- conjugação (para as fichas): gera as formas a partir da classe do JMdict ---------- */
  function verbClass(e) {
    const P = e.s.flatMap(s => s.pos);
    if (P.some(p => /^v1/.test(p))) return 'v1';
    if (P.includes('v5k-s')) return 'v5k-s';
    if (P.some(p => /^v5aru/.test(p))) return 'v5aru';
    if (P.includes('v5r-i')) return 'v5r-i';
    const g = P.find(p => /^v5/.test(p)); if (g) return 'v5';
    if (P.includes('vk')) return 'vk';
    if (P.some(p => /^vs-(i|s)$/.test(p))) return 'vs-i';
    if (P.includes('vz')) return 'vz';
    if (P.includes('vs')) return 'vs';
    if (P.includes('adj-ix')) return 'adj-ix';
    if (P.includes('adj-i')) return 'adj-i';
    if (P.includes('adj-na')) return 'adj-na';
    return '';
  }
  function conjugate(w, cls) {
    const T = (pairs) => pairs.filter(x => x[1]);
    if (cls === 'vs') return conjugate(w + 'する', 'vs-i');
    if (cls === 'adj-na') return T([['casual', w + 'だ'], ['neg', w + 'じゃない'], ['past', w + 'だった'], ['pastneg', w + 'じゃなかった'], ['polite', w + 'です'], ['politeneg', w + 'ではありません'], ['te', w + 'で'], ['adv', w + 'に'], ['attr', w + 'な'], ['ba', w + 'なら']]);
    if (cls === 'adj-i' || cls === 'adj-ix') {
      const st = cls === 'adj-ix' ? w.slice(0, -2) + 'よ' : w.slice(0, -1);
      return T([['casual', w], ['neg', st + 'くない'], ['past', st + 'かった'], ['pastneg', st + 'くなかった'], ['polite', w + 'です'], ['politeneg', st + 'くないです'], ['te', st + 'くて'], ['adv', st + 'く'], ['ba', st + 'ければ'], ['naru', st + 'くなる']]);
    }
    let stem, a, i, e, o, te, ta;
    const u = w.slice(-1), b = w.slice(0, -1);
    if (cls === 'v1') { stem = b; a = i = b; e = b + 'れ'; o = b + 'よ'; te = b + 'て'; ta = b + 'た'; }
    else if (cls === 'vk') { const k = b.slice(0, -1) + (b.endsWith('来') ? '来' : ''); const ki = b.endsWith('来') ? b : b.slice(0, -1) + 'き', ko = b.endsWith('来') ? b : b.slice(0, -1) + 'こ'; return T([['casual', w], ['polite', ki + 'ます'], ['neg', ko + 'ない'], ['politeneg', ki + 'ません'], ['past', ki + 'た'], ['politepast', ki + 'ました'], ['pastneg', ko + 'なかった'], ['te', ki + 'て'], ['teiru', ki + 'ている'], ['pot', ko + 'られる'], ['pass', ko + 'られる'], ['caus', ko + 'させる'], ['causpass', ko + 'させられる'], ['ba', (b.endsWith('来') ? b : b.slice(0, -1) + 'く') + 'れば'], ['tara', ki + 'たら'], ['vol', ko + 'よう'], ['imp', ko + 'い'], ['tai', ki + 'たい']]).map(x => { void k; return x; }); }
    else if (cls === 'vs-i' || cls === 'vz') { const s0 = w.slice(0, -2); const z = cls === 'vz'; return T([['casual', w], ['polite', s0 + (z ? 'じます' : 'します')], ['neg', s0 + (z ? 'じない' : 'しない')], ['politeneg', s0 + (z ? 'じません' : 'しません')], ['past', s0 + (z ? 'じた' : 'した')], ['politepast', s0 + (z ? 'じました' : 'しました')], ['pastneg', s0 + (z ? 'じなかった' : 'しなかった')], ['te', s0 + (z ? 'じて' : 'して')], ['teiru', s0 + (z ? 'じている' : 'している')], ['pot', z ? s0 + 'じられる' : s0 + 'できる'], ['pass', s0 + (z ? 'じられる' : 'される')], ['caus', s0 + (z ? 'じさせる' : 'させる')], ['causpass', s0 + (z ? 'じさせられる' : 'させられる')], ['ba', s0 + (z ? 'ずれば' : 'すれば')], ['tara', s0 + (z ? 'じたら' : 'したら')], ['vol', s0 + (z ? 'じよう' : 'しよう')], ['imp', s0 + (z ? 'じろ' : 'しろ')], ['tai', s0 + (z ? 'じたい' : 'したい')]]); }
    else { // godan
      const k = U.indexOf(u); if (k < 0) return [];
      stem = b + Ia[k]; a = b + Aa[k]; i = stem; e = b + Ea[k]; o = b + Oa[k] + 'う';
      te = b + TE5[u]; ta = te.slice(0, -1) + (te.endsWith('で') ? 'だ' : 'た');
      if (cls === 'v5k-s') { te = b + 'って'; ta = b + 'った'; }
      if (cls === 'v5aru') stem = b + 'い';
      const neg = cls === 'v5r-i' ? 'ない' : a + 'ない';
      return T([['casual', w], ['polite', stem + 'ます'], ['neg', neg], ['politeneg', stem + 'ません'], ['past', ta], ['politepast', stem + 'ました'], ['pastneg', cls === 'v5r-i' ? 'なかった' : a + 'なかった'], ['te', te], ['teiru', te + 'いる'], ['pot', cls === 'v5r-i' ? '' : e + 'る'], ['pass', a + 'れる'], ['caus', a + 'せる'], ['causpass', a + 'せられる'], ['ba', e + 'ば'], ['tara', ta + 'ら'], ['vol', o], ['imp', cls === 'v5aru' ? stem : e], ['tai', i + 'たい']]);
    }
    return T([['casual', w], ['polite', stem + 'ます'], ['neg', a + 'ない'], ['politeneg', stem + 'ません'], ['past', ta], ['politepast', stem + 'ました'], ['pastneg', a + 'なかった'], ['te', te], ['teiru', te + 'いる'], ['pot', stem + 'られる'], ['pass', stem + 'られる'], ['caus', stem + 'させる'], ['causpass', stem + 'させられる'], ['ba', e + 'ば'], ['tara', ta + 'ら'], ['vol', o + 'う'], ['imp', stem + 'ろ'], ['tai', i + 'たい']]);
  }
  /* leitura de uma forma conjugada: troca a terminação da leitura da base (来る é tratado à parte) */
  function readingOf(surface, base, baseReading) {
    if (!hasKanji(surface)) return hira(surface);
    let p = 0; while (p < surface.length && p < base.length && surface[p] === base[p]) p++;
    if (base.endsWith('来る') && surface[p - 1] === '来') {
      const rest = surface.slice(p), pre = baseReading.slice(0, -2);
      return pre + (/^(な|よ|さ|ら|い$)/.test(rest) ? 'こ' : /^(る|れ)/.test(rest) ? 'く' : 'き') + rest;
    }
    const baseRest = base.slice(p), surfRest = surface.slice(p);
    if (hasKanji(baseRest) || hasKanji(surfRest) || !baseReading.endsWith(hira(baseRest))) return '';
    return baseReading.slice(0, baseReading.length - baseRest.length) + hira(surfRest);
  }

  /* ==========================================================
     BUSCA COMPLETA — devolve resultados ordenados por relevância
     ========================================================== */
  const PT_ART = /^(o|a|os|as|um|uma|uns|umas) /;
  function ptVariants(n) {
    const out = [[n, 0]], add = (v, pen) => { v = v.trim(); if (v.length >= 2 && !out.some(x => x[0] === v)) out.push([v, pen]); };
    const noArt = n.replace(PT_ART, ''); add(noArt, 1); add(n.replace(/-/g, ' '), 0); add(noArt.replace(/-/g, ' '), 1);
    const v = noArt;
    if (v.length > 3 && !/\s/.test(v)) {
      if (/oes$|aes$/.test(v)) add(v.replace(/[oa]es$/, 'ao'), 4); if (/ais$/.test(v)) add(v.replace(/ais$/, 'al'), 4); if (/eis$/.test(v)) add(v.replace(/eis$/, 'el'), 4);
      if (/res$|zes$|ses$/.test(v)) add(v.slice(0, -2), 4); if (/ns$/.test(v)) add(v.replace(/ns$/, 'm'), 4); if (/s$/.test(v)) add(v.slice(0, -1), 4);
      if (/a$/.test(v)) add(v.slice(0, -1) + 'o', 6); // feminino → masculino (cansada → cansado)
      if (/as$/.test(v)) add(v.slice(0, -2) + 'o', 7);
    }
    if (/^(o |a )?(ato de |de )/.test(v)) add(v.replace(/^(o |a )?(ato de |de )/, ''), 6);
    return out;
  }
  async function search(q, opts = {}) {
    q = String(q || '').trim(); const lim = opts.limit || 60;
    const res = new Map(); // ord -> {ord, score, how}
    const put = (ord, score, how, extra) => { const r = res.get(ord); if (!r || r.score < score) res.set(ord, Object.assign({ ord, score, how }, extra || {})); };
    const out = { q, kind: '', results: [], forms: [], suggest: [], kanji: [], tooShort: false };
    if (!q) return out;
    if (isJp(q)) {
      out.kind = 'jp';
      const clean = q.replace(/[\s　。、！？!?「」『』（）()]/g, '');
      const ex = await jExact(clean); ex.forEach((o, i) => put(o, 1000 - i * 0.01, 'exact'));
      const kj = [...clean].filter(isKanjiCh);
      if (kj.length && kj.length <= 4 && clean.length <= 6) out.kanji = [...new Set(kj)];
      if (/[぀-ゟ]$/.test(clean)) { out.forms = await analyze(clean); out.forms.forEach((a, ai) => a.es.forEach((e, i) => put(e.ord, (a.weak ? 640 : 900) - ai * 5 - i, 'form', { form: a }))); }
      // começo da palavra: só depois de 1 caractere de kanji ou 2 de kana (buscas curtas não despejam centenas de resultados)
      const minPre = hasKanji(clean) ? 1 : 2;
      if (clean.length >= minPre) (await jPrefix(clean, 40)).forEach(([k, ...ords]) => { if (k === jKey(clean)) return; ords.slice(0, 3).forEach((o, i) => put(o, 500 - (k.length - clean.length) * 8 - Math.min(150, o / 400) - i, 'prefix')); });
      if (!res.size && !hasKanji(clean) && clean.length >= 3) { (await jFuzzy(clean)).slice(0, 12).forEach(([k, ...ords]) => { out.suggest.push({ k, ord: ords[0] }); }); }
    } else {
      out.kind = 'latin';
      const n = normW(q);
      if (n.length < 2) { out.tooShort = true; return out; }
      // romaji
      const kana = toKana(n);
      if (kana && kana.length >= 1 && !/^ー/.test(kana)) {
        const ex = await jExact(kana); ex.forEach((o, i) => put(o, 960 - i * 2 - Math.min(60, o / 2000), 'romaji'));
        if (kana.length >= 2) (await jFuzzy(kana, { phonOnly: true })).slice(0, 25).forEach(([k, ...ords], ri) => ords.slice(0, 2).forEach((o, i) => put(o, (ex.length ? 640 : 930) - ri - i - Math.min(60, o / 2000), 'romaji')));
        // romaji conjugado (tabemashita, yonda): reconhece a forma básica
        if (kana.length >= 3 && !ex.length) { out.forms = await analyze(kana); out.forms.forEach((a, ai) => a.es.forEach((e, i) => put(e.ord, (a.weak ? 600 : 935) - ai * 5 - i, 'form', { form: a }))); }
        if (kana.length >= 3) (await jPrefix(kana, 20)).forEach(([k, ...ords]) => { if (k !== kana && /^[぀-ゟー]+$/.test(k)) ords.slice(0, 1).forEach(o => put(o, 420 - (k.length - kana.length) * 10 - Math.min(80, o / 1500), 'romaji-prefix')); });
      }
      // português (revisado do app + traduções marcadas), depois inglês do JMdict
      for (const [v, pen] of ptVariants(n)) (await wExact('p', v)).forEach(([o, sc]) => put(o, 880 + sc - pen * 10 - Math.min(30, o / 300), 'pt'));
      const enVs = [[n, 0]]; if (!/^to /.test(n) && n.split(' ').length <= 3) enVs.push(['to ' + n, 2]);
      for (const [v, pen] of enVs) (await wExact('e', v)).forEach(([o, sc]) => put(o, 700 + sc - pen * 10 - Math.min(30, o / 300), 'en'));
      // várias palavras: entradas que têm todas
      const words = n.split(' ').filter(w => w.length >= 2 && !/^(o|a|os|as|um|uma|de|do|da|the|to|of|a|an)$/.test(w));
      if (words.length >= 2) for (const lang of ['p', 'e']) {
        const lists = await Promise.all(words.map(w => wExact(lang, w)));
        const cnt = new Map(); lists.forEach(l => l.forEach(([o, sc]) => cnt.set(o, (cnt.get(o) || [0, 0]).map((x, j) => x + (j ? sc : 1)))));
        cnt.forEach(([c, sc], o) => { if (c === words.length) put(o, (lang === 'p' ? 600 : 520) + sc / c, lang === 'p' ? 'pt' : 'en'); });
      }
      if (!res.size || [...res.values()].every(r => r.score < 800)) {
        const sug = new Set();
        for (const lang of ['p', 'e']) (await wFuzzy(lang, n, n.length >= 7 ? 2 : 1)).forEach(t => sug.add(t));
        if (kana && kana.length >= 3 && !res.size) (await jFuzzy(kana)).slice(0, 4).forEach(([k]) => sug.add(toRomaji(k)));
        out.suggest = [...sug].filter(t => t !== n).slice(0, 6).map(k => ({ k }));
      }
    }
    // filtro de relevância: se há resultado forte, os fracos saem; com resultado em português, o inglês só entra quando bate o significado inteiro
    let list = [...res.values()].sort((a, b) => b.score - a.score || a.ord - b.ord);
    if (list.some(r => r.how === 'pt')) list = list.filter(r => r.how !== 'en' || r.score >= 780);
    const best = list.length ? list[0].score : 0;
    if (best >= 880) list = list.filter(r => r.score >= Math.min(420, best - 520));
    out.total = list.length;
    out.results = list.slice(0, lim);
    return out;
  }

  /* ==========================================================
     ANÁLISE DE FRASE — divide em palavras pelo dicionário (o trecho mais longo que existe), reconhece conjugações
     e partículas. Quando há mais de uma divisão possível, mostra a mais provável e avisa.
     ========================================================== */
  const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'の', 'も', 'や', 'か', 'から', 'まで', 'より', 'ね', 'よ', 'な', 'わ', 'ぞ', 'ぜ', 'さ', 'けど', 'けれど', 'ので', 'のに', 'し', 'でも', 'だけ', 'しか', 'ばかり', 'ほど', 'くらい', 'ぐらい', 'など', 'って', 'とか', 'かな', 'かしら', 'ながら', 'ずつ', 'こそ', 'さえ', 'すら', 'ほど', 'のみ'];
  async function tokenize(text) {
    const s = String(text || '').replace(/[\s　]+/g, ''); const toks = []; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/[、。！？!?「」『』（）()・…〜~ー]/.test(ch) && !(ch === 'ー' && i > 0)) { toks.push({ s: ch, punct: true }); i++; continue; }
      if (/[A-Za-z0-9０-９Ａ-Ｚａ-ｚ]/.test(ch)) { let j = i; while (j < s.length && /[A-Za-z0-9０-９Ａ-Ｚａ-ｚ.,]/.test(s[j])) j++; toks.push({ s: s.slice(i, j), latin: true }); i = j; continue; }
      let best = null;
      for (let L = Math.min(14, s.length - i); L >= 1; L--) {
        const sub = s.slice(i, i + L); if (/[、。！？!?「」]/.test(sub)) continue;
        const prevKana = i > 0 && /[ぁ-ゖ]/.test(s[i - 1]);
        // partícula curta entre palavras: preferida a um trecho em kana que "come" a partícula seguinte
        if (L <= 3 && PARTICLES.includes(sub) && toks.length && !toks[toks.length - 1].punct && (L === 1 || !best)) {
          const ex = await jExact(sub); if (ex.length) { if (!best || best.s.length <= L || /^[ぁ-ゖ]+$/.test(best.s) && !best.form) { best = { s: sub, ords: ex, particle: true }; } break; }
        }
        const ex = await jExact(sub);
        if (ex.length) {
          // trecho só em kana e raro (ex.: これは como interjeição) perde para a divisão em palavras comuns
          if (L >= 2 && /^[ぁ-ゖー]+$/.test(sub) && ex[0] > 30000 && !best) { best = { s: sub, ords: ex, weak: true }; continue; }
          if (!best || best.weak) { best = { s: sub, ords: ex }; }
          break;
        }
        if (L >= 2 && /[ぁ-ゖ]$/.test(sub)) { const fs = await analyze(sub, { max: 3 }); if (fs.length && !(fs[0].weak && L <= 2)) { if (!best || best.weak) best = { s: sub, ords: fs[0].es.map(e => e.ord), form: fs[0], forms: fs }; break; } }
        void prevKana;
      }
      if (!best) { toks.push({ s: ch, unknown: true }); i++; continue; }
      // です／だ depois de um substantivo: fica como palavra separada (学生です = 学生 + です)
      if (best.form && best.form.chain.length === 1 && /^(desu|da|deshita|datta|janai|janakatta)$/.test(best.form.chain[0]) && s.startsWith(best.form.base, i)) best = { s: best.form.base, ords: best.ords };
      if (best.particle || PARTICLES.includes(best.s)) { // partícula: escolhe a entrada que é partícula (は “wa”, não 葉 “folha”)
        const es = await entries(best.ords.slice(0, 8)); const pe = es.find(e => e && e.s.some(x => x.pos.includes('prt')));
        if (pe) { best.ords = [pe.ord].concat(best.ords.filter(o => o !== pe.ord)); best.particle = true; }
      }
      toks.push(best); i += best.s.length;
    }
    // junta kanji desconhecidos consecutivos
    return toks;
  }

  /* ---------- rótulos em português (classes gramaticais e marcas do JMdict) ---------- */
  const POS_PT = {
    n: 'substantivo', 'n-adv': 'substantivo adverbial', 'n-t': 'substantivo (tempo)', 'n-pref': 'substantivo (prefixo)', 'n-suf': 'substantivo (sufixo)', 'n-pr': 'nome próprio',
    pn: 'pronome', 'adj-i': 'adjetivo -i', 'adj-ix': 'adjetivo -i (いい/よい)', 'adj-na': 'adjetivo -na', 'adj-no': 'pode levar の', 'adj-pn': 'pré-nominal', 'adj-t': 'adjetivo -taru', 'adj-f': 'antes de substantivo', 'adj-ku': 'adjetivo -ku (arcaico)', 'adj-shiku': 'adjetivo -shiku (arcaico)', 'adj-nari': 'adjetivo -nari (arcaico)', 'adj-kari': 'adjetivo -kari (arcaico)',
    adv: 'advérbio', 'adv-to': 'advérbio (com と)', aux: 'auxiliar', 'aux-v': 'verbo auxiliar', 'aux-adj': 'adjetivo auxiliar', conj: 'conjunção', cop: 'cópula', ctr: 'contador', exp: 'expressão', int: 'interjeição', num: 'número', pref: 'prefixo', prt: 'partícula', suf: 'sufixo', unc: 'não classificado',
    v1: 'verbo ichidan (-ru)', 'v1-s': 'verbo ichidan (くれる)', v5u: 'verbo godan (-u)', v5k: 'verbo godan (-ku)', 'v5k-s': 'verbo godan (行く)', v5g: 'verbo godan (-gu)', v5s: 'verbo godan (-su)', v5t: 'verbo godan (-tsu)', v5n: 'verbo godan (-nu)', v5b: 'verbo godan (-bu)', v5m: 'verbo godan (-mu)', v5r: 'verbo godan (-ru)', 'v5r-i': 'verbo godan (irregular, ある)', v5aru: 'verbo godan honorífico (-aru)', 'v5u-s': 'verbo godan (-u, especial)',
    vk: 'verbo irregular 来る', vs: 'substantivo que vira verbo com する', 'vs-i': 'verbo する', 'vs-s': 'verbo -suru (especial)', 'vs-c': 'verbo -su (arcaico)', vz: 'verbo -zuru', vi: 'intransitivo', vt: 'transitivo', vn: 'verbo -nu (irregular)', vr: 'verbo -ri (arcaico)', 'v2a-s': 'verbo nidan (arcaico)', 'v4r': 'verbo yodan (arcaico)', 'v4k': 'verbo yodan (arcaico)', 'v4s': 'verbo yodan (arcaico)', 'v4h': 'verbo yodan (arcaico)', 'v4t': 'verbo yodan (arcaico)', 'v4m': 'verbo yodan (arcaico)', 'v4b': 'verbo yodan (arcaico)', 'v4g': 'verbo yodan (arcaico)', 'v4n': 'verbo yodan (arcaico)', vunspec: 'verbo (classe não especificada)'
  };
  const POS_SHORT = p => !p ? '' : /^v1/.test(p) ? 'verbo' : /^v5|^vk|^vs-|^vz|^v[24]/.test(p) ? 'verbo' : p === 'vs' ? 'subst. (+する)' : /^adj-i/.test(p) ? 'adj. -i' : p === 'adj-na' ? 'adj. -na' : /^adj/.test(p) ? 'adjetivo' : /^n/.test(p) ? 'subst.' : p === 'exp' ? 'expressão' : p === 'int' ? 'interjeição' : p === 'prt' ? 'partícula' : POS_PT[p] || p;
  const MISC_PT = {
    abbr: 'abreviação', arch: 'arcaico', char: 'personagem', chn: 'linguagem infantil', col: 'coloquial', company: 'empresa', creat: 'criatura', dated: 'antiquado', dei: 'divindade', derog: 'pejorativo', doc: 'documento', euph: 'eufemismo', ev: 'evento', fam: 'familiar', fem: 'linguagem feminina', fict: 'ficção', form: 'formal', given: 'nome', group: 'grupo', hist: 'termo histórico', hon: 'honorífico (sonkeigo)', hum: 'humilde (kenjougo)', id: 'expressão idiomática', joc: 'brincadeira', leg: 'lenda', 'm-sl': 'gíria de mangá', male: 'linguagem masculina', myth: 'mitologia', 'net-sl': 'gíria da internet', obj: 'objeto', obs: 'obsoleto', 'on-mim': 'onomatopeia ou mimese', organization: 'organização', oth: 'outro', person: 'pessoa', place: 'lugar', poet: 'poético', pol: 'educado (teineigo)', product: 'produto', proverb: 'provérbio', quote: 'citação', rare: 'raro', relig: 'religião', sens: 'sensível', serv: 'serviço', ship: 'navio', sl: 'gíria', station: 'estação', surname: 'sobrenome', uk: 'geralmente escrito em kana', unclass: 'nome', vulg: 'vulgar', work: 'obra', X: 'impróprio', yoji: 'expressão de 4 kanji (yojijukugo)',
    agric: 'agricultura', anat: 'anatomia', archeol: 'arqueologia', archit: 'arquitetura', art: 'arte', astron: 'astronomia', audvid: 'audiovisual', aviat: 'aviação', baseb: 'beisebol', biochem: 'bioquímica', biol: 'biologia', bot: 'botânica', boxing: 'boxe', Buddh: 'budismo', bus: 'negócios', cards: 'cartas', chem: 'química', chmyth: 'mitologia chinesa', Christn: 'cristianismo', civeng: 'engenharia civil', cloth: 'roupas', comp: 'informática', cryst: 'cristalografia', dent: 'odontologia', ecol: 'ecologia', econ: 'economia', elec: 'eletricidade', electr: 'eletrônica', embryo: 'embriologia', engr: 'engenharia', ent: 'entomologia', figskt: 'patinação', film: 'cinema', finc: 'finanças', fish: 'pesca', food: 'culinária', gardn: 'jardinagem', genet: 'genética', geogr: 'geografia', geol: 'geologia', geom: 'geometria', go: 'go (jogo)', golf: 'golfe', gramm: 'gramática', grmyth: 'mitologia grega', hanaf: 'hanafuda', horse: 'corrida de cavalos', internet: 'internet', jpmyth: 'mitologia japonesa', kabuki: 'kabuki', law: 'direito', ling: 'linguística', logic: 'lógica', MA: 'artes marciais', mahj: 'mahjong', manga: 'mangá', math: 'matemática', mech: 'mecânica', med: 'medicina', met: 'meteorologia', mil: 'militar', min: 'mineralogia', mining: 'mineração', motor: 'automobilismo', music: 'música', noh: 'noh', ornith: 'ornitologia', paleo: 'paleontologia', pathol: 'patologia', pharm: 'farmácia', phil: 'filosofia', photo: 'fotografia', physics: 'física', physiol: 'fisiologia', politics: 'política', print: 'impressão', prowres: 'luta livre', psy: 'psiquiatria', psyanal: 'psicanálise', psych: 'psicologia', rail: 'ferrovia', rommyth: 'mitologia romana', Shinto: 'xintoísmo', shogi: 'shogi', ski: 'esqui', sports: 'esportes', stat: 'estatística', stockm: 'bolsa de valores', sumo: 'sumô', surg: 'cirurgia', telec: 'telecomunicações', tradem: 'marca registrada', tv: 'televisão', vet: 'veterinária', vidg: 'videogame', zool: 'zoologia',
    kyb: 'dialeto de Kyoto', osb: 'dialeto de Osaka', ksb: 'dialeto de Kansai', ktb: 'dialeto de Kantō', tsb: 'dialeto de Tosa', thb: 'dialeto de Tōhoku', tsug: 'dialeto de Tsugaru', kyu: 'dialeto de Kyūshū', rkb: 'dialeto de Ryūkyū', nab: 'dialeto de Nagano', hob: 'dialeto de Hokkaidō', bra: 'dialeto do Brasil (nipo-brasileiro)'
  };
  const FORM_PT = { iK: 'escrita irregular', ik: 'leitura irregular', oK: 'escrita antiga', ok: 'leitura antiga', ateji: 'ateji (kanji pelo som)', rK: 'escrita rara', rk: 'leitura rara', sK: 'só para busca', sk: 'só para busca', io: 'okurigana irregular', gikun: 'leitura especial (gikun)' };
  const LANG_PT = { eng: 'inglês', por: 'português', fre: 'francês', ger: 'alemão', dut: 'holandês', ita: 'italiano', spa: 'espanhol', rus: 'russo', chi: 'chinês', kor: 'coreano', lat: 'latim', grc: 'grego antigo', gre: 'grego', san: 'sânscrito', ain: 'ainu', ara: 'árabe' };
  const RULE_PT = {
    polite: ['forma educada (ます)', 'c13l2'], 'polite-neg': ['educada, negativa (ません)', 'c13l2'], 'polite-past': ['educada, passado (ました)', 'c13l2'], 'polite-past-neg': ['educada, negativa no passado (ませんでした)', 'c13l2'], 'polite-vol': ['educada, convite (ましょう)', 'c13l2'], 'polite-te': ['educada, forma て (まして)', 'c13l2'], 'polite-inv': ['convite educado (ませんか)', 'c13l2'],
    neg: ['negativa (ない)', 'c8l2'], zu: ['negativa formal/escrita (ず)', ''], zuni: ['“sem fazer” (ずに)', ''], 'neg-n': ['negativa coloquial (ん)', ''], past: ['passado (た)', 'c8l3'], tara: ['condicional (たら)', 'c16l6'], tari: ['listando ações (たり)', 'c13l12'], tarou: ['suposição no passado (たろう)', ''],
    te: ['forma て', 'c13l3'], temo: ['“mesmo que” (ても)', 'c13l3'], tewa: ['forma ては', ''], teiru: ['em andamento ou estado (ている)', 'c13l4'], teshimau: ['acabou fazendo / por completo (てしまう、ちゃう)', 'c16l5'], teoku: ['deixar feito / preparar (ておく、とく)', 'c16l4'], tearu: ['estado resultante (てある)', ''], temiru: ['experimentar fazer (てみる)', 'c16l4'], teiku: ['ir fazendo (ていく)', ''], tekuru: ['vir fazendo (てくる)', ''],
    teageru: ['fazer para alguém (てあげる)', ''], tekureru: ['alguém faz para mim (てくれる)', ''], temorau: ['receber um favor (てもらう)', ''], tehoshii: ['querer que alguém faça (てほしい)', ''], tekudasai: ['pedido (てください)', 'c13l3'], tesumimasen: ['desculpa por… (てすみません)', ''], tekara: ['depois de (てから)', ''], temoii: ['permissão (てもいい)', ''], tewaikenai: ['proibição (てはいけない)', ''],
    'pot-pass': ['potencial ou passiva (られる)', 'c13l7'], 'pot-ranuki': ['potencial coloquial (sem ら)', 'c13l7'], pot: ['potencial (“conseguir”)', 'c13l7'], 'pot-suru': ['potencial de する (できる)', 'c13l7'], pass: ['passiva (れる / される)', 'c16l9'], caus: ['causativa (“fazer/deixar fazer”)', 'c16l10'], 'caus-pass': ['causativa-passiva (“ser obrigado a”)', 'c16l10'], 'caus-short': ['causativa curta (coloquial)', 'c16l10'],
    ba: ['condicional (ば)', 'c16l7'], 'adj-ba': ['adjetivo, condicional (ければ)', 'c16l7'], vol: ['volitiva (“vamos…”, “vou…”)', 'c13l8'], imp: ['imperativa (ordem)', 'c13l9'], 'imp-neg': ['proibição (な)', 'c13l9'], nasai: ['ordem branda (なさい)', ''],
    tai: ['querer fazer (たい)', 'c6l3'], tagaru: ['outra pessoa quer (たがる)', ''], nagara: ['ao mesmo tempo (ながら)', 'c13l13'], sou: ['“parece que vai…” (そう)', 'c14l9'], 'adj-sou': ['adjetivo, aparência (そう)', 'c14l9'], sugiru: ['demais (すぎる)', 'c14l10'], yasui: ['fácil de (やすい)', ''], nikui: ['difícil de (にくい)', ''], experience: ['experiência (たことがある)', 'c13l5'],
    'adj-neg': ['adjetivo, negativa (くない)', 'c14l1'], 'adj-past': ['adjetivo, passado (かった)', 'c14l1'], 'adj-te': ['adjetivo, forma て (くて)', 'c14l1'], 'adj-adv': ['adjetivo → advérbio (く)', 'c14l5'], 'adj-sa': ['adjetivo → substantivo (さ / げ)', ''], 'adj-vol': ['adjetivo, suposição (かろう)', ''], 'adj-naru': ['ficar… (くなる)', 'c14l4'], 'adj-ki': ['forma literária (き)', ''],
    desu: ['com です', ''], deshita: ['passado educado (でした)', ''], datta: ['passado (だった)', ''], janai: ['negativa (じゃない / ではない)', ''], janakatta: ['negativa no passado (じゃなかった)', ''], da: ['com だ', ''], 'na-adj': ['adjetivo -na antes de substantivo (な)', ''], 'ni-adv': ['advérbio (に)', ''], suru: ['substantivo + する (vira verbo)', 'c13l1'], stem: ['forma de ligação (連用形)', '']
  };
  const CONJ_PT = { casual: 'Dicionário (casual)', polite: 'Educada (ます)', neg: 'Negativa', politeneg: 'Educada negativa', past: 'Passado', politepast: 'Educada no passado', pastneg: 'Negativa no passado', te: 'Forma て', teiru: 'Em andamento (ている)', pot: 'Potencial', pass: 'Passiva', caus: 'Causativa', causpass: 'Causativa-passiva', ba: 'Condicional (ば)', tara: 'Condicional (たら)', vol: 'Volitiva', imp: 'Imperativa', tai: 'Desejo (たい)', adv: 'Advérbio', naru: 'Ficar (なる)', attr: 'Antes de substantivo', politeneg2: '' };

  return {
    BASE, setLoader: f => { loader = f; files.clear(); META = null; }, meta, available, metaError: () => metaErr, get,
    hira, kata, toKana, toRomaji, phon, lev, normW, isJp, hasKanji, isKanjiCh,
    entry, entries, summary, examples, entryById, jExact, jPrefix, jFuzzy, wExact, wPrefix, wFuzzy, kanji, strokes,
    deinflect, analyze, posFits, verbClass, conjugate, readingOf, search, tokenize, ptVariants,
    POS_PT, POS_SHORT, MISC_PT, FORM_PT, LANG_PT, RULE_PT, CONJ_PT, PARTICLES, RULES
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = JMD;
