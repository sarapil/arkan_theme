// ARKAN Navbar — Search overlay, notification badges, brand topbar
// Frappe v16: desk uses sidebar (.body-sidebar) not .navbar.
// .navbar only exists on web/portal pages (login, website).
// This script handles both scenarios.
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.navbar = {
        init: function() {
            // Try web navbar first (login, portal pages)
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                this._enhanceWebNavbar(navbar);
            }

            // Try desk sidebar (app pages) — may need retry
            this._tryDeskSidebar();
            this.addDarkModeToggle();
        },

        _tryDeskSidebar: function() {
            const sidebar = document.querySelector('.body-sidebar');
            if (sidebar) {
                this._enhanceDeskSidebar(sidebar);
                console.log('[ARKAN] navbar: desk sidebar enhanced');
            } else {
                // Sidebar not in DOM yet — retry
                setTimeout(() => {
                    const s = document.querySelector('.body-sidebar');
                    if (s) this._enhanceDeskSidebar(s);
                }, 500);
                setTimeout(() => {
                    const s = document.querySelector('.body-sidebar');
                    if (s) this._enhanceDeskSidebar(s);
                }, 1500);
            }
        },

        // ── Web-page navbar (login, portal) ──
        _enhanceWebNavbar: function(navbar) {
            if (navbar.querySelector('.arkan-navbar-line')) return;
            const line = document.createElement('div');
            line.className = 'arkan-navbar-line';
            line.style.cssText = 'position:absolute;bottom:0;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,#00F0FF,transparent);opacity:0.5;';
            navbar.style.position = 'relative';
            navbar.appendChild(line);
        },

        // ── Desk sidebar ──
        _enhanceDeskSidebar: function(sidebar) {
            if (sidebar.querySelector('.arkan-sidebar-glow')) return;
            // Add a subtle glow line on the right edge of the sidebar
            // NOTE: Do NOT set sidebar.style.position here — inline styles
            // override Frappe's .expanded .body-sidebar { position: absolute }
            // and break the collapse/expand mechanism. position: relative is
            // applied via CSS in arkan.css instead (lower specificity).
            const glow = document.createElement('div');
            glow.className = 'arkan-sidebar-glow';
            glow.style.cssText = 'position:absolute;top:0;right:-1px;width:1px;height:100%;background:linear-gradient(180deg,transparent 10%,rgba(0,240,255,0.3) 50%,transparent 90%);pointer-events:none;z-index:1;';
            sidebar.appendChild(glow);
        },

        addDarkModeToggle: function() {
            if (document.querySelector('.arkan-darkmode-toggle')) return;

            const btn = document.createElement('button');
            btn.className = 'arkan-darkmode-toggle';
            btn.style.cssText = 'background:none;border:none;color:var(--arkan-text-secondary,#94A3B8);cursor:pointer;font-size:16px;padding:6px;margin:0;border-radius:8px;transition:all 150ms ease;display:flex;align-items:center;justify-content:center;';
            btn.innerHTML = arkan.darkmode && arkan.darkmode.isDark() ? '☀️' : '🌙';
            btn.title = 'Toggle dark/light mode';
            btn.addEventListener('click', () => {
                if (arkan.darkmode) {
                    arkan.darkmode.toggle();
                    btn.innerHTML = arkan.darkmode.isDark() ? '☀️' : '🌙';
                }
            });
            btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(0,240,255,0.1)'; });
            btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });

            // Try desk sidebar bottom first
            const sidebarBottom = document.querySelector('.body-sidebar .body-sidebar-bottom');
            if (sidebarBottom) {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display:flex;justify-content:center;padding:4px 0;';
                wrapper.appendChild(btn);
                sidebarBottom.insertBefore(wrapper, sidebarBottom.firstChild);
                return;
            }

            // Fallback: web navbar
            const actions = document.querySelector('.navbar-right, .navbar .navbar-collapse');
            if (actions) {
                btn.style.margin = '0 4px';
                actions.prepend(btn);
            }
        }
    };
})();
