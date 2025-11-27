import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const API = "https://cms-backend-hgpt.onrender.com";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/categories`)
      .then(res => setCategories(res.data));

    axios.get(`${API}/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategoryId(res.data.categoryId || "");
      });
  }, [id]);

  const updatePost = async () => {
    try {
      await axios.put(
        `${API}/api/posts/${id}`,
        { 
          title, 
          content, 
          categoryId: Number(categoryId),
          status: "published"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post updated!");
      window.location.href = "/posts";

    } catch (err) {
      console.log(err);
      alert("Error updating post");
    }
  };

  const deletePost = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await axios.delete(
        `${API}/api/posts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post deleted!");
      window.location.href = "/posts";

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
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
      {/* ✅ NAVIGATION BAR (ADDED WITHOUT DESIGN CHANGE) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ marginBottom: "0" }}>✏️ Edit Post</h1>

        <div style={{ display: "flex", gap: "12px" }}>
          <a
            href="/posts"
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
            ← Back to Posts
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

      <div
        style={{
          background: "#1a1a1a",
          padding: "25px",
          borderRadius: "12px",
          width: "900px",
          margin: "auto",
          border: "1px solid #333",
        }}
      >

        {/* Title */}
        <label style={{ fontWeight: "bold", fontSize: "18px" }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
            background: "#222",
            border: "1px solid #444",
            borderRadius: "8px",
            color: "#fff",
          }}
        />

        {/* Category */}
        <label style={{ fontWeight: "bold", fontSize: "18px" }}>Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
            background: "#222",
            border: "1px solid #444",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Content Editor */}
        <label style={{ fontWeight: "bold", fontSize: "18px" }}>Content</label>

        <div style={{ background: "#fff", borderRadius: "6px" }}>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{
              height: "250px",
              color: "#000",
            }}
          />
        </div>

        {/* Save + Delete Buttons */}
        <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
          <button
            onClick={updatePost}
            style={{
              background: "#3a78ff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontWeight: "bold",
              width: "180px",
            }}
          >
            Save Changes
          </button>

          <button
            onClick={deletePost}
            style={{
              background: "red",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontWeight: "bold",
              width: "180px",
            }}
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}
