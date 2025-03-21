const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    projectIdea: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collaboration", collaborationSchema);
