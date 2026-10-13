// const Order = require("../models/Order");
// const sendEmail = require("../utils/sendEmail");

// /* ------------------------------------------------------------
//    Admin recipient — set ADMIN_EMAIL in .env
//    Fallback matches your business email so it works even if
//    the env var is missing.
// ------------------------------------------------------------ */

// const ADMIN_EMAIL = process.env.GMAIL_USER || "handyartstore.help@gmail.com";

// /* ------------------------------------------------------------
//    Small helpers
// ------------------------------------------------------------ */

// const escapeHtml = (value) =>
//   String(value ?? "")
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#39;");

// const formatMoney = (value) =>
//   `₹${Number(value || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// /* ============================================================
//    CREATE ORDER — customer + admin email
// ============================================================ */

// const addOrderItems = async (req, res) => {
//   try {
//     const { items, totalAmount, address, paymentId } = req.body;

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     const amount = Number(totalAmount);
//     if (!Number.isFinite(amount) || amount < 0) {
//       return res.status(400).json({ message: "Invalid order total" });
//     }

//     /* ---------- Save order (same as before) ---------- */

//     const order = new Order({
//       userId: req.user._id,
//       items,
//       totalAmount: amount,
//       address,
//       paymentId,
//     });

//     const createdOrder = await order.save();

//     /* ---------- Prepare email data ---------- */

//     const orderIdStr = createdOrder._id.toString();
//     const shortOrderId = orderIdStr.slice(-8).toUpperCase();

//     /* ---------- 1. Customer confirmation ---------- */

//     const customerMessage = `
//       <h2>Order Confirmation</h2>
//       <p>Hello ${escapeHtml(req.user.name)},</p>
//       <p>Your order has been successfully placed!</p>
//       <p>Order ID: <strong>#${shortOrderId}</strong></p>
//       <p>Total Amount Paid: ${formatMoney(amount)}</p>
//       <p>It will be shipped to: ${escapeHtml(address.street)}, ${escapeHtml(address.city)}</p>
//       <p>Thank you for shopping with HandyArtStore!</p>
//     `;

//     /* ---------- 2. Admin notification ---------- */

//     const itemRows = items
//       .map(
//         (i) => `
//           <tr>
//             <td style="padding:8px 12px;border:1px solid #eee;">
//               ${escapeHtml(i.name)}
//             </td>
//             <td style="padding:8px 12px;border:1px solid #eee;text-align:center;">
//               ${Number(i.qty) || 0}
//             </td>
//             <td style="padding:8px 12px;border:1px solid #eee;text-align:right;">
//               ${formatMoney(Number(i.price || 0) * (Number(i.qty) || 0))}
//             </td>
//           </tr>
//         `,
//       )
//       .join("");

//     const adminMessage = `
//       <h2 style="margin:0 0 12px;">New Order Received</h2>

//       <p style="margin:4px 0;">
//         <strong>Order ID:</strong> #${shortOrderId}
//       </p>
//       <p style="margin:4px 0;">
//         <strong>Customer:</strong>
//         ${escapeHtml(req.user.name)} (${escapeHtml(req.user.email)})
//       </p>
//       <p style="margin:4px 0;">
//         <strong>Amount:</strong> ${formatMoney(amount)}
//       </p>
//       <p style="margin:4px 0;">
//         <strong>Payment ID:</strong> ${escapeHtml(paymentId || "—")}
//       </p>

//       <h3 style="margin:20px 0 8px;">Shipping Address</h3>
//       <p style="margin:4px 0;line-height:1.6;">
//         ${escapeHtml(address.fullName || "—")}<br/>
//         ${escapeHtml(address.street || "—")}<br/>
//         ${escapeHtml(address.city || "—")}, ${escapeHtml(address.postalCode || "—")}<br/>
//         ${escapeHtml(address.country || "—")}
//       </p>

//       <h3 style="margin:20px 0 8px;">Items</h3>
//       <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:520px;">
//         <thead>
//           <tr style="background:#faf3f0;">
//             <th style="padding:8px 12px;border:1px solid #eee;text-align:left;">Item</th>
//             <th style="padding:8px 12px;border:1px solid #eee;">Qty</th>
//             <th style="padding:8px 12px;border:1px solid #eee;text-align:right;">Total</th>
//           </tr>
//         </thead>
//         <tbody>${itemRows}</tbody>
//       </table>

//       <p style="margin:20px 0 0;color:#888;font-size:12px;">
//         Reply to this email to reach the customer directly.
//       </p>
//     `;

//     /* ---------- Send both — resilient to failures ----------
//        The order is already saved. If email fails, log it and
//        still return 201 so the client is not blocked. */

//     const sendResults = await Promise.allSettled([
//       sendEmail({
//         email: req.user.email,
//         subject: `HandyArtStore — Order #${shortOrderId} confirmed`,
//         message: customerMessage,
//       }),

//       sendEmail({
//         email: ADMIN_EMAIL,
//         replyTo: req.user.email, // admin can hit Reply → customer
//         subject: `New Order #${shortOrderId} — ${formatMoney(amount)}`,
//         message: adminMessage,
//       }),
//     ]);

