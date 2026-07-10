import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/api.js";

const pageStyle = { minHeight: "100vh", background: "#f8f9fa", padding: "2rem", color: "#212529" };
const buttonStyle = { border: 0, borderRadius: 6, padding: ".55rem .85rem", color: "white", cursor: "pointer" };

export default function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const loadUsers = async () => {
    try { setUsers((await adminAPI.fetchUsers()).data); }
    catch (error) { setMessage(error?.response?.data?.message || "Unable to load users."); }
  };
  useEffect(() => { if (currentUser.role !== "admin") navigate("/admin/login"); else loadUsers(); }, []);

  const changeRole = async (id, role) => {
    try { const { data } = await adminAPI.updateUserRole(id, role); setUsers((items) => items.map((item) => item._id === id ? data : item)); }
    catch (error) { setMessage(error?.response?.data?.message || "Unable to update role."); }
  };
  const removeUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try { await adminAPI.deleteUser(id); setUsers((items) => items.filter((item) => item._id !== id)); }
    catch (error) { setMessage(error?.response?.data?.message || "Unable to delete user."); }
  };

  return <main style={pageStyle}>
    <button onClick={() => navigate("/admin/dashboard")} style={{ ...buttonStyle, background: "#6c757d" }}>← Dashboard</button>
    <h1>User Management</h1><p>Change user roles or remove accounts.</p>{message && <p style={{ color: "#b91c1c" }}>{message}</p>}
    <div style={{ overflowX: "auto", background: "white", borderRadius: 10, padding: "1rem" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}><thead><tr><th align="left">Name</th><th align="left">Email</th><th align="left">Role</th><th align="left">Actions</th></tr></thead><tbody>{users.map((item) => <tr key={item._id}><td>{item.name}</td><td>{item.email}</td><td><select value={item.role} onChange={(e) => changeRole(item._id, e.target.value)} disabled={item._id === currentUser._id}><option value="user">User</option><option value="admin">Admin</option></select></td><td><button onClick={() => removeUser(item._id)} disabled={item._id === currentUser._id} style={{ ...buttonStyle, background: "#dc3545", opacity: item._id === currentUser._id ? .5 : 1 }}>Delete</button></td></tr>)}</tbody></table></div>
  </main>;
}
