(function () {
  "use strict";

  const roles = [
    "Senior Full Stack Engineer (Frontend-Led)",
    "Frontend Architect",
    "Engineering Lead / Tech Lead",
    "React.js · Next.js · Node.js",
    "Micro-Frontend Specialist"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById("typedRole");

  function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeRole, isDeleting ? 40 : 80);
  }

  typeRole();

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 40);
  });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const statNums = document.querySelectorAll(".stat__num[data-count]");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statNums.forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
    statsAnimated = true;
  }

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) animateStats();
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav__links a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navAnchors.forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current ? "var(--text)" : "";
    });
  });
})();
