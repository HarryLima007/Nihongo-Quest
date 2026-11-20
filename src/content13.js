/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N3): Gramática N3 (c18)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c18', emblem: '構', title: 'Gramática N3', jp: 'ぶんぽう', stage: 'int', jlpt: 'N3',
    desc: 'Certeza e dedução, obrigação, momentos de uma ação, causa e consequência, contraste, grau e expressões compostas com partículas.',
    requires: 'c16', reqWhy: 'A gramática N3 se apoia nas formas simples, nas condicionais e nas orações da gramática N4.'
  });
  c.lessons.push(
  L('c18l1', 'Dedução: はずだ e はずがない', '筈', 'grammar', [
    'はずだ = deve ser, era para ser. É uma dedução lógica, baseada em algo que você sabe: 彼は日本に十年住んでいたから、日本語が上手なはずだ.',
    'はずがない (ou わけがない) = não tem como ser, é impossível: あの人が嘘をつくはずがない.',
    'はずだった = era para ter sido (mas não foi): 電車は九時に着くはずだったのに、遅れた.'
  ], 'はずだ é dedução com base em fatos; でしょう é palpite. Antes de はず, substantivo leva の (学生のはず) e adjetivo な leva な (元気なはず).', [
    ['s1', '会議は三時に終わるはずです。', 'kaigi wa sanji ni owaru hazu desu.', 'A reunião deve terminar às três.', 'Baseado na programação.'],
    ['s2', '鍵はかばんの中にあるはずなんだけど。', 'kagi wa kaban no naka ni aru hazu nan da kedo.', 'A chave deveria estar dentro da bolsa, mas…', ''],
    ['s3', '彼は医者だから、詳しいはずだ。', 'kare wa isha da kara, kuwashii hazu da.', 'Ele é médico, então deve entender do assunto.', ''],
    ['s4', 'そんなはずがない。', 'sonna hazu ga nai.', 'Não pode ser! Impossível.', 'Reação de surpresa.'],
    ['s5', '彼女が知らないはずはない。', 'kanojo ga shiranai hazu wa nai.', 'Não tem como ela não saber.', 'Dupla negação = certeza.'],
    ['s6', '荷物は昨日届くはずだったのに、まだ来ない。', 'nimotsu wa kinou todoku hazu datta noni, mada konai.', 'A encomenda era para ter chegado ontem, mas ainda não veio.', 'はずだった + のに = frustração.']
  ], [
    ['この時間なら、店はまだ開いているはずです。', 'kono jikan nara, mise wa mada aite iru hazu desu.', 'A esta hora, a loja ainda deve estar aberta.']
  ], [
    X.s('“Ele estudou muito, então deve passar.” Qual forma?', ['合格するはずだ|goukaku suru hazu da', '合格するべきだ|goukaku suru beki da', '合格するつもりだ|goukaku suru tsumori da'], 'Dedução lógica = はずだ.'),
    X.f('Ele deve ser estudante.', '彼は学生＿はずだ。', ['の|no', 'な|na', 'だ|da'], 'Substantivo + の + はず.'),
    X.s('O que significa そんなはずがない?', ['Não pode ser!', 'Deve ser isso.', 'Talvez seja.'], 'はずがない = impossível.'),
    X.o('Era para o trem ter chegado às nove.', ['電車は|densha wa', '九時に|kuji ni', '着くはずだった|tsuku hazu datta'], ['着いたはず|tsuita hazu'], 'はずだった = era para ter sido.')
  ]),
  L('c18l2', 'わけ: わけだ, わけではない, わけがない', '訳', 'grammar', [
    'わけだ = então é por isso, faz sentido: 三年住んでいたのか。日本語が上手なわけだ. Você chega a uma conclusão a partir de uma informação.',
    'わけではない = não é que, não significa que. Nega parcialmente: 嫌いなわけではない (não é que eu odeie).',
    'わけがない = de jeito nenhum, impossível (parecido com はずがない, mas mais enfático). わけにはいかない = não posso me dar ao luxo de (por obrigação moral): 休むわけにはいかない.'
  ], 'わけではない é ótimo para suavizar uma recusa: 行きたくないわけじゃないけど… (não é que eu não queira ir, mas…).', [
    ['s1', '道理で静かなわけだ。みんな出かけている。', 'douri de shizuka na wake da. minna dekakete iru.', 'Por isso está tão quieto. Todo mundo saiu.', '道理で = não é à toa.'],
    ['s2', '肉が嫌いなわけではありません。', 'niku ga kirai na wake de wa arimasen.', 'Não é que eu não goste de carne.', 'Negação parcial.'],
    ['s3', 'お金持ちがみんな幸せなわけじゃない。', 'okanemochi ga minna shiawase na wake ja nai.', 'Nem todo rico é feliz.', ''],
    ['s4', 'こんな難しい問題、わかるわけがない。', 'konna muzukashii mondai, wakaru wake ga nai.', 'Um problema difícil assim, não tem como eu entender.', ''],
    ['s5', '明日は試験だから、遊ぶわけにはいかない。', 'ashita wa shiken da kara, asobu wake ni wa ikanai.', 'Amanhã tem prova, então não posso ficar me divertindo.', 'Obrigação moral.'],
    ['s6', 'つまり、来られないというわけですね。', 'tsumari, korarenai to iu wake desu ne.', 'Ou seja, você não pode vir, é isso?', 'Resumo/conclusão.']
  ], [
    ['毎日練習しているから、上手になったわけだ。', 'mainichi renshuu shite iru kara, jouzu ni natta wake da.', 'Pratica todos os dias, por isso ficou bom.']
  ], [
    X.s('Você não odeia o trabalho, só está cansado. Como dizer “não é que eu odeie”?', ['嫌いなわけではない|kirai na wake de wa nai', '嫌いなわけだ|kirai na wake da', '嫌いなはずだ|kirai na hazu da'], 'わけではない = negação parcial.'),
    X.s('“O chefe está esperando, não posso ir embora.”', ['帰るわけにはいかない|kaeru wake ni wa ikanai', '帰るわけがない|kaeru wake ga nai', '帰るわけだ|kaeru wake da'], 'わけにはいかない = não posso (por obrigação).'),
    X.s('Alguém diz que morou 10 anos no Japão. Você responde: “Por isso fala tão bem!”', ['上手なわけだ|jouzu na wake da', '上手なわけがない|jouzu na wake ga nai', '上手なわけではない|jouzu na wake de wa nai'], 'わけだ = faz sentido.'),
    X.e('“Não tem como ele saber.”', ['彼が|kare ga', '知るわけ|shiru wake', 'ではない|de wa nai'], 2, '“Não tem como” = わけがない. わけではない = não é que.')
  ]),
  L('c18l3', 'Dever: べきだ e べきではない', '義', 'grammar', [
    'べきだ = deveria, é o certo a fazer. Expressa opinião forte sobre o que é correto: 約束は守るべきだ.',
    'べきではない = não deveria: 人の悪口を言うべきではない. する pode virar すべき ou するべき.',
    'Diferente de なければならない (obrigação por regra), べき é julgamento moral. Para conselho suave, prefira ほうがいい: べきだ dito a alguém pode soar como sermão.'
  ], 'べきだった = deveria ter feito (arrependimento): もっと早く言うべきだった.', [
    ['s1', '約束は守るべきだ。', 'yakusoku wa mamoru beki da.', 'Promessas devem ser cumpridas.', ''],
    ['s2', '学生はもっと本を読むべきだと思う。', 'gakusei wa motto hon o yomu beki da to omou.', 'Acho que os estudantes deveriam ler mais livros.', ''],
    ['s3', 'そんなことを言うべきではなかった。', 'sonna koto o iu beki de wa nakatta.', 'Eu não devia ter dito aquilo.', 'Arrependimento.'],
    ['s4', '困ったときは、すぐ相談すべきです。', 'komatta toki wa, sugu soudan subeki desu.', 'Quando estiver em apuros, deve pedir conselho logo.', 'すべき = するべき.'],
    ['s5', 'あの時、彼に謝るべきだった。', 'ano toki, kare ni ayamaru beki datta.', 'Naquela hora eu devia ter pedido desculpas a ele.', ''],
    ['s6', '若いうちに、いろいろな経験をするべきだ。', 'wakai uchi ni, iroiro na keiken o suru beki da.', 'Enquanto se é jovem, deve-se viver várias experiências.', '']
  ], [
    ['子供の前でタバコを吸うべきではない。', 'kodomo no mae de tabako o suu beki de wa nai.', 'Não se deve fumar na frente de crianças.']
  ], [
    X.s('Para dar um conselho educado a um colega, o que é mais natural?', ['ほうがいいですよ|hou ga ii desu yo', 'べきです|beki desu', 'なければならない|nakereba naranai'], 'べき dito diretamente soa como sermão.'),
    X.f('Eu devia ter estudado mais.', 'もっと勉強する＿。', ['べきだった|beki datta', 'べきだ|beki da', 'はずだ|hazu da'], 'べきだった = arrependimento.'),
    X.s('Qual é a forma curta de するべき?', ['すべき|subeki', 'しべき|shibeki', 'さべき|sabeki'], 'する + べき pode ser するべき ou すべき.'),
    X.o('Não se deve falar mal dos outros.', ['人の悪口を|hito no warukuchi o', '言う|iu', 'べきではない|beki de wa nai'], ['べきだ|beki da'], 'べきではない = não se deve.')
  ]),
  L('c18l4', 'Momentos da ação: ところ', '所', 'grammar', [
    'ところ, depois de um verbo, marca em que ponto a ação está. Dicionário + ところ = prestes a: 今から出かけるところです.',
    'ている + ところ = bem no meio da ação: 今ご飯を食べているところ.',
    'た + ところ = acabou de fazer (agora mesmo): 今帰ってきたところです. ところに / ところへ = justo na hora em que.'
  ], 'Muito útil ao telefone: 今、ちょうど電話しようと思っていたところです (eu estava justamente pensando em te ligar).', [
    ['s1', '今から家を出るところです。', 'ima kara ie o deru tokoro desu.', 'Estou prestes a sair de casa.', 'Antes da ação.'],
    ['s2', '今、レポートを書いているところです。', 'ima, repooto o kaite iru tokoro desu.', 'Estou bem no meio do relatório.', 'Durante a ação.'],
    ['s3', 'たった今、駅に着いたところです。', 'tatta ima, eki ni tsuita tokoro desu.', 'Acabei de chegar à estação.', 'Logo depois.'],
    ['s4', '寝ようとしたところに、電話がかかってきた。', 'neyou to shita tokoro ni, denwa ga kakatte kita.', 'Justo quando ia dormir, o telefone tocou.', 'ところに = bem na hora.'],
    ['s5', 'ちょうど電話しようと思っていたところです。', 'choudo denwa shiyou to omotte ita tokoro desu.', 'Eu estava justamente pensando em te ligar.', ''],
    ['s6', 'もう少しで事故に遭うところだった。', 'mou sukoshi de jiko ni au tokoro datta.', 'Por pouco não sofri um acidente.', 'ところだった = quase aconteceu.']
  ], [
    ['「もしもし、今どこ？」「今、電車に乗るところ。」', '"moshimoshi, ima doko?" "ima, densha ni noru tokoro."', '“Alô, onde você está?” “Prestes a entrar no trem.”']
  ], [
    X.s('Você ACABOU de chegar em casa. Qual frase?', ['帰ったところです|kaetta tokoro desu', '帰るところです|kaeru tokoro desu', '帰っているところです|kaette iru tokoro desu'], 'た + ところ = acabou de.'),
    X.s('Você está no meio do banho quando alguém liga. Qual frase?', ['お風呂に入っているところ|ofuro ni haitte iru tokoro', 'お風呂に入るところ|ofuro ni hairu tokoro', 'お風呂に入ったところ|ofuro ni haitta tokoro'], 'ている + ところ = no meio.'),
    X.s('O que significa 遅れるところだった?', ['Quase me atrasei', 'Estou me atrasando', 'Acabei de me atrasar'], 'ところだった = por pouco.'),
    X.f('Estou prestes a comer agora.', '今から食べる＿です。', ['ところ|tokoro', 'ばかり|bakari', 'はず|hazu'], 'Dicionário + ところ = prestes a.')
  ]),
  L('c18l5', 'ばかり: acabou de, só faz', '只', 'grammar', [
    'たばかり = acabou de (há pouco tempo, do ponto de vista de quem fala): 先月日本に来たばかりです. Pode ser há dias ou meses, diferente de たところ (agora mesmo).',
    'てばかりいる = só fica fazendo (crítica): ゲームをしてばかりいる.',
    'Substantivo + ばかり = só, nada além de: 肉ばかり食べる. Tem tom de excesso ou reclamação.'
  ], 'たところ = acabou de, agora mesmo. たばかり = é recente para mim, e pode ter sido semana passada. 買ったばかりのスマホ = um celular que acabei de comprar.', [
    ['s1', '日本に来たばかりで、まだ何もわかりません。', 'nihon ni kita bakari de, mada nani mo wakarimasen.', 'Acabei de chegar ao Japão e ainda não entendo nada.', ''],
    ['s2', '買ったばかりのスマホを落とした。', 'katta bakari no sumaho o otoshita.', 'Deixei cair o celular que acabei de comprar.', ''],
    ['s3', '弟はゲームをしてばかりいる。', 'otouto wa geemu o shite bakari iru.', 'Meu irmão só fica jogando videogame.', 'Crítica.'],
    ['s4', '彼女は甘い物ばかり食べている。', 'kanojo wa amai mono bakari tabete iru.', 'Ela só come doces.', ''],
    ['s5', '泣いてばかりいないで、話してごらん。', 'naite bakari inaide, hanashite goran.', 'Pare de só chorar e me conte.', ''],
    ['s6', 'さっき食べたばかりなのに、もうお腹が空いた。', 'sakki tabeta bakari na noni, mou onaka ga suita.', 'Acabei de comer e já estou com fome.', '']
  ], [
    ['この会社に入ったばかりなので、わからないことばかりです。', 'kono kaisha ni haitta bakari na node, wakaranai koto bakari desu.', 'Acabei de entrar nesta empresa, então tudo é novidade para mim.']
  ], [
    X.s('Você entrou no emprego há duas semanas. Qual frase?', ['入ったばかりです|haitta bakari desu', '入るところです|hairu tokoro desu', '入っているところです|haitte iru tokoro desu'], 'たばかり = recente, do seu ponto de vista.'),
    X.s('Reclamando que o filho só assiste TV:', ['テレビを見てばかりいる|terebi o mite bakari iru', 'テレビを見たばかりだ|terebi o mita bakari da', 'テレビを見るところだ|terebi o miru tokoro da'], 'てばかりいる = só fica fazendo.'),
    X.f('Só chove todo dia.', '毎日雨＿だ。', ['ばかり|bakari', 'ところ|tokoro', 'はず|hazu'], 'Substantivo + ばかり = só.'),
    X.e('“A mala que acabei de comprar.”', ['買う|kau', 'ばかりの|bakari no', 'かばん|kaban'], 0, 'Acabou de = forma た: 買ったばかりの.')
  ]),
  L('c18l6', 'Enquanto ainda: うちに', '内', 'grammar', [
    'うちに = enquanto (aproveitando que ainda é assim). Depois de um estado que vai mudar: 若いうちに旅行したい. 温かいうちに食べてください.',
    'ないうちに = antes que aconteça (algo indesejado): 雨が降らないうちに帰ろう.',
    'Com ている, うちに mostra algo que mudou sem você perceber: 話しているうちに、仲良くなった.'
  ], 'Compare: 前に = antes de (fato neutro). うちに = aproveitar a janela de tempo antes que mude.', [
    ['s1', '温かいうちに召し上がってください。', 'atatakai uchi ni meshiagatte kudasai.', 'Coma enquanto está quente, por favor.', 'Frase clássica ao servir comida.'],
    ['s2', '若いうちに、いろいろな国に行きたい。', 'wakai uchi ni, iroiro na kuni ni ikitai.', 'Quero conhecer vários países enquanto sou jovem.', ''],
    ['s3', '暗くならないうちに、帰りましょう。', 'kuraku naranai uchi ni, kaerimashou.', 'Vamos voltar antes que escureça.', 'ないうちに.'],
    ['s4', '忘れないうちに、メモしておこう。', 'wasurenai uchi ni, memo shite okou.', 'Vou anotar antes que eu esqueça.', ''],
    ['s5', '何度も聞いているうちに、覚えてしまった。', 'nando mo kiite iru uchi ni, oboete shimatta.', 'De tanto ouvir, acabei decorando.', 'Mudança gradual.'],
    ['s6', '日本にいるうちに、富士山に登りたい。', 'nihon ni iru uchi ni, fujisan ni noboritai.', 'Enquanto estou no Japão, quero subir o Monte Fuji.', '']
  ], [
    ['子供が寝ているうちに、掃除をしてしまおう。', 'kodomo ga nete iru uchi ni, souji o shite shimaou.', 'Vou fazer a faxina enquanto as crianças dormem.']
  ], [
    X.s('Ao servir comida, o anfitrião diz:', ['温かいうちにどうぞ|atatakai uchi ni douzo', '温かい前にどうぞ|atatakai mae ni douzo', '温かいところにどうぞ|atatakai tokoro ni douzo'], 'うちに = aproveite enquanto está quente.'),
    X.f('Vamos voltar antes que chova.', '雨が降ら＿うちに帰ろう。', ['ない|nai', 'た|ta', 'る|ru'], 'ないうちに = antes que aconteça.'),
    X.s('O que significa 読んでいるうちに眠くなった?', ['Fui ficando com sono enquanto lia', 'Li antes de dormir', 'Dormi e depois li'], 'ているうちに = mudança gradual.'),
    X.o('Quero viajar enquanto sou jovem.', ['若い|wakai', 'うちに|uchi ni', '旅行したい|ryokou shitai'], ['前に|mae ni'], 'うちに = enquanto ainda.')
  ]),
  L('c18l7', 'Tornar-se hábito: ようにする, ようにしている', '努', 'grammar', [
    'ようにする = procurar fazer, fazer questão de: 毎日野菜を食べるようにする. Mostra esforço consciente.',
    'ようにしている = tenho o hábito de, procuro sempre: 夜は早く寝るようにしています.',
    'Na negativa: ないようにする = procurar não fazer: 遅刻しないようにしてください (procure não se atrasar).'
  ], 'Não confunda: ようになる = passar a (mudança que acontece, c16). ようにする = esforço para fazer.', [
    ['s1', '毎朝、三十分歩くようにしています。', 'maiasa, sanjuppun aruku you ni shite imasu.', 'Procuro caminhar trinta minutos toda manhã.', 'Hábito.'],
    ['s2', 'これからは早く寝るようにします。', 'korekara wa hayaku neru you ni shimasu.', 'De agora em diante vou procurar dormir cedo.', 'Decisão de esforço.'],
    ['s3', '甘い物は食べないようにしている。', 'amai mono wa tabenai you ni shite iru.', 'Procuro não comer doces.', ''],
    ['s4', '明日は遅れないようにしてください。', 'ashita wa okurenai you ni shite kudasai.', 'Amanhã procure não se atrasar.', 'Pedido educado e firme.'],
    ['s5', 'できるだけ日本語で話すようにしています。', 'dekiru dake nihongo de hanasu you ni shite imasu.', 'Procuro falar em japonês o máximo possível.', ''],
    ['s6', '忘れ物をしないように、前の晩に準備する。', 'wasuremono o shinai you ni, mae no ban ni junbi suru.', 'Para não esquecer nada, preparo tudo na noite anterior.', 'ように = para que (c16).']
  ], [
    ['健康のために、エレベーターではなく階段を使うようにしている。', 'kenkou no tame ni, erebeetaa de wa naku kaidan o tsukau you ni shite iru.', 'Pela saúde, procuro usar a escada e não o elevador.']
  ], [
    X.s('Você tem o hábito de ler antes de dormir. Qual frase?', ['寝る前に本を読むようにしています|neru mae ni hon o yomu you ni shite imasu', '寝る前に本を読むようになりました|neru mae ni hon o yomu you ni narimashita', '寝る前に本を読むはずです|neru mae ni hon o yomu hazu desu'], 'ようにしている = hábito com esforço.'),
    X.s('Qual mostra uma MUDANÇA que aconteceu, e não esforço?', ['泳げるようになった|oyogeru you ni natta', '泳ぐようにしている|oyogu you ni shite iru', '泳ぐようにする|oyogu you ni suru'], 'ようになる = mudança.'),
    X.f('Procure não esquecer.', '忘れない＿してください。', ['ように|you ni', 'ために|tame ni', 'うちに|uchi ni'], 'ないようにする = procurar não.'),
    X.e('“Procuro não beber álcool.”', ['お酒を|osake o', '飲まないように|nomanai you ni', 'なっています|natte imasu'], 2, 'Esforço = ようにしている.')
  ]),
  L('c18l8', 'Decisões e regras: ことになる, ことになっている', '決', 'grammar', [
    'ことにする (visto na N4) = eu decido. ことになる = ficou decidido (por outros ou pelas circunstâncias): 来月、大阪に転勤することになりました.',
    'Usar ことになる para a própria decisão soa modesto e é muito comum em anúncios: 結婚することになりました (vamos nos casar).',
    'ことになっている = é a regra, está combinado: この部屋では靴を脱ぐことになっています.'
  ], 'Em notícias pessoais, ことになりました é o padrão educado: tira o foco do “eu decidi”.', [
    ['s1', '来月から東京で働くことになりました。', 'raigetsu kara toukyou de hataraku koto ni narimashita.', 'Ficou decidido que vou trabalhar em Tóquio a partir do mês que vem.', ''],
    ['s2', 'このたび、結婚することになりました。', 'konotabi, kekkon suru koto ni narimashita.', 'Comunico que vamos nos casar.', 'Anúncio educado.'],
    ['s3', '会議は金曜日に行うことになった。', 'kaigi wa kin\'youbi ni okonau koto ni natta.', 'Ficou decidido que a reunião será na sexta.', ''],
    ['s4', 'ここではタバコを吸ってはいけないことになっています。', 'koko de wa tabako o sutte wa ikenai koto ni natte imasu.', 'Aqui a regra é que não se pode fumar.', 'Regra.'],
    ['s5', '日本では、家の中で靴を脱ぐことになっている。', 'nihon de wa, ie no naka de kutsu o nugu koto ni natte iru.', 'No Japão, o costume é tirar os sapatos dentro de casa.', ''],
    ['s6', '今年から毎日運動することにした。', 'kotoshi kara mainichi undou suru koto ni shita.', 'Decidi me exercitar todos os dias a partir deste ano.', 'ことにした = eu decidi.']
  ], [
    ['父の仕事の都合で、ブラジルに帰ることになった。', 'chichi no shigoto no tsugou de, burajiru ni kaeru koto ni natta.', 'Por causa do trabalho do meu pai, vamos voltar ao Brasil.']
  ], [
    X.s('A empresa decidiu te transferir. Qual frase?', ['転勤することになりました|tenkin suru koto ni narimashita', '転勤することにしました|tenkin suru koto ni shimashita', '転勤するようにしました|tenkin suru you ni shimashita'], 'ことになる = decidido pelas circunstâncias.'),
    X.s('Como dizer “a regra é entregar até sexta”?', ['金曜日までに出すことになっています|kin\'youbi made ni dasu koto ni natte imasu', '金曜日までに出すことにしています|kin\'youbi made ni dasu koto ni shite imasu', '金曜日までに出すはずがありません|kin\'youbi made ni dasu hazu ga arimasen'], 'ことになっている = regra.'),
    X.f('Eu decidi parar de fumar.', 'タバコをやめる＿。', ['ことにした|koto ni shita', 'ことになった|koto ni natta', 'ようになった|you ni natta'], 'Decisão própria = ことにした.'),
    X.o('Ficou decidido que vou morar no Japão.', ['日本に|nihon ni', '住むことに|sumu koto ni', 'なりました|narimashita'], ['しました|shimashita'], 'ことになる = foi decidido.')
  ]),
  L('c18l9', 'Querer que alguém faça: てほしい', '望', 'grammar', [
    'てほしい = quero que (alguém) faça: 母に元気でいてほしい. A pessoa que faz a ação leva に.',
    'ないでほしい = não quero que faça: 誰にも言わないでほしい.',
    'てもらいたい é sinônimo, mais polido. Para pedir algo a alguém diretamente, てほしい soa forte: no trabalho, prefira ていただけませんか.'
  ], 'たい é sobre a SUA ação (食べたい); てほしい é sobre a ação de OUTRA pessoa (食べてほしい).', [
    ['s1', 'もっとゆっくり話してほしい。', 'motto yukkuri hanashite hoshii.', 'Queria que você falasse mais devagar.', ''],
    ['s2', 'このことは誰にも言わないでほしい。', 'kono koto wa dare ni mo iwanaide hoshii.', 'Não quero que você conte isso a ninguém.', 'ないでほしい.'],
    ['s3', '子供たちには幸せになってほしい。', 'kodomotachi ni wa shiawase ni natte hoshii.', 'Quero que meus filhos sejam felizes.', ''],
    ['s4', '早く春が来てほしいな。', 'hayaku haru ga kite hoshii na.', 'Queria que a primavera chegasse logo.', 'Também para coisas.'],
    ['s5', '部長にこの資料を見てもらいたいのですが。', 'buchou ni kono shiryou o mite moraitai no desu ga.', 'Gostaria que o diretor visse este material.', 'Mais polido.'],
    ['s6', '彼にはもっと自分を大切にしてほしい。', 'kare ni wa motto jibun o taisetsu ni shite hoshii.', 'Queria que ele se cuidasse mais.', '']
  ], [
    ['ちょっと手伝ってほしいんだけど、今いい？', 'chotto tetsudatte hoshii n da kedo, ima ii?', 'Queria que você me ajudasse um pouco. Pode agora?']
  ], [
    X.s('Você quer que seu amigo venha à festa:', ['パーティーに来てほしい|paatii ni kite hoshii', 'パーティーに来たい|paatii ni kitai', 'パーティーに来るほしい|paatii ni kuru hoshii'], 'て + ほしい = quero que você.'),
    X.f('Não quero que você vá embora.', '帰ら＿ほしい。', ['ないで|naide', 'なくて|nakute', 'ない|nai'], 'ないでほしい.'),
    X.s('Qual partícula marca quem deve fazer a ação? 田中さん＿来てほしい', ['に|ni', 'を|o', 'で|de'], 'A pessoa que faz leva に.'),
    X.s('Para pedir algo ao seu chefe, qual é melhor?', ['見ていただけませんか|mite itadakemasen ka', '見てほしい|mite hoshii', '見たい|mitai'], 'てほしい direto ao chefe soa forte.')
  ]),
  L('c18l10', 'Partículas compostas I: について, にとって, によって', '関', 'grammar', [
    'について = sobre, a respeito de: 日本の文化について話す.',
    'にとって = para (do ponto de vista de alguém): 私にとって、家族が一番大切です. Usa-se com avaliações (importante, difícil), não com ações.',
    'によって tem vários usos: causa (台風によって), agente da passiva formal (この本は夏目漱石によって書かれた), “depende de” (人によって違う) e meio (話し合いによって決める).'
  ], 'によると = segundo (fonte de informação): 天気予報によると、明日は雨だそうだ. Combina com そうだ / らしい.', [
    ['s1', '日本の歴史について調べています。', 'nihon no rekishi ni tsuite shirabete imasu.', 'Estou pesquisando sobre a história do Japão.', ''],
    ['s2', '私にとって、この仕事はとても大切です。', 'watashi ni totte, kono shigoto wa totemo taisetsu desu.', 'Para mim, este trabalho é muito importante.', 'Ponto de vista.'],
    ['s3', '考え方は人によって違う。', 'kangaekata wa hito ni yotte chigau.', 'O modo de pensar varia de pessoa para pessoa.', 'Depende de.'],
    ['s4', '地震によって、多くの建物が壊れた。', 'jishin ni yotte, ooku no tatemono ga kowareta.', 'Por causa do terremoto, muitos prédios desabaram.', 'Causa.'],
    ['s5', 'ニュースによると、電車が止まっているらしい。', 'nyuusu ni yoru to, densha ga tomatte iru rashii.', 'Segundo o noticiário, parece que os trens pararam.', 'Fonte.'],
    ['s6', 'この絵はピカソによって描かれました。', 'kono e wa pikaso ni yotte egakaremashita.', 'Este quadro foi pintado por Picasso.', 'Agente da passiva (formal).']
  ], [
    ['外国人にとって、敬語は難しいと言われている。', 'gaikokujin ni totte, keigo wa muzukashii to iwarete iru.', 'Diz-se que, para estrangeiros, o keigo é difícil.']
  ], [
    X.s('“Para mim, isso é difícil.” Qual partícula?', ['にとって|ni totte', 'について|ni tsuite', 'によって|ni yotte'], 'Ponto de vista = にとって.'),
    X.f('O preço varia conforme a loja.', '値段は店＿違います。', ['によって|ni yotte', 'にとって|ni totte', 'について|ni tsuite'], 'Depende de = によって.'),
    X.f('Segundo a previsão, vai nevar.', '天気予報＿、雪が降るそうです。', ['によると|ni yoru to', 'にとって|ni totte', 'について|ni tsuite'], 'Fonte = によると.'),
    X.e('“Vamos conversar sobre o plano.”', ['計画に|keikaku ni', 'とって|totte', '話しましょう|hanashimashou'], 1, 'Sobre = について.')
  ]),
  L('c18l11', 'Partículas compostas II: として, に対して, に関して', '対', 'grammar', [
    'として = como, na qualidade de: 通訳として働く. 趣味として絵を描く.',
    'に対して = em relação a, para com (direção de uma atitude): 客に対して失礼だ. Também contraste: 兄が背が高いのに対して、弟は低い.',
    'に関して = sobre, relativo a (mais formal que について): この件に関して質問があります.'
  ], 'として sempre fala do papel ou da categoria. 留学生として来日した = vim ao Japão como intercambista.', [
    ['s1', '彼女は通訳として会社で働いている。', 'kanojo wa tsuuyaku to shite kaisha de hataraite iru.', 'Ela trabalha na empresa como intérprete.', 'Papel.'],
    ['s2', '趣味として、料理を習っています。', 'shumi to shite, ryouri o naratte imasu.', 'Estou aprendendo culinária como hobby.', ''],
    ['s3', 'お客様に対して、その言い方は失礼です。', 'okyakusama ni taishite, sono iikata wa shitsurei desu.', 'Esse jeito de falar é falta de educação com o cliente.', 'Atitude para com.'],
    ['s4', '姉は活発なのに対して、妹はおとなしい。', 'ane wa kappatsu na no ni taishite, imouto wa otonashii.', 'Enquanto a irmã mais velha é agitada, a mais nova é quieta.', 'Contraste.'],
    ['s5', 'この件に関して、何か質問はありますか。', 'kono ken ni kanshite, nanika shitsumon wa arimasu ka.', 'Alguma pergunta sobre este assunto?', 'Formal.'],
    ['s6', '彼は先生としては厳しいが、人としては優しい。', 'kare wa sensei to shite wa kibishii ga, hito to shite wa yasashii.', 'Como professor ele é rígido, mas como pessoa é gentil.', '']
  ], [
    ['ブラジル代表として、大会に参加しました。', 'burajiru daihyou to shite, taikai ni sanka shimashita.', 'Participei do campeonato como representante do Brasil.']
  ], [
    X.f('Vim ao Japão como intercambista.', '留学生＿日本に来ました。', ['として|to shite', 'に対して|ni taishite', 'によって|ni yotte'], 'Papel = として.'),
    X.s('“Ele é gentil com todos.” Qual partícula?', ['に対して|ni taishite', 'として|to shite', 'にとって|ni totte'], 'Atitude dirigida a alguém = に対して.'),
    X.s('Qual é a versão mais formal de について?', ['に関して|ni kanshite', 'にとって|ni totte', 'として|to shite'], 'に関して = formal.'),
    X.o('Trabalho como professor.', ['先生|sensei', 'として|to shite', '働いています|hataraite imasu'], ['にとって|ni totte'], 'として = como.')
  ]),
  L('c18l12', 'Quanto mais… mais: ば〜ほど', '程', 'grammar', [
    'Aば Aほど = quanto mais A, mais…: 練習すればするほど、上手になる. Repete-se o mesmo verbo ou adjetivo.',
    'Adjetivo い: 安ければ安いほどいい. Adjetivo な: 静かなら静かなほど / 静かであればあるほど.',
    'ほど sozinho também funciona: 考えるほどわからなくなる (quanto mais penso, menos entendo).'
  ], 'A primeira parte (ば) às vezes some na fala: 日本語は勉強するほど面白い.', [
    ['s1', '練習すればするほど、上手になります。', 'renshuu sureba suru hodo, jouzu ni narimasu.', 'Quanto mais você pratica, melhor fica.', ''],
    ['s2', '野菜は新しければ新しいほどおいしい。', 'yasai wa atarashikereba atarashii hodo oishii.', 'Quanto mais frescos os legumes, mais gostosos.', 'Adjetivo い.'],
    ['s3', '部屋は広ければ広いほどいい。', 'heya wa hirokereba hiroi hodo ii.', 'Quanto maior o quarto, melhor.', ''],
    ['s4', '考えれば考えるほど、わからなくなる。', 'kangaereba kangaeru hodo, wakaranaku naru.', 'Quanto mais penso, menos entendo.', ''],
    ['s5', '説明は簡単なら簡単なほどいい。', 'setsumei wa kantan nara kantan na hodo ii.', 'Quanto mais simples a explicação, melhor.', 'Adjetivo な.'],
    ['s6', '日本語は勉強するほど面白くなる。', 'nihongo wa benkyou suru hodo omoshiroku naru.', 'Quanto mais estudo japonês, mais interessante fica.', 'Sem ば.']
  ], [
    ['この本は読めば読むほど、新しい発見がある。', 'kono hon wa yomeba yomu hodo, atarashii hakken ga aru.', 'Quanto mais leio este livro, mais coisas novas descubro.']
  ], [
    X.f('Quanto mais barato, melhor.', '安ければ＿ほどいい。', ['安い|yasui', '安く|yasuku', '安くて|yasukute'], 'Repete o adjetivo na forma básica antes de ほど.'),
    X.o('Quanto mais estudo, mais entendo.', ['勉強すれば|benkyou sureba', 'するほど|suru hodo', 'わかる|wakaru'], ['したほど|shita hodo'], 'ば + dicionário + ほど.'),
    X.s('O que significa 見れば見るほど好きになる?', ['Quanto mais vejo, mais gosto', 'Gosto de ver muito', 'Vi e passei a gostar'], 'ば〜ほど = quanto mais… mais.'),
    X.e('“Quanto mais quieto, melhor.”', ['静かなら|shizuka nara', '静かほど|shizuka hodo', 'いい|ii'], 1, 'Adjetivo な leva な: 静かなほど.')
  ]),
  L('c18l13', 'Grau: くらい, ほど', '度', 'grammar', [
    'くらい (ぐらい) = cerca de (quantidade): 一時間ぐらい. Também grau, “a ponto de”: 泣きたいくらい痛い.',
    'ほど = a ponto de, também grau, um pouco mais formal: 死ぬほど疲れた. Na negativa, ほど compara: 今日は昨日ほど寒くない (hoje não está tão frio quanto ontem).',
    'くらい também minimiza: これくらい自分でできる (isso aqui eu faço sozinho). ほど não tem esse uso.'
  ], 'AはBほど〜ない = A não é tão ~ quanto B. É o jeito natural de dizer “não tão… quanto”.', [
    ['s1', '空港までバスで一時間ぐらいかかります。', 'kuukou made basu de ichijikan gurai kakarimasu.', 'Até o aeroporto leva uma hora de ônibus, mais ou menos.', 'Aproximação.'],
    ['s2', '今日は昨日ほど暑くない。', 'kyou wa kinou hodo atsuku nai.', 'Hoje não está tão quente quanto ontem.', 'Comparação negativa.'],
    ['s3', '泣きたいくらい恥ずかしかった。', 'nakitai kurai hazukashikatta.', 'Fiquei com tanta vergonha que dava vontade de chorar.', 'A ponto de.'],
    ['s4', '死ぬほどお腹が空いた。', 'shinu hodo onaka ga suita.', 'Estou morrendo de fome.', 'Exagero comum.'],
    ['s5', 'これくらいの漢字は読めますよ。', 'kore kurai no kanji wa yomemasu yo.', 'Kanji desse nível eu consigo ler.', 'Minimiza.'],
    ['s6', '彼ほど親切な人はいない。', 'kare hodo shinsetsu na hito wa inai.', 'Não existe ninguém tão gentil quanto ele.', 'Superlativo indireto.']
  ], [
    ['日本語は思ったほど難しくなかった。', 'nihongo wa omotta hodo muzukashiku nakatta.', 'O japonês não foi tão difícil quanto eu pensava.']
  ], [
    X.f('O Brasil não é tão pequeno quanto o Japão.', 'ブラジルは日本＿小さくない。', ['ほど|hodo', 'より|yori', 'まで|made'], 'AはBほど〜ない.'),
    X.s('“Isso aqui eu faço sozinho!” (minimizando)', ['これくらい自分でできる|kore kurai jibun de dekiru', 'これほど自分でできる|kore hodo jibun de dekiru', 'これまで自分でできる|kore made jibun de dekiru'], 'くらい minimiza; ほど não.'),
    X.s('O que significa 彼女ほど優しい人はいない?', ['Não há ninguém tão gentil quanto ela', 'Ela é um pouco gentil', 'Ela não é gentil'], 'Superlativo indireto.'),
    X.f('Uns trinta minutos.', '三十分＿', ['ぐらい|gurai', 'ずつ|zutsu', 'しか|shika'], 'ぐらい = cerca de. しか exigiria verbo negativo.')
  ]),
  L('c18l14', 'Graças a, por culpa de: おかげで, せいで', '因', 'grammar', [
    'おかげで = graças a (resultado bom): 先生のおかげで、合格できました.',
    'せいで = por culpa de (resultado ruim): 雨のせいで、試合が中止になった.',
    'Ironia: おかげで com resultado ruim soa sarcástico: 君のおかげで、遅刻したよ (graças a você, cheguei atrasado).'
  ], 'Antes de おかげ e せい: substantivo + の, adjetivo な + な, verbo e adjetivo い direto (薬を飲んだおかげで).', [
    ['s1', 'みなさんのおかげで、無事に終わりました。', 'minasan no okage de, buji ni owarimashita.', 'Graças a todos, terminou tudo bem.', 'Agradecimento.'],
    ['s2', '薬を飲んだおかげで、熱が下がった。', 'kusuri o nonda okage de, netsu ga sagatta.', 'Graças ao remédio, a febre baixou.', ''],
    ['s3', '寝坊したせいで、バスに乗り遅れた。', 'nebou shita sei de, basu ni noriokureta.', 'Por ter dormido demais, perdi o ônibus.', ''],
    ['s4', '雪のせいで、電車が止まった。', 'yuki no sei de, densha ga tomatta.', 'Por causa da neve, o trem parou.', ''],
    ['s5', '人のせいにしないでください。', 'hito no sei ni shinaide kudasai.', 'Não ponha a culpa nos outros.', 'せいにする = culpar.'],
    ['s6', 'おかげさまで、元気です。', 'okagesama de, genki desu.', 'Graças a Deus (a você), estou bem.', 'Resposta educada fixa.']
  ], [
    ['友達が教えてくれたおかげで、宿題が早く終わった。', 'tomodachi ga oshiete kureta okage de, shukudai ga hayaku owatta.', 'Graças à explicação do meu amigo, terminei a lição cedo.']
  ], [
    X.s('O médico te curou. Como agradecer?', ['先生のおかげで治りました|sensei no okage de naorimashita', '先生のせいで治りました|sensei no sei de naorimashita', '先生によって治りません|sensei ni yotte naorimasen'], 'Resultado bom = おかげで.'),
    X.f('Por causa do barulho, não consegui dormir.', 'うるさい＿、眠れなかった。', ['せいで|sei de', 'おかげで|okage de', 'ために|tame ni'], 'Resultado ruim = せいで.'),
    X.s('Alguém pergunta お元気ですか. Resposta educada:', ['おかげさまで、元気です|okagesama de, genki desu', 'せいで、元気です|sei de, genki desu', 'おかげで、元気ない|okage de, genki nai'], 'おかげさまで é fixo.'),
    X.e('“Não ponha a culpa em mim!”', ['私の|watashi no', 'おかげに|okage ni', 'しないで|shinaide'], 1, 'Culpar = せいにする.')
  ]),
  L('c18l15', 'Mesmo que: ても, たとえ〜ても, いくら〜ても', '仮', 'grammar', [
    'ても = mesmo que, ainda que: 雨が降っても行きます. Adjetivo い: 高くても; adjetivo な e substantivo: 静かでも, 子供でも.',
    'たとえ〜ても reforça a hipótese: たとえ失敗しても、後悔しない.',
    'いくら〜ても / どんなに〜ても = por mais que: いくら食べても太らない. 何度〜ても = por mais vezes que.'
  ], 'Com palavras interrogativas, ても vira “qualquer”: 誰が来ても (não importa quem venha), 何を食べても (coma o que comer).', [
    ['s1', '雨が降っても、試合は行われます。', 'ame ga futte mo, shiai wa okonawaremasu.', 'Mesmo que chova, o jogo será realizado.', ''],
    ['s2', 'たとえ反対されても、留学したい。', 'tatoe hantai sarete mo, ryuugaku shitai.', 'Mesmo que sejam contra, quero fazer intercâmbio.', 'Reforço.'],
    ['s3', 'いくら食べても太らない人がうらやましい。', 'ikura tabete mo futoranai hito ga urayamashii.', 'Invejo quem não engorda por mais que coma.', ''],
    ['s4', 'どんなに忙しくても、朝ご飯は食べます。', 'donna ni isogashikute mo, asagohan wa tabemasu.', 'Por mais ocupado que eu esteja, tomo café da manhã.', ''],
    ['s5', '何度説明しても、わかってもらえない。', 'nando setsumei shite mo, wakatte moraenai.', 'Por mais que eu explique, não me entendem.', ''],
    ['s6', '誰に聞いても、答えは同じだった。', 'dare ni kiite mo, kotae wa onaji datta.', 'Não importa a quem eu perguntasse, a resposta era a mesma.', 'Interrogativa + ても.']
  ], [
    ['たとえ世界中が反対しても、私は君の味方だ。', 'tatoe sekaijuu ga hantai shite mo, watashi wa kimi no mikata da.', 'Mesmo que o mundo inteiro seja contra, estou do seu lado.']
  ], [
    X.f('Mesmo sendo caro, vou comprar.', '高＿、買います。', ['くても|kute mo', 'いでも|i demo', 'ても|te mo'], 'Adjetivo い: く + ても.'),
    X.f('Mesmo sendo criança, entende.', '子供＿わかる。', ['でも|demo', 'ても|te mo', 'くても|kute mo'], 'Substantivo + でも.'),
    X.s('O que significa 何を着ても似合う?', ['Fica bem com qualquer roupa', 'Não sabe o que vestir', 'Vestiu algo bonito'], 'Interrogativa + ても = qualquer.'),
    X.o('Por mais que eu ligue, ele não atende.', ['いくら|ikura', '電話しても|denwa shite mo', '出ない|denai'], ['電話したら|denwa shitara'], 'いくら〜ても.')
  ]),
  L('c18l16', 'Tendências: っぽい, がち, 気味', '傾', 'grammar', [
    'っぽい = parece, tem jeito de (casual): 子供っぽい (infantil), 忘れっぽい (esquecido), 水っぽい (aguado).',
    'がち = costuma, tende a (algo negativo): 冬は風邪をひきがちだ. 病気がち = adoentado.',
    '気味 (ぎみ) = um pouco, meio (estado leve): 風邪気味 (meio resfriado), 疲れ気味 (meio cansado).'
  ], 'っぽい com verbo (raiz ます) indica tendência: 怒りっぽい = irritável, que se zanga fácil.', [
    ['s1', '彼は三十歳なのに、子供っぽい。', 'kare wa sanjussai na noni, kodomoppoi.', 'Ele tem trinta anos, mas é infantil.', ''],
    ['s2', '最近、忘れっぽくなった。', 'saikin, wasureppoku natta.', 'Ultimamente fiquei esquecido.', ''],
    ['s3', 'この服はちょっと安っぽいね。', 'kono fuku wa chotto yasuppoi ne.', 'Esta roupa parece meio barata, né.', 'Aparência.'],
    ['s4', '冬は運動不足になりがちです。', 'fuyu wa undou busoku ni nari gachi desu.', 'No inverno tendemos a ficar sedentários.', ''],
    ['s5', '今日はちょっと風邪気味なので、早く帰ります。', 'kyou wa chotto kaze gimi na node, hayaku kaerimasu.', 'Hoje estou meio resfriado, então vou embora cedo.', ''],
    ['s6', '父は怒りっぽい性格だ。', 'chichi wa okorippoi seikaku da.', 'Meu pai tem temperamento irritável.', '']
  ], [
    ['疲れ気味のときは、無理をしないでください。', 'tsukare gimi no toki wa, muri o shinaide kudasai.', 'Quando estiver meio cansado, não se force.']
  ], [
    X.s('Como dizer “estou meio resfriado”?', ['風邪気味です|kaze gimi desu', '風邪っぽいがちです|kazeppoi gachi desu', '風邪がちです|kaze gachi desu'], '気味 = estado leve.'),
    X.s('Uma pessoa que esquece tudo é:', ['忘れっぽい|wasureppoi', '忘れ気味|wasure gimi', '忘れるがち|wasureru gachi'], 'っぽい com raiz do verbo = tendência.'),
    X.f('Estudantes tendem a dormir tarde.', '学生は夜更かしし＿だ。', ['がち|gachi', 'っぽい|ppoi', 'ほど|hodo'], 'がち = tende a (negativo).'),
    X.e('“Ele é meio infantil.”', ['彼は|kare wa', '子供がち|kodomo gachi', 'だ|da'], 1, 'Jeito de = 子供っぽい.')
  ]),
  L('c18l17', 'Conselhos e sentimentos: ことだ, ことはない, ものだ', '物', 'grammar', [
    'ことだ = o melhor é, o que você deve fazer é (conselho firme): 上手になりたいなら、毎日練習することだ.',
    'ことはない = não precisa: 心配することはない (não precisa se preocupar). Tranquiliza.',
    'ものだ tem dois usos comuns: verdade geral (人は変わるものだ, as pessoas mudam) e lembrança nostálgica com たものだ: 子供の頃、よくこの川で泳いだものだ.'
  ], 'ものだ também expressa admiração: 時間が経つのは早いものだ (como o tempo passa rápido!).', [
    ['s1', '合格したければ、毎日勉強することだ。', 'goukaku shitakereba, mainichi benkyou suru koto da.', 'Se quer passar, o negócio é estudar todo dia.', 'Conselho.'],
    ['s2', 'そんなに心配することはないよ。', 'sonna ni shinpai suru koto wa nai yo.', 'Não precisa se preocupar tanto.', ''],
    ['s3', 'わざわざ来ることはなかったのに。', 'wazawaza kuru koto wa nakatta noni.', 'Não precisava ter se dado ao trabalho de vir.', ''],
    ['s4', '子供の頃は、よく外で遊んだものだ。', 'kodomo no koro wa, yoku soto de asonda mono da.', 'Quando criança, eu brincava muito na rua.', 'Nostalgia.'],
    ['s5', '人の気持ちは変わるものだ。', 'hito no kimochi wa kawaru mono da.', 'Os sentimentos das pessoas mudam.', 'Verdade geral.'],
    ['s6', '時間が経つのは本当に早いものですね。', 'jikan ga tatsu no wa hontou ni hayai mono desu ne.', 'Como o tempo passa rápido, né?', 'Admiração.']
  ], [
    ['失敗しても、落ち込むことはない。次がある。', 'shippai shite mo, ochikomu koto wa nai. tsugi ga aru.', 'Mesmo errando, não precisa desanimar. Haverá uma próxima.']
  ], [
    X.s('Para tranquilizar alguém: “Não precisa pedir desculpas.”', ['謝ることはない|ayamaru koto wa nai', '謝ることだ|ayamaru koto da', '謝ったものだ|ayamatta mono da'], 'ことはない = não precisa.'),
    X.s('Lembrança nostálgica: “Eu ia muito a este parque.”', ['よくこの公園に来たものだ|yoku kono kouen ni kita mono da', 'よくこの公園に来ることだ|yoku kono kouen ni kuru koto da', 'よくこの公園に来ることはない|yoku kono kouen ni kuru koto wa nai'], 'たものだ = nostalgia.'),
    X.f('Para emagrecer, o melhor é se exercitar.', 'やせたいなら、運動する＿。', ['ことだ|koto da', 'ものだ|mono da', 'ことはない|koto wa nai'], 'Conselho firme = ことだ.'),
    X.s('O que expressa 子供は早く大きくなるものだ?', ['Uma verdade geral', 'Uma ordem', 'Uma dúvida'], 'ものだ = é natural que.')
  ]),
  L('c18l18', 'Apesar de, para quem é: わりに, にしては, くせに', '割', 'grammar', [
    'わりに = considerando que, para (resultado diferente do esperado): この店は安いわりにおいしい.',
    'にしては = para um (alguém ou algo específico), surpreendentemente: 外国人にしては、日本語が上手だ. Mais específico que わりに.',
    'くせに = apesar de (com crítica e irritação): 知っているくせに、教えてくれない. É forte e pode ofender.'
  ], 'くせに é usada muito em brigas e mangás. Em situações formais, use のに.', [
    ['s1', 'この店は値段のわりに、量が多い。', 'kono mise wa nedan no wari ni, ryou ga ooi.', 'Para o preço, esta loja serve bastante.', ''],
    ['s2', '彼はよく食べるわりに、やせている。', 'kare wa yoku taberu wari ni, yasete iru.', 'Ele come bastante, mas é magro.', ''],
    ['s3', '初めてにしては、上手ですね。', 'hajimete ni shite wa, jouzu desu ne.', 'Para a primeira vez, está muito bom.', ''],
    ['s4', '十二月にしては、暖かい日だ。', 'juunigatsu ni shite wa, atatakai hi da.', 'Para dezembro, o dia está quente.', ''],
    ['s5', '知っているくせに、教えてくれない。', 'shitte iru kuse ni, oshiete kurenai.', 'Sabe, mas não me conta (que irritante).', 'Crítica.'],
    ['s6', '子供のくせに、生意気だ。', 'kodomo no kuse ni, namaiki da.', 'É só uma criança e é tão atrevido.', '']
  ], [
    ['この映画は有名なわりに、あまり面白くなかった。', 'kono eiga wa yuumei na wari ni, amari omoshiroku nakatta.', 'Para um filme tão famoso, não era muito interessante.']
  ], [
    X.s('Você fica irritado: “Ele não fez nada e reclama!”', ['何もしないくせに、文句を言う|nani mo shinai kuse ni, monku o iu', '何もしないわりに、文句を言う|nani mo shinai wari ni, monku o iu', '何もしないにしては、文句を言う|nani mo shinai ni shite wa, monku o iu'], 'Crítica irritada = くせに.'),
    X.f('Para um iniciante, você fala bem.', '初心者＿、上手ですね。', ['にしては|ni shite wa', 'くせに|kuse ni', 'ばかり|bakari'], 'にしては = para um (surpreendente).'),
    X.s('Qual é o mais adequado numa reunião?', ['のに|noni', 'くせに|kuse ni'], 'くせに é forte e pode ofender.'),
    X.f('Para a idade dele, parece jovem.', '年＿、若く見える。', ['のわりに|no wari ni', 'のくせに|no kuse ni', 'のおかげで|no okage de'], 'Substantivo + のわりに.')
  ]),
  L('c18l19', 'Ocasiões: たびに, ついでに, 最中に', '際', 'grammar', [
    'たびに = toda vez que: この歌を聞くたびに、故郷を思い出す.',
    'ついでに = aproveitando que (vai fazer algo, faz outra coisa junto): 買い物に行くついでに、手紙を出してきて.',
    '最中に = bem no meio de (com interrupção): 会議の最中に、電話が鳴った. Mais enfático que 間に.'
  ], 'ついでに também é usado sozinho no fim do pedido: ついでにこれもお願い (aproveita e faz isso também).', [
    ['s1', 'この写真を見るたびに、楽しかった夏を思い出す。', 'kono shashin o miru tabi ni, tanoshikatta natsu o omoidasu.', 'Toda vez que vejo esta foto, lembro daquele verão divertido.', ''],
    ['s2', '会うたびに、彼女はきれいになる。', 'au tabi ni, kanojo wa kirei ni naru.', 'Toda vez que a encontro, ela está mais bonita.', ''],
    ['s3', 'コンビニに行くついでに、牛乳を買ってきて。', 'konbini ni iku tsuide ni, gyuunyuu o katte kite.', 'Já que vai à loja de conveniência, traz leite.', ''],
    ['s4', '出張のついでに、京都を観光した。', 'shucchou no tsuide ni, kyouto o kankou shita.', 'Aproveitei a viagem a trabalho e passeei por Kyoto.', 'Substantivo + の.'],
    ['s5', '食事の最中に、地震が起きた。', 'shokuji no saichuu ni, jishin ga okita.', 'Bem no meio da refeição, houve um terremoto.', ''],
    ['s6', '話している最中に、電話が切れた。', 'hanashite iru saichuu ni, denwa ga kireta.', 'No meio da conversa, a ligação caiu.', 'ている + 最中.']
  ], [
    ['日本に来るたびに、新しい発見があります。', 'nihon ni kuru tabi ni, atarashii hakken ga arimasu.', 'Toda vez que venho ao Japão, descubro algo novo.']
  ], [
    X.f('Toda vez que vou a Tóquio, me perco.', '東京に行く＿、道に迷う。', ['たびに|tabi ni', 'ついでに|tsuide ni', '最中に|saichuu ni'], 'たびに = toda vez que.'),
    X.s('Você vai ao correio. Seu irmão pede para aproveitar e comprar pão.', ['郵便局に行くついでに、パンを買ってきて|yuubinkyoku ni iku tsuide ni, pan o katte kite', '郵便局に行くたびに、パンを買ってきて|yuubinkyoku ni iku tabi ni, pan o katte kite', '郵便局に行く最中に、パンを買ってきて|yuubinkyoku ni iku saichuu ni, pan o katte kite'], 'ついでに = aproveitando.'),
    X.f('Bem no meio da prova, fiquei com dor de barriga.', '試験の＿、お腹が痛くなった。', ['最中に|saichuu ni', 'たびに|tabi ni', 'ついでに|tsuide ni'], '最中に = no meio de.'),
    X.o('Toda vez que ouço esta música, choro.', ['この曲を|kono kyoku o', '聞くたびに|kiku tabi ni', '泣いてしまう|naite shimau'], ['聞いたたびに|kiita tabi ni'], 'Dicionário + たびに.')
  ]),
  L('c18l20', 'Do jeito que: とおり, まま', '通', 'grammar', [
    'とおり(に) = do jeito que, conforme: 先生が言ったとおりにしてください. 説明書のとおりに組み立てる. Depois de substantivo sem の vira どおり: 予定どおり.',
    'まま = do jeito que está, sem mudar: 靴のまま入らないでください (não entre de sapato). 窓を開けたまま寝た (dormi com a janela aberta).',
    'まま muitas vezes indica algo deixado assim sem querer ou contra o costume.'
  ], '思ったとおり = como eu imaginava. その まま = assim mesmo, sem mexer (muito usado em lojas: このままでいいです).', [
    ['s1', '私が言うとおりに、書いてください。', 'watashi ga iu toori ni, kaite kudasai.', 'Escreva exatamente como eu disser.', ''],
    ['s2', '計画は予定どおりに進んでいる。', 'keikaku wa yotei doori ni susunde iru.', 'O plano está andando conforme o previsto.', 'どおり.'],
    ['s3', '思ったとおり、彼は来なかった。', 'omotta toori, kare wa konakatta.', 'Como eu imaginava, ele não veio.', ''],
    ['s4', '電気をつけたまま寝てしまった。', 'denki o tsuketa mama nete shimatta.', 'Dormi com a luz acesa.', 'た + まま.'],
    ['s5', '靴のまま入らないでください。', 'kutsu no mama hairanaide kudasai.', 'Não entre de sapato, por favor.', 'Substantivo + のまま.'],
    ['s6', '袋は要りません。このままで大丈夫です。', 'fukuro wa irimasen. kono mama de daijoubu desu.', 'Não preciso de sacola. Assim está ótimo.', 'Na loja.']
  ], [
    ['地図のとおりに行ったのに、店が見つからなかった。', 'chizu no toori ni itta noni, mise ga mitsukaranakatta.', 'Fui exatamente como o mapa mostrava, mas não achei a loja.']
  ], [
    X.s('No caixa, você não quer sacola: “Assim mesmo está bom.”', ['このままで大丈夫です|kono mama de daijoubu desu', 'このとおりで大丈夫です|kono toori de daijoubu desu', 'このくらいで大丈夫です|kono kurai de daijoubu desu'], 'このまま = do jeito que está.'),
    X.f('Saí com a porta aberta.', 'ドアを開けた＿出かけた。', ['まま|mama', 'とおり|toori', 'ばかり|bakari'], 'た + まま = deixando como está.'),
    X.f('Conforme o planejado.', '計画＿', ['どおり|doori', 'のまま|no mama', 'ほど|hodo'], 'Substantivo + どおり.'),
    X.e('“Faça como está no manual.”', ['説明書の|setsumeisho no', 'ままに|mama ni', 'してください|shite kudasai'], 1, 'Conforme = とおりに.')
  ])
  );
})();
