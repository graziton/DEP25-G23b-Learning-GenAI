// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// 1. Choose the correct MongoDB URI
const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL;
if (!mongoUri) {
  console.error(
    "❌ No MongoDB URI provided. Set MONGO_URI or DATABASE_URL in your environment."
  );
  process.exit(1);
}

// 2. Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 3. Middleware
app.use(express.json());

// 4. Serve static files (HTML, CSS, client JS, assets/)
app.use(express.static(__dirname));

// 5. Mount OTP auth routes
app.use("/api/auth", authRoutes);

// 6. Catch-all to serve index.html for client-side routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
