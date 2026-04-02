// ARKAN Sounds — Cyber notification tones via Web Audio API
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.sounds = {
        ctx: null,

        init: function() {
            // Lazy init AudioContext on first user gesture
            document.addEventListener('click', () => {
                if (!this.ctx) {
                    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                }
            }, { once: true });
        },

        play: function(type) {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            gain.gain.value = 0.08;

            switch(type) {
                case 'success':
                    osc.frequency.setValueAtTime(523, this.ctx.currentTime);
                    osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.1);
                    osc.frequency.setValueAtTime(784, this.ctx.currentTime + 0.2);
                    break;
                case 'error':
                    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
                    osc.frequency.setValueAtTime(150, this.ctx.currentTime + 0.15);
                    break;
                case 'click':
                    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
                    gain.gain.value = 0.03;
                    break;
                default:
                    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
            }

            osc.type = 'sine';
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        }
    };
})();
