"""
ARKAN Theme — Permission Tests
Role-based access control and CAPS capability tests.
"""

import frappe
from frappe.tests import IntegrationTestCase


class TestATPermissions(IntegrationTestCase):
    """Permission and CAPS capability tests for ARKAN Theme."""

    def test_guest_cannot_access(self):
        """Guest users cannot access protected endpoints."""
        pass  # TODO: Implement
