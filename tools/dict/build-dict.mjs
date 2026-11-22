/* ==========================================================
   Nihongo Quest 15.0/16.0 — construção da base do Dicionário Geral (dict/v2/; a 14.0 usava dict/v1/)
   Fontes (ver docs/DICIONARIO-14.md e dict/v1/LICENSE.md):
   - JMdict (EDRDG, CC BY-SA 4.0) — entradas completas, via @johnmorrisdotca/jisho 2.11.0 (modo seguro)
   - Tatoeba (CC BY 2.0 FR) ligadas aos sentidos pelo JMdict_e_examp (EDRDG, CC BY-SA 4.0), via o mesmo pacote
   - KANJIDIC2 (EDRDG, CC BY-SA 4.0) com significados em português, via kanjidic2-json 0.1.0
   - KRADFILE (EDRDG, CC BY-SA 4.0) via @johnmorrisdotca/bushu 1.1.2
   - KanjiVG (CC BY-SA 3.0) — ordem dos traços; níveis JLPT de kanji de Jonathan Waller (CC BY); kanji parecidos
     (Lars Yencken CC BY 3.0 + KanjiVG) — via @johnmorrisdotca/jisho
   - Kanjium accents.txt (Uros O., CC BY-SA 4.0) — acento tonal (pitch accent)
   - Português: palavras revisadas do Nihongo Quest (tools/dict/nq-words.json) e traduções elaboradas do Nihongo
     Quest (tools/dict/pt/*.tsv), sempre com a origem marcada.
   - 15.0: português por sentido do JMdict (Português) / JMdict-PT (camada de tradução © Shiritai, CC BY-SA 4.0;
     tradução automática do inglês, sem revisão humana completa), commit fixo em cache/jmdict-pt/COMMIT. A camada é
     um mapa glosa inglesa → glosa portuguesa; aplicamos o mesmo resolvedor do projeto (correção por sentido → correção
     global → cache) às glosas da nossa versão do JMdict, então o ent_seq e a ordem dos sentidos são preservados.
   Uso:
     cd tools/dict && npm install --no-save @johnmorrisdotca/jisho@2.11.0 @johnmorrisdotca/bushu@1.1.2 kanjidic2-json@0.1.0
     curl -o cache/accents.txt https://raw.githubusercontent.com/mifunetoshiro/kanjium/master/data/source_files/raw/accents.txt
     git clone https://github.com/zhusupbekova/jmdict-pt && git -C jmdict-pt checkout e41652621c7fc239cb85aa7b023406bd258a1c92
       → copie data/*.jsonl, data/source.json, LICENSE, LICENSE-data.md e LICENSE-jmdict.html para cache/jmdict-pt/
     16.0: git clone https://github.com/omwn/omw-data cache/omw-data (commit em cache/omw-data/COMMIT) e o .dic do pacote npm
       dictionary-pt@4.0.0 em cache/vero/index.dic (só verificação); node resolve-pt16.mjs → pt16/resolvidas.tsv
     node build-dict.mjs   → ../../dict/v2/
   ========================================================== */
import fs from 'fs'; import path from 'path'; import { fileURLToPath, pathToFileURL } from 'url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const NM = path.join(HERE, 'node_modules');
const J = path.join(NM, '@johnmorrisdotca/jisho/dist/data');
const OUT = path.resolve(HERE, '../../dict/v2');
const DICT_VERSION = 2;
const imp = f => import(pathToFileURL(f).href);
const t0 = Date.now(); const log = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1) + 's', ...a);

/* ---------- utilidades de kana ---------- */
const hira = s => String(s || '').replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
const isKanji = ch => /[一-鿿㐀-䶿々〆ヶ]/.test(ch) || (ch.codePointAt(0) >= 0x20000 && ch.codePointAt(0) <= 0x3134f);
const stripAcc = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ---------- 1. entradas completas do JMdict ---------- */
const mark = n => String.fromCharCode(0xe000 + n);
const [ONLY_FORMS, ONLY_READINGS, SEE_ALSO, ANTONYMS, NOTES, SOURCES, NUMBER] = [1, 2, 3, 4, 5, 6, 7].map(mark);
const KIND = { [mark(0x10)]: 'lit', [mark(0x11)]: 'expl', [mark(0x12)]: 'fig', [mark(0x13)]: 'tm' };
const split = (t, by) => (t ? t.split(by) : []);
function readEntry(line) {
  const [key, forms = '', readings = '', ...senses] = line.split('\t');
  const e = {
    i: parseInt(key, 36),
    k: split(forms, '|').map(f => { const [t, m = ''] = f.split('~'); return m ? [t, m] : [t]; }),
    r: split(readings, '|').map(f => { const [t, m = '', only = '', nok = ''] = f.split('~'); const o = [t]; if (m || only || nok) o.push(m); if (only || nok) o.push(only); if (nok) o.push(1); return o; }),
    s: []
  };
  senses.forEach((field, at) => {
    const [pos = '', marks = '', ...rest] = field.split('¦');
    const s = { p: pos, g: [] }; if (marks) s.m = marks;
    let num = null;
    for (const part of rest) {
      const f = part.charAt(0);
      if (f >= ONLY_FORMS && f <= NUMBER) {
        const v = part.slice(1);
        if (f === ONLY_FORMS) s.of = v; else if (f === ONLY_READINGS) s.or = v; else if (f === SEE_ALSO) s.x = v; else if (f === ANTONYMS) s.a = v;
        else if (f === NOTES) s.n = v.replace(/\u2028/g, ' · '); else if (f === SOURCES) s.l = v; else if (f === NUMBER) num = Number(v);
      } else if (KIND[f]) s.g.push('[' + KIND[f] + ']' + part.slice(1));
      else s.g.push(part);
    }
    void num; e.s.push(s);
  });
  return e;
}
const E = new Map();
const files = d => fs.readdirSync(d).filter(f => f.endsWith('.data.js'));
for (const f of files(path.join(J, 'words')).filter(f => /^e\d+\.data\.js$/.test(f)).sort()) {
  const { PIECE } = await imp(path.join(J, 'words', f));
  for (const line of PIECE.rows) { const e = readEntry(line); E.set(e.i, e); }
}
const manifest = (await imp(path.join(J, 'words/entry-manifest.data.js'))).ENTRY_MANIFEST;
log('JMdict: entradas', E.size, 'release', manifest.release);

