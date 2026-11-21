/* ==========================================================
   Nihongo Quest 11.0 — ADVENTURE MODE (dados)
   Mundo original: Kotoba no Kuni (言葉の国, “a Terra das Palavras”), onde as palavras têm poder (言霊).
   Região 1: Vale Asahi (vila, campo, floresta, santuário, rio e caverna). Regiões futuras ficam bloqueadas no mapa.

   Formatos:
   - RPG_WORDS[chave] = 'escrita|kana|romaji|português|nota'. Viram itens 'rpg:<chave>' (Caderno/Dicionário só se o
     aluno salvar). Uma palavra do RPG só pode ser cobrada depois de ter sido ensinada na aventura (S.rpg.taught).
   - RPG_AREAS[id].map: 11 linhas de 9 caracteres.  . grama  , flores  = caminho  T árvore  ~ água  B ponte
     H casa  I santuário  R pedra  ^ montanha  F cerca  : chão de caverna  X parede de caverna
   - Objetos: { t, x, y, ... }  t = npc | chest | sign | spot | gather | exit | gate | enemy | boss | shrine
   - Falas: 'quem|japonês|romaji|português' (quem = id do NPC, 'ren' ou 'me').
   ========================================================== */
const RPG_WORDS = {
  ken: '剣|けん|ken|espada', bokutou: '木刀|ぼくとう|bokutou|espada de madeira', yumi: '弓|ゆみ|yumi|arco',
  tate: '盾|たて|tate|escudo', yoroi: '鎧|よろい|yoroi|armadura', kabuto: '兜|かぶと|kabuto|capacete de samurai',
  kusuri: '薬|くすり|kusuri|remédio', yakusou: '薬草|やくそう|yakusou|erva medicinal', tetsu: '鉄|てつ|tetsu|ferro',
  suzu: '鈴|すず|suzu|guizo, sininho', omamori: 'お守り|おまもり|omamori|amuleto de proteção', men: '面|めん|men|máscara',
  hachimaki: '鉢巻|はちまき|hachimaki|faixa de cabeça', chizu: '地図|ちず|chizu|mapa', makimono: '巻物|まきもの|makimono|pergaminho',
  takarabako: '宝箱|たからばこ|takarabako|baú do tesouro', kougeki: '攻撃|こうげき|kougeki|ataque', bougyo: '防御|ぼうぎょ|bougyo|defesa',
  kaifuku: '回復|かいふく|kaifuku|recuperação', nigeru: '逃げる|にげる|nigeru|fugir', mahou: '魔法|まほう|mahou|magia',
  kotodama: '言霊|ことだま|kotodama|poder das palavras|Crença antiga de que as palavras têm força própria.',
  hi: '火|ひ|hi|fogo', mizu: '水|みず|mizu|água', kaze: '風|かぜ|kaze|vento',
  mura: '村|むら|mura|vila, aldeia', mori: '森|もり|mori|floresta', kawa: '川|かわ|kawa|rio', hashi: '橋|はし|hashi|ponte',
  doukutsu: '洞窟|どうくつ|doukutsu|caverna', jinja: '神社|じんじゃ|jinja|santuário xintoísta', yama: '山|やま|yama|montanha',
  bouken: '冒険|ぼうけん|bouken|aventura', yuusha: '勇者|ゆうしゃ|yuusha|herói, heroína', oni: '鬼|おに|oni|ogro (do folclore)',
  kitsune: '狐|きつね|kitsune|raposa', neko: '猫|ねこ|neko|gato', kappa: '河童|かっぱ|kappa|kappa (criatura do rio)|Criatura do folclore com um prato de água na cabeça.',
  ido: '井戸|いど|ido|poço', jizou: 'お地蔵さん|おじぞうさん|ojizou-san|estátua de Jizou (protetor dos viajantes)', ki: '木|き|ki|árvore',
  negai: '願い|ねがい|negai|desejo, pedido', tourou: '灯籠|とうろう|tourou|lanterna de pedra', e: '絵|え|e|desenho, pintura',
  hikari: '光|ひかり|hikari|luz', kotoba: '言葉|ことば|kotoba|palavra', tsuyoi: '強い|つよい|tsuyoi|forte', abunai: '危ない|あぶない|abunai|perigoso',
  mochi: 'もち|もち|mochi|bolinho de arroz', karasu: 'カラス|からす|karasu|corvo', tanuki: '狸|たぬき|tanuki|tanuki (cão-guaxinim)',
  koumori: 'こうもり|こうもり|koumori|morcego', ishi: '石|いし|ishi|pedra', kodama: '木霊|こだま|kodama|espírito das árvores; eco',
  onigiri: 'おにぎり|おにぎり|onigiri|bolinho de arroz', ocha: 'お茶|おちゃ|ocha|chá verde', hane: '羽|はね|hane|pena'
};
/* palavras que Ren ensina quando o aluno ainda conhece poucas (ordem de ensino) */
const RPG_TEACH_ORDER = ['ken', 'tate', 'kusuri', 'mori', 'hi', 'mizu', 'kaze', 'yama', 'kawa', 'oni', 'neko', 'kitsune', 'ki', 'ishi', 'hikari', 'kotoba', 'bouken', 'yuusha', 'tsuyoi', 'abunai'];

