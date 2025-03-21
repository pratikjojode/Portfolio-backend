const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
