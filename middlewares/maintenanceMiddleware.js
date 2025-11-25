const MaintenanceMode = require("../models/MaintenanceMode");

// Check if site is in maintenance mode
const checkMaintenanceMode = async (req, res, next) => {
  try {
    // Skip check for admin routes and maintenance status endpoint
    const allowedPaths = [
      "/api/v1/auth/login",
      "/api/v1/maintenance/status",
      "/api/v1/maintenance/toggle",
    ];

    if (allowedPaths.some(path => req.path.startsWith(path))) {
      return next();
    }

    // Check if user is admin
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const jwt = require("jsonwebtoken");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin) {
        return next(); // Admins can bypass maintenance mode
      }
    }

    // Check maintenance status
    const maintenance = await MaintenanceMode.findOne();

    if (maintenance && maintenance.isEnabled) {
      return res.status(503).json({
        maintenance: true,
        message: maintenance.message,
        estimatedEndTime: maintenance.estimatedEndTime,
      });
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = checkMaintenanceMode;