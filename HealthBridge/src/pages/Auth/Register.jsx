import { useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "./auth.css"

function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully ✅");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account 🚀</h2>

        <input placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})}/>

        <input placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>

        <input type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <select onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;