// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Neural Grid — Animated neural network visualization
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.neuralGrid = {
        canvas: null, ctx: null, nodes: [], animId: null, mouse: { x: -1000, y: -1000 },

        init: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'arkan-neural-grid-canvas';
            this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.35;';
            document.body.prepend(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.resize();
            this.createNodes();
            this.animate();

            window.addEventListener('resize', () => { this.resize(); this.createNodes(); });
            document.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
        },

        resize: function() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        createNodes: function() {
            // Fewer nodes — capped at 35 max for performance
            const count = Math.min(35, Math.floor((this.canvas.width * this.canvas.height) / 60000));
            this.nodes = [];
            for (let i = 0; i < count; i++) {
                this.nodes.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2 + 1,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        },

        animate: function() {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;
            ctx.clearRect(0, 0, w, h);

            const cyan = arkan.config ? arkan.config.primary_color : '#00F0FF';
            const purple = arkan.config ? arkan.config.accent_color : '#8B5CF6';
            const connectionDistSq = 150 * 150; // squared distance — avoids sqrt
            const mouseDistSq = 200 * 200;
            const nodes = this.nodes;
            const len = nodes.length;

            // Update and draw nodes
            for (let i = 0; i < len; i++) {
                const node = nodes[i];
                node.x += node.vx;
                node.y += node.vy;
                node.pulse += 0.02;

                // Bounce off edges
                if (node.x < 0 || node.x > w) node.vx *= -1;
                if (node.y < 0 || node.y > h) node.vy *= -1;

                // Mouse interaction
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < mouseDistSq) {
                    node.vx += dx * 0.00005;
                    node.vy += dy * 0.00005;
                }

                // Draw node
                const glow = 0.5 + Math.sin(node.pulse) * 0.3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * (1 + Math.sin(node.pulse) * 0.2), 0, Math.PI * 2);
                ctx.fillStyle = i % 3 === 0 ? purple : cyan;
                ctx.globalAlpha = glow;
                ctx.fill();

                // Draw connections — using squared distance to avoid sqrt
                for (let j = i + 1; j < len; j++) {
                    const other = nodes[j];
                    const cdx = node.x - other.x;
                    const cdy = node.y - other.y;
                    const cdistSq = cdx * cdx + cdy * cdy;
                    if (cdistSq < connectionDistSq) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = cyan;
                        ctx.globalAlpha = (1 - cdistSq / connectionDistSq) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            this.animId = requestAnimationFrame(() => this.animate());
        },

        destroy: function() {
            if (this.animId) cancelAnimationFrame(this.animId);
            if (this.canvas) this.canvas.remove();
        }
    };
})();
