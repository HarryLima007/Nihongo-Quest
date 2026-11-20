/* ==========================================================
   NIHONGO CHAT 5.0 — interface (lista de conversas no estilo
   aplicativo de mensagens, conversa com indicador de digitação,
   figurinhas e emojis, desafios separados da conversa livre)
   ========================================================== */
IC.bulb = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>';
IC.send = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2-7z"/></svg>';
IC.back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
IC.hist = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
IC.ear = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 10a2 2 0 0 1 4 0"/></svg>';
IC.smile = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="3"/></svg>';
IC.flag = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>';

/* ---------- retratos originais (SVG) ---------- */
function chPortrait(id, size = 56) {
  const face = '<ellipse cx="50" cy="54" rx="21" ry="24" fill="#ffe2cc"/><ellipse cx="41" cy="56" rx="2.6" ry="3.4" fill="#2a2560"/><ellipse cx="59" cy="56" rx="2.6" ry="3.4" fill="#2a2560"/><ellipse cx="37" cy="63" rx="4" ry="2.2" fill="#ff9fb5" opacity=".55"/><ellipse cx="63" cy="63" rx="4" ry="2.2" fill="#ff9fb5" opacity=".55"/>';
  const P = {
    ren: { bg: '#3553d1', body: '#ffd877', parts: face + '<path d="M44 68q6 5 12 0" stroke="#7a3b3b" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M27 52c-2-18 10-28 23-28s26 8 23 28l-5-10-4 7-5-11-4 9-6-10-4 10-5-8z" fill="#22224a"/><path d="M25 50a25 25 0 0 1 50 0" stroke="#f2b632" stroke-width="4" fill="none"/><rect x="21" y="48" width="9" height="15" rx="4" fill="#f2b632"/><rect x="70" y="48" width="9" height="15" rx="4" fill="#f2b632"/>' },
    aiko: { bg: '#6c43dd', body: '#ffffff', parts: '<path d="M27 58c-4-22 6-34 23-34s27 12 23 34l-2 22H29z" fill="#4a2a1a"/>' + face + '<path d="M45 68q5 3 10 0" stroke="#7a3b3b" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="9" fill="#4a2a1a"/><path d="M29 48c4-14 34-16 42 0-8-6-30-8-42 0z" fill="#4a2a1a"/><circle cx="41" cy="56" r="6" fill="none" stroke="#2a2560" stroke-width="1.8"/><circle cx="59" cy="56" r="6" fill="none" stroke="#2a2560" stroke-width="1.8"/><path d="M47 56h6" stroke="#2a2560" stroke-width="1.8"/><path d="M57 18l6-6" stroke="#f2b632" stroke-width="2.4" stroke-linecap="round"/>' },
    yumi: { bg: '#d0517a', body: '#9be1d3', parts: '<path d="M22 46c-8 6-8 26 2 34 4-10 4-22 6-30z" fill="#a8693a"/><path d="M78 46c8 6 8 26-2 34-4-10-4-22-6-30z" fill="#a8693a"/>' + face + '<path d="M44 67q6 6 12 0z" fill="#d8476a"/><path d="M28 52c-2-18 9-28 22-28s25 10 22 28c-6-10-14-14-22-14s-16 4-22 14z" fill="#a8693a"/><path d="M66 32l2.2 4.4 4.8.6-3.5 3.3.9 4.7-4.4-2.3-4.4 2.3.9-4.7-3.5-3.3 4.8-.6z" fill="#ffd877"/>' },
    takeshi: { bg: '#1f9461', body: '#2f6fb0', parts: face + '<path d="M44 70q6 3 12 0" stroke="#7a3b3b" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M43 65q7-3 14 0" stroke="#3b2a20" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M29 46c0-14 9-20 21-20s21 6 21 20c-6-6-14-8-21-8s-15 2-21 8z" fill="#3b2a20"/><path d="M28 42q22-8 44 0v6q-22-8-44 0z" fill="#ffffff" stroke="#d6dbe8" stroke-width="1"/><path d="M71 44l9 3-8 4" fill="#ffffff" stroke="#d6dbe8" stroke-width="1"/>' }
  }[id];
  if (!P) return '';
  return `<svg class="ch-portrait" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="Retrato de ${esc((chChar(id) || {}).name || '')}"><circle cx="50" cy="50" r="50" fill="${P.bg}"/><path d="M18 100q2-22 32-24 30 2 32 24z" fill="${P.body}"/>${P.parts}</svg>`;
}

/* ---------- estado da tela ---------- */
const chUI = { sub: 'hub', char: null, histTab: 'msgs', vocabF: 'todas', stkTab: null };
const REG_SHORT = { c: 'casual', n: 'neutro', p: 'educado', k: 'keigo' };
const VOCAB_LABEL = { nova: 'Nova', vista: 'Apresentada', aprendendo: 'Compreendida', dominada: 'Dominada', revisar: 'Revisar' };
const CH_EMOJIS = ['😂', '😊', '😆', '😍', '🥰', '😮', '😢', '😭', '🤔', '😅', '😳', '😴', '👍', '👌', '🙏', '👋', '🎉', '✨', '❤️', '💪', '🍜', '🍙', '🎮', '🎤', '🐱', '☕'];
function chStkState() { const k = S.chat.stk || (S.chat.stk = { fav: [], recent: [] }); if (!Array.isArray(k.fav)) k.fav = []; if (!Array.isArray(k.recent)) k.recent = []; return k; }
function chLastMsg(cid) { return [...chThread(cid)].reverse().find(m => m.from === 'char' || m.from === 'me'); }
function chMsgPreview(m) {
  if (!m) return '';
  if (m.from === 'me') return 'Você: ' + (m.txt || '') + (m.stk ? (m.txt ? ' ' : '') + '[figurinha]' : '');
  return m.stk ? '[figurinha] ' + ((CH_STK[m.stk] || {}).jp || '') : (m.jp || '');
}
function chWhen(t) { if (!t) return ''; const d = new Date(t), now = new Date(); return d.toDateString() === now.toDateString() ? d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }); }