/* ---------- itens ---------- */
/* slot: weapon | shield | armor | helm | acc | use | mat | key.  r: raridade (1 comum, 2 rara, 3 épica) */
const RPG_ITEMS = {
  bokutou: { w: 'bokutou', slot: 'weapon', atk: 2, r: 1, pt: 'Espada de madeira', desc: 'Leve e segura. Toda aventura começa com uma.' },
  takeyumi: { jp: '竹の弓', ro: 'take no yumi', w: 'yumi', slot: 'weapon', atk: 3, flee: 20, r: 1, pt: 'Arco de bambu', desc: 'Ataca de longe: fugir fica mais fácil.' },
  tetsuken: { jp: '鉄の剣', ro: 'tetsu no ken', w: 'ken', slot: 'weapon', atk: 6, r: 2, pt: 'Espada de ferro', desc: 'Forjada por Tetsu com ferro da caverna.' },
  hikariken: { jp: '光の剣', ro: 'hikari no ken', w: 'hikari', slot: 'weapon', atk: 10, ki: 4, r: 3, pt: 'Espada da Luz', desc: 'Brilha quando alguém diz uma palavra com o coração.' },
  kitate: { jp: '木の盾', ro: 'ki no tate', w: 'tate', slot: 'shield', def: 2, r: 1, pt: 'Escudo de madeira', desc: 'Simples, mas segura uma bicada de corvo.', price: 15 },
  tetsutate: { jp: '鉄の盾', ro: 'tetsu no tate', w: 'tate', slot: 'shield', def: 4, r: 2, pt: 'Escudo de ferro', desc: 'Pesado e confiável.', forge: { tetsu: 2 }, price: 10 },
  nuno: { jp: '布の服', ro: 'nuno no fuku', w: '', slot: 'armor', def: 1, r: 1, pt: 'Roupa de tecido', desc: 'Roupa de viagem confortável.' },
  kawayoroi: { jp: '革の鎧', ro: 'kawa no yoroi', w: 'yoroi', slot: 'armor', def: 3, hp: 6, r: 2, pt: 'Armadura de couro', desc: 'Encontrada num baú esquecido na floresta.' },
  kabuto: { w: 'kabuto', slot: 'helm', def: 2, hp: 4, r: 2, pt: 'Capacete de samurai', desc: 'Antigo, com um brasão de sol.' },
  hachimaki: { w: 'hachimaki', slot: 'helm', atk: 1, ki: 2, r: 1, pt: 'Faixa de cabeça', desc: 'Amarrar na testa dá foco. É o que dizem.', price: 12 },
  suzu: { w: 'suzu', slot: 'acc', ki: 3, flee: 15, r: 2, pt: 'Guizo da sorte', desc: 'Presente do gato Tama. O som afasta o perigo.' },
  kitsunemen: { jp: '狐の面', ro: 'kitsune no men', w: 'men', slot: 'acc', atk: 2, crit: 8, r: 2, pt: 'Máscara de raposa', desc: 'Presente da raposa do santuário. Golpes certeiros ficam mais fáceis.' },
  omamori: { w: 'omamori', slot: 'acc', hp: 10, def: 1, r: 2, pt: 'Amuleto de proteção', desc: 'Do santuário da floresta. Protege quem viaja.' },
  kusuri: { w: 'kusuri', slot: 'use', heal: 30, r: 1, pt: 'Remédio', desc: 'Recupera 30 de HP.', price: 5 },
  joyaku: { jp: '特製の薬', ro: 'tokusei no kusuri', w: 'kusuri', slot: 'use', heal: 80, r: 2, pt: 'Remédio forte', desc: 'Recupera 80 de HP. Hana prepara com ervas.' },
  onigiri: { w: 'onigiri', slot: 'use', heal: 15, r: 1, pt: 'Onigiri', desc: 'Recupera 15 de HP. Gostoso!' },
  ocha: { w: 'ocha', slot: 'use', kiHeal: 8, r: 1, pt: 'Chá verde', desc: 'Recupera 8 de Ki.', price: 4 },
  yakusou: { w: 'yakusou', slot: 'mat', r: 1, pt: 'Erva medicinal', desc: 'Cresce no campo e na floresta. Hana sabe usar.' },
  tetsu: { jp: '鉄鉱石', ro: 'tekkouseki', w: 'tetsu', slot: 'mat', r: 1, pt: 'Minério de ferro', desc: 'Achado na Caverna do Eco. Tetsu forja com ele.' },
  hane: { w: 'hane', slot: 'mat', r: 1, pt: 'Pena de corvo', desc: 'Preta e brilhante. Tetsu troca por chá.' },
  chizu: { w: 'chizu', slot: 'key', r: 1, pt: 'Mapa do Vale Asahi', desc: 'Mostra onde você está e para onde pode ir.' }
};
/* magias: aprendidas com pergaminhos (巻物). el = elemento */
const RPG_SPELLS = {
  hi: { w: 'hi', ki: 4, pow: 1.7, el: 'hi', pt: 'Fogo', desc: 'Chama forte. Tanukis e kodamas detestam.' },
  mizu: { w: 'mizu', ki: 4, pow: 1.7, el: 'mizu', pt: 'Água', desc: 'Jato de água. Bom contra pedra.' },
  kaze: { w: 'kaze', ki: 5, pow: 1.8, el: 'kaze', pt: 'Vento', desc: 'Rajada cortante. O kappa não aguenta.' },
  kaifuku: { w: 'kaifuku', ki: 5, heal: 0.45, pt: 'Recuperação', desc: 'Recupera quase metade do HP.' }
};

