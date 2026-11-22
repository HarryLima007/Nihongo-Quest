/* ==========================================================
   10.0 — INTEGRAÇÃO: uma jornada só
   - Palavras unificadas: a mesma palavra estudada em várias áreas (Academia, Listening Academy,
     Leitura, Mundo, Chat, Dicionário) aparece uma vez no Caderno e uma vez por sessão na Revisão.
   - "Sua jornada" no Início: todas as áreas em um só lugar, com o progresso de cada uma.
   - Área "Sobre o Nihongo Quest" (#sobre): identidade, versões, créditos e direitos autorais.
   - Base para a 11.0 (Adventure Mode RPG): nqKnownWords, nqLearnerLevel e nqRewardOnce (ver docs/RPG-11-PREP.md).
   Nada aqui muda a lógica pedagógica: lições, avaliações, desbloqueios e regras de XP continuam onde estavam.
   ========================================================== */
const NQ_SITE = 'https://harrylima007.github.io/Nihongo-Quest/';
const NQ_REPO = 'https://github.com/HarryLima007/Nihongo-Quest';
const NQ_HISTORY = [
  ['15.0.0', '2026-11-22', 'Dicionário em português: 213 mil entradas do Dicionário Geral com português em cada sentido (tradução automática do JMdict-PT, marcada como não revisada; o português revisado das lições continua na frente), busca do português para o japonês com sentidos separados, resultados relacionados, plural, gênero e acentos, e fichas com o português de cada sentido ao lado do inglês do JMdict. Sem mudança no save.'],
  ['14.0.0', '2026-11-21', 'Dicionário completo: Dicionário Geral japonês-português com 217 mil entradas do JMdict, 13 mil kanji do KANJIDIC2 com ordem dos traços (KanjiVG), 32 mil frases de exemplo (Tatoeba), acento tonal, busca por português, romaji, kana, kanji e inglês com tolerância a erros, reconhecimento de conjugações em cadeia, análise de frases, 34 partículas e estruturas novas, coleções, histórico, comparação e uso offline; esquema 14.'],
  ['13.0.0', '2026-11-21', 'Learning Intelligence: Central de Aprendizagem (apresentado, estudado, lembrado e dominado em todas as áreas), Revisão inteligente 2.0, Painel de progresso por habilidade, avaliações com estimativa de nível inspirada no JLPT, prática de fala e formas conjugadas no Dicionário; esquema 13.'],
  ['12.0.0', '2026-11-21', 'Expansão de vocabulário: Academia de Vocabulário com 20 categorias e 631 palavras, Dicionário 2.0 com vários sentidos, leituras de kanji em contexto, 14 partículas e busca mais inteligente, e novas situações no Mundo; esquema 12.'],
  ['11.0.0', '2026-11-21', 'Adventure Mode RPG: o Vale Asahi em Kotoba no Kuni, com exploração, NPCs, missões, baús, equipamentos e batalhas por turnos em que o poder das palavras (言霊) usa só o vocabulário que você já estudou; esquema 11.'],
  ['10.0.0', '2026-11-21', 'Integration & Expansion: “Sua jornada” no Início, palavras unificadas entre as áreas (Caderno e Revisão sem duplicar), área Sobre o Nihongo Quest, aviso de direitos autorais (NOTICE) e base para o Adventure Mode; esquema 10.'],
  ['9.0.0', '2026-11-21', 'Leitura Japonesa: hiragana, katakana, palavras, 25 kanji em contexto e frases, com áudio, romaji progressivo e Caderno de caracteres.'],
  ['8.0.0', '2026-11-21', 'Living Japanese World: Hikari-machi com konbini, restaurante, estação, escola e rua comercial; 18 personagens e 24 situações.'],
  ['7.0.0', '2026-11-21', 'Dicionário japonês-português, perguntas e alternativas faladas na Listening Academy e avaliações isoladas por currículo.'],
  ['6.0.0', '2026-11-21', 'Listening Academy: 5 categorias, 29 lições, 12 formatos de exercício e controles de áudio.'],
  ['5.0.0', '2026-11-20', 'Nihongo Chat Evolution: conversa livre com contexto, personalidades, figurinhas e desafios separados.'],
  ['4.0.0', '2026-11-20', 'Nihongo Chat com Ren, Aiko-sensei, Yumi e Takeshi.'],
  ['3.0.0', '2026-11-20', '349 lições em 35 alas e quatro estágios (do iniciante ao proficiente).'],
  ['2.1.0', '2026-11-20', 'Expansão da Academia: 65 lições em 10 alas.'],
  ['2.0.0', '2026-11-20', 'Academia Auditiva, pronúncia e Laboratório de Diálogos.'],
  ['1.0.0', '2026-11-20', 'Primeira versão: Academia gamificada com XP, missões, conquistas, revisão e Caderno.']
];

