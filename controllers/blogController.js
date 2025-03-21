const Blog = require("../models/Blog");
const path = require("path");
const fs = require("fs");

// ✅ Create a new blog
exports.createBlog = async (req, res) => {
  try {
    console.log("Incoming Blog Data:", req.body);
    console.log("Uploaded File:", req.file); // Debugging line

    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; // Store image path

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

    // If a new image is uploaded, delete the old one
    if (req.file) {
      if (blog.image) {
        fs.unlinkSync(path.join(__dirname, "..", blog.image)); // Delete old image
      }
      blog.image = `/uploads/${req.file.filename}`;
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

    // Delete blog image
    if (blog.image) {
      fs.unlinkSync(path.join(__dirname, "..", blog.image));
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};
