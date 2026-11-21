/* ==========================================================
   Nihongo Quest 8.0 — LIVING JAPANESE WORLD (dados)
   Hikari-machi: uma pequena cidade com lugares, personagens e situações.
   Para acrescentar um lugar novo: um item em WORLD_PLACES, personagens em WORLD_CHARS,
   palavras em WORLD_WORDS e cenas em WORLD_SCENES (place: id do lugar). Nada mais muda.

   Formato das cenas (nós):
     n:   narração em português
     s:   fala de personagem 'id|japonês (/ separa partes)|romaji|português|leitura opcional' (ou lista de falas)
     tip: nota cultural / explicação curta
     t:   palavras ensinadas aqui (chaves de WORLD_WORDS)
     o:   escolhas do aluno [['japonês|romaji|português', tag, próximo nó, nota], ...]
          tag: g = natural, k = funciona (com nota), x = mal-entendido (reação e tenta de novo)
     p:   escolha por escuta { say, q, items: [['jp|romaji|pt', certo(1/0), nota, visual]], go, miss }
     b:   desvio { done: cena, y, n } (o personagem lembra de você quando a cena já foi feita)
     go:  próximo nó (botão Continuar)   back: 1 volta para a última escolha   end: texto final
   ========================================================== */
const WORLD_PLACES = [
  { id: 'konbini', jp: 'コンビニ', ro: 'konbini', pt: 'Loja de conveniência', name: 'Hikari Mart', color: '#22946a', icon: 'コ', host: 'sato',
    desc: 'Aberta 24 horas: bebidas, bentôs, onigiris e atendentes que falam rápido.' },
  { id: 'resutoran', jp: 'レストラン', ro: 'resutoran', pt: 'Restaurante', name: 'Sakura Shokudō', color: '#d2463c', icon: 'レ', host: 'kenji',
    desc: 'Um restaurante de bairro com ramen, oyakodon e um chef barulhento.' },
  { id: 'eki', jp: '駅', ro: 'eki', pt: 'Estação', name: 'Estação Hikari', color: '#3553d1', icon: '駅', host: 'tanaka',
    desc: 'Plataformas, bilhetes, avisos no alto-falante e passageiros de todo tipo.' },
  { id: 'gakkou', jp: '学校', ro: 'gakkō', pt: 'Escola', name: 'Escola Hikari', color: '#7b52e0', icon: '学', host: 'yumi',
    desc: 'Colegas, professores, aulas e a hora mais esperada: o almoço.' },
  { id: 'machi', jp: '街', ro: 'machi', pt: 'Cidade', name: 'Rua comercial', color: '#e0861e', icon: '街', host: 'takeshi',
    desc: 'Ruas, lojinhas de roupa, farmácia, o posto policial, um templo e surpresas a cada esquina.' }
];

