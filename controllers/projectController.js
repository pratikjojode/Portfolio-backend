const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinaryConfig");

// ✅ Create a new project with Cloudinary image upload
exports.createProject = async (req, res) => {
  try {
    console.log("File received:", req.file);
    const { title, description, technologies, liveUrl, githubUrl } = req.body;

    let imageUrl = "";
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const project = new Project({
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      image: imageUrl,
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

// ✅ Update project with Cloudinary image upload
exports.updateProject = async (req, res) => {
  try {
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found!" });

    // ✅ If a new image is uploaded, delete the old one from Cloudinary
    if (req.file) {
      if (project.image) {
        const imagePublicId = project.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`projects/${imagePublicId}`);
      }

      // ✅ Upload new image
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      project.image = uploadResponse.secure_url;
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

// ✅ Delete Project with Cloudinary image deletion
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    // ✅ Delete project image from Cloudinary
    if (project.image) {
      const imagePublicId = project.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/${imagePublicId}`);
    }

    // ✅ Remove project from the database
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