/* ---------- 2. prioridade (frequência) por leitura ---------- */
const TAG = { n: 'news1', m: 'news2', i: 'ichi1', j: 'ichi2', s: 'spec1', t: 'spec2', g: 'gai1', h: 'gai2' };
function rankOf(stored) {
  const band = /\d\d$/.exec(stored); const letters = [...stored.replace(/\d+$/, '')].map(x => TAG[x]).filter(Boolean);
  if (band) return (Number(band[0]) - 1) * 500 + 250;
  if (letters.some(t => /1$/.test(t))) return 12000;
  if (letters.length) return 24000;
  return 100000;
}
const RANK = new Map(), COMMON = new Set(), UKANA = new Set();
for (const f of files(path.join(J, 'words')).filter(f => /^r\d+\.data\.js$/.test(f))) {
  const { PIECE } = await imp(path.join(J, 'words', f));
  for (const line of PIECE.rows) {
    const [, , whole = ''] = line.split('\t'); const h = whole.indexOf('#'); if (h < 0) continue;
    const id = parseInt(whole.slice(h + 1), 36), st = whole.slice(0, h), at = st.indexOf('~');
    const flags = at < 0 ? st : st.slice(0, at), pr = at < 0 ? '' : st.slice(at + 1);
    const r = rankOf(pr); if (!RANK.has(id) || r < RANK.get(id)) RANK.set(id, r);
    if (flags.includes('C')) COMMON.add(id); if (flags.includes('U')) UKANA.add(id);
  }
}
log('prioridades', RANK.size, 'comuns', COMMON.size);

/* ---------- 3. acento tonal (Kanjium) ---------- */
const ACC = new Map();
const accFile = path.join(HERE, 'cache/accents.txt');
if (fs.existsSync(accFile)) for (const line of fs.readFileSync(accFile, 'utf8').split('\n')) { const [w, r, a] = line.split('\t'); if (w && a) ACC.set(w + '\t' + hira(r || w), a.trim()); }
log('acentos', ACC.size);

