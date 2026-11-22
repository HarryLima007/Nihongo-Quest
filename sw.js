/* Nihongo Quest — service worker (16.0)
   - App (HTML): rede primeiro, cópia guardada quando estiver sem internet (as atualizações chegam normalmente).
   - Dicionário Geral (dict/v2/): cache primeiro. Os arquivos têm versão no caminho (v2), então nunca ficam velhos;
     uma base nova vai para dict/v3/ e o cache antigo é apagado aqui (a 15.0 apaga o nq-dict-v1 da 14.0).
   - 16.0: a base continua em dict/v2/ (mesmo formato; só ganhou português em 4.178 entradas), mas os blocos mudaram,
     então o cache tem nome novo (nq-dict-v2-16): o antigo é apagado e os blocos novos vêm da rede. */
const APP_CACHE = 'nq-app-v16';
const DICT_CACHE = 'nq-dict-v2-16';
const KEEP = [APP_CACHE, DICT_CACHE];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(['./', 'nihongo-quest.html', 'index.html']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('nq-') && !KEEP.includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  if (url.pathname.includes('/dict/v2/')) {
    e.respondWith(caches.open(DICT_CACHE).then(async c => { const hit = await c.match(req, { ignoreSearch: true }); if (hit) return hit; const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }));
    return;
  }
  if (req.mode === 'navigate' || /\.html?$|\/$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(APP_CACHE).then(c => c.put(req, cp)); } return r; }).catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('nihongo-quest.html'))));
  }
});
