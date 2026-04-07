// Copyright (c) 2026, Arkan Lab — https://arkan.it.com
// License: MIT
// ARKAN Theme — 3D Multi-Layer Parallax Background with GSAP

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    // Preset definitions: each preset defines layer visuals
    var PRESETS = {
        "Neural 3D": {
            deep:    { gradient: "radial-gradient(ellipse at 30% 70%, rgba(0,240,255,0.04) 0%, transparent 70%)" },
            mid:     { useNeuralGrid: true },
            near:    { type: "dots", color: "rgba(139,92,246,0.08)", count: 12 },
            surface: { gradient: "linear-gradient(180deg, transparent, rgba(10,15,28,0.3))" }
        },
        "Starfield": {
            deep:    { gradient: "radial-gradient(ellipse at 50% 50%, rgba(0,5,16,1) 0%, rgba(0,0,0,1) 100%)" },
            mid:     { type: "stars", color: "rgba(255,255,255,0.6)", count: 40 },
            near:    { type: "stars", color: "rgba(0,240,255,0.4)", count: 15 },
            surface: { gradient: "none" }
        },
        "Matrix 3D": {
            deep:    { gradient: "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 70%)" },
            mid:     { useMatrix: true },
            near:    { type: "dots", color: "rgba(16,185,129,0.1)", count: 8 },
            surface: { gradient: "linear-gradient(180deg, transparent 80%, rgba(10,15,28,0.5))" }
        },
        "Gradient Mesh": {
            deep:    { gradient: "conic-gradient(from 180deg at 50% 70%, rgba(0,240,255,0.06), rgba(139,92,246,0.06), rgba(245,158,11,0.04), rgba(0,240,255,0.06))" },
            mid:     { gradient: "radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.04) 0%, transparent 50%)" },
            near:    { gradient: "radial-gradient(ellipse at 70% 60%, rgba(0,240,255,0.03) 0%, transparent 50%)" },
            surface: { gradient: "none" }
        },
        "Minimal": {
            deep:    { gradient: "none" },
            mid:     { gradient: "none" },
            near:    { gradient: "none" },
            surface: { gradient: "none" }
        },
        "None": null
    };

    arkan.bg3d = {
        _container: null,
        _layers: {},
        _mouseX: 0.5,
        _mouseY: 0.5,
        _rafId: null,

        init: function() {
            var config = arkan.config || {};
            var preset = config.bg_preset || "Neural 3D";

            if (preset === "None" || !PRESETS[preset]) return;

            var presetDef = PRESETS[preset];
            if (!presetDef) return;

            // If reduced motion, skip parallax (still render static layers)
            var reduced = arkan.theme && arkan.theme._prefersReducedMotion
                ? arkan.theme._prefersReducedMotion()
                : window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            this._createLayers(presetDef);

            if (!reduced) {
                this._bindMouse();
                this._startParallax(config.bg_parallax_intensity || 50);
            }
        },

        _createLayers: function(presetDef) {
            var container = document.createElement("div");
            container.className = "arkan-bg-3d";
            this._container = container;

            var layerNames = ["deep", "mid", "near", "surface"];
            var zValues = { deep: -200, mid: -100, near: -30, surface: 0 };

            for (var i = 0; i < layerNames.length; i++) {
                var name = layerNames[i];
                var def = presetDef[name];
                if (!def) continue;

                var layer = document.createElement("div");
                layer.className = "arkan-bg-3d__" + name;
                layer.style.transform = "translateZ(" + zValues[name] + "px)";

                if (def.gradient && def.gradient !== "none") {
                    layer.style.background = def.gradient;
                }

                if (def.type === "dots" || def.type === "stars") {
                    this._populateParticles(layer, def);
                }

                // Neural grid and matrix are handled externally by arkan_theme.js
                // They get placed as siblings; we just flag them
                if (def.useNeuralGrid) {
                    layer.setAttribute("data-bg-layer", "neural-grid");
                }
                if (def.useMatrix) {
                    layer.setAttribute("data-bg-layer", "matrix");
                }

                container.appendChild(layer);
                this._layers[name] = layer;
            }

            // Insert at beginning of body
            if (document.body.firstChild) {
                document.body.insertBefore(container, document.body.firstChild);
            } else {
                document.body.appendChild(container);
            }
        },

        _populateParticles: function(layer, def) {
            var count = def.count || 10;
            var color = def.color || "rgba(255,255,255,0.3)";
            var isStar = (def.type === "stars");

            for (var i = 0; i < count; i++) {
                var el = document.createElement("div");
                var size = isStar ? (1 + Math.random() * 3) : (4 + Math.random() * 8);
                el.style.cssText = "position:absolute;border-radius:50%;background:" + color + ";width:" + size + "px;height:" + size + "px;left:" + (Math.random() * 100) + "%;top:" + (Math.random() * 100) + "%;";
                if (isStar) {
                    el.style.boxShadow = "0 0 " + (size * 3) + "px " + color;
                }
                layer.appendChild(el);
            }
        },

        _bindMouse: function() {
            var self = this;
            document.addEventListener("mousemove", function(e) {
                self._mouseX = e.clientX / window.innerWidth;
                self._mouseY = e.clientY / window.innerHeight;
            }, { passive: true });
        },

        _startParallax: function(intensityPercent) {
            var self = this;
            var intensity = (intensityPercent || 50) / 100;
            var depthScale = { deep: 30 * intensity, mid: 15 * intensity, near: 5 * intensity, surface: 0 };

            function tick() {
                var mx = (self._mouseX - 0.5) * 2;
                var my = (self._mouseY - 0.5) * 2;

                var names = ["deep", "mid", "near"];
                for (var i = 0; i < names.length; i++) {
                    var layer = self._layers[names[i]];
                    if (!layer) continue;

                    var s = depthScale[names[i]];
                    var tx = mx * s;
                    var ty = my * s;

                    // Use GSAP quickTo if available for smooth interpolation
                    if (typeof gsap !== "undefined") {
                        gsap.to(layer, {
                            x: tx, y: ty,
                            duration: 0.6, ease: "power2.out", overwrite: "auto"
                        });
                    } else {
                        layer.style.transform = "translate(" + tx + "px, " + ty + "px) translateZ(" + (names[i] === "deep" ? -200 : names[i] === "mid" ? -100 : -30) + "px)";
                    }
                }

                self._rafId = requestAnimationFrame(tick);
            }

            tick();
        },

        destroy: function() {
            if (this._rafId) cancelAnimationFrame(this._rafId);
            if (this._container && this._container.parentNode) {
                this._container.parentNode.removeChild(this._container);
            }
            this._layers = {};
        },

        setPreset: function(presetName) {
            this.destroy();
            if (presetName === "None" || !PRESETS[presetName]) return;
            this._createLayers(PRESETS[presetName]);
            var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!reduced) {
                this._startParallax((arkan.config || {}).bg_parallax_intensity || 50);
            }
        }
    };
})();
