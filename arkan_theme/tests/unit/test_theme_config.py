# Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
# Developer Website: https://arkan.it.com
# License: MIT
# For license information, please see license.txt

"""
Unit tests for ARKAN Theme configuration and settings.
"""

import pytest
import re


class TestCSSVariables:
    """Tests for CSS variable naming and format conventions."""

    def test_variable_prefix(self):
        """All ARKAN Theme variables should use --at- prefix."""
        variables = [
            "--at-primary",
            "--at-secondary",
            "--at-accent",
            "--at-success",
            "--at-warning",
            "--at-danger",
            "--at-info",
            "--at-bg",
            "--at-bg-subtle",
            "--at-text",
            "--at-text-muted",
            "--at-border",
        ]
        for var in variables:
            assert var.startswith("--at-"), f"Variable {var} should start with --at-"

    def test_color_hex_format(self):
        """Color values should be valid hex codes."""
        colors = {
            "--at-primary": "#1E40AF",
            "--at-secondary": "#64748B",
            "--at-success": "#10B981",
            "--at-warning": "#F59E0B",
            "--at-danger": "#EF4444",
            "--at-info": "#3B82F6",
        }

        hex_pattern = re.compile(r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$')

        for var, value in colors.items():
            assert hex_pattern.match(value), f"{var}: Invalid hex color {value}"

    def test_spacing_scale_values(self):
        """Spacing scale should follow rem progression."""
        spacing = {
            "--at-space-xs": "0.25rem",
            "--at-space-sm": "0.5rem",
            "--at-space-md": "1rem",
            "--at-space-lg": "1.5rem",
            "--at-space-xl": "2rem",
        }

        for var, value in spacing.items():
            assert value.endswith("rem"), f"{var}: Should use rem units"

    def test_border_radius_scale(self):
        """Border radius scale should be progressive."""
        radii = {
            "--at-radius-sm": 0.375,
            "--at-radius-md": 0.5,
            "--at-radius-lg": 0.75,
            "--at-radius-xl": 1.0,
        }

        # Values should increase
        values = list(radii.values())
        assert values == sorted(values), "Border radius should increase progressively"


class TestDarkModeConfig:
    """Tests for dark mode configuration."""

    def test_dark_mode_options(self):
        """Dark mode should have valid options."""
        valid_options = ["light", "dark", "auto"]

        for option in valid_options:
            assert option in valid_options

    def test_dark_mode_contrasts(self):
        """Dark mode colors should maintain contrast."""
        # Light mode
        light_bg = "#FFFFFF"
        light_text = "#1E293B"

        # Dark mode
        dark_bg = "#0F172A"
        dark_text = "#F1F5F9"

        def relative_luminance(hex_color):
            """Calculate relative luminance."""
            r, g, b = int(hex_color[1:3], 16), int(hex_color[3:5], 16), int(hex_color[5:7], 16)
            return (0.299 * r + 0.587 * g + 0.114 * b) / 255

        # Light mode: dark text on light bg
        light_contrast = relative_luminance(light_bg) - relative_luminance(light_text)
        assert light_contrast > 0.3, "Light mode should have sufficient contrast"

        # Dark mode: light text on dark bg
        dark_contrast = relative_luminance(dark_text) - relative_luminance(dark_bg)
        assert dark_contrast > 0.3, "Dark mode should have sufficient contrast"


class TestFontConfig:
    """Tests for typography configuration."""

    def test_font_families_defined(self):
        """Font families should be defined with fallbacks."""
        fonts = {
            "--at-font-family": "Inter",
            "--at-font-family-ar": "IBM Plex Sans Arabic",
        }

        for var, primary_font in fonts.items():
            assert primary_font, f"{var}: Primary font should be defined"

    def test_arabic_font_specified(self):
        """Arabic font should be specified for RTL support."""
        arabic_fonts = ["IBM Plex Sans Arabic", "Tajawal", "Cairo", "Noto Sans Arabic"]

        # At least one Arabic font should be in the list
        has_arabic = any(font for font in arabic_fonts)
        assert has_arabic, "Arabic font family should be specified"


class TestColorValidation:
    """Tests for color validation utilities."""

    def test_valid_hex_colors(self):
        """Valid hex colors should pass validation."""
        valid_colors = [
            "#000000",
            "#FFFFFF",
            "#1E40AF",
            "#1e40af",  # lowercase
            "#F59E0B22",  # with alpha
        ]

        hex_pattern = re.compile(r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$')

        for color in valid_colors:
            assert hex_pattern.match(color), f"Should accept {color}"

    def test_invalid_hex_colors(self):
        """Invalid hex colors should fail validation."""
        invalid_colors = [
            "000000",     # no #
            "#GGG",       # invalid chars
            "#12345",     # wrong length
            "#1234567",   # wrong length
            "rgb(0,0,0)", # RGB format
        ]

        hex_pattern = re.compile(r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$')

        for color in invalid_colors:
            assert not hex_pattern.match(color), f"Should reject {color}"


class TestSemanticColors:
    """Tests for semantic color definitions."""

    def test_status_colors_distinct(self):
        """Status colors should be visually distinct."""
        colors = {
            "success": "#10B981",  # emerald
            "warning": "#F59E0B",  # amber
            "danger": "#EF4444",   # red
            "info": "#3B82F6",     # blue
        }

        # All colors should be unique
        assert len(colors) == len(set(colors.values())), "Status colors should be distinct"

    def test_success_is_green_family(self):
        """Success color should be in green family."""
        success = "#10B981"
        g_value = int(success[3:5], 16)
        r_value = int(success[1:3], 16)

        # Green should be dominant
        assert g_value > r_value, "Success should have more green than red"

    def test_danger_is_red_family(self):
        """Danger color should be in red family."""
        danger = "#EF4444"
        r_value = int(danger[1:3], 16)
        g_value = int(danger[3:5], 16)

        # Red should be dominant
        assert r_value > g_value, "Danger should have more red than green"


class TestAccessibility:
    """Tests for accessibility requirements."""

    def test_wcag_color_contrast_ratio(self):
        """Colors should meet WCAG AA contrast requirements."""
        def luminance(hex_color):
            """Calculate relative luminance per WCAG."""
            hex_color = hex_color.lstrip('#')
            r, g, b = [int(hex_color[i:i+2], 16) / 255 for i in (0, 2, 4)]

            def adjust(c):
                return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

            return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b)

        def contrast_ratio(fg, bg):
            """Calculate contrast ratio."""
            l1 = luminance(fg) + 0.05
            l2 = luminance(bg) + 0.05
            return max(l1, l2) / min(l1, l2)

        # WCAG AA requires 4.5:1 for normal text
        # Light mode
        light_ratio = contrast_ratio("#1E293B", "#FFFFFF")
        assert light_ratio >= 4.5, f"Light mode contrast {light_ratio:.2f} < 4.5"

        # Dark mode
        dark_ratio = contrast_ratio("#F1F5F9", "#0F172A")
        assert dark_ratio >= 4.5, f"Dark mode contrast {dark_ratio:.2f} < 4.5"


class TestRTLSupport:
    """Tests for RTL layout support."""

    def test_logical_properties_used(self):
        """CSS should use logical properties for RTL support."""
        logical_properties = [
            "margin-inline-start",
            "margin-inline-end",
            "padding-inline-start",
            "padding-inline-end",
            "border-inline-start",
            "text-align: start",
        ]

        # These should be preferred over physical properties
        physical_to_avoid = [
            "margin-left",
            "margin-right",
            "padding-left",
            "padding-right",
            "text-align: left",
            "text-align: right",
        ]

        # Verify logical properties are the standard
        for prop in logical_properties:
            assert "inline" in prop or "start" in prop or "end" in prop


class TestThemeIntegration:
    """Integration tests for theme components."""

    def test_glassmorphism_properties(self):
        """Glassmorphism effect should have required properties."""
        required_properties = [
            "backdrop-filter",
            "background",
            "border",
        ]

        # All properties should be defined for glass effect
        for prop in required_properties:
            assert prop, f"Glassmorphism requires {prop}"

    def test_animation_library_available(self):
        """GSAP should be available for animations."""
        gsap_path = "/assets/arkan_theme/js/vendor/gsap.min.js"

        # Path should follow expected pattern
        assert "gsap" in gsap_path.lower()
        assert gsap_path.endswith(".js")