/* ---------- inimigos ---------- */
/* ai: normal | quick (às vezes ataca 2x) | ghost (golpe físico pode errar; 言霊 sempre acerta) | trick (ilusão: esquiva o próximo golpe)
       | charge (concentra e solta um golpe forte) | guard (às vezes se defende) | heal | boss-kappa | boss-oni */
const RPG_ENEMIES = {
  mochi: { w: 'mochi', name: 'Mochimochi', hp: 14, atk: 4, def: 1, exp: 7, ai: 'normal', drop: [['onigiri', 0.15]], desc: 'Um bolinho de arroz que ganhou vida e adora pular em viajantes.' },
  karasu: { w: 'karasu', name: 'Corvo travesso', hp: 13, atk: 5, def: 1, exp: 8, ai: 'quick', eva: 15, drop: [['hane', 0.5]], desc: 'Rápido e barulhento. Às vezes bica duas vezes.' },
  kodama: { w: 'kodama', name: 'Kodama', hp: 18, atk: 6, def: 2, exp: 11, ai: 'ghost', weak: 'hi', drop: [['yakusou', 0.4]], desc: 'Espírito das árvores. Golpes comuns atravessam o corpo dele, mas palavras sempre acertam.' },
  tanuki: { w: 'tanuki', name: 'Tanuki trapaceiro', hp: 24, atk: 7, def: 3, exp: 13, ai: 'trick', weak: 'hi', drop: [['onigiri', 0.3], ['yakusou', 0.3]], desc: 'Cria ilusões para escapar dos golpes. Uma palavra certeira desfaz o truque.' },
  koumori: { w: 'koumori', name: 'Morcego do eco', hp: 22, atk: 8, def: 2, exp: 14, ai: 'quick', eva: 20, weak: 'kaze', drop: [['ocha', 0.2]], desc: 'Vive no escuro da caverna e repete tudo o que ouve.' },
  ishi: { w: 'ishi', name: 'Espírito de pedra', hp: 34, atk: 9, def: 7, exp: 18, ai: 'charge', weak: 'mizu', resist: 'hi', drop: [['tetsu', 0.6]], desc: 'Duro demais para a espada. Concentra força antes de um golpe pesado: defenda!' },
  kappa: { w: 'kappa', name: 'Kappa, guardião da ponte', boss: true, hp: 75, atk: 9, def: 4, exp: 60, ai: 'boss-kappa', weak: 'kaze', resist: 'mizu', drop: [], desc: 'Muito educado: quando alguém fala uma palavra certa com ele, faz uma reverência e derrama a água do prato da cabeça.' },
  oni: { w: 'oni', name: 'Oni do Silêncio', boss: true, hp: 150, atk: 12, def: 6, exp: 160, ai: 'boss-oni', weak: 'kotoba', resist: 'hi', drop: [], desc: 'Roubou as palavras do Vale Asahi. Quando fica bravo, cala as magias. Só palavras quebram o silêncio.' }
};

