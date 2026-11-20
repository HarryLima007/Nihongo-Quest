/* ==========================================================
   CONTEÚDO 2.1 — Trilha da Fala (parte 1): Vocabulário, Gramática
   e Construção de Frases. Ids novos: c4l4…, c5l4…, c6l1…
   Escrita em hiragana com espaços entre as palavras (como na 1.0);
   o kanji aparece no campo “kanji” como apoio.
   ========================================================== */
(function () {
  const cat = id => CATS.find(c => c.id === id);

  /* ---------------- VOCABULÁRIO ESSENCIAL (c4) ---------------- */
  const c4 = cat('c4');
  c4.desc = 'Palavras do dia a dia: pessoas, família, comida, lugares, verbos, adjetivos, perguntas, dias e horas.';
  c4.requires = 'c1';
  c4.reqNote = 'Liberada ao concluir Primeiros Passos. Você pode estudar a escrita (Hiragana) em paralelo.';
  c4.soon = [];
  /* aprofundamento: as lições c4l1 e c4l3 da 1.0 ganham mais um exercício cada */
  c4.lessons.find(l => l.id === 'c4l1').exercises.push({ t: 'situation', prompt: 'Alguém pergunta de onde você é. Como diz “Sou brasileiro(a)”?', opts: ['ブラジルじんです|burajirujin desu', 'ブラジルです|burajiru desu', 'にほんじんです|nihonjin desu'], ans: 0, explain: 'País + じん = pessoa daquele país. ブラジルです seria “é o Brasil”.' });
  c4.lessons.find(l => l.id === 'c4l3').exercises.push({ t: 'situation', prompt: 'Você está doente e precisa de um médico. Para onde vai?', opts: ['びょういん|byouin', 'えき|eki', 'みせ|mise'], ans: 0, explain: 'びょういん = hospital. えき = estação; みせ = loja.' });
  c4.lessons.push(
  {
    id: 'c4l4', title: 'Família', emblem: '家', kind: 'vocab',
    intro: [
      'Em japonês existem duas palavras para cada membro da família: uma humilde, para falar da SUA família com outras pessoas, e uma respeitosa, para a família dos outros.',
      'Exemplo: “meu pai” é ちち (chichi). “O pai de alguém” é おとうさん (otousan).',
      'Dentro de casa, para CHAMAR o próprio pai ou a própria mãe, usa-se a forma respeitosa: おかあさん！ (Mãe!). É o que você mais ouve em animes.',
      'Irmãos mais velhos e mais novos têm palavras diferentes. A idade importa muito nas relações japonesas.'
    ],
    tip: 'Falando da sua família para outras pessoas, use a forma curta: ちち, はは, あに, あね.',
    items: [
      { k: 'chichi', jp: 'ちち', ro: 'chichi', pt: 'meu pai', kanji: '父', note: 'Forma humilde: usada para falar do seu próprio pai com outras pessoas.', ex: { jp: 'ちちは かいしゃいんです。', ro: 'chichi wa kaishain desu.', pt: 'Meu pai é funcionário de empresa.' } },
      { k: 'otousan', jp: 'おとうさん', ro: 'otousan', pt: 'pai (respeitoso)', kanji: 'お父さん', note: 'Para o pai de outra pessoa, ou para chamar o próprio pai em casa.', ex: { jp: 'おとうさん、おかえり！', ro: 'otousan, okaeri!', pt: 'Pai, bem-vindo de volta!' } },
      { k: 'haha', jp: 'はは', ro: 'haha', pt: 'minha mãe', kanji: '母', note: 'Forma humilde, para falar da sua mãe com outras pessoas.' },
      { k: 'okaasan', jp: 'おかあさん', ro: 'okaasan', pt: 'mãe (respeitoso)', kanji: 'お母さん', note: 'Para a mãe de outra pessoa, ou para chamar a própria mãe. Note o “aa” longo.', ex: { jp: 'おかあさん、おなか すいた！', ro: 'okaasan, onaka suita!', pt: 'Mãe, estou com fome!' } },
      { k: 'ani', jp: 'あに', ro: 'ani', pt: 'meu irmão mais velho', kanji: '兄', note: 'Forma humilde.' },
      { k: 'oniisan', jp: 'おにいさん', ro: 'oniisan', pt: 'irmão mais velho (respeitoso)', kanji: 'お兄さん', note: 'Em animes você ouve muito as versões carinhosas おにいちゃん (oniichan) e おにいさま (oniisama, bem formal).' },
      { k: 'ane', jp: 'あね', ro: 'ane', pt: 'minha irmã mais velha', kanji: '姉', note: 'Forma humilde.' },
      { k: 'oneesan', jp: 'おねえさん', ro: 'oneesan', pt: 'irmã mais velha (respeitoso)', kanji: 'お姉さん', note: 'Também usado para chamar uma moça jovem que você não conhece, como “moça”.' },
      { k: 'otouto', jp: 'おとうと', ro: 'otouto', pt: 'irmão mais novo', kanji: '弟', note: 'Para irmãos mais novos não se usa a forma respeitosa ao chamar: chama-se pelo nome.' },
      { k: 'imouto', jp: 'いもうと', ro: 'imouto', pt: 'irmã mais nova', kanji: '妹', note: 'Para a irmã mais nova de outra pessoa: いもうとさん (imouto-san).' }
    ],
    examples: [
      { jp: 'あにと いもうとが います。', ro: 'ani to imouto ga imasu.', pt: 'Tenho um irmão mais velho e uma irmã mais nova.' },
      { jp: 'おにいさんは なんさいですか。', ro: 'oniisan wa nansai desu ka.', pt: 'Quantos anos tem seu irmão mais velho?' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você conta a um colega sobre o SEU pai. Qual palavra usa?', opts: ['ちち|chichi', 'おとうさん|otousan', 'おにいさん|oniisan'], ans: 0, explain: 'Para a própria família, diante de outras pessoas, usa-se a forma humilde: ちち.' },
      { t: 'situation', prompt: 'Você pergunta sobre a mãe de um amigo. Qual palavra usa?', opts: ['おかあさん|okaasan', 'はは|haha', 'あね|ane'], ans: 0, explain: 'Para a família dos outros, use a forma respeitosa: おかあさん.' },
      { t: 'fill', prompt: 'Complete: irmã mais nova', pt: 'imouto', jp: 'いもう＿', opts: ['と|to', 'さん|san', 'ね|ne'], ans: 0, explain: 'いもうと = irmã mais nova. おとうと = irmão mais novo.' },
      { t: 'error', ctx: 'Falando com seu chefe: “Minha mãe é professora.”', tokens: ['おかあさん|okaasan', 'は|wa', 'せんせいです|sensei desu'], wrong: 0, explain: 'Falando da própria mãe com outras pessoas, o certo é はは (haha).' }
    ]
  },
  {
    id: 'c4l5', title: 'Verbos do dia a dia', emblem: '動', kind: 'vocab',
    intro: [
      'Verbos japoneses não mudam conforme a pessoa: たべます serve para “eu como”, “você come”, “ele come”.',
      'A terminação ます (masu) é a forma educada. É a primeira que se aprende, porque serve para quase todas as situações.',
      'ます indica presente habitual ou futuro: たべます = como / vou comer. O passado e a negação você aprende na Gramática.',
      'Na fala, o “u” de ます quase some: “tabemass”.'
    ],
    tip: 'O verbo vem sempre no final: “Eu pão como.” Parece estranho no começo, mas logo vira natural!',
    items: [
      { k: 'tabemasu', jp: 'たべます', ro: 'tabemasu', pt: 'comer (como / vou comer)', kanji: '食べます', note: 'Forma de dicionário: たべる (taberu).', ex: { jp: 'すしを たべます。', ro: 'sushi o tabemasu.', pt: 'Vou comer sushi.' } },
      { k: 'nomimasu', jp: 'のみます', ro: 'nomimasu', pt: 'beber', kanji: '飲みます', note: 'Também usado para tomar remédio: くすりを のみます.' },
      { k: 'mimasu', jp: 'みます', ro: 'mimasu', pt: 'ver, assistir', kanji: '見ます', note: 'Serve para filmes, TV e anime.', ex: { jp: 'アニメを みます。', ro: 'anime o mimasu.', pt: 'Assisto anime.' } },
      { k: 'ikimasu', jp: 'いきます', ro: 'ikimasu', pt: 'ir', kanji: '行きます', note: 'Forma de dicionário: いく (iku). Você já ouviu いこう! (vamos!).' },
      { k: 'kimasu', jp: 'きます', ro: 'kimasu', pt: 'vir', kanji: '来ます', note: 'Forma de dicionário: くる (kuru). Verbo irregular.' },
      { k: 'kaerimasu', jp: 'かえります', ro: 'kaerimasu', pt: 'voltar (para casa)', kanji: '帰ります', note: 'Voltar para casa ou para o próprio país. Está em おかえり (bem-vindo de volta).' },
      { k: 'shimasu', jp: 'します', ro: 'shimasu', pt: 'fazer', note: 'Forma de dicionário: する (suru). Junta-se a muitas palavras: べんきょうします (estudar), サッカーを します (jogar futebol).' },
      { k: 'nemasu', jp: 'ねます', ro: 'nemasu', pt: 'dormir, deitar-se', kanji: '寝ます', note: 'Forma de dicionário: ねる (neru).' },
      { k: 'okimasu', jp: 'おきます', ro: 'okimasu', pt: 'acordar, levantar-se', kanji: '起きます', note: 'Forma de dicionário: おきる (okiru). おきて！ = Acorda!' },
      { k: 'kaimasu', jp: 'かいます', ro: 'kaimasu', pt: 'comprar', kanji: '買います', note: 'Forma de dicionário: かう (kau).' }
    ],
    examples: [
      { jp: 'まいにち アニメを みます。', ro: 'mainichi anime o mimasu.', pt: 'Assisto anime todos os dias.' },
      { jp: 'あした がっこうに いきます。', ro: 'ashita gakkou ni ikimasu.', pt: 'Amanhã vou à escola.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Como se diz “Vou dormir”?', opts: ['ねます|nemasu', 'おきます|okimasu', 'のみます|nomimasu'], ans: 0, explain: 'ねます = dormir. おきます = acordar.' },
      { t: 'order', prompt: 'Monte a frase', pt: 'Vou comer sushi.', tiles: ['すし|sushi', 'を|o', 'たべます|tabemasu'], extra: ['みます|mimasu'], explain: 'Objeto + を + verbo no final: すしを たべます。' },
      { t: 'fill', prompt: 'Complete a frase', pt: 'Volto para casa às 6.', jp: 'ろくじに ＿＿＿', opts: ['かえります|kaerimasu', 'かいます|kaimasu', 'きます|kimasu'], ans: 0, explain: 'かえります = voltar para casa. かいます = comprar.' }
    ]
  },
  {
    id: 'c4l6', title: 'Adjetivos い e な', emblem: '形', kind: 'vocab',
    intro: [
      'O japonês tem dois tipos de adjetivo. Os adjetivos い terminam em い: たかい (caro), さむい (frio).',
      'Os adjetivos な ganham な antes de um substantivo: しずかな へや (um quarto silencioso). Sozinhos, terminam com です: しずかです.',
      'Pegadinha famosa: きれい e きらい terminam com “i”, mas são adjetivos な.',
      'Você vai aprender a conjugar (não é caro, era divertido) na Gramática.'
    ],
    tip: 'すき (gostar) e きらい (não gostar) são adjetivos em japonês, e não verbos!',
    items: [
      { k: 'takai', jp: 'たかい', ro: 'takai', pt: 'caro; alto', kanji: '高い', note: 'Serve para preço e altura.', ex: { jp: 'この ふく、たかい！', ro: 'kono fuku, takai!', pt: 'Esta roupa é cara!' } },
      { k: 'yasui', jp: 'やすい', ro: 'yasui', pt: 'barato', kanji: '安い', note: 'O oposto de たかい (no sentido de preço).' },
      { k: 'atsui', jp: 'あつい', ro: 'atsui', pt: 'quente (clima, coisas)', kanji: '暑い / 熱い', note: 'Comentário clássico do verão: あついですね (Que calor, né?).' },
      { k: 'samui', jp: 'さむい', ro: 'samui', pt: 'frio (clima)', kanji: '寒い', note: 'Para o clima. Algo frio ao toque é つめたい (tsumetai).' },
      { k: 'tanoshii', jp: 'たのしい', ro: 'tanoshii', pt: 'divertido, agradável', kanji: '楽しい', note: 'Para experiências: a festa, a viagem.', ex: { jp: 'たのしいですね！', ro: 'tanoshii desu ne!', pt: 'Que divertido, né!' } },
      { k: 'muzukashii', jp: 'むずかしい', ro: 'muzukashii', pt: 'difícil', kanji: '難しい', note: 'Também é um jeito educado de dizer “não dá”: それは ちょっと むずかしいです.' },
      { k: 'isogashii', jp: 'いそがしい', ro: 'isogashii', pt: 'ocupado, atarefado', kanji: '忙しい', note: 'Para pessoas e períodos: きょうは いそがしい (hoje estou ocupado).' },
      { k: 'suki', jp: 'すき', ro: 'suki', pt: 'gostar, gosto de', kanji: '好き', note: 'Adjetivo な. O que você gosta vem com が: ねこが すきです. Também é a palavra da declaração de amor: すきです。', ex: { jp: 'ねこが すきです。', ro: 'neko ga suki desu.', pt: 'Gosto de gatos.' } },
      { k: 'kirai', jp: 'きらい', ro: 'kirai', pt: 'não gostar, detestar', kanji: '嫌い', note: 'Adjetivo な, apesar do “i” final. Soa forte: para recusar com educação, prefira あまり すきじゃない (não gosto muito).' },
      { k: 'kirei', jp: 'きれい', ro: 'kirei', pt: 'bonito; limpo', kanji: '綺麗', note: 'Adjetivo な, apesar do “i” final. きれいな へや = quarto limpo/bonito.' },
      { k: 'shizuka', jp: 'しずか', ro: 'shizuka', pt: 'silencioso, tranquilo', kanji: '静か', note: 'Adjetivo な. しずかに！ = Silêncio!' }
    ],
    examples: [
      { jp: 'きれいな はな', ro: 'kirei na hana', pt: 'uma flor bonita (adjetivo な + な + substantivo)' },
      { jp: 'たかい ビル', ro: 'takai biru', pt: 'um prédio alto (adjetivo い direto no substantivo)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual destes é um adjetivo な, apesar de terminar em “i”?', opts: ['きれい|kirei', 'たかい|takai', 'さむい|samui'], ans: 0, explain: 'きれい é adjetivo な: きれいな はな.' },
      { t: 'fill', prompt: 'Complete', pt: 'um quarto silencioso', jp: 'しずか＿ へや', opts: ['な|na', 'い|i', 'の|no'], ans: 0, explain: 'Adjetivos な usam な antes do substantivo: しずかな へや.' },
      { t: 'situation', prompt: 'No inverno japonês, o que você comenta?', opts: ['さむいですね|samui desu ne', 'あついですね|atsui desu ne', 'やすいですね|yasui desu ne'], ans: 0, explain: 'さむい = frio. あつい = quente.' }
    ]
  },
  {
    id: 'c4l7', title: 'Palavras interrogativas', emblem: '何', kind: 'vocab',
    intro: [
      'Com as palavras interrogativas você consegue fazer perguntas e, principalmente, reconhecer quando alguém está perguntando algo a você.',
      'Você já conhece なに (o quê). Antes de です e de alguns sons ele vira なん: なんですか？',
      'Em japonês a palavra interrogativa fica no lugar da resposta: “Isto é o quê?”, これは なんですか.',
      'Na fala educada, a pergunta termina em か. Na fala casual, a entonação subindo basta.'
    ],
    tip: 'Para responder, troque a palavra interrogativa pela resposta e mantenha o resto da frase.',
    items: [
      { k: 'dare', jp: 'だれ', ro: 'dare', pt: 'quem', kanji: '誰', note: 'Mais educado: どなた (donata).', ex: { jp: 'あの ひとは だれ？', ro: 'ano hito wa dare?', pt: 'Quem é aquela pessoa?' } },
      { k: 'doko', jp: 'どこ', ro: 'doko', pt: 'onde', note: 'Já apareceu em えきは どこですか (onde fica a estação?).' },
      { k: 'itsu', jp: 'いつ', ro: 'itsu', pt: 'quando', note: 'Não leva に: いつ いきますか (quando você vai?).', ex: { jp: 'たんじょうびは いつ？', ro: 'tanjoubi wa itsu?', pt: 'Quando é seu aniversário?' } },
      { k: 'doushite', jp: 'どうして', ro: 'doushite', pt: 'por quê', note: 'Neutro. A resposta costuma terminar com から ou んです.' },
      { k: 'nande', jp: 'なんで', ro: 'nande', pt: 'por quê (casual)', note: 'Muito comum na fala e em animes. Dito com força, soa como protesto: なんで！？ (Por quê?!).' },
      { k: 'dou', jp: 'どう', ro: 'dou', pt: 'como; que tal', note: 'どうですか = Que tal? / Como está? Muito usado para oferecer algo.', ex: { jp: 'コーヒーは どうですか。', ro: 'koohii wa dou desu ka.', pt: 'Que tal um café?' } },
      { k: 'dore', jp: 'どれ', ro: 'dore', pt: 'qual (entre vários)', note: 'Para escolher entre três ou mais coisas.' },
      { k: 'ikutsu', jp: 'いくつ', ro: 'ikutsu', pt: 'quantos (objetos); quantos anos', note: 'Para contar objetos. Também é um jeito educado de perguntar a idade: おいくつですか.' },
      { k: 'donokurai', jp: 'どのくらい', ro: 'dono kurai', pt: 'quanto (tempo, distância)', note: 'Também se diz どのぐらい.', ex: { jp: 'えきまで どのくらい？', ro: 'eki made dono kurai?', pt: 'Quanto tempo até a estação?' } }
    ],
    examples: [
      { jp: 'トイレは どこですか。 … あそこです。', ro: 'toire wa doko desu ka. … asoko desu.', pt: 'Onde fica o banheiro? … Fica ali.' },
      { jp: 'なんで？', ro: 'nande?', pt: 'Por quê? (casual)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Num anime, alguém grita なんで！？ O que quer dizer?', opts: ['Por quê?!', 'Quando?!', 'Onde?!'], ans: 0, explain: 'なんで = por quê (casual).' },
      { t: 'fill', prompt: 'Complete a pergunta', pt: 'Quando é seu aniversário?', jp: 'たんじょうびは ＿＿ ですか。', opts: ['いつ|itsu', 'どこ|doko', 'だれ|dare'], ans: 0, explain: 'いつ = quando.' },
      { t: 'situation', prompt: 'Você quer oferecer um chá a uma visita. O que diz?', opts: ['おちゃは どうですか|ocha wa dou desu ka', 'おちゃは だれですか|ocha wa dare desu ka', 'おちゃは いつですか|ocha wa itsu desu ka'], ans: 0, explain: '〜は どうですか = Que tal ~?' }
    ]
  },
  {
    id: 'c4l8', title: 'Dias da semana', emblem: '曜', kind: 'vocab',
    intro: [
      'Os dias da semana terminam todos em ようび (youbi), “dia da semana”.',
      'Cada um vem de um elemento: にち (sol), げつ (lua), か (fogo), すい (água), もく (madeira), きん (metal) e ど (terra).',
      'Na fala rápida, o final ようび às vezes encurta: きんよう (sexta).'
    ],
    tip: 'Comece pelo fim de semana: どようび (sábado) e にちようび (domingo).',
    items: [
      { k: 'nichiyoubi', jp: 'にちようび', ro: 'nichiyoubi', pt: 'domingo', kanji: '日曜日', note: 'Dia do sol.' },
      { k: 'getsuyoubi', jp: 'げつようび', ro: 'getsuyoubi', pt: 'segunda-feira', kanji: '月曜日', note: 'Dia da lua.' },
      { k: 'kayoubi', jp: 'かようび', ro: 'kayoubi', pt: 'terça-feira', kanji: '火曜日', note: 'Dia do fogo.' },
      { k: 'suiyoubi', jp: 'すいようび', ro: 'suiyoubi', pt: 'quarta-feira', kanji: '水曜日', note: 'Dia da água.' },
      { k: 'mokuyoubi', jp: 'もくようび', ro: 'mokuyoubi', pt: 'quinta-feira', kanji: '木曜日', note: 'Dia da madeira (árvore).' },
      { k: 'kinyoubi', jp: 'きんようび', ro: 'kin\'youbi', pt: 'sexta-feira', kanji: '金曜日', note: 'Dia do metal (ouro).' },
      { k: 'doyoubi', jp: 'どようび', ro: 'doyoubi', pt: 'sábado', kanji: '土曜日', note: 'Dia da terra.' },
      { k: 'nanyoubi', jp: 'なんようび', ro: 'nan\'youbi', pt: 'que dia da semana', kanji: '何曜日', note: 'Pergunta: きょうは なんようびですか (Que dia da semana é hoje?).' },
      { k: 'shuumatsu', jp: 'しゅうまつ', ro: 'shuumatsu', pt: 'fim de semana', kanji: '週末', note: 'しゅうまつは なにを しますか = O que você faz no fim de semana?' }
    ],
    examples: [
      { jp: 'きょうは きんようびです。', ro: 'kyou wa kin\'youbi desu.', pt: 'Hoje é sexta-feira.' },
      { jp: 'げつようびから きんようびまで', ro: 'getsuyoubi kara kin\'youbi made', pt: 'de segunda a sexta' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Que dia vem depois de すいようび?', opts: ['もくようび|mokuyoubi', 'かようび|kayoubi', 'どようび|doyoubi'], ans: 0, explain: 'すいようび (quarta) → もくようび (quinta).' },
      { t: 'fill', prompt: 'Complete', pt: 'Hoje é domingo.', jp: 'きょうは ＿＿＿＿ です。', opts: ['にちようび|nichiyoubi', 'げつようび|getsuyoubi', 'しゅうまつ|shuumatsu'], ans: 0, explain: 'にちようび = domingo.' },
      { t: 'order', prompt: 'Monte a expressão', pt: 'de segunda a sexta', tiles: ['げつようび|getsuyoubi', 'から|kara', 'きんようび|kin\'youbi', 'まで|made'], extra: ['に|ni'], explain: 'A から B まで = de A até B.' }
    ]
  },
  {
    id: 'c4l9', title: 'Horas e minutos', emblem: '時', kind: 'vocab',
    intro: [
      'Para dizer a hora: número + じ (ji). 3 horas = さんじ. A maioria segue a regra, mas três horas têm leitura especial: 4 é よじ, 7 é しちじ e 9 é くじ.',
      'Minutos: número + ふん/ぷん. A leitura muda conforme o número: ごふん (5 min), じゅっぷん (10 min). Por enquanto, guarde os mais usados.',
      'はん (han) é “meia”: さんじはん = três e meia. ごぜん = da manhã (a.m.) e ごご = da tarde (p.m.).'
    ],
    tip: 'Ouça bem: よじ (4h) e しちじ (7h) são pegadinhas. Ninguém diz “yonji” para as horas.',
    items: [
      { k: 'nanji', jp: 'なんじ', ro: 'nanji', pt: 'que horas', kanji: '何時', note: 'いま なんじですか = Que horas são agora?' },
      { k: 'ichiji', jp: 'いちじ', ro: 'ichiji', pt: '1 hora', kanji: '一時', note: 'Não confunda com しちじ (7h) na fala rápida.' },
      { k: 'yoji', jp: 'よじ', ro: 'yoji', pt: '4 horas', kanji: '四時', note: 'Leitura especial: よじ, e não “yonji”.' },
      { k: 'shichiji', jp: 'しちじ', ro: 'shichiji', pt: '7 horas', kanji: '七時', note: 'Leitura padrão: しちじ. Às vezes se ouve ななじ, para evitar confusão com いちじ.' },
      { k: 'kuji', jp: 'くじ', ro: 'kuji', pt: '9 horas', kanji: '九時', note: 'Leitura especial: くじ, e não “kyuuji”.' },
      { k: 'han', jp: 'はん', ro: 'han', pt: 'meia (30 minutos)', kanji: '半', note: 'さんじはん = três e meia.' },
      { k: 'gozen', jp: 'ごぜん', ro: 'gozen', pt: 'da manhã (a.m.)', kanji: '午前', note: 'ごぜん じゅうじ = 10h da manhã.' },
      { k: 'gogo', jp: 'ごご', ro: 'gogo', pt: 'da tarde/noite (p.m.)', kanji: '午後', note: 'ごご さんじ = 3h da tarde (15h).' },
      { k: 'gofun', jp: 'ごふん', ro: 'gofun', pt: '5 minutos', kanji: '五分', note: 'ごふん まって = espera 5 minutos.' },
      { k: 'juppun', jp: 'じゅっぷん', ro: 'juppun', pt: '10 minutos', kanji: '十分', note: 'Também se diz じっぷん. Cuidado: じゅうぶん (juubun), com o mesmo kanji, significa “suficiente”.' }
    ],
    examples: [
      { jp: 'いま、しちじ はんです。', ro: 'ima, shichiji han desu.', pt: 'Agora são sete e meia.' },
      { jp: 'ごご よじに あいましょう。', ro: 'gogo yoji ni aimashou.', pt: 'Vamos nos encontrar às 4 da tarde.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Como se diz “4 horas”?', opts: ['よじ|yoji', 'よんじ|yonji', 'しじ|shiji'], ans: 0, explain: '4 horas tem leitura especial: よじ.' },
      { t: 'situation', prompt: 'Alguém diz くじ です. Que horas são?', opts: ['9 horas', '7 horas', '4 horas'], ans: 0, explain: 'くじ = 9 horas. しちじ = 7, よじ = 4.' },
      { t: 'order', prompt: 'Monte a hora', pt: '3 e meia da tarde', tiles: ['ごご|gogo', 'さんじ|sanji', 'はん|han'], extra: ['ごぜん|gozen'], explain: 'ごご (p.m.) + さんじ + はん.' },
      { t: 'error', ctx: 'São 9h da manhã:', tokens: ['ごぜん|gozen', 'きゅうじ|kyuuji'], wrong: 1, explain: '9 horas é くじ (kuji), não きゅうじ.' }
    ]
  });

  /* ---------------- GRAMÁTICA (c5) ---------------- */
  const c5 = cat('c5');
  c5.desc = 'Como as frases funcionam: です, verbos, partículas, perguntas e a forma て.';
  c5.soon = [];
  c5.lessons.push(
  {
    id: 'c5l4', title: 'Negativo e passado de です', emblem: '否', kind: 'grammar',
    intro: [
      'Para negar com substantivos e adjetivos な: じゃないです (falado) ou じゃありません (mais formal). がくせいじゃないです = Não sou estudante.',
      'Passado: でした. やすみでした = Foi folga.',
      'Adjetivos い mudam o final: たかい → たかくない (não é caro) → たかかった (era caro). Depois é só pôr です.',
      'Exceção importante: いい (bom) vira よくない (não é bom) e よかった (foi bom, que bom).'
    ],
    tip: 'よかった é uma das palavras mais ouvidas em animes: “Que alívio! Que bom!”',
    items: [
      { k: 's1', jp: 'がくせいじゃないです。', ro: 'gakusei ja nai desu.', pt: 'Não sou estudante.', note: 'Substantivo + じゃないです. É a forma mais comum na conversa educada.' },
      { k: 's2', jp: 'にほんじんじゃありません。', ro: 'nihonjin ja arimasen.', pt: 'Não sou japonês(a).', note: 'じゃありません é um pouco mais formal que じゃないです.' },
      { k: 's3', jp: 'きのうは やすみでした。', ro: 'kinou wa yasumi deshita.', pt: 'Ontem foi folga.', note: 'でした = passado de です. やすみ = folga, descanso, feriado.' },
      { k: 's4', jp: 'たかくないです。', ro: 'takaku nai desu.', pt: 'Não é caro.', note: 'Adjetivo い: troque o い final por くない.' },
      { k: 's5', jp: 'たのしかったです。', ro: 'tanoshikatta desu.', pt: 'Foi divertido.', note: 'Adjetivo い no passado: troque o い por かった.' },
      { k: 's6', jp: 'よかったです。', ro: 'yokatta desu.', pt: 'Foi bom. / Que bom.', note: 'Passado de いい é よかった, e não “ikatta”. Entre amigos: よかった！' },
      { k: 's7', jp: 'しずかじゃなかったです。', ro: 'shizuka ja nakatta desu.', pt: 'Não estava silencioso.', note: 'Negativo no passado: じゃなかったです.' }
    ],
    examples: [
      { jp: 'えいがは どうでしたか。 … とても たのしかったです！', ro: 'eiga wa dou deshita ka. … totemo tanoshikatta desu!', pt: 'Como foi o filme? … Foi muito divertido!' },
      { jp: 'さむくないですか。 … だいじょうぶです。', ro: 'samuku nai desu ka. … daijoubu desu.', pt: 'Não está com frio? … Estou bem.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete', pt: 'Não é caro.', jp: 'たか＿＿ないです。', opts: ['く|ku', 'い|i', 'じゃ|ja'], ans: 0, explain: 'Adjetivo い: たかい → たかくない.' },
      { t: 'situation', prompt: 'Seu amigo diz que achou a carteira perdida. O que você fala?', opts: ['よかった！|yokatta!', 'いかった！|ikatta!', 'いいでした！|ii deshita!'], ans: 0, explain: 'O passado de いい é よかった: “Que bom!”.' },
      { t: 'error', ctx: 'Quero dizer: “Não sou estudante.”', tokens: ['がくせい|gakusei', 'でした|deshita'], wrong: 1, explain: 'でした é passado (“era”). Para negar: がくせいじゃないです.' },
      { t: 'translate', jp: 'たのしかったです。', ro: 'tanoshikatta desu.', tiles: ['Foi', 'divertido'], extra: ['Não', 'é'], explain: 'かった indica o passado do adjetivo い.' }
    ]
  },
  {
    id: 'c5l5', title: 'Verbos e a partícula を', emblem: 'を', kind: 'grammar',
    intro: [
      'A partícula を (pronuncia-se “o”) marca o objeto direto: aquilo que sofre a ação. パンを たべます = Como pão.',
      'O verbo educado tem quatro formas básicas: ます (faço / vou fazer), ません (não faço), ました (fiz), ませんでした (não fiz).',
      'Ordem da frase: [tempo] [objeto]を [verbo]. きのう えいがを みました = Ontem assisti a um filme.'
    ],
    tip: 'Ouça o final do verbo! É ele que diz se a frase é afirmativa, negativa ou passada.',
    items: [
      { k: 's1', jp: 'パンを たべます。', ro: 'pan o tabemasu.', pt: 'Como pão.', note: 'パン (pão) + を + たべます.' },
      { k: 's2', jp: 'コーヒーを のみません。', ro: 'koohii o nomimasen.', pt: 'Não tomo café.', note: 'ません = negativo educado.' },
      { k: 's3', jp: 'きのう えいがを みました。', ro: 'kinou eiga o mimashita.', pt: 'Ontem assisti a um filme.', note: 'ました = passado. えいが = filme.' },
      { k: 's4', jp: 'しゅくだいを しませんでした。', ro: 'shukudai o shimasen deshita.', pt: 'Não fiz a lição de casa.', note: 'ませんでした = passado negativo.' },
      { k: 's5', jp: 'なにを しますか。', ro: 'nani o shimasu ka.', pt: 'O que você vai fazer?', note: 'なに + を: “fazer o quê?”.' },
      { k: 's6', jp: 'まいあさ シャワーを あびます。', ro: 'maiasa shawaa o abimasu.', pt: 'Tomo banho toda manhã.', note: 'シャワーを あびる = tomar banho de chuveiro. まいあさ = toda manhã.' }
    ],
    examples: [
      { jp: 'あさごはんを たべましたか。 … いいえ、たべませんでした。', ro: 'asagohan o tabemashita ka. … iie, tabemasen deshita.', pt: 'Você tomou café da manhã? … Não, não tomei.' }
    ],
    exercises: [
      { t: 'order', prompt: 'Monte a frase', pt: 'Ontem assisti anime.', tiles: ['きのう|kinou', 'アニメ|anime', 'を|o', 'みました|mimashita'], extra: ['は|wa'], explain: 'tempo + objeto + を + verbo: きのう アニメを みました。' },
      { t: 'fill', prompt: 'Complete', pt: 'Não bebo café.', jp: 'コーヒーを のみ＿＿。', opts: ['ません|masen', 'ました|mashita', 'ます|masu'], ans: 0, explain: 'ません = negativo.' },
      { t: 'situation', prompt: 'Alguém diz たべませんでした. Quando foi e o que aconteceu?', opts: ['No passado: não comeu', 'No futuro: vai comer', 'Agora: está comendo'], ans: 0, explain: 'ませんでした = passado negativo.' },
      { t: 'error', ctx: 'Quero dizer: “Como pão.”', tokens: ['パン|pan', 'に|ni', 'たべます|tabemasu'], wrong: 1, explain: 'O objeto direto leva を: パンを たべます.' }
    ]
  },
  {
    id: 'c5l6', title: 'Partículas に, で e へ', emblem: 'に', kind: 'grammar',
    intro: [
      'に marca o destino (vou PARA a escola) e o horário exato (acordo ÀS 7). がっこうに いきます / しちじに おきます.',
      'へ (lê-se “e”) também marca direção. Soa um pouco mais escrito; na fala, に é mais comum.',
      'で marca ONDE uma ação acontece (como EM casa) e COM QUE meio ela é feita (vou DE trem, como COM hashi).',
      'Regra prática: lugar + に = para onde vai ou onde algo está. Lugar + で = onde a ação acontece.'
    ],
    tip: 'Na dúvida entre に e で com um lugar, pergunte: estou indo para lá (に) ou fazendo algo lá (で)?',
    items: [
      { k: 's1', jp: 'がっこうに いきます。', ro: 'gakkou ni ikimasu.', pt: 'Vou à escola.', note: 'に = destino.' },
      { k: 's2', jp: 'にほんへ いきます。', ro: 'nihon e ikimasu.', pt: 'Vou para o Japão.', note: 'へ como partícula se lê “e”. Indica direção.' },
      { k: 's3', jp: 'しちじに おきます。', ro: 'shichiji ni okimasu.', pt: 'Acordo às 7.', note: 'に = horário exato. Palavras como あした e まいにち NÃO levam に.' },
      { k: 's4', jp: 'うちで ごはんを たべます。', ro: 'uchi de gohan o tabemasu.', pt: 'Como em casa.', note: 'で = lugar onde a ação acontece. うち = casa, lar.' },
      { k: 's5', jp: 'でんしゃで いきます。', ro: 'densha de ikimasu.', pt: 'Vou de trem.', note: 'で = meio de transporte. でんしゃ = trem.' },
      { k: 's6', jp: 'はしで たべます。', ro: 'hashi de tabemasu.', pt: 'Como com hashi.', note: 'で = instrumento. はし = hashi, os palitinhos.' }
    ],
    examples: [
      { jp: 'としょかんで べんきょうします。', ro: 'toshokan de benkyou shimasu.', pt: 'Estudo na biblioteca.' },
      { jp: 'バスで うちに かえります。', ro: 'basu de uchi ni kaerimasu.', pt: 'Volto para casa de ônibus.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete', pt: 'Vou de trem.', jp: 'でんしゃ＿ いきます。', opts: ['で|de', 'に|ni', 'を|o'], ans: 0, explain: 'Meio de transporte usa で.' },
      { t: 'fill', prompt: 'Complete', pt: 'Acordo às 7.', jp: 'しちじ＿ おきます。', opts: ['に|ni', 'で|de', 'は|wa'], ans: 0, explain: 'Horário exato usa に.' },
      { t: 'error', ctx: 'Quero dizer: “Como em casa.”', tokens: ['うち|uchi', 'に|ni', 'たべます|tabemasu'], wrong: 1, explain: 'A ação acontece em casa, então é で: うちで たべます.' },
      { t: 'order', prompt: 'Monte a frase', pt: 'Volto para casa de ônibus.', tiles: ['バス|basu', 'で|de', 'うち|uchi', 'に|ni', 'かえります|kaerimasu'], extra: ['を|o'], explain: 'バスで (meio) + うちに (destino) + かえります.' }
    ]
  },
  {
    id: 'c5l7', title: 'が, あります e います', emblem: 'が', kind: 'grammar',
    intro: [
      'Para dizer que algo “existe” ou que você “tem” algo, o japonês usa dois verbos: あります para coisas e plantas, います para pessoas e animais.',
      'A partícula が marca o que existe: ねこが います = Tem um gato.',
      'が também aparece com すき, きらい e わかる: ラーメンが すきです (gosto de lámen), にほんごが わかります (entendo japonês).',
      'Para dizer onde: [lugar]に [coisa]が あります. Negativo: ありません / いません.'
    ],
    tip: 'Está vivo e se move sozinho? います. Não? あります.',
    items: [
      { k: 's1', jp: 'ねこが います。', ro: 'neko ga imasu.', pt: 'Tem um gato. / Tenho um gato.', note: 'Animal: います.' },
      { k: 's2', jp: 'コンビニが あります。', ro: 'konbini ga arimasu.', pt: 'Tem uma loja de conveniência.', note: 'Coisa ou lugar: あります.' },
      { k: 's3', jp: 'つくえの うえに ほんが あります。', ro: 'tsukue no ue ni hon ga arimasu.', pt: 'Tem um livro em cima da mesa.', note: 'つくえの うえ = em cima da mesa. Lugar + に.' },
      { k: 's4', jp: 'きょうだいが いますか。', ro: 'kyoudai ga imasu ka.', pt: 'Você tem irmãos?', note: 'Para pessoas da família também se usa います. きょうだい = irmãos.' },
      { k: 's5', jp: 'じかんが ありません。', ro: 'jikan ga arimasen.', pt: 'Não tenho tempo.', note: 'ありません = não tem / não há.' },
      { k: 's6', jp: 'ラーメンが すきです。', ro: 'raamen ga suki desu.', pt: 'Gosto de lámen.', note: 'O que você gosta vem com が.' },
      { k: 's7', jp: 'にほんごが すこし わかります。', ro: 'nihongo ga sukoshi wakarimasu.', pt: 'Entendo um pouco de japonês.', note: 'わかる usa が. すこし = um pouco.' }
    ],
    examples: [
      { jp: 'へやに だれが いますか。 … だれも いません。', ro: 'heya ni dare ga imasu ka. … daremo imasen.', pt: 'Quem está no quarto? … Não tem ninguém.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete', pt: 'Tem um cachorro.', jp: 'いぬが ＿＿＿。', opts: ['います|imasu', 'あります|arimasu', 'です|desu'], ans: 0, explain: 'Animais usam います.' },
      { t: 'fill', prompt: 'Complete', pt: 'Tem uma estação.', jp: 'えきが ＿＿＿＿。', opts: ['あります|arimasu', 'います|imasu', 'いきます|ikimasu'], ans: 0, explain: 'Lugares e coisas usam あります.' },
      { t: 'error', ctx: 'Quero dizer: “Não tenho tempo.”', tokens: ['じかん|jikan', 'が|ga', 'いません|imasen'], wrong: 2, explain: 'Tempo não é ser vivo: じかんが ありません.' },
      { t: 'translate', jp: 'ねこが すきです。', ro: 'neko ga suki desu.', tiles: ['Gosto', 'de', 'gatos'], extra: ['Tenho', 'cachorros'], explain: 'が + すき = gostar de.' }
    ]
  },
  {
    id: 'c5l8', title: 'の e これ, それ, あれ', emblem: 'の', kind: 'grammar',
    intro: [
      'の liga dois substantivos, como “de” em português, mas na ordem inversa: わたしの ほん = o livro de mim (meu livro).',
      'これ (isto, perto de mim), それ (isso, perto de você), あれ (aquilo, longe dos dois). どれ = qual.',
      'Antes de um substantivo, viram この, その, あの, どの: この ケーキ (este bolo).',
      'Com lugares: ここ (aqui), そこ (aí), あそこ (ali), どこ (onde).'
    ],
    tip: 'こ = perto de quem fala, そ = perto de quem ouve, あ = longe dos dois, ど = pergunta.',
    items: [
      { k: 's1', jp: 'これは わたしの ほんです。', ro: 'kore wa watashi no hon desu.', pt: 'Isto é o meu livro.', note: 'わたしの = meu. ほん = livro.' },
      { k: 's2', jp: 'それは なんですか。', ro: 'sore wa nan desu ka.', pt: 'O que é isso?', note: 'それ = isso, perto de quem ouve.' },
      { k: 's3', jp: 'あれは がっこうです。', ro: 'are wa gakkou desu.', pt: 'Aquilo é a escola.', note: 'あれ = aquilo, longe dos dois.' },
      { k: 's4', jp: 'この ケーキは おいしいです。', ro: 'kono keeki wa oishii desu.', pt: 'Este bolo é gostoso.', note: 'この + substantivo = este ~.' },
      { k: 's5', jp: 'その かばんは だれのですか。', ro: 'sono kaban wa dare no desu ka.', pt: 'De quem é essa bolsa?', note: 'だれの = de quem. かばん = bolsa, mochila.' },
      { k: 's6', jp: 'にほんごの せんせいです。', ro: 'nihongo no sensei desu.', pt: 'É professor(a) de japonês.', note: 'の também indica “sobre o quê”: professor DE japonês.' }
    ],
    examples: [
      { jp: 'すみません、この でんしゃは とうきょうに いきますか。', ro: 'sumimasen, kono densha wa toukyou ni ikimasu ka.', pt: 'Com licença, este trem vai para Tóquio?' }
    ],
    exercises: [
      { t: 'order', prompt: 'Monte a frase', pt: 'Isto é o meu livro.', tiles: ['これ|kore', 'は|wa', 'わたし|watashi', 'の|no', 'ほん|hon', 'です|desu'], extra: ['が|ga'], explain: 'これは + わたしの ほん + です.' },
      { t: 'fill', prompt: 'Complete', pt: 'Este bolo é gostoso.', jp: '＿＿ ケーキは おいしいです。', opts: ['この|kono', 'これ|kore', 'ここ|koko'], ans: 0, explain: 'Antes de substantivo: この. これ fica sozinho.' },
      { t: 'situation', prompt: 'O objeto está longe de você e de quem ouve. Que palavra usa?', opts: ['あれ|are', 'それ|sore', 'これ|kore'], ans: 0, explain: 'あれ = aquilo, longe dos dois.' }
    ]
  },
  {
    id: 'c5l9', title: 'Finais か, ね e よ', emblem: 'ね', kind: 'grammar',
    intro: [
      'O final da frase muda o tom. か transforma em pergunta. ね pede concordância (“né?”). よ informa algo que o outro talvez não saiba (“viu?”, “sabia?”).',
      'よね junta os dois: “é isso mesmo, né?”. Muito comum para confirmar algo.',
      'Esses finais aparecem o tempo todo na fala. Prestar atenção neles ajuda a entender a intenção de quem fala.'
    ],
    tip: 'ね = vamos concordar. よ = estou te contando. か = estou perguntando.',
    items: [
      { k: 's1', jp: 'いい てんきですね。', ro: 'ii tenki desu ne.', pt: 'Que tempo bom, né?', note: 'ね busca concordância. Ótimo para puxar conversa. てんき = tempo (clima).' },
      { k: 's2', jp: 'あしたは テストですよ。', ro: 'ashita wa tesuto desu yo.', pt: 'Amanhã tem prova, viu?', note: 'よ avisa algo que o outro pode não saber.' },
      { k: 's3', jp: 'これ、おいしいですよ。', ro: 'kore, oishii desu yo.', pt: 'Isto é gostoso, viu! (experimenta)', note: 'よ para recomendar.' },
      { k: 's4', jp: 'にほんごが じょうずですね。', ro: 'nihongo ga jouzu desu ne.', pt: 'Seu japonês é bom, hein.', note: 'Elogio muito comum para estrangeiros. A resposta modesta é いいえ、まだまだです (não, ainda tenho muito a aprender).' },
      { k: 's5', jp: 'あの ひとは だれですか。', ro: 'ano hito wa dare desu ka.', pt: 'Quem é aquela pessoa?', note: 'か = pergunta.' },
      { k: 's6', jp: 'そうですか。', ro: 'sou desu ka.', pt: 'Ah, é? / Entendi.', note: 'Com entonação descendo, não é pergunta: mostra que você recebeu a informação.' },
      { k: 's7', jp: 'あしたですよね。', ro: 'ashita desu yo ne.', pt: 'É amanhã, né? (só confirmando)', note: 'よね = confirmar algo que você acha que sabe.' }
    ],
    examples: [
      { jp: 'さむいですね。 … そうですね。', ro: 'samui desu ne. … sou desu ne.', pt: 'Que frio, né? … É mesmo.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você quer AVISAR seu amigo que o trem já vai sair. Qual final usa?', opts: ['よ|yo', 'ね|ne', 'か|ka'], ans: 0, explain: 'よ informa algo que o outro não sabe.' },
      { t: 'situation', prompt: 'Você comenta o calor esperando que a pessoa concorde. Qual frase?', opts: ['あついですね|atsui desu ne', 'あついですか|atsui desu ka', 'あついですよ|atsui desu yo'], ans: 0, explain: 'ね busca concordância.' },
      { t: 'fill', prompt: 'Complete', pt: 'É amanhã, né? (confirmando)', jp: 'あしたです＿＿。', opts: ['よね|yo ne', 'か|ka', 'の|no'], ans: 0, explain: 'よね = confirmar.' }
    ]
  },
  {
    id: 'c5l10', title: 'A forma て', emblem: 'て', kind: 'grammar',
    intro: [
      'A forma て é uma das mais importantes do japonês. Com ela você pede coisas (〜てください), descreve o que está acontecendo (〜ています) e liga ações (acordo E lavo o rosto).',
      'Como formar a partir do verbo de dicionário: verbos do grupo る, como たべる e みる, trocam る por て (たべて, みて). Nos demais verbos, o final decide: う, つ, る → って (かう → かって, まつ → まって, とる → とって); む, ぶ, ぬ → んで (のむ → のんで); く → いて (かく → かいて); ぐ → いで (およぐ → およいで); す → して (はなす → はなして).',
      'Irregulares: する → して, くる → きて, いく → いって.',
      '〜ています também indica estado: すんでいます = moro (estou morando).'
    ],
    tip: 'Você já conhece várias formas て: まって (espera), がんばって (força!), きて (venha).',
    items: [
      { k: 's1', jp: 'ちょっと まって ください。', ro: 'chotto matte kudasai.', pt: 'Espere um pouco, por favor.', note: 'まつ (esperar) → まって + ください.' },
      { k: 's2', jp: 'もう いちど いって ください。', ro: 'mou ichido itte kudasai.', pt: 'Diga mais uma vez, por favor.', note: 'いう (dizer) → いって. Mesmo som de いって (indo), de いく.' },
      { k: 's3', jp: 'ここに なまえを かいて ください。', ro: 'koko ni namae o kaite kudasai.', pt: 'Escreva seu nome aqui, por favor.', note: 'かく (escrever) → かいて.' },
      { k: 's4', jp: 'いま ごはんを たべて います。', ro: 'ima gohan o tabete imasu.', pt: 'Estou comendo agora.', note: '〜ています = ação em andamento.' },
      { k: 's5', jp: 'なにを して いますか。', ro: 'nani o shite imasu ka.', pt: 'O que você está fazendo?', note: 'Versão educada de なにしてるの？ (casual).' },
      { k: 's6', jp: 'とうきょうに すんで います。', ro: 'toukyou ni sunde imasu.', pt: 'Moro em Tóquio.', note: 'すむ (morar) → すんで. Aqui ています indica um estado.' },
      { k: 's7', jp: 'あさ おきて、かおを あらいます。', ro: 'asa okite, kao o araimasu.', pt: 'De manhã acordo e lavo o rosto.', note: 'A forma て liga ações em sequência.' }
    ],
    examples: [
      { jp: 'すみません、しゃしんを とって ください。', ro: 'sumimasen, shashin o totte kudasai.', pt: 'Com licença, tire uma foto (de nós), por favor.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual é a forma て de のむ (beber)?', opts: ['のんで|nonde', 'のって|notte', 'のみて|nomite'], ans: 0, explain: 'Verbos em む → んで: のむ → のんで.' },
      { t: 'fill', prompt: 'Complete o pedido', pt: 'Espere um pouco, por favor.', jp: 'ちょっと まって ＿＿＿。', opts: ['ください|kudasai', 'います|imasu', 'です|desu'], ans: 0, explain: '〜てください = por favor, faça ~.' },
      { t: 'order', prompt: 'Monte a frase', pt: 'Estou comendo agora.', tiles: ['いま|ima', 'たべて|tabete', 'います|imasu'], extra: ['ください|kudasai'], explain: 'たべて + います = está comendo.' },
      { t: 'error', ctx: 'Quero dizer: “Moro em Tóquio.”', tokens: ['とうきょうに|toukyou ni', 'すみて|sumite', 'います|imasu'], wrong: 1, explain: 'すむ → すんで (verbos em む → んで): すんでいます.' }
    ]
  });

  /* ---------------- CONSTRUÇÃO DE FRASES (c6) ---------------- */
  const c6 = cat('c6');
  c6.desc = 'Juntando tudo: apresentar-se, convidar, pedir, comprar, pedir permissão e explicar razões.';
  c6.soon = [];
  c6.lessons.push(
  {
    id: 'c6l1', title: 'Apresentação pessoal', emblem: '紹', kind: 'grammar',
    intro: [
      'Uma apresentação japonesa costuma seguir esta ordem: はじめまして → nome → de onde você é → algo sobre você → よろしくおねがいします.',
      'Para dizer de onde vem: [lugar]から きました (vim de ~). Onde mora: [lugar]に すんでいます.',
      'Idade: número + さい. Atenção: 20 anos tem palavra própria, はたち.'
    ],
    tip: 'Use a frase de origem: ブラジルから きました。 Ela abre muitas conversas!',
    items: [
      { k: 's1', jp: 'ブラジルから きました。', ro: 'burajiru kara kimashita.', pt: 'Vim do Brasil.', note: 'から = de (origem). きました = vim.' },
      { k: 's2', jp: 'サンパウロに すんで います。', ro: 'sanpauro ni sunde imasu.', pt: 'Moro em São Paulo.', note: 'Nomes de cidades estrangeiras são escritos em katakana.' },
      { k: 's3', jp: 'にじゅうごさいです。', ro: 'nijuugo sai desu.', pt: 'Tenho 25 anos.', note: 'Número + さい. 20 anos = はたち. 1, 8 e 10 mudam: いっさい, はっさい, じゅっさい.' },
      { k: 's4', jp: 'なんさいですか。', ro: 'nansai desu ka.', pt: 'Quantos anos você tem?', note: 'Mais educado: おいくつですか.' },
      { k: 's5', jp: 'かいしゃいんです。', ro: 'kaishain desu.', pt: 'Sou funcionário(a) de empresa.', note: 'かいしゃいん = funcionário de empresa. がくせい = estudante.' },
      { k: 's6', jp: 'しゅみは アニメを みる ことです。', ro: 'shumi wa anime o miru koto desu.', pt: 'Meu hobby é assistir anime.', note: 'しゅみ = hobby. verbo + こと = o ato de ~.' },
      { k: 's7', jp: 'にほんごを べんきょうして います。', ro: 'nihongo o benkyou shite imasu.', pt: 'Estou estudando japonês.', note: 'べんきょうする = estudar.' }
    ],
    examples: [
      { jp: 'はじめまして。ルカスです。ブラジルから きました。よろしく おねがいします。', ro: 'hajimemashite. Rukasu desu. burajiru kara kimashita. yoroshiku onegaishimasu.', pt: 'Muito prazer. Sou o Lucas. Vim do Brasil. Conto com você.' }
    ],
    exercises: [
      { t: 'order', prompt: 'Monte a frase', pt: 'Vim do Brasil.', tiles: ['ブラジル|burajiru', 'から|kara', 'きました|kimashita'], extra: ['に|ni'], explain: '[lugar] から きました.' },
      { t: 'situation', prompt: 'Como se diz “Tenho 20 anos”?', opts: ['はたちです|hatachi desu', 'にじゅっさいです|nijussai desu', 'にじゅうです|nijuu desu'], ans: 0, explain: '20 anos tem palavra própria: はたち.' },
      { t: 'fill', prompt: 'Complete', pt: 'Moro em São Paulo.', jp: 'サンパウロ＿ すんで います。', opts: ['に|ni', 'で|de', 'を|o'], ans: 0, explain: 'すむ usa に: サンパウロに すんでいます.' }
    ]
  },
  {
    id: 'c6l2', title: 'Convites e combinados', emblem: '誘', kind: 'grammar',
    intro: [
      'Para convidar com educação, use a pergunta negativa 〜ませんか: いっしょに いきませんか (Não quer ir junto?). Soa gentil, porque deixa a pessoa livre para recusar.',
      'Para aceitar e propor: 〜ましょう (vamos ~). いきましょう！',
      'Recusar diretamente é raro. O mais natural é começar a frase e deixar no ar: あしたは ちょっと… (Amanhã é meio…). Todo mundo entende que é um “não”.'
    ],
    tip: 'ちょっと… com voz hesitante é uma das recusas mais educadas do japonês.',
    items: [
      { k: 's1', jp: 'いっしょに えいがを みませんか。', ro: 'issho ni eiga o mimasen ka.', pt: 'Não quer ver um filme comigo?', note: '〜ませんか = convite educado.' },
      { k: 's2', jp: 'いいですね。みましょう。', ro: 'ii desu ne. mimashou.', pt: 'Boa ideia. Vamos assistir.', note: '〜ましょう = vamos ~.' },
      { k: 's3', jp: 'あした ひまですか。', ro: 'ashita hima desu ka.', pt: 'Você está livre amanhã?', note: 'ひま = tempo livre, desocupado.' },
      { k: 's4', jp: 'すみません、あしたは ちょっと…。', ro: 'sumimasen, ashita wa chotto….', pt: 'Desculpe, amanhã é meio complicado…', note: 'Recusa educada: não é preciso explicar o motivo.' },
      { k: 's5', jp: 'じゃあ、また こんど。', ro: 'jaa, mata kondo.', pt: 'Então fica para a próxima.', note: 'こんど = da próxima vez.' },
      { k: 's6', jp: 'なんじに あいましょうか。', ro: 'nanji ni aimashou ka.', pt: 'A que horas nos encontramos?', note: 'あう = encontrar-se.' },
      { k: 's7', jp: 'えきの まえで あいましょう。', ro: 'eki no mae de aimashou.', pt: 'Vamos nos encontrar em frente à estação.', note: 'まえ = frente.' }
    ],
    examples: [
      { jp: 'しゅうまつ、カラオケに いきませんか。 … いいですね！', ro: 'shuumatsu, karaoke ni ikimasen ka. … ii desu ne!', pt: 'Não quer ir ao karaokê no fim de semana? … Boa!' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você quer convidar um colega com educação para almoçar. O que diz?', opts: ['いっしょに たべませんか|issho ni tabemasen ka', 'いっしょに たべません|issho ni tabemasen', 'たべて ください|tabete kudasai'], ans: 0, explain: '〜ませんか (com か!) é o convite. Sem か, é só “não como”.' },
      { t: 'situation', prompt: 'Alguém responde あしたは ちょっと…. O que quer dizer?', opts: ['Não pode amanhã', 'Pode um pouco amanhã', 'Pede para esperar'], ans: 0, explain: 'ちょっと… deixado no ar é uma recusa educada.' },
      { t: 'fill', prompt: 'Complete', pt: 'Vamos nos encontrar em frente à estação.', jp: 'えきの まえで あい＿＿＿。', opts: ['ましょう|mashou', 'ません|masen', 'ました|mashita'], ans: 0, explain: '〜ましょう = vamos ~.' }
    ]
  },
  {
    id: 'c6l3', title: 'Querer: 〜たい e ほしい', emblem: '欲', kind: 'grammar',
    intro: [
      'Querer FAZER algo: troque ます por たい. たべます → たべたい (quero comer). Com です fica educado: たべたいです.',
      'Querer TER algo: ほしい. あたらしい スマホが ほしいです (quero um celular novo).',
      'Negativo: たくない (não quero) e ほしくない. São adjetivos い, então seguem as mesmas regras.',
      'Atenção: em japonês, dizer diretamente o que OUTRA pessoa quer soa estranho. Para os outros, pergunte: なにが たべたいですか.'
    ],
    tip: '〜たい é o “quero!” de todo protagonista de anime: つよく なりたい！ (Quero ficar mais forte!)',
    items: [
      { k: 's1', jp: 'にほんに いきたいです。', ro: 'nihon ni ikitai desu.', pt: 'Quero ir ao Japão.', note: 'いきます → いきたい.' },
      { k: 's2', jp: 'みずが のみたいです。', ro: 'mizu ga nomitai desu.', pt: 'Quero beber água.', note: 'Com たい, o objeto pode levar が ou を.' },
      { k: 's3', jp: 'なにが たべたいですか。', ro: 'nani ga tabetai desu ka.', pt: 'O que você quer comer?', note: 'Para outras pessoas, use pergunta.' },
      { k: 's4', jp: 'あたらしい スマホが ほしいです。', ro: 'atarashii sumaho ga hoshii desu.', pt: 'Quero um celular novo.', note: 'ほしい = querer ter. あたらしい = novo.' },
      { k: 's5', jp: 'きょうは どこにも いきたくないです。', ro: 'kyou wa doko ni mo ikitaku nai desu.', pt: 'Hoje não quero ir a lugar nenhum.', note: 'たくない = não quero. どこにも + negativo = a lugar nenhum.' },
      { k: 's6', jp: 'つよく なりたい！', ro: 'tsuyoku naritai!', pt: 'Quero ficar mais forte!', note: 'つよい (forte) → つよく なる (tornar-se forte) → なりたい. Clássico de anime.' }
    ],
    examples: [
      { jp: 'のどが かわいた。なにか のみたい。', ro: 'nodo ga kawaita. nanika nomitai.', pt: 'Estou com sede. Quero beber alguma coisa.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete', pt: 'Quero ir ao Japão.', jp: 'にほんに いき＿＿です。', opts: ['たい|tai', 'ます|masu', 'ほしい|hoshii'], ans: 0, explain: 'Querer fazer: verbo + たい.' },
      { t: 'situation', prompt: 'Você quer TER um gato. Qual frase?', opts: ['ねこが ほしいです|neko ga hoshii desu', 'ねこが たべたいです|neko ga tabetai desu', 'ねこが いきたいです|neko ga ikitai desu'], ans: 0, explain: 'Querer ter algo: ほしい.' },
      { t: 'translate', jp: 'つよく なりたい！', ro: 'tsuyoku naritai!', tiles: ['Quero', 'ficar', 'mais', 'forte!'], extra: ['Não', 'comer'], explain: 'なりたい = quero me tornar.' }
    ]
  },
  {
    id: 'c6l4', title: 'Compras e restaurante', emblem: '店', kind: 'grammar',
    intro: [
      'Para contar objetos usa-se uma contagem japonesa própria: ひとつ, ふたつ, みっつ, よっつ, いつつ (1 a 5).',
      'Para pessoas: ひとり (1), ふたり (2), e a partir de 3, número + にん: さんにん.',
      'No restaurante, o atendente pergunta なんめいさまですか (quantas pessoas?) com linguagem respeitosa. Você responde de forma simples: ふたりです.',
      'Para pedir, basta apontar e dizer これを ください ou これを おねがいします.'
    ],
    tip: 'Quase tudo em loja se resolve com: これ + ください / おねがいします.',
    items: [
      { k: 's1', jp: 'これを ください。', ro: 'kore o kudasai.', pt: 'Quero este, por favor.', note: 'ください = me dê, por favor.' },
      { k: 's2', jp: 'ひとつ ください。', ro: 'hitotsu kudasai.', pt: 'Um, por favor.', note: 'A quantidade vem antes de ください, sem partícula.' },
      { k: 's3', jp: 'みっつで いくらですか。', ro: 'mittsu de ikura desu ka.', pt: 'Quanto ficam os três?', note: 'で = no total. いくら = quanto (preço).' },
      { k: 's4', jp: 'なんめいさまですか。', ro: 'nanmei-sama desu ka.', pt: 'Quantas pessoas? (atendente)', note: 'Linguagem respeitosa de restaurante. Você não usa さま para si mesmo.' },
      { k: 's5', jp: 'ふたりです。', ro: 'futari desu.', pt: 'Somos dois.', note: 'ひとり (1 pessoa), ふたり (2), さんにん (3).' },
      { k: 's6', jp: 'メニューを おねがいします。', ro: 'menyuu o onegaishimasu.', pt: 'O cardápio, por favor.', note: 'おねがいします serve para pedir quase tudo.' },
      { k: 's7', jp: 'おかいけい おねがいします。', ro: 'okaikei onegaishimasu.', pt: 'A conta, por favor.', note: 'おかいけい = a conta.' },
      { k: 's8', jp: 'カードで いいですか。', ro: 'kaado de ii desu ka.', pt: 'Pode ser no cartão?', note: 'で = meio (de pagamento). いいですか = tudo bem?' }
    ],
    examples: [
      { jp: 'いらっしゃいませ。なんめいさまですか。 … ひとりです。', ro: 'irasshaimase. nanmei-sama desu ka. … hitori desu.', pt: 'Bem-vindo. Quantas pessoas? … Só eu.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'O atendente pergunta なんめいさまですか. Você está com um amigo. O que responde?', opts: ['ふたりです|futari desu', 'ふたつです|futatsu desu', 'にです|ni desu'], ans: 0, explain: 'Para pessoas: ひとり, ふたり, さんにん.' },
      { t: 'situation', prompt: 'Você terminou de comer e quer pagar. O que diz?', opts: ['おかいけい おねがいします|okaikei onegaishimasu', 'メニューを おねがいします|menyuu o onegaishimasu', 'いただきます|itadakimasu'], ans: 0, explain: 'おかいけい = a conta.' },
      { t: 'order', prompt: 'Monte o pedido', pt: 'Dois destes, por favor.', tiles: ['これ|kore', 'を|o', 'ふたつ|futatsu', 'ください|kudasai'], extra: ['ふたり|futari'], explain: 'これを + quantidade + ください. Objetos usam ふたつ.' }
    ]
  },
  {
    id: 'c6l5', title: 'Pedir e dar permissão', emblem: '許', kind: 'grammar',
    intro: [
      'Pedir permissão: forma て + もいいですか. しゃしんを とっても いいですか (Posso tirar uma foto?).',
      'Responder: はい、いいですよ (sim, pode) ou すみません、ちょっと… (desculpe, não dá).',
      'Proibir: forma て + はいけません (não é permitido). Em placas e regras. Na fala casual: 〜ちゃだめ.',
      'Dizer que não precisa: ない → なくてもいいです. いかなくても いいです (não precisa ir).'
    ],
    tip: 'Na fala casual, とっても いい？ (posso tirar?) é suficiente entre amigos.',
    items: [
      { k: 's1', jp: 'しゃしんを とっても いいですか。', ro: 'shashin o totte mo ii desu ka.', pt: 'Posso tirar uma foto?', note: 'とる → とって + もいいですか.' },
      { k: 's2', jp: 'はい、いいですよ。', ro: 'hai, ii desu yo.', pt: 'Sim, pode.', note: 'Resposta positiva.' },
      { k: 's3', jp: 'ここに すわっても いいですか。', ro: 'koko ni suwatte mo ii desu ka.', pt: 'Posso sentar aqui?', note: 'すわる = sentar.' },
      { k: 's4', jp: 'ここで たばこを すっては いけません。', ro: 'koko de tabako o sutte wa ikemasen.', pt: 'Não é permitido fumar aqui.', note: '〜てはいけません = proibição.' },
      { k: 's5', jp: 'はいっちゃ だめだよ。', ro: 'haitcha dame da yo.', pt: 'Não pode entrar, viu.', note: 'Casual: はいっては (haitte wa) → はいっちゃ (haitcha). Comum com crianças e entre amigos.' },
      { k: 's6', jp: 'いそがなくても いいですよ。', ro: 'isoganakute mo ii desu yo.', pt: 'Não precisa ter pressa.', note: 'なくてもいい = não precisa.' },
      { k: 's7', jp: 'ちょっと トイレに いっても いい？', ro: 'chotto toire ni itte mo ii?', pt: 'Posso ir rapidinho ao banheiro?', note: 'Versão casual, sem です.' }
    ],
    examples: [
      { jp: 'まどを あけても いいですか。 … ええ、どうぞ。', ro: 'mado o akete mo ii desu ka. … ee, douzo.', pt: 'Posso abrir a janela? … Claro, à vontade.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete', pt: 'Posso tirar uma foto?', jp: 'しゃしんを とって＿ いいですか。', opts: ['も|mo', 'は|wa', 'を|o'], ans: 0, explain: '〜ても いいですか = posso ~?' },
      { t: 'situation', prompt: 'Você vê a placa “ここで しゃしんを とっては いけません”. O que significa?', opts: ['É proibido tirar fotos aqui', 'Tire fotos aqui', 'Pode tirar fotos aqui'], ans: 0, explain: '〜てはいけません = proibido.' },
      { t: 'situation', prompt: 'O que quer dizer いそがなくても いいですよ?', opts: ['Não precisa ter pressa', 'É proibido correr', 'Vamos correr'], ans: 0, explain: 'なくてもいい = não precisa.' }
    ]
  },
  {
    id: 'c6l6', title: 'Razões e explicações', emblem: '因', kind: 'grammar',
    intro: [
      'から (porque, então) vem DEPOIS da razão: あついから、まどを あけます (Como está quente, vou abrir a janela).',
      'ので é parecido, mas soa mais suave e educado. Muito usado para se desculpar ou explicar.',
      '〜んです (na fala educada) e 〜んだ / 〜の (na casual) dão o tom de explicação: “é que…”. どうしたんですか = O que aconteceu? (o que houve com você?).',
      'Em animes você ouve muito なんで？ e a resposta com 〜んだ: だって、こわいんだ！ (É que estou com medo!).'
    ],
    tip: 'Ouça a ordem: primeiro vem a razão, depois から, e por último o resultado.',
    items: [
      { k: 's1', jp: 'あついから、まどを あけて ください。', ro: 'atsui kara, mado o akete kudasai.', pt: 'Está quente, então abra a janela, por favor.', note: 'razão + から + pedido.' },
      { k: 's2', jp: 'どうして おくれたんですか。', ro: 'doushite okureta n desu ka.', pt: 'Por que você se atrasou?', note: 'おくれる = atrasar-se. 〜んですか pede uma explicação.' },
      { k: 's3', jp: 'でんしゃが おくれたんです。', ro: 'densha ga okureta n desu.', pt: 'É que o trem atrasou.', note: '〜んです = é que…' },
      { k: 's4', jp: 'あたまが いたいので、きょうは やすみます。', ro: 'atama ga itai node, kyou wa yasumimasu.', pt: 'Como estou com dor de cabeça, vou faltar hoje.', note: 'ので = como, porque (mais suave). いたい = dói.' },
      { k: 's5', jp: 'どうしたんですか。', ro: 'dou shita n desu ka.', pt: 'O que aconteceu? / O que houve?', note: 'Pergunta com preocupação. Casual: どうしたの？' },
      { k: 's6', jp: 'ちょっと きぶんが わるいんです。', ro: 'chotto kibun ga warui n desu.', pt: 'É que não estou me sentindo bem.', note: 'きぶんが わるい = sentir-se mal.' }
    ],
    examples: [
      { jp: 'なんで こないの？ … いそがしいんだ。', ro: 'nande konai no? … isogashii n da.', pt: 'Por que você não vem? … É que estou ocupado. (casual)' }
    ],
    exercises: [
      { t: 'order', prompt: 'Monte a frase', pt: 'Está quente, então abra a janela, por favor.', tiles: ['あつい|atsui', 'から|kara', 'まどを|mado o', 'あけて|akete', 'ください|kudasai'], extra: ['ので|node'], explain: 'razão + から + pedido.' },
      { t: 'situation', prompt: 'Seu amigo parece triste. O que você pergunta?', opts: ['どうしたの？|dou shita no?', 'どうぞ|douzo', 'どういたしまして|dou itashimashite'], ans: 0, explain: 'どうしたの？ = O que houve?' },
      { t: 'situation', prompt: 'Qual é mais suave para explicar uma falta ao chefe?', opts: ['ので|node', 'から|kara', 'だって|datte'], ans: 0, explain: 'ので soa mais suave e educado que から.' }
    ]
  });
})();
