/* ==========================================================
   NIHONGO CHAT 5.0 — motor da conversa livre
   - Entende a mensagem por intenção (não por frase exata): respostas curtas
     (うん, わたしも, へえ), reações (笑, すごい, マジ？), estados (ねむい, つかれた),
     perguntas de volta (レンは？), figurinhas e emojis.
   - Interpreta pelo contexto: o que o personagem acabou de perguntar (a "expectativa")
     decide o sentido de respostas curtas como 「わたしも」.
   - Nunca trata o que não entendeu como erro: o personagem pede para repetir.
   - Corrige pouco: só formalidade inadequada, com gentileza e no máximo uma vez por conversa.
   Continua sendo um sistema local de roteiros e intenções, não uma IA generativa.
   ========================================================== */

/* ---------- falas: 'jp|ro|pt' ---------- */
function chTL(s) { const [jp, ro, pt] = String(s).split('|'); return { jp: jp || '', ro: ro || '', pt: pt || '' }; }

/* ---------- registro das expectativas (ids estáveis para salvar no progresso) ---------- */
const CH_EXR = {};
(function regAll() {
  const walk = (o, path) => {
    if (Array.isArray(o)) { o.forEach((x, i) => walk(x, path + '.' + i)); return; }
    if (!o || typeof o !== 'object') return;
    Object.keys(o).forEach(k => {
      const v = o[k];
      if (k === 'ex' && v && typeof v === 'object' && !Array.isArray(v) && !v.__id) { v.__id = path + '.ex'; CH_EXR[v.__id] = v; }
      if (k !== '__id') walk(v, path + '.' + k);
    });
  };
  Object.keys(TALK).forEach(cid => {
    const T = TALK[cid];
    T.state.__id = cid + '.state'; CH_EXR[T.state.__id] = T.state; walk(T.state.on, cid + '.state.on');
    Object.keys(T.ex).forEach(n => { const e = T.ex[n]; e.__id = cid + '.ex.' + n; CH_EXR[e.__id] = e; walk(e.on || {}, e.__id + '.on'); });
    walk(T.react, cid + '.react');
    T.topics.forEach(t => walk(t.steps, cid + '.t.' + t.id));
  });
})();
function chExGet(cid, ref) {
  if (!ref) return null;
  if (typeof ref === 'object') return ref;
  if (CH_EXR[ref]) return CH_EXR[ref];
  const T = TALK[cid]; if (!T) return null;
  if (ref === 'state') return T.state;
  return T.ex[ref] || null;
}

