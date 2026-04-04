// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT

frappe.pages["arkan-theme-about"].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __("About ARKAN Theme"),
        single_column: true,
    });

    page.main.addClass("arkan-theme-about-page");
    const $container = $('<div class="fv-about-container"></div>').appendTo(page.main);

    // Use frappe.visual.generator for premium rendering
    const renderWithGenerator = async () => {
        try {
            await frappe.visual.generator.aboutPage(
                $container[0],
                "arkan_theme",
                {
                    color: "#1E40AF",
                    mainDoctype: null,
                    features: [
        {
                "icon": "palette",
                "title": "Cyber-Tech Design",
                "description": "Futuristic dark-first theme with neon accents and neural-grid patterns."
        },
        {
                "icon": "moon",
                "title": "Dark/Light Mode",
                "description": "Seamless toggle between dark cyber-tech and light professional modes."
        },
        {
                "icon": "text-direction-rtl",
                "title": "RTL Support",
                "description": "Full Arabic layout support with mirrored components and neon trails."
        },
        {
                "icon": "typography",
                "title": "Premium Typography",
                "description": "Curated font pairings optimized for English and Arabic text."
        },
        {
                "icon": "droplet",
                "title": "Glassmorphism",
                "description": "Frosted glass effects on cards, modals, and navigation elements."
        }
],
                    roles: null,
                    ctas: [
                        { label: __("Start Onboarding"), route: "arkan-theme-onboarding", primary: true },
                        { label: __("Open Settings"), route: "app/arkan-settings" },
                    ],
                }
            );
        } catch(e) {
            console.warn("Generator failed, using fallback:", e);
            renderFallback($container);
        }
    };

    const renderFallback = ($el) => {
        $el.html(`
            <div style="text-align:center;padding:60px 20px">
                <h1 style="font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#1E40AF,#333);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${__("ARKAN Theme")}</h1>
                <p style="font-size:1.15rem;color:var(--text-muted);max-width:600px;margin:16px auto">${__("Futuristic dark-first theme with neon accents and neural-grid patterns.")}</p>
                <div style="margin-top:24px">
                    <a href="/app/arkan-theme-onboarding" class="btn btn-primary btn-lg">${__("Start Onboarding")}</a>
                </div>
            </div>
        `);
    };

    if (frappe.visual && frappe.visual.generator) {
        renderWithGenerator();
    } else {
        frappe.require("frappe_visual.bundle.js", () => {
            if (frappe.visual && frappe.visual.generator) {
                renderWithGenerator();
            } else {
                renderFallback($container);
            }
        });
    }
};
