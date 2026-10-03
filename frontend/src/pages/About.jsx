import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const socialLinks = [
  {
    label: "Website",
    icon: "🌐",
    href: "https://theshivanshvasu.com",
    className: "website",
  },
  {
    label: "YouTube",
    icon: "▶",
    href: "https://youtube.com/@shivanshvasu",
    className: "youtube",
  },
  {
    label: "Instagram",
    icon: "◎",
    href: "https://instagram.com/theshivanshvasuofficial",
    className: "instagram",
  },
  {
    label: "LinkedIn",
    icon: "in",
    href: "https://www.linkedin.com/in/theshivanshvasu",
    className: "linkedin",
  },
  {
    label: "X",
    icon: "𝕏",
    href: "https://x.com/theshivanshvasu",
    className: "x",
  },
  {
    label: "WhatsApp",
    icon: "◉",
    href: "https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B",
    className: "whatsapp",
  },
  {
    label: "Linktree",
    icon: "↗",
    href: "https://linktr.ee/shivanshvasu",
    className: "linktree",
  },
];

const About = () => {
  return (
    <main className="about-page">
      {/* =====================================================
          HERO
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
                  alt="Shivansh Vasu"
                  className="about-profile-image"
                />
              </div>
            </div>

            {/* CONTENT */}

            <div className="about-hero-content">
              <span className="about-eyebrow">✦ Meet the creator</span>

              <h1>
                Building things
                <span> that bring people together.</span>
              </h1>

              <p className="about-intro">
                Welcome to my platform — a space where technology, creativity
                and community come together. I share what I learn while
                building, deploying and scaling thoughtfully engineered systems.
              </p>

              <div className="about-name">
                <span className="about-name-line" />
                <div>
                  <strong>Shivansh Vasu</strong>
                  <span>@theshivanshvasu</span>
                </div>
              </div>

              <div className="about-hero-actions">
                <a
                  href="https://theshivanshvasu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn about-btn-primary"
                >
                  Visit Website
                  <span aria-hidden="true">→</span>
                </a>

                <a
                  href="https://youtube.com/@shivanshvasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn about-btn-secondary"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero-bottom-shape" />
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-eyebrow">What we're about</span>

            <h2>Build. Learn. Share.</h2>

            <p>
              A community built around curiosity, engineering and continuous
              growth.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card">
              <div className="about-value-icon">⚙️</div>

              <h3>Build</h3>

              <p>
                Turn ideas into practical, reliable and well-engineered
                products.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon">💡</div>

              <h3>Learn</h3>

              <p>
                Keep exploring new technologies and share the lessons learned
                along the way.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon">🤝</div>

              <h3>Grow Together</h3>

              <p>
                Create a community where knowledge and experience can be shared
                freely.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY / COMMUNITY
      ===================================================== */}

      <section className="about-story">
        <div className="about-container">
          <div className="about-story-card">
            <div className="about-story-content">
              <span className="about-section-eyebrow">Join the community</span>

              <h2>
                There's always more
                <span> to build.</span>
              </h2>

              <p>
                Whether you're learning your first concept or working on complex
                systems, the goal is simple: learn continuously, build
                intentionally and help others grow along the way.
              </p>

              <p>
                Follow along for engineering insights, projects, tutorials and
                ideas from the journey.
              </p>

              <a
                href="https://linktr.ee/shivanshvasu"
                target="_blank"
                rel="noopener noreferrer"
                className="about-text-link"
              >
                Explore all platforms
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="about-story-art">
              <div className="about-art-circle about-art-circle-one" />
              <div className="about-art-circle about-art-circle-two" />

              <div className="about-art-card">
                <span>✦</span>

                <strong>Grow together.</strong>

                <small>One idea at a time.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL LINKS
      ===================================================== */}

      <section className="about-social">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-eyebrow">Stay connected</span>

            <h2>Find me online</h2>

            <p>Follow the journey across the platforms below.</p>
          </div>

          <div className="about-social-grid">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`about-social-card ${social.className}`}
                aria-label={`Visit ${social.label}`}
              >
                <span className="about-social-icon">{social.icon}</span>

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
            <span className="about-final-mark">✦</span>

            <h2>
              Let's build something
              <span> meaningful.</span>
            </h2>

            <p>Explore the work, join the community and grow together.</p>

            <div className="about-final-actions">
              <Link to="/" className="about-btn about-btn-primary">
                Back to Home
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="https://theshivanshvasu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn about-btn-light"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
