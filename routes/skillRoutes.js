const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const router = express.Router();

// ✅ Public route - Anyone can fetch skills
router.get("/getSkills", getSkills);
router.get("/getSkillById/:id", getSkillById);

// ✅ Admin-protected routes for CRUD
router.post(
  "/postSkill",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createSkill
);
router.put(
  "/updateSkill/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateSkill
);
router.delete("/deleteSkill/:id", authMiddleware, adminMiddleware, deleteSkill);

module.exports = router;
