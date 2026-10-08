const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

// Load environment variables first
dotenv.config();

// Use Google & Cloudflare DNS only in development.
// This fixes the MongoDB Atlas SRV lookup issue on my laptop.
if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`,
  );
});
