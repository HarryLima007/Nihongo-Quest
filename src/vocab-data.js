/* ==========================================================
   Nihongo Quest 12.0 — ACADEMIA DE VOCABULÁRIO (dados)
   Categorias → lições pequenas (5 a 10 palavras). Cada palavra é uma linha:
     'kanji|kana|romaji|significados|classe|nota|exemplo jp|romaji do exemplo|tradução do exemplo'
   - kanji vazio = palavra escrita só em kana (o kana é a escrita).
   - significados: “;” separa sentidos diferentes (o Dicionário mostra cada um em separado).
   - classe: subst, verbo, adj-i, adj-na, adv, expr, pron, num, cont, part, interj (vazio = sem classe).
   - nota, exemplo: opcionais. Exemplo só quando ajuda (contexto, sentido, uso).
   - O áudio é a voz japonesa do aparelho: lê o kana da palavra; no exemplo com kanji, a leitura vem do romaji.
   Ids: categoria e lição nunca mudam; o item de cada palavra é 'vc:' + escrita (+ '・' + kana quando há kanji).
   Uma palavra que já existe em outra área (mesma escrita e sentido) é a MESMA palavra para o Caderno e a
   Revisão (palavras unificadas da 10.0) e entra no mesmo verbete do Dicionário: não é contada como nova.
   Verificado em tests/vocab-content.js (romaji × kana, leituras de kanji com kuromoji, duplicatas).
   ========================================================== */
