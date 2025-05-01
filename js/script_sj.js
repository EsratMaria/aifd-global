document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Collection dropdown functionality - Mobile only
    const collectionLink = document.querySelector('.collection-link');
    const collectionSubmenu = document.querySelector('.has-submenu');
    const submenuOverlay = document.querySelector('.submenu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const backBtn = document.querySelector('.back-btn');
    
    // Mobile-only event handling for collection menu
    if (window.innerWidth <= 768) {
        if (collectionLink) {
            collectionLink.addEventListener('click', function(e) {
                e.preventDefault();
                collectionSubmenu.classList.toggle('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            });
        }
    }
    
    if (submenuOverlay) {
        submenuOverlay.addEventListener('click', function() {
            collectionSubmenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            collectionSubmenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            collectionSubmenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Update event handling when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Desktop behavior
            if (collectionLink) {
                collectionLink.removeEventListener('click', function(e) {
                    e.preventDefault();
                    collectionSubmenu.classList.toggle('active');
                });
            }
        } else {
            // Mobile behavior
            if (collectionLink) {
                collectionLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    collectionSubmenu.classList.toggle('active');
                });
            }
        }
    });
    
    // Collection sliders functionality
    const sliders = document.querySelectorAll('.collection-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelector('.collection-slides');
        const slideElements = slider.querySelectorAll('.collection-slide');
        
        if (slideElements.length <= 1) return; // Skip if only one slide
        
        let currentIndex = 0;
        let startX;
        let touchStartX;
        let touchEndX;
        
        // Clone first and last slides for infinite effect
        const firstSlideClone = slideElements[0].cloneNode(true);
        const lastSlideClone = slideElements[slideElements.length - 1].cloneNode(true);
        
        slides.appendChild(firstSlideClone);
        slides.insertBefore(lastSlideClone, slideElements[0]);
        
        // Update slides after cloning
        const allSlides = slider.querySelectorAll('.collection-slide');
        
        // Position slides at first real slide (index 1 after cloning)
        slides.style.transform = `translateX(-100%)`;
        
        // Function to move to a specific slide
        function goToSlide(index) {
            currentIndex = index;
            slides.style.transition = 'transform 0.5s ease';
            slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        }
        
        // Function to handle transition end
        function handleTransitionEnd() {
            // If we transitioned to the clone of the first slide, jump to the real first slide
            if (currentIndex === allSlides.length - 2) {
                slides.style.transition = 'none';
                currentIndex = 0;
                slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            }
            
            // If we transitioned to the clone of the last slide, jump to the real last slide
            if (currentIndex === -1) {
                slides.style.transition = 'none';
                currentIndex = allSlides.length - 3;
                slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            }
        }
        
        // Event listeners for touch
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            
            if (touchEndX < touchStartX - 50) {
                goToSlide(currentIndex + 1);
            }
            
            if (touchEndX > touchStartX + 50) {
                goToSlide(currentIndex - 1);
            }
        });
        
        // Transition end event
        slides.addEventListener('transitionend', handleTransitionEnd);
        
        // Auto slide every 5 seconds
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
    
    // Slideshow functionality for main banner
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
    
    // Swipe functionality for mobile devices on main slideshow
    let mainTouchStartX = 0;
    let mainTouchEndX = 0;
    
    function checkMainSwipeDirection() {
        if (mainTouchEndX < mainTouchStartX - 50) {
            // Swipe left, go to next slide
            nextSlide();
        }
        if (mainTouchEndX > mainTouchStartX + 50) {
            // Swipe right, go to previous slide
            showSlide(slideIndex - 1);
        }
    }
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', e => {
            mainTouchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', e => {
            mainTouchEndX = e.changedTouches[0].screenX;
            checkMainSwipeDirection();
        });
    }
});