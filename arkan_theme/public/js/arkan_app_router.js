// Copyright (c) 2026, Arkan Lab — https://arkan.it.com
// License: MIT
// ARKAN Theme — App Router: route-based Arkan app detection

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    arkan.appRouter = {
        // Static registry — Arkan apps and their route/DocType prefixes
        APP_REGISTRY: {
            arrowz:       { prefix: ["arrowz", "az-", "az "], color: "#6366F1", label: "Arrowz" },
            arkspace:     { prefix: ["arkspace", "as-", "as "], color: "#1B365D", label: "ARKSpace" },
            auracrm:      { prefix: ["auracrm", "ac-", "ac_"], color: "#6366F1", label: "AuraCRM" },
            candela:      { prefix: ["candela", "cd-", "cd "], color: "#F59E0B", label: "Candela" },
            velara:       { prefix: ["velara", "vl-", "vl "], color: "#C9A84C", label: "Velara" },
            vertex:       { prefix: ["vertex", "vx-", "vx "], color: "#E8590C", label: "Vertex" },
            masar:        { prefix: ["masar", "ms-", "ms "], color: "#8B5CF6", label: "Masar" },
            caps:         { prefix: ["caps", "caps_"], color: "#10B981", label: "CAPS" },
            arkan_help:   { prefix: ["arkan-help", "arkan_help"], color: "#06B6D4", label: "Arkan Help" },
            frappe_visual:{ prefix: ["frappe-visual", "frappe_visual", "fv-"], color: "#6366F1", label: "Frappe Visual" },
            arkan_theme:  { prefix: ["arkan-theme", "arkan_theme", "arkan-settings"], color: "#1E40AF", label: "ARKAN Theme" },
        },

        _currentApp: null,
        _listeners: [],

        init: function() {
            var self = this;
            // Listen for Frappe route changes
            $(document).on("page-change", function() {
                self._onRouteChange();
            });
            // Initial detection (defer to avoid null route during startup)
            setTimeout(function() {
                self._onRouteChange();
            }, 0);
        },

        _safeGetRouteStr: function() {
            try {
                if (typeof frappe !== "undefined" && frappe && typeof frappe.get_route_str === "function") {
                    return frappe.get_route_str() || "";
                }
            } catch (e) {
                // Route is not ready yet
            }

            try {
                if (typeof frappe !== "undefined" && frappe && frappe.router && Array.isArray(frappe.router.current_route)) {
                    return frappe.router.current_route.join("/");
                }
            } catch (e2) {
                // Ignore and fallback to empty route
            }

            return "";
        },

        _onRouteChange: function() {
            var detected = null;
            try {
                detected = this.detectApp();
            } catch (e) {
                console.warn("[ARKAN] appRouter route detection skipped:", e);
                detected = null;
            }
            if (detected !== this._currentApp) {
                this._currentApp = detected;
                // Notify media switcher
                if (arkan.mediaSwitcher) {
                    arkan.mediaSwitcher.switchToApp(detected);
                }
            }
        },

        detectApp: function() {
            var route = this._safeGetRouteStr().toLowerCase();
            var doctype = "";

            // Get DocType from current form or list
            if (typeof cur_frm !== "undefined" && cur_frm && cur_frm.doc) {
                doctype = (cur_frm.doc.doctype || "").toLowerCase();
            } else if (typeof cur_list !== "undefined" && cur_list) {
                doctype = (cur_list.doctype || "").toLowerCase();
            }

            // Method 1: Check route path
            for (var app in this.APP_REGISTRY) {
                var config = this.APP_REGISTRY[app];
                for (var i = 0; i < config.prefix.length; i++) {
                    if (route.indexOf(config.prefix[i].toLowerCase()) !== -1) {
                        return app;
                    }
                }
            }

            // Method 2: Check DocType prefix
            if (doctype) {
                for (var app2 in this.APP_REGISTRY) {
                    var config2 = this.APP_REGISTRY[app2];
                    for (var j = 0; j < config2.prefix.length; j++) {
                        var pfx = config2.prefix[j].replace("-", " ").toLowerCase();
                        if (doctype.indexOf(pfx) === 0) {
                            return app2;
                        }
                    }
                }
            }

            // Method 3: Check workspace sidebar selection
            var selected = document.querySelector(".workspace-sidebar .selected");
            if (selected) {
                var wsText = (selected.textContent || "").toLowerCase().trim();
                for (var app3 in this.APP_REGISTRY) {
                    if (wsText.indexOf(app3.replace("_", " ")) !== -1 ||
                        wsText.indexOf(this.APP_REGISTRY[app3].label.toLowerCase()) !== -1) {
                        return app3;
                    }
                }
            }

            return null; // No Arkan app detected → use defaults
        },

        getCurrentApp: function() {
            return this._currentApp;
        },

        getAppConfig: function(appName) {
            return this.APP_REGISTRY[appName] || null;
        },
    };
})();
