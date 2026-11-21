# Adventure Mode RPG (11.0.0)

Um RPG curto, em um mundo original de fantasia japonesa, que usa o que o aluno já estudou. Ele não substitui as lições. É um lugar para usar as palavras.

**Onde fica:**

- Início, no cartão “Adventure Mode”.
- Mundo, no cartão do Adventure Mode.
- Pelo endereço `#aventura`.

**Código:**

- `src/rpg-data.js` tem os dados: palavras, itens, inimigos, NPCs, mapas, regiões e missões.
- `src/rpg.js` tem o motor.
- O teste é `tests/e2e12.js`.

## Mundo

**A história começa na Vila Asahi (朝日村).** O silêncio está apagando as palavras da região. A Vovó Chiyo entrega ao herói a *kotodama*, o poder das palavras.

**Mapa da região:** 6 áreas ligadas, mais 3 regiões trancadas para o futuro.

| Área | Tipo | O que tem |
| --- | --- | --- |
| Vila Asahi 朝日村 | segura | Chiyo, Hana (loja), Tetsu (ferreiro), Sora, baú, placas |
| Campo Nohara 野原 | combate | mochis, ervas, baú |
| Floresta Sussurrante 囁きの森 | combate | corvos, kodamas, tanuki, Gen |
| Santuário da Raposa 狐の神社 | segura | Kohaku (raposa dos enigmas), santuário que cura |
| Rio Kiyokawa 清川 | chefe | Kappa da ponte |
| Caverna do Eco 木霊の洞窟 | masmorra | morcegos, golem de pedra, Oni do silêncio |
| Montanha Kumo, Costa Shio, Castelo do Silêncio | trancadas | “em breve” no mapa da região |

**Controles:**

- Tocar no chão anda até o lugar.
- O direcional tem botões grandes. O teclado também funciona.
- Andar até um NPC, um baú ou um inimigo interage com ele.
- Funciona em telas de 360px.

## Personagem

**Atributos:**

- O herói tem nível (até 20) e EXP de aventura.
- EXP de aventura é separada do XP de estudo do app.
- Tem HP, Ki, ataque, defesa e crítico.

**Equipamento:** 5 espaços (arma, escudo, armadura, elmo e acessório).

**Itens:** 21 no total, com raridade comum, rara e lendária, atributos e origem (loja, baú, inimigo ou forja):

- 14 equipamentos.
- 4 consumíveis.
- 3 materiais.

**Também tem:**

- Bolsa.
- Diário de missões.
- Mapa.
- “Palavras da aventura”.
- Opções: romaji, tradução e “ouvir primeiro”. A voz e a velocidade são as do app.

**Conquistas:** 4 novas no app (Começo da jornada, A ponte está livre, As palavras voltaram, Olhos de explorador).

## Combate por turnos

**Comandos:**

- 攻撃 atacar.
- 防御 defender.
- 魔法: 火, 水, 風 e 回復.
- 道具 itens.
- 逃げる fugir.
- **言霊 (palavra):** um desafio rápido com uma palavra.

**Formatos do desafio de palavra:** ouvir, ler, inverso, pares e montar. O formato acompanha o nível do herói.

**Acertar o desafio:** dá um golpe forte.

**Errar o desafio:**

- Dá um golpe fraco.
- Mostra a resposta certa com áudio.
- Nunca tira HP do herói.

**Inimigos:**

- 6 inimigos comuns, com jeitos diferentes: rápido, fantasma, trapaceiro e carga.
- 2 chefes:
  - O Kappa fica atordoado com palavras.
  - O Oni silencia a magia, e as palavras quebram o silêncio.

**Ren** acompanha o herói depois da 1ª missão. Ajuda a cada 3 turnos, com a personalidade do Chat.

**Derrota:** o herói volta para a vila curado e não perde nada.

## Regras de ensino

- **Nenhuma palavra é cobrada antes de ser estudada.** Os desafios usam `nqKnownWords()`, ou seja, as palavras que o aluno já viu em qualquer área, mais as que o próprio jogo ensinou.
- **Palavra nova é ensinada antes de ser cobrada.** Os NPCs apresentam cada palavra com áudio, romaji e tradução.
- **Aluno novo, sem nenhuma palavra:** o Ren ensina uma antes da primeira luta.
- **Nem toda luta é teste.** Atacar, defender, magia e itens bastam para vencer. O desafio de palavra é opcional.
- **O RPG não mexe no estudo:**
  - Não marca lições como concluídas.
  - Não mexe no SRS, no histórico nem nas avaliações.
- **Palavras do RPG:**
  - Os itens `rpg:*` são da origem “outro”, por isso ficam fora das provas.
  - Cada palavra pode ir para o Caderno por escolha do aluno.

## Missões e recompensas

**Missões:**

- 5 principais: Despertar em Asahi, Os mochis do campo, A floresta sussurrante, O guardião da ponte, A Caverna do Eco.
- 5 secundárias: Ervas para a Hana, O gato perdido, Ferro para o ferreiro, Os enigmas da raposa, Olhos de explorador.

**Recompensas sem farm:**

- XP do app e moedas só na **primeira** conclusão. Elas usam `nqRewardOnce('rpg:…')`, que paga uma vez só.
- Ao todo são 19 recompensas únicas, cerca de 305 XP de estudo no jogo completo.
- Lutas repetidas dão só EXP de aventura e itens comuns.
- Ervas renascem uma vez por dia.
- Cada baú abre uma vez.

**Moedas:** são as do app (`S.coins`). Servem para a loja da Hana e a forja do Tetsu.

## Save

- **Esquema 11:**
  - `MIGRATIONS[10]` só acrescenta `S.rpg`.
  - O backup automático fica em `nihongoQuest:backup:schema10`.
- **Teste de migração:** usa o save real da 10.0 (`tests/v10.0-save.json`).
- **Cópia da versão anterior:** a 10.0 completa está em `backup/nihongo-quest-v10.0.0.html`.
