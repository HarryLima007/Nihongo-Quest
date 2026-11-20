/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N3): Keigo na Prática (c20)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c20', emblem: '敬', title: 'Keigo na Prática', jp: 'けいご', stage: 'int', jlpt: 'N3',
    desc: 'Linguagem respeitosa (sonkeigo), humilde (kenjougo) e polida: verbos especiais, formas regulares, empresa, telefone, e-mail e erros comuns.',
    requires: ['c9', 'c16'], reqWhy: 'O keigo parte da noção de formalidade (Formalidade e Respeito) e usa as formas da gramática N4.'
  });
  c.lessons.push(
  L('c20l1', 'Respeitoso: verbos especiais', '尊', 'grammar', [
    'O sonkeigo (尊敬語) eleva a pessoa de quem se fala: o cliente, o chefe, o professor. Você nunca usa sonkeigo para si mesmo.',
    'Os verbos mais comuns têm formas próprias: いる/行く/来る → いらっしゃる; 食べる/飲む → 召し上がる; 言う → おっしゃる; 見る → ご覧になる; する → なさる; くれる → くださる; 知っている → ご存じだ.',
    'いらっしゃる, おっしゃる, なさる e くださる são irregulares no ます: いらっしゃいます, おっしゃいます, なさいます, くださいます (e não いらっしゃります).'
  ], 'Por isso “ください” é na verdade o imperativo de くださる: um pedido respeitoso.', [
    ['s1', '社長は今、会議室にいらっしゃいます。', 'shachou wa ima, kaigishitsu ni irasshaimasu.', 'O presidente está na sala de reuniões agora.', 'いる → いらっしゃる.'],
    ['s2', '先生は何時ごろお帰りになりますか。', 'sensei wa nanji goro okaeri ni narimasu ka.', 'Por volta de que horas o professor volta?', 'Forma regular お〜になる.'],
    ['s3', '部長がそうおっしゃいました。', 'buchou ga sou osshaimashita.', 'Foi o que o diretor disse.', '言う → おっしゃる.'],
    ['s4', 'こちらの資料をご覧になりましたか。', 'kochira no shiryou o goran ni narimashita ka.', 'O senhor já viu este material?', '見る → ご覧になる.'],
    ['s5', '週末は何をなさいますか。', 'shuumatsu wa nani o nasaimasu ka.', 'O que o senhor vai fazer no fim de semana?', 'する → なさる.'],
    ['s6', 'この件について、ご存じですか。', 'kono ken ni tsuite, gozonji desu ka.', 'O senhor está a par deste assunto?', '知っている → ご存じ.']
  ], [
    ['お客様がお見えになりました。', 'okyakusama ga omie ni narimashita.', 'O cliente chegou. (お見えになる = vir, respeitoso)']
  ], [
    X.s('Forma respeitosa de 食べる:', ['召し上がる|meshiagaru', 'いただく|itadaku', '食べられる|taberareru'], '召し上がる (sonkeigo). いただく é humilde.'),
    X.s('Qual é a forma ます correta de いらっしゃる?', ['いらっしゃいます|irasshaimasu', 'いらっしゃります|irassharimasu', 'いらっしゃれます|irassharemasu'], 'Verbos especiais: る → います.'),
    X.f('O senhor sabe? (respeitoso)', '＿ですか。', ['ご存じ|gozonji', '存じ|zonji', 'ご知り|goshiri'], '知っている → ご存じ.'),
    X.e('Falando de você mesmo: “Eu vou amanhã.”', ['私は|watashi wa', '明日|ashita', 'いらっしゃいます|irasshaimasu'], 2, 'Sonkeigo nunca é usado para si mesmo: 参ります ou 行きます.')
  ]),
  L('c20l2', 'Respeitoso: formas regulares', '昇', 'grammar', [
    'Verbos sem forma especial seguem padrões. O principal é お + raiz ます + になる: 帰る → お帰りになる; 待つ → お待ちになる.',
    'Com verbos de origem chinesa (substantivo + する), use ご + substantivo + になる: 利用する → ご利用になる.',
    'Mais simples: a forma passiva também serve como respeitosa: 書かれる, 来られる. É mais leve que お〜になる e muito comum no trabalho.'
  ], 'Pedidos respeitosos: お + raiz + ください (お待ちください, お座りください) e ご + substantivo + ください (ご確認ください).', [
    ['s1', '部長はもうお帰りになりました。', 'buchou wa mou okaeri ni narimashita.', 'O diretor já foi embora.', 'お〜になる.'],
    ['s2', 'こちらで少しお待ちになってください。', 'kochira de sukoshi omachi ni natte kudasai.', 'Aguarde um pouco aqui, por favor.', ''],
    ['s3', 'このサービスは無料でご利用になれます。', 'kono saabisu wa muryou de goriyou ni naremasu.', 'Este serviço pode ser usado gratuitamente.', 'ご〜になる (potencial).'],
    ['s4', '先生はいつ日本に来られたんですか。', 'sensei wa itsu nihon ni korareta n desu ka.', 'Quando o professor veio ao Japão?', 'Passiva como respeitosa.'],
    ['s5', 'どうぞ、こちらにお座りください。', 'douzo, kochira ni osuwari kudasai.', 'Por favor, sente-se aqui.', 'お〜ください.'],
    ['s6', '内容をご確認ください。', 'naiyou o gokakunin kudasai.', 'Por favor, confira o conteúdo.', 'ご〜ください.']
  ], [
    ['社長はこの本をお書きになったそうです。', 'shachou wa kono hon o okaki ni natta sou desu.', 'Dizem que o presidente escreveu este livro.']
  ], [
    X.f('O cliente já voltou para casa.', 'お客様はもうお帰り＿。', ['になりました|ni narimashita', 'しました|shimashita', 'いたしました|itashimashita'], 'お〜になる = respeitoso.'),
    X.s('Forma respeitosa de 利用する:', ['ご利用になる|goriyou ni naru', 'お利用になる|oriyou ni naru', 'ご利用する|goriyou suru'], 'Palavras chinesas levam ご. ご〜する seria humilde.'),
    X.s('Como pedir “Por favor, confira” a um cliente?', ['ご確認ください|gokakunin kudasai', '確認しろ|kakunin shiro', '確認してくれ|kakunin shite kure'], 'ご〜ください.'),
    X.o('Por favor, sente-se aqui.', ['どうぞ、|douzo,', 'こちらに|kochira ni', 'お座りください|osuwari kudasai'], ['お座りします|osuwari shimasu'], 'お〜ください = pedido respeitoso.')
  ]),
  L('c20l3', 'Humilde: verbos especiais', '謙', 'grammar', [
    'O kenjougo (謙譲語) rebaixa a própria ação (ou a do seu grupo) para respeitar o outro. Use para você, nunca para o cliente.',
    'Verbos especiais: 行く/来る → 参る / 伺う (visitar); 言う → 申す; 食べる/もらう → いただく; 見る → 拝見する; する → いたす; いる → おる; 知っている → 存じている.',
    '伺う também significa “perguntar” e “ouvir” de forma humilde: ちょっと伺いたいのですが (gostaria de perguntar algo).'
  ], 'Muito comum: 〜と申します (me chamo ~) e おります no lugar de います: 父は今、出かけております.', [
    ['s1', '明日、御社に伺います。', 'ashita, onsha ni ukagaimasu.', 'Amanhã irei à sua empresa.', '行く → 伺う (visitar).'],
    ['s2', 'ただいま参ります。', 'tadaima mairimasu.', 'Já estou indo.', '行く → 参る.'],
    ['s3', '資料を拝見しました。', 'shiryou o haiken shimashita.', 'Vi o material (com respeito).', '見る → 拝見する.'],
    ['s4', 'では、そのようにいたします。', 'dewa, sono you ni itashimasu.', 'Então farei dessa forma.', 'する → いたす.'],
    ['s5', '母は今、出かけております。', 'haha wa ima, dekakete orimasu.', 'Minha mãe saiu no momento.', 'いる → おる.'],
    ['s6', 'その件は存じております。', 'sono ken wa zonjite orimasu.', 'Estou a par desse assunto.', '知っている → 存じている.']
  ], [
    ['先日いただいたお菓子、とてもおいしかったです。', 'senjitsu itadaita okashi, totemo oishikatta desu.', 'Os doces que recebi outro dia estavam deliciosos.']
  ], [
    X.s('Forma humilde de 見る:', ['拝見する|haiken suru', 'ご覧になる|goran ni naru', '見られる|mirareru'], '拝見する (humilde). ご覧になる é respeitoso.'),
    X.s('Você vai à empresa do cliente amanhã. Qual frase?', ['明日伺います|ashita ukagaimasu', '明日いらっしゃいます|ashita irasshaimasu', '明日来られます|ashita koraremasu'], 'Para você mesmo: humilde.'),
    X.f('Meu pai não está em casa agora.', '父は今、家に＿。', ['おりません|orimasen', 'いらっしゃいません|irasshaimasen', 'ございません|gozaimasen'], 'Seu pai é do seu grupo: humilde.'),
    X.e('“O diretor viu o material.” (falando do diretor do cliente)', ['部長が|buchou ga', '資料を|shiryou o', '拝見しました|haiken shimashita'], 2, 'Ação do outro = respeitoso: ご覧になりました.')
  ]),
  L('c20l4', 'Humilde: formas regulares e させていただく', '譲', 'grammar', [
    'Forma humilde regular: お + raiz ます + する (ou いたす): 持つ → お持ちします; 待つ → お待ちします.',
    'Com palavras chinesas: ご + substantivo + する: 説明する → ご説明します; 連絡する → ご連絡します.',
    'させていただく = “permita-me fazer” (literalmente, receber permissão para fazer). Muito usado em discursos e no trabalho: 発表させていただきます.'
  ], 'させていただく em excesso soa artificial. Use quando há algo a “permitir”: 休ませていただけませんか (posso tirar folga?).', [
    ['s1', 'お荷物、お持ちしましょうか。', 'onimotsu, omochi shimashou ka.', 'Quer que eu carregue sua bagagem?', 'お〜する.'],
    ['s2', '後ほどご連絡いたします。', 'nochihodo gorenraku itashimasu.', 'Entrarei em contato mais tarde.', 'ご〜いたす (mais humilde).'],
    ['s3', '私からご説明します。', 'watashi kara gosetsumei shimasu.', 'Eu vou explicar.', ''],
    ['s4', 'それでは、始めさせていただきます。', 'soredewa, hajimesasete itadakimasu.', 'Então, permitam-me começar.', 'Abertura de reunião.'],
    ['s5', '明日、休ませていただけないでしょうか。', 'ashita, yasumasete itadakenai deshou ka.', 'Será que eu poderia tirar folga amanhã?', 'Pedido de permissão.'],
    ['s6', '駅までお送りします。', 'eki made ookuri shimasu.', 'Eu levo o senhor até a estação.', '']
  ], [
    ['資料はメールでお送りいたします。', 'shiryou wa meeru de ookuri itashimasu.', 'Enviarei o material por e-mail.']
  ], [
    X.s('Você oferece ajuda para carregar a mala do cliente:', ['お持ちします|omochi shimasu', 'お持ちになります|omochi ni narimasu', '持たれます|motaremasu'], 'Sua ação = humilde: お〜する.'),
    X.f('Entrarei em contato depois.', '後で＿いたします。', ['ご連絡|gorenraku', 'お連絡|orenraku', '連絡に|renraku ni'], 'Palavra chinesa: ご〜いたす.'),
    X.s('Como abrir uma apresentação formalmente?', ['発表させていただきます|happyou sasete itadakimasu', '発表なさいます|happyou nasaimasu', '発表してくれます|happyou shite kuremasu'], 'させていただく = permita-me.'),
    X.e('Falando ao cliente: “O senhor me espera aqui?”', ['こちらで|kochira de', 'お待ちしますか|omachi shimasu ka'], 1, 'Ação do cliente = respeitoso: お待ちになりますか / お待ちください.')
  ]),
  L('c20l5', 'Linguagem polida: ございます e prefixos お/ご', '丁', 'grammar', [
    'O teineigo (丁寧語) é o polido neutro (です/ます) e sua versão mais elevada: ございます (= あります) e でございます (= です).',
    'O prefixo お vai em palavras japonesas (お名前, お手紙, お茶) e ご em palavras chinesas (ご住所, ご家族, ご意見). Há exceções: お電話, お時間, お食事.',
    'Palavras com お por padrão (美化語) soam bonitas mesmo sem respeito a ninguém: お水, お金, お風呂. Katakana normalmente não leva お.'
  ], 'よろしい é a forma polida de いい: よろしいですか (está bem?). よろしかったでしょうか no presente é considerado um erro de keigo.', [
    ['s1', 'トイレは二階にございます。', 'toire wa nikai ni gozaimasu.', 'O banheiro fica no segundo andar.', 'ございます = あります.'],
    ['s2', 'こちらが新しいメニューでございます。', 'kochira ga atarashii menyuu de gozaimasu.', 'Este é o novo cardápio.', 'でございます = です.'],
    ['s3', 'お名前とご住所をお願いします。', 'onamae to gojuusho o onegaishimasu.', 'Seu nome e endereço, por favor.', 'お + japonesa, ご + chinesa.'],
    ['s4', 'ご家族はお元気ですか。', 'gokazoku wa ogenki desu ka.', 'Sua família está bem?', ''],
    ['s5', '少しお時間よろしいでしょうか。', 'sukoshi ojikan yoroshii deshou ka.', 'O senhor teria um minuto?', 'お時間: exceção (時間 é chinesa).'],
    ['s6', 'ご意見をお聞かせください。', 'goiken o okikase kudasai.', 'Por favor, nos dê sua opinião.', '']
  ], [
    ['申し訳ございませんが、その商品は在庫がございません。', 'moushiwake gozaimasen ga, sono shouhin wa zaiko ga gozaimasen.', 'Sinto muito, mas não temos esse produto em estoque.']
  ], [
    X.s('Forma mais polida de あります:', ['ございます|gozaimasu', 'おります|orimasu', 'いらっしゃいます|irasshaimasu'], 'ございます = あります (polido).'),
    X.f('Seu endereço, por favor.', '＿住所をお願いします。', ['ご|go', 'お|o', '(nada)|(nada)'], '住所 é palavra chinesa: ご住所.'),
    X.s('Qual NÃO leva お normalmente?', ['コーヒー|koohii', '茶|cha', '金|kane'], 'Katakana normalmente não leva お.'),
    X.f('Isto é o nosso produto novo.', 'こちらが新商品＿。', ['でございます|de gozaimasu', 'がございます|ga gozaimasu', 'でおります|de orimasu'], 'でございます = です.')
  ]),
  L('c20l6', 'Dentro e fora: falando da própria empresa', '外', 'grammar', [
    'No keigo, o que importa é o grupo (内 uchi × 外 soto). Diante de um cliente, o seu chefe faz parte do SEU grupo: você fala dele com humildade e sem さん.',
    'Ao telefone com alguém de fora: 佐藤は今、席を外しております (o Sato não está na mesa agora), e não 佐藤さんはいらっしゃいません.',
    'A empresa do outro é 御社 (falado) ou 貴社 (escrito); a sua é 弊社 (humilde) ou 当社 (neutro).'
  ], 'Dentro da empresa, com colegas, você usa sonkeigo com o chefe normalmente. A regra muda só quando alguém de fora está envolvido.', [
    ['s1', '佐藤は今、席を外しております。', 'satou wa ima, seki o hazushite orimasu.', 'O Sato não está na mesa no momento.', 'Colega, para alguém de fora: sem さん.'],
    ['s2', '申し訳ございません。山田は本日休みをいただいております。', 'moushiwake gozaimasen. yamada wa honjitsu yasumi o itadaite orimasu.', 'Sinto muito, o Yamada está de folga hoje.', ''],
    ['s3', '弊社の新しい製品をご紹介します。', 'heisha no atarashii seihin o goshoukai shimasu.', 'Apresento o novo produto da nossa empresa.', '弊社 = nossa empresa (humilde).'],
    ['s4', '御社のご意見を伺いたいと思います。', 'onsha no goiken o ukagaitai to omoimasu.', 'Gostaríamos de ouvir a opinião da sua empresa.', '御社 = sua empresa (falado).'],
    ['s5', '部長の田中が、後ほどお電話いたします。', 'buchou no tanaka ga, nochihodo odenwa itashimasu.', 'O diretor Tanaka ligará mais tarde.', 'Cargo antes do nome, sem さん.'],
    ['s6', '戻りましたら、こちらからお電話させます。', 'modorimashitara, kochira kara odenwa sasemasu.', 'Quando ele voltar, peço para retornar a ligação.', '']
  ], [
    ['あいにく鈴木は外出しておりまして、三時に戻る予定です。', 'ainiku suzuki wa gaishutsu shite orimashite, sanji ni modoru yotei desu.', 'Infelizmente o Suzuki saiu e deve voltar às três.']
  ], [
    X.s('Um cliente liga procurando seu chefe Tanaka, que saiu. Você diz:', ['田中は外出しております|tanaka wa gaishutsu shite orimasu', '田中さんは外出していらっしゃいます|tanaka-san wa gaishutsu shite irasshaimasu', '田中部長はお出かけになりました|tanaka buchou wa odekake ni narimashita'], 'Para fora: humilde e sem さん.'),
    X.s('Como chamar a empresa do cliente numa reunião?', ['御社|onsha', '弊社|heisha', '当社|tousha'], '御社 = sua empresa (falado).'),
    X.s('E a sua empresa, com humildade?', ['弊社|heisha', '御社|onsha', '貴社|kisha'], '弊社 = nossa empresa.'),
    X.e('Ao cliente: “Nosso diretor disse isso.”', ['弊社の部長が|heisha no buchou ga', 'そうおっしゃいました|sou osshaimashita'], 1, 'Seu chefe é do seu grupo: 申しておりました.')
  ]),
  L('c20l7', 'Telefone de negócios', '話', 'grammar', [
    'Ao telefone no trabalho, há fórmulas fixas para atender, identificar-se, pedir para aguardar e anotar recados.',
    'Ao atender: はい、〇〇会社でございます. Ao ligar: 〇〇社の〇〇と申します。いつもお世話になっております.',
    'Se não entender: 恐れ入りますが、もう一度お願いできますか. Se a ligação estiver ruim: お電話が遠いようなのですが (parece que a ligação está distante).'
  ], 'お電話が遠い é um jeito educado de dizer que não está ouvindo bem, sem culpar a pessoa.', [
    ['s1', 'お電話ありがとうございます。山田商事でございます。', 'odenwa arigatou gozaimasu. yamada shouji de gozaimasu.', 'Obrigado pela ligação. Yamada Comércio, bom dia.', 'Atendendo.'],
    ['s2', 'いつもお世話になっております。', 'itsumo osewa ni natte orimasu.', 'Agradecemos sempre a parceria.', 'Saudação de negócios.'],
    ['s3', '恐れ入りますが、お名前をもう一度お願いできますか。', 'osoreirimasu ga, onamae o mou ichido onegai dekimasu ka.', 'Desculpe, poderia repetir seu nome?', ''],
    ['s4', 'お電話が少し遠いようなのですが。', 'odenwa ga sukoshi tooi you na no desu ga.', 'Parece que a ligação está um pouco ruim.', 'Educado.'],
    ['s5', 'よろしければ、ご伝言を承りますが。', 'yoroshikereba, godengon o uketamawarimasu ga.', 'Se quiser, posso anotar um recado.', '承る = receber (humilde).'],
    ['s6', '失礼いたします。', 'shitsurei itashimasu.', 'Com licença (ao desligar).', 'Despedida padrão.']
  ], [
    ['では、田中様からお電話があったことを申し伝えます。', 'dewa, tanaka-sama kara odenwa ga atta koto o moushitsutaemasu.', 'Então vou avisar que o senhor Tanaka ligou.']
  ], [
    X.s('Você atende o telefone da empresa Sakura:', ['はい、さくら社でございます|hai, sakurasha de gozaimasu', 'もしもし、さくら社だよ|moshimoshi, sakurasha da yo', 'はい、さくら社さんです|hai, sakurasha-san desu'], 'でございます no atendimento.'),
    X.s('Você não está ouvindo bem. Como dizer educadamente?', ['お電話が遠いようなのですが|odenwa ga tooi you na no desu ga', '声が小さいです|koe ga chiisai desu', '聞こえないよ|kikoenai yo'], 'Não culpe a pessoa.'),
    X.f('Posso anotar um recado.', 'ご伝言を＿。', ['承ります|uketamawarimasu', 'いただきます|itadakimasu', 'なさいます|nasaimasu'], '承る = receber (humilde).'),
    X.s('Saudação fixa ao ligar para um cliente:', ['いつもお世話になっております|itsumo osewa ni natte orimasu', 'お疲れ様です|otsukaresama desu', 'ただいま|tadaima'], 'お疲れ様 é para colegas internos.')
  ]),
  L('c20l8', 'E-mail de negócios', '信', 'grammar', [
    'Um e-mail de trabalho japonês tem estrutura fixa: destinatário (会社名 + 様), saudação, identificação, assunto, fechamento.',
    'Abertura padrão: お世話になっております。〇〇社の〇〇です. Para alguém novo: 初めてご連絡いたします.',
    'Fechamento padrão: よろしくお願いいたします. Outros: ご確認のほど、よろしくお願いいたします (peço que confira).'
  ], '取り急ぎ = “por ora, de forma rápida”: 取り急ぎ、お礼まで (por ora, só para agradecer). Use com quem você já conhece.', [
    ['s1', '山田様、お世話になっております。', 'yamada-sama, osewa ni natte orimasu.', 'Prezado Sr. Yamada, agradeço a parceria.', 'Abertura.'],
    ['s2', '初めてご連絡いたします。', 'hajimete gorenraku itashimasu.', 'Entro em contato pela primeira vez.', ''],
    ['s3', '添付ファイルをご確認ください。', 'tenpu fairu o gokakunin kudasai.', 'Por favor, confira o arquivo anexo.', '添付 = anexo.'],
    ['s4', 'ご確認のほど、よろしくお願いいたします。', 'gokakunin no hodo, yoroshiku onegai itashimasu.', 'Peço que confira, por favor.', 'Fechamento.'],
    ['s5', '取り急ぎ、お礼まで。', 'toriisogi, orei made.', 'Por ora, só para agradecer.', 'Mensagem curta.'],
    ['s6', 'ご返信が遅くなり、申し訳ございません。', 'gohenshin ga osoku nari, moushiwake gozaimasen.', 'Peço desculpas pela demora na resposta.', '']
  ], [
    ['お忙しいところ恐縮ですが、ご検討いただけますと幸いです。', 'oisogashii tokoro kyoushuku desu ga, gokentou itadakemasu to saiwai desu.', 'Sei que está ocupado, mas ficaria grato se pudesse considerar.']
  ], [
    X.s('Como começar um e-mail para um cliente conhecido?', ['お世話になっております|osewa ni natte orimasu', 'こんにちは！|konnichiwa!', 'お疲れ!|otsukare!'], 'Abertura padrão de negócios.'),
    X.s('O que é 添付ファイル?', ['arquivo anexo', 'arquivo apagado', 'arquivo salvo'], '添付 = anexo.'),
    X.f('Peço desculpas pela demora na resposta.', 'ご返信が＿、申し訳ございません。', ['遅くなり|osoku nari', '早くなり|hayaku nari', '遅くて|osokute'], '遅くなり = forma escrita de 遅くなって.'),
    X.s('Para um cliente novo, a primeira frase é:', ['初めてご連絡いたします|hajimete gorenraku itashimasu', '取り急ぎ、お礼まで|toriisogi, orei made', 'いつもありがとう|itsumo arigatou'], '初めて = primeira vez.')
  ]),
  L('c20l9', 'Pedir e recusar com educação', '頼', 'grammar', [
    'Pedidos ficam mais educados quanto mais indiretos: てください → てもらえますか → ていただけますか → ていただけないでしょうか.',
    'Almofadas (クッション言葉) suavizam: 恐れ入りますが, お手数ですが (desculpe o incômodo), 申し訳ないのですが.',
    'Recusas raramente dizem “não”: あいにく (infelizmente), せっかくですが (agradeço, mas), 今回は見送らせていただきます (desta vez vamos declinar).'
  ], '検討させていただきます (vamos analisar) muitas vezes é um “não” educado. Preste atenção ao contexto.', [
    ['s1', 'お手数ですが、こちらにご記入いただけますか。', 'otesuu desu ga, kochira ni gokinyuu itadakemasu ka.', 'Desculpe o incômodo, poderia preencher aqui?', ''],
    ['s2', '申し訳ないのですが、締め切りを延ばしていただけないでしょうか。', 'moushiwake nai no desu ga, shimekiri o nobashite itadakenai deshou ka.', 'Sinto muito, mas será que poderiam estender o prazo?', 'Muito educado.'],
    ['s3', 'あいにく、その日は先約がございまして。', 'ainiku, sono hi wa sen\'yaku ga gozaimashite.', 'Infelizmente, já tenho um compromisso nesse dia.', 'Recusa suave.'],
    ['s4', 'せっかくですが、今回は遠慮させていただきます。', 'sekkaku desu ga, konkai wa enryo sasete itadakimasu.', 'Agradeço o convite, mas desta vez vou declinar.', ''],
    ['s5', '社内で検討させていただきます。', 'shanai de kentou sasete itadakimasu.', 'Vamos analisar internamente.', 'Às vezes um “não” educado.'],
    ['s6', 'ご期待に沿えず、申し訳ございません。', 'gokitai ni soezu, moushiwake gozaimasen.', 'Lamento não poder atender às suas expectativas.', '']
  ], [
    ['恐れ入りますが、もう少しゆっくり話していただけますか。', 'osoreirimasu ga, mou sukoshi yukkuri hanashite itadakemasu ka.', 'Desculpe, poderia falar um pouco mais devagar?']
  ], [
    X.s('Qual pedido é MAIS educado?', ['ていただけないでしょうか|te itadakenai deshou ka', 'てもらえる？|te moraeru?', 'てください|te kudasai'], 'Quanto mais indireto, mais educado.'),
    X.s('O cliente convida você para jantar, mas você não pode. Qual frase?', ['せっかくですが、その日は都合が悪くて|sekkaku desu ga, sono hi wa tsugou ga warukute', '行きません|ikimasen', '嫌です|iya desu'], 'せっかくですが suaviza a recusa.'),
    X.f('Desculpe o incômodo, mas…', 'お＿ですが…', ['手数|tesuu', '世話|sewa', '疲れ|tsukare'], 'お手数ですが = desculpe o trabalho.'),
    X.s('O cliente diz 検討させていただきます. O que pode significar?', ['Vamos analisar (talvez seja um não)', 'Aceitamos com certeza', 'Recusamos com raiva'], 'Frequentemente é um “não” educado.')
  ]),
  L('c20l10', 'Erros comuns de keigo', '誤', 'grammar', [
    'Até japoneses erram keigo. O erro mais comum é o 二重敬語 (keigo duplo): おっしゃられる (おっしゃる + られる) e お召し上がりになる são considerados excessivos.',
    'Na fala de lojas há a バイト敬語 (keigo de atendente): こちらコーヒーになります e よろしかったでしょうか. São muito ouvidos, mas criticados; o correto é こちらコーヒーでございます e よろしいでしょうか.',
    'Outro erro: usar humilde para o cliente (参られる, 申される) ou respeitoso para si mesmo.'
  ], 'Na dúvida, a forma simples com です/ます é sempre aceitável. É melhor ser simples e correto do que exagerado e errado.', [
    ['s1', '部長がおっしゃいました。', 'buchou ga osshaimashita.', 'O diretor disse. (correto)', 'Errado: おっしゃられました.'],
    ['s2', 'こちら、ご注文のコーヒーでございます。', 'kochira, gochuumon no koohii de gozaimasu.', 'Aqui está o café que o senhor pediu. (correto)', 'Errado: コーヒーになります.'],
    ['s3', 'ご注文は以上でよろしいでしょうか。', 'gochuumon wa ijou de yoroshii deshou ka.', 'Seu pedido é só isso? (correto)', 'Errado: よろしかったでしょうか.'],
    ['s4', 'お客様がいらっしゃいました。', 'okyakusama ga irasshaimashita.', 'O cliente chegou. (correto)', 'Errado: 参られました (humilde para o cliente).'],
    ['s5', 'デザートも召し上がりますか。', 'dezaato mo meshiagarimasu ka.', 'Vai querer sobremesa também? (correto)', 'Excessivo: お召し上がりになりますか.'],
    ['s6', '千円からお預かりします。', 'sen\'en kara oazukari shimasu.', 'Recebo mil ienes. (comum, mas criticado)', 'Mais correto: 千円お預かりします.']
  ], [
    ['先生が拝見されました、は間違いで、ご覧になりました、が正しい。', 'sensei ga haiken saremashita, wa machigai de, goran ni narimashita, ga tadashii.', '“O professor 拝見されました” está errado; o certo é ご覧になりました.']
  ], [
    X.s('Qual está correto?', ['社長がおっしゃいました|shachou ga osshaimashita', '社長がおっしゃられました|shachou ga osshararemashita', '社長が申されました|shachou ga mousaremashita'], 'おっしゃられる é keigo duplo; 申す é humilde.'),
    X.s('Garçom servindo café, forma mais correta:', ['コーヒーでございます|koohii de gozaimasu', 'コーヒーになります|koohii ni narimasu', 'コーヒーでおります|koohii de orimasu'], 'になります é バイト敬語.'),
    X.e('Ao cliente: “O senhor chegou.”', ['お客様が|okyakusama ga', '参られました|mairaremashita'], 1, '参る é humilde; para o cliente: いらっしゃいました.'),
    X.s('O que é 二重敬語?', ['Keigo duplo, usado em excesso', 'Keigo para duas pessoas', 'Keigo escrito'], 'Ex.: おっしゃられる.')
  ])
  );
})();
