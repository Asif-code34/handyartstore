// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import "../styles/profile.css";

// const Profile = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     const fetchMyOrders = async () => {
//       try {
//         const res = await fetch("/api/orders/myorders", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setOrders(Array.isArray(data) ? data : []);
//         } else {
//           if (res.status === 401) {
//             logout();
//             navigate("/login");
//           }
//           setOrders([]);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyOrders();
//   }, [user, navigate, logout]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (!user) return null;

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         {/* ---- User Card ---- */}
//         <div className="profile-header">
//           <div className="profile-user">
//             <div className="profile-avatar">
//               {user.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="profile-user-info">
//               <h2 className="profile-name">{user.name}</h2>
//               <p className="profile-email">{user.email}</p>
//               <span className="profile-role">{user.role.toUpperCase()}</span>
//             </div>
//           </div>
//           <button onClick={handleLogout} className="btn btn-logout">
//             Logout
//           </button>
//         </div>

//         {/* ---- Order History ---- */}
//         <div className="profile-orders">
//           <h3 className="orders-title">Order History</h3>

//           {loading ? (
//             <div className="orders-loading">
//               <div className="spinner"></div>
//               <p>Fetching your orders...</p>
//             </div>
//           ) : orders.length === 0 ? (
//             <div className="orders-empty">
//               <div className="empty-icon">🛍️</div>
//               <p>You haven't placed any orders yet.</p>
//               <Link to="/shop" className="btn btn-primary">
//                 Start Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="orders-list">
//               {orders.map((order) => (
//                 <div key={order._id} className="order-card">
//                   <div className="order-info">
//                     <div className="order-id">
//                       <span className="label">Order ID</span>
//                       <span className="value">{order._id}</span>
//                     </div>
//                     <div className="order-date">
//                       <span className="label">Placed On</span>
//                       <span className="value">
//                         {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </span>
//                     </div>
//                     <div className="order-total">
//                       <span className="label">Total</span>
//                       <span className="value total-price">
//                         ₹{order.totalAmount.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="order-status">
//                     <span
//                       className={`status-badge ${order.status.toLowerCase()}`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // Fetch orders (memoized)
  // ------------------------------------------------------------
  const fetchOrders = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        throw new Error(data?.message || "Failed to fetch orders");
      }

      // Ensure we have an array and sort newest first
      const ordersArray = Array.isArray(data) ? data : [];
      ordersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(ordersArray);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user, logout, navigate]);

  // ------------------------------------------------------------
  // Initial fetch and redirect if not logged in
  // ------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate, fetchOrders]);

  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRetry = () => {
    fetchOrders();
  };

  // ------------------------------------------------------------
  // Early return if user is null (avoid flash)
  // ------------------------------------------------------------
  if (!user) return null;

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* ========== USER CARD ========== */}
        <div className="profile-header">
          <div className="profile-user">
            <div className="profile-avatar" aria-label="User avatar">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="profile-user-info">
              <h2 className="profile-name">{user.name || "User"}</h2>
              <p className="profile-email">{user.email || "No email"}</p>
              <span className="profile-role">
                {user.role?.toUpperCase() || "USER"}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>

        {/* ========== ORDER HISTORY ========== */}
        <div className="profile-orders">
          <div className="orders-header">
            <h3 className="orders-title">Order History</h3>
            {!loading && !error && (
              <button
                onClick={handleRetry}
                className="btn btn-refresh"
                aria-label="Refresh orders"
              >
                ↻ Refresh
              </button>
            )}
          </div>

          {/* ----- Loading state ----- */}
          {loading && (
            <div className="orders-loading">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="order-skeleton">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line medium" />
                </div>
              ))}
            </div>
          )}

          {/* ----- Error state ----- */}
          {!loading && error && (
            <div className="orders-error">
              <p className="error-message">{error}</p>
              <button onClick={handleRetry} className="btn btn-retry">
                Retry
              </button>
            </div>
          )}

          {/* ----- Empty state ----- */}
          {!loading && !error && orders.length === 0 && (
            <div className="orders-empty">
              <div className="empty-icon">🛍️</div>
              <p>You haven't placed any orders yet.</p>
              <Link to="/shop" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          )}

          {/* ----- Orders list ----- */}
          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-info">
                    <div className="order-id">
                      <span className="label">Order ID</span>
                      <span className="value" title={order._id}>
                        {order._id.slice(0, 10)}…
                      </span>
                    </div>
                    <div className="order-date">
                      <span className="label">Placed On</span>
                      <span className="value">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="order-total">
                      <span className="label">Total</span>
                      <span className="value total-price">
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="order-status">
                    <span
                      className={`status-badge ${
                        order.status?.toLowerCase() || "pending"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
