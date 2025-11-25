const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

router.post(
  "/postProject",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProject
);
router.put(
  "/updateProject/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProject
);

router.get("/getProject", getProjects);
router.get("/getprojectById/:id", getProjectById);
router.delete(
  "/deleteProject/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;
