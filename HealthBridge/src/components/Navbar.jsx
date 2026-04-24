function Navbar() {
  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>HealthBridge 🏥</h2>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
    display: "flex",
    justifyContent: "center",   // ✅ center
    alignItems: "center",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
    letterSpacing: "1px"
  }
};

export default Navbar;