// Copyright (c) 2026, Arkan Lab — https://arkan.it.com
// License: MIT
// ARKAN Theme — Media Switcher: dynamic favicon/logo/color switching per app

(function() {
    "use strict";

    window.arkan = window.arkan || {};

    arkan.mediaSwitcher = {
        _currentApp: null,
        _currentMedia: null,
        _gsapAvailable: false,

        init: function() {
            this._gsapAvailable = (typeof gsap !== "undefined");
        },

        switchToApp: function(appName) {
            if (appName === this._currentApp) return;
            this._currentApp = appName;

            var media = this._resolveMedia(appName);
            this._currentMedia = media;

            this._switchFavicon(media.favicon);
            this._switchColors(media);
            this._switchTopbarLogo(media.topbar_logo || media.logo);
            this._updateDocTitle(media.brand_name);

            // Emit event for other modules (splash, bg, etc.)
            document.dispatchEvent(new CustomEvent("arkan:app-switched", {
                detail: { app: appName, media: media }
            }));
        },

        _resolveMedia: function(appName) {
            // Use pre-resolved data from boot
            var bootData = frappe.boot && frappe.boot.arkan_theme;
            if (!bootData) return this._getDefaults();

            if (appName && bootData.app_media && bootData.app_media[appName]) {
                return bootData.app_media[appName];
            }

            // Fallback to global settings
            return {
                favicon: bootData.favicon_url || "/assets/arkan_theme/images/favicon.ico",
                logo: bootData.logo_url || "/assets/arkan_theme/images/logo-header.png",
                topbar_logo: "/assets/arkan_theme/images/arkan-nav-logo.png",
                splash_logo: bootData.splash_logo_url || "",
                splash_lottie: null,
                primary_color: bootData.primary_color || "#00F0FF",
                accent_color: bootData.accent_color || "#8B5CF6",
                bg_color: bootData.secondary_color || "#0A0F1C",
                brand_name: bootData.brand_name || "ARKAN",
                splash_tagline: null,
            };
        },

        _getDefaults: function() {
            return {
                favicon: "/assets/arkan_theme/images/favicon.ico",
                logo: "/assets/arkan_theme/images/logo-header.png",
                topbar_logo: "/assets/arkan_theme/images/arkan-nav-logo.png",
                splash_logo: "",
                splash_lottie: null,
                primary_color: "#00F0FF",
                accent_color: "#8B5CF6",
                bg_color: "#0A0F1C",
                brand_name: "ARKAN",
                splash_tagline: null,
            };
        },

        _switchFavicon: function(faviconUrl) {
            if (!faviconUrl) return;
            var links = document.querySelectorAll('link[rel*="icon"]');
            if (links.length) {
                links.forEach(function(link) {
                    link.href = faviconUrl;
                });
            } else {
                var link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "image/x-icon";
                link.href = faviconUrl;
                document.head.appendChild(link);
            }
        },

        _switchColors: function(media) {
            var root = document.documentElement;
            if (media.primary_color) {
                root.style.setProperty("--arkan-app-primary", media.primary_color);
                root.style.setProperty("--arkan-cyan", media.primary_color);
            }
            if (media.accent_color) {
                root.style.setProperty("--arkan-app-accent", media.accent_color);
            }
            if (media.bg_color) {
                root.style.setProperty("--arkan-app-bg", media.bg_color);
            }
        },

        _switchTopbarLogo: function(logoUrl) {
            if (!logoUrl) return;
            var logo = document.querySelector(".arkan-nav-logo, .navbar-brand img");
            if (!logo) return;

            if (this._gsapAvailable) {
                gsap.to(logo, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    onComplete: function() {
                        logo.src = logoUrl;
                        gsap.to(logo, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            ease: "back.out"
                        });
                    }
                });
            } else {
                logo.src = logoUrl;
            }
        },

        _updateDocTitle: function(brandName) {
            if (!brandName) return;
            // Only update the brand portion of title — respect Frappe's page title
            var title = document.title || "";
            // Frappe titles are like "Page Name | ARKAN"
            var parts = title.split(" | ");
            if (parts.length > 1) {
                parts[parts.length - 1] = brandName;
                document.title = parts.join(" | ");
            }
        },

        getCurrentMedia: function() {
            return this._currentMedia || this._getDefaults();
        },

        getCurrentApp: function() {
            return this._currentApp;
        },
    };
})();
