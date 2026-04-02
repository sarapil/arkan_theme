// ARKAN Splash Screen — Neural network formation
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.splash = {
        init: function() {
            // Only show once per session
            if (sessionStorage.getItem('arkan-splash-shown')) {
                // Immediately remove any template splash that's still in the DOM
                const leftover = document.querySelector('.arkan-splash-screen');
                if (leftover) leftover.remove();
                return;
            }

            const duration = (arkan.config && arkan.config.splash_duration) || 2800;

            // Check if the server-rendered template splash already exists
            let splash = document.getElementById('arkan-splash');

            if (!splash) {
                // No template splash — create dynamically (shouldn't normally happen)
                splash = document.createElement('div');
                splash.className = 'splash arkan-splash-screen';
                splash.id = 'arkan-splash';
                splash.innerHTML = `
                    <div class="arkan-splash-logo">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="arkan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#00F0FF"/>
                                    <stop offset="100%" style="stop-color:#8B5CF6"/>
                                </linearGradient>
                            </defs>
                            <polygon points="60,10 110,100 10,100" stroke="url(#arkan-grad)" stroke-width="2" fill="none" opacity="0.3"/>
                            <polygon points="60,25 95,90 25,90" stroke="url(#arkan-grad)" stroke-width="2" fill="none" opacity="0.6"/>
                            <text x="60" y="75" text-anchor="middle" fill="url(#arkan-grad)" font-family="Space Grotesk,sans-serif" font-size="36" font-weight="700">A</text>
                            <circle cx="60" cy="15" r="3" fill="#00F0FF"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
                            <circle cx="105" cy="95" r="3" fill="#8B5CF6"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></circle>
                            <circle cx="15" cy="95" r="3" fill="#00F0FF"><animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/></circle>
                        </svg>
                    </div>
                    <div class="arkan-splash-brand">&lt; ARKAN /&gt;</div>
                    <div class="arkan-splash-tagline">AI & Technology Solutions</div>
                    <div class="arkan-splash-progress"><div class="arkan-splash-progress-bar"></div></div>
                `;
                document.body.appendChild(splash);
            }

            // Animate fade-out after the duration
            setTimeout(() => {
                splash.classList.add('arkan-splash-hidden');
                setTimeout(() => { if (splash.parentNode) splash.remove(); }, 800);
            }, duration);

            // FAILSAFE: force-remove after 5 seconds no matter what
            setTimeout(() => {
                const el = document.querySelector('.arkan-splash-screen');
                if (el) {
                    el.style.cssText += 'opacity:0 !important;visibility:hidden !important;pointer-events:none !important;';
                    setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
                }
            }, 5000);

            sessionStorage.setItem('arkan-splash-shown', '1');
        }
    };
})();
