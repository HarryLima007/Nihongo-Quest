# Preparação para o Adventure Mode RPG (11.0.0)

> **Atualização 11.0.0:** o Adventure Mode foi implementado seguindo estas regras. Veja [`ADVENTURE-MODE-11.md`](ADVENTURE-MODE-11.md). Uma diferença: o RPG tem EXP de aventura própria (nível do herói), separada do XP de estudo, e usa `nqRewardOnce` só para as recompensas únicas de missões e chefes. Ele não chama `recordAnswer`, para não mexer no SRS.

A 10.0 **não** implementa o RPG. Ela só deixa pronto o mínimo para ele se apoiar no que já existe, sem criar um segundo sistema de XP, de palavras ou de inventário. O código fica em `src/journey.js`.

## O que já existe para o RPG usar

| Necessidade do RPG | O que usar | Observação |
| --- | --- | --- |
| Palavras e expressões que o aluno já aprendeu | `nqKnownWords({ minStatus })` | Uma entrada por palavra, mesmo que ela tenha sido estudada em várias áreas. `minStatus`: `vista`, `revisar`, `aprendendo` ou `dominada`. Cada entrada traz `jp`, `ro`, `pt`, `say` (para a voz), `status`, `ids` e `sources`. Caracteres isolados (kana e kanji da Leitura) ficam de fora. |
| Desafios no nível do aluno | `nqLearnerLevel()` | Nível de XP, estágio da Academia, lições aprovadas, lições da Listening Academy, etapas da Leitura aprovadas, cenas do Mundo e número de palavras (e dominadas). |
| Recompensas sem pagar duas vezes | `nqRewardOnce(chave, xp, moedas)` | Registro único em `S.journey.claimed`. A mesma chave nunca paga de novo. Teto de 50 XP e 50 moedas por chave. XP vai para `S.xp` e moedas para `S.coins`, como no resto do app (missões, níveis e conquistas continuam funcionando). |
| Contar como prática de verdade | `recordAnswer(itemId, acerto, 'rpg')` | Usa o SRS de sempre. Um acerto adia a revisão da mesma palavra nas outras áreas, sem marcar domínio. |
| Ouvir | `speak(texto)` / `speakSeq` | Mesma voz do aparelho. |
| Dicionário | `dictOpenWord(jp)` | Ficha com áudio e “Adicionar ao Caderno”. |

## Regras para a 11.0

1. **Nada é cobrado antes de ser ensinado.** Batalhas e diálogos usam `nqKnownWords()`; palavra nova aparece como “Nova”, com áudio e tradução, antes de ser cobrada (como no Chat e no Mundo).
2. **Ouvir primeiro.** Desafios de compreensão auditiva valem mais que leitura. Kana e kanji nunca são obrigatórios para avançar.
3. **Um só XP.** Nada de XP próprio do RPG: use `nqRewardOnce` para a primeira conclusão de cada missão/chefe (chaves como `rpg:boss:konbini`). Repetir é livre e não dá XP.
4. **Inventário só se for preciso.** Moedas e a Loja (`S.coins`, `S.shop`) já existem. Se o RPG precisar de itens, crie `S.rpg` em uma migração nova (esquema 11), só acrescentando campos.
5. **Progresso separado.** O RPG não marca lições da Academia, da Listening Academy nem da Leitura como concluídas, e as palavras do RPG nunca entram nas avaliações (`itemSource`/`curriculumScope`).
6. **Simples no celular.** Toques grandes, uma ação por tela, sem textos longos.

## Migração

A 11.0 deve seguir o padrão de sempre: `MIGRATIONS[10]` só acrescenta `S.rpg`, com backup `nihongoQuest:backup:schema10` feito automaticamente antes de migrar.
