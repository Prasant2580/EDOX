const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",").map((origin) => origin.trim()).filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error("Origin is not allowed by CORS");
    error.status = 403;
    return callback(error);
  },
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) => req.path === "/health",
  message: { message: "Too many requests. Please try again later." },
}));

connectDB();

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 25, standardHeaders: "draft-8", legacyHeaders: false }), authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ai", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false }), aiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notes", noteRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled request error:", err);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const shutdown = () => server.close(() => process.exit(0));
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
