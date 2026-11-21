/* ==========================================================
   Nihongo Quest 7.0 — DICIONÁRIO JAPONÊS-PORTUGUÊS
   - Junta todas as palavras do app (Academia, Academia Auditiva, Listening Academy,
     Chat) + DICT_EXTRA, sem duplicar (mesma leitura e mesma escrita = uma entrada).
   - Pesquisa por japonês, kana, kanji, romaji (grafia flexível) e português (sem acento).
   - Áudio com a voz japonesa do aparelho: palavra, frase inteira e frase por partes.
   - Favoritos (S.dict.fav), recentes, envio ao Caderno + Revisão (S.items, sem duplicar).
   - Consultar o dicionário NUNCA conta como lição feita nem libera conteúdo.
   ========================================================== */
const DICT_LESSON = { id: 'dict', title: 'Dicionário', kind: 'audio', cat: { id: 'dict', title: 'Dicionário' }, index: 0, items: [] };
const DICT = { built: false, list: [], byKey: {}, byWord: {}, kanji: {} };
const dictUI = { q: '', theme: '', limit: 40 };
const hasKanji = s => /[一-鿿々]/.test(s || '');
const isKana = s => /^[぀-ヿー・\s　]+$/.test(s || '');
const dNorm = s => KANA.strip(s).toLowerCase().trim();
function dictState() {
  if (!isPlainObj(S.dict)) S.dict = defaultDict();
  if (!isPlainObj(S.dict.fav)) S.dict.fav = {};
  if (!Array.isArray(S.dict.recent)) S.dict.recent = [];
  return S.dict;
}

/* itens próprios do dicionário (palavras extras que não existem no app): registrados já no início,
   para que o Caderno e a Revisão encontrem as que o aluno salvou */
const DICT_EXTRA_P = DICT_EXTRA.map(line => {
  const [kanji, kana, ro, pt, pos, tag, ej, er, ep] = line.split('|');
  return { kanji, kana, ro, pt, pos, tag, ex: ej ? { jp: ej, ro: er, pt: ep } : null };
});
DICT_EXTRA_P.forEach(e => {
  const k = KANA.kata2hira(e.kana) || e.ro;
  const it = { k, jp: e.kanji || e.kana, jp2: e.kanji ? e.kanji + '（' + e.kana + '）' : '', say: e.kana, ro: e.ro, pt: e.pt.split(';').map(x => x.trim()).join(' / '), kanji: e.kanji || '', group: e.pos === 'expr' || e.pos === 'interj' ? 'expressao' : 'palavra', ex: e.ex, id: 'dict:' + k, lesson: DICT_LESSON };
  if (!ITEM[it.id]) { ITEM[it.id] = it; DICT_LESSON.items.push(it); }
  e.dictId = it.id;
});

/* 12.0: as partículas também podem ir para o Caderno e a Revisão (item próprio; a voz lê は como “wa” e へ como “e”) */
DICT_PARTICLES.forEach(P => {
  const id = 'dict:part:' + P.p;
  if (!ITEM[id]) { ITEM[id] = { k: 'part:' + P.p, jp: P.p, say: P.p === 'は' ? 'わ' : P.p === 'へ' ? 'え' : P.p, ro: P.ro, pt: P.pt.join(' / '), group: 'palavra', particle: P, tag: 'particulas', note: P.intro, id, lesson: DICT_LESSON }; DICT_LESSON.items.push(ITEM[id]); }
});

