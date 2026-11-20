/* ==========================================================
   CONTEÚDO 3.0 — Avançado (N2): Leitura N2 (c29), Dialetos (c30)
   ========================================================== */
(function () {
  const { lesson: L, X, text: T } = NQK;

  /* ---------- c29 Leitura N2 ---------- */
  const r = NQK.wing({
    id: 'c29', emblem: '論', title: 'Leitura N2', jp: 'どっかい', stage: 'ava', jlpt: 'N2',
    desc: 'Editoriais, notícias, ensaios, cartas formais, regulamentos, colunas, entrevistas e um conto, no nível do N2.',
    requires: ['c22', 'c25'], reqWhy: 'Os textos usam a gramática N2 e partem da Leitura e Interpretação do intermediário.'
  });
  const howTo = a => [a, 'Leia uma vez para entender a ideia central e outra procurando a opinião do autor. As perguntas cobram detalhes e intenção.', 'Toque em “Mostrar tradução” só depois de tentar entender sozinho.'];
  r.lessons.push(
  L('c29l1', 'Editorial: trabalho remoto', '論', 'vocab', howTo('Um editorial de jornal discute vantagens e problemas do trabalho remoto.'),
    'Editoriais apresentam os dois lados (〜一方で, 〜反面) e terminam com a posição do jornal (〜べきだ, 〜が求められる).', [
    ['terewaaku', 'テレワーク', 'terewaaku', 'trabalho remoto', 'Também リモートワーク.', ['週に二日、テレワークをしている。', 'shuu ni futsuka, terewaaku o shite iru.', 'Trabalho remoto dois dias por semana.']],
    ['tsuukin', '通勤', 'tsuukin', 'deslocamento ao trabalho', '', ['通勤に片道一時間かかる。', 'tsuukin ni katamichi ichijikan kakaru.', 'O trajeto ao trabalho leva uma hora só de ida.']],
    ['kodoku', '孤独', 'kodoku', 'solidão, isolamento', '', ['一人暮らしで孤独を感じる。', 'hitorigurashi de kodoku o kanjiru.', 'Morando sozinho, sinto solidão.']],
    ['fukyuu', '普及', 'fukyuu', 'difusão, popularização', '', ['スマホの普及で生活が変わった。', 'sumaho no fukyuu de seikatsu ga kawatta.', 'Com a popularização do smartphone, a vida mudou.']],
    ['motomerareru', '求められる', 'motomerareru', 'ser exigido, ser necessário', '', ['新しいルール作りが求められる。', 'atarashii ruuru zukuri ga motomerareru.', 'É necessário criar novas regras.']],
    ['kouritsu', '効率', 'kouritsu', 'eficiência', '効率的 = eficiente.', ['効率よく勉強したい。', 'kouritsu yoku benkyou shitai.', 'Quero estudar de forma eficiente.']]
  ], [
    ['テレワークの普及は、働き方を大きく変えた。', 'terewaaku no fukyuu wa, hatarakikata o ookiku kaeta.', 'A difusão do trabalho remoto mudou muito o jeito de trabalhar.']
  ], [
    X.s('Segundo o texto, qual é uma vantagem do trabalho remoto?', ['Não perder tempo no deslocamento', 'Ganhar mais', 'Ter mais reuniões'], '通勤時間がなくなる.'),
    X.s('Qual problema o texto aponta?', ['Isolamento e dificuldade de separar trabalho e vida', 'Falta de computadores', 'Excesso de chefes'], '孤独, 仕事と生活の区別.'),
    X.s('Qual é a posição final do editorial?', ['Combinar escritório e trabalho remoto', 'Proibir o trabalho remoto', 'Fechar os escritórios'], 'うまく組み合わせる.'),
    X.s('Qual palavra resume a posição: “é necessário”?', ['求められる|motomerareru', '普及|fukyuu', '孤独|kodoku'], '〜が求められる.')
  ], { textTitle: 'Editorial: o futuro do trabalho remoto', text: T([
    ['感染症の流行をきっかけに、テレワークは急速に普及した。', 'kansenshou no ryuukou o kikkake ni, terewaaku wa kyuusoku ni fukyuu shita.', 'Com a epidemia como ponto de partida, o trabalho remoto se difundiu rapidamente.'],
    ['通勤時間がなくなり、家族と過ごす時間が増えたと感じる人は多い。', 'tsuukin jikan ga naku nari, kazoku to sugosu jikan ga fueta to kanjiru hito wa ooi.', 'Muita gente sente que, sem o tempo de deslocamento, passou a ter mais tempo com a família.'],
    ['一方で、同僚と直接話す機会が減り、孤独を感じるという声もある。', 'ippou de, douryou to chokusetsu hanasu kikai ga heri, kodoku o kanjiru to iu koe mo aru.', 'Por outro lado, há quem diga que se sente isolado, com menos chances de falar diretamente com colegas.'],
    ['また、家では仕事と生活の区別がつきにくく、かえって長く働いてしまう人もいる。', 'mata, ie de wa shigoto to seikatsu no kubetsu ga tsukinikuku, kaette nagaku hataraite shimau hito mo iru.', 'Além disso, em casa é difícil separar trabalho e vida pessoal, e há quem acabe trabalhando mais.'],
    ['テレワークは万能ではない。大切なのは、仕事の内容に応じて、出社と在宅をうまく組み合わせることだ。', 'terewaaku wa bannou de wa nai. taisetsu na no wa, shigoto no naiyou ni oujite, shussha to zaitaku o umaku kumiawaseru koto da.', 'O trabalho remoto não resolve tudo. O importante é combinar bem o escritório e o trabalho em casa, conforme o tipo de tarefa.'],
    ['企業には、働く人が効率よく、そして健康に働ける環境づくりが求められている。', 'kigyou ni wa, hataraku hito ga kouritsu yoku, soshite kenkou ni hatarakeru kankyou zukuri ga motomerarete iru.', 'Das empresas, exige-se criar um ambiente em que as pessoas trabalhem com eficiência e saúde.']
  ]) }),
  L('c29l2', 'Notícia: falta de mão de obra', '労', 'vocab', howTo('Uma notícia sobre o envelhecimento da população e a falta de trabalhadores no Japão.'),
    'Notícias usam números (割, 万人), passiva e expressões como 〜とみられる (estima-se) e 〜としている (afirma).', [
    ['koureika', '高齢化', 'koureika', 'envelhecimento (da população)', '少子高齢化 = baixa natalidade e envelhecimento.', ['日本は高齢化が進んでいる。', 'nihon wa koureika ga susunde iru.', 'O envelhecimento avança no Japão.']],
    ['hitodebusoku', '人手不足', 'hitode busoku', 'falta de mão de obra', '', ['介護の現場は人手不足だ。', 'kaigo no genba wa hitode busoku da.', 'Falta gente na área de cuidados a idosos.']],
    ['kaigo', '介護', 'kaigo', 'cuidado (de idosos, doentes)', '', ['祖母の介護をしている。', 'sobo no kaigo o shite iru.', 'Cuido da minha avó.']],
    ['ukeire', '受け入れ', 'ukeire', 'acolhimento, aceitação', '', ['外国人の受け入れが増えている。', 'gaikokujin no ukeire ga fuete iru.', 'O acolhimento de estrangeiros está aumentando.']],
    ['tomirareru', 'とみられる', 'to mirareru', 'estima-se que, acredita-se que', 'Expressão de notícias.', ['原因は雪とみられる。', 'gen\'in wa yuki to mirareru.', 'Acredita-se que a causa tenha sido a neve.']],
    ['kadai', '課題', 'kadai', 'desafio, questão a resolver', '', ['人手不足は大きな課題だ。', 'hitode busoku wa ookina kadai da.', 'A falta de mão de obra é um grande desafio.']]
  ], [
    ['少子高齢化により、働く人の数は減り続けている。', 'shoushi koureika ni yori, hataraku hito no kazu wa heritsuzukete iru.', 'Com a baixa natalidade e o envelhecimento, o número de trabalhadores continua caindo.']
  ], [
    X.s('Qual área sofre mais com a falta de pessoal, segundo o texto?', ['Cuidados a idosos e construção', 'Bancos', 'Universidades'], '介護や建設.'),
    X.s('Que porcentagem dos idosos o texto menciona?', ['Quase 30% da população', '10%', '50%'], '約三割.'),
    X.s('O que o governo está fazendo?', ['Aceitando mais trabalhadores estrangeiros', 'Proibindo a aposentadoria', 'Reduzindo salários'], '外国人労働者の受け入れ.'),
    X.s('O que significa とみられる?', ['estima-se que', 'foi visto', 'é proibido'], 'Expressão de notícias.')
  ], { textTitle: 'Falta de trabalhadores se agrava', text: T([
    ['厚生労働省の発表によると、全国の人手不足が年々深刻になっている。', 'kousei roudoushou no happyou ni yoru to, zenkoku no hitode busoku ga nennen shinkoku ni natte iru.', 'Segundo o Ministério da Saúde e do Trabalho, a falta de mão de obra em todo o país se agrava a cada ano.'],
    ['特に、介護や建設の現場では、求人を出しても人が集まらない状態が続いている。', 'toku ni, kaigo ya kensetsu no genba de wa, kyuujin o dashite mo hito ga atsumaranai joutai ga tsuzuite iru.', 'Em especial nos cuidados a idosos e na construção, mesmo anunciando vagas, ninguém aparece.'],
    ['日本では六十五歳以上の人が人口の約三割を占め、今後も増えるとみられる。', 'nihon de wa rokujuugosai ijou no hito ga jinkou no yaku sanwari o shime, kongo mo fueru to mirareru.', 'No Japão, pessoas com 65 anos ou mais são cerca de 30% da população, e estima-se que esse número continue aumentando.'],
    ['政府は外国人労働者の受け入れを拡大する方針で、制度の見直しを進めている。', 'seifu wa gaikokujin roudousha no ukeire o kakudai suru houshin de, seido no minaoshi o susumete iru.', 'O governo pretende ampliar a entrada de trabalhadores estrangeiros e está revendo o sistema.'],
    ['専門家は「言葉や生活の支援がなければ、人は定着しない」と指摘している。', 'senmonka wa "kotoba ya seikatsu no shien ga nakereba, hito wa teichaku shinai" to shiteki shite iru.', 'Especialistas apontam: “Sem apoio com o idioma e a vida diária, as pessoas não ficam”.'],
    ['働き手をどう確保するかは、日本社会全体の課題となっている。', 'hatarakite o dou kakuho suru ka wa, nihon shakai zentai no kadai to natte iru.', 'Como garantir trabalhadores tornou-se um desafio de toda a sociedade japonesa.']
  ]) }),
  L('c29l3', 'Ensaio: o valor do 間', '間', 'vocab', howTo('Um ensaio curto sobre 間 (ma), o espaço e a pausa na cultura japonesa.'),
    'Ensaios usam のではないか (não seria…?) e と言える (pode-se dizer) para apresentar ideias com cautela.', [
    ['ma', '間', 'ma', 'pausa, intervalo, espaço', 'Conceito estético japonês.', ['話の間の取り方がうまい。', 'hanashi no ma no torikata ga umai.', 'Ele sabe usar bem as pausas ao falar.']],
    ['chinmoku', '沈黙', 'chinmoku', 'silêncio', '', ['会議室に沈黙が流れた。', 'kaigishitsu ni chinmoku ga nagareta.', 'Um silêncio tomou a sala de reunião.']],
    ['yohaku', '余白', 'yohaku', 'espaço em branco, margem', '', ['この絵は余白が美しい。', 'kono e wa yohaku ga utsukushii.', 'O espaço vazio deste quadro é lindo.']],
    ['bunka', '文化', 'bunka', 'cultura', '', ['異なる文化を理解するのは難しい。', 'kotonaru bunka o rikai suru no wa muzukashii.', 'É difícil entender culturas diferentes.']],
    ['toieru', 'と言える', 'to ieru', 'pode-se dizer que', '', ['これは成功だったと言える。', 'kore wa seikou datta to ieru.', 'Pode-se dizer que foi um sucesso.']],
    ['kanjitoru', '感じ取る', 'kanjitoru', 'perceber, captar (pelo sentimento)', '', ['相手の気持ちを感じ取る。', 'aite no kimochi o kanjitoru.', 'Captar o sentimento do outro.']]
  ], [
    ['日本人は沈黙を、気まずいものではなく、意味のある時間と考えることがある。', 'nihonjin wa chinmoku o, kimazui mono de wa naku, imi no aru jikan to kangaeru koto ga aru.', 'Os japoneses às vezes veem o silêncio não como algo constrangedor, mas como um tempo com significado.']
  ], [
    X.s('Segundo o autor, o que é 間?', ['um espaço ou pausa com significado', 'um erro de comunicação', 'um tipo de comida'], '意味のある空白.'),
    X.s('Que exemplos de 間 o texto cita?', ['Pausas na conversa, margens na pintura e silêncio na música', 'Trens e estações', 'Feriados'], '会話, 絵, 音楽.'),
    X.s('Como alguém de outra cultura pode ver o silêncio?', ['Como constrangedor', 'Como engraçado', 'Como proibido'], '気まずい.'),
    X.s('Qual é a conclusão do autor?', ['Entender o 間 ajuda a entender a cultura japonesa', 'O 間 está desaparecendo', 'O 間 deve ser evitado'], '理解する鍵.')
  ], { textTitle: 'O valor do 間', text: T([
    ['日本の文化を語るとき、「間」という言葉は欠かせない。', 'nihon no bunka o kataru toki, "ma" to iu kotoba wa kakasenai.', 'Ao falar da cultura japonesa, a palavra “ma” é indispensável.'],
    ['間とは、何もない空白のことだが、それは単なる「無」ではない。', 'ma to wa, nani mo nai kuuhaku no koto da ga, sore wa tannaru "mu" de wa nai.', 'Ma é um espaço vazio, mas não é simplesmente “nada”.'],
    ['会話の間、絵の余白、音楽の沈黙。そこには意味があり、受け手はそれを感じ取る。', 'kaiwa no ma, e no yohaku, ongaku no chinmoku. soko ni wa imi ga ari, ukete wa sore o kanjitoru.', 'A pausa na conversa, a margem da pintura, o silêncio na música. Ali há significado, e quem recebe o capta.'],
    ['外国から来た人にとって、会話中の沈黙は気まずく感じられるかもしれない。', 'gaikoku kara kita hito ni totte, kaiwachuu no chinmoku wa kimazuku kanjirareru kamoshirenai.', 'Para quem vem de fora, o silêncio numa conversa pode parecer constrangedor.'],
    ['しかし日本人にとって、それは相手の言葉を受け止め、考えるための大切な時間なのではないか。', 'shikashi nihonjin ni totte, sore wa aite no kotoba o uketome, kangaeru tame no taisetsu na jikan na no de wa nai ka.', 'Mas, para os japoneses, não seria um tempo importante para receber as palavras do outro e pensar?'],
    ['間を理解することは、日本の文化を理解する一つの鍵だと言える。', 'ma o rikai suru koto wa, nihon no bunka o rikai suru hitotsu no kagi da to ieru.', 'Pode-se dizer que entender o ma é uma das chaves para entender a cultura japonesa.']
  ]) }),
  L('c29l4', 'E-mail de reclamação', '苦', 'vocab', howTo('Um cliente escreve à empresa reclamando de um produto com defeito.'),
    'Reclamações formais começam com uma breve saudação, descrevem o problema com fatos e terminam com um pedido claro.', [
    ['kujou', '苦情', 'kujou', 'reclamação', '', ['お客様から苦情があった。', 'okyakusama kara kujou ga atta.', 'Houve uma reclamação de um cliente.']],
    ['furyouhin', '不良品', 'furyouhin', 'produto com defeito', '', ['不良品を交換してもらった。', 'furyouhin o koukan shite moratta.', 'Trocaram o produto com defeito.']],
    ['koukan', '交換', 'koukan', 'troca', '', ['サイズが合わないので、交換したい。', 'saizu ga awanai node, koukan shitai.', 'O tamanho não serve, quero trocar.']],
    ['henkin', '返金', 'henkin', 'reembolso', '', ['返金をお願いしたいのですが。', 'henkin o onegai shitai no desu ga.', 'Gostaria de pedir o reembolso.']],
    ['gotaiou', 'ご対応', 'gotaiou', 'atendimento, providência (respeitoso)', '', ['早急なご対応をお願いいたします。', 'soukyuu na gotaiou o onegai itashimasu.', 'Peço uma providência urgente.']],
    ['koshou', '故障', 'koshou', 'defeito, pane', '故障中 = com defeito.', ['エレベーターが故障している。', 'erebeetaa ga koshou shite iru.', 'O elevador está com defeito.']]
  ], [
    ['商品が故障していたため、交換をお願いしたい。', 'shouhin ga koshou shite ita tame, koukan o onegai shitai.', 'Como o produto veio com defeito, gostaria de pedir a troca.']
  ], [
    X.s('Qual era o problema?', ['A cafeteira não ligava', 'O produto chegou atrasado', 'O preço estava errado'], '電源が入らない.'),
    X.s('Quando o cliente comprou o produto?', ['No dia 3 deste mês, pela loja on-line', 'No ano passado', 'Numa loja física'], '今月三日、オンラインショップで.'),
    X.s('O que o cliente pede?', ['Troca ou reembolso', 'Um desconto no próximo pedido', 'Uma visita técnica'], '交換または返金.'),
    X.s('Que tom o cliente usa?', ['Educado e firme', 'Agressivo e casual', 'Brincalhão'], 'Formal, com fatos.')
  ], { textTitle: 'Reclamação: cafeteira com defeito', text: T([
    ['株式会社カフェライフ　お客様相談室　御中', 'kabushiki gaisha kafe raifu okyakusama soudanshitsu onchuu', 'À Café Life Ltda., Central de Atendimento ao Cliente'],
    ['突然のご連絡、失礼いたします。', 'totsuzen no gorenraku, shitsurei itashimasu.', 'Desculpem o contato repentino.'],
    ['今月三日に、御社のオンラインショップでコーヒーメーカーを購入しました。', 'kongetsu mikka ni, onsha no onrain shoppu de koohii meekaa o kounyuu shimashita.', 'No dia 3 deste mês, comprei uma cafeteira na loja on-line de vocês.'],
    ['しかし、届いた商品は、説明書のとおりに操作しても電源が入りません。', 'shikashi, todoita shouhin wa, setsumeisho no toori ni sousa shite mo dengen ga hairimasen.', 'Porém, o produto que chegou não liga, mesmo seguindo o manual.'],
    ['不良品ではないかと思われますので、交換または返金をお願いできますでしょうか。', 'furyouhin de wa nai ka to omowaremasu node, koukan matawa henkin o onegai dekimasu deshou ka.', 'Parece ser um produto com defeito, então poderiam efetuar a troca ou o reembolso?'],
    ['お手数をおかけしますが、ご対応のほど、よろしくお願いいたします。', 'otesuu o okake shimasu ga, gotaiou no hodo, yoroshiku onegai itashimasu.', 'Desculpem o incômodo, e agradeço a providência.'],
    ['山本　健', 'yamamoto ken', 'Ken Yamamoto']
  ]) }),
  L('c29l5', 'Regulamento da biblioteca', '規', 'vocab', howTo('O regulamento de uma biblioteca municipal: empréstimos, prazos e proibições.'),
    'Regulamentos usam estruturas como 〜こと (deve-se), 〜ものとする (fica estabelecido) e 〜場合は (no caso de).', [
    ['kisoku', '規則', 'kisoku', 'regra, regulamento', '', ['規則を守ってください。', 'kisoku o mamotte kudasai.', 'Respeitem o regulamento.']],
    ['kashidashi', '貸出', 'kashidashi', 'empréstimo (de itens)', '', ['貸出は一人五冊までです。', 'kashidashi wa hitori gosatsu made desu.', 'O empréstimo é de até cinco livros por pessoa.']],
    ['kigen', '期限', 'kigen', 'prazo', '返却期限 = prazo de devolução.', ['返却期限を過ぎてしまった。', 'henkyaku kigen o sugite shimatta.', 'Passei do prazo de devolução.']],
    ['henkyaku', '返却', 'henkyaku', 'devolução', '', ['本は返却ポストに入れてください。', 'hon wa henkyaku posuto ni irete kudasai.', 'Coloque os livros na caixa de devolução.']],
    ['baai', '場合', 'baai', 'caso, situação', '〜場合は = no caso de.', ['雨の場合は中止です。', 'ame no baai wa chuushi desu.', 'Em caso de chuva, será cancelado.']],
    ['kinshi', '禁止', 'kinshi', 'proibição', '', ['館内での飲食は禁止です。', 'kannai de no inshoku wa kinshi desu.', 'É proibido comer e beber no interior do prédio.']]
  ], [
    ['期限を過ぎた場合は、一週間貸出ができません。', 'kigen o sugita baai wa, isshuukan kashidashi ga dekimasen.', 'Em caso de atraso, não será possível pegar livros emprestados por uma semana.']
  ], [
    X.s('Quantos livros se pode pegar de uma vez?', ['Até 10', 'Até 5', 'Sem limite'], '十冊まで.'),
    X.s('Por quanto tempo?', ['Duas semanas', 'Um mês', 'Três dias'], '二週間.'),
    X.s('O que acontece se atrasar a devolução?', ['Fica sem empréstimo pelo mesmo número de dias do atraso', 'Paga multa em dinheiro', 'Perde o cartão'], '遅れた日数と同じ期間.'),
    X.s('O que é permitido dentro da biblioteca?', ['Beber água em garrafa com tampa', 'Comer lanche', 'Falar ao telefone'], 'ふた付きの飲み物は可.')
  ], { textTitle: 'Regulamento da Biblioteca Municipal', text: T([
    ['みどり市立図書館　ご利用案内', 'midori shiritsu toshokan goriyou annai', 'Biblioteca Municipal de Midori: guia de uso'],
    ['一、貸出は一人十冊まで、期間は二週間とします。', 'ichi, kashidashi wa hitori jussatsu made, kikan wa nishuukan to shimasu.', '1. O empréstimo é de até 10 livros por pessoa, por duas semanas.'],
    ['二、返却が期限より遅れた場合は、遅れた日数と同じ期間、貸出ができなくなります。', 'ni, henkyaku ga kigen yori okureta baai wa, okureta nissuu to onaji kikan, kashidashi ga dekinaku narimasu.', '2. Em caso de atraso na devolução, o empréstimo fica suspenso pelo mesmo número de dias do atraso.'],
    ['三、館内での飲食は禁止です。ただし、ふた付きの飲み物は可とします。', 'san, kannai de no inshoku wa kinshi desu. tadashi, futatsuki no nomimono wa ka to shimasu.', '3. É proibido comer e beber no prédio. Porém, bebidas com tampa são permitidas.'],
    ['四、携帯電話での通話は、所定の場所でお願いします。', 'yon, keitai denwa de no tsuuwa wa, shotei no basho de onegai shimasu.', '4. Ligações ao celular, por favor, só nos locais indicados.'],
    ['五、本を汚したり、なくしたりした場合は、同じ本で弁償していただきます。', 'go, hon o yogoshitari, nakushitari shita baai wa, onaji hon de benshou shite itadakimasu.', '5. Em caso de livro sujo ou perdido, deve-se repor com um exemplar igual.']
  ]) }),
  L('c29l6', 'Coluna: desperdício de comida', '食', 'vocab', howTo('Uma coluna de jornal sobre o desperdício de alimentos (食品ロス) e o que cada um pode fazer.'),
    'Colunas mesclam dados, opinião e um apelo ao leitor: 〜てはどうだろうか (que tal…?), 〜ことから始めたい.', [
    ['shokuhinrosu', '食品ロス', 'shokuhin rosu', 'desperdício de alimentos', '', ['食品ロスを減らす取り組みが広がっている。', 'shokuhin rosu o herasu torikumi ga hirogatte iru.', 'Iniciativas para reduzir o desperdício de comida se espalham.']],
    ['haiki', '廃棄', 'haiki', 'descarte', '', ['毎日たくさんの弁当が廃棄されている。', 'mainichi takusan no bentou ga haiki sarete iru.', 'Muitas marmitas são descartadas todos os dias.']],
    ['shoumikigen', '賞味期限', 'shoumi kigen', 'data de validade (qualidade)', '消費期限 = prazo de consumo seguro.', ['賞味期限が少し過ぎても、食べられることが多い。', 'shoumi kigen ga sukoshi sugite mo, taberareru koto ga ooi.', 'Mesmo um pouco depois da validade, muitas vezes ainda dá para comer.']],
    ['mottainai', 'もったいない', 'mottainai', 'que desperdício', 'Valor cultural japonês.', ['まだ使えるのに、捨てるのはもったいない。', 'mada tsukaeru noni, suteru no wa mottainai.', 'Ainda dá para usar; jogar fora é desperdício.']],
    ['torikumi', '取り組み', 'torikumi', 'iniciativa, esforço', '', ['環境への取り組みを紹介する。', 'kankyou e no torikumi o shoukai suru.', 'Apresentar iniciativas ambientais.']],
    ['ishiki', '意識', 'ishiki', 'consciência', '', ['一人一人の意識が大切だ。', 'hitori hitori no ishiki ga taisetsu da.', 'A consciência de cada um é importante.']]
  ], [
    ['日本では、まだ食べられる食品が毎年大量に捨てられている。', 'nihon de wa, mada taberareru shokuhin ga maitoshi tairyou ni suterarete iru.', 'No Japão, uma grande quantidade de alimentos ainda comestíveis é jogada fora todo ano.']
  ], [
    X.s('Quanto desperdício o texto atribui às famílias?', ['Cerca de metade', 'Quase nada', 'Tudo'], '約半分は家庭から.'),
    X.s('Qual a diferença entre 賞味期限 e 消費期限?', ['賞味 = melhor qualidade; 消費 = consumo seguro', 'São iguais', '消費 = melhor sabor'], 'Explicado no texto.'),
    X.s('O que o autor propõe?', ['Comprar só o necessário e usar até o fim', 'Parar de cozinhar', 'Comer só fora'], '必要な分だけ買う.'),
    X.s('Qual palavra japonesa o autor destaca?', ['もったいない|mottainai', 'いただきます|itadakimasu', 'おいしい|oishii'], 'Espírito de não desperdiçar.')
  ], { textTitle: 'Coluna: “Mottainai” começa em casa', text: T([
    ['日本では、まだ食べられるのに捨てられる「食品ロス」が、年間五百万トン以上あるという。', 'nihon de wa, mada taberareru noni suterareru "shokuhin rosu" ga, nenkan gohyakuman ton ijou aru to iu.', 'Diz-se que, no Japão, o “desperdício de alimentos” ainda comestíveis passa de 5 milhões de toneladas por ano.'],
    ['その約半分は、店ではなく家庭から出ている。', 'sono yaku hanbun wa, mise de wa naku katei kara dete iru.', 'Cerca de metade disso vem não das lojas, mas das casas.'],
    ['原因の一つは、賞味期限の誤解だ。賞味期限はおいしく食べられる期限で、過ぎてもすぐに食べられなくなるわけではない。', 'gen\'in no hitotsu wa, shoumi kigen no gokai da. shoumi kigen wa oishiku taberareru kigen de, sugite mo sugu ni taberarenaku naru wake de wa nai.', 'Uma das causas é a confusão com a validade. O 賞味期限 indica até quando o sabor é o melhor; passar dele não significa que não se possa mais comer.'],
    ['一方、消費期限は安全に食べられる期限なので、守る必要がある。', 'ippou, shouhi kigen wa anzen ni taberareru kigen na node, mamoru hitsuyou ga aru.', 'Já o 消費期限 é o prazo de consumo seguro, e deve ser respeitado.'],
    ['昔から日本には「もったいない」という言葉がある。', 'mukashi kara nihon ni wa "mottainai" to iu kotoba ga aru.', 'Desde antigamente existe no Japão a palavra “mottainai”.'],
    ['必要な分だけ買い、最後まで使い切る。そんな小さなことから始めてはどうだろうか。', 'hitsuyou na bun dake kai, saigo made tsukaikiru. sonna chiisa na koto kara hajimete wa dou darou ka.', 'Comprar só o necessário e usar até o fim. Que tal começar por coisas pequenas assim?']
  ]) }),
  L('c29l7', 'Entrevista com um artesão', '匠', 'vocab', howTo('Uma entrevista com um artesão de facas que fala sobre tradição e futuro.'),
    'Entrevistas alternam perguntas (――) e respostas, com linguagem falada, mas educada.', [
    ['shokunin', '職人', 'shokunin', 'artesão, mestre de ofício', '', ['祖父は家具職人だった。', 'sofu wa kagu shokunin datta.', 'Meu avô era artesão de móveis.']],
    ['dentou', '伝統', 'dentou', 'tradição', '伝統的 = tradicional.', ['伝統を守りながら、新しいことにも挑戦する。', 'dentou o mamorinagara, atarashii koto ni mo chousen suru.', 'Preservar a tradição e também tentar coisas novas.']],
    ['shugyou', '修業', 'shugyou', 'aprendizado (de um ofício), treinamento', '', ['十年の修業を経て、独立した。', 'juunen no shugyou o hete, dokuritsu shita.', 'Depois de dez anos de aprendizado, abriu o próprio negócio.']],
    ['kodawari', 'こだわり', 'kodawari', 'exigência pessoal, capricho', '', ['素材にこだわりがある。', 'sozai ni kodawari ga aru.', 'Tenho capricho com os materiais.']],
    ['koukeisha', '後継者', 'koukeisha', 'sucessor', '後継者不足 = falta de sucessores.', ['後継者がいなくて困っている。', 'koukeisha ga inakute komatte iru.', 'Estou preocupado por não ter sucessor.']],
    ['chousen', '挑戦', 'chousen', 'desafio, tentativa', '', ['新しいことに挑戦したい。', 'atarashii koto ni chousen shitai.', 'Quero tentar coisas novas.']]
  ], [
    ['道具は使う人の手になじんで、初めて完成するんです。', 'dougu wa tsukau hito no te ni najinde, hajimete kansei suru n desu.', 'Uma ferramenta só fica completa quando se adapta à mão de quem a usa.']
  ], [
    X.s('Há quanto tempo o Sr. Tanaka faz facas?', ['Há 40 anos', 'Há 10 anos', 'Há 4 anos'], '四十年.'),
    X.s('Segundo ele, quando uma faca está “completa”?', ['Quando se adapta à mão de quem usa', 'Quando sai da forja', 'Quando é vendida'], '使う人の手になじんで.'),
    X.s('Qual é a preocupação dele?', ['Falta de sucessores', 'Falta de clientes', 'Preço do aço'], '後継者.'),
    X.s('O que ele faz para o futuro?', ['Ensina jovens, inclusive estrangeiros', 'Fecha a oficina', 'Muda de profissão'], '若い人、外国人にも教えている.')
  ], { textTitle: 'Entrevista: o mestre das facas', text: T([
    ['――田中さんは、包丁を作って何年になりますか。', 'tanaka-san wa, houchou o tsukutte nannen ni narimasu ka.', '— Sr. Tanaka, há quantos anos o senhor faz facas?'],
    ['もう四十年になります。父の工房で、十五歳から修業を始めました。', 'mou yonjuunen ni narimasu. chichi no koubou de, juugosai kara shugyou o hajimemashita.', 'Já são quarenta anos. Comecei o aprendizado aos quinze, na oficina do meu pai.'],
    ['――仕事で一番大切にしていることは何ですか。', 'shigoto de ichiban taisetsu ni shite iru koto wa nan desu ka.', '— O que o senhor mais valoriza no trabalho?'],
    ['使う人のことを考えることですね。包丁は、使う人の手になじんで、初めて完成するんです。', 'tsukau hito no koto o kangaeru koto desu ne. houchou wa, tsukau hito no te ni najinde, hajimete kansei suru n desu.', 'Pensar em quem vai usar. Uma faca só fica completa quando se adapta à mão de quem a usa.'],
    ['――伝統工芸は後継者不足が課題だと聞きます。', 'dentou kougei wa koukeisha busoku ga kadai da to kikimasu.', '— Dizem que a falta de sucessores é um desafio no artesanato tradicional.'],
    ['ええ、それが一番の心配です。でも最近は、海外から学びに来る若い人もいて、うれしいですね。伝統は、守るだけでなく、伝えていくものですから。', 'ee, sore ga ichiban no shinpai desu. demo saikin wa, kaigai kara manabi ni kuru wakai hito mo ite, ureshii desu ne. dentou wa, mamoru dake de naku, tsutaete iku mono desu kara.', 'Sim, é minha maior preocupação. Mas ultimamente vêm jovens do exterior aprender, e isso me alegra. Tradição não é só preservar: é transmitir.']
  ]) }),
  L('c29l8', 'Conto: a carta do avô', '紙', 'vocab', howTo('Um conto sobre uma neta que encontra uma carta antiga escrita pelo avô.'),
    'Contos literários usam o passado simples, descrições de sentimentos e às vezes frases curtas para criar ritmo.', [
    ['ihin', '遺品', 'ihin', 'pertences deixados por quem faleceu', '', ['祖父の遺品を整理した。', 'sofu no ihin o seiri shita.', 'Organizei os pertences deixados pelo meu avô.']],
    ['fuutou', '封筒', 'fuutou', 'envelope', '', ['封筒に切手を貼った。', 'fuutou ni kitte o hatta.', 'Colei o selo no envelope.']],
    ['kibamu', '黄ばむ', 'kibamu', 'amarelar (com o tempo)', '', ['古い写真が黄ばんでいる。', 'furui shashin ga kibande iru.', 'A foto antiga está amarelada.']],
    ['hisseki', '筆跡', 'hisseki', 'caligrafia (de alguém)', '', ['懐かしい筆跡だった。', 'natsukashii hisseki datta.', 'Era uma caligrafia que me trazia saudade.']],
    ['namida', '涙', 'namida', 'lágrima', '', ['涙が止まらなかった。', 'namida ga tomaranakatta.', 'As lágrimas não paravam.']],
    ['mimamoru', '見守る', 'mimamoru', 'zelar, olhar por (alguém)', '', ['いつも空から見守っているよ。', 'itsumo sora kara mimamotte iru yo.', 'Estou sempre olhando por você lá do céu.']]
  ], [
    ['その手紙は、十年後の私に宛てて書かれていた。', 'sono tegami wa, juunen go no watashi ni atete kakarete ita.', 'Aquela carta tinha sido escrita para mim, dez anos depois.']
  ], [
    X.s('Onde a neta encontrou a carta?', ['Numa gaveta da escrivaninha do avô', 'No correio', 'Num livro da escola'], '机の引き出し.'),
    X.s('Para quem era a carta?', ['Para a neta, aos 20 anos', 'Para a avó', 'Para o pai'], '二十歳になった美咲へ.'),
    X.s('Qual era o conselho principal do avô?', ['Escolher o que gosta, sem medo de errar', 'Ser médica', 'Morar no exterior'], '好きな道を選びなさい.'),
    X.s('Como a neta reagiu?', ['Chorou e sentiu o avô por perto', 'Riu', 'Jogou a carta fora'], '涙, 見守ってくれている.')
  ], { textTitle: 'A carta do avô', text: T([
    ['祖父が亡くなって半年後、私は祖父の部屋で遺品の整理をしていた。', 'sofu ga nakunatte hantoshi go, watashi wa sofu no heya de ihin no seiri o shite ita.', 'Seis meses depois que meu avô morreu, eu organizava os pertences dele no quarto.'],
    ['机の引き出しの奥から、黄ばんだ封筒が一通出てきた。', 'tsukue no hikidashi no oku kara, kibanda fuutou ga ittsuu dete kita.', 'Do fundo da gaveta da escrivaninha, apareceu um envelope amarelado.'],
    ['表には、懐かしい筆跡で「二十歳になった美咲へ」と書いてあった。', 'omote ni wa, natsukashii hisseki de "hatachi ni natta misaki e" to kaite atta.', 'Na frente, com aquela caligrafia tão familiar, estava escrito: “Para a Misaki, aos vinte anos”.'],
    ['「美咲、二十歳おめでとう。失敗を怖がらず、好きな道を選びなさい。」', '"misaki, hatachi omedetou. shippai o kowagarazu, suki na michi o erabinasai."', '“Misaki, parabéns pelos vinte anos. Não tenha medo de errar; escolha o caminho de que gosta.”'],
    ['今日は、ちょうど私の二十歳の誕生日だった。', 'kyou wa, choudo watashi no hatachi no tanjoubi datta.', 'Hoje era justamente o meu aniversário de vinte anos.'],
    ['涙が止まらなかった。祖父は、今もどこかで私を見守ってくれている。そんな気がした。', 'namida ga tomaranakatta. sofu wa, ima mo dokoka de watashi o mimamotte kurete iru. sonna ki ga shita.', 'As lágrimas não paravam. Senti que meu avô ainda está em algum lugar, olhando por mim.']
  ]) })
  );

  /* ---------- c30 Dialetos ---------- */
  const d = NQK.wing({
    id: 'c30', emblem: '方', title: 'Dialetos', jp: 'ほうげん', stage: 'ava', jlpt: 'N2',
    desc: 'Kansai (Osaka e Kyoto), Hiroshima, Hakata (Fukuoka), Tohoku e Okinawa: como reconhecer os principais dialetos do Japão.',
    requires: 'c21', reqWhy: 'Para reconhecer um dialeto, é preciso dominar primeiro a fala natural padrão.'
  });
  const dIntro = (a, b) => [a, b, 'O objetivo aqui é RECONHECER e entender. Imitar dialetos sem ser da região pode soar artificial, então use com moderação e bom humor.'];
  d.lessons.push(
  L('c30l1', 'Kansai I: o básico de Osaka', '阪', 'grammar', dIntro(
    'O 関西弁 (dialeto de Kansai) é o mais famoso do Japão, ouvido na TV, na comédia e em muitos animes.',
    'Principais mudanças: だ → や (そうや), ない → へん / ん (わからへん, 行かん), ほんとう → ほんま, ありがとう → おおきに (mais antigo).'),
    'A entonação de Kansai também é diferente: muitas palavras têm o acento invertido em relação a Tóquio.', [
    ['s1', 'そうやな。', 'sou ya na.', 'É mesmo. (padrão: そうだね)', 'だ → や.'],
    ['s2', '何言うてんねん。', 'nani yuuten nen.', 'Do que você está falando? (padrão: 何言ってるの)', 'Clássico de Osaka.'],
    ['s3', 'ようわからへん。', 'you wakarahen.', 'Não entendo direito. (padrão: よくわからない)', 'ない → へん.'],
    ['s4', 'あかん、遅れるわ。', 'akan, okureru wa.', 'Droga, vou me atrasar. (padrão: だめだ)', 'あかん = não dá, não pode.'],
    ['s5', 'これ、なんぼ？', 'kore, nanbo?', 'Quanto é isto? (padrão: いくら)', 'なんぼ = quanto.'],
    ['s6', 'ちゃうちゃう、そうやないって。', 'chau chau, sou ya nai tte.', 'Não, não, não é isso. (padrão: 違う違う)', 'ちゃう = 違う.']
  ], [
    ['めっちゃおもろいやん、これ。', 'meccha omoroi yan, kore.', 'Isto é muito engraçado, hein! (padrão: すごく面白いじゃん)']
  ], [
    X.s('Em Kansai, あかん significa:', ['não pode, não dá', 'vermelho', 'abrir'], 'あかん = だめ.'),
    X.s('Como se diz わからない em Kansai?', ['わからへん|wakarahen', 'わからんぜ|wakaran ze', 'わかりまへんだ|wakarimahenda'], 'ない → へん.'),
    X.s('O que significa なんぼ?', ['quanto (custa)', 'por quê', 'quem'], 'なんぼ = いくら.'),
    X.f('Não é isso! (Kansai)', '＿う、そうやない！', ['ちゃ|cha', 'ちが|chiga', 'じゃ|ja'], 'ちゃう = 違う.')
  ]),
  L('c30l2', 'Kansai II: Kyoto e expressões', '京', 'grammar', dIntro(
    'O dialeto de Kyoto (京都弁) é mais suave e elegante que o de Osaka, com formas como 〜はる (respeitoso leve) e 〜どす (antigo, das gueixas).',
    'Expressões comuns em todo Kansai: しんどい (cansativo), かまへん (tudo bem, não tem problema), ほな (então), おおきに (obrigado).'),
    'A fama de Kyoto: as pessoas falam de forma indireta. ぶぶ漬けでもどうどす？ (que tal um chazuke?) seria, na lenda, um jeito educado de dizer “já está na hora de ir embora”.', [
    ['s1', '先生、もう帰らはった？', 'sensei, mou kaerahatta?', 'O professor já foi embora? (はる = respeito leve)', '帰った → 帰らはった.'],
    ['s2', '今日はほんまにしんどいわ。', 'kyou wa honma ni shindoi wa.', 'Hoje está muito cansativo. (padrão: 本当に疲れた)', ''],
    ['s3', 'かまへん、かまへん。', 'kamahen, kamahen.', 'Tudo bem, não tem problema. (padrão: 構わない)', ''],
    ['s4', 'ほな、また明日。', 'hona, mata ashita.', 'Então, até amanhã. (padrão: じゃあ)', ''],
    ['s5', 'おおきに。', 'ookini.', 'Obrigado. (padrão: ありがとう)', 'Comum em lojas antigas.'],
    ['s6', 'よう来はりましたなあ。', 'you kiharimashita naa.', 'Que bom que veio. (Kyoto)', '来る → 来はる.']
  ], [
    ['そんなん、気にせんでええよ。', 'sonnan, ki ni sende ee yo.', 'Não precisa se preocupar com isso. (padrão: 気にしなくていいよ)']
  ], [
    X.s('O que significa しんどい?', ['cansativo, puxado', 'divertido', 'barato'], 'しんどい = cansativo.'),
    X.s('Como se diz じゃあ, また em Kansai?', ['ほな、また|hona, mata', 'ほんま、また|honma, mata', 'あかん、また|akan, mata'], 'ほな = então.'),
    X.s('O sufixo はる (帰らはる) expressa:', ['respeito leve', 'passado', 'negação'], 'Típico de Kyoto.'),
    X.f('Pode ficar tranquilo, não tem problema.', '＿へん。', ['かま|kama', 'しん|shin', 'あか|aka'], 'かまへん = tudo bem.')
  ]),
  L('c30l3', 'Hiroshima', '島', 'grammar', dIntro(
    'O 広島弁 (dialeto de Hiroshima) ficou famoso em filmes de yakuza e soa forte, mas no dia a dia é bem caloroso.',
    'Marcas: だ → じゃ (そうじゃ), から → けえ / けん (雨じゃけえ), とても → ぶち (ぶちうまい), 面倒 → たいぎい.'),
    'じゃけえ (= だから, por isso) é a expressão mais lembrada de Hiroshima.', [
    ['s1', 'そうじゃ。', 'sou ja.', 'É isso. (padrão: そうだ)', 'だ → じゃ.'],
    ['s2', '雨じゃけえ、行かん。', 'ame ja kee, ikan.', 'Como está chovendo, não vou. (padrão: 雨だから、行かない)', 'けえ = から.'],
    ['s3', 'このお好み焼き、ぶちうまい！', 'kono okonomiyaki, buchi umai!', 'Este okonomiyaki é muito bom! (padrão: すごくおいしい)', 'ぶち = muito.'],
    ['s4', '今日は仕事がたいぎいのう。', 'kyou wa shigoto ga taigii nou.', 'Hoje o trabalho está chato, hein. (padrão: 面倒だね)', 'たいぎい = cansativo, chato.'],
    ['s5', '何しよるん？', 'nani shiyorun?', 'O que está fazendo? (padrão: 何してるの？)', 'しよる = している.'],
    ['s6', 'はよ来んさい。', 'hayo kinsai.', 'Venha logo. (padrão: 早く来なさい)', '〜んさい = 〜なさい.']
  ], [
    ['広島のお好み焼きは、ぶち有名なんじゃけえ。', 'hiroshima no okonomiyaki wa, buchi yuumei nan ja kee.', 'O okonomiyaki de Hiroshima é famosíssimo, sabia? (padrão: すごく有名なんだから)']
  ], [
    X.s('O que significa ぶち em Hiroshima?', ['muito', 'pouco', 'nunca'], 'ぶち = とても.'),
    X.s('じゃけえ equivale a:', ['だから|dakara', 'でも|demo', 'しかし|shikashi'], 'Por isso.'),
    X.s('たいぎい significa:', ['chato, cansativo', 'grande', 'gostoso'], 'たいぎい = 面倒.'),
    X.f('Venha logo! (Hiroshima)', 'はよ来ん＿。', ['さい|sai', 'ない|nai', 'てる|teru'], '〜んさい = 〜なさい.')
  ]),
  L('c30l4', 'Hakata (Fukuoka)', '博', 'grammar', dIntro(
    'O 博多弁 (dialeto de Hakata, em Fukuoka) é considerado um dos mais charmosos, especialmente na fala feminina.',
    'Marcas: から → けん (雨やけん), の？ → と？ (何しよると？), いい → よか, 好き → すいとう (好いとう).'),
    'すいとうよ (= 好きだよ) é considerada uma das declarações de amor mais fofas em dialeto.', [
    ['s1', '何しよると？', 'nani shiyoru to?', 'O que está fazendo? (padrão: 何してるの？)', 'と？ = の？'],
    ['s2', '明日は雨やけん、傘持っていき。', 'ashita wa ame ya ken, kasa motte iki.', 'Amanhã vai chover, leve guarda-chuva. (padrão: 雨だから)', 'けん = から.'],
    ['s3', 'よかよか、気にせんで。', 'yoka yoka, ki ni sende.', 'Tudo bem, não se preocupe. (padrão: いいよ)', 'よか = いい.'],
    ['s4', 'あんたのこと、すいとうよ。', 'anta no koto, suitou yo.', 'Eu gosto de você. (padrão: 好きだよ)', 'Declaração famosa.'],
    ['s5', 'ばり寒かね。', 'bari samuka ne.', 'Está muito frio, hein. (padrão: すごく寒いね)', 'ばり = muito; 寒か = 寒い.'],
    ['s6', 'なんしようと、早よ来んね。', 'nan shiyou to, hayo konne.', 'O que está fazendo? Venha logo. (Hakata)', '来んね = 来なさい (suave).']
  ], [
    ['博多のラーメンは、ばりうまかよ。', 'hakata no raamen wa, bari umaka yo.', 'O lámen de Hakata é bom demais! (padrão: すごくおいしいよ)']
  ], [
    X.s('Em Hakata, よか significa:', ['bom, tudo bem', 'noite', 'quatro'], 'よか = いい.'),
    X.s('Como se pergunta “o que está fazendo?” em Hakata?', ['何しよると？|nani shiyoru to?', '何しよるん？|nani shiyorun?', '何しとるじゃ？|nani shitoru ja?'], 'と？ no fim.'),
    X.s('ばり significa:', ['muito', 'nada', 'devagar'], 'ばり = すごく.'),
    X.s('O que é すいとうよ?', ['eu gosto de você', 'estou com fome', 'é água'], '好いとう = 好きだ.')
  ]),
  L('c30l5', 'Tohoku', '北', 'grammar', dIntro(
    'O dialeto de Tohoku (東北弁), no norte de Honshu, é conhecido pelo som “abafado” e pelas vogais misturadas (し e す soam parecidos).',
    'Marcas: 〜だろう / 〜よう → 〜べ (行くべ = vamos), そうだ → んだ, かわいい → めんこい, 寒い → しばれる (Hokkaido/Tohoku).'),
    'Em Tohoku, んだ não é o explicativo do padrão: é “isso mesmo, é verdade”.', [
    ['s1', 'んだ、んだ。', 'nda, nda.', 'Isso mesmo, isso mesmo. (padrão: そうだ)', ''],
    ['s2', '一緒に行くべ。', 'issho ni iku be.', 'Vamos juntos. (padrão: 行こう)', 'べ = volitivo/suposição.'],
    ['s3', 'この子、めんこいなあ。', 'kono ko, menkoi naa.', 'Que criança fofa. (padrão: かわいい)', ''],
    ['s4', '今日はしばれるねえ。', 'kyou wa shibareru nee.', 'Hoje está um frio de rachar. (padrão: とても寒い)', 'Hokkaido e norte.'],
    ['s5', 'わがんねえ。', 'wagannee.', 'Não entendo. (padrão: わからない)', 'Consoantes sonorizadas.'],
    ['s6', 'まんず、上がってけろ。', 'manzu, agatte kero.', 'Bem, entre, por favor. (padrão: まず、上がってください)', 'けろ = ください.']
  ], [
    ['雪が降ってきたから、早く帰るべ。', 'yuki ga futte kita kara, hayaku kaeru be.', 'Começou a nevar, vamos voltar logo. (padrão: 帰ろう)']
  ], [
    X.s('Em Tohoku, 行くべ significa:', ['vamos', 'não vou', 'fui'], 'べ = volitivo.'),
    X.s('めんこい significa:', ['fofo, bonitinho', 'feio', 'frio'], 'めんこい = かわいい.'),
    X.s('んだ em Tohoku é:', ['isso mesmo', 'é que… (explicação)', 'não'], 'Concordância.'),
    X.s('しばれる descreve:', ['frio intenso', 'calor', 'chuva'], 'Norte do Japão.')
  ]),
  L('c30l6', 'Okinawa', '沖', 'grammar', dIntro(
    'Okinawa tem línguas próprias (as línguas ryukyuanas) e um japonês regional com muitas palavras locais, conhecido como ウチナーヤマトグチ.',
    'Palavras famosas: めんそーれ (bem-vindo), はいさい (olá, homens) / はいたい (olá, mulheres), なんくるないさ (vai dar tudo certo), ちゅら (bonito).'),
    'なんくるないさ (vai dar tudo certo) resume a filosofia tranquila de Okinawa.', [
    ['s1', 'めんそーれ、沖縄へ！', 'mensoore, okinawa e!', 'Bem-vindo a Okinawa!', 'めんそーれ = いらっしゃい.'],
    ['s2', 'はいさい！元気？', 'haisai! genki?', 'Olá! Tudo bem?', 'Saudação (homens).'],
    ['s3', 'なんくるないさ。', 'nankurunaisa.', 'Vai dar tudo certo.', 'Lema de Okinawa.'],
    ['s4', 'ちゅら海、きれいだね。', 'churaumi, kirei da ne.', 'O mar bonito de Okinawa é lindo, né.', 'ちゅら = bonito.'],
    ['s5', 'にふぇーでーびる。', 'nifeedeebiru.', 'Muito obrigado. (língua de Okinawa)', ''],
    ['s6', 'ゆいまーるの心を大切に。', 'yuimaaru no kokoro o taisetsu ni.', 'Valorize o espírito de ajuda mútua.', 'ゆいまーる = ajuda mútua.']
  ], [
    ['失敗しても、なんくるないさ。また頑張ろう。', 'shippai shite mo, nankurunaisa. mata ganbarou.', 'Mesmo que dê errado, vai ficar tudo bem. Vamos tentar de novo.']
  ], [
    X.s('Em Okinawa, めんそーれ significa:', ['bem-vindo', 'adeus', 'obrigado'], 'めんそーれ = いらっしゃい.'),
    X.s('O que significa なんくるないさ?', ['vai dar tudo certo', 'não tem nada', 'não sei'], 'Lema de Okinawa.'),
    X.s('ちゅら em ちゅら海 significa:', ['bonito', 'grande', 'frio'], 'ちゅら = 美しい.'),
    X.s('O que é ゆいまーる?', ['ajuda mútua', 'uma comida', 'um festival'], 'Espírito comunitário.')
  ])
  );
})();