/* ---------- 4. português ---------- */
const PT = new Map(); // id -> [{t, src, s}]
const addPt = (id, t, src, s = -1, ex) => { const l = PT.get(id) || []; if (!l.some(x => x.t === t)) l.push({ t, src, s }); PT.set(id, l); };
const NQEX = new Map(); // id -> exemplos do app (jp, ro, pt)
const NQITEMS = new Map(); // id -> ids de itens do app
const NQKEY = []; // [id, chave da entrada do dicionário do app]
// índice auxiliar forma/leitura -> ids
const BYFORM = new Map(), BYREAD = new Map();
for (const e of E.values()) {
  e.k.forEach(([t]) => { (BYFORM.get(t) || BYFORM.set(t, []).get(t)).push(e.i); });
  e.r.forEach(([t]) => { const h = hira(t); (BYREAD.get(h) || BYREAD.set(h, []).get(h)).push(e.i); });
}
const rk = id => (RANK.get(id) ?? 100000) - (COMMON.has(id) ? 1 : 0);
const NQPOS = { verbo: /^v/, 'adj-i': /^adj-i/, 'adj-na': /^adj-na/, subst: /^n/, adv: /^adv/, expr: /^(exp|int)/, pron: /^pn/, num: /^num/, cont: /^ctr/, interj: /^int/ };
const posOk = (e, p) => !p || !NQPOS[p] || e.s.some(s => s.p.split(',').some(x => NQPOS[p].test(x)));
let nqLinked = 0, nqMiss = [];
const NQ = JSON.parse(fs.readFileSync(path.join(HERE, 'nq-words.json'), 'utf8'));
for (const w of NQ) {
  const kana = hira(w.kana.replace(/[、。！？!?\s〜~…]/g, '')), kanji = w.kanji.replace(/[、。！？!?\s]/g, '');
  let cands = [];
  if (kanji) cands = (BYFORM.get(kanji) || []).filter(id => E.get(id).r.some(([t]) => hira(t) === kana));
  if (!cands.length && kana) cands = (BYREAD.get(kana) || []).filter(id => !kanji || !E.get(id).k.length || E.get(id).k.some(([t]) => t === kanji));
  if (!cands.length && kana && !kanji) cands = BYFORM.get(w.kana) || [];
  if (cands.length > 1) { const ok = cands.filter(id => posOk(E.get(id), w.pos)); if (ok.length) cands = ok; }
  if (cands.length > 1 && !kanji) { const k0 = cands.filter(id => !E.get(id).k.length || UKANA.has(id)); if (k0.length) cands = k0; }
  cands.sort((a, b) => rk(a) - rk(b));
  const id = cands[0];
  if (id == null) { nqMiss.push((w.kanji || '') + '|' + w.kana); continue; }
  nqLinked++;
  w.pt.forEach(t => addPt(id, t, 'nq'));
  if (w.ex && w.ex.length) NQEX.set(id, (NQEX.get(id) || []).concat(w.ex).slice(0, 3));
  if (w.items && w.items.length) NQITEMS.set(id, [...new Set((NQITEMS.get(id) || []).concat(w.items))]);
  NQKEY.push([id, w.key]);
}
log('português do Nihongo Quest ligado a', nqLinked, 'entradas; sem par no JMdict:', nqMiss.length);
// traduções elaboradas (id \t sentido \t texto). Sentido -1 = significado geral.
const ptDir = path.join(HERE, 'pt');
let trN = 0;
if (fs.existsSync(ptDir)) for (const f of fs.readdirSync(ptDir).filter(f => f.endsWith('.tsv')).sort()) {
  for (const line of fs.readFileSync(path.join(ptDir, f), 'utf8').split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const [idS, sS, t] = line.split('\t'); const id = Number(idS); if (!E.has(id) || !t) continue;
    if (PT.has(id) && PT.get(id).some(x => x.src === 'nq')) continue; // o português revisado do app tem prioridade
    t.split(/\s*;\s*/).filter(Boolean).forEach(x => addPt(id, x.trim(), 'tr', Number(sS)));
    trN++;
  }
}
log('traduções elaboradas', trN);
// JMdict-PT: glosa inglesa -> português, com as correções do projeto (por sentido e globais) na frente do cache
const JPT = path.join(HERE, 'cache/jmdict-pt');
const jl = f => fs.existsSync(path.join(JPT, f)) ? fs.readFileSync(path.join(JPT, f), 'utf8').split('\n').filter(l => l.trim()).map(l => JSON.parse(l)) : [];
const MT = new Map(jl('pt-gloss-cache.jsonl').map(o => [o.en, o.pt]));
const MT_G = new Map(jl('global-overrides.jsonl').map(o => [o.en, o.pt]));
const MT_S = new Map(jl('overrides.jsonl').map(o => [o.ent_seq + '#' + o.sense_index + '#' + o.en, o.pt]));
if (!MT.size) throw new Error('JMdict-PT ausente: veja o cabeçalho (cache/jmdict-pt/pt-gloss-cache.jsonl)');
const MT_COMMIT = fs.existsSync(path.join(JPT, 'COMMIT')) ? fs.readFileSync(path.join(JPT, 'COMMIT'), 'utf8').trim() : '';
const MT_SNAP = fs.existsSync(path.join(JPT, 'source.json')) ? JSON.parse(fs.readFileSync(path.join(JPT, 'source.json'), 'utf8')).snapshotDate : '';
const mtSt = { glosses: 0, translated: 0, same: 0, dupInSense: 0, capFix: 0, senses: 0, sensesPt: 0 };
/* português de um sentido: só a tradução da glosa. Ajustes mecânicos (documentados em dict/v2/LICENSE.md): maiúscula
   inicial vazada do inglês vira minúscula; tradução igual ao inglês não conta como português (nomes científicos,
   termos não traduzidos); repetições dentro do mesmo sentido saem. Nada é inventado: sem tradução, fica o inglês. */
let SAME = null;
function mtSense(id, si, gl) {
  const out = []; mtSt.senses++;
  gl.forEach(g => {
    const mm = /^\[(lit|expl|fig|tm)\]/.exec(g), en = mm ? g.slice(mm[0].length) : g; mtSt.glosses++;
    let pt = MT_S.get(id + '#' + (si + 1) + '#' + en) ?? MT_G.get(en) ?? MT.get(en);
    if (pt == null) return;
    pt = String(pt).replace(/\s+/g, ' ').trim(); if (!pt) return;
    if (pt === en) { mtSt.same++; if (SAME) SAME.push(en); return; } // não conta como português (só ajuda a busca)
    if (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]/.test(pt) && /^[a-z(]/.test(en) && !/^[A-Z]/.test(en)) { pt = pt[0].toLowerCase() + pt.slice(1); mtSt.capFix++; }
    const t = (mm ? mm[0] : '') + pt;
    if (out.includes(t)) { mtSt.dupInSense++; return; }
    out.push(t); mtSt.translated++;
  });
  if (out.length) mtSt.sensesPt++;
  return out;
}

/* 16.0: português das entradas que ficaram sem nenhum na 15.0 (pt16/resolvidas.tsv, gerado por resolve-pt16.mjs).
   Por sentido, com a origem: cg = cognato do JMdict-PT confirmado como português (OpenWN-PT/Wiktionary/VERO);
   wn = correspondência pela WordNet (Japanese WordNet × OpenWN-PT/Wiktionary, checada pelo inglês do sentido);
   tr = tradução do Nihongo Quest (IA, sem revisão humana); em = nome/empréstimo usado igual em português. */
