import React from "react";
import { authAPI } from "../../../services/api";

export default function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
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

    if (isForgotPassword) {
      if (!email) {
        setError("Please enter your email");
        return;
      }

      try {
        setLoading(true);
        const response = await authAPI.forgotPassword(email);
        setSuccess(response.data.message || "Password reset link sent to your email");
        setState({
          email: "",
          password: ""
        });
        setIsForgotPassword(false);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Password reset email failed";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccess("Login successful! Redirecting...");
      
      // Clear form
      setState({
        email: "",
        password: ""
      });

      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>{isForgotPassword ? "Reset Password" : "Sign in"}</h1>

        {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "10px", fontSize: "14px" }}>{success}</div>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          disabled={loading}
        />
        {!isForgotPassword && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            disabled={loading}
          />
        )}
        <button
          type="button"
          className="link-button"
          onClick={() => {
            setIsForgotPassword(!isForgotPassword);
            setError("");
            setSuccess("");
          }}
          disabled={loading}
        >
          {isForgotPassword ? "Back to sign in" : "Forgot your password?"}
        </button>
        <button className="auth-button sign-in-button" disabled={loading} type="submit">
          {loading
            ? isForgotPassword
              ? "Resetting..."
              : "Signing in..."
            : isForgotPassword
              ? "Send Reset Link"
              : "Sign In"}
        </button>
      </form>
    </div>
  );
}