/* ---------- personagens ---------- */
const RPG_NPCS = {
  chiyo: { name: 'Vovó Chiyo', jp: 'ちよ', role: 'Anciã da vila', pitch: 0.8, look: { hair: '#d9d9e6', top: '#7a4a9a', skin: '#f4d7bf' } },
  hana: { name: 'Hana', jp: 'はな', role: 'Dona da pousada e da loja', pitch: 1.25, look: { hair: '#7a3b2a', top: '#e0607e', skin: '#ffe2cc' } },
  tetsu: { name: 'Tetsu', jp: 'てつ', role: 'Ferreiro', pitch: 0.75, look: { hair: '#2a2a3a', top: '#5a6170', skin: '#e8b98f', band: '#e0343c' } },
  sora: { name: 'Sora', jp: 'そら', role: 'Menino da vila', pitch: 1.35, look: { hair: '#3a2a1a', top: '#3b9ad9', skin: '#ffe2cc' } },
  gen: { name: 'Seu Gen', jp: 'げん', role: 'Pescador', pitch: 0.8, look: { hair: '#8a8fa8', top: '#3a7a5a', skin: '#e8b98f', hat: true } },
  kitsune: { name: 'Kohaku', jp: 'こはく', role: 'Raposa do santuário', pitch: 1.2, fox: true },
  ren: { name: 'Ren', jp: 'レン', role: 'Seu amigo e companheiro de aventura', pitch: 0.85, chat: 'ren' },
  hikari: { name: 'Hikari', jp: 'ひかり', role: 'Espírito guardião da Academia', pitch: 1.3, mascot: true }
};

