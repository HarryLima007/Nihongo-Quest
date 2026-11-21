/* ==========================================================
   13.0 — LEARNING INTELLIGENCE (Central de Aprendizagem)
   Uma camada única por cima dos sistemas que já existem. Nada aqui cria um segundo SRS, um segundo
   Caderno ou outro XP:
   - Todas as áreas já gravam respostas em recordAnswer/markSeen (S.items). A Central só ACRESCENTA
     um histórico curto por item (S.learn.h: dia + acerto), as áreas onde cada conteúdo apareceu
     (S.learn.x) e o desempenho diário por habilidade (S.learn.days).
   - Unidade de conhecimento = a mesma palavra em qualquer área (nqSiblings, da 10.0), o mesmo
     caractere (あ da Academia = あ da Leitura) ou um exercício escrito da Academia.
   - Estágios: apresentado → estudado → lembrado → dominado. Uma resposta certa nunca é domínio:
       estudado  = já respondeu pelo menos uma vez;
       lembrado  = acertou em pelo menos 2 dias diferentes e a última resposta foi certa;
       dominado  = o mesmo critério do Caderno (acertos em 3 dias ou mais, caixa 3+ do SRS, sem erro
                   recente) e a última resposta certa.
     Errar não apaga nada: o conteúdo só volta para “recuperar” e ganha prioridade na revisão.
   - Revisão Inteligente 2.0, Painel de Progresso (#progresso), Avaliações (#avaliacoes) com
     estimativa de nível inspirada no JLPT (nunca certificação), prática de fala opcional e o
     reconhecimento de formas conjugadas no Dicionário.
   ========================================================== */
const LN_AREAS = { academia: 1, vocab: 2, listening: 4, leitura: 8, mundo: 16, chat: 32, dicionario: 64, rpg: 128, revisao: 256, auditiva: 512, avaliacao: 1024, fala: 2048 };
const LN_AREA_NAME = { academia: 'Academia', vocab: 'Vocabulário', listening: 'Listening', leitura: 'Leitura', mundo: 'Mundo', chat: 'Chat', dicionario: 'Dicionário', rpg: 'Aventura', revisao: 'Revisão', auditiva: 'Academia Auditiva', avaliacao: 'Avaliações', fala: 'Prática de fala' };
const LN_DOMS = [
  ['vocabulario', 'Vocabulário', '語'], ['gramatica', 'Gramática', '文'], ['hiragana', 'Hiragana', 'あ'], ['katakana', 'Katakana', 'ア'],
  ['kanji', 'Kanji', '漢'], ['leitura', 'Leitura', '読'], ['audicao', 'Compreensão auditiva', '聴'], ['conversacao', 'Conversação', '話'], ['expressoes', 'Expressões', '表']
];
const LN_DOM_NAME = Object.fromEntries(LN_DOMS.map(d => [d[0], d[1]]));
const LN_STAGE_NAME = { novo: 'Novo', apresentado: 'Apresentado', estudado: 'Estudado', lembrado: 'Lembrado', dominado: 'Dominado' };
const LN_LV = ['N5', 'N4', 'N3', 'N2', 'N1'];
const LN_PART_LESSONS = new Set(['c5l2', 'c5l3', 'c5l6', 'c5l7', 'c5l8', 'c5l9', 'c8l5']);
const LN_KANJI_CATS = new Set(['c7', 'c17', 'c23']);
const LN_EXPR_CATS = new Set(['c28', 'c34']);
const LN_DAY0 = Date.UTC(2020, 0, 1);
const lnDayNum = (t = Date.now()) => { const d = new Date(t); return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - LN_DAY0) / 864e5); };
const lnState = () => S.learn || (S.learn = defaultLearn());
const lnFocusP = () => typeof P !== 'undefined' && P;

/* ---------- classificação: a que habilidade pertence cada conteúdo ---------- */
const lnScript = jp => /[゠-ヿ]/.test(jp || '') && !/[぀-ゟ]/.test(jp || '') ? 'katakana' : 'hiragana';
function lnDomOfItem(it) {
  if (!it) return 'vocabulario';
  if (it.particle) return 'gramatica';
  const L = it.lesson || {};
  if (L.rd) return it.rdType === 'char' ? lnScript(it.jp) : it.rdType === 'kanji' ? 'kanji' : 'leitura';
  if (L.vc) return 'vocabulario';
  if (L.la) return 'audicao';
  if (L.id === 'chat') return 'conversacao';
  if (L.id === 'dict') return it.group === 'expressao' ? 'expressoes' : 'vocabulario';
  if (L.id === 'world') return 'vocabulario';
  if (AUDIO_PACKS.includes(L)) return it.group === 'expressao' ? 'expressoes' : it.group === 'resposta' ? 'conversacao' : 'audicao';
  if (L.kind === 'kana') return lnScript(it.jp);
  if (L.cat && LN_KANJI_CATS.has(L.cat.id)) return 'kanji';
  if (L.kind === 'kanaword') return lnScript(it.jp);
  if (L.text) return 'leitura';
  if (L.cat && LN_EXPR_CATS.has(L.cat.id) || L.id === 'c1l3' || L.id === 'c1l4') return 'expressoes';
  if (L.kind === 'grammar') return 'gramatica';
  return 'vocabulario';
}
function lnDomOfLesson(L) { return !L ? 'gramatica' : L.text ? 'leitura' : L.kind === 'vocab' ? 'vocabulario' : L.kind === 'kana' || L.kind === 'kanaword' ? (L.cat && LN_KANJI_CATS.has(L.cat.id) ? 'kanji' : 'leitura') : 'gramatica'; }
function lnDomOfSkill(skill, ctx) {
  if (String(ctx || '').startsWith('chat')) return 'conversacao';
  return { vocabulario: 'vocabulario', gramatica: 'gramatica', frases: 'gramatica', leitura: 'leitura', interpretacao: 'leitura', audicao: 'audicao' }[skill] || 'vocabulario';
}
function lnAreaOfCtx(ctx) {
  const c = String(ctx || '');
  if (/^(practice|exam|catexam|lesson)/.test(c)) return 'academia';
  if (/^review/.test(c)) return 'revisao';
  if (/^(listen|dialog|case)/.test(c)) return 'auditiva';
  if (/^lacad/.test(c)) return 'listening';
  if (/^chat/.test(c)) return 'chat';
  if (/^vocab/.test(c)) return 'vocab';
  if (/^leitura/.test(c)) return 'leitura';
  return '';
}
function lnAreaOfItem(it) {
  const L = it && it.lesson; if (!L) return '';
  if (L.vc) return 'vocab'; if (L.rd) return 'leitura'; if (L.la) return 'listening';
  if (L.id === 'chat') return 'chat'; if (L.id === 'dict') return 'dicionario'; if (L.id === 'world') return 'mundo';
  if (AUDIO_PACKS.includes(L)) return 'auditiva';
  return ACADEMY_LESSONS.has(L) ? 'academia' : '';
}
function lnCatLevel(c) { const m = String((c && c.jlpt) || '').match(/N[1-5]/g); return m ? m[m.length - 1] : null; }
function lnLevelOfItem(it) {
  const L = it && it.lesson; if (!L) return null;
  if (ACADEMY_LESSONS.has(L)) return lnCatLevel(L.cat);
  if (L.vc || L.rd || L.la) return 'N5';
  return null;
}

/* ---------- registro (envolve as funções de sempre; nunca as substitui) ---------- */
let LNV = 0; const lnBump = () => { LNV++; };
function lnPush(key, ok) {
  const L = lnState(), a = L.h[key] || (L.h[key] = []);
  a.push(lnDayNum() * 2 + (ok ? 1 : 0)); if (a.length > 8) a.splice(0, a.length - 8);
}
function lnExpose(id, area) {
  if (!id || !area || !LN_AREAS[area]) return;
  const L = lnState(); L.x[id] = (L.x[id] | 0) | LN_AREAS[area];
}
function lnLogDay(dom, ok) {
  const L = lnState(), d = dayKey(), o = L.days[d] || (L.days[d] = {}), x = o[dom] || (o[dom] = [0, 0]);
  x[0]++; if (ok) x[1]++;
  const ks = Object.keys(L.days); if (ks.length > 120) ks.sort().slice(0, ks.length - 120).forEach(k => delete L.days[k]);
}
const lnNoRecord = () => !!(lnFocusP() && P.assess && P.assess.noRecord);
const _lnRecord = recordAnswer;
recordAnswer = function (id, ok, ctx, skill) {
  if (lnNoRecord()) { lnBump(); return; } // avaliação inicial: diagnóstico, não mexe no SRS nem no histórico
  _lnRecord(id, ok, ctx, skill);
  try {
    const it = id && ITEM[id];
    if (it) {
      lnPush(id, ok);
      lnExpose(id, lnAreaOfCtx(ctx) || lnAreaOfItem(it));
      lnAdapt(id, ok);
    }
    lnLogDay(it ? lnDomOfItem(it) : lnDomOfSkill(skill, ctx), ok);
  } catch (e) {}
  lnBump();
};
const _lnSeen = markSeen;
markSeen = function (id) { _lnSeen(id); try { if (ITEM[id]) lnExpose(id, lnAreaOfItem(ITEM[id])); } catch (e) {} lnBump(); };
const _lnEx = recordEx;
recordEx = function (exId, ok) { if (lnNoRecord()) return; _lnEx(exId, ok); if (exId) { lnPush('ex:' + exId, ok); lnBump(); } };
const _lnListen = recordListen;
recordListen = function (q, ok) { if (lnNoRecord()) return; _lnListen(q, ok); };
/* intervalo adaptativo: o SRS de sempre decide a caixa; o histórico ajusta quando o item volta.
   Muitos erros recentes → volta antes. Acertos seguidos → espera um pouco mais. Na caixa máxima,
   o item entra em manutenção (15, 30, 60… até 120 dias) em vez de sumir da revisão. */
function lnAdapt(id, ok) {
  const r = S.items[id]; if (!r || !ok) return;
  const h = lnState().h[id] || [], recent = h.slice(-6), wrong = recent.filter(v => !(v & 1)).length;
  const now = Date.now();
  if (r.box >= 5) {
    if (r.ld === dayKey() && r.prevBox5) r.mt = (r.mt || 0) + 1; else if (!r.mt) r.mt = 1;
    r.prevBox5 = 1;
    r.due = now + Math.min(120, 15 * Math.pow(2, Math.max(0, r.mt - 1))) * 864e5;
  } else {
    const iv = Math.max(0, r.due - now);
    if (wrong >= 2) r.due = now + Math.round(iv * 0.6);
    else if (recent.length >= 4 && wrong === 0) r.due = now + Math.round(iv * 1.25);
  }
  nqSiblings(id).forEach(x => { const s = S.items[x]; if (x !== id && s && s.seen && s.c + s.w > 0 && s.due < r.due) s.due = r.due; });
}
/* itens em manutenção (caixa máxima) também voltam quando chega a hora */
const _lnDue = dueItems;
dueItems = function () {
  const base = _lnDue(), cl = nqClusters(), sib = id => (cl[id] || [id]).join(','), keys = new Set(base.map(sib)), now = Date.now();
  seenItems().forEach(id => { const r = S.items[id]; if (r.box >= 5 && r.mt && r.due <= now) { const k = sib(id); if (!keys.has(k)) { keys.add(k); base.push(id); } } });
  return base;
};
/* encontros em contexto: palavra estudada que reaparece em outra área (sem contar como acerto) */
function lnExposeKnown(ids, area) { ids.forEach(id => { if (id && ITEM[id] && nqWordKnown(id)) nqSiblings(id).filter(nqSeen).forEach(x => lnExpose(x, area)); }); lnBump(); }
const _lnWFinish = wFinish;
wFinish = function (txt) { try { if (WV && WV.sc) lnExposeKnown(WV.sc.words.map(k => WW[k] && WW[k].itemId), 'mundo'); } catch (e) {} return _lnWFinish(txt); };
const _lnLaFinish = laFinish;
laFinish = function () { try { if (P && P.L && P.L.wordRefs) lnExposeKnown(P.L.wordRefs.map(w => w.id), 'listening'); } catch (e) {} return _lnLaFinish(); };
const _lnRdFinish = rdFinish;
rdFinish = function () { try { if (RV && RV.L && RV.L.W) lnExposeKnown(RV.L.W.map(w => w.id), 'leitura'); } catch (e) {} return _lnRdFinish(); };
const _lnRpgWord = rpgRecordWord;
rpgRecordWord = function (id, ok) { _lnRpgWord(id, ok); try { if (ITEM[id]) lnExposeKnown([id], 'rpg'); } catch (e) {} };

