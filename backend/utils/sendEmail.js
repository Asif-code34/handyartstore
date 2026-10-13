// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// const sendEmail = async ({ email, subject, message, replyTo }) => {
//   try {
//     const mailOptions = {
//       from: `"HandyArtStore Support" <${process.env.GMAIL_USER}>`,
//       to: email,
//       replyTo: replyTo || undefined,
//       subject,
//       html: message,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email sent:", info.messageId);
//     console.log("Accepted:", info.accepted);
//     console.log("Rejected:", info.rejected);

//     return info;
//   } catch (error) {
//     console.error("Email sending failed:", {
//       message: error.message,
//       code: error.code,
//       response: error.response,
//       command: error.command,
//     });

//     throw error;
//   }
// };

// module.exports = sendEmail;

// utils/sendEmail.js

const sendEmail = async ({ email, subject, message, replyTo }) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "HandyArtStore Support",
          email: process.env.SENDER_EMAIL || "handyartstore.help@gmail.com",
        },
        to: [{ email }],
        replyTo: replyTo ? { email: replyTo } : undefined,
        subject,
        htmlContent: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Brevo API error (${response.status}): ${
          errorData.message || response.statusText
        }`,
      );
    }

    const data = await response.json();
    console.log("Email sent via Brevo. Message ID:", data.messageId);
    return data;
  } catch (error) {
    console.error("Email sending failed:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

module.exports = sendEmail;
