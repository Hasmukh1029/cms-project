import forest from "../assets/forest.jpg";

export default function HomePage() {
  return (
    <div style={{ ...styles.page, backgroundImage: `url(${forest})` }}>

      {/* Dark overlay for readability */}
      <div style={styles.darkOverlay}></div>

      {/* Slow zoom cinematic animation */}
      <div style={{ ...styles.bgAnimator, backgroundImage: `url(${forest})` }}></div>

      {/* Optional glowing gradients */}
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      {/* Floating particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 16 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      {/* Main card */}
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
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    color: "white",
  },

  darkOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.60)",
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },

  bgAnimator: {
    position: "absolute",
    width: "110%",
    height: "110%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    animation: "slowZoom 35s ease-in-out infinite",
    opacity: 0.3,
    zIndex: 0,
  },

  glow1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,80,255,0.25), transparent 70%)",
    top: "-180px",
    left: "-150px",
    filter: "blur(50px)",
    zIndex: 1,
  },
  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,200,255,0.20), transparent 70%)",
    bottom: "-180px",
    right: "-150px",
    filter: "blur(50px)",
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
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    animation: "floatUp 12s linear infinite",
  },

  card: {
    background: "rgba(15, 15, 20, 0.65)",
    padding: "40px",
    width: "360px",
    borderRadius: "14px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 25px rgba(0,0,0,0.7)",
    zIndex: 5,
    animation: "fadeIn 1.2s ease",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: 700,
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.85,
    marginBottom: "20px",
  },

  button: {
    display: "block",
    textAlign: "center",
    background: "#4f46e5",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
  },

  secondaryButton: {
    display: "block",
    textAlign: "center",
    background: "#2e2e34",
    padding: "12px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    border: "1px solid #444",
    fontWeight: 600,
  },
};

/* ANIMATIONS */
const s = document.createElement("style");
s.textContent = `
@keyframes slowZoom {
  0% { transform: scale(1); }
  50% { transform: scale(1.12); }
  100% { transform: scale(1); }
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 0.4; }
  100% { transform: translateY(-1200px); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(s);
