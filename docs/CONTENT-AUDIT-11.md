# Investigação de vocabulário, Dicionário e cobertura de conteúdo (11.0.0)

Esta é uma investigação, não uma expansão: nenhuma palavra foi acrescentada. Na busca do Dicionário, só foram corrigidas as falhas comprovadas (seção D).

Os números vêm do próprio app compilado, contados pelo script `tests/content-audit.js` (só lê o app, não muda nada). O resultado completo está em `docs/content-audit-11.json` e pode ser gerado de novo com `node tests/content-audit.js`. As buscas corrigidas são conferidas em `tests/dict-search.js`.

**Como contamos:**

- **Registro:** um item de estudo de qualquer área, ou seja, uma linha que pode ir para o Caderno ou para a Revisão.
- **Palavra única:** a mesma grafia japonesa com o mesmo sentido, contada uma vez, mesmo que apareça em várias áreas. É a regra das palavras unificadas da 10.0.
- **Frases e caracteres:** frases de gramática e caracteres isolados (kana e kanji da Leitura) não entram no Dicionário. Isso é de propósito.

## A. Resumo

- O app tem **3.851 registros**:
  - 2.028 palavras.
  - 158 expressões.
  - 1.301 frases.
  - 364 caracteres.
- Tirando as repetições entre áreas, sobram:
  - **1.720 palavras únicas.**
  - **131 expressões únicas.**
  - **1.299 frases únicas.**
- **299 palavras** aparecem em mais de uma área.
- O **Dicionário tem 1.597 verbetes**:
  - 1.562 vêm das lições do app.
  - 253 são extras do próprio Dicionário, dos quais 35 existem só no Dicionário.
- Todo verbete é achado pela própria escrita em kana, em kanji e em romaji (0 falhas em 1.597).
- Quase todas as palavras e expressões estudadas no app estão no Dicionário. As exceções são:
  - 2 frases longas que estão cadastradas como vocabulário.
  - As 34 palavras novas do Adventure Mode, que ficaram fora de propósito para não misturar com a futura expansão.
- **“quadrado” e “chifre” não são falha da busca.** As palavras não existem em nenhuma área do app:
  - 四角 shikaku não está cadastrada.
  - 角 está só como *kado* “esquina, canto”, sem as leituras *tsuno* (chifre) e *kaku* (ângulo).
  - A busca responde certo: não há resultado.
- A busca tinha falhas reais em português, já corrigidas:
  - Feminino: “obrigada” não achava “Obrigado(a)”.
  - Artigo: “o gato”.
  - Plural: “gatos”, “estações”.
  - Hífen: “segunda feira”.
- **Maiores lacunas de vocabulário:**
  - Formas (4 de 12 palavras de referência).
  - Animais (12 de 25).
  - Roupas (10 de 18).
  - Advérbios (8 de 15).
  - Casa e móveis (13 de 20).
  - As 14 partículas não têm verbete no Dicionário (são ensinadas nas lições de gramática).
- **Pontos fortes:**
  - Cumprimentos (20/20).
  - Verbos (24/25).
  - Tempo e datas (19/20).
  - Natureza (19/20).
  - Transporte (19/20).
  - Números (18/20).

## B. Tabela por área

| Área | Registros | Palavras | Expressões | Frases | Caracteres | Só nesta área¹ | Observação |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Academia (349 lições, 35 alas) | 2.559 | 1.185 | 20 | 1.217 | 137 | 978 | 1.351 exercícios; 920 vocabulário, 265 palavras em kana, 20 números |
| Academia Auditiva (5 pacotes) | 188 | 86 | 29 | 73 | 0 | 83 | 22 diálogos, 99 falas |
| Listening Academy (28 lições) | 65 | 40 | 15 | 10 | 0 | 39 | 193 exercícios escritos, 18 diálogos |
| Leitura (49 lições, 5 etapas) | 614 | 375 | 12 | 0 | 227 | 233 | 104 hiragana, 97 katakana, 26 kanji |
| Mundo (5 lugares, 24 cenas) | 63 | 50 | 13 | 0 | 0 | 33 | 18 personagens, 240 falas |
| Chat (4 personagens) | 52 | 0 | 51 | 1 | 0 | 40 | 34 cenas e desafios |
| Dicionário (extras) | 253 | 235 | 18 | 0 | 0 | 86 | 35 verbetes só no Dicionário |
| Adventure Mode (novo) | 57 | 57 | 0 | 0 | 0 | 35 | ensinadas no jogo, fora das avaliações |
| **Total** | **3.851** | **2.028** | **158** | **1.301** | **364** | | 1.826 grafias únicas |

