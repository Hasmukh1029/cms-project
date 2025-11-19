import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://cms-backend-hgpt.onrender.com/api/auth/register", {
        username,
        password,
      });

      alert("Admin registered successfully!");
      window.location.href = "/admin-login";
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
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

        <a
          href="/admin-login"
          style={{
            color: "#ccc",
            display: "block",
            marginTop: "15px",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0d0d0f",
    color: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#1a1a1d",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  title: {
    marginBottom: "25px",
    fontSize: "26px",
    textAlign: "center",
    letterSpacing: "1px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "none",
    background: "#2a2a2d",
    color: "white",
    fontSize: "15px",
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
    transition: "0.2s",
  }
};
