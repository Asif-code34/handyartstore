// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/footer.css";

// const Footer = () => {
//   const categories = [
//     { name: "Flowers", slug: "flowers" },
//     { name: "Keychains", slug: "keychain" },
//     { name: "Home Decor", slug: "home-decor" },
//     { name: "Plushies", slug: "toys" },
//     { name: "Phone Cases", slug: "phone-case" },
//     { name: "Pots", slug: "pot" },
//     { name: "Bags", slug: "bag" },
//     { name: "Hair Accessories", slug: "hair" },
//   ];

//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Brand Column */}
//         <div className="footer-col">
//           <Link to="/" className="footer-brand">
//             <span className="footer-logo">🧶</span>
//             <span>HandyArtStore</span>
//           </Link>
//           <p className="footer-description">
//             Premium handmade crochet items crafted with love and attention to
//             detail. Every piece tells a story of patience and creativity.
//           </p>
//           <div className="footer-social">
//             <a
//               href="https://www.instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//               className="social-link"
//             >
//               📸
//             </a>
//             <a
//               href="https://www.facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="social-link"
//             >
//               📘
//             </a>
//             <a
//               href="https://www.pinterest.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Pinterest"
//               className="social-link"
//             >
//               📌
//             </a>
//             <a
//               href="https://www.youtube.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//               className="social-link"
//             >
//               ▶️
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="footer-col">
//           <h4>Quick Links</h4>
//           <ul className="footer-links">
//             <li>
//               <Link to="/about">About Us</Link>
//             </li>
//             <li>
//               <Link to="/shop">All Products</Link>
//             </li>
//             <li>
//               <Link to="/custom-order">Custom Order</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Categories */}
//         <div className="footer-col">
//           <h4>Categories</h4>
//           <ul className="footer-links footer-categories">
//             {categories.map((cat) => (
//               <li key={cat.slug}>
//                 <Link to={`/shop?category=${cat.slug}`}>{cat.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact & Info */}
//         <div className="footer-col">
//           <h4>Get in Touch</h4>
//           <ul className="footer-contact">
//             <li>
//               ✉️{" "}
//               <a href="mailto:hello@handyartstore.com">
//                 hello@handyartstore.com
//               </a>
//             </li>
//             <li>
//               📞 <a href="tel:+919999999999">+91 99999 99999</a>
//             </li>
//             <li>📍 Mumbai, India</li>
//           </ul>
//           <p className="footer-policy">
//             <Link to="/return">Return Policy</Link> •{" "}
//             <Link to="/disclaimer">Disclaimer</Link>
//           </p>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <div className="footer-container footer-bottom-content">
//           <span>
//             © {new Date().getFullYear()} HandyArtStore. All rights reserved.
//           </span>
//           <span className="footer-credit">Crafted with 🧶 and ❤️</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const categories = [
    { name: "Flowers", slug: "flowers" },
    { name: "Keychains", slug: "keychain" },
    { name: "Home Decor", slug: "home-decor" },
    { name: "Plushies", slug: "toys" },
    { name: "Phone Cases", slug: "phone-case" },
    { name: "Pots", slug: "pot" },
    { name: "Bags", slug: "bag" },
    { name: "Hair Accessories", slug: "hair" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col">
          <Link to="/" className="footer-brand">
            <img
              src="/logobg.png"
              // src="/logobg-cropped.png"
              alt="HandyArtStore logo"
              className="footer-logo"
            />
            <span>HandyArtStore</span>
          </Link>
          <p className="footer-description">
            Premium handmade crochet items crafted with love and attention to
            detail. Every piece tells a story of patience and creativity.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              📸
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link"
            >
              📘
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="social-link"
            >
              📌
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="social-link"
            >
              ▶️
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/shop">All Products</Link>
            </li>
            <li>
              <Link to="/custom-order">Custom Order</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Categories</h4>
          <ul className="footer-links footer-categories">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/shop?category=${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Info */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-contact">
            <li>
              ✉️{" "}
              <a href="mailto:hello@handyartstore.com">
                hello@handyartstore.com
              </a>
            </li>
            <li>
              📞 <a href="tel:+919999999999">+91 99999 99999</a>
            </li>
            <li>📍 Mumbai, India</li>
          </ul>
          <p className="footer-policy">
            <Link to="/return">Return Policy</Link> •{" "}
            <Link to="/disclaimer">Disclaimer</Link>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <span>
            © {new Date().getFullYear()} HandyArtStore. All rights reserved.
          </span>
          <span className="footer-credit">Crafted with 🧶 and ❤️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
