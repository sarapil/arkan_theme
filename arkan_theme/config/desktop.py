# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

from frappe import _

def get_data():
    return [
        {
            "module_name": "ARKAN Theme",
            "color": "#DDA46F",
            "icon": "octicon octicon-paintbrush",
            "type": "module",
            "label": _("ARKAN Theme")
        }
    ]
