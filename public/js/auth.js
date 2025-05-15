// auth.js - Authentication Manager
(function () {
  // Check login status on page load
  function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    if (!isLoggedIn && currentPage !== "login.html") {
      window.location.href = "login.html";
    }

    if (isLoggedIn && currentPage === "login.html") {
      window.location.href = "index.html";
    }
  }

  // Logout functionality
  function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        // Notify other tabs
        localStorage.setItem("logout-event", Date.now());
        window.location.href = "login.html";
      });
    }
  }

  // Cross-tab synchronization
  function setupTabSync() {
    window.addEventListener("storage", (event) => {
      if (event.key === "logout-event") {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
      }
    });
  }

  // Initialize
  checkAuth();
  setupLogout();
  setupTabSync();
})();