/* ---------- unidades de conhecimento ---------- */
let _lnMap = null, _lnMapN = -1;
function lnKeyOf(it, cl) { return nqIsCharItem(it) ? 'c:' + lnDomOfItem(it) + ':' + it.jp : ((cl || nqClusters())[it.id] || [it.id]).join(','); }
function lnUnitMap() {
  const n = Object.keys(ITEM).length;
  if (_lnMap && n === _lnMapN) return _lnMap;
  _lnMapN = n;
  const by = {}, of = {}, tot = {}, lvTot = {}, cl = nqClusters();
  Object.values(ITEM).forEach(it => { if (!it || !it.id) return; const k = lnKeyOf(it, cl); (by[k] || (by[k] = [])).push(it.id); of[it.id] = k; });
  ALL_LESSONS.forEach(L => (L.exercises || []).forEach((_, i) => { const k = 'ex:' + L.id + '#' + i; by[k] = [k]; of[k] = k; }));
  Object.keys(by).forEach(k => { const d = lnUnitDom(k, by[k]); tot[d] = (tot[d] || 0) + 1; const lv = lnUnitLevel(k, by[k]); if (lv) lvTot[lv] = (lvTot[lv] || 0) + 1; });
  return (_lnMap = { by, of, tot, lvTot });
}
function lnUnitDom(k, ids) {
  if (k.startsWith('ex:')) { const x = exById(k.slice(3)); return lnDomOfLesson(x && x.L); }
  const acad = ids.find(id => ITEM[id] && itemSource(ITEM[id]) === 'academia');
  return lnDomOfItem(ITEM[acad || ids[0]]);
}
function lnUnitLevel(k, ids) {
  if (k.startsWith('ex:')) { const x = exById(k.slice(3)); return x ? lnCatLevel(x.L.cat) : null; }
  let best = null; ids.forEach(id => { const lv = lnLevelOfItem(ITEM[id]); if (lv && (!best || +lv[1] > +best[1])) best = lv; });
  return best;
}
const lnIsPart = (k, ids) => k.startsWith('ex:') ? LN_PART_LESSONS.has(k.slice(3).split('#')[0]) || (k.slice(3).split('#')[0].startsWith('c12l')) : ids.some(id => { const it = ITEM[id]; return it && (it.particle || (it.lesson && (LN_PART_LESSONS.has(it.lesson.id) || (it.lesson.cat && it.lesson.cat.id === 'c12')))); });
function lnUnitInfo(k, ids) {
  const now = Date.now(), Lh = lnState().h;
  const u = { key: k, ids, dom: lnUnitDom(k, ids), lv: lnUnitLevel(k, ids), part: lnIsPart(k, ids), seen: false, a: 0, c: 0, last: 0, lastOk: null, due: false, rep: null, ex: null, stage: 'novo', okDays: 0, areas: 0 };
  if (k.startsWith('ex:')) {
    const exId = k.slice(3), r = S.exStats[exId], h = Lh[k] || [];
    u.ex = exId; if (!r) return u;
    u.seen = true; u.a = (r.c || 0) + (r.w || 0); u.c = r.c || 0; u.last = r.last || 0; u.lastOk = !!r.lastOk;
    const days = new Set(h.filter(v => v & 1).map(v => v >> 1)); u.okDays = days.size;
    const tail = h.slice(-2);
    u.stage = !u.a ? 'apresentado' : u.lastOk && days.size >= 3 && tail.every(v => v & 1) ? 'dominado' : u.lastOk && (days.size >= 2 || (!h.length && u.c >= 3)) ? 'lembrado' : 'estudado';
    u.due = u.a > 0 && !u.lastOk; u.areas = LN_AREAS.academia;
    return u;
  }
  let dmax = 0, dom = false, repScore = -1; const okDays = new Set();
  ids.forEach(id => {
    const r = S.items[id], it = ITEM[id]; if (!it || !r) return;
    const n = (r.c || 0) + (r.w || 0);
    if (r.seen || n) u.seen = true;
    u.a += n; u.c += r.c || 0;
    if (n && (r.last || 0) >= u.last) { u.last = r.last || 0; u.lastOk = r.lastOk != null ? !!r.lastOk : (r.box > 0 || !r.w); }
    dmax = Math.max(dmax, r.d || 0);
    const st = itemStatus(id);
    if (st === 'dominada') dom = true;
    if (n && ((r.due <= now && r.box < 5) || (r.box >= 5 && r.mt && r.due <= now) || st === 'revisar')) u.due = true;
    (Lh[id] || []).forEach(v => { if (v & 1) okDays.add(v >> 1); });
    u.areas |= (lnState().x[id] | 0);
    const sc = n * 10 + (r.seen ? 1 : 0) + (itemSource(it) === 'academia' ? .5 : 0);
    if (sc > repScore) { repScore = sc; u.rep = id; }
  });
  u.okDays = Math.max(dmax, okDays.size);
  u.stage = !u.seen ? 'novo' : !u.a ? 'apresentado' : dom && u.lastOk !== false ? 'dominado' : u.okDays >= 2 && u.lastOk !== false ? 'lembrado' : 'estudado';
  return u;
}
let _lnU = null, _lnUV = -1, _lnUS = null, _lnUT = 0;
function lnUnits() {
  const now = Date.now();
  if (_lnU && _lnUV === LNV && _lnUS === S && now - _lnUT < 60000 && Object.keys(ITEM).length === _lnMapN) return _lnU;
  const M = lnUnitMap(), keys = new Set();
  Object.keys(S.items).forEach(id => { const r = S.items[id]; if (ITEM[id] && r && (r.seen || r.c + r.w)) keys.add(M.of[id]); });
  Object.keys(S.exStats).forEach(id => { if (M.by['ex:' + id]) keys.add('ex:' + id); });
  _lnU = [...keys].filter(Boolean).map(k => lnUnitInfo(k, M.by[k] || [k]));
  _lnUV = LNV; _lnUS = S; _lnUT = now;
  return _lnU;
}
/* informação de uma palavra/caractere a partir de qualquer item dela (Dicionário, Caderno, Mundo…) */
function lnUnitOf(id) { const M = lnUnitMap(), k = M.of[id]; return k ? lnUnitInfo(k, M.by[k]) : null; }
const lnNeedsReview = u => u.a > 0 && (u.due || u.lastOk === false);
const lnRecovering = u => u.lastOk === false && u.okDays >= 2;

/* ---------- resumos para o painel ---------- */
function lnSummary() {
  const units = lnUnits(), M = lnUnitMap(), out = {};
  LN_DOMS.forEach(([d]) => { out[d] = { total: M.tot[d] || 0, apresentado: 0, estudado: 0, lembrado: 0, dominado: 0, review: 0, a: 0, c: 0, recA: 0, recC: 0 }; });
  units.forEach(u => { const o = out[u.dom]; if (!o) return; if (o[u.stage] != null) o[u.stage]++; if (lnNeedsReview(u)) o.review++; o.a += u.a; o.c += u.c; });
  const L = lnState(), lim = dayKey(new Date(Date.now() - 29 * 864e5));
  Object.keys(L.days).forEach(day => { if (day < lim) return; const o = L.days[day]; Object.keys(o).forEach(d => { if (out[d]) { out[d].recA += o[d][0]; out[d].recC += o[d][1]; } }); });
  const all = { apresentado: 0, estudado: 0, lembrado: 0, dominado: 0, review: 0, a: 0, c: 0, total: 0 };
  Object.values(out).forEach(o => { ['apresentado', 'estudado', 'lembrado', 'dominado', 'review', 'a', 'c', 'total'].forEach(k => { all[k] += o[k]; }); });
  return { dom: out, all };
}
/* desempenho: últimos 30 dias quando há dados suficientes; senão, o histórico inteiro */
function lnAcc(o) { if (o.recA >= 12) return { p: Math.round(o.recC / o.recA * 100), n: o.recA, recent: true }; if (o.a >= 6) return { p: Math.round(o.c / o.a * 100), n: o.a, recent: false }; return null; }
function lnStrengths(sum) {
  const rows = LN_DOMS.map(([d, n]) => ({ d, n, acc: lnAcc(sum.dom[d]), o: sum.dom[d] })).filter(x => x.acc && x.acc.n >= 12);
  const strong = rows.filter(x => x.acc.p >= 80 && (x.o.lembrado + x.o.dominado) >= 5).sort((a, b) => b.acc.p - a.acc.p).slice(0, 3);
  const weak = rows.filter(x => x.acc.p < 75).sort((a, b) => a.acc.p - b.acc.p).slice(0, 3);
  return { strong, weak };
}
function lnHardUnits(n = 6) {
  return lnUnits().filter(u => u.rep && u.a >= 2 && u.a - u.c >= 2 && u.stage !== 'dominado').sort((a, b) => ((b.a - b.c) / b.a + (b.lastOk === false ? .5 : 0)) - ((a.a - a.c) / a.a + (a.lastOk === false ? .5 : 0))).slice(0, n);
}
/* foto diária do conhecimento por área (evolução ao longo do tempo) */
function lnSnapshot() {
  const L = lnState(), d = dayKey(); if (L.snaps[d] && L.snaps[d].v === LNV) return;
  const sum = lnSummary(), o = { t: Date.now() };
  LN_DOMS.forEach(([k]) => { const x = sum.dom[k]; o[k] = [x.estudado + x.lembrado + x.dominado, x.lembrado, x.dominado]; });
  L.snaps[d] = o; Object.defineProperty(o, 'v', { value: LNV, enumerable: false });
  const ks = Object.keys(L.snaps).sort(); if (ks.length > 90) ks.slice(0, ks.length - 90).forEach(k => delete L.snaps[k]);
}
/* semanas: taxa de acertos e volume (S.log existe desde a 3.0, então o histórico já vem completo) */
function lnWeeks(n = 8) {
  const out = [], now = new Date(); now.setHours(12, 0, 0, 0);
  for (let w = n - 1; w >= 0; w--) {
    let a = 0, c = 0;
    for (let i = 0; i < 7; i++) { const d = new Date(now); d.setDate(d.getDate() - w * 7 - i); const o = S.log[dayKey(d)]; if (o) { a += o.a || 0; c += o.c || 0; } }
    const end = new Date(now); end.setDate(end.getDate() - w * 7);
    out.push({ a, c, p: a ? Math.round(c / a * 100) : null, label: w === 0 ? 'esta' : end.getDate() + '/' + (end.getMonth() + 1) });
  }
  return out;
}
/* estimativa de nível inspirada no JLPT: só conteúdo do app, pesado pelo estágio de cada unidade */
function lnJlpt() {
  const M = lnUnitMap(), credit = {};
  lnUnits().forEach(u => { if (!u.lv) return; credit[u.lv] = (credit[u.lv] || 0) + ({ dominado: 1, lembrado: .6, estudado: .2, apresentado: 0 }[u.stage] || 0); });
  const rows = LN_LV.map(lv => { const tot = M.lvTot[lv] || 0; return { lv, tot, pct: tot ? Math.min(100, Math.round((credit[lv] || 0) / tot * 100)) : 0 }; });
  let est = null; for (const r of rows) { if (r.pct >= 50) est = r.lv; else break; }
  const next = rows.find(r => r.pct < 50);
  return { rows, est, next };
}