/* ---------- reconhecimento de intenção ---------- */
const CH_EMOJI = [
  [/[😂🤣😆😹]|w{3,}/u, 'laugh'], [/[😄😁😊☺🙂😀😃🥰😍]/u, 'good'], [/[😮😲😯😱🙀‼]/u, 'surprise'], [/[😢😭😞😔🥲☹😿💔]/u, 'bad'],
  [/[🤔❓❔]/u, 'question'], [/[👍👌🙆✅💯]/u, 'okay'], [/[🎉🥳🎊✨]/u, 'yay'], [/[❤💕💖💗😘]/u, 'praise'], [/[😳🙈😅]/u, 'shy'],
  [/[😴💤🥱]/u, 'sleepy'], [/[🙏]/u, 'thanks'], [/[👋]/u, 'bye'], [/[😵🌀😵‍💫]/u, 'dontknow'], [/[🍜🍙🍣🍱🍔🍕]/u, 'hungry']
];
const CH_EMO_INTENT = { joy: 'good', laugh: 'laugh', surprise: 'surprise', shy: 'shy', doubt: 'question', sad: 'bad', excited: 'yay', celebrate: 'yay', approve: 'okay', confused: 'dontknow', thanks: 'thanks', bye: 'bye', love: 'praise' };
/* regras sobre a forma canônica (romaji sem espaços; kana e kanji já convertidos) */
const CH_RULES = [
  ['same', /^(watashi|watakushi|boku|ore|atashi|jibun|uchi|washi)?mo(sou|onaji|issho)?(da|desu)?(yo|ne|na|sa)*$/],
  ['same', /^(onaji|onnaji|doukan|issho|metoo|ditto)(da|desu)?(yo|ne|na|kamo)*$/],
  ['same', /^(watashi|watakushi|boku|ore|atashi|jibun)(mo|tomo)?(onaji|issho)(da|desu)?(yo|ne)*$/],
  ['yes', /^(unn?|unun|hai+|ee|aa|sou(sou)*|soudesu|souda|souyo|soudayo|soudesuyo|haisou(desu)?|unsou|mochiron|tabun|unsoudayo|sounandayo|sounandesu|hontouni|haihai)(yo|ne|na)*$/],
  ['no', /^(iie|iiya|iya|iyaiya|uun+|uuun+|ie|zenzen|chigau|chigaimasu|chigauyo|nai|naiyo|naidesu|arimasen|mada|madadesu|madamada|betsuni|sonnakoto(nai)?|souiu(wake)?janai|souja(nai)?|sounai)(yo|ne|desu)*$/],
  ['laugh', /^(w{2,}|(ha){2,}h?|(ah){2,}|(he){2,}|(hi){2,}|(fu){2,}|k{3,}|(rs)+|lol|lmao|wara(i|u|ta|eru)?|kusa|bakuwara|aha(ha)+|ehe(he)*|ufufu|haha)$/],
  ['ack', /^(he+|fu+n|fun|sounanda|sounandesu(ka|ne)?|sounan|naruhodo(ne|desu(ne)?)?|souka+|soudesuka|soudesune|soudane|soudayone|dayone|desuyone|wakaru(wakaru)?|wakarimasu|tashikani|ne+|nee+|sorena|soreda|sorewa(ii|yokatta)(desu)?(ne)?)$/],
  ['surprise', /^(e+|eh+|ee+|hontou(ni)?(desu)?(ka|ni)?|honto(ni)?(ka)?|maji(de|ka|desu(ka)?)?|uso(da|desho|deshou|daa)?|nanisore|nani|ara+|uwa+|wa+o?|oh+|wow|bikkuri|bikkurishita|odoroita|sugoikoto|masaka)$/],
  ['praise', /^(sugo(i|ii|e|ee|ku)|iine+|iidesune|iijan|kakkoi+|kakkou(ii|i)|kawai+|kawaisugi(ru)?|sasuga|subarashi+|suteki|erai|tensai|yarujan|yarune|kirei|oishisou|tanoshisou|omoshiro(i|sou)|saikou|ii)(desu|da)?(ne|na|yo|jan)*$/],
  ['yay', /^(yatta+|yattane|yattaa+|yossha|yoshi|banzai|iei|ie+i|yaho+|yahho+|waai+|wai+)$/],
  ['congrats', /^(omedetou|omedeto|omedetougozaimasu|omedetoune)$/],
  ['sympathy', /^(zannen(da|desu|deshita)?(ne|na|datta(ne)?)?|kawaisou(ni)?|taihen(da|desu|datta|deshita)?(ne|na)|donmai|odaijini|ganbatte(ne|kudasai)?|kiotsukete|daijoubu(desuka|ka|\?)?)$/],
  ['okay', /^(iiyo|iidesuyo|iidesu|ok|okk?e+|ookee|okkee|ryoukai(desu)?|ryo|wakatta|wakarimashita|kashikomarimashita|zehi|ikou|yarou|shiyou|ikuyo|iku|sansei|onegai(shimasu)?|haionegaishimasu|un(iiyo|onegai))$/],
  ['decline', /^((gomen|sumimasen)?(kyouwa|imawa)?(chotto|muri|kekkou(desu)?|enryoshimasu|matakondo|ikenai|ikanai|dekinai|isogashii))$/],
  ['shy', /^(hazukashii|hazukashi|tereru|tere|tehe|hazui)(desu|na|yo)?$/],
  ['some', /^(tokidoki|tamani|chotto|sukoshi|chottodake|maamaa)(desu|da|kana|yo|ne)*$/],
  ['dontknow', /^(wakaranai|wakannai|wakarimasen(deshita)?|shiranai|shirimasen|shiran|saa|ehto|etto|ee+tto|un+to|nandarou|nandeshou)(desu|na|yo|ne)*$/],
  ['why', /^(nande|naze|doushite|doushitedesuka|nandedesuka|nazedesuka|nanide)(ka|no)?$/],
  ['nice', /^(hajimemashite|yoroshiku(onegai(shimasu|itashimasu)?|ne|na)?|kochirakoso(yoroshiku)?(onegaishimasu)?|douzoyoroshiku(onegaishimasu)?)$/],
  ['browsing', /^(miteirudake|miterudake|mitedake|miteirudakedesu|miterudakedesu|tadamiteiru(dake)?(desu)?)$/],
  ['askback', /^((anata|kimi|omae|sensei|aikosensei|ren(kun|san|chan)?|yumi(chan|san)?|takeshi(san|sama)?|sochira|sotchi|soccha|minna|tenchou(san)?)(wa|mo|wadou|wadoudesuka|wadesuka|mo(dou)?|ha))$/],
  ['askback', /^(dou|doudesuka|douda|douna(no)?|sochirawa(dou(desuka)?)?)$/],
  ['hard', /^(muzukashii|muzukashi|muzui|taihen|kitsui)(desu|da|yo|ne)*$/],
  ['good', /^(tanoshii|tanoshi|tanoshiidesu|ureshii|ureshi|ureshiidesu|bacchiri|zecchouchou|saikou(desu)?|genki(da|desu)?(yo)?|daijoubu(da|desu)?(yo)?)$/]
];
/* palavras dentro de frases maiores (intenção secundária) */
const CH_PARTS = [
  ['bad', /(genki|choushi)(ja|jya|de(wa|ha))nai|amarigenki|yokunai|saiaku|kanashi|sabishi|tsurai|dame|byouki|atamagaitai|onakagaitai|kibungawarui/],
  ['sleepy', /nemu(i|kute|i)|nemutai|nemukatta|nebusoku|yofukashi/],
  ['tired', /tsukare(ta|teru|mashita)|kutakuta|hetoheto/],
  ['busy', /isogashi/],
  ['hungry', /onaka(ga)?(suita|suki(mashita)?|pekopeko)|harahetta|pekopeko/],
  ['hard', /muzukashi|muzui/],
  ['good', /genki|tanoshi|ureshi|saikou|daijoubu/],
  ['laugh', /(wara|w{2,}|(ha){3,}|k{3,})$/],
  ['ilike', /(dai)?suki(da|desu|dayo|na)?(yo|ne)*$|hamatte(ru|imasu)/],
  ['dislike', /kirai|nigate|suki(ja|jya|de(wa|ha))nai|amarisuki/],
  ['want', /(tabe|nomi|mi|iki|shi|kai|asobi|yari)tai|hoshii/],
  ['studying', /benkyou(shi|chuu|shiteru|shiteimasu)/],
  ['same', /^(watashi|watakushi|boku|ore|atashi|jibun)mo/],
  ['thanks', /arigat/],
  ['sorry', /^(gomen|sumimasen)/]
];
/* exemplos para tolerar erros de digitação curtos (watshi mo, arigato, hazukashi…) */
const CH_EXEMPLARS = {
  same: ['watashimo', 'bokumo', 'atashimo', 'watashimodesu'], yes: ['soudesu', 'soudesune'], no: ['zenzen', 'chigaimasu', 'iiedesu'],
  ack: ['naruhodo', 'sounanda', 'sounandesune', 'soudesuka'], surprise: ['hontouni', 'hontou', 'bikkuri'], praise: ['sugoidesune', 'kakkoii', 'kawaii', 'subarashii', 'sasuga'],
  dontknow: ['wakaranai', 'wakarimasen', 'shiranai'], okay: ['ryoukai', 'wakatta', 'wakarimashita', 'kashikomarimashita'], congrats: ['omedetou'], yay: ['yattaa'],
  sympathy: ['zannen', 'donmai', 'ganbatte'], shy: ['hazukashii']
};
/* frases em português (o aluno às vezes escreve em português): entende e mostra como seria em japonês */
const CH_PT = [
  [/^(eu tamb[eé]m|tamb[eé]m|eu tbm|tbm)\b/i, 'same', 'わたしも。', 'watashi mo.'], [/^(sim|claro|isso)\b/i, 'yes', 'うん。／はい。', 'un. / hai.'],
  [/^(n[aã]o|nao)\b/i, 'no', 'ううん。／いいえ。', 'uun. / iie.'], [/^(obrigad[oa]|valeu|vlw)/i, 'thanks', 'ありがとう！', 'arigatou!'],
  [/^(oi|ol[aá]|e a[ií]|bom dia|boa tarde|boa noite)\b/i, 'greet', 'こんにちは！', 'konnichiwa!'], [/^(tchau|at[eé] mais|falou)\b/i, 'bye', 'またね！', 'mata ne!'],
  [/^(tudo bem|tudo bom|como vai|como voc[eê] est[aá])/i, 'howareyou', 'げんき？', 'genki?'], [/^(legal|incr[ií]vel|que demais|top)\b/i, 'praise', 'すごい！', 'sugoi!'],
  [/^(que pena)/i, 'sympathy', 'ざんねん。', 'zannen.'], [/^(desculp)/i, 'sorry', 'ごめん。', 'gomen.'], [/^(n[aã]o entendi|n[aã]o sei)/i, 'dontknow', 'わからない。', 'wakaranai.']
];
const CH_PT_WORDS = /\b(eu|voc[eê]|tamb[eé]m|sim|n[aã]o|obrigad[oa]|tudo|bem|oi|ol[aá]|tchau|legal|que|muito|estou|est[aá]|gosto|sei|entendi|pena|desculpa|bom|boa)\b/i;
const CH_INTENT_MAP = { greet: 'greet', howareyou: 'howareyou', imgood: 'good', imtired: 'tired', thanks: 'thanks', bye: 'bye', sorry: 'sorry', whatdoing: 'whatdoing', likesq: 'likesq', hungry: 'hungry', weather: 'weather', compliment: 'praise', studying: 'studying', recommend: 'recommend', price: 'price' };
const CH_ROMAJI_OK = /^(?:(?:[kgsztdnhbpmyrwfjv]|ch|sh|ts|ky|gy|ny|hy|by|py|my|ry)?[aeiou]|n|([kstpcg])(?=\1|ch))+$/;

