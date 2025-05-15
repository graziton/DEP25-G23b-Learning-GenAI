// routes/auth.js
const express = require("express");
const router = express.Router();
const OTP = require("../models/OTP");
const otpGen = require("otp-generator");
const nodemailer = require("nodemailer");

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  // generate 6-digit numeric OTP
  const code = otpGen.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // upsert OTP entry
  await OTP.findOneAndUpdate(
    { email },
    { code, expiresAt },
    { upsert: true, new: true }
  );

  // send email via Gmail
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login OTP",
    text: `Your one-time login code is ${code}. It expires in 5 minutes.`,
  });

  res.json({ success: true });
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ error: "Email and code required" });

  const record = await OTP.findOne({ email });
  if (!record) return res.status(400).json({ error: "No OTP found" });
  if (record.code !== code)
    return res.status(400).json({ error: "Invalid OTP" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ error: "OTP expired" });

  // OTP is valid - delete it so it can't be reused
  await OTP.deleteOne({ email });

  // inform client of success
  res.json({ success: true });
});

module.exports = router;
