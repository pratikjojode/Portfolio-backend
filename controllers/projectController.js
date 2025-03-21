const Project = require("../models/Project");
const path = require("path");
const fs = require("fs");

// ✅ Create a new project with image upload
exports.createProject = async (req, res) => {
  try {
    console.log("File received:", req.file);
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const project = new Project({
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      image,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully!", project });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Update project with image upload
exports.updateProject = async (req, res) => {
  try {
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found!" });

    // ✅ If a new image is uploaded, delete the old one safely
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", project.image);
      if (project.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      project.image = `/uploads/${req.file.filename}`; // ✅ Update image URL
    }

    // ✅ Update only provided fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = technologies;
    if (liveUrl) project.liveUrl = liveUrl;
    if (githubUrl) project.githubUrl = githubUrl;

    await project.save();
    res.json({ message: "Project updated successfully!", project });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Delete Project with image cleanup
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    // ✅ Delete project image from `uploads/` folder
    if (project.image) {
      const imagePath = path.join(__dirname, "..", project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete file if it exists
      }
    }

    // ✅ Remove project from the database
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
