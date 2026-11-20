/* 3.0: o mapa da Academia tem abas de estágio e alas recolhíveis.
   Antes de clicar (ou verificar) uma lição ou avaliação, abre a aba e a ala certas,
   como o usuário faria tocando nelas. */
async function reveal(page, sel) {
  if (typeof sel !== 'string' || !/openLesson|openCatExam/.test(sel)) return;
  const m = /data-(?:id|cat)="([^"]+)"/.exec(sel); if (!m) return;
  await page.evaluate(id => {
    if (!document.querySelector('.stage-tabs')) return;
    const c = CAT[id] || (LESSON[id] && LESSON[id].cat); if (!c) return;
    if (acad.stage === stageOf(c) && acad.open[c.id]) return;
    acad.stage = stageOf(c); acad.open[c.id] = true; render();
  }, m[1]);
}
module.exports = function patch(page) {
  for (const fn of ['click', 'isVisible', '$', 'waitForSelector']) {
    const orig = page[fn].bind(page);
    page[fn] = async (sel, ...a) => { await reveal(page, sel); return orig(sel, ...a); };
  }
  page.reveal = sel => reveal(page, sel);
  return page;
};
