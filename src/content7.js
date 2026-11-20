/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5): Partículas a Fundo (c12)
   As partículas básicas foram apresentadas em Gramática (c5).
   Aqui elas são aprofundadas: diferenças, exceções e usos novos.
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c12', emblem: 'は', title: 'Partículas a Fundo', jp: 'じょし', stage: 'ini', jlpt: 'N5',
    desc: 'は ou が? に ou で? Diferenças, exceções e os usos que mudam o sentido da frase.',
    requires: 'c5', reqNote: 'Liberada ao concluir Gramática.'
  });
  c.lessons.push(
  L('c12l1', 'は ou が? (1) O assunto e a informação nova', 'が', 'grammar', [
    'は apresenta o assunto da frase: “quanto a isto…”. O que vem DEPOIS de は é a informação importante. わたしは ブラジルじんです: o importante é “brasileiro”.',
    'が destaca o que vem ANTES dele. Por isso, palavras interrogativas (だれ, なに, どれ) sempre usam が, nunca は: だれが きましたか (Quem veio?).',
    'Na resposta, a informação nova também leva が: たなかさんが きました (Foi o Tanaka que veio).'
  ], 'Regra prática: se a pergunta usa が, a resposta também usa が.', [
    ['s1', 'だれが きましたか。', 'dare ga kimashita ka.', 'Quem veio?', 'だれ (quem) sempre com が.'],
    ['s2', 'たなかさんが きました。', 'Tanaka-san ga kimashita.', 'Foi o Tanaka que veio.', 'Responde à pergunta: が marca a informação nova.'],
    ['s3', 'たなかさんは きました。', 'Tanaka-san wa kimashita.', 'O Tanaka, (ele) veio.', 'Com は, o assunto é o Tanaka e a notícia é que ele veio. Pode sugerir que outros não vieram.'],
    ['s4', 'どれが あなたの かさですか。', 'dore ga anata no kasa desu ka.', 'Qual é o seu guarda-chuva?', 'どれ com が.'],
    ['s5', 'これが わたしの かさです。', 'kore ga watashi no kasa desu.', 'Este aqui é o meu guarda-chuva.', 'が destaca “este”, apontando entre vários.'],
    ['s6', 'あ、バスが きました！', 'a, basu ga kimashita!', 'Ah, o ônibus chegou!', 'Algo que acontece diante dos olhos, como novidade: が.']
  ], [
    ['なにが いちばん すきですか。 … すしが いちばん すきです。', 'nani ga ichiban suki desu ka. … sushi ga ichiban suki desu.', 'Do que você mais gosta? … Do que mais gosto é sushi.']
  ], [
    X.f('Quem fez isto?', 'だれ＿ しましたか。', ['が|ga', 'は|wa', 'を|o'], 'Palavras interrogativas como だれ usam が, nunca は.'),
    X.s('Pergunta: どれが あなたの ですか。 Qual resposta é natural?', ['これが わたしのです|kore ga watashi no desu', 'これは わたしのです|kore wa watashi no desu', 'これを わたしのです|kore o watashi no desu'], 'A pergunta usou が; a resposta aponta a informação nova com が.'),
    X.s('Você vê o ônibus chegando agora. O que diz?', ['バスが きました！|basu ga kimashita!', 'バスは きました！|basu wa kimashita!', 'バスを きました！|basu o kimashita!'], 'Algo novo que acontece na sua frente: が.'),
    X.e('Perguntando “Quem é o professor?”', ['だれは|dare wa', 'せんせいですか|sensei desu ka'], 0, 'だれ nunca leva は. O certo é: だれが せんせいですか。')
  ]),
  L('c12l2', 'は ou が? (2) Contraste e verbos de sentimento', '対', 'grammar', [
    'は também serve para contrastar: にくは たべますが、さかなは たべません (carne eu como, mas peixe não).',
    'Por isso, frases negativas costumam usar は: コーヒーは のみません (café, eu não bebo, ao contrário de outras bebidas).',
    'Algumas palavras usam が para o objeto, não を: すき, きらい, じょうず, へた, わかる, できる, ほしい. わたしは ねこが すきです = eu gosto de gatos.'
  ], 'Em わたしは ねこが すきです, は marca quem sente (eu) e が marca o que é gostado (gatos).', [
    ['s1', 'にくは たべますが、さかなは たべません。', 'niku wa tabemasu ga, sakana wa tabemasen.', 'Carne eu como, mas peixe não.', 'Os dois は criam contraste.'],
    ['s2', 'おさけは のみません。', 'osake wa nomimasen.', 'Bebida alcoólica, eu não bebo.', 'Negativo com は: sugere que outras coisas sim.'],
    ['s3', 'わたしは ねこが すきです。', 'watashi wa neko ga suki desu.', 'Eu gosto de gatos.', 'すき usa が para o objeto.'],
    ['s4', 'にほんごが わかります。', 'nihongo ga wakarimasu.', 'Eu entendo japonês.', 'わかる usa が, não を.'],
    ['s5', 'あには りょうりが じょうずです。', 'ani wa ryouri ga jouzu desu.', 'Meu irmão mais velho cozinha bem.', 'じょうず (bom em) usa が.'],
    ['s6', 'ピアノが できます。', 'piano ga dekimasu.', 'Sei tocar piano.', 'できる (conseguir, saber fazer) usa が.']
  ], [
    ['ひらがなは よめますが、かんじは まだ よめません。', 'hiragana wa yomemasu ga, kanji wa mada yomemasen.', 'Hiragana eu consigo ler, mas kanji ainda não.']
  ], [
    X.f('Eu gosto de anime.', 'わたしは アニメ＿ すきです。', ['が|ga', 'を|o', 'に|ni'], 'すき marca o objeto com が.'),
    X.f('Carne eu como, mas peixe não.', 'にくは たべますが、さかな＿ たべません。', ['は|wa', 'が|ga', 'を|o'], 'Contraste: は nos dois lados.'),
    X.s('Qual frase está natural para “Eu entendo inglês”?', ['えいごが わかります|eigo ga wakarimasu', 'えいごを わかります|eigo o wakarimasu', 'えいごに わかります|eigo ni wakarimasu'], 'わかる usa が.'),
    X.e('Dizendo que sabe nadar:', ['すいえいを|suiei o', 'できます|dekimasu'], 0, 'できる usa が: すいえいが できます.')
  ]),
  L('c12l3', 'に: horário, destino e a pessoa que recebe', 'に', 'grammar', [
    'に marca um ponto exato: no tempo (しちじに = às sete), no espaço (がっこうに いく = ir à escola) e a pessoa que recebe algo (ともだちに あげる = dar ao amigo).',
    'Exceção importante: palavras de tempo relativo NÃO usam に: きょう, あした, きのう, まいにち, らいしゅう, いま. Dias da semana podem usar ou não.',
    'に também marca onde algo ou alguém está: こうえんに いぬが います.'
  ], 'Teste rápido: se dá para apontar no relógio ou no calendário (7h, dia 3, 2025), use に. あした e まいにち não usam.', [
    ['s1', 'ろくじはんに おきます。', 'rokuji han ni okimasu.', 'Acordo às seis e meia.', 'Horário exato: に.'],
    ['s2', 'あした いきます。', 'ashita ikimasu.', 'Vou amanhã.', 'あした não usa に.'],
    ['s3', 'まいにち べんきょうします。', 'mainichi benkyou shimasu.', 'Estudo todos os dias.', 'まいにち não usa に.'],
    ['s4', 'ともだちに メールを おくります。', 'tomodachi ni meeru o okurimasu.', 'Mando um e-mail para um amigo.', 'に marca quem recebe.'],
    ['s5', 'せんせいに ききます。', 'sensei ni kikimasu.', 'Vou perguntar ao professor.', 'に marca a pessoa a quem se pergunta.'],
    ['s6', 'にせんにじゅうごねんに にほんへ いきました。', 'nisen nijuugo nen ni nihon e ikimashita.', 'Fui ao Japão em 2025.', 'Ano exato: に.']
  ], [
    ['どようびに えいがを みます。', 'doyoubi ni eiga o mimasu.', 'No sábado vou ver um filme. (dias da semana: に é opcional)']
  ], [
    X.f('Vou amanhã.', 'あした＿ いきます。', ['(nada)', 'に|ni', 'で|de'], 'あした, きょう, まいにち não levam に. A frase certa é あした いきます.'),
    X.f('Durmo às onze.', 'じゅういちじ＿ ねます。', ['に|ni', 'で|de', 'を|o'], 'Horário exato: に.'),
    X.s('Como dizer “Vou perguntar ao professor”?', ['せんせいに ききます|sensei ni kikimasu', 'せんせいを ききます|sensei o kikimasu', 'せんせいで ききます|sensei de kikimasu'], 'A pessoa a quem se pergunta leva に.'),
    X.e('Estudo todos os dias:', ['まいにちに|mainichi ni', 'べんきょうします|benkyou shimasu'], 0, 'まいにち não leva に.')
  ]),
  L('c12l4', 'で ou に? Onde a ação acontece', 'で', 'grammar', [
    'Os dois marcam lugar, mas de jeitos diferentes. に é onde algo EXISTE ou PARA ONDE vai: こうえんに います (está no parque). で é onde uma AÇÃO acontece: こうえんで あそびます (brinca no parque).',
    'で também marca o meio ou instrumento (はしで たべる = comer com hashi), a língua (にほんごで はなす) e o limite de uma comparação (クラスで いちばん = o melhor da turma).',
    'Verbos como すむ (morar) e すわる (sentar) usam に, porque indicam onde a pessoa fica: とうきょうに すんで います.'
  ], 'Pergunte-se: alguém FAZ algo ali (で) ou algo ESTÁ/CHEGA ali (に)?', [
    ['s1', 'こうえんで あそびます。', 'kouen de asobimasu.', 'Brinco no parque.', 'Ação no lugar: で.'],
    ['s2', 'こうえんに こどもが います。', 'kouen ni kodomo ga imasu.', 'Há crianças no parque.', 'Existência: に.'],
    ['s3', 'にほんごで はなしましょう。', 'nihongo de hanashimashou.', 'Vamos conversar em japonês.', 'Língua usada: で.'],
    ['s4', 'クラスで いちばん せが たかいです。', 'kurasu de ichiban se ga takai desu.', 'É o mais alto da turma.', 'Limite da comparação: で.'],
    ['s5', 'ここに すわって ください。', 'koko ni suwatte kudasai.', 'Sente-se aqui, por favor.', 'すわる usa に.'],
    ['s6', 'としょかんで べんきょうします。', 'toshokan de benkyou shimasu.', 'Estudo na biblioteca.', 'Ação: で.']
  ], [
    ['えきで ともだちに あいました。', 'eki de tomodachi ni aimashita.', 'Encontrei um amigo na estação. (で: onde aconteceu; に: com quem)']
  ], [
    X.f('Comprei pão no supermercado.', 'スーパー＿ パンを かいました。', ['で|de', 'に|ni', 'を|o'], 'Comprar é uma ação: で.'),
    X.f('O gato está no quarto.', 'へやに ねこが ＿＿＿。', ['います|imasu', 'あそびます|asobimasu', 'たべます|tabemasu'], 'に + います: existência.'),
    X.s('Como se diz “Moro em Osaka”?', ['おおさかに すんで います|oosaka ni sunde imasu', 'おおさかで すんで います|oosaka de sunde imasu', 'おおさかを すんで います|oosaka o sunde imasu'], 'すむ (morar) usa に.'),
    X.e('Estudo na biblioteca:', ['としょかんに|toshokan ni', 'べんきょうします|benkyou shimasu'], 0, 'Estudar é ação: としょかんで.')
  ]),
  L('c12l5', 'と, や e とか: listas e companhia', 'と', 'grammar', [
    'と liga substantivos numa lista completa: パンと たまご (pão e ovo, só isso). Também marca companhia: ともだちと いく (ir com um amigo).',
    'や dá exemplos de uma lista que tem mais coisas: パンや たまご (pão, ovo, entre outros). Muitas vezes termina com など (etc.).',
    'とか é a versão falada de や, comum entre amigos: アニメとか ゲームとか すき (gosto de coisas como anime e jogos).'
  ], 'と não liga verbos nem frases! “Comi e dormi” é たべて、ねました (forma て), nunca と.', [
    ['s1', 'パンと たまごを たべました。', 'pan to tamago o tabemashita.', 'Comi pão e ovo (só isso).', 'Lista completa: と.'],
    ['s2', 'パンや たまごを かいました。', 'pan ya tamago o kaimashita.', 'Comprei pão, ovo e outras coisas.', 'Lista de exemplos: や.'],
    ['s3', 'くだものや やさいなどが あります。', 'kudamono ya yasai nado ga arimasu.', 'Há frutas, verduras etc.', 'や … など = … etc.'],
    ['s4', 'ともだちと えいがを みます。', 'tomodachi to eiga o mimasu.', 'Vou ver um filme com um amigo.', 'と = com (companhia).'],
    ['s5', 'アニメとか ゲームとか すき。', 'anime toka geemu toka suki.', 'Curto coisas como anime e jogos.', 'とか: casual, entre amigos.'],
    ['s6', 'ひとりで いきます。', 'hitori de ikimasu.', 'Vou sozinho.', 'O contrário de “com alguém”: ひとりで.']
  ], [
    ['かぞくと いっしょに りょこうします。', 'kazoku to issho ni ryokou shimasu.', 'Vou viajar junto com a família.']
  ], [
    X.s('Você comprou pão, leite e outras coisas. Qual partícula liga os itens?', ['や|ya', 'と|to', 'も|mo'], 'Lista incompleta, só exemplos: や.'),
    X.f('Vou ao cinema com a Aoi.', 'あおいさん＿ えいがかんに いきます。', ['と|to', 'や|ya', 'が|ga'], 'Companhia: と.'),
    X.s('Como dizer “Comi e depois dormi”?', ['たべて、ねました|tabete, nemashita', 'たべたと ねました|tabeta to nemashita', 'たべると ねました|taberu to nemashita'], 'と não liga verbos. Use a forma て.'),
    X.o('Comi só pão e ovo.', ['パンと|pan to', 'たまごを|tamago o', 'たべました|tabemashita'], ['パンや|pan ya'], 'Lista completa: と.')
  ]),
  L('c12l6', 'から, まで e までに', '迄', 'grammar', [
    'から = desde/de; まで = até. Funcionam com tempo e lugar: くじから ごじまで (das 9 às 5), えきから うちまで (da estação até em casa).',
    'までに é diferente: indica um PRAZO, “até tal hora no máximo”. ごじまでに かえります = volto antes das 5 (em algum momento até as 5).',
    'Compare: ごじまで まちます (espero continuamente até as 5) × ごじまでに きて ください (venha até as 5, no máximo).'
  ], 'Se a ação dura o tempo todo, まで. Se acontece uma vez antes do limite, までに.', [
    ['s1', 'くじから ごじまで はたらきます。', 'kuji kara goji made hatarakimasu.', 'Trabalho das 9 às 5.', ''],
    ['s2', 'えきから うちまで あるきます。', 'eki kara uchi made arukimasu.', 'Vou a pé da estação até em casa.', ''],
    ['s3', 'ごじまで まって います。', 'goji made matte imasu.', 'Fico esperando até as 5.', 'Ação contínua: まで.'],
    ['s4', 'ごじまでに かえって ください。', 'goji made ni kaette kudasai.', 'Volte até as 5, no máximo.', 'Prazo: までに.'],
    ['s5', 'きんようびまでに レポートを だします。', 'kin\'youbi made ni repooto o dashimasu.', 'Vou entregar o relatório até sexta.', 'Prazo: までに.'],
    ['s6', 'おおさかから きました。', 'oosaka kara kimashita.', 'Vim de Osaka.', 'Origem: から.']
  ], [
    ['なつやすみは しちがつから はちがつまでです。', 'natsuyasumi wa shichigatsu kara hachigatsu made desu.', 'As férias de verão são de julho a agosto.']
  ], [
    X.f('Entregue a lição de casa até amanhã (no máximo).', 'しゅくだいは あした＿＿＿ だして ください。', ['までに|made ni', 'まで|made', 'から|kara'], 'Prazo: までに.'),
    X.f('Vou dormir até as 10.', 'じゅうじ＿＿ ねます。', ['まで|made', 'までに|made ni', 'に|ni'], 'Dormir é contínuo até as 10: まで.'),
    X.s('ごじまでに きて ください significa…', ['Venha até as 5, no máximo.', 'Venha às 5 em ponto.', 'Fique aqui até as 5.'], 'までに = prazo.'),
    X.o('Trabalho das 9 às 5.', ['くじから|kuji kara', 'ごじまで|goji made', 'はたらきます|hatarakimasu'], ['ごじまでに|goji made ni'], 'から … まで.')
  ]),
  L('c12l7', 'を com movimento e へ ou に', '道', 'grammar', [
    'を, além do objeto, marca o espaço por onde se passa ou que se deixa: こうえんを さんぽする (passear pelo parque), みちを わたる (atravessar a rua), いえを でる (sair de casa).',
    'へ e に com verbos de ir/vir: へ destaca a direção (“rumo a”), に destaca o destino final. Na prática, ambos funcionam: にほんへ / にほんに いきます.',
    'Mas só へ pode vir antes de の: にほんへの てがみ (uma carta para o Japão). E só に marca a pessoa que recebe.'
  ], 'へ se pronuncia “e” quando é partícula, igual a は que se pronuncia “wa”.', [
    ['s1', 'こうえんを さんぽします。', 'kouen o sanpo shimasu.', 'Passeio pelo parque.', 'を: o espaço percorrido.'],
    ['s2', 'みちを わたります。', 'michi o watarimasu.', 'Atravesso a rua.', ''],
    ['s3', 'はちじに いえを でます。', 'hachiji ni ie o demasu.', 'Saio de casa às oito.', 'を: o lugar que se deixa.'],
    ['s4', 'そらを とんで います。', 'sora o tonde imasu.', 'Está voando pelo céu.', ''],
    ['s5', 'ははへの プレゼントです。', 'haha e no purezento desu.', 'É um presente para a minha mãe.', 'へ + の: só へ funciona aqui.'],
    ['s6', 'かどを みぎに まがって ください。', 'kado o migi ni magatte kudasai.', 'Vire à direita na esquina.', 'かどを = passando pela esquina.']
  ], [
    ['でんしゃを おりて、はしを わたります。', 'densha o orite, hashi o watarimasu.', 'Desço do trem e atravesso a ponte.']
  ], [
    X.f('Saio de casa às oito.', 'はちじに いえ＿ でます。', ['を|o', 'に|ni', 'で|de'], 'でる (sair de) usa を.'),
    X.f('Atravesse a ponte.', 'はし＿ わたって ください。', ['を|o', 'に|ni', 'へ|e'], 'Espaço atravessado: を.'),
    X.s('Como dizer “uma carta para o Japão”?', ['にほんへの てがみ|nihon e no tegami', 'にほんにの てがみ|nihon ni no tegami', 'にほんを てがみ|nihon o tegami'], 'Só へ pode vir antes de の.'),
    X.e('Passeio pelo parque:', ['こうえんで|kouen de', 'さんぽします|sanpo shimasu'], 0, 'O espaço percorrido usa を: こうえんを さんぽします.')
  ]),
  L('c12l8', 'の: muito além de “de”', 'の', 'grammar', [
    'Você já conhece の para posse: わたしの ほん. Mas の também liga dois substantivos para descrever: にほんごの ほん (livro de japonês), くるまの かぎ (chave do carro).',
    'の pode substituir um substantivo já conhecido: あかいのを ください (me dá o vermelho). Assim não se repete a palavra.',
    'の também liga um nome a quem ele é: ともだちの あおいさん (minha amiga Aoi).'
  ], 'Ordem invertida em relação ao português: くるまの かぎ = “carro de chave” → chave do carro.', [
    ['s1', 'くるまの かぎは どこですか。', 'kuruma no kagi wa doko desu ka.', 'Onde está a chave do carro?', ''],
    ['s2', 'あかいのを ください。', 'akai no o kudasai.', 'Me dá o vermelho, por favor.', 'の = “o (aquele)”.'],
    ['s3', 'この かさは わたしのです。', 'kono kasa wa watashi no desu.', 'Este guarda-chuva é meu.', 'わたしの = o meu.'],
    ['s4', 'ともだちの あおいさんです。', 'tomodachi no Aoi-san desu.', 'Esta é minha amiga Aoi.', 'の liga o nome a quem ela é.'],
    ['s5', 'にほんの アニメが すきです。', 'nihon no anime ga suki desu.', 'Gosto de anime japonês.', ''],
    ['s6', 'あたらしいのと ふるいの、どっちが いい？', 'atarashii no to furui no, docchi ga ii?', 'O novo ou o velho, qual é melhor?', 'の evita repetir o substantivo.']
  ], [
    ['この ペンは だれのですか。 … わたしのです。', 'kono pen wa dare no desu ka. … watashi no desu.', 'De quem é esta caneta? … É minha.']
  ], [
    X.s('Na loja, você quer o modelo vermelho, sem repetir “camiseta”. O que diz?', ['あかいのを ください|akai no o kudasai', 'あかいを ください|akai o kudasai', 'あかの ください|aka no kudasai'], 'Adjetivo + の substitui o substantivo.'),
    X.f('Onde está a chave do carro?', 'くるま＿ かぎは どこですか。', ['の|no', 'が|ga', 'と|to'], 'くるまの かぎ = chave do carro.'),
    X.o('Este guarda-chuva é meu.', ['この かさは|kono kasa wa', 'わたしのです|watashi no desu'], ['わたしが|watashi ga'], 'わたしの = o meu.'),
    X.e('“Livro de japonês”:', ['ほんの|hon no', 'にほんご|nihongo'], 0, 'A ordem é inversa: にほんごの ほん.')
  ]),
  L('c12l9', 'も com perguntas: ninguém, nada, nenhum lugar', '無', 'grammar', [
    'Palavra interrogativa + も + verbo negativo = “nenhum”: なにも たべません (não como nada), だれも いません (não há ninguém).',
    'Com lugares, a partícula fica antes do も: どこにも いきません (não vou a lugar nenhum), だれとも はなしません (não falo com ninguém).',
    'Com verbo positivo, palavra interrogativa + か = “algum”: なにか たべます (vou comer alguma coisa), だれか いますか (tem alguém?).'
  ], 'なにも só funciona com negativo. Para “tudo”, use ぜんぶ.', [
    ['s1', 'なにも たべませんでした。', 'nani mo tabemasen deshita.', 'Não comi nada.', ''],
    ['s2', 'へやに だれも いません。', 'heya ni dare mo imasen.', 'Não há ninguém no quarto.', ''],
    ['s3', 'にちようびは どこにも いきません。', 'nichiyoubi wa doko ni mo ikimasen.', 'No domingo não vou a lugar nenhum.', 'に fica antes de も.'],
    ['s4', 'なにか のみませんか。', 'nani ka nomimasen ka.', 'Quer beber alguma coisa?', 'なにか = algo.'],
    ['s5', 'だれか いますか。', 'dare ka imasu ka.', 'Tem alguém aí?', 'だれか = alguém.'],
    ['s6', 'いつか にほんに いきたいです。', 'itsuka nihon ni ikitai desu.', 'Um dia quero ir ao Japão.', 'いつか = algum dia.']
  ], [
    ['しゅうまつ、どこか いきましたか。 … いいえ、どこにも いきませんでした。', 'shuumatsu, doko ka ikimashita ka. … iie, doko ni mo ikimasen deshita.', 'Foi a algum lugar no fim de semana? … Não, não fui a lugar nenhum.']
  ], [
    X.f('Não há ninguém.', 'だれ＿ いません。', ['も|mo', 'か|ka', 'が|ga'], 'Interrogativa + も + negativo = ninguém.'),
    X.f('Quer comer alguma coisa?', 'なに＿ たべませんか。', ['か|ka', 'も|mo', 'を|o'], 'なにか = alguma coisa.'),
    X.s('Como dizer “Não vou a lugar nenhum”?', ['どこにも いきません|doko ni mo ikimasen', 'どこも にいきません|doko mo ni ikimasen', 'どこか いきません|doko ka ikimasen'], 'A partícula に vem antes de も: どこにも.'),
    X.e('Não comi nada:', ['なにも|nani mo', 'たべました|tabemashita'], 1, 'なにも pede verbo negativo: たべませんでした.')
  ]),
  L('c12l10', 'か: “ou”, “algum” e perguntas dentro da frase', 'か', 'grammar', [
    'Entre dois substantivos, か significa “ou”: コーヒーか こうちゃ (café ou chá).',
    'Uma pergunta pode entrar dentro de outra frase com か: なにが いいか わかりません (não sei o que é bom). A pergunta embutida usa a forma simples, sem です/ます.',
    'Para perguntas de sim/não embutidas, usa-se かどうか: くるか どうか わかりません (não sei se ele vem ou não).'
  ], 'Substantivos e adjetivos な perdem o だ antes de か: がくせいか どうか (se é estudante ou não), しずかか どうか (se é silencioso ou não).', [
    ['s1', 'コーヒーか こうちゃを ください。', 'koohii ka koucha o kudasai.', 'Um café ou um chá, por favor.', 'か = ou.'],
    ['s2', 'なにが いいか わかりません。', 'nani ga ii ka wakarimasen.', 'Não sei o que é bom.', 'Pergunta embutida.'],
    ['s3', 'かれが くるか どうか わかりません。', 'kare ga kuru ka dou ka wakarimasen.', 'Não sei se ele vem ou não.', 'Sim/não embutido: かどうか.'],
    ['s4', 'えきは どこか しって いますか。', 'eki wa doko ka shitte imasu ka.', 'Você sabe onde fica a estação?', ''],
    ['s5', 'あしたか あさって いきます。', 'ashita ka asatte ikimasu.', 'Vou amanhã ou depois de amanhã.', ''],
    ['s6', 'いつ はじまるか おしえて ください。', 'itsu hajimaru ka oshiete kudasai.', 'Me diga quando começa, por favor.', '']
  ], [
    ['なんじに つくか わかったら、れんらくします。', 'nanji ni tsuku ka wakattara, renraku shimasu.', 'Quando eu souber a que horas chego, eu aviso.']
  ], [
    X.f('Não sei se ela vem ou não.', 'かのじょが くるか ＿＿ わかりません。', ['どうか|dou ka', 'なにか|nani ka', 'だれか|dare ka'], 'Pergunta de sim/não embutida: かどうか.'),
    X.f('Vou de ônibus ou de trem.', 'バス＿ でんしゃで いきます。', ['か|ka', 'も|mo', 'の|no'], 'か = ou.'),
    X.s('Como dizer “Você sabe onde ele mora?”', ['どこに すんで いるか しって いますか|doko ni sunde iru ka shitte imasu ka', 'どこに すんで いますか しって いますか|doko ni sunde imasu ka shitte imasu ka', 'どこか すんで しって いますか|doko ka sunde shitte imasu ka'], 'A pergunta embutida usa a forma simples (いる) + か.'),
    X.o('Não sei o que é bom.', ['なにが|nani ga', 'いいか|ii ka', 'わかりません|wakarimasen'], ['いいです|ii desu'], 'なにが いいか + わかりません.')
  ]),
  L('c12l11', 'だけ e しか〜ない: “só”', '只', 'grammar', [
    'だけ = só, apenas, de forma neutra: ひとつだけ ください (me dá só um).',
    'しか + verbo NEGATIVO também significa “só”, mas com sensação de “só isso, é pouco”: ひとつしか ありません (só tem um, infelizmente).',
    'しか nunca aparece com verbo positivo. É um erro comum de iniciantes!'
  ], 'Pense em しか〜ない como “não há nada além de…”: 100えんしか ない = não tenho nada além de 100 ienes.', [
    ['s1', 'ひとつだけ ください。', 'hitotsu dake kudasai.', 'Só um, por favor.', 'だけ: neutro.'],
    ['s2', 'ひとつしか ありません。', 'hitotsu shika arimasen.', 'Só tem um (e é pouco).', 'しか + negativo.'],
    ['s3', 'ひらがなしか よめません。', 'hiragana shika yomemasen.', 'Só consigo ler hiragana.', ''],
    ['s4', 'ひゃくえんしか ない。', 'hyakuen shika nai.', 'Só tenho 100 ienes.', 'Casual: ない.'],
    ['s5', 'きょうは みずだけ のみました。', 'kyou wa mizu dake nomimashita.', 'Hoje só bebi água.', ''],
    ['s6', 'あなただけに はなします。', 'anata dake ni hanashimasu.', 'Vou contar só para você.', 'だけ antes de partículas como に.']
  ], [
    ['じかんが じゅっぷんしか ないから、いそごう！', 'jikan ga juppun shika nai kara, isogou!', 'Só temos dez minutos, vamos depressa!']
  ], [
    X.f('Só tem um.', 'ひとつ＿＿ ありません。', ['しか|shika', 'だけ|dake', 'も|mo'], 'Com verbo negativo: しか.'),
    X.f('Só um, por favor.', 'ひとつ＿＿ ください。', ['だけ|dake', 'しか|shika', 'か|ka'], 'しか exige negativo. Aqui o verbo é positivo: だけ.'),
    X.s('Qual frase está errada?', ['にほんごしか はなします|nihongo shika hanashimasu', 'にほんごしか はなしません|nihongo shika hanashimasen', 'にほんごだけ はなします|nihongo dake hanashimasu'], 'しか com verbo positivo é erro.'),
    X.e('Só consigo ler hiragana:', ['ひらがなしか|hiragana shika', 'よめます|yomemasu'], 1, 'しか pede negativo: よめません.')
  ]),
  L('c12l12', 'より, ほう e いちばん: comparações', '比', 'grammar', [
    'A より B = comparado a A, B: いぬより ねこが すき? Melhor: いぬより ねこの ほうが すきです (gosto mais de gato do que de cachorro).',
    'Para perguntar entre dois: AとBと どちらが 〜ですか. Resposta: Aの ほうが 〜です.',
    'Para o máximo dentro de um grupo: 〜の なかで なにが いちばん 〜ですか. いちばん = o mais.'
  ], 'O adjetivo não muda em comparações: たかい serve para “caro” e “mais caro”. Quem compara são より e ほう.', [
    ['s1', 'バスより でんしゃの ほうが はやいです。', 'basu yori densha no hou ga hayai desu.', 'O trem é mais rápido que o ônibus.', ''],
    ['s2', 'いぬと ねこと どちらが すきですか。', 'inu to neko to dochira ga suki desu ka.', 'Do que você gosta mais, cachorro ou gato?', 'どちら = qual dos dois (educado). Casual: どっち.'],
    ['s3', 'ねこの ほうが すきです。', 'neko no hou ga suki desu.', 'Gosto mais de gato.', ''],
    ['s4', 'くだものの なかで なにが いちばん すきですか。', 'kudamono no naka de nani ga ichiban suki desu ka.', 'Entre as frutas, de qual você mais gosta?', ''],
    ['s5', 'いちごが いちばん すきです。', 'ichigo ga ichiban suki desu.', 'Gosto mais de morango.', ''],
    ['s6', 'きょうは きのうより さむいです。', 'kyou wa kinou yori samui desu.', 'Hoje está mais frio que ontem.', '']
  ], [
    ['クラスで だれが いちばん せが たかいですか。', 'kurasu de dare ga ichiban se ga takai desu ka.', 'Quem é o mais alto da turma?']
  ], [
    X.f('O trem é mais rápido que o ônibus.', 'バス＿＿ でんしゃの ほうが はやいです。', ['より|yori', 'ほう|hou', 'から|kara'], 'A より B の ほうが…'),
    X.s('Pergunta: コーヒーと こうちゃと どちらが すきですか。 Resposta natural:', ['こうちゃの ほうが すきです|koucha no hou ga suki desu', 'こうちゃより すきです|koucha yori suki desu', 'こうちゃが いちばんです|koucha ga ichiban desu'], 'Entre dois, responda com 〜の ほうが.'),
    X.o('Hoje está mais frio que ontem.', ['きょうは|kyou wa', 'きのうより|kinou yori', 'さむいです|samui desu'], ['きのうの ほう|kinou no hou'], 'A は B より + adjetivo.'),
    X.e('Qual é o mais caro (entre muitos)?', ['どちらが|dochira ga', 'いちばん たかいですか|ichiban takai desu ka'], 0, 'どちら é para dois. Para vários: どれが いちばん…')
  ])
  );
})();
