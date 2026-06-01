const express = require("express");
const router = express.Router();

const {
  generateQuiz,
  explainAnswer,
} = require("../controllers/quizController");

// Routes
router.post("/generate", generateQuiz);
router.post("/explain-answer", explainAnswer);

module.exports = router;
