const { chromium } = require('playwright');
/* 11.0 — Busca do Dicionário: correções comprovadas na investigação de conteúdo (docs/CONTENT-AUDIT-11.md)
   e as buscas que já funcionavam (para não quebrar). Também confirma que palavras ausentes continuam ausentes:
   a correção é da busca, não do conteúdo. */
const path = require('path');
const URL = 'file://' + path.resolve(__dirname, '../dist/nihongo-quest.html');
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
(async () => {
  const browser = await chromium.launch(); const page = await browser.newPage();
  await page.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await page.goto(URL);
  const top = (q, n = 3) => page.evaluate(([q, n]) => dictSearch(q).slice(0, n).map(e => e.jp), [q, n]);
  // corrigidas na 11.0
  ok((await top('obrigada')).includes('ありがとう'), '“obrigada” acha ありがとう (Obrigado(a))');
  ok((await top('segunda feira', 1))[0] === '月曜日', '“segunda feira” sem hífen acha 月曜日');
  ok((await top('o gato', 1))[0] === '猫', '“o gato” (com artigo) acha 猫');
  ok((await top('gatos', 1))[0] === '猫', '“gatos” (plural) acha 猫');
  ok((await top('estações', 2)).includes('駅'), '“estações” (plural em -ões) acha 駅');
  ok((await top('as flores', 1))[0] === '花', '“as flores” acha 花');
  // continuam funcionando
  for (const [q, jp] of [['gato', '猫'], ['GATO', '猫'], ['  gato  ', '猫'], ['neko', '猫'], ['ねこ', '猫'], ['ネコ', '猫'], ['猫', '猫'], ['familia', '家族'], ['família', '家族'], ['maçã', 'りんご'], ['maca', 'りんご'], ['arigato', 'ありがとう'], ['arigatō', 'ありがとう'], ['koohii', 'コーヒー'], ['kōhī', 'コーヒー'], ['こーひー', 'コーヒー'], ['segunda-feira', '月曜日'], ['taberu', '食べる'], ['konnitiwa', 'こんにちは'], ['bom dia', 'おはよう']])
    ok((await top(q, 2)).includes(jp), `“${q}” acha ${jp}`);
  // ausências reais (conteúdo, não busca)
  // lacunas do audit da 11.0, preenchidas na 12.0
  for (const [q, jp] of [['quadrado', '四角'], ['chifre', '角'], ['triângulo', '三角'], ['escudo', '盾']]) ok((await top(q, 3)).includes(jp), `“${q}” agora acha ${jp}`);
  ok(await page.evaluate(() => DICT.list.length) >= 1590, 'nenhum verbete removido (' + await page.evaluate(() => DICT.list.length) + ')');
  await browser.close();
  console.log(fails ? `\n${fails} FALHA(S)` : '\nTUDO OK');
  process.exit(fails ? 1 : 0);
})();
