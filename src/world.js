/* ==========================================================
   Nihongo Quest 8.0 — LIVING JAPANESE WORLD (motor e interface)
   - Mapa de Hikari-machi → lugar → situação (cena com falas, escolhas, escuta).
   - Áudio: voz japonesa do aparelho (speak), cada personagem com seu tom; repetir, devagar,
     por partes, velocidade ajustável e modo "ouvir primeiro".
   - Palavras do mundo viram itens 'world:<chave>'. Salvar no Caderno usa o item que já existe
     no app quando a palavra já existe (sem duplicar). Nada aqui marca lição, avaliação ou
     conteúdo da Listening Academy como estudado.
   - XP só na primeira conclusão de cada situação (+ bônus único sem erros). Repetir é livre, sem XP.
   ========================================================== */
const WORLD_LESSON = { id: 'world', title: 'Living Japanese World', kind: 'audio', cat: { id: 'world', title: 'Living Japanese World' }, index: 0, items: [] };
const WW = {};
Object.keys(WORLD_WORDS).forEach(k => {
  const [jp, kana, ro, pt, note, g] = WORLD_WORDS[k].split('|');
  const w = { key: k, jp, kana, ro, pt, note: note || '', expr: g === 'e' };
  const say = kana.split('・')[0].replace(/〜/g, '');
  const it = { k, jp: jp.replace(/〜/g, ''), say, ro: ro.replace(/^~\s*/, ''), pt, group: w.expr ? 'expressao' : 'palavra', kanji: /[一-鿿]/.test(jp) ? jp.replace(/〜/g, '') : '', note: w.note, id: 'world:' + k, lesson: WORLD_LESSON };
  if (!ITEM[it.id]) { ITEM[it.id] = it; WORLD_LESSON.items.push(it); }
  w.itemId = it.id; w.say = say;
  WW[k] = w;
});
const WSC = {}; WORLD_SCENES.forEach(sc => { WSC[sc.id] = sc; });
const WPL = {}; WORLD_PLACES.forEach(p => { WPL[p.id] = p; });
const W_XP = { missao: 20, historia: 15, evento: 5 };
const W_KIND = { missao: ['任', 'Missão'], historia: ['話', 'História'], evento: ['!', 'Acontecimento'] };

Object.assign(IC, {
  world: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/></svg>',
  back: IC.back || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
});

/* ---------- estado ---------- */
function wState() {
  if (!isPlainObj(S.world)) S.world = defaultWorld();
  const w = S.world;
  ['visits', 'scenes', 'met', 'words'].forEach(k => { if (!isPlainObj(w[k])) w[k] = {}; });
  if (!isPlainObj(w.opt)) w.opt = { ro: true, pt: true, listen: false };
  if (!RATES[w.speed]) w.speed = 'normal';
  return w;
}
const wDone = id => { const r = wState().scenes[id]; return !!(r && r.done); };
const wOpen = sc => !sc.need || sc.need.every(wDone);
const wRate = () => RATES[wState().speed] || RATES.normal;
const wName = () => (S.profile && S.profile.name || '').trim() || 'Aluno';
const wPlaceScenes = (pid, kind) => WORLD_SCENES.filter(sc => sc.place === pid && (!kind || (kind === 'evento' ? sc.kind === 'evento' : sc.kind !== 'evento')));
function wPlaceProgress(pid) { const all = wPlaceScenes(pid).filter(sc => sc.kind !== 'evento'); return { done: all.filter(sc => wDone(sc.id)).length, total: all.length }; }
function wPlaceWords(pid) { const out = []; wPlaceScenes(pid).forEach(sc => sc.words.forEach(k => { if (!out.includes(k)) out.push(k); })); return out; }

/* ---------- falas ---------- */
function wFill(s) { return String(s || '').replace(/\{name\}/g, wName()); }
function wLine(str, me) {
  const f = wFill(str).split('|');
  const [sp, jpRaw, ro, pt, say] = me ? ['me', f[0], f[1], f[2], f[3]] : f;
  const parts = jpRaw.split('/').map(x => x.trim()).filter(Boolean);
  const jp = parts.join('');
  const c = WORLD_CHARS[sp];
  // texto entre parênteses é ação (não é falado)
  const spoken = (say || jp).replace(/[（(][^）)]*[）)]/g, '').replace(/[…・]/g, '').trim();
  return { sp, jp, parts: parts.length > 1 ? parts : [], ro: ro || '', pt: pt || '', say: /[぀-ヿ一-鿿0-9]/.test(spoken) ? spoken : '', pitch: me ? 1 : (c && c.pitch) || 1 };
}
async function wSay(lines, slow) {
  lines = lines.filter(l => l && l.say);
  if (!lines.length || !AUDIO.supported) return;
  const my = ++AUDIO.token;
  for (let i = 0; i < lines.length; i++) {
    if (AUDIO.token !== my) return;
    AUDIO.token = my - 1; // speak() incrementa; a sequência continua dona do token
    const ok = await speak(lines[i].say, { pitch: lines[i].pitch, rate: slow ? 0.6 : wRate(), key: lines[i].key });
    if (!ok || AUDIO.token !== my) return;
    if (!window.__NQ_FAST) await new Promise(r => setTimeout(r, 260));
  }
}

