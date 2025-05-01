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
    
    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slideshow-slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    
    // Create dots for each slide
    if (slides.length > 0 && dotsContainer) {
        dotsContainer.innerHTML = ''; // Clear any existing dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                showSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Get all dots after they've been created
    const dots = document.querySelectorAll('.dot');
    
    // Function to show a specific slide
    function showSlide(n) {
        // Reset index if out of bounds
        if (n >= slides.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = n;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        slides[slideIndex].style.display = 'block';
        slides[slideIndex].classList.add('active');
        if (dots.length > 0) {
            dots[slideIndex].classList.add('active');
        }
    }
    
    // Function to advance slide
    function nextSlide() {
        showSlide(slideIndex + 1);
    }
    
    // Initialize slideshow
    showSlide(0);
    
    // Auto advance slides every 5 seconds
    let slideshowInterval = setInterval(nextSlide, 5000);
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideshowInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideshowInterval = setInterval(nextSlide, 5000);
        });
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
    
    // Swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    function checkSwipeDirection() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, go to next slide
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right, go to previous slide
            showSlide(slideIndex - 1);
        }
    }
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            checkSwipeDirection();
        });
    }
});