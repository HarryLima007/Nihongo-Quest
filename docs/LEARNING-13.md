# Nihongo Quest 13.0 — Learning Intelligence

Tudo está em `src/learn.js`, carregado depois de `vocab.js` e antes de `boot.js`. O módulo envolve funções que já existem (`recordAnswer`, `markSeen`, `recordEx`, `dueItems`, `buildReview`, `endQuiz`, telas). Ele não cria outro SRS, outro Caderno nem outro XP.

## Dados (`S.learn`, esquema 13)

| Campo | O que guarda |
| --- | --- |
| `h[id]` | Últimas 8 respostas do item (ou `ex:<lição>#<n>` para exercícios escritos), como `dia*2 + acerto` |
| `x[id]` | Áreas onde o conteúdo apareceu (bits de `LN_AREAS`: Academia, Vocabulário, Listening, Leitura, Mundo, Chat, Dicionário, Aventura, Revisão, Auditiva, Avaliações, Fala) |
| `f[id]` | Formato da última pergunta (para variar) |
| `days[dia][habilidade]` | `[respostas, acertos]` por habilidade, 120 dias |
| `snaps[dia]` | Foto diária: `[estudados, lembrados, dominados]` por habilidade, 90 dias |
| `assess`, `placement`, `stageEx` | Avaliações feitas, avaliação inicial e provas de etapa |
| `speak` | Contagem da prática de fala |
| `bf` | 1 quando o `S.history` antigo já foi aproveitado (feito uma vez, na primeira abertura) |

A migração `MIGRATIONS[12]` só cria `S.learn`. Apagar `S.learn` devolve o save exatamente como era na 12.0.

## Unidade de conhecimento

- Palavras e frases: o grupo de `nqSiblings` da 10.0 (mesma escrita e sentido compatível).
- Caracteres: `c:<habilidade>:<caractere>`. O あ da Academia e o あ da Leitura são o mesmo conteúdo.
- Exercícios escritos da Academia: `ex:<lição>#<n>`.

## Estágios

- **apresentado**: viu (`seen`) e nunca respondeu.
- **estudado**: respondeu pelo menos uma vez.
- **lembrado**: acertou em 2 dias diferentes e a última resposta foi certa.
- **dominado**: um item da unidade está “dominada” no critério do Caderno (`box >= 3` e acertos em 3 dias ou mais) e a última resposta foi certa.
- **recuperar**: a última resposta foi errada depois de já ter lembrado. Nada é apagado.

## Revisão inteligente

- Prioridade: atrasados (proporção do atraso sobre o intervalo), erros recentes, recuperação, conteúdos antigos e primeiras recordações.
- No modo misturado, nenhuma habilidade passa de 40% da sessão. Entram até 3 erros recentes e 2 conteúdos antigos.
- O formato muda a cada vez: ler, escrever, ouvir, texto ou exercício escrito.
- O intervalo do SRS é ajustado pelo histórico: com 2 erros nas últimas 6 respostas, ele cai para 60%; com 4 acertos seguidos, sobe para 125%.
- Na caixa máxima, o conteúdo entra em manutenção (15, 30, 60 e 120 dias).

## Avaliações

- **Inicial:** blocos de 5 por nível, de N5 a N1. Sobe de nível com 60% ou mais. Não grava nada no SRS, no histórico nem nas estatísticas.
- **Por área e cumulativa:** só conteúdo visto e exercícios de lições aprovadas.
- **Prova de etapa:** libera quando todas as alas da etapa foram aprovadas. Pede 80% e tem 20 perguntas.
- **XP:** nenhum XP por pergunta. Só recompensas únicas por `nqRewardOnce`: `learn:inicial`, `learn:test:<área>` e `learn:etapa:<etapa>`.
- **Estimativa de nível:** dominado vale 1, lembrado 0,6 e estudado 0,2, sobre o total de conteúdo do app em cada nível. Um nível conta como alcançado com 50% ou mais. É uma estimativa, não uma certificação.

## Dicionário

`LN_FORMS` cobre os verbos ichidan e godan nas formas ます, ない, て, た, ている, たい, たら, たり, ば, potencial, volitiva, passiva, causativa e imperativa. Cobre também os adjetivos い, する e 来る. Uma forma só é reconhecida se a palavra de base existe no dicionário com a classe certa. A forma aponta para a lição de gramática que a ensina.

## Limites conhecidos

- O reconhecimento de voz depende do navegador (Chrome no Android e Safari no iOS costumam ter). É experimental e não entra no domínio.
- A estimativa de nível só considera o conteúdo que o app tem.
