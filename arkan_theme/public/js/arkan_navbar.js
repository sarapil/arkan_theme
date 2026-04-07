// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Navbar — Sidebar glow & dark mode toggle (slim)
// Topbar creation moved to Frappe native. Dark mode delegated to fv_integration.
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.navbar = {
        init: function() {
            // Web navbar glow line (login, portal pages)
            var navbar = document.querySelector('.navbar');
            if (navbar) {
                this._enhanceWebNavbar(navbar);
            }

            // Desk sidebar glow + dark mode toggle
            this._tryDeskSidebar();
        },

        _tryDeskSidebar: function() {
            var self = this;
            var sidebar = document.querySelector('.body-sidebar');
            if (sidebar) {
                this._enhanceDeskSidebar(sidebar);
                this._addDarkModeToggle();
            } else {
                setTimeout(function() {
                    var s = document.querySelector('.body-sidebar');
                    if (s) {
                        self._enhanceDeskSidebar(s);
                        self._addDarkModeToggle();
                    }
                }, 500);
            }
        },

        _enhanceWebNavbar: function(navbar) {
            if (navbar.querySelector('.arkan-navbar-line')) return;
            var line = document.createElement('div');
            line.className = 'arkan-navbar-line';
            line.style.cssText = 'position:absolute;bottom:0;inset-inline-start:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--arkan-cyan,#00F0FF),transparent);opacity:0.5;';
            navbar.style.position = 'relative';
            navbar.appendChild(line);
        },

        _enhanceDeskSidebar: function(sidebar) {
            if (sidebar.querySelector('.arkan-sidebar-glow')) return;
            var glow = document.createElement('div');
            glow.className = 'arkan-sidebar-glow';
            glow.style.cssText = 'position:absolute;top:0;inset-inline-end:-1px;width:1px;height:100%;background:linear-gradient(180deg,transparent 10%,rgba(0,240,255,0.3) 50%,transparent 90%);pointer-events:none;z-index:1;';
            sidebar.appendChild(glow);
        },

        _addDarkModeToggle: function() {
            if (document.querySelector('.arkan-darkmode-toggle')) return;

            var btn = document.createElement('button');
            btn.className = 'arkan-darkmode-toggle';
            btn.style.cssText = 'background:none;border:none;color:var(--arkan-text-secondary,#94A3B8);cursor:pointer;font-size:16px;padding:6px;margin:0;border-radius:8px;transition:all 150ms ease;display:flex;align-items:center;justify-content:center;';
            btn.innerHTML = arkan.darkmode && arkan.darkmode.isDark() ? '\u2600\uFE0F' : '\uD83C\uDF19';
            btn.title = __('Toggle dark/light mode');
            btn.addEventListener('click', function() {
                if (arkan.darkmode) {
                    arkan.darkmode.toggle();
                    btn.innerHTML = arkan.darkmode.isDark() ? '\u2600\uFE0F' : '\uD83C\uDF19';
                }
            });
            btn.addEventListener('mouseenter', function() { btn.style.background = 'rgba(0,240,255,0.1)'; });
            btn.addEventListener('mouseleave', function() { btn.style.background = 'none'; });

            // Try desk sidebar bottom
            var sidebarBottom = document.querySelector('.body-sidebar .body-sidebar-bottom');
            if (sidebarBottom) {
                var wrapper = document.createElement('div');
                wrapper.style.cssText = 'display:flex;justify-content:center;padding:4px 0;';
                wrapper.appendChild(btn);
                sidebarBottom.insertBefore(wrapper, sidebarBottom.firstChild);
                return;
            }

            // Fallback: web navbar
            var actions = document.querySelector('.navbar-right, .navbar .navbar-collapse');
            if (actions) {
                btn.style.margin = '0 4px';
                actions.prepend(btn);
            }
        }
    };
})();