function chTalkAnalyze1(text, stk) {
  const raw = String(text || '').trim();
  const A = { raw, q: /[?？]\s*$/.test(raw), intents: [], meta: null, pt: null, fuzzy: null, cap: {}, capText: null };
  const add = (id, s, o) => { const ex = A.intents.find(x => x.id === id); if (ex) { if (s > ex.s) ex.s = s; return; } A.intents.push(Object.assign({ id, s }, o || {})); };
  // figurinha
  if (stk && CH_STK[stk]) { const e = CH_STK[stk].emo; A.stkEmo = e; add(CH_EMO_INTENT[e] || 'ack', raw ? 1.2 : 3, { stk: true }); }
  // emojis
  CH_EMOJI.forEach(([re, id]) => { if (re.test(raw)) add(id, 1.1, { emoji: true }); });
  const hasJa = /[぀-ヿ一-鿿]/.test(raw);
  const c = chCanon(raw), l = chLoose(c);
  A.c = c; A.l = l;
  if (!c) { A.intents.sort((a, b) => b.s - a.s); return A; }
  // português
  if (!hasJa && CH_PT_WORDS.test(raw) && !CH_RULES.some(([, re]) => re.test(c))) {
    const m = CH_PT.find(([re]) => re.test(raw.normalize('NFC')));
    A.pt = m ? { id: m[1], jp: m[2], ro: m[3] } : { id: null };
    if (m) add(m[1], 2, { pt: true });
    A.intents.sort((a, b) => b.s - a.s); return A;
  }
  // "e?" sozinho, ou pedidos de repetir/devagar
  if (/^(e|eh|n|nn)$/.test(c) && A.q) { A.meta = 'repeat'; return A; }
  const ruleHit = CH_RULES.some(([id, re]) => re.test(c) && id !== 'dontknow');
  if (!ruleHit) for (const m of CHAT_META) for (const f of m.f) { const r = chMatchForm(raw, f, c, l); if (r && r.q !== 'spelling') { A.meta = m.id; break; } }
  if (A.meta === 'dontknow') { add('dontknow', 3); A.meta = null; }
  if (A.meta) return A;
  // regras exatas
  CH_RULES.forEach(([id, re]) => { if (re.test(c)) add(id, 3); });
  // "うん" e "ううん" só pela forma exata (a forma solta confundiria sim e não)
  if (/^uu+n+$/.test(c)) { A.intents = A.intents.filter(x => x.id !== 'yes'); add('no', 3); }
  // pergunta com "?" sobre o próprio estado: "daijoubu?" = preocupação, não "estou bem"
  if (A.q && /^(daijoubu|genki|ii)(desuka|ka)?$/.test(c)) { A.intents = A.intents.filter(x => x.id !== 'good'); add(c.startsWith('daijoubu') ? 'sympathy' : 'howareyou', 3.2); }
  // frases conhecidas do chat (cumprimentos, perguntas do dia a dia…)
  const rank = { exact: 3, variant: 2.6, spelling: 1.6 };
  CHAT_INTENTS_ALL().forEach(it => {
    const id = CH_INTENT_MAP[it.id]; if (!id) return;
    let best = null; it.f.forEach(f => { const m = chMatchForm(raw, f, c, l); if (m && (!best || rank[m.q] > rank[best.q])) best = { q: m.q, f }; });
    if (best) { add(id === 'tired' && /nemu/.test(c) ? 'sleepy' : id, rank[best.q], { form: best.f }); if (best.q === 'spelling') A.fuzzy = A.fuzzy || best.f; }
  });
  // palavras dentro de frases maiores
  CH_PARTS.forEach(([id, re]) => { if (re.test(c)) add(id, 1.5); });
  // perguntas abertas ("donna anime?", "nani ga suki?", "doko?")
  const qWord = /(donna|nani|nande|doko|dare|itsu|dore|dochira|docchi|ikura|ikutsu|doushite|naze|dou)/.test(c);
  if (qWord && (A.q || /(ka|no|nano)$/.test(c))) add('question', 1.4);
  else if (A.q && !A.intents.length) add('question', 1);
  if (A.intents.some(x => x.id === 'bad')) A.intents = A.intents.filter(x => x.id !== 'good');
  if (A.intents.some(x => x.id === 'dislike')) A.intents = A.intents.filter(x => x.id !== 'ilike');
  if (A.intents.some(x => x.id === 'same' && x.s >= 3)) A.intents = A.intents.filter(x => x.id !== 'yes' || x.s >= 3);
  // gostos: captura o que o aluno disse que gosta ("anime ga suki", "ラーメンが だいすき")
  if (A.intents.some(x => x.id === 'ilike' || x.id === 'want' || x.id === 'same')) {
    let best = null;
    ['like', 'hobby', 'genre', 'music', 'food'].forEach(k => (CHAT_SLOTS[k] || []).forEach(v => chCompile(String(v.p || v.ro).toLowerCase()).forEach(e => { if (e.c && e.c.length >= 3 && c.includes(e.c) && (!best || e.c.length > best.n)) best = { v, n: e.c.length }; })));
    if (best) A.cap.like = best.v;
    else { const m = raw.match(/^(.{1,16}?)\s*(が|は|ga|wa)?\s*(だい|dai)?(すき|suki)/i); if (m && m[1] && !/^(わたし|watashi|boku|ore|atashi|わたしも|watashi mo)$/i.test(m[1].trim())) A.cap.like = { jp: m[1].trim(), ro: m[1].trim(), pt: m[1].trim() }; }
  }
  // erros de digitação em respostas curtas
  if (!A.intents.some(x => x.s >= 2.5) && l.length >= 4) {
    Object.keys(CH_EXEMPLARS).forEach(id => CH_EXEMPLARS[id].forEach(e => { const el = chLoose(e); if (el.length >= 5 && el !== l && chLev(l, el, 1) <= 1 && !A.intents.some(x => x.id === id && x.s >= 1.5)) { add(id, 1.6); A.fuzzy = A.fuzzy || { ro: e, jp: NQK.r2k(e) }; } }));
  }
  // texto livre curto (nome, título de anime…) para perguntas abertas
  const words = raw.replace(/[。、！？!?.,…「」]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const plausible = hasJa || CH_ROMAJI_OK.test(l) || (words.length <= 3 && /^[A-ZÀ-Ú]/.test(raw));
  if (raw.length <= 24 && words.length <= 4 && plausible) {
    let t = raw.replace(/[。、！？!?.,…「」]/g, '').trim();
    t = t.replace(/\s*(だよ|です|だ|desu|da yo|dayo|da|かな|kana|ga suki|が すき|がすき|かも|kamo)\s*$/i, '').trim();
    if (t) A.capText = t;
  }
  A.intents.sort((a, b) => b.s - a.s);
  return A;
}

/* 6.0: mensagens com mais de uma frase ("konbanwa! hajimemashite!") e frases que o
   personagem acabou de usar. Primeiro tenta a mensagem inteira; se nada forte foi
   reconhecido, divide em partes (pontuação, palavras e, por último, a forma canônica)
   e junta as intenções. Depois compara com as últimas falas do personagem (eco). */
const chStrong = A => A.intents.some(x => x.s >= 2.5);
function chTalkSegments(raw) {
  const out = [];
  const tryCanon = part => {
    const c = chCanon(part); if (!c || c.length > 32) return false;
    let i = 0, cov = 0; const got = [];
    while (i < c.length) {
      let j = c.length, found = false;
      for (; j >= i + 3; j--) { const sub = c.slice(i, j); if (chStrong(chTalkAnalyze1(sub))) { got.push(sub); cov += sub.length; found = true; break; } }
      i = found ? j : i + 1;
    }
    // só aceita quando as partes reconhecidas cobrem quase tudo (evita achar palavras dentro de texto aleatório)
    if (!got.length || cov / c.length < 0.75) return false;
    out.push(...got); return true;
  };
  String(raw).split(/[!?！？。、,.\n~〜…・]+/).map(x => x.trim()).filter(Boolean).forEach(part => {
    if (chStrong(chTalkAnalyze1(part))) { out.push(part); return; }
    const w = part.split(/\s+/).filter(Boolean);
    let i = 0;
    while (i < w.length) {
      let j = w.length, found = false;
      for (; j > i; j--) { const seg = w.slice(i, j).join(' '); if (chStrong(chTalkAnalyze1(seg))) { out.push(seg); found = true; break; } }
      if (found) { i = j; continue; }
      // nenhuma combinação de palavras: tenta a forma canônica (kana sem espaços, "konbanwahajimemashite")
      let k = i + 1; while (k < w.length && !chStrong(chTalkAnalyze1(w.slice(k).join(' ')))) k++;
      tryCanon(w.slice(i, k).join(''));
      i = k;
    }
  });
  return out;
}
function chTalkAnalyze(text, stk, cid) {
  const A = chTalkAnalyze1(text, stk);
  if (A.meta || (A.pt && A.pt.id) || !A.c || chStrong(A)) return A;
  const merge = (B, sc, extra) => B.intents.forEach(x => { const ex = A.intents.find(y => y.id === x.id); const s = Math.min(x.s, sc); if (ex) { if (s > ex.s) ex.s = s; } else A.intents.push(Object.assign({}, x, { s }, extra || {})); });
  // várias frases na mesma mensagem
  const segs = A.pt ? [] : chTalkSegments(A.raw);
  if (segs.length >= 2 || (segs.length === 1 && chCanon(segs[0]) !== A.c)) {
    A.segs = segs;
    segs.forEach(sg => merge(chTalkAnalyze1(sg), 3, { seg: true }));
    if (A.intents.some(x => x.id === 'bad')) A.intents = A.intents.filter(x => x.id !== 'good');
  }
  // eco: o aluno repetiu (quase) igual uma fala recente do personagem
  if (cid && !chStrong(A) && A.c.length >= 3) {
    const th = typeof chThread === 'function' ? chThread(cid) : [];
    const lines = []; for (let i = th.length - 1; i >= 0 && lines.length < 4; i--) { const m = th[i]; if (m && m.from === 'me') break; if (m && m.from === 'char' && m.jp) lines.push(m); }
    const l = A.l;
    for (const m of lines) {
      const cands = [chCanon(m.jp), chCanon(m.ro || '')].filter(x => x && x.length >= 3);
      const near = cands.some(x => x === A.c || chLoose(x) === l || (l.length >= 6 && chLev(l, chLoose(x), Math.max(1, Math.floor(l.length / 8))) <= Math.max(1, Math.floor(l.length / 8))));
      if (!near) continue;
      A.echo = { jp: m.jp, ro: m.ro };
      const B = chTalkAnalyze1(m.jp);
      const parts = chStrong(B) ? [B] : chTalkSegments(m.jp).map(x => chTalkAnalyze1(x));
      parts.forEach(P => merge(P, 2.8, { echo: true }));
      if (!A.intents.length) A.intents.push({ id: 'ack', s: 1.5, echo: true });
      break;
    }
  }
  A.pt = A.intents.length ? null : A.pt;
  A.intents.sort((a, b) => b.s - a.s);
  return A;
}

/* quando o personagem esperava X, estas intenções também servem */
const CH_FB = {
  yay: ['praise', 'congrats', 'good'], congrats: ['praise', 'yay'], praise: ['yay', 'ack', 'good'], surprise: ['ack'], ack: [], laugh: [], shy: [],
  sleepy: ['tired', 'bad', 'same'], tired: ['bad'], busy: ['bad'], bad: [], hard: ['bad'], meh: ['some', 'bad'], good: ['yes'], okay: ['yes'], yes: ['okay', 'good'],
  no: ['decline'], decline: ['no'], same: ['yes'], ilike: ['yes', 'good'], dislike: ['no'], sympathy: ['ack'], some: ['meh', 'yes'], hungry: ['want', 'yes'],
  want: ['yes', 'okay'], why: ['question'], question: [], askback: [], nice: ['greet', 'yes'], greet: ['nice'], thanks: [], dontknow: ['no'], browsing: ['no', 'decline'], studying: [], sorry: []
};
/* respostas que pedem a "fala própria" do personagem, mesmo no meio de um assunto */
const CH_STANDALONE = ['bye', 'thanks', 'sorry', 'greet', 'howareyou', 'whatdoing', 'likesq', 'recommend', 'price', 'weather', 'studying', 'hungry'];
const CH_LULL = ['ack', 'laugh', 'yes', 'okay', 'same', 'praise', 'good', 'yay', 'surprise', 'shy', 'sympathy', 'congrats'];

/* ---------- respostas do personagem ---------- */
function chTalkPick(cid, bank, key) {
  if (!bank) return null;
  if (!Array.isArray(bank)) return bank;
  const st = chState(cid), rec = st.recentR || (st.recentR = []);
  const opts = bank.map((v, i) => ({ v, k: key + '#' + i }));
  const fresh = opts.filter(o => !rec.includes(o.k));
  const o = (fresh.length ? fresh : opts)[Math.floor(chRand() * (fresh.length ? fresh.length : opts.length))];
  rec.push(o.k); if (rec.length > 24) rec.splice(0, rec.length - 24);
  return o.v;
}
let CH_SEED = null;
function chRand() { if (CH_SEED == null) return Math.random(); CH_SEED = (CH_SEED * 1103515245 + 12345) % 2147483648; return CH_SEED / 2147483648; }
/* divide uma fala longa em dois balões quando japonês, romaji e português têm o mesmo número de frases */
function chSplitLine(l) {
  if (l.jp.length < 22) return [l];
  const sj = l.jp.split(/(?<=[。！？])\s*/).filter(Boolean), sr = l.ro.split(/(?<=[.!?])\s+/).filter(Boolean), sp = l.pt.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sj.length < 2 || sj.length !== sr.length || sj.length !== sp.length || sj.some(x => x.length < 4)) return [l];
  return sj.map((jp, i) => ({ jp, ro: sr[i], pt: sp[i] }));
}
/* publica uma resposta (falas, figurinhas, notas) e devolve o que ela pede em seguida */
function chTalkSay(cid, act, variant, opts = {}) {
  const out = { ex: null, end: false, lines: 0 };
  if (variant == null) return out;
  let v = variant;
  if (typeof v === 'string' || Array.isArray(v) || v.tod) v = { r: v };
  if (v.dyn) { const d = CH_TALK_DYN[v.dyn] && CH_TALK_DYN[v.dyn](cid); if (!d) return out; v = Object.assign({}, v, d, { dyn: null }); }
  let r = v.r;
  if (r && r.tod) r = r.tod[chTod()] || r.tod.tarde;
  const ctx = chCtx(act);
  const extra = opts.init ? { init: true } : {};
  [].concat(r || []).forEach(x => {
    if (x && x.tod) x = x.tod[chTod()] || x.tod.tarde;
    if (x && typeof x === 'object' && (x.r || x.dyn)) { const o = chTalkSay(cid, act, x, opts); if (o.ex) out.ex = o.ex; out.lines += o.lines; return; }
    if (typeof x !== 'string') return;
    if (x[0] === '#') { chTalkSticker(cid, act, x.slice(1), extra); out.lines++; return; }
    const l = chTL(x);
    const f = { jp: chFill(l.jp, ctx, 'jp'), ro: chFill(l.ro, ctx, 'ro'), pt: chFill(l.pt, ctx, 'pt') };
    if (/\{/.test(l.jp) && !f.jp.replace(/[\s、。！？]/g, '')) return;
    chSplitLine(f).forEach(p => { chPush(cid, Object.assign({ from: 'char', jp: p.jp, ro: p.ro, pt: p.pt, say: chFill(p.jp === f.jp ? l.jp : p.jp, ctx, 'say') }, extra)); out.lines++; });
  });
  if (v.tip) chPush(cid, Object.assign({ from: 'sys', kind: 'tip' }, v.tip));
  if (v.teach) chTalkTeach(cid, v.teach);
  if (v.set) [].concat(v.set).forEach(k => { if (!S.chat.facts[k]) S.chat.facts[k] = Date.now(); });
  if (v.ex) out.ex = typeof v.ex === 'string' ? (v.ex === 'state' ? cid + '.state' : (TALK[cid].ex[v.ex] ? cid + '.ex.' + v.ex : null)) : v.ex.__id;
  if (v.end) out.end = true;
  return out;
}
function chTalkTeach(cid, keys) {
  const fresh = [];
  [].concat(keys || []).forEach(k => { const it = chItem(k); if (!it) return; if (chPresent(k)) fresh.push(it.id); });
  if (fresh.length) chPush(cid, { from: 'sys', kind: 'new', items: fresh, fresh });
}
function chTalkSticker(cid, act, emo, extra) {
  const id = cid + '-' + emo;
  if (!CH_STK[id]) return;
  const th = chThread(cid), recent = th.slice(-6).filter(m => m.from === 'char' && m.stk).length;
  if (recent && (act.n || 0) - (act.stkAt == null ? -9 : act.stkAt) < 2) return;
  chPush(cid, Object.assign({ from: 'char', stk: id }, extra || {}));
  act.stkAt = act.n || 0;
  const it = CH_STK[id].item; if (it && chItem(it) && !(S.items['chat:' + it] && S.items['chat:' + it].seen)) chTalkTeach(cid, [it]);
}

/* ---------- assuntos ---------- */
function chTalkTopicOk(cid, t) {
  if (t.intro) return false;
  if (!chKnows(t.need)) return false;
  if (t.tod && t.tod !== chTod()) return false;
  if (t.fact) { const [a, b] = t.fact.split('.'); const v = S.chat.facts[a]; if (!(b ? v && v[b] : v)) return false; }
  if (t.dyn && !(CH_TALK_DYN[t.dyn] && CH_TALK_DYN[t.dyn](cid))) return false;
  return true;
}
function chTalkNextTopic(cid) {
  const st = chState(cid), T = TALK[cid], seen = st.topics || {};
  const list = T.topics.filter(t => chTalkTopicOk(cid, t) && !(st.recentT || []).includes(t.id));
  const pool = list.length ? list : T.topics.filter(t => chTalkTopicOk(cid, t));
  if (!pool.length) return null;
  const today = dayKey();
  pool.sort((a, b) => ((seen[a.id] || {}).n || 0) - ((seen[b.id] || {}).n || 0) || ((seen[a.id] || {}).last || 0) - ((seen[b.id] || {}).last || 0) || (hashStr(a.id + today) % 13) - (hashStr(b.id + today) % 13));
  return pool[0];
}
/* a 4.0 guardava só "expect: imgood"; a fala do Ren sobre ter dormido tarde tem a sua própria expectativa */
function chLegacyEx(cid, th) {
  const last = [...(th || [])].reverse().find(m => m && m.from === 'char');
  if (cid === 'ren' && last && /ねるの おそかった/.test(last.jp || '')) return 'ren.ex.sleep';
  return cid + '.state';
}
function chTalkAct() { return { free: true, scene: null, node: 'free', topic: null, step: 0, ex: null, miss: 0, n: 0, lull: 0, fbAt: -99, fb: {}, tags: [], ctx: {}, start: Date.now() }; }
function chTalkEnsure(cid) {
  const st = chState(cid);
  if (!st.active || !st.active.free) { st.active = chTalkAct(); return st.active; }
  const a = st.active;
  if (a.n == null) Object.assign(a, { topic: null, step: 0, ex: a.ex || null, miss: 0, n: 0, lull: 0, fbAt: -99, fb: {}, tags: a.tags || [], ctx: a.ctx || {} });
  if (a.expect && !a.ex) { if (a.expect === 'imgood') a.ex = chLegacyEx(cid, chThread(cid)); delete a.expect; }
  return a;
}
function chTalkStartTopic(cid, act, t, opts = {}) {
  const st = chState(cid);
  act.topic = t.id; act.step = 0; act.lull = 0; act.miss = 0; act.back = null;
  st.recentT = (st.recentT || []).filter(x => x !== t.id).concat(t.id).slice(-4);
  if (opts.pivot && !t.nopivot) chTalkSay(cid, act, chTalkPick(cid, TALK[cid].pivot, 'pivot'), opts);
  return chTalkStep(cid, act, opts);
}
function chTalkStep(cid, act, opts = {}) {
  const T = TALK[cid], t = T.topics.find(x => x.id === act.topic);
  const step = t && t.steps[act.step];
  if (!step) { chTalkEndTopic(cid, act); return { ex: null }; }
  const o = chTalkSay(cid, act, Object.assign({}, step, { r: step.say, ex: step.ex }), opts);
  act.ex = o.ex; act.back = step.ex && step.ex.back ? step.ex.back : act.back;
  if (o.end || step.end) chTalkEndTopic(cid, act);
  return o;
}
function chTalkEndTopic(cid, act) {
  const st = chState(cid);
  if (act.topic) {
    const t = (st.topics || (st.topics = {}));
    const r = t[act.topic] || (t[act.topic] = { n: 0, last: 0 }); r.n++; r.last = Date.now();
    const T = TALK[cid], tp = T.topics.find(x => x.id === act.topic);
    if (tp && tp.intro) { st.met = true; (tp.steps.flatMap(s => [].concat(s.set || []))).forEach(k => { if (!S.chat.facts[k]) S.chat.facts[k] = Date.now(); }); }
    if (st.pending && st.pending === 'talk:' + act.topic) st.pending = null;
  }
  act.topic = null; act.step = 0;
}
/* inicia uma conversa (abrir o chat pela primeira vez ou mensagem espontânea) */
function chTalkOpen(cid, opts = {}) {
  const st = chState(cid), act = chTalkEnsure(cid), T = TALK[cid];
  const t = !st.met ? T.topics.find(x => x.intro) : (opts.topic ? T.topics.find(x => x.id === opts.topic) : chTalkNextTopic(cid));
  if (!t) return null;
  chTalkStartTopic(cid, act, t, opts);
  return t;
}

/* ---------- a resposta do personagem a uma mensagem do aluno ---------- */
function chTalkReply(cid, text, stk) {
  const T = TALK[cid], c = chChar(cid), st = chState(cid);
  const act = chTalkEnsure(cid);
  const me = chPush(cid, Object.assign({ from: 'me', txt: text || '', kind: 'free', fr: 1 }, stk ? { stk } : {}));
  S.chat.stats.sent++; act.n = (act.n || 0) + 1;
  if (stk) { S.chat.stk = S.chat.stk || { fav: [], recent: [] }; const rc = S.chat.stk.recent = (S.chat.stk.recent || []).filter(x => x !== stk); rc.unshift(stk); rc.splice(12); const it = CH_STK[stk] && CH_STK[stk].item; if (it && chItem(it)) { if (!(S.items['chat:' + it] && S.items['chat:' + it].seen)) chTalkTeach(cid, [it]); else recordAnswer('chat:' + it, true, 'chat'); } }
  const A = chTalkAnalyze(text, stk, cid);
  const ex = chExGet(cid, act.ex);
  const res = { kind: 'free', intent: null };
  if (A.fuzzy) me.heard = { jp: A.fuzzy.jp, ro: A.fuzzy.ro };
  // pedir para repetir / falar devagar
  if (A.meta === 'repeat' || A.meta === 'slow') {
    me.kind = 'meta';
    const last = [...chThread(cid)].reverse().find(m => m.from === 'char' && m.jp);
    chTalkSay(cid, act, chTalkPick(cid, [c.repeat.map(l => l.jp + '|' + l.ro + '|' + l.pt)], 'rep'));
    if (last) chPush(cid, { from: 'char', jp: last.jp, ro: last.ro, pt: last.pt, say: last.say, slow: true, showPt: true });
    return { kind: 'meta', meta: A.meta };
  }
  // português: entende e mostra o jeito japonês, sem tratar como erro
  if (A.pt) {
    me.kind = 'pt';
    chPush(cid, { from: 'sys', kind: 'tip', jp: A.pt.jp || '', ro: A.pt.ro || '', pt: '', why: A.pt.id ? `${c.name} entendeu a ideia! Em japonês, fica assim:` : `${c.name} fala japonês. Tente em romaji ou japonês: o chat aceita os dois.` });
    if (!A.pt.id) return res;
  }
  let chosen = null, key = '', intent = A.intents[0] ? A.intents[0].id : null;
  const ctx0 = {};
  if (A.cap.like) ctx0.like = A.cap.like;
  if (A.capText) ctx0['*'] = A.capText;
  Object.assign(act.ctx, ctx0);
  if (A.cap.like) { S.chat.facts.ctx = S.chat.facts.ctx || {}; const v = A.cap.like; S.chat.facts.ctx.likes = { jp: v.jp, ro: v.ro, pt: v.pt }; }
  const isStandalone = A.intents.length && A.intents[0].s >= 2.5 && A.intents.filter(x => x.s >= 2.5).every(x => CH_STANDALONE.includes(x.id));
  // 1) o que o personagem acabou de perguntar decide o sentido da resposta curta
  if (ex && (!isStandalone || (ex.on && ex.on[A.intents[0].id]))) {
    for (const it of A.intents) { for (const k of [it.id].concat(CH_FB[it.id] || [])) { if (ex.on && ex.on[k]) { chosen = ex.on[k]; key = ex.__id + ':' + k; intent = it.id; break; } } if (chosen) break; }
    if (!chosen && A.intents.some(x => x.id === 'askback' || x.id === 'why') && ex.back) { chosen = [ex.back]; key = ex.__id + ':back'; intent = 'askback'; }
    if (!chosen && ex.cap && A.capText && (!A.intents.length || A.intents[0].s < 2.5)) { chosen = ex.any; key = ex.__id + ':any'; intent = 'cap'; }
    if (!chosen && ex.any && A.intents.length && CH_LULL.includes(A.intents[0].id)) { chosen = ex.any; key = ex.__id + ':any'; }
    if (!chosen && ex.k === 'state') { const m = A.intents.map(x => x.id).find(id => ex.on[id] || (CH_FB[id] || []).some(f => ex.on[f])); if (m) { const f = ex.on[m] ? m : CH_FB[m].find(f => ex.on[f]); chosen = ex.on[f]; key = ex.__id + ':' + f; } }
  }
  // 2) intenções reconhecidas sem expectativa: a reação própria do personagem
  if (!chosen && A.intents.length) {
    for (const it of A.intents) {
      if ((it.id === 'askback' || it.id === 'why') && act.back) { chosen = [act.back]; key = 'back'; intent = it.id; break; }
      for (const k of [it.id].concat(CH_FB[it.id] || [])) { if (T.react[k]) { chosen = T.react[k]; key = cid + '.react.' + k; intent = it.id; break; } }
      if (chosen) break;
    }
  }
  res.intent = intent;
  // 3) não entendeu: o personagem pede para repetir (nunca é marcado como erro)
  if (!chosen) {
    me.kind = 'unknown'; res.kind = 'unknown';
    S.chat.stats.unknown++;
    act.miss++;
    if (act.miss >= 2) {
      chTalkSay(cid, act, chTalkPick(cid, T.unknown2, 'u2'));
      act.miss = 0; act.ex = null;
      const nt = chTalkNextTopic(cid); if (nt) chTalkStartTopic(cid, act, nt, { pivot: true });
    } else {
      chTalkSay(cid, act, chTalkPick(cid, T.unknown, 'u'));
    }
    if (!act.noteShown) { act.noteShown = true; chPush(cid, { from: 'sys', kind: 'unk', txt: `${c.name} não entendeu essa mensagem. Isso não quer dizer que você errou: o chat reconhece muitas respostas, mas não todas. Tente escrever de outro jeito, use uma figurinha ou toque na lâmpada para ver ideias.` }); }
    return res;
  }
  act.miss = 0;
  me.kind = 'free';
  // reação
  const variant = chTalkPick(cid, chosen, key);
  const o = chTalkSay(cid, act, variant);
  // figurinha espontânea quando combina com o momento (não aleatória: depende da intenção)
  const STK_FOR = { laugh: 'laugh', praise: 'shy', yay: 'celebrate', congrats: 'celebrate', surprise: 'surprise', good: 'joy', thanks: 'joy', okay: 'approve' };
  const lastIsStk = (() => { const th = chThread(cid); const m = th[th.length - 1]; return m && m.stk; })();
  if (!lastIsStk && STK_FOR[intent] && (act.n - (act.stkAt == null ? -9 : act.stkAt)) >= 3 && chRand() < T.style.stk) chTalkSticker(cid, act, STK_FOR[intent]);
  // XP discreto (uma vez por dia por intenção), sem transformar a conversa em prova
  if (intent) chGain(2, 'livre:' + cid + ':' + intent);
  // expressões do chat que o aluno usou entram na revisão
  chTalkUsedItems(A.c);
  // correção gentil de formalidade (no máximo uma vez a cada várias mensagens)
  chTalkRegister(cid, act, A, intent);
  if (o.end && (intent === 'bye')) { act.ex = null; chTalkEndTopic(cid, act); touchStudy(); st.met = true; return res; }
  // continuação: nova pergunta da resposta, próximo passo do assunto ou novo assunto
  if (o.ex) { act.ex = o.ex; act.lull = 0; return res; }
  act.ex = null;
  if (o.end) chTalkEndTopic(cid, act);
  if (act.topic) {
    const t = T.topics.find(x => x.id === act.topic);
    if (t && act.step + 1 < t.steps.length) { act.step++; chTalkStep(cid, act); }
    else chTalkEndTopic(cid, act);
    return res;
  }
  if (CH_LULL.includes(intent) || A.stkEmo) {
    act.lull++;
    if (act.lull >= 2) { const nt = chTalkNextTopic(cid); if (nt) chTalkStartTopic(cid, act, nt, { pivot: true }); }
  }
  touchStudy();
  return res;
}
const CH_USED = ['sugoi', 'maji', 'zannen', 'donmai', 'omedetou', 'genki', 'maamaa', 'nemui', 'otsukare', 'matane', 'yaa', 'kawaii', 'yatta', 'kakkoii', 'wara', 'hontou', 'iina', 'aruaru', 'onakasuita', 'osusume', 'choushi', 'ureshii', 'hazukashii', 'naruhodo', 'kochirakoso', 'kekkou', 'miteirudake'];
function chTalkUsedItems(c) {
  if (!c) return;
  CH_USED.forEach(k => { const id = 'chat:' + k, it = ITEM[id]; if (!it || !(S.items[id] && S.items[id].seen)) return; const rc = chCanon(it.ro); if (rc && rc.length >= 3 && c.includes(rc)) recordAnswer(id, true, 'chat'); });
}
/* formalidade: Aiko-sensei e Takeshi esperam です/ます; com o Ren a forma polida soa distante */
const CH_CASUAL_FIX = [
  [/^unn?$/, 'はい。', 'hai.', 'Sim.'], [/^uu+n$/, 'いいえ。', 'iie.', 'Não.'], [/^arigato(u)?(ne)?$/, 'ありがとうございます。', 'arigatou gozaimasu.', 'Muito obrigado(a).'],
  [/^gomen(ne)?$/, 'すみません。', 'sumimasen.', 'Desculpe.'], [/^ohayo(u)?$/, 'おはようございます。', 'ohayou gozaimasu.', 'Bom dia.'],
  [/^(jaa?ne|jaana|matane|baibai|jaa?mata)$/, 'しつれいします。', 'shitsurei shimasu.', 'Com licença, já vou.'], [/^genki(dayo|da)?$/, 'げんきです。', 'genki desu.', 'Estou bem.'],
  [/^sugo(i|ii|e)(ne|na)?$/, 'すごいですね。', 'sugoi desu ne.', 'Que incrível.'], [/^maji(de|ka)?$/, 'ほんとうですか。', 'hontou desu ka.', 'É mesmo?'],
  [/^(yaa?|yo+|ossu|osu)$/, 'こんにちは。', 'konnichiwa.', 'Olá.'], [/^wakatta$/, 'わかりました。', 'wakarimashita.', 'Entendi.'],
  [/^iiyo$/, 'いいですよ。', 'ii desu yo.', 'Pode ser.'], [/^nemui$/, 'ねむいです。', 'nemui desu.', 'Estou com sono.'], [/^tsukareta$/, 'つかれました。', 'tsukaremashita.', 'Estou cansado(a).'],
  [/^onaka(ga)?suita$/, 'おなかが すきました。', 'onaka ga sukimashita.', 'Estou com fome.'], [/^(watashi|boku|ore|atashi)mo$/, 'わたしもです。', 'watashi mo desu.', 'Eu também.']
];
const CH_POLITE_FIX = [
  [/^hai$/, 'うん！', 'un!', 'Uhum!'], [/^(doumo)?arigatougozaimasu$/, 'ありがとう！', 'arigatou!', 'Valeu!'], [/^genkidesu(yo)?$/, 'げんき！', 'genki!', 'Tô bem!'],
  [/^sumimasen$/, 'ごめん！', 'gomen!', 'Foi mal!'], [/^ohayougozaimasu$/, 'おはよう！', 'ohayou!', 'Bom dia!'], [/^(watashi|boku)modesu$/, 'わたしも！', 'watashi mo!', 'Eu também!'],
  [/^wakarimashita$/, 'わかった！', 'wakatta!', 'Entendi!'], [/^tsukaremashita$/, 'つかれた〜', 'tsukareta~', 'Cansei~'], [/^sugoidesune$/, 'すごい！', 'sugoi!', 'Incrível!']
];
function chTalkRegister(cid, act, A, intent) {
  if (!A.c || act.n - act.fbAt < 4) return;
  const want = chWant(cid, act), c = chChar(cid);
  let fix = null, kind = null;
  if (want === 'p' && (cid === 'aiko' || cid === 'takeshi')) { fix = CH_CASUAL_FIX.find(([re]) => re.test(A.c)); kind = 'casual'; }
  else if (want === 'c' && cid === 'ren') { fix = CH_POLITE_FIX.find(([re]) => re.test(A.c)); kind = 'stiff'; }
  if (!fix || act.fb[kind]) return;
  act.fb[kind] = 1; act.fbAt = act.n;
  const txt = kind === 'casual'
    ? `Entendi o que você quis dizer! Só um detalhe: com ${c.pt.quem}, o natural é a forma educada. A sua frase é casual, como entre amigos.`
    : `Está certo! Só que com ${c.pt.quem} a forma casual soa mais natural. A forma educada fica um pouco distante entre amigos.`;
  const res = { kind: 'social', input: A.raw, whyTxt: txt };
  const model = { jp: fix[1], ro: fix[2], pt: fix[3] };
  chRecordCorrection(cid, res, model);
  S.chat.stats.social++;
  chPush(cid, { from: 'sys', kind: 'fb', res: 'social', soft: true, txt, model });
}

/* ---------- ideias e sugestões de resposta (sempre opcionais) ---------- */
function chTalkSugg(cid) {
  const act = chState(cid).active; if (!act || !act.free) return [];
  const ex = chExGet(cid, act.ex), want = chWant(cid, act);
  const parse = s => { const [jp, ro, pt, uses] = String(s).split('|'); return { jp, ro, pt, uses: uses ? uses.split(',').filter(Boolean) : [] }; };
  let list = ex && ex.sugg ? ex.sugg.map(parse) : [];
  if (!list.length && ex) {
    const P = want === 'p';
    if (ex.k === 'state') list = (P ? ['げんきです。|genki desu.|Estou bem.|chat:genki', 'つかれました。|tsukaremashita.|Estou cansado(a).|c8l3', 'わたしもです。|watashi mo desu.|Eu também.|'] : ['げんき！|genki!|Tô bem!|chat:genki', 'まあまあ。|maa maa.|Mais ou menos.|chat:maamaa', 'わたしも！|watashi mo!|Eu também!|']).map(parse);
    else if (ex.k === 'yn') list = (P ? ['はい。|hai.|Sim.|', 'いいえ。|iie.|Não.|'] : ['うん！|un!|Sim!|', 'ううん。|uun.|Não.|']).map(parse);
    else list = (P ? ['そうなんですね。|sou nan desu ne.|Ah, é mesmo?|', 'すごいですね！|sugoi desu ne!|Que incrível!|chat:sugoi'] : ['へえ〜！|hee~!|Nossa!|', 'すごい！|sugoi!|Incrível!|chat:sugoi', 'わらい|wara|(risos)|']).map(parse);
  }
  list = list.filter(x => chKnows(x.uses.filter(u => !u.startsWith('chat:'))));
  if (!ex || list.length < 2) chFreeIdeas(cid).forEach(x => { if (list.length < 4 && !list.some(y => y.jp === x.jp)) list.push({ jp: x.jp, ro: x.ro, pt: x.pt, idea: x.idea }); });
  return list.slice(0, 4).map(x => ({ jp: chFill(x.jp, chCtx(act), 'jp'), ro: chFill(x.ro, chCtx(act), 'ro'), pt: x.pt, idea: x.idea }));
}

/* ---------- falas montadas com os dados reais do aluno ---------- */
const CH_TALK_DYN = {
  aikoProgress(cid) {
    const h = [...S.history].reverse().find(x => x.id && ITEM[x.id] && ITEM[x.id].lesson && ITEM[x.id].lesson.cat && ITEM[x.id].lesson.title);
    if (!h) return null;
    const L0 = ITEM[h.id].lesson;
    return { r: ['さいきん、べんきょう がんばって いますね。|saikin, benkyou ganbatte imasu ne.|Você tem se esforçado nos estudos ultimamente.', 'むずかしい ところは ありますか。|muzukashii tokoro wa arimasu ka.|Tem alguma parte difícil?'],
      tip: { jp: '', ro: '', pt: '', why: 'A Aiko-sensei viu que você estudou a lição “' + L0.title + '”.' } };
  }
};

/* ---------- mensagens espontâneas (quando o site é aberto) ---------- */
function chTalkInitiative(c, st, today) {
  const act = st.active;
  if (act && !act.free) return false;
  if (act && act.free && (act.ex || act.topic) && Date.now() - (st.lastAt || 0) < 6 * 3600 * 1000) return false;
  const n0 = chThread(c.id).length;
  const t = chTalkOpen(c.id, { init: true, pivot: false });
  if (!t) return false;
  chThread(c.id).slice(n0).forEach(m => { if (m.from === 'char') m.init = true; });
  st.pending = 'talk:' + t.id; st.unread = 1; st.lastInit = today;
  return true;
}