/* ---------- índice (montado na primeira consulta) ---------- */
function dictBuild() {
  if (DICT.built) return; DICT.built = true;
  // kanji: primeiro os das lições da Academia (kanji isolado + significado), depois os complementares
  ALL_LESSONS.forEach(l => l.items.forEach(it => {
    if (/^[一-鿿]$/.test(it.jp) && !DICT.kanji[it.jp]) DICT.kanji[it.jp] = { m: String(it.pt).replace(/\s*\(.*?\)\s*/g, ' ').trim() || it.pt, r: [it.ro, it.alt].filter(Boolean).join(', '), id: it.id };
  }));
  Object.keys(DICT_KANJI).forEach(k => { if (!DICT.kanji[k]) { const [m, r] = DICT_KANJI[k].split('|'); DICT.kanji[k] = { m, r }; } });
  const add = (src) => {
    const kana = src.kana, kanji = src.kanji || '';
    if (!kana && !kanji) return;
    const reading = KANA.kata2hira(kana || '');
    // mesma leitura + mesma escrita (ou uma delas sem kanji) = mesma palavra.
    // 12.0: entre homófonos (はし 箸 × 橋, そば “ao lado” × “macarrão”), prefere a escrita igual e, para palavras
    // em kana, a entrada em kana ou a de significado compatível; senão cria outra entrada (não mistura sentidos).
    const same = DICT.byWord[reading] || [], ptOk = x => !src.pt || x.pt.some(p => nqPtCompat(p, src.pt));
    let e = kanji ? same.find(x => x.kanji === kanji) || same.find(x => !x.kanji && ptOk(x)) || same.find(x => !x.kanji && !x.particle)
      : same.find(x => !x.kanji && ptOk(x)) || same.find(x => ptOk(x)) || (same.length === 1 && !same[0].kanji ? same[0] : null);
    if (!e) {
      e = { key: (kanji || '') + '|' + (kana || src.ro), kanji, kana, reading, ro: src.ro, pt: [], pos: '', tags: [], ex: [], notes: [], ctx: [], items: [], srcs: [] };
      DICT.list.push(e); (DICT.byWord[reading] = DICT.byWord[reading] || []).push(e); DICT.byKey[e.key] = e;
    }
    if (kanji && !e.kanji) e.kanji = kanji;
    if (!e.kana && kana) e.kana = kana;
    String(src.pt || '').split(/\s*[;／/]\s*/).map(x => x.trim()).filter(Boolean).forEach(m => { if (!e.pt.some(p => dNorm(p) === dNorm(m))) e.pt.push(m); });
    if (src.pos && (!e.pos || src.dict && e.pos !== 'num')) e.pos = src.pos; // classe do DICT_EXTRA (revisada) tem prioridade
    if (src.tag && !e.tags.includes(src.tag)) e.tags.push(src.tag);
    if (src.ex && src.ex.jp && !e.ex.some(x => x.jp === src.ex.jp)) e.ex.push(src.ex);
    if (src.note && !e.notes.includes(src.note)) e.notes.push(src.note);
    (src.ctx || []).forEach(c => { if (c && !e.ctx.includes(c)) e.ctx.push(c); });
    if (src.id && !e.items.includes(src.id)) e.items.push(src.id);
    if (src.srcLabel && !e.srcs.includes(src.srcLabel)) e.srcs.push(src.srcLabel);
  };
  const fromItem = (it, srcLabel, tagHint) => {
    if (!it || !it.jp || it.lesson === DICT_LESSON) return;
    const L = it.lesson, kind = L.kind;
    if (kind === 'kana' || kind === 'grammar') return; // caracteres isolados e frases de gramática não são verbetes
    if (it.group === 'frase' || it.group === 'resposta') return;
    if (/[。？！?!]/.test(it.jp) && it.jp.length > 6) return; // frases inteiras
    const jp = it.jp, say = it.say && isKana(it.say) ? it.say : '';
    let kana, kanji = '';
    if (L.vc) { kana = it.kana; kanji = it.write && it.write !== it.kana ? it.write : ''; }
    else if (hasKanji(jp)) { kanji = jp.replace(/[！!？?。]/g, ''); kana = say || KANA.toKana(it.ro); }
    else { kana = jp.replace(/[！!？?。…〜~]/g, ''); kanji = it.kanji && hasKanji(it.kanji) && it.kanji.length <= 4 ? it.kanji : ''; }
    if (!kana || kana.length > 14) return;
    const ctx = [];
    if (it.alt) ctx.push('Outra leitura: ' + it.alt + '.');
    if (it.when) ctx.push('Quando usar: ' + it.when);
    if (it.formal) ctx.push(it.formal);
    const lt = (L.title || '') + ' ' + (L.cat && L.cat.title || '');
    const kanjiLesson = L.cat && /kanji/i.test(L.cat.title || '');
    const pos = it.pos || (kind === 'number' ? 'num' : kanjiLesson && /^[一-鿿]$/.test(jp) ? 'kanji' : it.group === 'expressao' ? 'expr' : /verbo/i.test(L.title || '') && /^(a |o )?[a-zà-ú]+(ar|er|ir|or)\b/i.test(it.pt) ? 'verbo' : /adjetivo/i.test(L.title || '') && /i$/.test(it.ro) ? 'adj-i' : '');
    add({ kana, kanji, ro: it.ro, pt: it.pt, pos, note: it.note, ex: it.ex, ctx, id: it.id, srcLabel, tag: it.tag || tagHint || (kanjiLesson ? '' : dictTagFromTitle(lt)) });
  };
  ALL_LESSONS.forEach(l => l.items.forEach(it => fromItem(it, l.cat.title + ' · ' + l.title)));
  AUDIO_PACKS.forEach(p => p.items.forEach(it => fromItem(it, p.title || 'Academia Auditiva', p.id === 'aud-ani' ? 'anime' : '')));
  if (typeof LA_LESSONS !== 'undefined') LA_LESSONS.forEach(l => l.items.forEach(it => fromItem(it, 'Listening Academy · ' + l.title)));
  if (typeof CHAT_PACK !== 'undefined') CHAT_PACK.items.forEach(it => fromItem(it, 'Nihongo Chat'));
  if (typeof WORLD_LESSON !== 'undefined') WORLD_LESSON.items.forEach(it => fromItem(it, 'Living Japanese World'));
  if (typeof RD_WORDS_PACK !== 'undefined') RD_WORDS_PACK.items.forEach(it => fromItem(it, 'Leitura Japonesa'));
  // 12.0: Academia de Vocabulário (classe, tema, notas e exemplos revisados) e as palavras do Adventure Mode
  if (typeof VC_LESSONS !== 'undefined') VC_LESSONS.forEach(l => l.items.forEach(it => fromItem(it, 'Academia de Vocabulário · ' + l.vcat.title)));
  if (typeof RPG_LESSON !== 'undefined') RPG_LESSON.items.forEach(it => fromItem(it, 'Adventure Mode', 'aventura'));
  DICT_EXTRA_P.forEach(e => add({ kana: e.kana, kanji: e.kanji, ro: e.ro, pt: e.pt, pos: e.pos, tag: e.tag, ex: e.ex, id: null, dict: true }));
  DICT_EXTRA_P.forEach(e => { const d = dictFind(e.kanji || e.kana, e.kana); if (d) d.dictId = e.dictId; });
  // 12.0: as 14 partículas, com verbete próprio (não se misturam com homófonos como 歯 は ou 二 に)
  DICT_PARTICLES.forEach((P, i) => {
    const old = (DICT.byWord[P.p] || []).find(x => !x.kanji && (!x.pos || x.pos === 'part'));
    const e = old || { key: 'part|' + P.p, kanji: '', kana: P.p, reading: P.p, ro: P.ro, pt: [], pos: 'part', tags: [], ex: [], notes: [], ctx: [], items: [], srcs: [] };
    if (!old) { DICT.list.push(e); DICT.byKey[e.key] = e; }
    e.ro = P.ro; e.pos = 'part'; e.particle = P; e.pi = i; e.dictId = 'dict:part:' + P.p;
    e.pt = P.pt.concat(e.pt.filter(p => !P.pt.some(x => dNorm(x) === dNorm(p))));
    e.tags = ['particulas'].concat(e.tags.filter(t => t !== 'particulas'));
    if (!e.srcs.includes('Gramática da Academia')) e.srcs.push('Gramática da Academia');
  });
  DICT.list.forEach((e, i) => {
    e.rank = i;
    e.jp = e.kanji || e.kana;
    e.k = { ro: KANA.phon(e.ro || KANA.toRomaji(e.kana)), roRaw: dNorm(e.ro).replace(/[^a-z]/g, ''), kana: e.reading, pt: e.pt.map(p => dNorm(p).replace(/\((a|o|as|os|es)\)/g, '').replace(/\s+/g, ' ').trim()), ptWords: e.pt.flatMap(p => dNorm(p).split(/[^a-z0-9à-ú]+/).filter(Boolean)) };
    e.k.ptAlt = dictPtAlt(e.pt); e.k.ptWords.push(...e.k.ptAlt.flatMap(p => p.split(' ')).filter(w => w && !e.k.ptWords.includes(w)));
    if (e.particle) { e.k.roAlt = e.particle.alt || []; e.k.ptWords.push('particula', 'particulas'); e.k.pt.push('particula ' + e.particle.ro, 'particula ' + e.particle.p); }
  });
}
function dictTagFromTitle(t) {
  const m = [[/cumpriment|express|saudaç/i, 'cumprimentos'], [/comida|bebida|restaurante|culin/i, 'comida'], [/anima(l|is)/i, 'animais'], [/família|pessoas/i, 'familia'], [/tempo|dias|horas|calend|datas/i, 'tempo'], [/lugar|cidade|direç/i, 'lugares'], [/escola|estud/i, 'escola'], [/casa|objet/i, 'casa'], [/corpo|saúde/i, 'corpo'], [/natureza|clima/i, 'natureza'], [/cores/i, 'cores'], [/transporte/i, 'transporte'], [/sentiment|emoç/i, 'sentimentos'], [/verbo/i, 'acoes'], [/adjetivo/i, 'descricao'], [/número/i, 'numeros'], [/anime/i, 'anime']];
  const hit = m.find(([r]) => r.test(t)); return hit ? hit[1] : '';
}
function dictFind(jp, kana) {
  dictBuild();
  const r = KANA.kata2hira(kana || jp || '');
  const list = DICT.byWord[r] || [];
  return list.find(e => e.kanji === jp || e.kana === jp) || list[0] || DICT.list.find(e => e.kanji === jp) || null;
}

