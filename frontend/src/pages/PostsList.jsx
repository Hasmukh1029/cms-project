import { useEffect, useState } from "react";
import axios from "axios";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://cms-backend-hgpt.onrender.com/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ width: "800px", margin: "auto", paddingTop: "20px" }}>

      {/* ✅ TOP NAV BAR (FUNCTIONAL ONLY — NO DESIGN CHANGE) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>All Published Posts</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {token && (
            <a
              href="/dashboard"
              style={{
                background: "#3a78ff",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "13px",
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
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <h3>{post.title}</h3>
          <p>Category: {post.category?.name || "No category"}</p>
          <p>Author: {post.author?.username}</p>
          <p>Date: {new Date(post.createdAt).toLocaleString()}</p>

          <a href={`/posts/${post.id}`}>View Post</a>
        </div>
      ))}
    </div>
  );
}
