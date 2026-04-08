// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Theme — Main Coordinator (v3.0)
// Handles: config defaults, CSS variable injection, favicon,
// app router, media switcher, 3D modules, and kept brand-unique modules.
// fv-related features handled by fv_integration.js.
(function() {
    "use strict";

    window.arkan = window.arkan || {};

    var DEFAULTS = {
        brand_name: "ARKAN",
        primary_color: "#00F0FF",
        secondary_color: "#0A0F1C",
        accent_color: "#8B5CF6",
        text_color: "#E8ECF1",
        version: "18.0.0",
        enable_splash_screen: 1,
        enable_neural_grid: 1,
        enable_matrix_rain: 0,
        enable_cursor_glow: 0,
        enable_sounds: 0,
        default_dark_mode: 1,
        splash_duration: 4000,
        logo_url: "/assets/arkan_theme/images/logo-header.png",
        favicon_url: "/assets/arkan_theme/images/favicon.ico",
        // v18 3D defaults
        bg_preset: "Neural 3D",
        bg_parallax_intensity: 100,
        enable_3d_splash: 1,
        splash_style: "Normal",
        enable_page_transitions: 1,
        enable_3d_loading: 1,
        reduce_motion: 0,
        rebranding_mode: "ARKAN Defaults",
        license_tier: "Free",
    };

    arkan.config = Object.assign({}, DEFAULTS);

    // Detect reduced motion preference
    arkan._prefersReducedMotion = function() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
               arkan.config.reduce_motion;
    };

    // Safe module initializer — never let one module kill the rest
    arkan._initModule = function(name, fn) {
        try {
            fn();
        } catch (e) {
            console.error('[ARKAN] Module "' + name + '" failed to init:', e);
        }
    };

    arkan.init = function() {
        // 1. Merge boot settings
        if (frappe.boot && frappe.boot.arkan_theme) {
            Object.assign(arkan.config, frappe.boot.arkan_theme);
        }

        // 2. Respect reduced motion
        if (arkan._prefersReducedMotion()) {
            arkan.config.enable_3d_splash = 0;
            arkan.config.bg_parallax_intensity = 0;
            arkan.config.enable_page_transitions = 0;
            arkan.config.enable_3d_loading = 0;
        }

        // 3. Apply CSS custom properties from config
        var root = document.documentElement;
        root.style.setProperty('--arkan-cyan', arkan.config.primary_color);
        root.style.setProperty('--arkan-bg-deep', arkan.config.secondary_color);
        root.style.setProperty('--arkan-purple', arkan.config.accent_color);
        root.style.setProperty('--arkan-app-primary', arkan.config.primary_color);
        root.style.setProperty('--arkan-app-accent', arkan.config.accent_color);

        // 4. Set tier class on body for CSS gating
        var tier = (arkan.config.license_tier || "Free").toLowerCase();
        document.body.classList.add('arkan-tier-' + tier);

        // 5. Set favicon
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

        // Apply .fv-fx-mouse-glow on body
        if (arkan.config.enable_cursor_glow) {
            document.body.classList.add('fv-fx-mouse-glow');
        }

        // 6. Initialize App Router + Media Switcher (v18)
        if (typeof arkan.mediaSwitcher !== 'undefined') {
            arkan._initModule('mediaSwitcher', function() { arkan.mediaSwitcher.init(); });
        }
        if (typeof arkan.appRouter !== 'undefined') {
            arkan._initModule('appRouter', function() { arkan.appRouter.init(); });
        }

        // 7. Initialize 3D modules (v18)
        if (arkan.config.enable_3d_splash && typeof arkan.splash3d !== 'undefined') {
            arkan._initModule('splash3d', function() { arkan.splash3d.init(); });
        } else if (arkan.config.enable_splash_screen && typeof arkan.splash !== 'undefined') {
            // Fallback to 2D splash
            arkan._initModule('splash', function() { arkan.splash.init(); });
        }

        if (arkan.config.bg_preset !== 'None' && typeof arkan.bg3d !== 'undefined') {
            arkan._initModule('bg3d', function() { arkan.bg3d.init(); });
        } else {
            // Fallback to classic neural grid + matrix
            if (arkan.config.enable_neural_grid && typeof arkan.neuralGrid !== 'undefined') {
                arkan._initModule('neuralGrid', function() { arkan.neuralGrid.init(); });
            }
            if (arkan.config.enable_matrix_rain && typeof arkan.matrix !== 'undefined') {
                arkan._initModule('matrix', function() { arkan.matrix.init(); });
            }
        }

        if (arkan.config.enable_page_transitions && typeof arkan.loading3d !== 'undefined') {
            arkan._initModule('loading3d', function() { arkan.loading3d.init(); });
        }

        // 8. Initialize kept modules
        if (arkan.config.enable_sounds && typeof arkan.sounds !== 'undefined') {
            arkan._initModule('sounds', function() { arkan.sounds.init(); });
        }
        if (typeof arkan.navbar !== 'undefined') {
            arkan._initModule('navbar', function() { arkan.navbar.init(); });
        }

        // 9. Apply custom CSS from settings
        if (arkan.config.custom_css) {
            var style = document.createElement('style');
            style.textContent = arkan.config.custom_css;
            document.head.appendChild(style);
        }

        // 10. Add watermark for free tier
        if (tier === 'free') {
            arkan._addWatermark();
        }

        console.log('%c⚡ ARKAN Theme v' + arkan.config.version + ' — 3D Engine active',
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

    arkan._addWatermark = function() {
        if (document.querySelector('.arkan-watermark')) return;
        var wm = document.createElement('div');
        wm.className = 'arkan-watermark';
        document.body.appendChild(wm);
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
