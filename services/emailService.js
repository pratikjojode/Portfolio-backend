const nodemailer = require("nodemailer");

const sendNotificationEmail = (collaborationDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pratikjojode2004@gmail.com",
      pass: "kejz ncya xyxi xylz",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "pratikjojode2004@gmail.com",
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

module.exports = sendNotificationEmail;
