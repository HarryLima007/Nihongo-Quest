/* ==========================================================
   Nihongo Quest 14.0 — DICIONÁRIO GERAL: interface e integração
   - A busca junta o dicionário do app (português revisado, exemplos, aprendizado) com o Dicionário Geral
     (JMdict + KANJIDIC2 + Tatoeba). Sem o Dicionário Geral (arquivo aberto do disco, sem cache e sem internet),
     tudo continua funcionando só com as palavras do app.
   - Ficha completa: sentidos numerados, classe, registro, exemplos por sentido, acento tonal, conjugação,
     kanji, palavras relacionadas, seu aprendizado. Ficha de kanji com ordem dos traços animada.
   - Análise de frase, histórico de pesquisas, coleções, comparação, palavra aleatória, download para uso offline.
   - Consultar NUNCA altera domínio, XP ou lições. Salvar no Caderno usa o mesmo S.items (sem duplicar).
   ========================================================== */
const JMUI = { ok: null, meta: null, nq: null, byKey: null, seq: 0, res: null, busy: false, filter: '', phrase: null, cmp: [], dl: null, cached: null, lastHist: '' };
const JM_LESSON_OK = id => !!(id && typeof LESSON !== 'undefined' && LESSON[id]);
const jmState = () => { const d = dictState(); if (!Array.isArray(d.hist)) d.hist = []; if (!isPlainObj(d.coll)) d.coll = {}; if (!isPlainObj(d.words)) d.words = {}; if (!isPlainObj(d.opts)) d.opts = { wod: true }; return d; };

/* ---------- itens do Caderno para palavras que só existem no Dicionário Geral (e estruturas gramaticais) ---------- */
function jmItemFrom(w) {
  const id = 'jm:' + w.i;
  if (!ITEM[id]) { ITEM[id] = { k: 'jm:' + w.i, jp: w.w, jp2: w.r && w.r !== w.w ? w.w + '（' + w.r + '）' : '', say: w.r || w.w, ro: JMD.toRomaji(w.r || w.w), pt: w.g, kanji: JMD.hasKanji(w.w) ? w.w : '', group: /^(exp|int)/.test(w.p || '') ? 'expressao' : 'palavra', id, lesson: DICT_LESSON, jm: w.i }; DICT_LESSON.items.push(ITEM[id]); }
  return ITEM[id];
}
function jmGramItem(P) {
  const id = 'dict:gram:' + P.p;
  if (!ITEM[id]) { ITEM[id] = { k: 'gram:' + P.p, jp: P.p, say: P.p.replace(/^〜/, ''), ro: P.ro, pt: P.pt.join(' / '), group: 'palavra', particle: P, tag: 'particulas', note: P.intro, id, lesson: DICT_LESSON }; DICT_LESSON.items.push(ITEM[id]); }
  return ITEM[id];
}
try { const d = S.dict || {}; Object.keys(d.words || {}).forEach(k => { const w = d.words[k]; if (w && w.nb && w.i) jmItemFrom(w); }); DICT_GRAMMAR.forEach(P => { if (S.items['dict:gram:' + P.p]) jmGramItem(P); }); } catch (e) {}

/* estruturas e partículas extras entram no dicionário do app como verbetes próprios */
const _jmDictBuild = dictBuild;
dictBuild = function () {
  if (DICT.built) return; _jmDictBuild();
  DICT_GRAMMAR.forEach((P, i) => {
    const e = { key: 'gram|' + P.p, kanji: '', kana: P.p, reading: KANA.kata2hira(P.p), ro: P.ro, pt: P.pt.slice(), pos: 'part', tags: ['particulas'], ex: [], notes: [], ctx: [], items: [], srcs: ['Dicionário · gramática'], particle: P, pi: 20 + i, dictId: 'dict:gram:' + P.p, gram: P.kind === 'gram' };
    e.rank = DICT.list.length; e.jp = P.p;
    const ptN = P.pt.map(p => dNorm(p));
    e.k = { ro: KANA.phon(P.ro), roRaw: dNorm(P.ro).replace(/[^a-z]/g, ''), roAlt: (P.alt || []).map(a => a.replace(/[^a-z]/g, '')), kana: e.reading.replace(/^〜/, ''), pt: ptN, ptAlt: [], ptWords: ptN.flatMap(p => p.split(/[^a-z0-9à-ú]+/).filter(Boolean)).concat(P.kind === 'gram' ? ['gramatica', 'estrutura'] : ['particula', 'particulas']) };
    // a mesma escrita já é um verbete (ex.: だけ): fica um verbete só na lista; o atalho de gramática abre a explicação
    if (DICT.list.some(x => x.jp === e.jp && x.kana === e.kana)) { DICT.byKey[e.key] = e; return; }
    DICT.list.push(e); DICT.byKey[e.key] = e; (DICT.byWord[e.k.kana] = DICT.byWord[e.k.kana] || []).push(e);
  });
};
const _jmSaveLocal = dictSave;
dictSave = function (e) { if (e && e.gram !== undefined && e.particle && e.dictId && e.dictId.startsWith('dict:gram:')) jmGramItem(e.particle); return _jmSaveLocal(e); };
const _jmPartHTML = dictParticleHTML;
dictParticleHTML = function (e) {
  if (e.dictId && e.dictId.startsWith('dict:gram:')) jmGramItem(e.particle);
  let h = _jmPartHTML(e);
  if (e.gram) h = h.replace('<span class="chip nova d-poschip">Partícula</span>', '<span class="chip nova d-poschip">Estrutura gramatical</span>').replace('Partículas não têm um significado fixo: a função muda com a frase. Comece pela primeira função e vá somando as outras.', 'Estrutura para consulta. Os exemplos mostram o uso mais comum; o sentido exato depende do contexto.');
  return h;
};

/* ---------- inicialização: meta do Dicionário Geral + ligação com as palavras do app ---------- */
function jmInit() {
  if (JMUI.ok !== null || JMUI.initP) return JMUI.initP;
  JMUI.initP = (async () => {
    if (!/^https?:$/.test(location.protocol)) { JMUI.ok = false; return false; }
    try {
      JMUI.meta = await JMD.meta();
      const nq = await JMD.get('nq.json'); JMUI.nq = new Map(); JMUI.byKey = new Map();
      nq.forEach(([o, k]) => { if (!JMUI.nq.has(o)) JMUI.nq.set(o, k); JMUI.byKey.set(k, o); });
      JMUI.ok = true;
    } catch (e) { JMUI.ok = false; }
    JMUI.initP = null;
    if (view === 'dicionario' && !P) dictRefreshList();
    return JMUI.ok;
  })();
  return JMUI.initP;
}
const jmLocalOf = ord => { dictBuild(); const k = JMUI.nq && JMUI.nq.get(ord); return k ? DICT.byKey[k] || null : null; };
const jmOrdOfLocal = e => (JMUI.byKey && e ? JMUI.byKey.get(e.key) : undefined);

