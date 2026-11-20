/* ==========================================================
   NIHONGO CHAT 4.0 — interface (central de personagens,
   conversa em balões, dicas, histórico e expressões)
   ========================================================== */
IC.bulb = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>';
IC.send = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2-7z"/></svg>';
IC.back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
IC.hist = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
IC.ear = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 10a2 2 0 0 1 4 0"/></svg>';

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
const chUI = { sub: 'hub', char: null, histTab: 'msgs', vocabF: 'todas' };
const REG_SHORT = { c: 'casual', n: 'neutro', p: 'educado', k: 'keigo' };
const VOCAB_LABEL = { nova: 'Nova', vista: 'Apresentada', aprendendo: 'Compreendida', dominada: 'Dominada', revisar: 'Revisar' };

function chNotifyUnlocks() {
  CHAT_CHARS.forEach(c => { const st = chState(c.id); if (chUnlocked(c) && !st.unlockSeen) { st.unlockSeen = true; if (c.id !== 'ren') toast('話', 'Novo personagem no Nihongo Chat: ' + c.name + '!'); } });
}
function viewChat() {
  chNotifyUnlocks();
  chInitiative();
  if (chUI.sub === 'hist' && chUI.char) return viewChatHistory(chUI.char);
  if (chUI.sub === 'vocab') return viewChatVocab();
  const cards = CHAT_CHARS.map(chCharCard).join('');
  const chs = CHAT_CHALLENGES.map(ch => { const done = S.chat.challenges[ch.id]; const c = chChar(ch.char); const lk = !chUnlocked(c); return `<div class="row chal ${done ? 'done' : ''} ${lk ? 'locked' : ''}"><span class="chal-ic">${done ? '✓' : lk ? IC.lock.replace('width="22" height="22"', 'width="16" height="16"') : '挑'}</span><span class="grow"><b>${esc(ch.title)}</b><span class="muted" style="display:block;font-size:.85rem">${esc(c.name)} · ${esc(ch.desc)}</span></span><span class="chip ${done ? 'dominada' : 'nova'} tabnum">${done ? 'Feito' : '+' + ch.xp + ' XP'}</span></div>`; }).join('');
  const chatIds = CHAT_PACK.items.map(it => it.id), cnt = { vista: 0, aprendendo: 0, dominada: 0, revisar: 0 };
  chatIds.forEach(id => { const s = itemStatus(id); if (cnt[s] != null) cnt[s]++; });
  const seen = cnt.vista + cnt.aprendendo + cnt.dominada + cnt.revisar;
  const tier = chTier();
  return `<div class="wrap">
    <div class="page-title"><div><span class="jp">にほんごチャット</span><h1>Nihongo Chat</h1></div></div>
    <p class="muted" style="margin:0 0 10px">Converse com personagens usando o que você aprendeu na Academia. As conversas acompanham o seu progresso real: nível <b>${CH_TIER_NAME[tier]}</b>.</p>
    <details class="card chat-about"><summary><b>Como o Nihongo Chat funciona</b></summary>
      <p>Os personagens seguem roteiros com intenções e ramificações: o app reconhece respostas equivalentes (romaji, hiragana, katakana ou kanji), diferencia erros de gramática, vocabulário, escrita e formalidade, e só cobra o que você já estudou. O que ainda é novo aparece marcado como <b>Novo</b>, com significado, romaji e tradução.</p>
      <p>Não é uma IA generativa e não usa internet: tudo roda no seu aparelho e nada da conversa é enviado. As vozes são as do seu próprio aparelho.</p></details>
    <section class="section"><div class="section-h"><h2>Personagens</h2><span class="muted tabnum" style="font-size:.85rem">${CHAT_CHARS.filter(chUnlocked).length}/${CHAT_CHARS.length} liberados</span></div>${cards}</section>
    <section class="section"><div class="section-h"><h2>Desafios de conversa</h2><span class="muted tabnum" style="font-size:.85rem">${Object.keys(S.chat.challenges).length}/${CHAT_CHALLENGES.length}</span></div><div class="card list chal-list">${chs}</div></section>
    <section class="section"><div class="section-h"><h2>Expressões do chat</h2></div>
      <div class="card"><div class="stats-grid" style="margin:0"><div class="kpi"><b class="tabnum">${cnt.vista}</b><span>apresentadas</span></div><div class="kpi"><b class="tabnum">${cnt.aprendendo + cnt.revisar}</b><span>compreendidas</span></div><div class="kpi"><b class="tabnum">${cnt.dominada}</b><span>dominadas</span></div></div>
      <p class="muted" style="margin:10px 0 0;font-size:.85rem">Apresentada: você viu a expressão. Compreendida: você já a usou certo numa conversa. Dominada: acertou em pelo menos 3 dias diferentes. Elas entram na sua Revisão.</p>
      <div class="row-btns" style="margin-top:10px"><button class="btn btn-ghost btn-small" data-act="chatVocab">Ver expressões</button>${seen ? '<button class="btn btn-primary btn-small" data-act="startReview" data-mode="chat">Revisar expressões</button>' : ''}</div></div></section>
    <section class="section"><details class="card"><summary><b>Guia de formalidade: pedir água</b></summary>${chCardHTML('agua', true)}</details></section>
  </div>`;
}
function chCharCard(c) {
  const st = chState(c.id), un = chUnlocked(c);
  let status;
  if (!un) {
    const p = chUnlockProgress(c);
    status = `<div class="ch-lock">${IC.lock.replace('width="22" height="22"', 'width="16" height="16"')}<span>${esc(c.unlock.txt)}</span></div>${p ? `<div class="bar light" style="margin-top:6px"><i style="width:${Math.round(p.done / Math.max(1, p.tot) * 100)}%"></i></div><span class="muted tabnum" style="font-size:.8rem">${p.done}/${p.tot} etapas</span>` : ''}`;
  } else if (st.pending) {
    const last = [...chThread(c.id)].reverse().find(m => m.from === 'char');
    status = `<div class="ch-new"><span class="ch-dot"></span><span><b>Nova mensagem:</b> <span class="jp">${esc(last ? last.jp : '')}</span></span></div>`;
  } else if (st.active) {
    status = `<div class="ch-state">Conversa em andamento: <b>${esc(st.active.free ? 'Conversa livre' : (CH_SCENE[st.active.scene] || {}).title || '')}</b></div>`;
  } else {
    const open = chScenesFor(c.id), done = open.filter(sc => S.chat.scenes[sc.id] && S.chat.scenes[sc.id].n).length;
    status = `<div class="ch-state tabnum">${st.met ? open.length + ' assuntos disponíveis · ' + done + ' já conversados' : 'Vocês ainda não se conhecem'}</div>`;
  }
  const want = typeof c.reg === 'function' ? c.reg() : c.reg;
  return `<article class="card ch-card ${un ? '' : 'locked'}" id="ch-${c.id}">
    <div class="ch-top"><div class="ch-av">${chPortrait(c.id, 60)}${un && st.unread ? '<span class="ch-badge" aria-label="mensagem nova">1</span>' : ''}</div>
      <div class="grow" style="min-width:0"><div class="ch-name"><span class="jp">${esc(c.jp)}</span> <b>${esc(c.ro)}</b></div>
      <div class="ch-tags"><span class="chip aprendendo">${esc(c.rel)}</span><span class="chip nova">fala ${REG_SHORT[want]}</span></div></div></div>
    <p class="ch-desc">${esc(c.desc)}</p>
    <p class="muted ch-meta">Jeito de falar: ${esc(c.speech)}<br>Gosta de: ${esc(c.likes.join(', '))}</p>
    ${status}
    <div class="row-btns" style="margin-top:10px"><button class="btn ${!un ? 'btn-ghost' : st.pending ? 'btn-gold' : 'btn-primary'} btn-small" data-act="chatOpen" data-id="${c.id}" ${un ? '' : 'aria-disabled="true"'}>${!un ? 'Bloqueado' : st.pending ? 'Responder' : st.active ? 'Continuar' : st.met ? 'Conversar' : 'Conhecer'}</button>${un && chThread(c.id).length ? `<button class="btn btn-ghost btn-small" data-act="chatHistOpen" data-id="${c.id}">Histórico</button>` : ''}${st.pending ? `<button class="btn btn-ghost btn-small" data-act="chatDismiss" data-id="${c.id}">Agora não</button>` : ''}</div>
  </article>`;
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
  return `<div class="cm-model"><span class="jp cm-jp">${esc(m.jp)}</span><span class="ro">${esc(m.ro)}</span><span>${esc(m.pt)}</span>${m.reg ? `<span class="chip nova" style="align-self:flex-start">${esc(REG_SHORT[m.reg] || '')}</span>` : ''}<div class="cm-actions">${AUDIO.supported ? `<button class="link-btn" data-act="speak" data-text="${esc(m.jp)}">Ouvir</button>` : ''}${cid ? `<button class="link-btn" data-act="chatUse" data-text="${esc(m.jp)}">Usar esta frase</button>` : ''}</div></div>`;
}
function chMsgHTML(m, i, cid, ro) {
  const set = S.chat.settings, c = chChar(cid);
  if (m.from === 'char') {
    const hide = set.listen && !m.rv && !ro;
    const inner = hide
      ? `<div class="cb-listen"><span class="muted" style="font-size:.88rem">Ouça e tente entender antes de ler.</span><div class="cm-actions"><button class="btn btn-small btn-primary" data-act="chatPlay" data-c="${cid}" data-i="${i}">${IC.sound} Ouvir</button><button class="btn btn-small btn-ghost" data-act="chatReveal" data-i="${i}">Mostrar texto</button></div></div>`
      : `<span class="jp cb-jp">${esc(m.jp)}</span>${set.ro || m.showRo ? `<span class="ro">${esc(m.ro)}</span>` : ''}${set.pt || m.showPt ? `<span class="cb-pt">${esc(m.pt)}</span>` : `<button class="link-btn cb-tr" data-act="chatShowPt" data-i="${i}">ver tradução</button>`}`;
    return `<div class="cm char${m.init ? ' init' : ''}"><div class="cm-av">${chPortrait(cid, 30)}</div><div class="cb">${inner}${hide ? '' : chPlayBtn(m.jp, cid, i, 'Ouvir a fala de ' + c.name)}</div></div>`;
  }
  if (m.from === 'me') {
    const k = KIND_INFO[m.kind];
    return `<div class="cm me"><div class="cb"><span class="cb-me">${esc(m.txt)}</span>${k && m.kind !== 'free' ? `<span class="cm-kind k-${m.kind}">${k.ic} ${esc(k.t)}${m.xp ? ` · +${m.xp} XP` : ''}</span>` : m.kind === 'meta' ? '<span class="cm-kind k-meta">Pedido de ajuda</span>' : ''}</div></div>`;
  }
  // mensagens do sistema
  if (m.kind === 'topic') return `<div class="cm-topic"><span>Assunto: ${esc(m.txt)}</span></div>`;
  if (m.kind === 'note') return `<div class="cm-topic"><span>${esc(m.txt)}</span></div>`;
  if (m.kind === 'done') return `<div class="cm-done">✓ Conversa concluída: <b>${esc(m.txt)}</b>${m.xp ? ` · +${m.xp} XP` : ''}</div>`;
  if (m.kind === 'challenge') return `<div class="cm-done chal">挑 Desafio concluído: <b>${esc(m.txt)}</b> · +${m.xp} XP</div>`;
  if (m.kind === 'card') return `<div class="cm-card">${chCardHTML(m.card)}</div>`;
  if (m.kind === 'new') {
    return `<div class="cm-card new">${(m.items || []).map(id => { const it = ITEM[id]; if (!it) return ''; const fresh = (m.fresh || []).includes(id); return `<div class="cm-word"><span class="chip ${fresh ? 'k-new' : 'nova'}">${fresh ? 'Novo' : 'Revisão'}</span><span class="jp cm-jp">${esc(it.jp)}</span><span class="ro">${esc(it.ro)}</span><span>${esc(it.pt)}</span>${fresh && it.note ? `<span class="muted" style="font-size:.85rem">${esc(it.note)}</span>` : ''}${AUDIO.supported ? `<button class="link-btn" style="align-self:flex-start;padding:0" data-act="speak" data-text="${esc(it.say || it.jp)}">Ouvir</button>` : ''}</div>`; }).join('')}</div>`;
  }
  if (m.kind === 'teach') return `<div class="cm-card teach"><span class="chip k-new">Novo</span><span style="font-size:.9rem">${esc(m.why)}</span>${chModelHTML(m.model, ro ? null : cid)}</div>`;
  if (m.kind === 'hint') return `<div class="cm-card hint"><span class="eyebrow">${m.lv ? 'Dica ' + m.lv + '/5 · ' + esc(HINT_LV[m.lv]) : 'Ideias'}</span>${m.txt ? `<span style="font-size:.92rem">${esc(m.txt)}</span>` : ''}${m.model ? chModelHTML(m.model, ro ? null : cid) : ''}${(m.models || []).map(x => chModelHTML(x, ro ? null : cid)).join('')}${m.ideas ? `<div class="cm-ideas">${m.ideas.map(x => `<button class="idea" data-act="chatUse" data-text="${esc(x.jp)}"><b>${esc(x.idea || x.pt)}</b><span class="jp">${esc(x.jp)}</span><span class="ro">${esc(x.ro)}</span></button>`).join('')}</div>` : ''}</div>`;
  if (m.kind === 'fb') {
    const k = KIND_INFO[m.res] || KIND_INFO.unknown;
    return `<div class="cm-card fb fb-${m.res}"><span class="cm-fb-t">${k.ic} ${esc(k.t)}</span>${m.txt ? `<span style="font-size:.92rem">${esc(m.txt)}</span>` : ''}${m.model ? `<span class="eyebrow" style="margin-top:4px">${m.res === 'social' ? 'Mais natural aqui' : 'Forma correta'}</span>${chModelHTML(m.model, ro || !m.retry ? null : cid)}` : ''}${m.alts && m.alts.length ? `<details><summary class="muted" style="font-size:.85rem">Outras formas naturais</summary>${m.alts.map(a => chModelHTML(a)).join('')}</details>` : ''}${m.retry && !ro ? '<span class="muted" style="font-size:.85rem">Tente de novo: a conversa continua quando você responder.</span>' : ''}</div>`;
  }
  return '';
}

