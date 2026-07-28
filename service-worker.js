const CACHE_NAME = 'chosen-gen-ag-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/previous-teaching.html',
  '/manage-topics.html',
  '/saved-teaching.html',
  '/styles.css',
  '/script.js',
  '/topics.js',
  '/manage-topics.js',
  '/saved-teaching.js',
  '/firebase.js',
  '/manifest.webmanifest',
  '/logo/chosen-general-young-pro.png',
  '/logo/chosen-general-young-pro-transparent.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
