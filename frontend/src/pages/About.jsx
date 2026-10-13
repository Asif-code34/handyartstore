import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

/* ============================================================
   SOCIAL LINKS
============================================================ */

// const socialLinks = [
//   {
//     label: "Instagram",
//     icon: "◎",
//     href: "https://www.instagram.com/handyartstore",
//     className: "instagram",
//   },
//   {
//     label: "WhatsApp",
//     icon: "◉",
//     href: "https://wa.me/918740864334",
//     className: "whatsapp",
//   },
//   {
//     label: "Pinterest",
//     icon: "❋",
//     href: "https://pinterest.com/handyartstore",
//     className: "pinterest",
//   },
//   {
//     label: "Facebook",
//     icon: "f",
//     href: "https://facebook.com/handyartstore",
//     className: "facebook",
//   },
//   {
//     label: "YouTube",
//     icon: "▶",
//     href: "https://youtube.com/@handyartstore",
//     className: "youtube",
//   },
//   {
//     label: "Email Us",
//     icon: "✉",
//     href: "mailto:handyartstore.help@gmail.com",
//     className: "email",
//   },
// ];

const SOCIAL_ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <path
      d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.3zM12 22a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm5.5-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.3-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6v-.6c-.1-.1-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.1 3.5 1.4 3.5.9 4.1.9.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.2-.6-.3z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pinterest: (
    <path
      d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-.9-.2-2.4 0-3.4l1.4-5.8s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.3 3.8-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.4l-.4 1.4c0 .2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.4 3 7.4 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.8-1.4l-.7 2.9c-.3 1-1 2.3-1.5 3.1 1.1.3 2.3.5 3.5.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"
      fill="currentColor"
      stroke="none"
    />
  ),
  facebook: (
    <path
      d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"
      fill="currentColor"
      stroke="none"
    />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
    </>
  ),
  email: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
};

const socialLinks = [
  {
    label: "Instagram",
    key: "instagram",
    href: "https://www.instagram.com/handyartstore",
    className: "instagram",
  },
  {
    label: "WhatsApp",
    key: "whatsapp",
    href: "https://wa.me/918740864334",
    className: "whatsapp",
  },
  {
    label: "Pinterest",
    key: "pinterest",
    href: "https://pinterest.com/handyartstore",
    className: "pinterest",
  },
  {
    label: "Facebook",
    key: "facebook",
    href: "https://facebook.com/handyartstore",
    className: "facebook",
  },
  {
    label: "YouTube",
    key: "youtube",
    href: "https://youtube.com/@handyartstore",
    className: "youtube",
  },
  {
    label: "Email Us",
    key: "email",
    href: "mailto:handyartstore.help@gmail.com",
    className: "email",
  },
];

/* ============================================================
   ABOUT PAGE
============================================================ */

