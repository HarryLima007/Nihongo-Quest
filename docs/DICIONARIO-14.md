# Dicionário Geral — Nihongo Quest 14.0

## O que é

Um dicionário japonês–português de verdade dentro do app, separado da parte pedagógica:

- **Léxico** (`dict/v1/`): dados de terceiros (JMdict, KANJIDIC2, Tatoeba, KanjiVG, Kanjium), convertidos por `tools/dict/build-dict.mjs`. Nada disso conta como “estudado”.
- **Pedagogia** (o app): lições, Caderno, Revisão, XP. Uma palavra do dicionário só entra no estudo quando a pessoa toca em “Salvar no Caderno” (item `jm:<ent_seq>`), e mesmo assim sem XP. Pesquisar não muda domínio, XP nem estágios.
- O **Dicionário local** da 7.0–13.0 continua existindo: palavras ensinadas pelo app abrem a ficha unificada, com os dados do JMdict e o progresso do app juntos.

Números da versão 2026-11-04 do JMdict: 217.479 entradas (22.611 comuns, 13.447 expressões), 32.225 frases de exemplo em 28.756 entradas, acento tonal em 99.737, 13.108 kanji (2.967 com ordem dos traços animada), português em 2.679 entradas (1.679 vindas das lições do app + 1.000 traduções feitas a partir do JMdict).

## Arquitetura dos dados

Ids estáveis: cada palavra é identificada pelo `ent_seq` do JMdict (não muda entre versões). Dentro de um build, as entradas são ordenadas por frequência (“ord”) e divididas em blocos de 1.000:

| Pasta | Conteúdo |
| --- | --- |
| `meta.json` | versão, contagens, fontes |
| `e/NNN.json` | entradas completas (formas, leituras, sentidos, POS, marcas, notas, origem, xref, português com origem, acento, exemplos do app) |
| `m/NNN.json` | resumos para listas de resultados |
| `x/NNN.json` | frases do Tatoeba por entrada |
| `j/*.json` | índice japonês (kana normalizado para hiragana e formas com kanji) |
| `w/*.json` | índice de significados (`p` português, `e` inglês) por prefixo de 2 letras |
| `k/*.json`, `s/*.json` | fichas de kanji e traços |
| `nq.json` | ligação entre entradas do JMdict e palavras do app |

O app baixa só os blocos que precisa (uma busca típica lê 2 a 4 arquivos pequenos). Total ~94 MB sem compressão (~28 MB com gzip do GitHub Pages). Há um botão para baixar tudo para uso offline (Cache API + `sw.js`).

## Motor (`src/jmdict.js`)

Sem DOM, roda também no Node (testes). Busca por kanji, kana, katakana, romaji (variações de Hepburn, tolerância a vogais longas e erros), português (sem acento, artigo, plural, feminino, hífen) e inglês (marcado como auxiliar), com relevância por frequência e filtro contra enxurrada de resultados. Conjugações: regras encadeadas (estilo Yomichan) validadas pela classe gramatical do JMdict; regras ambíguas aparecem como “possível”. Análise de frases: segmentação pelo maior casamento, com preferência por partículas, divisão da cópula e reconhecimento de conjugações; tradução só quando a frase exata existe nas lições.

## Português

Origem sempre marcada na ficha: “Nihongo Quest” (palavras das lições) ou “tradução do Nihongo Quest a partir do JMdict” (`tools/dict/pt/*.tsv`, formato `ent_seq<TAB>sentido<TAB>texto`). Sem tradução confiável, a ficha mostra a definição original em inglês, rotulada. Para ampliar: escreva novas linhas em um `.tsv` e rode o build.

## Gerar os dados

```
cd tools/dict
npm install --no-save @johnmorrisdotca/jisho@2.11.0 @johnmorrisdotca/bushu@1.1.2 kanjidic2-json@0.1.0
# accents.txt do Kanjium em tools/dict/cache/
node export-nq.js        # depois de python3 src/build.py
node --max-old-space-size=6000 build-dict.mjs
```

## Limites conhecidos

- Português cobre as ~2.700 palavras mais frequentes; o resto mostra a definição em inglês. Uma busca em português de palavra ainda sem tradução (ex.: “cansado”) não encontra a entrada; o app sugere palavras próximas e a busca em inglês funciona.
- Frases do Tatoeba em japonês e inglês (o português do Tatoeba não estava acessível no build).
- Acento tonal só onde o Kanjium tem dado; ordem dos traços só para os 2.967 kanji do KanjiVG presentes no pacote.
- A análise de frases não é tradução automática.

Licenças: `dict/v1/LICENSE.md`.
