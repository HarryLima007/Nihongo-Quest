/* ==========================================================
   Nihongo Quest 9.0 — JAPANESE READING (dados)
   Curso de leitura em 5 etapas, sempre nesta ordem:
     hira (Hiragana) → kata (Katakana) → pal (Palavras) → kan (Kanji) → fra (Frases e leituras)
   Regra de ouro (verificada em tests/reading-content.js): nenhuma palavra, exercício ou frase usa
   um caractere que o aluno ainda não estudou, a não ser que ele seja apresentado ali como novo
   (campo `novo` nas frases).

   Formatos (strings separadas por "|"):
   - chars:  'caractere|romaji|associação visual|observação de pronúncia (opcional)'
             romaji entre parênteses = sinal sem som próprio (っ, ッ, ー), estudado só dentro de palavras.
   - words:  'kana|romaji|português'                         (palavra escrita só em kana)
             'escrita|leitura|romaji|português|observação'   (palavra com kanji; "・" separa os pedaços
             que se correspondem na escrita e na leitura: 学・校|がっ・こう. Sem "・" = leitura especial
             da palavra inteira, como 大人 = おとな)
   - kanji:  'kanji|significado|leituras explicadas|associação visual'
   - frases: 'japonês|leitura em kana|romaji|português|partes|observação'
             partes: 'pedaço=romaji=explicação/pedaço=romaji=explicação...'
   - pares (lições de parecidos): 'a b c|dica para diferenciar'
   Ids de lição e de item nunca mudam (o progresso salvo depende deles).
   ========================================================== */
