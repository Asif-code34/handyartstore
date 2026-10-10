// import React, { useState } from "react";
// import "../styles/contact.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     // Simulate API call
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setSubmitStatus("success");
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     } catch (error) {
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="contact-page">
//       {/* ===== Hero Section ===== */}
//       <section className="contact-hero">
//         <div className="contact-hero-overlay"></div>
//         <div className="container contact-hero-content">
//           <span className="contact-hero-badge">✦ Get in Touch</span>
//           <h1>
//             We'd Love to Hear <span>From You</span>
//           </h1>
//           <p>
//             Have a question about our crochet treasures? Want a custom order? Or
//             just want to say hello — we're here and ready to chat.
//           </p>
//         </div>
//       </section>

//       {/* ===== Contact Section ===== */}
//       <section className="contact-section">
//         <div className="container">
//           <div className="contact-grid">
//             {/* ---- Contact Form ---- */}
//             <div className="contact-form-wrapper">
//               <h2>Send a Message</h2>
//               <form onSubmit={handleSubmit} className="contact-form">
//                 <div className="form-group">
//                   <label htmlFor="name">Your Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="subject">Subject</label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     placeholder="Custom Order Inquiry"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="message">Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="5"
//                     placeholder="Tell us what you're looking for..."
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
//                 </div>

//                 {submitStatus === "success" && (
//                   <div className="form-success">
//                     ✦ Message sent! We'll get back to you soon.
//                   </div>
//                 )}
//                 {submitStatus === "error" && (
//                   <div className="form-error">
//                     Something went wrong. Please try again.
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-submit"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-small"></span> Sending...
//                     </>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </button>
//               </form>
//             </div>

//             {/* ---- Contact Info ---- */}
//             <div className="contact-info-wrapper">
//               <div className="contact-info-card">
//                 <h3>Contact Information</h3>
//                 <p className="contact-info-description">
//                   We'd love to connect with you. Reach out through any of the
//                   channels below and we'll respond as quickly as possible.
//                 </p>

//                 <div className="contact-info-items">
//                   <div className="contact-info-item">
//                     <div className="contact-icon">✉️</div>
//                     <div>
//                       <h4>Email</h4>
//                       <a href="mailto:handyartstore.help@gmail.com">
//                         hello@handyartstore.com
//                       </a>
//                     </div>
//                   </div>
//                   <div className="contact-info-item">
//                     <div className="contact-icon">📞</div>
//                     <div>
//                       <h4>Phone</h4>
//                       <a href="tel:+919999999999">+91 99999 99999</a>
//                     </div>
//                   </div>
//                   <div className="contact-info-item">
//                     <div className="contact-icon">📍</div>
//                     <div>
//                       <h4>Address</h4>
//                       <p>Mumbai, India</p>
//                     </div>
//                   </div>
//                   <div className="contact-info-item">
//                     <div className="contact-icon">🕐</div>
//                     <div>
//                       <h4>Working Hours</h4>
//                       <p>Mon – Sat, 10:00 AM – 7:00 PM IST</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="contact-social">
//                   <span>Follow Us</span>
//                   <div className="contact-social-links">
//                     <a
//                       href="https://www.instagram.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="Instagram"
//                     >
//                       📸
//                     </a>
//                     <a
//                       href="https://www.facebook.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="Facebook"
//                     >
//                       📘
//                     </a>
//                     <a
//                       href="https://www.pinterest.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="Pinterest"
//                     >
//                       📌
//                     </a>
//                     <a
//                       href="https://www.youtube.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label="YouTube"
//                     >
//                       ▶️
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FAQ / Extra Section ===== */}
//       <section className="contact-extra">
//         <div className="container">
//           <div className="extra-grid">
//             <div className="extra-item">
//               <span className="extra-icon">🧶</span>
//               <h4>Custom Orders</h4>
//               <p>
//                 Can't find what you're looking for? We take custom orders — just
//                 let us know your vision.
//               </p>
//             </div>
//             <div className="extra-item">
//               <span className="extra-icon">📦</span>
//               <h4>Bulk Orders</h4>
//               <p>
//                 Need large quantities for events or retail? We offer special
//                 pricing and fast turnaround.
//               </p>
//             </div>
//             <div className="extra-item">
//               <span className="extra-icon">💝</span>
//               <h4>Gifting</h4>
//               <p>
//                 Looking for the perfect gift? We offer beautiful packaging and
//                 personalized notes.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitStatus(null);

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1500));
  //     setSubmitStatus("success");
  //     setFormData({ name: "", email: "", subject: "", message: "" });
  //   } catch (error) {
  //     setSubmitStatus("error");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* ===== Hero Section ===== */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content">
          <span className="contact-hero-badge">✦ Get in Touch</span>
          <h1>
            We'd Love to Hear <span>From You</span>
          </h1>
          <p>
            Have a question about our crochet treasures? Want a custom order? Or
            just want to say hello — we're here and ready to chat.
          </p>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* ---- Contact Form ---- */}
            <div className="contact-form-wrapper">
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Custom Order Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="form-success">
                    ✦ Message sent! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="form-error">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-small"></span> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* ---- Contact Info ---- */}
            <div className="contact-info-wrapper">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <p className="contact-info-description">
                  We'd love to connect with you. Reach out through any of the
                  channels below and we'll respond as quickly as possible.
                </p>

                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <div className="contact-icon">✉️</div>
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:handyartstore.help@gmail.com">
                        handyartstore.help@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon">📞</div>
                    <div>
                      <h4>Phone</h4>
                      <a href="tel:+918740864334">+91 8740864334</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon">📍</div>
                    <div>
                      <h4>Address</h4>
                      <p>Udaipur, India</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon">🕐</div>
                    <div>
                      <h4>Working Hours</h4>
                      <p>Mon – Sat, 10:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>

                {/* ===== WHATSAPP CARD (ADDED HERE) ===== */}
                <div className="contact-whatsapp">
                  <div className="contact-icon">💬</div>
                  <div>
                    <h4>Chat on WhatsApp</h4>
                    <a
                      href="https://wa.me/918740864334?text=Hello!%20I%20have%20a%20question%20about%20your%20crochet%20items."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      +91 87408 64334
                    </a>
                    <p>We usually respond within 2 hours</p>
                  </div>
                </div>

                <div className="contact-social">
                  <span>Follow Us</span>
                  <div className="contact-social-links">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      📸
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      📘
                    </a>
                    <a
                      href="https://www.pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                    >
                      📌
                    </a>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      ▶️
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ / Extra Section ===== */}
      <section className="contact-extra">
        <div className="container">
          <div className="extra-grid">
            <div className="extra-item">
              <span className="extra-icon">🧶</span>
              <h4>Custom Orders</h4>
              <p>
                Can't find what you're looking for? We take custom orders — just
                let us know your vision.
              </p>
            </div>
            <div className="extra-item">
              <span className="extra-icon">📦</span>
              <h4>Bulk Orders</h4>
              <p>
                Need large quantities for events or retail? We offer special
                pricing and fast turnaround.
              </p>
            </div>
            <div className="extra-item">
              <span className="extra-icon">💝</span>
              <h4>Gifting</h4>
              <p>
                Looking for the perfect gift? We offer beautiful packaging and
                personalized notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
