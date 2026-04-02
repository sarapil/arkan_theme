// ARKAN Forms — Timeline scroll reveal
(function() {
    "use strict";
    window.arkan = window.arkan || {};

    arkan.forms = {
        init: function() {
            this.observeTimeline();
        },

        observeTimeline: function() {
            if (!('IntersectionObserver' in window)) return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('arkan-animate-in');
                        observer.unobserve(e.target);
                    }
                });
            }, { threshold: 0.1 });

            // Observe form timeline items
            document.querySelectorAll('.timeline-item, .form-section').forEach(el => observer.observe(el));
        }
    };

    // Re-init on form render
    $(document).on('form-render', () => { setTimeout(() => arkan.forms.init(), 200); });
})();
