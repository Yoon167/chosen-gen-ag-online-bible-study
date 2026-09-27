const CACHE_NAME = "gideon-cache-v2";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  // Leave Firebase (Firestore's live stream, auth), fonts and other
  // cross-origin traffic alone: intercepting and caching those streams makes
  // the installed app sluggish.
  if (url.origin !== self.location.origin) return;
  const isImmutableAsset =
    url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/");

  if (isImmutableAsset) {
    // Content-hashed build assets never change under the same URL, so
    // cache-first is safe and avoids refetching them every load.
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Only page loads are cached (for offline use). Route prefetches and other
  // requests go straight to the network so scrolling doesn't trigger a
  // stream of cache writes.
  if (event.request.mode !== "navigate") return;

  // Network-first so a new deploy shows up immediately; fall back to the
  // cache only when offline.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
