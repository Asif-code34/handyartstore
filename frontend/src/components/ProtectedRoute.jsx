// // components/ProtectedRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>; // optional loading state

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />; // or a 403 page
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// components/ProtectedRoute.jsx

import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait until authentication state is initialized
  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // User is logged in but doesn't have permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
    // Later you can replace "/" with "/403"
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
