// --- DARK/LIGHT THEME TOGGLE ---
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const html = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");

// Better visible SVGs for sun/moon icons
const SVG_SUN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5" stroke="currentColor" fill="none"/><g><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></g></svg>`;
const SVG_MOON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.88A9 9 0 0111.12 3C9.2 4.24 8 6.48 8 9a9 9 0 109 9c2.52 0 4.76-1.2 6-3.12z" fill="currentColor"/></svg>`;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.innerHTML = theme === "dark" ? SVG_MOON : SVG_SUN;
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

// --- PARALLAX ON HERO ---
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  hero.style.backgroundPositionY = `${y * 0.06}px`;
});

// --- FADE-IN-UP STAGGERED ---
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new window.IntersectionObserver((entries, observer) => {
  entries.forEach((ent, i) => {
    if (ent.isIntersecting) {
      setTimeout(() => ent.target.classList.add('visible'), i*90);
      observer.unobserve(ent.target);
    }
  });
},{ threshold: 0.15 });
fadeEls.forEach(el => obs.observe(el));

// --- MINIMAL GLASS RIPPLE EFFECT ---
document.querySelectorAll('.ripple-target').forEach(el => {
  el.addEventListener('mouseenter', e => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-radial';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 690);
  });
});