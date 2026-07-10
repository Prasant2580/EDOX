const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  author: String,
  color: String,
  videoUrl: String,
  notesPdfUrl: String,
});

module.exports = mongoose.model("Course", courseSchema);

