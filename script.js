// Production-ready - v1.0.0 - 2025-10-22
document.addEventListener('DOMContentLoaded', () => {
    const { gsap, ScrollTrigger } = window;

    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const overlay = document.querySelector('.transition-overlay');
    const sections = gsap.utils.toArray('.fade-in, .projects-section, .about-section, .contact-section');

    if (!themeToggle || !overlay) {
        console.warn('Theme toggle or overlay not found');
        return;
    }

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            body.classList.toggle('dark-mode', savedTheme === 'dark');
        } else if (prefersDark) {
            body.classList.add('dark-mode');
        }
        updateToggleButton();
    };

    const updateToggleButton = () => {
        const isDark = body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<span class="theme-icon">☀️</span> Light Mode' : '<span class="theme-icon">🌙</span> Dark Mode';
    };

    const toggleTheme = () => {
        const isDark = body.classList.contains('dark-mode');
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
                body.classList.toggle('dark-mode');
                const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('theme', currentTheme);
                gsap.to(overlay, { opacity: 0, duration: 0.3 });
                updateToggleButton();
            }
        });
    };

    themeToggle.addEventListener('click', toggleTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySavedTheme);

    applySavedTheme();

    // Animate sections on scroll
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate comet trails (randomized)
    function animateComet(comet) {
        const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 5 });
        tl.fromTo(comet, {
            opacity: 0,
            x: '-10%',
            y: '-10%'
        }, {
            opacity: 1,
            x: '120vw',
            y: '120vh',
            rotation: 360,
            duration: 6,
            ease: 'linear'
        }).to(comet, {
            opacity: 0,
            duration: 0.5
        });
        return tl;
    }

    animateComet(document.querySelector('.comets-layer::before'));
    animateComet(document.querySelector('.comets-layer::after'));

    // Initial fade-in for hero
    gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
    });
});