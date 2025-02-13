// script.js - Minimal code to support smooth scrolling if needed
document.addEventListener("DOMContentLoaded", function () {
  // Check that anchor links are working smoothly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // Ensure only internal anchor links are handled
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
