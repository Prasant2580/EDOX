import React from "react";
import { authAPI } from "../../../services/api";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

    const { name, email, password } = state;

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.register(name, email, password);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccess("Account created successfully! Redirecting to dashboard...");

      setState({
        name: "",
        email: "",
        password: ""
      });

      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

        <span>or use your email for registration</span>
        
        {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "10px", fontSize: "14px" }}>{success}</div>}

        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          disabled={loading}
        />
        <button className="auth-button sign-up-button" disabled={loading} type="submit">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
