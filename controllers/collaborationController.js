const Collaboration = require("../models/Collaboration");
const sendNotificationEmail = require("../services/emailService"); // Import the emailService

exports.submitCollaboration = async (req, res) => {
  try {
    const {
      name,
      email,
      projectIdea,
      qualifications,
      additionalDetails,
      contact,
    } = req.body;

    // Create the collaboration entry in the database
    const collaboration = new Collaboration({
      name,
      email,
      projectIdea,
      qualifications,
      additionalDetails,
      contact,
    });

    // Save the collaboration request
    await collaboration.save();

    sendNotificationEmail({
      name,
      email,
      projectIdea,
      qualifications,
      additionalDetails,
      contact,
    });

    res.status(201).json({
      message: "Collaboration request submitted successfully!",
      collaboration,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in submitting collaboration request!",
      error: error.message,
    });
  }
};

exports.getCollaborations = async (req, res) => {
  try {
    const collaborations = await Collaboration.find().sort({ createdAt: -1 });
    res.status(200).json({ collaborations });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting collaborations",
      error: error.message,
    });
    console.log("Error in getting collaborations", error);
  }
};

// Delete Collaboration Request
exports.deleteCollaboration = async (req, res) => {
  try {
    const { id } = req.params;
    const collaboration = await Collaboration.findByIdAndDelete(id);

    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found!" });
    }

    res.status(200).json({ message: "Collaboration deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting collaboration!",
      error: error.message,
    });
  }
};
