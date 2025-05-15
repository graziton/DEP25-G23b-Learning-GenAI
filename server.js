require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", require("./routes/auth"));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
