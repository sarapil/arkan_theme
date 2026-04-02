// ARKAN Interactive Grid — Click-to-highlight neural nodes
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.interactiveGrid = {
        init: function() {
            document.addEventListener('click', (e) => {
                if (!arkan.neuralGrid || !arkan.neuralGrid.nodes) return;
                const x = e.clientX, y = e.clientY;
                // Pulse nearest nodes
                arkan.neuralGrid.nodes.forEach(node => {
                    const dist = Math.hypot(node.x - x, node.y - y);
                    if (dist < 100) {
                        node.radius = 5;
                        setTimeout(() => { node.radius = Math.random() * 2 + 1; }, 500);
                    }
                });
            });
        }
    };

    $(document).on('app_ready', () => arkan.interactiveGrid.init());
})();