/* personagens: chat = usa o retrato do Nihongo Chat; look = retrato próprio */
const WORLD_CHARS = {
  sato: { name: 'Satō-san', jp: '佐藤さん', role: 'Atendente do konbini', place: 'konbini', pitch: 1.25,
    bio: 'Universitária que trabalha meio período. Animada, fala rápido e no educado “japonês de loja”.', likes: 'Nikuman no inverno e mangá de terror.', style: 'Educado de loja (keigo)',
    greet: ['いらっしゃいませ！|irasshaimase!|Bem-vindo(a)!', 'あ、また来てくれましたね！|a, mata kite kuremashita ne!|Ah, você voltou!'],
    look: { bg: '#22946a', skin: '#ffe2cc', hair: '#6b3b1f', style: 'pony', top: '#3fc48f', acc: 'visor' } },
  mori: { name: 'Mori (gerente)', jp: '森店長', role: 'Gerente do konbini', place: 'konbini', pitch: 0.72,
    bio: 'Calmo, gentil e viciado em trocadilhos de tiozão.', likes: 'Piadas ruins e café em lata.', style: 'Educado, às vezes brincalhão',
    look: { bg: '#1b6e50', skin: '#f5d2b5', hair: '#8a8a8a', style: 'side', top: '#3fc48f', acc: 'glasses' } },
  kenji: { name: 'Kenji', jp: '健二', role: 'Garçom', place: 'resutoran', pitch: 0.95,
    bio: 'Garçom novato, educadíssimo e um pouco atrapalhado.', likes: 'Oyakodon e jogos de celular.', style: 'Educado de atendimento (keigo)',
    greet: ['いらっしゃいませ。|irasshaimase.|Bem-vindo(a).', 'あ、いつもありがとうございます！|a, itsumo arigatō gozaimasu!|Ah, obrigado por sempre vir!'],
    look: { bg: '#d2463c', skin: '#ffe2cc', hair: '#22224a', style: 'short', top: '#ffffff', acc: 'apron' } },
  taisho: { name: 'Gorō (o chef)', jp: '大将', role: 'Dono e cozinheiro', place: 'resutoran', pitch: 0.65,
    bio: 'Voz alta, coração enorme. Fala de forma informal e calorosa com todo mundo.', likes: 'Ver clientes saindo de barriga cheia.', style: 'Informal e caloroso',
    look: { bg: '#a3302a', skin: '#f2c9a5', hair: '#2b2b2b', style: 'bald', top: '#ffffff', acc: 'headband' } },
  tanaka: { name: 'Tanaka-san', jp: '田中さん', role: 'Funcionário da estação', place: 'eki', pitch: 0.8,
    bio: 'Sério, pontual e muito paciente. Usa o keigo mais formal da cidade.', likes: 'Trens que chegam no horário exato.', style: 'Keigo formal',
    greet: ['いらっしゃいませ。|irasshaimase.|Bem-vindo(a).', 'またのご利用、ありがとうございます。|mata no go-riyō, arigatō gozaimasu.|Obrigado por usar a estação de novo.'],
    look: { bg: '#3553d1', skin: '#ffe2cc', hair: '#22224a', style: 'short', top: '#1f3a8a', acc: 'cap' } },
  haruko: { name: 'Haruko-san', jp: '春子さん', role: 'Passageira', place: 'eki', pitch: 1.15,
    bio: 'Senhora de Osaka, falante e generosa. Sempre tem balas na bolsa.', likes: 'Conversar com desconhecidos e oferecer doces.', style: 'Dialeto de Osaka (Kansai-ben)',
    look: { bg: '#c7569a', skin: '#f5d2b5', hair: '#b9b9c9', style: 'bun', top: '#e58fc0', acc: 'none' } },
  ann: { name: 'Alto-falante', jp: '放送', role: 'Avisos da estação', place: 'eki', pitch: 1.1, bio: 'A voz calma que anuncia os trens.', style: 'Formal', speaker: true },
  aiko: { chat: 'aiko', name: 'Aiko-sensei', jp: '愛子先生', role: 'Professora', place: 'gakkou', pitch: 1.05,
    bio: 'A professora do Nihongo Chat. Paciente e educada, adora ver alunos se arriscando.', likes: 'Chá verde e alunos curiosos.', style: 'Educado (desu/masu)' },
  yumi: { chat: 'yumi', name: 'Yumi', jp: 'ゆみ', role: 'Colega de classe', place: 'gakkou', pitch: 1.3,
    bio: 'Sua colega de classe do Nihongo Chat. Simpática, fã de anime.', likes: 'Anime, karaokê e doces.', style: 'Casual (entre colegas)',
    greet: ['あ、おはよう！|a, ohayō!|Ah, bom dia!', 'また会えたね！今日も一緒に頑張ろう！|mata aeta ne! kyō mo issho ni ganbarō!|Que bom te ver! Vamos nos esforçar juntos hoje!'] },
  shota: { name: 'Shōta', jp: '翔太', role: 'Colega de classe', place: 'gakkou', pitch: 0.9,
    bio: 'Do clube de futebol. Barulhento, engraçado e sempre com fome.', likes: 'Futebol, ramen e dormir na aula.', style: 'Bem casual',
    look: { bg: '#7b52e0', skin: '#f2c9a5', hair: '#3b2a20', style: 'spiky', top: '#22224a', acc: 'none' } },
  takeshi: { chat: 'takeshi', name: 'Takeshi', jp: 'たけし', role: 'Dono da quitanda', place: 'machi', pitch: 0.75,
    bio: 'O comerciante do Nihongo Chat. Aqui você visita a quitanda dele.', likes: 'Frutas da estação e dar brindes.', style: 'Educado e animado de comerciante',
    greet: ['いらっしゃい！今日も安いよ！|irasshai! kyō mo yasui yo!|Bem-vindo! Hoje também tá barato!', 'お、また来たね！いつもありがとう！|o, mata kita ne! itsumo arigatō!|Opa, voltou! Obrigado sempre!'] },
  ren: { chat: 'ren', name: 'Ren', jp: 'レン', role: 'Seu amigo', place: 'machi', pitch: 0.85,
    bio: 'Seu amigo próximo do Nihongo Chat. Fala bem casual e vive com fome.', likes: 'Games, comida de rua e música.', style: 'Muito casual' },
  yamada: { name: 'Yamada-san', jp: '山田さん', role: 'Policial do kōban', place: 'machi', pitch: 0.85,
    bio: 'Policial do posto de bairro. Conhece cada rua e ajuda todo mundo.', likes: 'Bicicleta e mapas desenhados à mão.', style: 'Educado e claro',
    look: { bg: '#2c4a7a', skin: '#ffe2cc', hair: '#22224a', style: 'short', top: '#2c4a7a', acc: 'police' } },
  mei: { name: 'Mei', jp: 'めい', role: 'Menina do bairro', place: 'machi', pitch: 1.45,
    bio: 'Tem 7 anos e uma gata chamada Miruku.', likes: 'Gatos, laços e balas de morango.', style: 'Fala de criança, casual',
    look: { bg: '#f08aa8', skin: '#ffe2cc', hair: '#4a2a1a', style: 'twin', top: '#ffd877', acc: 'none' } },
  tourist: { name: 'Turista', jp: '観光客', role: 'Turista japonês', place: 'machi', pitch: 1.0, bio: 'Visitando Hikari-machi nas férias.', style: 'Educado',
    look: { bg: '#2fa3b8', skin: '#ffe2cc', hair: '#22224a', style: 'short', top: '#ffb347', acc: 'hat' } },
  oji: { name: 'Seu Kaneda', jp: '金田さん', role: 'Dono da loja de ferragens', place: 'machi', pitch: 0.7, bio: 'Rabugento por fora, gentil por dentro.', style: 'Casual de bairro',
    look: { bg: '#6b6b7a', skin: '#f2c9a5', hair: '#cfcfcf', style: 'side', top: '#556b2f', acc: 'none' } },
  imo: { name: 'Vendedor de batata-doce', jp: '焼き芋屋さん', role: 'Vendedor ambulante', place: 'machi', pitch: 0.7, bio: 'Passa cantando no outono e no inverno.', style: 'Casual e animado',
    look: { bg: '#a0522d', skin: '#f2c9a5', hair: '#2b2b2b', style: 'bald', top: '#4a4a8a', acc: 'headband' } },
  oldman: { name: 'Senhor de chapéu', jp: 'おじいさん', role: 'Morador', place: 'machi', pitch: 0.65, bio: 'Passeia pela rua comercial todas as tardes.', style: 'Educado',
    look: { bg: '#5a7a5a', skin: '#f5d2b5', hair: '#e0e0e0', style: 'side', top: '#8a6a4a', acc: 'hat' } },
  aoi: { name: 'Aoi-san', jp: '葵さん', role: 'Vendedora da loja de roupas', place: 'machi', pitch: 1.2,
    bio: 'Trabalha na lojinha de roupas da rua comercial. Sempre sabe qual cor combina com você.', likes: 'Moda de rua e cachecóis.', style: 'Educado de loja',
    look: { bg: '#3fa7a0', skin: '#ffe2cc', hair: '#3a2418', style: 'bun', top: '#f2c14e', acc: 'none' } },
  kobayashi: { name: 'Kobayashi-san', jp: '小林さん', role: 'Farmacêutica', place: 'machi', pitch: 1.0,
    bio: 'Farmacêutica do bairro. Calma, explica tudo devagar.', likes: 'Chá de gengibre e plantas.', style: 'Educado e claro',
    look: { bg: '#4f8a6a', skin: '#f5d2b5', hair: '#22224a', style: 'side', top: '#ffffff', acc: 'glasses' } }
};
/* palavras do mundo: 'escrita|kana|romaji|português|explicação simples|e (expressão)' */
const WORLD_WORDS = {
  kore: 'これ|これ|kore|isto (perto de mim)|Use apontando para algo perto de você.',
  kudasai: 'ください|ください|kudasai|por favor, me dê|Vai depois do que você quer: “kore, kudasai” = isto, por favor.|e',
  ikura: 'いくら|いくら|ikura|quanto (custa)?|“Ikura desu ka?” = quanto custa?',
  fukuro: '袋|ふくろ|fukuro|sacola|Cuidado: “fukurō” (com o longo) é coruja!',
  daijoubu: '大丈夫です|だいじょうぶです|daijōbu desu|está tudo bem / não precisa|Serve para recusar algo com educação.|e',
  okane: 'お金|おかね|okane|dinheiro|',
  bentou: 'お弁当|おべんとう|obentō|marmita, bentô|',
  atatame: '温めますか|あたためますか|atatamemasu ka|quer que esquente?|Pergunta clássica do caixa do konbini.|e',
  ohashi: 'お箸|おはし|ohashi|hashi (palitinhos)|',
  onigiri: 'おにぎり|おにぎり|onigiri|bolinho de arroz|',
  doko: 'どこ|どこ|doko|onde|“~ wa doko desu ka?” = onde fica ~?',
  achira: 'あちら|あちら|achira|ali, por ali (educado)|Forma educada de “ali”.',
  moichido: 'もう一度|もういちど|mō ichido|mais uma vez|“Mō ichido onegai shimasu” = pode repetir, por favor?|e',
  pointcard: 'ポイントカード|ポイントカード|pointo kādo|cartão de pontos|',
  osusume: 'おすすめ|おすすめ|osusume|recomendação|',
  nanmeisama: '何名様|なんめいさま|nanmei-sama|quantas pessoas? (educado)|Pergunta ao entrar em restaurantes.|e',
  hitori: '一人|ひとり|hitori|uma pessoa / sozinho|Duas pessoas: futari.',
  douzo: 'どうぞ|どうぞ|dōzo|por favor, fique à vontade / pode pegar|Usado ao oferecer algo ou dar passagem.|e',
  chuumon: 'ご注文|ごちゅうもん|go-chūmon|o pedido|',
  hitotsu: '一つ|ひとつ|hitotsu|um (objeto)|Para contar coisas: hitotsu, futatsu, mittsu...',
  mizu: 'お水|おみず|omizu|água|',
  nani: '何|なに・なん|nani / nan|o quê|“Kore wa nan desu ka?” = o que é isto?',
  toriniku: '鶏肉|とりにく|toriniku|carne de frango|',
  tamago: '卵|たまご|tamago|ovo|',
  nishimasu: '〜にします|〜にします|~ ni shimasu|vou querer ~ / escolho ~|“Kore ni shimasu” = vou querer este.|e',
  omoshiroi: 'おもしろい|おもしろい|omoshiroi|interessante, divertido|',
  okaikei: 'お会計|おかいけい|okaikei|a conta|“Okaikei onegai shimasu” = a conta, por favor.',
  gochisousama: 'ごちそうさまでした|ごちそうさまでした|gochisōsama deshita|obrigado pela refeição|Dito depois de comer.|e',
  wasuremono: '忘れ物|わすれもの|wasuremono|objeto esquecido|',
  ikitai: '行きたいです|いきたいです|ikitai desu|quero ir|“Tōkyō ni ikitai desu” = quero ir a Tóquio.|e',
  bansen: '〜番線|〜ばんせん|~ bansen|plataforma número ~|Sanbansen = plataforma 3.',
  kippu: '切符|きっぷ|kippu|bilhete, passagem|',
  made: 'まで|まで|made|até|“Shibuya made” = até Shibuya.',
  mamonaku: 'まもなく|まもなく|mamonaku|em instantes|Muito comum nos avisos de trem.',
  densha: '電車|でんしゃ|densha|trem|',
  tomarimasu: '止まりますか|とまりますか|tomarimasu ka|(o trem) para em...?|“Shibuya ni tomarimasu ka?” = para em Shibuya?|e',
  dokokara: 'どこから|どこから|doko kara|de onde|',
  ame: '飴|あめ|ame|bala, docinho|Tem o mesmo som de 雨 (chuva)! O contexto mostra qual é.',
  jikoshoukai: '自己紹介|じこしょうかい|jiko shōkai|apresentação pessoal|',
  hajimemashite: 'はじめまして|はじめまして|hajimemashite|muito prazer (primeira vez)|Só na primeira vez que conhece alguém.|e',
  yoroshiku: 'よろしくお願いします|よろしくおねがいします|yoroshiku onegai shimasu|conto com você / prazer em conhecer|Fecha quase toda apresentação.|e',
  suki: '好き|すき|suki|gostar (de algo)|“Anime ga suki desu” = gosto de anime.',
  keshigomu: '消しゴム|けしゴム|keshigomu|borracha (de apagar)|',
  arimasuka: 'ありますか|ありますか|arimasu ka|tem? (coisas)|“Keshigomu, arimasu ka?” = você tem borracha?|e',
  kyoukasho: '教科書|きょうかしょ|kyōkasho|livro didático|',
  tsugi: '次|つぎ|tsugi|próximo|',
  jugyou: '授業|じゅぎょう|jugyō|aula|',
  issho: '一緒に|いっしょに|issho ni|juntos|',
  massugu: 'まっすぐ|まっすぐ|massugu|reto, em frente|',
  migi: '右|みぎ|migi|direita|',
  hidari: '左|ひだり|hidari|esquerda|',
  yasui: '安い|やすい|yasui|barato|',
  mittsu: '三つ|みっつ|mittsu|três (objetos)|',
  omake: 'おまけ|おまけ|omake|brinde, um extra de presente|',
  atsui: '熱い|あつい|atsui|quente (ao tocar ou comer)|“Atsu!” = ai, que quente!',
  oishii: 'おいしい|おいしい|oishii|gostoso, delicioso|',
  neko: '猫|ねこ|neko|gato|',
  shiroi: '白い|しろい|shiroi|branco|',
  mitsuketa: '見つけた|みつけた|mitsuketa|achei, encontrei|',
  shashin: '写真|しゃしん|shashin|foto|',
  kasa: '傘|かさ|kasa|guarda-chuva|',
  yakiimo: '焼き芋|やきいも|yakiimo|batata-doce assada|',
  nanji: '何時|なんじ|nanji|que horas|“Ima nanji desu ka?” = que horas são?',
  fuku: '服|ふく|fuku|roupa|',
  shichaku: '試着してもいいですか|しちゃくしてもいいですか|shichaku shite mo ii desu ka|posso provar (a roupa)?|“Shichaku” = provar roupa. No provador, tire os sapatos.|e',
  chiisai: '小さい|ちいさい|chiisai|pequeno|',
  ookii: '大きい|おおきい|ōkii|grande|',
  iro: '色|いろ|iro|cor|',
  atama: '頭|あたま|atama|cabeça|Cuidado: “atama ga ii” = ser inteligente.',
  itai: '痛い|いたい|itai|dói, dolorido|“Atama ga itai” = estou com dor de cabeça.',
  netsu: '熱|ねつ|netsu|febre|“Netsu ga aru” = estar com febre.',
  kusuri: '薬|くすり|kusuri|remédio|Remédio se “bebe”: kusuri o nomu.',
  doubutsuen: '動物園|どうぶつえん|dōbutsuen|zoológico|',
  zou: '象|ぞう|zō|elefante|',
  kawaii: 'かわいい|かわいい|kawaii|fofo, bonitinho|',
  tanoshii: '楽しい|たのしい|tanoshii|divertido|No passado: tanoshikatta (foi divertido).',
  otera: 'お寺|おてら|otera|templo budista|',
  shizuka: '静か|しずか|shizuka|silencioso, tranquilo|'
};
const WORLD_SCENES = [
  /* ================= コンビニ ================= */
  { id: 'k1', place: 'konbini', kind: 'missao', title: 'Comprar chá e um lanche', desc: 'Peça algo apontando e responda sobre a sacola.', chars: ['sato'], words: ['kore', 'kudasai', 'ikura', 'fukuro', 'daijoubu', 'okane'], nodes: {
    a: { n: 'Você entra na Hikari Mart. A porta faz “pin-pon” e alguém fala lá do fundo.', s: 'sato|いらっしゃいませ！|irasshaimase!|Bem-vindo(a)!', tip: 'Nas lojas japonesas, os atendentes dizem “irasshaimase” a todo cliente que entra. Não precisa responder: um aceno basta.', go: 'b' },
    b: { n: 'Você põe um chá no balcão. Ao lado do caixa, uma vitrine quentinha mostra frango frito (karaage). Dá vontade...', s: 'sato|お茶が/一点。|ocha ga itten.|Um chá.', t: ['kore', 'kudasai'], o: [
      ['これ、/ください。|kore, kudasai.|Isto, por favor. (apontando o karaage)', 'g', 'c'],
      ['すみません、/これ、/ください。|sumimasen, kore, kudasai.|Com licença, isto, por favor.', 'g', 'c'],
      ['ありがとう。|arigatō.|Obrigado(a).', 'x', 'bx', 'Você agradeceu, mas ainda não pediu nada! Para pedir apontando, use “kore, kudasai”.']] },
    bx: { s: 'sato|はい？/えっと…/どういたしまして？|hai? etto… dō itashimashite?|Hã? É... de nada?', n: 'Satō-san sorri, meio confusa.', back: 1 },
    c: { s: 'sato|唐揚げですね。/かしこまりました。|karaage desu ne. kashikomarimashita.|Karaage, né? Certo!|からあげですね。かしこまりました。', t: ['ikura'], o: [
      ['いくらですか？|ikura desu ka?|Quanto custa?', 'g', 'd'],
      ['…|…|(Esperar em silêncio)', 'k', 'd2', 'Ela disse o preço sozinha. Mas “ikura desu ka?” é muito útil em feiras e lojinhas.']] },
    d: { s: 'sato|全部で/350円です。|zenbu de sanbyaku gojū en desu.|Ao todo, 350 ienes.|ぜんぶで、さんびゃくごじゅうえんです。', go: 'f' },
    d2: { s: 'sato|お会計、/350円です。|okaikei, sanbyaku gojū en desu.|A conta dá 350 ienes.|おかいけい、さんびゃくごじゅうえんです。', go: 'f' },
    f: { s: 'sato|袋は/ご利用ですか？|fukuro wa go-riyō desu ka?|Vai usar sacola?|ふくろは、ごりようですか？', tip: 'Desde 2020 as sacolas plásticas são pagas no Japão (custam uns 3 a 5 ienes). Por isso sempre perguntam.', t: ['fukuro', 'daijoubu'], o: [
      ['はい、/お願いします。|hai, onegai shimasu.|Sim, por favor.', 'g', 'g1'],
      ['いいえ、/大丈夫です。|iie, daijōbu desu.|Não, tudo bem (não precisa).', 'g', 'g2'],
      ['ふくろう？|fukurō?|Coruja?', 'x', 'fx', '“Fukurō” (com o “o” longo) é coruja! Sacola é “fukuro”, curtinho.']] },
    fx: { s: 'sato|ふくろう？/…ふふっ、/ふくろ、/袋です！|fukurō? …fufu, fukuro, fukuro desu!|Coruja? ...hehe, sacola, “fukuro”!', n: 'Ela mostra uma sacolinha, rindo.', back: 1 },
    g1: { s: 'sato|袋代、/3円/いただきます。|fukuro-dai, san en itadakimasu.|São 3 ienes pela sacola.|ふくろだい、さんえんいただきます。', go: 'h' },
    g2: { s: 'sato|かしこまりました。|kashikomarimashita.|Entendido.', go: 'h' },
    h: { n: 'Você entrega o dinheiro. Satō-san conta e devolve o troco.', t: ['okane'], s: 'sato|ありがとうございました！/またお越しくださいませ！|arigatō gozaimashita! mata okoshi kudasaimase!|Muito obrigada! Volte sempre!', end: 'Você comprou chá e karaage sozinho(a)! Missão cumprida.' }
  } },
  { id: 'k2', place: 'konbini', kind: 'missao', title: 'Esquentar o bentô', desc: 'Entenda as perguntas do caixa na hora do almoço.', need: ['k1'], chars: ['sato'], words: ['bentou', 'atatame', 'ohashi'], nodes: {
    a: { n: 'Hora do almoço. Você pega uma marmita de frango e vai ao caixa.', s: 'sato|あ、/いらっしゃいませ！/お弁当ですね。|a, irasshaimase! obentō desu ne.|Ah, bem-vindo(a)! Um bentô, né?|あ、いらっしゃいませ！おべんとうですね。', t: ['bentou'], go: 'b' },
    b: { s: 'sato|温めますか？|atatamemasu ka?|Quer que eu esquente?|あたためますか？', t: ['atatame'], o: [
      ['はい、/お願いします。|hai, onegai shimasu.|Sim, por favor.', 'g', 'c'],
      ['いいえ、/大丈夫です。|iie, daijōbu desu.|Não, tudo bem.', 'k', 'bn', 'Resposta correta! Só que agora seu almoço vai ser gelado...'],
      ['あたたかい…ですか？|atatakai… desu ka?|Quente... é?', 'x', 'bx', 'Quase! “Atatakai” é quente; “atatamemasu ka?” é “quer que eu esquente?”. Responda com “hai” ou “iie”.']] },
    bx: { s: 'sato|はい、/電子レンジで/温めます。/いかがですか？|hai, denshi renji de atatamemasu. ikaga desu ka?|Isso, eu esquento no micro-ondas. Que tal?|はい、でんしレンジであたためます。いかがですか？', back: 1 },
    bn: { s: 'sato|はい、/そのままで。|hai, sono mama de.|Certo, do jeito que está.', n: 'Você recebe o bentô geladinho. Arroz frio no inverno... coragem!', go: 'd' },
    c: { s: 'sato|少々/お待ちください。|shōshō omachi kudasai.|Aguarde um momento, por favor.|しょうしょう、おまちください。', n: 'O micro-ondas apita: pi pi pi! O cheiro de frango invade a loja.', go: 'd' },
    d: { s: 'sato|お箸は/おつけしますか？|ohashi wa otsuke shimasu ka?|Quer que eu coloque hashi?|おはしは、おつけしますか？', t: ['ohashi'], o: [
      ['はい、/一つ/お願いします。|hai, hitotsu onegai shimasu.|Sim, um par, por favor.', 'g', 'e'],
      ['はい、/お願いします。|hai, onegai shimasu.|Sim, por favor.', 'g', 'e'],
      ['いいえ。|iie.|Não.', 'k', 'd2', 'Tudo certo na gramática... mas como você vai comer?']] },
    d2: { s: 'sato|え、/お箸、/いりませんか？/…手で？|e, ohashi, irimasen ka? …te de?|Ué, não quer hashi? ...Vai comer com a mão?|え、おはし、いりませんか？てで？', n: 'Ela parece preocupada de verdade. Você ri e aceita o hashi.', go: 'e' },
    e: { s: 'sato|ありがとうございました！/またどうぞ！|arigatō gozaimashita! mata dōzo!|Obrigada! Volte sempre!', end: 'Bentô e hashi na mão. Agora você entende as perguntas mais comuns do caixa!' }
  } },
  { id: 'k3', place: 'konbini', kind: 'missao', title: 'O onigiri do Ren', desc: 'Pergunte onde fica um produto e ache o certo só ouvindo.', need: ['k1'], chars: ['sato', 'ren'], words: ['onigiri', 'doko', 'achira'], nodes: {
    a: { n: 'Seu celular vibra. É uma mensagem de voz do Ren.', s: 'ren|コンビニ？/ツナマヨの/おにぎり、/買ってきて！|konbini? tsuna mayo no onigiri, katte kite!|Tá no konbini? Me traz um onigiri de atum com maionese!', t: ['onigiri'], go: 'b' },
    b: { n: 'Você não acha os onigiris. Melhor perguntar.', t: ['doko'], o: [
      ['すみません、/おにぎりは/どこですか？|sumimasen, onigiri wa doko desu ka?|Com licença, onde ficam os onigiris?', 'g', 'c'],
      ['おにぎり、/どこ？|onigiri, doko?|Onigiri, onde?', 'k', 'c', 'Funciona, mas soa bem informal com uma atendente. “Sumimasen... doko desu ka?” é mais educado.'],
      ['おにぎりは/だれですか？|onigiri wa dare desu ka?|Quem é o onigiri?', 'x', 'bx', '“Dare” é “quem”. Para lugares, use “doko” (onde).']] },
    bx: { s: 'sato|だれ…？/おにぎりさんは/人じゃないですよ！|dare…? onigiri-san wa hito ja nai desu yo!|Quem...? O senhor Onigiri não é uma pessoa!', back: 1 },
    c: { s: 'sato|おにぎりは/あちらです。/入口の/近くです。|onigiri wa achira desu. iriguchi no chikaku desu.|Os onigiris ficam ali. Perto da entrada.|おにぎりは、あちらです。いりぐちの、ちかくです。', t: ['achira'], go: 'd' },
    d: { n: 'Na prateleira há vários onigiris com rótulos em japonês. Ouça o que o Ren pediu e escolha.', p: { say: 'ren|ツナマヨ！|tsuna mayo!|Atum com maionese!', q: 'Qual é o onigiri de ツナマヨ (tsuna mayo)?', items: [['梅|ume|ameixa em conserva', 0], ['ツナマヨ|tsuna mayo|atum com maionese', 1], ['鮭|sake|salmão', 0], ['昆布|konbu|alga konbu', 0]], go: 'e', miss: 'Esse não é. Ouça de novo: “tsu-na ma-yo”.' } },
    e: { n: 'Achou! Você paga e manda uma foto para o Ren.', s: 'ren|それそれ！/サンキュー！/今度/おごるね。|sore sore! sankyū! kondo ogoru ne.|Esse mesmo! Valeu! Da próxima eu pago, tá?', end: 'Você perguntou onde ficava um produto e achou o certo. Missão cumprida!' }
  } },
  { id: 'k4', place: 'konbini', kind: 'historia', title: 'Satō-san lembra de você', desc: 'Uma pergunta rápida demais... e o gerente com suas piadas.', need: ['k2'], chars: ['sato', 'mori'], words: ['moichido', 'pointcard', 'osusume'], nodes: {
    a: { b: { done: 'k4', y: 'r', n: 'a1' } },
    a1: { n: 'Satō-san reconhece você de longe.', s: 'sato|あ！/また来てくれたんですね！|a! mata kite kureta n desu ne!|Ah! Você voltou!', go: 'b' },
    r: { s: 'sato|あ、/常連さん！/いつも/ありがとうございます！|a, jōren-san! itsumo arigatō gozaimasu!|Ah, nosso cliente fiel! Obrigada sempre!|あ、じょうれんさん！いつもありがとうございます！', tip: '“Jōren-san” é o cliente que sempre volta. Ser chamado assim é um carinho.', go: 'b' },
    b: { n: 'Você põe um suco no balcão. Ela pergunta algo bem rápido.', s: 'sato|ポイントカードは/お持ちですか？|pointo kādo wa omochi desu ka?|Você tem cartão de pontos?|ポイントカードは、おもちですか？', t: ['moichido'], o: [
      ['もう一度/お願いします。|mō ichido onegai shimasu.|Mais uma vez, por favor.', 'g', 'c'],
      ['ゆっくり/お願いします。|yukkuri onegai shimasu.|Mais devagar, por favor.', 'g', 'c'],
      ['はい！|hai!|Sim!', 'x', 'bx', 'Você disse “sim” sem entender... e agora ela espera um cartão! Quando não entender, peça “mō ichido onegai shimasu”.']] },
    bx: { s: 'sato|では、/カードを/どうぞ。|dewa, kādo o dōzo.|Então, pode me passar o cartão.', n: 'Ela estende a mão... e espera. Você procura na carteira um cartão que não existe. Silêncio constrangedor.', back: 1 },
    c: { s: 'sato|ポイント/カード、/です。/持っていますか？|pointo kādo desu. motte imasu ka?|Cartão... de pontos. Você tem?|ポイントカード、です。もっていますか？', t: ['pointcard'], o: [
      ['いいえ、/ありません。|iie, arimasen.|Não, não tenho.', 'g', 'd'],
      ['いいえ、/大丈夫です。|iie, daijōbu desu.|Não, tudo bem.', 'g', 'd']] },
    d: { s: 'sato|そうですか。/あ、/今日の/おすすめは/肉まんですよ！/ふわふわです！|sō desu ka. a, kyō no osusume wa nikuman desu yo! fuwafuwa desu!|Entendi. Ah, a recomendação de hoje é o nikuman! Tá fofinho!|そうですか。あ、きょうのおすすめは、にくまんですよ！ふわふわです！', t: ['osusume'], tip: 'Nikuman é um pãozinho cozido no vapor, recheado de carne. No inverno, todo konbini tem uma vitrine deles.', o: [
      ['じゃあ、/一つ/ください！|jā, hitotsu kudasai!|Então, um, por favor!', 'g', 'e'],
      ['今日は/大丈夫です。|kyō wa daijōbu desu.|Hoje não, obrigado(a).', 'g', 'e2']] },
    e: { n: 'O gerente Mori aparece do estoque, esfregando as mãos.', s: 'mori|寒いですね。/布団が/ふっとんだ！/…なんちゃって。|samui desu ne. futon ga futtonda! …nanchatte.|Que frio, né? O futon voou longe! ...brincadeirinha.|さむいですね。ふとんが、ふっとんだ！なんちゃって。', go: 'e3' },
    e2: { s: 'sato|はーい！/またどうぞ！|hāi! mata dōzo!|Tá bom! Volte sempre!', end: 'Você pediu para repetir e entendeu a pergunta do cartão de pontos. Isso salva qualquer conversa!' },
    e3: { s: 'sato|店長…/お客さんが/困ってますよ。|tenchō… okyaku-san ga komatte masu yo.|Gerente... o cliente está sem graça.|てんちょう、おきゃくさんが、こまってますよ。', tip: 'Mori fez uma “oyaji gag”, a típica piada de tiozão: “futon ga futtonda” (o futon voou). Japoneses costumam responder com um riso amarelo.', end: 'Pediu para repetir, ganhou uma recomendação e ouviu uma piada de tiozão. Satō-san já é sua conhecida!' }
  } },

  /* ================= レストラン ================= */
  { id: 'r1', place: 'resutoran', kind: 'missao', title: 'Pedir uma mesa', desc: 'Diga quantas pessoas são e entenda o garçom.', chars: ['kenji', 'taisho'], words: ['nanmeisama', 'hitori', 'douzo'], nodes: {
    a: { n: 'Você entra no Sakura Shokudō. Cheiro de caldo de shoyu.', s: 'taisho|へい、/らっしゃい！|hei, rasshai!|Opa, bem-vindo!', tip: '“Rasshai” é a forma curtinha e animada de “irasshaimase”, comum em restaurantes tradicionais.', go: 'b' },
    b: { s: 'kenji|いらっしゃいませ。/何名様ですか？|irasshaimase. nanmei-sama desu ka?|Bem-vindo(a). Quantas pessoas?|いらっしゃいませ。なんめいさまですか？', t: ['nanmeisama', 'hitori'], o: [
      ['一人です。|hitori desu.|Uma pessoa (só eu).', 'g', 'c'],
      ['（指を一本立てる）|(yubi o ippon tateru)|(Mostrar um dedo)', 'k', 'c', 'Mostrar um dedo funciona! Mas “hitori desu” é fácil e muito usado.'],
      ['一つです。|hitotsu desu.|Um (objeto).', 'x', 'bx', '“Hitotsu” conta objetos. Para pessoas: “hitori” (1 pessoa), “futari” (2 pessoas).']] },
    bx: { s: 'kenji|ひとつ…？/えっと、/お一人様/ですね？|hitotsu…? etto, o-hitori-sama desu ne?|Um...? Hã, uma pessoa, certo?|ひとつ？えっと、おひとりさまですね？', n: 'Kenji entende, mas segura o riso.', back: 1 },
    c: { s: 'kenji|お一人様ですね。/こちらへ/どうぞ。|o-hitori-sama desu ne. kochira e dōzo.|Uma pessoa. Por aqui, por favor.|おひとりさまですね。こちらへどうぞ。', t: ['douzo'], go: 'd' },
    d: { n: 'Kenji traz um copo de água gelada e uma toalhinha úmida.', s: 'kenji|お水と/おしぼりです。/メニューは/こちらです。|omizu to oshibori desu. menyū wa kochira desu.|Água e toalhinha. O cardápio está aqui.|おみずと、おしぼりです。メニューは、こちらです。', tip: 'No Japão, a água (e muitas vezes chá) é de graça. A “oshibori” é para limpar as mãos antes de comer.', o: [
      ['ありがとうございます。|arigatō gozaimasu.|Obrigado(a).', 'g', 'e'],
      ['どうも。|dōmo.|Valeu / Obrigado(a).', 'g', 'e']] },
    e: { s: 'kenji|ご注文が/決まりましたら、/お呼びください。|go-chūmon ga kimarimashitara, oyobi kudasai.|Quando decidir o pedido, é só chamar.|ごちゅうもんがきまりましたら、およびください。', end: 'Você conseguiu uma mesa e entendeu tudo sem precisar ler. Próximo passo: fazer o pedido!' }
  } },
  { id: 'r2', place: 'resutoran', kind: 'missao', title: 'Fazer o pedido', desc: 'Chame o garçom e peça ramen e bebida.', need: ['r1'], chars: ['kenji', 'taisho'], words: ['chuumon', 'hitotsu', 'mizu'], nodes: {
    a: { n: 'Na parede há fotos de ramen, gyoza e karaage. Para chamar o garçom, levante a mão e...', o: [
      ['すみません！|sumimasen!|Com licença! (chamando)', 'g', 'b'],
      ['ウェイター！|weitā!|Garçom!', 'x', 'ax', 'No Japão ninguém chama “weitā”. Levante a mão e diga “sumimasen!”.']] },
    ax: { s: 'kenji|…？|…?|...?', n: 'Kenji olha para os lados, sem saber se é com ele.', back: 1 },
    b: { s: 'kenji|はい、/ご注文は/お決まりですか？|hai, go-chūmon wa okimari desu ka?|Pois não, já decidiu o pedido?|はい、ごちゅうもんは、おきまりですか？', t: ['chuumon', 'hitotsu'], o: [
      ['ラーメンを/一つ/お願いします。|rāmen o hitotsu onegai shimasu.|Um ramen, por favor.', 'g', 'c'],
      ['ラーメン、/ください。|rāmen, kudasai.|Ramen, por favor.', 'k', 'c', 'Funciona! Com “hitotsu” fica ainda mais claro quantos você quer.'],
      ['ラーメンを/十/お願いします。|rāmen o jū onegai shimasu.|Dez ramens, por favor.', 'x', 'bx', '“Jū” é dez! Para pedir um, diga “hitotsu”.']] },
    bx: { s: ['kenji|じゅ、/十杯/ですか？！/大将！/ラーメン十杯！|ju, juppai desu ka?! taishō! rāmen juppai!|D-dez tigelas?! Chefe! Dez ramens!|じゅ、じゅっぱいですか？たいしょう！ラーメンじゅっぱい！', 'taisho|おう！/今日は/祭りか？！|ō! kyō wa matsuri ka?!|Opa! Hoje tem festa?!|おう！きょうは、まつりか？'], n: 'O restaurante inteiro olha para você. Corrija rápido!', back: 1 },
    c: { s: 'kenji|ラーメン/お一つですね。/お飲み物は/いかがですか？|rāmen ohitotsu desu ne. onomimono wa ikaga desu ka?|Um ramen. E para beber?|ラーメン、おひとつですね。おのみものは、いかがですか？', t: ['mizu'], o: [
      ['お水で/大丈夫です。|omizu de daijōbu desu.|Água está ótimo.', 'g', 'd'],
      ['ウーロン茶を/ください。|ūroncha o kudasai.|Um chá oolong, por favor.', 'g', 'd'],
      ['オレンジジュースを/ください。|orenji jūsu o kudasai.|Um suco de laranja, por favor.', 'g', 'd']] },
    d: { s: ['kenji|かしこまりました。/少々/お待ちください。|kashikomarimashita. shōshō omachi kudasai.|Entendido. Aguarde um momento.|かしこまりました。しょうしょう、おまちください。', 'taisho|へい、/お待ち！/熱いうちに/どうぞ！|hei, omachi! atsui uchi ni dōzo!|Tá na mesa! Come enquanto tá quente!|へい、おまち！あついうちにどうぞ！'], tip: 'Fazer barulho ao sugar o macarrão é normal (e até elogio) no Japão.', end: 'Pedido feito do jeito certo. E ninguém precisou de dez tigelas!' }
  } },
  { id: 'r3', place: 'resutoran', kind: 'missao', title: 'O que é este prato?', desc: 'Pergunte sobre um prato desconhecido e escolha.', need: ['r1'], chars: ['kenji', 'taisho'], words: ['nani', 'toriniku', 'tamago', 'nishimasu'], nodes: {
    a: { n: 'Hoje o cardápio tem um prato que você não conhece: 親子丼.', s: 'kenji|いらっしゃいませ！/あ、/この前の/お客様ですね。|irasshaimase! a, kono mae no okyakusama desu ne.|Bem-vindo(a)! Ah, você veio da outra vez, né?|いらっしゃいませ！あ、このまえのおきゃくさまですね。', t: ['nani'], o: [
      ['すみません、/これは/何ですか？|sumimasen, kore wa nan desu ka?|Com licença, o que é isto?', 'g', 'b'],
      ['これは/どこですか？|kore wa doko desu ka?|Onde é isto?', 'x', 'ax', '“Doko” é onde. Para perguntar “o quê”, use “nan desu ka?”.']] },
    ax: { s: 'kenji|どこ…？/えっと、/ここは/さくら食堂です。|doko…? etto, koko wa sakura shokudō desu.|Onde...? Hã, aqui é o Sakura Shokudō.|どこ？えっと、ここは、さくらしょくどうです。', back: 1 },
    b: { s: 'kenji|親子丼です。/鶏肉と/卵の/どんぶりです。|oyakodon desu. toriniku to tamago no donburi desu.|É oyakodon. Uma tigela de frango com ovo.|おやこどんです。とりにくと、たまごの、どんぶりです。', t: ['toriniku', 'tamago'], go: 'c' },
    c: { s: 'taisho|「親子」は/親と子ども。/鶏が親で、/卵が子どもだ！|“oyako” wa oya to kodomo. tori ga oya de, tamago ga kodomo da!|“Oyako” quer dizer pai e filho. A galinha é a mãe e o ovo é o filho!|おやこは、おやとこども。とりがおやで、たまごがこどもだ！', tip: 'Curiosidade real: “oyakodon” (tigela de pai e filho) tem esse nome porque junta frango e ovo no mesmo prato.', t: ['omoshiroi'], o: [
      ['おもしろいですね！|omoshiroi desu ne!|Que interessante!', 'g', 'd'],
      ['ええ？！/かわいそう…|ē?! kawaisō…|Ehh?! Que dó...', 'g', 'd']] },
    d: { s: 'taisho|はっはっは！/でも/うまいぞ！|ha ha ha! demo umai zo!|Hahaha! Mas é uma delícia!', t: ['nishimasu'], o: [
      ['じゃあ、/これに/します。|jā, kore ni shimasu.|Então, vou querer este.', 'g', 'e'],
      ['じゃあ、/ラーメンに/します。|jā, rāmen ni shimasu.|Então, vou de ramen.', 'g', 'e2']] },
    e: { s: 'kenji|親子丼、/お一つですね！|oyakodon, ohitotsu desu ne!|Um oyakodon, certo!|おやこどん、おひとつですね！', end: 'Você perguntou o que era um prato, entendeu a resposta e escolheu. Isso é viver o japonês!' },
    e2: { s: 'taisho|ラーメンか！/まあ、/それも/うまいぞ！|rāmen ka! mā, sore mo umai zo!|Ramen, é? Bom, esse também é ótimo!', end: 'Você perguntou o que era um prato, entendeu a resposta e escolheu. Isso é viver o japonês!' }
  } },
  { id: 'r4', place: 'resutoran', kind: 'historia', title: 'A conta e a gorjeta', desc: 'Peça a conta, agradeça... e descubra o que acontece com o troco.', need: ['r2'], chars: ['kenji', 'taisho'], words: ['okaikei', 'gochisousama', 'wasuremono'], nodes: {
    a: { n: 'Você terminou de comer. Hora de pagar.', t: ['okaikei'], o: [
      ['すみません、/お会計/お願いします。|sumimasen, okaikei onegai shimasu.|Com licença, a conta, por favor.', 'g', 'b'],
      ['すみません、/お金/ください。|sumimasen, okane kudasai.|Com licença, me dê dinheiro.', 'x', 'ax', 'Você pediu dinheiro ao garçom! A conta é “okaikei”.']] },
    ax: { s: 'kenji|え？！/お金…/ですか？/ぼくも/ほしいです…|e?! okane… desu ka? boku mo hoshii desu…|Hã?! Dinheiro...? Eu também queria...|え？おかね、ですか？ぼくも、ほしいです。', back: 1 },
    b: { s: 'kenji|はい、/レジで/お願いします。/980円です。|hai, reji de onegai shimasu. kyūhyaku hachijū en desu.|Certo, no caixa, por favor. São 980 ienes.|はい、レジでおねがいします。きゅうひゃくはちじゅうえんです。', n: 'Você paga com uma nota de mil ienes. Sobram 20 ienes de troco.', o: [
      ['おつりは/いいです。|otsuri wa ii desu.|Pode ficar com o troco.', 'g', 'c'],
      ['ありがとうございます。|arigatō gozaimasu.|Obrigado(a).', 'g', 'd']] },
    c: { n: 'Você deixa o troco no balcão e sai. Logo depois, alguém vem correndo pela rua...', s: 'kenji|お客様！/お客様！/忘れ物です！|okyakusama! okyakusama! wasuremono desu!|Senhor(a)! Senhor(a)! Esqueceu uma coisa!|おきゃくさま！おきゃくさま！わすれものです！', t: ['wasuremono'], tip: 'No Japão não existe gorjeta. Se você deixar dinheiro, é bem provável que alguém corra atrás de você para devolver!', go: 'c2' },
    c2: { s: 'kenji|はぁ、/はぁ…/20円です！|hā, hā… nijū en desu!|Ufa, ufa... seus 20 ienes!|はあ、はあ。にじゅうえんです！', n: 'Kenji devolve as moedas, ofegante e sorrindo.', go: 'd' },
    d: { t: ['gochisousama'], o: [
      ['ごちそうさまでした！|gochisōsama deshita!|Obrigado(a) pela refeição!', 'g', 'e'],
      ['いただきます！|itadakimasu!|Bom apetite! (antes de comer)', 'x', 'dx', '“Itadakimasu” é dito ANTES de comer. Depois, diga “gochisōsama deshita”.']] },
    dx: { s: 'taisho|おいおい、/これから/また/食べるのか？！|oi oi, kore kara mata taberu no ka?!|Ei, ei, vai comer tudo de novo?!', back: 1 },
    e: { s: 'taisho|まいど！/また来いよ！|maido! mata koi yo!|Valeu! Volta, hein!', tip: '“Maido” (literalmente “toda vez”) é um obrigado caloroso de comerciante.', end: 'Conta paga e um “gochisōsama” perfeito. O Sakura Shokudō já te conhece!' }
  } },

  /* ================= 駅 ================= */
  { id: 'e1', place: 'eki', kind: 'missao', title: 'Qual é a plataforma?', desc: 'Diga para onde quer ir e ache a plataforma ouvindo.', chars: ['tanaka'], words: ['ikitai', 'bansen'], nodes: {
    a: { n: 'A estação Hikari está cheia. Você precisa ir a Tóquio. No guichê, um funcionário de uniforme azul.', s: 'tanaka|いらっしゃいませ。/どうなさいましたか？|irasshaimase. dō nasaimashita ka?|Bem-vindo(a). Em que posso ajudar?', t: ['ikitai'], o: [
      ['すみません、/東京に/行きたいです。|sumimasen, tōkyō ni ikitai desu.|Com licença, quero ir para Tóquio.', 'g', 'b'],
      ['東京、/どこ？|tōkyō, doko?|Tóquio, onde?', 'k', 'b', 'Ele entendeu, mas com funcionários é melhor completar: “Tōkyō ni ikitai desu”.']] },
    b: { s: 'tanaka|東京ですね。/3番線から/どうぞ。|tōkyō desu ne. sanbansen kara dōzo.|Tóquio. Pegue o trem na plataforma 3.|とうきょうですね。さんばんせんから、どうぞ。', t: ['bansen'], go: 'c' },
    c: { n: 'Você olha as placas das plataformas. Qual ele disse?', p: { say: 'tanaka|3番線です。|sanbansen desu.|Plataforma 3.|さんばんせんです。', q: 'Ouça: qual é a plataforma?', items: [['1番線|ichibansen|plataforma 1', 0], ['2番線|nibansen|plataforma 2', 0], ['3番線|sanbansen|plataforma 3', 1], ['4番線|yonbansen|plataforma 4', 0]], go: 'd', miss: 'Não é essa. Ouça de novo: “san-ban-sen”.' } },
    d: { o: [['ありがとうございます！|arigatō gozaimasu!|Muito obrigado(a)!', 'g', 'e']] },
    e: { s: 'tanaka|お気をつけて/いってらっしゃいませ。|oki o tsukete itterasshaimase.|Boa viagem, vá com cuidado.|おきをつけて、いってらっしゃいませ。', end: 'Você pediu informação e achou a plataforma certa só ouvindo!' }
  } },
  { id: 'e2', place: 'eki', kind: 'missao', title: 'Comprar a passagem', desc: 'Peça um bilhete até um destino e entenda o preço.', need: ['e1'], chars: ['tanaka'], words: ['kippu', 'made'], nodes: {
    a: { n: 'Você quer ir até Shibuya. As máquinas de bilhete estão todas em japonês, então você volta ao guichê.', t: ['kippu', 'made'], o: [
      ['渋谷までの/切符を/ください。|shibuya made no kippu o kudasai.|Um bilhete até Shibuya, por favor.', 'g', 'b'],
      ['渋谷まで、/いくらですか？|shibuya made, ikura desu ka?|Quanto custa até Shibuya?', 'g', 'b'],
      ['きっぷ？/きっぷ！|kippu? kippu!|Bilhete? Bilhete!', 'k', 'b', 'Uma palavra só já ajuda, mas dizer o destino com “made” (até) deixa tudo claro.']] },
    b: { s: 'tanaka|渋谷までですね。/片道/200円です。|shibuya made desu ne. katamichi nihyaku en desu.|Até Shibuya. Só ida, 200 ienes.|しぶやまでですね。かたみち、にひゃくえんです。', go: 'c' },
    c: { p: { say: 'tanaka|200円です。|nihyaku en desu.|São 200 ienes.|にひゃくえんです。', q: 'Quanto ele disse? Escolha o valor certo.', items: [['100円|hyaku en|100 ienes', 0], ['200円|nihyaku en|200 ienes', 1], ['300円|sanbyaku en|300 ienes', 0], ['2000円|nisen en|2000 ienes', 0, 'Isso é “nisen” (dois mil). Ele disse “ni-hya-ku”.']], go: 'd', miss: 'Ouça de novo: “ni-hya-ku en”.' } },
    d: { s: 'tanaka|はい、/切符です。/改札は/あちらです。|hai, kippu desu. kaisatsu wa achira desu.|Aqui está o bilhete. A catraca é ali.|はい、きっぷです。かいさつは、あちらです。', tip: 'Muita gente usa cartões recarregáveis (como Suica e PASMO): é só encostar na catraca, sem comprar bilhete toda vez.', end: 'Bilhete comprado! Você usou “made” (até) para dizer o destino.' }
  } },
  { id: 'e3', place: 'eki', kind: 'missao', title: 'O aviso na plataforma', desc: 'Entenda um aviso do alto-falante e confirme o trem.', need: ['e1'], chars: ['ann', 'haruko'], words: ['mamonaku', 'densha', 'tomarimasu'], nodes: {
    a: { n: 'Você está na plataforma. Uma musiquinha toca e uma voz anuncia:', s: 'ann|まもなく、/3番線に/電車が/参ります。/黄色い線の/内側まで/お下がりください。|mamonaku, sanbansen ni densha ga mairimasu. kiiroi sen no uchigawa made osagari kudasai.|Em instantes, um trem chegará à plataforma 3. Fique atrás da linha amarela, por favor.|まもなく、さんばんせんに、でんしゃがまいります。きいろいせんの、うちがわまで、おさがりください。', t: ['mamonaku', 'densha'], go: 'b' },
    b: { p: { q: 'O que o aviso disse?', items: [['O trem está atrasado 10 minutos.', 0], ['Um trem vai chegar em instantes. Fique atrás da linha amarela.', 1], ['A plataforma 3 está fechada hoje.', 0]], go: 'c', miss: 'Dica: “mamonaku” = em instantes; “densha ga mairimasu” = o trem está chegando.' } },
    c: { n: 'O trem chega. Você quer ir a Shibuya, mas não sabe se ele para lá. Ao seu lado, uma senhora com sacolas de compras.', t: ['tomarimasu'], o: [
      ['すみません、/この電車は/渋谷に/止まりますか？|sumimasen, kono densha wa shibuya ni tomarimasu ka?|Com licença, este trem para em Shibuya?', 'g', 'd'],
      ['渋谷？|shibuya?|Shibuya?', 'k', 'd', 'Ela entendeu pelo contexto! A pergunta completa é “Shibuya ni tomarimasu ka?”.']] },
    d: { s: 'haruko|止まるよ、/止まる！/三つ目やで。|tomaru yo, tomaru! mittsume ya de.|Para sim, para! É a terceira estação.|とまるよ、とまる！みっつめやで。', tip: 'A senhora fala o dialeto de Osaka (Kansai-ben): “ya de” no lugar de “da yo”. Você vai ouvir muitos sotaques no Japão!', o: [
      ['ありがとうございます！|arigatō gozaimasu!|Muito obrigado(a)!', 'g', 'f'],
      ['どうも！|dōmo!|Valeu!', 'g', 'f']] },
    f: { s: 'haruko|ええよ、/ええよ。/気ぃつけてな。|ē yo, ē yo. kī tsukete na.|Imagina, imagina. Vai com cuidado, viu?|ええよ、ええよ。きいつけてな。', end: 'Você entendeu um aviso de estação e confirmou o trem. Nível: passageiro experiente!' }
  } },
  { id: 'e4', place: 'eki', kind: 'historia', title: 'Haruko-san e a bala', desc: 'A senhora de Osaka quer saber de onde você veio.', need: ['e3'], chars: ['haruko'], words: ['dokokara', 'ame'], nodes: {
    a: { b: { done: 'e4', y: 'r', n: 'a1' } },
    a1: { n: 'No banco da plataforma, a senhora do outro dia acena para você.', s: 'haruko|あら、/この前の子やん！/こっち/座り。|ara, kono mae no ko yan! kotchi suwari.|Olha só, é você do outro dia! Senta aqui.|あら、このまえのこやん！こっちすわり。', go: 'b' },
    r: { s: 'haruko|また会うたね！/元気にしてた？|mata ōta ne! genki ni shiteta?|Nos encontramos de novo! Tudo bem com você?|またおうたね！げんきにしてた？', go: 'b' },
    b: { s: 'haruko|どこから/来たん？|doko kara kitan?|De onde você veio?|どこからきたん？', t: ['dokokara'], o: [
      ['ブラジルから/来ました。|burajiru kara kimashita.|Vim do Brasil.', 'g', 'c'],
      ['ブラジルです。|burajiru desu.|Brasil.', 'g', 'c'],
      ['駅から/来ました。|eki kara kimashita.|Vim da estação.', 'x', 'bx', 'Tecnicamente verdade, haha! Mas ela quer saber o seu país.']] },
    bx: { s: 'haruko|駅？！/あはは、/そら/そうやけど！/国の/話やで。|eki?! ahaha, sora sō yakedo! kuni no hanashi ya de.|Da estação?! Hahaha, isso é verdade! Tô falando do seu país.|えき？あはは、そらそうやけど！くにのはなしやで。', back: 1 },
    c: { s: 'haruko|まあ、/ブラジル！/遠いところから/よう来たねえ。/飴ちゃん、/食べる？|mā, burajiru! tōi tokoro kara yō kita nē. ame-chan, taberu?|Nossa, Brasil! Veio de tão longe! Quer uma balinha?|まあ、ブラジル！とおいところから、ようきたねえ。あめちゃん、たべる？', t: ['ame'], tip: 'Em Osaka, senhoras costumam andar com balas na bolsa e chamá-las carinhosamente de “ame-chan”.', o: [
      ['はい、/ありがとうございます！|hai, arigatō gozaimasu!|Sim, obrigado(a)!', 'g', 'd'],
      ['雨？/今日は/晴れですよ。|ame? kyō wa hare desu yo.|Chuva? Hoje está sol.', 'x', 'cx', '“Ame” pode ser 雨 (chuva) ou 飴 (bala)! O contexto (e a mão estendida com um docinho) mostra que é bala.']] },
    cx: { s: 'haruko|ちゃうちゃう！/雨やなくて、/飴！/あ・め・ちゃん！|chau chau! ame ya nakute, ame! a-me-chan!|Não, não! Não é chuva, é bala! A-me-chan!|ちゃうちゃう！あめやなくて、あめ！あめちゃん！', n: 'Ela balança um docinho de morango na sua frente, rindo.', back: 1 },
    d: { n: 'A bala é de morango. O trem chega.', s: 'haruko|ほな、/またね！/日本語、/上手やで！|hona, mata ne! nihongo, jōzu ya de!|Bom, até mais! Seu japonês é ótimo!|ほな、またね！にほんご、じょうずやで！', end: 'Você contou de onde veio e descobriu que “ame” pode ser chuva ou bala. Haruko-san não vai te esquecer!' }
  } },

  /* ================= 学校 ================= */
  { id: 'g1', place: 'gakkou', kind: 'missao', title: 'Apresentação na classe', desc: 'Primeiro dia: apresente-se para a turma.', chars: ['aiko', 'shota'], words: ['jikoshoukai', 'hajimemashite', 'yoroshiku'], nodes: {
    a: { n: 'Primeiro dia na Escola Hikari. A professora Aiko te leva até a frente da sala.', s: 'aiko|皆さん、/今日から/新しい/クラスメートです。/自己紹介を/お願いします。|minasan, kyō kara atarashii kurasumēto desu. jiko shōkai o onegai shimasu.|Pessoal, a partir de hoje temos um(a) colega novo(a). Apresente-se, por favor.|みなさん、きょうから、あたらしいクラスメートです。じこしょうかいを、おねがいします。', t: ['jikoshoukai'], go: 'b' },
    b: { n: 'Trinta alunos olham para você. Respire fundo.', t: ['hajimemashite'], o: [
      ['はじめまして。|hajimemashite.|Muito prazer.', 'g', 'c'],
      ['おはようございます。|ohayō gozaimasu.|Bom dia.', 'k', 'c', 'Também é educado! Mas para se apresentar, comece com “hajimemashite”.'],
      ['さようなら。|sayōnara.|Adeus.', 'x', 'bx', 'Você acabou de chegar e já está se despedindo!']] },
    bx: { s: 'shota|え、/もう/帰るの？！|e, mō kaeru no?!|Ué, já vai embora?!|え、もうかえるの？', n: 'A sala inteira ri. A professora sorri e faz sinal para você tentar de novo.', back: 1 },
    c: { o: [['{name}です。|{name} desu.|Eu sou {name}.', 'g', 'd']] },
    d: { t: ['yoroshiku'], o: [
      ['よろしくお願いします。|yoroshiku onegai shimasu.|Conto com vocês.', 'g', 'e'],
      ['いただきます。|itadakimasu.|Bom apetite.', 'x', 'dx', '“Itadakimasu” é antes de comer! Para fechar uma apresentação, diga “yoroshiku onegai shimasu”.']] },
    dx: { s: 'shota|お腹/すいてるの？/おれも！|onaka suiteru no? ore mo!|Tá com fome? Eu também!|おなかすいてるの？おれも！', back: 1 },
    e: { n: 'Palmas pela sala!', s: 'aiko|はい、/ありがとう。/じゃあ、/ゆみさんの/となりに/座ってください。|hai, arigatō. jā, Yumi-san no tonari ni suwatte kudasai.|Muito bem, obrigada. Sente-se ao lado da Yumi, por favor.|はい、ありがとう。じゃあ、ゆみさんのとなりに、すわってください。', tip: '“Yoroshiku onegai shimasu” não tem tradução exata: é um “conto com você, vamos nos dar bem”. Fecha quase toda apresentação.', end: 'Você se apresentou para a classe inteira em japonês. Que coragem!' }
  } },
  { id: 'g2', place: 'gakkou', kind: 'missao', title: 'Conhecer a Yumi e o Shōta', desc: 'Converse com colegas sobre o que vocês gostam.', need: ['g1'], chars: ['yumi', 'shota'], words: ['suki', 'omoshiroi'], nodes: {
    a: { s: 'yumi|はじめまして、/ゆみです。/よろしくね。|hajimemashite, Yumi desu. yoroshiku ne.|Prazer, sou a Yumi. Vamos nos dar bem!', tip: 'Entre colegas da mesma idade, fala-se de forma casual: “yoroshiku ne” em vez de “yoroshiku onegai shimasu”.', go: 'b' },
    b: { s: 'yumi|ねえ、/何が/好き？|nē, nani ga suki?|Ei, do que você gosta?|ねえ、なにがすき？', t: ['suki'], o: [
      ['アニメが/好きです。|anime ga suki desu.|Gosto de anime.', 'g', 'c1'],
      ['サッカーが/好きです。|sakkā ga suki desu.|Gosto de futebol.', 'g', 'c2'],
      ['ラーメンが/好きです。|rāmen ga suki desu.|Gosto de ramen.', 'g', 'c3']] },
    c1: { s: 'yumi|本当？！/私も！/今度、/おすすめ/教えてね！|hontō?! watashi mo! kondo, osusume oshiete ne!|Sério?! Eu também! Depois me indica alguns, tá?|ほんとう？わたしも！こんど、おすすめおしえてね！', go: 'd' },
    c2: { s: 'shota|サッカー？！/おれ、/サッカー部！/一緒に/やろうぜ！|sakkā?! ore, sakkā-bu! issho ni yarō ze!|Futebol?! Eu sou do clube de futebol! Bora jogar junto!|サッカー？おれ、サッカーぶ！いっしょにやろうぜ！', tip: '“Bukatsu” são os clubes escolares (esporte, música, arte...). São parte enorme da vida escolar no Japão.', go: 'd' },
    c3: { s: 'shota|ラーメン！/わかる！/おれは/毎日/食べたい！|rāmen! wakaru! ore wa mainichi tabetai!|Ramen! Entendo total! Eu comeria todo dia!|ラーメン！わかる！おれは、まいにちたべたい！', go: 'd' },
    d: { s: 'shota|おれ、/翔太。/よろしく！/日本の/学校、/どう？|ore, Shōta. yoroshiku! nihon no gakkō, dō?|Eu sou o Shōta. Prazer! E aí, o que tá achando da escola japonesa?|おれ、しょうた。よろしく！にほんのがっこう、どう？', t: ['omoshiroi'], o: [
      ['おもしろいです！|omoshiroi desu!|É legal / interessante!', 'g', 'e'],
      ['ちょっと/むずかしいです。|chotto muzukashii desu.|É um pouco difícil.', 'g', 'e2']] },
    e: { s: 'yumi|よかった！/これから/よろしくね！|yokatta! kore kara yoroshiku ne!|Que bom! Conto com você daqui pra frente!', end: 'Você fez dois amigos: Yumi e Shōta. Dizer do que gosta abre qualquer conversa!' },
    e2: { s: 'yumi|大丈夫！/私たちが/手伝うよ。|daijōbu! watashitachi ga tetsudau yo.|Relaxa! A gente te ajuda.|だいじょうぶ！わたしたちが、てつだうよ。', end: 'Você fez dois amigos: Yumi e Shōta. Dizer do que gosta abre qualquer conversa!' }
  } },
  { id: 'g3', place: 'gakkou', kind: 'missao', title: 'Cadê a borracha?', desc: 'Peça algo emprestado e entenda a professora.', need: ['g1'], chars: ['yumi', 'aiko'], words: ['keshigomu', 'arimasuka', 'kyoukasho'], nodes: {
    a: { n: 'Aula de japonês. Você errou um kanji e... cadê sua borracha?', t: ['keshigomu', 'arimasuka'], o: [
      ['ゆみさん、/消しゴム、/ありますか？|Yumi-san, keshigomu, arimasu ka?|Yumi, você tem borracha?', 'g', 'b'],
      ['ゆみさん、/消しゴム！|Yumi-san, keshigomu!|Yumi, borracha!', 'k', 'b', 'Ela entendeu! Com “arimasu ka?” (tem?) fica uma pergunta completa.'],
      ['ゆみさん、/ケチゴム？|Yumi-san, kechigomu?|Yumi, “borracha pão-dura”?', 'x', 'ax', '“Kechi” quer dizer pão-duro! A palavra é “keshigomu”.']] },
    ax: { s: 'yumi|ケチ…？！/わ、/私、/ケチじゃないよ！|kechi…?! wa, watashi, kechi ja nai yo!|Pão-dura...?! E-eu não sou pão-dura!|ケチ？わ、わたし、ケチじゃないよ！', back: 1 },
    b: { s: 'yumi|あるよ。/はい、/どうぞ。|aru yo. hai, dōzo.|Tenho sim. Aqui, toma.', n: 'Ela te empresta uma borracha em formato de gatinho.', go: 'c' },
    c: { s: 'aiko|では、/教科書の/25ページを/開いてください。|dewa, kyōkasho no nijūgo pēji o hiraite kudasai.|Bem, abram o livro na página 25.|では、きょうかしょの、にじゅうごページを、ひらいてください。', t: ['kyoukasho'], go: 'd' },
    d: { p: { say: 'aiko|教科書を/出してください。|kyōkasho o dashite kudasai.|Peguem o livro didático.|きょうかしょを、だしてください。', q: 'O que a professora pediu para pegar?', items: [['鉛筆|enpitsu|lápis', 0], ['お弁当|obentō|marmita', 0, 'Ainda não é hora do almoço! Ouça de novo: “kyō-ka-sho”.'], ['教科書|kyōkasho|livro didático', 1], ['消しゴム|keshigomu|borracha', 0]], go: 'e', miss: 'Não é isso. Ouça de novo: “kyō-ka-sho”.' } },
    e: { s: 'aiko|はい、/よくできました。|hai, yoku dekimashita.|Muito bem.', end: 'Você pediu algo emprestado e entendeu a professora. Sobrevivência escolar: aprovada!' }
  } },
  { id: 'g4', place: 'gakkou', kind: 'historia', title: 'Hora do almoço', desc: 'Qual é a próxima aula? E o que tem no bentô do Shōta?', need: ['g2'], chars: ['shota', 'yumi'], words: ['tsugi', 'jugyou', 'issho'], nodes: {
    a: { n: 'O sinal toca: kin-kon-kan-kon. No quadro de horários, a próxima aula é 体育 (taiiku: educação física).', s: 'shota|やっと/終わった！/次の/授業、/何だっけ？|yatto owatta! tsugi no jugyō, nan dakke?|Finalmente acabou! Qual é a próxima aula mesmo?|やっとおわった！つぎのじゅぎょう、なんだっけ？', t: ['tsugi', 'jugyou'], o: [
      ['次は/体育です。|tsugi wa taiiku desu.|A próxima é educação física.', 'g', 'b'],
      ['次は/数学です。|tsugi wa sūgaku desu.|A próxima é matemática.', 'x', 'ax', 'Olhe o quadro: a próxima é 体育 (taiiku), educação física.']] },
    ax: { s: 'shota|えー、/数学？/…あ、/違う/違う、/体育だよ！|ē, sūgaku? …a, chigau chigau, taiiku da yo!|Ehh, matemática? ...Ah, não, não, é educação física!|えー、すうがく？あ、ちがうちがう、たいいくだよ！', back: 1 },
    b: { s: 'shota|やった！/でも/その前に/昼ごはん！/一緒に/食べよう！|yatta! demo sono mae ni hirugohan! issho ni tabeyō!|Oba! Mas antes, almoço! Vamos comer juntos!|やった！でも、そのまえに、ひるごはん！いっしょにたべよう！', t: ['issho'], o: [
      ['うん、/一緒に/食べよう！|un, issho ni tabeyō!|Sim, vamos comer juntos!', 'g', 'c'],
      ['はい、/いいですね。|hai, ii desu ne.|Sim, boa ideia.', 'k', 'c', 'Perfeito e educado! Entre amigos, “un, tabeyō!” soa mais próximo.']] },
    c: { n: 'Shōta abre uma marmita gigante. Dentro... só arroz branco, com uma ameixa vermelha no meio.', s: 'yumi|翔太くん、/それ、/ご飯だけ？！|Shōta-kun, sore, gohan dake?!|Shōta, isso aí é só arroz?!|しょうたくん、それ、ごはんだけ？', go: 'd' },
    d: { s: 'shota|日の丸弁当！/日本の/国旗だぜ！/…おかず、/忘れた。|hinomaru bentō! nihon no kokki da ze! …okazu, wasureta.|Bentô Hinomaru! É a bandeira do Japão! ...Esqueci a mistura.|ひのまるべんとう！にほんのこっきだぜ！おかず、わすれた。', tip: '“Hinomaru bentō” é arroz branco com um umeboshi vermelho no centro, como a bandeira do Japão.', o: [
      ['これ、/どうぞ。|kore, dōzo.|Toma, pega isto. (oferecendo comida)', 'g', 'e'],
      ['かわいそう…|kawaisō…|Coitado...', 'g', 'e2']] },
    e: { s: 'shota|まじ？！/ありがとう！/お前、/いいやつだな！|maji?! arigatō! omae, ii yatsu da na!|Sério?! Valeu! Você é gente boa!|まじ？ありがとう！おまえ、いいやつだな！', end: 'Você entendeu o horário e dividiu o almoço. Shōta nunca vai esquecer!' },
    e2: { s: 'yumi|しょうがないなあ。/はい、/卵焼き/一つ/あげる。|shō ga nai nā. hai, tamagoyaki hitotsu ageru.|Não tem jeito... Toma, te dou um omelete.|しょうがないなあ。はい、たまごやき、ひとつあげる。', end: 'Você entendeu o horário e viu a Yumi salvar o almoço do Shōta!' }
  } },

  /* ================= 街 ================= */
  { id: 'm1', place: 'machi', kind: 'missao', title: 'Onde fica a estação?', desc: 'Peça direções no posto policial e entenda o caminho.', chars: ['yamada'], words: ['massugu', 'migi', 'hidari'], nodes: {
    a: { n: 'Você se perdeu na rua comercial. Na esquina há um kōban, a casinha da polícia.', tip: 'O “kōban” é um pequeno posto policial de bairro. Os policiais ajudam muito com direções e objetos perdidos.', t: ['doko'], o: [
      ['すみません、/駅は/どこですか？|sumimasen, eki wa doko desu ka?|Com licença, onde fica a estação?', 'g', 'b'],
      ['駅、/駅！|eki, eki!|Estação, estação!', 'k', 'b', 'Ele entendeu! Mas “eki wa doko desu ka?” é a pergunta completa.']] },
    b: { s: 'yamada|駅ですね。/この道を/まっすぐ/行って、/二つ目の/角を/右です。|eki desu ne. kono michi o massugu itte, futatsume no kado o migi desu.|A estação? Siga reto por esta rua e vire à direita na segunda esquina.|えきですね。このみちを、まっすぐいって、ふたつめのかどを、みぎです。', t: ['massugu', 'migi', 'hidari'], go: 'c' },
    c: { p: { say: 'yamada|まっすぐ/行って、/右です。|massugu itte, migi desu.|Siga reto e vire à direita.|まっすぐいって、みぎです。', q: 'Para onde você deve ir?', items: [['まっすぐ → 左|massugu → hidari|reto e depois à esquerda', 0, '“Hidari” é esquerda. Ele disse “migi” (direita).', 'arrow:L'], ['まっすぐ → 右|massugu → migi|reto e depois à direita', 1, '', 'arrow:R'], ['戻る|modoru|voltar', 0, 'Ele não mandou voltar. Ouça “massugu” (reto).', 'arrow:B']], go: 'd', miss: 'Ouça de novo: “massugu” (reto) ... “migi” (direita).' } },
    d: { o: [['ありがとうございます！|arigatō gozaimasu!|Muito obrigado(a)!', 'g', 'e']] },
    e: { s: 'yamada|いえいえ。/お気をつけて！|ie ie. oki o tsukete!|Imagina. Vá com cuidado!|いえいえ。おきをつけて！', end: 'Você pediu direções e entendeu “massugu” e “migi”. Agora não se perde mais!' }
  } },
  { id: 'm2', place: 'machi', kind: 'missao', title: 'A quitanda do Takeshi', desc: 'Pergunte o preço, entenda a promoção e compre frutas.', chars: ['takeshi'], words: ['yasui', 'mittsu', 'omake'], nodes: {
    a: { n: 'Takeshi, dono da quitanda, acena com uma maçã enorme.', s: 'takeshi|いらっしゃい！/今日は/りんごが/安いよ！|irasshai! kyō wa ringo ga yasui yo!|Bem-vindo! Hoje a maçã está barata!|いらっしゃい！きょうは、りんごがやすいよ！', tip: 'Na quitanda (yaoya), os vendedores chamam os clientes em voz alta. É parte da graça da rua comercial.', t: ['yasui'], o: [
      ['りんごは/いくらですか？|ringo wa ikura desu ka?|Quanto custa a maçã?', 'g', 'c'],
      ['りんご、/ください。|ringo, kudasai.|Maçã, por favor.', 'g', 'c2']] },
    c: { s: 'takeshi|一つ/100円！/三つで/250円！|hitotsu hyaku en! mittsu de nihyaku gojū en!|Uma por 100 ienes! Três por 250!|ひとつ、ひゃくえん！みっつで、にひゃくごじゅうえん！', t: ['mittsu'], go: 'd' },
    c2: { s: 'takeshi|まいど！/一つ/100円、/三つで/250円だよ！|maido! hitotsu hyaku en, mittsu de nihyaku gojū en da yo!|Valeu! Uma sai 100 ienes, três saem 250!|まいど！ひとつひゃくえん、みっつでにひゃくごじゅうえんだよ！', t: ['mittsu'], go: 'd' },
    d: { o: [
      ['じゃあ、/三つ/ください。|jā, mittsu kudasai.|Então, três, por favor.', 'g', 'e'],
      ['一つ/ください。|hitotsu kudasai.|Uma, por favor.', 'g', 'e1'],
      ['三百/ください。|sanbyaku kudasai.|Me dê trezentas.', 'x', 'dx', '“Sanbyaku” é 300 (como em ienes)! Para contar objetos: hitotsu (1), futatsu (2), mittsu (3).']] },
    dx: { s: 'takeshi|三百？！/店の/りんご、/全部でも/足りないよ！|sanbyaku?! mise no ringo, zenbu demo tarinai yo!|Trezentas?! Nem todas as maçãs da loja dão!|さんびゃく？みせのりんご、ぜんぶでもたりないよ！', back: 1 },
    e: { s: 'takeshi|ありがとう！/はい、/おまけ！/みかんも/一つ/どうぞ。|arigatō! hai, omake! mikan mo hitotsu dōzo.|Obrigado! Toma, um brinde! Leva uma tangerina também.', t: ['omake'], tip: '“Omake” é o brinde extra que comerciantes simpáticos dão aos clientes. Em quitandas de bairro, acontece bastante!', end: 'Você perguntou o preço, entendeu a promoção e ainda ganhou um brinde!' },
    e1: { s: 'takeshi|まいど！/100円ね。/…はい、/おまけ！/みかん/一つ/どうぞ。|maido! hyaku en ne. …hai, omake! mikan hitotsu dōzo.|Valeu! 100 ienes. ...E toma um brinde: uma tangerina!|まいど！ひゃくえんね。はい、おまけ！みかんひとつどうぞ。', t: ['omake'], end: 'Você comprou do jeito certo e ainda ganhou um brinde!' }
  } },
  { id: 'm3', place: 'machi', kind: 'historia', title: 'Ren e o takoyaki', desc: 'Conversa casual com um amigo e uma comida quente demais.', need: ['m1'], chars: ['ren'], words: ['atsui', 'oishii'], nodes: {
    a: { n: 'É o Ren, seu amigo, com o uniforme da escola e a fome de sempre.', s: 'ren|よっ！/何してんの？|yo! nani shiten no?|E aí! O que tá fazendo?|よっ！なにしてんの？', tip: 'Ren fala de forma bem casual (“nani shiten no?”), como amigos falam entre si.', o: [
      ['散歩してる。|sanpo shiteru.|Tô dando uma volta.', 'g', 'b'],
      ['こんにちは、/レンさん。|konnichiwa, Ren-san.|Boa tarde, senhor Ren.', 'k', 'b', 'Educado demais para um amigo próximo! Entre amigos, “yo!” ou “ossu!” já basta.']] },
    b: { s: 'ren|じゃあ、/たこ焼き/食べに/行こう！/あそこの/屋台、/めっちゃ/うまいんだ。|jā, takoyaki tabe ni ikō! asoko no yatai, metcha umai n da.|Então bora comer takoyaki! Aquela barraquinha é muito boa.|じゃあ、たこやきたべにいこう！あそこのやたい、めっちゃうまいんだ。', o: [
      ['行こう！|ikō!|Bora!', 'g', 'c'],
      ['たこ焼き？/何？|takoyaki? nani?|Takoyaki? O que é?', 'g', 'b2']] },
    b2: { s: 'ren|タコが/入ってる/丸い/やつ！/ソースが/最高！|tako ga haitteru marui yatsu! sōsu ga saikō!|É uma bolinha com polvo dentro! O molho é o melhor!|タコがはいってる、まるいやつ！ソースがさいこう！', go: 'c' },
    c: { n: 'Vocês compram seis takoyaki, fumegando. O Ren já enfia um inteiro na boca.', s: 'ren|あつっ！/あっつ！/はふ、/はふ…|atsu! attsu! hafu, hafu…|Ai, quente! Muito quente! Ráf, ráf...|あつっ！あっつ！はふ、はふ。', t: ['atsui'], tip: '“Atsu!” é a forma curtinha de “atsui” (quente), usada como exclamação. Takoyaki recém-feito é famoso por queimar a língua!', o: [
      ['大丈夫？|daijōbu?|Tudo bem?', 'g', 'd'],
      ['あはは！|ahaha!|Hahaha!', 'g', 'd']] },
    d: { s: 'ren|…でも/うまい！/食べてみて！|…demo umai! tabete mite!|...Mas é bom demais! Prova!|でも、うまい！たべてみて！', t: ['oishii'], o: [
      ['（ふーふーして）/おいしい！|(fūfū shite) oishii!|(depois de assoprar) Delicioso!', 'g', 'e'],
      ['（すぐ食べて）/あつっ！|(sugu tabete) atsu!|(come na hora) Ai, quente!', 'g', 'e2']] },
    e: { s: 'ren|だろ？！/ふーふーするの、/賢いな。|daro?! fūfū suru no, kashikoi na.|Né?! Assoprar antes foi esperto.|だろ？ふーふーするの、かしこいな。', end: 'Você conversou de forma casual com um amigo e aprendeu “atsui” e “oishii” do jeito mais gostoso.' },
    e2: { s: 'ren|あはは！/仲間だな！|ahaha! nakama da na!|Hahaha! Agora somos parceiros de língua queimada!|あはは！なかまだな！', end: 'Você conversou de forma casual com um amigo e aprendeu “atsui” e “oishii” do jeito mais gostoso.' }
  } },
  { id: 'm4', place: 'machi', kind: 'missao', title: 'A gata da Mei', desc: 'Ajude uma menina a encontrar a gatinha dela.', need: ['m1'], chars: ['mei'], words: ['neko', 'shiroi', 'mitsuketa'], nodes: {
    a: { n: 'Uma menininha está chorando perto do parque.', s: 'mei|うちの/ねこ、/見なかった？|uchi no neko, minakatta?|Você não viu a minha gata?|うちのねこ、みなかった？', t: ['neko'], o: [
      ['どんな/ねこ？|donna neko?|Que tipo de gata?', 'g', 'b'],
      ['大丈夫？|daijōbu?|Você está bem?', 'g', 'a2']] },
    a2: { s: 'mei|ううん…/ミルクが/いないの。/ねこの/ミルク。|uun… Miruku ga inai no. neko no Miruku.|Não... A Miruku sumiu. Minha gatinha Miruku.', go: 'b' },
    b: { s: 'mei|白い/ねこ。/赤い/リボンを/してるの。|shiroi neko. akai ribon o shiteru no.|Uma gata branca. Ela usa um laço vermelho.|しろいねこ。あかいリボンをしてるの。', t: ['shiroi'], go: 'c' },
    c: { n: 'Você procura pela rua e encontra três gatos. Qual é a Miruku?', p: { say: 'mei|白い/ねこ、/赤い/リボン！|shiroi neko, akai ribon!|Gata branca, laço vermelho!|しろいねこ、あかいリボン！', q: 'Qual é a gata da Mei?', items: [['黒いねこ・赤いリボン|kuroi neko, akai ribon|gato preto, laço vermelho', 0, '“Kuroi” é preto. A Miruku é “shiroi” (branca).', 'cat:#2b2b33:#e0343c'], ['白いねこ・赤いリボン|shiroi neko, akai ribon|gata branca, laço vermelho', 1, '', 'cat:#ffffff:#e0343c'], ['白いねこ・青いリボン|shiroi neko, aoi ribon|gato branco, laço azul', 0, '“Aoi” é azul. O laço da Miruku é “akai” (vermelho).', 'cat:#ffffff:#2f6fd8']], go: 'd', miss: 'Quase! Lembre: “shiroi” (branca) e “akai ribon” (laço vermelho).' } },
    d: { t: ['mitsuketa'], o: [['ミルク、/見つけたよ！|Miruku, mitsuketa yo!|Achei a Miruku!', 'g', 'e']] },
    e: { s: 'mei|ミルク！/よかった…/ありがとう！|Miruku! yokatta… arigatō!|Miruku! Que alívio... Obrigada!', n: 'A gata ronrona, nem aí para o susto que deu.', end: 'Você entendeu a descrição e ajudou a Mei. Herói(na) do bairro!' }
  } },

  /* ---- acontecimentos da rua (aparecem ao “dar uma volta”) ---- */
  { id: 'v1', place: 'machi', kind: 'evento', title: 'Uma foto, por favor', desc: 'Turistas pedem ajuda.', chars: ['tourist'], words: ['shashin'], nodes: {
    a: { n: 'Um casal de turistas japoneses se aproxima com um celular.', s: 'tourist|すみません、/写真を/撮って/もらえますか？|sumimasen, shashin o totte moraemasu ka?|Com licença, poderia tirar uma foto nossa?|すみません、しゃしんを、とってもらえますか？', t: ['shashin'], o: [
      ['はい、/いいですよ。|hai, ii desu yo.|Claro, pode ser.', 'g', 'b'],
      ['写真？/はい！|shashin? hai!|Foto? Sim!', 'g', 'b']] },
    b: { n: 'Você enquadra os dois. Na hora de clicar, como se diz “xis”?', tip: 'Na hora da foto, os japoneses dizem “hai, chīzu!” e fazem o sinal de paz (V) com os dedos.', o: [['はい、/チーズ！|hai, chīzu!|Diga “xis”!', 'g', 'c']] },
    c: { s: 'tourist|ありがとうございます！/上手ですね！|arigatō gozaimasu! jōzu desu ne!|Muito obrigado! Ficou ótima!|ありがとうございます！じょうずですね！', end: 'Uma foto, um “chīzu” e dois turistas felizes.' }
  } },
  { id: 'v2', place: 'machi', kind: 'evento', title: 'Chuva de repente', desc: 'Um vizinho rabugento e gentil.', chars: ['oji'], words: ['kasa'], nodes: {
    a: { n: 'Começa a chover forte. Você se abriga sob o toldo de uma loja de ferragens.', s: 'oji|うわ、/すごい雨！/傘、/持ってる？|uwa, sugoi ame! kasa, motteru?|Nossa, que chuvarada! Tem guarda-chuva?|うわ、すごいあめ！かさ、もってる？', t: ['kasa'], o: [
      ['いいえ、/持っていません。|iie, motte imasen.|Não, não tenho.', 'g', 'b'],
      ['持ってない…|mottenai…|Não tenho...', 'g', 'b']] },
    b: { s: 'oji|じゃあ、/これ/使って！/返さなくて/いいから。|jā, kore tsukatte! kaesanakute ii kara.|Então usa este! Não precisa devolver.|じゃあ、これつかって！かえさなくていいから。', tip: 'Guarda-chuvas transparentes são baratíssimos no Japão. Muita loja empresta ou dá um quando a chuva aperta.', o: [['ありがとうございます！|arigatō gozaimasu!|Muito obrigado(a)!', 'g', 'c']] },
    c: { s: 'oji|いいって、/いいって！|ii tte, ii tte!|Imagina, imagina!', end: 'Você ganhou um guarda-chuva e aprendeu “kasa”. Gentileza de bairro!' }
  } },
  { id: 'v3', place: 'machi', kind: 'evento', title: 'Ishi-yaki-imo!', desc: 'Uma canção estranha vem de uma caminhonete.', chars: ['imo'], words: ['yakiimo'], nodes: {
    a: { n: 'Uma caminhonete passa devagar, tocando uma canção arrastada no alto-falante...', s: 'imo|いしや〜きいも〜、/おいも！/ほかほかの/焼き芋だよ〜！|ishiyā kiimo, oimo! hokahoka no yakiimo da yo!|Batata-doce assada na pedra! Batata quentinha!|いしやきいも、おいも！ほかほかの、やきいもだよ！', t: ['yakiimo'], tip: 'No outono e no inverno, caminhonetes vendem “ishi-yaki-imo” (batata-doce assada em pedras quentes) cantando essa melodia famosa.', o: [
      ['焼き芋、/一つ/ください！|yakiimo, hitotsu kudasai!|Uma batata-doce, por favor!', 'g', 'b'],
      ['（手を振る）|(te o furu)|(Só acenar)', 'g', 'c']] },
    b: { s: 'imo|はいよ！/熱いから/気をつけて！|hai yo! atsui kara ki o tsukete!|Tá na mão! Cuidado que tá quente!|はいよ！あついから、きをつけて！', end: 'Batata-doce quentinha nas mãos. Essa canção você nunca mais esquece!' },
    c: { s: 'imo|またね〜！|mata ne!|Até mais!', end: 'Você ouviu o famoso chamado do vendedor de batata-doce!' }
  } },
  { id: 'v4', place: 'machi', kind: 'evento', title: 'Que horas são?', desc: 'Um senhor com o relógio parado.', chars: ['oldman'], words: ['nanji'], nodes: {
    a: { n: 'Um senhor de chapéu para ao seu lado, olhando o relógio parado.', s: 'oldman|すみません、/今、/何時ですか？|sumimasen, ima, nanji desu ka?|Com licença, que horas são agora?|すみません、いま、なんじですか？', t: ['nanji'], go: 'b' },
    b: { n: 'Você olha o celular: 3:00.', o: [
      ['3時です。|sanji desu.|São três horas.', 'g', 'c'],
      ['3円です。|san en desu.|São três ienes.', 'x', 'bx', '“En” é iene! Para horas, use “ji”: sanji (3 horas).'],
      ['30です。|sanjū desu.|É trinta.', 'x', 'bx', '“Sanjū” é trinta. Três horas é “sanji”.']] },
    bx: { s: 'oldman|はて…？|hate…?|Hum...?', n: 'O senhor coça a cabeça. Tente de novo.', back: 1 },
    c: { s: 'oldman|3時！/おやつの/時間だ。/ありがとう。|sanji! oyatsu no jikan da. arigatō.|Três horas! Hora do lanchinho. Obrigado.|さんじ！おやつのじかんだ。ありがとう。', tip: 'No Japão, 3 da tarde é a tradicional “hora do lanche” (oyatsu no jikan).', end: 'Você disse as horas para alguém. Pequena ajuda, grande japonês!' }
  } },
  { id: 'm5', place: 'machi', kind: 'missao', title: 'Provar uma camiseta', desc: 'Peça para provar, diga o tamanho e escolha a cor.', need: ['m1'], chars: ['aoi'], words: ['fuku', 'shichaku', 'chiisai', 'ookii', 'iro'], nodes: {
    a: { n: 'Você entra numa lojinha de roupas na rua comercial.', s: 'aoi|いらっしゃいませ！/どうぞ、/ご覧ください。|irasshaimase! dōzo, goran kudasai.|Bem-vindo(a)! Fique à vontade para olhar.|いらっしゃいませ！どうぞ、ごらんください。', tip: 'Em lojas de roupa, a vendedora costuma deixar você olhar à vontade e só se aproxima quando você chama.', go: 'b' },
    b: { n: 'Você gostou de uma camiseta azul e quer provar.', t: ['fuku', 'shichaku'], o: [
      ['すみません、/試着しても/いいですか？|sumimasen, shichaku shite mo ii desu ka?|Com licença, posso provar?', 'g', 'c'],
      ['これ、/着たいです。|kore, kitai desu.|Quero vestir isto.', 'k', 'c', 'Ela entende! Mas “shichaku shite mo ii desu ka?” é o jeito natural de pedir para provar.'],
      ['これ、/食べても/いいですか？|kore, tabete mo ii desu ka?|Posso comer isto?', 'x', 'bx', '“Taberu” é comer! Para provar roupa, use “shichaku”.']] },
    bx: { s: 'aoi|え…？/服は/食べられませんよ！|e…? fuku wa taberaremasen yo!|Hã...? Roupa não se come!|え…？ふくは、たべられませんよ！', n: 'Ela ri, sem entender.', back: 1 },
    c: { s: 'aoi|はい、/どうぞ。/試着室は/あちらです。|hai, dōzo. shichakushitsu wa achira desu.|Claro. O provador é ali.|はい、どうぞ。しちゃくしつは、あちらです。', tip: 'No Japão, você tira os sapatos antes de entrar no provador.', go: 'd' },
    d: { n: 'Você veste a camiseta... está apertada.', s: 'aoi|いかがですか？|ikaga desu ka?|Que tal?', t: ['chiisai', 'ookii'], o: [
      ['ちょっと/小さいです。|chotto chiisai desu.|Está um pouco pequena.', 'g', 'e'],
      ['大きいです！|ōkii desu!|Está grande!', 'x', 'dx', 'Ela está apertada, então é pequena: “chiisai”. “Ōkii” é grande.']] },
    dx: { s: 'aoi|大きい…ですか？/ぴったりに/見えますけど…|ōkii… desu ka? pittari ni miemasu kedo…|Grande...? Parece bem justa...|おおきい…ですか？ぴったりに、みえますけど…', back: 1 },
    e: { s: 'aoi|では、/Lサイズは/いかがですか？/色は/青と/白が/あります。|dewa, eru saizu wa ikaga desu ka? iro wa ao to shiro ga arimasu.|Então, que tal o tamanho G? Temos azul e branca.|では、エルサイズはいかがですか？いろは、あおと、しろがあります。', t: ['iro'], o: [
      ['青を/お願いします。|ao o onegai shimasu.|A azul, por favor.', 'g', 'f'],
      ['白を/お願いします。|shiro o onegai shimasu.|A branca, por favor.', 'g', 'f']] },
    f: { s: 'aoi|ありがとうございます！/よく/お似合いですよ。|arigatō gozaimasu! yoku oniai desu yo.|Obrigada! Ficou muito bem em você.|ありがとうございます！よくおにあいですよ。', end: 'Você provou, trocou o tamanho e escolheu a cor. Compras de roupa em japonês!' }
  } },
  { id: 'm6', place: 'machi', kind: 'missao', title: 'Na farmácia', desc: 'Diga o que está sentindo e entenda como tomar o remédio.', need: ['m1'], chars: ['kobayashi'], words: ['atama', 'itai', 'netsu', 'kusuri'], nodes: {
    a: { n: 'Você acordou com dor de cabeça e foi à farmácia do bairro (薬局, yakkyoku).', s: 'kobayashi|こんにちは。/どうしましたか？|konnichiwa. dō shimashita ka?|Olá. O que houve?', go: 'b' },
    b: { t: ['atama', 'itai'], n: 'Explique o que você sente.', o: [
      ['頭が/痛いです。|atama ga itai desu.|Estou com dor de cabeça.', 'g', 'c'],
      ['お腹が/痛いです。|onaka ga itai desu.|Estou com dor de barriga.', 'k', 'b2', 'A frase está certa, mas a sua dor é na cabeça (atama).'],
      ['頭が/いいです。|atama ga ii desu.|Eu sou inteligente.', 'x', 'bx', '“Atama ga ii” quer dizer “ser inteligente”! Dor é “itai”: atama ga itai desu.']] },
    bx: { s: 'kobayashi|それは/よかったですね…？|sore wa yokatta desu ne…?|Que bom... para você?|それは、よかったですね…？', n: 'Ela não sabe se ri ou se ajuda.', back: 1 },
    b2: { s: 'kobayashi|お腹ですか？|onaka desu ka?|A barriga?|おなかですか？', n: 'Você aponta para a cabeça e corrige.', go: 'c' },
    c: { s: 'kobayashi|熱は/ありますか？|netsu wa arimasu ka?|Está com febre?|ねつは、ありますか？', t: ['netsu'], o: [
      ['いいえ、/ありません。|iie, arimasen.|Não, não estou.', 'g', 'd'],
      ['ちょっと/あります。|chotto arimasu.|Um pouco.', 'g', 'c2']] },
    c2: { s: 'kobayashi|無理しないで、/ゆっくり/休んで/ください。|muri shinaide, yukkuri yasunde kudasai.|Não se esforce e descanse bem.|むりしないで、ゆっくりやすんでください。', go: 'd' },
    d: { s: 'kobayashi|この/薬を/どうぞ。/一日/三回、/食後に/飲んで/ください。|kono kusuri o dōzo. ichinichi sankai, shokugo ni nonde kudasai.|Este remédio. Tome três vezes por dia, depois das refeições.|このくすりをどうぞ。いちにち、さんかい、しょくごに、のんでください。', t: ['kusuri'], tip: 'Em japonês, remédio se “bebe” (nomu), mesmo sendo comprimido.', go: 'e' },
    e: { n: 'Ela repete a dose. Quantas vezes por dia?', p: { say: 'kobayashi|一日/三回です。|ichinichi sankai desu.|Três vezes por dia.|いちにち、さんかいです。', q: 'Quantas vezes por dia você deve tomar?', items: [['一回|ikkai|uma vez', 0], ['三回|sankai|três vezes', 1], ['五回|gokai|cinco vezes', 0]], go: 'f', miss: 'Ouça de novo: “san-kai”.' } },
    f: { s: 'kobayashi|お大事に。|odaiji ni.|Melhoras!|おだいじに。', tip: '“Odaiji ni” é o que se diz a quem está doente: cuide-se, melhoras.', end: 'Você explicou o que sentia e entendeu como tomar o remédio.' }
  } },
  { id: 'g5', place: 'gakkou', kind: 'historia', title: 'Excursão ao zoológico', desc: 'Animais, emoções e um panda muito fofo.', need: ['g2'], chars: ['aiko', 'yumi', 'shota'], words: ['doubutsuen', 'zou', 'kawaii', 'tanoshii'], nodes: {
    a: { n: 'Hoje a turma sai em excursão.', s: 'aiko|今日は/動物園に/行きます！|kyō wa dōbutsuen ni ikimasu!|Hoje vamos ao zoológico!|きょうは、どうぶつえんにいきます！', t: ['doubutsuen'], go: 'b' },
    b: { n: 'Vocês param diante de um animal enorme, cinza, de tromba comprida.', s: 'yumi|見て！/大きい！|mite! ōkii!|Olha! Que grande!|みて！おおきい！', t: ['zou'], go: 'b2' },
    b2: { n: 'O Shōta grita o nome do animal.', p: { say: 'shota|象だ！|zō da!|É um elefante!|ぞうだ！', q: 'Que animal o Shōta viu?', items: [['象|zō|elefante', 1], ['猿|saru|macaco', 0], ['熊|kuma|urso', 0], ['鳥|tori|pássaro', 0]], go: 'c', miss: 'Ouça de novo: “zō”.' } },
    c: { s: 'yumi|あ、/パンダ！/かわいい〜！|a, panda! kawaii!|Ah, um panda! Que fofo!', t: ['kawaii'], o: [
      ['本当に/かわいいね！|hontō ni kawaii ne!|Muito fofo mesmo!', 'g', 'd'],
      ['こわいね！|kowai ne!|Que medo!', 'k', 'd', 'Pode ser sincero, mas o panda só está comendo bambu. “Kawaii” combina mais.'],
      ['おいしそう！|oishisō!|Parece gostoso!', 'x', 'cx', '“Oishisō” é “parece gostoso”! Não se diz isso de um panda.']] },
    cx: { s: 'shota|ははは！/パンダは/食べ物じゃないよ！|hahaha! panda wa tabemono ja nai yo!|Hahaha! Panda não é comida!|ははは！パンダは、たべものじゃないよ！', back: 1 },
    d: { n: 'No ônibus de volta, a professora pergunta:', s: 'aiko|今日は/どうでしたか？|kyō wa dō deshita ka?|Como foi hoje?|きょうは、どうでしたか？', t: ['tanoshii'], o: [
      ['とても/楽しかったです！|totemo tanoshikatta desu!|Foi muito divertido!', 'g', 'e'],
      ['楽しいです！|tanoshii desu!|É divertido!', 'k', 'e', 'Funciona! Para algo que já passou, o natural é o passado: “tanoshikatta”.']] },
    e: { s: 'aiko|よかったです。/また/来ましょうね。|yokatta desu. mata kimashō ne.|Que bom. Vamos voltar outra vez.|よかったです。また、きましょうね。', end: 'Animais, “kawaii” e “tanoshikatta”: um passeio inteiro em japonês!' }
  } },
  { id: 'v5', place: 'machi', kind: 'evento', title: 'O templo do bairro', desc: 'Um lugar tranquilo no fim da rua.', chars: ['oldman'], words: ['otera', 'shizuka'], nodes: {
    a: { n: 'No fim da rua comercial há um pequeno templo. O senhor de chapéu está lá.', s: 'oldman|ここは/古い/お寺です。/静かでしょう？|koko wa furui otera desu. shizuka deshō?|Aqui é um templo antigo. Tranquilo, não é?|ここは、ふるいおてらです。しずかでしょう？', t: ['otera', 'shizuka'], o: [
      ['はい、/とても/静かですね。|hai, totemo shizuka desu ne.|Sim, muito tranquilo.', 'g', 'b'],
      ['きれいですね。|kirei desu ne.|É bonito, né?', 'g', 'b']] },
    b: { s: 'oldman|お参りの/前に、/手と/口を/清めますよ。|omairi no mae ni, te to kuchi o kiyomemasu yo.|Antes de rezar, a gente purifica as mãos e a boca.|おまいりのまえに、てと、くちを、きよめますよ。', tip: 'Na entrada de templos e santuários há uma fonte (temizuya) para lavar as mãos e a boca antes de rezar.', o: [['ありがとうございます。|arigatō gozaimasu.|Obrigado(a).', 'g', 'c']] },
    c: { s: 'oldman|いい/一日を。|ii ichinichi o.|Tenha um bom dia.|いい、いちにちを。', end: 'Você visitou o templo do bairro e aprendeu “otera” e “shizuka”.' }
  } }
];
