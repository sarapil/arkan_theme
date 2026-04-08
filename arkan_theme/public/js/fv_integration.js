// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT
// frappe_visual Integration for ARKAN Theme — Central Bridge v2.0
// ═══════════════════════════════════════════════════════════════════
// This is the SINGLE integration layer that replaces 14+ standalone
// modules by delegating to frappe_visual components:
//   arkan_darkmode   → frappe.visual.ThemeManager
//   arkan_shortcuts  → frappe.visual.shortcutManager + commandBar
//   arkan_mobile     → frappe.visual.bottomNav
//   arkan_workspace  → frappe.visual.workspaceEnhancer (auto)
//   arkan_forms      → frappe.visual.formEnhancer (auto)
//   arkan_tour       → frappe.visual.onboardingTour
//   arkan_effects    → .fv-fx-* CSS classes
//   arkan_cursor     → .fv-fx-mouse-glow
//   arkan_loading    → fv loading states
//   arkan_presets    → frappe.visual.ThemeManager
//   arkan_desktop    → frappe.visual.workspaceEnhancer (auto)
//   arkan_topbar     → merged into navbar brand-only
//   arkan_ambient    → .fv-fx-morph-blob + .fv-fx-dot-pattern
//   arkan_welcome_msg→ scene engine workspace header
// ═══════════════════════════════════════════════════════════════════

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    // ══════════════════════════════════════════════════════════════
    // DARK MODE — syncs ARKAN theme with frappe.visual.ThemeManager
    // ══════════════════════════════════════════════════════════════
    const STORAGE_KEY = 'arkan-theme-mode';

    arkan.darkmode = {
        currentMode: 'dark',

        init: function() {
            const saved = localStorage.getItem(STORAGE_KEY);
            const defaultDark = arkan.config ? arkan.config.default_dark_mode : 1;
            this.setMode(saved || (defaultDark ? 'dark' : 'light'));
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

    // ══════════════════════════════════════════════════════════════
    // LOADING OVERLAY — simple, fv-compatible
    // ══════════════════════════════════════════════════════════════
    arkan.loading = {
        overlay: null,

        show: function(message) {
            if (this.overlay) return;
            this.overlay = document.createElement('div');
            this.overlay.className = 'fv-fx-glass';
            this.overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,15,28,0.85);backdrop-filter:blur(4px);';
            this.overlay.innerHTML =
                '<div style="width:40px;height:40px;border:2px solid var(--arkan-border,#2D3A4F);border-top-color:var(--arkan-cyan,#00F0FF);border-radius:50%;animation:arkan-spin 0.8s linear infinite;"></div>' +
                '<div style="color:var(--arkan-text,#E8ECF1);font-family:var(--arkan-font-heading);margin-top:16px;font-size:14px;">' + (message || __('Processing...')) + '</div>' +
                '<style>@keyframes arkan-spin{to{transform:rotate(360deg)}}</style>';
            document.body.appendChild(this.overlay);
        },

        hide: function() {
            if (this.overlay) {
                this.overlay.style.opacity = '0';
                setTimeout(() => { if (this.overlay) { this.overlay.remove(); this.overlay = null; } }, 300);
            }
        }
    };

    // ══════════════════════════════════════════════════════════════
    // WORKSPACE — welcome banner + widget animation
    // ══════════════════════════════════════════════════════════════
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
                banner.className = 'arkan-welcome-banner fv-fx-page-enter fv-fx-glass';
                const hour = new Date().getHours();
                const greeting = hour < 12 ? __('Good Morning') : hour < 17 ? __('Good Afternoon') : __('Good Evening');
                const user = frappe.session.user_fullname || __('User');
                banner.innerHTML =
                    '<div class="arkan-welcome-title fv-fx-gradient-text">' + greeting + ', ' + user + '</div>' +
                    '<div class="arkan-welcome-subtitle">// ' + (arkan.config.brand_name || 'ARKAN') + ' — ' + __('AI & Technology Solutions') + '</div>';
                container.parentNode.insertBefore(banner, container);
            }
            // Animate workspace widgets with stagger
            document.querySelectorAll('.widget:not(.arkan-animated)').forEach(function(w, i) {
                w.classList.add('arkan-animated', 'fv-fx-page-enter', 'fv-fx-hover-lift');
                w.style.animationDelay = (i * 0.05) + 's';
            });
        }
    };

    // ══════════════════════════════════════════════════════════════
    // FORMS — timeline + section reveal via IntersectionObserver
    // ══════════════════════════════════════════════════════════════
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

    // ══════════════════════════════════════════════════════════════
    // SCENE ENGINE — workspace dashboard header
    // ══════════════════════════════════════════════════════════════
    arkan.scene = {
        _rendered: false,

        renderWorkspaceScene: function(container) {
            if (this._rendered || !container || !frappe.visual) return;
            this._rendered = true;

            // Use scenePresetOffice for the ARKAN settings workspace
            if (frappe.visual.scenePresetOffice) {
                frappe.visual.scenePresetOffice({
                    container: container,
                    theme: arkan.darkmode.isDark() ? 'dark' : 'cool',
                    frames: [
                        { label: __('Theme'), value: 'ARKAN', status: 'success' },
                        { label: __('Dark Mode'), value: arkan.darkmode.isDark() ? __('ON') : __('OFF'), status: 'info' },
                        { label: __('Version'), value: arkan.config.version || '16.2.0', status: 'info' },
                    ],
                    documents: [
                        { label: __('Settings'), count: 1, href: '/app/arkan-settings', color: '#00F0FF' },
                    ],
                    books: [
                        { label: __('Help'), href: '/app/arkan-theme-about', color: '#8B5CF6' },
                    ],
                }).catch(function() {});
            }
        }
    };

    // ══════════════════════════════════════════════════════════════
    // FRAPPE_VISUAL INTEGRATION — app_ready event
    // ══════════════════════════════════════════════════════════════
    $(document).on("app_ready", function() {
        // Initialize dark mode
        arkan.darkmode.init();

        // Initialize workspace enhancer
        arkan.workspace.init();

        // Register app color
        document.documentElement.style.setProperty("--arkan-theme-primary", "#1E40AF");

        // Load frappe_visual lazy — configure auto-enhancers, register shortcuts,
        // setup command bar, mobile nav, and theme sync
        if (typeof frappe !== 'undefined' && frappe.require) {
            frappe.require("frappe_visual.bundle.js", function() {
                if (!frappe.visual) return;

                // ── ThemeManager sync ──
                if (frappe.visual.ThemeManager) {
                    try {
                        if (frappe.visual.ThemeManager.init) frappe.visual.ThemeManager.init();
                        if (frappe.visual.ThemeManager.on) {
                            frappe.visual.ThemeManager.on('change', function(theme) {
                                arkan.darkmode.setMode(theme === 'dark' ? 'dark' : 'light');
                            });
                        }
                    } catch(e) {}
                }

                // ── Auto-Enhancer Configuration ──
                // formEnhancer, listEnhancer, workspaceEnhancer are already active
                // We just configure their options + let CSS handle the look
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

                // ── Shortcuts — replaces arkan_shortcuts.js ──
                if (frappe.visual.shortcutManager) {
                    try {
                        frappe.visual.shortcutManager({
                            shortcuts: [
                                { key: 'mod+shift+d', action: function() { arkan.darkmode.toggle(); }, label: __('Toggle Dark Mode') },
                                { key: 'mod+shift+n', action: function() { if (arkan.neuralGrid) arkan.neuralGrid.toggle ? arkan.neuralGrid.toggle() : null; }, label: __('Toggle Neural Grid') },
                                { key: 'mod+shift+s', action: function() { if (arkan.sounds && arkan.sounds.toggle) arkan.sounds.toggle(); }, label: __('Toggle Sounds') },
                                { key: 'mod+k', action: function() { if (frappe.visual.commandBar) frappe.visual.commandBar.open(); }, label: __('Command Palette') },
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

                // ── Command Bar — replaces arkan_shortcuts.js search overlay ──
                if (frappe.visual.commandBar) {
                    try {
                        frappe.visual.commandBar({
                            theme: { bg: 'var(--arkan-bg-panel)', accent: 'var(--arkan-cyan)' },
                        });
                    } catch(e) {}
                }

                // ── Mobile Bottom Nav — replaces arkan_mobile.js ──
                var isMobile = window.innerWidth <= 768 || (frappe.is_mobile && frappe.is_mobile());
                if (isMobile && frappe.visual.bottomNav) {
                    try {
                        frappe.visual.bottomNav({
                            items: [
                                { icon: 'home', label: __('Home'), route: '/desk' },
                                { icon: 'search', label: __('Search'), action: function() { if (frappe.visual.commandBar) frappe.visual.commandBar.open(); } },
                                { icon: 'plus', label: __('New'), action: function() { frappe.new_doc(); } },
                                { icon: 'bell', label: __('Alerts'), route: '/desk#notifications' },
                                { icon: 'settings', label: __('Settings'), route: '/app/arkan-settings' },
                            ],
                            theme: { activeColor: 'var(--arkan-cyan)' },
                        });
                    } catch(e) {}
                }

                console.log('%c⚡ ARKAN + frappe_visual v2.0 bridge active', 'color:#00F0FF;font-weight:bold;');
            });
        }
    });

    // ══════════════════════════════════════════════════════════════
    // ROUTE-BASED VISUAL PAGE RENDERING
    // ══════════════════════════════════════════════════════════════
    $(document).on("page-change", function() {
        var route = frappe.get_route_str();

        // ── About Page — /arkan-theme-about ──
        if (route === 'arkan-theme-about' || route === 'عن-arkan-theme') {
            _renderAboutPage();
        }

        // ── Onboarding — /arkan-theme-onboarding ──
        if (route === 'arkan-theme-onboarding') {
            _renderOnboarding();
        }

        // ── Visual Settings Page ──
        if (route === 'arkan-theme-settings') {
            var page = frappe.container.page;
            if (page && page.main && frappe.visual && frappe.visual.generator) {
                frappe.visual.generator.settingsPage(
                    page.main[0] || page.main,
                    "ARKAN Settings"
                );
            }
        }

        // ── Visual Reports Hub ──
        if (route === 'arkan-theme-reports') {
            var page = frappe.container.page;
            if (page && page.main && frappe.visual && frappe.visual.generator) {
                frappe.visual.generator.reportsHub(
                    page.main[0] || page.main,
                    "ARKAN Theme"
                );
            }
        }

        // ── ARKAN Settings Workspace — inject scene header ──
        if (route.startsWith('Workspaces/arkan') || route === 'Workspaces/ARKAN Theme') {
            setTimeout(function() {
                var header = document.querySelector('.workspace-container .codex-editor');
                if (header) {
                    var sceneContainer = document.createElement('div');
                    sceneContainer.id = 'arkan-workspace-scene';
                    sceneContainer.className = 'fv-fx-page-enter';
                    sceneContainer.style.cssText = 'margin-block-end:24px;min-height:180px;';
                    header.parentNode.insertBefore(sceneContainer, header);
                    frappe.require("frappe_visual.bundle.js", function() {
                        arkan.scene.renderWorkspaceScene(sceneContainer);
                    });
                }
            }, 400);
        }
    });

    // ══════════════════════════════════════════════════════════════
    // ABOUT PAGE RENDERER — uses frappe.visual.generator.aboutPage
    // ══════════════════════════════════════════════════════════════
    function _renderAboutPage() {
        frappe.require("frappe_visual.bundle.js", function() {
            if (!frappe.visual || !frappe.visual.generator) return;

            var page = frappe.container.page;
            if (!page || !page.main) return;
            var container = page.main[0] || page.main;

            // Use the frappe_visual aboutPage generator
            if (frappe.visual.generator.aboutPage) {
                frappe.visual.generator.aboutPage(container, 'arkan_theme');
            } else {
                // Fallback: render custom about page with fv components
                _renderAboutFallback(container);
            }
        });
    }

    function _renderAboutFallback(container) {
        container.innerHTML = '';
        var wrapper = document.createElement('div');
        wrapper.className = 'fv-about-page fv-fx-page-enter';
        wrapper.innerHTML =
            '<div style="max-width:900px;margin:0 auto;padding:40px 20px;">' +
            '  <h1 class="fv-fx-gradient-text" style="font-family:var(--arkan-font-heading);font-size:48px;margin-bottom:8px;">&lt; ARKAN /&gt;</h1>' +
            '  <p style="color:var(--arkan-text-secondary);font-size:18px;margin-bottom:40px;">' + __('AI & Technology Solutions — Modern Theme for Frappe') + '</p>' +
            '  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;">' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-cyan);margin-bottom:8px;">🌙 ' + __('Dark Mode') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Cyber-tech dark-first aesthetic with full light mode support') + '</p>' +
            '    </div>' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-purple);margin-bottom:8px;">🎨 ' + __('Visual Integration') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Full frappe_visual integration — 307+ components themed') + '</p>' +
            '    </div>' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-green);margin-bottom:8px;">🌐 ' + __('RTL Ready') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Full Arabic + English support with CSS Logical Properties') + '</p>' +
            '    </div>' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-amber);margin-bottom:8px;">⚡ ' + __('Neural Grid') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Animated neural network background — unique brand identity') + '</p>' +
            '    </div>' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-cyan);margin-bottom:8px;">🎯 ' + __('Scene Engine') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Immersive SVG workspace headers with live data binding') + '</p>' +
            '    </div>' +
            '    <div class="fv-fx-glass fv-fx-hover-lift" style="padding:24px;border-radius:16px;">' +
            '      <h3 style="color:var(--arkan-rose);margin-bottom:8px;">📱 ' + __('Mobile First') + '</h3>' +
            '      <p style="color:var(--arkan-text-secondary);">' + __('Responsive from 320px to 4K with bottom navigation') + '</p>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        container.appendChild(wrapper);
    }

    // ══════════════════════════════════════════════════════════════
    // ONBOARDING — uses frappe.visual.storyboard inside floatingWindow
    // ══════════════════════════════════════════════════════════════
    function _renderOnboarding() {
        frappe.require("frappe_visual.bundle.js", function() {
            if (!frappe.visual) return;

            var steps = [
                { title: "Welcome to ARKAN", content: '<p class="fv-fx-gradient-text" style="font-size:24px;">&lt; ARKAN /&gt;</p><p>' + __('A futuristic cyber-tech theme for Frappe ERP') + '</p>' },
                { title: __('Dark Mode'), content: '<p>' + __('Toggle with Ctrl+Shift+D or the sidebar button. Your preference is saved.') + '</p>' },
                { title: __('Neural Grid'), content: '<p>' + __('The animated neural network background is our brand signature. Toggle with Ctrl+Shift+N.') + '</p>' },
                { title: __('Theme Colors'), content: '<p>' + __('Cyan (#00F0FF) + Purple (#8B5CF6) — the ARKAN DNA. Customizable in Settings.') + '</p>' },
                { title: __('frappe_visual'), content: '<p>' + __('All 307+ visual components are themed to match ARKAN automatically.') + '</p>' },
                { title: __('Scene Engine'), content: '<p>' + __('Workspace dashboards use immersive SVG rooms with live KPI data.') + '</p>' },
                { title: __('Auto-Enhancers'), content: '<p>' + __('Forms, lists, and workspaces are automatically enhanced. No config needed.') + '</p>' },
                { title: __('Command Palette'), content: '<p>' + __('Press Ctrl+K to open the command bar — search anything instantly.') + '</p>' },
                { title: __('Icons'), content: '<p>' + __('5000+ Tabler Icons via frappe.visual.icons — all themed to ARKAN colors.') + '</p>' },
                { title: __('RTL Support'), content: '<p>' + __('Full Arabic/RTL support using CSS Logical Properties throughout.') + '</p>' },
                { title: __('Mobile Navigation'), content: '<p>' + __('Bottom navigation bar on mobile devices for quick access to key features.') + '</p>' },
                { title: __('Sounds'), content: '<p>' + __('Optional cyber notification tones via Web Audio API. Enable in Settings.') + '</p>' },
                { title: __('Print Headers'), content: '<p>' + __('Branded print headers with ARKAN logo and gradient accents.') + '</p>' },
                { title: __('Get Started'), content: '<p>' + __('Visit Settings to customize your ARKAN experience. Happy theming!') + '</p>' },
            ];

            // Try fv floatingWindow + storyboard
            if (frappe.visual.FloatingWindow && frappe.visual.storyboard) {
                var win = new frappe.visual.FloatingWindow({
                    title: __('ARKAN Theme Setup'),
                    position: 'right',
                    width: '450px',
                });
                frappe.visual.storyboard(win.body, { steps: steps });
            } else if (frappe.visual.generator && frappe.visual.generator.onboardingWizard) {
                var page = frappe.container.page;
                if (page && page.main) {
                    frappe.visual.generator.onboardingWizard(page.main[0] || page.main, 'arkan_theme', steps);
                }
            }
        });
    }
})();
