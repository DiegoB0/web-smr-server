const express = require("express");
const cors = require("cors");
require("dotenv").config();

const emailRoutes = require("./routes/email.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
