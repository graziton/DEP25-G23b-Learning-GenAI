// login.js - OTP Login Handler
document.addEventListener("DOMContentLoaded", () => {
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const emailInput = document.getElementById("loginEmail");
  const otpInput = document.getElementById("loginOtp");
  const messageEl = document.getElementById("loginMessage");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  // Send OTP
  sendOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
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

      if (!response.ok) throw new Error("Failed to send OTP");

      step1.style.display = "none";
      step2.style.display = "block";
      showMessage("OTP sent to your email!");
    } catch (error) {
      showMessage("Error sending OTP. Please try again.", "error");
    }
  });

  // Verify OTP
  verifyOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const otp = otpInput.value.trim();

    if (!validateOtp(otp)) {
      showMessage("Please enter a 6-digit OTP", "error");
      return;
    }

    showMessage("Verifying OTP...");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Invalid OTP");

      // Login successful
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } catch (error) {
      showMessage(error.message || "Verification failed", "error");
    }
  });

  // Helper functions
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateOtp(otp) {
    return /^\d{6}$/.test(otp);
  }

  function showMessage(text, type = "info") {
    messageEl.textContent = text;
    messageEl.className = `login-message ${type}`;
  }
});
