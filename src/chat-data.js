/* ==========================================================
   NIHONGO CHAT 4.0 — personagens, roteiros, intenções e vocabulário
   Formas de resposta: F(japonês, romaji, português, registro, lições usadas, variações)
   - registro: c casual · n neutro · p polido · k keigo
   - lições usadas: ids reais da Academia (ex.: 'c1l3') ou expressões do chat ('chat:genki').
     O app só sugere/cobra formas cujas lições o aluno já aprovou; o resto é apresentado antes.
   - variações em romaji: (a|b) alternativas, (x)? opcional, {slot} lista, * qualquer palavra.
   ========================================================== */

/* números em romaji (para preços e para quem digita algarismos) */
function chNumRo(n) {
  n = Math.floor(Number(n) || 0);
  if (n === 0) return 'zero';
  const D = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu'];
  const H = ['', 'hyaku', 'nihyaku', 'sanbyaku', 'yonhyaku', 'gohyaku', 'roppyaku', 'nanahyaku', 'happyaku', 'kyuuhyaku'];
  const T = ['', 'sen', 'nisen', 'sanzen', 'yonsen', 'gosen', 'rokusen', 'nanasen', 'hassen', 'kyuusen'];
  if (n >= 10000) return String(n);
  const th = Math.floor(n / 1000), hu = Math.floor(n % 1000 / 100), te = Math.floor(n % 100 / 10), on = n % 10;
  return T[th] + H[hu] + (te ? (te > 1 ? D[te] : '') + 'juu' : '') + D[on];
}
function chNumJp(n) { return NQK.r2k(chNumRo(n)); }
function chYen(n) { const ro = chNumRo(n); return { jp: NQK.r2k(ro) + 'えん', ro: ro + ' en', pt: n + ' ienes', num: n }; }
const HOUR_RO = ['', 'ichi', 'ni', 'san', 'yo', 'go', 'roku', 'shichi', 'hachi', 'ku', 'juu', 'juuichi', 'juuni'];

