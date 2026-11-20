/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5): Vocabulário do Cotidiano (c11)
   Escrita em kana com espaços, como nas alas iniciais; o kanji
   aparece como apoio. Ids novos: c11l1…
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c11', emblem: '日', title: 'Vocabulário do Cotidiano', jp: 'にちじょうの ことば', stage: 'ini', jlpt: 'N5',
    desc: 'Casa, objetos, roupas, corpo, saúde, cores, clima, transporte, cidade, escola, trabalho, datas e contadores.',
    requires: 'c4', reqNote: 'Liberada ao concluir Vocabulário Essencial.'
  });
  c.lessons.push(
  L('c11l1', 'Casa e cômodos', '家', 'vocab', [
    'Casa em japonês pode ser いえ (o prédio, o lar) ou うち (a minha casa, o meu lar). Na fala, うち é muito mais comum: うちに かえります = volto para casa.',
    'Ao entrar numa casa japonesa você tira os sapatos no げんかん, a entrada rebaixada perto da porta.',
    'Banheiro também tem duas palavras: トイレ é o vaso sanitário; おふろ é a banheira, onde se toma banho. Em muitas casas japonesas, eles ficam em cômodos separados.'
  ], 'うち também significa “nós / a nossa família”: うちの ねこ = o nosso gato.', [
    ['uchi', 'うち', 'uchi', 'casa (o meu lar)', 'Mais usado que いえ na conversa. うちで = em casa.', ['うちで えいがを みます。', 'uchi de eiga o mimasu.', 'Vou ver um filme em casa.']],
    ['daidokoro', 'だいどころ', 'daidokoro', 'cozinha', 'Também se ouve キッチン (kicchin).', null, '台所'],
    ['ofuro', 'おふろ', 'ofuro', 'banheira, banho de imersão', 'おふろに はいります = tomar banho (de banheira). Literalmente “entrar na banheira”.', ['まいばん おふろに はいります。', 'maiban ofuro ni hairimasu.', 'Todas as noites eu tomo banho de banheira.'], 'お風呂'],
    ['toire', 'トイレ', 'toire', 'banheiro, vaso sanitário', 'Ao perguntar onde fica: トイレは どこですか。 お手洗い (otearai) é mais educado.'],
    ['genkan', 'げんかん', 'genkan', 'entrada da casa (onde se tiram os sapatos)', 'Não existe palavra exata em português. É um pequeno degrau logo depois da porta.', null, '玄関'],
    ['mado', 'まど', 'mado', 'janela', '', ['まどを しめて ください。', 'mado o shimete kudasai.', 'Feche a janela, por favor.'], '窓'],
    ['isu', 'いす', 'isu', 'cadeira', '', null, '椅子'],
    ['beddo', 'ベッド', 'beddo', 'cama', 'Muitos japoneses dormem no ふとん (futon), um colchão estendido no chão.'],
    ['niwa', 'にわ', 'niwa', 'quintal, jardim', '', null, '庭'],
    ['kaidan', 'かいだん', 'kaidan', 'escada', 'Em histórias de terror, かいだん também é “história de fantasma”, mas com outro kanji (怪談).', null, '階段']
  ], [
    ['うちに トイレが ふたつ あります。', 'uchi ni toire ga futatsu arimasu.', 'Na minha casa há dois banheiros.'],
    ['げんかんで くつを ぬいで ください。', 'genkan de kutsu o nuide kudasai.', 'Tire os sapatos na entrada, por favor.']
  ], [
    X.s('Você vai tomar um banho de banheira. Como diz?', ['おふろに はいります|ofuro ni hairimasu', 'トイレに はいります|toire ni hairimasu', 'だいどころに はいります|daidokoro ni hairimasu'], 'おふろ é a banheira. トイレ é o vaso sanitário: em muitas casas japonesas, ficam em cômodos separados.'),
    X.s('Onde você tira os sapatos ao entrar numa casa japonesa?', ['げんかん|genkan', 'にわ|niwa', 'かいだん|kaidan'], 'げんかん é a entrada rebaixada logo depois da porta.'),
    X.f('Vou ver um filme em casa.', '＿＿で えいがを みます。', ['うち|uchi', 'まど|mado', 'いす|isu'], 'うちで = em casa. で marca o lugar onde a ação acontece.'),
    X.o('Feche a janela, por favor.', ['まどを|mado o', 'しめて|shimete', 'ください|kudasai'], ['いすを|isu o'], 'まどを しめて ください。 〜て ください = faça ~, por favor.')
  ]),
  L('c11l2', 'Objetos do dia a dia', '物', 'vocab', [
    'Estes são os objetos que você mais pede, procura e perde no dia a dia.',
    'Para dizer que não acha algo: さいふが ありません (não tem a carteira / não acho a carteira). Objetos usam あります.',
    'Muitas palavras vêm do inglês e se escrevem em katakana: ノート (caderno), ティッシュ (lenço de papel), スマホ (celular).'
  ], 'ノート em japonês é caderno, não notebook! Notebook (computador) é ノートパソコン.', [
    ['kagi', 'かぎ', 'kagi', 'chave', '', ['かぎを わすれました。', 'kagi o wasuremashita.', 'Esqueci a chave.'], '鍵'],
    ['kasa', 'かさ', 'kasa', 'guarda-chuva', 'No Japão é comum deixar o guarda-chuva num suporte na entrada das lojas.', null, '傘'],
    ['saifu', 'さいふ', 'saifu', 'carteira', '', ['さいふが ありません！', 'saifu ga arimasen!', 'Não acho minha carteira!'], '財布'],
    ['tokei', 'とけい', 'tokei', 'relógio', 'Serve para relógio de pulso e de parede. うでどけい = relógio de pulso.', null, '時計'],
    ['megane', 'めがね', 'megane', 'óculos', '', null, '眼鏡'],
    ['nooto', 'ノート', 'nooto', 'caderno', 'Não é computador! Laptop = ノートパソコン.'],
    ['enpitsu', 'えんぴつ', 'enpitsu', 'lápis', 'Caneta é ペン.', null, '鉛筆'],
    ['hasami', 'はさみ', 'hasami', 'tesoura', ''],
    ['tisshu', 'ティッシュ', 'tisshu', 'lenço de papel', 'Distribuído de graça nas ruas do Japão como propaganda.'],
    ['denwa', 'でんわ', 'denwa', 'telefone', 'でんわを かけます = telefonar.', null, '電話']
  ], [
    ['かさを もって いますか。', 'kasa o motte imasu ka.', 'Você está com guarda-chuva?'],
    ['めがねは どこですか。', 'megane wa doko desu ka.', 'Onde estão os óculos?']
  ], [
    X.s('Está chovendo. O que você leva?', ['かさ|kasa', 'かぎ|kagi', 'はさみ|hasami'], 'かさ = guarda-chuva.'),
    X.s('Em japonês, ノート é…', ['um caderno', 'um computador portátil', 'um bilhete'], 'ノート = caderno. Laptop é ノートパソコン.'),
    X.f('Não acho minha carteira!', '＿＿＿が ありません！', ['さいふ|saifu', 'とけい|tokei', 'でんわ|denwa'], 'さいふ = carteira. Objetos usam あります.'),
    X.e('Esqueci a chave.', ['かぎを|kagi o', 'わすれます|wasuremasu'], 1, 'Esqueci (passado) = わすれました. わすれます é presente/futuro.')
  ]),
  L('c11l3', 'Roupas e o verbo certo para vestir', '服', 'vocab', [
    'Em português usamos “vestir” para quase tudo. Em japonês, o verbo muda conforme a parte do corpo!',
    'きます (kimasu) para a parte de cima ou o corpo todo (camisa, casaco, vestido). はきます (hakimasu) para o que se veste nas pernas e nos pés (calça, saia, sapatos, meias). かぶります para o que vai na cabeça (chapéu, boné). かけます para óculos.',
    'Para tirar qualquer roupa, usa-se ぬぎます (nugimasu). Para tirar óculos, acessórios ou relógio: とります / はずします.'
  ], 'Cuidado: o きます de vestir (着ます) e o きます de vir (来ます) soam igual. O contexto separa: シャツを きます é vestir.', [
    ['fuku', 'ふく', 'fuku', 'roupa', '', null, '服'],
    ['shatsuokimasu', 'シャツを きます', 'shatsu o kimasu', 'vestir uma camisa', 'きます: parte de cima ou corpo todo.', null, 'シャツを着ます'],
    ['zubon', 'ズボンを はきます', 'zubon o hakimasu', 'vestir uma calça', 'はきます: pernas e pés. ズボン = calça.'],
    ['kutsu', 'くつを はきます', 'kutsu o hakimasu', 'calçar os sapatos', 'Sapatos também usam はきます.', null, '靴を履きます'],
    ['kutsushita', 'くつした', 'kutsushita', 'meia', 'Literalmente “embaixo do sapato”.', null, '靴下'],
    ['boushi', 'ぼうしを かぶります', 'boushi o kaburimasu', 'pôr o chapéu / o boné', 'かぶります: cabeça.', null, '帽子をかぶります'],
    ['meganeokakemasu', 'めがねを かけます', 'megane o kakemasu', 'pôr os óculos', 'Óculos usam かけます (pendurar).'],
    ['nugimasu', 'ふくを ぬぎます', 'fuku o nugimasu', 'tirar a roupa', 'ぬぎます serve para roupas e sapatos.', null, '服を脱ぎます'],
    ['sukaato', 'スカート', 'sukaato', 'saia', 'Saia é das pernas: スカートを はきます.'],
    ['kooto', 'コート', 'kooto', 'casaco, sobretudo', 'Casaco é da parte de cima: コートを きます.']
  ], [
    ['さむいから、コートを きて ください。', 'samui kara, kooto o kite kudasai.', 'Está frio, então vista o casaco.'],
    ['ここで くつを ぬいで ください。', 'koko de kutsu o nuide kudasai.', 'Tire os sapatos aqui, por favor.']
  ], [
    X.s('Qual verbo se usa para vestir uma saia (スカート)?', ['はきます|hakimasu', 'きます|kimasu', 'かぶります|kaburimasu'], 'Saia, calça, meias e sapatos: はきます.'),
    X.s('Qual verbo se usa para pôr um boné?', ['かぶります|kaburimasu', 'はきます|hakimasu', 'かけます|kakemasu'], 'Tudo o que vai na cabeça: かぶります.'),
    X.f('Visto o casaco.', 'コートを ＿＿＿。', ['きます|kimasu', 'はきます|hakimasu', 'かけます|kakemasu'], 'Casaco (parte de cima): きます.'),
    X.e('Calçando os sapatos:', ['くつを|kutsu o', 'きます|kimasu'], 1, 'Sapatos usam はきます: くつを はきます.')
  ]),
  L('c11l4', 'O corpo', '体', 'vocab', [
    'As partes do corpo aparecem o tempo todo: para falar de dor, descrever pessoas e em muitas expressões.',
    'Para descrever alguém, usa-se は … が: あの ひとは めが おおきいです = aquela pessoa tem olhos grandes (literalmente: quanto àquela pessoa, os olhos são grandes).',
    'Algumas palavras soam iguais a outras: はな é nariz e também flor; o contexto (e a entonação) decidem.'
  ], 'おなか (barriga) aparece em おなかが すいた (estou com fome) e おなかが いっぱい (estou cheio).', [
    ['atama', 'あたま', 'atama', 'cabeça', 'あたまが いい = inteligente (literalmente “cabeça boa”).', null, '頭'],
    ['kao', 'かお', 'kao', 'rosto', '', null, '顔'],
    ['me', 'め', 'me', 'olho', 'めが いい = enxerga bem.', null, '目'],
    ['hana', 'はな', 'hana', 'nariz', 'はな também é flor (花). O contexto decide.', null, '鼻'],
    ['kuchi', 'くち', 'kuchi', 'boca', '', null, '口'],
    ['mimi', 'みみ', 'mimi', 'orelha, ouvido', '', null, '耳'],
    ['te', 'て', 'te', 'mão', 'Também o braço todo, às vezes. てを あらいます = lavar as mãos.', null, '手'],
    ['ashi', 'あし', 'ashi', 'perna, pé', 'Uma palavra para os dois! Para diferenciar: あしくび = tornozelo.', null, '足'],
    ['onaka', 'おなか', 'onaka', 'barriga', '', ['おなかが いっぱいです。', 'onaka ga ippai desu.', 'Estou cheio (de comida).'], 'お腹'],
    ['senaka', 'せなか', 'senaka', 'costas', '', null, '背中']
  ], [
    ['あの ひとは せが たかいです。', 'ano hito wa se ga takai desu.', 'Aquela pessoa é alta (せ = estatura).'],
    ['てを あらって ください。', 'te o aratte kudasai.', 'Lave as mãos, por favor.']
  ], [
    X.s('あたまが いい quer dizer…', ['inteligente', 'com dor de cabeça', 'cabelo bonito'], 'Literalmente “cabeça boa”: inteligente.'),
    X.s('Uma palavra japonesa serve para “perna” e “pé”. Qual?', ['あし|ashi', 'て|te', 'せなか|senaka'], 'あし = perna e pé.'),
    X.f('Estou cheio (de comida).', '＿＿＿が いっぱいです。', ['おなか|onaka', 'あたま|atama', 'くち|kuchi'], 'おなかが いっぱい = barriga cheia.'),
    X.o('Lave as mãos, por favor.', ['てを|te o', 'あらって|aratte', 'ください|kudasai'], ['めを|me o'], 'てを あらって ください。')
  ]),
  L('c11l5', 'Saúde e sintomas', '病', 'vocab', [
    'Para dizer que algo dói, use parte do corpo + が いたい: あたまが いたい (estou com dor de cabeça).',
    'Gripe e resfriado se “pegam” com ひきます: かぜを ひきました (peguei um resfriado). Febre se “tem”: ねつが あります.',
    'Remédio se “bebe” em japonês, mesmo comprimido: くすりを のみます.'
  ], 'Na farmácia ou no hospital, comece com: 〜が いたいんです (é que estou com dor em ~). O 〜んです explica a situação.', [
    ['atamagaitai', 'あたまが いたい', 'atama ga itai', 'estar com dor de cabeça', 'いたい = dolorido. Funciona com qualquer parte do corpo.', null, '頭が痛い'],
    ['onakagaitai', 'おなかが いたい', 'onaka ga itai', 'estar com dor de barriga'],
    ['netsu', 'ねつが あります', 'netsu ga arimasu', 'estar com febre', 'Literalmente “há febre”.', null, '熱があります'],
    ['kaze', 'かぜを ひきました', 'kaze o hikimashita', 'peguei um resfriado', 'かぜ = resfriado, gripe leve. Também significa vento (com outro kanji).', null, '風邪をひきました'],
    ['kusuri', 'くすりを のみます', 'kusuri o nomimasu', 'tomar remédio', 'Até comprimido se “bebe” (のみます).', null, '薬を飲みます'],
    ['seki', 'せきが でます', 'seki ga demasu', 'estar com tosse', 'Literalmente “a tosse sai”.', null, '咳が出ます'],
    ['kega', 'けがを しました', 'kega o shimashita', 'me machuquei', 'けが = ferimento, machucado.', null, '怪我をしました'],
    ['isha', 'いしゃ', 'isha', 'médico', 'Para chamar ou falar com respeito: おいしゃさん. No consultório, chama-se o médico de せんせい.', null, '医者'],
    ['genki', 'げんきに なりました', 'genki ni narimashita', 'melhorei, fiquei bom', 'げんき = saudável, animado.', null, '元気になりました'],
    ['nodo', 'のどが いたい', 'nodo ga itai', 'estar com dor de garganta', 'のど = garganta. のどが かわいた = estou com sede.', null, '喉が痛い']
  ], [
    ['きのうから ねつが あるんです。', 'kinou kara netsu ga aru n desu.', 'É que estou com febre desde ontem.'],
    ['かぜを ひいたので、がっこうを やすみます。', 'kaze o hiita node, gakkou o yasumimasu.', 'Peguei um resfriado, então vou faltar à escola.']
  ], [
    X.s('Como se diz “tomar remédio” em japonês?', ['くすりを のみます|kusuri o nomimasu', 'くすりを たべます|kusuri o tabemasu', 'くすりを します|kusuri o shimasu'], 'Remédio se “bebe”: のみます, mesmo se for comprimido.'),
    X.s('Você pegou um resfriado. Como conta isso?', ['かぜを ひきました|kaze o hikimashita', 'かぜが あります|kaze ga arimasu', 'かぜを のみました|kaze o nomimashita'], 'Resfriado se “pega”: かぜを ひきます.'),
    X.f('Estou com dor de garganta.', 'のどが ＿＿＿。', ['いたい|itai', 'あります|arimasu', 'でます|demasu'], 'Parte do corpo + が いたい.'),
    X.e('Contando que está com febre:', ['ねつが|netsu ga', 'いたいです|itai desu'], 1, 'Febre se “tem”: ねつが あります.')
  ]),
  L('c11l6', 'Cores', '色', 'vocab', [
    'Algumas cores são adjetivos い e ficam antes do substantivo sem nada no meio: あかい くるま (carro vermelho).',
    'As outras são substantivos e precisam de の: みどりの かばん (bolsa verde), ピンクの ふく (roupa rosa).',
    'Os adjetivos de cor são poucos: あかい, あおい, しろい, くろい, きいろい e ちゃいろい. Todo o resto usa の.'
  ], 'あおい também cobre o verde de semáforo, de folhas e de frutas verdes: o sinal verde no Japão se chama あおしんごう.', [
    ['akai', 'あかい', 'akai', 'vermelho', 'Adjetivo い: あかい りんご.', null, '赤い'],
    ['aoi', 'あおい', 'aoi', 'azul', 'Adjetivo い. Também usado para o verde do semáforo e de vegetais.', null, '青い'],
    ['shiroi', 'しろい', 'shiroi', 'branco', '', ['しろい ねこ', 'shiroi neko', 'gato branco'], '白い'],
    ['kuroi', 'くろい', 'kuroi', 'preto', '', null, '黒い'],
    ['kiiroi', 'きいろい', 'kiiroi', 'amarelo', 'Como substantivo: きいろ.', null, '黄色い'],
    ['chairoi', 'ちゃいろい', 'chairoi', 'marrom', 'Literalmente “cor de chá”.', null, '茶色い'],
    ['midori', 'みどり', 'midori', 'verde', 'Substantivo: みどりの シャツ.', null, '緑'],
    ['pinku', 'ピンク', 'pinku', 'rosa', 'Substantivo: ピンクの ふく.'],
    ['murasaki', 'むらさき', 'murasaki', 'roxo', 'Substantivo: むらさきの かさ.', null, '紫'],
    ['iro', 'なにいろ', 'naniiro', 'que cor?', 'いろ = cor. なにいろですか = De que cor é?', null, '何色']
  ], [
    ['あかい かさと みどりの かさが あります。', 'akai kasa to midori no kasa ga arimasu.', 'Há um guarda-chuva vermelho e um verde.'],
    ['しんごうが あおに なりました。', 'shingou ga ao ni narimashita.', 'O sinal ficou verde (literalmente “azul”).']
  ], [
    X.s('Como se diz “bolsa verde”?', ['みどりの かばん|midori no kaban', 'みどり かばん|midori kaban', 'みどりい かばん|midorii kaban'], 'みどり é substantivo: precisa de の.'),
    X.s('Como se diz “carro vermelho”?', ['あかい くるま|akai kuruma', 'あかの くるま|aka no kuruma', 'あかいの くるま|akai no kuruma'], 'あかい é adjetivo い: vai direto antes do substantivo.'),
    X.f('Gato branco.', '＿＿＿ ねこ', ['しろい|shiroi', 'しろの|shiro no', 'しろな|shiro na'], 'しろい é adjetivo い.'),
    X.e('Roupa rosa:', ['ピンクい|pinkui', 'ふく|fuku'], 0, 'ピンク é substantivo: ピンクの ふく.')
  ]),
  L('c11l7', 'Clima e estações', '季', 'vocab', [
    'O Japão tem quatro estações bem marcadas, e falar do tempo é a forma mais comum de puxar conversa.',
    'Chuva e neve “caem” com ふります: あめが ふります (chove). Para tempo bom: はれ (céu aberto); nublado: くもり.',
    'Comentar o clima com ね cria empatia: きょうは あついですね (Está calor hoje, né?).'
  ], 'つゆ é a estação das chuvas, de junho a julho, antes do verão quente e úmido.', [
    ['haru', 'はる', 'haru', 'primavera', 'Época das cerejeiras (さくら).', null, '春'],
    ['natsu', 'なつ', 'natsu', 'verão', 'Quente e úmido no Japão.', null, '夏'],
    ['aki', 'あき', 'aki', 'outono', '', null, '秋'],
    ['fuyu', 'ふゆ', 'fuyu', 'inverno', '', null, '冬'],
    ['hare', 'はれ', 'hare', 'tempo bom, céu aberto', 'はれ ときどき くもり = sol, às vezes nublado (previsão do tempo).', null, '晴れ'],
    ['kumori', 'くもり', 'kumori', 'nublado', '', null, '曇り'],
    ['amegafurimasu', 'あめが ふります', 'ame ga furimasu', 'chove', 'Chuva “cai”: ふります.', null, '雨が降ります'],
    ['yukigafurimasu', 'ゆきが ふります', 'yuki ga furimasu', 'neva', '', null, '雪が降ります'],
    ['kazegatsuyoi', 'かぜが つよい', 'kaze ga tsuyoi', 'está ventando forte', 'かぜ (vento) soa igual a かぜ (resfriado).', null, '風が強い'],
    ['tenkiyohou', 'てんきよほう', 'tenki yohou', 'previsão do tempo', '', null, '天気予報']
  ], [
    ['あしたは あめが ふりますか。', 'ashita wa ame ga furimasu ka.', 'Vai chover amanhã?'],
    ['きょうは さむいですね。', 'kyou wa samui desu ne.', 'Hoje está frio, né?']
  ], [
    X.s('Que verbo se usa com chuva e neve?', ['ふります|furimasu', 'きます|kimasu', 'あります|arimasu'], 'あめが ふります / ゆきが ふります.'),
    X.s('A previsão diz くもり. Como está o céu?', ['Nublado', 'Aberto', 'Com neve'], 'くもり = nublado. はれ = céu aberto.'),
    X.f('Hoje está frio, né?', 'きょうは さむいです＿。', ['ね|ne', 'か|ka', 'を|o'], 'ね pede concordância: “né?”.'),
    X.o('Vai chover amanhã?', ['あしたは|ashita wa', 'あめが|ame ga', 'ふりますか|furimasu ka'], ['ゆきを|yuki o'], 'あしたは あめが ふりますか。')
  ]),
  L('c11l8', 'Transporte', '車', 'vocab', [
    'O meio de transporte vem com で: でんしゃで いきます (vou de trem). A pé é diferente: あるいて いきます.',
    'Embarcar é のります com に: バスに のります (pego o ônibus). Desembarcar é おります com を: でんしゃを おります.',
    'Trocar de trem (fazer baldeação) é のりかえます, palavra muito ouvida nas estações japonesas.'
  ], 'Cuidado com a partícula: バスに のります (entrar NO ônibus), mas バスを おります (sair DO ônibus).', [
    ['basu', 'バス', 'basu', 'ônibus', ''],
    ['takushii', 'タクシー', 'takushii', 'táxi', ''],
    ['hikouki', 'ひこうき', 'hikouki', 'avião', '', null, '飛行機'],
    ['fune', 'ふね', 'fune', 'barco, navio', '', null, '船'],
    ['kuruma', 'くるま', 'kuruma', 'carro', '', null, '車'],
    ['jitensha', 'じてんしゃ', 'jitensha', 'bicicleta', 'Muito usada no Japão para ir à escola e ao mercado.', null, '自転車'],
    ['chikatetsu', 'ちかてつ', 'chikatetsu', 'metrô', 'Literalmente “ferro debaixo da terra”.', null, '地下鉄'],
    ['norimasu', 'バスに のります', 'basu ni norimasu', 'pegar o ônibus (embarcar)', 'のります usa に.', null, 'バスに乗ります'],
    ['orimasu', 'でんしゃを おります', 'densha o orimasu', 'descer do trem', 'おります usa を.', null, '電車を降ります'],
    ['norikaemasu', 'のりかえます', 'norikaemasu', 'fazer baldeação', 'しぶやで のりかえます = troco de trem em Shibuya.', null, '乗り換えます']
  ], [
    ['まいにち じてんしゃで がっこうに いきます。', 'mainichi jitensha de gakkou ni ikimasu.', 'Vou à escola de bicicleta todos os dias.'],
    ['つぎの えきで おります。', 'tsugi no eki de orimasu.', 'Desço na próxima estação.']
  ], [
    X.s('Como se diz “vou de metrô”?', ['ちかてつで いきます|chikatetsu de ikimasu', 'ちかてつに いきます|chikatetsu ni ikimasu', 'ちかてつを いきます|chikatetsu o ikimasu'], 'Meio de transporte + で.'),
    X.s('O que significa のりかえます?', ['fazer baldeação', 'perder o trem', 'comprar passagem'], 'のりかえます = trocar de trem/ônibus.'),
    X.f('Pego o ônibus.', 'バス＿ のります。', ['に|ni', 'を|o', 'で|de'], 'のります usa に: バスに のります.'),
    X.e('Desço do trem:', ['でんしゃに|densha ni', 'おります|orimasu'], 0, 'おります usa を: でんしゃを おります.')
  ]),
  L('c11l9', 'Lugares da cidade', '町', 'vocab', [
    'Para perguntar onde fica um lugar: ぎんこうは どこですか (Onde fica o banco?).',
    'Para dizer o que existe num lugar: えきの ちかくに こうえんが あります (Perto da estação há um parque).',
    'こうばん é o pequeno posto policial de bairro: os policiais ajudam com direções e objetos perdidos.'
  ], 'Muitas lojas terminam em や: ほんや (livraria), パンや (padaria), はなや (floricultura).', [
    ['ginkou', 'ぎんこう', 'ginkou', 'banco', '', null, '銀行'],
    ['yuubinkyoku', 'ゆうびんきょく', 'yuubinkyoku', 'correio (agência)', '', null, '郵便局'],
    ['kouen', 'こうえん', 'kouen', 'parque', '', null, '公園'],
    ['toshokan', 'としょかん', 'toshokan', 'biblioteca', '', null, '図書館'],
    ['suupaa', 'スーパー', 'suupaa', 'supermercado', ''],
    ['hon_ya', 'ほんや', "hon'ya", 'livraria', 'ほん (livro) + や (loja).', null, '本屋'],
    ['kuukou', 'くうこう', 'kuukou', 'aeroporto', '', null, '空港'],
    ['hoteru', 'ホテル', 'hoteru', 'hotel', ''],
    ['kouban', 'こうばん', 'kouban', 'posto policial de bairro', 'Ótimo lugar para pedir informação.', null, '交番'],
    ['chikaku', 'ちかく', 'chikaku', 'perto, arredores', 'えきの ちかく = perto da estação.', null, '近く']
  ], [
    ['すみません、ゆうびんきょくは どこですか。', 'sumimasen, yuubinkyoku wa doko desu ka.', 'Com licença, onde fica o correio?'],
    ['うちの ちかくに スーパーが あります。', 'uchi no chikaku ni suupaa ga arimasu.', 'Perto da minha casa há um supermercado.']
  ], [
    X.s('Você se perdeu e quer pedir ajuda à polícia. Para onde vai?', ['こうばん|kouban', 'くうこう|kuukou', 'ぎんこう|ginkou'], 'こうばん = posto policial de bairro.'),
    X.s('ほんや é…', ['livraria', 'biblioteca', 'hotel'], 'ほん (livro) + や (loja) = livraria. Biblioteca é としょかん.'),
    X.f('Perto da estação há um parque.', 'えきの ちかくに こうえんが ＿＿＿。', ['あります|arimasu', 'います|imasu', 'です|desu'], 'Lugares e coisas: あります.'),
    X.o('Com licença, onde fica o banco?', ['すみません、|sumimasen,', 'ぎんこうは|ginkou wa', 'どこですか|doko desu ka'], ['ぎんこうを|ginkou o'], 'Lugar + は どこですか。')
  ]),
  L('c11l10', 'Escola e estudo', '学', 'vocab', [
    'Vocabulário essencial para quem estuda: lição de casa, prova, dicionário, perguntas e respostas.',
    'おぼえます é memorizar/lembrar de algo aprendido; わすれます é esquecer. Os dois são muito usados por estudantes.',
    'Para fazer uma pergunta ao professor: しつもんが あります (Tenho uma pergunta).'
  ], 'しけん e テスト são ambos “prova”; しけん soa mais oficial (vestibular, exame de proficiência), テスト é a provinha do dia a dia.', [
    ['shukudai', 'しゅくだい', 'shukudai', 'lição de casa', 'しゅくだいを します = fazer a lição.', null, '宿題'],
    ['shiken', 'しけん', 'shiken', 'exame, prova', 'Mais oficial que テスト. O JLPT é um しけん.', null, '試験'],
    ['kyoukasho', 'きょうかしょ', 'kyoukasho', 'livro didático', '', null, '教科書'],
    ['jisho', 'じしょ', 'jisho', 'dicionário', 'じしょを ひきます = consultar o dicionário.', null, '辞書'],
    ['shitsumon', 'しつもん', 'shitsumon', 'pergunta', 'しつもんが あります = tenho uma pergunta.', null, '質問'],
    ['kotae', 'こたえ', 'kotae', 'resposta', '', null, '答え'],
    ['oboemasu', 'おぼえます', 'oboemasu', 'memorizar, lembrar', '', ['かんじを おぼえます。', 'kanji o oboemasu.', 'Memorizo os kanji.'], '覚えます'],
    ['wasuremasu', 'わすれます', 'wasuremasu', 'esquecer', '', null, '忘れます'],
    ['benkyou', 'べんきょう', 'benkyou', 'estudo', 'べんきょうします = estudar.', null, '勉強'],
    ['yasumijikan', 'やすみじかん', 'yasumi jikan', 'intervalo, recreio', 'やすみ = descanso, folga.', null, '休み時間']
  ], [
    ['せんせい、しつもんが あります。', 'sensei, shitsumon ga arimasu.', 'Professor, tenho uma pergunta.'],
    ['あした しけんが あるから、べんきょうします。', 'ashita shiken ga aru kara, benkyou shimasu.', 'Amanhã tem prova, então vou estudar.']
  ], [
    X.s('Você quer fazer uma pergunta na aula. O que diz?', ['しつもんが あります|shitsumon ga arimasu', 'こたえが あります|kotae ga arimasu', 'しゅくだいが あります|shukudai ga arimasu'], 'しつもん = pergunta.'),
    X.s('Qual é o oposto de おぼえます (memorizar)?', ['わすれます|wasuremasu', 'べんきょうします|benkyou shimasu', 'こたえます|kotaemasu'], 'わすれます = esquecer.'),
    X.f('Memorizo os kanji.', 'かんじを ＿＿＿＿。', ['おぼえます|oboemasu', 'わすれます|wasuremasu', 'ききます|kikimasu'], 'おぼえます = memorizar.'),
    X.o('Amanhã tem prova.', ['あした|ashita', 'しけんが|shiken ga', 'あります|arimasu'], ['しけんを|shiken o'], 'あした しけんが あります。 Eventos também usam あります.')
  ]),
  L('c11l11', 'Trabalho e profissões', '職', 'vocab', [
    'Para dizer a profissão, basta profissão + です: いしゃです (sou médico).',
    'Ao perguntar a profissão de alguém, é mais natural perguntar o que a pessoa faz: おしごとは なんですか.',
    'Nas profissões, a forma com さん é usada para falar dos outros com educação: おまわりさん (policial, carinhoso), はいしゃさん (dentista).'
  ], 'しごと também quer dizer “o trabalho de hoje”: しごとに いきます = vou trabalhar.', [
    ['shigoto', 'しごと', 'shigoto', 'trabalho, emprego', 'おしごとは なんですか = qual é o seu trabalho?', null, '仕事'],
    ['kaisha', 'かいしゃ', 'kaisha', 'empresa', '', null, '会社'],
    ['kangoshi', 'かんごし', 'kangoshi', 'enfermeiro(a)', '', null, '看護師'],
    ['keisatsukan', 'けいさつかん', 'keisatsukan', 'policial', 'Coloquial e carinhoso: おまわりさん.', null, '警察官'],
    ['enjinia', 'エンジニア', 'enjinia', 'engenheiro(a)', ''],
    ['tenin', 'てんいん', "ten'in", 'atendente de loja', '', null, '店員'],
    ['bengoshi', 'べんごし', 'bengoshi', 'advogado(a)', '', null, '弁護士'],
    ['shufu', 'しゅふ', 'shufu', 'dono(a) de casa', '', null, '主婦'],
    ['kyoushi', 'きょうし', 'kyoushi', 'professor (profissão)', 'Para falar da própria profissão: きょうしです. Para chamar o professor: せんせい.', null, '教師'],
    ['zangyou', 'ざんぎょう', 'zangyou', 'hora extra', 'Muito comum na cultura de trabalho japonesa.', null, '残業']
  ], [
    ['ははは かんごしです。', 'haha wa kangoshi desu.', 'Minha mãe é enfermeira.'],
    ['きょうは ざんぎょうが あります。', 'kyou wa zangyou ga arimasu.', 'Hoje tenho hora extra.']
  ], [
    X.s('Você é professor e conta sua profissão. O que diz?', ['きょうしです|kyoushi desu', 'せんせいです|sensei desu', 'がくせいです|gakusei desu'], 'Para a própria profissão: きょうし. せんせい é um título de respeito, não se usa para si mesmo.'),
    X.s('Como perguntar com educação qual é o trabalho de alguém?', ['おしごとは なんですか|oshigoto wa nan desu ka', 'しごとを しますか|shigoto o shimasu ka', 'かいしゃは どこ|kaisha wa doko'], 'おしごとは なんですか = qual é o seu trabalho?'),
    X.f('Hoje tenho hora extra.', 'きょうは ＿＿＿＿が あります。', ['ざんぎょう|zangyou', 'かいしゃ|kaisha', 'てんいん|ten\'in'], 'ざんぎょう = hora extra.'),
    X.e('Contando sua profissão a um colega:', ['わたしは|watashi wa', 'せんせいです|sensei desu'], 1, 'せんせい é título de respeito para os outros. Para si: きょうしです.')
  ]),
  L('c11l12', 'Meses e datas', '暦', 'vocab', [
    'Os meses são número + がつ: いちがつ (janeiro), にがつ (fevereiro)… Atenção a três leituras: しがつ (abril), しちがつ (julho) e くがつ (setembro).',
    'Os dias do mês de 1 a 10 têm palavras especiais: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか.',
    'Do 11 em diante é número + にち (じゅういちにち), com exceções: 14 じゅうよっか, 20 はつか e 24 にじゅうよっか.'
  ], 'ついたち (dia 1) não tem nada a ver com いち: é uma palavra antiga que significa “início da lua”.', [
    ['shigatsu', 'しがつ', 'shigatsu', 'abril', 'Nunca よんがつ.', null, '四月'],
    ['shichigatsu', 'しちがつ', 'shichigatsu', 'julho', 'Nunca なながつ.', null, '七月'],
    ['kugatsu', 'くがつ', 'kugatsu', 'setembro', 'Nunca きゅうがつ.', null, '九月'],
    ['tsuitachi', 'ついたち', 'tsuitachi', 'dia 1', 'Palavra especial.', null, '一日'],
    ['futsuka', 'ふつか', 'futsuka', 'dia 2 / dois dias', 'Também significa “dois dias” de duração.', null, '二日'],
    ['mikka', 'みっか', 'mikka', 'dia 3 / três dias', '', null, '三日'],
    ['youka', 'ようか', 'youka', 'dia 8', 'Cuidado: よっか é dia 4!', null, '八日'],
    ['tooka', 'とおか', 'tooka', 'dia 10', '', null, '十日'],
    ['hatsuka', 'はつか', 'hatsuka', 'dia 20', 'Exceção famosa.', null, '二十日'],
    ['tanjoubi', 'たんじょうび', 'tanjoubi', 'aniversário', 'たんじょうびは いつですか = quando é seu aniversário?', null, '誕生日']
  ], [
    ['たんじょうびは しちがつ ようかです。', 'tanjoubi wa shichigatsu youka desu.', 'Meu aniversário é em 8 de julho.'],
    ['しごとは ついたちから はじまります。', 'shigoto wa tsuitachi kara hajimarimasu.', 'O trabalho começa no dia 1.']
  ], [
    X.s('Como se diz “abril”?', ['しがつ|shigatsu', 'よんがつ|yongatsu', 'よがつ|yogatsu'], 'Abril é sempre しがつ.'),
    X.s('Qual dia é はつか?', ['20', '8', '2'], 'はつか = dia 20. ようか = 8; ふつか = 2.'),
    X.f('Meu aniversário é dia 1º de setembro.', 'たんじょうびは くがつ ＿＿＿＿です。', ['ついたち|tsuitachi', 'いちにち|ichinichi', 'いちか|ichika'], 'Dia 1 = ついたち. いちにち significa “um dia (de duração)”.'),
    X.e('Data: 9 de setembro', ['きゅうがつ|kyuugatsu', 'ここのか|kokonoka'], 0, 'Setembro é くがつ. ここのか (dia 9) está certo.')
  ]),
  L('c11l13', 'Contando objetos: ひとつ, ふたつ', '個', 'vocab', [
    'Para contar coisas em geral (frutas, pedidos, objetos sem formato definido), o japonês usa números próprios até 10: ひとつ, ふたつ, みっつ…',
    'Eles servem também para pedir em lojas e restaurantes: コーヒーを ふたつ ください (Dois cafés, por favor). O contador vem depois do objeto.',
    'Depois de 10, usa-se o número normal: じゅういち, じゅうに… E para perguntar quantos: いくつ.'
  ], 'Ordem natural: objeto + を + quantidade + verbo. りんごを みっつ かいました = comprei três maçãs.', [
    ['hitotsu', 'ひとつ', 'hitotsu', '1 (objeto)', '', null, '一つ'],
    ['futatsu', 'ふたつ', 'futatsu', '2 (objetos)', '', null, '二つ'],
    ['mittsu', 'みっつ', 'mittsu', '3 (objetos)', 'Com pausa: mit-tsu.', null, '三つ'],
    ['yottsu', 'よっつ', 'yottsu', '4 (objetos)', '', null, '四つ'],
    ['itsutsu', 'いつつ', 'itsutsu', '5 (objetos)', '', null, '五つ'],
    ['muttsu', 'むっつ', 'muttsu', '6 (objetos)', '', null, '六つ'],
    ['nanatsu', 'ななつ', 'nanatsu', '7 (objetos)', '', null, '七つ'],
    ['yattsu', 'やっつ', 'yattsu', '8 (objetos)', '', null, '八つ'],
    ['kokonotsu', 'ここのつ', 'kokonotsu', '9 (objetos)', '', null, '九つ'],
    ['too', 'とお', 'too', '10 (objetos)', 'Sem つ no final.', null, '十']
  ], [
    ['りんごを みっつ かいました。', 'ringo o mittsu kaimashita.', 'Comprei três maçãs.'],
    ['コーヒーを ふたつ ください。', 'koohii o futatsu kudasai.', 'Dois cafés, por favor.']
  ], [
    X.s('Você quer quatro bolinhos. Como pede?', ['よっつ ください|yottsu kudasai', 'よん ください|yon kudasai', 'よにん ください|yonin kudasai'], 'Para objetos, use よっつ. よにん é para pessoas.'),
    X.o('Dois cafés, por favor.', ['コーヒーを|koohii o', 'ふたつ|futatsu', 'ください|kudasai'], ['ふたり|futari'], 'Objeto + を + quantidade + ください.'),
    X.f('Comprei três maçãs.', 'りんごを ＿＿＿ かいました。', ['みっつ|mittsu', 'さん|san', 'さんにん|sannin'], 'Objetos: みっつ.'),
    X.e('Pedindo dez bolinhos:', ['だんごを|dango o', 'とおつ|tootsu', 'ください|kudasai'], 1, '10 objetos é só とお, sem つ.')
  ]),
  L('c11l14', 'Contadores: pessoas, papéis, garrafas, animais', '匹', 'vocab', [
    'Além de ひとつ/ふたつ, o japonês tem contadores conforme a forma da coisa: 〜にん (pessoas), 〜まい (coisas finas como papel e camisetas), 〜ほん (coisas compridas como garrafas e canetas), 〜ひき (animais pequenos), 〜さつ (livros), 〜だい (máquinas e veículos).',
    'Pessoas têm exceções: ひとり (1 pessoa), ふたり (2 pessoas); de 3 em diante, 〜にん: さんにん, よにん.',
    'Alguns contadores mudam o som: いっぽん, にほん, さんぼん; いっぴき, にひき, さんびき. São irregularidades que vêm com a prática.'
  ], 'Se esquecer o contador certo, ひとつ, ふたつ… quase sempre é entendido. Mas pessoas nunca se contam com ひとつ!', [
    ['hitori', 'ひとり', 'hitori', '1 pessoa; sozinho', 'ひとりで = sozinho.', null, '一人'],
    ['yonin', 'よにん', 'yonin', '4 pessoas', 'Não é よんにん.', null, '四人'],
    ['nannin', 'なんにん', 'nannin', 'quantas pessoas?', '', null, '何人'],
    ['ichimai', 'いちまい', 'ichimai', '1 (coisa fina: papel, foto, camiseta)', '', null, '一枚'],
    ['ippon', 'いっぽん', 'ippon', '1 (coisa comprida: garrafa, caneta)', '2 = にほん, 3 = さんぼん.', null, '一本'],
    ['sanbon', 'さんぼん', 'sanbon', '3 (coisas compridas)', 'ほん vira ぼん depois de さん.', null, '三本'],
    ['ippiki', 'いっぴき', 'ippiki', '1 (animal pequeno)', 'Para gatos, cães, peixes. 3 = さんびき.', null, '一匹'],
    ['issatsu', 'いっさつ', 'issatsu', '1 (livro, caderno)', '', null, '一冊'],
    ['ichidai', 'いちだい', 'ichidai', '1 (máquina, carro)', '', null, '一台'],
    ['nankai', 'なんかい', 'nankai', 'quantas vezes?', '〜かい = vezes. いっかい = uma vez.', null, '何回']
  ], [
    ['ねこが にひき います。', 'neko ga nihiki imasu.', 'Tenho dois gatos.'],
    ['ビールを にほん ください。', 'biiru o nihon kudasai.', 'Duas cervejas (garrafas), por favor.']
  ], [
    X.s('Qual contador se usa para camisetas e folhas de papel?', ['〜まい|~mai', '〜ほん|~hon', '〜ひき|~hiki'], 'Coisas finas e planas: 〜まい.'),
    X.s('Como se diz “quatro pessoas”?', ['よにん|yonin', 'よっつ|yottsu', 'よんにん|yonnin'], 'Exceção: よにん.'),
    X.f('Tenho dois gatos.', 'ねこが ＿＿＿ います。', ['にひき|nihiki', 'ふたり|futari', 'にまい|nimai'], 'Animais pequenos: 〜ひき.'),
    X.e('Duas pessoas, por favor (no restaurante):', ['ふたつ|futatsu', 'です|desu'], 0, 'Pessoas: ふたり. Nunca ふたつ.')
  ])
  );
})();