/* ---------- recomendações ("o próximo passo certo") ---------- */
function lnRecent(days) { const lim = Date.now() - days * 864e5; return lnUnits().filter(u => u.lastOk === false && u.last >= lim && u.rep); }
function lnRecommend(max = 4) {
  const out = [], sum = lnSummary(), due = dueItems().length, errs = lnRecent(5).length;
  const add = (p, o) => out.push(Object.assign({ p }, o));
  if (due) add(due >= 10 ? 92 : 74, { k: 'due', ic: '復', t: 'Revisão inteligente', s: due + (due === 1 ? ' item chegou' : ' itens chegaram') + ' na hora de revisar' + (errs ? ', com ' + errs + ' erro' + (errs > 1 ? 's' : '') + ' recente' + (errs > 1 ? 's' : '') : '') + '.', act: 'startReview', data: 'data-mode="smart"' });
  if (errs >= 3) add(76, { k: 'err', ic: '直', t: 'Recuperar erros recentes', s: errs + ' conteúdos errados nos últimos dias. Errar faz parte: revisar agora fixa a forma certa.', act: 'startReview', data: 'data-mode="smart:erros"' });
  const st = lnStrengths(sum);
  if (st.weak[0]) add(66, { k: 'weak', ic: LN_DOMS.find(x => x[0] === st.weak[0].d)[2], t: 'Reforçar ' + st.weak[0].n.toLowerCase(), s: st.weak[0].acc.p + '% de acertos' + (st.weak[0].acc.recent ? ' nos últimos 30 dias' : '') + '. Uma revisão focada ajuda.', act: 'startReview', data: 'data-mode="smart:' + st.weak[0].d + '"' });
  const stx = lnStageExamReady();
  if (stx) add(70, { k: 'stage', ic: '試', t: 'Prova da etapa ' + stx.name, s: 'Você concluiu todas as alas desta etapa. A prova confirma o que ficou.', act: 'lnAssess', data: 'data-k="etapa:' + stx.id + '"' });
  const nx = nextStep();
  if (nx && nx.lesson) add(60, { k: 'lesson', ic: nx.lesson.emblem || '学', t: 'Próxima lição: ' + nx.lesson.title, s: nx.lesson.cat.title + ' · lição ' + (nx.lesson.index + 1) + '.', act: 'startLesson', data: 'data-id="' + nx.lesson.id + '"' });
  else if (nx && nx.exam) add(62, { k: 'exam', ic: '試', t: 'Avaliação final: ' + nx.exam.title, s: 'Todas as lições da ala foram aprovadas.', act: 'openCatExam', data: 'data-cat="' + nx.exam.id + '"' });
  // equilíbrio entre habilidades: escuta e vocabulário acompanham a Academia
  const acadN = countPassed(S), laN = laStats().lessons;
  if (acadN >= 3 && laN < Math.ceil(acadN / 4)) { const L = LA_LESSONS.find(l => !laLessonPassed(l.id) && laLessonUnlocked(l)); if (L) add(57, { k: 'la', ic: '聴', t: 'Escuta: ' + L.title, s: 'Sua Academia está à frente da escuta. Ouvir o que você já leu fixa as palavras.', act: 'lnOpenLA', data: '' }); }
  const vcN = VC_LESSONS.filter(L => vcState().lessons[L.id] && vcState().lessons[L.id].passed).length;
  if (acadN >= 2 && vcN < Math.ceil(acadN / 3)) add(52, { k: 'vc', ic: '語', t: 'Vocabulário novo', s: 'Lições curtas de 5 a 10 palavras, com áudio e exemplos.', act: 'gotoVocab', data: '' });
  // usar em contexto: uma situação do Mundo com palavras que você já estudou
  const sc = lnWorldPick(); if (sc) add(44, { k: 'world', ic: '街', t: 'Use no Mundo: ' + sc.sc.title, s: sc.known + ' das palavras desta situação você já estudou.', act: 'lnWorld', data: 'data-id="' + sc.sc.id + '"' });
  const ph = lnSpeakPool().length;
  if (ph >= 5 && (sum.dom.conversacao.a < 30 || !lnState().speak.n)) add(36, { k: 'speak', ic: '声', t: 'Ouvir e repetir', s: 'Prática de fala com ' + Math.min(6, ph) + ' frases que você já estudou.', act: 'lnSpeak', data: '' });
  const L = lnState();
  if (!L.placement && countPassed(S) < 6) add(58, { k: 'place', ic: '測', t: 'Avaliação inicial', s: 'Descubra em 5 minutos o que você já sabe. Não muda o mapa nem o seu progresso.', act: 'lnAssess', data: 'data-k="inicial"' });
  const lastTest = L.assess.filter(a => a.k !== 'inicial').slice(-1)[0];
  if (sum.all.estudado + sum.all.lembrado + sum.all.dominado >= 40 && (!lastTest || Date.now() - lastTest.t > 14 * 864e5)) add(40, { k: 'test', ic: '測', t: 'Avaliação cumulativa', s: 'Uma checagem de tudo o que você estudou, misturando habilidades.', act: 'lnAssess', data: 'data-k="cumulativa"' });
  return out.sort((a, b) => b.p - a.p).slice(0, max);
}
function lnWorldPick() {
  let best = null;
  WORLD_SCENES.forEach(sc => {
    if (wDone(sc.id) || sc.kind === 'evento' || !sc.words || sc.words.length < 3) return;
    const known = sc.words.filter(k => WW[k] && nqWordKnown(WW[k].itemId)).length;
    if (known / sc.words.length >= .5 && (!best || known > best.known)) best = { sc, known };
  });
  return best;
}
function lnRecHTML(r, main) {
  return `<button class="ln-rec ${main ? 'main' : ''}" data-act="${r.act}" ${r.data}><span class="ln-rec-ic jp">${esc(r.ic)}</span><span class="ln-rec-t"><b>${esc(r.t)}</b><small>${esc(r.s)}</small></span><span class="ln-rec-go" aria-hidden="true">›</span></button>`;
}

/* ==========================================================
   REVISÃO INTELIGENTE 2.0
   ========================================================== */
const LN_FOCUS = [['', 'Misturada'], ['erros', 'Erros recentes'], ['antigos', 'Conteúdos antigos'], ['vocabulario', 'Vocabulário'], ['kanji', 'Kanji'], ['gramatica', 'Gramática'], ['particulas', 'Partículas'], ['expressoes', 'Expressões'], ['audicao', 'Escuta'], ['leitura', 'Leitura e kana']];
function lnFocusFilter(f) {
  const now = Date.now();
  if (!f) return () => true;
  if (f === 'erros') return u => u.lastOk === false || (u.a > u.c && u.last > now - 14 * 864e5 && u.stage !== 'dominado');
  if (f === 'antigos') return u => (u.stage === 'lembrado' || u.stage === 'dominado') && u.last && u.last < now - 14 * 864e5;
  if (f === 'particulas') return u => u.part;
  if (f === 'leitura') return u => ['leitura', 'hiragana', 'katakana'].includes(u.dom);
  if (f === 'audicao') return u => !!u.rep && lnCanHear(ITEM[u.rep]);
  return u => u.dom === f;
}
function lnScore(u) {
  const now = Date.now(); let s;
  if (!u.a) s = .8; // apresentado, ainda sem resposta: primeira recordação
  else if (u.due) { const r = S.items[u.rep] || {}; const iv = Math.max(12 * 36e5, (r.due || now) - (r.last || now)); s = 3 + Math.min(3, (now - (u.last || now)) / iv); }
  else if (u.stage === 'dominado') s = now - u.last > 21 * 864e5 ? 1.4 : 0;
  else s = u.stage === 'lembrado' ? .5 : 1.1;
  if (u.lastOk === false) s += u.last > now - 7 * 864e5 ? 4 : 2;
  if (lnRecovering(u)) s += 1;
  return s;
}
const lnCanHear = it => !!it && AUDIO.supported && !nqIsCharItem(it) && /[぀-ヿ一-鿿]/.test(sayOf(it) || '') && !(it.lesson && (it.lesson.kind === 'kana' || it.lesson.kind === 'number' || it.particle));
function lnFormats(it) {
  const L = it.lesson || {};
  if (it.particle || L.rd) return ['auto'];
  if (it.group === 'resposta') return ['auto'];
  if (L.vc) return ['ver', 'pt2jp'].concat(lnCanHear(it) ? ['listen'] : []);
  if (L.kind === 'kana') return ['kana_read', 'kana_find'];
  if (L.kind === 'number') return ['auto'];
  if (L.kind === 'audio') return ['text'].concat(lnCanHear(it) ? ['listen'] : []);
  const f = ['jp2pt', 'pt2jp']; if (L.kind === 'kanaword') f.unshift('word_read');
  if (lnCanHear(it) && lessonCanListen(L)) f.push('listen');
  return f;
}
function lnTextQ(it) {
  const pool = (it.lesson && it.lesson.items || []).concat(curriculumItems());
  const d = ptDistractors(it, pool);
  return { type: 'mc', itemId: it.id, prompt: 'O que significa?', big: it.jp, ro: it.ro, say: sayOf(it), options: shuffle([it, ...d]).map(x => ({ label: x.pt, plain: true, correct: x === it })), answerText: it.pt, explain: it.note || it.when || '' };
}
function lnQ(it, fmt) {
  if (!it) return null;
  const fs = lnFormats(it), L = lnState();
  if (!fmt) { const last = L.f[it.id]; const opts = fs.length > 1 ? fs.filter(f => f !== last) : fs; fmt = pick(opts); }
  L.f[it.id] = fmt;
  let q;
  try {
    if (fmt === 'listen') { const g = groupOf(it); q = it.lesson && it.lesson.vc ? genListenQ(it, 'word', S.listening.level, vcKnown(null).filter(x => x !== it && vcPtMain(x) !== vcPtMain(it)).map(x => ({ ...x, pt: vcPtMain(x) })).concat([it])) : genListenQ(it, g === 'frase' ? 'phrase' : 'word', S.listening.level, (it.lesson && it.lesson.items || []).concat(listenPool(g === 'anime' ? 'anime' : g, S.listening.level))); }
    else if (fmt === 'text') q = lnTextQ(it);
    else if (fmt === 'auto') q = genItemQ(it);
    else q = genItemQ(it, fmt);
  } catch (e) { q = null; }
  if (!q || (q.options && q.options.filter(o => o.correct).length !== 1) || (q.options && q.options.length < 2)) { try { q = genItemQ(it); } catch (e) { q = null; } }
  if (q) { q.fmt = fmt; q.dom = lnDomOfItem(it); }
  return q;
}
function lnUQ(u, fmt) { const q = lnQ(ITEM[u.rep], fmt); if (q) q.dom = u.dom; return q; }
function lnExQ(exId) { const q = exQ(exId); if (q) { const x = exById(exId); q.dom = lnDomOfLesson(x && x.L); q.fmt = 'ex'; } return q; }
function lnBuildSmart(focus, n = 12) {
  const flt = lnFocusFilter(focus || '');
  const units = lnUnits().filter(u => (u.rep || u.ex) && u.seen && flt(u)).map(u => ({ u, s: lnScore(u) + Math.random() * .6 })).filter(x => x.s > 0 || focus === 'antigos');
  units.sort((a, b) => b.s - a.s);
  const pickU = [], cap = focus ? n : Math.ceil(n * .4), per = {};
  const take = x => { if (pickU.includes(x)) return; pickU.push(x); per[x.u.dom] = (per[x.u.dom] || 0) + 1; };
  if (!focus) {
    units.filter(x => x.u.lastOk === false).slice(0, 3).forEach(take);
    shuffle(units.filter(x => (x.u.stage === 'dominado' || x.u.stage === 'lembrado') && x.u.last < Date.now() - 14 * 864e5)).slice(0, 2).forEach(take);
  }
  for (const x of units) { if (pickU.length >= n) break; if ((per[x.u.dom] || 0) >= cap) continue; take(x); }
  for (const x of units) { if (pickU.length >= n) break; take(x); }
  const items = pickU.filter(x => x.u.rep).map(x => x.u), exs = pickU.filter(x => x.u.ex).map(x => x.u.ex);
  let qs = items.map(u => lnUQ(u)).filter(Boolean).concat(exs.slice(0, 4).map(lnExQ).filter(Boolean));
  // gramática e partículas: completa com exercícios escritos das lições já aprovadas (os de menor acerto primeiro)
  if (['', 'gramatica', 'particulas', 'erros'].includes(focus || '') && qs.length < n) {
    const used = new Set(exs);
    const pool = passedLessons().filter(L => focus !== 'particulas' || LN_PART_LESSONS.has(L.id) || L.cat.id === 'c12').flatMap(lessonExIds).filter(id => !used.has(id) && (focus !== 'erros' || (S.exStats[id] && !S.exStats[id].lastOk)));
    const acc = id => { const r = S.exStats[id]; return r ? r.c / Math.max(1, r.c + r.w) : .5; };
    shuffle(pool).sort((a, b) => acc(a) - acc(b)).slice(0, Math.min(focus ? 5 : 2, n - qs.length)).forEach(id => { const q = lnExQ(id); if (q) qs.push(q); });
  }
  qs = shuffle(qs).map(q => Object.assign(q, { smart: true }));
  if (qs[0] && qs[0].type === 'match') qs.push(qs.shift());
  return qs.slice(0, n);
}
const _lnBuildReview = buildReview;
buildReview = function (mode) {
  if (mode === 'smart' || (mode && mode.startsWith('smart:'))) return lnBuildSmart(mode.slice(6));
  if (mode && mode.startsWith('assess:')) return lnBuildAssess(mode.slice(7));
  return _lnBuildReview(mode);
};
const _lnStartReview = startReview;
startReview = function (mode) {
  if (mode && (mode === 'smart' || mode.startsWith('smart:')) && !buildReview(mode).length) { const f = LN_FOCUS.find(x => x[0] === mode.slice(6)); toast('復', f && f[0] ? 'Ainda não há conteúdo estudado em “' + f[1] + '”. Estude mais um pouco e volte aqui.' : 'Estude uma lição primeiro para ter o que revisar.'); return; }
  _lnStartReview(mode);
  if (P && P.kind === 'review' && mode && mode.startsWith('smart')) P.before = lnStagesOf(P.qs);
};
function lnStagesOf(qs) { const o = {}; (qs || []).forEach(q => { const id = q.itemId || (q.exId ? 'ex:' + q.exId : null); if (!id) return; const u = q.itemId ? lnUnitOf(q.itemId) : lnUnitInfo('ex:' + q.exId, ['ex:' + q.exId]); if (u) o[u.key] = u.stage; }); return o; }

