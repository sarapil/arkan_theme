// ARKAN Minigame — Easter egg
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.minigame = {
        code: [],
        secret: ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'],
        init: function() {
            document.addEventListener('keydown', (e) => {
                this.code.push(e.key);
                if (this.code.length > this.secret.length) this.code.shift();
                if (JSON.stringify(this.code) === JSON.stringify(this.secret)) {
                    this.activate();
                }
            });
        },
        activate: function() {
            frappe.show_alert({ message: '⚡ ARKAN Matrix Mode Activated!', indicator: 'blue' });
            if (arkan.matrix) arkan.matrix.init();
        }
    };
    $(document).on('app_ready', () => arkan.minigame.init());
})();
