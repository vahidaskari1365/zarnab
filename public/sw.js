/* زرناب — Service Worker (PWA offline shell + asset caching) */
const VERSION = "zarnab-v1";
const STATIC_CACHE = `${VERSION}-static`;
const MEDIA_CACHE = `${VERSION}-media`;
const PAGE_CACHE = `${VERSION}-pages`;

const PRECACHE_URLS = [
  "/offline",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
  "/icon.svg",
  "/fonts/Vazirmatn.woff2",
  "/fonts/Cormorant.woff2",
  "/manifest.webmanifest",
];

const NEVER_CACHE_PATHS = ["/api/", "/admin", "/cart", "/_next/webpack-hmr"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "reload" });
            if (response && response.ok) await cache.put(url, response);
          } catch {
            /* ignore individual precache failures */
          }
        }),
      );
      // Also cache the assets referenced by the offline shell so it renders styled offline.
      try {
        const offline = await cache.match("/offline");
        if (offline) {
          const html = await offline.clone().text();
          const assetPaths = Array.from(
            new Set(
              (html.match(/\/(?:_next\/static|images|fonts)\/[^"'\\\)]+/g) || []).map((path) =>
                path.replace(/&amp;/g, "&"),
              ),
            ),
          ).slice(0, 40);
          await Promise.all(
            assetPaths.map(async (path) => {
              try {
                const response = await fetch(path);
                if (response && response.ok) await cache.put(path, response);
              } catch {
                /* ignore */
              }
            }),
          );
        }
      } catch {
        /* offline shell enhancement is best-effort */
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isNeverCache(url) {
  return NEVER_CACHE_PATHS.some((path) => url.pathname.startsWith(path));
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok && !isNeverCache(new URL(request.url))) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const offline = await caches.match("/offline");
    if (offline) return offline;
    return new Response(
      `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>زرناب | آفلاین</title></head><body style="font-family:system-ui;background:#fbf7ef;color:#241f19;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px"><div><h1 style="color:#8b6220">اتصال اینترنت برقرار نیست</h1><p style="color:#7c6d5b">برای مشاهدهٔ گالری زرناب، اتصال خود را بررسی کنید.</p><a href="/" style="color:#8b6220">تلاش دوباره</a></div></body></html>`,
      { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isNeverCache(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE));
    return;
  }

  if (["style", "script", "font", "manifest"].includes(request.destination)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});
