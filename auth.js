// auth.js  (frontend – controls menu buttons and sync across tabs)
(function () {
  // Menu items
  const loginLi = document.getElementById("loginContainer");
  const logoutLi = document.getElementById("logoutContainer");
  const logoutBtn = document.getElementById("logoutBtn");

  // Show/hide Login & Logout
  function updateMenu() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    loginLi.style.display = isLoggedIn ? "none" : "block";
    logoutLi.style.display = isLoggedIn ? "block" : "none";
  }

  // Logout click handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.setItem("logout", Date.now()); // broadcast
      updateMenu();
      window.location.href = "index.html";
    });
  }

  // Cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === "logout") {
      updateMenu();
      if (!window.location.pathname.endsWith("login.html")) {
        window.location.href = "index.html";
      }
    }
    if (e.key === "login") {
      updateMenu();
    }
  });

  // Initialize on page load
  updateMenu();
})();