const About = () => {
  return (
    <main className="about-page">
      {/* =====================================================
          HERO — Meet the maker
      ===================================================== */}

      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-grid">
            {/* IMAGE */}

            <div className="about-hero-visual">
              <div className="about-image-frame">
                <div className="about-image-decoration about-decoration-one">
                  ✦
                </div>

                <div className="about-image-decoration about-decoration-two">
                  ✿
                </div>

                {/* <img
                  src="/redFlowerBouquet.jpeg"
                  alt="A hand-crocheted bouquet crafted by HandyArtStore"
                  className="about-profile-image"
                  loading="lazy"
                /> */}

                <img
                  src="/redFlowerBouquet.jpeg"
                  alt="A hand-crocheted bouquet crafted by HandyArtStore"
                  className="about-profile-image"
                  width="880"
                  height="924"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>

            {/* CONTENT */}

            <div className="about-hero-content">
              <span className="about-eyebrow">✦ Handmade with love</span>

              <h1>
                Every stitch tells
                <span> a story worth keeping.</span>
              </h1>

              <p className="about-intro">
                HandyArtStore is a small, independent studio crafting crochet
                flowers, plushies, bags, home décor and keepsakes — all made by
                hand, one careful stitch at a time. Every piece is designed to
                be loved, gifted and treasured for years.
              </p>

              <div className="about-name">
                <span className="about-name-line" />

                <div>
                  <strong>HandyArtStore</strong>
                  <span>Handmade Crochet Studio</span>
                </div>
              </div>

              <div className="about-hero-actions">
                <Link to="/shop" className="about-btn about-btn-primary">
                  Shop the Collection
                  <span aria-hidden="true">→</span>
                </Link>

                <Link to="/contact" className="about-btn about-btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero-bottom-shape" />
      </section>

      {/* =====================================================
          VALUES — Why handmade matters
      ===================================================== */}

      <section className="about-values">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-eyebrow">What we stand for</span>

            <h2>Handmade. Heartfelt. Yours.</h2>

            <p>
              Three things every HandyArtStore piece is built around — no
              shortcuts, no mass production, just care.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card">
              <div className="about-value-icon" aria-hidden="true">
                🧶
              </div>

              <h3>Made by Hand</h3>

              <p>
                Every flower, plushie and bag is crocheted by hand — never
                machine-made. Small imperfections are part of what makes your
                piece one of a kind.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon" aria-hidden="true">
                💛
              </div>

              <h3>Premium Materials</h3>

              <p>
                We use soft, durable, skin-friendly yarns and sturdy hardware so
                your favourite pieces stay beautiful through everyday love.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon" aria-hidden="true">
                🌿
              </div>

              <h3>Made to Last</h3>

              <p>
                Slow-made with intention, not rushed for volume. Our pieces are
                designed to become heirlooms — gifted, kept and remembered.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY — How it started
      ===================================================== */}

      <section className="about-story">
        <div className="about-container">
          <div className="about-story-card">
            <div className="about-story-content">
              <span className="about-section-eyebrow">Our story</span>

              <h2>
                It started with
                <span> one ball of yarn.</span>
              </h2>

              <p>
                HandyArtStore began as a quiet hobby — a way to slow down,
                create something with our hands and share a little warmth with
                the people around us. What started as a single crochet flower
                quickly turned into bouquets, plushies, bags and keepsakes for
                customers across the country.
              </p>

              <p>
                Today, every order is still packed by hand, wrapped with care
                and sent off with a small note — because we believe handmade
                gifts should feel personal from the moment they arrive.
              </p>

              <Link to="/shop" className="about-text-link">
                Explore the collection
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="about-story-art">
              <div className="about-art-circle about-art-circle-one" />
              <div className="about-art-circle about-art-circle-two" />

              <div className="about-art-card">
                <span aria-hidden="true">✦</span>

                <strong>Made slow. Loved long.</strong>

                <small>One stitch at a time.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL — Find us online
      ===================================================== */}

      <section className="about-social">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-eyebrow">Stay connected</span>

            <h2>Follow the journey</h2>

            <p>
              New drops, behind-the-scenes and custom order slots — shared first
              on our socials.
            </p>
          </div>

          <div className="about-social-grid">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`about-social-card ${social.className}`}
                aria-label={`Visit HandyArtStore on ${social.label}`}
              >
                {/* <span className="about-social-icon" aria-hidden="true">
                  {social.icon}
                </span> */}
                <span className="about-social-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {SOCIAL_ICONS[social.key]}
                  </svg>
                </span>
                <span className="about-social-name">{social.label}</span>

                <span className="about-social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="about-final">
        <div className="about-container">
          <div className="about-final-content">
            <span className="about-final-mark" aria-hidden="true">
              ✦
            </span>

            <h2>
              Bring home something
              <span> handmade.</span>
            </h2>

            <p>
              Browse the collection or reach out for a custom piece — we'd love
              to make something just for you.
            </p>

            <div className="about-final-actions">
              <Link to="/shop" className="about-btn about-btn-primary">
                Shop Now
                <span aria-hidden="true">→</span>
              </Link>

              <Link to="/contact" className="about-btn about-btn-light">
                Request a Custom Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
