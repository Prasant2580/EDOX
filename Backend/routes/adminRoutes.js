const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");

router.use(authMiddleware, adminOnly);

router.get("/users", async (_req, res) => {
  try {
    const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/users/:userId", async (req, res) => {
  try {
    if (!['user', 'admin'].includes(req.body.role)) {
      return res.status(400).json({ message: "Role must be user or admin" });
    }
    const user = await User.findByIdAndUpdate(req.params.userId, { role: req.body.role }, { new: true })
      .select("name email role createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