const R16 = new Map(); const r16St = { cg: 0, wn: 0, tr: 0, em: 0, entries: 0 };
const R16F = path.join(HERE, 'pt16/resolvidas.tsv');
if (fs.existsSync(R16F)) for (const line of fs.readFileSync(R16F, 'utf8').split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const [idS, siS, src, t] = line.split('\t'); const id = Number(idS); if (!E.has(id) || !t) continue;
  (R16.get(id) || R16.set(id, new Map()).get(id)).set(Number(siS), [src, t.split('|').filter(Boolean)]);
}
log('16.0: entradas com português por sentido de pt16/resolvidas.tsv', R16.size);

/* ---------- 5. exemplos (Tatoeba) ---------- */
const EX = new Map();
for (const f of files(path.join(J, 'examples')).filter(f => /^s\d+\.data\.js$/.test(f))) {
  const { PIECE } = await imp(path.join(J, 'examples', f));
  for (const line of PIECE.rows) {
    const [key, ...exs] = line.split('\t'); const id = parseInt(key, 36);
    EX.set(id, exs.map(x => { const [s, jp, en, lv, tid, aj, ae, form] = x.split('¦'); return [Number(s), jp, en, Number(lv) || 0, tid, aj || '', ae || '', form || '']; }));
  }
}
log('exemplos para', EX.size, 'entradas');

/* ---------- 6. kanji ---------- */
const KD = JSON.parse(fs.readFileSync(path.join(NM, 'kanjidic2-json/KANJIS.json'), 'utf8'));
const KJ = (await imp(path.join(J, 'kanji.data.js'))).KANJI;
const JLPT = new Map(KJ.rows.map(r => [r[0], r[3]]));
const KDREL = KJ.release;
const RAD = (await imp(path.join(NM, '@johnmorrisdotca/bushu/dist/data/radkfile.data.js'))).RADKFILE;
const COMP = new Map();
RAD.radicals.forEach(r => { for (const ch of r.kanji) { (COMP.get(ch) || COMP.set(ch, []).get(ch)).push(r.radical); } });
const LA = (await imp(path.join(J, 'look-alike.data.js'))).LOOK_ALIKE;
const SIM = new Map();
LA.pairs.forEach(([pair, a, b, c = 0]) => { const [x, y] = [...pair]; const sc = Math.max(a, b, c); [[x, y], [y, x]].forEach(([p, q]) => { (SIM.get(p) || SIM.set(p, []).get(p)).push([q, sc]); }); });
const STROKES = new Map();
for (const f of files(path.join(J, 'strokes')).filter(f => /^t\d+\.data\.js$/.test(f))) {
  const { PIECE } = await imp(path.join(J, 'strokes', f));
  for (const line of PIECE.rows) { const [ch, p] = line.split('\t'); STROKES.set(ch, p); }
}
log('kanji KANJIDIC2', KD.length, 'traços', STROKES.size);
const KMAP = new Map(KD.map(k => [k.literal, k]));

/* alinhamento palavra × leitura: descobre a leitura de cada kanji numa palavra a partir das leituras do KANJIDIC2
   (com rendaku e consoante dobrada). Sem alinhamento possível = leitura especial (jukujikun/ateji). */
