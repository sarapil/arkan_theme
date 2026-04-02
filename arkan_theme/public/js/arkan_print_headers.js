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