const READ_COURSE = [
{
  id: 'hira', title: 'Hiragana', jp: 'ひらがな', emblem: 'あ', color: '#e2557b',
  desc: 'O primeiro sistema de escrita: cada caractere é um som. Com ele você já lê palavras de verdade.',
  lessons: [
  {
    id: 'h1', title: 'As cinco vogais', emblem: 'あ',
    intro: ['O japonês tem só 5 vogais, e elas soam quase como no português: a, i, u, e, o. Sempre curtas e limpas.',
      'Hiragana é um silabário: cada caractere é um som inteiro. Não existem letras mudas nem sons que mudam conforme a palavra.',
      'Aqui você não precisa escrever. O objetivo é reconhecer o caractere e ligar ao som.'],
    chars: ['あ|a|Uma cruz com um laço grande embaixo: “Aaah, que laço bonito!”|Como o “a” de “casa”.',
      'い|i|Dois tracinhos lado a lado, como duas pessoas em fila: “i-i”.|Como o “i” de “vida”.',
      'う|u|Um tracinho em cima e uma curva: uma orelha ouvindo “uuu”.|Como o “u” de “uva”, com os lábios menos arredondados.',
      'え|e|Um tracinho em cima e um caminho em ziguezague: um “e”levador que sobe e desce.|Entre o “ê” e o “é”.',
      'お|o|Parece あ com um tracinho a mais à direita: um “Oh!” de surpresa.|Como o “o” de “ovo”.'],
    words: ['あい|ai|amor', 'いえ|ie|casa', 'うえ|ue|em cima', 'あお|ao|azul', 'いい|ii|bom', 'いいえ|iie|não', 'え|e|desenho, pintura', 'あう|au|encontrar(-se)'],
    tip: 'Duas vogais iguais seguidas (いい) são um som mais longo: “iii”. Isso muda o significado das palavras.'
  },
  {
    id: 'h2', title: 'Linha K: か き く け こ', emblem: 'か',
    intro: ['Agora as vogais ganham a consoante K: ka, ki, ku, ke, ko.',
      'O K japonês é sempre duro, como em “casa” e “quilo”. き é “qui”, け é “quê”.'],
    chars: ['か|ka|Uma pessoa dando um golpe de caratê; o tracinho é o grito: “KA!”',
      'き|ki|Parece uma chave antiga com dentes: “ki”.|Soa como “qui”.',
      'く|ku|O bico aberto de um passarinho cantando “cu-cu”.',
      'け|ke|Uma cerca com um portão aberto: “quê?”.|Soa como “quê”.',
      'こ|ko|Dois tracinhos paralelos, como dois “co”legas lado a lado.'],
    words: ['かお|kao|rosto', 'あか|aka|vermelho', 'いけ|ike|lago', 'こい|koi|carpa', 'えき|eki|estação', 'きく|kiku|ouvir', 'ここ|koko|aqui', 'あき|aki|outono', 'いく|iku|ir', 'おおきい|ookii|grande'],
    tip: 'Leia cada caractere e junte os sons: か + お = kao (rosto).'
  },
  {
    id: 'h3', title: 'Linha S: さ し す せ そ', emblem: 'さ',
    intro: ['Linha S: sa, shi, su, se, so.',
      'Atenção: し não é “si”, é “shi” (parecido com “xi”). Esse é o único som diferente da linha.'],
    chars: ['さ|sa|Um samurai com a espada erguida (o traço de cima) e a bainha curva embaixo.|Parecido com き, mas com um traço a menos.',
      'し|shi|Um anzol ou um fio de cabelo comprido: “shi”.|Soa “shi”, como “xi”, nunca “si”.',
      'す|su|Um balanço que dá uma volta no meio: “su”bindo e descendo.|O “u” costuma ficar bem fraco: です soa quase “dess”.',
      'せ|se|Um traço longo cortado por uma curva que desce: um “se”lo sendo carimbado.',
      'そ|so|Um ziguezague como uma costura: “so”.'],
    words: ['すし|sushi|sushi', 'あさ|asa|manhã', 'いす|isu|cadeira', 'かさ|kasa|guarda-chuva', 'しお|shio|sal', 'せかい|sekai|mundo', 'そこ|soko|aí, ali', 'うそ|uso|mentira', 'すき|suki|gostar', 'あし|ashi|pé, perna'],
    tip: 'すし: o “u” de す quase some na fala rápida. Ouça e repare.'
  },
  {
    id: 'h4', title: 'Linha T: た ち つ て と', emblem: 'た',
    intro: ['Linha T: ta, chi, tsu, te, to.',
      'Dois sons especiais: ち é “chi” (como “tchi”) e つ é “tsu” (o T e o S juntos, rápido). Não existe “ti” nem “tu” aqui.'],
    chars: ['た|ta|Parece as letras “t” e “a” juntinhas: “ta”!',
      'ち|chi|Uma pessoa espirrando: “A-tchim!”.|Soa “tchi”.',
      'つ|tsu|Uma onda de tsunami se formando.|Soa “tsu”: o T e o S juntos.',
      'て|te|Um braço esticado com a mão aberta (て = mão!).',
      'と|to|Um prego espetado num toco de madeira: “to”.'],
    words: ['たこ|tako|polvo', 'くち|kuchi|boca', 'つくえ|tsukue|mesa, carteira', 'て|te|mão', 'そと|soto|fora', 'ちかい|chikai|perto', 'あつい|atsui|quente', 'いと|ito|fio, linha', 'した|shita|embaixo', 'きた|kita|norte'],
    tip: 'つ aparece muito. Repita: tsu, tsu, tsukue.'
  },
  {
    id: 'h5', title: 'Linha N: な に ぬ ね の', emblem: 'な',
    intro: ['Linha N: na, ni, nu, ne, no. Todos regulares, sem surpresas de pronúncia.',
      'Cuidado só com ぬ e め, que são parecidos: ぬ tem um lacinho no fim.'],
    chars: ['な|na|Uma cruz e um nó embaixo: “na”.',
      'に|ni|Um tracinho em pé ao lado de こ: “ni”.',
      'ぬ|nu|Um macarrão enrolado com um nó no final.|Diferente de め, que não tem o lacinho.',
      'ね|ne|Um gato (ねこ) deitado com o rabo enrolado: “ne” de neko.',
      'の|no|Um sinal de proibido: “No!”.|É também uma partícula muito comum (“de”).'],
    words: ['ねこ|neko|gato', 'いぬ|inu|cachorro', 'なつ|natsu|verão', 'にく|niku|carne', 'あなた|anata|você', 'さかな|sakana|peixe', 'なに|nani|o quê', 'くに|kuni|país', 'おかね|okane|dinheiro', 'きのこ|kinoko|cogumelo'],
    tip: 'Repare em の: ele aparece em muitas palavras e frases.'
  },
  {
    id: 'h6', title: 'Linha H: は ひ ふ へ ほ', emblem: 'は',
    intro: ['Linha H: ha, hi, fu, he, ho. O H é aspirado, um sopro leve (como no inglês “house”).',
      'ふ é especial: um som entre H e F, soprando com os lábios quase fechados, sem encostar os dentes.'],
    chars: ['は|ha|Uma pessoa rindo “há-há” ao lado de uma cruz.|Como partícula (“quanto a”), は se lê “wa”.',
      'ひ|hi|Um sorriso largo: “hi hi hi”.',
      'ふ|fu|Uma pessoa soprando “fuu” com as bochechas cheias.|Entre “hu” e “fu”: sopre sem encostar os dentes no lábio.',
      'へ|he|Uma montanhinha. É quase igual no katakana (ヘ).|Como partícula (“para”), へ se lê “e”.',
      'ほ|ho|Parece は com um chapéu em cima: “ho ho ho”, o Papai Noel.'],
    words: ['はな|hana|flor; nariz', 'ひと|hito|pessoa', 'ふね|fune|barco', 'へた|heta|ruim (em alguma coisa)', 'ほし|hoshi|estrela', 'ふく|fuku|roupa', 'はし|hashi|pauzinhos; ponte', 'へそ|heso|umbigo', 'ひこうき|hikouki|avião', 'ほそい|hosoi|fino'],
    tip: 'はな pode ser “flor” ou “nariz”: o contexto e a entonação mostram qual é.'
  },
  {
    id: 'h7', title: 'Linha M: ま み む め も', emblem: 'ま',
    intro: ['Linha M: ma, mi, mu, me, mo. Todos regulares.',
      'め (me) significa “olho”, e ele parece mesmo um olho com cílios.'],
    chars: ['ま|ma|Uma mamãe com o cabelo preso num coque (o lacinho embaixo).',
      'み|mi|Parece o número 21 escrito torto: “mi”.',
      'む|mu|Uma vaca fazendo “muuu” com o rabinho levantado.',
      'め|me|Um olho (め = olho!) com cílios.|Parecido com ぬ, mas sem o lacinho no fim.',
      'も|mo|Um anzol com duas iscas: pesca “mo”re.'],
    words: ['あめ|ame|chuva; doce', 'うみ|umi|mar', 'むし|mushi|inseto', 'もも|momo|pêssego', 'みみ|mimi|orelha', 'まめ|mame|feijão', 'くも|kumo|nuvem; aranha', 'さむい|samui|frio', 'なまえ|namae|nome', 'め|me|olho'],
    tip: 'ぬ (nu) tem lacinho; め (me) não. Compare: いぬ (cachorro) e あめ (chuva).'
  },
  {
    id: 'h8', title: 'Linhas Y e R: や ゆ よ ら り る れ ろ', emblem: 'や',
    intro: ['A linha Y tem só três sons: ya, yu, yo.',
      'A linha R japonesa é um toque leve da língua, como o “r” de “caro” ou “barato”. Nunca o “r” forte de “rato”.'],
    chars: ['や|ya|Um iaque com chifres: “ya”.',
      'ゆ|yu|A placa dos banhos termais: ゆ significa água quente!',
      'よ|yo|Um ioiô pendurado na cordinha: “yo”.',
      'ら|ra|Um rapaz com um chapéu inclinado: “ra”.|R leve, como em “caro”.',
      'り|ri|Dois fios de capim balançando.|Parecido com い, mas mais comprido e com o traço da direita maior.',
      'る|ru|Um caminho que dá voltas e termina numa rotatória (o lacinho).|る tem lacinho; ろ não.',
      'れ|re|Parece ね, mas o final vai para fora em vez de fazer um laço.',
      'ろ|ro|Igual a る, mas sem o lacinho: uma roda aberta.'],
    words: ['やま|yama|montanha', 'ゆき|yuki|neve', 'よる|yoru|noite', 'そら|sora|céu', 'くるま|kuruma|carro', 'これ|kore|isto', 'さくら|sakura|cerejeira', 'とり|tori|pássaro', 'ゆめ|yume|sonho', 'へや|heya|quarto', 'いろ|iro|cor', 'はる|haru|primavera'],
    tip: 'Para o R, encoste a ponta da língua de leve atrás dos dentes de cima, como em “para”.'
  },
  {
    id: 'h9', title: 'わ, を e ん', emblem: 'ん',
    intro: ['Últimos três do hiragana básico: わ (wa), を (o) e ん (n).',
      'を soa “o” e quase só aparece como partícula (marca o objeto: ほんを よむ = ler um livro).',
      'ん é o único som que é só consoante. No fim da palavra ele soa anasalado, como o “m” de “bom”.'],
    chars: ['わ|wa|Parece れ e ね, mas termina numa curva fechada: um “wa”gão.',
      'を|o|Uma pessoa com o braço levantado gritando “Ô!”.|Escreve-se “wo” às vezes, mas se lê “o”.',
      'ん|n|Parece um “n” minúsculo de letra cursiva.|Antes de b, p e m soa como “m”: さんぽ ≈ “sampo”.'],
    words: ['わたし|watashi|eu', 'かわ|kawa|rio', 'ほん|hon|livro', 'みかん|mikan|tangerina', 'にほん|nihon|Japão', 'せんせい|sensei|professor(a)', 'てんき|tenki|tempo (clima)', 'おんな|onna|mulher', 'にわ|niwa|jardim', 'ほんを よむ|hon o yomu|ler um livro'],
    tip: 'Em ほんを よむ, を é a partícula de objeto e soa só “o”.'
  },
  {
    id: 'h10', title: 'Parecidos do hiragana', emblem: 'ぬ', kind: 'similar',
    intro: ['Alguns caracteres se parecem muito. Nesta lição você treina o olho para diferenciá-los.',
      'Não decore o desenho inteiro: procure o detalhe que muda (um laço, um traço, a direção da curva).'],
    pairs: ['ぬ め|ぬ tem lacinho no fim; め não.', 'る ろ|る termina num laço; ろ fica aberto.', 'わ れ ね|わ fecha numa curva, れ sai para fora, ね faz um laço.',
      'さ ち|さ e ち são espelhados: a curva de さ abre para a esquerda e a de ち para a direita.', 'は ほ|ほ tem um traço a mais em cima (o chapéu).', 'い り|り é mais comprido e o traço da direita desce mais.',
      'こ に|に tem um traço vertical à esquerda.', 'あ お|お tem um tracinho separado à direita.', 'き さ|き tem dois traços horizontais; さ tem um só.'],
    tip: 'Quando errar, compare os dois lado a lado e diga em voz alta o detalhe que muda.'
  },
  {
    id: 'h11', title: 'Dakuten: が e ざ', emblem: 'が',
    intro: ['O sinal ゛ (dakuten, duas aspinhas) deixa o som “vibrado”: か (ka) vira が (ga), さ (sa) vira ざ (za).',
      'Você não precisa decorar caracteres novos: é o mesmo desenho com ゛.',
      'Atenção: し com ゛ é じ (ji), não “zi”.'],
    chars: ['が|ga|か + ゛: “ga”.|G sempre duro, como em “gato” (nunca como em “gente”).', 'ぎ|gi|き + ゛: “gui”.|Soa “gui”, como em “guitarra”.', 'ぐ|gu|く + ゛: “gu”.', 'げ|ge|け + ゛: “guê”.|Soa “guê”, nunca “jê”.', 'ご|go|こ + ゛: “go”.',
      'ざ|za|さ + ゛: “za”.', 'じ|ji|し + ゛: “ji”.|Soa como “dji”, suave.', 'ず|zu|す + ゛: “zu”.', 'ぜ|ze|せ + ゛: “ze”.', 'ぞ|zo|そ + ゛: “zo”.'],
    words: ['かぎ|kagi|chave', 'ごご|gogo|tarde (depois do meio-dia)', 'かぐ|kagu|móveis', 'げた|geta|tamanco japonês', 'かがみ|kagami|espelho', 'ちず|chizu|mapa', 'かぜ|kaze|vento; resfriado', 'なぞ|nazo|mistério', 'じかん|jikan|tempo, horas', 'みず|mizu|água', 'ざる|zaru|peneira'],
    tip: 'Leia primeiro sem o ゛ e depois “vibre” o som: か → が.'
  },
  {
    id: 'h12', title: 'Dakuten: だ e ば', emblem: 'だ',
    intro: ['Mais dois grupos com ゛: た → だ (da) e は → ば (ba).',
      'ぢ e づ soam igual a じ e ず (ji, zu). São raros: aparecem em poucas palavras, como はなぢ e つづく.'],
    chars: ['だ|da|た + ゛: “da”.', 'ぢ|ji|ち + ゛: “ji”.|Mesmo som de じ. Raro.', 'づ|zu|つ + ゛: “zu”.|Mesmo som de ず. Raro.', 'で|de|て + ゛: “de”.|Sempre “de”, nunca “dji”.', 'ど|do|と + ゛: “do”.',
      'ば|ba|は + ゛: “ba”.', 'び|bi|ひ + ゛: “bi”.', 'ぶ|bu|ふ + ゛: “bu”.', 'べ|be|へ + ゛: “be”.', 'ぼ|bo|ほ + ゛: “bo”.'],
    words: ['ともだち|tomodachi|amigo(a)', 'でんわ|denwa|telefone', 'まど|mado|janela', 'からだ|karada|corpo', 'はなぢ|hanaji|sangramento no nariz', 'つづく|tsuzuku|continuar', 'かばん|kaban|bolsa, mochila', 'えび|ebi|camarão', 'ぶた|buta|porco', 'たべる|taberu|comer', 'ぼく|boku|eu (masculino)', 'どこ|doko|onde', 'へび|hebi|cobra', 'なべ|nabe|panela'],
    tip: 'で é sempre “de” (como em “dedo” falado no Sul), nunca “dji”.'
  },
  {
    id: 'h13', title: 'Handakuten: ぱ ぴ ぷ ぺ ぽ', emblem: 'ぱ',
    intro: ['O sinal ゜ (handakuten, uma bolinha) só aparece na linha H: は (ha) vira ぱ (pa).',
      'Muitas onomatopeias usam esses sons: ぴかぴか (brilhando), ぽかぽか (quentinho).'],
    chars: ['ぱ|pa|は + ゜: “pa”.', 'ぴ|pi|ひ + ゜: “pi”.', 'ぷ|pu|ふ + ゜: “pu”.', 'ぺ|pe|へ + ゜: “pe”.', 'ぽ|po|ほ + ゜: “po”.'],
    words: ['さんぽ|sanpo|passeio, caminhada', 'えんぴつ|enpitsu|lápis', 'てんぷら|tenpura|tempurá', 'ぺらぺら|perapera|fluente (falar muito bem)', 'ぽかぽか|pokapoka|quentinho, aconchegante', 'ぴかぴか|pikapika|brilhando', 'しんぱい|shinpai|preocupação', 'ぷかぷか|pukapuka|boiando, flutuando'],
    tip: 'ば (ba) tem duas aspinhas; ぱ (pa) tem uma bolinha. Olhe o cantinho de cima.'
  },
  {
    id: 'h14', title: 'Sons combinados I: きゃ しゃ ちゃ…', emblem: 'きゃ',
    intro: ['Um ゃ, ゅ ou ょ pequeno depois de um caractere terminado em “i” cria um som só: き + ゃ = kya (uma sílaba, não “ki-ya”).',
      'Compare o tamanho: きや (ki-ya, dois sons) e きゃ (kya, um som). O pequeno muda tudo.'],
    chars: ['きゃ|kya|き + ゃ pequeno.', 'きゅ|kyu|き + ゅ pequeno.', 'きょ|kyo|き + ょ pequeno.',
      'しゃ|sha|し + ゃ pequeno.|Soa “xa”.', 'しゅ|shu|し + ゅ pequeno.|Soa “xu”.', 'しょ|sho|し + ょ pequeno.|Soa “xo”.',
      'ちゃ|cha|ち + ゃ pequeno.|Soa “tcha”.', 'ちゅ|chu|ち + ゅ pequeno.|Soa “tchu”.', 'ちょ|cho|ち + ょ pequeno.|Soa “tcho”.',
      'にゃ|nya|に + ゃ pequeno.|Soa “nha”.', 'にゅ|nyu|に + ゅ pequeno.|Soa “nhu”.', 'にょ|nyo|に + ょ pequeno.|Soa “nho”.',
      'ひゃ|hya|ひ + ゃ pequeno.', 'ひゅ|hyu|ひ + ゅ pequeno.', 'ひょ|hyo|ひ + ょ pequeno.'],
    words: ['おちゃ|ocha|chá', 'しゃしん|shashin|foto', 'きょう|kyou|hoje', 'ひゃく|hyaku|cem', 'きゅう|kyuu|nove', 'しゅくだい|shukudai|lição de casa', 'ちゅうい|chuui|atenção, cuidado', 'にゅうがく|nyuugaku|entrada na escola', 'でんしゃ|densha|trem', 'きゃく|kyaku|cliente, visita', 'しょくじ|shokuji|refeição', 'ちょきん|chokin|poupança', 'にゃんこ|nyanko|gatinho', 'ひょう|hyou|granizo', 'ひゅうひゅう|hyuuhyuu|(som de vento soprando)', 'にょろにょろ|nyoronyoro|(rastejando, como uma cobra)'],
    tip: 'Pense no pequeno como “cola”: ele gruda no caractere anterior e vira uma sílaba só.'
  },
  {
    id: 'h15', title: 'Sons combinados II: みゃ りょ じゃ…', emblem: 'じゃ',
    intro: ['A mesma regra vale para み, り e para os caracteres com ゛ e ゜: ぎゃ, じゃ, びゃ, ぴゃ.',
      'Diferença importante: びょういん (byouin) é hospital, mas びよういん (biyouin) é salão de beleza! Um ょ pequeno muda a palavra.'],
    chars: ['みゃ|mya|み + ゃ pequeno.', 'みゅ|myu|み + ゅ pequeno.|Raro.', 'みょ|myo|み + ょ pequeno.',
      'りゃ|rya|り + ゃ pequeno.', 'りゅ|ryu|り + ゅ pequeno.', 'りょ|ryo|り + ょ pequeno.',
      'ぎゃ|gya|ぎ + ゃ pequeno.', 'ぎゅ|gyu|ぎ + ゅ pequeno.', 'ぎょ|gyo|ぎ + ょ pequeno.',
      'じゃ|ja|じ + ゃ pequeno.|Soa “dja”.', 'じゅ|ju|じ + ゅ pequeno.|Soa “dju”.', 'じょ|jo|じ + ょ pequeno.|Soa “djo”.',
      'びゃ|bya|び + ゃ pequeno.', 'びゅ|byu|び + ゅ pequeno.|Raro.', 'びょ|byo|び + ょ pequeno.',
      'ぴゃ|pya|ぴ + ゃ pequeno.|Raro.', 'ぴゅ|pyu|ぴ + ゅ pequeno.|Raro.', 'ぴょ|pyo|ぴ + ょ pequeno.'],
    words: ['みゃく|myaku|pulso', 'みょうじ|myouji|sobrenome', 'りょこう|ryokou|viagem', 'りゅう|ryuu|dragão', 'りゃく|ryaku|abreviação', 'ぎゃく|gyaku|contrário', 'ぎゅうにく|gyuuniku|carne bovina', 'きんぎょ|kingyo|peixinho dourado', 'じゃあね|jaa ne|tchau (informal)', 'じゅぎょう|jugyou|aula', 'じょうず|jouzu|habilidoso, bom em', 'さんびゃく|sanbyaku|trezentos', 'びゅうびゅう|byuubyuu|(vento forte uivando)', 'びょういん|byouin|hospital', 'びよういん|biyouin|salão de beleza', 'ぴゅう|pyuu|(assobio, vento rápido)', 'ぴょんぴょん|pyonpyon|pulando, saltitando'],
    tip: 'Leia びょういん e びよういん em voz alta: “byou-in” e “bi-you-in”.'
  },
  {
    id: 'h16', title: 'O pequeno っ', emblem: 'っ',
    intro: ['O っ pequeno não tem som próprio: ele é uma pausa curtinha que “dobra” a consoante seguinte. きって = kit-te.',
      'Compare: きて (kite, “venha”) e きって (kitte, “selo”). おと (oto, “som”) e おっと (otto, “marido”).',
      'No romaji, ele aparece como a consoante dobrada: がっこう = gakkou.'],
    chars: ['っ|(pausa)|Um つ pequenininho: uma pausa rápida, como prender a respiração por um instante.|Dobra a consoante seguinte: っk = kk, っt = tt, っp = pp.'],
    words: ['きって|kitte|selo', 'きて|kite|venha', 'がっこう|gakkou|escola', 'ちょっと|chotto|um pouco', 'ざっし|zasshi|revista', 'いっしょ|issho|junto', 'みっつ|mittsu|três (coisas)', 'はっぴゃく|happyaku|oitocentos', 'きっぷ|kippu|bilhete', 'まって|matte|espere', 'おと|oto|som', 'おっと|otto|marido'],
    tip: 'Bata palma no ritmo: き-っ-て tem três tempos; き-て tem dois.'
  },
  {
    id: 'h17', title: 'Vogais longas e partículas', emblem: 'ー',
    intro: ['Vogais longas duram o dobro e mudam o significado: おばさん (obasan, tia) e おばあさん (obaasan, avó).',
      'Duas regras de leitura: えい geralmente soa como “ee” (せんせい ≈ “sensee”) e おう soa como “oo” (おとうさん ≈ “otoosan”).',
      'Três partículas se escrevem de um jeito e se leem de outro: は (wa), へ (e) e を (o).'],
    chars: [],
    words: ['おばさん|obasan|tia', 'おばあさん|obaasan|avó', 'おじさん|ojisan|tio', 'おじいさん|ojiisan|avô', 'くうき|kuuki|ar', 'おねえさん|oneesan|irmã mais velha', 'おとうさん|otousan|pai', 'こおり|koori|gelo', 'とおい|tooi|longe', 'ゆうき|yuuki|coragem', 'えいご|eigo|inglês (idioma)', 'わたしは|watashi wa|eu (como tópico: “quanto a mim”)', 'がっこうへ|gakkou e|para a escola'],
    tip: 'Se a vogal está escrita duas vezes, segure o som: お-ば-あ-さん.'
  }
  ]
},
{
  id: 'kata', title: 'Katakana', jp: 'カタカナ', emblem: 'ア', color: '#3e8ed0',
  desc: 'O segundo sistema: os mesmos sons do hiragana, com traços mais retos. Usado para palavras estrangeiras, nomes e onomatopeias.',
  lessons: [
  {
    id: 'k1', title: 'Vogais e linha K: ア… コ', emblem: 'ア',
    intro: ['Katakana tem exatamente os mesmos sons do hiragana. Só o desenho muda: traços retos e cantos.',
      'Hiragana escreve palavras japonesas e partes da gramática. Katakana escreve palavras estrangeiras (ココア, “chocolate quente”), nomes de outros países e sons.',
      'Você já conhece os sons, então aqui o trabalho é só ligar o novo desenho ao som que você já sabe.'],
    chars: ['ア|a|Um machado de lado, com um cabo comprido.|Mesmo som de あ.', 'イ|i|Uma pessoa inclinada de perfil.|Mesmo som de い.', 'ウ|u|Como う, mas com um telhadinho em cima.|Mesmo som de う.', 'エ|e|Uma viga de construção (I deitado): “e”levador.|Mesmo som de え.', 'オ|o|Uma pessoa de braços abertos dizendo “Oh!”.|Mesmo som de お.',
      'カ|ka|Quase igual a か, sem o tracinho da direita.|Mesmo som de か.', 'キ|ki|Uma chave com dois dentes, igual a き sem a curva de baixo.', 'ク|ku|Um bico aberto, mais reto que く.', 'ケ|ke|Uma letra K inclinada: “ke”.', 'コ|ko|Um canto de caixa aberto para a esquerda.'],
    words: ['ココア|kokoa|chocolate quente', 'カカオ|kakao|cacau', 'エコ|eko|ecológico', 'イカ|ika|lula'],
    tip: 'Compare com o hiragana que você já sabe: か/カ e き/キ são quase iguais.'
  },
  {
    id: 'k2', title: 'Linhas S e T: サ… ト', emblem: 'サ',
    intro: ['Linhas S e T do katakana. Os sons são os mesmos: サ (sa), シ (shi), ツ (tsu)…',
      'Cuidado com シ (shi) e ツ (tsu): são os parecidos mais famosos do katakana. Treinaremos isso numa lição só para eles.'],
    chars: ['サ|sa|Uma mesinha com duas pernas atravessando o tampo.', 'シ|shi|Um rosto sorrindo de lado: dois olhinhos e a boca subindo da esquerda.|Os tracinhos ficam “deitados” e a linha sobe de baixo.', 'ス|su|Uma pessoa correndo com as pernas abertas.', 'セ|se|Parecido com せ, mais reto.', 'ソ|so|Um tracinho e uma linha descendo de cima para baixo.',
      'タ|ta|Um ク com um tracinho dentro.', 'チ|chi|Um número 千 torto: “chi”.', 'ツ|tsu|Três tracinhos: os dois pequenos ficam “em pé” e a linha desce de cima.', 'テ|te|Uma antena de TV.', 'ト|to|Uma placa presa num poste.|Igual ao と sem a curva.'],
    words: ['スイス|suisu|Suíça', 'テスト|tesuto|teste, prova', 'テキスト|tekisuto|texto; apostila', 'タコス|takosu|tacos (comida mexicana)', 'キス|kisu|beijo', 'アクセス|akusesu|acesso'],
    tip: 'Diga o som em voz alta ao ver cada desenho. O som você já sabe!'
  },
  {
    id: 'k3', title: 'Linhas N e H: ナ… ホ', emblem: 'ナ',
    intro: ['Linhas N e H. ヘ (he) é praticamente igual a へ do hiragana.',
      'Muitas palavras de esporte e de comida usam esses caracteres.'],
    chars: ['ナ|na|Uma cruz com a perna torta.', 'ニ|ni|Dois traços, como o kanji 二 (dois).|Parecido com に sem o traço da esquerda.', 'ヌ|nu|Um 7 com um corte no meio.', 'ネ|ne|Uma pessoa rezando sob um chapéu.', 'ノ|no|Um único traço inclinado.',
      'ハ|ha|Dois traços se abrindo, como um sorriso “há!”.', 'ヒ|hi|Uma cadeira de lado: “hi”.', 'フ|fu|Uma bandeira dobrada.|Entre “hu” e “fu”, como ふ.', 'ヘ|he|Uma montanhinha, igual a へ.', 'ホ|ho|Uma cruz com duas perninhas: parece um cabideiro.'],
    words: ['テニス|tenisu|tênis (esporte)', 'ネクタイ|nekutai|gravata', 'ナイフ|naifu|faca', 'ナイス|naisu|legal! (do inglês nice)', 'ヘア|hea|cabelo (em salões)'],
    tip: 'ヘ e へ são quase iguais. Só o contexto mostra se a palavra é estrangeira.'
  },
  {
    id: 'k4', title: 'Linhas M e Y: マ… ヨ', emblem: 'マ',
    intro: ['Linhas M e Y do katakana.',
      'スマホ (sumaho) é “smartphone”: o japonês adora encurtar palavras estrangeiras!'],
    chars: ['マ|ma|Um bico de pássaro olhando para baixo.', 'ミ|mi|Três tracinhos inclinados: três (mi) riscos.', 'ム|mu|Um braço musculoso flexionado.', 'メ|me|Um X torto, como marcar com um “X” no mapa.', 'モ|mo|Como も sem a curva de baixo.',
      'ヤ|ya|Como や, mais reto.', 'ユ|yu|Um U quadrado de lado.', 'ヨ|yo|Um E ao contrário.'],
    words: ['トマト|tomato|tomate', 'ハム|hamu|presunto', 'タイヤ|taiya|pneu', 'メモ|memo|anotação', 'スマホ|sumaho|smartphone', 'ミニ|mini|mini, pequeno'],
    tip: 'ユ e コ se parecem: ユ tem o traço de baixo mais comprido.'
  },
  {
    id: 'k5', title: 'Linha R, ワ, ヲ e ン', emblem: 'ン',
    intro: ['Linha R e os últimos do katakana básico: ワ (wa), ヲ (o) e ン (n).',
      'ヲ quase nunca é usado (a partícula を é sempre em hiragana). ン e ソ são parecidos: treinaremos isso logo.'],
    chars: ['ラ|ra|Um telhadinho em cima de uma フ.|R leve, como em “caro”.', 'リ|ri|Dois traços, como り, mais retos.', 'ル|ru|Duas pernas, a da direita com um pezinho.', 'レ|re|Uma perna com uma bota.', 'ロ|ro|Um quadrado: uma boca aberta.',
      'ワ|wa|Uma xícara de lado.', 'ヲ|o|Uma フ com uma prateleira no meio.|Quase não é usado.', 'ン|n|Um tracinho deitado e uma linha que sobe de baixo, como um rosto piscando.|ン: a linha sobe de baixo; ソ: a linha desce de cima.'],
    words: ['ホテル|hoteru|hotel', 'メロン|meron|melão', 'カメラ|kamera|câmera', 'ミルク|miruku|leite', 'ワイン|wain|vinho', 'レモン|remon|limão', 'リモコン|rimokon|controle remoto', 'ロシア|roshia|Rússia', 'ワンワン|wanwan|au-au (latido)'],
    tip: 'Repare: o japonês adapta as palavras ao seu som. Hotel vira ホテル (hoteru).'
  },
  {
    id: 'k6', title: 'Katakana com ゛: ガ ザ ダ', emblem: 'ガ',
    intro: ['O ゛ funciona igual ao hiragana: カ → ガ, サ → ザ, タ → ダ.',
      'ヂ e ヅ existem, mas quase nunca aparecem.'],
    chars: ['ガ|ga|カ + ゛.', 'ギ|gi|キ + ゛.|Soa “gui”.', 'グ|gu|ク + ゛.', 'ゲ|ge|ケ + ゛.|Soa “guê”.', 'ゴ|go|コ + ゛.',
      'ザ|za|サ + ゛.', 'ジ|ji|シ + ゛.|Soa “dji”.', 'ズ|zu|ス + ゛.', 'ゼ|ze|セ + ゛.', 'ゾ|zo|ソ + ゛.',
      'ダ|da|タ + ゛.', 'ヂ|ji|チ + ゛.|Raro.', 'ヅ|zu|ツ + ゛.|Raro.', 'デ|de|テ + ゛.', 'ド|do|ト + ゛.'],
    words: ['マンガ|manga|mangá', 'ラジオ|rajio|rádio', 'ガム|gamu|chiclete', 'デザイン|dezain|design', 'ドア|doa|porta', 'ゼロ|zero|zero', 'ゴリラ|gorira|gorila', 'ギフト|gifuto|presente', 'ゲスト|gesuto|convidado', 'ジム|jimu|academia (de ginástica)', 'ダンス|dansu|dança', 'グミ|gumi|bala de goma'],
    tip: 'マンガ, ラジオ, デザイン: você já reconhece palavras que conhece do português!'
  },
  {
    id: 'k7', title: 'Katakana com ゛ e ゜: バ e パ', emblem: 'パ',
    intro: ['ハ → バ (ba) com ゛ e ハ → パ (pa) com ゜.',
      'Curiosidade: パン (pão) e ボタン (botão) vieram do português, trazidos por portugueses no século XVI!'],
    chars: ['バ|ba|ハ + ゛.', 'ビ|bi|ヒ + ゛.', 'ブ|bu|フ + ゛.', 'ベ|be|ヘ + ゛.', 'ボ|bo|ホ + ゛.',
      'パ|pa|ハ + ゜.', 'ピ|pi|ヒ + ゜.', 'プ|pu|フ + ゜.', 'ペ|pe|ヘ + ゜.', 'ポ|po|ホ + ゜.'],
    words: ['ブラジル|burajiru|Brasil', 'パン|pan|pão', 'ボタン|botan|botão', 'テレビ|terebi|televisão', 'バナナ|banana|banana', 'ピザ|piza|pizza', 'ペン|pen|caneta', 'ズボン|zubon|calças', 'パズル|pazuru|quebra-cabeça', 'ビル|biru|prédio', 'プロ|puro|profissional', 'ポテト|poteto|batata frita', 'ベンチ|benchi|banco (de praça)', 'ゾンビ|zonbi|zumbi'],
    tip: 'ブラジル = bu-ra-ji-ru. O japonês coloca vogais entre as consoantes.'
  },
  {
    id: 'k8', title: 'ー, ッ e sons combinados', emblem: 'ー',
    intro: ['No katakana, a vogal longa é um traço: ー. ケーキ = ke-e-ki (bolo). O traço segue a direção do texto.',
      'ッ pequeno funciona como っ: dobra a consoante (サッカー = sakkaa).',
      'Os sons combinados também funcionam igual: シ + ャ = シャ (sha), ジ + ュ = ジュ (ju).'],
    chars: ['ー|(alonga)|Um traço reto: estique a vogal anterior.|Só existe no katakana (o hiragana usa a vogal escrita).', 'ッ|(pausa)|Um ツ pequeno: pausa curta que dobra a consoante.',
      'キャ|kya|キ + ャ pequeno.', 'キュ|kyu|キ + ュ pequeno.', 'キョ|kyo|キ + ョ pequeno.', 'シャ|sha|シ + ャ pequeno.', 'シュ|shu|シ + ュ pequeno.', 'ショ|sho|シ + ョ pequeno.',
      'チャ|cha|チ + ャ pequeno.', 'チュ|chu|チ + ュ pequeno.', 'チョ|cho|チ + ョ pequeno.', 'ニュ|nyu|ニ + ュ pequeno.', 'ジャ|ja|ジ + ャ pequeno.', 'ジュ|ju|ジ + ュ pequeno.', 'ジョ|jo|ジ + ョ pequeno.'],
    words: ['ケーキ|keeki|bolo', 'コーヒー|koohii|café', 'ゲーム|geemu|jogo, game', 'ラーメン|raamen|lámen', 'スーパー|suupaa|supermercado', 'カレー|karee|curry', 'サッカー|sakkaa|futebol', 'ベッド|beddo|cama', 'ヨット|yotto|iate, veleiro', 'チケット|chiketto|ingresso', 'シャツ|shatsu|camisa', 'ジュース|juusu|suco', 'チョコレート|chokoreeto|chocolate', 'ニュース|nyuusu|notícias', 'キャンプ|kyanpu|acampamento', 'ジャム|jamu|geleia', 'ショッピング|shoppingu|compras', 'メニュー|menyuu|cardápio', 'ユニホーム|yunihoomu|uniforme', 'キュート|kyuuto|fofo', 'チューブ|chuubu|tubo', 'カヌー|kanuu|canoa', 'ノート|nooto|caderno', 'キョロキョロ|kyorokyoro|(olhando para todos os lados)', 'シュークリーム|shuukuriimu|bomba de creme', 'チャンス|chansu|chance', 'ジョギング|jogingu|corrida leve'],
    tip: 'Hiragana: おかあさん (vogal escrita). Katakana: ケーキ (traço ー).'
  },
  {
    id: 'k9', title: 'Sons de palavras estrangeiras', emblem: 'フ',
    intro: ['Para imitar sons que não existem no japonês, o katakana usa vogais pequenas: ファ (fa), ティ (ti), ディ (di), ウィ (wi), シェ (she).',
      'Assim “party” vira パーティー (paatii) e “café” vira カフェ (kafe).',
      'ヴ (vu) tenta imitar o V, mas muita gente fala “b”: ヴァイオリン ou バイオリン (violino).'],
    chars: ['ファ|fa|フ + ァ pequeno.', 'フィ|fi|フ + ィ pequeno.', 'フェ|fe|フ + ェ pequeno.', 'フォ|fo|フ + ォ pequeno.',
      'ティ|ti|テ + ィ pequeno.|Um “ti” de verdade, que não existe no japonês tradicional.', 'ディ|di|デ + ィ pequeno.', 'ウィ|wi|ウ + ィ pequeno.', 'ウェ|we|ウ + ェ pequeno.', 'ウォ|wo|ウ + ォ pequeno.',
      'シェ|she|シ + ェ pequeno.', 'ジェ|je|ジ + ェ pequeno.', 'チェ|che|チ + ェ pequeno.', 'ヴ|vu|ウ + ゛: tentativa de imitar o V.|Muitos falam “bu”.'],
    words: ['ファン|fan|fã', 'カフェ|kafe|café (lugar)', 'フォーク|fooku|garfo', 'パーティー|paatii|festa', 'ディズニー|dizunii|Disney', 'ウィンドウ|windou|janela (de computador)', 'ウェブ|webu|web, internet', 'ウォーキング|wookingu|caminhada', 'シェフ|shefu|chef de cozinha', 'ジェット|jetto|jato', 'チェック|chekku|verificação, check', 'ソファ|sofa|sofá', 'フィルム|firumu|filme (de câmera)', 'ヴァイオリン|vaiorin|violino'],
    tip: 'Se a vogal é pequena (ァィゥェォ), ela se junta ao caractere anterior.'
  },
  {
    id: 'k10', title: 'Parecidos do katakana', emblem: 'シ', kind: 'similar',
    intro: ['Os parecidos mais famosos: シ (shi) e ツ (tsu), ソ (so) e ン (n).',
      'Truque: em シ e ン a linha longa sobe de baixo para cima; em ツ e ソ ela desce de cima. Os tracinhos de シ ficam deitados; os de ツ ficam em pé.',
      'Também comparamos hiragana e katakana parecidos: へ/ヘ, り/リ, か/カ.'],
    pairs: ['シ ツ|シ: tracinhos deitados, linha sobe. ツ: tracinhos em pé, linha desce.', 'ソ ン|ソ: linha desce de cima. ン: linha sobe de baixo.', 'ク ケ タ|ケ tem um traço que corta; タ tem um tracinho dentro.',
      'ウ ワ フ|ウ tem tracinho em cima; ワ tem a perna esquerda; フ é só uma bandeira.', 'ア マ|ア tem um tracinho no meio que desce; マ é um bico fechado.', 'ノ メ|メ é um ノ com um tracinho cruzando.',
      'コ ユ|ユ tem a linha de baixo mais comprida.', 'チ テ|チ tem a parte de cima inclinada e o traço do meio atravessa.', 'ヌ ス|ヌ tem um tracinho cruzando; ス abre as pernas.',
      'へ ヘ|Hiragana へ e katakana ヘ são quase idênticos: o contexto decide.', 'り リ|リ é a versão reta de り.', 'か カ|カ não tem o tracinho da direita.'],
    tip: 'Olhe primeiro a direção da linha comprida. Depois, os tracinhos.'
  },
  {
    id: 'k11', title: 'Para que serve o katakana', emblem: 'カ', kind: 'words',
    intro: ['O katakana aparece em quatro situações principais:',
      '1) Nomes de países, cidades e pessoas estrangeiras: ブラジル, サンパウロ, マリア.',
      '2) Palavras emprestadas de outras línguas: パン e ボタン (do português!), アルバイト (do alemão).',
      '3) Produtos e marcas: スマホ, コーラ.',
      '4) Onomatopeias e efeitos sonoros, muito comuns em mangás: ドキドキ (coração batendo), ワクワク (empolgação).'],
    words: ['サンパウロ|sanpauro|São Paulo|lugar', 'アメリカ|amerika|Estados Unidos|lugar', 'マリア|maria|Maria|nome', 'ペドロ|pedoro|Pedro|nome', 'カステラ|kasutera|pão de ló (do português “Castela”)|empréstimo', 'タバコ|tabako|cigarro (do português “tabaco”)|empréstimo', 'アルバイト|arubaito|trabalho de meio período|empréstimo', 'コーラ|koora|refrigerante de cola|produto', 'パソコン|pasokon|computador|produto', 'ドキドキ|dokidoki|(coração batendo forte)|som', 'ワクワク|wakuwaku|(empolgação, ansiedade boa)|som', 'ニコニコ|nikoniko|(sorrindo)|som', 'キラキラ|kirakira|(brilhando, cintilando)|som', 'ゴロゴロ|gorogoro|(trovão; rolar à toa)|som'],
    tip: 'Em mangás, os efeitos sonoros grandes no desenho quase sempre estão em katakana.'
  }
  ]
},
{
  id: 'pal', title: 'Leitura de palavras', jp: 'ことば', emblem: '語', color: '#1f9461',
  desc: 'Leia palavras inteiras em hiragana e katakana, sem depender do romaji. Com áudio, tradução e dicionário.',
  lessons: [
  { id: 'p1', title: 'Primeiras palavras', emblem: 'み', kind: 'words',
    intro: ['Agora você lê palavras completas. Tente ler antes de olhar o romaji: ele está aí para ajudar, não para ser lido primeiro.', 'Toque em uma palavra para ouvir, ver os caracteres e abrir no dicionário.'],
    words: ['みず|mizu|água', 'ねこ|neko|gato', 'いぬ|inu|cachorro', 'がっこう|gakkou|escola', 'ありがとう|arigatou|obrigado(a)', 'ともだち|tomodachi|amigo(a)', 'ほん|hon|livro', 'せんせい|sensei|professor(a)'],
    tip: 'Leia caractere por caractere, depois a palavra inteira, e só então confira.' },
  { id: 'p2', title: 'Cumprimentos', emblem: 'は', kind: 'words',
    intro: ['Cumprimentos são as palavras que você mais vai ler e ouvir.', 'Atenção: em こんにちは e こんばんは, o は final se lê “wa” (é a antiga partícula は).'],
    words: ['おはよう|ohayou|bom dia', 'こんにちは|konnichiwa|olá, boa tarde', 'こんばんは|konbanwa|boa noite (ao chegar)', 'すみません|sumimasen|com licença; desculpe', 'さようなら|sayounara|adeus', 'おやすみ|oyasumi|boa noite (ao dormir)', 'いただきます|itadakimasu|(antes de comer)', 'ごちそうさま|gochisousama|(depois de comer)'],
    tip: 'こんにちは termina com は, mas soa “wa”. Ouça e compare.' },
  { id: 'p3', title: 'Comida e bebida', emblem: 'ご', kind: 'words',
    intro: ['Cardápios misturam hiragana e katakana: comida japonesa costuma vir em hiragana (ou kanji), comida estrangeira em katakana.'],
    words: ['ごはん|gohan|arroz; refeição', 'パン|pan|pão', 'すし|sushi|sushi', 'ラーメン|raamen|lámen', 'おちゃ|ocha|chá', 'コーヒー|koohii|café', 'たまご|tamago|ovo', 'やさい|yasai|verduras, legumes', 'くだもの|kudamono|frutas', 'ジュース|juusu|suco'],
    tip: 'ラーメン é estrangeira (veio da China) e por isso costuma ir em katakana.' },
  { id: 'p4', title: 'Casa e cidade', emblem: 'え', kind: 'words',
    intro: ['Palavras que aparecem em placas, mapas e no Living Japanese World.'],
    words: ['いえ|ie|casa', 'へや|heya|quarto', 'まど|mado|janela', 'ドア|doa|porta', 'えき|eki|estação', 'コンビニ|konbini|loja de conveniência', 'びょういん|byouin|hospital', 'みせ|mise|loja', 'みち|michi|rua, caminho', 'トイレ|toire|banheiro'],
    tip: 'コンビニ é a abreviação de “convenience store”.' },
  { id: 'p5', title: 'Pessoas e família', emblem: 'ひ', kind: 'words',
    intro: ['Pessoas e família. Repare nas vogais longas: おかあさん, おとうさん.'],
    words: ['ひと|hito|pessoa', 'かぞく|kazoku|família', 'おかあさん|okaasan|mãe', 'おとうさん|otousan|pai', 'こども|kodomo|criança', 'がくせい|gakusei|estudante', 'わたし|watashi|eu', 'あなた|anata|você', 'おにいさん|oniisan|irmão mais velho'],
    tip: 'あなた existe, mas os japoneses preferem chamar a pessoa pelo nome + さん.' },
  { id: 'p6', title: 'Placas e avisos', emblem: '!', kind: 'words',
    intro: ['Placas são leitura de verdade: curtas, importantes e por toda parte.', 'Em placas reais muitas palavras aparecem em kanji. Aqui você lê a versão em kana; na etapa de kanji, começará a reconhecer a escrita com kanji.'],
    words: ['でぐち|deguchi|saída', 'いりぐち|iriguchi|entrada', 'おす|osu|empurre', 'ひく|hiku|puxe', 'きんえん|kin\'en|proibido fumar', 'とまれ|tomare|pare', 'あぶない|abunai|perigo!', 'やすみ|yasumi|fechado (folga)', 'エレベーター|erebeetaa|elevador', 'エスカレーター|esukareetaa|escada rolante'],
    tip: 'でぐち (saída) e いりぐち (entrada) terminam iguais: ぐち vem de “boca, abertura”.' }
  ]
},
{
  id: 'kan', title: 'Introdução aos kanji', jp: 'かんじ', emblem: '日', color: '#e9a91c',
  desc: 'Os primeiros kanji, sempre dentro de palavras reais. Cada kanji pode ter leituras diferentes conforme a palavra.',
  lessons: [
  { id: 'j1', title: 'Números: 一 二 三', emblem: '三',
    intro: ['Kanji são caracteres que carregam significado. 一 significa “um” por si só.',
      'Um mesmo kanji pode ter mais de uma leitura. Não existe “a” leitura certa: depende da palavra. 一 se lê いち (ichi) para contar e ひと (hito) em ひとつ.',
      'Por isso aqui você aprende cada kanji dentro de palavras reais, e não como uma lista de pronúncias.'],
    kanji: ['一|um|いち (ichi) ao contar: 一 (いち). ひと (hito) na contagem japonesa de objetos: 一つ (ひとつ).|Um traço só: um.',
      '二|dois|に (ni) ao contar: 二 (に). ふた (futa) em 二つ (ふたつ).|Dois traços: dois.',
      '三|três|さん (san) ao contar: 三 (さん). みっ (mit) em 三つ (みっつ).|Três traços: três.'],
    words: ['一|いち|ichi|um', '二|に|ni|dois', '三|さん|san|três', '一・つ|ひと・つ|hitotsu|um (objeto)', '二・つ|ふた・つ|futatsu|dois (objetos)', '三・つ|みっ・つ|mittsu|três (objetos)'],
    tip: 'A parte em hiragana depois do kanji (つ) ajuda a descobrir a leitura: 一つ = ひとつ.' },
  { id: 'j2', title: 'Sol e lua: 日 月', emblem: '日',
    intro: ['日 é o sol e também “dia”. 月 é a lua e também “mês”.',
      'Nas datas aparecem leituras especiais: 二日 = ふつか (dia 2), 三日 = みっか (dia 3) e 一日 = ついたち (dia 1 do mês). Elas se aprendem como palavras inteiras.'],
    kanji: ['日|sol; dia|ひ (hi) sozinho: 日 (sol, dia). か (ka) nas datas: 二日 (ふつか), 三日 (みっか). Em outras palavras: にち (nichi), び (bi), ほん/に (em 日本).|Uma janela com o sol dentro. Antigamente era um círculo com um ponto.',
      '月|lua; mês|つき (tsuki) sozinho: 月 (lua). がつ (gatsu) nos meses: 一月 (いちがつ, janeiro). げつ (getsu) em 月曜日.|A lua crescente com duas nuvens passando.'],
    words: ['日|ひ|hi|sol; dia', '月|つき|tsuki|lua', '一・月|いち・がつ|ichigatsu|janeiro', '三・月|さん・がつ|sangatsu|março', '二・日|ふつ・か|futsuka|dia 2; dois dias', '三・日|みっ・か|mikka|dia 3; três dias', '一日|ついたち|tsuitachi|dia 1 (do mês)|Leitura especial da palavra inteira.', '三・日・月|み・か・づき|mikazuki|lua crescente|つき vira づき no meio da palavra.'],
    tip: 'Repare: em 三日月, つき vira づき. Muitas leituras ganham ゛ no meio de palavras compostas.' },
  { id: 'j3', title: 'Paisagem: 山 川 田 口', emblem: '山',
    intro: ['Kanji que desenham o que significam: montanha, rio, arrozal, boca.',
      'Quando um kanji vem depois de outro, a leitura às vezes ganha ゛: かわ (rio) → がわ, くち (boca) → ぐち. Isso se chama rendaku.'],
    kanji: ['山|montanha|やま (yama) sozinho e em nomes: 山 (やま), 山田 (やまだ). さん (san) em nomes de montanhas, como 富士山 (ふじさん, monte Fuji).|Três picos de montanha.',
      '川|rio|かわ (kawa) sozinho: 川. がわ (gawa) depois de outro kanji: 小川 (おがわ).|Três linhas de água correndo.',
      '田|arrozal|た (ta) sozinho: 田. だ (da) depois de outro kanji: 山田 (やまだ).|Um arrozal visto de cima, dividido em quatro.',
      '口|boca; abertura|くち (kuchi) sozinho: 口. ぐち (guchi) em compostos: 山口 (やまぐち). こう (kou) em 人口 (じんこう).|Uma boca aberta: um quadrado.'],
    words: ['山|やま|yama|montanha', '川|かわ|kawa|rio', '田|た|ta|arrozal', '口|くち|kuchi|boca', '山・田|やま・だ|yamada|Yamada (sobrenome)', '山・口|やま・ぐち|yamaguchi|Yamaguchi (sobrenome, província)', '川・口|かわ・ぐち|kawaguchi|foz do rio; Kawaguchi', '一・口|ひと・くち|hitokuchi|uma mordida, um gole'],
    tip: 'Muitos sobrenomes japoneses são feitos de kanji de paisagem: 山田, 山口, 川口.' },
  { id: 'j4', title: 'Elementos: 火 水 木', emblem: '水',
    intro: ['Fogo, água e árvore. Também aparecem nos dias da semana (próxima lição).',
      'Atenção: 火 (fogo) e 日 (sol) podem ser lidos ひ (hi). Na escrita, o kanji mostra qual é qual — uma vantagem da leitura sobre o áudio!'],
    kanji: ['火|fogo|ひ (hi) sozinho: 火. か (ka) em 火山 (かざん, vulcão) e 火曜日 (かようび).|Uma fogueira com faíscas saltando para os lados.',
      '水|água|みず (mizu) sozinho: 水, お水. すい (sui) em 水曜日 (すいようび).|Um rio no meio com respingos para os lados.',
      '木|árvore; madeira|き (ki) sozinho: 木. もく (moku) em 木曜日 (もくようび).|Uma árvore: tronco, galhos e raízes.'],
    words: ['火|ひ|hi|fogo', '水|みず|mizu|água', '木|き|ki|árvore', 'お・水|お・みず|omizu|água (educado)', '火・山|か・ざん|kazan|vulcão|やま vira ざん: leitura chinesa (さん) com ゛.'],
    tip: 'Em placas de restaurante, お水 (água) é muito comum.' },
  { id: 'j5', title: 'Dias da semana: 金 土 曜', emblem: '曜',
    intro: ['Os dias da semana juntam tudo: 日, 月, 火, 水, 木, 金 e 土 + 曜日 (ようび, “dia da semana”).',
      'Veja como 日 muda de leitura na mesma palavra: 日曜日 = にち・よう・び. O primeiro 日 é にち; o último é び.',
      '曜 é complicado de desenhar, mas fácil de reconhecer: ele quase só aparece em 曜日.'],
    kanji: ['金|ouro; dinheiro|かね (kane) em お金 (おかね, dinheiro). きん (kin) em 金曜日 (sexta-feira).|Um telhado sobre pepitas de ouro enterradas.',
      '土|terra, solo|つち (tsuchi) sozinho: 土. ど (do) em 土曜日 (sábado).|Um broto saindo da terra.',
      '曜|dia da semana|よう (you): só aparece em 曜日 (ようび).|Reconheça pelo 日 do lado esquerdo e pelos “passarinhos” à direita.'],
    words: ['お・金|お・かね|okane|dinheiro', '土|つち|tsuchi|terra, solo', '日・曜・日|にち・よう・び|nichiyoubi|domingo', '月・曜・日|げつ・よう・び|getsuyoubi|segunda-feira', '火・曜・日|か・よう・び|kayoubi|terça-feira', '水・曜・日|すい・よう・び|suiyoubi|quarta-feira', '木・曜・日|もく・よう・び|mokuyoubi|quinta-feira', '金・曜・日|きん・よう・び|kin\'youbi|sexta-feira', '土・曜・日|ど・よう・び|doyoubi|sábado'],
    tip: 'Domingo é o dia do sol (日) e segunda é o dia da lua (月), como “Sunday” e “Monday” em inglês.' },
  { id: 'j6', title: 'Pessoas e tamanhos: 人 大 小', emblem: '人',
    intro: ['人 (pessoa) tem várias leituras: ひと sozinho, にん ao contar (三人), じん em nacionalidades (日本人).',
      'Algumas palavras têm leitura especial inteira, que não vem dos kanji separados: 一人 (ひとり), 二人 (ふたり), 大人 (おとな, adulto).'],
    kanji: ['人|pessoa|ひと (hito) sozinho: 人. にん (nin) ao contar pessoas: 三人 (さんにん). じん (jin) em 人口 e em nacionalidades.|Uma pessoa andando: duas pernas.',
      '大|grande|おお (oo) em 大きい (おおきい). だい (dai) em 大学 (だいがく).|Uma pessoa de braços bem abertos: “deste tamanho!”.',
      '小|pequeno|ちい (chii) em 小さい (ちいさい). お (o) em 小川 (おがわ). しょう (shou) em 小学校.|Um pontinho no meio com dois respingos: coisa pequena.'],
    words: ['人|ひと|hito|pessoa', '三・人|さん・にん|sannin|três pessoas', '一人|ひとり|hitori|uma pessoa; sozinho|Leitura especial.', '二人|ふたり|futari|duas pessoas|Leitura especial.', '大・きい|おお・きい|ookii|grande', '小・さい|ちい・さい|chiisai|pequeno', '大人|おとな|otona|adulto|Leitura especial.', '小・川|お・がわ|ogawa|riacho; Ogawa', '人・口|じん・こう|jinkou|população'],
    tip: 'Em 大きい e 小さい, o hiragana que segue o kanji (きい, さい) é a terminação do adjetivo.' },
  { id: 'j7', title: 'Escola: 学 校 先 生', emblem: '学',
    intro: ['Kanji da escola. Eles quase sempre aparecem em dupla: 学校 (escola), 先生 (professor), 学生 (estudante).',
      'Veja o っ escondido: 学 é がく, mas em 学校 vira がっ (gakkou).'],
    kanji: ['学|estudo; aprender|がく (gaku) em 学生 (がくせい). がっ (gak) em 学校 (がっこう). まな (mana) em 学ぶ (まなぶ, aprender).|Uma criança sob o telhado da escola, com ideias saindo da cabeça.',
      '校|escola|こう (kou) em 学校 (がっこう).|Uma árvore (木) ao lado de uma pessoa cruzando as pernas: a escola de madeira.',
      '先|antes, à frente|せん (sen) em 先生 (せんせい) e 先月 (せんげつ, mês passado).|Um pé que vai na frente.',
      '生|vida; nascer; estudante|せい (sei) em 先生 e 学生. う (u) em 生まれる (うまれる, nascer).|Um broto crescendo da terra: vida.'],
    words: ['学・校|がっ・こう|gakkou|escola', '先・生|せん・せい|sensei|professor(a)', '学・生|がく・せい|gakusei|estudante', '大・学|だい・がく|daigaku|universidade', '小・学・校|しょう・がっ・こう|shougakkou|escola primária', '先・月|せん・げつ|sengetsu|mês passado', '学・ぶ|まな・ぶ|manabu|aprender, estudar', '生・まれる|う・まれる|umareru|nascer'],
    tip: '先生 = “quem nasceu antes”: por isso é a palavra para professor e para mestres em geral.' },
  { id: 'j8', title: 'Japão e o ano: 本 中 年', emblem: '本',
    intro: ['本 significa livro e também “origem”. 日本 (にほん) é “a origem do sol”: o Japão!',
      '本 muda de leitura até como contador: 一本 (いっぽん), 三本 (さんぼん). E em sobrenomes vira もと: 山本 (やまもと).'],
    kanji: ['本|livro; origem|ほん (hon) sozinho: 本. ほん/ぼん em contagem: 三本 (さんぼん). もと (moto) em nomes: 山本 (やまもと).|Uma árvore (木) com um tracinho marcando a raiz: a origem.',
      '中|meio; dentro|なか (naka) sozinho: 中 (dentro). ちゅう (chuu) em 中学生.|Uma flecha atravessando o centro de uma caixa.',
      '年|ano; idade|ねん (nen) ao contar anos: 一年 (いちねん). とし (toshi) sozinho: 年 (ano, idade).|Uma pessoa carregando a colheita do ano.'],
    words: ['本|ほん|hon|livro', '日・本|に・ほん|nihon|Japão', '日・本・人|に・ほん・じん|nihonjin|japonês(a) (pessoa)', '山・本|やま・もと|yamamoto|Yamamoto (sobrenome)', '三・本|さん・ぼん|sanbon|três (objetos compridos)', '中|なか|naka|dentro, meio', '中・学・生|ちゅう・がく・せい|chuugakusei|aluno(a) do ensino fundamental II', '一・年|いち・ねん|ichinen|um ano', '一・年・生|いち・ねん・せい|ichinensei|aluno(a) do 1º ano', '年|とし|toshi|ano; idade'],
    tip: 'Você agora lê 日本人: に・ほん・じん. Três kanji, três leituras que você conhece!' }
  ]
},
{
  id: 'fra', title: 'Frases e pequenas leituras', jp: 'ぶん', emblem: '文', color: '#6c43dd',
  desc: 'Frases curtas com partículas e pontuação japonesa, até uma pequena leitura e balões de mangá.',
  lessons: [
  { id: 'f1', title: 'Isto é…: これは〜です', emblem: '。',
    intro: ['O japonês não usa espaços entre as palavras. O ponto final é 。 e a vírgula é 、.',
      'これは水です = “Isto é água”. は aqui é a partícula de tópico: escreve-se は, mas lê-se “wa”.',
      'です fecha a frase de forma educada e soa quase “dess”.'],
    sentences: ['これは水です。|これはみずです。|kore wa mizu desu.|Isto é água.|これ=kore=isto (perto de quem fala)/は=wa=partícula de tópico: “quanto a…” (escrita は, lida wa)/水=mizu=água/です=desu=é (educado)/。=.=ponto final japonês|は depois de これ é partícula: lê-se “wa”.',
      'それはねこです。|それはねこです。|sore wa neko desu.|Isso é um gato.|それ=sore=isso (perto de quem ouve)/は=wa=partícula de tópico/ねこ=neko=gato/です=desu=é|それ = perto de quem ouve; これ = perto de quem fala.',
      'あれは山です。|あれはやまです。|are wa yama desu.|Aquilo é uma montanha.|あれ=are=aquilo (longe dos dois)/は=wa=partícula de tópico/山=yama=montanha/です=desu=é|これ, それ, あれ: perto de mim, perto de você, longe dos dois.',
      'これはペンです。|これはペンです。|kore wa pen desu.|Isto é uma caneta.|これ=kore=isto/は=wa=partícula de tópico/ペン=pen=caneta (katakana: palavra estrangeira)/です=desu=é|Hiragana, katakana e kanji convivem na mesma frase.'],
    tip: 'Para achar as palavras, procure as partículas (は, が, の…) e o です no fim.' },
  { id: 'f2', title: 'Tem…: が います / あります', emblem: 'が',
    intro: ['Para dizer que algo existe ou “tem”, usa-se が + います (seres vivos) ou が + あります (objetos e plantas).',
      'が marca quem ou o que existe. Diferente de は, aqui ele se lê “ga” normalmente.'],
    sentences: ['ねこがいます。|ねこがいます。|neko ga imasu.|Tem um gato.|ねこ=neko=gato/が=ga=partícula: marca quem existe/います=imasu=existir, estar (seres vivos)|います é para pessoas e animais.',
      'いぬがいます。|いぬがいます。|inu ga imasu.|Tem um cachorro.|いぬ=inu=cachorro/が=ga=partícula de sujeito/います=imasu=existir (seres vivos)|',
      '本があります。|ほんがあります。|hon ga arimasu.|Tem um livro.|本=hon=livro/が=ga=partícula de sujeito/あります=arimasu=existir, ter (objetos)|あります é para objetos, que não se mexem sozinhos.',
      '川があります。|かわがあります。|kawa ga arimasu.|Tem um rio.|川=kawa=rio/が=ga=partícula de sujeito/あります=arimasu=existir (coisas)|',
      '先生がいます。|せんせいがいます。|sensei ga imasu.|O(a) professor(a) está aqui.|先生=sensei=professor(a)/が=ga=partícula de sujeito/います=imasu=estar (pessoas)|'],
    tip: 'Ser vivo → います. Objeto → あります.' },
  { id: 'f3', title: 'Eu sou…: 私は学生です', emblem: '私',
    novo: ['私|eu|わたし (watashi): o jeito mais comum e educado de dizer “eu”.|Um grão de arroz (禾) e um nariz apontando para si mesmo: “eu”.'],
    intro: ['Kanji novo nesta lição: 私 (わたし, eu). Ele aparece em quase todo texto.',
      'さん depois de um nome é o tratamento educado (sr., sra.). Nunca se usa さん com o próprio nome.',
      'か no fim transforma a frase em pergunta. O japonês muitas vezes mantém o 。 mesmo em perguntas.'],
    sentences: ['私は学生です。|わたしはがくせいです。|watashi wa gakusei desu.|Eu sou estudante.|私=watashi=eu (kanji novo)/は=wa=partícula de tópico/学生=gakusei=estudante/です=desu=sou (educado)|',
      '田中さんは先生です。|たなかさんはせんせいです。|tanaka san wa sensei desu.|O(a) Tanaka é professor(a).|田中=tanaka=Tanaka (sobrenome: 田 + 中)/さん=san=sr., sra. (tratamento educado)/は=wa=partícula de tópico/先生=sensei=professor(a)/です=desu=é|',
      '私は日本人じゃないです。|わたしはにほんじんじゃないです。|watashi wa nihonjin ja nai desu.|Eu não sou japonês(a).|私=watashi=eu/は=wa=partícula de tópico/日本人=nihonjin=japonês(a)/じゃないです=ja nai desu=não sou|じゃないです é a forma negativa de です.',
      '山本さんは大学生ですか。|やまもとさんはだいがくせいですか。|yamamoto san wa daigakusei desu ka.|O(a) Yamamoto é universitário(a)?|山本=yamamoto=Yamamoto (sobrenome)/さん=san=tratamento educado/は=wa=partícula de tópico/大学生=daigakusei=universitário(a)/ですか=desu ka=é? (か: pergunta)|か no fim = pergunta.'],
    tip: 'Leia 田中 como た・なか: você já conhece os dois kanji!' },
  { id: 'f4', title: 'De quem? A partícula の', emblem: 'の',
    intro: ['の liga duas palavras: 私の本 = “o livro de mim” = meu livro. A ordem é a contrária do português: dono + の + coisa.'],
    sentences: ['私の本です。|わたしのほんです。|watashi no hon desu.|É o meu livro.|私=watashi=eu/の=no=de (posse)/本=hon=livro/です=desu=é|私の = meu.',
      '日本の山はきれいです。|にほんのやまはきれいです。|nihon no yama wa kirei desu.|As montanhas do Japão são bonitas.|日本=nihon=Japão/の=no=de/山=yama=montanha(s)/は=wa=partícula de tópico/きれい=kirei=bonito(a)/です=desu=são|O plural normalmente não aparece: 山 pode ser “montanha” ou “montanhas”.',
      '学校の先生です。|がっこうのせんせいです。|gakkou no sensei desu.|É professor(a) da escola.|学校=gakkou=escola/の=no=de/先生=sensei=professor(a)/です=desu=é|',
      'これは田中さんのかばんです。|これはたなかさんのかばんです。|kore wa tanaka san no kaban desu.|Esta é a bolsa do(a) Tanaka.|これ=kore=isto/は=wa=partícula de tópico/田中さん=tanaka san=Tanaka/の=no=de/かばん=kaban=bolsa/です=desu=é|'],
    tip: 'Leia de trás para a frente para traduzir: かばん (bolsa) の (de) 田中さん (Tanaka).' },
  { id: 'f5', title: 'Ações: を, に e へ', emblem: 'を',
    intro: ['を marca o objeto da ação e se lê “o”: 水をのみます (bebo água).',
      'に e へ indicam destino: 学校にいきます / 日本へいきます (vou à escola / ao Japão). Como partícula, へ se lê “e”.',
      'O verbo vem sempre no fim da frase.'],
    sentences: ['水をのみます。|みずをのみます。|mizu o nomimasu.|Eu bebo água.|水=mizu=água/を=o=partícula de objeto (escrita を, lida o)/のみます=nomimasu=beber|O sujeito “eu” fica subentendido.',
      '本をよみます。|ほんをよみます。|hon o yomimasu.|Eu leio um livro.|本=hon=livro/を=o=partícula de objeto/よみます=yomimasu=ler|',
      '学校にいきます。|がっこうにいきます。|gakkou ni ikimasu.|Vou à escola.|学校=gakkou=escola/に=ni=para (destino)/いきます=ikimasu=ir|',
      '日本へいきます。|にほんへいきます。|nihon e ikimasu.|Vou ao Japão.|日本=nihon=Japão/へ=e=para, em direção a (escrita へ, lida e)/いきます=ikimasu=ir|へ como partícula se lê “e”.',
      '月曜日に学校へいきます。|げつようびにがっこうへいきます。|getsuyoubi ni gakkou e ikimasu.|Na segunda-feira vou à escola.|月曜日=getsuyoubi=segunda-feira/に=ni=em (tempo)/学校=gakkou=escola/へ=e=para/いきます=ikimasu=ir|に também marca o momento: 月曜日に = na segunda.'],
    tip: 'は (wa), へ (e), を (o): as três partículas que se escrevem diferente de como se leem.' },
  { id: 'f6', title: 'Pequena leitura: o meu dia na escola', emblem: '読', kind: 'story',
    intro: ['Agora um texto curto, frase por frase. Leia primeiro sem o romaji; depois confira.',
      '「」 são as aspas japonesas: marcam o que alguém fala. と depois das aspas indica a citação.',
      'も significa “também”.'],
    sentences: ['これは私の学校です。|これはわたしのがっこうです。|kore wa watashi no gakkou desu.|Esta é a minha escola.|これ=kore=isto/は=wa=tópico/私=watashi=eu/の=no=de/学校=gakkou=escola/です=desu=é|',
      '学校の中に大きい木があります。|がっこうのなかにおおきいきがあります。|gakkou no naka ni ookii ki ga arimasu.|Dentro da escola há uma árvore grande.|学校=gakkou=escola/の=no=de/中=naka=dentro/に=ni=em (lugar)/大きい=ookii=grande/木=ki=árvore/が=ga=sujeito/あります=arimasu=existir (coisas)|学校の中に = “no dentro da escola” = dentro da escola.',
      'ねこもいます。|ねこもいます。|neko mo imasu.|Também tem um gato.|ねこ=neko=gato/も=mo=também/います=imasu=existir (seres vivos)|も substitui が: “o gato também”.',
      '先生は「おはよう！」といいます。|せんせいは「おはよう！」といいます。|sensei wa "ohayou!" to iimasu.|O(a) professor(a) diz: “Bom dia!”|先生=sensei=professor(a)/は=wa=tópico/「おはよう！」=ohayou=“Bom dia!” (fala, entre aspas japonesas)/と=to=(marca a citação)/いいます=iimasu=dizer|「」 = aspas. ！ = exclamação.'],
    tip: 'Num texto, as partículas são as placas de trânsito: elas mostram onde cada palavra começa e termina.' },
  { id: 'f7', title: 'Rumo ao mangá: falas e sons', emblem: '漫', kind: 'manga',
    intro: ['Mangás misturam falas curtas e efeitos sonoros. As falas ficam nos balões; os sons, desenhados na cena, quase sempre em katakana.',
      '？ e ！ são comuns. … indica pausa ou hesitação. Um っ no fim (あっ！) é uma interrupção brusca, como um susto.',
      'Esta é só a preparação: aqui você reconhece os elementos que vai encontrar em mangás de verdade.'],
    sentences: ['ドキドキ…|ドキドキ…|dokidoki...|(coração batendo forte)|ドキドキ=dokidoki=som do coração acelerado (katakana: efeito sonoro)/…=...=reticências: tensão|Efeito sonoro, desenhado na cena.',
      '「すごい！」|「すごい！」|"sugoi!"|“Incrível!”|すごい=sugoi=incrível, demais/！=!=exclamação|Uma das falas mais comuns em animes e mangás.',
      '「まって！」|「まって！」|"matte!"|“Espere!”|まって=matte=espere (っ: pausa)|',
      '「え？ほんとう？」|「え？ほんとう？」|"e? hontou?"|“Hã? Sério?”|え=e=hã? (surpresa)/？=?=interrogação/ほんとう=hontou=verdade; sério?|',
      'ゴロゴロ|ゴロゴロ|gorogoro|(trovão ao longe)|ゴロゴロ=gorogoro=som de trovão; também “rolar à toa”|O mesmo som pode ter sentidos diferentes: o desenho mostra qual.',
      '「あっ！いくよ！」|「あっ！いくよ！」|"a! iku yo!"|“Ah! Lá vou eu!”|あっ=a=ah! (っ: corte brusco)/いく=iku=ir/よ=yo=partícula de ênfase: “viu!”|'],
    tip: 'Em mangás, leia os balões da direita para a esquerda e de cima para baixo.' },
  { id: 'f8', title: 'Pequena leitura: um passeio no zoológico', emblem: '園', kind: 'story',
    intro: ['Um texto curto com palavras da Academia de Vocabulário: animais, cores e emoções.',
      'Repare como os adjetivos vêm antes do substantivo: 大きいぞう = elefante grande.'],
    sentences: ['きょうはどうぶつえんにいきます。|きょうはどうぶつえんにいきます。|kyou wa doubutsuen ni ikimasu.|Hoje vou ao zoológico.|きょう=kyou=hoje/は=wa=tópico/どうぶつえん=doubutsuen=zoológico/に=ni=para (destino)/いきます=ikimasu=ir|',
      '大きいぞうがいます。|おおきいぞうがいます。|ookii zou ga imasu.|Tem um elefante grande.|大きい=ookii=grande/ぞう=zou=elefante/が=ga=sujeito/います=imasu=existir (seres vivos)|Animal é ser vivo: います.',
      'パンダはかわいいです。|パンダはかわいいです。|panda wa kawaii desu.|O panda é fofo.|パンダ=panda=panda (katakana)/は=wa=tópico/かわいい=kawaii=fofo/です=desu=é|',
      '私はあおいシャツをかいます。|わたしはあおいシャツをかいます。|watashi wa aoi shatsu o kaimasu.|Eu compro uma camisa azul.|私=watashi=eu/は=wa=tópico/あおい=aoi=azul/シャツ=shatsu=camisa/を=o=objeto/かいます=kaimasu=comprar|',
      'とてもたのしいです。|とてもたのしいです。|totemo tanoshii desu.|É muito divertido.|とても=totemo=muito/たのしい=tanoshii=divertido/です=desu=é|'],
    tip: 'Encontrou uma palavra nova? Toque nela no Dicionário ou estude na Academia de Vocabulário.' }
  ]
}
];
/* letras parecidas usadas nos exercícios de diferenciar (além das lições de parecidos) */
const READ_SIMILAR = ['ぬめ', 'るろ', 'われね', 'さち', 'はほ', 'いり', 'こに', 'あお', 'きさ', 'ばぱ', 'びぴ', 'ぶぷ', 'べぺ', 'ぼぽ', 'シツ', 'ソン', 'クケタ', 'ウワフ', 'アマ', 'ノメ', 'コユ', 'チテ', 'ヌス', 'バパ', 'ビピ', 'ブプ', 'ベペ', 'ボポ'];
/* placas do Living Japanese World que podem ser lidas (lugar do mundo → palavra em kana já estudada no curso) */
const READ_SIGNS = { eki: ['えき', 'でぐち', 'いりぐち'], konbini: ['コンビニ', 'おす', 'ひく'], resutoran: ['ラーメン', 'すし', 'おちゃ'], gakkou: ['がっこう', 'せんせい'], machi: ['みせ', 'トイレ', 'とまれ'] };
