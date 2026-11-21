/* ==========================================================
   Nihongo Quest 7.0 — VOZ DAS PERGUNTAS E DAS ALTERNATIVAS
   Cada pergunta da Listening Academy tem uma versão falada em japonês e
   cada alternativa tem a sua pronúncia. Aqui ficam:
   - KANA: conversão romaji → kana e kana → romaji (usada também pelo Dicionário);
   - LA_QJP: a pergunta falada de cada tipo de exercício;
   - LA_JP: a versão japonesa das perguntas e alternativas escritas em português
     nas lições (comp, gist, mean, line). Chave = o texto em português, exatamente.
   Para conteúdo novo: acrescente aqui o japonês de cada alternativa em português.
   O teste tests/e2e8.js falha se alguma alternativa ficar sem áudio.
   ========================================================== */
const KANA = (() => {
  const T = {
    kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ', sha: 'しゃ', shu: 'しゅ', she: 'しぇ', sho: 'しょ', cha: 'ちゃ', chu: 'ちゅ', che: 'ちぇ', cho: 'ちょ',
    nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ', hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ', mya: 'みゃ', myu: 'みゅ', myo: 'みょ', rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
    gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ', ja: 'じゃ', ju: 'じゅ', je: 'じぇ', jo: 'じょ', bya: 'びゃ', byu: 'びゅ', byo: 'びょ', pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
    sya: 'しゃ', syu: 'しゅ', syo: 'しょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ', zya: 'じゃ', zyu: 'じゅ', zyo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
    shi: 'し', chi: 'ち', tsu: 'つ', fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', ti: 'てぃ', di: 'でぃ', tu: 'つ', si: 'し', zi: 'じ', hu: 'ふ',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ', sa: 'さ', su: 'す', se: 'せ', so: 'そ', ta: 'た', te: 'て', to: 'と',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の', ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ', ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
    ya: 'や', yu: 'ゆ', yo: 'よ', ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ', wa: 'わ', wo: 'を', ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
    za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ', da: 'だ', de: 'で', do: 'ど', ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ', pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
    va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ', a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お'
  };
  const R = {}; Object.keys(T).sort((a, b) => b.length - a.length).forEach(k => { if (!R[T[k]] || /^(shi|chi|tsu|fu|ji|sha|shu|sho|cha|chu|cho|ja|ju|jo)$/.test(k)) R[T[k]] = k; });
  const strip = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  /* romaji → hiragana (aceita macron, ō, ou, oo, n', nn, consoante dobrada) */
  function toKana(ro) {
    let s = strip(ro).toLowerCase().replace(/ā/g, 'aa').replace(/[^a-z'\-\s]/g, '');
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ' || c === '-') { out += c === '-' ? 'ー' : ''; i++; continue; }
      if (c === "'") { i++; continue; }
      if (c === 'n' && (s[i + 1] === "'" || s[i + 1] === 'n' && !'aiueoy'.includes(s[i + 2] || '') || !s[i + 1] || !'aiueoy'.includes(s[i + 1]))) { out += 'ん'; i += s[i + 1] === "'" || (s[i + 1] === 'n' && !'aiueoy'.includes(s[i + 2] || '')) ? 2 : 1; continue; }
      if (c === 'm' && 'bpm'.includes(s[i + 1] || '') ) { out += 'ん'; i++; continue; }
      if (c === s[i + 1] && !'aiueon'.includes(c)) { out += 'っ'; i++; continue; }
      if (c === 't' && s[i + 1] === 'c' && s[i + 2] === 'h') { out += 'っ'; i++; continue; }
      let hit = false;
      for (const L of [3, 2, 1]) { const k = s.substr(i, L); if (T[k]) { out += T[k]; i += L; hit = true; break; } }
      if (!hit) i++;
    }
    return out;
  }
  const kata2hira = s => String(s || '').replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  /* kana → romaji (Hepburn simples; ー alonga a vogal anterior) */
  function toRomaji(kana) {
    const s = kata2hira(kana); let out = '';
    for (let i = 0; i < s.length; i++) {
      const two = s.substr(i, 2);
      if (/[ゃゅょぁぃぅぇぉ]/.test(s[i + 1] || '') && R[two]) { out += R[two]; i++; continue; }
      const ch = s[i];
      if (ch === 'っ') { const nx = R[s.substr(i + 1, /[ゃゅょ]/.test(s[i + 2] || '') ? 2 : 1)] || ''; out += nx.startsWith('ch') ? 't' : nx[0] || ''; continue; }
      if (ch === 'ん') { out += /[aiueoy]/.test((R[s[i + 1]] || '')[0] || '') ? "n'" : 'n'; continue; }
      if (ch === 'ー') { out += out.slice(-1); continue; }
      out += R[ch] || (/[\s　]/.test(ch) ? ' ' : /[a-z0-9]/i.test(ch) ? ch.toLowerCase() : '');
    }
    return out;
  }
  /* chave fonética para comparar grafias diferentes: ou/oo/ō → o, uu → u, shi/si, tsu/tu, n' … */
  function phon(s) {
    let r = strip(s).toLowerCase();
    if (/[぀-ヿ]/.test(r)) r = toRomaji(r);
    return r.replace(/[^a-z]/g, '').replace(/sh/g, 's').replace(/ch/g, 't').replace(/ts/g, 't').replace(/j/g, 'z').replace(/f/g, 'h').replace(/(.)\1+/g, '$1').replace(/ou/g, 'o').replace(/ei/g, 'e').replace(/y(?=[aiueo])/g, '');
  }
  return { toKana, toRomaji, kata2hira, phon, strip };
})();

/* pergunta falada de cada tipo (Aiko-sensei lê): japonês | romaji | português */
const LA_QJP = {
  id: 'いまの ことばは どういう いみですか。|ima no kotoba wa dou iu imi desu ka?|O que significa a palavra que você ouviu?',
  rec: 'どれを ききましたか。|dore o kikimashita ka?|Qual destas você ouviu?',
  mean: 'なんと いいましたか。|nan to iimashita ka?|O que a pessoa disse?',
  spot: 'どの ことばが ありましたか。|dono kotoba ga arimashita ka?|Qual palavra apareceu?',
  order: 'きいた じゅんばんに ならべて ください。|kiita junban ni narabete kudasai.|Monte na ordem em que você ouviu.',
  tf: 'ほんとう ですか、うそ ですか。|hontou desu ka, uso desu ka?|Verdadeiro ou falso?',
  intent: 'この ひとは なにを していますか。|kono hito wa nani o shite imasu ka?|O que esta pessoa está fazendo?',
  reply: 'なんと こたえますか。|nan to kotaemasu ka?|Como você responde?',
  comp: 'しつもんです。|shitsumon desu.|Pergunta:',
  gist: 'どんな はなし ですか。|donna hanashi desu ka?|Sobre o que é a conversa?',
  line: 'この セリフは どういう いみですか。|kono serifu wa dou iu imi desu ka?|O que significa esta fala?',
  reg: 'どんな はなしかた ですか。|donna hanashikata desu ka?|Como a pessoa está falando?'
};
/* alternativas fixas */
const LA_TF_JP = { Verdadeiro: 'ほんとう|hontou', Falso: 'うそ|uso' };
const LA_INTENT_JP = { pergunta: 'しつもん|shitsumon', agradecimento: 'おれい|orei', convite: 'さそい|sasoi', recusa: 'ことわり|kotowari', pedido: 'おねがい|onegai', desculpa: 'おわび|owabi', cumprimento: 'あいさつ|aisatsu', despedida: 'わかれの あいさつ|wakare no aisatsu', oferta: 'すすめる|susumeru' };
const LA_REG_JP = { casual: 'タメぐち（カジュアル）|tameguchi (kajuaru)', educado: 'ていねいご|teineigo', formal: 'けいご|keigo' };

/* japonês das perguntas e alternativas escritas em português (comp, gist, mean, line) */
const LA_JP = {
  // perguntas de compreensão
  'Como se chama o rapaz?': 'おとこの この なまえは なんですか。|otoko no ko no namae wa nan desu ka?',
  'Como a Yumi está?': 'ゆみさんは どうですか。|Yumi-san wa dou desu ka?',
  'Do que os dois gostam?': 'ふたりは なにが すきですか。|futari wa nani ga suki desu ka?',
  'Que horas são?': 'いま なんじですか。|ima nanji desu ka?',
  'O que o Ren propôs?': 'れんくんは なにを ていあん しましたか。|Ren-kun wa nani o teian shimashita ka?',
  'De onde o Haruto veio?': 'はるとくんは どこから きましたか。|Haruto-kun wa doko kara kimashita ka?',
  'Como a Yumi reage?': 'ゆみさんは どう はんのう しますか。|Yumi-san wa dou hannou shimasu ka?',
  'O que o Ren comprou?': 'れんくんは なにを かいましたか。|Ren-kun wa nani o kaimashita ka?',
  'Quando eles vão jogar?': 'いつ あそびますか。|itsu asobimasu ka?',
  'Por que a Yumi pede desculpas?': 'ゆみさんは どうして あやまりますか。|Yumi-san wa doushite ayamarimasu ka?',
  'Quando é a prova?': 'テストは いつですか。|tesuto wa itsu desu ka?',
  'Quantas pessoas são?': 'なんにん ですか。|nannin desu ka?',
  'O que o Ren pediu?': 'れんくんは なにを ちゅうもん しましたか。|Ren-kun wa nani o chuumon shimashita ka?',
  'O que eles vão beber?': 'なにを のみますか。|nani o nomimasu ka?',
  'O que a professora quer comprar?': 'せんせいは なにを かいたいですか。|sensei wa nani o kaitai desu ka?',
  'Quanto custa?': 'いくら ですか。|ikura desu ka?',
  'Qual é o hobby do Haruto?': 'はるとくんの しゅみは なんですか。|Haruto-kun no shumi wa nan desu ka?',
  'Que músicas a Yumi mais canta?': 'ゆみさんは どんな うたを よく うたいますか。|Yumi-san wa donna uta o yoku utaimasu ka?',
  'A que horas o Ren costuma acordar?': 'れんくんは いつも なんじに おきますか。|Ren-kun wa itsumo nanji ni okimasu ka?',
  'O que aconteceu hoje?': 'きょう なにが ありましたか。|kyou nani ga arimashita ka?',
  'Sobre quais assuntos eles falam?': 'なんの はなしを していますか。|nan no hanashi o shite imasu ka?',
  'Que expressão o Ren usa para mudar de assunto?': 'れんくんは わだいを かえる とき、なんと いいますか。|Ren-kun wa wadai o kaeru toki, nan to iimasu ka?',
  'Como foi a prova da Yumi?': 'ゆみさんの テストは どうでしたか。|Yumi-san no tesuto wa dou deshita ka?',
  'Quando a Yumi está livre?': 'ゆみさんは いつ ひまですか。|Yumi-san wa itsu hima desu ka?',
  'Por que ela não pode no sábado?': 'どうして どようびは だめですか。|doushite doyoubi wa dame desu ka?',
  'O que eles vão fazer?': 'なにを しますか。|nani o shimasu ka?',
  'Para que serve えーと na fala da Yumi?': 'ゆみさんの 「えーと」は なんの ためですか。|Yumi-san no "eeto" wa nan no tame desu ka?',
  'O que acontece na conversa?': 'かいわで なにが おきますか。|kaiwa de nani ga okimasu ka?',
  'Por que o primeiro produto não tem desconto?': 'どうして ひとつめは ねびき できませんか。|doushite hitotsume wa nebiki dekimasen ka?',
  'O que o Ren decide?': 'れんくんは どう しますか。|Ren-kun wa dou shimasu ka?',
  'O que as três pessoas dizem?': '三にんは なんと いっていますか。|sannin wa nan to itte imasu ka?',
  'Qual é o plano?': 'よていは なんですか。|yotei wa nan desu ka?',
  'Por que a professora não pode ir mais cedo?': 'せんせいは どうして はやく いけませんか。|sensei wa doushite hayaku ikemasen ka?',
  'Onde e quando eles se encontram?': 'いつ どこで あいますか。|itsu doko de aimasu ka?',
  'Como o Ren fala com a professora?': 'れんくんは せんせいに どう はなしますか。|Ren-kun wa sensei ni dou hanashimasu ka?',
  'Por que a Yumi ligou?': 'ゆみさんは どうして でんわ しましたか。|Yumi-san wa doushite denwa shimashita ka?',
  'A que horas eles vão se encontrar?': 'なんじに あいますか。|nanji ni aimasu ka?',
  'Onde eles vão se encontrar?': 'どこで あいますか。|doko de aimasu ka?',
  'O que らしい indica na fala da Yumi?': 'ゆみさんの 「らしい」は なにを あらわしますか。|Yumi-san no "rashii" wa nani o arawashimasu ka?',
  // alternativas
  'Bom apetite!': 'いただきます！|itadakimasu!',
  'Até amanhã!': 'また あした！|mata ashita!',
  'Com licença.': 'しつれいします。|shitsurei shimasu.',
  'Bom dia!': 'おはよう！|ohayou!',
  'Obrigado!': 'ありがとう！|arigatou!',
  'Quero chá, por favor.': 'おちゃを ください。|ocha o kudasai.',
  'Onde fica a água?': 'みずは どこですか。|mizu wa doko desu ka?',
  'A água está gelada.': 'みずが つめたいです。|mizu ga tsumetai desu.',
  'Mais devagar, por favor.': 'ゆっくり おねがいします。|yukkuri onegai shimasu.',
  'Muito obrigado.': 'どうも ありがとう ございます。|doumo arigatou gozaimasu.',
  'Até a próxima.': 'また こんど。|mata kondo.',
  'Isto é um livro.': 'これは ほんです。|kore wa hon desu.',
  'Onde é aqui?': 'ここは どこですか。|koko wa doko desu ka?',
  'Quem é ela?': 'あの ひとは だれですか。|ano hito wa dare desu ka?',
  'Não entendi.': 'わかりません。|wakarimasen.',
  'Não sei.': 'しりません。|shirimasen.',
  'Você entendeu?': 'わかりましたか。|wakarimashita ka?',
  'Está com fome?': 'おなかが すきましたか。|onaka ga sukimashita ka?',
  'Está cansada?': 'つかれましたか。|tsukaremashita ka?',
  'Vai sair?': 'でかけますか。|dekakemasu ka?',
  'De onde você é?': 'どこから きましたか。|doko kara kimashita ka?',
  'Quantos anos você tem?': 'なんさい ですか。|nansai desu ka?',
  'O que você faz?': 'おしごとは なんですか。|oshigoto wa nan desu ka?',
  'Haruto': 'はると|Haruto',
  'Yumi': 'ゆみ|Yumi',
  'Ren': 'れん|Ren',
  'Um pouco cansada': 'ちょっと つかれています|chotto tsukarete imasu',
  'Muito animada': 'とても げんき|totemo genki',
  'Com fome': 'おなかが すいています|onaka ga suite imasu',
  'Está cansado?': 'つかれた？|tsukareta?',
  'O que você quer comer?': 'なにが たべたいですか。|nani ga tabetai desu ka?',
  'Onde você mora?': 'どこに すんでいますか。|doko ni sunde imasu ka?',
  'O que é isto?': 'これは なんですか。|kore wa nan desu ka?',
  'Lámen': 'ラーメン|raamen',
  'Games': 'ゲーム|geemu',
  'Anime': 'アニメ|anime',
  'Quando você vai?': 'いつ いきますか。|itsu ikimasu ka?',
  'Com quem você vai?': 'だれと いきますか。|dare to ikimasu ka?',
  'O que você vai comer?': 'なにを たべますか。|nani o tabemasu ka?',
  'Três horas': '三じ|sanji',
  'Duas horas': '二じ|niji',
  'Dez horas': '十じ|juuji',
  'Ir ao karaokê amanhã': 'あした カラオケに いく|ashita karaoke ni iku',
  'Estudar juntos hoje': 'きょう いっしょに べんきょうする|kyou issho ni benkyou suru',
  'Comer lámen agora': 'いま ラーメンを たべる|ima raamen o taberu',
  'Do Brasil': 'ブラジルから|Burajiru kara',
  'Do Japão': 'にほんから|Nihon kara',
  'De Portugal': 'ポルトガルから|Porutogaru kara',
  'Fica impressionada': 'すごいと おもう|sugoi to omou',
  'Fica triste': 'かなしくなる|kanashiku naru',
  'Não entende': 'わからない|wakaranai',
  'Eu também sou do Brasil.': 'わたしも ブラジルから きました。|watashi mo Burajiru kara kimashita.',
  'Até amanhã, pessoal.': 'みんな、また あした。|minna, mata ashita.',
  'Desculpem o atraso.': 'おくれて すみません。|okurete sumimasen.',
  'Um jogo novo': 'あたらしい ゲーム|atarashii geemu',
  'Um mangá': 'まんが|manga',
  'Um lámen': 'ラーメン ひとつ|raamen hitotsu',
  'No sábado': 'どようびに|doyoubi ni',
  'Hoje': 'きょう|kyou',
  'Na segunda': 'げつようびに|getsuyoubi ni',
  'Eu não gosto de jogos.': 'ゲームは すきじゃない。|geemu wa suki ja nai.',
  'Onde você comprou?': 'どこで かったの？|doko de katta no?',
  'Quanto custou?': 'いくら だった？|ikura datta?',
  'Esqueceu a lição de casa': 'しゅくだいを わすれた|shukudai o wasureta',
  'Chegou atrasada': 'ちこく した|chikoku shita',
  'Perdeu a prova': 'テストを うけなかった|tesuto o ukenakatta',
  'Sexta da semana que vem': 'らいしゅうの きんようび|raishuu no kin\'youbi',
  'Amanhã': 'あした|ashita',
  'Esta segunda': 'こんしゅうの げつようび|konshuu no getsuyoubi',
  'Ótimo, você fez tudo certo.': 'よく できました。ぜんぶ できましたね。|yoku dekimashita. zenbu dekimashita ne.',
  'A prova é amanhã.': 'テストは あしたです。|tesuto wa ashita desu.',
  'Vá para casa agora.': 'いま うちに かえって ください。|ima uchi ni kaette kudasai.',
  'Duas': 'ふたり|futari',
  'Uma': 'ひとり|hitori',
  'Três': 'さんにん|sannin',
  'Dois lámens': 'ラーメン ふたつ|raamen futatsu',
  'Um lámen e um chá': 'ラーメン ひとつと おちゃ ひとつ|raamen hitotsu to ocha hitotsu',
  'Dois chás': 'おちゃ ふたつ|ocha futatsu',
  'Água': 'おみず|omizu',
  'Chá': 'おちゃ|ocha',
  'Suco': 'ジュース|juusu',
  'Um guarda-chuva': 'かさ|kasa',
  'Uma sacola': 'ふくろ|fukuro',
  'Um livro': 'ほん|hon',
  'Mil ienes': 'せんえん|sen\'en',
  'Cem ienes': 'ひゃくえん|hyakuen',
  'Dez mil ienes': 'いちまんえん|ichiman\'en',
  'Volte sempre.': 'また おこし ください。|mata okoshi kudasai.',
  'Esse acabou.': 'それは うりきれです。|sore wa urikire desu.',
  'Quer pagar com cartão?': 'カードで おしはらいですか。|kaado de oshiharai desu ka?',
  'Futebol e games': 'サッカーと ゲーム|sakkaa to geemu',
  'Karaokê': 'カラオケ|karaoke',
  'Ler livros': 'ほんを よむ こと|hon o yomu koto',
  'De anime': 'アニメの うた|anime no uta',
  'De rock': 'ロック|rokku',
  'Músicas antigas': 'むかしの うた|mukashi no uta',
  'Eu não gosto de música.': 'おんがくは すきじゃない。|ongaku wa suki ja nai.',
  'Vamos agora?': 'いま いこうか。|ima ikou ka?',
  'Às sete': '七じに|shichiji ni',
  'Às seis': '六じに|rokuji ni',
  'Às oito': '八じに|hachiji ni',
  'Ele perdeu a hora': 'ねぼう した|nebou shita',
  'Ele acordou cedo': 'はやく おきた|hayaku okita',
  'Ele faltou à aula': 'じゅぎょうを やすんだ|jugyou o yasunda',
  'Comi muito, estou cheio.': 'たくさん たべて、おなかが いっぱいです。|takusan tabete, onaka ga ippai desu.',
  'Vou comer depois da aula.': 'じゅぎょうの あとで たべます。|jugyou no ato de tabemasu.',
  'Não gosto de café da manhã.': 'あさごはんは すきじゃないです。|asagohan wa suki ja nai desu.',
  'Um anime e a prova': 'アニメと テスト|anime to tesuto',
  'Um jogo e um restaurante': 'ゲームと レストラン|geemu to resutoran',
  'O clima e as férias': 'てんきと やすみ|tenki to yasumi',
  'そういえば (sou ieba)': 'そういえば|sou ieba',
  'だよね (da yo ne)': 'だよね|da yo ne',
  'わかる (wakaru)': 'わかる|wakaru',
  'Mais ou menos; matemática foi difícil': 'まあまあ。すうがくが むずかしかった|maa maa. suugaku ga muzukashikatta',
  'Ótima': 'すごく よかった|sugoku yokatta',
  'Ela não fez a prova': 'テストを うけなかった|tesuto o ukenakatta',
  'Não vi, estava ocupada.': 'みてない。いそがしかった。|mitenai. isogashikatta.',
  'O final foi chato.': 'さいごは つまらなかった。|saigo wa tsumaranakatta.',
  'Não gosto desse anime.': 'その アニメは すきじゃない。|sono anime wa suki ja nai.',
  'No domingo': 'にちようびに|nichiyoubi ni',
  'O fim de semana todo': 'しゅうまつ ずっと|shuumatsu zutto',
  'Tem trabalho (バイト)': 'バイトが ある|baito ga aru',
  'Tem prova': 'テストが ある|tesuto ga aru',
  'Vai viajar': 'りょこうに いく|ryokou ni iku',
  'Ver um filme': 'えいがを みる|eiga o miru',
  'Ir ao karaokê': 'カラオケに いく|karaoke ni iku',
  'Estudar': 'べんきょうする|benkyou suru',
  'Ganhar tempo enquanto pensa': 'かんがえる じかんを つくる|kangaeru jikan o tsukuru',
  'Recusar o convite': 'さそいを ことわる|sasoi o kotowaru',
  'Mostrar surpresa': 'おどろきを あらわす|odoroki o arawasu',
  'Ren pede desconto: no primeiro não dá, no segundo sim': 'れんくんが ねびきを たのむ。ひとつめは だめ、ふたつめは オーケー|Ren-kun ga nebiki o tanomu. hitotsume wa dame, futatsume wa ookee',
  'Ren devolve um produto com defeito': 'れんくんが こわれた しょうひんを かえす|Ren-kun ga kowareta shouhin o kaesu',
  'Takeshi oferece um emprego ao Ren': 'たけしさんが れんくんに しごとを すすめる|Takeshi-san ga Ren-kun ni shigoto o susumeru',
  'Já está em promoção': 'もう セール ちゅう|mou seeru chuu',
  'Acabou o estoque': 'ざいこが ない|zaiko ga nai',
  'É muito barato': 'とても やすい|totemo yasui',
  'Levar o segundo produto': 'ふたつめを かう|futatsume o kau',
  'Não comprar nada': 'なにも かわない|nani mo kawanai',
  'Voltar outro dia': 'また こんど くる|mata kondo kuru',
  'Que não pode tirar foto ali': 'そこで しゃしんを とっては いけない|soko de shashin o totte wa ikenai',
  'Que a foto ficou bonita': 'しゃしんが きれいに とれた|shashin ga kirei ni toreta',
  'Que querem tirar uma foto juntos': 'いっしょに しゃしんを とりたい|issho ni shashin o toritai',
  'Está fechado.': 'しまっています。|shimatte imasu.',
  'Pode entrar.': 'どうぞ、はいって ください。|douzo, haitte kudasai.',
  'Ir ao festival no sábado à noite': 'どようびの よる、おまつりに いく|doyoubi no yoru, omatsuri ni iku',
  'Estudar na casa da professora': 'せんせいの いえで べんきょうする|sensei no ie de benkyou suru',
  'Ver fogos no domingo de manhã': 'にちようびの あさ、はなびを みる|nichiyoubi no asa, hanabi o miru',
  'Trabalha até a tarde': 'ゆうがたまで しごと|yuugata made shigoto',
  'Tem outro compromisso à noite': 'よるは ほかの ようじが ある|yoru wa hoka no youji ga aru',
  'Está doente': 'びょうき|byouki',
  'Às seis, na estação': '六じに えきで|rokuji ni eki de',
  'Às sete, na escola': '七じに がっこうで|shichiji ni gakkou de',
  'Ao meio-dia, no festival': 'おひるに おまつりで|ohiru ni omatsuri de',
  'Educado, mas descontraído (〜っす)': 'ていねいだけど くだけた はなしかた（〜っす）|teinei dakedo kudaketa hanashikata (~ssu)',
  'Com keigo de atendimento': 'せっきゃくの けいご|sekkyaku no keigo',
  'Totalmente casual, como com amigos': 'ともだちと はなす ような タメぐち|tomodachi to hanasu you na tameguchi',
  'Que pena, não vou poder.': 'ざんねん、いけないんだ。|zannen, ikenai n da.',
  'Estou muito cansada.': 'すごく つかれた。|sugoku tsukareta.',
  'Vou pensar e respondo depois.': 'かんがえて、あとで へんじ するね。|kangaete, ato de henji suru ne.',
  'Para mudar o horário do filme por causa da chuva': 'あめだから えいがの じかんを かえるため|ame dakara eiga no jikan o kaeru tame',
  'Para cancelar o filme': 'えいがを キャンセル するため|eiga o kyanseru suru tame',
  'Para convidar o Ren pela primeira vez': 'はじめて れんくんを さそうため|hajimete Ren-kun o sasou tame',
  'Às duas da tarde': 'ごご 二じに|gogo niji ni',
  'Às seis da tarde': 'ゆうがた 六じに|yuugata rokuji ni',
  'Ao meio-dia': 'おひるに|ohiru ni',
  'Na frente do cinema': 'えいがかんの まえで|eigakan no mae de',
  'Na estação': 'えきで|eki de',
  'Na casa da Yumi': 'ゆみさんの いえで|Yumi-san no ie de',
  'Ela ouviu dizer (previsão), não tem certeza': 'てんきよほうで きいた。たしかでは ない|tenki yohou de kiita. tashika de wa nai',
  'Ela tem certeza absoluta': 'ぜったいに そうだと おもっている|zettai ni sou da to omotte iru',
  'Ela gosta de chuva': 'あめが すき|ame ga suki',
  'Alô, o Ren está em casa?': 'もしもし、れんくんは いますか。|moshimoshi, Ren-kun wa imasu ka?',
  'Oi, Ren, cheguei!': 'れん、ついたよ！|Ren, tsuita yo!',
  'Ren, você está atrasado?': 'れん、おくれてる？|Ren, okureteru?'
};
/* pronúncia de uma alternativa: { jp, ro } ou null */
function laJpFor(pt) { const v = LA_JP[pt]; if (!v) return null; const [jp, ro] = v.split('|'); return { jp, ro }; }
