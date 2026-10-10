// import React, { useState, useContext } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/login.css"; // new separate CSS file

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // If user was redirected from a protected page,
//   // go back there after login.
//   // Otherwise go to the home page.
//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         // login(data);
//         // navigate("/");
//         login(data);

//         // Redirect to the page the user originally wanted
//         navigate(from, { replace: true });
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="login-header">
//           <span className="login-icon">🧶</span>
//           <h1>Welcome Back</h1>
//           <p>Sign in to your HandyArtStore account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
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

//           <button type="submit" className="btn btn-primary btn-login">
//             Sign In
//           </button>

//           <p className="login-footer">
//             Don't have an account? <Link to="/register">Create one</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // If the user was redirected from a protected page,
//   // send them back there after login. Otherwise home.
//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (submitting) return;

//     setErrorMessage("");
//     setSubmitting(true);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.message || "Invalid email or password.");
//       }

//       login(data);
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage(
//         error.message || "Something went wrong. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         {/* ---------- Header ---------- */}
//         <div className="login-header">
//           <span className="login-icon" aria-hidden="true">
//             🧶
//           </span>

//           <h1>Welcome Back</h1>

//           <p>Sign in to your HandyArtStore account</p>
//         </div>

//         {/* ---------- Error ---------- */}
//         {errorMessage && (
//           <div className="login-error" role="alert" aria-live="polite">
//             <span className="login-error-icon" aria-hidden="true">
//               ⚠️
//             </span>

//             <p>{errorMessage}</p>
//           </div>
//         )}

//         {/* ---------- Form ---------- */}
//         <form onSubmit={handleSubmit} className="login-form" noValidate>
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>

//             <input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//               inputMode="email"
//               autoCapitalize="none"
//               autoCorrect="off"
//               spellCheck="false"
//               required
//               aria-invalid={Boolean(errorMessage)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>

//             <div className="password-wrapper">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//                 required
//                 aria-invalid={Boolean(errorMessage)}
//               />

//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 aria-pressed={showPassword}
//               >
//                 {showPassword ? "🙈" : "👁"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary btn-login"
//             disabled={submitting}
//           >
//             {submitting ? (
//               <>
//                 <span className="btn-spinner" aria-hidden="true" />
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>

//           <p className="login-footer">
//             Don&apos;t have an account? <Link to="/register">Create one</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setErrorMessage("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    <div className="login-page">
      <div className="login-card">
        {/* ---------- Header ---------- */}
        <div className="login-header">
          <img
            // src="/handylogo.png"
            src="/logobg.png"
            alt="HandyArtStore logo"
            className="login-logo"
          />

          <h1>Welcome Back</h1>

          <p>Sign in to your HandyArtStore account</p>
        </div>

        {/* ---------- Error ---------- */}
        {errorMessage && (
          <div className="login-error" role="alert" aria-live="polite">
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
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              required
              aria-invalid={Boolean(errorMessage)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                aria-invalid={Boolean(errorMessage)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "🙈" : "👁"}
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
    </div>
  );
};

export default Login;
