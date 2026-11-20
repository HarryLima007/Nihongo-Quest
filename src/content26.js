/* ==========================================================
   CONTEÚDO 3.0 — Proficiente (N1): Expressões Cultas (c34),
   Leitura Proficiente (c35)
   ========================================================== */
(function () {
  const { lesson: L, X, text: T } = NQK;

  /* ---------- c34 Expressões Cultas ---------- */
  const e = NQK.wing({
    id: 'c34', emblem: '雅', title: 'Expressões Cultas', jp: 'きょうようのことば', stage: 'pro', jlpt: 'N1',
    desc: 'Expressões de origem chinesa, quatro kanji avançados, metáforas com 心 e 胸, palavras de cerimônias, vocabulário poético das estações e advérbios cultos.',
    requires: 'c28', reqWhy: 'Parte das expressões idiomáticas e dos provérbios do nível avançado.'
  });
  e.lessons.push(
  L('c34l1', 'Histórias da China antiga (故事成語)', '故', 'vocab', [
    '故事成語 são expressões que vêm de histórias da China antiga. Cada uma resume um episódio.',
    '矛盾 vem do vendedor que dizia ter uma lança (矛) que fura tudo e um escudo (盾) que nada fura.',
    'São comuns em editoriais, discursos e na fala de pessoas cultas.'
  ], '漁夫の利: enquanto a garça e o molusco brigavam, o pescador pegou os dois.', [
    ['mujun', '矛盾', 'mujun', 'contradição', '', ['彼の話には矛盾が多い。', 'kare no hanashi ni wa mujun ga ooi.', 'A história dele tem muitas contradições.']],
    ['gyofunori', '漁夫の利', 'gyofu no ri', 'um terceiro que lucra com a briga de dois', '', ['二社が争う間に、別の会社が漁夫の利を得た。', 'nisha ga arasou aida ni, betsu no kaisha ga gyofu no ri o eta.', 'Enquanto as duas empresas brigavam, uma terceira levou a vantagem.']],
    ['gojippo', '五十歩百歩', 'gojippo hyappo', 'farinha do mesmo saco, quase igual', '', ['どちらの案も五十歩百歩だ。', 'dochira no an mo gojippo hyappo da.', 'As duas propostas são farinha do mesmo saco.']],
    ['shimensoka', '四面楚歌', 'shimen soka', 'cercado de inimigos, sem apoio', '', ['反対意見ばかりで、四面楚歌の状態だ。', 'hantai iken bakari de, shimen soka no joutai da.', 'Só há opiniões contrárias, estou cercado.']],
    ['kiyuu', '杞憂', 'kiyuu', 'preocupação infundada', '', ['心配していたが、杞憂に終わった。', 'shinpai shite ita ga, kiyuu ni owatta.', 'Eu estava preocupado, mas era preocupação à toa.']],
    ['haisuinojin', '背水の陣', 'haisui no jin', 'sem possibilidade de recuo, tudo ou nada', '', ['背水の陣で最後の試合に臨む。', 'haisui no jin de saigo no shiai ni nozomu.', 'Encaro o último jogo sem possibilidade de recuo.']],
    ['goetsudoushuu', '呉越同舟', 'goetsu doushuu', 'inimigos obrigados a cooperar', '', ['ライバル同士が呉越同舟で協力した。', 'raibaru doushi ga goetsu doushuu de kyouryoku shita.', 'Os rivais tiveram de cooperar no mesmo barco.']],
    ['saiougauma', '人間万事塞翁が馬', 'ningen banji saiou ga uma', 'a sorte e o azar são imprevisíveis', '', ['失業したが、人間万事塞翁が馬だ。', 'shitsugyou shita ga, ningen banji saiou ga uma da.', 'Perdi o emprego, mas sorte e azar ninguém prevê.']]
  ], [
    ['安全を守ると言いながら予算を削るのは、明らかに矛盾している。', 'anzen o mamoru to iinagara yosan o kezuru no wa, akiraka ni mujun shite iru.', 'Dizer que protege a segurança e cortar o orçamento é claramente contraditório.']
  ], [
    X.s('Duas pessoas brigam e uma terceira leva o prêmio:', ['漁夫の利|gyofu no ri', '杞憂|kiyuu', '矛盾|mujun'], 'O pescador.'),
    X.s('“Era preocupação à toa”:', ['杞憂に終わった|kiyuu ni owatta', '背水の陣だった|haisui no jin datta', '四面楚歌だった|shimen soka datta'], '杞憂.'),
    X.s('O que significa 五十歩百歩?', ['quase a mesma coisa', 'uma grande diferença', 'andar muito'], 'Fugir 50 ou 100 passos dá no mesmo.'),
    X.s('De onde vem a palavra 矛盾?', ['da história da lança e do escudo', 'de um poema sobre o mar', 'de uma lenda japonesa sobre raposas'], '矛 + 盾.')
  ]),
  L('c34l2', 'Quatro kanji III', '熟', 'vocab', [
    'Os 四字熟語 avançados aparecem em discursos, jornais e na conversa culta.',
    'Muitos descrevem atitudes: 付和雷同 (seguir a maioria sem pensar), 我田引水 (puxar a brasa para a própria sardinha).',
    'Outros descrevem tempo e oportunidade: 千載一遇 (oportunidade única em mil anos), 一朝一夕 (da noite para o dia).'
  ], '一朝一夕 quase sempre aparece na negativa: 一朝一夕にはできない (não se faz da noite para o dia).', [
    ['kishikaisei', '起死回生', 'kishi kaisei', 'virada da derrota para a vitória', '', ['起死回生のホームランで逆転した。', 'kishi kaisei no hoomuran de gyakuten shita.', 'Viraram o jogo com um home run salvador.']],
    ['icchouisseki', '一朝一夕', 'icchou isseki', 'da noite para o dia', '', ['語学力は一朝一夕には身につかない。', 'gogakuryoku wa icchou isseki ni wa mi ni tsukanai.', 'Domínio de línguas não se adquire da noite para o dia.']],
    ['senzaiichiguu', '千載一遇', 'senzai ichiguu', 'oportunidade única', '', ['これは千載一遇のチャンスだ。', 'kore wa senzai ichiguu no chansu da.', 'Esta é uma oportunidade única.']],
    ['fuwaraidou', '付和雷同', 'fuwa raidou', 'seguir a maioria sem pensar', '', ['付和雷同せず、自分の頭で考えよう。', 'fuwa raidou sezu, jibun no atama de kangaeyou.', 'Não siga a maioria sem pensar: pense com a própria cabeça.']],
    ['gadeninsui', '我田引水', 'gaden insui', 'puxar a brasa para a própria sardinha', '', ['その主張は我田引水だと批判された。', 'sono shuchou wa gaden insui da to hihan sareta.', 'O argumento foi criticado por favorecer só o próprio lado.']],
    ['boujakubujin', '傍若無人', 'boujaku bujin', 'agir como se não houvesse ninguém, sem consideração', '', ['電車の中で傍若無人に騒ぐ若者がいた。', 'densha no naka de boujaku bujin ni sawagu wakamono ga ita.', 'Havia jovens fazendo barulho no trem sem a menor consideração.']],
    ['youishuutou', '用意周到', 'youi shuutou', 'preparado nos mínimos detalhes', '', ['彼は用意周到な人で、傘を二本持っていた。', 'kare wa youi shuutou na hito de, kasa o nihon motte ita.', 'Ele é previdente ao extremo: levava dois guarda-chuvas.']],
    ['kikiippatsu', '危機一髪', 'kiki ippatsu', 'por um fio, por um triz', '', ['危機一髪で事故を避けた。', 'kiki ippatsu de jiko o saketa.', 'Evitei o acidente por um triz.']]
  ], [
    ['信頼関係は一朝一夕に築けるものではない。', 'shinrai kankei wa icchou isseki ni kizukeru mono de wa nai.', 'Uma relação de confiança não se constrói da noite para o dia.']
  ], [
    X.s('Uma oportunidade que surge uma vez na vida:', ['千載一遇|senzai ichiguu', '危機一髪|kiki ippatsu', '付和雷同|fuwa raidou'], 'Mil anos, um encontro.'),
    X.s('Seguir a maioria sem opinião própria:', ['付和雷同|fuwa raidou', '用意周到|youi shuutou', '起死回生|kishi kaisei'], '付和雷同.'),
    X.f('Não se aprende da noite para o dia.', '＿にはできない。', ['一朝一夕|icchou isseki', '千載一遇|senzai ichiguu', '傍若無人|boujaku bujin'], 'Quase sempre na negativa.'),
    X.s('O que significa 我田引水?', ['favorecer só o próprio lado', 'regar o arrozal dos vizinhos', 'trabalhar em equipe'], 'Puxar a água para o próprio arrozal.')
  ]),
  L('c34l3', 'Metáforas com 心, 胸 e 肝', '胸', 'vocab', [
    'Sentimentos profundos são expressos com 心 (coração, mente), 胸 (peito) e 肝 (fígado, coragem).',
    '胸がいっぱい = emocionado demais para falar. 肝に銘じる = gravar na memória (uma lição). 腑に落ちない = não se convencer.',
    'Essas expressões soam mais maduras que 嬉しい ou 悲しい e são comuns em discursos e literatura.'
  ], '心を鬼にする = endurecer o coração (fazer algo duro pelo bem de alguém).', [
    ['munegaippai', '胸がいっぱいになる', 'mune ga ippai ni naru', 'ficar com o coração cheio, emocionado', '', ['卒業式で胸がいっぱいになった。', 'sotsugyoushiki de mune ga ippai ni natta.', 'Na formatura, fiquei com o coração cheio.']],
    ['munewoharu', '胸を張る', 'mune o haru', 'estufar o peito, ter orgulho', '', ['結果は負けでも、胸を張って帰ろう。', 'kekka wa make demo, mune o hatte kaerou.', 'Mesmo com a derrota, vamos voltar de cabeça erguida.']],
    ['munenikizamu', '胸に刻む', 'mune ni kizamu', 'gravar no coração', '', ['先生の言葉を胸に刻んだ。', 'sensei no kotoba o mune ni kizanda.', 'Gravei no coração as palavras do professor.']],
    ['kokorowooni', '心を鬼にする', 'kokoro o oni ni suru', 'endurecer o coração pelo bem de alguém', '', ['心を鬼にして、子供を叱った。', 'kokoro o oni ni shite, kodomo o shikatta.', 'Endureci o coração e dei bronca no meu filho.']],
    ['kokorogaoreru', '心が折れる', 'kokoro ga oreru', 'perder o ânimo, desmoronar', '', ['何度も失敗して、心が折れそうだ。', 'nando mo shippai shite, kokoro ga oresou da.', 'Falhei tantas vezes que estou quase desmoronando.']],
    ['kimonimeijiru', '肝に銘じる', 'kimo ni meijiru', 'gravar bem na memória (uma lição)', '', ['今回の失敗を肝に銘じます。', 'konkai no shippai o kimo ni meijimasu.', 'Vou gravar bem a lição deste erro.']],
    ['funiochinai', '腑に落ちない', 'fu ni ochinai', 'não se convencer, não fazer sentido', '', ['彼の説明はどうも腑に落ちない。', 'kare no setsumei wa doumo fu ni ochinai.', 'A explicação dele não me convence.']],
    ['kimogasuwaru', '肝が据わる', 'kimo ga suwaru', 'ter sangue-frio, ser corajoso', '', ['彼女は若いのに肝が据わっている。', 'kanojo wa wakai noni kimo ga suwatte iru.', 'Apesar de jovem, ela tem sangue-frio.']]
  ], [
    ['恩師の言葉を胸に刻み、新しい道を歩き始めた。', 'onshi no kotoba o mune ni kizami, atarashii michi o arukihajimeta.', 'Com as palavras do meu mestre gravadas no coração, comecei um novo caminho.']
  ], [
    X.s('“A explicação não me convence.”', ['腑に落ちない|fu ni ochinai', '胸を張る|mune o haru', '肝が据わる|kimo ga suwaru'], '腑に落ちない.'),
    X.s('Pedido de desculpas formal: “vou gravar bem esta lição”.', ['肝に銘じます|kimo ni meijimasu', '心が折れます|kokoro ga oremasu', '胸を張ります|mune o harimasu'], '肝に銘じる.'),
    X.s('Uma mãe que, com pena, ainda assim é firme com o filho:', ['心を鬼にする|kokoro o oni ni suru', '胸がいっぱいになる|mune ga ippai ni naru', '腑に落ちない|fu ni ochinai'], 'Endurecer o coração.'),
    X.s('O que significa 肝が据わっている?', ['ter sangue-frio', 'estar com dor no fígado', 'estar nervoso'], 'Coragem.')
  ]),
  L('c34l4', 'Palavras de cerimônias', '儀', 'vocab', [
    'Casamentos e funerais têm vocabulário próprio e regras rígidas.',
    'Em funerais: ご愁傷様です, 心よりお悔やみ申し上げます, ご冥福をお祈りいたします. Em casamentos: 末永くお幸せに.',
    'Há também 忌み言葉 (palavras a evitar): em casamentos, evita-se 切れる, 別れる, 重ね重ね; em funerais, evita-se repetir palavras como 重ね重ね, たびたび.'
  ], 'Em funerais, fale pouco e baixo. A frase curta ご愁傷様です já é suficiente.', [
    ['goshuushousama', 'ご愁傷様です', 'goshuushousama desu', 'meus sentimentos (pêsames)', '', ['このたびはご愁傷様です。', 'kono tabi wa goshuushousama desu.', 'Meus sentimentos pela sua perda.']],
    ['okuyami', 'お悔やみ申し上げます', 'okuyami moushiagemasu', 'apresento minhas condolências', '', ['心よりお悔やみ申し上げます。', 'kokoro yori okuyami moushiagemasu.', 'Apresento minhas sinceras condolências.']],
    ['gomeifuku', 'ご冥福をお祈りいたします', 'gomeifuku o oinori itashimasu', 'rezo pelo descanso da alma', '', ['故人のご冥福をお祈りいたします。', 'kojin no gomeifuku o oinori itashimasu.', 'Rezo pelo descanso da alma do falecido.']],
    ['suenagaku', '末永くお幸せに', 'suenagaku oshiawase ni', 'felicidades para sempre (casamento)', '', ['お二人とも、末永くお幸せに。', 'ofutari tomo, suenagaku oshiawase ni.', 'Felicidades para sempre aos dois.']],
    ['goshuugi', 'ご祝儀', 'goshuugi', 'dinheiro de presente (casamento)', 'Notas novas.', ['ご祝儀には新しいお札を入れる。', 'goshuugi ni wa atarashii osatsu o ireru.', 'No presente de casamento, colocam-se notas novas.']],
    ['kouden', '香典', 'kouden', 'dinheiro de condolência (funeral)', 'Notas usadas.', ['香典を受付に渡した。', 'kouden o uketsuke ni watashita.', 'Entreguei o dinheiro de condolência na recepção.']],
    ['imikotoba', '忌み言葉', 'imikotoba', 'palavras evitadas em cerimônias', '', ['結婚式のスピーチでは忌み言葉に注意する。', 'kekkonshiki no supiichi de wa imikotoba ni chuui suru.', 'No discurso de casamento, cuidado com as palavras de mau agouro.']],
    ['kojin', '故人', 'kojin', 'o falecido', '', ['故人は音楽をこよなく愛していた。', 'kojin wa ongaku o koyonaku aishite ita.', 'O falecido amava a música profundamente.']]
  ], [
    ['このたびは突然のことで、心よりお悔やみ申し上げます。', 'kono tabi wa totsuzen no koto de, kokoro yori okuyami moushiagemasu.', 'Foi tão repentino. Apresento minhas sinceras condolências.']
  ], [
    X.s('O que dizer à família num funeral?', ['ご愁傷様です|goshuushousama desu', 'おめでとうございます|omedetou gozaimasu', 'お疲れ様です|otsukaresama desu'], 'Pêsames.'),
    X.s('Para o presente de casamento (ご祝儀), usam-se notas:', ['novas', 'usadas', 'rasgadas'], 'Novas = preparado com alegria.'),
    X.s('Qual palavra se evita num discurso de casamento?', ['別れる|wakareru', '幸せ|shiawase', '笑顔|egao'], '忌み言葉.'),
    X.s('Para desejar felicidade aos noivos:', ['末永くお幸せに|suenagaku oshiawase ni', 'ご冥福をお祈りします|gomeifuku o oinori shimasu', 'ご愁傷様です|goshuushousama desu'], 'Casamento.')
  ]),
  L('c34l5', 'Palavras poéticas das estações', '季', 'vocab', [
    'O japonês tem palavras delicadas para momentos da natureza, muito usadas em poesia, cartas e literatura.',
    '木漏れ日 é a luz do sol que passa entre as folhas. 小春日和 é um dia ameno de outono que lembra a primavera.',
    'Conceitos estéticos: 風情 (charme, atmosfera), 侘び寂び (beleza do simples e do envelhecido), 物の哀れ (a melancolia diante do efêmero).'
  ], '小春日和 não é primavera: é um dia quente no fim do outono ou começo do inverno.', [
    ['komorebi', '木漏れ日', 'komorebi', 'luz do sol entre as folhas', '', ['森の中で木漏れ日が美しかった。', 'mori no naka de komorebi ga utsukushikatta.', 'Na floresta, a luz entre as folhas estava linda.']],
    ['koharubiyori', '小春日和', 'koharubiyori', 'dia ameno no fim do outono', '', ['今日は暖かくて、小春日和だ。', 'kyou wa atatakakute, koharubiyori da.', 'Hoje está quentinho, um típico dia ameno de outono.']],
    ['hanabie', '花冷え', 'hanabie', 'frio na época das cerejeiras', '', ['桜は咲いたが、花冷えの日が続く。', 'sakura wa saita ga, hanabie no hi ga tsuzuku.', 'As cerejeiras floresceram, mas os dias frios continuam.']],
    ['samidare', '五月雨', 'samidare', 'chuva da estação chuvosa', 'Também: algo intermitente (五月雨式).', ['五月雨が静かに降り続いている。', 'samidare ga shizuka ni furitsuzuite iru.', 'A chuva da estação continua caindo em silêncio.']],
    ['fuzei', '風情', 'fuzei', 'charme, atmosfera', '', ['雪の京都は風情がある。', 'yuki no kyouto wa fuzei ga aru.', 'Kyoto com neve tem muito charme.']],
    ['wabisabi', '侘び寂び', 'wabisabi', 'beleza do simples e do envelhecido', '', ['この茶室には侘び寂びが感じられる。', 'kono chashitsu ni wa wabisabi ga kanjirareru.', 'Nesta sala de chá sente-se o wabi-sabi.']],
    ['mononoaware', '物の哀れ', 'mono no aware', 'melancolia diante do efêmero', '', ['散る桜に物の哀れを感じる。', 'chiru sakura ni mono no aware o kanjiru.', 'Sinto a melancolia do efêmero nas cerejeiras que caem.']],
    ['yuunagi', '夕凪', 'yuunagi', 'calmaria do fim de tarde no mar', '', ['夕凪の海は鏡のようだった。', 'yuunagi no umi wa kagami no you datta.', 'O mar na calmaria do entardecer parecia um espelho.']]
  ], [
    ['縁側で木漏れ日を浴びながら、祖母はお茶を飲んでいた。', 'engawa de komorebi o abinagara, sobo wa ocha o nonde ita.', 'Na varanda, banhada pela luz entre as folhas, minha avó tomava chá.']
  ], [
    X.s('A luz do sol que passa entre as folhas:', ['木漏れ日|komorebi', '夕凪|yuunagi', '花冷え|hanabie'], '木漏れ日.'),
    X.s('小春日和 é:', ['um dia ameno no fim do outono', 'um dia de primavera', 'uma tempestade de verão'], 'Não é primavera.'),
    X.s('A melancolia diante do que é passageiro:', ['物の哀れ|mono no aware', '風情|fuzei', '五月雨|samidare'], 'Conceito estético clássico.'),
    X.s('O que significa 風情がある?', ['ter charme, atmosfera', 'ter muito vento', 'ser moderno'], '風情.')
  ]),
  L('c34l6', 'Advérbios cultos', '甚', 'vocab', [
    'O japonês formal usa advérbios que raramente aparecem na conversa: 甚だ (extremamente), 極めて (extremamente), 一概に (de modo geral).',
    'Alguns exigem negativa: 一概に〜とは言えない (não se pode generalizar), 断じて〜ない (de jeito nenhum).',
    'Outros indicam persistência: 依然として (ainda, como antes), 未だに (até hoje), 頑なに (obstinadamente).'
  ], '甚だ遺憾です (lamentamos profundamente) é frase típica de comunicados oficiais.', [
    ['hanahada', '甚だ', 'hanahada', 'extremamente (formal)', '', ['甚だ遺憾に思います。', 'hanahada ikan ni omoimasu.', 'Lamentamos profundamente.']],
    ['kiwamete', '極めて', 'kiwamete', 'extremamente', '', ['成功の可能性は極めて低い。', 'seikou no kanousei wa kiwamete hikui.', 'A chance de sucesso é extremamente baixa.']],
    ['ichigaini', '一概に', 'ichigai ni', 'de modo geral (com negativa)', '', ['一概に悪いとは言えない。', 'ichigai ni warui to wa ienai.', 'Não se pode dizer, de modo geral, que seja ruim.']],
    ['danjite', '断じて', 'danjite', 'de jeito nenhum, absolutamente', '', ['そんなことは断じて許さない。', 'sonna koto wa danjite yurusanai.', 'Isso eu não permito de jeito nenhum.']],
    ['izentoshite', '依然として', 'izen to shite', 'ainda, como antes', '', ['状況は依然として厳しい。', 'joukyou wa izen to shite kibishii.', 'A situação continua difícil.']],
    ['imadani', '未だに', 'imada ni', 'até hoje, ainda', '', ['あの日のことは未だに忘れられない。', 'ano hi no koto wa imada ni wasurerarenai.', 'Até hoje não consigo esquecer aquele dia.']],
    ['katakunani', '頑なに', 'katakuna ni', 'obstinadamente', '', ['彼は頑なに口を閉ざした。', 'kare wa katakuna ni kuchi o tozashita.', 'Ele se recusou obstinadamente a falar.']],
    ['kotogotoku', '悉く', 'kotogotoku', 'todos, sem exceção', 'Muitas vezes escrito ことごとく.', ['計画は悉く失敗した。', 'keikaku wa kotogotoku shippai shita.', 'Os planos falharam um por um, sem exceção.']]
  ], [
    ['事故から十年が経ったが、原因は依然として明らかになっていない。', 'jiko kara juunen ga tatta ga, gen\'in wa izen to shite akiraka ni natte inai.', 'Dez anos se passaram desde o acidente, mas a causa ainda não foi esclarecida.']
  ], [
    X.f('Não se pode generalizar.', '＿そうとは言えない。', ['一概に|ichigai ni', '極めて|kiwamete', '甚だ|hanahada'], '一概に + negativa.'),
    X.s('Em comunicado oficial: “lamentamos profundamente”.', ['甚だ遺憾です|hanahada ikan desu', '断じて遺憾です|danjite ikan desu', '未だに遺憾です|imada ni ikan desu'], '甚だ遺憾.'),
    X.s('O que significa 依然として?', ['ainda, como antes', 'de repente', 'nunca mais'], 'Persistência.'),
    X.s('Qual advérbio exige negativa e significa “de jeito nenhum”?', ['断じて|danjite', '極めて|kiwamete', '悉く|kotogotoku'], '断じて〜ない.')
  ])
  );

  /* ---------- c35 Leitura Proficiente ---------- */
  const r = NQK.wing({
    id: 'c35', emblem: '読', title: 'Leitura Proficiente', jp: 'どっかい', stage: 'pro', jlpt: 'N1',
    desc: 'Ensaio, editorial, crítica, coluna científica, texto filosófico e conto literário, no nível do N1.',
    requires: ['c29', 'c31'], reqWhy: 'Os textos exigem a gramática N1 e a experiência da Leitura N2.'
  });
  const howTo = a => [a, 'Textos de N1 são densos: leia por parágrafo, identifique o tema e a posição do autor, e só depois volte aos detalhes.', 'Toque em “Mostrar tradução” só depois de tentar entender sozinho.'];
  r.lessons.push(
  L('c35l1', 'Ensaio: a arte de esperar', '待', 'vocab', howTo('Um ensaio sobre a pressa da vida moderna e o valor de saber esperar.'),
    'Ensaios (随筆) partem de uma experiência pessoal e chegam a uma reflexão geral. Procure a frase em que o autor generaliza.', [
    ['aseri', '焦り', 'aseri', 'afobação, impaciência', '', ['試験が近づき、焦りを感じる。', 'shiken ga chikazuki, aseri o kanjiru.', 'Com a prova chegando, sinto afobação.']],
    ['nintai', '忍耐', 'nintai', 'paciência, perseverança', '', ['この仕事には忍耐が必要だ。', 'kono shigoto ni wa nintai ga hitsuyou da.', 'Este trabalho exige paciência.']],
    ['sokuza', '即座に', 'sokuza ni', 'imediatamente, na hora', '', ['質問に即座に答えた。', 'shitsumon ni sokuza ni kotaeta.', 'Respondeu à pergunta na hora.']],
    ['jukusei', '熟成', 'jukusei', 'maturação, envelhecimento (de alimentos)', '', ['このチーズは二年熟成させた。', 'kono chiizu wa ninen jukusei saseta.', 'Este queijo foi maturado por dois anos.']],
    ['temaokakeru', '手間をかける', 'tema o kakeru', 'dedicar tempo e cuidado', '', ['手間をかけて料理を作る。', 'tema o kakete ryouri o tsukuru.', 'Cozinhar com tempo e cuidado.']],
    ['megumi', '恵み', 'megumi', 'dádiva, bênção', '', ['自然の恵みに感謝する。', 'shizen no megumi ni kansha suru.', 'Agradecer às dádivas da natureza.']]
  ], [
    ['待つことは、何もしないことではない。時間に仕事を任せることなのだ。', 'matsu koto wa, nani mo shinai koto de wa nai. jikan ni shigoto o makaseru koto na no da.', 'Esperar não é não fazer nada. É confiar o trabalho ao tempo.']
  ], [
    X.s('Que experiência levou o autor a refletir?', ['Visitar um fabricante de missô que espera anos', 'Perder um trem', 'Esperar numa fila de banco'], '味噌蔵.'),
    X.s('Como o autor descreve a vida moderna?', ['Tudo precisa ser imediato', 'Tudo é lento demais', 'As pessoas têm tempo de sobra'], '即座に.'),
    X.s('Para o artesão, esperar significa:', ['confiar o trabalho ao tempo', 'perder dinheiro', 'não ter o que fazer'], '時間に任せる.'),
    X.s('Qual é a conclusão do autor?', ['Algumas coisas só ganham valor com o tempo', 'Devemos fazer tudo mais rápido', 'A tecnologia resolve tudo'], '熟成.')
  ], { textTitle: 'A arte de esperar', text: T([
    ['先日、三年かけて味噌を熟成させるという小さな蔵を訪ねた。', 'senjitsu, sannen kakete miso o jukusei saseru to iu chiisana kura o tazuneta.', 'Outro dia, visitei uma pequena adega onde se deixa o missô maturar por três anos.'],
    ['「急いでも、味噌は早くできません。私たちの仕事は、待つことなんです」と職人は笑った。', '"isoide mo, miso wa hayaku dekimasen. watashitachi no shigoto wa, matsu koto nan desu" to shokunin wa waratta.', '“Mesmo com pressa, o missô não fica pronto antes. Nosso trabalho é esperar”, riu o artesão.'],
    ['現代の私たちは、メールにも買い物にも、即座の答えを求めるようになった。', 'gendai no watashitachi wa, meeru ni mo kaimono ni mo, sokuza no kotae o motomeru you ni natta.', 'Hoje, passamos a exigir respostas imediatas, seja nos e-mails, seja nas compras.'],
    ['数分の遅れにさえ焦りを感じ、待つことを無駄な時間だと考えがちだ。', 'suufun no okure ni sae aseri o kanji, matsu koto o muda na jikan da to kangaegachi da.', 'Ficamos afobados até com alguns minutos de atraso e tendemos a ver a espera como tempo perdido.'],
    ['しかし、待つことは何もしないことではない。時間に仕事を任せることなのだ。', 'shikashi, matsu koto wa nani mo shinai koto de wa nai. jikan ni shigoto o makaseru koto na no da.', 'Mas esperar não é não fazer nada. É confiar o trabalho ao tempo.'],
    ['手間と忍耐をかけてこそ得られる恵みが、この世には確かにある。', 'tema to nintai o kakete koso erareru megumi ga, kono yo ni wa tashika ni aru.', 'Há, sem dúvida, dádivas neste mundo que só se obtêm com cuidado e paciência.']
  ]) }),
  L('c35l2', 'Editorial: inteligência artificial e trabalho', '機', 'vocab', howTo('Um editorial sobre o impacto da inteligência artificial no emprego.'),
    'Editoriais de N1 trazem argumentos e contra-argumentos. Identifique o que o jornal concede (確かに〜) e o que defende (しかし〜).', [
    ['jidouka', '自動化', 'jidouka', 'automação', '', ['工場の自動化が進んでいる。', 'koujou no jidouka ga susunde iru.', 'A automação das fábricas avança.']],
    ['daitai', '代替', 'daitai', 'substituição', '', ['機械による代替が進む。', 'kikai ni yoru daitai ga susumu.', 'A substituição por máquinas avança.']],
    ['kenen', '懸念', 'kenen', 'preocupação, receio', '', ['雇用への影響が懸念されている。', 'koyou e no eikyou ga kenen sarete iru.', 'Há receio quanto ao impacto no emprego.']],
    ['kakusa', '格差', 'kakusa', 'desigualdade, disparidade', '', ['所得の格差が広がる。', 'shotoku no kakusa ga hirogaru.', 'A desigualdade de renda aumenta.']],
    ['saikyouiku', '再教育', 'saikyouiku', 'requalificação', '', ['社員の再教育に力を入れる。', 'shain no saikyouiku ni chikara o ireru.', 'Investir na requalificação dos funcionários.']],
    ['seidosekkei', '制度設計', 'seido sekkei', 'desenho de políticas, de sistemas', '', ['新しい制度設計が必要だ。', 'atarashii seido sekkei ga hitsuyou da.', 'É preciso desenhar novas políticas.']]
  ], [
    ['技術の進歩そのものは止められない。問われているのは、それをどう使うかである。', 'gijutsu no shinpo sono mono wa tomerarenai. towarete iru no wa, sore o dou tsukau ka de aru.', 'O progresso técnico em si não pode ser detido. O que está em questão é como usá-lo.']
  ], [
    X.s('O que o editorial reconhece (確かに)?', ['Que a IA aumenta a produtividade', 'Que a IA é inútil', 'Que a IA já foi proibida'], 'Concessão.'),
    X.s('Qual é a preocupação principal?', ['Que a desigualdade aumente com a perda de empregos', 'Que os computadores fiquem caros', 'Que falte energia'], '格差.'),
    X.s('O que o jornal propõe?', ['Requalificação e novas políticas', 'Proibir a IA', 'Não fazer nada'], '再教育, 制度設計.'),
    X.s('Qual frase resume a posição do jornal?', ['A questão é como usar a tecnologia', 'A tecnologia deve parar', 'As pessoas não precisam trabalhar'], 'どう使うか.')
  ], { textTitle: 'Editorial: a IA e o futuro do trabalho', text: T([
    ['人工知能の急速な発達により、これまで人間が担ってきた仕事の多くが機械に代替されつつある。', 'jinkou chinou no kyuusoku na hattatsu ni yori, kore made ningen ga ninatte kita shigoto no ooku ga kikai ni daitai saretsutsu aru.', 'Com o rápido desenvolvimento da IA, muitas tarefas antes feitas por pessoas estão sendo substituídas por máquinas.'],
    ['確かに、人工知能は生産性を大きく高め、人手不足の解消にも役立つだろう。', 'tashika ni, jinkou chinou wa seisansei o ookiku takame, hitode busoku no kaishou ni mo yakudatsu darou.', 'É verdade que a IA aumenta muito a produtividade e deve ajudar a resolver a falta de mão de obra.'],
    ['しかし、仕事を失った人々が新たな職に就けなければ、社会の格差はいっそう広がりかねない。', 'shikashi, shigoto o ushinatta hitobito ga arata na shoku ni tsukenakereba, shakai no kakusa wa issou hirogarikanenai.', 'No entanto, se quem perder o emprego não conseguir outro, a desigualdade social pode se ampliar ainda mais.'],
    ['この懸念に対し、企業と政府は再教育の機会を広げるとともに、新たな制度設計を急ぐべきだ。', 'kono kenen ni taishi, kigyou to seifu wa saikyouiku no kikai o hirogeru to tomo ni, arata na seido sekkei o isogu beki da.', 'Diante disso, empresas e governo devem ampliar as oportunidades de requalificação e apressar novas políticas.'],
    ['技術の進歩そのものは止められない。問われているのは、それをどう使うかである。', 'gijutsu no shinpo sono mono wa tomerarenai. towarete iru no wa, sore o dou tsukau ka de aru.', 'O progresso técnico em si não pode ser detido. O que está em questão é como usá-lo.']
  ]) }),
  L('c35l3', 'Crítica: um filme silencioso', '評', 'vocab', howTo('Uma crítica de cinema sobre um filme quase sem diálogos.'),
    'Críticas misturam descrição e avaliação. Separe o que o filme é do que o crítico acha dele.', [
    ['kantoku', '監督', 'kantoku', 'diretor (de cinema)', '', ['監督の新作が公開された。', 'kantoku no shinsaku ga koukai sareta.', 'O novo filme do diretor estreou.']],
    ['enshutsu', '演出', 'enshutsu', 'direção, encenação', '', ['演出が見事だった。', 'enshutsu ga migoto datta.', 'A direção foi magnífica.']],
    ['byousha', '描写', 'byousha', 'descrição, retrato', '', ['心理描写が細かい。', 'shinri byousha ga komakai.', 'O retrato psicológico é minucioso.']],
    ['tantan', '淡々と', 'tantan to', 'de forma serena, sem dramatizar', '', ['日常が淡々と描かれる。', 'nichijou ga tantan to egakareru.', 'O cotidiano é retratado com serenidade.']],
    ['kanshou', '鑑賞', 'kanshou', 'apreciação (de arte)', '', ['映画を鑑賞する。', 'eiga o kanshou suru.', 'Assistir e apreciar um filme.']],
    ['kessaku', '傑作', 'kessaku', 'obra-prima', '', ['これは監督の最高傑作だ。', 'kore wa kantoku no saikou kessaku da.', 'Esta é a obra-prima do diretor.']]
  ], [
    ['派手な場面は一つもないが、見終わった後、長く心に残る作品である。', 'hade na bamen wa hitotsu mo nai ga, miowatta ato, nagaku kokoro ni nokoru sakuhin de aru.', 'Não há uma única cena espetacular, mas é uma obra que fica muito tempo no coração depois.']
  ], [
    X.s('Qual é a característica principal do filme?', ['Quase não tem diálogos', 'Tem muitas cenas de ação', 'É um musical'], 'セリフがほとんどない.'),
    X.s('O que o crítico elogia?', ['A forma como as imagens transmitem os sentimentos', 'Os efeitos especiais', 'O preço do ingresso'], '映像で語る.'),
    X.s('Que ressalva o crítico faz?', ['Alguns espectadores podem achar o ritmo lento', 'Os atores são ruins', 'O filme é curto demais'], 'ただし.'),
    X.s('Qual é a avaliação final?', ['Uma obra-prima que fica na memória', 'Um filme para esquecer', 'Um filme apenas comercial'], '傑作.')
  ], { textTitle: 'Crítica: “O som da neve”', text: T([
    ['山田監督の新作『雪の音』は、ほとんどセリフのない、異色の作品である。', 'yamada kantoku no shinsaku "yuki no oto" wa, hotondo serifu no nai, ishoku no sakuhin de aru.', 'O novo filme do diretor Yamada, “O som da neve”, é uma obra singular, quase sem falas.'],
    ['雪深い村で暮らす老夫婦の一年が、淡々と描かれていく。', 'yukibukai mura de kurasu roufuufu no ichinen ga, tantan to egakarete iku.', 'Retrata-se com serenidade um ano na vida de um casal de idosos numa aldeia coberta de neve.'],
    ['言葉で説明する代わりに、監督は光や音、人物の小さな仕草によって、二人の感情を描写している。', 'kotoba de setsumei suru kawari ni, kantoku wa hikari ya oto, jinbutsu no chiisana shigusa ni yotte, futari no kanjou o byousha shite iru.', 'Em vez de explicar com palavras, o diretor retrata os sentimentos dos dois pela luz, pelo som e pelos pequenos gestos.'],
    ['ただし、展開が非常にゆっくりしているため、退屈に感じる観客もいるだろう。', 'tadashi, tenkai ga hijou ni yukkuri shite iru tame, taikutsu ni kanjiru kankyaku mo iru darou.', 'Porém, como a narrativa é muito lenta, alguns espectadores podem achá-la entediante.'],
    ['それでも、鑑賞後に残る静かな余韻は、他の作品ではなかなか味わえない。', 'soredemo, kanshougo ni nokoru shizuka na yoin wa, hoka no sakuhin de wa nakanaka ajiwaenai.', 'Mesmo assim, a ressonância silenciosa que fica depois é difícil de encontrar em outras obras.'],
    ['派手さはないが、監督の最高傑作と呼ぶにふさわしい一本だ。', 'hadesa wa nai ga, kantoku no saikou kessaku to yobu ni fusawashii ippon da.', 'Não é chamativo, mas merece ser chamado de obra-prima do diretor.']
  ]) }),
  L('c35l4', 'Coluna científica: microplásticos', '環', 'vocab', howTo('Uma coluna de divulgação científica sobre microplásticos no oceano.'),
    'Textos científicos usam dados e termos técnicos. Foque na relação de causa e efeito e no que ainda não se sabe.', [
    ['bisai', '微細', 'bisai', 'minúsculo, microscópico', '', ['微細な粒子が見つかった。', 'bisai na ryuushi ga mitsukatta.', 'Foram encontradas partículas minúsculas.']],
    ['tadayou', '漂う', 'tadayou', 'ficar à deriva, flutuar', '', ['海にごみが漂っている。', 'umi ni gomi ga tadayotte iru.', 'Há lixo à deriva no mar.']],
    ['seitaikei', '生態系', 'seitaikei', 'ecossistema', '', ['生態系への影響を調べる。', 'seitaikei e no eikyou o shiraberu.', 'Investigar o impacto no ecossistema.']],
    ['chikuseki', '蓄積', 'chikuseki', 'acúmulo', '', ['体内に有害物質が蓄積する。', 'tainai ni yuugai busshitsu ga chikuseki suru.', 'Substâncias nocivas se acumulam no corpo.']],
    ['kaimei', '解明', 'kaimei', 'esclarecimento, elucidação', '', ['原因の解明が急がれる。', 'gen\'in no kaimei ga isogareru.', 'É urgente esclarecer a causa.']],
    ['sakugen', '削減', 'sakugen', 'redução, corte', '', ['プラスチックの使用を削減する。', 'purasuchikku no shiyou o sakugen suru.', 'Reduzir o uso de plástico.']]
  ], [
    ['問題の全容が解明されるのを待っていては、手遅れになりかねない。', 'mondai no zen\'you ga kaimei sareru no o matte ite wa, teokure ni narikanenai.', 'Se esperarmos o problema ser totalmente esclarecido, pode ser tarde demais.']
  ], [
    X.s('O que são microplásticos, segundo o texto?', ['Fragmentos de plástico de menos de 5 mm', 'Plásticos novos e resistentes', 'Peixes muito pequenos'], '五ミリ以下.'),
    X.s('Como eles chegam ao corpo humano?', ['Pelos peixes que comemos', 'Pelo ar condicionado', 'Pela água do banho'], '魚を通じて.'),
    X.s('O que ainda não se sabe?', ['O efeito exato na saúde humana', 'Se o plástico existe', 'Se há peixes no mar'], 'まだ解明されていない.'),
    X.s('O que o autor recomenda?', ['Reduzir o plástico sem esperar todas as respostas', 'Esperar mais pesquisas', 'Parar de comer peixe'], '待っていては手遅れ.')
  ], { textTitle: 'Microplásticos: o perigo invisível', text: T([
    ['マイクロプラスチックとは、大きさが五ミリ以下の微細なプラスチックのことである。', 'maikuropurasuchikku to wa, ookisa ga gomiri ika no bisai na purasuchikku no koto de aru.', 'Microplásticos são fragmentos minúsculos de plástico com menos de cinco milímetros.'],
    ['捨てられたプラスチックが紫外線や波によって細かく砕け、海を漂っている。', 'suterareta purasuchikku ga shigaisen ya nami ni yotte komakaku kudake, umi o tadayotte iru.', 'O plástico descartado se quebra em pedaços pelos raios ultravioleta e pelas ondas e fica à deriva no mar.'],
    ['これを魚が餌と間違えて食べ、その魚を通じて人間の体内にも取り込まれていると考えられる。', 'kore o sakana ga esa to machigaete tabe, sono sakana o tsuujite ningen no tainai ni mo torikomarete iru to kangaerareru.', 'Os peixes os comem confundindo-os com alimento, e acredita-se que, por meio desses peixes, eles entrem também no corpo humano.'],
    ['生態系や人体にどのような影響を及ぼすのか、その全容はまだ解明されていない。', 'seitaikei ya jintai ni dono you na eikyou o oyobosu no ka, sono zen\'you wa mada kaimei sarete inai.', 'Que efeitos isso tem sobre o ecossistema e o corpo humano ainda não foi totalmente esclarecido.'],
    ['しかし、汚染が蓄積してからでは遅い。', 'shikashi, osen ga chikuseki shite kara de wa osoi.', 'Mas, depois que a contaminação se acumular, será tarde.'],
    ['問題の全容が解明されるのを待つのではなく、今からプラスチックの削減に取り組むべきである。', 'mondai no zen\'you ga kaimei sareru no o matsu no de wa naku, ima kara purasuchikku no sakugen ni torikumu beki de aru.', 'Em vez de esperar o problema ser totalmente esclarecido, devemos começar já a reduzir o plástico.']
  ]) }),
  L('c35l5', 'Reflexão: impermanência', '常', 'vocab', howTo('Um texto reflexivo sobre a ideia de 無常 (impermanência) na cultura japonesa.'),
    'Textos filosóficos usam palavras abstratas e citações clássicas. Leia devagar e procure a definição de cada conceito.', [
    ['mujou', '無常', 'mujou', 'impermanência', '', ['人生の無常を感じる。', 'jinsei no mujou o kanjiru.', 'Sentir a impermanência da vida.']],
    ['utsuroi', '移ろい', 'utsuroi', 'mudança, passagem (do tempo)', '', ['季節の移ろいを楽しむ。', 'kisetsu no utsuroi o tanoshimu.', 'Apreciar a passagem das estações.']],
    ['hakanai', '儚い', 'hakanai', 'efêmero, passageiro', '', ['桜の命は儚い。', 'sakura no inochi wa hakanai.', 'A vida da cerejeira é efêmera.']],
    ['koten', '古典', 'koten', 'clássico (obra)', '', ['古典文学を読む。', 'koten bungaku o yomu.', 'Ler literatura clássica.']],
    ['kanjusei', '感受性', 'kanjusei', 'sensibilidade', '', ['感受性が豊かな人。', 'kanjusei ga yutaka na hito.', 'Uma pessoa de grande sensibilidade.']],
    ['ukeireru', '受け入れる', 'ukeireru', 'aceitar', '', ['変化を受け入れる。', 'henka o ukeireru.', 'Aceitar a mudança.']]
  ], [
    ['変わりゆくものだからこそ、今この瞬間がいとおしいのだ。', 'kawariyuku mono da kara koso, ima kono shunkan ga itooshii no da.', 'É justamente por tudo mudar que este momento é tão precioso.']
  ], [
    X.s('Qual obra clássica o texto cita?', ['O Hōjōki (方丈記)', 'Um mangá moderno', 'Um livro estrangeiro'], '鴨長明『方丈記』.'),
    X.s('O que significa a imagem do rio na citação?', ['Tudo muda o tempo todo', 'A água é sempre a mesma', 'Os rios são perigosos'], '元の水にあらず.'),
    X.s('Para o autor, a impermanência leva a:', ['valorizar o momento presente', 'desistir de tudo', 'ter medo do futuro'], 'いとおしい.'),
    X.s('Que exemplo da cultura japonesa o texto dá?', ['A apreciação das cerejeiras que caem', 'A pontualidade dos trens', 'O uso de máscaras'], '花見.')
  ], { textTitle: 'A beleza do que passa', text: T([
    ['「ゆく河の流れは絶えずして、しかも、もとの水にあらず。」', '"yuku kawa no nagare wa taezu shite, shikamo, moto no mizu ni arazu."', '“O fluxo do rio que corre nunca cessa, e no entanto nunca é a mesma água.”'],
    ['八百年以上前に鴨長明が『方丈記』の冒頭に記したこの言葉は、無常という考え方をよく表している。', 'happyakunen ijou mae ni kamo no choumei ga "houjouki" no boutou ni shirushita kono kotoba wa, mujou to iu kangaekata o yoku arawashite iru.', 'Estas palavras, escritas há mais de oitocentos anos por Kamo no Chōmei no início do Hōjōki, expressam bem a ideia de impermanência.'],
    ['この世のすべては移ろい、同じ姿のまま留まるものは何一つない。', 'kono yo no subete wa utsuroi, onaji sugata no mama todomaru mono wa nani hitotsu nai.', 'Tudo neste mundo muda; nada permanece com a mesma forma.'],
    ['日本人が散りゆく桜を愛でるのも、その儚さの中に美を見いだしてきたからだろう。', 'nihonjin ga chiriyuku sakura o mederu no mo, sono hakanasa no naka ni bi o miidashite kita kara darou.', 'Se os japoneses apreciam as cerejeiras que caem, talvez seja porque encontraram beleza nessa fugacidade.'],
    ['無常を受け入れることは、悲観することではない。', 'mujou o ukeireru koto wa, hikan suru koto de wa nai.', 'Aceitar a impermanência não é ser pessimista.'],
    ['変わりゆくものだからこそ、今この瞬間がいとおしいのだ。', 'kawariyuku mono da kara koso, ima kono shunkan ga itooshii no da.', 'É justamente por tudo mudar que este momento é tão precioso.']
  ]) }),
  L('c35l6', 'Conto: a última estação', '駅', 'vocab', howTo('Um conto curto sobre o último dia de uma pequena estação do interior.'),
    'Contos literários mostram sentimentos por ações e detalhes, sem explicar. Pergunte-se o que cada gesto revela.', [
    ['mujineki', '無人駅', 'mujineki', 'estação sem funcionários', '', ['この村の駅は無人駅だ。', 'kono mura no eki wa mujineki da.', 'A estação desta vila não tem funcionários.']],
    ['haisen', '廃線', 'haisen', 'desativação de uma linha de trem', '', ['この路線は来年廃線になる。', 'kono rosen wa rainen haisen ni naru.', 'Esta linha será desativada no ano que vem.']],
    ['kiteki', '汽笛', 'kiteki', 'apito (de trem ou navio)', '', ['遠くで汽笛が鳴った。', 'tooku de kiteki ga natta.', 'Ao longe, soou um apito.']],
    ['tatazumu', '佇む', 'tatazumu', 'ficar parado, imóvel (contemplando)', '', ['彼は橋の上に一人佇んでいた。', 'kare wa hashi no ue ni hitori tatazunde ita.', 'Ele estava parado, sozinho, sobre a ponte.']],
    ['sabiru', '錆びる', 'sabiru', 'enferrujar', '', ['古い自転車が錆びている。', 'furui jitensha ga sabite iru.', 'A bicicleta velha está enferrujada.']],
    ['nagori', '名残', 'nagori', 'vestígio, saudade (do que se vai)', '名残惜しい = dá pena se despedir.', ['夏の名残を感じる夕暮れ。', 'natsu no nagori o kanjiru yuugure.', 'Um entardecer com vestígios do verão.']]
  ], [
    ['最後の汽笛が山に響き、やがて辺りは静けさに包まれた。', 'saigo no kiteki ga yama ni hibiki, yagate atari wa shizukesa ni tsutsumareta.', 'O último apito ecoou nas montanhas e logo tudo foi envolvido pelo silêncio.']
  ], [
    X.s('O que acontece com a estação?', ['A linha será desativada e este é o último dia', 'Vão construir uma estação nova', 'Ela foi reformada'], '廃線.'),
    X.s('Quem é o velho na plataforma?', ['O antigo chefe da estação', 'Um turista', 'O maquinista'], '元駅長.'),
    X.s('O que o gesto da saudação ao trem revela?', ['Despedida e gratidão por anos de trabalho', 'Raiva da empresa', 'Pressa de ir embora'], '敬礼.'),
    X.s('O que a última frase sugere?', ['O fim de uma época, com serenidade', 'Que o trem voltará amanhã', 'Que houve um acidente'], '静けさ.')
  ], { textTitle: 'Conto: a última estação', text: T([
    ['その日、山あいの小さな無人駅には、珍しく大勢の人が集まっていた。', 'sono hi, yamaai no chiisana mujineki ni wa, mezurashiku oozei no hito ga atsumatte ita.', 'Naquele dia, na pequena estação sem funcionários entre as montanhas, havia uma multidão incomum.'],
    ['百年続いた路線が、今日を最後に廃線となるのだ。', 'hyakunen tsuzuita rosen ga, kyou o saigo ni haisen to naru no da.', 'A linha que funcionou por cem anos seria desativada depois daquele dia.'],
    ['人々の輪から少し離れて、一人の老人が錆びたベンチのそばに佇んでいた。', 'hitobito no wa kara sukoshi hanarete, hitori no roujin ga sabita benchi no soba ni tatazunde ita.', 'Um pouco afastado da multidão, um velho estava parado ao lado de um banco enferrujado.'],
    ['四十年間、この駅の駅長を務めた男だった。', 'yonjuunenkan, kono eki no ekichou o tsutometa otoko datta.', 'Era o homem que fora chefe daquela estação por quarenta anos.'],
    ['最後の列車がゆっくりと動き出すと、老人は背筋を伸ばし、名残を惜しむように静かに敬礼した。', 'saigo no ressha ga yukkuri to ugokidasu to, roujin wa sesuji o nobashi, nagori o oshimu you ni shizuka ni keirei shita.', 'Quando o último trem partiu devagar, o velho endireitou as costas e fez uma continência silenciosa, como quem lamenta a despedida.'],
    ['汽笛が一度だけ山に響き、やがて辺りは、いつもの静けさに戻っていった。', 'kiteki ga ichido dake yama ni hibiki, yagate atari wa, itsumo no shizukesa ni modotte itta.', 'O apito ecoou uma única vez nas montanhas e, aos poucos, tudo voltou ao silêncio de sempre.']
  ]) })
  );
})();
