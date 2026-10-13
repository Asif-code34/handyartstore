// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/register.css"; // new CSS file

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert(
//           "Registration Successful! Please check your email for the Welcome OTP.",
//         );
//         login(data);
//         navigate("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-card">
//         <div className="register-header">
//           <span className="register-icon">
//             <img
//               // src="/handylogo.png"
//               src="/logobg.png"
//               alt="HandyArtStore logo"
//               className="login-logo"
//             />
//           </span>
//           <h1>Create Account</h1>
//           <p>Join the HandyArtStore community</p>
//         </div>

//         <form onSubmit={handleSubmit} className="register-form">
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               placeholder="John Doe"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary btn-register">
//             Create Account
//           </button>

//           <p className="register-footer">
//             Already have an account? <Link to="/login">Sign in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/register.css";

/* ============================================================
   ICONS
============================================================ */

const EyeIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17.94 17.94A10.9 10.9 0 0 1 12 19c-6.4 0-10-7-10-7a18 18 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c6.4 0 10 7 10 7a18 18 0 0 1-2.16 3.19" />
    <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ============================================================
   VALIDATION
============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, password, confirmPassword }) => {
  if (!name.trim()) return "Please enter your full name.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";

  if (!email.trim()) return "Please enter your email address.";
  if (!EMAIL_RE.test(email.trim()))
    return "That doesn't look like a valid email address.";

  if (!password) return "Please choose a password.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (password.length > 72) return "Password is too long (max 72 characters).";

  if (password !== confirmPassword) return "Passwords do not match.";

  return "";
};

/* ============================================================
   COMPONENT
============================================================ */

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ------------------------------------------------------------
     Already logged in → bounce out
  ------------------------------------------------------------ */

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  /* ------------------------------------------------------------
     Clear messages on user input
  ------------------------------------------------------------ */

  const clearMessages = () => {
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  /* ------------------------------------------------------------
     Submit — backend contract unchanged
     (same endpoint, same payload fields: name, email, password)
  ------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validate({
      name,
      email,
      password,
      confirmPassword,
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || "Registration failed. Please try again.",
        );
      }

      /* Success: show confirmation, then log in + navigate.
         The 900ms delay lets the user actually read the message. */
      setSuccessMessage(
        "Account created! Check your email for your Welcome OTP.",
      );

      setTimeout(() => {
        login(data);
        navigate("/", { replace: true });
      }, 900);
    } catch (error) {
      console.error("Register error:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">
        {/* ---------- Header ---------- */}
        <div className="register-header">
          <img
            src="/logobg.png"
            alt="HandyArtStore logo"
            className="register-logo"
            width="92"
            height="92"
            loading="eager"
            decoding="async"
          />

          <h1>Create Account</h1>
          <p>Join the HandyArtStore community</p>
        </div>

        {/* ---------- Success ---------- */}
        {successMessage && (
          <div className="register-success" role="status" aria-live="polite">
            <span className="register-msg-icon" aria-hidden="true">
              <CheckIcon />
            </span>
            <p>{successMessage}</p>
          </div>
        )}

        {/* ---------- Error ---------- */}
        {errorMessage && (
          <div className="register-error" role="alert">
            <span className="register-msg-icon" aria-hidden="true">
              <AlertIcon />
            </span>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearMessages();
              }}
              autoComplete="name"
              autoCapitalize="words"
              spellCheck="false"
              autoFocus
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearMessages();
              }}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessages();
                }}
                autoComplete="new-password"
                disabled={submitting}
                required
                minLength={6}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                tabIndex={submitting ? -1 : 0}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div className="password-wrapper">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearMessages();
                }}
                autoComplete="new-password"
                disabled={submitting}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                aria-pressed={showConfirm}
                tabIndex={submitting ? -1 : 0}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-register"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="register-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
