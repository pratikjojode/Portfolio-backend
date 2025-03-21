const express = require("express");
const {
  submitCollaboration,
  getCollaborations,
  deleteCollaboration,
} = require("../controllers/collaborationController");

const router = express.Router();

// Route for submitting project proposals
router.post("/submitCollaboration", submitCollaboration);
router.get("/getCollaboration", getCollaborations);
router.delete("/deleteCollaboration/:id", deleteCollaboration);

module.exports = router;
