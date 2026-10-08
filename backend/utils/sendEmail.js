// const nodemailer = require("nodemailer");

// const sendEmail = async ({ email, subject, message }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS, // App Password mapping
//       },
//     });

//     const mailOptions = {
//       from: `"HandyArtStore Support" <${process.env.GMAIL_USER}>`,
//       to: email,
//       subject: subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email successfully sent to ${email}`);
//   } catch (error) {
//     console.error(`Failed to send email to ${email}: ${error.message}`);
//   }
// };

// module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// const sendEmail = async ({ email, subject, message, replyTo }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"HandyArtStore Support" <${process.env.GMAIL_USER}>`,
//       to: email,
//       subject: subject,
//       html: message,
//       ...(replyTo && { replyTo }), // only add if provided
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email successfully sent to ${email}`);
//   } catch (error) {
//     console.error(`Failed to send email to ${email}: ${error.message}`);
//     throw error; // important so the controller can catch it
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async ({ email, subject, message, replyTo }) => {
  try {
    const mailOptions = {
      from: `"HandyArtStore Support" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: replyTo || undefined,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

    return info;
  } catch (error) {
    console.error("Email sending failed:", {
      message: error.message,
      code: error.code,
      response: error.response,
      command: error.command,
    });

    throw error;
  }
};

module.exports = sendEmail;
