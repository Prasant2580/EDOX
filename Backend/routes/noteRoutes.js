const express = require("express");
const multer = require("multer");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");
const Note = require("../models/Note");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const noteData = {
      title,
      content: content || "",
      createdBy: req.user._id,
      createdByName: req.user.name,
    };

    if (req.file) {
      noteData.fileName = req.file.originalname;
      noteData.fileType = req.file.mimetype;
      noteData.fileData = req.file.buffer.toString("base64");
    }

    const note = await Note.create(noteData);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, adminOnly, upload.single("file"), async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const { title, content } = req.body;

    if (title) note.title = title;
    if (content !== undefined) note.content = content;

    if (req.file) {
      note.fileName = req.file.originalname;
      note.fileType = req.file.mimetype;
      note.fileData = req.file.buffer.toString("base64");
    }

    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.remove();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
