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

 
    

// AI Use Cases for Different Professions
const tutorials = {
  doctor: `
      <h3>AI in Healthcare 🏥</h3>
      <p>AI is transforming healthcare with applications like:</p>
      <ul>
          <li><b>Medical Imaging:</b> AI detects diseases in X-rays, MRIs, and CT scans.</li>
          <li><b>Drug Discovery:</b> AI accelerates new drug research and testing.</li>
          <li><b>Virtual Assistants:</b> AI-powered bots help with patient queries and support.</li>
      </ul>
  `,
  engineer: `
      <h3>AI in Engineering ⚙️</h3>
      <p>AI is changing engineering fields by:</p>
      <ul>
          <li><b>Predictive Maintenance:</b> AI detects failures before they happen.</li>
          <li><b>CAD Design Assistance:</b> AI enhances Computer-Aided Design models.</li>
          <li><b>Smart Automation:</b> AI optimizes production and manufacturing.</li>
      </ul>
  `,
  student: `
      <h3>AI in Education 📚</h3>
      <p>AI helps students by:</p>
      <ul>
          <li><b>AI Tutors:</b> Virtual tutors for personalized learning.</li>
          <li><b>Smart Content:</b> AI-generated study guides and notes.</li>
          <li><b>Plagiarism Detection:</b> AI ensures originality in assignments.</li>
      </ul>
  `,
  business: `
      <h3>AI in Business 💼</h3>
      <p>AI improves business efficiency by:</p>
      <ul>
          <li><b>AI Chatbots:</b> 24/7 customer service and support.</li>
          <li><b>Fraud Detection:</b> AI identifies suspicious transactions.</li>
          <li><b>Market Analytics:</b> AI predicts trends for better decisions.</li>
      </ul>
  `
};

// Generate tutorial based on selection & scroll to it
function generateTutorial() {
  let profession = document.getElementById("profession").value;
  let tutorialContent = document.getElementById("tutorial-content");

  if (profession) {
      tutorialContent.innerHTML = tutorials[profession];

      // Wait for content to load before scrolling
      setTimeout(() => {
          tutorialContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // Small delay ensures content is visible before scrolling
  } else {
      tutorialContent.innerHTML = "";
  }
}




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

document.addEventListener("click", (e) => {
  const dropdown = document.querySelector(".navbar .menu li.dropdown");
  if (dropdown && !dropdown.contains(e.target)) {
    // For mobile: remove any "open" class if used (if dropdown open state is toggled via JS)
    dropdown.classList.remove("open");
  }
});