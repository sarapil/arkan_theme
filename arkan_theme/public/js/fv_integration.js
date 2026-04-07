// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT
// frappe_visual Integration for ARKAN Theme
// Central bridge: replaces arkan_darkmode, arkan_shortcuts, arkan_mobile,
// arkan_workspace, arkan_forms, arkan_tour, arkan_effects, arkan_cursor,
// arkan_loading, arkan_presets, arkan_desktop, arkan_topbar, arkan_ambient,
// arkan_welcome_msg — all delegated to frappe_visual components.

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    // ── Dark Mode — delegates to frappe.visual.ThemeManager ──
    const STORAGE_KEY = 'arkan-theme-mode';

    arkan.darkmode = {
        currentMode: 'dark',

        init: function() {
            const saved = localStorage.getItem(STORAGE_KEY);
            const defaultDark = arkan.config ? arkan.config.default_dark_mode : 1;
            this.setMode(saved || (defaultDark ? 'dark' : 'dark'));
        },

        setMode: function(mode) {
            document.documentElement.setAttribute('data-theme', mode);
            document.documentElement.setAttribute('data-theme-mode', mode);
            document.body.classList.toggle('arkan-light-mode', mode === 'light');
            document.body.classList.toggle('arkan-dark-mode', mode === 'dark');
            localStorage.setItem(STORAGE_KEY, mode);
            this.currentMode = mode;
            document.dispatchEvent(new CustomEvent('arkan-theme-change', { detail: { mode } }));
        },

        toggle: function() {
            this.setMode(this.currentMode === 'dark' ? 'light' : 'dark');
        },

        isDark: function() {
            return this.currentMode === 'dark';
        }
    };

    // ── Loading overlay (simple, fv-compatible) ──
    arkan.loading = {
        overlay: null,

        show: function(message) {
            if (this.overlay) return;
            this.overlay = document.createElement('div');
            this.overlay.className = 'fv-fx-glass';
            this.overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,15,28,0.85);backdrop-filter:blur(4px);';
            this.overlay.innerHTML =
                '<div style="width:40px;height:40px;border:2px solid var(--arkan-border,#2D3A4F);border-top-color:var(--arkan-cyan,#00F0FF);border-radius:50%;animation:spin 0.8s linear infinite;"></div>' +
                '<div style="color:var(--arkan-text,#E8ECF1);font-family:var(--arkan-font-heading);margin-top:16px;font-size:14px;">' + (message || __('Processing...')) + '</div>' +
                '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
            document.body.appendChild(this.overlay);
        },

        hide: function() {
            if (this.overlay) {
                this.overlay.style.opacity = '0';
                setTimeout(() => { if (this.overlay) { this.overlay.remove(); this.overlay = null; } }, 300);
            }
        }
    };

    // ── Workspace welcome banner ──
    arkan.workspace = {
        init: function() {
            if (typeof frappe !== 'undefined' && frappe.router && typeof frappe.router.on === 'function') {
                frappe.router.on('change', () => this._onRoute());
            }
            this._onRoute();
        },

        _onRoute: function() {
            setTimeout(() => {
                const route = frappe.get_route_str();
                if (route === '' || route.startsWith('Workspaces')) {
                    this._enhance();
                }
            }, 300);
        },

        _enhance: function() {
            const container = document.querySelector('.workspace-container .codex-editor, .desk-page .layout-main');
            if (container && !document.querySelector('.arkan-welcome-banner')) {
                const banner = document.createElement('div');
                banner.className = 'arkan-welcome-banner fv-fx-page-enter';
                const hour = new Date().getHours();
                const greeting = hour < 12 ? __('Good Morning') : hour < 17 ? __('Good Afternoon') : __('Good Evening');
                const user = frappe.session.user_fullname || __('User');
                banner.innerHTML =
                    '<div class="arkan-welcome-title">' + greeting + ', ' + user + '</div>' +
                    '<div class="arkan-welcome-subtitle">// ' + (arkan.config.brand_name || 'ARKAN') + ' — ' + __('AI & Technology Solutions') + '</div>';
                container.parentNode.insertBefore(banner, container);
            }
            // Animate workspace widgets with stagger
            document.querySelectorAll('.widget:not(.arkan-animated)').forEach(function(w, i) {
                w.classList.add('arkan-animated', 'fv-fx-page-enter');
                w.style.animationDelay = (i * 0.05) + 's';
            });
        }
    };

    // ── Forms timeline reveal ──
    arkan.forms = {
        init: function() {
            if (!('IntersectionObserver' in window)) return;
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('fv-fx-page-enter');
                        observer.unobserve(e.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.timeline-item, .form-section').forEach(function(el) { observer.observe(el); });
        }
    };

    $(document).on('form-render', function() { setTimeout(function() { arkan.forms.init(); }, 200); });

    // ── frappe_visual integration on app_ready ──
    $(document).on("app_ready", function() {
        // Initialize dark mode
        arkan.darkmode.init();

        // Initialize workspace enhancer
        arkan.workspace.init();

        // Register app color
        document.documentElement.style.setProperty("--arkan-theme-primary", "#1E40AF");

        // Load frappe_visual lazy — configure auto-enhancers & register shortcuts
        if (typeof frappe !== 'undefined' && frappe.require) {
            frappe.require("frappe_visual.bundle.js", function() {
                if (!frappe.visual) return;

                // Theme sync — bridge ARKAN dark mode to fv ThemeManager
                if (frappe.visual.ThemeManager && frappe.visual.ThemeManager.init) {
                    try { frappe.visual.ThemeManager.init(); } catch(e) {}
                }

                // Configure auto-enhancers
                if (frappe.visual.formEnhancer && frappe.visual.formEnhancer.configure) {
                    try {
                        frappe.visual.formEnhancer.configure({
                            showGraph: true, showStats: true, showQuickLinks: true, animate: true,
                        });
                    } catch(e) {}
                }
                if (frappe.visual.workspaceEnhancer && frappe.visual.workspaceEnhancer.configure) {
                    try {
                        frappe.visual.workspaceEnhancer.configure({
                            glassCards: true, sparklines: true, liveCounts: true,
                        });
                    } catch(e) {}
                }

                // Shortcuts — replaces arkan_shortcuts.js
                if (frappe.visual.shortcutManager) {
                    try {
                        frappe.visual.shortcutManager({
                            shortcuts: [
                                { key: 'mod+shift+d', action: function() { arkan.darkmode.toggle(); }, label: __('Toggle Dark Mode') },
                                { key: 'mod+shift+n', action: function() { if (arkan.neuralGrid) arkan.neuralGrid.toggle(); }, label: __('Toggle Neural Grid') },
                                { key: 'mod+shift+s', action: function() { if (arkan.sounds) arkan.sounds.toggle(); }, label: __('Toggle Sounds') },
                            ]
                        });
                    } catch(e) {
                        // Fallback: register Ctrl+Shift+D manually
                        document.addEventListener('keydown', function(e) {
                            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                                e.preventDefault();
                                arkan.darkmode.toggle();
                            }
                        });
                    }
                }

                // Mobile bottom nav — replaces arkan_mobile.js
                if (frappe.is_mobile && frappe.is_mobile() && frappe.visual.bottomNav) {
                    try {
                        frappe.visual.bottomNav({
                            items: [
                                { icon: 'home', label: __('Home'), route: '/desk' },
                                { icon: 'search', label: __('Search'), action: function() { if (frappe.visual.commandBar) frappe.visual.commandBar.open(); } },
                                { icon: 'plus', label: __('New'), action: function() { frappe.new_doc(); } },
                                { icon: 'bell', label: __('Alerts'), route: '/desk#notifications' },
                                { icon: 'settings', label: __('Settings'), route: '/app/arkan-settings' },
                            ],
                        });
                    } catch(e) {}
                }

                console.log('%c⚡ ARKAN + frappe_visual integration active', 'color:#00F0FF;font-weight:bold;');
            });
        }
    });

    // ── Route-based visual page rendering ──
    $(document).on("page-change", function() {
        if (!frappe.visual || !frappe.visual.generator) return;

        // Visual Settings Page
        if (frappe.get_route_str() === 'arkan-theme-settings') {
            var page = frappe.container.page;
            if (page && page.main && frappe.visual.generator) {
                frappe.visual.generator.settingsPage(
                    page.main[0] || page.main,
                    "ARKAN Settings"
                );
            }
        }

        // Visual Reports Hub
        if (frappe.get_route_str() === 'arkan-theme-reports') {
            var page = frappe.container.page;
            if (page && page.main && frappe.visual.generator) {
                frappe.visual.generator.reportsHub(
                    page.main[0] || page.main,
                    "ARKAN Theme"
                );
            }
        }
    });
})();
