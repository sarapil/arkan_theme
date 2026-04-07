// Copyright (c) 2026, Arkan Lab — https://arkan.it.com
// License: MIT
// ARKAN Theme — 3D Splash Screen with GSAP + Lottie + CSS 3D

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    var SPLASH_DURATIONS = { Quick: 1500, Normal: 2800, Cinematic: 5000 };
    var SESSION_KEY = "arkan-splash-shown";
    var FAILSAFE_MS = 8000;

    // Per-app gradient themes
    var APP_THEMES = {
        arkan_theme: { bg: "radial-gradient(ellipse at center, #0A0F1C 0%, #000510 50%, #00F0FF08 100%)", particle: "#00F0FF" },
        vertex:      { bg: "radial-gradient(ellipse at center, #1A0A00 0%, #0D0500 50%, #E8590C08 100%)", particle: "#E8590C" },
        velara:      { bg: "radial-gradient(ellipse at center, #1A1000 0%, #0D0800 50%, #C9A84C08 100%)", particle: "#C9A84C" },
        arrowz:      { bg: "radial-gradient(ellipse at center, #0A001A 0%, #050010 50%, #6366F108 100%)", particle: "#6366F1" },
        auracrm:     { bg: "radial-gradient(ellipse at center, #0A001A 0%, #050010 50%, #6366F108 100%)", particle: "#6366F1" },
        candela:     { bg: "radial-gradient(ellipse at center, #1A0800 0%, #0D0400 50%, #F59E0B08 100%)", particle: "#F59E0B" },
        arkspace:    { bg: "radial-gradient(ellipse at center, #000A1A 0%, #000510 50%, #1B365D08 100%)", particle: "#1B365D" },
        masar:       { bg: "radial-gradient(ellipse at center, #0A001A 0%, #050010 50%, #8B5CF608 100%)", particle: "#8B5CF6" },
        caps:        { bg: "radial-gradient(ellipse at center, #001A10 0%, #000D08 50%, #10B98108 100%)", particle: "#10B981" },
    };

    arkan.splash3d = {
        _overlay: null,
        _timeline: null,

        init: function() {
            // Session gate — only show once per browser session
            if (sessionStorage.getItem(SESSION_KEY)) return;
            sessionStorage.setItem(SESSION_KEY, "1");

            if (typeof gsap === "undefined") {
                // GSAP not available — fall back to 2D splash
                if (arkan.splash) arkan.splash.init();
                return;
            }

            var config = arkan.config || {};
            var appName = arkan.appRouter ? arkan.appRouter.getCurrentApp() : null;
            var media = arkan.mediaSwitcher ? arkan.mediaSwitcher.getCurrentMedia() : {};
            var style = config.splash_style || "Normal";
            var duration = SPLASH_DURATIONS[style] || 2800;

            this.show(appName, media, duration);
        },

        show: function(appName, media, duration) {
            var self = this;
            var overlay = this._createOverlay(appName, media);
            this._overlay = overlay;
            document.body.appendChild(overlay);

            // Force reflow
            overlay.offsetHeight;

            var tl = gsap.timeline({
                onComplete: function() {
                    self._exit(overlay);
                }
            });
            this._timeline = tl;

            // 1. Background gradient scale
            tl.fromTo(overlay.querySelector(".splash3d-bg"), {
                backgroundSize: "100% 100%", opacity: 0
            }, {
                backgroundSize: "200% 200%", opacity: 1,
                duration: Math.min(duration / 1000, 2.5), ease: "power2.inOut"
            }, 0);

            // 2. Depth particles stagger entrance
            var particles = overlay.querySelectorAll(".splash3d-particle");
            if (particles.length) {
                tl.from(particles, {
                    z: -200, opacity: 0, scale: 0,
                    stagger: { each: 0.05, from: "random" },
                    duration: 1, ease: "back.out(1.7)"
                }, 0.2);
            }

            // 3. Logo 3D entrance
            var logo = overlay.querySelector(".splash3d-logo");
            if (logo) {
                tl.from(logo, {
                    rotateY: -90, scale: 0.3, opacity: 0,
                    transformPerspective: 1200,
                    duration: 0.8, ease: "back.out(2)"
                }, 0.4);
            }

            // 4. Brand text — SplitText if available
            var brandEl = overlay.querySelector(".splash3d-brand");
            if (brandEl && typeof SplitText !== "undefined") {
                var split = new SplitText(brandEl, { type: "chars" });
                tl.from(split.chars, {
                    rotateX: -90, opacity: 0, y: 50,
                    stagger: 0.03, duration: 0.6, ease: "back.out(1.7)"
                }, 0.8);
            } else if (brandEl) {
                tl.from(brandEl, {
                    opacity: 0, y: 30, duration: 0.6, ease: "power2.out"
                }, 0.8);
            }

            // 5. Tagline
            var tagline = overlay.querySelector(".splash3d-tagline");
            if (tagline) {
                tl.from(tagline, {
                    opacity: 0, y: 20, duration: 0.4, ease: "power2.out"
                }, 1.2);
            }

            // 6. Progress ring (DrawSVG if available)
            var progressCircle = overlay.querySelector(".splash3d-progress circle.progress-ring");
            if (progressCircle && typeof DrawSVGPlugin !== "undefined") {
                gsap.registerPlugin(DrawSVGPlugin);
                tl.from(progressCircle, {
                    drawSVG: "0%",
                    duration: duration / 1000 * 0.6, ease: "power2.inOut"
                }, 0.5);
            }

            // Schedule exit
            tl.duration(Math.max(tl.duration(), duration / 1000));

            // Failsafe
            setTimeout(function() {
                if (self._overlay) self._exit(self._overlay);
            }, FAILSAFE_MS);
        },

        _createOverlay: function(appName, media) {
            var theme = APP_THEMES[appName] || APP_THEMES.arkan_theme;
            var primaryColor = (media && media.primary_color) || theme.particle;
            var brandName = (media && media.brand_name) || arkan.config.brand_name || "ARKAN";
            var splashTagline = (media && media.splash_tagline) || "";
            var logoUrl = (media && media.splash_logo) || (media && media.logo) || arkan.config.logo_url || "";

            var overlay = document.createElement("div");
            overlay.className = "arkan-splash3d-screen";
            overlay.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;perspective:1200px;overflow:hidden;";

            // Background
            var bg = document.createElement("div");
            bg.className = "splash3d-bg";
            bg.style.cssText = "position:absolute;inset:0;background:" + theme.bg + ";background-size:100% 100%;";
            overlay.appendChild(bg);

            // Particles container (20 particles)
            var particleContainer = document.createElement("div");
            particleContainer.className = "splash3d-particles";
            particleContainer.style.cssText = "position:absolute;inset:0;transform-style:preserve-3d;pointer-events:none;";
            for (var i = 0; i < 20; i++) {
                var p = document.createElement("div");
                p.className = "splash3d-particle";
                var size = 4 + Math.random() * 8;
                var x = Math.random() * 100;
                var y = Math.random() * 100;
                var z = -100 + Math.random() * 200;
                p.style.cssText = "position:absolute;width:" + size + "px;height:" + size + "px;border-radius:50%;background:" + primaryColor + ";opacity:0.4;left:" + x + "%;top:" + y + "%;transform:translateZ(" + z + "px);box-shadow:0 0 " + (size * 2) + "px " + primaryColor + ";";
                particleContainer.appendChild(p);
            }
            overlay.appendChild(particleContainer);

            // Center content container
            var center = document.createElement("div");
            center.style.cssText = "position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:16px;transform-style:preserve-3d;";

            // Logo
            if (logoUrl) {
                var img = document.createElement("img");
                img.className = "splash3d-logo";
                img.src = logoUrl;
                img.alt = brandName;
                img.style.cssText = "width:120px;height:120px;object-fit:contain;filter:drop-shadow(0 0 20px " + primaryColor + "40);";
                center.appendChild(img);
            }

            // Brand name
            var brand = document.createElement("div");
            brand.className = "splash3d-brand";
            brand.textContent = brandName;
            brand.style.cssText = "font-size:2.5rem;font-weight:800;letter-spacing:0.15em;background:linear-gradient(135deg, " + primaryColor + ", #fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;";
            center.appendChild(brand);

            // Tagline
            if (splashTagline) {
                var tag = document.createElement("div");
                tag.className = "splash3d-tagline";
                tag.textContent = splashTagline;
                tag.style.cssText = "font-size:1rem;color:rgba(255,255,255,0.6);letter-spacing:0.05em;";
                center.appendChild(tag);
            }

            // Progress ring SVG
            var svgNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("class", "splash3d-progress");
            svg.setAttribute("width", "60");
            svg.setAttribute("height", "60");
            svg.setAttribute("viewBox", "0 0 60 60");
            svg.style.cssText = "margin-top:16px;transform:rotateX(60deg);";

            var bgRing = document.createElementNS(svgNS, "circle");
            bgRing.setAttribute("cx", "30");
            bgRing.setAttribute("cy", "30");
            bgRing.setAttribute("r", "24");
            bgRing.setAttribute("fill", "none");
            bgRing.setAttribute("stroke", "rgba(255,255,255,0.1)");
            bgRing.setAttribute("stroke-width", "3");
            svg.appendChild(bgRing);

            var ring = document.createElementNS(svgNS, "circle");
            ring.setAttribute("class", "progress-ring");
            ring.setAttribute("cx", "30");
            ring.setAttribute("cy", "30");
            ring.setAttribute("r", "24");
            ring.setAttribute("fill", "none");
            ring.setAttribute("stroke", primaryColor);
            ring.setAttribute("stroke-width", "3");
            ring.setAttribute("stroke-linecap", "round");
            ring.setAttribute("stroke-dasharray", String(2 * Math.PI * 24));
            ring.setAttribute("stroke-dashoffset", String(2 * Math.PI * 24));
            ring.setAttribute("transform", "rotate(-90 30 30)");
            svg.appendChild(ring);

            center.appendChild(svg);
            overlay.appendChild(center);

            return overlay;
        },

        _exit: function(overlay) {
            if (!overlay || !overlay.parentNode) return;
            this._overlay = null;

            if (typeof gsap !== "undefined") {
                var children = overlay.querySelector("div[style*='z-index:2']");
                gsap.to(children ? [children] : overlay.children, {
                    z: 500, opacity: 0, filter: "blur(20px)",
                    stagger: 0.1, duration: 0.6, ease: "power3.in",
                    onComplete: function() {
                        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    }
                });
            } else {
                overlay.style.transition = "opacity 0.5s ease";
                overlay.style.opacity = "0";
                setTimeout(function() {
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }, 500);
            }
        },

        // Allow manual skip (e.g., on click)
        skip: function() {
            if (this._timeline) this._timeline.progress(1);
            if (this._overlay) this._exit(this._overlay);
        }
    };
})();
