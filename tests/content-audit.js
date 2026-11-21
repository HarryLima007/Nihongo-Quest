const { chromium } = require('playwright');
/* 11.0 — Investigação do banco de conteúdo (SOMENTE LEITURA).
   Carrega o app publicado (dist/nihongo-quest.html) e conta direto dos dados carregados: itens de todas as áreas,
   palavras únicas, expressões, frases, caracteres, Dicionário, busca e cobertura por categoria.
   Uso: python3 src/build.py && node tests/content-audit.js  → imprime o resumo e grava docs/content-audit-11.json */
const path = require('path'); const fs = require('fs');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');

/* palavras essenciais de referência por categoria (iniciante e intermediário), em português */
const REF = {
  'Números e quantidades': ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'cem', 'mil', 'dez mil', 'zero', 'metade', 'quantos', 'muito', 'pouco', 'primeiro', 'tudo'],
  'Cumprimentos e expressões': ['olá', 'bom dia', 'boa noite', 'obrigado', 'desculpe', 'com licença', 'tchau', 'prazer', 'bom apetite', 'sim', 'não', 'por favor', 'tudo bem', 'parabéns', 'cheguei', 'bem-vindo', 'até amanhã', 'boa sorte', 'cuidado', 'entendi'],
  'Pessoas e família': ['pai', 'mãe', 'irmão mais velho', 'irmã mais velha', 'irmão mais novo', 'irmã mais nova', 'avô', 'avó', 'filho', 'filha', 'família', 'amigo', 'professor', 'aluno', 'pessoa', 'criança', 'homem', 'mulher', 'marido', 'esposa', 'bebê', 'namorado'],
  'Animais': ['cachorro', 'gato', 'pássaro', 'peixe', 'cavalo', 'vaca', 'porco', 'galinha', 'coelho', 'rato', 'macaco', 'urso', 'leão', 'tigre', 'elefante', 'cobra', 'sapo', 'tartaruga', 'raposa', 'inseto', 'borboleta', 'chifre', 'rabo', 'asa', 'pena'],
  'Comida e bebidas': ['água', 'chá', 'café', 'leite', 'arroz', 'pão', 'carne', 'peixe', 'ovo', 'fruta', 'maçã', 'banana', 'laranja', 'legume', 'sopa', 'doce', 'sal', 'açúcar', 'cerveja', 'suco', 'sushi', 'lámen', 'café da manhã', 'almoço', 'jantar'],
  'Objetos do cotidiano': ['livro', 'caneta', 'lápis', 'celular', 'relógio', 'bolsa', 'chave', 'guarda-chuva', 'óculos', 'carteira', 'dinheiro', 'papel', 'caderno', 'computador', 'televisão', 'foto', 'presente', 'caixa', 'tesoura', 'jornal'],
  'Casa e móveis': ['casa', 'quarto', 'cozinha', 'banheiro', 'porta', 'janela', 'mesa', 'cadeira', 'cama', 'sofá', 'geladeira', 'escada', 'parede', 'chão', 'telhado', 'jardim', 'lâmpada', 'armário', 'chuveiro', 'apartamento'],
  'Escola e estudo': ['escola', 'aula', 'professor', 'aluno', 'estudar', 'prova', 'lição de casa', 'pergunta', 'resposta', 'dicionário', 'universidade', 'biblioteca', 'japonês', 'palavra', 'letra', 'ler', 'escrever', 'aprender', 'lousa', 'férias'],
  'Lugares e estabelecimentos': ['loja', 'restaurante', 'hospital', 'banco', 'correio', 'hotel', 'supermercado', 'parque', 'cinema', 'museu', 'templo', 'santuário', 'farmácia', 'polícia', 'empresa', 'cidade', 'país', 'loja de conveniência', 'livraria', 'praia'],
  'Cidade e transporte': ['estação', 'trem', 'ônibus', 'carro', 'táxi', 'avião', 'bicicleta', 'metrô', 'rua', 'ponte', 'semáforo', 'esquina', 'passagem', 'aeroporto', 'navio', 'direita', 'esquerda', 'reto', 'perto', 'longe'],
  'Natureza e clima': ['montanha', 'rio', 'mar', 'árvore', 'flor', 'céu', 'sol', 'lua', 'estrela', 'chuva', 'neve', 'vento', 'nuvem', 'floresta', 'pedra', 'fogo', 'terra', 'calor', 'frio', 'tempo (clima)'],
  'Cores': ['vermelho', 'azul', 'branco', 'preto', 'amarelo', 'verde', 'marrom', 'roxo', 'rosa', 'laranja', 'cinza', 'cor'],
  'Formas': ['quadrado', 'círculo', 'triângulo', 'retângulo', 'redondo', 'forma', 'linha', 'ponto', 'coração', 'estrela', 'quadrado (forma)', 'cubo'],
  'Tempo, dias e datas': ['hoje', 'amanhã', 'ontem', 'agora', 'manhã', 'tarde', 'noite', 'semana', 'mês', 'ano', 'segunda-feira', 'domingo', 'hora', 'minuto', 'janeiro', 'aniversário', 'fim de semana', 'todo dia', 'antes', 'depois'],
  'Corpo humano': ['cabeça', 'olho', 'orelha', 'nariz', 'boca', 'mão', 'pé', 'perna', 'braço', 'dente', 'cabelo', 'rosto', 'barriga', 'costas', 'coração', 'dedo', 'garganta', 'pescoço', 'corpo', 'ombro'],
  'Roupas e acessórios': ['roupa', 'camisa', 'calça', 'saia', 'vestido', 'sapato', 'meia', 'chapéu', 'casaco', 'gravata', 'óculos', 'relógio', 'anel', 'bolsa', 'quimono', 'uniforme', 'luva', 'cachecol'],
  'Verbos comuns': ['comer', 'beber', 'ir', 'vir', 'voltar', 'ver', 'ouvir', 'falar', 'ler', 'escrever', 'comprar', 'fazer', 'dormir', 'acordar', 'trabalhar', 'estudar', 'brincar', 'esperar', 'entender', 'saber', 'usar', 'abrir', 'fechar', 'sentar', 'andar'],
  'Adjetivos': ['grande', 'pequeno', 'novo', 'velho', 'bom', 'ruim', 'bonito', 'caro', 'barato', 'quente', 'frio', 'difícil', 'fácil', 'gostoso', 'divertido', 'rápido', 'lento', 'alto', 'baixo', 'forte', 'fraco', 'interessante'],
  'Advérbios': ['muito', 'um pouco', 'sempre', 'às vezes', 'nunca', 'já', 'ainda', 'devagar', 'logo', 'bastante', 'talvez', 'juntos', 'de novo', 'também', 'só'],
  'Emoções e estados': ['feliz', 'triste', 'bravo', 'cansado', 'com fome', 'com medo', 'surpreso', 'animado', 'preocupado', 'solitário', 'nervoso', 'doente', 'ocupado', 'livre', 'com sono'],
  'Anime, jogos e entretenimento': ['anime', 'mangá', 'jogo', 'herói', 'vilão', 'espada', 'magia', 'monstro', 'ninja', 'samurai', 'poder', 'amizade', 'batalha', 'personagem', 'demônio']
};
const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'の', 'も', 'か', 'から', 'まで', 'よ', 'ね'];
/* busca: palavras do relato (quadrado, chifre) + variações de grafia em todas as formas */
const SEARCH = [
  ['quadrado', 'pt'], ['chifre', 'pt'], ['shikaku', 'romaji'], ['しかく', 'kana'], ['四角', 'kanji'], ['tsuno', 'romaji'], ['つの', 'kana'], ['角', 'kanji'],
  ['gato', 'pt'], ['GATO', 'pt'], ['  gato  ', 'pt'], ['gatos', 'pt'], ['o gato', 'pt'], ['neko', 'romaji'], ['ねこ', 'kana'], ['ネコ', 'kana'], ['猫', 'kanji'],
  ['cachorro', 'pt'], ['inu', 'romaji'], ['いぬ', 'kana'], ['犬', 'kanji'],
  ['obrigado', 'pt'], ['obrigada', 'pt'], ['arigatou', 'romaji'], ['arigato', 'romaji'], ['arigatō', 'romaji'], ['ありがとう', 'kana'],
  ['família', 'pt'], ['familia', 'pt'], ['maçã', 'pt'], ['maca', 'pt'], ['água', 'pt'], ['agua', 'pt'], ['mizu', 'romaji'], ['水', 'kanji'],
  ['estação', 'pt'], ['eki', 'romaji'], ['えき', 'kana'], ['駅', 'kanji'],
  ['café', 'pt'], ['koohii', 'romaji'], ['kōhī', 'romaji'], ['kohi', 'romaji'], ['コーヒー', 'kana'], ['こーひー', 'kana'],
  ['vermelho', 'pt'], ['aka', 'romaji'], ['akai', 'romaji'], ['赤い', 'kanji'], ['あかい', 'kana'],
  ['olho', 'pt'], ['me', 'romaji'], ['目', 'kanji'], ['trem', 'pt'], ['densha', 'romaji'], ['電車', 'kanji'],
  ['segunda-feira', 'pt'], ['segunda feira', 'pt'], ['getsuyoubi', 'romaji'], ['月曜日', 'kanji'],
  ['comer', 'pt'], ['taberu', 'romaji'], ['食べる', 'kanji'], ['たべる', 'kana'], ['tabemasu', 'romaji'],
  ['bonito', 'pt'], ['kirei', 'romaji'], ['きれい', 'kana'], ['devagar', 'pt'], ['yukkuri', 'romaji'],
  ['bom dia', 'pt'], ['ohayou', 'romaji'], ['ohayō gozaimasu', 'romaji'], ['konnichiwa', 'romaji'], ['konnichiha', 'romaji'], ['konnitiwa', 'romaji'],
  ['Tóquio', 'pt'], ['toukyou', 'romaji'], ['tokyo', 'romaji'], ['東京', 'kanji'], ['shinbun', 'romaji'], ['shimbun', 'romaji'], ['ramen', 'romaji'], ['lámen', 'pt'],
  ['triângulo', 'pt'], ['círculo', 'pt'], ['rabo', 'pt'], ['asa', 'pt'], ['espada', 'pt'], ['escudo', 'pt'], ['camisa', 'pt'], ['sapato', 'pt'], ['kutsu', 'romaji'], ['é', 'pt'], ['ki', 'romaji'], ['は', 'kana'], ['partícula', 'pt']
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await page.goto(URL);
  const out = await page.evaluate(({ REF, PARTICLES, SEARCH }) => {
    dictBuild();
    const R = {};
    const items = Object.values(ITEM);
    const src = it => {
      const id = String(it.id);
      if (id.startsWith('rpg:')) return 'Adventure Mode';
      if (id.startsWith('world:')) return 'Mundo';
      if (id.startsWith('dict:')) return 'Dicionário (extras)';
      if (id.startsWith('rd')) return 'Leitura';
      const s = itemSource(it);
      return { academia: 'Academia', auditiva: 'Academia Auditiva', listening: 'Listening Academy', chat: 'Chat' }[s] || (it.lesson && it.lesson.rd ? 'Leitura' : 'Outro');
    };
    const kindOf = it => {
      if (nqIsCharItem(it)) return 'caractere';
      const g = groupOf(it);
      if (g === 'frase' || g === 'resposta' || (it.lesson && it.lesson.kind === 'grammar') || (/[。？！?!]/.test(it.jp) && it.jp.length > 6) || it.jp.length > 14) return 'frase';
      if (g === 'expressao') return 'expressao';
      return 'palavra';
    };
    const kj = s => (String(s || '').match(/[一-鿿々]/g) || []);
    const bySrc = {};
    items.forEach(it => { const s = src(it), k = kindOf(it); const o = bySrc[s] || (bySrc[s] = { total: 0, caractere: 0, palavra: 0, expressao: 0, frase: 0 }); o.total++; o[k]++; });
    R.items = { total: items.length, bySrc };
    const kinds = { caractere: 0, palavra: 0, expressao: 0, frase: 0 }; items.forEach(it => kinds[kindOf(it)]++); R.items.kinds = kinds;
    // palavras e expressões únicas (escrita) e por sentido (clusters da 10.0)
    const lex = items.filter(it => ['palavra', 'expressao'].includes(kindOf(it)));
    const byKey = {}; lex.forEach(it => { const k = nqJpKey(it.jp); (byKey[k] || (byKey[k] = [])).push(it); });
    const clusterKeys = new Set(lex.map(it => nqSiblings(it.id).slice().sort().join(',')));
    R.unique = { lexRecords: lex.length, uniqueSpellings: Object.keys(byKey).length, uniqueWordSenses: clusterKeys.size,
      words: new Set(lex.filter(it => kindOf(it) === 'palavra').map(it => nqJpKey(it.jp))).size, expressions: new Set(lex.filter(it => kindOf(it) === 'expressao').map(it => nqJpKey(it.jp))).size,
      phrases: new Set(items.filter(it => kindOf(it) === 'frase').map(it => nqJpKey(it.jp))).size, phraseRecords: kinds.frase,
      duplicateRecords: lex.length - Object.keys(byKey).length };
    // grafia repetida com dados divergentes (mesma escrita, romaji diferente) — candidatos a revisar
    const div = [];
    Object.entries(byKey).forEach(([k, l]) => { const ros = [...new Set(l.map(x => String(x.ro).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '')))]; if (ros.length > 1) div.push({ jp: k, ro: [...new Set(l.map(x => x.ro))], src: [...new Set(l.map(src))], ids: l.map(x => x.id).slice(0, 4) }); });
    R.divergentReadings = { n: div.length, sample: div.slice(0, 40) };
    // homógrafos (mesma escrita, sentidos diferentes)
    R.homographs = Object.entries(byKey).filter(([k, l]) => new Set(l.map(x => nqSiblings(x.id).join(','))).size > 1).length;
    // só numa área
    const keySrc = {}; lex.forEach(it => { const k = nqJpKey(it.jp); (keySrc[k] || (keySrc[k] = new Set())).add(src(it)); });
    const only = {}; Object.values(keySrc).forEach(s => { if (s.size === 1) { const a = [...s][0]; only[a] = (only[a] || 0) + 1; } });
    R.onlyIn = only; R.multiArea = Object.values(keySrc).filter(s => s.size > 1).length;
    // caracteres
    const hira = new Set(), kata = new Set();
    items.filter(it => kindOf(it) === 'caractere').forEach(it => { for (const c of String(it.jp)) { if (/[぀-ゟ]/.test(c)) hira.add(c); else if (/[゠-ヿ]/.test(c) && c !== 'ー') kata.add(c); } });
    const kjReg = new Set(); items.filter(it => kindOf(it) === 'caractere' || (it.lesson && it.lesson.cat && /kanji/i.test(it.lesson.cat.title || ''))).forEach(it => kj(it.jp).forEach(c => kjReg.add(c)));
    const kjUsed = new Set(); items.forEach(it => { kj(it.jp).forEach(c => kjUsed.add(c)); if (it.ex) kj(it.ex.jp).forEach(c => kjUsed.add(c)); });
    R.chars = { hiraganaTaught: hira.size, katakanaTaught: kata.size, kanjiAsItems: kjReg.size, kanjiInDictKanjiTable: Object.keys(DICT.kanji).length, kanjiUsedInContent: kjUsed.size, readingKanji: RD_KJ ? Object.keys(RD_KJ).length : 0 };
    // atributos
    const has = f => items.filter(f).length;
    R.attrs = { total: items.length, romaji: has(it => it.ro), pt: has(it => it.pt), kanaReading: has(it => /^[぀-ヿー\s　、。！？]+$/.test(it.say || '') || /^[぀-ヿー\s　、。！？]+$/.test(it.jp)), ttsOnly: has(it => !it.say && kj(it.jp).length), example: has(it => it.ex && it.ex.jp), note: has(it => it.note || it.when || it.formal || it.ctx || it.clue), alt: has(it => it.alt), withKanji: has(it => kj(it.jp).length) };
    // dicionário
    const L = DICT.list;
    const pos = {}; L.forEach(e => { pos[e.pos || '(sem classe)'] = (pos[e.pos || '(sem classe)'] || 0) + 1; });
    const tags = {}; DICT_THEMES.forEach(t => { tags[t[1]] = L.filter(e => e.tags.includes(t[0])).length; }); tags['(sem tema)'] = L.filter(e => !e.tags.length).length;
    const kjMulti = {}; L.filter(e => e.kanji).forEach(e => { (kjMulti[e.kanji] || (kjMulti[e.kanji] = new Set())).add(e.reading); });
    R.dict = { entries: L.length, extras: DICT_EXTRA.length, extrasOnly: L.filter(e => !e.items.length).length, fromApp: L.filter(e => e.items.length).length, multiSource: L.filter(e => e.srcs.length > 1).length,
      withExample: L.filter(e => e.ex.length).length, withNotes: L.filter(e => e.notes.length || e.ctx.length).length, withPos: L.filter(e => e.pos).length, withKanji: L.filter(e => e.kanji).length, multiMeaning: L.filter(e => e.pt.length > 1).length,
      kanjiMultiReading: Object.values(kjMulti).filter(s => s.size > 1).length, pos, tags };
    // palavras do app que não viram verbete (por regra ou por falha)
    const indexed = new Set(); L.forEach(e => e.items.forEach(id => indexed.add(id)));
    const notIn = { regra_frase: 0, regra_caractere: 0, palavra: [], expressao: [] };
    items.forEach(it => {
      const k = kindOf(it); if (k === 'frase') { notIn.regra_frase++; return; } if (k === 'caractere') { notIn.regra_caractere++; return; }
      if (it.lesson === RPG_LESSON || it.lesson === DICT_LESSON) return;
      if (indexed.has(it.id)) return;
      const hit = dictSearch(nqJpKey(it.jp)).slice(0, 5).find(e => nqJpKey(e.jp) === nqJpKey(it.jp));
      notIn[k].push({ id: it.id, jp: it.jp, ro: it.ro, pt: it.pt, src: src(it), kind: it.lesson && it.lesson.kind, sameSpellingEntry: hit ? hit.jp + ' · ' + hit.pt.slice(0, 2).join('; ') : '' });
    });
    const nl = notIn.palavra.concat(notIn.expressao);
    R.notInDict = { phrasesByRule: notIn.regra_frase, charsByRule: notIn.regra_caractere, words: notIn.palavra.length, expressions: notIn.expressao.length, withoutAnyEntry: nl.filter(x => !x.sameSpellingEntry).length, sample: nl.slice(0, 80),
      bySrc: nl.reduce((a, x) => { a[x.src] = (a[x.src] || 0) + 1; return a; }, {}), rpgWords: RPG_LESSON.items.filter(it => !dictFind(it.jp, it.say) || nqJpKey(dictFind(it.jp, it.say).jp) !== nqJpKey(it.jp)).length,
      genderMarked: L.filter(e => e.pt.some(p => /o\(a\)/.test(p))).length, hyphenated: L.filter(e => e.pt.some(p => /-/.test(p))).length };
    // cada verbete é achado pela própria escrita, leitura, romaji e sentido principal?
    const top = (q, e, n = 10) => dictSearch(q).slice(0, n).includes(e);
    const miss = { kana: [], kanji: [], ro: [], pt: [] };
    L.forEach(e => {
      if (!top(e.kana, e, 30)) miss.kana.push(e.jp);
      if (e.kanji && !top(e.kanji, e, 30)) miss.kanji.push(e.jp);
      if (e.ro && !top(e.ro, e, 30)) miss.ro.push(e.jp + ' (' + e.ro + ')');
      const p = (e.pt[0] || '').split(/\s*\(/)[0].trim(); if (p && !top(p, e, 30)) miss.pt.push(e.jp + ' → ' + p);
    });
    R.searchSelf = { entries: L.length, missKana: miss.kana.length, missKanji: miss.kanji.length, missRomaji: miss.ro.length, missPt: miss.pt.length, sample: { kana: miss.kana.slice(0, 15), kanji: miss.kanji.slice(0, 15), ro: miss.ro.slice(0, 25), pt: miss.pt.slice(0, 25) } };
    // buscas pedidas
    R.searchTests = SEARCH.map(([q, kind]) => { const r = dictSearch(q); return { q, kind, n: r.length, top: r.slice(0, 3).map(e => e.jp + ' · ' + e.ro + ' · ' + e.pt.slice(0, 2).join('; ')) }; });
    // cobertura por categoria (palavra de referência encontrada no Dicionário com esse sentido; e se existe em alguma área)
    const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
    /* sentidos de um texto em PT: separa por ; , / e por parênteses ("4 (quatro)" → 4, quatro), tira (a), artigo,
       pontuação e começos como "seja", "estou" ("Seja bem-vindo(a)!" → bem-vindo; "estou cansado" → cansado) */
    const senses = t => String(t || '').replace(/\(a\)|\(o\)/gi, '').split(/\s*[;／/,()]\s*/).map(p => norm(p).replace(/[!?.…]/g, '').replace(/^(o|a|os|as|um|uma|seja|estou|esta|estar|ser|muito) /, '').trim()).filter(Boolean);
    const want = w => senses(w.replace(/\s*\(.*\)/, ''))[0] || '';
    const inDict = w => { const n = want(w); return DICT.list.some(e => e.pt.some(p => senses(p).includes(n))); };
    const inApp = w => { const n = want(w); return items.some(it => senses(it.pt).includes(n)); };
    R.categories = Object.entries(REF).map(([cat, ws]) => { const found = ws.filter(inDict), app = ws.filter(w => !inDict(w) && inApp(w)); return { cat, ref: ws.length, inDict: found.length, onlyOutsideDict: app, missing: ws.filter(w => !inDict(w) && !inApp(w)) }; });
    R.particles = { total: PARTICLES.length, inDict: PARTICLES.filter(p => DICT.list.some(e => e.kana === p && (e.pos === 'part' || /partícula/i.test(e.pt.join(' '))))).length, list: PARTICLES.filter(p => !DICT.list.some(e => e.kana === p && (e.pos === 'part' || /partícula/i.test(e.pt.join(' '))))) };
    // áreas
    const LAex = LA_LESSONS.reduce((a, l) => a + (l.ex ? l.ex.length : 0) + (l.exercises ? l.exercises.length : 0), 0);
    R.areas = {
      academia: { lessons: TOTAL_LESSONS, wings: CATS.length, items: ALL_LESSONS.reduce((a, l) => a + l.items.length, 0), exercises: ALL_LESSONS.reduce((a, l) => a + (l.exercises ? l.exercises.length : 0), 0), byKind: ALL_LESSONS.reduce((a, l) => { a[l.kind] = (a[l.kind] || 0) + l.items.length; return a; }, {}) },
      auditiva: { packs: AUDIO_PACKS.length, items: AUDIO_PACKS.reduce((a, p) => a + p.items.length, 0), dialogs: DIALOGS.length, dialogLines: DIALOGS.reduce((a, d) => a + d.lines.length, 0) },
      listening: { lessons: LA_LESSONS.length, cats: LA_CATS.length, items: LA_LESSONS.reduce((a, l) => a + l.items.length, 0), exercisesAuthored: LAex, dialogs: LA_LESSONS.filter(l => l.d).length, dialogLines: LA_LESSONS.reduce((a, l) => a + (l.d ? l.d.length : 0), 0) },
      leitura: { lessons: RD_LESSONS.length, stages: READ_COURSE.length, hira: RD_PACK.hira.items.length, kata: RD_PACK.kata.items.length, kanji: RD_PACK.kan.items.length, words: RD_PACK.word.items.length },
      mundo: { places: WORLD_PLACES.length, scenes: WORLD_SCENES.length, chars: Object.keys(WORLD_CHARS).length, words: Object.keys(WORLD_WORDS).length, lines: WORLD_SCENES.reduce((a, sc) => a + Object.values(sc.nodes).reduce((b, n) => b + [].concat(n.s || []).length + (n.o ? n.o.length : 0), 0), 0) },
      chat: { chars: CHAT_CHARS.length, scenes: CHAT_SCENES.length, packItems: CHAT_PACK.items.length, talkChars: Object.keys(TALK).length },
      rpg: { words: RPG_LESSON.items.length, areas: Object.keys(RPG_AREAS).length, quests: Object.keys(RPG_QUESTS).length }
    };
    return R;
  }, { REF, PARTICLES, SEARCH });
  fs.writeFileSync(path.resolve(__dirname, '../docs/content-audit-11.json'), JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out, null, 1).slice(0, 200000));
  await browser.close();
})();
