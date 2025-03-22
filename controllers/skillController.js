const { cloudinary } = require("../config/cloudinaryConfig");
const Skill = require("../models/Skill");

// ✅ Create Skill with Image Upload to Cloudinary
exports.createSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const skill = new Skill({ name, proficiency, image: imageUrl });
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

// ✅ Update Skill with Cloudinary Image Upload
exports.updateSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: "Skill not found!" });

    // If new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (skill.image) {
        const publicId = skill.image.split("/").pop().split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path);
      skill.image = result.secure_url;
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

    // Delete image from Cloudinary
    if (skill.image) {
      const publicId = skill.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await skill.deleteOne();
    res.json({ message: "Skill deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
