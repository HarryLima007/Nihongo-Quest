/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N4/N3): Kanji III (c23)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c23', emblem: '書', title: 'Kanji III', jp: 'かんじ III', stage: 'int', jlpt: 'N4–N3', chars: true,
    desc: 'Mais 80 kanji: estações, comida, trabalho, transporte, sentimentos, clima, ações e lugares.',
    requires: 'c17', reqWhy: 'Continua de onde Kanji II parou.'
  });
  const intro = (a, b) => [a, 'Lembre: a leitura japonesa (kun) aparece com hiragana ou sozinha; a chinesa (on), em compostos.', b];
  c.lessons.push(
  L('c23l1', 'Estações e tempo', '季', 'kanji', intro('As quatro estações e palavras de tempo que aparecem em calendários, cartas e notícias.', 'Cartas formais japonesas começam falando da estação: 春の訪れを感じる季節となりました.'),
    '季節 (estação do ano) junta 季 (estação) e 節 (período, nó do bambu).', [
    ['haru', '春', 'haru', 'primavera', 'shun (青春 seishun, juventude)', '', ['春休み', 'haruyasumi', 'férias de primavera']],
    ['natsu', '夏', 'natsu', 'verão', 'ka (夏季 kaki)', '', ['夏祭り', 'natsumatsuri', 'festival de verão']],
    ['aki', '秋', 'aki', 'outono', 'shuu (秋分 shuubun)', 'Arroz (禾) + fogo (火): a colheita.', ['秋晴れ', 'akibare', 'céu limpo de outono']],
    ['fuyu', '冬', 'fuyu', 'inverno', 'tou (冬眠 toumin, hibernação)', '', ['冬休み', 'fuyuyasumi', 'férias de inverno']],
    ['ki', '季', 'ki', 'estação', '', 'Só em compostos.', ['季節', 'kisetsu', 'estação do ano']],
    ['setsu', '節', 'setsu', 'período; nó (bambu)', 'fushi', '', ['節約', 'setsuyaku', 'economia (poupar)']],
    ['mukashi', '昔', 'mukashi', 'antigamente', 'seki', '', ['昔話', 'mukashibanashi', 'conto antigo, lenda']],
    ['kyo', '去', 'kyo', 'passar, ir embora', 'sa(ru): partir', '', ['去年', 'kyonen', 'ano passado']],
    ['sue', '末', 'sue', 'fim, final', 'matsu (週末 shuumatsu)', '', ['年末', 'nenmatsu', 'fim de ano']],
    ['sai', '最', 'sai', 'o mais', 'motto(mo): o mais', '', ['最近', 'saikin', 'ultimamente']]
  ], [
    ['日本には四つの季節があります。', 'nihon ni wa yottsu no kisetsu ga arimasu.', 'O Japão tem quatro estações.'],
    ['最近、昔の友達に会いました。', 'saikin, mukashi no tomodachi ni aimashita.', 'Recentemente encontrei um amigo de antigamente.']
  ], [
    X.s('Qual kanji é “outono”?', ['秋|aki', '冬|fuyu', '春|haru'], '秋 = aki.'),
    X.s('Como se lê 去年?', ['きょねん|kyonen', 'さるとし|sarutoshi', 'こねん|konen'], '去年 = ano passado.'),
    X.s('O que significa 年末?', ['fim de ano', 'ano novo', 'meio do ano'], '末 = fim.'),
    X.f('ultimamente', '＿近', ['最|sai', '末|matsu', '昔|seki'], '最近 = saikin.')
  ]),
  L('c23l2', 'Comida', '料', 'kanji', intro('Kanji de cardápios, supermercados e receitas.', 'Em restaurantes, você vai ver 肉料理 (pratos de carne), 魚料理 (pratos de peixe) e 定食 (prato feito).'),
    '料理 (culinária) junta 料 (material) e 理 (lógica, organização).', [
    ['niku', '肉', 'niku', 'carne', '', '', ['牛肉', 'gyuuniku', 'carne de boi']],
    ['sakana', '魚', 'sakana', 'peixe', 'gyo (金魚 kingyo, peixinho dourado)', 'Repare na cauda: os quatro pontos.', ['魚屋', 'sakanaya', 'peixaria']],
    ['kome', '米', 'kome', 'arroz (cru)', 'bei (米国 beikoku, EUA); mai', '', ['新米', 'shinmai', 'arroz novo; novato']],
    ['cha', '茶', 'cha', 'chá', 'sa (喫茶店 kissaten, cafeteria)', '', ['紅茶', 'koucha', 'chá preto']],
    ['ryou', '料', 'ryou', 'material; taxa', '', '', ['料金', 'ryoukin', 'tarifa']],
    ['ri', '理', 'ri', 'razão, lógica', '', '', ['理由', 'riyuu', 'motivo']],
    ['meshi', '飯', 'meshi', 'refeição; arroz cozido', 'han (ご飯 gohan)', 'めし é casual e masculino.', ['夕飯', 'yuuhan', 'jantar']],
    ['no', '野', 'no', 'campo', 'ya (野球 yakyuu, beisebol)', '', ['野菜', 'yasai', 'verduras, legumes']],
    ['sai', '菜', 'sai', 'verdura', 'na', '', ['菜食', 'saishoku', 'dieta vegetariana']],
    ['aji', '味', 'aji', 'sabor', 'mi (意味 imi, significado)', '', ['趣味', 'shumi', 'hobby']]
  ], [
    ['肉より魚のほうが好きです。', 'niku yori sakana no hou ga suki desu.', 'Gosto mais de peixe do que de carne.'],
    ['この言葉の意味がわかりません。', 'kono kotoba no imi ga wakarimasen.', 'Não entendo o significado desta palavra.']
  ], [
    X.s('Qual kanji é “peixe”?', ['魚|sakana', '肉|niku', '米|kome'], '魚 = sakana.'),
    X.s('Como se lê 野菜?', ['やさい|yasai', 'のな|nona', 'やな|yana'], '野 (ya) + 菜 (sai).'),
    X.s('O que significa 意味?', ['significado', 'sabor', 'hobby'], '意味 = imi.'),
    X.f('chá preto', '紅＿', ['茶|cha', '米|mai', '味|mi'], '紅茶 = koucha.')
  ]),
  L('c23l3', 'Trabalho e sociedade', '働', 'kanji', intro('Os kanji de empregos, empresas e reuniões.', '働 é uma pessoa (亻) + 動 (mover-se): a pessoa que se mexe, trabalha. Foi criado no Japão.'),
    '者 (pessoa que faz) forma profissões: 医者 (médico), 学者 (estudioso), 記者 (jornalista).', [
    ['shi', '仕', 'shi', 'servir', 'tsuka(eru)', 'Quase sempre em 仕事.', ['仕方', 'shikata', 'jeito, maneira']],
    ['koto', '事', 'koto', 'coisa, fato', 'ji (返事 henji); vira goto em 仕事', '', ['仕事', 'shigoto', 'trabalho']],
    ['hataraku', '働く', 'hataraku', 'trabalhar', 'dou (労働 roudou)', '', ['共働き', 'tomobataraki', 'casal em que os dois trabalham']],
    ['in', '員', 'in', 'membro', '', '', ['会社員', 'kaishain', 'funcionário de empresa']],
    ['gyou', '業', 'gyou', 'trabalho, indústria', 'waza', '', ['授業', 'jugyou', 'aula']],
    ['gi', '議', 'gi', 'debate', '', '', ['会議', 'kaigi', 'reunião']],
    ['shu', '主', 'shu', 'principal; dono', 'nushi, omo', '', ['主人', 'shujin', 'marido; dono']],
    ['mono', '者', 'mono', 'pessoa', 'sha (医者 isha)', '', ['記者', 'kisha', 'jornalista']],
    ['kou', '公', 'kou', 'público', 'ooyake', '', ['公園', 'kouen', 'parque']],
    ['min', '民', 'min', 'povo', 'tami', '', ['国民', 'kokumin', 'cidadãos, povo']]
  ], [
    ['父は会社員で、毎日遅くまで働いています。', 'chichi wa kaishain de, mainichi osoku made hataraite imasu.', 'Meu pai é funcionário de empresa e trabalha até tarde todos os dias.'],
    ['会議は午後二時からです。', 'kaigi wa gogo niji kara desu.', 'A reunião começa às duas da tarde.']
  ], [
    X.s('Como se lê 仕事?', ['しごと|shigoto', 'しじ|shiji', 'つかえこと|tsukaekoto'], '事 vira “goto”.'),
    X.s('Qual kanji forma profissões como 医者 e 記者?', ['者|sha', '員|in', '民|min'], '者 = pessoa que faz.'),
    X.s('O que é 授業?', ['aula', 'trabalho', 'reunião'], '授業 = jugyou.'),
    X.f('parque', '＿園', ['公|kou', '主|shu', '民|min'], '公園 = kouen.')
  ]),
  L('c23l4', 'Transporte e movimento', '乗', 'kanji', intro('Os kanji que você lê em estações, placas de trânsito e mapas.', 'Nas estações: 乗り場 (plataforma de embarque), 乗り換え (baldeação), 急行 (expresso).'),
    '止 desenha um pé parado: é a base de 歩 (andar) e 正 (correto).', [
    ['noru', '乗る', 'noru', 'embarcar, andar de', 'jou (乗車 jousha)', '', ['乗り物', 'norimono', 'meio de transporte']],
    ['oriru', '降りる', 'oriru', 'descer (do veículo)', 'kou; fu(ru): chover', 'Mesmo kanji de 雨が降る.', ['降車', 'kousha', 'desembarque']],
    ['un', '運', 'un', 'transportar; sorte', 'hako(bu)', '', ['運転', 'unten', 'dirigir']],
    ['ten', '転', 'ten', 'girar, rolar', 'koro(bu): cair', '', ['自転車', 'jitensha', 'bicicleta']],
    ['ugoku', '動く', 'ugoku', 'mover-se', 'dou (動物 doubutsu)', '', ['動物', 'doubutsu', 'animal']],
    ['tomaru', '止まる', 'tomaru', 'parar', 'shi (中止 chuushi, cancelamento)', '', ['通行止め', 'tsuukoudome', 'via interditada']],
    ['kayou', '通う', 'kayou', 'frequentar, ir regularmente', 'tsuu (通学 tsuugaku); too(ru): passar', '', ['通学', 'tsuugaku', 'ir à escola']],
    ['isogu', '急ぐ', 'isogu', 'apressar-se', 'kyuu (急行 kyuukou, expresso)', '', ['特急', 'tokkyuu', 'trem expresso especial']],
    ['kaeru', '帰る', 'kaeru', 'voltar (para casa)', 'ki (帰国 kikoku, voltar ao país)', '', ['帰国', 'kikoku', 'voltar ao país de origem']],
    ['wataru', '渡る', 'wataru', 'atravessar', 'to', '', ['渡り鳥', 'wataridori', 'ave migratória']]
  ], [
    ['次の駅で降りて、特急に乗り換えてください。', 'tsugi no eki de orite, tokkyuu ni norikaete kudasai.', 'Desça na próxima estação e troque para o expresso especial.'],
    ['毎日、自転車で学校に通っています。', 'mainichi, jitensha de gakkou ni kayotte imasu.', 'Vou à escola de bicicleta todos os dias.']
  ], [
    X.s('Qual é o oposto de 乗る?', ['降りる|oriru', '止まる|tomaru', '渡る|wataru'], '乗る (embarcar) × 降りる (descer).'),
    X.s('Como se lê 自転車?', ['じてんしゃ|jitensha', 'じでんしゃ|jidensha', 'じころしゃ|jikorosha'], '自 + 転 + 車.'),
    X.s('Uma placa diz 通行止め. O que fazer?', ['Não passar por ali', 'Pagar pedágio', 'Ir mais rápido'], '通行止め = via interditada.'),
    X.f('dirigir', '＿転', ['運|un', '動|dou', '急|kyuu'], '運転 = unten.')
  ]),
  L('c23l5', 'Mente e sentimentos', '思', 'kanji', intro('Pensar, saber, rir, chorar: os kanji das emoções e do pensamento.', 'Vários levam 心 (coração) embaixo: 思, 意, 悲, 愛.'),
    '思 é um campo (田) sobre o coração (心): o pensamento que vem do coração.', [
    ['omou', '思う', 'omou', 'pensar, achar', 'shi (思想 shisou, ideologia)', '', ['思い出', 'omoide', 'lembrança']],
    ['kangaeru', '考える', 'kangaeru', 'pensar, refletir', 'kou (参考 sankou, referência)', 'Pensar com raciocínio; 思う é mais sentimento.', ['考え方', 'kangaekata', 'modo de pensar']],
    ['shiru', '知る', 'shiru', 'saber, conhecer', 'chi (知識 chishiki)', '', ['知識', 'chishiki', 'conhecimento']],
    ['tanoshii', '楽しい', 'tanoshii', 'divertido', 'raku (楽 = fácil); gaku (音楽 ongaku)', '', ['音楽', 'ongaku', 'música']],
    ['kanashii', '悲しい', 'kanashii', 'triste', 'hi (悲劇 higeki, tragédia)', '', ['悲鳴', 'himei', 'grito (de susto)']],
    ['okoru', '怒る', 'okoru', 'ficar bravo', 'do (怒り ikari: raiva)', '', ['怒り', 'ikari', 'raiva']],
    ['warau', '笑う', 'warau', 'rir', 'shou (微笑 bishou, sorriso)', '', ['笑い声', 'waraigoe', 'risada']],
    ['naku', '泣く', 'naku', 'chorar', 'kyuu', 'Tem a água (氵): lágrimas.', ['泣き虫', 'nakimushi', 'chorão']],
    ['ai', '愛', 'ai', 'amor', '', '', ['愛情', 'aijou', 'afeto']],
    ['i', '意', 'i', 'mente, intenção', '', '', ['意見', 'iken', 'opinião']]
  ], [
    ['子供の頃の楽しい思い出を話した。', 'kodomo no koro no tanoshii omoide o hanashita.', 'Contei lembranças divertidas da infância.'],
    ['よく考えてから、答えてください。', 'yoku kangaete kara, kotaete kudasai.', 'Pense bem antes de responder.']
  ], [
    X.s('Qual kanji tem a água (氵) das lágrimas?', ['泣|naku', '笑|warau', '怒|okoru'], '泣く = chorar.'),
    X.s('Como se lê 音楽?', ['おんがく|ongaku', 'おとらく|otoraku', 'おんらく|onraku'], '楽 vira “gaku” em 音楽.'),
    X.s('Qual a diferença entre 思う e 考える?', ['考える é refletir com raciocínio', 'São iguais em tudo', '思う é só para o passado'], '考える = raciocinar.'),
    X.f('lembrança', '＿い出', ['思|omo', '考|kanga', '知|shi'], '思い出 = omoide.')
  ]),
  L('c23l6', 'Clima e paisagem', '晴', 'kanji', intro('Previsão do tempo e paisagem: os kanji que aparecem todo dia na TV.', 'Na previsão: 晴れ (sol), 曇り (nublado), 雨 (chuva), 雪 (neve).'),
    '雪 e 雲 levam a chuva (雨) em cima: fenômenos do céu.', [
    ['hare', '晴れ', 'hare', 'tempo bom, ensolarado', 'sei (快晴 kaisei, céu limpo)', '', ['晴れ着', 'haregi', 'roupa de festa']],
    ['yuki', '雪', 'yuki', 'neve', 'setsu (大雪 ooyuki, nevasca)', '', ['雪だるま', 'yukidaruma', 'boneco de neve']],
    ['kumo', '雲', 'kumo', 'nuvem', 'un', '', ['雨雲', 'amagumo', 'nuvem de chuva']],
    ['hikari', '光', 'hikari', 'luz', 'kou (観光 kankou)', '', ['日光', 'nikkou', 'luz do sol; Nikko']],
    ['atsui', '暑い', 'atsui', 'quente (clima)', 'sho (残暑 zansho)', 'Para clima. Objeto quente é 熱い.', ['暑さ', 'atsusa', 'calor']],
    ['samui', '寒い', 'samui', 'frio (clima)', 'kan (寒波 kanpa, onda de frio)', '', ['寒さ', 'samusa', 'frio']],
    ['dan', '暖', 'dan', 'morno, quente (agradável)', 'atata(kai)', '', ['暖房', 'danbou', 'aquecedor']],
    ['tsumetai', '冷たい', 'tsumetai', 'gelado (ao toque)', 'rei (冷蔵庫 reizouko)', 'Clima frio é 寒い; coisa gelada é 冷たい.', ['冷蔵庫', 'reizouko', 'geladeira']],
    ['ike', '池', 'ike', 'lago pequeno, lagoa', 'chi (電池 denchi, pilha)', '', ['電池', 'denchi', 'pilha, bateria']],
    ['shima', '島', 'shima', 'ilha', 'tou (半島 hantou, península)', '', ['島国', 'shimaguni', 'país insular']]
  ], [
    ['明日は晴れのち雪でしょう。', 'ashita wa hare nochi yuki deshou.', 'Amanhã, sol e depois neve.'],
    ['冷たい水を冷蔵庫に入れておいた。', 'tsumetai mizu o reizouko ni irete oita.', 'Deixei água gelada na geladeira.']
  ], [
    X.s('Para dizer que o DIA está frio, use:', ['寒い|samui', '冷たい|tsumetai', '暑い|atsui'], '寒い = clima frio.'),
    X.s('Como se lê 電池?', ['でんち|denchi', 'でんいけ|den\'ike', 'でんし|denshi'], '池 vira “chi”.'),
    X.s('Qual kanji tem a chuva em cima?', ['雪|yuki', '光|hikari', '晴|hare'], '雪 = neve.'),
    X.f('aquecedor', '＿房', ['暖|dan', '冷|rei', '暑|sho'], '暖房 = danbou.')
  ]),
  L('c23l7', 'Ações do cotidiano', '開', 'kanji', intro('Abrir, fechar, começar, terminar, emprestar, devolver: kanji de verbos muito usados.', 'Vários formam pares: 開ける × 閉める; 始める × 終わる; 借りる × 貸す.'),
    '開 e 閉 têm o portão (門): aberto e fechado.', [
    ['akeru', '開ける', 'akeru', 'abrir', 'kai (開店 kaiten); hira(ku)', '', ['開店', 'kaiten', 'abertura da loja']],
    ['shimeru', '閉める', 'shimeru', 'fechar', 'hei (閉店 heiten); to(jiru)', '', ['閉店', 'heiten', 'fechamento da loja']],
    ['hajimeru', '始める', 'hajimeru', 'começar (algo)', 'shi (開始 kaishi)', '', ['始発', 'shihatsu', 'primeiro trem do dia']],
    ['owaru', '終わる', 'owaru', 'terminar', 'shuu (終電 shuuden)', '', ['終電', 'shuuden', 'último trem do dia']],
    ['kariru', '借りる', 'kariru', 'pegar emprestado', 'shaku (借金 shakkin)', '', ['借金', 'shakkin', 'dívida']],
    ['kasu', '貸す', 'kasu', 'emprestar (a alguém)', 'tai (賃貸 chintai, aluguel)', '', ['貸し出し', 'kashidashi', 'empréstimo (biblioteca)']],
    ['kaesu', '返す', 'kaesu', 'devolver', 'hen (返事 henji)', '', ['返品', 'henpin', 'devolução de produto']],
    ['arau', '洗う', 'arau', 'lavar', 'sen (洗濯 sentaku)', '', ['洗濯', 'sentaku', 'lavar roupa']],
    ['kiru', '切る', 'kiru', 'cortar', 'setsu (大切 taisetsu)', '', ['切手', 'kitte', 'selo']],
    ['ren', '練', 'ren', 'treinar, polir', 'ne(ru)', '', ['練習', 'renshuu', 'treino, prática']]
  ], [
    ['図書館で本を借りて、一週間後に返した。', 'toshokan de hon o karite, isshuukan go ni kaeshita.', 'Peguei um livro na biblioteca e devolvi uma semana depois.'],
    ['終電に間に合わなかった。', 'shuuden ni ma ni awanakatta.', 'Não consegui pegar o último trem.']
  ], [
    X.s('Você empresta um livro AO amigo. Qual verbo?', ['貸す|kasu', '借りる|kariru', '返す|kaesu'], '貸す = emprestar a alguém.'),
    X.s('Como se lê 終電?', ['しゅうでん|shuuden', 'おわでん|owaden', 'しゅうてん|shuuten'], 'Último trem.'),
    X.s('O que é 切手?', ['selo', 'mão cortada', 'tesoura'], '切手 = kitte.'),
    X.f('lavar roupa', '＿濯', ['洗|sen', '練|ren', '返|hen'], '洗濯 = sentaku.')
  ]),
  L('c23l8', 'Lugares e coisas', '館', 'kanji', intro('Kanji de lugares e objetos: biblioteca, cinema, fotografia, mapa.', '屋 indica loja ou quem trabalha nela: 本屋 (livraria), パン屋 (padaria).'),
    '館 (prédio público) aparece em 図書館, 映画館, 美術館, 大使館.', [
    ['ya', '屋', 'ya', 'loja; telhado', 'oku (屋上 okujou, terraço)', '', ['本屋', 'hon\'ya', 'livraria']],
    ['kan', '館', 'kan', 'prédio, edifício', '', '', ['図書館', 'toshokan', 'biblioteca']],
    ['tokoro', '所', 'tokoro', 'lugar', 'sho, jo (台所 daidokoro)', '', ['住所', 'juusho', 'endereço']],
    ['ba', '場', 'ba', 'lugar, local', 'jou (会場 kaijou)', '', ['場所', 'basho', 'lugar']],
    ['bu', '部', 'bu', 'parte, departamento', '', '', ['部屋', 'heya', 'quarto, cômodo']],
    ['zu', '図', 'zu', 'desenho, mapa', 'to (図書 tosho)', '', ['地図', 'chizu', 'mapa']],
    ['ei', '映', 'ei', 'projetar, refletir', 'utsu(ru)', '', ['映画', 'eiga', 'filme']],
    ['ga', '画', 'ga', 'imagem, pintura', 'kaku (計画 keikaku)', '', ['漫画', 'manga', 'mangá']],
    ['sha', '写', 'sha', 'copiar', 'utsu(su)', '', ['写真', 'shashin', 'foto']],
    ['shin', '真', 'shin', 'verdade', 'ma (真ん中 mannaka)', '', ['真ん中', 'mannaka', 'bem no meio']]
  ], [
    ['映画館の場所を地図で調べた。', 'eigakan no basho o chizu de shirabeta.', 'Procurei no mapa onde fica o cinema.'],
    ['部屋の真ん中にテーブルがある。', 'heya no mannaka ni teeburu ga aru.', 'Há uma mesa bem no meio do quarto.']
  ], [
    X.s('Como se lê 部屋?', ['へや|heya', 'ぶや|buya', 'ぶおく|buoku'], 'Leitura especial: へや.'),
    X.s('Onde se pegam livros emprestados?', ['図書館|toshokan', '映画館|eigakan', '本屋|hon\'ya'], '図書館 = biblioteca.'),
    X.s('O que é 住所?', ['endereço', 'lugar', 'cozinha'], '住 (morar) + 所 (lugar).'),
    X.f('foto', '写＿', ['真|shin', '画|ga', '図|zu'], '写真 = shashin.')
  ])
  );
})();
