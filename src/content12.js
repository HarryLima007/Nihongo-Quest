/* ==========================================================
   CONTEÚDO 3.0 — Iniciante (N5/N4): Kanji II (c17)
   [chave, kanji, leitura principal (romaji), significado,
    outras leituras, nota, [palavra, romaji, tradução]]
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;
  const c = NQK.wing({
    id: 'c17', emblem: '漢', title: 'Kanji II', jp: 'かんじ II', stage: 'ini', jlpt: 'N5–N4', chars: true,
    desc: 'Mais 100 kanji essenciais: família, tempo, direções, verbos, adjetivos, cidade, natureza, corpo, escola e ações.',
    requires: 'c7', reqWhy: 'Usa os radicais e as leituras da primeira ala de kanji.'
  });
  const intro = (a, b) => [a, 'Cada kanji tem uma leitura japonesa (kun), usada quando ele aparece sozinho ou com hiragana, e uma de origem chinesa (on), usada em palavras compostas.', b];
  c.lessons.push(
  L('c17l1', 'Família e pessoas', '父', 'kanji', intro('Os kanji da família aparecem em nomes de parentes, formulários e conversas do dia a dia.', 'Nas perguntas, você vai ler o kanji e escolher a leitura ou o significado.'),
    '兄 e 姉 têm a parte de “boca” e “pessoa” (兄) e “mulher” (姉): a irmã mais velha leva o radical 女.', [
    ['chichi', '父', 'chichi', 'pai', 'fu (父母 fubo, pais)', 'O kanji lembra dois braços segurando um machado: o trabalho do pai, na escrita antiga.', ['お父さん', 'otousan', 'pai (respeitoso)']],
    ['haha', '母', 'haha', 'mãe', 'bo (母国 bokoku, país natal)', '', ['お母さん', 'okaasan', 'mãe (respeitoso)']],
    ['tomo', '友', 'tomo', 'amigo', 'yuu (友人 yuujin, amigo, formal)', '', ['友達', 'tomodachi', 'amigo']],
    ['ani', '兄', 'ani', 'irmão mais velho', 'kyou (兄弟 kyoudai, irmãos)', '', ['お兄さん', 'oniisan', 'irmão mais velho (respeitoso)']],
    ['ane', '姉', 'ane', 'irmã mais velha', 'shi (姉妹 shimai, irmãs)', 'Tem o radical 女 (mulher).', ['お姉さん', 'oneesan', 'irmã mais velha (respeitoso)']],
    ['otouto', '弟', 'otouto', 'irmão mais novo', 'dai (兄弟 kyoudai)', '', ['弟さん', 'otoutosan', 'o irmão mais novo (de alguém)']],
    ['imouto', '妹', 'imouto', 'irmã mais nova', 'mai (姉妹 shimai)', 'Também tem 女.', ['妹さん', 'imoutosan', 'a irmã mais nova (de alguém)']],
    ['ie', '家', 'ie', 'casa', 'ka (家族 kazoku, família); uchi', 'Um porco (豕) sob um telhado (宀): a casa antiga.', ['家族', 'kazoku', 'família']],
    ['watashi', '私', 'watashi', 'eu', 'shi (私立 shiritsu, particular)', '', ['私の家', 'watashi no ie', 'minha casa']],
    ['kyou', '供', 'kyou', 'oferecer, acompanhar', 'domo (子供 kodomo, criança); sona(eru): oferecer', 'No dia a dia, quase sempre aparece em 子供 (kodomo).', ['子供', 'kodomo', 'criança']]
  ], [
    ['父と母と兄がいます。', 'chichi to haha to ani ga imasu.', 'Tenho pai, mãe e um irmão mais velho.'],
    ['私の家族は五人です。', 'watashi no kazoku wa gonin desu.', 'Minha família tem cinco pessoas.']
  ], [
    X.s('Qual kanji significa “irmã mais nova”?', ['妹|imouto', '姉|ane', '母|haha'], '妹 = irmã mais nova; 姉 = irmã mais velha.'),
    X.s('Como se lê 家族?', ['かぞく|kazoku', 'いえぞく|iezoku', 'かじょく|kajoku'], '家 tem a leitura “ka” em 家族.'),
    X.s('Em 兄弟 (irmãos), como se lê 兄?', ['きょう|kyou', 'あに|ani', 'けい|kei'], 'Em compostos, a leitura on: きょうだい.'),
    X.f('Meu pai', '私の＿', ['父|chichi', '友|tomo', '弟|otouto'], '父 = pai.')
  ]),
  L('c17l2', 'Partes do dia e do tempo', '朝', 'kanji', intro('Manhã, tarde, noite, antes e depois: kanji que aparecem em horários, cardápios e avisos.', '午前 (antes do meio-dia) e 午後 (depois do meio-dia) aparecem em todo horário escrito.'),
    '朝 tem o sol (日) e a lua (月) juntos: o sol nascendo enquanto a lua ainda está no céu.', [
    ['asa', '朝', 'asa', 'manhã', 'chou (朝食 choushoku, café da manhã)', '', ['毎朝', 'maiasa', 'toda manhã']],
    ['hiru', '昼', 'hiru', 'meio-dia, dia', 'chuu (昼食 chuushoku, almoço)', '', ['昼ご飯', 'hirugohan', 'almoço']],
    ['yoru', '夜', 'yoru', 'noite', 'ya (今夜 kon\'ya, esta noite)', '', ['夜中', 'yonaka', 'madrugada, meio da noite']],
    ['ban', '晩', 'ban', 'noite (fim do dia)', '', 'Usado em 晩ご飯 (jantar) e 今晩 (esta noite).', ['今晩', 'konban', 'esta noite']],
    ['go', '午', 'go', 'meio-dia (em horários)', '', 'Só aparece em compostos: 午前, 午後, 正午.', ['正午', 'shougo', 'meio-dia em ponto']],
    ['mae', '前', 'mae', 'antes; frente', 'zen (午前 gozen, manhã/a.m.)', '', ['午前', 'gozen', 'antes do meio-dia, a.m.']],
    ['ato', '後', 'ato', 'depois', 'go (午後 gogo, p.m.); ushi(ro): atrás', '', ['午後', 'gogo', 'depois do meio-dia, p.m.']],
    ['mai', '毎', 'mai', 'cada, todo', '', 'Sempre na frente: 毎日, 毎週, 毎年.', ['毎日', 'mainichi', 'todos os dias']],
    ['aida', '間', 'aida', 'intervalo, entre', 'kan (時間 jikan, tempo); ma', 'Um sol (日) visto pelo vão de um portão (門).', ['時間', 'jikan', 'tempo, horas']],
    ['yuu', '夕', 'yuu', 'entardecer', 'seki', '', ['夕方', 'yuugata', 'fim de tarde']]
  ], [
    ['毎朝七時に起きます。', 'maiasa shichiji ni okimasu.', 'Acordo às sete todas as manhãs.'],
    ['午後三時に会いましょう。', 'gogo sanji ni aimashou.', 'Vamos nos encontrar às três da tarde.']
  ], [
    X.s('Como se lê 午後?', ['ごご|gogo', 'ごあと|goato', 'うしろご|ushirogo'], '午後 = gogo (p.m.).'),
    X.s('Qual kanji significa “noite”?', ['夜|yoru', '朝|asa', '昼|hiru'], '夜 = noite.'),
    X.s('Em 時間, qual é a leitura de 間?', ['かん|kan', 'あいだ|aida', 'ま|ma'], 'Em compostos, leitura on: じかん.'),
    X.f('todos os dias', '＿日', ['毎|mai', '朝|asa', '今|ima'], '毎日 = mainichi.')
  ]),
  L('c17l3', 'Direções e posição', '東', 'kanji', intro('Pontos cardeais, direita e esquerda: os kanji das placas, das saídas de estação e dos mapas.', 'Grandes estações têm saídas como 東口 (saída leste) e 西口 (saída oeste).'),
    '東 é o sol (日) atrás de uma árvore (木): o lado de onde o sol nasce.', [
    ['higashi', '東', 'higashi', 'leste', 'tou (東京 toukyou)', '', ['東口', 'higashiguchi', 'saída leste']],
    ['nishi', '西', 'nishi', 'oeste', 'sei, sai (関西 kansai)', '', ['西口', 'nishiguchi', 'saída oeste']],
    ['minami', '南', 'minami', 'sul', 'nan (南米 nanbei, América do Sul)', '', ['南口', 'minamiguchi', 'saída sul']],
    ['kita', '北', 'kita', 'norte', 'hoku (北海道 hokkaidou)', 'Duas pessoas de costas uma para a outra.', ['北口', 'kitaguchi', 'saída norte']],
    ['migi', '右', 'migi', 'direita', 'u (右折 usetsu, virar à direita)', '', ['右側', 'migigawa', 'lado direito']],
    ['hidari', '左', 'hidari', 'esquerda', 'sa (左折 sasetsu)', 'Compare com 右: o de baixo de 左 é 工; o de 右 é 口.', ['左手', 'hidarite', 'mão esquerda']],
    ['naka', '中', 'naka', 'dentro, meio', 'chuu (中学 chuugaku, ensino fundamental II); juu (一日中)', 'Uma linha atravessando o meio de uma caixa.', ['中国', 'chuugoku', 'China']],
    ['soto', '外', 'soto', 'fora', 'gai (外国 gaikoku, exterior)', '', ['外国人', 'gaikokujin', 'estrangeiro']],
    ['kuchi', '口', 'kuchi', 'boca; entrada/saída', 'kou (人口 jinkou, população)', 'Já visto como “boca”; nas estações, 口 é “saída/entrada”.', ['出口', 'deguchi', 'saída']],
    ['michi', '道', 'michi', 'caminho, rua', 'dou (北海道; 柔道 juudou)', '', ['道路', 'douro', 'estrada']]
  ], [
    ['東京駅の北口で待っています。', 'toukyou eki no kitaguchi de matte imasu.', 'Estou esperando na saída norte da estação de Tóquio.'],
    ['外国人の友達がいます。', 'gaikokujin no tomodachi ga imasu.', 'Tenho amigos estrangeiros.']
  ], [
    X.s('Qual kanji significa “oeste”?', ['西|nishi', '東|higashi', '南|minami'], '西 = oeste.'),
    X.s('Como se lê 出口?', ['でぐち|deguchi', 'でくち|dekuchi', 'しゅつこう|shutsukou'], '口 vira “guchi” em 出口.'),
    X.s('Qual é a direita?', ['右|migi', '左|hidari', '中|naka'], '右 = direita; 左 = esquerda.'),
    X.f('estrangeiro', '＿国人', ['外|gai', '中|chuu', '北|hoku'], '外国人 = gaikokujin.')
  ]),
  L('c17l4', 'Verbos do dia a dia I', '読', 'kanji', intro('Ler, escrever, falar, ouvir: os verbos mais usados com seus kanji.', 'O hiragana depois do kanji (okurigana) mostra a conjugação: 読む, 読みます, 読んだ.'),
    '読, 話 e 語 têm o radical 言 (palavra): ações ligadas à língua.', [
    ['yomu', '読む', 'yomu', 'ler', 'doku (読書 dokusho, leitura)', '', ['読書', 'dokusho', 'leitura (hábito)']],
    ['kaku', '書く', 'kaku', 'escrever', 'sho (辞書 jisho, dicionário)', '', ['辞書', 'jisho', 'dicionário']],
    ['hanasu', '話す', 'hanasu', 'falar', 'wa (電話 denwa, telefone)', '', ['電話', 'denwa', 'telefone']],
    ['kiku', '聞く', 'kiku', 'ouvir; perguntar', 'bun (新聞 shinbun, jornal)', 'Um ouvido (耳) no portão (門).', ['新聞', 'shinbun', 'jornal']],
    ['kau', '買う', 'kau', 'comprar', 'bai (売買 baibai, compra e venda)', '', ['買い物', 'kaimono', 'compras']],
    ['yasumu', '休む', 'yasumu', 'descansar, faltar', 'kyuu (休日 kyuujitsu, feriado)', 'Uma pessoa (亻) encostada numa árvore (木).', ['休み', 'yasumi', 'folga, férias']],
    ['deru', '出る', 'deru', 'sair', 'shutsu (出発 shuppatsu, partida); dasu: tirar, enviar', '', ['出口', 'deguchi', 'saída']],
    ['hairu', '入る', 'hairu', 'entrar', 'nyuu (入学 nyuugaku); ireru: colocar', '', ['入口', 'iriguchi', 'entrada']],
    ['tatsu', '立つ', 'tatsu', 'ficar de pé', 'ritsu (国立 kokuritsu, nacional)', '', ['立ち入り禁止', 'tachiiri kinshi', 'entrada proibida']],
    ['au', '会う', 'au', 'encontrar (alguém)', 'kai (会社 kaisha, empresa; 会議 kaigi)', '', ['会社', 'kaisha', 'empresa']]
  ], [
    ['毎晩、新聞を読みます。', 'maiban, shinbun o yomimasu.', 'Leio o jornal todas as noites.'],
    ['入口はあちらです。', 'iriguchi wa achira desu.', 'A entrada é por ali.']
  ], [
    X.s('Como se lê 新聞?', ['しんぶん|shinbun', 'しんきく|shinkiku', 'あたらききく|atarakiku'], '聞 tem a leitura “bun” em 新聞.'),
    X.s('Qual kanji tem o ouvido (耳) dentro do portão?', ['聞|kiku', '間|aida', '開|aku'], '聞 = ouvir.'),
    X.s('Uma placa diz 入口. O que é?', ['entrada', 'saída', 'proibido'], '入口 = entrada; 出口 = saída.'),
    X.f('faltar ao trabalho', '仕事を＿む', ['休|yasu', '読|yo', '出|de'], '休む = descansar, faltar.')
  ]),
  L('c17l5', 'Adjetivos com kanji', '高', 'kanji', intro('Alto, barato, novo, velho, muito, pouco: adjetivos que aparecem em preços, anúncios e descrições.', 'Os adjetivos い escrevem o kanji e deixam o final em hiragana: 高い, 新しい.'),
    '高 desenha um prédio alto, com andares. 安 é uma mulher (女) sob um teto: em paz, tranquilo… e barato.', [
    ['takai', '高い', 'takai', 'alto; caro', 'kou (高校 koukou, ensino médio)', '', ['高校', 'koukou', 'ensino médio']],
    ['yasui', '安い', 'yasui', 'barato', 'an (安心 anshin, tranquilidade)', '', ['安心', 'anshin', 'alívio, tranquilidade']],
    ['nagai', '長い', 'nagai', 'longo, comprido', 'chou (社長 shachou, presidente da empresa)', '', ['社長', 'shachou', 'presidente da empresa']],
    ['atarashii', '新しい', 'atarashii', 'novo', 'shin (新聞 shinbun)', '', ['新年', 'shinnen', 'ano-novo']],
    ['furui', '古い', 'furui', 'velho, antigo (coisas)', 'ko (古代 kodai, antiguidade)', 'Para pessoas, “idoso” é 年を取った, não 古い.', ['中古', 'chuuko', 'usado, de segunda mão']],
    ['ooi', '多い', 'ooi', 'muitos, numeroso', 'ta (多分 tabun, provavelmente)', '', ['多分', 'tabun', 'provavelmente']],
    ['sukunai', '少ない', 'sukunai', 'poucos', 'shou (少年 shounen, garoto); suko(shi): um pouco', '', ['少し', 'sukoshi', 'um pouco']],
    ['hayai', '早い', 'hayai', 'cedo', 'sou (早朝 souchou, madrugada)', 'Rápido (velocidade) é outro kanji: 速い.', ['早く', 'hayaku', 'cedo, depressa']],
    ['tooi', '遠い', 'tooi', 'longe', 'en (遠足 ensoku, excursão)', '', ['遠足', 'ensoku', 'excursão escolar']],
    ['chikai', '近い', 'chikai', 'perto', 'kin (近所 kinjo, vizinhança)', '', ['近所', 'kinjo', 'vizinhança']]
  ], [
    ['この店は安くて、駅から近いです。', 'kono mise wa yasukute, eki kara chikai desu.', 'Esta loja é barata e perto da estação.'],
    ['新しい車は高いから、中古を買った。', 'atarashii kuruma wa takai kara, chuuko o katta.', 'Carro novo é caro, então comprei um usado.']
  ], [
    X.s('Qual é o oposto de 近い?', ['遠い|tooi', '長い|nagai', '高い|takai'], '近い (perto) × 遠い (longe).'),
    X.s('Como se lê 高校?', ['こうこう|koukou', 'たかこう|takakou', 'こうがく|kougaku'], 'Leitura on: こう + こう.'),
    X.s('Para dizer que uma pessoa é idosa, 古い serve?', ['Não: 古い é para coisas', 'Sim, sempre', 'Só para homens'], '古い descreve coisas antigas.'),
    X.f('provavelmente', '＿分', ['多|ta', '少|shou', '早|sou'], '多分 = tabun.')
  ]),
  L('c17l6', 'Cidade e sociedade', '町', 'kanji', intro('Os kanji de lugares e instituições aparecem em placas, endereços e mapas.', '駅, 店, 銀行 e 病院 estão em toda rua japonesa.'),
    '電 tem a chuva (雨) em cima: eletricidade como o raio de uma tempestade.', [
    ['kuni', '国', 'kuni', 'país', 'koku (外国 gaikoku; 中国 chuugoku)', 'Uma joia (玉) dentro de uma fronteira (囗).', ['国際', 'kokusai', 'internacional']],
    ['mise', '店', 'mise', 'loja', 'ten (店員 ten\'in, atendente)', '', ['書店', 'shoten', 'livraria']],
    ['eki', '駅', 'eki', 'estação', '', 'Tem o radical 馬 (cavalo): as antigas estações de troca de cavalos.', ['駅前', 'ekimae', 'em frente à estação']],
    ['machi', '町', 'machi', 'cidade pequena, bairro', 'chou (町長 chouchou, prefeito de vila)', '', ['町内', 'chounai', 'dentro do bairro']],
    ['den', '電', 'den', 'eletricidade', '', '', ['電車', 'densha', 'trem']],
    ['kuruma', '車', 'kuruma', 'carro, veículo', 'sha (電車 densha; 自転車 jitensha)', 'Visto de cima: um carro de duas rodas.', ['駐車場', 'chuushajou', 'estacionamento']],
    ['sha', '社', 'sha', 'empresa; santuário', 'yashiro (santuário)', '', ['神社', 'jinja', 'santuário xintoísta']],
    ['in', '院', 'in', 'instituição', '', 'Aparece em 病院 (hospital), 大学院 (pós-graduação), 美容院 (salão).', ['病院', 'byouin', 'hospital']],
    ['gin', '銀', 'gin', 'prata', '', '', ['銀行', 'ginkou', 'banco']],
    ['shi', '市', 'shi', 'cidade (município)', 'ichi (市場 ichiba, mercado)', 'Em endereços: 大阪市 (cidade de Osaka).', ['市役所', 'shiyakusho', 'prefeitura']]
  ], [
    ['駅前に銀行と病院があります。', 'ekimae ni ginkou to byouin ga arimasu.', 'Em frente à estação há um banco e um hospital.'],
    ['週末、神社に行きました。', 'shuumatsu, jinja ni ikimashita.', 'No fim de semana fui a um santuário.']
  ], [
    X.s('Qual kanji tem o radical 馬 (cavalo)?', ['駅|eki', '町|machi', '店|mise'], '駅 vem das antigas estações de cavalos.'),
    X.s('Como se lê 神社?', ['じんじゃ|jinja', 'かみしゃ|kamisha', 'しんしゃ|shinsha'], '社 vira “ja” em 神社.'),
    X.s('Uma placa diz 駐車場. O que é?', ['estacionamento', 'estação', 'hospital'], '駐車場 = chuushajou.'),
    X.f('banco', '＿行', ['銀|gin', '金|kin', '院|in'], '銀行 = ginkou.')
  ]),
  L('c17l7', 'Cores e natureza', '色', 'kanji', intro('Cores e paisagens: kanji presentes em nomes de lugares, de pessoas e em títulos de animes.', 'Muitos sobrenomes japoneses usam estes kanji: 青木, 森, 林, 石川.'),
    '林 são duas árvores (木木): um bosque. 森 são três: uma floresta.', [
    ['aka', '赤', 'aka', 'vermelho', 'seki (赤道 sekidou, equador)', '', ['赤ちゃん', 'akachan', 'bebê']],
    ['ao', '青', 'ao', 'azul', 'sei (青年 seinen, jovem)', '', ['青空', 'aozora', 'céu azul']],
    ['kuro', '黒', 'kuro', 'preto', 'koku (黒板 kokuban, quadro-negro)', '', ['黒板', 'kokuban', 'lousa']],
    ['iro', '色', 'iro', 'cor', 'shoku (特色 tokushoku, característica)', '', ['色々', 'iroiro', 'vários, diversos']],
    ['umi', '海', 'umi', 'mar', 'kai (海外 kaigai, exterior)', 'Tem o radical da água (氵).', ['海外', 'kaigai', 'exterior, fora do país']],
    ['sora', '空', 'sora', 'céu', 'kuu (空港 kuukou, aeroporto); a(ku): ficar vago', '', ['空港', 'kuukou', 'aeroporto']],
    ['kaze', '風', 'kaze', 'vento', 'fuu (台風 taifuu, tufão)', '', ['台風', 'taifuu', 'tufão']],
    ['mori', '森', 'mori', 'floresta', 'shin (森林 shinrin)', 'Três árvores.', ['森林', 'shinrin', 'floresta (formal)']],
    ['hayashi', '林', 'hayashi', 'bosque', 'rin', 'Duas árvores.', ['林業', 'ringyou', 'silvicultura']],
    ['ishi', '石', 'ishi', 'pedra', 'seki (石油 sekiyu, petróleo)', '', ['石油', 'sekiyu', 'petróleo']]
  ], [
    ['今日は青空がきれいですね。', 'kyou wa aozora ga kirei desu ne.', 'O céu azul está lindo hoje, né?'],
    ['台風で飛行機が飛びませんでした。', 'taifuu de hikouki ga tobimasen deshita.', 'Por causa do tufão, o avião não decolou.']
  ], [
    X.s('Qual kanji tem três árvores?', ['森|mori', '林|hayashi', '木|ki'], '森 = floresta (três árvores).'),
    X.s('Como se lê 海外?', ['かいがい|kaigai', 'うみそと|umisoto', 'かいそと|kaisoto'], 'Leituras on: かい + がい.'),
    X.s('O que é 赤ちゃん?', ['bebê', 'cor vermelha', 'menina'], 'Literalmente “o vermelhinho”: bebê.'),
    X.f('aeroporto', '＿港', ['空|kuu', '海|kai', '風|fuu'], '空港 = kuukou.')
  ]),
  L('c17l8', 'Corpo e saúde', '体', 'kanji', intro('Kanji que você vai ler em hospitais, farmácias, remédios e em descrições de pessoas.', 'O radical 病 (doença) aparece em vários kanji de enfermidades.'),
    '体 é uma pessoa (亻) + raiz/base (本): o corpo é a base da pessoa.', [
    ['karada', '体', 'karada', 'corpo', 'tai (体育 taiiku, educação física)', '', ['体重', 'taijuu', 'peso corporal']],
    ['atama', '頭', 'atama', 'cabeça', 'tou, zu (頭痛 zutsuu, dor de cabeça)', '', ['頭痛', 'zutsuu', 'dor de cabeça']],
    ['kao', '顔', 'kao', 'rosto', 'gan (洗顔 sengan, lavar o rosto)', '', ['笑顔', 'egao', 'sorriso, rosto sorridente']],
    ['kokoro', '心', 'kokoro', 'coração, mente', 'shin (心配 shinpai, preocupação)', '', ['心配', 'shinpai', 'preocupação']],
    ['koe', '声', 'koe', 'voz', 'sei (音声 onsei, áudio)', '', ['大声', 'oogoe', 'voz alta']],
    ['chikara', '力', 'chikara', 'força', 'ryoku (努力 doryoku, esforço)', '', ['努力', 'doryoku', 'esforço']],
    ['byou', '病', 'byou', 'doença', 'yamai (formal)', '', ['病気', 'byouki', 'doença']],
    ['i', '医', 'i', 'medicina', '', '', ['医者', 'isha', 'médico']],
    ['kusuri', '薬', 'kusuri', 'remédio', 'yaku (薬局 yakkyoku, farmácia)', 'Tem o radical de planta (艹): os remédios antigos eram ervas.', ['薬局', 'yakkyoku', 'farmácia']],
    ['kubi', '首', 'kubi', 'pescoço', 'shu (首都 shuto, capital)', '', ['首都', 'shuto', 'capital (de um país)']]
  ], [
    ['頭痛がするので、薬局で薬を買いました。', 'zutsuu ga suru node, yakkyoku de kusuri o kaimashita.', 'Estava com dor de cabeça, então comprei remédio na farmácia.'],
    ['彼女の笑顔が好きです。', 'kanojo no egao ga suki desu.', 'Gosto do sorriso dela.']
  ], [
    X.s('Como se lê 薬局?', ['やっきょく|yakkyoku', 'くすりきょく|kusurikyoku', 'やくきょく|yakukyoku'], 'やく + きょく → やっきょく.'),
    X.s('Qual kanji significa “coração, mente”?', ['心|kokoro', '体|karada', '力|chikara'], '心 = kokoro.'),
    X.s('O que significa 首都?', ['capital de um país', 'pescoço dolorido', 'cabeça'], '首 também é “principal”: 首都 = capital.'),
    X.f('esforço', '努＿', ['力|ryoku', '心|shin', '体|tai'], '努力 = doryoku.')
  ]),
  L('c17l9', 'Escola e estudo', '学', 'kanji', intro('Os kanji da vida escolar: estudar, ensinar, perguntas, respostas e as próprias letras.', 'Estes kanji aparecem em todo livro didático e prova japonesa.'),
    '字 é uma criança (子) sob um teto (宀): as letras que se aprendem em casa.', [
    ['ben', '勉', 'ben', 'esforçar-se', '', 'Quase sempre em 勉強.', ['勉強', 'benkyou', 'estudo']],
    ['tsuyoi', '強い', 'tsuyoi', 'forte', 'kyou (勉強 benkyou)', '', ['強力', 'kyouryoku', 'poderoso']],
    ['oshieru', '教える', 'oshieru', 'ensinar', 'kyou (教室 kyoushitsu, sala de aula)', '', ['教科書', 'kyoukasho', 'livro didático']],
    ['shitsu', '室', 'shitsu', 'sala', '', '', ['教室', 'kyoushitsu', 'sala de aula']],
    ['mon', '問', 'mon', 'pergunta, questão', 'to(u): perguntar', 'Uma boca (口) no portão (門): alguém perguntando.', ['質問', 'shitsumon', 'pergunta']],
    ['dai', '題', 'dai', 'tema, título', '', '', ['問題', 'mondai', 'problema, questão']],
    ['kotae', '答え', 'kotae', 'resposta', 'tou (回答 kaitou)', '', ['答える', 'kotaeru', 'responder']],
    ['ji', '字', 'ji', 'letra, caractere', '', '', ['漢字', 'kanji', 'kanji']],
    ['bun', '文', 'bun', 'frase, texto', 'mon (文句 monku, reclamação)', '', ['作文', 'sakubun', 'redação']],
    ['ei', '英', 'ei', 'Inglaterra; excelente', '', '', ['英語', 'eigo', 'inglês']]
  ], [
    ['先生、この問題の答えを教えてください。', 'sensei, kono mondai no kotae o oshiete kudasai.', 'Professor, me diga a resposta deste exercício, por favor.'],
    ['毎日、漢字を十個勉強しています。', 'mainichi, kanji o jukko benkyou shite imasu.', 'Estudo dez kanji todos os dias.']
  ], [
    X.s('Como se lê 問題?', ['もんだい|mondai', 'もんでい|mondei', 'といだい|toidai'], '問 (mon) + 題 (dai).'),
    X.s('Qual kanji tem uma boca dentro do portão?', ['問|mon', '聞|bun', '間|kan'], '問 = pergunta.'),
    X.s('O que é 作文?', ['redação', 'letra', 'livro'], '作 (fazer) + 文 (texto) = redação.'),
    X.f('inglês (língua)', '＿語', ['英|ei', '文|bun', '字|ji'], '英語 = eigo.')
  ]),
  L('c17l10', 'Verbos do dia a dia II', '歩', 'kanji', intro('Andar, correr, acordar, dormir, vestir, usar, fazer, esperar, segurar, enviar.', 'Repare como o mesmo kanji ganha leitura on em palavras compostas: 歩く (aruku) × 散歩 (sanpo).'),
    '休, 作, 使 e 待 mostram radicais diferentes: 亻 (pessoa), 彳 (caminhar).', [
    ['aruku', '歩く', 'aruku', 'andar, caminhar', 'ho, po (散歩 sanpo, passeio)', '', ['散歩', 'sanpo', 'passeio a pé']],
    ['hashiru', '走る', 'hashiru', 'correr', 'sou (競走 kyousou, corrida)', '', ['走り出す', 'hashiridasu', 'sair correndo']],
    ['okiru', '起きる', 'okiru', 'acordar, levantar', 'ki (起床 kishou)', '', ['早起き', 'hayaoki', 'acordar cedo']],
    ['neru', '寝る', 'neru', 'dormir', 'shin (寝室 shinshitsu, quarto)', '', ['昼寝', 'hirune', 'cochilo']],
    ['kiru', '着る', 'kiru', 'vestir (parte de cima)', 'chaku (到着 touchaku, chegada); tsu(ku): chegar', '', ['着物', 'kimono', 'quimono']],
    ['tsukau', '使う', 'tsukau', 'usar', 'shi (大使館 taishikan, embaixada)', '', ['使い方', 'tsukaikata', 'modo de usar']],
    ['tsukuru', '作る', 'tsukuru', 'fazer, produzir', 'saku (作文); sa (作業 sagyou)', '', ['手作り', 'tezukuri', 'feito à mão']],
    ['matsu', '待つ', 'matsu', 'esperar', 'tai (招待 shoutai, convite)', '', ['待合室', 'machiaishitsu', 'sala de espera']],
    ['motsu', '持つ', 'motsu', 'segurar, ter', 'ji (気持ち kimochi: aqui, mochi)', '', ['気持ち', 'kimochi', 'sentimento']],
    ['okuru', '送る', 'okuru', 'enviar; levar alguém', 'sou (放送 housou, transmissão)', '', ['見送る', 'miokuru', 'despedir-se de alguém que parte']]
  ], [
    ['この機械の使い方を教えてください。', 'kono kikai no tsukaikata o oshiete kudasai.', 'Me ensine a usar esta máquina, por favor.'],
    ['日曜日は公園を散歩します。', 'nichiyoubi wa kouen o sanpo shimasu.', 'No domingo passeio pelo parque.']
  ], [
    X.s('Como se lê 散歩?', ['さんぽ|sanpo', 'さんほ|sanho', 'ちるあるく|chiruaruku'], '歩 vira “po” em 散歩.'),
    X.s('O que é 手作り?', ['feito à mão', 'mão direita', 'trabalho manual pesado'], '手 (mão) + 作り (fazer).'),
    X.s('Qual kanji significa “esperar”?', ['待|matsu', '持|motsu', '特|toku'], '待つ = esperar. 持つ = segurar (parecidos!).'),
    X.f('modo de usar', '＿い方', ['使|tsuka', '作|tsuku', '持|mo'], '使い方 = tsukaikata.')
  ])
  );
})();