/* ---------- painel da conversa ---------- */
function chatOpen(cid) {
  const c = chChar(cid); if (!c) return;
  if (!chUnlocked(c)) { toast('鍵', c.unlock.txt); return; }
  stopAudio();
  CHV = { id: cid, gain: 0, busy: false, lastPlayed: chThread(cid).length };
  const st = chState(cid);
  if (!st.met && !st.active) chStartScene(cid, c.intro);
  st.unread = 0;
  save();
  $('#player').hidden = false; document.body.style.overflow = 'hidden';
  $('#player').innerHTML = chPaneHTML(cid);
  chRenderLog(true); chRenderExtra();
  updateTabDots();
  if (S.chat.settings.listen) chAutoPlay(cid, Math.max(0, chThread(cid).length - 3));
}
function chPaneHTML(cid) {
  const c = chChar(cid), set = S.chat.settings;
  const want = chWant(cid, chState(cid).active);
  const tg = (k, t, ic) => `<button class="tg ${set[k] ? 'on' : ''}" data-act="chatOpt" data-k="${k}" aria-pressed="${!!set[k]}">${ic || ''}${t}</button>`;
  return `<div class="chat-pane" data-char="${cid}">
    <header class="chat-head"><button class="icon-btn" data-act="chatClose" aria-label="Voltar para a central">${IC.back}</button>
      <div class="ch-av">${chPortrait(cid, 40)}</div>
      <div class="grow" style="min-width:0"><b class="ch-hname"><span class="jp">${esc(c.jp)}</span> ${esc(c.ro)}</b><span class="ch-hsub">${esc(c.rel)} · fala ${REG_SHORT[want]}</span></div>
      <button class="icon-btn" data-act="chatHistFromPane" aria-label="Histórico">${IC.hist}</button></header>
    <div class="chat-tools" role="group" aria-label="Opções de exibição">${tg('ro', 'Romaji')}${tg('pt', 'Tradução')}${tg('listen', 'Ouvir primeiro', IC.ear)}${tg('sugg', 'Sugestões')}</div>
    <div class="chat-log" id="chatLog" aria-live="polite"></div>
    <div class="chat-foot"><div id="chatExtra"></div>
      <div class="chat-input-row">
        <button class="icon-btn" data-act="chatHint" aria-label="Pedir dica">${IC.bulb}</button>
        <input id="chatIn" type="text" enterkeyhint="send" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="120" placeholder="Responda em romaji ou japonês" aria-label="Sua resposta">
        ${AUDIO.supported ? `<button class="icon-btn" data-act="chatSpeakMine" aria-label="Ouvir a minha frase">${IC.sound}</button>` : ''}
        <button class="icon-btn send" data-act="chatSend" aria-label="Enviar">${IC.send}</button>
      </div></div></div>`;
}
function chRenderLog(jump) {
  if (!CHV) return;
  const box = $('#chatLog'); if (!box) return;
  const th = chThread(CHV.id);
  const start = Math.max(0, th.length - 60);
  box.innerHTML = (start ? `<p class="muted" style="text-align:center;font-size:.8rem">Mensagens anteriores no Histórico.</p>` : '') + th.slice(start).map((m, k) => chMsgHTML(m, start + k, CHV.id)).join('');
  if (jump !== false) requestAnimationFrame(() => { box.scrollTop = box.scrollHeight; });
}
function chRenderExtra() {
  if (!CHV) return;
  const box = $('#chatExtra'); if (!box) return;
  const cid = CHV.id, st = chState(cid), act = st.active;
  let h = '';
  if (st.pending) h += `<div class="ch-pend"><span class="muted" style="font-size:.85rem">${esc(chChar(cid).name)} puxou assunto. Responda quando quiser.</span><button class="link-btn" data-act="chatDismiss" data-id="${cid}">Agora não</button></div>`;
  if (!act) {
    const open = chScenesFor(cid), locked = chLockedScenes(cid).length;
    h += `<div class="ch-topics"><span class="eyebrow">Escolha um assunto ou escreva para conversar livremente</span><div class="ch-chips">${open.map(sc => { const d = S.chat.scenes[sc.id]; return `<button class="ch-chip" data-act="chatScene" data-id="${sc.id}">${esc(sc.title)}${d && d.n ? '' : ' <span class="chip k-new">novo</span>'}</button>`; }).join('')}<button class="ch-chip free" data-act="chatFree">Conversa livre</button></div>${locked ? `<span class="muted" style="font-size:.8rem">+${locked} assunto${locked > 1 ? 's' : ''} libera${locked > 1 ? 'm' : ''} conforme você avança na Academia.</span>` : ''}</div>`;
  } else {
    const sc = act.scene ? CH_SCENE[act.scene] : null;
    h += `<div class="ch-cur"><span class="muted" style="font-size:.8rem">${sc ? 'Assunto: ' + esc(sc.title) : 'Conversa livre'}</span><button class="link-btn" data-act="chatEnd">${act.free ? 'Encerrar' : 'Trocar de assunto'}</button></div>`;
    if (S.chat.settings.sugg) { const sg = chSuggestions(cid); if (sg.length) h += `<div class="ch-sugg">${sg.map(x => `<button class="sugg" data-act="chatUse" data-text="${esc(x.jp)}"><span class="jp">${esc(x.jp)}</span><span class="ro">${esc(x.ro)}</span></button>`).join('')}</div>`; }
  }
  box.innerHTML = h;
}
function chatClose() {
  stopAudio();
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
    const m = th[i]; if (m.from !== 'char') continue;
    if (my !== AUDIO.token || !CHV) return;
    AUDIO.token = my - 1;
    const ok = await speak(m.say || m.jp, { pitch: c.pitch, rate: m.slow ? 0.62 : undefined, key: 'ch' + i });
    if (!ok || AUDIO.token !== my) return;
    await new Promise(r => setTimeout(r, 300));
  }
}
async function chatSend() {
  if (!CHV || CHV.busy) return;
  const inp = $('#chatIn'); if (!inp) return;
  const text = inp.value.trim().slice(0, 120);
  if (!text) { inp.focus(); return; }
  const cid = CHV.id, st = chState(cid);
  CHV.busy = true;
  stopAudio();
  if (!st.active) { st.active = { scene: null, node: 'free', tries: 0, hint: 0, tags: [], start: Date.now(), ctx: {}, free: true }; chPush(cid, { from: 'sys', kind: 'topic', txt: 'Conversa livre' }); }
  st.pending = null; st.lastAt = Date.now();
  const before = chThread(cid).length;
  inp.value = '';
  let res = null;
  try {
    res = await CHAT_BRAINS[chatBrainId()].reply({ char: cid, text, scene: st.active && st.active.scene, node: st.active && st.active.node, register: chWant(cid, st.active), tier: chTier() });
  } catch (e) { chPush(cid, { from: 'sys', kind: 'note', txt: 'Algo deu errado ao processar a mensagem. Tente de novo.' }); }
  CHV.busy = false;
  if (res && ['ok', 'variant'].includes(res.kind)) sfx('ok'); else if (res && ['grammar', 'vocab'].includes(res.kind)) sfx('bad'); else sfx('tap');
  save();
  chRenderLog(); chRenderExtra();
  const ph = $('.chat-head .ch-hsub'); if (ph) { const c = chChar(cid); ph.textContent = c.rel + ' · fala ' + REG_SHORT[chWant(cid, chState(cid).active)]; }
  if (S.chat.settings.listen) chAutoPlay(cid, before);
  const inp2 = $('#chatIn'); if (inp2 && !matchMedia('(pointer: coarse)').matches) inp2.focus();
}

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
  chatDismiss: el => { chDismiss(el.dataset.id); if (CHV) { chRenderLog(); chRenderExtra(); } else render(); },
  chatScene: el => { if (!CHV) return; const sc = CH_SCENE[el.dataset.id]; if (!sc || !chSceneOpen(sc)) { toast('鍵', 'Este assunto ainda não está liberado.'); return; } const n = chThread(CHV.id).length; chStartScene(CHV.id, sc.id); save(); chRenderLog(); chRenderExtra(); if (S.chat.settings.listen) chAutoPlay(CHV.id, n); },
  chatFree: () => { if (!CHV) return; const n = chThread(CHV.id).length; chStartFree(CHV.id); save(); chRenderLog(); chRenderExtra(); if (S.chat.settings.listen) chAutoPlay(CHV.id, n); },
  chatEnd: () => { if (!CHV) return; const st = chState(CHV.id); if (st.active && st.active.free) chEndFree(CHV.id, st.active); else { st.active = null; st.pending = null; chPush(CHV.id, { from: 'sys', kind: 'note', txt: 'Assunto encerrado. Escolha outro quando quiser.' }); } save(); chRenderLog(); chRenderExtra(); },
  chatHint: () => { if (!CHV) return; const st = chState(CHV.id); if (!st.active) { toast('光', 'Escolha um assunto primeiro, ou escreva um cumprimento para conversar livremente.'); return; } chHint(CHV.id); save(); chRenderLog(); chRenderExtra(); },
  chatUse: el => { const i = $('#chatIn'); if (!i) return; i.value = el.dataset.text; i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (e) {} },
  chatOpt: el => { const k = el.dataset.k; S.chat.settings[k] = !S.chat.settings[k]; save(); el.classList.toggle('on', S.chat.settings[k]); el.setAttribute('aria-pressed', S.chat.settings[k]); chRenderLog(false); chRenderExtra(); },
  chatReveal: el => { const m = chThread(CHV.id)[+el.dataset.i]; if (m) { m.rv = true; save(); chRenderLog(false); } },
  chatShowPt: el => { const m = chThread(CHV.id)[+el.dataset.i]; if (m) { m.showPt = true; save(); chRenderLog(false); } },
  chatPlay: el => { const cid = el.dataset.c, m = chThread(cid)[+el.dataset.i]; if (!m) return; speak(m.say || m.jp, { pitch: (chChar(cid) || {}).pitch, rate: m.slow ? 0.62 : undefined }); },
  chatSpeakMine: () => {
    const v = ($('#chatIn') || {}).value || '';
    if (!v.trim()) { toast('音', 'Escreva a sua frase para ouvi-la antes de enviar.'); return; }
    let t = v;
    if (!/[぀-ヿ一-鿿]/.test(v)) { try { t = NQK.r2k(v.toLowerCase().replace(/[^a-z' .,!?-]/g, '')); } catch (e) { toast('音', 'Não consegui ler esse romaji. Confira a escrita.'); return; } }
    speak(t);
  }
});
document.addEventListener('keydown', e => {
  if (e.target && e.target.id === 'chatIn' && e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); chatSend(); }
  if (e.key === 'Escape' && CHV && $('#modal').hidden) chatClose();
});
function homeChatCard() {
  const un = CHAT_CHARS.filter(c => chUnlocked(c) && chState(c.id).unread);
  if (un.length) {
    const c = un[0], last = [...chThread(c.id)].reverse().find(m => m.from === 'char');
    return `<section class="section"><div class="card ch-home"><div class="mascot-tip" style="align-items:center">${chPortrait(c.id, 52)}<div style="min-width:0"><span class="eyebrow">Nihongo Chat · nova mensagem</span><h3 style="font-size:1.02rem">${esc(c.name)}: <span class="jp">${esc(last ? last.jp : '')}</span></h3>${un.length > 1 ? `<span class="muted" style="font-size:.85rem">e mais ${un.length - 1} ${un.length - 1 === 1 ? 'mensagem' : 'mensagens'}</span>` : ''}</div></div><div class="row-btns"><button class="btn btn-gold btn-small" data-act="chatOpen" data-id="${c.id}">Responder</button><button class="btn btn-ghost btn-small" data-act="nav" data-view="chat">Ver o chat</button></div></div></section>`;
  }
  return `<section class="section"><div class="card ch-home"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big">${IC.chat}</span><div style="min-width:0"><span class="eyebrow">Novo · Nihongo Chat</span><h3 style="font-size:1.05rem">Use o que aprendeu numa conversa</h3><span class="muted" style="font-size:.85rem">${CHAT_CHARS.filter(chUnlocked).map(c => c.name).join(', ')} ${CHAT_CHARS.filter(chUnlocked).length > 1 ? 'estão' : 'está'} te esperando.</span></div></div><div class="row-btns"><button class="btn btn-primary btn-small" data-act="nav" data-view="chat">Abrir o chat</button></div></div></section>`;
}
