self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url === 'https://tiki-toki.containers.piwik.pro/ppms.js') {
    console.log('intercepted JSTC with local version');
    event.respondWith(fetch('http://localhost:2137/index.js'));
    return;
  }
  event.respondWith(fetch(event.request));
});
