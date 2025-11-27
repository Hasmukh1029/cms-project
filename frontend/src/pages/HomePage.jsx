export default function HomePage() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>

      {/* ✅ TOP NAVIGATION BAR (ADDED WITHOUT CHANGING DESIGN) */}
      <div style={styles.topNav}>
        <div style={{ fontWeight: "bold" }}>CMS</div>

        <div style={{ display: "flex", gap: "12px" }}>
          {token && (
            <a href="/dashboard" style={styles.navBtn}>
              Dashboard
            </a>
          )}

          {token && (
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          )}

          {!token && (
            <a href="/admin-login" style={styles.navBtn}>
              Admin Login
            </a>
          )}

          <a href="/public-home" style={styles.navBtnAlt}>
            Blog
          </a>
        </div>
      </div>

      {/* Animated Glow Layers */}
      <div style={styles.glowLayer1}></div>
      <div style={styles.glowLayer2}></div>

      {/* Diagonal Light Beams */}
      <div style={styles.lightBeam1}></div>
      <div style={styles.lightBeam2}></div>

      {/* Noise Texture */}
      <div style={styles.noise}></div>

      {/* Floating Parallax Particles */}
      <ul style={styles.particles}>
        {Array.from({ length: 18 }).map((_, i) => (
          <li key={i} style={styles.particle}></li>
        ))}
      </ul>

      {/* Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to CMS</h2>

        <p style={styles.subtitle}>Choose how you want to continue</p>

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
    background: "#0b0b0d",
    color: "white",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ✅ TOP NAV BAR STYLES (MINIMAL, MATCHES THEME) */
  topNav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: "14px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(15,15,20,0.6)",
    backdropFilter: "blur(10px)",
    zIndex: 10,
    fontSize: "14px",
  },

  navBtn: {
    background: "#3a78ff",
    padding: "8px 14px",
    borderRadius: "7px",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "13px",
  },

  navBtnAlt: {
    background: "#2c2c31",
    padding: "8px 14px",
    borderRadius: "7px",
    textDecoration: "none",
    color: "#fff",
    border: "1px solid #444",
    fontWeight: "bold",
    fontSize: "13px",
  },

  logoutBtn: {
    background: "#d9534f",
    padding: "8px 14px",
    borderRadius: "7px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "13px",
  },

  /* Rotating gradient blobs */
  glowLayer1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,80,255,0.18), transparent 70%)",
    top: "-150px",
    left: "-150px",
    animation: "rotateSlow 40s linear infinite",
    filter: "blur(40px)",
    zIndex: 1,
  },

  glowLayer2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,200,255,0.15), transparent 70%)",
    bottom: "-120px",
    right: "-120px",
    animation: "rotateSlowReverse 45s linear infinite",
    filter: "blur(35px)",
    zIndex: 1,
  },

  /* Diagonal light streaks */
  lightBeam1: {
    position: "absolute",
    top: 0,
    left: "-30%",
    width: "200%",
    height: "100%",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.03), transparent 70%)",
    animation: "slideDiagonal 18s linear infinite",
    zIndex: 1,
  },

  lightBeam2: {
    position: "absolute",
    top: 0,
    left: "-30%",
    width: "200%",
    height: "100%",
    background:
      "linear-gradient(120deg, transparent, rgba(255,255,255,0.04), transparent)",
    animation: "slideDiagonal 30s linear infinite reverse",
    zIndex: 1,
  },

  noise: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.08,
    background:
      "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
    pointerEvents: "none",
  },

  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    zIndex: 2,
  },

  particle: {
    position: "absolute",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    boxShadow: "0 0 8px rgba(150,150,255,0.5)",
    animation: "floatParticle 16s linear infinite",
  },

  card: {
    background: "rgba(20, 20, 25, 0.75)",
    padding: "40px",
    borderRadius: "14px",
    width: "360px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 25px rgba(0,0,0,0.55)",
    zIndex: 5,
    animation: "fadeIn 1.2s ease",
  },

  title: {
    marginBottom: "25px",
    fontSize: "28px",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    opacity: 0.8,
  },

  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#4f46e5",
    textAlign: "center",
    textDecoration: "none",
    color: "#fff",
    marginBottom: "14px",
  },

  secondaryButton: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#2c2c31",
    border: "1px solid #444",
    textAlign: "center",
    textDecoration: "none",
    color: "#fff",
  },
};

/* Inject Animations */
const styleEl = document.createElement("style");
styleEl.textContent = `
@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotateSlowReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes slideDiagonal {
  0% { transform: translateX(-20%) translateY(0); }
  100% { transform: translateX(20%) translateY(0); }
}

@keyframes floatParticle {
  0% { transform: translateY(0); opacity: 0.3; }
  100% { transform: translateY(-1200px); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleEl);