/* ---------- busca ---------- */
let jmTimer = null;
function jmSchedule() {
  clearTimeout(jmTimer);
  const q = dictUI.q.trim();
  if (!q || JMUI.ok === false) { JMUI.res = null; return; }
  JMUI.busy = true;
  jmTimer = setTimeout(() => jmRun(q), 160);
}
async function jmRun(q) {
  const my = ++JMUI.seq;
  if (JMUI.ok === null) await jmInit();
  if (!JMUI.ok) { JMUI.busy = false; if (my === JMUI.seq) dictRefreshList(); return; }
  let r; try { r = await JMD.search(q, { limit: 80 }); } catch (e) { r = null; }
  if (my !== JMUI.seq || dictUI.q.trim() !== q) return;
  if (r) { r.sums = await Promise.all(r.results.map(x => JMD.summary(x.ord).catch(() => null))); r.kj = await Promise.all((r.kanji || []).map(ch => JMD.kanji(ch).catch(() => null))); }
  if (my !== JMUI.seq) return;
  JMUI.res = r; JMUI.busy = false;
  dictRefreshList();
  clearTimeout(JMUI.histT); JMUI.histT = setTimeout(() => jmAddHist(q), 2500);
}
function jmAddHist(q) { q = String(q || '').trim(); if (!q || q.length < 1 || dictUI.q.trim() !== q) return; const d = jmState(); d.hist = [q].concat(d.hist.filter(x => x !== q)).slice(0, 30); save(); }
const JM_FILTERS = [['', 'Tudo'], ['c', 'Comuns'], ['v', 'Verbos'], ['a', 'Adjetivos'], ['n', 'Substantivos'], ['x', 'Expressões'], ['k', 'Com kanji'], ['h', 'Só kana'], ['s', 'Estudadas'], ['u', 'Não estudadas']];
function jmStudied(ord) { const l = jmLocalOf(ord); if (l) return dictInNotebook(l); const m = jmState().words; const w = Object.values(m).find(x => x.o === ord); return !!(w && w.nb && S.items['jm:' + w.i] && S.items['jm:' + w.i].seen); }
function jmPass(f, s) {
  if (!f || !s) return true;
  const p = s.p || '';
  switch (f) {
    case 'c': return s.c; case 'v': return /^v/.test(p) && p !== 'vs' || p === 'vs'; case 'a': return /^adj/.test(p); case 'n': return /^n/.test(p) || p === 'pn';
    case 'x': return /^(exp|int)/.test(p); case 'k': return JMD.hasKanji(s.w); case 'h': return !JMD.hasKanji(s.w);
    case 's': return jmStudied(s.ord); case 'u': return !jmStudied(s.ord);
  }
  return true;
}
const jmTag = (t, cls = '') => `<span class="jm-tag ${cls}">${esc(t)}</span>`;
function jmRowHTML(s, extra = '') {
  const l = jmLocalOf(s.ord), d = dictState();
  const fav = l ? !!d.fav[l.key] : Object.keys(d.fav).some(k => k.startsWith('j:') && d.words && d.words[k] && d.words[k].o === s.ord);
  const cur = l && l.pt.length ? l.pt.slice(0, 3).join('; ') : s.pt ? s.g : '';
  const auto = !cur && s.mt; // 15.0: português automático (JMdict-PT), não revisado
  const pt = cur || (auto ? s.g : '');
  const study = l && dictInNotebook(l) ? jmTag('No Caderno', 'ok') : '';
  const ro = JMD.toRomaji(s.r || s.w);
  const enHint = JMUI.enHint && pt && s.en ? `<small class="jm-enh" lang="en">${esc(s.en)}</small>` : '';
  return `<div class="d-row jm-row"><button class="d-main" data-act="jmOpen" data-o="${s.ord}"><span class="d-jp jp">${esc(s.w)}</span><span class="d-sub">${s.r && s.r !== s.w ? `<span class="jp">${esc(s.r)}</span> · ` : ''}${esc(ro)}${s.p ? ` · <span class="d-pos">${esc(JMD.POS_SHORT(s.p))}</span>` : ''}</span><span class="d-pt">${pt ? esc(pt) : `<span class="jm-en" lang="en">${esc(s.g)}</span>`}</span>${enHint}${extra || s.c || study || !pt || auto ? `<span class="jm-tags">${extra}${s.c ? jmTag('comum') : ''}${study}${auto ? jmTag('auto', 'auto') : ''}${!pt ? jmTag('EN', 'en') : ''}</span>` : ''}</button>
    <div class="d-acts">${dictSnd(s.r || s.w, 'Ouvir ' + ro)}${fav ? `<span class="d-fav on" aria-label="Favorito">${DICT_STAR}</span>` : ''}</div></div>`;
}
function jmFormsHTML(forms) {
  if (!forms || !forms.length) return '';
  const main = forms[0], more = forms.slice(1, 4);
  const one = (a, big) => {
    const e = a.es[0], shown = (e.k.find(k => k.t === a.base) || e.k[0] || e.r[0]).t;
    const steps = a.chain.slice().reverse().map(n => JMD.RULE_PT[n]).filter(Boolean);
    const links = steps.map(s => s[1] && JM_LESSON_OK(s[1]) ? `<button class="link-btn" data-act="openLesson" data-id="${s[1]}">${esc(s[0])}</button>` : esc(s[0])).join(' → ');
    return `<p style="margin:${big ? 0 : '6px 0 0'}">${big ? `<b class="jp">${esc(a.q)}</b> vem de ` : 'ou de '}<button class="link-btn jp" data-act="jmOpen" data-o="${e.ord}" style="font-weight:800">${esc(a.t === 'vs-n' ? shown + ' + する' : shown)}</button>${links ? ' · ' + links : ''}${a.weak ? ' <span class="jm-tag">possível</span>' : ''}</p>`;
  };
  return `<div class="card ln-form jm-form"><span class="eyebrow">${forms.length > 1 ? 'Forma conjugada · possíveis análises' : 'Forma conjugada reconhecida'}</span>${one(main, true)}${more.map(a => one(a, false)).join('')}${main.weak || forms.length > 1 ? '<p class="muted" style="margin:4px 0 0;font-size:.78rem">A mesma forma pode vir de palavras diferentes. Confira pelo contexto.</p>' : ''}</div>`;
}
function jmKanjiStrip(list) {
  const ks = (list || []).filter(Boolean); if (!ks.length) return '';
  return `<div class="jm-kstrip">${ks.map(k => `<button class="jm-kmini" data-act="jmKanji" data-k="${esc(k.c)}"><span class="jp">${esc(k.c)}</span><span><b>${esc((k.pt || k.en || []).slice(0, 3).join(', '))}</b><small class="jp">${esc([(k.on || []).slice(0, 2).join('・'), (k.kun || []).slice(0, 2).join('・')].filter(Boolean).join(' / '))}</small></span></button>`).join('')}</div>`;
}

/* lista de resultados: dicionário do app + Dicionário Geral, sem repetir a mesma palavra */
const _jmLocalList = dictListHTML;
dictListHTML = function () {
  const q = dictUI.q.trim();
  if (JMUI.ok === null && /^https?:$/.test(location.protocol)) jmInit();
  if (JMUI.phrase && JMUI.phrase.q === q) return jmPhraseHTML();
  if (!q || JMUI.ok === false) return q ? _jmLocalList() + (JMUI.ok === false && /^https?:$/.test(location.protocol) ? '<p class="muted jm-note">Dicionário Geral indisponível agora (sem internet e ainda não baixado). Mostrando as palavras do Nihongo Quest.</p>' : '') : dictHomeHTML();
  const r = JMUI.res && JMUI.res.q === q ? JMUI.res : null;
  if (!r) return `<p class="muted jm-note" aria-live="polite">Buscando…</p>` + _jmLocalList().replace(/<div class="card ln-form">[\s\S]*?<\/div>/, '');
  dictBuild();
  const local = dictSearch(q).slice(0, 40);
  const seen = new Set(); const rows = [];
  // palavras do app que não estão no Dicionário Geral (frases, expressões do app) e batem exatamente
  const localExtra = local.filter(e => { const o = jmOrdOfLocal(e); return o === undefined || !r.results.some(x => x.ord === o); });
  r.results.forEach((x, i) => { const s = r.sums[i]; if (!s || seen.has(x.ord)) return; seen.add(x.ord); if (jmPass(dictUI.filter, s)) rows.push({ s, how: x.how }); });
  const exact = localExtra.filter(e => e.particle || e.k && (e.k.kana === KANA.kata2hira(q) || e.kanji === q || e.k.roRaw === dNorm(q).replace(/[^a-z]/g, '') || e.k.pt.includes(dNorm(q))));
  const tail = localExtra.filter(e => !exact.includes(e)).slice(0, 4);
  const filt = `<div class="jm-filters" role="toolbar" aria-label="Filtros">${JM_FILTERS.map(([k, t]) => `<button class="jm-chip ${dictUI.filter === k ? 'on' : ''}" data-act="jmFilter" data-f="${k}" aria-pressed="${dictUI.filter === k}">${t}</button>`).join('')}</div>`;
  const phraseBtn = JMD.isJp(q) && q.replace(/\s/g, '').length >= 4 ? `<button class="btn btn-ghost btn-small jm-phrase-btn" data-act="jmPhrase">Analisar como frase (palavra por palavra)</button>` : '';
  const kc = r.kj && r.kj.length ? jmKanjiStrip(r.kj) : '';
  const forms = jmFormsHTML(r.forms);
  const nores = !rows.length && !exact.length && !tail.length;
  if (nores && JMD.isJp(q) && q.replace(/\s/g, '').length >= 4 && !dictUI.filter) { setTimeout(() => { if (dictUI.q.trim() === q && !JMUI.phrase) jmPhrase(q); }, 0); return '<p class="muted jm-note">Não é uma palavra só: analisando como frase…</p>'; }
  if (nores) {
    const sug = r.suggest || [], local2 = dictSuggest(q);
    const chips = sug.map(x => `<button class="d-chip" data-act="dictTry" data-q="${esc(x.k)}"><span class="${JMD.isJp(x.k) ? 'jp' : ''}">${esc(x.k)}</span></button>`).join('') + local2.map(e => `<button class="d-chip" data-act="dictOpen" data-k="${esc(e.key)}"><span class="jp">${esc(e.jp)}</span><small>${esc(e.ro)} · ${esc(e.pt[0] || '')}</small></button>`).join('');
    return `${forms}${kc}${phraseBtn}<div class="card mascot-tip" style="box-shadow:none">${mascot('neutral', 56)}<div><b>Nada encontrado para “${esc(q)}”${dictUI.filter ? ' com este filtro' : ''}.</b><p class="muted" style="margin:4px 0 0">${r.tooShort ? 'Digite pelo menos 2 letras.' : 'Tente outra grafia (ex.: <i>arigatou</i>, <i>ありがとう</i>), sem acento, em inglês, ou só o começo da palavra.'}</p></div></div>${dictUI.filter ? filt : ''}${chips ? `<section class="section" style="margin-top:4px"><h2 style="font-size:1rem">Você quis dizer…</h2><div class="d-chips">${chips}</div></section>` : ''}`;
  }
  const lim = dictUI.limit;
  const localRow = e => dictRow(e).replace('class="d-row"', 'class="d-row jm-local"');
  // 15.0: em buscas em português, o sentido em inglês aparece pequeno para diferenciar (banco: bank / bench), e as
  // palavras em que o termo só aparece dentro de um significado maior vêm depois, como “relacionadas”
  JMUI.enHint = r.kind === 'latin' && rows.some(x => x.how === 'pt' || x.how === 'pt-rel');
  const shown = rows.slice(0, lim); const firstRel = shown.findIndex(x => x.how === 'pt-rel');
  const relSep = `<p class="jm-sep">${firstRel > 0 || exact.length ? 'Relacionadas' : 'Nenhum significado igual a'} ${firstRel > 0 || exact.length ? '· “' + esc(q) + '” aparece dentro do significado' : '“' + esc(q) + '”. Palavras com o termo dentro do significado:'}</p>`;
  const body = exact.map(localRow).join('') + shown.map((x, i) => (i === firstRel ? relSep : '') + jmRowHTML(x.s, x.how === 'form' ? jmTag('forma-base', 'ok') : '')).join('') + (rows.length <= lim ? tail.map(localRow).join('') : '');
  JMUI.enHint = false;
  const total = exact.length + rows.length + tail.length;
  const notes = r.kind === 'latin' ? [rows.some(x => !x.s.pt && x.s.mt && !jmLocalOf(x.s.ord)) ? '<span class="jm-tag auto">auto</span> = tradução automática, não revisada' : '', rows.some(x => !x.s.pt && !x.s.mt && !jmLocalOf(x.s.ord)) ? '<span class="jm-tag en">EN</span> = só em inglês (JMdict)' : ''].filter(Boolean).join(' · ') : '';
  return `${forms}${kc}${phraseBtn}${filt}<p class="muted tabnum" style="margin:0 2px;font-size:.82rem">${total >= 80 ? 'Mais de 80' : total} resultado${total > 1 ? 's' : ''}${notes ? ' · ' + notes : ''}</p><div class="card d-list">${body}</div>${rows.length > lim ? `<button class="btn btn-ghost btn-block" data-act="dictMore">Ver mais</button>` : ''}`;
};

