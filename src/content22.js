/* ==========================================================
   CONTEÚDO 3.0 — Avançado (N2): Japonês no Trabalho (c27),
   Expressões Idiomáticas (c28)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;

  /* ---------- c27 Japonês no Trabalho ---------- */
  const w = NQK.wing({
    id: 'c27', emblem: '業', title: 'Japonês no Trabalho', jp: 'ビジネスにほんご', stage: 'ava', jlpt: 'N2',
    desc: 'Reuniões, apresentações, relatórios (報連相), desculpas, negociação, entrevistas de emprego, cultura corporativa e documentos.',
    requires: ['c20', 'c25'], reqWhy: 'O japonês de negócios combina o keigo com a gramática N2.'
  });
  w.lessons.push(
  L('c27l1', 'Reuniões', '議', 'grammar', [
    'Reuniões japonesas seguem um roteiro: abertura, pauta (議題), discussão, conclusão e próximos passos.',
    'Quem conduz usa frases fixas: それでは、会議を始めます / 本日の議題は〜です / 何かご意見はありますか / 以上で終わります.',
    'Para discordar com educação: おっしゃることはわかりますが… (entendo o que o senhor diz, mas…).'
  ], 'No Japão, muitas decisões são preparadas antes da reunião, em conversas individuais (根回し). A reunião serve para confirmar.', [
    ['s1', 'それでは、定例会議を始めます。', 'soredewa, teirei kaigi o hajimemasu.', 'Então, vamos começar a reunião periódica.', 'Abertura.'],
    ['s2', '本日の議題は、来年度の予算についてです。', 'honjitsu no gidai wa, rainendo no yosan ni tsuite desu.', 'A pauta de hoje é o orçamento do próximo ano fiscal.', ''],
    ['s3', 'この件について、何かご意見はありますか。', 'kono ken ni tsuite, nanika goiken wa arimasu ka.', 'Alguma opinião sobre este assunto?', ''],
    ['s4', 'おっしゃることはわかりますが、別の見方もあると思います。', 'ossharu koto wa wakarimasu ga, betsu no mikata mo aru to omoimasu.', 'Entendo o que o senhor diz, mas acho que há outro ponto de vista.', 'Discordar com educação.'],
    ['s5', 'では、次回までに案をまとめておきます。', 'dewa, jikai made ni an o matomete okimasu.', 'Então, até a próxima vez, vou consolidar uma proposta.', 'Próximos passos.'],
    ['s6', '以上で本日の会議を終わります。お疲れ様でした。', 'ijou de honjitsu no kaigi o owarimasu. otsukaresama deshita.', 'Com isso, encerramos a reunião de hoje. Obrigado a todos.', 'Encerramento.']
  ], [
    ['時間になりましたので、そろそろまとめに入りたいと思います。', 'jikan ni narimashita node, sorosoro matome ni hairitai to omoimasu.', 'Como chegou a hora, gostaria de começar a concluir.']
  ], [
    X.s('Como abrir uma reunião?', ['それでは、会議を始めます|soredewa, kaigi o hajimemasu', '会議、やろう|kaigi, yarou', '会議ですよ|kaigi desu yo'], 'Frase fixa de abertura.'),
    X.s('Para discordar educadamente do chefe:', ['おっしゃることはわかりますが…|ossharu koto wa wakarimasu ga…', 'それは違います|sore wa chigaimasu', '反対だ|hantai da'], 'Reconheça antes de discordar.'),
    X.s('O que é 議題?', ['a pauta', 'a ata', 'o horário'], '議題 = tema da reunião.'),
    X.s('O que é 根回し?', ['preparar o consenso antes da reunião', 'cancelar a reunião', 'votar'], 'Literalmente “mexer nas raízes”.')
  ]),
  L('c27l2', 'Apresentações', '表', 'grammar', [
    'Uma apresentação de trabalho em japonês segue uma ordem previsível: tema, estrutura, conteúdo e conclusão.',
    'Frases-guia: 本日は〜についてご説明いたします / まず / 次に / 最後に / こちらのグラフをご覧ください.',
    'Para concluir: まとめますと (resumindo) e ご清聴ありがとうございました (obrigado pela atenção).'
  ], 'ご清聴ありがとうございました é o fechamento padrão de qualquer apresentação formal.', [
    ['s1', '本日は、新商品の販売計画についてご説明いたします。', 'honjitsu wa, shinshouhin no hanbai keikaku ni tsuite gosetsumei itashimasu.', 'Hoje vou apresentar o plano de vendas do novo produto.', ''],
    ['s2', 'まず、現在の状況からお話しします。', 'mazu, genzai no joukyou kara ohanashi shimasu.', 'Primeiro, vou falar da situação atual.', ''],
    ['s3', 'こちらのグラフをご覧ください。', 'kochira no gurafu o goran kudasai.', 'Vejam este gráfico, por favor.', ''],
    ['s4', 'このように、売上は前年より二割増えています。', 'kono you ni, uriage wa zennen yori niwari fuete imasu.', 'Como se vê, as vendas cresceram 20% em relação ao ano anterior.', ''],
    ['s5', 'まとめますと、三つのポイントがあります。', 'matomemasu to, mittsu no pointo ga arimasu.', 'Resumindo, há três pontos.', ''],
    ['s6', 'ご清聴ありがとうございました。', 'goseichou arigatou gozaimashita.', 'Obrigado pela atenção.', 'Fechamento padrão.']
  ], [
    ['ご質問がございましたら、どうぞお気軽にお尋ねください。', 'goshitsumon ga gozaimashitara, douzo okigaru ni otazune kudasai.', 'Se houver perguntas, fiquem à vontade para perguntar.']
  ], [
    X.s('Como terminar uma apresentação formal?', ['ご清聴ありがとうございました|goseichou arigatou gozaimashita', 'じゃあね|jaa ne', 'お疲れ|otsukare'], 'Fechamento padrão.'),
    X.s('Para mostrar um gráfico ao público:', ['こちらのグラフをご覧ください|kochira no gurafu o goran kudasai', 'このグラフを見ろ|kono gurafu o miro', 'グラフを拝見してください|gurafu o haiken shite kudasai'], 'ご覧ください = respeitoso.'),
    X.f('Resumindo…', '＿と…', ['まとめます|matomemasu', 'はじめます|hajimemasu', '終わります|owarimasu'], 'まとめますと = resumindo.'),
    X.s('Qual é a ordem natural de conectores?', ['まず → 次に → 最後に|mazu → tsugi ni → saigo ni', '最後に → まず → 次に|saigo ni → mazu → tsugi ni', '次に → 最後に → まず|tsugi ni → saigo ni → mazu'], 'Primeiro, depois, por fim.')
  ]),
  L('c27l3', 'Relatar, informar, consultar (報連相)', '報', 'grammar', [
    '報連相 (hou-ren-sou, que soa como “espinafre”) é a regra de ouro do trabalho no Japão: 報告 (relatar), 連絡 (informar), 相談 (consultar).',
    '報告 = contar o resultado ao superior. 連絡 = avisar fatos (atrasos, mudanças). 相談 = pedir opinião antes de decidir.',
    'Más notícias devem ser relatadas o quanto antes: 悪い報告ほど早く.'
  ], 'Comece um relato com 〜の件でご報告があります (tenho um relato sobre ~) para o chefe saber do que se trata.', [
    ['s1', '昨日の打ち合わせの件で、ご報告があります。', 'kinou no uchiawase no ken de, gohoukoku ga arimasu.', 'Tenho um relato sobre a reunião de ontem.', '報告.'],
    ['s2', '電車が遅れているため、十分ほど遅れます。', 'densha ga okurete iru tame, juppun hodo okuremasu.', 'O trem está atrasado, então vou chegar uns dez minutos atrasado.', '連絡.'],
    ['s3', '少しご相談したいことがあるのですが、今よろしいでしょうか。', 'sukoshi gosoudan shitai koto ga aru no desu ga, ima yoroshii deshou ka.', 'Há algo que gostaria de consultar, o senhor teria um momento?', '相談.'],
    ['s4', '結論から申し上げますと、契約は取れませんでした。', 'ketsuron kara moushiagemasu to, keiyaku wa toremasen deshita.', 'Começando pela conclusão: não conseguimos fechar o contrato.', 'Conclusão primeiro.'],
    ['s5', '念のため、メールでもお送りしておきます。', 'nen no tame, meeru demo ookuri shite okimasu.', 'Por precaução, vou enviar também por e-mail.', ''],
    ['s6', '進捗状況を共有させていただきます。', 'shinchoku joukyou o kyouyuu sasete itadakimasu.', 'Permita-me compartilhar o andamento.', '進捗 = progresso.']
  ], [
    ['問題が起きたら、自分で判断せず、すぐに上司に相談すること。', 'mondai ga okitara, jibun de handan sezu, sugu ni joushi ni soudan suru koto.', 'Se surgir um problema, não decida sozinho: consulte o chefe imediatamente.']
  ], [
    X.s('Você vai se atrasar para o trabalho. Isso é um:', ['連絡|renraku', '報告|houkoku', '相談|soudan'], '連絡 = avisar fatos.'),
    X.s('Você quer a opinião do chefe antes de decidir. Isso é um:', ['相談|soudan', '報告|houkoku', '連絡|renraku'], '相談 = consultar.'),
    X.s('Ao relatar ao chefe, o costume é começar por:', ['a conclusão|ketsuron', 'os detalhes|shousai', 'as desculpas|iiwake'], '結論から.'),
    X.s('O que é 進捗?', ['o andamento, o progresso', 'o prazo', 'o problema'], '進捗状況 = status.')
  ]),
  L('c27l4', 'Desculpas no trabalho', '謝', 'grammar', [
    'Um pedido de desculpas profissional tem quatro partes: desculpa, explicação breve (sem justificar demais), solução e compromisso.',
    'Graus: すみません < 申し訳ありません < 申し訳ございません < 大変申し訳ございません. Por escrito: お詫び申し上げます.',
    'Para o compromisso: 今後このようなことがないよう、十分注意いたします (vou tomar cuidado para que não se repita).'
  ], 'Explicar demais soa como desculpa (言い訳). Assuma, explique o mínimo e mostre a solução.', [
    ['s1', 'ご迷惑をおかけして、大変申し訳ございません。', 'gomeiwaku o okake shite, taihen moushiwake gozaimasen.', 'Peço sinceras desculpas pelo transtorno causado.', ''],
    ['s2', '私の確認不足でした。', 'watashi no kakunin busoku deshita.', 'Foi falta de verificação da minha parte.', 'Assumir.'],
    ['s3', '至急、正しい資料をお送りいたします。', 'shikyuu, tadashii shiryou o ookuri itashimasu.', 'Enviaremos o material correto com urgência.', 'Solução.'],
    ['s4', '今後このようなことがないよう、十分注意いたします。', 'kongo kono you na koto ga nai you, juubun chuui itashimasu.', 'Tomaremos todo o cuidado para que isso não se repita.', 'Compromisso.'],
    ['s5', '心よりお詫び申し上げます。', 'kokoro yori owabi moushiagemasu.', 'Pedimos desculpas de coração.', 'Muito formal, escrito.'],
    ['s6', 'お手数をおかけしますが、よろしくお願いいたします。', 'otesuu o okake shimasu ga, yoroshiku onegai itashimasu.', 'Desculpe o incômodo, e conto com sua compreensão.', '']
  ], [
    ['納品が遅れてしまい、誠に申し訳ございませんでした。', 'nouhin ga okurete shimai, makoto ni moushiwake gozaimasen deshita.', 'Pedimos sinceras desculpas pelo atraso na entrega.']
  ], [
    X.s('Qual é o pedido de desculpas MAIS formal?', ['大変申し訳ございません|taihen moushiwake gozaimasen', 'すみません|sumimasen', 'ごめんなさい|gomen nasai'], 'Grau máximo falado.'),
    X.s('Depois de pedir desculpas, o próximo passo é:', ['mostrar a solução', 'explicar longamente por que não foi culpa sua', 'mudar de assunto'], 'Desculpa → explicação breve → solução → compromisso.'),
    X.f('Foi falta de atenção minha.', '私の注意＿でした。', ['不足|busoku', '不満|fuman', '不便|fuben'], '不足 = falta.'),
    X.s('O que é お詫び申し上げます?', ['um pedido de desculpas muito formal', 'um agradecimento', 'uma reclamação'], 'Usado em cartas e avisos.')
  ]),
  L('c27l5', 'Negociação', '交', 'grammar', [
    'Negociações japonesas são indiretas: raramente se diz “não” na mesa. Propostas são “consideradas” (検討) e respostas vêm depois.',
    'Para propor: 〜というのはいかがでしょうか (que tal ~?). Para pedir concessão: もう少しお値引きいただけないでしょうか.',
    'Para sinalizar abertura sem se comprometer: 前向きに検討させていただきます (vamos considerar de forma positiva).'
  ], '前向きに検討します é bem mais promissor que só 検討します.', [
    ['s1', '価格を一割下げるというのはいかがでしょうか。', 'kakaku o ichiwari sageru to iu no wa ikaga deshou ka.', 'Que tal reduzir o preço em 10%?', 'Proposta.'],
    ['s2', 'もう少しお値引きいただけないでしょうか。', 'mou sukoshi onebiki itadakenai deshou ka.', 'Será que poderiam dar um pouco mais de desconto?', ''],
    ['s3', 'その条件でしたら、お受けできます。', 'sono jouken deshitara, ouke dekimasu.', 'Nessas condições, podemos aceitar.', ''],
    ['s4', '前向きに検討させていただきます。', 'maemuki ni kentou sasete itadakimasu.', 'Vamos considerar de forma positiva.', 'Sinal bom.'],
    ['s5', '納期を一週間延ばすことは可能でしょうか。', 'nouki o isshuukan nobasu koto wa kanou deshou ka.', 'Seria possível estender o prazo de entrega em uma semana?', '納期 = prazo de entrega.'],
    ['s6', '社内で相談の上、改めてご連絡いたします。', 'shanai de soudan no ue, aratamete gorenraku itashimasu.', 'Após consultar internamente, entraremos em contato novamente.', '']
  ], [
    ['双方にとって良い条件を見つけたいと考えております。', 'souhou ni totte yoi jouken o mitsuketai to kangaete orimasu.', 'Queremos encontrar condições boas para ambas as partes.']
  ], [
    X.s('Para fazer uma proposta educada:', ['〜というのはいかがでしょうか|to iu no wa ikaga deshou ka', '〜しろ|shiro', '〜してくれ|shite kure'], 'いかがでしょうか = que tal.'),
    X.s('Qual resposta é mais promissora?', ['前向きに検討します|maemuki ni kentou shimasu', '検討します|kentou shimasu', '難しいですね|muzukashii desu ne'], '前向き = positivo.'),
    X.s('O que é 納期?', ['prazo de entrega', 'preço', 'contrato'], '納期 = nouki.'),
    X.f('Que tal sexta-feira?', '金曜日は＿でしょうか。', ['いかが|ikaga', 'どう|dou', 'なに|nani'], 'いかが = forma polida de どう.')
  ]),
  L('c27l6', 'Entrevista de emprego', '面', 'grammar', [
    'A entrevista japonesa tem perguntas previsíveis: apresentação, motivação (志望動機), pontos fortes (長所) e fracos (短所), planos.',
    'Ao entrar: 失礼いたします; espere a ordem para sentar (どうぞおかけください). Ao sair: 本日はありがとうございました.',
    'Fale da empresa do entrevistador como 御社 e responda com estrutura: conclusão primeiro, depois o exemplo.'
  ], 'Ao falar do ponto fraco, mostre como você lida com ele: 心配性ですが、その分、準備をしっかりします.', [
    ['s1', '本日はよろしくお願いいたします。', 'honjitsu wa yoroshiku onegai itashimasu.', 'Agradeço pela oportunidade hoje.', 'Início.'],
    ['s2', '御社を志望した理由は、海外事業に興味があるからです。', 'onsha o shibou shita riyuu wa, kaigai jigyou ni kyoumi ga aru kara desu.', 'Me candidatei à sua empresa porque me interesso pelos negócios internacionais.', '志望動機.'],
    ['s3', '私の長所は、粘り強いところです。', 'watashi no chousho wa, nebarizuyoi tokoro desu.', 'Meu ponto forte é a perseverança.', '長所.'],
    ['s4', '短所は心配性なところですが、その分、準備を大切にしています。', 'tansho wa shinpaishou na tokoro desu ga, sono bun, junbi o taisetsu ni shite imasu.', 'Meu ponto fraco é me preocupar demais, mas por isso valorizo a preparação.', '短所.'],
    ['s5', '前職では、営業を三年担当しておりました。', 'zenshoku de wa, eigyou o sannen tantou shite orimashita.', 'No emprego anterior, trabalhei três anos com vendas.', ''],
    ['s6', '五年後には、チームをまとめる立場になりたいと考えております。', 'gonen go ni wa, chiimu o matomeru tachiba ni naritai to kangaete orimasu.', 'Daqui a cinco anos, quero estar numa posição de liderar uma equipe.', 'Planos.']
  ], [
    ['最後に、何か質問はありますか。', 'saigo ni, nanika shitsumon wa arimasu ka.', 'Por fim, você tem alguma pergunta?']
  ], [
    X.s('O que é 志望動機?', ['o motivo da candidatura', 'o salário desejado', 'o currículo'], 'Pergunta mais importante da entrevista.'),
    X.s('Como falar da empresa do entrevistador?', ['御社|onsha', '弊社|heisha', 'あなたの会社|anata no kaisha'], '御社 = sua empresa (falado).'),
    X.s('Qual é o par de 長所?', ['短所|tansho', '長期|chouki', '短期|tanki'], 'Ponto forte × ponto fraco.'),
    X.s('Ao entrar na sala da entrevista, diga:', ['失礼いたします|shitsurei itashimasu', 'お邪魔！|ojama!', 'こんにちは〜|konnichiwa'], 'Frase formal de entrada.')
  ]),
  L('c27l7', 'Cultura corporativa', '社', 'grammar', [
    'Algumas práticas do trabalho no Japão: 名刺交換 (troca de cartões de visita), 飲み会 (happy hour da equipe), 有給休暇 (férias remuneradas).',
    'Na troca de cartões, entregue com as duas mãos, com o texto virado para a pessoa, e diga 頂戴いたします ao receber.',
    '空気を読む (ler o ar) é perceber o clima e agir sem que ninguém precise dizer. É muito valorizado.'
  ], 'Muitos japoneses têm dificuldade de tirar 有給 (férias remuneradas) por medo de incomodar os colegas. Isso está mudando aos poucos.', [
    ['s1', '名刺を頂戴いたします。', 'meishi o choudai itashimasu.', 'Recebo seu cartão com prazer.', 'Ao receber o cartão.'],
    ['s2', '申し訳ありません、名刺を切らしておりまして。', 'moushiwake arimasen, meishi o kirashite orimashite.', 'Desculpe, meus cartões acabaram.', '切らす = ficar sem.'],
    ['s3', '今夜、部署の飲み会があります。', 'kon\'ya, busho no nomikai ga arimasu.', 'Hoje à noite tem happy hour do departamento.', ''],
    ['s4', '来週、有給を取らせていただきたいのですが。', 'raishuu, yuukyuu o torasete itadakitai no desu ga.', 'Gostaria de tirar folga remunerada na semana que vem.', ''],
    ['s5', '彼は空気が読めない。', 'kare wa kuuki ga yomenai.', 'Ele não percebe o clima.', 'Crítica comum.'],
    ['s6', '先にお客様にお茶をお出しして。', 'saki ni okyakusama ni ocha o odashi shite.', 'Sirva o chá ao cliente primeiro.', '']
  ], [
    ['上座にはお客様に座っていただくのがマナーです。', 'kamiza ni wa okyakusama ni suwatte itadaku no ga manaa desu.', 'A etiqueta é que o cliente se sente no lugar de honra.']
  ], [
    X.s('Ao receber um cartão de visita, diga:', ['頂戴いたします|choudai itashimasu', 'ありがと|arigato', 'もらうね|morau ne'], 'Frase formal.'),
    X.s('O que significa 空気を読む?', ['perceber o clima e agir de acordo', 'respirar fundo', 'ler em voz alta'], 'Ler o ar.'),
    X.s('O que é 有給?', ['férias remuneradas', 'hora extra', 'bônus'], '有給休暇.'),
    X.s('Como entregar um cartão de visita?', ['Com as duas mãos, texto virado para a pessoa', 'Com uma mão, de longe', 'Jogando na mesa'], 'Etiqueta japonesa.')
  ]),
  L('c27l8', 'Documentos e prazos', '書', 'vocab', [
    'Os documentos do dia a dia de uma empresa: orçamentos, faturas, contratos, relatórios e as famosas aprovações por carimbo.',
    'O fluxo comercial típico: 見積書 (orçamento) → 発注 (pedido) → 納品 (entrega) → 請求書 (fatura) → 支払い.',
    '稟議書 é um documento que circula para aprovação de vários chefes, cada um carimbando (はんこ).'
  ], '締め切り (prazo) e 納期 (prazo de entrega) são palavras que você ouvirá todo dia.', [
    ['mitsumorisho', '見積書', 'mitsumorisho', 'orçamento (documento)', '', ['見積書を作成してお送りします。', 'mitsumorisho o sakusei shite ookuri shimasu.', 'Vamos preparar e enviar o orçamento.']],
    ['seikyuusho', '請求書', 'seikyuusho', 'fatura, cobrança', '', ['請求書は月末に届きます。', 'seikyuusho wa getsumatsu ni todokimasu.', 'A fatura chega no fim do mês.']],
    ['keiyakusho', '契約書', 'keiyakusho', 'contrato', '', ['契約書にサインする前によく読んでください。', 'keiyakusho ni sain suru mae ni yoku yonde kudasai.', 'Leia bem o contrato antes de assinar.']],
    ['houkokusho', '報告書', 'houkokusho', 'relatório', '', ['出張の報告書を提出した。', 'shucchou no houkokusho o teishutsu shita.', 'Entreguei o relatório da viagem de trabalho.']],
    ['shimekiri', '締め切り', 'shimekiri', 'prazo final', '', ['締め切りまで、あと三日しかない。', 'shimekiri made, ato mikka shika nai.', 'Faltam só três dias para o prazo.']],
    ['hacchuu', '発注', 'hacchuu', 'pedido (de compra, à empresa fornecedora)', '受注 = receber pedido.', ['部品を百個発注した。', 'buhin o hyakko hacchuu shita.', 'Fizemos um pedido de cem peças.']],
    ['ringisho', '稟議書', 'ringisho', 'documento de aprovação interna', '', ['稟議書が部長の承認を待っている。', 'ringisho ga buchou no shounin o matte iru.', 'O documento de aprovação aguarda o aval do diretor.']],
    ['teishutsu', '提出', 'teishutsu', 'entrega (de documento)', '', ['レポートを期限までに提出してください。', 'repooto o kigen made ni teishutsu shite kudasai.', 'Entregue o relatório dentro do prazo.']]
  ], [
    ['見積書の内容に問題がなければ、正式に発注いたします。', 'mitsumorisho no naiyou ni mondai ga nakereba, seishiki ni hacchuu itashimasu.', 'Se não houver problema no orçamento, faremos o pedido formalmente.']
  ], [
    X.s('Antes de comprar, você pede um:', ['見積書|mitsumorisho', '請求書|seikyuusho', '報告書|houkokusho'], '見積書 = orçamento.'),
    X.s('Depois da entrega, o fornecedor manda um:', ['請求書|seikyuusho', '見積書|mitsumorisho', '稟議書|ringisho'], '請求書 = fatura.'),
    X.f('Entregar o documento', '書類を＿する', ['提出|teishutsu', '発注|hacchuu', '請求|seikyuu'], '提出 = entregar.'),
    X.s('O que é 締め切り?', ['prazo final', 'contrato', 'reunião'], '締め切り = deadline.')
  ])
  );

  /* ---------- c28 Expressões Idiomáticas ---------- */
  const e = NQK.wing({
    id: 'c28', emblem: '諺', title: 'Expressões Idiomáticas', jp: 'かんようく・ことわざ', stage: 'ava', jlpt: 'N2',
    desc: 'Expressões com partes do corpo e animais, provérbios (ことわざ) e expressões de quatro kanji (四字熟語).',
    requires: ['c21', 'c19'], reqWhy: 'As expressões idiomáticas partem da fala natural e do vocabulário N3.'
  });
  e.lessons.push(
  L('c28l1', 'Expressões com o corpo I', '顔', 'vocab', [
    'O japonês usa partes do corpo em muitas expressões cujo sentido não é literal.',
    '顔が広い não é ter o rosto largo: é conhecer muita gente. 口が軽い não é ter a boca leve: é não guardar segredo.',
    'Aprenda cada expressão como um bloco, com o verbo ou adjetivo que a acompanha.'
  ], '耳が痛い (o ouvido dói) é ouvir uma crítica que acerta em cheio: verdades que incomodam.', [
    ['kaogahiroi', '顔が広い', 'kao ga hiroi', 'conhecer muita gente', '', ['彼は顔が広いから、誰か紹介してくれるよ。', 'kare wa kao ga hiroi kara, dareka shoukai shite kureru yo.', 'Ele conhece muita gente, vai te apresentar alguém.']],
    ['kuchigakarui', '口が軽い', 'kuchi ga karui', 'não guardar segredo', '口が堅い = guardar segredo.', ['あの人は口が軽いから、話さないほうがいい。', 'ano hito wa kuchi ga karui kara, hanasanai hou ga ii.', 'Aquela pessoa não guarda segredo, melhor não contar.']],
    ['mimigaitai', '耳が痛い', 'mimi ga itai', 'ouvir uma crítica que acerta', '', ['先生の話は耳が痛かった。', 'sensei no hanashi wa mimi ga itakatta.', 'A fala do professor me atingiu em cheio.']],
    ['meganai', '目がない', 'me ga nai', 'ser louco por', '〜に目がない.', ['私は甘い物に目がない。', 'watashi wa amai mono ni me ga nai.', 'Sou louco por doces.']],
    ['tegahanasenai', '手が離せない', 'te ga hanasenai', 'estar ocupado, não poder largar o que faz', '', ['今ちょっと手が離せないので、後でかけ直します。', 'ima chotto te ga hanasenai node, ato de kakenaoshimasu.', 'Agora não posso parar, ligo depois.']],
    ['haragatatsu', '腹が立つ', 'hara ga tatsu', 'ficar com raiva', '', ['彼の態度に腹が立った。', 'kare no taido ni hara ga tatta.', 'Fiquei com raiva da atitude dele.']],
    ['kubiwonagaku', '首を長くして待つ', 'kubi o nagaku shite matsu', 'esperar ansiosamente', 'Literalmente, “esticar o pescoço”.', ['返事を首を長くして待っている。', 'henji o kubi o nagaku shite matte iru.', 'Estou esperando a resposta ansiosamente.']],
    ['ashiwohipparu', '足を引っ張る', 'ashi o hipparu', 'atrapalhar, ser um peso', '', ['チームの足を引っ張りたくない。', 'chiimu no ashi o hipparitakunai.', 'Não quero atrapalhar a equipe.']]
  ], [
    ['口が堅い人には、何でも相談できる。', 'kuchi ga katai hito ni wa, nan demo soudan dekiru.', 'Com alguém que guarda segredo, dá para conversar sobre tudo.']
  ], [
    X.s('Ele conhece todo mundo na cidade. Ele é:', ['顔が広い|kao ga hiroi', '口が軽い|kuchi ga karui', '目がない|me ga nai'], '顔が広い = muitas conexões.'),
    X.s('Você é louco por chocolate:', ['チョコに目がない|choko ni me ga nai', 'チョコに顔が広い|choko ni kao ga hiroi', 'チョコに耳が痛い|choko ni mimi ga itai'], '〜に目がない.'),
    X.s('Qual é o oposto de 口が軽い?', ['口が堅い|kuchi ga katai', '口が重い|kuchi ga omoi', '口が広い|kuchi ga hiroi'], '堅い = firme, guarda segredo.'),
    X.s('O que significa 足を引っ張る?', ['atrapalhar os outros', 'correr rápido', 'ajudar muito'], 'Puxar o pé = atrasar o grupo.')
  ]),
  L('c28l2', 'Expressões com o corpo II', '腕', 'vocab', [
    'Mais expressões com partes do corpo, agora ligadas a orgulho, habilidade, esforço e emoção.',
    '鼻が高い (nariz alto) = orgulhoso de alguém ou de algo. 腕がいい (braço bom) = habilidoso.',
    '骨が折れる (quebrar o osso) = dar muito trabalho. 胸がいっぱい (o peito cheio) = emocionado.'
  ], '頭が固い (cabeça dura) é ser inflexível, não ter jogo de cintura. O oposto: 頭が柔らかい.', [
    ['atamagakatai', '頭が固い', 'atama ga katai', 'cabeça dura, inflexível', '', ['父は頭が固くて、新しい考えを受け入れない。', 'chichi wa atama ga katakute, atarashii kangae o ukeirenai.', 'Meu pai é cabeça dura e não aceita ideias novas.']],
    ['hanagatakai', '鼻が高い', 'hana ga takai', 'sentir orgulho', '', ['息子が優勝して、鼻が高い。', 'musuko ga yuushou shite, hana ga takai.', 'Meu filho venceu o campeonato, estou orgulhoso.']],
    ['katawomotsu', '肩を持つ', 'kata o motsu', 'tomar o partido de', '', ['どうしていつも彼の肩を持つの？', 'doushite itsumo kare no kata o motsu no?', 'Por que você sempre fica do lado dele?']],
    ['udegaii', '腕がいい', 'ude ga ii', 'ser habilidoso', '', ['あの店の職人は腕がいい。', 'ano mise no shokunin wa ude ga ii.', 'O artesão daquela loja é muito habilidoso.']],
    ['honegaoreru', '骨が折れる', 'hone ga oreru', 'dar muito trabalho', '', ['この仕事は骨が折れる。', 'kono shigoto wa hone ga oreru.', 'Este trabalho dá muito trabalho.']],
    ['munegaippai', '胸がいっぱい', 'mune ga ippai', 'estar emocionado, com o coração cheio', '', ['卒業式で胸がいっぱいになった。', 'sotsugyoushiki de mune ga ippai ni natta.', 'Fiquei emocionado na formatura.']],
    ['shitawomaku', '舌を巻く', 'shita o maku', 'ficar impressionado', 'Literalmente, “enrolar a língua”.', ['彼の日本語の上手さに舌を巻いた。', 'kare no nihongo no jouzusa ni shita o maita.', 'Fiquei impressionado com o japonês dele.']],
    ['hagatatanai', '歯が立たない', 'ha ga tatanai', 'não conseguir competir, ser forte demais', '', ['あのチームには全く歯が立たなかった。', 'ano chiimu ni wa mattaku ha ga tatanakatta.', 'Não tivemos a menor chance contra aquele time.']]
  ], [
    ['娘が賞をもらって、親として鼻が高い。', 'musume ga shou o moratte, oya to shite hana ga takai.', 'Minha filha ganhou um prêmio, e como pai sinto orgulho.']
  ], [
    X.s('Uma tarefa muito trabalhosa:', ['骨が折れる|hone ga oreru', '鼻が高い|hana ga takai', '腕がいい|ude ga ii'], 'Dar trabalho.'),
    X.s('Você sente orgulho do seu filho:', ['鼻が高い|hana ga takai', '頭が固い|atama ga katai', '肩を持つ|kata o motsu'], 'Nariz alto = orgulho.'),
    X.s('O adversário é forte demais:', ['歯が立たない|ha ga tatanai', '舌を巻く|shita o maku', '胸がいっぱい|mune ga ippai'], 'Os dentes não conseguem morder.'),
    X.f('Ele sempre toma o partido da irmã.', 'いつも妹の＿を持つ。', ['肩|kata', '腕|ude', '鼻|hana'], '肩を持つ.')
  ]),
  L('c28l3', 'Expressões com animais', '猫', 'vocab', [
    'Animais aparecem em muitas expressões japonesas, algumas bem diferentes das portuguesas.',
    '猫の手も借りたい = estar tão ocupado que aceitaria até a ajuda de um gato. 猫舌 = não aguentar comida quente.',
    '犬猿の仲 (relação de cão e macaco) é o nosso “como cão e gato”.'
  ], '馬が合う (os cavalos combinam) = se dar bem com alguém, ter afinidade.', [
    ['nekonote', '猫の手も借りたい', 'neko no te mo karitai', 'estar ocupadíssimo', '', ['年末は忙しくて、猫の手も借りたい。', 'nenmatsu wa isogashikute, neko no te mo karitai.', 'No fim do ano estou tão ocupado que aceito qualquer ajuda.']],
    ['nekojita', '猫舌', 'nekojita', 'quem não aguenta comida quente', '', ['猫舌なので、ラーメンは少し冷ましてから食べる。', 'nekojita na node, raamen wa sukoshi samashite kara taberu.', 'Não aguento comida quente, então espero o lámen esfriar.']],
    ['ken\'en', '犬猿の仲', 'ken\'en no naka', 'como cão e gato (se odeiam)', '', ['あの二人は犬猿の仲だ。', 'ano futari wa ken\'en no naka da.', 'Aqueles dois são como cão e gato.']],
    ['umagaau', '馬が合う', 'uma ga au', 'ter afinidade', '', ['彼とは不思議と馬が合う。', 'kare to wa fushigi to uma ga au.', 'Curiosamente, tenho afinidade com ele.']],
    ['mushigaii', '虫がいい', 'mushi ga ii', 'ser egoísta, folgado', '', ['自分だけ得しようなんて、虫がいい話だ。', 'jibun dake toku shiyou nante, mushi ga ii hanashi da.', 'Querer levar vantagem sozinho é muita folga.']],
    ['tsurunohitokoe', '鶴の一声', 'tsuru no hitokoe', 'a palavra final de quem manda', '', ['社長の鶴の一声で、計画が決まった。', 'shachou no tsuru no hitokoe de, keikaku ga kimatta.', 'O plano foi decidido com uma palavra do presidente.']],
    ['dasoku', '蛇足', 'dasoku', 'algo desnecessário, acréscimo inútil', 'Desenhar pernas na cobra.', ['蛇足ですが、一言付け加えます。', 'dasoku desu ga, hitokoto tsukekuwaemasu.', 'Pode ser desnecessário, mas acrescento uma palavra.']],
    ['sarumoki', '猿も木から落ちる', 'saru mo ki kara ochiru', 'até os melhores erram', 'Até o macaco cai da árvore.', ['プロでも失敗する。猿も木から落ちるだ。', 'puro demo shippai suru. saru mo ki kara ochiru da.', 'Até profissionais erram. Até o macaco cai da árvore.']]
  ], [
    ['あの二人は犬猿の仲だと思っていたのに、実は馬が合うらしい。', 'ano futari wa ken\'en no naka da to omotte ita noni, jitsu wa uma ga au rashii.', 'Achei que os dois se odiavam, mas parece que na verdade se dão bem.']
  ], [
    X.s('Equivalente a “como cão e gato”:', ['犬猿の仲|ken\'en no naka', '馬が合う|uma ga au', '猫舌|nekojita'], 'Em japonês, é cão e macaco.'),
    X.s('Você é muito ocupado e aceita qualquer ajuda:', ['猫の手も借りたい|neko no te mo karitai', '虫がいい|mushi ga ii', '蛇足|dasoku'], 'Até a mão do gato.'),
    X.s('Um especialista comete um erro bobo:', ['猿も木から落ちる|saru mo ki kara ochiru', '鶴の一声|tsuru no hitokoe', '馬が合う|uma ga au'], 'Até o macaco cai.'),
    X.s('O que significa 猫舌?', ['não aguentar comida quente', 'falar muito', 'gostar de peixe'], 'Língua de gato.')
  ]),
  L('c28l4', 'Provérbios I', '諺', 'vocab', [
    'Provérbios (ことわざ) aparecem em conversas, discursos e provas. Muitos têm equivalentes em português.',
    '石の上にも三年 (três anos sobre a pedra) = a perseverança vence. 急がば回れ (se tem pressa, dê a volta) = devagar se vai ao longe.',
    '花より団子 (bolinho em vez de flores) = preferir o útil ao bonito, como quem vai ver as cerejeiras e só pensa em comer.'
  ], '七転び八起き (cair sete vezes, levantar oito) é um lema de perseverança muito querido.', [
    ['nanakorobi', '七転び八起き', 'nanakorobi yaoki', 'cair sete vezes, levantar oito', '', ['人生は七転び八起きだ。', 'jinsei wa nanakorobi yaoki da.', 'A vida é cair sete vezes e levantar oito.']],
    ['ishinoue', '石の上にも三年', 'ishi no ue ni mo sannen', 'a perseverança vence', '', ['石の上にも三年、続ければ結果が出る。', 'ishi no ue ni mo sannen, tsuzukereba kekka ga deru.', 'A perseverança vence: continuando, os resultados aparecem.']],
    ['isogaba', '急がば回れ', 'isogaba maware', 'devagar se vai ao longe', '', ['急がば回れで、基礎からやり直そう。', 'isogaba maware de, kiso kara yarinaosou.', 'Devagar se vai ao longe: vamos recomeçar pela base.']],
    ['hanayori', '花より団子', 'hana yori dango', 'preferir o útil ao bonito', '', ['花見に行っても、花より団子だ。', 'hanami ni itte mo, hana yori dango da.', 'Mesmo indo ver as flores, só penso em comer.']],
    ['juunin', '十人十色', 'juunin toiro', 'cada cabeça, uma sentença', 'Dez pessoas, dez cores.', ['好みは十人十色だ。', 'konomi wa juunin toiro da.', 'Gosto é cada um com o seu.']],
    ['chirimo', '塵も積もれば山となる', 'chiri mo tsumoreba yama to naru', 'de grão em grão, a galinha enche o papo', '', ['毎日百円でも、塵も積もれば山となる。', 'mainichi hyakuen demo, chiri mo tsumoreba yama to naru.', 'Mesmo cem ienes por dia: de grão em grão se junta muito.']],
    ['nito', '二兎を追う者は一兎をも得ず', 'nito o ou mono wa itto o mo ezu', 'quem tudo quer, nada tem', 'Quem persegue dois coelhos não pega nenhum.', ['二兎を追う者は一兎をも得ず。一つに集中しよう。', 'nito o ou mono wa itto o mo ezu. hitotsu ni shuuchuu shiyou.', 'Quem tudo quer nada tem. Vamos focar em uma coisa.']],
    ['hyakubun', '百聞は一見にしかず', 'hyakubun wa ikken ni shikazu', 'ver uma vez vale mais que ouvir cem', '', ['百聞は一見にしかず。実際に行ってみよう。', 'hyakubun wa ikken ni shikazu. jissai ni itte miyou.', 'Ver vale mais que ouvir. Vamos lá ver.']]
  ], [
    ['失敗しても、七転び八起きの精神で頑張ろう。', 'shippai shite mo, nanakorobi yaoki no seishin de ganbarou.', 'Mesmo errando, vamos em frente com o espírito de levantar sempre.']
  ], [
    X.s('Equivalente a “de grão em grão, a galinha enche o papo”:', ['塵も積もれば山となる|chiri mo tsumoreba yama to naru', '花より団子|hana yori dango', '急がば回れ|isogaba maware'], 'A poeira acumulada vira montanha.'),
    X.s('Equivalente a “quem tudo quer, nada tem”:', ['二兎を追う者は一兎をも得ず|nito o ou mono wa itto o mo ezu', '十人十色|juunin toiro', '七転び八起き|nanakorobi yaoki'], 'Dois coelhos.'),
    X.s('O que significa 十人十色?', ['cada um tem seu gosto', 'dez pessoas pintando', 'todos iguais'], 'Dez pessoas, dez cores.'),
    X.s('Antes de comprar, você quer ver o produto pessoalmente:', ['百聞は一見にしかず|hyakubun wa ikken ni shikazu', '花より団子|hana yori dango', '猿も木から落ちる|saru mo ki kara ochiru'], 'Ver é melhor que ouvir.')
  ]),
  L('c28l5', 'Provérbios II', '言', 'vocab', [
    'Mais provérbios, agora ligados a sorte, aprendizado e comportamento social.',
    '出る杭は打たれる (a estaca que se destaca leva martelada) resume a pressão social japonesa contra quem se destaca demais.',
    '能ある鷹は爪を隠す (o falcão habilidoso esconde as garras) elogia quem tem talento e é modesto.'
  ], '知らぬが仏 (não saber é ser Buda) = o que os olhos não veem, o coração não sente.', [
    ['derukui', '出る杭は打たれる', 'deru kui wa utareru', 'quem se destaca é criticado', '', ['出る杭は打たれるから、目立たないようにしている。', 'deru kui wa utareru kara, medatanai you ni shite iru.', 'Quem se destaca leva crítica, então evito chamar atenção.']],
    ['nouaru', '能ある鷹は爪を隠す', 'nou aru taka wa tsume o kakusu', 'quem tem talento é modesto', '', ['彼は能ある鷹は爪を隠すタイプだ。', 'kare wa nou aru taka wa tsume o kakusu taipu da.', 'Ele é do tipo talentoso e modesto.']],
    ['shiranuga', '知らぬが仏', 'shiranu ga hotoke', 'o que os olhos não veem…', '', ['本当のことは言わないほうがいい。知らぬが仏だ。', 'hontou no koto wa iwanai hou ga ii. shiranu ga hotoke da.', 'Melhor não contar a verdade. Não saber é melhor.']],
    ['amefutte', '雨降って地固まる', 'ame futte ji katamaru', 'depois da tempestade vem a bonança', 'Depois da chuva, o chão fica firme.', ['喧嘩したけど、雨降って地固まるで、前より仲良くなった。', 'kenka shita kedo, ame futte ji katamaru de, mae yori nakayoku natta.', 'Brigamos, mas depois disso ficamos mais próximos.']],
    ['narauyori', '習うより慣れろ', 'narau yori narero', 'a prática leva à perfeição', '', ['言葉は習うより慣れろだ。', 'kotoba wa narau yori narero da.', 'Língua se aprende praticando.']],
    ['hayaoki', '早起きは三文の徳', 'hayaoki wa sanmon no toku', 'Deus ajuda quem cedo madruga', '', ['早起きは三文の徳というから、明日は六時に起きよう。', 'hayaoki wa sanmon no toku to iu kara, ashita wa rokuji ni okiyou.', 'Dizem que Deus ajuda quem cedo madruga, então amanhã acordo às seis.']],
    ['anzuru', '案ずるより産むが易し', 'anzuru yori umu ga yasushi', 'fazer é mais fácil do que parece', 'Parir é mais fácil do que temer o parto.', ['案ずるより産むが易し。やってみたら簡単だった。', 'anzuru yori umu ga yasushi. yatte mitara kantan datta.', 'Fazer é mais fácil que temer: tentei e foi simples.']],
    ['warainokado', '笑う門には福来る', 'warau kado ni wa fuku kitaru', 'a alegria atrai a sorte', '', ['笑う門には福来る。いつも笑顔でいよう。', 'warau kado ni wa fuku kitaru. itsumo egao de iyou.', 'A alegria atrai a sorte. Vamos sorrir sempre.']]
  ], [
    ['習うより慣れろで、毎日日本語で話すようにしている。', 'narau yori narero de, mainichi nihongo de hanasu you ni shite iru.', 'Seguindo “a prática leva à perfeição”, procuro falar japonês todo dia.']
  ], [
    X.s('Equivalente a “Deus ajuda quem cedo madruga”:', ['早起きは三文の徳|hayaoki wa sanmon no toku', '知らぬが仏|shiranu ga hotoke', '出る杭は打たれる|deru kui wa utareru'], 'Acordar cedo vale três moedas.'),
    X.s('Depois de uma briga, a amizade ficou mais forte:', ['雨降って地固まる|ame futte ji katamaru', '習うより慣れろ|narau yori narero', '能ある鷹は爪を隠す|nou aru taka wa tsume o kakusu'], 'Depois da chuva, chão firme.'),
    X.s('O que 出る杭は打たれる revela sobre a sociedade japonesa?', ['Pressão contra quem se destaca demais', 'Amor pela construção', 'Gosto por esportes'], 'Harmonia do grupo.'),
    X.s('Você temia uma tarefa, mas foi fácil:', ['案ずるより産むが易し|anzuru yori umu ga yasushi', '笑う門には福来る|warau kado ni wa fuku kitaru', '知らぬが仏|shiranu ga hotoke'], 'Fazer é mais fácil que temer.')
  ]),
  L('c28l6', 'Expressões de quatro kanji I', '四', 'vocab', [
    'Os 四字熟語 (yojijukugo) são expressões de quatro kanji, muitas vindas do chinês clássico. Aparecem em discursos, lemas e provas.',
    'Alguns são muito comuns no dia a dia: 一生懸命 (com todo o esforço), 一石二鳥 (matar dois coelhos com uma cajadada).',
    '一期一会 (um encontro, uma oportunidade) vem da cerimônia do chá: valorize cada encontro, pois ele não se repete.'
  ], 'Muitas pessoas escolhem um 四字熟語 como lema pessoal (座右の銘).', [
    ['issekinichou', '一石二鳥', 'isseki nichou', 'matar dois coelhos com uma cajadada', 'Uma pedra, dois pássaros.', ['自転車通勤は運動にもなって、一石二鳥だ。', 'jitensha tsuukin wa undou ni mo natte, isseki nichou da.', 'Ir de bicicleta ao trabalho também é exercício: dois coelhos numa cajadada.']],
    ['ichigoichie', '一期一会', 'ichigo ichie', 'cada encontro é único', '', ['一期一会を大切にしたい。', 'ichigo ichie o taisetsu ni shitai.', 'Quero valorizar cada encontro como único.']],
    ['jigoujitoku', '自業自得', 'jigou jitoku', 'colher o que plantou', '', ['遅刻したのは夜更かしした自業自得だ。', 'chikoku shita no wa yofukashi shita jigou jitoku da.', 'Me atrasei por ter ficado acordado até tarde: colhi o que plantei.']],
    ['ishindenshin', '以心伝心', 'ishin denshin', 'entender-se sem palavras', '', ['長年の友達とは以心伝心だ。', 'naganen no tomodachi to wa ishin denshin da.', 'Com amigos de longa data, a gente se entende sem palavras.']],
    ['isshoukenmei', '一生懸命', 'isshoukenmei', 'com todo o empenho', '', ['一生懸命練習した。', 'isshoukenmei renshuu shita.', 'Treinei com todo o empenho.']],
    ['hanshinhangi', '半信半疑', 'hanshin hangi', 'meio desconfiado', 'Metade acredita, metade duvida.', ['その話を半信半疑で聞いた。', 'sono hanashi o hanshin hangi de kiita.', 'Ouvi aquela história meio desconfiado.']],
    ['shikousakugo', '試行錯誤', 'shikou sakugo', 'tentativa e erro', '', ['試行錯誤を重ねて、やっと完成した。', 'shikou sakugo o kasanete, yatto kansei shita.', 'Depois de muita tentativa e erro, finalmente ficou pronto.']],
    ['rinkiouhen', '臨機応変', 'rinki ouhen', 'adaptar-se às circunstâncias', '', ['トラブルには臨機応変に対応してください。', 'toraburu ni wa rinki ouhen ni taiou shite kudasai.', 'Diante de problemas, adapte-se às circunstâncias.']]
  ], [
    ['一期一会の気持ちで、お客様を迎えましょう。', 'ichigo ichie no kimochi de, okyakusama o mukaemashou.', 'Vamos receber os clientes como se cada encontro fosse único.']
  ], [
    X.s('Equivalente a “matar dois coelhos com uma cajadada”:', ['一石二鳥|isseki nichou', '一期一会|ichigo ichie', '自業自得|jigou jitoku'], 'Uma pedra, dois pássaros.'),
    X.s('Ele não estudou e reprovou. Isso é:', ['自業自得|jigou jitoku', '以心伝心|ishin denshin', '臨機応変|rinki ouhen'], 'Colheu o que plantou.'),
    X.s('O que significa 試行錯誤?', ['tentativa e erro', 'sucesso imediato', 'desistir'], 'Tentar e errar.'),
    X.s('De onde vem 一期一会?', ['da cerimônia do chá', 'do beisebol', 'da culinária'], 'Cada encontro é único.')
  ]),
  L('c28l7', 'Expressões de quatro kanji II', '熟', 'vocab', [
    'Mais 四字熟語, desta vez ligados a estrutura, situações críticas e caráter.',
    '絶体絶命 = situação desesperadora, sem saída. Muito usado em mangás e esportes.',
    '大器晩成 (o grande vaso demora a ficar pronto) = pessoas de grande talento florescem tarde.'
  ], '起承転結 (introdução, desenvolvimento, reviravolta, conclusão) é a estrutura clássica de narrativas e até de mangás de quatro quadros (4コマ).', [
    ['kishoutenketsu', '起承転結', 'ki shou ten ketsu', 'introdução, desenvolvimento, reviravolta, conclusão', '', ['作文は起承転結を意識して書こう。', 'sakubun wa ki shou ten ketsu o ishiki shite kakou.', 'Escreva a redação pensando na estrutura de quatro partes.']],
    ['jakunikukyoushoku', '弱肉強食', 'jakuniku kyoushoku', 'lei do mais forte', '', ['ビジネスの世界は弱肉強食だ。', 'bijinesu no sekai wa jakuniku kyoushoku da.', 'O mundo dos negócios é a lei do mais forte.']],
    ['onkochishin', '温故知新', 'onko chishin', 'aprender o novo estudando o antigo', '', ['温故知新の精神で、歴史を学ぶ。', 'onko chishin no seishin de, rekishi o manabu.', 'Estudar história com o espírito de aprender o novo pelo antigo.']],
    ['zettaizetsumei', '絶体絶命', 'zettai zetsumei', 'situação desesperadora', '', ['絶体絶命のピンチを乗り越えた。', 'zettai zetsumei no pinchi o norikoeta.', 'Superei uma situação desesperadora.']],
    ['taikibansei', '大器晩成', 'taiki bansei', 'grandes talentos florescem tarde', '', ['彼は大器晩成型の選手だ。', 'kare wa taiki bansei gata no senshu da.', 'Ele é um atleta que floresceu tarde.']],
    ['yuugenjikkou', '有言実行', 'yuugen jikkou', 'cumprir o que diz', '', ['有言実行で、本当に合格した。', 'yuugen jikkou de, hontou ni goukaku shita.', 'Fez o que disse e realmente passou.']],
    ['ikudouon', '異口同音', 'iku douon', 'todos dizendo a mesma coisa', '', ['みんなが異口同音に反対した。', 'minna ga iku douon ni hantai shita.', 'Todos se opuseram em uníssono.']],
    ['isshinittai', '一進一退', 'isshin ittai', 'avança e recua, sem progresso claro', '', ['病状は一進一退だ。', 'byoujou wa isshin ittai da.', 'O quadro da doença oscila.']]
  ], [
    ['絶体絶命と思ったが、最後まで諦めなかった。', 'zettai zetsumei to omotta ga, saigo made akiramenakatta.', 'Achei que não havia saída, mas não desisti até o fim.']
  ], [
    X.s('Uma situação sem saída:', ['絶体絶命|zettai zetsumei', '大器晩成|taiki bansei', '温故知新|onko chishin'], 'Desespero total.'),
    X.s('Todos disseram a mesma coisa:', ['異口同音|iku douon', '一進一退|isshin ittai', '弱肉強食|jakuniku kyoushoku'], 'Bocas diferentes, mesmo som.'),
    X.s('Estrutura clássica de narrativas e mangás de quatro quadros:', ['起承転結|ki shou ten ketsu', '有言実行|yuugen jikkou', '一石二鳥|isseki nichou'], 'Quatro partes.'),
    X.s('O que significa 有言実行?', ['cumprir o que diz', 'falar muito', 'ficar calado'], 'Dizer e fazer.')
  ]),
  L('c28l8', 'Expressões com 口 e 言葉', '舌', 'vocab', [
    'Boca e palavras: expressões sobre falar demais, falar de menos, opinar e agradecer.',
    '口に合う = agradar ao paladar: お口に合うといいのですが (espero que seja do seu agrado), dito ao servir comida.',
    'お言葉に甘えて = aceitando sua gentileza: resposta educada quando alguém oferece ajuda ou convite.'
  ], 'お言葉に甘えて é uma das frases mais úteis para aceitar ofertas sem parecer folgado.', [
    ['kuchiniau', '口に合う', 'kuchi ni au', 'agradar ao paladar', '', ['お口に合うといいのですが。', 'okuchi ni au to ii no desu ga.', 'Espero que seja do seu agrado.']],
    ['kuchiwodasu', '口を出す', 'kuchi o dasu', 'se intrometer, dar palpite', '', ['人のことに口を出さないで。', 'hito no koto ni kuchi o dasanaide.', 'Não se meta na vida dos outros.']],
    ['kuchiguse', '口癖', 'kuchiguse', 'bordão, mania de falar', '', ['「疲れた」が彼の口癖だ。', '"tsukareta" ga kare no kuchiguse da.', '“Estou cansado” é o bordão dele.']],
    ['kuchigasuberu', '口が滑る', 'kuchi ga suberu', 'deixar escapar (sem querer)', '', ['つい口が滑って、秘密を話してしまった。', 'tsui kuchi ga subette, himitsu o hanashite shimatta.', 'Deixei escapar e acabei contando o segredo.']],
    ['kuchigaumai', '口がうまい', 'kuchi ga umai', 'ter lábia, ser bom de papo', '', ['セールスマンは口がうまい。', 'seerusuman wa kuchi ga umai.', 'Vendedores têm lábia.']],
    ['kotobaniamaete', 'お言葉に甘えて', 'okotoba ni amaete', 'aceitando sua gentileza', '', ['では、お言葉に甘えて、いただきます。', 'dewa, okotoba ni amaete, itadakimasu.', 'Então, aceitando sua gentileza, vou servir-me.']],
    ['kotobawonigosu', '言葉を濁す', 'kotoba o nigosu', 'responder de forma evasiva', '', ['理由を聞いたら、彼は言葉を濁した。', 'riyuu o kiitara, kare wa kotoba o nigoshita.', 'Quando perguntei o motivo, ele foi evasivo.']],
    ['kuchiwosoroeru', '口を揃える', 'kuchi o soroeru', 'dizer em coro, concordar todos', '', ['みんな口を揃えて「おいしい」と言った。', 'minna kuchi o soroete "oishii" to itta.', 'Todos disseram em coro: “Gostoso!”']]
  ], [
    ['「家まで送りますよ。」「では、お言葉に甘えて。」', '"ie made okurimasu yo." "dewa, okotoba ni amaete."', '“Eu te levo em casa.” “Então, aceito sua gentileza.”']
  ], [
    X.s('Alguém oferece carona. Para aceitar com educação:', ['お言葉に甘えて|okotoba ni amaete', '口を出して|kuchi o dashite', '言葉を濁して|kotoba o nigoshite'], 'Aceitar a gentileza.'),
    X.s('Ao servir comida a uma visita, diga:', ['お口に合うといいのですが|okuchi ni au to ii no desu ga', '口が滑りました|kuchi ga suberimashita', '口がうまいですね|kuchi ga umai desu ne'], 'Espero que agrade.'),
    X.s('Você contou um segredo sem querer:', ['口が滑った|kuchi ga subetta', '口を揃えた|kuchi o soroeta', '口に合った|kuchi ni atta'], 'A boca escorregou.'),
    X.f('Não dê palpite!', '＿を出さないで！', ['口|kuchi', '手|te', '目|me'], '口を出す = intrometer-se.')
  ]),
  L('c28l9', 'Expressões com 手', '手', 'vocab', [
    '手 (mão) representa ajuda, trabalho, esforço e meios em muitas expressões.',
    '手を貸す (emprestar a mão) = ajudar. 手が足りない (faltam mãos) = falta gente. 手を抜く (tirar a mão) = fazer de qualquer jeito.',
    '手を焼く = ter muito trabalho com alguém difícil. 手が出ない = não ter como (comprar, resolver).'
  ], '手間 (tempo e esforço) aparece em 手間がかかる (dar trabalho) e お手間を取らせて (desculpe tomar seu tempo).', [
    ['tewokasu', '手を貸す', 'te o kasu', 'dar uma mão, ajudar', '', ['ちょっと手を貸してくれない？', 'chotto te o kashite kurenai?', 'Pode me dar uma mão?']],
    ['tegatarinai', '手が足りない', 'te ga tarinai', 'faltar gente (para ajudar)', '', ['店が忙しくて、手が足りない。', 'mise ga isogashikute, te ga tarinai.', 'A loja está cheia e falta gente.']],
    ['tewonuku', '手を抜く', 'te o nuku', 'fazer de qualquer jeito', '', ['仕事で手を抜くのはよくない。', 'shigoto de te o nuku no wa yoku nai.', 'Não é bom fazer o trabalho de qualquer jeito.']],
    ['tewoyaku', '手を焼く', 'te o yaku', 'ter muito trabalho com (alguém)', '', ['いたずらな子に手を焼いている。', 'itazura na ko ni te o yaite iru.', 'Estou tendo muito trabalho com uma criança levada.']],
    ['tegadenai', '手が出ない', 'te ga denai', 'não ter condições (de comprar etc.)', '', ['高すぎて、とても手が出ない。', 'takasugite, totemo te ga denai.', 'É caro demais, não tenho como comprar.']],
    ['temagakakaru', '手間がかかる', 'tema ga kakaru', 'dar trabalho, levar tempo', '', ['この料理は手間がかかる。', 'kono ryouri wa tema ga kakaru.', 'Este prato dá trabalho.']],
    ['tewoutsu', '手を打つ', 'te o utsu', 'tomar providências', '', ['早めに手を打ったほうがいい。', 'hayame ni te o utta hou ga ii.', 'É melhor tomar providências cedo.']],
    ['teniireru', '手に入れる', 'te ni ireru', 'conseguir, obter', '', ['やっと限定版を手に入れた。', 'yatto genteiban o te ni ireta.', 'Finalmente consegui a edição limitada.']]
  ], [
    ['人手が足りないので、誰か手を貸してくれると助かる。', 'hitode ga tarinai node, dareka te o kashite kureru to tasukaru.', 'Está faltando gente, então se alguém puder ajudar, ajuda muito.']
  ], [
    X.s('Pedir ajuda a um amigo:', ['手を貸して|te o kashite', '手を抜いて|te o nuite', '手を焼いて|te o yaite'], '手を貸す = ajudar.'),
    X.s('Um carro caro demais para você:', ['手が出ない|te ga denai', '手を打つ|te o utsu', '手が足りない|te ga tarinai'], 'Não ter condições.'),
    X.s('Fazer o trabalho de qualquer jeito:', ['手を抜く|te o nuku', '手に入れる|te ni ireru', '手間がかかる|tema ga kakaru'], 'Tirar a mão.'),
    X.f('Vamos tomar providências logo.', '早く＿を打とう。', ['手|te', '口|kuchi', '目|me'], '手を打つ.')
  ]),
  L('c28l10', 'Expressões com 目', '目', 'vocab', [
    '目 (olho) aparece em expressões de atenção, tolerância, ocupação e bom gosto.',
    '目を通す = dar uma olhada (num documento). 目が回る = estar atordoado de tão ocupado. 目立つ = chamar atenção.',
    '大目に見る (ver com olhos grandes) = fazer vista grossa, perdoar. 目をつぶる (fechar os olhos) também é relevar.'
  ], '目が高い = ter olho bom, bom gosto: お客様、お目が高いですね (o senhor tem bom gosto) é elogio de vendedor.', [
    ['mewotoosu', '目を通す', 'me o toosu', 'dar uma olhada (em documento)', '', ['この書類に目を通しておいてください。', 'kono shorui ni me o tooshite oite kudasai.', 'Dê uma olhada neste documento, por favor.']],
    ['megamawaru', '目が回る', 'me ga mawaru', 'estar atordoado (de ocupado)', '', ['今日は目が回るほど忙しかった。', 'kyou wa me ga mawaru hodo isogashikatta.', 'Hoje estive ocupadíssimo.']],
    ['medatsu', '目立つ', 'medatsu', 'chamar atenção, destacar-se', '', ['赤い服は目立つ。', 'akai fuku wa medatsu.', 'Roupa vermelha chama atenção.']],
    ['oomeni', '大目に見る', 'oome ni miru', 'fazer vista grossa', '', ['今回だけは大目に見てあげる。', 'konkai dake wa oome ni mite ageru.', 'Só desta vez vou relevar.']],
    ['mewotsuburu', '目をつぶる', 'me o tsuburu', 'fechar os olhos para (relevar)', '', ['小さなミスには目をつぶろう。', 'chiisa na misu ni wa me o tsuburou.', 'Vamos relevar os pequenos erros.']],
    ['meniukabu', '目に浮かぶ', 'me ni ukabu', 'conseguir imaginar, visualizar', '', ['喜ぶ母の顔が目に浮かぶ。', 'yorokobu haha no kao ga me ni ukabu.', 'Consigo imaginar o rosto feliz da minha mãe.']],
    ['megatakai', '目が高い', 'me ga takai', 'ter bom gosto, olho bom', '', ['お客様は本当にお目が高いですね。', 'okyakusama wa hontou ni ome ga takai desu ne.', 'O senhor tem mesmo muito bom gosto.']],
    ['menikakaru', 'お目にかかる', 'ome ni kakaru', 'encontrar (humilde)', 'Kenjougo de 会う.', ['お目にかかれて光栄です。', 'ome ni kakarete kouei desu.', 'É uma honra conhecê-lo.']]
  ], [
    ['年末は目が回るほど忙しいけど、ミスは大目に見てもらえない。', 'nenmatsu wa me ga mawaru hodo isogashii kedo, misu wa oome ni mite moraenai.', 'No fim do ano é uma correria, mas erros não são relevados.']
  ], [
    X.s('O chefe pede para você revisar um relatório:', ['目を通してください|me o tooshite kudasai', '目を回してください|me o mawashite kudasai', '目立ってください|medatte kudasai'], '目を通す = dar uma olhada.'),
    X.s('Relevar um erro pequeno:', ['大目に見る|oome ni miru', '目が高い|me ga takai', '目に浮かぶ|me ni ukabu'], 'Ver com olhos grandes.'),
    X.s('Forma humilde de 会う:', ['お目にかかる|ome ni kakaru', '目を通す|me o toosu', '目立つ|medatsu'], 'Kenjougo.'),
    X.s('O que significa 目が回るほど忙しい?', ['ocupadíssimo, atordoado', 'com tontura de doença', 'com sono'], 'Os olhos giram.')
  ])
  );
})();
