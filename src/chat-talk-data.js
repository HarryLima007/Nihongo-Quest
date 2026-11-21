/* ==========================================================
   NIHONGO CHAT 5.0 — conversa livre: personalidade, reações e assuntos
   Cada fala é escrita como 'japonês|romaji|português'.
   Uma "resposta" é uma fala ou uma lista de falas (vários balões).
   '#emoção' = o personagem manda uma figurinha (joy, laugh, surprise, shy,
   doubt, sad, excited, celebrate, approve, confused).
   { r: resposta, ex: expectativa, teach: [expressões], tip: nota, set: [fatos], end: true }
   ex = o que o personagem acabou de perguntar e como ele reage a cada intenção:
   { k: 'state'|'yn'|'open', on: { intenção: [variações] }, back: resposta para “e você?” / “por quê?”,
     cap: true (aceita uma resposta curta livre, ex.: um nome), sugg: ['jp|ro|pt|lições'] }
   Não é IA generativa: são roteiros com reconhecimento de intenção e contexto.
   ========================================================== */
const TALK = (function () {
  const TOD = (manha, tarde, noite, o) => Object.assign({ tod: { manha, tarde, noite } }, o || {});

  /* ================= REN — amigo próximo ================= */
  const ren = {
    style: { base: 320, per: 20, jit: 380, max: 2100, gap: 260, stk: 0.5 },
    pivot: ['そういえば さ、|sou ieba sa,|Falando nisso…', 'あ、そうだ！|a, sou da!|Ah, é mesmo!', 'てか きいて！|teka kiite!|Escuta essa!'],
    unknown: ['ん？ もう一回 言って くれる？|n? mou ikkai itte kureru?|Hã? Pode falar mais uma vez?', 'ごめん、いまの よく わかんなかった（笑）。もう一回！|gomen, ima no yoku wakannakatta (wara). mou ikkai!|Foi mal, não entendi direito (risos). De novo!', 'え？ どういう こと？|e? dou iu koto?|Hein? Como assim?'],
    unknown2: [['あはは、ごめん！ おれの にほんごりょくが たりない（笑）|ahaha, gomen! ore no nihongoryoku ga tarinai (wara)|Haha, foi mal! Faltou japonês da minha parte (risos)', '#confused']],
    state: { k: 'state', on: {
      good: ['よかった！|yokatta!|Que bom!', ['いいね〜！|ii ne~!|Boa!', '#approve'], 'お、げんきそうじゃん！|o, genki sou jan!|Opa, tá animado(a), hein!'],
      meh: ['まあまあ か〜。そういう ひも あるよな。|maa maa ka~. sou iu hi mo aru yo na.|Mais ou menos, é? Tem dias assim.'],
      bad: [['え、だいじょうぶ？|e, daijoubu?|Eita, tá tudo bem?', 'むりすんなよ。|muri sunna yo.|Não exagera, hein.']],
      tired: ['おつかれ〜。きょうは はやく ねなよ。|otsukare~. kyou wa hayaku ne na yo.|Cansou, né? Hoje dorme cedo.'],
      sleepy: [['わかる〜。おれも ねむい（笑）|wakaru~. ore mo nemui (wara)|Te entendo. Eu também tô com sono (risos)', '#laugh']],
      hungry: ['おなか すいてんの？（笑） なにか たべなよ！|onaka suiten no? (wara) nanika tabe na yo!|Tá com fome? (risos) Vai comer alguma coisa!'],
      same: ['おー、おなじだ！|oo, onaji da!|Opa, igual!'],
      yes: ['よかった！|yokatta!|Que bom!'], no: [['え、マジ？ だいじょうぶ？|e, maji? daijoubu?|Eita, sério? Tá tudo bem?']]
    }, sugg: ['げんき！|genki!|Tô bem!|chat:genki', 'まあまあ。|maa maa.|Mais ou menos.|chat:maamaa', 'つかれた…|tsukareta…|Tô cansado(a)…|c8l3'] },
    react: {
      greet: [TOD('おはよ！ はやいじゃん！|ohayo! hayai jan!|Bom dia! Acordou cedo, hein!', 'よっ、{name}！|yo, {name}!|E aí, {name}!', 'おう、こんばんは〜！|ou, konbanwa~!|Opa, boa noite!'),
        { r: [TOD('おはよー。まだ ねむい…（笑）|ohayoo. mada nemui… (wara)|Bom diaa. Ainda tô com sono… (risos)', 'おっす！|ossu!|Fala!', 'おー、{name}！|oo, {name}!|Ô, {name}!'), 'げんき？|genki?|Tudo bem?'], ex: 'state' }],
      nice: [['よろしく！|yoroshiku!|Prazer!', '#joy']],
      howareyou: [{ r: ['げんき げんき！|genki genki!|Tô bem, tô bem!', '{name}は？|{name} wa?|E você?'], ex: 'state' },
        { r: ['まあまあ かな。|maa maa kana.|Mais ou menos.', 'きのう ねるの おそかった（笑）。{name}は？|kinou neru no osokatta (wara). {name} wa?|Dormi tarde ontem (risos). E você?'], ex: 'sleep' }],
      good: ['よかった！|yokatta!|Que bom!', 'いいじゃん！|ii jan!|Boa!'],
      meh: ['まあまあ か〜。|maa maa ka~.|Mais ou menos, é?'],
      bad: [['え、どうした？|e, dou shita?|Eita, o que houve?', 'なんか あったら いえよ。|nanka attara ie yo.|Se precisar, fala comigo.']],
      tired: ['おつかれ〜。むりしないで、やすんでね。|otsukare~. muri shinaide, yasunde ne.|Cansou, né? Não exagera, descansa.'],
      sleepy: ['ねむい ときは ねる！ これ だいじ（笑）|nemui toki wa neru! kore daiji (wara)|Com sono, vai dormir! Isso é importante (risos)'],
      hungry: [['おれも！ ラーメン いこうぜ！|ore mo! raamen ikou ze!|Eu também! Bora comer lámen!', '#excited']],
      same: ['おー、おなじだね！|oo, onaji da ne!|Opa, igual!', 'なかまだ！（笑）|nakama da! (wara)|Somos dois! (risos)'],
      yes: ['だよな！|da yo na!|Né!', 'うん うん！|un un!|Isso aí!'],
      no: ['そっか〜。|sokka~.|Ah, entendi.', 'え、そうなの？|e, sou na no?|Ué, é mesmo?'],
      laugh: ['#laugh', 'だろ？（笑）|daro? (wara)|Né? (risos)', 'わらった？ よし！（笑）|waratta? yoshi! (wara)|Riu? Boa! (risos)'],
      ack: ['そう そう！|sou sou!|Pois é!', 'だよね〜。|da yo ne~.|Né?', 'うん。|un.|Uhum.'],
      surprise: ['マジ マジ！|maji maji!|Sério, sério!', 'ほんと だって！（笑）|honto da tte! (wara)|É verdade! (risos)'],
      praise: [['だろ？（笑）|daro? (wara)|Né não? (risos)', '#excited'], 'へへ、ありがと！|hehe, arigato!|Hehe, valeu!'],
      yay: [['いえーい！|ieei!|Uhuuu!', '#celebrate']],
      congrats: [['サンキュー！|sankyuu!|Valeu!', '#celebrate']],
      sympathy: ['ありがと。まあ、なんとか なるっしょ！|arigato. maa, nantoka narussho!|Valeu. Ah, vai dar tudo certo!'],
      thanks: ['いいって いいって！|ii tte ii tte!|Que nada!', 'おう！|ou!|Tranquilo!'],
      sorry: ['きに すんなって！|ki ni sunna tte!|Esquenta não!', 'ぜんぜん へいき！|zenzen heiki!|Relaxa, de boa!'],
      okay: ['よし！|yoshi!|Fechado!', 'オッケー！|okkee!|Beleza!'],
      decline: ['りょうかい！ また こんど な。|ryoukai! mata kondo na.|Beleza! Fica pra próxima.'],
      bye: [{ r: TOD('じゃあな！ きょうも がんばれ！|jaa na! kyou mo ganbare!|Falou! Boa sorte hoje!', 'じゃあな！ また はなそう！|jaa na! mata hanasou!|Falou! Depois a gente conversa!', 'おやすみ〜！ また あした！|oyasumi~! mata ashita!|Boa noite! Até amanhã!'), end: true }],
      askback: ['おれ？ げんき げんき！|ore? genki genki!|Eu? Tô ótimo!', 'おれは いつもどおり ゲームばっか（笑）|ore wa itsumo doori geemu bakka (wara)|Eu? O de sempre, só jogando (risos)'],
      why: ['なんとなく！（笑）|nantonaku! (wara)|Sei lá, porque sim! (risos)'],
      whatdoing: [{ r: ['ゲーム してた！ いま いい ところ！|geemu shiteta! ima ii tokoro!|Tava jogando! Tá na parte boa!', '{name}は なに してた？|{name} wa nani shiteta?|E você, tava fazendo o quê?'], ex: 'open' }, 'アニメ みてた。「ほしの ゆうしゃ」の さいしんわ！|anime miteta. "Hoshi no Yuusha" no saishinwa!|Tava vendo anime. O episódio novo de “Hoshi no Yuusha”!'],
      likesq: [{ r: 'ゲームと アニメと ラーメン！ ぜんぶ だいすき！ {name}は？|geemu to anime to raamen! zenbu daisuki! {name} wa?|Games, anime e lámen! Amo tudo! E você?', ex: 'likes' }],
      ilike: ['{like}！ いいね〜！|{like}! ii ne~!|{like}! Que legal!', 'へえ、{like}か！ おれも けっこう すき！|hee, {like} ka! ore mo kekkou suki!|Hmm, {like}! Eu também curto!'],
      dislike: ['そっか〜、にがて なんだ。|sokka~, nigate nan da.|Ah, não curte muito, né.'],
      recommend: ['「ほしの ゆうしゃ」！ ぜったい みて！|"Hoshi no Yuusha"! zettai mite!|“Hoshi no Yuusha”! Assiste, sério!'],
      weather: ['だよね〜。そとで あそびたく なる！|da yo ne~. soto de asobitaku naru!|Né? Dá vontade de sair!'],
      studying: [['えらい！ おれも しゅくだい やらなきゃ…|erai! ore mo shukudai yaranakya…|Mandou bem! Eu também preciso fazer a lição…', '#approve']],
      want: ['いいね、それ！|ii ne, sore!|Boa, hein!'],
      question: ['うーん、むずかしい しつもん（笑）|uun, muzukashii shitsumon (wara)|Hmm, pergunta difícil (risos)'],
      some: ['ときどき か〜。いいじゃん。|tokidoki ka~. ii jan.|De vez em quando? Tá ótimo.'],
      dontknow: ['だいじょうぶ、だいじょうぶ！|daijoubu, daijoubu!|Tranquilo, tranquilo!']
    },
    ex: {
      sleep: { k: 'state', on: {
        same: [['マジ？ なかまだ！（笑）|maji? nakama da! (wara)|Sério? Somos dois! (risos)', 'ねむい どうし、がんばろうぜ。|nemui doushi, ganbarou ze.|Bora aguentar firme, dupla do sono.'], ['え、{name}も？（笑）|e, {name} mo? (wara)|Ué, você também? (risos)', '#laugh']],
        sleepy: [['わかる〜、ねむいよな（笑）|wakaru~, nemui yo na (wara)|Te entendo, que sono (risos)', '#laugh']],
        tired: ['おたがい おつかれ だな（笑）|otagai otsukare da na (wara)|Estamos os dois cansados (risos)'],
        good: ['え、いいな〜！ ちゃんと ねたんだ。|e, ii na~! chanto neta n da.|Ah, que inveja! Você dormiu direitinho.'],
        no: ['はやく ねたの？ えらい！|hayaku neta no? erai!|Dormiu cedo? Mandou bem!'],
        bad: [['え、だいじょうぶ？ むりすんなよ。|e, daijoubu? muri sunna yo.|Eita, tá tudo bem? Não exagera.']],
        laugh: ['わらうなって〜（笑）|warau na tte~ (wara)|Não ri! (risos)'],
        why: ['ゲームが おわらなくて…（笑）|geemu ga owaranakute… (wara)|O jogo não acabava… (risos)']
      }, back: 'ゲームが おわらなくて…（笑）|geemu ga owaranakute… (wara)|O jogo não acabava… (risos)',
        sugg: ['わたしも。|watashi mo.|Eu também.|', 'げんき！|genki!|Tô bem!|chat:genki', 'ねむい…|nemui…|Tô com sono…|chat:nemui'] },
      likes: { k: 'open', on: {
        same: ['だよな！ やっぱ さいこう！|da yo na! yappa saikou!|Né! É o melhor!'],
        ilike: ['{like}！ いいね〜！ こんど いっしょに はなそうぜ。|{like}! ii ne~! kondo issho ni hanasou ze.|{like}! Demais! Depois a gente conversa sobre isso.']
      }, cap: true, any: ['{*}か！ いいじゃん！|{*} ka! ii jan!|{*}! Boa!'], sugg: ['アニメが すき！|anime ga suki!|Gosto de anime!|c4l6,c5l7', 'わたしも ゲームが すき。|watashi mo geemu ga suki.|Eu também gosto de games.|c4l6,c5l7'] },
      open: { k: 'open', on: { same: ['おなじ じゃん！（笑）|onaji jan! (wara)|Igualzinho! (risos)'] }, cap: true, any: ['へえ、{*}！ いいね。|hee, {*}! ii ne.|Hmm, {*}! Legal.'] }
    },
    topics: [
      { id: 'intro', intro: true, steps: [
        { say: [TOD('おはよ！ はじめまして！|ohayo! hajimemashite!|Bom dia! Prazer!', 'よっ！ はじめまして！|yo! hajimemashite!|E aí! Prazer!', 'こんばんは〜！ はじめまして！|konbanwa~! hajimemashite!|Boa noite! Prazer!'), 'おれ、レン。よろしく！|ore, Ren. yoroshiku!|Eu sou o Ren. Prazer!'],
          ex: { k: 'open', on: { nice: ['うん！|un!|Valeu!'], greet: ['うん、よろしく！|un, yoroshiku!|Isso, prazer!'] }, any: ['うん！|un!|Valeu!'], sugg: ['よろしく！|yoroshiku!|Prazer!|c1l3', 'はじめまして。|hajimemashite.|Muito prazer.|c1l3'] } },
        { say: '{name}って いうんだよね？ ゲームと アニメ、すき？|{name} tte iu n da yo ne? geemu to anime, suki?|Você é o(a) {name}, né? Curte games e anime?',
          ex: { k: 'yn', on: { yes: [['マジ？ やった！ はなし あいそう！|maji? yatta! hanashi aisou!|Sério? Oba! Vamos nos dar bem!', '#excited']], ilike: [['マジ？ やった！ はなし あいそう！|maji? yatta! hanashi aisou!|Sério? Oba! Vamos nos dar bem!', '#excited']], no: ['そっか！ じゃあ ほかの はなしも しようぜ。|sokka! jaa hoka no hanashi mo shiyou ze.|Beleza! Então a gente conversa sobre outras coisas.'], some: ['ちょっと？ じゅうぶん！（笑）|chotto? juubun! (wara)|Um pouco? Já tá ótimo! (risos)'] },
            any: ['そっか！|sokka!|Saquei!'], sugg: ['うん、すき！|un, suki!|Curto, sim!|c4l6', 'ちょっと。|chotto.|Um pouco.|', 'ううん。|uun.|Não muito.|'] }, teach: ['maji'] },
        { say: [{ r: 'これから よろしくな！ いつでも メッセージ してね。|kore kara yoroshiku na! itsu demo messeeji shite ne.|Conto com você! Me manda mensagem quando quiser.' }, '#joy'], end: true, set: ['ren:met'] }
      ] },
      { id: 'game', steps: [
        { say: ['ねえ ねえ、きいて！|nee nee, kiite!|Ei, escuta só!', 'きのう ゲームで やっと かった！|kinou geemu de yatto katta!|Ontem finalmente ganhei no jogo!'],
          ex: { k: 'open', on: {
            praise: [['だろ？ さいこうだった！|daro? saikou datta!|Né? Foi demais!', '#excited']], congrats: [['サンキュー！ がんばった かいが あった！|sankyuu! ganbatta kai ga atta!|Valeu! Valeu a pena o esforço!', '#celebrate']],
            yay: [['いえーい！|ieei!|Uhuuu!', '#celebrate']], surprise: ['ほんと！ 3かい まけてから やっと！|honto! sankai makete kara yatto!|Sério! Depois de perder 3 vezes, finalmente!'],
            laugh: ['わらうなよ〜（笑） ほんとに むずかしかったんだって！|warau na yo~ (wara). honto ni muzukashikatta n da tte!|Não ri! Foi difícil de verdade!'],
            ack: ['そう！ 3かい まけてから やっと！|sou! sankai makete kara yatto!|Isso! Depois de perder 3 vezes, finalmente!'],
            same: ['{name}も かったの？ すげえ！|{name} mo katta no? sugee!|Você também ganhou? Que massa!'], why: ['れんしゅう しまくった！（笑）|renshuu shimakutta! (wara)|Treinei pra caramba! (risos)'] },
            back: 'かくとうゲーム！ キャラが かっこいいんだよ。|kakutou geemu! kyara ga kakkoii n da yo.|Jogo de luta! Os personagens são muito estilosos.', any: ['へへっ。|hehe.|Hehe.'] }, teach: ['kakkoii'] },
        { say: '{name}は ゲーム する？|{name} wa geemu suru?|E você, joga videogame?',
          ex: { k: 'yn', on: { yes: ['マジ？ こんど いっしょに やろうぜ！|maji? kondo issho ni yarou ze!|Sério? Bora jogar junto qualquer dia!'], ilike: ['マジ？ こんど いっしょに やろうぜ！|maji? kondo issho ni yarou ze!|Sério? Bora jogar junto qualquer dia!'],
            no: ['そっか〜。じゃあ こんど おしえて あげる！（笑）|sokka~. jaa kondo oshiete ageru! (wara)|Ah, entendi. Então um dia eu te ensino! (risos)'], some: ['ときどき？ じゃあ こんど たいせん しよう！|tokidoki? jaa kondo taisen shiyou!|De vez em quando? Então bora disputar uma partida!'] },
            sugg: ['うん、する！|un, suru!|Jogo, sim!|', 'ときどき。|tokidoki.|De vez em quando.|', 'ううん、しない。|uun, shinai.|Não jogo.|'] } }
      ] },
      { id: 'ramen', steps: [
        { say: ['あー、ラーメン たべたい…|aa, raamen tabetai…|Aaah, quero comer lámen…', '{name}は ラーメン すき？|{name} wa raamen suki?|Você gosta de lámen?'],
          ex: { k: 'yn', on: { yes: [['だよね！ やっぱ とんこつ さいこう！|da yo ne! yappa tonkotsu saikou!|Né! Tonkotsu é o melhor!', '#excited']], same: [['だよね！ やっぱ とんこつ さいこう！|da yo ne! yappa tonkotsu saikou!|Né! Tonkotsu é o melhor!', '#excited']], hungry: ['だよな！ おなか すいた〜！|da yo na! onaka suita~!|Né! Que fome!'],
            no: [{ r: 'えー、マジか（笑）。じゃあ なにが すき？|ee, maji ka (wara). jaa nani ga suki?|Quê, sério? (risos) Então do que você gosta?', ex: 'likes' }], some: ['まあまあ？ こんど おいしい みせ おしえるよ！|maa maa? kondo oishii mise oshieru yo!|Mais ou menos? Um dia te levo num lugar bom!'] },
            back: 'おれは みそラーメンも すき！|ore wa miso raamen mo suki!|Eu também gosto de lámen de missô!', sugg: ['うん、すき！|un, suki!|Gosto, sim!|c4l6', 'わたしも たべたい！|watashi mo tabetai!|Eu também quero comer!|c6l3', 'ううん。|uun.|Não muito.|'] } }
      ] },
      { id: 'anime', steps: [
        { say: ['さいきん「ほしの ゆうしゃ」って アニメ みてる。|saikin "Hoshi no Yuusha" tte anime miteru.|Ultimamente tô vendo um anime chamado “Hoshi no Yuusha”.', 'マジで おもしろい！|maji de omoshiroi!|É muito bom, sério!'],
          ex: { k: 'open', on: { ack: ['しゅじんこうが かっこいいんだよ。|shujinkou ga kakkoii n da yo.|O protagonista é muito estiloso.'], surprise: ['ほんと！ しゅじんこうが かっこいいんだよ。|honto! shujinkou ga kakkoii n da yo.|Sério! O protagonista é muito estiloso.'],
            praise: ['だろ？ ドラゴンも でるんだよ！|daro? doragon mo deru n da yo!|Né? Tem até dragão!'], same: ['え、{name}も みてる？ こんど はなそうぜ！|e, {name} mo miteru? kondo hanasou ze!|Ué, você também assiste? Bora conversar sobre!'], question: ['ぼうけんの はなし！ ドラゴンも でる！|bouken no hanashi! doragon mo deru!|É uma história de aventura! Tem até dragão!'] },
            back: 'ぼうけんの はなし！ ドラゴンも でる！|bouken no hanashi! doragon mo deru!|É uma história de aventura! Tem até dragão!', any: ['へへ、こんど いっしょに みよう！|hehe, kondo issho ni miyou!|Hehe, um dia a gente assiste junto!'] }, teach: ['maji'] },
        { say: '{name}の おすすめ アニメ、おしえて！|{name} no osusume anime, oshiete!|Me indica um anime!',
          ex: { k: 'open', on: { dontknow: ['まだ ない？ じゃあ 「ほしの ゆうしゃ」から！（笑）|mada nai? jaa "Hoshi no Yuusha" kara! (wara)|Ainda não tem? Então começa por “Hoshi no Yuusha”! (risos)'], no: ['まだ ない？ じゃあ 「ほしの ゆうしゃ」から！（笑）|mada nai? jaa "Hoshi no Yuusha" kara! (wara)|Ainda não tem? Então começa por “Hoshi no Yuusha”! (risos)'] },
            cap: true, any: [['「{*}」？ メモった！ みて みる！|"{*}"? memotta! mite miru!|“{*}”? Anotei! Vou assistir!', '#approve']], sugg: ['わからない。|wakaranai.|Não sei.|'] }, teach: ['osusume'] }
      ] },
      { id: 'train', steps: [
        { say: ['きょう でんしゃで ねちゃって…|kyou densha de nechatte…|Hoje eu dormi no trem…', 'えきを すぎた（笑）|eki o sugita (wara)|E passei da estação (risos)'],
          ex: { k: 'open', on: { laugh: [['わらいごとじゃ ないって！（笑）|waraigoto ja nai tte! (wara)|Não tem graça! (risos)', '#laugh']], sympathy: ['だろ？ さいあく…でも ちょっと おもしろい（笑）|daro? saiaku… demo chotto omoshiroi (wara)|Né? Péssimo… mas meio engraçado (risos)'],
            surprise: ['ほんと！ 30ぷんも おくれた（笑）|honto! sanjuppun mo okureta (wara)|Sério! Atrasei 30 minutos (risos)'], same: [{ r: 'え、{name}も ある？ あるある だよね！|e, {name} mo aru? aruaru da yo ne!|Ué, já aconteceu com você? Clássico, né!', teach: ['aruaru'] }], ack: ['ねむかったんだよ〜。|nemukatta n da yo~.|Eu tava com muito sono.'] },
            back: 'ゲームで よふかし したから…（笑）|geemu de yofukashi shita kara… (wara)|Porque fiquei acordado jogando… (risos)', any: ['まあ、つぎは きを つける！|maa, tsugi wa ki o tsukeru!|Bom, da próxima vez eu tomo cuidado!'] } }
      ] },
      { id: 'weekend', steps: [
        { say: 'しゅうまつ、なに する？|shuumatsu, nani suru?|O que você vai fazer no fim de semana?',
          ex: { k: 'open', on: { dontknow: ['まだ きめてない？ おれも（笑）|mada kimetenai? ore mo (wara)|Ainda não decidiu? Nem eu (risos)'], no: ['まだ きめてない？ おれも（笑）|mada kimetenai? ore mo (wara)|Ainda não decidiu? Nem eu (risos)'], studying: [['にほんご？ えらすぎ！|nihongo? erasugi!|Japonês? Que dedicação!', '#approve']], same: ['おれと おなじ じゃん！（笑）|ore to onaji jan! (wara)|Igual a mim! (risos)'] },
            back: 'おれは たぶん ずっと ゲーム（笑）|ore wa tabun zutto geemu (wara)|Eu provavelmente vou jogar o tempo todo (risos)', cap: true, any: ['{*}か〜！ いいな。|{*} ka~! ii na.|{*}, é? Que legal.'],
            sugg: ['べんきょう！|benkyou!|Estudar!|', 'まだ わからない。|mada wakaranai.|Ainda não sei.|', 'レンは？|Ren wa?|E você?|'] } }
      ] },
      { id: 'study', steps: [
        { say: 'にほんごの べんきょう、どう？|nihongo no benkyou, dou?|E o estudo de japonês, como vai?',
          ex: { k: 'state', on: { good: [['さすが！ おれより じょうずに なるかも（笑）|sasuga! ore yori jouzu ni naru kamo (wara)|Mandou bem! Vai ficar melhor que eu (risos)', '#approve']], hard: ['むずかしいよな〜。でも {name}、ちゃんと はなせてるよ！|muzukashii yo na~. demo {name}, chanto hanaseteru yo!|É difícil, né? Mas você tá falando direitinho!'],
            bad: ['むずかしいよな〜。でも {name}、ちゃんと はなせてるよ！|muzukashii yo na~. demo {name}, chanto hanaseteru yo!|É difícil, né? Mas você tá falando direitinho!'], meh: ['まあまあ？ じゅうぶん すごいって！|maa maa? juubun sugoi tte!|Mais ou menos? Já é incrível!'], yes: ['いいね！ その ちょうし！|ii ne! sono choushi!|Boa! Continua assim!'], same: ['いいね！ その ちょうし！|ii ne! sono choushi!|Boa! Continua assim!'] },
            sugg: ['たのしい！|tanoshii!|Tá divertido!|', 'むずかしい…|muzukashii…|Tá difícil…|', 'まあまあ。|maa maa.|Mais ou menos.|chat:maamaa'] } }
      ] },
      { id: 'likes-memory', fact: 'ctx.likes', nopivot: true, steps: [
        { say: 'そういえば {name}、{likes}が すきって いってたよね。|sou ieba {name}, {likes} ga suki tte itteta yo ne.|Falando nisso, você disse que gosta de {likes}, né?',
          ex: { k: 'yn', on: { yes: [['おれも さいきん ハマってる！|ore mo saikin hamatteru!|Eu também tô viciado nisso ultimamente!', '#excited']], ilike: [['おれも さいきん ハマってる！|ore mo saikin hamatteru!|Eu também tô viciado nisso ultimamente!', '#excited']], no: ['あれ、ちがった？（笑） ごめん！|are, chigatta? (wara) gomen!|Ué, me enganei? (risos) Foi mal!'] } } }
      ] },
      { id: 'late', tod: 'noite', steps: [
        { say: 'まだ おきてる？（笑）|mada okiteru? (wara)|Ainda acordado(a)? (risos)',
          ex: { k: 'yn', on: { yes: ['なかま！ おれも ねれない…|nakama! ore mo nerenai…|Somos dois! Eu também não consigo dormir…'], same: ['なかま！ おれも ねれない…|nakama! ore mo nerenai…|Somos dois! Eu também não consigo dormir…'], sleepy: [['じゃあ もう ねよう！ おやすみ〜|jaa mou neyou! oyasumi~|Então vamos dormir! Boa noite~', '#joy']], bye: [{ r: 'おやすみ〜！ また あした！|oyasumi~! mata ashita!|Boa noite! Até amanhã!', end: true }] } } }
      ] }
    ]
  };

  /* ================= AIKO-SENSEI — professora ================= */
  const aiko = {
    style: { base: 750, per: 30, jit: 400, max: 2700, gap: 450, stk: 0.25 },
    pivot: ['ところで、|tokoro de,|A propósito…', 'そうそう、|sou sou,|Ah, sim…'],
    unknown: ['すみません、もう一度 言って くれますか。|sumimasen, mou ichido itte kuremasu ka.|Desculpe, pode dizer mais uma vez?', 'うーん、すこし わかりにくかったです。もう一度 おねがいします。|uun, sukoshi wakarinikukatta desu. mou ichido onegaishimasu.|Hum, ficou um pouco difícil de entender. Mais uma vez, por favor.'],
    unknown2: [['だいじょうぶですよ。わたしの ききとりが たりませんでした。|daijoubu desu yo. watashi no kikitori ga tarimasen deshita.|Tudo bem. Fui eu que não consegui entender.', '#doubt']],
    state: { k: 'state', on: {
      good: ['それは よかったです。|sore wa yokatta desu.|Que bom.', ['よかったです！|yokatta desu!|Que bom!', '#joy']],
      meh: ['まあまあ ですか。むりを しないで くださいね。|maa maa desu ka. muri o shinaide kudasai ne.|Mais ou menos? Não se esforce demais.'],
      bad: ['あら、だいじょうぶですか。むりは しないで くださいね。|ara, daijoubu desu ka. muri wa shinaide kudasai ne.|Ah, você está bem? Não se esforce demais.'],
      tired: ['おつかれさまです。すこし やすみましょう。|otsukaresama desu. sukoshi yasumimashou.|Bom trabalho. Vamos descansar um pouco.'],
      sleepy: ['ねむい ときは、みじかい べんきょうで いいですよ。|nemui toki wa, mijikai benkyou de ii desu yo.|Com sono, um estudo curtinho já basta.'],
      same: ['あら、わたしと おなじですね。|ara, watashi to onaji desu ne.|Ah, igual a mim.'],
      yes: ['それは よかったです。|sore wa yokatta desu.|Que bom.'], no: ['そうですか…。なにか あったら いつでも いって くださいね。|sou desu ka…. nanika attara itsu demo itte kudasai ne.|Entendo… Se precisar, é só falar.']
    }, sugg: ['げんきです。|genki desu.|Estou bem.|chat:genki', 'つかれました。|tsukaremashita.|Estou cansado(a).|c8l3', 'まあまあです。|maa maa desu.|Mais ou menos.|chat:maamaa'] },
    react: {
      greet: [TOD('おはようございます、{name}さん。|ohayou gozaimasu, {name}-san.|Bom dia, {name}.', 'こんにちは、{name}さん。|konnichiwa, {name}-san.|Olá, {name}.', 'こんばんは。おそくまで えらいですね。|konbanwa. osoku made erai desu ne.|Boa noite. Estudando até tarde, que dedicação.'),
        { r: [TOD('おはようございます。|ohayou gozaimasu.|Bom dia.', 'こんにちは。|konnichiwa.|Olá.', 'こんばんは。|konbanwa.|Boa noite.'), 'おげんきですか。|ogenki desu ka.|Como vai?'], ex: 'state' }],
      nice: ['こちらこそ、よろしく おねがいします。|kochira koso, yoroshiku onegaishimasu.|O prazer é meu.'],
      howareyou: [{ r: ['はい、げんきです。|hai, genki desu.|Estou bem, sim.', '{name}さんは？|{name}-san wa?|E você?'], ex: 'state' }, { r: ['ありがとう。すこし いそがしいですが、げんきですよ。|arigatou. sukoshi isogashii desu ga, genki desu yo.|Obrigada. Um pouco ocupada, mas bem.', '{name}さんは どうですか。|{name}-san wa dou desu ka.|E você, como está?'], ex: 'state' }],
      good: ['それは よかったです。|sore wa yokatta desu.|Que bom.'],
      meh: ['まあまあ ですか。|maa maa desu ka.|Mais ou menos?'],
      bad: ['だいじょうぶですか。むりは しないで くださいね。|daijoubu desu ka. muri wa shinaide kudasai ne.|Você está bem? Não se esforce demais.'],
      tired: ['むりを しないで くださいね。すこし やすみましょう。|muri o shinaide kudasai ne. sukoshi yasumimashou.|Não se esforce demais. Vamos descansar um pouco.'],
      sleepy: ['きょうは はやめに やすんで くださいね。|kyou wa hayame ni yasunde kudasai ne.|Hoje descanse mais cedo, está bem?'],
      hungry: ['もう すぐ ごはんの じかんですね。|mou sugu gohan no jikan desu ne.|Já está quase na hora de comer.'],
      same: ['おなじですね。|onaji desu ne.|Igual, então.', 'あら、わたしもです。|ara, watashi mo desu.|Ah, eu também.'],
      yes: ['はい。|hai.|Certo.', 'そうですか。|sou desu ka.|Entendo.'],
      no: ['そうですか。|sou desu ka.|Entendo.'],
      laugh: ['ふふっ。|fufu.|Hihi.', '#laugh'],
      ack: ['ええ。|ee.|Sim.', 'そうなんです。|sou nan desu.|Pois é.'],
      surprise: ['ほんとうですよ。|hontou desu yo.|É verdade.'],
      praise: [['ありがとうございます。うれしいです。|arigatou gozaimasu. ureshii desu.|Obrigada. Fico feliz.', '#joy']],
      yay: [['よかったですね！|yokatta desu ne!|Que ótimo!', '#celebrate']],
      congrats: ['ありがとうございます。|arigatou gozaimasu.|Muito obrigada.'],
      sympathy: ['やさしいですね。ありがとう。|yasashii desu ne. arigatou.|Que gentil. Obrigada.'],
      thanks: ['どういたしまして。|dou itashimashite.|De nada.'],
      sorry: ['だいじょうぶですよ。きに しないで ください。|daijoubu desu yo. ki ni shinaide kudasai.|Tudo bem. Não se preocupe.'],
      okay: [['はい、その ちょうしです。|hai, sono choushi desu.|Isso, continue assim.', '#approve']],
      decline: ['わかりました。また こんど にしましょう。|wakarimashita. mata kondo ni shimashou.|Certo. Fica para a próxima.'],
      bye: [{ r: TOD('はい、いってらっしゃい。|hai, itterasshai.|Certo, bom dia e até mais.', 'では、また。おつかれさまでした。|dewa, mata. otsukaresama deshita.|Até mais. Bom trabalho hoje.', 'おやすみなさい。また あした。|oyasumi nasai. mata ashita.|Boa noite. Até amanhã.'), end: true }],
      askback: ['わたしですか。げんきですよ。ありがとう。|watashi desu ka. genki desu yo. arigatou.|Eu? Estou bem. Obrigada.'],
      why: ['いい しつもんですね。こんど ゆっくり せつめい しますね。|ii shitsumon desu ne. kondo yukkuri setsumei shimasu ne.|Boa pergunta. Depois explico com calma.'],
      whatdoing: ['じゅぎょうの じゅんびを して います。|jugyou no junbi o shite imasu.|Estou preparando a aula.'],
      likesq: ['わたしは ほんを よむのが すきです。とくに むかしばなしが すきです。|watashi wa hon o yomu no ga suki desu. toku ni mukashibanashi ga suki desu.|Gosto de ler livros. Principalmente contos antigos.'],
      ilike: ['{like}ですか。すてきですね。|{like} desu ka. suteki desu ne.|{like}? Que bacana.'],
      dislike: ['だれにでも にがてな ものは ありますよ。|dare ni demo nigate na mono wa arimasu yo.|Todo mundo tem algo de que não gosta.'],
      recommend: ['まいにち こえに だして よむのが おすすめです。|mainichi koe ni dashite yomu no ga osusume desu.|Recomendo ler em voz alta todos os dias.'],
      weather: ['そうですね。べんきょうびよりですね。|sou desu ne. benkyou biyori desu ne.|Pois é. Um ótimo dia para estudar.'],
      studying: [['すばらしいです！ まいにち すこしずつ が だいじです。|subarashii desu! mainichi sukoshizutsu ga daiji desu.|Maravilhoso! O importante é um pouco todo dia.', '#approve']],
      want: ['いいですね。|ii desu ne.|Que bom.'],
      question: ['いい しつもんですね。|ii shitsumon desu ne.|Boa pergunta.'],
      some: ['ときどき でも だいじょうぶですよ。|tokidoki demo daijoubu desu yo.|Mesmo de vez em quando, tudo bem.'],
      dontknow: ['だいじょうぶですよ。いっしょに かんがえましょう。|daijoubu desu yo. issho ni kangaemashou.|Tudo bem. Vamos pensar juntos.']
    },
    ex: {},
    topics: [
      { id: 'intro', intro: true, steps: [
        { say: ['はじめまして。にほんごの せんせいの あいこです。|hajimemashite. nihongo no sensei no Aiko desu.|Muito prazer. Sou Aiko, professora de japonês.', '{name}さん ですね。よろしく おねがいします。|{name}-san desu ne. yoroshiku onegaishimasu.|Você é o(a) {name}, certo? Muito prazer.'],
          ex: { k: 'open', on: { nice: [['こちらこそ。|kochira koso.|O prazer é meu.', '#joy']], greet: ['こちらこそ、よろしく おねがいします。|kochira koso, yoroshiku onegaishimasu.|O prazer é meu.'], yes: ['こちらこそ、よろしく おねがいします。|kochira koso, yoroshiku onegaishimasu.|O prazer é meu.'] }, any: ['こちらこそ、よろしく おねがいします。|kochira koso, yoroshiku onegaishimasu.|O prazer é meu.'],
            sugg: ['よろしく おねがいします。|yoroshiku onegaishimasu.|Muito prazer.|c1l3', 'はじめまして。|hajimemashite.|Muito prazer.|c1l3'] } },
        { say: ['ここでは、ゆっくり にほんごで はなしましょう。|koko de wa, yukkuri nihongo de hanashimashou.|Aqui, vamos conversar em japonês com calma.', 'まちがえても だいじょうぶですよ。|machigaete mo daijoubu desu yo.|Tudo bem errar.'],
          tip: { jp: 'まちがえても だいじょうぶ', ro: 'machigaete mo daijoubu', pt: 'Tudo bem errar.', why: 'Com a Aiko-sensei, use a forma educada (です/ます). Ela é sua professora, então o natural é falar com respeito.' },
          ex: { k: 'open', on: { yes: [['はい。いっしょに がんばりましょう。|hai. issho ni ganbarimashou.|Isso. Vamos nos esforçar juntos.', '#approve']], okay: [['はい。いっしょに がんばりましょう。|hai. issho ni ganbarimashou.|Isso. Vamos nos esforçar juntos.', '#approve']], thanks: [['どういたしまして。いっしょに がんばりましょう。|dou itashimashite. issho ni ganbarimashou.|De nada. Vamos nos esforçar juntos.', '#approve']] }, any: ['いっしょに がんばりましょう。|issho ni ganbarimashou.|Vamos nos esforçar juntos.'], sugg: ['はい、おねがいします。|hai, onegaishimasu.|Sim, por favor.|c1l3', 'ありがとうございます。|arigatou gozaimasu.|Muito obrigado(a).|c1l3'] },
          end: true, set: ['aiko:met'] }
      ] },
      { id: 'progress', dyn: 'aikoProgress', steps: [
        { say: { dyn: 'aikoProgress' },
          ex: { k: 'yn', on: { yes: ['だいじょうぶですよ。すこしずつ ふくしゅう しましょう。|daijoubu desu yo. sukoshizutsu fukushuu shimashou.|Tudo bem. Vamos revisar aos pouquinhos.'], bad: ['だいじょうぶですよ。すこしずつ ふくしゅう しましょう。|daijoubu desu yo. sukoshizutsu fukushuu shimashou.|Tudo bem. Vamos revisar aos pouquinhos.'],
            no: [['すばらしいです！ その ちょうしです。|subarashii desu! sono choushi desu.|Maravilhoso! Continue assim.', '#approve']], good: [['すばらしいです！ その ちょうしです。|subarashii desu! sono choushi desu.|Maravilhoso! Continue assim.', '#approve']], some: ['すこし ですね。じゃあ、そこを ゆっくり ふくしゅう しましょう。|sukoshi desu ne. jaa, soko o yukkuri fukushuu shimashou.|Um pouco, então. Vamos revisar essa parte com calma.'] },
            sugg: ['はい、すこし。|hai, sukoshi.|Sim, um pouco.|c1l3', 'いいえ、だいじょうぶです。|iie, daijoubu desu.|Não, tudo bem.|c1l4'] } }
      ] },
      { id: 'tea', steps: [
        { say: ['きょうは あたたかい おちゃを のんで います。|kyou wa atatakai ocha o nonde imasu.|Hoje estou tomando um chá quentinho.', '{name}さんは おちゃが すきですか。|{name}-san wa ocha ga suki desu ka.|Você gosta de chá?'],
          ex: { k: 'yn', on: { yes: ['いいですね。こんど おすすめの おちゃを おしえますね。|ii desu ne. kondo osusume no ocha o oshiemasu ne.|Que bom. Depois te indico um chá.'], same: ['いいですね。こんど おすすめの おちゃを おしえますね。|ii desu ne. kondo osusume no ocha o oshiemasu ne.|Que bom. Depois te indico um chá.'],
            no: [{ r: 'そうですか。コーヒーの ほうが すきですか。|sou desu ka. koohii no hou ga suki desu ka.|Entendo. Prefere café?', ex: { k: 'yn', on: { yes: ['わたしも ときどき のみますよ。|watashi mo tokidoki nomimasu yo.|Eu também tomo às vezes.'], no: ['ふふ、みずが いちばんですね。|fufu, mizu ga ichiban desu ne.|Hihi, água é a melhor, então.'] } } }] },
            back: 'りょくちゃが いちばん すきです。|ryokucha ga ichiban suki desu.|Chá verde é o meu preferido.', sugg: ['はい、すきです。|hai, suki desu.|Sim, gosto.|c4l6,c5l7', 'いいえ、あまり。|iie, amari.|Não muito.|c5l4'] } }
      ] },
      { id: 'naruhodo', steps: [
        { say: ['そうそう、ひとつ おもしろい ことばを おしえますね。|sou sou, hitotsu omoshiroi kotoba o oshiemasu ne.|Ah, vou te ensinar uma palavra interessante.', 'にほんじんは よく「なるほど」と いいます。|nihonjin wa yoku "naruhodo" to iimasu.|Os japoneses dizem muito “naruhodo”.'], teach: ['naruhodo'],
          ex: { k: 'open', on: { ack: [['そう、それです！ じょうずですね。|sou, sore desu! jouzu desu ne.|Isso mesmo! Muito bem.', '#approve']], question: ['「わかった！」「そういう ことか」と いう いみですよ。|"wakatta!" "sou iu koto ka" to iu imi desu yo.|Quer dizer “entendi!”, “ah, então é isso”.'], why: ['「わかった！」「そういう ことか」と いう いみですよ。|"wakatta!" "sou iu koto ka" to iu imi desu yo.|Quer dizer “entendi!”, “ah, então é isso”.'], laugh: ['ふふっ。たのしい ことばでしょう？|fufu. tanoshii kotoba deshou?|Hihi. Palavra divertida, não?'] },
            any: ['なっとく した ときに つかって みて くださいね。|nattoku shita toki ni tsukatte mite kudasai ne.|Experimente usar quando algo fizer sentido.'], sugg: ['なるほど！|naruhodo!|Entendi! / Faz sentido!|chat:naruhodo', 'どういう いみですか。|dou iu imi desu ka.|O que significa?|'] } }
      ] },
      { id: 'book', steps: [
        { say: 'きのう、むかしばなしの ほんを よみました。|kinou, mukashibanashi no hon o yomimashita.|Ontem li um livro de contos antigos.',
          ex: { k: 'open', on: { ack: [{ r: 'ももたろうの はなしです。しって いますか。|momotarou no hanashi desu. shitte imasu ka.|É a história do Momotarō. Você conhece?', ex: 'momo' }], surprise: [{ r: 'ももたろうの はなしです。しって いますか。|momotarou no hanashi desu. shitte imasu ka.|É a história do Momotarō. Você conhece?', ex: 'momo' }], question: [{ r: 'ももたろうの はなしです。しって いますか。|momotarou no hanashi desu. shitte imasu ka.|É a história do Momotarō. Você conhece?', ex: 'momo' }], praise: [{ r: 'ありがとう。ももたろうの はなしです。しって いますか。|arigatou. momotarou no hanashi desu. shitte imasu ka.|Obrigada. É a história do Momotarō. Você conhece?', ex: 'momo' }] },
            any: [{ r: 'ももたろうの はなしです。しって いますか。|momotarou no hanashi desu. shitte imasu ka.|É a história do Momotarō. Você conhece?', ex: 'momo' }] } }
      ] },
      { id: 'goal', steps: [
        { say: 'にほんごで いちばん したい ことは なんですか。|nihongo de ichiban shitai koto wa nan desu ka.|O que você mais quer fazer em japonês?',
          ex: { k: 'open', on: { ilike: [['{like}ですか。すてきな もくひょうですね。|{like} desu ka. suteki na mokuhyou desu ne.|{like}? Que objetivo bonito.', '#approve']], dontknow: ['ゆっくり かんがえて くださいね。|yukkuri kangaete kudasai ne.|Pense com calma, está bem?'], want: [['すてきな もくひょうですね。おうえん して います。|suteki na mokuhyou desu ne. ouen shite imasu.|Que objetivo bonito. Estou torcendo por você.', '#approve']] },
            cap: true, any: [['すてきな もくひょうですね。おうえん して います。|suteki na mokuhyou desu ne. ouen shite imasu.|Que objetivo bonito. Estou torcendo por você.', '#approve']], back: 'わたしは、せいとが にほんで たのしく はなせる ように なって ほしいです。|watashi wa, seito ga nihon de tanoshiku hanaseru you ni natte hoshii desu.|Eu quero que meus alunos consigam conversar com alegria no Japão.',
            sugg: ['アニメを みたいです。|anime o mitai desu.|Quero ver anime.|c6l3', 'にほんに いきたいです。|nihon ni ikitai desu.|Quero ir ao Japão.|c6l3', 'わかりません。|wakarimasen.|Não sei.|c1l4'] } }
      ] },
      { id: 'teinei', need: ['c9l3'], steps: [
        { say: ['ひとつ ヒントです。|hitotsu hinto desu.|Uma dica.', 'ともだちと はなす ときは、「です」や「ます」が なくても いいですよ。|tomodachi to hanasu toki wa, "desu" ya "masu" ga nakute mo ii desu yo.|Quando falar com amigos, não precisa de “desu” nem “masu”.'],
          tip: { jp: 'げんきです。→ げんき！', ro: 'genki desu. → genki!', pt: 'Estou bem. → Tô bem!', why: 'Com amigos (Ren, Yumi), a forma casual soa natural. Com a professora e com o Takeshi, prefira です/ます.' },
          ex: { k: 'open', on: { ack: [['そう、その とおりです。|sou, sono toori desu.|Isso, exatamente.', '#approve']], yes: [['そう、その とおりです。|sou, sono toori desu.|Isso, exatamente.', '#approve']], okay: [['そう、その とおりです。|sou, sono toori desu.|Isso, exatamente.', '#approve']], question: ['わたしや おみせの ひとには、「です・ます」で はなしましょう。|watashi ya omise no hito ni wa, "desu, masu" de hanashimashou.|Comigo e com atendentes, fale com です/ます.'] }, any: ['すこしずつ なれて いきましょう。|sukoshizutsu narete ikimashou.|Vamos nos acostumar aos poucos.'] } }
      ] }
    ]
  };
  aiko.ex.momo = { k: 'yn', on: { yes: [['すごい！ よく しって いますね。|sugoi! yoku shitte imasu ne.|Que incrível! Você conhece bem.', '#surprise']], no: ['ももから うまれた おとこのこの はなしですよ。こんど いっしょに よみましょう。|momo kara umareta otoko no ko no hanashi desu yo. kondo issho ni yomimashou.|É a história de um menino que nasceu de um pêssego. Um dia lemos juntos.'], dontknow: ['ももから うまれた おとこのこの はなしですよ。こんど いっしょに よみましょう。|momo kara umareta otoko no ko no hanashi desu yo. kondo issho ni yomimashou.|É a história de um menino que nasceu de um pêssego. Um dia lemos juntos.'] },
    sugg: ['はい、しって います。|hai, shitte imasu.|Sim, conheço.|', 'いいえ、しりません。|iie, shirimasen.|Não, não conheço.|'] };

  /* ================= YUMI — colega expressiva ================= */
  const yumi = {
    style: { base: 250, per: 26, jit: 900, max: 2500, gap: 200, stk: 0.6 },
    pivot: ['あ、そうだ！|a, sou da!|Ah, é mesmo!', 'ねえ ねえ！|nee nee!|Ei, ei!', 'きいて きいて！|kiite kiite!|Escuta, escuta!'],
    unknown: ['え？ もう一回 言って？|e? mou ikkai itte?|Hã? Fala de novo?', 'ん〜？ ごめん、もう一回！|n~? gomen, mou ikkai!|Hmm? Desculpa, de novo!', 'なになに？ わかんなかった（笑）|nani nani? wakannakatta (wara)|O quê, o quê? Não entendi (risos)'],
    unknown2: [['#confused', 'ごめんね、わたしが わかんなかった！ べつの はなし しよう！|gomen ne, watashi ga wakannakatta! betsu no hanashi shiyou!|Desculpa, quem não entendeu fui eu! Vamos falar de outra coisa!']],
    state: { k: 'state', on: {
      good: [['よかった〜！|yokatta~!|Que bom!', '#joy']],
      meh: ['まあまあ か〜。あまい もの たべたら げんき でるよ！|maa maa ka~. amai mono tabetara genki deru yo!|Mais ou menos? Comer um docinho anima!'],
      bad: [['えー、だいじょうぶ？|ee, daijoubu?|Ah não, tá tudo bem?', '#sad']],
      tired: ['おつかれ！ あまい もの たべよう！|otsukare! amai mono tabeyou!|Cansou, né? Vamos comer um docinho!'],
      sleepy: ['ねむいよね〜。わたしも あくび とまらない（笑）|nemui yo ne~. watashi mo akubi tomaranai (wara)|Que sono, né? Eu também não paro de bocejar (risos)'],
      hungry: ['わたしも！ パン たべたい〜。|watashi mo! pan tabetai~.|Eu também! Quero pão!'],
      same: [['おそろい だね！|osoroi da ne!|Combinamos!', '#joy']],
      yes: ['よかった〜！|yokatta~!|Que bom!'], no: ['えー、どうしたの？|ee, dou shita no?|Ah, o que houve?']
    }, sugg: ['げんき！|genki!|Tô bem!|chat:genki', 'ねむい〜|nemui~|Tô com sono~|chat:nemui', 'わたしも！|watashi mo!|Eu também!|'] },
    react: {
      greet: [TOD('おはよ〜！|ohayo~!|Bom diaaa!', 'やっほー！|yahhoo!|Oiê!', 'こんばんは〜！ まだ おきてたんだ！|konbanwa~! mada okiteta n da!|Boa noite! Ainda acordado(a)?'),
        { r: [TOD('おはよ〜！|ohayo~!|Bom diaaa!', 'やっほー、{name}！|yahhoo, {name}!|Oiê, {name}!', 'こんばんは〜！|konbanwa~!|Boa noitee!'), 'げんき？|genki?|Tudo bem?'], ex: 'state' }],
      nice: [['よろしくね！|yoroshiku ne!|Prazer!', '#joy']],
      howareyou: [{ r: ['げんき げんき！|genki genki!|Tô ótima!', '{name}は？|{name} wa?|E você?'], ex: 'state' }, { r: ['きょうは ちょっと ねむい〜（笑）|kyou wa chotto nemui~ (wara)|Hoje tô meio com sono (risos)', '{name}は？|{name} wa?|E você?'], ex: 'state' }],
      good: [['よかった〜！|yokatta~!|Que bom!', '#joy']],
      meh: ['そっか〜。|sokka~.|Ah, entendi.'],
      bad: [['えー、だいじょうぶ？|ee, daijoubu?|Ah não, tá tudo bem?', '#sad']],
      tired: ['おつかれ！ あまい もの たべよう！|otsukare! amai mono tabeyou!|Cansou, né? Vamos comer um docinho!'],
      sleepy: ['おひるね しちゃえ〜（笑）|ohirune shichae~ (wara)|Tira uma soneca (risos)'],
      hungry: ['わたしも！ パン たべたい〜。|watashi mo! pan tabetai~.|Eu também! Quero pão!'],
      same: [['おそろい だね！|osoroi da ne!|Combinamos!', '#joy'], 'え、{name}も？ うれしい！|e, {name} mo? ureshii!|Você também? Que alegria!'],
      yes: ['だよね〜！|da yo ne~!|Né?!', 'うん うん！|un un!|Isso, isso!'],
      no: ['そっか〜！|sokka~!|Ah, tá!', 'えー、そうなんだ！|ee, sou nan da!|Ah, é mesmo?'],
      laugh: ['#laugh', 'あははっ！|ahaha!|Hahaha!', 'でしょ〜（笑）|desho~ (wara)|Né? (risos)'],
      ack: ['でしょ〜！|desho~!|Né?!', 'そうなの！|sou na no!|É isso!'],
      surprise: [['ほんと だよ！|honto da yo!|É sério!', '#surprise']],
      praise: [['えへへ、ありがと！|ehehe, arigato!|Hehe, valeu!', '#shy']],
      yay: [['やったー！|yattaa!|Ebaaa!', '#celebrate']],
      congrats: [['ありがとう〜！|arigatou~!|Obrigadaaa!', '#celebrate']],
      sympathy: ['やさしい〜。ありがと！|yasashii~. arigato!|Que fofo. Valeu!'],
      thanks: ['いえいえ！|ie ie!|Imagina!'],
      sorry: ['ぜんぜん だいじょうぶ！|zenzen daijoubu!|Tá tudo bem, sério!'],
      okay: [['やった！|yatta!|Oba!', '#excited']],
      decline: ['そっか、ざんねん！ また こんどね！|sokka, zannen! mata kondo ne!|Ah, que pena! Fica pra próxima!'],
      bye: [{ r: TOD('いってらっしゃい！ またね〜！|itterasshai! mata ne~!|Vai lá! Até mais!', 'またね〜！|mata ne~!|Até mais!', 'おやすみ〜！ いい ゆめ みてね！|oyasumi~! ii yume mite ne!|Boa noite! Sonhe bonito!'), end: true }],
      askback: ['わたし？ げんきだよ！ モチも げんき！（笑）|watashi? genki da yo! Mochi mo genki! (wara)|Eu? Tô bem! A Mochi também! (risos)'],
      why: ['え〜、なんとなく！（笑）|ee~, nantonaku! (wara)|Ah, sei lá! (risos)'],
      whatdoing: ['アニメの うたを きいてるの！|anime no uta o kiiteru no!|Tô ouvindo músicas de anime!', 'カラオケで うたう きょくを えらんでる！|karaoke de utau kyoku o eranderu!|Tô escolhendo as músicas pro karaokê!'],
      likesq: [{ r: 'うたうのと アニメ！ あと あまい もの！ {name}は？|utau no to anime! ato amai mono! {name} wa?|Cantar e anime! E doces! E você?', ex: 'likes' }],
      ilike: [['{like}！ いいね〜！|{like}! ii ne~!|{like}! Que legal!', '#excited']],
      dislike: ['そっか〜、にがて なんだね。|sokka~, nigate nan da ne.|Ah, não é muito a sua, né.'],
      recommend: ['「つきの としょかん」って アニメ、ぜったい おすすめ！|"Tsuki no Toshokan" tte anime, zettai osusume!|O anime “Tsuki no Toshokan”, super recomendo!'],
      weather: ['ね〜！|ne~!|Né?!'],
      studying: [['すごい！ いっしょに がんばろう！|sugoi! issho ni ganbarou!|Que demais! Vamos nos esforçar juntas!', '#excited']],
      want: ['いいね！ わたしも〜！|ii ne! watashi mo~!|Boa! Eu também!'],
      question: ['うーん、なんだろう？（笑）|uun, nan darou? (wara)|Hmm, o que será? (risos)'],
      some: ['ちょっとでも うれしい！|chotto demo ureshii!|Mesmo um pouco já me deixa feliz!'],
      dontknow: ['だいじょうぶ！ いっしょに かんがえよう。|daijoubu! issho ni kangaeyou.|Tranquilo! Vamos pensar juntas.']
    },
    ex: {
      likes: { k: 'open', on: { same: [['え〜、おそろい！|ee~, osoroi!|Aaah, igual!', '#excited']], ilike: [['{like}！ わかる〜！|{like}! wakaru~!|{like}! Te entendo!', '#excited']] }, cap: true, any: ['{*}！ いいね〜！|{*}! ii ne~!|{*}! Que legal!'] }
    },
    topics: [
      { id: 'intro', intro: true, steps: [
        { say: ['はじめまして！ ゆみです！|hajimemashite! Yumi desu!|Prazer! Eu sou a Yumi!', '{name}さん ですよね？ よろしく おねがいします！|{name}-san desu yo ne? yoroshiku onegaishimasu!|Você é o(a) {name}, né? Muito prazer!'],
          ex: { k: 'open', on: { nice: [['わーい、うれしい！|waai, ureshii!|Oba, que alegria!', '#joy']], greet: [['わーい、うれしい！|waai, ureshii!|Oba, que alegria!', '#joy']], yes: [['わーい、うれしい！|waai, ureshii!|Oba, que alegria!', '#joy']] }, any: ['わーい！|waai!|Oba!'], sugg: ['よろしく おねがいします。|yoroshiku onegaishimasu.|Muito prazer.|c1l3', 'はじめまして。|hajimemashite.|Muito prazer.|c1l3'] }, teach: ['ureshii'] },
        { say: 'あの…タメ口で はなしても いい？|ano… tameguchi de hanashite mo ii?|Hum… posso falar com você de forma casual?', teach: ['tameguchi'],
          ex: { k: 'yn', on: { yes: [{ r: ['やった！|yatta!|Oba!', 'じゃあ これから よろしくね！|jaa kore kara yoroshiku ne!|Então, de agora em diante, conto com você!', '#celebrate'], set: ['yumi:tame'] }], okay: [{ r: ['やった！|yatta!|Oba!', 'じゃあ これから よろしくね！|jaa kore kara yoroshiku ne!|Então, de agora em diante, conto com você!', '#celebrate'], set: ['yumi:tame'] }],
            no: ['わかりました！ じゃあ ゆっくり なかよく なりましょう！|wakarimashita! jaa yukkuri nakayoku narimashou!|Entendi! Então vamos ficar amigos aos poucos!'], decline: ['わかりました！ じゃあ ゆっくり なかよく なりましょう！|wakarimashita! jaa yukkuri nakayoku narimashou!|Entendi! Então vamos ficar amigos aos poucos!'] },
            sugg: ['うん、いいよ！|un, ii yo!|Claro, pode!|c6l5', 'はい、いいですよ。|hai, ii desu yo.|Sim, pode.|c6l2'] }, end: true, set: ['yumi:met'] }
      ] },
      { id: 'cat', steps: [
        { say: ['みて みて！ うちの ねこ、モチって いうの！|mite mite! uchi no neko, Mochi tte iu no!|Olha, olha! Minha gata se chama Mochi!', 'いま、わたしの ひざで ねてる〜|ima, watashi no hiza de neteru~|Agora ela tá dormindo no meu colo~'], teach: ['kawaii'],
          ex: { k: 'open', on: { praise: [['でしょ〜！ かわいすぎる！|desho~! kawaisugiru!|Né?! Fofa demais!', '#excited']], ack: ['でしょ〜！ しろくて まるいの！|desho~! shirokute marui no!|Né?! Ela é branquinha e redonda!'], laugh: ['でしょ〜（笑） ずっと ねてるの。|desho~ (wara). zutto neteru no.|Né? (risos) Dorme o tempo todo.'],
            same: ['え、{name}も ねこ すき？ やったー！|e, {name} mo neko suki? yattaa!|Você também gosta de gatos? Ebaaa!'], why: ['しろくて まるいから モチなの（笑）|shirokute marui kara Mochi na no (wara)|É branca e redonda, por isso Mochi (risos)'], question: ['しろくて まるいから モチなの（笑）|shirokute marui kara Mochi na no (wara)|É branca e redonda, por isso Mochi (risos)'] },
            back: 'しろくて まるいから モチなの（笑）|shirokute marui kara Mochi na no (wara)|É branca e redonda, por isso Mochi (risos)', any: ['えへへ、モチ だいすき。|ehehe, Mochi daisuki.|Hehe, amo a Mochi.'], sugg: ['かわいい！|kawaii!|Que fofa!|chat:kawaii', 'すごい！|sugoi!|Incrível!|chat:sugoi'] } },
        { say: '{name}は どうぶつ すき？|{name} wa doubutsu suki?|Você gosta de animais?',
          ex: { k: 'yn', on: { yes: ['わかる〜！ いやされるよね。|wakaru~! iyasareru yo ne.|Te entendo! Eles acalmam a gente, né.'], ilike: ['わかる〜！ いやされるよね。|wakaru~! iyasareru yo ne.|Te entendo! Eles acalmam a gente, né.'], no: ['そっか！ ひとそれぞれ だもんね。|sokka! hito sorezore da mon ne.|Ah, tá! Cada um é cada um.'], some: ['ちょっと？（笑） モチに あったら すきに なるよ！|chotto? (wara) Mochi ni attara suki ni naru yo!|Um pouco? (risos) Quando conhecer a Mochi, vai gostar!'] },
            sugg: ['うん、すき！|un, suki!|Gosto, sim!|c4l6', 'いぬが すき！|inu ga suki!|Gosto de cachorro!|c4l6', 'ううん。|uun.|Não muito.|'] } }
      ] },
      { id: 'zoo', steps: [
        { say: ['きのう どうぶつえんに いったよ！|kinou doubutsuen ni itta yo!|Ontem fui ao zoológico!', 'パンダが ほんとに かわいかった〜！|panda ga honto ni kawaikatta~!|O panda era fofo demais!'],
          ex: { k: 'open', on: { praise: [['でしょ〜！ ずっと たけを たべてたの（笑）|desho~! zutto take o tabeteta no (wara)|Né?! Ficou comendo bambu o tempo todo (risos)', '#excited']], ack: ['ぞうも すごく おおきかったよ！|zou mo sugoku ookikatta yo!|O elefante também era enorme!'], surprise: ['ほんと！ はじめて みたの！|honto! hajimete mita no!|Sério! Foi a primeira vez que vi!'], laugh: ['えへへ、たのしかった〜！|ehehe, tanoshikatta~!|Hehe, foi muito divertido!'] },
            back: 'ぞうも きりんも いたよ！|zou mo kirin mo ita yo!|Tinha elefante e girafa também!', any: ['たのしかった〜！|tanoshikatta~!|Foi muito divertido!'], sugg: ['かわいい！|kawaii!|Que fofo!|chat:kawaii', 'いいね！|ii ne!|Que legal!|'] } },
        { say: '{name}は なんの どうぶつが すき？|{name} wa nan no doubutsu ga suki?|De qual animal você gosta?',
          ex: { k: 'yn', on: { yes: ['いいね〜！ わたしは やっぱり パンダ！|ii ne~! watashi wa yappari panda!|Legal! Eu, com certeza, o panda!'], ilike: ['いいね〜！ わたしは やっぱり パンダ！|ii ne~! watashi wa yappari panda!|Legal! Eu, com certeza, o panda!'], no: ['そっか！ わたしは パンダが すき！|sokka! watashi wa panda ga suki!|Entendi! Eu gosto de panda!'] },
            sugg: ['いぬが すき！|inu ga suki!|Gosto de cachorro!|', 'ねこが すき！|neko ga suki!|Gosto de gato!|', 'ぞうが すき！|zou ga suki!|Gosto de elefante!|'] } }
      ] },
      { id: 'karaoke', steps: [
        { say: ['きのう カラオケで 3じかん うたっちゃった！|kinou karaoke de sanjikan utacchatta!|Ontem cantei 3 horas no karaokê!'],
          ex: { k: 'open', on: { surprise: [['ほんと！ のどが いたい〜（笑）|honto! nodo ga itai~ (wara)|Sério! Tô com a garganta doendo (risos)', '#laugh']], praise: ['えへへ、たのしかった〜！|ehehe, tanoshikatta~!|Hehe, foi muito divertido!'], laugh: ['わらわないで〜！（笑）|warawanaide~! (wara)|Não ri! (risos)'], ack: ['のどが いたい〜（笑） でも たのしかった！|nodo ga itai~ (wara). demo tanoshikatta!|A garganta tá doendo (risos), mas foi divertido!'] },
            back: 'アニソンを いっぱい うたったよ！|anison o ippai utatta yo!|Cantei um monte de música de anime!', any: ['たのしかった〜！|tanoshikatta~!|Foi muito divertido!'] } },
        { say: '{name}は カラオケ すき？|{name} wa karaoke suki?|Você gosta de karaokê?',
          ex: { k: 'yn', on: { yes: [['こんど いっしょに いこう！ ぜったい！|kondo issho ni ikou! zettai!|Vamos juntos um dia! Com certeza!', '#excited']], ilike: [['こんど いっしょに いこう！ ぜったい！|kondo issho ni ikou! zettai!|Vamos juntos um dia! Com certeza!', '#excited']], no: ['えー、たのしいのに〜！ きくだけでも いいよ！|ee, tanoshii no ni~! kiku dake demo ii yo!|Ah, mas é tão legal! Pode ir só pra ouvir!'], shy: ['はずかしい？ わかる〜（笑）でも たのしいよ！|hazukashii? wakaru~ (wara). demo tanoshii yo!|Vergonha? Te entendo (risos). Mas é divertido!'] },
            sugg: ['うん、すき！|un, suki!|Gosto, sim!|c4l6', 'ちょっと はずかしい…|chotto hazukashii…|Tenho um pouco de vergonha…|chat:hazukashii', 'ううん。|uun.|Não muito.|'] } }
      ] },
      { id: 'anime', steps: [
        { say: 'あたらしい まほうの アニメ はじまったの、しってる？|atarashii mahou no anime hajimatta no, shitteru?|Sabia que começou um anime novo de magia?',
          ex: { k: 'yn', on: { yes: [{ r: ['え、ほんと？ うれしい！|e, honto? ureshii!|Sério? Que alegria!', 'どの キャラが すき？|dono kyara ga suki?|Qual personagem você curte?'], ex: { k: 'open', cap: true, any: [['{*}！ わかる〜！|{*}! wakaru~!|{*}! Te entendo!', '#excited']] } }],
            no: [['「つきの としょかん」って いうの！|"Tsuki no Toshokan" tte iu no!|Chama “Tsuki no Toshokan”!', 'えが すっごく きれいなの！|e ga suggoku kirei na no!|Os desenhos são lindos demais!']], surprise: [['ほんと！ 「つきの としょかん」って いうの！|honto! "Tsuki no Toshokan" tte iu no!|Sério! Chama “Tsuki no Toshokan”!', '#excited']] },
            sugg: ['うん、しってる！|un, shitteru!|Sei, sim!|', 'しらない。|shiranai.|Não sabia.|'] } }
      ] },
      { id: 'pudding', steps: [
        { say: 'コンビニの あたらしい プリン たべた？|konbini no atarashii purin tabeta?|Você comeu o pudim novo da loja de conveniência?',
          ex: { k: 'yn', on: { yes: [['おいしかったよね！|oishikatta yo ne!|Tava uma delícia, né?!', '#joy']], no: ['たべて！ たけしさんの おみせに あるよ。|tabete! Takeshi-san no omise ni aru yo.|Come! Tem na loja do Takeshi.'], want: ['でしょ？ たけしさんの おみせに あるよ！|desho? Takeshi-san no omise ni aru yo!|Né? Tem na loja do Takeshi!'], hungry: ['わかる〜！ あまい もの たべたい！|wakaru~! amai mono tabetai!|Te entendo! Quero um doce!'] },
            back: 'まっちゃの プリン！ ちょっと にがくて おいしいの。|maccha no purin! chotto nigakute oishii no.|Pudim de matchá! Meio amarguinho e gostoso.', sugg: ['うん、たべた！|un, tabeta!|Comi, sim!|c8l3', 'まだ。|mada.|Ainda não.|', 'たべたい！|tabetai!|Quero comer!|c6l3'] } }
      ] },
      { id: 'test', steps: [
        { say: ['ねえ ねえ、きいて！|nee nee, kiite!|Ei, escuta!', 'テストで 100てん とった！|tesuto de hyakuten totta!|Tirei 100 na prova!'], teach: ['yatta'],
          ex: { k: 'open', on: { praise: [['えへへ、ありがとう！ がんばった かいが あった〜！|ehehe, arigatou! ganbatta kai ga atta~!|Hehe, obrigada! Valeu o esforço!', '#celebrate']], congrats: [['えへへ、ありがとう！|ehehe, arigatou!|Hehe, obrigada!', '#celebrate']], yay: [['やったー！|yattaa!|Ebaaa!', '#celebrate']],
            surprise: ['ほんと だよ！ じぶんでも びっくり！|honto da yo! jibun demo bikkuri!|É sério! Eu mesma me surpreendi!'], same: [['{name}も？ すごい！ おいわい しよう！|{name} mo? sugoi! oiwai shiyou!|Você também? Incrível! Vamos comemorar!', '#celebrate']] },
            any: ['えへへ！|ehehe!|Hehe!'], sugg: ['すごい！|sugoi!|Incrível!|chat:sugoi', 'おめでとう！|omedetou!|Parabéns!|chat:omedetou', 'やったね！|yatta ne!|Arrasou!|chat:yatta'] } }
      ] },
      { id: 'song', steps: [
        { say: ['いま、この うた ずっと きいてる〜♪|ima, kono uta zutto kiiteru~♪|Tô ouvindo essa música sem parar~♪', 'J-POP、きく？|jei poppu, kiku?|Você ouve J-pop?'],
          ex: { k: 'yn', on: { yes: [['わーい！ こんど プレイリスト おくるね！|waai! kondo pureirisuto okuru ne!|Oba! Depois te mando minha playlist!', '#excited']], no: [{ r: 'じゃあ、どんな おんがくが すき？|jaa, donna ongaku ga suki?|Então, que tipo de música você curte?', ex: { k: 'open', cap: true, on: { ilike: ['{like}！ いいね〜！|{like}! ii ne~!|{like}! Legal!'] }, any: ['{*}！ こんど きいて みる！|{*}! kondo kiite miru!|{*}! Vou ouvir!'] } }], some: ['ときどき？ じゃあ おすすめ おしえる！|tokidoki? jaa osusume oshieru!|De vez em quando? Então te indico umas!'] },
            back: 'あかるい うたが すき！ げんき でるから！|akarui uta ga suki! genki deru kara!|Gosto de música animada! Dá energia!' } }
      ] }
    ]
  };

  /* ================= TAKESHI — comerciante, keigo ================= */
  const takeshi = {
    style: { base: 700, per: 24, jit: 250, max: 2600, gap: 520, stk: 0.15 },
    pivot: ['ちなみに、|chinami ni,|A propósito,', 'そういえば、|sou ieba,|Por falar nisso,'],
    unknown: ['もうしわけございません、もう一度 おねがいできますか。|moushiwake gozaimasen, mou ichido onegai dekimasu ka.|Mil desculpas, poderia repetir?', 'しつれいしました。もう一度 おっしゃって いただけますか。|shitsurei shimashita. mou ichido osshatte itadakemasu ka.|Perdão. Poderia dizer mais uma vez?'],
    unknown2: [['しょうしょう ききとれませんでした。もうしわけございません。|shoushou kikitoremasen deshita. moushiwake gozaimasen.|Não consegui entender direito. Mil desculpas.', '#doubt']],
    state: { k: 'state', on: {
      good: ['それは なによりです。|sore wa nani yori desu.|Isso é o mais importante.'],
      meh: ['さようで ございますか。どうぞ ごむりなさらず。|sayou de gozaimasu ka. douzo gomuri nasarazu.|É mesmo? Não se esforce demais.'],
      bad: ['それは たいへんでしたね。どうぞ おだいじに。|sore wa taihen deshita ne. douzo odaiji ni.|Que situação difícil. Cuide-se.'],
      tired: ['おつかれさまです。あたたかい おちゃは いかがですか。|otsukaresama desu. atatakai ocha wa ikaga desu ka.|Deve estar cansado(a). Aceita um chá quente?'],
      sleepy: ['コーヒーは いかがですか。めが さめますよ。|koohii wa ikaga desu ka. me ga samemasu yo.|Aceita um café? Ajuda a despertar.'],
      same: [{ r: 'さようで ございますか。わたくしも おなじです。|sayou de gozaimasu ka. watakushi mo onaji desu.|É mesmo? Eu também.', tip: { jp: 'さようで ございます', ro: 'sayou de gozaimasu', pt: 'É isso mesmo / é assim', why: 'Forma muito educada de そうです. Atendentes usam bastante.' } }],
      yes: ['それは なによりです。|sore wa nani yori desu.|Isso é o mais importante.'], no: ['さようで ございますか…。どうぞ おだいじに。|sayou de gozaimasu ka…. douzo odaiji ni.|É mesmo?… Cuide-se.']
    }, sugg: ['げんきです。|genki desu.|Estou bem.|chat:genki', 'つかれました。|tsukaremashita.|Estou cansado(a).|c8l3'] },
    react: {
      greet: [{ r: 'いらっしゃいませ！ きょうも ありがとう ございます。|irasshaimase! kyou mo arigatou gozaimasu.|Bem-vindo(a)! Obrigado por vir hoje também.' },
        { r: [TOD('おはようございます。いらっしゃいませ。|ohayou gozaimasu. irasshaimase.|Bom dia. Bem-vindo(a).', 'いらっしゃいませ、{name}さま。|irasshaimase, {name}-sama.|Bem-vindo(a), {name}.', 'こんばんは。いらっしゃいませ。|konbanwa. irasshaimase.|Boa noite. Bem-vindo(a).'), 'おげんきでしたか。|ogenki deshita ka.|Tem passado bem?'], ex: 'state' }],
      nice: ['こちらこそ、よろしく おねがい いたします。|kochira koso, yoroshiku onegai itashimasu.|O prazer é meu.'],
      howareyou: [{ r: ['はい、おかげさまで げんきです。|hai, okagesama de genki desu.|Estou bem, graças a Deus.', '{name}さまは いかがですか。|{name}-sama wa ikaga desu ka.|E você, como vai?'], ex: 'state', tip: { jp: 'おかげさまで', ro: 'okagesama de', pt: 'graças a você / graças a Deus', why: 'Resposta educada e comum a “como vai?”. Mostra gratidão, mesmo sem um motivo específico.' } }],
      good: ['それは なによりです。|sore wa nani yori desu.|Isso é o mais importante.'],
      meh: ['さようで ございますか。|sayou de gozaimasu ka.|É mesmo?'],
      bad: ['それは たいへんでしたね。どうぞ おだいじに。|sore wa taihen deshita ne. douzo odaiji ni.|Que situação difícil. Cuide-se.'],
      tired: ['おつかれさまです。あたたかい おちゃは いかがですか。|otsukaresama desu. atatakai ocha wa ikaga desu ka.|Deve estar cansado(a). Aceita um chá quente?'],
      sleepy: ['コーヒーは いかがですか。ひゃくろくじゅうえんで ございます。|koohii wa ikaga desu ka. hyaku rokujuu en de gozaimasu.|Aceita um café? São 160 ienes.'],
      hungry: ['でしたら、こちらの おべんとうは いかがですか。|deshitara, kochira no obentou wa ikaga desu ka.|Então, que tal este bentō?'],
      same: ['さようで ございますか。|sayou de gozaimasu ka.|É mesmo?'],
      yes: ['かしこまりました。|kashikomarimashita.|Entendido.', 'さようで ございますか。|sayou de gozaimasu ka.|É mesmo?'],
      no: ['しょうち いたしました。|shouchi itashimashita.|Compreendido.'],
      laugh: ['ははは。|hahaha.|Hahaha.', '#laugh'],
      ack: ['はい。|hai.|Sim.', 'さようで ございます。|sayou de gozaimasu.|Isso mesmo.'],
      surprise: ['はい、ほんとうで ございます。|hai, hontou de gozaimasu.|Sim, é verdade.'],
      praise: [{ r: 'おそれいります。|osore irimasu.|Fico lisonjeado.', tip: { jp: 'おそれいります', ro: 'osore irimasu', pt: 'fico lisonjeado / agradeço muito', why: 'Resposta muito educada a um elogio ou a uma gentileza. Comum no atendimento.' } }],
      yay: ['おめでとう ございます。|omedetou gozaimasu.|Meus parabéns.'],
      congrats: ['ありがとう ございます。|arigatou gozaimasu.|Muito obrigado.'],
      sympathy: ['おきづかい ありがとう ございます。|okizukai arigatou gozaimasu.|Obrigado pela consideração.'],
      thanks: ['こちらこそ、ありがとう ございます。|kochira koso, arigatou gozaimasu.|Eu é que agradeço.', ['ありがとう ございます。|arigatou gozaimasu.|Muito obrigado.', '#joy']],
      sorry: ['いえいえ、とんでも ございません。|ie ie, tonde mo gozaimasen.|Imagine, de forma alguma.'],
      okay: [['かしこまりました。|kashikomarimashita.|Entendido.', '#approve']],
      decline: ['しょうち いたしました。また いつでも どうぞ。|shouchi itashimashita. mata itsu demo douzo.|Compreendido. Volte quando quiser.'],
      bye: [{ r: 'ありがとう ございました！ またの おこしを おまちして おります。|arigatou gozaimashita! mata no okoshi o omachi shite orimasu.|Muito obrigado! Esperamos sua próxima visita.', end: true }],
      askback: [{ r: 'わたくしですか。おかげさまで げんきに して おります。|watakushi desu ka. okagesama de genki ni shite orimasu.|Eu? Graças a Deus, estou bem.', tip: { jp: 'わたくし', ro: 'watakushi', pt: 'eu (bem formal)', why: 'Versão mais formal de わたし. Comum no trabalho e no atendimento.' } }],
      why: ['もうしわけございません、くわしくは わかりかねます。|moushiwake gozaimasen, kuwashiku wa wakarikanemasu.|Mil desculpas, não sei os detalhes.'],
      whatdoing: ['しょうひんを ならべて おります。|shouhin o narabete orimasu.|Estou arrumando os produtos.'],
      likesq: ['わたくしは おにぎりが だいすきです。とくに さけの おにぎりです。|watakushi wa onigiri ga daisuki desu. toku ni sake no onigiri desu.|Adoro oniguiri. Principalmente o de salmão.'],
      ilike: ['{like}で ございますか。すてきですね。|{like} de gozaimasu ka. suteki desu ne.|{like}? Que bacana.'],
      dislike: ['さようで ございますか。|sayou de gozaimasu ka.|É mesmo?'],
      recommend: ['きょうの おすすめは さけの おにぎりで ございます。|kyou no osusume wa sake no onigiri de gozaimasu.|A recomendação de hoje é o oniguiri de salmão.'],
      price: ['どちらの しょうひんでしょうか。おにぎりは ひゃくごじゅうえんで ございます。|dochira no shouhin deshou ka. onigiri wa hyaku gojuu en de gozaimasu.|Qual produto? O oniguiri custa 150 ienes.'],
      weather: ['そうですね。おでかけびよりですね。|sou desu ne. odekake biyori desu ne.|É verdade. Um ótimo dia para passear.'],
      studying: ['それは すばらしいですね。おうえん して おります。|sore wa subarashii desu ne. ouen shite orimasu.|Que maravilha. Estou torcendo por você.'],
      want: ['かしこまりました。|kashikomarimashita.|Entendido.'],
      question: ['しょうしょう おまちください。|shoushou omachi kudasai.|Um momento, por favor.'],
      some: ['さようで ございますか。|sayou de gozaimasu ka.|É mesmo?'],
      dontknow: ['だいじょうぶですよ。ゆっくりで けっこうです。|daijoubu desu yo. yukkuri de kekkou desu.|Tudo bem. Pode ser com calma.']
    },
    ex: {},
    topics: [
      { id: 'intro', intro: true, steps: [
        { say: ['いらっしゃいませ！ はじめての ごらいてんですね。|irasshaimase! hajimete no goraiten desu ne.|Bem-vindo(a)! É a sua primeira visita, não é?', 'てんちょうの たけしと もうします。|tenchou no Takeshi to moushimasu.|Sou o Takeshi, o gerente.'],
          tip: { jp: '〜と もうします', ro: '~to moushimasu', pt: 'me chamo… (humilde)', why: 'Jeito humilde de dizer o próprio nome. O Takeshi fala keigo porque está atendendo você.' },
          ex: { k: 'open', on: { nice: ['こちらこそ、よろしく おねがい いたします。|kochira koso, yoroshiku onegai itashimasu.|O prazer é meu.'], greet: ['どうぞ ごゆっくり ごらんください。|douzo goyukkuri goran kudasai.|Fique à vontade para olhar com calma.'], yes: ['どうぞ ごゆっくり ごらんください。|douzo goyukkuri goran kudasai.|Fique à vontade para olhar com calma.'] }, any: ['どうぞ ごゆっくり ごらんください。|douzo goyukkuri goran kudasai.|Fique à vontade para olhar com calma.'],
            sugg: ['よろしく おねがいします。|yoroshiku onegaishimasu.|Muito prazer.|c1l3', 'こんにちは。|konnichiwa.|Olá.|c1l3'] } },
        { say: 'なにか おさがしですか。|nanika osagashi desu ka.|Procura algo?', teach: ['osagashi'],
          ex: { k: 'open', on: { no: [{ r: 'かしこまりました。ごゆっくり どうぞ。|kashikomarimashita. goyukkuri douzo.|Certo. Fique à vontade.', end: true }], decline: [{ r: 'かしこまりました。ごゆっくり どうぞ。|kashikomarimashita. goyukkuri douzo.|Certo. Fique à vontade.', end: true }], browsing: [{ r: 'かしこまりました。ごゆっくり どうぞ。|kashikomarimashita. goyukkuri douzo.|Certo. Fique à vontade.', end: true }],
            want: ['かしこまりました。こちらで ございます。|kashikomarimashita. kochira de gozaimasu.|Certo. Aqui está.'], hungry: ['でしたら、こちらの おべんとうは いかがですか。|deshitara, kochira no obentou wa ikaga desu ka.|Então, que tal este bentō?'] },
            any: ['しょうしょう おまちください。おもちしますね。|shoushou omachi kudasai. omochi shimasu ne.|Um momento, por favor. Vou buscar.'],
            sugg: ['みて いる だけです。|mite iru dake desu.|Só estou olhando.|chat:miteirudake', 'おにぎりを ください。|onigiri o kudasai.|Um oniguiri, por favor.|c6l4'] }, end: true, set: ['tk:met'] }
      ] },
      { id: 'bento', steps: [
        { say: ['ほんじつ、あたらしい おべんとうが はいりました。|honjitsu, atarashii obentou ga hairimashita.|Hoje chegou um bentō novo.'],
          tip: { jp: 'ほんじつ', ro: 'honjitsu', pt: 'hoje (formal)', why: 'No atendimento, きょう vira ほんじつ. É a mesma ideia, só mais formal.' },
          ex: { k: 'open', on: { ack: ['からあげ べんとうで ございます。ごはんも おおめです。|karaage bentou de gozaimasu. gohan mo oome desu.|É bentō de karaage. Vem bastante arroz.'], surprise: ['からあげ べんとうで ございます。ごはんも おおめです。|karaage bentou de gozaimasu. gohan mo oome desu.|É bentō de karaage. Vem bastante arroz.'], question: ['からあげ べんとうで ございます。ごはんも おおめです。|karaage bentou de gozaimasu. gohan mo oome desu.|É bentō de karaage. Vem bastante arroz.'], price: ['ごひゃくにじゅうえんで ございます。|gohyaku nijuu en de gozaimasu.|São 520 ienes.'],
            want: [['かしこまりました。おとりおき して おきますね。|kashikomarimashita. otorioki shite okimasu ne.|Certo. Vou reservar um para você.', '#approve']], yes: [['かしこまりました。おとりおき して おきますね。|kashikomarimashita. otorioki shite okimasu ne.|Certo. Vou reservar um para você.', '#approve']], hungry: [['でしたら ぜひ！ おとりおき して おきますね。|deshitara zehi! otorioki shite okimasu ne.|Então, com certeza! Vou reservar um.', '#approve']],
            no: ['しょうち いたしました。また いつでも どうぞ。|shouchi itashimashita. mata itsu demo douzo.|Compreendido. Volte quando quiser.'], decline: ['しょうち いたしました。また いつでも どうぞ。|shouchi itashimashita. mata itsu demo douzo.|Compreendido. Volte quando quiser.'] },
            any: ['よろしければ、ぜひ どうぞ。|yoroshikereba, zehi douzo.|Se quiser, fique à vontade.'], sugg: ['いくらですか。|ikura desu ka.|Quanto custa?|c6l4', 'おねがいします。|onegaishimasu.|Quero, por favor.|c1l3', 'けっこうです。|kekkou desu.|Não, obrigado(a).|chat:kekkou'] } }
      ] },
      { id: 'rain', steps: [
        { say: 'きょうは あめが ふりそうですね。かさは おもちですか。|kyou wa ame ga furisou desu ne. kasa wa omochi desu ka.|Parece que vai chover hoje. Está com guarda-chuva?',
          tip: { jp: 'おもちですか', ro: 'omochi desu ka', pt: 'o(a) senhor(a) tem?', why: 'Forma respeitosa de もって いますか (você tem?). O Takeshi eleva o cliente.' },
          ex: { k: 'yn', on: { yes: ['さすがで ございます。|sasuga de gozaimasu.|Precavido(a), hein.'], no: [{ r: 'でしたら、こちらの かさは いかがですか。ごひゃくえんで ございます。|deshitara, kochira no kasa wa ikaga desu ka. gohyaku en de gozaimasu.|Então, que tal este guarda-chuva? São 500 ienes.', ex: { k: 'yn', on: { yes: [['ありがとう ございます！|arigatou gozaimasu!|Muito obrigado!', '#joy']], want: [['ありがとう ございます！|arigatou gozaimasu!|Muito obrigado!', '#joy']], no: ['しょうち いたしました。おきを つけて。|shouchi itashimashita. oki o tsukete.|Compreendido. Cuide-se.'], decline: ['しょうち いたしました。おきを つけて。|shouchi itashimashita. oki o tsukete.|Compreendido. Cuide-se.'] } } }] },
            sugg: ['はい、あります。|hai, arimasu.|Sim, tenho.|c5l5', 'いいえ、ありません。|iie, arimasen.|Não tenho.|c5l5'] } }
      ] },
      { id: 'kid', steps: [
        { say: ['さきほど、こどもの おきゃくさまに「ありがと！」と いわれました。|sakihodo, kodomo no okyakusama ni "arigato!" to iwaremashita.|Há pouco, um cliente criança me disse “arigato!”.', 'かわいかったです（笑）|kawaikatta desu (wara)|Foi uma graça (risos)'],
          ex: { k: 'open', on: { laugh: ['ははは。おとなの おきゃくさまは「ありがとうございます」と いう ことが おおいですね。|hahaha. otona no okyakusama wa "arigatou gozaimasu" to iu koto ga ooi desu ne.|Hahaha. Os clientes adultos costumam dizer “arigatou gozaimasu”.'], praise: ['ええ。おとなの おきゃくさまは「ありがとうございます」と いう ことが おおいですね。|ee. otona no okyakusama wa "arigatou gozaimasu" to iu koto ga ooi desu ne.|Sim. Os clientes adultos costumam dizer “arigatou gozaimasu”.'] },
            any: ['おとなの おきゃくさまは「ありがとうございます」と いう ことが おおいですね。|otona no okyakusama wa "arigatou gozaimasu" to iu koto ga ooi desu ne.|Os clientes adultos costumam dizer “arigatou gozaimasu”.'] },
          tip: { jp: 'ありがと！ → ありがとうございます', ro: 'arigato! → arigatou gozaimasu', pt: 'Valeu! → Muito obrigado(a).', why: 'A mesma ideia em dois registros: casual entre amigos e educado no comércio e com desconhecidos.' } }
      ] },
      { id: 'matcha', steps: [
        { say: 'ただいま、まっちゃの プリンが にんきで ございます。|tadaima, maccha no purin ga ninki de gozaimasu.|No momento, o pudim de matchá está fazendo sucesso.',
          ex: { k: 'open', on: { want: [['ありがとう ございます！ ひゃくはちじゅうえんで ございます。|arigatou gozaimasu! hyaku hachijuu en de gozaimasu.|Muito obrigado! São 180 ienes.', '#joy']], yes: [['ありがとう ございます！ ひゃくはちじゅうえんで ございます。|arigatou gozaimasu! hyaku hachijuu en de gozaimasu.|Muito obrigado! São 180 ienes.', '#joy']], price: ['ひゃくはちじゅうえんで ございます。|hyaku hachijuu en de gozaimasu.|São 180 ienes.'],
            no: ['しょうち いたしました。|shouchi itashimashita.|Compreendido.'], decline: ['しょうち いたしました。|shouchi itashimashita.|Compreendido.'], same: ['ゆみさんも よく かって いかれますよ。|Yumi-san mo yoku katte ikaremasu yo.|A Yumi também sempre leva.'], ack: ['ゆみさんも よく かって いかれますよ。|Yumi-san mo yoku katte ikaremasu yo.|A Yumi também sempre leva.'] },
            any: ['よろしければ、いかがですか。|yoroshikereba, ikaga desu ka.|Se quiser, aceita um?'], sugg: ['ひとつ ください。|hitotsu kudasai.|Um, por favor.|c6l4', 'いくらですか。|ikura desu ka.|Quanto custa?|c6l4', 'けっこうです。|kekkou desu.|Não, obrigado(a).|chat:kekkou'] } }
      ] },
      { id: 'regular', steps: [
        { say: 'いつも ごりよう ありがとう ございます。|itsumo goriyou arigatou gozaimasu.|Obrigado por sempre nos visitar.',
          ex: { k: 'open', on: { thanks: [{ r: 'こちらこそ。{name}さまは じょうれんさまですから。|kochira koso. {name}-sama wa jourensama desu kara.|Eu que agradeço. Você é um(a) cliente fiel.', tip: { jp: '〜さま', ro: '~sama', pt: 'senhor(a) (muito respeitoso)', why: 'Versão mais respeitosa de さん. Lojas e empresas usam com clientes.' } }], nice: ['こちらこそ。|kochira koso.|Eu é que agradeço.'] },
            any: ['これからも よろしく おねがい いたします。|kore kara mo yoroshiku onegai itashimasu.|Contamos com você daqui para frente também.'], sugg: ['こちらこそ。|kochira koso.|Eu é que agradeço.|chat:kochirakoso'] } }
      ] }
    ]
  };

  return { ren, aiko, yumi, takeshi };
})();

