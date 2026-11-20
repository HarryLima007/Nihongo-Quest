/* ==========================================================
   KIT DE CONTEÚDO 3.0 — ferramentas para escrever lições de
   forma compacta e segura.
   - NQK.r2k(romaji): gera a leitura em kana para a voz (say)
     a partir do romaji, para frases com kanji.
   - NQK.wing(...) / NQK.lesson(...): montam alas e lições no
     mesmo formato das versões anteriores (o app não muda).
   ========================================================== */
const NQK = (function () {
  const T = {
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ', kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
    ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご', gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
    sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ', sha: 'しゃ', shu: 'しゅ', sho: 'しょ', she: 'しぇ', si: 'すぃ',
    za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ', ja: 'じゃ', ju: 'じゅ', jo: 'じょ', je: 'じぇ',
    ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と', cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', che: 'ちぇ', ti: 'てぃ', tu: 'とぅ', tsa: 'つぁ',
    da: 'だ', di: 'でぃ', du: 'どぅ', de: 'で', do: 'ど', dzu: 'づ',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の', nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
    ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ', hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ', fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ',
    ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ', bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
    pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ', pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
    ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も', mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
    ya: 'や', yu: 'ゆ', yo: 'よ',
    ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ', rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
    wa: 'わ', wo: 'を', wi: 'うぃ', we: 'うぇ', va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ'
  };
  const PUNCT = { '.': '。', ',': '、', '?': '？', '!': '！', '…': '…', '→': '、', '/': '、', ':': '、', ';': '、' };
  function r2k(ro) {
    const s = String(ro).toLowerCase().replace(/[-~〜()「」“”"]/g, '').replace(/\.\.\./g, '…');
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (PUNCT[c]) { out += PUNCT[c]; i++; continue; }
      if (c === "'") { i++; continue; }
      if (c === 'n') {
        const nx = s[i + 1];
        if (nx === "'") { out += 'ん'; i += 2; continue; }
        if (!nx || !/[aiueoy]/.test(nx)) { out += 'ん'; i++; continue; }
      }
      if (c === 't' && s[i + 1] === 'c' && s[i + 2] === 'h') { out += 'っ'; i++; continue; }
      if (/[bcdfghjkmprstvwz]/.test(c) && s[i + 1] === c) { out += 'っ'; i++; continue; }
      let hit = false;
      for (const n of [3, 2, 1]) { const k = s.substr(i, n); if (T[k]) { out += T[k]; i += n; hit = true; break; } }
      if (!hit) throw new Error('romaji não reconhecido: “' + ro + '” perto de “' + s.slice(i, i + 4) + '”');
    }
    return out;
  }
  const hasKanji = s => /[一-鿿々〆ヶ]/.test(s);
  const sayFor = (jp, ro) => hasKanji(jp) ? r2k(ro) : undefined;
  /* item: [chave, japonês, romaji, português, nota?, [ex jp, ex romaji, ex pt]?, kanji?] */
  function item(a) {
    const [k, jp, ro, pt, note, ex, kj] = a;
    const it = { k, jp, ro, pt };
    if (kj) it.kanji = kj;
    const say = sayFor(jp, ro); if (say) it.say = say;
    if (note) it.note = note;
    if (ex) { it.ex = { jp: ex[0], ro: ex[1], pt: ex[2] }; const s2 = sayFor(ex[0], ex[1]); if (s2) it.ex.say = s2; }
    return it;
  }
  /* kanji: [chave, kanji, romaji da leitura principal, significado, outras leituras, nota, [ex jp, ex romaji, ex pt]] */
  function kanji(a) {
    const [k, jp, ro, pt, alt, note, ex] = a;
    const it = { k, jp, ro, say: r2k(ro), pt };
    if (alt) it.alt = alt;
    if (note) it.note = note;
    if (ex) it.ex = { jp: ex[0], ro: ex[1], pt: ex[2], say: r2k(ex[1]) };
    return it;
  }
  const exm = e => { const o = { jp: e[0], ro: e[1], pt: e[2] }; const s = sayFor(e[0], e[1]); if (s) o.say = s; return o; };
  /* exercícios (a resposta certa é sempre a primeira opção; o app embaralha) */
  const X = {
    s: (prompt, opts, explain) => ({ t: 'situation', prompt, opts, ans: 0, explain }),
    f: (pt, jp, opts, explain) => ({ t: 'fill', prompt: 'Complete a frase', pt, jp, opts, ans: 0, explain }),
    o: (pt, tiles, extra, explain) => ({ t: 'order', prompt: 'Monte a frase', pt, tiles, extra: extra || [], explain }),
    e: (ctx, tokens, wrong, explain) => ({ t: 'error', ctx, tokens, wrong, explain })
  };
  function lesson(id, title, emblem, kind, intro, tip, items, examples, exercises, extra) {
    const L = { id, title, emblem, kind, intro, tip, items: items.map(kind === 'kanji' ? kanji : item), examples: examples.map(exm), exercises };
    if (kind === 'kanji') L.kind = 'kanaword';
    if (extra) Object.assign(L, extra);
    return L;
  }
  /* reading: um texto curto lido na teoria (card “Texto”) */
  function text(lines) { return lines.map(exm); }
  function wing(o) {
    const c = Object.assign({ soon: [], lessons: [] }, o);
    CATS.push(c);
    return c;
  }
  return { r2k, item, kanji, lesson, wing, text, X, hasKanji };
})();
