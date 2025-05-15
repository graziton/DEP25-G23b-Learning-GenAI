// login.js
document.addEventListener("DOMContentLoaded", () => {
  const step1Btn = document.getElementById("sendOtpBtn");
  const step2Btn = document.getElementById("verifyOtpBtn");
  const emailInput = document.getElementById("loginEmail");
  const otpInput = document.getElementById("loginOtp");
  const msgEl = document.getElementById("loginMessage");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Utility to show messages
  function showMsg(text, type = "info") {
    msgEl.textContent = text;
    msgEl.className = type; // define .info and .error in your CSS
  }

  // Step 1: send OTP
  step1Btn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!emailRE.test(email)) {
      return showMsg("Please enter a valid email.", "error");
    }
    showMsg("Sending OTP…");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      showMsg("OTP sent! Check your inbox.", "info");
      step1.style.display = "none";
      step2.style.display = "block";
    } catch (err) {
      showMsg(err.message, "error");
    }
  });

  // Step 2: verify OTP
  step2Btn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const code = otpInput.value.trim();
    if (!/^\d{6}$/.test(code)) {
      return showMsg("Enter a 6-digit OTP.", "error");
    }
    showMsg("Verifying…");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      // on success
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("login", Date.now()); // broadcast to other tabs
      location.replace("index.html");
    } catch (err) {
      showMsg(err.message, "error");
    }
  });
});
