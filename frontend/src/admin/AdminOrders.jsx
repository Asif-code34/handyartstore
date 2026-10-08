// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/admin-orders.css";

// const AdminOrders = () => {
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const res = await fetch("/api/orders", {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     };
//     fetchOrders();
//   }, [user]);

//   const updateStatus = async (id, status) => {
//     const res = await fetch(`/api/orders/${id}/status`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify({ status }),
//     });
//     if (res.ok) {
//       setOrders(
//         orders.map((order) =>
//           order._id === id ? { ...order, status } : order,
//         ),
//       );
//     }
//   };

//   return (
//     <div className="admin-orders">
//       <div className="admin-orders-header">
//         <h1>Manage Orders</h1>
//       </div>

//       <div className="admin-orders-table-wrapper">
//         <table className="admin-orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User</th>
//               <th>Total</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td className="order-id">{order._id.substring(0, 8)}…</td>
//                 <td className="order-user">
//                   {order.userId?.name || "Deleted User"}
//                 </td>
//                 <td className="order-total">₹{order.totalAmount.toFixed(2)}</td>
//                 <td className="order-date">
//                   {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td className="order-status">
//                   <select
//                     value={order.status}
//                     onChange={(e) => updateStatus(order._id, e.target.value)}
//                     className={`status-select ${order.status.toLowerCase()}`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin-orders.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status } : order,
        ),
      );
    }
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <h1>Manage Orders</h1>
      </div>

      <div className="admin-orders-table-wrapper">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id" data-label="Order ID">
                  {order._id.substring(0, 8)}…
                </td>
                <td className="order-user" data-label="User">
                  {order.userId?.name || "Deleted User"}
                </td>
                <td className="order-total" data-label="Total">
                  ₹{order.totalAmount.toFixed(2)}
                </td>
                <td className="order-date" data-label="Date">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="order-status" data-label="Status">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`status-select ${order.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
