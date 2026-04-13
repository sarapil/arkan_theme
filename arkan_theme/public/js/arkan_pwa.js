// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN PWA — Service Worker Registration
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.pwa = {
        init: function() {
            // Inject manifest link tag if not already present
            if (!document.querySelector('link[rel="manifest"]')) {
                var link = document.createElement('link');
                link.rel = 'manifest';
                link.href = '/assets/arkan_theme/manifest.json';
                document.head.appendChild(link);
            }

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/assets/arkan_theme/sw.js')
                    .then(reg => console.log('[ARKAN] SW registered:', reg.scope))
                    .catch(err => console.warn('[ARKAN] SW registration failed:', err));
            }
        }
    };

    // Register after load
    window.addEventListener('load', () => arkan.pwa.init());
})();
