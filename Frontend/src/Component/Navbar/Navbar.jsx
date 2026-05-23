import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user, setUser] = useState({ name: "Guest User", email: "guest@example.com", avatar: "" });
  const [profilePic, setProfilePic] = useState("");
  const [editName, setEditName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name || parsed.email || "User",
        email: parsed.email || "",
        avatar: parsed.avatar || ""
      });
      setEditName(parsed.name || parsed.email || "");
      setProfilePic(parsed.avatar || "");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...user,
      name: editName || user.name,
      avatar: profilePic || user.avatar
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage("Profile updated successfully");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo">ED</div>
          <span className="navbar-title">Edox - AI e-learning Platform</span>
        </div>

        <nav className="navbar-menu">
          <Link className="navbar-link" to="/dashboard">Dashboard</Link>
          <Link className="navbar-link" to="/snap&solve">Snap & Solve</Link>
          <Link className="navbar-link" to="/about">About</Link>
          <Link className="navbar-link" to="/contact">Contact</Link>
        </nav>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setNavOpen((open) => !open)}
          aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={navOpen}
        >
          {navOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="navbar-profile" ref={menuRef}>
          <button type="button" className="profile-button" onClick={() => setMenuOpen((open) => !open)}>
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">{user.name?.charAt(0).toUpperCase()}</div>
            )}
            <span className="profile-name">{user.name}</span>
          </button>

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-inner">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="profile-dropdown-avatar" />
                  ) : (
                    <div className="profile-dropdown-avatar-placeholder">{user.name?.charAt(0).toUpperCase()}</div>
                  )}
                  <div>
                    <p className="profile-dropdown-name">{user.name}</p>
                    <p className="profile-dropdown-email">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="profile-dropdown-actions">
                <button type="button" className="profile-dropdown-action" onClick={() => {
                    setSettingsOpen(true);
                    setMenuOpen(false);
                  }}>
                  Settings
                </button>
                <button type="button" className="profile-dropdown-action logout-button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {navOpen && (
        <nav className="navbar-mobile-menu">
          <Link className="navbar-link" to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link className="navbar-link" to="/snap&solve" onClick={() => setNavOpen(false)}>Snap & Solve</Link>
          <Link className="navbar-link" to="/about" onClick={() => setNavOpen(false)}>About</Link>
          <Link className="navbar-link" to="/contact" onClick={() => setNavOpen(false)}>Contact</Link>
        </nav>
      )}

      {settingsOpen && (
        <div className="settings-backdrop">
          <div className="settings-modal">
            <button type="button" className="settings-close" onClick={() => setSettingsOpen(false)}>
              ✕
            </button>
            <h2 className="settings-title">Profile Settings</h2>
            <p className="settings-text">Update your photo, name, and password.</p>

            <form className="settings-form" onSubmit={handleSaveSettings}>
              <div className="settings-row">
                <label className="settings-field">
                  Profile picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="settings-input"
                  />
                </label>
                <label className="settings-field">
                  Display name
                  <input
                    type="text"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    className="settings-input"
                  />
                </label>
              </div>

              <div className="settings-row">
                <label className="settings-field">
                  New password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="settings-input"
                    placeholder="Leave blank to keep current"
                  />
                </label>
                <label className="settings-field">
                  Confirm password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="settings-input"
                    placeholder="Repeat new password"
                  />
                </label>
              </div>

              {message && <p className="settings-message">{message}</p>}

              <div className="settings-actions">
                <button type="submit" className="settings-save">Save changes</button>
                <button type="button" className="settings-cancel" onClick={() => setSettingsOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
