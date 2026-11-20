/* ==========================================================
   CONTEÚDO DIDÁTICO — Nihongo Quest v1.0
   Para adicionar lições: inclua um objeto em CATS[x].lessons.
   Formato "japonês|romaji" é usado em opções e peças.
   kind: number | vocab | kana | kanaword | grammar
   ========================================================== */
const CATS = [
{
  id: 'c1', num: 1, emblem: '歩', title: 'Primeiros Passos', jp: 'はじめの いっぽ',
  desc: 'Números, cumprimentos, primeiras expressões e o começo do hiragana.',
  requires: null,
  lessons: [
  {
    id: 'c1l1', title: 'Números de 1 a 10', emblem: '一', kind: 'number',
    intro: [
      'Os números são uma ótima porta de entrada: você vai usá-los para idade, preços, horas e telefones.',
      'De 1 a 10 existem palavras próprias. Guarde bem estas dez, porque todos os números até 100 são montados com elas.',
      'Alguns números têm duas leituras (4, 7 e 9). Mostramos as duas, mas a primeira é a mais usada no dia a dia.',
      'No romaji (o japonês escrito com nosso alfabeto), vogais repetidas como “uu” indicam um som mais longo.'
    ],
    tip: 'O “r” japonês é um toque leve da língua, como o “r” de “caro”. Nunca é o “r” forte de “rato”.',
    items: [
      { k: '1', val: 1, jp: 'いち', ro: 'ichi', pt: '1 (um)', kanji: '一', note: 'Pronuncie “i-tchi”. O “chi” soa como o “tchi” de “tchau”.' },
      { k: '2', val: 2, jp: 'に', ro: 'ni', pt: '2 (dois)', kanji: '二', note: 'Curtinho, como o “ni” de “ninho”.' },
      { k: '3', val: 3, jp: 'さん', ro: 'san', pt: '3 (três)', kanji: '三', note: 'Igual ao “-san” de “Tanaka-san”, mas aqui é só o número 3.' },
      { k: '4', val: 4, jp: 'よん', ro: 'yon', alt: 'し (shi)', pt: '4 (quatro)', kanji: '四', note: 'Também se diz し (shi), mas “shi” soa igual à palavra “morte” (死). Por isso よん (yon) é o preferido.' },
      { k: '5', val: 5, jp: 'ご', ro: 'go', pt: '5 (cinco)', kanji: '五', note: '“Gô”, com o “o” fechado como em “ovo”.' },
      { k: '6', val: 6, jp: 'ろく', ro: 'roku', pt: '6 (seis)', kanji: '六', note: 'Com o “r” suave, soa quase como “lôku”.' },
      { k: '7', val: 7, jp: 'なな', ro: 'nana', alt: 'しち (shichi)', pt: '7 (sete)', kanji: '七', note: 'しち (shichi) também existe, mas なな (nana) evita confusão com いち (ichi).' },
      { k: '8', val: 8, jp: 'はち', ro: 'hachi', pt: '8 (oito)', kanji: '八', note: 'O “h” é um sopro leve de ar, como numa risada: “ha-ha”. Diga “ha-tchi”.' },
      { k: '9', val: 9, jp: 'きゅう', ro: 'kyuu', alt: 'く (ku)', pt: '9 (nove)', kanji: '九', note: 'O “uu” indica som alongado: “kyuuu”. く (ku) lembra a palavra “sofrimento” (苦), por isso きゅう é mais comum.' },
      { k: '10', val: 10, jp: 'じゅう', ro: 'juu', pt: '10 (dez)', kanji: '十', note: 'O “j” soa como o “dj” de “adjetivo”, com o “u” alongado: “djuu”.' }
    ],
    examples: [
      { jp: 'いち、に、さん！', ro: 'ichi, ni, san!', pt: 'Um, dois, três! (para contar ou começar algo)' },
      { jp: 'ご、ろく、なな、はち', ro: 'go, roku, nana, hachi', pt: 'Cinco, seis, sete, oito.' },
      { jp: 'じゅう', ro: 'juu', pt: 'Dez. Guarde esta palavra: ela é a chave dos números até 99.' }
    ],
    exercises: [
      { t: 'error', ctx: 'Contando de 1 a 3:', tokens: ['いち|ichi', 'に|ni', 'ご|go'], wrong: 2, explain: '3 é さん (san). ご (go) é o número 5.' },
      { t: 'order', prompt: 'Coloque em ordem crescente', pt: '1, 2, 3, 4', tiles: ['いち|ichi', 'に|ni', 'さん|san', 'よん|yon'], extra: ['ろく|roku'], explain: 'いち (1), に (2), さん (3), よん (4).' },
      { t: 'situation', prompt: 'Qual destes números é o mais usado para dizer 4?', opts: ['よん|yon', 'し|shi', 'ご|go'], ans: 0, explain: 'し (shi) também significa 4, mas soa como “morte”. No dia a dia prefere-se よん (yon).' }
    ]
  },
  {
    id: 'c1l2', title: 'Números de 11 a 100', emblem: '百', kind: 'number', dyn: true,
    intro: [
      'Agora vem a parte divertida: em japonês, os números de 11 a 99 são montados como peças de encaixe.',
      'Regra 1 — de 11 a 19: じゅう (10) + o número. 11 = じゅういち (juu + ichi = 10 + 1).',
      'Regra 2 — dezenas: número × じゅう. 20 = にじゅう (ni + juu = 2 × 10).',
      'Regra 3 — junte tudo: 35 = さんじゅうご (san + juu + go = 3 × 10 + 5).',
      'E o 100 tem palavra própria: ひゃく (hyaku).'
    ],
    tip: 'Leia o número em voz alta separando as peças: “san-juu-go”. Depois junte tudo!',
    items: [
      { k: '11', val: 11, jp: 'じゅういち', ro: 'juuichi', pt: '11 (onze)', note: 'じゅう (10) + いち (1).' },
      { k: '12', val: 12, jp: 'じゅうに', ro: 'juuni', pt: '12 (doze)', note: 'じゅう (10) + に (2).' },
      { k: '14', val: 14, jp: 'じゅうよん', ro: 'juuyon', pt: '14 (quatorze)', note: 'じゅう (10) + よん (4). Use よん, não し.' },
      { k: '20', val: 20, jp: 'にじゅう', ro: 'nijuu', pt: '20 (vinte)', note: 'に (2) × じゅう (10). Repare: o número vem ANTES de じゅう.' },
      { k: '30', val: 30, jp: 'さんじゅう', ro: 'sanjuu', pt: '30 (trinta)', note: 'さん (3) × じゅう (10).' },
      { k: '35', val: 35, jp: 'さんじゅうご', ro: 'sanjuugo', pt: '35 (trinta e cinco)', note: 'さん (3) × じゅう (10) + ご (5).' },
      { k: '40', val: 40, jp: 'よんじゅう', ro: 'yonjuu', pt: '40 (quarenta)', note: 'Nas dezenas, o 4 é sempre よん: よんじゅう.' },
      { k: '70', val: 70, jp: 'ななじゅう', ro: 'nanajuu', pt: '70 (setenta)', note: 'Nas dezenas, o 7 é sempre なな: ななじゅう.' },
      { k: '90', val: 90, jp: 'きゅうじゅう', ro: 'kyuujuu', pt: '90 (noventa)', note: 'Nas dezenas, o 9 é sempre きゅう: きゅうじゅう.' },
      { k: '100', val: 100, jp: 'ひゃく', ro: 'hyaku', pt: '100 (cem)', kanji: '百', note: '“Hyaku” tem palavra própria. Não se diz “juujuu”!' }
    ],
    examples: [
      { jp: 'にじゅういち', ro: 'nijuuichi', pt: '21 = 2 × 10 + 1' },
      { jp: 'ろくじゅうはち', ro: 'rokujuuhachi', pt: '68 = 6 × 10 + 8' },
      { jp: 'きゅうじゅうきゅう', ro: 'kyuujuukyuu', pt: '99 = 9 × 10 + 9' }
    ],
    exercises: [
      { t: 'error', ctx: 'Escrevendo 35:', tokens: ['さん|san', 'じゅう|juu', 'ろく|roku'], wrong: 2, explain: '35 = 3 × 10 + 5. O final deve ser ご (go, 5), não ろく (roku, 6).' },
      { t: 'order', prompt: 'Monte o número', pt: '47', tiles: ['よん|yon', 'じゅう|juu', 'なな|nana'], extra: ['いち|ichi'], explain: '47 = よん (4) × じゅう (10) + なな (7) = よんじゅうなな.' },
      { t: 'fill', prompt: 'Complete o número', pt: '20 (vinte)', jp: '＿じゅう', opts: ['に|ni', 'じゅう|juu', 'いち|ichi'], ans: 0, explain: '20 = に (2) × じゅう (10) = にじゅう.' }
    ]
  },
  {
    id: 'c1l3', title: 'Cumprimentos básicos', emblem: '礼', kind: 'vocab',
    intro: [
      'Cumprimentar bem é muito importante no Japão. A palavra certa depende da hora do dia e do nível de formalidade.',
      'Formas com ございます (gozaimasu) ou なさい (nasai) são mais educadas. Use-as com professores, desconhecidos e pessoas mais velhas.',
      'Os japoneses costumam acompanhar o cumprimento com uma leve reverência, inclinando o corpo para a frente. Ela se chama おじぎ (ojigi).'
    ],
    tip: 'Na dúvida, escolha a forma mais educada. Ninguém fica chateado por você ser gentil demais!',
    items: [
      { k: 'ohayou', jp: 'おはようございます', ro: 'ohayou gozaimasu', pt: 'Bom dia', note: 'Usado de manhã. Entre amigos, basta おはよう (ohayou).', ex: { jp: 'せんせい、おはようございます！', ro: 'sensei, ohayou gozaimasu!', pt: 'Bom dia, professor(a)!' } },
      { k: 'konnichiwa', jp: 'こんにちは', ro: 'konnichiwa', pt: 'Olá / Boa tarde', note: 'Usado do fim da manhã até o fim da tarde. O último caractere é は (ha), mas aqui se lê “wa”. Você vai entender o motivo na Gramática.', ex: { jp: 'こんにちは、たなかさん。', ro: 'konnichiwa, Tanaka-san.', pt: 'Olá, Sr(a). Tanaka.' } },
      { k: 'konbanwa', jp: 'こんばんは', ro: 'konbanwa', pt: 'Boa noite (ao encontrar)', note: 'Use ao encontrar alguém à noite. Não serve para se despedir nem para ir dormir.', ex: { jp: 'みなさん、こんばんは。', ro: 'minasan, konbanwa.', pt: 'Boa noite, pessoal.' } },
      { k: 'oyasumi', jp: 'おやすみなさい', ro: 'oyasumi nasai', pt: 'Boa noite (ao ir dormir)', note: 'Dito ao ir dormir ou ao se despedir tarde da noite. Entre amigos: おやすみ (oyasumi).', ex: { jp: 'おやすみ！', ro: 'oyasumi!', pt: 'Boa noite! (informal, antes de dormir)' } },
      { k: 'sayounara', jp: 'さようなら', ro: 'sayounara', pt: 'Adeus / Tchau', note: 'Despedida mais definitiva, para quando você não vai ver a pessoa tão cedo. No dia a dia, prefira じゃあね (jaa ne).' },
      { k: 'jaane', jp: 'じゃあね', ro: 'jaa ne', pt: 'Até mais! (informal)', note: 'Despedida informal entre amigos e família. Como “falou!” ou “até mais!”.', ex: { jp: 'じゃあね、また あした！', ro: 'jaa ne, mata ashita!', pt: 'Até mais, até amanhã!' } },
      { k: 'arigatou', jp: 'ありがとうございます', ro: 'arigatou gozaimasu', pt: 'Muito obrigado(a)', note: 'Forma educada. Entre amigos: ありがとう (arigatou).', ex: { jp: 'どうも ありがとうございます。', ro: 'doumo arigatou gozaimasu.', pt: 'Muitíssimo obrigado(a).' } },
      { k: 'sumimasen', jp: 'すみません', ro: 'sumimasen', pt: 'Com licença / Desculpe', note: 'Palavra coringa: serve para pedir licença, chamar um garçom e pedir desculpas leves.', ex: { jp: 'すみません、えきは どこですか。', ro: 'sumimasen, eki wa doko desu ka.', pt: 'Com licença, onde fica a estação?' } },
      { k: 'hajimemashite', jp: 'はじめまして', ro: 'hajimemashite', pt: 'Muito prazer (primeiro encontro)', note: 'Diga apenas na primeira vez que conhece alguém. Ao pé da letra: “é a primeira vez”.' },
      { k: 'yoroshiku', jp: 'よろしくおねがいします', ro: 'yoroshiku onegaishimasu', pt: 'Conto com você / Prazer', note: 'Fecha uma apresentação, como quem diz “conto com sua boa vontade”. Versão informal: よろしく (yoroshiku).' }
    ],
    examples: [
      { jp: 'はじめまして。マリアです。よろしくおねがいします。', ro: 'hajimemashite. Maria desu. yoroshiku onegaishimasu.', pt: 'Muito prazer. Sou a Maria. Conto com você.' },
      { jp: 'おはよう！ … じゃあね！', ro: 'ohayou! … jaa ne!', pt: 'Bom dia! … Até mais! (entre amigos)' }
    ],
    exercises: [
      { t: 'situation', prompt: 'São 20h e você chega à casa de um amigo. O que você diz?', opts: ['こんばんは|konbanwa', 'おやすみなさい|oyasumi nasai', 'おはようございます|ohayou gozaimasu'], ans: 0, explain: 'こんばんは é o cumprimento ao encontrar alguém à noite. おやすみなさい é só para quando alguém vai dormir.' },
      { t: 'situation', prompt: 'Você conhece uma pessoa pela primeira vez. Como começa?', opts: ['はじめまして|hajimemashite', 'じゃあね|jaa ne', 'おやすみなさい|oyasumi nasai'], ans: 0, explain: 'はじめまして (“é a primeira vez”) é usado só no primeiro encontro.' },
      { t: 'order', prompt: 'Monte a apresentação', pt: 'Muito prazer. Conto com você.', tiles: ['はじめまして|hajimemashite', 'よろしく|yoroshiku', 'おねがいします|onegaishimasu'], extra: ['さようなら|sayounara'], explain: 'はじめまして abre a apresentação e よろしくおねがいします fecha.' },
      { t: 'fill', prompt: 'Complete a forma educada', pt: 'Muito obrigado(a).', jp: 'ありがとう＿＿＿', opts: ['ございます|gozaimasu', 'なさい|nasai', 'ください|kudasai'], ans: 0, explain: 'ありがとうございます é a forma educada de agradecer. なさい aparece em おやすみなさい.' }
    ]
  },
  {
    id: 'c1l4', title: 'Primeiras expressões', emblem: '言', kind: 'vocab',
    intro: [
      'Estas expressões salvam qualquer iniciante: responder sim ou não, dizer que entendeu (ou não), pedir para repetir.',
      'Você também vai conhecer expressões culturais que não têm tradução exata, como いただきます, dita antes das refeições.',
      'A terminação ません (masen) aparece muito: ela indica uma negação educada.'
    ],
    tip: 'わかりません e もういちど おねがいします vão te ajudar muito em conversas reais. Não tenha vergonha de usar!',
    items: [
      { k: 'hai', jp: 'はい', ro: 'hai', pt: 'Sim', note: 'Também significa “estou ouvindo” ou “presente!” quando chamam seu nome.', ex: { jp: 'はい、わかりました。', ro: 'hai, wakarimashita.', pt: 'Sim, entendi.' } },
      { k: 'iie', jp: 'いいえ', ro: 'iie', pt: 'Não', note: 'Educado, mas um pouco direto. Os japoneses costumam suavizar recusas.' },
      { k: 'wakarimashita', jp: 'わかりました', ro: 'wakarimashita', pt: 'Entendi / Combinado', note: 'Use quando alguém explica algo ou pede um favor.' },
      { k: 'wakarimasen', jp: 'わかりません', ro: 'wakarimasen', pt: 'Não entendo / Não sei', note: 'Muito útil no começo dos estudos! O final ません (masen) faz a negação educada.', ex: { jp: 'すみません、わかりません。', ro: 'sumimasen, wakarimasen.', pt: 'Desculpe, não entendo.' } },
      { k: 'mouichido', jp: 'もういちど おねがいします', ro: 'mou ichido onegaishimasu', pt: 'Mais uma vez, por favor', note: 'いちど (ichido) = uma vez. おねがいします (onegaishimasu) = por favor, ao pedir algo.' },
      { k: 'itadakimasu', jp: 'いただきます', ro: 'itadakimasu', pt: 'Antes de comer (“vou receber”)', note: 'Não tem tradução exata. É um agradecimento pela comida, dito com as mãos juntas antes da refeição.' },
      { k: 'gochisousama', jp: 'ごちそうさまでした', ro: 'gochisousama deshita', pt: 'Depois de comer (“obrigado pela refeição”)', note: 'Dito ao terminar de comer, para agradecer a quem preparou ou pagou.' },
      { k: 'daijoubu', jp: 'だいじょうぶ', ro: 'daijoubu', pt: 'Tudo bem / Estou bem', note: 'Serve como pergunta (だいじょうぶ？ = Tudo bem?) e como resposta.', ex: { jp: 'だいじょうぶ？ … うん、だいじょうぶ！', ro: 'daijoubu? … un, daijoubu!', pt: 'Tudo bem? … Sim, tudo bem!' } },
      { k: 'ganbatte', jp: 'がんばって', ro: 'ganbatte', pt: 'Força! / Boa sorte!', note: 'Para incentivar alguém. Para si mesmo: がんばります (ganbarimasu) = Vou me esforçar!' },
      { k: 'gomennasai', jp: 'ごめんなさい', ro: 'gomen nasai', pt: 'Desculpe (pedido de desculpas)', note: 'Mais sincero que すみません. Entre amigos: ごめん (gomen).' }
    ],
    examples: [
      { jp: 'いただきます！ … ごちそうさまでした！', ro: 'itadakimasu! … gochisousama deshita!', pt: 'Antes e depois da refeição.' },
      { jp: 'すみません、もういちど おねがいします。', ro: 'sumimasen, mou ichido onegaishimasu.', pt: 'Com licença, mais uma vez, por favor.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você vai começar a comer. O que diz?', opts: ['いただきます|itadakimasu', 'ごちそうさまでした|gochisousama deshita', 'おやすみなさい|oyasumi nasai'], ans: 0, explain: 'いただきます vem ANTES da refeição. ごちそうさまでした vem DEPOIS.' },
      { t: 'situation', prompt: 'O professor falou rápido demais e você não entendeu. O que pede?', opts: ['もういちど おねがいします|mou ichido onegaishimasu', 'いただきます|itadakimasu', 'がんばって|ganbatte'], ans: 0, explain: 'もういちど おねがいします = “mais uma vez, por favor”.' },
      { t: 'situation', prompt: 'Seu amigo vai fazer uma prova importante. O que você diz?', opts: ['がんばって！|ganbatte!', 'ごめんなさい|gomen nasai', 'わかりません|wakarimasen'], ans: 0, explain: 'がんばって incentiva alguém: “Força! Boa sorte!”.' },
      { t: 'fill', prompt: 'Complete o pedido', pt: 'Mais uma vez, por favor.', jp: 'もういちど ＿＿＿', opts: ['おねがいします|onegaishimasu', 'いただきます|itadakimasu', 'ごめんなさい|gomen nasai'], ans: 0, explain: 'おねがいします é o “por favor” usado para pedir algo.' }
    ]
  },
  {
    id: 'c1l5', title: 'Introdução ao hiragana', emblem: 'あ', kind: 'kana',
    intro: [
      'O japonês usa três sistemas de escrita ao mesmo tempo: hiragana (ひらがな), katakana (カタカナ) e kanji (漢字).',
      'O hiragana é a base de tudo. Cada caractere representa uma sílaba, e não uma letra solta. Com 46 caracteres básicos dá para escrever qualquer palavra japonesa.',
      'Vamos começar pelas 5 vogais: あ い う え お. A ordem japonesa é a, i, u, e, o, e os sons são quase iguais aos do português.',
      'Atenção: o “e” é sempre fechado como em “ipê” e o “o” é fechado como em “ovo”. O “u” é curto, com os lábios relaxados.'
    ],
    tip: 'Diga os sons em voz alta enquanto estuda. Ler e falar ao mesmo tempo fixa muito melhor!',
    items: [
      { k: 'a', jp: 'あ', ro: 'a', pt: 'som “a”', note: 'Som de “a” de “casa”. Dica: uma cruz com um grande laço. Imagine alguém dizendo “Aaah!” ao desenhar.', ex: { jp: 'あお', ro: 'ao', pt: 'azul' } },
      { k: 'i', jp: 'い', ro: 'i', pt: 'som “i”', note: 'Som de “i” de “ilha”. Dica: dois tracinhos lado a lado, como duas letras “i” sem pingo.', ex: { jp: 'いえ', ro: 'ie', pt: 'casa' } },
      { k: 'u', jp: 'う', ro: 'u', pt: 'som “u”', note: 'Som de “u” curto. Dica: um tracinho em cima e uma curva, como uma orelha ouvindo o vento: “uuu”.', ex: { jp: 'うえ', ro: 'ue', pt: 'em cima' } },
      { k: 'e', jp: 'え', ro: 'e', pt: 'som “ê”', note: 'Som de “ê” fechado. Dica: parece alguém dançando de chapéu e gritando “Ê!”.', ex: { jp: 'え', ro: 'e', pt: 'desenho, pintura' } },
      { k: 'o', jp: 'お', ro: 'o', pt: 'som “ô”', note: 'Som de “ô” fechado. Dica: parece com あ, mas tem um tracinho extra do lado, como um “ô” de brinco.', ex: { jp: 'あおい', ro: 'aoi', pt: 'azul (adjetivo)' } }
    ],
    examples: [
      { jp: 'あ い う え お', ro: 'a i u e o', pt: 'A ordem das vogais em japonês.' },
      { jp: 'あい', ro: 'ai', pt: 'amor: só duas vogais e já é uma palavra!' }
    ],
    exercises: [
      { t: 'order', prompt: 'Coloque as vogais na ordem japonesa', pt: 'a, i, u, e, o', tiles: ['あ', 'い', 'う', 'え', 'お'], extra: [], noRomaji: true, explain: 'A ordem é あ (a), い (i), う (u), え (e), お (o).' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'ao (azul)', jp: 'あ＿', opts: ['お', 'い', 'う'], ans: 0, noRomaji: true, explain: 'あお = a + o. O segundo caractere é お (o).' },
      { t: 'error', ctx: 'Quero escrever “ue” (em cima):', tokens: ['う', 'お'], wrong: 1, noRomaji: true, explain: '“ue” é うえ. お é “o”; o certo é え (e).' }
    ]
  }
  ],
  soon: []
},
{
  id: 'c2', num: 2, emblem: 'あ', title: 'Hiragana', jp: 'ひらがな',
  desc: 'O alfabeto básico do japonês: sons, leitura e as primeiras palavras.',
  requires: 'c1', examExtra: ['c1l5'],
  lessons: [
  {
    id: 'c2l1', title: 'Palavras com vogais', emblem: 'あい', kind: 'kanaword',
    intro: [
      'Com apenas as 5 vogais você já consegue ler palavras de verdade! Esse é o poder do hiragana: cada caractere é um som, e basta juntar.',
      'Quando a mesma vogal aparece duas vezes, o som fica mais longo. いい (ii) é um “i” esticado: “iii”.',
      'Nesta lição você vai ler, entender e montar palavras. Algumas também têm kanji, que você verá mais adiante.'
    ],
    tip: 'Leia cada caractere separado e depois junte: “a” + “o” = “ao”.',
    items: [
      { k: 'ai', jp: 'あい', ro: 'ai', pt: 'amor', kanji: '愛', note: 'あ (a) + い (i).' },
      { k: 'ie', jp: 'いえ', ro: 'ie', pt: 'casa', kanji: '家', note: 'い (i) + え (e).' },
      { k: 'ue', jp: 'うえ', ro: 'ue', pt: 'em cima', kanji: '上', note: 'う (u) + え (e).' },
      { k: 'ao', jp: 'あお', ro: 'ao', pt: 'azul', kanji: '青', note: 'あ (a) + お (o). Curiosidade: no Japão o sinal verde do semáforo também é chamado de あお!' },
      { k: 'e', jp: 'え', ro: 'e', pt: 'desenho, pintura', kanji: '絵', note: 'Uma palavra de um caractere só!' },
      { k: 'ii', jp: 'いい', ro: 'ii', pt: 'bom', note: 'Dois い = “i” alongado. いいね！(ii ne!) = Que legal!' },
      { k: 'iie', jp: 'いいえ', ro: 'iie', pt: 'não', note: '“i” alongado + え: i-i-e.' },
      { k: 'au', jp: 'あう', ro: 'au', pt: 'encontrar(-se)', kanji: '会う', note: 'あ (a) + う (u). É um verbo: “encontrar alguém”.' }
    ],
    examples: [
      { jp: 'あおい いえ', ro: 'aoi ie', pt: 'casa azul' },
      { jp: 'いいえ、うえ です。', ro: 'iie, ue desu.', pt: 'Não, é em cima.' }
    ],
    exercises: [
      { t: 'order', prompt: 'Monte a palavra', pt: 'ie (casa)', tiles: ['い', 'え'], extra: ['あ', 'う'], noRomaji: true, explain: 'いえ = い (i) + え (e).' },
      { t: 'order', prompt: 'Monte a palavra', pt: 'aoi (azul)', tiles: ['あ', 'お', 'い'], extra: ['え'], noRomaji: true, explain: 'あおい = あ (a) + お (o) + い (i).' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'ue (em cima)', jp: '＿え', opts: ['う', 'い', 'あ'], ans: 0, noRomaji: true, explain: 'うえ começa com う (u).' },
      { t: 'error', ctx: 'Quero escrever “iie” (não):', tokens: ['い', 'い', 'あ'], wrong: 2, noRomaji: true, explain: 'いいえ termina com え (e), não com あ (a).' }
    ]
  }
  ],
  soon: ['Linha K: か き く け こ', 'Linha S: さ し す せ そ', 'Linha T: た ち つ て と', 'Linha N: な に ぬ ね の', 'Linha H: は ひ ふ へ ほ', 'Linha M: ま み む め も', 'Linhas Y, R, W e ん']
},
{
  id: 'c3', num: 3, emblem: 'ア', title: 'Katakana', jp: 'カタカナ',
  desc: 'O alfabeto das palavras estrangeiras, como ブラジル (Brasil).',
  requires: 'c2', lessons: [],
  soon: ['Vogais: ア イ ウ エ オ', 'Os 46 caracteres básicos', 'Pronúncia e reconhecimento', 'Palavras estrangeiras em katakana']
},
{
  id: 'c4', num: 4, emblem: '語', title: 'Vocabulário Essencial', jp: 'たんご',
  desc: 'Palavras do dia a dia: pessoas, comida, lugares e tempo.',
  requires: 'c2', reqNote: 'Liberada ao concluir Hiragana. Katakana chega numa próxima atualização e não bloqueia seu caminho.',
  lessons: [
  {
    id: 'c4l1', title: 'Pessoas', emblem: '人', kind: 'vocab',
    intro: [
      'Vamos aprender a falar de pessoas: você, seus amigos, professores e família.',
      'Em japonês é comum não usar “você”. O mais natural é chamar a pessoa pelo nome + さん (san).',
      'Para dizer a nacionalidade, junte o nome do país + じん (jin), que significa “pessoa de”.'
    ],
    tip: 'Nunca use さん depois do seu próprio nome. Ele é um sinal de respeito para os outros.',
    items: [
      { k: 'watashi', jp: 'わたし', ro: 'watashi', pt: 'eu', kanji: '私', note: 'Serve para homens e mulheres. É a forma neutra e educada.', ex: { jp: 'わたしは マリアです。', ro: 'watashi wa Maria desu.', pt: 'Eu sou a Maria.' } },
      { k: 'anata', jp: 'あなた', ro: 'anata', pt: 'você', note: 'Existe, mas os japoneses preferem chamar a pessoa pelo nome + さん. Usar あなた o tempo todo pode soar distante.' },
      { k: 'tomodachi', jp: 'ともだち', ro: 'tomodachi', pt: 'amigo(a)', kanji: '友達', note: 'Não muda para masculino ou feminino.', ex: { jp: 'ともだちです。', ro: 'tomodachi desu.', pt: 'É meu amigo / minha amiga.' } },
      { k: 'sensei', jp: 'せんせい', ro: 'sensei', pt: 'professor(a)', kanji: '先生', note: 'Também usado para médicos e mestres. Funciona como título: Tanaka-sensei.', ex: { jp: 'たなかせんせい', ro: 'Tanaka-sensei', pt: 'Professor(a) Tanaka' } },
      { k: 'gakusei', jp: 'がくせい', ro: 'gakusei', pt: 'estudante', kanji: '学生', note: 'Para universitários e estudantes em geral.' },
      { k: 'hito', jp: 'ひと', ro: 'hito', pt: 'pessoa', kanji: '人', note: 'Palavra básica para “pessoa”. あのひと (ano hito) = aquela pessoa.' },
      { k: 'kazoku', jp: 'かぞく', ro: 'kazoku', pt: 'família', kanji: '家族', note: 'Repare no kanji 家 (casa), o mesmo de いえ!' },
      { k: 'nihonjin', jp: 'にほんじん', ro: 'nihonjin', pt: 'japonês(a) (pessoa)', kanji: '日本人', note: 'にほん (nihon) = Japão + じん (jin) = pessoa de.', ex: { jp: 'にほん', ro: 'nihon', pt: 'Japão' } },
      { k: 'burajirujin', jp: 'ブラジルじん', ro: 'burajirujin', pt: 'brasileiro(a)', note: 'ブラジル (Brasil) está em katakana, o alfabeto das palavras estrangeiras. + じん = pessoa do Brasil.', ex: { jp: 'ブラジル', ro: 'burajiru', pt: 'Brasil' } }
    ],
    examples: [
      { jp: 'わたしは ブラジルじんです。', ro: 'watashi wa burajirujin desu.', pt: 'Eu sou brasileiro(a). (você vai entender cada parte na Gramática)' },
      { jp: 'たなかせんせい、こんにちは！', ro: 'Tanaka-sensei, konnichiwa!', pt: 'Olá, professor(a) Tanaka!' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Como você chama seu professor, o Sr. Tanaka?', opts: ['たなかせんせい|Tanaka-sensei', 'せんせいたなか|sensei Tanaka', 'たなかがくせい|Tanaka-gakusei'], ans: 0, explain: 'Em japonês o título vem DEPOIS do nome: たなかせんせい.' },
      { t: 'fill', prompt: 'Complete a palavra', pt: 'japonês (pessoa) — にほん = Japão', jp: 'にほん＿＿', opts: ['じん|jin', 'ひと|hito', 'さん|san'], ans: 0, explain: 'País + じん (jin) = pessoa daquele país.' }
    ]
  },
  {
    id: 'c4l2', title: 'Comida e bebida', emblem: '食', kind: 'vocab',
    intro: [
      'Comida é uma das melhores partes da cultura japonesa! Vamos aprender o básico para pedir e comentar.',
      'Várias palavras começam com お (o) ou ご (go), como おちゃ e ごはん. Esse prefixo deixa a palavra mais gentil.',
      'E uma surpresa: uma palavra japonesa veio do português, trazida no século XVI.'
    ],
    tip: 'Quando algo estiver delicioso, diga おいしい！ (oishii). Os japoneses adoram ouvir isso.',
    items: [
      { k: 'mizu', jp: 'みず', ro: 'mizu', pt: 'água', kanji: '水', note: 'Para água fria. Água quente tem outra palavra: おゆ (oyu).', ex: { jp: 'みず、おねがいします。', ro: 'mizu, onegaishimasu.', pt: 'Água, por favor.' } },
      { k: 'ocha', jp: 'おちゃ', ro: 'ocha', pt: 'chá (verde)', kanji: 'お茶', note: 'O お do começo é um prefixo de gentileza.' },
      { k: 'gohan', jp: 'ごはん', ro: 'gohan', pt: 'arroz cozido / refeição', kanji: 'ご飯', note: 'Significa arroz cozido e também “refeição”. あさごはん (asagohan) = café da manhã.' },
      { k: 'pan', jp: 'パン', ro: 'pan', pt: 'pão', note: 'Veio do português “pão”! Por ser estrangeira, é escrita em katakana.' },
      { k: 'sakana', jp: 'さかな', ro: 'sakana', pt: 'peixe', kanji: '魚', note: 'Peixe como animal e como comida.' },
      { k: 'niku', jp: 'にく', ro: 'niku', pt: 'carne', kanji: '肉', note: 'ぎゅうにく (gyuuniku) = carne bovina.' },
      { k: 'tamago', jp: 'たまご', ro: 'tamago', pt: 'ovo', kanji: '卵', note: 'Muito comum no café da manhã japonês.' },
      { k: 'kudamono', jp: 'くだもの', ro: 'kudamono', pt: 'fruta', kanji: '果物', note: 'Palavra geral para frutas.' },
      { k: 'oishii', jp: 'おいしい', ro: 'oishii', pt: 'gostoso, delicioso', note: 'É um adjetivo. Dizer おいしい！ ao provar algo é um ótimo elogio.', ex: { jp: 'この さかな、おいしい！', ro: 'kono sakana, oishii!', pt: 'Este peixe está delicioso!' } }
    ],
    examples: [
      { jp: 'ごはんと さかな', ro: 'gohan to sakana', pt: 'arroz e peixe' },
      { jp: 'おちゃ、おねがいします。', ro: 'ocha, onegaishimasu.', pt: 'Um chá, por favor.' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você provou o lámen e adorou. O que diz?', opts: ['おいしい！|oishii!', 'おやすみ|oyasumi', 'わかりません|wakarimasen'], ans: 0, explain: 'おいしい = gostoso, delicioso.' },
      { t: 'situation', prompt: 'あさごはん (asagohan) significa “café da manhã”. Qual parte quer dizer “refeição”?', opts: ['ごはん|gohan', 'あさ|asa', 'さご|sago'], ans: 0, explain: 'あさ (asa) = manhã e ごはん (gohan) = refeição.' },
      { t: 'situation', prompt: 'Qual destas palavras veio do português?', opts: ['パン|pan', 'みず|mizu', 'にく|niku'], ans: 0, explain: 'パン (pan) vem de “pão”, trazido por portugueses ao Japão no século XVI.' }
    ]
  },
  {
    id: 'c4l3', title: 'Lugares e tempo', emblem: '駅', kind: 'vocab',
    intro: [
      'Saber onde e quando é essencial para combinar qualquer coisa.',
      'Os lugares desta lição aparecem em placas por todo o Japão. As palavras de tempo (hoje, amanhã, ontem, agora) são usadas o tempo todo.',
      'Atenção ao っ pequeno de がっこう: ele indica uma pequena pausa antes do som seguinte, “gak-kou”.'
    ],
    tip: 'Pense numa linha do tempo: きのう (ontem) → きょう (hoje) → あした (amanhã).',
    items: [
      { k: 'gakkou', jp: 'がっこう', ro: 'gakkou', pt: 'escola', kanji: '学校', note: 'O っ pequeno faz uma pausa: “gak-kou”.' },
      { k: 'eki', jp: 'えき', ro: 'eki', pt: 'estação (de trem)', kanji: '駅', note: 'As estações são pontos de encontro muito comuns no Japão.', ex: { jp: 'えきは どこですか。', ro: 'eki wa doko desu ka.', pt: 'Onde fica a estação?' } },
      { k: 'mise', jp: 'みせ', ro: 'mise', pt: 'loja', kanji: '店', note: 'Qualquer loja ou estabelecimento.' },
      { k: 'byouin', jp: 'びょういん', ro: 'byouin', pt: 'hospital', kanji: '病院', note: 'Pronuncie “byoo-in”, com o “o” alongado.' },
      { k: 'kyou', jp: 'きょう', ro: 'kyou', pt: 'hoje', kanji: '今日', note: 'Cuidado: きょう (hoje) é diferente de きゅう (nove). Compare os sons “kyo” e “kyu”.' },
      { k: 'ashita', jp: 'あした', ro: 'ashita', pt: 'amanhã', kanji: '明日', note: 'またあした！(mata ashita!) = Até amanhã!' },
      { k: 'kinou', jp: 'きのう', ro: 'kinou', pt: 'ontem', kanji: '昨日', note: 'Pronuncie “ki-noo”.' },
      { k: 'ima', jp: 'いま', ro: 'ima', pt: 'agora', kanji: '今', note: 'O kanji 今 também aparece em 今日 (hoje).' }
    ],
    examples: [
      { jp: 'きょうは がっこうです。', ro: 'kyou wa gakkou desu.', pt: 'Hoje tem escola.' },
      { jp: 'じゃあね、また あした！', ro: 'jaa ne, mata ashita!', pt: 'Tchau, até amanhã!' }
    ],
    exercises: [
      { t: 'situation', prompt: 'Você quer pegar o trem. Para onde vai?', opts: ['えき|eki', 'みせ|mise', 'がっこう|gakkou'], ans: 0, explain: 'えき = estação de trem.' },
      { t: 'order', prompt: 'Ordene do passado para o futuro', pt: 'ontem → hoje → amanhã', tiles: ['きのう|kinou', 'きょう|kyou', 'あした|ashita'], extra: ['いま|ima'], explain: 'きのう (ontem) → きょう (hoje) → あした (amanhã).' }
    ]
  }
  ],
  soon: ['Verbos', 'Adjetivos', 'Perguntas', 'Expressões cotidianas']
},
{
  id: 'c5', num: 5, emblem: '文', title: 'Gramática', jp: 'ぶんぽう',
  desc: 'Como as frases funcionam: です, partículas e mais.',
  requires: 'c4',
  lessons: [
  {
    id: 'c5l1', title: 'です (desu): ser e estar', emblem: 'です', kind: 'grammar',
    intro: [
      'です (desu) é uma das palavras mais usadas do japonês. Ela deixa a frase educada e funciona como “ser/estar”.',
      'A estrutura mais simples é: [palavra] + です. がくせいです。= Sou estudante.',
      'Em japonês o sujeito pode ficar oculto quando já está claro. Por isso がくせいです pode ser “Sou estudante”, “Ele é estudante” etc.',
      'Pronúncia: o “u” final quase desaparece. Diga “dess”.',
      'Bônus: coloque か (ka) no final e a frase vira pergunta. がくせいですか。= Você é estudante?'
    ],
    tip: 'O verbo vem sempre no FINAL da frase em japonês. です fecha a frase.',
    items: [
      { k: 's1', jp: 'がくせいです。', ro: 'gakusei desu.', pt: 'Sou estudante.', note: 'がくせい (estudante) + です (sou). O “eu” fica subentendido.' },
      { k: 's2', jp: 'せんせいです。', ro: 'sensei desu.', pt: 'É professor(a).', note: 'O mesmo です serve para “sou”, “é”, “somos”...' },
      { k: 's3', jp: 'おいしいです。', ro: 'oishii desu.', pt: 'Está gostoso.', note: 'Com adjetivos, です deixa a frase educada. Entre amigos, basta おいしい！' },
      { k: 's4', jp: 'にほんじんです。', ro: 'nihonjin desu.', pt: 'É japonês(a).', note: 'にほんじん (japonês) + です.' },
      { k: 's5', jp: 'がくせいですか。', ro: 'gakusei desu ka.', pt: 'Você é estudante?', note: 'か (ka) no final transforma a frase em pergunta. Nem precisa de ponto de interrogação.' },
      { k: 's6', jp: 'はい、がくせいです。', ro: 'hai, gakusei desu.', pt: 'Sim, sou estudante.', note: 'Para responder, repita a frase sem か.' }
    ],
    examples: [
      { jp: 'せんせいですか。 … はい、せんせいです。', ro: 'sensei desu ka. … hai, sensei desu.', pt: 'É professor(a)? … Sim, sou professor(a).' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete a pergunta', pt: 'Você é estudante?', jp: 'がくせい＿＿か。', opts: ['です|desu', 'は|wa', 'も|mo'], ans: 0, explain: 'A pergunta é [palavra] + です + か.' },
      { t: 'order', prompt: 'Monte a pergunta', pt: 'É professor(a)?', tiles: ['せんせい|sensei', 'です|desu', 'か|ka'], extra: ['も|mo'], explain: 'せんせい + です + か = せんせいですか。' },
      { t: 'error', ctx: 'Quero AFIRMAR: “Sou estudante.”', tokens: ['がくせい|gakusei', 'です|desu', 'か|ka'], wrong: 2, explain: 'か transforma a frase em pergunta. Para afirmar, termine em です.' },
      { t: 'translate', jp: 'おいしいです。', ro: 'oishii desu.', tiles: ['Está', 'gostoso'], extra: ['Sou', 'estudante'], explain: 'おいしい (gostoso) + です = Está gostoso.' }
    ]
  },
  {
    id: 'c5l2', title: 'A partícula は (wa)', emblem: 'は', kind: 'grammar',
    intro: [
      'A partícula は marca o tópico da frase, ou seja, o assunto do qual você vai falar. É como dizer “Quanto a...”, “Sobre...”.',
      'Muito importante: quando é partícula, は se lê “wa”, e não “ha”. É por isso que こんにちは termina com “wa”!',
      'Estrutura: [A] は [B] です。= A é B. わたしは がくせいです。= Eu sou estudante.',
      'Partículas vêm sempre DEPOIS da palavra que elas marcam.',
      'Palavra nova: これ (kore) = isto (algo perto de você).'
    ],
    tip: 'Pense em は como uma placa: “O assunto é ESTE aqui”. Depois vem o que você diz sobre ele.',
    items: [
      { k: 's1', jp: 'わたしは がくせいです。', ro: 'watashi wa gakusei desu.', pt: 'Eu sou estudante.', note: 'わたし (eu) + は (tópico) + がくせい (estudante) + です.' },
      { k: 's2', jp: 'わたしは ブラジルじんです。', ro: 'watashi wa burajirujin desu.', pt: 'Eu sou brasileiro(a).', note: 'Ótima frase para se apresentar!' },
      { k: 's3', jp: 'たなかさんは せんせいです。', ro: 'Tanaka-san wa sensei desu.', pt: 'O(A) Sr(a). Tanaka é professor(a).', note: 'さん (san) é um sufixo de respeito usado depois do nome de outras pessoas.' },
      { k: 's4', jp: 'これは みずです。', ro: 'kore wa mizu desu.', pt: 'Isto é água.', note: 'これ (isto) + は + みず (água) + です.' },
      { k: 's5', jp: 'ともだちは にほんじんです。', ro: 'tomodachi wa nihonjin desu.', pt: 'Meu amigo é japonês.', note: 'Em japonês, “meu” muitas vezes fica subentendido.' },
      { k: 's6', jp: 'きょうは だいじょうぶです。', ro: 'kyou wa daijoubu desu.', pt: 'Hoje está tudo bem.', note: 'は também pode marcar o tempo como tópico: “Quanto a hoje, está tudo bem”.' }
    ],
    examples: [
      { jp: 'これは おちゃです。', ro: 'kore wa ocha desu.', pt: 'Isto é chá.' },
      { jp: 'こんにちは', ro: 'konnichiwa', pt: 'Lembra? Termina com は lido como “wa”.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete com a partícula', pt: 'Eu sou estudante.', jp: 'わたし＿がくせいです。', opts: ['は|wa', 'も|mo', 'か|ka'], ans: 0, explain: 'は marca o tópico: “Quanto a mim, sou estudante”.' },
      { t: 'order', prompt: 'Monte a frase', pt: 'Eu sou brasileiro(a).', tiles: ['わたし|watashi', 'は|wa', 'ブラジルじん|burajirujin', 'です|desu'], extra: ['も|mo'], explain: 'わたし + は + ブラジルじん + です.' },
      { t: 'translate', jp: 'これは みずです。', ro: 'kore wa mizu desu.', tiles: ['Isto', 'é', 'água'], extra: ['chá', 'também'], explain: 'これ (isto) は みず (água) です (é).' },
      { t: 'error', ctx: 'Quero dizer: “Isto é água.”', tokens: ['これ|kore', 'も|mo', 'みず|mizu', 'です|desu'], wrong: 1, explain: 'も significa “também”. Para “Isto é água”, use は.' },
      { t: 'situation', prompt: 'Como se lê は quando é partícula?', opts: ['wa', 'ha', 'ba'], ans: 0, noRomaji: true, explain: 'Como partícula, は se lê “wa”. Nas palavras comuns continua “ha”, como em はい (hai).' }
    ]
  },
  {
    id: 'c5l3', title: 'A partícula も (mo)', emblem: 'も', kind: 'grammar',
    intro: [
      'A partícula も (mo) significa “também”.',
      'Ela ocupa o lugar de は. Compare: わたしは がくせいです (Eu sou estudante) → わたしも がくせいです (Eu também sou estudante).',
      'Atenção: は e も nunca aparecem juntos. “わたしはも” está errado!',
      'も vem depois da palavra que ela marca: quem “também” é algo é a palavra antes de も.'
    ],
    tip: 'Troque は por も e pronto: você acabou de dizer “também”!',
    items: [
      { k: 's1', jp: 'わたしも がくせいです。', ro: 'watashi mo gakusei desu.', pt: 'Eu também sou estudante.', note: 'わたし + も (também) + がくせい + です.' },
      { k: 's2', jp: 'ともだちも ブラジルじんです。', ro: 'tomodachi mo burajirujin desu.', pt: 'Meu amigo também é brasileiro.', note: 'も fica depois de ともだち: é o amigo que “também” é brasileiro.' },
      { k: 's3', jp: 'これも おいしいです。', ro: 'kore mo oishii desu.', pt: 'Isto também está gostoso.', note: 'これ + も: “isto também”.' },
      { k: 's4', jp: 'たなかさんも せんせいです。', ro: 'Tanaka-san mo sensei desu.', pt: 'O(A) Sr(a). Tanaka também é professor(a).', note: 'Igual à frase com は, só trocando a partícula.' },
      { k: 's5', jp: 'あしたも がっこうです。', ro: 'ashita mo gakkou desu.', pt: 'Amanhã também tem escola.', note: 'Literalmente: “Amanhã também é escola”. Um jeito natural de dizer que haverá aula.' }
    ],
    examples: [
      { jp: 'わたしは ブラジルじんです。ともだちも ブラジルじんです。', ro: 'watashi wa burajirujin desu. tomodachi mo burajirujin desu.', pt: 'Eu sou brasileiro(a). Meu amigo também é brasileiro.' }
    ],
    exercises: [
      { t: 'fill', prompt: 'Complete com a partícula', pt: 'Eu também sou estudante.', jp: 'わたし＿がくせいです。', opts: ['も|mo', 'は|wa', 'です|desu'], ans: 0, explain: 'も = também. Ela substitui は.' },
      { t: 'error', ctx: 'Quero dizer: “Eu também sou estudante.”', tokens: ['わたし|watashi', 'は|wa', 'がくせい|gakusei', 'です|desu'], wrong: 1, explain: 'Para “também”, troque は por も: わたしも がくせいです.' },
      { t: 'error', ctx: 'Quero dizer: “Eu também sou professor(a).”', tokens: ['わたし|watashi', 'はも|wa mo', 'せんせい|sensei', 'です|desu'], wrong: 1, explain: 'は e も nunca se juntam. O certo é わたしも.' },
      { t: 'order', prompt: 'Monte a frase', pt: 'Meu amigo também é estudante.', tiles: ['ともだち|tomodachi', 'も|mo', 'がくせい|gakusei', 'です|desu'], extra: ['は|wa'], explain: 'ともだち + も + がくせい + です.' },
      { t: 'translate', jp: 'これも おいしいです。', ro: 'kore mo oishii desu.', tiles: ['Isto', 'também', 'está', 'gostoso'], extra: ['é', 'água'], explain: 'これ (isto) も (também) おいしい (gostoso) です (está).' }
    ]
  }
  ],
  soon: ['Partícula が (ga)', 'Partícula を (o)', 'Partícula に (ni)', 'Partícula で (de)', 'だよ (da yo)', 'Negação com じゃない (ja nai)', 'ね (ne) e よ (yo)']
},
{
  id: 'c6', num: 6, emblem: '話', title: 'Construção de Frases', jp: 'かいわ',
  desc: 'Apresentações, perguntas, respostas e conversas simples.',
  requires: 'c5', lessons: [],
  soon: ['Apresentações pessoais', 'Frases cotidianas', 'Perguntas e respostas', 'Conversações simples', 'Suas próprias frases']
},
{
  id: 'c7', num: 7, emblem: '字', title: 'Kanji', jp: 'かんじ',
  desc: 'Os ideogramas: significados, leituras e vocabulário.',
  requires: 'c6', lessons: [],
  soon: ['Introdução aos kanji', 'Significados e leituras', 'Reconhecimento', 'Vocabulário com kanji']
}
];

/* ---------- Mascote, missões, conquistas, loja, níveis ---------- */
const MASCOT_NAME = 'Hikari';

const MSG = {
  correct: ['Isso aí! すごい (sugoi = incrível)!', 'Acertou em cheio!', 'Perfeito! Você está pegando o jeito.', 'やった！(yatta = consegui!) Muito bem!', 'Mandou bem! Continue assim.', 'Brilhante! ✦'],
  wrong: ['Quase! Errar faz parte de aprender.', 'Sem problemas, vamos rever isso juntos.', 'Essa era traiçoeira. Leia a explicação!', 'Tudo bem! Vou trazer essa de volta na revisão.'],
  tips: [
    'Estudar 10 minutos por dia vale mais do que 2 horas uma vez por semana.',
    'Fale em voz alta! Sua boca também precisa treinar.',
    'No Caderno você encontra tudo o que já estudou, com exemplos.',
    'A Revisão traz de volta as palavras em que você teve dificuldade.',
    'Se ficar alguns dias sem estudar, tudo bem: seu XP e suas lições continuam aqui.',
    'Os protetores de sequência da Loja guardam sua sequência se você faltar um dia.',
    'Romaji ajuda no começo, mas tente ler o hiragana antes de olhar o romaji.',
    'がんばって！(ganbatte) Significa “força!”. Estou torcendo por você!'
  ]
};

const MISSION_POOL = [
  { id: 'lesson1', txt: 'Seja aprovado em 1 avaliação', ev: 'lesson_pass', goal: 1, coins: 15, xp: 20 },
  { id: 'answer20', txt: 'Responda 20 perguntas', ev: 'answer', goal: 20, coins: 10, xp: 15 },
  { id: 'correct15', txt: 'Acerte 15 respostas', ev: 'correct', goal: 15, coins: 10, xp: 15 },
  { id: 'review1', txt: 'Faça 1 sessão de revisão', ev: 'review_done', goal: 1, coins: 12, xp: 15 },
  { id: 'xp80', txt: 'Ganhe 80 XP', ev: 'xp', goal: 80, coins: 12, xp: 0 },
  { id: 'theory1', txt: 'Estude a teoria de 1 lição', ev: 'theory', goal: 1, coins: 8, xp: 10 },
  { id: 'perfect', txt: 'Tire 100% em uma avaliação', ev: 'perfect', goal: 1, coins: 20, xp: 25 },
  { id: 'listen15', txt: 'Responda 15 perguntas auditivas', ev: 'listen', goal: 15, coins: 10, xp: 15 },
  { id: 'dialog1', txt: 'Conclua 1 diálogo do Laboratório', ev: 'dialog_done', goal: 1, coins: 12, xp: 15 },
  { id: 'case2', txt: 'Desvende 2 casos do Detetive dos Animes', ev: 'case', goal: 2, coins: 10, xp: 10 }
];

const ACHIEVEMENTS = [
  { id: 'first_lesson', icon: '初', name: 'Primeiro passo', desc: 'Seja aprovado na sua primeira lição.', test: s => s.stats.lessonsPassed >= 1 },
  { id: 'lessons5', icon: '五', name: 'Estudante dedicado', desc: 'Seja aprovado em 5 lições diferentes.', test: s => countPassed(s) >= 5 },
  { id: 'lessons_all', icon: '全', name: 'Pioneiro da Academia', desc: 'Conclua todas as lições da versão 1.0.', test: s => V1_LESSON_IDS.every(id => s.lessons[id] && s.lessons[id].passed) },
  { id: 'cat1', icon: '歩', name: 'Ala dos Primeiros Passos', desc: 'Passe na avaliação final de Primeiros Passos.', test: s => !!(s.catExams.c1 && s.catExams.c1.passed) },
  { id: 'perfect', icon: '満', name: 'Nota máxima', desc: 'Tire 100% em uma avaliação.', test: s => s.stats.perfect >= 1 },
  { id: 'streak3', icon: '火', name: 'Chama acesa', desc: 'Estude 3 dias seguidos.', test: s => s.streak.best >= 3 },
  { id: 'streak7', icon: '炎', name: 'Semana de fogo', desc: 'Estude 7 dias seguidos.', test: s => s.streak.best >= 7 },
  { id: 'xp500', icon: '星', name: 'Estrela em ascensão', desc: 'Acumule 500 XP.', test: s => s.xp >= 500 },
  { id: 'correct100', icon: '百', name: 'Cem acertos', desc: 'Acerte 100 respostas no total.', test: s => s.stats.correct >= 100 },
  { id: 'reviewer', icon: '復', name: 'Mestre da revisão', desc: 'Complete 3 sessões de revisão.', test: s => s.stats.reviews >= 3 },
  { id: 'words30', icon: '語', name: 'Colecionador de palavras', desc: 'Tenha 30 itens no Caderno.', test: s => Object.values(s.items).filter(r => r.seen).length >= 30 },
  { id: 'missions5', icon: '任', name: 'Missão cumprida', desc: 'Complete 5 missões diárias.', test: s => s.stats.missionsDone >= 5 },
  { id: 'comeback', icon: '帰', name: 'De volta à jornada', desc: 'Volte a estudar depois de 3 dias ou mais. Sempre é hora de recomeçar!', test: s => !!s.flags.comeback },
  { id: 'style', icon: '飾', name: 'Estilo próprio', desc: 'Compre um acessório para a Hikari.', test: s => s.shop.owned.length >= 1 },
  { id: 'ear50', icon: '耳', name: 'Ouvido atento', desc: 'Acerte 50 exercícios auditivos.', test: s => s.listening.stats.correct >= 50 },
  { id: 'dialog3', icon: '会', name: 'Bom de conversa', desc: 'Conclua 3 diálogos do Laboratório.', test: s => Object.keys(s.listening.dialogs).length >= 3 },
  { id: 'detective10', icon: '探', name: 'Detetive iniciante', desc: 'Desvende 10 casos do Detetive dos Animes.', test: s => Object.keys(s.discoveries).length >= 10 },
  { id: 'detective_all', icon: '偵', name: 'Grande detetive', desc: 'Desvende todos os casos do Detetive dos Animes.', test: s => AUDIO_PACKS.find(p => p.id === 'aud-ani').items.every(it => s.discoveries[it.id]) },
  { id: 'expr10', icon: '声', name: 'Fala de anime', desc: 'Aprenda 10 expressões do cotidiano.', test: s => AUDIO_PACKS.find(p => p.id === 'aud-expr').items.filter(it => s.items[it.id] && s.items[it.id].seen).length >= 10 },
  { id: 'ear_adv', icon: '聴', name: 'Ouvido de mestre', desc: 'Acerte 80% de 20 ou mais perguntas no nível Avançado.', test: s => { const b = s.listening.stats.byLevel.avancado; return b.a >= 20 && b.c / b.a >= .8; } }
];

const SHOP = [
  { id: 'freeze', name: 'Protetor de sequência', desc: 'Guarda sua sequência se você faltar um dia. Máximo de 3.', price: 40, type: 'freeze' },
  { id: 'sakura', name: 'Laço de sakura', desc: 'Um laço com flores de cerejeira.', price: 40, type: 'acc' },
  { id: 'hachimaki', name: 'Faixa hachimaki', desc: 'A faixa de quem está determinado a estudar.', price: 60, type: 'acc' },
  { id: 'wizard', name: 'Chapéu de feiticeira', desc: 'Para lançar feitiços de kana.', price: 80, type: 'acc' },
  { id: 'crown', name: 'Coroa dourada', desc: 'Para quem reina na Academia.', price: 150, type: 'acc' }
];

const RANKS = [
  { min: 1, name: 'Novato', jp: 'しんにゅうせい' },
  { min: 3, name: 'Aprendiz', jp: 'みならい' },
  { min: 5, name: 'Estudante', jp: 'がくせい' },
  { min: 8, name: 'Veterano', jp: 'せんぱい' },
  { min: 12, name: 'Mestre', jp: 'せんせい' }
];
