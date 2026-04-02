# Copyright (c) 2026, ARKAN - AI & Technology Solutions and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ARKANSettings(Document):
    """ARKAN Theme Settings - Single DocType for runtime theme customization."""

    def validate(self):
        """Validate settings before saving."""
        if self.splash_duration and self.splash_duration < 500:
            frappe.throw("Splash duration must be at least 500ms")
        if self.splash_duration and self.splash_duration > 10000:
            frappe.throw("Splash duration must not exceed 10000ms")

    def on_update(self):
        """Clear cache when settings are updated so changes take effect."""
        frappe.clear_cache()


@frappe.whitelist()
def get_arkan_settings():
    """Return ARKAN settings as dict for boot/JS consumption."""
    frappe.only_for(["System Manager"])
    try:
        doc = frappe.get_single("ARKAN Settings")
        return {
            "brand_name": doc.brand_name or "ARKAN",
            "logo_url": doc.logo_url or "/assets/arkan_theme/images/logo-header.png",
            "favicon_url": doc.favicon_url or "/assets/arkan_theme/images/favicon.ico",
            "primary_color": doc.primary_color or "#00F0FF",
            "secondary_color": doc.secondary_color or "#0A0F1C",
            "accent_color": doc.accent_color or "#8B5CF6",
            "text_color": getattr(doc, "text_color", None) or "#E8ECF1",
            "enable_splash_screen": doc.enable_splash_screen,
            "enable_neural_grid": getattr(doc, "enable_neural_grid", 1),
            "enable_matrix_rain": getattr(doc, "enable_matrix_rain", 0),
            "enable_particles": doc.enable_particles,
            "enable_glitch_effects": getattr(doc, "enable_glitch_effects", 1),
            "enable_cursor_effects": getattr(doc, "enable_cursor_effects", 1),
            "enable_sounds": doc.enable_sounds,
            "enable_search_overlay": doc.enable_search_overlay,
            "default_dark_mode": doc.default_dark_mode,
            "splash_duration": doc.splash_duration or 2800,
            "splash_logo_url": doc.splash_logo_url or "",
            "custom_css": doc.custom_css or "",
            "custom_js": doc.custom_js or "",
        }
    except Exception:
        return {
            "brand_name": "ARKAN",
            "logo_url": "/assets/arkan_theme/images/logo-header.png",
            "favicon_url": "/assets/arkan_theme/images/favicon.ico",
            "primary_color": "#00F0FF",
            "secondary_color": "#0A0F1C",
            "accent_color": "#8B5CF6",
            "text_color": "#E8ECF1",
            "enable_splash_screen": 1,
            "enable_neural_grid": 1,
            "enable_matrix_rain": 0,
            "enable_particles": 1,
            "enable_glitch_effects": 1,
            "enable_cursor_effects": 1,
            "enable_sounds": 0,
            "enable_search_overlay": 1,
            "default_dark_mode": 1,
            "splash_duration": 2800,
            "splash_logo_url": "",
            "custom_css": "",
            "custom_js": "",
        }
