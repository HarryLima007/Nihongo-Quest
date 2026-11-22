# Dados do Dicionário Geral do Nihongo Quest (`dict/v2/`)

Os arquivos desta pasta são **dados de terceiros** convertidos para um formato compacto pelo script `tools/dict/build-dict.mjs`. Eles **não** estão cobertos pelo aviso “todos os direitos reservados” do Nihongo Quest (veja `NOTICE`): continuam sob as licenças dos seus autores, listadas abaixo. As traduções para o português feitas pelo Nihongo Quest a partir dessas definições são obras derivadas e, por isso, são distribuídas sob a mesma licença CC BY-SA 4.0.

| Dados | Fonte | Licença |
| --- | --- | --- |
| Palavras, leituras, sentidos, classes gramaticais, marcas de uso, referências cruzadas | **JMdict** (versão de 2026-11-04), Electronic Dictionary Research and Development Group (EDRDG) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), conforme a [licença do EDRDG](https://www.edrdg.org/edrdg/licence.html) |
| Ligações entre palavras e frases de exemplo | Arquivo de exemplos do JMdict (JMdict_e_examp), EDRDG | CC BY-SA 4.0 (licença do EDRDG) |
| Kanji: leituras on/kun, nanori, traços, radical, série escolar, frequência, significados (inclusive em português) | **KANJIDIC2**, EDRDG (pacote npm `kanjidic2-json`) | CC BY-SA 4.0 (licença do EDRDG) |
| Componentes dos kanji | **KRADFILE/RADKFILE**, EDRDG (pacote npm `@johnmorrisdotca/bushu`) | CC BY-SA 4.0 (licença do EDRDG) |
| Frases de exemplo (japonês e inglês) | **Tatoeba** (tatoeba.org) — cada frase tem os seus autores, e o número da frase é mostrado no app | [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/) |
| Ordem dos traços (desenhos) | **KanjiVG**, Ulrich Apel e colaboradores | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Níveis JLPT estimados dos kanji | Listas de Jonathan Waller (tanos.co.uk) | CC BY |
| Kanji parecidos | Dados de semelhança de Lars Yencken e pares do KanjiVG | CC BY 3.0 |
| Acento tonal (pitch accent) | **Kanjium** (accents.txt), Uros O. | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Português dos sentidos (tradução automática) | **JMdict (Português) / JMdict-PT**, commit `e41652621c7fc239cb85aa7b023406bd258a1c92` de https://github.com/zhusupbekova/jmdict-pt (snapshot do JMdict de 2026-09-03). Camada de tradução © Shiritai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); o material JMdict subjacente segue a licença do EDRDG. Cópias: `JMDICT-PT-LICENSE-data.md` e `LICENSE-jmdict.html` nesta pasta |
| Português de sentidos sem tradução na 15.0 — correspondência japonês ↔ português por synset (16.0, origem `wn`) e confirmação de cognatos (origem `cg`) | **Open Multilingual Wordnet** (`omw-data`, commit `406bf83b3c507a3d1f26e88252d5d66893fd36bf`, https://github.com/omwn/omw-data): **Japanese WordNet** (© 2009, 2010 NICT), **OpenWN-PT** (A. Rademaker, V. de Paiva, G. de Melo e colaboradores), wordnet do **Wiktionary** (F. Bond e R. Foster) e **Princeton WordNet 3.0** (lemas ingleses) | Japanese WordNet: licença própria (permissiva, exige o aviso — cópia em `JAPANESE-WORDNET-LICENSE.txt`); OpenWN-PT: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) (`OPENWN-PT-LICENSE.txt`); Wiktionary: CC BY-SA 3.0 / GFDL (`WIKTIONARY-WORDNET-LICENSE.txt`); WordNet 3.0: licença WordNet (`PRINCETON-WORDNET-LICENSE.txt`) |
| Verificação de grafia portuguesa (só no build, nada é distribuído) | Vocabulário do **VERO** (verificador ortográfico pt-BR do LibreOffice, Raimundo Moura e equipe), pacote npm `dictionary-pt@4.0.0` | LGPL-3.0 / MPL-2.0 — usado apenas como consulta no build |
| Montagem dos dados JMdict/Tatoeba/KanjiVG usada no build | Pacote npm `@johnmorrisdotca/jisho@2.11.0` | Os dados mantêm as licenças acima |

## Português

- O JMdict não traz português, e as traduções em outros idiomas não inglês do JMdict **não** foram usadas.
- O português vem de três origens, sempre marcadas na ficha da palavra (e, nesta ordem, na busca):
  - **Nihongo Quest** (`nq`): palavras que o próprio app já ensinava, ligadas à entrada do JMdict pela escrita e leitura.
  - **Tradução do Nihongo Quest a partir do JMdict** (`tr`): traduções escritas para as palavras mais frequentes a partir das definições em inglês do JMdict (`tools/dict/pt/*.tsv`). Quando não há tradução confiável, o app mostra só a definição original em inglês, identificada como tal.
  - **Tradução automática (JMdict-PT)** (15.0, campo de português de cada sentido): glosas traduzidas automaticamente do inglês (gpt-4.1-mini) pelo projeto JMdict (Português), com correções da comunidade, **sem revisão humana completa**. O app mostra o selo “auto” e o inglês do JMdict logo abaixo.
- **16.0 — entradas que estavam sem português** (lista congelada em `tools/dict/pt16/pendentes-15.json`, resultado em `tools/dict/pt16/resolvidas.tsv`, processo em `tools/dict/resolve-pt16.mjs`). Cada sentido guarda a origem no próprio dado (campo 10 do sentido) e a ficha mostra:
  - **`cg` — cognato confirmado**: o JMdict-PT traduziu a glosa por um texto idêntico ao inglês (ex.: “metal”, “retina”, “Illinois”). A 15.0 não mostrava esses casos; a 16.0 mostra quando o texto é confirmado como português (lema da OpenWN-PT/Wiktionary, vocabulário do VERO, ou nome próprio), fora de uma lista de falsos amigos (ex.: *data*, *pasta*, *gripe*, *costume*). Continua sendo tradução automática do JMdict-PT.
  - **`wn` — WordNet**: a forma japonesa está num synset da Japanese WordNet/Wiktionary **e** uma glosa inglesa do sentido é lema desse mesmo synset; o português vem dos lemas do synset (OpenWN-PT/Wiktionary). Casos em que o synset era de outro sentido foram corrigidos à mão (`pt16/tr-07.tsv`).
  - **`tr` — tradução do Nihongo Quest**: o que nenhuma fonte resolveu foi traduzido a partir do inglês do JMdict (`pt16/tr-*.tsv`), **feito com IA e sem revisão humana**.
  - **`em` — nome ou empréstimo**: empresas, marcas, obras, personagens e termos (ex.: “bossa nova”, “Pikachu”, “Studio Ghibli”) cujo nome em português é o mesmo.
  - Uma entrada (ギャモン, *gammon*) ficou sem português: o inglês é ambíguo e nenhuma fonte diz qual sentido; ela mostra o inglês do JMdict (`pt16/nao-resolvidas.tsv`).
  - Os dados das outras 213.301 entradas não mudaram em nada em relação à 15.0.
- **Modificações feitas pelo Nihongo Quest na camada JMdict-PT** (declaração exigida pela CC BY-SA 4.0): a camada original é um mapa “glosa inglesa → glosa portuguesa”; o script `tools/dict/build-dict.mjs` aplica esse mapa (com as correções por sentido e globais do projeto, nessa ordem) às glosas da versão 2026-11-04 do JMdict usada aqui, preservando o número da entrada (ent_seq) e a ordem dos sentidos. Ajustes mecânicos: maiúscula inicial vazada do inglês vira minúscula; traduções idênticas ao texto em inglês não são exibidas como português (só ajudam a busca, ex.: empréstimos como “saudade” e “sushi”), exceto, desde a 16.0, nas entradas que não tinham nenhum português e em que o texto foi confirmado como português (origem `cg`, acima); traduções repetidas dentro do mesmo sentido são removidas. Glosas que não existem no snapshot de 2026-09-03 ficam só em inglês. Nenhuma tradução foi gerada pelo Nihongo Quest para esta camada (as traduções do projeto ficam separadas, com origem `tr`).
- Atribuição pedida pelo projeto: “JMdict (Português): camada de tradução © Shiritai, CC BY-SA 4.0; baseada no JMdict © James William Breen e EDRDG, usado sob CC BY-SA 4.0 nos termos da EDRDG. Tradução automática do inglês com correções da comunidade. Fonte: https://github.com/zhusupbekova/jmdict-pt”. “Shiritai” identifica o projeto e a camada de tradução; a licença dos dados não concede direitos sobre a marca nem implica endosso.
- As frases de exemplo do Tatoeba aparecem em japonês e inglês; o app não inventa traduções para elas.

## Créditos

This work uses the JMdict, KANJIDIC2 and KRADFILE dictionary files. These files are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's licence.

JMdict (Português): Portuguese translation layer © Shiritai, CC BY-SA 4.0; based on JMdict © James William Breen and EDRDG, used under CC BY-SA 4.0 on the EDRDG's terms. Machine-translated from English and community-corrected. Source: https://github.com/zhusupbekova/jmdict-pt

Japanese WordNet © 2009, 2010 NICT (National Institute of Information and Communications Technology), used under the Japanese WordNet license (copy in JAPANESE-WORDNET-LICENSE.txt). OpenWN-PT (https://github.com/own-pt/openWordnet-PT), CC BY-SA 3.0. Wiktionary-derived wordnet data (Bond & Foster 2013), CC BY-SA 3.0. Princeton WordNet 3.0 © Princeton University, WordNet license. All via the Open Multilingual Wordnet (https://github.com/omwn/omw-data).

Example sentences from the Tatoeba Project (https://tatoeba.org), licensed under CC BY 2.0 FR. Stroke order data from KanjiVG (https://kanjivg.tagaini.net), © Ulrich Apel, CC BY-SA 3.0. Pitch accent data from Kanjium (https://github.com/mifunetoshiro/kanjium), CC BY-SA 4.0.
