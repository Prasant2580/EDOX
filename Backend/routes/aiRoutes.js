const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  solveText,
  solveImage,
  generateQuiz,
} = require("../controllers/aiController");

// Routes
router.post("/solve-text", authMiddleware, solveText);
router.post("/solve-image", authMiddleware, upload.single("image"), solveImage);
router.post("/quiz/generate", authMiddleware, generateQuiz);

module.exports = router;
