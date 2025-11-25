const express = require("express");
const {
  getMaintenanceStatus,
  toggleMaintenanceMode,
} = require("../controllers/maintenanceController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");


const router = express.Router();

// Public route - check maintenance status
router.get("/status", getMaintenanceStatus);

// Admin only - toggle maintenance mode
router.post("/toggle", authMiddleware,adminMiddleware, toggleMaintenanceMode);

module.exports = router;