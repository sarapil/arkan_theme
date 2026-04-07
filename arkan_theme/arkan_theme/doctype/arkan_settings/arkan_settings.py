# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class ARKANSettings(Document):
	"""ARKAN Theme Settings — Single DocType for runtime theme customization."""

	def validate(self):
		self._validate_splash_duration()
		self._validate_rebranding_mode()
		self._validate_custom_css_limit()

	def _validate_splash_duration(self):
		if self.splash_duration and self.splash_duration < 500:
			frappe.throw(_("Splash duration must be at least 500ms"))
		if self.splash_duration and self.splash_duration > 10000:
			frappe.throw(_("Splash duration must not exceed 10000ms"))

	def _validate_rebranding_mode(self):
		"""Enforce tier restrictions on rebranding mode."""
		from arkan_theme.services.license_service import LicenseService

		allowed = LicenseService.get_allowed_rebranding_modes()
		mode = self.rebranding_mode or "ARKAN Defaults"
		if mode not in allowed:
			frappe.throw(
				_("Rebranding mode '{0}' requires a higher license tier. Allowed: {1}").format(
					mode, ", ".join(allowed)
				)
			)

	def _validate_custom_css_limit(self):
		"""Enforce CSS size limit on Free tier."""
		from arkan_theme.services.license_service import LicenseService

		limit = LicenseService.get_custom_css_limit()
		if limit and self.custom_css and len(self.custom_css) > limit:
			frappe.throw(
				_("Custom CSS exceeds {0} byte limit for current tier. Upgrade for unlimited.").format(limit)
			)

	def on_update(self):
		"""Clear cache when settings are updated so changes take effect."""
		frappe.clear_cache()


@frappe.whitelist()
def get_arkan_settings():
	"""Return ARKAN settings as dict for boot/JS consumption."""
	frappe.only_for(["System Manager"])
	from arkan_theme.boot import _get_settings
	return _get_settings()
