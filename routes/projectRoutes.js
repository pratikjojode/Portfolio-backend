const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

// ✅ Routes with image upload
router.post(
  "/postProject",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProject
); // Upload image while creating project
router.put(
  "/updateProject/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProject
); // Upload new image while updating project

// Other CRUD operations
router.get("/getProject", getProjects);
router.get("/getprojectById/:id", getProjectById);
router.delete(
  "/deleteProject/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;
