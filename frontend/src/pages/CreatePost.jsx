import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://cms-backend-hgpt.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const createPost = async () => {
    try {
      await axios.post(
        "https://cms-backend-hgpt.onrender.com/api/posts",
        { title, content, status: "published", categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post created!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Error creating post");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>

      {/* ✅ TOP NAV BAR (FUNCTIONAL ONLY — NO DESIGN CHANGE) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          position: "relative",
          zIndex: 6,
          padding: "0 40px",
        }}
      >
        <h2 style={{ margin: 0 }}>Create New Post</h2>

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
             Dashboard
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

      {/* Ambient Background Glow */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 18 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      <div style={styles.container}>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={styles.input}
        >
          <option value="">Choose Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} style={{ color: "black" }}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Quill Editor */}
        <div style={styles.editorBox}>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "250px" }}
            theme="snow"
          />
        </div>

        {/* Publish Button */}
        <button onClick={createPost} style={styles.button}>
          Publish Post
        </button>
      </div>
    </div>
  );
}

/* ---------------------- STYLING ------------------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0d",
    color: "white",
    padding: "40px 0",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    width: "550px",
    height: "550px",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    borderRadius: "50%",
    top: "-150px",
    left: "-150px",
    filter: "blur(70px)",
    animation: "pulse 14s infinite alternate",
  },

  glow2: {
    position: "absolute",
    width: "520px",
    height: "520px",
    background:
      "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
    borderRadius: "50%",
    bottom: "-150px",
    right: "-150px",
    filter: "blur(70px)",
    animation: "pulse 16s infinite alternate-reverse",
  },

  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0,
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
    width: "850px",
    margin: "auto",
    background: "rgba(30,30,35,0.65)",
    backdropFilter: "blur(12px)",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 0 25px rgba(0,0,0,0.7)",
    position: "relative",
    zIndex: 5,
    animation: "fadeIn 1s ease",
  },

  heading: {
    fontSize: "28px",
    marginBottom: "25px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(25,25,30,0.85)",
    color: "white",
    marginBottom: "15px",
    fontSize: "16px",
  },

  editorBox: {
    background: "rgba(20,20,25,0.85)",
    borderRadius: "10px",
    padding: "5px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "25px",
  },

  button: {
    padding: "12px 25px",
    background: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.25s",
  },
};

/* ---------------------- ANIMATIONS ------------------------- */

const s = document.createElement("style");
s.textContent = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.25); opacity: 0.85; }
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0.35; }
  100% { transform: translateY(-1200px); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(s);
