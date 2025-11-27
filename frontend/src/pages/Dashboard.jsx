import { useEffect } from "react";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      {/* Glowing ambient lights */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 18 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Admin Dashboard</h2>

        {/* ✅ Navigation + Logout */}
        <div style={{ display: "flex", gap: "12px" }}>
          <a
            href="/public-home"
            style={{
              ...styles.logoutButton,
              background: "#3a78ff",
              textDecoration: "none",
            }}
          >
            Go to Blog
          </a>

          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome Back 👋</h1>

        <div style={styles.cardContainer}>
          <a href="/create-post" style={styles.card}>
            <span style={styles.emoji}>➕</span>
            <span>Create Post</span>
          </a>

          <a href="/categories" style={styles.card}>
            <span style={styles.emoji}>🗂️</span>
            <span>Manage Categories</span>
          </a>

          <a href="/posts" style={styles.card}>
            <span style={styles.emoji}>📄</span>
            <span>View Posts</span>
          </a>
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
    position: "relative",
    color: "#fff",
    overflowX: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  glow1: {
    position: "absolute",
    width: "550px",
    height: "550px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,80,255,0.22), transparent 70%)",
    top: "-180px",
    left: "-150px",
    animation: "pulse 14s infinite alternate",
    filter: "blur(65px)",
    zIndex: 1,
  },

  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent 70%)",
    bottom: "-180px",
    right: "-150px",
    animation: "pulse 16s infinite alternate-reverse",
    filter: "blur(70px)",
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

  navbar: {
    background: "rgba(20,20,22,0.75)",
    backdropFilter: "blur(8px)",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    zIndex: 5,
    position: "relative",
  },

  navTitle: {
    fontSize: "24px",
    fontWeight: 700,
  },

  logoutButton: {
    background: "#d9534f",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.25s",
  },

  content: {
    padding: "50px 40px",
    zIndex: 5,
    position: "relative",
    animation: "fadeIn 1.2s ease",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "35px",
    fontWeight: 700,
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    background: "rgba(30, 30, 35, 0.65)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "30px",
    width: "250px",
    borderRadius: "14px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "0.25s",
    cursor: "pointer",
    boxShadow: "0 0 25px rgba(0,0,0,0.6)",
  },

  emoji: {
    fontSize: "35px",
  },
};

/* Inject animations */
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
