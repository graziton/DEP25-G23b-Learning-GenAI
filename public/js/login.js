// public/js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendOtpBtn");
  const verifyBtn = document.getElementById("verifyOtpBtn");
  const emailEl = document.getElementById("email");
  const otpEl = document.getElementById("otp");
  const msg = document.getElementById("message");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  // Step 1: send OTP
  sendBtn.addEventListener("click", async () => {
    const email = emailEl.value.trim();
    if (!email) return (msg.textContent = "Please enter your email.");
    msg.textContent = "Sending OTP…";
    try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      msg.textContent = "OTP sent! Check your inbox.";
      step1.style.display = "none";
      step2.style.display = "block";
    } catch (e) {
      msg.textContent = "Error sending OTP.";
    }
  });

  // Step 2: verify OTP
  verifyBtn.addEventListener("click", async () => {
    const email = emailEl.value.trim();
    const code = otpEl.value.trim();
    if (!code) return (msg.textContent = "Please enter the OTP.");
    msg.textContent = "Verifying…";
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed");

      // mark as logged in
      localStorage.setItem("isLoggedIn", "true");
      // notify other tabs
      localStorage.setItem("login-event", Date.now());
      msg.textContent = "Logged in successfully! Redirecting…";
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (err) {
      msg.textContent = err.message || "Invalid OTP.";
    }
  });
});
