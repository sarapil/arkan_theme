// ARKAN Cursor — Neon glow trail
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.cursor = {
        trail: [],
        maxTrail: 12,

        init: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            if ('ontouchstart' in window) return; // No cursor on touch devices

            this.container = document.createElement('div');
            this.container.className = 'arkan-cursor-trail';
            this.container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;';
            document.body.appendChild(this.container);

            for (let i = 0; i < this.maxTrail; i++) {
                const dot = document.createElement('div');
                const size = Math.max(3, 12 - i * 0.8);
                dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${i % 2 === 0 ? '#00F0FF' : '#8B5CF6'};opacity:${0.6 - i * 0.04};pointer-events:none;transition:transform 0.05s;filter:blur(${i * 0.3}px);`;
                this.container.appendChild(dot);
                this.trail.push({ el: dot, x: -100, y: -100 });
            }

            document.addEventListener('mousemove', (e) => this.onMove(e));
        },

        onMove: function(e) {
            this.trail[0].x = e.clientX;
            this.trail[0].y = e.clientY;

            for (let i = this.trail.length - 1; i > 0; i--) {
                this.trail[i].x += (this.trail[i-1].x - this.trail[i].x) * 0.4;
                this.trail[i].y += (this.trail[i-1].y - this.trail[i].y) * 0.4;
            }

            this.trail.forEach(t => {
                t.el.style.transform = `translate(${t.x - 6}px, ${t.y - 6}px)`;
            });

            requestAnimationFrame(() => this.render());
        },

        render: function() {
            for (let i = this.trail.length - 1; i > 0; i--) {
                this.trail[i].x += (this.trail[i-1].x - this.trail[i].x) * 0.3;
                this.trail[i].y += (this.trail[i-1].y - this.trail[i].y) * 0.3;
                this.trail[i].el.style.transform = `translate(${this.trail[i].x - 6}px, ${this.trail[i].y - 6}px)`;
            }
        }
    };
})();
