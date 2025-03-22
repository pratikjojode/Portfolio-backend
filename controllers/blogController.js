const Blog = require("../models/Blog");
const { cloudinary } = require("../config/cloudinaryConfig");

// ✅ Create a new blog
exports.createBlog = async (req, res) => {
  try {
    console.log("Incoming Blog Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, content } = req.body;
    const image = req.file ? req.file.path || req.file.secure_url : ""; // ✅ Fix

    const blog = new Blog({ title, content, image });
    await blog.save();

    res.status(201).json({ message: "Blog created successfully!", blog });
  } catch (error) {
    console.error("Error Creating Blog:", error);
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    // ✅ Delete old image from Cloudinary before updating
    if (req.file) {
      if (blog.image) {
        const publicId = blog.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      blog.image = req.file.path || req.file.secure_url; // ✅ Fix
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.json({ message: "Blog updated successfully!", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    // ✅ Delete image from Cloudinary
    if (blog.image) {
      const publicId = blog.image.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
