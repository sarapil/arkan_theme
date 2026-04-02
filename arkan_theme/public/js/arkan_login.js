// ════════════════════════════════════════════════════════════════════
// ARKAN Theme — Login Page Enhancement
// Injects animated SVG logo, floating particles, neural-grid canvas,
// brand footer, and smooth entrance animations.
// Loaded via web_include_js (runs on all www pages including login).
// ════════════════════════════════════════════════════════════════════
(function () {
    "use strict";

    // ── Gate: only run on the login page ──
    var isLogin =
        document.body.getAttribute("data-path") === "login" ||
        document.querySelector('[data-path="login"]') ||
        window.location.pathname === "/login";

    if (!isLogin) return;

    // Prevent double-init
    if (document.body.classList.contains("arkan-login-ready")) return;
    document.body.classList.add("arkan-login-ready");

    // ════════════════════════════════════════════════════════════════
    // 1. Animated SVG Logo — injected above the page-card
    // ════════════════════════════════════════════════════════════════
    function injectLogo() {
        var section = document.querySelector("section.for-login");
        if (!section || document.querySelector(".arkan-login-logo-wrapper")) return;

        var wrapper = document.createElement("div");
        wrapper.className = "arkan-login-logo-wrapper";

        // Inline animated SVG — dual triangles + A + pulsing neural nodes
        wrapper.innerHTML =
            '<svg class="arkan-login-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">' +
            '  <defs>' +
            '    <linearGradient id="arkan-lg" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '      <stop offset="0%" stop-color="#00F0FF"/>' +
            '      <stop offset="100%" stop-color="#8B5CF6"/>' +
            '    </linearGradient>' +
            '    <filter id="arkan-glow"><feGaussianBlur stdDeviation="3" result="blur"/>' +
            '      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
            '    </filter>' +
            '  </defs>' +
            '  <polygon points="100,15 185,175 15,175" stroke="url(#arkan-lg)" stroke-width="2" fill="none" opacity="0.3" filter="url(#arkan-glow)">' +
            '    <animate attributeName="stroke-dasharray" values="0,600;600,0" dur="2s" fill="freeze"/>' +
            '  </polygon>' +
            '  <polygon points="100,40 165,160 35,160" stroke="url(#arkan-lg)" stroke-width="2" fill="none" opacity="0.6" filter="url(#arkan-glow)">' +
            '    <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="2s" begin="0.3s" fill="freeze"/>' +
            '  </polygon>' +
            '  <text x="100" y="130" text-anchor="middle" fill="url(#arkan-lg)" font-family="Space Grotesk,sans-serif" font-size="72" font-weight="700" filter="url(#arkan-glow)" opacity="0">' +
            '    A' +
            '    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.2s" fill="freeze"/>' +
            '  </text>' +
            '  <circle cx="100" cy="20" r="4" fill="#00F0FF">' +
            '    <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>' +
            '  </circle>' +
            '  <circle cx="180" cy="170" r="4" fill="#8B5CF6">' +
            '    <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>' +
            '  </circle>' +
            '  <circle cx="20" cy="170" r="4" fill="#00F0FF">' +
            '    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>' +
            '  </circle>' +
            '  <line x1="100" y1="20" x2="180" y2="170" stroke="#00F0FF" stroke-width="0.5" opacity="0.15"/>' +
            '  <line x1="100" y1="20" x2="20" y2="170" stroke="#8B5CF6" stroke-width="0.5" opacity="0.15"/>' +
            '  <line x1="20" y1="170" x2="180" y2="170" stroke="#00F0FF" stroke-width="0.5" opacity="0.15"/>' +
            '</svg>' +
            '<div class="arkan-login-brand-name">&lt; ARKAN /&gt;</div>' +
            '<div class="arkan-login-tagline">AI &amp; Technology Solutions</div>';

        // Insert as first visible child of section.for-login (before the hidden .page-card-head)
        var pageCard = section.querySelector(".page-card");
        if (pageCard) {
            section.insertBefore(wrapper, pageCard);
        } else {
            section.insertBefore(wrapper, section.firstChild);
        }
    }

    // ════════════════════════════════════════════════════════════════
    // 2. Floating Particles
    // ════════════════════════════════════════════════════════════════
    function injectParticles() {
        if (document.querySelector(".arkan-login-particles")) return;
        // Skip if user prefers reduced motion
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        var container = document.createElement("div");
        container.className = "arkan-login-particles";

        var count = window.innerWidth < 768 ? 12 : 20;
        for (var i = 0; i < count; i++) {
            var p = document.createElement("div");
            p.className = "arkan-particle";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDelay = Math.random() * 6 + "s";
            p.style.animationDuration = (5 + Math.random() * 5) + "s";
            var size = 2 + Math.random() * 3;
            p.style.width = size + "px";
            p.style.height = size + "px";
            container.appendChild(p);
        }

        document.body.appendChild(container);
    }

    // ════════════════════════════════════════════════════════════════
    // 3. Neural Grid Canvas Background
    // ════════════════════════════════════════════════════════════════
    function injectNeuralGrid() {
        if (document.querySelector(".arkan-login-canvas")) return;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        var canvas = document.createElement("canvas");
        canvas.className = "arkan-login-canvas";
        document.body.insertBefore(canvas, document.body.firstChild);

        var ctx = canvas.getContext("2d");
        var nodes = [];
        var maxNodes = window.innerWidth < 768 ? 20 : 35;
        var mouse = { x: -1000, y: -1000 };
        var dpr = window.devicePixelRatio || 1;
        var w, h;

        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();

        function createNodes() {
            nodes = [];
            for (var i = 0; i < maxNodes; i++) {
                nodes.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: 1.5 + Math.random() * 1.5
                });
            }
        }
        createNodes();

        var connectionDistSq = 22500; // 150^2

        function draw() {
            ctx.clearRect(0, 0, w, h);

            // Draw connections
            for (var i = 0; i < nodes.length; i++) {
                var a = nodes[i];
                for (var j = i + 1; j < nodes.length; j++) {
                    var b = nodes[j];
                    var dx = a.x - b.x;
                    var dy = a.y - b.y;
                    var distSq = dx * dx + dy * dy;
                    if (distSq < connectionDistSq) {
                        var alpha = 1 - distSq / connectionDistSq;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = "rgba(0, 240, 255, " + (alpha * 0.15) + ")";
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw + move nodes
            for (var k = 0; k < nodes.length; k++) {
                var n = nodes[k];
                n.x += n.vx;
                n.y += n.vy;

                // Bounce off edges
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;

                // Mouse interaction — gentle push
                var mdx = n.x - mouse.x;
                var mdy = n.y - mouse.y;
                var mDistSq = mdx * mdx + mdy * mdy;
                if (mDistSq < 10000 && mDistSq > 0) {
                    var force = 0.5 / Math.sqrt(mDistSq);
                    n.vx += mdx * force * 0.05;
                    n.vy += mdy * force * 0.05;
                }

                // Speed limit
                var speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                if (speed > 0.8) {
                    n.vx = (n.vx / speed) * 0.8;
                    n.vy = (n.vy / speed) * 0.8;
                }

                // Draw node
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = k % 3 === 0 ? "rgba(139, 92, 246, 0.5)" : "rgba(0, 240, 255, 0.5)";
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();

        // Track mouse for interaction
        document.addEventListener("mousemove", function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Handle resize
        var resizeTimer;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                resize();
                createNodes();
            }, 200);
        });
    }

    // ════════════════════════════════════════════════════════════════
    // 4. Brand Footer
    // ════════════════════════════════════════════════════════════════
    function injectFooter() {
        if (document.querySelector(".arkan-login-footer")) return;

        var section = document.querySelector("section.for-login");
        if (!section) return;

        var footer = document.createElement("div");
        footer.className = "arkan-login-footer";
        footer.innerHTML =
            '&copy; ' + new Date().getFullYear() + ' ARKAN — AI &amp; Technology Solutions';

        // Insert after the section.for-login
        section.parentNode.insertBefore(footer, section.nextSibling);
    }

    // ════════════════════════════════════════════════════════════════
    // 5. Title Text Enhancement
    // ════════════════════════════════════════════════════════════════
    function enhanceTitle() {
        var titles = document.querySelectorAll(".page-card-head h4, .page-card-head .title");
        titles.forEach(function (el) {
            if (el.textContent.indexOf("Login") > -1 || el.textContent.indexOf("تسجيل") > -1) {
                // Keep original Frappe text or set a custom one
                el.textContent = "Welcome to ARKAN";
            }
        });
    }

    // ════════════════════════════════════════════════════════════════
    // 6. Input Focus Animations
    // ════════════════════════════════════════════════════════════════
    function enhanceInputs() {
        var inputs = document.querySelectorAll(
            'body[data-path="login"] input[type="text"], ' +
            'body[data-path="login"] input[type="password"], ' +
            'body[data-path="login"] input[type="email"]'
        );

        inputs.forEach(function (input) {
            // Add subtle glow ring on focus via class
            input.addEventListener("focus", function () {
                this.parentElement && this.parentElement.classList.add("arkan-input-focused");
            });
            input.addEventListener("blur", function () {
                this.parentElement && this.parentElement.classList.remove("arkan-input-focused");
            });
        });
    }

    // ════════════════════════════════════════════════════════════════
    // Initialize — wait for DOM
    // ════════════════════════════════════════════════════════════════
    function init() {
        injectNeuralGrid();
        injectParticles();
        injectLogo();
        enhanceTitle();
        injectFooter();
        enhanceInputs();
    }

    // Run when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        // DOM already loaded — run immediately but with slight delay for Frappe rendering
        setTimeout(init, 50);
    }

    // Also listen for frappe's login-rendered event (if available)
    if (typeof frappe !== "undefined" && frappe.ready) {
        frappe.ready(function () {
            setTimeout(init, 100);
        });
    }
})();