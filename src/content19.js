/* ==========================================================
   CONTEÚDO 3.0 — Intermediário: Animes, Filmes e Séries (c24)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c24', emblem: '映', title: 'Animes, Filmes e Séries', jp: 'アニメ・えいが・ドラマ', stage: 'int', jlpt: 'N3',
    desc: 'Frases de heróis, vilões, romances e comédias; vocabulário de fantasia, esportes e mistério; títulos, episódios e o jeito de falar dos fãs.',
    requires: ['c10', 'c21'], reqWhy: 'Continua o Japonês dos Animes e usa a fala natural do intermediário.'
  });
  const realTalk = 'Lembre: muitas falas de ficção são exageradas ou rudes. Reconheça e divirta-se, mas adapte antes de usar com pessoas reais.';
  c.lessons.push(
  L('c24l1', 'Falas de herói', '雄', 'grammar', [
    'Heróis de anime falam de forma direta e masculina: 俺 (eu), imperativos (任せろ) e volitivos (守ってみせる).',
    'てみせる = vou fazer, e você vai ver! (determinação de provar algo): 絶対に勝ってみせる.',
    realTalk
  ], '任せて (deixa comigo) é ótimo na vida real, com amigos: 「誰か運転できる？」「任せて！」.', [
    ['s1', '俺に任せろ！', 'ore ni makasero!', 'Deixa comigo!', 'Imperativo de 任せる.'],
    ['s2', 'みんなは俺が守る。', 'minna wa ore ga mamoru.', 'Eu vou proteger todos.', ''],
    ['s3', '約束する。必ず帰ってくる。', 'yakusoku suru. kanarazu kaette kuru.', 'Eu prometo. Vou voltar, com certeza.', ''],
    ['s4', '仲間を見捨てるわけにはいかない！', 'nakama o misuteru wake ni wa ikanai!', 'Não posso abandonar meus companheiros!', 'わけにはいかない (c18).'],
    ['s5', '次こそ、勝ってみせる。', 'tsugi koso, katte miseru.', 'Da próxima vez, eu vou vencer, você vai ver.', 'てみせる.'],
    ['s6', '一人じゃない。俺たちがいる。', 'hitori ja nai. oretachi ga iru.', 'Você não está sozinho. Nós estamos aqui.', '']
  ], [
    ['どんなに強い敵でも、俺は絶対に逃げない。', 'donna ni tsuyoi teki demo, ore wa zettai ni nigenai.', 'Por mais forte que seja o inimigo, eu jamais vou fugir.']
  ], [
    X.s('Um amigo precisa de ajuda com a mudança. Uma resposta natural e simpática:', ['任せて！|makasete!', '任せろ！|makasero!', '貴様！|kisama!'], '任せて é natural; 任せろ soa de anime.'),
    X.s('O que significa 仲間?', ['companheiros (de equipe, de jornada)', 'inimigos', 'parentes'], '仲間 = companheiros.'),
    X.f('Vou vencer, você vai ver!', '勝って＿！', ['みせる|miseru', 'みる|miru', 'おく|oku'], 'てみせる = determinação.'),
    X.o('Deixa comigo!', ['俺に|ore ni', '任せろ！|makasero!'], ['任せる|makaseru'], 'Imperativo.')
  ]),
  L('c24l2', 'Falas de vilão', '悪', 'grammar', [
    'Vilões usam formas arrogantes: 貴様 (você, insulto), 愚か者 (tolo), め (sufixo de desprezo) e frases de superioridade.',
    'O riso clássico é ふふふ ou ははは; frases como 計画どおりだ (tudo conforme o plano) e 無駄だ (é inútil) são marcas do gênero.',
    realTalk
  ], 'め depois de um nome ou palavra mostra desprezo: 人間め！ (malditos humanos!). Nunca use com pessoas reais.', [
    ['s1', 'ふふふ、すべて計画どおりだ。', 'fufufu, subete keikaku doori da.', 'Hehehe, tudo conforme o plano.', ''],
    ['s2', '無駄だ。お前に勝ち目はない。', 'muda da. omae ni kachime wa nai.', 'É inútil. Você não tem chance.', '勝ち目 = chance de vencer.'],
    ['s3', '貴様、何者だ！', 'kisama, nanimono da!', 'Quem é você, desgraçado?!', '貴様 = insulto.'],
    ['s4', '愚か者め、まだわからないのか。', 'orokamono me, mada wakaranai no ka.', 'Seu tolo, ainda não entendeu?', 'め = desprezo.'],
    ['s5', 'この世界は私のものになる。', 'kono sekai wa watashi no mono ni naru.', 'Este mundo será meu.', ''],
    ['s6', '覚えていろ！', 'oboete iro!', 'Você me paga! (lembre-se disso)', 'Fala de quem foge derrotado.']
  ], [
    ['ここまで来たことは褒めてやろう。だが、ここで終わりだ。', 'koko made kita koto wa homete yarou. da ga, koko de owari da.', 'Vou elogiar você por ter chegado até aqui. Mas é aqui que acaba.']
  ], [
    X.s('O vilão foge derrotado e grita:', ['覚えていろ！|oboete iro!', '任せろ！|makasero!', 'ありがとう！|arigatou!'], 'Você me paga!'),
    X.s('O que significa 貴様?', ['você (insulto forte)', 'senhor (respeitoso)', 'amigo'], 'Originalmente respeitoso, hoje é insulto.'),
    X.f('É inútil.', '＿だ。', ['無駄|muda', '計画|keikaku', '仲間|nakama'], '無駄 = inútil.'),
    X.s('Por que não usar め com pessoas reais?', ['Expressa desprezo, é ofensivo', 'É muito formal', 'É infantil'], 'め = desprezo.')
  ]),
  L('c24l3', 'Romance e declarações', '恋', 'grammar', [
    'Animes e doramas românticos giram em torno da declaração (告白). A fórmula clássica: ずっと前から好きでした。付き合ってください.',
    'O japonês raramente diz 愛してる (te amo) no dia a dia: 好き e 大好き são muito mais comuns, mesmo entre casais.',
    'Frases indiretas mostram sentimento: もっと一緒にいたい (queria ficar mais com você), 会いたかった (estava com saudade).'
  ], '会いたかった (queria te ver) é o jeito japonês de dizer “estava com saudade de você”.', [
    ['s1', 'ずっと前から好きでした。', 'zutto mae kara suki deshita.', 'Eu gosto de você há muito tempo.', 'Declaração clássica.'],
    ['s2', '会いたかった。', 'aitakatta.', 'Estava com saudade de você.', ''],
    ['s3', 'もう少しだけ、一緒にいたい。', 'mou sukoshi dake, issho ni itai.', 'Quero ficar com você só mais um pouco.', ''],
    ['s4', '君の笑顔が見たいんだ。', 'kimi no egao ga mitai n da.', 'Quero ver o seu sorriso.', ''],
    ['s5', '私のこと、どう思ってる？', 'watashi no koto, dou omotte ru?', 'O que você pensa de mim?', 'のこと = sobre (pessoa).'],
    ['s6', '返事は、いつでもいいから。', 'henji wa, itsu demo ii kara.', 'Pode me responder quando quiser.', 'Depois da declaração.']
  ], [
    ['好きな人の前だと、うまく話せなくなる。', 'suki na hito no mae da to, umaku hanasenaku naru.', 'Na frente de quem eu gosto, não consigo falar direito.']
  ], [
    X.s('Qual é mais comum no dia a dia entre casais?', ['大好き|daisuki', '愛してる|aishite ru'], '愛してる é forte e raro.'),
    X.s('Você reencontra alguém depois de muito tempo. Para dizer “senti saudade”:', ['会いたかった|aitakatta', '会いたい|aitai', '会った|atta'], '会いたかった = queria te ver.'),
    X.f('O que você pensa de mim?', '私の＿、どう思ってる？', ['こと|koto', 'もの|mono', 'ところ|tokoro'], '私のこと = sobre mim.'),
    X.o('Eu gosto de você há muito tempo.', ['ずっと|zutto', '前から|mae kara', '好きでした|suki deshita'], ['好きだ|suki da'], 'Declaração clássica.')
  ]),
  L('c24l4', 'Comédia e tsukkomi', '笑', 'grammar', [
    'A comédia japonesa (漫才 manzai) tem dois papéis: a ボケ (boke), que diz absurdos, e a ツッコミ (tsukkomi), que corrige com uma bronca.',
    'Tsukkomi clássicas: なんでだよ！ (por quê?!), ちゃうやろ！ (Kansai: não é isso!), どういうこと？ (como assim?), いや、おかしいだろ！ (não, isso está errado!).',
    'Em animes de comédia, reações exageradas são parte da piada: ありえない！ (impossível!), 何それ (o que é isso?).'
  ], 'Muitos comediantes são de Osaka, por isso a comédia usa muito o dialeto de Kansai (ala Dialetos, no Avançado).', [
    ['s1', 'なんでだよ！', 'nande da yo!', 'Por que isso?!', 'Tsukkomi padrão.'],
    ['s2', 'いや、おかしいだろ！', 'iya, okashii daro!', 'Não, isso está errado!', ''],
    ['s3', '何それ、ウケる！', 'nani sore, ukeru!', 'O que é isso? Hilário!', 'ウケる = engraçado (gíria).'],
    ['s4', 'ありえない！', 'arienai!', 'Impossível! Não dá pra acreditar!', ''],
    ['s5', 'どういうこと？', 'dou iu koto?', 'Como assim?', ''],
    ['s6', 'ちょっと待って、話がおかしくない？', 'chotto matte, hanashi ga okashiku nai?', 'Espera aí, essa história não está estranha?', '']
  ], [
    ['「趣味は寝ることです。」「それ趣味じゃないだろ！」', '"shumi wa neru koto desu." "sore shumi ja nai daro!"', '“Meu hobby é dormir.” “Isso não é hobby!”']
  ], [
    X.s('Quem é a ボケ numa dupla de comédia?', ['Quem diz absurdos', 'Quem corrige', 'O público'], 'ボケ = o “bobo”.'),
    X.s('Alguém diz algo absurdo. Uma tsukkomi:', ['なんでだよ！|nande da yo!', 'なるほど。|naruhodo.', 'そうですね。|sou desu ne.'], 'Tsukkomi = bronca cômica.'),
    X.s('O que significa ウケる?', ['muito engraçado (gíria)', 'receber', 'cair'], 'ウケる = fazer rir.'),
    X.f('Como assim?', 'どういう＿？', ['こと|koto', 'もの|mono', 'わけ|wake'], 'どういうこと = como assim.')
  ]),
  L('c24l5', 'Fantasia e isekai', '魔', 'vocab', [
    'Isekai (異世界, “outro mundo”) é o gênero em que o protagonista é transportado para um mundo de fantasia, quase sempre com elementos de RPG.',
    'O vocabulário mistura kanji tradicionais (魔法, 勇者, 魔王) e katakana dos games (レベル, スキル, ギルド).',
    'Saber essas palavras ajuda a entender títulos longos de light novels, que muitas vezes resumem a história inteira.'
  ], '転生 (reencarnar) aparece em muitos títulos: 異世界に転生したら… (quando reencarnei em outro mundo…).', [
    ['shoukan', '召喚', 'shoukan', 'invocação', '召喚する = invocar.', ['突然、異世界に召喚された。', 'totsuzen, isekai ni shoukan sareta.', 'De repente, fui invocado para outro mundo.']],
    ['tensei', '転生', 'tensei', 'reencarnação', '', ['勇者として転生した。', 'yuusha to shite tensei shita.', 'Reencarnei como herói.']],
    ['maryoku', '魔力', 'maryoku', 'poder mágico, mana', '', ['魔力が足りない。', 'maryoku ga tarinai.', 'Não tenho mana suficiente.']],
    ['mamono', '魔物', 'mamono', 'monstro', '', ['森には魔物がいる。', 'mori ni wa mamono ga iru.', 'Há monstros na floresta.']],
    ['jumon', '呪文', 'jumon', 'feitiço (palavras mágicas)', '呪文を唱える = recitar um feitiço.', ['呪文を唱えると、扉が開いた。', 'jumon o tonaeru to, tobira ga aita.', 'Ao recitar o feitiço, a porta se abriu.']],
    ['bouken', '冒険', 'bouken', 'aventura', '冒険者 = aventureiro.', ['新しい冒険が始まる。', 'atarashii bouken ga hajimaru.', 'Uma nova aventura começa.']],
    ['girudo', 'ギルド', 'girudo', 'guilda', '', ['ギルドで仕事を探す。', 'girudo de shigoto o sagasu.', 'Procurar trabalho na guilda.']],
    ['sukiru', 'スキル', 'sukiru', 'habilidade (skill)', '', ['珍しいスキルを手に入れた。', 'mezurashii sukiru o te ni ireta.', 'Consegui uma habilidade rara.']],
    ['ken', '剣', 'ken', 'espada', '', ['伝説の剣を見つけた。', 'densetsu no ken o mitsuketa.', 'Encontrei a espada lendária.']],
    ['taosu', '倒す', 'taosu', 'derrotar, derrubar', '', ['ついにドラゴンを倒した。', 'tsuini doragon o taoshita.', 'Finalmente derrotei o dragão.']]
  ], [
    ['異世界に転生したら、最強の魔法使いになっていた。', 'isekai ni tensei shitara, saikyou no mahoutsukai ni natte ita.', 'Quando reencarnei em outro mundo, tinha virado o mago mais forte.']
  ], [
    X.s('O que é 召喚?', ['invocação', 'reencarnação', 'aventura'], '召喚 = invocar.'),
    X.s('O que é um 魔物?', ['um monstro', 'um mago', 'um rei'], '魔 (demônio) + 物 (coisa, ser).'),
    X.f('Derrotar o inimigo', '敵を＿', ['倒す|taosu', '冒険|bouken', '転生|tensei'], '倒す = derrotar.'),
    X.s('Onde os aventureiros procuram trabalho?', ['ギルド|girudo', 'スキル|sukiru', '剣|ken'], 'ギルド = guilda.')
  ]),
  L('c24l6', 'Mistério e investigação', '謎', 'vocab', [
    'Séries de detetive e suspense são muito populares no Japão. O vocabulário vem do mundo policial e jurídico.',
    'O clímax clássico: o detetive reúne todos e diz 犯人はこの中にいる (o culpado está entre nós).',
    'Palavras como 証拠 (prova), 動機 (motivo) e アリバイ (álibi) aparecem em toda história de mistério.'
  ], '謎 (nazo, mistério) aparece em muitos títulos: 謎の転校生 (o aluno transferido misterioso).', [
    ['nazo', '謎', 'nazo', 'mistério, enigma', '謎を解く = resolver o mistério.', ['この謎を解いてみせる。', 'kono nazo o toite miseru.', 'Vou resolver este mistério, você vai ver.']],
    ['keiji', '刑事', 'keiji', 'detetive da polícia', '', ['刑事が現場を調べている。', 'keiji ga genba o shirabete iru.', 'O detetive da polícia está examinando o local.']],
    ['shouko', '証拠', 'shouko', 'prova, evidência', '', ['証拠がなければ、逮捕できない。', 'shouko ga nakereba, taiho dekinai.', 'Sem provas, não dá para prender.']],
    ['douki', '動機', 'douki', 'motivo (de um crime)', '', ['犯人の動機は何だろう。', 'hannin no douki wa nan darou.', 'Qual será o motivo do criminoso?']],
    ['aribai', 'アリバイ', 'aribai', 'álibi', '', ['彼には完璧なアリバイがある。', 'kare ni wa kanpeki na aribai ga aru.', 'Ele tem um álibi perfeito.']],
    ['yougisha', '容疑者', 'yougisha', 'suspeito', '', ['容疑者は三人いる。', 'yougisha wa sannin iru.', 'Há três suspeitos.']],
    ['taiho', '逮捕', 'taiho', 'prisão (ato de prender)', '', ['犯人が逮捕された。', 'hannin ga taiho sareta.', 'O criminoso foi preso.']],
    ['shinjitsu', '真実', 'shinjitsu', 'verdade', '', ['真実を知りたい。', 'shinjitsu o shiritai.', 'Quero saber a verdade.']],
    ['himitsu', '秘密', 'himitsu', 'segredo', '', ['これは二人だけの秘密だよ。', 'kore wa futari dake no himitsu da yo.', 'Isto é um segredo só nosso.']],
    ['usootsuku', '嘘をつく', 'uso o tsuku', 'mentir', '嘘 = mentira.', ['嘘をつかないで。', 'uso o tsukanaide.', 'Não minta.']]
  ], [
    ['探偵は、犯人がこの中にいると言った。', 'tantei wa, hannin ga kono naka ni iru to itta.', 'O detetive disse que o culpado estava entre eles.']
  ], [
    X.s('O que o detetive precisa para prender alguém?', ['証拠|shouko', '秘密|himitsu', '謎|nazo'], '証拠 = prova.'),
    X.s('Ele estava em outro lugar na hora do crime. Isso é um:', ['アリバイ|aribai', '動機|douki', '逮捕|taiho'], 'アリバイ = álibi.'),
    X.f('Não minta.', '嘘を＿ないで。', ['つか|tsuka', 'し|shi', '言わ|iwa'], '嘘をつく = mentir.'),
    X.s('O que é 容疑者?', ['suspeito', 'testemunha', 'vítima'], '容疑者 = suspeito.')
  ]),
  L('c24l7', 'Esporte e competição', '競', 'grammar', [
    'Animes de esporte (スポ根, “esporte + garra”) celebram esforço, trabalho em equipe e superação.',
    'Frases típicas usam 全力 (com toda a força), 最後まで (até o fim) e a ideia de não desistir: 諦めたら、そこで終わりだ.',
    'Vocabulário: 試合 (partida), 決勝 (final), 優勝 (título, vitória no campeonato), 練習 (treino), ベンチ (banco).'
  ], 'ドンマイ (do inglês don’t mind) é o “não esquenta” dos esportes, dito ao colega que errou.', [
    ['s1', '全力でいこう！', 'zenryoku de ikou!', 'Vamos com tudo!', ''],
    ['s2', '最後まで諦めるな！', 'saigo made akirameru na!', 'Não desista até o fim!', 'な = proibição.'],
    ['s3', 'ドンマイ、次がある！', 'donmai, tsugi ga aru!', 'Não esquenta, tem a próxima!', ''],
    ['s4', '決勝に進んだ！', 'kesshou ni susunda!', 'Fomos para a final!', ''],
    ['s5', 'チームのために、もっと強くなりたい。', 'chiimu no tame ni, motto tsuyoku naritai.', 'Quero ficar mais forte pela equipe.', ''],
    ['s6', 'みんなで優勝しよう！', 'minna de yuushou shiyou!', 'Vamos ganhar o campeonato juntos!', '']
  ], [
    ['負けて悔しいけど、この経験は無駄じゃない。', 'makete kuyashii kedo, kono keiken wa muda ja nai.', 'Perder dá raiva, mas esta experiência não foi em vão.']
  ], [
    X.s('Seu colega errou o pênalti. O que dizer?', ['ドンマイ！|donmai!', '無駄だ！|muda da!', '覚えていろ！|oboete iro!'], 'ドンマイ = não esquenta.'),
    X.s('O que significa 優勝?', ['vencer o campeonato', 'treinar', 'empatar'], '優勝 = título.'),
    X.f('Não desista!', '諦める＿！', ['な|na', 'よ|yo', 'ね|ne'], 'Dicionário + な = proibição.'),
    X.o('Vamos com tudo!', ['全力で|zenryoku de', 'いこう！|ikou!'], ['いけ|ike'], 'Volitivo = vamos.')
  ]),
  L('c24l8', 'Drama de família e amizade', '絆', 'grammar', [
    'Doramas japoneses têm cenas emotivas com frases que revelam sentimentos guardados por muito tempo.',
    'Expressões típicas: 今まで、ありがとう (obrigado por tudo até hoje), 本当のことを言って (diga a verdade), 何があっても (aconteça o que acontecer).',
    '絆 (kizuna, laço) é uma palavra muito querida: laços de família e amizade.'
  ], 'Depois do terremoto de 2011, 絆 virou símbolo de união no Japão.', [
    ['s1', '今まで、本当にありがとう。', 'ima made, hontou ni arigatou.', 'Obrigado por tudo até hoje.', 'Despedida emotiva.'],
    ['s2', '本当のことを言って。', 'hontou no koto o itte.', 'Diga a verdade.', ''],
    ['s3', '何があっても、私たちは家族だよ。', 'nani ga atte mo, watashitachi wa kazoku da yo.', 'Aconteça o que acontecer, somos família.', ''],
    ['s4', '嘘をついて、ごめん。', 'uso o tsuite, gomen.', 'Desculpe por ter mentido.', ''],
    ['s5', 'もう二度と会えないかもしれない。', 'mou nido to aenai kamoshirenai.', 'Talvez a gente nunca mais se veja.', '二度と + negativa = nunca mais.'],
    ['s6', '私たちの絆は、誰にも切れない。', 'watashitachi no kizuna wa, dare ni mo kirenai.', 'Ninguém pode cortar o nosso laço.', '']
  ], [
    ['お父さん、ずっと言えなかったけど、感謝してる。', 'otousan, zutto ienakatta kedo, kansha shite ru.', 'Pai, nunca consegui dizer, mas sou grato a você.']
  ], [
    X.s('O que significa 二度と会えない?', ['nunca mais poder se ver', 'se ver duas vezes', 'se ver de novo logo'], '二度と + negativa = nunca mais.'),
    X.s('O que é 絆?', ['laço (afetivo)', 'briga', 'segredo'], '絆 = kizuna.'),
    X.f('Aconteça o que acontecer…', '何が＿も…', ['あって|atte', 'いて|ite', 'して|shite'], '何があっても.'),
    X.s('Numa despedida emocionada, qual frase?', ['今まで、ありがとう|ima made, arigatou', '計画どおりだ|keikaku doori da', 'ドンマイ|donmai'], 'Gratidão por tudo.')
  ]),
  L('c24l9', 'Episódios, temporadas e títulos', '話', 'vocab', [
    'Palavras que aparecem nas telas de abertura, nos sites de streaming e nos créditos.',
    'Episódios são contados com 話: 第一話 (episódio 1). 最終回 é o último episódio. 次回予告 é a prévia do próximo.',
    'つづく (continua) aparece no fim do episódio; 完 ou 終 marca o fim da obra.'
  ], '劇場版 é a versão para cinema de uma série; 実写版, a versão com atores (live action).', [
    ['daiichiwa', '第一話', 'dai ichi wa', 'episódio 1', '第 + número + 話.', ['第一話から見直したい。', 'dai ichi wa kara minaoshitai.', 'Quero rever desde o episódio 1.']],
    ['saishuukai', '最終回', 'saishuukai', 'último episódio', '', ['最終回で泣いてしまった。', 'saishuukai de naite shimatta.', 'Chorei no último episódio.']],
    ['jikaiyokoku', '次回予告', 'jikai yokoku', 'prévia do próximo episódio', '', ['次回予告が気になる。', 'jikai yokoku ga ki ni naru.', 'Fiquei curioso com a prévia.']],
    ['tsuzuku', 'つづく', 'tsuzuku', 'continua…', '', ['いいところで「つづく」だった。', 'ii tokoro de "tsuzuku" datta.', 'Parou no “continua” bem na melhor parte.']],
    ['gekijouban', '劇場版', 'gekijouban', 'versão para o cinema', '', ['劇場版が来月公開される。', 'gekijouban ga raigetsu koukai sareru.', 'O filme estreia mês que vem.']],
    ['jisshaban', '実写版', 'jisshaban', 'versão live action', '', ['実写版は原作とかなり違う。', 'jisshaban wa gensaku to kanari chigau.', 'O live action é bem diferente do original.']],
    ['gensaku', '原作', 'gensaku', 'obra original', 'Geralmente o mangá ou o livro.', ['原作の漫画も読んだ。', 'gensaku no manga mo yonda.', 'Também li o mangá original.']],
    ['jimaku', '字幕', 'jimaku', 'legenda', '吹き替え = dublagem.', ['日本語の字幕で見ている。', 'nihongo no jimaku de mite iru.', 'Estou assistindo com legenda em japonês.']],
    ['fukikae', '吹き替え', 'fukikae', 'dublagem', '', ['吹き替えより字幕のほうが好き。', 'fukikae yori jimaku no hou ga suki.', 'Prefiro legendado a dublado.']],
    ['dainiki', '第二期', 'dai niki', 'segunda temporada', '期 = temporada de anime.', ['第二期の放送が決まった！', 'dai niki no housou ga kimatta!', 'A segunda temporada foi confirmada!']]
  ], [
    ['原作は全部読んだけど、劇場版も見に行くつもりだ。', 'gensaku wa zenbu yonda kedo, gekijouban mo mi ni iku tsumori da.', 'Li toda a obra original, mas pretendo ver o filme também.']
  ], [
    X.s('O que significa 最終回?', ['último episódio', 'primeiro episódio', 'episódio especial'], '最終 = último.'),
    X.s('Você prefere ouvir as vozes originais. Escolhe:', ['字幕|jimaku', '吹き替え|fukikae', '予告|yokoku'], '字幕 = legenda.'),
    X.f('Episódio 5', '第五＿', ['話|wa', '期|ki', '回|kai'], '第五話 = dai go wa.'),
    X.s('A versão com atores reais é o:', ['実写版|jisshaban', '劇場版|gekijouban', '原作|gensaku'], '実写 = filmado ao vivo.')
  ]),
  L('c24l10', 'O jeito de falar dos fãs', '推', 'vocab', [
    'A comunidade de fãs (オタク) tem um vocabulário próprio que se espalhou pela internet japonesa.',
    'ネタバレ (spoiler) é a palavra mais importante: ネタバレ注意 avisa que o texto tem spoilers.',
    '聖地巡礼 (“peregrinação aos lugares sagrados”) é visitar os lugares reais que aparecem em um anime.'
  ], '神回 (“episódio divino”) é o elogio máximo para um episódio. 作画崩壊 é quando a animação desanda.', [
    ['netabare', 'ネタバレ', 'netabare', 'spoiler', 'ネタバレ注意 = cuidado, spoiler.', ['ネタバレしないで！', 'netabare shinaide!', 'Não me dá spoiler!']],
    ['kamikai', '神回', 'kamikai', 'episódio incrível', '', ['昨日の話は神回だった。', 'kinou no hanashi wa kamikai datta.', 'O episódio de ontem foi incrível.']],
    ['seichijunrei', '聖地巡礼', 'seichi junrei', 'visitar locais reais de um anime', '', ['夏休みに聖地巡礼に行った。', 'natsuyasumi ni seichi junrei ni itta.', 'Nas férias fui visitar os locais do anime.']],
    ['seiyuu', '声優', 'seiyuu', 'dublador(a) (de anime)', '', ['この声優さんの声が大好き。', 'kono seiyuu-san no koe ga daisuki.', 'Adoro a voz deste dublador.']],
    ['sakuga', '作画', 'sakuga', 'animação (qualidade do desenho)', '', ['この作品は作画がきれいだ。', 'kono sakuhin wa sakuga ga kirei da.', 'A animação desta obra é linda.']],
    ['meishiin', '名シーン', 'meishiin', 'cena memorável', '', ['あの名シーンは何度見ても泣ける。', 'ano meishiin wa nando mite mo nakeru.', 'Aquela cena me faz chorar por mais que eu veja.']],
    ['kyara', 'キャラ', 'kyara', 'personagem (abrev.)', 'キャラクター.', ['好きなキャラは誰？', 'suki na kyara wa dare?', 'Qual seu personagem favorito?']],
    ['kousatsu', '考察', 'kousatsu', 'análise, teoria de fã', '', ['ネットで考察を読むのが好き。', 'netto de kousatsu o yomu no ga suki.', 'Gosto de ler teorias na internet.']],
    ['ikkimi', '一気見', 'ikkimi', 'maratonar', '', ['週末に全話一気見した。', 'shuumatsu ni zenwa ikkimi shita.', 'Maratonei todos os episódios no fim de semana.']],
    ['hamaru', 'ハマる', 'hamaru', 'ficar viciado (em algo)', '', ['最近、このアニメにハマっている。', 'saikin, kono anime ni hamatte iru.', 'Ultimamente estou viciado neste anime.']]
  ], [
    ['ハマりすぎて、一晩で全話一気見しちゃった。', 'hamarisugite, hitoban de zenwa ikkimi shichatta.', 'Fiquei tão viciado que maratonei tudo numa noite.']
  ], [
    X.s('Seu amigo vai contar o final. Você grita:', ['ネタバレしないで！|netabare shinaide!', '神回だ！|kamikai da!', '一気見しよう！|ikkimi shiyou!'], 'ネタバレ = spoiler.'),
    X.s('O que é 聖地巡礼?', ['visitar locais reais de um anime', 'ir a um templo religioso', 'assistir de novo'], '聖地 = “lugar sagrado” do fã.'),
    X.f('Estou viciado neste jogo.', 'このゲームに＿いる。', ['ハマって|hamatte', '考察して|kousatsu shite', 'ネタバレして|netabare shite'], 'ハマる = ficar viciado.'),
    X.s('Quem é o 声優?', ['quem dá voz aos personagens', 'quem desenha', 'quem escreve'], '声 (voz) + 優 (ator).')
  ])
  );
})();
