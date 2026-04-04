// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Matrix Rain — Cyber data rain effect
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.matrix = {
        canvas: null, ctx: null, columns: [], animId: null,

        init: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'arkan-matrix-canvas';
            this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.08;';
            document.body.prepend(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.resize();
            this.animate();
            window.addEventListener('resize', () => this.resize());
        },

        resize: function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            const colWidth = 14;
            const numCols = Math.floor(this.canvas.width / colWidth);
            this.columns = new Array(numCols).fill(0).map(() => Math.random() * this.canvas.height);
        },

        animate: function() {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;

            ctx.fillStyle = 'rgba(10, 15, 28, 0.05)';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#00F0FF';
            ctx.font = '12px JetBrains Mono, monospace';

            const chars = 'アカサタナハマヤラワ01ARKAN<>/{}[]';
            this.columns.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * 14;
                ctx.globalAlpha = Math.random() * 0.5 + 0.3;
                ctx.fillText(char, x, y);

                if (y > h && Math.random() > 0.975) {
                    this.columns[i] = 0;
                } else {
                    this.columns[i] = y + 14;
                }
            });
            ctx.globalAlpha = 1;

            this.animId = requestAnimationFrame(() => this.animate());
        },

        destroy: function() {
            if (this.animId) cancelAnimationFrame(this.animId);
            if (this.canvas) this.canvas.remove();
        }
    };
})();
