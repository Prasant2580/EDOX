import React from "react";
import { authAPI } from "../../services/api.js";

export default function AdminLogin() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
    setError("");
    setSuccess("");
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = state;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      // Check if user is admin
      if (response.data.user.role !== 'admin') {
        setError("Access denied. Admin privileges required.");
        return;
      }

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccess("Admin login successful! Redirecting...");

      // Clear form
      for (const key in state) {
        setState({
          ...state,
          [key]: ""
        });
      }

      // Redirect to admin dashboard after 1 second
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="admin-login-form" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <form onSubmit={handleOnSubmit}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333',
            fontSize: '2rem'
          }}>
            Admin Login
          </h1>

          {error && (
            <div style={{
              color: "red",
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "4px",
              fontSize: "14px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              color: "green",
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#e8f5e8",
              borderRadius: "4px",
              fontSize: "14px",
              textAlign: "center"
            }}>
              {success}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Admin Email"
              name="email"
              value={state.email}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {loading ? "Signing in..." : "Admin Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
