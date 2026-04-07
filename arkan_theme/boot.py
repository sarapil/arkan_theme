# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

import frappe

from arkan_theme.services.media_service import MediaService

_VERSION = "18.0.0"

# Fields to read from ARKAN Settings into boot session
_SETTINGS_FIELDS = [
	"brand_name", "logo_url", "favicon_url",
	"primary_color", "secondary_color", "accent_color", "text_color",
	"enable_splash_screen", "enable_neural_grid", "enable_matrix_rain",
	"enable_particles", "enable_glitch_effects", "enable_cursor_effects",
	"enable_sounds", "enable_search_overlay", "default_dark_mode",
	"splash_duration", "splash_logo_url", "custom_css", "custom_js",
	# v18 3D fields
	"bg_preset", "bg_parallax_intensity",
	"enable_3d_splash", "splash_style",
	"enable_page_transitions", "enable_3d_loading",
	"reduce_motion",
	# v18 rebranding fields
	"rebranding_mode", "org_name", "license_tier",
]

_DEFAULTS = {
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
	"bg_preset": "Neural 3D",
	"bg_parallax_intensity": 100,
	"enable_3d_splash": 1,
	"splash_style": "Normal",
	"enable_page_transitions": 1,
	"enable_3d_loading": 1,
	"reduce_motion": 0,
	"rebranding_mode": "ARKAN Defaults",
	"org_name": "ARKAN",
	"license_tier": "Free",
}


def boot_session(bootinfo):
	"""Add ARKAN theme settings + per-app media to boot session."""
	settings = _get_settings()
	settings["version"] = _VERSION

	# Resolve per-app media hierarchy
	try:
		doc = frappe.get_cached_doc("ARKAN Settings")
		settings["app_media"] = MediaService.resolve_all_app_media(doc)
	except Exception:
		settings["app_media"] = {}

	bootinfo.arkan_theme = settings


def _get_settings() -> dict:
	"""Read ARKAN Settings DocType, with safe fallback defaults."""
	try:
		doc = frappe.get_cached_doc("ARKAN Settings")
		result = {}
		for field in _SETTINGS_FIELDS:
			val = getattr(doc, field, None)
			result[field] = val if val is not None else _DEFAULTS.get(field, "")
		# Ensure non-empty for critical fields
		for key in ("brand_name", "logo_url", "favicon_url", "primary_color",
					"secondary_color", "accent_color", "text_color"):
			if not result.get(key):
				result[key] = _DEFAULTS[key]
		return result
	except Exception:
		return dict(_DEFAULTS)