/* ---------- mapas ---------- */
const RPG_AREAS = {
  vila: { name: 'Vila Asahi', jp: '朝日村', ro: 'Asahi-mura', w: 'mura', theme: 'vila', safe: true,
    desc: 'Vila tranquila onde o sol nasce primeiro. Desde que o Oni roubou as palavras, as pessoas esquecem o que iam dizer.',
    map: ['TTTT=TTTT', 'T,..=..,T', 'THH.=.HHT', 'THH.=.HHT', 'T...=...T', 'T.=====.T', 'T.=...=.T', 'THH.=.HHT', 'THH.=.HHT', 'T,..=..,T', 'TTTTTTTTT'],
    obj: [
      { t: 'exit', x: 4, y: 0, to: 'campo', tx: 4, ty: 9 },
      { t: 'npc', id: 'chiyo', x: 1, y: 4 }, { t: 'npc', id: 'hana', x: 7, y: 4 }, { t: 'npc', id: 'tetsu', x: 2, y: 9 },
      { t: 'npc', id: 'sora', x: 6, y: 9 },
      { t: 'sign', id: 'vila', x: 3, y: 1, text: 'sign|朝日村へ ようこそ|Asahi-mura e youkoso|Bem-vindo(a) à Vila Asahi', w: 'mura' },
      { t: 'spot', id: 'ido', x: 7, y: 6 }
    ] },
  campo: { name: 'Campo Nohara', jp: '野原', ro: 'Nohara', w: '', theme: 'campo',
    desc: 'Campo aberto cheio de flores. Os mochimochis pulam por aqui.',
    map: ['^^^^^^^^^', '^,..=..,^', 'T..,=..RT', 'T.T.=.,.T', 'T...=...T', 'T.,.=====', 'T...=.,.T', 'T,..=T..T', 'TT..=..,T', 'T.,.=...T', 'TTTT=TTTT'],
    obj: [
      { t: 'exit', x: 4, y: 10, to: 'vila', tx: 4, ty: 1 },
      { t: 'exit', x: 8, y: 5, to: 'mori', tx: 1, ty: 5 },
      { t: 'gate', id: 'tronco', x: 7, y: 5, need: 'gate_mori', kind: 'log', msg: 'Um tronco enorme bloqueia o caminho para a floresta. A Vovó Chiyo deve saber o que fazer.' },
      { t: 'gate', id: 'yama', x: 4, y: 1, need: '_never', kind: 'rocks', msg: 'Pedras caídas fecham a trilha para a Montanha Kumo (雲山). Essa região vai abrir numa próxima aventura.' },
      { t: 'sign', id: 'campo', x: 3, y: 1, text: 'sign|↑ 山　→ 森|yama · mori|↑ montanha  → floresta', w: 'yama' },
      { t: 'enemy', id: 'c1', e: 'mochi', x: 3, y: 3 }, { t: 'enemy', id: 'c2', e: 'mochi', x: 6, y: 7 }, { t: 'enemy', id: 'c3', e: 'mochi', x: 2, y: 8 },
      { t: 'enemy', id: 'c4', e: 'karasu', x: 6, y: 2, need: 'gate_mori' },
      { t: 'gather', id: 'g1', x: 1, y: 1, item: 'yakusou' }, { t: 'gather', id: 'g2', x: 7, y: 8, item: 'yakusou' },
      { t: 'chest', id: 'b1', x: 7, y: 3, loot: { item: 'takeyumi' } },
      { t: 'spot', id: 'jizou', x: 6, y: 9 }
    ] },
  mori: { name: 'Floresta Sussurrante', jp: '囁きの森', ro: 'Sasayaki no mori', w: 'mori', theme: 'mori',
    desc: 'Árvores antigas que cochicham com o vento. Kodamas e tanukis vivem aqui.',
    map: ['TTTT=TTTT', 'TT..=..TT', 'T..T=...T', 'T.,.=..,T', 'TT..=.TTT', '=====...T', 'T..T...~~', 'T.,..T.~~', 'TT....===', 'T,.T....T', 'TTTTTTTTT'],
    obj: [
      { t: 'exit', x: 0, y: 5, to: 'campo', tx: 7, ty: 5 },
      { t: 'exit', x: 4, y: 0, to: 'jinja', tx: 4, ty: 9 },
      { t: 'exit', x: 8, y: 8, to: 'kawa', tx: 1, ty: 8 },
      { t: 'sign', id: 'mori', x: 2, y: 4, text: 'sign|↑ 神社　→ 川|jinja · kawa|↑ santuário  → rio', w: 'jinja' },
      { t: 'enemy', id: 'm1', e: 'kodama', x: 2, y: 3 }, { t: 'enemy', id: 'm2', e: 'kodama', x: 6, y: 6 }, { t: 'enemy', id: 'm3', e: 'tanuki', x: 3, y: 8 },
      { t: 'gather', id: 'g3', x: 7, y: 3, item: 'yakusou' },
      { t: 'chest', id: 'b2', x: 6, y: 1, loot: { item: 'kawayoroi' } },
      { t: 'chest', id: 'b3', x: 7, y: 9, loot: { spell: 'mizu', coins: 10 } },
      { t: 'spot', id: 'goshinboku', x: 6, y: 2 },
      { t: 'cat', id: 'tama', x: 1, y: 9, need: 'q:s2' }
    ] },
  jinja: { name: 'Santuário da Raposa', jp: '狐の神社', ro: 'Kitsune no jinja', w: 'jinja', theme: 'jinja', safe: true,
    desc: 'Clareira silenciosa com um pequeno santuário. Aqui você pode descansar e recuperar as forças.',
    map: ['TTTTTTTTT', 'TT.....TT', 'T..III..T', 'T..III..T', 'T.,...,.T', 'T.......T', 'TT..=..TT', 'T...=...T', 'T,..=..,T', 'TT..=..TT', 'TTTT=TTTT'],
    obj: [
      { t: 'exit', x: 4, y: 10, to: 'mori', tx: 4, ty: 1 },
      { t: 'shrine', id: 'saisen', x: 4, y: 4 },
      { t: 'npc', id: 'kitsune', x: 6, y: 5 },
      { t: 'spot', id: 'ema', x: 2, y: 7 },
      { t: 'gather', id: 'g4', x: 7, y: 8, item: 'yakusou' },
      { t: 'chest', id: 'b4', x: 2, y: 1, loot: { item: 'ocha', n: 2, coins: 5 } }
    ] },
  kawa: { name: 'Rio Kiyokawa', jp: '清川', ro: 'Kiyokawa', w: 'kawa', theme: 'kawa',
    desc: 'Rio de água limpa. Uma ponte antiga leva à Caverna do Eco, mas alguém a vigia.',
    map: ['TTTTTTTTT', 'T..~~~..T', 'T.,~~~,.T', 'T..~~~..T', 'T..~~~.RT', 'T..~~~..T', 'T,.~~~,.T', 'T..~~~..T', '===BBB===', 'T..~~~..T', 'TTT~~~TTT'],
    obj: [
      { t: 'exit', x: 0, y: 8, to: 'mori', tx: 7, ty: 8 },
      { t: 'exit', x: 8, y: 8, to: 'dokutsu', tx: 4, ty: 9, need: 'boss_kappa' },
      { t: 'npc', id: 'gen', x: 1, y: 6 },
      { t: 'boss', id: 'kappa', e: 'kappa', x: 4, y: 8, flag: 'boss_kappa' },
      { t: 'sign', id: 'kawa', x: 2, y: 9, text: 'sign|この 橋の 先：洞窟|kono hashi no saki: doukutsu|Depois desta ponte: caverna', w: 'hashi' },
      { t: 'spot', id: 'tourou', x: 7, y: 6 },
      { t: 'chest', id: 'b5', x: 7, y: 1, loot: { item: 'kusuri', n: 2, coins: 10 } }
    ] },
  dokutsu: { name: 'Caverna do Eco', jp: '木霊の洞窟', ro: 'Kodama no doukutsu', w: 'doukutsu', theme: 'dokutsu',
    desc: 'Escura e úmida. Tudo o que você diz volta em eco. O Oni do Silêncio se esconde no fundo.',
    map: ['XXXXXXXXX', 'XX:::::XX', 'X:::X:::X', 'X:X:::X:X', 'X:X:X:X:X', 'X:::X:::X', 'XXX:::XXX', 'X:::X:::X', 'X:X:::X:X', 'X:::::::X', 'XXXX:XXXX'],
    obj: [
      { t: 'exit', x: 4, y: 10, to: 'kawa', tx: 7, ty: 8 },
      { t: 'enemy', id: 'd1', e: 'koumori', x: 1, y: 5 }, { t: 'enemy', id: 'd2', e: 'koumori', x: 7, y: 3 },
      { t: 'enemy', id: 'd3', e: 'ishi', x: 3, y: 8 }, { t: 'enemy', id: 'd4', e: 'ishi', x: 5, y: 3 },
      { t: 'gather', id: 'o1', x: 1, y: 7, item: 'tetsu' }, { t: 'gather', id: 'o2', x: 7, y: 7, item: 'tetsu' }, { t: 'gather', id: 'o3', x: 1, y: 2, item: 'tetsu' },
      { t: 'chest', id: 'b6', x: 7, y: 9, loot: { spell: 'kaze' } },
      { t: 'chest', id: 'b7', x: 1, y: 9, loot: { item: 'kabuto' } },
      { t: 'spot', id: 'hekiga', x: 7, y: 2 },
      { t: 'boss', id: 'oni', e: 'oni', x: 4, y: 1, flag: 'boss_oni' }
    ] }
};
/* mapa da região (visão geral) */
const RPG_REGION = {
  name: 'Vale Asahi', jp: '朝日の谷',
  nodes: { vila: [100, 330], campo: [100, 225], mori: [215, 225], jinja: [215, 115], kawa: [215, 335], dokutsu: [310, 335] },
  links: [['vila', 'campo'], ['campo', 'mori'], ['mori', 'jinja'], ['mori', 'kawa'], ['kawa', 'dokutsu']],
  future: [{ id: 'yama', name: 'Montanha Kumo', jp: '雲山', pos: [100, 110], from: 'campo' }, { id: 'umi', name: 'Costa Shio', jp: '潮の浜', pos: [36, 290], from: 'vila' }, { id: 'shiro', name: 'Castelo do Silêncio', jp: '静寂の城', pos: [300, 60], from: 'jinja' }]
};

