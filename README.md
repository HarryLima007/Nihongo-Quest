# Nihongo Quest 🇯🇵

Academia gamificada de japonês para brasileiros, do zero ao nível proficiente. Todo o conteúdo e a interface estão em português.

**Versão atual:** v7.0.0

## O que tem no app

A Academia tem 35 alas e 349 lições, divididas em quatro estágios. Uma ala só abre quando as alas que ela exige foram concluídas (avaliação final aprovada).

| Estágio | Nível | Alas |
| --- | --- | --- |
| Iniciante | N5 e N4 | Primeiros Passos, Hiragana, Katakana, Kanji I e II, Vocabulário, Gramática N5 e N4, Japonês Falado, Formalidade, Animes, situações do dia a dia e mais |
| Intermediário | N3 | Gramática N3, Vocabulário N3, Keigo na Prática, Fala Natural, Leitura e Interpretação, Kanji III, Animes, Filmes e Séries |
| Avançado | N2 | Gramática N2, Vocabulário N2, Japonês no Trabalho, Expressões Idiomáticas, Leitura N2, Dialetos |
| Proficiente | N1 e além | Gramática N1, Japonês Escrito e Formal, Nuances e Pragmática, Expressões Cultas, Leitura Proficiente |

Cada item traz japonês, romaji e português, com notas sobre nuances e exceções. As lições de leitura têm textos completos com tradução por frase.

A **revisão** separa o que foi só apresentado do que foi dominado (acertos em dias diferentes), guarda os erros recorrentes, mostra estatísticas por habilidade e os assuntos mais fracos, e oferece revisão de vencidos, mais difíceis, por ala, por lição, pontos fracos e teste de conhecimento.

A **Academia Auditiva** tem treinos de palavras, sons (pares mínimos), frases, expressões, “Responder certo” (ouvir uma fala e escolher a reação adequada), o Detetive dos Animes e o Laboratório de Diálogos (22 conversas originais, incluindo telefonema de negócios, recusa indireta e dialeto de Kansai). A voz usa o próprio navegador (Web Speech), em três velocidades e no modo “Bem devagar”.

## Dicionário japonês-português (7.0)

Fica no **Caderno → Dicionário** (ou `#dicionario`), com atalhos nas lições da Listening Academy e no Início.

- **Pesquisa flexível** por português (com ou sem acento), romaji (`arigato`, `arigatou`, `gakko`, `konichiwa`), hiragana, katakana ou kanji (inclusive um kanji isolado).
- **Ficha da palavra:** escrita, leitura, romaji, significados, classe gramatical, kanji com significado e leituras, exemplos com tradução, uso e variações, palavras relacionadas e expressões.
- **Áudio** com a voz japonesa do aparelho: palavra, palavra devagar, exemplo inteiro e exemplo por partes.
- **Favoritos**, vistas recentemente, palavra do dia e exploração por tema.
- **Caderno e Revisão:** “Adicionar ao Caderno e à Revisão” reaproveita o item que já existe no app (sem duplicar). Consultar ou salvar não conclui lições, não dá XP e não libera nada.
- Junta automaticamente todas as palavras do app (Academia, Academia Auditiva, Listening Academy e Chat) + palavras comuns de `src/dict-data.js`.

## Currículo e avaliações (7.0)

Uma avaliação só cobra conteúdo do currículo daquela etapa. “Ter visto” uma palavra (no Chat, Caderno, Dicionário, Revisão ou Listening Academy) alimenta a Revisão, nunca as avaliações. Na Academia, a revisão dentro de uma avaliação usa só as lições anteriores **da mesma ala** já aprovadas (`curriculumScope`/`reviewPool` em `app.js`). Na Listening Academy, as alternativas vêm da lição, das lições anteriores da categoria e das categorias anteriores (`laScopeLessons`), e as palavras “novas” são as que a própria Listening Academy ainda não ensinou (`S.lacad.taught`).

## Listening Academy (6.0): entender japonês falado

**7.0:** cada pergunta é falada em japonês (toca sozinha antes do áudio do exercício e tem botão para repetir), cada alternativa toca a própria pronúncia ao ser tocada (sem corrigir nem avançar; um toque novo interrompe o anterior) e o feedback mostra e toca a resposta certa em japonês, romaji e português. O japonês das perguntas e alternativas fica em `src/listening-voice.js`; `tests/e2e8.js` falha se alguma alternativa ficar sem áudio.

