// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error", err));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// auth routes
app.use("/api/auth", authRoutes);

// any other routes... (serve index.html for SPA if needed)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
