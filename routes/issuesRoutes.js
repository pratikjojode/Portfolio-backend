const express = require("express");
const {
  submitIssue,
  getAllIssues,
  updateIssueStatus,
  deleteIssueStatus,
} = require("../controllers/issueController");

const router = express.Router();

// 📌 Route to submit a new issue
router.post("/submitIssue", submitIssue);

// 📌 Route to fetch all issues (Admin only)
router.get("/getIssue", getAllIssues);

// 📌 Route to mark an issue as resolved
router.put("/updateIssue/:id", updateIssueStatus);
router.delete("/deleteIssue/:id", deleteIssueStatus);

module.exports = router;
