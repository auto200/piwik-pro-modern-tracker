export type {};
declare const self: ServiceWorkerGlobalScope;

// src/service-worker.js or src/service-worker.ts
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.url === 'https://tiki-toki.containers.piwik.pro/ppms.js') {
    console.log('cancelled');
    event.respondWith(new Response(null, { status: 204 }));
    return;
  }
  event.respondWith(fetch(event.request));
});
