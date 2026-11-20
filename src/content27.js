/* ==========================================================
   CONTEÚDO 3.0 — Academia Auditiva ampliada:
   pares de som, frases da fala natural, “Responder certo” (aud-resp),
   novos diálogos e treinos auditivos com as lições intermediárias e avançadas.
   A leitura para a voz (say) é gerada do romaji quando há kanji.
   ========================================================== */
(function () {
  const { r2k, hasKanji } = NQK;
  const pack = id => AUDIO_PACKS.find(p => p.id === id);
  const sayOf = (jp, ro) => hasKanji(jp) ? r2k(ro) : undefined;
  const A = o => { const s = sayOf(o.jp, o.ro); if (s) o.say = s; return o; };

  /* ---------------- pares de som ---------------- */
  pack('aud-pal').items.push(
    A({ k: 'kado', jp: '角', ro: 'kado', pt: 'esquina, canto', lv: 1, note: '“a” curto: ka-do.' }),
    A({ k: 'kaado', jp: 'カード', ro: 'kaado', pt: 'cartão', lv: 1, note: '“a” longo: kaa-do. Do inglês “card”.' }),
    A({ k: 'koi', jp: '恋', ro: 'koi', pt: 'amor, paixão', lv: 1, note: 'Termina em “i”: ko-i. Compare com 声 (koe, voz).' }),
    A({ k: 'ita', jp: 'いた', ro: 'ita', pt: 'estava (pessoa ou animal)', lv: 2, note: 'Sem pausa: i-ta. Passado de いる.' }),
    A({ k: 'itta', jp: '行った', ro: 'itta', pt: 'foi (a algum lugar)', lv: 2, note: 'Com pausa: it-ta. Passado de 行く.' }),
    A({ k: 'kinnen', jp: '禁煙', ro: "kin'en", pt: 'proibido fumar', lv: 3, note: 'O ん é um som inteiro: ki-n-e-n (quatro tempos).' }),
    A({ k: 'kinen', jp: '記念', ro: 'kinen', pt: 'lembrança, comemoração', lv: 3, note: 'Três tempos: ki-ne-n. Só um ん, no fim.' }),
    A({ k: 'tani', jp: '谷', ro: 'tani', pt: 'vale', lv: 3, note: 'Dois tempos: ta-ni. Compare com 単位 (tan\'i, crédito), que tem três.' }),
    A({ k: 'riyou', jp: '利用', ro: 'riyou', pt: 'uso, utilização', lv: 3, note: 'Três tempos: ri-yo-u. Compare com 量 (ryou, quantidade), que tem dois.' })
  );
  PRON_SETS.push(
    { id: 'kado', lv: 1, ids: ['aud-pal:kado', 'aud-pal:kaado'] },
    { id: 'koi', lv: 1, ids: ['aud-pal:koi', 'c17l8:koe'] },
    { id: 'itta', lv: 2, ids: ['aud-pal:ita', 'aud-pal:itta'] },
    { id: 'shiken', lv: 2, ids: ['c11l10:shiken', 'c19l5:jiken'] },
    { id: 'kinen', lv: 3, ids: ['aud-pal:kinnen', 'aud-pal:kinen'] },
    { id: 'tani', lv: 3, ids: ['aud-pal:tani', "c26l7:tan'i"] },
    { id: 'ryou', lv: 3, ids: ['c22l7:ryou', 'aud-pal:riyou'] }
  );

  /* ---------------- frases da fala natural e avisos ---------------- */
  pack('aud-fra').items.push(
    A({ k: 'mattete', jp: 'ちょっと待ってて。', ro: 'chotto mattete.', pt: 'Espera um pouquinho aí.', lv: 3, note: '待っていて → 待ってて (o い cai na fala).' }),
    A({ k: 'kaecchatta', jp: 'もう帰っちゃったの？', ro: 'mou kaecchatta no?', pt: 'Já foi embora?', lv: 3, note: '帰ってしまった → 帰っちゃった.' }),
    A({ k: 'kurerebayokatta', jp: '言ってくれればよかったのに。', ro: 'itte kurereba yokatta noni.', pt: 'Era só ter me falado.', lv: 3, note: '〜ばよかったのに = lamentar que não tenha sido feito.' }),
    A({ k: 'nanyatten', jp: '何やってんの？', ro: 'nani yatten no?', pt: 'O que você está fazendo?', lv: 3, note: 'やっているの → やってんの.' }),
    A({ k: 'ikanakya', jp: 'そろそろ行かなきゃ。', ro: 'sorosoro ikanakya.', pt: 'Já tenho que ir.', lv: 3, note: '行かなければ → 行かなきゃ.' }),
    A({ k: 'tabesugichatta', jp: '食べ過ぎちゃった。', ro: 'tabesugichatta.', pt: 'Comi demais.', lv: 3, note: '過ぎる = demais. ちゃった = acabou acontecendo.' }),
    A({ k: 'ichibansen', jp: 'まもなく、一番線に電車が参ります。', ro: 'mamonaku, ichibansen ni densha ga mairimasu.', pt: 'Em instantes, o trem chegará na plataforma 1.', lv: 3, note: 'Aviso de estação. 参ります = humilde de 来ます.' }),
    A({ k: 'kiiroisen', jp: '黄色い線の内側までお下がりください。', ro: 'kiiroi sen no uchigawa made osagari kudasai.', pt: 'Afastem-se para trás da faixa amarela.', lv: 3, note: 'Aviso de plataforma. お〜ください = pedido respeitoso.' }),
    A({ k: 'okaikei', jp: 'お会計、千五百円になります。', ro: 'okaikei, sengohyaku en ni narimasu.', pt: 'O total fica em 1.500 ienes.', lv: 3, note: 'Linguagem de caixa. になります = é (educado).' }),
    A({ k: 'rusuden', jp: 'ただいま、電話に出ることができません。', ro: 'tadaima, denwa ni deru koto ga dekimasen.', pt: 'No momento, não posso atender.', lv: 3, note: 'Mensagem de caixa postal. ただいま aqui = neste momento.' }),
    A({ k: 'goraiten', jp: '本日はご来店いただき、誠にありがとうございます。', ro: 'honjitsu wa goraiten itadaki, makoto ni arigatou gozaimasu.', pt: 'Muito obrigado por visitar nossa loja hoje.', lv: 3, note: 'Aviso de loja. 誠に = sinceramente (formal).' }),
    A({ k: 'kasamotte', jp: '雨降りそうだから、傘持ってったほうがいいよ。', ro: 'ame furisou da kara, kasa mottetta hou ga ii yo.', pt: 'Parece que vai chover, é melhor levar o guarda-chuva.', lv: 3, note: 'Fala natural: が cai, 持っていった → 持ってった.' }),
    A({ k: 'douiuimi', jp: 'それって、どういう意味？', ro: 'sore tte, dou iu imi?', pt: 'Isso quer dizer o quê?', lv: 3, note: 'って = は na fala casual.' }),
    A({ k: 'chuushine', jp: '明日、雨だったら中止ね。', ro: 'ashita, ame dattara chuushi ne.', pt: 'Se chover amanhã, cancela, tá?', lv: 3, note: '〜たら = se. 中止 = cancelamento.' })
  );

  /* ---------------- Responder certo: ouça e escolha a resposta adequada ---------------- */
  const R = (k, lv, jp, ro, pt, reply, wrong, note) => A({ k, lv, jp, ro, pt, reply: A({ jp: reply[0], ro: reply[1], pt: reply[2] }), wrong: wrong.map(w => A({ jp: w[0], ro: w[1], pt: w[2] })), note });
  AUDIO_PACKS.push({ id: 'aud-resp', title: 'Responder certo', group: 'resposta', items: [
    R('arigatou', 1, 'ありがとうございます。', 'arigatou gozaimasu.', 'Muito obrigado.',
      ['どういたしまして。', 'dou itashimashite.', 'De nada.'],
      [['いただきます。', 'itadakimasu.', 'Obrigado pela comida (antes de comer).'], ['おやすみなさい。', 'oyasuminasai.', 'Boa noite (ao dormir).']], 'Resposta padrão a um agradecimento.'),
    R('hajimemashite', 1, 'はじめまして。アオイです。', 'hajimemashite. aoi desu.', 'Muito prazer. Sou a Aoi.',
      ['はじめまして。よろしくお願いします。', 'hajimemashite. yoroshiku onegai shimasu.', 'Muito prazer. Conto com você.'],
      [['ごちそうさまでした。', 'gochisousama deshita.', 'Obrigado pela refeição.'], ['いってきます。', 'ittekimasu.', 'Estou saindo.']], 'No primeiro encontro, repita はじめまして e complete com よろしく.'),
    R('ittekimasu', 1, 'いってきます！', 'ittekimasu!', 'Estou saindo!',
      ['いってらっしゃい！', 'itterasshai!', 'Vai e volta bem!'],
      [['おかえりなさい。', 'okaerinasai.', 'Bem-vindo de volta.'], ['はじめまして。', 'hajimemashite.', 'Muito prazer.']], 'Par fixo: いってきます → いってらっしゃい.'),
    R('tadaima', 1, 'ただいま！', 'tadaima!', 'Cheguei!',
      ['おかえり！', 'okaeri!', 'Bem-vindo de volta!'],
      [['いってらっしゃい。', 'itterasshai.', 'Vai e volta bem.'], ['いただきます。', 'itadakimasu.', 'Obrigado pela comida.']], 'Par fixo: ただいま → おかえり.'),
    R('okuremashita', 1, 'すみません、遅れました。', 'sumimasen, okuremashita.', 'Desculpe, me atrasei.',
      ['大丈夫ですよ。', 'daijoubu desu yo.', 'Tudo bem.'],
      [['おめでとうございます！', 'omedetou gozaimasu!', 'Parabéns!'], ['いただきます。', 'itadakimasu.', 'Obrigado pela comida.']], 'Para aceitar um pedido de desculpas: 大丈夫ですよ ou 気にしないで.'),
    R('ogenkidesuka', 1, 'お元気ですか。', 'ogenki desu ka.', 'Como vai?',
      ['はい、元気です。', 'hai, genki desu.', 'Vou bem.'],
      [['はい、三つです。', 'hai, mittsu desu.', 'Sim, são três.'], ['いいえ、猫です。', 'iie, neko desu.', 'Não, é um gato.']], 'A pergunta é sobre a saúde e o ânimo.'),
    R('tanjoubi', 1, '誕生日おめでとう！', 'tanjoubi omedetou!', 'Feliz aniversário!',
      ['ありがとう！', 'arigatou!', 'Obrigado!'],
      [['ごめんね。', 'gomen ne.', 'Desculpa.'], ['お大事に。', 'odaiji ni.', 'Melhoras.']], 'Agradeça os parabéns.'),
    R('kazehiita', 2, '風邪ひいちゃった…。', 'kaze hiichatta….', 'Peguei um resfriado…',
      ['大丈夫？お大事にね。', 'daijoubu? odaiji ni ne.', 'Tudo bem? Melhoras.'],
      [['おめでとう！', 'omedetou!', 'Parabéns!'], ['いただきます。', 'itadakimasu.', 'Obrigado pela comida.']], 'Para alguém doente: お大事に.'),
    R('osakini', 2, 'お先に失礼します。', 'osaki ni shitsurei shimasu.', 'Com licença, vou indo antes.',
      ['お疲れ様でした。', 'otsukaresama deshita.', 'Bom trabalho, até amanhã.'],
      [['いらっしゃいませ。', 'irasshaimase.', 'Bem-vindo (à loja).'], ['はじめまして。', 'hajimemashite.', 'Muito prazer.']], 'Quando um colega sai do trabalho antes: お疲れ様でした.'),
    R('eiga', 2, '今度、一緒に映画見に行かない？', 'kondo, issho ni eiga mi ni ikanai?', 'Que tal irmos ao cinema juntos qualquer dia?',
      ['いいね、行こう！', 'ii ne, ikou!', 'Boa, vamos!'],
      [['いいえ、映画です。', 'iie, eiga desu.', 'Não, é um filme.'], ['いってきます。', 'ittekimasu.', 'Estou saindo.']], '〜ない？ é um convite, não uma negação.'),
    R('tsumaranai', 2, 'これ、つまらないものですが…。', 'kore, tsumaranai mono desu ga….', 'É só uma lembrancinha…',
      ['わざわざありがとうございます。', 'wazawaza arigatou gozaimasu.', 'Obrigado pela gentileza.'],
      [['本当につまらないですね。', 'hontou ni tsumaranai desu ne.', 'É mesmo sem graça, hein.'], ['いりません。', 'irimasen.', 'Não preciso.']], 'つまらないもの é modéstia. Agradeça.'),
    R('mayotta', 2, '道に迷っちゃった…。', 'michi ni mayocchatta….', 'Me perdi…',
      ['どこに行きたいの？', 'doko ni ikitai no?', 'Aonde você quer ir?'],
      [['おかえり。', 'okaeri.', 'Bem-vindo de volta.'], ['ごちそうさま。', 'gochisousama.', 'Obrigado pela comida.']], 'Ofereça ajuda perguntando o destino.'),
    R('gochuumon', 2, 'ご注文はお決まりですか。', 'gochuumon wa okimari desu ka.', 'Já decidiu o pedido?',
      ['はい、ラーメンを一つお願いします。', 'hai, raamen o hitotsu onegai shimasu.', 'Sim, um ramen, por favor.'],
      [['はい、お決まりです。', 'hai, okimari desu.', 'Sim, está decidido (honorífico).'], ['いいえ、元気です。', 'iie, genki desu.', 'Não, estou bem.']], 'Não use honorífico (お決まり) sobre si mesmo.'),
    R('tetsudau', 2, '手伝おうか？', 'tetsudaou ka?', 'Quer que eu ajude?',
      ['ありがとう、助かる！', 'arigatou, tasukaru!', 'Obrigado, ajuda muito!'],
      [['どういたしまして。', 'dou itashimashite.', 'De nada.'], ['いってらっしゃい。', 'itterasshai.', 'Vai e volta bem.']], '助かる = isso me ajuda.'),
    R('ashitatesuto', 2, '明日、テストだよ。', 'ashita, tesuto da yo.', 'Amanhã tem prova, viu.',
      ['えっ、まじで？', 'e, maji de?', 'Hein, sério?'],
      [['おめでとうございます。', 'omedetou gozaimasu.', 'Parabéns.'], ['お邪魔します。', 'ojama shimasu.', 'Com licença (entrando na casa).']], 'Reação natural de surpresa.'),
    R('shoushou', 3, '少々お待ちいただけますか。', 'shoushou omachi itadakemasu ka.', 'Poderia aguardar um momento?',
      ['はい、お願いします。', 'hai, onegai shimasu.', 'Sim, por favor.'],
      [['いいえ、待ちません。', 'iie, machimasen.', 'Não, não vou esperar.'], ['待っててね。', 'mattete ne.', 'Espera aí, tá?']], 'Ao telefone, aceite com はい、お願いします.'),
    R('goiken', 3, '今回の企画について、ご意見をお聞かせください。', 'konkai no kikaku ni tsuite, goiken o okikase kudasai.', 'Gostaríamos de ouvir sua opinião sobre este projeto.',
      ['そうですね、一点だけよろしいでしょうか。', 'sou desu ne, itten dake yoroshii deshou ka.', 'Bem, posso comentar um ponto?'],
      [['別に。', 'betsu ni.', 'Nada não.'], ['知らないよ。', 'shiranai yo.', 'Sei lá.']], 'Numa reunião, peça a palavra com educação.'),
    R('senjitsu', 3, '先日はありがとうございました。', 'senjitsu wa arigatou gozaimashita.', 'Obrigado pelo outro dia.',
      ['いえいえ、こちらこそありがとうございました。', 'ieie, kochira koso arigatou gozaimashita.', 'Imagina, eu é que agradeço.'],
      [['いいえ、違います。', 'iie, chigaimasu.', 'Não, está errado.'], ['はじめまして。', 'hajimemashite.', 'Muito prazer.']], 'No Japão, agradece-se de novo pelo encontro anterior. Retribua com こちらこそ.'),
    R('okuchini', 3, 'お口に合うか分かりませんが、どうぞ。', 'okuchi ni au ka wakarimasen ga, douzo.', 'Não sei se vai agradar ao seu paladar, mas sirva-se.',
      ['では、遠慮なくいただきます。', 'dewa, enryo naku itadakimasu.', 'Então, vou aceitar sem cerimônia.'],
      [['まずそうですね。', 'mazusou desu ne.', 'Parece ruim, hein.'], ['ごちそうさまでした。', 'gochisousama deshita.', 'Obrigado pela refeição (depois de comer).']], 'Aceite a oferta modesta com 遠慮なくいただきます.'),
    R('kaigideru', 3, '来週の会議、出られる？', 'raishuu no kaigi, derareru?', 'Você consegue ir à reunião da semana que vem?',
      ['ごめん、その日はちょっと…。', 'gomen, sono hi wa chotto….', 'Desculpa, esse dia é meio complicado…'],
      [['うん、会議だね。さようなら。', 'un, kaigi da ne. sayounara.', 'É, é uma reunião. Adeus.'], ['はい、出られました。', 'hai, deraremashita.', 'Sim, consegui ir (passado).']], 'Recusa suave natural: ちょっと… com a frase incompleta.'),
    R('goshuushou', 3, 'このたびはご愁傷様です。', 'kono tabi wa goshuushousama desu.', 'Meus sentimentos.',
      ['ご丁寧にありがとうございます。', 'goteinei ni arigatou gozaimasu.', 'Obrigado pela consideração.'],
      [['おめでとうございます。', 'omedetou gozaimasu.', 'Parabéns.'], ['どういたしまして。', 'dou itashimashite.', 'De nada.']], 'Quem recebe os pêsames agradece a consideração.'),
    R('kekkon', 3, '結婚することになりました！', 'kekkon suru koto ni narimashita!', 'Vou me casar!',
      ['おめでとうございます！お幸せに。', 'omedetou gozaimasu! oshiawase ni.', 'Parabéns! Felicidades.'],
      [['お大事に。', 'odaiji ni.', 'Melhoras.'], ['ご愁傷様です。', 'goshuushousama desu.', 'Meus sentimentos.']], 'Boa notícia pede parabéns.'),
    R('gomeiwaku', 3, 'ご迷惑をおかけして、申し訳ございません。', 'gomeiwaku o okake shite, moushiwake gozaimasen.', 'Peço desculpas pelo transtorno.',
      ['いえ、どうぞお気になさらないでください。', 'ie, douzo oki ni nasaranaide kudasai.', 'Não, por favor, não se preocupe.'],
      [['はい、迷惑です。', 'hai, meiwaku desu.', 'Sim, é um transtorno.'], ['どういたしまして。', 'dou itashimashite.', 'De nada.']], 'Responda a um pedido de desculpas formal tranquilizando.'),
    R('wazawaza', 3, '遠いところ、わざわざお越しいただいて…。', 'tooi tokoro, wazawaza okoshi itadaite….', 'O senhor veio de tão longe…',
      ['いえ、こちらこそお時間をいただき、ありがとうございます。', 'ie, kochira koso ojikan o itadaki, arigatou gozaimasu.', 'Imagina, eu é que agradeço por seu tempo.'],
      [['はい、遠かったです。疲れました。', 'hai, tookatta desu. tsukaremashita.', 'Sim, foi longe. Estou cansado.'], ['お邪魔しました。', 'ojama shimashita.', 'Com licença (ao sair).']], 'Retribua a gentileza com こちらこそ.')
  ] });

  /* ---------------- treinos auditivos com as lições intermediárias e avançadas ---------------- */
  LISTEN_V1[3].push('c11l1', 'c11l2', 'c11l3', 'c19l1', 'c19l2', 'c19l7', 'c19l8', 'c19l11', 'c21l5', 'c21l6');
  LISTEN_V1_FRASES[3].push('c15l1', 'c15l3', 'c15l5', 'c15l8', 'c16l1', 'c16l5', 'c16l6', 'c16l15', 'c18l2', 'c18l4', 'c18l14', 'c21l1', 'c21l2', 'c21l3', 'c21l8', 'c21l9', 'c20l7', 'c25l1', 'c25l7', 'c27l1');

  /* ---------------- Laboratório de Diálogos: fala natural, trabalho e dialeto ---------------- */
  Object.assign(CHARS, {
    buchou: { name: 'Diretora Sato', jp: 'さとうぶちょう', pitch: 1.0, color: 'var(--gold-ink)' },
    kenta: { name: 'Kenta (Osaka)', jp: 'けんた', pitch: 0.8, color: 'var(--bad)' },
    okami: { name: 'Dona da pousada', jp: 'おかみ', pitch: 1.15, color: 'var(--ok)' },
    uketsuke: { name: 'Recepcionista', jp: 'うけつけ', pitch: 1.1, color: 'var(--ok)' }
  });
  const D = (sp, jp, ro, pt) => A({ sp, jp, ro, pt });
  DIALOGS.push(
  { id: 'dlg-casual', lv: 2, title: 'Fala rápida entre amigos', situ: 'Ren encontra Aoi na saída da aula.',
    lines: [
      D('aoi', 'あれ、何してんの？', 'are, nani shiten no?', 'Ué, o que você está fazendo?'),
      D('ren', '宿題忘れちゃって、今やってる。', 'shukudai wasurechatte, ima yatteru.', 'Esqueci a lição de casa, estou fazendo agora.'),
      D('aoi', 'えー、明日までだよ？間に合う？', 'ee, ashita made da yo? ma ni au?', 'Nossa, é para amanhã, hein? Vai dar tempo?'),
      D('ren', '分かんない。でも、やんなきゃ。', 'wakannai. demo, yannakya.', 'Não sei. Mas tenho que fazer.'),
      D('aoi', 'じゃ、手伝ってあげる。', 'ja, tetsudatte ageru.', 'Então eu te ajudo.')
    ],
    words: [['〜ちゃった', '~chatta', '〜てしまった (acabou acontecendo)'], ['分かんない', 'wakannai', '分からない'], ['やんなきゃ', 'yannakya', 'やらなければ (tenho que fazer)']],
    qs: [
      { q: 'O que aconteceu com Ren?', opts: ['Esqueceu a lição de casa', 'Perdeu o celular', 'Chegou atrasado'], ans: 0, explain: '宿題忘れちゃって = esqueci a lição.' },
      { q: 'O que Aoi decide fazer?', opts: ['Ajudar o Ren', 'Ir embora', 'Contar ao professor'], ans: 0, explain: '手伝ってあげる = vou te ajudar.' },
      { q: 'O que significa やんなきゃ?', opts: ['tenho que fazer', 'não vou fazer', 'já fiz'], ans: 0, explain: 'やらなければ → やんなきゃ.' }
    ] },
  { id: 'dlg-ryokan', lv: 2, title: 'Chegando à pousada', situ: 'Aoi faz o check-in numa pousada tradicional.',
    lines: [
      D('okami', 'いらっしゃいませ。遠いところ、ようこそお越しくださいました。', 'irasshaimase. tooi tokoro, youkoso okoshi kudasaimashita.', 'Bem-vinda. Obrigada por vir de tão longe.'),
      D('aoi', '予約したアオイです。お世話になります。', 'yoyaku shita aoi desu. osewa ni narimasu.', 'Sou a Aoi, fiz uma reserva. Conto com vocês.'),
      D('okami', 'お夕食は六時と七時、どちらになさいますか。', 'oyuushoku wa rokuji to shichiji, dochira ni nasaimasu ka.', 'O jantar pode ser às seis ou às sete. Qual prefere?'),
      D('aoi', 'じゃあ、七時でお願いします。お風呂は何時までですか。', 'jaa, shichiji de onegai shimasu. ofuro wa nanji made desu ka.', 'Então às sete, por favor. Até que horas fica aberto o banho?'),
      D('okami', '大浴場は夜十一時まででございます。', 'daiyokujou wa yoru juuichiji made de gozaimasu.', 'O banho coletivo fica aberto até as onze da noite.')
    ],
    words: [['お世話になります', 'osewa ni narimasu', 'conto com vocês (ao chegar)'], ['なさいます', 'nasaimasu', 'respeitoso de します'], ['大浴場', 'daiyokujou', 'banho coletivo']],
    qs: [
      { q: 'A que horas Aoi vai jantar?', opts: ['Às sete', 'Às seis', 'Às onze'], ans: 0, explain: '七時でお願いします.' },
      { q: 'Até que horas o banho coletivo fica aberto?', opts: ['Até as 23h', 'Até as 21h', 'Até meia-noite'], ans: 0, explain: '夜十一時まで.' },
      { q: 'O tom da dona da pousada é:', opts: ['muito respeitoso (keigo)', 'casual', 'rude'], ans: 0, explain: 'ございます, なさいます, お越しくださいました.' }
    ] },
  { id: 'dlg-recusa', lv: 3, title: 'Um convite recusado', situ: 'Ren convida uma colega para a confraternização da equipe.',
    lines: [
      D('ren', '金曜日の飲み会、アオイさんも来られますか。', 'kin\'youbi no nomikai, aoi san mo koraremasu ka.', 'A Aoi também consegue vir à confraternização de sexta?'),
      D('aoi', '金曜日ですか…。誘ってくれてありがとうございます。', 'kin\'youbi desu ka…. sasotte kurete arigatou gozaimasu.', 'Sexta-feira, é?… Obrigada pelo convite.'),
      D('aoi', 'ただ、その日はちょっと、家の用事がありまして…。', 'tada, sono hi wa chotto, ie no youji ga arimashite….', 'Só que nesse dia, sabe, tenho um compromisso de família…'),
      D('ren', 'あ、そうなんですね。じゃあ、また今度ぜひ。', 'a, sou nan desu ne. jaa, mata kondo zehi.', 'Ah, entendi. Então numa próxima, com certeza.'),
      D('aoi', 'はい、ぜひ。皆さんによろしくお伝えください。', 'hai, zehi. minasan ni yoroshiku otsutae kudasai.', 'Sim, com certeza. Mande lembranças a todos.')
    ],
    words: [['飲み会', 'nomikai', 'confraternização com bebida'], ['ちょっと…', 'chotto…', 'recusa suave'], ['よろしくお伝えください', 'yoroshiku otsutae kudasai', 'mande lembranças']],
    qs: [
      { q: 'Aoi vai à confraternização?', opts: ['Não', 'Sim', 'Ainda não decidiu e vai responder amanhã'], ans: 0, explain: 'その日はちょっと… + 用事 = recusa educada.' },
      { q: 'Como Aoi recusa?', opts: ['Agradece, hesita e dá um motivo vago', 'Diz um “não” direto', 'Fica brava'], ans: 0, explain: 'Agradecimento, ちょっと e frase cortada.' },
      { q: 'Por que Ren responde また今度?', opts: ['Ele entendeu a recusa e encerra com gentileza', 'Ele quer remarcar para amanhã', 'Ele não entendeu'], ans: 0, explain: 'Leitura do contexto.' }
    ] },
  { id: 'dlg-recado', lv: 3, title: 'Telefonema de negócios', situ: 'Ren liga para outra empresa, mas a pessoa não está.',
    lines: [
      D('uketsuke', 'お電話ありがとうございます。さくら商事でございます。', 'odenwa arigatou gozaimasu. sakura shouji de gozaimasu.', 'Obrigada por ligar. Sakura Comercial, bom dia.'),
      D('ren', 'わたくし、みらい社の山田と申します。営業部の田中様はいらっしゃいますか。', 'watakushi, mirai sha no yamada to moushimasu. eigyoubu no tanaka sama wa irasshaimasu ka.', 'Aqui é Yamada, da Mirai. O senhor Tanaka, do setor de vendas, está?'),
      D('uketsuke', '申し訳ございません。田中はただいま席を外しております。', 'moushiwake gozaimasen. tanaka wa tadaima seki o hazushite orimasu.', 'Sinto muito. O Tanaka não está na mesa no momento.'),
      D('uketsuke', '戻りましたら、折り返しお電話するよう申し伝えましょうか。', 'modorimashitara, orikaeshi odenwa suru you moushitsutaemashou ka.', 'Quando ele voltar, quer que eu peça para retornar a ligação?'),
      D('ren', 'はい、お願いいたします。', 'hai, onegai itashimasu.', 'Sim, por favor.')
    ],
    words: [['席を外しております', 'seki o hazushite orimasu', 'não está na mesa no momento'], ['折り返し', 'orikaeshi', 'retornar a ligação'], ['申し伝える', 'moushitsutaeru', 'transmitir o recado (humilde)']],
    qs: [
      { q: 'O senhor Tanaka pode atender?', opts: ['Não, ele saiu da mesa', 'Sim, atende na hora', 'Não, ele foi demitido'], ans: 0, explain: '席を外しております.' },
      { q: 'Por que a recepcionista diz só 田中, sem さん?', opts: ['Ao falar com alguém de fora, não se usa honorífico para os da própria empresa', 'Porque é rude', 'Porque Tanaka é jovem'], ans: 0, explain: 'Regra de dentro e fora (内と外).' },
      { q: 'O que vai acontecer?', opts: ['Tanaka vai retornar a ligação', 'Ren vai ligar de novo amanhã', 'Ren vai visitar a empresa'], ans: 0, explain: '折り返しお電話する.' }
    ] },
  { id: 'dlg-prazo', lv: 3, title: 'Negociando um prazo', situ: 'A diretora pede um relatório para amanhã.',
    lines: [
      D('buchou', '山田さん、例の報告書、明日の朝までにお願いできる？', 'yamada san, rei no houkokusho, ashita no asa made ni onegai dekiru?', 'Yamada, aquele relatório, consegue para amanhã de manhã?'),
      D('ren', '明日の朝ですか…。データの確認にもう少しお時間をいただけないでしょうか。', 'ashita no asa desu ka…. deeta no kakunin ni mou sukoshi ojikan o itadakenai deshou ka.', 'Amanhã de manhã?… Será que eu poderia ter um pouco mais de tempo para conferir os dados?'),
      D('buchou', 'うーん、じゃあ、いつまでならできそう？', 'uun, jaa, itsu made nara dekisou?', 'Hum, então até quando daria?'),
      D('ren', '明日の午後三時までには、必ず提出いたします。', 'ashita no gogo sanji made ni wa, kanarazu teishutsu itashimasu.', 'Até as três da tarde de amanhã, entrego sem falta.'),
      D('buchou', '分かった。じゃあ、それでお願いね。', 'wakatta. jaa, sore de onegai ne.', 'Certo. Então fica assim.')
    ],
    words: [['例の', 'rei no', 'aquele (que já sabemos)'], ['いただけないでしょうか', 'itadakenai deshou ka', 'será que eu poderia receber (pedido muito educado)'], ['提出いたします', 'teishutsu itashimasu', 'entregarei (humilde)']],
    qs: [
      { q: 'Qual é o novo prazo?', opts: ['Amanhã às 15h', 'Amanhã de manhã', 'Na semana que vem'], ans: 0, explain: '明日の午後三時まで.' },
      { q: 'Por que Ren pede mais tempo?', opts: ['Para conferir os dados', 'Porque está doente', 'Porque vai viajar'], ans: 0, explain: 'データの確認.' },
      { q: 'Como Ren fala com a diretora?', opts: ['Com keigo e pedidos indiretos', 'De forma casual', 'De forma agressiva'], ans: 0, explain: 'いただけないでしょうか, いたします.' }
    ] },
  { id: 'dlg-kansai', lv: 3, title: 'Um amigo de Osaka', situ: 'Ren conversa com Kenta, que fala o dialeto de Kansai.',
    lines: [
      D('kenta', 'おう、レン！久しぶりやなあ。元気にしとった？', 'ou, ren! hisashiburi ya naa. genki ni shitotta?', 'E aí, Ren! Quanto tempo, hein. Estava bem?'),
      D('ren', 'うん、元気だよ。ケンタは？', 'un, genki da yo. kenta wa?', 'Sim, estou bem. E você, Kenta?'),
      D('kenta', 'めっちゃ忙しいねん。仕事ばっかりで、ほんまにあかんわ。', 'meccha isogashii nen. shigoto bakkari de, honma ni akan wa.', 'Estou muito ocupado. Só trabalho, sério, assim não dá.'),
      D('ren', '大変だね。たまには休みなよ。', 'taihen da ne. tama ni wa yasumi na yo.', 'Que puxado. Descansa de vez em quando.'),
      D('kenta', 'せやな。ほな、今度たこ焼きでも食べに行こか。', 'seya na. hona, kondo takoyaki demo tabe ni iko ka.', 'É verdade. Então, vamos comer takoyaki qualquer dia.')
    ],
    words: [['や', 'ya', 'だ (Kansai)'], ['めっちゃ', 'meccha', 'muito'], ['ほんまに', 'honma ni', '本当に (de verdade)'], ['あかん', 'akan', 'não dá, não pode'], ['せやな', 'seya na', 'そうだね (é verdade)'], ['ほな', 'hona', 'じゃあ (então)']],
    qs: [
      { q: 'Como está Kenta?', opts: ['Muito ocupado com o trabalho', 'De férias', 'Doente'], ans: 0, explain: 'めっちゃ忙しいねん.' },
      { q: 'O que significa ほんまにあかん?', opts: ['sério, assim não dá', 'muito bom mesmo', 'vou dormir'], ans: 0, explain: 'ほんまに = 本当に, あかん = だめ.' },
      { q: 'O que Kenta propõe no fim?', opts: ['Comer takoyaki qualquer dia', 'Trabalhar juntos', 'Ir a Tóquio amanhã'], ans: 0, explain: 'たこ焼きでも食べに行こか.' }
    ] }
  );
})();
