/* ==========================================================
   ORGANIZAÇÃO FINAL 3.0 — ordem das alas no mapa, estágios
   (Iniciante N5–N4, Intermediário N3, Avançado N2, Proficiente N1+)
   e numeração. Ids nunca mudam; só a posição no mapa.
   ========================================================== */
(function () {
  const ORDER = ['c1', 'c4', 'c2', 'c5', 'c3', 'c6', 'c8', 'c7', 'c9', 'c10', 'c11', 'c12', 'c14', 'c13', 'c15', 'c16', 'c17',
    'c18', 'c19', 'c20', 'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30', 'c31', 'c32', 'c33', 'c34', 'c35'];
  const pos = id => { const i = ORDER.indexOf(id); return i < 0 ? 999 : i; };
  CATS.sort((a, b) => pos(a.id) - pos(b.id));
  CATS.forEach((c, i) => { c.num = i + 1; if (!c.stage) c.stage = 'ini'; });
  const JLPT = { c1: 'N5', c4: 'N5', c2: 'N5', c5: 'N5', c3: 'N5', c6: 'N5', c8: 'N4', c7: 'N5', c9: 'N4', c10: 'N4' };
  CATS.forEach(c => { if (!c.jlpt && JLPT[c.id]) c.jlpt = JLPT[c.id]; });
})();