Uma área própria dentro da Academia (aba **Listening**) para treinar o ouvido. O foco é ouvir e entender, sem depender de kana ou kanji.

- **5 categorias progressivas, 29 lições:** Reconhecimento de palavras, Frases curtas, Perguntas e respostas, Diálogos cotidianos (apresentações, amigos, escola, restaurante, compras, hobbies, rotina) e Compreensão natural (mudança de assunto, hesitações, recusa indireta, casual × educado × formal, conversa a três e telefonema). Cada categoria termina com uma avaliação (mínimo de 70%).
- **Cinco níveis de dificuldade:** reconhecimento, frases, conversação, naturalidade e compreensão avançada (no nível 5 o texto só aparece depois da resposta).
- **Desbloqueio pelo que já foi ensinado:** cada categoria exige a anterior e a ala correspondente da Academia (Primeiros Passos, Vocabulário Essencial, Gramática, Japonês Falado).
- **Ouvir primeiro:** o áudio toca sozinho; antes da resposta não aparece tradução. Japonês e romaji podem ser vistos como dica (o acerto continua valendo, com menos XP). Depois da resposta, revele japonês, romaji e tradução separadamente.
- **12 formatos de exercício:** identificação, reconhecimento, compreensão da frase, palavra na frase, ordem das palavras, verdadeiro ou falso, intenção (pergunta, convite, recusa…), resposta adequada, compreensão do diálogo, sentido geral, fala do diálogo e casual/educado/formal.
- **Controles de áudio:** ouvir, pausar e continuar (retoma da fala atual), repetir quantas vezes quiser, velocidades 0,75x, 1x, 1,25x e 1,5x, ouvir por partes, diálogo completo ou fala por fala.
- **Vozes dos personagens:** Ren (casual), Aiko-sensei (educada), Yumi (expressiva), Takeshi (keigo) e Haruto. Com várias vozes japonesas instaladas, cada personagem usa uma voz; com uma só, eles se diferenciam pelo tom e ritmo.
- **Integrada à Academia:** palavras que já existem na Academia são reaproveitadas (o aluno as reencontra); palavras novas aparecem como “Nova” com significado, romaji, escrita e áudio, e entram no Caderno e na Revisão (há uma “Revisão auditiva”). XP, histórico, missões e a habilidade “Compreensão auditiva” são os de sempre. Perfil e Início mostram categorias, lições, acertos e erros, palavras reconhecidas e diálogos compreendidos.
- Save no esquema 6: saves da 5.0 são migrados só acrescentando `lacad`, com cópia `nihongoQuest:backup:schema5`.

**Limitações do áudio (honestas):** a voz é a síntese do próprio aparelho (Web Speech), gratuita e sem chaves. A qualidade depende da voz japonesa instalada (no Android, “Serviços de fala do Google” → Japonês). Não é gravação humana. Pausar retoma do começo da fala atual, porque os navegadores de celular não pausam a síntese no meio de forma confiável. A arquitetura já aceita gravações: em `src/listening-data.js`, troque uma fala por `{ l: 'jp|ro|pt', audio: 'audio/ren/arquivo.mp3' }`; o app usa o arquivo (com velocidade e tom preservado) e volta para a voz do aparelho se o arquivo faltar.

**Chat 6.0:** mensagens com mais de uma frase (`konbanwa! hajimemashite!`, `こんばんははじめまして`, `konbanwa, watashi mo`) e frases que o personagem acabou de usar agora são entendidas, sem falsos positivos em texto aleatório.

## Nihongo Chat 5.0: conversa de verdade

A 5.0 transforma o chat em um mensageiro: conversa livre com cada personagem, separada dos desafios.

