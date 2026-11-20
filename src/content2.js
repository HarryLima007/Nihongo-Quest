/* ==========================================================
   CONTEÚDO 2.0 — Academia Auditiva (聴解アカデミー)
   Identificadores estáveis: "<pacote>:<chave>". Não renomeie chaves já
   publicadas, pois elas guardam o progresso do usuário.
   jp = escrita natural · say = leitura em kana usada pela voz
   ========================================================== */
const LEVELS = [
  { id: 'iniciante', name: 'Iniciante', jp: 'しょきゅう', desc: 'Palavras isoladas, cumprimentos, números e expressões simples.' },
  { id: 'intermediario', name: 'Intermediário', jp: 'ちゅうきゅう', desc: 'Frases curtas, perguntas e respostas, expressões do dia a dia e diálogos curtos.' },
  { id: 'avancado', name: 'Avançado', jp: 'じょうきゅう', desc: 'Frases mais longas, conversas naturais e menos pistas.' }
];
const LV = { iniciante: 1, intermediario: 2, avancado: 3 };

/* Pacotes de itens auditivos. group: palavra | expressao | frase | anime */
const AUDIO_PACKS = [
{
  id: 'aud-pal', title: 'Palavras para o ouvido', group: 'palavra',
  items: [
    { k: 'neko', jp: '猫', say: 'ねこ', ro: 'neko', pt: 'gato', lv: 1, note: 'Palavra muito comum. ねこ também aparece em nomes de personagens.' },
    { k: 'inu', jp: '犬', say: 'いぬ', ro: 'inu', pt: 'cachorro', lv: 1, note: 'Curta e fácil de ouvir: i-nu.' },
    { k: 'kawaii', jp: 'かわいい', say: 'かわいい', ro: 'kawaii', pt: 'fofo, bonitinho', lv: 1, note: 'Escute o “i” alongado no final: kawa-ii.' },
    { k: 'kowai', jp: '怖い', say: 'こわい', ro: 'kowai', pt: 'assustador / estou com medo', lv: 1, note: 'Parece com かわいい, mas começa com “ko” e tem um “i” só: ko-wa-i.' },
    { k: 'hayaku', jp: '早く', say: 'はやく', ro: 'hayaku', pt: 'rápido! / depressa!', lv: 1, note: 'Muito usado para apressar alguém: はやく！' },
    { k: 'dame', jp: 'だめ', say: 'だめ', ro: 'dame', pt: 'não pode / não!', lv: 1, note: 'Proíbe ou recusa algo. Bem informal.' },
    { k: 'uso', jp: 'うそ', say: 'うそ', ro: 'uso', pt: 'mentira! / não acredito!', lv: 1, note: 'Literalmente “mentira”, mas é muito usado como espanto: “Sério?!”.' },
    { k: 'kite', jp: '来て', say: 'きて', ro: 'kite', pt: 'venha!', lv: 1, note: 'Sem pausa no meio: ki-te.' },
    { k: 'kitte', jp: '切手', say: 'きって', ro: 'kitte', pt: 'selo (de carta)', lv: 1, note: 'Tem uma pequena pausa antes do “te”: kit-te. Essa pausa muda a palavra!' },
    { k: 'tori', jp: '鳥', say: 'とり', ro: 'tori', pt: 'pássaro', lv: 1, note: 'Vogal “o” curta: to-ri.' },
    { k: 'toori', jp: '通り', say: 'とおり', ro: 'toori', pt: 'rua, avenida', lv: 1, note: 'Vogal “o” longa: too-ri.' },
    { k: 'yuki', jp: '雪', say: 'ゆき', ro: 'yuki', pt: 'neve', lv: 1, note: '“u” curto: yu-ki.' },
    { k: 'yuuki', jp: '勇気', say: 'ゆうき', ro: 'yuuki', pt: 'coragem', lv: 1, note: '“u” longo: yuu-ki. Palavra comum em falas de heróis.' },
    { k: 'obasan', jp: 'おばさん', say: 'おばさん', ro: 'obasan', pt: 'tia / senhora (de meia-idade)', lv: 2, note: '“ba” curto.' },
    { k: 'obaasan', jp: 'おばあさん', say: 'おばあさん', ro: 'obaasan', pt: 'avó / senhora idosa', lv: 2, note: '“baa” longo. Trocar os dois pode causar uma situação engraçada!' },
    { k: 'ojisan', jp: 'おじさん', say: 'おじさん', ro: 'ojisan', pt: 'tio / senhor (de meia-idade)', lv: 2, note: '“ji” curto.' },
    { k: 'ojiisan', jp: 'おじいさん', say: 'おじいさん', ro: 'ojiisan', pt: 'avô / senhor idoso', lv: 2, note: '“jii” longo.' },
    { k: 'biyouin', jp: '美容院', say: 'びよういん', ro: 'biyouin', pt: 'salão de beleza', lv: 2, note: 'bi-yoo-in. Compare com びょういん (byouin), hospital.' },
    { k: 'saka', jp: '坂', say: 'さか', ro: 'saka', pt: 'ladeira', lv: 2, note: 'Sem pausa: sa-ka.' },
    { k: 'sakka', jp: '作家', say: 'さっか', ro: 'sakka', pt: 'escritor(a)', lv: 2, note: 'Com pausa: sak-ka.' },
    { k: 'oto', jp: '音', say: 'おと', ro: 'oto', pt: 'som, barulho', lv: 2, note: 'Sem pausa: o-to.' },
    { k: 'otto', jp: '夫', say: 'おっと', ro: 'otto', pt: 'marido', lv: 2, note: 'Com pausa: ot-to.' },
    { k: 'shujin', jp: '主人', say: 'しゅじん', ro: 'shujin', pt: 'marido / dono da casa', lv: 3, note: '“shu” curto.' },
    { k: 'shuujin', jp: '囚人', say: 'しゅうじん', ro: 'shuujin', pt: 'prisioneiro', lv: 3, note: '“shuu” longo. Um detalhe pequeno no som, uma diferença enorme no sentido.' },
    { k: 'koko', jp: 'ここ', say: 'ここ', ro: 'koko', pt: 'aqui', lv: 3, note: 'Duas sílabas curtas: ko-ko.' },
    { k: 'koukou', jp: '高校', say: 'こうこう', ro: 'koukou', pt: 'ensino médio (escola)', lv: 3, note: 'Duas sílabas longas: koo-koo. Aparece muito em animes escolares.' }
  ]
},
{
  id: 'aud-expr', title: 'Expressões do Cotidiano', group: 'expressao',
  items: [
    { k: 'sugoi', jp: 'すごい', say: 'すごい', ro: 'sugoi', pt: 'Incrível! / Uau!', lv: 1, when: 'Para elogiar ou mostrar espanto com algo impressionante.', formal: 'Casual. Mais educado: すごいですね (sugoi desu ne).', ex: { jp: 'その絵、すごい！', ro: 'sono e, sugoi!', pt: 'Esse desenho é incrível!' } },
    { k: 'majide', jp: 'まじで？', say: 'まじで？', ro: 'maji de?', pt: 'Sério?', lv: 2, when: 'Reação de surpresa entre amigos.', formal: 'Gíria, bem informal. Não use com professores ou chefes.', ex: { jp: 'まじで？明日テストなの？', ro: 'maji de? ashita tesuto na no?', pt: 'Sério? A prova é amanhã?' } },
    { k: 'yatta', jp: 'やった！', say: 'やった！', ro: 'yatta!', pt: 'Consegui! / Eba!', lv: 1, when: 'Para comemorar uma conquista ou boa notícia.', formal: 'Informal, mas aceito em quase qualquer situação de comemoração.', ex: { jp: 'やった！合格した！', ro: 'yatta! goukaku shita!', pt: 'Eba! Passei na prova!' } },
    { k: 'shikatanai', jp: '仕方ない', say: 'しかたない', ro: 'shikata nai', pt: 'Não tem jeito.', lv: 2, when: 'Quando algo não pode ser mudado e é preciso aceitar.', formal: 'Neutro. Mais educado: 仕方ありません (shikata arimasen).', ex: { jp: '雨か…仕方ないね。', ro: 'ame ka… shikata nai ne.', pt: 'Chuva, é? Não tem jeito.' } },
    { k: 'okaeri', jp: 'おかえり', say: 'おかえり', ro: 'okaeri', pt: 'Bem-vindo(a) de volta!', lv: 1, when: 'Resposta para quem chega em casa e diz ただいま.', formal: 'Informal. Mais educado: おかえりなさい (okaeri nasai).', ex: { jp: 'ただいま！ … おかえり！', ro: 'tadaima! … okaeri!', pt: 'Cheguei! … Bem-vindo de volta!' } },
    { k: 'tadaima', jp: 'ただいま', say: 'ただいま', ro: 'tadaima', pt: 'Cheguei! (ao voltar para casa)', lv: 1, when: 'Dito ao entrar em casa. A resposta é おかえり.', formal: 'Serve para todas as situações.', ex: { jp: 'ただいま！', ro: 'tadaima!', pt: 'Cheguei!' } },
    { k: 'ittekimasu', jp: '行ってきます', say: 'いってきます', ro: 'ittekimasu', pt: 'Já vou! (e volto)', lv: 2, when: 'Dito ao sair de casa. A resposta é いってらっしゃい.', formal: 'Serve para todas as situações.', ex: { jp: '行ってきます！', ro: 'ittekimasu!', pt: 'Estou indo!' } },
    { k: 'itterasshai', jp: '行ってらっしゃい', say: 'いってらっしゃい', ro: 'itterasshai', pt: 'Vá e volte bem!', lv: 2, when: 'Resposta para quem sai de casa dizendo いってきます.', formal: 'Serve para todas as situações.', ex: { jp: 'いってらっしゃい！気をつけてね。', ro: 'itterasshai! ki o tsukete ne.', pt: 'Vá e volte bem! Cuidado, viu?' } },
    { k: 'hontou', jp: '本当？', say: 'ほんとう？', ro: 'hontou?', pt: 'É verdade? / Sério?', lv: 1, when: 'Para confirmar algo surpreendente.', formal: 'Informal. Mais educado: 本当ですか (hontou desu ka). Na fala rápida vira ほんと (honto).', ex: { jp: '本当？うれしい！', ro: 'hontou? ureshii!', pt: 'É verdade? Que alegria!' } },
    { k: 'nani', jp: '何？', say: 'なに？', ro: 'nani?', pt: 'O quê?', lv: 1, when: 'Quando você não entendeu ou ficou surpreso.', formal: 'Informal e pode soar brusco. Mais educado: 何ですか (nan desu ka).', ex: { jp: '何？もう一回言って。', ro: 'nani? mou ikkai itte.', pt: 'O quê? Fala de novo.' } },
    { k: 'wakatta', jp: '分かった', say: 'わかった', ro: 'wakatta', pt: 'Entendi. / Tá bom.', lv: 1, when: 'Para confirmar que entendeu ou concordou.', formal: 'Informal. A forma educada é わかりました (wakarimashita), que você viu na Academia.', ex: { jp: '分かった、すぐ行く！', ro: 'wakatta, sugu iku!', pt: 'Tá bom, já vou!' } },
    { k: 'urusai', jp: 'うるさい', say: 'うるさい', ro: 'urusai', pt: 'Que barulho! / Cala a boca!', lv: 2, when: 'Reclamação de barulho ou de alguém chato. Muito comum em animes.', formal: 'Rude quando dito a uma pessoa. Use com cuidado!', ex: { jp: 'うるさいな！', ro: 'urusai na!', pt: 'Que barulho, hein!' } },
    { k: 'naruhodo', jp: 'なるほど', say: 'なるほど', ro: 'naruhodo', pt: 'Entendi! / Faz sentido.', lv: 2, when: 'Quando uma explicação finalmente faz sentido.', formal: 'Neutro. Com superiores, prefira そうですか (sou desu ka).', ex: { jp: 'なるほど、そういうことか。', ro: 'naruhodo, sou iu koto ka.', pt: 'Ah, então é isso.' } },
    { k: 'chottomatte', jp: 'ちょっと待って', say: 'ちょっとまって', ro: 'chotto matte', pt: 'Espera um pouco!', lv: 1, when: 'Para pedir que alguém espere.', formal: 'Informal. Mais educado: 少々お待ちください (shoushou omachi kudasai), muito usado em lojas.', ex: { jp: 'ちょっと待って！今行く！', ro: 'chotto matte! ima iku!', pt: 'Espera um pouco! Já vou!' } },
    { k: 'yoshi', jp: 'よし！', say: 'よし！', ro: 'yoshi!', pt: 'Certo! / Vamos lá!', lv: 2, when: 'Para se animar antes de começar algo ou aprovar algo.', formal: 'Informal, geralmente falado para si mesmo.', ex: { jp: 'よし、始めよう！', ro: 'yoshi, hajimeyou!', pt: 'Certo, vamos começar!' } },
    { k: 'omedetou', jp: 'おめでとう', say: 'おめでとう', ro: 'omedetou', pt: 'Parabéns!', lv: 1, when: 'Aniversários, conquistas e comemorações.', formal: 'Informal. Mais educado: おめでとうございます (omedetou gozaimasu).', ex: { jp: '誕生日おめでとう！', ro: 'tanjoubi omedetou!', pt: 'Feliz aniversário!' } },
    { k: 'otsukaresama', jp: 'お疲れ様', say: 'おつかれさま', ro: 'otsukaresama', pt: 'Bom trabalho! / Obrigado pelo esforço.', lv: 3, when: 'Ao fim de um trabalho, treino ou aula, reconhecendo o esforço de todos.', formal: 'Entre colegas. No trabalho use お疲れ様です (otsukaresama desu).', ex: { jp: '今日もお疲れ様！', ro: 'kyou mo otsukaresama!', pt: 'Bom trabalho hoje também!' } },
    { k: 'iine', jp: 'いいね！', say: 'いいね！', ro: 'ii ne!', pt: 'Que legal! / Boa ideia!', lv: 1, when: 'Para aprovar uma ideia ou elogiar algo.', formal: 'Informal.', ex: { jp: '映画？いいね！', ro: 'eiga? ii ne!', pt: 'Cinema? Boa ideia!' } },
    { k: 'souda', jp: 'そうだね', say: 'そうだね', ro: 'sou da ne', pt: 'É mesmo. / Pois é.', lv: 2, when: 'Para concordar com alguém numa conversa.', formal: 'Informal. Mais educado: そうですね (sou desu ne).', ex: { jp: '暑いね。 … そうだね。', ro: 'atsui ne. … sou da ne.', pt: 'Que calor, né? … Pois é.' } }
  ],
  refs: ['c1l4:ganbatte', 'c1l4:daijoubu']
},
{
  id: 'aud-fra', title: 'Frases faladas', group: 'frase',
  items: [
    { k: 'genkidesuka', jp: '元気ですか？', say: 'げんきですか？', ro: 'genki desu ka?', pt: 'Você está bem? / Como vai?', lv: 2, note: '元気 (genki) = disposição, saúde. Entre amigos: 元気？ (genki?).' },
    { k: 'genkidesu', jp: '元気です。', say: 'げんきです。', ro: 'genki desu.', pt: 'Estou bem.', lv: 2, note: 'A resposta mais comum para 元気ですか？' },
    { k: 'onamaewa', jp: 'お名前は？', say: 'おなまえは？', ro: 'onamae wa?', pt: 'Qual é o seu nome?', lv: 2, note: 'お名前 (onamae) = seu nome (educado) + は. A pergunta fica subentendida.' },
    { k: 'dokonisunde', jp: 'どこに住んでいますか？', say: 'どこにすんでいますか？', ro: 'doko ni sunde imasu ka?', pt: 'Onde você mora?', lv: 2, note: 'どこ (doko) = onde. 住んでいます (sunde imasu) = moro.' },
    { k: 'korewanan', jp: 'これは何ですか？', say: 'これはなんですか？', ro: 'kore wa nan desu ka?', pt: 'O que é isto?', lv: 2, note: '何 vira “nan” antes de です.' },
    { k: 'toire', jp: 'トイレはどこですか？', say: 'トイレはどこですか？', ro: 'toire wa doko desu ka?', pt: 'Onde fica o banheiro?', lv: 2, note: 'トイレ (toire) vem do inglês “toilet”.' },
    { k: 'ikura', jp: 'いくらですか？', say: 'いくらですか？', ro: 'ikura desu ka?', pt: 'Quanto custa?', lv: 2, note: 'Essencial em lojas e viagens.' },
    { k: 'onakasuita', jp: 'お腹すいた。', say: 'おなかすいた。', ro: 'onaka suita.', pt: 'Estou com fome.', lv: 2, note: 'Literalmente “a barriga esvaziou”. Muito comum em animes!' },
    { k: 'isshoniikou', jp: '一緒に行こう！', say: 'いっしょにいこう！', ro: 'issho ni ikou!', pt: 'Vamos juntos!', lv: 2, note: '一緒に (issho ni) = juntos. 行こう (ikou) = vamos.' },
    { k: 'nanishiteru', jp: '何してるの？', say: 'なにしてるの？', ro: 'nani shiteru no?', pt: 'O que você está fazendo?', lv: 2, note: 'Forma falada e informal. の no final deixa a pergunta mais suave.' },
    { k: 'daisuki', jp: '大好き！', say: 'だいすき！', ro: 'daisuki!', pt: 'Eu adoro! / Gosto muito!', lv: 2, note: '大 (dai) = grande + 好き (suki) = gostar. Serve para coisas e pessoas.' },
    { k: 'makasete', jp: '任せて！', say: 'まかせて！', ro: 'makasete!', pt: 'Deixa comigo!', lv: 2, note: 'Frase clássica de personagem confiante.' },
    { k: 'eiga', jp: '明日、一緒に映画を見に行かない？', say: 'あした、いっしょにえいがをみにいかない？', ro: 'ashita, issho ni eiga o mi ni ikanai?', pt: 'Quer ir ver um filme comigo amanhã?', lv: 3, note: 'Convidar usando a forma negativa (行かない？, “não vamos?”) é natural e gentil.' },
    { k: 'shukudai', jp: '宿題、もう終わった？', say: 'しゅくだい、もうおわった？', ro: 'shukudai, mou owatta?', pt: 'Já terminou a lição de casa?', lv: 3, note: 'もう (mou) = já. 終わった (owatta) = terminou.' },
    { k: 'akiramenai', jp: '絶対に諦めない！', say: 'ぜったいにあきらめない！', ro: 'zettai ni akiramenai!', pt: 'Eu nunca vou desistir!', lv: 3, note: '絶対に (zettai ni) = de jeito nenhum / com certeza. 諦めない = não desistir.' },
    { k: 'ame', jp: '今日は雨だから、家でゲームしよう。', say: 'きょうはあめだから、いえでゲームしよう。', ro: 'kyou wa ame dakara, ie de geemu shiyou.', pt: 'Hoje está chovendo, então vamos jogar videogame em casa.', lv: 3, note: 'だから (dakara) = então, por isso. で (de) marca o lugar da ação.' },
    { k: 'okureru', jp: 'ごめん、ちょっと遅れる。', say: 'ごめん、ちょっとおくれる。', ro: 'gomen, chotto okureru.', pt: 'Desculpa, vou me atrasar um pouco.', lv: 3, note: '遅れる (okureru) = atrasar-se.' },
    { k: 'ramen', jp: 'このラーメン、めちゃくちゃおいしい！', say: 'このラーメン、めちゃくちゃおいしい！', ro: 'kono raamen, mechakucha oishii!', pt: 'Este lámen está gostoso demais!', lv: 3, note: 'めちゃくちゃ (mechakucha) = “demais”, bem informal.' },
    { k: 'mamoru', jp: '何があっても、君を守る。', say: 'なにがあっても、きみをまもる。', ro: 'nani ga atte mo, kimi o mamoru.', pt: 'Aconteça o que acontecer, vou te proteger.', lv: 3, note: '何があっても = aconteça o que acontecer. 守る (mamoru) = proteger. Clima de anime!' },
    { k: 'ekimade', jp: '駅までどうやって行けばいいですか？', say: 'えきまでどうやっていけばいいですか？', ro: 'eki made dou yatte ikeba ii desu ka?', pt: 'Como faço para chegar à estação?', lv: 3, note: 'まで (made) = até. どうやって (dou yatte) = de que jeito.' }
  ]
},
{
  id: 'aud-ani', title: 'Detetive dos Animes', group: 'anime',
  /* kind: palavra = palavra comum do japonês · titulo = título de obra · nome = nome próprio / técnica criada para a obra
     clue = pista do caso (sem entregar a resposta) · parts = composição real · ctx = onde aparece / interpretação */
  items: [
    { k: 'akatsuki', jp: '暁', say: 'あかつき', ro: 'akatsuki', pt: 'amanhecer, alvorada', kind: 'palavra', lv: 1, clue: 'Nome de uma organização famosa em Naruto. A palavra fala de um momento do dia.', note: 'Palavra que representa o momento em que o dia começa a clarear.', ctx: 'Em Naruto, Akatsuki é o nome próprio da organização. O significado real da palavra é “alvorada”. Não é a junção de 赤 (aka, vermelho) e 月 (tsuki, lua): “lua vermelha” seria 赤い月 (akai tsuki).', ex: { jp: '暁の空', ro: 'akatsuki no sora', pt: 'o céu do amanhecer' } },
    { k: 'kage', jp: '影', say: 'かげ', ro: 'kage', pt: 'sombra', kind: 'palavra', lv: 1, clue: 'Aparece em técnicas de clone e no título dos líderes de vilas ninja.', note: 'Sombra projetada por algo ou alguém.', ctx: 'Aparece em 影分身 (kage bunshin) e em 火影 (Hokage), ambos de Naruto.', ex: { jp: '木の影', ro: 'ki no kage', pt: 'a sombra da árvore' } },
    { k: 'hikari', jp: '光', say: 'ひかり', ro: 'hikari', pt: 'luz', kind: 'palavra', lv: 1, clue: 'É o nome da sua mascote aqui na Academia!', note: 'Luz, brilho. Também é usado como nome de pessoa.', ctx: 'Nome comum para personagens e também para um trem-bala japonês (Hikari).', ex: { jp: '光の魔法', ro: 'hikari no mahou', pt: 'magia de luz' } },
    { k: 'kuro', jp: '黒', say: 'くろ', ro: 'kuro', pt: 'preto (cor)', kind: 'palavra', lv: 1, clue: 'Uma cor muito usada em nomes de personagens sombrios.', note: 'Substantivo da cor. Como adjetivo: 黒い (kuroi).', ctx: 'Aparece em nomes como 黒猫 (kuroneko, gato preto).', ex: { jp: '黒い猫', ro: 'kuroi neko', pt: 'gato preto' } },
    { k: 'shiro', jp: '白', say: 'しろ', ro: 'shiro', pt: 'branco (cor)', kind: 'palavra', lv: 1, clue: 'A cor oposta à de “kuro”.', note: 'Substantivo da cor. Como adjetivo: 白い (shiroi).', ctx: 'Atenção ao ouvido: しろ também pode ser 城 (castelo). O contexto mostra qual é.', ex: { jp: '白い雪', ro: 'shiroi yuki', pt: 'neve branca' } },
    { k: 'tsuki', jp: '月', say: 'つき', ro: 'tsuki', pt: 'lua', kind: 'palavra', lv: 1, clue: 'Brilha no céu à noite.', note: 'Lua. Também significa “mês”.', ctx: '“Lua vermelha” é 赤い月 (akai tsuki), que é diferente de 暁 (akatsuki).', ex: { jp: '月がきれいですね。', ro: 'tsuki ga kirei desu ne.', pt: 'A lua está linda, não é?' } },
    { k: 'yume', jp: '夢', say: 'ゆめ', ro: 'yume', pt: 'sonho', kind: 'palavra', lv: 1, clue: 'Todo protagonista de anime tem um. Também acontece quando você dorme.', note: 'Sonho, tanto ao dormir quanto como objetivo de vida.', ctx: 'Frase típica: 夢を叶える (yume o kanaeru), realizar um sonho.', ex: { jp: '僕の夢', ro: 'boku no yume', pt: 'o meu sonho' } },
    { k: 'sora', jp: '空', say: 'そら', ro: 'sora', pt: 'céu', kind: 'palavra', lv: 1, clue: 'Fica lá em cima, azul de dia.', note: 'Céu. Também é um nome próprio comum.', ctx: 'Muito usado em títulos e nomes de personagens.', ex: { jp: '青い空', ro: 'aoi sora', pt: 'céu azul' } },
    { k: 'hi', jp: '火', say: 'ひ', ro: 'hi', pt: 'fogo', kind: 'palavra', lv: 1, clue: 'Um dos elementos clássicos. Queima!', note: 'Fogo. Em palavras compostas pode ser lido “ka” ou “ho”.', ctx: 'Em 火影 (Hokage) é lido “ho”: “sombra do fogo”.', ex: { jp: '火を付ける', ro: 'hi o tsukeru', pt: 'acender o fogo' } },
    { k: 'honoo', jp: '炎', say: 'ほのお', ro: 'honoo', pt: 'chama, labareda', kind: 'palavra', lv: 2, clue: 'Mais intenso que uma faísca. Personagens de fogo adoram essa palavra.', note: 'Chama viva, labareda.', ctx: 'Comum em nomes de golpes de personagens de fogo.', ex: { jp: '青い炎', ro: 'aoi honoo', pt: 'chama azul' } },
    { k: 'kaminari', jp: '雷', say: 'かみなり', ro: 'kaminari', pt: 'trovão, raio', kind: 'palavra', lv: 2, clue: 'Faz barulho durante a tempestade.', note: 'Trovão ou raio. Em compostos é lido “rai”.', ctx: 'Em 雷切 (Raikiri) é lido “rai”.', ex: { jp: '雷が鳴る', ro: 'kaminari ga naru', pt: 'o trovão ressoa' } },
    { k: 'oni', jp: '鬼', say: 'おに', ro: 'oni', pt: 'ogro, demônio (do folclore)', kind: 'palavra', lv: 1, clue: 'Criatura com chifres do folclore japonês.', note: 'Criatura do folclore japonês, geralmente com chifres. Também é o “pegador” na brincadeira de pega-pega.', ctx: 'É o primeiro kanji de 鬼滅の刃 (Kimetsu no Yaiba), onde é lido “ki”.', ex: { jp: '鬼ごっこ', ro: 'onigokko', pt: 'pega-pega (brincadeira)' } },
    { k: 'katana', jp: '刀', say: 'かたな', ro: 'katana', pt: 'espada japonesa', kind: 'palavra', lv: 1, clue: 'A arma dos samurais.', note: 'Espada de lâmina curva com um só fio.', ctx: 'Em japonês, katana é qualquer espada desse tipo, não um nome especial.', ex: { jp: '刀を抜く', ro: 'katana o nuku', pt: 'desembainhar a espada' } },
    { k: 'samurai', jp: '侍', say: 'さむらい', ro: 'samurai', pt: 'samurai, guerreiro', kind: 'palavra', lv: 1, clue: 'Guerreiro do Japão antigo.', note: 'Classe de guerreiros do Japão feudal.', parts: [['侍う', 'saburau', 'servir (verbo antigo de onde a palavra vem)']], ctx: 'A palavra vem do verbo antigo さぶらう (saburau), “servir”: o samurai era quem servia a um senhor.', ex: { jp: '侍の心', ro: 'samurai no kokoro', pt: 'o coração do samurai' } },
    { k: 'ninja', jp: '忍者', say: 'にんじゃ', ro: 'ninja', pt: 'ninja', kind: 'palavra', lv: 1, clue: 'Agente secreto do Japão antigo. Também é o tema de Naruto.', note: 'Agente que atuava às escondidas.', parts: [['忍', 'nin', 'suportar, ocultar-se'], ['者', 'ja', 'pessoa']], ctx: 'Em Naruto também se usa 忍 lido “shinobi”.', ex: { jp: '忍者の村', ro: 'ninja no mura', pt: 'vila ninja' } },
    { k: 'senpai', jp: '先輩', say: 'せんぱい', ro: 'senpai', pt: 'veterano, colega mais velho', kind: 'palavra', lv: 1, clue: 'Como você chama alguém da escola ou do trabalho que está lá há mais tempo.', note: 'Pessoa com mais tempo na escola, clube ou empresa. O oposto é 後輩 (kouhai).', parts: [['先', 'sen', 'antes, à frente'], ['輩', 'pai', 'companheiros, grupo']], ctx: 'Muito usado como título: 田中先輩 (Tanaka-senpai).', ex: { jp: '先輩、おはようございます！', ro: 'senpai, ohayou gozaimasu!', pt: 'Bom dia, veterano!' } },
    { k: 'nakama', jp: '仲間', say: 'なかま', ro: 'nakama', pt: 'companheiros, camaradas', kind: 'palavra', lv: 1, clue: 'Palavra que os piratas de One Piece repetem o tempo todo.', note: 'Companheiros de grupo, time ou tripulação.', ctx: 'Muito frequente em One Piece e em histórias sobre amizade.', ex: { jp: '大切な仲間', ro: 'taisetsu na nakama', pt: 'companheiros preciosos' } },
    { k: 'mahou', jp: '魔法', say: 'まほう', ro: 'mahou', pt: 'magia', kind: 'palavra', lv: 2, clue: 'Aquilo que bruxas e magos usam.', note: 'Magia, feitiço.', ctx: '魔法少女 (mahou shoujo, “garota mágica”) é um gênero de anime.', ex: { jp: '魔法使い', ro: 'mahoutsukai', pt: 'mago, feiticeiro' } },
    { k: 'yuusha', jp: '勇者', say: 'ゆうしゃ', ro: 'yuusha', pt: 'herói, pessoa corajosa', kind: 'palavra', lv: 2, clue: 'O protagonista de muitos RPGs e animes de fantasia que enfrenta o rei demônio.', note: 'Herói valente.', parts: [['勇', 'yuu', 'coragem'], ['者', 'sha', 'pessoa']], ctx: 'Clássico de jogos de RPG e animes de fantasia.', ex: { jp: '勇者が魔王を倒す', ro: 'yuusha ga maou o taosu', pt: 'o herói derrota o rei demônio' } },
    { k: 'maou', jp: '魔王', say: 'まおう', ro: 'maou', pt: 'rei demônio', kind: 'palavra', lv: 2, clue: 'O grande vilão de muitos mundos de fantasia.', note: 'Rei dos demônios.', parts: [['魔', 'ma', 'demônio, magia'], ['王', 'ou', 'rei']], ctx: 'Aparece em títulos como はたらく魔王さま！ (Hataraku Maou-sama!).', ex: { jp: '魔王の城', ro: 'maou no shiro', pt: 'o castelo do rei demônio' } },
    { k: 'isekai', jp: '異世界', say: 'いせかい', ro: 'isekai', pt: 'outro mundo', kind: 'palavra', lv: 2, clue: 'Nome de um gênero em que o protagonista vai parar em outra realidade.', note: 'Mundo diferente, outra dimensão.', parts: [['異', 'i', 'diferente'], ['世界', 'sekai', 'mundo']], ctx: 'Gênero muito popular de animes e light novels.', ex: { jp: '異世界に転生する', ro: 'isekai ni tensei suru', pt: 'renascer em outro mundo' } },
    { k: 'hissatsuwaza', jp: '必殺技', say: 'ひっさつわざ', ro: 'hissatsu waza', pt: 'golpe especial, técnica finalizadora', kind: 'palavra', lv: 3, clue: 'O ataque mais forte que o herói grita antes de vencer.', note: 'Técnica decisiva de um personagem.', parts: [['必', 'hi(tsu)', 'certeza'], ['殺', 'satsu', 'matar'], ['技', 'waza', 'técnica']], ctx: 'Literalmente “técnica de derrota certa”.', ex: { jp: '必殺技を出す', ro: 'hissatsu waza o dasu', pt: 'usar o golpe especial' } },
    { k: 'shounen', jp: '少年', say: 'しょうねん', ro: 'shounen', pt: 'garoto, jovem', kind: 'palavra', lv: 2, clue: 'Nome do gênero de mangá de ação voltado a garotos.', note: 'Garoto, rapaz. O feminino é 少女 (shoujo), garota.', parts: [['少', 'shou', 'pouco'], ['年', 'nen', 'ano, idade']], ctx: 'Como gênero, “shounen” indica obras feitas para o público jovem masculino.', ex: { jp: '少年ジャンプ', ro: 'shounen janpu', pt: 'Shounen Jump (revista de mangá)' } },
    { k: 'tantei', jp: '探偵', say: 'たんてい', ro: 'tantei', pt: 'detetive', kind: 'palavra', lv: 2, clue: 'É o nome deste módulo: アニメ___!', note: 'Detetive, investigador.', ctx: 'Aparece em 名探偵コナン e no nome deste módulo, アニメ探偵.', ex: { jp: '探偵になりたい', ro: 'tantei ni naritai', pt: 'quero ser detetive' } },
    { k: 'bokunohero', jp: '僕のヒーローアカデミア', say: 'ぼくのヒーローアカデミア', ro: 'boku no hiiroo akademia', pt: 'Minha Academia de Heróis (My Hero Academia)', kind: 'titulo', lv: 2, clue: 'Título de um anime sobre uma escola para heróis. Começa com “eu” + partícula de posse.', note: 'Título de anime.', parts: [['僕', 'boku', 'eu (masculino, informal)'], ['の', 'no', 'partícula de posse, como “de”'], ['僕の', 'boku no', 'meu, minha'], ['ヒーローアカデミア', 'hiiroo akademia', '“Hero Academia”, palavras do inglês escritas em katakana']], ctx: 'No Brasil é conhecido pelo nome em inglês, My Hero Academia.', ex: { jp: '僕の夢', ro: 'boku no yume', pt: 'meu sonho' } },
    { k: 'kimetsu', jp: '鬼滅の刃', say: 'きめつのやいば', ro: 'kimetsu no yaiba', pt: 'A lâmina que destrói demônios (Demon Slayer)', kind: 'titulo', lv: 3, clue: 'Título sobre um caçador de demônios com uma espada.', note: 'Título de anime.', parts: [['鬼', 'ki', 'demônio, ogro (aqui lido “ki”)'], ['滅', 'metsu', 'destruir, aniquilar'], ['の', 'no', 'de'], ['刃', 'yaiba', 'lâmina']], ctx: 'No Brasil, Demon Slayer. 鬼滅 é uma combinação criada para o título, formada por kanji reais.', ex: { jp: '刃', ro: 'yaiba', pt: 'lâmina' } },
    { k: 'shingeki', jp: '進撃の巨人', say: 'しんげきのきょじん', ro: 'shingeki no kyojin', pt: 'O avanço dos gigantes (Attack on Titan)', kind: 'titulo', lv: 3, clue: 'Título de um anime em que a humanidade enfrenta criaturas enormes.', note: 'Título de anime.', parts: [['進撃', 'shingeki', 'avanço, ataque em marcha'], ['の', 'no', 'de'], ['巨人', 'kyojin', 'gigante']], ctx: 'No Brasil, Ataque dos Titãs.', ex: { jp: '巨人', ro: 'kyojin', pt: 'gigante' } },
    { k: 'hagane', jp: '鋼の錬金術師', say: 'はがねのれんきんじゅつし', ro: 'hagane no renkinjutsushi', pt: 'O Alquimista de Aço (Fullmetal Alchemist)', kind: 'titulo', lv: 3, clue: 'Título sobre irmãos que estudam a transformação da matéria.', note: 'Título de anime e mangá.', parts: [['鋼', 'hagane', 'aço'], ['の', 'no', 'de'], ['錬金術師', 'renkinjutsushi', 'alquimista']], ctx: 'No Brasil, Fullmetal Alchemist.', ex: { jp: '鋼の心', ro: 'hagane no kokoro', pt: 'coração de aço' } },
    { k: 'chihiro', jp: '千と千尋の神隠し', say: 'せんとちひろのかみかくし', ro: 'sen to chihiro no kamikakushi', pt: 'Sen e Chihiro e o sumiço pelos deuses (A Viagem de Chihiro)', kind: 'titulo', lv: 3, clue: 'Filme do Studio Ghibli sobre uma menina num mundo de espíritos.', note: 'Título de filme.', parts: [['千', 'Sen', 'nome dado à menina (o kanji significa mil)'], ['と', 'to', 'e'], ['千尋', 'Chihiro', 'nome da protagonista'], ['神隠し', 'kamikakushi', '“escondido pelos deuses”, um desaparecimento misterioso']], ctx: 'No Brasil, A Viagem de Chihiro.', ex: { jp: '神', ro: 'kami', pt: 'deus, divindade' } },
    { k: 'kiminonawa', jp: '君の名は。', say: 'きみのなは。', ro: 'kimi no na wa.', pt: 'O seu nome... (Your Name)', kind: 'titulo', lv: 2, clue: 'Filme sobre dois jovens que trocam de corpo. A frase parece incompleta de propósito.', note: 'Título de filme.', parts: [['君', 'kimi', 'você (informal)'], ['の', 'no', 'de'], ['名', 'na', 'nome'], ['は', 'wa', 'partícula de tópico']], ctx: 'A frase fica em aberto: “O seu nome é...?”. No Brasil, Your Name.', ex: { jp: '君の名前は？', ro: 'kimi no namae wa?', pt: 'Qual é o seu nome?' } },
    { k: 'conan', jp: '名探偵コナン', say: 'めいたんていコナン', ro: 'meitantei konan', pt: 'Grande Detetive Conan (Detective Conan)', kind: 'titulo', lv: 2, clue: 'Um detetive que virou criança.', note: 'Título de anime.', parts: [['名', 'mei', 'famoso, grande'], ['探偵', 'tantei', 'detetive'], ['コナン', 'Konan', 'nome do personagem, em katakana']], ctx: 'No Brasil, Detective Conan.', ex: { jp: '名探偵', ro: 'meitantei', pt: 'grande detetive' } },
    { k: 'onepiece', jp: 'ワンピース', say: 'ワンピース', ro: 'wan piisu', pt: 'One Piece (em katakana)', kind: 'titulo', lv: 1, clue: 'O tesouro mais famoso dos piratas, escrito com o alfabeto das palavras estrangeiras.', note: 'Palavras do inglês adaptadas ao som japonês.', ctx: 'Curiosidade: no dia a dia, ワンピース também significa “vestido”, do inglês “one-piece dress”.', ex: { jp: 'ワンピース', ro: 'wanpiisu', pt: 'vestido (no uso comum)' } },
    { k: 'hokage', jp: '火影', say: 'ほかげ', ro: 'hokage', pt: 'Hokage, “sombra do fogo”', kind: 'nome', lv: 2, clue: 'O título do líder da Vila da Folha em Naruto.', note: 'Título criado para Naruto.', parts: [['火', 'ho', 'fogo'], ['影', 'kage', 'sombra']], ctx: 'Nome próprio de um cargo dentro da obra. Os kanji significam “fogo” e “sombra”.', ex: { jp: '火影になる', ro: 'hokage ni naru', pt: 'tornar-se Hokage' } },
    { k: 'kagebunshin', jp: '影分身', say: 'かげぶんしん', ro: 'kage bunshin', pt: 'clone das sombras', kind: 'nome', lv: 2, clue: 'A técnica de Naruto para criar várias cópias de si mesmo.', note: 'Técnica criada para Naruto.', parts: [['影', 'kage', 'sombra'], ['分身', 'bunshin', 'clone, duplicata (“corpo dividido”)']], ctx: 'Na obra aparece como 影分身の術 (kage bunshin no jutsu); 術 = técnica.', ex: { jp: '分身', ro: 'bunshin', pt: 'clone, duplicata' } },
    { k: 'rasengan', jp: '螺旋丸', say: 'らせんがん', ro: 'rasengan', pt: 'esfera espiral', kind: 'nome', lv: 3, clue: 'Uma bola de energia girando na mão do herói de Naruto.', note: 'Técnica criada para Naruto.', parts: [['螺旋', 'rasen', 'espiral'], ['丸', 'gan', 'esfera, bola']], ctx: 'Nome próprio de técnica, formado por palavras reais.', ex: { jp: '螺旋階段', ro: 'rasen kaidan', pt: 'escada em espiral' } },
    { k: 'raikiri', jp: '雷切', say: 'らいきり', ro: 'raikiri', pt: 'corte do relâmpago', kind: 'nome', lv: 3, clue: 'Técnica elétrica de Kakashi em Naruto.', note: 'Técnica criada para Naruto.', parts: [['雷', 'rai', 'trovão, raio'], ['切', 'kiri', 'cortar, corte']], ctx: 'Nome próprio de técnica. 雷 aqui tem a leitura “rai”, e não “kaminari”.', ex: { jp: '切る', ro: 'kiru', pt: 'cortar' } },
    { k: 'sharingan', jp: '写輪眼', say: 'しゃりんがん', ro: 'sharingan', pt: 'olho da roda que copia', kind: 'nome', lv: 3, clue: 'O olho especial do clã Uchiha.', note: 'Nome criado para Naruto.', parts: [['写', 'sha', 'copiar, reproduzir'], ['輪', 'rin', 'roda, anel'], ['眼', 'gan', 'olho']], ctx: 'Nome próprio. A tradução é uma interpretação dos kanji, não uma palavra do dia a dia.', ex: { jp: '眼', ro: 'me / gan', pt: 'olho' } }
  ]
}
];

