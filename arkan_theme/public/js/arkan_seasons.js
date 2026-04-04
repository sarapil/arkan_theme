// Copyright (c) 2024, Moataz M Hassan (Arkan Lab)
// Developer Website: https://arkan.it.com
// License: MIT
// For license information, please see license.txt

// ARKAN Seasons — Cyber seasonal color variations
(function() {
    "use strict";
    window.arkan = window.arkan || {};
    arkan.seasons = {
        init: function() {
            const month = new Date().getMonth();
            const body = document.body;
            if (month === 0) body.classList.add('arkan-season-newyear');
            if (month === 2 || month === 3) body.classList.add('arkan-season-ramadan');
            if (month === 11) body.classList.add('arkan-season-national');
        }
    };
    $(document).on('app_ready', () => arkan.seasons.init());
})();
