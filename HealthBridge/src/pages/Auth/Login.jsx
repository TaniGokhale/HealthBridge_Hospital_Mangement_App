import { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await API.post("/auth/login", form);
    login(data);

    if (data.role === "admin") navigate("/admin");
    else if (data.role === "doctor") navigate("/doctor");
    else navigate("/patient");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;