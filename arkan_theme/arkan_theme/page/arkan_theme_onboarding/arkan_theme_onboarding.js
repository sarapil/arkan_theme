// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT

frappe.pages["arkan-theme-onboarding"].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __("ARKAN Theme Onboarding"),
        single_column: true,
    });

    page.main.addClass("arkan-theme-onboarding-page");
    const $container = $('<div class="fv-onboarding-container"></div>').appendTo(page.main);

    const steps = [
        {
                "title": "Theme Overview",
                "description": "ARKAN Theme transforms your Frappe instance with cyber-tech aesthetics.",
                "icon": "palette"
        },
        {
                "title": "App Structure",
                "description": "See theme modules.",
                "icon": "sitemap",
                "component": "app-map"
        },
        {
                "title": "Customize Colors",
                "description": "Adjust primary/accent colors and neon intensity in ARKAN Settings.",
                "icon": "color-swatch"
        },
        {
                "title": "Dark/Light Toggle",
                "description": "Switch modes from the navbar or let it follow system preferences.",
                "icon": "moon"
        },
        {
                "title": "Ready",
                "description": "Your theme is active \u2014 enjoy the premium experience.",
                "icon": "rocket"
        }
];

    // Use frappe.visual.generator for premium wizard rendering
    const renderWithGenerator = () => {
        try {
            frappe.visual.generator.onboardingWizard(
                $container[0],
                "ARKAN Theme",
                steps.map(s => ({
                    ...s,
                    onComplete: s.title.includes("rocket") || s.title.includes("Ready") || s.title.includes("Go Live") || s.title.includes("Start")
                        ? () => frappe.set_route("app")
                        : undefined,
                }))
            );
        } catch(e) {
            console.warn("Generator failed, using fallback:", e);
            renderFallback($container, steps);
        }
    };

    const renderFallback = ($el, steps) => {
        const stepsHtml = steps.map((s, i) => `
            <div style="display:flex;gap:16px;padding:20px 0;border-bottom:1px solid var(--border-color)">
                <div style="width:40px;height:40px;border-radius:50%;background:rgba(99,102,241,0.1);color:#1E40AF;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">${i+1}</div>
                <div><h3 style="font-size:1rem;font-weight:600;margin-bottom:4px">${__(s.title)}</h3><p style="font-size:0.9rem;color:var(--text-muted)">${__(s.description)}</p></div>
            </div>
        `).join('');
        $el.html(`
            <div style="text-align:center;padding:60px 20px">
                <h1>🚀 ${__("Get Started with ARKAN Theme")}</h1>
                <p style="color:var(--text-muted)">${__("Follow these steps to set up and master ARKAN Theme.")}</p>
            </div>
            <div style="max-width:700px;margin:0 auto;padding:0 20px">${stepsHtml}</div>
        `);
    };

    if (frappe.visual && frappe.visual.generator) {
        renderWithGenerator();
    } else {
        frappe.require("frappe_visual.bundle.js", () => {
            if (frappe.visual && frappe.visual.generator) {
                renderWithGenerator();
            } else {
                renderFallback($container, steps);
            }
        });
    }
};