/* ---------- palavras unificadas ---------- */
/* caracteres isolados (kana, kanji da Leitura, lições de alfabeto) não são "palavras": ficam como estão */
function nqIsCharItem(it) { return !it || it.rdType === 'char' || it.rdType === 'kanji' || !!(it.lesson && it.lesson.kind === 'kana'); }
const nqJpKey = s => String(s || '').replace(/[\s　。、！？!?.,…・「」『』（）()〜~]/g, '');
const nqPtNorm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const NQ_STOP = new Set(['para', 'com', 'que', 'uma', 'dos', 'das', 'nao', 'por', 'mas', 'ser', 'esta', 'isso']);
const nqPtToks = s => new Set(String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter(w => w.length >= 3 && !NQ_STOP.has(w)));
/* mesma escrita E significado compatível (evita juntar homógrafos como もう “já” × もう “poxa!”) */
function nqPtCompat(a, b) {
  const na = nqPtNorm(a), nb2 = nqPtNorm(b);
  if (!na || !nb2) return false;
  if (na.includes(nb2) || nb2.includes(na)) return true;
  const ta = nqPtToks(a), tb = nqPtToks(b);
  for (const t of ta) if (tb.has(t)) return true;
  return false;
}
let _nqClusters = null, _nqN = 0;
function nqClusters() {
  const n = Object.keys(ITEM).length; // o Dicionário pode registrar itens depois: refaz o índice se o total mudar
  if (_nqClusters && n === _nqN) return _nqClusters;
  _nqN = n;
  const by = {}, map = {};
  Object.values(ITEM).forEach(it => { if (nqIsCharItem(it)) return; const k = nqJpKey(it.jp); if (k) (by[k] || (by[k] = [])).push(it); });
  Object.keys(by).forEach(k => {
    if (by[k].length < 2) return;
    const groups = [];
    by[k].forEach(it => { const g = groups.find(g => g.some(x => nqPtCompat(x.pt, it.pt))); if (g) g.push(it); else groups.push([it]); });
    groups.forEach(g => { if (g.length < 2) return; const ids = g.map(x => x.id); ids.forEach(id => { map[id] = ids; }); });
  });
  return (_nqClusters = map);
}
function nqSiblings(id) { return nqClusters()[id] || [id]; }
const nqSeen = id => !!(S.items[id] && S.items[id].seen && ITEM[id]);
function nqWordKnown(id) { return nqSiblings(id).some(nqSeen); }
/* representante de cada palavra: o item mais praticado (empate: o visto primeiro) */
function nqRank(a, b) { const ra = S.items[a] || {}, rb = S.items[b] || {}; return ((rb.c || 0) + (rb.w || 0)) - ((ra.c || 0) + (ra.w || 0)) || (ra.seen || 0) - (rb.seen || 0); }
function nqPrimaryId(id) { const sib = nqSiblings(id).filter(nqSeen); return sib.length ? sib.sort(nqRank)[0] : id; }
function nqPrimaries(entries) {
  const seenKey = new Set(), have = new Set(entries.map(x => x.id));
  return entries.filter(it => { const p = nqPrimaryId(it.id); const ok = p === it.id || !have.has(p); const key = nqSiblings(it.id).join(','); if (!ok || seenKey.has(key)) return false; seenKey.add(key); return true; });
}
function nqUniqueCount(ids) { const s = new Set(); ids.forEach(id => s.add(nqSiblings(id).join(','))); return s.size; }
function nqAlsoIn(id) {
  const others = nqSiblings(id).filter(x => x !== id && nqSeen(x)).map(x => originOf(ITEM[x]).split(' · ')[0]);
  const uniq = [...new Set(others)].filter(o => o !== originOf(ITEM[id]).split(' · ')[0]);
  return uniq.length ? `<span class="nq-also">· também em ${esc(uniq.join(', '))}</span>` : '';
}
function nqDictBtn(it) { return nqIsCharItem(it) || typeof dictOpenWord !== 'function' ? '' : `<button class="icon-btn" data-act="nqDict" data-jp="${esc(it.jp)}" aria-label="Abrir no Dicionário"><span class="jp" style="font-weight:800">辞</span></button>`; }

