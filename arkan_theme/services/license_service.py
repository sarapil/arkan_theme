# Copyright (c) 2026, Arkan Lab — https://arkan.it.com
# License: MIT

import frappe


class LicenseService:
	"""Tier validation and feature gating for ARKAN Theme rebranding."""

	TIER_FEATURES: dict[str, dict] = {
		"Free": {
			"rebranding_modes": ["ARKAN Defaults"],
			"custom_css_limit": 5120,
			"per_app_overrides": False,
			"custom_lottie": False,
			"remove_watermark": False,
		},
		"Professional": {
			"rebranding_modes": ["ARKAN Defaults", "Organization Global"],
			"custom_css_limit": 0,
			"per_app_overrides": False,
			"custom_lottie": True,
			"remove_watermark": True,
		},
		"Enterprise": {
			"rebranding_modes": ["ARKAN Defaults", "Organization Global", "Per-App Custom"],
			"custom_css_limit": 0,
			"per_app_overrides": True,
			"custom_lottie": True,
			"remove_watermark": True,
		},
	}

	@staticmethod
	def get_tier() -> str:
		settings = frappe.get_cached_doc("ARKAN Settings")
		tier = settings.get("license_tier") or "Free"
		if tier != "Free" and not LicenseService._validate_key(settings):
			return "Free"
		return tier

	@staticmethod
	def can_use_feature(feature: str) -> bool:
		tier = LicenseService.get_tier()
		return LicenseService.TIER_FEATURES.get(tier, {}).get(feature, False)

	@staticmethod
	def get_allowed_rebranding_modes() -> list[str]:
		tier = LicenseService.get_tier()
		return LicenseService.TIER_FEATURES.get(tier, {}).get("rebranding_modes", ["ARKAN Defaults"])

	@staticmethod
	def get_custom_css_limit() -> int:
		tier = LicenseService.get_tier()
		return LicenseService.TIER_FEATURES.get(tier, {}).get("custom_css_limit", 5120)

	@staticmethod
	def _validate_key(settings) -> bool:
		key = settings.get("license_key")
		if not key:
			return False
		valid_until = settings.get("license_valid_until")
		if valid_until and frappe.utils.getdate(valid_until) < frappe.utils.today():
			return False
		return len(str(key)) >= 32
