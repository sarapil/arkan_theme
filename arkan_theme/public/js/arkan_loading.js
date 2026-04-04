// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Loading Overlay
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.loading = {
        overlay: null,

        show: function(message) {
            if (this.overlay) return;
            this.overlay = document.createElement('div');
            this.overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,15,28,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
            this.overlay.innerHTML = `
                <div style="width:40px;height:40px;border:2px solid #2D3A4F;border-top-color:#00F0FF;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
                <div style="color:#E8ECF1;font-family:Space Grotesk,sans-serif;margin-top:16px;font-size:14px;">${message || 'Processing...'}</div>
                <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
            `;
            document.body.appendChild(this.overlay);
        },

        hide: function() {
            if (this.overlay) {
                this.overlay.style.opacity = '0';
                setTimeout(() => { if(this.overlay) { this.overlay.remove(); this.overlay = null; } }, 300);
            }
        }
    };
})();
