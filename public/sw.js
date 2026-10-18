const CACHE_NAME = 'mood-pwa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Fazemos cache do CryptoJS local para que funcione offline se a CDN falhar
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, usa. Se não, tenta na rede.
        return response || fetch(event.request);
      })
  );
});