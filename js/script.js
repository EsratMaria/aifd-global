document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'block';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.style.display = 'none';
            }
        });
    }
    
    // Navigation arrows for course section
    const courseContainer = document.querySelector('.course-cards');
    const courseLeftArrow = document.querySelector('.courses .nav-arrow.left');
    const courseRightArrow = document.querySelector('.courses .nav-arrow.right');
    
    if (courseLeftArrow && courseRightArrow && courseContainer) {
        courseLeftArrow.addEventListener('click', () => {
            courseContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        courseRightArrow.addEventListener('click', () => {
            courseContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Navigation arrows for instructor section
    const instructorContainer = document.querySelector('.instructor-cards');
    const instructorLeftArrow = document.querySelector('.instructors .nav-arrow.left');
    const instructorRightArrow = document.querySelector('.instructors .nav-arrow.right');
    
    if (instructorLeftArrow && instructorRightArrow && instructorContainer) {
        instructorLeftArrow.addEventListener('click', () => {
            instructorContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        instructorRightArrow.addEventListener('click', () => {
            instructorContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Navigation arrows for testimonial section
    const testimonialContainer = document.querySelector('.testimonial-cards');
    const testimonialLeftArrow = document.querySelector('.testimonials .nav-arrow.left');
    const testimonialRightArrow = document.querySelector('.testimonials .nav-arrow.right');
    
    if (testimonialLeftArrow && testimonialRightArrow && testimonialContainer) {
        testimonialLeftArrow.addEventListener('click', () => {
            testimonialContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        testimonialRightArrow.addEventListener('click', () => {
            testimonialContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Add touch swiping for mobile users
    const scrollContainers = [courseContainer, instructorContainer, testimonialContainer];
    
    scrollContainers.forEach(container => {
        if (!container) return;
        
        let startX;
        let scrollLeft;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        container.addEventListener('touchend', () => {
            startX = null;
        });
    });

    // Student data as provided
    const students = [
        { name: 'Faria Alam Biva', title: 'Private Job', image: 'resources/students/Faria Alam Biva(Private job).jpg' },
        { name: 'Kazi Sirajus Salekin', title: 'Buying House', image: 'resources/students/Kazi Sirajus Salekin(Works at Buying house).jpg' },
        { name: 'Saima Islam Saba', title: 'Student', image: 'resources/students/Saima Islam Saba(Class 8).jpg' }
    ];

    // Populate student cards
    const studentCardsContainer = document.querySelector('.student-cards');

    if (studentCardsContainer) {
        studentCardsContainer.innerHTML = '';
        
        students.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card';
            
            card.innerHTML = `
                <img src="${student.image}" alt="${student.name}">
                <h3>${student.name}</h3>
                <p class="student-title">${student.title}</p>
            `;
            
            studentCardsContainer.appendChild(card);
        });
        
        // Center-align for desktop if few students
        if (students.length <= 4 && window.innerWidth >= 992) {
            studentCardsContainer.style.justifyContent = 'center';
        }
    }

    // Navigation arrows for student section (unchanged)
    const studentContainer = document.querySelector('.student-cards');
    const studentLeftArrow = document.querySelector('.students .nav-arrow.left');
    const studentRightArrow = document.querySelector('.students .nav-arrow.right');

    if (studentLeftArrow && studentRightArrow && studentContainer) {
        studentLeftArrow.addEventListener('click', () => {
            studentContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        studentRightArrow.addEventListener('click', () => {
            studentContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // Touch swiping for students section (unchanged)
    if (studentContainer) {
        let startX;
        let scrollLeft;
        
        studentContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - studentContainer.offsetLeft;
            scrollLeft = studentContainer.scrollLeft;
        }, { passive: true });
        
        studentContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - studentContainer.offsetLeft;
            const walk = (x - startX) * 2;
            studentContainer.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        studentContainer.addEventListener('touchend', () => {
            startX = null;
        });
    }

    // Update layout on window resize
    window.addEventListener('resize', () => {
        if (studentCardsContainer) {
            if (students.length <= 4 && window.innerWidth >= 992) {
                studentCardsContainer.style.justifyContent = 'center';
            } else if (window.innerWidth >= 992) {
                studentCardsContainer.style.justifyContent = 'center';
            } else {
                studentCardsContainer.style.justifyContent = 'flex-start';
            }
        }
    });
    
    // Sample instructor data - replace with actual data
    const instructors = [
        { name: 'Jane Smith', title: 'Fashion Designer', image: 'resources/instructor1.jpg' },
        { name: 'John Doe', title: 'Pattern Master', image: 'resources/instructor2.jpg' },
        { name: 'Sarah Johnson', title: 'Creative Director', image: 'resources/instructor3.jpg' },
        { name: 'Michael Brown', title: 'Textile Expert', image: 'resources/instructor4.jpg' },
        { name: 'Emily Wilson', title: 'Fashion Illustrator', image: 'resources/instructor5.jpg' },
        { name: 'David Clark', title: 'Industry Consultant', image: 'resources/instructor6.jpg' },
        { name: 'Laura Green', title: 'Fashion Stylist', image: 'resources/instructor7.jpg' }
    ];
    
    // Populate instructor cards
    const instructorCardsContainer = document.querySelector('.instructor-cards');
    
    if (instructorCardsContainer) {
        instructorCardsContainer.innerHTML = '';
        
        instructors.forEach(instructor => {
            const card = document.createElement('div');
            card.className = 'instructor-card';
            
            card.innerHTML = `
                <img src="${instructor.image}" alt="${instructor.name}">
                <h3>${instructor.name}</h3>
                <p>${instructor.title}</p>
            `;
            
            instructorCardsContainer.appendChild(card);
        });
    }
    
    // Create a sticky header effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Detect viewport size changes and adjust UI accordingly
    function handleResize() {
        if (window.innerWidth > 992 && mobileMenu) {
            mobileMenu.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Ensure video loads and plays properly
    // Video handling
    const heroVideo = document.getElementById('heroVideo');
    const muteToggle = document.getElementById('muteToggle');

    if (heroVideo && muteToggle) {
        // Start muted (required for autoplay)
        heroVideo.muted = true;
        
        // Check if video is loaded
        heroVideo.addEventListener('loadeddata', function() {
            console.log("Video loaded successfully");
        });
        
        // Log any errors that occur
        heroVideo.addEventListener('error', function(e) {
            console.error("Video error:", heroVideo.error);
        });
        
        // Handle play errors
        heroVideo.play().catch(function(error) {
            console.error("Play error:", error);
            // Add fallback controls if autoplay fails
            heroVideo.controls = true;
        });
        
        // Mute toggle functionality
        muteToggle.addEventListener('click', function() {
            heroVideo.muted = !heroVideo.muted;
            
            if (heroVideo.muted) {
                muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }
});