/* ---------- pesquisa flexível ---------- */
function dictSearch(q) {
  dictBuild();
  q = String(q || '').trim(); if (!q) return [];
  const out = [];
  if (/[぀-ヿ一-鿿]/.test(q)) {
    const hira = KANA.kata2hira(q.replace(/\s/g, ''));
    DICT.list.forEach(e => {
      let s = 0;
      if (e.kanji === q || e.kana === q || e.reading === hira) s = 100 + (e.particle && e.kana === q ? 1 : 0);
      else if (e.kanji && e.kanji.startsWith(q) || e.reading.startsWith(hira)) s = 70;
      else if (e.kanji && e.kanji.includes(q)) s = 50;
      else if (hira.length >= 2 && e.reading.includes(hira)) s = 35;
      else if (q.length === 1 && hasKanji(q) && (e.kanji || '').includes(q)) s = 45;
      if (s) out.push([s, e]);
    });
  } else {
    const n = dNorm(q).replace(/\s+/g, ' '), ph = KANA.phon(n), raw = n.replace(/[^a-z]/g, ''), kana = KANA.toKana(n);
    const ptQ = dictPtQueries(n);
    DICT.list.forEach(e => {
      let s = 0;
      // romaji (grafias diferentes: ou/oo/ō, shi/si, tsu/tu, n'…)
      if (raw && e.k.roRaw === raw) s = 100 + (e.particle ? 1 : 0);
      else if (raw && e.k.roAlt && e.k.roAlt.includes(raw)) s = 99;
      else if (ph && e.k.ro === ph) s = 96;
      else if (kana && e.reading === kana) s = 95;
      else if (ph.length >= 2 && e.k.ro.startsWith(ph)) s = 62 - Math.min(10, e.k.ro.length - ph.length);
      else if (ph.length >= 4 && e.k.ro.includes(ph)) s = 30;
      // português (sem acento, palavra inteira vale mais)
      let p = 0;
      ptQ.forEach(([v, pen]) => { const x = dictPtScore(e, v); if (x) p = Math.max(p, x - pen); });
      s = Math.max(s, p);
      if (s) out.push([s, e]);
    });
  }
  // 12.0: quando há resultado exato ou quase exato, pedaços soltos no meio de outras palavras (substring) saem da lista
  const best = out.reduce((m, x) => Math.max(m, x[0]), 0);
  const kept = best >= 90 ? out.filter(x => x[0] >= 40) : out;
  return kept.sort((a, b) => b[0] - a[0] || (a[1].jp.length - b[1].jp.length) || a[1].rank - b[1].rank).map(x => x[1]);
}
/* 12.0: sem resultado → sugestões parecidas (erro de digitação em romaji ou português). Nunca inventa verbete. */
function dictLev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) { const cur = [i]; let lo = i; for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); lo = Math.min(lo, cur[j]); } if (lo > max) return max + 1; prev = cur; }
  return prev[b.length];
}
function dictSuggest(q) {
  dictBuild();
  q = String(q || '').trim(); if (q.length < 3) return [];
  const out = [];
  if (/[぀-ヿ]/.test(q)) { const h = KANA.kata2hira(q.replace(/\s/g, '')); DICT.list.forEach(e => { const d = dictLev(h, e.reading, 1); if (d <= 1) out.push([d, e]); }); }
  else if (!/[一-鿿]/.test(q)) {
    const n = dNorm(q).replace(/[^a-z ]/g, '').trim(), raw = n.replace(/ /g, ''), max = raw.length >= 6 ? 2 : 1;
    DICT.list.forEach(e => {
      let d = dictLev(raw, e.k.roRaw, max);
      e.k.ptWords.forEach(w => { if (w.length >= 3) d = Math.min(d, dictLev(n, w, max)); });
      if (d <= max) out.push([d, e]);
    });
  }
  return out.sort((a, b) => a[0] - b[0] || a[1].rank - b[1].rank).map(x => x[1]).filter((e, i, a) => a.indexOf(e) === i).slice(0, 6);
}

