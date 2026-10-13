// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/admin-orders.css";

// const AdminOrders = () => {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const res = await fetch("/api/orders", {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     };
//     fetchOrders();
//   }, [user]);

//   const updateStatus = async (id, status) => {
//     const res = await fetch(`/api/orders/${id}/status`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify({ status }),
//     });
//     if (res.ok) {
//       setOrders(
//         orders.map((order) =>
//           order._id === id ? { ...order, status } : order,
//         ),
//       );
//     }
//   };

//   return (
//     <div className="admin-orders">
//       <div className="admin-orders-header">
//         <h1>Manage Orders</h1>
//       </div>

//       <div className="admin-orders-table-wrapper">
//         <table className="admin-orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User</th>
//               <th>Total</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td className="order-id" data-label="Order ID">
//                   {order._id.substring(0, 8)}…
//                 </td>
//                 <td className="order-user" data-label="User">
//                   {order.userId?.name || "Deleted User"}
//                 </td>
//                 <td className="order-total" data-label="Total">
//                   ₹{order.totalAmount.toFixed(2)}
//                 </td>
//                 <td className="order-date" data-label="Date">
//                   {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td className="order-status" data-label="Status">
//                   <select
//                     value={order.status}
//                     onChange={(e) => updateStatus(order._id, e.target.value)}
//                     className={`status-select ${order.status.toLowerCase()}`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/admin-orders.css";

/* ============================================================
   HELPERS — crash-proof formatters
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

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const shortId = (value) =>
  typeof value === "string" && value.length > 8
    ? `${value.substring(0, 8)}…`
    : value || "—";

const safeStatus = (value) => {
  const s = typeof value === "string" ? value : "Pending";
  return ["Pending", "Shipped", "Delivered"].includes(s) ? s : "Pending";
};

/* ============================================================
   ICONS
============================================================ */

const AlertIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
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

const CheckIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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

const CloseIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InboxIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

/* ============================================================
   COMPONENT
============================================================ */

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState(null);

  /* ------------------------------------------------------------
     Auto-dismiss toast
  ------------------------------------------------------------ */

  const toastTimer = useRef(null);

  const showToast = useCallback((type, text) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, text });
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  /* ------------------------------------------------------------
     Auth guard — non-admins bounce out
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") navigate("/", { replace: true });
  }, [user, navigate]);

  /* ------------------------------------------------------------
     Fetch orders — same endpoint, safe handling
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!user?.token) return;

    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
          signal: controller.signal,
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            data?.message || `Failed to load orders (${res.status}).`,
          );
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Fetch orders error:", err);
        setError(err.message || "Unable to load orders. Please try again.");
        setOrders([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, [user?.token]);

  /* ------------------------------------------------------------
     Update status — optimistic + rollback on failure
     Backend call is IDENTICAL to before.
  ------------------------------------------------------------ */

  const updateStatus = async (id, status) => {
    if (updatingId === id) return;

    const previousOrders = orders;

    /* Optimistic: update UI immediately */
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status } : order)),
    );

    setUpdatingId(id);

    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update status");
      }

      showToast("success", `Order marked as ${status}.`);
    } catch (err) {
      console.error("Update order status error:", err);

      /* Roll back UI */
      setOrders(previousOrders);

      showToast(
        "error",
        err.message || "Couldn't update status. Please try again.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------------------------------------------------
     Don't render for non-admins
  ------------------------------------------------------------ */

  if (!user || user.role !== "admin") return null;

  /* ------------------------------------------------------------
     Render
  ------------------------------------------------------------ */

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <div>
          <h1>Manage Orders</h1>
          {!loading && !error && (
            <p className="admin-orders-count">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
          )}
        </div>
      </div>

      {/* ---------- Error state ---------- */}
      {error && !loading && (
        <div className="admin-orders-error" role="alert">
          <span className="admin-orders-error-icon" aria-hidden="true">
            <AlertIcon />
          </span>
          <div className="admin-orders-error-text">
            <strong>Unable to load orders</strong>
            <p>{error}</p>
          </div>
          <button
            type="button"
            className="admin-orders-retry"
            onClick={() => {
              /* simple refetch trigger */
              setLoading(true);
              setError("");
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ---------- Loading state ---------- */}
      {loading && (
        <div className="admin-orders-loading" role="status" aria-live="polite">
          <span className="admin-orders-spinner" aria-hidden="true" />
          <p>Loading orders…</p>
        </div>
      )}

      {/* ---------- Empty state ---------- */}
      {!loading && !error && orders.length === 0 && (
        <div className="admin-orders-empty">
          <div className="admin-orders-empty-icon" aria-hidden="true">
            <InboxIcon size={52} />
          </div>
          <h2>No orders yet</h2>
          <p>
            When a customer places an order, it will appear here for you to
            manage.
          </p>
        </div>
      )}

      {/* ---------- Table ---------- */}
      {!loading && !error && orders.length > 0 && (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const status = safeStatus(order.status);
                const isUpdating = updatingId === order._id;

                return (
                  <tr key={order._id}>
                    <td className="order-id" data-label="Order ID">
                      {shortId(order._id)}
                    </td>

                    <td className="order-user" data-label="User">
                      {order.userId?.name || "Deleted User"}
                    </td>

                    <td className="order-total" data-label="Total">
                      {formatCurrency(order.totalAmount)}
                    </td>

                    <td className="order-date" data-label="Date">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="order-status" data-label="Status">
                      <div className="order-status-wrapper">
                        <select
                          value={status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className={`status-select ${status.toLowerCase()}`}
                          disabled={isUpdating}
                          aria-label={`Order status: ${status}. Change to update.`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        {isUpdating && (
                          <span
                            className="order-status-spinner"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div
          className={`admin-orders-toast ${toast.type}`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span className="admin-orders-toast-icon" aria-hidden="true">
            {toast.type === "error" ? <AlertIcon size={16} /> : <CheckIcon />}
          </span>

          <p className="admin-orders-toast-text">{toast.text}</p>

          <button
            type="button"
            className="admin-orders-toast-close"
            onClick={() => setToast(null)}
            aria-label="Dismiss"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
