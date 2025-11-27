// --- DARK/LIGHT THEME TOGGLE ---
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");
function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
if (storedTheme) setTheme(storedTheme);
else setTheme(prefersDark ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// --- SMOOTH-SCROLL NAV LINKS ---
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    const anchor = link.getAttribute("href");
    if (anchor && anchor.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(anchor);
      section && section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// --- PARALLAX ON HERO GLASS --- 
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  hero.style.setProperty("--paraY", `${y * 0.13}px`);
  // For glass-card parallax effect (CSS-controlled)
  hero.style.backgroundPositionY = `${y * 0.07}px`;
});

// --- FADE-IN-UP STAGGERED ANIMATIONS ---
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new window.IntersectionObserver((entries, observer) => {
  entries.forEach((ent, i) => {
    if (ent.isIntersecting) {
      setTimeout(() => ent.target.classList.add('visible'), i*120);
      observer.unobserve(ent.target);
    }
  });
},{ threshold: 0.16 });
fadeEls.forEach(el => obs.observe(el));

// --- GLASS RIPPLE EFFECT ON PROJECT IMG HOVER ---
document.querySelectorAll('.ripple-target').forEach(el => {
  el.addEventListener('mouseenter', e => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-radial';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 850);
  });
});

// --- DENSE LAYOUT FOR MOBILE ---
// (No runtime JS needed, handled by CSS)