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

  // AI Quiz Data
const quizQuestions = [
  {
      question: "1. What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Innovation", "Advanced Internet"],
      answer: "Artificial Intelligence"
  },
  {
      question: "2. Which AI model is commonly used for chatbots?",
      options: ["GPT-4", "Blockchain", "IoT"],
      answer: "GPT-4"
  },
  {
      question: "3. What is Machine Learning?",
      options: [
          "A way for machines to learn from data",
          "A programming language",
          "A hardware component"
      ],
      answer: "A way for machines to learn from data"
  }
];

// Load Quiz Questions
const quizContainer = document.getElementById("quiz");

quizQuestions.forEach((q, index) => {
  let div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${q.question}</p>`;
  
  q.options.forEach(option => {
      div.innerHTML += `
          <label>
              <input type="radio" name="q${index}" value="${option}">
              ${option}
          </label><br>
      `;
  });

  quizContainer.appendChild(div);
});

// Submit Quiz and Show Result
function submitQuiz() {
  let score = 0;

  quizQuestions.forEach((q, index) => {
      let selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
      if (selectedOption && selectedOption.value === q.answer) {
          score++;
      }
  });

  let resultText = `You scored ${score} out of ${quizQuestions.length}. `;
  resultText += (score === quizQuestions.length) ? "🎉 Congrats! You passed!" : "Try again to improve your score!";

  document.getElementById("quiz-result").innerText = resultText;
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