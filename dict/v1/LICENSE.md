# Dados do Dicionário Geral do Nihongo Quest (`dict/v1/`)

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
| Montagem dos dados JMdict/Tatoeba/KanjiVG usada no build | Pacote npm `@johnmorrisdotca/jisho@2.11.0` | Os dados mantêm as licenças acima |

## Português

- O JMdict não traz português, e as traduções em outros idiomas não inglês do JMdict **não** foram usadas.
- O português vem de duas origens, sempre marcadas na ficha da palavra:
  - **Nihongo Quest** (`nq`): palavras que o próprio app já ensinava, ligadas à entrada do JMdict pela escrita e leitura.
  - **Tradução do Nihongo Quest a partir do JMdict** (`tr`): traduções escritas para as palavras mais frequentes a partir das definições em inglês do JMdict (`tools/dict/pt/*.tsv`). Quando não há tradução confiável, o app mostra só a definição original em inglês, identificada como tal.
- As frases de exemplo do Tatoeba aparecem em japonês e inglês; o app não inventa traduções para elas.

## Créditos

This work uses the JMdict, KANJIDIC2 and KRADFILE dictionary files. These files are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's licence.

Example sentences from the Tatoeba Project (https://tatoeba.org), licensed under CC BY 2.0 FR. Stroke order data from KanjiVG (https://kanjivg.tagaini.net), © Ulrich Apel, CC BY-SA 3.0. Pitch accent data from Kanjium (https://github.com/mifunetoshiro/kanjium), CC BY-SA 4.0.