function chNotifyUnlocks() {
  CHAT_CHARS.forEach(c => { const st = chState(c.id); if (chUnlocked(c) && !st.unlockSeen) { st.unlockSeen = true; if (c.id !== 'ren') toast('話', 'Novo personagem no Nihongo Chat: ' + c.name + '!'); } });
}
function chChalScenes(cid) { const c = chChar(cid); return CHAT_SCENES.filter(sc => sc.char === cid && (sc.intro || chSceneOpen(sc))); }
function viewChat() {
  chNotifyUnlocks();
  chInitiative();
  if (chUI.sub === 'hist' && chUI.char) return viewChatHistory(chUI.char);
  if (chUI.sub === 'vocab') return viewChatVocab();
  const rows = CHAT_CHARS.map(chConvRow).join('');
  const goals = CHAT_CHALLENGES.map(ch => { const done = S.chat.challenges[ch.id]; const c = chChar(ch.char); const lk = !chUnlocked(c); return `<div class="row chal ${done ? 'done' : ''} ${lk ? 'locked' : ''}"><span class="chal-ic">${done ? '✓' : lk ? IC.lock.replace('width="22" height="22"', 'width="16" height="16"') : '挑'}</span><span class="grow"><b>${esc(ch.title)}</b><span class="muted" style="display:block;font-size:.85rem">${esc(c.name)} · ${esc(ch.desc)}</span></span><span class="chip ${done ? 'dominada' : 'nova'} tabnum">${done ? 'Feito' : '+' + ch.xp + ' XP'}</span></div>`; }).join('');
  const chal = CHAT_CHARS.filter(chUnlocked).map(c => { const list = chChalScenes(c.id), done = list.filter(sc => S.chat.scenes[sc.id] && S.chat.scenes[sc.id].n).length, locked = chLockedScenes(c.id).length; return `<div class="row"><span class="ch-av">${chPortrait(c.id, 36)}</span><span class="grow"><b>${esc(c.name)}</b><span class="muted tabnum" style="display:block;font-size:.83rem">${list.length} disponíve${list.length === 1 ? 'l' : 'is'} · ${done} concluído${done === 1 ? '' : 's'}${locked ? ' · +' + locked + ' com a Academia' : ''}</span></span><button class="btn btn-ghost btn-small" data-act="chatChalOpen" data-id="${c.id}">Ver</button></div>`; }).join('');
  const chatIds = CHAT_PACK.items.map(it => it.id), cnt = { vista: 0, aprendendo: 0, dominada: 0, revisar: 0 };
  chatIds.forEach(id => { const s = itemStatus(id); if (cnt[s] != null) cnt[s]++; });
  const seen = cnt.vista + cnt.aprendendo + cnt.dominada + cnt.revisar;
  const set = S.chat.settings;
  return `<div class="wrap">
    <div class="page-title"><div><span class="jp">にほんごチャット</span><h1>Nihongo Chat</h1></div></div>
    <p class="muted" style="margin:0 0 10px">Converse em japonês com amigos, uma professora e conhecidos. Na conversa livre não tem prova: escreva do seu jeito. Os <b>desafios</b> ficam separados, com objetivo, correção e XP.</p>
    <section class="section"><div class="section-h"><h2>Conversas</h2><span class="muted tabnum" style="font-size:.85rem">${CHAT_CHARS.filter(chUnlocked).length}/${CHAT_CHARS.length} liberados</span></div><div class="card list conv-list">${rows}</div></section>
    <section class="section"><div class="section-h"><h2>Desafios</h2></div><p class="muted" style="margin:0 0 8px;font-size:.88rem">Situações guiadas: você sabe o objetivo, recebe correções e ganha XP. Usam só o que você já estudou (o que é novo aparece explicado antes).</p><div class="card list">${chal}</div></section>
    <section class="section"><div class="section-h"><h2>Metas dos desafios</h2><span class="muted tabnum" style="font-size:.85rem">${Object.keys(S.chat.challenges).length}/${CHAT_CHALLENGES.length}</span></div><div class="card list chal-list">${goals}</div></section>
    <section class="section"><div class="section-h"><h2>Expressões do chat</h2></div>
      <div class="card"><div class="stats-grid" style="margin:0"><div class="kpi"><b class="tabnum">${cnt.vista}</b><span>apresentadas</span></div><div class="kpi"><b class="tabnum">${cnt.aprendendo + cnt.revisar}</b><span>compreendidas</span></div><div class="kpi"><b class="tabnum">${cnt.dominada}</b><span>dominadas</span></div></div>
      <p class="muted" style="margin:10px 0 0;font-size:.85rem">Expressões novas aparecem marcadas na conversa e em algumas figurinhas. Apresentada: você viu. Compreendida: você usou. Dominada: usou certo em 3 dias diferentes. Elas entram na Revisão e no Caderno.</p>
      <div class="row-btns" style="margin-top:10px"><button class="btn btn-ghost btn-small" data-act="chatVocab">Ver expressões</button>${seen ? '<button class="btn btn-primary btn-small" data-act="startReview" data-mode="chat">Revisar expressões</button>' : ''}</div></div></section>
    <section class="section"><details class="card"><summary><b>Configurações do chat</b></summary>
      <div class="row" style="margin-top:8px"><span class="grow"><b>Respostas imediatas</b><span class="muted" style="display:block;font-size:.85rem">Desliga o tempo de digitação dos personagens.</span></span><button class="toggle ${set.instant ? 'on' : ''}" role="switch" aria-checked="${!!set.instant}" data-act="chatOptHub" data-k="instant" aria-label="Respostas imediatas"></button></div></details></section>
    <section class="section"><details class="card chat-about"><summary><b>Como o Nihongo Chat funciona</b></summary>
      <p>Os personagens respondem com um sistema local de roteiros e reconhecimento de intenções: ele entende respostas curtas pelo contexto (como 「わたしも」), aceita romaji, hiragana, katakana e kanji, tolera pequenos erros de digitação e reconhece reações, figurinhas e emojis.</p>
      <p>Não é uma IA generativa: ele não entende tudo. Quando não entende, o personagem pede para você repetir, e isso <b>não conta como erro</b>. Tudo roda no seu aparelho, sem internet e sem enviar a conversa para lugar nenhum.</p></details></section>
    <section class="section"><details class="card"><summary><b>Guia de formalidade: pedir água</b></summary>${chCardHTML('agua', true)}</details></section>
  </div>`;
}
function chConvRow(c) {
  const st = chState(c.id), un = chUnlocked(c);
  if (!un) {
    const p = chUnlockProgress(c);
    return `<div class="conv locked" id="ch-${c.id}"><span class="ch-av">${chPortrait(c.id, 50)}</span><span class="grow conv-main"><span class="conv-top"><b>${esc(c.name)}</b><span class="chip nova">${esc(c.rel)}</span></span><span class="ch-lock">${IC.lock.replace('width="22" height="22"', 'width="14" height="14"')}<span>${esc(c.unlock.txt)}</span></span>${p ? `<span class="bar light" style="margin-top:4px"><i style="width:${Math.round(p.done / Math.max(1, p.tot) * 100)}%"></i></span>` : ''}</span></div>`;
  }
  const last = chLastMsg(c.id);
  const sub = last ? chMsgPreview(last) : (st.met ? '' : 'Vocês ainda não se conhecem. Diga oi!');
  const busy = st.active && !st.active.free ? `<span class="chip k-new conv-chal">挑 desafio</span>` : '';
  return `<button class="conv" id="ch-${c.id}" data-act="chatOpen" data-id="${c.id}"><span class="ch-av">${chPortrait(c.id, 50)}${st.unread ? '<span class="ch-badge" aria-label="mensagem nova">1</span>' : ''}</span>
    <span class="grow conv-main"><span class="conv-top"><b><span class="jp">${esc(c.jp)}</span> ${esc(c.ro)}</b><span class="conv-time muted tabnum">${esc(chWhen(last && last.t))}</span></span>
    <span class="conv-sub ${st.unread ? 'unread' : ''}">${busy}<span class="${last && last.from === 'char' && !last.stk ? 'jp' : ''}">${esc(sub)}</span></span>
    <span class="conv-rel muted">${esc(c.rel)}</span></span></button>`;
}
function chCardHTML(id, bare) {
  const cd = CHAT_CARDS[id]; if (!cd) return '';
  return `<div class="ch-ladder">${bare ? '' : `<b class="ch-ladder-t">${esc(cd.title)}</b>`}${cd.rows.map(r => `<div class="ch-step"><span class="eyebrow">${esc(r.who)}</span><span class="jp ch-jp">${esc(r.jp)}</span><span class="ro">${esc(r.ro)}</span><span>${esc(r.pt)}</span><span class="muted" style="font-size:.85rem">${esc(r.note)}</span>${AUDIO.supported ? `<button class="link-btn" style="align-self:flex-start;padding:2px 0" data-act="speak" data-text="${esc(r.jp)}">Ouvir</button>` : ''}</div>`).join('')}<p class="muted" style="margin:6px 0 0;font-size:.88rem">${esc(cd.foot)}</p></div>`;
}

