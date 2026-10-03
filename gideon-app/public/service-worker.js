const CACHE_NAME = "gideon-cache-v3";
// Downloads the member chose on the Offline page (see lib/offline.ts). They
// survive app updates; only the app's own cache is replaced.
const OFFLINE_PREFIX = "gideon-offline-";
const OFFLINE_READER = "/bible/offline-reader";
const MATCH = { ignoreSearch: true, ignoreVary: true };

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && !key.startsWith(OFFLINE_PREFIX))
          .map((key) => caches.delete(key))
      )
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
  // `no-cache` skips pages the browser kept from an older deploy, which
  // would otherwise make Next.js hard-reload on every tap.
  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => offlinePage(url))
  );
});

// Offline: the page itself if it was saved; any Bible chapter through the
// offline reader; otherwise the home page.
async function offlinePage(url) {
  const saved = await caches.match(url.pathname, MATCH);
  if (saved) return saved;
  if (/^\/bible\/[a-z0-9-]+\/\d+\/?$/.test(url.pathname)) {
    const reader = await caches.match(OFFLINE_READER, MATCH);
    if (reader) return reader;
  }
  return (await caches.match("/", MATCH)) || Response.error();
}

// Live-study alerts: tapping one opens (or focuses) the app on the live page.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if ("focus" in w) {
          w.navigate(url);
          return w.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
