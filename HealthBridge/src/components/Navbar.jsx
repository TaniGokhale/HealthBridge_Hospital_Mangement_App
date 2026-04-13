import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <span>HealthBridge</span>
      {user && (
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      )}
    </div>
  );
}
export default Navbar;