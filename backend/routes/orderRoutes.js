// const express = require("express");
// const {
//   addOrderItems,
//   getMyOrders,
//   getOrders,
//   updateOrderStatus,
// } = require("../controllers/orderController");
// const { protect } = require("../middleware/authMiddleware");
// const { admin } = require("../middleware/adminMiddleware");

// const router = express.Router();

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route("/myorders").get(protect, getMyOrders);
// router.route("/:id/status").put(protect, admin, updateOrderStatus);

// module.exports = router;
const express = require("express");

const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Customer Routes
|--------------------------------------------------------------------------
*/

// Place a new order
router.post("/", protect, addOrderItems);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Get a single order by ID
router.get("/:id", protect, getOrderById);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get all orders
router.get("/", protect, admin, getOrders);

// Update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
