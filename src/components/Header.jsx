// src/components/Header.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // 👇 Make sure we always have a display name
  const displayName =
    (user?.fullName && user.fullName.trim()) ||
    user?.email ||
    "Guest";

  return (
    <nav
      className="navbar navbar-dark shadow px-4"
      style={{ backgroundColor: "#009688" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-white" to="/">
          StudySpot PH
        </Link>

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <Link
                className="nav-link text-white"
                to="/dashboard/my-bookings"
              >
                My Dashboard
              </Link>
              <span className="text-white">Welcome, {displayName}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Link
                to="/login"
                className="btn btn-light btn-sm text-teal"
              >
                Log In
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
