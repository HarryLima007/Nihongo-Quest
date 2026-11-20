/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N3): Fala Natural (c21)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c21', emblem: '口', title: 'Fala Natural', jp: 'はなしことば', stage: 'int', jlpt: 'N3',
    desc: 'Como os japoneses realmente falam: んだ explicativo, citações com って, encurtamentos, omissões, gírias, abreviações, mensagens de texto e expressões com 気.',
    requires: ['c8', 'c16'], reqWhy: 'Esta ala parte do Japonês Falado e usa as formas simples da gramática N4.'
  });
  c.lessons.push(
  L('c21l1', 'Explicar e perguntar com んだ', '説', 'grammar', [
    'んです (casual: んだ; escrito: のです) acrescenta um tom de explicação ou de interesse. 行きます informa; 行くんです explica (“é que eu vou”).',
    'Em perguntas, んですか mostra que você quer entender a situação: どうしたんですか (o que aconteceu?). Sem ん, a pergunta soa seca.',
    'Com substantivo e adjetivo な, use な: 学生なんです, 好きなんです. Casual: 学生なんだ, 好きなの (mais feminino ou suave).'
  ], 'Cuidado: んですか em excesso pode soar como cobrança. なんで来なかったんですか? soa como “por que diabos você não veio?”.', [
    ['s1', 'どうしたんですか。顔色が悪いですよ。', 'dou shita n desu ka. kaoiro ga warui desu yo.', 'O que aconteceu? Você está pálido.', 'Interesse pela situação.'],
    ['s2', '頭が痛いんです。', 'atama ga itai n desu.', 'É que estou com dor de cabeça.', 'Explicação.'],
    ['s3', '実は、来月結婚するんだ。', 'jitsu wa, raigetsu kekkon suru n da.', 'Na verdade, vou me casar mês que vem.', 'Revelação.'],
    ['s4', 'このケーキ、自分で作ったの？', 'kono keeki, jibun de tsukutta no?', 'Você mesmo fez este bolo?', 'Casual: の？'],
    ['s5', '日本語の勉強が好きなんです。', 'nihongo no benkyou ga suki na n desu.', 'É que eu gosto de estudar japonês.', 'な + んです.'],
    ['s6', 'ちょっと聞きたいことがあるんですが…。', 'chotto kikitai koto ga aru n desu ga….', 'Tem uma coisa que eu queria perguntar…', 'Introduz um pedido.']
  ], [
    ['「遅かったね。」「電車が止まっちゃったんだよ。」', '"osokatta ne." "densha ga tomacchatta n da yo."', '“Você demorou, hein.” “É que o trem parou.”']
  ], [
    X.s('Seu amigo está com cara de choro. O que perguntar?', ['どうしたの？|dou shita no?', 'どうした？です|dou shita? desu', 'どうしますか|dou shimasu ka'], 'の？/んですか = interesse pela situação.'),
    X.s('Você se atrasou e quer explicar: “É que o ônibus não veio.”', ['バスが来なかったんです|basu ga konakatta n desu', 'バスが来なかったです|basu ga konakatta desu', 'バスが来ないんですか|basu ga konai n desu ka'], 'んです = explicação.'),
    X.f('É que eu sou estudante.', '学生＿んです。', ['な|na', 'だ|da', 'の|no'], 'Substantivo + な + んです.'),
    X.o('Na verdade, vou para o Japão.', ['実は、|jitsu wa,', '日本に|nihon ni', '行くんです|iku n desu'], ['行きんです|ikin desu'], 'Forma simples + んです.')
  ]),
  L('c21l2', 'Citações casuais: って', '引', 'grammar', [
    'Na fala, って substitui と (citação) e também は (tópico). 田中さんが来ないって言ってた = 田中さんが来ないと言っていた.',
    'んだって = dizem que, ouvi dizer que (boato ou recado): 明日休みなんだって.',
    'って no início do tópico: 東京って、物価が高いね (Tóquio, hein, é caro). E 〜っていう = chamado: 「さくら」っていう店 (uma loja chamada Sakura).'
  ], 'Repetir com って indica surpresa: え、結婚するって？ (Como assim, vai casar?!).', [
    ['s1', '彼女、今日は来ないって。', 'kanojo, kyou wa konai tte.', 'Ela disse que hoje não vem.', 'Recado.'],
    ['s2', '明日、雪が降るんだって。', 'ashita, yuki ga furu n da tte.', 'Dizem que amanhã vai nevar.', 'んだって = boato.'],
    ['s3', '「ナルト」っていう漫画、知ってる？', '"naruto" tte iu manga, shitte ru?', 'Conhece um mangá chamado Naruto?', 'っていう = chamado.'],
    ['s4', '日本の夏って、本当に暑いね。', 'nihon no natsu tte, hontou ni atsui ne.', 'O verão japonês é quente demais, hein.', 'って = tópico.'],
    ['s5', 'え、会社やめるって？本当？', 'e, kaisha yameru tte? hontou?', 'Como assim, vai sair da empresa? Sério?', 'Surpresa.'],
    ['s6', '先生が、宿題は来週でいいって言ってたよ。', 'sensei ga, shukudai wa raishuu de ii tte itte ta yo.', 'O professor disse que a lição pode ser semana que vem.', '']
  ], [
    ['あの店のラーメン、すごくおいしいんだって。今度行ってみない？', 'ano mise no raamen, sugoku oishii n da tte. kondo itte minai?', 'Dizem que o lámen daquela loja é ótimo. Vamos experimentar?']
  ], [
    X.s('Como passar o recado: “O Tanaka disse que vai se atrasar”?', ['田中さん、遅れるって|tanaka-san, okureru tte', '田中さん、遅れるって言うか|tanaka-san, okureru tte iu ka', '田中さん、遅れるんですか|tanaka-san, okureru n desu ka'], 'って = disse que.'),
    X.s('O que significa 明日休みなんだって?', ['Dizem que amanhã é folga', 'Amanhã é folga?', 'Quero folga amanhã'], 'んだって = ouvi dizer.'),
    X.f('Um café chamado Hana', '「ハナ」＿カフェ', ['っていう|tte iu', 'って言った|tte itta', 'んだって|n da tte'], 'っていう = chamado.'),
    X.e('“Ouvi dizer que ele é médico.”', ['彼、|kare,', '医者だってんだ|isha datte n da'], 1, 'Correto: 医者なんだって.')
  ]),
  L('c21l3', 'Encurtamentos e ら抜き', '略', 'grammar', [
    'Na fala, muitas palavras encolhem: やっぱり → やっぱ; 本当 → ほんと; すみません → すいません; という → って / っつう.',
    'ら抜き言葉 (“palavras sem ら”): no potencial de verbos ichidan e de 来る, a fala tira o ら: 見られる → 見れる; 来られる → 来れる; 食べられる → 食べれる.',
    'ら抜き é usadíssimo, mas ainda é considerado incorreto em textos formais e provas. Entenda, use com amigos, evite no trabalho.'
  ], 'Uma vantagem da ら抜き: 見れる só pode ser potencial (“consigo ver”), enquanto 見られる pode ser potencial, passiva ou respeitosa.', [
    ['s1', 'やっぱ、家が一番だね。', 'yappa, ie ga ichiban da ne.', 'No fim das contas, casa é o melhor lugar.', 'やっぱり → やっぱ.'],
    ['s2', 'ほんとに？信じらんない！', 'honto ni? shinjiran nai!', 'Sério? Não acredito!', 'られない → らんない.'],
    ['s3', '明日、来れる？', 'ashita, koreru?', 'Consegue vir amanhã?', 'ら抜き: 来られる → 来れる.'],
    ['s4', '辛いもの、食べれる？', 'karai mono, tabereru?', 'Você consegue comer comida apimentada?', 'ら抜き.'],
    ['s5', 'すいません、ちょっと通してください。', 'suimasen, chotto tooshite kudasai.', 'Com licença, deixe-me passar.', 'すみません → すいません.'],
    ['s6', 'そんなこと言ったって、しょうがないじゃん。', 'sonna koto itta tte, shou ga nai jan.', 'Não adianta dizer isso agora.', 'ても → たって.']
  ], [
    ['この映画、ネットで見れるよ。やっぱ面白いから見てみて。', 'kono eiga, netto de mireru yo. yappa omoshiroi kara mite mite.', 'Dá para ver este filme na internet. É bom mesmo, assista.']
  ], [
    X.s('Numa redação formal, qual forma usar?', ['見られる|mirareru', '見れる|mireru'], 'ら抜き é aceito na fala, não na escrita formal.'),
    X.s('Forma casual encurtada de やっぱり:', ['やっぱ|yappa', 'やっり|yarri', 'ぱり|pari'], 'やっぱり → やっぱ.'),
    X.f('Não acredito! (casual)', '信じ＿！', ['らんない|ran nai', 'らない|ranai', 'れない|renai'], 'られない → らんない.'),
    X.s('Por que 来れる às vezes é útil?', ['Só pode significar potencial', 'É mais formal', 'É passado'], '来られる tem vários sentidos.')
  ]),
  L('c21l4', 'O que fica de fora', '省', 'grammar', [
    'Na conversa, o japonês omite tudo o que o contexto deixa claro: sujeito, partículas e até o verbo.',
    'Partículas は, が, を e へ caem com facilidade: コーヒー飲む？ (vai tomar café?), 明日どこ行く？ (aonde vai amanhã?). に e で caem menos.',
    'O verbo também some quando é óbvio: 明日は？ (e amanhã, [você está livre]?), で？ (e daí?), 私も！ (eu também [quero]!).'
  ], 'Omissões não são erro: falar com todas as partículas numa conversa casual soa robótico.', [
    ['s1', 'コーヒー、飲む？', 'koohii, nomu?', 'Vai tomar café?', 'Sem を.'],
    ['s2', '週末、どこ行く？', 'shuumatsu, doko iku?', 'Aonde você vai no fim de semana?', 'Sem は e へ.'],
    ['s3', 'これ、いくら？', 'kore, ikura?', 'Quanto é isto?', 'Sem は e です.'],
    ['s4', '「明日、暇？」「うん、午後なら。」', '"ashita, hima?" "un, gogo nara."', '“Está livre amanhã?” “Sim, à tarde.”', 'Verbo implícito.'],
    ['s5', '「で？それからどうなったの？」', '"de? sorekara dou natta no?"', '“E aí? O que aconteceu depois?”', 'で = e daí.'],
    ['s6', '「アイス食べたい人！」「はーい、私も！」', '"aisu tabetai hito!" "haai, watashi mo!"', '“Quem quer sorvete?” “Eu! Eu também!”', '']
  ], [
    ['「昨日の試合、見た？」「見た見た！すごかったね。」', '"kinou no shiai, mita?" "mita mita! sugokatta ne."', '“Viu o jogo ontem?” “Vi, vi! Foi incrível, né.”']
  ], [
    X.s('Qual partícula cai com MAIS facilidade na fala?', ['を|o', 'で|de', 'から|kara'], 'は, が, を, へ caem fácil.'),
    X.s('O que significa 明日は？ numa conversa sobre horários?', ['E amanhã, como fica?', 'Amanhã é bom.', 'Não sei amanhã.'], 'O resto fica implícito.'),
    X.s('Numa conversa entre amigos, qual soa mais natural?', ['ご飯食べた？|gohan tabeta?', 'あなたはご飯を食べましたか。|anata wa gohan o tabemashita ka.'], 'Partículas e sujeito omitidos.'),
    X.o('Aonde você vai amanhã? (casual)', ['明日、|ashita,', 'どこ|doko', '行く？|iku?'], ['ですか|desu ka'], 'Casual: partículas omitidas.')
  ]),
  L('c21l5', 'Gírias dos jovens', '若', 'vocab', [
    'Gírias mudam rápido, mas algumas ficaram e todo japonês conhece. Use com amigos; evite com desconhecidos e no trabalho.',
    'マジ (sério) e めっちゃ (muito, do dialeto de Kansai) são universais. ガチ = de verdade, a sério (também “hardcore”).',
    '推し é a pessoa favorita de um grupo (ídolo, personagem); 推し活 são as atividades de fã. エモい = emocionante, nostálgico (do inglês emotional).'
  ], 'ウザい e キモい são ofensivas. Reconheça, mas cuidado ao usar: dizer キモい para alguém machuca.', [
    ['maji', 'マジ', 'maji', 'sério, de verdade', 'マジで？ = Sério?', ['マジで？信じられない。', 'maji de? shinjirarenai.', 'Sério? Não acredito.']],
    ['meccha', 'めっちゃ', 'meccha', 'muito (gíria)', 'De Kansai, hoje usado em todo o Japão.', ['このラーメン、めっちゃうまい！', 'kono raamen, meccha umai!', 'Este lámen é bom demais!']],
    ['gachi', 'ガチ', 'gachi', 'de verdade, a sério', 'ガチで = seriamente.', ['ガチで勉強しないと、やばい。', 'gachi de benkyou shinai to, yabai.', 'Se eu não estudar pra valer, estou ferrado.']],
    ['oshi', '推し', 'oshi', 'favorito (ídolo, personagem)', '推し活 = atividades de fã.', ['私の推しは、このグループのリーダーです。', 'watashi no oshi wa, kono guruupu no riidaa desu.', 'Meu favorito é o líder deste grupo.']],
    ['emoi', 'エモい', 'emoi', 'emocionante, nostálgico', '', ['この写真、なんかエモいね。', 'kono shashin, nanka emoi ne.', 'Esta foto tem um clima nostálgico, né.']],
    ['uzai', 'ウザい', 'uzai', 'irritante, chato (ofensivo)', 'De うるさい.', ['同じ話ばかりで、ウザい。', 'onaji hanashi bakari de, uzai.', 'Só fala a mesma coisa, que chato.']],
    ['kimoi', 'キモい', 'kimoi', 'nojento, esquisito (ofensivo)', 'De 気持ち悪い.', ['虫、キモい！', 'mushi, kimoi!', 'Inseto, que nojo!']],
    ['mukatsuku', 'ムカつく', 'mukatsuku', 'dar raiva, irritar', '', ['あいつの態度、マジでムカつく。', 'aitsu no taido, maji de mukatsuku.', 'A atitude daquele cara me irrita demais.']],
    ['bucchake', 'ぶっちゃけ', 'bucchake', 'falando francamente', '', ['ぶっちゃけ、あの映画はつまらなかった。', 'bucchake, ano eiga wa tsumaranakatta.', 'Falando francamente, aquele filme foi chato.']],
    ['kusa', '草', 'kusa', 'kkkk (riso na internet)', 'Vem de www (warau): parece grama (草).', ['その動画、草。', 'sono douga, kusa.', 'Esse vídeo, kkkk.']]
  ], [
    ['ぶっちゃけ、推しのライブに行くために、めっちゃ節約してる。', 'bucchake, oshi no raibu ni iku tame ni, meccha setsuyaku shite ru.', 'Falando sério, estou economizando muito para ir ao show do meu favorito.'],
    ['マジでエモい曲だった。', 'maji de emoi kyoku datta.', 'Foi uma música muito emocionante, sério.']
  ], [
    X.s('Seu amigo conta algo inacreditável. Você reage:', ['マジで？|maji de?', 'ムカつく|mukatsuku', 'ウザい|uzai'], 'マジで？ = Sério?'),
    X.s('O que é 推し?', ['o seu favorito de um grupo', 'um empurrão', 'um amigo chato'], '推す = apoiar, recomendar.'),
    X.s('Na internet, 草 significa:', ['risada, kkkk', 'grama de verdade', 'tristeza'], 'w → 草.'),
    X.s('Qual é mais segura para usar com o chefe?', ['とても|totemo', 'めっちゃ|meccha', 'ガチで|gachi de'], 'Gírias só com amigos.')
  ]),
  L('c21l6', 'Abreviações do dia a dia', '縮', 'vocab', [
    'O japonês adora encurtar palavras longas, principalmente as de katakana: as duas primeiras sílabas de cada parte se juntam.',
    'Exemplos: ファミリーレストラン → ファミレス; アルバイト → バイト; 就職活動 → 就活; あけましておめでとう → あけおめ.',
    'Algumas viraram palavras próprias: ドタキャン (cancelar em cima da hora: どたんば + キャンセル); 既読スルー (ler e não responder).'
  ], 'ググる (pesquisar no Google) é um verbo de grupo 1: ググった, ググって.', [
    ['baito', 'バイト', 'baito', 'bico, trabalho de meio período', 'De アルバイト (alemão Arbeit).', ['週三回、コンビニでバイトしている。', 'shuu sankai, konbini de baito shite iru.', 'Trabalho meio período na conveniência três vezes por semana.']],
    ['famiresu', 'ファミレス', 'famiresu', 'restaurante familiar', 'ファミリーレストラン.', ['夜遅くまで、ファミレスで話した。', 'yoru osoku made, famiresu de hanashita.', 'Ficamos conversando no restaurante até tarde.']],
    ['shuukatsu', '就活', 'shuukatsu', 'busca de emprego', '就職活動.', ['就活で毎日忙しい。', 'shuukatsu de mainichi isogashii.', 'Estou ocupado todo dia com a busca de emprego.']],
    ['akeome', 'あけおめ', 'akeome', 'feliz ano-novo (casual)', 'あけましておめでとう. ことよろ = 今年もよろしく.', ['あけおめ！ことよろ！', 'akeome! kotoyoro!', 'Feliz ano-novo! Conto com você este ano!']],
    ['dotakyan', 'ドタキャン', 'dotakyan', 'cancelar em cima da hora', '', ['友達にドタキャンされた。', 'tomodachi ni dotakyan sareta.', 'Meu amigo cancelou em cima da hora.']],
    ['kidokusuruu', '既読スルー', 'kidoku suruu', 'visualizar e não responder', '既読 = lido; スルー = ignorar.', ['メッセージを既読スルーされた。', 'messeeji o kidoku suruu sareta.', 'Ele visualizou e não respondeu.']],
    ['guguru', 'ググる', 'guguru', 'pesquisar no Google', '', ['わからなかったら、ググってみて。', 'wakaranakattara, gugutte mite.', 'Se não souber, pesquisa no Google.']],
    ['kosupa', 'コスパ', 'kosupa', 'custo-benefício', 'コストパフォーマンス.', ['この店はコスパがいい。', 'kono mise wa kosupa ga ii.', 'Esta loja tem ótimo custo-benefício.']],
    ['sekuhara', 'セクハラ', 'sekuhara', 'assédio sexual', 'セクシャルハラスメント. パワハラ = assédio moral (de poder).', ['会社でセクハラは許されない。', 'kaisha de sekuhara wa yurusarenai.', 'Assédio sexual não é tolerado na empresa.']],
    ['rimokon', 'リモコン', 'rimokon', 'controle remoto', 'リモートコントロール.', ['リモコンがどこにもない！', 'rimokon ga doko ni mo nai!', 'O controle remoto sumiu!']]
  ], [
    ['バイトの後、ファミレスで就活の話をした。', 'baito no ato, famiresu de shuukatsu no hanashi o shita.', 'Depois do bico, conversamos sobre busca de emprego no restaurante.'],
    ['既読スルーの上に、ドタキャンって…ひどくない？', 'kidoku suruu no ue ni, dotakyan tte… hidoku nai?', 'Além de visualizar e não responder, ainda cancelou em cima da hora… não é demais?']
  ], [
    X.s('Abreviação de アルバイト:', ['バイト|baito', 'アル|aru', 'アバイ|abai'], 'アルバイト → バイト.'),
    X.s('Seu amigo cancelou o encontro 10 minutos antes. Isso é:', ['ドタキャン|dotakyan', '既読スルー|kidoku suruu', '就活|shuukatsu'], 'ドタキャン = cancelar em cima da hora.'),
    X.f('Pesquisa no Google.', '＿みて。', ['ググって|gugutte', 'ググりて|guguri te', 'ググて|gugute'], 'Grupo 1: ググる → ググって.'),
    X.s('Como desejar feliz ano-novo a um amigo, de forma casual?', ['あけおめ！|akeome!', 'あけまして！|akemashite!', 'おめあけ！|omeake!'], 'あけおめ.')
  ]),
  L('c21l7', 'Partículas finais II', '尾', 'grammar', [
    'Além de ね, よ e な, há partículas que dão personalidade à fala. わ (com entonação subindo) é suave, tradicionalmente feminina: きれいだわ.',
    'ぞ e ぜ são enfáticas e masculinas: 行くぞ！ (vamos!). さ ameniza ou preenche: だからさ、言ったじゃん. もん dá desculpa, meio infantil: だって、知らなかったもん.',
    'よな / よね pedem concordância; かな é dúvida consigo mesmo; っけ tenta lembrar algo esquecido.'
  ], 'No japonês atual, わ com entonação descendente também é usado por homens, principalmente no oeste do Japão: もう帰るわ (já vou).', [
    ['s1', 'このドレス、すてきだわ。', 'kono doresu, suteki da wa.', 'Este vestido é lindo.', 'わ suave (feminino).'],
    ['s2', 'よし、行くぞ！', 'yoshi, iku zo!', 'Certo, vamos lá!', 'ぞ enfático.'],
    ['s3', 'だってさ、誰も教えてくれなかったんだもん。', 'datte sa, dare mo oshiete kurenakatta n da mon.', 'Mas é que ninguém me contou.', 'もん = desculpa.'],
    ['s4', 'あの人、どこかで会ったよな。', 'ano hito, doko ka de atta yo na.', 'Já encontrei aquela pessoa em algum lugar, não foi?', 'よな.'],
    ['s5', '今日の会議、何時からだったっけ？', 'kyou no kaigi, nanji kara datta kke?', 'A reunião de hoje era a que horas mesmo?', 'っけ = tentar lembrar.'],
    ['s6', 'じゃあ、そろそろ帰るわ。', 'jaa, sorosoro kaeru wa.', 'Bom, já vou indo.', 'わ descendente.']
  ], [
    ['「なんで食べちゃったの？」「だって、おいしそうだったんだもん。」', '"nande tabechatta no?" "datte, oishisou datta n da mon."', '“Por que você comeu?” “Mas parecia tão gostoso…”']
  ], [
    X.s('Qual partícula serve para tentar lembrar algo?', ['っけ|kke', 'ぞ|zo', 'わ|wa'], '何だっけ？ = o que era mesmo?'),
    X.s('Uma criança se justificando: “Mas eu não sabia!”', ['だって、知らなかったもん|datte, shiranakatta mon', '知らなかったぞ|shiranakatta zo', '知らなかったっけ|shiranakatta kke'], 'もん = desculpa.'),
    X.s('Qual soa mais masculina e enfática?', ['行くぞ！|iku zo!', '行くわ。|iku wa.', '行くの。|iku no.'], 'ぞ = enfático.'),
    X.f('Ele vem amanhã, né? (pedindo confirmação, casual)', '彼、明日来る＿？', ['よな|yo na', 'ぞ|zo', 'もん|mon'], 'よな = pedir concordância.')
  ]),
  L('c21l8', 'Suavizar e falar indiretamente', '柔', 'grammar', [
    'Os japoneses evitam ser diretos para não pressionar ninguém. Frases ficam “abertas”, sem terminar: ちょっと… (é que…), 〜けど… (mas…).',
    'なんか (tipo, meio que), とか (coisas como), みたいな (tipo assim) deixam a fala vaga e menos assertiva: 映画とか見る？',
    '一応 (por via das dúvidas, mais ou menos) e 〜かなと思って (pensei que talvez…) suavizam opiniões e pedidos.'
  ], 'ちょっと… com a frase cortada é o jeito clássico de recusar: 「今晩飲みに行かない？」「今晩はちょっと…」.', [
    ['s1', '「明日どう？」「明日はちょっと…。」', '"ashita dou?" "ashita wa chotto…."', '“E amanhã?” “Amanhã é meio complicado…”', 'Recusa indireta.'],
    ['s2', 'お茶とか飲む？', 'ocha toka nomu?', 'Quer beber um chá ou algo assim?', 'とか suaviza a oferta.'],
    ['s3', 'なんか、今日は元気ないね。', 'nanka, kyou wa genki nai ne.', 'Sei lá, você parece meio pra baixo hoje.', ''],
    ['s4', '一応、傘を持っていこう。', 'ichiou, kasa o motte ikou.', 'Por via das dúvidas, vou levar o guarda-chuva.', ''],
    ['s5', 'そろそろ帰ろうかなと思って。', 'sorosoro kaerou ka na to omotte.', 'Estava pensando em ir embora já.', ''],
    ['s6', 'ちょっと手伝ってほしいんですけど…。', 'chotto tetsudatte hoshii n desu kedo….', 'Queria que você me ajudasse um pouco…', 'けど aberto.']
  ], [
    ['この服、ちょっと派手かなと思ったんだけど、どう？', 'kono fuku, chotto hade ka na to omotta n da kedo, dou?', 'Achei que esta roupa talvez seja chamativa demais, o que acha?']
  ], [
    X.s('Um colega te chama para beber, mas você não quer. O mais natural:', ['今日はちょっと…|kyou wa chotto…', '行きません。|ikimasen.', 'いやです。|iya desu.'], 'ちょっと… recusa sem dizer não.'),
    X.s('O que significa 一応 em 一応、確認します?', ['por via das dúvidas', 'nunca', 'imediatamente'], '一応 = por precaução.'),
    X.f('Vamos ver um filme ou algo assim?', '映画＿見ない？', ['とか|toka', 'しか|shika', 'だけ|dake'], 'とか = coisas como.'),
    X.s('Por que a frase termina em けど… sem continuação?', ['Para deixar o pedido mais suave', 'Por erro', 'Para dar ordem'], 'A frase aberta é educada.')
  ]),
  L('c21l9', 'Concordar, discordar e reagir', '応', 'grammar', [
    'Na conversa japonesa, quem ouve reage o tempo todo (相槌 aizuchi): うん, へえ, なるほど. Ficar calado parece que você não está prestando atenção.',
    'Concordar: それな (exato, gíria), だよね, ほんとそれ. Concordar com ressalva: まあね (é, mais ou menos), 確かにそうだけど (é verdade, mas).',
    'Discordar com suavidade: いや、そうじゃなくて (não, não é isso), うーん、どうかな (hmm, sei não). 別に (nada demais, tanto faz) pode soar frio.'
  ], 'なるほど com superiores pode soar como se você estivesse avaliando a fala deles. Prefira そうなんですね.', [
    ['s1', 'なるほど、そういうことか。', 'naruhodo, sou iu koto ka.', 'Ah, entendi, então é isso.', ''],
    ['s2', '「月曜日って、つらいよね。」「それな。」', '"getsuyoubi tte, tsurai yo ne." "sore na."', '“Segunda-feira é difícil, né.” “Exato.”', 'それな = gíria.'],
    ['s3', '「勉強してる？」「まあね。」', '"benkyou shite ru?" "maa ne."', '“Está estudando?” “Mais ou menos.”', ''],
    ['s4', '確かにそうだけど、ちょっと高くない？', 'tashika ni sou da kedo, chotto takaku nai?', 'É verdade, mas não está meio caro?', 'Concorda com ressalva.'],
    ['s5', 'いや、そうじゃなくて、明日の話。', 'iya, sou ja nakute, ashita no hanashi.', 'Não, não é isso, estou falando de amanhã.', ''],
    ['s6', '「怒ってる？」「別に。」', '"okotte ru?" "betsu ni."', '“Está bravo?” “Não.” (frio)', '別に pode soar seco.']
  ], [
    ['「この店、高いけどおいしいね。」「ほんとそれ。また来よう。」', '"kono mise, takai kedo oishii ne." "honto sore. mata koyou."', '“Esta loja é cara, mas é gostosa, né.” “Verdade. Vamos voltar.”']
  ], [
    X.s('Seu chefe explica algo. Qual reação é mais adequada?', ['そうなんですね|sou na n desu ne', 'それな|sore na', '別に|betsu ni'], 'それな é gíria; なるほど pode soar avaliativo.'),
    X.s('Você concorda, mas tem uma ressalva:', ['確かにそうだけど…|tashika ni sou da kedo…', 'それな！|sore na!', 'うそ！|uso!'], 'Concorda com ressalva.'),
    X.s('O que é 相槌 (aizuchi)?', ['as reações curtas de quem ouve', 'uma briga', 'uma piada'], 'うん, へえ, なるほど…'),
    X.s('Por que 別に pode soar mal?', ['Pode parecer frio, indiferente', 'É muito formal', 'É um palavrão'], '別に = tanto faz.')
  ]),
  L('c21l10', 'Expressões com 気', '気', 'grammar', [
    '気 (ki) é energia, espírito, atenção. Ele aparece em dezenas de expressões do dia a dia, e quase nenhuma se traduz palavra por palavra.',
    'As mais comuns: 気になる (ficar curioso, preocupado), 気にする (se importar, ligar para), 気をつける (tomar cuidado), 気に入る (gostar, agradar).',
    'Também: 気がする (ter a impressão), 気が合う (se dar bem), 気が利く (ser atencioso), 気が短い (ser impaciente), 気が楽 (aliviado).'
  ], '気にしないで = não se preocupe, não ligue. É a resposta perfeita quando alguém pede desculpas por algo pequeno.', [
    ['s1', '気にしないでください。', 'ki ni shinaide kudasai.', 'Não se preocupe com isso.', ''],
    ['s2', 'あの音が気になって、眠れない。', 'ano oto ga ki ni natte, nemurenai.', 'Aquele barulho está me incomodando e não consigo dormir.', '気になる.'],
    ['s3', 'このかばん、とても気に入っています。', 'kono kaban, totemo ki ni itte imasu.', 'Gostei muito desta bolsa.', '気に入る = agradar.'],
    ['s4', '前にどこかで会ったような気がする。', 'mae ni doko ka de atta you na ki ga suru.', 'Tenho a impressão de que já nos vimos.', '気がする.'],
    ['s5', '彼とは昔から気が合う。', 'kare to wa mukashi kara ki ga au.', 'Sempre me dei bem com ele.', ''],
    ['s6', '新人なのに、よく気が利くね。', 'shinjin na noni, yoku ki ga kiku ne.', 'Mesmo sendo novato, é muito atencioso.', '']
  ], [
    ['気をつけて帰ってね。', 'ki o tsukete kaette ne.', 'Volte com cuidado, tá?']
  ], [
    X.s('Alguém pede desculpas por algo pequeno. Você responde:', ['気にしないで|ki ni shinaide', '気が合うね|ki ga au ne', '気をつけて|ki o tsukete'], '気にしない = não ligar.'),
    X.s('Você gostou do presente. Qual frase?', ['気に入りました|ki ni irimashita', '気になりました|ki ni narimashita', '気がしました|ki ga shimashita'], '気に入る = agradar.'),
    X.f('Tenho a impressão de que vai chover.', '雨が降るような＿。', ['気がする|ki ga suru', '気にする|ki ni suru', '気が合う|ki ga au'], '気がする = impressão.'),
    X.s('Uma pessoa que percebe o que os outros precisam é:', ['気が利く|ki ga kiku', '気が短い|ki ga mijikai', '気になる|ki ni naru'], '気が利く = atencioso.')
  ]),
  L('c21l11', 'Convites e propostas casuais', '誘', 'grammar', [
    'Entre amigos, o convite mais comum é a pergunta negativa: 行かない？ (não quer ir?). Soa leve e dá espaço para recusar.',
    'Volitivo casual: 行こう (vamos), e mais leve ainda 行こ, しよ. Com か, vira oferta: 手伝おうか (quer que eu ajude?).',
    'Para pedir: 〜てくれる？ / 〜てくれない？ (mais suave). Para pedir permissão: 〜てもいい？'
  ], 'しよっか / 行こっか (de しようか / 行こうか) são muito comuns e soam simpáticos.', [
    ['s1', '今度の土曜日、映画行かない？', 'kondo no doyoubi, eiga ikanai?', 'Não quer ir ao cinema neste sábado?', 'Convite.'],
    ['s2', 'お腹すいたね。何か食べよっか。', 'onaka suita ne. nanika tabeyokka.', 'Estou com fome. Vamos comer algo?', 'しよっか.'],
    ['s3', 'その荷物、持とうか？', 'sono nimotsu, motou ka?', 'Quer que eu leve essa bolsa?', 'Oferta.'],
    ['s4', 'ちょっと窓開けてくれない？', 'chotto mado akete kurenai?', 'Pode abrir a janela um pouco?', 'Pedido suave.'],
    ['s5', 'ここ、座ってもいい？', 'koko, suwatte mo ii?', 'Posso sentar aqui?', 'Permissão.'],
    ['s6', 'じゃあ、駅で待ち合わせしよ。', 'jaa, eki de machiawase shiyo.', 'Então vamos nos encontrar na estação.', 'しよ = しよう.']
  ], [
    ['「今夜、カラオケ行かない？」「いいね、行こ行こ！」', '"kon\'ya, karaoke ikanai?" "ii ne, iko iko!"', '“Vamos ao karaokê hoje à noite?” “Boa, vamos!”']
  ], [
    X.s('Qual convite soa mais leve entre amigos?', ['飲みに行かない？|nomi ni ikanai?', '飲みに行け。|nomi ni ike.', '飲みに行きますか。|nomi ni ikimasu ka.'], 'Pergunta negativa = convite leve.'),
    X.s('Você oferece ajuda: “Quer que eu ajude?”', ['手伝おうか？|tetsudaou ka?', '手伝ってくれる？|tetsudatte kureru?', '手伝わない？|tetsudawanai?'], 'Volitivo + か = oferta.'),
    X.f('Pode me emprestar a caneta? (suave)', 'ペン、貸して＿？', ['くれない|kurenai', 'あげない|agenai', 'もらう|morau'], 'てくれない？ = pedido suave.'),
    X.o('Vamos tomar um café?', ['コーヒー|koohii', '飲み|nomi', 'に行かない？|ni ikanai?'], ['行け|ike'], 'Pergunta negativa.')
  ]),
  L('c21l12', 'Mensagens de texto', '送', 'grammar', [
    'No LINE (o “WhatsApp” do Japão), as mensagens são curtas, cheias de abreviações, emojis (絵文字) e figurinhas (スタンプ).',
    'Abreviações comuns: 了解 (entendido) vira りょ ou り; おつかれ vira おつ; よろしく vira よろ. 笑 ou w no final = risada.',
    '既読 (lido) aparece quando a pessoa vê a mensagem. Não responder depois de ler (既読スルー) pode ser visto como falta de educação.'
  ], 'Com colegas de trabalho, mesmo no LINE, use です/ます e evite りょ: 承知しました ou 了解です.', [
    ['s1', '今どこ？', 'ima doko?', 'Onde você está agora?', ''],
    ['s2', 'ごめん、十分遅れる！', 'gomen, juppun okureru!', 'Desculpa, vou atrasar dez minutos!', ''],
    ['s3', 'りょ！', 'ryo!', 'Ok! (entendido)', '了解 → りょ.'],
    ['s4', '今日はおつ！また明日ね。', 'kyou wa otsu! mata ashita ne.', 'Valeu pelo dia de hoje! Até amanhã.', 'おつかれ → おつ.'],
    ['s5', '着いたら連絡して。', 'tsuitara renraku shite.', 'Me avisa quando chegar.', ''],
    ['s6', '昨日はありがとう！楽しかった笑', 'kinou wa arigatou! tanoshikatta wara.', 'Obrigado por ontem! Foi divertido haha.', '笑 = risada.']
  ], [
    ['「駅着いた。どこ？」「改札の前にいるよ。」', '"eki tsuita. doko?" "kaisatsu no mae ni iru yo."', '“Cheguei na estação. Cadê você?” “Estou em frente à catraca.”']
  ], [
    X.s('O que significa りょ?', ['Entendido (了解)', 'Desculpa', 'Tchau'], 'りょ = 了解.'),
    X.s('Seu chefe manda uma tarefa pelo LINE. Como responder?', ['承知しました|shouchi shimashita', 'りょ！|ryo!', 'おつ！|otsu!'], 'Com o chefe, mantenha o formal.'),
    X.s('O que significa 笑 no fim da mensagem?', ['risada (haha)', 'raiva', 'pergunta'], '笑う = rir.'),
    X.f('Me avisa quando chegar.', '着いたら＿して。', ['連絡|renraku', '既読|kidoku', '了解|ryoukai'], '連絡する = entrar em contato.')
  ])
  );
})();
