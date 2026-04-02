// ARKAN Theme — Main Coordinator
// AI & Technology Solutions — Futuristic Cyber-Tech
(function() {
    "use strict";

    window.arkan = window.arkan || {};

    const DEFAULTS = {
        brand_name: "ARKAN",
        primary_color: "#00F0FF",
        secondary_color: "#0A0F1C",
        accent_color: "#8B5CF6",
        text_color: "#E8ECF1",
        enable_splash_screen: 1,
        enable_neural_grid: 1,
        enable_matrix_rain: 0,
        enable_particles: 1,
        enable_glitch_effects: 1,
        enable_cursor_effects: 1,
        enable_sounds: 0,
        enable_search_overlay: 1,
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
        console.log('[ARKAN] init() starting…');

        // Merge boot settings
        if (frappe.boot && frappe.boot.arkan_theme) {
            Object.assign(arkan.config, frappe.boot.arkan_theme);
        }

        // Apply CSS custom properties from config
        const root = document.documentElement;
        root.style.setProperty('--arkan-cyan', arkan.config.primary_color);
        root.style.setProperty('--arkan-bg-deep', arkan.config.secondary_color);
        root.style.setProperty('--arkan-purple', arkan.config.accent_color);

        // Set favicon
        arkan._setFavicon(arkan.config.favicon_url);

        // Fix: remove stale body padding from other themes (arrowz_theme adds
        // padding-top for a .navbar that does not exist on desk)
        if (!document.querySelector('.navbar')) {
            document.body.style.setProperty('padding-top', '0', 'important');
        }

        // Ensure main-section fills remaining space in body flex-row
        const mainSection = document.querySelector('.main-section');
        if (mainSection) {
            mainSection.style.setProperty('flex', '1 1 0%', 'important');
            mainSection.style.setProperty('min-width', '0');
        }

        // Initialize dark mode FIRST (dark is default)
        if (typeof arkan.darkmode !== 'undefined') {
            arkan._initModule('darkmode', () => arkan.darkmode.init());
        }

        // Initialize topbar early so user sees branded bar immediately
        if (typeof arkan.topbar !== 'undefined') {
            arkan._initModule('topbar', () => arkan.topbar.init());
        }

        // Initialize modules — each wrapped so one failure cannot kill the rest
        if (arkan.config.enable_neural_grid && typeof arkan.neuralGrid !== 'undefined') {
            arkan._initModule('neuralGrid', () => arkan.neuralGrid.init());
        }
        if (arkan.config.enable_splash_screen && typeof arkan.splash !== 'undefined') {
            arkan._initModule('splash', () => arkan.splash.init());
        }
        if (arkan.config.enable_particles && typeof arkan.effects !== 'undefined') {
            arkan._initModule('effects', () => arkan.effects.init());
        }
        if (arkan.config.enable_cursor_effects && typeof arkan.cursor !== 'undefined') {
            arkan._initModule('cursor', () => arkan.cursor.init());
        }
        if (arkan.config.enable_matrix_rain && typeof arkan.matrix !== 'undefined') {
            arkan._initModule('matrix', () => arkan.matrix.init());
        }
        if (arkan.config.enable_sounds && typeof arkan.sounds !== 'undefined') {
            arkan._initModule('sounds', () => arkan.sounds.init());
        }
        if (typeof arkan.workspace !== 'undefined') {
            arkan._initModule('workspace', () => arkan.workspace.init());
        }
        if (typeof arkan.navbar !== 'undefined') {
            arkan._initModule('navbar', () => arkan.navbar.init());
        }

        // Apply custom CSS/JS from settings
        if (arkan.config.custom_css) {
            const style = document.createElement('style');
            style.textContent = arkan.config.custom_css;
            document.head.appendChild(style);
        }
        if (arkan.config.custom_js) {
            try { new Function(arkan.config.custom_js)(); } catch(e) { console.warn('[ARKAN] Custom JS error:', e); }
        }

        console.log('%c⚡ ARKAN Theme v' + (arkan.config.version || '16.0.0') + ' initialized',
            'color:#00F0FF;font-weight:bold;font-size:14px;text-shadow:0 0 10px #00F0FF');
    };

    arkan._setFavicon = function(url) {
        if (!url) return;
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
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
    if (frappe.boot) {
        setTimeout(() => {
            if (!arkan._initialized) {
                arkan._initialized = true;
                arkan.init();
            }
        }, 500);
    }
})();
