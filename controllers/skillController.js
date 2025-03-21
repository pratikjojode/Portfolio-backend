const Skill = require("../models/Skill");
const path = require("path");
const fs = require("fs");

// ✅ Create Skill with Image Upload
exports.createSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; // Save image path

    const skill = new Skill({ name, proficiency, image });
    await skill.save();

    res.status(201).json({ message: "Skill created successfully!", skill });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get All Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get Single Skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found!" });

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Update Skill with Image Upload
exports.updateSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: "Skill not found!" });

    // Delete old image if new one is uploaded
    if (req.file) {
      if (skill.image) {
        fs.unlinkSync(path.join(__dirname, "..", skill.image));
      }
      skill.image = `/uploads/${req.file.filename}`;
    }

    skill.name = name || skill.name;
    skill.proficiency = proficiency || skill.proficiency;

    await skill.save();
    res.json({ message: "Skill updated successfully!", skill });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Delete Skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found!" });

    // Delete skill image
    if (skill.image) {
      fs.unlinkSync(path.join(__dirname, "..", skill.image));
    }

    await skill.deleteOne();
    res.json({ message: "Skill deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
