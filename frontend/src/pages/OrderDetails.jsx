// import React, { useEffect, useState, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/order-details.css";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`/api/orders/${id}`, {
//           headers: {
//             Authorization: `Bearer ${user?.token}`,
//           },
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Unable to load order");
//         }

//         setOrder(data);
//       } catch (error) {
//         console.error("Fetch order details error:", error);
//         setError(error.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.token && id) {
//       fetchOrder();
//     }
//   }, [id, user?.token]);

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//     });
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Pending":
//         return "status-pending";
//       case "Shipped":
//         return "status-shipped";
//       case "Delivered":
//         return "status-delivered";
//       default:
//         return "status-pending";
//     }
//   };

//   const getStatusStep = (status) => {
//     switch (status) {
//       case "Pending":
//         return 1;
//       case "Shipped":
//         return 2;
//       case "Delivered":
//         return 3;
//       default:
//         return 1;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="order-details-page">
//         <div className="order-details-container">
//           <div className="order-details-loading">
//             <div className="loading-spinner"></div>
//             <h2>Loading your order...</h2>
//             <p>Please wait while we fetch your order details.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="order-details-page">
//         <div className="order-details-container">
//           <div className="order-details-error">
//             <div className="error-icon">🔍</div>

//             <h2>Order not found</h2>

//             <p>{error || "We couldn't find the order you're looking for."}</p>

//             <Link to="/orders" className="order-primary-btn">
//               View My Orders
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentStep = getStatusStep(order.status);

//   return (
//     <div className="order-details-page">
//       <div className="order-details-container">
//         {/* Breadcrumb */}
//         <div className="order-breadcrumb">
//           <Link to="/">Home</Link>
//           <span>/</span>
//           <Link to="/orders">My Orders</Link>
//           <span>/</span>
//           <span>Order Details</span>
//         </div>

//         {/* Header */}
//         <div className="order-details-header">
//           <div>
//             <Link to="/orders" className="back-orders-link">
//               ← Back to My Orders
//             </Link>

//             <h1>Order Details</h1>

//             <div className="order-meta">
//               <span>Order #{order._id.slice(-8).toUpperCase()}</span>

//               <span className="meta-divider">•</span>

//               <span>Placed on {formatDate(order.createdAt)}</span>
//             </div>
//           </div>

//           <div className={`order-status ${getStatusClass(order.status)}`}>
//             <span className="status-dot"></span>
//             {order.status}
//           </div>
//         </div>

//         {/* Order Tracking */}
//         <section className="order-card tracking-card">
//           <div className="card-heading">
//             <div>
//               <h2>Order Status</h2>
//               <p>
//                 {order.status === "Delivered"
//                   ? "Your order has been delivered successfully."
//                   : order.status === "Shipped"
//                     ? "Your order is on its way."
//                     : "Your order has been received and is being prepared."}
//               </p>
//             </div>
//           </div>

//           <div className="order-tracker">
//             {/* Pending */}
//             <div
//               className={`tracker-step ${currentStep >= 1 ? "completed" : ""}`}
//             >
//               <div className="tracker-icon">{currentStep > 1 ? "✓" : "1"}</div>

//               <div className="tracker-content">
//                 <strong>Order Placed</strong>
//                 <span>{formatDateTime(order.createdAt)}</span>
//               </div>
//             </div>

//             <div
//               className={`tracker-line ${currentStep >= 2 ? "active" : ""}`}
//             ></div>

//             {/* Shipped */}
//             <div
//               className={`tracker-step ${currentStep >= 2 ? "completed" : ""}`}
//             >
//               <div className="tracker-icon">{currentStep > 2 ? "✓" : "2"}</div>

//               <div className="tracker-content">
//                 <strong>Shipped</strong>
//                 <span>
//                   {currentStep >= 2
//                     ? "Your order is on its way"
//                     : "Waiting for shipment"}
//                 </span>
//               </div>
//             </div>

//             <div
//               className={`tracker-line ${currentStep >= 3 ? "active" : ""}`}
//             ></div>

//             {/* Delivered */}
//             <div
//               className={`tracker-step ${currentStep >= 3 ? "completed" : ""}`}
//             >
//               <div className="tracker-icon">{currentStep >= 3 ? "✓" : "3"}</div>

