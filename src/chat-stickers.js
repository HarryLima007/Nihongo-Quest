/* ==========================================================
   NIHONGO CHAT 5.0 — figurinhas (ilustrações originais em SVG)
   Cada personagem tem o próprio conjunto de expressões; Hikari, o
   espírito guia do app, é o conjunto básico do aluno.
   Algumas figurinhas ensinam expressões (entram no Caderno e na Revisão).
   ========================================================== */
const CH_EMOS = ['joy', 'laugh', 'surprise', 'shy', 'doubt', 'sad', 'excited', 'celebrate', 'approve', 'confused'];
const CH_EMO_PT = { joy: 'Alegria', laugh: 'Risada', surprise: 'Surpresa', shy: 'Vergonha', doubt: 'Dúvida', sad: 'Tristeza', excited: 'Empolgação', celebrate: 'Comemoração', approve: 'Aprovação', confused: 'Confusão', thanks: 'Agradecimento', bye: 'Despedida' };
/* legenda de cada figurinha: japonês, romaji, tradução e (opcional) expressão ensinada */
const CH_STK_CAP = {
  hikari: { joy: ['うれしい！', 'ureshii!', 'Que alegria!', 'ureshii'], laugh: ['笑', 'wara', '(risos)', 'wara'], surprise: ['えっ！', 'e!', 'Hã?!'], shy: ['はずかしい', 'hazukashii', 'Que vergonha', 'hazukashii'], doubt: ['ん？', 'n?', 'Hum?'],
    sad: ['かなしい', 'kanashii', 'Que triste'], excited: ['すごい！', 'sugoi!', 'Incrível!', 'sugoi'], celebrate: ['やった！', 'yatta!', 'Consegui! / Aê!', 'yatta'], approve: ['いいね！', 'ii ne!', 'Curti! / Boa!'], confused: ['わからない', 'wakaranai', 'Não entendi'],
    thanks: ['ありがとう！', 'arigatou!', 'Obrigado(a)!'], bye: ['またね！', 'mata ne!', 'Até mais!', 'matane'] },
  ren: { joy: ['よっしゃ！', 'yossha!', 'Isso aí!'], laugh: ['笑笑', 'warawara', 'kkkk', 'wara'], surprise: ['マジ？！', 'maji?!', 'Sério?!', 'maji'], shy: ['てへっ', 'tehe', 'Hehe (sem graça)'], doubt: ['ん？', 'n?', 'Hã?'],
    sad: ['まけた…', 'maketa…', 'Perdi…', 'makeru'], excited: ['かっこいい！', 'kakkoii!', 'Que maneiro!', 'kakkoii'], celebrate: ['やった！', 'yatta!', 'Aê!', 'yatta'], approve: ['いいね！', 'ii ne!', 'Boa!'], confused: ['え？', 'e?', 'Hein?'] },
  aiko: { joy: ['うれしいです', 'ureshii desu', 'Fico feliz', 'ureshii'], laugh: ['ふふっ', 'fufu', 'Hihi'], surprise: ['まあ！', 'maa!', 'Oh!'], shy: ['てれますね', 'teremasu ne', 'Que vergonha'], doubt: ['どうして？', 'doushite?', 'Por quê?'],
    sad: ['ざんねん…', 'zannen…', 'Que pena…', 'zannen'], excited: ['すばらしい！', 'subarashii!', 'Maravilhoso!'], celebrate: ['おめでとう！', 'omedetou!', 'Parabéns!', 'omedetou'], approve: ['はなまる！', 'hanamaru!', 'Nota dez! (flor de aprovação)'], confused: ['あら？', 'ara?', 'Ué?'] },
  yumi: { joy: ['わーい！', 'waai!', 'Oba!'], laugh: ['あははっ', 'ahaha', 'Hahaha'], surprise: ['えー！？', 'ee!?', 'Quêêê?!'], shy: ['はずかしい…', 'hazukashii…', 'Que vergonha…', 'hazukashii'], doubt: ['なになに？', 'nani nani?', 'O quê, o quê?'],
    sad: ['えーん', 'een', 'Buáá'], excited: ['かわいい！', 'kawaii!', 'Que fofo!', 'kawaii'], celebrate: ['やったー！', 'yattaa!', 'Ebaaa!', 'yatta'], approve: ['すごい！', 'sugoi!', 'Incrível!', 'sugoi'], confused: ['はてな？', 'hatena?', 'Hein?'] },
  takeshi: { joy: ['うれしいです', 'ureshii desu', 'Fico contente', 'ureshii'], laugh: ['ははは', 'hahaha', 'Hahaha'], surprise: ['なんと！', 'nanto!', 'Mas que coisa!'], shy: ['きょうしゅくです', 'kyoushuku desu', 'Fico sem jeito'], doubt: ['はて？', 'hate?', 'Hum?'],
    sad: ['ざんねんです', 'zannen desu', 'Que pena', 'zannen'], excited: ['おすすめです！', 'osusume desu!', 'Recomendo!', 'osusume'], celebrate: ['おめでとう ございます', 'omedetou gozaimasu', 'Meus parabéns', 'omedetou'], approve: ['かしこまりました', 'kashikomarimashita', 'Entendido (formal)'], confused: ['しょうしょう…', 'shoushou…', 'Um momento…'] }
};
const CH_STK_SETS = ['hikari', 'ren', 'aiko', 'yumi', 'takeshi'];
const CH_STK = {};
CH_STK_SETS.forEach(set => Object.keys(CH_STK_CAP[set]).forEach(emo => { const [jp, ro, pt, item] = CH_STK_CAP[set][emo]; const id = set + '-' + emo; CH_STK[id] = { id, set, emo, jp, ro, pt, item: item || null }; }));
function chStkSetName(set) { return set === 'hikari' ? 'Hikari' : (chChar(set) || {}).name || set; }
/* conjuntos que o aluno pode usar: Hikari sempre; de cada personagem, depois de conhecê-lo */
function chStkSetsFor() { return CH_STK_SETS.filter(s => s === 'hikari' || (chUnlocked(chChar(s)) && chState(s).met)); }

