import { useState, useEffect } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:4000/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // DELETE POST FUNCTION
  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted post from UI
      setPosts(posts.filter((p) => p.id !== id));

      alert("Post deleted!");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

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
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>
        📄 All Published Posts
      </h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
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
              {/* Title */}
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {post.title}
              </h2>

              {/* Meta */}
              <p style={{ opacity: 0.7, marginBottom: "15px" }}>
                Category: {post.category?.name || "None"} • By{" "}
                {post.author?.username}
              </p>

              {/* Content Preview */}
              <div
                style={{
                  background: "#222",
                  padding: "15px",
                  borderRadius: "10px",
                  maxHeight: "200px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "15px" }}>
                <a
                  href={`/edit-post/${post.id}`}
                  style={{
                    color: "#3a78ff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </a>

                <span
                  onClick={() => deletePost(post.id)}
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
