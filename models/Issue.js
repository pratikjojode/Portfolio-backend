const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    codeSnippet: String,
    category: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
