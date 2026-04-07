# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

"""
ARKAN Theme — Custom Exception Hierarchy
Arkan Theme Exceptions
"""

import frappe


class ArkanThemeError(Exception):
    """ARKAN Theme base exception — all app-specific errors inherit from this."""

    def __init__(self, message=None, title=None):
        self.message = message or frappe._("An error occurred in ARKAN Theme")
        self.title = title or frappe._("ARKAN Theme Error")
        super().__init__(self.message)


class ValidationError(ArkanThemeError):
    """Raised when input validation fails."""

    def __init__(self, message=None, field=None):
        self.field = field
        super().__init__(
            message or frappe._("Validation failed"),
            title=frappe._("Validation Error"),
        )


class NotFoundError(ArkanThemeError):
    """Raised when a requested resource is not found."""

    def __init__(self, doctype=None, name=None):
        msg = frappe._("{0} {1} not found").format(doctype or "Record", name or "")
        super().__init__(msg, title=frappe._("Not Found"))


class PermissionError(ArkanThemeError):
    """Raised when user lacks required permissions."""

    def __init__(self, action=None, doctype=None):
        msg = frappe._("You do not have permission to {0} {1}").format(
            action or "access", doctype or "this resource"
        )
        super().__init__(msg, title=frappe._("Permission Denied"))


class ConfigurationError(ArkanThemeError):
    """Raised when app configuration is incomplete or invalid."""

    def __init__(self, setting=None):
        msg = frappe._("Configuration error{0}").format(
            f": {setting}" if setting else ""
        )
        super().__init__(msg, title=frappe._("Configuration Error"))


class IntegrationError(ArkanThemeError):
    """Raised when external service communication fails."""

    def __init__(self, service=None, detail=None):
        msg = frappe._("Integration error with {0}{1}").format(
            service or "external service",
            f" — {detail}" if detail else "",
        )
        super().__init__(msg, title=frappe._("Integration Error"))
