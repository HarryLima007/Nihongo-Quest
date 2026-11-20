/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5/N4): Situações Reais (c15)
   Frases prontas para usar, em escrita natural (kanji + leitura).
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c15', emblem: '街', title: 'Situações Reais', jp: 'じっさいの ばめん', stage: 'ini', jlpt: 'N5–N4',
    desc: 'Restaurante, loja de conveniência, compras, direções, trem, hotel, médico, telefone, casa de amigos, trabalho e emergências.',
    requires: 'c6', reqNote: 'Liberada ao concluir Construção de Frases.'
  });
  c.lessons.push(
  L('c15l1', 'No restaurante', '食', 'grammar', [
    'No Japão, o atendente fala em linguagem respeitosa (keigo). Você não precisa responder no mesmo nível: です/ます educado é perfeito.',
    'Para chamar o atendente, diga すみません! com a mão levantada. Não há gorjeta no Japão.',
    'Para pedir, a fórmula mais simples é: [prato] をお願いします ou [prato] をください. Para pagar: お会計お願いします.'
  ], 'Ao sair, diga ごちそうさまでした ao atendente: soa muito educado e simpático.', [
    ['s1', 'すみません、注文をお願いします。', 'sumimasen, chuumon o onegaishimasu.', 'Com licença, quero fazer o pedido.', ''],
    ['s2', 'おすすめは何ですか。', 'osusume wa nan desu ka.', 'O que você recomenda?', 'おすすめ = recomendação da casa.'],
    ['s3', 'これを一つと、これを二つお願いします。', 'kore o hitotsu to, kore o futatsu onegaishimasu.', 'Um destes e dois destes, por favor.', 'Apontando no cardápio.'],
    ['s4', '水をもらえますか。', 'mizu o moraemasu ka.', 'Pode me trazer água?', 'もらえますか = pode me dar?'],
    ['s5', '肉が食べられないんですが…。', 'niku ga taberarenai n desu ga….', 'É que eu não posso comer carne…', 'O が no final deixa a frase aberta e educada.'],
    ['s6', 'お会計、別々にできますか。', 'okaikei, betsubetsu ni dekimasu ka.', 'Dá para pagar separado?', '']
  ], [
    ['ご注文はお決まりですか。 … はい、天ぷらうどんをお願いします。', 'gochuumon wa okimari desu ka. … hai, tenpura udon o onegaishimasu.', 'Já escolheu? (atendente) … Sim, um udon com tempurá, por favor.']
  ], [
    X.s('Você quer saber o prato que a casa recomenda. O que pergunta?', ['おすすめは何ですか|osusume wa nan desu ka', 'メニューは何ですか|menyuu wa nan desu ka', 'お会計は何ですか|okaikei wa nan desu ka'], 'おすすめ = recomendação.'),
    X.s('Como pedir para pagar separado?', ['別々にできますか|betsubetsu ni dekimasu ka', '一緒にできますか|issho ni dekimasu ka', '半分にしますか|hanbun ni shimasu ka'], '別々 = separado.'),
    X.f('Pode me trazer água?', '水を＿＿＿＿＿か。', ['もらえます|moraemasu', 'あげます|agemasu', 'くれます|kuremasu'], 'もらえますか = posso receber? / pode me dar?'),
    X.o('Com licença, quero fazer o pedido.', ['すみません、|sumimasen,', '注文を|chuumon o', 'お願いします|onegaishimasu'], ['会計を|kaikei o'], 'Fórmula: [coisa] をお願いします.')
  ]),
  L('c15l2', 'Na loja de conveniência', '便', 'grammar', [
    'As lojas de conveniência (コンビニ) japonesas têm frases que se repetem sempre. Reconhecer essas perguntas evita aquele momento de pânico no caixa!',
    'O atendente pergunta se quer esquentar, se quer sacola, se precisa de talheres e como vai pagar. Muitas vezes basta responder はい、お願いします ou 大丈夫です (não precisa).',
    '大丈夫です, nesse contexto, é a recusa educada mais comum: “está tudo bem assim, não precisa”.'
  ], 'Ponto, cartão de fidelidade: ポイントカードはお持ちですか. Se não tiver: ないです ou 大丈夫です.', [
    ['s1', 'お箸はお付けしますか。', 'ohashi wa otsuke shimasu ka.', 'Quer hashi?', 'Keigo do atendente.'],
    ['s2', 'はい、お願いします。', 'hai, onegaishimasu.', 'Sim, por favor.', ''],
    ['s3', '袋は大丈夫です。', 'fukuro wa daijoubu desu.', 'Não preciso de sacola.', '大丈夫 = não precisa.'],
    ['s4', 'ポイントカードはお持ちですか。', 'pointo kaado wa omochi desu ka.', 'Tem cartão de pontos?', ''],
    ['s5', 'カードで払えますか。', 'kaado de haraemasu ka.', 'Dá para pagar com cartão?', '払う → 払える (potencial).'],
    ['s6', 'レシートは要りません。', 'reshiito wa irimasen.', 'Não preciso do recibo.', '要る (iru) = precisar.']
  ], [
    ['温めますか。 … はい、お願いします。', 'atatamemasu ka. … hai, onegaishimasu.', 'Quer esquentar? (atendente) … Sim, por favor.']
  ], [
    X.s('O atendente pergunta 袋はご利用ですか. Você não quer sacola. O que diz?', ['大丈夫です|daijoubu desu', 'はい、お願いします|hai, onegaishimasu', 'いただきます|itadakimasu'], '大丈夫です = não precisa, obrigado.'),
    X.s('O que significa お箸はお付けしますか?', ['Quer hashi?', 'Quer esquentar?', 'Quer sacola?'], 'お箸 = hashi.'),
    X.f('Dá para pagar com cartão?', 'カードで＿＿＿＿か。', ['払えます|haraemasu', '払います|haraimasu', '払いません|haraimasen'], 'Pergunta de possibilidade: potencial 払える.'),
    X.e('Recusando o recibo:', ['レシートは|reshiito wa', 'いります|irimasu'], 1, 'Não preciso: 要りません (irimasen).')
  ]),
  L('c15l3', 'Fazendo compras', '買', 'grammar', [
    'Para ver um produto: 見てもいいですか (posso ver?). Para provar roupa: 試着してもいいですか.',
    'Para perguntar se há outra opção: もう少し大きいのはありますか (tem um pouco maior?), ほかの色はありますか (tem outras cores?).',
    'Para recusar com educação ao sair sem comprar: ちょっと考えます (vou pensar um pouco) ou また来ます (volto depois).'
  ], 'Japoneses raramente dizem “não” direto ao recusar. また来ます é o jeito simpático de ir embora.', [
    ['s1', 'これ、試着してもいいですか。', 'kore, shichaku shite mo ii desu ka.', 'Posso provar isto?', ''],
    ['s2', 'もう少し大きいのはありますか。', 'mou sukoshi ookii no wa arimasu ka.', 'Tem um pouco maior?', 'の = “um / aquele”.'],
    ['s3', 'ほかの色はありますか。', 'hoka no iro wa arimasu ka.', 'Tem em outras cores?', ''],
    ['s4', 'もう少し安いのはありますか。', 'mou sukoshi yasui no wa arimasu ka.', 'Tem algum um pouco mais barato?', ''],
    ['s5', 'じゃあ、これにします。', 'jaa, kore ni shimasu.', 'Então vou levar este.', '〜にする = decidir por.'],
    ['s6', 'ちょっと考えます。', 'chotto kangaemasu.', 'Vou pensar um pouco.', 'Recusa educada.']
  ], [
    ['プレゼント用に包んでもらえますか。', 'purezento you ni tsutsunde moraemasu ka.', 'Pode embrulhar para presente?']
  ], [
    X.s('Você decidiu comprar a camiseta azul. O que diz?', ['これにします|kore ni shimasu', 'これがあります|kore ga arimasu', 'これを考えます|kore o kangaemasu'], '〜にします = decido por ~.'),
    X.s('Você não quer comprar e vai sair da loja com educação. O que diz?', ['ちょっと考えます|chotto kangaemasu', 'いりません！|irimasen!', 'だめです|dame desu'], 'Recusa suave: vou pensar.'),
    X.f('Tem em outras cores?', '＿＿＿の色はありますか。', ['ほか|hoka', 'この|kono', 'どの|dono'], 'ほかの = outro(s).'),
    X.o('Posso provar isto?', ['これ、|kore,', '試着しても|shichaku shite mo', 'いいですか|ii desu ka'], ['試着して|shichaku shite'], '〜てもいいですか = posso?')
  ]),
  L('c15l4', 'Pedindo e entendendo direções', '道', 'grammar', [
    'Para pedir direção: すみません、〜はどこですか ou 〜へはどうやって行けばいいですか (como faço para ir a ~?).',
    'Respostas típicas: まっすぐ行ってください (siga reto), 二つ目の角を右に曲がってください (vire à direita na segunda esquina), 左側にあります (fica do lado esquerdo).',
    '目 (me) depois do número indica ordem: 一つ目 (o primeiro), 二つ目 (o segundo), 三つ目の信号 (o terceiro semáforo).'
  ], 'Se não entender, peça: もう一度ゆっくりお願いします (mais uma vez, devagar, por favor).', [
    ['s1', '駅へはどうやって行けばいいですか。', 'eki e wa douyatte ikeba ii desu ka.', 'Como faço para ir à estação?', ''],
    ['s2', 'この道をまっすぐ行ってください。', 'kono michi o massugu itte kudasai.', 'Siga reto por esta rua.', ''],
    ['s3', '二つ目の角を右に曲がってください。', 'futatsume no kado o migi ni magatte kudasai.', 'Vire à direita na segunda esquina.', ''],
    ['s4', '信号を渡って、左側にあります。', 'shingou o watatte, hidarigawa ni arimasu.', 'Atravesse no semáforo, fica do lado esquerdo.', ''],
    ['s5', '歩いて何分ぐらいですか。', 'aruite nanpun gurai desu ka.', 'Quantos minutos a pé, mais ou menos?', ''],
    ['s6', '銀行の隣です。', 'ginkou no tonari desu.', 'Fica ao lado do banco.', '隣 = ao lado.']
  ], [
    ['コンビニの向かいに郵便局があります。', 'konbini no mukai ni yuubinkyoku ga arimasu.', 'Em frente à loja de conveniência há uma agência do correio.']
  ], [
    X.s('O que significa まっすぐ行ってください?', ['Siga reto.', 'Volte.', 'Vire à esquerda.'], 'まっすぐ = reto.'),
    X.f('Vire à esquerda no terceiro semáforo.', '三つ目の信号を＿に曲がってください。', ['左|hidari', '右|migi', '前|mae'], '左 = esquerda; 右 = direita.'),
    X.s('Como perguntar o tempo a pé?', ['歩いて何分ぐらいですか|aruite nanpun gurai desu ka', '何時に歩きますか|nanji ni arukimasu ka', '歩くのが好きですか|aruku no ga suki desu ka'], '歩いて = a pé; 何分 = quantos minutos.'),
    X.o('Fica ao lado do banco.', ['銀行の|ginkou no', '隣です|tonari desu'], ['前に|mae ni'], 'Lugar + の隣 = ao lado de.')
  ]),
  L('c15l5', 'Trem e estação', '駅', 'grammar', [
    'No trem japonês você ouve anúncios fixos: 次は〜です (a próxima é ~), ドアが閉まります (as portas vão fechar), お乗り換えです (baldeação).',
    'Para comprar passagem ou recarregar o cartão de transporte (Suica, Pasmo): 切符売り場 (bilheteria), チャージ (recarga).',
    '快速 (rápido) e 急行 (expresso) pulam estações. 各駅停車 (ou 普通) para em todas.'
  ], 'Pergunta salva-vidas: この電車は〜に止まりますか (Este trem para em ~?).', [
    ['s1', 'この電車は渋谷に止まりますか。', 'kono densha wa shibuya ni tomarimasu ka.', 'Este trem para em Shibuya?', ''],
    ['s2', '次の電車は何時ですか。', 'tsugi no densha wa nanji desu ka.', 'A que horas é o próximo trem?', ''],
    ['s3', '新宿で乗り換えてください。', 'shinjuku de norikaete kudasai.', 'Faça baldeação em Shinjuku.', ''],
    ['s4', '切符売り場はどこですか。', 'kippu uriba wa doko desu ka.', 'Onde fica a bilheteria?', ''],
    ['s5', '各駅停車に乗ってください。', 'kakuekiteisha ni notte kudasai.', 'Pegue o trem que para em todas as estações.', ''],
    ['s6', '終電に間に合わなかった。', 'shuuden ni maniawanakatta.', 'Perdi o último trem.', '終電 = último trem; 間に合う = chegar a tempo.']
  ], [
    ['まもなく、二番線に電車が参ります。', 'mamonaku, nibansen ni densha ga mairimasu.', 'Em instantes, o trem chegará à plataforma 2. (anúncio)']
  ], [
    X.s('Você quer saber se o trem para na sua estação. Como pergunta?', ['〜に止まりますか|~ni tomarimasu ka', '〜に乗りますか|~ni norimasu ka', '〜を降りますか|~o orimasu ka'], '止まる = parar.'),
    X.s('Você precisa ir a uma estação pequena. Qual trem pega?', ['各駅停車|kakuekiteisha', '急行|kyuukou', '快速|kaisoku'], 'O 各駅停車 para em todas as estações.'),
    X.f('Perdi o último trem.', '＿＿に間に合わなかった。', ['終電|shuuden', '始発|shihatsu', '急行|kyuukou'], '終電 = último trem. 始発 = primeiro trem.'),
    X.o('Faça baldeação em Shinjuku.', ['新宿で|shinjuku de', '乗り換えて|norikaete', 'ください|kudasai'], ['新宿に|shinjuku ni'], 'Lugar da baldeação: で.')
  ]),
  L('c15l6', 'No hotel', '宿', 'grammar', [
    'Check-in e check-out são チェックイン e チェックアウト. Reserva é 予約.',
    'Para dizer seu nome na recepção: 予約した〜です (sou ~, que fez a reserva).',
    'Em hotéis tradicionais (旅館, ryokan), o jantar e o café costumam estar incluídos, e há banho coletivo (大浴場).'
  ], 'Para deixar a bagagem antes do check-in: 荷物を預かってもらえますか.', [
    ['s1', '予約したシルバです。', 'yoyaku shita shiruba desu.', 'Sou Silva, tenho uma reserva.', 'Literalmente “Silva, que reservei”.'],
    ['s2', 'チェックアウトは何時ですか。', 'chekkuauto wa nanji desu ka.', 'Que horas é o check-out?', ''],
    ['s3', '荷物を預かってもらえますか。', 'nimotsu o azukatte moraemasu ka.', 'Pode guardar minha bagagem?', '預かる = guardar algo de alguém.'],
    ['s4', '朝ご飯は付いていますか。', 'asagohan wa tsuite imasu ka.', 'O café da manhã está incluído?', '付いている = vir junto.'],
    ['s5', 'Wi-Fiのパスワードを教えてください。', 'waifai no pasuwaado o oshiete kudasai.', 'Me passe a senha do Wi-Fi, por favor.', ''],
    ['s6', '部屋のエアコンが動かないんですが…。', 'heya no eakon ga ugokanai n desu ga….', 'É que o ar-condicionado do quarto não funciona…', 'Reclamação educada com んですが.']
  ], [
    ['もう一泊できますか。', 'mou ippaku dekimasu ka.', 'Posso ficar mais uma noite? (〜泊 = noites de hospedagem)']
  ], [
    X.s('Você quer deixar as malas no hotel antes do check-in. O que pergunta?', ['荷物を預かってもらえますか|nimotsu o azukatte moraemasu ka', '荷物を持ってもいいですか|nimotsu o motte mo ii desu ka', '荷物をあげます|nimotsu o agemasu'], '預かる = guardar para alguém.'),
    X.f('O café da manhã está incluído?', '朝ご飯は＿＿＿いますか。', ['付いて|tsuite', '食べて|tabete', '来て|kite'], '付いている = estar incluído.'),
    X.s('Por que se usa んですが em 動かないんですが…?', ['Para explicar o problema de forma educada e aberta', 'Para dar uma ordem', 'Para mostrar raiva'], 'んですが apresenta a situação e espera ajuda.'),
    X.o('Que horas é o check-out?', ['チェックアウトは|chekkuauto wa', '何時ですか|nanji desu ka'], ['どこですか|doko desu ka'], 'Assunto + は + 何時ですか (a que horas?).')
  ]),
  L('c15l7', 'No médico e na farmácia', '医', 'grammar', [
    'Na recepção do hospital: 初めてです (é minha primeira vez), 保険証 (cartão do seguro de saúde).',
    'O médico pergunta どうしましたか (o que houve?). Responda com 〜んです: 昨日から熱があるんです.',
    'Na farmácia, para dizer que é alérgico: 〜のアレルギーがあります.'
  ], 'Médicos e dentistas são chamados de 先生 pelos pacientes.', [
    ['s1', 'どうしましたか。', 'dou shimashita ka.', 'O que houve? (pergunta do médico)', ''],
    ['s2', '昨日から喉が痛いんです。', 'kinou kara nodo ga itai n desu.', 'É que estou com dor de garganta desde ontem.', ''],
    ['s3', '吐き気がします。', 'hakike ga shimasu.', 'Estou com enjoo.', '〜がする: sensação.'],
    ['s4', '卵のアレルギーがあります。', 'tamago no arerugii ga arimasu.', 'Tenho alergia a ovo.', ''],
    ['s5', 'この薬は一日に何回飲みますか。', 'kono kusuri wa ichinichi ni nankai nomimasu ka.', 'Quantas vezes por dia tomo este remédio?', ''],
    ['s6', '保険証を持っていますか。', 'hokenshou o motte imasu ka.', 'Você tem o cartão do seguro de saúde?', '']
  ], [
    ['しばらく安静にしてください。', 'shibaraku ansei ni shite kudasai.', 'Fique em repouso por um tempo.']
  ], [
    X.s('O médico pergunta どうしましたか. O que ele quer saber?', ['O que você está sentindo', 'Seu nome', 'Se você tem seguro'], 'どうしましたか = o que houve?'),
    X.f('Tenho alergia a camarão.', 'えびの＿＿＿＿＿があります。', ['アレルギー|arerugii', 'くすり|kusuri', 'ねつ|netsu'], '〜のアレルギーがあります = tenho alergia a ~.'),
    X.s('Como dizer “estou com enjoo”?', ['吐き気がします|hakike ga shimasu', '吐き気があります|hakike ga arimasu', '吐き気をします|hakike o shimasu'], 'Sensações físicas: 〜がする.'),
    X.e('“É que estou com febre desde ontem.”', ['昨日まで|kinou made', '熱があるんです|netsu ga aru n desu'], 0, 'Desde ontem: 昨日から. まで = até.')
  ]),
  L('c15l8', 'Ao telefone', '話', 'grammar', [
    'Ao atender: もしもし (alô) é usado entre conhecidos. Em empresas, atende-se com o nome: はい、〇〇です.',
    'Para perguntar se a pessoa está: 〜さんはいらっしゃいますか. Para dizer quem você é: 〜と申します (humilde).',
    'Se a ligação cair ou estiver ruim: 電波が悪いみたいです (parece que o sinal está ruim), またかけ直します (ligo de novo).'
  ], 'もしもし não se usa para atender clientes. Mas entre amigos e família é o padrão.', [
    ['s1', 'もしもし、今ちょっといい？', 'moshi moshi, ima chotto ii?', 'Alô, pode falar um pouquinho?', 'Casual.'],
    ['s2', '田中さんはいらっしゃいますか。', 'tanaka-san wa irasshaimasu ka.', 'O(A) senhor(a) Tanaka está?', 'いらっしゃる = estar (respeitoso).'],
    ['s3', 'シルバと申します。', 'shiruba to moushimasu.', 'Meu nome é Silva.', 'Humilde.'],
    ['s4', '担当の者に代わります。', 'tantou no mono ni kawarimasu.', 'Vou passar para o responsável.', '代わる = trocar (de pessoa ao telefone).'],
    ['s5', '電波が悪いみたいです。', 'denpa ga warui mitai desu.', 'Parece que o sinal está ruim.', ''],
    ['s6', 'また後でかけ直します。', 'mata ato de kakenaoshimasu.', 'Ligo de novo mais tarde.', 'かけ直す = ligar de novo.']
  ], [
    ['申し訳ありません、田中はただ今席を外しております。', 'moushiwake arimasen, tanaka wa tadaima seki o hazushite orimasu.', 'Desculpe, o Tanaka não está na mesa no momento. (empresa falando do próprio funcionário sem さん)']
  ], [
    X.s('Você liga para uma empresa e quer falar com o Sr. Sato. Como pergunta?', ['佐藤さんはいらっしゃいますか|satou-san wa irasshaimasu ka', '佐藤さんはいますか|satou-san wa imasu ka', '佐藤はいる？|satou wa iru?'], 'Para empresas, use いらっしゃいますか.'),
    X.s('Por que a empresa diz 田中は sem さん?', ['Porque fala de alguém do próprio grupo para alguém de fora', 'Porque o Tanaka é mais novo', 'É falta de educação'], 'Para gente de fora, não se honra o próprio colega.'),
    X.f('Ligo de novo mais tarde.', 'また後で＿＿＿＿＿＿。', ['かけ直します|kakenaoshimasu', '話します|hanashimasu', '待ちます|machimasu'], 'かけ直す = ligar de novo.'),
    X.o('Meu nome é Silva.', ['シルバと|shiruba to', '申します|moushimasu'], ['です|desu'], 'Nome + と申します.')
  ]),
  L('c15l9', 'Visitando a casa de alguém', '訪', 'grammar', [
    'Ao entrar: お邪魔します (com licença, literalmente “vou atrapalhar”). Ao sair: お邪魔しました.',
    'É educado levar um presentinho (手土産). Ao entregar, diga つまらないものですが (é uma coisinha simples, mas…). É modéstia, não insulto!',
    'O anfitrião diz どうぞ、上がってください (entre, por favor). 上がる porque a casa fica um degrau acima do 玄関.'
  ], 'Ao ser servido: いただきます. Ao recusar mais comida: もうお腹いっぱいです.', [
    ['s1', 'どうぞ、上がってください。', 'douzo, agatte kudasai.', 'Entre, por favor.', 'O anfitrião convidando a subir o degrau.'],
    ['s2', 'これ、つまらないものですが…。', 'kore, tsumaranai mono desu ga….', 'É uma coisinha simples, mas… (ao dar um presente)', 'Fórmula de modéstia.'],
    ['s3', 'わあ、ありがとうございます。', 'waa, arigatou gozaimasu.', 'Nossa, muito obrigado!', ''],
    ['s4', 'もうお腹いっぱいです。', 'mou onaka ippai desu.', 'Já estou satisfeito.', 'Recusando mais comida.'],
    ['s5', 'そろそろ失礼します。', 'sorosoro shitsurei shimasu.', 'Bom, já vou indo.', 'Despedida educada.'],
    ['s6', '今日はありがとうございました。楽しかったです。', 'kyou wa arigatou gozaimashita. tanoshikatta desu.', 'Obrigado por hoje. Foi divertido.', '']
  ], [
    ['また遊びに来てくださいね。', 'mata asobi ni kite kudasai ne.', 'Venha nos visitar de novo, tá? (o anfitrião, na despedida)']
  ], [
    X.s('Ao entregar um presente, a fórmula de modéstia é:', ['つまらないものですが|tsumaranai mono desu ga', 'おいしいものですよ|oishii mono desu yo', '高いものです|takai mono desu'], 'つまらないものですが: modéstia tradicional.'),
    X.s('Você quer ir embora da casa de alguém com educação. O que diz?', ['そろそろ失礼します|sorosoro shitsurei shimasu', 'もう帰る！|mou kaeru!', 'いってきます|ittekimasu'], 'そろそろ失礼します = bom, já vou indo.'),
    X.f('Já estou satisfeito.', 'もうお腹＿＿＿＿です。', ['いっぱい|ippai', 'すいた|suita', 'いたい|itai'], 'お腹いっぱい = barriga cheia.'),
    X.e('Saindo da casa do amigo:', ['お邪魔|ojama', 'します|shimasu'], 1, 'Ao sair: お邪魔しました (passado).')
  ]),
  L('c15l10', 'Pedindo ajuda e se desculpando', '助', 'grammar', [
    'Para pedir um favor: 〜てもらえますか (pode ~ para mim?) ou, mais educado, 〜ていただけますか.',
    'すみません serve para três coisas: chamar alguém, pedir desculpas leves e agradecer quando alguém se incomodou por você.',
    'Desculpas mais sérias: ごめんなさい (pessoal), 申し訳ありません (formal, trabalho, clientes).'
  ], 'Ao agradecer alguém que teve trabalho por você, すみません soa mais humilde que ありがとう.', [
    ['s1', '写真を撮ってもらえますか。', 'shashin o totte moraemasu ka.', 'Pode tirar uma foto minha?', ''],
    ['s2', 'ちょっと手伝ってもらえる？', 'chotto tetsudatte moraeru?', 'Pode me dar uma mãozinha?', 'Casual.'],
    ['s3', '道に迷ってしまいました。', 'michi ni mayotte shimaimashita.', 'Eu me perdi.', 'てしまう = algo que acabou acontecendo (lamento).'],
    ['s4', '遅れて、すみません。', 'okurete, sumimasen.', 'Desculpe o atraso.', ''],
    ['s5', '本当に申し訳ありませんでした。', 'hontou ni moushiwake arimasen deshita.', 'Peço sinceras desculpas.', 'Formal.'],
    ['s6', 'わざわざ、すみません。', 'wazawaza, sumimasen.', 'Obrigado por se dar ao trabalho.', 'Agradecendo com すみません.']
  ], [
    ['財布を落としてしまったんですが、届いていませんか。', 'saifu o otoshite shimatta n desu ga, todoite imasen ka.', 'Perdi minha carteira… alguém a entregou aqui?']
  ], [
    X.s('Um colega de trabalho perdeu um documento seu. Como ele pede desculpas formalmente?', ['申し訳ありません|moushiwake arimasen', 'ごめん！|gomen!', 'どうも|doumo'], 'No trabalho: 申し訳ありません.'),
    X.s('Alguém veio de longe só para te ajudar. Qual frase agradece com humildade?', ['わざわざ、すみません|wazawaza, sumimasen', 'どういたしまして|dou itashimashite', 'お邪魔します|ojama shimasu'], 'すみません também agradece quando alguém se incomodou por você.'),
    X.f('Pode tirar uma foto (para mim)?', '写真を撮って＿＿＿＿＿か。', ['もらえます|moraemasu', 'あげます|agemasu', 'います|imasu'], '〜てもらえますか = pode fazer para mim?'),
    X.o('Desculpe o atraso.', ['遅れて、|okurete,', 'すみません|sumimasen'], ['遅い|osoi'], 'A forma て de 遅れる dá o motivo da desculpa.')
  ]),
  L('c15l11', 'No trabalho: frases do dia a dia', '社', 'grammar', [
    'Ambientes de trabalho japoneses têm frases fixas para começar e terminar o dia.',
    'お疲れ様です serve como cumprimento entre colegas durante o dia e ao encontrar alguém no corredor. Ao sair antes dos outros: お先に失礼します.',
    'Para alguém que está saindo, os colegas respondem お疲れ様でした.'
  ], 'ご苦労様 é dito de superior para subordinado. Para chefes, use sempre お疲れ様です.', [
    ['s1', 'おはようございます。今日もよろしくお願いします。', 'ohayou gozaimasu. kyou mo yoroshiku onegaishimasu.', 'Bom dia. Conto com vocês hoje também.', ''],
    ['s2', 'お疲れ様です。', 'otsukaresama desu.', 'Olá (entre colegas, durante o expediente).', 'Literalmente “você está cansado”, reconhecendo o esforço.'],
    ['s3', 'お先に失礼します。', 'osaki ni shitsurei shimasu.', 'Com licença, vou sair antes.', 'Ao ir embora.'],
    ['s4', 'お疲れ様でした。', 'otsukaresama deshita.', 'Bom trabalho, até amanhã.', 'Resposta a quem sai.'],
    ['s5', 'すみません、ちょっとよろしいですか。', 'sumimasen, chotto yoroshii desu ka.', 'Com licença, tem um minutinho?', 'Para chamar alguém ocupado.'],
    ['s6', '確認して、後で連絡します。', 'kakunin shite, ato de renraku shimasu.', 'Vou verificar e depois aviso.', '']
  ], [
    ['この資料、明日までにお願いできますか。', 'kono shiryou, ashita made ni onegai dekimasu ka.', 'Pode me entregar este material até amanhã?']
  ], [
    X.s('Você vai embora do escritório e seus colegas continuam trabalhando. O que diz?', ['お先に失礼します|osaki ni shitsurei shimasu', 'お疲れ様でした|otsukaresama deshita', 'いってきます|ittekimasu'], 'Quem sai primeiro: お先に失礼します.'),
    X.s('Um colega se despede no fim do dia. Você responde:', ['お疲れ様でした|otsukaresama deshita', 'お先に失礼します|osaki ni shitsurei shimasu', 'ただいま|tadaima'], 'Para quem sai: お疲れ様でした.'),
    X.s('Qual destas frases NÃO se diz a um chefe?', ['ご苦労様です|gokurousama desu', 'お疲れ様です|otsukaresama desu', 'よろしくお願いします|yoroshiku onegaishimasu'], 'ご苦労様 vai de superior para subordinado.'),
    X.o('Vou verificar e depois aviso.', ['確認して、|kakunin shite,', '後で|ato de', '連絡します|renraku shimasu'], ['前に|mae ni'], '確認して (verifico) + 後で (depois) + 連絡します (aviso).')
  ]),
  L('c15l12', 'Emergências', '急', 'grammar', [
    'No Japão: 110 é a polícia (警察) e 119 são os bombeiros e a ambulância (救急車). Ao ligar para o 119, diga se é 火事 (incêndio) ou 救急 (emergência médica).',
    'Frases curtas salvam: 助けて！ (socorro!), 救急車を呼んでください (chame uma ambulância), 泥棒！ (ladrão!).',
    'Em terremotos (地震), ouça os avisos: 落ち着いてください (mantenha a calma), 避難してください (evacue).'
  ], 'Decore: 110 (ひゃくとおばん) polícia, 119 (ひゃくじゅうきゅうばん) bombeiros e ambulância.', [
    ['s1', '救急車を呼んでください！', 'kyuukyuusha o yonde kudasai!', 'Chame uma ambulância!', ''],
    ['s2', '火事です！', 'kaji desu!', 'É um incêndio!', ''],
    ['s3', '財布を盗まれました。', 'saifu o nusumaremashita.', 'Roubaram minha carteira.', 'Passiva: “fui roubado”.'],
    ['s4', '地震だ！机の下に隠れて！', 'jishin da! tsukue no shita ni kakurete!', 'Terremoto! Se esconda debaixo da mesa!', ''],
    ['s5', '落ち着いて、避難してください。', 'ochitsuite, hinan shite kudasai.', 'Mantenha a calma e evacue.', ''],
    ['s6', '日本語が分かる人はいますか。', 'nihongo ga wakaru hito wa imasu ka.', 'Tem alguém que entenda japonês?', 'Útil ao contrário também: 英語が分かる人…']
  ], [
    ['ここはどこですか。住所が分かりません。', 'koko wa doko desu ka. juusho ga wakarimasen.', 'Onde é aqui? Não sei o endereço.']
  ], [
    X.s('Para chamar uma ambulância no Japão, qual número?', ['119', '110', '190'], '119: bombeiros e ambulância. 110: polícia.'),
    X.s('O que significa 避難してください?', ['Evacue (saia do local).', 'Fique em casa.', 'Ligue para a polícia.'], '避難 = evacuação, refúgio.'),
    X.f('Chame uma ambulância!', '救急車を＿＿＿ください！', ['呼んで|yonde', '読んで|yonde', '待って|matte'], '呼ぶ (chamar) → 呼んで. Atenção: 読んで (ler) soa igual!'),
    X.e('“Roubaram minha carteira.”', ['財布を|saifu o', '盗みました|nusumimashita'], 1, 'Você foi a vítima: passiva 盗まれました.')
  ]),
  L('c15l13', 'Cabeleireiro, correio e banco', '用', 'grammar', [
    'No cabeleireiro (美容院): 少しだけ切ってください (corte só um pouco), 前髪を短くしてください (deixe a franja curta).',
    'No correio (郵便局): これをブラジルに送りたいんですが (quero mandar isto para o Brasil), 航空便 (via aérea), 船便 (via marítima).',
    'No banco: 口座を作りたいです (quero abrir uma conta), 両替 (câmbio de moeda), 振り込み (transferência).'
  ], '〜たいんですが é a forma mais natural de começar um pedido num balcão.', [
    ['s1', '少しだけ切ってください。', 'sukoshi dake kitte kudasai.', 'Corte só um pouquinho, por favor.', ''],
    ['s2', '前髪を短くしてください。', 'maegami o mijikaku shite kudasai.', 'Deixe a franja curta, por favor.', '短い → 短くする.'],
    ['s3', 'これをブラジルに送りたいんですが。', 'kore o burajiru ni okuritai n desu ga.', 'Quero mandar isto para o Brasil.', ''],
    ['s4', '航空便でお願いします。', 'koukuubin de onegaishimasu.', 'Por via aérea, por favor.', ''],
    ['s5', '口座を作りたいんですが。', 'kouza o tsukuritai n desu ga.', 'Quero abrir uma conta.', ''],
    ['s6', 'ドルを円に両替できますか。', 'doru o en ni ryougae dekimasu ka.', 'Posso trocar dólar por iene?', '']
  ], [
    ['いつごろ届きますか。', 'itsu goro todokimasu ka.', 'Mais ou menos quando chega?']
  ], [
    X.s('No correio, você quer mandar por via aérea. O que diz?', ['航空便でお願いします|koukuubin de onegaishimasu', '船便でお願いします|funabin de onegaishimasu', '速達じゃないです|sokutatsu janai desu'], '航空便 = via aérea.'),
    X.f('Deixe a franja curta, por favor.', '前髪を短＿してください。', ['く|ku', 'い|i', 'に|ni'], '短い → 短くする.'),
    X.s('Qual é o jeito natural de começar um pedido no balcão?', ['〜たいんですが|~tai n desu ga', '〜たいだ|~tai da', '〜しろ|~shiro'], '〜たいんですが abre o pedido com educação.'),
    X.o('Posso trocar dólar por iene?', ['ドルを|doru o', '円に|en ni', '両替できますか|ryougae dekimasu ka'], ['円で|en de'], '〜を〜に両替する.')
  ]),
  L('c15l14', 'Fazendo amigos e mantendo contato', '友', 'grammar', [
    'Para trocar contatos: LINE (o aplicativo de mensagens mais usado no Japão) やってる？ ou 連絡先を交換しませんか.',
    'Para propor sair: 今度、ご飯でも行きませんか (da próxima vez, que tal comermos algo?). でも suaviza: “comida ou algo assim”.',
    'Ao reencontrar: 久しぶり (quanto tempo!) e 元気だった？ (você estava bem?).'
  ], '今度 (da próxima vez) às vezes é só educação, sem data marcada. Se quiser combinar de verdade, sugira um dia: 来週の土曜日はどう？', [
    ['s1', 'LINE、交換しない？', 'rain, koukan shinai?', 'Vamos trocar o LINE?', 'Casual: convite com ない？'],
    ['s2', '連絡先を交換しませんか。', 'renrakusaki o koukan shimasen ka.', 'Vamos trocar contatos?', 'Educado.'],
    ['s3', '今度、ご飯でも行きませんか。', 'kondo, gohan demo ikimasen ka.', 'Que tal comermos algo um dia desses?', 'でも = ou algo assim.'],
    ['s4', '来週の土曜日はどう？', 'raishuu no doyoubi wa dou?', 'Que tal sábado que vem?', ''],
    ['s5', '趣味は何ですか。', 'shumi wa nan desu ka.', 'Qual é o seu hobby?', ''],
    ['s6', '話せて楽しかった！また話そうね。', 'hanasete tanoshikatta! mata hanasou ne.', 'Foi ótimo conversar! Vamos conversar de novo.', '']
  ], [
    ['インスタやってる？フォローするね。', 'insuta yatteru? forou suru ne.', 'Você tem Instagram? Vou te seguir.']
  ], [
    X.s('O que でも faz em ご飯でも行きませんか?', ['Suaviza: “comer ou algo assim”', 'Significa “mas”', 'Significa “também”'], 'でも depois do substantivo dá um tom vago e gentil.'),
    X.s('Alguém diz 今度ご飯行こう sem marcar data. O que pode significar?', ['Pode ser só simpatia; para combinar de verdade, sugira um dia', 'Que o encontro é amanhã', 'Que a pessoa está brava'], '今度 às vezes é só educação.'),
    X.f('Foi divertido conversar!', '話せて＿＿＿＿＿！', ['楽しかった|tanoshikatta', '嬉しい|ureshii', 'よかったね|yokatta ne'], 'A atividade foi divertida: 楽しかった.'),
    X.o('Vamos trocar contatos?', ['連絡先を|renrakusaki o', '交換しませんか|koukan shimasen ka'], ['交換しました|koukan shimashita'], 'Convite educado: 〜ませんか.')
  ])
  );
})();
