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
| Montagem dos dados JMdict/Tatoeba/KanjiVG usada no build | Pacote npm `@johnmorrisdotca/jisho@2.11.0` | Os dados mantêm as licenças acima |

## Português

- O JMdict não traz português, e as traduções em outros idiomas não inglês do JMdict **não** foram usadas.
- O português vem de três origens, sempre marcadas na ficha da palavra (e, nesta ordem, na busca):
  - **Nihongo Quest** (`nq`): palavras que o próprio app já ensinava, ligadas à entrada do JMdict pela escrita e leitura.
  - **Tradução do Nihongo Quest a partir do JMdict** (`tr`): traduções escritas para as palavras mais frequentes a partir das definições em inglês do JMdict (`tools/dict/pt/*.tsv`). Quando não há tradução confiável, o app mostra só a definição original em inglês, identificada como tal.
  - **Tradução automática (JMdict-PT)** (15.0, campo de português de cada sentido): glosas traduzidas automaticamente do inglês (gpt-4.1-mini) pelo projeto JMdict (Português), com correções da comunidade, **sem revisão humana completa**. O app mostra o selo “auto” e o inglês do JMdict logo abaixo.
- **Modificações feitas pelo Nihongo Quest na camada JMdict-PT** (declaração exigida pela CC BY-SA 4.0): a camada original é um mapa “glosa inglesa → glosa portuguesa”; o script `tools/dict/build-dict.mjs` aplica esse mapa (com as correções por sentido e globais do projeto, nessa ordem) às glosas da versão 2026-11-04 do JMdict usada aqui, preservando o número da entrada (ent_seq) e a ordem dos sentidos. Ajustes mecânicos: maiúscula inicial vazada do inglês vira minúscula; traduções idênticas ao texto em inglês não são exibidas como português (só ajudam a busca, ex.: empréstimos como “saudade” e “sushi”); traduções repetidas dentro do mesmo sentido são removidas. Glosas que não existem no snapshot de 2026-09-03 ficam só em inglês. Nenhuma tradução foi gerada pelo Nihongo Quest para esta camada.
- Atribuição pedida pelo projeto: “JMdict (Português): camada de tradução © Shiritai, CC BY-SA 4.0; baseada no JMdict © James William Breen e EDRDG, usado sob CC BY-SA 4.0 nos termos da EDRDG. Tradução automática do inglês com correções da comunidade. Fonte: https://github.com/zhusupbekova/jmdict-pt”. “Shiritai” identifica o projeto e a camada de tradução; a licença dos dados não concede direitos sobre a marca nem implica endosso.
- As frases de exemplo do Tatoeba aparecem em japonês e inglês; o app não inventa traduções para elas.

## Créditos

This work uses the JMdict, KANJIDIC2 and KRADFILE dictionary files. These files are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's licence.

JMdict (Português): Portuguese translation layer © Shiritai, CC BY-SA 4.0; based on JMdict © James William Breen and EDRDG, used under CC BY-SA 4.0 on the EDRDG's terms. Machine-translated from English and community-corrected. Source: https://github.com/zhusupbekova/jmdict-pt

Example sentences from the Tatoeba Project (https://tatoeba.org), licensed under CC BY 2.0 FR. Stroke order data from KanjiVG (https://kanjivg.tagaini.net), © Ulrich Apel, CC BY-SA 3.0. Pitch accent data from Kanjium (https://github.com/mifunetoshiro/kanjium), CC BY-SA 4.0.
