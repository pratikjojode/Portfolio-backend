const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // For image uploads
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// ✅ Create a blog (Admin only)
router.post(
  "/createBlog",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createBlog
);

// ✅ Get all blogs
router.get("/getBlogs", getBlogs);

// ✅ Get a single blog by ID
router.get("/getBlog/:id", getBlogById);

// ✅ Update a blog (Admin only)
router.put(
  "/updateBlog/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateBlog
);

// ✅ Delete a blog (Admin only)
router.delete("/deleteBlog/:id", authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
