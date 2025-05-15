(function () {
  function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentPage = location.pathname.split("/").pop();

    if (!isLoggedIn && currentPage !== "login.html") {
      location.href = "/login.html";
    }

    if (isLoggedIn && currentPage === "login.html") {
      location.href = "/index.html";
    }

    document.body.classList.toggle("authenticated", isLoggedIn);
  }

  function setupLogout() {
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "logout-event",
          newValue: Date.now().toString(),
        })
      );
      location.href = "/login.html";
    });
  }

  function handleStorageEvents() {
    window.addEventListener("storage", (event) => {
      if (event.key === "logout-event") {
        localStorage.removeItem("isLoggedIn");
        location.href = "/login.html";
      }
    });
  }

  // Initialize
  checkAuthStatus();
  setupLogout();
  handleStorageEvents();
})();
