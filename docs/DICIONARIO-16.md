# Nihongo Quest 16.0.0 — Dicionário português completo

## Resultado

| | 15.0.0 | 16.0.0 |
| --- | --- | --- |
| Entradas do Dicionário Geral | 217.479 | 217.479 |
| Entradas com algum português | 213.300 (98,08%) | **217.478 (99,9995%)** |
| Entradas só em inglês | 4.179 | **1** |
| Entradas da 15.0 alteradas | — | 0 (as 213.301 que já tinham português estão idênticas, byte a byte) |
| Traduções revisadas por humano nesta versão | 0 | 0 (nada foi marcado como revisado) |

### As 4.179 entradas investigadas

Lista congelada em `tools/dict/pt16/pendentes-15.json`; resultado por sentido em `tools/dict/pt16/resolvidas.tsv` (4.220 sentidos); o que sobrou em `tools/dict/pt16/nao-resolvidas.tsv`.

| Origem (campo 10 do sentido) | Entradas | Sentidos | O que é |
| --- | --- | --- | --- |
| `cg` cognato confirmado | 1.716 | 1.727 | O JMdict-PT traduziu a glosa por um texto idêntico ao inglês e a 15.0 escondia. Mostrado quando confirmado como português: lema da OpenWN-PT/Wiktionary (676 confirmados pela WordNet do mesmo sentido), vocabulário do VERO, ou nome próprio; expressões só quando a expressão inteira é lema português ou todas as palavras são do VERO; lista de falsos amigos fora. Continua sendo tradução automática do JMdict-PT. |
| `wn` WordNet | 53 | 53 | Forma japonesa num synset da Japanese WordNet/Wiktionary **e** glosa inglesa do sentido como lema do mesmo synset → lemas portugueses (OpenWN-PT/Wiktionary). 97 correspondências em que o synset era de outro sentido (“bogey” de golfe → “meleca”, “widget” → “troço”, “prima donna” → “primeira-dama”) foram trocadas por tradução do app. |
| `em` nome usado em português | 661 | 671 | Empresas, marcas, obras, personagens, termos musicais e empréstimos cujo nome em português é o mesmo (“Studio Ghibli”, “Pikachu”, “bossa nova”, “allegro”). |
| `tr` tradução do app | 1.755 | 1.768 | Nenhuma base resolveu (260 glosas que nem existiam no JMdict-PT, termos técnicos, espécies, nomes que mudam em português como “San José”, “Gengis Khan”). Traduzido a partir do inglês do JMdict, **com IA, sem revisão humana**, em `tools/dict/pt16/tr-*.tsv`. |
| não resolvida | 1 | 1 | ギャモン *gammon*: o inglês é ambíguo (presunto × termo do gamão) e nenhuma fonte diz qual; fica em inglês. |

Por prioridade do pedido: correspondências diretas (WordNet e cognatos) primeiro; vocabulário comum (330 das 4.179 eram “comuns”) resolvido quase todo por cognato; sentidos múltiplos tratados um a um (ex.: 下糸入れ = lançadeira × enfiar a linha da bobina; 托卵 = parasitismo de ninhada × fraude de paternidade); especializados e nomes próprios por último.

## Fontes avaliadas

- **Open Multilingual Wordnet (`omw-data`)** — usado. https://github.com/omwn/omw-data, commit `406bf83b3c507a3d1f26e88252d5d66893fd36bf`. Inclui a **Japanese WordNet** (© 2009, 2010 NICT, licença própria permissiva com aviso obrigatório — copiada para `dict/v2/JAPANESE-WORDNET-LICENSE.txt`), a **OpenWN-PT** (CC BY-SA 3.0; o pedido citava o repositório own-pt/openWordnet-PT, que é a mesma base), as wordnets do **Wiktionary** (CC BY-SA 3.0) e o **Princeton WordNet 3.0** (lemas ingleses, licença WordNet). É a ponte japonês ↔ português por sentido mais direta acessível aqui.
- **VERO (pt-BR, LibreOffice)** via npm `dictionary-pt@4.0.0` — usado só no build, para confirmar que uma palavra existe em português. Nada dele vai para o app (LGPL-3.0/MPL-2.0).
- **Kaikki / Wiktionary bruto, PanLex, Tatoeba, Hugging Face, dumps da Wikimedia** — bloqueados pela rede do ambiente de build (sem conexão). O conteúdo do Wiktionary chegou pelas wordnets do OMW.
- **JMdict-PT** — continua a base da 15.0; nesta versão só se aproveitaram as traduções idênticas ao inglês que ele já tinha.

## Integridade

- Nenhuma entrada, leitura, kanji, sentido, exemplo, acento, relação ou id mudou. Teste: comparação entrada a entrada com a 15.0 (213.301 idênticas, 4.178 só com o português novo).
- Formato igual ao da 15.0: o português do sentido continua no campo 9; o campo 10 novo traz a origem quando não é o JMdict-PT comum. A 15.0 ignora o campo 10, então app e dados antigos/novos convivem.
- Busca: o português novo entra no mesmo índice (`w/`). Ajustes pequenos: “confiar em”/“depender de” também contam como “confiar”/“depender”; “ficar cansado” não paga a posição inteira da glosa (疲れる sobe de 4º para 3º em “cansado”; しんどい continua em 1º porque “cansado” é a sua primeira tradução).

## Tamanho, desempenho e offline

- Pacote praticamente igual: 127,7 MB sem compressão (+0,3 MB), cerca de 42 MB transferidos com gzip (o GitHub Pages comprime JSON). Avaliei cortar o índice de significados (até 80 resultados por termo) e o resumo da lista, mas isso piorava a busca; nada foi cortado.
- Cache offline: os blocos continuam em `dict/v2/`, mas mudaram, então o service worker usa um cache novo (`nq-dict-v2-16`) e apaga o da 15.0. Quem tinha baixado tudo para usar offline precisa baixar de novo (o aviso de novidades da 16.0 diz isso).

## Reproduzir

```
cd tools/dict
npm install --no-save @johnmorrisdotca/jisho@2.11.0 @johnmorrisdotca/bushu@1.1.2 kanjidic2-json@0.1.0
# caches: accents.txt, jmdict-pt (ver build-dict.mjs), omw-data e vero/index.dic (dictionary-pt@4.0.0)
node resolve-pt16.mjs   # → pt16/resolvidas.tsv, pt16/nao-resolvidas.tsv, pt16/resumo.json
node build-dict.mjs     # → dict/v2/
```
