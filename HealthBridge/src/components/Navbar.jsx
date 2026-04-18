import { useAuth } from "../hooks/useAuth";
import "./Layout.css";

function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <h3>HealthBridge</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;