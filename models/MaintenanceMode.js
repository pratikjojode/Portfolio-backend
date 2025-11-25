const mongoose = require("mongoose");

const MaintenanceModeSchema = new mongoose.Schema(
  {
    isEnabled: { type: Boolean, default: false },
    message: { 
      type: String, 
      default: "We're currently performing scheduled maintenance. We'll be back soon!" 
    },
    estimatedEndTime: { type: Date },
    enabledBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "usersPortfolio" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceMode", MaintenanceModeSchema);