const DAK = { か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご', さ: 'ざ', し: 'じ', す: 'ず', せ: 'ぜ', そ: 'ぞ', た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど', は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ' };
const HAN = { は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ' };
const KREAD = new Map();
function kReads(ch) {
  if (KREAD.has(ch)) return KREAD.get(ch);
  const k = KMAP.get(ch), out = new Map();
  if (k && k.readings) {
    (k.readings.ja_on || []).forEach(r => out.set(hira(r.replace(/-/g, '')), hira(r.replace(/-/g, ''))));
    (k.readings.ja_kun || []).forEach(r => { const x = hira(r.replace(/-/g, '')); const stem = x.split('.')[0]; out.set(stem, stem); if (x.includes('.')) out.set(x.replace('.', ''), stem); });
    (k.nanoris || []).forEach(r => { const x = hira(r); if (!out.has(x)) out.set(x, x); });
  }
  const variants = [];
  for (const [r, base] of out) {
    if (!r) continue;
    variants.push([r, base]);
    const f = r[0]; if (DAK[f]) variants.push([DAK[f] + r.slice(1), base]); if (HAN[f]) variants.push([HAN[f] + r.slice(1), base]);
    if (f === 'ち' || f === 'つ') variants.push([(f === 'ち' ? 'じ' : 'ず') + r.slice(1), base]);
    const l = r[r.length - 1]; if (r.length > 1 && 'つちくき'.includes(l)) variants.push([r.slice(0, -1) + 'っ', base]);
  }
  KREAD.set(ch, variants); return variants;
}
function align(form, reading) {
  const chars = [...form], R = hira(reading);
  const res = [];
  const rec = (i, p, acc) => {
    if (res.length) return;
    if (i === chars.length) { if (p === R.length) res.push(acc.slice()); return; }
    const c = chars[i];
    if (!isKanji(c)) { const h = hira(c); if (R.startsWith(h, p)) rec(i + 1, p + h.length, acc); else if (c === 'ヶ' || c === 'ケ') { for (const x of ['か', 'が', 'こ']) if (R.startsWith(x, p)) rec(i + 1, p + 1, acc); } return; }
    let cands = c === '々' && i > 0 ? (acc.length ? [[acc[acc.length - 1][1], '々']] : []) : kReads(c);
    if (c === '々' && acc.length) { const pr = acc[acc.length - 1][1]; cands = [[pr, '々']]; if (DAK[pr[0]]) cands.push([DAK[pr[0]] + pr.slice(1), '々']); }
    for (const [r, base] of cands) if (R.startsWith(r, p)) { acc.push([c, r, base]); rec(i + 1, p + r.length, acc); acc.pop(); if (res.length) return; }
  };
  rec(0, 0, []);
  return res[0] || null;
}

/* ---------- 7. montar as entradas finais e os índices ---------- */
const ids = [...E.keys()].sort((a, b) => rk(a) - rk(b) || a - b); // posição = ordem de frequência (as comuns ficam nos primeiros blocos)
const SHARD = 1000;
let nShard = 0;
fs.rmSync(OUT, { recursive: true, force: true });
['e', 'x', 'm', 'j', 'w', 'k', 's'].forEach(d => fs.mkdirSync(path.join(OUT, d), { recursive: true }));
const JIDX = new Map(); // bucket -> Map(key -> Set(ids))
const bucketOf = key => { const ch = [...key][0]; const cp = ch.codePointAt(0); if (cp >= 0x3040 && cp <= 0x30ff) return 'h' + cp.toString(16); if (isKanji(ch)) return 'k' + (cp % 64); return 'o'; };
const addJ = (key, id) => { if (!key) return; const b = bucketOf(key); const m = JIDX.get(b) || JIDX.set(b, new Map()).get(b); const s = m.get(key) || m.set(key, new Set()).get(key); s.add(id); };
const WIDX = new Map(); // termo (en/pt) -> Map(id -> score)
const STOP = new Set('a an the of to in on at by for with from and or as is be it its into one some any something someone e.g. etc oneself (s) de do da dos das o a os as um uma uns umas e ou em no na nos nas por para com que se ao à ex algo alguem pelo pela pelos pelas seu sua seus suas num numa'.split(' '));
const normW = s => stripAcc(String(s).toLowerCase()).replace(/\[(lit|expl|fig|tm)\]/g, '').replace(/\([^)]*\)/g, ' ').replace(/[“”"'!?.,;:]/g, ' ').replace(/[-‐]/g, ' ').replace(/\s+/g, ' ').trim();
const addW = (lang, term, id, sc) => { if (!term || term.length < 2 || term.length > 40) return; const k = lang + term; const m = WIDX.get(k) || WIDX.set(k, new Map()).get(k); if ((m.get(id) || 0) < sc) m.set(id, sc); };
/* pontuação: significado inteiro = EXACT + (100 − sentido − posição + bônus); palavra dentro de um significado maior
   = abaixo de EXACT (o app mostra como “relacionado”). */
const EXACT = 200;
const PT_LEAD = /^(ficar|estar|ser|tornar se|sentir se|ter|fazer|dar|estar com|ficar com|sentir|se) (.+)$/;
function indexGloss(lang, text, id, si, gi, bonus) {
  let n = normW(text); if (!n) return;
  // português: posição pesa mais, e um qualificador entre parênteses (“desaparecer (de energia)”) indica sentido restrito
  const base = lang === 'p' ? 100 - si * 10 - gi * 4 - (/\(/.test(text) ? 6 : 0) + bonus : 100 - si * 6 - gi * 2 + bonus;
  const phrases = [[n, 0]]; if (lang === 'e' && n.startsWith('to ')) phrases.push([n.slice(3), 0]);
  if (lang === 'p') {
    // sinônimos juntos num texto só (“felicidade, boa sorte”; “a / b”) valem cada um como significado inteiro
    const parts = String(text).replace(/\[(lit|expl|fig|tm)\]/g, '').replace(/\([^)]*\)/g, ' ').split(/\s*[,;/]\s*/).map(normW).filter(Boolean);
    if (parts.length > 1) parts.forEach((x, pi) => phrases.push([x, 2 + pi]));
    phrases.slice().forEach(([ph, pp]) => {
      // 16.0: a forma derivada não paga a posição inteira da glosa (疲れる: “ficar cansado” é a 5ª glosa, mas 疲れた = cansado)
      const back = Math.min(gi, 1) * 4 - gi * 4;
      const m = PT_LEAD.exec(ph); if (m && m[2].split(' ').length <= 3) phrases.push([m[2], pp + 7 + back]); // ficar cansado → cansado
      const r = /^(\S+?)r se$/.exec(ph); if (r) phrases.push([r[1] + 'r', pp + 10]); // cansar-se → cansar
      const v = /^(\S+[aei]r) (em|de|a|com|por|para|no|na|do|da)$/.exec(ph); if (v) phrases.push([v[1], pp + 6]); // confiar em → confiar
    });
  }
  phrases.forEach(([ph, pen]) => { if (ph && ph.split(' ').length <= 5) addW(lang, ph, id, EXACT + Math.max(1, base - pen)); });
  const words = n.split(' ').filter(w => w.length >= 2 && !STOP.has(w));
  words.forEach(w => addW(lang, w, id, Math.max(1, Math.min(EXACT - 1, 52 - si * 4 - Math.min(20, words.length * 2) + bonus))));
}
const ORD = new Map(); // ent_seq -> posição (os índices guardam a posição: números menores)
const KW = new Map(); // kanji -> [[id, form, reading-do-kanji]]
let nEntries = 0, nPt = 0, nEx = 0, nAcc = 0, nExpr = 0, nMt = 0, nAnyPt = 0;
for (let i = 0; i < ids.length; i += SHARD) {
  const chunk = ids.slice(i, i + SHARD);
  const shard = [], xshard = {}, mshard = [];
  for (const id of chunk) {
    const e = E.get(id), out = { i: id, k: e.k, r: e.r, s: e.s };
    ORD.set(id, nEntries);
    const rank = RANK.get(id) ?? 100000; out.f = rank; if (COMMON.has(id)) out.c = 1; if (UKANA.has(id)) out.u = 1;
    if (PT.has(id)) { out.pt = PT.get(id).map(x => x.s >= 0 ? [x.t, x.src, x.s] : [x.t, x.src]); nPt++; }
    const acc = [];
    (e.k.length ? e.k : [[null]]).forEach(([f]) => e.r.forEach(([r]) => { const a = ACC.get((f || r) + '\t' + hira(r)); if (a && !acc.some(x => x[0] === r)) acc.push([r, a]); }));
    if (acc.length) { out.pa = acc; nAcc++; }
    if (NQITEMS.has(id)) out.nq = NQITEMS.get(id);
    if (NQEX.has(id)) out.qx = NQEX.get(id).map(x => [x.jp, x.ro, x.pt]);
    if (EX.has(id)) { xshard[nEntries] = EX.get(id); out.xn = EX.get(id).length; nEx++; }
    if (e.s.some(s => /(^|,)exp(,|$)/.test(s.p))) nExpr++;
    const trim = a => { while (a.length && (a[a.length - 1] == null || a[a.length - 1] === '')) a.pop(); return a; };
    const same = []; SAME = same;
    const pg = e.s.map((s, si) => mtSense(id, si, s.g)); if (pg.some(l => l.length)) nMt++;
    const po = e.s.map(() => ''); // 16.0: origem do português do sentido quando não é o JMdict-PT comum
    if (R16.has(id) && !PT.has(id) && !pg.some(l => l.length)) { let any = false; R16.get(id).forEach(([src, gl], si) => { if (si < pg.length && gl.length) { pg[si] = gl; po[si] = src; r16St[src]++; any = true; } }); if (any) r16St.entries++; }
    SAME = null;
    shard.push(trim([out.i, out.k, out.r, out.s.map((s, si) => trim([s.p, s.m, s.g, s.x, s.a, s.n, s.l, s.of, s.or, pg[si].length ? pg[si] : '', po[si]])), out.f, (out.c ? 1 : 0) | (out.u ? 2 : 0), out.pt, out.pa, out.nq, out.qx, out.xn]));
    { // resumo para a lista de resultados: forma mostrada, leitura, classe, significado curto, marcas
      const k0 = e.k.find(x => !x[1] || !/(sK|iK|oK|rK)/.test(x[1])), r0 = e.r.find(x => !x[1] || !/(sk|ik|ok)/.test(x[1])) || e.r[0];
      const shown = out.u || !k0 ? r0[0] : k0[0];
      const noK = t => t.replace(/\[(lit|expl|fig|tm)\]/g, '');
      const mtGl = pg.map(l => l.slice(0, 3).map(noK).join(', ')).filter(Boolean).slice(0, 2).join('; ');
      const enGl = e.s.slice(0, 2).map(s => s.g.slice(0, 3).join(', ')).map(noK).join('; ');
      const gl = out.pt ? out.pt.slice(0, 3).map(x => x[0]).join('; ') : mtGl || enGl;
      const useMt = !out.pt && !!mtGl;
      const cut = (t, n) => t.length > n ? t.slice(0, n - 2) + '…' : t;
      // 15.0: [5] = sentido em inglês curto, para diferenciar palavras com o mesmo português (banco: bank / bench)
      mshard.push(trim([shown, shown === r0[0] ? '' : r0[0], (e.s[0] && e.s[0].p.split(',')[0]) || '', cut(gl, 90), (out.c ? 1 : 0) | (out.pt ? 4 : 0) | (useMt ? 8 : 0), out.pt || useMt ? cut(noK(e.s.slice(0, 2).map(s => s.g[0]).join('; ')), 44) : '']));
    }
    nEntries++;
    // índice japonês
    e.k.forEach(([t]) => addJ(t, id)); e.r.forEach(([t]) => addJ(hira(t), id));
    // índice de significados
    const bonus = (COMMON.has(id) ? 18 : 0) + Math.max(0, 12 - Math.floor(rank / 2000));
    const nqB = NQITEMS.has(id) ? 8 : 0; // palavras ensinadas no app: geralmente as mais básicas
    e.s.forEach((s, si) => { if (si > 7) return; s.g.slice(0, 6).forEach((g, gi) => indexGloss('e', g, id, si, gi, bonus + nqB)); });
    // português: do app (nq) > traduções elaboradas (tr) > tradução automática por sentido (JMdict-PT)
    (out.pt || []).forEach(([t, src, s], gi) => indexGloss('p', t, id, s >= 0 ? s : 0, gi, bonus + (src === 'nq' ? 16 : 14)));
    pg.forEach((l, si) => { if (si > 9) return; l.slice(0, 7).forEach((t, gi) => indexGloss('p', t, id, si, gi, bonus)); });
    same.slice(0, 4).forEach(t => { const n = normW(t); if (n && n.split(' ').length <= 2) addW('p', n, id, EXACT + Math.max(1, 70 + bonus)); }); // empréstimos iguais nas duas línguas (saudade, sushi)
    if (out.pt || pg.some(l => l.length)) nAnyPt++;
    // kanji -> palavras (com a leitura do kanji em cada palavra)
    e.k.forEach(([form, m], fi) => {
      if (m && /(sK|iK|oK|rK)/.test(m)) return;
      const ks = [...form].filter(c => isKanji(c) && c !== '々'); if (!ks.length) return;
      const rd = e.r.find(r => !r[2] || r[2].split(',').includes(form)) || e.r[0];
      const al = align(form, rd[0]);
      ks.forEach(c => { const a = al && al.find(x => x[0] === c); const l = KW.get(c) || KW.set(c, []).get(c); if (!l.some(x => x[0] === id)) l.push([id, form, hira(rd[0]), a ? a[2] : '*', rank]); });
    });
  }
  const nm = String(nShard++).padStart(3, '0');
  fs.writeFileSync(path.join(OUT, 'e', nm + '.json'), JSON.stringify(shard));
  fs.writeFileSync(path.join(OUT, 'm', nm + '.json'), JSON.stringify(mshard));
  if (Object.keys(xshard).length) fs.writeFileSync(path.join(OUT, 'x', nm + '.json'), JSON.stringify(xshard));
}
log('entradas', nEntries, 'com português revisado/elaborado', nPt, 'com português automático', nMt, 'com algum português', nAnyPt, 'com exemplos', nEx, 'com acento', nAcc);
log('JMdict-PT', JSON.stringify(mtSt));

// índice japonês por primeiro caractere
let jKeys = 0;
for (const [b, m] of JIDX) {
  const rows = [...m.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).map(([k, s]) => [k, ...[...s].sort((x, y) => rk(x) - rk(y)).map(x => ORD.get(x))]);
  jKeys += rows.length;
  fs.writeFileSync(path.join(OUT, 'j', b + '.json'), JSON.stringify(rows));
}
log('índice japonês', jKeys, 'chaves em', JIDX.size, 'arquivos');
// índice de significados (inglês 'e' / português 'p') por 2 primeiras letras
const WB = new Map();
for (const [k, m] of WIDX) {
  const lang = k[0], term = k.slice(1);
  const b = lang + (/^[a-z0-9]{2}/.test(term) ? term.slice(0, 2) : /^[a-z0-9]/.test(term) ? term[0] + '_' : '__');
  const top = [...m.entries()].sort((a, b) => b[1] - a[1] || rk(a[0]) - rk(b[0])).slice(0, 80).flatMap(([id, sc]) => [ORD.get(id), sc]);
  (WB.get(b) || WB.set(b, []).get(b)).push([term, ...top]);
}
let wTerms = 0;
for (const [b, rows] of WB) { rows.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)); wTerms += rows.length; fs.writeFileSync(path.join(OUT, 'w', b + '.json'), JSON.stringify(rows)); }
log('índice de significados', wTerms, 'termos em', WB.size, 'arquivos');

/* kanji: ficha completa (todos os 13 mil do KANJIDIC2), palavras por leitura e traços em arquivos separados */
const KB = new Map(), SB = new Map();
const kb = ch => 'k' + (ch.codePointAt(0) % 64);
let nK = 0, nKpt = 0, nKw = 0;
for (const k of KD) {
  const ch = k.literal, R = k.readings || {}, M = k.meanings || {};
  const o = { c: ch, sc: (k.strokeCounts || [])[0] || 0 };
  if (M.pt && M.pt.length) { o.pt = M.pt; nKpt++; }
  if (M.en && M.en.length) o.en = M.en;
  if (R.ja_on && R.ja_on.length) o.on = R.ja_on;
  if (R.ja_kun && R.ja_kun.length) o.kun = R.ja_kun;
  if (k.nanoris && k.nanoris.length) o.na = k.nanoris;
  if (k.radicals && k.radicals.classical) o.rad = k.radicals.classical;
  if (k.grade) o.g = k.grade;
  if (JLPT.get(ch)) o.j = JLPT.get(ch);
  if (k.freq) o.fr = k.freq;
  if (COMP.has(ch)) o.cp = COMP.get(ch).join('');
  if (SIM.has(ch)) o.sim = SIM.get(ch).sort((a, b) => b[1] - a[1]).slice(0, 8).map(x => x[0]).join('');
  if (STROKES.has(ch)) o.st = 1;
  // palavras: as mais comuns no geral + até 10 por leitura + até 10 leituras especiais
  const ws = (KW.get(ch) || []).sort((a, b) => a[4] - b[4] || a[1].length - b[1].length);
  if (ws.length) {
    const pick = new Map(); ws.slice(0, 30).forEach(w => pick.set(w[0], w));
    const byR = new Map(); ws.forEach(w => { const l = byR.get(w[3]) || byR.set(w[3], []).get(w[3]); if (l.length < 12) { l.push(w); pick.set(w[0], w); } });
    o.w = [...pick.values()].sort((a, b) => a[4] - b[4]).map(w => [ORD.get(w[0]), w[1], w[2], w[3]]);
    o.wn = ws.length; nKw++;
  }
  (KB.get(kb(ch)) || KB.set(kb(ch), {}).get(kb(ch)))[ch] = o; nK++;
  if (STROKES.has(ch)) (SB.get(kb(ch)) || SB.set(kb(ch), {}).get(kb(ch)))[ch] = STROKES.get(ch);
}
for (const [b, m] of KB) fs.writeFileSync(path.join(OUT, 'k', b + '.json'), JSON.stringify(m));
for (const [b, m] of SB) fs.writeFileSync(path.join(OUT, 's', b + '.json'), JSON.stringify(m));
log('kanji', nK, 'com português', nKpt, 'com palavras', nKw);

/* ---------- 8. meta ---------- */
const sha = d => { let n = 0, sz = 0; for (const f of fs.readdirSync(path.join(OUT, d))) { n++; sz += fs.statSync(path.join(OUT, d, f)).size; } return [n, sz]; };
const counts = { entries: nEntries, common: COMMON.size, expressions: nExpr, withPt: nPt, ptNq: [...PT.values()].filter(l => l.some(x => x.src === 'nq')).length, ptTr: [...PT.values()].filter(l => l.some(x => x.src === 'tr') && !l.some(x => x.src === 'nq')).length, ptMt: nMt, withAnyPt: nAnyPt, mtGlosses: mtSt.translated, mtSenses: mtSt.sensesPt, senses: mtSt.senses, glosses: mtSt.glosses, mtSame: mtSt.same, pt16: r16St, withExamples: nEx, examples: [...EX.values()].reduce((a, l) => a + l.length, 0), withAccent: nAcc, kanji: nK, kanjiPt: nKpt, kanjiStrokes: STROKES.size, jKeys, wTerms };
const meta = {
  v: DICT_VERSION, built: new Date().toISOString().slice(0, 10), shard: SHARD, shards: nShard, counts,
  files: Object.fromEntries(['e', 'x', 'm', 'j', 'w', 'k', 's'].map(d => [d, sha(d)])),
  xShards: fs.readdirSync(path.join(OUT, 'x')).map(f => parseInt(f, 10)).sort((a, b) => a - b), jBuckets: [...JIDX.keys()].sort(), wBuckets: [...WB.keys()].sort(), kBuckets: [...KB.keys()].sort(), sBuckets: [...SB.keys()].sort(),
  sources: { jmdict: manifest.release, kanjidic2_jisho: KDREL, kanjium: 'accents.txt (master)', package: '@johnmorrisdotca/jisho 2.11.0', jmdictPt: { repo: 'https://github.com/zhusupbekova/jmdict-pt', commit: MT_COMMIT, snapshot: MT_SNAP, license: 'CC BY-SA 4.0 (camada de tradução © Shiritai)', kind: 'tradução automática (gpt-4.1-mini) com correções da comunidade; não revisada' },
    pt16: { resolver: 'tools/dict/resolve-pt16.mjs', wordnets: 'Open Multilingual Wordnet omw-data (Japanese WordNet © 2009, 2010 NICT; OpenWN-PT CC BY-SA 3.0; Wiktionary CC BY-SA 3.0; Princeton WordNet 3.0)', omwCommit: fs.existsSync(path.join(HERE, 'cache/omw-data/COMMIT')) ? fs.readFileSync(path.join(HERE, 'cache/omw-data/COMMIT'), 'utf8').trim() : '', kinds: { cg: 'cognato do JMdict-PT confirmado como português', wn: 'WordNet (Japanese WordNet × OpenWN-PT/Wiktionary)', tr: 'tradução do Nihongo Quest (IA, sem revisão humana)', em: 'nome ou empréstimo usado igual em português' } } }
};
fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta));
['LICENSE-data.md', 'LICENSE-jmdict.html'].forEach(f => fs.copyFileSync(path.join(JPT, f), path.join(OUT, f === 'LICENSE-data.md' ? 'JMDICT-PT-LICENSE-data.md' : 'LICENSE-jmdict.html')));
// 16.0: avisos das WordNets usadas na resolução (a licença da Japanese WordNet exige o aviso em todas as cópias)
[['jpn/LICENSE', 'JAPANESE-WORDNET-LICENSE.txt'], ['por/LICENSE', 'OPENWN-PT-LICENSE.txt'], ['wikt/LICENSE', 'WIKTIONARY-WORDNET-LICENSE.txt'], ['eng/LICENSE', 'PRINCETON-WORDNET-LICENSE.txt']].forEach(([a, b]) => { const f = path.join(HERE, 'cache/omw-data/wns', a); if (fs.existsSync(f)) fs.copyFileSync(f, path.join(OUT, b)); });
const LIC = path.join(HERE, 'LICENSE.md'); if (fs.existsSync(LIC)) fs.copyFileSync(LIC, path.join(OUT, 'LICENSE.md'));
// ligação palavra do app (chave local) -> posição no dicionário geral
fs.writeFileSync(path.join(OUT, 'nq.json'), JSON.stringify(NQKEY.map(([id, k]) => [ORD.get(id), k])));
fs.writeFileSync(path.join(HERE, 'nq-unlinked.txt'), nqMiss.join('\n'));
log('pronto', JSON.stringify(counts));
log('tamanhos', JSON.stringify(meta.files));
