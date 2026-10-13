import React, { useState, useContext, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";

/* ============================================================
   ICONS
============================================================ */

const AlertIcon = ({ size = 16 }) => (
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

/* ============================================================
   COMPONENT
============================================================ */

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  /* ---------- UI state (replaces alerts) ---------- */
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showBypassModal, setShowBypassModal] = useState(false);

  const errorRef = useRef(null);

  /* Scroll to error banner when it appears */
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 49) : 0;
  const total = subtotal + shipping;

  /* ------------------------------------------------------------
     Shared order-save helper — used by both real and bypass flow
     (logic identical to before, just extracted)
  ------------------------------------------------------------ */

  const saveOrder = async (paymentId) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token || ""}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: total,
        address,
        paymentId,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || "Order saving failed");
    }

    dispatch(clearCart());
    navigate("/ordersuccess");
  };

  /* ------------------------------------------------------------
     Bypass (test mode) — triggered from the modal
  ------------------------------------------------------------ */

  const bypassPayment = async () => {
    setShowBypassModal(false);
    setProcessing(true);
    setError("");

    try {
      await saveOrder("bypass_txn_" + Date.now());
    } catch (err) {
      console.error("Bypass order save error:", err);
      setError(err.message || "Couldn't save the order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  /* ------------------------------------------------------------
     Main payment flow — backend calls unchanged
  ------------------------------------------------------------ */

  const handlePayment = async () => {
    setError("");
    setProcessing(true);

    try {
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const orderData = await orderRes.json().catch(() => ({}));

      /* Backend couldn't create Razorpay order → offer test bypass */
      if (!orderRes.ok) {
        setProcessing(false);
        setShowBypassModal(true);
        return;
      }

      /* ---------- Razorpay flow (unchanged) ---------- */

      const options = {
        key: "rzp_test_T2I4sXa6vRBBHK",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HandyArtStore",
        description: "Test Transaction",
        order_id: orderData.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            await saveOrder(response.razorpay_payment_id);
          } catch (err) {
            console.error("Payment handler error:", err);
            setError(
              err.message ||
                "Payment couldn't be completed. If money was deducted, contact support.",
            );
            setProcessing(false);
          }
        },

        modal: {
          /* If the user closes the Razorpay popup without paying */
          ondismiss: () => {
            setProcessing(false);
          },
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: "9999999999",
        },

        theme: { color: "#d4a08a" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment init error:", err);
      setError(
        err.message ||
          "Couldn't start the payment. Please check your connection and try again.",
      );
      setProcessing(false);
    }
  };

  /* ------------------------------------------------------------
     Submit
  ------------------------------------------------------------ */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (processing) return;

    if (!user) {
      navigate("/login", {
        state: {
          from: "/checkout",
          message: "Please sign in to complete your order.",
        },
      });
      return;
    }

    handlePayment();
  };

  /* ------------------------------------------------------------
     Render
  ------------------------------------------------------------ */

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <p>Fill in your details and complete your order</p>
        </div>

        {/* ---------- Inline error banner (replaces alerts) ---------- */}
        {error && (
          <div className="checkout-error" role="alert" ref={errorRef}>
            <span className="checkout-error-icon" aria-hidden="true">
              <AlertIcon />
            </span>
            <p>{error}</p>
            <button
              type="button"
              className="checkout-error-close"
              onClick={() => setError("")}
              aria-label="Dismiss"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="checkout-layout">
          {/* ---------- Shipping Form ---------- */}
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Address</h3>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  disabled={processing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  id="street"
                  type="text"
                  placeholder="123 Main St"
                  required
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  disabled={processing}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Mumbai"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    disabled={processing}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="400001"
                    required
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    disabled={processing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  placeholder="India"
                  required
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  disabled={processing}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-pay"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Processing…
                </>
              ) : (
                <>
                  Pay ₹{total.toFixed(2)}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* ---------- Order Summary ---------- */}
          <div className="checkout-summary">
            <h3>Your Order</h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty">×{item.qty}</span>
                  </div>

                  <span className="summary-item-price">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="free-shipping">FREE</span>
                ) : (
                  `₹${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="total-price">₹{total.toFixed(2)}</span>
            </div>

            <Link to="/cart" className="back-to-cart">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Bypass confirmation modal (replaces window.confirm) ---------- */}
      {showBypassModal && (
        <div
          className="checkout-modal-backdrop"
          onClick={() => setShowBypassModal(false)}
          role="presentation"
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bypass-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="checkout-modal-icon" aria-hidden="true">
              <AlertIcon size={24} />
            </div>

            <h2 id="bypass-modal-title" className="checkout-modal-title">
              Payment unavailable
            </h2>

            <p className="checkout-modal-text">
              Razorpay isn&apos;t configured on the server right now. You can
              place a test order to continue, or cancel and try again later.
            </p>

            <div className="checkout-modal-actions">
              <button
                type="button"
                className="checkout-modal-btn checkout-modal-btn-cancel"
                onClick={() => setShowBypassModal(false)}
                autoFocus
              >
                Cancel
              </button>

              <button
                type="button"
                className="checkout-modal-btn checkout-modal-btn-confirm"
                onClick={bypassPayment}
              >
                Place test order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
