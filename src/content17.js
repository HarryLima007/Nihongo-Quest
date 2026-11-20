/* ==========================================================
   CONTEÚDO 3.0 — Intermediário (N3): Leitura e Interpretação (c22)
   Cada lição tem um texto (L.text), o vocabulário-chave e
   perguntas de compreensão.
   ========================================================== */
(function () {
  const { lesson: L, X, text: T } = NQK;
  const c = NQK.wing({
    id: 'c22', emblem: '読', title: 'Leitura e Interpretação', jp: 'どっかい', stage: 'int', jlpt: 'N3',
    desc: 'Textos reais do cotidiano: mensagens, avisos, diários, anúncios, notícias, blogs, opiniões e um conto. Leia, ouça e responda.',
    requires: ['c16', 'c17'], reqWhy: 'Os textos usam a gramática N4 e os kanji das duas alas de kanji.'
  });
  const howTo = (a) => [a, 'Leia primeiro o texto inteiro sem parar, tentando pegar a ideia geral. Depois toque em “Mostrar tradução” para conferir e ouça o áudio.', 'As perguntas no fim testam compreensão: o que aconteceu, por quê, e o que o autor quer dizer.'];
  c.lessons.push(
  L('c22l1', 'Mensagem de um amigo', '便', 'vocab', howTo('Um amigo japonês escreve contando novidades: uma mudança de cidade e um convite.'),
    'Em mensagens pessoais, o japonês costuma começar com o tempo ou a estação (元気？もうすっかり秋だね) antes de entrar no assunto.', [
    ['hikkoshi', '引っ越し', 'hikkoshi', 'mudança (de casa)', '引っ越す = mudar-se.', ['引っ越しの準備で忙しい。', 'hikkoshi no junbi de isogashii.', 'Estou ocupado com os preparativos da mudança.']],
    ['sukkari', 'すっかり', 'sukkari', 'completamente', '', ['すっかり忘れていた。', 'sukkari wasurete ita.', 'Eu tinha esquecido completamente.']],
    ['shinseikatsu', '新生活', 'shinseikatsu', 'vida nova', 'Muito usado em abril, início do ano letivo e fiscal.', ['新生活が始まった。', 'shinseikatsu ga hajimatta.', 'Começou a vida nova.']],
    ['madori', '間取り', 'madori', 'planta (disposição dos cômodos)', '1LDK = um quarto + sala/cozinha.', ['この部屋の間取りが気に入った。', 'kono heya no madori ga ki ni itta.', 'Gostei da planta deste apartamento.']],
    ['zehi', 'ぜひ', 'zehi', 'sem falta, com certeza (convite)', 'ぜひ来てね = venha sem falta.', ['ぜひ遊びに来てください。', 'zehi asobi ni kite kudasai.', 'Venha nos visitar sem falta.']],
    ['henji', '返事', 'henji', 'resposta', '', ['返事が遅くなってごめん。', 'henji ga osoku natte gomen.', 'Desculpe pela demora em responder.']]
  ], [
    ['大阪に引っ越すことになった。', 'oosaka ni hikkosu koto ni natta.', 'Vou me mudar para Osaka.']
  ], [
    X.s('Por que o Kenta escreveu?', ['Para contar que se mudou e convidar o amigo', 'Para pedir dinheiro', 'Para reclamar do trabalho'], 'Ele conta a mudança e convida para visitar.'),
    X.s('Por que ele se mudou para Osaka?', ['Por causa do trabalho', 'Para estudar', 'Para ficar perto da família'], '仕事の都合で = por causa do trabalho.'),
    X.s('O que ele diz sobre o apartamento novo?', ['É pequeno, mas perto da estação', 'É grande e longe', 'É caro e velho'], '狭いけど、駅から近い.'),
    X.s('O que ele pede no final?', ['Que o amigo responda quando puder', 'Que o amigo ajude na mudança', 'Que o amigo mande dinheiro'], '時間があるときに返事ちょうだい.')
  ], { textTitle: 'Mensagem do Kenta', text: T([
    ['マリアへ', 'maria e', 'Para Maria,'],
    ['元気？東京はもうすっかり秋だね。', 'genki? toukyou wa mou sukkari aki da ne.', 'Tudo bem? Em Tóquio já é outono de vez, né.'],
    ['実は先月、仕事の都合で大阪に引っ越したんだ。', 'jitsu wa sengetsu, shigoto no tsugou de oosaka ni hikkoshita n da.', 'Na verdade, mês passado me mudei para Osaka por causa do trabalho.'],
    ['新しい部屋は狭いけど、駅から近くて便利だよ。', 'atarashii heya wa semai kedo, eki kara chikakute benri da yo.', 'O apartamento novo é pequeno, mas é perto da estação e prático.'],
    ['大阪の人はみんな親切で、食べ物もおいしい。', 'oosaka no hito wa minna shinsetsu de, tabemono mo oishii.', 'O pessoal de Osaka é todo gentil, e a comida é gostosa.'],
    ['冬休みに、ぜひ遊びに来てね。案内するよ。', 'fuyuyasumi ni, zehi asobi ni kite ne. annai suru yo.', 'Nas férias de inverno, venha me visitar sem falta. Eu te levo para passear.'],
    ['時間があるときに返事ちょうだい。けんたより', 'jikan ga aru toki ni henji choudai. kenta yori', 'Me responda quando tiver tempo. Do Kenta.']
  ]) }),
  L('c22l2', 'Aviso do prédio', '告', 'vocab', howTo('Um aviso colado na entrada de um prédio de apartamentos sobre o lixo e uma obra.'),
    'Avisos usam linguagem formal e muitos substantivos compostos: 収集日 (dia de coleta), 工事期間 (período da obra).', [
    ['juumin', '住民', 'juumin', 'morador', '住民の皆様 = prezados moradores.', ['住民の皆様へお知らせです。', 'juumin no minasama e oshirase desu.', 'Aviso aos prezados moradores.']],
    ['oshirase', 'お知らせ', 'oshirase', 'aviso, comunicado', '', ['大切なお知らせがあります。', 'taisetsu na oshirase ga arimasu.', 'Há um comunicado importante.']],
    ['shuushuubi', '収集日', 'shuushuubi', 'dia de coleta', '', ['ゴミの収集日を守ってください。', 'gomi no shuushuubi o mamotte kudasai.', 'Respeitem os dias de coleta do lixo.']],
    ['kouji', '工事', 'kouji', 'obra', '工事中 = em obras.', ['道路が工事中で通れない。', 'douro ga koujichuu de tourenai.', 'A rua está em obras e não dá para passar.']],
    ['kyouryoku', '協力', 'kyouryoku', 'cooperação', 'ご協力をお願いします = contamos com sua colaboração.', ['ご協力をお願いいたします。', 'gokyouryoku o onegai itashimasu.', 'Contamos com sua colaboração.']],
    ['kanrinin', '管理人', 'kanrinin', 'zelador, administrador', '', ['わからないことは管理人に聞いてください。', 'wakaranai koto wa kanrinin ni kiite kudasai.', 'Em caso de dúvida, pergunte ao zelador.']]
  ], [
    ['エレベーターは点検のため使えません。', 'erebeetaa wa tenken no tame tsukaemasen.', 'O elevador não pode ser usado por causa da inspeção.']
  ], [
    X.s('Em que dia se joga lixo queimável?', ['Segunda e quinta', 'Quarta', 'Sábado'], '燃えるゴミは月曜日と木曜日.'),
    X.s('Até que horas o lixo deve ser colocado?', ['Até as 8h da manhã', 'Até a meia-noite', 'Até as 10h'], '朝八時までに.'),
    X.s('O que acontece de 10 a 12 de novembro?', ['Obra no estacionamento', 'Festa do prédio', 'Troca do elevador'], '駐車場の工事.'),
    X.s('A quem perguntar em caso de dúvida?', ['Ao zelador', 'À polícia', 'Ao vizinho'], '管理人まで.')
  ], { textTitle: 'Aviso aos moradores', text: T([
    ['住民の皆様へ', 'juumin no minasama e', 'Aos prezados moradores'],
    ['ゴミの出し方について、もう一度お知らせします。', 'gomi no dashikata ni tsuite, mou ichido oshirase shimasu.', 'Informamos novamente sobre como colocar o lixo.'],
    ['燃えるゴミは月曜日と木曜日、燃えないゴミは水曜日です。', 'moeru gomi wa getsuyoubi to mokuyoubi, moenai gomi wa suiyoubi desu.', 'O lixo queimável é segunda e quinta; o não queimável, quarta.'],
    ['収集日の朝八時までに出してください。', 'shuushuubi no asa hachiji made ni dashite kudasai.', 'Coloquem até as 8h da manhã do dia da coleta.'],
    ['また、十一月十日から十二日まで、駐車場の工事を行います。', 'mata, juuichigatsu tooka kara juuninichi made, chuushajou no kouji o okonaimasu.', 'Além disso, de 10 a 12 de novembro faremos obras no estacionamento.'],
    ['工事の間は、車を止めることができません。', 'kouji no aida wa, kuruma o tomeru koto ga dekimasen.', 'Durante a obra, não será possível estacionar.'],
    ['ご不明な点は、管理人までお問い合わせください。', 'gofumei na ten wa, kanrinin made otoiawase kudasai.', 'Em caso de dúvidas, consultem o zelador.']
  ]) }),
  L('c22l3', 'Diário: primeiro dia de trabalho', '記', 'vocab', howTo('Uma brasileira escreve no diário sobre o primeiro dia numa empresa japonesa.'),
    'Diários usam a forma simples (だ/である) e muitas vezes ている para estados e ようだ / と思う para impressões.', [
    ['nikki', '日記', 'nikki', 'diário', '', ['毎晩、日本語で日記を書いている。', 'maiban, nihongo de nikki o kaite iru.', 'Escrevo um diário em japonês todas as noites.']],
    ['jikoshoukai', '自己紹介', 'jikoshoukai', 'apresentação pessoal', '', ['朝礼で自己紹介をした。', 'chourei de jikoshoukai o shita.', 'Me apresentei na reunião da manhã.']],
    ['chourei', '朝礼', 'chourei', 'reunião matinal', 'Comum em empresas japonesas.', ['毎朝九時から朝礼がある。', 'maiasa kuji kara chourei ga aru.', 'Toda manhã às nove há reunião matinal.']],
    ['teiji', '定時', 'teiji', 'horário fixo de saída (fim do expediente)', '定時に帰る = sair no horário.', ['今日は定時に帰れそうだ。', 'kyou wa teiji ni kaeresou da.', 'Parece que hoje vou conseguir sair no horário.']],
    ['hottosuru', 'ほっとする', 'hotto suru', 'sentir alívio', '', ['無事に終わって、ほっとした。', 'buji ni owatte, hotto shita.', 'Terminou bem e senti alívio.']],
    ['ganbarou', '頑張ろう', 'ganbarou', 'vamos nos esforçar (volitivo de 頑張る)', 'Para si mesmo: 明日も頑張ろう.', ['明日も頑張ろう。', 'ashita mo ganbarou.', 'Amanhã vou me esforçar também.']]
  ], [
    ['最初は緊張したけど、みんな優しかった。', 'saisho wa kinchou shita kedo, minna yasashikatta.', 'No começo fiquei nervosa, mas todos foram gentis.']
  ], [
    X.s('Como a autora se sentiu de manhã?', ['Muito nervosa', 'Entediada', 'Com raiva'], 'とても緊張していた.'),
    X.s('O que aconteceu na reunião matinal?', ['Ela se apresentou em japonês', 'Ela foi promovida', 'Ela chegou atrasada'], '朝礼で日本語で自己紹介をした.'),
    X.s('Quem a ajudou?', ['A veterana Suzuki', 'O presidente', 'Uma cliente'], '鈴木さんという先輩.'),
    X.s('O que ela achou estranho?', ['Ninguém ia embora no horário', 'O almoço era caro', 'Todos falavam inglês'], '定時に誰も帰らない.')
  ], { textTitle: 'Diário de Ana', text: T([
    ['四月一日（月）晴れ', 'shigatsu tsuitachi (getsu) hare', '1º de abril (segunda), ensolarado'],
    ['今日は新しい会社の初出勤だった。朝からとても緊張していた。', 'kyou wa atarashii kaisha no hatsushukkin datta. asa kara totemo kinchou shite ita.', 'Hoje foi meu primeiro dia na empresa nova. Estava muito nervosa desde cedo.'],
    ['朝礼で、日本語で自己紹介をした。声が震えたけど、みんな拍手してくれた。', 'chourei de, nihongo de jikoshoukai o shita. koe ga furueta kedo, minna hakushu shite kureta.', 'Na reunião matinal, me apresentei em japonês. Minha voz tremeu, mas todos aplaudiram.'],
    ['鈴木さんという先輩が、仕事の流れを丁寧に教えてくれた。', 'suzuki-san to iu senpai ga, shigoto no nagare o teinei ni oshiete kureta.', 'Uma veterana chamada Suzuki me explicou o fluxo do trabalho com cuidado.'],
    ['ただ、定時の六時になっても、誰も帰らないのには驚いた。', 'tada, teiji no rokuji ni natte mo, dare mo kaeranai no ni wa odoroita.', 'Só me surpreendeu que, mesmo dando seis horas, o fim do expediente, ninguém foi embora.'],
    ['結局、七時に「お先に失礼します」と言って帰った。', 'kekkyoku, shichiji ni "osaki ni shitsurei shimasu" to itte kaetta.', 'No fim, às sete, disse “Com licença, vou indo” e fui embora.'],
    ['疲れたけど、ほっとした。明日も頑張ろう。', 'tsukareta kedo, hotto shita. ashita mo ganbarou.', 'Estou cansada, mas aliviada. Amanhã vou me esforçar de novo.']
  ]) }),
  L('c22l4', 'Anúncio de liquidação', '売', 'vocab', howTo('Um anúncio de uma loja de departamentos sobre a liquidação de verão.'),
    'Anúncios usam frases curtas, sem verbo no final, e muitos números: 最大五十パーセントオフ, 先着百名様.', [
    ['seeru', '夏のセール', 'natsu no seeru', 'liquidação de verão', '', ['夏のセールで水着を買った。', 'natsu no seeru de mizugi o katta.', 'Comprei um maiô na liquidação de verão.']],
    ['saidai', '最大', 'saidai', 'máximo, até', '最大五十％オフ = até 50% de desconto.', ['最大七十パーセントオフです。', 'saidai nanajuppaasento ofu desu.', 'Até 70% de desconto.']],
    ['senchaku', '先着', 'senchaku', 'por ordem de chegada', '先着百名様 = os 100 primeiros.', ['先着五十名様にプレゼントがあります。', 'senchaku gojuumeisama ni purezento ga arimasu.', 'Os 50 primeiros ganham um brinde.']],
    ['kikan', '期間', 'kikan', 'período', '期間限定 = por tempo limitado.', ['期間限定のメニューです。', 'kikan gentei no menyuu desu.', 'É um cardápio por tempo limitado.']],
    ['taishou', '対象', 'taishou', 'alvo, válido para', '対象外 = não incluído.', ['この商品はセールの対象外です。', 'kono shouhin wa seeru no taishougai desu.', 'Este produto não está incluído na liquidação.']],
    ['eigyou', '営業時間', 'eigyou jikan', 'horário de funcionamento', '', ['営業時間は十時から八時までです。', 'eigyou jikan wa juuji kara hachiji made desu.', 'O horário de funcionamento é das 10h às 20h.']]
  ], [
    ['期間中は、営業時間を一時間延長します。', 'kikanchuu wa, eigyou jikan o ichijikan enchou shimasu.', 'Durante o período, o horário será estendido em uma hora.']
  ], [
    X.s('Qual é o desconto máximo?', ['50%', '30%', '70%'], '最大五十パーセントオフ.'),
    X.s('Quem ganha o brinde?', ['Os 100 primeiros clientes de cada dia', 'Todos os clientes', 'Só os sócios'], '毎日先着百名様.'),
    X.s('Até que horas a loja abre durante a liquidação?', ['Até as 21h', 'Até as 20h', 'Até as 22h'], '夜九時まで.'),
    X.s('O que NÃO está incluído?', ['Alimentos', 'Roupas', 'Sapatos'], '食料品は対象外.')
  ], { textTitle: 'Liquidação de verão', text: T([
    ['さくら百貨店　夏のビッグセール！', 'sakura hyakkaten natsu no biggu seeru!', 'Loja de Departamentos Sakura: grande liquidação de verão!'],
    ['期間：七月十五日（土）から二十三日（日）まで', 'kikan: shichigatsu juugonichi (do) kara nijuusannichi (nichi) made', 'Período: de 15 (sábado) a 23 (domingo) de julho'],
    ['洋服、靴、かばんが最大五十パーセントオフ！', 'youfuku, kutsu, kaban ga saidai gojuppaasento ofu!', 'Roupas, sapatos e bolsas com até 50% de desconto!'],
    ['毎日先着百名様に、すてきなプレゼントを差し上げます。', 'mainichi senchaku hyakumeisama ni, suteki na purezento o sashiagemasu.', 'Todos os dias, os 100 primeiros clientes ganham um lindo brinde.'],
    ['セール期間中は、夜九時まで営業いたします。', 'seeru kikanchuu wa, yoru kuji made eigyou itashimasu.', 'Durante a liquidação, ficaremos abertos até as 21h.'],
    ['食料品はセールの対象外です。', 'shokuryouhin wa seeru no taishougai desu.', 'Alimentos não estão incluídos na liquidação.'],
    ['皆様のご来店をお待ちしております。', 'minasama no goraiten o omachi shite orimasu.', 'Aguardamos a sua visita.']
  ]) }),
  L('c22l5', 'Notícia: festival adiado', '報', 'vocab', howTo('Uma notícia curta sobre um festival de fogos adiado por causa de um tufão.'),
    'Notícias usam a forma である ou frases terminadas em substantivo, e muita passiva: 発表された (foi anunciado).', [
    ['hanabi', '花火大会', 'hanabi taikai', 'festival de fogos de artifício', 'Tradição de verão.', ['毎年、花火大会に浴衣で行く。', 'maitoshi, hanabi taikai ni yukata de iku.', 'Todo ano vou ao festival de fogos de yukata.']],
    ['enki', '延期', 'enki', 'adiamento', '中止 = cancelamento.', ['試合は雨で延期になった。', 'shiai wa ame de enki ni natta.', 'O jogo foi adiado por causa da chuva.']],
    ['happyou', '発表', 'happyou', 'anúncio; apresentação', '', ['結果は来週発表されます。', 'kekka wa raishuu happyou saremasu.', 'O resultado será anunciado semana que vem.']],
    ['sekkin', '接近', 'sekkin', 'aproximação', '', ['台風が九州に接近している。', 'taifuu ga kyuushuu ni sekkin shite iru.', 'O tufão está se aproximando de Kyushu.']],
    ['anzen', '安全', 'anzen', 'segurança', '危険 = perigo.', ['安全のため、ヘルメットをかぶってください。', 'anzen no tame, herumetto o kabutte kudasai.', 'Por segurança, use capacete.']],
    ['kaisai', '開催', 'kaisai', 'realização (de evento)', '開催する = realizar.', ['オリンピックが開催された。', 'orinpikku ga kaisai sareta.', 'As Olimpíadas foram realizadas.']]
  ], [
    ['台風の影響で、多くのイベントが中止になった。', 'taifuu no eikyou de, ooku no ibento ga chuushi ni natta.', 'Por influência do tufão, muitos eventos foram cancelados.']
  ], [
    X.s('O festival foi cancelado ou adiado?', ['Adiado', 'Cancelado', 'Mantido'], '延期すると発表した.'),
    X.s('Por que mudou a data?', ['Um tufão está se aproximando', 'Faltou dinheiro', 'Houve um terremoto'], '台風が接近しているため.'),
    X.s('Para quando foi a nova data?', ['Sábado da semana seguinte', 'Mês que vem', 'Ainda não foi decidida'], '翌週の土曜日.'),
    X.s('Quantas pessoas vão ao festival todo ano?', ['Cerca de 50 mil', 'Cerca de 5 mil', 'Cerca de 500 mil'], '約五万人.')
  ], { textTitle: 'Festival de fogos adiado', text: T([
    ['みなと市の花火大会、延期へ', 'minato shi no hanabi taikai, enki e', 'Festival de fogos de Minato será adiado'],
    ['みなと市は八日、十日に予定していた花火大会を延期すると発表した。', 'minato shi wa youka, tooka ni yotei shite ita hanabi taikai o enki suru to happyou shita.', 'A cidade de Minato anunciou no dia 8 que vai adiar o festival de fogos previsto para o dia 10.'],
    ['大型の台風が接近しているため、安全を考えて決めたという。', 'oogata no taifuu ga sekkin shite iru tame, anzen o kangaete kimeta to iu.', 'Segundo a cidade, a decisão foi tomada pensando na segurança, pois um grande tufão se aproxima.'],
    ['新しい日程は、翌週の土曜日、十七日である。', 'atarashii nittei wa, yokushuu no doyoubi, juushichinichi de aru.', 'A nova data é o sábado da semana seguinte, dia 17.'],
    ['この花火大会には、毎年約五万人が訪れる。', 'kono hanabi taikai ni wa, maitoshi yaku goman\'nin ga otozureru.', 'Cerca de 50 mil pessoas visitam este festival todos os anos.'],
    ['市の担当者は「楽しみにしていた皆さんには申し訳ない」と話している。', 'shi no tantousha wa "tanoshimi ni shite ita minasan ni wa moushiwake nai" to hanashite iru.', 'O responsável da prefeitura disse: “Pedimos desculpas a todos que estavam ansiosos pelo evento”.']
  ]) }),
  L('c22l6', 'Blog de viagem: Kyoto', '旅', 'vocab', howTo('Um blog pessoal sobre um dia de passeio em Kyoto no outono.'),
    'Blogs misturam forma simples e です/ます, com impressões pessoais: 〜てよかった, 〜てみたい, 〜と思う.', [
    ['kouyou', '紅葉', 'kouyou', 'folhas vermelhas de outono', 'Também lido もみじ (bordo).', ['京都の紅葉は本当にきれいだ。', 'kyouto no kouyou wa hontou ni kirei da.', 'As folhas de outono de Kyoto são lindas mesmo.']],
    ['konzatsu', '混雑', 'konzatsu', 'lotação, aglomeração', '混雑する = ficar lotado.', ['週末の電車は混雑している。', 'shuumatsu no densha wa konzatsu shite iru.', 'Os trens do fim de semana ficam lotados.']],
    ['keshiki', '景色', 'keshiki', 'paisagem, vista', '', ['山の上からの景色は最高だった。', 'yama no ue kara no keshiki wa saikou datta.', 'A vista do alto da montanha foi a melhor.']],
    ['tokubetsu', '特別', 'tokubetsu', 'especial', '', ['今日は特別な日です。', 'kyou wa tokubetsu na hi desu.', 'Hoje é um dia especial.']],
    ['osusume', 'おすすめ', 'osusume', 'recomendação', '', ['このお店はとてもおすすめです。', 'kono omise wa totemo osusume desu.', 'Recomendo muito esta loja.']],
    ['hayaokishite', '早起きして', 'hayaoki shite', 'acordando cedo', 'Forma て de 早起きする.', ['早起きして、お寺に行った。', 'hayaoki shite, otera ni itta.', 'Acordei cedo e fui ao templo.']]
  ], [
    ['人が少ない朝のうちに行くのがおすすめです。', 'hito ga sukunai asa no uchi ni iku no ga osusume desu.', 'Recomendo ir de manhã, enquanto há pouca gente.']
  ], [
    X.s('Por que a autora foi cedo?', ['Para evitar a multidão', 'Porque o templo fechava cedo', 'Para tomar café'], '混雑を避けるため.'),
    X.s('Como estava o templo de manhã?', ['Quase vazio e silencioso', 'Lotado', 'Fechado'], '人がほとんどいなくて、静かだった.'),
    X.s('O que ela comeu?', ['Doce de matcha', 'Lámen', 'Sushi'], '抹茶のお菓子.'),
    X.s('O que ela recomenda?', ['Ir de manhã cedo', 'Ir à noite', 'Ir só no verão'], '朝早く行くのがおすすめ.')
  ], { textTitle: 'Um dia em Kyoto', text: T([
    ['先週末、紅葉を見に京都へ行ってきました。', 'senshuumatsu, kouyou o mi ni kyouto e itte kimashita.', 'No fim de semana passado, fui a Kyoto ver as folhas de outono.'],
    ['この季節の京都はとても混雑するので、早起きして朝七時にお寺に着きました。', 'kono kisetsu no kyouto wa totemo konzatsu suru node, hayaoki shite asa shichiji ni otera ni tsukimashita.', 'Kyoto fica muito lotada nesta época, então acordei cedo e cheguei ao templo às sete da manhã.'],
    ['人がほとんどいなくて、静かで、まるで特別な世界にいるようでした。', 'hito ga hotondo inakute, shizuka de, marude tokubetsu na sekai ni iru you deshita.', 'Quase não havia ninguém; estava silencioso, como se eu estivesse num mundo especial.'],
    ['赤や黄色の葉と古いお寺の景色は、写真よりずっときれいでした。', 'aka ya kiiro no ha to furui otera no keshiki wa, shashin yori zutto kirei deshita.', 'A paisagem das folhas vermelhas e amarelas com o templo antigo era muito mais bonita que nas fotos.'],
    ['お昼ごろには観光客でいっぱいになったので、近くのカフェで抹茶のお菓子を食べて休みました。', 'ohiru goro ni wa kankoukyaku de ippai ni natta node, chikaku no kafe de maccha no okashi o tabete yasumimashita.', 'Perto do meio-dia ficou cheio de turistas, então descansei num café próximo comendo um doce de matcha.'],
    ['京都に行くなら、朝早く行くのが絶対におすすめです！', 'kyouto ni iku nara, asa hayaku iku no ga zettai ni osusume desu!', 'Se for a Kyoto, recomendo muito ir de manhã cedo!']
  ]) }),
  L('c22l7', 'Avaliação de restaurante', '評', 'vocab', howTo('Uma avaliação de cliente num site de restaurantes, com pontos positivos e negativos.'),
    'Avaliações usam muito けど e ただ (só que) para equilibrar elogios e críticas.', [
    ['aji', '味', 'aji', 'sabor', '味が濃い = sabor forte; 薄い = fraco.', ['このスープは味が薄い。', 'kono suupu wa aji ga usui.', 'Esta sopa tem pouco sabor.']],
    ['ryou', '量', 'ryou', 'quantidade, porção', '', ['この店は量が多くて安い。', 'kono mise wa ryou ga ookute yasui.', 'Esta loja serve porções grandes e baratas.']],
    ['fun\'iki', '雰囲気', 'fun\'iki', 'ambiente, atmosfera', '', ['落ち着いた雰囲気のカフェだ。', 'ochitsuita fun\'iki no kafe da.', 'É um café com ambiente tranquilo.']],
    ['sekkyaku', '接客', 'sekkyaku', 'atendimento ao cliente', '', ['この店は接客がいい。', 'kono mise wa sekkyaku ga ii.', 'Esta loja tem bom atendimento.']],
    ['manzoku', '満足', 'manzoku', 'satisfação', '満足する = ficar satisfeito.', ['料理にとても満足した。', 'ryouri ni totemo manzoku shita.', 'Fiquei muito satisfeito com a comida.']],
    ['zannen', '残念', 'zannen', 'uma pena, lamentável', '', ['予約できなくて残念だった。', 'yoyaku dekinakute zannen datta.', 'Foi uma pena não conseguir reservar.']]
  ], [
    ['味はいいけど、待ち時間が長いのが残念だ。', 'aji wa ii kedo, machijikan ga nagai no ga zannen da.', 'O sabor é bom, mas é uma pena que a espera seja longa.']
  ], [
    X.s('Qual nota o cliente deu?', ['4 estrelas', '5 estrelas', '2 estrelas'], '星四つ.'),
    X.s('O que o cliente elogiou?', ['O sabor e o preço', 'A música', 'O estacionamento'], '味も値段も満足.'),
    X.s('Qual foi o ponto negativo?', ['A espera de 40 minutos', 'O atendimento rude', 'A comida fria'], '四十分も待った.'),
    X.s('Qual conselho o cliente dá?', ['Ir num dia de semana', 'Ir só à noite', 'Não ir'], '平日に行くのがいい.')
  ], { textTitle: 'Avaliação: Lámen Tora', text: T([
    ['★★★★☆　ラーメン虎', 'hoshi yottsu. raamen tora', '★★★★☆ Lámen Tora'],
    ['友人にすすめられて、日曜日のお昼に行きました。', 'yuujin ni susumerarete, nichiyoubi no ohiru ni ikimashita.', 'Fui no almoço de domingo por recomendação de um amigo.'],
    ['スープは濃いけど、しつこくなくて、最後まで飲めました。', 'suupu wa koi kedo, shitsukoku nakute, saigo made nomemashita.', 'O caldo é forte, mas não enjoa, e consegui tomar até o fim.'],
    ['量も多くて八百円なので、味も値段も満足です。', 'ryou mo ookute happyakuen na node, aji mo nedan mo manzoku desu.', 'A porção é grande e custa 800 ienes, então fiquei satisfeito com o sabor e o preço.'],
    ['ただ、店の前に行列ができていて、四十分も待ったのが残念でした。', 'tada, mise no mae ni gyouretsu ga dekite ite, yonjuppun mo matta no ga zannen deshita.', 'Só que havia uma fila na frente, e foi uma pena esperar 40 minutos.'],
    ['店員さんの接客は明るくて、雰囲気もよかったです。', 'ten\'in-san no sekkyaku wa akarukute, fun\'iki mo yokatta desu.', 'O atendimento foi alegre e o ambiente também era bom.'],
    ['行くなら、平日に行くのがいいと思います。', 'iku nara, heijitsu ni iku no ga ii to omoimasu.', 'Se for, acho melhor ir num dia de semana.']
  ]) }),
  L('c22l8', 'Texto informativo: お土産の文化', '文', 'vocab', howTo('Um texto explicativo sobre o costume japonês de trazer lembrancinhas de viagem.'),
    'Textos explicativos usam である, conectivos como そのため (por isso) e つまり (ou seja), e terminam com uma conclusão.', [
    ['shuukan', '習慣', 'shuukan', 'costume, hábito', '', ['日本にはお土産を配る習慣がある。', 'nihon ni wa omiyage o kubaru shuukan ga aru.', 'No Japão existe o costume de distribuir lembrancinhas.']],
    ['kubaru', '配る', 'kubaru', 'distribuir', '', ['チラシを配るバイトをした。', 'chirashi o kubaru baito o shita.', 'Fiz um bico distribuindo panfletos.']],
    ['meibutsu', '名物', 'meibutsu', 'especialidade local', '', ['広島の名物はお好み焼きだ。', 'hiroshima no meibutsu wa okonomiyaki da.', 'A especialidade de Hiroshima é o okonomiyaki.']],
    ['kansha', '感謝', 'kansha', 'gratidão', '感謝の気持ち = sentimento de gratidão.', ['いつも感謝しています。', 'itsumo kansha shite imasu.', 'Sou sempre grato.']],
    ['meiwaku', '迷惑', 'meiwaku', 'incômodo, transtorno', '迷惑をかける = incomodar.', ['ご迷惑をおかけしました。', 'gomeiwaku o okake shimashita.', 'Desculpe pelo transtorno.']],
    ['sonotame', 'そのため', 'sono tame', 'por isso, por essa razão', 'Conectivo formal.', ['雪が降った。そのため、電車が遅れた。', 'yuki ga futta. sono tame, densha ga okureta.', 'Nevou. Por isso, os trens atrasaram.']]
  ], [
    ['お土産には、感謝の気持ちが込められている。', 'omiyage ni wa, kansha no kimochi ga komerarete iru.', 'As lembrancinhas carregam um sentimento de gratidão.']
  ], [
    X.s('Para quem os japoneses costumam trazer lembrancinhas?', ['Colegas de trabalho, família e amigos', 'Só para a família', 'Só para o chefe'], '職場の同僚や家族、友人.'),
    X.s('Por que se traz omiyage para os colegas?', ['Para agradecer por cobrirem sua ausência', 'Porque é obrigatório por lei', 'Para vender'], '休みの間、迷惑をかけたから.'),
    X.s('Que tipo de presente é mais comum?', ['Doces embalados individualmente', 'Roupas', 'Livros'], '一つずつ包装されたお菓子.'),
    X.s('Qual é a conclusão do texto?', ['A omiyage é uma forma de cuidar das relações', 'A omiyage está desaparecendo', 'A omiyage é cara demais'], '人間関係を大切にする方法.')
  ], { textTitle: 'A cultura da omiyage', text: T([
    ['日本では、旅行に行くとお土産を買って帰る習慣がある。', 'nihon de wa, ryokou ni iku to omiyage o katte kaeru shuukan ga aru.', 'No Japão, há o costume de trazer lembrancinhas quando se viaja.'],
    ['お土産を渡す相手は、家族や友人だけでなく、職場の同僚も多い。', 'omiyage o watasu aite wa, kazoku ya yuujin dake de naku, shokuba no douryou mo ooi.', 'Elas são dadas não só à família e amigos, mas muitas vezes também aos colegas de trabalho.'],
    ['休みの間、仕事を代わってもらうなど、同僚に迷惑をかけるからだ。', 'yasumi no aida, shigoto o kawatte morau nado, douryou ni meiwaku o kakeru kara da.', 'Isso porque, durante a folga, os colegas cobrem o trabalho e são incomodados.'],
    ['そのため、職場では、一つずつ包装されたお菓子が人気である。', 'sono tame, shokuba de wa, hitotsu zutsu housou sareta okashi ga ninki de aru.', 'Por isso, no trabalho, doces embalados individualmente são populares.'],
    ['みんなに配りやすく、その土地の名物であることが多い。', 'minna ni kubariyasuku, sono tochi no meibutsu de aru koto ga ooi.', 'São fáceis de distribuir e muitas vezes são especialidades do lugar.'],
    ['つまり、お土産は単なるプレゼントではなく、感謝を伝え、人間関係を大切にする方法なのである。', 'tsumari, omiyage wa tannaru purezento de wa naku, kansha o tsutae, ningen kankei o taisetsu ni suru houhou na no de aru.', 'Ou seja, a omiyage não é um simples presente: é uma forma de expressar gratidão e cuidar das relações.']
  ]) }),
  L('c22l9', 'Opinião: celular no trem', '論', 'vocab', howTo('Um leitor escreve ao jornal dando sua opinião sobre as regras de etiqueta nos trens.'),
    'Textos de opinião costumam ter: problema, opinião (〜と思う / 〜べきだ), argumento (なぜなら〜から) e conclusão.', [
    ['manaa', 'マナー', 'manaa', 'etiqueta, boas maneiras', '', ['電車の中のマナーを守りましょう。', 'densha no naka no manaa o mamorimashou.', 'Vamos respeitar a etiqueta dentro do trem.']],
    ['tsuuwa', '通話', 'tsuuwa', 'ligação telefônica (falar)', '', ['車内での通話はご遠慮ください。', 'shanai de no tsuuwa wa goenryo kudasai.', 'Evite falar ao telefone dentro do vagão.']],
    ['mawari', '周り', 'mawari', 'ao redor, as pessoas em volta', '周りの人 = as pessoas ao redor.', ['周りの人に気をつけてください。', 'mawari no hito ni ki o tsukete kudasai.', 'Tome cuidado com as pessoas ao redor.']],
    ['iken', '意見', 'iken', 'opinião', '', ['私の意見は少し違います。', 'watashi no iken wa sukoshi chigaimasu.', 'Minha opinião é um pouco diferente.']],
    ['nazenara', 'なぜなら', 'naze nara', 'porque (no início da frase)', 'なぜなら〜からだ.', ['なぜなら、時間がないからだ。', 'naze nara, jikan ga nai kara da.', 'Porque não há tempo.']],
    ['hitsuyou', '必要', 'hitsuyou', 'necessário', '', ['ルールを変える必要がある。', 'ruuru o kaeru hitsuyou ga aru.', 'É necessário mudar a regra.']]
  ], [
    ['大切なのは、周りの人への思いやりだ。', 'taisetsu na no wa, mawari no hito e no omoiyari da.', 'O importante é a consideração pelas pessoas ao redor.']
  ], [
    X.s('Qual é a regra atual nos trens, segundo o texto?', ['Não falar ao telefone', 'Não usar o celular de jeito nenhum', 'Não comer'], '通話はしない.'),
    X.s('Qual é a opinião do autor?', ['A regra é boa, mas o problema é o volume de voz em geral', 'O celular deveria ser proibido', 'Não deveria haver regras'], '問題は声の大きさ.'),
    X.s('Por que o autor acha que mensagens não incomodam?', ['Porque não fazem barulho', 'Porque são rápidas', 'Porque são proibidas'], '音が出ないから.'),
    X.s('O que é mais importante para o autor?', ['A consideração pelos outros', 'Regras rígidas', 'Multas'], '思いやり.')
  ], { textTitle: 'Carta ao jornal', text: T([
    ['日本の電車では、携帯電話で通話をしないのがマナーだ。', 'nihon no densha de wa, keitai denwa de tsuuwa o shinai no ga manaa da.', 'Nos trens japoneses, a etiqueta é não falar ao celular.'],
    ['私はこのルールに賛成だ。なぜなら、狭い車内での電話の声は、周りの人にとってうるさいからだ。', 'watashi wa kono ruuru ni sansei da. naze nara, semai shanai de no denwa no koe wa, mawari no hito ni totte urusai kara da.', 'Concordo com essa regra. Porque a voz ao telefone num vagão apertado incomoda as pessoas em volta.'],
    ['一方で、メールやゲームは音が出ないので、問題ないと思う。', 'ippou de, meeru ya geemu wa oto ga denai node, mondai nai to omou.', 'Por outro lado, mensagens e jogos não fazem barulho, então acho que não há problema.'],
    ['しかし、本当の問題は電話ではなく、声の大きさではないだろうか。', 'shikashi, hontou no mondai wa denwa de wa naku, koe no ookisa de wa nai darou ka.', 'Porém, o verdadeiro problema não seria o volume da voz, e não o telefone?'],
    ['友達同士の大声の会話も、同じくらい迷惑だからだ。', 'tomodachi doushi no oogoe no kaiwa mo, onaji kurai meiwaku da kara da.', 'Porque conversas em voz alta entre amigos incomodam do mesmo jeito.'],
    ['ルールを増やす必要はない。大切なのは、一人一人の思いやりだと思う。', 'ruuru o fuyasu hitsuyou wa nai. taisetsu na no wa, hitori hitori no omoiyari da to omou.', 'Não é preciso aumentar as regras. Acho que o importante é a consideração de cada um.']
  ]) }),
  L('c22l10', 'Conto: o gato que voltou', '話', 'vocab', howTo('Um conto curto sobre uma família que perde o gato e recebe ajuda dos vizinhos.'),
    'Narrativas usam o passado simples (た), ている para cenas, e expressões de tempo para ligar os acontecimentos: ある日, 次の日, 三日後.', [
    ['aruhi', 'ある日', 'aru hi', 'certo dia', 'Início típico de histórias.', ['ある日、不思議な手紙が届いた。', 'aru hi, fushigi na tegami ga todoita.', 'Certo dia, chegou uma carta misteriosa.']],
    ['sagasu', '探す', 'sagasu', 'procurar', '', ['なくした鍵を探している。', 'nakushita kagi o sagashite iru.', 'Estou procurando a chave que perdi.']],
    ['harigami', '貼り紙', 'harigami', 'cartaz colado (aviso)', '', ['店の前に貼り紙があった。', 'mise no mae ni harigami ga atta.', 'Havia um aviso colado na frente da loja.']],
    ['gokinjosan', 'ご近所さん', 'gokinjosan', 'vizinhos (afetuoso)', '', ['ご近所さんに野菜をもらった。', 'gokinjosan ni yasai o moratta.', 'Ganhei legumes dos vizinhos.']],
    ['mitsukaru', '見つかる', 'mitsukaru', 'ser encontrado', '見つける = encontrar (transitivo).', ['財布が見つかってよかった。', 'saifu ga mitsukatte yokatta.', 'Que bom que a carteira foi encontrada.']],
    ['dakishimeru', '抱きしめる', 'dakishimeru', 'abraçar forte', '', ['母は娘を抱きしめた。', 'haha wa musume o dakishimeta.', 'A mãe abraçou a filha.']]
  ], [
    ['三日後、近所の人から電話がかかってきた。', 'mikka go, kinjo no hito kara denwa ga kakatte kita.', 'Três dias depois, um vizinho ligou.']
  ], [
    X.s('Como o gato desapareceu?', ['Saiu por uma janela aberta', 'Foi levado por alguém', 'Fugiu no carro'], '窓が開いていた.'),
    X.s('O que a família fez para encontrá-lo?', ['Colou cartazes pelo bairro', 'Chamou a polícia', 'Pôs anúncio na TV'], '町中に貼り紙をした.'),
    X.s('Onde o gato estava?', ['No depósito de uma senhora vizinha', 'Na escola', 'No parque'], 'おばあさんの物置.'),
    X.s('O que a família aprendeu?', ['Que os vizinhos são importantes', 'Que gatos não gostam de casa', 'Que é melhor ter cachorro'], 'ご近所さんの大切さ.')
  ], { textTitle: 'O gato que voltou', text: T([
    ['ある日、うちの猫のミケがいなくなった。', 'aru hi, uchi no neko no mike ga inaku natta.', 'Certo dia, nossa gata Mike desapareceu.'],
    ['台所の窓が少し開いていたのだ。', 'daidokoro no mado ga sukoshi aite ita no da.', 'A janela da cozinha estava um pouco aberta.'],
    ['家族みんなで一日中探したが、どこにも見つからなかった。', 'kazoku minna de ichinichijuu sagashita ga, doko ni mo mitsukaranakatta.', 'A família toda procurou o dia inteiro, mas não a encontrou em lugar nenhum.'],
    ['次の日、私たちは写真付きの貼り紙を作って、町中に貼った。', 'tsugi no hi, watashitachi wa shashintsuki no harigami o tsukutte, machijuu ni hatta.', 'No dia seguinte, fizemos cartazes com foto e colamos pela cidade toda.'],
    ['三日後、二軒となりのおばあさんから電話があった。「うちの物置で猫が寝ていますよ。」', 'mikka go, niken tonari no obaasan kara denwa ga atta. "uchi no monooki de neko ga nete imasu yo."', 'Três dias depois, a senhora que mora duas casas ao lado ligou: “Tem uma gata dormindo no meu depósito.”'],
    ['急いで行くと、ミケは毛布の上で気持ちよさそうに眠っていた。', 'isoide iku to, mike wa moufu no ue de kimochi yosasou ni nemutte ita.', 'Corremos até lá, e a Mike dormia toda confortável em cima de um cobertor.'],
    ['妹はミケを抱きしめて泣いた。ご近所さんの大切さを知った出来事だった。', 'imouto wa mike o dakishimete naita. gokinjosan no taisetsusa o shitta dekigoto datta.', 'Minha irmã abraçou a Mike e chorou. Foi um acontecimento que nos ensinou o valor dos vizinhos.']
  ]) })
  );
})();