//               <div className="tracker-content">
//                 <strong>Delivered</strong>
//                 <span>
//                   {currentStep >= 3
//                     ? "Order delivered successfully"
//                     : "Not delivered yet"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <div className="order-details-grid">
//           {/* Left Column */}
//           <div className="order-details-main">
//             {/* Products */}
//             <section className="order-card">
//               <div className="card-heading">
//                 <div>
//                   <h2>Items in Your Order</h2>
//                   <p>
//                     {order.items.length}{" "}
//                     {order.items.length === 1 ? "item" : "items"}
//                   </p>
//                 </div>
//               </div>

//               <div className="order-items">
//                 {order.items.map((item) => (
//                   <div
//                     className="order-detail-item"
//                     key={item._id || item.productId?._id}
//                   >
//                     <div className="order-item-image-wrapper">
//                       {item.productId?.imageUrl ? (
//                         <img
//                           src={item.productId.imageUrl}
//                           alt={item.productId.name}
//                           className="order-item-image"
//                           loading="lazy"
//                         />
//                       ) : (
//                         <div className="order-item-placeholder">🧶</div>
//                       )}
//                     </div>

//                     <div className="order-item-info">
//                       <Link
//                         to={`/product/${item.productId?._id}`}
//                         className="order-item-name"
//                       >
//                         {item.productId?.name || "Product"}
//                       </Link>

//                       <p className="order-item-unit-price">
//                         ₹{Number(item.price).toFixed(2)} each
//                       </p>

//                       <div className="order-item-quantity">
//                         Quantity: <strong>{item.qty}</strong>
//                       </div>
//                     </div>

//                     <div className="order-item-total">
//                       ₹{(item.price * item.qty).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Shipping Address */}
//             <section className="order-card">
//               <div className="card-heading">
//                 <div>
//                   <h2>Shipping Address</h2>
//                   <p>Delivery address for this order</p>
//                 </div>
//               </div>

//               <div className="shipping-address">
//                 <div className="address-icon">📍</div>

//                 <div>
//                   <strong>{order.address.fullName}</strong>

//                   <p>{order.address.street}</p>

//                   <p>
//                     {order.address.city}, {order.address.postalCode}
//                   </p>

//                   <p>{order.address.country}</p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Right Column */}
//           <aside className="order-details-sidebar">
//             {/* Order Summary */}
//             <section className="order-card order-summary-card">
//               <div className="card-heading">
//                 <h2>Order Summary</h2>
//               </div>

//               <div className="summary-row">
//                 <span>Items</span>
//                 <span>
//                   {order.items.reduce((total, item) => total + item.qty, 0)}
//                 </span>
//               </div>

//               <div className="summary-row">
//                 <span>Subtotal</span>
//                 <span>₹{Number(order.totalAmount).toFixed(2)}</span>
//               </div>

//               <div className="summary-row">
//                 <span>Shipping</span>
//                 <span className="free-shipping">Included</span>
//               </div>

//               <div className="summary-divider"></div>

//               <div className="summary-total">
//                 <span>Total</span>
//                 <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
//               </div>
//             </section>

//             {/* Payment */}
//             <section className="order-card payment-card">
//               <div className="card-heading">
//                 <h2>Payment Information</h2>
//               </div>

//               <div className="payment-info-row">
//                 <span>Payment Status</span>

//                 <span className="payment-success">✓ Paid</span>
//               </div>

//               {order.paymentId && (
//                 <div className="payment-info-row payment-id-row">
//                   <span>Transaction ID</span>

//                   <span className="payment-id" title={order.paymentId}>
//                     {order.paymentId.length > 18
//                       ? `${order.paymentId.slice(0, 18)}...`
//                       : order.paymentId}
//                   </span>
//                 </div>
//               )}

//               <div className="payment-info-row">
//                 <span>Order Date</span>
//                 <span>{formatDate(order.createdAt)}</span>
//               </div>
//             </section>

//             {/* Help */}
//             <section className="order-help-card">
//               <div className="help-icon">💬</div>

//               <div>
//                 <h3>Need help?</h3>
//                 <p>Have a question about your order?</p>

//                 <Link to="/contact">Contact us →</Link>
//               </div>
//             </section>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/order-details.css";

/* ============================================================
   GUARDS — crash-proof accessors
============================================================ */

const shortOrderId = (id) =>
  typeof id === "string" && id.length >= 8 ? id.slice(-8).toUpperCase() : "—";

const safeNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const formatMoney = (value) =>
  `₹${safeNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const truncatePaymentId = (id) => {
  if (!id || typeof id !== "string") return "—";
  return id.length > 18 ? `${id.slice(0, 18)}…` : id;
};

const safeStatus = (value) => {
  const s = typeof value === "string" ? value : "Pending";
  return ["Pending", "Shipped", "Delivered"].includes(s) ? s : "Pending";
};

const statusClass = (status) => safeStatus(status).toLowerCase();

const statusStep = (status) => {
  switch (safeStatus(status)) {
    case "Shipped":
      return 2;
    case "Delivered":
      return 3;
    default:
      return 1;
  }
};

const statusHeadline = (status) => {
  switch (safeStatus(status)) {
    case "Delivered":
      return "Your order has been delivered successfully.";
    case "Shipped":
      return "Your order is on its way.";
    default:
      return "Your order has been received and is being prepared.";
  }
};

/* ============================================================
   COMPONENT
============================================================ */

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------------------------------------------------
     Fetch order
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!user?.token || !id) return;

    const controller = new AbortController();

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
          signal: controller.signal,
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data?.message || "Unable to load order");
        }

        setOrder(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Fetch order details error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchOrder();

    return () => controller.abort();
  }, [id, user?.token]);

  /* ------------------------------------------------------------
     Loading
  ------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div
            className="order-details-loading"
            role="status"
            aria-live="polite"
          >
            <div className="order-details-spinner" aria-hidden="true" />
            <h2>Loading your order…</h2>
            <p>Please wait while we fetch your order details.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------
     Error / not found
  ------------------------------------------------------------ */

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div className="order-details-error" role="alert">
            <div className="order-details-error-icon" aria-hidden="true">
              🔍
            </div>

            <h2>Order not found</h2>

            <p>{error || "We couldn't find the order you're looking for."}</p>

            <Link
              to="/orders"
              className="order-details-btn order-details-btn-primary"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------
     Derived values
  ------------------------------------------------------------ */

  const items = Array.isArray(order.items) ? order.items : [];
  const currentStep = statusStep(order.status);
  const status = safeStatus(order.status);
  const statusCls = statusClass(order.status);

  const itemsCount = items.reduce(
    (total, item) => total + safeNumber(item.qty, 0),
    0,
  );

  const subtotal = safeNumber(order.totalAmount);

  /* ------------------------------------------------------------
     Render
  ------------------------------------------------------------ */

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        {/* Breadcrumb */}
        <nav className="order-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/orders">My Orders</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Order Details</span>
        </nav>

        {/* Back link */}
        <Link to="/orders" className="order-details-back">
          <span aria-hidden="true">←</span>
          Back to My Orders
        </Link>

        {/* Header */}
        <header className="order-details-header">
          <div className="order-details-header-left">
            <p className="order-details-label">
              Order #{shortOrderId(order._id)}
            </p>

            <h1 className="order-details-title">Order Details</h1>

            <p className="order-details-date">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className={`order-details-status ${statusCls}`}>{status}</div>
        </header>

        {/* Order tracking — timeline style */}
        <section className="order-details-card">
          <div className="order-details-card-title">
            <span style={{ margin: 0 }}>Order Status</span>
          </div>

          <p
            style={{
              margin: "-12px 0 22px",
              color: "#8c7b73",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            {statusHeadline(order.status)}
          </p>

          <div className="order-timeline">
            {/* Step 1 — Order Placed */}
            <div
              className={`timeline-item ${currentStep >= 1 ? "completed" : ""}`}
            >
              <div className="timeline-marker-wrapper">
                <div className="timeline-marker" />
                <div className="timeline-line" />
              </div>

              <div className="timeline-content">
                <h3 className="timeline-title">Order Placed</h3>
                <p className="timeline-description">
                  {formatDateTime(order.createdAt)}
                </p>
              </div>
            </div>

            {/* Step 2 — Shipped */}
            <div
              className={`timeline-item ${currentStep >= 2 ? "completed" : ""}`}
            >
              <div className="timeline-marker-wrapper">
                <div className="timeline-marker" />
                <div className="timeline-line" />
              </div>

              <div className="timeline-content">
                <h3 className="timeline-title">Shipped</h3>
                <p className="timeline-description">
                  {currentStep >= 2
                    ? "Your order is on its way"
                    : "Waiting for shipment"}
                </p>
              </div>
            </div>

            {/* Step 3 — Delivered */}
            <div
              className={`timeline-item ${currentStep >= 3 ? "completed" : ""}`}
            >
              <div className="timeline-marker-wrapper">
                <div className="timeline-marker" />
              </div>

              <div className="timeline-content">
                <h3 className="timeline-title">Delivered</h3>
                <p className="timeline-description">
                  {currentStep >= 3
                    ? "Order delivered successfully"
                    : "Not delivered yet"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="order-details-grid">
          {/* Left column */}
          <div className="order-details-main">
            {/* Items */}
            <section className="order-details-card">
              <div className="order-details-card-title">
                Items in Your Order
                <span>
                  {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </span>
              </div>

              {items.length === 0 ? (
                <p style={{ margin: 0, color: "#8c7b73", fontSize: 14 }}>
                  No items recorded for this order.
                </p>
              ) : (
                items.map((item, index) => (
                  <div
                    className="order-detail-item"
                    key={item._id || item.productId?._id || index}
                  >
                    <div className="order-detail-item-image-wrapper">
                      {item.productId?.imageUrl ? (
                        <img
                          src={item.productId.imageUrl}
                          alt={item.productId?.name || "Product"}
                          className="order-detail-item-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="order-detail-item-image-placeholder">
                          🧶
                        </div>
                      )}
                    </div>

                    <div className="order-detail-item-info">
                      {item.productId?._id ? (
                        <Link
                          to={`/product/${item.productId._id}`}
                          className="order-detail-item-name"
                        >
                          {item.productId?.name || "Product"}
                        </Link>
                      ) : (
                        <span className="order-detail-item-name">
                          {item.productId?.name || "Product"}
                        </span>
                      )}

                      <div className="order-detail-item-meta">
                        <span>{formatMoney(item.price)} each</span>
                        <span className="order-detail-item-meta-separator">
                          •
                        </span>
                        <span>Qty {safeNumber(item.qty, 1)}</span>
                      </div>
                    </div>

                    <div className="order-detail-item-price">
                      {formatMoney(
                        safeNumber(item.price) * safeNumber(item.qty, 1),
                      )}
                    </div>
                  </div>
                ))
              )}
            </section>

            {/* Shipping Address */}
            {order.address && (
              <section className="order-details-card">
                <div className="order-details-card-title">Shipping Address</div>

                <div className="order-address">
                  <div className="order-address-icon" aria-hidden="true">
                    📍
                  </div>

                  <div className="order-address-content">
                    <p className="order-address-name">
                      {order.address.fullName || "—"}
                    </p>

                    <p className="order-address-text">
                      {order.address.street || "—"}
                      <br />
                      {order.address.city || "—"}
                      {order.address.postalCode
                        ? `, ${order.address.postalCode}`
                        : ""}
                      <br />
                      {order.address.country || "—"}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right column */}
          <aside className="order-details-sidebar">
            {/* Order Summary */}
            <section className="order-details-card">
              <div className="order-details-card-title">Order Summary</div>

              <div className="order-total-section">
                <div className="order-total-row">
                  <span>Items</span>
                  <span>{itemsCount}</span>
                </div>

                <div className="order-total-row">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>

                <div className="order-total-row">
                  <span>Shipping</span>
                  <span style={{ color: "#41815a", fontWeight: 600 }}>
                    Included
                  </span>
                </div>

                <div className="order-total-row grand-total">
                  <span>Total</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section className="order-details-card">
              <div className="order-details-card-title">
                Payment Information
              </div>

              <div className="order-payment-info">
                <div className="order-info-row">
                  <span className="order-info-label">Payment Status</span>
                  <span className="order-info-value payment-success">
                    ✓ Paid
                  </span>
                </div>

                {order.paymentId && (
                  <div className="order-info-row">
                    <span className="order-info-label">Transaction ID</span>
                    <span
                      className="order-info-value"
                      title={
                        typeof order.paymentId === "string"
                          ? order.paymentId
                          : ""
                      }
                    >
                      {truncatePaymentId(order.paymentId)}
                    </span>
                  </div>
                )}

                <div className="order-info-row">
                  <span className="order-info-label">Order Date</span>
                  <span className="order-info-value">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            </section>

            {/* Help card */}
            <section className="order-help-card">
              <div className="order-help-icon" aria-hidden="true">
                💬
              </div>

              <div className="order-help-content">
                <h3>Need help?</h3>
                <p>Have a question about your order?</p>
                <Link to="/contact">Contact us →</Link>
              </div>
            </section>

            {/* Actions */}
            <div className="order-details-actions">
              <Link
                to="/shop"
                className="order-details-btn order-details-btn-primary"
              >
                Continue Shopping
              </Link>

              <Link
                to="/orders"
                className="order-details-btn order-details-btn-secondary"
              >
                View All Orders
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