¹ Palavras e expressões que não aparecem em nenhuma outra área.

**Atributos dos 3.851 registros:**

| Atributo | Quantos | % |
| --- | ---: | ---: |
| Português | 3.851 | 100% |
| Romaji | 3.825 | 99% |
| Leitura em kana | 3.796 | 99% |
| Com kanji | 2.270 | 59% |
| Notas | 2.018 | 52% |
| Exemplo | 1.130 | 29% |
| Leitura alternativa | 208 | 5% |
| Áudio | todos | 100% |

**Sobre o áudio:** todos têm áudio pela voz do aparelho. 28 registros em kanji não têm kana e dependem só da leitura da voz.

**Caracteres:**

- Ensinados: 74 hiragana e 79 katakana.
- 240 kanji são itens de estudo.
- A tabela de kanji do Dicionário tem 278.
- O conteúdo inteiro usa 1.150 kanji diferentes.

**Atributos dos 1.597 verbetes do Dicionário:**

| Atributo | Quantos | % |
| --- | ---: | ---: |
| Com kanji | 1.118 | 70% |
| Exemplo | 950 | 59% |
| Notas | 881 | 55% |
| Classe gramatical | 544 | 34% |
| Mais de um sentido | 276 | 17% |
| Mais de uma área de origem | 246 | 15% |

- Sem classe gramatical: 1.053 verbetes.
- Sem tema: 804 verbetes.
- Kanji com mais de uma leitura registrada: só 3.

## C. Categorias

Para cada categoria, montamos uma lista de palavras essenciais para iniciante e intermediário, em português. A coluna “no Dicionário” conta as palavras que têm um verbete com esse sentido. As palavras que faltam não estão em nenhuma área do app.

| Categoria | No Dicionário | Situação | Faltam (amostra) |
| --- | ---: | --- | --- |
| Cumprimentos e expressões | 20/20 | bem coberta | — |
| Verbos comuns | 24/25 | bem coberta | sentar |
| Cidade e transporte | 19/20 | bem coberta | semáforo |
| Natureza e clima | 19/20 | bem coberta | calor |
| Tempo, dias e datas | 19/20 | bem coberta | todo dia |
| Números e quantidades | 18/20 | bem coberta | tudo; “primeiro” só fora do Dicionário |
| Adjetivos | 19/22 | bem coberta | lento, baixo, fraco |
| Comida e bebidas | 22/25 | bem coberta | laranja, sopa, açúcar |
| Objetos do cotidiano | 17/20 | bem coberta | papel, caixa, jornal |
| Escola e estudo | 17/20 | bem coberta | aluno, lousa, férias |
| Pessoas e família | 18/22 | parcial | filha, aluno, esposa, bebê |
| Lugares e estabelecimentos | 16/20 | parcial | museu, templo, farmácia, praia |
| Cores | 10/12 | parcial | laranja, cinza |
| Anime, jogos e entretenimento | 13/15 | parcial | vilão, batalha |
| Corpo humano | 15/20 | parcial | braço, dente, dedo, garganta, ombro |
| Emoções e estados | 10/15 | parcial | bravo, surpreso, animado, preocupado, nervoso |
| Casa e móveis | 13/20 | pouco coberta | geladeira, parede, chão, lâmpada, armário, chuveiro, apartamento |
| Advérbios | 8/15 | pouco coberta | às vezes, nunca, logo, talvez, de novo, também, só |
| Roupas e acessórios | 10/18 | pouco coberta | calça, vestido, sapato, chapéu, anel, quimono, luva, cachecol |
| Animais | 12/25 | pouco coberta | galinha, rato, macaco, leão, tigre, elefante, sapo, tartaruga, borboleta, **chifre**, rabo, asa |
| Formas | 4/12 | pouco coberta | **quadrado**, triângulo, retângulo, redondo, forma, ponto, cubo |
| Partículas (verbete próprio) | 0/14 | ausente no Dicionário | は が を に で へ と の も か から まで よ ね (ensinadas só na gramática) |

