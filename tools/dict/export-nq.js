/* Exporta as palavras do Nihongo Quest (português revisado do app) para ligar ao JMdict.
   Uso: python3 src/build.py && node tools/dict/export-nq.js  → tools/dict/nq-words.json */
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await p.goto('file://' + path.resolve(__dirname, '../../dist/nihongo-quest.html'));
  const out = await p.evaluate(() => { dictBuild(); return DICT.list.filter(e => !e.particle && e.pos !== 'kanji').map(e => ({ key: e.key, kanji: e.kanji || '', kana: e.kana || '', pt: e.pt, pos: e.pos || '', ex: e.ex.slice(0, 3).map(x => ({ jp: x.jp, ro: x.ro || '', pt: x.pt || '' })), items: e.items.concat(e.dictId ? [e.dictId] : []) })); });
  fs.writeFileSync(path.resolve(__dirname, 'nq-words.json'), JSON.stringify(out));
  console.log(out.length, 'palavras exportadas'); await b.close();
})();