/* ---------- tela inicial do dicionário ---------- */
function dictHomeHTML() {
  if (dictUI.theme) return _jmLocalList();
  const d = jmState(); dictBuild();
  const chip = (k, jp, sub) => `<button class="d-chip" data-act="jmOpenKey" data-k="${esc(k)}"><span class="jp">${esc(jp)}</span><small>${esc(sub || '')}</small></button>`;
  const keyChip = k => { const l = DICT.byKey[k]; if (l) return chip(k, l.jp, l.pt[0]); const w = d.words[k]; return w ? chip(k, w.w, w.g) : ''; };
  const favs = Object.keys(d.fav).sort((a, b) => d.fav[b] - d.fav[a]).map(keyChip).filter(Boolean);
  const rec = d.recent.map(keyChip).filter(Boolean);
  const pool = DICT.list.filter(e => e.ex.length && e.pt.length);
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  const wod = d.opts.wod !== false && pool.length ? pool[(day * 7919) % pool.length] : null;
  const colls = Object.keys(d.coll);
  const m = JMUI.meta, ok = JMUI.ok;
  const gramChips = DICT_PARTICLES.map(P => `<button class="d-chip" data-act="dictOpen" data-k="part|${esc(P.p)}"><span class="jp">${esc(P.p)}</span></button>`).join('') + DICT_GRAMMAR.map(P => `<button class="d-chip" data-act="dictOpen" data-k="gram|${esc(P.p)}"><span class="jp">${esc(P.p)}</span></button>`).join('');
  const status = ok ? `<div class="card jm-status"><div class="jm-st-top"><span class="jm-st-ic jp">辞</span><div style="min-width:0"><b>Dicionário Geral</b><span class="muted">${m.counts.entries.toLocaleString('pt-BR')} entradas${m.counts.withAnyPt ? ' (' + m.counts.withAnyPt.toLocaleString('pt-BR') + ' com português)' : ''} · ${m.counts.kanji.toLocaleString('pt-BR')} kanji · ${m.counts.examples.toLocaleString('pt-BR')} frases de exemplo</span></div></div>${jmOfflineHTML()}</div>`
    : ok === false && /^https?:$/.test(location.protocol) ? `<div class="card jm-status"><b>Dicionário Geral indisponível agora</b><p class="muted" style="margin:4px 0 0;font-size:.85rem">Sem internet e sem cópia offline. As palavras do Nihongo Quest continuam disponíveis. Quando estiver conectado, use “Baixar para usar offline”.</p></div>` : '';
  return `${status}
    <div class="jm-quick"><button class="btn btn-ghost btn-small" data-act="jmRandom">Palavra aleatória</button><button class="btn btn-ghost btn-small" data-act="jmPhraseHelp">Analisar uma frase</button>${JMUI.cmp.length ? `<button class="btn btn-gold btn-small" data-act="jmCompare">Comparar (${JMUI.cmp.length})</button>` : ''}</div>
    ${wod ? `<div class="card d-wod"><div class="jm-wod-h"><span class="eyebrow">Palavra do dia</span><button class="link-btn" data-act="jmWod" style="font-size:.78rem">Ocultar</button></div><div class="d-wod-in"><button class="d-main" data-act="dictOpen" data-k="${esc(wod.key)}"><span class="d-jp jp" style="font-size:1.7rem">${esc(wod.jp)}</span><span class="d-sub">${wod.kanji ? `<span class="jp">${esc(wod.kana)}</span> · ` : ''}${esc(wod.ro)}</span><span class="d-pt">${esc(wod.pt.slice(0, 2).join('; '))}</span></button>${dictSnd(wod.kana || wod.jp, 'Ouvir ' + wod.ro)}</div></div>` : d.opts.wod === false ? `<button class="link-btn" data-act="jmWod" style="font-size:.82rem;align-self:flex-start">Mostrar a palavra do dia</button>` : ''}
    ${d.hist.length ? `<section class="section"><div class="section-h" style="margin:0"><h2 style="font-size:1.02rem">Pesquisas recentes</h2><button class="link-btn" data-act="jmHistClear">Limpar</button></div><div class="d-chips">${d.hist.slice(0, 12).map(h => `<button class="d-chip" data-act="dictTry" data-q="${esc(h)}"><span class="${JMD.isJp(h) ? 'jp' : ''}">${esc(h)}</span></button>`).join('')}</div></section>` : ''}
    ${favs.length ? `<section class="section"><h2 style="font-size:1.02rem">Favoritos</h2><div class="d-chips">${favs.join('')}</div></section>` : ''}
    ${colls.length ? `<section class="section"><h2 style="font-size:1.02rem">Coleções</h2><div class="d-chips">${colls.map(c => `<button class="d-chip" data-act="jmColl" data-c="${esc(c)}"><span>${esc(c)}</span><small>${d.coll[c].k.length} palavra${d.coll[c].k.length === 1 ? '' : 's'}</small></button>`).join('')}</div></section>` : ''}
    ${rec.length ? `<section class="section"><h2 style="font-size:1.02rem">Vistas recentemente</h2><div class="d-chips">${rec.join('')}</div></section>` : ''}
    <section class="section"><h2 style="font-size:1.02rem">Partículas e gramática</h2><div class="d-chips jm-gram">${gramChips}</div></section>
    <section class="section"><h2 style="font-size:1.02rem">Explorar por tema</h2><div class="d-themes">${DICT_THEMES.map(([k, t, ic]) => `<button class="d-theme" data-act="dictTheme" data-t="${k}"><span class="jp">${ic}</span>${esc(t)}</button>`).join('')}</div></section>
    <p class="muted" style="margin:14px 2px 0;font-size:.8rem">Consultar o dicionário não conta como lição nem muda o seu domínio ou XP. ${DICT.list.length} palavras e expressões vêm das lições do Nihongo Quest${ok ? ', com português revisado' : ''}.</p>
    ${jmCreditsHTML()}`;
}
function jmCreditsHTML() {
  return `<details class="jm-credits"><summary>Fontes e licenças dos dados</summary><p>Palavras do <b>JMdict</b> e kanji do <b>KANJIDIC2</b> e do <b>KRADFILE</b>, propriedade do Electronic Dictionary Research and Development Group (EDRDG), usados conforme a licença do Grupo (CC BY-SA 4.0): <a href="https://www.edrdg.org/edrdg/licence.html" target="_blank" rel="noopener">edrdg.org/edrdg/licence.html</a>.</p><p>Frases de exemplo do projeto <b>Tatoeba</b> (CC BY 2.0 FR, cada uma com o crédito dos autores), ligadas aos sentidos pelo JMdict_e_examp (EDRDG).</p><p>Ordem dos traços: <b>KanjiVG</b> (Ulrich Apel e colaboradores, CC BY-SA 3.0, <a href="https://kanjivg.tagaini.net" target="_blank" rel="noopener">kanjivg.tagaini.net</a>). Kanji parecidos: Lars Yencken, kanji confusion datasets (CC BY 3.0). Níveis JLPT dos kanji: Jonathan Waller, JLPT Resources (CC BY, <a href="http://www.tanos.co.uk/jlpt/" target="_blank" rel="noopener">tanos.co.uk/jlpt</a>), referência não oficial.</p><p>Acento tonal: “The pitch accent notation … were provided by Uros O. through his free database” (Kanjium, CC BY-SA 4.0).</p><p>Português dos sentidos marcado como <b>tradução automática</b>: <b>JMdict (Português)</b> — camada de tradução © Shiritai, CC BY-SA 4.0; baseada no JMdict © James William Breen e EDRDG, usado sob CC BY-SA 4.0 nos termos da EDRDG. Tradução automática do inglês com correções da comunidade, sem revisão humana completa. Fonte: <a href="https://github.com/zhusupbekova/jmdict-pt" target="_blank" rel="noopener">github.com/zhusupbekova/jmdict-pt</a>. Modificações do Nihongo Quest: maiúscula inicial ajustada, repetições no mesmo sentido removidas e traduções idênticas ao inglês não exibidas como português (detalhes em dict/v2/LICENSE.md).</p><p>Esses dados continuam sob as licenças originais (não sob o aviso de direitos do Nihongo Quest). Traduções para o português marcadas como “Nihongo Quest” foram feitas pelo projeto a partir dessas fontes e seguem a mesma licença CC BY-SA 4.0.</p></details>`;
}