Os temas do Dicionário confirmam o quadro:

- Animais tem 19 verbetes, Cores 11 e Transporte 12.
- Cumprimentos tem 224 verbetes, e Verbos do dia a dia tem 89.

### Testes de busca

| Busca | Tipo | Resultado | Diagnóstico |
| --- | --- | --- | --- |
| quadrado, shikaku, しかく, 四角 | PT, romaji, kana, kanji | nada | **palavra ausente** |
| chifre, triângulo, rabo, escudo, Tóquio, 東京, shinbun | PT, kanji, romaji | nada | **palavra ausente** (escudo existe só como item do Adventure Mode, fora do Dicionário) |
| 角 | kanji | 角 kado “esquina, canto” | registrada com uma leitura só; faltam *tsuno* e *kaku* |
| tsuno, つの | romaji, kana | 鬼滅の刃, 夏のセール | **ruído**: “tsu‑no” aparece no meio dessas palavras |
| gato, GATO, “  gato  ”, neko, ねこ, ネコ, 猫 | todos | 猫 em 1º | ok (maiúsculas, espaços, katakana↔hiragana) |
| família / familia, maçã / maca, água / agua | PT sem acento | 1º lugar certo | ok |
| arigato, arigatō, arigatou, koohii, kōhī, こーひー, konnitiwa | romaji variado | 1º lugar certo | ok (ō, ou e o curto, sistema Kunrei) |
| quatro, 4, yon, よん, 四, dez, 十 | números | 四 / 十 em 1º | ok |
| bem-vindo, irasshaimase | expressão | いらっしゃいませ, おかえり | ok |
| obrigada | PT feminino | ~~nada~~ → ありがとう | **falha de busca, corrigida** |
| o gato, as flores | PT com artigo | ~~nada~~ → 猫, 花 | **falha de busca, corrigida** |
| gatos, estações, olhos, maçãs | PT plural | ~~nada~~ → 猫, 駅, 目, りんご | **falha de busca, corrigida** |
| segunda feira | PT sem hífen | ~~nada~~ → 月曜日 | **falha de busca, corrigida** |
| dente, rato, calor | PT | 店員 “aten**dente**”, 安い “ba**rato**” | **ruído** de trecho de palavra (sem a palavra certa, que não existe) |
| は, wa | partícula | 八, 母 / 笑 | sem verbete da partícula |
| partícula | PT | nada | sem verbetes de partícula |

## D. Problemas encontrados

| # | Problema | Gravidade | Evidência | Situação |
| --- | --- | --- | --- | --- |
| 1 | A busca em PT não achava feminino, artigo, plural nem palavra sem hífen | **Alta** | “obrigada”, “o gato”, “gatos”, “estações”, “segunda feira” retornavam 0 resultados, com o verbete existente | **Corrigido na 11.0** (`dictPtQueries`/`dictPtAlt` em `src/dictionary.js`; teste `tests/dict-search.js`) |
| 2 | Lacunas de vocabulário básico | **Alta** | Formas 4/12, Animais 12/25, Roupas 10/18, Advérbios 8/15, Casa 13/20 (seção C) | Para a expansão futura |
| 3 | Partículas sem verbete no Dicionário | **Média** | 0 de 14. “は” mostra 八 e 母, “partícula” não acha nada | Para a expansão futura |
| 4 | Kanji com uma leitura só | **Média** | 角 só como *kado*. Só 3 kanji do Dicionário têm mais de uma leitura registrada | Para a expansão futura |
| 5 | Ruído na busca por trecho de palavra | **Baixa** | tsuno → 鬼滅の刃; dente → 店員; rato → 安い “barato”. O resultado certo, quando existe, continua em 1º | Não corrigido: é escolha de projeto (achar palavras compostas), não erro comprovado |
| 6 | Classe gramatical e tema faltando | **Baixa** | 1.053 verbetes sem classe, 804 sem tema; o filtro por tema esconde muitos verbetes | Para a expansão futura |
| 7 | Romaji diferente entre áreas para a mesma palavra | **Baixa** | 9 casos. 6 são só grafia (gochisousama × gochisōsama, bouken × bōken: Mundo usa mácron em 10 palavras). 3 são leituras diferentes legítimas (年 nen/toshi, 何 nani/nan, 間 aida/ma). A busca acha as duas formas | Para a revisão de conteúdo |
| 8 | Duas frases longas cadastradas como vocabulário | **Baixa** | 二兎を追う者は一兎をも得ず, ご冥福をお祈りいたします (Academia) não entram no Dicionário | Para a revisão de conteúdo |
| 9 | Palavras do Adventure Mode fora do Dicionário | **Baixa** | 34 das 57 (escudo, espada, poção…) | De propósito na 11.0, para não começar a expansão |
| 10 | 28 registros em kanji sem kana | **Baixa** | O áudio depende só da voz do aparelho, que pode ler errado | Para a revisão de conteúdo |
| 11 | Um falso positivo na autoverificação | **Baixa** | っす “です descontraído”: a busca pelo sentido acha です primeiro | Aceitável |

