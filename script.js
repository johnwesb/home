document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLER LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme from localStorage on page load
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        // Default to light mode if no theme is saved
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Function to toggle the theme and save the user's preference
    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    };

    // Attach event listener to the theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    // Apply the saved theme as soon as the DOM is loaded
    applySavedTheme();


    // --- FADE-IN ANIMATION ON SCROLL LOGIC ---
    const animatedSections = document.querySelectorAll('.fade-in');

    // IntersectionObserver is a modern API for detecting element visibility
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element after the animation has been triggered once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each section with the 'fade-in' class
    animatedSections.forEach(section => {
        observer.observe(section);
    });
});