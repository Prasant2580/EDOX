const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

router.get("/", authMiddleware, async (_req, res) => {
  try { res.json(await Note.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/", authMiddleware, adminOnly, upload.single("file"), async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      createdByName: req.user.name,
      ...(req.file && { fileName: req.file.originalname, fileType: req.file.mimetype, fileData: req.file.buffer.toString("base64") }),
    });
    res.status(201).json(note);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put("/:noteId", authMiddleware, adminOnly, upload.single("file"), async (req, res) => {
  try {
    const update = { title: req.body.title, content: req.body.content };
    if (req.file) Object.assign(update, { fileName: req.file.originalname, fileType: req.file.mimetype, fileData: req.file.buffer.toString("base64") });
    const note = await Note.findByIdAndUpdate(req.params.noteId, update, { new: true, runValidators: true });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.delete("/:noteId", authMiddleware, adminOnly, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(204).send();
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