- **Conversa livre com contexto.** O personagem entende a resposta pelo que ele acabou de dizer. Quando o Ren diz 「きのう ねるの おそかった（笑）。…は？」, responder 「わたしも」, `Watashi mo`, 私も, ぼくも ou até `watshi mo` é entendido como “eu também dormi tarde”. Respostas curtas como うん, ううん, へえ, マジ？, www, 笑 e 😂 mudam de sentido conforme a pergunta.
- **Personalidades próprias.** Ren (amigo, casual, brincalhão), Aiko-sensei (paciente, educada), Yumi (expressiva e curiosa, com gostos próprios; vira amiga e passa para a タメ口 se você aceitar) e Takeshi (keigo de atendimento, explica a formalidade na prática). Cada um puxa assuntos próprios quando a conversa esfria e lembra o que você contou.
- **Não entendi ≠ errei.** Uma mensagem que o app não reconhece nunca é tratada como erro: o personagem pede para repetir (「ん？ もう一回 言って くれる？」) e, na segunda vez, muda de assunto. Na conversa livre não há rótulos de avaliação; dicas de naturalidade (ex.: “arigato” com a professora) aparecem com japonês, romaji e tradução, no máximo uma vez por conversa.
- **Desafios separados.** A bandeira no topo da conversa abre os desafios (objetivo, resposta esperada, XP e histórico). Neles, a resposta é classificada como correta, pouco natural, erro (gramática, vocabulário, escrita, formalidade) ou não reconhecida (que não conta como tentativa).
- **Como um mensageiro.** Indicador “Ren está digitando…”, ritmo diferente para cada personagem, respostas em mais de um balão, sem esperas longas e sem mensagens fora de ordem (se você mandar algo enquanto o personagem digita, a resposta anterior aparece primeiro). Há a opção “Respostas imediatas”.
- **Figurinhas e emojis.** Figurinhas originais (Hikari e um conjunto para cada personagem, com dez emoções), favoritas, recentes, texto + figurinha e emojis. Os personagens mandam figurinhas quando faz sentido e entendem as suas. Algumas ensinam expressões (笑, やった, かわいい…), que vão para a Revisão e o Caderno.
- **Honesto:** as respostas vêm de roteiros e regras locais, não de IA generativa. Não há chaves, contas nem serviços pagos. A arquitetura continua pronta para um backend seguro no futuro.
- Save no esquema 5. Saves da 4.0 são migrados com cópia de segurança `nihongoQuest:backup:schema4`, preservando progresso, XP, histórico, Revisão, Caderno, configurações, personagens e conversas.

## Nihongo Chat (4.0)

Conversas por mensagens com quatro personagens originais, que vão sendo liberados conforme o progresso real na Academia:

| Personagem | Quem é | Como fala | Libera quando |
| --- | --- | --- | --- |
| Ren (れん) | Amigo próximo, fã de games | Casual | Desde o início |
| Aiko-sensei (愛子先生) | Professora | Educado (です/ます) | Avaliação de Primeiros Passos aprovada |
| Yumi (ゆみ) | Colega de turma | Educado no começo, casual depois de ficarem amigas | Avaliação da ala Gramática aprovada |
| Takeshi (たけし) | Dono da lojinha | Keigo de atendimento | Ala Formalidade e Respeito aprovada + três lições de Situações Reais (restaurante, loja de conveniência, compras) |

- Responda em romaji, kana ou kanji. O app aceita respostas equivalentes (げんき, 元気, genki, daijoubu, daijobu…) e classifica cada resposta como **correta e natural**, **correta mas pouco natural**, **erro de gramática** (inclui partícula trocada), **erro de vocabulário**, **erro de escrita** ou **inadequada socialmente** (formalidade errada para a pessoa). A correção mostra a frase certa com romaji, tradução e explicação.
- Nada é cobrado antes de ser ensinado: quando um assunto precisa de algo que você ainda não estudou, o personagem apresenta a expressão como **Novo** antes de perguntar. Assuntos que exigem gramática não estudada ficam fechados.
- Dicas em cinco níveis (vocabulário, gramática, o que a pergunta quer, resposta sugerida, tradução completa), botões de romaji e tradução, modo “Ouvir primeiro”, ouvir a própria frase antes de enviar e sugestões de resposta.
- Os personagens podem puxar assunto, mas só quando o app é aberto: no máximo uma mensagem pendente por personagem e duas por dia, sem repetir assuntos recentes e sem cobrar ausência. Não há notificações.
- Os personagens lembram só o que realmente aconteceu nas conversas (fatos salvos, como “o Ren perdeu a partida”).
- XP do chat com limite diário e sem farm (cada assunto rende XP uma vez por dia), desafios opcionais, histórico de mensagens, correções, palavras novas e desafios. As expressões do chat entram na revisão inteligente e no Caderno, como apresentadas, compreendidas ou dominadas.
- **Sem IA generativa por enquanto:** as respostas vêm de roteiros locais (cerca de 34 assuntos e conversa livre por intenções). O código já tem uma camada de adaptação (`CHAT_BRAINS` e `CHAT_BACKEND` em `src/chat-core.js`) para ligar, no futuro, um backend seguro de IA, sem nenhuma chave no site. A entrada por voz também tem um ponto de extensão (`CHAT_VOICE_INPUT`).
- Tudo fica salvo em `S.chat` no mesmo save do app (esquema 4), em formato pronto para sincronizar entre aparelhos no futuro. Saves da 3.0 são migrados só acrescentando `chat`, com cópia de segurança `nihongoQuest:backup:schema3`.

