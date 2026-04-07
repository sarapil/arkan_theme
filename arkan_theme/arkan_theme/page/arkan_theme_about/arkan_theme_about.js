// Copyright (c) 2024, Arkan Lab — https://arkan.it.com
// License: MIT

frappe.pages["arkan-theme-about"].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __("About ARKAN Theme"),
        single_column: true,
    });

    page.main.addClass("arkan-theme-about-page fv-fx-page-enter");
    const $container = $('<div class="fv-about-container"></div>').appendTo(page.main);

    const renderWithGenerator = async () => {
        try {
            await frappe.visual.generator.aboutPage(
                $container[0],
                "arkan_theme",
                {
                    color: "#00F0FF",
                    mainDoctype: null,
                    features: [
                        {
                            icon: "palette",
                            title: __("Cyber-Tech Design"),
                            description: __("Futuristic dark-first theme with neon accents and neural-grid patterns.")
                        },
                        {
                            icon: "moon",
                            title: __("Dark/Light Mode"),
                            description: __("Seamless toggle between dark cyber-tech and light professional modes.")
                        },
                        {
                            icon: "text-direction-rtl",
                            title: __("RTL Support"),
                            description: __("Full Arabic layout support with mirrored components and neon trails.")
                        },
                        {
                            icon: "typography",
                            title: __("Premium Typography"),
                            description: __("Space Grotesk headings, Inter body, JetBrains Mono code.")
                        },
                        {
                            icon: "droplet",
                            title: __("Glassmorphism"),
                            description: __("Frosted glass effects on cards, modals, and navigation elements.")
                        },
                        {
                            icon: "chart-dots-3",
                            title: __("Neural Grid"),
                            description: __("Animated neural network background with interactive mouse tracking.")
                        },
                        {
                            icon: "code",
                            title: __("Matrix Rain"),
                            description: __("Optional cascading character rain effect for immersive atmosphere.")
                        },
                        {
                            icon: "volume",
                            title: __("Sound Effects"),
                            description: __("Synthesized UI tones for success, error, and interaction feedback.")
                        },
                        {
                            icon: "sparkles",
                            title: __("frappe_visual Integration"),
                            description: __("Powered by 307+ visual components — Scene Engine, auto-enhancers, CSS effects.")
                        },
                        {
                            icon: "device-mobile",
                            title: __("Mobile Navigation"),
                            description: __("Bottom navigation bar with quick actions on mobile devices.")
                        },
                        {
                            icon: "keyboard",
                            title: __("Keyboard Shortcuts"),
                            description: __("Ctrl+Shift+D for dark mode, Ctrl+K for search, and more.")
                        },
                        {
                            icon: "language",
                            title: __("Bilingual"),
                            description: __("Full Arabic + English support with auto-direction detection.")
                        },
                        {
                            icon: "shield-check",
                            title: __("CAPS Integration"),
                            description: __("Fine-grained theme management capabilities via CAPS permission engine.")
                        },
                        {
                            icon: "rocket",
                            title: __("Performance"),
                            description: __("Single bundled JS file, lazy-loaded effects, capped animations.")
                        }
                    ],
                    roles: null,
                    ctas: [
                        { label: __("Start Onboarding"), route: "arkan-theme-onboarding", primary: true },
                        { label: __("Open Settings"), route: "app/arkan-settings" },
                        { label: __("Component Browser"), route: "app/component-browser" },
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
            <div class="fv-fx-glass" style="text-align:center;padding:60px 20px;border-radius:16px;margin:20px">
                <h1 class="fv-fx-gradient-text" style="font-size:2.5rem;font-weight:800">${__("ARKAN Theme")}</h1>
                <p style="font-size:1.15rem;color:var(--arkan-text-secondary);max-width:600px;margin:16px auto">${__("Futuristic dark-first theme with neon accents and neural-grid patterns.")}</p>
                <div style="margin-top:24px">
                    <a href="/app/arkan-theme-onboarding" class="btn btn-primary btn-lg fv-fx-hover-lift">${__("Start Onboarding")}</a>
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
