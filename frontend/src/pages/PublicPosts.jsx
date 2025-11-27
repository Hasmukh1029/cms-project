import { useState, useEffect } from "react";
import axios from "axios";

export default function PublicPosts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const loadPosts = async () => {
    const res = await axios.get("https://cms-backend-hgpt.onrender.com/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0f",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ✅ TOP NAV BAR (FUNCTIONAL ONLY — NO DESIGN CHANGE) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          📰 Public Blog
        </h1>

        <div style={{ display: "flex", gap: "12px" }}>
          {token && (
            <a
              href="/dashboard"
              style={{
                background: "#3a78ff",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              ← Dashboard
            </a>
          )}

          {token && (
            <button
              onClick={logout}
              style={{
                background: "#d9534f",
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          )}

          {!token && (
            <a
              href="/"
              style={{
                background: "#2c2c31",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#fff",
                border: "1px solid #444",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Home
            </a>
          )}
        </div>
      </div>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No posts available.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#1a1a1d",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #333",
                boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              }}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
                {post.title}
              </h2>

              <p style={{ opacity: 0.7, marginBottom: "15px" }}>
                Category: {post.category?.name || "Uncategorized"} • By{" "}
                {post.author?.username}
              </p>

              {/* Preview */}
              <div
                style={{
                  background: "#222",
                  padding: "15px",
                  borderRadius: "10px",
                  maxHeight: "120px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 200) + "...",
                }}
              />

              <a
                href={`/blog/${post.id}`}
                style={{
                  color: "#4f46e5",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Read full post →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
