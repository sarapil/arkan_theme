// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Animated Favicon — v3.0: per-app favicon awareness
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.animatedFavicon = {
        _baseFavicon: null,

        init: function() {
            var self = this;
            // Store base favicon
            var link = document.querySelector("link[rel*='icon']");
            this._baseFavicon = link ? link.href : null;

            // Pulse on notifications
            if (typeof frappe !== 'undefined' && frappe.realtime) {
                frappe.realtime.on('notification', function() { self.pulse(); });
            }

            // Listen for app-switch to update base favicon reference
            document.addEventListener('arkan:app-switched', function(e) {
                var media = e.detail && e.detail.media;
                if (media && media.favicon) {
                    self._baseFavicon = media.favicon;
                }
            });
        },

        pulse: function() {
            var title = document.title || '';
            if (title.indexOf('⚡ ') !== 0) {
                document.title = '⚡ ' + title;
                setTimeout(function() {
                    document.title = document.title.replace('⚡ ', '');
                }, 3000);
            }
        }
    };
    $(document).on('app_ready', function() { arkan.animatedFavicon.init(); });
})();