const VOCAB_CATS = [
{ id: 'formas', title: 'Formas e geometria', jp: 'かたち', emblem: '形', color: '#3d7be0', theme: 'formas',
  desc: 'Formas, linhas e medidas para descrever as coisas: quadrado, triângulo, redondo, tamanho.',
  lessons: [
  { id: 'vfo1', title: 'Formas básicas', words: [
    '形|かたち|katachi|forma; formato|subst||この クッキーは ほしの 形です。|kono kukkii wa hoshi no katachi desu.|Este biscoito tem forma de estrela.',
    '丸|まる|maru|círculo; bolinha; marca de “certo” (○)|subst|Nas provas e formulários japoneses, ○ (maru) marca o certo e × (batsu) o errado.|こたえに 丸を つけて ください。|kotae ni maru o tsukete kudasai.|Marque a resposta com um círculo.',
    '丸い|まるい|marui|redondo|adj-i||丸い テーブル|marui teeburu|uma mesa redonda',
    '四角|しかく|shikaku|quadrado; quadrilátero|subst|Literalmente “quatro cantos” (四 quatro + 角 canto). Serve para quadrado e retângulo no dia a dia.|この はこは 四角です。|kono hako wa shikaku desu.|Esta caixa é quadrada.',
    '四角い|しかくい|shikakui|quadrado; retangular (forma)|adj-i|Adjetivo de 四角: 四角い まど = janela quadrada.',
    '三角|さんかく|sankaku|triângulo|subst|“Três cantos”. Em geometria também se diz 三角形 (sankakkei).|おにぎりは 三角が おおいです。|onigiri wa sankaku ga ooi desu.|Os onigiris costumam ser triangulares.',
    'ハート|ハート|haato|coração (formato)|subst|O formato ♡. O órgão é 心臓 (shinzou) e o “coração” dos sentimentos é 心 (kokoro).'
  ] },
  { id: 'vfo2', title: 'Pontos, linhas e cantos', words: [
    '点|てん|ten|ponto; nota (de prova)|subst||テストで 百点を とった！|tesuto de hyakuten o totta!|Tirei nota cem na prova!',
    '線|せん|sen|linha; traço|subst||ここに 線を ひいて ください。|koko ni sen o hiite kudasai.|Trace uma linha aqui.',
    '直線|ちょくせん|chokusen|linha reta|subst',
    '曲線|きょくせん|kyokusen|linha curva|subst',
    '角|かど|kado|canto; esquina|subst|Leitura かど: o canto de uma mesa, a esquina de uma rua. O mesmo kanji se lê つの (chifre) e かく (ângulo).|つぎの 角を 右に まがって ください。|tsugi no kado o migi ni magatte kudasai.|Vire à direita na próxima esquina.',
    '角|かく|kaku|ângulo|subst|Leitura かく: usada na geometria (o ângulo A = 角A) e dentro de palavras como 三角, 四角 e 角度.',
    '角度|かくど|kakudo|ângulo (medida, em graus)|subst',
    '真ん中|まんなか|mannaka|meio; centro|subst||へやの 真ん中に テーブルが あります。|heya no mannaka ni teeburu ga arimasu.|No meio do quarto há uma mesa.'
  ] },
  { id: 'vfo3', title: 'Figuras da geometria', words: [
    '円|えん|en|círculo (geometria); iene (moeda)|subst|O mesmo kanji é a moeda japonesa: 百円 (hyakuen) = cem ienes. No dia a dia, “círculo” costuma ser 丸.',
    '正方形|せいほうけい|seihoukei|quadrado (figura geométrica)|subst|Termo de geometria. Na conversa, diz-se 四角.',
    '長方形|ちょうほうけい|chouhoukei|retângulo|subst',
    '三角形|さんかくけい|sankakukei|triângulo (figura geométrica)|subst|Também se pronuncia さんかっけい (sankakkei).',
    '球|きゅう|kyuu|esfera|subst',
    '立方体|りっぽうたい|rippoutai|cubo|subst',
    '星形|ほしがた|hoshigata|forma de estrela|subst',
    '平ら|たいら|taira|plano; liso (sem relevo)|adj-na||平らな みち|taira na michi|um caminho plano'
  ] },
  { id: 'vfo4', title: 'Medidas e tamanho', words: [
    '大きさ|おおきさ|ookisa|tamanho|subst|大きい (grande) + さ vira substantivo: “o tamanho”. O mesmo vale para 長さ, 高さ e 重さ.|くつの 大きさは どれぐらいですか。|kutsu no ookisa wa doregurai desu ka.|Qual é o tamanho do sapato?',
    '長さ|ながさ|nagasa|comprimento|subst',
    '高さ|たかさ|takasa|altura|subst',
    '重さ|おもさ|omosa|peso|subst',
    '太い|ふとい|futoi|grosso|adj-i||太い ペン|futoi pen|uma caneta grossa',
    '細い|ほそい|hosoi|fino; estreito|adj-i||細い みち|hosoi michi|uma rua estreita',
    '厚い|あつい|atsui|grosso (espessura de livro, parede)|adj-i|Mesmo som de 暑い (quente, clima) e 熱い (quente, ao toque). O contexto mostra qual é.',
    '薄い|うすい|usui|fino (espessura); fraco, ralo (chá, cor)|adj-i'
  ] }
  ] },

{ id: 'animais', title: 'Animais', jp: 'どうぶつ', emblem: '犬', color: '#d9822b', theme: 'animais',
  desc: 'Bichos de casa, da fazenda, da selva e do mar, e as partes do corpo dos animais.',
  lessons: [
  { id: 'van1', title: 'Animais de casa', words: [
    '犬|いぬ|inu|cachorro|subst||犬が ほえて いる。|inu ga hoete iru.|O cachorro está latindo.',
    '猫|ねこ|neko|gato|subst||猫が ねて いる。|neko ga nete iru.|O gato está dormindo.',
    '鳥|とり|tori|pássaro; ave; frango (carne)|subst|Como comida, 鳥 (ou 鶏) é frango: やきとり = espetinho de frango.',
    '魚|さかな|sakana|peixe|subst',
    '|うさぎ|usagi|coelho|subst|O kanji 兎 existe, mas quase sempre se escreve em kana.',
    '|ハムスター|hamusutaa|hamster|subst',
    '金魚|きんぎょ|kingyo|peixinho-dourado|subst|金 (ouro) + 魚 (peixe). Pescar 金魚 é brincadeira clássica dos festivais de verão.',
    '動物|どうぶつ|doubutsu|animal|subst||どんな 動物が すきですか。|donna doubutsu ga suki desu ka.|De que animais você gosta?'
  ] },
  { id: 'van2', title: 'Na fazenda', words: [
    '牛|うし|ushi|vaca; boi|subst|A carne é 牛肉 (gyuuniku).',
    '豚|ぶた|buta|porco|subst|A carne é 豚肉 (butaniku).',
    '馬|うま|uma|cavalo|subst',
    '鶏|にわとり|niwatori|galinha; galo|subst|Literalmente “pássaro do quintal” (庭 niwa + 鳥 tori).|鶏が たまごを うんだ。|niwatori ga tamago o unda.|A galinha botou um ovo.',
    '羊|ひつじ|hitsuji|ovelha; carneiro|subst',
    '山羊|やぎ|yagi|cabra; bode|subst|Leitura especial: os dois kanji (montanha + carneiro) se leem juntos やぎ.',
    '|アヒル|ahiru|pato (doméstico)|subst'
  ] },
  { id: 'van3', title: 'Animais selvagens', words: [
    '|ライオン|raion|leão|subst',
    '虎|とら|tora|tigre|subst',
    '象|ぞう|zou|elefante|subst||象の はなは ながい。|zou no hana wa nagai.|A tromba do elefante é comprida.',
    '猿|さる|saru|macaco|subst',
    '熊|くま|kuma|urso|subst',
    '|キリン|kirin|girafa|subst',
    '|パンダ|panda|panda|subst',
    '狐|きつね|kitsune|raposa|subst|No folclore, a raposa é mensageira dos santuários de Inari e aparece muito em animes.',
    '狸|たぬき|tanuki|tanuki (cão-guaxinim)|subst|Animal real do Japão, famoso no folclore por se transformar.'
  ] },
  { id: 'van4', title: 'Bichos pequenos', words: [
    '|ねずみ|nezumi|rato; camundongo|subst|O kanji 鼠 existe, mas é raro. O rato é o primeiro animal do zodíaco japonês.',
    '蛙|かえる|kaeru|sapo; rã|subst|Mesmo som de 帰る (voltar para casa): por isso amuletos de sapo desejam “voltar em segurança”.',
    '亀|かめ|kame|tartaruga; jabuti|subst',
    '蛇|へび|hebi|cobra|subst',
    '虫|むし|mushi|inseto; bichinho|subst',
    '蝶|ちょう|chou|borboleta|subst|Também se diz ちょうちょ (chouchou), mais infantil.',
    '蜂|はち|hachi|abelha; vespa|subst|Mesmo som de 八 (oito).',
    '蚊|か|ka|mosquito|subst|Mesmo som da partícula か: o contexto mostra a diferença.',
    '蜘蛛|くも|kumo|aranha|subst|Mesmo som de 雲 (nuvem). Na fala, a entonação ajuda.'
  ] },
  { id: 'van5', title: 'No mar e no céu', words: [
    '鯨|くじら|kujira|baleia|subst',
    '|イルカ|iruka|golfinho|subst',
    '鮫|さめ|same|tubarão|subst',
    '|タコ|tako|polvo|subst|Em kanji, 蛸. たこやき = bolinho de polvo.',
    '蟹|かに|kani|caranguejo|subst',
    '|カラス|karasu|corvo|subst|Em kanji, 烏. Muito comum nas cidades japonesas.',
    '鳩|はと|hato|pombo|subst',
    '|ペンギン|pengin|pinguim|subst'
  ] },
  { id: 'van6', title: 'Partes dos animais', words: [
    '角|つの|tsuno|chifre|subst|Leitura つの: o chifre de animais e de oni (ogros). Não confundir com 角 かど (canto) e 角 かく (ângulo).|鬼には 角が あります。|oni ni wa tsuno ga arimasu.|Os oni têm chifres.',
    '尻尾|しっぽ|shippo|cauda; rabo|subst||犬が 尻尾を ふって いる。|inu ga shippo o futte iru.|O cachorro está abanando o rabo.',
    '羽|はね|hane|asa (de inseto, ave); pena|subst|Pode ser a asa ou uma pena, conforme o contexto. Para asas grandes e poéticas (ou de avião), usa-se 翼 (tsubasa).',
    '翼|つばさ|tsubasa|asa (de ave, avião; poético)|subst',
    '毛|け|ke|pelo; cabelo (do corpo)|subst',
    '爪|つめ|tsume|unha; garra|subst',
    '牙|きば|kiba|presa (dente grande); canino|subst',
    '鳴く|なく|naku|cantar, miar, latir (som de animal)|verbo|Para animais. Mesmo som de 泣く (chorar), que é para pessoas.|とりが 鳴いて いる。|tori ga naite iru.|Os pássaros estão cantando.',
    '飼う|かう|kau|criar, ter (animal de estimação)|verbo|Mesmo som de 買う (comprar).|猫を 飼って います。|neko o katte imasu.|Tenho um gato.',
    '|ペット|petto|animal de estimação|subst'
  ] }
  ] },

{ id: 'roupas', title: 'Roupas e acessórios', jp: 'ふく', emblem: '服', color: '#c2499b', theme: 'roupas',
  desc: 'O que vestir, calçar e usar, e os verbos certos para cada peça.',
  lessons: [
  { id: 'vro1', title: 'Roupas do dia a dia', words: [
    '服|ふく|fuku|roupa|subst||あたらしい 服を かいました。|atarashii fuku o kaimashita.|Comprei uma roupa nova.',
    '|シャツ|shatsu|camisa|subst',
    'Tシャツ|ティーシャツ|tiishatsu|camiseta|subst|Lê-se “tii-shatsu”, como a letra T em inglês.',
    '|ズボン|zubon|calça|subst|Também se diz パンツ (pantsu), que em alguns contextos significa “cueca/calcinha”.',
    '|スカート|sukaato|saia|subst',
    '|ワンピース|wanpiisu|vestido|subst|Do inglês “one-piece”. É o nome do vestido inteiriço (e de um anime famoso).',
    '上着|うわぎ|uwagi|casaco; jaqueta; blusa de cima|subst',
    '|コート|kooto|casaco; sobretudo|subst'
  ] },
  { id: 'vro2', title: 'Pés, mãos e cabeça', words: [
    '靴|くつ|kutsu|sapato; calçado|subst|No Japão, tira-se o sapato na entrada (玄関) das casas.|ここで 靴を ぬいで ください。|koko de kutsu o nuide kudasai.|Tire os sapatos aqui, por favor.',
    '靴下|くつした|kutsushita|meia|subst|靴 (sapato) + 下 (embaixo).',
    '帽子|ぼうし|boushi|chapéu; boné|subst',
    '手袋|てぶくろ|tebukuro|luva|subst|手 (mão) + 袋 (saco).',
    '|マフラー|mafuraa|cachecol|subst',
    '|ネクタイ|nekutai|gravata|subst',
    '|ベルト|beruto|cinto|subst',
    '|サンダル|sandaru|sandália; chinelo|subst'
  ] },
  { id: 'vro3', title: 'Acessórios', words: [
    '指輪|ゆびわ|yubiwa|anel|subst|指 (dedo) + 輪 (argola).',
    '眼鏡|めがね|megane|óculos|subst',
    '時計|とけい|tokei|relógio|subst',
    '|かばん|kaban|bolsa; mochila; pasta|subst',
    '|ポケット|poketto|bolso|subst',
    '|ボタン|botan|botão|subst',
    '|ネックレス|nekkuresu|colar|subst',
    '|リボン|ribon|laço; fita|subst'
  ] },
  { id: 'vro4', title: 'Roupas especiais', words: [
    '着物|きもの|kimono|quimono|subst|Roupa tradicional de seda, usada em cerimônias. 着る (vestir) + 物 (coisa).',
    '浴衣|ゆかた|yukata|yukata (quimono leve de algodão)|subst|Usado em festivais de verão e em fontes termais.',
    '制服|せいふく|seifuku|uniforme|subst||がっこうの 制服は あおいです。|gakkou no seifuku wa aoi desu.|O uniforme da escola é azul.',
    '|パジャマ|pajama|pijama|subst',
    '水着|みずぎ|mizugi|roupa de banho; maiô; sunga|subst',
    '下着|したぎ|shitagi|roupa íntima|subst'
  ] },
  { id: 'vro5', title: 'Vestir, calçar, tirar', words: [
    '着る|きる|kiru|vestir (camisa, casaco, vestido)|verbo|Para roupas da cintura para cima ou o corpo inteiro. Calça, saia e sapato usam 履く.|コートを 着て ください。さむいですよ。|kooto o kite kudasai. samui desu yo.|Vista o casaco. Está frio.',
    '履く|はく|haku|calçar; vestir (calça, saia, meia)|verbo|Para o que se veste nas pernas e nos pés.|くつを 履きます。|kutsu o hakimasu.|Calço os sapatos.',
    '被る|かぶる|kaburu|pôr (chapéu, boné)|verbo|Para o que vai na cabeça.',
    '脱ぐ|ぬぐ|nugu|tirar (roupa, sapato)|verbo|Serve para qualquer peça.',
    '付ける|つける|tsukeru|pôr (acessório); prender; anexar|verbo|Usado com anéis, colares, relógios e também com “acender” (luz) em outros contextos.',
    '似合う|にあう|niau|ficar bem (em alguém)|verbo||その 服、よく 似合って いますね。|sono fuku, yoku niatte imasu ne.|Essa roupa fica muito bem em você.'
  ] }
  ] },

{ id: 'casa', title: 'Casa e mobília', jp: 'いえ', emblem: '家', color: '#7a5bd6', theme: 'casa',
  desc: 'Cômodos, partes da casa, móveis, eletrodomésticos e a vida de quem mora.',
  lessons: [
  { id: 'vca1', title: 'Os cômodos', words: [
    '家|いえ|ie|casa; lar|subst|Também se lê うち (uchi), mais pessoal: “minha casa, minha família”.',
    '部屋|へや|heya|quarto; cômodo; sala|subst|Leitura especial da palavra inteira.|わたしの 部屋は 二かいです。|watashi no heya wa nikai desu.|Meu quarto fica no andar de cima.',
    '台所|だいどころ|daidokoro|cozinha|subst|Também se diz キッチン (kitchin).',
    'お風呂|おふろ|ofuro|banho; banheira|subst|No Japão, toma-se banho de chuveiro antes e depois se relaxa na banheira.|お風呂に はいります。|ofuro ni hairimasu.|Vou tomar banho (de banheira).',
    '|トイレ|toire|banheiro (vaso sanitário)|subst',
    '玄関|げんかん|genkan|entrada da casa (onde se tiram os sapatos)|subst',
    '庭|にわ|niwa|jardim; quintal|subst',
    '居間|いま|ima|sala de estar|subst|Mesmo som de 今 (agora). Também se diz リビング (ribingu).'
  ] },
  { id: 'vca2', title: 'Partes da casa', words: [
    '壁|かべ|kabe|parede; muro|subst||壁に えが かけて あります。|kabe ni e ga kakete arimasu.|Há um quadro pendurado na parede.',
    '床|ゆか|yuka|chão; piso|subst',
    '天井|てんじょう|tenjou|teto (de dentro)|subst',
    '屋根|やね|yane|telhado|subst',
    '窓|まど|mado|janela|subst',
    '|ドア|doa|porta|subst',
    '階段|かいだん|kaidan|escada|subst',
    '二階|にかい|nikai|segundo andar (andar de cima)|subst|No Japão, o térreo é o 一階 (ikkai, 1º andar). Então 二階 é o primeiro andar acima do térreo.'
  ] },
  { id: 'vca3', title: 'Móveis', words: [
    '机|つくえ|tsukue|escrivaninha; mesa de estudo|subst|Mesa para estudar ou trabalhar. A mesa de refeições costuma ser テーブル.|机の 上に ほんが あります。|tsukue no ue ni hon ga arimasu.|Há um livro em cima da escrivaninha.',
    '椅子|いす|isu|cadeira|subst',
    '|テーブル|teeburu|mesa|subst',
    '|ベッド|beddo|cama|subst',
    '布団|ふとん|futon|futon (colchão e coberta)|subst|Fica dobrado no 押し入れ durante o dia.',
    '本棚|ほんだな|hondana|estante de livros|subst',
    '棚|たな|tana|prateleira|subst',
    '|ソファ|sofa|sofá|subst',
    '|カーテン|kaaten|cortina|subst'
  ] },
  { id: 'vca4', title: 'Eletrodomésticos', words: [
    '冷蔵庫|れいぞうこ|reizouko|geladeira|subst||冷蔵庫に ジュースが あるよ。|reizouko ni juusu ga aru yo.|Tem suco na geladeira.',
    '電気|でんき|denki|eletricidade; luz (lâmpada acesa)|subst|“Acender a luz” = 電気を つける; “apagar” = 電気を けす.|電気を けして ください。|denki o keshite kudasai.|Apague a luz, por favor.',
    '電子レンジ|でんしレンジ|denshi renji|micro-ondas|subst',
    '洗濯機|せんたくき|sentakuki|máquina de lavar roupa|subst',
    '掃除機|そうじき|soujiki|aspirador de pó|subst',
    '|エアコン|eakon|ar-condicionado|subst',
    '|テレビ|terebi|televisão|subst',
    '|シャワー|shawaa|chuveiro; ducha|subst',
    '押し入れ|おしいれ|oshiire|armário embutido tradicional (para futon)|subst|Armário de portas de correr dos quartos japoneses. Guarda futons e cobertores.'
  ] },
  { id: 'vca5', title: 'Morar', words: [
    '|アパート|apaato|apartamento (prédio pequeno, aluguel)|subst|Prédio baixo, geralmente de 2 andares. Cuidado: マンション não é “mansão”.',
    '|マンション|manshon|apartamento (prédio de condomínio)|subst|Falso amigo: no Japão, マンション é um prédio de apartamentos de concreto, não uma mansão.',
    '住む|すむ|sumu|morar; viver (em um lugar)|verbo||どこに 住んで いますか。|doko ni sunde imasu ka.|Onde você mora?',
    '掃除|そうじ|souji|limpeza (faxina)|subst|そうじする = limpar, fazer faxina.',
    '洗濯|せんたく|sentaku|lavar roupa; lavagem de roupa|subst',
    '引っ越し|ひっこし|hikkoshi|mudança (de casa)|subst',
    '鍵|かぎ|kagi|chave; fechadura|subst||鍵を わすれた！|kagi o wasureta!|Esqueci a chave!'
  ] }
  ] },

{ id: 'corpo', title: 'Corpo humano', jp: 'からだ', emblem: '体', color: '#e0565b', theme: 'corpo',
  desc: 'Partes do corpo e as palavras para dizer o que dói no médico ou na farmácia.',
  lessons: [
  { id: 'vco1', title: 'Cabeça e rosto', words: [
    '体|からだ|karada|corpo|subst',
    '頭|あたま|atama|cabeça|subst|頭が いい = inteligente (literalmente, “cabeça boa”).',
    '顔|かお|kao|rosto|subst',
    '目|め|me|olho|subst',
    '耳|みみ|mimi|orelha; ouvido|subst',
    '鼻|はな|hana|nariz|subst|Mesmo som de 花 (flor).',
    '口|くち|kuchi|boca|subst',
    '歯|は|ha|dente|subst|Escova de dentes = 歯ブラシ (haburashi). Mesmo som de 葉 (folha).|歯を みがきます。|ha o migakimasu.|Escovo os dentes.'
  ] },
  { id: 'vco2', title: 'Tronco e braços', words: [
    '首|くび|kubi|pescoço|subst',
    '喉|のど|nodo|garganta|subst|喉が かわいた = estou com sede (literalmente, “a garganta secou”).|喉が いたいです。|nodo ga itai desu.|Estou com dor de garganta.',
    '肩|かた|kata|ombro|subst',
    '腕|うで|ude|braço|subst',
    '手|て|te|mão|subst',
    '指|ゆび|yubi|dedo|subst',
    '背中|せなか|senaka|costas|subst',
    'お腹|おなか|onaka|barriga; estômago|subst|お腹が すいた = estou com fome.'
  ] },
  { id: 'vco3', title: 'Pernas e por dentro', words: [
    '足|あし|ashi|pé; perna|subst|あし pode ser o pé ou a perna inteira, conforme o contexto.',
    '膝|ひざ|hiza|joelho|subst',
    '髪|かみ|kami|cabelo|subst|Mesmo som de 紙 (papel) e 神 (deus).',
    '胸|むね|mune|peito|subst',
    '心臓|しんぞう|shinzou|coração (órgão)|subst',
    '血|ち|chi|sangue|subst',
    '骨|ほね|hone|osso|subst',
    '舌|した|shita|língua (órgão)|subst|Mesmo som de 下 (embaixo).'
  ] },
  { id: 'vco4', title: 'Saúde', words: [
    '痛い|いたい|itai|dolorido; “ai!”, está doendo|adj-i|Sozinho, いたい！ é o “ai!” de quando algo dói.|あたまが 痛いです。|atama ga itai desu.|Estou com dor de cabeça.',
    '熱|ねつ|netsu|febre; calor (físico)|subst||熱が あります。|netsu ga arimasu.|Estou com febre.',
    '風邪|かぜ|kaze|resfriado; gripe leve|subst|Mesmo som de 風 (vento).|風邪を ひきました。|kaze o hikimashita.|Peguei um resfriado.',
    '咳|せき|seki|tosse|subst',
    '薬|くすり|kusuri|remédio|subst',
    '病気|びょうき|byouki|doença; estar doente|subst',
    '怪我|けが|kega|ferimento; machucado|subst',
    '元気|げんき|genki|saudável; disposto; animado|adj-na'
  ] }
  ] },

{ id: 'emocoes', title: 'Emoções e estados', jp: 'きもち', emblem: '心', color: '#e8744f', theme: 'sentimentos',
  desc: 'Como você se sente: alegria, medo, nervosismo e as onomatopeias que os animes usam o tempo todo.',
  lessons: [
  { id: 'vem1', title: 'Sentimentos básicos', words: [
    '嬉しい|うれしい|ureshii|feliz; contente (com algo que aconteceu)|adj-i|Alegria por um acontecimento: うれしい！ = que bom!, fiquei feliz!|プレゼント、嬉しい！|purezento, ureshii!|Um presente, que alegria!',
    '悲しい|かなしい|kanashii|triste|adj-i',
    '楽しい|たのしい|tanoshii|divertido; agradável|adj-i|Para atividades e momentos: 楽しかった！ = foi divertido!',
    '怖い|こわい|kowai|assustador; estar com medo|adj-i|Serve para a coisa (filme assustador) e para o medo que você sente.|この えいがは 怖い。|kono eiga wa kowai.|Este filme dá medo.',
    '寂しい|さびしい|sabishii|solitário; sentir falta|adj-i|Também se pronuncia さみしい (samishii).',
    '恥ずかしい|はずかしい|hazukashii|envergonhado; vergonhoso; tímido|adj-i',
    '眠い|ねむい|nemui|com sono|adj-i'
  ] },
  { id: 'vem2', title: 'Reações', words: [
    '怒る|おこる|okoru|ficar bravo; bronquear|verbo|おこって いる = está bravo. おこられた = levei bronca.|先生が 怒って いる。|sensei ga okotte iru.|O professor está bravo.',
    '驚く|おどろく|odoroku|surpreender-se; assustar-se|verbo||その ニュースに 驚きました。|sono nyuusu ni odorokimashita.|Fiquei surpreso com essa notícia.',
    '泣く|なく|naku|chorar|verbo|Para pessoas. Mesmo som de 鳴く (som de animal).',
    '笑う|わらう|warau|rir; sorrir|verbo',
    '喜ぶ|よろこぶ|yorokobu|alegrar-se; ficar contente|verbo',
    '困る|こまる|komaru|ficar em apuros; não saber o que fazer|verbo|こまった… = e agora?, que enrascada.',
    '疲れる|つかれる|tsukareru|cansar-se|verbo|つかれた！ = cansei!, estou cansado.'
  ] },
  { id: 'vem3', title: 'Por dentro', words: [
    '心配|しんぱい|shinpai|preocupação; preocupar-se|subst|心配する = preocupar-se. 心配しないで = não se preocupe.|心配しないで。だいじょうぶ。|shinpai shinaide. daijoubu.|Não se preocupe. Está tudo bem.',
    '緊張|きんちょう|kinchou|nervosismo; tensão|subst|緊張する = ficar nervoso (antes de uma prova, de falar em público).|テストの まえは 緊張する。|tesuto no mae wa kinchou suru.|Fico nervoso antes da prova.',
    '安心|あんしん|anshin|alívio; tranquilidade|subst',
    '気持ち|きもち|kimochi|sentimento; sensação|subst|気持ちいい = que sensação boa.',
    '心|こころ|kokoro|coração (sentimentos); mente|subst|O coração das emoções. O órgão é 心臓 (shinzou).',
    '好き|すき|suki|gostar; querido|adj-na|Gramaticalmente é um adjetivo: 猫が 好きです = gosto de gatos.',
    '嫌い|きらい|kirai|não gostar; detestar|adj-na',
    '大好き|だいすき|daisuki|adorar; gostar muito|adj-na'
  ] },
  { id: 'vem4', title: 'Onomatopeias de emoção', words: [
    '|わくわく|wakuwaku|empolgação; ansiedade boa|adv|O frio na barriga bom, de quem espera algo legal.|あしたの まつり、わくわくする！|ashita no matsuri, wakuwaku suru!|Tô empolgado com o festival de amanhã!',
    '|どきどき|dokidoki|coração acelerado (nervoso, paixão)|adv|Em mangás, aparece em katakana: ドキドキ.',
    '|いらいら|iraira|irritação; impaciência|adv',
    '|がっかり|gakkari|decepção; desânimo|adv|がっかりした = fiquei decepcionado.',
    '|びっくり|bikkuri|susto; surpresa|adv|びっくりした！ = que susto!',
    '|ほっと|hotto|alívio (suspiro de alívio)|adv|ほっとした = fiquei aliviado.',
    '|にこにこ|nikoniko|sorridente; sorrindo|adv'
  ] }
  ] },

{ id: 'lugares', title: 'Lugares', jp: 'ばしょ', emblem: '館', color: '#2f9e8f', theme: 'lugares',
  desc: 'Museu, templo, farmácia, praia: os lugares para passear, resolver coisas e viajar.',
  lessons: [
  { id: 'vlu1', title: 'Passeios', words: [
    '博物館|はくぶつかん|hakubutsukan|museu|subst|館 (kan) = prédio, edifício público. Aparece em vários lugares desta lição.|日曜日に 博物館へ いきます。|nichiyoubi ni hakubutsukan e ikimasu.|No domingo vou ao museu.',
    '美術館|びじゅつかん|bijutsukan|museu de arte|subst',
    '図書館|としょかん|toshokan|biblioteca|subst',
    '公園|こうえん|kouen|parque|subst',
    '動物園|どうぶつえん|doubutsuen|zoológico|subst|動物 (animal) + 園 (jardim).',
    '水族館|すいぞくかん|suizokukan|aquário (lugar)|subst',
    '映画館|えいがかん|eigakan|cinema|subst'
  ] },
  { id: 'vlu2', title: 'Resolver coisas', words: [
    '寺|てら|tera|templo budista|subst|Com o prefixo de respeito: お寺 (otera). Nos nomes, vira 〜寺 (-ji): 金閣寺 (Kinkakuji).',
    '神社|じんじゃ|jinja|santuário xintoísta|subst|Tem o portal 鳥居 (torii) na entrada. Templo (お寺) é budista; santuário (神社) é xintoísta.',
    '病院|びょういん|byouin|hospital; clínica|subst|Não confunda com 美容院 (biyouin), salão de beleza.',
    '薬局|やっきょく|yakkyoku|farmácia|subst|Também se vê ドラッグストア (doraggusutoa), farmácia que vende de tudo.|この ちかくに 薬局は ありますか。|kono chikaku ni yakkyoku wa arimasu ka.|Tem uma farmácia aqui perto?',
    '銀行|ぎんこう|ginkou|banco|subst',
    '郵便局|ゆうびんきょく|yuubinkyoku|correio (agência)|subst',
    '交番|こうばん|kouban|posto policial (de bairro)|subst'
  ] },
  { id: 'vlu3', title: 'Comprar e viajar', words: [
    '|ホテル|hoteru|hotel|subst',
    '空港|くうこう|kuukou|aeroporto|subst',
    '|デパート|depaato|loja de departamentos|subst',
    '|スーパー|suupaa|supermercado|subst|Abreviação de スーパーマーケット.',
    '本屋|ほんや|hon\'ya|livraria|subst|〜屋 (ya) = loja de ~: 本屋 (livros), パン屋 (pão).',
    'パン屋|パンや|pan\'ya|padaria|subst|パン (pão) + 屋 (loja).',
    '喫茶店|きっさてん|kissaten|cafeteria (estilo tradicional)|subst',
    '店|みせ|mise|loja|subst'
  ] },
  { id: 'vlu4', title: 'Natureza e viagem', words: [
    '海|うみ|umi|mar|subst||夏は 海で およぎたい。|natsu wa umi de oyogitai.|No verão quero nadar no mar.',
    '浜辺|はまべ|hamabe|praia (a areia à beira-mar)|subst|Na fala, “ir à praia” costuma ser 海に いく (ir ao mar).',
    '島|しま|shima|ilha|subst',
    '湖|みずうみ|mizuumi|lago|subst',
    '温泉|おんせん|onsen|fonte termal|subst',
    '田舎|いなか|inaka|interior; campo; cidade natal|subst|Leitura especial da palavra inteira.',
    '都会|とかい|tokai|cidade grande|subst'
  ] }
  ] },

{ id: 'comida', title: 'Comida e ingredientes', jp: 'たべもの', emblem: '食', color: '#e09a1e', theme: 'comida',
  desc: 'Refeições, temperos, frutas, legumes e como descrever o sabor.',
  lessons: [
  { id: 'vcm1', title: 'Pratos do dia a dia', words: [
    '|スープ|suupu|sopa|subst',
    '味噌汁|みそしる|misoshiru|sopa de missô|subst|Acompanha quase toda refeição japonesa.',
    '弁当|べんとう|bentou|marmita; bentô|subst|Com o prefixo educado: お弁当 (obentou).',
    '|カレー|karee|curry (com arroz)|subst',
    '|サラダ|sarada|salada|subst',
    '|うどん|udon|udon (macarrão grosso)|subst',
    '|そば|soba|soba (macarrão de trigo-sarraceno)|subst|Mesmo som de そば “ao lado, perto”.',
    '食べ物|たべもの|tabemono|comida; alimento|subst||すきな 食べ物は なんですか。|suki na tabemono wa nan desu ka.|Qual é a sua comida favorita?',
    '飲み物|のみもの|nomimono|bebida|subst'
  ] },
  { id: 'vcm2', title: 'Temperos e ingredientes', words: [
    '砂糖|さとう|satou|açúcar|subst|Mesmo som do sobrenome 佐藤 (Satō), o mais comum do Japão.|コーヒーに 砂糖を いれますか。|koohii ni satou o iremasu ka.|Você põe açúcar no café?',
    '塩|しお|shio|sal|subst',
    '醤油|しょうゆ|shouyu|molho de soja (shoyu)|subst',
    '油|あぶら|abura|óleo|subst',
    '米|こめ|kome|arroz (cru, o grão)|subst|Cru é 米 (kome); cozido, ご飯 (gohan).',
    '小麦粉|こむぎこ|komugiko|farinha de trigo|subst',
    '|バター|bataa|manteiga|subst',
    '|チーズ|chiizu|queijo|subst'
  ] },
  { id: 'vcm3', title: 'Frutas', words: [
    '|オレンジ|orenji|laranja (fruta)|subst',
    '|バナナ|banana|banana|subst',
    '苺|いちご|ichigo|morango|subst|Quase sempre escrito em kana: いちご.',
    '|ぶどう|budou|uva|subst',
    '桃|もも|momo|pêssego|subst',
    '|スイカ|suika|melancia|subst',
    '|みかん|mikan|tangerina (mexerica)|subst|A fruta símbolo do inverno japonês.'
  ] },
  { id: 'vcm4', title: 'Legumes e verduras', words: [
    '人参|にんじん|ninjin|cenoura|subst',
    '玉ねぎ|たまねぎ|tamanegi|cebola|subst',
    '|じゃがいも|jagaimo|batata|subst',
    '|トマト|tomato|tomate|subst',
    '|キャベツ|kyabetsu|repolho|subst',
    '|きのこ|kinoko|cogumelo|subst',
    '大根|だいこん|daikon|nabo japonês (daikon)|subst'
  ] },
  { id: 'vcm5', title: 'Sabores', words: [
    '甘い|あまい|amai|doce (sabor)|adj-i||この ケーキ、甘い！|kono keeki, amai!|Este bolo é doce!',
    '辛い|からい|karai|picante; apimentado|adj-i|O mesmo kanji se lê つらい (tsurai), “duro, sofrido”. Na comida, é からい.',
    '|しょっぱい|shoppai|salgado (sabor)|adj-i',
    '酸っぱい|すっぱい|suppai|azedo|adj-i',
    '苦い|にがい|nigai|amargo|adj-i',
    '熱い|あつい|atsui|quente (ao toque, comida, bebida)|adj-i|Para coisas quentes. O tempo quente é 暑い (mesmo som).|この スープ、熱い！|kono suupu, atsui!|Esta sopa está quente!',
    '冷たい|つめたい|tsumetai|gelado; frio (ao toque)|adj-i|Para coisas frias. O tempo frio é 寒い (samui).',
    '味|あじ|aji|sabor; gosto|subst'
  ] },
  { id: 'vcm6', title: 'Doces e bebidas', words: [
    'お菓子|おかし|okashi|doce; salgadinho; guloseima|subst',
    '|ケーキ|keeki|bolo|subst',
    '|アイス|aisu|sorvete|subst|Abreviação de アイスクリーム.',
    '|チョコレート|chokoreeto|chocolate|subst',
    '紅茶|こうちゃ|koucha|chá preto|subst|Chá verde é お茶 ou 緑茶 (ryokucha).',
    'お酒|おさけ|osake|bebida alcoólica; saquê|subst'
  ] }
  ] },

{ id: 'objetos', title: 'Objetos do dia a dia', jp: 'もの', emblem: '物', color: '#5f7a8a', theme: 'casa',
  desc: 'Papel, caixa, chave, guarda-chuva, utensílios de cozinha e ferramentas de casa.',
  lessons: [
  { id: 'vob1', title: 'Na mochila', words: [
    '紙|かみ|kami|papel|subst|Mesmo som de 髪 (cabelo) e 神 (deus).|紙に なまえを かいて ください。|kami ni namae o kaite kudasai.|Escreva seu nome no papel.',
    '箱|はこ|hako|caixa|subst',
    '新聞|しんぶん|shinbun|jornal|subst|新 (novo) + 聞 (ouvir): “notícias novas”.',
    '傘|かさ|kasa|guarda-chuva|subst||あめだから、傘を もって いこう。|ame dakara, kasa o motte ikou.|Está chovendo, vamos levar o guarda-chuva.',
    '財布|さいふ|saifu|carteira|subst',
    '携帯|けいたい|keitai|celular|subst|Abreviação de 携帯電話 (keitai denwa). Hoje também se diz スマホ.',
    '|スマホ|sumaho|smartphone|subst|Abreviação de スマートフォン.',
    '本|ほん|hon|livro|subst'
  ] },
  { id: 'vob2', title: 'Papelaria', words: [
    '鉛筆|えんぴつ|enpitsu|lápis|subst',
    '|ペン|pen|caneta|subst',
    '消しゴム|けしゴム|keshigomu|borracha (de apagar)|subst|消す (apagar) + ゴム (borracha).',
    '|ノート|nooto|caderno|subst',
    '|はさみ|hasami|tesoura|subst',
    '|のり|nori|cola|subst|Mesmo som de 海苔 (nori), a alga da comida.',
    '定規|じょうぎ|jougi|régua|subst',
    '封筒|ふうとう|fuutou|envelope|subst'
  ] },
  { id: 'vob3', title: 'Na cozinha', words: [
    '皿|さら|sara|prato|subst|Com prefixo: お皿 (osara).',
    '茶碗|ちゃわん|chawan|tigela (de arroz)|subst',
    '|コップ|koppu|copo|subst',
    '箸|はし|hashi|hashi (palitinhos)|subst|Mesmo som de 橋 (ponte). Com prefixo: お箸.',
    '|スプーン|supuun|colher|subst',
    '|フォーク|fooku|garfo|subst',
    '|ナイフ|naifu|faca|subst',
    '鍋|なべ|nabe|panela; ensopado de panela|subst'
  ] },
  { id: 'vob4', title: 'Coisas de casa', words: [
    '道具|どうぐ|dougu|ferramenta; utensílio|subst',
    '電池|でんち|denchi|pilha; bateria|subst',
    '電球|でんきゅう|denkyuu|lâmpada|subst',
    '鏡|かがみ|kagami|espelho|subst',
    '石鹸|せっけん|sekken|sabonete; sabão|subst',
    '|タオル|taoru|toalha|subst',
    '歯ブラシ|はブラシ|haburashi|escova de dentes|subst',
    '|ゴミ|gomi|lixo|subst|No Japão, o lixo é separado: 燃える ゴミ (queimável) e 燃えない ゴミ (não queimável).',
    '袋|ふくろ|fukuro|sacola; saco|subst|Cuidado: ふくろう (com o “o” longo) é coruja!'
  ] }
  ] },

{ id: 'escola', title: 'Escola e rotina', jp: 'がっこう', emblem: '学', color: '#6c43dd', theme: 'escola',
  desc: 'Sala de aula, matérias, provas, férias e os verbos de quem estuda.',
  lessons: [
  { id: 'ves1', title: 'Na sala de aula', words: [
    '学生|がくせい|gakusei|estudante|subst|Em geral, estudante universitário. Alunos do fundamental e médio costumam ser 生徒 (seito).|わたしは 学生です。|watashi wa gakusei desu.|Eu sou estudante.',
    '生徒|せいと|seito|aluno (ensino fundamental e médio)|subst',
    '先生|せんせい|sensei|professor(a); médico(a) (forma de tratamento)|subst|Também se usa para médicos, advogados e autores de mangá.',
    '教室|きょうしつ|kyoushitsu|sala de aula|subst',
    '黒板|こくばん|kokuban|quadro-negro; lousa|subst|黒 (preto) + 板 (placa).',
    '宿題|しゅくだい|shukudai|lição de casa; dever|subst',
    '試験|しけん|shiken|prova; exame|subst',
    '|テスト|tesuto|teste; prova|subst'
  ] },
  { id: 'ves2', title: 'Matérias', words: [
    '数学|すうがく|suugaku|matemática|subst',
    '国語|こくご|kokugo|língua japonesa (matéria escolar)|subst|Nas escolas japonesas, “língua nacional” é o japonês.',
    '英語|えいご|eigo|inglês|subst',
    '歴史|れきし|rekishi|história (matéria)|subst',
    '理科|りか|rika|ciências (matéria)|subst',
    '体育|たいいく|taiiku|educação física|subst',
    '音楽|おんがく|ongaku|música|subst',
    '美術|びじゅつ|bijutsu|artes (matéria)|subst'
  ] },
  { id: 'ves3', title: 'Rotina e férias', words: [
    '休み|やすみ|yasumi|descanso; folga; férias (curtas); feriado|subst|Muito comum: 今日は 休みです = hoje é folga. お休み = boa noite, ao ir dormir (casual).|あしたは 休みです。|ashita wa yasumi desu.|Amanhã é folga.',
    '休暇|きゅうか|kyuuka|férias; licença (do trabalho, formal)|subst|Mais formal que 休み. Usado para férias de trabalho.',
    '夏休み|なつやすみ|natsuyasumi|férias de verão|subst',
    '授業|じゅぎょう|jugyou|aula|subst',
    '部活|ぶかつ|bukatsu|atividade de clube (escolar)|subst|Abreviação de 部活動. Clube de futebol, de música, de mangá...',
    '給食|きゅうしょく|kyuushoku|merenda escolar|subst',
    '遅刻|ちこく|chikoku|atraso (chegar atrasado)|subst',
    '卒業|そつぎょう|sotsugyou|formatura; conclusão do curso|subst'
  ] },
  { id: 'ves4', title: 'Aprender', words: [
    '勉強|べんきょう|benkyou|estudo; estudar (com する)|subst||まいにち 日本語を 勉強して います。|mainichi nihongo o benkyou shite imasu.|Estudo japonês todos os dias.',
    '教える|おしえる|oshieru|ensinar; contar (informação)|verbo',
    '習う|ならう|narau|aprender (com alguém, em aulas)|verbo',
    '覚える|おぼえる|oboeru|memorizar; lembrar-se|verbo',
    '忘れる|わすれる|wasureru|esquecer|verbo',
    '答える|こたえる|kotaeru|responder|verbo',
    '質問|しつもん|shitsumon|pergunta|subst|質問が あります = tenho uma pergunta.',
    '意味|いみ|imi|significado|subst|どういう 意味ですか = o que significa?'
  ] }
  ] },

{ id: 'adjetivos', title: 'Adjetivos e descrições', jp: 'けいようし', emblem: '大', color: '#c4692a', theme: 'descricao',
  desc: 'Pares de opostos e palavras para descrever pessoas, coisas e lugares.',
  lessons: [
  { id: 'vad1', title: 'Rápido, forte, pesado', words: [
    '速い|はやい|hayai|rápido (velocidade)|adj-i|Mesmo som de 早い (cedo).',
    '遅い|おそい|osoi|lento; tarde; atrasado|adj-i',
    '強い|つよい|tsuyoi|forte|adj-i',
    '弱い|よわい|yowai|fraco|adj-i',
    '重い|おもい|omoi|pesado|adj-i',
    '軽い|かるい|karui|leve|adj-i',
    '低い|ひくい|hikui|baixo (altura)|adj-i|O contrário de 高い (alto).'
  ] },
  { id: 'vad2', title: 'Espaço e luz', words: [
    '広い|ひろい|hiroi|amplo; espaçoso; largo|adj-i',
    '狭い|せまい|semai|apertado; estreito; pequeno (espaço)|adj-i',
    '明るい|あかるい|akarui|claro (iluminado); alegre (pessoa)|adj-i',
    '暗い|くらい|kurai|escuro; sombrio (pessoa)|adj-i',
    '近い|ちかい|chikai|perto; próximo|adj-i',
    '遠い|とおい|tooi|longe; distante|adj-i',
    '深い|ふかい|fukai|profundo; fundo|adj-i'
  ] },
  { id: 'vad3', title: 'Fácil, difícil, perigoso', words: [
    '易しい|やさしい|yasashii|fácil (questão, texto)|adj-i|Mesmo som de 優しい (gentil). Escritos diferentes, sentidos diferentes.',
    '優しい|やさしい|yasashii|gentil; bondoso|adj-i|Para pessoas: 優しい 人 = uma pessoa gentil.',
    '難しい|むずかしい|muzukashii|difícil|adj-i',
    '簡単|かんたん|kantan|simples; fácil|adj-na',
    '危ない|あぶない|abunai|perigoso; “cuidado!”|adj-i|Sozinho, あぶない！ é um grito de aviso: cuidado!',
    '大切|たいせつ|taisetsu|importante; precioso|adj-na',
    '便利|べんり|benri|prático; conveniente|adj-na',
    '有名|ゆうめい|yuumei|famoso|adj-na'
  ] },
  { id: 'vad4', title: 'Pessoas e lugares', words: [
    '若い|わかい|wakai|jovem|adj-i',
    '静か|しずか|shizuka|silencioso; calmo|adj-na',
    '賑やか|にぎやか|nigiyaka|animado; movimentado|adj-na',
    '汚い|きたない|kitanai|sujo|adj-i',
    '|つまらない|tsumaranai|chato; sem graça|adj-i',
    '忙しい|いそがしい|isogashii|ocupado|adj-i',
    '暇|ひま|hima|livre (sem nada para fazer); tempo livre|adj-na|ひまですか？ = está livre?',
    '素敵|すてき|suteki|lindo; encantador; maravilhoso|adj-na'
  ] }
  ] },

{ id: 'adverbios', title: 'Advérbios', jp: 'ふくし', emblem: '副', color: '#4a8f3a', theme: 'adverbios',
  desc: 'Sempre, às vezes, nunca, ainda, logo, talvez: as palavrinhas que dão sentido às frases.',
  lessons: [
  { id: 'vav1', title: 'Com que frequência?', words: [
    '|いつも|itsumo|sempre|adv||いつも ありがとう。|itsumo arigatou.|Obrigado por tudo (sempre).',
    '時々|ときどき|tokidoki|às vezes|adv|々 repete o kanji anterior: 時々 = 時時.',
    '|よく|yoku|frequentemente; bem|adv|Dois sentidos: よく いく (vou sempre) e よく できた (ficou bem feito).',
    '|たまに|tamani|de vez em quando|adv',
    '毎日|まいにち|mainichi|todo dia; diariamente|adv',
    '全然|ぜんぜん|zenzen|nem um pouco; de jeito nenhum (com negativa)|adv|Vem com verbo ou adjetivo negativo: 全然 わからない = não entendo nada.|全然 わからない。|zenzen wakaranai.|Não entendo nada.',
    '|あまり|amari|não muito (com negativa)|adv|あまり すきじゃない = não gosto muito.',
    '一度も|いちども|ichido mo|nunca; nem uma vez (com negativa)|adv|O japonês não tem uma palavra só para “nunca”: diz-se 一度も + negativa.|日本に 一度も いった ことが ない。|nihon ni ichido mo itta koto ga nai.|Nunca fui ao Japão.'
  ] },
  { id: 'vav2', title: 'Quando?', words: [
    '|もう|mou|já; mais (com quantidade)|adv|もう たべた = já comi. もう ひとつ = mais um.',
    '|まだ|mada|ainda; ainda não (com negativa)|adv|まだです = ainda não.',
    '|すぐ|sugu|logo; imediatamente|adv||すぐ いきます！|sugu ikimasu!|Já vou!',
    '後で|あとで|ato de|depois; mais tarde|adv',
    '|さっき|sakki|agora há pouco|adv',
    '|そろそろ|sorosoro|daqui a pouco; já está na hora|adv|そろそろ かえります = já vou indo.',
    '先に|さきに|saki ni|antes; primeiro (na frente)|adv|お先に = com licença, vou na frente.',
    '今|いま|ima|agora|subst'
  ] },
  { id: 'vav3', title: 'Quanto?', words: [
    '|とても|totemo|muito|adv',
    '|すごく|sugoku|muito; demais (casual)|adv',
    '|ちょっと|chotto|um pouco; um momento|adv|ちょっと… sozinho é um jeito educado de recusar.',
    '少し|すこし|sukoshi|um pouco|adv',
    '|もっと|motto|mais|adv',
    '一番|いちばん|ichiban|o mais; número um|adv',
    '本当に|ほんとうに|hontou ni|realmente; de verdade|adv',
    '大体|だいたい|daitai|mais ou menos; quase tudo|adv'
  ] },
  { id: 'vav4', title: 'Outros advérbios', words: [
    '|また|mata|de novo; outra vez|adv|また ね = até a próxima.',
    '多分|たぶん|tabun|talvez; provavelmente|adv',
    '|きっと|kitto|com certeza; certamente|adv',
    '一緒に|いっしょに|issho ni|juntos|adv||一緒に いこう！|issho ni ikou!|Vamos juntos!',
    '|ゆっくり|yukkuri|devagar; com calma|adv|ゆっくり して ください = fique à vontade.',
    '早く|はやく|hayaku|cedo; rápido|adv',
    '特に|とくに|toku ni|especialmente|adv',
    '|やっと|yatto|finalmente (depois de esforço)|adv',
    '|だけ|dake|só; apenas|part|Vem depois da palavra: ひとつ だけ = só um.'
  ] }
  ] },

{ id: 'cores', title: 'Cores', jp: 'いろ', emblem: '色', color: '#d14b8f', theme: 'cores',
  desc: 'As cores como substantivo e como adjetivo, do vermelho ao prateado.',
  lessons: [
  { id: 'vcr1', title: 'Cores principais', words: [
    '色|いろ|iro|cor|subst||なに 色が すきですか。|nani iro ga suki desu ka.|De que cor você gosta?',
    '赤|あか|aka|vermelho|subst',
    '青|あお|ao|azul; verde (sinal de trânsito, vegetação)|subst|Tradicionalmente 青 cobre azul e alguns verdes: o sinal verde do semáforo é 青.',
    '黄色|きいろ|kiiro|amarelo|subst',
    '緑|みどり|midori|verde|subst',
    '白|しろ|shiro|branco|subst|Mesmo som de 城 (castelo).',
    '黒|くろ|kuro|preto|subst'
  ] },
  { id: 'vcr2', title: 'Mais cores', words: [
    '茶色|ちゃいろ|chairo|marrom|subst|“Cor de chá”.',
    '灰色|はいいろ|haiiro|cinza|subst|“Cor de cinza (de fogueira)”. Também se diz グレー (guree).',
    'オレンジ色|オレンジいろ|orenjiiro|laranja (cor)|subst',
    '|ピンク|pinku|rosa (cor)|subst',
    '紫|むらさき|murasaki|roxo; violeta|subst',
    '金色|きんいろ|kin\'iro|dourado|subst',
    '銀色|ぎんいろ|gin\'iro|prateado|subst'
  ] },
  { id: 'vcr3', title: 'Cores como adjetivo', words: [
    '赤い|あかい|akai|vermelho (adjetivo)|adj-i|Só algumas cores viram adjetivo -i: 赤い, 青い, 白い, 黒い, 黄色い, 茶色い.|赤い くるま|akai kuruma|um carro vermelho',
    '青い|あおい|aoi|azul (adjetivo)|adj-i',
    '白い|しろい|shiroi|branco (adjetivo)|adj-i',
    '黒い|くろい|kuroi|preto (adjetivo)|adj-i',
    '黄色い|きいろい|kiiroi|amarelo (adjetivo)|adj-i',
    '茶色い|ちゃいろい|chairoi|marrom (adjetivo)|adj-i'
  ] }
  ] },

{ id: 'pessoas', title: 'Pessoas e família', jp: 'ひと', emblem: '人', color: '#b8583a', theme: 'familia',
  desc: 'Família (a minha e a dos outros), pessoas e relações do dia a dia.',
  lessons: [
  { id: 'vpe1', title: 'Minha família', words: [
    '家族|かぞく|kazoku|família|subst',
    '父|ちち|chichi|(meu) pai|subst|Ao falar do próprio pai para outras pessoas. O pai de outra pessoa (ou chamar o seu) é お父さん.',
    '母|はは|haha|(minha) mãe|subst|Ao falar da própria mãe para outras pessoas. A mãe de outra pessoa é お母さん.',
    'お父さん|おとうさん|otousan|pai (de outra pessoa; ao chamar o próprio)|subst',
    'お母さん|おかあさん|okaasan|mãe (de outra pessoa; ao chamar a própria)|subst',
    '兄|あに|ani|(meu) irmão mais velho|subst|O irmão mais velho de outra pessoa é お兄さん (oniisan).',
    '姉|あね|ane|(minha) irmã mais velha|subst|A de outra pessoa é お姉さん (oneesan).',
    '弟|おとうと|otouto|irmão mais novo|subst',
    '妹|いもうと|imouto|irmã mais nova|subst'
  ] },
  { id: 'vpe2', title: 'Família completa', words: [
    '息子|むすこ|musuko|filho|subst',
    '娘|むすめ|musume|filha; moça|subst',
    '夫|おっと|otto|(meu) marido|subst',
    '妻|つま|tsuma|(minha) esposa|subst',
    '赤ちゃん|あかちゃん|akachan|bebê|subst|赤 (vermelho) + ちゃん: o bebê “vermelhinho” recém-nascido.',
    '祖父|そふ|sofu|(meu) avô|subst|O avô de outra pessoa (ou um senhor idoso) é おじいさん.',
    '祖母|そぼ|sobo|(minha) avó|subst|A avó de outra pessoa (ou uma senhora idosa) é おばあさん.',
    '両親|りょうしん|ryoushin|pais (pai e mãe)|subst',
    '兄弟|きょうだい|kyoudai|irmãos|subst'
  ] },
  { id: 'vpe3', title: 'Pessoas', words: [
    '人|ひと|hito|pessoa|subst',
    '男の人|おとこのひと|otoko no hito|homem|subst',
    '女の人|おんなのひと|onna no hito|mulher|subst',
    '子供|こども|kodomo|criança; filho(s)|subst',
    '大人|おとな|otona|adulto|subst|Leitura especial: 大 (grande) + 人 (pessoa) = おとな.',
    '友達|ともだち|tomodachi|amigo(a)|subst',
    '恋人|こいびと|koibito|namorado(a); amor|subst',
    '彼氏|かれし|kareshi|namorado|subst',
    '彼女|かのじょ|kanojo|ela; namorada|subst|Dois sentidos: “ela” e “namorada”. O contexto mostra qual.'
  ] },
  { id: 'vpe4', title: 'Relações', words: [
    '先輩|せんぱい|senpai|veterano(a) (na escola, no trabalho)|subst|Quem entrou antes. Muito comum em animes: “senpai!”.',
    '後輩|こうはい|kouhai|calouro(a); novato(a)|subst',
    '仲間|なかま|nakama|companheiro(a); parceiro(a) de equipe|subst|A palavra favorita dos animes de aventura: os amigos que lutam juntos.',
    '隣|となり|tonari|vizinho (ao lado); do lado|subst',
    '近所|きんじょ|kinjo|vizinhança; arredores|subst',
    'お客さん|おきゃくさん|okyakusan|cliente; visita|subst',
    '自分|じぶん|jibun|si mesmo; a própria pessoa|pron'
  ] }
  ] },

{ id: 'profissoes', title: 'Profissões', jp: 'しごと', emblem: '職', color: '#3b6ea8', theme: 'profissoes',
  desc: 'Profissões comuns, o mundo do trabalho e as profissões de anime e mangá.',
  lessons: [
  { id: 'vpr1', title: 'Profissões comuns', words: [
    '医者|いしゃ|isha|médico(a)|subst|Ao chamar o médico, usa-se 先生 (sensei).',
    '看護師|かんごし|kangoshi|enfermeiro(a)|subst',
    '警察官|けいさつかん|keisatsukan|policial|subst|Na fala, おまわりさん é o jeito simpático de chamar o policial.',
    '会社員|かいしゃいん|kaishain|funcionário(a) de empresa|subst',
    '店員|てんいん|ten\'in|atendente; balconista|subst',
    '運転手|うんてんしゅ|untenshu|motorista|subst',
    '消防士|しょうぼうし|shouboushi|bombeiro(a)|subst',
    '弁護士|べんごし|bengoshi|advogado(a)|subst'
  ] },
  { id: 'vpr2', title: 'Arte e mais', words: [
    '料理人|りょうりにん|ryourinin|cozinheiro(a)|subst|Em restaurantes, o chef costuma ser chamado de シェフ ou 板前 (itamae, cozinha japonesa).',
    '歌手|かしゅ|kashu|cantor(a)|subst',
    '漫画家|まんがか|mangaka|mangaká (autor de mangá)|subst',
    '声優|せいゆう|seiyuu|dublador(a) (de anime e jogos)|subst',
    '農家|のうか|nouka|agricultor(a); família de agricultores|subst',
    '|エンジニア|enjinia|engenheiro(a)|subst',
    '|パイロット|pairotto|piloto (de avião)|subst'
  ] },
  { id: 'vpr3', title: 'O trabalho', words: [
    '仕事|しごと|shigoto|trabalho; emprego|subst||お仕事は なんですか。|oshigoto wa nan desu ka.|Qual é a sua profissão?',
    '会社|かいしゃ|kaisha|empresa|subst',
    '働く|はたらく|hataraku|trabalhar|verbo',
    '|アルバイト|arubaito|bico; trabalho de meio período|subst|Do alemão “Arbeit”. Abreviado: バイト.',
    '社長|しゃちょう|shachou|presidente (de empresa); dono|subst',
    '給料|きゅうりょう|kyuuryou|salário|subst'
  ] }
  ] },

{ id: 'cidade', title: 'Cidade e transporte', jp: 'まち', emblem: '車', color: '#2f6fb0', theme: 'transporte',
  desc: 'Meios de transporte, ruas, semáforos e como pedir e entender direções.',
  lessons: [
  { id: 'vci1', title: 'Transportes', words: [
    '電車|でんしゃ|densha|trem|subst',
    '地下鉄|ちかてつ|chikatetsu|metrô|subst|地下 (subterrâneo) + 鉄 (ferro, ferrovia).',
    '|バス|basu|ônibus|subst',
    '|タクシー|takushii|táxi|subst',
    '自転車|じてんしゃ|jitensha|bicicleta|subst',
    '車|くるま|kuruma|carro|subst',
    '飛行機|ひこうき|hikouki|avião|subst',
    '船|ふね|fune|navio; barco|subst'
  ] },
  { id: 'vci2', title: 'Na rua', words: [
    '道|みち|michi|caminho; rua; estrada|subst',
    '信号|しんごう|shingou|semáforo|subst||信号が 青に なった。|shingou ga ao ni natta.|O semáforo ficou verde.',
    '交差点|こうさてん|kousaten|cruzamento|subst',
    '横断歩道|おうだんほどう|oudanhodou|faixa de pedestres|subst',
    '橋|はし|hashi|ponte|subst|Mesmo som de 箸 (hashi). A entonação muda: はし (ponte) sobe no final.',
    '建物|たてもの|tatemono|prédio; construção|subst',
    '|ビル|biru|edifício (prédio comercial)|subst|De “building”. Não é “conta” (bill).',
    '駐車場|ちゅうしゃじょう|chuushajou|estacionamento|subst'
  ] },
  { id: 'vci3', title: 'Direções', words: [
    '右|みぎ|migi|direita|subst',
    '左|ひだり|hidari|esquerda|subst',
    '|まっすぐ|massugu|reto; em frente|adv||まっすぐ いって ください。|massugu itte kudasai.|Siga em frente, por favor.',
    '地図|ちず|chizu|mapa|subst',
    '切符|きっぷ|kippu|bilhete; passagem|subst',
    '乗る|のる|noru|embarcar; pegar (condução); andar de|verbo|Usa に: 電車に 乗る = pegar o trem.',
    '降りる|おりる|oriru|descer (da condução)|verbo',
    '乗り換え|のりかえ|norikae|baldeação (troca de linha)|subst'
  ] }
  ] },

{ id: 'natureza', title: 'Natureza e clima', jp: 'しぜん', emblem: '天', color: '#2a9d5c', theme: 'natureza',
  desc: 'O tempo, as estações e a natureza: do arco-íris ao tufão.',
  lessons: [
  { id: 'vna1', title: 'Como está o tempo?', words: [
    '天気|てんき|tenki|tempo (clima do dia); bom tempo|subst||今日は いい 天気ですね。|kyou wa ii tenki desu ne.|Que tempo bom hoje, né?',
    '晴れ|はれ|hare|céu limpo; tempo bom|subst',
    '雨|あめ|ame|chuva|subst|Mesmo som de 飴 (bala, doce).',
    '雪|ゆき|yuki|neve|subst',
    '曇り|くもり|kumori|nublado|subst',
    '風|かぜ|kaze|vento|subst|Mesmo som de 風邪 (resfriado).',
    '雷|かみなり|kaminari|trovão; raio|subst',
    '台風|たいふう|taifuu|tufão|subst'
  ] },
  { id: 'vna2', title: 'Calor e frio', words: [
    '暑い|あつい|atsui|quente (clima, dia)|adj-i|Para o tempo. Coisas quentes ao toque são 熱い (mesmo som).|今日は 暑い！|kyou wa atsui!|Hoje está quente!',
    '寒い|さむい|samui|frio (clima, dia)|adj-i',
    '暖かい|あたたかい|atatakai|morno; agradável (temperatura)|adj-i',
    '涼しい|すずしい|suzushii|fresco; agradavelmente frio|adj-i',
    '天気予報|てんきよほう|tenkiyohou|previsão do tempo|subst',
    '気温|きおん|kion|temperatura (do ar)|subst',
    '虹|にじ|niji|arco-íris|subst'
  ] },
  { id: 'vna3', title: 'Céu e terra', words: [
    '空|そら|sora|céu|subst',
    '太陽|たいよう|taiyou|sol|subst',
    '月|つき|tsuki|lua; mês|subst',
    '星|ほし|hoshi|estrela|subst',
    '石|いし|ishi|pedra|subst',
    '草|くさ|kusa|grama; mato|subst|Na internet japonesa, 草 (ou www) quer dizer “risos”.',
    '葉|は|ha|folha|subst|Também se diz 葉っぱ (happa).',
    '森|もり|mori|floresta; bosque|subst'
  ] },
  { id: 'vna4', title: 'Estações do ano', words: [
    '春|はる|haru|primavera|subst',
    '夏|なつ|natsu|verão|subst',
    '秋|あき|aki|outono|subst',
    '冬|ふゆ|fuyu|inverno|subst',
    '季節|きせつ|kisetsu|estação do ano|subst',
    '桜|さくら|sakura|cerejeira; flor de cerejeira|subst',
    '紅葉|こうよう|kouyou|folhas coloridas de outono|subst|Também se lê もみじ (momiji), que é também o nome do bordo japonês.'
  ] }
  ] },

{ id: 'anime', title: 'Anime, jogos e diversão', jp: 'アニメ', emblem: '遊', color: '#8a3fd1', theme: 'anime',
  desc: 'As palavras que mais aparecem em animes, jogos e músicas: herói, vilão, batalha, sonho, promessa.',
  lessons: [
  { id: 'vat1', title: 'Personagens', words: [
    '漫画|まんが|manga|mangá; história em quadrinhos|subst',
    '|アニメ|anime|anime; desenho animado|subst',
    '|ゲーム|geemu|jogo; videogame|subst',
    '映画|えいが|eiga|filme|subst',
    '主人公|しゅじんこう|shujinkou|protagonista|subst',
    '悪役|あくやく|akuyaku|vilão|subst|悪 (mal) + 役 (papel).',
    '敵|てき|teki|inimigo|subst',
    '味方|みかた|mikata|aliado; do mesmo lado|subst'
  ] },
  { id: 'vat2', title: 'Frases de batalha', words: [
    '戦い|たたかい|tatakai|batalha; luta|subst',
    '勝つ|かつ|katsu|vencer; ganhar|verbo||ぜったいに 勝つ！|zettai ni katsu!|Eu vou vencer, com certeza!',
    '負ける|まける|makeru|perder (uma disputa)|verbo',
    '力|ちから|chikara|força; poder|subst',
    '夢|ゆめ|yume|sonho|subst',
    '約束|やくそく|yakusoku|promessa; compromisso marcado|subst||約束だよ！|yakusoku da yo!|É uma promessa!',
    '運命|うんめい|unmei|destino|subst',
    '必殺技|ひっさつわざ|hissatsuwaza|golpe especial; golpe final|subst'
  ] },
  { id: 'vat3', title: 'Diversão', words: [
    '趣味|しゅみ|shumi|hobby; passatempo|subst||趣味は ゲームです。|shumi wa geemu desu.|Meu hobby é videogame.',
    '歌|うた|uta|canção; música cantada|subst',
    '歌う|うたう|utau|cantar|verbo',
    '踊る|おどる|odoru|dançar|verbo',
    '声|こえ|koe|voz|subst',
    '話|はなし|hanashi|história; conversa; assunto|subst',
    '物語|ものがたり|monogatari|narrativa; conto|subst',
    '続き|つづき|tsuzuki|continuação|subst|Em animes: つづく = continua.',
    '最終回|さいしゅうかい|saishuukai|último episódio|subst'
  ] }
  ] },

{ id: 'verbos', title: 'Verbos do dia a dia', jp: 'どうし', emblem: '行', color: '#d24a3c', theme: 'acoes',
  desc: 'Sentar, correr, esperar, procurar, encontrar: os verbos que você vai ouvir todos os dias.',
  lessons: [
  { id: 'vve1', title: 'Corpo em movimento', words: [
    '座る|すわる|suwaru|sentar-se|verbo|Usa に: いすに 座る = sentar na cadeira.|どうぞ、座って ください。|douzo, suwatte kudasai.|Por favor, sente-se.',
    '立つ|たつ|tatsu|ficar de pé; levantar-se|verbo',
    '歩く|あるく|aruku|andar; caminhar|verbo',
    '走る|はしる|hashiru|correr|verbo',
    '起きる|おきる|okiru|acordar; levantar (da cama)|verbo',
    '寝る|ねる|neru|dormir; deitar-se|verbo',
    '入る|はいる|hairu|entrar|verbo',
    '出る|でる|deru|sair|verbo'
  ] },
  { id: 'vve2', title: 'Mãos à obra', words: [
    '待つ|まつ|matsu|esperar|verbo|ちょっと 待って！ = espera um pouco!',
    '開ける|あける|akeru|abrir|verbo',
    '閉める|しめる|shimeru|fechar|verbo',
    '使う|つかう|tsukau|usar|verbo',
    '作る|つくる|tsukuru|fazer; preparar; criar|verbo',
    '洗う|あらう|arau|lavar|verbo',
    '持つ|もつ|motsu|segurar; carregar; ter|verbo',
    '置く|おく|oku|colocar; pôr; deixar|verbo'
  ] },
  { id: 'vve3', title: 'Procurar e encontrar', words: [
    '探す|さがす|sagasu|procurar|verbo||かぎを 探して いる。|kagi o sagashite iru.|Estou procurando a chave.',
    '見つける|みつける|mitsukeru|encontrar; achar|verbo',
    '買う|かう|kau|comprar|verbo|Mesmo som de 飼う (criar animal).',
    '売る|うる|uru|vender|verbo',
    '会う|あう|au|encontrar-se (com alguém)|verbo|Usa に: 友達に 会う = encontrar um amigo.',
    '始まる|はじまる|hajimaru|começar|verbo',
    '終わる|おわる|owaru|terminar; acabar|verbo',
    '分かる|わかる|wakaru|entender; saber|verbo'
  ] }
  ] },

{ id: 'aventura', title: 'Aventura e fantasia', jp: 'ぼうけん', emblem: '剣', color: '#9c3b3b', theme: 'aventura',
  desc: 'Espadas, magias, monstros e tesouros: o vocabulário dos RPGs, que também aparece no Adventure Mode.',
  lessons: [
  { id: 'vaf1', title: 'Armas e equipamentos', words: [
    '剣|けん|ken|espada|subst|Também se lê つるぎ (tsurugi), mais poético.',
    '盾|たて|tate|escudo|subst',
    '鎧|よろい|yoroi|armadura|subst',
    '弓|ゆみ|yumi|arco (arma)|subst',
    '矢|や|ya|flecha|subst',
    '杖|つえ|tsue|cajado; bengala|subst',
    '宝箱|たからばこ|takarabako|baú do tesouro|subst',
    '宝|たから|takara|tesouro|subst'
  ] },
  { id: 'vaf2', title: 'Heróis e monstros', words: [
    '勇者|ゆうしゃ|yuusha|herói (de aventura)|subst',
    '魔法|まほう|mahou|magia|subst',
    '魔王|まおう|maou|rei demônio; lorde das trevas|subst',
    '竜|りゅう|ryuu|dragão|subst|Também se diz ドラゴン (doragon).',
    '鬼|おに|oni|ogro; demônio (oni)|subst',
    '幽霊|ゆうれい|yuurei|fantasma|subst',
    '怪物|かいぶつ|kaibutsu|monstro|subst|Em jogos, também モンスター.',
    '呪文|じゅもん|jumon|feitiço; encantamento|subst'
  ] },
  { id: 'vaf3', title: 'Lugares e materiais', words: [
    '冒険|ぼうけん|bouken|aventura|subst',
    '旅|たび|tabi|viagem; jornada|subst',
    '洞窟|どうくつ|doukutsu|caverna|subst',
    '城|しろ|shiro|castelo|subst|Mesmo som de 白 (branco).',
    '村|むら|mura|vila; aldeia|subst',
    '鉄|てつ|tetsu|ferro|subst',
    '宝石|ほうせき|houseki|pedra preciosa; joia|subst',
    '薬草|やくそう|yakusou|erva medicinal|subst'
  ] },
  { id: 'vaf4', title: 'Verbos de ação', words: [
    '戦う|たたかう|tatakau|lutar; batalhar|verbo||いっしょに 戦おう！|issho ni tatakaou!|Vamos lutar juntos!',
    '守る|まもる|mamoru|proteger; cumprir (promessa)|verbo',
    '倒す|たおす|taosu|derrotar; derrubar|verbo',
    '逃げる|にげる|nigeru|fugir|verbo|逃げろ！ = fuja!',
    '助ける|たすける|tasukeru|ajudar; salvar|verbo|助けて！ = socorro!',
    '攻撃|こうげき|kougeki|ataque|subst',
    '回復|かいふく|kaifuku|recuperação (de vida, energia)|subst'
  ] }
  ] }
];
/* nome de cada classe gramatical nos cartões da Academia de Vocabulário (o Dicionário usa DICT_POS) */
const VOCAB_POS = { subst: 'substantivo', verbo: 'verbo', 'adj-i': 'adjetivo -i', 'adj-na': 'adjetivo -na', adv: 'advérbio', expr: 'expressão', pron: 'pronome', num: 'número', cont: 'contador', part: 'partícula', interj: 'interjeição' };
