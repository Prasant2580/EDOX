import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../../services/api";
import "./Styles.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.resetPassword(token, password);
      setSuccess(response.data.message || "Password reset successful");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/auth");
      }, 1200);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Password reset failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="reset-password-card">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>

          {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}
          {success && <div style={{ color: "green", marginBottom: "10px", fontSize: "14px" }}>{success}</div>}

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={loading}
          />

          <button className="auth-button reset-button" disabled={loading} type="submit">
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link to="/auth">Back to sign in</Link>
        </form>
      </div>
    </div>
  );
}
