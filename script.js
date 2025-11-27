// DARK/LIGHT THEME
const modeToggle = document.getElementById("mode-toggle");
const modeIcon = document.getElementById("mode-icon");
const html = document.documentElement;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
const SVG_SUN = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><g><path d="M12 1.5v2.5"/><path d="M12 20v2.5"/><path d="M4.93 4.93l1.5 1.5"/><path d="M17.66 17.66l1.5 1.5"/><path d="M1.5 12h2.5"/><path d="M20 12h2.5"/><path d="M6.34 17.66l-1.5 1.5"/><path d="M19.07 4.93l-1.5 1.5"/></g></svg>`;
const SVG_MOON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>`;
function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  modeIcon.innerHTML = theme === "dark" ? SVG_MOON : SVG_SUN;
}
if (savedTheme) setTheme(savedTheme);
else setTheme(prefersDark ? "dark" : "light");
modeToggle.addEventListener("click", () => {
  setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// SMOOTH SCROLL (clean, for all navs/buttons)
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    const anchor = link.getAttribute("href");
    if (anchor && anchor.length > 1) {
      const section = document.querySelector(anchor);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// FADE-IN STAGGER
const fadeEl = document.querySelectorAll('.fadein');
const obs = new window.IntersectionObserver((entries, observer) => {
  entries.forEach((ent, i) => {
    if (ent.isIntersecting) {
      setTimeout(() => ent.target.classList.add('visible'), i*80);
      observer.unobserve(ent.target);
    }
  });
},{ threshold: 0.15 });
fadeEl.forEach(el => obs.observe(el));