## Como usar

**Online:** https://harrylima007.github.io/Nihongo-Quest/ (GitHub Pages)

**No computador:** abra o arquivo [`nihongo-quest.html`](nihongo-quest.html) em qualquer navegador. Ele é um arquivo único, sem instalação.

O progresso fica salvo no próprio navegador (localStorage). Cada endereço tem o seu próprio progresso; para levar de um lugar para outro, use Perfil → Exportar progresso e depois Importar progresso.

Proteções do progresso: antes de migrar um save antigo, o app guarda uma cópia que nunca é sobrescrita (`nihongoQuest:backup:schemaN`); uma vez por dia guarda uma cópia automática (`nihongoQuest:backup:auto`, restaurável no Perfil); e nunca grava um perfil vazio por cima de um progresso existente. Saves da 1.0, 2.0, 2.1 e 3.0 são migrados só acrescentando campos.

## GitHub Pages

O site é publicado direto da branch `Root`, pasta raiz (`/`). Um merge em `Root` publica a nova versão.

- `index.html` é só um redirecionamento leve para `nihongo-quest.html`, que mantém `?parâmetros` e `#seção`. Assim o app não fica duplicado.
- `.nojekyll` faz o GitHub servir os arquivos como estão, sem processar com Jekyll.
- Todos os caminhos são relativos, então o site funciona no subdiretório `/Nihongo-Quest/`.
- Depois de mudar o código em `src/`, rode o build e copie `dist/nihongo-quest.html` para a raiz antes de enviar.

## Estrutura

