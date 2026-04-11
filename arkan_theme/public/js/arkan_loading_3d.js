// Copyright (c) 2026, Arkan Lab — https://arkan.it.com
// License: MIT
// ARKAN Theme — 3D Page Transitions + Loading Indicators

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    arkan.loading3d = {
        _lastRoute: null,
        _overlay: null,

        init: function() {
            var config = arkan.config || {};
            if (!config.enable_page_transitions && !config.enable_3d_loading) return;

            if (config.enable_page_transitions) {
                this._initPageTransitions();
            }

            if (config.enable_3d_loading) {
                this._initFormSaveIndicator();
            }
        },

        // ─── Page Transitions (Route Change) ────────────────────
        _initPageTransitions: function() {
            var self = this;

            function getRouteSafe() {
                try {
                    return (typeof frappe !== "undefined" && frappe && typeof frappe.get_route_str === "function")
                        ? (frappe.get_route_str() || "")
                        : "";
                } catch (e) {
                    return "";
                }
            }

            // Hook into Frappe's page-change event
            $(document).on("page-change", function() {
                var newRoute = getRouteSafe();
                if (self._lastRoute && self._lastRoute !== newRoute) {
                    self._playTransition();
                }
                self._lastRoute = newRoute;
            });
        },

        _playTransition: function() {
            if (typeof gsap === "undefined") return;

            var pageContainer = document.querySelector(".main-section") || document.querySelector("#page-container");
            if (!pageContainer) return;

            // Quick 3D flip: old page flips out, new content fades in
            gsap.fromTo(pageContainer, {
                opacity: 0, rotateY: -3, transformPerspective: 2000, transformOrigin: "center center"
            }, {
                opacity: 1, rotateY: 0,
                duration: 0.35, ease: "power2.out", clearProps: "all"
            });
        },

        // ─── Form Save Progress Indicator ────────────────────────
        _initFormSaveIndicator: function() {
            var self = this;
            // Hook before form save
            $(document).on("form-refresh", function() {
                if (typeof cur_frm === "undefined" || !cur_frm) return;

                var originalSave = cur_frm.save;
                if (originalSave && !originalSave._arkan_wrapped) {
                    cur_frm.save = function() {
                        self._showSaveRing(cur_frm.wrapper);
                        return originalSave.apply(this, arguments).then(function(r) {
                            self._showSaveSuccess();
                            return r;
                        }).catch(function(e) {
                            self._hideSaveRing();
                            throw e;
                        });
                    };
                    cur_frm.save._arkan_wrapped = true;
                }
            });
        },

        _showSaveRing: function(wrapper) {
            if (this._overlay) this._hideSaveRing();

            var overlay = document.createElement("div");
            overlay.className = "arkan-save-ring-overlay";

            var svgNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", "64");
            svg.setAttribute("height", "64");
            svg.setAttribute("viewBox", "0 0 64 64");
            svg.setAttribute("class", "arkan-save-ring-svg");

            // Background ring
            var bgRing = document.createElementNS(svgNS, "circle");
            bgRing.setAttribute("cx", "32");
            bgRing.setAttribute("cy", "32");
            bgRing.setAttribute("r", "26");
            bgRing.setAttribute("fill", "none");
            bgRing.setAttribute("stroke", "rgba(255,255,255,0.1)");
            bgRing.setAttribute("stroke-width", "3");
            svg.appendChild(bgRing);

            // Progress ring
            var ring = document.createElementNS(svgNS, "circle");
            ring.setAttribute("class", "save-progress-ring");
            ring.setAttribute("cx", "32");
            ring.setAttribute("cy", "32");
            ring.setAttribute("r", "26");
            ring.setAttribute("fill", "none");
            ring.setAttribute("stroke", "var(--arkan-cyan, #00F0FF)");
            ring.setAttribute("stroke-width", "3");
            ring.setAttribute("stroke-linecap", "round");
            ring.setAttribute("transform", "rotate(-90 32 32)");
            var circumference = 2 * Math.PI * 26;
            ring.setAttribute("stroke-dasharray", String(circumference));
            ring.setAttribute("stroke-dashoffset", String(circumference));
            svg.appendChild(ring);

            overlay.appendChild(svg);
            document.body.appendChild(overlay);
            this._overlay = overlay;

            // Animate ring to ~80% (the save call will complete it)
            if (typeof gsap !== "undefined") {
                gsap.to(ring, {
                    strokeDashoffset: circumference * 0.2,
                    duration: 2, ease: "power2.out"
                });
            }
        },

        _showSaveSuccess: function() {
            if (!this._overlay) return;

            var ring = this._overlay.querySelector(".save-progress-ring");
            var svg = this._overlay.querySelector("svg");

            if (typeof gsap !== "undefined" && ring) {
                gsap.to(ring, {
                    strokeDashoffset: 0,
                    stroke: "var(--arkan-green, #10B981)",
                    duration: 0.3, ease: "power2.out",
                    onComplete: function() {
                        // Draw checkmark
                        if (svg) {
                            var svgNS = "http://www.w3.org/2000/svg";
                            var check = document.createElementNS(svgNS, "path");
                            check.setAttribute("d", "M20 32 L28 40 L44 24");
                            check.setAttribute("fill", "none");
                            check.setAttribute("stroke", "var(--arkan-green, #10B981)");
                            check.setAttribute("stroke-width", "3");
                            check.setAttribute("stroke-linecap", "round");
                            check.setAttribute("stroke-linejoin", "round");
                            svg.appendChild(check);

                            if (typeof DrawSVGPlugin !== "undefined") {
                                gsap.registerPlugin(DrawSVGPlugin);
                                gsap.from(check, { drawSVG: "0%", duration: 0.4, ease: "power2.out" });
                            }
                        }
                    }
                });
            }

            // Auto-dismiss after 1.2s
            var self = this;
            setTimeout(function() { self._hideSaveRing(); }, 1200);
        },

        _hideSaveRing: function() {
            if (!this._overlay) return;
            var overlay = this._overlay;
            this._overlay = null;

            if (typeof gsap !== "undefined") {
                gsap.to(overlay, {
                    opacity: 0, scale: 0.8,
                    duration: 0.3, ease: "power2.in",
                    onComplete: function() {
                        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    }
                });
            } else {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }
        }
    };
})();
