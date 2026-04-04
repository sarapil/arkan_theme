# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

"""
ARKAN Theme — ThemeService
Theme compilation, CSS variable management, brand color application.
"""

import frappe
from frappe import _


class ThemeService:
    """Theme compilation, CSS variable management, brand color application."""

    @staticmethod
    def get_list(**filters):
        """Return filtered list of records."""
        raise NotImplementedError

    @staticmethod
    def get_detail(name: str) -> dict:
        """Return single record detail."""
        raise NotImplementedError

    @staticmethod
    def create(**kwargs) -> str:
        """Create new record. Returns document name."""
        raise NotImplementedError

    @staticmethod
    def update(name: str, **kwargs) -> None:
        """Update existing record."""
        raise NotImplementedError
