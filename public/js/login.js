document.addEventListener("DOMContentLoaded", () => {
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const emailInput = document.getElementById("loginEmail");
  const otpInput = document.getElementById("loginOtp");
  const messageEl = document.getElementById("loginMessage");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  sendOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address", "error");
      return;
    }

    showMessage("Sending OTP...");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("OTP send failed");

      step1.style.display = "none";
      step2.style.display = "block";
      showMessage("OTP sent! Check your email.");
    } catch (error) {
      showMessage(error.message || "Failed to send OTP", "error");
    }
  });

  verifyOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const otp = otpInput.value.trim();

    if (!/^\d{6}$/.test(otp)) {
      showMessage("Invalid OTP format", "error");
      return;
    }

    showMessage("Verifying...");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Verification failed");

      // Successful login
      localStorage.setItem("isLoggedIn", "true");

      // Broadcast login to other tabs
      window.localStorage.setItem("login-event", Date.now());

      window.location.href = "index.html";
    } catch (error) {
      showMessage(error.message || "Verification failed", "error");
    }
  });

  function showMessage(text, type = "info") {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
  }
});
