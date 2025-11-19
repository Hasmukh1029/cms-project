import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const baseURL = "https://cms-backend-hgpt.onrender.com";

  const loadCategories = async () => {
    const res = await axios.get(`${baseURL}/api/categories`);
    setCategories(res.data);
  };

  const addCategory = async () => {
    if (!name.trim()) return alert("Category name required");

    await axios.post(
      `${baseURL}/api/categories`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setName("");
    loadCategories();
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await axios.delete(`${baseURL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      loadCategories();
    } catch {
      alert("Error deleting category");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "#0f0f0f",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
        Manage Categories
      </h1>

      {/* Add Category */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Add New Category</h2>

        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
            marginBottom: "12px",
          }}
        />

        <button
          onClick={addCategory}
          style={{
            background: "#3a78ff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Add Category
        </button>
      </div>

      {/* Existing Categories */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            style={{
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              border: "1px solid #333",
            }}
          >
            <h3>{cat.name}</h3>
            <p style={{ opacity: 0.7 }}>ID: {cat.id}</p>

            <button
              onClick={() => deleteCategory(cat.id)}
              style={{
                background: "#ff3b3b",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