**Isolamento das avaliações:** o `e2e8.js` (desde a 7.0) já confere que as provas só usam itens da própria ala. O `e2e12.js` confere que o Adventure Mode não mexe em SRS, histórico nem lições. Também não há verbete duplicado com o mesmo sentido: são 1.826 grafias para 1.830 sentidos, e só 4 homógrafos.

## E. Sugestões para a expansão

1. **Completar as categorias pouco cobertas** com as palavras listadas na seção C:
   - Formas: 四角, 三角, 丸い, 形, 点.
   - Animais: 鶏, ねずみ, 猿, ライオン, 虎, 象, カエル, 亀, 蝶, 角 tsuno, 尻尾, 羽.
   - Roupas: ズボン, ワンピース, 靴, 帽子, 指輪, 着物, 手袋, マフラー.
   - Advérbios: 時々, 全然/決して, すぐ, たぶん, また, も, だけ.
   - Casa: 冷蔵庫, 壁, 床, 電気, 押し入れ, シャワー, アパート.
   - Corpo: 腕, 歯, 指, 喉, 肩.
   - Emoções: 怒る, 驚く, わくわく, 心配, 緊張.
2. **Verbetes de partícula** (は, が, を, に, で, へ, と, の, も, か, から, まで, よ, ね):
   - Uma ficha curta com a função e um exemplo.
   - Ligada à lição de gramática que a ensina.
3. **Mais de uma leitura por kanji** (角 kado/tsuno/kaku; 生, 上, 下, 日 e outros), com o sentido de cada leitura.
4. **Levar ao Dicionário as palavras do Adventure Mode** (escudo, espada, poção, dragão, vilão, batalha…) e do vocabulário de fantasia dos animes.
5. **Completar classe gramatical e tema** dos 1.053 e 804 verbetes. Isso melhora os filtros e a ficha.
6. **Padronizar o romaji** (ou × ō) entre Mundo e as demais áreas.
7. **Na busca, mostrar “Não encontramos ‘quadrado’”** com um atalho para sugerir a palavra.
8. **Opcional:** dar menos peso, na busca, a trechos no meio de palavras longas (o ruído de “tsuno”, “dente” e “rato”). Melhor fazer junto com a expansão, para medir o efeito com mais palavras.

## F. Prioridades

**Alta:**

- Categorias pouco cobertas, com foco em iniciante: formas, animais, roupas, advérbios, casa e corpo.
- Verbetes de partícula.
- ~~Busca em PT com feminino, artigo, plural e hífen~~ (feito na 11.0).

**Média:**

- Leituras múltiplas de kanji.
- Palavras do Adventure Mode e de fantasia no Dicionário.
- Emoções e lugares (museu, templo, farmácia, praia).
- Mensagem de “não encontrado” com sugestão.

**Baixa:**

- Classe gramatical e tema nos verbetes.
- Padronização do romaji.
- Peso menor para trechos de palavra na busca.
- As 2 frases longas e os 28 registros sem kana.
