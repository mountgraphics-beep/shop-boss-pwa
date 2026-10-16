// WorkClock offline support (iPhone / browser version). Bump CACHE_NAME when index.html changes.
const CACHE_NAME = 'workclock-v1';
const FILES_TO_CACHE = ['./', './index.html', './manifest.json', './icon-512.png'];
self.addEventListener('install', (e)=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE))); });
self.addEventListener('activate', (e)=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (e)=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>{
    const net = fetch(e.request).then(r=>{ if(r && r.status===200){ const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)); } return r; }).catch(()=>cached);
    return cached || net;
  }));
});
