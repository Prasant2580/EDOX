const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// ✅ MIDDLEWARES (ORDER MATTERS)
app.use(cors());
app.use(express.json()); // 🔥 required for req.body
app.use(express.urlencoded({ extended: true })); // extra safety

// ✅ CONNECT DATABASE
connectDB();

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ai", aiRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({
    error: "Something went wrong",
    details: err.message,
  });
});

// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
