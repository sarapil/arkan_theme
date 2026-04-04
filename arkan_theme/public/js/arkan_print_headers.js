// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Print Headers
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.printHeaders = {
        init: function() {
            // Inject brand header for print layouts
            if (typeof frappe !== 'undefined') {
                frappe.ui.form.on('Print Format', { refresh: function(frm) { /* Add ARKAN branding to print */ } });
            }
        }
    };
})();