/* ---------- download para uso offline (Cache API + service worker) ---------- */
const JM_CACHE = 'nq-dict-v2';
function jmAllFiles() {
  const m = JMUI.meta; if (!m) return [];
  const pad = n => String(n).padStart(3, '0'), out = ['meta.json', 'nq.json'];
  for (let i = 0; i < m.shards; i++) { out.push('e/' + pad(i) + '.json', 'm/' + pad(i) + '.json'); }
  m.xShards.forEach(i => out.push('x/' + pad(i) + '.json'));
  m.jBuckets.forEach(b => out.push('j/' + b + '.json')); m.wBuckets.forEach(b => out.push('w/' + b + '.json'));
  m.kBuckets.forEach(b => out.push('k/' + b + '.json')); m.sBuckets.forEach(b => out.push('s/' + b + '.json'));
  return out;
}
const jmBytes = () => { const f = JMUI.meta && JMUI.meta.files; return f ? Object.values(f).reduce((a, x) => a + x[1], 0) : 0; };
async function jmCountCached() {
  if (!('caches' in window) || !JMUI.meta) return null;
  try { const c = await caches.open(JM_CACHE); const keys = await c.keys(); JMUI.cached = keys.filter(k => k.url.includes('/' + JMD.BASE)).length; } catch (e) { JMUI.cached = null; }
  return JMUI.cached;
}
function jmOfflineHTML() {
  if (!('caches' in window)) return '<p class="muted" style="margin:6px 0 0;font-size:.8rem">Este navegador não permite guardar o dicionário para uso offline. As palavras consultadas funcionam enquanto houver conexão.</p>';
  const tot = jmAllFiles().length, mb = Math.round(jmBytes() / 1048576);
  if (JMUI.dl) return `<div class="jm-dl"><div class="bar light"><i style="width:${Math.round(JMUI.dl.done / JMUI.dl.tot * 100)}%"></i></div><span class="muted tabnum" style="font-size:.8rem">Baixando… ${JMUI.dl.done} de ${JMUI.dl.tot} partes${JMUI.dl.err ? ' · ' + JMUI.dl.err + ' com erro (tente de novo depois)' : ''}</span></div>`;
  if (JMUI.cached == null) { jmCountCached().then(n => { if (n != null && view === 'dicionario' && !dictUI.q) dictRefreshList(); }); return ''; }
  const pct = Math.min(100, Math.round(JMUI.cached / tot * 100));
  return pct >= 100 ? `<p class="jm-off ok">✓ Disponível sem internet (dicionário completo baixado).</p>` : `<p class="muted" style="margin:6px 0 0;font-size:.8rem">${JMUI.cached ? 'Já guardado para uso offline: ' + pct + '% (as palavras que você consulta ficam guardadas). ' : 'As palavras que você consulta ficam guardadas para uso offline. '}Para ter tudo sem internet, baixe o dicionário completo (cerca de ${mb} MB de espaço no aparelho).</p><button class="btn btn-ghost btn-small" data-act="jmDownload">Baixar para usar offline</button>`;
}
async function jmDownload() {
  if (JMUI.dl || !JMUI.meta || !('caches' in window)) return;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  const files = jmAllFiles(); const c = await caches.open(JM_CACHE);
  const have = new Set((await c.keys()).map(k => k.url));
  const base = new URL(JMD.BASE, location.href).href;
  const todo = files.filter(f => !have.has(base + f));
  JMUI.dl = { done: files.length - todo.length, tot: files.length, err: 0 }; dictRefreshList();
  let i = 0;
  const worker = async () => { while (i < todo.length) { const f = todo[i++]; try { const r = await fetch(base + f); if (r.ok) await c.put(base + f, r); else JMUI.dl.err++; } catch (e) { JMUI.dl.err++; } JMUI.dl.done++; if (JMUI.dl.done % 10 === 0 && view === 'dicionario' && !dictUI.q) dictRefreshList(); } };
  await Promise.all([worker(), worker(), worker(), worker()]);
  const err = JMUI.dl.err; JMUI.dl = null; await jmCountCached();
  toast('辞', err ? 'Download interrompido em algumas partes. Tente de novo com conexão.' : 'Dicionário completo disponível sem internet.');
  if (view === 'dicionario') dictRefreshList();
}
function jmRegisterSW() {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol) || /claude|anthropic/.test(location.hostname)) return;
  try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {}
}

