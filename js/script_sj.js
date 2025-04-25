document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
    
    // Slideshow functionality (placeholder)
    let slideIndex = 0;
    
    function showSlides() {
        // Will be implemented when images are provided
    }
    
    // CTA button event
    const ctaButton = document.querySelector('.cta button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert("You'll be connected with our stylists soon.");
        });
    }
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});