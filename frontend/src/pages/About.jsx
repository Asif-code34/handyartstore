import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

/* ============================================================
   SOCIAL LINKS
============================================================ */

const socialLinks = [
  {
    label: "Instagram",
    icon: "◎",
    href: "https://instagram.com/handyartstore",
    className: "instagram",
  },
  {
    label: "WhatsApp",
    icon: "◉",
    href: "https://wa.me/919999999999",
    className: "whatsapp",
  },
  {
    label: "Pinterest",
    icon: "❋",
    href: "https://pinterest.com/handyartstore",
    className: "pinterest",
  },
  {
    label: "Facebook",
    icon: "f",
    href: "https://facebook.com/handyartstore",
    className: "facebook",
  },
  {
    label: "YouTube",
    icon: "▶",
    href: "https://youtube.com/@handyartstore",
    className: "youtube",
  },
  {
    label: "Email Us",
    icon: "✉",
    href: "mailto:hello@handyartstore.com",
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

                <img
                  src="/redFlowerBouquet.jpeg"
                  alt="A hand-crocheted bouquet crafted by HandyArtStore"
                  className="about-profile-image"
                  loading="lazy"
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
                <span className="about-social-icon" aria-hidden="true">
                  {social.icon}
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
