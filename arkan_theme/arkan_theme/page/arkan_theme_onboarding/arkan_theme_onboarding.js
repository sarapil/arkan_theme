// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT

frappe.pages["arkan-theme-onboarding"].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __("ARKAN Theme Onboarding"),
        single_column: true,
    });

    page.main.addClass("arkan-theme-onboarding-page fv-fx-page-enter");
    const $container = $('<div class="fv-onboarding-container"></div>').appendTo(page.main);

    const steps = [
        {
            title: __("Welcome to ARKAN"),
            description: __("A futuristic cyber-tech theme that transforms your Frappe experience with dark-first design, neon accents, and neural-grid patterns."),
            icon: "sparkles",
        },
        {
            title: __("Dark/Light Mode"),
            description: __("ARKAN defaults to dark mode. Toggle with Ctrl+Shift+D or the sidebar button. Your choice persists across sessions."),
            icon: "moon",
        },
        {
            title: __("Brand Colors"),
            description: __("Electric Cyan (#00F0FF) and Neon Purple (#8B5CF6) on Deep Black (#0A0F1C). Customize in ARKAN Settings."),
            icon: "palette",
        },
        {
            title: __("Neural Grid"),
            description: __("An animated neural network background with interactive mouse tracking. Toggle with Ctrl+Shift+N."),
            icon: "chart-dots-3",
        },
        {
            title: __("Keyboard Shortcuts"),
            description: __("Ctrl+K for search, Ctrl+Shift+D for dark mode, Ctrl+Shift+N for neural grid, Ctrl+Shift+S for sounds."),
            icon: "keyboard",
        },
        {
            title: __("Sound Effects"),
            description: __("Synthesized UI tones for success, error, and click interactions. Enable in ARKAN Settings."),
            icon: "volume",
        },
        {
            title: __("Mobile Experience"),
            description: __("Bottom navigation bar on mobile with Home, Search, New, Alerts, and Settings quick actions."),
            icon: "device-mobile",
        },
        {
            title: __("Form Enhancements"),
            description: __("Auto-enhanced forms with stats ribbons, relationship graphs, and timeline animations via frappe_visual."),
            icon: "forms",
        },
        {
            title: __("Workspace Scenes"),
            description: __("Workspace headers powered by Scene Engine with live KPI frames and animated SVG dashboards."),
            icon: "photo",
        },
        {
            title: __("Arabic Support"),
            description: __("Full RTL layout with CSS Logical Properties, bilingual tooltips, and Arabic help files."),
            icon: "language",
        },
        {
            title: __("Advanced Settings"),
            description: __("Fine-tune splash screen, matrix rain, particles, glitch effects, cursor trails, and color presets."),
            icon: "settings",
        },
        {
            title: __("You're Ready!"),
            description: __("ARKAN Theme is fully configured. Enjoy the premium cyber-tech experience."),
            icon: "rocket",
        },
    ];

    const renderWithGenerator = () => {
        try {
            frappe.visual.generator.onboardingWizard(
                $container[0],
                __("ARKAN Theme"),
                steps.map(s => ({
                    ...s,
                    onComplete: s.icon === 'rocket'
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
            <div class="fv-fx-glass fv-fx-hover-lift" style="display:flex;gap:16px;padding:20px;border-radius:12px;margin-bottom:12px">
                <div style="width:40px;height:40px;border-radius:50%;background:rgba(0,240,255,0.1);color:var(--arkan-cyan);display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">${i+1}</div>
                <div><h3 style="font-size:1rem;font-weight:600;margin-bottom:4px;color:var(--arkan-text)">${s.title}</h3><p style="font-size:0.9rem;color:var(--arkan-text-secondary)">${s.description}</p></div>
            </div>
        `).join('');
        $el.html(`
            <div style="text-align:center;padding:60px 20px">
                <h1 class="fv-fx-gradient-text" style="font-size:2rem;font-weight:800">${__("Get Started with ARKAN Theme")}</h1>
                <p style="color:var(--arkan-text-secondary)">${__("Follow these steps to set up and master ARKAN Theme.")}</p>
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
