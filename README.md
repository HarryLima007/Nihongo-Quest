# Nihongo Quest 🇯🇵

Academia gamificada de japonês para brasileiros, do zero ao nível proficiente. Todo o conteúdo e a interface estão em português.

**Versão atual:** v3.0.0

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

## Como usar

**Online:** https://harrylima007.github.io/Nihongo-Quest/ (GitHub Pages)

**No computador:** abra o arquivo [`nihongo-quest.html`](nihongo-quest.html) em qualquer navegador. Ele é um arquivo único, sem instalação.

O progresso fica salvo no próprio navegador (localStorage). Cada endereço tem o seu próprio progresso; para levar de um lugar para outro, use Perfil → Exportar progresso e depois Importar progresso.

Proteções do progresso: antes de migrar um save antigo, o app guarda uma cópia que nunca é sobrescrita (`nihongoQuest:backup:schemaN`); uma vez por dia guarda uma cópia automática (`nihongoQuest:backup:auto`, restaurável no Perfil); e nunca grava um perfil vazio por cima de um progresso existente. Saves da 1.0, 2.0 e 2.1 são migrados só acrescentando campos.

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
| `nihongo-quest.html` | O app pronto (v3.0.0), gerado a partir de `src/` |
| `src/` | Código-fonte: `content.js` (lições da v1), `content2.js` (pacotes de áudio, pronúncia e diálogos da 2.0), `content3.js` (2.1: Hiragana, Katakana, Kanji), `content4.js` (2.1: Vocabulário, Gramática, Construção de Frases), `content5.js` (2.1: Japonês Falado, Formalidade, Animes e expansão auditiva), `content6.js` a `content26.js` (3.0: alas novas dos quatro estágios; `src/kit.js` traz os atalhos de autoria), `content27.js` (3.0: expansão auditiva), `finalize.js` (ordem das alas e estágios), `manifest.json` (ordem dos arquivos no build), `app.js` (núcleo), `audio.js` (voz, escuta e modos auditivos), `style.css`, `shell.html` |
| `src/build.py` | Junta o código-fonte e gera `dist/nihongo-quest.html` |
| `tests/` | `content.js` valida o conteúdo sem navegador (ids estáveis, exercícios, duplicatas). Testes com Playwright: `e2e.js` (v1), `e2e2.js` (v2 e migração do save da v1), `e2e3.js` (2.1: save real da 2.0, alas novas, todas as lições), `e2e4.js` (3.0: migração dos saves da 2.0 e 2.1, estágios, pré-requisitos, todas as perguntas, revisões, cópias de segurança, Responder certo). `readings.js` confere as leituras dos kanji com o dicionário kuromoji |
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
```
