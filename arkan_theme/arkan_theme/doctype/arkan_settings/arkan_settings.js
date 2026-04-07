// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// ARKAN Theme Settings — v18.0 with tier gating + 3D controls

frappe.ui.form.on("ARKAN Settings", {
    refresh: function(frm) {
        // Branded header
        frm.set_intro(
            '<div style="display:flex;align-items:center;gap:12px;padding:4px 0;">' +
            '<span style="font-size:28px;">⚡</span>' +
            '<div>' +
            '<strong style="color:#00F0FF;font-size:15px;">ARKAN Theme Settings</strong><br>' +
            '<span style="color:#888;font-size:12px;">v18.0 — 3D Engine + Per-App Branding</span>' +
            '</div></div>',
            'blue'
        );

        // Apply tier gating
        _applyTierGating(frm);

        // Preview button
        frm.add_custom_button(__('Preview Theme'), function() {
            frappe.msgprint({
                title: __('Theme Preview'),
                indicator: 'blue',
                message:
                    '<div style="text-align:center;padding:20px;background:#0A0F1C;border-radius:12px;">' +
                    '<div style="width:60px;height:60px;border-radius:50%;margin:0 auto 12px;' +
                    'background:linear-gradient(135deg,' + (frm.doc.primary_color || '#00F0FF') + ',' + (frm.doc.accent_color || '#8B5CF6') + ');' +
                    'display:flex;align-items:center;justify-content:center;font-size:24px;' +
                    'box-shadow:0 0 20px ' + (frm.doc.primary_color || '#00F0FF') + '40;">⚡</div>' +
                    '<h4 style="color:' + (frm.doc.primary_color || '#00F0FF') + ';font-family:monospace;">' +
                    '&lt; ' + (frm.doc.brand_name || 'ARKAN') + ' /&gt;</h4>' +
                    '<div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.primary_color || '#00F0FF') + ';" title="Primary"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.secondary_color || '#0A0F1C') + ';border:1px solid #333;" title="Secondary"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.accent_color || '#8B5CF6') + ';" title="Accent"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.text_color || '#E8ECF1') + ';border:1px solid #333;" title="Text"></div>' +
                    '</div>' +
                    '<p style="margin-top:8px;color:#555;font-size:11px;">Tier: ' +
                    (frm.doc.license_tier || 'Free') + ' | 3D: ' +
                    (frm.doc.enable_3d_splash ? 'ON' : 'OFF') + ' | BG: ' +
                    (frm.doc.bg_preset || 'Neural 3D') + '</p>' +
                    '</div>'
            });
        }, __('Actions'));

        // Reset to defaults button — includes v18 fields
        frm.add_custom_button(__('Reset Defaults'), function() {
            frappe.confirm(
                __('Reset all ARKAN settings to defaults? This cannot be undone.'),
                function() {
                    // Core branding
                    frm.set_value('brand_name', 'ARKAN');
                    frm.set_value('primary_color', '#00F0FF');
                    frm.set_value('secondary_color', '#0A0F1C');
                    frm.set_value('accent_color', '#8B5CF6');
                    frm.set_value('text_color', '#E8ECF1');
                    // Feature toggles
                    frm.set_value('enable_splash_screen', 1);
                    frm.set_value('enable_neural_grid', 1);
                    frm.set_value('enable_matrix_rain', 0);
                    frm.set_value('enable_particles', 1);
                    frm.set_value('enable_glitch_effects', 1);
                    frm.set_value('enable_cursor_effects', 1);
                    frm.set_value('enable_sounds', 0);
                    frm.set_value('enable_search_overlay', 1);
                    frm.set_value('default_dark_mode', 1);
                    frm.set_value('splash_duration', 2800);
                    frm.set_value('custom_css', '');
                    frm.set_value('custom_js', '');
                    // v18 3D fields
                    frm.set_value('bg_preset', 'Neural 3D');
                    frm.set_value('bg_parallax_intensity', 50);
                    frm.set_value('enable_3d_splash', 1);
                    frm.set_value('splash_style', 'Normal');
                    frm.set_value('enable_page_transitions', 1);
                    frm.set_value('enable_3d_loading', 1);
                    frm.set_value('reduce_motion', 0);
                    frm.set_value('rebranding_mode', 'ARKAN Defaults');
                    frm.set_value('org_name', '');
                    frm.dirty();
                    frappe.show_alert({
                        message: __('Defaults restored — save to apply'),
                        indicator: 'green'
                    });
                }
            );
        }, __('Actions'));
    },

    license_tier: function(frm) {
        _applyTierGating(frm);
    },

    rebranding_mode: function(frm) {
        _applyTierGating(frm);
    },

    primary_color: function(frm) {
        frm.dashboard.set_headline(
            '<span style="color:' + frm.doc.primary_color + ';">● Primary: ' +
            frm.doc.primary_color + '</span>'
        );
    }
});

function _applyTierGating(frm) {
    var tier = frm.doc.license_tier || "Free";
    var mode = frm.doc.rebranding_mode || "ARKAN Defaults";

    // --- Rebranding mode options per tier ---
    var allowedModes = ["ARKAN Defaults"];
    if (tier === "Professional" || tier === "Enterprise") {
        allowedModes.push("Organization Global");
    }
    if (tier === "Enterprise") {
        allowedModes.push("Per-App Custom");
    }

    // Filter rebranding_mode options
    var modeField = frm.fields_dict.rebranding_mode;
    if (modeField && modeField.df) {
        var allOptions = "ARKAN Defaults\nOrganization Global\nPer-App Custom";
        var filtered = allOptions.split("\n").filter(function(opt) {
            return allowedModes.indexOf(opt) !== -1;
        }).join("\n");
        modeField.df.options = filtered;
        modeField.refresh();
    }

    // Reset to allowed mode if current is not allowed
    if (allowedModes.indexOf(mode) === -1) {
        frm.set_value("rebranding_mode", "ARKAN Defaults");
    }

    // --- Organization fields: read-only for Free tier ---
    var orgFields = [
        "org_name", "org_logo", "org_favicon", "org_splash_logo",
        "org_splash_lottie", "org_login_bg", "org_email_header",
        "org_print_header", "org_watermark"
    ];
    var orgReadOnly = (tier === "Free");
    for (var i = 0; i < orgFields.length; i++) {
        frm.set_df_property(orgFields[i], "read_only", orgReadOnly ? 1 : 0);
    }

    // --- Per-app overrides table: read-only unless Enterprise ---
    var appOverridesReadOnly = (tier !== "Enterprise");
    frm.set_df_property("app_media_overrides", "read_only", appOverridesReadOnly ? 1 : 0);

    // --- Custom CSS limit indicator for Free tier ---
    if (tier === "Free" && frm.doc.custom_css) {
        var cssSize = new Blob([frm.doc.custom_css]).size;
        if (cssSize > 5120) {
            frm.set_df_property("custom_css", "description",
                '<span style="color:#F43F5E;">\u26a0 ' + __("Free tier: max 5 KB custom CSS ({0} KB used)", [
                    (cssSize / 1024).toFixed(1)
                ]) + '</span>'
            );
        }
    }

    // --- License section: helpful description ---
    if (tier === "Free") {
        frm.set_df_property("license_tier", "description",
            __("Upgrade to Professional or Enterprise for Organization Branding, Per-App Overrides, and unlimited Custom CSS.")
        );
    } else {
        frm.set_df_property("license_tier", "description", "");
    }
}