const {
  CHAT_KANJI, CHAT_SLOTS, CHAT_PACK, CHAT_META, CHAT_INTENTS, CHAT_CHARS, CHAT_SCENES,
  CHAT_DYN_LINES, CHAT_DYN_ANSWER, CHAT_CHALLENGES, CHAT_CARDS
} = (function () {
  const L = (jp, ro, pt, o) => Object.assign({ jp, ro, pt }, o || {});
  const F = (jp, ro, pt, reg, uses, alt, o) => Object.assign({ jp, ro, pt, reg: reg || 'n', uses: [].concat(uses || []), alt: [].concat(alt || []) }, o || {});
  const B = (f, r, o) => Object.assign({ f: [].concat(f), r: [].concat(r || []) }, o || {});
  const N = (id, say, ask, o) => Object.assign({ id, say: [].concat(say || []), ask }, o || {});
  const TOD = (m, t, n) => ({ tod: { manha: m, tarde: t, noite: n } });

  /* ---------- leituras de kanji usadas no chat (o aluno pode digitar em kanji) ---------- */
  const CHAT_KANJI = {
    日本人: 'にほんじん', 日本: 'にほん', 知: 'し', 話: 'はなし', 話す: 'はなす', 話し: 'はなし', 泣: 'な', 申: 'もう', 少々: 'しょうしょう', 下: 'くだ', 何人: 'なにじん', 元気: 'げんき', 大丈夫: 'だいじょうぶ', 疲: 'つか', 眠: 'ねむ', 残念: 'ざんねん', 本当: 'ほんとう', 今日: 'きょう', 明日: 'あした', 昨日: 'きのう',
    水: 'みず', お茶: 'おちゃ', 何: 'なに', 好: 'す', 見: 'み', 食: 'た', 飲: 'の', 行: 'い', 来: 'き', 勉強: 'べんきょう', 日本語: 'にほんご',
    名前: 'なまえ', 先生: 'せんせい', 時: 'じ', 曜日: 'ようび', 月: 'げつ', 火: 'か', 金: 'きん', 土: 'ど', 日: 'にち', 笑: 'わら',
    今: 'いま', 一緒: 'いっしょ', 暇: 'ひま', 袋: 'ふくろ', 現金: 'げんきん', 結構: 'けっこう', 温: 'あたた', 弁当: 'べんとう', 箸: 'はし',
    分: 'わ', 了解: 'りょうかい', 楽: 'たの', 難: 'むずか', 暑: 'あつ', 寒: 'さむ', 宿題: 'しゅくだい', 二: 'ふた', 頑張: 'がんば', 映画: 'えいが',
    音楽: 'おんがく', 趣味: 'しゅみ', 料理: 'りょうり', 写真: 'しゃしん', 本: 'ほん', 歌: 'うた', 召: 'め', 上: 'あ', 多分: 'たぶん', 凄: 'すご', 御馳走様: 'ごちそうさま'
  };

  /* ---------- listas usadas nos padrões ---------- */
  const S_ = (ro, jp, pt, o) => Object.assign({ ro, jp, pt }, o || {});
  const CHAT_SLOTS = {
    food: [S_('onigiri', 'おにぎり', 'oniguiri', { price: 150 }), S_('pan', 'パン', 'pão', { price: 180 }), S_('mizu', 'みず', 'água', { price: 110, p: '(o)?mizu' }),
      S_('ocha', 'おちゃ', 'chá', { price: 140 }), S_('koohii', 'コーヒー', 'café', { price: 160, p: '(koohii|kohi|kouhii|coffee)' }), S_('bentou', 'おべんとう', 'marmita (bentō)', { price: 520, p: '(o)?bentou' }),
      S_('tamago', 'たまご', 'ovo', { price: 240 }), S_('kudamono', 'くだもの', 'fruta', { price: 300 }), S_('raamen', 'ラーメン', 'lámen', { price: 450, p: '(raamen|ramen)' }),
      S_('sushi', 'すし', 'sushi', { price: 600, p: '(o)?sushi' }), S_('purin', 'プリン', 'pudim', { price: 250 }), S_('juusu', 'ジュース', 'suco', { price: 130, p: '(juusu|jusu)' })],
    drink: [S_('mizu', 'みず', 'água', { p: '(o)?mizu' }), S_('ocha', 'おちゃ', 'chá'), S_('juusu', 'ジュース', 'suco', { p: '(juusu|jusu)' }), S_('koohii', 'コーヒー', 'café', { p: '(koohii|kohi|kouhii)' }), S_('koucha', 'こうちゃ', 'chá preto')],
    like: [S_('anime', 'アニメ', 'anime'), S_('geemu', 'ゲーム', 'games', { p: '(geemu|gemu|game)' }), S_('manga', 'まんが', 'mangá'), S_('ongaku', 'おんがく', 'música'),
      S_('eiga', 'えいが', 'filmes'), S_('raamen', 'ラーメン', 'lámen', { p: '(raamen|ramen)' }), S_('sakkaa', 'サッカー', 'futebol', { p: '(sakkaa|sakka|futebol)' }),
      S_('hon', 'ほん', 'livros'), S_('ryouri', 'りょうり', 'cozinhar'), S_('karaoke', 'カラオケ', 'karaokê'), S_('sushi', 'すし', 'sushi')],
    hobby: [S_('anime', 'アニメを みること', 'ver anime', { p: 'anime( o miru koto)?' }), S_('manga', 'まんがを よむこと', 'ler mangá', { p: 'manga( o yomu koto)?' }),
      S_('geemu', 'ゲーム', 'videogame', { p: '(geemu|gemu)( o suru koto)?' }), S_('ongaku', 'おんがくを きくこと', 'ouvir música', { p: 'ongaku( o kiku koto)?' }),
      S_('utau', 'うたうこと', 'cantar', { p: '(uta|utau koto|karaoke)' }), S_('ryouri', 'りょうり', 'cozinhar', { p: 'ryouri( o suru koto)?' }),
      S_('supootsu', 'スポーツ', 'esportes', { p: '(supootsu|sakkaa|undou)' }), S_('dokusho', 'どくしょ', 'leitura', { p: '(dokusho|hon o yomu koto)' }),
      S_('eiga', 'えいがを みること', 'ver filmes', { p: 'eiga( o miru koto)?' }), S_('shashin', 'しゃしん', 'fotografia', { p: 'shashin( o toru koto)?' }),
      S_('dansu', 'ダンス', 'dança'), S_('benkyou', 'べんきょう', 'estudar', { p: '(benkyou|nihongo no benkyou)' }), S_('ryokou', 'りょこう', 'viajar')],
    genre: [S_('akushon', 'アクション', 'ação'), S_('renai', 'れんあい', 'romance', { p: "(renai|ren'ai|rabukome)" }), S_('komedii', 'コメディー', 'comédia', { p: '(komedii|komedi|gyagu)' }),
      S_('fantajii', 'ファンタジー', 'fantasia', { p: '(fantajii|fantaji)' }), S_('horaa', 'ホラー', 'terror', { p: '(horaa|hora)' }), S_('supootsu', 'スポーツ', 'esporte'),
      S_('isekai', 'いせかい', 'isekai'), S_('robotto', 'ロボット', 'robôs', { p: '(robotto|robotto mono|meka)' }), S_('nichijou', 'にちじょう', 'cotidiano', { p: '(nichijou|nichijou kei)' }), S_('mahou', 'まほう', 'magia')],
    music: [S_('jpop', 'J-POP', 'J-pop', { p: '(jei poppu|jeipoppu|jpop|j poppu)' }), S_('anison', 'アニソン', 'músicas de anime', { p: '(anison|anime no uta|anime song)' }),
      S_('rokku', 'ロック', 'rock', { p: '(rokku|roku|rock)' }), S_('kpop', 'K-POP', 'K-pop', { p: '(kei poppu|keipoppu|kpop)' }), S_('samba', 'サンバ', 'samba', { p: '(sanba|samba)' }),
      S_('bossa', 'ボサノバ', 'bossa nova', { p: '(bosanoba|bossa noba|bossa nova)' }), S_('kurashikku', 'クラシック', 'música clássica', { p: '(kurashikku|kurashiku)' }),
      S_('hiphop', 'ヒップホップ', 'hip-hop', { p: '(hippu hoppu|hippuhoppu|hiphop)' }), S_('iroiro', 'いろいろ', 'de tudo um pouco', { p: '(iroiro|nan demo)' })],
    hour: HOUR_RO.slice(1).map((r, i) => S_(r + 'ji', NQK.r2k(r) + 'じ', (i + 1) + 'h', { n: i + 1 }))
  };

  /* ---------- expressões novas do chat (entram no Caderno e na Revisão como “chat:chave”) ---------- */
  const I = (k, jp, ro, pt, note, ex) => ({ k, jp, ro, pt, note, ex: ex ? { jp: ex[0], ro: ex[1], pt: ex[2] } : undefined });
  const CHAT_PACK = {
    id: 'chat', title: 'Expressões do Nihongo Chat', kind: 'vocab', items: [
      I('genki', 'げんき', 'genki', 'bem, disposto (元気)', 'Entre amigos, 「げんき？」 é o “tudo bem?”. A resposta pode ser só 「げんき！」. Com a professora: 「げんきです」.', ['げんき？ うん、げんき！', 'genki? un, genki!', 'Tudo bem? Tudo!']),
      I('maamaa', 'まあまあ', 'maa maa', 'mais ou menos', 'Resposta honesta e comum para “como você está?” ou “gostou?”.'),
      I('nemui', 'ねむい', 'nemui', 'com sono (眠い)', 'Adjetivo い: ねむいです (educado), ねむい… (casual).'),
      I('makeru', 'まける', 'makeru', 'perder (um jogo, uma partida)', 'O contrário é かつ (katsu), ganhar. Passado casual: まけた / かった.', ['ゲームで まけた。', 'geemu de maketa.', 'Perdi no jogo.']),
      I('zannen', 'ざんねん', 'zannen', 'que pena (残念)', 'Para lamentar algo com alguém. Educado: ざんねんでしたね.'),
      I('donmai', 'どんまい', 'donmai', 'não liga! (do inglês “don’t mind”)', 'Gíria de consolo entre amigos e colegas de time.'),
      I('kochirakoso', 'こちらこそ', 'kochira koso', 'eu é que agradeço / igualmente', 'Resposta a よろしく ou ありがとう: “o prazer é meu”.'),
      I('sugoi', 'すごい', 'sugoi', 'incrível! (凄い)', 'Elogio universal. Educado: すごいですね.'),
      I('omedetou', 'おめでとう', 'omedetou', 'parabéns!', 'Educado: おめでとうございます.'),
      I('nigate', 'にがて', 'nigate', 'não ser bom em / não curtir muito (苦手)', 'Jeito suave de dizer que não gosta: ゲームは ちょっと にがて.'),
      I('shiteru', 'してる', 'shiteru', 'está fazendo (contração de している)', 'Na fala casual, 〜ている vira 〜てる: みてる, たべてる, してる.', ['いま なに してる？', 'ima nani shiteru?', 'O que você está fazendo agora?']),
      I('maji', 'マジ', 'maji', 'sério?! / de verdade', 'Gíria muito comum entre jovens: マジで？ (sério?). Evite com professores e clientes.'),
      I('hontou', 'ほんとう', 'hontou', 'verdade (本当)', 'ほんとう？ = sério? / é mesmo? Também ほんと.'),
      I('taihen', 'たいへん', 'taihen', 'difícil, puxado, que sufoco (大変)', 'たいへんだったね = deve ter sido difícil.'),
      I('aruaru', 'あるある', 'aru aru', 'acontece muito! / clássico!', 'Gíria para dizer que algo é comum, que todo mundo já passou por isso.'),
      I('onakasuita', 'おなか すいた', 'onaka suita', 'estou com fome', 'Literalmente “a barriga esvaziou”. Educado: おなかが すきました.'),
      I('choudai', 'ちょうだい', 'choudai', 'me dá (pedido íntimo)', 'Pedido de muita intimidade (amigos, família). Nunca use com clientes, professores ou desconhecidos.', ['みず ちょうだい。', 'mizu choudai.', 'Me dá água.']),
      I('kureru', 'くれる？', 'kureru?', 'você me dá? / pode me dar?', 'Pedido casual e gentil entre pessoas próximas.'),
      I('osusume', 'おすすめ', 'osusume', 'recomendação', 'おすすめは？ = o que você recomenda?'),
      I('tameguchi', 'タメ口', 'tameguchi', 'fala casual entre iguais', 'Quando alguém diz 「タメ口で いいよ」, pode parar de usar です/ます com essa pessoa.'),
      I('hajimeru', '〜はじめる', '~hajimeru', 'começar a (fazer algo)', 'Radical do verbo + はじめる: みはじめる (começar a assistir), よみはじめる (começar a ler).'),
      I('donna', 'どんな', 'donna', 'que tipo de', 'どんな アニメ？ = que tipo de anime?'),
      I('iina', 'いいな', 'ii na', 'que legal! / que inveja (boa)!', 'Reação quando a outra pessoa conta algo bom.'),
      I('choudoii', 'ちょうど いい', 'choudo ii', 'na medida certa', 'そう？ ちょうど いいよ = Será? Está bom assim.'),
      I('motto', 'もっと', 'motto', 'mais', 'もっと あつい = mais quente.'),
      I('osagashi', 'おさがしですか', 'osagashi desu ka', 'está procurando? (atendimento)', 'Keigo de loja: 「なにか おさがしですか」 = Procura algo?'),
      I('miteirudake', 'みて いる だけです', 'mite iru dake desu', 'só estou olhando', 'Resposta educada ao vendedor quando você ainda não quer comprar.'),
      I('fukuro', 'ふくろ', 'fukuro', 'sacola (袋)', 'No caixa: 「ふくろは ごりようですか」 = Vai querer sacola?'),
      I('genkin', 'げんきん', 'genkin', 'dinheiro vivo (現金)', 'げんきんで おねがいします = Em dinheiro, por favor.'),
      I('atatameru', 'あたためる', 'atatameru', 'esquentar (温める)', 'No konbini: 「あたためますか」 = Quer que esquente?'),
      I('sonomama', 'そのままで', 'sono mama de', 'assim mesmo, do jeito que está', 'そのままで だいじょうぶです = Pode deixar assim.'),
      I('kekkou', 'けっこうです', 'kekkou desu', 'não, obrigado(a) (recusa educada)', 'Recusa firme e educada. Para recusar algo oferecido por um vendedor.'),
      I('ikaga', 'いかがですか', 'ikaga desu ka', 'que tal? / aceita? (educado)', 'Versão educada de どうですか, comum em oferecimentos.'),
      I('shinagire', 'しなぎれ', 'shinagire', 'esgotado (品切れ)', 'ただいま しなぎれで ございます = No momento está esgotado.'),
      I('matakimasu', 'また きます', 'mata kimasu', 'volto outra hora', 'Despedida educada numa loja.'),
      I('yaa', 'やあ', 'yaa', 'oi!', 'Cumprimento casual. Entre amigos também se usa よっ (yo).'),
      I('matane', 'またね', 'mata ne', 'até mais!', 'Despedida casual. Com professores: しつれいします ou では、また.'),
      I('choushi', 'ちょうし どう？', 'choushi dou?', 'como estão as coisas?', 'Pergunta casual. 「ちょうし」 = condição, ritmo.'),
      I('otsukare', 'おつかれ', 'otsukare', 'bom trabalho / descansa! (casual)', 'Versão casual de おつかれさまです. Use com amigos e colegas próximos.'),
      I('shimekiri', 'しめきり', 'shimekiri', 'prazo final', 'しめきりは げつようびです = O prazo é segunda.'),
      I('itadaku', 'いただく', 'itadaku', 'receber, comer (humilde)', 'Verbo humilde: usado para as SUAS ações. Para o cliente, use めしあがる.'),
      I('meshiagaru', 'めしあがる', 'meshiagaru', 'comer, beber (respeitoso)', 'Verbo respeitoso: usado para as ações do OUTRO (cliente, professor).'),
      I('purin', 'プリン', 'purin', 'pudim', 'まっちゃの プリン = pudim de matchá.'),
      I('onigiri', 'おにぎり', 'onigiri', 'oniguiri (bolinho de arroz)', 'Clássico das lojas de conveniência.'),
      I('nara', '〜なら', '~nara', 'se for…, no caso de…', 'にちようびなら いいよ = Se for domingo, pode ser.')
    ]
  };
  // registra no mesmo índice da Academia (ids estáveis "chat:chave"), como os pacotes auditivos
  CHAT_PACK.cat = { id: 'chat', title: 'Nihongo Chat' }; CHAT_PACK.index = 0;
  CHAT_PACK.items.forEach(it => { it.id = 'chat:' + it.k; it.lesson = CHAT_PACK; it.group = 'expressao'; ITEM[it.id] = it; });

  /* ---------- pedidos de ajuda que valem em qualquer conversa ---------- */
  const CHAT_META = [
    { id: 'repeat', f: [F('もう いちど おねがいします。', 'mou ichido onegaishimasu.', 'Mais uma vez, por favor.', 'p', ['c1l4'], ['mou ichido( onegai( shimasu)?| itte( kudasai)?)?', 'mou ikkai( itte)?( kudasai)?', 'e', 'nani', 'nante', 'nante itta( no)?', 'nan desu ka'])] },
    { id: 'slow', f: [F('ゆっくり おねがいします。', 'yukkuri onegaishimasu.', 'Mais devagar, por favor.', 'p', ['c14l7'], ['(motto )?yukkuri( onegai( shimasu)?| itte( kudasai)?| hanashite( kudasai)?)?'])] },
    { id: 'dontknow', f: [F('わかりません。', 'wakarimasen.', 'Não entendi.', 'p', ['c1l4'], ['wakarimasen( deshita)?', 'wakaranai', 'wakannai', 'shiranai', 'shirimasen', 'nao sei', 'nao entendi'])] }
  ];

  /* ---------- intenções da conversa livre (o aluno puxa assunto) ---------- */
  const CHAT_INTENTS = [
    { id: 'greet', idea: 'Cumprimentar', f: [F('おはよう！', 'ohayou!', 'Bom dia! (casual)', 'c', ['c1l3'], ['ohayou( ne)?']), F('おはようございます。', 'ohayou gozaimasu.', 'Bom dia.', 'p', ['c1l3']),
      F('こんにちは！', 'konnichiwa!', 'Olá! / Boa tarde!', 'n', ['c1l3']), F('こんばんは！', 'konbanwa!', 'Boa noite! (ao chegar)', 'n', ['c1l3']),
      F('やあ！', 'yaa!', 'Oi!', 'c', ['chat:yaa'], ['ya', 'yo', 'yoo', 'ossu', 'osu', 'oi', 'ola', 'hai hai']), F('どうも。', 'doumo.', 'Olá (neutro).', 'n', [])] },
    { id: 'howareyou', idea: 'Perguntar como está', then: 'imgood', f: [F('げんき？', 'genki?', 'Tudo bem?', 'c', ['chat:genki'], ['genki( ni shiteru| datta)?( ka| kai| no)?']), F('げんきですか。', 'genki desu ka.', 'Você está bem?', 'p', ['chat:genki']),
      F('おげんきですか。', 'ogenki desu ka.', 'Como vai? (educado)', 'p', ['chat:genki']), F('ちょうし どう？', 'choushi dou?', 'Como estão as coisas?', 'c', ['chat:choushi'], ['choushi (wa )?dou( desu ka)?'])] },
    { id: 'imgood', f: [F('げんき！', 'genki!', 'Tô bem!', 'c', ['chat:genki'], ['(un )?(genki|daijoubu)( da yo| da| yo)?', '(un )?(chou|mecha|sugoku) genki( da yo)?']), F('げんきです。', 'genki desu.', 'Estou bem.', 'p', ['chat:genki'], ['(hai )?(genki|daijoubu) desu( yo)?']),
      F('まあまあ。', 'maa maa.', 'Mais ou menos.', 'n', ['chat:maamaa'], ['maa maa( desu| da yo)?'])] },
    { id: 'imtired', idea: 'Dizer que está cansado(a)', f: [F('つかれた…', 'tsukareta…', 'Tô cansado(a)…', 'c', ['c8l3'], ['(chotto |sugoku |mou )?tsukareta( yo)?']), F('つかれました。', 'tsukaremashita.', 'Estou cansado(a).', 'p', ['c8l3']), F('ねむい…', 'nemui…', 'Tô com sono…', 'c', ['chat:nemui'], ['(chotto |sugoku )?nemui( yo)?', 'nemui desu'])] },
    { id: 'thanks', idea: 'Agradecer', f: [F('ありがとう！', 'arigatou!', 'Valeu!', 'c', ['c1l3'], ['arigato(u)?( ne)?', 'sankyuu', 'sankyu']), F('ありがとうございます。', 'arigatou gozaimasu.', 'Muito obrigado(a).', 'p', ['c1l3'], ['(doumo )?arigatou gozaimasu', 'arigatou gozaimashita']), F('どうも ありがとう。', 'doumo arigatou.', 'Muito obrigado(a).', 'n', ['c1l3'])] },
    { id: 'bye', idea: 'Se despedir', f: [F('じゃあね！', 'jaa ne!', 'Tchau!', 'c', ['c1l3'], ['ja(a)? ne', 'ja(a)? na', 'ja(a)? mata( ne| ashita)?']), F('またね！', 'mata ne!', 'Até mais!', 'c', ['chat:matane'], ['mata ne', 'mata ashita( ne)?', 'bai bai', 'baibai']),
      F('さようなら。', 'sayounara.', 'Adeus / Tchau.', 'n', ['c1l3']), F('しつれいします。', 'shitsurei shimasu.', 'Com licença, já vou.', 'p', ['c15l11'], ['(sorosoro |osaki ni )?shitsurei shimasu', 'dewa mata', 'de wa mata'])] },
    { id: 'sorry', idea: 'Pedir desculpas', f: [F('ごめん！', 'gomen!', 'Foi mal!', 'c', ['c1l4'], ['gomen( ne)?']), F('ごめんなさい。', 'gomen nasai.', 'Desculpe.', 'n', ['c1l4']), F('すみません。', 'sumimasen.', 'Com licença / Desculpe.', 'p', ['c1l3'])] },
    { id: 'whatdoing', idea: 'Perguntar o que está fazendo', f: [F('いま なに してる？', 'ima nani shiteru?', 'O que você está fazendo?', 'c', ['chat:shiteru'], ['(ima )?nani (shiteru|shite ru|shiteru no|shite iru( no)?)']), F('いま なにを して いますか。', 'ima nani o shite imasu ka.', 'O que você está fazendo agora?', 'p', ['c5l10'], ['(ima )?nani o shite imasu ka'])] },
    { id: 'likesq', idea: 'Perguntar do que gosta', f: [F('なにが すき？', 'nani ga suki?', 'Do que você gosta?', 'c', ['c4l6', 'c5l7'], ['nani ga suki( na no)?', 'suki na mono wa']), F('なにが すきですか。', 'nani ga suki desu ka.', 'Do que você gosta?', 'p', ['c4l6', 'c5l7'], ['nani ga suki desu ka', 'shumi wa nan desu ka'])] },
    { id: 'hungry', idea: 'Dizer que está com fome', f: [F('おなか すいた。', 'onaka suita.', 'Tô com fome.', 'c', ['chat:onakasuita'], ['onaka (ga )?suita( na| yo)?', 'hara hetta']), F('おなかが すきました。', 'onaka ga sukimashita.', 'Estou com fome.', 'p', ['chat:onakasuita'])] },
    { id: 'weather', idea: 'Comentar o tempo', f: [F('いい てんきだね。', 'ii tenki da ne.', 'Que dia bonito, né?', 'c', ['c5l9'], ['ii tenki (da )?(ne|na)', '(kyou wa )?(atsui|samui)( ne| na)']), F('いい てんきですね。', 'ii tenki desu ne.', 'Que tempo bom, não?', 'p', ['c5l9'], ['(kyou wa )?(atsui|samui) desu ne'])] },
    { id: 'compliment', idea: 'Elogiar', f: [F('すごい！', 'sugoi!', 'Incrível!', 'c', ['chat:sugoi'], ['(chou |mecha )?sugoi( ne| na)?']), F('すごいですね。', 'sugoi desu ne.', 'Que incrível!', 'p', ['chat:sugoi'])] },
    { id: 'studying', idea: 'Contar que estuda japonês', f: [F('にほんごを べんきょう してる。', 'nihongo o benkyou shiteru.', 'Tô estudando japonês.', 'c', ['c6l1', 'chat:shiteru'], ['nihongo (o |no )?benkyou( shiteru| shite iru| chuu)( yo)?']), F('にほんごを べんきょうして います。', 'nihongo o benkyou shite imasu.', 'Estou estudando japonês.', 'p', ['c6l1'])] },
    { id: 'recommend', idea: 'Pedir uma recomendação', f: [F('おすすめは？', 'osusume wa?', 'O que você recomenda?', 'c', ['chat:osusume'], ['osusume (wa|aru)( nani)?', 'nani ka osusume (aru)?']), F('おすすめは なんですか。', 'osusume wa nan desu ka.', 'Qual é a recomendação?', 'p', ['c15l1'], ['osusume wa (nan|nani) desu ka'])] },
    { id: 'price', idea: 'Perguntar o preço', f: [F('いくら？', 'ikura?', 'Quanto é?', 'c', ['c6l4'], ['(kore )?ikura( na no)?']), F('これは いくらですか。', 'kore wa ikura desu ka.', 'Quanto custa isto?', 'p', ['c6l4'], ['(kore wa |sore wa )?ikura desu ka'])] }
  ];

  /* ---------- cartões de formalidade ---------- */
  const CHAT_CARDS = {
    agua: { title: 'Pedir água: a relação muda a frase', rows: [
      { who: 'Amigo íntimo, família', jp: 'みず ちょうだい', ro: 'mizu choudai', pt: 'Me dá água.', note: 'Íntimo e carinhoso. Fora desse círculo, soa folgado.' },
      { who: 'Amigos e pessoas próximas', jp: 'みず くれる？', ro: 'mizu kureru?', pt: 'Pode me dar água?', note: 'Casual e gentil, pede um favor.' },
      { who: 'Pedido educado em geral', jp: 'おみずを ください', ro: 'omizu o kudasai', pt: 'Água, por favor.', note: 'Educado e direto. Serve com desconhecidos.' },
      { who: 'Restaurante, loja, atendimento', jp: 'おみずを おねがいします', ro: 'omizu o onegaishimasu', pt: 'Água, por favor (pedido gentil).', note: 'O mais natural como cliente: pede sem “mandar”.' }],
      foot: 'Nenhuma delas é “errada”, mas não são intercambiáveis: 「ちょうだい」 com um atendente soa mal-educado, e 「おねがいします」 com o Ren soa distante.' },
    san: { title: 'Por que não usar さん em você mesmo', rows: [
      { who: 'Falando do outro', jp: 'ゆみさんは がくせいです', ro: 'Yumi-san wa gakusei desu', pt: 'A Yumi é estudante.', note: 'さん mostra respeito pela outra pessoa.' },
      { who: 'Falando de si', jp: 'わたしは ハリーです', ro: 'watashi wa Harii desu', pt: 'Eu sou o Harry.', note: 'Sem さん: colocar honorífico no próprio nome soa arrogante.' }],
      foot: 'O mesmo vale para a família de quem fala: em japonês, você é humilde com o que é seu e respeitoso com o que é do outro.' },
    keigo: { title: 'Respeitoso × humilde', rows: [
      { who: 'Ação do cliente / professor', jp: 'めしあがりますか', ro: 'meshiagarimasu ka', pt: 'O senhor vai comer?', note: 'Respeitoso (そんけいご): eleva o outro.' },
      { who: 'A sua própria ação', jp: 'いただきます', ro: 'itadakimasu', pt: 'Eu vou comer / recebo.', note: 'Humilde (けんじょうご): rebaixa você.' }],
      foot: 'Erro clássico: 「なにを いただきますか」 para o cliente. Isso rebaixa o cliente. Para ele, use 「めしあがりますか」.' }
  };

  /* =========================================================
     PERSONAGENS
     ========================================================= */
  const passTxt = id => (CAT[id] ? CAT[id].num + '. ' + CAT[id].title : id);
  const CHAT_CHARS = [
    { id: 'ren', name: 'Ren', jp: 'レン', ro: 'Ren', rel: 'Amigo próximo', reg: 'c', pitch: 0.85, color: 'var(--royal)', intro: 'ren-oi',
      desc: 'Descontraído, divertido e espontâneo. Vive falando de jogos e animes, faz piada de tudo e quer saber como foi o seu dia.',
      likes: ['jogos de luta', 'animes de aventura', 'lámen'], speech: 'Casual, com contrações e gírias leves (〜ちゃった, マジ, 〜じゃん).',
      pt: { quem: 'um amigo próximo' },
      unlock: { txt: 'Disponível desde o início', test: () => true },
      confused: [L('え？ ごめん、もう いっかい！', 'e? gomen, mou ikkai!', 'Hã? Foi mal, fala de novo!'), L('ん？ どういう こと？（笑）', 'n? dou iu koto? (wara)', 'Hein? Como assim? (risos)'), L('ごめん、よく わかんなかった。', 'gomen, yoku wakannakatta.', 'Foi mal, não entendi direito.')],
      repeat: [L('あ、ごめん。ゆっくり いうね。', 'a, gomen. yukkuri iu ne.', 'Ah, foi mal. Vou falar devagar.')],
      dontknow: [L('だいじょうぶ、だいじょうぶ！ ヒント だすね。', 'daijoubu, daijoubu! hinto dasu ne.', 'Tranquilo! Vou te dar uma dica.')],
      freeOpen: [L('おう、どうした？', 'ou, dou shita?', 'E aí, o que manda?')],
      free: {
        greet: [[TOD(L('おはよ！ はやいね！', 'ohayo! hayai ne!', 'Bom dia! Acordou cedo, hein!'), L('よっ！', 'yo!', 'E aí!'), L('おう、こんばんは〜！', 'ou, konbanwa~!', 'Opa, boa noite!'))]],
        howareyou: [[L('げんき げんき！ {name}は？', 'genki genki! {name} wa?', 'Tô bem, tô bem! E você?')], [L('まあまあ かな。きのう ねるの おそかった（笑）。{name}は？', 'maa maa kana. kinou neru no osokatta (wara). {name} wa?', 'Mais ou menos. Dormi tarde ontem (risos). E você?')]],
        imgood: [[L('よかった！', 'yokatta!', 'Que bom!')]],
        imtired: [[L('おつかれ〜。むりしないで、やすんでね。', 'otsukare~. muri shinaide, yasunde ne.', 'Cansou, né? Não exagera, descansa.')]],
        thanks: [[L('いいって いいって！', 'ii tte ii tte!', 'Que nada!')]],
        bye: [[L('じゃあな！ また はなそう！', 'jaa na! mata hanasou!', 'Falou! Depois a gente conversa!')]],
        sorry: [[L('きに すんなって！', 'ki ni sunna tte!', 'Esquenta não!')]],
        whatdoing: [[L('ゲーム してた！ いま いい ところ！', 'geemu shiteta! ima ii tokoro!', 'Tava jogando! Tá na parte boa!')], [L('アニメ みてた。「ほしの ゆうしゃ」の さいしんわ！', 'anime miteta. "hoshi no yuusha" no saishinwa!', 'Tava vendo anime. O episódio novo de “Hoshi no Yuusha”!')]],
        likesq: [[L('ゲームと アニメと ラーメン！ ぜんぶ だいすき！', 'geemu to anime to raamen! zenbu daisuki!', 'Games, anime e lámen! Amo tudo!')]],
        hungry: [[L('おれも！ ラーメン いこうぜ！', 'ore mo! raamen ikou ze!', 'Eu também! Bora comer lámen!')]],
        weather: [[L('だよね〜。そとで あそびたく なる！', 'da yo ne~. soto de asobitaku naru!', 'Né? Dá vontade de sair!')]],
        compliment: [[L('だろ？（笑）', 'daro? (wara)', 'Né não? (risos)')]],
        studying: [[L('えらい！ おれも しゅくだい やらなきゃ…', 'erai! ore mo shukudai yaranakya…', 'Mandou bem! Eu também preciso fazer a lição…')]],
        recommend: [[L('「ほしの ゆうしゃ」！ ぜったい みて！', '"hoshi no yuusha"! zettai mite!', '“Hoshi no Yuusha”! Assiste, sério!')]]
      } },
    { id: 'aiko', name: 'Aiko-sensei', jp: '愛子先生', ro: 'Aiko-sensei', rel: 'Professora', reg: 'p', pitch: 1.05, color: 'var(--violet)', intro: 'aiko-hajime',
      desc: 'Paciente, gentil e atenta. Explica sem constranger, incentiva a prática e percebe quando algo está difícil para você.',
      likes: ['livros', 'cerimônia do chá', 'curiosidades da língua'], speech: 'Japonês educado (です/ます), claro e sem pressa.',
      pt: { quem: 'uma professora' },
      unlock: { txt: 'Libera ao concluir a ala ' + passTxt('c1') + ' (avaliação final).', test: () => catPassed('c1'), progress: () => catProgress(CAT.c1) },
      confused: [L('すみません、もう いちど いって くれますか。', 'sumimasen, mou ichido itte kuremasu ka.', 'Desculpe, pode repetir?'), L('うーん、すこし わかりにくいですね。', 'uun, sukoshi wakarinikui desu ne.', 'Hum, ficou um pouco difícil de entender.')],
      repeat: [L('はい。ゆっくり いいますね。', 'hai. yukkuri iimasu ne.', 'Claro. Vou falar devagar.')],
      dontknow: [L('だいじょうぶですよ。いっしょに かんがえましょう。', 'daijoubu desu yo. issho ni kangaemashou.', 'Tudo bem. Vamos pensar juntos.')],
      freeOpen: [L('はい、{name}さん。なんですか。', 'hai, {name}-san. nan desu ka.', 'Sim, {name}. O que foi?')],
      free: {
        greet: [[TOD(L('おはようございます、{name}さん。', 'ohayou gozaimasu, {name}-san.', 'Bom dia, {name}.'), L('こんにちは、{name}さん。', 'konnichiwa, {name}-san.', 'Olá, {name}.'), L('こんばんは。おそくまで えらいですね。', 'konbanwa. osoku made erai desu ne.', 'Boa noite. Estudando até tarde, que dedicação.'))]],
        howareyou: [[L('はい、げんきです。{name}さんは？', 'hai, genki desu. {name}-san wa?', 'Estou bem, sim. E você?')]],
        imgood: [[L('それは よかったです。', 'sore wa yokatta desu.', 'Que bom.')]],
        imtired: [[L('むりを しないで くださいね。すこし やすみましょう。', 'muri o shinaide kudasai ne. sukoshi yasumimashou.', 'Não se esforce demais. Vamos descansar um pouco.')]],
        thanks: [[L('どういたしまして。', 'dou itashimashite.', 'De nada.')]],
        bye: [[L('では、また。おつかれさまでした。', 'dewa, mata. otsukaresama deshita.', 'Até mais. Bom trabalho hoje.')]],
        sorry: [[L('だいじょうぶですよ。きに しないで ください。', 'daijoubu desu yo. ki ni shinaide kudasai.', 'Tudo bem. Não se preocupe.')]],
        whatdoing: [[L('じゅぎょうの じゅんびを して います。', 'jugyou no junbi o shite imasu.', 'Estou preparando a aula.')]],
        likesq: [[L('わたしは ほんを よむのが すきです。とくに むかしばなしが すきです。', 'watashi wa hon o yomu no ga suki desu. toku ni mukashibanashi ga suki desu.', 'Gosto de ler livros. Principalmente contos antigos.')]],
        hungry: [[L('もう すぐ おひるですね。', 'mou sugu ohiru desu ne.', 'Já está quase na hora do almoço.')]],
        weather: [[L('そうですね。べんきょう日和ですね。', 'sou desu ne. benkyou biyori desu ne.', 'Pois é. Um ótimo dia para estudar.')]],
        compliment: [[L('ありがとうございます。うれしいです。', 'arigatou gozaimasu. ureshii desu.', 'Obrigada. Fico feliz.')]],
        studying: [[L('すばらしいです！ まいにち すこしずつ が だいじです。', 'subarashii desu! mainichi sukoshizutsu ga daiji desu.', 'Maravilhoso! O importante é um pouco todo dia.')]],
        recommend: [[L('まいにち こえに だして よむのが おすすめです。', 'mainichi koe ni dashite yomu no ga osusume desu.', 'Recomendo ler em voz alta todos os dias.')]]
      } },
    { id: 'yumi', name: 'Yumi', jp: 'ゆみ', ro: 'Yumi', rel: 'Colega de classe', reg: () => (chFact('yumi:tame') ? 'c' : 'p'), pitch: 1.3, color: '#d0517a', intro: 'yumi-hajime',
      desc: 'Amigável, curiosa e comunicativa. Ama animes, música e karaokê, conta as novidades dela e tem opiniões próprias.',
      likes: ['karaokê', 'animes de fantasia', 'J-pop'], speech: 'Começa educada; depois que vocês combinam タメ口, passa a falar de forma casual.',
      pt: { quem: 'uma colega de classe' },
      unlock: { txt: 'Libera ao concluir a ala ' + passTxt('c5') + ' (avaliação final).', test: () => catPassed('c5'), progress: () => catProgress(CAT.c5) },
      confused: [L('え？ もう いっかい いって？', 'e? mou ikkai itte?', 'Hã? Fala de novo?'), L('うーん、ちょっと わかんなかった…', 'uun, chotto wakannakatta…', 'Hum, não entendi muito bem…')],
      repeat: [L('うん、ゆっくり いうね！', 'un, yukkuri iu ne!', 'Tá, vou falar devagar!')],
      dontknow: [L('だいじょうぶ！ いっしょに かんがえよう。', 'daijoubu! issho ni kangaeyou.', 'Tranquilo! Vamos pensar juntas.')],
      freeOpen: [L('あ、{name}！ どうしたの？', 'a, {name}! dou shita no?', 'Ah, {name}! O que foi?')],
      free: {
        greet: [[TOD(L('おはよ〜！', 'ohayo~!', 'Bom diaaa!'), L('やっほー！', 'yahhoo!', 'Oiê!'), L('こんばんは〜！ まだ おきてたんだ！', 'konbanwa~! mada okiteta n da!', 'Boa noite! Ainda acordado(a)?'))]],
        howareyou: [[L('げんき げんき！ {name}は？', 'genki genki! {name} wa?', 'Tô ótima! E você?')]],
        imgood: [[L('よかった〜！', 'yokatta~!', 'Que bom!')]],
        imtired: [[L('おつかれ！ あまい もの たべよう！', 'otsukare! amai mono tabeyou!', 'Cansou, né? Vamos comer um docinho!')]],
        thanks: [[L('いえいえ！', 'ie ie!', 'Imagina!')]],
        bye: [[L('またね〜！', 'mata ne~!', 'Até mais!')]],
        sorry: [[L('ぜんぜん だいじょうぶ！', 'zenzen daijoubu!', 'Tá tudo bem, sério!')]],
        whatdoing: [[L('アニメの うたを きいてるの！', 'anime no uta o kiiteru no!', 'Tô ouvindo músicas de anime!')], [L('カラオケで うたう きょくを えらんでる！', 'karaoke de utau kyoku o erande ru!', 'Tô escolhendo as músicas pro karaokê!')]],
        likesq: [[L('うたうのと アニメ！ あと あまい もの！', 'utau no to anime! ato amai mono!', 'Cantar e anime! E doces!')]],
        hungry: [[L('わたしも！ パン たべたい〜。', 'watashi mo! pan tabetai~.', 'Eu também! Quero pão!')]],
        weather: [[L('ね〜！', 'ne~!', 'Né?!')]],
        compliment: [[L('えへへ、ありがと！', 'ehehe, arigato!', 'Hehe, valeu!')]],
        studying: [[L('すごい！ いっしょに がんばろう！', 'sugoi! issho ni ganbarou!', 'Que demais! Vamos nos esforçar juntas!')]],
        recommend: [[L('「つきの としょかん」って アニメ、ぜったい おすすめ！', '"tsuki no toshokan" tte anime, zettai osusume!', 'O anime “Tsuki no Toshokan”, super recomendo!')]]
      } },
    { id: 'takeshi', name: 'Takeshi', jp: 'たけし', ro: 'Takeshi', rel: 'Comerciante', reg: 'p', pitch: 0.75, color: 'var(--ok)', intro: 'tk-hajime',
      desc: 'Dono da Loja Takeshi. Atencioso, profissional e prestativo: fala de produtos, preços e comida, sempre com japonês de atendimento.',
      likes: ['produtos novos', 'oniguiri', 'clientes simpáticos'], speech: 'Keigo de loja (いらっしゃいませ, かしこまりました, 〜でございます).',
      pt: { quem: 'um atendente de loja' },
      unlock: { txt: 'Libera ao concluir a ala ' + passTxt('c9') + ' e as lições No restaurante, Na loja de conveniência e Fazendo compras (ala ' + passTxt('c15') + ').',
        test: () => catPassed('c9') && ['c15l1', 'c15l2', 'c15l3'].every(lessonPassed),
        progress: () => { const a = catProgress(CAT.c9); const b = ['c15l1', 'c15l2', 'c15l3'].filter(lessonPassed).length; return { done: a.done + b, tot: a.tot + 3 }; } },
      confused: [L('もうしわけございません。もう いちど おねがいできますか。', 'moushiwake gozaimasen. mou ichido onegai dekimasu ka.', 'Mil desculpas. Poderia repetir?'), L('えっと…しょうしょう おまちください。', 'etto… shoushou omachi kudasai.', 'Hum… só um momento, por favor.')],
      repeat: [L('しつれいしました。ゆっくり もうしあげますね。', 'shitsurei shimashita. yukkuri moushiagemasu ne.', 'Perdão. Vou dizer devagar.')],
      dontknow: [L('だいじょうぶですよ。ゆっくりで けっこうです。', 'daijoubu desu yo. yukkuri de kekkou desu.', 'Tudo bem. Pode ser com calma.')],
      freeOpen: [L('いらっしゃいませ！', 'irasshaimase!', 'Bem-vindo(a)!')],
      free: {
        greet: [[L('いらっしゃいませ！ きょうも ありがとう ございます。', 'irasshaimase! kyou mo arigatou gozaimasu.', 'Bem-vindo(a)! Obrigado por vir hoje também.')]],
        howareyou: [[L('はい、おかげさまで げんきです。', 'hai, okagesama de genki desu.', 'Estou bem, graças a Deus. (おかげさまで)')]],
        imgood: [[L('それは なによりです。', 'sore wa nani yori desu.', 'Isso é o mais importante.')]],
        imtired: [[L('おつかれさまです。あたたかい おちゃは いかがですか。', 'otsukaresama desu. atatakai ocha wa ikaga desu ka.', 'Deve estar cansado(a). Aceita um chá quente?')]],
        thanks: [[L('こちらこそ、ありがとう ございます。', 'kochira koso, arigatou gozaimasu.', 'Eu é que agradeço.')]],
        bye: [[L('ありがとう ございました！ またの おこしを おまちして おります。', 'arigatou gozaimashita! mata no okoshi o omachi shite orimasu.', 'Muito obrigado! Esperamos sua próxima visita.')]],
        sorry: [[L('いえいえ、とんでも ございません。', 'ie ie, tonde mo gozaimasen.', 'Imagine, de forma alguma.')]],
        whatdoing: [[L('しょうひんを ならべて おります。', 'shouhin o narabete orimasu.', 'Estou arrumando os produtos.')]],
        likesq: [[L('わたしは おにぎりが だいすきです。とくに さけの おにぎりです。', 'watashi wa onigiri ga daisuki desu. toku ni sake no onigiri desu.', 'Adoro oniguiri. Principalmente o de salmão.')]],
        hungry: [[L('でしたら、こちらの おべんとうは いかがですか。', 'deshitara, kochira no obentou wa ikaga desu ka.', 'Então, que tal este bentō?')]],
        weather: [[L('そうですね。おでかけ びよりですね。', 'sou desu ne. odekake biyori desu ne.', 'É verdade. Um ótimo dia para passear.')]],
        compliment: [[L('おそれいります。', 'osore irimasu.', 'Fico lisonjeado. (muito educado)')]],
        studying: [[L('それは すばらしいですね。おうえん して おります。', 'sore wa subarashii desu ne. ouen shite orimasu.', 'Que maravilha. Estou torcendo por você.')]],
        recommend: [[L('きょうの おすすめは さけの おにぎりで ございます。', 'kyou no osusume wa sake no onigiri de gozaimasu.', 'A recomendação de hoje é o oniguiri de salmão.')]],
        price: [[L('どちらの しょうひんでしょうか。おにぎりは ひゃくごじゅうえんで ございます。', 'dochira no shouhin deshou ka. onigiri wa hyaku gojuu en de gozaimasu.', 'Qual produto? O oniguiri custa 150 ienes.')]]
      } }
  ];

  /* =========================================================
     CENAS (assuntos). need = lições que precisam estar aprovadas.
     init = o personagem pode puxar este assunto sozinho.
     ========================================================= */
  const AGREE = (o) => B([F('うん、いいよ！', 'un, ii yo!', 'Claro, pode ser!', 'c', ['c6l5'], ['(un )?(ii yo|ii ne|iku|iku yo|yarou|shiyou|mochiron|zehi)( ne| yo)?', 'un', 'ii ne( yarou| shiyou| ikou)?']),
    F('いいですね。', 'ii desu ne.', 'Boa ideia.', 'p', ['c6l2'], ['ii desu (ne|yo)( (ikimashou|shimashou))?', 'hai( zehi| ii desu yo)?'])], (o || {}).r, o);
  const DECLINE = (o) => B([F('ごめん、きょうは ちょっと…', 'gomen, kyou wa chotto…', 'Foi mal, hoje não dá…', 'c', ['c6l2', 'c1l4'], ['(gomen )?((kyou|ashita|doyoubi|ima) wa )?chotto', '(gomen )?((kyou|ashita|doyoubi|ima) wa )?muri( kamo)?', '(gomen )?isogashii', 'gomen']),
    F('すみません、ちょっと…', 'sumimasen, chotto…', 'Desculpe, não dá…', 'p', ['c6l2'], ['sumimasen( (kyou|ashita|doyoubi) wa)? chotto'])], (o || {}).r, o);
  const LAUGH = /^(w{2,}|(ha){2,}h?|(ah){2,}|(he){2,}|k{3,}|(rs){1,}|lol|kusa|wara(i)?|warau)$/;
  const CHAT_SCENES = [
    /* ---------------- REN ---------------- */
    { id: 'ren-oi', char: 'ren', intro: true, title: 'Conhecendo o Ren', need: [], set: ['ren:met'],
      nodes: [
        N('n1', [TOD(L('おはよう！', 'ohayou!', 'Bom dia!'), L('よっ！', 'yo!', 'E aí!'), L('こんばんは〜！', 'konbanwa~!', 'Boa noite!')), L('おれ、レン。よろしく！', 'ore, Ren. yoroshiku!', 'Eu sou o Ren. Prazer!')],
          { b: [B([F('よろしく！', 'yoroshiku!', 'Prazer!', 'c', ['c1l3'], ['(hajimemashite )?yoroshiku( ne| na)?', 'kochira koso( yoroshiku)?( ne)?']),
            F('はじめまして。', 'hajimemashite.', 'Muito prazer.', 'n', ['c1l3']),
            F('よろしく おねがいします。', 'yoroshiku onegaishimasu.', 'Muito prazer. (polido)', 'p', ['c1l3'], ['(hajimemashite )?yoroshiku onegai( shimasu)?'])], [L('うん！', 'un!', 'Valeu!')], { tag: 'apresentou' })],
            h: ['よろしく (yoroshiku) = prazer / conto com você · はじめまして (hajimemashite) = muito prazer', 'Entre amigos basta 「よろしく！」. A versão completa 「よろしく おねがいします」 é educada demais para o Ren.'],
            ex: 'O Ren se apresentou e disse “prazer!”. Responda ao cumprimento.' }),
        N('n2', [L('なまえは？', 'namae wa?', 'E o seu nome?')],
          { b: [B([F('{name}だよ。', '{name} da yo.', 'Sou o/a {name}.', 'c', ['c5l1'], ['(boku wa |watashi wa |ore wa |atashi wa )?{name}( da yo| da| dayo)?']),
            F('{name}です。', '{name} desu.', 'Sou o/a {name}. (polido)', 'p', ['c5l1'], ['(watashi wa )?{name} desu']),
            F('（なまえ）だよ。', '(nome) da yo.', 'Sou (nome).', 'c', ['c5l1'], ['(boku wa |watashi wa |ore wa |atashi wa )?*( da yo| da| dayo| desu)'], { wild: true })], [L('{name}か！ いい なまえだね。', '{name} ka! ii namae da ne.', '{name}! Nome legal!')])],
            h: ['なまえ (namae) = nome · だよ (da yo) = “é”, casual', 'Diga só o seu nome + だよ. Ex.: 「アナだよ。」'], ex: 'Ren perguntou o seu nome.' }),
        N('n3', [L('おれは ゲームが だいすき！ {name}は？ なにが すき？', 'ore wa geemu ga daisuki! {name} wa? nani ga suki?', 'Eu amo games! E você? Do que você gosta?')],
          { b: [B([F('アニメが すき！', 'anime ga suki!', 'Gosto de anime!', 'c', ['c4l6', 'c5l7'], ['{like} (ga )?(dai)?suki( da| dayo| da yo)?( yo)?', '{like}( kana| da yo| dayo)?']),
            F('アニメが すきです。', 'anime ga suki desu.', 'Gosto de anime. (polido)', 'p', ['c4l6', 'c5l7'], ['{like} ga (dai)?suki desu( yo)?'])],
            [L('{like}！ いいね〜！ おれも {like} すき！', '{like}! ii ne~! ore mo {like} suki!', '{like}! Demais! Eu também curto!')], { keep: { from: 'like', as: 'likes' }, tag: 'gostos' }),
            B([F('（なにか）が すき。', '(algo) ga suki.', 'Gosto de (algo).', 'c', ['c4l6', 'c5l7'], ['* (ga )?(dai)?suki( da| desu)?( yo)?'], { wild: true })], [L('へえ、{*}か！ こんど おしえて！', 'hee, {*} ka! kondo oshiete!', 'Hmm, {*}! Depois me conta mais!')])],
            h: ['すき (suki) = gostar · アニメ, ゲーム, まんが, おんがく, ラーメン', 'Estrutura: (coisa) が すき. Entre amigos não precisa de です.'], ex: 'Ren contou que ama games e perguntou do que você gosta.' }),
        N('n4', [L('これから よろしくな！ いつでも メッセージ してね。', 'kore kara yoroshiku na! itsu demo messeeji shite ne.', 'Conto com você de agora em diante! Me manda mensagem quando quiser.')])
      ] },
    { id: 'ren-genki', char: 'ren', init: true, title: 'Tudo bem?', desc: 'Cumprimentar, responder como você está e reagir à novidade do Ren.', need: [], set: ['ren:perdeu'],
      nodes: [
        N('n1', [TOD(L('おはよ！', 'ohayo!', 'Bom dia!'), L('よっ、{name}！', 'yo, {name}!', 'E aí, {name}!'), L('おつかれ〜！', 'otsukare~!', 'E aí, cansou hoje?')), L('げんき？', 'genki?', 'Tudo bem?')],
          { b: [B([F('げんき！', 'genki!', 'Tô bem!', 'c', ['chat:genki'], ['(un )?genki( da)?( yo)?( ne)?', '(un )?(chou|mecha|totemo|sugoku) genki( da)?( yo)?']),
            F('だいじょうぶ！', 'daijoubu!', 'Tudo certo!', 'c', ['c1l4'], ['(un )?daijoubu( da)?( yo)?']),
            F('げんきです。', 'genki desu.', 'Estou bem. (polido)', 'p', ['chat:genki'], ['(hai )?(genki|daijoubu) desu( yo)?'])], [L('よかった！', 'yokatta!', 'Que bom!')], { tag: 'respondeu' }),
            B([F('つかれた…', 'tsukareta…', 'Tô cansado(a)…', 'c', ['c8l3'], ['(chotto |sugoku |mou )?tsukareta( yo)?']), F('ねむい…', 'nemui…', 'Tô com sono…', 'c', ['chat:nemui'], ['(chotto |sugoku )?nemui( yo)?']),
              F('つかれました。', 'tsukaremashita.', 'Estou cansado(a). (polido)', 'p', ['c8l3'])], [L('マジか〜。おつかれ！ むりしないでね。', 'maji ka~. otsukare! muri shinaide ne.', 'Sério? Descansa, hein! Não exagera.')], { tag: 'respondeu' }),
            B([F('まあまあ。', 'maa maa.', 'Mais ou menos.', 'c', ['chat:maamaa'], ['maa maa( kana| da yo| desu)?'])], [L('まあまあ か〜。そういう ひも あるよね。', 'maa maa ka~. sou iu hi mo aru yo ne.', 'Mais ou menos, é? Tem dias assim.')], { tag: 'respondeu' }),
            B([F('あまり げんきじゃない。', 'amari genki ja nai.', 'Não tô muito bem.', 'c', ['chat:genki', 'c5l4'], ['(amari |chotto )?genki (ja|jya) nai( kamo)?'])], [L('え、だいじょうぶ？ なにか あったら いってね。', 'e, daijoubu? nanika attara itte ne.', 'Eita, tá tudo bem? Se precisar, me fala.')], { tag: 'respondeu' })],
            teachIf: ['genki'],
            h: ['げんき (genki) = bem, disposto · だいじょうぶ (daijoubu) = tudo certo · つかれた (tsukareta) = cansei', 'Entre amigos, a resposta pode ser só a palavra: 「げんき！」. Com です fica formal demais para o Ren.'],
            ex: 'Ren quer saber se você está bem. É o “tudo bem?” do dia a dia entre amigos.' }, { teach: ['genki'] }),
        N('n2', [L('おれ？ おれは まあまあ。きのう ゲームで まけちゃって…', 'ore? ore wa maa maa. kinou geemu de makechatte…', 'Eu? Mais ou menos. Ontem perdi no jogo…')],
          { b: [B([F('ざんねん！', 'zannen!', 'Que pena!', 'c', ['chat:zannen'], ['(sore wa )?zannen( da| datta)?( ne| na)?']), F('どんまい！', 'donmai!', 'Não liga!', 'c', ['chat:donmai']),
            F('だいじょうぶ？', 'daijoubu?', 'Tá tudo bem?', 'c', ['c1l4']), F('がんばって！', 'ganbatte!', 'Força!', 'c', ['c1l4'], ['(tsugi wa )?ganbatte( ne| yo)?']),
            F('ざんねんでしたね。', 'zannen deshita ne.', 'Que pena. (polido)', 'p', ['chat:zannen'])], [L('ありがと！ つぎは ぜったい かつ！', 'arigato! tsugi wa zettai katsu!', 'Valeu! Na próxima eu ganho com certeza!')], { tag: 'consolou' }),
            B([F('なんの ゲーム？', 'nan no geemu?', 'Que jogo?', 'c', ['c5l8'], ['(sore )?nan no geemu( na no)?', 'dono geemu', 'nani (o )?(shita|yatta)( no)?']),
              F('そうなんだ。', 'sou nan da.', 'Ah, é mesmo?', 'c', ['c8l6'], ['sou nan da( ne)?', 'hee( sou nan da)?', 'sou ka( a)?'])],
              [L('「ドラゴン アリーナ」って かくとう ゲーム！ あいてが つよすぎた…', '"doragon ariina" tte kakutou geemu! aite ga tsuyosugita…', 'Um jogo de luta, “Dragon Arena”! O adversário era forte demais…'), L('でも つぎは ぜったい かつ！', 'demo tsugi wa zettai katsu!', 'Mas na próxima eu ganho!')]),
            B([F('（笑）', 'www', '(risos)', 'c', [], [], { re: LAUGH, odd: true, why: 'Risada escrita funciona em mensagens (no Japão se usa 笑 ou www), mas o Ren perdeu e ficou chateado. Uma palavra de consolo seria mais gentil, como 「どんまい！」.' })],
              [L('わらうなよ〜（笑）', 'warau na yo~ (wara)', 'Não ri, pô! (risos)')])],
            h: ['まける (makeru) = perder · ざんねん (zannen) = que pena · どんまい (donmai) = não liga', 'Reaja com uma palavra só: entre amigos, isso é natural.'], ex: 'Ren contou que perdeu uma partida. Console o Ren ou pergunte mais.' }, { teach: ['makeru', 'zannen', 'donmai'] })
      ] },
    { id: 'ren-revanche', char: 'ren', init: true, title: 'A revanche', desc: 'O Ren volta a falar do jogo que ele tinha perdido.', need: [], after: 'ren:perdeu', set: ['ren:revanche'],
      nodes: [
        N('n1', [L('ねえねえ、きいて！ まえに まけた ゲーム、きょう かったよ！', 'nee nee, kiite! mae ni maketa geemu, kyou katta yo!', 'Ei, escuta! Sabe aquele jogo que eu perdi? Hoje eu ganhei!')],
          { b: [B([F('すごい！', 'sugoi!', 'Incrível!', 'c', ['chat:sugoi'], ['(chou |mecha )?sugoi( ne| jan)?']), F('おめでとう！', 'omedetou!', 'Parabéns!', 'c', ['chat:omedetou']),
            F('よかったね！', 'yokatta ne!', 'Que bom!', 'c', ['c5l4', 'c5l9'], ['yokatta( ne| na)?', 'yatta( ne)?']), F('おめでとうございます。', 'omedetou gozaimasu.', 'Parabéns. (polido)', 'p', ['chat:omedetou'])],
            [L('でしょ？ れんしゅう した かいが あった！', 'desho? renshuu shita kai ga atta!', 'Né? Valeu a pena treinar!')], { tag: 'parabens' })],
            h: ['すごい (sugoi) = incrível · おめでとう (omedetou) = parabéns · よかったね (yokatta ne) = que bom', 'Comemore com o Ren em uma ou duas palavras.'], ex: 'Ren está contando que ganhou a revanche. Comemore com ele!' }, { teach: ['sugoi', 'omedetou'] }),
        N('n2', [L('こんど いっしょに やろうよ！', 'kondo issho ni yarou yo!', 'Da próxima vez, joga comigo!')],
          { b: [AGREE({ r: [L('よっしゃ！ やくそく な！', 'yossha! yakusoku na!', 'Boa! Tá prometido!')] }),
            B([F('ゲームは ちょっと にがて…', 'geemu wa chotto nigate…', 'Não sou muito bom(boa) em games…', 'c', ['chat:nigate'], ['(geemu wa )?(chotto )?nigate( kamo| da)?']), ...DECLINE().f],
              [L('だいじょうぶ！ おれが おしえるから！', 'daijoubu! ore ga oshieru kara!', 'Tranquilo! Eu te ensino!')])],
            h: ['いっしょに (issho ni) = juntos · にがて (nigate) = não ser bom em', 'Para aceitar: 「うん、いいよ！」. Para recusar com jeitinho: 「ちょっと…」.'] }, { teach: ['nigate'] })
      ] },
    { id: 'ren-ima', char: 'ren', init: true, title: 'O que você está fazendo?', desc: 'Contar o que está fazendo e responder a um convite.', need: ['c5l10', 'c6l2'],
      nodes: [
        N('n1', [L('いま なに してる？', 'ima nani shiteru?', 'O que você tá fazendo agora?')],
          { b: [B([F('にほんごの べんきょう してる。', 'nihongo no benkyou shiteru.', 'Tô estudando japonês.', 'c', ['c6l1', 'chat:shiteru'], ['((nihongo|nihongo no|nihongo o) )?benkyou( shiteru| shite iru| shiteru yo| chuu)?( da yo)?']),
            F('にほんごを べんきょうして います。', 'nihongo o benkyou shite imasu.', 'Estou estudando japonês. (polido)', 'p', ['c6l1'], ['((nihongo|nihongo no|nihongo o) )?benkyou shite imasu'])], [L('えらい！ おれも がんばらなきゃ。', 'erai! ore mo ganbaranakya.', 'Mandou bem! Eu também preciso me esforçar.')], { tag: 'contou' }),
            B([F('アニメ みてる。', 'anime miteru.', 'Tô vendo anime.', 'c', ['c5l10', 'chat:shiteru'], ['(anime|eiga|terebi|doramu) (o )?mite(ru| iru)( yo)?']), F('アニメを みて います。', 'anime o mite imasu.', 'Estou vendo anime. (polido)', 'p', ['c5l10'], ['(anime|eiga|terebi) o mite imasu'])],
              [L('いいな〜！ あとで おすすめ おしえて！', 'ii na~! ato de osusume oshiete!', 'Que inveja! Depois me indica alguma coisa!')], { tag: 'contou' }),
            B([F('ゲーム してる。', 'geemu shiteru.', 'Tô jogando.', 'c', ['chat:shiteru'], ['(geemu|gemu) (o )?(shite|yatte)(ru| iru)( yo)?'])], [L('おっ、なかま！ なんの ゲーム？ …まあ いいや、あとで きく！', 'o, nakama! nan no geemu? …maa ii ya, ato de kiku!', 'Opa, somos dois! Que jogo? …Depois você me conta!')], { tag: 'contou' }),
            B([F('ごはん たべてる。', 'gohan tabeteru.', 'Tô comendo.', 'c', ['c4l2', 'chat:shiteru'], ['{food} (o )?tabete(ru| iru)( yo)?', 'gohan( chuu)?'])], [L('いいな〜、おなか すいてきた。', 'ii na~, onaka suite kita.', 'Que inveja, fiquei com fome.')], { tag: 'contou' }),
            B([F('なにも してない。', 'nani mo shitenai.', 'Não tô fazendo nada.', 'c', ['c8l2', 'chat:shiteru'], ['nani mo (shitenai|shite nai|shite inai)( yo)?', 'betsu ni( nani mo)?', 'hima( da yo| da)?'])], [L('ひまなんだ！ ちょうど よかった。', 'hima nan da! choudo yokatta.', 'Tá à toa? Que ótimo!')], { tag: 'contou' })],
            h: ['べんきょう (benkyou) = estudo · みてる (miteru) = estou vendo · してる (shiteru) = estou fazendo', 'Casual: (coisa) + してる / みてる. 〜てる é a forma curta de 〜ている.'], ex: 'Ren quer saber o que você está fazendo neste momento.' }, { teach: ['shiteru'] }),
        N('n2', [L('ねえ、あとで いっしょに ゲーム しない？', 'nee, ato de issho ni geemu shinai?', 'Ei, bora jogar junto mais tarde?')],
          { b: [AGREE({ r: [L('やった！ じゃあ はちじに オンラインで！', 'yatta! jaa hachiji ni onrain de!', 'Oba! Então às oito, online!')], tag: 'aceitou' }),
            DECLINE({ r: [L('そっか、また こんどね！', 'sokka, mata kondo ne!', 'Beleza, fica pra próxima!')], tag: 'recusou' })],
            h: ['いっしょに (issho ni) = juntos · ちょっと… (chotto…) = “não dá” (recusa suave)', 'Convite com 〜ない？ (“não quer…?”). Aceitar: 「うん、しよう！」. Recusar: 「ごめん、きょうは ちょっと…」.'],
            ex: 'Ren está te convidando para jogar mais tarde. Aceite ou recuse com jeitinho.' })
      ] },
    { id: 'ren-anime', char: 'ren', init: true, title: 'Viu algum anime?', desc: 'Conversar sobre animes que você viu.', need: ['c8l3'],
      nodes: [
        N('n1', [L('ねえ、さいきん アニメ みた？', 'nee, saikin anime mita?', 'Ei, viu algum anime ultimamente?')],
          { b: [B([F('うん、みた！', 'un, mita!', 'Sim, vi!', 'c', ['c8l3'], ['(un )?mita( yo)?']), F('はい、みました。', 'hai, mimashita.', 'Sim, vi. (polido)', 'p', ['c5l5'], ['hai( mimashita)?'])], [L('おっ、なに みたの？', 'o, nani mita no?', 'Opa, o que você viu?')], { next: 'sim' }),
            B([F('ううん、みてない。', 'uun, mitenai.', 'Não, não vi.', 'c', ['c8l3', 'c8l4'], ['(uun|iya)( mitenai| mite nai| minakatta)?', '(mada )?mite(nai| nai| inai)']), F('いいえ、みていません。', 'iie, mite imasen.', 'Não vi. (polido)', 'p', ['c5l10'], ['iie( mite imasen| mimasen deshita)?'])],
              [L('じゃあ「ほしの ゆうしゃ」 みて！ マジで おもしろいよ。', 'jaa "hoshi no yuusha" mite! maji de omoshiroi yo.', 'Então assiste “Hoshi no Yuusha”! É muito bom, sério.')], { next: 'nao' })],
            h: ['みた (mita) = vi · みてない (mitenai) = não vi', 'Responda sim ou não no passado casual: 「うん、みた！」 ou 「ううん、みてない」.'], ex: 'Ren perguntou se você assistiu algum anime recentemente.' }),
        N('sim', [], { b: [B([F('「ほしの ゆうしゃ」を みた。', '"hoshi no yuusha" o mita.', 'Vi “Hoshi no Yuusha”.', 'c', ['c8l3'], ['hoshi no yuusha( o mita| da yo| mita)?']),
          F('（タイトル）を みた。', '(título) o mita.', 'Vi (título).', 'c', ['c8l3'], ['* (o )?mita( yo)?', '*( da yo| desu)'], { wild: true })], [L('{*}！ いいね。おもしろかった？', '{*}! ii ne. omoshirokatta?', '{*}! Legal. Foi bom?')])],
          h: ['(título) を みた = vi (título)', 'Basta dizer o nome do anime + を みた.'], ex: 'Ren quer saber qual anime você viu.' }, { next: 'gostou' }),
        N('gostou', [], { b: [B([F('うん、すごく おもしろかった！', 'un, sugoku omoshirokatta!', 'Sim, foi muito bom!', 'c', ['c5l4'], ['(un )?(sugoku |totemo |chou |mecha )?omoshirokatta( yo)?', '(un )?yokatta( yo)?', 'saikou( datta)?']),
          F('まあまあ だった。', 'maa maa datta.', 'Foi mais ou menos.', 'c', ['chat:maamaa'], ['maa maa( datta| kana)?']),
          F('あんまり…', 'anmari…', 'Não muito…', 'c', ['c5l4'], ['(an|a)mari( omoshirokunakatta)?', 'tsumaranakatta'])], [L('そっか！ こんど いっしょに みよう！', 'sokka! kondo issho ni miyou!', 'Saquei! Da próxima vamos assistir juntos!')])],
          h: ['おもしろかった (omoshirokatta) = foi legal · まあまあ = mais ou menos', 'Passado de adjetivo い: おもしろい → おもしろかった.'] }, { next: 'end' }),
        N('nao', [], { b: [B([F('うん、みる！', 'un, miru!', 'Tá, vou ver!', 'c', ['c8l1'], ['(un )?(miru|mite miru|mitai)( yo| ne)?', 'ii ne', 'ok']), F('みて みます。', 'mite mimasu.', 'Vou assistir. (polido)', 'p', ['c5l10'])],
          [L('ぜったい ハマるよ！', 'zettai hamaru yo!', 'Você vai viciar, certeza!')]),
          B([F('アニメは あまり みない。', 'anime wa amari minai.', 'Não vejo muito anime.', 'c', ['c8l2'], ['(anime wa )?(an|a)mari minai', 'kyoumi nai'])], [L('そっか。じゃあ ゲームの ほうが すき？（笑）', 'sokka. jaa geemu no hou ga suki? (wara)', 'Entendi. Então você prefere games? (risos)')])],
          h: ['みる (miru) = ver, assistir', 'Aceite a dica: 「うん、みる！」.'] }, { next: 'end' })
      ] },
    { id: 'ren-densha', char: 'ren', init: true, title: 'Dormi no trem!', desc: 'Ren conta uma situação engraçada.', need: ['c8l4'],
      nodes: [
        N('n1', [L('きいて〜！ けさ でんしゃで ねちゃって、えきを すぎちゃった！', 'kiite~! kesa densha de nechatte, eki o sugichatta!', 'Escuta só! Hoje cedo dormi no trem e passei da estação!')],
          { b: [B([F('マジで？', 'maji de?', 'Sério?', 'c', ['chat:maji'], ['maji( de)?( ka)?']), F('ほんとう？', 'hontou?', 'É mesmo?', 'c', ['chat:hontou'], ['honto(u)?( ni)?']),
            F('（笑）', 'www', '(risos)', 'c', [], [], { re: LAUGH }), F('たいへんだったね。', 'taihen datta ne.', 'Que sufoco!', 'c', ['chat:taihen'], ['taihen( datta| da)?( ne| na)?']),
            F('だいじょうぶ？', 'daijoubu?', 'Você tá bem?', 'c', ['c1l4'])], [L('マジで。ちこく しちゃった…（笑）', 'maji de. chikoku shichatta… (wara)', 'Sério. Cheguei atrasado… (risos)')], { tag: 'reagiu' })],
            h: ['マジで？ (maji de?) = sério? · ほんとう？ (hontou?) = é mesmo? · たいへん (taihen) = sufoco', 'Uma reação curta já é uma ótima resposta entre amigos.'], ex: 'Ren contou que dormiu no trem e passou da estação. Reaja!' }, { teach: ['maji', 'hontou', 'taihen'] }),
        N('n2', [L('{name}は でんしゃで ねちゃう こと ある？', '{name} wa densha de nechau koto aru?', 'E você, já dormiu no trem?')],
          { b: [B([F('あるある！', 'aru aru!', 'Acontece muito!', 'c', ['chat:aruaru'], ['aru aru( da yo)?', '(un )?aru( yo)?', '(un )?yoku aru( yo)?']), F('はい、あります。', 'hai, arimasu.', 'Sim, já. (polido)', 'p', ['c5l7'])],
            [L('だよね〜！ でんしゃって ねむく なるよね。', 'da yo ne~! densha tte nemuku naru yo ne.', 'Né? Trem dá sono!')]),
            B([F('ない！', 'nai!', 'Nunca!', 'c', ['c8l2'], ['(uun )?nai( yo| na)?', '(uun )?zenzen nai( yo)?', 'densha ni noranai']), F('いいえ、ありません。', 'iie, arimasen.', 'Não. (polido)', 'p', ['c5l7'])],
              [L('えらい！ おれも きを つける…', 'erai! ore mo ki o tsukeru…', 'Mandou bem! Vou tomar cuidado…')])],
            h: ['ある (aru) = acontecer, existir · ない (nai) = não', 'Responda sim (ある) ou não (ない). あるある！ = “clássico!”.'] }, { teach: ['aruaru'] })
      ] },
    { id: 'ren-taberu', char: 'ren', init: true, title: 'Bateu a fome', desc: 'Dizer o que você quer comer.', need: ['c6l3', 'c4l2'],
      nodes: [
        N('n1', [L('おなか すいた〜。{name}は なに たべたい？', 'onaka suita~. {name} wa nani tabetai?', 'Tô com fome… O que você quer comer?')],
          { b: [B([F('ラーメンが たべたい！', 'raamen ga tabetai!', 'Quero lámen!', 'c', ['c6l3'], []),
            F('（たべもの）が たべたい！', '(comida) ga tabetai!', 'Quero (comida)!', 'c', ['c6l3'], ['{food} (ga |o )?tabetai( na| yo| kana)?', '{food}( ga ii| kana| ga ii na| ga ii yo)?'], { wild: true }),
            F('ラーメンが たべたいです。', 'raamen ga tabetai desu.', 'Quero comer lámen. (polido)', 'p', ['c6l3'], ['{food} (ga |o )?tabetai desu'])],
            [L('{food}！ いいね〜！ じゃあ いっしょに いこう！', '{food}! ii ne~! jaa issho ni ikou!', '{food}! Boa! Então vamos juntos!')], { keep: { from: 'food', as: 'comida' }, tag: 'pediu', dyn: 'raamenDefault' })],
            h: ['たべたい (tabetai) = quero comer · ラーメン, すし, パン, おにぎり', 'Estrutura: (comida) が たべたい. Também se diz を たべたい.'], ex: 'Ren está com fome e quer saber o que você quer comer.' }, { teach: ['onakasuita'] })
      ] },
    { id: 'ren-mizu', char: 'ren', init: false, title: 'Na casa do Ren', desc: 'Pedir algo para beber e ver como a relação muda a frase.', need: ['c6l4'],
      nodes: [
        N('n1', [L('なんか のむ？ みずと おちゃと ジュースが あるよ。', 'nanka nomu? mizu to ocha to juusu ga aru yo.', 'Quer beber algo? Tem água, chá e suco.')],
          { b: [B([F('みず ちょうだい。', 'mizu choudai.', 'Me dá água.', 'c', ['chat:choudai'], ['{drink} (o )?choudai']),
            F('みず くれる？', 'mizu kureru?', 'Pode me dar água?', 'c', ['chat:kureru'], ['{drink} (o )?(kureru|moraeru)( kana)?', '{drink} (ga )?ii( na| kana)?', '{drink}( de)? onegai']),
            F('おみずを ください。', 'omizu o kudasai.', 'Água, por favor. (educado)', 'p', ['c6l4'], ['{drink} (o )?kudasai']),
            F('おみずを おねがいします。', 'omizu o onegaishimasu.', 'Água, por favor. (atendimento)', 'p', ['c6l4'], ['{drink} (o )?onegai shimasu', '{drink} (o )?onegaishimasu'])],
            [L('はい、どうぞ！', 'hai, douzo!', 'Aqui, toma!')], { tag: 'pediu' })],
            h: ['ちょうだい (choudai) = me dá (íntimo) · くれる？ (kureru?) = pode me dar?', 'Na casa de um amigo, pedidos casuais são os naturais. 「ください」 é educado, mas soa formal com o Ren.'],
            ex: 'Ren ofereceu algo para beber. Peça água, chá ou suco.' }, { teach: ['choudai', 'kureru'] }),
        N('n2', [L('ちなみに、おれには「ちょうだい」で いいからね。おみせでは ちがうけど（笑）', 'chinami ni, ore ni wa "choudai" de ii kara ne. omise de wa chigau kedo (wara)', 'Aliás, comigo pode usar 「ちょうだい」. Numa loja é diferente (risos).')], null, { card: 'agua' })
      ] },
    { id: 'ren-shumatsu', char: 'ren', init: true, title: 'Fim de semana', desc: 'Responder a um convite para o sábado.', need: ['c6l2', 'c4l8', 'c8l2'],
      nodes: [
        N('n1', [L('こんどの どようび、ひま？', 'kondo no doyoubi, hima?', 'Tá livre neste sábado?')],
          { b: [B([F('うん、ひまだよ。', 'un, hima da yo.', 'Tô, sim.', 'c', ['c6l2'], ['(un )?hima( da yo| da| yo)?']), F('はい、ひまです。', 'hai, hima desu.', 'Sim, estou livre. (polido)', 'p', ['c6l2'])], [L('じゃあ ゲームセンター いかない？', 'jaa geemu sentaa ikanai?', 'Então, bora no fliperama?')], { next: 'convite' }),
            B([F('どようびは ちょっと…', 'doyoubi wa chotto…', 'Sábado não dá…', 'c', ['c6l2'], ['(gomen )?(doyoubi wa )?(chotto|isogashii|muri)']), F('にちようびなら いいよ。', 'nichiyoubi nara ii yo.', 'Se for domingo, pode ser.', 'c', ['chat:nara'], ['nichiyoubi nara( ii yo| daijoubu)?'])],
              [L('そっか。じゃあ、また あそぼう！', 'sokka. jaa, mata asobou!', 'Beleza. A gente sai outro dia!')], { next: 'end' })],
            h: ['ひま (hima) = livre, à toa · どようび = sábado · 〜なら = se for…', 'Responda se está livre: 「うん、ひまだよ」 ou recuse com 「ちょっと…」.'], ex: 'Ren quer saber se você está livre no sábado.' }, { teach: ['nara'] }),
        N('convite', [], { b: [AGREE({ r: [L('よし！ じゃあ じゅうじに えきで！', 'yoshi! jaa juuji ni eki de!', 'Fechado! Então às dez na estação!')], tag: 'aceitou' }),
          DECLINE({ r: [L('そっか、ざんねん。また こんど！', 'sokka, zannen. mata kondo!', 'Ah, que pena. Fica pra próxima!')] })],
          h: ['いかない？ (ikanai?) = não quer ir?', 'Convite casual com 〜ない？. Aceitar: 「いいね、いこう！」.'] }, { next: 'end' })
      ] },
    { id: 'ren-eiga', char: 'ren', init: true, title: 'O filme do herói', desc: 'Fala natural: って, んだ e reações (intermediário).', need: ['c21l1', 'c21l2'], tier: 2,
      nodes: [
        N('n1', [L('ねえ、「ほしの ゆうしゃ」の 映画版って 知ってる？', 'nee, "hoshi no yuusha" no eigaban tte shitteru?', 'Ei, sabe o filme de “Hoshi no Yuusha”?')],
          { b: [B([F('知ってる！', 'shitteru!', 'Sei!', 'c', ['c21l2'], ['(un )?shitte(ru| iru)( yo)?', '(un )?kiita koto aru( yo)?']), F('知らない。どんな 話？', 'shiranai. donna hanashi?', 'Não sei. Qual é a história?', 'c', ['c21l2', 'chat:donna'], ['(uun )?shiranai( donna hanashi( na no)?)?', 'donna hanashi( na no)?'])],
            [L('めっちゃ 泣けるらしいんだよ。主人公が 最後に 仲間を 助けるんだって。', 'meccha nakeru rashii n da yo. shujinkou ga saigo ni nakama o tasukeru n da tte.', 'Dizem que faz chorar muito. Parece que no final o protagonista salva os amigos.')])],
            h: ['知ってる (shitteru) = sei, conheço · 知らない (shiranai) = não sei', 'Responda casual: 「知ってる！」 ou 「知らない」.'] }),
        N('n2', [L('今度 一緒に 見に行かない？', 'kondo issho ni mi ni ikanai?', 'Bora ver junto qualquer dia?')],
          { b: [AGREE({ r: [L('決まり！ チケット 取っとくね。', 'kimari! chiketto tottoku ne.', 'Fechado! Vou garantir os ingressos.')] }),
            B([F('泣いちゃうかも…', 'naichau kamo…', 'Acho que vou chorar…', 'c', ['c8l4', 'c16l2'], ['naichau kamo( shirenai)?', 'naku kamo'])], [L('（笑）ハンカチ 持って いこう！', '(wara) hankachi motte ikou!', '(risos) Vamos levar lenço!')]), DECLINE({ r: [L('そっか、じゃあ 配信 待とう！', 'sokka, jaa haishin matou!', 'Beleza, então vamos esperar sair no streaming!')] })] })
      ] },

    /* ---------------- AIKO-SENSEI ---------------- */
    { id: 'aiko-hajime', char: 'aiko', intro: true, title: 'Conhecendo a Aiko-sensei', need: [], set: ['aiko:met'],
      nodes: [
        N('n1', [L('はじめまして。にほんごを おしえて いる、あいこです。', 'hajimemashite. nihongo o oshiete iru, Aiko desu.', 'Muito prazer. Sou a Aiko, professora de japonês.'), L('よろしく おねがいします。', 'yoroshiku onegaishimasu.', 'Conto com você.')],
          { b: [B([F('はじめまして。{name}です。よろしく おねがいします。', 'hajimemashite. {name} desu. yoroshiku onegaishimasu.', 'Muito prazer. Sou {name}. Conto com a senhora.', 'p', ['c1l3', 'c5l1'], ['(hajimemashite )?(watashi wa )?{name} desu( yoroshiku onegai( shimasu| itashimasu)?)?']),
            F('はじめまして。（なまえ）です。', 'hajimemashite. (nome) desu.', 'Muito prazer. Sou (nome).', 'p', ['c1l3', 'c5l1'], ['(hajimemashite )?(watashi wa )?* desu( yoroshiku onegai( shimasu| itashimasu)?)?'], { wild: true }),
            F('よろしく おねがいします。', 'yoroshiku onegaishimasu.', 'Conto com a senhora.', 'p', ['c1l3'], ['(hajimemashite )?(kochira koso )?yoroshiku onegai( shimasu| itashimasu)', 'hajimemashite']),
            F('よろしく！', 'yoroshiku!', 'Prazer! (casual)', 'c', ['c1l3'], ['(hajimemashite )?yoroshiku( ne)?', '(hajimemashite )?(watashi wa )?* da( yo)?( yoroshiku)?'])],
            [L('{name}さんですね。こちらこそ、よろしく おねがいします。', '{name}-san desu ne. kochira koso, yoroshiku onegaishimasu.', '{name}, certo? Eu é que conto com você.')], { tag: 'apresentou' })],
            h: ['はじめまして = muito prazer · （なまえ）です = sou (nome) · よろしく おねがいします = conto com você', 'Com uma professora, use a forma completa e educada, com です.'], ex: 'A professora se apresentou. Apresente-se de forma educada.' }),
        N('n2', [L('{name}さんは ブラジルじん ですか。', '{name}-san wa burajirujin desu ka.', 'Você é brasileiro(a)?')],
          { b: [B([F('はい、ブラジルじんです。', 'hai, burajirujin desu.', 'Sim, sou brasileiro(a).', 'p', ['c4l1', 'c5l1'], ['hai( (sou desu|burajirujin desu))?', '(watashi wa )?burajirujin desu', 'sou desu']),
            F('うん、ブラジルじん。', 'un, burajirujin.', 'Sim, brasileiro(a). (casual)', 'c', ['c4l1'], ['un( burajirujin( da( yo)?)?)?', 'burajirujin( da( yo)?)?'])], [L('そうですか。わたしは ブラジルの おんがくが だいすきです。', 'sou desu ka. watashi wa burajiru no ongaku ga daisuki desu.', 'É mesmo? Eu adoro música brasileira.')]),
            B([F('いいえ、ブラジルじんじゃ ありません。', 'iie, burajirujin ja arimasen.', 'Não, não sou brasileiro(a).', 'p', ['c5l4'], ['iie( burajirujin (ja|dewa) (arimasen|nai desu))?( * jin desu)?', 'iie * jin desu'])], [L('そうなんですね。おしえて くれて ありがとう。', 'sou nan desu ne. oshiete kurete arigatou.', 'Ah, entendi. Obrigada por me contar.')])],
            near: [{ p: ['(hai )?(watashi wa )?burajirujin ?san desu', '(watashi wa )?(*)san desu'], kind: 'grammar', why: 'Não se usa さん em si mesmo: さん é um sinal de respeito pelo outro. Diga apenas 「ブラジルじんです」.', fix: '0.0' }],
            h: ['ブラジルじん (burajirujin) = brasileiro(a) · はい / いいえ = sim / não', 'Responda com はい ou いいえ e termine com です.'], ex: 'A professora quer saber se você é brasileiro(a).' }),
        N('n3', [L('にほんでは、じぶんの なまえに「さん」を つけません。おぼえて おいて くださいね。', 'nihon de wa, jibun no namae ni "san" o tsukemasen. oboete oite kudasai ne.', 'No Japão, não se põe さん no próprio nome. Guarde isso, tá?')], null, { card: 'san' })
      ] },
    { id: 'aiko-review', char: 'aiko', init: true, title: 'Revisão rápida', desc: 'A professora pergunta palavras que você está aprendendo (usa a sua revisão real).', need: [],
      build: () => chBuildReview('mix') },
    { id: 'aiko-recente', char: 'aiko', init: true, title: 'Pergunta da última lição', desc: 'Perguntas sobre a lição que você estudou por último.', need: [],
      build: () => chBuildReview('recent') },
    { id: 'aiko-itadakimasu', char: 'aiko', init: true, title: 'Antes e depois de comer', desc: 'Uma curiosidade cultural sobre as refeições.', need: ['c1l4'],
      nodes: [
        N('n1', [L('にほんでは、たべる まえに「いただきます」と いいます。', 'nihon de wa, taberu mae ni "itadakimasu" to iimasu.', 'No Japão, antes de comer se diz “itadakimasu”.'), L('では、たべた あとは なんと いいますか。', 'dewa, tabeta ato wa nan to iimasu ka.', 'E depois de comer, o que se diz?')],
          { b: [B([F('ごちそうさまでした。', 'gochisousama deshita.', 'Obrigado(a) pela refeição.', 'p', ['c1l4'], ['gochisou( sama)?( deshita| desu)']), F('ごちそうさま。', 'gochisousama.', 'Obrigado(a) pela refeição. (casual)', 'c', ['c1l4'], ['gochisou( sama)?'])],
            [L('そうです！「ごちそうさまでした」は、つくった ひとへの「ありがとう」の きもちです。', 'sou desu! "gochisousama deshita" wa, tsukutta hito e no "arigatou" no kimochi desu.', 'Isso! “Gochisousama deshita” é um “obrigado” para quem preparou a comida.')], { tag: 'acertou' })],
            near: [{ p: ['itadakimasu', 'itadaki'], kind: 'vocab', why: 'いただきます é dito ANTES de comer. A pergunta é sobre DEPOIS de comer.', fix: '0.0' }],
            h: ['ごちそう (gochisou) = banquete, refeição caprichada', 'Use o passado educado: 〜でした.'], ex: 'A professora quer a expressão usada DEPOIS da refeição.' }),
        N('n2', [L('ブラジルにも にた ことばが ありますか。', 'burajiru ni mo nita kotoba ga arimasu ka.', 'No Brasil também existe uma expressão parecida?')],
          { b: [B([F('はい、あります。', 'hai, arimasu.', 'Sim, existe.', 'p', ['c5l7'], ['hai( arimasu)?', 'arimasu( yo)?', 'bom apetite']), F('うん、ある。', 'un, aru.', 'Sim, tem. (casual)', 'c', ['c8l1'], ['un( aru( yo)?)?', 'aru( yo)?'])], [L('おもしろいですね。こんど おしえて ください。', 'omoshiroi desu ne. kondo oshiete kudasai.', 'Que interessante. Me ensine outro dia.')]),
            B([F('いいえ、ありません。', 'iie, arimasen.', 'Não, não existe.', 'p', ['c5l7'], ['iie( arimasen)?', 'arimasen']), F('ううん、ない。', 'uun, nai.', 'Não. (casual)', 'c', ['c8l2'], ['uun( nai)?', 'nai'])], [L('そうですか。ぶんかの ちがいは おもしろいですね。', 'sou desu ka. bunka no chigai wa omoshiroi desu ne.', 'Entendi. As diferenças culturais são interessantes.')])],
            h: ['あります (arimasu) = existe, tem · ありません = não existe', 'Responda はい、あります ou いいえ、ありません.'] })
      ] },
    { id: 'aiko-mouichido', char: 'aiko', init: true, title: 'Aviso da aula', desc: 'Entender um aviso falado e pedir para repetir (ótimo no modo Ouvir primeiro).', need: ['c1l4'],
      nodes: [
        N('n1', [L('きょうの しゅくだいは ふたつです。らいしゅうの げつようびまでに だして ください。', 'kyou no shukudai wa futatsu desu. raishuu no getsuyoubi made ni dashite kudasai.', 'A lição de casa de hoje são duas. Entreguem até a segunda-feira da semana que vem.'), L('わかりましたか。', 'wakarimashita ka.', 'Entenderam?')],
          { b: [B([F('もう いちど おねがいします。', 'mou ichido onegaishimasu.', 'Mais uma vez, por favor.', 'p', ['c1l4'], ['(sumimasen )?mou ichido( onegai( shimasu)?| itte kudasai)?']),
            F('わかりません。', 'wakarimasen.', 'Não entendi.', 'p', ['c1l4'], ['(sumimasen )?wakarimasen( deshita)?']),
            F('ゆっくり おねがいします。', 'yukkuri onegaishimasu.', 'Mais devagar, por favor.', 'p', ['c14l7'], ['(sumimasen )?(motto )?yukkuri( onegai( shimasu)?| itte kudasai| hanashite kudasai)'])],
            [L('はい。もう いちど、ゆっくり いいますね。', 'hai. mou ichido, yukkuri iimasu ne.', 'Claro. Vou repetir devagar.'), L('きょうの しゅくだいは ふたつです。らいしゅうの げつようびまでに だして ください。', 'kyou no shukudai wa futatsu desu. raishuu no getsuyoubi made ni dashite kudasai.', 'A lição de casa de hoje são duas. Entreguem até a segunda-feira da semana que vem.', { slow: true })], { tag: 'pediu' }),
            B([F('はい、わかりました。', 'hai, wakarimashita.', 'Sim, entendi.', 'p', ['c1l4'], ['(hai )?wakarimashita'])], [L('では、かくにん しましょう。', 'dewa, kakunin shimashou.', 'Então vamos conferir.')])],
            near: [{ p: ['(un )?wakatta', 'wakannai', 'wakaranai'], kind: 'social', why: 'わかった / わかんない são casuais. Com a professora, use わかりました ou わかりません.', fix: '1.0' }],
            h: ['もう いちど (mou ichido) = mais uma vez · わかりません = não entendi · わかりました = entendi', 'Se não entendeu, pedir para repetir é a melhor resposta. Na sala de aula, use です/ます.'],
            ex: 'A professora deu um aviso sobre a lição de casa e perguntou se você entendeu.' }, { teach: ['shimekiri'] }),
        N('n2', [L('しゅくだいは いくつ ありますか。', 'shukudai wa ikutsu arimasu ka.', 'Quantas lições de casa são?')],
          { b: [B([F('ふたつです。', 'futatsu desu.', 'São duas.', 'p', ['c4l7'], ['futatsu( desu| arimasu)?', 'ni( tsu)?( desu)?', 'ni ko( desu)?']), F('ふたつ。', 'futatsu.', 'Duas. (casual)', 'c', ['c4l7'], ['futatsu( da yo)?'])],
            [L('せいかい！ しめきりは らいしゅうの げつようびです。', 'seikai! shimekiri wa raishuu no getsuyoubi desu.', 'Certo! O prazo é segunda-feira da semana que vem.')], { tag: 'entendeu' })],
            near: [{ p: ['(hitotsu|mittsu|yottsu|ichi|san|yon)( desu)?'], kind: 'vocab', why: 'Ouça de novo: ふたつ (futatsu) = dois/duas. ひとつ = um, みっつ = três.', fix: '0.0' }],
            h: ['ひとつ, ふたつ, みっつ = um, dois, três (coisas)', 'Responda só o número + です.'], ex: 'Ela quer saber se você entendeu quantas lições são.' })
      ] },
    { id: 'aiko-jikan', char: 'aiko', init: false, title: 'Que horas são?', desc: 'Dizer a hora e o dia de hoje (usa o relógio do seu aparelho).', need: ['c4l9', 'c4l8'],
      build: () => chBuildTime() },
    { id: 'aiko-teinei', char: 'aiko', init: true, title: 'Casual ou educado?', desc: 'Transformar perguntas casuais em educadas.', need: ['c9l3'],
      nodes: [
        N('n1', [L('ともだちには「たべる？」と ききますね。', 'tomodachi ni wa "taberu?" to kikimasu ne.', 'Para um amigo, perguntamos “taberu?” (vai comer?).'), L('せんせいには なんと ききますか。', 'sensei ni wa nan to kikimasu ka.', 'E para um professor, como se pergunta?')],
          { b: [B([F('たべますか。', 'tabemasu ka.', 'Vai comer? (polido)', 'p', ['c9l3'], ['tabemasu ka']), F('めしあがりますか。', 'meshiagarimasu ka.', 'O senhor vai comer? (respeitoso)', 'k', ['c9l3'], ['meshiagarimasu ka', 'meshiagaru'])],
            [L('はい、そうです。「めしあがりますか」は もっと ていねいです。', 'hai, sou desu. "meshiagarimasu ka" wa motto teinei desu.', 'Isso. “Meshiagarimasu ka” é ainda mais respeitoso.')], { tag: 'ok1' })],
            near: [{ p: ['taberu( ka| no)?'], kind: 'social', why: 'たべる？ é a forma casual, que a pergunta já deu. Para o professor, use a forma ます: たべますか.', fix: '0.0' }, { p: ['itadakimasu( ka)?'], kind: 'social', why: 'いただきます é humilde: serve para VOCÊ. Para a ação do professor, use たべますか ou めしあがりますか.', fix: '0.1' }],
            h: ['たべます (tabemasu) = forma ます de たべる · めしあがる = comer (respeitoso)', 'Troque a forma de dicionário pela forma ます + か.'], ex: 'Transforme “taberu?” em uma pergunta educada.' }, { teach: ['meshiagaru'] }),
        N('n2', [L('では、「いく？」は？', 'dewa, "iku?" wa?', 'E “iku?” (vai?)?')],
          { b: [B([F('いきますか。', 'ikimasu ka.', 'Vai? (polido)', 'p', ['c9l3'], ['ikimasu ka']), F('いらっしゃいますか。', 'irasshaimasu ka.', 'O senhor vai? (respeitoso)', 'k', ['c9l3'], ['irasshaimasu ka'])],
            [L('よく できました！ あいてに よって ことばを かえる、それが けいごの はじまりです。', 'yoku dekimashita! aite ni yotte kotoba o kaeru, sore ga keigo no hajimari desu.', 'Muito bem! Mudar as palavras conforme a pessoa: esse é o começo do keigo.')], { tag: 'ok2' })],
            near: [{ p: ['iku( ka| no)?'], kind: 'social', why: 'いく？ é casual. A forma educada é いきますか.', fix: '0.0' }],
            h: ['いく → いきます', 'Mesma regra: forma ます + か.'] })
      ] },
    { id: 'aiko-keigo', char: 'aiko', init: true, title: 'Keigo na prática', desc: 'Respeitoso × humilde (intermediário).', need: ['c20l1', 'c20l3'], tier: 2,
      nodes: [
        N('n1', [L('お客様に「何を食べますか」と聞きたいです。尊敬語で どう 言いますか。', 'okyakusama ni "nani o tabemasu ka" to kikitai desu. sonkeigo de dou iimasu ka.', 'Quero perguntar ao cliente “o que vai comer?”. Como fica no respeitoso (sonkeigo)?')],
          { b: [B([F('何を召し上がりますか。', 'nani o meshiagarimasu ka.', 'O que o senhor vai comer?', 'k', ['c20l1'], ['nani o meshiagarimasu ka', 'nani ni nasaimasu ka'])], [L('完璧です。', 'kanpeki desu.', 'Perfeito.')], { tag: 'ok1' })],
            near: [{ p: ['nani o itadakimasu ka', 'nani o itadaku'], kind: 'social', why: 'いただく é humilde (けんじょうご): rebaixa quem faz a ação. Usar com o cliente o rebaixa. Para ele, use 召し上がる.', fix: '0.0' }],
            h: ['召し上がる (meshiagaru) = comer (respeitoso)', 'Ação do cliente → verbo respeitoso.'], ex: 'Pergunta ao cliente o que ele vai comer, com respeito.' }, { teach: ['meshiagaru', 'itadaku'] }),
        N('n2', [L('では、「先生は どこに いますか」を 尊敬語で？', 'dewa, "sensei wa doko ni imasu ka" o sonkeigo de?', 'E “onde o professor está?” no respeitoso?')],
          { b: [B([F('先生は どちらに いらっしゃいますか。', 'sensei wa dochira ni irasshaimasu ka.', 'Onde o professor se encontra?', 'k', ['c20l1'], ['(sensei wa )?(dochira|doko) ni irasshaimasu ka'])], [L('すばらしい！「どちら」も 丁寧ですね。', 'subarashii! "dochira" mo teinei desu ne.', 'Excelente! “Dochira” também é mais educado.')], { tag: 'ok2' })],
            near: [{ p: ['(sensei wa )?(dochira|doko) ni orimasu ka'], kind: 'social', why: 'おる (おります) é humilde: serve para você ou para a sua empresa. Para o professor, use いらっしゃる.', fix: '0.0' }],
            h: ['いらっしゃる = estar, ir, vir (respeitoso)', 'いる → いらっしゃる.'] }, { card: 'keigo' })
      ] },
    { id: 'aiko-checkin', char: 'aiko', init: true, title: 'Como vão os estudos?', desc: 'A professora comenta seus pontos fortes e fracos com base no seu progresso real.', need: ['c5l9'],
      nodes: [
        N('n1', [L('{name}さん、さいきん べんきょうは どうですか。', '{name}-san, saikin benkyou wa dou desu ka.', '{name}, como vão os estudos ultimamente?')],
          { b: [B([F('たのしいです。', 'tanoshii desu.', 'Estão divertidos.', 'p', ['c4l6', 'c5l1'], ['(totemo |sugoku )?tanoshii desu( yo)?']), F('たのしい！', 'tanoshii!', 'Divertidos! (casual)', 'c', ['c4l6'], ['(totemo |sugoku )?tanoshii( yo)?'])],
            [L('それは よかったです！', 'sore wa yokatta desu!', 'Que bom!')], { next: 'dica' }),
            B([F('ちょっと むずかしいです。', 'chotto muzukashii desu.', 'Um pouco difíceis.', 'p', ['c4l6', 'c5l1'], ['(chotto |sukoshi |totemo )?muzukashii desu( kedo tanoshii desu)?', 'muzukashii kedo tanoshii desu']),
              F('むずかしい…', 'muzukashii…', 'Difícil… (casual)', 'c', ['c4l6'], ['(chotto |sukoshi )?muzukashii( kedo tanoshii)?'])], [L('だいじょうぶですよ。すこしずつ いきましょう。', 'daijoubu desu yo. sukoshizutsu ikimashou.', 'Tudo bem. Vamos aos pouquinhos.')], { next: 'dica' })],
            h: ['たのしい (tanoshii) = divertido · むずかしい (muzukashii) = difícil', 'Responda com um adjetivo + です.'], ex: 'A professora quer saber como estão os seus estudos.' }),
        N('dica', [{ dyn: 'aikoAdvice' }, L('いっしょに すこし ふくしゅう しませんか。', 'issho ni sukoshi fukushuu shimasen ka.', 'Vamos revisar um pouco juntos?')],
          { b: [B([F('はい、おねがいします。', 'hai, onegaishimasu.', 'Sim, por favor.', 'p', ['c1l3'], ['hai( onegai( shimasu)?)?', 'onegai( shimasu)?', 'zehi( onegai( shimasu)?)?', 'ii desu ne'])], [L('では、はじめましょう。', 'dewa, hajimemashou.', 'Então vamos começar.')], { chain: 'aiko-review' }),
            B([F('また こんど おねがいします。', 'mata kondo onegaishimasu.', 'Fica para a próxima, por favor.', 'p', ['c6l2'], ['mata kondo( onegai( shimasu)?)?', '(sumimasen )?(kyou wa )?chotto'])], [L('わかりました。いつでも どうぞ。', 'wakarimashita. itsu demo douzo.', 'Tudo bem. Quando quiser.')])],
            h: ['おねがいします = por favor (aceitar) · また こんど = outra hora', 'Aceite com 「はい、おねがいします」.'] })
      ] },

    /* ---------------- YUMI ---------------- */
    { id: 'yumi-hajime', char: 'yumi', intro: true, title: 'Conhecendo a Yumi', need: [], set: ['yumi:met'],
      nodes: [
        N('n1', [L('あの…はじめまして。ゆみです。おなじ クラスですよね？', 'ano… hajimemashite. Yumi desu. onaji kurasu desu yo ne?', 'Hã… muito prazer. Sou a Yumi. A gente é da mesma turma, né?')],
          { b: [B([F('はい、そうです。', 'hai, sou desu.', 'Sim, isso mesmo.', 'p', ['c5l9'], ['hai( sou desu( ne| yo)?)?( yoroshiku onegai( shimasu)?)?', 'sou desu( ne| yo)?']),
            F('はじめまして。{name}です。', 'hajimemashite. {name} desu.', 'Muito prazer. Sou {name}.', 'p', ['c1l3', 'c5l1'], ['hajimemashite( (watashi wa )?{name} desu)?( yoroshiku( onegai( shimasu)?)?)?']),
            F('はじめまして。（なまえ）です。', 'hajimemashite. (nome) desu.', 'Muito prazer. Sou (nome).', 'p', ['c1l3', 'c5l1'], ['hajimemashite (watashi wa )?* desu( yoroshiku( onegai( shimasu)?)?)?'], { wild: true }),
            F('うん、そう！', 'un, sou!', 'É, sim! (casual)', 'c', ['c8l5'], ['un( sou( da yo)?)?', 'sou da yo'])],
            [L('よかった！ わたし、まだ ともだちが すくなくて…', 'yokatta! watashi, mada tomodachi ga sukunakute…', 'Que bom! Eu ainda tenho poucos amigos aqui…')])],
            h: ['おなじ (onaji) = mesmo(a) · そうです (sou desu) = isso mesmo', 'Vocês acabaram de se conhecer: responda de forma educada, com です.'], ex: 'A Yumi perguntou se vocês são da mesma turma.' }),
        N('n2', [L('あの、タメ口で はなしても いい？', 'ano, tameguchi de hanashite mo ii?', 'Hã, posso falar com você de forma casual?')],
          { b: [B([F('うん、いいよ！', 'un, ii yo!', 'Claro, pode!', 'c', ['c6l5'], ['(un )?(ii yo|ii ne|mochiron|zehi)( ne)?', 'un', 'ii( yo)?']),
            F('はい、いいですよ。', 'hai, ii desu yo.', 'Sim, pode. (polido)', 'p', ['c6l5'], ['hai( ii desu( yo)?)?', '(mochiron )?ii desu( yo)?'], { odd: true, why: 'Ela acabou de pedir para vocês falarem de forma casual. Responder com です soa engraçado, como se você continuasse formal. 「うん、いいよ！」 combina mais.' })],
            [L('やった！ じゃあ これから よろしくね、{name}！', 'yatta! jaa kore kara yoroshiku ne, {name}!', 'Oba! Então, conto com você, {name}!')], { set: ['yumi:tame'], tag: 'tame' })],
            h: ['タメ口 (tameguchi) = fala casual entre iguais · いいよ = pode', 'Ela pediu para falar casual. Responda casual também.'], ex: 'A Yumi está perguntando se pode falar de forma casual (sem です/ます) com você.' }, { reg: 'c', teach: ['tameguchi'] })
      ] },
    { id: 'yumi-shumi', char: 'yumi', init: true, title: 'Qual é o seu hobby?', desc: 'Falar de hobbies e de karaokê.', need: ['c6l1'],
      nodes: [
        N('n1', [L('ねえ、{name}の しゅみって なに？', 'nee, {name} no shumi tte nani?', 'Ei, qual é o seu hobby?')],
          { b: [B([F('アニメを みることかな。', 'anime o miru koto kana.', 'Acho que é ver anime.', 'c', ['c6l1'], []),
            F('（しゅみ）かな。', '(hobby) kana.', 'Acho que é (hobby).', 'c', ['c6l1'], ['(shumi wa )?{hobby}( kana| da yo| dayo| da| ka na)?', '(shumi wa )?{hobby} (ga )?suki( kana)?'], { wild: true }),
            F('しゅみは アニメを みることです。', 'shumi wa anime o miru koto desu.', 'Meu hobby é ver anime.', 'p', ['c6l1'], ['(watashi no )?(shumi wa )?{hobby} desu'])],
            [L('{hobby}！ いいね〜。わたしは うたうのが すき！ よく カラオケに いくよ。', '{hobby}! ii ne~. watashi wa utau no ga suki! yoku karaoke ni iku yo.', '{hobby}! Que legal! Eu gosto de cantar! Vou muito ao karaokê.')], { keep: { from: 'hobby', as: 'hobby' }, tag: 'hobby' })],
            h: ['しゅみ (shumi) = hobby · アニメ, まんが, ゲーム, おんがく, りょうり', 'Casual: (hobby) かな。 / (hobby) だよ。 Agora que vocês são próximas, sem です.'], ex: 'A Yumi perguntou qual é o seu hobby.' }),
        N('n2', [L('{name}は カラオケ すき？', '{name} wa karaoke suki?', 'Você gosta de karaokê?')],
          { b: [B([F('うん、だいすき！', 'un, daisuki!', 'Sim, adoro!', 'c', ['c4l6'], ['(un )?(dai)?suki( da yo| dayo| yo)?']), F('はい、すきです。', 'hai, suki desu.', 'Sim, gosto. (polido)', 'p', ['c4l6'])], [L('ほんと？ じゃあ こんど いっしょに いこう！', 'honto? jaa kondo issho ni ikou!', 'Sério? Então vamos juntas um dia!')]),
            B([F('うたは にがて…', 'uta wa nigate…', 'Não sou boa(bom) cantando…', 'c', ['chat:nigate'], ['(uta wa |karaoke wa )?(chotto )?nigate( kamo)?', '(an|a)mari suki ja nai']), F('いった ことが ない。', 'itta koto ga nai.', 'Nunca fui.', 'c', ['c13l5'], ['itta koto (ga )?nai'])],
              [L('だいじょうぶ！ きく だけでも たのしいよ。', 'daijoubu! kiku dake demo tanoshii yo.', 'Tranquilo! Só de ouvir já é divertido.')])],
            h: ['すき = gostar · にがて = não ser bom em', 'Responda casual: 「うん、すき！」 ou 「ちょっと にがて…」.'] })
      ] },
    { id: 'yumi-anime', char: 'yumi', init: true, title: 'O anime novo da Yumi', desc: 'A Yumi conta que começou um anime novo.', need: ['c8l3'], set: ['yumi:anime'],
      nodes: [
        N('n1', [L('ねえ きいて！ きのうから あたらしい アニメを みはじめたの！「つきの としょかん」っていうの。', 'nee kiite! kinou kara atarashii anime o mihajimeta no! "tsuki no toshokan" tte iu no.', 'Escuta! Desde ontem comecei a ver um anime novo! Chama “Tsuki no Toshokan”.')],
          { b: [B([F('どんな アニメ？', 'donna anime?', 'Que tipo de anime?', 'c', ['chat:donna'], ['donna (anime|hanashi)( na no)?', 'dou( datta)?( no)?', 'omoshiroi( no)?']), F('へえ、そうなんだ。', 'hee, sou nan da.', 'Ah, é?', 'c', ['c8l6'], ['(hee )?sou nan da', 'hee'])],
            [L('まほうの としょかんで はたらく おんなのこの はなし！ えが すごく きれいなの。', 'mahou no toshokan de hataraku onna no ko no hanashi! e ga sugoku kirei na no.', 'É sobre uma garota que trabalha numa biblioteca mágica! Os desenhos são lindos.')]),
            B([F('いいな！', 'ii na!', 'Que legal!', 'c', ['chat:iina'], ['ii na( a)?', 'ii ne', 'sugoi( ne)?'])], [L('でしょ？ まほうの としょかんの はなしなの。こんど いっしょに みよう！', 'desho? mahou no toshokan no hanashi na no. kondo issho ni miyou!', 'Né? É a história de uma biblioteca mágica. Vamos assistir juntas!')])],
            h: ['どんな (donna) = que tipo de · いいな (ii na) = que legal!', 'Pergunte mais com 「どんな アニメ？」 ou reaja com 「いいな！」.'], ex: 'A Yumi está animada com um anime novo. Pergunte ou reaja.' }, { teach: ['hajimeru', 'donna', 'iina'] }),
        N('n2', [L('{name}は どんな アニメが すき？', '{name} wa donna anime ga suki?', 'E você, gosta de que tipo de anime?')],
          { b: [B([F('ファンタジーが すき！', 'fantajii ga suki!', 'Gosto de fantasia!', 'c', ['c4l6', 'c5l7'], []),
            F('（ジャンル）が すき！', '(gênero) ga suki!', 'Gosto de (gênero)!', 'c', ['c4l6', 'c5l7'], ['{genre}( mono| kei)? (ga )?(dai)?suki( da yo| dayo| yo)?', '{genre}( kana| da yo| dayo)?'], { wild: true }),
            F('ファンタジーが すきです。', 'fantajii ga suki desu.', 'Gosto de fantasia. (polido)', 'p', ['c4l6', 'c5l7'], ['{genre} ga (dai)?suki desu'])],
            [L('{genre}か〜！ わたしも けっこう すき！ おすすめ あったら おしえてね。', '{genre} ka~! watashi mo kekkou suki! osusume attara oshiete ne.', '{genre}! Eu também curto bastante! Se tiver recomendação, me fala.')], { keep: { from: 'genre', as: 'genero' } })],
            h: ['アクション, れんあい (romance), コメディー, ファンタジー, ホラー, いせかい', '(gênero) が すき！'] })
      ] },
    { id: 'yumi-anime2', char: 'yumi', init: true, title: 'Terminei o anime!', desc: 'A Yumi conta o final do anime que ela tinha começado.', need: ['c8l3'], after: 'yumi:anime',
      nodes: [
        N('n1', [L('まえに はなした「つきの としょかん」、さいごまで みたよ！ さいごは ないちゃった…', 'mae ni hanashita "tsuki no toshokan", saigo made mita yo! saigo wa naichatta…', 'Sabe o “Tsuki no Toshokan” que eu te contei? Vi até o fim! Chorei no final…')],
          { b: [B([F('どうだった？', 'dou datta?', 'E aí, como foi?', 'c', ['c8l3'], ['dou datta( no)?', 'omoshirokatta( no)?', 'yokatta( no)?']), F('ないたの？', 'naita no?', 'Você chorou?', 'c', ['c8l3', 'c8l5'], ['(hontou ni )?naita( no)?', 'maji de( naita)?'])],
            [L('うん、すごく かんどう した！ ぜったい みて！', 'un, sugoku kandou shita! zettai mite!', 'Sim, fiquei muito emocionada! Assiste, sério!')]),
            B([F('いいな、わたしも みたい！', 'ii na, watashi mo mitai!', 'Que legal, também quero ver!', 'c', ['c6l3', 'chat:iina'], ['ii na( watashi mo| boku mo| ore mo)? mitai', '(watashi|boku|ore) mo mitai', 'mitai'])], [L('じゃあ こんど いっしょに みよう！ ハンカチ ひつようだよ（笑）', 'jaa kondo issho ni miyou! hankachi hitsuyou da yo (wara)', 'Então vamos ver juntas! Vai precisar de lenço (risos).')])],
            h: ['どうだった？ = como foi? · ないた (naita) = chorou', 'Pergunte como foi ou diga que também quer assistir.'] })
      ] },
    { id: 'yumi-ongaku', char: 'yumi', init: true, title: 'Que música você ouve?', desc: 'Falar sobre música.', need: ['c8l4'],
      nodes: [
        N('n1', [L('さいきん どんな おんがく きいてる？', 'saikin donna ongaku kiiteru?', 'Que tipo de música você anda ouvindo?')],
          { b: [B([F('アニソンを きいてる。', 'anison o kiiteru.', 'Ando ouvindo músicas de anime.', 'c', ['c8l4'], []),
            F('（ジャンル）を きいてる。', '(gênero) o kiiteru.', 'Ando ouvindo (gênero).', 'c', ['c8l4'], ['{music} (o )?kiite(ru| iru)( yo| kana)?', '{music}( kana| da yo| ga suki)?'], { wild: true }),
            F('アニソンを きいて います。', 'anison o kiite imasu.', 'Ouço músicas de anime. (polido)', 'p', ['c5l10'], ['{music} o kiite imasu'])],
            [L('{music}！ いいね！ わたしは さいきん J-POP ばっかり。', '{music}! ii ne! watashi wa saikin jei-poppu bakkari.', '{music}! Legal! Eu ultimamente só ouço J-pop.')], { tag: 'musica' })],
            h: ['きいてる (kiiteru) = estou ouvindo · J-POP, ロック, サンバ, ボサノバ, アニソン', '(gênero) を きいてる.'], ex: 'A Yumi quer saber que música você tem ouvido.' }),
        N('n2', [L('ブラジルの おんがくも ききたいな。おすすめ ある？', 'burajiru no ongaku mo kikitai na. osusume aru?', 'Também quero ouvir música brasileira. Tem alguma recomendação?')],
          { b: [B([F('ボサノバが おすすめ！', 'bosanoba ga osusume!', 'Recomendo bossa nova!', 'c', ['chat:osusume'], ['{music} (ga )?osusume( da yo)?', '{music}( kana| da yo| dayo)?', '* (ga )?osusume( da yo)?'])], [L('ありがとう！ さっそく きいて みるね。', 'arigatou! sassoku kiite miru ne.', 'Valeu! Vou ouvir agora mesmo.')])],
            h: ['おすすめ (osusume) = recomendação', '(algo) が おすすめ！'] }, { teach: ['osusume'] })
      ] },
    { id: 'yumi-karaoke', char: 'yumi', init: true, title: 'Karaokê no sábado', desc: 'Aceitar um convite e combinar o horário.', need: ['c6l2', 'c4l9'],
      nodes: [
        N('n1', [L('どようび、カラオケ いかない？', 'doyoubi, karaoke ikanai?', 'Bora no karaokê no sábado?')],
          { b: [AGREE({ r: [L('やった！ なんじに あう？', 'yatta! nanji ni au?', 'Oba! Que horas a gente se encontra?')], next: 'hora' }),
            DECLINE({ r: [L('ざんねん！ じゃあ また こんど さそうね！', 'zannen! jaa mata kondo sasou ne!', 'Que pena! Te chamo outra vez!')], next: 'end' })],
            h: ['いかない？ = não quer ir? · いいね = boa!', 'Aceite com 「いいね！」 ou recuse com 「ちょっと…」.'] }),
        N('hora', [], { b: [B([F('さんじは どう？', 'sanji wa dou?', 'Que tal às três?', 'c', ['c4l9'], ['(gogo |gozen )?{hour}( han)?( wa dou| ni shiyou| ni au| ni aou| ga ii| de ii| kana)?']), F('さんじは どうですか。', 'sanji wa dou desu ka.', 'Que tal às três? (polido)', 'p', ['c4l9'], ['(gogo |gozen )?{hour}( han)? wa dou desu ka'])],
          [L('{hour}ね！ えきの まえで まってるね！', '{hour} ne! eki no mae de matteru ne!', 'Às {hour}! Te espero na frente da estação!')], { tag: 'combinou' })],
          near: [{ p: ['(gogo |gozen )?(yonji|nanaji|kyuuji)( wa dou)?'], kind: 'vocab', why: 'Atenção às horas especiais: 4h = よじ (yoji), 7h = しちじ (shichiji), 9h = くじ (kuji).' }],
          h: ['いちじ, にじ, さんじ… · 4h = よじ, 7h = しちじ, 9h = くじ', '(hora) は どう？ = que tal às (hora)?'], ex: 'Proponha um horário.' })
      ] },
    { id: 'yumi-senpai', char: 'yumi', init: true, title: 'Cumprimentando o senpai', desc: 'Ver como a hierarquia muda o cumprimento.', need: ['c9l3', 'c15l11'],
      nodes: [
        N('n1', [L('あ、あそこに せんぱいが いる！ せんぱいには ていねいに あいさつ してね。', 'a, asoko ni senpai ga iru! senpai ni wa teinei ni aisatsu shite ne.', 'Olha, o veterano (senpai) está ali! Cumprimente ele com educação, tá?')],
          { b: [B([F('おはようございます！', 'ohayou gozaimasu!', 'Bom dia!', 'p', ['c1l3']), F('おつかれさまです。', 'otsukaresama desu.', 'Olá! (bom trabalho)', 'p', ['c15l11'], ['otsukaresama desu', 'otsukare sama desu']),
            F('こんにちは。', 'konnichiwa.', 'Olá.', 'n', ['c1l3']), F('おはよう！', 'ohayou!', 'Bom dia! (casual)', 'c', ['c1l3']), F('おつかれ！', 'otsukare!', 'E aí! (casual)', 'c', ['chat:otsukare'])],
            [L('せんぱい：おう、おはよう。', 'senpai: ou, ohayou.', 'Senpai: Opa, bom dia.'), L('せんぱいは タメ口で こたえたでしょ？ 上の人は タメ口でも いいけど、わたしたちは ていねいに はなすの。', 'senpai wa tameguchi de kotaeta desho? ue no hito wa tameguchi de mo ii kedo, watashitachi wa teinei ni hanasu no.', 'Viu que o senpai respondeu casual? Quem está acima pode falar casual, mas nós falamos com educação.')], { tag: 'cumprimentou' })],
            h: ['せんぱい (senpai) = veterano · おはようございます / おつかれさまです', 'Com o senpai, use a forma educada mesmo sendo da mesma escola.'], ex: 'Cumprimente o veterano com educação.' }, { reg: 'p' })
      ] },
    { id: 'yumi-tenki', char: 'yumi', init: true, title: 'Que calor!', desc: 'Concordar ou discordar sobre o tempo.', need: ['c5l9', 'c4l6'],
      nodes: [
        N('n1', [L('きょう あついね〜。', 'kyou atsui ne~.', 'Hoje tá quente, né?')],
          { b: [B([F('うん、あついね。', 'un, atsui ne.', 'É, tá quente.', 'c', ['c4l6', 'c5l9'], ['(un )?(hontou ni |sugoku |chou |mecha )?atsui( ne| yo ne| na)?', 'sou da ne', 'da yo ne']), F('そうですね。', 'sou desu ne.', 'É verdade. (polido)', 'p', ['c5l9'], ['sou desu ne( atsui desu ne)?', 'atsui desu ne'])],
            [L('アイス たべたく なっちゃう！', 'aisu tabetaku nacchau!', 'Dá vontade de tomar sorvete!')]),
            B([F('そう？ ちょうど いいよ。', 'sou? choudo ii yo.', 'Será? Tá bom assim.', 'c', ['chat:choudoii'], ['sou( kana)?( choudo ii| suzushii| samui)?( yo| kedo)?', 'choudo ii( yo)?']), F('ブラジルは もっと あついよ！', 'burajiru wa motto atsui yo!', 'No Brasil é mais quente!', 'c', ['c4l6', 'chat:motto'], ['burajiru (wa|no hou ga) motto atsui( yo)?'])],
              [L('えー、すごい！ {name}は あつさに つよいんだね。', 'ee, sugoi! {name} wa atsusa ni tsuyoi n da ne.', 'Nossa! Você aguenta bem o calor, hein!')])],
            h: ['あつい (atsui) = quente · ね = né? (busca concordância)', 'Concorde com 「うん、あついね」 ou discorde com 「そう？」.'], ex: 'A Yumi comentou que está quente e espera que você concorde (ね).' }, { teach: ['choudoii', 'motto'] })
      ] },

    /* ---------------- TAKESHI ---------------- */
    { id: 'tk-hajime', char: 'takeshi', intro: true, title: 'Primeira visita à loja', need: [], set: ['tk:met'],
      nodes: [
        N('n1', [L('いらっしゃいませ！ たけし しょうてんへ ようこそ。', 'irasshaimase! Takeshi shouten e youkoso.', 'Bem-vindo(a)! Seja bem-vindo(a) à Loja Takeshi.'), L('なにか おさがしですか。', 'nanika osagashi desu ka.', 'Procura alguma coisa?')],
          { b: [B([F('みて いる だけです。', 'mite iru dake desu.', 'Só estou olhando.', 'p', ['chat:miteirudake'], ['(chotto )?mite(iru| iru| ru| imasu) dake( desu)?'])], [L('どうぞ、ごゆっくり ごらん ください。', 'douzo, goyukkuri goran kudasai.', 'Fique à vontade para olhar.')], { next: 'oferta' }),
            B([F('おにぎりは ありますか。', 'onigiri wa arimasu ka.', 'Tem oniguiri?', 'p', ['c5l7'], []),
              F('（しょうひん）は ありますか。', '(produto) wa arimasu ka.', 'Tem (produto)?', 'p', ['c5l7'], ['{food} (wa |ga |mo )?arimasu ka'], { wild: true }),
              F('（しょうひん）を ください。', '(produto) o kudasai.', '(produto), por favor.', 'p', ['c6l4'], ['{food} (o )?(kudasai|onegai( shimasu)?)', '{food} (o )?(hitotsu|futatsu|mittsu) (kudasai|onegai( shimasu)?)'], { wild: true }),
              F('おにぎり ある？', 'onigiri aru?', 'Tem oniguiri? (casual)', 'c', ['c8l1'], ['{food} (wa |ga )?aru( no)?', '{food} (o )?choudai'])],
              [L('はい、こちらで ございます。', 'hai, kochira de gozaimasu.', 'Sim, está aqui.')], { next: 'fukuro', dyn: 'price', tag: 'pediu' })],
            h: ['ありますか = tem? · ください = por favor (quero) · みて いる だけです = só estou olhando', 'Com um atendente, use a forma educada: 「〜は ありますか」 ou 「〜を ください」.'],
            ex: 'O Takeshi perguntou se você procura algo. Peça um produto ou diga que só está olhando.' }, { teach: ['osagashi', 'miteirudake'] }),
        N('oferta', [L('こちらの おにぎりは いかがですか。きょうの おすすめです。', 'kochira no onigiri wa ikaga desu ka. kyou no osusume desu.', 'Que tal este oniguiri? É a recomendação de hoje.')],
          { b: [B([F('じゃあ、これを ください。', 'jaa, kore o kudasai.', 'Então, este, por favor.', 'p', ['c6l4'], ['(jaa )?(kore|sore) (o )?(kudasai|onegai( shimasu)?)', '(jaa )?(kore|sore) ni shimasu', '(jaa )?(hitotsu|futatsu) (kudasai|onegai( shimasu)?)'])], [L('ありがとう ございます。', 'arigatou gozaimasu.', 'Muito obrigado.')], { next: 'fukuro', dyn: 'onigiri', tag: 'pediu' }),
            B([F('いいえ、けっこうです。', 'iie, kekkou desu.', 'Não, obrigado(a).', 'p', ['chat:kekkou'], ['(iie )?kekkou desu', 'mata kondo( ni shimasu)?', '(chotto )?kangaemasu', 'mata kimasu'])], [L('かしこまりました。ごゆっくり どうぞ。', 'kashikomarimashita. goyukkuri douzo.', 'Pois não. Fique à vontade.')], { next: 'end' })],
            h: ['いかがですか = que tal? · これを ください = este, por favor · けっこうです = não, obrigado(a)', 'Aceite ou recuse de forma educada.'] }, { teach: ['ikaga', 'kekkou'] }),
        N('fukuro', [L('ふくろは ごりようですか。', 'fukuro wa goriyou desu ka.', 'Vai querer sacola?')],
          { b: [B([F('はい、おねがいします。', 'hai, onegaishimasu.', 'Sim, por favor.', 'p', ['c15l2'], ['hai( onegai( shimasu)?)?', 'onegai( shimasu)?'])], [L('かしこまりました。', 'kashikomarimashita.', 'Pois não.')], { next: 'pagar' }),
            B([F('いいえ、だいじょうぶです。', 'iie, daijoubu desu.', 'Não, obrigado(a).', 'p', ['c15l2'], ['(iie )?daijoubu( desu)?', '(iie )?kekkou desu', '(iie )?irimasen', 'fukuro wa daijoubu desu'])], [L('かしこまりました。', 'kashikomarimashita.', 'Pois não.')], { next: 'pagar' }),
            B([F('いいです。', 'ii desu.', 'Está bom / Não precisa.', 'p', ['c5l1'], ['ii desu( yo)?'], { odd: true, why: '「いいです」 é ambíguo: pode ser “sim, pode ser” ou “não precisa”. O atendente vai ficar na dúvida. Prefira 「おねがいします」 (sim) ou 「だいじょうぶです」 (não).' })],
              [L('えっと…ふくろは ひつよう ない、ということで よろしいですか。', 'etto… fukuro wa hitsuyou nai, to iu koto de yoroshii desu ka.', 'Hum… então não precisa de sacola, certo?')], { next: 'pagar' })],
            near: [{ p: ['iranai', 'ii yo', 'un'], kind: 'social', why: 'Com um atendente, a resposta casual soa seca. Use 「だいじょうぶです」 ou 「おねがいします」.', fix: '1.0' }],
            h: ['ふくろ (fukuro) = sacola · だいじょうぶです = não precisa (recusa educada)', 'Sim: 「はい、おねがいします」. Não: 「だいじょうぶです」.'], ex: 'O Takeshi perguntou se você quer sacola.' }, { teach: ['fukuro'] }),
        N('pagar', [L('{price}で ございます。', '{price} de gozaimasu.', 'Fica {price}.'), L('おしはらいは げんきんですか、カードですか。', 'oshiharai wa genkin desu ka, kaado desu ka.', 'Vai pagar em dinheiro ou no cartão?')],
          { b: [B([F('カードで おねがいします。', 'kaado de onegaishimasu.', 'No cartão, por favor.', 'p', ['c6l4'], ['kaado de( onegai( shimasu)?| haraimasu)?', 'kaado( desu)?']),
            F('げんきんで おねがいします。', 'genkin de onegaishimasu.', 'Em dinheiro, por favor.', 'p', ['chat:genkin'], ['genkin de( onegai( shimasu)?| haraimasu)?', 'genkin( desu)?'])],
            [L('ありがとう ございました！ またの おこしを おまちして おります。', 'arigatou gozaimashita! mata no okoshi o omachi shite orimasu.', 'Muito obrigado! Esperamos sua próxima visita.')], { tag: 'pagou' })],
            h: ['げんきん (genkin) = dinheiro · カード = cartão · 〜で = com/por meio de', '(meio) で おねがいします.'], ex: 'Escolha a forma de pagamento.' }, { teach: ['genkin'] })
      ] },
    { id: 'tk-bentou', char: 'takeshi', init: true, title: 'Esquento o bentō?', desc: 'As perguntas clássicas do caixa do konbini.', need: ['c15l2'],
      nodes: [
        N('n1', [L('いらっしゃいませ。こちらの おべんとう、あたためますか。', 'irasshaimase. kochira no obentou, atatamemasu ka.', 'Bem-vindo(a). Quer que esquente este bentō?')],
          { b: [B([F('はい、おねがいします。', 'hai, onegaishimasu.', 'Sim, por favor.', 'p', ['c15l2'], ['hai( onegai( shimasu)?)?', 'onegai( shimasu)?'])], [L('かしこまりました。しょうしょう おまちください。', 'kashikomarimashita. shoushou omachi kudasai.', 'Pois não. Aguarde um instante.')]),
            B([F('いいえ、そのままで だいじょうぶです。', 'iie, sono mama de daijoubu desu.', 'Não, pode deixar assim.', 'p', ['c15l2', 'chat:sonomama'], ['(iie )?(sono mama de )?daijoubu( desu)?', '(iie )?kekkou desu'])], [L('かしこまりました。', 'kashikomarimashita.', 'Pois não.')]),
            B([F('いいです。', 'ii desu.', 'Está bom.', 'p', ['c5l1'], ['ii desu( yo)?'], { odd: true, why: '「いいです」 pode significar sim ou não. No caixa, deixe claro: 「おねがいします」 ou 「だいじょうぶです」.' })], [L('えっと…あたためなくて よろしいですか。', 'etto… atatamenakute yoroshii desu ka.', 'Hum… então não precisa esquentar?')])],
            h: ['あたためる (atatameru) = esquentar · そのままで = assim mesmo', 'Sim: 「おねがいします」. Não: 「そのままで だいじょうぶです」.'], ex: 'O Takeshi quer saber se deve esquentar o bentō.' }, { teach: ['atatameru', 'sonomama'] }),
        N('n2', [L('おはしは おつけしますか。', 'ohashi wa otsuke shimasu ka.', 'Vai querer hashi?')],
          { b: [B([F('はい、おねがいします。', 'hai, onegaishimasu.', 'Sim, por favor.', 'p', ['c15l2'], ['hai( onegai( shimasu)?)?', 'onegai( shimasu)?', 'ippon onegai( shimasu)?'])], [L('ありがとう ございました！', 'arigatou gozaimashita!', 'Muito obrigado!')]),
            B([F('いいえ、だいじょうぶです。', 'iie, daijoubu desu.', 'Não, obrigado(a).', 'p', ['c15l2'], ['(iie )?daijoubu( desu)?', '(iie )?kekkou desu', '(iie )?irimasen'])], [L('かしこまりました。ありがとう ございました！', 'kashikomarimashita. arigatou gozaimashita!', 'Pois não. Muito obrigado!')])],
            h: ['おはし (ohashi) = hashi', 'Mesma lógica da pergunta anterior.'] })
      ] },
    { id: 'tk-purin', char: 'takeshi', init: true, title: 'Produto novo na loja', desc: 'O Takeshi apresenta um produto novo.', need: ['c6l4'],
      nodes: [
        N('n1', [L('あ、いらっしゃいませ！ きょう、あたらしい しょうひんが はいりました。まっちゃの プリンです！', 'a, irasshaimase! kyou, atarashii shouhin ga hairimashita. maccha no purin desu!', 'Ah, bem-vindo(a)! Hoje chegou um produto novo: pudim de matchá!'), L('おひとつ いかがですか。', 'ohitotsu ikaga desu ka.', 'Aceita um?')],
          { b: [B([F('じゃあ、ひとつ ください。', 'jaa, hitotsu kudasai.', 'Então, um, por favor.', 'p', ['c6l4'], ['(jaa )?(hitotsu|futatsu|mittsu) (kudasai|onegai( shimasu)?)', '(jaa )?(sore|kore) (o )?(kudasai|onegai( shimasu)?)', '(jaa )?(kore|sore) ni shimasu'])],
            [L('ありがとう ございます！ ひとつ にひゃくごじゅうえんで ございます。', 'arigatou gozaimasu! hitotsu nihyaku gojuu en de gozaimasu.', 'Muito obrigado! Um sai por 250 ienes.')], { next: 'end', tag: 'comprou' }),
            B([F('いくらですか。', 'ikura desu ka.', 'Quanto custa?', 'p', ['c6l4'], ['(sore wa |kore wa |hitotsu )?ikura desu ka']), F('いくら？', 'ikura?', 'Quanto é? (casual)', 'c', ['c6l4'], ['(sore |kore )?ikura( na no)?'])],
              [L('ひとつ にひゃくごじゅうえんで ございます。', 'hitotsu nihyaku gojuu en de gozaimasu.', 'Um custa 250 ienes.')], { next: 'n2' }),
            B([F('おいしそうですね！', 'oishisou desu ne!', 'Parece gostoso!', 'p', ['c14l9'], ['oishisou( desu)?( ne)?'])], [L('はい、とても おいしいですよ。', 'hai, totemo oishii desu yo.', 'Sim, é muito gostoso.')], { next: 'n2' }),
            B([F('いいえ、けっこうです。', 'iie, kekkou desu.', 'Não, obrigado(a).', 'p', ['chat:kekkou'], ['(iie )?kekkou desu', '(iie )?daijoubu desu', 'mata kondo( ni shimasu)?'])], [L('かしこまりました。また どうぞ。', 'kashikomarimashita. mata douzo.', 'Pois não. Volte sempre.')], { next: 'end' })],
            h: ['いかがですか = aceita? · いくらですか = quanto custa? · ひとつ = um', 'Compre (「ひとつ ください」), pergunte o preço ou recuse com educação.'], ex: 'O Takeshi está oferecendo o pudim novo.' }, { teach: ['ikaga', 'purin', 'kekkou'] }),
        N('n2', [L('いかが なさいますか。', 'ikaga nasaimasu ka.', 'O que deseja fazer?')],
          { b: [B([F('じゃあ、ひとつ ください。', 'jaa, hitotsu kudasai.', 'Então, um, por favor.', 'p', ['c6l4'], ['(jaa )?(hitotsu|futatsu|mittsu) (kudasai|onegai( shimasu)?)', '(jaa )?(sore|kore) (o )?(kudasai|onegai( shimasu)?)', '(jaa )?(kore|sore) ni shimasu'])], [L('ありがとう ございます！', 'arigatou gozaimasu!', 'Muito obrigado!')], { tag: 'comprou' }),
            B([F('ちょっと かんがえます。', 'chotto kangaemasu.', 'Vou pensar um pouco.', 'p', ['c15l3'], ['(chotto )?kangaemasu', '(iie )?kekkou desu', 'mata kondo( ni shimasu)?'])], [L('かしこまりました。ごゆっくり どうぞ。', 'kashikomarimashita. goyukkuri douzo.', 'Pois não. Fique à vontade.')])],
            h: ['ください = quero · かんがえます = vou pensar', 'Decida: comprar ou pensar.'] })
      ] },
    { id: 'tk-mizu', char: 'takeshi', init: false, title: 'Pedindo água no balcão', desc: 'Como cliente, pedir água do jeito natural.', need: ['c9l4', 'c6l4'],
      nodes: [
        N('n1', [L('おのみものは いかが なさいますか。', 'onomimono wa ikaga nasaimasu ka.', 'E para beber, o que vai querer?')],
          { b: [B([F('おみずを おねがいします。', 'omizu o onegaishimasu.', 'Água, por favor.', 'p', ['c6l4'], ['{drink} (o )?onegai( shimasu)?', '{drink} (o )?onegaishimasu']),
            F('おみずを ください。', 'omizu o kudasai.', 'Água, por favor.', 'p', ['c6l4'], ['{drink} (o )?kudasai']),
            F('みず ちょうだい。', 'mizu choudai.', 'Me dá água. (íntimo)', 'c', ['chat:choudai'], ['{drink} (o )?(choudai|kureru|moraeru)', '{drink}'])],
            [L('かしこまりました。しょうしょう おまちください。', 'kashikomarimashita. shoushou omachi kudasai.', 'Pois não. Aguarde um instante.')], { tag: 'pediu' })],
            h: ['おみず (omizu) = água (com お, mais delicado) · おねがいします = por favor', 'Como cliente, o mais natural é 「〜を おねがいします」.'], ex: 'O Takeshi perguntou o que você vai beber.' }),
        N('n2', [L('おまたせ いたしました。おみずで ございます。', 'omatase itashimashita. omizu de gozaimasu.', 'Desculpe a espera. Aqui está a sua água.')], null, { card: 'agua' })
      ] },
    { id: 'tk-nedan', char: 'takeshi', init: true, title: 'Quanto ficou?', desc: 'Entender um preço falado e confirmar (treino de números).', need: ['c1l2', 'c6l4'],
      build: () => chBuildPrice() },
    { id: 'tk-shinagire', char: 'takeshi', init: true, title: 'Esgotado!', desc: 'Lidar com um produto esgotado e aceitar uma alternativa.', need: ['c15l3'],
      nodes: [
        N('n1', [L('もうしわけ ございません。おにぎりは ただいま しなぎれで ございます。', 'moushiwake gozaimasen. onigiri wa tadaima shinagire de gozaimasu.', 'Mil desculpas. O oniguiri está esgotado no momento.'), L('かわりに パンは いかがですか。', 'kawari ni pan wa ikaga desu ka.', 'Que tal um pão no lugar?')],
          { b: [B([F('じゃあ、それに します。', 'jaa, sore ni shimasu.', 'Então vou levar esse.', 'p', ['c15l3'], ['(jaa )?(sore|kore|pan) ni shimasu', '(jaa )?(sore|kore|pan) (o )?(kudasai|onegai( shimasu)?)'])], [L('ありがとう ございます！', 'arigatou gozaimasu!', 'Muito obrigado!')], { tag: 'aceitou' }),
            B([F('じゃあ、また きます。', 'jaa, mata kimasu.', 'Então volto outra hora.', 'p', ['chat:matakimasu'], ['(jaa )?mata kimasu', '(iie )?kekkou desu', '(jaa )?daijoubu desu'])], [L('もうしわけ ございません。おまちして おります。', 'moushiwake gozaimasen. omachi shite orimasu.', 'Mil desculpas. Esperamos o(a) senhor(a).')])],
            h: ['しなぎれ (shinagire) = esgotado · かわりに = no lugar · それに します = vou levar esse', 'Aceite a alternativa ou diga que volta outra hora.'], ex: 'O produto acabou e o Takeshi ofereceu outro.' }, { teach: ['shinagire', 'matakimasu'] })
      ] },
    { id: 'tk-denwa', char: 'takeshi', init: true, title: 'Encomenda por telefone', desc: 'Keigo ao telefone (intermediário).', need: ['c20l3', 'c15l8'], tier: 2,
      nodes: [
        N('n1', [L('お電話 ありがとう ございます。たけし商店で ございます。', 'odenwa arigatou gozaimasu. Takeshi shouten de gozaimasu.', 'Obrigado pela ligação. Loja Takeshi.')],
          { b: [B([F('もしもし、{name}と 申します。', 'moshi moshi, {name} to moushimasu.', 'Alô, meu nome é {name}.', 'k', ['c15l8'], ['(moshi moshi )?{name} to moushimasu( ga)?']),
            F('（なまえ）と 申します。', '(nome) to moushimasu.', 'Meu nome é (nome).', 'k', ['c15l8'], ['(moshi moshi )?(watakushi wa |watashi wa )?* to moushimasu( ga)?'], { wild: true }),
            F('{name}です。', '{name} desu.', 'É {name}.', 'p', ['c5l1'], ['(moshi moshi )?{name} desu( ga)?'])],
            [L('{name}様ですね。いつも ありがとう ございます。ご用件を うかがいます。', '{name}-sama desu ne. itsumo arigatou gozaimasu. goyouken o ukagaimasu.', 'Senhor(a) {name}, sempre muito obrigado. Em que posso ajudar?')])],
            h: ['〜と 申します (to moushimasu) = meu nome é (humilde)', 'Ao telefone, apresente-se com 〜と 申します.'] }),
        N('n2', [], { b: [B([F('おべんとうを みっつ よやく したいんですが。', 'obentou o mittsu yoyaku shitai n desu ga.', 'Queria reservar três bentōs.', 'p', ['c15l13'], ['(o)?bentou o (hitotsu|futatsu|mittsu|yottsu|itsutsu) yoyaku shitai n desu ga', '(o)?bentou o (hitotsu|futatsu|mittsu|yottsu|itsutsu) (onegai shimasu|onegaishimasu|kudasai)', '* o (hitotsu|futatsu|mittsu) yoyaku (shitai n desu ga|dekimasu ka)'])],
          [L('かしこまりました。お受け取りは 何時ごろ なさいますか。', 'kashikomarimashita. ouketori wa nanji goro nasaimasu ka.', 'Pois não. Por volta de que horas virá retirar?')])],
          h: ['よやく (yoyaku) = reserva · 〜たいんですが = gostaria de… (pedido suave)', 'Peça com 〜たいんですが: soa educado e deixa o atendente oferecer ajuda.'], ex: 'Diga o que quer encomendar.' }),
        N('n3', [], { b: [B([F('じゅうにじごろ おねがいします。', 'juuniji goro onegaishimasu.', 'Por volta do meio-dia, por favor.', 'p', ['c4l9'], ['(gogo |gozen )?{hour}( han)?( goro)?( ni)?( onegai( shimasu)?| de onegai( shimasu)?| desu)?'])],
          [L('{hour}ですね。かしこまりました。お待ちして おります。', '{hour} desu ne. kashikomarimashita. omachi shite orimasu.', 'Às {hour}, certo. Pois não, aguardamos.')])],
          h: ['〜ごろ (goro) = por volta de', '(hora) ごろ おねがいします.'] })
      ] }
  ];

  /* ---------- falas dinâmicas (dados reais do aluno) ---------- */
  const CHAT_DYN_LINES = {
    aikoAdvice: () => {
      const SK = { vocabulario: 'Vocabulário', gramatica: 'Gramática', frases: 'Construção de frases', leitura: 'Leitura e escrita', interpretacao: 'Interpretação de textos', audicao: 'Compreensão auditiva' };
      const sk = Object.keys(S.skills || {}).map(k => ({ k, a: S.skills[k].a, p: S.skills[k].a ? S.skills[k].c / S.skills[k].a : 1 })).filter(x => x.a >= 8 && SK[x.k]).sort((a, b) => a.p - b.p)[0];
      const corr = (S.chat.corrections || []).slice(-25), cnt = {};
      corr.forEach(c => { cnt[c.kind] = (cnt[c.kind] || 0) + 1; });
      const top = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
      const KN = { grammar: 'as partículas e a gramática', social: 'o nível de formalidade (casual × educado)', vocab: 'a escolha das palavras', spelling: 'a escrita em romaji' };
      let pt = '';
      if (sk) pt += 'Pelos seus resultados, a habilidade mais difícil agora é “' + SK[sk.k] + '” (' + Math.round(sk.p * 100) + '% de acertos). ';
      if (top && cnt[top] >= 3 && KN[top]) pt += 'Nas conversas, notei que o que mais aparece nas correções é ' + KN[top] + '. ';
      const due = dueItems().length;
      if (due) pt += 'Você tem ' + due + ' ' + (due === 1 ? 'item' : 'itens') + ' esperando revisão.';
      if (!pt) pt = 'Seus resultados estão equilibrados. Continue assim!';
      return [L(sk || top ? 'すこし きに なる ところが ありますね。' : 'とても いい ちょうしですね。', sk || top ? 'sukoshi ki ni naru tokoro ga arimasu ne.' : 'totemo ii choushi desu ne.', pt.trim())];
    }
  };
  /* ---------- reações dinâmicas a respostas ---------- */
  const CHAT_DYN_ANSWER = {
    price: (cid, act, res) => { const f = res.cap.food || CHAT_SLOTS.food[0]; act.ctx.food = { jp: f.jp, ro: f.ro, pt: f.pt }; act.ctx.price = chYen(f.price || 150); },
    onigiri: (cid, act) => { const f = CHAT_SLOTS.food[0]; act.ctx.food = { jp: f.jp, ro: f.ro, pt: f.pt }; act.ctx.price = chYen(f.price); },
    raamenDefault: (cid, act, res) => { if (!res.cap.food) act.ctx.food = { jp: 'ラーメン', ro: 'raamen', pt: 'lámen' }; },
    review: (cid, act, res, ok) => { const id = (chNode(act) || {}).item; if (id && ITEM[id]) recordAnswer(id, true, 'chat'); },
    reviewWrong: (cid, act, res) => {
      const nd = chNode(act); const it = ITEM[nd.item];
      if (it) recordAnswer(it.id, false, 'chat');
      chRecordCorrection(cid, { kind: 'vocab', input: res.input, whyTxt: 'Revisão: a palavra para “' + (it ? it.pt : '') + '”.' }, it);
      chPush(cid, { from: 'sys', kind: 'fb', res: 'vocab', txt: 'Esta palavra vai voltar na sua revisão para fixar melhor.', model: it ? { jp: it.jp, ro: it.ro, pt: it.pt } : null });
      chPushLines(cid, chLinesOf([L('だいじょうぶ。こたえは「' + (it ? it.jp : '') + '」です。', 'daijoubu. kotae wa "' + (it ? it.ro : '') + '" desu.', 'Tudo bem. A resposta é “' + (it ? it.jp + '” (' + it.ro + ')' : '”') + '.')], {}));
      chAdvance(cid, act, null);
      return true;
    },
    priceWrong: (cid, act, res) => {
      const p = act.ctx.price;
      if (act.tries < 2) { chPushLines(cid, [{ jp: 'もう いちど もうしあげますね。' + p.jp + 'で ございます。', ro: 'mou ichido moushiagemasu ne. ' + p.ro + ' de gozaimasu.', pt: 'Vou repetir: ' + p.pt + '.', say: 'もう いちど もうしあげますね。' + p.jp + 'で ございます。', slow: true }].map(x => x)); chPush(cid, { from: 'sys', kind: 'hint', lv: 1, txt: 'Ouça o número de novo. Dica: ' + p.num + ' = ' + p.ro + '.' }); return true; }
      chRecordCorrection(cid, { kind: 'vocab', input: res.input, whyTxt: 'O preço era ' + p.pt + '.' }, { jp: p.jp + 'ですね', ro: p.ro + ' desu ne', pt: p.pt + ', certo?' });
      chPush(cid, { from: 'sys', kind: 'fb', res: 'vocab', txt: 'O preço era ' + p.pt + '.', model: { jp: p.jp + 'ですね。', ro: p.ro + ' desu ne.', pt: p.pt + ', certo?' } });
      chAdvance(cid, act, null);
      return true;
    }
  };

  /* ---------- desafios opcionais ---------- */
  const CHAT_CHALLENGES = [
    { id: 'ren-oi-genki', char: 'ren', title: 'Responder ao “tudo bem?” do Ren com naturalidade', desc: 'No desafio “Tudo bem?”, responda de forma casual e natural, sem usar dicas.', xp: 25, scene: 'ren-genki', tags: ['respondeu'], natural: true },
    { id: 'ren-convite', char: 'ren', title: 'Responder a um convite do Ren', desc: 'Complete o assunto “O que você está fazendo?”.', xp: 20, scene: 'ren-ima', tags: [] },
    { id: 'ren-consolo', char: 'ren', title: 'Consolar o Ren depois da derrota', desc: 'No assunto “Tudo bem?”, reaja com uma palavra de consolo.', xp: 15, scene: 'ren-genki', tags: ['consolou'] },
    { id: 'aiko-apresentacao', char: 'aiko', title: 'Apresentar-se formalmente à professora', desc: 'Apresente-se com はじめまして…です。よろしく おねがいします, sem erros de formalidade.', xp: 20, scene: 'aiko-hajime', tags: ['apresentou'], natural: true },
    { id: 'aiko-casual-educado', char: 'aiko', title: 'Transformar perguntas casuais em educadas', desc: 'Complete “Casual ou educado?”.', xp: 25, scene: 'aiko-teinei', tags: ['ok1', 'ok2'] },
    { id: 'aiko-entendeu', char: 'aiko', title: 'Entender o aviso da aula', desc: 'No “Aviso da aula”, acerte quantas lições de casa são.', xp: 20, scene: 'aiko-mouichido', tags: ['entendeu'] },
    { id: 'yumi-tame', char: 'yumi', title: 'Passar a falar casual com a Yumi', desc: 'Aceite a タメ口 da Yumi.', xp: 15, scene: 'yumi-hajime', tags: ['tame'] },
    { id: 'yumi-senpai', char: 'yumi', title: 'Cumprimentar o senpai com educação', desc: 'No assunto do senpai, cumprimente sem usar a forma casual.', xp: 20, scene: 'yumi-senpai', tags: ['cumprimentou'], natural: true },
    { id: 'yumi-karaoke', char: 'yumi', title: 'Combinar o karaokê', desc: 'Aceite o convite e proponha um horário.', xp: 20, scene: 'yumi-karaoke', tags: ['combinou'] },
    { id: 'tk-compra', char: 'takeshi', title: 'Fazer uma compra completa', desc: 'Peça um produto, responda sobre a sacola e pague.', xp: 30, scene: 'tk-hajime', tags: ['pediu', 'pagou'] },
    { id: 'tk-agua', char: 'takeshi', title: 'Pedir água do jeito certo em dois lugares', desc: 'Peça água na casa do Ren e no balcão do Takeshi.', xp: 25, scenesDone: ['ren-mizu', 'tk-mizu'], tags: [] }
  ];

  return { CHAT_KANJI, CHAT_SLOTS, CHAT_PACK, CHAT_META, CHAT_INTENTS, CHAT_CHARS, CHAT_SCENES, CHAT_DYN_LINES, CHAT_DYN_ANSWER, CHAT_CHALLENGES, CHAT_CARDS };
})();
function CHAT_INTENTS_ALL() { return CHAT_INTENTS; }
ACHIEVEMENTS.push(
  { id: 'chat_first', icon: '話', name: 'Primeira conversa', desc: 'Conclua um assunto no Nihongo Chat.', test: s => !!(s.chat && s.chat.stats && s.chat.stats.scenes >= 1) },
  { id: 'chat_all', icon: '友', name: 'Amigo de todos', desc: 'Conheça os quatro personagens do Nihongo Chat.', test: s => !!(s.chat && ['ren', 'aiko', 'yumi', 'takeshi'].every(id => s.chat.chars[id] && s.chat.chars[id].met)) }
);

