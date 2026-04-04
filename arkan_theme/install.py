# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

"""
ARKAN Theme — Post-Install Setup
Runs after `bench install-app arkan_theme`.
"""

import frappe
from frappe import _


def after_install():
    """Post-installation setup for ARKAN Theme."""
    # ── Desktop Icon injection (Frappe v16 /desk) ──
    from arkan_theme.desktop_utils import inject_app_desktop_icon
    inject_app_desktop_icon(
        app="arkan_theme",
        label="ARKAN Theme",
        route="/desk/arkan-settings",
        logo_url="/assets/arkan_theme/images/arkan_theme-logo.svg",
        bg_color="#1E40AF",
    )
    print(f"✅ {_("ARKAN Theme")}: post-install complete")


def inject_desktop_icon():
    """Create desktop shortcut icon for ARKAN Theme."""
    if frappe.db.exists("Desktop Icon", {"module_name": "ARKAN Theme"}):
        return

    try:
        frappe.get_doc({
            "doctype": "Desktop Icon",
            "module_name": "ARKAN Theme",
            "label": _("ARKAN Theme"),
            "icon": "octicon octicon-bookmark",
            "color": "#1E40AF",
            "type": "module",
            "standard": 1,
        }).insert(ignore_permissions=True)
    except Exception:
        pass  # May not exist in all Frappe versions
