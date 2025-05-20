
/**
 * Coursa Website JavaScript
 * Enhanced functionality for mobile navigation and course filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality with smooth animation
    initializeMobileMenu();
    
    // Course filtering functionality
    initializeCourseFilters();
    
    // Initialize FAQ accordion functionality
    initializeFaqAccordion();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize course search functionality
    initializeCourseSearch();
});

/**
 * Mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            // Toggle icon between bars and X
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Course filtering functionality
 */
function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    // Create course data with platform information
    const courseData = [
        {
            element: courseCards[0],
            title: "Python for Everybody",
            platform: "Coursera",
            category: "Technology"
        },
        {
            element: courseCards[1],
            title: "Machine Learning",
            platform: "Coursera",
            category: "Technology" 
        },
        {
            element: courseCards[2],
            title: "Financial Markets",
            platform: "Coursera",
            category: "Business"
        },
        {
            element: courseCards[3], 
            title: "The Complete Digital Marketing Course",
            platform: "Udemy",
            category: "Business"
        }
    ];
    
    // Add data attributes to course cards for easier filtering
    courseData.forEach(course => {
        course.element.setAttribute('data-platform', course.platform);
        course.element.setAttribute('data-category', course.category);
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.textContent.trim();
            
            // Filter courses based on selection
            courseData.forEach(course => {
                if (filterType === 'All Courses') {
                    course.element.style.display = 'block';
                } else if (filterType === 'Coursera' && course.platform === 'Coursera') {
                    course.element.style.display = 'block';
                } else if (filterType === 'Udemy' && course.platform === 'Udemy') {
                    course.element.style.display = 'block';
                } else if (filterType === 'Business' && course.category === 'Business') {
                    course.element.style.display = 'block';
                } else if (filterType === 'Technology' && course.category === 'Technology') {
                    course.element.style.display = 'block';
                } else {
                    course.element.style.display = 'none';
                }
            });
            
            // Animation for filtered results
            animateFilteredResults();
        });
    });
}

/**
 * Animate course cards when filtered
 */
function animateFilteredResults() {
    const visibleCourses = document.querySelectorAll('.course-card[style="display: block;"]');
    
    visibleCourses.forEach((course, index) => {
        course.style.opacity = '0';
        course.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            course.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            course.style.opacity = '1';
            course.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFaqAccordion() {
    const detailsElements = document.querySelectorAll('#faq details');
    
    detailsElements.forEach(detail => {
        detail.addEventListener('toggle', function() {
            const summary = this.querySelector('summary');
            const content = this.querySelector('p');
            
            if (this.open) {
                summary.style.fontWeight = '700';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                summary.style.fontWeight = '600';
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        });
    });
}

/**
 * Initialize smooth scrolling for navigation
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .hero-btns a, .cta a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scroll for on-page links
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Close mobile menu if open
                    document.querySelector('.nav-links').classList.remove('show');
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize course search functionality
 */
function initializeCourseSearch() {
    // Create search box
    const searchContainer = document.createElement('div');
    searchContainer.className = 'course-search';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search courses..." class="search-input">
        <button class="search-btn"><i class="fas fa-search"></i></button>
    `;
    
    // Insert before course filters
    const courseFilters = document.querySelector('.course-filters');
    courseFilters.parentNode.insertBefore(searchContainer, courseFilters);
    
    // Add CSS for search box
    const style = document.createElement('style');
    style.textContent = `
        .course-search {
            margin-bottom: 20px;
            display: flex;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        .search-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            font-size: 16px;
        }
        .search-btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 0 15px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Add search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn:first-child').classList.add('active');
        
        // Animate results
        animateFilteredResults();
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

