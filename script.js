document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. THEME TOGGLER (Light/Dark Mode)
    // -----------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        // Toggle theme
        currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        // Add rotation animation
        themeToggle.classList.add('rotating');
        setTimeout(() => {
            themeToggle.classList.remove('rotating');
        }, 300);
    });

    // -----------------------------------------------------------------
    // 2. MOBILE NAVIGATION
    // -----------------------------------------------------------------
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const menuIcon = mobileNavToggle.querySelector('.icon-menu');
    const closeIcon = mobileNavToggle.querySelector('.icon-close');

    const toggleNav = () => {
        const isActive = mobileNavMenu.classList.toggle('active');
        mobileNavToggle.setAttribute('aria-expanded', isActive);
        menuIcon.style.display = isActive ? 'none' : 'block';
        closeIcon.style.display = isActive ? 'block' : 'none';
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    mobileNavToggle.addEventListener('click', toggleNav);

    // Close nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleNav);
    });

    // -----------------------------------------------------------------
    // 3. INTERSECTION OBSERVER (Fade-in animations)
    // -----------------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply stagger delay if not already set
                if (!entry.target.style.transitionDelay) {
                     entry.target.style.transitionDelay = `${index * 50}ms`;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fadeElements.forEach(el => observer.observe(el));

    // -----------------------------------------------------------------
    // 4. HEADER SCROLL STATE
    // -----------------------------------------------------------------
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // -----------------------------------------------------------------
    // 5. BACK TO TOP BUTTON
    // -----------------------------------------------------------------
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // -----------------------------------------------------------------
    // 6. PROJECT FILTERING
    // -----------------------------------------------------------------
    const filterContainer = document.getElementById('project-filters');
    const filterBtns = filterContainer ? filterContainer.querySelectorAll('.filter-btn') : [];
    const projectGrid = document.getElementById('projects-grid');
    const projectCards = projectGrid ? Array.from(projectGrid.children) : [];

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (!e.target.matches('.filter-btn')) return;
            
            const filterValue = e.target.dataset.filter;
            
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter cards
            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                const shouldShow = (filterValue === 'all' || categories.includes(filterValue));
                
                if (shouldShow) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    }
    
    // -----------------------------------------------------------------
    // 7. EMAILJS CONTACT FORM
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('toast-notification');

    // --- IMPORTANT ---
    // Replace with your EmailJS credentials
    // -----------------
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    // -----------------

    // Check if emailjs is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("EmailJS SDK not loaded. Make sure the CDN link is in your HTML <head>.");
    }

    const showToast = (message, isError = false) => {
        toast.textContent = message;
        toast.className = 'toast show';
        if (isError) {
            toast.classList.add('error');
        } else {
            toast.classList.add('success');
        }
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    if (contactForm && typeof emailjs !== 'undefined') {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(() => {
                    showToast('Message sent successfully!');
                    contactForm.reset();
                }, (error) => {
                    showToast('Failed to send message. Please try again.', true);
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }

}); // End DOMContentLoaded