| Pasta / arquivo | O que é |
| --- | --- |
| `index.html` | Página inicial do site, redireciona para o app |
| `nihongo-quest.html` | O app pronto (v7.0.0), gerado a partir de `src/` |
| `src/` | Código-fonte: `content.js` (lições da v1), `content2.js` (pacotes de áudio, pronúncia e diálogos da 2.0), `content3.js` (2.1: Hiragana, Katakana, Kanji), `content4.js` (2.1: Vocabulário, Gramática, Construção de Frases), `content5.js` (2.1: Japonês Falado, Formalidade, Animes e expansão auditiva), `content6.js` a `content26.js` (3.0: alas novas dos quatro estágios; `src/kit.js` traz os atalhos de autoria), `content27.js` (3.0: expansão auditiva), `finalize.js` (ordem das alas e estágios), `manifest.json` (ordem dos arquivos no build), `app.js` (núcleo), `audio.js` (voz, escuta e modos auditivos), `chat-data.js` (4.0: personagens, assuntos, expressões e desafios do Nihongo Chat), `chat-core.js` (4.0: motor do chat: normalização de romaji/kana/kanji, avaliação das respostas, cenas, dicas, XP, iniciativa e adaptador para backend futuro), `chat-talk-data.js` (5.0: falas, assuntos e personalidades da conversa livre), `chat-talk.js` (5.0: motor da conversa livre por contexto e intenção), `chat-stickers.js` (5.0: figurinhas originais em SVG), `chat-ui.js` (telas do chat no estilo mensageiro), `listening-data.js` (6.0: conteúdo da Listening Academy), `listening.js` (6.0: motor de áudio, exercícios, telas e integrações da Listening Academy), `listening-voice.js` (7.0: conversão romaji/kana e o japonês falado das perguntas e alternativas), `dict-data.js` (7.0: palavras extras, classes gramaticais e kanji do dicionário), `dictionary.js` (7.0: índice, pesquisa, fichas, áudio, favoritos e integrações do dicionário), `boot.js` (inicialização), `style.css`, `shell.html` |
| `src/build.py` | Junta o código-fonte e gera `dist/nihongo-quest.html` |
| `tests/` | `content.js` valida o conteúdo sem navegador (ids estáveis, exercícios, duplicatas). Testes com Playwright: `e2e.js` (v1), `e2e2.js` (v2 e migração do save da v1), `e2e3.js` (2.1: save real da 2.0, alas novas, todas as lições), `e2e4.js` (3.0: migração dos saves da 2.0 e 2.1, estágios, pré-requisitos, todas as perguntas, revisões, cópias de segurança, Responder certo), `e2e5.js` (4.0: Nihongo Chat: migração do save real da 3.0, desbloqueio, personagens bloqueados, respostas equivalentes, classificação dos erros, conteúdo novo antes de ser cobrado, romaji/tradução, áudio, histórico, iniciativa, XP sem farm, revisão, todos os assuntos de ponta a ponta e telas de 320px), `e2e6.js` (5.0: caso “watashi mo” no save real da 4.0, respostas curtas pelo contexto, romaji/kana/kanji, não reconhecida ≠ erro, digitação e ordem, figurinhas e emojis, desafios, Revisão/Caderno, mensagens espontâneas e 320px), `e2e7.js` (6.0: migração do save real da 5.0, Listening Academy de ponta a ponta, áudio, velocidades, pausa, revelação gradual, desbloqueio, Revisão/Caderno/XP, 320px e os casos obrigatórios do chat no fluxo real), `e2e8.js` (7.0: migração do save real da 6.0, isolamento do currículo nas avaliações, perguntas e alternativas faladas, feedback com áudio, dicionário e telas de 320px). `readings.js` confere as leituras dos kanji com o dicionário kuromoji |
| `backup/` | A versão 1.0.0 original |

## Como adicionar conteúdo

- Lições novas entram nos arquivos `src/content*.js`, sempre com **ids novos**. Nunca renomeie ou remova ids existentes (`c4l1`, `aud-pal:neko`…): eles guardam o progresso salvo.
- `jp` é a escrita natural; `say` é a leitura em kana usada pela voz (obrigatória quando há kanji); `ro` é o romaji e `pt` a tradução.
- Rode `node tests/content.js` antes do build: ele recusa ids repetidos, exercícios inválidos e palavras duplicadas.
- Com `src/kit.js`, a leitura `say` é gerada do romaji; `node tests/readings.js cXX` compara as leituras dos kanji de uma ala com o dicionário (diferenças como にほん/にっぽん são ambiguidades normais).

## Gerar o app

```bash
python3 src/build.py          # cria dist/nihongo-quest.html
cp dist/nihongo-quest.html .  # atualiza o arquivo da raiz
```

## Rodar os testes

```bash
npm install playwright kuromoji
node tests/content.js
node tests/e2e.js
node tests/e2e2.js
node tests/e2e3.js
node tests/e2e4.js
node tests/e2e5.js
node tests/e2e6.js
node tests/e2e7.js
node tests/e2e8.js
```

## Histórico de versões

- **7.0.0** — Dicionário japonês-português, perguntas e alternativas faladas na Listening Academy, avaliações isoladas por currículo (corrige perguntas de outras áreas nas avaliações de números), esquema 7.
- **6.0.0** — Listening Academy (5 categorias, 29 lições, 12 formatos, controles de áudio e velocidades), chat entende mensagens com várias frases, esquema 6.
- **5.0.0** — Nihongo Chat Evolution: conversa livre com contexto, personalidades, digitação, figurinhas, desafios separados, esquema 5.
- **4.0.0** — Nihongo Chat com quatro personagens, esquema 4.
- **3.0.0** — 349 lições em 35 alas e quatro estágios, esquema 3.
- **2.1.0** — Expansão da Academia (65 lições).
- **2.0.0** — Academia Auditiva, pronúncia e diálogos.
- **1.0.0** — Primeira versão.
