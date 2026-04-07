# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

"""
Arkan Theme — Seed Data
Runs on `after_migrate` to ensure reference data exists.
"""

import frappe

from arkan_theme.services.media_service import ARKAN_APPS


def seed_data():
	"""Idempotent seed — ensure ARKAN Settings defaults are populated."""
	try:
		doc = frappe.get_doc("ARKAN Settings")
		# Ensure new v18 fields have defaults
		changed = False
		defaults = {
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
		for field, default_val in defaults.items():
			if not doc.get(field):
				doc.set(field, default_val)
				changed = True
		if changed:
			doc.save(ignore_permissions=True)
			frappe.logger().info("Arkan Theme: seed_data() — set v18 defaults")
		else:
			frappe.logger().info("Arkan Theme: seed_data() — defaults already set")
	except Exception:
		frappe.logger().info("Arkan Theme: seed_data() — ARKAN Settings not yet created")
