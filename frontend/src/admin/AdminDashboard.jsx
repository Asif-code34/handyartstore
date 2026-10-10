import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }
          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <img src="/handylogo.png" alt="Logo" className="admin-logo" />
            <div>
              <h1>Admin Dashboard</h1>
              <p className="admin-welcome">
                Welcome back, <span>{user?.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats ? (
            <>
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h4>Total Orders</h4>
                  <span className="stat-number">{stats.totalOrders}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🧶</div>
                <div className="stat-content">
                  <h4>Total Products</h4>
                  <span className="stat-number">{stats.totalProducts}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h4>Total Users</h4>
                  <span className="stat-number">{stats.totalUsers}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h4>Total Revenue</h4>
                  <span className="stat-number">
                    ₹{stats.totalRevenue.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="loading-stats">
              <div className="spinner"></div>
              <p>Loading metrics...</p>
            </div>
          )}
        </div>

        {/* Admin Controls */}
        <div className="admin-controls">
          <h3>Administrative Controls</h3>
          <div className="controls-grid">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/add-product")}
            >
              + Add Product
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/admin/products")}
            >
              📦 Manage Products
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/admin/orders")}
            >
              🚚 Manage Orders
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/admin/users")}
            >
              👥 Users Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
