import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://cms-backend-hgpt.onrender.com/api/auth/register",
        { username, password }
      );

      alert("Admin registered successfully!");
      window.location.href = "/admin-login";
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>

      {/* Glowing background effects */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 14 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      {/* Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Registration</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <a href="/admin-login" style={styles.link}>
          Already have an account? Login →
        </a>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "#0b0b0d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  },

  /* Glowing gradient lights */
  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    top: "-150px",
    left: "-150px",
    animation: "pulse 14s infinite alternate",
    filter: "blur(60px)",
    zIndex: 1,
  },

  glow2: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
    bottom: "-150px",
    right: "-150px",
    animation: "pulse 16s infinite alternate-reverse",
    filter: "blur(60px)",
    zIndex: 1,
  },

  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    listStyle: "none",
    padding: 0,
    margin: 0,
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

  card: {
    background: "rgba(20, 20, 25, 0.65)",
    padding: "40px",
    width: "360px",
    borderRadius: "14px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 25px rgba(0,0,0,0.7)",
    zIndex: 5,
    animation: "fadeIn 1.2s ease",
  },

  title: {
    marginBottom: "25px",
    fontSize: "26px",
    textAlign: "center",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "1px solid #333",
    background: "rgba(35,35,40,0.75)",
    color: "white",
    fontSize: "15px",
    transition: "0.25s",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.25s",
  },

  link: {
    color: "#ccc",
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "14px",
  },
};

/* ANIMATIONS */
const styleTag = document.createElement("style");
styleTag.textContent = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.25); opacity: 0.85; }
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0.4; }
  100% { transform: translateY(-1200px); opacity: 0; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(25px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleTag);