/* ---------- expressões do chat ---------- */
function viewChatVocab() {
  const f = chUI.vocabF;
  const items = CHAT_PACK.items.filter(it => { const s = itemStatus(it.id); if (s === 'nova') return false; return f === 'todas' || (f === 'vista' && s === 'vista') || (f === 'comp' && (s === 'aprendendo' || s === 'revisar')) || (f === 'dom' && s === 'dominada'); });
  const fl = [['todas', 'Todas'], ['vista', 'Apresentadas'], ['comp', 'Compreendidas'], ['dom', 'Dominadas']];
  return `<div class="wrap"><div class="page-title"><div><span class="jp">チャットの ことば</span><h1>Expressões do chat</h1></div><button class="btn btn-ghost btn-small" data-act="chatHub">Voltar</button></div>
    <div class="filters">${fl.map(([k, t]) => `<button class="filter ${f === k ? 'on' : ''}" data-act="chatVocabF" data-f="${k}">${t}</button>`).join('')}</div>
    <div class="card" style="margin-top:12px">${items.length ? items.map(it => { const s = itemStatus(it.id), r = S.items[it.id]; return `<div class="nb-entry"><div class="nb-top"><span class="jpw">${esc(it.jp)}</span><span class="chip ${s}">${VOCAB_LABEL[s]}</span>${speakBtn(it.jp)}</div><div><b>${esc(it.pt)}</b> <span class="ro">· ${esc(it.ro)}</span></div>${it.note ? `<div class="muted" style="font-size:.88rem">${esc(it.note)}</div>` : ''}${it.ex ? `<div class="nb-ex"><span class="jp" style="font-weight:700">${esc(it.ex.jp)}</span><br><span class="ro">${esc(it.ex.ro)}</span><br>${esc(it.ex.pt)}</div>` : ''}<div class="nb-meta tabnum"><span>desde ${new Date(r.seen).toLocaleDateString('pt-BR')}</span>${r.c + r.w ? `<span>· usada certo ${r.c}×${r.w ? ', ' + r.w + ' erro' + (r.w > 1 ? 's' : '') : ''}</span>` : ''}</div></div>`; }).join('') : '<p class="muted" style="margin:0">Nenhuma expressão aqui ainda. Converse com os personagens para descobrir expressões novas.</p>'}</div></div>`;
}

/* ---------- histórico de um personagem ---------- */
function viewChatHistory(cid) {
  const c = chChar(cid), th = chThread(cid), tab = chUI.histTab;
  const tabs = [['msgs', 'Mensagens'], ['corr', 'Correções'], ['words', 'Palavras novas'], ['chal', 'Desafios']];
  let body = '';
  if (tab === 'msgs') body = th.length ? `<div class="chat-log static">${th.map((m, i) => chMsgHTML(m, i, cid, true)).join('')}</div>` : '<p class="muted">Ainda não há mensagens.</p>';
  else if (tab === 'corr') { const cs = S.chat.corrections.filter(x => x.c === cid).reverse(); body = cs.length ? `<div class="card list">${cs.map(x => `<div class="row" style="align-items:flex-start"><span class="chip ${x.kind === 'social' ? 'aprendendo' : 'revisar'}">${esc((KIND_INFO[x.kind] || {}).t || x.kind)}</span><span class="grow" style="min-width:0"><span class="muted" style="font-size:.85rem">Você escreveu: “${esc(x.said)}”</span>${x.fix ? `<br><b class="jp">${esc(x.fix.jp)}</b> <span class="ro">${esc(x.fix.ro)}</span><br><span style="font-size:.9rem">${esc(x.fix.pt)}</span>` : ''}${x.why ? `<br><span class="muted" style="font-size:.85rem">${esc(x.why)}</span>` : ''}<br><span class="muted tabnum" style="font-size:.75rem">${new Date(x.t).toLocaleString('pt-BR')}</span></span></div>`).join('')}</div>` : '<p class="muted">Nenhuma correção com este personagem. Muito bem!</p>'; }
  else if (tab === 'words') { const ids = [...new Set(th.filter(m => m.kind === 'new').flatMap(m => m.items || []))].filter(id => ITEM[id]); body = ids.length ? `<div class="card">${ids.map(id => { const it = ITEM[id], s = itemStatus(id); return `<div class="nb-entry"><div class="nb-top"><span class="jpw">${esc(it.jp)}</span><span class="chip ${s}">${String(id).startsWith('chat:') ? VOCAB_LABEL[s] : 'Academia'}</span>${speakBtn(it.say || it.jp)}</div><div><b>${esc(it.pt)}</b> <span class="ro">· ${esc(it.ro)}</span></div></div>`; }).join('')}</div>` : '<p class="muted">Nenhuma palavra nova ainda.</p>'; }
  else { const chs = CHAT_CHALLENGES.filter(x => x.char === cid); body = `<div class="card list">${chs.map(ch => `<div class="row"><span class="grow"><b>${esc(ch.title)}</b><span class="muted" style="display:block;font-size:.85rem">${esc(ch.desc)}</span></span><span class="chip ${S.chat.challenges[ch.id] ? 'dominada' : 'nova'}">${S.chat.challenges[ch.id] ? 'Concluído' : '+' + ch.xp + ' XP'}</span></div>`).join('')}</div>`; }
  return `<div class="wrap"><div class="page-title"><div style="display:flex;gap:10px;align-items:center">${chPortrait(cid, 44)}<div><span class="jp">${esc(c.jp)}</span><h1 style="font-size:1.25rem">Histórico: ${esc(c.name)}</h1></div></div><button class="btn btn-ghost btn-small" data-act="chatHub">Voltar</button></div>
    <div class="filters">${tabs.map(([k, t]) => `<button class="filter ${tab === k ? 'on' : ''}" data-act="chatHistTab" data-t="${k}">${t}</button>`).join('')}</div>
    <div style="margin-top:12px">${body}</div>
    ${chUnlocked(c) ? `<button class="btn btn-primary btn-block" style="margin-top:14px" data-act="chatOpen" data-id="${cid}">Abrir conversa</button>` : ''}</div>`;
}

