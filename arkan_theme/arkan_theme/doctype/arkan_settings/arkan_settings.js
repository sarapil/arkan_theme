// Copyright (c) 2026, ARKAN — AI & Technology Solutions
// For license information, please see license.txt

frappe.ui.form.on("ARKAN Settings", {
    refresh: function(frm) {
        // Branded header with neon cyber aesthetic
        frm.set_intro(
            '<div style="display:flex;align-items:center;gap:12px;padding:4px 0;">' +
            '<span style="font-size:28px;">⚡</span>' +
            '<div>' +
            '<strong style="color:#00F0FF;font-size:15px;">ARKAN Theme Settings</strong><br>' +
            '<span style="color:#888;font-size:12px;">Configure your cyber-tech AI theme experience</span>' +
            '</div></div>',
            'blue'
        );

        // Preview button
        frm.add_custom_button(__('Preview Theme'), function() {
            frappe.msgprint({
                title: __('Theme Preview'),
                indicator: 'blue',
                message: __(
                    '<div style="text-align:center;padding:20px;background:#0A0F1C;border-radius:12px;">' +
                    '<div style="width:60px;height:60px;border-radius:50%;margin:0 auto 12px;' +
                    'background:linear-gradient(135deg,' + (frm.doc.primary_color || '#00F0FF') + ',' + (frm.doc.accent_color || '#8B5CF6') + ');' +
                    'display:flex;align-items:center;justify-content:center;font-size:24px;' +
                    'box-shadow:0 0 20px ' + (frm.doc.primary_color || '#00F0FF') + '40;">⚡</div>' +
                    '<h4 style="color:' + (frm.doc.primary_color || '#00F0FF') + ';font-family:monospace;">' +
                    '&lt; ' + (frm.doc.brand_name || 'ARKAN') + ' /&gt;</h4>' +
                    '<div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.primary_color || '#00F0FF') + ';" title="Primary (Cyan)"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.secondary_color || '#0A0F1C') + ';border:1px solid #333;" title="Secondary (Black)"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.accent_color || '#8B5CF6') + ';" title="Accent (Purple)"></div>' +
                    '<div style="width:48px;height:48px;border-radius:8px;background:' +
                    (frm.doc.text_color || '#E8ECF1') + ';border:1px solid #333;" title="Text"></div>' +
                    '</div>' +
                    '<p style="margin-top:12px;color:#666;font-size:12px;font-family:monospace;">// Save settings and reload to apply changes</p>' +
                    '</div>'
                )
            });
        }, __('Actions'));

        // Reset to defaults button
        frm.add_custom_button(__('Reset Defaults'), function() {
            frappe.confirm(
                __('Reset all ARKAN settings to defaults? This cannot be undone.'),
                function() {
                    frm.set_value('brand_name', 'ARKAN');
                    frm.set_value('primary_color', '#00F0FF');
                    frm.set_value('secondary_color', '#0A0F1C');
                    frm.set_value('accent_color', '#8B5CF6');
                    frm.set_value('text_color', '#E8ECF1');
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
                    frm.dirty();
                    frappe.show_alert({
                        message: __('Defaults restored — save to apply'),
                        indicator: 'green'
                    });
                }
            );
        }, __('Actions'));
    },

    primary_color: function(frm) {
        frm.dashboard.set_headline(
            '<span style="color:' + frm.doc.primary_color + ';">● Primary: ' +
            frm.doc.primary_color + '</span>'
        );
    }
});