/* ==========================================================
   AVALIAÇÕES
   ========================================================== */
const LN_TESTS = [['vocabulario', 'Vocabulário', '語'], ['gramatica', 'Gramática', '文'], ['kanji', 'Kanji', '漢'], ['leitura', 'Leitura e kana', '読'], ['audicao', 'Compreensão auditiva', '聴'], ['cumulativa', 'Cumulativa', '総']];
function lnTaught(f) { return lnUnits().filter(u => u.seen && (u.rep || u.ex) && f(u)); }
function lnTestPool(k) {
  if (k === 'cumulativa') return lnTaught(() => true);
  if (k === 'audicao') return lnTaught(u => u.rep && lnCanHear(ITEM[u.rep]));
  if (k === 'leitura') return lnTaught(u => ['leitura', 'hiragana', 'katakana'].includes(u.dom));
  return lnTaught(u => u.dom === k);
}
function lnTestAvail(k) {
  if (k === 'audicao' && (!AUDIO.supported || audioBlocked())) return { ok: false, why: 'Precisa de uma voz japonesa no aparelho.' };
  const n = lnTestPool(k).length;
  return n >= 6 ? { ok: true, n } : { ok: false, why: n ? 'Estude mais ' + (6 - n) + ' conteúdo' + (6 - n > 1 ? 's' : '') + ' desta área para liberar.' : 'Você ainda não estudou esta área.' };
}
function lnStageCats(st) { return CATS.filter(c => stageOf(c) === st && catHasContent(c)); }
function lnStageExamReady() {
  for (const st of STAGES) { const cs = lnStageCats(st.id); if (cs.length && cs.every(c => catPassed(c.id)) && !(lnState().stageEx[st.id] && lnState().stageEx[st.id].passed)) return st; }
  return null;
}
function lnPlacementBlock(lv) {
  const cats = CATS.filter(c => lnCatLevel(c) === lv && catHasContent(c));
  const lessons = cats.flatMap(c => c.lessons);
  const vocab = shuffle(lessons.filter(L => ['vocab', 'kanaword'].includes(L.kind)).flatMap(L => L.items)).slice(0, 2);
  const gram = shuffle(lessons.filter(L => L.kind === 'grammar').flatMap(L => L.items)).slice(0, lv === 'N5' ? 1 : 2);
  const exs = shuffle(lessons.flatMap(lessonExIds).filter(id => { const x = exById(id); return x && x.ex && (x.ex.t === 'fill' || x.ex.t === 'situation'); })).slice(0, 1);
  const qs = [];
  if (lv === 'N5') { const kana = shuffle(lessons.filter(L => L.kind === 'kana').flatMap(L => L.items))[0]; if (kana) qs.push(genItemQ(kana, 'kana_read')); }
  vocab.forEach(it => qs.push(genItemQ(it, 'jp2pt')));
  gram.forEach(it => qs.push(genItemQ(it, 'jp2pt')));
  exs.forEach(id => { const q = exQ(id); if (q) qs.push(q); });
  return shuffle(qs.filter(Boolean)).map(q => Object.assign(q, { lvl: lv, dom: q.itemId ? lnDomOfItem(ITEM[q.itemId]) : 'gramatica' }));
}
function lnBuildAssess(k) {
  if (k === 'inicial') return lnPlacementBlock('N5');
  if (k.startsWith('etapa:')) {
    const st = k.slice(6), lessons = lnStageCats(st).flatMap(c => c.lessons);
    const its = shuffle(lessons.flatMap(L => L.items)).slice(0, 14).map(it => lnQ(it));
    const exs = shuffle(lessons.flatMap(lessonExIds)).slice(0, 6).map(lnExQ);
    return shuffle(its.concat(exs).filter(Boolean)).slice(0, 20);
  }
  const pool = shuffle(lnTestPool(k)), n = k === 'cumulativa' ? 20 : 12;
  const units = pool.sort((a, b) => (a.stage === 'dominado') - (b.stage === 'dominado')).slice(0, n);
  let qs = units.map(u => u.ex ? lnExQ(u.ex) : lnUQ(u, k === 'audicao' ? 'listen' : null)).filter(Boolean);
  if (k === 'gramatica' || k === 'cumulativa') {
    const used = new Set(units.filter(u => u.ex).map(u => u.ex));
    shuffle(passedLessons().filter(L => k === 'cumulativa' || lnDomOfLesson(L) === 'gramatica').flatMap(lessonExIds).filter(id => !used.has(id))).slice(0, k === 'gramatica' ? 4 : 4).forEach(id => { const q = lnExQ(id); if (q) qs.push(q); });
  }
  if (k === 'leitura') shuffle(passedLessons().filter(L => L.text).flatMap(lessonExIds)).slice(0, 3).forEach(id => { const q = lnExQ(id); if (q) qs.push(q); });
  return shuffle(qs).slice(0, n);
}
function lnAssessName(k) { if (k === 'inicial') return 'Avaliação inicial'; if (k.startsWith('etapa:')) { const st = STAGES.find(x => x.id === k.slice(6)); return 'Prova da etapa ' + (st ? st.name : ''); } const t = LN_TESTS.find(x => x[0] === k); return t ? (k === 'cumulativa' ? 'Avaliação cumulativa' : 'Teste de ' + t[1].toLowerCase()) : 'Avaliação'; }
function lnStartAssess(k) {
  if (k !== 'inicial' && !k.startsWith('etapa:')) { const av = lnTestAvail(k); if (!av.ok) { toast('測', av.why); return; } }
  if (k.startsWith('etapa:') && !lnStageCats(k.slice(6)).every(c => catPassed(c.id))) { toast('試', 'Conclua todas as alas desta etapa para fazer a prova.'); return; }
  const qs = lnBuildAssess(k);
  if (!qs.length) { toast('測', 'Ainda não há perguntas suficientes para esta avaliação.'); return; }
  closeModal();
  P = { kind: 'review', mode: 'assess:' + k, phase: 'quiz', quiz: 'review', assess: { k, noRecord: k === 'inicial', adaptive: k === 'inicial', lv: 'N5', levels: {} }, startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  setupQuiz(qs, 'review'); openPlayer(); renderPlayer();
}
/* avaliação inicial adaptativa: um bloco por nível; passa para o próximo com 60% ou mais */
function lnPlacementStep() {
  const A = P.assess, n = P.qs.filter(q => q.lvl === A.lv && !q.retry).length, okN = (P.lvOk && P.lvOk[A.lv]) || 0;
  A.levels[A.lv] = [n, okN];
  const nextLv = LN_LV[LN_LV.indexOf(A.lv) + 1];
  if (n && okN / n >= .6 && nextLv) { A.lv = nextLv; P.qs.push(...lnPlacementBlock(nextLv)); P.total = P.qs.length; }
}
const _lnFinishQ = finishQuestion;
finishQuestion = function (ok) {
  const q = P && P.qs && P.qs[P.i];
  if (P && P.assess && q && !q.retry) { const lv = q.lvl; if (lv) { P.lvOk = P.lvOk || {}; if (ok) P.lvOk[lv] = (P.lvOk[lv] || 0) + 1; } const d = q.dom || 'vocabulario', by = P.assess.by || (P.assess.by = {}); const o = by[d] || (by[d] = [0, 0]); o[0]++; if (ok) o[1]++; }
  return _lnFinishQ(ok);
};
const _lnNext = nextQuestion;
nextQuestion = function () { if (P && P.assess && P.assess.adaptive && P.i + 1 >= P.qs.length) lnPlacementStep(); return _lnNext(); };
/* avaliações não pagam XP por pergunta (evita “farm”): só uma recompensa única por tipo */
let LN_XP_OK = false;
const _lnAddXP = addXP;
addXP = function (n, quiet) { if (lnFocusP() && P.assess && !LN_XP_OK) return; return _lnAddXP(n, quiet); };
const _lnEndQuiz = endQuiz;
endQuiz = function () {
  if (!(P && P.assess)) return _lnEndQuiz();
  const A = P.assess, L = lnState(), pct = P.graded ? Math.round(P.correct / P.graded * 100) : 0;
  touchStudy();
  const rec = { t: Date.now(), k: A.k, pct, n: P.graded, by: A.by || {} };
  let reward = null;
  LN_XP_OK = true;
  try {
    if (A.k === 'inicial') {
      let est = null; for (const lv of LN_LV) { const r = A.levels[lv]; if (r && r[0] && r[1] / r[0] >= .6) est = lv; else break; }
      rec.est = est; rec.levels = A.levels; L.placement = { t: rec.t, est, levels: A.levels };
      if (nqRewardOnce('learn:inicial', 10, 5)) reward = { xp: 10, coins: 5 };
    } else if (A.k.startsWith('etapa:')) {
      const st = A.k.slice(6), r = L.stageEx[st] || (L.stageEx[st] = { passed: false, best: 0, attempts: 0 });
      r.attempts++; r.best = Math.max(r.best, pct); r.last = pct; rec.pass = pct >= PASS;
      if (rec.pass && !r.passed) { r.passed = true; r.at = Date.now(); }
      if (rec.pass && nqRewardOnce('learn:etapa:' + st, 50, 30)) reward = { xp: 50, coins: 30 };
    } else if (nqRewardOnce('learn:test:' + A.k, 10, 5)) reward = { xp: 10, coins: 5 };
  } finally { LN_XP_OK = false; }
  L.assess.push(rec); if (L.assess.length > 40) L.assess.splice(0, L.assess.length - 40);
  P.pct = pct; P.pass = A.k.startsWith('etapa:') ? pct >= PASS : true; P.phase = 'result'; P.lnRec = rec; P.lnReward = reward;
  lnBump(); checkAchievements(); saveNow();
  sfx('level'); if (P.pass) confetti();
  renderPlayer();
};
const _lnRenderResult = renderResult;
renderResult = function () {
  if (P && P.assess) return lnAssessResult();
  const h = _lnRenderResult();
  if (!(P && P.mode && String(P.mode).startsWith('smart') && P.before)) return h;
  return h.replace('<div class="reward-row">', lnChangesHTML() + '<div class="reward-row">');
};
function lnChangesHTML() {
  const after = lnStagesOf(P.qs), order = ['novo', 'apresentado', 'estudado', 'lembrado', 'dominado'];
  let up = 0, down = 0; const ups = { lembrado: 0, dominado: 0 };
  Object.keys(after).forEach(k => { const a = order.indexOf(after[k]), b = order.indexOf(P.before[k] || 'novo'); if (a > b) { up++; if (ups[after[k]] != null) ups[after[k]]++; } else if (a < b) down++; });
  const due = dueItems().length;
  const parts = [];
  if (ups.dominado) parts.push(ups.dominado + ' passou' + (ups.dominado > 1 ? 'aram' : '') + ' a dominado');
  if (ups.lembrado) parts.push(ups.lembrado + ' passou' + (ups.lembrado > 1 ? 'aram' : '') + ' a lembrado');
  if (!parts.length && up) parts.push(up + ' avançou' + (up > 1 ? 'aram' : '') + ' de estágio');
  const txt = (parts.length ? parts.join(' e ') + '. ' : '') + (down ? down + ' volt' + (down > 1 ? 'aram' : 'ou') + ' para recuperar, e vão aparecer de novo em breve. ' : '') + (due ? 'Ainda há ' + due + ' na fila de revisão.' : 'Sua fila de revisão está em dia.');
  return `<p class="ln-change"><b>O que mudou:</b> ${esc(txt)}</p>`;
}
function lnAssessResult() {
  const R = P.lnRec || {}, k = R.k || '', g = P.lnReward;
  const byRows = Object.keys(R.by || {}).filter(d => LN_DOM_NAME[d]).map(d => { const [a, c] = R.by[d], p = Math.round(c / a * 100); return `<div class="row"><span class="grow"><b>${esc(LN_DOM_NAME[d])}</b><div class="bar light" style="margin-top:6px"><i style="width:${p}%"></i></div></span><span class="muted tabnum" style="font-size:.85rem">${c}/${a} · ${p}%</span></div>`; }).join('');
  let title = lnAssessName(k), msg = '';
  if (k === 'inicial') {
    const lv = R.est;
    msg = lv ? 'Pelo que você mostrou, seu ponto de partida parece próximo do nível ' + lv + '. Isso é uma estimativa do app, não um resultado oficial do JLPT.' : 'Você está começando do zero, e tudo bem! A Academia começa exatamente daqui.';
    msg += ' O mapa da Academia não muda: as lições continuam abrindo em sequência, mas você pode avançar rápido no que já sabe.';
  } else if (k.startsWith('etapa:')) msg = P.pass ? 'Etapa confirmada! Você mostrou domínio do conteúdo desta etapa.' : 'Ainda não foi desta vez. Os erros entraram na sua revisão; tente de novo quando quiser.';
  else msg = R.pct >= 85 ? 'Ótimo domínio desta área.' : R.pct >= 65 ? 'Boa base. Os erros entraram na revisão para você recuperar.' : 'Esta área precisa de reforço. A Revisão inteligente vai priorizar o que você errou.';
  const lvRows = k === 'inicial' && R.levels ? LN_LV.filter(lv => R.levels[lv]).map(lv => { const [a, c] = R.levels[lv]; return `<div class="row"><span class="grow"><b>Nível ${lv}</b></span><span class="muted tabnum">${c}/${a}</span></div>`; }).join('') : '';
  const errs = P.errors.length ? `<section class="section"><h2 style="font-size:1.05rem">Para revisar</h2><div class="card">${P.errors.slice(0, 8).map(q => `<div class="err-item"><b>${esc(q.prompt)}${q.type === 'listen' ? ' Áudio: ' + esc(q.jp) : q.big && q.bigClass !== 'fill' ? ': ' + esc(q.big) : q.jp ? ': ' + esc(q.jp) : ''}</b>${q.answerText ? `<span>Resposta: ${esc(q.answerText)}</span>` : ''}</div>`).join('')}</div></section>` : '';
  const body = `<div class="result-hero">${mascot(P.pass ? 'wow' : 'neutral', 120, 'hop')}<h2>${esc(title)}</h2>
    ${k === 'inicial' ? `<div class="score-big pass">${esc(R.est || 'Pré-N5')}</div><p class="muted" style="margin:0">nível de partida estimado</p>` : `<div class="score-big ${P.pass ? 'pass' : 'fail'}">${R.pct}%</div>`}
    <p class="muted tabnum" style="margin:0">${P.correct} de ${P.graded} respostas certas</p><p style="margin:0">${esc(msg)}</p>
    ${g ? `<div class="reward-row"><div class="reward"><b>+${g.xp}</b><span>XP</span></div><div class="reward"><b>+${g.coins}</b><span>moedas</span></div></div>` : '<p class="muted" style="margin:0;font-size:.85rem">Avaliações não dão XP por pergunta: elas medem, não treinam.</p>'}</div>
    ${lvRows ? `<section class="section"><h2 style="font-size:1.05rem">Por nível</h2><div class="card list">${lvRows}</div></section>` : ''}
    ${byRows ? `<section class="section"><h2 style="font-size:1.05rem">Por habilidade</h2><div class="card list">${byRows}</div></section>` : ''}${errs}`;
  const foot = `<button class="btn btn-gold btn-block" data-act="lnAfterAssess">Ver meu progresso</button><button class="btn btn-ghost btn-block" data-act="pExit">Fechar</button>`;
  return playerShell(1, body, foot);
}

/* ==========================================================
   PRÁTICA DE FALA (ouvir, repetir, conferir) — opcional, nunca entra no domínio
   O reconhecimento de voz do navegador só aparece quando existe; a autoavaliação funciona sempre.
   ========================================================== */
const LN_SR = (() => { try { return window.SpeechRecognition || window.webkitSpeechRecognition || null; } catch (e) { return null; } })();
function lnSpeakPool() {
  return lnUnits().filter(u => u.rep && u.a > 0).map(u => ITEM[u.rep]).filter(it => it && lnCanHear(it) && (groupOf(it) === 'frase' || groupOf(it) === 'expressao' || (it.lesson && (it.lesson.kind === 'grammar' || it.lesson.id === 'chat'))) && String(sayOf(it)).length >= 3 && String(sayOf(it)).length <= 26);
}
function lnStartSpeak() {
  const pool = lnSpeakPool();
  if (pool.length < 3) { toast('声', 'Estude algumas frases primeiro (Academia ou Listening) para praticar a fala.'); return; }
  closeModal();
  P = { kind: 'speak', phase: 'speak', cards: shuffle(pool).slice(0, 6), i: 0, show: false, res: [], heard: null, listening: false, startedAt: Date.now() };
  sessionGain = { xp: 0, coins: 0 };
  openPlayer(); renderPlayer();
}
const lnKanaNorm = s => KANA.kata2hira(String(s || '').replace(/[\s　。、！？!?.,…・「」『』（）()〜~ー]/g, ''));
function lnSimilar(a, b) {
  a = lnKanaNorm(a); b = lnKanaNorm(b); if (!a || !b) return 0;
  const m = a.length, n = b.length, dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n] / Math.max(m, n);
}
function lnSpeakHTML() {
  const it = P.cards[P.i];
  if (!it) {
    const good = P.res.filter(x => x).length;
    const body = `<div class="result-hero">${mascot('happy', 120, 'hop')}<h2>Prática concluída!</h2><p style="margin:0">Você repetiu ${P.res.length} frase${P.res.length === 1 ? '' : 's'} e marcou ${good} como “consegui”.</p><p class="muted" style="margin:0;font-size:.88rem">Repetir em voz alta, logo depois de ouvir (shadowing), treina o ouvido e a pronúncia ao mesmo tempo. Esta prática não muda o domínio das palavras: ela é um complemento.</p></div>`;
    return playerShell(1, body, `<button class="btn btn-gold btn-block" data-act="lnSpeakAgain">Praticar outras frases</button><button class="btn btn-ghost btn-block" data-act="pExit">Fechar</button>`);
  }
  const sim = P.heard != null ? Math.max(lnSimilar(P.heard, it.jp), lnSimilar(P.heard, sayOf(it))) : null;
  const fb = P.heard != null ? `<div class="ln-heard ${sim >= .8 ? 'ok' : sim >= .5 ? 'mid' : 'bad'}"><span class="muted" style="font-size:.8rem">O navegador entendeu</span><b class="jp">${esc(P.heard || '(nada)')}</b><span>${sim >= .8 ? 'Muito parecido com a frase!' : sim >= .5 ? 'Parecido. Ouça de novo e preste atenção no ritmo.' : 'Bem diferente. Ouça devagar e tente de novo.'}</span><small class="muted">Conferência automática experimental: sotaque, barulho e o próprio aparelho influenciam. Confie também no seu ouvido.</small></div>` : '';
  const body = `<div class="ln-speak">
    <span class="eyebrow">Ouvir e repetir · ${P.i + 1} de ${P.cards.length}</span>
    <p class="muted" style="margin:0">Ouça a frase, tente entender sem ler e repita em voz alta, no mesmo ritmo.</p>
    <div class="ln-speak-btns"><button class="btn btn-primary" data-act="lnSay" data-slow="0">${IC.sound} Ouvir</button><button class="btn btn-ghost" data-act="lnSay" data-slow="1">Devagar</button></div>
    ${P.show ? `<div class="card ln-speak-txt"><b class="jp">${esc(it.jp)}</b><span class="ro">${esc(it.ro || '')}</span><span>${esc(it.pt || '')}</span></div>` : `<button class="btn btn-ghost btn-block" data-act="lnSpeakShow">Mostrar a frase e a tradução</button>`}
    ${LN_SR ? `<button class="btn ${P.listening ? 'btn-gold' : 'btn-ghost'} btn-block" data-act="lnMic" ${P.listening ? 'disabled' : ''}>${P.listening ? 'Ouvindo… fale agora' : 'Falar e conferir (microfone)'}</button>` : `<p class="muted" style="margin:0;font-size:.82rem">Este navegador não oferece reconhecimento de voz. Repita em voz alta e avalie você mesmo.</p>`}
    ${fb}</div>`;
  const foot = `<div class="row-btns"><button class="btn btn-ghost" data-act="lnSpeakRate" data-ok="0">Preciso treinar</button><button class="btn btn-gold" data-act="lnSpeakRate" data-ok="1">Consegui</button></div>`;
  return playerShell(P.i / P.cards.length, body, foot, '', (P.i + 1) + '/' + P.cards.length);
}
function lnMic() {
  if (!LN_SR || !P || P.kind !== 'speak') return;
  let rec; try { rec = new LN_SR(); } catch (e) { toast('声', 'Não foi possível usar o microfone neste navegador.'); return; }
  rec.lang = 'ja-JP'; rec.interimResults = false; rec.maxAlternatives = 3;
  P.listening = true; renderPlayer();
  const done = txt => { if (!P || P.kind !== 'speak') return; P.listening = false; P.heard = txt; renderPlayer(); };
  rec.onresult = e => { const alts = [...(e.results[0] || [])].map(a => a.transcript); const it = P.cards[P.i]; const best = alts.sort((a, b) => lnSimilar(b, it.jp) - lnSimilar(a, it.jp))[0] || ''; done(best); };
  rec.onerror = e => { if (P) { P.listening = false; renderPlayer(); } toast('声', e && e.error === 'not-allowed' ? 'Permita o uso do microfone para conferir a fala.' : 'Não consegui ouvir. Tente de novo, perto do microfone.'); };
  rec.onend = () => { if (P && P.listening) { P.listening = false; renderPlayer(); } };
  try { rec.start(); } catch (e) { P.listening = false; renderPlayer(); }
}
const _lnRenderPlayer = renderPlayer;
renderPlayer = function () { if (P && P.kind === 'speak') { $('#player').innerHTML = lnSpeakHTML(); return; } return _lnRenderPlayer(); };