/* novas expressões ensinadas na conversa livre e nas figurinhas (ids estáveis "chat:chave") */
[
  ['kawaii', 'かわいい', 'kawaii', 'fofo, bonitinho (可愛い)', 'Elogio para coisas, animais e pessoas. かわいい！ = Que fofo!'],
  ['yatta', 'やった！', 'yatta!', 'consegui! / oba! / aê!', 'Exclamação de alegria quando algo dá certo. Esticado: やったー！'],
  ['kakkoii', 'かっこいい', 'kakkoii', 'legal, estiloso, maneiro (格好いい)', 'Elogio para algo ou alguém “descolado”. Educado: かっこいいですね.'],
  ['wara', '笑', 'wara', 'risos (escrito)', 'Em mensagens, （笑） ou w funcionam como “kkk” / “rs”. わらう = rir.'],
  ['ureshii', 'うれしい', 'ureshii', 'feliz, contente (嬉しい)', 'Para dizer que algo te deixou feliz: うれしい！'],
  ['hazukashii', 'はずかしい', 'hazukashii', 'que vergonha, tímido (恥ずかしい)', 'Vergonha de timidez ou de constrangimento.'],
  ['naruhodo', 'なるほど', 'naruhodo', 'entendi! / faz sentido', 'Reação quando algo fica claro. Com professores, prefira なるほど… ou そうなんですね.']
].forEach(([k, jp, ro, pt, note]) => {
  if (ITEM['chat:' + k]) return;
  const it = { k, jp, ro, pt, note, id: 'chat:' + k, lesson: CHAT_PACK, group: 'expressao' };
  CHAT_PACK.items.push(it); ITEM[it.id] = it;
});
Object.assign(CHAT_KANJI, { 私: 'わたし', 僕: 'ぼく', 俺: 'おれ', 同じ: 'おなじ', 嘘: 'うそ', 可愛: 'かわい', 格好: 'かっこ', 嬉: 'うれ', 恥: 'は', 猫: 'ねこ', 犬: 'いぬ', 好き: 'すき', 大好: 'だいす', 眠い: 'ねむい', 疲れた: 'つかれた', 何で: 'なんで', 寝: 'ね', 遅: 'おそ', 早: 'はや', 美味: 'おい', 面白: 'おもしろ', 時々: 'ときどき', 全然: 'ぜんぜん', 違: 'ちが', 大変: 'たいへん', 最高: 'さいこう', 楽しい: 'たのしい', 難しい: 'むずかしい', 知: 'し', 一緒: 'いっしょ', 宜: 'よろ', 了解: 'りょうかい' });