/* Revisão: uma palavra só uma vez por contagem e por sessão */
const _nqDue = dueItems;
dueItems = function () { const seen = new Set(); return _nqDue().filter(id => { const k = nqSiblings(id).join(','); if (seen.has(k)) return false; seen.add(k); return true; }); };
const _nqBuildReview = buildReview;
buildReview = function (mode) {
  const qs = _nqBuildReview(mode), used = new Set();
  return qs.filter(q => { if (!q || !q.itemId) return true; const k = nqSiblings(q.itemId).join(','); if (used.has(k)) return false; used.add(k); return true; });
};
/* acertar a palavra em qualquer área adia a revisão dos "irmãos" dela (sem mexer em acertos, caixa ou domínio) */
const _nqRecord = recordAnswer;
recordAnswer = function (id, ok, ctx, skill) {
  _nqRecord(id, ok, ctx, skill);
  if (!ok || !id || !ITEM[id] || !S.items[id]) return;
  const due = S.items[id].due;
  nqSiblings(id).forEach(x => { const r = S.items[x]; if (x !== id && r && r.seen && r.c + r.w > 0 && r.due < due) r.due = due; });
};
/* "já está no Caderno" considera a palavra estudada em qualquer área (não cria entradas repetidas) */
const _nqDictIn = dictInNotebook;
dictInNotebook = function (e) { return _nqDictIn(e) || [].concat(e.items, e.dictId || []).some(id => ITEM[id] && nqWordKnown(id)); };
const _nqWSaved = wWordSaved;
wWordSaved = function (k) { return _nqWSaved(k) || !!(WW[k] && nqWordKnown(WW[k].itemId)); };
const _nqRdSaved = rdWordSaved;
rdWordSaved = function (w) { return _nqRdSaved(w) || !!(w && w.id && nqWordKnown(w.id)); };

/* ---------- 11.0: base para o Adventure Mode (só leitura + recompensa única) ---------- */
const NQ_STATUS_ORDER = ['vista', 'revisar', 'aprendendo', 'dominada'];
/* palavras e expressões que o aluno já estudou, sem repetição, com status e áreas de origem */
function nqKnownWords(opts = {}) {
  const min = NQ_STATUS_ORDER.indexOf(opts.minStatus || 'vista');
  const done = new Set(), out = [];
  seenItems().forEach(id => {
    const it = ITEM[id]; if (nqIsCharItem(it)) return;
    const k = nqSiblings(id).join(','); if (done.has(k)) return; done.add(k);
    const sib = nqSiblings(id).filter(nqSeen), p = sib.sort(nqRank)[0], pit = ITEM[p];
    const best = sib.map(itemStatus).sort((a, b) => NQ_STATUS_ORDER.indexOf(b) - NQ_STATUS_ORDER.indexOf(a))[0];
    if (NQ_STATUS_ORDER.indexOf(best) < min) return;
    out.push({ id: p, ids: sib, jp: pit.jp, ro: pit.ro, pt: pit.pt, say: sayOf(pit), status: best, sources: [...new Set(sib.map(x => originOf(ITEM[x]).split(' · ')[0]))] });
  });
  return out;
}
/* nível do aluno em cada área (para desafios que respeitam o que já foi ensinado) */
function nqLearnerLevel() {
  const rd = rdState(), ex = rd.exams || {};
  return {
    level: levelInfo(S.xp).level, xp: S.xp,
    stage: currentStage(), lessons: countPassed(S),
    listening: laStats().lessons, reading: READ_COURSE.filter(st => ex[st.id] && ex[st.id].passed).map(st => st.id),
    world: WORLD_SCENES.filter(sc => wDone(sc.id)).length,
    words: nqKnownWords().length, mastered: nqKnownWords({ minStatus: 'dominada' }).length
  };
}
/* recompensa de primeira conclusão compartilhada: a mesma chave nunca paga duas vezes (XP em S.xp, moedas em S.coins) */
function nqRewardOnce(key, xp = 0, coins = 0) {
  const j = S.journey || (S.journey = defaultJourney());
  if (!key || j.claimed[key]) return false;
  j.claimed[key] = Date.now();
  addXP(Math.max(0, Math.min(50, xp | 0))); addCoins(Math.max(0, Math.min(50, coins | 0)));
  save(); return true;
}

