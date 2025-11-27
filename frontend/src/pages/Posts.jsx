import { useState, useEffect } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const API = "https://cms-backend-hgpt.onrender.com";

  const loadPosts = async () => {
    const res = await axios.get(`${API}/api/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((p) => p.id !== id));
      alert("Post deleted!");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      {/* ✅ TOP NAV BAR (ADDED WITHOUT DESIGN CHANGES) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          position: "relative",
          zIndex: 6,
        }}
      >
        <h1 style={styles.heading}>📄 All Published Posts</h1>

        <div style={{ display: "flex", gap: "12px" }}>
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
        </div>
      </div>

      {/* Background Glow Effects */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating Particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 22 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      <div style={styles.container}>
        {posts.length === 0 ? (
          <p style={styles.noPosts}>No posts found.</p>
        ) : (
          <div style={styles.postsWrapper}>
            {posts.map((post) => (
              <div key={post.id} style={styles.postCard}>
                <h2 style={styles.postTitle}>{post.title}</h2>

                <p style={styles.meta}>
                  Category: {post.category?.name || "None"} • By{" "}
                  {post.author?.username}
                </p>

                <div
                  style={styles.contentPreview}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div style={styles.actions}>
                  <a href={`/edit-post/${post.id}`} style={styles.editBtn}>
                    ✏️ Edit
                  </a>

                  <span
                    onClick={() => deletePost(post.id)}
                    style={styles.deleteBtn}
                  >
                    🗑️ Delete
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------- STYLES --------------------------- */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#0b0b0d",
    color: "#fff",
    padding: "40px",
    position: "relative",
    overflowX: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "550px",
    height: "550px",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    borderRadius: "50%",
    top: "-150px",
    left: "-160px",
    filter: "blur(70px)",
    animation: "pulse 14s infinite alternate",
    zIndex: 0,
  },

  glow2: {
    position: "absolute",
    width: "520px",
    height: "520px",
    background:
      "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
    borderRadius: "50%",
    bottom: "-160px",
    right: "-170px",
    filter: "blur(70px)",
    animation: "pulse 16s infinite alternate-reverse",
    zIndex: 0,
  },

  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    zIndex: 1,
  },

  particle: {
    position: "absolute",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    animation: "floatUp 14s linear infinite",
  },

  container: {
    position: "relative",
    zIndex: 5,
    animation: "fadeIn 1.2s ease",
  },

  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
  },

  noPosts: {
    opacity: 0.7,
    fontSize: "18px",
  },

  postsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  postCard: {
    background: "rgba(30,30,35,0.65)",
    padding: "25px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
  },

  postTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: 700,
  },

  meta: {
    opacity: 0.7,
    marginBottom: "15px",
    fontSize: "14px",
  },

  contentPreview: {
    background: "rgba(40,40,45,0.6)",
    padding: "15px",
    borderRadius: "10px",
    maxHeight: "200px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.05)",
    marginBottom: "15px",
  },

  actions: {
    display: "flex",
    gap: "20px",
  },

  editBtn: {
    color: "#3a78ff",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },

  deleteBtn: {
    color: "#ff4444",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

/* --------------------------- ANIMATIONS --------------------------- */

const styleEl = document.createElement("style");
styleEl.textContent = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.25); opacity: 0.85; }
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0.35; }
  100% { transform: translateY(-1200px); opacity: 0; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(25px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleEl);
