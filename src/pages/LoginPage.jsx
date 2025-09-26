// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 70px)", // subtract your header height
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: 420,
          width: "100%",
          margin: 0,
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#2c3e50" }}>
            StudyHub Login
          </h2>
          <p className="text-muted mb-0">Access your study spaces</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
