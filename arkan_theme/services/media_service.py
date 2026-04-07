# Copyright (c) 2026, Arkan Lab — https://arkan.it.com
# License: MIT

import os

import frappe

# Known Arkan Lab apps with their built-in asset paths
ARKAN_APPS: dict[str, dict] = {
	"arrowz": {"color": "#6366F1", "label": "Arrowz"},
	"arkspace": {"color": "#1B365D", "label": "ARKSpace"},
	"auracrm": {"color": "#6366F1", "label": "AuraCRM"},
	"candela": {"color": "#F59E0B", "label": "Candela"},
	"velara": {"color": "#C9A84C", "label": "Velara"},
	"vertex": {"color": "#E8590C", "label": "Vertex"},
	"masar": {"color": "#8B5CF6", "label": "Masar"},
	"caps": {"color": "#10B981", "label": "CAPS"},
	"arkan_help": {"color": "#06B6D4", "label": "Arkan Help"},
	"base_base": {"color": "#64748B", "label": "Base Base"},
	"frappe_visual": {"color": "#6366F1", "label": "Frappe Visual"},
	"arkan_theme": {"color": "#1E40AF", "label": "ARKAN Theme"},
}

# Field mappings: org settings field → media key
ORG_FIELD_MAP = [
	{"settings_field": "org_logo", "media_key": "logo"},
	{"settings_field": "org_favicon", "media_key": "favicon"},
	{"settings_field": "org_splash_logo", "media_key": "splash_logo"},
	{"settings_field": "org_splash_lottie", "media_key": "splash_lottie"},
	{"settings_field": "org_login_bg", "media_key": "login_bg"},
	{"settings_field": "org_name", "media_key": "brand_name"},
]

# Field mappings: child table override field → media key
OVERRIDE_FIELD_MAP = [
	{"override_field": "override_logo", "media_key": "logo"},
	{"override_field": "override_favicon", "media_key": "favicon"},
	{"override_field": "override_splash_logo", "media_key": "splash_logo"},
	{"override_field": "override_splash_lottie", "media_key": "splash_lottie"},
	{"override_field": "override_login_bg", "media_key": "login_bg"},
	{"override_field": "override_topbar_logo", "media_key": "topbar_logo"},
	{"override_field": "override_primary_color", "media_key": "primary_color"},
	{"override_field": "override_accent_color", "media_key": "accent_color"},
	{"override_field": "override_bg_color", "media_key": "bg_color"},
	{"override_field": "override_brand_name", "media_key": "brand_name"},
	{"override_field": "override_splash_tagline", "media_key": "splash_tagline"},
]

# ARKAN theme default media
ARKAN_DEFAULTS = {
	"favicon": "/assets/arkan_theme/images/favicon.ico",
	"logo": "/assets/arkan_theme/images/logo-header.png",
	"splash_logo": "/assets/arkan_theme/images/arkan_theme-splash.svg",
	"splash_lottie": None,
	"login_bg": None,
	"topbar_logo": "/assets/arkan_theme/images/arkan-nav-logo.png",
	"primary_color": "#00F0FF",
	"accent_color": "#8B5CF6",
	"bg_color": "#0A0F1C",
	"brand_name": "ARKAN",
	"splash_tagline": None,
}


class MediaService:
	"""Per-app media resolution chain for ARKAN Theme."""

	@staticmethod
	def resolve_all_app_media(settings_doc) -> dict[str, dict]:
		"""Build the full app_media dict included in boot session."""
		installed = set(frappe.get_installed_apps())
		app_media = {}
		for app_name in ARKAN_APPS:
			if app_name in installed:
				app_media[app_name] = MediaService.resolve_app_media(app_name, settings_doc)
		return app_media

	@staticmethod
	def resolve_app_media(app_name: str, settings_doc) -> dict:
		"""Resolve the media chain for a single app."""
		mode = settings_doc.get("rebranding_mode") or "ARKAN Defaults"

		# Step 4: Start with ARKAN defaults
		result = dict(ARKAN_DEFAULTS)

		# Step 3: Override with app's own built-in assets
		builtin = MediaService._get_app_builtin_assets(app_name)
		for key, value in builtin.items():
			if value:
				result[key] = value

		# Step 2: Override with organization globals (if mode allows)
		if mode in ("Organization Global", "Per-App Custom"):
			for fm in ORG_FIELD_MAP:
				org_val = settings_doc.get(fm["settings_field"])
				if org_val:
					result[fm["media_key"]] = org_val

		# Step 1: Override with per-app custom (if mode allows)
		if mode == "Per-App Custom":
			overrides = settings_doc.get("app_media_overrides") or []
			for row in overrides:
				if row.get("app_name") == app_name and row.get("is_active"):
					for fm in OVERRIDE_FIELD_MAP:
						override_val = row.get(fm["override_field"])
						if override_val:
							result[fm["media_key"]] = override_val

		return result

	@staticmethod
	def _get_app_builtin_assets(app_name: str) -> dict:
		"""Check if an app has its own built-in media assets."""
		result = {}
		app_info = ARKAN_APPS.get(app_name, {})

		# Set app color as primary
		if app_info.get("color"):
			result["primary_color"] = app_info["color"]

		if app_info.get("label"):
			result["brand_name"] = app_info["label"]

		# Probe for common asset paths
		bench_path = frappe.utils.get_bench_path()
		assets_dir = os.path.join(bench_path, "apps", app_name, app_name, "public", "images")
		if not os.path.isdir(assets_dir):
			return result

		asset_checks = [
			("favicon", [f"{app_name}-favicon.svg", "favicon.svg", "favicon.ico"]),
			("logo", [f"{app_name}-logo.svg", "logo.svg", f"{app_name}-logo.png"]),
			("splash_logo", [f"{app_name}-splash.svg", "splash.svg"]),
			("topbar_logo", [f"{app_name}-topbar.svg", f"{app_name}-nav-logo.png"]),
		]

		for media_key, filenames in asset_checks:
			for fname in filenames:
				if os.path.isfile(os.path.join(assets_dir, fname)):
					result[media_key] = f"/assets/{app_name}/images/{fname}"
					break

		return result