/* ---------- desenho ---------- */
function chStkSVG(id, size = 96) {
  const s = CH_STK[id]; if (!s) return '';
  const SK = '#ffe2cc', INK = '#2a2560';
  const L = [41, 56], R = [59, 56];
  const my = s.set === 'takeshi' ? 70 : 68;
  const BG = { hikari: '#e9e2ff', ren: '#dfe6ff', aiko: '#ece3ff', yumi: '#ffe1ec', takeshi: '#ddf3e8' }[s.set];
  const RING = { hikari: '#9a86f0', ren: '#3553d1', aiko: '#6c43dd', yumi: '#d0517a', takeshi: '#1f9461' }[s.set];
  const blush = (o = .55, big) => `<ellipse cx="36" cy="63" rx="${big ? 6 : 4}" ry="${big ? 3 : 2.2}" fill="#ff8fb0" opacity="${o}"/><ellipse cx="64" cy="63" rx="${big ? 6 : 4}" ry="${big ? 3 : 2.2}" fill="#ff8fb0" opacity="${o}"/>`;
  const dot = ([x, y], r = 3) => `<ellipse cx="${x}" cy="${y}" rx="${r * .85}" ry="${r * 1.15}" fill="${INK}"/><circle cx="${x + 1}" cy="${y - 1.4}" r="${r * .35}" fill="#fff"/>`;
  const arc = ([x, y], up = true) => `<path d="M${x - 5} ${y + (up ? 2 : -2)}q5 ${up ? -7 : 7} 10 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const star = ([x, y], r = 5.5, f = '#f2b632') => { let d = ''; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1); } return `<path d="${d}z" fill="${f}" stroke="#b97a00" stroke-width=".8"/>`; };
  const spiral = ([x, y]) => `<path d="M${x} ${y}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.6 0a3.6 3.6 0 1 1 7.2 0a4.6 4.6 0 1 1-9.4 0" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  const drop = (x, y, c = '#6fb7ff') => `<path d="M${x} ${y}q-4 6 0 8q4-2 0-8z" fill="${c}" stroke="#fff" stroke-width=".8"/>`;
  const E = {
    joy: arc(L) + arc(R) + `<path d="M43 ${my}q7 9 14 0z" fill="#d8476a"/>` + blush(.6),
    laugh: `<path d="M37 53l7 3.5-7 3.5M63 53l-7 3.5 7 3.5" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M41 ${my - 2}q9 14 18 0z" fill="#d8476a" stroke="${INK}" stroke-width="1.2"/>` + drop(31, 56) + drop(69, 56) + blush(.6),
    surprise: `<circle cx="41" cy="56" r="5.2" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="59" cy="56" r="5.2" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="41" cy="56.5" r="2.6" fill="${INK}"/><circle cx="59" cy="56.5" r="2.6" fill="${INK}"/><ellipse cx="50" cy="${my + 2}" rx="3.6" ry="4.6" fill="#d8476a" stroke="${INK}" stroke-width="1.2"/><path d="M80 18v12M80 35v1" stroke="#e8463c" stroke-width="4" stroke-linecap="round"/><path d="M88 22v9M88 35v.5" stroke="#e8463c" stroke-width="3.2" stroke-linecap="round"/>`,
    shy: arc(L, false) + arc(R, false) + `<path d="M45 ${my + 1}q2.5-3 5 0q2.5 3 5 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>` + blush(.95, true) + `<path d="M31 61l3-3M34 63l3-3M63 61l3-3M66 63l3-3" stroke="#e0607e" stroke-width="1.4" stroke-linecap="round"/>` + drop(74, 40),
    doubt: dot(L) + `<path d="M55 56h8" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M36 47l9-2M55 46l9 3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><path d="M45 ${my + 1}l9-2" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><text x="82" y="34" font-size="22" font-weight="800" fill="${RING}" font-family="Nunito,system-ui,sans-serif" text-anchor="middle">?</text>`,
    sad: dot(L, 2.8) + dot(R, 2.8) + `<path d="M35 48l9 3M65 48l-9 3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><path d="M44 ${my + 3}q6-6 12 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + drop(38, 61) + drop(62, 61),
    excited: star(L, 6.2) + star(R, 6.2) + `<path d="M42 ${my - 1}q8 12 16 0z" fill="#d8476a" stroke="${INK}" stroke-width="1"/>` + blush(.6) + star([18, 30], 4, '#ffd877') + star([84, 26], 5, '#ffd877') + star([86, 46], 3, '#ffd877'),
    celebrate: arc(L) + arc(R) + `<path d="M42 ${my - 1}q8 12 16 0z" fill="#d8476a"/>` + blush(.6) + '<path d="M10 40l10-16 6 18z" fill="#f2b632" stroke="#b97a00" stroke-width="1"/><circle cx="16" cy="18" r="2.4" fill="#e8463c"/><circle cx="28" cy="14" r="2" fill="#3553d1"/><circle cx="22" cy="10" r="1.8" fill="#1f9461"/><rect x="78" y="14" width="4" height="4" fill="#e8463c" transform="rotate(20 80 16)"/><rect x="86" y="26" width="4" height="4" fill="#3553d1" transform="rotate(-15 88 28)"/><circle cx="84" cy="40" r="2" fill="#f2b632"/>',
    approve: arc(L) + dot(R) + `<path d="M43 ${my}q7 7 14 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + blush(.55) + (s.set === 'aiko' ? '<g transform="translate(83 28)"><circle r="11" fill="none" stroke="#e8463c" stroke-width="2.4"/><circle r="5" fill="none" stroke="#e8463c" stroke-width="2"/><path d="M-11 0q-5-9 2-13M11 0q5-9-2-13" stroke="#e8463c" stroke-width="2" fill="none"/></g>' : `<g transform="translate(83 30)"><circle r="11" fill="#1f9461"/><path d="M-5 0l3.5 4L6-4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`),
    confused: spiral(L) + spiral(R) + `<path d="M43 ${my + 1}q2-2.5 3.5 0t3.5 0t3.5 0t3.5 0" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>` + drop(72, 38),
    thanks: arc(L) + arc(R) + `<path d="M43 ${my}q7 8 14 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + blush(.6) + '<path d="M80 22c-3-5-10-2-7 4l7 7 7-7c3-6-4-9-7-4z" fill="#ff6f91"/>',
    bye: arc(L) + arc(R) + `<path d="M43 ${my - 1}q7 9 14 0z" fill="#d8476a"/>` + blush(.6) + '<g transform="translate(82 36) rotate(-15)"><rect x="-5" y="-9" width="10" height="16" rx="5" fill="#ffe2cc" stroke="#2a2560" stroke-width="1.2"/><path d="M-9 -12q-3 4 0 8M9 -12q3 4 0 8" stroke="#9a86f0" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>'
  }[s.emo] || '';
  const P = {
    hikari: { back: '', head: '<path d="M50 14c5 10 26 15 28 36 2 21-12 38-28 38S20 71 22 50c1-13 10-19 15-26 4-4 7-8 13-10z" fill="#f3efff" stroke="#9a86f0" stroke-width="2"/><path d="M50 14c2-7 9-10 14-7-5 0-8 3-9 8" fill="#e4dcff" stroke="#9a86f0" stroke-width="2" stroke-linejoin="round"/>', front: '' },
    ren: { back: '', head: `<ellipse cx="50" cy="54" rx="21" ry="24" fill="${SK}"/>`, front: '<path d="M27 52c-2-18 10-28 23-28s26 8 23 28l-5-10-4 7-5-11-4 9-6-10-4 10-5-8z" fill="#22224a"/><path d="M25 50a25 25 0 0 1 50 0" stroke="#f2b632" stroke-width="4" fill="none"/><rect x="21" y="48" width="9" height="15" rx="4" fill="#f2b632"/><rect x="70" y="48" width="9" height="15" rx="4" fill="#f2b632"/>' },
    aiko: { back: '<path d="M27 58c-4-22 6-34 23-34s27 12 23 34l-2 22H29z" fill="#4a2a1a"/>', head: `<ellipse cx="50" cy="54" rx="21" ry="24" fill="${SK}"/>`, front: '<circle cx="50" cy="20" r="9" fill="#4a2a1a"/><path d="M29 48c4-14 34-16 42 0-8-6-30-8-42 0z" fill="#4a2a1a"/><path d="M57 18l6-6" stroke="#f2b632" stroke-width="2.4" stroke-linecap="round"/>', glasses: true },
    yumi: { back: '<path d="M22 46c-8 6-8 26 2 34 4-10 4-22 6-30z" fill="#a8693a"/><path d="M78 46c8 6 8 26-2 34-4-10-4-22-6-30z" fill="#a8693a"/>', head: `<ellipse cx="50" cy="54" rx="21" ry="24" fill="${SK}"/>`, front: '<path d="M28 52c-2-18 9-28 22-28s25 10 22 28c-6-10-14-14-22-14s-16 4-22 14z" fill="#a8693a"/><path d="M66 32l2.2 4.4 4.8.6-3.5 3.3.9 4.7-4.4-2.3-4.4 2.3.9-4.7-3.5-3.3 4.8-.6z" fill="#ffd877"/>' },
    takeshi: { back: '', head: `<ellipse cx="50" cy="54" rx="21" ry="24" fill="${SK}"/>`, front: '<path d="M29 46c0-14 9-20 21-20s21 6 21 20c-6-6-14-8-21-8s-15 2-21 8z" fill="#3b2a20"/><path d="M28 42q22-8 44 0v6q-22-8-44 0z" fill="#ffffff" stroke="#d6dbe8" stroke-width="1"/><path d="M71 44l9 3-8 4" fill="#ffffff" stroke="#d6dbe8" stroke-width="1"/><path d="M43 65q7-3 14 0" stroke="#3b2a20" stroke-width="2.6" fill="none" stroke-linecap="round"/>' }
  }[s.set];
  const glasses = P.glasses ? `<circle cx="41" cy="56" r="6.5" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="59" cy="56" r="6.5" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M47.5 56h5" stroke="${INK}" stroke-width="1.6"/>` : '';
  const fs = Math.max(7.5, Math.min(13, 86 / Math.max(1, [...s.jp].length) * 1.05));
  return `<svg class="stk-svg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="Figurinha: ${esc(s.jp)} (${esc(s.pt)})">
    <circle cx="50" cy="48" r="44" fill="${BG}" stroke="#fff" stroke-width="4"/><circle cx="50" cy="48" r="44" fill="none" stroke="${RING}" stroke-width="1.4" opacity=".5"/>
    ${P.back}${P.head}${P.front}${E}${glasses}
    <rect x="8" y="80" width="84" height="18" rx="9" fill="#fff" stroke="${RING}" stroke-width="1.6"/>
    <text x="50" y="${89 + fs * .36}" font-size="${fs}" font-weight="800" fill="${INK}" text-anchor="middle" font-family="'M PLUS Rounded 1c','Hiragino Maru Gothic ProN',system-ui,sans-serif">${esc(s.jp)}</text></svg>`;
}
