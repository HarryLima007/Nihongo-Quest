/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5/N4): Verbos e Conjugações (c13)
   A partir daqui a escrita é a natural (com kanji); a voz usa a
   leitura em kana gerada do romaji.
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c13', emblem: '動', title: 'Verbos e Conjugações', jp: 'どうし', stage: 'ini', jlpt: 'N5–N4',
    desc: 'Os três grupos de verbos e todas as formas essenciais: ます, て, ている, た, ない, potencial, volitivo, imperativo, transitivos e intransitivos.',
    requires: 'c8', reqNote: 'Liberada ao concluir Japonês Falado (onde você conheceu as formas casuais).'
  });
  c.lessons.push(
  L('c13l1', 'Os três grupos de verbos', '類', 'grammar', [
    'Todo verbo japonês termina em “u” na forma de dicionário. Eles se dividem em três grupos, e cada grupo conjuga de um jeito.',
    'Grupo 2 (verbos る): terminam em -iru ou -eru e tiram o る para conjugar: 食べる (taberu) → 食べます. Grupo 1 (verbos う): todos os outros; trocam o “u” por “i”: 書く (kaku) → 書きます. Grupo 3 (irregulares): só する e 来る.',
    'Cuidado: alguns verbos terminam em -iru/-eru mas são do grupo 1: 帰る (voltar), 入る (entrar), 走る (correr), 知る (saber), 切る (cortar). Eles fazem 帰ります, 入ります.'
  ], 'Na dúvida, olhe a forma ます: se antes de ます tem “e” ou “i” e o verbo é do grupo 2, o る simplesmente some.', [
    ['s1', '食べる → 食べます', 'taberu → tabemasu', 'comer (grupo 2)', 'Tira る e põe ます.'],
    ['s2', '書く → 書きます', 'kaku → kakimasu', 'escrever (grupo 1)', 'ku → ki + ます.'],
    ['s3', '話す → 話します', 'hanasu → hanashimasu', 'falar (grupo 1)', 'su → shi + ます.'],
    ['s4', '帰る → 帰ります', 'kaeru → kaerimasu', 'voltar (grupo 1, exceção)', 'Parece grupo 2, mas é grupo 1.'],
    ['s5', '来る → 来ます', 'kuru → kimasu', 'vir (irregular)', 'A leitura do kanji muda: く → き.'],
    ['s6', '勉強する → 勉強します', 'benkyou suru → benkyou shimasu', 'estudar (irregular com する)', 'Substantivo + する vira verbo.']
  ], [
    ['毎晩、日記を書きます。', 'maiban, nikki o kakimasu.', 'Escrevo no diário todas as noites.']
  ], [
    X.s('Qual é a forma ます de 帰る (voltar)?', ['帰ります|kaerimasu', '帰ます|kaemasu', '帰るます|kaerumasu'], '帰る é exceção: grupo 1. ru → ri + ます.'),
    X.s('Qual é a forma ます de 飲む (beber)?', ['飲みます|nomimasu', '飲ます|nomasu', '飲むます|nomumasu'], 'Grupo 1: mu → mi + ます.'),
    X.s('A qual grupo pertence 見る (ver)?', ['Grupo 2 (る)', 'Grupo 1 (う)', 'Irregular'], '見る (miru) termina em -iru e é grupo 2: 見ます.'),
    X.e('Corro no parque toda manhã:', ['毎朝|maiasa', '公園で|kouen de', '走ます|hashimasu'], 2, '走る é grupo 1: 走ります.')
  ]),
  L('c13l2', 'Forma ます completa', '丁', 'grammar', [
    'A forma educada tem quatro terminações: ます (faço/farei), ません (não faço), ました (fiz), ませんでした (não fiz).',
    'ましょう = vamos fazer (convite ou proposta). ましょうか = quer que eu faça? / vamos?',
    'ませんか = não quer fazer? É o convite mais educado: 一緒に行きませんか (não quer ir junto?).'
  ], 'ましょうか tem dois usos: oferecer ajuda (持ちましょうか = quer que eu carregue?) e sugerir (行きましょうか = vamos?).', [
    ['s1', '明日、映画を見ます。', 'ashita, eiga o mimasu.', 'Amanhã vou ver um filme.', 'ます = presente/futuro.'],
    ['s2', '肉は食べません。', 'niku wa tabemasen.', 'Não como carne.', ''],
    ['s3', '昨日、友達に会いました。', 'kinou, tomodachi ni aimashita.', 'Ontem encontrei um amigo.', '会う usa に.'],
    ['s4', '今朝は何も飲みませんでした。', 'kesa wa nani mo nomimasen deshita.', 'Hoje de manhã não bebi nada.', ''],
    ['s5', '少し休みましょう。', 'sukoshi yasumimashou.', 'Vamos descansar um pouco.', ''],
    ['s6', '荷物、持ちましょうか。', 'nimotsu, mochimashou ka.', 'Quer que eu carregue a bagagem?', 'Oferecendo ajuda.']
  ], [
    ['週末、一緒にカラオケに行きませんか。 … いいですね。行きましょう！', 'shuumatsu, issho ni karaoke ni ikimasen ka. … ii desu ne. ikimashou!', 'Não quer ir ao karaokê comigo no fim de semana? … Boa! Vamos!']
  ], [
    X.f('Ontem não estudei.', '昨日は勉強し＿＿＿＿＿＿。', ['ませんでした|masen deshita', 'ました|mashita', 'ません|masen'], 'Passado negativo: ませんでした.'),
    X.s('Você vê alguém com muitas sacolas. Como oferece ajuda?', ['持ちましょうか|mochimashou ka', '持ちませんでした|mochimasen deshita', '持ちます|mochimasu'], 'ましょうか oferece ajuda.'),
    X.s('Qual é o convite mais educado?', ['お茶を飲みませんか|ocha o nomimasen ka', 'お茶を飲みます|ocha o nomimasu', 'お茶を飲みました|ocha o nomimashita'], 'ませんか = não quer…?'),
    X.o('Vamos descansar um pouco.', ['少し|sukoshi', '休みましょう|yasumimashou'], ['休みました|yasumimashita'], '少し休みましょう。')
  ]),
  L('c13l3', 'Forma て: as regras', '手', 'grammar', [
    'A forma て liga frases e é a base de muitas estruturas (〜てください, 〜ている…). Grupo 2: tira る + て: 食べる → 食べて.',
    'Grupo 1 depende da última sílaba: う・つ・る → って (買って, 待って, 帰って); む・ぶ・ぬ → んで (飲んで, 遊んで, 死んで); く → いて (書いて); ぐ → いで (泳いで); す → して (話して).',
    'Exceção única: 行く → 行って (não 行いて). Irregulares: する → して, 来る → 来て (きて).'
  ], 'Uma musiquinha ajuda: “u-tsu-ru: tte! mu-bu-nu: nde! ku: ite, gu: ide, su: shite!”', [
    ['s1', '駅の前で待ってください。', 'eki no mae de matte kudasai.', 'Espere na frente da estação, por favor.', 'つ → って.'],
    ['s2', '水を飲んで、寝ました。', 'mizu o nonde, nemashita.', 'Bebi água e dormi.', 'む → んで. て liga ações em sequência.'],
    ['s3', 'ここに名前を書いてください。', 'koko ni namae o kaite kudasai.', 'Escreva seu nome aqui, por favor.', 'く → いて.'],
    ['s4', '海で泳いで、遊びました。', 'umi de oyoide, asobimashita.', 'Nadei no mar e me diverti.', 'ぐ → いで.'],
    ['s5', '駅まで行って、電車に乗ります。', 'eki made itte, densha ni norimasu.', 'Vou até a estação e pego o trem.', 'Exceção: 行く → 行って.'],
    ['s6', 'ゆっくり話してください。', 'yukkuri hanashite kudasai.', 'Fale devagar, por favor.', 'す → して.']
  ], [
    ['家に帰って、シャワーを浴びて、ご飯を食べました。', 'ie ni kaette, shawaa o abite, gohan o tabemashita.', 'Voltei para casa, tomei banho e jantei.']
  ], [
    X.s('Qual é a forma て de 読む (ler)?', ['読んで|yonde', '読いて|yoite', '読って|yotte'], 'む → んで.'),
    X.s('Qual é a forma て de 行く (ir)?', ['行って|itte', '行いて|iite', '行んで|inde'], '行く é a exceção: 行って.'),
    X.f('Espere aqui, por favor.', 'ここで＿＿＿ください。', ['待って|matte', '待いて|maite', '待んで|mande'], 'つ → って.'),
    X.e('“Toque a música, por favor.” (弾く = tocar instrumento)', ['ピアノを|piano o', '弾って|hitte', 'ください|kudasai'], 1, 'く → いて: 弾いて.')
  ]),
  L('c13l4', '〜ている: ação em andamento ou estado', '進', 'grammar', [
    '〜ている tem dois sentidos principais. Com verbos de ação (食べる, 読む), indica algo acontecendo agora: 食べている (está comendo).',
    'Com verbos de mudança (結婚する, 住む, 知る, 来る), indica o estado resultante: 結婚している = é casado (casou e continua casado), 知っている = sabe.',
    'Também indica hábito ou profissão: 毎日走っている (corro todos os dias), 銀行で働いている (trabalho num banco).'
  ], 'Atenção: “Eu sei” é 知っています, mas “Eu não sei” é 知りません (nunca 知っていません).', [
    ['s1', '今、雨が降っています。', 'ima, ame ga futte imasu.', 'Agora está chovendo.', 'Ação em andamento.'],
    ['s2', '姉は結婚しています。', 'ane wa kekkon shite imasu.', 'Minha irmã mais velha é casada.', 'Estado resultante.'],
    ['s3', 'その人を知っていますか。', 'sono hito o shitte imasu ka.', 'Você conhece aquela pessoa?', ''],
    ['s4', 'いいえ、知りません。', 'iie, shirimasen.', 'Não, não conheço.', 'Negativo: 知りません.'],
    ['s5', '父は銀行で働いています。', 'chichi wa ginkou de hataraite imasu.', 'Meu pai trabalha num banco.', 'Profissão / situação contínua.'],
    ['s6', '窓が開いています。', 'mado ga aite imasu.', 'A janela está aberta.', 'Estado.']
  ], [
    ['毎朝、公園を走っています。', 'maiasa, kouen o hashitte imasu.', 'Corro no parque todas as manhãs. (hábito)']
  ], [
    X.s('結婚しています significa…', ['é casado(a)', 'está se casando agora', 'vai se casar'], 'Com verbos de mudança, ている = estado resultante.'),
    X.s('Alguém pergunta se você conhece o Tanaka. Você não conhece. O que diz?', ['知りません|shirimasen', '知っていません|shitte imasen', '知らないています|shiranai te imasu'], 'Negativo de 知っている: 知りません.'),
    X.f('Agora está nevando.', '今、雪が降って＿＿＿。', ['います|imasu', 'あります|arimasu', 'ます|masu'], 'Ação em andamento: ている.'),
    X.o('Meu pai trabalha num banco.', ['父は|chichi wa', '銀行で|ginkou de', '働いています|hataraite imasu'], ['銀行に|ginkou ni'], 'Lugar de ação: で.')
  ]),
  L('c13l5', 'Forma た e “já fiz”: 〜たことがある', '経', 'grammar', [
    'A forma た (passado casual) se forma igual à て, trocando e por a: 書いて → 書いた, 飲んで → 飲んだ, 行って → 行った.',
    '〜たことがある = já fiz (alguma vez na vida): 日本に行ったことがあります (já fui ao Japão). Para nunca: 〜たことがない.',
    'Não use 〜たことがある para coisas rotineiras ou recentes: ontem comi sushi é só 昨日すしを食べた.'
  ], 'Pergunta comum: 〜たことがありますか (Você já ~?). Resposta: はい、あります / いいえ、ありません.', [
    ['s1', '日本に行ったことがありますか。', 'nihon ni itta koto ga arimasu ka.', 'Você já foi ao Japão?', ''],
    ['s2', 'いいえ、一度もありません。', 'iie, ichido mo arimasen.', 'Não, nunca fui.', '一度も + negativo = nem uma vez.'],
    ['s3', '納豆を食べたことがある？', 'nattou o tabeta koto ga aru?', 'Você já comeu natto?', 'Casual.'],
    ['s4', 'この映画は二回見たことがあります。', 'kono eiga wa nikai mita koto ga arimasu.', 'Já vi este filme duas vezes.', ''],
    ['s5', '富士山に登ったことがない。', 'fujisan ni nobotta koto ga nai.', 'Nunca subi o monte Fuji.', ''],
    ['s6', '昨日、ラーメンを食べた。', 'kinou, raamen o tabeta.', 'Ontem comi lámen.', 'Fato recente: só た, sem ことがある.']
  ], [
    ['着物を着たことはありますが、自分では着られません。', 'kimono o kita koto wa arimasu ga, jibun de wa kiraremasen.', 'Já vesti quimono, mas não consigo vestir sozinho.']
  ], [
    X.s('Como perguntar “Você já foi a Kyoto?”', ['京都に行ったことがありますか|kyouto ni itta koto ga arimasu ka', '京都に行くことがありますか|kyouto ni iku koto ga arimasu ka', '京都に行きましたことがありますか|kyouto ni ikimashita koto ga arimasu ka'], 'Forma た + ことがある.'),
    X.f('Nunca vi neve.', '雪を見たことが＿＿＿＿。', ['ありません|arimasen', 'いません|imasen', 'しません|shimasen'], 'Nunca: ことがない / ありません.'),
    X.s('Qual é a forma た de 泳ぐ (nadar)?', ['泳いだ|oyoida', '泳いた|oyoita', '泳った|oyotta'], 'Como a て (泳いで): 泳いだ.'),
    X.e('Contando o que comeu ontem:', ['昨日、すしを|kinou, sushi o', '食べたことがある|tabeta koto ga aru'], 1, 'Para um fato de ontem, basta 食べた. ことがある é experiência de vida.')
  ]),
  L('c13l6', 'Forma ない: não precisa, não faça', '否', 'grammar', [
    'Recordando: grupo 2 tira る + ない (食べない); grupo 1 troca u por a + ない (書かない, 待たない), com う virando わ (買わない); する → しない, 来る → こない.',
    '〜ないでください = por favor, não faça: 写真を撮らないでください.',
    '〜なくてもいい = não precisa: 急がなくてもいいです (não precisa ter pressa). E 〜なければならない / 〜なきゃ = tem que.'
  ], 'A fala casual encurta muito: 行かなければならない → 行かなきゃ. Você já viu em Japonês Falado!', [
    ['s1', 'ここで写真を撮らないでください。', 'koko de shashin o toranaide kudasai.', 'Não tire fotos aqui, por favor.', '撮る → 撮らない.'],
    ['s2', '心配しないでください。', 'shinpai shinaide kudasai.', 'Não se preocupe.', 'する → しない.'],
    ['s3', '明日は来なくてもいいです。', 'ashita wa konakute mo ii desu.', 'Amanhã você não precisa vir.', '来る → こない → こなくても.'],
    ['s4', '靴を脱がなくてもいいですよ。', 'kutsu o nuganakute mo ii desu yo.', 'Não precisa tirar os sapatos.', ''],
    ['s5', '毎日薬を飲まなければなりません。', 'mainichi kusuri o nomanakereba narimasen.', 'Tenho que tomar remédio todos os dias.', 'Formal: なければなりません.'],
    ['s6', 'もう帰らなきゃ。', 'mou kaeranakya.', 'Já tenho que ir embora.', 'Casual.']
  ], [
    ['忘れないでね。', 'wasurenaide ne.', 'Não esquece, tá?']
  ], [
    X.f('Não precisa se apressar.', '急が＿＿＿＿いいですよ。', ['なくても|nakutemo', 'ないで|naide', 'なければ|nakereba'], 'Não precisa: なくてもいい.'),
    X.f('Por favor, não fale alto.', '大きい声で話さ＿＿ください。', ['ないで|naide', 'なくて|nakute', 'ない|nai'], 'Pedido negativo: ないでください.'),
    X.s('Qual é a forma ない de 買う (comprar)?', ['買わない|kawanai', '買あない|kaanai', '買らない|karanai'], 'う → わない.'),
    X.e('“Amanhã você não precisa vir.”', ['明日は|ashita wa', '来ないでも|konaide mo', 'いいです|ii desu'], 1, 'Não precisa: 来なくてもいい.')
  ]),
  L('c13l7', 'Potencial: consigo, posso', '能', 'grammar', [
    'Grupo 2: tira る + られる: 食べる → 食べられる (consigo comer). Grupo 1: troca u por e + る: 書く → 書ける, 泳ぐ → 泳げる, 話す → 話せる.',
    'Irregulares: する → できる; 来る → 来られる (こられる). O objeto costuma usar が: 日本語が話せる.',
    'Na fala, muita gente tira o ら dos verbos do grupo 2: 食べれる, 見れる (ら抜き言葉). É comum, mas na escrita formal prefira 食べられる.'
  ], 'Potencial conjuga como verbo do grupo 2: 話せない (não consigo falar), 話せた (consegui falar).', [
    ['s1', '日本語が少し話せます。', 'nihongo ga sukoshi hanasemasu.', 'Consigo falar um pouco de japonês.', '話す → 話せる.'],
    ['s2', '辛いものが食べられません。', 'karai mono ga taberaremasen.', 'Não consigo comer comida apimentada.', ''],
    ['s3', '漢字が読めますか。', 'kanji ga yomemasu ka.', 'Você consegue ler kanji?', '読む → 読める.'],
    ['s4', '明日は来られますか。', 'ashita wa koraremasu ka.', 'Você consegue vir amanhã?', '来る → 来られる.'],
    ['s5', '泳げないんです。', 'oyogenai n desu.', 'É que eu não sei nadar.', ''],
    ['s6', '昨日はよく眠れなかった。', 'kinou wa yoku nemurenakatta.', 'Ontem não consegui dormir bem.', '眠る → 眠れる.']
  ], [
    ['ここから富士山が見えます。', 'koko kara fujisan ga miemasu.', 'Daqui dá para ver o monte Fuji. (見える = ser visível, espontâneo)']
  ], [
    X.s('Qual é o potencial de 書く (escrever)?', ['書ける|kakeru', '書かれる|kakareru', '書きられる|kakirareru'], 'Grupo 1: u → e + る.'),
    X.s('Qual é o potencial de する?', ['できる|dekiru', 'すれる|sureru', 'しられる|shirareru'], 'する → できる.'),
    X.f('Consigo comer natto.', '納豆が食べ＿＿＿。', ['られる|rareru', 'れる|reru', 'させる|saseru'], 'Na escrita padrão: 食べられる. (食べれる é coloquial.)'),
    X.e('“Consigo falar inglês.”', ['英語が|eigo ga', '話されます|hanasaremasu'], 1, 'Potencial de 話す: 話せます.')
  ]),
  L('c13l8', 'Volitivo: vamos! e “pretendo”', '意', 'grammar', [
    'O volitivo é o “vamos!” casual. Grupo 2: tira る + よう: 食べよう. Grupo 1: troca u por o + う: 行こう, 帰ろう, 飲もう. Irregulares: しよう, 来よう (こよう).',
    'É a versão casual de ましょう: 行きましょう → 行こう.',
    '〜ようと思う = estou pensando em fazer: 日本に留学しようと思っています (estou pensando em fazer intercâmbio no Japão).'
  ], 'Em animes, o volitivo aparece em decisões: 行こう！ 戦おう！ 帰ろう！', [
    ['s1', '一緒に帰ろう！', 'issho ni kaerou!', 'Vamos voltar juntos!', '帰る → 帰ろう.'],
    ['s2', 'そろそろ寝よう。', 'sorosoro neyou.', 'Vamos dormir já já.', '寝る → 寝よう.'],
    ['s3', '何か飲もうか。', 'nani ka nomou ka.', 'Vamos beber alguma coisa?', 'か deixa como proposta.'],
    ['s4', '今日は早く寝ようと思います。', 'kyou wa hayaku neyou to omoimasu.', 'Hoje pretendo dormir cedo.', ''],
    ['s5', '来年、日本に行こうと思っています。', 'rainen, nihon ni ikou to omotte imasu.', 'Estou pensando em ir ao Japão no ano que vem.', 'O plano já existe há um tempo: 思っています.'],
    ['s6', '週末、何しようかな。', 'shuumatsu, nani shiyou ka na.', 'O que será que eu faço no fim de semana?', 'かな: falando sozinho.']
  ], [
    ['もう一回やってみよう！', 'mou ikkai yatte miyou!', 'Vamos tentar mais uma vez!']
  ], [
    X.s('Qual é o volitivo de 飲む?', ['飲もう|nomou', '飲みよう|nomiyou', '飲むう|nomuu'], 'Grupo 1: u → o + う.'),
    X.s('Qual é o volitivo de 来る?', ['来よう|koyou', '来ろう|korou', '来よ|kiyo'], '来る → こよう.'),
    X.f('Estou pensando em estudar japonês todos os dias.', '毎日日本語を勉強しよう＿＿＿います。', ['と思って|to omotte', 'と思う|to omou', 'ことが|koto ga'], '〜ようと思っている.'),
    X.o('Vamos voltar juntos!', ['一緒に|issho ni', '帰ろう|kaerou'], ['帰ります|kaerimasu'], '一緒に帰ろう！')
  ]),
  L('c13l9', 'Imperativo e proibição (para reconhecer)', '命', 'grammar', [
    'O imperativo direto é forte e soa rude fora de emergências, esportes, placas ou animes. Grupo 1: u → e: 行け, 待て, 走れ. Grupo 2: る → ろ: 食べろ, 見ろ. Irregulares: しろ, 来い.',
    'Proibição: forma de dicionário + な: 行くな (não vá!), 見るな (não olhe!), 諦めるな (não desista!).',
    'Pais e professores usam 〜なさい, mais suave: 早く寝なさい (vá dormir já). Para pedir a outras pessoas, prefira 〜てください.'
  ], 'Em placas de trânsito: 止まれ (pare). Em torcidas: 頑張れ! (força!).', [
    ['s1', '止まれ！', 'tomare!', 'Pare!', 'Placa de trânsito e emergência.'],
    ['s2', '頑張れ！', 'ganbare!', 'Força! Vai!', 'Torcida: imperativo carinhoso.'],
    ['s3', 'こっちに来い！', 'kocchi ni koi!', 'Vem cá!', 'Rude: 来る → 来い.'],
    ['s4', '諦めるな！', 'akirameru na!', 'Não desista!', 'Proibição: dicionário + な.'],
    ['s5', '早く起きなさい！', 'hayaku okinasai!', 'Levante logo!', 'Pais e professores: なさい.'],
    ['s6', '静かにしろ！', 'shizuka ni shiro!', 'Fica quieto!', 'する → しろ. Rude.']
  ], [
    ['ここに入るな。', 'koko ni hairu na.', 'Não entre aqui. (proibição seca)']
  ], [
    X.s('Uma mãe acordando o filho diria:', ['早く起きなさい|hayaku okinasai', '早く起きるな|hayaku okiru na', '早く起きよう|hayaku okiyou'], 'Pais usam 〜なさい.'),
    X.s('O que significa 見るな！?', ['Não olhe!', 'Olhe!', 'Vamos olhar!'], 'Dicionário + な = proibição.'),
    X.s('Você precisa pedir a um colega de trabalho que espere. O que diz?', ['待ってください|matte kudasai', '待て|mate', '待つな|matsu na'], 'Com colegas, imperativo seco é rude. Use てください.'),
    X.f('Força! (torcida)', '頑張＿！', ['れ|re', 'ろ|ro', 'な|na'], '頑張る é grupo 1: る → れ.')
  ]),
  L('c13l10', 'Transitivos e intransitivos: abrir × abrir-se', '自', 'grammar', [
    'Muitos verbos vêm em pares. O transitivo tem alguém agindo sobre algo, com を: ドアを開ける (eu abro a porta). O intransitivo descreve a coisa mudando sozinha, com が: ドアが開く (a porta se abre).',
    'Pares comuns: 開ける/開く (abrir), 閉める/閉まる (fechar), つける/つく (ligar/acender), 消す/消える (desligar/apagar), 始める/始まる (começar), 止める/止まる (parar).',
    'Com ている, o intransitivo descreve o estado: 電気がついている (a luz está acesa).'
  ], 'Quem é o responsável? Se tem alguém agindo: を + transitivo. Se só descreve o que aconteceu: が + intransitivo.', [
    ['s1', '窓を開けてもいいですか。', 'mado o akete mo ii desu ka.', 'Posso abrir a janela?', 'Transitivo: 開ける.'],
    ['s2', 'ドアが開きました。', 'doa ga akimashita.', 'A porta se abriu.', 'Intransitivo: 開く.'],
    ['s3', '電気を消してください。', 'denki o keshite kudasai.', 'Apague a luz, por favor.', '消す: transitivo.'],
    ['s4', '急に電気が消えた！', 'kyuu ni denki ga kieta!', 'De repente a luz apagou!', '消える: intransitivo.'],
    ['s5', '授業は九時に始まります。', 'jugyou wa kuji ni hajimarimasu.', 'A aula começa às nove.', '始まる: intransitivo.'],
    ['s6', 'エアコンがついています。', 'eakon ga tsuite imasu.', 'O ar-condicionado está ligado.', 'Estado: intransitivo + ている.']
  ], [
    ['先生が授業を始めました。', 'sensei ga jugyou o hajimemashita.', 'O professor começou a aula. (始める: transitivo)']
  ], [
    X.f('A porta se fechou.', 'ドアが＿＿＿＿。', ['閉まった|shimatta', '閉めた|shimeta', '閉めって|shimette'], 'Sem alguém agindo: intransitivo 閉まる.'),
    X.f('Ligue a TV, por favor.', 'テレビを＿＿＿ください。', ['つけて|tsukete', 'ついて|tsuite', 'ついで|tsuide'], 'Alguém liga: transitivo つける.'),
    X.s('O filme já começou. Qual frase está certa?', ['映画が始まった|eiga ga hajimatta', '映画を始まった|eiga o hajimatta', '映画が始めた|eiga ga hajimeta'], 'O filme começa sozinho: が + 始まる.'),
    X.e('“Eu parei o carro.”', ['車が|kuruma ga', '止めた|tometa'], 0, 'Transitivo pede を: 車を止めた.')
  ]),
  L('c13l11', 'Antes, depois e em seguida', '後', 'grammar', [
    '〜てから = depois de fazer (e só então): ご飯を食べてから、歯を磨く.',
    '〜前に = antes de fazer: 寝る前に本を読む. O verbo antes de 前に fica SEMPRE na forma de dicionário, mesmo falando do passado.',
    '〜た後で = depois de fazer: 授業が終わった後で、部活に行く. O verbo antes de 後で fica SEMPRE no passado (た).'
  ], 'Truque: 前に + dicionário (ainda não aconteceu); 後で + た (já aconteceu).', [
    ['s1', '手を洗ってから、食べてください。', 'te o aratte kara, tabete kudasai.', 'Lave as mãos e só depois coma.', ''],
    ['s2', '寝る前に、歯を磨きます。', 'neru mae ni, ha o migakimasu.', 'Antes de dormir, escovo os dentes.', 'Dicionário + 前に.'],
    ['s3', '日本に来る前に、日本語を勉強しました。', 'nihon ni kuru mae ni, nihongo o benkyou shimashita.', 'Antes de vir ao Japão, estudei japonês.', 'Mesmo no passado: 来る前に.'],
    ['s4', '授業が終わった後で、図書館に行きます。', 'jugyou ga owatta ato de, toshokan ni ikimasu.', 'Depois que a aula acabar, vou à biblioteca.', 'た + 後で.'],
    ['s5', '食事の後で、コーヒーを飲みましょう。', 'shokuji no ato de, koohii o nomimashou.', 'Vamos tomar café depois da refeição.', 'Substantivo + の後で.'],
    ['s6', '仕事の前に、ジムに行きます。', 'shigoto no mae ni, jimu ni ikimasu.', 'Vou à academia antes do trabalho.', 'Substantivo + の前に.']
  ], [
    ['宿題をしてから遊びなさい。', 'shukudai o shite kara asobinasai.', 'Faça a lição de casa e só depois vá brincar.']
  ], [
    X.f('Antes de comer, digo itadakimasu.', '食べる＿＿、いただきますと言います。', ['前に|mae ni', '後で|ato de', 'てから|te kara'], 'Dicionário + 前に.'),
    X.f('Depois de ver o filme, jantamos.', '映画を見た＿＿、晩ご飯を食べました。', ['後で|ato de', '前に|mae ni', 'から|kara'], 'た + 後で.'),
    X.e('“Antes de vir ao Japão, estudei.”', ['日本に|nihon ni', '来た前に|kita mae ni', '勉強しました|benkyou shimashita'], 1, 'Antes de 前に o verbo fica no dicionário: 来る前に.'),
    X.o('Lave as mãos e depois coma.', ['手を洗って|te o aratte', 'から、|kara,', '食べてください|tabete kudasai'], ['前に|mae ni'], '〜てから = depois de.')
  ]),
  L('c13l12', 'Listando ações: 〜たり〜たりする', '列', 'grammar', [
    '〜たり〜たりする lista algumas ações como exemplos, sem ordem e sem dizer que são todas: 週末は映画を見たり、買い物したりします (no fim de semana vejo filmes, faço compras, coisas assim).',
    'Forma-se com o passado た + り. O tempo da frase fica no する final: 〜たりしました (fiz coisas como…).',
    'Também mostra alternância: 行ったり来たり (vai e vem), 泣いたり笑ったり (chora e ri).'
  ], 'Compare: 〜て lista ações em sequência; 〜たり dá exemplos soltos.', [
    ['s1', '週末は映画を見たり、本を読んだりします。', 'shuumatsu wa eiga o mitari, hon o yondari shimasu.', 'No fim de semana vejo filmes, leio livros, coisas assim.', ''],
    ['s2', '日本で温泉に入ったり、すしを食べたりしました。', 'nihon de onsen ni haittari, sushi o tabetari shimashita.', 'No Japão entrei em águas termais, comi sushi e outras coisas.', ''],
    ['s3', '休みの日は何をしたりしますか。', 'yasumi no hi wa nani o shitari shimasu ka.', 'O que você costuma fazer nos dias de folga?', ''],
    ['s4', '部屋の中を行ったり来たりしている。', 'heya no naka o ittari kitari shite iru.', 'Está andando de um lado para o outro no quarto.', 'Alternância.'],
    ['s5', '最近、寒かったり暑かったりします。', 'saikin, samukattari atsukattari shimasu.', 'Ultimamente às vezes faz frio, às vezes calor.', 'Adjetivos também: かったり.'],
    ['s6', 'ゲームしたり、寝たりしてた。', 'geemu shitari, netari shiteta.', 'Fiquei jogando, dormindo… (casual)', '']
  ], [
    ['パーティーでは歌ったり踊ったりして、楽しかった。', 'paatii de wa utattari odottari shite, tanoshikatta.', 'Na festa cantamos, dançamos, foi divertido.']
  ], [
    X.f('Vejo TV, leio livros…', 'テレビを見＿＿、本を読んだりします。', ['たり|tari', 'て|te', 'ると|ru to'], 'た + り.'),
    X.s('Qual frase indica “fiz coisas como nadar e jogar” (no passado)?', ['泳いだり遊んだりしました|oyoidari asondari shimashita', '泳いだり遊んだりします|oyoidari asondari shimasu', '泳いで遊んだりました|oyoide asondari mashita'], 'O tempo fica no する final.'),
    X.e('“Viajei, fiz compras…”', ['旅行したり、|ryokou shitari,', '買い物したり|kaimono shitari', 'ました|mashita'], 2, 'Falta o する no final: 買い物したりしました.'),
    X.o('Ele está andando de um lado para o outro.', ['行ったり|ittari', '来たり|kitari', 'している|shite iru'], ['行って|itte'], '行ったり来たりしている。')
  ]),
  L('c13l13', 'Ao mesmo tempo: 〜ながら', '乍', 'grammar', [
    '〜ながら = fazer duas coisas ao mesmo tempo, pela mesma pessoa. Usa o radical da forma ます: 聞きます → 聞きながら.',
    'A ação principal vai no fim: 音楽を聞きながら勉強する (estudo ouvindo música: o principal é estudar).',
    'Com estados longos (trabalhar meio período, estudar), ながら também significa “enquanto”: 働きながら大学に通っている (faço faculdade enquanto trabalho).'
  ], 'As duas ações precisam ser da mesma pessoa. Para pessoas diferentes, use 間 (aida): 私が料理している間、彼は掃除した.', [
    ['s1', '音楽を聞きながら勉強します。', 'ongaku o kikinagara benkyou shimasu.', 'Estudo ouvindo música.', ''],
    ['s2', 'スマホを見ながら歩かないで。', 'sumaho o minagara arukanaide.', 'Não ande olhando o celular.', ''],
    ['s3', 'お茶を飲みながら話しましょう。', 'ocha o nominagara hanashimashou.', 'Vamos conversar tomando um chá.', ''],
    ['s4', '働きながら日本語を勉強しています。', 'hatarakinagara nihongo o benkyou shite imasu.', 'Estudo japonês enquanto trabalho.', ''],
    ['s5', '歌いながら料理する。', 'utainagara ryouri suru.', 'Cozinho cantando.', ''],
    ['s6', 'テレビを見ながらご飯を食べる。', 'terebi o minagara gohan o taberu.', 'Como vendo TV.', '']
  ], [
    ['彼は笑いながら「大丈夫」と言った。', 'kare wa warainagara "daijoubu" to itta.', 'Ele disse “tudo bem” rindo.']
  ], [
    X.f('Estudo ouvindo música.', '音楽を聞き＿＿＿勉強します。', ['ながら|nagara', 'たり|tari', 'てから|te kara'], 'Radical + ながら.'),
    X.s('Qual é a ação principal em 歩きながら電話する?', ['Telefonar', 'Andar', 'As duas igualmente'], 'A ação principal fica no final.'),
    X.e('“Como vendo TV.”', ['テレビを|terebi o', '見るながら|miru nagara', '食べる|taberu'], 1, 'Use o radical: 見ながら.'),
    X.o('Vamos conversar tomando chá.', ['お茶を|ocha o', '飲みながら|nominagara', '話しましょう|hanashimashou'], ['飲んで|nonde'], 'Ação secundária + ながら + ação principal.')
  ]),
  L('c13l14', 'Dar e receber: あげる, くれる, もらう', '授', 'grammar', [
    'あげる = eu (ou alguém) dou para outra pessoa: 友達にプレゼントをあげた.',
    'くれる = alguém me dá (ou dá a alguém do meu grupo, como minha família): 友達がプレゼントをくれた. A direção é sempre PARA o meu lado.',
    'もらう = eu recebo de alguém: 友達にプレゼントをもらった (recebi do amigo). Quem dá leva に (ou から).'
  ], 'Nunca diga 友達が私にあげた. Quando vem para mim, é sempre くれた.', [
    ['s1', '母に花をあげました。', 'haha ni hana o agemashita.', 'Dei flores para minha mãe.', 'あげる: de mim para outro.'],
    ['s2', '友達が本をくれました。', 'tomodachi ga hon o kuremashita.', 'Um amigo me deu um livro.', 'くれる: para mim.'],
    ['s3', '友達に本をもらいました。', 'tomodachi ni hon o moraimashita.', 'Ganhei um livro de um amigo.', 'もらう: eu recebo.'],
    ['s4', '父が弟に時計をくれました。', 'chichi ga otouto ni tokei o kuremashita.', 'Meu pai deu um relógio ao meu irmão mais novo.', 'Meu irmão é do meu grupo: くれる.'],
    ['s5', 'これ、あげる。', 'kore, ageru.', 'Isto aqui é pra você.', 'Casual, ao entregar algo.'],
    ['s6', '誕生日に何をもらったの？', 'tanjoubi ni nani o moratta no?', 'O que você ganhou de aniversário?', '']
  ], [
    ['先生にいただきました。', 'sensei ni itadakimashita.', 'Ganhei do professor. (いただく: forma humilde de もらう)']
  ], [
    X.s('Um amigo te deu chocolate. Qual frase está certa?', ['友達がチョコをくれた|tomodachi ga choko o kureta', '友達がチョコをあげた|tomodachi ga choko o ageta', '友達にチョコをくれた|tomodachi ni choko o kureta'], 'Para o seu lado: くれる, e quem dá leva が.'),
    X.f('Ganhei uma carta da minha avó.', '祖母に手紙を＿＿＿＿＿。', ['もらいました|moraimashita', 'くれました|kuremashita', 'あげました|agemashita'], 'Eu recebo: もらう, quem dá leva に.'),
    X.f('Dei um presente ao meu namorado.', '彼氏にプレゼントを＿＿＿＿。', ['あげた|ageta', 'くれた|kureta', 'もらった|moratta'], 'De mim para outro: あげる.'),
    X.e('“O professor me deu um livro.”', ['先生が|sensei ga', '私に本を|watashi ni hon o', 'あげました|agemashita'], 2, 'Para mim: くれました.')
  ])
  );
})();
