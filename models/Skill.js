const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      default: "Intermediate",
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", SkillSchema);
