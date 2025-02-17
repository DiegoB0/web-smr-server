const express = require("express");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");

const emailRoutes = require("./routes/email.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", emailRoutes);

// Check if we're in a serverless environment or local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports.handler = serverless(app);
