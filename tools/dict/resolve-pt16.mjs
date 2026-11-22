/* ==========================================================
   Nihongo Quest 16.0 — resolução das entradas que ficaram sem português na 15.0
   Entrada: as entradas do JMdict sem nenhum português (lidas de ../../dict/v2/e/ quando o dicionário ainda é o da 15.0,
   ou da lista congelada pt16/pendentes-15.json). Para cada sentido:
     1. WordNet (sentido a sentido): a forma japonesa está num synset da Japanese WordNet (NICT) ou do Wiktionary (OMW)
        E uma glosa inglesa do sentido é lema inglês do mesmo synset (Princeton WordNet 3.0) → lemas portugueses do synset
        (OpenWN-PT, CC BY-SA 3.0; Wiktionary via OMW, CC BY-SA 3.0). Origem 'wn'.
     2. Cognato confirmado: o JMdict-PT traduziu a glosa por um texto idêntico ao inglês (a 15.0 descartava) e todas as
        palavras do texto existem em português (léxico da OpenWN-PT/Wiktionary ou o vocabulário do VERO pt-BR, usado só
        como verificação, nada é copiado dele), fora de uma lista de falsos amigos. Origem 'cg' (= JMdict-PT, automático).
     3. Tradução do Nihongo Quest (pt16/*.tsv, origem 'tr'): o que nenhuma fonte resolveu, traduzido a partir do inglês do
        JMdict e marcado como tradução do projeto (feita com IA, sem revisão humana).
     O que sobrar fica registrado em pt16/nao-resolvidas.tsv com o motivo. Nada é apagado: o inglês continua ao lado.
   Uso: node resolve-pt16.mjs   (precisa de cache/omw-data, cache/jmdict-pt e cache/vero/index.dic; ver build-dict.mjs)
   ========================================================== */
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const C = path.join(HERE, 'cache'), OUTD = path.join(HERE, 'pt16');
const W = path.join(C, 'omw-data/wns/');
const rd = f => fs.readFileSync(W + f, 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('\t'));
/* 0. entradas pendentes (congeladas na primeira execução, para o processo ser reprodutível depois do novo build) */
const PEND = path.join(OUTD, 'pendentes-15.json');
let miss;
if (fs.existsSync(PEND)) miss = JSON.parse(fs.readFileSync(PEND, 'utf8'));
else {
  const D = path.resolve(HERE, '../../dict/v2/e/'); miss = [];
  for (const f of fs.readdirSync(D).sort()) for (const r of JSON.parse(fs.readFileSync(path.join(D, f), 'utf8')))
    if (!(r[6] && r[6].length) && !r[3].some(s => s[9] && s[9].length)) miss.push([r[0], r[1], r[2], r[3].map(s => [s[0], s[2]]), r[5] & 1]);
  fs.writeFileSync(PEND, JSON.stringify(miss));
}
/* 1. WordNets */
const SY = new Map(); const g = id => SY.get(id) || SY.set(id, { e: new Set(), j: new Set(), p: [] }).get(id);
for (const [id, t, v] of rd('eng/wn-data-eng.tab')) if (/lemma/.test(t)) g(id).e.add(v.replace(/_/g, ' ').toLowerCase());
for (const f of ['jpn/wn-data-jpn.tab', 'wikt/wn-wikt-jpn.tab']) for (const [id, t, v] of rd(f)) if (/lemma/.test(t)) g(id).j.add(v);
for (const f of ['por/wn-data-por.tab', 'wikt/wn-wikt-por.tab']) for (const [id, t, v] of rd(f)) if (/lemma/.test(t)) { const x = v.replace(/_/g, ' ').trim(); if (x && !g(id).p.includes(x)) g(id).p.push(x); }
const JI = new Map(); for (const [id, s] of SY) for (const j of s.j) (JI.get(j) || JI.set(j, []).get(j)).push(id);
const lc = s => s.toLowerCase();
const PTLEX = new Set(); for (const s of SY.values()) for (const p of s.p) { PTLEX.add(lc(p)); for (const t of lc(p).split(/[\s-]+/)) PTLEX.add(t); }
/* 2. JMdict-PT e léxico de verificação */
const MT = new Map(fs.readFileSync(path.join(C, 'jmdict-pt/pt-gloss-cache.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => { const o = JSON.parse(l); return [o.en, o.pt]; }));
const HS = new Set(fs.readFileSync(path.join(C, 'vero/index.dic'), 'utf8').split('\n').slice(1).map(l => lc(l.split('/')[0])));
const inHS = t => { if (HS.has(t)) return true; for (const [a, b] of [['ões', 'ão'], ['ães', 'ão'], ['ais', 'al'], ['éis', 'el'], ['eis', 'il'], ['is', 'l'], ['ns', 'm'], ['es', ''], ['s', '']]) if (t.endsWith(a) && HS.has(t.slice(0, -a.length) + b)) return true; return false; };
/* falsos amigos: existem em português, mas com outro sentido do inglês */
const FALSE = new Set('data pasta costume gripe mesa cola pretender actual exit parentes tenor pena real fabric push novel balcony lunch sale large mayor library college office prejudice legend intend constipation cigar sensible eventual eventually assist assume attend realize resume record collar comprehensive exquisite injury lecture lace policy pull range sort tax tic tip vase pane bill bond bore boot cafe chute clan con cut fin gin lame lanes lima mar marmelada mole pan pin pop rum sal ser sol tea tram ultra vela'.split(' '));
const tok = s => lc(s).normalize('NFC').split(/[^a-zà-ÿ'-]+/).filter(Boolean);
const tokOk = t => !FALSE.has(t) && (PTLEX.has(t) || inHS(t) || t.split('-').every(x => x && (PTLEX.has(x) || inHS(x))));
/* uma palavra: no léxico; expressão: a expressão inteira é lema português (OpenWN-PT/Wiktionary) ou cada palavra está no
   VERO; nome próprio (todas as palavras com maiúscula): mantido como em português */
const isPt = w => { const ts = tok(w); if (!ts.length) return false; if (ts.length === 1) return tokOk(ts[0]);
  const bare = lc(w.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim());
  if (PTLEX.has(bare)) return true; if (ts.every(t => !FALSE.has(t) && inHS(t))) return true;
  return w.replace(/\([^)]*\)/g, ' ').trim().split(/\s+/).every(x => /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9]/.test(x) || /^(de|da|do|dos|das|e|y|la|el|of|the|and|von|van|du|des|di|al)$/.test(x)); };
const nrm = s => s.replace(/^\[(lit|expl|fig|tm)\]/, '').replace(/\([^)]*\)/g, ' ').replace(/^to /, '').replace(/\s+/g, ' ').trim().toLowerCase();
const strip = s => s.replace(/^\[(lit|expl|fig|tm)\]/, '');
/* limpeza dos lemas da WordNet: sem maiúscula duplicada, sem plural quando há o singular, até 3 */
function tidy(list, prefer) {
  const out = [];
  const add = x => { if (!x || out.some(y => lc(y) === lc(x))) return; out.push(x); };
  prefer.forEach(add);
  const lower = new Set(list.map(lc));
  list.forEach(x => {
    if (/^[A-ZÁÉÍÓÚ]/.test(x) && lower.has(lc(x)) && list.includes(lc(x))) return; // “Canal” quando há “canal”
    if (/s$/.test(x) && (lower.has(lc(x).replace(/(ões|ães)$/, 'ão').replace(/ais$/, 'al').replace(/es$/, '').replace(/s$/, '')) || lower.has(lc(x).slice(0, -1)))) return;
    add(x);
  });
  return out.slice(0, 3);
}
/* 3. traduções do projeto já escritas (pt16/tr-*.tsv: id \t sentido \t origem(tr|em) \t texto) */
const TR = new Map();
for (const f of fs.readdirSync(OUTD).filter(f => f.endsWith('.tsv') && /^tr-/.test(f)).sort())
  for (const line of fs.readFileSync(path.join(OUTD, f), 'utf8').split('\n')) { if (!line.trim() || line.startsWith('#')) continue; const [id, s, src, t] = line.split('\t'); if (t) TR.set(id + '#' + s, [src, t.split(/\s*;\s*/).filter(Boolean)]); }
/* 4. resolução */
const WNLOG = [];
const res = [], left = [], st = { cgWn: 0, entries: miss.length, senses: 0, wn: 0, cg: 0, tr: 0, em: 0, entWn: 0, entCg: 0, entTr: 0, entEm: 0, resolved: 0, unresolved: 0, partial: 0 };
for (const [id, K, R, S, common] of miss) {
  const keys = [...K.map(x => x[0]), ...R.map(x => x[0])];
  const got = new Set(); let senseLeft = 0; const why = [];
  S.forEach(([pos, gl], si) => {
    st.senses++;
    const gn = new Set(gl.map(nrm));
    // cognatos confirmados
    const cg = [];
    gl.forEach(g0 => { const g = strip(g0), p = MT.get(g); if (p != null && p === g && isPt(g)) { const pre = /^\[(lit|expl|fig|tm)\]/.exec(g0); cg.push((pre ? pre[0] : '') + g); } });
    // WordNet por sentido
    const wn = [];
    for (const k of keys) for (const sid of JI.get(k) || []) { const s = SY.get(sid); if ([...gn].some(e => s.e.has(e))) s.p.forEach(p => { if (!wn.includes(p)) wn.push(p); }); }
    const tr = TR.get(id + '#' + si);
    let out = null, src = '';
    if (tr && tr[0] === 'x') { out = null; }
    else if (tr) { out = tr[1]; src = tr[0]; }
    // o cognato do JMdict-PT, quando existe e é português, fica sozinho (a WordNet só confirma); os outros lemas do synset
    // podem ser de outro sentido da palavra inglesa (vertical → “fio de prumo”), então não entram
    else if (cg.length) { out = cg; src = 'cg'; if (wn.some(p => cg.some(c => lc(strip(c)) === lc(p)))) st.cgWn++; }
    else if (wn.length) { out = tidy(wn, []); src = 'wn'; WNLOG.push([id, keys[0], gl.join('; '), out.join('|')]); }
    if (out && out.length) { res.push([id, si, src, out.join('|')]); st[src]++; got.add(src); }
    else { senseLeft++; why.push(tr && tr[0] === 'x' ? 'ambíguo: nenhuma fonte diz qual sentido; sem tradução confiável' : gl.some(g0 => MT.get(strip(g0)) == null) ? 'sem tradução no JMdict-PT' : 'tradução idêntica ao inglês e não confirmada como português'); }
  });
  ['wn', 'cg', 'tr', 'em'].forEach(s => { if (got.has(s)) st['ent' + s[0].toUpperCase() + s.slice(1)]++; });
  if (got.size) { st.resolved++; if (senseLeft) st.partial++; }
  else { st.unresolved++; left.push([id, (K[0] || [''])[0], R[0][0], common ? 'comum' : '', S.map(x => x[0].split(',')[0]).join(','), [...new Set(why)].join('; '), S.map(x => x[1].join(', ')).join(' | ')]); }
}
fs.writeFileSync(path.join(OUTD, 'resolvidas.tsv'), '# Nihongo Quest 16.0 — português por sentido para entradas sem português na 15.0. id\tsentido(0)\torigem(wn|cg|tr|em)\tglosas(|)\n' + res.map(r => r.join('\t')).join('\n') + '\n');
fs.writeFileSync(path.join(OUTD, 'nao-resolvidas.tsv'), '# id\tforma\tleitura\tcomum\tclasses\tmotivo\tinglês (JMdict)\n' + left.map(r => r.join('\t')).join('\n') + '\n');
fs.writeFileSync('/tmp/claude-0/w/wnlog.tsv', WNLOG.map(r => r.join('\t')).join('\n'));
fs.writeFileSync(path.join(OUTD, 'resumo.json'), JSON.stringify(st, null, 1));
console.log(JSON.stringify(st));
