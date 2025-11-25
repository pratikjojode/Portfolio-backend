const MaintenanceMode = require("../models/MaintenanceMode");


exports.getMaintenanceStatus = async (req, res) => {
  try {
    let maintenance = await MaintenanceMode.findOne();
    
   
    if (!maintenance) {
      maintenance = await MaintenanceMode.create({
        isEnabled: false,
        message: "We're currently performing scheduled maintenance. We'll be back soon!",
      });
    }

    res.json({
      success: true,
      maintenance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.toggleMaintenanceMode = async (req, res) => {
  try {
    const { isEnabled, message, estimatedEndTime } = req.body;
    const userId = req.user.id; 

    let maintenance = await MaintenanceMode.findOne();

    if (!maintenance) {
      maintenance = await MaintenanceMode.create({
        isEnabled,
        message: message || "We're currently performing scheduled maintenance. We'll be back soon!",
        estimatedEndTime,
        enabledBy: userId,
      });
    } else {
      maintenance.isEnabled = isEnabled;
      if (message) maintenance.message = message;
      if (estimatedEndTime) maintenance.estimatedEndTime = estimatedEndTime;
      maintenance.enabledBy = userId;
      await maintenance.save();
    }

    res.json({
      success: true,
      message: `Maintenance mode ${isEnabled ? "enabled" : "disabled"} successfully`,
      maintenance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};