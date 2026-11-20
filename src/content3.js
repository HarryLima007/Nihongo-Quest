/* ==========================================================
   CONTEÚDO 2.1 — Trilha da Escrita: Hiragana completo, Katakana e Kanji
   Lições novas usam ids novos (c2l2…, c3l1…, c7l1…). Nunca renomeie ids
   publicados: eles guardam o progresso do aluno.
   ========================================================== */
/* lições existentes na 1.0 (usado pela conquista “Pioneiro da Academia”) */
const V1_LESSON_IDS = CATS.flatMap(c => c.lessons.map(l => l.id));

(function () {
  const cat = id => CATS.find(c => c.id === id);
  /* caractere de kana: [chave, caractere, romaji, nota, exemplo jp, exemplo romaji, exemplo pt] */
  const K = a => ({ k: a[0], jp: a[1], ro: a[2], pt: 'som “' + a[2] + '”', note: a[3], ex: a[4] ? { jp: a[4], ro: a[5], pt: a[6] } : undefined });

  /* ---------------- HIRAGANA (c2) ---------------- */
  const c2 = cat('c2');
  c2.desc = 'O alfabeto básico do japonês: os 46 caracteres, os sons modificados, as combinações e as primeiras palavras.';
  c2.soon = [];
  c2.lessons.push(
  {
    id: 'c2l2', title: 'Linhas K e S', emblem: 'か', kind: 'kana',
    intro: [
      'O hiragana é organizado em linhas. Cada linha junta uma consoante às cinco vogais, sempre na ordem a, i, u, e, o.',
      'Linha K: か き く け こ (ka, ki, ku, ke, ko). Linha S: さ し す せ そ (sa, shi, su, se, so).',
      'Atenção a し: não é “si”, é “shi”, como o “xi” de “xícara”. O “s” de さ す せ そ é sempre o “s” de “sapo”, nunca o som de “z”.',
      'O “u” de く e す costuma ficar bem fraquinho na fala: です soa quase como “dess”.'
    ],
    tip: 'Leia a linha inteira em voz alta, como uma música: ka-ki-ku-ke-ko, sa-shi-su-se-so.',
    items: [
      K(['ka', 'か', 'ka', 'Som de “ca” de “casa”.', 'かさ', 'kasa', 'guarda-chuva']),
      K(['ki', 'き', 'ki', 'Som de “qui” de “quilo”.', 'き', 'ki', 'árvore']),
      K(['ku', 'く', 'ku', 'Som de “cu” curto, com os lábios relaxados. Parece um bico de pássaro aberto.', 'くち', 'kuchi', 'boca']),
      K(['ke', 'け', 'ke', 'Som de “quê”.', 'いけ', 'ike', 'lagoa']),
      K(['ko', 'こ', 'ko', 'Som de “cô”. Dois tracinhos paralelos.', 'ここ', 'koko', 'aqui']),
      K(['sa', 'さ', 'sa', 'Som de “sa” de “sapo”. Parecido com き, mas com um traço horizontal só.', 'さけ', 'sake', 'salmão; também saquê']),
      K(['shi', 'し', 'shi', 'Som de “xi”. Um anzol: um único traço que desce e curva.', 'しお', 'shio', 'sal']),
      K(['su', 'す', 'su', 'Som de “su” curto. Tem um laço no meio.', 'すし', 'sushi', 'sushi']),
      K(['se', 'せ', 'se', 'Som de “sê”.', 'せかい', 'sekai', 'mundo']),
      K(['so', 'そ', 'so', 'Som de “sô”. Um zigue-zague com rabinho.', 'そこ', 'soko', 'aí, esse lugar'])
    ],
    examples: [
      { jp: 'あかい', ro: 'akai', pt: 'vermelho' },
      { jp: 'すき', ro: 'suki', pt: 'gostar, gosto de' },
      { jp: 'おかし', ro: 'okashi', pt: 'doce, guloseima' }
    ],
    exercises: [
      { t: 'order', prompt: 'Coloque a linha K na ordem', pt: 'ka, ki, ku, ke, ko', tiles: ['か', 'き', 'く', 'け', 'こ'], extra: ['さ'], noRomaji: true, explain: 'A ordem é sempre a, i, u, e, o: か き く け こ.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'sushi', jp: 'す＿', opts: ['し', 'さ', 'そ'], ans: 0, noRomaji: true, explain: 'すし = su + shi. し é “shi”.' },
      { t: 'error', ctx: 'Quero escrever “sake” (salmão):', tokens: ['さ', 'き'], wrong: 1, noRomaji: true, explain: 'き é “ki”. O certo é さけ, com け (ke).' },
      { t: 'situation', prompt: 'Qual caractere tem o som “shi”?', opts: ['し', 'す', 'さ'], ans: 0, noRomaji: true, explain: 'し = shi. A linha S tem esse som especial no “i”.' }
    ]
  },
  {
    id: 'c2l3', title: 'Linhas T e N', emblem: 'た', kind: 'kana',
    intro: [
      'Linha T: た ち つ て と (ta, chi, tsu, te, to). Linha N: な に ぬ ね の (na, ni, nu, ne, no).',
      'Dois sons especiais na linha T: ち é “chi” (como “tchi” de “tchau”) e つ é “tsu”, um “t” e um “s” juntos, como em “tsunami”.',
      'O “t” de て e と é sempre seco, como em “teto”. Nunca vira “tchi” como em algumas regiões do Brasil.',
      'の é uma das partículas mais usadas da língua: indica posse, como “de” em português.'
    ],
    tip: 'Para つ, diga “tsu” como o começo de “tsunami”, que aliás é uma palavra japonesa: つなみ.',
    items: [
      K(['ta', 'た', 'ta', 'Som de “ta”.', 'たこ', 'tako', 'polvo']),
      K(['chi', 'ち', 'chi', 'Som de “tchi”. Parece um “5” espelhado.', 'ちず', 'chizu', 'mapa']),
      K(['tsu', 'つ', 'tsu', 'Som de “tsu”. Uma onda só.', 'つくえ', 'tsukue', 'mesa, escrivaninha']),
      K(['te', 'て', 'te', 'Som de “tê”, seco.', 'て', 'te', 'mão']),
      K(['to', 'と', 'to', 'Som de “tô”.', 'とけい', 'tokei', 'relógio']),
      K(['na', 'な', 'na', 'Som de “na”.', 'なつ', 'natsu', 'verão']),
      K(['ni', 'に', 'ni', 'Som de “ni”.', 'にく', 'niku', 'carne']),
      K(['nu', 'ぬ', 'nu', 'Som de “nu”. Parecido com め, mas com um laço no final.', 'いぬ', 'inu', 'cachorro']),
      K(['ne', 'ね', 'ne', 'Som de “nê”. Termina com um laço.', 'ねこ', 'neko', 'gato']),
      K(['no', 'の', 'no', 'Som de “nô”. Um redemoinho.', 'のみもの', 'nomimono', 'bebida'])
    ],
    examples: [
      { jp: 'わたしの ねこ', ro: 'watashi no neko', pt: 'o meu gato (の indica posse)' },
      { jp: 'くつ', ro: 'kutsu', pt: 'sapato' },
      { jp: 'なに', ro: 'nani', pt: 'o quê' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual caractere tem o som “tsu”?', opts: ['つ', 'ち', 'し'], ans: 0, noRomaji: true, explain: 'つ = tsu. ち = chi e し = shi.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'neko (gato)', jp: '＿こ', opts: ['ね', 'ぬ', 'の'], ans: 0, noRomaji: true, explain: 'ねこ = ne + ko. ぬ é “nu” e の é “no”.' },
      { t: 'error', ctx: 'Quero escrever “inu” (cachorro):', tokens: ['い', 'め'], wrong: 1, noRomaji: true, explain: 'め é “me”. O certo é いぬ: ぬ tem um laço no final.' },
      { t: 'order', prompt: 'Coloque a linha T na ordem', pt: 'ta, chi, tsu, te, to', tiles: ['た', 'ち', 'つ', 'て', 'と'], extra: ['な'], noRomaji: true, explain: 'た ち つ て と.' }
    ]
  },
  {
    id: 'c2l4', title: 'Linhas H e M', emblem: 'は', kind: 'kana',
    intro: [
      'Linha H: は ひ ふ へ ほ (ha, hi, fu, he, ho). Linha M: ま み む め も (ma, mi, mu, me, mo).',
      'O “h” japonês é um sopro, como o “h” do inglês “hello”. Nunca é mudo e nunca é o “r” de “rato”.',
      'ふ fica entre “fu” e “hu”: sopre suavemente com os lábios quase fechados, sem encostar os dentes no lábio.',
      'Duas exceções importantes: quando は é partícula, lê-se “wa” (こんにちは). Quando へ é partícula, lê-se “e”.'
    ],
    tip: 'Você já viu は lido como “wa” em こんにちは. Agora sabe o motivo: ali ele é uma partícula!',
    items: [
      K(['ha', 'は', 'ha', 'Som de “rá” suave, só um sopro. Como partícula, lê-se “wa”.', 'はな', 'hana', 'flor; também nariz']),
      K(['hi', 'ひ', 'hi', 'Som de “hi”, um sopro com “i”. Parece um sorriso.', 'ひと', 'hito', 'pessoa']),
      K(['fu', 'ふ', 'fu', 'Entre “fu” e “hu”: sopre com os lábios quase fechados.', 'ふね', 'fune', 'barco']),
      K(['he', 'へ', 'he', 'Som de “rê” suave. Parece um morrinho. Como partícula, lê-se “e”.', 'へや', 'heya', 'quarto, cômodo']),
      K(['ho', 'ほ', 'ho', 'Som de “rô” suave.', 'ほし', 'hoshi', 'estrela']),
      K(['ma', 'ま', 'ma', 'Som de “ma”.', 'まど', 'mado', 'janela']),
      K(['mi', 'み', 'mi', 'Som de “mi”.', 'みみ', 'mimi', 'orelha']),
      K(['mu', 'む', 'mu', 'Som de “mu” curto.', 'むし', 'mushi', 'inseto']),
      K(['me', 'め', 'me', 'Som de “mê”. Parecido com ぬ, mas sem o laço.', 'め', 'me', 'olho']),
      K(['mo', 'も', 'mo', 'Som de “mô”. É a partícula “também” que você viu na Gramática.', 'もも', 'momo', 'pêssego'])
    ],
    examples: [
      { jp: 'ふゆ', ro: 'fuyu', pt: 'inverno' },
      { jp: 'ひま', ro: 'hima', pt: 'tempo livre, estar à toa' },
      { jp: 'まめ', ro: 'mame', pt: 'feijão, grão' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Em こんにちは, como se lê o último caractere?', opts: ['wa', 'ha', 'ho'], ans: 0, explain: 'は é partícula ali, então se lê “wa”.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'hana (flor)', jp: '＿な', opts: ['は', 'ほ', 'ま'], ans: 0, noRomaji: true, explain: 'はな = ha + na.' },
      { t: 'error', ctx: 'Quero escrever “mame” (feijão):', tokens: ['ま', 'ぬ'], wrong: 1, noRomaji: true, explain: 'ぬ é “nu”, que tem um laço no final. “me” é め, sem laço: まめ.' },
      { t: 'order', prompt: 'Coloque a linha M na ordem', pt: 'ma, mi, mu, me, mo', tiles: ['ま', 'み', 'む', 'め', 'も'], extra: ['は'], noRomaji: true, explain: 'ま み む め も.' }
    ]
  },
  {
    id: 'c2l5', title: 'Linhas Y, R, W e ん', emblem: 'ん', kind: 'kana',
    intro: [
      'Linha Y: só três sons, や ゆ よ (ya, yu, yo). Linha R: ら り る れ ろ (ra, ri, ru, re, ro).',
      'O “r” japonês é um toque leve da língua, como o “r” de “caro”. Às vezes soa quase como um “l”.',
      'Linha W: わ (wa) e を (wo). を quase só aparece como partícula de objeto e é pronunciado “o”.',
      'Por fim, ん (n) é o único caractere que é só uma consoante. Antes de “b”, “p” e “m”, ele soa como “m”: しんぶん (jornal) soa “shimbun”.'
    ],
    tip: 'Parabéns: com esta lição você conhece os 46 caracteres básicos do hiragana!',
    items: [
      K(['ya', 'や', 'ya', 'Som de “iá”.', 'やま', 'yama', 'montanha']),
      K(['yu', 'ゆ', 'yu', 'Som de “iú”.', 'ゆめ', 'yume', 'sonho']),
      K(['yo', 'よ', 'yo', 'Som de “iô”.', 'よる', 'yoru', 'noite']),
      K(['ra', 'ら', 'ra', '“r” leve, como em “caro”.', 'さくら', 'sakura', 'cerejeira']),
      K(['ri', 'り', 'ri', '“ri” leve. Dois tracinhos verticais.', 'りんご', 'ringo', 'maçã']),
      K(['ru', 'る', 'ru', '“ru” leve. Termina com um laço (diferente de ろ).', 'くるま', 'kuruma', 'carro']),
      K(['re', 'れ', 're', '“rê” leve.', 'れきし', 'rekishi', 'história (matéria)']),
      K(['ro', 'ろ', 'ro', '“rô” leve. Igual a る, mas sem o laço.', 'いろ', 'iro', 'cor']),
      K(['wa', 'わ', 'wa', 'Som de “uá”.', 'わたし', 'watashi', 'eu']),
      K(['wo', 'を', 'wo', 'Pronuncia-se “o”. Usado quase só como partícula de objeto.', 'みずを のむ', 'mizu o nomu', 'beber água']),
      K(['n', 'ん', 'n', 'Som de “n” sozinho, sem vogal. Antes de b, p e m soa como “m”.', 'ほん', 'hon', 'livro'])
    ],
    examples: [
      { jp: 'しんぶん', ro: 'shinbun', pt: 'jornal (soa “shimbun”)' },
      { jp: 'ありがとう', ro: 'arigatou', pt: 'obrigado: agora você consegue ler quase tudo!' },
      { jp: 'よろしく', ro: 'yoroshiku', pt: 'conto com você (informal)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual caractere é só uma consoante, sem vogal?', opts: ['ん', 'る', 'わ'], ans: 0, noRomaji: true, explain: 'ん é o “n” sozinho.' },
      { t: 'error', ctx: 'Quero escrever “iro” (cor):', tokens: ['い', 'る'], wrong: 1, noRomaji: true, explain: 'る (ru) tem um laço no final. “ro” é ろ, sem laço: いろ.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'sakura (cerejeira)', jp: 'さく＿', opts: ['ら', 'ろ', 'わ'], ans: 0, noRomaji: true, explain: 'さくら = sa + ku + ra.' },
      { t: 'situation', prompt: 'Como se pronuncia a partícula を?', opts: ['o', 'wa', 'n'], ans: 0, explain: 'A partícula を soa “o”, igual a お.' }
    ]
  },
  {
    id: 'c2l6', title: 'Sons com ゛: が ざ だ', emblem: 'が', kind: 'kana',
    intro: [
      'Dois tracinhos no canto (゛, chamados dakuten) deixam o som “vozeado”: か (ka) vira が (ga), さ (sa) vira ざ (za), た (ta) vira だ (da).',
      'Você não precisa decorar caracteres novos: são os mesmos de antes, com os tracinhos.',
      'Atenção: じ é “ji” (como “dji”) e ず é “zu”. Na linha D, ぢ e づ existem, mas soam igual a じ e ず e aparecem pouco (はなぢ, sangramento nasal; つづく, continuar).',
      'O “g” de が é sempre o “g” de “gato”, mesmo antes de “i” e “e”: ぎ é “gui”, げ é “guê”.'
    ],
    tip: 'Em finais de episódio você vê つづく: “continua”. Repare no づ!',
    items: [
      K(['ga', 'が', 'ga', 'か + ゛. Som de “ga”.', 'がっこう', 'gakkou', 'escola']),
      K(['gi', 'ぎ', 'gi', 'き + ゛. Som de “gui”.', 'ぎんこう', 'ginkou', 'banco']),
      K(['gu', 'ぐ', 'gu', 'く + ゛. Som de “gu”.', 'ぐあい', 'guai', 'condição (de saúde)']),
      K(['ge', 'げ', 'ge', 'け + ゛. Som de “guê”.', 'げんき', 'genki', 'disposição, saúde']),
      K(['go', 'ご', 'go', 'こ + ゛. Som de “gô”.', 'ごはん', 'gohan', 'arroz, refeição']),
      K(['za', 'ざ', 'za', 'さ + ゛. Som de “za”.', 'ざっし', 'zasshi', 'revista']),
      K(['ji', 'じ', 'ji', 'し + ゛. Som de “dji”.', 'じかん', 'jikan', 'tempo, horas']),
      K(['zu', 'ず', 'zu', 'す + ゛. Som de “zu”.', 'みず', 'mizu', 'água']),
      K(['ze', 'ぜ', 'ze', 'せ + ゛. Som de “zê”.', 'かぜ', 'kaze', 'vento; também resfriado']),
      K(['zo', 'ぞ', 'zo', 'そ + ゛. Som de “zô”.', 'かぞく', 'kazoku', 'família']),
      K(['da', 'だ', 'da', 'た + ゛. Som de “da”.', 'ともだち', 'tomodachi', 'amigo']),
      K(['de', 'で', 'de', 'て + ゛. Som de “dê”, seco (nunca “dji”).', 'でんわ', 'denwa', 'telefone']),
      K(['do', 'ど', 'do', 'と + ゛. Som de “dô”.', 'どこ', 'doko', 'onde'])
    ],
    examples: [
      { jp: 'だいじょうぶ', ro: 'daijoubu', pt: 'tudo bem: três sons com ゛ numa palavra só!' },
      { jp: 'つづく', ro: 'tsuzuku', pt: 'continua (fim de episódio)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'O que os tracinhos ゛ fazem com か?', opts: ['が|ga', 'ぱ|pa', 'き|ki'], ans: 0, explain: 'か + ゛ = が (ga).' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'mizu (água)', jp: 'み＿', opts: ['ず', 'す', 'じ'], ans: 0, noRomaji: true, explain: 'みず = mi + zu. す sem tracinhos seria “su”.' },
      { t: 'error', ctx: 'Quero escrever “denwa” (telefone):', tokens: ['て', 'ん', 'わ'], wrong: 0, noRomaji: true, explain: 'て é “te”. Para “de” precisamos de で, com os tracinhos.' }
    ]
  },
  {
    id: 'c2l7', title: 'Sons com ゛ e ゜: ば ぱ', emblem: 'ぱ', kind: 'kana',
    intro: [
      'A linha H tem duas versões modificadas. Com ゛ (dakuten), は vira ば (ba). Com uma bolinha ゜ (handakuten), は vira ぱ (pa).',
      'A bolinha só aparece na linha H. Ela é muito comum em onomatopeias: ぴかぴか (brilhando), ぺこぺこ (morrendo de fome).',
      'Repare: ふ com ゛ vira ぶ (bu), e com ゜ vira ぷ (pu).'
    ],
    tip: 'Bolinha = “p”. Dois tracinhos = “b”. Só isso!',
    items: [
      K(['ba', 'ば', 'ba', 'は + ゛.', 'ばんごはん', 'bangohan', 'jantar']),
      K(['bi', 'び', 'bi', 'ひ + ゛.', 'びょういん', 'byouin', 'hospital']),
      K(['bu', 'ぶ', 'bu', 'ふ + ゛.', 'ぶどう', 'budou', 'uva']),
      K(['be', 'べ', 'be', 'へ + ゛.', 'たべる', 'taberu', 'comer']),
      K(['bo', 'ぼ', 'bo', 'ほ + ゛.', 'ぼく', 'boku', 'eu (masculino)']),
      K(['pa', 'ぱ', 'pa', 'は + ゜.', 'かんぱい', 'kanpai', 'saúde! (num brinde)']),
      K(['pi', 'ぴ', 'pi', 'ひ + ゜.', 'ぴかぴか', 'pikapika', 'brilhando, reluzente']),
      K(['pu', 'ぷ', 'pu', 'ふ + ゜.', 'てんぷら', 'tenpura', 'tempurá']),
      K(['pe', 'ぺ', 'pe', 'へ + ゜.', 'ぺこぺこ', 'pekopeko', 'morrendo de fome']),
      K(['po', 'ぽ', 'po', 'ほ + ゜.', 'さんぽ', 'sanpo', 'passeio, caminhada'])
    ],
    examples: [
      { jp: 'おなかが ぺこぺこ', ro: 'onaka ga pekopeko', pt: 'Estou morrendo de fome.' },
      { jp: 'かんぱい！', ro: 'kanpai!', pt: 'Saúde! (no brinde)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual destes tem o som “pa”?', opts: ['ぱ', 'ば', 'は'], ans: 0, noRomaji: true, explain: 'A bolinha ゜ dá o som de “p”: ぱ.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'kanpai (saúde!)', jp: 'かん＿い', opts: ['ぱ', 'ば', 'は'], ans: 0, noRomaji: true, explain: 'かんぱい = kan + pa + i.' },
      { t: 'error', ctx: 'Quero escrever “boku” (eu):', tokens: ['ほ', 'く'], wrong: 0, noRomaji: true, explain: 'ほ é “ho”. O certo é ぼく, com ゛.' }
    ]
  },
  {
    id: 'c2l8', title: 'Combinações, pausas e sons longos', emblem: 'ゃ', kind: 'kanaword',
    intro: [
      'Três detalhes completam o hiragana. 1) ゃ ゅ ょ pequenos depois de um caractere com “i” formam uma sílaba só: き + ゃ = きゃ (kya), し + ゅ = しゅ (shu), ち + ょ = ちょ (cho).',
      '2) Um っ pequeno não tem som próprio: ele é uma pequena pausa antes da consoante seguinte. きって (kitte) tem um “tempo” a mais no meio.',
      '3) Vogais longas: おう e おお soam como um “ô” comprido; うう como “u” comprido; えい costuma soar como “ê” comprido. Uma vogal longa pode mudar totalmente a palavra.',
      'No Treino de sons da Academia Auditiva você treina exatamente essas diferenças pelo ouvido.'
    ],
    tip: 'Compare grande e pequeno: びよういん (bi-yo-u-in, salão de beleza) e びょういん (byou-in, hospital).',
    items: [
      { k: 'shashin', jp: 'しゃしん', ro: 'shashin', pt: 'foto', note: 'しゃ = sha, uma sílaba só.', ex: { jp: 'しゃしんを とって。', ro: 'shashin o totte.', pt: 'Tira uma foto.' } },
      { k: 'ryokou', jp: 'りょこう', ro: 'ryokou', pt: 'viagem', note: 'りょ (ryo) + こう (kou, com “o” longo).' },
      { k: 'jugyou', jp: 'じゅぎょう', ro: 'jugyou', pt: 'aula', note: 'じゅ (ju) + ぎょう (gyou, longo).' },
      { k: 'byouki', jp: 'びょうき', ro: 'byouki', pt: 'doença', note: 'びょう (byou) + き. Mesmo começo de びょういん (hospital).' },
      { k: 'gyuunyuu', jp: 'ぎゅうにゅう', ro: 'gyuunyuu', pt: 'leite', note: 'Duas sílabas combinadas e longas: gyuu-nyuu.' },
      { k: 'kippu', jp: 'きっぷ', ro: 'kippu', pt: 'bilhete (de trem)', note: 'O っ pequeno faz uma pausa antes do “pu”: kip-pu.' },
      { k: 'zasshi', jp: 'ざっし', ro: 'zasshi', pt: 'revista', note: 'Pausa antes do “shi”: zas-shi.' },
      { k: 'tooi', jp: 'とおい', ro: 'tooi', pt: 'longe, distante', note: 'とお = “o” longo. Exceção: aqui o “o” longo é escrito com お, e não com う.' }
    ],
    examples: [
      { jp: 'きって と きて', ro: 'kitte to kite', pt: 'selo e “venha”: a pausa っ muda a palavra.' },
      { jp: 'ちょっと まって', ro: 'chotto matte', pt: 'espera um pouco: ちょ combinado e duas pausas っ.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Como se lê きゃ?', opts: ['kya', 'kiya', 'ka'], ans: 0, explain: 'き + ゃ pequeno formam uma sílaba só: kya.' },
      { t: 'error', ctx: 'Quero escrever “kippu” (bilhete):', tokens: ['き', 'つ', 'ぷ'], wrong: 1, noRomaji: true, explain: 'Precisa do っ PEQUENO, que faz a pausa: きっぷ. O つ grande seria “tsu”.' },
      { t: 'situation', prompt: 'Qual palavra significa “hospital”?', opts: ['びょういん|byouin', 'びよういん|biyouin', 'びょうき|byouki'], ans: 0, explain: 'びょういん (byouin) = hospital. びよういん = salão de beleza; びょうき = doença.' },
      { t: 'fill', prompt: 'Complete com o som longo', pt: 'ryokou (viagem)', jp: 'りょこ＿', opts: ['う', 'お', 'ん'], ans: 0, noRomaji: true, explain: 'O “o” longo depois de “ko” normalmente é escrito com う: りょこう.' }
    ]
  });

  /* ---------------- KATAKANA (c3) ---------------- */
  const c3 = cat('c3');
  c3.desc = 'O alfabeto das palavras estrangeiras, nomes e efeitos sonoros. Os sons são os mesmos do hiragana.';
  c3.soon = [];
  c3.examExtra = [];
  c3.lessons.push(
  {
    id: 'c3l1', title: 'Katakana: ア até ソ', emblem: 'ア', kind: 'kana',
    intro: [
      'O katakana tem os mesmos sons do hiragana, mas com traços mais retos. Ele é usado em palavras estrangeiras (コーヒー, café), nomes estrangeiros, marcas e muitos efeitos sonoros de mangá.',
      'Nesta lição: vogais ア イ ウ エ オ, linha K カ キ ク ケ コ e linha S サ シ ス セ ソ.',
      'Cuidado com o par mais traiçoeiro: シ (shi) e ツ (tsu, na próxima lição). Em シ os tracinhos ficam mais na horizontal e o traço longo sobe de baixo para cima.',
      'Outro par: ソ (so) e ン (n, que você verá depois). Em ソ o traço longo desce de cima para baixo.'
    ],
    tip: 'Seu nome em katakana fica bem divertido. Harry, por exemplo, é ハリー!',
    items: [
      K(['a', 'ア', 'a', 'Mesmo som de あ.', 'アイス', 'aisu', 'sorvete']),
      K(['i', 'イ', 'i', 'Mesmo som de い.', 'イタリア', 'itaria', 'Itália']),
      K(['u', 'ウ', 'u', 'Mesmo som de う.', 'ウイルス', 'uirusu', 'vírus']),
      K(['e', 'エ', 'e', 'Mesmo som de え. Parece um “I” maiúsculo.', 'エアコン', 'eakon', 'ar-condicionado']),
      K(['o', 'オ', 'o', 'Mesmo som de お.', 'オレンジ', 'orenji', 'laranja']),
      K(['ka', 'カ', 'ka', 'Parece com か, sem o tracinho extra.', 'カメラ', 'kamera', 'câmera']),
      K(['ki', 'キ', 'ki', 'Parece com き, sem a curva de baixo.', 'キス', 'kisu', 'beijo']),
      K(['ku', 'ク', 'ku', 'Ângulo com um telhadinho.', 'クラス', 'kurasu', 'turma, classe']),
      K(['ke', 'ケ', 'ke', 'Parece um “K” torto.', 'ケーキ', 'keeki', 'bolo']),
      K(['ko', 'コ', 'ko', 'Um quadrado aberto do lado esquerdo.', 'ココア', 'kokoa', 'chocolate quente']),
      K(['sa', 'サ', 'sa', 'Parecido com さ, mais reto.', 'サッカー', 'sakkaa', 'futebol']),
      K(['shi', 'シ', 'shi', 'Tracinhos mais deitados; o traço longo sobe. Não confunda com ツ.', 'シャツ', 'shatsu', 'camisa']),
      K(['su', 'ス', 'su', 'Parece um boneco correndo.', 'スポーツ', 'supootsu', 'esporte']),
      K(['se', 'セ', 'se', 'Parecido com せ.', 'セーター', 'seetaa', 'suéter, blusa de lã']),
      K(['so', 'ソ', 'so', 'O traço longo desce de cima. Não confunda com ン.', 'ソファー', 'sofaa', 'sofá'])
    ],
    examples: [
      { jp: 'アイス', ro: 'aisu', pt: 'sorvete (do inglês “ice”)' },
      { jp: 'ケーキ', ro: 'keeki', pt: 'bolo: o traço ー alonga a vogal' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual caractere é “shi” em katakana?', opts: ['シ', 'ツ', 'ソ'], ans: 0, noRomaji: true, explain: 'シ = shi (tracinhos deitados). ツ = tsu e ソ = so.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'kamera (câmera)', jp: '＿メラ', opts: ['カ', 'ケ', 'コ'], ans: 0, noRomaji: true, explain: 'カメラ = ka + me + ra.' },
      { t: 'order', prompt: 'Coloque as vogais em katakana na ordem', pt: 'a, i, u, e, o', tiles: ['ア', 'イ', 'ウ', 'エ', 'オ'], extra: ['コ'], noRomaji: true, explain: 'ア イ ウ エ オ.' }
    ]
  },
  {
    id: 'c3l2', title: 'Katakana: タ até ホ', emblem: 'タ', kind: 'kana',
    intro: [
      'Linhas T, N e H: タ チ ツ テ ト, ナ ニ ヌ ネ ノ, ハ ヒ フ ヘ ホ.',
      'ツ (tsu) tem os tracinhos mais em pé e o traço longo desce de cima. Compare com シ (shi) da lição anterior.',
      'ヘ (he) é praticamente igual ao hiragana へ. ニ (ni) parece o kanji do número dois (二).',
      'Lembre: no katakana, palavras estrangeiras com “f” usam フ: フランス (França).'
    ],
    tip: 'Truque: シ e ツ são como rostos. Em シ os “olhos” olham para a esquerda; em ツ, para baixo.',
    items: [
      K(['ta', 'タ', 'ta', 'Parece um ク com um tracinho dentro.', 'タクシー', 'takushii', 'táxi']),
      K(['chi', 'チ', 'chi', 'Som de “tchi”.', 'チーズ', 'chiizu', 'queijo']),
      K(['tsu', 'ツ', 'tsu', 'Tracinhos em pé; o traço longo desce. Não confunda com シ.', 'ツアー', 'tsuaa', 'excursão']),
      K(['te', 'テ', 'te', 'Som de “tê”, seco.', 'テスト', 'tesuto', 'prova, teste']),
      K(['to', 'ト', 'to', 'Um traço com um galhinho.', 'トマト', 'tomato', 'tomate']),
      K(['na', 'ナ', 'na', 'Uma cruz inclinada.', 'バナナ', 'banana', 'banana']),
      K(['ni', 'ニ', 'ni', 'Dois traços, como o kanji 二.', 'テニス', 'tenisu', 'tênis (esporte)']),
      K(['nu', 'ヌ', 'nu', 'Parece um ス com um tracinho.', 'カヌー', 'kanuu', 'canoa']),
      K(['ne', 'ネ', 'ne', 'Som de “nê”.', 'ネクタイ', 'nekutai', 'gravata']),
      K(['no', 'ノ', 'no', 'Um único traço inclinado.', 'ノート', 'nooto', 'caderno']),
      K(['ha', 'ハ', 'ha', 'Dois traços abertos, como um telhado.', 'ハンバーガー', 'hanbaagaa', 'hambúrguer']),
      K(['hi', 'ヒ', 'hi', 'Som de “hi”.', 'コーヒー', 'koohii', 'café']),
      K(['fu', 'フ', 'fu', 'Usado também para o “f” estrangeiro.', 'フランス', 'furansu', 'França']),
      K(['he', 'ヘ', 'he', 'Quase igual ao hiragana へ.', 'ヘリコプター', 'herikoputaa', 'helicóptero']),
      K(['ho', 'ホ', 'ho', 'Uma cruz com dois tracinhos.', 'ホテル', 'hoteru', 'hotel'])
    ],
    examples: [
      { jp: 'トマト', ro: 'tomato', pt: 'tomate' },
      { jp: 'ネコ', ro: 'neko', pt: 'gato: às vezes palavras japonesas são escritas em katakana para dar destaque.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual caractere é “tsu” em katakana?', opts: ['ツ', 'シ', 'ン'], ans: 0, noRomaji: true, explain: 'ツ = tsu: tracinhos em pé e o traço longo desce de cima.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'hoteru (hotel)', jp: '＿テル', opts: ['ホ', 'ハ', 'ヘ'], ans: 0, noRomaji: true, explain: 'ホテル = ho + te + ru.' },
      { t: 'error', ctx: 'Quero escrever “tesuto” (prova):', tokens: ['テ', 'ス', 'ナ'], wrong: 2, noRomaji: true, explain: 'ナ é “na”. O certo é テスト, terminando com ト (to).' }
    ]
  },
  {
    id: 'c3l3', title: 'Katakana: マ até ン', emblem: 'ン', kind: 'kana',
    intro: [
      'Últimas linhas: マ ミ ム メ モ, ヤ ユ ヨ, ラ リ ル レ ロ, ワ e ン.',
      'ヲ (wo) também existe, mas quase nunca é usado. Por isso não entra nos exercícios.',
      'ン (n) tem o traço longo subindo de baixo para cima, enquanto em ソ (so) ele desce. É a mesma diferença entre シ e ツ.',
      'Com esta lição você conhece todo o katakana básico!'
    ],
    tip: 'ミ (mi) tem três tracinhos, como se fosse “mi-mi-mi”.',
    items: [
      K(['ma', 'マ', 'ma', 'Parece um triângulo de ponta-cabeça com um gancho.', 'マンガ', 'manga', 'mangá, quadrinhos']),
      K(['mi', 'ミ', 'mi', 'Três tracinhos inclinados.', 'ミルク', 'miruku', 'leite (em produtos)']),
      K(['mu', 'ム', 'mu', 'Um triângulo com uma perninha.', 'ゲーム', 'geemu', 'jogo, videogame']),
      K(['me', 'メ', 'me', 'Um “X” torto.', 'メール', 'meeru', 'e-mail, mensagem']),
      K(['mo', 'モ', 'mo', 'Parecido com も.', 'メモ', 'memo', 'anotação, lembrete']),
      K(['ya', 'ヤ', 'ya', 'Parecido com や.', 'タイヤ', 'taiya', 'pneu']),
      K(['yu', 'ユ', 'yu', 'Um “U” de lado com um traço.', 'ユニフォーム', 'yunifoomu', 'uniforme']),
      K(['yo', 'ヨ', 'yo', 'Um “E” espelhado.', 'ヨーグルト', 'yooguruto', 'iogurte']),
      K(['ra', 'ラ', 'ra', 'Um tracinho em cima de um gancho.', 'ラジオ', 'rajio', 'rádio']),
      K(['ri', 'リ', 'ri', 'Dois traços, como り.', 'リモコン', 'rimokon', 'controle remoto']),
      K(['ru', 'ル', 'ru', 'Duas pernas, a da direita com um gancho.', 'ルール', 'ruuru', 'regra']),
      K(['re', 'レ', 're', 'Um único traço que dobra para cima.', 'レモン', 'remon', 'limão-siciliano']),
      K(['ro', 'ロ', 'ro', 'Um quadrado fechado.', 'ロボット', 'robotto', 'robô']),
      K(['wa', 'ワ', 'wa', 'Parece um ク mais largo.', 'ワイン', 'wain', 'vinho']),
      K(['n', 'ン', 'n', 'O traço longo sobe de baixo. Não confunda com ソ.', 'パン', 'pan', 'pão'])
    ],
    examples: [
      { jp: 'アニメ', ro: 'anime', pt: 'anime' },
      { jp: 'ラーメン', ro: 'raamen', pt: 'lámen' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual caractere é “n” em katakana?', opts: ['ン', 'ソ', 'ツ'], ans: 0, noRomaji: true, explain: 'ン = n: o traço longo sobe de baixo. ソ = so.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'manga (mangá)', jp: 'マ＿ガ', opts: ['ン', 'ソ', 'ル'], ans: 0, noRomaji: true, explain: 'マンガ = ma + n + ga.' },
      { t: 'error', ctx: 'Quero escrever “remon” (limão):', tokens: ['レ', 'モ', 'ソ'], wrong: 2, noRomaji: true, explain: 'ソ é “so”. O final de レモン é ン (n).' }
    ]
  },
  {
    id: 'c3l4', title: 'Katakana com ゛ e ゜', emblem: 'ガ', kind: 'kana',
    intro: [
      'As mesmas regras do hiragana: dois tracinhos ゛ deixam o som vozeado (カ → ガ, サ → ザ, タ → ダ, ハ → バ) e a bolinha ゜ dá o som de “p” (ハ → パ).',
      'ヂ e ヅ quase não aparecem e ficam de fora dos exercícios.',
      'Esses sons são muito comuns em palavras estrangeiras: ゲーム (jogo), ピザ (pizza), パン (pão).'
    ],
    tip: 'Se você já sabe が ざ だ ば ぱ, aqui só muda o desenho da base.',
    items: [
      K(['ga', 'ガ', 'ga', 'カ + ゛.', 'ガム', 'gamu', 'chiclete']),
      K(['gi', 'ギ', 'gi', 'キ + ゛. Som de “gui”.', 'ギター', 'gitaa', 'violão, guitarra']),
      K(['gu', 'グ', 'gu', 'ク + ゛.', 'グループ', 'guruupu', 'grupo']),
      K(['ge', 'ゲ', 'ge', 'ケ + ゛. Som de “guê”.', 'ゲーム', 'geemu', 'jogo']),
      K(['go', 'ゴ', 'go', 'コ + ゛.', 'ゴール', 'gooru', 'gol; meta']),
      K(['za', 'ザ', 'za', 'サ + ゛.', 'ピザ', 'piza', 'pizza']),
      K(['ji', 'ジ', 'ji', 'シ + ゛. Som de “dji”.', 'ジュース', 'juusu', 'suco']),
      K(['zu', 'ズ', 'zu', 'ス + ゛.', 'チーズ', 'chiizu', 'queijo']),
      K(['ze', 'ゼ', 'ze', 'セ + ゛.', 'ゼロ', 'zero', 'zero']),
      K(['zo', 'ゾ', 'zo', 'ソ + ゛.', 'ゾンビ', 'zonbi', 'zumbi']),
      K(['da', 'ダ', 'da', 'タ + ゛.', 'ダンス', 'dansu', 'dança']),
      K(['de', 'デ', 'de', 'テ + ゛. “dê” seco.', 'デザート', 'dezaato', 'sobremesa']),
      K(['do', 'ド', 'do', 'ト + ゛.', 'ドア', 'doa', 'porta']),
      K(['ba', 'バ', 'ba', 'ハ + ゛.', 'バス', 'basu', 'ônibus']),
      K(['bi', 'ビ', 'bi', 'ヒ + ゛.', 'ビデオ', 'bideo', 'vídeo']),
      K(['bu', 'ブ', 'bu', 'フ + ゛.', 'ブラジル', 'burajiru', 'Brasil']),
      K(['be', 'ベ', 'be', 'ヘ + ゛.', 'ベッド', 'beddo', 'cama']),
      K(['bo', 'ボ', 'bo', 'ホ + ゛.', 'ボール', 'booru', 'bola']),
      K(['pa', 'パ', 'pa', 'ハ + ゜.', 'パーティー', 'paatii', 'festa']),
      K(['pi', 'ピ', 'pi', 'ヒ + ゜.', 'ピアノ', 'piano', 'piano']),
      K(['pu', 'プ', 'pu', 'フ + ゜.', 'プール', 'puuru', 'piscina']),
      K(['pe', 'ペ', 'pe', 'ヘ + ゜.', 'ペン', 'pen', 'caneta']),
      K(['po', 'ポ', 'po', 'ホ + ゜.', 'ポテト', 'poteto', 'batata frita'])
    ],
    examples: [
      { jp: 'ブラジル', ro: 'burajiru', pt: 'Brasil' },
      { jp: 'ゲーム', ro: 'geemu', pt: 'jogo, videogame' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete a palavra', pt: 'basu (ônibus)', jp: '＿ス', opts: ['バ', 'パ', 'ハ'], ans: 0, noRomaji: true, explain: 'バス: ハ + ゛ = バ (ba).' },
      { t: 'situation', prompt: 'Qual caractere tem o som “pi”?', opts: ['ピ', 'ビ', 'ヒ'], ans: 0, noRomaji: true, explain: 'A bolinha ゜ dá o “p”: ピ.' },
      { t: 'error', ctx: 'Quero escrever “pen” (caneta):', tokens: ['ベ', 'ン'], wrong: 0, noRomaji: true, explain: 'ベ é “be”. Caneta é ペン, com a bolinha.' }
    ]
  },
  {
    id: 'c3l5', title: 'Palavras estrangeiras', emblem: 'ー', kind: 'kanaword',
    intro: [
      'Palavras vindas de outras línguas são adaptadas ao som japonês: toda consoante ganha uma vogal (exceto o “n”). “Hotel” vira ホテル (hoteru).',
      'O traço ー alonga a vogal anterior: コーヒー (koohii, café). O ッ pequeno faz a pausa: チケット (chiketto). ャ ュ ョ pequenos formam combinações: ジュース (juusu).',
      'Ouça bem: muitas palavras ficam diferentes do original. Escutar e reconhecer essas palavras ajuda muito a entender conversas e animes.'
    ],
    tip: 'Tente adivinhar a palavra original falando em voz alta, devagar: “pa-so-kon”… personal computer!',
    items: [
      { k: 'koohii', jp: 'コーヒー', ro: 'koohii', pt: 'café', note: 'Do holandês “koffie”. Dois sons longos com ー.' },
      { k: 'terebi', jp: 'テレビ', ro: 'terebi', pt: 'televisão', note: 'Abreviação de “television”.' },
      { k: 'sumaho', jp: 'スマホ', ro: 'sumaho', pt: 'celular, smartphone', note: 'Abreviação de スマートフォン (smartphone).' },
      { k: 'pasokon', jp: 'パソコン', ro: 'pasokon', pt: 'computador', note: 'Abreviação de “personal computer”.' },
      { k: 'chiketto', jp: 'チケット', ro: 'chiketto', pt: 'ingresso, bilhete', note: 'Do inglês “ticket”. O ッ faz a pausa: chi-ket-to.' },
      { k: 'resutoran', jp: 'レストラン', ro: 'resutoran', pt: 'restaurante', note: 'Repare como o “s” e o “t” ganham vogais: re-su-to-ran.' },
      { k: 'konbini', jp: 'コンビニ', ro: 'konbini', pt: 'loja de conveniência', note: 'Abreviação de コンビニエンスストア. Lojas 24 horas, parte do dia a dia no Japão.' },
      { k: 'arubaito', jp: 'アルバイト', ro: 'arubaito', pt: 'trabalho de meio período, bico', note: 'Vem do alemão “Arbeit” (trabalho). Na fala: バイト (baito).' },
      { k: 'depaato', jp: 'デパート', ro: 'depaato', pt: 'loja de departamentos', note: 'Do inglês “department store”.' },
      { k: 'eakon', jp: 'エアコン', ro: 'eakon', pt: 'ar-condicionado', note: 'Abreviação de “air conditioner”.' }
    ],
    examples: [
      { jp: 'コンビニで コーヒーを かいます。', ro: 'konbini de koohii o kaimasu.', pt: 'Compro café na loja de conveniência.' },
      { jp: 'バイト、がんばって！', ro: 'baito, ganbatte!', pt: 'Bom trabalho no seu bico! (força!)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'O que significa パソコン?', opts: ['computador', 'passaporte', 'pastel'], ans: 0, explain: 'パソコン vem de “personal computer”.' },
      { t: 'error', ctx: 'Quero escrever “koohii” (café):', tokens: ['コ', 'ー', 'ヒ', 'イ'], wrong: 3, noRomaji: true, explain: 'O som longo em katakana usa o traço ー: コーヒー.' },
      { t: 'fill', prompt: 'Complete com a pausa', pt: 'chiketto (ingresso)', jp: 'チケ＿ト', opts: ['ッ', 'ツ', 'ー'], ans: 0, noRomaji: true, explain: 'O ッ pequeno faz a pausa: チケット.' }
    ]
  });

  /* ---------------- KANJI (c7) ---------------- */
  const c7 = cat('c7');
  c7.desc = 'Os primeiros kanji: números, dias da semana, tempo, pessoas, natureza e ações. Significado, leituras e palavras reais.';
  c7.requires = 'c3';
  c7.soon = [];
  /* kanji: [chave, kanji/palavra, leitura em kana, romaji, outra leitura, significado, nota, exemplo jp, ex. romaji, ex. pt] */
  const J = a => ({ k: a[0], jp: a[1], say: a[2], ro: a[3], alt: a[4] || undefined, pt: a[5], note: a[6], ex: a[7] ? { jp: a[7], ro: a[8], pt: a[9] } : undefined });
  c7.lessons.push(
  {
    id: 'c7l1', title: 'Kanji dos números', emblem: '一', kind: 'kanaword',
    intro: [
      'Kanji são caracteres de origem chinesa. Cada um tem um significado e pode ter mais de uma leitura: a leitura japonesa (kun) e a leitura de origem chinesa (on).',
      'Os números são os kanji mais fáceis para começar: você já sabe falar todos eles. Aqui você aprende a reconhecê-los escritos.',
      'Nesta lição a pergunta é “como se lê?”, sem romaji. Tente ler sozinho!'
    ],
    tip: '一, 二 e 三 são literalmente um, dois e três traços.',
    items: [
      J(['ichi', '一', 'いち', 'ichi', 'hito(tsu): ひとつ, um objeto', '1 (um)', 'Um traço só.', '一つ', 'hitotsu', 'um (objeto)']),
      J(['ni', '二', 'に', 'ni', 'futa(tsu): ふたつ', '2 (dois)', 'Dois traços.', '二つ', 'futatsu', 'dois (objetos)']),
      J(['san', '三', 'さん', 'san', 'mit(tsu): みっつ', '3 (três)', 'Três traços.', '三人', 'sannin', 'três pessoas']),
      J(['yon', '四', 'よん', 'yon', 'shi', '4 (quatro)', 'Uma janela com cortinas.', '四月', 'shigatsu', 'abril (aqui se lê “shi”)']),
      J(['go', '五', 'ご', 'go', 'itsu(tsu): いつつ', '5 (cinco)', '', '五分', 'gofun', 'cinco minutos']),
      J(['roku', '六', 'ろく', 'roku', 'mut(tsu): むっつ', '6 (seis)', 'Parece uma pessoa de chapéu.', '六時', 'rokuji', 'seis horas']),
      J(['nana', '七', 'なな', 'nana', 'shichi', '7 (sete)', 'Parece um 7 de cabeça para baixo.', '七時', 'shichiji', 'sete horas (aqui se lê “shichi”)']),
      J(['hachi', '八', 'はち', 'hachi', 'yat(tsu): やっつ', '8 (oito)', 'Dois traços que se abrem.', '八月', 'hachigatsu', 'agosto']),
      J(['kyuu', '九', 'きゅう', 'kyuu', 'ku', '9 (nove)', '', '九時', 'kuji', 'nove horas (aqui se lê “ku”)']),
      J(['juu', '十', 'じゅう', 'juu', 'too: とお, dez objetos', '10 (dez)', 'Uma cruz.', '十月', 'juugatsu', 'outubro'])
    ],
    examples: [
      { jp: '三十五', ro: 'sanjuugo', pt: '35: 3 × 10 + 5, igual ao que você aprendeu nos números!' },
      { jp: '一月', ro: 'ichigatsu', pt: 'janeiro (“mês um”)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual kanji é o número 8?', opts: ['八|hachi', '六|roku', '人|hito'], ans: 0, explain: '八 = 8. Cuidado: 人 (pessoa) parece, mas é outro kanji.' },
      { t: 'fill', prompt: 'Complete: 23 em kanji', pt: '23', jp: '二＿三', opts: ['十', '一', '千'], ans: 0, noRomaji: true, explain: '23 = 二 (2) × 十 (10) + 三 (3): 二十三.' },
      { t: 'error', ctx: 'Escrevendo 40:', tokens: ['四|yon', '七|nana'], wrong: 1, explain: '40 = 四十. O segundo kanji deveria ser 十 (dez), não 七 (sete).' }
    ]
  },
  {
    id: 'c7l2', title: 'Kanji dos dias da semana', emblem: '曜', kind: 'kanaword',
    intro: [
      'Os dias da semana em japonês usam os elementos da natureza: sol, lua, fogo, água, madeira, metal e terra.',
      'Cada dia é “kanji + 曜日 (youbi)”. Por exemplo, 月 (lua) + 曜日 = 月曜日, segunda-feira.',
      'Você vê esses kanji em calendários, horários e placas de lojas, quase sempre abreviados: (月) (火) (水)…'
    ],
    tip: 'Ordem da semana japonesa, começando no domingo: 日 月 火 水 木 金 土.',
    items: [
      J(['nichi', '日', 'ひ', 'hi', 'nichi (em 日曜日, nichiyoubi)', 'sol; dia', 'Um sol dentro de um quadro. Também lido “ka” nas datas e “bi” em 曜日.', '日曜日', 'nichiyoubi', 'domingo']),
      J(['getsu', '月', 'つき', 'tsuki', 'getsu (em 月曜日), gatsu (nos meses)', 'lua; mês', 'Também usado nos meses: 一月 (janeiro).', '月曜日', 'getsuyoubi', 'segunda-feira']),
      J(['ka', '火', 'ひ', 'hi', 'ka (em 火曜日, kayoubi)', 'fogo', 'Parece uma fogueira com faíscas.', '火曜日', 'kayoubi', 'terça-feira']),
      J(['sui', '水', 'みず', 'mizu', 'sui (em 水曜日, suiyoubi)', 'água', 'Parece um rio com respingos.', '水曜日', 'suiyoubi', 'quarta-feira']),
      J(['moku', '木', 'き', 'ki', 'moku (em 木曜日, mokuyoubi)', 'árvore, madeira', 'Uma árvore com galhos e raízes.', '木曜日', 'mokuyoubi', 'quinta-feira']),
      J(['kin', '金', 'かね', 'kane', 'kin (em 金曜日, kin\'youbi)', 'dinheiro; ouro, metal', 'Na fala, dinheiro é お金 (okane).', '金曜日', 'kin\'youbi', 'sexta-feira']),
      J(['do', '土', 'つち', 'tsuchi', 'do (em 土曜日, doyoubi)', 'terra, solo', 'Um broto saindo da terra.', '土曜日', 'doyoubi', 'sábado']),
      J(['you', '曜', 'よう', 'you', '', 'dia da semana (só aparece em 曜日)', 'Kanji complexo: basta reconhecê-lo dentro de 曜日.', '何曜日？', 'nan\'youbi?', 'Que dia da semana?']),
      J(['shuu', '週', 'しゅう', 'shuu', '', 'semana', 'Aparece em 今週 (esta semana), 来週 (semana que vem) e 先週 (semana passada).', '来週', 'raishuu', 'semana que vem'])
    ],
    examples: [
      { jp: '月・水・金', ro: 'getsu, sui, kin', pt: 'segunda, quarta e sexta (abreviado, como num horário)' },
      { jp: '土日', ro: 'donichi', pt: 'sábado e domingo, o fim de semana' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete: sexta-feira', pt: 'kin\'youbi (sexta-feira)', jp: '＿曜日', opts: ['金', '木', '土'], ans: 0, noRomaji: true, explain: 'Sexta-feira = 金曜日 (dia do metal/ouro).' },
      { t: 'situation', prompt: 'Num horário de loja está escrito “(日) 休み”. Em que dia a loja fecha?', opts: ['Domingo', 'Segunda-feira', 'Sábado'], ans: 0, explain: '日 = 日曜日, domingo. 休み (yasumi) = folga, fechado.' },
      { t: 'error', ctx: 'Quarta-feira:', tokens: ['火|ka', '曜|you', '日|bi'], wrong: 0, explain: '火 é terça-feira (fogo). Quarta-feira é 水曜日 (água).' }
    ]
  },
  {
    id: 'c7l3', title: 'Kanji de tempo e dinheiro', emblem: '円', kind: 'kanaword',
    intro: [
      'Estes kanji aparecem o tempo todo em relógios, preços e calendários.',
      '百 (cem), 千 (mil) e 万 (dez mil) são a base dos preços. Atenção: os japoneses contam em blocos de 10.000 (万). 30.000 ienes = 三万円.',
      '時 marca as horas e 分 os minutos: 三時十分 = três e dez.'
    ],
    tip: 'Em preços, 円 (en) é o iene. Você vai ver 円 em todo cardápio e etiqueta!',
    items: [
      J(['hyaku', '百', 'ひゃく', 'hyaku', '', '100 (cem)', 'Um 一 em cima de um 白 (branco).', '三百円', 'sanbyakuen', '300 ienes (aqui vira “byaku”)']),
      J(['sen', '千', 'せん', 'sen', '', '1.000 (mil)', 'Parece o 十 com um chapéu inclinado.', '千円', 'sen\'en', 'mil ienes']),
      J(['man', '万', 'まん', 'man', '', '10.000 (dez mil)', 'O japonês agrupa números de quatro em quatro casas: 1万 = 10.000.', '一万円', 'ichiman\'en', '10.000 ienes']),
      J(['en', '円', 'えん', 'en', '', 'iene; círculo', 'A moeda japonesa.', '百円', 'hyakuen', '100 ienes']),
      J(['ji', '時', 'じ', 'ji', 'toki: とき, momento, quando', 'hora (no relógio)', '時 tem o sol (日) do lado esquerdo.', '何時？', 'nanji?', 'Que horas são?']),
      J(['fun', '分', 'ふん', 'fun', 'bun; wa(karu): 分かる, entender', 'minuto; dividir', 'Também aparece em 分かる (entender): você já ouviu 分かった!', '十分', 'juppun', 'dez minutos']),
      J(['han', '半', 'はん', 'han', '', 'metade, meia', '三時半 = três e meia.', '三時半', 'sanjihan', 'três e meia']),
      J(['nen', '年', 'ねん', 'nen', 'toshi: とし, ano, idade', 'ano', '', '今年', 'kotoshi', 'este ano']),
      J(['ima', '今', 'いま', 'ima', 'kon (em 今週, konshuu); kyou (今日)', 'agora', '今日 (kyou, hoje) é uma leitura especial.', '今日', 'kyou', 'hoje']),
      J(['nani', '何', 'なに', 'nani', 'nan (antes de です, 時 e outros)', 'o quê; quanto', '何時 = nanji, que horas.', '何ですか？', 'nan desu ka?', 'O que é?'])
    ],
    examples: [
      { jp: '千五百円', ro: 'sengohyakuen', pt: '1.500 ienes' },
      { jp: '七時半', ro: 'shichijihan', pt: 'sete e meia' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Uma etiqueta diz 二千円. Quanto custa?', opts: ['2.000 ienes', '200 ienes', '20.000 ienes'], ans: 0, explain: '二 (2) × 千 (1.000) = 2.000 ienes.' },
      { t: 'situation', prompt: 'Como se escreve 10.000 ienes?', opts: ['一万円|ichiman\'en', '十千円', '百百円'], ans: 0, explain: 'Em japonês 10.000 tem kanji próprio: 万. Então é 一万円.' },
      { t: 'fill', prompt: 'Complete: três e meia', pt: 'sanjihan', jp: '三時＿', opts: ['半', '分', '年'], ans: 0, noRomaji: true, explain: '半 (han) = meia: 三時半.' }
    ]
  },
  {
    id: 'c7l4', title: 'Kanji de pessoas e do corpo', emblem: '人', kind: 'kanaword',
    intro: [
      'Muitos kanji básicos começaram como desenhos: 人 é uma pessoa andando, 口 é uma boca aberta, 目 é um olho em pé.',
      'Esses kanji aparecem dentro de outras palavras. 人 em 日本人 (japonês) e ブラジル人 (brasileiro) se lê “jin”.',
      'Repare como a leitura muda dentro de palavras compostas. Não tente decorar todas agora: reconhecer o significado já ajuda muito.'
    ],
    tip: '人 (pessoa) e 入 (entrar) parecem gêmeos. Em 人 o traço da esquerda é o mais longo.',
    items: [
      J(['hito', '人', 'ひと', 'hito', 'jin (nacionalidade), nin (contagem)', 'pessoa', 'Uma pessoa andando.', '日本人', 'nihonjin', 'japonês (pessoa)']),
      J(['otoko', '男', 'おとこ', 'otoko', 'dan', 'homem', 'Campo (田) + força (力): quem trabalhava no campo.', '男の子', 'otoko no ko', 'menino']),
      J(['onna', '女', 'おんな', 'onna', 'jo', 'mulher', '', '女の子', 'onna no ko', 'menina']),
      J(['ko', '子', 'こ', 'ko', 'shi', 'criança, filho', 'Um bebê de braços abertos.', '子ども', 'kodomo', 'criança']),
      J(['kuchi', '口', 'くち', 'kuchi', 'kou; guchi em compostos', 'boca; entrada', 'Também significa abertura: 出口 (deguchi) = saída.', '出口', 'deguchi', 'saída']),
      J(['me', '目', 'め', 'me', 'moku', 'olho', 'Um olho desenhado em pé.', '目が いい', 'me ga ii', 'ter boa visão']),
      J(['mimi', '耳', 'みみ', 'mimi', '', 'orelha, ouvido', 'O kanji do seu treino auditivo!', '耳が いい', 'mimi ga ii', 'ter bom ouvido']),
      J(['te', '手', 'て', 'te', 'shu', 'mão', 'Uma mão com dedos.', '上手', 'jouzu', 'habilidoso, bom em algo']),
      J(['ashi', '足', 'あし', 'ashi', 'soku', 'pé, perna', '', '足が いたい', 'ashi ga itai', 'meu pé dói']),
      J(['na', '名', 'な', 'na', 'mei', 'nome; famoso', 'Você viu em 君の名は。 e 名探偵コナン.', '名前', 'namae', 'nome'])
    ],
    examples: [
      { jp: '日本語が 上手ですね。', ro: 'nihongo ga jouzu desu ne.', pt: 'Seu japonês é muito bom, hein. (elogio comum)' },
      { jp: '入口と 出口', ro: 'iriguchi to deguchi', pt: 'entrada e saída (placas)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você procura a saída de uma estação. Qual placa segue?', opts: ['出口|deguchi', '入口|iriguchi', '人口|jinkou'], ans: 0, explain: '出口 = saída. 入口 = entrada. 人口 = população.' },
      { t: 'situation', prompt: 'Qual kanji significa “orelha”?', opts: ['耳|mimi', '目|me', '口|kuchi'], ans: 0, explain: '耳 = orelha. 目 = olho. 口 = boca.' },
      { t: 'fill', prompt: 'Complete: menina', pt: 'onna no ko', jp: '＿の子', opts: ['女', '男', '人'], ans: 0, noRomaji: true, explain: '女の子 = menina; 男の子 = menino.' }
    ]
  },
  {
    id: 'c7l5', title: 'Kanji da natureza e da escola', emblem: '山', kind: 'kanaword',
    intro: [
      'Mais kanji que nasceram de desenhos: 山 parece uma montanha, 川 parece um rio correndo, 雨 tem gotas caindo de uma nuvem.',
      'Dois kanji desta lição formam uma palavra que você já conhece: 学 + 校 = 学校 (gakkou, escola).',
      'E 先 + 生 = 先生 (sensei, professor): literalmente “quem nasceu antes”.'
    ],
    tip: '富士山 (Fujisan): aqui 山 é lido “san”. Não é o “-san” de tratamento!',
    items: [
      J(['yama', '山', 'やま', 'yama', 'san (em 富士山)', 'montanha', 'Três picos.', '富士山', 'fujisan', 'Monte Fuji']),
      J(['kawa', '川', 'かわ', 'kawa', 'gawa em compostos', 'rio', 'Água correndo.', '川で あそぶ', 'kawa de asobu', 'brincar no rio']),
      J(['ta', '田', 'た', 'ta', 'da; den', 'arrozal, campo de arroz', 'Um campo dividido. Comum em sobrenomes: 田中 (Tanaka).', '田中さん', 'Tanaka-san', 'Sr(a). Tanaka']),
      J(['ten', '天', 'てん', 'ten', '', 'céu; paraíso', 'Aparece em 天気 (tempo, clima).', '天気', 'tenki', 'tempo (clima)']),
      J(['ki', '気', 'き', 'ki', '', 'espírito, energia, ânimo', 'Está em 元気 (genki), 天気 (tenki) e 気をつけて (ki o tsukete).', '元気', 'genki', 'disposição, saúde']),
      J(['ame', '雨', 'あめ', 'ame', 'u', 'chuva', 'Gotas caindo dentro de uma nuvem.', '雨の日', 'ame no hi', 'dia de chuva']),
      J(['hana', '花', 'はな', 'hana', 'ka (em 花瓶, kabin: vaso); bana em compostos (生け花, ikebana)', 'flor', '', '花見', 'hanami', 'contemplar as cerejeiras']),
      J(['gaku', '学', 'がく', 'gaku', 'mana(bu): まなぶ, aprender', 'estudo, aprender', 'Está em 学生 (gakusei) e 学校 (gakkou).', '大学', 'daigaku', 'universidade']),
      J(['kou', '校', 'こう', 'kou', '', 'escola', 'Quase sempre em palavras como 学校 e 高校.', '学校', 'gakkou', 'escola']),
      J(['sei', '生', 'せい', 'sei', 'i(kiru): いきる, viver; u(mareru), nascer', 'vida, nascer', 'Tem muitas leituras. Comece por 先生 e 学生.', '先生', 'sensei', 'professor(a)'])
    ],
    examples: [
      { jp: '今日は 雨です。', ro: 'kyou wa ame desu.', pt: 'Hoje está chovendo.' },
      { jp: '高校生', ro: 'koukousei', pt: 'aluno do ensino médio (muito comum em animes)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual kanji significa “chuva”?', opts: ['雨|ame', '天|ten', '山|yama'], ans: 0, explain: '雨 = chuva: gotas dentro de uma nuvem.' },
      { t: 'fill', prompt: 'Complete: escola', pt: 'gakkou', jp: '学＿', opts: ['校', '生', '気'], ans: 0, noRomaji: true, explain: '学校 = gakkou, escola.' },
      { t: 'situation', prompt: 'O que significa 先生?', opts: ['professor(a)', 'aluno', 'escola'], ans: 0, explain: '先生 = sensei, professor(a). Aluno é 学生 (gakusei).' }
    ]
  },
  {
    id: 'c7l6', title: 'Kanji de ações e qualidades', emblem: '行', kind: 'kanaword',
    intro: [
      'Verbos e adjetivos usam kanji para a raiz e hiragana para a terminação, que muda. Em 食べる (taberu), 食 é “comer” e べる é a terminação.',
      'Esse hiragana depois do kanji se chama okurigana. Ele ajuda a ler: 行く (iku), 行きます (ikimasu), 行った (itta).',
      'Os kanji desta lição aparecem em praticamente toda frase do dia a dia.'
    ],
    tip: '大 (grande) é uma pessoa de braços abertos: “deste tamanho!”',
    items: [
      J(['iku', '行く', 'いく', 'iku', 'kou (em 旅行, ryokou: viagem)', 'ir', '', '学校に 行く', 'gakkou ni iku', 'ir à escola']),
      J(['kuru', '来る', 'くる', 'kuru', 'rai (em 来週, raishuu)', 'vir', 'Irregular: 来ます (kimasu), 来て (kite).', '友だちが 来る', 'tomodachi ga kuru', 'um amigo vem']),
      J(['miru', '見る', 'みる', 'miru', 'ken', 'ver, assistir', 'Um olho (目) sobre pernas.', 'アニメを 見る', 'anime o miru', 'assistir anime']),
      J(['taberu', '食べる', 'たべる', 'taberu', 'shoku (em 食事, shokuji: refeição)', 'comer', '', 'パンを 食べる', 'pan o taberu', 'comer pão']),
      J(['nomu', '飲む', 'のむ', 'nomu', 'in (em 飲み物, nomimono: bebida)', 'beber', 'Tem 食 (comer) do lado esquerdo.', '水を 飲む', 'mizu o nomu', 'beber água']),
      J(['iu', '言う', 'いう', 'iu', 'gen', 'dizer', 'Pronuncia-se “yuu”.', 'もう一度 言って', 'mou ichido itte', 'diga de novo']),
      J(['ookii', '大きい', 'おおきい', 'ookii', 'dai (em 大好き, daisuki)', 'grande', '', '大きい 犬', 'ookii inu', 'cachorro grande']),
      J(['chiisai', '小さい', 'ちいさい', 'chiisai', 'shou (em 小学校, shougakkou)', 'pequeno', '', '小さい ねこ', 'chiisai neko', 'gato pequeno']),
      J(['ue', '上', 'うえ', 'ue', 'jou (em 上手, jouzu)', 'em cima, acima', '', 'つくえの 上', 'tsukue no ue', 'em cima da mesa']),
      J(['shita', '下', 'した', 'shita', 'ka; heta (下手, ruim em algo)', 'embaixo, abaixo', '', 'いすの 下', 'isu no shita', 'embaixo da cadeira'])
    ],
    examples: [
      { jp: 'すしが 食べたい！', ro: 'sushi ga tabetai!', pt: 'Quero comer sushi!' },
      { jp: '上手 と 下手', ro: 'jouzu to heta', pt: 'bom em algo e ruim em algo' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Qual verbo significa “beber”?', opts: ['飲む|nomu', '食べる|taberu', '見る|miru'], ans: 0, explain: '飲む = beber; 食べる = comer; 見る = ver.' },
      { t: 'fill', prompt: 'Complete: assistir anime', pt: 'anime o miru', jp: 'アニメを ＿る', opts: ['見', '言', '来'], ans: 0, noRomaji: true, explain: '見る (miru) = ver, assistir.' },
      { t: 'situation', prompt: 'O oposto de 大きい é…', opts: ['小さい|chiisai', '上|ue', '下|shita'], ans: 0, explain: '大きい (grande) × 小さい (pequeno).' }
    ]
  });
})();
