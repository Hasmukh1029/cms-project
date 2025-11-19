export default function HomePage() {
  return (
    <div style={styles.page}>

      {/* --- Animated Background Elements --- */}
      <div style={styles.gradientOverlay}></div>
      <ul style={styles.floatingShapes}>
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} style={styles.shape}></li>
        ))}
      </ul>

      {/* --- Content Card --- */}
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to CMS</h2>

        <p style={styles.subtitle}>
          Choose how you want to continue
        </p>

        <a href="/admin-login" style={styles.button}>
          Admin Login
        </a>

        <a href="/public-home" style={styles.secondaryButton}>
          Continue as User
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },

  /* soft animated gradient glow */
  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at 30% 30%, rgba(80, 70, 255, 0.15), transparent 60%), \
       radial-gradient(circle at 70% 70%, rgba(0, 180, 255, 0.12), transparent 60%)",
    animation: "pulse 6s ease-in-out infinite",
    zIndex: 1,
  },

  /* floating abstract shapes */
  floatingShapes: {
    position: "absolute",
    listStyle: "none",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    zIndex: 1,
  },

  shape: {
    position: "absolute",
    bottom: "-150px",
    width: "25px",
    height: "25px",
    background: "rgba(100, 100, 255, 0.15)",
    borderRadius: "50%",
    animation: "floatUp 18s linear infinite",
  },

  card: {
    background: "rgba(26, 26, 29, 0.9)",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 25px rgba(0,0,0,0.6)",
    zIndex: 2,
    animation: "fadeIn 1.2s ease-out",
  },

  title: {
    marginBottom: "25px",
    fontSize: "28px",
    textAlign: "center",
    letterSpacing: "1px",
    fontWeight: "bold",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    opacity: 0.8,
  },

  button: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    textDecoration: "none",
    marginBottom: "15px",
    cursor: "pointer",
    transition: "0.25s",
  },

  secondaryButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
    background: "#2a2a2d",
    color: "white",
    fontSize: "16px",
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid #444",
    transition: "0.25s",
  },
};

/* --- Add animations using JS injection --- */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
  100% { transform: translateY(-1100px) rotate(360deg); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
