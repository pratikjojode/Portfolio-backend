const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware.js");
const {
  getAdminDashboard,
  getAllUsers,
  updateUser,
  deleteUser,
  getAdminProfile,
  updateAdminProfile,
  deleteAdminProfile,
} = require("../controllers/adminController.js");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", authMiddleware, adminMiddleware, getAdminDashboard);

// Fetch all users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Update user (Admin Only)
router.put("/users/:id", authMiddleware, adminMiddleware, updateUser);

// Delete user (Admin Only)
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

router.get("/profile", authMiddleware, adminMiddleware, getAdminProfile);
router.put("/profile", authMiddleware, adminMiddleware, updateAdminProfile);
router.delete(
  "/deleteprofile/:id",
  authMiddleware,
  adminMiddleware,
  deleteAdminProfile
);

module.exports = router;
