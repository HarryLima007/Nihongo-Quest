/* ==========================================================
   CONTEÚDO 2.1 — Trilha da Fala (parte 2): Japonês Falado,
   Formalidade e Respeito, Japonês dos Animes; e a expansão da
   Academia Auditiva (palavras, pares de som, expressões, frases,
   diálogos). Escrita natural (com kanji) + “say” em kana para a voz.
   ========================================================== */
(function () {
  /* ---------------- novas alas ---------------- */
  CATS.push(
  {
    id: 'c8', num: 8, emblem: '話', title: 'Japonês Falado', jp: 'はなしことば',
    desc: 'A fala casual de verdade: formas curtas dos verbos, contrações, partículas finais e reações.',
    requires: 'c6', soon: [],
    lessons: [
    {
      id: 'c8l1', title: 'Forma de dicionário', emblem: '辞', kind: 'grammar',
      intro: [
        'Entre amigos e família ninguém fala com ます. Usa-se a forma de dicionário: 行きます vira 行く, 食べます vira 食べる.',
        'Como converter: verbos em る como 食べる tiram ます e põem る (食べます → 食べる). Os outros mudam a última sílaba de “i” para “u”: 行きます (iki) → 行く (iku), 飲みます (nomi) → 飲む (nomu). Irregulares: します → する, 来ます → 来る.',
        'Na fala casual as partículas は, を e へ costumam sumir: 学校行く？ em vez de 学校に行きますか.',
        'A pergunta casual não usa か: basta subir a entonação no final.'
      ],
      tip: 'Use a forma casual só com amigos, família e pessoas mais novas. Com desconhecidos, continue com ます.',
      items: [
        { k: 's1', jp: '明日、学校行く？', say: 'あした、がっこういく？', ro: 'ashita, gakkou iku?', pt: 'Amanhã você vai à escola?', note: 'Sem に e sem か: só a entonação subindo.' },
        { k: 's2', jp: 'うん、行く。', say: 'うん、いく。', ro: 'un, iku.', pt: 'Sim, vou.', note: 'うん = sim (casual).' },
        { k: 's3', jp: '何食べる？', say: 'なにたべる？', ro: 'nani taberu?', pt: 'O que a gente vai comer?', note: 'Sem を: 何を食べる → 何食べる.' },
        { k: 's4', jp: 'もう寝る。', say: 'もうねる。', ro: 'mou neru.', pt: 'Já vou dormir.', note: 'もう = já.' },
        { k: 's5', jp: '一緒にやる？', say: 'いっしょにやる？', ro: 'issho ni yaru?', pt: 'Quer fazer junto?', note: 'やる = fazer (mais casual que する).' },
        { k: 's6', jp: '俺がやる。', say: 'おれがやる。', ro: 'ore ga yaru.', pt: 'Eu faço. / Deixa que eu faço.', note: '俺 (ore) = eu, masculino e casual. Veja mais na ala Formalidade e Respeito.' }
      ],
      examples: [
        { jp: '今日、何する？ … ゲームする！', say: 'きょう、なにする？ … ゲームする！', ro: 'kyou, nani suru? … geemu suru!', pt: 'O que vamos fazer hoje? … Jogar videogame!' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Qual é a forma de dicionário de 飲みます?', opts: ['飲む|nomu', '飲みる|nomiru', '飲る|noru'], ans: 0, explain: 'nomi-masu → nomu: o “i” vira “u”.' },
        { t: 'situation', prompt: 'Qual é a forma de dicionário de します?', opts: ['する|suru', 'しる|shiru', 'す|su'], ans: 0, explain: 'します é irregular: する.' },
        { t: 'error', ctx: 'Pergunta casual a um amigo: “Vai comer?”', tokens: ['食べ|tabe', 'ますか|masu ka'], wrong: 1, explain: 'Entre amigos, a forma natural é só 食べる？ com a entonação subindo.' }
      ]
    },
    {
      id: 'c8l2', title: 'Negativo casual: 〜ない', emblem: '無', kind: 'grammar',
      intro: [
        'O negativo casual termina em ない. Verbos em る: 食べる → 食べない. Os outros trocam o “u” final por “a” + ない: 行く → 行かない, 飲む → 飲まない. Se termina em う, vira わない: 買う → 買わない.',
        'Irregulares: する → しない, 来る → こない. E atenção: ある (ter, existir) vira só ない.',
        'Com entonação de pergunta, 〜ない？ vira convite: 行かない？ = Vamos?'
      ],
      tip: 'わかんない (de わからない) é o “sei lá / não entendo” mais ouvido em animes.',
      items: [
        { k: 's1', jp: '今日は行かない。', say: 'きょうはいかない。', ro: 'kyou wa ikanai.', pt: 'Hoje não vou.', note: '行く → 行かない.' },
        { k: 's2', jp: 'わからない。', say: 'わからない。', ro: 'wakaranai.', pt: 'Não sei. / Não entendo.', note: 'Casual de わかりません. Na fala rápida: わかんない.' },
        { k: 's3', jp: 'お金がない。', say: 'おかねがない。', ro: 'okane ga nai.', pt: 'Não tenho dinheiro.', note: 'ある (ter) → ない.' },
        { k: 's4', jp: '誰も来ない。', say: 'だれもこない。', ro: 'daremo konai.', pt: 'Ninguém vem.', note: '来る → こない. 誰も + negativo = ninguém.' },
        { k: 's5', jp: '食べないの？', say: 'たべないの？', ro: 'tabenai no?', pt: 'Você não vai comer?', note: 'の no final deixa a pergunta mais suave.' },
        { k: 's6', jp: 'カラオケ行かない？', say: 'カラオケいかない？', ro: 'karaoke ikanai?', pt: 'Vamos ao karaokê?', note: 'Negativo + pergunta = convite casual.' }
      ],
      examples: [
        { jp: '雨だから、出かけない。', say: 'あめだから、でかけない。', ro: 'ame dakara, dekakenai.', pt: 'Está chovendo, então não vou sair.' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Qual é o negativo casual de 行く?', opts: ['行かない|ikanai', '行きない|ikinai', '行くない|ikunai'], ans: 0, explain: 'iku → ika + nai.' },
        { t: 'situation', prompt: 'Qual é o negativo casual de ある (ter)?', opts: ['ない|nai', 'あらない|aranai', 'ありない|arinai'], ans: 0, explain: 'ある é especial: o negativo é só ない.' },
        { t: 'situation', prompt: 'Um amigo diz 映画見ない？ O que ele quer?', opts: ['Convidar para ver um filme', 'Dizer que não gosta de filmes', 'Perguntar se o filme acabou'], ans: 0, explain: 'Negativo com entonação de pergunta = convite.' }
      ]
    },
    {
      id: 'c8l3', title: 'Passado casual: 〜た', emblem: '過', kind: 'grammar',
      intro: [
        'O passado casual é a forma て com た no lugar de て: 食べて → 食べた, 行って → 行った, 飲んで → 飲んだ, して → した, 来て → 来た.',
        'Negativo no passado: ない → なかった. 行かない → 行かなかった.',
        '“Ainda não fiz” usa a forma ている no negativo: まだ食べてない (ainda não comi), e não 食べなかった.'
      ],
      tip: 'Se você sabe a forma て, já sabe o passado casual!',
      items: [
        { k: 's1', jp: '昨日、何した？', say: 'きのう、なにした？', ro: 'kinou, nani shita?', pt: 'O que você fez ontem?', note: 'する → した.' },
        { k: 's2', jp: '映画見た。', say: 'えいがみた。', ro: 'eiga mita.', pt: 'Vi um filme.', note: '見る → 見た.' },
        { k: 's3', jp: 'もう食べた？', say: 'もうたべた？', ro: 'mou tabeta?', pt: 'Já comeu?', note: 'もう + passado = já.' },
        { k: 's4', jp: 'まだ食べてない。', say: 'まだたべてない。', ro: 'mada tabete nai.', pt: 'Ainda não comi.', note: 'まだ + 〜てない = ainda não.' },
        { k: 's5', jp: '全然寝なかった。', say: 'ぜんぜんねなかった。', ro: 'zenzen nenakatta.', pt: 'Não dormi nada.', note: '全然 + negativo = nada, de jeito nenhum.' },
        { k: 's6', jp: '疲れた…', say: 'つかれた…', ro: 'tsukareta…', pt: 'Cansei… / Estou cansado(a)…', note: 'Em japonês, “cansado” é dito no passado: “cansei”.' }
      ],
      examples: [
        { jp: '宿題やった？ … まだやってない！', say: 'しゅくだいやった？ … まだやってない！', ro: 'shukudai yatta? … mada yatte nai!', pt: 'Fez a lição? … Ainda não!' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Qual é o passado casual de 飲む?', opts: ['飲んだ|nonda', '飲った|notta', '飲みた|nomita'], ans: 0, explain: 'Igual à forma て: 飲んで → 飲んだ.' },
        { t: 'situation', prompt: 'Como dizer “Ainda não comi”?', opts: ['まだ食べてない|mada tabete nai', 'まだ食べなかった|mada tabenakatta', 'もう食べた|mou tabeta'], ans: 0, explain: '“Ainda não” usa まだ + 〜てない.' },
        { t: 'fill', prompt: 'Complete', pt: 'O que você fez ontem?', jp: '昨日、何＿＿？', opts: ['した|shita', 'する|suru', 'しない|shinai'], ans: 0, explain: 'Passado de する: した.' }
      ]
    },
    {
      id: 'c8l4', title: 'Contrações da fala rápida', emblem: '縮', kind: 'grammar',
      intro: [
        'Na conversa, várias formas encolhem. 〜ている vira 〜てる: 見ている → 見てる.',
        '〜てしまう (fazer algo sem querer, ou por completo) vira 〜ちゃう / 〜じゃう: 忘れてしまった → 忘れちゃった.',
        '“Tenho que”: 〜なければ → 〜なきゃ, e 〜なくては → 〜なくちゃ. 〜ておく (deixar feito) vira 〜とく.',
        'Reconhecer essas formas é o que separa entender o livro de entender anime e conversa real.'
      ],
      tip: '〜ちゃった costuma vir com um tom de “ops!” ou de lamento.',
      items: [
        { k: 's1', jp: '今、テレビ見てる。', say: 'いま、テレビみてる。', ro: 'ima, terebi miteru.', pt: 'Estou vendo TV agora.', note: '見ている → 見てる.' },
        { k: 's2', jp: '忘れちゃった！', say: 'わすれちゃった！', ro: 'wasurechatta!', pt: 'Esqueci! (ops)', note: '忘れてしまった → 忘れちゃった.' },
        { k: 's3', jp: '全部食べちゃった。', say: 'ぜんぶたべちゃった。', ro: 'zenbu tabechatta.', pt: 'Comi tudo. (acabei comendo tudo)', note: '〜ちゃう também indica fazer algo por completo.' },
        { k: 's4', jp: 'もう行かなきゃ。', say: 'もういかなきゃ。', ro: 'mou ikanakya.', pt: 'Já tenho que ir.', note: '行かなければ (ならない) → 行かなきゃ.' },
        { k: 's5', jp: '宿題しなくちゃ。', say: 'しゅくだいしなくちゃ。', ro: 'shukudai shinakucha.', pt: 'Tenho que fazer a lição.', note: 'しなくては → しなくちゃ.' },
        { k: 's6', jp: '飲み物、買っとく。', say: 'のみもの、かっとく。', ro: 'nomimono, kattoku.', pt: 'Eu compro as bebidas (e deixo pronto).', note: '買っておく → 買っとく: fazer algo antes, de preparação.' },
        { k: 's7', jp: 'わかんない。', say: 'わかんない。', ro: 'wakannai.', pt: 'Sei lá. / Não entendo.', note: 'わからない → わかんない. Bem casual.' }
      ],
      examples: [
        { jp: 'やばい、寝ちゃった！遅れちゃう！', say: 'やばい、ねちゃった！おくれちゃう！', ro: 'yabai, nechatta! okurechau!', pt: 'Droga, peguei no sono! Vou me atrasar!' }
      ],
      exercises: [
        { t: 'situation', prompt: '忘れちゃった é a forma falada de…', opts: ['忘れてしまった|wasurete shimatta', '忘れていた|wasurete ita', '忘れなかった|wasurenakatta'], ans: 0, explain: '〜てしまった → 〜ちゃった.' },
        { t: 'situation', prompt: 'Alguém diz もう行かなきゃ. O que quer dizer?', opts: ['Já tenho que ir', 'Não vou mais', 'Já fui'], ans: 0, explain: '〜なきゃ = tenho que.' },
        { t: 'fill', prompt: 'Complete (forma falada)', pt: 'Estou vendo TV agora.', jp: '今、テレビ見＿＿。', opts: ['てる|teru', 'ちゃう|chau', 'なきゃ|nakya'], ans: 0, explain: '見ている → 見てる.' }
      ]
    },
    {
      id: 'c8l5', title: 'Partículas finais da conversa', emblem: '終', kind: 'grammar',
      intro: [
        'No fim das frases casuais aparecem partículas que dão emoção e intenção. Você já conhece ね, よ e よね.',
        'かな = “será que?” (pensando alto). の = pergunta suave ou explicação. じゃん = “não é que…!”, “eu não disse?”. っけ = “era… mesmo?” (tentando lembrar). な = comentário para si mesmo.',
        'Estas partículas não têm tradução exata: preste atenção no tom de quem fala.'
      ],
      tip: 'っけ é ótimo para você: 名前、何だっけ？ (Qual era o nome mesmo?).',
      items: [
        { k: 's1', jp: 'これ、おいしいよね。', say: 'これ、おいしいよね。', ro: 'kore, oishii yo ne.', pt: 'Isto é gostoso, né?', note: 'よね = buscar confirmação de algo que você acha.' },
        { k: 's2', jp: '明日、晴れるかな。', say: 'あした、はれるかな。', ro: 'ashita, hareru kana.', pt: 'Será que amanhã vai fazer sol?', note: 'かな = pensar alto, “será que…”.' },
        { k: 's3', jp: 'どこ行くの？', say: 'どこいくの？', ro: 'doko iku no?', pt: 'Aonde você vai?', note: 'の = pergunta suave e curiosa.' },
        { k: 's4', jp: '言ったじゃん！', say: 'いったじゃん！', ro: 'itta jan!', pt: 'Eu falei, não falei?!', note: 'じゃん = “não é que…”, “viu só?”. Bem casual.' },
        { k: 's5', jp: '名前、何だっけ？', say: 'なまえ、なんだっけ？', ro: 'namae, nan da kke?', pt: 'Qual era o nome mesmo?', note: 'っけ = tentar lembrar algo.' },
        { k: 's6', jp: 'いい天気だな。', say: 'いいてんきだな。', ro: 'ii tenki da na.', pt: 'Que tempo bom…', note: 'な = comentário, muitas vezes para si mesmo.' }
      ],
      examples: [
        { jp: 'あれ？鍵、どこに置いたっけ？', say: 'あれ？かぎ、どこにおいたっけ？', ro: 'are? kagi, doko ni oita kke?', pt: 'Ué? Onde foi que eu deixei a chave?' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você tenta lembrar a hora da reunião. Qual final usa?', opts: ['何時だっけ？|nanji da kke?', '何時じゃん！|nanji jan!', '何時だな。|nanji da na.'], ans: 0, explain: 'っけ = tentar lembrar.' },
        { t: 'situation', prompt: 'O que significa 晴れるかな?', opts: ['Será que vai fazer sol?', 'Vai fazer sol, com certeza!', 'Não vai fazer sol.'], ans: 0, explain: 'かな = “será que”.' },
        { t: 'situation', prompt: 'Seu amigo esqueceu algo que você avisou. O que você diz?', opts: ['言ったじゃん！|itta jan!', '言ったかな。|itta kana.', '言ったっけ？|itta kke?'], ans: 0, explain: 'じゃん = “eu não disse?!”.' }
      ]
    },
    {
      id: 'c8l6', title: 'Reações e hesitações', emblem: '相', kind: 'vocab',
      intro: [
        'Japoneses reagem o tempo todo enquanto o outro fala: são os あいづち (aizuchi). Ficar em silêncio pode parecer que você não está ouvindo.',
        'Também existem palavras para ganhar tempo, como “hmm”, “é…”, “tipo”.',
        'Ouvir essas palavras ajuda a acompanhar o ritmo de uma conversa real e de cenas de anime.'
      ],
      tip: 'Experimente responder com へえ！ e そうなんだ！ quando alguém te contar algo.',
      items: [
        { k: 'etto', jp: 'えっと', ro: 'etto', pt: 'hmm, deixa eu ver…', note: 'Para ganhar tempo pensando. Muito comum.' },
        { k: 'anou', jp: 'あのう', ro: 'anou', pt: 'é… / com licença… (hesitante)', note: 'Para começar a falar com timidez ou chamar a atenção com educação.' },
        { k: 'hee', jp: 'へえ', ro: 'hee', pt: 'nossa! / é mesmo?', note: 'Interesse ou surpresa leve. Quanto mais longo, mais impressionado.' },
        { k: 'sounanda', jp: 'そうなんだ', ro: 'sou nan da', pt: 'ah, é mesmo? / entendi', note: 'Casual. Educado: そうなんですか.' },
        { k: 'sousou', jp: 'そうそう', ro: 'sou sou', pt: 'isso, isso!', note: 'Concordar com entusiasmo.' },
        { k: 'tashikani', jp: 'たしかに', ro: 'tashika ni', pt: 'verdade / faz sentido', note: 'Concordar com um argumento.' },
        { k: 'fuun', jp: 'ふーん', ro: 'fuun', pt: 'hum… (sem muito interesse)', note: 'Pode soar desinteressado. Em animes, muitas vezes é provocação.' },
        { k: 'dayone', jp: 'だよね', ro: 'da yo ne', pt: 'né! / pois é!', note: 'Concordar fortemente, casual.' },
        { k: 'teiuka', jp: 'ていうか', ro: 'te iu ka', pt: 'aliás / quer dizer / tipo', note: 'Para corrigir ou mudar o rumo da conversa. Também っていうか.' },
        { k: 'maa', jp: 'まあ', ro: 'maa', pt: 'bem… / enfim…', note: 'Suaviza: まあ、いいか (ah, enfim, tanto faz).' }
      ],
      examples: [
        { jp: '日本に行ったよ。 … へえ！そうなんだ！', say: 'にほんにいったよ。 … へえ！そうなんだ！', ro: 'nihon ni itta yo. … hee! sou nan da!', pt: 'Fui ao Japão. … Nossa! Sério?' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você precisa de um segundo para pensar na resposta. O que diz?', opts: ['えっと…|etto…', 'そうそう！|sou sou!', 'だよね|da yo ne'], ans: 0, explain: 'えっと = hmm, deixa eu ver.' },
        { t: 'situation', prompt: 'Seu amigo conta uma novidade que você não sabia. Como reage?', opts: ['へえ、そうなんだ！|hee, sou nan da!', 'ふーん。|fuun.', 'ていうか…|te iu ka…'], ans: 0, explain: 'へえ + そうなんだ mostra interesse.' },
        { t: 'situation', prompt: 'Qual reação pode soar desinteressada?', opts: ['ふーん|fuun', 'へえ！|hee!', 'たしかに|tashika ni'], ans: 0, explain: 'ふーん curto e seco soa como “tanto faz”.' }
      ]
    }
    ]
  },
  {
    id: 'c9', num: 9, emblem: '敬', title: 'Formalidade e Respeito', jp: 'けいご',
    desc: 'Quem fala com quem: pronomes, sufixos, casual × polido × respeitoso, keigo de loja e linguagem rude.',
    requires: 'c8', soon: [],
    lessons: [
    {
      id: 'c9l1', title: 'Pronomes e o que revelam', emblem: '俺', kind: 'vocab',
      intro: [
        'Em japonês, a palavra que alguém usa para “eu” e “você” diz muito sobre a pessoa e sobre a relação. Você já conhece わたし (neutro) e あなた (você, pouco usado).',
        'Pronomes de “você” podem soar íntimos, superiores ou agressivos. Na dúvida, chame pelo nome + さん.',
        'Esta lição é para RECONHECER. Use わたし e o nome das pessoas até ter segurança.'
      ],
      tip: 'Em animes, o pronome que um personagem usa é parte da personalidade dele.',
      items: [
        { k: 'boku', jp: '僕', say: 'ぼく', ro: 'boku', pt: 'eu (masculino, gentil)', note: 'Usado por meninos e homens em situações casuais ou neutras. Soa educado e um pouco jovem.' },
        { k: 'ore', jp: '俺', say: 'おれ', ro: 'ore', pt: 'eu (masculino, casual e forte)', note: 'Entre amigos. Soa confiante; com superiores, é falta de educação.' },
        { k: 'atashi', jp: 'あたし', ro: 'atashi', pt: 'eu (feminino, casual)', note: 'Versão casual e mais feminina de わたし.' },
        { k: 'watakushi', jp: 'わたくし', ro: 'watakushi', pt: 'eu (muito formal)', note: 'Discursos, negócios, atendimento. Mesmo kanji de わたし: 私.' },
        { k: 'kimi', jp: '君', say: 'きみ', ro: 'kimi', pt: 'você (íntimo ou de cima para baixo)', note: 'De um superior para alguém mais novo, ou entre namorados. Muito usado em músicas.' },
        { k: 'omae', jp: 'お前', say: 'おまえ', ro: 'omae', pt: 'você (masculino, rude ou muito íntimo)', note: 'Entre amigos homens bem próximos. Para estranhos, é agressivo.' },
        { k: 'anta', jp: 'あんた', ro: 'anta', pt: 'você (casual, pode soar ríspido)', note: 'Forma contraída de あなた. Muitas vezes soa irritado.' },
        { k: 'temee', jp: 'てめえ', ro: 'temee', pt: 'você (muito rude, briga)', note: 'Insulto em brigas. Só para reconhecer em animes, nunca para usar.' }
      ],
      examples: [
        { jp: '俺は行く。お前は？', say: 'おれはいく。おまえは？', ro: 'ore wa iku. omae wa?', pt: 'Eu vou. E você? (entre amigos homens)' },
        { jp: 'わたくし、田中と申します。', say: 'わたくし、たなかともうします。', ro: 'watakushi, Tanaka to moushimasu.', pt: 'Eu me chamo Tanaka. (muito formal)' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Numa entrevista de emprego, qual “eu” é mais adequado?', opts: ['わたくし|watakushi', '俺|ore', 'あたし|atashi'], ans: 0, explain: 'わたくし (ou わたし) para situações formais. 俺 seria rude.' },
        { t: 'situation', prompt: 'Num anime, um vilão grita てめえ！ Que tom é esse?', opts: ['Muito rude, agressivo', 'Carinhoso', 'Formal e respeitoso'], ans: 0, explain: 'てめえ é um “você” de briga.' },
        { t: 'situation', prompt: 'Qual “eu” é masculino, mas gentil e neutro?', opts: ['僕|boku', '俺|ore', 'わたくし|watakushi'], ans: 0, explain: '僕 soa educado e gentil.' }
      ]
    },
    {
      id: 'c9l2', title: 'Sufixos de tratamento', emblem: '様', kind: 'vocab', noListen: true,
      intro: [
        'Depois do nome vem um sufixo que mostra a relação. さん é o mais seguro e serve para quase todos.',
        'Nunca use sufixo depois do seu próprio nome.',
        'Chamar alguém sem sufixo (呼び捨て, yobisute) mostra muita intimidade, ou falta de respeito.'
      ],
      tip: 'Você já viu 先輩 (senpai) e 先生 (sensei) funcionando como sufixo: 田中先輩, 田中先生.',
      items: [
        { k: 'san', jp: '〜さん', say: 'たなかさん', ro: '~san', pt: 'sufixo neutro e educado (Sr., Sra.)', note: 'Serve para colegas, desconhecidos, vizinhos. Na dúvida, use さん.' },
        { k: 'kun', jp: '〜くん', say: 'たなかくん', ro: '~kun', pt: 'sufixo para garotos e homens mais novos', note: 'Professores e chefes também usam com subordinados.' },
        { k: 'chan', jp: '〜ちゃん', say: 'あおいちゃん', ro: '~chan', pt: 'sufixo carinhoso (crianças, amigas, animais)', note: 'Para crianças, amigas próximas e pets. Para um adulto que você não conhece, soa estranho.' },
        { k: 'sama', jp: '〜様', say: 'たなかさま', ro: '~sama', pt: 'sufixo muito respeitoso', note: 'Clientes, cartas formais e deuses. Em animes, servos para mestres.' },
        { k: 'dono', jp: '〜殿', say: 'たなかどの', ro: '~dono', pt: 'sufixo antigo e cerimonioso', note: 'Hoje quase só em documentos ou em falas de samurais.' },
        { k: 'okyakusama', jp: 'お客様', say: 'おきゃくさま', ro: 'okyakusama', pt: 'cliente, freguês (respeitoso)', note: 'Como funcionários se referem aos clientes.' },
        { k: 'yobisute', jp: '呼び捨て', say: 'よびすて', ro: 'yobisute', pt: 'chamar alguém sem sufixo', note: 'Entre amigos íntimos e família. Com outras pessoas, soa grosseiro.' }
      ],
      examples: [
        { jp: 'アオイちゃん、レンくん、おはよう！', say: 'あおいちゃん、れんくん、おはよう！', ro: 'Aoi-chan, Ren-kun, ohayou!', pt: 'Bom dia, Aoi e Ren! (tom carinhoso)' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você vai falar com um vizinho que acabou de conhecer. Qual sufixo usa?', opts: ['〜さん|~san', '〜ちゃん|~chan', 'sem sufixo'], ans: 0, explain: 'さん é o mais seguro.' },
        { t: 'situation', prompt: 'Uma loja escreve “お客様へ”. Para quem é o aviso?', opts: ['Para os clientes', 'Para os funcionários', 'Para as crianças'], ans: 0, explain: 'お客様 = clientes (respeitoso).' },
        { t: 'error', ctx: 'Você se apresenta: “Sou o Lucas.”', tokens: ['ルカスさん|Rukasu-san', 'です|desu'], wrong: 0, explain: 'Nunca use さん no próprio nome: ルカスです.' }
      ]
    },
    {
      id: 'c9l3', title: 'Casual, polido e respeitoso', emblem: '段', kind: 'grammar',
      intro: [
        'A mesma ideia muda conforme quem ouve. Casual: amigos e família. Polido (です/ます): desconhecidos, colegas, professores. Respeitoso (尊敬語, sonkeigo): clientes e superiores, elevando a ação da OUTRA pessoa.',
        'O respeitoso troca o verbo: 行く/来る/いる → いらっしゃる, 食べる → 召し上がる, 言う → おっしゃる.',
        'Nesta lição, cada frase aparece nos três níveis. Ouça a diferença de tamanho e de tom.'
      ],
      tip: 'Você só precisa FALAR casual e polido por enquanto. O respeitoso é para reconhecer em lojas, trabalho e animes.',
      items: [
        { k: 's1', jp: '行く？', say: 'いく？', ro: 'iku?', pt: 'Você vai? (casual)', note: 'Entre amigos.' },
        { k: 's2', jp: '行きますか。', say: 'いきますか。', ro: 'ikimasu ka.', pt: 'Você vai? (polido)', note: 'Padrão educado.' },
        { k: 's3', jp: 'いらっしゃいますか。', say: 'いらっしゃいますか。', ro: 'irasshaimasu ka.', pt: 'O(a) senhor(a) vai? (respeitoso)', note: 'いらっしゃる = ir/vir/estar, respeitoso. Mesmo verbo de いらっしゃいませ.' },
        { k: 's4', jp: '食べる？', say: 'たべる？', ro: 'taberu?', pt: 'Vai comer? (casual)', note: '' },
        { k: 's5', jp: '食べますか。', say: 'たべますか。', ro: 'tabemasu ka.', pt: 'Vai comer? (polido)', note: '' },
        { k: 's6', jp: '召し上がりますか。', say: 'めしあがりますか。', ro: 'meshiagarimasu ka.', pt: 'O(a) senhor(a) vai comer? (respeitoso)', note: '召し上がる = comer/beber, respeitoso.' },
        { k: 's7', jp: '何て言った？', say: 'なんていった？', ro: 'nante itta?', pt: 'O que você disse? (casual)', note: '何て = 何と (o quê), falado.' },
        { k: 's8', jp: '何と言いましたか。', say: 'なんといいましたか。', ro: 'nan to iimashita ka.', pt: 'O que você disse? (polido)', note: '' },
        { k: 's9', jp: '何とおっしゃいましたか。', say: 'なんとおっしゃいましたか。', ro: 'nan to osshaimashita ka.', pt: 'O que o(a) senhor(a) disse? (respeitoso)', note: 'おっしゃる = dizer, respeitoso.' }
      ],
      examples: [
        { jp: '先生も いらっしゃいますか。', say: 'せんせいも いらっしゃいますか。', ro: 'sensei mo irasshaimasu ka.', pt: 'O(a) professor(a) também vem?' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você oferece comida ao chefe numa festa da empresa. Qual frase?', opts: ['召し上がりますか|meshiagarimasu ka', '食べる？|taberu?', '食べろ|tabero'], ans: 0, explain: 'Para um superior, o respeitoso 召し上がる.' },
        { t: 'situation', prompt: 'Qual é a versão casual de 行きますか?', opts: ['行く？|iku?', 'いらっしゃいますか|irasshaimasu ka', '行け|ike'], ans: 0, explain: 'Casual = forma de dicionário com entonação de pergunta.' },
        { t: 'situation', prompt: 'おっしゃる é a forma respeitosa de qual verbo?', opts: ['言う (dizer)|iu', '行く (ir)|iku', '見る (ver)|miru'], ans: 0, explain: 'おっしゃる = dizer (respeitoso).' }
      ]
    },
    {
      id: 'c9l4', title: 'Keigo de loja e trabalho', emblem: '店', kind: 'vocab',
      intro: [
        'Em lojas, restaurantes e no trabalho você ouve frases fixas em linguagem respeitosa e humilde. Elas soam longas e rápidas, mas são sempre as mesmas.',
        'O funcionário eleva o cliente e rebaixa a si mesmo. Você, como cliente, pode responder de forma simples e educada.',
        'Reconhecer estas frases pelo ouvido torna qualquer compra no Japão muito mais tranquila.'
      ],
      tip: 'Se ouvir かしこまりました, deu certo: o pedido foi entendido.',
      items: [
        { k: 'irasshaimase', jp: 'いらっしゃいませ', ro: 'irasshaimase', pt: 'Seja bem-vindo(a)! (em lojas)', note: 'Os funcionários dizem ao cliente entrar. Não é preciso responder.' },
        { k: 'kashikomarimashita', jp: 'かしこまりました', ro: 'kashikomarimashita', pt: 'Entendido, perfeitamente.', note: 'Versão humilde de わかりました, dita ao cliente ou ao chefe.' },
        { k: 'shoushou', jp: '少々お待ちください', say: 'しょうしょうおまちください', ro: 'shoushou omachi kudasai', pt: 'Aguarde um momento, por favor.', note: 'Versão formal de ちょっと待って.' },
        { k: 'moushiwake', jp: '申し訳ございません', say: 'もうしわけございません', ro: 'moushiwake gozaimasen', pt: 'Peço sinceras desculpas.', note: 'Desculpa muito formal, de empresa para cliente.' },
        { k: 'osoreirimasu', jp: '恐れ入ります', say: 'おそれいります', ro: 'osoreirimasu', pt: 'Com sua licença / Agradeço muito.', note: 'Muito educado: para pedir algo com delicadeza ou agradecer.' },
        { k: 'shitsurei', jp: '失礼します', say: 'しつれいします', ro: 'shitsurei shimasu', pt: 'Com licença (ao entrar ou sair).', note: 'Ao entrar na sala de um professor, ao desligar o telefone, ao sair do trabalho.' },
        { k: 'moushimasu', noListen: true, jp: '〜と申します', say: 'たなかともうします', ro: '~to moushimasu', pt: 'meu nome é ~ (humilde)', note: 'Versão humilde de 〜です para se apresentar.' },
        { k: 'degozaimasu', noListen: true, jp: '〜でございます', say: 'こちらでございます', ro: '~de gozaimasu', pt: 'é ~ (muito formal)', note: 'Versão muito formal de です. こちらでございます = Aqui está / É por aqui.' },
        { k: 'yoroshii', jp: 'よろしいでしょうか', ro: 'yoroshii deshou ka', pt: 'Está tudo bem? / Posso?', note: 'Versão formal de いいですか.' }
      ],
      examples: [
        { jp: 'ご注文は以上でよろしいでしょうか。', say: 'ごちゅうもんはいじょうでよろしいでしょうか。', ro: 'gochuumon wa ijou de yoroshii deshou ka.', pt: 'Seu pedido é só isso?' }
      ],
      exercises: [
        { t: 'situation', prompt: 'O atendente diz かしこまりました depois do seu pedido. O que significa?', opts: ['Entendido', 'Acabou', 'Desculpe'], ans: 0, explain: 'かしこまりました = entendido (humilde).' },
        { t: 'situation', prompt: 'Você sai da sala do professor. O que diz?', opts: ['失礼します|shitsurei shimasu', 'いらっしゃいませ|irasshaimase', 'かしこまりました|kashikomarimashita'], ans: 0, explain: '失礼します ao entrar e ao sair.' },
        { t: 'situation', prompt: '少々お待ちください é a versão formal de…', opts: ['ちょっと待って|chotto matte', 'もう一度|mou ichido', 'ありがとう|arigatou'], ans: 0, explain: 'Aguarde um momento = ちょっと待って.' }
      ]
    },
    {
      id: 'c9l5', title: 'Japonês rude (só para reconhecer)', emblem: '怒', kind: 'vocab',
      intro: [
        'Animes de ação estão cheios de fala agressiva. Esta lição é para ENTENDER o que está sendo dito, não para usar: com pessoas reais, estas palavras ofendem.',
        'Duas marcas da fala rude: o imperativo seco (黙れ, どけ, 消えろ) e a troca do som “ai” por “ee”: うるさい → うるせえ, すごい → すげえ.',
        '〜やがる é colocado depois do verbo para mostrar desprezo pela ação de alguém.'
      ],
      tip: 'Se ouvir um “ee” arrastado no fim de um adjetivo, provavelmente é um personagem durão falando.',
      items: [
        { k: 'urusee', jp: 'うるせえ', ro: 'urusee', pt: 'Cala a boca! / Que saco!', note: 'Versão rude de うるさい (ai → ee).' },
        { k: 'fuzakeruna', jp: 'ふざけるな', ro: 'fuzakeru na', pt: 'Não brinca comigo! / Pare com isso!', note: 'Verbo + な = proibição seca. Mais rude ainda: ざけんな.' },
        { k: 'damare', jp: '黙れ', say: 'だまれ', ro: 'damare', pt: 'Cale-se!', note: 'Imperativo de 黙る (calar-se).' },
        { k: 'doke', jp: 'どけ', ro: 'doke', pt: 'Sai da frente!', note: 'Imperativo de どく (sair do caminho).' },
        { k: 'kiero', jp: '消えろ', say: 'きえろ', ro: 'kiero', pt: 'Some daqui! / Desapareça!', note: 'Imperativo de 消える (desaparecer).' },
        { k: 'kuso', jp: 'くそ', ro: 'kuso', pt: 'Droga! / Merda!', note: 'Palavrão de frustração. Muito comum em lutas.' },
        { k: 'chikushou', jp: 'ちくしょう', ro: 'chikushou', pt: 'Maldição! / Droga!', note: 'Frustração forte. Na fala: ちきしょう.' },
        { k: 'namenna', jp: 'なめるな', ro: 'nameru na', pt: 'Não me subestime!', note: 'なめる = lamber, e também menosprezar alguém. Falado: なめんな.' },
        { k: 'yagaru', noListen: true, jp: '〜やがる', say: 'わらいやがって', ro: '~yagaru', pt: 'sufixo de desprezo pela ação de alguém', note: '笑いやがって = “rindo de mim, desgraçado”.' }
      ],
      examples: [
        { jp: 'すげえ！', say: 'すげえ！', ro: 'sugee!', pt: 'Que demais! (versão rude e empolgada de すごい)' }
      ],
      exercises: [
        { t: 'situation', prompt: 'うるせえ é a versão rude de…', opts: ['うるさい|urusai', 'うれしい|ureshii', 'うそ|uso'], ans: 0, explain: 'ai → ee: うるさい → うるせえ.' },
        { t: 'situation', prompt: 'Num anime, alguém empurra o outro gritando どけ！ O que significa?', opts: ['Sai da frente!', 'Fique aí!', 'Obrigado!'], ans: 0, explain: 'どけ = sai do caminho!' },
        { t: 'situation', prompt: 'Com um colega de trabalho irritante, o que é adequado?', opts: ['ちょっと静かにしてもらえますか|chotto shizuka ni shite moraemasu ka', '黙れ！|damare!', 'うるせえ！|urusee!'], ans: 0, explain: 'Na vida real, peça com educação. As formas rudes são só para reconhecer.' }
      ]
    }
    ]
  },
  {
    id: 'c10', num: 10, emblem: '劇', title: 'Japonês dos Animes', jp: 'アニメのにほんご',
    desc: 'Frases de batalha, jeitos de falar dos personagens, emoções fortes, onomatopeias e vida escolar.',
    requires: 'c9', soon: [],
    lessons: [
    {
      id: 'c10l1', title: 'Determinação e batalha', emblem: '戦', kind: 'grammar',
      intro: [
        'Cenas de luta usam frases curtas e fortes, quase sempre na forma casual.',
        'ぞ e ぜ no final dão força e confiança (fala masculina). O imperativo (逃げろ, 走れ) dá ordens urgentes.',
        'Várias frases usam formas que você já aprendeu: 負けない (negativo casual), 信じてる (〜ている encurtado).'
      ],
      tip: 'Repare em quantas falas de luta são negativas: 負けない, 諦めない, 許さない.',
      items: [
        { k: 's1', jp: '行くぞ！', say: 'いくぞ！', ro: 'iku zo!', pt: 'Lá vou eu! / Vamos lá!', note: 'ぞ = ênfase forte, aviso.' },
        { k: 's2', jp: '負けない！', say: 'まけない！', ro: 'makenai!', pt: 'Não vou perder!', note: '負ける (perder) → 負けない.' },
        { k: 's3', jp: '絶対に勝つ！', say: 'ぜったいにかつ！', ro: 'zettai ni katsu!', pt: 'Vou vencer, com certeza!', note: '勝つ = vencer. 絶対に = com certeza absoluta.' },
        { k: 's4', jp: '逃げろ！', say: 'にげろ！', ro: 'nigero!', pt: 'Fuja! / Corram!', note: 'Imperativo de 逃げる.' },
        { k: 's5', jp: '助けて！', say: 'たすけて！', ro: 'tasukete!', pt: 'Socorro! / Me ajuda!', note: 'Forma て de 助ける (ajudar, salvar).' },
        { k: 's6', jp: 'まだだ！', say: 'まだだ！', ro: 'mada da!', pt: 'Ainda não acabou!', note: 'Fala clássica de quem se levanta depois de cair.' },
        { k: 's7', jp: '信じてる。', say: 'しんじてる。', ro: 'shinjiteru.', pt: 'Eu acredito em você.', note: '信じている → 信じてる.' },
        { k: 's8', jp: '許さない！', say: 'ゆるさない！', ro: 'yurusanai!', pt: 'Não vou te perdoar!', note: '許す (perdoar) → 許さない.' }
      ],
      examples: [
        { jp: 'みんな、逃げろ！ここは俺に任せろ！', say: 'みんな、にげろ！ここはおれにまかせろ！', ro: 'minna, nigero! koko wa ore ni makasero!', pt: 'Pessoal, fujam! Deixem isto comigo!' }
      ],
      exercises: [
        { t: 'situation', prompt: 'O herói, caído, se levanta e diz まだだ！ O que quer dizer?', opts: ['Ainda não acabou!', 'Já era!', 'Me ajuda!'], ans: 0, explain: 'まだ = ainda. まだだ = ainda não (acabou).' },
        { t: 'situation', prompt: 'Qual frase pede socorro?', opts: ['助けて！|tasukete!', '逃げろ！|nigero!', '行くぞ！|iku zo!'], ans: 0, explain: '助けて = me ajuda!' },
        { t: 'translate', jp: '負けない！', ro: 'makenai!', tiles: ['Não', 'vou', 'perder!'], extra: ['Vou', 'fugir!'], explain: '負ける (perder) no negativo.' }
      ]
    },
    {
      id: 'c10l2', title: 'Jeitos de falar dos personagens', emblem: '役', kind: 'grammar',
      intro: [
        'Animes usam “jeitos de falar” prontos para mostrar quem é o personagem: o samurai antigo, o velho sábio, a moça rica, o colega mais novo. Em japonês isso se chama 役割語 (yakuwarigo).',
        'Muitas dessas formas quase não existem na vida real, ou são de outras regiões (como o dialeto de Kansai).',
        'Entender esses finais ajuda a perceber a personalidade e a relação entre os personagens.'
      ],
      tip: 'Ouviu でござる? Samurai. のじゃ? Velho sábio. ですわ? Moça de família rica.',
      items: [
        { k: 's1', jp: '行こうぜ！', say: 'いこうぜ！', ro: 'ikou ze!', pt: 'Bora! (masculino, confiante)', note: 'ぜ = convite ou afirmação masculina e animada.' },
        { k: 's2', jp: '素敵だわ。', say: 'すてきだわ。', ro: 'suteki da wa.', pt: 'Que lindo. (feminino tradicional)', note: 'わ no final, com entonação subindo, é fala feminina mais clássica.' },
        { k: 's3', jp: '大丈夫かしら。', say: 'だいじょうぶかしら。', ro: 'daijoubu kashira.', pt: 'Será que está tudo bem? (feminino)', note: 'かしら = versão feminina de かな.' },
        { k: 's4', jp: '拙者は侍でござる。', say: 'せっしゃはさむらいでござる。', ro: 'sessha wa samurai de gozaru.', pt: 'Eu sou um samurai. (fala de samurai)', note: '拙者 = eu (humilde, antigo). でござる = です antigo.' },
        { k: 's5', jp: 'わしは知らんのじゃ。', say: 'わしはしらんのじゃ。', ro: 'washi wa shiran no ja.', pt: 'Eu não sei. (fala de velho)', note: 'わし = eu (homem idoso). 知らん = 知らない. じゃ = だ.' },
        { k: 's6', jp: '了解っす！', say: 'りょうかいっす！', ro: 'ryoukai ssu!', pt: 'Entendido! (colega mais novo)', note: 'っす = です encurtado: respeito descontraído, típico de kouhai.' },
        { k: 's7', jp: 'ごきげんよう。', say: 'ごきげんよう。', ro: 'gokigen you.', pt: 'Saudações. (moça refinada)', note: 'Cumprimento elegante, típico de escolas de elite em animes.' },
        { k: 's8', jp: 'なんでやねん！', say: 'なんでやねん！', ro: 'nande ya nen!', pt: 'Por que isso?! / Que absurdo! (Kansai)', note: 'Dialeto de Kansai (Osaka). A “bronca” clássica da comédia japonesa.' },
        { k: 's9', jp: 'ほんまに？', say: 'ほんまに？', ro: 'honma ni?', pt: 'Sério? (Kansai)', note: 'ほんま = 本当 no dialeto de Kansai.' }
      ],
      examples: [
        { jp: 'そうでござるか。', say: 'そうでござるか。', ro: 'sou de gozaru ka.', pt: 'É mesmo? (fala de samurai)' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Um personagem termina as frases com でござる. Quem ele provavelmente é?', opts: ['Um samurai à moda antiga', 'Uma estudante moderna', 'Um robô'], ans: 0, explain: 'でござる é o jeito de falar clássico de samurais.' },
        { t: 'situation', prompt: '了解っす！ soa como…', opts: ['Um colega mais novo, descontraído', 'Um rei', 'Uma senhora idosa'], ans: 0, explain: 'っす = です encurtado, típico de kouhai.' },
        { t: 'situation', prompt: 'なんでやねん！ é de qual região?', opts: ['Kansai (Osaka)', 'Tóquio', 'Hokkaido'], ans: 0, explain: 'やねん é marca do dialeto de Kansai.' }
      ]
    },
    {
      id: 'c10l3', title: 'Emoções e reações fortes', emblem: '感', kind: 'vocab',
      intro: [
        'Estas palavras aparecem em quase todo episódio. Muitas mudam de sentido conforme o tom de voz.',
        'やばい é o exemplo perfeito: pode ser “perigo!”, “droga!” ou “incrível!”. Só o contexto diz.',
        'Ouça o tom: alegria, frustração, vergonha e surpresa soam bem diferentes.'
      ],
      tip: 'くやしい não tem tradução exata: é a raiva de ter perdido ou falhado, misturada com vontade de melhorar.',
      items: [
        { k: 'yabai', jp: 'やばい', ro: 'yabai', pt: 'perigo! / droga! / incrível!', note: 'Gíria muito versátil. Casual.' },
        { k: 'shimatta', jp: 'しまった', ro: 'shimatta', pt: 'Droga! Errei! / Ops!', note: 'Quando você percebe um erro.' },
        { k: 'hidoi', jp: 'ひどい', ro: 'hidoi', pt: 'Que cruel! / Que horrível!', note: 'Para algo injusto ou maldoso.' },
        { k: 'zurui', jp: 'ずるい', ro: 'zurui', pt: 'Que injusto! / Trapaceiro!', note: 'Quando alguém leva vantagem: ずるい！ (não vale!).' },
        { k: 'mou', jp: 'もう！', ro: 'mou!', pt: 'Ai, que coisa! / Poxa!', note: 'Irritação leve, muitas vezes fofa.' },
        { k: 'masaka', jp: 'まさか', ro: 'masaka', pt: 'Não pode ser! / Será possível?', note: 'Surpresa diante de algo inacreditável.' },
        { k: 'ureshii', jp: 'うれしい', ro: 'ureshii', pt: 'que alegria, estou feliz', note: 'Felicidade por algo que aconteceu.' },
        { k: 'kuyashii', jp: '悔しい', say: 'くやしい', ro: 'kuyashii', pt: 'que raiva (de ter perdido)', note: 'Frustração de perder, com vontade de revanche.' },
        { k: 'hazukashii', jp: '恥ずかしい', say: 'はずかしい', ro: 'hazukashii', pt: 'que vergonha, estou envergonhado(a)', note: 'Constrangimento ou timidez.' },
        { k: 'sasuga', jp: 'さすが', ro: 'sasuga', pt: 'como esperado de você! / mandou bem!', note: 'Elogio a alguém que fez jus à fama: さすが先輩！' }
      ],
      examples: [
        { jp: 'やばい、遅刻する！', say: 'やばい、ちこくする！', ro: 'yabai, chikoku suru!', pt: 'Droga, vou chegar atrasado!' },
        { jp: 'このケーキ、やばい！', say: 'このケーキ、やばい！', ro: 'kono keeki, yabai!', pt: 'Este bolo é incrível!' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você percebe que esqueceu a carteira em casa. O que diz?', opts: ['しまった！|shimatta!', 'さすが！|sasuga!', 'うれしい！|ureshii!'], ans: 0, explain: 'しまった = ops, errei!' },
        { t: 'situation', prompt: 'O colega resolve o problema difícil, como sempre. Você diz…', opts: ['さすが！|sasuga!', 'ずるい！|zurui!', 'まさか！|masaka!'], ans: 0, explain: 'さすが = como esperado de você.' },
        { t: 'situation', prompt: 'Seu time perdeu por um ponto. Que palavra expressa o sentimento?', opts: ['悔しい|kuyashii', '恥ずかしい|hazukashii', 'うれしい|ureshii'], ans: 0, explain: '悔しい = raiva de ter perdido.' }
      ]
    },
    {
      id: 'c10l4', title: 'Onomatopeias', emblem: '音', kind: 'vocab',
      intro: [
        'O japonês tem milhares de onomatopeias. Elas descrevem não só sons, mas também sentimentos e estados: o coração batendo, a empolgação, a irritação.',
        'Muitas são uma sílaba dupla repetida: ドキドキ, ワクワク. São escritas em katakana ou em hiragana.',
        'Nos mangás elas aparecem desenhadas no fundo da cena. Nos animes, faladas pelos personagens.'
      ],
      tip: 'Use com する: ドキドキする (fico com o coração acelerado), イライラする (fico irritado).',
      items: [
        { k: 'dokidoki', jp: 'ドキドキ', ro: 'dokidoki', pt: 'coração acelerado (nervoso ou apaixonado)', note: 'Antes de uma prova ou perto de quem você gosta.' },
        { k: 'wakuwaku', jp: 'ワクワク', ro: 'wakuwaku', pt: 'empolgação, ansiedade boa', note: 'Antes de uma viagem, de um episódio novo…' },
        { k: 'iraira', jp: 'イライラ', ro: 'iraira', pt: 'irritação', note: 'イライラする = ficar irritado.' },
        { k: 'nikoniko', jp: 'ニコニコ', ro: 'nikoniko', pt: 'sorrindo, sorridente', note: 'Sorriso alegre e simpático.' },
        { k: 'niyaniya', jp: 'ニヤニヤ', ro: 'niyaniya', pt: 'sorrisinho malicioso', note: 'Sorriso de quem está tramando algo ou provocando.' },
        { k: 'kirakira', jp: 'キラキラ', ro: 'kirakira', pt: 'brilhando, cintilante', note: 'Estrelas, olhos brilhando de emoção.' },
        { k: 'gorogoro', jp: 'ゴロゴロ', ro: 'gorogoro', pt: 'à toa, rolando (também trovão)', note: '家でゴロゴロする = ficar largado em casa.' },
        { k: 'shiin', jp: 'シーン', ro: 'shiin', pt: 'silêncio total', note: 'O “som” do silêncio constrangedor depois de uma piada ruim.' },
        { k: 'batabata', jp: 'バタバタ', ro: 'batabata', pt: 'correria, agitação', note: 'Passos apressados, dia corrido.' },
        { k: 'gussuri', jp: 'ぐっすり', ro: 'gussuri', pt: 'dormir profundamente', note: 'ぐっすり寝た = dormi como uma pedra.' }
      ],
      examples: [
        { jp: '明日から旅行！ワクワクする！', say: 'あしたからりょこう！ワクワクする！', ro: 'ashita kara ryokou! wakuwaku suru!', pt: 'Amanhã começa a viagem! Que empolgação!' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Você está nervoso antes de se declarar. Que onomatopeia descreve?', opts: ['ドキドキ|dokidoki', 'ゴロゴロ|gorogoro', 'シーン|shiin'], ans: 0, explain: 'ドキドキ = coração acelerado.' },
        { t: 'situation', prompt: 'Alguém conta uma piada e ninguém ri. Qual onomatopeia?', opts: ['シーン|shiin', 'キラキラ|kirakira', 'ワクワク|wakuwaku'], ans: 0, explain: 'シーン = silêncio total.' },
        { t: 'situation', prompt: 'Passar o domingo deitado no sofá é…', opts: ['ゴロゴロする|gorogoro suru', 'バタバタする|batabata suru', 'イライラする|iraira suru'], ans: 0, explain: 'ゴロゴロ = ficar à toa, rolando.' }
      ]
    },
    {
      id: 'c10l5', title: 'Vida escolar', emblem: '校', kind: 'vocab',
      intro: [
        'Muitos animes se passam em escolas japonesas. Algumas palavras e eventos não existem no Brasil do mesmo jeito.',
        'Clubes (部活) são parte enorme da vida do aluno. Festivais culturais e esportivos acontecem todo ano.',
        'A hierarquia entre veteranos (先輩) e calouros (後輩) é levada a sério.'
      ],
      tip: 'O terraço da escola (屋上) é o lugar clássico de conversas importantes nos animes.',
      items: [
        { k: 'bukatsu', jp: '部活', say: 'ぶかつ', ro: 'bukatsu', pt: 'atividade de clube', note: 'Clubes de esporte, música, arte… depois das aulas.' },
        { k: 'houkago', jp: '放課後', say: 'ほうかご', ro: 'houkago', pt: 'depois da aula', note: 'O período livre depois das aulas.' },
        { k: 'bunkasai', jp: '文化祭', say: 'ぶんかさい', ro: 'bunkasai', pt: 'festival cultural da escola', note: 'Cada turma monta uma atração: café, casa mal-assombrada, peça.' },
        { k: 'kouhai', jp: '後輩', say: 'こうはい', ro: 'kouhai', pt: 'calouro, colega mais novo', note: 'O oposto de 先輩 (senpai).' },
        { k: 'kokuhaku', jp: '告白', say: 'こくはく', ro: 'kokuhaku', pt: 'declaração (de amor)', note: 'Cena clássica: 告白する = declarar-se.' },
        { k: 'okujou', jp: '屋上', say: 'おくじょう', ro: 'okujou', pt: 'terraço, telhado', note: 'Onde personagens almoçam ou se declaram.' },
        { k: 'tenkousei', jp: '転校生', say: 'てんこうせい', ro: 'tenkousei', pt: 'aluno transferido', note: 'O aluno novo que chega no meio do ano.' },
        { k: 'kyoushitsu', jp: '教室', say: 'きょうしつ', ro: 'kyoushitsu', pt: 'sala de aula', note: '教 (ensinar) + 室 (sala).' },
        { k: 'seitokai', jp: '生徒会', say: 'せいとかい', ro: 'seitokai', pt: 'conselho estudantil', note: 'Em animes, costuma ter muito poder na escola.' },
        { k: 'natsuyasumi', jp: '夏休み', say: 'なつやすみ', ro: 'natsuyasumi', pt: 'férias de verão', note: 'No Japão, de fim de julho até o fim de agosto.' }
      ],
      examples: [
        { jp: '放課後、屋上に来て。', say: 'ほうかご、おくじょうにきて。', ro: 'houkago, okujou ni kite.', pt: 'Depois da aula, venha ao terraço.' }
      ],
      exercises: [
        { t: 'situation', prompt: 'Alguém diz 放課後、屋上に来て. Quando e onde?', opts: ['Depois da aula, no terraço', 'Antes da aula, na sala', 'Nas férias, na praia'], ans: 0, explain: '放課後 = depois da aula; 屋上 = terraço.' },
        { t: 'situation', prompt: 'Como um aluno do 1º ano chama alguém do 3º ano do mesmo clube?', opts: ['先輩|senpai', '後輩|kouhai', '転校生|tenkousei'], ans: 0, explain: 'O mais velho é 先輩; o mais novo, 後輩.' },
        { t: 'situation', prompt: 'O que é 告白?', opts: ['Declaração de amor', 'Prova final', 'Festival esportivo'], ans: 0, explain: '告白 = declarar-se para alguém.' }
      ]
    }
    ]
  });

  /* ---------------- ordem do mapa: as trilhas se intercalam ---------------- */
  const ORDER = ['c1', 'c4', 'c2', 'c5', 'c3', 'c6', 'c8', 'c7', 'c9', 'c10'];
  CATS.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  CATS.forEach((c, i) => { c.num = i + 1; });

  /* ---------------- Academia Auditiva: palavras e pares de som ---------------- */
  const pack = id => AUDIO_PACKS.find(p => p.id === id);
  pack('aud-pal').items.push(
    { k: 'kiite', jp: '聞いて', say: 'きいて', ro: 'kiite', pt: 'escute! / pergunte!', lv: 1, note: '“i” longo: kii-te. Compare com 来て (kite, venha).' },
    { k: 'chizu', jp: '地図', say: 'ちず', ro: 'chizu', pt: 'mapa', lv: 1, note: '“i” curto: chi-zu.' },
    { k: 'chiizu', jp: 'チーズ', say: 'チーズ', ro: 'chiizu', pt: 'queijo', lv: 1, note: '“i” longo: chii-zu. Do inglês “cheese”.' },
    { k: 'biru', jp: 'ビル', say: 'ビル', ro: 'biru', pt: 'prédio', lv: 1, note: '“i” curto: bi-ru. Do inglês “building”.' },
    { k: 'biiru', jp: 'ビール', say: 'ビール', ro: 'biiru', pt: 'cerveja', lv: 1, note: '“i” longo: bii-ru. Uma vogal a mais e muda tudo!' },
    { k: 'heya', jp: '部屋', say: 'へや', ro: 'heya', pt: 'quarto, cômodo', lv: 2, note: '“e” curto: he-ya.' },
    { k: 'heiya', jp: '平野', say: 'へいや', ro: 'heiya', pt: 'planície', lv: 2, note: 'O “ei” soa como um “e” longo: hee-ya.' },
    { k: 'kita', jp: '来た', say: 'きた', ro: 'kita', pt: 'veio, chegou', lv: 2, note: 'Sem pausa: ki-ta.' },
    { k: 'kitta', jp: '切った', say: 'きった', ro: 'kitta', pt: 'cortou', lv: 2, note: 'Com pausa: kit-ta.' },
    { k: 'saki', jp: '先', say: 'さき', ro: 'saki', pt: 'antes; à frente', lv: 2, note: 'Sem pausa: sa-ki. 先に行って = vai na frente.' },
    { k: 'sakki', jp: 'さっき', say: 'さっき', ro: 'sakki', pt: 'agora há pouco', lv: 2, note: 'Com pausa: sak-ki.' },
    { k: 'jiyuu', jp: '自由', say: 'じゆう', ro: 'jiyuu', pt: 'liberdade', lv: 3, note: 'Três sons: ji-yu-u. Compare com じゅう (juu, dez), que é um som só.' },
    { k: 'mate', jp: '待て', say: 'まて', ro: 'mate', pt: 'Espera! (ordem seca)', lv: 3, note: 'Sem pausa: ma-te. Imperativo, comum em perseguições de anime.' },
    { k: 'matte', jp: '待って', say: 'まって', ro: 'matte', pt: 'espera (pedido)', lv: 3, note: 'Com pausa: mat-te. Pedido, mais suave que 待て.' }
  );
  PRON_SETS.push(
    { id: 'kiite', lv: 1, ids: ['aud-pal:kite', 'aud-pal:kiite'] },
    { id: 'chizu', lv: 1, ids: ['aud-pal:chizu', 'aud-pal:chiizu'] },
    { id: 'biru', lv: 1, ids: ['aud-pal:biru', 'aud-pal:biiru'] },
    { id: 'heya', lv: 2, ids: ['aud-pal:heya', 'aud-pal:heiya'] },
    { id: 'kitta', lv: 2, ids: ['aud-pal:kita', 'aud-pal:kitta'] },
    { id: 'sakki', lv: 2, ids: ['aud-pal:saki', 'aud-pal:sakki'] },
    { id: 'jiyuu', lv: 3, ids: ['aud-pal:jiyuu', 'c1l1:10'] },
    { id: 'mate', lv: 3, ids: ['aud-pal:mate', 'aud-pal:matte'] }
  );

  /* ---------------- Expressões do Cotidiano ---------------- */
  pack('aud-expr').items.push(
    { k: 'hisashiburi', jp: '久しぶり', say: 'ひさしぶり', ro: 'hisashiburi', pt: 'Quanto tempo! (sem se ver)', lv: 1, when: 'Ao reencontrar alguém depois de muito tempo.', formal: 'Informal. Mais educado: お久しぶりです (ohisashiburi desu).', ex: { jp: '久しぶり！元気だった？', ro: 'hisashiburi! genki datta?', pt: 'Quanto tempo! Você estava bem?' } },
    { k: 'ojamashimasu', jp: 'お邪魔します', say: 'おじゃまします', ro: 'ojama shimasu', pt: 'Com licença (ao entrar na casa de alguém)', lv: 2, when: 'Ao entrar na casa de outra pessoa. Literalmente “vou atrapalhar”.', formal: 'Serve para todas as situações. Ao sair: お邪魔しました.', ex: { jp: 'どうぞ、上がって。 … お邪魔します。', ro: 'douzo, agatte. … ojama shimasu.', pt: 'Entre, por favor. … Com licença.' } },
    { k: 'odaijini', jp: 'お大事に', say: 'おだいじに', ro: 'odaiji ni', pt: 'Melhoras! / Se cuida!', lv: 2, when: 'Para alguém doente ou machucado.', formal: 'Neutro. Mais educado: お大事にしてください.', ex: { jp: '風邪？お大事に。', ro: 'kaze? odaiji ni.', pt: 'Resfriado? Melhoras.' } },
    { k: 'kiotsukete', jp: '気をつけて', say: 'きをつけて', ro: 'ki o tsukete', pt: 'Cuidado! / Vai com cuidado.', lv: 1, when: 'Na despedida ou para avisar de um perigo.', formal: 'Informal. Mais educado: お気をつけて.', ex: { jp: '気をつけて帰ってね。', ro: 'ki o tsukete kaette ne.', pt: 'Volte para casa com cuidado, tá?' } },
    { k: 'mochiron', jp: 'もちろん', say: 'もちろん', ro: 'mochiron', pt: 'Claro! / Com certeza!', lv: 1, when: 'Para concordar ou aceitar com entusiasmo.', formal: 'Serve para todas as situações.', ex: { jp: '来る？ … もちろん！', ro: 'kuru? … mochiron!', pt: 'Você vem? … Claro!' } },
    { k: 'maamaa', jp: 'まあまあ', say: 'まあまあ', ro: 'maamaa', pt: 'Mais ou menos.', lv: 2, when: 'Quando algo é razoável, nem bom nem ruim. Também acalma alguém: まあまあ… (calma, calma…).', formal: 'Neutro.', ex: { jp: 'テスト、どうだった？ … まあまあ。', ro: 'tesuto, dou datta? … maamaa.', pt: 'Como foi a prova? … Mais ou menos.' } },
    { k: 'douzo', jp: 'どうぞ', say: 'どうぞ', ro: 'douzo', pt: 'Por favor, fique à vontade / Pode pegar.', lv: 1, when: 'Para oferecer algo ou dar passagem.', formal: 'Serve para todas as situações.', ex: { jp: 'お先にどうぞ。', ro: 'osaki ni douzo.', pt: 'Pode ir primeiro.' } },
    { k: 'douitashimashite', jp: 'どういたしまして', say: 'どういたしまして', ro: 'dou itashimashite', pt: 'De nada.', lv: 2, when: 'Resposta a um agradecimento.', formal: 'Educado, e às vezes soa formal demais. Entre amigos é comum só いいよ ou うん.', ex: { jp: 'ありがとう。 … どういたしまして。', ro: 'arigatou. … dou itashimashite.', pt: 'Obrigado. … De nada.' } },
    { k: 'iidesu', jp: 'いいです', say: 'いいです', ro: 'ii desu', pt: 'Não, obrigado. / Está bom assim.', lv: 3, when: 'Pegadinha! Ao recusar uma oferta (sacola, mais comida), いいです quer dizer “não precisa”. O contexto e o gesto mostram se é “sim” ou “não”.', formal: 'Educado. Mais claro: 大丈夫です (não precisa, obrigado).', ex: { jp: '袋はいりますか？ … いいです。', ro: 'fukuro wa irimasu ka? … ii desu.', pt: 'Precisa de sacola? … Não, obrigado.' } },
    { k: 'betsuni', jp: '別に', say: 'べつに', ro: 'betsu ni', pt: 'Nada não. / Tanto faz.', lv: 2, when: 'Resposta seca para mostrar que algo não importa. Muito usada por personagens tsundere.', formal: 'Informal, pode soar frio ou mal-educado.', ex: { jp: 'どうしたの？ … 別に。', ro: 'dou shita no? … betsu ni.', pt: 'O que foi? … Nada não.' } }
  );

  /* ---------------- Frases faladas ---------------- */
  pack('aud-fra').items.push(
    { k: 'tsugiwa', jp: '次は新宿です。', say: 'つぎはしんじゅくです。', ro: 'tsugi wa shinjuku desu.', pt: 'A próxima (estação) é Shinjuku.', lv: 2, note: 'Aviso de trem. 次 (tsugi) = próximo.' },
    { k: 'docchidemo', jp: 'どっちでもいいよ。', say: 'どっちでもいいよ。', ro: 'docchi demo ii yo.', pt: 'Tanto faz, qualquer um serve.', lv: 2, note: 'どっち = qual dos dois. でもいい = qualquer um serve.' },
    { k: 'kinishinaide', jp: '気にしないで。', say: 'きにしないで。', ro: 'ki ni shinaide.', pt: 'Não se preocupe. / Deixa pra lá.', lv: 2, note: 'Resposta comum a um pedido de desculpas.' },
    { k: 'mouikkai', jp: 'もう一回言ってもらえますか？', say: 'もういっかいいってもらえますか？', ro: 'mou ikkai itte moraemasu ka?', pt: 'Pode repetir, por favor?', lv: 2, note: 'Muito útil! 〜てもらえますか = poderia ~ para mim?' },
    { k: 'tsukareta', jp: '今日は本当に疲れた。', say: 'きょうはほんとうにつかれた。', ro: 'kyou wa hontou ni tsukareta.', pt: 'Hoje eu cansei de verdade.', lv: 2, note: '本当に = de verdade.' },
    { k: 'nemui', jp: '眠い…', say: 'ねむい…', ro: 'nemui…', pt: 'Que sono…', lv: 2, note: 'Adjetivo い: estou com sono.' },
    { k: 'matane', jp: 'またね！', say: 'またね！', ro: 'mata ne!', pt: 'Até mais! / Até a próxima!', lv: 2, note: 'Despedida casual muito comum, como じゃあね.' },
    { k: 'atatame', jp: 'お弁当、温めますか？', say: 'おべんとう、あたためますか？', ro: 'obentou, atatamemasu ka?', pt: 'Quer que eu esquente o bentô?', lv: 3, note: 'Pergunta de toda loja de conveniência. 温める = esquentar.' },
    { k: 'fukuro', jp: '袋はご利用ですか？', say: 'ふくろはごりようですか？', ro: 'fukuro wa goriyou desu ka?', pt: 'Vai precisar de sacola?', lv: 3, note: 'Linguagem respeitosa de loja. 袋 = sacola.' },
    { k: 'doa', jp: 'ドアが閉まります。ご注意ください。', say: 'ドアがしまります。ごちゅういください。', ro: 'doa ga shimarimasu. gochuui kudasai.', pt: 'As portas vão se fechar. Cuidado.', lv: 3, note: 'Aviso de trem e elevador.' },
    { k: 'muri', jp: '今日はちょっと無理かも。', say: 'きょうはちょっとむりかも。', ro: 'kyou wa chotto muri kamo.', pt: 'Hoje acho que não vai dar.', lv: 3, note: '無理 = impossível. かも = talvez. Recusa suave.' },
    { k: 'kangaesasete', jp: 'ちょっと考えさせて。', say: 'ちょっとかんがえさせて。', ro: 'chotto kangaesasete.', pt: 'Deixa eu pensar um pouco.', lv: 3, note: '考えさせて = deixe-me pensar.' },
    { k: 'sakiniitte', jp: '先に行ってて。', say: 'さきにいってて。', ro: 'saki ni ittete.', pt: 'Vai indo na frente.', lv: 3, note: '行っていて → 行ってて (contração).' },
    { k: 'machiawase', jp: '何時に待ち合わせする？', say: 'なんじにまちあわせする？', ro: 'nanji ni machiawase suru?', pt: 'A que horas a gente se encontra?', lv: 3, note: '待ち合わせ = encontro combinado.' },
    { k: 'arukude', jp: '駅まで歩いて十分ぐらいです。', say: 'えきまであるいてじゅっぷんぐらいです。', ro: 'eki made aruite juppun gurai desu.', pt: 'Até a estação são uns dez minutos a pé.', lv: 3, note: '歩いて = a pé. ぐらい = mais ou menos.' }
  );

  /* ---------------- treinos auditivos usam também as lições novas ---------------- */
  LISTEN_V1[1].push('c4l4', 'c4l5');
  LISTEN_V1[2].push('c4l6', 'c4l7', 'c4l8', 'c4l9', 'c8l6', 'c2l8', 'c3l5');
  LISTEN_V1[3].push('c9l1', 'c9l4', 'c9l5', 'c10l3', 'c10l4', 'c10l5');
  LISTEN_V1_FRASES[2].push('c5l4', 'c5l5', 'c5l6', 'c5l7', 'c5l8', 'c5l9', 'c5l10', 'c6l1', 'c6l2', 'c6l3', 'c6l4', 'c6l5', 'c6l6');
  LISTEN_V1_FRASES[3].push('c8l1', 'c8l2', 'c8l3', 'c8l4', 'c8l5', 'c9l3', 'c10l1', 'c10l2');

  /* ---------------- Laboratório de Diálogos ---------------- */
  Object.assign(CHARS, {
    haha: { name: 'Mãe do Ren', jp: 'おかあさん', pitch: 1.1, color: 'var(--gold-ink)' },
    ekiin: { name: 'Funcionário da estação', jp: 'えきいん', pitch: 0.95, color: 'var(--ok)' },
    yakuzaishi: { name: 'Farmacêutica', jp: 'やくざいし', pitch: 1.15, color: 'var(--ok)' },
    kaito: { name: 'Kaito', jp: 'かいと', pitch: 0.7, color: 'var(--bad)' }
  });
  DIALOGS.push(
  { id: 'dlg-casa', lv: 1, title: 'Chegando em casa', situ: 'Ren volta da escola.',
    lines: [
      { sp: 'ren', jp: 'ただいま！', ro: 'tadaima!', pt: 'Cheguei!' },
      { sp: 'haha', jp: 'おかえり。学校、どうだった？', say: 'おかえり。がっこう、どうだった？', ro: 'okaeri. gakkou, dou datta?', pt: 'Bem-vindo. Como foi a escola?' },
      { sp: 'ren', jp: '楽しかった！おなかすいた！', say: 'たのしかった！おなかすいた！', ro: 'tanoshikatta! onaka suita!', pt: 'Foi divertido! Estou com fome!' },
      { sp: 'haha', jp: 'もうすぐごはんよ。', say: 'もうすぐごはんよ。', ro: 'mou sugu gohan yo.', pt: 'O jantar já vai ficar pronto.' },
      { sp: 'ren', jp: 'やった！', ro: 'yatta!', pt: 'Eba!' }
    ],
    words: [['ただいま', 'tadaima', 'cheguei (em casa)'], ['どうだった？', 'dou datta?', 'como foi?'], ['もうすぐ', 'mou sugu', 'daqui a pouco']],
    qs: [
      { q: 'Como foi a escola para o Ren?', opts: ['Divertida', 'Cansativa', 'Difícil', 'Chata'], ans: 0, explain: '楽しかった = foi divertido.' },
      { q: 'O que vai ficar pronto logo?', opts: ['A comida', 'O banho', 'A lição de casa'], ans: 0, explain: 'もうすぐごはん = a refeição já vem.' }
    ] },
  { id: 'dlg-restaurante', lv: 2, title: 'No restaurante', situ: 'Ren e Aoi entram numa casa de lámen.',
    lines: [
      { sp: 'tenin', jp: 'いらっしゃいませ！何名様ですか。', say: 'いらっしゃいませ！なんめいさまですか。', ro: 'irasshaimase! nanmei-sama desu ka.', pt: 'Bem-vindos! Quantas pessoas?' },
      { sp: 'ren', jp: '二人です。', say: 'ふたりです。', ro: 'futari desu.', pt: 'Somos dois.' },
      { sp: 'tenin', jp: 'こちらへどうぞ。ご注文はお決まりですか。', say: 'こちらへどうぞ。ごちゅうもんはおきまりですか。', ro: 'kochira e douzo. gochuumon wa okimari desu ka.', pt: 'Por aqui, por favor. Já decidiram o pedido?' },
      { sp: 'aoi', jp: 'ラーメンを二つお願いします。', say: 'ラーメンをふたつおねがいします。', ro: 'raamen o futatsu onegaishimasu.', pt: 'Dois lámens, por favor.' },
      { sp: 'tenin', jp: 'かしこまりました。少々お待ちください。', say: 'かしこまりました。しょうしょうおまちください。', ro: 'kashikomarimashita. shoushou omachi kudasai.', pt: 'Perfeitamente. Aguardem um momento.' }
    ],
    words: [['何名様', 'nanmei-sama', 'quantas pessoas (respeitoso)'], ['ご注文', 'gochuumon', 'o pedido'], ['かしこまりました', 'kashikomarimashita', 'entendido (humilde)']],
    qs: [
      { q: 'Quantas pessoas são?', opts: ['Duas', 'Uma', 'Três', 'Quatro'], ans: 0, explain: '二人 (futari) = duas pessoas.' },
      { q: 'O que elas pedem?', opts: ['Dois lámens', 'Um lámen', 'Dois cafés', 'O cardápio'], ans: 0, explain: 'ラーメンを二つ = dois lámens.' },
      { q: 'O que o atendente pede no final?', opts: ['Que aguardem um momento', 'Que paguem antes', 'Que escolham a mesa'], ans: 0, explain: '少々お待ちください = aguardem um momento.' }
    ] },
  { id: 'dlg-eki', lv: 2, title: 'Na estação', situ: 'Ren quer ir para Shinjuku e pede informação.',
    lines: [
      { sp: 'ren', jp: 'すみません、新宿に行きたいんですが…。', say: 'すみません、しんじゅくにいきたいんですが…。', ro: 'sumimasen, shinjuku ni ikitai n desu ga….', pt: 'Com licença, eu queria ir para Shinjuku…' },
      { sp: 'ekiin', jp: '新宿ですか。三番線の電車に乗ってください。', say: 'しんじゅくですか。さんばんせんのでんしゃにのってください。', ro: 'shinjuku desu ka. sanbansen no densha ni notte kudasai.', pt: 'Shinjuku? Pegue o trem da plataforma 3.' },
      { sp: 'ren', jp: '何分ぐらいかかりますか。', say: 'なんぷんぐらいかかりますか。', ro: 'nanpun gurai kakarimasu ka.', pt: 'Quantos minutos leva, mais ou menos?' },
      { sp: 'ekiin', jp: '十五分ぐらいです。', say: 'じゅうごふんぐらいです。', ro: 'juugofun gurai desu.', pt: 'Uns quinze minutos.' },
      { sp: 'ren', jp: 'ありがとうございます。', ro: 'arigatou gozaimasu.', pt: 'Muito obrigado.' }
    ],
    words: [['〜番線', '~bansen', 'plataforma número ~'], ['乗る', 'noru', 'embarcar, pegar (transporte)'], ['かかる', 'kakaru', 'levar (tempo)']],
    qs: [
      { q: 'Para onde o Ren quer ir?', opts: ['Shinjuku', 'Shibuya', 'Osaka', 'Para casa'], ans: 0, explain: '新宿に行きたい = quero ir para Shinjuku.' },
      { q: 'Qual plataforma ele deve usar?', opts: ['3', '5', '1', '15'], ans: 0, explain: '三番線 = plataforma 3.' },
      { q: 'Quanto tempo leva?', opts: ['Uns 15 minutos', 'Uns 5 minutos', 'Uma hora'], ans: 0, explain: '十五分ぐらい = uns 15 minutos.' }
    ] },
  { id: 'dlg-convite', lv: 2, title: 'Convite para o cinema', situ: 'Aoi manda uma mensagem de voz para o Ren.',
    lines: [
      { sp: 'aoi', jp: 'ねえ、土曜日ひま？', say: 'ねえ、どようびひま？', ro: 'nee, doyoubi hima?', pt: 'Ei, você está livre no sábado?' },
      { sp: 'ren', jp: 'うん、ひまだよ。どうして？', ro: 'un, hima da yo. doushite?', pt: 'Estou, sim. Por quê?' },
      { sp: 'aoi', jp: '映画見に行かない？', say: 'えいがみにいかない？', ro: 'eiga mi ni ikanai?', pt: 'Vamos ver um filme?' },
      { sp: 'ren', jp: 'いいね！何時にする？', say: 'いいね！なんじにする？', ro: 'ii ne! nanji ni suru?', pt: 'Boa! A que horas?' },
      { sp: 'aoi', jp: '二時に駅の前はどう？', say: 'にじにえきのまえはどう？', ro: 'niji ni eki no mae wa dou?', pt: 'Que tal às duas, em frente à estação?' },
      { sp: 'ren', jp: 'オッケー！', ro: 'okkee!', pt: 'Fechado!' }
    ],
    words: [['ひま', 'hima', 'livre, desocupado'], ['見に行く', 'mi ni iku', 'ir ver'], ['〜はどう？', '~wa dou?', 'que tal ~?']],
    qs: [
      { q: 'Em que dia é o encontro?', opts: ['Sábado', 'Domingo', 'Sexta-feira', 'Hoje'], ans: 0, explain: '土曜日 = sábado.' },
      { q: 'A que horas eles vão se encontrar?', opts: ['Às 2', 'Às 10', 'Às 7'], ans: 0, explain: '二時 = duas horas.' },
      { q: 'Onde?', opts: ['Em frente à estação', 'No cinema', 'Na casa da Aoi'], ans: 0, explain: '駅の前 = em frente à estação.' }
    ] },
  { id: 'dlg-farmacia', lv: 3, title: 'Na farmácia', situ: 'Ren não está se sentindo bem.',
    lines: [
      { sp: 'yakuzaishi', jp: 'どうしましたか。', ro: 'dou shimashita ka.', pt: 'O que houve?' },
      { sp: 'ren', jp: '昨日から頭が痛くて、熱もあるんです。', say: 'きのうからあたまがいたくて、ねつもあるんです。', ro: 'kinou kara atama ga itakute, netsu mo aru n desu.', pt: 'Desde ontem estou com dor de cabeça, e também tenho febre.' },
      { sp: 'yakuzaishi', jp: 'そうですか。じゃあ、この薬を一日三回、食後に飲んでください。', say: 'そうですか。じゃあ、このくすりをいちにちさんかい、しょくごにのんでください。', ro: 'sou desu ka. jaa, kono kusuri o ichinichi sankai, shokugo ni nonde kudasai.', pt: 'Entendo. Então tome este remédio três vezes ao dia, depois das refeições.' },
      { sp: 'ren', jp: 'わかりました。', ro: 'wakarimashita.', pt: 'Entendi.' },
      { sp: 'yakuzaishi', jp: 'お大事に。', say: 'おだいじに。', ro: 'odaiji ni.', pt: 'Melhoras.' }
    ],
    words: [['頭が痛い', 'atama ga itai', 'estar com dor de cabeça'], ['熱', 'netsu', 'febre'], ['一日三回', 'ichinichi sankai', 'três vezes por dia'], ['食後', 'shokugo', 'depois das refeições']],
    qs: [
      { q: 'O que o Ren sente?', opts: ['Dor de cabeça e febre', 'Dor de barriga', 'Dor no pé', 'Só cansaço'], ans: 0, explain: '頭が痛くて、熱もある = dor de cabeça e febre também.' },
      { q: 'Desde quando?', opts: ['Desde ontem', 'Desde hoje de manhã', 'Há uma semana'], ans: 0, explain: '昨日から = desde ontem.' },
      { q: 'Como deve tomar o remédio?', opts: ['3 vezes ao dia, depois de comer', '1 vez ao dia, antes de dormir', '2 vezes ao dia, em jejum'], ans: 0, explain: '一日三回、食後に = três vezes ao dia, depois das refeições.' }
    ] },
  { id: 'dlg-telefone', lv: 3, title: 'Atrasada no telefone', situ: 'Ren liga para a Aoi, que não chegou ao encontro.',
    lines: [
      { sp: 'ren', jp: 'もしもし、アオイ？今どこ？', say: 'もしもし、あおい？いまどこ？', ro: 'moshi moshi, Aoi? ima doko?', pt: 'Alô, Aoi? Onde você está?' },
      { sp: 'aoi', jp: 'ごめん、電車が遅れてて、あと十分ぐらいかかる。', say: 'ごめん、でんしゃがおくれてて、あとじゅっぷんぐらいかかる。', ro: 'gomen, densha ga okurete te, ato juppun gurai kakaru.', pt: 'Desculpa, o trem está atrasado, ainda vou levar uns dez minutos.' },
      { sp: 'ren', jp: 'わかった。じゃあ、先にカフェに入ってるね。', say: 'わかった。じゃあ、さきにカフェにはいってるね。', ro: 'wakatta. jaa, saki ni kafe ni haitteru ne.', pt: 'Tá bom. Então vou entrando no café, tá?' },
      { sp: 'aoi', jp: 'うん、ありがとう！すぐ行く！', say: 'うん、ありがとう！すぐいく！', ro: 'un, arigatou! sugu iku!', pt: 'Tá, obrigada! Já estou indo!' }
    ],
    words: [['もしもし', 'moshi moshi', 'alô (ao telefone)'], ['遅れてて', 'okurete te', 'está atrasado (de 遅れている)'], ['あと', 'ato', 'ainda falta, daqui a'], ['先に', 'saki ni', 'antes, na frente']],
    qs: [
      { q: 'Por que a Aoi está atrasada?', opts: ['O trem atrasou', 'Ela acordou tarde', 'Ela se perdeu', 'Ela esqueceu'], ans: 0, explain: '電車が遅れてて = o trem está atrasado.' },
      { q: 'Quanto tempo ela ainda vai levar?', opts: ['Uns 10 minutos', 'Uns 30 minutos', 'Uma hora'], ans: 0, explain: 'あと十分ぐらい = ainda uns dez minutos.' },
      { q: 'O que o Ren vai fazer?', opts: ['Entrar no café antes', 'Ir para casa', 'Buscar a Aoi na estação'], ans: 0, explain: '先にカフェに入ってる = vou entrando no café.' }
    ] },
  { id: 'dlg-registros', lv: 3, title: 'O mesmo pedido, dois tons', situ: 'Ren precisa de uma caneta. Primeiro pede para a Aoi, depois para a professora.',
    lines: [
      { sp: 'ren', jp: 'アオイ、そのペン貸して。', say: 'あおい、そのペンかして。', ro: 'Aoi, sono pen kashite.', pt: 'Aoi, me empresta essa caneta.' },
      { sp: 'aoi', jp: 'いいよ、はい。', ro: 'ii yo, hai.', pt: 'Claro, toma.' },
      { sp: 'ren', jp: '先生、すみません。ペンを貸していただけませんか。', say: 'せんせい、すみません。ペンをかしていただけませんか。', ro: 'sensei, sumimasen. pen o kashite itadakemasen ka.', pt: 'Professora, com licença. Poderia me emprestar uma caneta?' },
      { sp: 'sensei', jp: 'ええ、どうぞ。', ro: 'ee, douzo.', pt: 'Sim, pode pegar.' }
    ],
    words: [['貸して', 'kashite', 'me empresta (casual)'], ['〜ていただけませんか', '~te itadakemasen ka', 'poderia ~ para mim? (muito educado)'], ['ええ', 'ee', 'sim (mais suave que はい)']],
    qs: [
      { q: 'O que o Ren pede?', opts: ['Uma caneta emprestada', 'Um caderno', 'Ajuda na lição'], ans: 0, explain: 'ペン = caneta; 貸して = me empresta.' },
      { q: 'Por que o segundo pedido é mais longo?', opts: ['Porque é para a professora, então é mais educado', 'Porque a professora não ouviu', 'Porque ele pediu duas canetas'], ans: 0, explain: 'Com superiores usa-se 〜ていただけませんか, bem mais educado que 貸して.' }
    ] },
  { id: 'dlg-rival', lv: 3, title: 'O desafio do rival', situ: 'Cena de anime: Kaito desafia o Ren. Fala rude, só para reconhecer!',
    lines: [
      { sp: 'kaito', jp: 'おい、レン！逃げるのか？', say: 'おい、れん！にげるのか？', ro: 'oi, Ren! nigeru no ka?', pt: 'Ei, Ren! Vai fugir?' },
      { sp: 'ren', jp: '逃げねえよ。', say: 'にげねえよ。', ro: 'nigenee yo.', pt: 'Não vou fugir, não.' },
      { sp: 'kaito', jp: 'ふん、お前なんかに負けるわけがない。', say: 'ふん、おまえなんかにまけるわけがない。', ro: 'fun, omae nanka ni makeru wake ga nai.', pt: 'Hunf, não tem como eu perder para alguém como você.' },
      { sp: 'ren', jp: '言ってろ。行くぞ！', say: 'いってろ。いくぞ！', ro: 'itte ro. iku zo!', pt: 'Fala o que quiser. Lá vou eu!' },
      { sp: 'kaito', jp: 'かかってこい！', ro: 'kakatte koi!', pt: 'Vem pra cima!' }
    ],
    words: [['おい', 'oi', 'ei! (chamado brusco)'], ['逃げねえ', 'nigenee', 'não fujo (rude, de 逃げない)'], ['なんか', 'nanka', 'alguém como (desprezo)'], ['わけがない', 'wake ga nai', 'não tem como'], ['かかってこい', 'kakatte koi', 'vem pra cima! (desafio)']],
    qs: [
      { q: 'O que o Kaito acusa o Ren de fazer?', opts: ['Fugir', 'Mentir', 'Trapacear', 'Chegar atrasado'], ans: 0, explain: '逃げるのか？ = Vai fugir?' },
      { q: '逃げねえ é a forma rude de…', opts: ['逃げない (não fugir)', '逃げた (fugiu)', '逃げろ (fuja!)'], ans: 0, explain: 'ない → ねえ na fala rude.' },
      { q: 'Como termina a cena?', opts: ['Os dois vão lutar', 'Eles fazem as pazes', 'O Ren vai embora'], ans: 0, explain: '行くぞ！ e かかってこい！ = começa a luta.' }
    ] }
  );

  /* ---------------- conquistas da 2.1 ---------------- */
  const passed = (s, id) => !!(s.catExams[id] && s.catExams[id].passed);
  ACHIEVEMENTS.push(
    { id: 'kana_h', icon: 'あ', name: 'Mestre do hiragana', desc: 'Passe na avaliação final de Hiragana.', test: s => passed(s, 'c2') },
    { id: 'kana_k', icon: 'ア', name: 'Mestre do katakana', desc: 'Passe na avaliação final de Katakana.', test: s => passed(s, 'c3') },
    { id: 'kanji1', icon: '字', name: 'Primeiros kanji', desc: 'Passe na avaliação final de Kanji.', test: s => passed(s, 'c7') },
    { id: 'falado', icon: '話', name: 'Ouvido de rua', desc: 'Passe na avaliação final de Japonês Falado.', test: s => passed(s, 'c8') },
    { id: 'keigo', icon: '敬', name: 'Etiqueta japonesa', desc: 'Passe na avaliação final de Formalidade e Respeito.', test: s => passed(s, 'c9') },
    { id: 'anime', icon: '劇', name: 'Fluente em anime', desc: 'Passe na avaliação final de Japonês dos Animes.', test: s => passed(s, 'c10') },
    { id: 'lessons_all21', icon: '極', name: 'Academia completa', desc: 'Seja aprovado em todas as lições da Academia (versão 2.1).', test: s => countPassed(s) >= TOTAL_LESSONS },
    { id: 'dialog_all', icon: '談', name: 'Conversador', desc: 'Conclua todos os diálogos do Laboratório.', test: s => DIALOGS.every(d => s.listening.dialogs[d.id]) }
  );
})();