/* ---------- mensagens ---------- */
function chPlayBtn(text, cid, i, label) { return AUDIO.supported ? `<button class="cb-play" data-act="chatPlay" data-c="${cid}" data-i="${i}" aria-label="${label || 'Ouvir'}">${IC.sound}</button>` : ''; }
function chModelHTML(m, cid) {
  if (!m) return '';
  return `<div class="cm-model"><span class="jp cm-jp">${esc(m.jp)}</span>${m.ro ? `<span class="ro">${esc(m.ro)}</span>` : ''}${m.pt ? `<span>${esc(m.pt)}</span>` : ''}${m.reg ? `<span class="chip nova" style="align-self:flex-start">${esc(REG_SHORT[m.reg] || '')}</span>` : ''}<div class="cm-actions">${AUDIO.supported ? `<button class="link-btn" data-act="speak" data-text="${esc(m.jp)}">Ouvir</button>` : ''}${cid ? `<button class="link-btn" data-act="chatUse" data-text="${esc(m.jp)}">Usar esta frase</button>` : ''}</div></div>`;
}
function chStkBtn(id, size) { const s = CH_STK[id]; if (!s) return ''; return `<button class="stk-b" data-act="stkInfo" data-id="${id}" aria-label="Figurinha: ${esc(s.jp)}, ${esc(s.pt)}">${chStkSVG(id, size || 112)}</button>`; }
function chMsgHTML(m, i, cid, ro) {
  const set = S.chat.settings, c = chChar(cid);
  if (m.from === 'char') {
    if (m.stk) return `<div class="cm char stk${m.init ? ' init' : ''}"><div class="cm-av">${chPortrait(cid, 30)}</div>${chStkBtn(m.stk)}</div>`;
    const hide = set.listen && !m.rv && !ro;
    const inner = hide
      ? `<div class="cb-listen"><span class="muted" style="font-size:.88rem">Ouça e tente entender antes de ler.</span><div class="cm-actions"><button class="btn btn-small btn-primary" data-act="chatPlay" data-c="${cid}" data-i="${i}">${IC.sound} Ouvir</button><button class="btn btn-small btn-ghost" data-act="chatReveal" data-i="${i}">Mostrar texto</button></div></div>`
      : `<span class="jp cb-jp">${esc(m.jp)}</span>${set.ro || m.showRo ? `<span class="ro">${esc(m.ro)}</span>` : ''}${set.pt || m.showPt ? `<span class="cb-pt">${esc(m.pt)}</span>` : `<button class="link-btn cb-tr" data-act="chatShowPt" data-i="${i}">ver tradução</button>`}`;
    return `<div class="cm char${m.init ? ' init' : ''}"><div class="cm-av">${chPortrait(cid, 30)}</div><div class="cb">${inner}${hide ? '' : chPlayBtn(m.jp, cid, i, 'Ouvir a fala de ' + c.name)}</div></div>`;
  }
  if (m.from === 'me') {
    const k = !m.fr && KIND_INFO[m.kind];
    const lab = k && !['free', 'meta', 'pt'].includes(m.kind) ? `<span class="cm-kind k-${m.kind}">${k.ic} ${esc(m.kind === 'unknown' ? 'Não entendi (não conta como erro)' : k.t)}${m.xp ? ` · +${m.xp} XP` : ''}</span>` : m.kind === 'meta' ? '<span class="cm-kind k-meta">Pedido de ajuda</span>' : '';
    const heard = m.heard ? `<span class="cm-heard">entendi: ${esc(m.heard.jp)} (${esc(m.heard.ro)})</span>` : '';
    return `<div class="cm me"><div class="me-col">${m.txt ? `<div class="cb"><span class="cb-me">${esc(m.txt)}</span>${lab}${heard}</div>` : ''}${m.stk ? chStkBtn(m.stk, 100) : ''}</div></div>`;
  }
  // mensagens do sistema
  if (m.kind === 'topic') return `<div class="cm-topic"><span>${m.txt === 'Conversa livre' ? 'Conversa livre' : 'Desafio: ' + esc(m.txt)}</span></div>`;
  if (m.kind === 'note') return `<div class="cm-topic"><span>${esc(m.txt)}</span></div>`;
  if (m.kind === 'done') return `<div class="cm-done">✓ Desafio concluído: <b>${esc(m.txt)}</b>${m.xp ? ` · +${m.xp} XP` : ''}</div>`;
  if (m.kind === 'challenge') return `<div class="cm-done chal">挑 Meta alcançada: <b>${esc(m.txt)}</b> · +${m.xp} XP</div>`;
  if (m.kind === 'card') return `<div class="cm-card">${chCardHTML(m.card)}</div>`;
  if (m.kind === 'new') {
    return `<div class="cm-card new">${(m.items || []).map(id => { const it = ITEM[id]; if (!it) return ''; const fresh = (m.fresh || []).includes(id); return `<div class="cm-word"><span class="chip ${fresh ? 'k-new' : 'nova'}">${fresh ? 'Expressão nova' : 'Revisão'}</span><span class="jp cm-jp">${esc(it.jp)}</span><span class="ro">${esc(it.ro)}</span><span>${esc(it.pt)}</span>${fresh && it.note ? `<span class="muted" style="font-size:.85rem">${esc(it.note)}</span>` : ''}${AUDIO.supported ? `<button class="link-btn" style="align-self:flex-start;padding:0" data-act="speak" data-text="${esc(it.say || it.jp)}">Ouvir</button>` : ''}</div>`; }).join('')}</div>`;
  }
  if (m.kind === 'tip') return `<div class="cm-card tipc"><span class="eyebrow">Nota</span>${m.why ? `<span style="font-size:.9rem">${esc(m.why)}</span>` : ''}${m.jp ? `<div class="cm-model"><span class="jp cm-jp">${esc(m.jp)}</span>${m.ro ? `<span class="ro">${esc(m.ro)}</span>` : ''}${m.pt ? `<span>${esc(m.pt)}</span>` : ''}${AUDIO.supported ? `<div class="cm-actions"><button class="link-btn" data-act="speak" data-text="${esc(m.jp.split('→').pop().trim())}">Ouvir</button></div>` : ''}</div>` : ''}</div>`;
  if (m.kind === 'unk') return `<div class="cm-card unk"><span style="font-size:.88rem">${esc(m.txt)}</span>${m.model ? chModelHTML(m.model, ro ? null : cid) : ''}</div>`;
  if (m.kind === 'teach') return `<div class="cm-card teach"><span class="chip k-new">Novo</span><span style="font-size:.9rem">${esc(m.why)}</span>${chModelHTML(m.model, ro ? null : cid)}</div>`;
  if (m.kind === 'hint') return `<div class="cm-card hint"><span class="eyebrow">${m.lv ? 'Dica ' + m.lv + '/5 · ' + esc(HINT_LV[m.lv]) : 'Ideias'}</span>${m.txt ? `<span style="font-size:.92rem">${esc(m.txt)}</span>` : ''}${m.model ? chModelHTML(m.model, ro ? null : cid) : ''}${(m.models || []).map(x => chModelHTML(x, ro ? null : cid)).join('')}${m.ideas ? `<div class="cm-ideas">${m.ideas.map(x => `<button class="idea" data-act="chatUse" data-text="${esc(x.jp)}"><b>${esc(x.idea || x.pt)}</b><span class="jp">${esc(x.jp)}</span><span class="ro">${esc(x.ro)}</span></button>`).join('')}</div>` : ''}</div>`;
  if (m.kind === 'fb') {
    const k = KIND_INFO[m.res] || KIND_INFO.unknown;
    if (m.soft) return `<div class="cm-card fb fb-social soft"><span class="cm-fb-t">敬 Dica de naturalidade</span><span style="font-size:.9rem">${esc(m.txt)}</span>${m.model ? `<span class="eyebrow" style="margin-top:2px">Mais natural aqui</span>${chModelHTML(m.model, null)}` : ''}</div>`;
    return `<div class="cm-card fb fb-${m.res}"><span class="cm-fb-t">${k.ic} ${esc(k.t)}</span>${m.txt ? `<span style="font-size:.92rem">${esc(m.txt)}</span>` : ''}${m.model ? `<span class="eyebrow" style="margin-top:4px">${m.res === 'social' ? 'Mais natural aqui' : 'Forma correta'}</span>${chModelHTML(m.model, ro || !m.retry ? null : cid)}` : ''}${m.alts && m.alts.length ? `<details><summary class="muted" style="font-size:.85rem">Outras formas naturais</summary>${m.alts.map(a => chModelHTML(a)).join('')}</details>` : ''}${m.retry && !ro ? '<span class="muted" style="font-size:.85rem">Tente de novo: o desafio continua quando você responder.</span>' : ''}</div>`;
  }
  return '';
}

