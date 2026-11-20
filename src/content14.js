/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N3): Vocabulário N3 (c19)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c19', emblem: '彙', title: 'Vocabulário N3', jp: 'ごい', stage: 'int', jlpt: 'N3',
    desc: 'Sentimentos, trabalho, meio ambiente, tecnologia, sociedade, saúde, relacionamentos, personalidade, verbos, advérbios, onomatopeias, dinheiro e viagem.',
    requires: ['c11', 'c16'], reqWhy: 'O vocabulário N3 aparece em frases que usam a gramática N4.'
  });
  c.lessons.push(
  L('c19l1', 'Sentimentos complexos', '情', 'vocab', [
    'No nível N3, os sentimentos ficam mais precisos: não só “feliz” e “triste”, mas ansiedade, alívio, arrependimento, emoção e frustração.',
    'Muitos são substantivos que viram verbo com する: 安心する (ficar aliviado), 感動する (se emocionar), 後悔する (se arrepender).',
    '憧れ é admirar alguém e querer ser como essa pessoa: 先輩に憧れる. Também vale para lugares e estilos de vida: 東京の生活に憧れる.'
  ], 'がっかりする (ficar decepcionado) é muito usado e informal; em situações formais, 残念です soa melhor.', [
    ['fuan', '不安', 'fuan', 'ansiedade, insegurança', '不安な気持ち = sentimento de insegurança.', ['試験の結果が不安です。', 'shiken no kekka ga fuan desu.', 'Estou ansioso com o resultado da prova.']],
    ['anshin', '安心', 'anshin', 'alívio, tranquilidade', '安心する = ficar tranquilo.', ['無事だと聞いて安心した。', 'buji da to kiite anshin shita.', 'Fiquei aliviado ao saber que estava bem.']],
    ['koukai', '後悔', 'koukai', 'arrependimento', '後悔する = arrepender-se.', ['あの時、言わなかったことを後悔している。', 'ano toki, iwanakatta koto o koukai shite iru.', 'Me arrependo de não ter dito naquela hora.']],
    ['kandou', '感動', 'kandou', 'emoção (comoção)', 'Para filmes, músicas: 感動した!', ['あの映画を見て、とても感動した。', 'ano eiga o mite, totemo kandou shita.', 'Fiquei muito emocionado com aquele filme.']],
    ['kinchou', '緊張', 'kinchou', 'nervosismo, tensão', '緊張する = ficar nervoso.', ['面接の前はいつも緊張する。', 'mensetsu no mae wa itsumo kinchou suru.', 'Sempre fico nervoso antes de entrevistas.']],
    ['gaman', '我慢', 'gaman', 'paciência, aguentar', '我慢する = aguentar, se segurar. Valor cultural importante no Japão.', ['トイレまで我慢できない！', 'toire made gaman dekinai!', 'Não aguento até chegar ao banheiro!']],
    ['kitai', '期待', 'kitai', 'expectativa', '期待する = esperar (com esperança).', ['あまり期待しないでね。', 'amari kitai shinaide ne.', 'Não crie muita expectativa, tá?']],
    ['gakkari', 'がっかり', 'gakkari', 'decepção', 'がっかりする = ficar decepcionado.', ['試合に負けて、がっかりした。', 'shiai ni makete, gakkari shita.', 'Perdemos o jogo e fiquei decepcionado.']],
    ['akogare', '憧れ', 'akogare', 'admiração, sonho (querer ser como alguém)', '憧れる = admirar, sonhar com.', ['子供の頃から、パイロットに憧れていた。', 'kodomo no koro kara, pairotto ni akogarete ita.', 'Desde criança eu sonhava em ser piloto.']],
    ['natsukashii', '懐かしい', 'natsukashii', 'nostálgico, que saudade', 'Não tem tradução exata: alegria ao lembrar algo do passado.', ['この歌、懐かしいね。', 'kono uta, natsukashii ne.', 'Esta música, que saudade, hein.']]
  ], [
    ['期待していたのに、がっかりした。', 'kitai shite ita noni, gakkari shita.', 'Eu estava com expectativa, mas fiquei decepcionado.'],
    ['緊張したけど、うまく話せて安心した。', 'kinchou shita kedo, umaku hanasete anshin shita.', 'Fiquei nervoso, mas consegui falar bem e fiquei aliviado.']
  ], [
    X.s('Você admira um atleta e sonha ser como ele. Qual palavra?', ['憧れ|akogare', '懐かしい|natsukashii', '安心|anshin'], '憧れ = admiração, sonho.'),
    X.s('Você vê uma foto antiga da escola. O que diz?', ['懐かしい！|natsukashii!', '悔しい！|kuyashii!', '緊張する！|kinchou suru!'], '懐かしい = que saudade.'),
    X.f('Fico nervoso antes da apresentação.', '発表の前は＿する。', ['緊張|kinchou', '後悔|koukai', '期待|kitai'], '緊張する = ficar nervoso.'),
    X.s('O que significa 我慢する?', ['aguentar, se segurar', 'se arrepender', 'ficar aliviado'], '我慢 = paciência, aguentar.')
  ]),
  L('c19l2', 'Trabalho e carreira', '職', 'vocab', [
    'Vocabulário essencial para procurar emprego, falar do trabalho e entender notícias sobre empresas.',
    '就職 é conseguir o primeiro emprego (ou entrar numa empresa); 転職 é mudar de emprego. No Japão, o 就職活動 (就活) dos universitários é um processo enorme.',
    '上司 (chefe), 部下 (subordinado) e 同僚 (colega) mostram a hierarquia, que é muito importante no ambiente de trabalho japonês.'
  ], '残業 (hora extra) é tão comum que existe 残業代 (pagamento de hora extra) e o problema social 過労 (excesso de trabalho).', [
    ['shuushoku', '就職', 'shuushoku', 'conseguir emprego', '就職する. 就活 = busca de emprego (abreviação).', ['大学を卒業して、銀行に就職した。', 'daigaku o sotsugyou shite, ginkou ni shuushoku shita.', 'Me formei e fui trabalhar num banco.']],
    ['tenshoku', '転職', 'tenshoku', 'mudança de emprego', '', ['もっと給料のいい会社に転職したい。', 'motto kyuuryou no ii kaisha ni tenshoku shitai.', 'Quero mudar para uma empresa que pague melhor.']],
    ['kyuuryou', '給料', 'kyuuryou', 'salário', '給料日 = dia do pagamento.', ['今日は給料日だ！', 'kyou wa kyuuryoubi da!', 'Hoje é dia de pagamento!']],
    ['shucchou', '出張', 'shucchou', 'viagem a trabalho', '出張する.', ['来週、大阪へ出張します。', 'raishuu, oosaka e shucchou shimasu.', 'Semana que vem vou a Osaka a trabalho.']],
    ['mensetsu', '面接', 'mensetsu', 'entrevista (de emprego)', '面接を受ける = fazer uma entrevista.', ['明日、面接を受けます。', 'ashita, mensetsu o ukemasu.', 'Amanhã vou fazer uma entrevista.']],
    ['rirekisho', '履歴書', 'rirekisho', 'currículo', 'No Japão costuma ter formato padrão e foto.', ['履歴書に写真を貼ってください。', 'rirekisho ni shashin o hatte kudasai.', 'Cole uma foto no currículo, por favor.']],
    ['joushi', '上司', 'joushi', 'chefe, superior', '', ['上司に相談してみます。', 'joushi ni soudan shite mimasu.', 'Vou consultar meu chefe.']],
    ['buka', '部下', 'buka', 'subordinado', '', ['彼は部下に優しい。', 'kare wa buka ni yasashii.', 'Ele é gentil com os subordinados.']],
    ['douryou', '同僚', 'douryou', 'colega de trabalho', '', ['同僚と昼ご飯を食べに行った。', 'douryou to hirugohan o tabe ni itta.', 'Fui almoçar com colegas de trabalho.']],
    ['taishoku', '退職', 'taishoku', 'deixar o emprego, aposentar-se', '定年退職 = aposentadoria por idade.', ['父は来年、退職します。', 'chichi wa rainen, taishoku shimasu.', 'Meu pai se aposenta no ano que vem.']]
  ], [
    ['面接で、前の会社をやめた理由を聞かれた。', 'mensetsu de, mae no kaisha o yameta riyuu o kikareta.', 'Na entrevista, me perguntaram por que saí da empresa anterior.'],
    ['同僚が転職することになって、寂しい。', 'douryou ga tenshoku suru koto ni natte, sabishii.', 'Um colega vai mudar de emprego e vou sentir falta.']
  ], [
    X.s('Quem trabalha no mesmo nível que você é seu:', ['同僚|douryou', '上司|joushi', '部下|buka'], '同僚 = colega.'),
    X.s('Você vai trocar de empresa. É um:', ['転職|tenshoku', '就職|shuushoku', '退職|taishoku'], '転職 = mudar de emprego.'),
    X.f('Preciso escrever meu currículo.', '＿を書かなければならない。', ['履歴書|rirekisho', '給料|kyuuryou', '面接|mensetsu'], '履歴書 = currículo.'),
    X.s('O que é 出張?', ['viagem a trabalho', 'salário', 'folga'], '出 (sair) + 張 (estender).')
  ]),
  L('c19l3', 'Meio ambiente e desastres', '環', 'vocab', [
    'O Japão tem terremotos, tufões e chuvas fortes, e por isso há muito vocabulário de prevenção nas notícias, escolas e avisos.',
    '災害 é desastre natural em geral. 避難 é evacuar: em cada bairro existe um 避難所 (abrigo), indicado por placas.',
    'Temas ambientais também são comuns: 環境 (meio ambiente), 温暖化 (aquecimento global) e a separação rígida do lixo para reciclagem.'
  ], 'No Japão, o lixo é separado em 燃えるごみ (queimável) e 燃えないごみ (não queimável), além de recicláveis, com dias fixos de coleta.', [
    ['kankyou', '環境', 'kankyou', 'meio ambiente; ambiente', '環境問題 = problemas ambientais.', ['環境を守るために、何ができるだろう。', 'kankyou o mamoru tame ni, nani ga dekiru darou.', 'O que podemos fazer para proteger o meio ambiente?']],
    ['shizen', '自然', 'shizen', 'natureza; natural', '自然な日本語 = japonês natural.', ['田舎は自然が豊かだ。', 'inaka wa shizen ga yutaka da.', 'O interior é rico em natureza.']],
    ['saigai', '災害', 'saigai', 'desastre (natural)', '', ['災害に備えて、水を買っておく。', 'saigai ni sonaete, mizu o katte oku.', 'Compro água de antemão, para me preparar para desastres.']],
    ['hinan', '避難', 'hinan', 'evacuação, refúgio', '避難所 = abrigo.', ['すぐに高い所へ避難してください。', 'sugu ni takai tokoro e hinan shite kudasai.', 'Evacuem imediatamente para um lugar alto.']],
    ['tsunami', '津波', 'tsunami', 'tsunami', 'Palavra japonesa usada no mundo todo.', ['地震の後は津波に注意してください。', 'jishin no ato wa tsunami ni chuui shite kudasai.', 'Depois de um terremoto, cuidado com tsunamis.']],
    ['ondanka', '温暖化', 'ondanka', 'aquecimento global', '地球温暖化 (chikyuu ondanka) é a forma completa.', ['温暖化で、夏が暑くなっている。', 'ondanka de, natsu ga atsuku natte iru.', 'Com o aquecimento global, os verões estão ficando mais quentes.']],
    ['osen', '汚染', 'osen', 'poluição, contaminação', '大気汚染 = poluição do ar.', ['川の汚染が問題になっている。', 'kawa no osen ga mondai ni natte iru.', 'A poluição dos rios virou um problema.']],
    ['shigen', '資源', 'shigen', 'recursos (naturais)', '', ['日本は資源が少ない国だ。', 'nihon wa shigen ga sukunai kuni da.', 'O Japão é um país com poucos recursos naturais.']],
    ['risaikuru', 'リサイクル', 'risaikuru', 'reciclagem', '', ['ペットボトルはリサイクルできます。', 'pettobotoru wa risaikuru dekimasu.', 'Garrafas PET podem ser recicladas.']],
    ['gomi', 'ゴミの分別', 'gomi no bunbetsu', 'separação do lixo', '分別 (bunbetsu) = separar por tipo.', ['この町はゴミの分別が厳しい。', 'kono machi wa gomi no bunbetsu ga kibishii.', 'Esta cidade é rigorosa com a separação do lixo.']]
  ], [
    ['災害の時に避難する場所を、家族で確認しておこう。', 'saigai no toki ni hinan suru basho o, kazoku de kakunin shite okou.', 'Vamos combinar em família o lugar para onde evacuar em caso de desastre.'],
    ['自然を守ることは、私たちの未来を守ることだ。', 'shizen o mamoru koto wa, watashitachi no mirai o mamoru koto da.', 'Proteger a natureza é proteger o nosso futuro.']
  ], [
    X.s('O alarme de tsunami tocou. O que fazer?', ['高い所に避難する|takai tokoro ni hinan suru', '海に行く|umi ni iku', '窓を開ける|mado o akeru'], '避難 = evacuar para lugar seguro.'),
    X.s('O que é 温暖化?', ['aquecimento global', 'poluição', 'reciclagem'], '温暖 (quente) + 化 (transformação).'),
    X.f('Para proteger o meio ambiente…', '＿を守るために…', ['環境|kankyou', '災害|saigai', '汚染|osen'], '環境 = meio ambiente.'),
    X.s('Na cidade japonesa, você deve fazer:', ['ゴミの分別|gomi no bunbetsu', 'ゴミの温暖化|gomi no ondanka', 'ゴミの避難|gomi no hinan'], 'Separar o lixo é obrigatório.')
  ]),
  L('c19l4', 'Tecnologia e internet', '電', 'vocab', [
    'No dia a dia, você usa estas palavras em menus de celular, sites, aplicativos e conversas sobre tecnologia.',
    'Muitas são katakana do inglês (ダウンロード, パスワード), mas as ações principais usam kanji: 検索 (pesquisar), 保存 (salvar), 削除 (apagar), 設定 (configurações).',
    'Saber ler esses kanji ajuda muito a configurar um celular ou computador em japonês.'
  ], 'スマホ (smartphone), パソコン (computador pessoal) e ネット (internet) são as abreviações que todo mundo usa.', [
    ['kensaku', '検索', 'kensaku', 'pesquisa, busca', '検索する = pesquisar (na internet).', ['わからない言葉はネットで検索する。', 'wakaranai kotoba wa netto de kensaku suru.', 'Pesquiso na internet as palavras que não sei.']],
    ['hozon', '保存', 'hozon', 'salvar, guardar', '', ['ファイルを保存するのを忘れた！', 'fairu o hozon suru no o wasureta!', 'Esqueci de salvar o arquivo!']],
    ['sakujo', '削除', 'sakujo', 'apagar, excluir', '', ['古い写真を削除した。', 'furui shashin o sakujo shita.', 'Apaguei as fotos antigas.']],
    ['settei', '設定', 'settei', 'configurações; ajuste', '設定を変える = mudar a configuração.', ['スマホの言語設定を日本語にした。', 'sumaho no gengo settei o nihongo ni shita.', 'Coloquei o idioma do celular em japonês.']],
    ['gamen', '画面', 'gamen', 'tela', '', ['画面が割れてしまった。', 'gamen ga warete shimatta.', 'A tela trincou.']],
    ['juuden', '充電', 'juuden', 'carregar (bateria)', '充電器 = carregador.', ['スマホを充電してもいいですか。', 'sumaho o juuden shite mo ii desu ka.', 'Posso carregar o celular?']],
    ['koushin', '更新', 'koushin', 'atualização; renovação', 'Também para renovar contrato ou visto.', ['アプリを更新してください。', 'apuri o koushin shite kudasai.', 'Atualize o aplicativo, por favor.']],
    ['touroku', '登録', 'touroku', 'cadastro, registro', '会員登録 = cadastro de membro.', ['このサイトに登録しました。', 'kono saito ni touroku shimashita.', 'Me cadastrei neste site.']],
    ['pasuwaado', 'パスワード', 'pasuwaado', 'senha', '', ['パスワードを忘れてしまった。', 'pasuwaado o wasurete shimatta.', 'Esqueci a senha.']],
    ['soushin', '送信', 'soushin', 'enviar (mensagem, e-mail)', '受信 (jushin) = receber.', ['メールを送信しました。', 'meeru o soushin shimashita.', 'Enviei o e-mail.']]
  ], [
    ['パスワードを変更するには、設定画面を開いてください。', 'pasuwaado o henkou suru ni wa, settei gamen o hiraite kudasai.', 'Para mudar a senha, abra a tela de configurações.'],
    ['充電が切れそうだから、保存しておこう。', 'juuden ga kiresou da kara, hozon shite okou.', 'A bateria está acabando, então vou salvar.']
  ], [
    X.s('No menu do celular, qual botão apaga uma foto?', ['削除|sakujo', '保存|hozon', '検索|kensaku'], '削除 = excluir.'),
    X.s('Qual botão salva um arquivo?', ['保存|hozon', '送信|soushin', '更新|koushin'], '保存 = salvar.'),
    X.f('A bateria acabou. Preciso carregar.', '電池が切れた。＿しなきゃ。', ['充電|juuden', '登録|touroku', '設定|settei'], '充電 = carregar.'),
    X.s('O que significa 送信?', ['enviar', 'receber', 'cadastrar'], '送 (enviar) + 信 (mensagem).')
  ]),
  L('c19l5', 'Sociedade e notícias', '社', 'vocab', [
    'Para acompanhar notícias em japonês, você precisa de palavras de política, economia, crimes e leis.',
    'As notícias usam um estilo formal, cheio de kanji compostos. Ler manchetes é ótimo treino para o N3.',
    'Muitos compostos usam 社会 (sociedade), 経済 (economia) e 政治 (política) como base.'
  ], 'Na TV, ニュース; no jornal, 新聞; online, ネットニュース. As manchetes cortam partículas: 「首相、来日へ」.', [
    ['seiji', '政治', 'seiji', 'política', '政治家 = político.', ['政治にはあまり興味がない。', 'seiji ni wa amari kyoumi ga nai.', 'Não tenho muito interesse em política.']],
    ['keizai', '経済', 'keizai', 'economia', '', ['日本の経済について勉強している。', 'nihon no keizai ni tsuite benkyou shite iru.', 'Estou estudando a economia japonesa.']],
    ['senkyo', '選挙', 'senkyo', 'eleição', '選挙に行く = ir votar.', ['日曜日は選挙に行きます。', 'nichiyoubi wa senkyo ni ikimasu.', 'No domingo vou votar.']],
    ['shakai', '社会', 'shakai', 'sociedade', '社会人 = adulto que trabalha.', ['社会人になって、生活が変わった。', 'shakaijin ni natte, seikatsu ga kawatta.', 'Desde que comecei a trabalhar, minha vida mudou.']],
    ['jiken', '事件', 'jiken', 'caso, incidente (crime)', '事故 é acidente; 事件 é caso (geralmente crime).', ['昨日、近所で事件があった。', 'kinou, kinjo de jiken ga atta.', 'Ontem houve um crime na vizinhança.']],
    ['hannin', '犯人', 'hannin', 'criminoso, culpado', '', ['犯人はまだ捕まっていない。', 'hannin wa mada tsukamatte inai.', 'O criminoso ainda não foi pego.']],
    ['keisatsu', '警察', 'keisatsu', 'polícia', '交番 = posto policial de bairro.', ['財布を落としたので、警察に届けた。', 'saifu o otoshita node, keisatsu ni todoketa.', 'Perdi a carteira e avisei a polícia.']],
    ['houritsu', '法律', 'houritsu', 'lei', '', ['法律で禁止されている。', 'houritsu de kinshi sarete iru.', 'É proibido por lei.']],
    ['zeikin', '税金', 'zeikin', 'imposto', '消費税 = imposto sobre consumo.', ['毎年、税金が上がる。', 'maitoshi, zeikin ga agaru.', 'Os impostos sobem todo ano.']],
    ['kokusai', '国際', 'kokusai', 'internacional', '国際的 = internacional (adjetivo).', ['国際会議に参加する。', 'kokusai kaigi ni sanka suru.', 'Participar de uma conferência internacional.']]
  ], [
    ['ニュースによると、事件の犯人が警察に捕まったそうだ。', 'nyuusu ni yoru to, jiken no hannin ga keisatsu ni tsukamatta sou da.', 'Segundo o noticiário, o autor do crime foi preso pela polícia.'],
    ['選挙の結果で、経済が変わるかもしれない。', 'senkyo no kekka de, keizai ga kawaru kamoshirenai.', 'A economia pode mudar com o resultado da eleição.']
  ], [
    X.s('Um roubo é um:', ['事件|jiken', '事故|jiko', '選挙|senkyo'], '事件 = caso, crime. 事故 = acidente.'),
    X.s('Uma pessoa que trabalha e se sustenta é um:', ['社会人|shakaijin', '政治家|seijika', '犯人|hannin'], '社会人 = adulto trabalhador.'),
    X.f('Imposto sobre consumo', '消費＿', ['税|zei', '金|kin', '法|hou'], '消費税 = shouhizei.'),
    X.s('O que significa 国際?', ['internacional', 'nacional', 'econômico'], '国際 = internacional.')
  ]),
  L('c19l6', 'Saúde e tratamento', '療', 'vocab', [
    'Palavras para entender o médico, falar de sintomas e tratamentos, e lidar com o hospital.',
    'No hospital japonês você passa por 受付 (recepção), 診察 (consulta) e às vezes 検査 (exames). Depois pega o remédio com uma receita (処方箋) na farmácia.',
    '怪我 é ferimento (acidente); 病気 é doença. Ambos são essenciais.'
  ], '入院 (internar) e 退院 (receber alta) são pares: 入 (entrar) e 退 (sair).', [
    ['shoujou', '症状', 'shoujou', 'sintoma', '', ['どんな症状がありますか。', 'donna shoujou ga arimasu ka.', 'Que sintomas você tem?']],
    ['chiryou', '治療', 'chiryou', 'tratamento', '', ['歯の治療に通っている。', 'ha no chiryou ni kayotte iru.', 'Estou indo regularmente fazer tratamento dentário.']],
    ['shujutsu', '手術', 'shujutsu', 'cirurgia', '手術を受ける = passar por cirurgia.', ['来週、手術を受けることになった。', 'raishuu, shujutsu o ukeru koto ni natta.', 'Vou passar por uma cirurgia semana que vem.']],
    ['nyuuin', '入院', 'nyuuin', 'internação', '退院 (taiin) = alta.', ['祖母が入院した。', 'sobo ga nyuuin shita.', 'Minha avó foi internada.']],
    ['kega', '怪我', 'kega', 'ferimento, machucado', 'Muito escrito em hiragana: けが.', ['サッカーで足に怪我をした。', 'sakkaa de ashi ni kega o shita.', 'Machuquei a perna no futebol.']],
    ['kossetsu', '骨折', 'kossetsu', 'fratura', '', ['転んで腕を骨折した。', 'koronde ude o kossetsu shita.', 'Caí e fraturei o braço.']],
    ['shinsatsu', '診察', 'shinsatsu', 'consulta médica', '診察券 = cartão do paciente.', ['診察まで一時間も待った。', 'shinsatsu made ichijikan mo matta.', 'Esperei uma hora inteira pela consulta.']],
    ['kensa', '検査', 'kensa', 'exame, inspeção', '血液検査 = exame de sangue.', ['念のため、検査をしましょう。', 'nen no tame, kensa o shimashou.', 'Por precaução, vamos fazer exames.']],
    ['shohousen', '処方箋', 'shohousen', 'receita médica', '', ['処方箋を薬局に出してください。', 'shohousen o yakkyoku ni dashite kudasai.', 'Entregue a receita na farmácia.']],
    ['kaifuku', '回復', 'kaifuku', 'recuperação', '', ['手術の後、順調に回復している。', 'shujutsu no ato, junchou ni kaifuku shite iru.', 'Depois da cirurgia, estou me recuperando bem.']]
  ], [
    ['骨折で一週間入院したけど、もう回復した。', 'kossetsu de isshuukan nyuuin shita kedo, mou kaifuku shita.', 'Fiquei internado uma semana por uma fratura, mas já me recuperei.'],
    ['検査の結果は来週わかります。', 'kensa no kekka wa raishuu wakarimasu.', 'O resultado do exame sai semana que vem.']
  ], [
    X.s('Você vai receber alta do hospital. É o:', ['退院|taiin', '入院|nyuuin', '手術|shujutsu'], '退院 = sair do hospital.'),
    X.s('O médico pergunta sobre seus sintomas. Qual palavra ele usa?', ['症状|shoujou', '処方箋|shohousen', '回復|kaifuku'], '症状 = sintoma.'),
    X.f('Fraturei a perna.', '足を＿した。', ['骨折|kossetsu', '検査|kensa', '治療|chiryou'], '骨折 = fratura.'),
    X.s('Na farmácia, você entrega o:', ['処方箋|shohousen', '診察券|shinsatsuken', '履歴書|rirekisho'], '処方箋 = receita.')
  ]),
  L('c19l7', 'Relacionamentos', '恋', 'vocab', [
    'Namoro, amizade, brigas e reconciliações: o vocabulário dos dramas, mangás e da vida real.',
    '付き合う = namorar (literalmente “acompanhar”). 告白 = se declarar, um momento clássico na cultura japonesa: 好きです。付き合ってください。',
    '喧嘩 (briga) e 仲直り (fazer as pazes) são pares muito usados entre amigos e casais.'
  ], '彼氏 (namorado) e 彼女 (namorada; também “ela”) são as palavras do dia a dia. 恋人 é mais neutro e um pouco formal.', [
    ['koibito', '恋人', 'koibito', 'namorado(a), par romântico', '', ['恋人と一緒にクリスマスを過ごす。', 'koibito to issho ni kurisumasu o sugosu.', 'Passar o Natal com o namorado(a).']],
    ['tsukiau', '付き合う', 'tsukiau', 'namorar; acompanhar', '付き合ってください = quer namorar comigo?', ['二人は三年付き合っている。', 'futari wa sannen tsukiatte iru.', 'Os dois namoram há três anos.']],
    ['wakareru', '別れる', 'wakareru', 'separar-se, terminar', '', ['彼氏と別れた。', 'kareshi to wakareta.', 'Terminei com meu namorado.']],
    ['kon\'yaku', '婚約', 'kon\'yaku', 'noivado', '婚約者 = noivo(a).', ['二人は去年婚約した。', 'futari wa kyonen kon\'yaku shita.', 'Os dois ficaram noivos ano passado.']],
    ['kenka', '喧嘩', 'kenka', 'briga', 'Muitas vezes escrito けんか.', ['兄弟でよく喧嘩する。', 'kyoudai de yoku kenka suru.', 'Os irmãos brigam muito.']],
    ['nakanaori', '仲直り', 'nakanaori', 'fazer as pazes', '', ['昨日喧嘩したけど、もう仲直りした。', 'kinou kenka shita kedo, mou nakanaori shita.', 'Brigamos ontem, mas já fizemos as pazes.']],
    ['shin\'yuu', '親友', 'shin\'yuu', 'melhor amigo', '', ['彼女は小学校からの親友です。', 'kanojo wa shougakkou kara no shin\'yuu desu.', 'Ela é minha melhor amiga desde o primário.']],
    ['shiriai', '知り合い', 'shiriai', 'conhecido', 'Não é amigo próximo.', ['知り合いに仕事を紹介してもらった。', 'shiriai ni shigoto o shoukai shite moratta.', 'Um conhecido me indicou um emprego.']],
    ['rikon', '離婚', 'rikon', 'divórcio', '', ['両親は私が小さい時に離婚した。', 'ryoushin wa watashi ga chiisai toki ni rikon shita.', 'Meus pais se divorciaram quando eu era pequeno.']],
    ['kataomoi', '片思い', 'kataomoi', 'amor não correspondido', '片 (um lado) + 思い (sentimento).', ['ずっと片思いをしている。', 'zutto kataomoi o shite iru.', 'Faz tempo que gosto de alguém que não me corresponde.']]
  ], [
    ['親友と喧嘩したけど、すぐに仲直りできた。', 'shin\'yuu to kenka shita kedo, sugu ni nakanaori dekita.', 'Briguei com meu melhor amigo, mas logo fizemos as pazes.'],
    ['卒業式の日に、片思いの先輩に告白した。', 'sotsugyoushiki no hi ni, kataomoi no senpai ni kokuhaku shita.', 'No dia da formatura, me declarei ao veterano de quem eu gostava.']
  ], [
    X.s('Você gosta de alguém que não gosta de você. É um:', ['片思い|kataomoi', '親友|shin\'yuu', '仲直り|nakanaori'], '片思い = amor de um lado só.'),
    X.s('Depois de uma briga, vocês voltam a se dar bem. Isso é:', ['仲直り|nakanaori', '離婚|rikon', '告白|kokuhaku'], '仲直り = fazer as pazes.'),
    X.f('Quer namorar comigo?', '私と＿ください。', ['付き合って|tsukiatte', '別れて|wakarete', '喧嘩して|kenka shite'], '付き合う = namorar.'),
    X.s('Qual a diferença entre 親友 e 知り合い?', ['親友 é melhor amigo; 知り合い é conhecido', 'São sinônimos', '知り合い é mais próximo'], '親友 = amizade profunda.')
  ]),
  L('c19l8', 'Personalidade', '性', 'vocab', [
    'Descrever o jeito de uma pessoa: qualidades e defeitos.',
    'Muitos são adjetivos な: 真面目な人, 素直な子. Alguns terminam em 的 (積極的, 消極的), que também funcionam como adjetivos な.',
    'わがまま (mimado, egoísta) e 頑固 (teimoso) são críticas; 真面目 e 正直 são elogios, mas 真面目すぎる pode ser uma crítica leve (sério demais).'
  ], '性格 = personalidade. 性格がいい = ter bom caráter; 性格が悪い = ter mau caráter.', [
    ['seikaku', '性格', 'seikaku', 'personalidade, temperamento', '', ['彼女は性格が明るい。', 'kanojo wa seikaku ga akarui.', 'Ela tem uma personalidade alegre.']],
    ['majime', '真面目', 'majime', 'sério, responsável', 'Elogio comum no trabalho.', ['田中さんは真面目に働く。', 'tanaka-san wa majime ni hataraku.', 'O Tanaka trabalha com seriedade.']],
    ['sunao', '素直', 'sunao', 'sincero, dócil, aberto', 'Aceita conselhos sem resistir.', ['素直に謝ったほうがいいよ。', 'sunao ni ayamatta hou ga ii yo.', 'É melhor pedir desculpas sinceramente.']],
    ['shoujiki', '正直', 'shoujiki', 'honesto', '正直に言うと = para ser sincero.', ['正直に言うと、あまり好きじゃない。', 'shoujiki ni iu to, amari suki ja nai.', 'Para ser sincero, não gosto muito.']],
    ['wagamama', 'わがまま', 'wagamama', 'mimado, egoísta', '', ['わがままを言わないで。', 'wagamama o iwanaide.', 'Não faça birra.']],
    ['ganko', '頑固', 'ganko', 'teimoso', '', ['祖父は頑固で、人の話を聞かない。', 'sofu wa ganko de, hito no hanashi o kikanai.', 'Meu avô é teimoso e não ouve os outros.']],
    ['sekkyokuteki', '積極的', 'sekkyokuteki', 'proativo, ativo', '', ['授業で積極的に発言する。', 'jugyou de sekkyokuteki ni hatsugen suru.', 'Participa ativamente das aulas.']],
    ['shoukyokuteki', '消極的', 'shoukyokuteki', 'passivo, retraído', 'Oposto de 積極的.', ['彼は恋愛に消極的だ。', 'kare wa ren\'ai ni shoukyokuteki da.', 'Ele é retraído no amor.']],
    ['otonashii', '大人しい', 'otonashii', 'quieto, calmo', 'Pessoa ou animal tranquilo.', ['この犬は大人しいから、大丈夫。', 'kono inu wa otonashii kara, daijoubu.', 'Este cachorro é calmo, pode ficar tranquilo.']],
    ['omoiyari', '思いやりがある', 'omoiyari ga aru', 'atencioso, empático', '思いやり = consideração pelos outros.', ['彼女はとても思いやりがある人だ。', 'kanojo wa totemo omoiyari ga aru hito da.', 'Ela é uma pessoa muito atenciosa.']]
  ], [
    ['正直に言うと、彼は真面目だけど、ちょっと頑固だ。', 'shoujiki ni iu to, kare wa majime da kedo, chotto ganko da.', 'Para ser sincero, ele é responsável, mas um pouco teimoso.'],
    ['積極的な人も消極的な人も、それぞれいいところがある。', 'sekkyokuteki na hito mo shoukyokuteki na hito mo, sorezore ii tokoro ga aru.', 'Tanto pessoas proativas quanto retraídas têm seus pontos positivos.']
  ], [
    X.s('Alguém que nunca muda de opinião é:', ['頑固|ganko', '素直|sunao', '大人しい|otonashii'], '頑固 = teimoso.'),
    X.s('Qual é o oposto de 積極的?', ['消極的|shoukyokuteki', '真面目|majime', '正直|shoujiki'], '積極 × 消極.'),
    X.f('Para ser sincero…', '＿に言うと…', ['正直|shoujiki', '頑固|ganko', '素直|sunao'], '正直に言うと = para ser sincero.'),
    X.s('Uma criança que faz birra é:', ['わがまま|wagamama', '大人しい|otonashii', '真面目|majime'], 'わがまま = mimado.')
  ]),
  L('c19l9', 'Verbos de mudança e estado', '変', 'vocab', [
    'Verbos N3 muito frequentes que descrevem mudanças: aumentar, diminuir, continuar, acostumar-se.',
    'Vários têm par transitivo/intransitivo: 増える (aumentar, sozinho) × 増やす (aumentar algo); 減る × 減らす; 続く × 続ける.',
    'Use o intransitivo quando a mudança acontece sozinha: 人口が減っている; o transitivo quando alguém causa: 支出を減らす.'
  ], '慣れる (acostumar-se) é essencial para quem mora fora: 日本の生活に慣れましたか? é uma pergunta que você vai ouvir muito.', [
    ['fueru', '増える', 'fueru', 'aumentar (intransitivo)', '増やす = aumentar algo.', ['外国人観光客が増えている。', 'gaikokujin kankoukyaku ga fuete iru.', 'O número de turistas estrangeiros está aumentando.']],
    ['heru', '減る', 'heru', 'diminuir (intransitivo)', '減らす = reduzir algo.', ['子供の数が減っている。', 'kodomo no kazu ga hette iru.', 'O número de crianças está diminuindo.']],
    ['herasu', '減らす', 'herasu', 'reduzir (transitivo)', '', ['お酒の量を減らした。', 'osake no ryou o herashita.', 'Reduzi a quantidade de álcool.']],
    ['tsuzuku', '続く', 'tsuzuku', 'continuar (intransitivo)', '続ける = continuar algo.', ['雨が一週間続いている。', 'ame ga isshuukan tsuzuite iru.', 'A chuva continua há uma semana.']],
    ['nareru', '慣れる', 'nareru', 'acostumar-se', '〜に慣れる.', ['日本の生活に慣れましたか。', 'nihon no seikatsu ni naremashita ka.', 'Já se acostumou à vida no Japão?']],
    ['mayou', '迷う', 'mayou', 'ficar em dúvida; perder-se', '道に迷う = perder-se no caminho.', ['どちらにするか迷っている。', 'dochira ni suru ka mayotte iru.', 'Estou em dúvida sobre qual escolher.']],
    ['kuraberu', '比べる', 'kuraberu', 'comparar', '〜と比べて = comparado com.', ['去年と比べて、今年は寒い。', 'kyonen to kurabete, kotoshi wa samui.', 'Comparado ao ano passado, este ano está frio.']],
    ['erabu', '選ぶ', 'erabu', 'escolher', '', ['好きな色を選んでください。', 'suki na iro o erande kudasai.', 'Escolha sua cor favorita.']],
    ['yamu', '止む', 'yamu', 'parar (chuva, vento, som)', 'Fenômenos naturais.', ['雨が止んだら、出かけよう。', 'ame ga yandara, dekakeyou.', 'Quando a chuva parar, vamos sair.']],
    ['susumu', '進む', 'susumu', 'avançar, progredir', '進める = fazer avançar.', ['工事が予定どおりに進んでいる。', 'kouji ga yotei doori ni susunde iru.', 'A obra está avançando conforme o previsto.']]
  ], [
    ['日本に来て半年、やっと生活に慣れてきた。', 'nihon ni kite hantoshi, yatto seikatsu ni narete kita.', 'Seis meses no Japão, finalmente estou me acostumando à vida aqui.'],
    ['体重が増えたので、甘い物を減らすことにした。', 'taijuu ga fueta node, amai mono o herasu koto ni shita.', 'Engordei, então decidi reduzir os doces.']
  ], [
    X.f('A população está diminuindo.', '人口が＿いる。', ['減って|hette', '減らして|herashite', '増やして|fuyashite'], 'Intransitivo: 減る.'),
    X.f('Vou reduzir as despesas.', '出費を＿。', ['減らす|herasu', '減る|heru', '止む|yamu'], 'Transitivo: 減らす.'),
    X.s('Como perguntar se alguém já se acostumou ao trabalho?', ['仕事に慣れましたか|shigoto ni naremashita ka', '仕事を比べましたか|shigoto o kurabemashita ka', '仕事が止みましたか|shigoto ga yamimashita ka'], '慣れる = acostumar-se.'),
    X.s('O que significa 道に迷う?', ['perder-se no caminho', 'escolher o caminho', 'avançar pelo caminho'], '迷う = perder-se, ficar em dúvida.')
  ]),
  L('c19l10', 'Verbos de comunicação', '伝', 'vocab', [
    'Verbos para pedir, recusar, convidar, elogiar e repreender: o coração das relações sociais.',
    '断る (recusar) é delicado no Japão: as pessoas evitam o “não” direto e usam ちょっと… ou 考えておきます.',
    '褒める (elogiar) e 叱る (repreender) aparecem muito em contextos de escola, família e trabalho.'
  ], '伝える = transmitir um recado: 田中さんによろしくお伝えください (mande lembranças ao Tanaka).', [
    ['tsutaeru', '伝える', 'tsutaeru', 'transmitir, dar o recado', '', ['部長に伝えておきます。', 'buchou ni tsutaete okimasu.', 'Vou passar o recado ao diretor.']],
    ['kotowaru', '断る', 'kotowaru', 'recusar', '', ['誘いを断るのは難しい。', 'sasoi o kotowaru no wa muzukashii.', 'É difícil recusar um convite.']],
    ['tanomu', '頼む', 'tanomu', 'pedir (um favor)', '頼み = pedido.', ['友達に引っ越しの手伝いを頼んだ。', 'tomodachi ni hikkoshi no tetsudai o tanonda.', 'Pedi ajuda a um amigo na mudança.']],
    ['ayamaru', '謝る', 'ayamaru', 'pedir desculpas', '', ['遅れたことを謝った。', 'okureta koto o ayamatta.', 'Pedi desculpas pelo atraso.']],
    ['sasou', '誘う', 'sasou', 'convidar', '', ['同僚を飲みに誘った。', 'douryou o nomi ni sasotta.', 'Convidei um colega para beber.']],
    ['homeru', '褒める', 'homeru', 'elogiar', '', ['先生に作文を褒められた。', 'sensei ni sakubun o homerareta.', 'O professor elogiou minha redação.']],
    ['shikaru', '叱る', 'shikaru', 'repreender, dar bronca', '怒る = ficar bravo; 叱る = repreender para educar.', ['子供を叱るのは難しい。', 'kodomo o shikaru no wa muzukashii.', 'Repreender crianças é difícil.']],
    ['yurusu', '許す', 'yurusu', 'perdoar; permitir', '', ['今回だけは許してあげる。', 'konkai dake wa yurushite ageru.', 'Só desta vez eu te perdoo.']],
    ['susumeru', '勧める', 'susumeru', 'recomendar', 'おすすめ vem daqui.', ['医者に運動を勧められた。', 'isha ni undou o susumerareta.', 'O médico me recomendou exercícios.']],
    ['iiwake', '言い訳', 'iiwake', 'desculpa (justificativa)', '言い訳をする = dar desculpas.', ['言い訳はもう聞きたくない。', 'iiwake wa mou kikitakunai.', 'Não quero mais ouvir desculpas.']]
  ], [
    ['先輩に誘われたけど、用事があって断った。', 'senpai ni sasowareta kedo, youji ga atte kotowatta.', 'O veterano me convidou, mas eu tinha um compromisso e recusei.'],
    ['母は叱った後で、ちゃんと褒めてくれる。', 'haha wa shikatta ato de, chanto homete kureru.', 'Minha mãe, depois de dar bronca, sempre elogia também.']
  ], [
    X.s('Você não pode ir à festa. O que você faz com o convite?', ['断る|kotowaru', '誘う|sasou', '勧める|susumeru'], '断る = recusar.'),
    X.s('Qual é o oposto de 叱る?', ['褒める|homeru', '許す|yurusu', '謝る|ayamaru'], '叱る (repreender) × 褒める (elogiar).'),
    X.f('Vou passar o recado.', '＿おきます。', ['伝えて|tsutaete', '断って|kotowatte', '誘って|sasotte'], '伝える = transmitir.'),
    X.e('“Pedi desculpas ao professor.”', ['先生に|sensei ni', '許しました|yurushimashita'], 1, 'Pedir desculpas = 謝る.')
  ]),
  L('c19l11', 'Advérbios do N3', '副', 'vocab', [
    'Advérbios dão emoção e precisão à fala. Os do N3 mostram expectativa, esforço e surpresa.',
    'やっと e ついに = finalmente; やっと tem alívio (depois de esperar), ついに é mais dramático (o momento chegou).',
    'せっかく = já que (tive o trabalho de / é uma ocasião especial): せっかく来たんだから、楽しもう. わざわざ = se dar ao trabalho de.'
  ], '案外 = contra a expectativa: 案外おいしい (é mais gostoso do que parecia). Lembre também de さすが (como era de esperar), visto na ala de animes.', [
    ['yatto', 'やっと', 'yatto', 'finalmente (com alívio)', '', ['やっと仕事が終わった。', 'yatto shigoto ga owatta.', 'Finalmente terminei o trabalho.']],
    ['tsuini', 'ついに', 'tsuini', 'finalmente, enfim (o momento chegou)', '', ['ついに夢が叶った！', 'tsuini yume ga kanatta!', 'Enfim, o sonho se realizou!']],
    ['nakanaka', 'なかなか', 'nakanaka', 'bastante; (com negativa) não… de jeito nenhum', 'なかなか来ない = não vem nunca.', ['バスがなかなか来ない。', 'basu ga nakanaka konai.', 'O ônibus não vem nunca.']],
    ['angai', '案外', 'angai', 'inesperadamente, mais do que se pensava', '', ['テストは案外簡単だった。', 'tesuto wa angai kantan datta.', 'A prova foi mais fácil do que eu pensava.']],
    ['sekkaku', 'せっかく', 'sekkaku', 'já que (tanto esforço / ocasião especial)', '', ['せっかく作ったのに、誰も食べなかった。', 'sekkaku tsukutta noni, dare mo tabenakatta.', 'Eu fiz com tanto carinho e ninguém comeu.']],
    ['wazawaza', 'わざわざ', 'wazawaza', 'se dar ao trabalho de', '', ['わざわざ来てくれて、ありがとう。', 'wazawaza kite kurete, arigatou.', 'Obrigado por ter vindo até aqui.']],
    ['aikawarazu', '相変わらず', 'aikawarazu', 'como sempre, sem mudança', '', ['彼は相変わらず元気だ。', 'kare wa aikawarazu genki da.', 'Ele está animado como sempre.']],
    ['chanto', 'ちゃんと', 'chanto', 'direito, como se deve', 'Muito usado por pais e professores.', ['ちゃんと歯を磨きなさい。', 'chanto ha o migakinasai.', 'Escove os dentes direito.']],
    ['shikkari', 'しっかり', 'shikkari', 'firmemente, com cuidado', 'しっかりした人 = pessoa confiável.', ['しっかり準備しておいてください。', 'shikkari junbi shite oite kudasai.', 'Prepare-se bem.']],
    ['tashika', '確か', 'tashika', 'se não me engano; certo', 'Antes da frase: 確か, 〜だったと思う.', ['確か、会議は三時からだったと思う。', 'tashika, kaigi wa sanji kara datta to omou.', 'Se não me engano, a reunião era às três.']]
  ], [
    ['せっかく京都に来たんだから、お寺を見に行こう。', 'sekkaku kyouto ni kita n da kara, otera o mi ni ikou.', 'Já que viemos até Kyoto, vamos ver os templos.'],
    ['なかなか眠れなくて、やっと三時に寝た。', 'nakanaka nemurenakute, yatto sanji ni neta.', 'Não conseguia dormir de jeito nenhum, e finalmente dormi às três.']
  ], [
    X.s('Um amigo atravessou a cidade só para te ver. Você agradece:', ['わざわざありがとう|wazawaza arigatou', 'なかなかありがとう|nakanaka arigatou', 'ちゃんとありがとう|chanto arigatou'], 'わざわざ = se dar ao trabalho.'),
    X.s('O restaurante parecia simples, mas era ótimo. “Era ＿ gostoso.”', ['案外|angai', 'わざわざ|wazawaza', 'ちゃんと|chanto'], '案外 = mais do que se esperava.'),
    X.f('O táxi não aparece nunca.', 'タクシーが＿来ない。', ['なかなか|nakanaka', 'やっと|yatto', 'ついに|tsuini'], 'なかなか + negativa.'),
    X.f('Enfim chegou o dia!', '＿その日が来た！', ['ついに|tsuini', 'わざわざ|wazawaza', 'ちゃんと|chanto'], 'ついに = o momento chegou.')
  ]),
  L('c19l12', 'Mais onomatopeias', '擬', 'vocab', [
    'Depois das onomatopeias dos animes, aqui vêm as do cotidiano: texturas, fluência, sono, nervosismo e prazos.',
    'A maioria se repete e vira verbo com する ou advérbio com に: そわそわする (ficar inquieto), ボロボロになる (ficar em frangalhos).',
    'Muitas descrevem estados, não sons: ペコペコ (fome), ギリギリ (no limite), ペラペラ (fluente).'
  ], 'Elogio que todo estudante quer ouvir: 日本語がペラペラですね! (Você fala japonês fluentemente!).', [
    ['pekopeko', 'ペコペコ', 'pekopeko', 'morrendo de fome', 'お腹がペコペコ.', ['お腹がペコペコだ。', 'onaka ga pekopeko da.', 'Estou morrendo de fome.']],
    ['perapera', 'ペラペラ', 'perapera', 'fluente (falar uma língua)', '', ['彼は英語がペラペラだ。', 'kare wa eigo ga perapera da.', 'Ele fala inglês fluentemente.']],
    ['girigiri', 'ギリギリ', 'girigiri', 'no limite, por um triz', '', ['ギリギリ間に合った。', 'girigiri ma ni atta.', 'Cheguei a tempo por um triz.']],
    ['sowasowa', 'そわそわ', 'sowasowa', 'inquieto, sem conseguir ficar parado', '', ['結果を待つ間、そわそわしていた。', 'kekka o matsu aida, sowasowa shite ita.', 'Fiquei inquieto enquanto esperava o resultado.']],
    ['utouto', 'うとうと', 'utouto', 'cochilando, pescando de sono', '', ['授業中にうとうとしてしまった。', 'jugyouchuu ni utouto shite shimatta.', 'Acabei cochilando durante a aula.']],
    ['fuwafuwa', 'ふわふわ', 'fuwafuwa', 'fofinho, macio e leve', 'Pão, bolo, nuvem, travesseiro.', ['このパンケーキはふわふわだ。', 'kono pankeeki wa fuwafuwa da.', 'Esta panqueca é fofinha.']],
    ['boroboro', 'ボロボロ', 'boroboro', 'em frangalhos, gasto', 'Também para cansaço extremo.', ['靴がボロボロになった。', 'kutsu ga boroboro ni natta.', 'O sapato ficou em frangalhos.']],
    ['butsubutsu', 'ぶつぶつ', 'butsubutsu', 'resmungando', 'ぶつぶつ言う = resmungar.', ['父は何かぶつぶつ言っている。', 'chichi wa nanika butsubutsu itte iru.', 'Meu pai está resmungando alguma coisa.']],
    ['pikapika', 'ピカピカ', 'pikapika', 'brilhando, reluzente', '', ['床をピカピカに磨いた。', 'yuka o pikapika ni migaita.', 'Lustrei o chão até brilhar.']],
    ['zaazaa', 'ザーザー', 'zaazaa', 'chuva forte (som)', 'しとしと = chuvinha fina.', ['雨がザーザー降っている。', 'ame ga zaazaa futte iru.', 'Está chovendo a cântaros.']]
  ], [
    ['昨日は徹夜したので、今日は一日中うとうとしていた。', 'kinou wa tetsuya shita node, kyou wa ichinichijuu utouto shite ita.', 'Virei a noite ontem, então hoje passei o dia cochilando.'],
    ['締め切りギリギリで、レポートを出した。', 'shimekiri girigiri de, repooto o dashita.', 'Entreguei o relatório no limite do prazo.']
  ], [
    X.s('Um amigo fala japonês muito bem. Você elogia:', ['日本語がペラペラですね|nihongo ga perapera desu ne', '日本語がふわふわですね|nihongo ga fuwafuwa desu ne', '日本語がボロボロですね|nihongo ga boroboro desu ne'], 'ペラペラ = fluente.'),
    X.s('Você não comeu nada o dia todo:', ['お腹がペコペコ|onaka ga pekopeko', 'お腹がピカピカ|onaka ga pikapika', 'お腹がそわそわ|onaka ga sowasowa'], 'ペコペコ = fome.'),
    X.f('Peguei o trem por um triz.', '＿電車に間に合った。', ['ギリギリ|girigiri', 'ザーザー|zaazaa', 'ぶつぶつ|butsubutsu'], 'ギリギリ = no limite.'),
    X.s('O que significa うとうとする?', ['cochilar', 'resmungar', 'brilhar'], 'うとうと = pescar de sono.')
  ]),
  L('c19l13', 'Dinheiro e compras', '金', 'vocab', [
    'Vocabulário de preços, pagamentos, descontos e economia doméstica.',
    'Nos preços japoneses, preste atenção a 税込 (com imposto) e 税抜 (sem imposto): a diferença é de 10%.',
    '貯金 (poupança) e 節約 (economizar) são conversas comuns; 無駄遣い (gastar à toa) é a crítica clássica.'
  ], 'Pagamento parcelado (分割払い) existe, mas no Japão o comum é pagar à vista (一括払い).', [
    ['nedan', '値段', 'nedan', 'preço', '', ['この値段なら買える。', 'kono nedan nara kaeru.', 'Por esse preço dá para comprar.']],
    ['waribiki', '割引', 'waribiki', 'desconto', '二割引 = 20% de desconto.', ['学生は割引があります。', 'gakusei wa waribiki ga arimasu.', 'Estudantes têm desconto.']],
    ['zeikomi', '税込', 'zeikomi', 'imposto incluso', '税抜 (zeinuki) = sem imposto.', ['この値段は税込ですか。', 'kono nedan wa zeikomi desu ka.', 'Este preço já inclui o imposto?']],
    ['genkin', '現金', 'genkin', 'dinheiro vivo', '', ['現金しか使えない店もある。', 'genkin shika tsukaenai mise mo aru.', 'Algumas lojas só aceitam dinheiro.']],
    ['shiharai', '支払い', 'shiharai', 'pagamento', '', ['支払いはカードでお願いします。', 'shiharai wa kaado de onegaishimasu.', 'Vou pagar com cartão.']],
    ['chokin', '貯金', 'chokin', 'poupança, economias', '貯金する.', ['旅行のために貯金している。', 'ryokou no tame ni chokin shite iru.', 'Estou juntando dinheiro para a viagem.']],
    ['setsuyaku', '節約', 'setsuyaku', 'economia (poupar)', '', ['電気代を節約したい。', 'denkidai o setsuyaku shitai.', 'Quero economizar na conta de luz.']],
    ['mudazukai', '無駄遣い', 'mudazukai', 'gastar à toa', '', ['また無駄遣いしちゃった。', 'mata mudazukai shichatta.', 'Gastei à toa de novo.']],
    ['ryoushuusho', '領収書', 'ryoushuusho', 'recibo (formal)', 'レシート = cupom do caixa.', ['領収書をお願いします。', 'ryoushuusho o onegaishimasu.', 'Quero um recibo, por favor.']],
    ['bunkatsu', '分割払い', 'bunkatsu barai', 'pagamento parcelado', '', ['パソコンを分割払いで買った。', 'pasokon o bunkatsu barai de katta.', 'Comprei o computador parcelado.']]
  ], [
    ['セールで三割引だったので、つい無駄遣いしてしまった。', 'seeru de sanwaribiki datta node, tsui mudazukai shite shimatta.', 'Estava com 30% de desconto na liquidação, então acabei gastando à toa.'],
    ['毎月少しずつ貯金して、節約している。', 'maitsuki sukoshi zutsu chokin shite, setsuyaku shite iru.', 'Todo mês guardo um pouco e economizo.']
  ], [
    X.s('O preço diz 税込. O que significa?', ['O imposto já está incluído', 'Não tem imposto', 'É grátis'], '税込 = com imposto.'),
    X.s('Uma loja só aceita:', ['現金|genkin', '貯金|chokin', '割引|waribiki'], '現金 = dinheiro vivo.'),
    X.f('Comprar parcelado', '＿払いで買う', ['分割|bunkatsu', '節約|setsuyaku', '領収|ryoushuu'], '分割払い = parcelado.'),
    X.s('O que significa 三割引?', ['30% de desconto', '3 ienes de desconto', 'pagar em 3 vezes'], '割 = 10%.')
  ]),
  L('c19l14', 'Viagem e turismo', '旅', 'vocab', [
    'Palavras para planejar uma viagem pelo Japão: hospedagem, passagens, pontos turísticos e lembrancinhas.',
    'お土産 (omiyage) é uma tradição forte: quem viaja traz doces típicos para colegas de trabalho e família.',
    '往復 (ida e volta) e 片道 (só ida) aparecem em toda compra de passagem.'
  ], '観光案内所 (centro de informações turísticas) costuma ter mapas grátis e funcionários que falam inglês.', [
    ['kankou', '観光', 'kankou', 'turismo, passeio', '観光地 = ponto turístico.', ['京都を観光する。', 'kyouto o kankou suru.', 'Fazer turismo em Kyoto.']],
    ['shukuhaku', '宿泊', 'shukuhaku', 'hospedagem', '宿泊先 = lugar onde se hospeda.', ['宿泊先はどこですか。', 'shukuhakusaki wa doko desu ka.', 'Onde você está hospedado?']],
    ['meisho', '名所', 'meisho', 'lugar famoso, atração', '', ['桜の名所に行きたい。', 'sakura no meisho ni ikitai.', 'Quero ir a um lugar famoso pelas cerejeiras.']],
    ['omiyage', 'お土産', 'omiyage', 'lembrancinha (de viagem)', '', ['会社の人にお土産を買った。', 'kaisha no hito ni omiyage o katta.', 'Comprei lembrancinhas para o pessoal da empresa.']],
    ['oufuku', '往復', 'oufuku', 'ida e volta', '', ['大阪まで往復でいくらですか。', 'oosaka made oufuku de ikura desu ka.', 'Quanto custa ida e volta até Osaka?']],
    ['katamichi', '片道', 'katamichi', 'só ida', '', ['片道切符を一枚ください。', 'katamichi kippu o ichimai kudasai.', 'Uma passagem só de ida, por favor.']],
    ['norikae', '乗り換え', 'norikae', 'baldeação, troca de trem', '乗り換える.', ['新宿で乗り換えてください。', 'shinjuku de norikaete kudasai.', 'Faça baldeação em Shinjuku.']],
    ['jikokuhyou', '時刻表', 'jikokuhyou', 'quadro de horários', '', ['時刻表で次の電車を確認した。', 'jikokuhyou de tsugi no densha o kakunin shita.', 'Conferi o próximo trem no quadro de horários.']],
    ['annaijo', '案内所', 'annaijo', 'balcão de informações', '', ['案内所で地図をもらった。', 'annaijo de chizu o moratta.', 'Peguei um mapa no balcão de informações.']],
    ['ryokan', '旅館', 'ryokan', 'pousada tradicional japonesa', 'Com tatame, futon e muitas vezes fonte termal.', ['温泉のある旅館に泊まった。', 'onsen no aru ryokan ni tomatta.', 'Fiquei numa pousada com fonte termal.']]
  ], [
    ['旅館に宿泊して、近くの名所を観光した。', 'ryokan ni shukuhaku shite, chikaku no meisho o kankou shita.', 'Me hospedei numa pousada e visitei as atrações próximas.'],
    ['往復の切符を買ったほうが、安いですよ。', 'oufuku no kippu o katta hou ga, yasui desu yo.', 'É mais barato comprar a passagem de ida e volta.']
  ], [
    X.s('Você só vai, não volta. Que passagem compra?', ['片道|katamichi', '往復|oufuku', '乗り換え|norikae'], '片道 = só ida.'),
    X.s('Você voltou de viagem e trouxe doces para os colegas. São:', ['お土産|omiyage', '名所|meisho', '宿泊|shukuhaku'], 'お土産 = lembrancinha.'),
    X.f('Faça baldeação na próxima estação.', '次の駅で＿てください。', ['乗り換え|norikae', '観光し|kankoushi', '宿泊し|shukuhakushi'], '乗り換える = baldear.'),
    X.s('Uma pousada tradicional japonesa é um:', ['旅館|ryokan', '案内所|annaijo', '時刻表|jikokuhyou'], '旅館 = ryokan.')
  ])
  );
})();
