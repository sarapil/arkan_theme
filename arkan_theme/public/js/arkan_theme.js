// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Theme — Main Coordinator (Slim v2.0)
// This file ONLY handles: config defaults, CSS variable injection,
// favicon, and initialization of kept brand-unique modules.
// ALL fv-related features (dark mode, shortcuts, mobile, workspace,
// forms, tour, effects, cursor, loading, desktop, welcome, scene)
// are handled by fv_integration.js.
(function() {
    "use strict";

    window.arkan = window.arkan || {};

    var DEFAULTS = {
        brand_name: "ARKAN",
        primary_color: "#00F0FF",
        secondary_color: "#0A0F1C",
        accent_color: "#8B5CF6",
        text_color: "#E8ECF1",
        version: "16.2.0",
        enable_splash_screen: 1,
        enable_neural_grid: 1,
        enable_matrix_rain: 0,
        enable_cursor_glow: 0,
        enable_sounds: 0,
        default_dark_mode: 1,
        splash_duration: 2800,
        logo_url: "/assets/arkan_theme/images/logo-header.png",
        favicon_url: "/assets/arkan_theme/images/favicon.ico",
    };

    arkan.config = Object.assign({}, DEFAULTS);

    // Safe module initializer — never let one module kill the rest
    arkan._initModule = function(name, fn) {
        try {
            fn();
        } catch (e) {
            console.error('[ARKAN] Module "' + name + '" failed to init:', e);
        }
    };

    arkan.init = function() {
        // Merge boot settings
        if (frappe.boot && frappe.boot.arkan_theme) {
            Object.assign(arkan.config, frappe.boot.arkan_theme);
        }

        // Apply CSS custom properties from config
        var root = document.documentElement;
        root.style.setProperty('--arkan-cyan', arkan.config.primary_color);
        root.style.setProperty('--arkan-bg-deep', arkan.config.secondary_color);
        root.style.setProperty('--arkan-purple', arkan.config.accent_color);

        // Set favicon
        arkan._setFavicon(arkan.config.favicon_url);

        // Fix stale body padding from other themes
        if (!document.querySelector('.navbar')) {
            document.body.style.setProperty('padding-top', '0', 'important');
        }

        // Ensure main-section fills remaining space
        var mainSection = document.querySelector('.main-section');
        if (mainSection) {
            mainSection.style.setProperty('flex', '1 1 0%', 'important');
            mainSection.style.setProperty('min-width', '0');
        }

        // Apply .fv-fx-mouse-glow on body — replaces arkan_cursor.js
        if (arkan.config.enable_cursor_glow) {
            document.body.classList.add('fv-fx-mouse-glow');
        }

        // Initialize kept modules (unique brand features only)
        if (arkan.config.enable_neural_grid && typeof arkan.neuralGrid !== 'undefined') {
            arkan._initModule('neuralGrid', function() { arkan.neuralGrid.init(); });
        }
        if (arkan.config.enable_splash_screen && typeof arkan.splash !== 'undefined') {
            arkan._initModule('splash', function() { arkan.splash.init(); });
        }
        if (arkan.config.enable_matrix_rain && typeof arkan.matrix !== 'undefined') {
            arkan._initModule('matrix', function() { arkan.matrix.init(); });
        }
        if (arkan.config.enable_sounds && typeof arkan.sounds !== 'undefined') {
            arkan._initModule('sounds', function() { arkan.sounds.init(); });
        }
        if (typeof arkan.navbar !== 'undefined') {
            arkan._initModule('navbar', function() { arkan.navbar.init(); });
        }

        // Apply custom CSS from settings (sanitized server-side)
        if (arkan.config.custom_css) {
            var style = document.createElement('style');
            style.textContent = arkan.config.custom_css;
            document.head.appendChild(style);
        }

        console.log('%c⚡ ARKAN Theme v' + arkan.config.version + ' — frappe_visual bridge active',
            'color:#00F0FF;font-weight:bold;font-size:14px;text-shadow:0 0 10px #00F0FF');
    };

    arkan._setFavicon = function(url) {
        if (!url) return;
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = url;
        document.head.appendChild(link);
    };

    // Auto-init on frappe ready
    $(document).on('app_ready', function() {
        if (!arkan._initialized) {
            arkan._initialized = true;
            arkan.init();
        }
    });

    // Fallback if app_ready already fired
    if (typeof frappe !== 'undefined' && frappe.boot) {
        setTimeout(function() {
            if (!arkan._initialized) {
                arkan._initialized = true;
                arkan.init();
            }
        }, 500);
    }
})();
