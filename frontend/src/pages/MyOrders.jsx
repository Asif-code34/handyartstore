import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/my-orders.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/orders/myorders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user?.token]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatOrderId = (id) => {
    if (!id) return "N/A";

    return `#${id.slice(-8).toUpperCase()}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";

      case "Shipped":
        return "status-shipped";

      case "Pending":
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return "✓";

      case "Shipped":
        return "🚚";

      case "Pending":
      default:
        return "⏳";
    }
  };

  const getTotalItems = (items = []) => {
    return items.reduce((total, item) => total + Number(item.qty || 0), 0);
  };

  if (loading) {
    return (
      <main className="my-orders-page">
        <div className="my-orders-container">
          <div className="orders-loading">
            <div className="orders-spinner"></div>
            <h2>Loading your orders...</h2>
            <p>Please wait while we fetch your order history.</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="my-orders-page">
        <div className="my-orders-container">
          <div className="orders-empty">
            <div className="orders-empty-icon">🔐</div>

            <h2>Please login to view your orders</h2>

            <p>
              Sign in to your HandyArtStore account to see your order history.
            </p>

            <Link to="/login" className="orders-primary-btn">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-orders-page">
        <div className="my-orders-container">
          <div className="orders-error">
            <div className="orders-error-icon">⚠️</div>

            <h2>Unable to load orders</h2>

            <p>{error}</p>

            <button
              type="button"
              className="orders-primary-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="my-orders-page">
      <div className="my-orders-container">
        {/* Header */}
        <section className="orders-header">
          <div>
            <span className="orders-eyebrow">YOUR SHOPPING HISTORY</span>

            <h1>My Orders</h1>

            <p>
              Track your purchases and view your HandyArtStore order details.
            </p>
          </div>

          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
            <span>→</span>
          </Link>
        </section>

        {/* Order Count */}
        {orders.length > 0 && (
          <div className="orders-summary-bar">
            <div className="orders-count">
              <strong>{orders.length}</strong>{" "}
              {orders.length === 1 ? "Order" : "Orders"}
            </div>

            <span className="orders-summary-text">
              Thank you for supporting handmade craftsmanship 🧶
            </span>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 ? (
          <section className="orders-empty">
            <div className="orders-empty-icon">🛍️</div>

            <h2>No orders yet</h2>

            <p>
              You haven't placed an order yet. Discover something beautiful from
              our handmade collection.
            </p>

            <Link to="/shop" className="orders-primary-btn">
              Explore Collection
              <span>→</span>
            </Link>
          </section>
        ) : (
          /* Orders */
          <section className="orders-list">
            {orders.map((order) => {
              const totalItems = getTotalItems(order.items);

              return (
                <article className="order-card" key={order._id}>
                  {/* Order Top */}
                  <div className="order-card-header">
                    <div className="order-header-left">
                      <div>
                        <span className="order-label">ORDER</span>

                        <h2>{formatOrderId(order._id)}</h2>
                      </div>

                      <div className="order-date">
                        <span className="order-label">PLACED ON</span>
                        <strong>{formatDate(order.createdAt)}</strong>
                      </div>
                    </div>

                    <span
                      className={`order-status ${getStatusClass(order.status)}`}
                    >
                      <span className="status-icon">
                        {getStatusIcon(order.status)}
                      </span>

                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="order-items">
                    {order.items?.map((item, index) => {
                      const product = item.productId;

                      return (
                        <div
                          className="order-item"
                          key={
                            product?._id
                              ? `${order._id}-${product._id}-${index}`
                              : `${order._id}-${index}`
                          }
                        >
                          <div className="order-item-image-wrapper">
                            {product?.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name || "Ordered product"}
                                className="order-item-image"
                                loading="lazy"
                              />
                            ) : (
                              <div className="order-item-placeholder">🧶</div>
                            )}
                          </div>

                          <div className="order-item-details">
                            {product?._id ? (
                              <Link
                                to={`/product/${product._id}`}
                                className="order-item-name"
                              >
                                {product.name || "Product"}
                              </Link>
                            ) : (
                              <span className="order-item-name">Product</span>
                            )}

                            <div className="order-item-meta">
                              <span>Qty: {item.qty}</span>

                              <span className="order-item-dot">•</span>

                              <span>
                                ₹{Number(item.price || 0).toFixed(2)} each
                              </span>
                            </div>
                          </div>

                          <div className="order-item-total">
                            ₹
                            {(
                              Number(item.price || 0) * Number(item.qty || 0)
                            ).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Bottom */}
                  <div className="order-card-footer">
                    <div className="order-footer-info">
                      <div>
                        <span>Items</span>
                        <strong>{totalItems}</strong>
                      </div>

                      <div>
                        <span>Payment</span>
                        <strong>{order.paymentId ? "Paid" : "Pending"}</strong>
                      </div>

                      <div className="order-total">
                        <span>Total</span>
                        <strong>
                          ₹{Number(order.totalAmount || 0).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="view-order-btn"
                    >
                      View Order
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Bottom Help */}
        {orders.length > 0 && (
          <section className="orders-help">
            <div className="orders-help-icon">💬</div>

            <div>
              <h3>Need help with an order?</h3>
              <p>Have a question about your purchase? We're happy to help.</p>
            </div>

            <Link to="/contact" className="orders-help-btn">
              Contact Us
            </Link>
          </section>
        )}
      </div>
    </main>
  );
};

export default MyOrders;
