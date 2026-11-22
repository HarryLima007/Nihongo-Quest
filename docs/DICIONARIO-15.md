# Nihongo Quest 15.0.0 — Dicionário em português

## Resultado

| | 14.0.0 | 15.0.0 |
| --- | --- | --- |
| Entradas do Dicionário Geral | 217.479 | 217.479 |
| Entradas com algum português | 2.679 | **213.300** (98.1%) |
| … português revisado das lições (`nq`) | 1.679 | 1.679 |
| … traduções elaboradas da 14.0 (`tr`, não revisadas por humano) | 1.000 | 1.000 |
| … português automático por sentido (JMdict-PT) | 0 | 213.283 entradas, 246.921 de 251.759 sentidos, 405.223 glosas |
| Entradas só em inglês | 214.800 | 4.179 |
| Termos no índice de significados (pt + en) | 268.537 | 497.377 |
| Traduções revisadas por humano nesta versão | — | 0 (nada foi marcado como revisado) |

## Fontes avaliadas

- **JMdict (Português) / JMdict-PT** — usado. https://github.com/zhusupbekova/jmdict-pt, commit `e41652621c7fc239cb85aa7b023406bd258a1c92`. Formato: `data/pt-gloss-cache.jsonl` é um mapa glosa inglesa → glosa portuguesa (279.098 pares), gerado por gpt-4.1-mini sobre o JMdict de 2026-09-03, com arquivos de correção por sentido (`ent_seq` + `sense_index`) e globais (vazios no commit usado). O build do projeto aplica esse mapa às glosas do JMdict; nós fazemos o mesmo com a nossa versão do JMdict (2026-11-04), então o `ent_seq`, os sentidos e a ordem ficam exatamente os do Dicionário Geral, sem vincular nada por escrita ou kanji. Licença da camada portuguesa: CC BY-SA 4.0 (© Shiritai); JMdict: CC BY-SA 4.0 nos termos da EDRDG — compatível com o resto de `dict/` (já CC BY-SA 4.0). Cobertura: 99,8%% das glosas da nossa versão existem no mapa.
  - Qualidade: tradução por glosa, sem contexto da palavra japonesa. Erros típicos observados: sentido errado de palavra inglesa ambígua (“draining” → “drenagem”, “rage” como moda → “raiva”), literalidade, nomes científicos mantidos. Por isso tudo aparece com o selo **auto** e o inglês do JMdict embaixo.
  - Ajustes mecânicos (declarados em `dict/v2/LICENSE.md`): 15.264 glosas idênticas ao inglês não contam como português (só ajudam a busca: “saudade”, “sushi”); repetições no mesmo sentido removidas; maiúscula inicial vazada do inglês corrigida.
- **Tatoeba (frases japonês–português)** — não integrado: `downloads.tatoeba.org` está bloqueado no ambiente de build, então não foi possível baixar nem verificar as traduções. As frases de exemplo continuam em japonês e inglês (com crédito). Fica como próximo passo natural (CC BY 2.0 FR, traduções humanas).
- **Kaikki / Wiktionary** e **PanLex** — não integrados: os servidores (`kaikki.org`, `panlex.org`) estão bloqueados no ambiente de build, e o JMdict-PT já cobre 98%% das entradas; a ligação de verbetes do Wiktionary a `ent_seq` exigiria casar por escrita+leitura, que o pedido proíbe fazer às cegas.
- **OpenWordNet-PT** — não integrado: não tem vínculo com o JMdict, e usar sinônimos para expandir a busca trazia falsos positivos (“pena” → pluma/punição/compaixão já vêm separados pelos próprios sentidos do JMdict).

## Arquitetura

- `tools/dict/build-dict.mjs` gera `dict/v2/` (a 14.0 usava `dict/v1/`; o service worker apaga o cache antigo `nq-dict-v1`).
- Cada sentido ganhou o campo 9: lista de glosas em português (mesmos marcadores `[lit]`/`[fig]`/`[expl]` do inglês). O português revisado das lições (`nq`) e o elaborado (`tr`) continuam no campo da entrada, com a origem.
- Resumo da lista (`m/`): português revisado/elaborado se houver; senão o automático (bit 8); campo 5 = sentido curto em inglês, para diferenciar resultados com o mesmo português.
- Índice de significados (`w/`): pontuação ≥ 200 = significado inteiro (cada sinônimo separado por vírgula, “ficar cansado” → “cansado”, “cansar-se” → “cansar”); abaixo de 200 = a palavra aparece dentro de um significado maior (“relacionadas”). Peso: `nq` +16 > `tr` +14 > automático; sentido e posição pesam; qualificador entre parênteses (“desaparecer (de energia)”) pesa contra.
- Busca (`src/jmdict.js`): variantes de artigo, plural, gênero e particípio → verbo; com correspondência exata em português, o inglês sai (falsos amigos) e o romaji que também é palavra portuguesa (“medo” = めど) vai para baixo.
- Tamanho: 127 MB em disco (eram 92 MB); cerca de 43 MB transferidos com a compressão do GitHub Pages para baixar tudo. A busca continua carregando só os blocos necessários.

## Limitações

- O português automático não foi revisado por humanos e tem erros de contexto; a ordem dos resultados é por pontuação, não por julgamento humano.
- Frases de exemplo ainda sem português (fonte bloqueada no build).
- Formas verbais conjugadas em português (“cansei”, “protegi”) não são reconhecidas; derivação (proteção ↔ proteger) só funciona quando o próprio JMdict-PT usa a palavra.
