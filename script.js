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
      <p>AI is revolutionizing the medical industry with various applications, including:</p>
      <ul>
          <li><b>Medical Imaging:</b> AI analyzes X-rays, MRIs, and CT scans for faster and more accurate diagnoses.</li>
          <li><b>Drug Discovery:</b> AI accelerates research by identifying potential drugs and treatments.</li>
          <li><b>Personalized Medicine:</b> AI tailors treatments based on a patient’s genetic makeup.</li>
          <li><b>Virtual Health Assistants:</b> AI-powered chatbots provide instant medical advice to patients.</li>
          <li><b>Robotic Surgeries:</b> AI assists doctors in performing precise and minimally invasive surgeries.</li>
      </ul>
  `,
  engineer: `
      <h3>AI in Engineering ⚙️</h3>
      <p>AI is transforming engineering fields with applications such as:</p>
      <ul>
          <li><b>Predictive Maintenance:</b> AI predicts when machines will fail, reducing downtime.</li>
          <li><b>Automation:</b> AI optimizes manufacturing processes and enhances efficiency.</li>
          <li><b>AI-Assisted Design:</b> AI suggests better engineering designs in CAD software.</li>
          <li><b>Smart Robotics:</b> AI-powered robots improve assembly lines and quality control.</li>
      </ul>
  `,
  student: `
      <h3>AI in Education 📚</h3>
      <p>AI enhances learning experiences with:</p>
      <ul>
          <li><b>AI Tutors:</b> Virtual AI tutors help students understand difficult concepts.</li>
          <li><b>Smart Content:</b> AI generates summaries, quizzes, and personalized study plans.</li>
          <li><b>Language Processing:</b> AI helps students learn new languages efficiently.</li>
      </ul>
  `,
  business: `
      <h3>AI in Business 💼</h3>
      <p>AI is optimizing business operations through:</p>
      <ul>
          <li><b>Customer Service:</b> AI chatbots handle queries 24/7.</li>
          <li><b>Data Analytics:</b> AI analyzes customer behavior to improve marketing strategies.</li>
          <li><b>Fraud Detection:</b> AI detects fraudulent transactions in real time.</li>
      </ul>
  `
};

// Generate tutorial based on selected profession
function generateTutorial() {
  let profession = document.getElementById("profession").value;
  let tutorialContent = document.getElementById("tutorial-content");

  if (profession) {
      tutorialContent.innerHTML = tutorials[profession];
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