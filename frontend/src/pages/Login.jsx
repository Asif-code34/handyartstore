import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

/* ---------- SVG icons (consistent across every OS) ---------- */
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- Robust redirect target ----------
     Accepts either a string ("/checkout") or a location object. */
  const from =
    typeof location.state?.from === "string"
      ? location.state.from
      : location.state?.from?.pathname || "/";

  /* ---------- Soft message from Checkout ---------- */
  const infoMessage = location.state?.message || "";

  /* ---------- Already logged in? Bounce out. ---------- */
  useEffect(() => {
    if (user) navigate(from, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ---------- Clear error as soon as the user edits ---------- */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setErrorMessage("");

    /* Client-side validation — don't make a network round-trip
       just to learn the user forgot the @ sign. */
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("That doesn't look like a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      login(data);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        {/* ---------- Header ---------- */}
        <div className="login-header">
          <img
            src="/logobg.png"
            alt="HandyArtStore logo"
            className="login-logo"
            width="92"
            height="92"
            loading="eager"
            decoding="async"
          />

          <h1>Welcome Back</h1>

          <p>Sign in to your HandyArtStore account</p>
        </div>

        {/* ---------- Contextual message (from Checkout) ---------- */}
        {infoMessage && !errorMessage && (
          <div className="login-info" role="status">
            <span className="login-info-icon" aria-hidden="true">
              ℹ
            </span>
            <p>{infoMessage}</p>
          </div>
        )}

        {/* ---------- Error ---------- */}
        {errorMessage && (
          <div className="login-error" role="alert">
            <span className="login-error-icon" aria-hidden="true">
              ⚠️
            </span>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              autoFocus
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <div className="form-group-head">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="login-forgot">
                Forgot password?
              </Link>
            </div>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                disabled={submitting}
                required
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

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="login-footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