/* ---------- descobertas (調べる) ---------- */
const RPG_SPOTS = {
  ido: { w: 'ido', pt: 'O poço da vila', text: 'Um poço antigo. Lá no fundo, a água reflete o céu. Dizem que quem fala uma palavra gentil aqui ouve a mesma palavra de volta.' },
  jizou: { w: 'jizou', pt: 'A estátua do Jizou', text: 'Uma pequena estátua de pedra com um gorro vermelho. Os viajantes deixam pedrinhas aos pés dela para ter uma viagem segura.' },
  goshinboku: { w: 'ki', pt: 'A árvore sagrada', text: 'Uma árvore gigantesca, amarrada com uma corda de palha (しめ縄). Quando o vento passa, as folhas parecem sussurrar palavras.' },
  ema: { w: 'negai', pt: 'As plaquinhas de desejos', text: 'Plaquinhas de madeira (絵馬) penduradas com desejos escritos: “passar na prova”, “ter saúde”, “falar japonês”.' },
  tourou: { w: 'tourou', pt: 'A lanterna de pedra', text: 'Uma lanterna de pedra coberta de musgo. Ainda tem uma vela acesa. Quem será que cuida dela?' },
  hekiga: { w: 'e', pt: 'A pintura na parede', text: 'Uma pintura antiga mostra pessoas falando e luzes saindo das bocas delas. Embaixo, um ogro tapa os ouvidos.' }
};

