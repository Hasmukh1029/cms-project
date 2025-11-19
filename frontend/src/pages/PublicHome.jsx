import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicHome() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await axios.get("https://cms-backend-hgpt.onrender.com/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={styles.page}>

      {/* Glowing Ambient Background */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      <div style={styles.container}>
        <h1 style={styles.heading}>📰 Blog Homepage</h1>

        {posts.length === 0 ? (
          <p style={styles.noPosts}>No published posts available.</p>
        ) : (
          <div style={styles.postsWrapper}>
            {posts.map((post) => (
              <div key={post.id} style={styles.postCard}>
                <h2 style={styles.postTitle}>{post.title}</h2>

                <p style={styles.meta}>
                  Category: {post.category?.name || "Uncategorized"} • By{" "}
                  {post.author?.username}
                </p>

                <div
                  style={styles.contentBox}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#0b0b0d",
    color: "#fff",
    position: "relative",
    overflowX: "hidden",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    top: "-150px",
    left: "-150px",
    filter: "blur(65px)",
    animation: "pulse 14s infinite alternate",
    zIndex: 1,
  },

  glow2: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
    bottom: "-150px",
    right: "-150px",
    filter: "blur(70px)",
    animation: "pulse 16s infinite alternate-reverse",
    zIndex: 1,
  },

  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    zIndex: 2,
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
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "35px",
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
    background: "rgba(30, 30, 35, 0.65)",
    borderRadius: "14px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
  },

  postTitle: {
    fontSize: "26px",
    marginBottom: "10px",
    fontWeight: 700,
  },

  meta: {
    opacity: 0.7,
    marginBottom: "15px",
    fontSize: "14px",
  },

  contentBox: {
    background: "rgba(40,40,45,0.6)",
    padding: "15px",
    borderRadius: "10px",
    maxHeight: "250px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.05)",
  },
};

/* Inject Animations */
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
