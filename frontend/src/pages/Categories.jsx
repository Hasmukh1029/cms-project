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
        headers: { Authorization: `Bearer ${token}` },
      });

      loadCategories();
    } catch {
      alert("Error deleting category");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
          marginBottom: "30px",
          position: "relative",
          zIndex: 6,
        }}
      >
        <h1 style={styles.heading}>Manage Categories</h1>

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

      {/* Background Effects */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      <div style={styles.container}>
        {/* Add Category */}
        <div style={styles.addBox}>
          <h2 style={styles.boxTitle}>Add New Category</h2>

          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <button onClick={addCategory} style={styles.addButton}>
            Add Category
          </button>
        </div>

        {/* Category Cards */}
        <div style={styles.cardWrapper}>
          {categories.map((cat) => (
            <div key={cat.id} style={styles.card}>
              <h3 style={styles.catName}>{cat.name}</h3>
              <p style={styles.catID}>ID: {cat.id}</p>

              <button
                onClick={() => deleteCategory(cat.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "#0b0b0d",
    color: "white",
    padding: "40px",
    position: "relative",
    overflowX: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    borderRadius: "50%",
    top: "-140px",
    left: "-150px",
    filter: "blur(70px)",
    animation: "pulse 14s infinite alternate",
    zIndex: 0,
  },

  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
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

  addBox: {
    background: "rgba(30,30,35,0.65)",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    maxWidth: "450px",
    marginBottom: "35px",
    backdropFilter: "blur(10px)",
  },

  boxTitle: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(40,40,45,0.7)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "16px",
    marginBottom: "15px",
  },

  addButton: {
    background: "#4f46e5",
    padding: "12px",
    borderRadius: "8px",
    color: "white",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },

  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },

  card: {
    background: "rgba(30,30,35,0.65)",
    padding: "25px",
    borderRadius: "12px",
    width: "250px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  },

  catName: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "5px",
  },

  catID: {
    opacity: 0.7,
    fontSize: "13px",
    marginBottom: "15px",
  },

  deleteButton: {
    background: "#e53935",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

/* Animations injected */
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
