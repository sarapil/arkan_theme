// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Animated Favicon
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.animatedFavicon = {
        init: function() {
            // Pulse favicon on notifications
            if (typeof frappe !== 'undefined') {
                frappe.realtime.on('notification', () => this.pulse());
            }
        },
        pulse: function() {
            const link = document.querySelector("link[rel*='icon']");
            if (link) {
                const original = link.href;
                // Brief visual pulse - in production would swap favicon frames
                document.title = '⚡ ' + document.title;
                setTimeout(() => { document.title = document.title.replace('⚡ ', ''); }, 3000);
            }
        }
    };
    $(document).on('app_ready', () => arkan.animatedFavicon.init());
})();
