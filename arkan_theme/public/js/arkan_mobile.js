// ARKAN Mobile Bottom Navigation
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.mobile = {
        init: function() {
            if (window.innerWidth > 768) return;
            if (document.querySelector('.arkan-mobile-nav')) return;

            const nav = document.createElement('nav');
            nav.className = 'arkan-mobile-nav';
            const items = [
                { icon: '🏠', label: 'Home', route: '/desk' },
                { icon: '📋', label: 'List', route: '/desk/todo' },
                { icon: '🔔', label: 'Alerts', route: '/desk/notification-log' },
                { icon: '⚙️', label: 'Settings', route: '/desk/user-settings' },
            ];
            nav.innerHTML = items.map(i =>
                `<a class="arkan-nav-item" href="${i.route}">
                    <span class="arkan-nav-icon">${i.icon}</span>
                    <span>${i.label}</span>
                </a>`
            ).join('');
            document.body.appendChild(nav);
        }
    };

    // Init after theme
    $(document).on('app_ready', () => arkan.mobile.init());
})();
