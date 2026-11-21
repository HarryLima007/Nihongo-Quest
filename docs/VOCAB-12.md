# Nihongo Quest 12.0 — Expansão de vocabulário

## O que mudou

- **Academia de Vocabulário** (`src/vocab-data.js` + `src/vocab.js`). Fica na Academia, aba “Palavras” (`academyMode = 'vc'`). `#vocabulario` também abre essa aba.
  - 20 categorias, 81 lições e 631 palavras. 332 dessas palavras ainda não existiam em nenhuma área do app.
- **Dicionário 2.0** (`src/dict-data.js` e `src/dictionary.js`):
  - Vários sentidos por palavra.
  - `DICT_KREAD`: leituras de 42 kanji em contexto.
  - `DICT_PARTICLES`: fichas das 14 partículas.
  - Busca com prioridade e filtro de ruído, forma feminina e “Você quis dizer…”.
- **Integrações:**
  - Mundo: cenas `m5` (roupas), `m6` (farmácia), `g5` (zoológico) e `v5` (templo), com as personagens novas Aoi-san e Kobayashi-san.
  - Leitura: lição `f8`.
  - Chat: assunto `zoo` da Yumi.
  - Sobre: histórico de versões.
  - Início: bloco Vocabulário em “Sua jornada”.
  - Revisão: cartão de revisão de vocabulário.
  - Caderno: as palavras novas aparecem lá.

## Regras

- **Ids estáveis:**
  - Categoria: `formas`, `animais`…
  - Lição: `vfo1`… As lições da categoria aventura são `vaf1` a `vaf4`.
  - Item: `vc:<escrita>・<kana>`, ou `vc:<kana>` quando a palavra não tem kanji.
- **Ciclo da lição:**
  1. Cartões de descoberta: áudio normal, devagar e 3×, com o exemplo.
  2. Cartão “Escute sem ler”.
  3. Prática: ouvir, ouvirjp, parecidos, pt2jp, ler, frase, montar, ver e pares.
- **Pool de exercícios:** só a lição atual e as lições já aprovadas (`vcKnown`). Assim, nenhuma palavra é cobrada antes de ser ensinada.
- **XP e moedas:**

  | Etapa | Recompensa | Quando |
  | --- | --- | --- |
  | Lição | 15 XP (+5 se perfeita) e 3 moedas | Só na primeira aprovação, com 80% ou mais |
  | Avaliação da categoria | 30 XP e 10 moedas | Só na primeira aprovação |
  | Revisão | 1 XP por acerto | Até 20 XP por dia |

- **Sem duplicar:** palavras com o mesmo japonês e o mesmo sentido de outras áreas são unificadas no Caderno e na Revisão (`nqSiblings`) e entram no mesmo verbete do Dicionário.
- **Avaliações:** `itemSource` devolve `'outro'` para as palavras da Academia de Vocabulário, então elas não entram nas avaliações da Academia principal.
- **Save:** `SCHEMA_VERSION` 12. `MIGRATIONS[11]` só cria `S.vocab` quando ele não existe, então a migração é idempotente. O backup fica em `nihongoQuest:backup:schema11`. Nenhum dado antigo é alterado.

## Como acrescentar palavras

Acrescente uma linha a uma lição de `VOCAB_CATS` (formato no topo do arquivo) ou crie uma lição nova no fim da categoria. Depois rode:

```bash
node tests/vocab-content.js   # formato, romaji × kana, duplicatas, leituras (kuromoji)
python3 src/build.py && node tests/e2e13.js
```

Nunca renomeie ids de categoria, lição ou palavra já publicados.
