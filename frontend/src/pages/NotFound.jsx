// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <style>
        {`
          /* ===== NOT FOUND PAGE ===== */
          .not-found {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 24px;
            background: #fcf8f3;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .not-found-content {
            max-width: 640px;
            width: 100%;
            text-align: center;
            padding: 40px 24px;
            background: #ffffff;
            border-radius: 24px;
            box-shadow: 0 8px 40px rgba(90, 63, 54, 0.08);
            border: 1px solid rgba(212, 160, 138, 0.15);
            transition: transform 0.3s ease;
          }

          .not-found-icon {
            font-size: 4.5rem;
            line-height: 1;
            margin-bottom: 8px;
            display: block;
          }

          .not-found-code {
            font-family: "Playfair Display", Georgia, serif;
            font-size: 7rem;
            font-weight: 700;
            color: #5a3f36;
            margin: 0;
            line-height: 1;
            background: linear-gradient(135deg, #5a3f36 30%, #d4a08a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .not-found-title {
            font-family: "Playfair Display", Georgia, serif;
            font-size: 1.8rem;
            font-weight: 600;
            color: #2d2420;
            margin: 8px 0 12px;
          }

          .not-found-message {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #8b6b5e;
            max-width: 440px;
            margin: 0 auto 28px;
          }

          .not-found-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 36px;
            background: #5a3f36;
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 4px 16px rgba(90, 63, 54, 0.15);
          }

          .not-found-btn:hover {
            background: #2d2420;
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(90, 63, 54, 0.25);
          }

          .not-found-btn:active {
            transform: scale(0.97);
          }

          /* Responsive */
          @media (max-width: 640px) {
            .not-found {
              padding: 24px 16px;
              min-height: 60vh;
            }
            .not-found-content {
              padding: 32px 16px;
            }
            .not-found-code {
              font-size: 5rem;
            }
            .not-found-title {
              font-size: 1.4rem;
            }
            .not-found-message {
              font-size: 0.95rem;
            }
            .not-found-btn {
              padding: 12px 28px;
              font-size: 0.95rem;
            }
            .not-found-icon {
              font-size: 3.5rem;
            }
          }

          @media (max-width: 420px) {
            .not-found-code {
              font-size: 4rem;
            }
            .not-found-title {
              font-size: 1.2rem;
            }
            .not-found-message {
              font-size: 0.88rem;
            }
            .not-found-btn {
              padding: 10px 24px;
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      <div className="not-found">
        <div className="not-found-content">
          <span className="not-found-icon">🧶</span>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page not found</h2>
          <p className="not-found-message">
            Oops! The page you are looking for might have been moved, deleted,
            or never existed. Let’s get you back on track.
          </p>
          <Link to="/" className="not-found-btn">
            <span>🏠</span> Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