/* ==========================================================
   DICIONÁRIO: formas conjugadas, ligação com a gramática e o seu aprendizado
   ========================================================== */
const LN_FORMS = (() => {
  const R = []; // [terminação, base, rótulo, lição, classe]
  const ich = [['ませんでした', 'educada, negativa no passado', 'c13l2'], ['ました', 'educada, no passado', 'c13l2'], ['ません', 'educada, negativa', 'c13l2'], ['ましょう', 'educada, convite (“vamos…”)', 'c13l2'], ['ます', 'educada (forma ます)', 'c13l2'], ['なかった', 'negativa casual no passado', 'c13l6'], ['なければ', 'negativa condicional (“se não…”)', 'c16l18'], ['ないで', 'negativa (“sem…”, “não faça”)', 'c13l6'], ['ない', 'negativa casual (forma ない)', 'c8l2'], ['ています', 'em andamento ou estado (〜ています)', 'c13l4'], ['ている', 'em andamento ou estado (〜ている)', 'c13l4'], ['ていた', 'estava fazendo (〜ていた)', 'c13l4'], ['てください', 'pedido (“por favor, faça”)', 'c13l3'], ['てしまう', 'acabou fazendo (〜てしまう)', 'c16l5'], ['てみる', 'experimentar (〜てみる)', 'c16l4'], ['ておく', 'deixar preparado (〜ておく)', 'c16l4'], ['たことがある', 'experiência (“já fiz”)', 'c13l5'], ['たくない', 'não querer (〜たくない)', 'c6l3'], ['たかった', 'queria (〜たかった)', 'c6l3'], ['たい', 'querer fazer (〜たい)', 'c6l3'], ['たら', 'condicional (〜たら)', 'c16l6'], ['たり', 'listando ações (〜たり)', 'c13l12'], ['ながら', 'ao mesmo tempo (〜ながら)', 'c13l13'], ['させる', 'causativa (fazer fazer)', 'c16l10'], ['られる', 'potencial ou passiva (〜られる)', 'c13l7'], ['よう', 'volitiva (“vamos”, “vou”)', 'c13l8'], ['れば', 'condicional (〜ば)', 'c16l7'], ['て', 'forma て', 'c13l3'], ['た', 'passado casual (forma た)', 'c8l3'], ['ろ', 'imperativa (ordem)', 'c13l9']];
  ich.forEach(([e, l, ls]) => R.push([e, 'る', l, ls, 'v1']));
  const I = 'いきぎしちにびみり', U = 'うくぐすつぬぶむる', A = 'わかがさたなばまら', E = 'えけげせてねべめれ', O = 'おこごそとのぼもろ';
  [...I].forEach((c, i) => [['ませんでした', 'educada, negativa no passado', 'c13l2'], ['ました', 'educada, no passado', 'c13l2'], ['ません', 'educada, negativa', 'c13l2'], ['ましょう', 'educada, convite (“vamos…”)', 'c13l2'], ['ます', 'educada (forma ます)', 'c13l2'], ['たくない', 'não querer (〜たくない)', 'c6l3'], ['たかった', 'queria (〜たかった)', 'c6l3'], ['たい', 'querer fazer (〜たい)', 'c6l3'], ['ながら', 'ao mesmo tempo (〜ながら)', 'c13l13']].forEach(([e, l, ls]) => R.push([c + e, U[i], l, ls, 'v5'])));
  [...A].forEach((c, i) => [['なかった', 'negativa casual no passado', 'c13l6'], ['なければ', 'negativa condicional (“se não…”)', 'c16l18'], ['ないで', 'negativa (“sem…”, “não faça”)', 'c13l6'], ['ない', 'negativa casual (forma ない)', 'c8l2'], ['れる', 'passiva (〜れる)', 'c16l9'], ['せる', 'causativa (fazer fazer)', 'c16l10']].forEach(([e, l, ls]) => R.push([c + e, U[i], l, ls, 'v5'])));
  [...E].forEach((c, i) => { R.push([c + 'ば', U[i], 'condicional (〜ば)', 'c16l7', 'v5']); R.push([c + 'る', U[i], 'potencial (“consigo”)', 'c13l7', 'v5']); R.push([c + 'ます', U[i], 'potencial educada (“consigo”)', 'c13l7', 'v5']); R.push([c + 'ない', U[i], 'potencial negativa (“não consigo”)', 'c13l7', 'v5']); });
  [...O].forEach((c, i) => R.push([c + 'う', U[i], 'volitiva (“vamos”, “vou”)', 'c13l8', 'v5']));
  const te = [['って', ['う', 'つ', 'る', 'く']], ['いて', ['く']], ['いで', ['ぐ']], ['して', ['す']], ['んで', ['ぬ', 'ぶ', 'む']]];
  const teSuf = [['', 'forma て', 'c13l3'], ['いる', 'em andamento ou estado (〜ている)', 'c13l4'], ['います', 'em andamento ou estado (〜ています)', 'c13l4'], ['いた', 'estava fazendo (〜ていた)', 'c13l4'], ['ください', 'pedido (“por favor, faça”)', 'c13l3'], ['しまう', 'acabou fazendo (〜てしまう)', 'c16l5'], ['みる', 'experimentar (〜てみる)', 'c16l4'], ['も', '“mesmo que” (〜ても)', 'c13l3']];
  const taSuf = [['', 'passado casual (forma た)', 'c8l3'], ['ら', 'condicional (〜たら)', 'c16l6'], ['り', 'listando ações (〜たり)', 'c13l12'], ['ことがある', 'experiência (“já fiz”)', 'c13l5']];
  te.forEach(([t, bs]) => bs.forEach(b => {
    teSuf.forEach(([s, l, ls]) => R.push([t + s, b, l, ls, 'v5']));
    const ta = t.slice(0, -1) + (t.endsWith('で') ? 'だ' : 'た');
    taSuf.forEach(([s, l, ls]) => R.push([ta + s, b, l, ls, 'v5']));
  }));
  [['くなかった', 'negativa no passado'], ['くない', 'negativa'], ['かった', 'passado'], ['くて', 'forma て (ligando)'], ['ければ', 'condicional (“se for…”)'], ['くなる', 'ficar (〜くなる)'], ['すぎる', 'demais (〜すぎる)'], ['そう', 'parece (〜そう)'], ['く', 'advérbio (〜く)']].forEach(([e, l]) => R.push([e, 'い', 'adjetivo い: ' + l, /なる/.test(e) ? 'c14l4' : /すぎ/.test(e) ? 'c14l10' : /そう/.test(e) ? 'c14l9' : e === 'く' ? 'c14l5' : 'c14l1', 'adj']));
  [['しませんでした', 'educada, negativa no passado'], ['しました', 'educada, no passado'], ['しません', 'educada, negativa'], ['しましょう', 'educada, convite'], ['します', 'educada (forma ます)'], ['しなかった', 'negativa no passado'], ['しない', 'negativa casual'], ['している', 'em andamento (〜ている)'], ['しています', 'em andamento (〜ています)'], ['したい', 'querer fazer'], ['した', 'passado casual'], ['して', 'forma て'], ['しよう', 'volitiva'], ['すれば', 'condicional'], ['できる', 'potencial (“consigo fazer”)'], ['できます', 'potencial educada']].forEach(([e, l]) => R.push([e, 'する', 'verbo する: ' + l, /ます|ませ|まし/.test(e) ? 'c13l2' : /ない|なかっ/.test(e) ? 'c13l6' : /でき/.test(e) ? 'c13l7' : 'c13l1', 'suru']));
  [['きませんでした', 'educada, negativa no passado'], ['きました', 'educada, no passado'], ['きません', 'educada, negativa'], ['きます', 'educada'], ['こなかった', 'negativa no passado'], ['こない', 'negativa casual'], ['きた', 'passado casual'], ['きて', 'forma て'], ['こよう', 'volitiva']].forEach(([e, l]) => { R.push([e, 'くる', 'verbo 来る: ' + l, 'c13l1', 'kuru']); R.push(['来' + e.slice(1), '来る', 'verbo 来る: ' + l, 'c13l1', 'kuru']); });
  R.push(['よくない', 'いい', 'adjetivo いい: negativa (よくない)', 'c14l1', 'adj'], ['よかった', 'いい', 'adjetivo いい: passado (よかった)', 'c14l1', 'adj']);
  return R.sort((a, b) => b[0].length - a[0].length);
})();
function lnDictHas(base) { const h = KANA.kata2hira(base); return DICT.list.filter(x => !x.particle && (x.kanji === base || x.kana === base || x.reading === h)); }
const LN_POS_OK = { v1: ['verbo', ''], v5: ['verbo', ''], adj: ['adj-i', ''], suru: ['verbo', 'subst', ''], kuru: ['verbo', ''] };
function lnDeinflect(q) {
  q = String(q || '').trim().replace(/[。！？!?\s]/g, '');
  if (!q || q.length < 2 || !/[぀-ゟ]$/.test(q)) return null;
  dictBuild();
  const self = lnDictHas(q); // se a própria forma é verbete (ex.: 行きます), a ficha dela continua primeiro
  for (const [end, base, label, lesson, cls] of LN_FORMS) {
    if (!q.endsWith(end) || q.length <= end.length - (cls === 'suru' || cls === 'kuru' ? 1 : 0)) continue;
    const stem = q.slice(0, q.length - end.length);
    if (!stem && cls !== 'kuru' && cls !== 'suru' && cls !== 'adj') continue;
    const cands = cls === 'suru' ? [stem + 'する', stem].filter(Boolean) : cls === 'kuru' ? [stem + base] : [stem + base];
    for (const c of cands) {
      if (!c || c.length < 2 && cls !== 'kuru') continue;
      const hits = lnDictHas(c).filter(e => (LN_POS_OK[cls] || ['']).includes(e.pos || '') && (cls !== 'adj' || /い$/.test(e.kana)) && (cls !== 'v1' || /[いきぎしじちにひびみりえけげせぜてねへべめれ]る$/.test(e.kana)));
      if (hits.length && !self.includes(hits[0])) return { q, base: c, e: hits[0], label, lesson, cls, viaNoun: cls === 'suru' && c === stem, isWord: self.length > 0 };
    }
  }
  return null;
}
const _lnDictSearch = dictSearch;
dictSearch = function (q) {
  const res = _lnDictSearch(q);
  const f = /[぀-ヿ一-鿿]/.test(String(q || '')) ? lnDeinflect(q) : null;
  if (!f) return res;
  if (f.isWord) return res.includes(f.e) ? res : res.concat([f.e]);
  return [f.e].concat(res.filter(e => e !== f.e));
};
const _lnDictList = dictListHTML;
dictListHTML = function () {
  const h = _lnDictList(), f = dictUI.q && /[぀-ヿ一-鿿]/.test(dictUI.q) ? lnDeinflect(dictUI.q) : null;
  if (!f) return h;
  const L = LESSON[f.lesson], passed = L && lessonPassed(L.id);
  const how = f.viaNoun ? f.base + ' + する (o substantivo vira verbo)' : f.base;
  return `<div class="card ln-form"><span class="eyebrow">Forma conjugada reconhecida</span><p style="margin:0"><b class="jp">${esc(f.q)}</b> vem de <button class="link-btn jp" data-act="dictOpen" data-k="${esc(f.e.key)}" style="font-weight:800">${esc(how)}</button> · ${esc(f.label)}.</p>${L ? `<p class="muted" style="margin:0;font-size:.82rem">${passed ? '✓ Você estudou esta forma em' : 'Esta forma é ensinada em'} <button class="link-btn" data-act="openLesson" data-id="${L.id}">${esc(L.cat.title)} · ${esc(L.title)}</button>.</p>` : ''}</div>` + h;
};
function lnLearnHTML(e) {
  const ids = [].concat(e.items || [], e.dictId || []).filter(id => ITEM[id]);
  if (!ids.length) return '';
  const u = lnUnitOf(ids[0]); if (!u || u.stage === 'novo') return `<section class="ln-dlearn"><span class="eyebrow">Seu aprendizado</span><p class="muted" style="margin:0;font-size:.85rem">Você ainda não estudou esta palavra.${e.srcs && e.srcs.length ? ' Ela aparece em ' + esc(e.srcs[0]) + '.' : ''}</p></section>`;
  const areas = Object.keys(LN_AREAS).filter(a => u.areas & LN_AREAS[a]).map(a => LN_AREA_NAME[a]);
  const r = u.rep && S.items[u.rep];
  const next = r && r.due && u.a ? (r.due <= Date.now() ? 'agora' : new Date(r.due).toLocaleDateString('pt-BR')) : '';
  return `<section class="ln-dlearn"><span class="eyebrow">Seu aprendizado</span><div class="ln-dl-row"><span class="ln-stage ${u.stage}">${esc(LN_STAGE_NAME[u.stage])}${lnRecovering(u) ? ' · recuperar' : ''}</span>${u.a ? `<span class="muted tabnum" style="font-size:.82rem">${u.c}/${u.a} acertos · ${u.okDays} dia${u.okDays === 1 ? '' : 's'} com acerto</span>` : ''}</div>${areas.length ? `<p class="muted" style="margin:0;font-size:.82rem">Encontrada em: ${esc(areas.join(', '))}</p>` : ''}${next ? `<p class="muted" style="margin:0;font-size:.82rem">Próxima revisão: ${esc(next)}</p>` : ''}</section>`;
}
const _lnDictEntry = dictEntryHTML;
dictEntryHTML = function (e) { const h = _lnDictEntry(e); const add = lnLearnHTML(e); return add ? h.replace('<div class="d-btns">', add + '<div class="d-btns">') : h; };

