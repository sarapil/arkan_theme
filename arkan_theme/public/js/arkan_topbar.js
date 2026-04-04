// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Topbar — Branded navigation bar
// In Frappe v16 desk, there is no .navbar — the desk uses a sidebar + .page-head.
// This script creates a visible ARKAN-branded topbar at the top of .main-section
// containing brand, the Frappe desktop search module (AwesomeBar), and comm icons.
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    var TOPBAR_HEIGHT = 40; // px
    function _t(s) { return typeof __ === 'function' ? __(s) : s; }

    // Communication channels kept in topbar (messages + chat only)
    var COMM_CHANNELS = [
        {
            id: 'messages',
            title: 'Messages',
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
            route: 'List/Communication'
        },
        {
            id: 'chat',
            title: 'Chat',
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
            action: function() {
                if (window.arrowz && arrowz.omni_panel && arrowz.omni_panel.toggle_panel) {
                    arrowz.omni_panel.toggle_panel();
                } else if (typeof frappe !== 'undefined') {
                    frappe.set_route('List/AZ Conversation Session');
                }
            }
        }
    ];

    arkan.topbar = {
        _awesomebarReady: false,

        init: function() {
            if (document.querySelector('.arkan-topbar')) return;
            this._createTopbar();
            this._brandSidebar();
            // Retry if main-section not ready
            if (!document.querySelector('.main-section .arkan-topbar')) {
                setTimeout(function() { arkan.topbar._createTopbar(); }, 500);
                setTimeout(function() { arkan.topbar._createTopbar(); }, 1500);
            }
            if (!document.querySelector('.body-sidebar')) {
                setTimeout(function() { arkan.topbar._brandSidebar(); }, 500);
                setTimeout(function() { arkan.topbar._brandSidebar(); }, 1500);
            }
        },

        _createTopbar: function() {
            var mainSection = document.querySelector('.main-section');
            if (!mainSection || mainSection.querySelector('.arkan-topbar')) return;

            var bar = document.createElement('div');
            bar.className = 'arkan-topbar';

            // ── Left: ARKAN brand ──
            var left = document.createElement('div');
            left.className = 'arkan-topbar-left';

            var logo = document.createElement('div');
            logo.className = 'arkan-topbar-brand';
            logo.innerHTML = '<img src="' + (arkan.config.logo_url || '/assets/arkan_theme/images/logo-header.png') + '" alt="ARKAN" class="arkan-topbar-logo">' +
                '<span class="arkan-topbar-brand-text">ARKAN</span>';
            logo.addEventListener('click', function() {
                if (typeof frappe !== 'undefined') frappe.set_route('/');
            });
            left.appendChild(logo);
            bar.appendChild(left);

            // ── Center: Frappe desktop search module + comm icons ──
            var center = document.createElement('div');
            center.className = 'arkan-topbar-center';

            // Replicate the exact Frappe desktop search wrapper structure
            var searchWrapper = document.createElement('div');
            searchWrapper.className = 'desktop-search-wrapper input-group search-bar arkan-search-bar';

            var searchBtn = document.createElement('button');
            searchBtn.id = 'arkan-topbar-search';
            searchBtn.className = 'btn-reset flex justify-between desktop-navbar-modal-search';
            searchBtn.title = _t('Search');

            var searchIconSpan = document.createElement('span');
            searchIconSpan.className = 'desktop-search-icon';
            searchIconSpan.innerHTML = '<svg class="icon icon-sm"><use href="#icon-search"></use></svg> ' + _t('Search');
            searchBtn.appendChild(searchIconSpan);

            var kbdSpan = document.createElement('span');
            kbdSpan.className = 'desktop-keyboard-shortcut';
            if (!frappe.is_mobile()) {
                kbdSpan.textContent = frappe.utils.is_mac() ? '\u2318K' : 'Ctrl+K';
            }
            searchBtn.appendChild(kbdSpan);

            searchWrapper.appendChild(searchBtn);
            center.appendChild(searchWrapper);

            // ── Communication channel icons ──
            var commGroup = document.createElement('div');
            commGroup.className = 'arkan-topbar-comm-group';

            for (var i = 0; i < COMM_CHANNELS.length; i++) {
                var ch = COMM_CHANNELS[i];
                var btn = document.createElement('button');
                btn.className = 'arkan-topbar-comm-btn';
                btn.setAttribute('data-channel', ch.id);
                btn.title = _t(ch.title);
                btn.innerHTML = ch.icon;
                (function(channel) {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (channel.action) {
                            channel.action();
                        } else if (channel.route && typeof frappe !== 'undefined') {
                            frappe.set_route(channel.route);
                        }
                    });
                })(ch);
                commGroup.appendChild(btn);
            }

            center.appendChild(commGroup);
            bar.appendChild(center);

            // Insert topbar and hide the empty <header> gap
            mainSection.insertBefore(bar, mainSection.firstChild);
            var header = mainSection.querySelector(':scope > header');
            if (header) header.style.display = 'none';

            console.log('[ARKAN] topbar created (' + TOPBAR_HEIGHT + 'px)');
            document.documentElement.style.setProperty('--arkan-topbar-height', TOPBAR_HEIGHT + 'px');

            // Initialize AwesomeBar on the search button
            this._initAwesomeBar();
        },

        // ── AwesomeBar — hook Frappe search to our topbar button ──
        _initAwesomeBar: function() {
            if (this._awesomebarReady) return;
            var self = this;
            var selector = '.arkan-search-bar #arkan-topbar-search';

            function doSetup() {
                if (self._awesomebarReady) return;
                try {
                    if (typeof frappe !== 'undefined' && frappe.search && frappe.search.AwesomeBar && frappe.boot && frappe.boot.desk_settings && frappe.boot.desk_settings.search_bar) {
                        var awesome = new frappe.search.AwesomeBar();
                        awesome.setup(selector);
                        self._awesomebarReady = true;
                        console.log('[ARKAN] AwesomeBar bound to topbar search');

                        // Also register keyboard shortcuts
                        frappe.ui.keys.add_shortcut({
                            shortcut: 'ctrl+k',
                            action: function(e) {
                                $(selector).click();
                                e.preventDefault();
                                return false;
                            },
                            description: __('Open Awesomebar')
                        });
                    } else {
                        // Frappe not ready yet, retry
                        setTimeout(doSetup, 500);
                    }
                } catch (e) {
                    console.warn('[ARKAN] AwesomeBar setup deferred', e);
                    setTimeout(doSetup, 1000);
                }
            }

            // Start trying — Frappe boot may not be complete yet
            setTimeout(doSetup, 100);
        },

        _brandSidebar: function() {
            var sidebar = document.querySelector('.body-sidebar');
            if (!sidebar || sidebar.querySelector('.arkan-sidebar-brand')) return;
            var brand = document.createElement('div');
            brand.className = 'arkan-sidebar-brand';
            brand.innerHTML = '<span class="arkan-sidebar-brand-letter">A</span>';
            brand.title = 'ARKAN';
            sidebar.insertBefore(brand, sidebar.firstChild);
        }
    };
})();
