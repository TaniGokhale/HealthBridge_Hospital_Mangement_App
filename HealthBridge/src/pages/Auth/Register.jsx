import { useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: "",
    experience: "",
    fees: "",
    hospital: ""
  });

  const navigate = useNavigate();

 const handleRegister = async () => {
  try {
    console.log(form); // 👈 ये देखो

    await API.post("/auth/register", form);

    alert("Registered Successfully ✅");
    navigate("/");
  } catch (err) {
    alert("Registration Failed ❌");
  }
};

  return (
    <div className="auth-container">

      {/* LOGO */}
      <h2 className="logo">HealthBridge 🏥</h2>

      <div className="auth-box">
        <h2>Create Account</h2>

        {/* 👇 DYNAMIC GRID */}
        <div className={`form-grid ${form.role === "doctor" ? "doctor" : ""}`}>

          <input
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {/* 👨‍⚕️ ONLY DOCTOR FIELDS */}
          {form.role === "doctor" && (
            <>
              <input
                placeholder="Specialization"
                onChange={e => setForm({ ...form, specialization: e.target.value })}
              />

              <input
                placeholder="Experience (years)"
                onChange={e => setForm({ ...form, experience: e.target.value })}
              />

              <input
                placeholder="Fees"
                onChange={e => setForm({ ...form, fees: e.target.value })}
              />

              <input
                placeholder="Hospital"
                onChange={e => setForm({ ...form, hospital: e.target.value })}
              />
            </>
          )}

          {/* BUTTON */}
          <button className="full" onClick={handleRegister}>
            Register
          </button>

        </div>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;