/* ---------- painel da conversa ---------- */
function chSpeed() { if (typeof window !== 'undefined' && window.__NQ_FAST) return 0; return S.chat.settings.instant ? 0 : 1; }
function chatOpen(cid) {
  const c = chChar(cid); if (!c) return;
  if (!chUnlocked(c)) { toast('鍵', c.unlock.txt); return; }
  stopAudio();
  const st = chState(cid);
  const before = chThread(cid).length;
  CHV = { id: cid, gain: 0, busy: false, shown: before, timer: null, typing: false, playFrom: before, stk: false };
  if (!st.met && !(st.active && st.active.free && st.active.topic)) { if (!st.active || st.active.free) chTalkOpen(cid); }
  else if (!st.active) chTalkEnsure(cid);
  st.unread = 0;
  if (st.pending && String(st.pending).startsWith('talk:')) st.pending = null;
  save();
  $('#player').hidden = false; document.body.style.overflow = 'hidden';
  $('#player').innerHTML = chPaneHTML(cid);
  chRenderLog(true); chRenderExtra();
  updateTabDots();
  chFlow();
}
function chHeadSub(cid) { const c = chChar(cid); if (CHV && CHV.typing) return `${c.name} está digitando…`; const act = chState(cid).active; return act && !act.free ? 'Desafio em andamento' : c.rel + ' · fala ' + REG_SHORT[chWant(cid, act)]; }
function chPaneHTML(cid) {
  const c = chChar(cid), set = S.chat.settings;
  const tg = (k, t, ic) => `<button class="tg ${set[k] ? 'on' : ''}" data-act="chatOpt" data-k="${k}" aria-pressed="${!!set[k]}">${ic || ''}${t}</button>`;
  return `<div class="chat-pane" data-char="${cid}">
    <header class="chat-head"><button class="icon-btn" data-act="chatClose" aria-label="Voltar para a lista de conversas">${IC.back}</button>
      <button class="ch-av ch-prof" data-act="chatProfile" aria-label="Perfil de ${esc(c.name)}">${chPortrait(cid, 40)}</button>
      <div class="grow" style="min-width:0"><b class="ch-hname"><span class="jp">${esc(c.jp)}</span> ${esc(c.ro)}</b><span class="ch-hsub" id="chHsub" aria-live="polite">${esc(chHeadSub(cid))}</span></div>
      <button class="icon-btn" data-act="chatChal" aria-label="Desafios com ${esc(c.name)}" title="Desafios">${IC.flag}</button>
      <button class="icon-btn" data-act="chatHistFromPane" aria-label="Histórico">${IC.hist}</button></header>
    <div class="chat-tools" role="group" aria-label="Opções de exibição">${tg('ro', 'Romaji')}${tg('pt', 'Tradução')}${tg('listen', 'Ouvir primeiro', IC.ear)}${tg('sugg', 'Sugestões')}</div>
    <div class="chat-log" id="chatLog" aria-live="polite"></div>
    <div class="chat-foot"><div id="chatExtra"></div><div id="chatStk"></div>
      <div class="chat-input-row">
        <button class="icon-btn" data-act="chatStkToggle" aria-label="Figurinhas e emojis" aria-expanded="false" id="stkBtn">${IC.smile}</button>
        <button class="icon-btn" data-act="chatHint" aria-label="Ideias e dicas">${IC.bulb}</button>
        <input id="chatIn" type="text" enterkeyhint="send" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="120" placeholder="Mensagem" aria-label="Sua mensagem">
        ${AUDIO.supported ? `<button class="icon-btn hide-xs" data-act="chatSpeakMine" aria-label="Ouvir a minha frase">${IC.sound}</button>` : ''}
        <button class="icon-btn send" data-act="chatSend" aria-label="Enviar">${IC.send}</button>
      </div></div></div>`;
}
function chRenderLog(jump) {
  if (!CHV) return;
  const box = $('#chatLog'); if (!box) return;
  const th = chThread(CHV.id);
  const end = Math.min(th.length, CHV.shown == null ? th.length : CHV.shown);
  const start = Math.max(0, end - 60);
  const c = chChar(CHV.id);
  box.innerHTML = (start ? `<p class="muted" style="text-align:center;font-size:.8rem">Mensagens anteriores no Histórico.</p>` : '') + th.slice(start, end).map((m, k) => chMsgHTML(m, start + k, CHV.id)).join('')
    + (CHV.typing ? `<div class="cm char typing" aria-label="${esc(c.name)} está digitando"><div class="cm-av">${chPortrait(CHV.id, 30)}</div><div class="cb tp"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="tp-t">${esc(c.name)} está digitando…</span></div></div>` : '');
  if (jump !== false) requestAnimationFrame(() => { box.scrollTop = box.scrollHeight; });
  const hs = $('#chHsub'); if (hs) hs.textContent = chHeadSub(CHV.id);
}
/* revela as mensagens do personagem uma a uma, com "digitando…" e pausas naturais */
function chTypingDelay(cid, m, first) {
  const T = (TALK[cid] || TALK.ren).style;
  let d = m.stk ? 420 + chRand() * 380 : T.base + [...(m.jp || '')].length * T.per + chRand() * T.jit;
  d = Math.min(Math.max(d, 280), T.max);
  if (first) d += 220 + chRand() * 260;
  return d * chSpeed();
}
function chFlow() {
  if (!CHV) return;
  clearTimeout(CHV.timer);
  const th = chThread(CHV.id), cid = CHV.id;
  if (CHV.shown >= th.length) {
    if (CHV.typing) { CHV.typing = false; chRenderLog(); }
    chRenderExtra();
    if (S.chat.settings.listen && CHV.playFrom < th.length) { const f = CHV.playFrom; CHV.playFrom = th.length; chAutoPlay(cid, f); }
    return;
  }
  const m = th[CHV.shown];
  if (m.from !== 'char' || !chSpeed()) {
    // sistema e mensagens do aluno aparecem logo; com respostas imediatas, tudo aparece de uma vez
    while (CHV.shown < th.length && (th[CHV.shown].from !== 'char' || !chSpeed())) CHV.shown++;
    chRenderLog();
    return chFlow();
  }
  const prev = th[CHV.shown - 1];
  const first = !prev || prev.from === 'me';
  CHV.typing = true; chRenderLog();
  const T = (TALK[cid] || TALK.ren).style;
  CHV.timer = setTimeout(() => {
    if (!CHV || CHV.id !== cid) return;
    CHV.typing = false; CHV.shown++;
    chRenderLog();
    const nx = th[CHV.shown];
    CHV.timer = setTimeout(chFlow, nx && nx.from === 'char' ? T.gap * (0.6 + chRand() * 0.8) * chSpeed() : 0);
  }, chTypingDelay(cid, m, first));
}
/* mostra na hora tudo o que ainda estava "sendo digitado" (ex.: o aluno mandou outra mensagem) */
function chFlush() {
  if (!CHV) return;
  clearTimeout(CHV.timer);
  const n = chThread(CHV.id).length;
  if (CHV.shown < n || CHV.typing) { CHV.shown = n; CHV.typing = false; chRenderLog(); }
}
function chRenderExtra() {
  if (!CHV) return;
  const box = $('#chatExtra'); if (!box) return;
  const cid = CHV.id, st = chState(cid), act = st.active;
  let h = '';
  if (act && !act.free) {
    const sc = CH_SCENE[act.scene] || {};
    h += `<div class="ch-chal"><div class="grow" style="min-width:0"><span class="chip k-new">挑 Desafio</span> <b>${esc(sc.title || '')}</b>${sc.desc ? `<span class="muted ch-chal-d">${esc(sc.desc)}</span>` : ''}</div><button class="link-btn" data-act="chatEnd">Sair</button></div>`;
  }
  if (S.chat.settings.sugg && act && !CHV.typing) { const sg = chSuggestions(cid); if (sg.length) h += `<div class="ch-sugg">${sg.map(x => `<button class="sugg" data-act="chatUse" data-text="${esc(x.jp)}"><span class="jp">${esc(x.jp)}</span><span class="ro">${esc(x.ro)}</span></button>`).join('')}</div>`; }
  box.innerHTML = h;
  const sb = $('#stkBtn'); if (sb) { sb.toggleAttribute('disabled', !!(act && !act.free)); sb.title = act && !act.free ? 'Figurinhas ficam na conversa livre' : 'Figurinhas e emojis'; }
  if (act && !act.free && CHV.stk) { CHV.stk = false; chRenderStk(); }
}
/* ---------- área de figurinhas e emojis ---------- */
function chRenderStk() {
  const box = $('#chatStk'); if (!box || !CHV) return;
  const b = $('#stkBtn'); if (b) b.setAttribute('aria-expanded', CHV.stk ? 'true' : 'false');
  if (!CHV.stk) { box.innerHTML = ''; return; }
  const k = chStkState(), sets = chStkSetsFor();
  const tabs = [['fav', '★'], ['rec', 'Recentes']].concat(sets.map(s => [s, chStkSetName(s)])).concat([['emoji', '😊']]);
  let tab = chUI.stkTab || (k.fav.length ? 'fav' : 'hikari');
  if (!tabs.some(t => t[0] === tab)) tab = 'hikari';
  const ids = tab === 'fav' ? k.fav.filter(id => CH_STK[id]) : tab === 'rec' ? k.recent.filter(id => CH_STK[id]) : tab === 'emoji' ? [] : Object.keys(CH_STK).filter(id => CH_STK[id].set === tab);
  const grid = tab === 'emoji'
    ? `<div class="emo-grid">${CH_EMOJIS.map(e => `<button class="emo" data-act="chatEmoji" data-e="${e}" aria-label="Emoji ${e}">${e}</button>`).join('')}</div>`
    : ids.length ? `<div class="stk-grid">${ids.map(id => { const s = CH_STK[id], fav = k.fav.includes(id); return `<div class="stk-cell"><button class="stk-pick" data-act="chatStkSend" data-id="${id}" aria-label="Enviar figurinha ${esc(s.jp)} (${esc(s.pt)})">${chStkSVG(id, 64)}</button><button class="stk-fav ${fav ? 'on' : ''}" data-act="stkFav" data-id="${id}" aria-pressed="${fav}" aria-label="${fav ? 'Remover dos favoritos' : 'Favoritar'}">${fav ? '★' : '☆'}</button></div>`; }).join('')}</div>`
      : `<p class="muted" style="margin:6px 0;font-size:.85rem">${tab === 'fav' ? 'Toque na ☆ de uma figurinha para guardar aqui.' : 'As figurinhas que você enviar aparecem aqui.'}</p>`;
  box.innerHTML = `<div class="stk-panel"><div class="stk-tabs" role="tablist">${tabs.map(([id, t]) => `<button class="stk-tab ${tab === id ? 'on' : ''}" role="tab" aria-selected="${tab === id}" data-act="chatStkTab" data-t="${id}">${esc(t)}</button>`).join('')}</div>${grid}<p class="muted stk-help">Toque para enviar. Se houver texto no campo, a figurinha vai junto com ele.</p></div>`;
}
function chStkInfo(id) {
  const s = CH_STK[id]; if (!s) return;
  const fav = chStkState().fav.includes(id), it = s.item && chItem(s.item);
  openModal(`<div class="stack" style="align-items:center;text-align:center">${chStkSVG(id, 150)}
    <span class="eyebrow">${esc(CH_EMO_PT[s.emo] || '')} · ${esc(chStkSetName(s.set))}</span>
    <span class="jp" style="font-size:1.4rem;font-weight:800">${esc(s.jp)}</span><span class="ro">${esc(s.ro)}</span><span>${esc(s.pt)}</span>
    ${it ? `<p class="muted" style="margin:0;font-size:.88rem">Expressão do Caderno: <b class="jp">${esc(it.jp)}</b> = ${esc(it.pt)}. ${esc(it.note || '')}</p>` : ''}
    <div class="row-btns" style="justify-content:center">${AUDIO.supported ? `<button class="btn btn-ghost btn-small" data-act="speak" data-text="${esc(s.jp === '笑' || s.jp === '笑笑' ? 'わら' : s.jp)}">${IC.sound} Ouvir</button>` : ''}<button class="btn btn-ghost btn-small" data-act="stkFav" data-id="${id}" data-modal="1">${fav ? '★ Favorita' : '☆ Favoritar'}</button></div>
    <button class="btn btn-primary btn-block" data-act="closeModal">Fechar</button></div>`, 'center');
}
function chChalSheet(cid) {
  const c = chChar(cid), list = chChalScenes(cid), locked = chLockedScenes(cid);
  const act = chState(cid).active;
  const row = sc => { const d = S.chat.scenes[sc.id]; const goals = CHAT_CHALLENGES.filter(g => g.char === cid && (g.scene === sc.id || (g.scenesDone || []).includes(sc.id))); return `<div class="row" style="align-items:flex-start"><span class="grow"><b>${esc(sc.intro ? 'Apresentação: ' + sc.title : sc.title)}</b><span class="muted" style="display:block;font-size:.85rem">${esc(sc.desc || 'Apresente-se de acordo com a relação com ' + c.name + '.')}</span>${goals.map(g => `<span class="chip ${S.chat.challenges[g.id] ? 'dominada' : 'nova'}" style="margin-top:4px">${S.chat.challenges[g.id] ? '✓ ' : '挑 '}${esc(g.title)}</span>`).join('')}</span><span style="display:flex;flex-direction:column;gap:4px;align-items:flex-end">${d && d.n ? `<span class="chip dominada tabnum">feito ${d.n}×</span>` : '<span class="chip k-new">novo</span>'}<button class="btn btn-primary btn-small" data-act="chatScene" data-id="${sc.id}">${act && act.scene === sc.id ? 'Continuar' : 'Começar'}</button></span></div>`; };
  openModal(`<div class="stack"><div style="display:flex;gap:10px;align-items:center">${chPortrait(cid, 44)}<div><span class="eyebrow">Desafios com ${esc(c.name)}</span><h2 style="margin:0">Situações guiadas</h2></div></div>
    <p class="muted" style="margin:0;font-size:.9rem">Cada desafio tem um objetivo claro, respostas esperadas, correção e XP. A conversa livre continua do mesmo jeito depois que você sai.</p>
    <div class="card list" style="max-height:52vh;overflow:auto">${list.map(row).join('')}</div>
    ${locked.length ? `<p class="muted" style="margin:0;font-size:.85rem">+${locked.length} desafio${locked.length > 1 ? 's' : ''} libera${locked.length > 1 ? 'm' : ''} conforme você avança na Academia.</p>` : ''}
    <button class="btn btn-ghost btn-block" data-act="closeModal">Voltar à conversa</button></div>`);
}
function chProfileSheet(cid) {
  const c = chChar(cid), want = typeof c.reg === 'function' ? c.reg() : c.reg;
  openModal(`<div class="stack" style="align-items:center;text-align:center">${chPortrait(cid, 96)}<div><span class="jp" style="font-size:1.3rem;font-weight:800">${esc(c.jp)}</span> <b style="font-size:1.2rem">${esc(c.ro)}</b></div>
    <div class="ch-tags" style="justify-content:center"><span class="chip aprendendo">${esc(c.rel)}</span><span class="chip nova">fala ${REG_SHORT[want]}</span></div>
    <p style="margin:0">${esc(c.desc)}</p><p class="muted" style="margin:0;font-size:.9rem">Jeito de falar: ${esc(c.speech)}<br>Gosta de: ${esc(c.likes.join(', '))}</p>
    <button class="btn btn-primary btn-block" data-act="closeModal">Voltar à conversa</button></div>`, 'center');
}
function chatClose() {
  stopAudio();
  if (CHV) clearTimeout(CHV.timer);
  const g = CHV ? CHV.gain : 0;
  CHV = null; saveNow();
  $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = '';
  render();
  if (g) toast('話', 'Nihongo Chat: +' + g + ' XP nesta conversa');
  checkAchievements();
  setTimeout(flushPending, 200);
}
async function chAutoPlay(cid, from) {
  if (!AUDIO.supported || audioBlocked()) return;
  const th = chThread(cid), c = chChar(cid);
  const my = ++AUDIO.token;
  for (let i = from; i < th.length; i++) {
    const m = th[i]; if (m.from !== 'char' || !m.jp) continue;
    if (my !== AUDIO.token || !CHV) return;
    AUDIO.token = my - 1;
    const ok = await speak(m.say || m.jp, { pitch: c.pitch, rate: m.slow ? 0.62 : undefined, key: 'ch' + i });
    if (!ok || AUDIO.token !== my) return;
    await new Promise(r => setTimeout(r, 300));
  }
}
async function chatSend(stk) {
  if (!CHV || CHV.busy) return;
  const inp = $('#chatIn'); if (!inp) return;
  const text = inp.value.trim().slice(0, 120);
  if (!text && !stk) { inp.focus(); return; }
  const cid = CHV.id, st = chState(cid);
  if (stk && st.active && !st.active.free) { toast('挑', 'No desafio, responda com uma frase. As figurinhas ficam na conversa livre.'); return; }
  CHV.busy = true;
  stopAudio();
  chFlush();
  if (!st.active) chTalkEnsure(cid);
  st.pending = null; st.lastAt = Date.now();
  const before = chThread(cid).length;
  inp.value = '';
  let res = null;
  try {
    res = await CHAT_BRAINS[chatBrainId()].reply({ char: cid, text, stk: stk || null, scene: st.active && st.active.scene, node: st.active && st.active.node, register: chWant(cid, st.active), tier: chTier() });
  } catch (e) { console.warn(e); chPush(cid, { from: 'sys', kind: 'note', txt: 'Algo deu errado ao processar a mensagem. Tente de novo.' }); }
  CHV.busy = false;
  if (res && ['ok', 'variant'].includes(res.kind)) sfx('ok'); else if (res && ['grammar', 'vocab'].includes(res.kind)) sfx('bad'); else sfx('tap');
  save();
  // a mensagem do aluno aparece na hora; as respostas, com "digitando…"
  const th = chThread(cid);
  CHV.shown = before;
  while (CHV.shown < th.length && th[CHV.shown].from !== 'char') CHV.shown++;
  CHV.playFrom = before;
  if (CHV.stk && stk) { CHV.stk = false; chRenderStk(); }
  chRenderLog(); chRenderExtra();
  chFlow();
  const inp2 = $('#chatIn'); if (inp2 && !matchMedia('(pointer: coarse)').matches) inp2.focus();
}
function chAfterAction(cid, n) { save(); if (!CHV) return; CHV.playFrom = n; chRenderLog(); chRenderExtra(); chFlow(); }

