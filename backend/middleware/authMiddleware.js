// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("\n========== PROTECT MIDDLEWARE ==========");

  let token;

  console.log("Authorization Header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User Found:", req.user);

      console.log("User Role:", req.user?.role);

      console.log("Protect Passed ✅");

      return next();
    } catch (error) {
      console.log("JWT ERROR:", error);

      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  console.log("No Token Found ❌");

  return res.status(401).json({
    message: "Not authorized, no token",
  });
};

module.exports = { protect };
