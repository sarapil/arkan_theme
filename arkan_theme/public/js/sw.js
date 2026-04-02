// ARKAN Service Worker
const CACHE_NAME = 'arkan-theme-v1';
const ASSETS_TO_CACHE = [
    '/assets/arkan_theme/svg/arkan-logo.svg',
    '/assets/arkan_theme/svg/arkan-icon.svg',
    '/assets/arkan_theme/svg/arkan-logo-main.svg',
    '/assets/arkan_theme/css/arkan.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch(() => {
                // Gracefully handle missing assets during install
                console.log('[ARKAN SW] Some assets not available for pre-cache');
            });
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(
                names
                    .filter((name) => name !== CACHE_NAME && name.startsWith('arkan-'))
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Cache-first for theme assets
    if (url.pathname.startsWith('/assets/arkan_theme/')) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) return cached;
                return fetch(event.request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    }
                    return response;
                }).catch(() => cached);
            })
        );
        return;
    }

    // Network-first for everything else
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
