const Issue = require("../models/Issue");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pratikjojode2004@gmail.com",
    pass: "kejz ncya xyxi xylz",
  },
});

exports.submitIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();

    const mailOptions = {
      from: "pratikjojode2004@gmail.com",
      to: "pratikjojode2004@gmail.com",
      subject: "🚨 New Issue Reported - Take Action!",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; border: 1px solid rgb(0, 0, 0); border-radius: 8px;">
        <h1 style="color: #333; text-align: left;">🛠️ New Issue Reported</h1>
        <p style="color: #555; text-align: left; line-height: 1.6;">
          A new issue has been submitted to your portfolio. Here are the details:
        </p>
        <div style="background-color: rgba(177, 116, 116, 0.29); padding: 15px; border-radius: 6px; margin-top: 20px;">
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>📌 Name:</strong> ${
            issue.name
          }</p>
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>✉️ Email:</strong> ${
            issue.email
          }</p>
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>📝 Title:</strong> ${
            issue.title
          }</p>
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>🛠️ Status:</strong> ${
            issue.status
          }</p>
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>📂 Category:</strong> ${
            issue.category
          }</p>
          ${
            issue.codeSnippet
              ? `<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 14px; white-space: pre-wrap;">${issue.codeSnippet}</pre>`
              : ""
          }
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>📖 Description:</strong> ${
            issue.description
          }</p>
          <p style="color: #333; text-align: left; margin: 5px 0;"><strong>🕒 Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #777; text-align: left; margin-top: 20px;">
          Please review the issue and take necessary action.
        </p>
        <a href="mailto:${
          issue.email
        }" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">
          📩 Respond via Email
        </a>
      </div>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Issue Notification Email sent: " + info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Issue submitted successfully and email sent!", issue });
  } catch (error) {
    res.status(500).json({ error: "Error submitting issue" });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Error fetching issues" });
  }
};

exports.updateIssueStatus = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: "Error updating issue status" });
  }
};

exports.deleteIssueStatus = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Issue deleted successfully", issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
