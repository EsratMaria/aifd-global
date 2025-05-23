document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Collection dropdown functionality
    const collectionLink = document.querySelector('.collection-link');
    const collectionSubmenu = document.querySelector('.has-submenu');
    const submenuOverlay = document.querySelector('.submenu-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const backBtn = document.querySelector('.back-btn');
    
    // Collection link click handler - different for mobile and desktop
    if (collectionLink) {
        collectionLink.addEventListener('click', function(e) {
            // Only prevent default and toggle submenu on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                collectionSubmenu.classList.toggle('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    }
    
    // Close and back buttons for mobile
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
    
    // Close submenu when clicking overlay
    if (submenuOverlay) {
        submenuOverlay.addEventListener('click', function() {
            collectionSubmenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Collection sliders functionality
    const sliders = document.querySelectorAll('.collection-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelector('.collection-slides');
        const slideElements = slider.querySelectorAll('.collection-slide');
        
        if (slideElements.length <= 1) return; // Skip if only one slide
        
        let currentIndex = 0;
        let touchStartX;
        let touchEndX;
        
        // Clone first and last slides for infinite effect if multiple slides
        if (slideElements.length > 1) {
            const firstSlideClone = slideElements[0].cloneNode(true);
            const lastSlideClone = slideElements[slideElements.length - 1].cloneNode(true);
            
            slides.appendChild(firstSlideClone);
            slides.insertBefore(lastSlideClone, slideElements[0]);
            
            // Update slides after cloning
            const allSlides = slider.querySelectorAll('.collection-slide');
            
            // Position slides at first real slide (index 1 after cloning)
            slides.style.transform = `translateX(-100%)`;
            
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
            
            // Transition end event
            slides.addEventListener('transitionend', handleTransitionEnd);
        }
    });
    
    // NEW: Looks Slider functionality
    const looksSlider = document.querySelector('.looks-slider');
    if (looksSlider) {
        const prevButton = document.querySelector('.slider-prev');
        const nextButton = document.querySelector('.slider-next');
        const slides = document.querySelectorAll('.look-slide');
        
        // Skip if no slides
        if (slides.length === 0) return;
        
        let currentPosition = 0;
        let slidesToShow = getSlidesToShow();
        
        // Get number of slides to show based on screen width
        function getSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4; // Default for desktop
        }
        
        // Update on window resize
        window.addEventListener('resize', () => {
            slidesToShow = getSlidesToShow();
            updateSliderPosition();
        });
        
        // Initialize slider position
        updateSliderPosition();
        
        // Click events for navigation buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                navigateSlider(-slidesToShow);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                navigateSlider(slidesToShow);
            });
        }
        
        // Touch events for swiping
        let touchStartX, touchEndX;
        
        looksSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        looksSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            if (touchEndX < touchStartX - 50) {
                // Swipe left - go next
                navigateSlider(slidesToShow);
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right - go prev
                navigateSlider(-slidesToShow);
            }
        });
        
        // Function to navigate the slider
        function navigateSlider(step) {
            currentPosition += step;
            
            // Handle bounds
            if (currentPosition > slides.length - slidesToShow) {
                currentPosition = 0;
            } else if (currentPosition < 0) {
                currentPosition = Math.max(0, slides.length - slidesToShow);
            }
            
            updateSliderPosition();
        }
        
        // Update the slider position
        function updateSliderPosition() {
            const slideWidth = 100 / slidesToShow;
            looksSlider.style.transform = `translateX(-${currentPosition * slideWidth}%)`;
        }
    }
    
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
        if (slides.length > 0) {
            slides[slideIndex].style.display = 'block';
            slides[slideIndex].classList.add('active');
        }
        
        if (dots.length > 0) {
            dots[slideIndex].classList.add('active');
        }
    }
    
    // Function to advance slide
    function nextSlide() {
        showSlide(slideIndex + 1);
    }
    
    // Initialize slideshow
    if (slides.length > 0) {
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
            
            // Swipe functionality for main slideshow
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
            
            slideshowContainer.addEventListener('touchstart', e => {
                mainTouchStartX = e.changedTouches[0].screenX;
            });
            
            slideshowContainer.addEventListener('touchend', e => {
                mainTouchEndX = e.changedTouches[0].screenX;
                checkMainSwipeDirection();
            });
        }
    }
    
    // CTA button event
    const ctaButton = document.querySelector('.cta button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert("You'll be connected with our stylists soon.");
        });
    }
    
    // Handle window resize - remove active class on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (collectionSubmenu && collectionSubmenu.classList.contains('active')) {
                collectionSubmenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });

    // Coming Soon Page Functionality
    // Check if countdown elements exist before trying to use them
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const countdownContainer = document.querySelector(".countdown");
    
    if (daysElement && hoursElement && minutesElement && secondsElement) {
        // Set the date we're counting down to (30 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 30);
        
        // Update the countdown every 1 second
        const countdown = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countDownDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result with leading zeros
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // If the countdown is finished
            if (distance < 0) {
                clearInterval(countdown);
                if (countdownContainer) {
                    countdownContainer.innerHTML = "LAUNCHING TODAY!";
                }
            }
        }, 1000);
    }
    
    // Subscribe form handling
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you! You will be notified when we launch.');
                this.reset();
            }
        });
    }

    // IMPROVED: Search icon functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');

    if (searchToggle && searchBox) {
        // Toggle search box when clicking the search icon
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Stop event from bubbling
            searchBox.classList.toggle('active');
            
            // Focus the input when opening
            if (searchBox.classList.contains('active') && searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
        
        // Prevent search box from closing when clicking inside it
        searchBox.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    // Here you would normally redirect to search results
                    alert('Searching for: ' + searchTerm);
                    // window.location.href = '/search?q=' + encodeURIComponent(searchTerm);
                }
            });
        }

        // Close search box when clicking outside
        document.addEventListener('click', function() {
            if (searchBox.classList.contains('active')) {
                searchBox.classList.remove('active');
            }
        });
    }

    // IMPROVED: Currency converter functionality
    const currencySelector = document.querySelector('.currency-selector');
    const currencyDropdown = document.querySelector('.currency-dropdown');
    const currencyOptions = document.querySelectorAll('.currency-option');
    const currentCurrencyDisplay = document.querySelector('.current-currency span');
    const currentCurrencyFlag = document.querySelector('.current-currency img');
    
    // Currency storage in local storage
    let currentCurrency = localStorage.getItem('selectedCurrency') || 'USD';
    let currentSymbol = localStorage.getItem('selectedSymbol') || '$';
    let currentRate = parseFloat(localStorage.getItem('selectedRate')) || 1;
    
    // Initialize the display with stored currency or default
    if (currentCurrencyDisplay && currentCurrencyFlag) {
        currentCurrencyDisplay.textContent = `${currentCurrency} (${currentSymbol})`;
        
        // Update flag based on currency
        const flagCode = getCurrencyFlagCode(currentCurrency);
        currentCurrencyFlag.src = `https://flagcdn.com/16x12/${flagCode}.png`;
        
        // Convert prices on page load
        convertAllPrices();
    }
    
    if (currencySelector && currencyDropdown) {
        // Toggle currency dropdown
        currencySelector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currencyDropdown.classList.toggle('active');
        });
        
        // Prevent dropdown from closing when clicking inside it
        currencyDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (currencyDropdown.classList.contains('active')) {
                currencyDropdown.classList.remove('active');
            }
        });
        
        // Currency option selection
        currencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const newCurrency = this.getAttribute('data-currency');
                const newSymbol = this.getAttribute('data-symbol');
                const newRate = parseFloat(this.getAttribute('data-rate'));
                
                if (newCurrency !== currentCurrency) {
                    // Update current currency
                    currentCurrency = newCurrency;
                    currentSymbol = newSymbol;
                    currentRate = newRate;
                    
                    // Save to local storage
                    localStorage.setItem('selectedCurrency', currentCurrency);
                    localStorage.setItem('selectedSymbol', currentSymbol);
                    localStorage.setItem('selectedRate', currentRate);
                    
                    // Update display
                    if (currentCurrencyDisplay) {
                        currentCurrencyDisplay.textContent = `${currentCurrency} (${currentSymbol})`;
                    }
                    
                    // Update flag
                    if (currentCurrencyFlag) {
                        const flagCode = getCurrencyFlagCode(currentCurrency);
                        currentCurrencyFlag.src = `https://flagcdn.com/16x12/${flagCode}.png`;
                    }
                    
                    // Convert all prices
                    convertAllPrices();
                }
                
                // Close dropdown
                currencyDropdown.classList.remove('active');
            });
        });
    }
    
    // Helper function to get flag code from currency
    function getCurrencyFlagCode(currency) {
        switch(currency) {
            case 'BDT': return 'bd';
            case 'INR': return 'in';
            case 'AUD': return 'au';
            case 'USD': return 'us';
            case 'EUR': return 'eu';
            default: return 'us';
        }
    }
    
    // Function to convert all prices on the page
    function convertAllPrices() {
        // Target both generic price elements and specific product prices
        const priceElements = document.querySelectorAll('.price, .product-price');
        
        priceElements.forEach(element => {
            // Add converting class for animation
            element.classList.add('converting');
            
            // Get original price if stored, otherwise extract from current text
            let originalPrice;
            if (element.hasAttribute('data-original-price')) {
                originalPrice = parseFloat(element.getAttribute('data-original-price'));
            } else {
                // Extract numeric value from text
                const priceText = element.textContent.trim();
                
                // Handle "Tk. 25,000" format
                if (priceText.startsWith('Tk.')) {
                    const numericValue = priceText.replace('Tk.', '').replace(/,/g, '').trim();
                    originalPrice = parseFloat(numericValue);
                    // Store the base price in BDT for future conversions
                    element.setAttribute('data-original-currency', 'BDT');
                    element.setAttribute('data-original-price', originalPrice);
                } else {
                    // Handle other formats
                    const numericValue = priceText.replace(/[^0-9.]/g, '');
                    originalPrice = parseFloat(numericValue);
                    // Assume USD if not specified
                    element.setAttribute('data-original-currency', 'USD');
                    element.setAttribute('data-original-price', originalPrice);
                }
            }
            
            // Get the original currency to apply the correct conversion
            const originalCurrency = element.getAttribute('data-original-currency') || 'USD';
            
            if (!isNaN(originalPrice)) {
                let convertedPrice;
                
                // Convert from original currency to selected currency
                if (originalCurrency === 'BDT') {
                    // Convert from BDT to USD first (assuming rate is for BDT to USD)
                    const inUSD = originalPrice / 110.5; // Using the BDT rate from your data
                    // Then convert USD to target currency
                    convertedPrice = (inUSD * currentRate).toFixed(2);
                } else {
                    // Direct conversion if original is in USD
                    convertedPrice = (originalPrice * currentRate).toFixed(2);
                }
                
                // Format based on currency conventions
                const formattedPrice = formatPrice(convertedPrice);
                
                // Update the price display
                element.textContent = formattedPrice;
            }
            
            // Remove converting class after animation
            setTimeout(() => {
                element.classList.remove('converting');
            }, 500);
        });
    }
    
    // Helper function to format price based on currency
    function formatPrice(price) {
        const numPrice = parseFloat(price);
        
        // Format with thousand separators
        const formattedNumber = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numPrice);
        
        // Position symbol based on currency
        switch(currentCurrency) {
            case 'BDT':
                return `${currentSymbol} ${formattedNumber}`;
            case 'INR':
                return `${currentSymbol} ${formattedNumber}`;
            case 'AUD':
                return `${currentSymbol}${formattedNumber}`;
            case 'USD':
                return `${currentSymbol}${formattedNumber}`;
            case 'EUR':
                return `${formattedNumber} ${currentSymbol}`;
            default:
                return `${currentSymbol}${formattedNumber}`;
        }
    }
});