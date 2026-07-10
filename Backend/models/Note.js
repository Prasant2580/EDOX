const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    fileName: String,
    fileType: String,
    fileData: String,
    createdByName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
