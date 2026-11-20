/* ==========================================================
   CONTEÚDO 3.0 — Avançado (N2): Vocabulário N2 (c26)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c26', emblem: '語', title: 'Vocabulário N2', jp: 'ごい', stage: 'ava', jlpt: 'N2',
    desc: 'Palavras abstratas, verbos de raciocínio e de ação social, economia, ciência, universidade, adjetivos e advérbios do N2, saúde e política.',
    requires: ['c19', 'c18'], reqWhy: 'O vocabulário N2 amplia o vocabulário N3 e aparece em frases com gramática N3.'
  });
  c.lessons.push(
  L('c26l1', 'Palavras abstratas I', '因', 'vocab', [
    'No N2, os textos falam de causas, efeitos, objetivos e condições. Estas palavras abstratas são a base de notícias, relatórios e redações.',
    'Muitas viram verbo com する (影響する) ou formam expressões fixas: 〜の影響で (por influência de), 〜を目的に (com o objetivo de).',
    'Repare nos pares: 原因 (causa) × 結果 (resultado); 目的 (objetivo) × 手段 (meio).'
  ], '対策 (medida, contramedida) aparece em toda notícia sobre problemas: 地震対策, 暑さ対策.', [
    ['eikyou', '影響', 'eikyou', 'influência, efeito', '〜に影響を与える = influenciar.', ['親の影響で、ピアノを始めた。', 'oya no eikyou de, piano o hajimeta.', 'Comecei piano por influência dos meus pais.']],
    ['joukyou', '状況', 'joukyou', 'situação, circunstâncias', '', ['今の状況を説明してください。', 'ima no joukyou o setsumei shite kudasai.', 'Explique a situação atual.']],
    ['gen\'in', '原因', 'gen\'in', 'causa', '', ['事故の原因を調べている。', 'jiko no gen\'in o shirabete iru.', 'Estão investigando a causa do acidente.']],
    ['mokuteki', '目的', 'mokuteki', 'objetivo, propósito', '', ['旅行の目的は何ですか。', 'ryokou no mokuteki wa nan desu ka.', 'Qual é o propósito da viagem?']],
    ['shudan', '手段', 'shudan', 'meio, recurso', '', ['目的のためには手段を選ばない。', 'mokuteki no tame ni wa shudan o erabanai.', 'Para atingir o objetivo, não escolhe os meios.']],
    ['jouken', '条件', 'jouken', 'condição', '', ['この仕事の条件はいい。', 'kono shigoto no jouken wa ii.', 'As condições deste trabalho são boas.']],
    ['keikou', '傾向', 'keikou', 'tendência', '', ['若者は本を読まない傾向がある。', 'wakamono wa hon o yomanai keikou ga aru.', 'Os jovens têm tendência a não ler livros.']],
    ['taisaku', '対策', 'taisaku', 'medida, contramedida', '', ['暑さ対策をしっかりしよう。', 'atsusa taisaku o shikkari shiyou.', 'Vamos nos proteger bem do calor.']]
  ], [
    ['問題の原因を調べて、対策を考える必要がある。', 'mondai no gen\'in o shirabete, taisaku o kangaeru hitsuyou ga aru.', 'É preciso investigar a causa do problema e pensar em medidas.']
  ], [
    X.s('Qual é o oposto de 原因?', ['結果|kekka', '目的|mokuteki', '条件|jouken'], 'Causa × resultado.'),
    X.f('Por influência do tufão, o trem parou.', '台風の＿で、電車が止まった。', ['影響|eikyou', '対策|taisaku', '傾向|keikou'], '〜の影響で.'),
    X.s('Medidas contra terremotos são:', ['地震対策|jishin taisaku', '地震傾向|jishin keikou', '地震目的|jishin mokuteki'], '対策 = medida.'),
    X.s('O que significa 手段?', ['meio, recurso', 'objetivo', 'condição'], '手段 = meio.')
  ]),
  L('c26l2', 'Palavras abstratas II', '価', 'vocab', [
    'Valor, responsabilidade, direitos, capacidade: o vocabulário de debates, textos de opinião e notícias.',
    '可能性 (possibilidade) é muito usado: 〜可能性がある (há possibilidade de), 〜可能性が高い (é bem possível).',
    '権利 (direito) × 義務 (dever) formam um par clássico em textos sobre sociedade.'
  ], '印象 (impressão) aparece em 第一印象 (primeira impressão) e 印象に残る (ficar marcado).', [
    ['kachi', '価値', 'kachi', 'valor', '〜する価値がある = vale a pena.', ['この映画は見る価値がある。', 'kono eiga wa miru kachi ga aru.', 'Este filme vale a pena ver.']],
    ['sekinin', '責任', 'sekinin', 'responsabilidade', '責任を取る = assumir a responsabilidade.', ['失敗の責任は私にあります。', 'shippai no sekinin wa watashi ni arimasu.', 'A responsabilidade pelo fracasso é minha.']],
    ['kenri', '権利', 'kenri', 'direito', '', ['誰にでも意見を言う権利がある。', 'dare ni demo iken o iu kenri ga aru.', 'Todos têm o direito de dar sua opinião.']],
    ['gimu', '義務', 'gimu', 'dever, obrigação', '', ['税金を払うのは国民の義務だ。', 'zeikin o harau no wa kokumin no gimu da.', 'Pagar impostos é dever do cidadão.']],
    ['nouryoku', '能力', 'nouryoku', 'capacidade, habilidade', '日本語能力試験 = JLPT.', ['彼には人をまとめる能力がある。', 'kare ni wa hito o matomeru nouryoku ga aru.', 'Ele tem capacidade de unir as pessoas.']],
    ['kanousei', '可能性', 'kanousei', 'possibilidade', '', ['明日は雨の可能性が高い。', 'ashita wa ame no kanousei ga takai.', 'Há grande possibilidade de chuva amanhã.']],
    ['kouka', '効果', 'kouka', 'efeito, eficácia', '', ['この薬はよく効果がある。', 'kono kusuri wa yoku kouka ga aru.', 'Este remédio tem bom efeito.']],
    ['inshou', '印象', 'inshou', 'impressão', '第一印象 = primeira impressão.', ['彼の第一印象はよかった。', 'kare no daiichi inshou wa yokatta.', 'A primeira impressão dele foi boa.']]
  ], [
    ['この方法は試してみる価値があると思う。', 'kono houhou wa tameshite miru kachi ga aru to omou.', 'Acho que vale a pena tentar este método.']
  ], [
    X.s('Qual é o par de 権利?', ['義務|gimu', '価値|kachi', '効果|kouka'], 'Direito × dever.'),
    X.f('Vale a pena visitar.', '行ってみる＿がある。', ['価値|kachi', '責任|sekinin', '能力|nouryoku'], '〜する価値がある.'),
    X.s('O que é 第一印象?', ['primeira impressão', 'primeiro lugar', 'primeira causa'], '印象 = impressão.'),
    X.f('Há possibilidade de atraso.', '遅れる＿があります。', ['可能性|kanousei', '義務|gimu', '効果|kouka'], '可能性 = possibilidade.')
  ]),
  L('c26l3', 'Verbos de raciocínio', '判', 'vocab', [
    'Verbos para pensar, julgar, duvidar e verificar. A maioria é substantivo chinês + する, e soa mais formal que os verbos japoneses equivalentes.',
    '判断する (julgar, decidir), 理解する (compreender), 予想する (prever), 想像する (imaginar).',
    'Verbos japoneses nativos também aparecem: 認める (reconhecer, admitir), 疑う (duvidar, suspeitar), 確かめる (verificar).'
  ], '疑う tem um sentido duplo: duvidar (本当かどうか疑う) e suspeitar de alguém (彼を疑う).', [
    ['handan', '判断する', 'handan suru', 'julgar, avaliar', '', ['状況を見て判断してください。', 'joukyou o mite handan shite kudasai.', 'Avalie conforme a situação.']],
    ['rikai', '理解する', 'rikai suru', 'compreender', '', ['彼の気持ちが理解できない。', 'kare no kimochi ga rikai dekinai.', 'Não consigo compreender o sentimento dele.']],
    ['mitomeru', '認める', 'mitomeru', 'reconhecer, admitir', '', ['彼は自分のミスを認めた。', 'kare wa jibun no misu o mitometa.', 'Ele admitiu o próprio erro.']],
    ['utagau', '疑う', 'utagau', 'duvidar, suspeitar', '', ['警察は彼を疑っている。', 'keisatsu wa kare o utagatte iru.', 'A polícia suspeita dele.']],
    ['tashikameru', '確かめる', 'tashikameru', 'verificar, confirmar', '', ['ドアの鍵を確かめた。', 'doa no kagi o tashikameta.', 'Verifiquei a fechadura da porta.']],
    ['yosou', '予想する', 'yosou suru', 'prever, estimar', '予想外 = inesperado.', ['結果は予想外だった。', 'kekka wa yosougai datta.', 'O resultado foi inesperado.']],
    ['souzou', '想像する', 'souzou suru', 'imaginar', '', ['十年後の自分を想像してみて。', 'juunen go no jibun o souzou shite mite.', 'Imagine você daqui a dez anos.']],
    ['ishiki', '意識する', 'ishiki suru', 'ter consciência, prestar atenção em', '', ['発音を意識して話す。', 'hatsuon o ishiki shite hanasu.', 'Falar prestando atenção na pronúncia.']]
  ], [
    ['自分の目で確かめるまで、その話は疑っていた。', 'jibun no me de tashikameru made, sono hanashi wa utagatte ita.', 'Até ver com meus próprios olhos, eu duvidava daquela história.']
  ], [
    X.s('Ele finalmente admitiu o erro. Qual verbo?', ['認めた|mitometa', '疑った|utagatta', '想像した|souzou shita'], '認める = admitir.'),
    X.f('O resultado foi inesperado.', '結果は＿外だった。', ['予想|yosou', '理解|rikai', '判断|handan'], '予想外 = inesperado.'),
    X.s('Conferir se a porta está trancada:', ['確かめる|tashikameru', '疑う|utagau', '意識する|ishiki suru'], '確かめる = verificar.'),
    X.s('O que significa 想像する?', ['imaginar', 'julgar', 'reconhecer'], '想像 = imaginação.')
  ]),
  L('c26l4', 'Verbos de ação social e trabalho', '担', 'vocab', [
    'Verbos que aparecem em reuniões, e-mails e notícias de empresas e governo.',
    '担当する (ser responsável por), 対応する (lidar com, atender), 提案する (propor), 依頼する (solicitar).',
    '実施する (realizar, implementar) e 管理する (administrar) são muito comuns em avisos oficiais: 調査を実施します.'
  ], '担当者 (o responsável) é a pessoa que você procura em qualquer empresa: 担当者に代わります.', [
    ['tantou', '担当する', 'tantou suru', 'ser responsável por', '担当者 = responsável.', ['このプロジェクトは私が担当しています。', 'kono purojekuto wa watashi ga tantou shite imasu.', 'Sou o responsável por este projeto.']],
    ['taiou', '対応する', 'taiou suru', 'lidar com, atender', '', ['お客様の質問に丁寧に対応する。', 'okyakusama no shitsumon ni teinei ni taiou suru.', 'Atender com cuidado às perguntas dos clientes.']],
    ['teian', '提案する', 'teian suru', 'propor', '', ['新しい企画を提案した。', 'atarashii kikaku o teian shita.', 'Propus um projeto novo.']],
    ['irai', '依頼する', 'irai suru', 'solicitar, encomendar', '', ['翻訳を専門家に依頼した。', 'hon\'yaku o senmonka ni irai shita.', 'Encomendei a tradução a um especialista.']],
    ['koushou', '交渉する', 'koushou suru', 'negociar', '', ['給料について会社と交渉した。', 'kyuuryou ni tsuite kaisha to koushou shita.', 'Negociei o salário com a empresa.']],
    ['jisshi', '実施する', 'jisshi suru', 'realizar, implementar', '', ['来月、避難訓練を実施します。', 'raigetsu, hinan kunren o jisshi shimasu.', 'Mês que vem faremos um simulado de evacuação.']],
    ['kanri', '管理する', 'kanri suru', 'administrar, gerenciar', '', ['データはしっかり管理されている。', 'deeta wa shikkari kanri sarete iru.', 'Os dados são bem administrados.']],
    ['kakunin', '確認する', 'kakunin suru', 'confirmar, conferir', '', ['出発の時間を確認しておこう。', 'shuppatsu no jikan o kakunin shite okou.', 'Vamos confirmar o horário de partida.']]
  ], [
    ['担当者が不在のため、明日改めて対応いたします。', 'tantousha ga fuzai no tame, ashita aratamete taiou itashimasu.', 'Como o responsável está ausente, atenderemos novamente amanhã.']
  ], [
    X.s('Quem cuida de um projeto é o:', ['担当者|tantousha', '提案者|teiansha', '依頼者|iraisha'], '担当 = responsável.'),
    X.f('Negociar o preço', '値段を＿する', ['交渉|koushou', '実施|jisshi', '管理|kanri'], '交渉 = negociação.'),
    X.s('Num aviso oficial: “Faremos uma pesquisa.”', ['調査を実施します|chousa o jisshi shimasu', '調査を交渉します|chousa o koushou shimasu', '調査を担当します|chousa o tantou shimasu'], '実施する = realizar.'),
    X.s('O que significa 提案?', ['proposta', 'pedido', 'administração'], '提案 = proposta.')
  ]),
  L('c26l5', 'Economia e empresas', '経', 'vocab', [
    'Termos de economia que aparecem em telejornais e na seção de negócios do jornal.',
    '景気 (situação econômica) é a palavra-chave: 景気がいい (a economia vai bem), 不景気 / 不況 (recessão).',
    'Para empresas: 企業 (empresa), 市場 (mercado; しじょう em economia), 輸出 (exportação) e 輸入 (importação). 赤字 (prejuízo) × 黒字 (lucro), pela cor da tinta nos livros contábeis.'
  ], '市場 tem duas leituras: しじょう (mercado, em economia) e いちば (mercado físico, feira).', [
    ['keiki', '景気', 'keiki', 'situação econômica', '', ['最近、景気が少しよくなった。', 'saikin, keiki ga sukoshi yoku natta.', 'Ultimamente a economia melhorou um pouco.']],
    ['fukyou', '不況', 'fukyou', 'recessão', '', ['不況で仕事が見つからない。', 'fukyou de shigoto ga mitsukaranai.', 'Por causa da recessão, não acho emprego.']],
    ['kigyou', '企業', 'kigyou', 'empresa, companhia', '大企業 = grande empresa.', ['大企業に就職したい。', 'daikigyou ni shuushoku shitai.', 'Quero trabalhar numa grande empresa.']],
    ['shijou', '市場', 'shijou', 'mercado (economia)', 'いちば = feira.', ['海外の市場に進出する。', 'kaigai no shijou ni shinshutsu suru.', 'Entrar no mercado externo.']],
    ['yushutsu', '輸出', 'yushutsu', 'exportação', '輸入 (yunyuu) = importação.', ['日本は車を多く輸出している。', 'nihon wa kuruma o ooku yushutsu shite iru.', 'O Japão exporta muitos carros.']],
    ['yunyuu', '輸入', 'yunyuu', 'importação', '', ['この果物はブラジルから輸入された。', 'kono kudamono wa burajiru kara yunyuu sareta.', 'Esta fruta foi importada do Brasil.']],
    ['akaji', '赤字', 'akaji', 'prejuízo, déficit', '黒字 (kuroji) = lucro.', ['会社は三年連続で赤字だ。', 'kaisha wa sannen renzoku de akaji da.', 'A empresa está no vermelho há três anos seguidos.']],
    ['kabu', '株', 'kabu', 'ações (bolsa)', '株価 = cotação.', ['株を買って、少し儲かった。', 'kabu o katte, sukoshi moukatta.', 'Comprei ações e lucrei um pouco.']]
  ], [
    ['円安の影響で、輸入品の値段が上がっている。', 'en\'yasu no eikyou de, yunyuuhin no nedan ga agatte iru.', 'Por causa do iene fraco, o preço dos importados está subindo.']
  ], [
    X.s('Uma empresa que perde dinheiro está no:', ['赤字|akaji', '黒字|kuroji', '景気|keiki'], '赤字 = prejuízo.'),
    X.s('Qual é o oposto de 輸出?', ['輸入|yunyuu', '企業|kigyou', '市場|shijou'], 'Exportar × importar.'),
    X.s('Como se lê 市場 numa notícia de economia?', ['しじょう|shijou', 'いちば|ichiba'], 'Mercado econômico = しじょう.'),
    X.f('Por causa da recessão…', '＿で…', ['不況|fukyou', '株|kabu', '黒字|kuroji'], '不況 = recessão.')
  ]),
  L('c26l6', 'Ciência e tecnologia', '研', 'vocab', [
    'Pesquisa, desenvolvimento e inteligência artificial: vocabulário de reportagens científicas e do mundo da tecnologia.',
    '研究 (pesquisa acadêmica) × 調査 (levantamento, investigação). 開発 = desenvolvimento (de produtos, tecnologia).',
    '人工知能 (inteligência artificial) é muitas vezes abreviado como AI (エーアイ).'
  ], '研究者 (pesquisador), 開発者 (desenvolvedor), 技術者 (técnico, engenheiro): 者 forma profissões.', [
    ['kenkyuu', '研究', 'kenkyuu', 'pesquisa', '研究者 = pesquisador.', ['大学でロボットの研究をしている。', 'daigaku de robotto no kenkyuu o shite iru.', 'Faço pesquisa sobre robôs na universidade.']],
    ['kaihatsu', '開発', 'kaihatsu', 'desenvolvimento', '', ['新しい薬が開発された。', 'atarashii kusuri ga kaihatsu sareta.', 'Um novo remédio foi desenvolvido.']],
    ['gijutsu', '技術', 'gijutsu', 'tecnologia, técnica', '', ['日本の技術は世界で評価されている。', 'nihon no gijutsu wa sekai de hyouka sarete iru.', 'A tecnologia japonesa é reconhecida no mundo.']],
    ['jikken', '実験', 'jikken', 'experimento', '', ['実験は成功した。', 'jikken wa seikou shita.', 'O experimento deu certo.']],
    ['hatsumei', '発明', 'hatsumei', 'invenção', '', ['電話は誰が発明したのだろう。', 'denwa wa dare ga hatsumei shita no darou.', 'Quem será que inventou o telefone?']],
    ['jinkouchinou', '人工知能', 'jinkou chinou', 'inteligência artificial', '', ['人工知能が仕事を変えつつある。', 'jinkou chinou ga shigoto o kaetsutsu aru.', 'A inteligência artificial está mudando o trabalho.']],
    ['bunseki', '分析', 'bunseki', 'análise', '', ['データを分析して、問題を見つけた。', 'deeta o bunseki shite, mondai o mitsuketa.', 'Analisei os dados e encontrei o problema.']],
    ['hakken', '発見', 'hakken', 'descoberta', '', ['新しい星が発見された。', 'atarashii hoshi ga hakken sareta.', 'Uma nova estrela foi descoberta.']]
  ], [
    ['研究者たちは、何年も実験を重ねて新技術を開発した。', 'kenkyuushatachi wa, nannen mo jikken o kasanete shingijutsu o kaihatsu shita.', 'Os pesquisadores desenvolveram uma nova tecnologia após anos de experimentos.']
  ], [
    X.s('Qual é a diferença entre 発明 e 発見?', ['発明 = inventar algo novo; 発見 = descobrir algo que existia', 'São iguais', '発見 = inventar'], 'Invenção × descoberta.'),
    X.f('inteligência artificial', '人工＿', ['知能|chinou', '技術|gijutsu', '開発|kaihatsu'], '人工知能.'),
    X.s('Quem faz pesquisa na universidade é um:', ['研究者|kenkyuusha', '開発者|kaihatsusha', '発明品|hatsumeihin'], '研究者 = pesquisador.'),
    X.f('Analisar os dados', 'データを＿する', ['分析|bunseki', '実験|jikken', '発見|hakken'], '分析 = análise.')
  ]),
  L('c26l7', 'Vida universitária', '大', 'vocab', [
    'Para quem pensa em estudar no Japão: matrícula, cursos, créditos, bolsas e trabalhos acadêmicos.',
    'Na universidade japonesa, você escolhe um 専攻 (área de estudo), assiste 講義 (aulas expositivas) e precisa de 単位 (créditos) para se formar.',
    'No último ano, quase todos escrevem um 卒業論文 (卒論, trabalho de conclusão) num 研究室 / ゼミ (grupo de pesquisa com um professor).'
  ], '奨学金 (bolsa de estudos) inclui os programas do governo japonês, como a bolsa MEXT.', [
    ['senkou', '専攻', 'senkou', 'área de estudo, curso', '', ['大学での専攻は経済学です。', 'daigaku de no senkou wa keizaigaku desu.', 'Meu curso na universidade é economia.']],
    ['kougi', '講義', 'kougi', 'aula expositiva', '', ['今日の講義はとても面白かった。', 'kyou no kougi wa totemo omoshirokatta.', 'A aula de hoje foi muito interessante.']],
    ['tan\'i', '単位', 'tan\'i', 'crédito (acadêmico); unidade', '', ['単位が足りなくて、卒業できない。', 'tan\'i ga tarinakute, sotsugyou dekinai.', 'Faltam créditos e não consigo me formar.']],
    ['ronbun', '論文', 'ronbun', 'artigo acadêmico, tese', '卒論 = TCC.', ['卒業論文のテーマを決めた。', 'sotsugyou ronbun no teema o kimeta.', 'Escolhi o tema do meu TCC.']],
    ['shougakukin', '奨学金', 'shougakukin', 'bolsa de estudos', '', ['奨学金をもらって、日本に留学した。', 'shougakukin o moratte, nihon ni ryuugaku shita.', 'Ganhei uma bolsa e fui estudar no Japão.']],
    ['gakui', '学位', 'gakui', 'grau acadêmico (diploma)', '', ['修士の学位を取った。', 'shuushi no gakui o totta.', 'Obtive o grau de mestre.']],
    ['zemi', 'ゼミ', 'zemi', 'seminário, grupo de pesquisa', 'Do alemão Seminar.', ['ゼミの先生に相談した。', 'zemi no sensei ni soudan shita.', 'Consultei o professor do meu grupo de pesquisa.']],
    ['nyuugakushiken', '入学試験', 'nyuugaku shiken', 'vestibular, exame de admissão', '入試 (nyuushi) é a abreviação.', ['入学試験に合格した。', 'nyuugaku shiken ni goukaku shita.', 'Passei no vestibular.']]
  ], [
    ['奨学金をもらうためには、成績を保たなければならない。', 'shougakukin o morau tame ni wa, seiseki o tamotanakereba naranai.', 'Para manter a bolsa, é preciso manter as notas.']
  ], [
    X.s('Para se formar, você precisa juntar:', ['単位|tan\'i', '講義|kougi', 'ゼミ|zemi'], '単位 = créditos.'),
    X.s('O que é 入試?', ['vestibular', 'diploma', 'bolsa'], '入学試験 → 入試.'),
    X.f('Ganhei uma bolsa de estudos.', '＿をもらった。', ['奨学金|shougakukin', '学位|gakui', '論文|ronbun'], '奨学金 = bolsa.'),
    X.s('Qual é a sua 専攻?', ['a área que você estuda', 'sua nota', 'sua sala'], '専攻 = curso.')
  ]),
  L('c26l8', 'Adjetivos な do N2', '明', 'vocab', [
    'Adjetivos な formais que aparecem em textos de opinião, relatórios e notícias.',
    'Formam pares úteis: 明確 (claro, preciso) × 曖昧 (vago, ambíguo); 複雑 (complexo) × 単純 (simples).',
    'Com に, viram advérbios: 明確に説明する (explicar claramente), 柔軟に対応する (lidar com flexibilidade).'
  ], '曖昧 é uma palavra muito discutida: a comunicação japonesa é vista como 曖昧, cheia de subentendidos.', [
    ['meikaku', '明確', 'meikaku', 'claro, preciso', '', ['目標を明確にしよう。', 'mokuhyou o meikaku ni shiyou.', 'Vamos deixar a meta clara.']],
    ['aimai', '曖昧', 'aimai', 'vago, ambíguo', '', ['曖昧な返事をされて、困った。', 'aimai na henji o sarete, komatta.', 'Recebi uma resposta vaga e fiquei sem saber o que fazer.']],
    ['tekisetsu', '適切', 'tekisetsu', 'adequado, apropriado', '', ['適切な言葉を選ぶのは難しい。', 'tekisetsu na kotoba o erabu no wa muzukashii.', 'Escolher a palavra adequada é difícil.']],
    ['shinkoku', '深刻', 'shinkoku', 'sério, grave', '', ['水不足が深刻になっている。', 'mizubusoku ga shinkoku ni natte iru.', 'A falta de água está ficando grave.']],
    ['juunan', '柔軟', 'juunan', 'flexível', '', ['柔軟に考えることが大切だ。', 'juunan ni kangaeru koto ga taisetsu da.', 'É importante pensar de forma flexível.']],
    ['fukuzatsu', '複雑', 'fukuzatsu', 'complexo, complicado', '', ['この問題はとても複雑だ。', 'kono mondai wa totemo fukuzatsu da.', 'Este problema é muito complexo.']],
    ['tanjun', '単純', 'tanjun', 'simples', 'Às vezes “simplório”.', ['単純なミスで、点を落とした。', 'tanjun na misu de, ten o otoshita.', 'Perdi pontos por um erro simples.']],
    ['houfu', '豊富', 'houfu', 'abundante, rico', '', ['この店はメニューが豊富だ。', 'kono mise wa menyuu ga houfu da.', 'Este restaurante tem um cardápio variado.']]
  ], [
    ['問題が複雑なときほど、単純に考えたほうがいい。', 'mondai ga fukuzatsu na toki hodo, tanjun ni kangaeta hou ga ii.', 'Quanto mais complexo o problema, melhor pensar de forma simples.']
  ], [
    X.s('Qual é o oposto de 明確?', ['曖昧|aimai', '豊富|houfu', '深刻|shinkoku'], 'Claro × vago.'),
    X.s('Qual é o oposto de 複雑?', ['単純|tanjun', '柔軟|juunan', '適切|tekisetsu'], 'Complexo × simples.'),
    X.f('O problema está ficando grave.', '問題が＿になっている。', ['深刻|shinkoku', '豊富|houfu', '柔軟|juunan'], '深刻 = grave.'),
    X.f('Lidar com flexibilidade', '＿に対応する', ['柔軟|juunan', '曖昧|aimai', '単純|tanjun'], '柔軟に = com flexibilidade.')
  ]),
  L('c26l9', 'Adjetivos い do N2', '鋭', 'vocab', [
    'Adjetivos い mais literários ou expressivos, comuns em romances, notícias e descrições.',
    '著しい (notável, marcante) aparece em notícias sobre mudanças: 著しい成長. 乏しい (escasso) é o oposto de 豊か.',
    'Muitos têm sentido físico e figurado: 鋭い (afiado; perspicaz), 鈍い (cego, sem fio; lento para perceber), 険しい (íngreme; severo).'
  ], '頼もしい = confiável, alguém em quem se pode apoiar. É um elogio muito bonito.', [
    ['ichijirushii', '著しい', 'ichijirushii', 'notável, marcante', '', ['この町は著しく発展した。', 'kono machi wa ichijirushiku hatten shita.', 'Esta cidade se desenvolveu notavelmente.']],
    ['toboshii', '乏しい', 'toboshii', 'escasso, pobre em', '', ['この地域は資源に乏しい。', 'kono chiiki wa shigen ni toboshii.', 'Esta região é pobre em recursos.']],
    ['surudoi', '鋭い', 'surudoi', 'afiado; perspicaz', '', ['彼女は鋭い質問をした。', 'kanojo wa surudoi shitsumon o shita.', 'Ela fez uma pergunta perspicaz.']],
    ['nibui', '鈍い', 'nibui', 'cego (sem fio); lento para perceber', '', ['彼は人の気持ちに鈍い。', 'kare wa hito no kimochi ni nibui.', 'Ele demora a perceber o que os outros sentem.']],
    ['kewashii', '険しい', 'kewashii', 'íngreme; severo', '', ['険しい山道を登った。', 'kewashii yamamichi o nobotta.', 'Subi uma trilha íngreme na montanha.']],
    ['awatadashii', '慌ただしい', 'awatadashii', 'agitado, corrido', '', ['年末は慌ただしい。', 'nenmatsu wa awatadashii.', 'O fim de ano é corrido.']],
    ['osoroshii', '恐ろしい', 'osoroshii', 'terrível, assustador', '', ['恐ろしい夢を見た。', 'osoroshii yume o mita.', 'Tive um sonho terrível.']],
    ['tanomoshii', '頼もしい', 'tanomoshii', 'confiável, que inspira confiança', '', ['新しいリーダーは頼もしい。', 'atarashii riidaa wa tanomoshii.', 'O novo líder inspira confiança.']]
  ], [
    ['経験に乏しいが、彼は頼もしい若者だ。', 'keiken ni toboshii ga, kare wa tanomoshii wakamono da.', 'Tem pouca experiência, mas é um jovem confiável.']
  ], [
    X.s('Uma pessoa que percebe tudo rapidamente é:', ['鋭い|surudoi', '鈍い|nibui', '乏しい|toboshii'], '鋭い = perspicaz.'),
    X.s('Uma subida muito inclinada é:', ['険しい|kewashii', '慌ただしい|awatadashii', '著しい|ichijirushii'], '険しい = íngreme.'),
    X.f('Um crescimento notável', '＿成長', ['著しい|ichijirushii', '乏しい|toboshii', '鈍い|nibui'], '著しい = notável.'),
    X.s('O que significa 頼もしい?', ['confiável', 'assustador', 'agitado'], '頼る = apoiar-se em.')
  ]),
  L('c26l10', 'Advérbios do N2', '徐', 'vocab', [
    'Advérbios que mudam o tom da frase: gradualmente, imediatamente, ao contrário, nem sempre.',
    '次第に / 徐々に = gradualmente (次第に é mais escrito). 一斉に = todos ao mesmo tempo. 直ちに = imediatamente (avisos oficiais).',
    'かえって = ao contrário do esperado; むしろ = antes, de preferência; 必ずしも〜ない = nem sempre.'
  ], '必ずしも sempre vem com negativa: 高い物が必ずしもいいとは限らない (o que é caro nem sempre é bom).', [
    ['shidaini', '次第に', 'shidai ni', 'gradualmente', '', ['次第に空が明るくなってきた。', 'shidai ni sora ga akaruku natte kita.', 'Aos poucos o céu foi clareando.']],
    ['jojoni', '徐々に', 'jojo ni', 'pouco a pouco', '', ['徐々に体調が回復している。', 'jojo ni taichou ga kaifuku shite iru.', 'Pouco a pouco estou me recuperando.']],
    ['issei', '一斉に', 'issei ni', 'todos ao mesmo tempo', '', ['ベルが鳴ると、一斉に立ち上がった。', 'beru ga naru to, issei ni tachiagatta.', 'Quando o sinal tocou, todos se levantaram ao mesmo tempo.']],
    ['tadachini', '直ちに', 'tadachi ni', 'imediatamente', 'Muito usado em avisos.', ['直ちに避難してください。', 'tadachi ni hinan shite kudasai.', 'Evacuem imediatamente.']],
    ['kaette', 'かえって', 'kaette', 'ao contrário, pelo contrário', '', ['薬を飲んだら、かえって悪くなった。', 'kusuri o nondara, kaette waruku natta.', 'Tomei o remédio e, ao contrário, piorei.']],
    ['mushiro', 'むしろ', 'mushiro', 'antes, mais propriamente', '', ['この仕事は、むしろ楽しい。', 'kono shigoto wa, mushiro tanoshii.', 'Este trabalho é, na verdade, divertido.']],
    ['kanarazushimo', '必ずしも', 'kanarazushimo', 'nem sempre (com negativa)', '', ['高い物が必ずしもいいとは限らない。', 'takai mono ga kanarazushimo ii to wa kagiranai.', 'O que é caro nem sempre é bom.']],
    ['issou', 'いっそう', 'issou', 'ainda mais', '一層.', ['これからも、いっそう努力します。', 'korekara mo, issou doryoku shimasu.', 'De agora em diante, vou me esforçar ainda mais.']]
  ], [
    ['急いで説明したら、かえって混乱させてしまった。', 'isoide setsumei shitara, kaette konran sasete shimatta.', 'Expliquei com pressa e, pelo contrário, acabei confundindo.']
  ], [
    X.s('Num alarme de incêndio: “Evacuem ＿.”', ['直ちに|tadachi ni', '徐々に|jojo ni', 'むしろ|mushiro'], '直ちに = imediatamente.'),
    X.f('Nem sempre é verdade.', '＿正しいとは限らない。', ['必ずしも|kanarazushimo', 'かえって|kaette', '一斉に|issei ni'], '必ずしも + negativa.'),
    X.s('“Quis ajudar, mas ＿ atrapalhei.”', ['かえって|kaette', 'いっそう|issou', '次第に|shidai ni'], 'かえって = efeito oposto.'),
    X.s('Todos começaram a falar ao mesmo tempo:', ['一斉に話し始めた|issei ni hanashihajimeta', '徐々に話し始めた|jojo ni hanashihajimeta', 'むしろ話し始めた|mushiro hanashihajimeta'], '一斉に = ao mesmo tempo.')
  ]),
  L('c26l11', 'Saúde e bem-estar', '健', 'vocab', [
    'Vocabulário de saúde além do hospital: sono, nutrição, estresse, imunidade e prevenção.',
    'Palavras chinesas formais aparecem em artigos de saúde e campanhas: 睡眠 (sono), 栄養 (nutrição), 免疫 (imunidade), 予防 (prevenção).',
    '精神 (mente, espírito) aparece em 精神的 (psicológico) e 精神科 (psiquiatria).'
  ], 'Em notícias: 睡眠不足 (privação de sono), 栄養バランス (equilíbrio nutricional), 予防接種 (vacinação).', [
    ['suimin', '睡眠', 'suimin', 'sono', '睡眠不足 = privação de sono.', ['睡眠不足は集中力を下げる。', 'suimin busoku wa shuuchuuryoku o sageru.', 'A falta de sono reduz a concentração.']],
    ['eiyou', '栄養', 'eiyou', 'nutrição', '', ['栄養のバランスを考えて食べよう。', 'eiyou no baransu o kangaete tabeyou.', 'Vamos comer pensando no equilíbrio nutricional.']],
    ['men\'eki', '免疫', 'men\'eki', 'imunidade', '', ['運動すると免疫が高まる。', 'undou suru to men\'eki ga takamaru.', 'Exercício aumenta a imunidade.']],
    ['yobou', '予防', 'yobou', 'prevenção', '予防接種 = vacinação.', ['風邪の予防には手洗いが大切だ。', 'kaze no yobou ni wa tearai ga taisetsu da.', 'Lavar as mãos é importante para prevenir resfriados.']],
    ['hirou', '疲労', 'hirou', 'fadiga, cansaço', '', ['疲労がたまっている。', 'hirou ga tamatte iru.', 'O cansaço está se acumulando.']],
    ['seishin', '精神', 'seishin', 'mente, espírito', '精神的 = psicológico.', ['精神的に疲れている。', 'seishinteki ni tsukarete iru.', 'Estou cansado psicologicamente.']],
    ['kenkoushindan', '健康診断', 'kenkou shindan', 'check-up médico', 'Obrigatório anualmente em empresas japonesas.', ['会社で健康診断を受けた。', 'kaisha de kenkou shindan o uketa.', 'Fiz o check-up na empresa.']],
    ['rirakkusu', 'リラックス', 'rirakkusu', 'relaxar', '', ['お風呂に入るとリラックスできる。', 'ofuro ni hairu to rirakkusu dekiru.', 'Tomar banho de banheira me relaxa.']]
  ], [
    ['十分な睡眠と栄養が、病気の予防につながる。', 'juubun na suimin to eiyou ga, byouki no yobou ni tsunagaru.', 'Sono e nutrição adequados ajudam a prevenir doenças.']
  ], [
    X.s('O que é 睡眠不足?', ['falta de sono', 'excesso de comida', 'falta de exercício'], '睡眠 = sono.'),
    X.f('vacinação', '＿接種', ['予防|yobou', '免疫|men\'eki', '栄養|eiyou'], '予防接種.'),
    X.s('Empresas japonesas exigem anualmente um:', ['健康診断|kenkou shindan', '入学試験|nyuugaku shiken', '面接|mensetsu'], '健康診断 = check-up.'),
    X.s('Cansado psicologicamente:', ['精神的に疲れている|seishinteki ni tsukarete iru', '栄養的に疲れている|eiyouteki ni tsukarete iru', '予防的に疲れている|yobouteki ni tsukarete iru'], '精神的 = psicológico.')
  ]),
  L('c26l12', 'Política e direito', '政', 'vocab', [
    'O vocabulário da política japonesa e da justiça, essencial para entender notícias.',
    'O Japão tem um 首相 (primeiro-ministro, também 総理大臣) escolhido pelo 国会 (parlamento). O 政府 (governo) apresenta 法案 (projetos de lei).',
    'No direito: 憲法 (constituição), 裁判 (julgamento), 判決 (sentença), 改正 (reforma, emenda).'
  ], 'O artigo 9 da Constituição japonesa (憲法第九条) é um dos temas políticos mais debatidos do país.', [
    ['seifu', '政府', 'seifu', 'governo', '', ['政府は新しい対策を発表した。', 'seifu wa atarashii taisaku o happyou shita.', 'O governo anunciou novas medidas.']],
    ['shushou', '首相', 'shushou', 'primeiro-ministro', '総理大臣 = forma oficial.', ['首相が記者会見を開いた。', 'shushou ga kisha kaiken o hiraita.', 'O primeiro-ministro deu uma entrevista coletiva.']],
    ['kokkai', '国会', 'kokkai', 'parlamento (Dieta)', '', ['国会で法案が可決された。', 'kokkai de houan ga kaketsu sareta.', 'O projeto de lei foi aprovado no parlamento.']],
    ['houan', '法案', 'houan', 'projeto de lei', '', ['新しい法案に反対する人が多い。', 'atarashii houan ni hantai suru hito ga ooi.', 'Muita gente é contra o novo projeto de lei.']],
    ['kenpou', '憲法', 'kenpou', 'constituição', '', ['憲法は国の基本的なルールだ。', 'kenpou wa kuni no kihonteki na ruuru da.', 'A constituição é a regra básica de um país.']],
    ['saiban', '裁判', 'saiban', 'julgamento, processo judicial', '', ['事件は裁判で争われている。', 'jiken wa saiban de arasowarete iru.', 'O caso está sendo disputado na justiça.']],
    ['kaisei', '改正', 'kaisei', 'reforma, emenda (de lei)', '', ['法律が改正された。', 'houritsu ga kaisei sareta.', 'A lei foi reformada.']],
    ['tohyou', '投票', 'tohyou', 'votação, voto', '', ['十八歳から投票できる。', 'juuhassai kara tohyou dekiru.', 'Pode-se votar a partir dos 18 anos.']]
  ], [
    ['政府は憲法改正について、国民の意見を聞くべきだ。', 'seifu wa kenpou kaisei ni tsuite, kokumin no iken o kiku beki da.', 'O governo deveria ouvir a opinião do povo sobre a reforma constitucional.']
  ], [
    X.s('Onde as leis são aprovadas no Japão?', ['国会|kokkai', '裁判|saiban', '首相|shushou'], '国会 = parlamento.'),
    X.s('O que é 法案?', ['projeto de lei', 'lei aprovada', 'juiz'], '法案 = proposta de lei.'),
    X.f('Ir votar', '＿に行く', ['投票|tohyou', '改正|kaisei', '政府|seifu'], '投票 = votar.'),
    X.s('O que é 憲法?', ['constituição', 'polícia', 'imposto'], '憲法 = constituição.')
  ])
  );
})();
