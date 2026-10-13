// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "../styles/admin.css";

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/");
//       return;
//     }

//     const fetchStats = async () => {
//       try {
//         const res = await fetch("/api/analytics", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setStats(data);
//         } else {
//           if (res.status === 401) {
//             navigate("/login");
//           }
//           setStats({
//             totalOrders: 0,
//             totalProducts: 0,
//             totalUsers: 0,
//             totalRevenue: 0,
//           });
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchStats();
//   }, [user, navigate]);

//   return (
//     <div className="admin-dashboard">
//       <div className="container">
//         {/* Header */}
//         <div className="admin-header">
//           <div className="admin-header-left">
//             <img src="/handylogo.png" alt="Logo" className="admin-logo" />
//             <div>
//               <h1>Admin Dashboard</h1>
//               <p className="admin-welcome">
//                 Welcome back, <span>{user?.name}</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="stats-grid">
//           {stats ? (
//             <>
//               <div className="stat-card">
//                 <div className="stat-icon">📦</div>
//                 <div className="stat-content">
//                   <h4>Total Orders</h4>
//                   <span className="stat-number">{stats.totalOrders}</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon">🧶</div>
//                 <div className="stat-content">
//                   <h4>Total Products</h4>
//                   <span className="stat-number">{stats.totalProducts}</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon">👥</div>
//                 <div className="stat-content">
//                   <h4>Total Users</h4>
//                   <span className="stat-number">{stats.totalUsers}</span>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon">💰</div>
//                 <div className="stat-content">
//                   <h4>Total Revenue</h4>
//                   <span className="stat-number">
//                     ₹{stats.totalRevenue.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="loading-stats">
//               <div className="spinner"></div>
//               <p>Loading metrics...</p>
//             </div>
//           )}
//         </div>

//         {/* Admin Controls */}
//         <div className="admin-controls">
//           <h3>Administrative Controls</h3>
//           <div className="controls-grid">
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate("/admin/add-product")}
//             >
//               + Add Product
//             </button>
//             <button
//               className="btn btn-outline"
//               onClick={() => navigate("/admin/products")}
//             >
//               📦 Manage Products
//             </button>
//             <button
//               className="btn btn-outline"
//               onClick={() => navigate("/admin/orders")}
//             >
//               🚚 Manage Orders
//             </button>
//             <button
//               className="btn btn-outline"
//               onClick={() => navigate("/admin/users")}
//             >
//               👥 Users Directory
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/admin.css";

/* ============================================================
   ICONS
============================================================ */

const BoxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

const YarnIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M5.5 7c3.5 2 9 3 12 2.2" />
    <path d="M4.3 12c4 1.5 10 .8 13.4-2.2" />
    <path d="M5 16.5c3 1.6 8.5 1 12-1" />
    <path d="M16 4.5c-2.5 3-2 8 0 12" />
    <path d="M10.5 3.6c-1.3 3.6-.6 8.2 1.4 11.6" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RupeeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13h8a4 4 0 0 0 0-8" />
    <path d="M6 13l8.5 8" />
  </svg>
);

const PlusIcon = () => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TruckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ============================================================
   NUMBER GUARD — prevents .toFixed() crashes
============================================================ */

const safeNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const formatCurrency = (value) =>
  `₹${safeNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* ============================================================
   COMPONENT
============================================================ */

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  /* ------------------------------------------------------------
     Fetch analytics — logic preserved, plus error surfacing
  ------------------------------------------------------------ */

  const fetchStats = useCallback(async () => {
    setError("");

    try {
      const res = await fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${user?.token || ""}` },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStats(data);
        return;
      }

      /* 401 → redirect to login */
      if (res.status === 401) {
        navigate("/login", { replace: true });
        return;
      }

      /* Other error — show real message instead of fake 0s */
      setError(
        data?.message || `Couldn't load analytics (status ${res.status}).`,
      );

      setStats({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0,
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);

      /* Fixes the infinite-spinner bug: set stats so the
         cards render, AND tell the admin what happened. */
      setError(
        err?.message || "Network error — couldn't reach the analytics server.",
      );

      setStats({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0,
      });
    }
  }, [user?.token, navigate]);

  /* ------------------------------------------------------------
     Auth guard + initial load
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    fetchStats();
  }, [user, navigate, fetchStats]);

  /* ------------------------------------------------------------
     Don't render for non-admins (prevents flash)
  ------------------------------------------------------------ */

  if (!user || user.role !== "admin") return null;

  /* ------------------------------------------------------------
     Render
  ------------------------------------------------------------ */

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* ---------- Header ---------- */}
        <div className="admin-header">
          <div className="admin-header-left">
            <img
              src="/logobg.png"
              alt="HandyArtStore logo"
              className="admin-logo"
              width="44"
              height="44"
              loading="eager"
              decoding="async"
            />
            <div>
              <h1>Admin Dashboard</h1>
              <p className="admin-welcome">
                Welcome back, <span>{user?.name || "Admin"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Error banner (was silent before) ---------- */}
        {error && (
          <div className="admin-error-banner" role="alert">
            <span className="admin-error-icon" aria-hidden="true">
              ⚠
            </span>
            <div className="admin-error-text">
              <strong>Analytics unavailable</strong>
              <p>{error}</p>
            </div>
            <button
              type="button"
              className="admin-error-retry"
              onClick={fetchStats}
            >
              Retry
            </button>
          </div>
        )}

        {/* ---------- Stats cards ---------- */}
        <div className="stats-grid">
          {stats ? (
            <>
              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">
                  <BoxIcon />
                </div>
                <div className="stat-content">
                  <h4>Total Orders</h4>
                  <span className="stat-number">
                    {safeNumber(stats.totalOrders)}
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">
                  <YarnIcon />
                </div>
                <div className="stat-content">
                  <h4>Total Products</h4>
                  <span className="stat-number">
                    {safeNumber(stats.totalProducts)}
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">
                  <UsersIcon />
                </div>
                <div className="stat-content">
                  <h4>Total Users</h4>
                  <span className="stat-number">
                    {safeNumber(stats.totalUsers)}
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" aria-hidden="true">
                  <RupeeIcon />
                </div>
                <div className="stat-content">
                  <h4>Total Revenue</h4>
                  <span className="stat-number">
                    {formatCurrency(stats.totalRevenue)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="loading-stats" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true" />
              <p>Loading metrics…</p>
            </div>
          )}
        </div>

        {/* ---------- Admin controls ---------- */}
        <div className="admin-controls">
          <h3>Administrative Controls</h3>

          <div className="controls-grid">
            <Link to="/admin/add-product" className="btn btn-primary">
              <PlusIcon />
              Add Product
            </Link>

            <Link to="/admin/products" className="btn btn-outline">
              <BoxIcon />
              Manage Products
            </Link>

            <Link to="/admin/orders" className="btn btn-outline">
              <TruckIcon />
              Manage Orders
            </Link>

            <Link to="/admin/users" className="btn btn-outline">
              <UsersIcon />
              Users Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
