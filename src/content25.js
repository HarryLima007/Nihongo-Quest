/* ==========================================================
   CONTEÚDO 3.0 — Proficiente (N1): Japonês Escrito e Formal (c32),
   Nuances e Pragmática (c33)
   ========================================================== */
(function () {
  const { lesson: L, X } = NQK;

  /* ---------- c32 Japonês Escrito e Formal ---------- */
  const w = NQK.wing({
    id: 'c32', emblem: '筆', title: 'Japonês Escrito e Formal', jp: 'かきことば', stage: 'pro', jlpt: 'N1',
    desc: 'Estilo である, conectivos escritos, cartas formais, linguagem de regulamentos, restos do japonês clássico, manchetes e escrita acadêmica.',
    requires: ['c27', 'c25'], reqWhy: 'O japonês escrito formal parte da gramática N2 e do japonês de negócios.'
  });
  w.lessons.push(
  L('c32l1', 'O estilo である', '筆', 'grammar', [
    'Textos escritos (artigos, ensaios, teses, editoriais) usam o estilo である no lugar de です e だ: 日本は島国である.',
    'Correspondências: だ → である, だった → であった, だろう → であろう, ではない → ではない, なのだ → なのである.',
    'である não é mais educado nem mais rude: é impessoal e objetivo. Não se mistura com です/ます no mesmo texto.'
  ], 'Em redações do JLPT e da faculdade, o estilo esperado é である (ou だ), nunca です/ます.', [
    ['s1', '日本は四つの大きな島から成る島国である。', 'nihon wa yottsu no ookina shima kara naru shimaguni de aru.', 'O Japão é um país insular formado por quatro grandes ilhas.', ''],
    ['s2', '当時、この地域は豊かな農村であった。', 'touji, kono chiiki wa yutaka na nouson de atta.', 'Naquela época, esta região era uma próspera área agrícola.', 'だった → であった.'],
    ['s3', 'この問題は、今後さらに深刻になるであろう。', 'kono mondai wa, kongo sara ni shinkoku ni naru de arou.', 'Este problema provavelmente vai se agravar ainda mais.', 'だろう → であろう.'],
    ['s4', '言葉は単なる道具ではない。文化そのものなのである。', 'kotoba wa tannaru dougu de wa nai. bunka sono mono na no de aru.', 'A língua não é uma simples ferramenta. É a própria cultura.', 'なのだ → なのである.'],
    ['s5', '重要なのは、結果よりも過程である。', 'juuyou na no wa, kekka yori mo katei de aru.', 'O importante é mais o processo do que o resultado.', ''],
    ['s6', '彼が何を考えていたのかは、今となっては知る由もない。', 'kare ga nani o kangaete ita no ka wa, ima to natte wa shiru yoshi mo nai.', 'O que ele pensava, hoje já não há como saber.', '知る由もない = não há como saber (escrito).']
  ], [
    ['少子化は、日本社会が直面している最も大きな課題の一つである。', 'shoushika wa, nihon shakai ga chokumen shite iru mottomo ookina kadai no hitotsu de aru.', 'A queda da natalidade é um dos maiores desafios que a sociedade japonesa enfrenta.']
  ], [
    X.s('Forma de である para だった:', ['であった|de atta', 'でございました|de gozaimashita', 'でした|deshita'], 'だった → であった.'),
    X.s('Forma de である para だろう:', ['であろう|de arou', 'でしょう|deshou', 'だろうである|darou de aru'], 'だろう → であろう.'),
    X.e('Num artigo: “O Japão é um país insular. Tem muitas montanhas.”', ['日本は島国である。|nihon wa shimaguni de aru.', '山が多いです。|yama ga ooi desu.'], 1, 'Não misture です/ます com である: 山が多い.'),
    X.s('O estilo である é:', ['impessoal e objetivo', 'muito educado', 'rude e casual'], 'Estilo de texto.')
  ]),
  L('c32l2', 'Conectivos do texto escrito', '接', 'grammar', [
    'O texto escrito usa conectivos próprios: したがって (portanto), すなわち (ou seja), ただし (porém, com ressalva), なお (além disso, observação).',
    'Para listar e escolher: および (e), ならびに (e também, em listas complexas), または / もしくは (ou), かつ (e ao mesmo tempo).',
    'Para contrastar: 一方 (por outro lado), それにもかかわらず (apesar disso), もっとも (embora, é verdade que).'
  ], 'ただし introduz uma condição ou exceção; なお acrescenta uma informação complementar.', [
    ['s1', '費用が足りない。したがって、計画を見直す必要がある。', 'hiyou ga tarinai. shitagatte, keikaku o minaosu hitsuyou ga aru.', 'Faltam recursos. Portanto, é preciso rever o plano.', ''],
    ['s2', '彼は母の兄、すなわち私の伯父である。', 'kare wa haha no ani, sunawachi watashi no oji de aru.', 'Ele é o irmão mais velho da minha mãe, ou seja, meu tio.', ''],
    ['s3', '入場は無料です。ただし、予約が必要です。', 'nyuujou wa muryou desu. tadashi, yoyaku ga hitsuyou desu.', 'A entrada é gratuita. Porém, é necessário reservar.', 'Ressalva.'],
    ['s4', '会議は十時からです。なお、資料は当日配布します。', 'kaigi wa juuji kara desu. nao, shiryou wa toujitsu haifu shimasu.', 'A reunião é às dez. Observação: o material será distribuído no dia.', 'Informação extra.'],
    ['s5', '氏名および住所を記入してください。', 'shimei oyobi juusho o kinyuu shite kudasai.', 'Preencha o nome e o endereço.', ''],
    ['s6', '申込書は郵送もしくはメールで提出すること。', 'moushikomisho wa yuusou moshiku wa meeru de teishutsu suru koto.', 'O formulário deve ser enviado pelo correio ou por e-mail.', 'もしくは = ou.']
  ], [
    ['この薬は効果が高い。もっとも、副作用がないわけではない。', 'kono kusuri wa kouka ga takai. motto mo, fukusayou ga nai wake de wa nai.', 'Este remédio é muito eficaz. É verdade, porém, que não deixa de ter efeitos colaterais.']
  ], [
    X.f('A loja abre todos os dias. Porém, fecha no Ano-Novo.', '毎日営業しています。＿、年末年始は休みです。', ['ただし|tadashi', 'すなわち|sunawachi', 'したがって|shitagatte'], 'Ressalva = ただし.'),
    X.f('O resultado foi bom. Portanto, o projeto continua.', '結果は良好だった。＿、計画は継続する。', ['したがって|shitagatte', 'ただし|tadashi', 'もっとも|motto mo'], 'Conclusão = したがって.'),
    X.s('Qual conectivo significa “ou seja”?', ['すなわち|sunawachi', 'なお|nao', 'および|oyobi'], 'すなわち.'),
    X.s('Qual conectivo acrescenta uma observação complementar?', ['なお|nao', 'したがって|shitagatte', 'すなわち|sunawachi'], 'なお.')
  ]),
  L('c32l3', 'Ligação escrita e negativa clássica', '連', 'grammar', [
    'Na escrita, frases se ligam pela raiz do verbo, no lugar da forma て: 資料を調べ、報告書をまとめた. Para い-adjetivos: 〜く (空は青く、風は涼しい).',
    'A negativa clássica ず substitui ないで e なくて: 何も言わず、出ていった. ずに é igual: 傘を持たずに出かけた.',
    'ぬ é a negativa clássica antes de substantivos: 見知らぬ人 (um desconhecido), 思わぬ結果 (um resultado inesperado).'
  ], 'する → せず, せずに. 来る → 来ず (こず).', [
    ['s1', '資料を集め、分析し、報告書にまとめた。', 'shiryou o atsume, bunseki shi, houkokusho ni matometa.', 'Reuni os dados, analisei e organizei num relatório.', 'Raiz do verbo.'],
    ['s2', '空は青く、風は心地よい。', 'sora wa aoku, kaze wa kokochi yoi.', 'O céu está azul e o vento é agradável.', 'い-adjetivo: 〜く.'],
    ['s3', '彼は何も言わず、部屋を出ていった。', 'kare wa nani mo iwazu, heya o dete itta.', 'Ele saiu do quarto sem dizer nada.', ''],
    ['s4', '準備もせずに試験を受けた。', 'junbi mo sezu ni shiken o uketa.', 'Fez a prova sem nem se preparar.', 'する → せず.'],
    ['s5', '見知らぬ人に声をかけられた。', 'mishiranu hito ni koe o kakerareta.', 'Fui abordado por um desconhecido.', 'ぬ + substantivo.'],
    ['s6', '思わぬところで、昔の友人に会った。', 'omowanu tokoro de, mukashi no yuujin ni atta.', 'Num lugar inesperado, encontrei um velho amigo.', '']
  ], [
    ['少年は振り返らず、まっすぐ前を見て歩き続けた。', 'shounen wa furikaerazu, massugu mae o mite arukitsuzuketa.', 'O menino seguiu andando sem olhar para trás, com os olhos para a frente.']
  ], [
    X.f('Sem dizer nada, ele foi embora.', '何も言わ＿、帰っていった。', ['ず|zu', 'ぬ|nu', 'く|ku'], 'ず = ないで.'),
    X.f('Forma clássica de しないで', '＿ずに', ['せ|se', 'し|shi', 'さ|sa'], 'する → せずに.'),
    X.s('O que significa 思わぬ結果?', ['resultado inesperado', 'resultado pensado', 'sem resultado'], 'ぬ = ない.'),
    X.s('Na escrita, 調べて、まとめた costuma virar:', ['調べ、まとめた|shirabe, matometa', '調べず、まとめた|shirabezu, matometa', '調べぬ、まとめた|shirabenu, matometa'], 'Raiz do verbo.')
  ]),
  L('c32l4', 'Cartas formais', '啓', 'grammar', [
    'Cartas formais japonesas abrem e fecham com pares fixos: 拝啓 … 敬具 (o mais comum), 謹啓 … 謹白 (mais solene).',
    'Depois de 拝啓 vem a saudação da estação (時候の挨拶): 春暖の候 (primavera), 盛夏の候 (verão), 秋冷の候 (outono), 厳寒の候 (inverno).',
    'Em seguida, deseja-se prosperidade: 貴社ますますご清栄のこととお慶び申し上げます. No fim: まずは書中にてご挨拶申し上げます.'
  ], 'O “候” lê-se こう e significa “estação”. Em cartas pessoais formais, usa-se também 〜の折 (おり).', [
    ['s1', '拝啓　春暖の候、ますますご清祥のこととお慶び申し上げます。', 'haikei shundan no kou, masumasu goseishou no koto to oyorokobi moushiagemasu.', 'Prezado(a), nesta agradável primavera, alegro-me por sua saúde e prosperidade.', 'Abertura.'],
    ['s2', '平素は格別のご高配を賜り、厚く御礼申し上げます。', 'heiso wa kakubetsu no gokouhai o tamawari, atsuku onrei moushiagemasu.', 'Agradecemos profundamente a atenção especial que sempre nos dispensa.', 'Agradecimento.'],
    ['s3', '盛夏の候、皆様いかがお過ごしでしょうか。', 'seika no kou, minasama ikaga osugoshi deshou ka.', 'Neste pleno verão, como têm passado todos?', 'Estação: verão.'],
    ['s4', '時節柄、どうぞご自愛ください。', 'jisetsugara, douzo gojiai kudasai.', 'Nesta época do ano, cuide-se bem.', 'Fechamento cordial.'],
    ['s5', 'まずは書中にてご挨拶申し上げます。', 'mazu wa shochuu nite goaisatsu moushiagemasu.', 'Por ora, envio meus cumprimentos por esta carta.', ''],
    ['s6', '今後ともよろしくお願い申し上げます。　敬具', 'kongo tomo yoroshiku onegai moushiagemasu. keigu', 'Contamos com sua atenção daqui em diante. Atenciosamente.', 'Fecha com 敬具.']
  ], [
    ['謹啓　厳寒の候、貴社ますますご清栄のこととお慶び申し上げます。', 'kinkei genkan no kou, kisha masumasu goseiei no koto to oyorokobi moushiagemasu.', 'Prezados senhores, neste rigoroso inverno, alegramo-nos pela crescente prosperidade de sua empresa.']
  ], [
    X.s('Uma carta que começa com 拝啓 termina com:', ['敬具|keigu', '謹白|kinpaku', '以上|ijou'], 'Par fixo: 拝啓 … 敬具.'),
    X.s('Saudação de estação para o inverno:', ['厳寒の候|genkan no kou', '盛夏の候|seika no kou', '春暖の候|shundan no kou'], '厳寒 = frio rigoroso.'),
    X.s('O que significa ご自愛ください?', ['cuide-se bem', 'ame a si mesmo demais', 'fique em casa'], 'Fechamento cordial.'),
    X.s('Abertura mais solene que 拝啓:', ['謹啓|kinkei', '前略|zenryaku', '草々|sousou'], '謹啓 … 謹白.')
  ]),
  L('c32l5', 'Linguagem de regulamentos', '規', 'grammar', [
    'Regulamentos e contratos usam fórmulas fixas: 〜ものとする (fica estabelecido que), 〜こと (deve-se), 〜を除く (exceto).',
    '〜に準ずる = seguir por analogia, equivalente a: 正社員に準ずる待遇.',
    'Também: 〜に限る (apenas), 〜を妨げない (não impede), 〜の限りではない (não se aplica).'
  ], 'この限りではない é a cláusula de exceção típica: “salvo em casos de…, isto não se aplica”.', [
    ['s1', '会員は、毎年会費を納めるものとする。', 'kaiin wa, maitoshi kaihi o osameru mono to suru.', 'Fica estabelecido que os membros pagam a anuidade todo ano.', ''],
    ['s2', '館内では、携帯電話の電源を切ること。', 'kannai de wa, keitai denwa no dengen o kiru koto.', 'Dentro do prédio, deve-se desligar o celular.', 'こと = instrução.'],
    ['s3', '土日祝日を除き、毎日開館します。', 'donichi shukujitsu o nozoki, mainichi kaikan shimasu.', 'Abre todos os dias, exceto sábados, domingos e feriados.', ''],
    ['s4', '契約社員は、正社員に準ずる待遇とする。', 'keiyaku shain wa, seishain ni junzuru taiguu to suru.', 'Os funcionários temporários terão tratamento equivalente ao dos efetivos.', ''],
    ['s5', '応募資格は、二十歳以上の者に限る。', 'oubo shikaku wa, hatachi ijou no mono ni kagiru.', 'Podem se inscrever apenas pessoas com vinte anos ou mais.', '者 (もの) = pessoa.'],
    ['s6', 'ただし、緊急の場合はこの限りではない。', 'tadashi, kinkyuu no baai wa kono kagiri de wa nai.', 'Porém, em caso de emergência, isto não se aplica.', 'Cláusula de exceção.']
  ], [
    ['本規約に定めのない事項については、別途協議の上、決定するものとする。', 'hon kiyaku ni sadame no nai jikou ni tsuite wa, betto kyougi no ue, kettei suru mono to suru.', 'Os assuntos não previstos neste regulamento serão decididos após discussão à parte.']
  ], [
    X.f('Fica estabelecido que o contrato vale por um ano.', '契約期間は一年とする＿。', ['もの|mono', 'こと|koto', 'ところ|tokoro'], '〜ものとする.'),
    X.s('O que significa この限りではない?', ['isto não se aplica', 'não há limite', 'é o último'], 'Cláusula de exceção.'),
    X.s('O que significa 正社員に準ずる?', ['equivalente aos efetivos', 'acima dos efetivos', 'sem relação com os efetivos'], '準ずる = por analogia.'),
    X.s('Num regulamento, 電源を切ること significa:', ['deve-se desligar', 'foi desligado', 'é possível desligar'], 'こと = instrução.')
  ]),
  L('c32l6', 'Restos do japonês clássico', '古', 'grammar', [
    'Algumas formas do japonês clássico continuam vivas em avisos, ditados e textos formais.',
    'べし (deve), べからず (não deve): 芝生に入るべからず. ごとし (como): 光陰矢のごとし. なかれ (não faça): 驚くなかれ.',
    'ざる (negativa antes de substantivo): 知られざる歴史 (história desconhecida). たる (que é, digno de): 教師たる者 (quem é professor).'
  ], '働かざる者食うべからず = quem não trabalha não come.', [
    ['s1', '芝生に入るべからず。', 'shibafu ni hairu bekarazu.', 'Proibido pisar na grama.', 'べからず = proibição.'],
    ['s2', '光陰矢のごとし。', 'kouin ya no gotoshi.', 'O tempo voa como uma flecha.', 'ごとし = como.'],
    ['s3', '驚くなかれ、彼はまだ十歳だ。', 'odoroku nakare, kare wa mada jussai da.', 'Não se espante: ele tem só dez anos.', 'なかれ.'],
    ['s4', 'これは知られざる日本の歴史である。', 'kore wa shirarezaru nihon no rekishi de aru.', 'Esta é uma história desconhecida do Japão.', 'ざる + substantivo.'],
    ['s5', '教師たる者、生徒の手本となるべきだ。', 'kyoushi taru mono, seito no tehon to naru beki da.', 'Quem é professor deve ser exemplo para os alunos.', 'たる = que é.'],
    ['s6', '働かざる者食うべからず。', 'hatarakazaru mono kuu bekarazu.', 'Quem não trabalha não come.', 'Ditado.']
  ], [
    ['初心忘るべからず、という言葉を胸に、毎日稽古を続けている。', 'shoshin wasuru bekarazu, to iu kotoba o mune ni, mainichi keiko o tsuzukete iru.', 'Com o lema “não esqueça o espírito do iniciante” no peito, continuo treinando todos os dias.']
  ], [
    X.s('Uma placa diz 立ち入るべからず. O que significa?', ['proibida a entrada', 'pode entrar', 'entre devagar'], 'べからず = proibição.'),
    X.f('O tempo voa como uma flecha.', '光陰矢の＿。', ['ごとし|gotoshi', 'べし|beshi', 'なかれ|nakare'], 'ごとし = como.'),
    X.s('O que significa 知られざる?', ['desconhecido', 'muito conhecido', 'que vai ser conhecido'], 'ざる = negativa clássica.'),
    X.s('Em 社長たる者, たる significa:', ['que é, na posição de', 'que não é', 'que foi'], 'たる.')
  ]),
  L('c32l7', 'Manchetes de jornal', '報', 'grammar', [
    'Manchetes cortam partículas e verbos para economizar espaço: 首相、来月訪米へ (o primeiro-ministro vai aos EUA no mês que vem).',
    'へ no fim = vai acontecer, está a caminho. か no fim = suspeita ou possibilidade: 原因は老朽化か.',
    'Muitas palavras são compostos chineses (漢語) curtos: 死去 (morte), 判明 (ficar claro), 急増 (aumento rápido), 容疑者 (suspeito).'
  ], 'Leia a manchete e depois procure no primeiro parágrafo (リード文) quem, quando, onde e o quê.', [
    ['s1', '首相、来月訪米へ', 'shushou, raigetsu houbei e', 'Primeiro-ministro visitará os EUA no mês que vem', 'へ = vai acontecer.'],
    ['s2', '橋崩落、原因は老朽化か', 'hashi houraku, gen\'in wa roukyuuka ka', 'Desabamento de ponte: causa seria o desgaste', 'か = suspeita.'],
    ['s3', '訪日客、過去最多を更新', 'hounichikyaku, kako saita o koushin', 'Turistas estrangeiros batem recorde histórico', ''],
    ['s4', '大雨で各地に被害　交通に乱れ', 'ooame de kakuchi ni higai koutsuu ni midare', 'Chuvas fortes causam estragos em várias regiões; transporte afetado', ''],
    ['s5', '容疑者を逮捕　動機を調べる', 'yougisha o taiho douki o shiraberu', 'Suspeito é preso; polícia investiga a motivação', ''],
    ['s6', '新薬の効果が判明', 'shin\'yaku no kouka ga hanmei', 'Comprovado o efeito de novo remédio', '判明 = ficar claro.']
  ], [
    ['円安進む　輸入品の値上げ相次ぐ', 'en\'yasu susumu yunyuuhin no neage aitsugu', 'Iene segue em queda; produtos importados sobem um após o outro']
  ], [
    X.s('O que indica へ no fim de 首相、訪米へ?', ['algo que vai acontecer', 'algo que já aconteceu', 'uma pergunta'], 'へ = a caminho.'),
    X.s('O que indica か no fim de 原因は老朽化か?', ['suspeita, possibilidade', 'certeza', 'negação'], 'か = provável.'),
    X.s('O que significa 過去最多?', ['o maior número da história', 'o mínimo do passado', 'mais do que no ano passado'], 'Recorde.'),
    X.s('O que significa 判明?', ['ficar claro, ser comprovado', 'ser esquecido', 'ser proibido'], '判明.')
  ]),
  L('c32l8', 'Escrita acadêmica', '稿', 'grammar', [
    'Textos acadêmicos evitam opiniões diretas e usam formas impessoais: 〜と考えられる (pode-se considerar), 〜と言える (pode-se dizer), 〜と思われる (parece).',
    'Para organizar: 本稿では (neste artigo), まず / 次に / 最後に, 以上のことから (com base no exposto).',
    'Para citar: 〜によれば (segundo ~), 〜が指摘するように (como aponta ~).'
  ], 'Em vez de 私は〜と思う, escreva 〜と考えられる: a voz impessoal dá objetividade.', [
    ['s1', '本稿では、若者の読書離れについて考察する。', 'honkou de wa, wakamono no dokusho banare ni tsuite kousatsu suru.', 'Neste artigo, analisamos o afastamento dos jovens da leitura.', 'Apresentação.'],
    ['s2', 'その原因は、スマートフォンの普及にあると考えられる。', 'sono gen\'in wa, sumaatofon no fukyuu ni aru to kangaerareru.', 'Pode-se considerar que a causa está na difusão dos smartphones.', ''],
    ['s3', '先行研究によれば、読書量は年々減少している。', 'senkou kenkyuu ni yoreba, dokushoryou wa nennen genshou shite iru.', 'Segundo estudos anteriores, a quantidade de leitura diminui a cada ano.', ''],
    ['s4', '田中が指摘するように、この傾向は都市部で顕著である。', 'tanaka ga shiteki suru you ni, kono keikou wa toshibu de kencho de aru.', 'Como aponta Tanaka, esta tendência é marcante nas áreas urbanas.', 'Autores citados sem さん.'],
    ['s5', '以上のことから、読書環境の整備が必要だと言える。', 'ijou no koto kara, dokusho kankyou no seibi ga hitsuyou da to ieru.', 'Com base no exposto, pode-se dizer que é preciso melhorar o ambiente de leitura.', 'Conclusão.'],
    ['s6', 'この点については、今後の課題としたい。', 'kono ten ni tsuite wa, kongo no kadai to shitai.', 'Deixamos este ponto como questão para estudos futuros.', 'Fechamento.']
  ], [
    ['調査の結果、睡眠時間と学習成果の間には相関があることが明らかになった。', 'chousa no kekka, suimin jikan to gakushuu seika no aida ni wa soukan ga aru koto ga akiraka ni natta.', 'A pesquisa revelou que há correlação entre o tempo de sono e o desempenho nos estudos.']
  ], [
    X.s('Num artigo acadêmico, em vez de 私はこう思う, prefira:', ['〜と考えられる|~to kangaerareru', '〜だよね|~da yo ne', '〜と思います|~to omoimasu'], 'Voz impessoal.'),
    X.s('O que significa 本稿では?', ['neste artigo', 'neste livro de receitas', 'nesta carta'], '本稿 = este texto.'),
    X.f('Com base no exposto, pode-se dizer que…', '＿、〜と言える。', ['以上のことから|ijou no koto kara', '本稿では|honkou de wa', 'まず|mazu'], 'Conclusão.'),
    X.s('Como se cita um autor no texto acadêmico?', ['Só pelo sobrenome, sem さん', 'Com 様 depois do nome', 'Com ちゃん depois do nome'], 'Estilo acadêmico.')
  ])
  );

  /* ---------- c33 Nuances e Pragmática ---------- */
  const n = NQK.wing({
    id: 'c33', emblem: '察', title: 'Nuances e Pragmática', jp: 'ニュアンス', stage: 'pro', jlpt: 'N1',
    desc: 'O que se diz e o que se quer dizer: recusas veladas, ambiguidade, 本音 e 建前, opinião cautelosa, palavras-almofada, modéstia e leitura do contexto.',
    requires: ['c28', 'c25'], reqWhy: 'Perceber nuances exige vocabulário idiomático e a gramática N2.'
  });
  n.lessons.push(
  L('c33l1', 'Recusas veladas', '婉', 'grammar', [
    'No Japão, um “não” direto é raro em situações formais. Várias frases que parecem positivas são, na prática, recusas.',
    '検討します / 前向きに検討します (vamos analisar) e 善処します (faremos o possível) muitas vezes significam “provavelmente não”.',
    '考えておきます (vou pensar) e 今回は見送らせていただきます (desta vez vamos deixar passar) também encerram o assunto com educação.'
  ], 'Se a resposta vier com ちょっと… e um silêncio, entenda como “não” e não insista.', [
    ['s1', 'ご提案については、社内で検討させていただきます。', 'goteian ni tsuite wa, shanai de kentou sasete itadakimasu.', 'Vamos analisar sua proposta internamente.', 'Muitas vezes, um “não”.'],
    ['s2', 'ご要望につきましては、善処いたします。', 'goyoubou ni tsukimashite wa, zensho itashimasu.', 'Quanto ao seu pedido, faremos o possível.', 'Promessa vaga.'],
    ['s3', 'うーん、考えておきます。', 'uun, kangaete okimasu.', 'Hum, vou pensar.', 'Recusa suave.'],
    ['s4', '残念ですが、今回は見送らせていただきます。', 'zannen desu ga, konkai wa miokurasete itadakimasu.', 'Infelizmente, desta vez vamos deixar passar.', 'Recusa clara e educada.'],
    ['s5', 'その日はちょっと…。', 'sono hi wa chotto….', 'Esse dia é um pouco…', 'Frase incompleta = não.'],
    ['s6', '行けたら行くね。', 'iketara iku ne.', 'Se der, eu vou.', 'Entre amigos, costuma ser “não vou”.']
  ], [
    ['貴重なご意見として、今後の参考にさせていただきます。', 'kichou na goiken to shite, kongo no sankou ni sasete itadakimasu.', 'Vamos considerá-la uma opinião valiosa para referência futura.']
  ], [
    X.s('Um cliente diz 前向きに検討します. Na prática, isso costuma ser:', ['um “provavelmente não” educado', 'um “sim” garantido', 'um pedido de desconto'], 'Recusa velada.'),
    X.s('Um amigo responde 行けたら行く. O que esperar?', ['que ele provavelmente não vá', 'que ele vá com certeza', 'que ele leve alguém'], 'Recusa suave.'),
    X.s('Qual é a recusa mais clara, mas educada?', ['今回は見送らせていただきます|konkai wa miokurasete itadakimasu', '善処します|zensho shimasu', '考えておきます|kangaete okimasu'], 'Deixar passar desta vez.'),
    X.s('Se alguém diz その日はちょっと… e para, você deve:', ['entender como “não” e não insistir', 'perguntar por quê', 'repetir o convite'], 'Ler o contexto.')
  ]),
  L('c33l2', 'Sim ou não? 結構です e いいです', '曖', 'grammar', [
    '結構です e いいです podem significar “sim, está ótimo” ou “não, obrigado”. O sentido depende do contexto e da entonação.',
    'Para aceitar sem ambiguidade: はい、お願いします. Para recusar: いえ、大丈夫です / けっこうです (com gesto de mão).',
    'O mesmo vale para 大丈夫です: no caixa, “袋は大丈夫です” quer dizer “não preciso de sacola”.'
  ], 'Na dúvida, diga claramente お願いします (sim) ou 要りません (não preciso).', [
    ['s1', '「お茶、もう一杯いかがですか。」「いえ、もう結構です。」', '"ocha, mou ippai ikaga desu ka." "ie, mou kekkou desu."', '“Aceita mais uma xícara de chá?” “Não, obrigado, já está bom.”', 'Recusa.'],
    ['s2', 'このデザインで結構です。', 'kono dezain de kekkou desu.', 'Este design está ótimo.', 'Aceitação.'],
    ['s3', '「袋はご利用ですか。」「大丈夫です。」', '"fukuro wa goriyou desu ka." "daijoubu desu."', '“Vai querer sacola?” “Não precisa.”', 'Recusa.'],
    ['s4', '「明日でもいいですか。」「いいですよ。」', '"ashita demo ii desu ka." "ii desu yo."', '“Pode ser amanhã?” “Pode, sim.”', 'Aceitação.'],
    ['s5', '「手伝いましょうか。」「いいです、いいです。」', '"tetsudaimashou ka." "ii desu, ii desu."', '“Quer ajuda?” “Não precisa, não precisa.”', 'Repetido = recusa.'],
    ['s6', 'はい、ぜひお願いします。', 'hai, zehi onegai shimasu.', 'Sim, por favor.', 'Aceitação clara.']
  ], [
    ['「レシートはご入用ですか。」「あ、結構です。」', '"reshiito wa go\'iriyou desu ka." "a, kekkou desu."', '“Precisa do recibo?” “Ah, não, obrigado.”']
  ], [
    X.s('No caixa: 「袋はご利用ですか。」「大丈夫です。」 O cliente:', ['não quer sacola', 'quer duas sacolas', 'está passando mal'], '大丈夫です = não precisa.'),
    X.s('「このままで結構です。」 significa:', ['assim está ótimo', 'não quero nada assim', 'quero trocar'], 'Aceitação.'),
    X.s('Para aceitar algo sem ambiguidade:', ['はい、お願いします|hai, onegai shimasu', 'いいです|ii desu', '結構です|kekkou desu'], 'Clareza.'),
    X.s('いいです、いいです, repetido com a mão balançando, significa:', ['não precisa', 'muito bom', 'quero mais'], 'Recusa.')
  ]),
  L('c33l3', '本音 e 建前', '裏', 'vocab', [
    '本音 (honne) é o que a pessoa realmente pensa. 建前 (tatemae) é o que se diz em público para manter a harmonia.',
    'Não é visto como mentira: é uma forma de proteger as relações. Saber distinguir os dois faz parte da competência social.',
    'Palavras ligadas: 空気を読む (ler o ambiente), 察する (perceber sem que digam), 遠慮 (contenção), 社交辞令 (gentileza de praxe).'
  ], '今度飲みに行きましょう muitas vezes é 社交辞令: uma gentileza, não um convite com data.', [
    ['honne', '本音', 'honne', 'o que se pensa de verdade', '', ['お酒が入ると、みんな本音を言い始める。', 'osake ga hairu to, minna honne o iihajimeru.', 'Quando bebem, todos começam a dizer o que realmente pensam.']],
    ['tatemae', '建前', 'tatemae', 'o que se diz por conveniência', '', ['建前では賛成しているが、本音は反対だ。', 'tatemae de wa sansei shite iru ga, honne wa hantai da.', 'Oficialmente concorda, mas no fundo é contra.']],
    ['kuukiwoyomu', '空気を読む', 'kuuki o yomu', 'ler o ambiente', 'KY = 空気が読めない.', ['会議では空気を読んで発言したほうがいい。', 'kaigi de wa kuuki o yonde hatsugen shita hou ga ii.', 'Nas reuniões, é melhor falar lendo o ambiente.']],
    ['sassuru', '察する', 'sassuru', 'perceber sem que digam', '', ['彼女の表情から、何かあったと察した。', 'kanojo no hyoujou kara, nanika atta to sasshita.', 'Pela expressão dela, percebi que algo tinha acontecido.']],
    ['shakoujirei', '社交辞令', 'shakoujirei', 'gentileza de praxe', '', ['「今度遊びに来てね」は社交辞令かもしれない。', '"kondo asobi ni kite ne" wa shakoujirei kamo shirenai.', '“Venha nos visitar” pode ser só uma gentileza de praxe.']],
    ['enryo', '遠慮', 'enryo', 'contenção, cerimônia', '遠慮なく = sem cerimônia.', ['遠慮しないで、たくさん食べてね。', 'enryo shinaide, takusan tabete ne.', 'Não faça cerimônia, coma bastante.']],
    ['omoiyari', '思いやり', 'omoiyari', 'consideração pelos outros', '', ['思いやりのある言葉に救われた。', 'omoiyari no aru kotoba ni sukuwareta.', 'Fui salvo por palavras cheias de consideração.']],
    ['anmokunoryoukai', '暗黙の了解', 'anmoku no ryoukai', 'acordo tácito', '', ['残業は暗黙の了解になっている。', 'zangyou wa anmoku no ryoukai ni natte iru.', 'As horas extras viraram um acordo tácito.']]
  ], [
    ['日本では、本音と建前を使い分けることが、大人のマナーだと考えられている。', 'nihon de wa, honne to tatemae o tsukaiwakeru koto ga, otona no manaa da to kangaerarete iru.', 'No Japão, saber alternar entre honne e tatemae é considerado uma etiqueta de adulto.']
  ], [
    X.s('Um colega diz 今度飲みに行きましょう sem marcar data. Provavelmente é:', ['社交辞令|shakoujirei', '本音|honne', '暗黙の了解|anmoku no ryoukai'], 'Gentileza de praxe.'),
    X.s('O que é 本音?', ['o que a pessoa realmente pensa', 'o que se diz em público', 'uma mentira'], 'Honne.'),
    X.s('Alguém que “não lê o ambiente” é chamado de:', ['空気が読めない人|kuuki ga yomenai hito', '思いやりのある人|omoiyari no aru hito', '遠慮する人|enryo suru hito'], 'KY.'),
    X.s('O que significa 遠慮なく?', ['sem cerimônia', 'com muita cerimônia', 'sem educação'], '遠慮.')
  ]),
  L('c33l4', 'Opinião cautelosa', '慎', 'grammar', [
    'Em contextos formais, opiniões fortes soam agressivas. O japonês prefere formas que suavizam a afirmação.',
    '〜のではないでしょうか (será que não…?) apresenta uma opinião como pergunta. 〜かと思います / 〜かと存じます suavizam ainda mais.',
    '〜ないこともない / 〜ないでもない (não é que não…) expressa um sim relutante: 行かないこともない.'
  ], 'Comparar: 間違っています (está errado) × 少し違うのではないでしょうか (será que não está um pouco diferente?).', [
    ['s1', 'この計画には、少し無理があるのではないでしょうか。', 'kono keikaku ni wa, sukoshi muri ga aru no de wa nai deshou ka.', 'Será que este plano não é um pouco forçado?', ''],
    ['s2', 'こちらの案のほうがよろしいかと存じます。', 'kochira no an no hou ga yoroshii ka to zonjimasu.', 'Creio que esta proposta seja mais adequada.', 'Muito formal.'],
    ['s3', '少し時間が足りないかと思います。', 'sukoshi jikan ga tarinai ka to omoimasu.', 'Acho que talvez falte um pouco de tempo.', ''],
    ['s4', '気持ちはわからないでもない。', 'kimochi wa wakaranai demo nai.', 'Não é que eu não entenda o sentimento.', 'Sim relutante.'],
    ['s5', '頼まれれば、やらないこともない。', 'tanomarereba, yaranai koto mo nai.', 'Se me pedirem, não é que eu não faça.', ''],
    ['s6', '私の理解が正しければ、締め切りは来週だったかと。', 'watashi no rikai ga tadashikereba, shimekiri wa raishuu datta ka to.', 'Se eu entendi bem, o prazo era na semana que vem, creio.', 'Frase cortada após かと.']
  ], [
    ['もう少し検討する余地があるのではないかと思われます。', 'mou sukoshi kentou suru yochi ga aru no de wa nai ka to omowaremasu.', 'Parece-me que ainda há espaço para analisar um pouco mais.']
  ], [
    X.s('Para discordar do chefe de forma cautelosa:', ['少し違うのではないでしょうか|sukoshi chigau no de wa nai deshou ka', '間違っています|machigatte imasu', '違うよ|chigau yo'], 'Opinião como pergunta.'),
    X.s('O que significa わからないでもない?', ['não é que eu não entenda', 'não entendo nada', 'entendo perfeitamente'], 'Sim relutante.'),
    X.f('Creio que esta seja a melhor opção. (muito formal)', 'こちらが最適か＿。', ['と存じます|to zonjimasu', 'だよ|da yo', 'じゃん|jan'], 'かと存じます.'),
    X.s('Por que o japonês suaviza opiniões em contextos formais?', ['opiniões fortes podem soar agressivas', 'porque é proibido opinar', 'porque ninguém tem opinião'], 'Harmonia.')
  ]),
  L('c33l5', 'Palavras-almofada', '緩', 'grammar', [
    'クッション言葉 (palavras-almofada) amortecem um pedido, uma recusa ou uma má notícia.',
    'Para pedir: 恐れ入りますが, お手数ですが, 差し支えなければ. Para recusar: あいにく, せっかくですが, 申し訳ございませんが.',
    'Para discordar ou perguntar algo delicado: 失礼ですが, 言いにくいのですが, ぶしつけながら.'
  ], 'A almofada vem antes do conteúdo e prepara o ouvinte: nunca vá direto ao pedido com um superior.', [
    ['s1', '恐れ入りますが、少々お待ちいただけますか。', 'osoreirimasu ga, shoushou omachi itadakemasu ka.', 'Desculpe o incômodo, poderia aguardar um momento?', ''],
    ['s2', 'お手数ですが、こちらにご記入ください。', 'otesuu desu ga, kochira ni gokinyuu kudasai.', 'Desculpe o trabalho, mas preencha aqui, por favor.', ''],
    ['s3', '差し支えなければ、ご連絡先を教えていただけますか。', 'sashitsukae nakereba, gorenrakusaki o oshiete itadakemasu ka.', 'Se não houver inconveniente, poderia me passar seu contato?', ''],
    ['s4', 'あいにく、その日は先約がございます。', 'ainiku, sono hi wa sen\'yaku ga gozaimasu.', 'Infelizmente, nesse dia já tenho um compromisso.', ''],
    ['s5', 'せっかくですが、今回はご遠慮いたします。', 'sekkaku desu ga, konkai wa goenryo itashimasu.', 'Agradeço a gentileza, mas desta vez vou declinar.', ''],
    ['s6', '言いにくいのですが、提出された書類に誤りがありました。', 'iinikui no desu ga, teishutsu sareta shorui ni ayamari ga arimashita.', 'É difícil dizer, mas havia um erro nos documentos entregues.', '']
  ], [
    ['失礼ですが、お名前をもう一度伺ってもよろしいでしょうか。', 'shitsurei desu ga, onamae o mou ichido ukagatte mo yoroshii deshou ka.', 'Com licença, posso perguntar seu nome mais uma vez?']
  ], [
    X.s('Para recusar um convite gentil:', ['せっかくですが|sekkaku desu ga', 'お手数ですが|otesuu desu ga', '差し支えなければ|sashitsukae nakereba'], 'Valoriza o convite antes de recusar.'),
    X.s('Para pedir que alguém preencha um formulário:', ['お手数ですが|otesuu desu ga', 'あいにく|ainiku', 'せっかくですが|sekkaku desu ga'], 'Reconhece o trabalho.'),
    X.f('Infelizmente, o produto está esgotado.', '＿、その商品は品切れでございます。', ['あいにく|ainiku', '差し支えなければ|sashitsukae nakereba', 'お手数ですが|otesuu desu ga'], 'Má notícia = あいにく.'),
    X.s('Qual a função das palavras-almofada?', ['amortecer pedidos, recusas e más notícias', 'encerrar a conversa', 'mostrar irritação'], 'クッション言葉.')
  ]),
  L('c33l6', 'Sinônimos com nuance', '微', 'vocab', [
    'O japonês tem vários verbos para ideias próximas, cada um com nuance própria.',
    'Olhar: 眺める (contemplar ao longe, com calma), 見つめる (fitar fixamente), 見渡す (olhar ao redor, abarcar com a vista).',
    'Falar: 述べる (expor formalmente), 語る (narrar, contar com profundidade), 囁く (sussurrar).'
  ], 'Escolher o verbo certo muda o tom: 夢を語る (falar do sonho com emoção) × 意見を述べる (expor uma opinião).', [
    ['nagameru', '眺める', 'nagameru', 'contemplar, olhar ao longe', '', ['窓から夜景を眺める。', 'mado kara yakei o nagameru.', 'Contemplo a vista noturna da janela.']],
    ['mitsumeru', '見つめる', 'mitsumeru', 'fitar, olhar fixamente', '', ['彼女は黙って私を見つめた。', 'kanojo wa damatte watashi o mitsumeta.', 'Ela me fitou em silêncio.']],
    ['miwatasu', '見渡す', 'miwatasu', 'olhar ao redor, abarcar com a vista', '', ['山頂から町全体を見渡した。', 'sanchou kara machi zentai o miwatashita.', 'Do topo da montanha, avistei a cidade inteira.']],
    ['noberu', '述べる', 'noberu', 'expor, declarar (formal)', '', ['会議で自分の意見を述べた。', 'kaigi de jibun no iken o nobeta.', 'Expus minha opinião na reunião.']],
    ['kataru', '語る', 'kataru', 'narrar, contar com profundidade', '', ['祖父は戦争の体験を語った。', 'sofu wa sensou no taiken o katatta.', 'Meu avô contou sua experiência na guerra.']],
    ['sasayaku', '囁く', 'sasayaku', 'sussurrar', 'Muitas vezes escrito ささやく.', ['彼は耳元で何かを囁いた。', 'kare wa mimimoto de nanika o sasayaita.', 'Ele sussurrou algo no meu ouvido.']],
    ['tsubuyaku', '呟く', 'tsubuyaku', 'murmurar consigo mesmo', 'Também “postar” em redes sociais.', ['「疲れた」と小さく呟いた。', '"tsukareta" to chiisaku tsubuyaita.', 'Murmurou baixinho: “Estou cansado”.']],
    ['nonoshiru', '罵る', 'nonoshiru', 'xingar, insultar', '', ['人を大声で罵るのはよくない。', 'hito o oogoe de nonoshiru no wa yoku nai.', 'Não é bom xingar os outros aos gritos.']]
  ], [
    ['二人は海を眺めながら、将来の夢を語り合った。', 'futari wa umi o nagamenagara, shourai no yume o katariatta.', 'Contemplando o mar, os dois conversaram sobre seus sonhos.']
  ], [
    X.s('Olhar o pôr do sol com calma, ao longe:', ['眺める|nagameru', '見つめる|mitsumeru', '見渡す|miwatasu'], 'Contemplar.'),
    X.s('Expor uma opinião formalmente numa reunião:', ['述べる|noberu', '囁く|sasayaku', '呟く|tsubuyaku'], 'Formal.'),
    X.s('Contar a história da própria vida com emoção:', ['語る|kataru', '述べる|noberu', '罵る|nonoshiru'], 'Narrar.'),
    X.s('Olhar fixamente nos olhos de alguém:', ['見つめる|mitsumeru', '眺める|nagameru', '見渡す|miwatasu'], 'Fitar.')
  ]),
  L('c33l7', 'Modéstia e elogios', '謙', 'grammar', [
    'Ao receber um elogio, o japonês costuma negar com modéstia (謙遜): いえいえ、まだまだです.',
    'Ao dar um presente: つまらないものですが (é só uma lembrancinha) ou, hoje mais comum, ほんの気持ちです (é só uma lembrança).',
    'Ao falar das próprias habilidades: 恐縮です (fico sem graça), おかげさまで (graças a vocês), 私なんて (alguém como eu).'
  ], 'Aceitar um elogio com ありがとうございます é aceitável hoje, mas a modéstia ainda é a resposta mais esperada.', [
    ['s1', '「日本語がお上手ですね。」「いえいえ、まだまだです。」', '"nihongo ga ojouzu desu ne." "ieie, madamada desu."', '“Seu japonês é muito bom.” “Imagina, ainda tenho muito a aprender.”', ''],
    ['s2', 'ほんの気持ちですが、どうぞお受け取りください。', 'honno kimochi desu ga, douzo ouketori kudasai.', 'É só uma lembrança, mas aceite, por favor.', ''],
    ['s3', 'そのように言っていただけるとは、恐縮です。', 'sono you ni itte itadakeru to wa, kyoushuku desu.', 'Fico até sem graça de o senhor dizer isso.', ''],
    ['s4', 'おかげさまで、無事に卒業できました。', 'okagesama de, buji ni sotsugyou dekimashita.', 'Graças a vocês, consegui me formar.', ''],
    ['s5', '私なんて、まだ何もできません。', 'watashi nante, mada nani mo dekimasen.', 'Alguém como eu ainda não sabe fazer nada.', ''],
    ['s6', 'つまらないものですが、皆様でどうぞ。', 'tsumaranai mono desu ga, minasama de douzo.', 'É uma coisinha à toa, mas aproveitem todos.', 'Forma tradicional.']
  ], [
    ['「素晴らしい発表でしたね。」「とんでもないです。皆さんのご協力のおかげです。」', '"subarashii happyou deshita ne." "tondemonai desu. minasan no gokyouryoku no okage desu."', '“Que apresentação excelente!” “Que nada. Foi graças à colaboração de todos.”']
  ], [
    X.s('Alguém elogia seu japonês. Resposta mais típica:', ['いえいえ、まだまだです|ieie, madamada desu', 'はい、上手です|hai, jouzu desu', '当然です|touzen desu'], 'Modéstia.'),
    X.s('Ao entregar um presente, hoje é mais comum dizer:', ['ほんの気持ちです|honno kimochi desu', '高かったです|takakatta desu', '使ってね、絶対|tsukatte ne, zettai'], 'Lembrança.'),
    X.s('O que significa 恐縮です?', ['fico sem graça (por tanta gentileza)', 'tenho medo', 'estou com pressa'], 'Modéstia.'),
    X.s('O que significa とんでもないです em resposta a um elogio?', ['que nada, imagina', 'que absurdo, que raiva', 'é verdade'], 'Negar o elogio.')
  ]),
  L('c33l8', 'Ler nas entrelinhas', '間', 'grammar', [
    'Muitas frases japonesas param no meio e deixam o resto para o ouvinte: ちょっと用事があるので… (tenho um compromisso, então…).',
    'Perguntas indiretas pedem coisas: この部屋、ちょっと暑くない? pode ser um pedido para abrir a janela.',
    'Em Kyoto, ぶぶ漬けでもどうどす? (que tal um chazuke?) é a anedota clássica de sugestão para a visita ir embora.'
  ], 'Preste atenção no que não foi dito: silêncios, pausas e frases cortadas carregam a mensagem.', [
    ['s1', 'すみません、今日はちょっと用事があるので…。', 'sumimasen, kyou wa chotto youji ga aru node….', 'Desculpe, hoje tenho um compromisso, então…', 'Não posso.'],
    ['s2', 'この部屋、ちょっと暑くない?', 'kono heya, chotto atsuku nai?', 'Este quarto não está um pouco quente?', 'Pedido indireto.'],
    ['s3', 'もうこんな時間ですね。', 'mou konna jikan desu ne.', 'Nossa, já é esta hora.', 'Sugere encerrar.'],
    ['s4', 'そろそろ…。', 'sorosoro….', 'Bom, já está na hora…', 'Hora de ir.'],
    ['s5', '明日までというのは、少し厳しいかもしれません。', 'ashita made to iu no wa, sukoshi kibishii kamo shiremasen.', 'Até amanhã talvez seja um pouco difícil.', 'Provavelmente não dá.'],
    ['s6', 'それはそうなんですけど…。', 'sore wa sou nan desu kedo….', 'Isso é verdade, mas…', 'Discordância suave.']
  ], [
    ['「この資料、明日の会議で使うんだけどなあ。」と部長が言ったので、私はすぐに準備を始めた。', '"kono shiryou, ashita no kaigi de tsukau n da kedo naa." to buchou ga itta node, watashi wa sugu ni junbi o hajimeta.', 'O diretor disse “vou usar este material na reunião de amanhã, sabe…”, então comecei a prepará-lo na hora.']
  ], [
    X.s('O anfitrião diz もうこんな時間ですね. Ele provavelmente quer:', ['encerrar o encontro', 'saber as horas', 'pedir comida'], 'Sugestão de encerrar.'),
    X.s('Um colega diz この部屋、ちょっと暑くない? O que fazer?', ['abrir a janela ou ligar o ar', 'responder só “sim”', 'sair do quarto'], 'Pedido indireto.'),
    X.s('明日までは少し厳しいかもしれません significa, na prática:', ['provavelmente não dá até amanhã', 'dá com certeza', 'vai ser divertido'], 'Recusa suave.'),
    X.s('A anedota de ぶぶ漬け em Kyoto ilustra:', ['uma sugestão indireta para a visita ir embora', 'um convite sincero para jantar', 'uma receita típica'], 'Entrelinhas.')
  ])
  );
})();
