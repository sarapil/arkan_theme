// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Dark Mode — Dark-first (default is ALWAYS dark)
// ARKAN is a dark-first theme. We override Frappe's desk_theme to ensure
// consistent dark styling. Users can manually toggle to light via the UI.
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    const STORAGE_KEY = 'arkan-theme-mode';

    arkan.darkmode = {
        init: function() {
            const saved = localStorage.getItem(STORAGE_KEY);
            const defaultDark = arkan.config ? arkan.config.default_dark_mode : 1;

            if (saved) {
                // User explicitly chose a mode — respect it
                this.setMode(saved);
            } else if (defaultDark) {
                // ARKAN default: force dark mode regardless of Frappe's desk_theme
                this.setMode('dark');
            } else {
                this.setMode('dark');
            }
        },

        setMode: function(mode) {
            // Set both data-theme and data-theme-mode so Frappe's theme
            // system stays in sync with our choice
            document.documentElement.setAttribute('data-theme', mode);
            document.documentElement.setAttribute('data-theme-mode', mode);
            document.body.classList.toggle('arkan-light-mode', mode === 'light');
            document.body.classList.toggle('arkan-dark-mode', mode === 'dark');
            localStorage.setItem(STORAGE_KEY, mode);
            this.currentMode = mode;

            // Dispatch event for other modules
            document.dispatchEvent(new CustomEvent('arkan-theme-change', { detail: { mode } }));
        },

        toggle: function() {
            this.setMode(this.currentMode === 'dark' ? 'light' : 'dark');
        },

        isDark: function() {
            return this.currentMode === 'dark';
        }
    };
})();
