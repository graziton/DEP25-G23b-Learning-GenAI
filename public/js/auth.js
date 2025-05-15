// public/js/auth.js
(function () {
  const logoutBtn = document.getElementById("logoutBtn");

  // Redirect to login if not logged in
  const checkLogin = () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login.html";
    }
  };
  checkLogin();

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.setItem("logout-event", Date.now());
      window.location.href = "/login.html";
    });
  }

  // Listen for cross-tab logout/login
  window.addEventListener("storage", (e) => {
    if (e.key === "logout-event") {
      window.location.href = "/login.html";
    }
    if (e.key === "login-event") {
      window.location.reload();
    }
  });
})();
