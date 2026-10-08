// const sendEmail = require("../utils/sendEmail"); // adjust path if needed

// const sendContactMessage = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Basic validation
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     // Simple email format check
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address",
//       });
//     }

//     // Email that will be sent TO you (store owner)
//     const htmlMessage = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #333;">New Contact Form Message</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <hr />
//         <p><strong>Message:</strong></p>
//         <p style="white-space: pre-wrap;">${message}</p>
//         <hr />
//         <p style="color: #888; font-size: 12px;">
//           This message was sent from the HandyArtStore contact form.
//         </p>
//       </div>
//     `;

//     await sendEmail({
//       email: process.env.GMAIL_USER, // you receive the email
//       subject: `Contact Form: ${subject}`,
//       message: htmlMessage,
//       replyTo: email, // customer's email
//     });

//     res.status(200).json({
//       success: true,
//       message: "Message sent successfully! We'll get back to you soon.",
//     });
//   } catch (error) {
//     console.error("Contact form error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send message. Please try again later.",
//     });
//   }
// };

// module.exports = { sendContactMessage };

const sendEmail = require("../utils/sendEmail");

const sendContactMessage = async (req, res) => {
  console.log("POST /api/contact received");
  console.log("Body:", req.body);
  try {
    const { name, email, subject, message } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeSubject = subject.trim();
    const safeMessage = message.trim();

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      </div>
    `;

    await sendEmail({
      email: process.env.GMAIL_USER,
      subject: `Contact Form: ${safeSubject}`,
      message: htmlMessage,
      replyTo: safeEmail,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = { sendContactMessage };
