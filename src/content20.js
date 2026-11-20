/* ==========================================================
   CONTEÚDO 3.0 — Avançado (N2): Gramática N2 (c25)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c25', emblem: '律', title: 'Gramática N2', jp: 'ぶんぽう', stage: 'ava', jlpt: 'N2',
    desc: 'Certeza e obrigação, tendências, base e critério, causa e concessão, limites, possibilidade, sentimentos intensos e contraste: a gramática de jornais, textos e conversas maduras.',
    requires: 'c18', reqWhy: 'A gramática N2 constrói sobre as estruturas da gramática N3.'
  });
  c.lessons.push(
  L('c25l1', 'Certeza: に違いない, に決まっている', '違', 'grammar', [
    'に違いない = sem dúvida, com certeza (convicção baseada em indícios). É mais escrito: 犯人は彼に違いない.',
    'に決まっている = é óbvio que, claro que (convicção subjetiva, mais falada): そんなの無理に決まってる.',
    'Ambos vêm depois da forma simples; substantivo e adjetivo な entram direto, sem だ: 本当に違いない, 嘘に決まっている.'
  ], 'に違いない é a versão forte de はずだ. Já に決まっている pode soar teimoso, por ser bem subjetivo.', [
    ['s1', 'あの店は人気があるから、おいしいに違いない。', 'ano mise wa ninki ga aru kara, oishii ni chigainai.', 'Aquela loja é popular, então com certeza é boa.', ''],
    ['s2', '電気が消えている。もう寝たに違いない。', 'denki ga kiete iru. mou neta ni chigainai.', 'A luz está apagada. Com certeza já dormiu.', ''],
    ['s3', 'そんな話、嘘に決まっている。', 'sonna hanashi, uso ni kimatte iru.', 'Uma história dessas, claro que é mentira.', ''],
    ['s4', '練習しなければ、負けるに決まってるよ。', 'renshuu shinakereba, makeru ni kimatte ru yo.', 'Se não treinar, é óbvio que vai perder.', ''],
    ['s5', 'この字は彼が書いたものに違いありません。', 'kono ji wa kare ga kaita mono ni chigai arimasen.', 'Esta letra sem dúvida foi escrita por ele.', 'Forma polida.'],
    ['s6', '一人で行くなんて、危ないに決まってるじゃない。', 'hitori de iku nante, abunai ni kimatte ru ja nai.', 'Ir sozinho? É óbvio que é perigoso!', '']
  ], [
    ['彼女の表情を見ると、何かあったに違いない。', 'kanojo no hyoujou o miru to, nanika atta ni chigainai.', 'Pela expressão dela, com certeza aconteceu alguma coisa.']
  ], [
    X.s('Num relatório formal: “O motivo é, sem dúvida, a falta de verba.”', ['予算不足に違いない|yosan busoku ni chigainai', '予算不足に決まってる|yosan busoku ni kimatte ru', '予算不足かもしれない|yosan busoku kamoshirenai'], 'に違いない é mais escrito.'),
    X.f('Claro que é mentira!', '嘘に＿！', ['決まってる|kimatte ru', '違う|chigau', 'はずだ|hazu da'], 'に決まっている = é óbvio.'),
    X.e('“Sem dúvida ele é o culpado.”', ['彼が|kare ga', '犯人だに|hannin da ni', '違いない|chigainai'], 1, 'Substantivo sem だ: 犯人に違いない.'),
    X.s('Qual expressa convicção MAIS subjetiva?', ['に決まっている|ni kimatte iru', 'に違いない|ni chigainai', 'はずだ|hazu da'], 'に決まっている é opinião pessoal forte.')
  ]),
  L('c25l2', 'Não ter escolha: ざるを得ない, しかない', '得', 'grammar', [
    'ざるを得ない = não ter outra opção senão, ser forçado a. Forma: raiz negativa + ざるを得ない: 行かざるを得ない. Exceção: する → せざるを得ない.',
    'しかない / ほかない = só resta (fazer): やるしかない. Mais simples e muito falado.',
    'ざるを得ない é formal e mostra relutância: a pessoa não quer, mas é obrigada pelas circunstâncias.'
  ], 'やるしかない (só resta fazer) é frase de motivação muito comum, inclusive em animes e esportes.', [
    ['s1', '上司の命令だから、従わざるを得ない。', 'joushi no meirei da kara, shitagawazaru o enai.', 'É ordem do chefe, então não tenho escolha senão obedecer.', ''],
    ['s2', '台風なので、旅行は中止せざるを得ない。', 'taifuu na node, ryokou wa chuushi sezaru o enai.', 'Com o tufão, somos forçados a cancelar a viagem.', 'する → せざる.'],
    ['s3', 'ここまで来たら、やるしかない。', 'koko made kitara, yaru shika nai.', 'Já que chegamos até aqui, só resta fazer.', ''],
    ['s4', '終電を逃したので、タクシーで帰るしかなかった。', 'shuuden o nogashita node, takushii de kaeru shika nakatta.', 'Perdi o último trem, então só me restou voltar de táxi.', ''],
    ['s5', '彼の努力は認めざるを得ない。', 'kare no doryoku wa mitomezaru o enai.', 'Tenho que reconhecer o esforço dele.', 'Reconhecer a contragosto.'],
    ['s6', '自分で解決するほかない。', 'jibun de kaiketsu suru hoka nai.', 'Não há outro jeito senão resolver sozinho.', 'ほかない = しかない (formal).']
  ], [
    ['体調が悪いので、今日の会議は欠席せざるを得ません。', 'taichou ga warui node, kyou no kaigi wa kesseki sezaru o emasen.', 'Como não estou bem, sou obrigado a faltar à reunião de hoje.']
  ], [
    X.f('Sou obrigado a ir.', '行か＿を得ない。', ['ざる|zaru', 'ない|nai', 'ず|zu'], 'Raiz negativa + ざるを得ない.'),
    X.s('Forma correta com する:', ['せざるを得ない|sezaru o enai', 'しざるを得ない|shizaru o enai', 'さざるを得ない|sazaru o enai'], 'Exceção: する → せざる.'),
    X.s('Antes de uma prova difícil, para se motivar:', ['やるしかない！|yaru shika nai!', 'やらざるを得ない！|yarazaru o enai!', 'やるに違いない！|yaru ni chigainai!'], 'しかない = só resta fazer.'),
    X.s('O que ざるを得ない transmite?', ['Obrigação relutante', 'Desejo forte', 'Proibição'], 'Não quer, mas precisa.')
  ]),
  L('c25l3', 'Tendências: 一方だ, つつある', '傾', 'grammar', [
    '一方だ = só faz aumentar/piorar, cada vez mais (tendência contínua, muitas vezes negativa): 物価は上がる一方だ.',
    'つつある = está em processo de (mudança gradual em andamento), estilo escrito: 環境は変わりつつある.',
    'つつ sozinho (sem ある) = enquanto, ao mesmo tempo que, ou “apesar de” (つつも): 悪いと知りつつ、やってしまった.'
  ], 'Use 一方だ com verbos de mudança: 増える, 減る, 悪くなる, 広がる.', [
    ['s1', '最近、物価は上がる一方だ。', 'saikin, bukka wa agaru ippou da.', 'Ultimamente os preços só sobem.', ''],
    ['s2', '彼の病気は悪くなる一方だった。', 'kare no byouki wa waruku naru ippou datta.', 'A doença dele só piorava.', ''],
    ['s3', '日本の人口は減りつつある。', 'nihon no jinkou wa heritsutsu aru.', 'A população do Japão está diminuindo.', 'Processo em andamento.'],
    ['s4', '新しい技術が広まりつつある。', 'atarashii gijutsu ga hiromaritsutsu aru.', 'A nova tecnologia está se difundindo.', ''],
    ['s5', '体に悪いと知りつつ、夜更かしをしてしまう。', 'karada ni warui to shiritsutsu, yofukashi o shite shimau.', 'Mesmo sabendo que faz mal, acabo ficando acordado até tarde.', 'つつ = apesar de.'],
    ['s6', '景色を楽しみつつ、山を登った。', 'keshiki o tanoshimitsutsu, yama o nobotta.', 'Subi a montanha apreciando a paisagem.', 'つつ = enquanto.']
  ], [
    ['インターネットの普及によって、人々の生活は大きく変わりつつある。', 'intaanetto no fukyuu ni yotte, hitobito no seikatsu wa ookiku kawaritsutsu aru.', 'Com a difusão da internet, a vida das pessoas está mudando muito.']
  ], [
    X.f('O trabalho só aumenta.', '仕事は増える＿だ。', ['一方|ippou', 'つつ|tsutsu', 'しか|shika'], '一方だ = só aumenta.'),
    X.s('Num artigo: “O clima global está mudando.”', ['気候は変わりつつある|kikou wa kawaritsutsu aru', '気候は変わる一方だ|kikou wa kawaru ippou da', '気候は変わるしかない|kikou wa kawaru shika nai'], 'つつある = processo, estilo escrito.'),
    X.s('O que significa 知りつつ em 悪いと知りつつ?', ['mesmo sabendo', 'sem saber', 'depois de saber'], 'つつ = apesar de.'),
    X.e('“Os preços só sobem.”', ['物価が|bukka ga', '上がり一方だ|agari ippou da'], 1, 'Forma de dicionário: 上がる一方だ.')
  ]),
  L('c25l4', 'Base e critério: に基づいて, に沿って, に応じて', '基', 'grammar', [
    'に基づいて = com base em (dados, fatos, regras): 調査に基づいて報告書を書く.',
    'に沿って = seguindo, ao longo de (plano, linha, desejo): 計画に沿って進める. 川に沿って歩く.',
    'に応じて = de acordo com, conforme (algo que varia): 能力に応じて給料が決まる.'
  ], 'Antes de substantivo: に基づいた / に基づく (調査に基づいたデータ), に沿った, に応じた.', [
    ['s1', 'この映画は実話に基づいて作られた。', 'kono eiga wa jitsuwa ni motozuite tsukurareta.', 'Este filme foi feito com base numa história real.', ''],
    ['s2', 'アンケートの結果に基づいて、商品を改善した。', 'ankeeto no kekka ni motozuite, shouhin o kaizen shita.', 'Melhoramos o produto com base nos resultados da pesquisa.', ''],
    ['s3', 'マニュアルに沿って作業してください。', 'manyuaru ni sotte sagyou shite kudasai.', 'Trabalhe seguindo o manual.', ''],
    ['s4', '川に沿って、桜並木が続いている。', 'kawa ni sotte, sakura namiki ga tsuzuite iru.', 'Ao longo do rio, se estende uma fileira de cerejeiras.', ''],
    ['s5', '予算に応じて、プランを選べます。', 'yosan ni oujite, puran o erabemasu.', 'Você pode escolher o plano de acordo com o orçamento.', ''],
    ['s6', 'お客様のご要望に沿ったサービスを提供します。', 'okyakusama no goyoubou ni sotta saabisu o teikyou shimasu.', 'Oferecemos serviços de acordo com o pedido do cliente.', '']
  ], [
    ['年齢に応じた運動をすることが大切だ。', 'nenrei ni oujita undou o suru koto ga taisetsu da.', 'É importante fazer exercícios adequados à idade.']
  ], [
    X.f('O salário varia conforme a experiência.', '経験＿給料が変わる。', ['に応じて|ni oujite', 'に沿って|ni sotte', 'に基づいて|ni motozuite'], 'Varia conforme = に応じて.'),
    X.f('Uma decisão baseada em dados.', 'データ＿判断', ['に基づいた|ni motozuita', 'に応じる|ni oujiru', 'に沿う|ni sou'], 'Com base em = に基づいた.'),
    X.s('Caminhar “ao longo da praia”:', ['海岸に沿って歩く|kaigan ni sotte aruku', '海岸に応じて歩く|kaigan ni oujite aruku', '海岸に基づいて歩く|kaigan ni motozuite aruku'], 'Ao longo de = に沿って.'),
    X.o('Prossiga seguindo o plano.', ['計画に|keikaku ni', '沿って|sotte', '進めてください|susumete kudasai'], ['応じて|oujite'], 'に沿って = seguindo.')
  ]),
  L('c25l5', 'Ponto de partida: をきっかけに, をはじめ, を中心に', '契', 'grammar', [
    'をきっかけに = a partir de, motivado por (um evento que deu início a algo): 留学をきっかけに、料理を始めた.',
    'をはじめ(として) = a começar por, incluindo principalmente: 東京をはじめ、全国で雪が降った.',
    'を中心に = centrado em, principalmente: 若者を中心に人気がある.'
  ], 'きっかけ sozinho é muito usado: 日本語を始めたきっかけは何ですか (o que te fez começar japonês?).', [
    ['s1', '一本の映画をきっかけに、日本に興味を持った。', 'ippon no eiga o kikkake ni, nihon ni kyoumi o motta.', 'Um filme foi o que me fez me interessar pelo Japão.', ''],
    ['s2', '入院をきっかけに、タバコをやめた。', 'nyuuin o kikkake ni, tabako o yameta.', 'Parei de fumar depois de ser internado.', ''],
    ['s3', '社長をはじめ、社員全員が出席した。', 'shachou o hajime, shain zen\'in ga shusseki shita.', 'Todos os funcionários, a começar pelo presidente, compareceram.', ''],
    ['s4', 'この漫画は若者を中心に人気がある。', 'kono manga wa wakamono o chuushin ni ninki ga aru.', 'Este mangá é popular principalmente entre os jovens.', ''],
    ['s5', '駅を中心に、町が発展した。', 'eki o chuushin ni, machi ga hatten shita.', 'A cidade se desenvolveu em torno da estação.', ''],
    ['s6', '日本語を勉強し始めたきっかけは何ですか。', 'nihongo o benkyou shihajimeta kikkake wa nan desu ka.', 'O que te levou a começar a estudar japonês?', '']
  ], [
    ['寿司をはじめ、日本料理は世界中で人気がある。', 'sushi o hajime, nihon ryouri wa sekaijuu de ninki ga aru.', 'A começar pelo sushi, a culinária japonesa é popular no mundo todo.']
  ], [
    X.f('A viagem foi o que me fez gostar de fotografia.', '旅行＿、写真が好きになった。', ['をきっかけに|o kikkake ni', 'を中心に|o chuushin ni', 'をはじめ|o hajime'], 'Evento que deu início = きっかけ.'),
    X.f('Popular principalmente entre mulheres.', '女性＿人気がある。', ['を中心に|o chuushin ni', 'をきっかけに|o kikkake ni', 'に沿って|ni sotte'], 'Principalmente = を中心に.'),
    X.s('“Vários países, a começar pelo Japão”:', ['日本をはじめ、多くの国|nihon o hajime, ooku no kuni', '日本をきっかけに、多くの国|nihon o kikkake ni, ooku no kuni', '日本に応じて、多くの国|nihon ni oujite, ooku no kuni'], 'をはじめ = a começar por.'),
    X.s('Como perguntar o que motivou alguém a começar algo?', ['始めたきっかけは何ですか|hajimeta kikkake wa nan desu ka', '始めた中心は何ですか|hajimeta chuushin wa nan desu ka', '始めた基づきは何ですか|hajimeta motozuki wa nan desu ka'], 'きっかけ = motivo inicial.')
  ]),
  L('c25l6', 'Justamente por isso: からこそ, からには, 以上', '故', 'grammar', [
    'からこそ = justamente porque (enfatiza a causa, muitas vezes contrariando a expectativa): 好きだからこそ、厳しく言うんだ.',
    'からには / 以上(は) = já que, uma vez que (então é preciso ir até o fim): 約束したからには、守らなければならない.',
    'Depois de からには e 以上, vem uma obrigação, decisão ou forte vontade: べきだ, なければならない, つもりだ.'
  ], 'からこそ também aparece em agradecimentos: 皆さんの支えがあったからこそ、ここまで来られました.', [
    ['s1', '君のことを思うからこそ、反対しているんだ。', 'kimi no koto o omou kara koso, hantai shite iru n da.', 'É justamente porque me importo com você que sou contra.', ''],
    ['s2', '失敗したからこそ、学べたこともある。', 'shippai shita kara koso, manabeta koto mo aru.', 'Há coisas que aprendi justamente por ter falhado.', ''],
    ['s3', '日本に来たからには、日本語をマスターしたい。', 'nihon ni kita kara ni wa, nihongo o masutaa shitai.', 'Já que vim ao Japão, quero dominar o japonês.', ''],
    ['s4', '引き受けた以上、最後まで責任を持ちます。', 'hikiuketa ijou, saigo made sekinin o mochimasu.', 'Já que aceitei, assumo a responsabilidade até o fim.', ''],
    ['s5', '試合に出るからには、優勝を目指す。', 'shiai ni deru kara ni wa, yuushou o mezasu.', 'Já que vou competir, vou atrás do título.', ''],
    ['s6', '皆さんの協力があったからこそ、成功できました。', 'minasan no kyouryoku ga atta kara koso, seikou dekimashita.', 'Só tivemos sucesso graças à colaboração de todos.', 'Agradecimento.']
  ], [
    ['プロである以上、言い訳はできない。', 'puro de aru ijou, iiwake wa dekinai.', 'Sendo profissional, não posso dar desculpas.']
  ], [
    X.f('Já que prometi, vou cumprir.', '約束した＿、守ります。', ['からには|kara ni wa', 'からこそ|kara koso', 'ばかりに|bakari ni'], 'Já que = からには.'),
    X.s('Num discurso de agradecimento: “Foi justamente pelo apoio de vocês…”', ['皆さんの支えがあったからこそ|minasan no sasae ga atta kara koso', '皆さんの支えがあった以上|minasan no sasae ga atta ijou', '皆さんの支えがあったからには|minasan no sasae ga atta kara ni wa'], 'からこそ = justamente porque.'),
    X.s('O que costuma vir depois de 以上?', ['uma obrigação ou decisão', 'uma pergunta', 'uma desculpa'], 'Já que… então deve.'),
    X.e('“Já que é estudante, deve estudar.”', ['学生だ|gakusei da', '以上は、|ijou wa,', '勉強するべきだ|benkyou suru beki da'], 0, 'Substantivo + である以上: 学生である以上.')
  ]),
  L('c25l7', 'Concessão: ものの, にもかかわらず, とはいえ', '然', 'grammar', [
    'ものの = embora, apesar de (o resultado esperado não veio): 買ったものの、一度も使っていない.',
    'にもかかわらず = apesar de (formal, com surpresa ou crítica): 雨にもかかわらず、多くの人が集まった.',
    'とはいえ = ainda que, mesmo assim (admite um fato e acrescenta uma ressalva): 春とはいえ、まだ寒い.'
  ], 'Todos são mais escritos que けど e のに. Em conversa, のに e けど bastam.', [
    ['s1', 'ジムに入会したものの、ほとんど行っていない。', 'jimu ni nyuukai shita mono no, hotondo itte inai.', 'Embora tenha me matriculado na academia, quase não vou.', ''],
    ['s2', '頭ではわかっているものの、なかなかやめられない。', 'atama de wa wakatte iru mono no, nakanaka yamerarenai.', 'Embora eu entenda racionalmente, não consigo parar.', ''],
    ['s3', '悪天候にもかかわらず、試合は行われた。', 'akutenkou ni mo kakawarazu, shiai wa okonawareta.', 'Apesar do mau tempo, o jogo foi realizado.', ''],
    ['s4', '何度も注意したにもかかわらず、彼は遅刻した。', 'nando mo chuui shita ni mo kakawarazu, kare wa chikoku shita.', 'Apesar de eu ter avisado várias vezes, ele se atrasou.', 'Crítica.'],
    ['s5', '三月とはいえ、まだ雪が降る日もある。', 'sangatsu to wa ie, mada yuki ga furu hi mo aru.', 'Ainda que seja março, há dias em que neva.', ''],
    ['s6', '安いとはいえ、毎日外食するとお金がかかる。', 'yasui to wa ie, mainichi gaishoku suru to okane ga kakaru.', 'Mesmo sendo barato, comer fora todo dia sai caro.', '']
  ], [
    ['日本に十年住んでいるとはいえ、敬語はまだ難しい。', 'nihon ni juunen sunde iru to wa ie, keigo wa mada muzukashii.', 'Mesmo morando no Japão há dez anos, o keigo ainda é difícil.']
  ], [
    X.f('Comprei o livro, mas não li.', '本を買った＿、まだ読んでいない。', ['ものの|mono no', 'からこそ|kara koso', '以上|ijou'], 'ものの = embora.'),
    X.s('Numa notícia: “Apesar da chuva, 10 mil pessoas vieram.”', ['雨にもかかわらず|ame ni mo kakawarazu', '雨とはいえ|ame to wa ie', '雨からこそ|ame kara koso'], 'にもかかわらず = apesar de (formal).'),
    X.f('Ainda que seja verão, à noite esfria.', '夏＿、夜は寒い。', ['とはいえ|to wa ie', 'ものの|mono no', 'からには|kara ni wa'], 'とはいえ = ainda que.'),
    X.s('Numa conversa casual entre amigos, o mais natural é:', ['のに / けど|noni / kedo', 'にもかかわらず|ni mo kakawarazu', 'ものの|mono no'], 'As formas N2 são mais escritas.')
  ]),
  L('c25l8', 'Limites: に限らず, に限って, 限り', '限', 'grammar', [
    'に限らず = não só, não se limitando a: 子供に限らず、大人にも人気がある.',
    'に限って = justamente (quando não devia): 急いでいる時に限って、電車が遅れる. Também “só, exclusivamente”: 本日に限り半額.',
    '限り = enquanto, desde que (condição); ない限り = a menos que: 雨が降らない限り、試合は行います.'
  ], 'うちの子に限って = “o meu filho, justo ele, não faria isso” é uma frase típica de pais que não acreditam no mau comportamento do filho.', [
    ['s1', 'この歌は若者に限らず、お年寄りにも人気がある。', 'kono uta wa wakamono ni kagirazu, otoshiyori ni mo ninki ga aru.', 'Esta música é popular não só entre jovens, mas também entre idosos.', ''],
    ['s2', '傘を持っていない日に限って、雨が降る。', 'kasa o motte inai hi ni kagitte, ame ga furu.', 'Justo no dia em que não levo guarda-chuva, chove.', 'Ironia.'],
    ['s3', '本日に限り、全品半額です。', 'honjitsu ni kagiri, zenpin hangaku desu.', 'Somente hoje, todos os produtos pela metade do preço.', ''],
    ['s4', '私が知っている限り、彼は嘘をつかない人だ。', 'watashi ga shitte iru kagiri, kare wa uso o tsukanai hito da.', 'Pelo que sei, ele não é de mentir.', ''],
    ['s5', '努力しない限り、成功はない。', 'doryoku shinai kagiri, seikou wa nai.', 'A menos que se esforce, não haverá sucesso.', ''],
    ['s6', 'できる限り、お手伝いします。', 'dekiru kagiri, otetsudai shimasu.', 'Vou ajudar o quanto puder.', '']
  ], [
    ['ここに住んでいる限り、この問題から逃げられない。', 'koko ni sunde iru kagiri, kono mondai kara nigerarenai.', 'Enquanto eu morar aqui, não vou escapar deste problema.']
  ], [
    X.f('Justo quando estou com pressa, o elevador não vem.', '急いでいる時＿、エレベーターが来ない。', ['に限って|ni kagitte', 'に限らず|ni kagirazu', 'からこそ|kara koso'], 'に限って = justamente.'),
    X.f('Não só no Japão, mas no mundo todo.', '日本＿、世界中で', ['に限らず|ni kagirazu', 'に限って|ni kagitte', 'に応じて|ni oujite'], 'に限らず = não só.'),
    X.s('O que significa 雨が降らない限り?', ['a menos que chova', 'enquanto chove', 'só quando chove'], 'ない限り = a menos que.'),
    X.o('Pelo que eu sei, ele é honesto.', ['私が知っている|watashi ga shitte iru', '限り、|kagiri,', '彼は正直だ|kare wa shoujiki da'], ['限って|kagitte'], '限り = até onde.')
  ]),
  L('c25l9', 'Usos de こと: ことから, ことに, ことなく', '事', 'grammar', [
    'ことから = pelo fato de, a partir disso (origem de um nome ou conclusão): 富士山が見えることから、この町は富士見町と呼ばれる.',
    'ことに = o que é (sentimento), com adjetivos de emoção: 驚いたことに, 残念なことに, うれしいことに.',
    'ことなく = sem (fazer algo), estilo escrito: 彼は休むことなく働き続けた.'
  ], 'ことに sempre vem com uma palavra de sentimento e no começo da frase: 不思議なことに (curiosamente).', [
    ['s1', '道が濡れていることから、雨が降ったとわかる。', 'michi ga nurete iru koto kara, ame ga futta to wakaru.', 'Pelo fato de a rua estar molhada, dá para saber que choveu.', ''],
    ['s2', '形が星に似ていることから、この花は星草と呼ばれている。', 'katachi ga hoshi ni nite iru koto kara, kono hana wa hoshikusa to yobarete iru.', 'Por ter forma parecida com uma estrela, esta flor é chamada de “erva-estrela”.', 'Origem de nome.'],
    ['s3', '驚いたことに、彼は一日で全部覚えてしまった。', 'odoroita koto ni, kare wa ichinichi de zenbu oboete shimatta.', 'Para minha surpresa, ele decorou tudo em um dia.', ''],
    ['s4', '残念なことに、その店は閉店してしまった。', 'zannen na koto ni, sono mise wa heiten shite shimatta.', 'Infelizmente, aquela loja fechou.', ''],
    ['s5', '彼女は一度も休むことなく、十年間働いた。', 'kanojo wa ichido mo yasumu koto naku, juunenkan hataraita.', 'Ela trabalhou dez anos sem faltar nem uma vez.', ''],
    ['s6', '諦めることなく、挑戦を続けた。', 'akirameru koto naku, chousen o tsuzuketa.', 'Continuou tentando, sem desistir.', '']
  ], [
    ['うれしいことに、来年も同じクラスになれた。', 'ureshii koto ni, rainen mo onaji kurasu ni nareta.', 'Para minha alegria, ano que vem ficaremos na mesma turma de novo.']
  ], [
    X.f('Para minha surpresa, ele passou.', '驚いた＿、彼は合格した。', ['ことに|koto ni', 'ことから|koto kara', 'ことなく|koto naku'], 'Sentimento + ことに.'),
    X.f('Trabalhou sem descansar.', '休む＿働いた。', ['ことなく|koto naku', 'ことに|koto ni', 'ことから|koto kara'], 'ことなく = sem.'),
    X.s('Para explicar a origem de um nome, usa-se:', ['ことから|koto kara', 'ことに|koto ni', 'ことなく|koto naku'], 'ことから = pelo fato de.'),
    X.s('O que significa 不思議なことに?', ['curiosamente', 'infelizmente', 'felizmente'], '不思議 = misterioso, curioso.')
  ]),
  L('c25l10', 'Dupla negação: ないことはない', '否', 'grammar', [
    'ないことはない / ないこともない = não é que não (seja possível): 行けないことはない (não é que eu não possa ir; dá, mas…). Expressa um “sim” relutante.',
    'Aことは Aが… = até que A, mas…: 読んだことは読んだが、よくわからなかった (ler eu li, mas não entendi).',
    'Estas formas permitem concordar parcialmente sem se comprometer, algo muito valorizado na comunicação japonesa.'
  ], 'Quando alguém responde 食べられないことはないけど…, o resto da frase geralmente é “prefiro não”.', [
    ['s1', '納豆、食べられないことはないけど、あまり好きじゃない。', 'nattou, taberarenai koto wa nai kedo, amari suki ja nai.', 'Não é que eu não consiga comer natto, mas não gosto muito.', ''],
    ['s2', '急げば、間に合わないこともない。', 'isogeba, ma ni awanai koto mo nai.', 'Se correr, até dá para chegar a tempo.', ''],
    ['s3', 'その気持ちも、わからないことはない。', 'sono kimochi mo, wakaranai koto wa nai.', 'Até entendo esse sentimento.', 'Empatia parcial.'],
    ['s4', '行ったことは行ったが、すぐ帰ってきた。', 'itta koto wa itta ga, sugu kaette kita.', 'Ir eu fui, mas voltei logo.', ''],
    ['s5', 'この料理、おいしいことはおいしいけど、ちょっと高い。', 'kono ryouri, oishii koto wa oishii kedo, chotto takai.', 'Gostoso este prato é, mas é meio caro.', ''],
    ['s6', '彼の意見に賛成できないこともない。', 'kare no iken ni sansei dekinai koto mo nai.', 'Não é que eu não possa concordar com ele.', '']
  ], [
    ['「明日までにできる？」「できないことはないけど、ちょっと大変かな。」', '"ashita made ni dekiru?" "dekinai koto wa nai kedo, chotto taihen ka na."', '“Consegue até amanhã?” “Não é impossível, mas vai ser meio puxado.”']
  ], [
    X.s('“Consegue fazer até amanhã?” — 「できないことはない」. Significa:', ['Dá, mas com alguma dificuldade', 'Não dá de jeito nenhum', 'É muito fácil'], 'Um “sim” relutante.'),
    X.f('Ler eu li, mas não entendi.', '読んだ＿読んだが、わからなかった。', ['ことは|koto wa', 'ことに|koto ni', 'ことなく|koto naku'], 'Aことは Aが.'),
    X.s('Por que essa estrutura é útil no Japão?', ['Permite concordar parcialmente, sem se comprometer', 'Deixa a fala mais rude', 'É usada só em provas'], 'Comunicação indireta.'),
    X.e('“Não é que eu não entenda.”', ['わからない|wakaranai', 'ことがない|koto ga nai'], 1, 'Forma correta: ことはない / こともない.')
  ]),
  L('c25l11', 'Ao fazer, além de: 上で, うえに', '上', 'grammar', [
    '〜た上で = depois de (fazer algo com cuidado), só então: よく考えた上で決めます.',
    '〜上で (dicionário) = para, ao fazer (no processo de): 日本で生活する上で、日本語は必要だ.',
    'うえに = além de (somando algo do mesmo tipo, bom com bom, ruim com ruim): この部屋は広いうえに、家賃も安い.'
  ], 'Em lojas e contratos: ご確認の上、ご記入ください (após conferir, preencha).', [
    ['s1', '家族と相談した上で、お返事します。', 'kazoku to soudan shita ue de, ohenji shimasu.', 'Respondo depois de conversar com a família.', ''],
    ['s2', '内容をよくお読みの上、サインしてください。', 'naiyou o yoku oyomi no ue, sain shite kudasai.', 'Após ler bem o conteúdo, assine.', 'Estilo formal.'],
    ['s3', '外国語を学ぶ上で、一番大切なのは続けることだ。', 'gaikokugo o manabu ue de, ichiban taisetsu na no wa tsuzukeru koto da.', 'Ao aprender uma língua, o mais importante é continuar.', ''],
    ['s4', 'このアパートは駅から近いうえに、家賃も安い。', 'kono apaato wa eki kara chikai ue ni, yachin mo yasui.', 'Este apartamento, além de perto da estação, tem aluguel barato.', ''],
    ['s5', '道に迷ったうえに、雨まで降ってきた。', 'michi ni mayotta ue ni, ame made futte kita.', 'Além de me perder, ainda começou a chover.', 'Ruim + ruim.'],
    ['s6', '仕事を選ぶ上で、給料より環境を重視する。', 'shigoto o erabu ue de, kyuuryou yori kankyou o juushi suru.', 'Ao escolher um emprego, priorizo o ambiente mais que o salário.', '']
  ], [
    ['彼女は頭がいいうえに、性格もいい。', 'kanojo wa atama ga ii ue ni, seikaku mo ii.', 'Ela, além de inteligente, tem ótimo caráter.']
  ], [
    X.f('Decido depois de ver o produto.', '商品を見た＿決めます。', ['上で|ue de', 'うえに|ue ni', '以上|ijou'], 'た上で = depois de.'),
    X.f('Além de caro, é ruim.', '高い＿、まずい。', ['うえに|ue ni', '上で|ue de', 'ものの|mono no'], 'うえに = além de.'),
    X.s('O que significa ご確認の上 num formulário?', ['após conferir', 'em cima da confirmação', 'sem confirmar'], 'の上 = após.'),
    X.e('“Além de bonito, é barato.” (bom + bom)', ['このかばんは|kono kaban wa', 'きれいうえに|kirei ue ni', '安い|yasui'], 1, 'Adjetivo な: きれいなうえに.')
  ]),
  L('c25l12', 'Risco e dificuldade: かねない, かねる', '兼', 'grammar', [
    'かねない = pode acabar (acontecendo algo ruim), há risco de: このままでは事故になりかねない. Usa a raiz ます.',
    'かねる = não posso, é difícil para mim (recusa educada em negócios): その件はお答えしかねます.',
    'Atenção: かねない é positivo na forma e expressa possibilidade negativa; かねる é positivo na forma e expressa impossibilidade.'
  ], 'わかりかねます (não saberia dizer) é uma recusa muito educada usada por atendentes.', [
    ['s1', 'スピードを出しすぎると、事故を起こしかねない。', 'supiido o dashisugiru to, jiko o okoshikanenai.', 'Se correr demais, pode acabar causando um acidente.', ''],
    ['s2', 'そんなことを言ったら、誤解されかねないよ。', 'sonna koto o ittara, gokai sarekanenai yo.', 'Se disser isso, pode ser mal interpretado.', ''],
    ['s3', '無理をすると、体を壊しかねない。', 'muri o suru to, karada o kowashikanenai.', 'Se exagerar, pode acabar adoecendo.', ''],
    ['s4', '申し訳ございませんが、そのご要望にはお応えしかねます。', 'moushiwake gozaimasen ga, sono goyoubou ni wa okotae shikanemasu.', 'Sinto muito, mas não podemos atender a esse pedido.', 'Recusa formal.'],
    ['s5', '担当者がいないので、わかりかねます。', 'tantousha ga inai node, wakarikanemasu.', 'O responsável não está, então não saberia dizer.', ''],
    ['s6', 'その意見には賛成しかねる。', 'sono iken ni wa sansei shikaneru.', 'Não posso concordar com essa opinião.', '']
  ], [
    ['小さなミスが、大きな問題につながりかねない。', 'chiisa na misu ga, ookina mondai ni tsunagarikanenai.', 'Um pequeno erro pode acabar levando a um grande problema.']
  ], [
    X.s('O que significa 失敗しかねない?', ['há risco de falhar', 'não vai falhar', 'falhou'], 'かねない = pode acabar.'),
    X.s('Um atendente não pode responder algo. Diz educadamente:', ['お答えしかねます|okotae shikanemasu', 'お答えしかねない|okotae shikanenai', '答えません|kotaemasen'], 'かねる = não posso (educado).'),
    X.f('Dormir pouco pode acabar com a saúde.', '寝不足は健康を害し＿。', ['かねない|kanenai', 'かねる|kaneru', 'がちだ|gachi da'], 'Risco = かねない.'),
    X.s('Qual é a diferença?', ['かねない = risco; かねる = não posso', 'São iguais', 'かねる = risco; かねない = posso'], 'Formas parecidas, sentidos opostos.')
  ]),
  L('c25l13', 'Possível e difícil: 得る, がたい, づらい', '難', 'grammar', [
    '得る (える / うる) = é possível, pode acontecer (escrito): 事故は誰にでも起こり得る. Negativa: あり得ない (impossível, inacreditável).',
    'がたい = difícil de (quase impossível, emocional ou moralmente): 信じがたい, 許しがたい, 忘れがたい.',
    'づらい = difícil de (desconforto físico ou psicológico, casual): この靴は歩きづらい. 言いづらい.'
  ], 'あり得ない (ありえない) virou uma reação comum: “Impossível! Não acredito!”.', [
    ['s1', '地震はいつでも起こり得る。', 'jishin wa itsu demo okoriuru.', 'Terremotos podem acontecer a qualquer momento.', ''],
    ['s2', 'そんなことはあり得ない。', 'sonna koto wa arienai.', 'Isso é impossível.', ''],
    ['s3', '彼が犯人だなんて、信じがたい。', 'kare ga hannin da nante, shinjigatai.', 'É difícil acreditar que ele seja o culpado.', ''],
    ['s4', 'あの日のことは、忘れがたい思い出だ。', 'ano hi no koto wa, wasuregatai omoide da.', 'Aquele dia é uma lembrança inesquecível.', ''],
    ['s5', 'この靴はかわいいけど、歩きづらい。', 'kono kutsu wa kawaii kedo, arukizurai.', 'Este sapato é bonito, mas é ruim de andar.', ''],
    ['s6', '先生には言いづらいことなんですが…。', 'sensei ni wa iizurai koto na n desu ga….', 'É uma coisa difícil de dizer ao senhor, mas…', '']
  ], [
    ['考え得るすべての方法を試した。', 'kangaeuru subete no houhou o tameshita.', 'Tentei todos os métodos possíveis.']
  ], [
    X.s('Um sapato desconfortável é:', ['歩きづらい|arukizurai', '歩きがたい|arukigatai', '歩き得る|arukiuru'], 'Desconforto físico = づらい.'),
    X.s('“É difícil perdoar isso” (moralmente):', ['許しがたい|yurushigatai', '許しづらい|yurushizurai', '許し得る|yurushiuru'], 'がたい = quase impossível.'),
    X.f('Pode acontecer com qualquer um.', '誰にでも起こり＿。', ['得る|uru', 'がたい|gatai', 'づらい|zurai'], '得る = é possível.'),
    X.s('O que significa ありえない?', ['impossível', 'existe', 'com certeza'], 'あり得ない = não pode ser.')
  ]),
  L('c25l14', 'Sem jeito: ようがない, っこない', '方', 'grammar', [
    'ようがない = não há como (não existe meio de fazer): 連絡先がわからないので、連絡しようがない.',
    'っこない = de jeito nenhum (casual, forte): そんなの、できっこない.',
    'ようがない fala da falta de meios; っこない expressa convicção forte de que algo é impossível, como わけがない.'
  ], 'しょうがない (= 仕様がない) vem desta mesma estrutura: não há jeito, paciência.', [
    ['s1', '住所がわからないから、手紙の送りようがない。', 'juusho ga wakaranai kara, tegami no okuriyou ga nai.', 'Não sei o endereço, então não tenho como mandar a carta.', ''],
    ['s2', 'ここまで壊れたら、直しようがない。', 'koko made kowaretara, naoshiyou ga nai.', 'Quebrado desse jeito, não tem conserto.', ''],
    ['s3', '何も聞いていないので、答えようがありません。', 'nani mo kiite inai node, kotaeyou ga arimasen.', 'Não me disseram nada, então não tenho como responder.', ''],
    ['s4', 'こんなに難しい問題、わかりっこないよ。', 'konna ni muzukashii mondai, wakarikkonai yo.', 'Um problema difícil assim, não tem como entender.', ''],
    ['s5', '一日で全部覚えるなんて、できっこない。', 'ichinichi de zenbu oboeru nante, dekikkonai.', 'Decorar tudo em um dia? Impossível.', ''],
    ['s6', '終わったことは、しょうがない。', 'owatta koto wa, shou ga nai.', 'O que passou, passou. Não tem jeito.', '']
  ], [
    ['あの時の気持ちは、言葉では表しようがない。', 'ano toki no kimochi wa, kotoba de wa arawashiyou ga nai.', 'O que senti naquela hora não dá para expressar em palavras.']
  ], [
    X.f('Não sei o número, então não tenho como ligar.', '番号を知らないから、電話し＿。', ['ようがない|you ga nai', 'っこない|kkonai', 'かねない|kanenai'], 'Falta de meios = ようがない.'),
    X.f('Ele não vai vir, de jeito nenhum! (casual)', 'あいつが来＿よ。', ['っこない|kkonai', 'ようがない|you ga nai', 'がたい|gatai'], 'っこない = de jeito nenhum.'),
    X.s('De onde vem しょうがない?', ['de 仕様がない (não há meio)', 'de 正直ない', 'de 少々ない'], 'しよう (meio) + がない.'),
    X.s('Qual é casual e forte?', ['っこない|kkonai', 'ようがない|you ga nai', 'かねる|kaneru'], 'っこない é fala casual.')
  ]),
  L('c25l15', 'Assim que, depende: 次第', '次', 'grammar', [
    'raiz ます + 次第 = assim que (e então farei algo): 準備ができ次第、出発します. É formal, comum em avisos e negócios.',
    'substantivo + 次第だ = depende de: 合格できるかどうかは、努力次第だ.',
    '次第で = dependendo de: 天気次第で、予定を変える.'
  ], 'Diferente de たらすぐ, 次第 não serve para o passado nem para fatos que já aconteceram.', [
    ['s1', '資料が届き次第、ご連絡いたします。', 'shiryou ga todoki shidai, gorenraku itashimasu.', 'Assim que o material chegar, entraremos em contato.', ''],
    ['s2', '雨が止み次第、試合を再開します。', 'ame ga yami shidai, shiai o saikai shimasu.', 'Assim que a chuva parar, retomaremos a partida.', ''],
    ['s3', '結果がわかり次第、お知らせします。', 'kekka ga wakari shidai, oshirase shimasu.', 'Assim que soubermos o resultado, avisaremos.', ''],
    ['s4', '成功するかどうかは、あなた次第です。', 'seikou suru ka dou ka wa, anata shidai desu.', 'Se vai dar certo ou não, depende de você.', ''],
    ['s5', '天気次第で、行き先を決めよう。', 'tenki shidai de, ikisaki o kimeyou.', 'Vamos decidir o destino dependendo do tempo.', ''],
    ['s6', '人生は考え方次第だ。', 'jinsei wa kangaekata shidai da.', 'A vida depende do modo de pensar.', '']
  ], [
    ['到着し次第、ホテルに荷物を預けてください。', 'touchaku shi shidai, hoteru ni nimotsu o azukete kudasai.', 'Assim que chegar, deixe a bagagem no hotel.']
  ], [
    X.f('Assim que terminar, me avise.', '終わり＿、知らせてください。', ['次第|shidai', '上で|ue de', 'ものの|mono no'], 'raiz + 次第 = assim que.'),
    X.f('O preço depende do tamanho.', '値段はサイズ＿です。', ['次第|shidai', '限り|kagiri', '以上|ijou'], 'substantivo + 次第 = depende de.'),
    X.s('Por que 着き次第、電話しました está errado?', ['次第 não serve para o passado', 'Falta だ', '着く não tem raiz'], 'Use 着いてすぐ電話した.'),
    X.o('Assim que estiver pronto, partimos.', ['準備が|junbi ga', 'でき次第、|deki shidai,', '出発します|shuppatsu shimasu'], ['できた次第|dekita shidai'], 'Raiz ます + 次第.')
  ]),
  L('c25l16', 'Mesmo que seja: にしても, にせよ, にしろ', '仮', 'grammar', [
    'にしても = mesmo que, ainda que (aceita o fato, mas comenta): 忙しいにしても、連絡ぐらいしてほしい.',
    'にせよ / にしろ = seja como for, em qualquer caso (mais formal): いずれにせよ, どちらにしろ.',
    'AにしろBにしろ = seja A ou B: 行くにしろ行かないにしろ、早く決めて.'
  ], 'いずれにせよ / いずれにしても (de qualquer forma) são conectores muito usados em reuniões e textos.', [
    ['s1', '遅れるにしても、連絡ぐらいしてよ。', 'okureru ni shite mo, renraku gurai shite yo.', 'Mesmo que vá se atrasar, pelo menos avise.', ''],
    ['s2', '冗談にしても、言いすぎだ。', 'joudan ni shite mo, iisugi da.', 'Mesmo sendo piada, você passou dos limites.', ''],
    ['s3', 'いずれにせよ、明日までに決めなければならない。', 'izure ni seyo, ashita made ni kimenakereba naranai.', 'De qualquer forma, temos que decidir até amanhã.', ''],
    ['s4', '賛成するにしろ反対するにしろ、理由を説明してください。', 'sansei suru ni shiro hantai suru ni shiro, riyuu o setsumei shite kudasai.', 'Seja a favor ou contra, explique o motivo.', ''],
    ['s5', 'どちらにしても、結果は同じだ。', 'dochira ni shite mo, kekka wa onaji da.', 'De um jeito ou de outro, o resultado é o mesmo.', ''],
    ['s6', '何をするにせよ、健康が一番だ。', 'nani o suru ni seyo, kenkou ga ichiban da.', 'Faça o que fizer, a saúde vem em primeiro lugar.', '']
  ], [
    ['たとえ忙しいにしても、家族との時間は大切にしたい。', 'tatoe isogashii ni shite mo, kazoku to no jikan wa taisetsu ni shitai.', 'Mesmo que esteja ocupado, quero valorizar o tempo com a família.']
  ], [
    X.f('De qualquer forma, vamos começar.', 'いずれに＿、始めましょう。', ['せよ|seyo', 'して|shite', 'しろ|shiro'], 'いずれにせよ = de qualquer forma.'),
    X.s('“Seja trem ou ônibus, leva uma hora.”', ['電車にしろバスにしろ|densha ni shiro basu ni shiro', '電車にしてバスにして|densha ni shite basu ni shite', '電車ならバスなら|densha nara basu nara'], 'AにしろBにしろ.'),
    X.f('Mesmo sendo brincadeira, foi cruel.', '冗談＿、ひどい。', ['にしても|ni shite mo', 'からこそ|kara koso', '次第|shidai'], 'にしても = mesmo sendo.'),
    X.s('Qual é o conector mais formal?', ['いずれにせよ|izure ni seyo', 'とにかく|tonikaku', 'まあいいや|maa ii ya'], 'にせよ = escrito/formal.')
  ]),
  L('c25l17', 'Sentimentos intensos: てたまらない, てならない, てしょうがない', '堪', 'grammar', [
    'てたまらない = insuportavelmente, morrendo de (sentimento ou sensação física forte): 暑くてたまらない. 会いたくてたまらない.',
    'てしょうがない (てしかたがない) = não consigo evitar, muito (mais falado): 眠くてしょうがない.',
    'てならない = não consigo deixar de (sentimento espontâneo, mais escrito): 将来が不安でならない. Muito usado com 気がする, 思う: 〜ような気がしてならない.'
  ], 'Estas formas só valem para os SEUS sentimentos. Para os de outra pessoa, acrescente らしい ou ようだ.', [
    ['s1', '今日は暑くてたまらない。', 'kyou wa atsukute tamaranai.', 'Hoje está um calor insuportável.', ''],
    ['s2', '家族に会いたくてたまらない。', 'kazoku ni aitakute tamaranai.', 'Estou morrendo de saudade da família.', ''],
    ['s3', '昨日寝ていないので、眠くてしょうがない。', 'kinou nete inai node, nemukute shou ga nai.', 'Não dormi ontem, então estou morrendo de sono.', ''],
    ['s4', '試験の結果が気になってしょうがない。', 'shiken no kekka ga ki ni natte shou ga nai.', 'Não consigo parar de pensar no resultado da prova.', ''],
    ['s5', '子供の将来が心配でならない。', 'kodomo no shourai ga shinpai de naranai.', 'Não consigo deixar de me preocupar com o futuro do meu filho.', ''],
    ['s6', '何か大切なことを忘れている気がしてならない。', 'nanika taisetsu na koto o wasurete iru ki ga shite naranai.', 'Não consigo me livrar da sensação de que esqueci algo importante.', '']
  ], [
    ['合格の知らせを聞いて、うれしくてたまらなかった。', 'goukaku no shirase o kiite, ureshikute tamaranakatta.', 'Ao ouvir que passei, fiquei feliz demais.']
  ], [
    X.f('Estou com uma dor de dente insuportável.', '歯が痛くて＿。', ['たまらない|tamaranai', 'かねない|kanenai', 'ようがない|you ga nai'], 'てたまらない = insuportável.'),
    X.s('Qual é a mais escrita, ligada a sentimento espontâneo?', ['てならない|te naranai', 'てしょうがない|te shou ga nai', 'てたまらない|te tamaranai'], 'てならない = escrito.'),
    X.s('Para falar do sentimento de OUTRA pessoa:', ['彼は寂しくてたまらないようだ|kare wa sabishikute tamaranai you da', '彼は寂しくてたまらない|kare wa sabishikute tamaranai'], 'Acrescente ようだ / らしい.'),
    X.e('“Estou com fome demais.”', ['お腹が|onaka ga', 'すいてしょうがある|suite shou ga aru'], 1, 'A forma é てしょうがない.')
  ]),
  L('c25l18', 'Não só, longe disso: ばかりか, どころか', '処', 'grammar', [
    'ばかりか / ばかりでなく = não só… mas também (somando, muitas vezes em direção surpreendente): 彼は英語ばかりか、中国語も話せる.',
    'どころか = longe de, muito pelo contrário (nega a expectativa e mostra o oposto): 休むどころか、前より忙しくなった.',
    'どころではない = não é momento para: 忙しくて、旅行どころではない.'
  ], 'どころか costuma expressar surpresa ou decepção: 褒められるどころか、怒られた (longe de ser elogiado, levei bronca).', [
    ['s1', '彼女は歌ばかりか、ダンスも上手だ。', 'kanojo wa uta bakari ka, dansu mo jouzu da.', 'Ela não só canta bem, mas também dança.', ''],
    ['s2', '薬を飲んだのに、治るどころか、悪くなった。', 'kusuri o nonda noni, naoru dokoro ka, waruku natta.', 'Tomei o remédio, mas longe de melhorar, piorei.', ''],
    ['s3', '褒められるどころか、怒られてしまった。', 'homerareru dokoro ka, okorarete shimatta.', 'Longe de ser elogiado, levei bronca.', ''],
    ['s4', '試験前で、遊ぶどころではない。', 'shiken mae de, asobu dokoro de wa nai.', 'Estou às vésperas da prova, não é hora de me divertir.', ''],
    ['s5', '彼は約束を忘れたばかりか、謝りもしなかった。', 'kare wa yakusoku o wasureta bakari ka, ayamari mo shinakatta.', 'Ele não só esqueceu o compromisso, como nem pediu desculpas.', ''],
    ['s6', '貯金どころか、借金がある。', 'chokin dokoro ka, shakkin ga aru.', 'Longe de ter poupança, tenho dívidas.', '']
  ], [
    ['このアプリは便利なばかりでなく、無料で使える。', 'kono apuri wa benri na bakari de naku, muryou de tsukaeru.', 'Este aplicativo não só é prático, como é gratuito.']
  ], [
    X.f('Longe de descansar, trabalhei mais.', '休む＿、もっと働いた。', ['どころか|dokoro ka', 'ばかりか|bakari ka', 'からこそ|kara koso'], 'Oposto do esperado = どころか.'),
    X.f('Não só o japonês, mas também o coreano.', '日本語＿、韓国語も話せる。', ['ばかりか|bakari ka', 'どころか|dokoro ka', '次第|shidai'], 'Soma = ばかりか.'),
    X.s('O que significa 旅行どころではない?', ['não é momento para viajar', 'a viagem foi ótima', 'não sei onde viajar'], 'どころではない = não é hora para.'),
    X.s('“Longe de ser elogiado, levei bronca” expressa:', ['decepção e contraste', 'soma de coisas boas', 'condição'], 'どころか = o oposto.')
  ]),
  L('c25l19', 'Contraste: 反面, 一方で', '反', 'grammar', [
    '反面 = por outro lado (duas faces da MESMA coisa): この仕事は給料がいい反面、休みが少ない.',
    '一方(で) = por outro lado, enquanto (pode comparar coisas diferentes): 都会は便利な一方で、自然が少ない.',
    'Ambos são comuns em redações e textos de opinião para apresentar vantagens e desvantagens.'
  ], 'Numa redação N2, a estrutura clássica é: AはBという利点がある反面、Cという問題もある.', [
    ['s1', 'スマホは便利な反面、依存しやすい。', 'sumaho wa benri na hanmen, izon shiyasui.', 'O smartphone é prático, mas por outro lado vicia fácil.', ''],
    ['s2', '一人暮らしは自由な反面、寂しいこともある。', 'hitorigurashi wa jiyuu na hanmen, sabishii koto mo aru.', 'Morar sozinho dá liberdade, mas às vezes é solitário.', ''],
    ['s3', '兄は社交的な一方で、弟は内気だ。', 'ani wa shakouteki na ippou de, otouto wa uchiki da.', 'Enquanto o irmão mais velho é sociável, o mais novo é tímido.', ''],
    ['s4', '都市の人口が増える一方で、地方は過疎化が進んでいる。', 'toshi no jinkou ga fueru ippou de, chihou wa kasoka ga susunde iru.', 'Enquanto a população das cidades aumenta, o interior se esvazia.', ''],
    ['s5', '彼は厳しい反面、優しいところもある。', 'kare wa kibishii hanmen, yasashii tokoro mo aru.', 'Ele é rígido, mas também tem seu lado gentil.', ''],
    ['s6', '技術が発展する一方で、新しい問題も生まれている。', 'gijutsu ga hatten suru ippou de, atarashii mondai mo umarete iru.', 'Enquanto a tecnologia avança, surgem também novos problemas.', '']
  ], [
    ['ネットで買い物ができるのは楽な反面、つい買いすぎてしまう。', 'netto de kaimono ga dekiru no wa raku na hanmen, tsui kaisugite shimau.', 'Comprar pela internet é fácil, mas por outro lado a gente acaba comprando demais.']
  ], [
    X.f('O trabalho é interessante, mas por outro lado é cansativo.', '仕事は面白い＿、疲れる。', ['反面|hanmen', 'どころか|dokoro ka', 'ばかりか|bakari ka'], '反面 = duas faces da mesma coisa.'),
    X.s('Comparando duas coisas diferentes (cidade × interior):', ['一方で|ippou de', '反面|hanmen'], '一方で compara coisas diferentes.'),
    X.e('“É conveniente, mas caro.”', ['便利|benri', '反面、|hanmen,', '高い|takai'], 0, 'Adjetivo な: 便利な反面.'),
    X.s('Onde estas formas são mais comuns?', ['Redações e textos de opinião', 'Mensagens de texto', 'Mangás de ação'], 'Estilo de argumentação.')
  ]),
  L('c25l20', 'Sem distinção: を問わず, にかかわらず, をもとに', '問', 'grammar', [
    'を問わず = sem distinção de, independente de: 年齢を問わず、誰でも参加できます.',
    'にかかわらず = independentemente de (muitas vezes com pares opostos): 天気にかかわらず, 経験の有無にかかわらず.',
    'をもとに(して) = com base em, a partir de (material de origem): 実話をもとにした映画.'
  ], 'Em anúncios de emprego: 経験不問 (experiência não exigida) e 年齢不問 (qualquer idade).', [
    ['s1', 'このイベントは、年齢を問わず参加できます。', 'kono ibento wa, nenrei o towazu sanka dekimasu.', 'Este evento é aberto a qualquer idade.', ''],
    ['s2', '経験の有無を問わず、応募を歓迎します。', 'keiken no umu o towazu, oubo o kangei shimasu.', 'Aceitamos candidaturas com ou sem experiência.', ''],
    ['s3', '天候にかかわらず、試合は行います。', 'tenkou ni kakawarazu, shiai wa okonaimasu.', 'O jogo será realizado independentemente do tempo.', ''],
    ['s4', '参加するしないにかかわらず、連絡をください。', 'sanka suru shinai ni kakawarazu, renraku o kudasai.', 'Participando ou não, entre em contato.', ''],
    ['s5', 'この小説は、作者の体験をもとに書かれた。', 'kono shousetsu wa, sakusha no taiken o moto ni kakareta.', 'Este romance foi escrito com base nas experiências do autor.', ''],
    ['s6', 'アンケートをもとにして、新商品を開発した。', 'ankeeto o moto ni shite, shinshouhin o kaihatsu shita.', 'Desenvolvemos o produto novo a partir da pesquisa.', '']
  ], [
    ['この店は季節を問わず、いつも混んでいる。', 'kono mise wa kisetsu o towazu, itsumo konde iru.', 'Esta loja está sempre cheia, em qualquer estação.']
  ], [
    X.f('Aberto a homens e mulheres.', '男女を＿参加できる。', ['問わず|towazu', 'もとに|moto ni', '中心に|chuushin ni'], 'を問わず = sem distinção de.'),
    X.f('Um filme baseado num mangá.', '漫画を＿した映画', ['もとに|moto ni', '問わず|towazu', 'かかわらず|kakawarazu'], 'をもとに = a partir de.'),
    X.s('Num anúncio de emprego, 経験不問 significa:', ['experiência não exigida', 'experiência obrigatória', 'pergunte sobre experiência'], '不問 = não se pergunta.'),
    X.o('O evento acontece independentemente do tempo.', ['天気に|tenki ni', 'かかわらず、|kakawarazu,', '開催します|kaisai shimasu'], ['問わず|towazu'], 'にかかわらず = independentemente.')
  ])
  );
})();