//     sendResults.forEach((result, index) => {
//       if (result.status === "rejected") {
//         const label = index === 0 ? "customer" : "admin";
//         console.error(
//           `Order #${shortOrderId} — ${label} email failed:`,
//           result.reason,
//         );
//       }
//     });

//     return res.status(201).json(createdOrder);
//   } catch (error) {
//     console.error("addOrderItems error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// /* ============================================================
//    REST OF THE CONTROLLER — unchanged
// ============================================================ */

// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user._id })
//       .populate("items.productId", "name imageUrl price")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("userId", "id name");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.status = req.body.status || order.status;
//       const updatedOrder = await order.save();
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("items.productId", "name imageUrl price")
//       .populate("userId", "name email");

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (
//       req.user.role !== "admin" &&
//       order.userId._id.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({
//         message: "Not authorized to view this order",
//       });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   addOrderItems,
//   getMyOrders,
//   getOrders,
//   updateOrderStatus,
//   getOrderById,
// };

// controllers/orderController.js

const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

/* ------------------------------------------------------------
   Admin recipient — set ADMIN_EMAIL in .env
------------------------------------------------------------ */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "handyartstore.help@gmail.com";

/* ------------------------------------------------------------
   Helpers
------------------------------------------------------------ */

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatMoney = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* ============================================================
   CREATE ORDER — customer + admin email
============================================================ */

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const amount = Number(totalAmount);
    if (!Number.isFinite(amount) || amount < 0) {
      return res.status(400).json({ message: "Invalid order total" });
    }

    /* ---------- Save order (unchanged) ---------- */

    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount: amount,
      address,
      paymentId,
    });

    const createdOrder = await order.save();

    const shortOrderId = createdOrder._id.toString().slice(-8).toUpperCase();

    /* ---------- 1. Customer confirmation ---------- */

    const customerMessage = `
      <h2>Order Confirmation</h2>
      <p>Hello ${escapeHtml(req.user.name)},</p>
      <p>Your order has been successfully placed!</p>
      <p>Order ID: <strong>#${shortOrderId}</strong></p>
      <p>Total Amount Paid: ${formatMoney(amount)}</p>
      <p>It will be shipped to: ${escapeHtml(address.street)}, ${escapeHtml(
        address.city,
      )}</p>
      <p>Thank you for shopping with HandyArtStore!</p>
    `;

    /* ---------- 2. Admin notification ---------- */

    const itemRows = items
      .map(
        (i) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #eee;">
              ${escapeHtml(i.name)}
            </td>
            <td style="padding:8px 12px;border:1px solid #eee;text-align:center;">
              ${Number(i.qty) || 0}
            </td>
            <td style="padding:8px 12px;border:1px solid #eee;text-align:right;">
              ${formatMoney(Number(i.price || 0) * (Number(i.qty) || 0))}
            </td>
          </tr>
        `,
      )
      .join("");

    const adminMessage = `
      <h2 style="margin:0 0 12px;">New Order Received</h2>
      <p style="margin:4px 0;"><strong>Order ID:</strong> #${shortOrderId}</p>
      <p style="margin:4px 0;">
        <strong>Customer:</strong> ${escapeHtml(req.user.name)}
        (${escapeHtml(req.user.email)})
      </p>
      <p style="margin:4px 0;"><strong>Amount:</strong> ${formatMoney(amount)}</p>
      <p style="margin:4px 0;">
        <strong>Payment ID:</strong> ${escapeHtml(paymentId || "—")}
      </p>

      <h3 style="margin:20px 0 8px;">Shipping Address</h3>
      <p style="margin:4px 0;line-height:1.6;">
        ${escapeHtml(address.fullName || "—")}<br/>
        ${escapeHtml(address.street || "—")}<br/>
        ${escapeHtml(address.city || "—")}, ${escapeHtml(
          address.postalCode || "—",
        )}<br/>
        ${escapeHtml(address.country || "—")}
      </p>

      <h3 style="margin:20px 0 8px;">Items</h3>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:520px;">
        <thead>
          <tr style="background:#faf3f0;">
            <th style="padding:8px 12px;border:1px solid #eee;text-align:left;">Item</th>
            <th style="padding:8px 12px;border:1px solid #eee;">Qty</th>
            <th style="padding:8px 12px;border:1px solid #eee;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <p style="margin:20px 0 0;color:#888;font-size:12px;">
        Reply to this email to reach the customer directly.
      </p>
    `;

    /* ---------- Send both — resilient to failures ---------- */

    const sendResults = await Promise.allSettled([
      sendEmail({
        email: req.user.email,
        subject: `HandyArtStore — Order #${shortOrderId} confirmed`,
        message: customerMessage,
      }),
      sendEmail({
        email: ADMIN_EMAIL,
        replyTo: req.user.email,
        subject: `New Order #${shortOrderId} — ${formatMoney(amount)}`,
        message: adminMessage,
      }),
    ]);

    sendResults.forEach((result, index) => {
      if (result.status === "rejected") {
        const label = index === 0 ? "customer" : "admin";
        console.error(
          `Order #${shortOrderId} — ${label} email failed:`,
          result.reason,
        );
      }
    });

    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error("addOrderItems error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* ============================================================
   REST — unchanged from your original
============================================================ */

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name imageUrl price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.productId", "name imageUrl price")
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user.role !== "admin" &&
      order.userId._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  getOrderById,
};
