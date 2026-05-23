const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");

// GET all courses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET logged-in user's enrolled courses
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const user = await req.user.populate("enrolledCourses");
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD course to logged-in user's courses
router.post("/:courseId/enroll", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = req.user.enrolledCourses.some(
      (courseId) => courseId.toString() === course._id.toString()
    );

    if (!alreadyEnrolled) {
      req.user.enrolledCourses.push(course._id);
      await req.user.save();
    }

    const user = await req.user.populate("enrolledCourses");
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE course (admin only)
router.post("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
