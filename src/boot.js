/* ==========================================================
   INÍCIO DO APP (roda por último, depois de todos os módulos)
   ========================================================== */
/* ---------- início do app ---------- */
(function init() {
  initAudio();
  applyTheme();
  if (S.profile.onboarded && S.streak.last && dayDiff(S.streak.last, dayKey()) >= 4) pending.push({ type: 'comeback' });
  const h = (location.hash || '').replace('#', '');
  view = VIEWS.includes(h) ? h : 'inicio';
  chNotifyUnlocks();
  chInitiative();
  render();
  checkAchievements();
  saveNow(); // grava o esquema novo logo após a migração (o backup do esquema antigo já foi guardado)
  setTimeout(flushPending, 400);
  window.addEventListener('hashchange', () => { const v = location.hash.replace('#', ''); if (VIEWS.includes(v) && v !== view && !P && !CHV && !WV && !RV) { view = v; render(); } });
})();

/* gancho para testes automatizados */
window.__NQ = { get S() { return S; }, get P() { return P; }, get CHV() { return CHV; }, get WV() { return WV; }, get RV() { return RV; }, auto: wAuto, READ: { course: READ_COURSE, L: RD_L, CH: RD_CH, KJ: RD_KJ, WD: RD_WD, build: rdBuildLesson, exam: rdBuildExam, review: rdBuildReview, heard: rdHeardPool, known: rdKnownSet, canRead: rdCanRead, units: rdUnits }, get AUDIO() { return AUDIO; }, CHAT: { chars: CHAT_CHARS, scenes: CHAT_SCENES, canon: chCanon, evaluate: chEvaluate, knows: chKnows, node: chNode, state: chState, thread: chThread, initiative: chInitiative, unlocked: chUnlocked, scenesFor: chScenesFor, bestForm: chBestForm, want: chWant, pack: CHAT_PACK, analyze: chTalkAnalyze, talk: TALK, stickers: CH_STK, exGet: chExGet, sugg: chTalkSugg, reply: chTalkReply, seed(n) { CH_SEED = n; } }, CATS, LESSON, ITEM, DIALOGS, AUDIO_PACKS, numJp, levelInfo, dayDiff, normalize, setState(s) { S = s; saveNow(); render(); }, suspendSave() { saveSuspended = true; } };
