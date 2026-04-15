import { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css"

function Login() {
  const [form, setForm] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "doctor") navigate("/doctor");
      else navigate("/patient");
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>

        <input placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>

        <input type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <button onClick={handleLogin}>Login</button>

        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;