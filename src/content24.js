/* ==========================================================
   CONTEÚDO 3.0 — Proficiente (N1): Gramática N1 (c31)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c31', emblem: '極', title: 'Gramática N1', jp: 'ぶんぽう', stage: 'pro', jlpt: 'N1',
    desc: 'Estruturas literárias e formais do N1: meios e marcos, extremos, imediatismo, intensidade, finalidade, inevitabilidade, concessão e avaliação.',
    requires: 'c25', reqWhy: 'As estruturas N1 pressupõem o domínio da gramática N2.'
  });
  c.lessons.push(
  L('c31l1', 'Meio e marco: をもって', '以', 'grammar', [
    'をもって tem dois usos formais. Meio: 〜を使って, em estilo solene: 書面をもってお知らせします (comunicaremos por escrito).',
    'Marco de tempo (início ou fim): 本日をもって閉店いたします (com o dia de hoje, encerramos as atividades).',
    'をもってすれば = se usarmos ~, com ~ (é possível): 彼の実力をもってすれば、優勝も夢ではない.'
  ], 'Em avisos de fechamento e demissões, をもって é a forma padrão: 三月末日をもって退職いたします.', [
    ['s1', '本日をもって、閉店いたします。', 'honjitsu o motte, heiten itashimasu.', 'Com o dia de hoje, encerramos as atividades da loja.', 'Marco final.'],
    ['s2', '結果は書面をもってお知らせします。', 'kekka wa shomen o motte oshirase shimasu.', 'O resultado será comunicado por escrito.', 'Meio.'],
    ['s3', '三月末日をもって退職いたします。', 'sangatsu matsujitsu o motte taishoku itashimasu.', 'Deixarei a empresa no último dia de março.', ''],
    ['s4', '彼の実力をもってすれば、優勝も夢ではない。', 'kare no jitsuryoku o motte sureba, yuushou mo yume de wa nai.', 'Com a capacidade dele, até o título é possível.', 'をもってすれば.'],
    ['s5', 'これをもちまして、式を終了いたします。', 'kore o mochimashite, shiki o shuuryou itashimasu.', 'Com isto, encerramos a cerimônia.', 'Forma polida: をもちまして.'],
    ['s6', '誠意をもって対応いたします。', 'seii o motte taiou itashimasu.', 'Atenderemos com toda a sinceridade.', '']
  ], [
    ['以上をもちまして、本日の説明会を終わらせていただきます。', 'ijou o mochimashite, honjitsu no setsumeikai o owarasete itadakimasu.', 'Com isso, encerramos a sessão informativa de hoje.']
  ], [
    X.f('A loja fecha no fim deste mês.', '今月末＿閉店いたします。', ['をもって|o motte', 'をもとに|o moto ni', 'について|ni tsuite'], 'Marco final = をもって.'),
    X.s('Forma mais polida, usada em cerimônias:', ['をもちまして|o mochimashite', 'をもって|o motte', 'で|de'], 'をもちまして.'),
    X.s('O que significa 彼の技術をもってすれば?', ['com a técnica dele (é possível)', 'apesar da técnica dele', 'sem a técnica dele'], 'をもってすれば = usando ~.'),
    X.e('Num aviso oficial: “Comunicaremos por e-mail.”', ['メール|meeru', 'をもちまして|o mochimashite', 'お知らせします|oshirase shimasu'], 1, 'Meio, em aviso: をもって. をもちまして é para marcos (encerramento).')
  ]),
  L('c31l2', 'Extremos: に至っては, に至るまで', '至', 'grammar', [
    'に至るまで = até mesmo, chegando a (abrangência completa): 子供からお年寄りに至るまで.',
    'に至っては = quanto a (o caso mais extremo de uma série negativa): 兄も弟も成績が悪い。妹に至っては、一度も学校に行っていない.',
    'に至る = chegar a (um estado, depois de um processo): 結論に至る. 事故に至った原因.'
  ], 'Use に至っては para o exemplo mais extremo, geralmente com tom crítico ou de espanto.', [
    ['s1', 'この祭りには、子供からお年寄りに至るまで、町中の人が参加する。', 'kono matsuri ni wa, kodomo kara otoshiyori ni itaru made, machijuu no hito ga sanka suru.', 'Deste festival participa a cidade toda, das crianças aos idosos.', ''],
    ['s2', '彼は服装から言葉遣いに至るまで、完璧だった。', 'kare wa fukusou kara kotobazukai ni itaru made, kanpeki datta.', 'Das roupas ao modo de falar, ele estava impecável.', ''],
    ['s3', '誰も手伝わない。部長に至っては、会議にも来なかった。', 'dare mo tetsudawanai. buchou ni itatte wa, kaigi ni mo konakatta.', 'Ninguém ajuda. O diretor, então, nem veio à reunião.', 'Caso extremo.'],
    ['s4', '長い議論の末、ようやく合意に至った。', 'nagai giron no sue, youyaku goui ni itatta.', 'Depois de longa discussão, finalmente se chegou a um acordo.', ''],
    ['s5', '事故に至った経緯を説明してください。', 'jiko ni itatta keii o setsumei shite kudasai.', 'Explique o que levou ao acidente.', ''],
    ['s6', '彼の部屋は散らかっている。机の上に至っては、物が山のようだ。', 'kare no heya wa chirakatte iru. tsukue no ue ni itatte wa, mono ga yama no you da.', 'O quarto dele é bagunçado. Em cima da mesa, então, as coisas formam uma montanha.', '']
  ], [
    ['この店では、食材から食器に至るまで、すべて地元の物を使っている。', 'kono mise de wa, shokuzai kara shokki ni itaru made, subete jimoto no mono o tsukatte iru.', 'Neste restaurante, dos ingredientes à louça, tudo é local.']
  ], [
    X.f('Das crianças aos idosos, todos gostam.', '子供から大人＿、みんな好きだ。', ['に至るまで|ni itaru made', 'に至っては|ni itatte wa', 'をもって|o motte'], 'Abrangência completa.'),
    X.s('“Todos chegaram tarde. O chefe, então, nem apareceu.” Qual forma?', ['部長に至っては|buchou ni itatte wa', '部長に至るまで|buchou ni itaru made', '部長をもって|buchou o motte'], 'Caso extremo = に至っては.'),
    X.f('Chegamos a uma conclusão.', '結論に＿。', ['至った|itatta', '至っては|itatte wa', '至るまで|itaru made'], 'に至る = chegar a.'),
    X.s('に至っては costuma ter que tom?', ['crítico ou de espanto', 'alegre', 'neutro e técnico'], 'O exemplo mais extremo.')
  ]),
  L('c31l3', 'Quando se chega a: ともなると', '成', 'grammar', [
    'ともなると / ともなれば = quando se chega a ser (um nível, posição, época), naturalmente…: 社長ともなると、忙しいだろう.',
    'Expressa que, ao atingir um ponto mais alto, a situação muda de forma esperada: 十二月ともなると、街はにぎやかになる.',
    'É parecido com になると, mas destaca que o nível é especial ou elevado.'
  ], 'プロともなれば = quando se trata de um profissional: a expectativa é maior.', [
    ['s1', '十二月ともなると、街はクリスマスの飾りでいっぱいになる。', 'juunigatsu tomo naru to, machi wa kurisumasu no kazari de ippai ni naru.', 'Chegando dezembro, a cidade se enche de enfeites de Natal.', ''],
    ['s2', '社長ともなれば、休む暇もないだろう。', 'shachou tomo nareba, yasumu hima mo nai darou.', 'Sendo presidente, imagino que nem tenha tempo de descansar.', ''],
    ['s3', 'プロともなると、練習の量が違う。', 'puro tomo naru to, renshuu no ryou ga chigau.', 'Sendo profissional, a quantidade de treino é outra.', ''],
    ['s4', '大学生ともなれば、自分のことは自分で決めるべきだ。', 'daigakusei tomo nareba, jibun no koto wa jibun de kimeru beki da.', 'Sendo universitário, deve decidir as próprias coisas.', ''],
    ['s5', '週末ともなると、この公園は家族連れでにぎわう。', 'shuumatsu tomo naru to, kono kouen wa kazokuzure de nigiwau.', 'Nos fins de semana, este parque fica cheio de famílias.', ''],
    ['s6', '五十年も続く店ともなると、常連客も多い。', 'gojuunen mo tsuzuku mise tomo naru to, jourenkyaku mo ooi.', 'Uma loja com cinquenta anos de história tem muitos clientes fiéis.', '']
  ], [
    ['夏休みともなると、観光地はどこも人でいっぱいだ。', 'natsuyasumi tomo naru to, kankouchi wa doko mo hito de ippai da.', 'Chegando as férias de verão, todos os pontos turísticos ficam lotados.']
  ], [
    X.f('Sendo um campeão, a pressão é enorme.', 'チャンピオン＿、プレッシャーも大きい。', ['ともなると|tomo naru to', 'に至っては|ni itatte wa', 'をもって|o motte'], 'Nível elevado = ともなると.'),
    X.s('ともなると destaca que:', ['o nível alcançado é especial e muda a situação', 'algo é proibido', 'algo aconteceu por acaso'], 'Ponto elevado.'),
    X.s('Qual é a forma condicional com ば?', ['ともなれば|tomo nareba', 'ともなったら|tomo nattara', 'ともならば|tomo naraba'], 'ともなると / ともなれば.'),
    X.o('Chegando o inverno, neva muito aqui.', ['冬|fuyu', 'ともなると、|tomo naru to,', 'ここは雪が多い|koko wa yuki ga ooi'], ['ともなって|tomo natte'], 'ともなると.')
  ]),
  L('c31l4', 'Ignorar e não se abalar: をよそに, をものともせず', '顧', 'grammar', [
    'をよそに = sem se importar com, ignorando (preocupações ou opiniões alheias): 親の心配をよそに、彼は一人で旅に出た.',
    'をものともせず = sem se abalar com, enfrentando (dificuldades), em tom de admiração: 怪我をものともせず、最後まで走った.',
    'をよそに costuma ter tom crítico; をものともせず, de elogio.'
  ], 'Ambas são escritas e aparecem em notícias e narrativas.', [
    ['s1', '親の心配をよそに、彼は危険な山に登った。', 'oya no shinpai o yoso ni, kare wa kiken na yama ni nobotta.', 'Ignorando a preocupação dos pais, ele escalou uma montanha perigosa.', ''],
    ['s2', '住民の反対をよそに、工事は進められた。', 'juumin no hantai o yoso ni, kouji wa susumerareta.', 'Ignorando a oposição dos moradores, a obra prosseguiu.', 'Crítica.'],
    ['s3', '彼女は怪我をものともせず、試合に出場した。', 'kanojo wa kega o mono to mo sezu, shiai ni shutsujou shita.', 'Sem se abalar com a lesão, ela entrou no jogo.', 'Admiração.'],
    ['s4', '強風をものともせず、船は港を出た。', 'kyoufuu o mono to mo sezu, fune wa minato o deta.', 'Enfrentando o vento forte, o barco deixou o porto.', ''],
    ['s5', '周囲の期待をよそに、彼は引退を発表した。', 'shuui no kitai o yoso ni, kare wa intai o happyou shita.', 'Indiferente às expectativas de todos, ele anunciou a aposentadoria.', ''],
    ['s6', '数々の困難をものともせず、夢を実現させた。', 'kazukazu no konnan o mono to mo sezu, yume o jitsugen saseta.', 'Sem se abalar com inúmeras dificuldades, realizou o sonho.', '']
  ], [
    ['世間の批判をよそに、その政治家は発言を撤回しなかった。', 'seken no hihan o yoso ni, sono seijika wa hatsugen o tekkai shinakatta.', 'Ignorando as críticas da sociedade, aquele político não retirou o que disse.']
  ], [
    X.s('“Sem se abalar com a chuva forte, os atletas correram.” (admiração)', ['大雨をものともせず|ooame o mono to mo sezu', '大雨をよそに|ooame o yoso ni', '大雨をもって|ooame o motte'], 'Admiração = をものともせず.'),
    X.s('“Ignorando a preocupação da família, ele largou o emprego.” (crítica)', ['家族の心配をよそに|kazoku no shinpai o yoso ni', '家族の心配をものともせず|kazoku no shinpai o mono to mo sezu', '家族の心配に至っては|kazoku no shinpai ni itatte wa'], 'Indiferença = をよそに.'),
    X.s('Qual costuma ter tom de elogio?', ['をものともせず|o mono to mo sezu', 'をよそに|o yoso ni'], 'Enfrentar com coragem.'),
    X.s('Onde estas formas aparecem mais?', ['notícias e narrativas', 'mensagens de amigos', 'cardápios'], 'Estilo escrito.')
  ]),
  L('c31l5', 'Imediatamente: や否や, が早いか, なり', '即', 'grammar', [
    'や否や / や = mal (aconteceu A), logo B: ベルが鳴るや否や、生徒たちは教室を飛び出した. Estilo escrito.',
    'が早いか = mal… e já (ações rápidas, quase simultâneas): 家に帰るが早いか、ゲームを始めた.',
    'なり = assim que (com ação inesperada da mesma pessoa): 彼は私の顔を見るなり、泣き出した. O sujeito das duas partes é o mesmo, e não é a primeira pessoa.'
  ], 'As três formas descrevem fatos passados e não aceitam pedidos ou intenções na segunda parte.', [
    ['s1', 'ドアが開くや否や、客が店に流れ込んだ。', 'doa ga aku ya ina ya, kyaku ga mise ni nagarekonda.', 'Mal a porta abriu, os clientes invadiram a loja.', ''],
    ['s2', '彼は席に着くが早いか、弁当を食べ始めた。', 'kare wa seki ni tsuku ga hayai ka, bentou o tabehajimeta.', 'Mal se sentou, ele começou a comer a marmita.', ''],
    ['s3', '母は電話を切るなり、泣き出した。', 'haha wa denwa o kiru nari, nakidashita.', 'Assim que desligou o telefone, minha mãe começou a chorar.', 'Mesmo sujeito.'],
    ['s4', '試験が終わるや、学生たちは一斉に話し始めた。', 'shiken ga owaru ya, gakuseitachi wa issei ni hanashihajimeta.', 'Mal a prova terminou, os estudantes começaram a falar todos ao mesmo tempo.', 'や = や否や.'],
    ['s5', '彼女は部屋に入るなり、窓を開けた。', 'kanojo wa heya ni hairu nari, mado o aketa.', 'Assim que entrou no quarto, ela abriu a janela.', ''],
    ['s6', '子供は布団に入るが早いか、眠ってしまった。', 'kodomo wa futon ni hairu ga hayai ka, nemutte shimatta.', 'Mal se deitou no futon, a criança adormeceu.', '']
  ], [
    ['新商品は発売されるや否や、売り切れになった。', 'shinshouhin wa hatsubai sareru ya ina ya, urikire ni natta.', 'Mal foi lançado, o produto novo esgotou.']
  ], [
    X.f('Mal o sinal tocou, todos saíram correndo.', 'チャイムが鳴る＿、みんな走り出した。', ['や否や|ya ina ya', 'なり|nari', 'ともなると|tomo naru to'], 'Sujeitos diferentes, escrito = や否や.'),
    X.s('Qual forma exige o MESMO sujeito nas duas partes?', ['なり|nari', 'や否や|ya ina ya'], 'なり = mesma pessoa.'),
    X.e('“Assim que chegar, me ligue.”', ['着く|tsuku', 'なり|nari', '電話してください|denwa shite kudasai'], 1, 'Estas formas não aceitam pedidos: use 着いたらすぐ.'),
    X.s('Estas formas descrevem:', ['fatos passados', 'planos futuros', 'pedidos'], 'Narrativa de fatos.')
  ]),
  L('c31l6', 'Como se fosse: んばかりに, とばかりに', '態', 'grammar', [
    'んばかりに = como se fosse (fazer algo), quase a ponto de: 泣かんばかりに頼んだ (pediu quase chorando). Forma: raiz negativa + んばかり (する → せんばかり).',
    'とばかりに = como se dissesse “~”: 「早く帰れ」とばかりに、店員は片付けを始めた.',
    'Ambas descrevem a aparência de alguém de forma vívida, em textos narrativos.'
  ], 'あふれんばかりの笑顔 (um sorriso transbordante) é uma expressão comum em textos.', [
    ['s1', '彼は泣かんばかりに謝った。', 'kare wa nakan bakari ni ayamatta.', 'Ele pediu desculpas quase chorando.', ''],
    ['s2', '子供たちは、あふれんばかりの笑顔で迎えてくれた。', 'kodomotachi wa, afuren bakari no egao de mukaete kureta.', 'As crianças nos receberam com sorrisos transbordantes.', ''],
    ['s3', '割れんばかりの拍手が起こった。', 'waren bakari no hakushu ga okotta.', 'Houve um aplauso estrondoso (de rachar o teatro).', ''],
    ['s4', '店員は「早く帰れ」とばかりに、電気を消し始めた。', 'ten\'in wa "hayaku kaere" to bakari ni, denki o keshihajimeta.', 'Como quem diz “vão embora logo”, o atendente começou a apagar as luzes.', ''],
    ['s5', '待ってましたとばかりに、彼は話し始めた。', 'mattemashita to bakari ni, kare wa hanashihajimeta.', 'Como quem estava esperando por isso, ele começou a falar.', ''],
    ['s6', '彼女は今にも泣き出さんばかりの顔をしていた。', 'kanojo wa ima ni mo nakidasan bakari no kao o shite ita.', 'Ela estava com cara de quem ia começar a chorar a qualquer momento.', '']
  ], [
    ['コンサートが終わると、会場は割れんばかりの拍手に包まれた。', 'konsaato ga owaru to, kaijou wa waren bakari no hakushu ni tsutsumareta.', 'Quando o show acabou, o local foi tomado por um aplauso estrondoso.']
  ], [
    X.f('Pediu quase gritando.', '叫ば＿ばかりに頼んだ。', ['ん|n', 'ない|nai', 'ず|zu'], 'Raiz negativa + んばかり.'),
    X.s('“Como quem diz ‘eu avisei’, ele sorriu.”', ['「言っただろう」とばかりに|"itta darou" to bakari ni', '「言っただろう」んばかりに|"itta darou" n bakari ni', '「言っただろう」をよそに|"itta darou" o yoso ni'], 'Citação + とばかりに.'),
    X.s('O que significa 割れんばかりの拍手?', ['aplauso estrondoso', 'aplauso fraco', 'aplauso falso'], 'De rachar.'),
    X.s('Forma de する com んばかり:', ['せんばかり|sen bakari', 'しんばかり|shin bakari', 'さんばかり|san bakari'], 'する → せん.')
  ]),
  L('c31l7', 'Nem é preciso: までもない, には及ばない', '及', 'grammar', [
    'までもない = nem é preciso (de tão óbvio): 言うまでもなく, 健康は大切だ (nem é preciso dizer que a saúde é importante).',
    'には及ばない = não é necessário (tranquilizando alguém): わざわざ来るには及ばない. Também “não chega aos pés de”: 私の料理は母のには及ばない.',
    '言うまでもない é muito comum como abertura: 言うまでもなく、〜.'
  ], 'ご心配には及びません = não precisa se preocupar (formal).', [
    ['s1', '言うまでもなく、安全が第一だ。', 'iu made mo naku, anzen ga daiichi da.', 'Nem é preciso dizer: a segurança vem em primeiro lugar.', ''],
    ['s2', 'こんな簡単なこと、調べるまでもない。', 'konna kantan na koto, shiraberu made mo nai.', 'Uma coisa simples assim nem precisa pesquisar.', ''],
    ['s3', 'ご心配には及びません。', 'goshinpai ni wa oyobimasen.', 'Não precisa se preocupar.', 'Formal.'],
    ['s4', 'わざわざお越しいただくには及びません。', 'wazawaza okoshi itadaku ni wa oyobimasen.', 'Não é necessário que o senhor se dê ao trabalho de vir.', ''],
    ['s5', '私の日本語は、まだまだ先生には及ばない。', 'watashi no nihongo wa, madamada sensei ni wa oyobanai.', 'Meu japonês ainda não chega aos pés do professor.', 'Comparação.'],
    ['s6', '結果は見るまでもなく明らかだ。', 'kekka wa miru made mo naku akiraka da.', 'O resultado é evidente, nem é preciso ver.', '']
  ], [
    ['言うまでもないことですが、締め切りは必ず守ってください。', 'iu made mo nai koto desu ga, shimekiri wa kanarazu mamotte kudasai.', 'Nem precisaria dizer, mas respeitem o prazo sem falta.']
  ], [
    X.f('Nem é preciso dizer que…', '言う＿、…', ['までもなく|made mo naku', 'には及ばず|ni wa oyobazu', 'や否や|ya ina ya'], '言うまでもなく.'),
    X.s('Para tranquilizar um cliente formalmente:', ['ご心配には及びません|goshinpai ni wa oyobimasen', '心配するまでもない|shinpai suru made mo nai', '心配しろ|shinpai shiro'], 'Formal.'),
    X.s('O que significa 母の料理には及ばない?', ['não chega aos pés da comida da mãe', 'é melhor que a da mãe', 'é igual'], 'Comparação.'),
    X.s('までもない expressa que algo é:', ['óbvio, desnecessário', 'proibido', 'urgente'], 'Nem é preciso.')
  ]),
  L('c31l8', 'Sentimento profundo: てやまない, を禁じ得ない', '禁', 'grammar', [
    'てやまない = desejar (esperar, amar) profundamente, sem cessar. Usado em discursos e cartas: ご成功を願ってやみません.',
    'を禁じ得ない = não conseguir conter (um sentimento): 怒りを禁じ得ない, 涙を禁じ得ない, 同情を禁じ得ない.',
    'Ambos são formais e expressam sentimentos intensos de maneira contida.'
  ], 'Fechamento clássico de discursos: 皆様のご健康とご活躍を心より願ってやみません.', [
    ['s1', '皆様のご健康を心より願ってやみません。', 'minasama no gokenkou o kokoro yori negatte yamimasen.', 'Desejo de coração a saúde de todos.', 'Discurso.'],
    ['s2', '彼は故郷を愛してやまない。', 'kare wa kokyou o aishite yamanai.', 'Ele ama profundamente sua terra natal.', ''],
    ['s3', 'この作品は、多くの人を魅了してやまない。', 'kono sakuhin wa, ooku no hito o miryou shite yamanai.', 'Esta obra não para de encantar muita gente.', ''],
    ['s4', '被害者の話を聞いて、涙を禁じ得なかった。', 'higaisha no hanashi o kiite, namida o kinjienakatta.', 'Ao ouvir a história da vítima, não pude conter as lágrimas.', ''],
    ['s5', 'このような事件には、怒りを禁じ得ない。', 'kono you na jiken ni wa, ikari o kinjienai.', 'Diante de um caso assim, não consigo conter a indignação.', ''],
    ['s6', '彼の境遇には同情を禁じ得ない。', 'kare no kyouguu ni wa doujou o kinjienai.', 'Não posso deixar de sentir compaixão pela situação dele.', '']
  ], [
    ['卒業生の皆さんの未来が輝かしいものであることを、願ってやみません。', 'sotsugyousei no minasan no mirai ga kagayakashii mono de aru koto o, negatte yamimasen.', 'Desejo profundamente que o futuro dos formandos seja brilhante.']
  ], [
    X.s('Num discurso de formatura, para desejar sucesso:', ['ご活躍を願ってやみません|gokatsuyaku o negatte yamimasen', 'ご活躍を禁じ得ません|gokatsuyaku o kinjiemasen', 'ご活躍に及びません|gokatsuyaku ni oyobimasen'], 'てやまない = desejar profundamente.'),
    X.f('Não pude conter as lágrimas.', '涙を＿。', ['禁じ得なかった|kinjienakatta', 'やまなかった|yamanakatta', '及ばなかった|oyobanakatta'], 'を禁じ得ない.'),
    X.s('Com quais palavras を禁じ得ない combina?', ['怒り, 涙, 同情|ikari, namida, doujou', '食事, 仕事, 旅行|shokuji, shigoto, ryokou', '電車, 車, 船|densha, kuruma, fune'], 'Sentimentos.'),
    X.s('Estas formas são:', ['formais, de sentimento intenso e contido', 'gírias', 'infantis'], 'Discursos e textos.')
  ]),
  L('c31l9', 'Finalidade: べく, んがため', '為', 'grammar', [
    'べく = com o objetivo de, para (escrito, formal): 夢を実現すべく、毎日努力している. する → すべく.',
    'んがため(に) = com o firme propósito de (muito literário): 勝たんがために、あらゆる手を尽くした. Forma: raiz negativa + んがため.',
    'Ambas não aceitam pedidos ou ordens na segunda parte e soam solenes.'
  ], 'べく também aparece em べくして (inevitavelmente): 起こるべくして起こった事故 (um acidente que estava fadado a acontecer).', [
    ['s1', '医者になるべく、医学部を目指している。', 'isha ni naru beku, igakubu o mezashite iru.', 'Para ser médico, mira a faculdade de medicina.', ''],
    ['s2', '問題を解決すべく、専門家が集められた。', 'mondai o kaiketsu subeku, senmonka ga atsumerareta.', 'Para resolver o problema, foram reunidos especialistas.', 'する → すべく.'],
    ['s3', '家族を養わんがため、彼は昼も夜も働いた。', 'kazoku o yashinawan ga tame, kare wa hiru mo yoru mo hataraita.', 'Para sustentar a família, ele trabalhou dia e noite.', ''],
    ['s4', '真実を明らかにせんがため、記者は取材を続けた。', 'shinjitsu o akiraka ni sen ga tame, kisha wa shuzai o tsuzuketa.', 'Com o firme propósito de revelar a verdade, o jornalista seguiu investigando.', 'する → せんがため.'],
    ['s5', 'その事故は起こるべくして起こった。', 'sono jiko wa okoru beku shite okotta.', 'Aquele acidente estava fadado a acontecer.', 'べくして.'],
    ['s6', '期待に応えるべく、全力を尽くします。', 'kitai ni kotaeru beku, zenryoku o tsukushimasu.', 'Para corresponder às expectativas, darei o meu melhor.', '']
  ], [
    ['新たな市場を開拓すべく、海外に支社を設立した。', 'arata na shijou o kaitaku subeku, kaigai ni shisha o setsuritsu shita.', 'Para desbravar novos mercados, abrimos uma filial no exterior.']
  ], [
    X.f('Para realizar o sonho, foi a Tóquio.', '夢を実現す＿、東京へ行った。', ['べく|beku', 'べき|beki', 'べし|beshi'], 'する → すべく.'),
    X.e('“Para passar, estude!” (ordem)', ['合格すべく|goukaku subeku', '勉強しなさい|benkyou shinasai'], 0, 'べく não aceita ordens na segunda parte: use 合格するために.'),
    X.s('O que significa 起こるべくして起こった?', ['estava fadado a acontecer', 'deveria acontecer, mas não aconteceu', 'aconteceu sem querer'], 'べくして = inevitavelmente.'),
    X.s('Forma de 勝つ com んがため:', ['勝たんがため|katan ga tame', '勝つんがため|katsun ga tame', '勝ちんがため|kachin ga tame'], 'Raiz negativa + ん.')
  ]),
  L('c31l10', 'Inevitável: ずにはおかない, ずにはすまない', '済', 'grammar', [
    'ずにはおかない = vai necessariamente causar (efeito inevitável sobre as pessoas): この映画は見る人を感動させずにはおかない.',
    'Também expressa determinação forte: 犯人を見つけずにはおかない (não vou sossegar até achar o culpado).',
    'ずにはすまない / ないではすまない = não dá para escapar de, é obrigatório (pela situação ou moral): 謝らずにはすまない.'
  ], 'する → せずにはおかない / せずにはすまない.', [
    ['s1', '彼の演説は、聞く人を感動させずにはおかない。', 'kare no enzetsu wa, kiku hito o kandou sasezu ni wa okanai.', 'O discurso dele emociona inevitavelmente quem ouve.', 'Efeito inevitável.'],
    ['s2', 'この事件は、社会に大きな影響を与えずにはおかないだろう。', 'kono jiken wa, shakai ni ookina eikyou o ataezu ni wa okanai darou.', 'Este caso certamente terá grande impacto na sociedade.', ''],
    ['s3', '真相を突き止めずにはおかない。', 'shinsou o tsukitomezu ni wa okanai.', 'Não vou sossegar até descobrir a verdade.', 'Determinação.'],
    ['s4', '人の物を壊したのだから、弁償せずにはすまない。', 'hito no mono o kowashita no da kara, benshou sezu ni wa sumanai.', 'Quebrou algo de outra pessoa, então não tem como não pagar.', ''],
    ['s5', 'これだけ迷惑をかけたら、謝らずにはすまないだろう。', 'kore dake meiwaku o kaketara, ayamarazu ni wa sumanai darou.', 'Depois de tanto transtorno, não dá para escapar de pedir desculpas.', ''],
    ['s6', '会社の規則を破ったので、処分を受けずにはすまない。', 'kaisha no kisoku o yabutta node, shobun o ukezu ni wa sumanai.', 'Quebrou as regras da empresa, então não escapará de uma punição.', '']
  ], [
    ['その美しい景色は、訪れる人の心を動かさずにはおかない。', 'sono utsukushii keshiki wa, otozureru hito no kokoro o ugokasazu ni wa okanai.', 'Aquela paisagem linda inevitavelmente toca o coração de quem a visita.']
  ], [
    X.s('“Este livro vai inevitavelmente fazer o leitor pensar.”', ['考えさせずにはおかない|kangaesasezu ni wa okanai', '考えさせずにはすまない|kangaesasezu ni wa sumanai', '考えるまでもない|kangaeru made mo nai'], 'Efeito inevitável = ずにはおかない.'),
    X.s('“Não tem como não pedir desculpas.” (obrigação moral)', ['謝らずにはすまない|ayamarazu ni wa sumanai', '謝らずにはおかない|ayamarazu ni wa okanai', '謝るには及ばない|ayamaru ni wa oyobanai'], 'Obrigação = ずにはすまない.'),
    X.f('Forma de する', '＿ずにはすまない', ['せ|se', 'し|shi', 'さ|sa'], 'する → せず.'),
    X.s('真相を突き止めずにはおかない expressa:', ['determinação forte', 'desistência', 'dúvida'], 'Não vou parar até…')
  ]),
  L('c31l11', 'Mesmo sendo: といえども, たりとも', '雖', 'grammar', [
    'といえども = mesmo sendo, ainda que seja (formal): 子供といえども、ルールは守らなければならない.',
    'たりとも + negativa = nem um único (nem o mínimo): 一円たりとも無駄にできない. Usa-se com 一 + contador.',
    'Ambos são escritos e enfáticos, típicos de discursos, editoriais e literatura.'
  ], '一日たりとも忘れたことはない = nunca esqueci, nem por um único dia.', [
    ['s1', '子供といえども、ルールは守るべきだ。', 'kodomo to iedomo, ruuru wa mamoru beki da.', 'Mesmo sendo criança, deve respeitar as regras.', ''],
    ['s2', '冬といえども、この地方は暖かい。', 'fuyu to iedomo, kono chihou wa atatakai.', 'Mesmo sendo inverno, esta região é quente.', ''],
    ['s3', 'プロといえども、失敗することはある。', 'puro to iedomo, shippai suru koto wa aru.', 'Mesmo profissionais às vezes erram.', ''],
    ['s4', '一円たりとも無駄にはできない。', 'ichien taritomo muda ni wa dekinai.', 'Não posso desperdiçar nem um único iene.', ''],
    ['s5', '一日たりとも、君のことを忘れたことはない。', 'ichinichi taritomo, kimi no koto o wasureta koto wa nai.', 'Nunca te esqueci, nem por um único dia.', ''],
    ['s6', '試合中は、一瞬たりとも気を抜いてはいけない。', 'shiaichuu wa, isshun taritomo ki o nuite wa ikenai.', 'Durante o jogo, não se pode relaxar nem por um instante.', '']
  ], [
    ['いかに優秀な人といえども、一人でできることには限りがある。', 'ika ni yuushuu na hito to iedomo, hitori de dekiru koto ni wa kagiri ga aru.', 'Por mais competente que seja alguém, o que se faz sozinho tem limite.']
  ], [
    X.f('Nem uma única pessoa veio.', '一人＿来なかった。', ['たりとも|taritomo', 'といえども|to iedomo', 'ともなると|tomo naru to'], 'Nem um único = たりとも.'),
    X.f('Mesmo sendo o presidente, não pode quebrar as regras.', '社長＿、規則を破ってはいけない。', ['といえども|to iedomo', 'たりとも|taritomo', 'をもって|o motte'], 'Mesmo sendo = といえども.'),
    X.s('たりとも sempre vem com:', ['一 + contador e negativa', 'um verbo no passado', 'um pedido'], 'Nem um único.'),
    X.s('O que significa 一瞬たりとも?', ['nem por um instante', 'por um instante', 'muitas vezes'], '一瞬 = instante.')
  ]),
  L('c31l12', 'Só mesmo: ならでは', '独', 'grammar', [
    'ならでは(の) = típico de, que só (aquele lugar, pessoa) pode ter: 京都ならではの景色 (uma paisagem que só Kyoto tem).',
    'Muito usado em publicidade, turismo e críticas, sempre com sentido positivo.',
    'ならではだ no fim da frase: この味は老舗ならではだ (este sabor só uma casa tradicional consegue).'
  ], 'Em propagandas: 地元ならではの味 (sabor que só a terra tem), この季節ならでは (só nesta estação).', [
    ['s1', 'これは京都ならではの景色だ。', 'kore wa kyouto nara de wa no keshiki da.', 'Esta é uma paisagem que só Kyoto tem.', ''],
    ['s2', '地元ならではの料理を楽しんだ。', 'jimoto nara de wa no ryouri o tanoshinda.', 'Aproveitei a culinária típica da região.', ''],
    ['s3', 'この細かい作業は、職人ならではの技だ。', 'kono komakai sagyou wa, shokunin nara de wa no waza da.', 'Este trabalho minucioso é técnica que só um artesão tem.', ''],
    ['s4', '子供ならではの自由な発想に驚いた。', 'kodomo nara de wa no jiyuu na hassou ni odoroita.', 'Fiquei surpreso com a criatividade livre, típica de criança.', ''],
    ['s5', 'この季節ならではの味を、ぜひお楽しみください。', 'kono kisetsu nara de wa no aji o, zehi otanoshimi kudasai.', 'Aproveitem o sabor que só esta estação oferece.', 'Publicidade.'],
    ['s6', 'この温かいもてなしは、老舗旅館ならではだ。', 'kono atatakai motenashi wa, shinise ryokan nara de wa da.', 'Esta hospitalidade calorosa só uma pousada tradicional oferece.', '']
  ], [
    ['この店では、海の町ならではの新鮮な魚が食べられる。', 'kono mise de wa, umi no machi nara de wa no shinsen na sakana ga taberareru.', 'Neste restaurante se come peixe fresco, típico de cidade litorânea.']
  ], [
    X.f('Um festival que só esta cidade tem.', 'この町＿の祭り', ['ならでは|nara de wa', 'といえども|to iedomo', 'たりとも|taritomo'], 'ならではの = típico de.'),
    X.s('ならでは costuma ter sentido:', ['positivo, de exclusividade', 'negativo, de crítica', 'neutro, de lugar'], 'Elogio.'),
    X.s('Onde ならでは aparece muito?', ['publicidade e turismo', 'contratos', 'manuais técnicos'], 'Destacar o exclusivo.'),
    X.o('Esta é uma ideia típica de jovens.', ['若者|wakamono', 'ならではの|nara de wa no', '発想だ|hassou da'], ['といえどもの|to iedomo no'], 'ならではの + substantivo.')
  ]),
  L('c31l13', 'Avaliação: にかたくない, に足る', '足', 'grammar', [
    'にかたくない = não é difícil (imaginar, entender): 彼の苦労は想像にかたくない. Combina com 想像, 理解, 察する.',
    'に足る = digno de, que merece (avaliação positiva): 信頼に足る人物 (pessoa digna de confiança).',
    'に足らない / に足りない = insignificante, que não merece: 取るに足らない問題 (problema insignificante).'
  ], '取るに足らない = tão pequeno que nem vale a pena pegar: insignificante.', [
    ['s1', '家族を失った彼の悲しみは、想像にかたくない。', 'kazoku o ushinatta kare no kanashimi wa, souzou ni katakunai.', 'Não é difícil imaginar a tristeza dele ao perder a família.', ''],
    ['s2', '彼女がどれほど努力したかは、察するにかたくない。', 'kanojo ga dore hodo doryoku shita ka wa, sassuru ni katakunai.', 'Não é difícil perceber o quanto ela se esforçou.', ''],
    ['s3', '彼は信頼に足る人物だ。', 'kare wa shinrai ni taru jinbutsu da.', 'Ele é uma pessoa digna de confiança.', ''],
    ['s4', 'この論文は、読むに足る内容だ。', 'kono ronbun wa, yomu ni taru naiyou da.', 'Este artigo tem conteúdo que vale a pena ler.', ''],
    ['s5', 'そんなことは、取るに足らない問題だ。', 'sonna koto wa, toru ni taranai mondai da.', 'Isso é um problema insignificante.', ''],
    ['s6', '彼の言葉は、信じるに足るものではなかった。', 'kare no kotoba wa, shinjiru ni taru mono de wa nakatta.', 'As palavras dele não eram dignas de crédito.', '']
  ], [
    ['初めて海外で暮らす不安は、想像にかたくない。', 'hajimete kaigai de kurasu fuan wa, souzou ni katakunai.', 'Não é difícil imaginar a ansiedade de morar no exterior pela primeira vez.']
  ], [
    X.f('Não é difícil imaginar.', '想像に＿。', ['かたくない|katakunai', '足る|taru', '及ばない|oyobanai'], '想像にかたくない.'),
    X.f('Uma pessoa digna de respeito', '尊敬に＿人物', ['足る|taru', 'かたくない|katakunai', '至る|itaru'], 'に足る = digno de.'),
    X.s('O que significa 取るに足らない?', ['insignificante', 'muito importante', 'difícil de pegar'], 'Nem vale a pena pegar.'),
    X.s('Com quais palavras にかたくない combina?', ['想像, 理解, 察する|souzou, rikai, sassuru', '食べる, 飲む|taberu, nomu', '行く, 来る|iku, kuru'], 'Imaginar, entender.')
  ]),
  L('c31l14', 'Tendência negativa: きらいがある, 始末だ', '癖', 'grammar', [
    'きらいがある = ter a (má) tendência de: 彼は何でも大げさに言うきらいがある.',
    '始末だ = no fim, acabou chegando a (resultado ruim, depois de uma série de problemas): 遅刻を繰り返し、ついには会議を忘れる始末だ.',
    'Ambos criticam: きらいがある é uma tendência; 始末だ é o desfecho lamentável.'
  ], 'きらいがある às vezes é escrito 嫌いがある, mas aqui não significa “detestar”: indica uma tendência indesejável.', [
    ['s1', '彼は人の話を最後まで聞かないきらいがある。', 'kare wa hito no hanashi o saigo made kikanai kirai ga aru.', 'Ele tem a mania de não ouvir os outros até o fim.', ''],
    ['s2', '最近の若者は、すぐ諦めるきらいがあると言われる。', 'saikin no wakamono wa, sugu akirameru kirai ga aru to iwareru.', 'Dizem que os jovens de hoje tendem a desistir fácil.', ''],
    ['s3', '彼女は物事を悪いほうに考えるきらいがある。', 'kanojo wa monogoto o warui hou ni kangaeru kirai ga aru.', 'Ela tende a ver tudo pelo lado negativo.', ''],
    ['s4', '弟は遊んでばかりで、ついに大学を退学する始末だ。', 'otouto wa asonde bakari de, tsui ni daigaku o taigaku suru shimatsu da.', 'Meu irmão só se divertia, e no fim acabou largando a faculdade.', ''],
    ['s5', '何度注意しても聞かず、最後には逆ギレする始末だ。', 'nando chuui shite mo kikazu, saigo ni wa gyakugire suru shimatsu da.', 'Não ouvia por mais que eu avisasse, e no fim ainda ficou bravo comigo.', ''],
    ['s6', 'お金を使いすぎて、友達に借りる始末だった。', 'okane o tsukaisugite, tomodachi ni kariru shimatsu datta.', 'Gastei demais e acabei tendo que pedir emprestado a amigos.', '']
  ], [
    ['あの政治家は、都合の悪い質問をはぐらかすきらいがある。', 'ano seijika wa, tsugou no warui shitsumon o hagurakasu kirai ga aru.', 'Aquele político tende a fugir de perguntas inconvenientes.']
  ], [
    X.f('Ele tem a tendência de exagerar.', '彼は大げさに言う＿。', ['きらいがある|kirai ga aru', '始末だ|shimatsu da', 'ならではだ|nara de wa da'], 'Tendência = きらいがある.'),
    X.s('始末だ indica:', ['um desfecho lamentável', 'um bom resultado', 'uma tendência neutra'], 'Acabou chegando a isso.'),
    X.s('“Não estudava nada e no fim reprovou.” Qual forma?', ['落第する始末だ|rakudai suru shimatsu da', '落第するきらいがある|rakudai suru kirai ga aru', '落第に足る|rakudai ni taru'], 'Desfecho ruim = 始末だ.'),
    X.s('Ambas as formas expressam:', ['crítica', 'elogio', 'neutralidade'], 'Tom negativo.')
  ]),
  L('c31l15', 'Seja A ou B: であれ, といい', '並', 'grammar', [
    'AであれBであれ = seja A ou B (não importa): 雨であれ雪であれ、試合は行う.',
    'であれ sozinho = seja quem for / o que for: 誰であれ, 理由はどうであれ (seja qual for o motivo).',
    'AといいBといい = tanto A quanto B (avaliando aspectos de algo, positivo ou negativo): 味といい値段といい、最高だ.'
  ], 'といい〜といい sempre traz uma avaliação geral no final: 最高だ, 文句なしだ, ひどい.', [
    ['s1', '雨であれ雪であれ、配達は休みません。', 'ame de are yuki de are, haitatsu wa yasumimasen.', 'Seja chuva ou neve, a entrega não para.', ''],
    ['s2', '理由はどうであれ、暴力は許されない。', 'riyuu wa dou de are, bouryoku wa yurusarenai.', 'Seja qual for o motivo, violência não é aceitável.', ''],
    ['s3', '誰であれ、ルールを破った人は罰せられる。', 'dare de are, ruuru o yabutta hito wa basserareru.', 'Seja quem for, quem quebrar as regras será punido.', ''],
    ['s4', 'この店は味といい雰囲気といい、文句なしだ。', 'kono mise wa aji to ii fun\'iki to ii, monku nashi da.', 'Tanto o sabor quanto o ambiente deste restaurante são impecáveis.', ''],
    ['s5', '色といいデザインといい、私の好みにぴったりだ。', 'iro to ii dezain to ii, watashi no konomi ni pittari da.', 'Tanto a cor quanto o design são exatamente do meu gosto.', ''],
    ['s6', '態度といい言葉遣いといい、失礼極まりない。', 'taido to ii kotobazukai to ii, shitsurei kiwamarinai.', 'Tanto a atitude quanto o jeito de falar são extremamente rudes.', '極まりない = extremamente.']
  ], [
    ['大人であれ子供であれ、命の重さは変わらない。', 'otona de are kodomo de are, inochi no omosa wa kawaranai.', 'Seja adulto ou criança, o valor de uma vida é o mesmo.']
  ], [
    X.f('Seja dia útil ou feriado, está sempre cheio.', '平日＿休日＿、いつも混んでいる。', ['であれ / であれ|de are / de are', 'といい / といい|to ii / to ii', 'たりとも / たりとも|taritomo / taritomo'], 'AであれBであれ.'),
    X.f('Tanto o preço quanto a qualidade, é perfeito.', '値段＿品質＿、完璧だ。', ['といい / といい|to ii / to ii', 'であれ / であれ|de are / de are', 'ならでは / ならでは|nara de wa / nara de wa'], 'Avaliação = といい〜といい.'),
    X.s('O que significa 理由はどうであれ?', ['seja qual for o motivo', 'por que motivo?', 'o motivo é bom'], 'であれ = seja.'),
    X.s('といい〜といい termina com:', ['uma avaliação geral', 'uma pergunta', 'um pedido'], 'Avaliação.')
  ]),
  L('c31l16', 'Arrependimento e limite: ものを, ばそれまでだ', '悔', 'grammar', [
    'ものを = e no entanto, se ao menos (arrependimento ou censura por algo que não foi feito): 言ってくれれば手伝ったものを.',
    'ばそれまでだ = se ~, acabou (é o fim, não há o que fazer): いくら準備しても、当日病気になればそれまでだ.',
    'Ambos mostram um olhar resignado ou crítico sobre o resultado.'
  ], 'ものを soa literário e um pouco antigo. Em conversa, o equivalente é のに.', [
    ['s1', '一言相談してくれれば、手伝ったものを。', 'hitokoto soudan shite kurereba, tetsudatta mono o.', 'Se ao menos tivesse me consultado, eu teria ajudado.', ''],
    ['s2', '早く病院に行けば治ったものを、我慢しすぎた。', 'hayaku byouin ni ikeba naotta mono o, gaman shisugita.', 'Se tivesse ido ao hospital cedo teria se curado, mas aguentou demais.', ''],
    ['s3', '素直に謝ればいいものを、彼は言い訳ばかりする。', 'sunao ni ayamareba ii mono o, kare wa iiwake bakari suru.', 'Bastava pedir desculpas, mas ele só dá desculpas.', 'Censura.'],
    ['s4', 'どんなにいい計画でも、実行しなければそれまでだ。', 'donna ni ii keikaku demo, jikkou shinakereba sore made da.', 'Por melhor que seja o plano, se não for executado, não adianta nada.', ''],
    ['s5', '高いカメラを買っても、使わなければそれまでだ。', 'takai kamera o katte mo, tsukawanakereba sore made da.', 'Mesmo comprando uma câmera cara, se não usar, de nada vale.', ''],
    ['s6', '失敗したらそれまでだと思って、全力でやった。', 'shippai shitara sore made da to omotte, zenryoku de yatta.', 'Pensei “se falhar, acabou” e dei tudo de mim.', '']
  ], [
    ['もっと早く気づいていれば、こんなことにはならなかったものを。', 'motto hayaku kizuite ireba, konna koto ni wa naranakatta mono o.', 'Se eu tivesse percebido antes, não teria chegado a isso.']
  ], [
    X.f('Se tivesse me chamado, eu teria ido.', '呼んでくれれば行った＿。', ['ものを|mono o', 'それまでだ|sore made da', 'きらいがある|kirai ga aru'], 'Arrependimento = ものを.'),
    X.s('O que significa 使わなければそれまでだ?', ['se não usar, não adianta nada', 'use até acabar', 'use até então'], 'ばそれまでだ = acabou.'),
    X.s('Em conversa casual, ものを equivale a:', ['のに|noni', 'から|kara', 'ので|node'], 'ものを é literário.'),
    X.s('Estas formas transmitem:', ['resignação ou crítica', 'alegria', 'convite'], 'Olhar sobre o resultado.')
  ])
  );
})();
