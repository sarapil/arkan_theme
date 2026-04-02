// ARKAN Desktop — LCD-style wrapper
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.desktop = {
        init: function() {
            // Add subtle scan lines overlay
            if (document.querySelector('.arkan-scanlines')) return;
            const scanlines = document.createElement('div');
            scanlines.className = 'arkan-scanlines';
            scanlines.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99997;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,240,255,0.01) 2px,rgba(0,240,255,0.01) 4px);';
            document.body.appendChild(scanlines);
        }
    };

    $(document).on('app_ready', () => arkan.desktop.init());
})();
