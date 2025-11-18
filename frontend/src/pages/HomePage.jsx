export default function HomePage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to CMS</h2>

        <p style={{ textAlign: "center", marginBottom: "20px", opacity: 0.8 }}>
          Choose how you want to continue
        </p>

        {/* Admin Login */}
        <a href="/admin-login" style={styles.button}>
          Admin Login
        </a>

        {/* Normal User */}
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
    fontWeight: "bold",
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
  },
};