/* ---------- Início: "Sua jornada" (substitui a pilha de cartões "Novo") ---------- */
function nqJourneyTiles() {
  const rdN = Object.values(rdState().lessons).filter(x => x && x.passed).length;
  const wN = WORLD_SCENES.filter(sc => wDone(sc.id)).length;
  const chN = CHAT_CHARS.filter(c => chUnlocked(c)).length;
  const due = dueItems().length, fav = Object.keys(dictState().fav).length;
  const t = (act, extra, ic, name, sub, cls = '') => `<button class="nq-tile ${cls}" data-act="${act}" ${extra}><span class="nq-ic jp">${ic}</span><span class="nq-tn">${name}</span><span class="nq-ts">${sub}</span></button>`;
  return [
    t('acadMode', 'data-mode="trad"', '学', 'Academia', countPassed(S) + '/' + TOTAL_LESSONS + ' lições'),
    t('gotoLA', '', '聴', 'Listening', laStats().lessons + '/' + LA_LESSONS.length + ' lições'),
    t('gotoReading', '', 'あ', 'Leitura', rdN + '/' + RD_LESSONS.length + ' lições'),
    t('gotoWorld', '', '街', 'Mundo', wN + '/' + WORLD_SCENES.length + ' cenas'),
    t('nav', 'data-view="chat"', '話', 'Chat', chN + '/' + CHAT_CHARS.length + ' amigos'),
    t('gotoDict', '', '辞', 'Dicionário', fav ? fav + ' favorita' + (fav > 1 ? 's' : '') : 'pesquisar'),
    t('nav', 'data-view="caderno"', '帳', 'Caderno', nqUniqueCount(seenItems()) + ' itens'),
    t('nav', 'data-view="revisao"', '復', 'Revisão', due ? due + ' agora' : 'em dia', due ? 'due' : '')
  ].join('');
}
homeListenCard = function () {
  return `<section class="section nq-journey"><div class="section-h"><h2>Sua jornada</h2></div>
    <div class="nq-tiles">${nqJourneyTiles()}</div>
    <p class="muted" style="margin:8px 2px 0;font-size:.82rem">Comece pela Academia e pela Listening. Leitura, Mundo e Chat são opcionais e reforçam o que você já ouviu. Tudo soma no mesmo XP, Caderno e Revisão.</p></section>`;
};
const _nqHome = viewHome;
viewHome = function () { return _nqHome().replace(/<\/div>\s*$/, `<p class="nq-foot"><button class="link-btn" data-act="nav" data-view="sobre">Sobre o Nihongo Quest</button> · v${APP_VERSION}</p></div>`); };

