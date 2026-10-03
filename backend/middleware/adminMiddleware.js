// const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(401).json({ message: "Not authorized as an admin" });
//   }
// };

// module.exports = { admin };

const admin = (req, res, next) => {
  console.log("\n========== ADMIN MIDDLEWARE ==========");

  console.log("User:", req.user);

  console.log("Role:", req.user?.role);

  if (req.user && req.user.role === "admin") {
    console.log("Admin Verified ✅");

    return next();
  }

  console.log("Admin Verification Failed ❌");

  return res.status(401).json({
    message: "Not authorized as an admin",
  });
};

module.exports = { admin };
