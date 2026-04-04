// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Keyboard Shortcuts
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.shortcuts = {
        init: function() {
            document.addEventListener('keydown', (e) => {
                // Ctrl+Shift+D = toggle dark mode
                if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                    e.preventDefault();
                    if (arkan.darkmode) arkan.darkmode.toggle();
                }
            });
        }
    };
    $(document).on('app_ready', () => arkan.shortcuts.init());
})();
