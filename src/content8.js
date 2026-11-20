/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5): Adjetivos e Advérbios (c14)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c14', emblem: '形', title: 'Adjetivos e Advérbios', jp: 'けいようし', stage: 'ini', jlpt: 'N5',
    desc: 'Todas as formas dos adjetivos い e な, como ligá-los, “ficar”, advérbios de frequência e intensidade, sentimentos e aparência.',
    requires: 'c5', reqNote: 'Liberada ao concluir Gramática.'
  });
  c.lessons.push(
  L('c14l1', 'Adjetivos い: todas as formas', 'い', 'grammar', [
    'Adjetivos い conjugam sozinhos, como se fossem verbos: たかい (é caro), たかくない (não é caro), たかかった (era caro), たかくなかった (não era caro).',
    'O です no final é só educação e nunca muda: たかかったです (era caro). Nunca diga たかいでした!',
    'Exceção importante: いい (bom) conjuga a partir de よい: よくない, よかった, よくなかった. O mesmo vale para かっこいい → かっこよかった.'
  ], 'O erro mais comum: たかいでした. O passado fica no próprio adjetivo: たかかったです.', [
    ['s1', 'この みせは たかくないです。', 'kono mise wa takakunai desu.', 'Esta loja não é cara.', 'い → くない.'],
    ['s2', 'えいがは おもしろかったです。', 'eiga wa omoshirokatta desu.', 'O filme foi interessante.', 'い → かった.'],
    ['s3', 'テストは むずかしくなかったです。', 'tesuto wa muzukashikunakatta desu.', 'A prova não foi difícil.', 'い → くなかった.'],
    ['s4', 'てんきが よくないです。', 'tenki ga yokunai desu.', 'O tempo não está bom.', 'いい → よくない.'],
    ['s5', 'りょこうは とても よかったです。', 'ryokou wa totemo yokatta desu.', 'A viagem foi muito boa.', 'いい → よかった.'],
    ['s6', 'あの ひと、かっこよかったね。', 'ano hito, kakkoyokatta ne.', 'Aquela pessoa era bonita, né?', 'かっこいい segue いい: かっこよかった.']
  ], [
    ['きのうは さむかったですが、きょうは さむくないです。', 'kinou wa samukatta desu ga, kyou wa samukunai desu.', 'Ontem fez frio, mas hoje não está frio.']
  ], [
    X.f('O filme foi divertido.', 'えいがは たのし＿＿＿です。', ['かった|katta', 'いでした|ideshita', 'くない|kunai'], 'Passado de い: かった. いでした está errado.'),
    X.f('O tempo não estava bom.', 'てんきが ＿＿＿＿＿です。', ['よくなかった|yokunakatta', 'いくなかった|ikunakatta', 'いいじゃなかった|ii janakatta'], 'いい conjuga a partir de よい.'),
    X.e('“Estava frio ontem.”', ['きのうは|kinou wa', 'さむいでした|samui deshita'], 1, 'O passado fica no adjetivo: さむかったです.'),
    X.s('Qual é o negativo de いい?', ['よくない|yokunai', 'いくない|ikunai', 'いいない|iinai'], 'いい → よくない.')
  ]),
  L('c14l2', 'Adjetivos な: todas as formas e as armadilhas', 'な', 'grammar', [
    'Adjetivos な funcionam como substantivos: しずかです, しずかじゃないです, しずかでした, しずかじゃなかったです.',
    'Antes de um substantivo, eles ganham な: しずかな へや (quarto silencioso). Daí o nome.',
    'Armadilha: きれい, きらい e ゆうめい terminam em “i” mas são adjetivos な! きれいな はな, きれいじゃない (nunca きれくない).'
  ], 'Na fala casual, です vira だ: しずかだ, しずかだった. Mas antes de substantivo é sempre な.', [
    ['s1', 'しずかな へやですね。', 'shizuka na heya desu ne.', 'É um quarto silencioso, né?', 'な antes do substantivo.'],
    ['s2', 'この まちは べんりじゃないです。', 'kono machi wa benri janai desu.', 'Esta cidade não é prática.', 'Negativo: じゃない.'],
    ['s3', 'むかしは ゆうめいでした。', 'mukashi wa yuumei deshita.', 'Antigamente era famoso.', 'Passado: でした.'],
    ['s4', 'あの こうえんは きれいじゃなかったです。', 'ano kouen wa kirei janakatta desu.', 'Aquele parque não era bonito.', 'きれい é な: じゃなかった.'],
    ['s5', 'ゆうめいな レストランに いきました。', 'yuumei na resutoran ni ikimashita.', 'Fui a um restaurante famoso.', 'ゆうめい é な.'],
    ['s6', 'げんきな こどもですね。', 'genki na kodomo desu ne.', 'Que criança animada!', '']
  ], [
    ['しごとは たいへんでしたが、たのしかったです。', 'shigoto wa taihen deshita ga, tanoshikatta desu.', 'O trabalho foi puxado, mas divertido. (たいへん é な; たのしい é い)']
  ], [
    X.f('Uma pessoa famosa.', 'ゆうめい＿ ひと', ['な|na', 'の|no', '(nada)'], 'ゆうめい é adjetivo な.'),
    X.f('Não é bonito.', 'きれい＿＿＿です。', ['じゃない|janai', 'くない|kunai', 'かった|katta'], 'きれい parece い, mas é な.'),
    X.e('“O quarto era silencioso.”', ['へやは|heya wa', 'しずかかったです|shizukakatta desu'], 1, 'しずか é な: しずかでした.'),
    X.s('Qual destes é adjetivo な?', ['きれい|kirei', 'おおきい|ookii', 'あかい|akai'], 'きれい é な, apesar do “i” no final.')
  ]),
  L('c14l3', 'Ligando adjetivos: 〜くて e 〜で', '連', 'grammar', [
    'Para dizer dois adjetivos seguidos (“barato e gostoso”), o primeiro muda: い vira くて, な vira で.',
    'やすくて おいしい (barato e gostoso). しずかで きれい (silencioso e bonito). いい vira よくて.',
    'くて/で também pode indicar causa leve: いそがしくて ねられなかった (estava tão ocupado que não consegui dormir).'
  ], 'As duas qualidades devem combinar no mesmo sentido (boa + boa). Para contraste, use が: やすいですが、まずいです.', [
    ['s1', 'この みせは やすくて おいしいです。', 'kono mise wa yasukute oishii desu.', 'Esta loja é barata e gostosa.', ''],
    ['s2', 'へやは しずかで ひろいです。', 'heya wa shizuka de hiroi desu.', 'O quarto é silencioso e amplo.', 'な → で.'],
    ['s3', 'かれは やさしくて おもしろい ひとです。', 'kare wa yasashikute omoshiroi hito desu.', 'Ele é uma pessoa gentil e divertida.', ''],
    ['s4', 'あたまが よくて、スポーツも できます。', 'atama ga yokute, supootsu mo dekimasu.', 'É inteligente e também é bom em esportes.', 'いい → よくて.'],
    ['s5', 'いそがしくて、ひるごはんを たべられなかった。', 'isogashikute, hirugohan o taberarenakatta.', 'Estava tão ocupado que não consegui almoçar.', 'くて como causa.'],
    ['s6', 'やすいですが、あまり おいしくないです。', 'yasui desu ga, amari oishikunai desu.', 'É barato, mas não é muito gostoso.', 'Contraste: が.']
  ], [
    ['にほんの でんしゃは はやくて べんりです。', 'nihon no densha wa hayakute benri desu.', 'Os trens japoneses são rápidos e práticos.']
  ], [
    X.f('Barato e gostoso.', 'やす＿＿ おいしい', ['くて|kute', 'いで|ide', 'いと|ito'], 'い → くて.'),
    X.f('Silencioso e bonito.', 'しずか＿ きれい', ['で|de', 'くて|kute', 'な|na'], 'な → で.'),
    X.s('Como dizer “É bom e barato”?', ['よくて やすい|yokute yasui', 'いいくて やすい|iikute yasui', 'いいで やすい|ii de yasui'], 'いい → よくて.'),
    X.e('“É caro, mas é bom.” (contraste)', ['たかくて|takakute', 'いいです|ii desu'], 0, 'Para contraste, use が: たかいですが、いいです.')
  ]),
  L('c14l4', 'Ficar: 〜く なる e 〜に なる', '成', 'grammar', [
    'なる = tornar-se, ficar. Com adjetivos い: い vira く + なる: さむく なりました (ficou frio).',
    'Com adjetivos な e substantivos: に + なる: しずかに なった (ficou silencioso), いしゃに なりたい (quero virar médico).',
    'Para quem provoca a mudança, use する: へやを きれいに する (deixar o quarto limpo), おとを ちいさく する (abaixar o som).'
  ], 'なる = algo muda sozinho. する = alguém muda algo.', [
    ['s1', 'さむく なりましたね。', 'samuku narimashita ne.', 'Esfriou, né?', 'い → く なる.'],
    ['s2', 'にほんごが じょうずに なりました。', 'nihongo ga jouzu ni narimashita.', 'Meu japonês melhorou.', 'な → に なる.'],
    ['s3', 'しょうらい、いしゃに なりたいです。', 'shourai, isha ni naritai desu.', 'No futuro quero ser médico.', 'Substantivo + に なる.'],
    ['s4', 'げんきに なって よかった！', 'genki ni natte yokatta!', 'Que bom que você melhorou!', ''],
    ['s5', 'へやを きれいに しました。', 'heya o kirei ni shimashita.', 'Deixei o quarto limpo.', 'する: alguém provoca.'],
    ['s6', 'おとを ちいさく して ください。', 'oto o chiisaku shite kudasai.', 'Abaixe o volume, por favor.', '']
  ], [
    ['はるに なると、あたたかく なります。', 'haru ni naru to, atatakaku narimasu.', 'Quando chega a primavera, esquenta.']
  ], [
    X.f('Ficou quente.', 'あつ＿ なりました。', ['く|ku', 'に|ni', 'で|de'], 'い → く なる.'),
    X.f('Quero ficar forte.', 'つよ＿ なりたい！', ['く|ku', 'に|ni', 'いに|ini'], 'つよい é い: つよく.'),
    X.s('Como dizer “Vou ficar famoso”?', ['ゆうめいに なります|yuumei ni narimasu', 'ゆうめいく なります|yuumeiku narimasu', 'ゆうめいで なります|yuumei de narimasu'], 'ゆうめい é な: に なる.'),
    X.s('Você quer que alguém abaixe a TV. Qual verbo?', ['ちいさく して|chiisaku shite', 'ちいさく なって|chiisaku natte', 'ちいさいに して|chiisai ni shite'], 'Alguém provoca a mudança: する.')
  ]),
  L('c14l5', 'Adjetivos que viram advérbios', '副', 'grammar', [
    'Para descrever COMO uma ação acontece, い vira く e な vira に: はやく はしる (correr rápido), しずかに はなす (falar baixo).',
    'Alguns advérbios muito comuns nascem assim: よく (bem / com frequência), はやく (cedo / rápido), おそく (tarde), きれいに (direitinho), じょうずに (com habilidade).',
    'はやく! sozinho é um pedido: “Rápido!”. しずかに! = “Silêncio!”.'
  ], 'よく tem dois sentidos: “bem” (よく ねた = dormi bem) e “com frequência” (よく いく = vou bastante).', [
    ['s1', 'はやく おきて ください。', 'hayaku okite kudasai.', 'Acorde cedo, por favor.', 'はやい → はやく.'],
    ['s2', 'としょかんでは しずかに して ください。', 'toshokan de wa shizuka ni shite kudasai.', 'Faça silêncio na biblioteca.', 'しずか → しずかに.'],
    ['s3', 'きのうは よく ねました。', 'kinou wa yoku nemashita.', 'Ontem dormi bem.', 'よく = bem.'],
    ['s4', 'この みせに よく きます。', 'kono mise ni yoku kimasu.', 'Venho bastante a esta loja.', 'よく = com frequência.'],
    ['s5', 'じを きれいに かいて ください。', 'ji o kirei ni kaite kudasai.', 'Escreva as letras direitinho.', ''],
    ['s6', 'おそく なって、すみません。', 'osoku natte, sumimasen.', 'Desculpe a demora.', 'Literalmente “fiquei tarde”.']
  ], [
    ['もっと ゆっくり はなして ください。', 'motto yukkuri hanashite kudasai.', 'Fale mais devagar, por favor. (ゆっくり já é advérbio)']
  ], [
    X.f('Fale baixo, por favor.', 'しずか＿ はなして ください。', ['に|ni', 'く|ku', 'な|na'], 'な → に para descrever a ação.'),
    X.f('Corra rápido!', 'はや＿ はしって！', ['く|ku', 'に|ni', 'い|i'], 'い → く.'),
    X.s('この みせに よく きます significa…', ['Venho bastante a esta loja.', 'Venho bem a esta loja.', 'Esta loja é boa.'], 'よく + verbo de ir/vir = com frequência.'),
    X.o('Desculpe a demora.', ['おそく|osoku', 'なって、|natte,', 'すみません|sumimasen'], ['おそい|osoi'], 'おそく なって、すみません。')
  ]),
  L('c14l6', 'Frequência: sempre, às vezes, nunca', '度', 'grammar', [
    'Do mais para o menos frequente: いつも (sempre), よく (com frequência), ときどき (às vezes), たまに (de vez em quando), あまり〜ない (não muito), ぜんぜん〜ない (nunca, nada).',
    'あまり e ぜんぜん pedem verbo NEGATIVO: あまり たべません (não como muito), ぜんぜん わかりません (não entendo nada).',
    'Na fala jovem, ぜんぜん também aparece com positivo para dizer “totalmente”: ぜんぜん だいじょうぶ (tranquilo, sem problema nenhum). É informal.'
  ], 'O advérbio costuma vir logo antes do verbo ou do objeto: よく アニメを みます.', [
    ['s1', 'あさは いつも コーヒーを のみます。', 'asa wa itsumo koohii o nomimasu.', 'De manhã sempre tomo café.', ''],
    ['s2', 'ときどき りょうりを します。', 'tokidoki ryouri o shimasu.', 'Às vezes eu cozinho.', ''],
    ['s3', 'たまに えいがかんに いきます。', 'tama ni eigakan ni ikimasu.', 'De vez em quando vou ao cinema.', ''],
    ['s4', 'テレビは あまり みません。', 'terebi wa amari mimasen.', 'Não vejo muita TV.', 'あまり + negativo.'],
    ['s5', 'おさけは ぜんぜん のみません。', 'osake wa zenzen nomimasen.', 'Não bebo álcool de jeito nenhum.', 'ぜんぜん + negativo.'],
    ['s6', 'ぜんぜん だいじょうぶだよ。', 'zenzen daijoubu da yo.', 'Tá tudo tranquilo, sério.', 'Informal: ぜんぜん + positivo.']
  ], [
    ['しゅうまつは よく ともだちと あそびますが、たまに ひとりで さんぽします。', 'shuumatsu wa yoku tomodachi to asobimasu ga, tama ni hitori de sanpo shimasu.', 'No fim de semana saio bastante com amigos, mas de vez em quando passeio sozinho.']
  ], [
    X.f('Não entendo nada.', 'ぜんぜん ＿＿＿＿＿。', ['わかりません|wakarimasen', 'わかります|wakarimasu', 'わかりました|wakarimashita'], 'ぜんぜん pede negativo.'),
    X.s('Ordene do mais frequente para o menos: qual vem primeiro?', ['いつも|itsumo', 'ときどき|tokidoki', 'たまに|tama ni'], 'いつも (sempre) > よく > ときどき > たまに.'),
    X.e('“Não como muito doce.”', ['あまいものは|amai mono wa', 'あまり|amari', 'たべます|tabemasu'], 2, 'あまり pede negativo: たべません.'),
    X.o('Às vezes eu cozinho.', ['ときどき|tokidoki', 'りょうりを|ryouri o', 'します|shimasu'], ['あまり|amari'], 'ときどき りょうりを します。')
  ]),
  L('c14l7', 'Intensidade: muito, um pouco, bastante', '強', 'grammar', [
    'とても = muito (neutro, também na escrita). すごく = muito (fala). ちょっと / すこし = um pouco. かなり = bem, consideravelmente. けっこう = até que bastante (mais do que se esperava).',
    'もっと = mais (comparando com o atual): もっと たべて! ずっと = muito mais (em comparação) ou o tempo todo.',
    'ちょっと também suaviza recusas: ちょっと… sozinho já significa “não dá”.'
  ], 'けっこう おいしい elogia com surpresa: “até que é bem gostoso!”.', [
    ['s1', 'この ケーキ、すごく おいしい！', 'kono keeki, sugoku oishii!', 'Este bolo está muito gostoso!', 'すごく: fala.'],
    ['s2', 'きょうは ちょっと さむいですね。', 'kyou wa chotto samui desu ne.', 'Hoje está um pouco frio, né?', ''],
    ['s3', 'この しけんは かなり むずかしかった。', 'kono shiken wa kanari muzukashikatta.', 'Esta prova foi bem difícil.', 'かなり = consideravelmente.'],
    ['s4', 'にほんごの ほんも けっこう よめます。', 'nihongo no hon mo kekkou yomemasu.', 'Até que consigo ler bastante livro em japonês.', 'けっこう = mais do que se esperava.'],
    ['s5', 'もっと ゆっくり おねがいします。', 'motto yukkuri onegaishimasu.', 'Mais devagar, por favor.', ''],
    ['s6', 'とうきょうは ブラジルより ずっと さむいです。', 'toukyou wa burajiru yori zutto samui desu.', 'Tóquio é muito mais fria que o Brasil.', 'ずっと = muito mais.']
  ], [
    ['ずっと まって いたよ。', 'zutto matte ita yo.', 'Fiquei esperando o tempo todo! (ずっと = o tempo todo)']
  ], [
    X.s('Qual palavra expressa “até que é bastante” (com surpresa)?', ['けっこう|kekkou', 'もっと|motto', 'ちょっと|chotto'], 'けっこう = mais do que se esperava.'),
    X.f('Coma mais!', '＿＿＿ たべて！', ['もっと|motto', 'ずっと|zutto', 'とても|totemo'], 'もっと = mais.'),
    X.s('Alguém convida você e você responde só “ちょっと…”. O que entendem?', ['Que você está recusando com educação.', 'Que você aceita.', 'Que você quer só um pouco.'], 'ちょっと… sozinho é uma recusa suave.'),
    X.o('Esta prova foi bem difícil.', ['この しけんは|kono shiken wa', 'かなり|kanari', 'むずかしかった|muzukashikatta'], ['むずかしい|muzukashii'], 'かなり + adjetivo.')
  ]),
  L('c14l8', 'Sentimentos e impressões', '心', 'vocab', [
    'Em japonês, os adjetivos de sentimento (うれしい, かなしい, さびしい) descrevem o que EU sinto. Para falar dos outros, usa-se がる ou そう: かなしそう (parece triste).',
    'たのしい é “divertido” (a atividade é divertida); うれしい é “feliz, contente” (com uma notícia ou presente). Não são intercambiáveis!',
    'つまらない (chato, sem graça) é o oposto de おもしろい (interessante, engraçado).'
  ], 'Ganhou um presente? うれしい! Foi à festa e curtiu? たのしかった!', [
    ['tanoshimi', 'たのしみです', 'tanoshimi desu', 'mal posso esperar (expectativa boa)', 'Para algo que vai acontecer: りょこう、たのしみです！ = Mal posso esperar pela viagem!', null, '楽しみです'],
    ['kanashii', 'かなしい', 'kanashii', 'triste', '', null, '悲しい'],
    ['sabishii', 'さびしい', 'sabishii', 'solitário, com saudade', 'Quando falta alguém. Também se ouve さみしい.', null, '寂しい'],
    ['omoshiroi', 'おもしろい', 'omoshiroi', 'interessante, engraçado', '', null, '面白い'],
    ['tsumaranai', 'つまらない', 'tsumaranai', 'chato, sem graça', '', null, ''],
    ['kowakatta', 'こわかった', 'kowakatta', 'foi assustador, tive medo', 'Passado de こわい (assustador / ter medo).', null, '怖かった'],
    ['shinpai', 'しんぱい', 'shinpai', 'preocupação', 'しんぱいです = estou preocupado. しんぱいしないで = não se preocupe.', null, '心配'],
    ['tsukareta', 'つかれました', 'tsukaremashita', 'estou cansado', 'Em japonês o cansaço é dito no passado: “cansei”.', null, '疲れました'],
    ['bikkuri', 'びっくりした', 'bikkuri shita', 'levei um susto, que surpresa', '', null, ''],
    ['hazukashii', 'てれる', 'tereru', 'ficar sem graça, encabulado', 'Quando alguém te elogia e você fica vermelho: てれるなあ.', null, '照れる']
  ], [
    ['プレゼント、ありがとう！ すごく うれしい！', 'purezento, arigatou! sugoku ureshii!', 'Obrigado pelo presente! Estou muito feliz!'],
    ['パーティーは たのしかったです。', 'paatii wa tanoshikatta desu.', 'A festa foi divertida.']
  ], [
    X.s('Você recebeu uma ótima notícia. O que diz?', ['うれしい！|ureshii!', 'たのしい！|tanoshii!', 'おもしろい！|omoshiroi!'], 'Com uma notícia ou presente: うれしい.'),
    X.s('Você foi a um parque de diversões e adorou. Como descreve o passeio?', ['たのしかった|tanoshikatta', 'うれしかった|ureshikatta', 'さびしかった|sabishikatta'], 'A atividade foi divertida: たのしかった.'),
    X.f('O filme foi chato.', 'えいがは ＿＿＿＿＿＿です。', ['つまらなかった|tsumaranakatta', 'おもしろかった|omoshirokatta', 'うれしかった|ureshikatta'], 'つまらない = chato. Passado: つまらなかった + です (nunca でした depois de adjetivo い).'),
    X.s('Como dizer “estou cansado” de forma natural?', ['つかれました|tsukaremashita', 'つかれます|tsukaremasu', 'つかれです|tsukare desu'], 'O cansaço se diz no passado: つかれました.')
  ]),
  L('c14l9', 'Parece: 〜そう', '様', 'grammar', [
    '〜そう descreve o que você VÊ: parece gostoso, parece caro. Com い: tira o い + そう: おいしそう. Com な: しずかそう.',
    'Exceções: いい → よさそう; ない → なさそう.',
    'そう com verbo (sem ます) indica que algo está prestes a acontecer: あめが ふりそう (parece que vai chover), なきそう (quase chorando).'
  ], 'Diante de uma comida bonita, o japonês diz おいしそう! antes de provar. Depois de provar: おいしい!', [
    ['s1', 'わあ、おいしそう！', 'waa, oishisou!', 'Uau, parece gostoso!', 'い → そう.'],
    ['s2', 'この かばん、たかそうですね。', 'kono kaban, takasou desu ne.', 'Esta bolsa parece cara, né?', ''],
    ['s3', 'げんきそうですね。', 'genki sou desu ne.', 'Você parece bem!', 'な → そう.'],
    ['s4', 'これ、よさそうだね。', 'kore, yosasou da ne.', 'Isto parece bom, hein.', 'いい → よさそう.'],
    ['s5', 'あめが ふりそうです。', 'ame ga furisou desu.', 'Parece que vai chover.', 'Verbo: prestes a acontecer.'],
    ['s6', 'おいしそうな ケーキですね。', 'oishisou na keeki desu ne.', 'Que bolo com cara de gostoso!', 'そう + な + substantivo.']
  ], [
    ['かのじょは いまにも なきそうな かおを して いた。', 'kanojo wa ima ni mo nakisou na kao o shite ita.', 'Ela estava com cara de quem ia chorar a qualquer momento.']
  ], [
    X.f('Parece difícil.', 'むずかし＿＿です。', ['そう|sou', 'いそう|isou', 'くそう|kusou'], 'Tira o い + そう.'),
    X.s('Como dizer “parece bom”?', ['よさそう|yosasou', 'いいそう|iisou', 'いそう|isou'], 'Exceção: いい → よさそう.'),
    X.s('あめが ふりそう significa…', ['Parece que vai chover.', 'Ouvi dizer que choveu.', 'Está chovendo forte.'], 'Verbo + そう: prestes a acontecer.'),
    X.e('“Que comida com cara de gostosa!”', ['おいしいそうな|oishiisou na', 'りょうりですね|ryouri desu ne'], 0, 'Tira o い: おいしそうな.')
  ]),
  L('c14l10', 'Demais: 〜すぎる', '過', 'grammar', [
    '〜すぎる = fazer algo demais / ser demais. Com verbos, use o radical da forma ます: たべます → たべすぎる (comer demais).',
    'Com い: tira o い: たかい → たかすぎる (caro demais). Com な: しずかすぎる. いい → よすぎる.',
    'Na fala jovem, 〜すぎ sozinho vira exclamação: かわいすぎ！ (fofo demais!), やばすぎ！'
  ], 'すぎる conjuga como verbo em る: たべすぎた (comi demais), たかすぎない (não é caro demais).', [
    ['s1', 'きのう、たべすぎました。', 'kinou, tabesugimashita.', 'Ontem comi demais.', ''],
    ['s2', 'この くつは たかすぎます。', 'kono kutsu wa takasugimasu.', 'Estes sapatos são caros demais.', ''],
    ['s3', 'ゲームを しすぎないで ください。', 'geemu o shisuginaide kudasai.', 'Não jogue videogame demais.', ''],
    ['s4', 'この へやは しずかすぎて、こわい。', 'kono heya wa shizukasugite, kowai.', 'Este quarto é silencioso demais, dá medo.', ''],
    ['s5', 'かわいすぎ！', 'kawaisugi!', 'Fofo demais!', 'Fala jovem.'],
    ['s6', 'おさけを のみすぎて、あたまが いたい。', 'osake o nomisugite, atama ga itai.', 'Bebi demais e estou com dor de cabeça.', '']
  ], [
    ['この もんだいは かんたんすぎて、つまらない。', 'kono mondai wa kantansugite, tsumaranai.', 'Este exercício é fácil demais, fica sem graça.']
  ], [
    X.f('Bebi demais.', 'のみ＿＿＿＿。', ['すぎました|sugimashita', 'すぎでした|sugi deshita', 'すぎいます|sugiimasu'], 'Radical + すぎる; passado: すぎました.'),
    X.f('É grande demais.', 'おお＿＿＿＿。', ['きすぎる|kisugiru', 'きいすぎる|kiisugiru', 'くすぎる|kusugiru'], 'おおきい: tira o い → おおきすぎる.'),
    X.s('Você trabalhou demais e está exausto. Como diz “trabalhei demais”?', ['はたらきすぎた|hatarakisugita', 'はたらくすぎた|hatarakusugita', 'はたらいてすぎた|hataraite sugita'], 'Radical da forma ます (はたらき) + すぎる.'),
    X.o('Não jogue demais.', ['ゲームを|geemu o', 'しすぎないで|shisuginaide', 'ください|kudasai'], ['しすぎて|shisugite'], 'しすぎないで ください。')
  ])
  );
})();