Object.assign(ACT, {
  chatOpen: el => chatOpen(el.dataset.id),
  chatClose: () => chatClose(),
  chatSend: () => chatSend(),
  chatHub: () => { chUI.sub = 'hub'; render(); window.scrollTo(0, 0); },
  chatVocab: () => { chUI.sub = 'vocab'; render(); window.scrollTo(0, 0); },
  chatVocabF: el => { chUI.vocabF = el.dataset.f; render(); },
  chatHistOpen: el => { chUI.sub = 'hist'; chUI.char = el.dataset.id; chUI.histTab = 'msgs'; go('chat'); },
  chatHistFromPane: () => { const id = CHV && CHV.id; chatClose(); chUI.sub = 'hist'; chUI.char = id; chUI.histTab = 'msgs'; go('chat'); },
  chatHistTab: el => { chUI.histTab = el.dataset.t; render(); },
  chatDismiss: el => { chDismiss(el.dataset.id); if (CHV) { CHV.shown = chThread(CHV.id).length; chRenderLog(); chRenderExtra(); } else render(); },
  chatChal: () => { if (CHV) chChalSheet(CHV.id); },
  chatChalOpen: el => { chatOpen(el.dataset.id); if (CHV) chChalSheet(CHV.id); },
  chatProfile: () => { if (CHV) chProfileSheet(CHV.id); },
  chatScene: el => {
    if (!CHV) return; const sc = CH_SCENE[el.dataset.id];
    if (!sc || !(sc.intro || chSceneOpen(sc))) { toast('鍵', 'Este desafio ainda não está liberado.'); return; }
    if (!$('#modal').hidden) closeModal();
    chFlush();
    const st = chState(CHV.id); if (st.active && st.active.scene === sc.id) return;
    const n = chThread(CHV.id).length; st.active = null; chStartScene(CHV.id, sc.id); chAfterAction(CHV.id, n);
  },
  chatEnd: () => {
    if (!CHV) return; chFlush();
    const st = chState(CHV.id), n = chThread(CHV.id).length;
    if (st.active && !st.active.free) { st.active = null; st.pending = null; chPush(CHV.id, { from: 'sys', kind: 'note', txt: 'Você saiu do desafio. A conversa livre continua.' }); chTalkEnsure(CHV.id); }
    chAfterAction(CHV.id, n);
  },
  chatHint: () => { if (!CHV) return; chFlush(); const st = chState(CHV.id); if (!st.active) chTalkEnsure(CHV.id); const n = chThread(CHV.id).length; chHint(CHV.id); chAfterAction(CHV.id, n); },
  chatUse: el => { const i = $('#chatIn'); if (!i) return; i.value = el.dataset.text; i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (e) {} },
  chatOpt: el => { const k = el.dataset.k; S.chat.settings[k] = !S.chat.settings[k]; save(); el.classList.toggle('on', S.chat.settings[k]); el.setAttribute('aria-pressed', S.chat.settings[k]); chRenderLog(false); chRenderExtra(); },
  chatOptHub: el => { const k = el.dataset.k; S.chat.settings[k] = !S.chat.settings[k]; save(); el.classList.toggle('on', S.chat.settings[k]); el.setAttribute('aria-checked', S.chat.settings[k]); },
  chatReveal: el => { const m = chThread(CHV.id)[+el.dataset.i]; if (m) { m.rv = true; save(); chRenderLog(false); } },
  chatShowPt: el => { const m = chThread(CHV.id)[+el.dataset.i]; if (m) { m.showPt = true; save(); chRenderLog(false); } },
  chatPlay: el => { const cid = el.dataset.c, m = chThread(cid)[+el.dataset.i]; if (!m) return; speak(m.say || m.jp, { pitch: (chChar(cid) || {}).pitch, rate: m.slow ? 0.62 : undefined }); },
  chatStkToggle: () => { if (!CHV) return; const act = chState(CHV.id).active; if (act && !act.free) { toast('挑', 'As figurinhas ficam na conversa livre.'); return; } CHV.stk = !CHV.stk; chRenderStk(); },
  chatStkTab: el => { chUI.stkTab = el.dataset.t; chRenderStk(); },
  chatStkSend: el => chatSend(el.dataset.id),
  chatEmoji: el => { const i = $('#chatIn'); if (!i) return; i.value = (i.value + el.dataset.e).slice(0, 120); if (!matchMedia('(pointer: coarse)').matches) i.focus(); },
  stkFav: el => { const k = chStkState(), id = el.dataset.id; const ix = k.fav.indexOf(id); if (ix >= 0) k.fav.splice(ix, 1); else k.fav.unshift(id); save(); if (el.dataset.modal) chStkInfo(id); chRenderStk(); },
  stkInfo: el => chStkInfo(el.dataset.id),
  chatSpeakMine: () => {
    const v = ($('#chatIn') || {}).value || '';
    if (!v.trim()) { toast('音', 'Escreva a sua frase para ouvi-la antes de enviar.'); return; }
    let t = v.replace(/[\u{1F000}-\u{1FAFF}☀-➿]/gu, '');
    if (!/[぀-ヿ一-鿿]/.test(t)) { try { t = NQK.r2k(t.toLowerCase().replace(/[^a-z' .,!?-]/g, '')); } catch (e) { toast('音', 'Não consegui ler esse romaji. Confira a escrita.'); return; } }
    speak(t);
  }
});
document.addEventListener('keydown', e => {
  if (e.target && e.target.id === 'chatIn' && e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); chatSend(); }
  if (e.key === 'Escape' && CHV && $('#modal').hidden) { if (CHV.stk) { CHV.stk = false; chRenderStk(); } else chatClose(); }
});
function homeChatCard() {
  const un = CHAT_CHARS.filter(c => chUnlocked(c) && chState(c.id).unread);
  if (un.length) {
    const c = un[0], last = [...chThread(c.id)].reverse().find(m => m.from === 'char');
    return `<section class="section"><div class="card ch-home"><div class="mascot-tip" style="align-items:center">${chPortrait(c.id, 52)}<div style="min-width:0"><span class="eyebrow">Nihongo Chat · nova mensagem</span><h3 style="font-size:1.02rem">${esc(c.name)}: <span class="jp">${esc(chMsgPreview(last))}</span></h3>${un.length > 1 ? `<span class="muted" style="font-size:.85rem">e mais ${un.length - 1} ${un.length - 1 === 1 ? 'mensagem' : 'mensagens'}</span>` : ''}</div></div><div class="row-btns"><button class="btn btn-gold btn-small" data-act="chatOpen" data-id="${c.id}">Responder</button><button class="btn btn-ghost btn-small" data-act="nav" data-view="chat">Ver o chat</button></div></div></section>`;
  }
  return `<section class="section"><div class="card ch-home"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big">${IC.chat}</span><div style="min-width:0"><span class="eyebrow">Nihongo Chat</span><h3 style="font-size:1.05rem">Converse com seus amigos japoneses</h3><span class="muted" style="font-size:.85rem">${CHAT_CHARS.filter(chUnlocked).map(c => c.name).join(', ')} ${CHAT_CHARS.filter(chUnlocked).length > 1 ? 'estão' : 'está'} por aqui. Mande um oi, uma figurinha ou um 「げんき？」.</span></div></div><div class="row-btns"><button class="btn btn-primary btn-small" data-act="nav" data-view="chat">Abrir o chat</button></div></div></section>`;
}
