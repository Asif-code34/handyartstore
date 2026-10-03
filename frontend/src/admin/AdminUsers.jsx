import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin-users.css";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await fetch("/api/auth/users", {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     const data = await res.json();
  //     setUsers(Array.isArray(data) ? data : []);
  //   };
  //   fetchUsers();
  // }, [user]);
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [user]);
  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h1>User Directory</h1>
        <span className="user-count">{users.length} users</span>
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="user-id">{u._id.substring(0, 8)}…</td>
                <td className="user-name">{u.name}</td>
                <td className="user-email">{u.email}</td>
                <td className="user-role">
                  <span
                    className={`role-badge ${u.role === "admin" ? "admin" : "user"}`}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="user-joined">
                  {new Date(u.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
