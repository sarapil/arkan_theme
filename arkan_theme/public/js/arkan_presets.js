// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Presets — Color scheme presets
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.presets = {
        schemes: {
            cyber: { primary: '#00F0FF', accent: '#8B5CF6', bg: '#0A0F1C' },
            matrix: { primary: '#00FF41', accent: '#008F11', bg: '#0D0208' },
            sunset: { primary: '#FF6B35', accent: '#F7C59F', bg: '#1A1423' },
        },
        apply: function(name) {
            const s = this.schemes[name];
            if (!s) return;
            document.documentElement.style.setProperty('--arkan-cyan', s.primary);
            document.documentElement.style.setProperty('--arkan-purple', s.accent);
            document.documentElement.style.setProperty('--arkan-bg-deep', s.bg);
        }
    };
})();
