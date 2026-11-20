/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N4): Gramática N4 (c16)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c16', emblem: '法', title: 'Gramática N4', jp: 'ぶんぽう', stage: 'ini', jlpt: 'N4',
    desc: 'Opiniões, probabilidade, planos, condicionais, passiva, causativa, favores, orações que descrevem substantivos e finalidade.',
    requires: ['c13', 'c12'], reqWhy: 'A gramática N4 usa as conjugações e as partículas dessas alas.'
  });
  c.lessons.push(
  L('c16l1', 'Opinar e citar: 〜と思う, 〜と言う', '思', 'grammar', [
    '〜と思う = acho que ~. Antes de と思う vem a forma simples (casual): 明日は雨が降ると思います. Com substantivo e adjetivo な, use だ: 便利だと思う.',
    'Para opinião negativa, o japonês prefere negar a frase de dentro: 高くないと思う (acho que não é caro), e não 高いと思わない.',
    '〜と言う cita o que alguém disse: 田中さんは来ないと言っていました (o Tanaka disse que não vem). Com citação exata, use 「」: 「行こう」と言った.'
  ], 'と思っている (no ている) indica uma opinião que a pessoa mantém, e é o jeito de falar da opinião de outra pessoa: 彼はそう思っている.', [
    ['s1', '明日は雨が降ると思います。', 'ashita wa ame ga furu to omoimasu.', 'Acho que amanhã vai chover.', 'Forma simples + と思います.'],
    ['s2', 'この店は便利だと思う。', 'kono mise wa benri da to omou.', 'Acho que esta loja é prática.', 'Adjetivo な + だ + と思う.'],
    ['s3', 'あの映画はあまり面白くないと思います。', 'ano eiga wa amari omoshirokunai to omoimasu.', 'Acho que aquele filme não é muito interessante.', 'Nega-se a frase de dentro.'],
    ['s4', '田中さんは今日来ないと言っていました。', 'tanaka-san wa kyou konai to itte imashita.', 'O Tanaka disse que hoje não vem.', ''],
    ['s5', '母に「早く帰ってきて」と言われた。', 'haha ni "hayaku kaette kite" to iwareta.', 'Minha mãe me disse: “Volte cedo”.', 'Citação direta com 「」.'],
    ['s6', 'これは日本語で何と言いますか。', 'kore wa nihongo de nan to iimasu ka.', 'Como se diz isto em japonês?', '何と言う = como se diz.']
  ], [
    ['彼女は来年留学すると言っていたけど、本当かな。', 'kanojo wa rainen ryuugaku suru to itte ita kedo, hontou ka na.', 'Ela disse que vai fazer intercâmbio ano que vem, mas será verdade?']
  ], [
    X.f('Acho que ele é estudante.', '彼は学生＿と思います。', ['だ|da', 'です|desu', '(nada)'], 'Substantivo + だ + と思う.'),
    X.s('Como dizer “Acho que não vai chover” de forma natural?', ['雨は降らないと思う|ame wa furanai to omou', '雨は降ると思わない|ame wa furu to omowanai', '雨は降らないと思わない|ame wa furanai to omowanai'], 'O japonês prefere negar a frase de dentro.'),
    X.s('Como perguntar “Como se diz isto em japonês?”', ['日本語で何と言いますか|nihongo de nan to iimasu ka', '日本語は何ですか|nihongo wa nan desu ka', '日本語を言いますか|nihongo o iimasu ka'], '何と言いますか = como se diz?'),
    X.e('“Acho que é caro.”', ['高いだと|takai da to', '思います|omoimasu'], 0, 'Adjetivo い não leva だ: 高いと思います.')
  ]),
  L('c16l2', 'Provavelmente e talvez: でしょう, かもしれない', '多', 'grammar', [
    'でしょう (casual: だろう) = provavelmente, com bastante certeza. Aparece muito na previsão do tempo: 明日は晴れるでしょう.',
    'かもしれない (casual: かも) = talvez, pode ser que; certeza de uns 50%: 遅れるかもしれません.',
    'Com subida de entonação, でしょう？ / だろう？ pede confirmação: “né? não é?”. 言ったでしょう！ = eu não disse?!'
  ], 'Antes de でしょう e かもしれない, substantivos e adjetivos な ficam sem だ: 雨かもしれない, 静かでしょう.', [
    ['s1', '明日は晴れるでしょう。', 'ashita wa hareru deshou.', 'Amanhã provavelmente fará sol.', 'Previsão do tempo.'],
    ['s2', '彼はもう帰っただろう。', 'kare wa mou kaetta darou.', 'Ele provavelmente já foi embora.', 'Casual, mais masculino.'],
    ['s3', '少し遅れるかもしれません。', 'sukoshi okureru kamoshiremasen.', 'Talvez eu me atrase um pouco.', ''],
    ['s4', 'それ、本当かも。', 'sore, hontou kamo.', 'Talvez seja verdade.', 'Casual: かも.'],
    ['s5', 'だから言ったでしょう！', 'dakara itta deshou!', 'Eu não te disse?!', 'Pedindo confirmação com irritação.'],
    ['s6', 'この問題は難しいだろうと思った。', 'kono mondai wa muzukashii darou to omotta.', 'Imaginei que este problema seria difícil.', '']
  ], [
    ['もしかしたら、彼女はもう知っているかもしれない。', 'moshikashitara, kanojo wa mou shitte iru kamoshirenai.', 'Pode ser que ela já saiba.']
  ], [
    X.s('Qual expressa MAIS certeza?', ['でしょう|deshou', 'かもしれない|kamoshirenai', 'かも|kamo'], 'でしょう = provavelmente; かもしれない = talvez.'),
    X.f('Talvez chova.', '雨＿＿＿＿＿＿。', ['かもしれない|kamoshirenai', 'だかもしれない|da kamoshirenai', 'のかもしれる|no kamoshireru'], 'Substantivo + かもしれない, sem だ.'),
    X.s('Previsão: 午後から雨が降るでしょう. Significa…', ['Provavelmente vai chover a partir da tarde.', 'Choveu à tarde.', 'Talvez não chova.'], 'でしょう: previsão com bastante certeza.'),
    X.o('Talvez eu me atrase um pouco.', ['少し|sukoshi', '遅れる|okureru', 'かもしれません|kamoshiremasen'], ['遅れて|okurete'], 'Forma simples + かもしれません.')
  ]),
  L('c16l3', 'Planos e intenções: つもり, 予定', '予', 'grammar', [
    '〜つもりだ = pretendo, é minha intenção: 来年日本に行くつもりです. Negativo: 行かないつもり (pretendo não ir) ou 行くつもりはない (não tenho intenção nenhuma, mais forte).',
    '〜予定だ = está programado, é o plano marcado: 会議は三時に始まる予定です. Mais objetivo que つもり.',
    'Com o passado, つもり vira “achei que tinha feito”: 鍵をかけたつもりだった (eu achava que tinha trancado).'
  ], 'Use つもり para a sua intenção e 予定 para compromissos agendados. Não use つもり para perguntar a um superior sobre os planos dele: soa direto demais.', [
    ['s1', '来年、日本に行くつもりです。', 'rainen, nihon ni iku tsumori desu.', 'Pretendo ir ao Japão no ano que vem.', ''],
    ['s2', '今日は何も買わないつもりだ。', 'kyou wa nani mo kawanai tsumori da.', 'Hoje pretendo não comprar nada.', ''],
    ['s3', '結婚するつもりはありません。', 'kekkon suru tsumori wa arimasen.', 'Não tenho a menor intenção de me casar.', 'Mais forte.'],
    ['s4', '会議は三時に始まる予定です。', 'kaigi wa sanji ni hajimaru yotei desu.', 'A reunião está marcada para começar às três.', ''],
    ['s5', '週末の予定は？', 'shuumatsu no yotei wa?', 'Quais são os planos para o fim de semana?', ''],
    ['s6', '鍵をかけたつもりだったのに…。', 'kagi o kaketa tsumori datta noni….', 'Eu achava que tinha trancado…', 'た + つもり = achava que tinha feito.']
  ], [
    ['夏休みは国に帰る予定です。', 'natsuyasumi wa kuni ni kaeru yotei desu.', 'Nas férias de verão está programado eu voltar ao meu país.']
  ], [
    X.s('O voo está marcado para as 10h. Qual palavra usa?', ['予定|yotei', 'つもり|tsumori', 'かもしれない|kamoshirenai'], 'Compromisso agendado: 予定.'),
    X.f('Pretendo estudar até tarde hoje.', '今日は遅くまで勉強する＿＿＿です。', ['つもり|tsumori', '予定|yotei', 'でしょう|deshou'], 'Intenção pessoal: つもり.'),
    X.s('鍵をかけたつもりだった significa…', ['Eu achava que tinha trancado.', 'Pretendo trancar.', 'Tranquei com certeza.'], 'た + つもり = achava que tinha feito.'),
    X.e('“Não tenho intenção de ir.”', ['行く|iku', 'つもりがあります|tsumori ga arimasu'], 1, 'Sem intenção: つもりはありません.')
  ]),
  L('c16l4', 'Experimentar e preparar: 〜てみる, 〜ておく', '試', 'grammar', [
    '〜てみる = fazer para ver como é, experimentar: 食べてみる (provar), 着てみる (provar uma roupa), やってみる (tentar).',
    '〜ておく = fazer com antecedência, como preparação, ou deixar como está: 予約しておく (reservar antes), 窓を開けておく (deixar a janela aberta).',
    'Na fala, ておく vira とく: 買っとく, やっとく. てみる não contrai.'
  ], 'やってみる! (vou tentar!) é a resposta clássica de personagens determinados.', [
    ['s1', 'このラーメン、食べてみて！', 'kono raamen, tabete mite!', 'Prova este lámen!', ''],
    ['s2', '難しいけど、やってみます。', 'muzukashii kedo, yatte mimasu.', 'É difícil, mas vou tentar.', ''],
    ['s3', '日本の温泉に入ってみたい。', 'nihon no onsen ni haitte mitai.', 'Quero experimentar entrar numa fonte termal japonesa.', 'てみたい = quero experimentar.'],
    ['s4', 'レストランを予約しておきます。', 'resutoran o yoyaku shite okimasu.', 'Vou reservar o restaurante com antecedência.', ''],
    ['s5', '窓を開けておいてください。', 'mado o akete oite kudasai.', 'Deixe a janela aberta, por favor.', ''],
    ['s6', 'ビール、冷やしとくね。', 'biiru, hiyashitoku ne.', 'Vou deixar a cerveja gelando, tá?', 'Casual: ておく → とく.']
  ], [
    ['旅行の前に、ホテルの場所を調べておいた。', 'ryokou no mae ni, hoteru no basho o shirabete oita.', 'Antes da viagem, pesquisei onde ficava o hotel.']
  ], [
    X.f('Vou experimentar esta roupa.', 'この服、着て＿＿＿。', ['みる|miru', 'おく|oku', 'しまう|shimau'], 'てみる = experimentar.'),
    X.f('Vou comprar as bebidas antes da festa.', 'パーティーの前に飲み物を買って＿＿＿。', ['おく|oku', 'みる|miru', 'いる|iru'], 'Preparação: ておく.'),
    X.s('買っとく é a forma casual de…', ['買っておく|katte oku', '買ってみる|katte miru', '買ってしまう|katte shimau'], 'ておく → とく.'),
    X.o('É difícil, mas vou tentar.', ['難しいけど、|muzukashii kedo,', 'やって|yatte', 'みます|mimasu'], ['おきます|okimasu'], 'てみる = tentar.')
  ]),
  L('c16l5', 'Acabou acontecendo: 〜てしまう', '終', 'grammar', [
    '〜てしまう tem dois sentidos: terminar algo por completo (全部読んでしまった = li tudo) ou algo que aconteceu sem querer, com arrependimento (財布を忘れてしまった = acabei esquecendo a carteira).',
    'Na fala: てしまう → ちゃう, でしまう → じゃう: 忘れちゃった, 飲んじゃった. Você já viu isso em Japonês Falado.',
    'O tom de lamento é muito comum: 寝坊してしまいました (acabei perdendo a hora).'
  ], 'Ao pedir desculpas, てしまいました soa mais sincero, porque mostra que foi sem querer.', [
    ['s1', '宿題を全部やってしまった。', 'shukudai o zenbu yatte shimatta.', 'Terminei toda a lição de casa.', 'Conclusão.'],
    ['s2', '電車に傘を忘れてしまいました。', 'densha ni kasa o wasurete shimaimashita.', 'Acabei esquecendo o guarda-chuva no trem.', 'Lamento.'],
    ['s3', '寝坊しちゃった！', 'nebou shichatta!', 'Perdi a hora!', 'Casual.'],
    ['s4', 'ケーキ、全部食べちゃった。', 'keeki, zenbu tabechatta.', 'Comi o bolo inteiro (ops).', ''],
    ['s5', 'お酒を飲みすぎてしまいました。', 'osake o nomisugite shimaimashita.', 'Acabei bebendo demais.', ''],
    ['s6', '大事なデータが消えてしまった。', 'daiji na deeta ga kiete shimatta.', 'Os dados importantes se apagaram.', '']
  ], [
    ['遅くなってしまって、本当にすみません。', 'osoku natte shimatte, hontou ni sumimasen.', 'Desculpe mesmo por ter me atrasado.']
  ], [
    X.s('財布を落としちゃった expressa…', ['Arrependimento: perdi a carteira sem querer.', 'Uma intenção de deixar a carteira.', 'Um pedido para guardar a carteira.'], 'ちゃう = てしまう, com tom de lamento.'),
    X.f('Bebi tudo (casual).', '全部飲＿＿＿＿。', ['んじゃった|njatta', 'んちゃった|nchatta', 'みちゃった|michatta'], 'でしまう → じゃう: 飲んじゃった.'),
    X.f('Acabei esquecendo o nome dele.', '彼の名前を忘れて＿＿＿＿＿。', ['しまいました|shimaimashita', 'みました|mimashita', 'おきました|okimashita'], 'Sem querer: てしまう.'),
    X.e('“Perdi a hora!” (casual)', ['寝坊|nebou', 'しじゃった|shijatta'], 1, 'する → しちゃった.')
  ]),
  L('c16l6', 'Se / quando: 〜たら', '若', 'grammar', [
    '〜たら é o condicional mais versátil. Forma-se com o passado + ら: 行ったら, 食べたら, 安かったら, 雨だったら.',
    'Pode ser “se”: 雨が降ったら、行きません (se chover, não vou). Ou “quando, depois que”: 駅に着いたら、電話してください (quando chegar à estação, me ligue).',
    'Com o passado no final, mostra uma descoberta: 家に帰ったら、猫がいた (quando cheguei em casa, tinha um gato).'
  ], 'Na dúvida entre os condicionais, たら quase sempre funciona na conversa.', [
    ['s1', '雨が降ったら、家にいます。', 'ame ga futtara, ie ni imasu.', 'Se chover, fico em casa.', ''],
    ['s2', '駅に着いたら、電話してください。', 'eki ni tsuitara, denwa shite kudasai.', 'Quando chegar à estação, me ligue.', 'Quando / depois que.'],
    ['s3', '安かったら、買います。', 'yasukattara, kaimasu.', 'Se for barato, compro.', 'Adjetivo い: かったら.'],
    ['s4', '暇だったら、遊びに来て。', 'hima dattara, asobi ni kite.', 'Se estiver livre, vem aqui.', 'な / substantivo: だったら.'],
    ['s5', '窓を開けたら、雪が降っていた。', 'mado o aketara, yuki ga futte ita.', 'Quando abri a janela, estava nevando.', 'Descoberta.'],
    ['s6', '宝くじが当たったら、何をしたい？', 'takarakuji ga atattara, nani o shitai?', 'Se ganhasse na loteria, o que você ia querer fazer?', 'Hipótese.']
  ], [
    ['もし分からなかったら、いつでも聞いてね。', 'moshi wakaranakattara, itsudemo kiite ne.', 'Se não entender, pode perguntar a qualquer hora, tá? (もし reforça o “se”)']
  ], [
    X.f('Se estiver frio, vista o casaco.', '寒＿＿＿、コートを着てください。', ['かったら|kattara', 'いたら|itara', 'だったら|dattara'], 'Adjetivo い: かったら.'),
    X.f('Quando terminar, me avise.', '終わっ＿＿、教えてください。', ['たら|tara', 'て|te', 'ても|temo'], 'Quando / depois que: たら.'),
    X.s('家に帰ったら、母が来ていた significa…', ['Quando cheguei em casa, minha mãe estava lá.', 'Se eu voltar, minha mãe vem.', 'Minha mãe quer que eu volte.'], 'Passado no fim: descoberta.'),
    X.o('Se estiver livre, vem aqui.', ['暇|hima', 'だったら、|dattara,', '遊びに来て|asobi ni kite'], ['かったら|kattara'], 'な / substantivo + だったら.')
  ]),
  L('c16l7', 'Se: 〜ば (condição necessária)', '条', 'grammar', [
    '〜ば destaca a condição: “se (e só se) isso acontecer, aquilo acontece”. Verbos: u → e + ば: 行けば, 食べれば, すれば, 来れば (くれば).',
    'Adjetivos い: い → ければ: 安ければ. いい → よければ. Substantivo/な: であれば ou なら.',
    'Expressões muito usadas: 〜ばいい (basta ~ / é só ~): どうすればいいですか (o que devo fazer?). 〜ばよかった = devia ter feito (arrependimento).'
  ], 'よければ = se quiser / se estiver tudo bem: よければ、一緒にどうですか.', [
    ['s1', '急げば、間に合います。', 'isogeba, maniaimasu.', 'Se correr, dá tempo.', ''],
    ['s2', '安ければ、買います。', 'yasukereba, kaimasu.', 'Se for barato, compro.', ''],
    ['s3', 'どうすればいいですか。', 'dou sureba ii desu ka.', 'O que eu devo fazer?', '〜ばいい = basta ~.'],
    ['s4', 'このボタンを押せばいいです。', 'kono botan o oseba ii desu.', 'É só apertar este botão.', ''],
    ['s5', 'もっと勉強すればよかった。', 'motto benkyou sureba yokatta.', 'Eu devia ter estudado mais.', 'Arrependimento.'],
    ['s6', 'よければ、一緒に行きませんか。', 'yokereba, issho ni ikimasen ka.', 'Se quiser, não quer ir junto?', 'いい → よければ.']
  ], [
    ['練習すればするほど、上手になる。', 'renshuu sureba suru hodo, jouzu ni naru.', 'Quanto mais se pratica, melhor se fica. (〜ば〜ほど)']
  ], [
    X.s('Qual é a forma ば de 行く?', ['行けば|ikeba', '行かば|ikaba', '行くば|ikuba'], 'u → e + ば.'),
    X.f('Se for bom, compro.', '＿＿＿＿、買います。', ['よければ|yokereba', 'いければ|ikereba', 'いいば|iiba'], 'いい → よければ.'),
    X.s('Como perguntar “O que devo fazer?”', ['どうすればいいですか|dou sureba ii desu ka', 'どうしたらだめですか|dou shitara dame desu ka', '何をしますか|nani o shimasu ka'], '〜ばいいですか = o que é bom eu fazer?'),
    X.o('Eu devia ter estudado mais.', ['もっと|motto', '勉強すれば|benkyou sureba', 'よかった|yokatta'], ['よければ|yokereba'], '〜ばよかった = arrependimento.')
  ]),
  L('c16l8', 'Sempre que e “se é assim”: 〜と e 〜なら', '然', 'grammar', [
    '〜と (com forma de dicionário) = sempre que / naturalmente: 春になると、桜が咲く (quando chega a primavera, as cerejeiras florescem). Usado para coisas automáticas, máquinas, caminhos.',
    'Com と, a segunda parte NÃO pode ser pedido, convite ou vontade: ✕ 駅に着くと、電話してください. Use たら.',
    '〜なら = “se é assim / se for o caso de ~”, reagindo ao que o outro disse: 京都に行くなら、金閣寺がおすすめです (se você vai a Kyoto, recomendo o Kinkakuji).'
  ], 'Direções usam と: この道をまっすぐ行くと、駅があります (seguindo reto por esta rua, tem a estação).', [
    ['s1', '春になると、桜が咲きます。', 'haru ni naru to, sakura ga sakimasu.', 'Quando chega a primavera, as cerejeiras florescem.', 'Natural, sempre.'],
    ['s2', 'このボタンを押すと、お釣りが出ます。', 'kono botan o osu to, otsuri ga demasu.', 'Apertando este botão, sai o troco.', 'Máquina.'],
    ['s3', 'まっすぐ行くと、右に駅があります。', 'massugu iku to, migi ni eki ga arimasu.', 'Seguindo reto, a estação fica à direita.', 'Direções.'],
    ['s4', '京都に行くなら、秋がいいですよ。', 'kyouto ni iku nara, aki ga ii desu yo.', 'Se é para ir a Kyoto, o outono é ótimo.', 'Reação/conselho.'],
    ['s5', '疲れているなら、休んだほうがいい。', 'tsukarete iru nara, yasunda hou ga ii.', 'Se você está cansado, é melhor descansar.', ''],
    ['s6', 'ラーメンなら、あの店が一番だよ。', 'raamen nara, ano mise ga ichiban da yo.', 'Se é lámen, aquela loja é a melhor.', 'Substantivo + なら.']
  ], [
    ['カメラを買いたいんだけど。 … カメラなら、秋葉原がいいよ。', 'kamera o kaitai n da kedo. … kamera nara, akihabara ga ii yo.', 'Queria comprar uma câmera. … Se é câmera, Akihabara é o lugar.']
  ], [
    X.s('Um amigo diz que vai ao Brasil. Você recomenda o Rio. Qual condicional usa?', ['ブラジルに行くなら|burajiru ni iku nara', 'ブラジルに行くと|burajiru ni iku to', 'ブラジルに行けば|burajiru ni ikeba'], 'Reagindo ao que o outro disse: なら.'),
    X.s('Qual frase está ERRADA?', ['駅に着くと、電話してください|eki ni tsuku to, denwa shite kudasai', '駅に着いたら、電話してください|eki ni tsuitara, denwa shite kudasai', '駅に着くと、電話がありました|eki ni tsuku to, denwa ga arimashita'], 'Com と, a segunda parte não pode ser pedido.'),
    X.f('Quando chega o inverno, neva.', '冬になる＿、雪が降ります。', ['と|to', 'なら|nara', 'ても|temo'], 'Natural, sempre: と.'),
    X.o('Se você está cansado, é melhor descansar.', ['疲れているなら、|tsukarete iru nara,', '休んだほうが|yasunda hou ga', 'いい|ii'], ['休むと|yasumu to'], '〜なら + conselho.')
  ]),
  L('c16l9', 'Passiva: 〜られる', '受', 'grammar', [
    'A passiva mostra quem SOFRE ou RECEBE a ação. Grupo 1: u → a + れる: 読む → 読まれる, 言う → 言われる. Grupo 2: る → られる: 見られる. する → される, 来る → 来られる.',
    'Quem faz a ação leva に: 先生に褒められた (fui elogiado pelo professor).',
    'Muito japonês: a passiva do “incômodo”, quando algo afeta você negativamente: 雨に降られた (peguei chuva), 隣の人にタバコを吸われた (o vizinho fumou perto de mim, e isso me incomodou).'
  ], 'A passiva de 来る (来られる) é igual ao potencial! O contexto separa: 友達に来られた = o amigo apareceu (e me atrapalhou).', [
    ['s1', '先生に褒められました。', 'sensei ni homeraremashita.', 'Fui elogiado pelo professor.', ''],
    ['s2', '母に叱られた。', 'haha ni shikarareta.', 'Levei bronca da minha mãe.', ''],
    ['s3', '電車で足を踏まれました。', 'densha de ashi o fumaremashita.', 'Pisaram no meu pé no trem.', 'O pé é meu: passiva com objeto.'],
    ['s4', '帰りに雨に降られた。', 'kaeri ni ame ni furareta.', 'Peguei chuva na volta.', 'Passiva de incômodo.'],
    ['s5', 'この本は世界中で読まれています。', 'kono hon wa sekaijuu de yomarete imasu.', 'Este livro é lido no mundo inteiro.', 'Passiva neutra, sem agente.'],
    ['s6', '友達に秘密を言われた。', 'tomodachi ni himitsu o iwareta.', 'Meu amigo contou meu segredo (e me prejudicou).', '']
  ], [
    ['昨日の夜、赤ちゃんに泣かれて、全然寝られなかった。', 'kinou no yoru, akachan ni nakarete, zenzen nerarenakatta.', 'Ontem à noite o bebê chorou e não consegui dormir nada.']
  ], [
    X.s('Qual é a passiva de 呼ぶ (chamar)?', ['呼ばれる|yobareru', '呼べる|yoberu', '呼ばせる|yobaseru'], 'Grupo 1: u → a + れる.'),
    X.f('Fui elogiado pelo chefe.', '部長＿褒められました。', ['に|ni', 'を|o', 'が|ga'], 'Quem faz a ação na passiva: に.'),
    X.s('雨に降られた transmite…', ['Que a chuva atrapalhou você', 'Que você gosta de chuva', 'Que você fez chover'], 'Passiva de incômodo.'),
    X.e('“Pisaram no meu pé.”', ['私の足が|watashi no ashi ga', '踏まれました|fumaremashita'], 0, 'Em japonês: (私は) 足を踏まれました. A pessoa afetada é o assunto.')
  ]),
  L('c16l10', 'Causativa: fazer alguém fazer, deixar fazer', '使', 'grammar', [
    'A causativa indica que alguém faz ou deixa outra pessoa fazer algo. Grupo 1: u → a + せる: 行かせる, 飲ませる. Grupo 2: る → させる: 食べさせる. する → させる, 来る → 来させる (こさせる).',
    'Pode ser obrigar (母は弟に野菜を食べさせた = a mãe fez o irmão comer verdura) ou permitir (子供を遊ばせる = deixar a criança brincar). O contexto decide.',
    '〜させてください = deixe-me fazer, por favor. É um pedido humilde muito usado: 説明させてください, 考えさせてください.'
  ], '〜させていただきます é uma forma muito educada de anunciar o que você vai fazer: 発表させていただきます.', [
    ['s1', '母は弟に野菜を食べさせました。', 'haha wa otouto ni yasai o tabesasemashita.', 'Minha mãe fez meu irmão comer verdura.', 'Obrigação.'],
    ['s2', '子供を公園で遊ばせます。', 'kodomo o kouen de asobasemasu.', 'Deixo as crianças brincarem no parque.', 'Permissão.'],
    ['s3', '少し考えさせてください。', 'sukoshi kangaesasete kudasai.', 'Deixe-me pensar um pouco.', ''],
    ['s4', '私に払わせてください。', 'watashi ni harawasete kudasai.', 'Deixe que eu pago.', ''],
    ['s5', '先生は学生に作文を書かせた。', 'sensei wa gakusei ni sakubun o kakaseta.', 'O professor mandou os alunos escreverem uma redação.', ''],
    ['s6', '待たせて、ごめんね。', 'matasete, gomen ne.', 'Desculpa te fazer esperar.', 'Muito comum!']
  ], [
    ['それでは、始めさせていただきます。', 'sore de wa, hajimesasete itadakimasu.', 'Então, com sua licença, vou começar. (formal)']
  ], [
    X.s('Qual é a causativa de 飲む?', ['飲ませる|nomaseru', '飲まれる|nomareru', '飲める|nomeru'], 'Grupo 1: u → a + せる.'),
    X.s('Você chegou atrasado ao encontro. O que diz?', ['待たせて、ごめん|matasete, gomen', '待たれて、ごめん|matarete, gomen', '待って、ごめん|matte, gomen'], '待たせる = fazer esperar.'),
    X.f('Deixe-me pensar um pouco.', '少し考え＿＿＿ください。', ['させて|sasete', 'られて|rarete', 'て|te'], '〜させてください = deixe-me ~.'),
    X.o('Deixe que eu pago.', ['私に|watashi ni', '払わせて|harawasete', 'ください|kudasai'], ['払われて|harawarete'], 'Pedido humilde: させてください.')
  ]),
  L('c16l11', 'Favores: 〜てあげる, 〜てくれる, 〜てもらう', '恩', 'grammar', [
    'Os verbos de dar e receber também se juntam a ações, mostrando quem se beneficia: 〜てあげる (faço para alguém), 〜てくれる (alguém faz para mim), 〜てもらう (consigo que alguém faça para mim).',
    'Em japonês é natural marcar o favor. 友達が手伝ってくれた soa grato; só 友達が手伝った soa frio.',
    'Cuidado: 〜てあげる para um superior pode soar arrogante (“te fiz um favor”). Com superiores, prefira oferecer: お持ちしましょうか.'
  ], 'Pedidos: 〜てくれる？ (casual), 〜てもらえますか (educado), 〜ていただけませんか (muito educado).', [
    ['s1', '妹に宿題を教えてあげた。', 'imouto ni shukudai o oshiete ageta.', 'Ensinei a lição para minha irmã mais nova.', 'Eu faço para alguém.'],
    ['s2', '友達が引っ越しを手伝ってくれました。', 'tomodachi ga hikkoshi o tetsudatte kuremashita.', 'Meu amigo me ajudou na mudança.', 'Alguém faz para mim.'],
    ['s3', '先輩に駅まで送ってもらった。', 'senpai ni eki made okutte moratta.', 'O veterano me levou até a estação (e eu agradeço).', ''],
    ['s4', 'ちょっと窓を開けてくれる？', 'chotto mado o akete kureru?', 'Pode abrir a janela?', 'Pedido casual.'],
    ['s5', 'もう一度説明していただけませんか。', 'mou ichido setsumei shite itadakemasen ka.', 'Poderia explicar mais uma vez?', 'Muito educado.'],
    ['s6', '日本人の友達に名前を書いてもらいました。', 'nihonjin no tomodachi ni namae o kaite moraimashita.', 'Pedi para um amigo japonês escrever meu nome (e ele escreveu).', '']
  ], [
    ['母が作ってくれたお弁当は、いつもおいしい。', 'haha ga tsukutte kureta obentou wa, itsumo oishii.', 'O bentô que minha mãe faz para mim é sempre gostoso.']
  ], [
    X.f('Meu pai me comprou uma bicicleta.', '父が自転車を買って＿＿＿＿。', ['くれた|kureta', 'あげた|ageta', 'もらった|moratta'], 'Alguém faz para mim, com quem faz + が: てくれた.'),
    X.f('Pedi ao professor para corrigir minha redação.', '先生に作文を直して＿＿＿＿＿。', ['もらいました|moraimashita', 'くれました|kuremashita', 'あげました|agemashita'], 'Quem faz + に + てもらう.'),
    X.s('Qual é o pedido mais educado?', ['教えていただけませんか|oshiete itadakemasen ka', '教えてくれる？|oshiete kureru?', '教えて|oshiete'], '〜ていただけませんか é o mais educado.'),
    X.s('Por que 先生、荷物を持ってあげます soa mal?', ['Soa como se você estivesse fazendo um favor ao superior', 'Porque o verbo está errado', 'Porque falta か'], 'てあげる com superiores soa arrogante. Prefira お持ちしましょうか.')
  ]),
  L('c16l12', 'Descrevendo com frases: 昨日買った本', '修', 'grammar', [
    'Em japonês, a frase que descreve um substantivo vem ANTES dele, sem pronome relativo: 昨日買った本 = o livro que comprei ontem.',
    'O verbo fica na forma simples (dicionário, た, ない): 私が住んでいる町 (a cidade onde moro), 行かない人 (quem não vai).',
    'Dentro da descrição, o sujeito costuma usar が ou の, nunca は: 母が作った料理 / 母の作った料理 (a comida que minha mãe fez).'
  ], 'Leia de trás para frente: 日本で働いている 友達 → amigo ← que trabalha ← no Japão.', [
    ['s1', 'これは昨日買った本です。', 'kore wa kinou katta hon desu.', 'Este é o livro que comprei ontem.', ''],
    ['s2', '私が住んでいる町は静かです。', 'watashi ga sunde iru machi wa shizuka desu.', 'A cidade onde moro é tranquila.', ''],
    ['s3', '日本で働いている友達がいます。', 'nihon de hataraite iru tomodachi ga imasu.', 'Tenho um amigo que trabalha no Japão.', ''],
    ['s4', '母の作った料理が一番おいしい。', 'haha no tsukutta ryouri ga ichiban oishii.', 'A comida que minha mãe faz é a mais gostosa.', 'が → の dentro da descrição.'],
    ['s5', 'パーティーに来ない人はいますか。', 'paatii ni konai hito wa imasu ka.', 'Tem alguém que não vem à festa?', ''],
    ['s6', '眼鏡をかけている人が田中さんです。', 'megane o kakete iru hito ga tanaka-san desu.', 'A pessoa de óculos é o Tanaka.', '']
  ], [
    ['子供のころによく見ていたアニメを、今でも時々見ます。', 'kodomo no koro ni yoku mite ita anime o, ima demo tokidoki mimasu.', 'Ainda hoje às vezes assisto ao anime que eu via muito quando era criança.']
  ], [
    X.o('O filme que vi ontem foi interessante.', ['昨日|kinou', '見た|mita', '映画は|eiga wa', '面白かった|omoshirokatta'], ['見ました|mimashita'], 'A descrição (昨日見た) vem antes do substantivo.'),
    X.s('Como dizer “a pessoa que veio ontem”?', ['昨日来た人|kinou kita hito', '昨日来ました人|kinou kimashita hito', '人は昨日来た|hito wa kinou kita'], 'Forma simples antes do substantivo.'),
    X.f('O bolo que minha irmã fez.', '姉＿作ったケーキ', ['が|ga', 'は|wa', 'を|o'], 'Dentro da descrição: が ou の, nunca は.'),
    X.e('“O livro que eu li.”', ['私は|watashi wa', '読んだ|yonda', '本|hon'], 0, 'Dentro da descrição use が/の: 私が読んだ本.')
  ]),
  L('c16l13', '“O ato de”: こと e の', '事', 'grammar', [
    'Para transformar uma ação em substantivo, use こと ou の: 泳ぐこと / 泳ぐの (o ato de nadar).',
    'の é mais comum com sentimentos e percepções: 歌うのが好き (gosto de cantar), 彼が来るのを見た (vi ele chegando). こと aparece em definições e expressões fixas: 趣味は映画を見ることです, 〜ことができる.',
    '〜ことができる = conseguir, ser possível (mais formal que o potencial): ここで写真を撮ることができます.'
  ], 'Com 見る, 聞く e 待つ use sempre の: 彼が歌うのを聞いた. Com です no final de definição, こと: 夢は医者になることです.', [
    ['s1', '歌うのが好きです。', 'utau no ga suki desu.', 'Gosto de cantar.', ''],
    ['s2', '趣味は写真を撮ることです。', 'shumi wa shashin o toru koto desu.', 'Meu hobby é tirar fotos.', 'Definição: こと.'],
    ['s3', '漢字を覚えるのは大変だ。', 'kanji o oboeru no wa taihen da.', 'Decorar kanji é puxado.', ''],
    ['s4', 'ここでたばこを吸うことはできません。', 'koko de tabako o suu koto wa dekimasen.', 'Não é permitido fumar aqui.', 'ことができる: formal.'],
    ['s5', '彼が出ていくのを見ました。', 'kare ga dete iku no o mimashita.', 'Eu o vi saindo.', 'Percepção: の.'],
    ['s6', '私の夢は世界中を旅することです。', 'watashi no yume wa sekaijuu o tabi suru koto desu.', 'Meu sonho é viajar pelo mundo todo.', '']
  ], [
    ['日本語を話すことはできますが、書くのはまだ苦手です。', 'nihongo o hanasu koto wa dekimasu ga, kaku no wa mada nigate desu.', 'Consigo falar japonês, mas escrever ainda é difícil para mim.']
  ], [
    X.f('Ouvi ela cantando.', '彼女が歌う＿を聞きました。', ['の|no', 'こと|koto', 'もの|mono'], 'Com percepção (聞く, 見る): の.'),
    X.f('Meu sonho é ser médico.', '夢は医者になる＿＿です。', ['こと|koto', 'の|no', 'もの|mono'], 'Definição com です: こと.'),
    X.s('Qual frase está natural para “Gosto de ler”?', ['読むのが好きです|yomu no ga suki desu', '読むが好きです|yomu ga suki desu', '読んで好きです|yonde suki desu'], 'Verbo precisa virar substantivo: 読むの.'),
    X.o('Consigo nadar.', ['泳ぐ|oyogu', 'ことが|koto ga', 'できます|dekimasu'], ['のを|no o'], '〜ことができる = conseguir.')
  ]),
  L('c16l14', 'Mudança de hábito e decisões: ようになる, ことにする', '変', 'grammar', [
    '〜ようになる = passar a (conseguir/fazer), uma mudança gradual: 日本語が話せるようになった (passei a conseguir falar japonês).',
    '〜ことにする = decidir fazer (decisão sua): 毎日走ることにした. 〜ことになる = ficou decidido (por outros ou pelas circunstâncias): 大阪に転勤することになった.',
    '〜ようにする = esforçar-se para, ter o cuidado de: 野菜を食べるようにしている (tento sempre comer verdura).'
  ], 'ことになりました soa mais humilde para dar notícias, mesmo se a decisão foi sua: 結婚することになりました.', [
    ['s1', '日本語が少し話せるようになりました。', 'nihongo ga sukoshi hanaseru you ni narimashita.', 'Passei a conseguir falar um pouco de japonês.', ''],
    ['s2', '最近、朝早く起きるようになった。', 'saikin, asa hayaku okiru you ni natta.', 'Ultimamente passei a acordar cedo.', ''],
    ['s3', '明日からジムに通うことにしました。', 'ashita kara jimu ni kayou koto ni shimashita.', 'Decidi frequentar a academia a partir de amanhã.', 'Decisão própria.'],
    ['s4', '来月、大阪に転勤することになりました。', 'raigetsu, oosaka ni tenkin suru koto ni narimashita.', 'Ficou decidido que serei transferido para Osaka mês que vem.', ''],
    ['s5', '毎日野菜を食べるようにしています。', 'mainichi yasai o taberu you ni shite imasu.', 'Tento comer verdura todos os dias.', 'Esforço.'],
    ['s6', '遅刻しないようにしてください。', 'chikoku shinai you ni shite kudasai.', 'Tome cuidado para não se atrasar.', '']
  ], [
    ['この度、結婚することになりました。', 'kono tabi, kekkon suru koto ni narimashita.', 'Venho anunciar que vou me casar. (formal e humilde)']
  ], [
    X.s('Você resolveu sozinho parar de fumar. Qual forma usa?', ['やめることにした|yameru koto ni shita', 'やめることになった|yameru koto ni natta', 'やめるようになった|yameru you ni natta'], 'Decisão própria: ことにする.'),
    X.f('Passei a gostar de natto.', '納豆が好きになって、よく食べる＿＿＿なった。', ['ように|you ni', 'ことに|koto ni', 'ために|tame ni'], 'Mudança de hábito: ようになる.'),
    X.f('Tento dormir antes da meia-noite.', '十二時前に寝る＿＿＿しています。', ['ように|you ni', 'ことに|koto ni', 'そうに|sou ni'], 'Esforço contínuo: ようにする.'),
    X.e('A empresa decidiu transferir você. Você conta:', ['転勤することに|tenkin suru koto ni', 'しました|shimashita'], 1, 'A decisão não foi sua: ことになりました.')
  ]),
  L('c16l15', 'Ouvi dizer e parece: そうだ, らしい, みたい', '聞', 'grammar', [
    '〜そうだ (depois da forma simples) = ouvi dizer que: 明日は雨が降るそうです. É diferente do そう de aparência (降りそう)!',
    '〜らしい = parece, pelo que dizem ou pelos indícios: 彼は会社を辞めたらしい (parece que ele saiu da empresa).',
    '〜みたい (casual) / 〜ようだ (formal) = parece, pela minha impressão direta: 誰もいないみたい (parece que não tem ninguém).'
  ], 'Compare: 雨が降りそう (pela cara do céu, vai chover) × 雨が降るそうだ (ouvi dizer que vai chover).', [
    ['s1', '天気予報によると、明日は雪が降るそうです。', 'tenki yohou ni yoru to, ashita wa yuki ga furu sou desu.', 'Segundo a previsão, amanhã vai nevar.', 'Ouvi dizer: forma simples + そうだ.'],
    ['s2', '田中さんは結婚したそうですよ。', 'tanaka-san wa kekkon shita sou desu yo.', 'Dizem que o Tanaka se casou.', ''],
    ['s3', 'あの店は来月閉まるらしい。', 'ano mise wa raigetsu shimaru rashii.', 'Parece que aquela loja vai fechar mês que vem.', ''],
    ['s4', '誰もいないみたい。', 'dare mo inai mitai.', 'Parece que não tem ninguém.', 'Impressão direta.'],
    ['s5', '風邪をひいたようです。', 'kaze o hiita you desu.', 'Parece que peguei um resfriado.', 'Formal: ようだ.'],
    ['s6', '彼女はまるで子供みたいに笑った。', 'kanojo wa marude kodomo mitai ni waratta.', 'Ela riu como uma criança.', 'みたいに = como.']
  ], [
    ['ニュースによると、新しい駅ができるらしいよ。', 'nyuusu ni yoru to, atarashii eki ga dekiru rashii yo.', 'Pelo que deu no noticiário, parece que vão construir uma estação nova.']
  ], [
    X.s('A previsão do tempo disse que vai chover. Qual frase usa?', ['雨が降るそうです|ame ga furu sou desu', '雨が降りそうです|ame ga furisou desu', '雨が降るつもりです|ame ga furu tsumori desu'], 'Informação ouvida: forma simples + そうだ.'),
    X.s('Você olha o céu escuro. Qual frase usa?', ['雨が降りそうだ|ame ga furisou da', '雨が降るそうだ|ame ga furu sou da', '雨が降ったそうだ|ame ga futta sou da'], 'Pelo que você vê: radical + そう.'),
    X.f('Parece que ele não está em casa (impressão).', '彼は家にいない＿＿＿。', ['みたい|mitai', 'そう|sou', 'つもり|tsumori'], 'Impressão: みたい.'),
    X.o('Dizem que o Tanaka se casou.', ['田中さんは|tanaka-san wa', '結婚した|kekkon shita', 'そうです|sou desu'], ['結婚し|kekkon shi'], 'Forma simples + そうです = ouvi dizer.')
  ]),
  L('c16l16', 'Mas, embora e “e além disso”: けど, のに, し', '逆', 'grammar', [
    'けど (casual) / が (educado) = mas: 行きたいけど、時間がない.',
    'のに = embora, apesar de, com frustração ou surpresa: 約束したのに、来なかった (prometeu e mesmo assim não veio!).',
    '〜し lista razões, dando a ideia de “e além disso”: 安いし、おいしいし、この店が好き (é barato, é gostoso, gosto desta loja).'
  ], 'けど no final da frase deixa no ar, suavizando: 明日はちょっと…用事があるんですけど.', [
    ['s1', '行きたいけど、時間がない。', 'ikitai kedo, jikan ga nai.', 'Quero ir, mas não tenho tempo.', ''],
    ['s2', '約束したのに、彼は来なかった。', 'yakusoku shita noni, kare wa konakatta.', 'Ele prometeu e mesmo assim não veio.', 'Frustração.'],
    ['s3', '日曜日なのに、仕事に行かなきゃ。', 'nichiyoubi na noni, shigoto ni ikanakya.', 'Mesmo sendo domingo, tenho que ir trabalhar.', 'Substantivo + なのに.'],
    ['s4', 'この店は安いし、おいしいし、最高！', 'kono mise wa yasui shi, oishii shi, saikou!', 'Esta loja é barata, é gostosa… a melhor!', ''],
    ['s5', '今日は雨だし、家にいよう。', 'kyou wa ame da shi, ie ni iyou.', 'Hoje está chovendo (entre outras coisas), vamos ficar em casa.', ''],
    ['s6', 'すみません、明日はちょっと用事があるんですけど…。', 'sumimasen, ashita wa chotto youji ga aru n desu kedo….', 'Desculpe, é que amanhã tenho um compromisso…', 'けど suaviza a recusa.']
  ], [
    ['あんなに練習したのに、負けてしまった。', 'anna ni renshuu shita noni, makete shimatta.', 'Treinei tanto e mesmo assim perdi.']
  ], [
    X.f('Estudei tanto e mesmo assim reprovei!', 'あんなに勉強した＿＿、落ちた！', ['のに|noni', 'し|shi', 'から|kara'], 'Frustração: のに.'),
    X.f('É perto, é barato… vamos lá.', '近い＿、安いし、そこにしよう。', ['し|shi', 'のに|noni', 'けど|kedo'], 'Listando razões: し.'),
    X.s('Qual frase suaviza uma recusa?', ['ちょっと用事があるんですけど…|chotto youji ga aru n desu kedo…', '用事がある！|youji ga aru!', '行かない。|ikanai.'], 'けど no final deixa a frase aberta.'),
    X.e('“Mesmo sendo feriado, trabalhei.”', ['休みのに|yasumi noni', '働いた|hataraita'], 0, 'Substantivo + なのに: 休みなのに.')
  ]),
  L('c16l17', 'Para: ために e ように', '為', 'grammar', [
    '〜ために = para, com o objetivo de (ação que eu controlo): 日本に行くために、お金を貯めている.',
    '〜ように = para que (resultado que não depende só da vontade, ou com potencial/negativo): 忘れないように、メモする (anoto para não esquecer). 聞こえるように、大きい声で話す.',
    'ために também indica causa em textos formais: 事故のために、電車が遅れた (o trem atrasou por causa de um acidente).'
  ], 'Regra prática: verbo de vontade → ために. Potencial, negativo, verbos “involuntários” (分かる, 見える) → ように.', [
    ['s1', '日本に留学するために、お金を貯めています。', 'nihon ni ryuugaku suru tame ni, okane o tamete imasu.', 'Estou juntando dinheiro para estudar no Japão.', ''],
    ['s2', '健康のために、毎朝走っています。', 'kenkou no tame ni, maiasa hashitte imasu.', 'Corro toda manhã pela saúde.', 'Substantivo + のために.'],
    ['s3', '忘れないように、メモしておきます。', 'wasurenai you ni, memo shite okimasu.', 'Vou anotar para não esquecer.', 'Negativo: ように.'],
    ['s4', '後ろの人にも聞こえるように、大きい声で話してください。', 'ushiro no hito ni mo kikoeru you ni, ookii koe de hanashite kudasai.', 'Fale alto para que o pessoal do fundo também ouça.', ''],
    ['s5', '風邪をひかないように、気をつけてね。', 'kaze o hikanai you ni, ki o tsukete ne.', 'Se cuida para não pegar resfriado.', ''],
    ['s6', '事故のために、電車が遅れています。', 'jiko no tame ni, densha ga okurete imasu.', 'Por causa de um acidente, os trens estão atrasados.', 'Causa (formal).']
  ], [
    ['子供でも分かるように、やさしい言葉で説明した。', 'kodomo demo wakaru you ni, yasashii kotoba de setsumei shita.', 'Expliquei com palavras simples para que até uma criança entendesse.']
  ], [
    X.f('Anoto para não esquecer.', '忘れない＿＿＿、メモします。', ['ように|you ni', 'ために|tame ni', 'ことに|koto ni'], 'Negativo: ように.'),
    X.f('Trabalho para comprar um carro.', '車を買う＿＿＿、働いています。', ['ために|tame ni', 'ように|you ni', 'のに|noni'], 'Objetivo controlado: ために.'),
    X.s('事故のために電車が遅れた. Aqui ために indica…', ['causa', 'finalidade', 'contraste'], 'Em textos formais, ために também indica causa.'),
    X.o('Corro pela saúde.', ['健康の|kenkou no', 'ために、|tame ni,', '走っています|hashitte imasu'], ['ように|you ni'], 'Substantivo + のために.')
  ]),
  L('c16l18', 'Conselhos: ほうがいい, なければならない, なくてもいい', '勧', 'grammar', [
    '〜たほうがいい = é melhor fazer (conselho): 早く寝たほうがいいよ. Para “é melhor não”: 〜ないほうがいい.',
    '〜なければならない / 〜なくてはいけない = ter que (obrigação). Na fala: 〜なきゃ, 〜なくちゃ.',
    '〜なくてもいい = não precisa. 〜てもかまわない = não tem problema se (mais formal que てもいい).'
  ], 'O conselho usa o PASSADO (た) mesmo falando do futuro: 薬を飲んだほうがいい.', [
    ['s1', '熱があるなら、病院に行ったほうがいいよ。', 'netsu ga aru nara, byouin ni itta hou ga ii yo.', 'Se está com febre, é melhor ir ao hospital.', 'た + ほうがいい.'],
    ['s2', '夜遅く一人で歩かないほうがいい。', 'yoru osoku hitori de arukanai hou ga ii.', 'É melhor não andar sozinho tarde da noite.', 'ない + ほうがいい.'],
    ['s3', 'レポートは金曜日までに出さなければなりません。', 'repooto wa kin\'youbi made ni dasanakereba narimasen.', 'Tenho que entregar o relatório até sexta.', ''],
    ['s4', '明日は早く起きなくちゃ。', 'ashita wa hayaku okinakucha.', 'Amanhã tenho que acordar cedo.', 'Casual.'],
    ['s5', '全部食べなくてもいいですよ。', 'zenbu tabenakute mo ii desu yo.', 'Não precisa comer tudo.', ''],
    ['s6', '鉛筆で書いてもかまいません。', 'enpitsu de kaite mo kamaimasen.', 'Pode escrever a lápis, sem problema.', 'Formal.']
  ], [
    ['そんなに無理しないほうがいいと思うよ。', 'sonna ni muri shinai hou ga ii to omou yo.', 'Acho melhor você não se forçar tanto.']
  ], [
    X.f('É melhor descansar.', '休ん＿ほうがいいです。', ['だ|da', 'で|de', 'る|ru'], 'Conselho: forma た + ほうがいい.'),
    X.f('Não precisa vir amanhã.', '明日は来＿＿＿もいいです。', ['なくて|nakute', 'ないで|naide', 'なければ|nakereba'], 'Não precisa: なくてもいい.'),
    X.s('Como um amigo diria “tenho que ir” de forma casual?', ['行かなきゃ|ikanakya', '行かなければなりません|ikanakereba narimasen', '行ってもいい|itte mo ii'], 'Casual: 〜なきゃ.'),
    X.e('“É melhor não beber demais.”', ['飲みすぎた|nomisugita', 'ほうがいい|hou ga ii'], 0, 'Para “é melhor não”: 飲みすぎないほうがいい.')
  ])
  );
})();
