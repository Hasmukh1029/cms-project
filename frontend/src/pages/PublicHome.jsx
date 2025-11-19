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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#fff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px" }}>
        📰 Blog Homepage
      </h1>

      {posts.length === 0 ? (
        <p>No published posts available.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#1a1a1a",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #333",
              }}
            >
              {/* Post Title */}
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {post.title}
              </h2>

              {/* Meta Info */}
              <p style={{ opacity: 0.7, marginBottom: "15px" }}>
                Category: {post.category?.name || "Uncategorized"} • By{" "}
                {post.author?.username}
              </p>

              {/* Content Box */}
              <div
                style={{
                  background: "#222",
                  padding: "15px",
                  borderRadius: "10px",
                  maxHeight: "250px",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
