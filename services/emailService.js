const nodemailer = require("nodemailer");

const sendNotificationEmail = (collaborationDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Project Collaboration Request!!",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; border: 1px solid rgb(0, 0, 0); border-radius: 8px;">
    <h1 style="color: #333; text-align: left;">New Collaboration Request To Your Portfolio Pratik!!</h1>
    <p style="color: #555; text-align: left; line-height: 1.6;">
      A new collaboration request has been submitted. Here are the details:
    </p>
    <div style="background-color:rgba(177, 116, 116, 0.29); padding: 15px; border-radius: 6px; margin-top: 20px;">
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Name:</strong> ${collaborationDetails.name}</p>
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Email:</strong> ${collaborationDetails.email}</p>
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Project Idea:</strong> ${collaborationDetails.projectIdea}</p>
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Qualifications:</strong> ${collaborationDetails.qualifications}</p>
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Additional Details:</strong> ${collaborationDetails.additionalDetails}</p>
      <p style="color: #333; text-align: left; margin: 5px 0;"><strong>Contact Details:</strong> ${collaborationDetails.contact}</p>
    </div>
    <p style="color: #777; text-align: left; margin-top: 20px;">
      Please review the request and respond accordingly.
    </p>
    <a href="mailto:${collaborationDetails.email}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">
      Respond via Email
    </a>
  </div>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// NEW: Password Reset Email Function
const sendPasswordResetEmail = (userEmail, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request - Pratik's Portfolio",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
    <p style="color: #555; text-align: left; line-height: 1.6;">
      Hi there,
    </p>
    <p style="color: #555; text-align: left; line-height: 1.6;">
      You requested to reset your password. Click the button below to reset it:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
    </div>
    <p style="color: #777; text-align: left; font-size: 14px;">
      Or copy and paste this link in your browser:
    </p>
    <p style="color: #007BFF; text-align: left; word-break: break-all; font-size: 14px;">
      ${resetLink}
    </p>
    <p style="color: #777; text-align: left; margin-top: 30px; font-size: 13px;">
      This link will expire in 1 hour for security reasons.
    </p>
    <p style="color: #777; text-align: left; font-size: 13px;">
      If you didn't request this password reset, please ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    <p style="color: #999; text-align: center; font-size: 12px;">
      © ${new Date().getFullYear()} Pratik's Portfolio. All rights reserved.
    </p>
  </div>
`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending password reset email:", error);
        reject(error);
      } else {
        console.log("Password reset email sent: " + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = { sendNotificationEmail, sendPasswordResetEmail };