/* ---------- retratos ---------- */
function wPortrait(id, size = 44) {
  if (id === 'me') return `<span class="w-me-av" style="width:${size}px;height:${size}px" aria-hidden="true">${esc(wName().slice(0, 1).toUpperCase())}</span>`;
  const c = WORLD_CHARS[id]; if (!c) return '';
  if (c.chat && typeof chPortrait === 'function') return chPortrait(c.chat, size);
  if (c.speaker) return `<svg class="ch-portrait" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="Alto-falante"><circle cx="50" cy="50" r="50" fill="#4b5170"/><path d="M28 42h12l16-13v42L40 58H28z" fill="#fff"/><path d="M64 38a16 16 0 0 1 0 24M71 31a26 26 0 0 1 0 38" stroke="#ffd877" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
  const L = c.look, h = L.hair;
  const face = `<ellipse cx="50" cy="56" rx="21" ry="24" fill="${L.skin}"/><ellipse cx="41" cy="58" rx="2.6" ry="3.4" fill="#2a2560"/><ellipse cx="59" cy="58" rx="2.6" ry="3.4" fill="#2a2560"/><ellipse cx="37" cy="65" rx="4" ry="2.2" fill="#ff9fb5" opacity=".55"/><ellipse cx="63" cy="65" rx="4" ry="2.2" fill="#ff9fb5" opacity=".55"/><path d="M44 70q6 5 12 0" stroke="#7a3b3b" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const top = 'M27 54c-2-18 9-28 23-28s25 10 23 28c-6-9-14-13-23-13s-17 4-23 13z';
  const hair = {
    short: `<path d="M28 52c-1-17 10-26 22-26s23 9 22 26c-5-8-13-12-22-12s-17 4-22 12z" fill="${h}"/>`,
    pony: `<path d="M71 42c11 4 13 20 6 30-2-9-4-15-9-20z" fill="${h}"/><path d="${top}" fill="${h}"/>`,
    side: `<path d="M28 52c0-16 10-24 22-24s22 8 22 24c-8-12-28-14-44 0z" fill="${h}"/>`,
    bald: `<path d="M29 60c-3-5-3-11 0-15M71 60c3-5 3-11 0-15" stroke="${h}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    spiky: `<path d="M27 52l2-15 6 6 4-12 6 8 5-13 5 13 6-8 4 12 6-6 2 15c-6-8-14-11-23-11s-17 3-23 11z" fill="${h}"/>`,
    bun: `<circle cx="50" cy="25" r="9" fill="${h}"/><path d="${top}" fill="${h}"/>`,
    twin: `<circle cx="24" cy="50" r="8" fill="${h}"/><circle cx="76" cy="50" r="8" fill="${h}"/><path d="${top}" fill="${h}"/>`
  }[L.style] || '';
  const acc = {
    visor: '<path d="M26 44q24-11 48 0l-2 5q-22-8-44 0z" fill="#3fc48f"/>',
    glasses: '<circle cx="41" cy="58" r="6" fill="none" stroke="#2a2560" stroke-width="1.8"/><circle cx="59" cy="58" r="6" fill="none" stroke="#2a2560" stroke-width="1.8"/><path d="M47 58h6" stroke="#2a2560" stroke-width="1.8"/>',
    headband: '<path d="M28 44q22-8 44 0v6q-22-8-44 0z" fill="#ffffff" stroke="#d6dbe8" stroke-width="1"/>',
    cap: '<path d="M27 47c0-14 10-22 23-22s23 8 23 22z" fill="#1f3a8a"/><rect x="22" y="45" width="56" height="5" rx="2" fill="#16285e"/><circle cx="50" cy="35" r="3.2" fill="#f2b632"/>',
    police: '<path d="M27 47c0-14 10-22 23-22s23 8 23 22z" fill="#1d2f52"/><rect x="22" y="45" width="56" height="5" rx="2" fill="#0f1d38"/><path d="M50 31l4 3-1.5 5h-5L46 34z" fill="#f2b632"/>',
    hat: '<ellipse cx="50" cy="38" rx="31" ry="6" fill="#7a5a3a"/><path d="M33 38c0-13 7-17 17-17s17 4 17 17z" fill="#8a6a4a"/>',
    apron: '', none: ''
  }[L.acc] || '';
  const body = L.acc === 'apron' ? `<path d="M18 100q2-22 32-24 30 2 32 24z" fill="${L.top}"/><path d="M38 80h24v20H38z" fill="#2b2b4a"/>` : `<path d="M18 100q2-22 32-24 30 2 32 24z" fill="${L.top}"/>`;
  return `<svg class="ch-portrait" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="Retrato de ${esc(c.name)}"><circle cx="50" cy="50" r="50" fill="${L.bg}"/>${body}${face}${hair}${acc}</svg>`;
}

/* ---------- desenhos dos lugares (SVG original) ---------- */
function wBuilding(id) {
  const B = {
    konbini: '<rect x="-44" y="-52" width="88" height="52" rx="4" fill="#ffffff" stroke="#c8cfe2" stroke-width="2"/><rect x="-44" y="-52" width="88" height="9" fill="#22946a"/><rect x="-44" y="-43" width="88" height="4" fill="#f2b632"/><rect x="-44" y="-39" width="88" height="4" fill="#e0343c"/><rect x="-36" y="-29" width="26" height="29" fill="#bfe6ff" stroke="#8fb8d8" stroke-width="1.5"/><path d="M-23 -29v29" stroke="#8fb8d8" stroke-width="1.5"/><rect x="-4" y="-29" width="34" height="18" fill="#bfe6ff" stroke="#8fb8d8" stroke-width="1.5"/><text x="0" y="-45" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">HIKARI MART</text>',
    resutoran: '<path d="M-46 -40L0 -62 46 -40z" fill="#7a3b2a"/><rect x="-40" y="-40" width="80" height="40" fill="#f3dfc1" stroke="#c9a77c" stroke-width="2"/><rect x="-24" y="-34" width="48" height="16" fill="#d2463c"/><path d="M-12 -34v16M0 -34v16M12 -34v16" stroke="#f3dfc1" stroke-width="1.5"/><text x="0" y="-22" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="sans-serif">さくら</text><rect x="-12" y="-16" width="24" height="16" fill="#5a3a2a"/><circle cx="-32" cy="-24" r="6" fill="#e0343c"/><circle cx="32" cy="-24" r="6" fill="#e0343c"/>',
    eki: '<rect x="-56" y="-46" width="112" height="46" rx="3" fill="#e8ecf8" stroke="#b9c2de" stroke-width="2"/><path d="M-60 -46h120l-8 -10h-104z" fill="#3553d1"/><circle cx="0" cy="-30" r="9" fill="#fff" stroke="#3553d1" stroke-width="2.5"/><path d="M0 -30v-5M0 -30h4" stroke="#1c1f45" stroke-width="2" stroke-linecap="round"/><rect x="-48" y="-18" width="22" height="18" fill="#bfe6ff" stroke="#8fb8d8"/><rect x="26" y="-18" width="22" height="18" fill="#bfe6ff" stroke="#8fb8d8"/><rect x="-12" y="-16" width="24" height="16" fill="#3553d1" opacity=".85"/><text x="0" y="-4" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="sans-serif">駅</text>',
    gakkou: '<rect x="-52" y="-44" width="104" height="44" fill="#fbf4e6" stroke="#d8c9a8" stroke-width="2"/><rect x="-12" y="-66" width="24" height="24" fill="#fbf4e6" stroke="#d8c9a8" stroke-width="2"/><circle cx="0" cy="-55" r="7" fill="#fff" stroke="#7b52e0" stroke-width="2"/><path d="M0 -55v-4M0 -55h3" stroke="#1c1f45" stroke-width="1.6"/><g fill="#bfe6ff" stroke="#8fb8d8"><rect x="-46" y="-36" width="14" height="11"/><rect x="-28" y="-36" width="14" height="11"/><rect x="14" y="-36" width="14" height="11"/><rect x="32" y="-36" width="14" height="11"/><rect x="-46" y="-20" width="14" height="11"/><rect x="32" y="-20" width="14" height="11"/></g><rect x="-10" y="-20" width="20" height="20" fill="#7b52e0"/><circle cx="-62" cy="-28" r="14" fill="#ffb7cc"/><rect x="-64" y="-16" width="4" height="16" fill="#8a5a3a"/>',
    machi: '<rect x="-54" y="-34" width="34" height="34" fill="#fde1b8" stroke="#d9b07a" stroke-width="2"/><rect x="-17" y="-40" width="34" height="40" fill="#e6f0d8" stroke="#a9c48a" stroke-width="2"/><rect x="20" y="-34" width="34" height="34" fill="#fdd6d6" stroke="#d9a0a0" stroke-width="2"/><path d="M-58 -50h116" stroke="#e0861e" stroke-width="6" stroke-linecap="round"/><path d="M-50 -50v50M50 -50v50" stroke="#e0861e" stroke-width="5"/><text x="0" y="-54" text-anchor="middle" font-size="9" font-weight="800" fill="#7a4a10" font-family="sans-serif">商店街</text><circle cx="-36" cy="-42" r="4" fill="#e0343c"/><circle cx="0" cy="-44" r="4" fill="#e0343c"/><circle cx="36" cy="-42" r="4" fill="#e0343c"/><rect x="-46" y="-14" width="18" height="14" fill="#8a5a3a"/><rect x="-8" y="-16" width="16" height="16" fill="#5a7a3a"/><rect x="28" y="-14" width="18" height="14" fill="#8a3a3a"/>'
  };
  return B[id] || '';
}
const W_POS = { eki: [180, 98], konbini: [74, 206], resutoran: [286, 206], gakkou: [84, 352], machi: [276, 352] };
function wMapSVG() {
  const label = p => { const [x, y] = W_POS[p.id], pr = wPlaceProgress(p.id), visited = !!wState().visits[p.id]; return `<g class="w-pin" data-act="wPlace" data-p="${p.id}" role="button" tabindex="0" aria-label="${esc(p.pt)} (${esc(p.jp)}), ${pr.done} de ${pr.total} situações" transform="translate(${x} ${y})"><ellipse cx="0" cy="2" rx="58" ry="8" fill="#000" opacity=".12"/>${wBuilding(p.id)}<g transform="translate(0 16)"><rect x="-44" y="0" width="88" height="22" rx="11" fill="${p.color}"/><text x="0" y="15" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="M PLUS Rounded 1c, sans-serif">${esc(p.jp)}</text></g>${pr.done === pr.total ? '<g transform="translate(44 -48)"><circle r="10" fill="#f2b632" stroke="#fff" stroke-width="2"/><path d="M-4 0l3 3 5-6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>' : !visited ? '<g transform="translate(44 -48)"><circle r="9" fill="#e0343c" stroke="#fff" stroke-width="2"/><text y="4" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">!</text></g>' : ''}</g>`; };
  return `<svg class="w-map" viewBox="0 0 360 420" role="group" aria-label="Mapa de Hikari-machi">
    <defs><linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#e8f6ff"/></linearGradient></defs>
    <rect width="360" height="420" rx="22" fill="#c8e6a8"/><rect width="360" height="54" rx="22" fill="url(#wsky)"/><rect y="30" width="360" height="24" fill="url(#wsky)"/>
    <circle cx="318" cy="28" r="13" fill="#ffd877"/><path d="M30 26q10-10 22 0q8-8 18 2h-40z" fill="#fff"/>
    <rect y="48" width="360" height="12" fill="#8a8fa8"/><path d="M0 51h360M0 57h360" stroke="#d4d7e6" stroke-width="1.5"/><path d="M8 48v12M28 48v12M48 48v12M68 48v12M88 48v12M108 48v12M128 48v12M148 48v12M168 48v12M188 48v12M208 48v12M228 48v12M248 48v12M268 48v12M288 48v12M308 48v12M328 48v12M348 48v12" stroke="#6d7290" stroke-width="2"/>
    <rect x="236" y="40" width="70" height="20" rx="6" fill="#3553d1"/><rect x="242" y="44" width="10" height="8" rx="1" fill="#bfe6ff"/><rect x="258" y="44" width="10" height="8" rx="1" fill="#bfe6ff"/><rect x="274" y="44" width="10" height="8" rx="1" fill="#bfe6ff"/><rect x="290" y="44" width="10" height="8" rx="1" fill="#bfe6ff"/>
    <rect x="166" y="120" width="28" height="300" fill="#d9dbe6"/><rect x="0" y="262" width="360" height="28" fill="#d9dbe6"/><path d="M180 128v284M8 276h344" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/>
    <g fill="#5fae5a"><circle cx="20" cy="120" r="14"/><circle cx="338" cy="120" r="14"/><circle cx="150" cy="320" r="10"/><circle cx="212" cy="320" r="10"/><circle cx="24" cy="404" r="12"/><circle cx="336" cy="404" r="12"/></g>
    <g fill="#ffb7cc"><circle cx="40" cy="112" r="8"/><circle cx="322" cy="246" r="7"/></g>
    ${WORLD_PLACES.map(label).join('')}
  </svg>`;
}

/* ---------- tela do mundo ---------- */
const WUI = { place: null };
function wOptsHTML() {
  const w = wState();
  const tg = (k, t) => `<button class="tg ${w.opt[k] ? 'on' : ''}" data-act="wOpt" data-k="${k}" aria-pressed="${!!w.opt[k]}">${t}</button>`;
  return `<div class="w-opts" role="group" aria-label="Opções de leitura e áudio">${tg('ro', 'Romaji')}${tg('pt', 'Tradução')}${tg('listen', 'Ouvir primeiro')}<div class="seg w-speed" role="group" aria-label="Velocidade da voz">${[['lenta', 'Lenta'], ['normal', 'Normal'], ['rapida', 'Rápida']].map(([v, t]) => `<button class="${w.speed === v ? 'on' : ''}" data-act="wSpeed" data-v="${v}" aria-pressed="${w.speed === v}">${t}</button>`).join('')}</div></div>`;
}
function wWordsSummary() {
  const w = wState(), keys = Object.keys(WW), found = keys.filter(k => w.words[k]);
  return { found: found.length, total: keys.length, saved: found.filter(wWordSaved).length };
}
function viewWorld() {
  wState();
  if (WUI.place && WPL[WUI.place]) return viewWorldPlace(WPL[WUI.place]);
  const w = wState(), ws = wWordsSummary();
  const done = WORLD_SCENES.filter(sc => wDone(sc.id)).length;
  const intro = !w.intro ? `<div class="card mascot-tip w-intro">${mascot('happy', 64)}<div><b>Bem-vindo(a) a Hikari-machi!</b><p style="margin:4px 0 8px">Aqui você usa japonês para viver pequenas situações: comprar, pedir comida, pegar trem, ir à escola. Toque num lugar do mapa para entrar. Você pode ouvir tudo antes de ler, e não existe pressa nem obrigação.</p><button class="btn btn-primary btn-small" data-act="wIntroOk">Entendi, vamos explorar!</button></div></div>` : '';
  return `<div class="wrap w-root"><div class="page-title"><div><span class="jp">ひかり町</span><h1>Living Japanese World</h1></div></div>
    <div class="stack">${intro}
    <div class="card w-mapcard">${wMapSVG()}</div>
    <section class="section"><h2 style="font-size:1.05rem">Lugares</h2><div class="w-places">${WORLD_PLACES.map(p => { const pr = wPlaceProgress(p.id); return `<button class="w-place-row" data-act="wPlace" data-p="${p.id}" style="--pc:${p.color}"><span class="w-pic jp">${esc(p.icon)}</span><span class="grow"><b><span class="jp">${esc(p.jp)}</span> · ${esc(p.pt)}</b><small>${esc(p.desc)}</small></span><span class="w-prog tabnum">${pr.done}/${pr.total}</span></button>`; }).join('')}</div></section>
    <div class="card w-stats"><div><b class="tabnum">${done}</b><small>situações vividas</small></div><div><b class="tabnum">${ws.found}/${ws.total}</b><small>palavras descobertas</small></div><div><b class="tabnum">${ws.saved}</b><small>no Caderno</small></div></div>
    <p class="muted" style="margin:0 2px;font-size:.82rem">O mundo é livre: as situações não contam como lições da Academia nem da Listening Academy. Cada situação dá XP só na primeira vez que você a conclui.</p></div></div>`;
}
function wGreet(p) {
  const host = WORLD_CHARS[p.host]; if (!host || !host.greet) return '';
  const w = wState(), back = (w.visits[p.id] || 0) > 1 && wPlaceProgress(p.id).done > 0;
  const L = wLine(p.host + '|' + host.greet[back ? 1 : 0]);
  return `<div class="w-greet">${wPortrait(p.host, 46)}<div class="w-bub"><b class="w-who">${esc(host.name)}</b><span class="jp w-jp">${esc(L.jp)}</span>${w.opt.ro ? `<span class="ro">${esc(L.ro)}</span>` : ''}${w.opt.pt ? `<span class="w-pt">${esc(L.pt)}</span>` : ''}</div>${AUDIO.supported ? `<button class="icon-btn" data-act="wSayText" data-text="${esc(L.say)}" data-sp="${p.host}" aria-label="Ouvir ${esc(host.name)}">${IC.sound}</button>` : ''}</div>`;
}
function wSceneCard(sc) {
  const open = wOpen(sc), done = wDone(sc.id), st = wState().scenes[sc.id] || {};
  const [ic, kt] = W_KIND[sc.kind];
  const lock = !open ? `Depois de: ${sc.need.filter(id => !wDone(id)).map(id => WSC[id].title).join(', ')}` : '';
  return `<button class="w-scene ${done ? 'done' : ''} ${open ? '' : 'locked'}" data-act="wStart" data-id="${sc.id}" ${open ? '' : 'aria-disabled="true"'}>
    <span class="w-kic jp">${done ? '✓' : open ? ic : IC.lock}</span>
    <span class="grow"><small class="eyebrow">${kt}${done ? ' · concluída' + (st.perfect ? ' sem erros' : '') : ''}</small><b>${esc(sc.title)}</b><small class="muted">${esc(open ? sc.desc : lock)}</small></span>
    ${open && !done ? `<span class="w-xp tabnum">+${W_XP[sc.kind]} XP</span>` : ''}</button>`;
}
function viewWorldPlace(p) {
  const w = wState();
  const chars = Object.keys(WORLD_CHARS).filter(id => WORLD_CHARS[id].place === p.id && id !== 'ann' && (WORLD_SCENES.some(sc => sc.place === p.id && sc.kind !== 'evento' && sc.chars.includes(id)) || WORLD_SCENES.some(sc => sc.kind === 'evento' && sc.chars.includes(id) && wDone(sc.id))));
  const words = wPlaceWords(p.id), found = words.filter(k => w.words[k]);
  const events = wPlaceScenes(p.id, 'evento');
  return `<div class="wrap w-placev" style="--pc:${p.color}">
    <div class="w-ptop"><button class="icon-btn" data-act="wMap" aria-label="Voltar ao mapa">${IC.back}</button><span class="muted" style="font-size:.85rem">Hikari-machi</span></div>
    <div class="w-banner"><div class="w-btxt"><span class="jp w-bjp">${esc(p.jp)}</span><b>${esc(p.pt)} · ${esc(p.name)}</b><small>${esc(p.desc)}</small></div><svg class="w-bsvg" viewBox="-70 -75 140 85" aria-hidden="true">${wBuilding(p.id)}</svg></div>
    <div class="stack">${wGreet(p)}
    <section class="section"><h2 style="font-size:1.02rem">Quem está aqui</h2><div class="w-chars">${chars.map(id => `<button class="w-char" data-act="wProfile" data-c="${id}">${wPortrait(id, 52)}<span>${esc(WORLD_CHARS[id].name)}</span><small>${esc(WORLD_CHARS[id].role)}</small></button>`).join('')}</div></section>
    <section class="section"><h2 style="font-size:1.02rem">Situações</h2><div class="stack" style="gap:8px">${wPlaceScenes(p.id, 'main').map(wSceneCard).join('')}</div></section>
    ${events.length ? `<section class="section"><h2 style="font-size:1.02rem">Explorar as ruas</h2><button class="card w-walk" data-act="wWalk"><span class="w-kic jp">歩</span><span class="grow"><b>Dar uma volta</b><small class="muted">Ande pelo bairro e veja o que acontece. ${events.filter(sc => wDone(sc.id)).length}/${events.length} acontecimentos descobertos.</small></span></button>${events.filter(sc => wDone(sc.id)).length ? `<div class="stack" style="gap:8px;margin-top:8px">${events.filter(sc => wDone(sc.id)).map(wSceneCard).join('')}</div>` : ''}</section>` : ''}
    <section class="section"><h2 style="font-size:1.02rem">Palavras daqui <small class="muted tabnum">${found.length}/${words.length}</small></h2>
      ${found.length ? `<div class="card w-words">${found.map(wWordRow).join('')}</div>` : ''}
      ${found.length < words.length ? `<p class="muted" style="margin:6px 2px 0;font-size:.85rem">${words.length - found.length} palavra(s) ainda escondida(s) nas situações deste lugar.</p>` : ''}
      ${found.some(k => !wWordSaved(k)) ? `<button class="btn btn-ghost btn-block" style="margin-top:8px" data-act="wSaveAll" data-keys="${found.join(',')}">Salvar as descobertas no Caderno e na Revisão</button>` : ''}</section>
    </div></div>`;
}
function wWordRow(k) {
  const w = WW[k], saved = wWordSaved(k);
  return `<div class="w-wrow"><div class="grow"><span class="jp w-wjp">${esc(w.jp)}</span>${w.jp !== w.kana ? ` <span class="jp muted" style="font-size:.85rem">${esc(w.kana)}</span>` : ''}<span class="ro"> ${esc(w.ro)}</span><small class="w-wpt">${esc(w.pt)}</small></div>
    ${AUDIO.supported ? `<button class="icon-btn" data-act="wSayText" data-text="${esc(w.say)}" aria-label="Ouvir ${esc(w.ro)}">${IC.sound}</button>` : ''}
    <button class="icon-btn" data-act="wDict" data-k="${k}" aria-label="Abrir no dicionário"><span class="jp" style="font-weight:800">辞</span></button>
    ${saved ? '<span class="w-saved" aria-label="No Caderno">✓</span>' : `<button class="icon-btn" data-act="wSave" data-k="${k}" aria-label="Salvar no Caderno e na Revisão">＋</button>`}</div>`;
}

/* ---------- palavras: Caderno, Revisão, Dicionário ---------- */
function wEntry(k) {
  const w = WW[k]; if (!w || typeof dictBuild !== 'function') return null;
  dictBuild();
  const r = KANA.kata2hira(w.say);
  return (DICT.byWord[r] || []).find(e => e.items.includes(w.itemId)) || null;
}
function wWordSaved(k) {
  const w = WW[k]; if (!w) return false;
  const e = wEntry(k);
  if (e && dictInNotebook(e)) return true;
  const r = S.items[w.itemId]; return !!(r && r.seen);
}
/* se a palavra já está no Caderno por outra área (Academia, Chat, Dicionário...), não duplica;
   senão entra como item do mundo (origem certa no Caderno e nada muda na Listening Academy) */
function wSaveWord(k) {
  const w = WW[k]; if (!w || wWordSaved(k)) return false;
  markSeen(w.itemId);
  wState().words[k] = wState().words[k] || Date.now();
  save(); return true;
}

/* ---------- cena ---------- */
let WV = null;
function wStart(id) {
  const sc = WSC[id]; if (!sc) return;
  if (!wOpen(sc)) { toast('鍵', 'Faça antes: ' + sc.need.filter(x => !wDone(x)).map(x => WSC[x].title).join(', ') + '.'); return; }
  stopAudio(); closeModal();
  WV = { sc, log: [], mode: 'go', next: null, choice: null, wrong: 0, picked: [], miss: '', result: null };
  $('#player').hidden = false; document.body.style.overflow = 'hidden';
  $('#player').innerHTML = wPaneHTML();
  wEnter(Object.keys(sc.nodes)[0]);
}
function wClose() {
  stopAudio(); WV = null;
  $('#player').hidden = true; $('#player').innerHTML = ''; document.body.style.overflow = '';
  render(); setTimeout(flushPending, 200);
}
function wPaneHTML() {
  const sc = WV.sc, p = WPL[sc.place];
  return `<div class="w-pane" style="--pc:${p.color}">
    <header class="w-head"><button class="icon-btn" data-act="wClose" aria-label="Sair da situação">${IC.back}</button>
      <div class="grow" style="min-width:0"><small class="eyebrow">${esc(W_KIND[sc.kind][1])} · ${esc(p.pt)}</small><b class="w-htitle">${esc(sc.title)}</b></div>
      <svg class="w-hsvg" viewBox="-70 -75 140 85" aria-hidden="true">${wBuilding(p.id)}</svg></header>
    <div id="wOpts">${wOptsHTML()}</div>
    <div class="w-log" id="wLog" aria-live="polite"></div>
    <div class="w-foot" id="wFoot"></div></div>`;
}
function wLog(e) { WV.log.push(e); return WV.log.length - 1; }
function wEnter(id, pre) {
  if (!WV) return;
  const sc = WV.sc, node = sc.nodes[id];
  if (!node) return wFinish('');
  if (node.b) { const b = node.b; return wEnter(b.done && wDone(b.done) ? b.y : b.n, pre); }
  const speakList = (pre || []).slice();
  if (node.n) wLog({ k: 'nar', txt: node.n });
  [].concat(node.s || []).forEach(s => { const L = wLine(s); const i = wLog({ k: 'line', ...L }); L.key = 'w' + i; speakList.push(L); });
  if (node.tip) wLog({ k: 'tip', txt: node.tip });
  (node.t || []).forEach(k => { if (!WW[k]) return; const w = wState(); const seen = !!w.words[k]; if (!seen) w.words[k] = Date.now(); wLog({ k: 'teach', key: k, seen }); });
  WV.miss = '';
  if (node.p) {
    WV.mode = 'pick'; WV.pick = node.p; WV.picked = [];
    if (node.p.say) { const L = wLine(node.p.say); const i = wLog({ k: 'line', ...L, quiz: true }); L.key = 'w' + i; WV.pickLine = i; speakList.push(L); } else WV.pickLine = null;
  } else if (node.o) { WV.mode = 'opts'; WV.choice = id; }
  else if (node.end) { wFinish(node.end); return wAutoSay(speakList); }
  else if (node.back) WV.mode = 'back';
  else { WV.mode = 'go'; WV.next = node.go; }
  save();
  wRender();
  wAutoSay(speakList);
}
function wAutoSay(list) { if (S.settings.sound !== false && list.length) wSay(list); }
function wLineHTML(e, i) {
  const o = wState().opt, me = e.sp === 'me', c = WORLD_CHARS[e.sp];
  const hide = (e.quiz && !e.rev) || (o.listen && !e.rev && !me);
  const name = me ? 'Você' : c ? c.name : '';
  const text = hide
    ? `<button class="w-hidden" data-act="wReveal" data-i="${i}">${IC.sound}<span>${e.quiz ? 'Ouça e escolha abaixo' : 'Ouça primeiro · toque para ver o texto'}</span></button>`
    : `${e.open && e.parts.length ? `<div class="w-parts">${e.parts.map(pt => `<button class="w-part" data-act="wSayText" data-text="${esc(pt.replace(/[（(][^）)]*[）)]/g, ''))}" data-sp="${esc(e.sp)}">${esc(pt)}</button>`).join('')}</div>` : `<span class="jp w-jp">${esc(e.jp)}</span>`}${o.ro && e.ro ? `<span class="ro">${esc(e.ro)}</span>` : ''}${o.pt && e.pt ? `<span class="w-pt">${esc(e.pt)}</span>` : ''}`;
  const acts = e.say && AUDIO.supported ? `<div class="w-acts"><button class="w-a" data-act="wPlay" data-i="${i}">${IC.sound}<span>Ouvir</span></button><button class="w-a" data-act="wSlow" data-i="${i}"><span>Devagar</span></button>${e.parts.length && !hide ? `<button class="w-a ${e.open ? 'on' : ''}" data-act="wParts" data-i="${i}" aria-pressed="${!!e.open}"><span>Por partes</span></button>` : ''}</div>` : '';
  return `<div class="w-line ${me ? 'me' : ''} dlg-line" data-line="w${i}">${me ? '' : `<button class="w-av" data-act="wProfile" data-c="${esc(e.sp)}" aria-label="Sobre ${esc(name)}">${wPortrait(e.sp, 40)}</button>`}<div class="w-bub"><b class="w-who">${esc(name)}</b>${text}${acts}</div>${me ? wPortrait('me', 34) : ''}</div>`;
}
function wTeachHTML(e) {
  const w = WW[e.key], saved = wWordSaved(e.key);
  return `<div class="w-teach"><div class="w-teach-h"><span class="chip ${e.seen ? '' : 'nova'}">${e.seen ? 'Você já viu' : 'Nova'}</span>${w.expr ? '<span class="muted" style="font-size:.8rem">expressão</span>' : ''}</div>
    <div class="w-teach-b"><span class="jp w-tjp">${esc(w.jp)}</span>${w.jp !== w.kana ? `<span class="jp muted">${esc(w.kana)}</span>` : ''}<span class="ro">${esc(w.ro)}</span><b class="w-tpt">${esc(w.pt)}</b>${w.note ? `<small class="muted">${esc(w.note)}</small>` : ''}</div>
    <div class="w-teach-a">${AUDIO.supported ? `<button class="w-a" data-act="wSayText" data-text="${esc(w.say)}">${IC.sound}<span>Ouvir</span></button>` : ''}<button class="w-a" data-act="wDict" data-k="${e.key}"><span class="jp">辞</span><span>Dicionário</span></button>${saved ? '<span class="w-a done">✓ No Caderno</span>' : `<button class="w-a" data-act="wSave" data-k="${e.key}"><span>＋ Caderno e Revisão</span></button>`}</div></div>`;
}
function wEntryHTML(e, i) {
  if (e.k === 'nar') return `<p class="w-nar">${esc(e.txt)}</p>`;
  if (e.k === 'line') return wLineHTML(e, i);
  if (e.k === 'tip') return `<div class="w-tip"><span class="eyebrow">Nota</span><span>${esc(e.txt)}</span></div>`;
  if (e.k === 'teach') return wTeachHTML(e);
  if (e.k === 'fb') return `<div class="w-fb w-fb-${e.tag}"><b>${e.tag === 'x' ? 'Ops! Mal-entendido' : e.tag === 'ok' ? 'Isso!' : 'Funciona'}</b><span>${esc(e.txt)}</span></div>`;
  if (e.k === 'end') return wEndHTML(e);
  return '';
}
function wEndHTML(e) {
  const sc = WV ? WV.sc : WSC[e.sc];
  const r = e.res;
  const reward = r.xp ? `<b class="w-reward">+${r.xp} XP${r.coins ? ' · +' + r.coins + ' moedas' : ''}</b>` : `<span class="muted" style="font-size:.88rem">${r.first ? '' : 'Você já tinha concluído esta situação: repetir é ótimo para praticar, mas não dá XP de novo.'}</span>`;
  const unsaved = sc.words.filter(k => !wWordSaved(k));
  return `<div class="w-end card"><span class="eyebrow">${r.first ? 'Situação concluída!' : 'Concluída de novo'}</span>${e.txt ? `<p style="margin:2px 0 6px">${esc(e.txt)}</p>` : ''}${reward}${r.perfect ? '<small class="chip nova" style="align-self:flex-start">Sem mal-entendidos</small>' : ''}
    <div class="w-words" style="margin-top:8px">${sc.words.map(wWordRow).join('')}</div>
    ${unsaved.length ? `<button class="btn btn-ghost btn-block" data-act="wSaveAll" data-keys="${sc.words.join(',')}">Salvar ${unsaved.length > 1 ? 'as ' + unsaved.length + ' palavras' : 'a palavra'} no Caderno e na Revisão</button>` : ''}</div>`;
}
function wRender() {
  if (!WV) return;
  const log = $('#wLog'); if (!log) return;
  log.innerHTML = WV.log.map(wEntryHTML).join('');
  const f = $('#wFoot');
  if (WV.mode === 'opts') {
    const node = WV.sc.nodes[WV.choice], o = wState().opt;
    f.innerHTML = `<p class="w-ask">Sua vez: o que você diz?</p><div class="w-optlist">${node.o.map((op, j) => { const L = wLine(op[0], true); return `<div class="w-opt-row"><button class="w-opt" data-act="wChoose" data-j="${j}"><span class="jp w-ojp">${esc(L.jp)}</span>${o.ro ? `<span class="ro">${esc(L.ro)}</span>` : ''}${o.pt ? `<span class="w-pt">${esc(L.pt)}</span>` : ''}</button>${L.say && AUDIO.supported ? `<button class="icon-btn" data-act="wSayText" data-text="${esc(L.say)}" aria-label="Ouvir esta resposta">${IC.sound}</button>` : ''}</div>`; }).join('')}</div>`;
  } else if (WV.mode === 'pick') {
    const p = WV.pick, o = wState().opt;
    f.innerHTML = `<p class="w-ask">${esc(p.q)}</p>${WV.miss ? `<p class="w-miss" role="status">${esc(WV.miss)}</p>` : ''}<div class="w-pick">${p.items.map((it, j) => { const [jp, ro, pt] = it[0].includes('|') ? it[0].split('|') : ['', '', it[0]]; const bad = WV.picked.includes(j); return `<button class="w-pk ${bad ? 'bad' : ''} ${jp ? '' : 'ptonly'}" data-act="wPick" data-j="${j}" ${bad ? 'disabled' : ''}>${it[3] ? wVis(it[3]) : ''}${jp ? `<span class="jp w-pjp">${esc(jp)}</span>${o.ro ? `<span class="ro">${esc(ro)}</span>` : ''}` : `<span>${esc(pt)}</span>`}</button>`; }).join('')}</div>${p.say && AUDIO.supported ? `<button class="btn btn-ghost btn-block" data-act="wPlay" data-i="${WV.pickLine}">${IC.sound} Ouvir de novo</button>` : ''}`;
  } else if (WV.mode === 'go') f.innerHTML = `<button class="btn btn-primary btn-block" data-act="wGo">Continuar</button>`;
  else if (WV.mode === 'back') f.innerHTML = `<button class="btn btn-gold btn-block" data-act="wBack">Tentar de novo</button>`;
  else if (WV.mode === 'end') {
    const sc = WV.sc, nextSc = wPlaceScenes(sc.place, 'main').find(x => x.id !== sc.id && wOpen(x) && !wDone(x.id));
    f.innerHTML = `<div class="w-endbtns">${nextSc ? `<button class="btn btn-primary btn-block" data-act="wStart" data-id="${nextSc.id}">Próxima: ${esc(nextSc.title)}</button>` : ''}<button class="btn btn-ghost btn-block" data-act="wReplay">Viver de novo</button><button class="btn btn-ghost btn-block" data-act="wClose">Voltar para ${esc(WPL[sc.place].pt.toLowerCase())}</button></div>`;
  } else f.innerHTML = '';
  requestAnimationFrame(() => { const l = $('#wLog'); if (l) l.scrollTop = l.scrollHeight; });
}
function wVis(v) {
  const [kind, a, b] = v.split(':');
  if (kind === 'cat') return `<svg class="w-vis" viewBox="0 0 60 48" aria-hidden="true"><path d="M14 18l4-12 8 9h10l8-9 4 12c4 4 6 9 6 14 0 9-10 14-22 14S10 41 10 32c0-5 1-10 4-14z" fill="${a}" stroke="#8a8fa8" stroke-width="2"/><circle cx="23" cy="27" r="2.4" fill="#2a2560"/><circle cx="37" cy="27" r="2.4" fill="#2a2560"/><path d="M27 33q3 3 6 0" stroke="#d8476a" stroke-width="2" fill="none"/><path d="M22 39q8 5 16 0" stroke="${b}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="30" cy="42" r="3.4" fill="${b}"/></svg>`;
  if (kind === 'arrow') { const d = { L: 'M30 42V18H14M20 12l-6 6 6 6', R: 'M30 42V18h16M40 12l6 6-6 6', B: 'M30 8v26M22 26l8 8 8-8' }[a]; return `<svg class="w-vis" viewBox="0 0 60 48" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`; }
  return '';
}
function wChoose(j) {
  const node = WV.sc.nodes[WV.choice], op = node.o[j]; if (!op) return;
  const L = wLine(op[0], true);
  const i = wLog({ k: 'line', ...L }); L.key = 'w' + i;
  if (op[1] === 'x') { WV.wrong++; wLog({ k: 'fb', tag: 'x', txt: op[3] || '' }); }
  else if (op[3]) wLog({ k: 'fb', tag: 'k', txt: op[3] });
  wEnter(op[2], [L]);
}
function wPick(j) {
  const p = WV.pick, it = p.items[j]; if (!it || WV.picked.includes(j)) return;
  if (it[1]) {
    if (WV.pickLine != null) WV.log[WV.pickLine].rev = true;
    const label = it[0].includes('|') ? it[0].split('|') : [it[0], '', ''];
    wLog({ k: 'fb', tag: 'ok', txt: label[1] ? `${label[0]} (${label[1]}): ${label[2]}` : label[0] });
    sfx('ok'); wEnter(p.go);
  } else {
    WV.wrong++; WV.picked.push(j); WV.miss = it[2] || p.miss || 'Não é esse. Ouça de novo.';
    sfx('bad'); wRender();
    if (WV.pickLine != null) wPlayLine(WV.pickLine);
  }
}
function wPlayLine(i, slow) { const e = WV && WV.log[i]; if (e && e.say) wSay([{ say: e.say, pitch: e.pitch, key: 'w' + i }], slow); }
function wFinish(txt) {
  const sc = WV.sc, w = wState(), now = Date.now();
  const st = w.scenes[sc.id] || (w.scenes[sc.id] = { done: 0, n: 0, perfect: false });
  const first = !st.done, perfect = WV.wrong === 0;
  let xp = 0, coins = 0;
  if (first) { xp = W_XP[sc.kind] + (perfect ? 5 : 0); coins = sc.kind === 'evento' ? 2 : 5; st.done = now; st.perfect = perfect; }
  else if (perfect && !st.perfect) { xp = 5; st.perfect = true; } // bônus sem erros, uma única vez
  st.n = (st.n || 0) + 1; st.last = now;
  sc.chars.forEach(c => { w.met[c] = (w.met[c] || 0) + 1; });
  if (xp) addXP(xp);
  if (coins) addCoins(coins);
  WV.result = { xp, coins, first, perfect };
  wLog({ k: 'end', txt, res: WV.result, sc: sc.id });
  WV.mode = 'end';
  if (xp) { sfx('level'); if (first) confetti(); }
  checkAchievements(); save();
  wRender();
}
function wWalk() {
  const ev = wPlaceScenes(WUI.place || 'machi', 'evento'); if (!ev.length) return;
  const fresh = ev.filter(sc => !wDone(sc.id));
  wStart(pick(fresh.length ? fresh : ev).id);
}
function wProfileHTML(id) {
  const c = WORLD_CHARS[id]; if (!c) return '';
  const met = wState().met[id] || 0;
  return `<div class="stack w-prof"><div class="w-prof-h">${wPortrait(id, 72)}<div><span class="jp" style="font-size:1.2rem;font-weight:800">${esc(c.jp)}</span><h2 style="font-size:1.15rem">${esc(c.name)}</h2><span class="muted">${esc(c.role)}${WPL[c.place] ? ' · ' + esc(WPL[c.place].pt) : ''}</span></div></div>
    <p style="margin:0">${esc(c.bio || '')}</p>${c.likes ? `<p style="margin:0"><b>Gosta de:</b> ${esc(c.likes)}</p>` : ''}<p style="margin:0"><b>Jeito de falar:</b> ${esc(c.style || '')}</p>
    <p class="muted" style="margin:0;font-size:.88rem">${met ? `Vocês já se encontraram ${met} ${met > 1 ? 'vezes' : 'vez'}.` : 'Vocês ainda não se encontraram.'}${c.chat ? ' Também conversa com você no Nihongo Chat.' : ''}</p>
    <button class="btn btn-ghost btn-block" data-act="closeModal">Fechar</button></div>`;
}

/* avanço automático (testes): escolhe a resposta natural, acerta a escuta */
function wAuto() {
  if (!WV) return;
  if (WV.mode === 'go') return wEnter(WV.next);
  if (WV.mode === 'back') { WV.mode = 'opts'; return wRender(); }
  if (WV.mode === 'opts') { const o = WV.sc.nodes[WV.choice].o; return wChoose(Math.max(0, o.findIndex(x => x[1] !== 'x'))); }
  if (WV.mode === 'pick') return wPick(WV.pick.items.findIndex(i => i[1]));
}

/* ---------- ações ---------- */
Object.assign(ACT, {
  wPlace: el => { const id = el.dataset.p; if (!WPL[id]) return; const w = wState(); w.visits[id] = (w.visits[id] || 0) + 1; save(); WUI.place = id; if (view !== 'mundo') go('mundo'); else { render(); window.scrollTo(0, 0); } checkAchievements(); },
  wMap: () => { WUI.place = null; render(); window.scrollTo(0, 0); },
  wIntroOk: () => { wState().intro = Date.now(); save(); render(); },
  wStart: el => wStart(el.dataset.id),
  wReplay: () => { if (WV) wStart(WV.sc.id); },
  wClose: () => wClose(),
  wGo: () => { if (WV && WV.mode === 'go') wEnter(WV.next); },
  wBack: () => { if (WV) { WV.mode = 'opts'; wRender(); } },
  wChoose: el => { if (WV && WV.mode === 'opts') wChoose(+el.dataset.j); },
  wPick: el => { if (WV && WV.mode === 'pick') wPick(+el.dataset.j); },
  wPlay: el => wPlayLine(+el.dataset.i),
  wSlow: el => wPlayLine(+el.dataset.i, true),
  wParts: el => { const e = WV && WV.log[+el.dataset.i]; if (e) { e.open = !e.open; wRender(); } },
  wReveal: el => { const e = WV && WV.log[+el.dataset.i]; if (!e) return; if (e.quiz) { wPlayLine(+el.dataset.i); return; } e.rev = true; wRender(); },
  wSayText: el => { const c = WORLD_CHARS[el.dataset.sp]; wSay([{ say: el.dataset.text, pitch: c ? c.pitch : 1 }]); },
  wOpt: el => { const w = wState(); w.opt[el.dataset.k] = !w.opt[el.dataset.k]; save(); if (WV) { const o = $('#wOpts'); if (o) o.innerHTML = wOptsHTML(); wRender(); } else render(); },
  wSpeed: el => { const w = wState(); w.speed = el.dataset.v; save(); if (WV) { const o = $('#wOpts'); if (o) o.innerHTML = wOptsHTML(); } else render(); },
  wSave: el => { if (wSaveWord(el.dataset.k)) toast('帳', 'No Caderno e na Revisão!'); if (WV) wRender(); else render(); },
  wSaveAll: el => { let n = 0; el.dataset.keys.split(',').forEach(k => { if (wSaveWord(k)) n++; }); toast('帳', n ? n + (n > 1 ? ' palavras foram' : ' palavra foi') + ' para o Caderno e a Revisão.' : 'Essas palavras já estavam no Caderno.'); if (WV) wRender(); else render(); },
  wDict: el => { const k = el.dataset.k, e = wEntry(k); if (e) dictOpen(e); else dictOpenWord(WW[k].jp); },
  wProfile: el => { if (WORLD_CHARS[el.dataset.c]) openModal(wProfileHTML(el.dataset.c), 'w-sheet'); },
  wWalk: () => wWalk(),
  gotoWorld: () => { WUI.place = null; go('mundo'); }
});

/* ---------- integrações com as telas existentes ---------- */
VIEWS.push('mundo');
const _wNav = ACT.nav;
ACT.nav = (el, e) => { if (el.dataset.view === 'mundo') WUI.place = null; return _wNav(el, e); };
const _wRender = render;
render = function () {
  if (view === 'mundo' && S.profile.onboarded) {
    $('#tabbar').hidden = false; ensureDaily();
    $('#view').innerHTML = viewWorld();
    document.querySelectorAll('.tab').forEach(t => { const on = t.dataset.view === 'mundo'; t.classList.toggle('active', on); t.setAttribute('aria-current', on ? 'page' : 'false'); });
    updateTabDots(); return;
  }
  _wRender();
};
/* celebrações (subir de nível) esperam a situação terminar */
const _wFlush = flushPending;
flushPending = function () { if (WV) return; _wFlush(); };
const _wOrigin = originOf;
originOf = function (it) { return it && it.lesson === WORLD_LESSON ? 'Living Japanese World' : _wOrigin(it); };
const _wHome = homeListenCard;
homeListenCard = function () {
  const done = WORLD_SCENES.filter(sc => wDone(sc.id)).length;
  return `<section class="section"><div class="card w-homecard"><div class="mascot-tip" style="align-items:center"><span class="mod-ic big jp" style="font-size:1.3rem">街</span><div style="min-width:0"><span class="eyebrow">Novo · Living Japanese World</span><h3 style="font-size:1.05rem">Viva o japonês em Hikari-machi</h3><span class="muted" style="font-size:.85rem">${done ? done + ' situação(ões) vivida(s). Konbini, restaurante, estação, escola e rua comercial esperam por você.' : 'Compre no konbini, peça comida, pegue o trem e faça amigos na escola.'}</span></div></div><button class="btn btn-primary btn-small" data-act="gotoWorld">Explorar o mundo</button></div></section>` + _wHome();
};
ACHIEVEMENTS.push(
  { id: 'world_first', icon: '街', name: 'Morador novo', desc: 'Conclua sua primeira situação no Living Japanese World.', test: s => !!(s.world && Object.values(s.world.scenes || {}).some(x => x && x.done)) },
  { id: 'world_places', icon: '旅', name: 'Explorador de Hikari-machi', desc: 'Visite os cinco lugares do Living Japanese World.', test: s => !!(s.world && WORLD_PLACES.every(p => (s.world.visits || {})[p.id])) }
);
/* novidade da 8.0: aviso único para quem já usava o app */
setTimeout(() => { try { const w = wState(); if (S.profile.onboarded && !w.news) { w.news = Date.now(); save(); toast('街', 'Novo na 8.0: Living Japanese World! Toque em “Mundo” para explorar.'); } } catch (e) {} }, 2600);