/* ---------- cenas montadas na hora com os dados do aluno ---------- */
/* Revisão com a Aiko: itens que o aluno realmente estudou, priorizando os que precisam de revisão */
function chBuildReview(mode) {
  const okItem = it => it && it.lesson && it.lesson.kind !== 'kana' && it.lesson.kind !== 'audio' && !String(it.id).startsWith('chat:') && it.pt && it.pt.length <= 28 && !/[a-z]{3,} [a-z]{3,} [a-z]{3,}/i.test(it.ro) && String(it.ro).split(' ').length <= 3 && !/[〜~]/.test(it.jp);
  let ids = [];
  if (mode === 'recent') {
    const h = [...S.history].reverse().find(x => x.id && ITEM[x.id] && ITEM[x.id].lesson && ITEM[x.id].lesson.kind !== 'audio' && ITEM[x.id].lesson.kind !== 'kana');
    const L0 = h ? ITEM[h.id].lesson : null;
    if (L0 && L0.items) ids = shuffle(L0.items.filter(okItem).map(it => it.id)).slice(0, 2);
  }
  if (ids.length < 2) {
    const seen = Object.keys(S.items).filter(id => ITEM[id] && okItem(ITEM[id]) && S.items[id].seen);
    const score = id => { const s = itemStatus(id), r = S.items[id]; return (s === 'revisar' ? 0 : r.due <= Date.now() ? 1 : s === 'aprendendo' ? 2 : s === 'vista' ? 3 : 4) + Math.random() * 0.9; };
    seen.sort((a, b) => score(a) - score(b));
    ids = ids.concat(seen.filter(id => !ids.includes(id))).slice(0, 3);
  }
  if (!ids.length) { const L1 = LESSON.c1l3; ids = shuffle(L1.items.map(i => i.id)).slice(0, 2); }
  const lesson = mode === 'recent' && ids.length && ITEM[ids[0]].lesson;
  const nodes = ids.map((id, i) => {
    const it = ITEM[id];
    const first = i === 0 ? [mode === 'recent' && lesson ? { jp: 'さいきんの レッスンから もんだいです。', ro: 'saikin no ressun kara mondai desu.', pt: 'Perguntas da sua última lição: “' + lesson.title + '”.' } : { jp: 'すこし ふくしゅう しましょう。', ro: 'sukoshi fukushuu shimashou.', pt: 'Vamos revisar um pouquinho.' }] : [];
    const ro = String(it.ro).replace(/[.。!?]/g, '');
    const f = { jp: it.jp, ro: it.ro, pt: it.pt, reg: 'n', uses: [it.lesson.id], alt: [ro, ro.replace(/^~/, '')] };
    return { id: 'r' + i, item: id, say: first.concat([{ jp: '「' + it.pt + '」は にほんごで なんと いいますか。', ro: '“' + it.pt + '” wa nihongo de nan to iimasu ka.', pt: 'Como se diz “' + it.pt + '” em japonês?', say: 'にほんごで なんと いいますか。' }]),
      ask: { b: [{ f: [f], r: [{ jp: 'そうです！ よく できました。', ro: 'sou desu! yoku dekimashita.', pt: 'Isso! Muito bem.' }], dyn: 'review', tag: 'acertou' }], dynWrong: 'reviewWrong',
        h: [it.note ? 'Lembre: ' + it.note : 'Começa com “' + String(it.ro).slice(0, 2) + '…”.', 'Responda só a palavra ou expressão, em romaji ou em japonês.'], ex: 'A professora quer a palavra japonesa para “' + it.pt + '”, que você estudou em “' + (it.lesson.title || '') + '”.' } };
  });
  nodes.push({ id: 'fim', say: [{ jp: 'おつかれさまでした。また ふくしゅう しましょうね。', ro: 'otsukaresama deshita. mata fukushuu shimashou ne.', pt: 'Bom trabalho. Vamos revisar de novo outro dia.' }] });
  return { nodes };
}
/* Que horas são: usa o relógio real do aparelho */
function chBuildTime() {
  const d = new Date(), h = d.getHours(), m = d.getMinutes(), h12 = h % 12 || 12;
  const ampm = h < 12 ? 'gozen' : 'gogo';
  const hr = HOUR_RO[h12] + 'ji', hjp = NQK.r2k(HOUR_RO[h12]) + 'じ';
  const pats = ['(' + ampm + ' )?' + hr + '( desu)?', '(' + ampm + ' )?' + hr + ' * (fun|pun)( desu)?', '(' + ampm + ' )?' + hr + ' (sugi|goro|chotto sugi)( desu)?'];
  if (m >= 25 && m < 40) pats.push('(' + ampm + ' )?' + hr + ' han( desu)?');
  const next = HOUR_RO[h12 % 12 + 1] + 'ji';
  if (m >= 45) pats.push('(mou sugu )?' + next + '( mae)?( desu)?');
  const DAYS = ['nichiyoubi', 'getsuyoubi', 'kayoubi', 'suiyoubi', 'mokuyoubi', 'kin\'youbi', 'doyoubi'], DJ = ['にちようび', 'げつようび', 'かようび', 'すいようび', 'もくようび', 'きんようび', 'どようび'], DP = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const w = d.getDay();
  return { nodes: [
    { id: 't1', say: [{ jp: 'いま なんじですか。', ro: 'ima nanji desu ka.', pt: 'Que horas são agora?' }],
      ask: { b: [{ f: [{ jp: hjp + 'です。', ro: hr + ' desu.', pt: 'São ' + h12 + ' horas.', reg: 'p', uses: ['c4l9'], alt: pats }], r: [{ jp: 'はい、そうですね。ありがとう ございます。', ro: 'hai, sou desu ne. arigatou gozaimasu.', pt: 'Isso mesmo. Obrigada.' }], tag: 'hora' }],
        near: [{ p: ['(gozen |gogo )?(yonji|nanaji|kyuuji)( desu)?'], kind: 'vocab', why: 'Horas especiais: 4h = よじ (yoji), 7h = しちじ (shichiji), 9h = くじ (kuji).' }, { p: ['(gozen |gogo )?(ichi|ni|san|yo|go|roku|shichi|hachi|ku|juu|juuichi|juuni)ji( han)?( desu)?'], kind: 'vocab', why: 'Confira o relógio: agora são ' + h12 + 'h (' + hjp + ').' }],
        h: ['〜じ (ji) = horas · はん (han) = meia · ごぜん / ごご = manhã / tarde', 'Olhe o relógio: (hora)じ です. Pode incluir os minutos: 〜ふん / 〜ぷん.'], ex: 'A professora quer saber a hora real de agora (pelo relógio do seu aparelho).' } },
    { id: 't2', say: [{ jp: 'きょうは なんようびですか。', ro: 'kyou wa nan\'youbi desu ka.', pt: 'Que dia da semana é hoje?' }],
      ask: { b: [{ f: [{ jp: DJ[w] + 'です。', ro: DAYS[w] + ' desu.', pt: 'Hoje é ' + DP[w] + '.', reg: 'p', uses: ['c4l8'], alt: ['(kyou wa )?' + DAYS[w].replace("'", '') + '( desu)?'] }], r: [{ jp: 'そうですね。' + DJ[w] + 'も がんばりましょう！', ro: 'sou desu ne. ' + DAYS[w] + ' mo ganbarimashou!', pt: 'Isso. Vamos nos esforçar nesta ' + DP[w] + ' também!' }], tag: 'dia' }],
        near: [{ p: DAYS.filter((_, i) => i !== w).map(x => '(kyou wa )?' + x.replace("'", '') + '( desu)?'), kind: 'vocab', why: 'Hoje é ' + DP[w] + ': ' + DJ[w] + ' (' + DAYS[w] + ').' }],
        h: ['げつ (seg), か (ter), すい (qua), もく (qui), きん (sex), ど (sáb), にち (dom) + ようび', '(dia)ようび です.'] } }
  ] };
}
/* Quanto ficou: preço aleatório falado pelo Takeshi; o aluno confirma repetindo o valor */
function chBuildPrice() {
  const items = [['ノート', 'nooto', 'caderno'], ['ボールペン', 'boorupen', 'caneta'], ['かさ', 'kasa', 'guarda-chuva'], ['おかし', 'okashi', 'doce'], ['おちゃ', 'ocha', 'chá']];
  const it = pick(items), n = (2 + Math.floor(Math.random() * 8)) * 100 + (Math.random() < .6 ? Math.floor(Math.random() * 10) * 10 : 0);
  const p = chYen(n);
  return { ctx: { price: p }, nodes: [
    { id: 'p1', say: [{ jp: 'こちらの ' + it[0] + 'は ' + p.jp + 'で ございます。', ro: 'kochira no ' + it[1] + ' wa ' + p.ro + ' de gozaimasu.', pt: 'Este(a) ' + it[2] + ' custa ' + p.pt + '.' }],
      ask: { b: [{ f: [{ jp: p.jp + 'ですね。', ro: p.ro + ' desu ne.', pt: p.pt + ', certo?', reg: 'p', uses: ['c1l2'], alt: [chNumRo(n) + ' en( desu ne| desu ka| desu)?', chNumRo(n) + '( en)?'] }], r: [{ jp: 'はい、さようで ございます。', ro: 'hai, sayou de gozaimasu.', pt: 'Sim, exatamente.' }], tag: 'entendeu' }], dynWrong: 'priceWrong',
        h: ['ひゃく = 100 · にひゃく = 200 · さんびゃく = 300 · ろっぴゃく = 600 · はっぴゃく = 800', 'Repita o preço para confirmar: (preço)えん ですね. Pode digitar em algarismos: “' + n + 'えん”.'], ex: 'O Takeshi disse o preço. Confirme repetindo o valor (pode digitar em números).' } },
    { id: 'p2', say: [{ jp: 'ありがとう ございました！', ro: 'arigatou gozaimashita!', pt: 'Muito obrigado!' }] }
  ] };
}
