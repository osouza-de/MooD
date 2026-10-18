const CACHE_NAME = 'mood-pwa-cache-v2'; // Incrementa a versão sempre que fizeres alterações importantes
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'
];

// 1. Instalação: Força o novo Service Worker a assumir o controlo imediatamente
self.addEventListener('install', event => {
  self.skipWaiting(); // Não espera o utilizador fechar as abas antigas
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Ativação: Varre todos os caches antigos e apaga-os para liberar espaço e atualizar dados
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] A limpar cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Reclama o controlo imediato das abas abertas
    })
  );
});

// 3. Fetch: Tenta buscar na rede primeiro (Network First) ou recorre ao cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se encontrou na rede, atualiza o cache dinamicamente se necessário e retorna
        return response;
      })
      .catch(() => {
        // Se falhar (offline), busca no cache local
        return caches.match(event.request);
      })
  );
});