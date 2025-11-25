// --- Initialization and Dark Mode Logic ---
const htmlElement = document.documentElement;
const modeToggleBtn = document.getElementById('mode-toggle');
const mobileModeToggleBtn = document.getElementById('mobile-mode-toggle');
const mobileMenuBtn = document.querySelector('[aria-label="Toggle mobile menu"]'); // For JS attachment

function updateModeIcon(isDark) {
    const iconClass = isDark ? 'fa-sun' : 'fa-moon';
    const iconElement = `<i class="fas ${iconClass} text-xl"></i>`;
    
    if (modeToggleBtn) modeToggleBtn.innerHTML = iconElement;
    if (mobileModeToggleBtn) mobileModeToggleBtn.innerHTML = iconElement;
}

function applyInitialMode() {
    const savedMode = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = savedMode === 'dark';
    
    if (!savedMode) {
        isDark = htmlElement.classList.contains('dark') || prefersDark;
    }

    if (isDark) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    updateModeIcon(isDark);
}

function toggleDarkMode() {
    const isCurrentlyDark = htmlElement.classList.contains('dark');
    
    if (isCurrentlyDark) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        updateModeIcon(false);
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        updateModeIcon(true);
    }
}

// --- Mobile Menu Toggle (now via JS for consistency) ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// --- Typing Effect ---
const textElement = document.getElementById('typing-text');
const phrases = ["Insights.", "Predictions.", "Value.", "Automation."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 600;
    }

    setTimeout(type, typeSpeed);
}

// --- Enhanced Form Handling (Simulation with Validation) ---
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    const originalText = btn.innerText;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    if (!name || !email || !message) {
        errorMsg.classList.remove('hidden');
        return;
    }

    if (!validateEmail(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.classList.remove('hidden');
        return;
    }

    btn.innerText = 'Sending...';
    btn.disabled = true;
    btn.classList.add('opacity-70');

    // Simulate (or replace with Firebase as before)
    setTimeout(() => {
        form.reset();
        successMsg.classList.remove('hidden');
        
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-70');
        
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 5000);
    }, 1800);
}

// --- Event Listeners (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    applyInitialMode();
    type();
    
    // Fix: Wire up dark mode toggles
    if (modeToggleBtn) modeToggleBtn.addEventListener('click', toggleDarkMode);
    if (mobileModeToggleBtn) mobileModeToggleBtn.addEventListener('click', toggleDarkMode);
    
    // Mobile menu (now JS-attached for consistency; remove onclick from HTML if desired)
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Form submit
    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', handleFormSubmit);
    
    // Dynamic footer year
    const yearElement = document.getElementById('footer-year');
    if (yearElement) yearElement.textContent = `© ${new Date().getFullYear()} Alex Chen. Data Science Portfolio. | Made with Blue & Code.`;
});