/* ==========================================================
   TELAS: Painel de Progresso (#progresso) e Avaliações (#avaliacoes)
   ========================================================== */
function lnStackBar(o) {
  const tot = o.apresentado + o.estudado + o.lembrado + o.dominado; if (!tot) return '<div class="ln-stack empty"></div>';
  const w = x => (x / tot * 100).toFixed(1);
  return `<div class="ln-stack" role="img" aria-label="${o.dominado} dominados, ${o.lembrado} lembrados, ${o.estudado} estudados, ${o.apresentado} apresentados"><i class="d" style="width:${w(o.dominado)}%"></i><i class="l" style="width:${w(o.lembrado)}%"></i><i class="e" style="width:${w(o.estudado)}%"></i><i class="a" style="width:${w(o.apresentado)}%"></i></div>`;
}
function viewProgress() {
  lnSnapshot();
  const sum = lnSummary(), A = sum.all, st = lnStrengths(sum), jl = lnJlpt(), wk = lnWeeks(8), recs = lnRecommend(4);
  const studied = A.estudado + A.lembrado + A.dominado, retain = studied ? Math.round((A.lembrado + A.dominado) / studied * 100) : 0;
  const accAll = A.a ? Math.round(A.c / A.a * 100) : null;
  const domRows = LN_DOMS.map(([d, n, ic]) => {
    const o = sum.dom[d], acc = lnAcc(o), seen = o.apresentado + o.estudado + o.lembrado + o.dominado;
    if (!seen && !o.recA) return `<div class="ln-dom off"><span class="ln-dom-ic jp">${ic}</span><div class="grow"><b>${esc(n)}</b><span class="muted" style="display:block;font-size:.78rem">Ainda não estudado · ${o.total} conteúdos no app</span></div></div>`;
    return `<button class="ln-dom" data-act="startReview" data-mode="smart:${d === 'leitura' ? 'leitura' : d}" aria-label="Revisar ${esc(n)}"><span class="ln-dom-ic jp">${ic}</span><div class="grow" style="min-width:0"><div class="ln-dom-h"><b>${esc(n)}</b><span class="muted tabnum">${acc ? acc.p + '% de acertos' : 'poucos dados'}</span></div>${lnStackBar(o)}<span class="ln-dom-s tabnum">${o.dominado} dominados · ${o.lembrado} lembrados · ${o.estudado} estudados${o.apresentado ? ' · ' + o.apresentado + ' apresentados' : ''}${o.review ? ' · <b>' + o.review + ' para revisar</b>' : ''}</span><span class="ln-dom-s muted tabnum">${seen} de ${o.total} conteúdos do app</span></div></button>`;
  }).join('');
  const maxA = Math.max(1, ...wk.map(w => w.a));
  const weekBars = wk.map(w => `<div class="ln-wk" title="${w.a} respostas"><span class="ln-wk-p tabnum">${w.p != null ? w.p + '%' : '–'}</span><i style="height:${w.p != null ? Math.max(6, w.p) : 2}%" class="${w.p == null ? 'zero' : w.p >= 80 ? 'hi' : w.p >= 60 ? '' : 'lo'}"></i><span class="ln-wk-n tabnum">${w.a}</span><span class="ln-wk-l">${esc(w.label)}</span></div>`).join('');
  void maxA;
  const snaps = Object.keys(lnState().snaps).sort().slice(-10).map(d => { const s = lnState().snaps[d]; let r = 0, m = 0; LN_DOMS.forEach(([k]) => { if (s[k]) { r += s[k][1]; m += s[k][2]; } }); return { d, r, m }; });
  const maxS = Math.max(1, ...snaps.map(s => s.r + s.m));
  const evo = snaps.length >= 2 ? `<div class="card"><span class="eyebrow">Evolução · conteúdos lembrados e dominados</span><div class="ln-evo">${snaps.map(s => `<div class="ln-evo-c" title="${s.d}: ${s.m} dominados, ${s.r} lembrados"><i class="l" style="height:${(s.r / maxS * 100).toFixed(1)}%"></i><i class="d" style="height:${(s.m / maxS * 100).toFixed(1)}%"></i><span>${+s.d.slice(8)}/${+s.d.slice(5, 7)}</span></div>`).join('')}</div><p class="muted" style="margin:6px 0 0;font-size:.8rem">Uma foto por dia de estudo. Esquecer algo faz a barra oscilar, e isso é normal: a revisão traz de volta.</p></div>` : `<div class="card"><span class="eyebrow">Evolução</span><p class="muted" style="margin:4px 0 0;font-size:.85rem">A partir de hoje o app guarda uma foto do seu conhecimento por dia de estudo. Volte amanhã para ver a evolução.</p></div>`;
  const hard = lnHardUnits(5);
  const jlRows = jl.rows.map(r => `<div class="ln-jl"><b>${r.lv}</b><div class="bar light"><i style="width:${r.pct}%"></i></div><span class="muted tabnum">${r.pct}%</span></div>`).join('');
  const pl = lnState().placement;
  return `<div class="wrap ln-prog">
    <div class="page-title"><div><span class="jp">せいちょう</span><h1>Seu progresso</h1></div><button class="btn btn-ghost btn-small" data-act="nav" data-view="avaliacoes">Avaliações</button></div>
    <div class="card ln-hero"><div class="ln-ring" style="--p:${retain}"><b class="tabnum">${retain}%</b><span>retenção</span></div><div class="grow" style="min-width:0"><b>Conhecimento geral</b><p class="muted" style="margin:2px 0 0;font-size:.84rem">Dos ${studied} conteúdos que você já praticou, você lembra de ${A.lembrado + A.dominado} em dias diferentes${A.dominado ? ' (' + A.dominado + ' deles já dominados)' : ''}.${accAll != null ? ' Acertos no total: ' + accAll + '%.' : ''}</p>${jl.est ? `<span class="ln-lvpill">Nível estimado: ${jl.est}</span>` : `<span class="ln-lvpill soft">Rumo ao N5 · ${jl.rows[0].pct}%</span>`}</div></div>
    <div class="kpis kpis4 ln-kpis"><div class="kpi"><b>${studied}</b><span>estudados</span></div><div class="kpi"><b>${A.lembrado}</b><span>lembrados</span></div><div class="kpi"><b>${A.dominado}</b><span>dominados</span></div><div class="kpi"><b>${A.review}</b><span>para revisar</span></div></div>
    <p class="muted ln-note">XP, lições concluídas e tempo de uso <b>não</b> entram nestes números. Só contam respostas: <b>estudado</b> = já respondeu; <b>lembrado</b> = acertou em 2 dias diferentes; <b>dominado</b> = acertou em 3 dias ou mais, com intervalos crescentes e sem erro recente.</p>
    ${recs.length ? `<section class="section"><h2 class="ln-h2">Recomendações para agora</h2><div class="ln-recs">${recs.map((r, i) => lnRecHTML(r, i === 0)).join('')}</div></section>` : ''}
    <section class="section"><h2 class="ln-h2">Por habilidade</h2><div class="ln-legend"><span><i class="d"></i>dominado</span><span><i class="l"></i>lembrado</span><span><i class="e"></i>estudado</span><span><i class="a"></i>apresentado</span></div><div class="card ln-doms">${domRows}</div><p class="muted ln-note">Toque numa habilidade para uma revisão focada nela.</p></section>
    ${st.strong.length || st.weak.length ? `<section class="section"><div class="ln-two">${st.strong.length ? `<div class="card ln-sw good"><span class="eyebrow">Pontos fortes</span>${st.strong.map(x => `<p><b>${esc(x.n)}</b> <span class="muted tabnum">${x.acc.p}%</span></p>`).join('')}</div>` : ''}${st.weak.length ? `<div class="card ln-sw weak"><span class="eyebrow">Principais dificuldades</span>${st.weak.map(x => `<p><b>${esc(x.n)}</b> <span class="muted tabnum">${x.acc.p}%</span></p>`).join('')}</div>` : ''}</div></section>` : ''}
    ${hard.length ? `<section class="section"><h2 class="ln-h2">Conteúdos que mais custam</h2><div class="card list">${hard.map(u => { const it = ITEM[u.rep]; return `<div class="row"><div class="grow" style="min-width:0"><div class="jpw">${esc(it.jp)}</div><div class="muted" style="font-size:.82rem">${esc(it.ro || '')} · ${esc(it.pt || '')}</div></div><span class="chip ${u.lastOk === false ? 'revisar' : 'aprendendo'} tabnum">${u.c}/${u.a}</span></div>`; }).join('')}<button class="btn btn-ghost btn-small" style="margin-top:8px" data-act="startReview" data-mode="smart:erros">Treinar estes conteúdos</button></div></section>` : ''}
    <section class="section"><h2 class="ln-h2">Histórico de desempenho</h2><div class="card"><span class="eyebrow">Taxa de acertos por semana · respostas</span><div class="ln-weeks">${weekBars}</div></div>${evo}</section>
    <section class="section"><h2 class="ln-h2">Estimativa de nível (inspirada no JLPT)</h2><div class="card">${jlRows}<p class="muted" style="margin:8px 0 0;font-size:.8rem">Mede quanto do conteúdo de cada nível que existe no app você lembra ou domina (50% marca o nível). <b>Não é uma certificação oficial do JLPT</b> e não substitui o exame.${pl ? ' Avaliação inicial: ' + esc(pl.est || 'pré-N5') + ' em ' + new Date(pl.t).toLocaleDateString('pt-BR') + '.' : ''}</p></div></section>
    <button class="btn btn-gold btn-block" data-act="startReview" data-mode="smart">Fazer uma revisão inteligente</button>
  </div>`;
}
function viewAssess() {
  const L = lnState(), hist = L.assess.slice().reverse().slice(0, 12);
  const card = (k, name, ic, sub, extra = '') => { const av = k === 'inicial' || k.startsWith('etapa:') ? { ok: true } : lnTestAvail(k); const last = L.assess.filter(a => a.k === k).slice(-1)[0]; return `<button class="ln-test ${av.ok ? '' : 'off'}" data-act="lnAssess" data-k="${k}" ${extra}><span class="ln-test-ic jp">${ic}</span><span class="grow" style="min-width:0;text-align:left"><b>${esc(name)}</b><small>${esc(av.ok ? sub : av.why)}</small>${last ? `<small class="tabnum">Último: ${k === 'inicial' ? esc(last.est || 'pré-N5') : last.pct + '%'} · ${new Date(last.t).toLocaleDateString('pt-BR')}</small>` : ''}</span></button>`; };
  const stages = STAGES.map(st => { const cs = lnStageCats(st.id), done = cs.filter(c => catPassed(c.id)).length, ready = cs.length && done === cs.length, r = L.stageEx[st.id]; return `<button class="ln-test ${ready ? '' : 'off'}" data-act="lnAssess" data-k="etapa:${st.id}"><span class="ln-test-ic jp">${r && r.passed ? '✓' : '試'}</span><span class="grow" style="min-width:0;text-align:left"><b>${esc(st.name)}</b><small>${ready ? (r && r.passed ? 'Aprovada · melhor nota ' + r.best + '%' : 'Pronta para fazer · 20 perguntas, mínimo ' + PASS + '%') : done + ' de ' + cs.length + ' alas concluídas'}</small></span></button>`; }).join('');
  return `<div class="wrap ln-assess">
    <div class="page-title"><div><span class="jp">しけん</span><h1>Avaliações</h1></div><button class="btn btn-ghost btn-small" data-act="nav" data-view="progresso">Progresso</button></div>
    <p class="muted" style="margin:0;font-size:.88rem">As avaliações só cobram o que você já estudou (a inicial é a exceção: ela serve para descobrir o que você já sabe e não mexe no seu progresso). Não dão XP por pergunta.</p>
    <section class="section"><h2 class="ln-h2">Ponto de partida</h2><div class="ln-tests">${card('inicial', 'Avaliação inicial', '測', 'Adaptativa: começa no N5 e sobe enquanto você acerta. Cerca de 5 minutos.')}</div></section>
    <section class="section"><h2 class="ln-h2">Por área</h2><div class="ln-tests">${LN_TESTS.map(([k, n, ic]) => card(k, k === 'cumulativa' ? 'Avaliação cumulativa' : n, ic, k === 'cumulativa' ? '20 perguntas de tudo o que você estudou.' : '12 perguntas do que você já estudou nesta área.')).join('')}</div></section>
    <section class="section"><h2 class="ln-h2">Provas de conclusão de etapa</h2><div class="ln-tests">${stages}</div></section>
    <section class="section"><h2 class="ln-h2">Histórico</h2><div class="card list">${hist.length ? hist.map(a => `<div class="row"><div class="grow" style="min-width:0"><b>${esc(lnAssessName(a.k))}</b><div class="muted" style="font-size:.8rem">${new Date(a.t).toLocaleDateString('pt-BR')} · ${a.n} perguntas</div></div><span class="chip ${a.k === 'inicial' ? 'aprendendo' : a.pct >= 80 ? 'dominada' : a.pct >= 60 ? 'aprendendo' : 'revisar'} tabnum">${a.k === 'inicial' ? esc(a.est || 'pré-N5') : a.pct + '%'}</span></div>`).join('') : '<p class="muted" style="margin:0">Nenhuma avaliação feita ainda.</p>'}</div></section>
    <p class="muted ln-note">A estimativa de nível usa o JLPT só como referência de dificuldade. O Nihongo Quest não emite certificação.</p>
  </div>`;
}
VIEWS.push('progresso', 'avaliacoes');
const _lnRender = render;
render = function () {
  if ((view === 'progresso' || view === 'avaliacoes') && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = view === 'progresso' ? viewProgress() : viewAssess();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'revisao'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _lnRender();
};

/* ---------- integrações nas telas existentes ---------- */
/* Início: “Seu professor” no lugar do aviso simples de revisão */
function lnTeacherHTML() {
  const recs = lnRecommend(5).filter(r => r.k !== 'lesson' && r.k !== 'exam').slice(0, 3); if (!recs.length) return ''; // a próxima lição já está no cartão acima
  const sum = lnSummary().all, studied = sum.estudado + sum.lembrado + sum.dominado;
  return `<section class="section ln-teacher"><div class="section-h"><h2>Seu professor</h2><button class="link-btn" data-act="nav" data-view="progresso">Ver progresso</button></div>
    <div class="ln-recs">${recs.map((r, i) => lnRecHTML(r, i === 0)).join('')}</div>
    ${studied ? `<p class="muted ln-mini tabnum">${studied} estudados · ${sum.lembrado} lembrados · ${sum.dominado} dominados${sum.review ? ' · ' + sum.review + ' para revisar' : ''}</p>` : ''}</section>`;
}
const _lnHome = viewHome;
viewHome = function () {
  let h = _lnHome();
  const t = lnTeacherHTML(); if (!t) return h;
  const mark = '<span class="mod-ic big jp" style="font-weight:800">復</span>', i = h.indexOf(mark);
  if (i > 0) { const a = h.lastIndexOf('<section class="section">', i), b = h.indexOf('</section>', i) + 10; if (a >= 0 && b > 10) return h.slice(0, a) + t + h.slice(b); }
  const j = h.indexOf('</section>', h.indexOf('<div class="wrap">')); return j > 0 ? h.slice(0, j + 10) + t + h.slice(j + 10) : h;
};
/* Revisão: a Revisão inteligente vem primeiro (as revisões de sempre continuam abaixo) */
const _lnReview = viewReview;
viewReview = function () {
  const h = _lnReview();
  if (!seenItems().length) return h;
  const due = dueItems().length, errs = lnRecent(7).length;
  const chips = LN_FOCUS.slice(1).map(([k, n]) => `<button class="ln-chip" data-act="startReview" data-mode="smart:${k}">${esc(n)}</button>`).join('');
  const card = `<section class="section ln-smart"><div class="card stack"><div class="ln-smart-h"><span class="ln-rec-ic jp">賢</span><div class="grow" style="min-width:0"><b>Revisão inteligente</b><p class="muted" style="margin:2px 0 0;font-size:.84rem">${due ? due + ' na hora certa' : 'Nada atrasado'}${errs ? ' · ' + errs + ' erro' + (errs > 1 ? 's' : '') + ' recente' + (errs > 1 ? 's' : '') : ''}. Mistura habilidades, varia o formato e prioriza o que você está esquecendo.</p></div></div>
    <button class="btn btn-gold btn-block" data-act="startReview" data-mode="smart">Começar revisão inteligente</button>
    <div class="ln-chips" aria-label="Revisão focada">${chips}</div>
    <div class="row-btns"><button class="btn btn-ghost btn-small" data-act="nav" data-view="progresso">Meu progresso</button><button class="btn btn-ghost btn-small" data-act="nav" data-view="avaliacoes">Avaliações</button></div></div></section>`;
  return h.replace('<div class="kpis kpis4">', card + '<div class="kpis kpis4">');
};
/* Academia: domínio real de cada ala (além das lições aprovadas) */
const _lnAcademy = viewAcademy;
viewAcademy = function () {
  let h = _lnAcademy();
  const M = lnUnitMap(), byKey = {}; lnUnits().forEach(u => { byKey[u.key] = u; });
  CATS.forEach(c => {
    if (!catUnlocked(c) || !catHasContent(c)) return;
    const keys = new Set(); c.lessons.forEach(L => L.items.forEach(it => { if (M.of[it.id]) keys.add(M.of[it.id]); }));
    let st = 0, ok = 0; keys.forEach(k => { const u = byKey[k]; if (u && u.a) { st++; if (u.stage === 'lembrado' || u.stage === 'dominado') ok++; } });
    if (!st) return;
    const tag = `<p class="ln-wing tabnum">Domínio real: ${ok} de ${keys.size} itens lembrados ou dominados</p>`;
    const anchor = `<section class="wing" id="wing-${c.id}">`, i = h.indexOf(anchor); if (i < 0) return;
    const j = h.indexOf('</button>', i); if (j < 0) return;
    h = h.slice(0, j + 9) + tag + h.slice(j + 9);
  });
  return h;
};
/* Início: atalho “Progresso” no bloco Sua jornada */
const _lnTiles = nqJourneyTiles;
nqJourneyTiles = function () { return _lnTiles() + `<button class="nq-tile" data-act="nav" data-view="progresso"><span class="nq-ic jp">績</span><span class="nq-tn">Progresso</span><span class="nq-ts">ver painel</span></button>`; };
/* Perfil: atalho para o painel */
const _lnProfile = viewProfile;
viewProfile = function () { return _lnProfile().replace('<section class="section"><h2 style="font-size:1.1rem">Academia tradicional</h2>', `<section class="section"><button class="row row-btn card ln-prow" data-act="nav" data-view="progresso"><span class="mod-ic big jp" style="font-size:1.2rem">績</span><div class="grow" style="text-align:left;min-width:0"><b>Painel de progresso</b><div class="muted" style="font-size:.82rem">Domínio real por habilidade, recomendações e avaliações</div></div><span aria-hidden="true">›</span></button></section><section class="section"><h2 style="font-size:1.1rem">Academia tradicional</h2>`); };

Object.assign(ACT, {
  lnAssess: el => lnStartAssess(el.dataset.k),
  lnAfterAssess: () => { closePlayer(); go('progresso'); },
  lnSpeak: () => lnStartSpeak(),
  lnSpeakAgain: () => { closePlayer(); lnStartSpeak(); },
  lnSay: el => { const it = P && P.cards && P.cards[P.i]; if (it) speak(sayOf(it), el.dataset.slow === '1' ? { rate: 0.6 } : {}); },
  lnSpeakShow: () => { P.show = true; renderPlayer(); },
  lnMic: () => lnMic(),
  lnSpeakRate: el => { const it = P.cards[P.i]; if (!it) return; const ok = el.dataset.ok === '1'; P.res.push(ok); const L = lnState(); L.speak.n = (L.speak.n || 0) + 1; if (ok) L.speak.ok = (L.speak.ok || 0) + 1; lnExpose(it.id, 'fala'); touchStudy(); save(); P.i++; P.show = false; P.heard = null; renderPlayer(); },
  lnOpenLA: () => { S.settings.academyMode = 'la'; go('academia'); },
  lnWorld: el => { go('mundo'); setTimeout(() => { try { wStart(el.dataset.id); } catch (e) {} }, 60); }
});
/* o botão de fechar da prática de fala não precisa de confirmação */
const _lnPClose = ACT.pClose;
ACT.pClose = el => { if (P && P.kind === 'speak') return closePlayer(); return _lnPClose(el); };

/* ---------- início: histórico curto a partir do histórico já salvo (uma vez) ---------- */
function lnBackfill() {
  const L = lnState(); if (L.bf) return;
  (S.history || []).forEach(h => {
    if (!h || !h.t) return;
    const it = h.id && ITEM[h.id];
    if (it) { const a = L.h[h.id] || (L.h[h.id] = []); a.push(lnDayNum(h.t) * 2 + (h.ok ? 1 : 0)); if (a.length > 8) a.splice(0, a.length - 8); const ar = lnAreaOfCtx(h.ctx) || lnAreaOfItem(it); if (ar) L.x[h.id] = (L.x[h.id] | 0) | LN_AREAS[ar]; }
  });
  Object.keys(S.items).forEach(id => { const it = ITEM[id], r = S.items[id]; if (it && r && r.seen) { const ar = lnAreaOfItem(it); if (ar) L.x[id] = (L.x[id] | 0) | LN_AREAS[ar]; } });
  L.bf = 1; lnBump(); save();
}
setTimeout(() => { try { lnBackfill(); if (S.profile.onboarded) { lnSnapshot(); save(); } } catch (e) {} }, 300);