/* ---------- missões ---------- */
/* goal: { talk } | { kill, n } | { visit } | { boss } | { items:{id:n} } | { flag } | { spots:n } | { riddles:n }
   giver/turn: NPC que dá e que recebe (turn: null = conclui sozinha).  xp/coins: recompensa única do Nihongo Quest (nqRewardOnce). */
const RPG_QUESTS = {
  m1: { main: true, title: 'Despertar em Asahi', jp: '目覚め', desc: 'Fale com a Vovó Chiyo, a anciã da vila.', goal: { talk: 'chiyo' }, turn: 'chiyo', xp: 20, coins: 5, reward: { items: { bokutou: 1, kusuri: 2, chizu: 1 } } },
  m2: { main: true, title: 'Os mochis do campo', jp: '野原の餅', desc: 'Derrote 3 mochimochis no Campo Nohara e volte à Vovó Chiyo.', goal: { kill: 'mochi', n: 3 }, turn: 'chiyo', need: 'm1', xp: 30, coins: 10, reward: { spell: 'hi', flag: 'gate_mori' } },
  m3: { main: true, title: 'A floresta sussurrante', jp: '囁きの森', desc: 'Atravesse a floresta e reze no Santuário da Raposa.', goal: { flag: 'prayed' }, turn: null, need: 'm2', xp: 30, coins: 10, reward: { spell: 'kaifuku', items: { omamori: 1 } } },
  m4: { main: true, title: 'O guardião da ponte', jp: '橋の番人', desc: 'Vença o kappa que bloqueia a ponte do Rio Kiyokawa.', goal: { boss: 'kappa' }, turn: null, need: 'm3', xp: 40, coins: 20, reward: {} },
  m5: { main: true, title: 'A Caverna do Eco', jp: '木霊の洞窟', desc: 'Encontre o Oni do Silêncio no fundo da caverna e devolva as palavras ao vale.', goal: { boss: 'oni' }, turn: null, need: 'm4', xp: 50, coins: 30, reward: { items: { hikariken: 1 }, flag: 'cleared' } },
  s1: { title: 'Ervas para a Hana', jp: '薬草あつめ', desc: 'Junte 3 ervas medicinais (薬草) e leve para a Hana.', goal: { items: { yakusou: 3 } }, giver: 'hana', turn: 'hana', need: 'm1', xp: 20, coins: 5, reward: { items: { joyaku: 2 } } },
  s2: { title: 'O gato perdido', jp: '迷子の猫', desc: 'Ache a Tama, a gata do Sora, na floresta, e conte a ele.', goal: { flag: 'found_tama' }, giver: 'sora', turn: 'sora', need: 'm2', xp: 20, coins: 5, reward: { items: { suzu: 1 } } },
  s3: { title: 'Ferro para o ferreiro', jp: '鉄をさがせ', desc: 'Traga 3 minérios de ferro da Caverna do Eco para o Tetsu.', goal: { items: { tetsu: 3 } }, giver: 'tetsu', turn: 'tetsu', need: 'm4', xp: 20, coins: 5, reward: { items: { tetsuken: 1 } } },
  s4: { title: 'Os enigmas da raposa', jp: '狐のなぞなぞ', desc: 'Acerte 3 enigmas de palavras da Kohaku, no santuário.', goal: { riddles: 3 }, giver: 'kitsune', turn: 'kitsune', need: 'm2', xp: 20, coins: 5, reward: { items: { kitsunemen: 1 } } },
  s5: { title: 'Olhos de explorador', jp: '探検家の目', desc: 'Examine os 6 lugares especiais do Vale Asahi (✦ no mapa).', goal: { spots: 6 }, giver: 'gen', turn: 'gen', need: 'm1', xp: 25, coins: 10, reward: { items: { hachimaki: 1, ocha: 2 } } }
};
