import frappe

def boot_session(bootinfo):
    """Add ARKAN theme settings to boot session for JS consumption."""
    settings = _get_settings()
    settings["version"] = "16.1.2"
    bootinfo.arkan_theme = settings


def _get_settings():
    """Read ARKAN Settings DocType, with safe fallback defaults."""
    defaults = {
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
    try:
        doc = frappe.get_single("ARKAN Settings")
        return {
            "brand_name": doc.brand_name or defaults["brand_name"],
            "logo_url": doc.logo_url or defaults["logo_url"],
            "favicon_url": doc.favicon_url or defaults["favicon_url"],
            "primary_color": doc.primary_color or defaults["primary_color"],
            "secondary_color": doc.secondary_color or defaults["secondary_color"],
            "accent_color": doc.accent_color or defaults["accent_color"],
            "text_color": getattr(doc, "text_color", None) or defaults["text_color"],
            "enable_splash_screen": doc.enable_splash_screen,
            "enable_neural_grid": getattr(doc, "enable_neural_grid", defaults["enable_neural_grid"]),
            "enable_matrix_rain": getattr(doc, "enable_matrix_rain", defaults["enable_matrix_rain"]),
            "enable_particles": doc.enable_particles,
            "enable_glitch_effects": getattr(doc, "enable_glitch_effects", defaults["enable_glitch_effects"]),
            "enable_cursor_effects": getattr(doc, "enable_cursor_effects", defaults["enable_cursor_effects"]),
            "enable_sounds": doc.enable_sounds,
            "enable_search_overlay": doc.enable_search_overlay,
            "default_dark_mode": doc.default_dark_mode,
            "splash_duration": doc.splash_duration or defaults["splash_duration"],
            "splash_logo_url": doc.splash_logo_url or "",
            "custom_css": doc.custom_css or "",
            "custom_js": doc.custom_js or "",
        }
    except Exception:
        return defaults
