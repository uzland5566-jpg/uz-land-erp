var CACHE = 'uzland-v1';
var FILES = [
  './', './index.html', './dashboard.html',
  './laser.html', './chevar.html', './quyish.html', './qadoqlash.html',
  './ombor.html', './sotuvchi.html', './retseptura.html',
  './xodimlar.html', './admin.html',
  './app.js', './manifest.json',
  './icon-192.svg', './icon-512.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.includes('script.google.com')) return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(res){
        return caches.open(CACHE).then(function(c){ c.put(e.request,res.clone()); return res; });
      });
    }).catch(function(){ return caches.match('./index.html'); })
  );
});
