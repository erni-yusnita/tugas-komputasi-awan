// Navigasi mobile, animasi saat scroll, dan teks perkenalan.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(opened));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const typed = document.querySelector(".typed");
  if (typed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const words = (typed.dataset.words || "").split("|").filter(Boolean);
    let wordIndex = 0, charIndex = words[0]?.length || 0, deleting = false;
    function typeLoop() {
      const word = words[wordIndex];
      if (!word) return;
      if (deleting) {
        charIndex--;
        typed.textContent = word.slice(0, charIndex);
      } else {
        charIndex++;
        typed.textContent = word.slice(0, charIndex);
      }
      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex === word.length) { deleting = true; delay = 1300; }
      else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 300; }
      window.setTimeout(typeLoop, delay);
    }
    window.setTimeout(typeLoop, 1600);
  }
});