/* Pares mínimos para treinar o ouvido. ids existentes da v1 são reaproveitados. */
const PRON_SETS = [
  { id: 'ie', lv: 1, ids: ['c2l1:ie', 'c1l4:iie'] },
  { id: 'kyou', lv: 1, ids: ['c4l3:kyou', 'c1l1:9'] },
  { id: 'kite', lv: 1, ids: ['aud-pal:kite', 'aud-pal:kitte'] },
  { id: 'tori', lv: 1, ids: ['aud-pal:tori', 'aud-pal:toori'] },
  { id: 'yuki', lv: 1, ids: ['aud-pal:yuki', 'aud-pal:yuuki'] },
  { id: 'obasan', lv: 2, ids: ['aud-pal:obasan', 'aud-pal:obaasan'] },
  { id: 'ojisan', lv: 2, ids: ['aud-pal:ojisan', 'aud-pal:ojiisan'] },
  { id: 'byouin', lv: 2, ids: ['c4l3:byouin', 'aud-pal:biyouin'] },
  { id: 'saka', lv: 2, ids: ['aud-pal:saka', 'aud-pal:sakka'] },
  { id: 'oto', lv: 2, ids: ['aud-pal:oto', 'aud-pal:otto'] },
  { id: 'kawaii', lv: 2, ids: ['aud-pal:kawaii', 'aud-pal:kowai'] },
  { id: 'shujin', lv: 3, ids: ['aud-pal:shujin', 'aud-pal:shuujin'] },
  { id: 'koko', lv: 3, ids: ['aud-pal:koko', 'aud-pal:koukou'] },
  { id: 'familia', lv: 3, ids: ['aud-pal:obasan', 'aud-pal:obaasan', 'aud-pal:ojisan', 'aud-pal:ojiisan'] }
];

