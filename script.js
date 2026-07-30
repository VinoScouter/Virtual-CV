/* =========================================
   Thulaganyo Marumo — Portfolio Script
   Handles: dark mode toggle, active nav
   highlighting, and scroll-reveal animation
   ========================================= */

// ---- 1. Dark mode toggle ----
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Swap the button label/icon depending on the current mode
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
});

// ---- 2. Highlight the nav link for the section currently in view ----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveLink() {
  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    // Treat a section as "current" once its top has scrolled
    // near the top of the viewport (offset for the sticky nav)
    if (sectionTop < 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', highlightActiveLink);
highlightActiveLink(); // run once on load

// ---- 3. Fade/slide sections in as they scroll into view ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target); // animate once, not every scroll
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));