const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const {
  solveText,
  solveImage,
} = require("../controllers/aiController");

// Routes
router.post("/solve-text", solveText);
router.post("/solve-image", upload.single("image"), solveImage);

module.exports = router;
