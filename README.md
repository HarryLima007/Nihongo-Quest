# Nihongo Quest 🇯🇵

Academia gamificada de japonês para brasileiros iniciantes. Todo o conteúdo e a interface estão em português.

**Versão atual:** v2.1.0 (Expansão da Academia Japonesa)

## O que tem no app

A Academia tem 10 alas e 65 lições, em duas trilhas que andam em paralelo depois de Primeiros Passos:

- **Trilha da Fala (ouvido primeiro):** Primeiros Passos → Vocabulário Essencial → Gramática → Construção de Frases → Japonês Falado → Formalidade e Respeito → Japonês dos Animes.
- **Trilha da Escrita:** Hiragana (completo, com sons modificados e combinações) → Katakana → Kanji (cerca de 60 kanji).

A **Academia Auditiva** tem treinos de palavras, sons (pares mínimos), frases e expressões, o Detetive dos Animes e o Laboratório de Diálogos (16 conversas originais, do “cheguei em casa” à cena de rivais com fala rude). As lições de fala também têm perguntas de áudio e botão para ouvir cada exemplo.

## Como usar

**Online:** https://harrylima007.github.io/Nihongo-Quest/ (GitHub Pages)

**No computador:** abra o arquivo [`nihongo-quest.html`](nihongo-quest.html) em qualquer navegador. Ele é um arquivo único, sem instalação.

O progresso fica salvo no próprio navegador (localStorage). Cada endereço tem o seu próprio progresso; para levar de um lugar para outro, use Perfil → Exportar progresso e depois Importar progresso.

## GitHub Pages

O site é publicado direto da branch `main`, pasta raiz (`/`).

- `index.html` é só um redirecionamento leve para `nihongo-quest.html`, que mantém `?parâmetros` e `#seção`. Assim o app não fica duplicado.
- `.nojekyll` faz o GitHub servir os arquivos como estão, sem processar com Jekyll.
- Todos os caminhos são relativos, então o site funciona no subdiretório `/Nihongo-Quest/`.
- Depois de mudar o código em `src/`, rode o build e copie `dist/nihongo-quest.html` para a raiz antes de enviar.

## Estrutura

| Pasta / arquivo | O que é |
| --- | --- |
| `index.html` | Página inicial do site, redireciona para o app |
| `nihongo-quest.html` | O app pronto (v2.1.0), gerado a partir de `src/` |
| `src/` | Código-fonte: `content.js` (lições da v1), `content2.js` (pacotes de áudio, pronúncia e diálogos da 2.0), `content3.js` (2.1: Hiragana, Katakana, Kanji), `content4.js` (2.1: Vocabulário, Gramática, Construção de Frases), `content5.js` (2.1: Japonês Falado, Formalidade, Animes e expansão auditiva), `app.js` (núcleo), `audio.js` (voz, escuta e modos auditivos), `style.css`, `shell.html` |
| `src/build.py` | Junta o código-fonte e gera `dist/nihongo-quest.html` |
| `tests/` | `content.js` valida o conteúdo sem navegador (ids estáveis, exercícios, duplicatas). Testes com Playwright: `e2e.js` (v1), `e2e2.js` (v2 e migração do save da v1), `e2e3.js` (2.1: save real da 2.0, alas novas, todas as lições) |
| `backup/` | A versão 1.0.0 original |

## Como adicionar conteúdo

- Lições novas entram nos arquivos `src/content*.js`, sempre com **ids novos**. Nunca renomeie ou remova ids existentes (`c4l1`, `aud-pal:neko`…): eles guardam o progresso salvo.
- `jp` é a escrita natural; `say` é a leitura em kana usada pela voz (obrigatória quando há kanji); `ro` é o romaji e `pt` a tradução.
- Rode `node tests/content.js` antes do build: ele recusa ids repetidos, exercícios inválidos e palavras duplicadas.

## Gerar o app

```bash
python3 src/build.py          # cria dist/nihongo-quest.html
cp dist/nihongo-quest.html .  # atualiza o arquivo da raiz
```

## Rodar os testes

```bash
npm install playwright
node tests/content.js
node tests/e2e.js
node tests/e2e2.js
node tests/e2e3.js
```
