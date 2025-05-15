// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// 1. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 2. Middleware
app.use(express.json()); // Parse JSON request bodies

// 3. Serve Static Files (CSS, JS, HTML, assets/)
app.use(express.static(__dirname));

// 4. API Routes for OTP login
app.use("/api/auth", authRoutes);

// 5. Fallback Route - for any other GET, serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
