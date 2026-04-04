# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

app_name = "arkan_theme"
app_title = "ARKAN Theme"
app_publisher = "ARKAN — AI & Technology Solutions"
app_description = "Modern glassmorphism desk theme with dark mode and RTL support"
app_email = "info@arkan.tech"
app_license = "MIT"
source_link = "https://github.com/ArkAnTech/arkan_theme"
app_home = "/desk"

# Cache-busting version — bump this after every CSS/JS change
_v = "16.1.2"

# v16 App Launcher
add_to_apps_screen = [
    {
        "name": "arkan_theme",
        "logo": "/assets/arkan_theme/images/logo-header.png",
        "title": "ARKAN Theme",
        "route": "/desk/arkan-settings",
    }
]

# CSS (loads on every desk page)
app_include_css = [
    f"/assets/arkan_theme/css/arkan.css?v={_v}"
]

# JS — single bundled file (26 modules → 1 HTTP request)
app_include_js = [
    f"/assets/arkan_theme/js/arkan_theme.bundle.js?v={_v}",
    "/assets/arkan_theme/js/fv_integration.js",
]

# Website / Portal pages (includes login)
web_include_css = [
    f"/assets/arkan_theme/css/arkan.css?v={_v}"
]

web_include_js = [
    f"/assets/arkan_theme/js/arkan_neural_grid.js?v={_v}",
    f"/assets/arkan_theme/js/arkan_login.js?v={_v}"
]

website_context = {
    "brand_name": "ARKAN",
    "favicon": "/assets/arkan_theme/images/favicon.ico"
}

# Login page styling
app_logo_url = "/assets/arkan_theme/images/logo-login.png"

# Boot session info
boot_session = "arkan_theme.boot.boot_session"

# Required for frappe compatibility

# ─── Post-Migration Seed ───
after_migrate = ["arkan_theme.seed.seed_data"]

required_apps = ["frappe", "frappe_visual", "arkan_help"]

# CAPS Integration — Capability-Based Access Control
# ------------------------------------------------------------
caps_capabilities = [
    {"name": "AT_manage_theme", "category": "Module", "description": "Configure ARKAN Theme settings"},
    {"name": "AT_customize_colors", "category": "Action", "description": "Customize brand colors and typography"},
    {"name": "AT_manage_assets", "category": "Action", "description": "Upload and manage branding assets"},
]

# Fixtures
# --------------------------------------------------------
fixtures = [
    {"dt": "Custom Field", "filters": [["module", "=", "ARKAN Theme"]]},
    {"dt": "Desktop Icon", "filters": [["app", "=", "arkan_theme"]]},
    {"dt": "Workspace", "filters": [["module", "like", "ARKAN Theme%"]]},
]

app_icon = "/assets/arkan_theme/images/arkan_theme-logo.svg"
app_color = "#1E40AF"
app_logo_url = "/assets/arkan_theme/images/arkan_theme-logo.svg"

after_install = "arkan_theme.install.after_install"

# Website Route Rules
# --------------------------------------------------------
website_route_rules = [
    {"from_route": "/arkan-theme-about", "to_route": "arkan_theme_about"},
    {"from_route": "/عن-arkan-theme", "to_route": "arkan_theme_about"},
    {"from_route": "/arkan-theme/<path:app_path>", "to_route": "arkan-theme/<app_path>"},
]
