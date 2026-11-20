# Nihongo Quest 🇯🇵

Academia gamificada de japonês para brasileiros iniciantes. Todo o conteúdo e a interface estão em português.

**Versão atual:** v2.0.0 (Academia Auditiva)

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
| `nihongo-quest.html` | O app pronto (v2.0.0), gerado a partir de `src/` |
| `src/` | Código-fonte: `content.js` (lições da v1), `content2.js` (pacotes de áudio, pronúncia e diálogos), `app.js` (núcleo), `audio.js` (voz, escuta e modos auditivos), `style.css`, `shell.html` |
| `src/build.py` | Junta o código-fonte e gera `dist/nihongo-quest.html` |
| `tests/` | Testes de ponta a ponta com Playwright (`e2e.js` da v1, `e2e2.js` da v2 e migração do save da v1) |
| `backup/` | A versão 1.0.0 original |

## Gerar o app

```bash
python3 src/build.py          # cria dist/nihongo-quest.html
cp dist/nihongo-quest.html .  # atualiza o arquivo da raiz
```

## Rodar os testes

```bash
npm install playwright
node tests/e2e.js
node tests/e2e2.js
```