/* Itens da v1 usados no treino auditivo de palavras (sem exigir que a lição esteja aprovada) */
const LISTEN_V1 = {
  1: ['c1l1', 'c1l3', 'c1l4', 'c4l2'],
  2: ['c1l2', 'c4l1', 'c4l3', 'c2l1'],
  3: []
};
const LISTEN_V1_FRASES = { 2: ['c5l1', 'c5l2', 'c5l3'], 3: [] };

/* Informações extras para itens da v1 que também são expressões do cotidiano */
const EXTEND = {
  'c1l4:ganbatte': { when: 'Para incentivar alguém antes de um desafio.', formal: 'Informal. Mais educado: 頑張ってください (ganbatte kudasai).', jp2: '頑張って' },
  'c1l4:daijoubu': { when: 'Para perguntar se alguém está bem ou dizer que você está.', formal: 'Informal. Mais educado: 大丈夫ですか (daijoubu desu ka).', jp2: '大丈夫' }
};

/* Laboratório de Diálogos — diálogos originais. sp = quem fala (CHARS) */
const CHARS = {
  ren: { name: 'Ren', jp: 'れん', pitch: 0.85, color: 'var(--royal)' },
  aoi: { name: 'Aoi', jp: 'あおい', pitch: 1.2, color: 'var(--violet)' },
  sensei: { name: 'Prof. Tanaka', jp: 'たなかせんせい', pitch: 0.75, color: 'var(--gold-ink)' },
  tenin: { name: 'Atendente', jp: 'てんいん', pitch: 1.05, color: 'var(--ok)' },
  passante: { name: 'Pedestre', jp: 'つうこうにん', pitch: 1.0, color: 'var(--ok)' }
};
const DIALOGS = [
  { id: 'dlg-conhecer', lv: 1, title: 'Conhecendo alguém', situ: 'Ren e Aoi se encontram pela primeira vez no clube da escola.',
    lines: [
      { sp: 'ren', jp: 'はじめまして。れんです。', ro: 'hajimemashite. Ren desu.', pt: 'Muito prazer. Eu sou o Ren.' },
      { sp: 'aoi', jp: 'はじめまして。あおいです。よろしくおねがいします。', ro: 'hajimemashite. Aoi desu. yoroshiku onegaishimasu.', pt: 'Muito prazer. Eu sou a Aoi. Conto com você.' },
      { sp: 'ren', jp: 'こちらこそ、よろしくおねがいします。', ro: 'kochira koso, yoroshiku onegaishimasu.', pt: 'Eu é que conto com você.' }
    ],
    words: [['はじめまして', 'hajimemashite', 'muito prazer (primeiro encontro)'], ['〜です', '~desu', 'sou ~'], ['こちらこそ', 'kochira koso', 'eu é que (digo isso)']],
    qs: [
      { q: 'Qual é o nome da garota?', opts: ['Aoi', 'Ren', 'Yuki', 'Hana'], ans: 0, explain: 'Ela diz あおいです (Aoi desu): “Sou a Aoi”.' },
      { q: 'Eles já se conheciam?', opts: ['Não, é o primeiro encontro', 'Sim, são velhos amigos', 'Sim, são irmãos'], ans: 0, explain: 'はじめまして só é dito no primeiro encontro.' }
    ] },
  { id: 'dlg-amigo', lv: 1, title: 'Cumprimentando um amigo', situ: 'De manhã, a caminho da escola.',
    lines: [
      { sp: 'ren', jp: 'おはよう、あおい！', ro: 'ohayou, Aoi!', pt: 'Bom dia, Aoi!' },
      { sp: 'aoi', jp: 'おはよう、れん！げんき？', ro: 'ohayou, Ren! genki?', pt: 'Bom dia, Ren! Tudo bem?' },
      { sp: 'ren', jp: 'うん、げんき！', ro: 'un, genki!', pt: 'Sim, tudo ótimo!' }
    ],
    words: [['おはよう', 'ohayou', 'bom dia (informal)'], ['げんき', 'genki', 'bem-disposto, saudável'], ['うん', 'un', 'sim (informal)']],
    qs: [
      { q: 'Em que período do dia acontece a conversa?', opts: ['De manhã', 'À tarde', 'À noite'], ans: 0, explain: 'おはよう é o “bom dia”.' },
      { q: 'Como o Ren está?', opts: ['Bem', 'Cansado', 'Doente'], ans: 0, explain: 'Ele responde うん、げんき！: “Sim, estou bem!”.' }
    ] },
  { id: 'dlg-bem', lv: 2, title: 'Você está bem?', situ: 'Depois do treino do clube.',
    lines: [
      { sp: 'ren', jp: 'だいじょうぶ？', ro: 'daijoubu?', pt: 'Você está bem?' },
      { sp: 'aoi', jp: 'うーん、ちょっとつかれた。', ro: 'uun, chotto tsukareta.', pt: 'Hmm, estou um pouco cansada.' },
      { sp: 'ren', jp: 'そうか。じゃあ、やすんで。', ro: 'sou ka. jaa, yasunde.', pt: 'Entendi. Então descanse.' },
      { sp: 'aoi', jp: 'ありがとう。', ro: 'arigatou.', pt: 'Obrigada.' }
    ],
    words: [['ちょっと', 'chotto', 'um pouco'], ['つかれた', 'tsukareta', 'cansei, estou cansado(a)'], ['やすんで', 'yasunde', 'descanse']],
    qs: [
      { q: 'Como a Aoi está?', opts: ['Um pouco cansada', 'Com fome', 'Muito feliz', 'Atrasada'], ans: 0, explain: 'ちょっとつかれた = “estou um pouco cansada”.' },
      { q: 'O que o Ren sugere?', opts: ['Que ela descanse', 'Que treinem mais', 'Que comam lámen'], ans: 0, explain: 'やすんで = “descanse”.' }
    ] },
  { id: 'dlg-comida', lv: 2, title: 'Conversando sobre comida', situ: 'Depois da aula.',
    lines: [
      { sp: 'ren', jp: 'おなかすいた！', ro: 'onaka suita!', pt: 'Estou com fome!' },
      { sp: 'aoi', jp: 'ラーメン、たべにいく？', ro: 'raamen, tabe ni iku?', pt: 'Vamos comer lámen?' },
      { sp: 'ren', jp: 'いいね！いこう！', ro: 'ii ne! ikou!', pt: 'Boa! Vamos!' }
    ],
    words: [['おなかすいた', 'onaka suita', 'estou com fome'], ['たべにいく', 'tabe ni iku', 'ir comer'], ['いこう', 'ikou', 'vamos']],
    qs: [
      { q: 'Quem está com fome?', opts: ['Ren', 'Aoi', 'Os dois dizem que não têm fome'], ans: 0, explain: 'É o Ren quem diz おなかすいた！' },
      { q: 'O que eles vão comer?', opts: ['Lámen', 'Sushi', 'Pão', 'Arroz com peixe'], ans: 0, explain: 'ラーメン (raamen) = lámen.' }
    ] },
  { id: 'dlg-ajuda', lv: 2, title: 'Pedindo ajuda', situ: 'Ren está perdido numa cidade nova.',
    lines: [
      { sp: 'ren', jp: 'すみません、えきはどこですか？', ro: 'sumimasen, eki wa doko desu ka?', pt: 'Com licença, onde fica a estação?' },
      { sp: 'passante', jp: 'えきですか？あそこですよ。', ro: 'eki desu ka? asoko desu yo.', pt: 'A estação? É logo ali.' },
      { sp: 'ren', jp: 'ありがとうございます！', ro: 'arigatou gozaimasu!', pt: 'Muito obrigado!' },
      { sp: 'passante', jp: 'いいえ。', ro: 'iie.', pt: 'De nada.' }
    ],
    words: [['どこ', 'doko', 'onde'], ['あそこ', 'asoko', 'ali, lá'], ['いいえ', 'iie', 'não / de nada (resposta a um obrigado)']],
    qs: [
      { q: 'O que o Ren procura?', opts: ['A estação', 'O banheiro', 'Uma loja', 'A escola'], ans: 0, explain: 'えき (eki) = estação.' },
      { q: 'Onde fica o lugar?', opts: ['Logo ali, perto', 'Muito longe', 'A pessoa não sabe'], ans: 0, explain: 'あそこです = “é ali”.' }
    ] },
  { id: 'dlg-hobby', lv: 3, title: 'Conversando sobre hobbies', situ: 'Ren e Aoi conversam no intervalo.',
    lines: [
      { sp: 'ren', jp: 'しゅみはなに？', ro: 'shumi wa nani?', pt: 'Qual é o seu hobby?' },
      { sp: 'aoi', jp: 'アニメをみること！れんは？', ro: 'anime o miru koto! Ren wa?', pt: 'Assistir anime! E você, Ren?' },
      { sp: 'ren', jp: 'ぼくはギターをひくのがすき。', ro: 'boku wa gitaa o hiku no ga suki.', pt: 'Eu gosto de tocar violão.' },
      { sp: 'aoi', jp: 'すごい！こんどきかせて！', ro: 'sugoi! kondo kikasete!', pt: 'Que incrível! Da próxima vez, toca pra eu ouvir!' }
    ],
    words: [['しゅみ', 'shumi', 'hobby, passatempo'], ['みること', 'miru koto', 'o ato de assistir'], ['ギターをひく', 'gitaa o hiku', 'tocar violão/guitarra'], ['こんど', 'kondo', 'da próxima vez']],
    qs: [
      { q: 'Qual é o hobby da Aoi?', opts: ['Assistir anime', 'Tocar violão', 'Cozinhar', 'Jogar futebol'], ans: 0, explain: 'アニメをみること = assistir anime.' },
      { q: 'O que o Ren gosta de fazer?', opts: ['Tocar violão', 'Assistir anime', 'Dormir'], ans: 0, explain: 'ギターをひくのがすき = gosta de tocar violão.' },
      { q: 'O que a Aoi pede no final?', opts: ['Ouvir o Ren tocar', 'Assistir anime juntos', 'Ir embora'], ans: 0, explain: 'こんどきかせて = “da próxima vez, me deixa ouvir”.' }
    ] },
  { id: 'dlg-escola', lv: 3, title: 'Na sala de aula', situ: 'A professora confere a lição de casa.',
    lines: [
      { sp: 'sensei', jp: 'みなさん、しゅくだいはおわりましたか？', ro: 'minasan, shukudai wa owarimashita ka?', pt: 'Pessoal, terminaram a lição de casa?' },
      { sp: 'aoi', jp: 'はい、おわりました！', ro: 'hai, owarimashita!', pt: 'Sim, terminei!' },
      { sp: 'ren', jp: 'すみません、まだです…', ro: 'sumimasen, mada desu…', pt: 'Desculpe, ainda não...' },
      { sp: 'sensei', jp: 'じゃあ、あしたまでにだしてください。', ro: 'jaa, ashita made ni dashite kudasai.', pt: 'Então, entregue até amanhã, por favor.' }
    ],
    words: [['しゅくだい', 'shukudai', 'lição de casa'], ['まだ', 'mada', 'ainda (não)'], ['あしたまでに', 'ashita made ni', 'até amanhã'], ['だしてください', 'dashite kudasai', 'entregue, por favor']],
    qs: [
      { q: 'Quem NÃO terminou a lição?', opts: ['Ren', 'Aoi', 'Ninguém terminou'], ans: 0, explain: 'Ren diz まだです: “ainda não”.' },
      { q: 'Qual é o novo prazo?', opts: ['Amanhã', 'Hoje à noite', 'Semana que vem'], ans: 0, explain: 'あしたまでに = até amanhã.' }
    ] },
  { id: 'dlg-loja', lv: 3, title: 'Numa loja de conveniência', situ: 'Ren está viajando e vai comprar o lanche.',
    lines: [
      { sp: 'tenin', jp: 'いらっしゃいませ！', ro: 'irasshaimase!', pt: 'Seja bem-vindo!' },
      { sp: 'ren', jp: 'すみません、このおにぎりをふたつください。', ro: 'sumimasen, kono onigiri o futatsu kudasai.', pt: 'Com licença, quero dois destes onigiris, por favor.' },
      { sp: 'tenin', jp: 'はい、ふたつで300円です。', say: 'はい、ふたつでさんびゃくえんです。', ro: 'hai, futatsu de sanbyaku en desu.', pt: 'Certo, os dois ficam 300 ienes.' },
      { sp: 'ren', jp: 'はい、どうぞ。', ro: 'hai, douzo.', pt: 'Aqui está.' },
      { sp: 'tenin', jp: 'ありがとうございました！', ro: 'arigatou gozaimashita!', pt: 'Muito obrigado!' }
    ],
    words: [['いらっしゃいませ', 'irasshaimase', 'seja bem-vindo (em lojas)'], ['ふたつ', 'futatsu', 'dois (objetos)'], ['ください', 'kudasai', 'por favor, me dê'], ['えん', 'en', 'iene (moeda)']],
    qs: [
      { q: 'Quantos onigiris o Ren compra?', opts: ['Dois', 'Um', 'Três', 'Dez'], ans: 0, explain: 'ふたつ = dois objetos.' },
      { q: 'Quanto ele paga?', opts: ['300 ienes', '200 ienes', '100 ienes', '3.000 ienes'], ans: 0, explain: 'さんびゃくえん = 300 ienes. ひゃく = 100, como você aprendeu nos números!' }
    ] }
];