/* 11.0 — correções da busca em português (comprovadas na investigação de conteúdo):
   - “obrigada” não achava “Obrigado(a)”: o marcador de gênero era apagado sem guardar a forma feminina;
   - “segunda feira” (sem hífen) não achava “segunda-feira”;
   - “o gato” (com artigo) e “gatos” (plural) não achavam “gato”. */
function dictPtAlt(pts) {
  const out = [];
  pts.forEach(p => {
    const d = dNorm(p).replace(/\s+/g, ' ').trim();
    const fem = d.replace(/([a-z]+)o\(a\)/g, '$1a').replace(/([a-z]+)os\(as\)/g, '$1as').replace(/([a-z]*[a-np-z])\(a\)/g, '$1a').replace(/\((a|o|as|os|es)\)/g, '').trim();
    [fem, d.replace(/\((a|o|as|os|es)\)/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim(), fem.replace(/-/g, ' ')].forEach(v => { if (v && !out.includes(v)) out.push(v); });
  });
  return out;
}
function dictPtQueries(n) {
  const q = [[n, 0]], add = (v, pen) => { v = v.trim(); if (v.length >= 2 && !q.some(x => x[0] === v)) q.push([v, pen]); };
  const noArt = n.replace(/^(o|a|os|as|um|uma|uns|umas) /, '');
  add(noArt, 1); add(n.replace(/-/g, ' '), 0); add(noArt.replace(/-/g, ' '), 1);
  [noArt, noArt.replace(/-/g, ' ')].forEach(v => { if (v.length > 3 && !/\s/.test(v)) { if (/oes$/.test(v)) add(v.replace(/oes$/, 'ao'), 4); if (/ais$/.test(v)) add(v.replace(/ais$/, 'al'), 4); if (/es$/.test(v)) add(v.slice(0, -2), 4); if (/s$/.test(v)) add(v.slice(0, -1), 4); } });
  return q;
}
function dictPtScore(e, n) {
  let p = 0;
  if (e.k.pt.some(x => x === n || x.replace(/^(o|a|os|as|um|uma) /, '') === n)) p = 98;
  else if (e.k.ptAlt.some(x => x === n || x.replace(/^(o|a|os|as|um|uma) /, '') === n)) p = 97;
  else if (e.k.pt.some(x => x.split(/\s*\(/)[0].trim() === n)) p = 92;
  else if (n.length >= 2 && e.k.ptWords.includes(n)) p = 80;
  else if (n.length >= 3 && e.k.ptWords.some(w => w.startsWith(n))) p = 58;
  else if (n.length >= 4 && (e.k.pt.some(x => x.includes(n)) || e.k.ptAlt.some(x => x.includes(n)))) p = 34;
  if (p && e.pos === 'kanji') p -= 12; // palavras antes de kanji isolados
  if (p && e.k.pt[0] && (e.k.pt[0] === n || e.k.pt[0].split(/\s*\(/)[0].trim() === n)) p += 3; // sentido principal
  return p;
}

/* ---------- áudio ---------- */
async function dictSpeak(text, btn, slow) {
  if (!text) return;
  document.querySelectorAll('.d-snd.playing').forEach(b => b.classList.remove('playing'));
  if (btn) btn.classList.add('playing');
  if (slow) AUDIO.slow = true;
  try { await speak(text); } finally { if (slow) AUDIO.slow = false; if (btn) btn.classList.remove('playing'); }
}
/* frase em partes: separa pelos espaços (kana) ou pela pontuação */
function dictSegments(jp) {
  const s = String(jp || '').trim();
  let parts = s.split(/[\s　]+/).filter(Boolean);
  if (parts.length < 2) parts = s.split(/(?<=[、。！？])/).map(x => x.trim()).filter(Boolean);
  return parts.length > 1 ? parts : [];
}

/* ---------- integração: Caderno + Revisão, favoritos ---------- */
function dictItemId(e) { return e.items[0] || e.dictId || null; }
function dictInNotebook(e) { return [].concat(e.items, e.dictId || []).some(id => S.items[id] && S.items[id].seen); }
function dictSave(e) {
  const id = dictItemId(e); if (!id || !ITEM[id]) return false;
  if (dictInNotebook(e)) return true; // já está: não duplica
  markSeen(id); // entra no Caderno e na Revisão (SRS); não conta como lição nem libera nada
  save(); return true;
}
function dictToggleFav(e) { const d = dictState(); if (d.fav[e.key]) delete d.fav[e.key]; else d.fav[e.key] = Date.now(); save(); }
function dictRecent(e) { const d = dictState(); d.recent = [e.key].concat(d.recent.filter(k => k !== e.key)).slice(0, 12); save(); }

/* ---------- interface ---------- */
const DICT_STAR = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.6L21 9.3l-5 4.4 1.5 6.8L12 17l-5.5 3.5L8 13.7 3 9.3l6.4-.7z"/></svg>';
const dictSnd = (text, label, cls = '') => AUDIO.supported ? `<button class="icon-btn d-snd ${cls}" data-act="dictSay" data-text="${esc(text)}" aria-label="${esc(label || 'Ouvir')}">${IC.sound}</button>` : '';
function dictRow(e) {
  const fav = !!dictState().fav[e.key];
  return `<div class="d-row"><button class="d-main" data-act="dictOpen" data-k="${esc(e.key)}"><span class="d-jp jp">${esc(e.jp)}</span><span class="d-sub">${e.kanji ? `<span class="jp">${esc(e.kana)}</span> · ` : ''}${esc(e.ro)}${e.pos ? ` · <span class="d-pos">${esc(DICT_POS[e.pos] || e.pos)}</span>` : ''}</span><span class="d-pt">${esc(e.pt.slice(0, 3).join('; '))}</span></button>
    <div class="d-acts">${dictSnd(e.kana || e.jp, 'Ouvir ' + e.ro)}${fav ? `<span class="d-fav on" aria-label="Favorito">${DICT_STAR}</span>` : ''}</div></div>`;
}
function dictListHTML() {
  const q = dictUI.q.trim();
  if (q) {
    const res = dictSearch(q);
    if (!res.length) {
      const sug = dictSuggest(q);
      return `<div class="card mascot-tip" style="box-shadow:none">${mascot('neutral', 56)}<div><b>Nada encontrado para “${esc(q)}”.</b><p class="muted" style="margin:4px 0 0">Tente outra grafia (ex.: <i>arigato</i>, <i>ありがとう</i>), uma palavra em português sem acento ou só o começo da palavra.</p></div></div>${sug.length ? `<section class="section" style="margin-top:4px"><h2 style="font-size:1rem">Você quis dizer…</h2><div class="d-chips">${sug.map(e => `<button class="d-chip" data-act="dictOpen" data-k="${esc(e.key)}"><span class="jp">${esc(e.jp)}</span><small>${esc(e.ro)} · ${esc(e.pt[0] || '')}</small></button>`).join('')}</div></section>` : ''}`;
    }
    const kc = /^[一-鿿]$/.test(q) ? dictKanjiCard(q) : '';
    return `${kc}<p class="muted tabnum" style="margin:0 2px;font-size:.82rem">${res.length} resultado${res.length > 1 ? 's' : ''}</p><div class="card d-list">${res.slice(0, dictUI.limit).map(dictRow).join('')}</div>${res.length > dictUI.limit ? `<button class="btn btn-ghost btn-block" data-act="dictMore">Ver mais</button>` : ''}`;
  }
  if (dictUI.theme) {
    const th = DICT_THEMES.find(t => t[0] === dictUI.theme);
    let res = DICT.list.filter(e => e.tags.includes(dictUI.theme));
    if (dictUI.theme === 'particulas') res.sort((a, b) => (a.pi ?? 99) - (b.pi ?? 99));
    res = res.slice(0, 160);
    return `<div class="section-h" style="margin:0"><h2 style="font-size:1.05rem">${esc(th ? th[1] : '')}</h2><button class="link-btn" data-act="dictTheme" data-t="">Voltar</button></div><div class="card d-list">${res.map(dictRow).join('') || '<p class="muted">Nenhuma palavra neste tema ainda.</p>'}</div>`;
  }
  const d = dictState();
  const favs = Object.keys(d.fav).sort((a, b) => d.fav[b] - d.fav[a]).map(k => DICT.byKey[k]).filter(Boolean);
  const rec = d.recent.map(k => DICT.byKey[k]).filter(Boolean);
  const pool = DICT.list.filter(e => e.ex.length && e.pt.length);
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  const wod = pool.length ? pool[(day * 7919) % pool.length] : null;
  const chip = e => `<button class="d-chip" data-act="dictOpen" data-k="${esc(e.key)}"><span class="jp">${esc(e.jp)}</span><small>${esc(e.pt[0] || '')}</small></button>`;
  return `${wod ? `<div class="card d-wod"><span class="eyebrow">Palavra do dia</span><div class="d-wod-in"><button class="d-main" data-act="dictOpen" data-k="${esc(wod.key)}"><span class="d-jp jp" style="font-size:1.7rem">${esc(wod.jp)}</span><span class="d-sub">${wod.kanji ? `<span class="jp">${esc(wod.kana)}</span> · ` : ''}${esc(wod.ro)}</span><span class="d-pt">${esc(wod.pt.slice(0, 2).join('; '))}</span></button>${dictSnd(wod.kana || wod.jp, 'Ouvir ' + wod.ro)}</div></div>` : ''}
    ${favs.length ? `<section class="section"><h2 style="font-size:1.02rem">Favoritos</h2><div class="d-chips">${favs.map(chip).join('')}</div></section>` : ''}
    ${rec.length ? `<section class="section"><h2 style="font-size:1.02rem">Vistas recentemente</h2><div class="d-chips">${rec.map(chip).join('')}</div></section>` : ''}
    <section class="section"><h2 style="font-size:1.02rem">Explorar por tema</h2><div class="d-themes">${DICT_THEMES.map(([k, t, ic]) => `<button class="d-theme" data-act="dictTheme" data-t="${k}"><span class="jp">${ic}</span>${esc(t)}</button>`).join('')}</div></section>
    <p class="muted" style="margin:14px 2px 0;font-size:.82rem">${DICT.list.length} palavras e expressões. Consultar o dicionário não conta como lição concluída: o progresso da Academia continua vindo das lições e avaliações.</p>`;
}
function nbTabs(cur) {
  return `<div class="seg d-tabs" role="tablist"><button class="${cur === 'caderno' ? 'on' : ''}" data-act="nav" data-view="caderno" role="tab" aria-selected="${cur === 'caderno'}">Caderno</button><button class="${cur === 'dicionario' ? 'on' : ''}" data-act="nav" data-view="dicionario" role="tab" aria-selected="${cur === 'dicionario'}">Dicionário</button></div>`;
}
function viewDictionary() {
  dictBuild();
  return `<div class="wrap"><div class="page-title"><div><span class="jp">じしょ</span><h1>Dicionário</h1></div>${nbTabs('dicionario')}</div>
    <div class="stack"><div class="d-search"><input class="search" id="dictSearch" type="search" inputmode="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Português, romaji, かな ou 漢字" value="${esc(dictUI.q)}" aria-label="Pesquisar no dicionário">${dictUI.q ? `<button class="d-clear" data-act="dictClear" aria-label="Limpar pesquisa">×</button>` : ''}</div>
    <p class="muted" style="margin:-4px 2px 0;font-size:.8rem">Ex.: <button class="link-btn d-try" data-act="dictTry" data-q="água">água</button> · <button class="link-btn d-try" data-act="dictTry" data-q="neko">neko</button> · <button class="link-btn d-try" data-act="dictTry" data-q="ありがとう">ありがとう</button> · <button class="link-btn d-try" data-act="dictTry" data-q="学">学</button></p>
    <div id="dictList" class="stack">${dictListHTML()}</div></div></div>`;
}
/* ficha da palavra (abre em janela, de qualquer lugar do app, inclusive durante uma lição) */
function dictEntryHTML(e) {
  if (e.particle) return dictParticleHTML(e);
  const d = dictState(), fav = !!d.fav[e.key], inNb = dictInNotebook(e), id = dictItemId(e);
  const kj = [...(e.kanji || '')].filter(ch => hasKanji(ch)).map(ch => ({ ch, k: DICT.kanji[ch] })).filter(x => x.k);
  const exs = e.ex.slice(0, 3).concat(dictAppExamples(e, 3 - Math.min(3, e.ex.length)));
  const exHTML = exs.map((x, i) => { const seg = dictSegments(x.jp); return `<div class="d-ex"><div class="d-ex-top"><span class="jp d-ex-jp">${esc(x.jp)}</span>${dictSnd(x.jp, 'Ouvir a frase inteira')}</div><span class="ro">${esc(x.ro || '')}</span><span>${esc(x.pt || '')}</span>${seg.length ? `<div class="d-segs" aria-label="Ouvir por partes">${seg.map(s => `<button class="d-seg d-snd" data-act="dictSay" data-text="${esc(s)}">${esc(s)}</button>`).join('')}</div>` : ''}</div>`; }).join('');
  const related = dictRelated(e);
  const status = id && S.items[id] && S.items[id].seen ? STATUS_LABEL[itemStatus(id)] : '';
  return `<div class="d-entry">
    <div class="d-head"><div class="d-head-t"><span class="d-big jp">${esc(e.jp)}</span>${e.kanji ? `<span class="d-read jp">${esc(e.kana)}</span>` : ''}<span class="d-ro">${esc(e.ro)}</span></div>
      <div class="d-head-b">${dictSnd(e.kana || e.jp, 'Ouvir a palavra', 'big')}<button class="btn btn-ghost btn-small d-snd" data-act="dictSaySlow" data-text="${esc(e.kana || e.jp)}">Devagar</button></div></div>
    <div class="d-chiprow">${e.pos ? `<span class="chip nova d-poschip">${esc(DICT_POS[e.pos] || e.pos)}</span>` : ''}${e.tags.slice(0, 2).map(t => { const th = DICT_THEMES.find(x => x[0] === t); return th ? `<button class="chip d-themechip" data-act="dictTheme" data-t="${esc(t)}">${esc(th[1])}</button>` : ''; }).join('')}</div>
    <section><span class="eyebrow">${e.pt.length > 1 ? e.pt.length + ' significados' : 'Significado'}</span><ol class="d-means ${e.pt.length > 1 ? '' : 'one'}">${e.pt.map(p => `<li>${esc(p)}</li>`).join('')}</ol>${e.pt.length > 1 ? '<p class="muted" style="margin:4px 0 0;font-size:.8rem">O sentido certo depende do contexto. Veja os exemplos.</p>' : ''}</section>
    ${e.notes.length || e.ctx.length ? `<section><span class="eyebrow">Uso e variações</span>${e.notes.concat(e.ctx).slice(0, 4).map(n => `<p class="d-note">${esc(n)}</p>`).join('')}</section>` : ''}
    ${kj.length ? `<section><span class="eyebrow">Kanji</span><div class="d-kanji">${kj.map(x => `<button class="d-kj" data-act="dictTry" data-q="${esc(x.ch)}"><span class="jp">${esc(x.ch)}</span><span><b>${esc(x.k.m)}</b><small>${esc(x.k.r || '')}</small></span></button>`).join('')}</div>${kj.filter(x => DICT_KREAD[x.ch]).map(x => `<details class="d-kread"><summary>Leituras de <span class="jp">${esc(x.ch)}</span> em palavras reais</summary>${dictKreadHTML(x.ch)}</details>`).join('')}</section>` : ''}
    ${dictSameHTML(e)}
    ${exHTML ? `<section><span class="eyebrow">Exemplos</span>${exHTML}</section>` : ''}
    ${related.length ? `<section><span class="eyebrow">Palavras relacionadas e expressões</span><div class="d-chips">${related.map(r => `<button class="d-chip" data-act="dictOpen" data-k="${esc(r.key)}"><span class="jp">${esc(r.jp)}</span><small>${esc(r.pt[0] || '')}</small></button>`).join('')}</div></section>` : ''}
    ${e.srcs.length ? `<p class="muted" style="margin:0;font-size:.8rem">Onde aparece no Nihongo Quest: ${esc(e.srcs.slice(0, 4).join(' · '))}${e.srcs.length > 4 ? ' e mais ' + (e.srcs.length - 4) : ''}</p>` : ''}
    <div class="d-btns"><button class="btn ${fav ? 'btn-gold' : 'btn-ghost'}" data-act="dictFav" data-k="${esc(e.key)}" aria-pressed="${fav}">${DICT_STAR} ${fav ? 'Favorita' : 'Favoritar'}</button>
      ${id ? (inNb ? `<span class="btn btn-ghost d-done" aria-disabled="true">✓ No Caderno${status ? ' · ' + esc(status) : ''}</span>` : `<button class="btn btn-primary" data-act="dictSave" data-k="${esc(e.key)}">Adicionar ao Caderno e à Revisão</button>`) : ''}</div>
    <button class="btn btn-ghost btn-block" data-act="${P ? 'closeModal' : 'dictClose'}">Fechar</button></div>`;
}
/* 12.0: leituras de um kanji, sempre com palavras reais (nunca uma lista solta de leituras) */
function dictKreadHTML(ch) {
  return `<ul class="d-kr">${(DICT_KREAD[ch] || []).map(l => { const [kana, ro, mean, words] = l.split('|'); return `<li><b class="jp">${esc(kana)}</b>${ro && ro !== '—' ? ` <span class="ro">${esc(ro)}</span>` : ''} · ${esc(mean)}<small>${esc(words)}</small></li>`; }).join('')}</ul>`;
}
function dictKanjiCard(ch) {
  const k = DICT.kanji[ch]; if (!k && !DICT_KREAD[ch]) return '';
  return `<div class="card d-kcard"><div class="d-kc-top"><span class="jp d-kc-big">${esc(ch)}</span><div style="min-width:0"><span class="eyebrow">Kanji</span><b style="display:block">${esc(k ? k.m : '')}</b>${k && k.r ? `<small class="muted">${esc(k.r)}</small>` : ''}</div></div>${DICT_KREAD[ch] ? `<span class="eyebrow">Leituras em contexto</span>${dictKreadHTML(ch)}<p class="muted" style="margin:0;font-size:.8rem">A leitura depende da palavra. Aprenda cada leitura junto com uma palavra real.</p>` : ''}</div>`;
}
/* mesma escrita com outra leitura (角 かど × つの × かく) e mesmo som com outra escrita (橋 × 箸), úteis para ouvir */
function dictSameHTML(e) {
  const homo = e.kanji ? DICT.list.filter(x => x !== e && x.kanji === e.kanji && !x.particle) : [];
  const phon = (DICT.byWord[e.reading] || []).filter(x => x !== e && x.kanji !== e.kanji && !homo.includes(x)).slice(0, 4);
  const chip = (x, sub) => `<button class="d-chip" data-act="dictOpen" data-k="${esc(x.key)}"><span class="jp">${esc(x.jp)}</span><small>${esc(sub)}</small></button>`;
  return (homo.length ? `<section><span class="eyebrow">Mesma escrita, outra leitura</span><div class="d-chips">${homo.map(x => chip(x, x.kana + ' · ' + (x.pt[0] || ''))).join('')}</div></section>` : '')
    + (phon.length ? `<section><span class="eyebrow">Mesmo som, outra palavra</span><div class="d-chips">${phon.map(x => chip(x, x.pt[0] || '')).join('')}</div><p class="muted" style="margin:4px 0 0;font-size:.8rem">Na fala, o contexto (e às vezes a entonação) mostra qual é.</p></section>` : '');
}
/* 12.0: verbete de partícula — funções separadas, exemplos com áudio, comparação, erros comuns */
function dictParticleHTML(e) {
  const P = e.particle, d = dictState(), fav = !!d.fav[e.key], id = dictItemId(e), inNb = dictInNotebook(e);
  const exHTML = x => `<div class="d-ex"><div class="d-ex-top"><span class="jp d-ex-jp">${esc(x[0])}</span>${dictSnd(NQK.hasKanji(x[0]) ? NQK.r2k(x[1]) : x[0], 'Ouvir o exemplo')}</div><span class="ro">${esc(x[1])}</span><span>${esc(x[2])}</span></div>`;
  return `<div class="d-entry d-part">
    <div class="d-head"><div class="d-head-t"><span class="d-big jp">${esc(P.p)}</span><span class="d-ro">${esc(P.ro)}</span></div>
      <div class="d-head-b">${dictSnd(ITEM[id] ? ITEM[id].say : P.p, 'Ouvir a partícula', 'big')}</div></div>
    <div class="d-chiprow"><span class="chip nova d-poschip">Partícula</span><button class="chip d-themechip" data-act="dictTheme" data-t="particulas">Todas as partículas</button></div>
    <p class="d-note" style="margin:0">${esc(P.intro)}</p>
    <section><span class="eyebrow">${P.fn.length > 1 ? P.fn.length + ' funções principais' : 'Função principal'}</span>
      ${P.fn.map((f, i) => `<div class="d-fn"><b>${i + 1}. ${esc(f[0])}</b><p class="d-note">${esc(f[1])}</p>${f[2].map(exHTML).join('')}</div>`).join('')}</section>
    ${P.cmp ? `<section><span class="eyebrow">Compare</span><p class="d-note">${esc(P.cmp)}</p></section>` : ''}
    ${P.err ? `<section><span class="eyebrow">Erro comum</span><p class="d-note">${esc(P.err)}</p></section>` : ''}
    ${P.note ? `<section><span class="eyebrow">Nota</span><p class="d-note">${esc(P.note)}</p></section>` : ''}
    <p class="muted" style="margin:0;font-size:.8rem">Partículas não têm um significado fixo: a função muda com a frase. Comece pela primeira função e vá somando as outras.</p>
    <div class="d-btns"><button class="btn ${fav ? 'btn-gold' : 'btn-ghost'}" data-act="dictFav" data-k="${esc(e.key)}" aria-pressed="${fav}">${DICT_STAR} ${fav ? 'Favorita' : 'Favoritar'}</button>
      ${id ? (inNb ? `<span class="btn btn-ghost d-done" aria-disabled="true">✓ No Caderno</span>` : `<button class="btn btn-primary" data-act="dictSave" data-k="${esc(e.key)}">Adicionar ao Caderno e à Revisão</button>`) : ''}</div>
    <button class="btn btn-ghost btn-block" data-act="${P_OPEN() ? 'closeModal' : 'dictClose'}">Fechar</button></div>`;
}
const P_OPEN = () => !!(typeof P !== 'undefined' && P);
/* exemplos reais do app que contêm a palavra (frases de gramática e falas da Listening Academy) */
function dictAppExamples(e, n) {
  if (n <= 0) return [];
  const w = e.kanji && e.kanji.length >= 1 ? e.kanji : e.kana;
  if (!w || (!hasKanji(w) && w.length < 2)) return [];
  const out = [];
  for (const L of ALL_LESSONS) { if (L.kind !== 'grammar') continue; for (const it of L.items) { if (out.length >= n) return out; if ((it.jp.includes(w) || (e.kana.length >= 3 && it.jp.includes(e.kana))) && it.jp.length <= 30 && !e.ex.some(x => x.jp === it.jp)) out.push({ jp: it.jp, ro: it.ro, pt: it.pt }); } }
  return out;
}
function dictRelated(e) {
  const out = [], seen = new Set([e.key]);
  const push = x => { if (x && !seen.has(x.key) && out.length < 8) { seen.add(x.key); out.push(x); } };
  const ks = [...(e.kanji || '')].filter(hasKanji);
  if (ks.length) DICT.list.forEach(x => { if (x.kanji && ks.some(k => x.kanji.includes(k))) push(x); });
  const w = e.kana; if (w && w.length >= 2) DICT.list.forEach(x => { if (x.kana && x.kana !== w && x.kana.includes(w)) push(x); });
  if (out.length < 5) e.tags.slice(0, 1).forEach(t => shuffle(DICT.list.filter(x => x.tags.includes(t))).slice(0, 5).forEach(push));
  return out;
}
function dictOpen(e) { if (!e) return; dictRecent(e); openModal(dictEntryHTML(e), 'd-sheet'); }
/* abre a ficha a partir de outra área (lições, feedback): procura a palavra; se não achar, mostra a busca */
function dictOpenWord(jp) {
  dictBuild();
  const e = dictFind(jp, jp) || dictSearch(jp)[0];
  if (e) return dictOpen(e);
  toast('辞', 'Essa palavra ainda não está no dicionário.');
}
function dictRefreshList() { const l = $('#dictList'); if (l) l.innerHTML = dictListHTML(); }

Object.assign(ACT, {
  dictOpen: el => dictOpen(DICT.byKey[el.dataset.k]),
  dictSay: el => dictSpeak(el.dataset.text, el),
  dictSaySlow: el => dictSpeak(el.dataset.text, el, true),
  dictFav: el => { const e = DICT.byKey[el.dataset.k]; if (!e) return; dictToggleFav(e); toast('★', dictState().fav[e.key] ? 'Adicionada aos favoritos.' : 'Removida dos favoritos.'); openModal(dictEntryHTML(e), 'd-sheet'); if (view === 'dicionario' && !P) dictRefreshList(); },
  dictSave: el => { const e = DICT.byKey[el.dataset.k]; if (!e) return; if (dictSave(e)) toast('帳', 'No Caderno e na Revisão. Ela aparece nas revisões, sem contar como lição.'); openModal(dictEntryHTML(e), 'd-sheet'); },
  dictClose: () => { closeModal(); if (view === 'dicionario') dictRefreshList(); },
  dictTheme: el => { dictUI.theme = el.dataset.t; dictUI.q = ''; if (view !== 'dicionario') go('dicionario'); else render(); window.scrollTo(0, 0); },
  dictTry: el => { closeModal(); dictUI.q = el.dataset.q; dictUI.theme = ''; dictUI.limit = 40; if (P) { closePlayer(); } if (view !== 'dicionario') go('dicionario'); else render(); },
  dictClear: () => { dictUI.q = ''; dictUI.limit = 40; render(); const s = $('#dictSearch'); if (s) s.focus(); },
  dictMore: () => { dictUI.limit += 60; dictRefreshList(); },
  gotoDict: () => go('dicionario')
});
document.addEventListener('input', e => {
  if (e.target.id === 'dictSearch') {
    dictUI.q = e.target.value; dictUI.limit = 40; if (dictUI.q) dictUI.theme = '';
    dictRefreshList();
    const c = $('.d-clear'); if (!!dictUI.q !== !!c) { const box = $('.d-search'); if (box) { if (c) c.remove(); else box.insertAdjacentHTML('beforeend', `<button class="d-clear" data-act="dictClear" aria-label="Limpar pesquisa">×</button>`); } }
  }
});

/* ---------- integrações com as telas existentes ---------- */
VIEWS.push('dicionario');
const _dictRender = render;
render = function () {
  if (view === 'dicionario' && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = viewDictionary();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'caderno'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _dictRender();
};
const _dictNotebook = viewNotebook;
viewNotebook = function () { return _dictNotebook().replace('<h1>Caderno de Aprendizado</h1></div>', '<h1>Caderno de Aprendizado</h1></div>' + nbTabs('caderno')); };
const _dictOrigin = originOf;
originOf = function (it) { return it && it.lesson === DICT_LESSON ? 'Dicionário' : _dictOrigin(it); };
const _dictHome = homeListenCard;
homeListenCard = function () {
  return _dictHome() + `<section class="section"><div class="card d-home"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big jp" style="font-size:1.3rem">辞</span><div style="min-width:0"><span class="eyebrow">Novo · Dicionário</span><h3 style="font-size:1.05rem">Procure qualquer palavra</h3><span class="muted" style="font-size:.85rem">Em português, romaji, kana ou kanji, com áudio e exemplos.</span></div></div><button class="btn btn-ghost btn-small" data-act="gotoDict">Abrir o dicionário</button></div></section>`;
};
/* novidade da 7.0: aviso único para quem já usava o app */
setTimeout(() => { try { const d = dictState(); if (S.profile.onboarded && !d.news) { d.news = Date.now(); save(); toast('辞', 'Novo na 7.0: Dicionário (no Caderno) e perguntas faladas na Listening Academy!'); } } catch (e) {} }, 1500);
