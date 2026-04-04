// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Workspace — Welcome banner, quick actions, widgets
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.workspace = {
        init: function() {
            // Observe route changes (guard .on in case it's not an emitter yet)
            if (typeof frappe !== 'undefined' && frappe.router && typeof frappe.router.on === 'function') {
                frappe.router.on('change', () => this.onRouteChange());
            }
            this.onRouteChange();
        },

        onRouteChange: function() {
            setTimeout(() => {
                if (frappe.get_route_str() === '' || frappe.get_route_str().startsWith('Workspaces')) {
                    this.enhanceWorkspace();
                }
            }, 300);
        },

        enhanceWorkspace: function() {
            // Add welcome banner if not exists
            const container = document.querySelector('.workspace-container .codex-editor, .desk-page .layout-main');
            if (container && !document.querySelector('.arkan-welcome-banner')) {
                const banner = document.createElement('div');
                banner.className = 'arkan-welcome-banner arkan-animate-in';
                const hour = new Date().getHours();
                const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
                const user = frappe.session.user_fullname || 'User';
                banner.innerHTML = `
                    <div class="arkan-welcome-title">${greeting}, ${user}</div>
                    <div class="arkan-welcome-subtitle">// ${arkan.config.brand_name || 'ARKAN'} — AI & Technology Solutions</div>
                `;
                container.parentNode.insertBefore(banner, container);
            }

            // Animate widgets
            document.querySelectorAll('.widget:not(.arkan-animated)').forEach((w, i) => {
                w.classList.add('arkan-animated', 'arkan-animate-in', 'arkan-animate-delay-' + Math.min(i + 1, 10));
            });
        }
    };
})();
