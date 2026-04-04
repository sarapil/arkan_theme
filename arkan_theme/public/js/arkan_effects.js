// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Effects — Cyber particles
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.effects = {
        particles: [],
        canvas: null,
        ctx: null,

        init: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            this.canvas = document.createElement('canvas');
            this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.3;';
            document.body.prepend(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.spawn();
            this.animate();
            window.addEventListener('resize', () => this.resize());
        },

        resize: function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        spawn: function() {
            const count = Math.floor(this.canvas.width / 30);
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedY: -(Math.random() * 0.3 + 0.1),
                    speedX: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: Math.random() > 0.5 ? '#00F0FF' : '#8B5CF6',
                });
            }
        },

        animate: function() {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                if (p.y < -10) { p.y = this.canvas.height + 10; p.x = Math.random() * this.canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(() => this.animate());
        }
    };
})();