/* ---------- Sobre o Nihongo Quest ---------- */
function viewAbout() {
  const hist = NQ_HISTORY.map(([v, d, t], i) => `<li${i === 0 ? ' class="cur"' : ''}><b>${v}</b> <span class="muted tabnum">· ${d.split('-').reverse().join('/')}</span><br><span>${esc(t)}</span></li>`).join('');
  const link = (u, t) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`;
  return `<div class="wrap nq-about">
    <div class="page-title"><div><span class="jp">このアプリについて</span><h1>Sobre o Nihongo Quest</h1></div></div>
    <div class="card nq-id">${mascot('happy', 64)}<div style="min-width:0"><span class="jp nq-jpname">日本語クエスト</span><h2 style="margin:0">Nihongo Quest</h2><span class="muted tabnum">Versão ${APP_VERSION}</span></div></div>
    <section class="section"><h2 style="font-size:1.05rem">O que é</h2><div class="card"><p style="margin:0">Uma academia gamificada de japonês para brasileiros, do zero ao avançado. A prioridade é <b>entender japonês falado</b>; depois vêm reconhecer palavras e expressões, entender situações reais e, aos poucos, ler. Tudo funciona no navegador, sem login, sem anúncios e sem serviços pagos, e o progresso fica salvo no seu aparelho.</p></div></section>
    <section class="section"><h2 style="font-size:1.05rem">Criador</h2><div class="card stack"><p style="margin:0"><b>Harry Lima</b>, criador e responsável pelo projeto.</p><p class="muted" style="margin:0;font-size:.88rem">O Nihongo Quest é um projeto independente. Não há empresa por trás dele.</p></div></section>
    <section class="section"><h2 style="font-size:1.05rem">Site e repositório</h2><div class="card list">
      <div class="row"><div class="grow" style="min-width:0"><b>Site oficial</b><div class="nq-url">${link(NQ_SITE, esc(NQ_SITE.replace('https://', '')))}</div></div></div>
      <div class="row"><div class="grow" style="min-width:0"><b>Repositório</b><div class="nq-url">${link(NQ_REPO, esc(NQ_REPO.replace('https://', '')))}</div></div></div></div></section>
    <section class="section"><h2 style="font-size:1.05rem">Histórico de versões</h2><div class="card"><ol class="nq-hist">${hist}</ol></div></section>
    <section class="section"><h2 style="font-size:1.05rem">Créditos e tecnologias</h2><div class="card nq-credits">
      <p><b>Criação, direção e conteúdo:</b> Harry Lima.</p>
      <p><b>Assistência de IA:</b> parte do código e do conteúdo foi produzida com o Claude Code (Anthropic), sob a direção e a revisão do criador.</p>
      <p><b>Personagens, mascote Hikari, figurinhas e ilustrações:</b> desenhos em SVG feitos para o projeto.</p>
      <p><b>Voz:</b> síntese de voz do próprio aparelho (Web Speech API). As vozes pertencem ao sistema ou ao navegador de quem usa e não são distribuídas pelo app.</p>
      <p><b>Dados do Dicionário Geral</b> (pasta dict/, sob as licenças originais, não sob o aviso de direitos do Nihongo Quest): JMdict, KANJIDIC2 e KRADFILE, propriedade do Electronic Dictionary Research and Development Group (EDRDG), conforme a licença do Grupo (CC BY-SA 4.0, edrdg.org/edrdg/licence.html); frases do Tatoeba (CC BY 2.0 FR, com o crédito de cada autor); ordem dos traços do KanjiVG (Ulrich Apel e colaboradores, CC BY-SA 3.0, kanjivg.tagaini.net); acento tonal do Kanjium (Uros O., CC BY-SA 4.0); níveis JLPT de kanji de Jonathan Waller (CC BY, tanos.co.uk/jlpt); kanji parecidos de Lars Yencken (CC BY 3.0). As traduções para o português feitas pelo projeto a partir desses dados seguem a licença CC BY-SA 4.0. Português automático dos sentidos: JMdict (Português) — camada de tradução © Shiritai, CC BY-SA 4.0, baseada no JMdict © James William Breen e EDRDG (CC BY-SA 4.0, termos da EDRDG); tradução automática do inglês com correções da comunidade, sem revisão humana completa (github.com/zhusupbekova/jmdict-pt). Detalhes em dict/v2/LICENSE.md.</p>
      <p><b>Fontes:</b> M PLUS Rounded 1c e Nunito, carregadas do Google Fonts, sob a SIL Open Font License 1.1, de seus respectivos autores.</p>
      <p><b>Hospedagem:</b> GitHub Pages.</p>
      <p><b>Ferramentas de desenvolvimento</b> (não fazem parte do app publicado): Playwright e kuromoji.js (Apache 2.0, com o dicionário IPADIC), usados só nos testes automáticos, e Python para gerar o arquivo final.</p>
      <p class="muted">A língua japonesa em si (alfabetos, leituras, gramática, expressões comuns) é de uso livre e não pertence a ninguém.</p></div></section>
    <section class="section"><h2 style="font-size:1.05rem">Direitos autorais e uso</h2><div class="card nq-credits">
      <p><b>© 2026 Harry Lima. Todos os direitos reservados.</b></p>
      <p>O código, os textos, as lições, os diálogos, os personagens e as ilustrações originais do Nihongo Quest não têm licença de uso livre. Para reutilizar, redistribuir ou modificar esses materiais, é preciso autorização do criador.</p>
      <p>Você pode usar o site livremente para estudar.</p>
      <p>Materiais de terceiros (fontes, vozes do aparelho, ferramentas) continuam sob as licenças e os termos dos seus autores. Nada aqui reivindica direitos sobre eles.</p>
      <p class="muted">Detalhes no arquivo NOTICE do repositório.</p></div></section>
    <button class="btn btn-ghost btn-block" data-act="nav" data-view="perfil">Voltar ao Perfil</button>
  </div>`;
}
VIEWS.push('sobre');
const _nqRender = render;
render = function () {
  if (view === 'sobre' && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = viewAbout();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'perfil'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _nqRender();
};
Object.assign(ACT, {
  nqDict: el => dictOpenWord(el.dataset.jp)
});
/* novidade da 10.0: aviso único para quem já usava o app */
setTimeout(() => { try { const j = S.journey; if (S.profile.onboarded && j && j.seenVersion !== APP_VERSION) { const old = j.seenVersion || S.migratedFrom10 || S.migratedFrom11 || S.migratedFrom12 || S.migratedFrom13 || S.migratedFrom14; j.seenVersion = APP_VERSION; save(); if (old) toast('辞', 'Novo na 15.0: o Dicionário agora fala português. Pesquise “coragem”, “promessa” ou “saudade” e veja as palavras japonesas. Abra Caderno → Dicionário.'); } } catch (e) {} }, 5200);
