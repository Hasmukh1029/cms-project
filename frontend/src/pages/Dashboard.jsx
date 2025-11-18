import { useEffect } from "react";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // refresh to apply redirect
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TOP NAVBAR */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #333",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Admin Dashboard</h2>

        <button
          onClick={logout}
          style={{
            background: "#d9534f",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "40px" }}>
        <h1 style={{ marginBottom: "30px", fontSize: "32px" }}>Welcome Back 👋</h1>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a
            href="/create-post"
            style={{
              background: "#1a1a1a",
              padding: "25px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid #333",
              width: "250px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            ➕ Create Post
          </a>

          <a
            href="/categories"
            style={{
              background: "#1a1a1a",
              padding: "25px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid #333",
              width: "250px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            🗂️ Manage Categories
          </a>

          <a
            href="/posts"
            style={{
              background: "#1a1a1a",
              padding: "25px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid #333",
              width: "250px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            📄 View Posts
          </a>
        </div>
      </div>
    </div>
  );
}