/* ---------- ficha da palavra (Dicionário Geral) ---------- */
const JM_SPECIAL_FORM = /(sK|iK|oK|rK)/, JM_SPECIAL_READ = /(sk|ik|ok|rk)/;
function jmShown(e) { const k0 = e.k.find(k => !k.m.some(m => JM_SPECIAL_FORM.test(m))), r0 = e.r.find(r => !r.m.some(m => JM_SPECIAL_READ.test(m))) || e.r[0]; return { w: e.u || !k0 ? r0.t : k0.t, r: r0.t, k: k0 ? k0.t : '' }; }
function jmRuby(jp) { return esc(jp).replace(/｜([^《]+)《([^》]+)》/g, '<ruby>$1<rt>$2</rt></ruby>'); }
const jmPlain = jp => String(jp || '').replace(/｜([^《]+)《([^》]+)》/g, '$1');
const jmPlainKana = jp => String(jp || '').replace(/｜([^《]+)《([^》]+)》/g, '$2');
function jmMora(kana) { const out = []; for (const ch of hiraOrKata(kana)) { if (/[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/.test(ch) && out.length) out[out.length - 1] += ch; else out.push(ch); } return out; }
function hiraOrKata(s) { return [...String(s || '')]; }
function jmPitchHTML(reading, acc) {
  const moras = jmMora(reading), n = Number(String(acc).split(',')[0]);
  if (!moras.length || isNaN(n)) return '';
  const hi = moras.map((_, i) => n === 0 ? i > 0 : n === 1 ? i === 0 : i > 0 && i < n);
  const name = n === 0 ? 'heiban (plano)' : n === 1 ? 'atamadaka (alto no início)' : n === moras.length ? 'odaka (cai depois da palavra)' : 'nakadaka (cai no meio)';
  return `<span class="jm-pitch" aria-label="Acento ${esc(acc)}: ${name}">${moras.map((m, i) => `<span class="${hi[i] ? 'h' : 'l'}${n > 0 && i === n - 1 ? ' d' : ''}">${esc(m)}</span>`).join('')}</span><small class="muted">${esc(name)}${String(acc).includes(',') ? ' · também ' + esc(String(acc).split(',').slice(1).join(', ')) : ''}</small>`;
}
const jmKind = g => g.kind === 'lit' ? ' <small>(literal)</small>' : g.kind === 'fig' ? ' <small>(figurado)</small>' : g.kind === 'expl' ? ' <small>(explicação)</small>' : '';
function jmSenseHTML(s, i, exs) {
  const pos = s.pos.map(p => JMD.POS_PT[p] || p), misc = s.misc.map(m => JMD.MISC_PT[m] || m);
  const ptG = s.pt && s.pt.length ? `<span class="jm-gl-pt">${s.pt.map(g => esc(g.t) + jmKind(g)).join('; ')}</span>` : '';
  const ref = r => { const [w] = r.split('・'); return `<button class="link-btn jp" data-act="dictTry" data-q="${esc(w)}">${esc(r.replace(/・\d+$/, ''))}</button>`; };
  const ex = exs.filter(x => x.s === i + 1).slice(0, 2);
  return `<li class="jm-sense">${pos.length || misc.length ? `<div class="jm-sense-tags">${pos.map(p => jmTag(p, 'pos')).join('')}${misc.map(m => jmTag(m, /coloquial|gíria|vulgar|pejorativo|infantil|internet|mangá/.test(m) ? 'reg' : /honorífico|humilde|educado|formal/.test(m) ? 'hon' : '')).join('')}</div>` : ''}
    ${ptG}<span class="jm-gl${ptG ? ' sub' : ''}" lang="en">${ptG ? '<span class="jm-lbl">inglês</span> ' : ''}${s.g.map(g => esc(g.t) + jmKind(g)).join('; ')}</span>
    ${s.of.length || s.or.length ? `<small class="muted">Só para: <span class="jp">${esc(s.of.concat(s.or).join('、'))}</span></small>` : ''}
    ${s.n ? `<small class="muted" lang="en">Nota (JMdict): ${esc(s.n)}</small>` : ''}
    ${s.l.length ? `<small class="muted">Origem: ${s.l.map(l => (JMD.LANG_PT[l.lang] || l.lang) + (l.t ? ' “' + esc(l.t) + '”' : '') + (l.wasei ? ' (wasei, criado no Japão)' : '')).join('; ')}</small>` : ''}
    ${s.x.length ? `<small class="muted">Veja também: ${s.x.map(ref).join(' · ')}</small>` : ''}${s.a.length ? `<small class="muted">Antônimo: ${s.a.map(ref).join(' · ')}</small>` : ''}
    ${ex.map(jmExHTML).join('')}</li>`;
}
function jmExHTML(x) {
  const plain = jmPlain(x.jp);
  return `<div class="d-ex jm-ex"><div class="d-ex-top"><span class="jp d-ex-jp">${jmRuby(x.jp)}</span>${dictSnd(jmPlainKana(x.jp), 'Ouvir a frase')}</div><span lang="en">${esc(x.en)} <small class="muted">(inglês)</small></span><small class="jm-cred">Tatoeba nº ${x.tid}${x.aj ? ' · japonês: ' + esc(x.aj) : ''}${x.ae ? ' · inglês: ' + esc(x.ae) : ''} · CC BY 2.0 FR</small><button class="link-btn jm-anal" data-act="jmAnalyze" data-q="${esc(plain)}">Analisar a frase</button></div>`;
}
async function jmEntryHTML(e) {
  const sh = jmShown(e), local = jmLocalOf(e.ord), d = jmState();
  const favKey = local ? local.key : 'j:' + e.i, fav = !!d.fav[favKey];
  const exs = await JMD.examples(e.ord).catch(() => []);
  const ro = JMD.toRomaji(sh.r);
  const kjs = [...new Set([...(sh.k || '')].filter(JMD.isKanjiCh))];
  const kRecs = await Promise.all(kjs.map(c => JMD.kanji(c).catch(() => null)));
  // relacionados: compostos que começam com a palavra, mesmo som, mesma escrita com outra leitura
  const pre = (await JMD.jPrefix(sh.k || sh.r, 14).catch(() => [])).filter(([k]) => k !== (sh.k || JMD.hira(sh.r))).slice(0, 10);
  const derived = (await Promise.all([...new Set(pre.map(([, o]) => o))].filter(o => o !== e.ord).map(o => JMD.summary(o).catch(() => null)))).filter(Boolean);
  const homo = (await JMD.jExact(sh.r).catch(() => [])).filter(o => o !== e.ord).slice(0, 6);
  const homoS = (await Promise.all(homo.map(o => JMD.summary(o).catch(() => null)))).filter(Boolean);
  const cls = JMD.verbClass(e), conj = cls && !e.s.every(s => s.pos.includes('vs') && !s.pos.some(p => /^v[15k]|^vs-/.test(p)) && false) ? JMD.conjugate(sh.k && !e.u ? sh.k : sh.r, cls) : [];
  const ptL = local && local.pt.length ? local.pt.map(t => ({ t, src: 'nq' })) : e.pt;
  const srcName = { nq: 'revisado no Nihongo Quest', tr: 'tradução do Nihongo Quest a partir do JMdict' };
  const mtN = e.s.filter(s => s.pt && s.pt.length).length;
  const ptSrc = [...new Set(ptL.map(x => x.src))];
  const nqEx = (local ? local.ex.concat(dictAppExamples(local, 2)) : []).concat(e.qx).filter((x, i, a) => x && x.jp && a.findIndex(y => y.jp === x.jp) === i).slice(0, 3);
  const altK = e.k.filter(k => k.t !== sh.w && !k.m.includes('sK')), altR = e.r.filter(r => r.t !== sh.r && !r.m.includes('sk'));
  const inNb = local ? dictInNotebook(local) : !!(S.items['jm:' + e.i] && S.items['jm:' + e.i].seen);
  const learn = local && typeof lnLearnHTML === 'function' ? lnLearnHTML(local) : (inNb ? `<section class="ln-dlearn"><span class="eyebrow">Seu aprendizado</span><p class="muted" style="margin:0;font-size:.85rem">No Caderno · ${esc(STATUS_LABEL[itemStatus('jm:' + e.i)] || '')}${S.items['jm:' + e.i].due ? ' · próxima revisão: ' + (S.items['jm:' + e.i].due <= Date.now() ? 'agora' : new Date(S.items['jm:' + e.i].due).toLocaleDateString('pt-BR')) : ''}</p></section>` : '');
  const posAll = [...new Set(e.s.flatMap(s => s.pos))];
  const isPart = posAll.includes('prt');
  const gramLink = isPart ? (DICT_PARTICLES.concat(DICT_GRAMMAR).find(P => P.p === sh.r || P.p === sh.w)) : null;
  const colls = Object.keys(d.coll);
  const regs = [...new Set(e.s.flatMap(s => s.misc).filter(m => /^(col|sl|hon|hum|pol|form|vulg|fam|male|fem|chn|net-sl|m-sl|on-mim|arch|dated|obs|rare|poet|id|yoji|proverb)$/.test(m)))];
  const cmpOn = JMUI.cmp.includes(e.ord);
  return `<div class="d-entry jm-entry">
    <div class="d-head"><div class="d-head-t"><span class="d-big jp">${esc(sh.w)}</span>${sh.w !== sh.r ? `<span class="d-read jp">${esc(sh.r)}</span>` : ''}<span class="d-ro">${esc(ro)}</span></div>
      <div class="d-head-b">${dictSnd(sh.r, 'Ouvir a palavra', 'big')}<button class="btn btn-ghost btn-small d-snd" data-act="dictSaySlow" data-text="${esc(sh.r)}">Devagar</button><button class="icon-btn" data-act="jmCopy" data-o="${e.ord}" aria-label="Copiar palavra e significado">⧉</button></div></div>
    <div class="d-chiprow">${e.c ? '<span class="chip nova">palavra comum</span>' : ''}${posAll.slice(0, 2).map(p => `<span class="chip d-poschip">${esc(JMD.POS_SHORT(p))}</span>`).join('')}${regs.slice(0, 3).map(m => `<span class="chip">${esc(JMD.MISC_PT[m] || m)}</span>`).join('')}${local ? '<span class="chip jm-nqchip">no Nihongo Quest</span>' : ''}</div>
    ${ptL.length ? `<section><span class="eyebrow">Em português</span><ol class="d-means ${ptL.length > 1 ? '' : 'one'}">${ptL.map(x => `<li>${esc(x.t)}</li>`).join('')}</ol><small class="muted">${ptSrc.map(s => srcName[s] || s).join(' · ')}${ptSrc.includes('tr') || mtN ? '. Confira os sentidos abaixo.' : ''}</small></section>` : mtN ? '' : `<p class="muted jm-note" style="margin:0">Ainda sem tradução para o português. Os significados abaixo são do JMdict, em inglês.</p>`}
    ${e.pa.length ? `<section><span class="eyebrow">Acento tonal (padrão de Tóquio)</span>${e.pa.slice(0, 2).map(([r, a]) => `<div class="jm-pa"><span class="jp">${esc(r)}</span>${jmPitchHTML(r, a)}</div>`).join('')}<small class="muted">Fonte: Kanjium. A voz sintética do aparelho pode não reproduzir o acento exatamente.</small></section>` : ''}
    <section><span class="eyebrow">${e.s.length > 1 ? e.s.length + ' sentidos' : 'Sentido'}${mtN ? '' : ' · definição do JMdict (em inglês)'}</span><ol class="jm-senses">${e.s.map((s, i) => jmSenseHTML(s, i, exs)).join('')}</ol>${e.s.length > 1 ? '<p class="muted" style="margin:4px 0 0;font-size:.8rem">Os sentidos estão em ordem de uso. O certo depende do contexto: os exemplos ajudam a diferenciar.</p>' : ''}${mtN ? `<p class="jm-mt"><span class="jm-tag auto">auto</span> Português dos sentidos: tradução automática do inglês (JMdict-PT), sem revisão humana. Pode ter erros; o inglês do JMdict fica logo abaixo para conferir.</p>` : ''}</section>
    ${exs.filter(x => !e.s[x.s - 1]).length ? `<section><span class="eyebrow">Mais exemplos</span>${exs.filter(x => !e.s[x.s - 1]).slice(0, 2).map(jmExHTML).join('')}</section>` : ''}
    ${nqEx.length ? `<section><span class="eyebrow">Exemplos do Nihongo Quest</span>${nqEx.map(x => `<div class="d-ex"><div class="d-ex-top"><span class="jp d-ex-jp">${esc(x.jp)}</span>${dictSnd(x.jp, 'Ouvir a frase')}</div><span class="ro">${esc(x.ro || '')}</span><span>${esc(x.pt || '')}</span></div>`).join('')}</section>` : ''}
    ${gramLink ? `<section><span class="eyebrow">Gramática</span><button class="btn btn-ghost btn-small" data-act="dictOpen" data-k="${(DICT_GRAMMAR.includes(gramLink) ? 'gram|' : 'part|') + esc(gramLink.p)}">Como usar a partícula <span class="jp">${esc(gramLink.p)}</span></button></section>` : ''}
    ${conj.length ? `<details class="jm-conj"><summary>Conjugação (${esc(JMD.POS_PT[posAll.find(p => /^v|^adj-(i|na)/.test(p))] || 'formas')})</summary><table>${conj.map(([k, f]) => `<tr><th>${esc(JMD.CONJ_PT[k] || k)}</th><td><button class="link-btn jp d-snd" data-act="dictSay" data-text="${esc(JMD.readingOf(f, sh.k && !e.u ? sh.k : sh.r, JMD.hira(sh.r)) || f)}">${esc(f)}</button></td></tr>`).join('')}</table><small class="muted">Formas geradas pelas regras de conjugação a partir da classe do verbo/adjetivo. Toque para ouvir.${JM_LESSON_OK('c13l2') ? ` <button class="link-btn" data-act="openLesson" data-id="c13l2">Lição sobre a forma ます</button>` : ''}</small></details>` : ''}
    ${altK.length || altR.length ? `<section><span class="eyebrow">Outras escritas e leituras</span><p class="jm-alt">${altK.map(k => `<span class="jp">${esc(k.t)}</span>${k.m.length ? `<small>${esc(k.m.map(m => JMD.FORM_PT[m] || m).join(', '))}</small>` : ''}`).join(' · ')}${altK.length && altR.length ? ' · ' : ''}${altR.map(r => `<span class="jp">${esc(r.t)}</span>${r.m.length ? `<small>${esc(r.m.map(m => JMD.FORM_PT[m] || m).join(', '))}</small>` : ''}`).join(' · ')}</p></section>` : ''}
    ${kRecs.some(Boolean) ? `<section><span class="eyebrow">Kanji desta palavra</span>${jmKanjiStrip(kRecs)}</section>` : ''}
    ${derived.length ? `<section><span class="eyebrow">Compostos e expressões com esta palavra</span><div class="d-chips">${derived.map(s => `<button class="d-chip" data-act="jmOpen" data-o="${s.ord}"><span class="jp">${esc(s.w)}</span><small>${esc(s.g.split(/[;,]/)[0])}</small></button>`).join('')}</div></section>` : ''}
    ${homoS.length ? `<section><span class="eyebrow">Mesmo som, outra palavra</span><div class="d-chips">${homoS.map(s => `<button class="d-chip" data-act="jmOpen" data-o="${s.ord}"><span class="jp">${esc(s.w)}</span><small>${esc(s.g.split(/[;,]/)[0])}</small></button>`).join('')}</div></section>` : ''}
    ${learn}
    <div class="d-btns"><button class="btn ${fav ? 'btn-gold' : 'btn-ghost'}" data-act="jmFav" data-o="${e.ord}" aria-pressed="${fav}">${DICT_STAR} ${fav ? 'Favorita' : 'Favoritar'}</button>
      ${inNb ? `<span class="btn btn-ghost d-done" aria-disabled="true">✓ No Caderno</span>` : `<button class="btn btn-primary" data-act="jmSave" data-o="${e.ord}">Adicionar ao Caderno e à Revisão</button>`}</div>
    <div class="jm-more"><label class="jm-coll"><span class="muted" style="font-size:.82rem">Coleção</span><select data-o="${e.ord}" class="jm-coll-sel" aria-label="Adicionar a uma coleção"><option value="">Adicionar a…</option>${colls.map(c => `<option value="${esc(c)}"${d.coll[c].k.includes(favKey) ? ' disabled' : ''}>${esc(c)}${d.coll[c].k.includes(favKey) ? ' ✓' : ''}</option>`).join('')}<option value="__new">+ Nova coleção</option></select></label><button class="btn btn-ghost btn-small" data-act="jmCmp" data-o="${e.ord}" aria-pressed="${cmpOn}">${cmpOn ? '✓ Na comparação' : 'Comparar'}</button></div>
    <p class="muted jm-src">JMdict (EDRDG, CC BY-SA 4.0) · entrada nº ${e.i}</p>
    <button class="btn btn-ghost btn-block" data-act="${P ? 'closeModal' : 'dictClose'}">Fechar</button></div>`;
}
async function jmOpen(ord, opts = {}) {
  ord = Number(ord); if (isNaN(ord)) return;
  if (!opts.keep) openModal('<div class="jm-loading"><p class="muted">Abrindo a ficha…</p></div><button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>', 'd-sheet');
  let e = null; try { e = await JMD.entry(ord); } catch (err) { e = null; }
  if (!e) { const l = jmLocalOf(ord); if (l) return _jmDictOpen(l); openModal('<p class="muted">Não foi possível abrir esta ficha agora (sem conexão e sem cópia offline).</p><button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>', 'd-sheet'); return; }
  const d = jmState(), sh = jmShown(e), local = jmLocalOf(ord), key = local ? local.key : 'j:' + e.i;
  if (!local) d.words[key] = Object.assign(d.words[key] || {}, { i: e.i, o: ord, w: sh.w, r: sh.r, k: sh.k || sh.r, g: jmGloss(e), p: (e.s[0] && e.s[0].pos[0]) || '', v: JMUI.meta && JMUI.meta.v });
  d.recent = [key].concat(d.recent.filter(k => k !== key)).slice(0, 12); save();
  if (dictUI.q) jmAddHistNow(dictUI.q);
  JMUI.cur = e;
  const html = await jmEntryHTML(e);
  if (JMUI.cur !== e) return;
  const sc = $('#modal .sheet'); const top = opts.keep && sc ? sc.scrollTop : 0;
  openModal(html, 'd-sheet'); const s2 = $('#modal .sheet'); if (s2 && top) s2.scrollTop = top;
}
function jmAddHistNow(q) { clearTimeout(JMUI.histT); const d = jmState(); q = q.trim(); if (q) { d.hist = [q].concat(d.hist.filter(x => x !== q)).slice(0, 30); save(); } }
function jmMtGloss(e) { return e.s.filter(s => s.pt && s.pt.length).slice(0, 2).map(s => s.pt.slice(0, 3).map(g => g.t).join(', ')).join('; '); }
function jmGloss(e) { return e.pt.length ? e.pt.slice(0, 3).map(x => x.t).join('; ') : jmMtGloss(e) || e.s.slice(0, 2).map(s => s.g.slice(0, 3).map(g => g.t).join(', ')).join('; '); }
async function jmOpenKey(k) {
  dictBuild();
  if (DICT.byKey[k]) return dictOpen(DICT.byKey[k]);
  const w = jmState().words[k]; if (!w) return;
  if (JMUI.ok === null) await jmInit();
  if (JMUI.ok) { if (JMUI.meta.v === w.v && w.o != null) { const e = await JMD.entry(w.o).catch(() => null); if (e && e.i === w.i) return jmOpen(w.o); } const e = await JMD.entryById(w.i, w.k).catch(() => null); if (e) { w.o = e.ord; w.v = JMUI.meta.v; save(); return jmOpen(e.ord); } }
  openModal(`<div class="d-entry"><div class="d-head"><div class="d-head-t"><span class="d-big jp">${esc(w.w)}</span>${w.r !== w.w ? `<span class="d-read jp">${esc(w.r)}</span>` : ''}</div><div class="d-head-b">${dictSnd(w.r, 'Ouvir', 'big')}</div></div><p>${esc(w.g)}</p><p class="muted" style="font-size:.85rem">Resumo guardado no aparelho. A ficha completa abre quando o Dicionário Geral estiver disponível.</p><button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`, 'd-sheet');
}

/* ---------- ficha de kanji ---------- */
const JM_RAD = '一丨丶丿乙亅二亠人儿入八冂冖冫几凵刀力勹匕匚匸十卜卩厂厶又口囗土士夂夊夕大女子宀寸小尢尸屮山巛工己巾干幺广廴廾弋弓彐彡彳心戈戶手支攴文斗斤方无日曰月木欠止歹殳毋比毛氏气水火爪父爻爿片牙牛犬玄玉瓜瓦甘生用田疋疒癶白皮皿目矛矢石示禸禾穴立竹米糸缶网羊羽老而耒耳聿肉臣自至臼舌舛舟艮色艸虍虫血行衣襾見角言谷豆豕豸貝赤走足身車辛辰辵邑酉釆里金長門阜隶隹雨靑非面革韋韭音頁風飛食首香馬骨高髟鬥鬯鬲鬼魚鳥鹵鹿麥麻黃黍黑黹黽鼎鼓鼠鼻齊齒龍龜龠';
function jmStrokeSVG(paths) {
  return `<svg class="jm-strokes" viewBox="0 0 109 109" role="img" aria-label="Ordem dos traços (${paths.length} traços)">${paths.map((p, i) => `<path d="${esc(p)}" pathLength="1" style="animation-delay:${(i * 0.62).toFixed(2)}s"/>`).join('')}${paths.map((p, i) => { const m = /^[Mm]\s*([\d.]+)[,\s]+([\d.]+)/.exec(p); return m ? `<text x="${(+m[1] - 4).toFixed(1)}" y="${(+m[2] - 2).toFixed(1)}">${i + 1}</text>` : ''; }).join('')}</svg>`;
}
async function jmKanjiHTML(ch, sel) {
  const k = await JMD.kanji(ch); if (!k) return null;
  const st = k.st ? await JMD.strokes(ch).catch(() => null) : null;
  const words = k.w || [];
  const sums = await Promise.all(words.map(([o]) => JMD.summary(o).catch(() => null)));
  const kunStem = r => JMD.hira(r.replace(/-/g, '')).split('.')[0];
  const readOf = r => JMD.hira(r.replace(/-/g, '')).split('.')[0];
  const groups = new Map(); words.forEach((w, i) => { if (!sums[i]) return; const g = w[3] === '*' ? '*' : w[3]; (groups.get(g) || groups.set(g, []).get(g)).push([w, sums[i]]); });
  const allR = (k.on || []).map(r => ['on', r]).concat((k.kun || []).map(r => ['kun', r]));
  const pick = sel || '';
  const shownWords = pick === '*' ? groups.get('*') || [] : pick ? groups.get(readOf(pick)) || [] : words.map((w, i) => [w, sums[i]]).filter(x => x[1]).slice(0, 18);
  const rBtn = ([t, r, same]) => { const key = readOf(r), n = (groups.get(key) || []).length; const oks = (same || [r]).filter(x => x.includes('.')).map(x => x.split('.')[1]); const okuri = t === 'kun' && oks.length ? `<span class="jp">${esc(kunStem(r).replace(/-/g, '〜'))}</span><small class="jp">(${esc(oks.join('・'))})</small>` : `<span class="jp">${esc(r.replace(/-/g, '〜'))}</span>`; return `<button class="jm-read ${pick === r ? 'on' : ''}" data-act="jmKRead" data-k="${esc(ch)}" data-r="${esc(r)}" aria-pressed="${pick === r}">${okuri}<small>${esc(JMD.toRomaji(readOf(r)))}${n ? ' · ' + n : ''}</small></button>`; };
  const rad = k.rad ? JM_RAD[k.rad - 1] : '';
  const sim = [...(k.sim || '')], comp = [...(k.cp || '')].filter(c => c !== ch);
  const simRecs = await Promise.all(sim.map(c => JMD.kanji(c).catch(() => null)));
  return `<div class="d-entry jm-kanji">
    <div class="jm-k-top"><div class="jm-k-big"><span class="jp">${esc(ch)}</span></div>${st ? `<div class="jm-k-svg">${jmStrokeSVG(st)}<button class="link-btn" data-act="jmKanji" data-k="${esc(ch)}" style="font-size:.8rem">Animar de novo</button></div>` : ''}</div>
    <section><span class="eyebrow">Significados</span><p class="jm-k-mean">${k.pt ? esc(k.pt.join(', ')) : `<span lang="en">${esc((k.en || []).join(', '))}</span>`}</p>${k.pt && k.en ? `<small class="muted" lang="en">Em inglês: ${esc(k.en.join(', '))}</small>` : !k.pt ? '<small class="muted">Significados do KANJIDIC2 em inglês (sem versão em português para este kanji).</small>' : ''}</section>
    <div class="jm-k-facts">${k.sc ? `<span><b class="tabnum">${k.sc}</b> traços</span>` : ''}${rad ? `<span>Radical <b class="jp">${esc(rad)}</b> <small class="tabnum">nº ${k.rad}</small></span>` : ''}${k.j ? `<span>JLPT <b>${esc(k.j)}</b><small>*</small></span>` : ''}${k.g ? `<span>${k.g <= 6 ? k.g + 'º ano escolar' : k.g === 8 ? 'jōyō (ensino médio)' : 'jinmeiyō (nomes)'}</span>` : ''}${k.fr ? `<span>nº <b class="tabnum">${k.fr}</b> em frequência nos jornais</span>` : ''}</div>
    ${allR.length ? `<section><span class="eyebrow">Leituras · toque para ver palavras</span>${k.on ? `<div class="jm-reads"><small class="jm-rl">On'yomi (origem chinesa)</small>${k.on.map(r => rBtn(['on', r])).join('')}</div>` : ''}${k.kun ? `<div class="jm-reads"><small class="jm-rl">Kun'yomi (japonesa)</small>${k.kun.filter((r, i, a) => a.findIndex(x => readOf(x) === readOf(r)) === i).map(r => rBtn(['kun', r, k.kun.filter(x => readOf(x) === readOf(r))])).join('')}</div>` : ''}${groups.has('*') ? `<div class="jm-reads"><button class="jm-read ${pick === '*' ? 'on' : ''}" data-act="jmKRead" data-k="${esc(ch)}" data-r="*">Leituras especiais<small>${groups.get('*').length}</small></button></div>` : ''}${k.na ? `<small class="muted">Em nomes próprios: <span class="jp">${esc(k.na.slice(0, 8).join('、'))}</span></small>` : ''}<p class="muted" style="margin:6px 0 0;font-size:.8rem">A leitura depende da palavra: o mesmo kanji muda de som conforme o contexto. Aprenda cada leitura junto com uma palavra real.${allR.length ? ' ' + dictSnd(allR.map(([, r]) => readOf(r)).join('、'), 'Ouvir as leituras') : ''}</p></section>` : ''}
    ${shownWords.length ? `<section><span class="eyebrow">${pick === '*' ? 'Palavras com leitura especial (a palavra inteira tem uma leitura própria)' : pick ? 'Palavras com a leitura ' + esc(readOf(pick)) : 'Palavras com este kanji'}${k.wn > words.length && !pick ? ' · ' + k.wn.toLocaleString('pt-BR') + ' no total' : ''}</span><div class="d-chips">${shownWords.map(([w, s]) => `<button class="d-chip" data-act="jmOpen" data-o="${s.ord}"><span class="jp">${esc(w[1])}</span><small><span class="jp">${esc(w[2])}</span> · ${esc(s.g.split(/[;,]/)[0])}</small></button>`).join('')}</div>${pick ? `<button class="link-btn" data-act="jmKRead" data-k="${esc(ch)}" data-r="" style="font-size:.82rem;margin-top:4px">Ver todas</button>` : ''}</section>` : ''}
    ${comp.length ? `<section><span class="eyebrow">Componentes</span><div class="d-chips">${comp.map(c => `<button class="d-chip jm-comp" data-act="jmKanji" data-k="${esc(c)}"><span class="jp">${esc(c)}</span></button>`).join('')}</div></section>` : ''}
    ${simRecs.some(Boolean) ? `<section><span class="eyebrow">Kanji parecidos (não confunda)</span>${jmKanjiStrip(simRecs)}</section>` : ''}
    <p class="muted jm-src">KANJIDIC2 e KRADFILE (EDRDG, CC BY-SA 4.0)${st ? ' · traços: KanjiVG (CC BY-SA 3.0)' : ''}${k.j ? ' · *JLPT: listas de J. Waller (CC BY), referência não oficial' : ''}${sim.length ? ' · parecidos: L. Yencken (CC BY 3.0)' : ''}</p>
    <button class="btn btn-ghost btn-block" data-act="${P ? 'closeModal' : 'dictClose'}">Fechar</button></div>`;
}
async function jmKanji(ch, sel) {
  if (JMUI.ok === null) await jmInit();
  if (!JMUI.ok) { closeModal(); dictUI.q = ch; if (view !== 'dicionario') go('dicionario'); else render(); return; }
  const keep = sel !== undefined && $('#modal .jm-kanji');
  const top = keep ? $('#modal .sheet').scrollTop : 0;
  if (!keep) openModal('<div class="jm-loading"><p class="muted">Abrindo o kanji…</p></div>', 'd-sheet');
  const h = await jmKanjiHTML(ch, sel).catch(() => null);
  if (!h) { openModal(`<p>Sem dados para <span class="jp">${esc(ch)}</span> no KANJIDIC2.</p><button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button>`, 'd-sheet'); return; }
  openModal(h, 'd-sheet'); if (top) $('#modal .sheet').scrollTop = top;
}

/* ---------- análise de frase ---------- */
async function jmPhrase(q) {
  q = String(q || '').trim(); if (!q) return;
  if (JMUI.ok === null) await jmInit();
  if (!JMUI.ok) { toast('辞', 'A análise de frases precisa do Dicionário Geral (conecte-se ou baixe para usar offline).'); return; }
  JMUI.phrase = { q, busy: true }; dictRefreshList();
  const toks = await JMD.tokenize(q).catch(() => []);
  const sums = await Promise.all(toks.map(t => t.ords ? JMD.summary(t.ords[0]).catch(() => null) : null));
  if (!JMUI.phrase || JMUI.phrase.q !== q) return;
  // tradução: só quando a frase inteira existe no Nihongo Quest (revisada)
  const plain = q.replace(/[\s　]/g, '');
  let tr = null; const norm = s => String(s || '').replace(/[\s　。、！？!?]/g, '');
  for (const L of ALL_LESSONS) { const it = L.items.find(x => x.jp && norm(x.jp) === norm(plain)); if (it) { tr = it.pt; break; } }
  if (!tr && typeof LA_LESSONS !== 'undefined') for (const L of LA_LESSONS) { const it = L.items.find(x => x.jp && norm(x.jp) === norm(plain)); if (it) { tr = it.pt; break; } }
  JMUI.phrase = { q, toks, sums, tr };
  dictRefreshList();
}
const jmPartRo = (t, rd) => t.particle && t.s === 'は' ? 'wa' : t.particle && t.s === 'へ' ? 'e' : JMD.toRomaji(rd || t.s);
function jmPhraseHTML() {
  const ph = JMUI.phrase;
  if (ph.busy) return '<p class="muted jm-note">Analisando a frase…</p>';
  const parts = ph.toks.map((t, i) => {
    const s = ph.sums[i];
    if (t.punct || t.latin) return `<span class="jm-tok punct">${esc(t.s)}</span>`;
    if (!s) return `<span class="jm-tok unk"><b class="jp">${esc(t.s)}</b><small>não reconhecido</small></span>`;
    const rd = t.form ? JMD.readingOf(t.s, t.form.base, JMD.hira(s.r)) : (JMD.hasKanji(t.s) ? (s.w === t.s ? s.r : '') : t.s);
    const lab = t.particle ? 'partícula' : t.form ? (JMD.RULE_PT[t.form.chain[0]] || [''])[0] : JMD.POS_SHORT(s.p);
    return `<button class="jm-tok ${t.particle ? 'prt' : ''}" data-act="jmOpen" data-o="${s.ord}"><b class="jp">${rd && rd !== t.s ? `<ruby>${esc(t.s)}<rt>${esc(rd)}</rt></ruby>` : esc(t.s)}</b><small>${esc(jmPartRo(t, rd))}</small><span class="jm-tok-g">${t.form ? `<span class="jp">${esc(s.w)}</span>: ` : ''}${esc(s.g.split(/[;]/)[0])}</span><small class="jm-tok-l">${esc(lab || '')}${t.form && t.form.weak || t.weak ? ' · possível' : ''}</small></button>`;
  }).join('');
  const ro = ph.toks.map((t, i) => { const s = ph.sums[i]; if (!s || t.punct) return t.s && t.punct ? '' : ''; const rd = t.form ? JMD.readingOf(t.s, t.form.base, JMD.hira(s.r)) : JMD.hasKanji(t.s) ? (s.w === t.s ? s.r : '') : t.s; return jmPartRo(t, rd || ''); }).filter(Boolean).join(' ');
  const amb = ph.toks.some(t => t.weak || t.unknown || (t.form && (t.form.weak || (t.forms && t.forms.length > 1))));
  return `<div class="card jm-phrase"><div class="section-h" style="margin:0"><span class="eyebrow">Análise da frase</span><button class="link-btn" data-act="jmPhraseClose">Voltar à busca</button></div>
    <p class="jp jm-ph-q">${esc(ph.q)}</p>${dictSnd(ph.q.replace(/[\s　]/g, ''), 'Ouvir a frase')}
    <p class="ro" style="margin:2px 0 6px">${esc(ro)}</p>
    ${ph.tr ? `<p style="margin:0 0 6px"><b>Tradução:</b> ${esc(ph.tr)} <small class="muted">(frase do Nihongo Quest)</small></p>` : '<p class="muted" style="margin:0 0 6px;font-size:.82rem">Sem tradução pronta para esta frase: veja o sentido de cada parte abaixo. O Nihongo Quest não inventa traduções automáticas.</p>'}
    <div class="jm-toks">${parts}</div>
    <p class="muted" style="margin:8px 0 0;font-size:.78rem">A divisão é feita pelo dicionário (o trecho mais longo que existe) e pelas regras de conjugação. ${amb ? '<b>Algumas partes podem ter outra leitura</b> (marcadas como “possível”): confira pelo contexto.' : 'Toque numa parte para abrir a ficha.'}</p></div>`;
}

/* ---------- comparação ---------- */
async function jmCompareHTML() {
  const es = (await Promise.all(JMUI.cmp.map(o => JMD.entry(o).catch(() => null)))).filter(Boolean);
  return `<div class="d-entry"><span class="eyebrow">Comparar palavras</span><div class="jm-cmp" style="--n:${es.length}">${es.map(e => { const sh = jmShown(e), l = jmLocalOf(e.ord); const pt = l && l.pt.length ? l.pt : e.pt.length ? e.pt.map(x => x.t) : (jmMtGloss(e) ? [jmMtGloss(e)] : []); return `<div class="jm-cmp-col"><button class="d-main" data-act="jmOpen" data-o="${e.ord}"><span class="d-jp jp">${esc(sh.w)}</span><span class="d-sub jp">${esc(sh.r)}</span></button>${dictSnd(sh.r, 'Ouvir')}<small class="muted">${esc([...new Set(e.s.flatMap(s => s.pos))].slice(0, 2).map(JMD.POS_SHORT).join(', '))}${e.c ? ' · comum' : ''}</small>${pt.length ? `<p><b>${esc(pt.slice(0, 3).join('; '))}</b></p>` : ''}<ol>${e.s.slice(0, 4).map(s => `<li lang="en">${esc(s.g.slice(0, 3).map(g => g.t).join(', '))}${s.misc.length ? ` <small>(${esc(s.misc.map(m => JMD.MISC_PT[m] || m).join(', '))})</small>` : ''}</li>`).join('')}</ol><button class="link-btn" data-act="jmCmpDel" data-o="${e.ord}" style="font-size:.8rem">Tirar da comparação</button></div>`; }).join('')}</div>
    <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`;
}

/* ---------- ações ---------- */
const _jmDictOpen = dictOpen;
dictOpen = function (e) {
  if (!e) return;
  const o = jmOrdOfLocal(e);
  if (!e.particle && o !== undefined && JMUI.ok) { dictRecent(e); return jmOpen(o); }
  return _jmDictOpen(e);
};
const _jmOpenWord = dictOpenWord;
dictOpenWord = function (jp) {
  dictBuild();
  const e = dictFind(jp, jp) || dictSearch(jp)[0];
  if (e) return dictOpen(e);
  (async () => {
    if (JMUI.ok === null) await jmInit();
    if (JMUI.ok) { const r = await JMD.search(jp, { limit: 3 }).catch(() => null); if (r && r.results.length) return jmOpen(r.results[0].ord); }
    _jmOpenWord(jp);
  })();
};
function jmCopy(text) {
  const done = () => toast('⧉', 'Copiado.');
  try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, () => toast('⧉', 'Não foi possível copiar neste navegador.')); return; } } catch (e) {}
  toast('⧉', 'Não foi possível copiar neste navegador.');
}
Object.assign(ACT, {
  jmOpen: el => { JMUI.lastQ = dictUI.q; jmOpen(el.dataset.o); },
  jmOpenKey: el => jmOpenKey(el.dataset.k),
  jmKanji: el => jmKanji(el.dataset.k),
  jmKRead: el => jmKanji(el.dataset.k, el.dataset.r || ''),
  jmFilter: el => { dictUI.filter = el.dataset.f; dictUI.limit = 40; dictRefreshList(); },
  jmPhrase: () => jmPhrase(dictUI.q),
  jmAnalyze: el => { closeModal(); dictUI.q = el.dataset.q; dictUI.theme = ''; if (P) closePlayer(); if (view !== 'dicionario') go('dicionario'); else render(); jmPhrase(el.dataset.q); },
  jmPhraseClose: () => { JMUI.phrase = null; jmSchedule(); dictRefreshList(); },
  jmPhraseHelp: () => { dictUI.q = ''; render(); const s = $('#dictSearch'); if (s) { s.placeholder = 'Cole ou digite uma frase em japonês'; s.focus(); } toast('文', 'Digite ou cole uma frase em japonês e toque em “Analisar como frase”.'); },
  jmRandom: async () => { if (JMUI.ok === null) await jmInit(); if (!JMUI.ok) { const pool = DICT.list.filter(e => e.pt.length && !e.particle); if (pool.length) _jmDictOpen(pool[Math.floor(Math.random() * pool.length)]); return; } jmOpen(Math.floor(Math.random() * Math.min(JMUI.meta.counts.common, 20000))); },
  jmWod: () => { const d = jmState(); d.opts.wod = d.opts.wod === false; save(); dictRefreshList(); },
  jmHistClear: () => { jmState().hist = []; save(); dictRefreshList(); },
  jmDownload: () => jmDownload(),
  jmCopy: () => { const e = JMUI.cur; if (!e) return; const sh = jmShown(e); jmCopy(`${sh.w}${sh.w !== sh.r ? '（' + sh.r + '）' : ''} — ${jmGloss(e)}`); },
  jmFav: async el => { const e = JMUI.cur; if (!e) return; const l = jmLocalOf(e.ord), d = jmState(); const k = l ? l.key : 'j:' + e.i; if (d.fav[k]) delete d.fav[k]; else d.fav[k] = Date.now(); save(); toast('★', d.fav[k] ? 'Adicionada aos favoritos.' : 'Removida dos favoritos.'); jmOpen(e.ord, { keep: true }); },
  jmSave: el => {
    const e = JMUI.cur; if (!e) return; const l = jmLocalOf(e.ord);
    if (l && dictItemId(l)) { dictSave(l); }
    else { const d = jmState(), k = 'j:' + e.i, sh = jmShown(e); const w = d.words[k] = Object.assign(d.words[k] || {}, { i: e.i, o: e.ord, w: sh.w, r: sh.r, k: sh.k || sh.r, g: jmGloss(e) + (e.pt.length || jmMtGloss(e) ? '' : ' (inglês)'), p: (e.s[0] && e.s[0].pos[0]) || '', nb: Date.now(), v: JMUI.meta.v }); jmItemFrom(w); markSeen('jm:' + e.i); save(); }
    toast('帳', 'No Caderno e na Revisão. Não conta como lição nem dá XP.'); jmOpen(e.ord, { keep: true });
  },
  jmCmp: el => { const o = Number(el.dataset.o); JMUI.cmp = JMUI.cmp.includes(o) ? JMUI.cmp.filter(x => x !== o) : JMUI.cmp.concat(o).slice(-3); toast('⇆', JMUI.cmp.includes(o) ? 'Na comparação (' + JMUI.cmp.length + '). Abra pelo início do Dicionário.' : 'Fora da comparação.'); jmOpen(o, { keep: true }); },
  jmCmpDel: async el => { JMUI.cmp = JMUI.cmp.filter(x => x !== Number(el.dataset.o)); if (JMUI.cmp.length) openModal(await jmCompareHTML(), 'd-sheet'); else { closeModal(); dictRefreshList(); } },
  jmCompare: async () => openModal(await jmCompareHTML(), 'd-sheet'),
  jmColl: el => { const d = jmState(), c = d.coll[el.dataset.c]; if (!c) return; dictBuild(); const items = c.k.map(k => { const l = DICT.byKey[k]; if (l) return `<button class="d-chip" data-act="jmOpenKey" data-k="${esc(k)}"><span class="jp">${esc(l.jp)}</span><small>${esc(l.pt[0] || '')}</small></button>`; const w = d.words[k]; return w ? `<button class="d-chip" data-act="jmOpenKey" data-k="${esc(k)}"><span class="jp">${esc(w.w)}</span><small>${esc(String(w.g).split(/[;,]/)[0])}</small></button>` : ''; }).join('');
    openModal(`<div class="d-entry"><span class="eyebrow">Coleção</span><h2 style="margin:0">${esc(el.dataset.c)}</h2><div class="d-chips">${items || '<p class="muted">Vazia.</p>'}</div><button class="btn btn-ghost btn-small" data-act="jmCollDel" data-c="${esc(el.dataset.c)}">Apagar esta coleção</button><button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`, 'd-sheet'); },
  jmCollDel: el => { const d = jmState(); if (d.coll[el.dataset.c] && el.dataset.confirm !== '1') { el.dataset.confirm = '1'; el.textContent = 'Toque de novo para apagar'; return; } delete d.coll[el.dataset.c]; save(); closeModal(); dictRefreshList(); toast('辞', 'Coleção apagada (as palavras continuam no dicionário e no Caderno).'); },
  jmCollNew: () => { const inp = $('#jmCollName'); const n = inp && inp.value.trim().slice(0, 40); const e = JMUI.cur; if (!n || !e) return; const d = jmState(), l = jmLocalOf(e.ord), k = l ? l.key : 'j:' + e.i; (d.coll[n] = d.coll[n] || { t: Date.now(), k: [] }); if (!d.coll[n].k.includes(k)) d.coll[n].k.push(k); save(); toast('辞', 'Adicionada à coleção “' + n + '”.'); jmOpen(e.ord, { keep: true }); }
});
document.addEventListener('change', ev => {
  const t = ev.target; if (!t.classList || !t.classList.contains('jm-coll-sel')) return;
  const e = JMUI.cur; if (!e) return; const v = t.value; if (!v) return;
  if (v === '__new') { t.closest('.jm-more').insertAdjacentHTML('afterend', `<div class="jm-newcoll"><input class="search" id="jmCollName" maxlength="40" placeholder="Nome da coleção (ex.: Anime, Trabalho)"><button class="btn btn-primary btn-small" data-act="jmCollNew">Criar e adicionar</button></div>`); t.value = ''; const i = $('#jmCollName'); if (i) i.focus(); return; }
  const d = jmState(), l = jmLocalOf(e.ord), k = l ? l.key : 'j:' + e.i;
  if (d.coll[v] && !d.coll[v].k.includes(k)) { d.coll[v].k.push(k); save(); toast('辞', 'Adicionada à coleção “' + v + '”.'); }
  jmOpen(e.ord, { keep: true });
});
// busca: a lista local aparece na hora; o Dicionário Geral completa logo depois
document.addEventListener('input', ev => { if (ev.target.id === 'dictSearch') { if (JMUI.phrase && JMUI.phrase.q !== dictUI.q.trim()) JMUI.phrase = null; jmSchedule(); } });
document.addEventListener('keydown', ev => { if (ev.target.id === 'dictSearch' && ev.key === 'Enter') { const q = dictUI.q.trim(); if (q) jmAddHistNow(q); } });
const _jmDictView = viewDictionary;
viewDictionary = function () { const h = _jmDictView(); if (dictUI.q && !JMUI.res) jmSchedule(); return h.replace('placeholder="Português, romaji, かな ou 漢字"', 'placeholder="Português, romaji, かな, 漢字, inglês ou uma frase"'); };
const _jmTry = ACT.dictTry;
ACT.dictTry = el => { JMUI.phrase = null; _jmTry(el); jmSchedule(); };
const _jmClear = ACT.dictClear;
ACT.dictClear = () => { JMUI.phrase = null; JMUI.res = null; _jmClear(); };
jmRegisterSW();
setTimeout(() => { if (view === 'dicionario') jmInit(); }, 300);
