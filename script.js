document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle"),
        menu = document.querySelector(".menu");
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => menu.classList.toggle("show"));
  }

  // Mobile Menu Auto-Close: Close the menu if clicking outside
  document.addEventListener("click", (e) => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    if (menu.classList.contains("show") && !menu.contains(e.target) && e.target !== menuToggle) {
      menu.classList.remove("show");
    }
  });

  // Fade-in Animations via IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  if ("IntersectionObserver" in window) {
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px 0px 0px" },
          observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
              }
            });
          }, appearOptions);
    faders.forEach(fader => observer.observe(fader));
  } else {
    faders.forEach(fader => fader.classList.add("visible"));
  }

  // Collapsible Sections for FAQ
  document.querySelectorAll(".collapsible").forEach(collapsible => {
    collapsible.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content) content.classList.toggle("open");
    });
  });

  // Back-to-Top Button Visibility on Scroll
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
