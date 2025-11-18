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
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const createPost = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/posts",
        { title, content, status: "published", categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post created!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "white",
        padding: "40px 0",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "850px",
          margin: "auto",
          backgroundColor: "#181818",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "28px", color: "#ffffff" }}>
          Create New Post
        </h2>

        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
            marginBottom: "15px",
            backgroundColor: "#121212",
            color: "white"
          }}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
            marginBottom: "15px",
            backgroundColor: "#121212",
            color: "white"
          }}
        >
          <option value="">Choose Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} style={{ color: "black" }}>
              {c.name}
            </option>
          ))}
        </select>

        <div
          style={{
            backgroundColor: "#121212",
            borderRadius: "8px",
            padding: "5px",
            border: "1px solid #333",
            marginBottom: "20px"
          }}
        >
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "250px" }}
            theme="snow"
          />
        </div>

        <button
          onClick={createPost}
          style={{
            padding: "12px 25px",
            backgroundColor: "#2563eb",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "0.3s"
          }}
        >
          Publish Post
        </button>
      </div>
    </div>
  );
}
