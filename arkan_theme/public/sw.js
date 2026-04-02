/**
 * ARKAN Theme — Service Worker
 * Minimal offline caching for PWA support
 */
var CACHE_NAME = 'arkan-v2';
var PRECACHE_URLS = [
    '/desk',
    '/assets/arkan_theme/css/arkan.css'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(PRECACHE_URLS);
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE_NAME; })
                    .map(function(k) { return caches.delete(k); })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    // Network-first strategy for API calls
    if (event.request.url.includes('/api/')) return;

    event.respondWith(
        fetch(event.request).then(function(response) {
            // Cache successful GET responses
            if (response.ok && event.request.method === 'GET') {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, clone);
                });
            }
            return response;
        }).catch(function() {
            return caches.match(event.request);
        })
    );
});
