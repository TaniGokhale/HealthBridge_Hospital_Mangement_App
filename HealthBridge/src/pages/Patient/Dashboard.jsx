import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Patient.css";

function Dashboard() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({});
  const [edit, setEdit] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchAppointments();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/patient/profile");
      setUser(res.data);
      setForm(res.data);
    } catch {
      setUser({});
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
    } catch {
      setAppointments([]);
    }
  };

  const handleSave = async () => {
    try {
      const res = await API.put("/patient/profile", form);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setEdit(false);

      alert("Profile Saved ✅");
    } catch {
      alert("Error saving profile");
    }
  };

  return (
    <div className="dashboard">

  <h2 className="title">👤 Patient Dashboard</h2>

  {/* PROFILE */}
  <div className="profile-card glass">
    <div className="profile-header">
      <h3>{user.name}</h3>
      <span>{user.email}</span>
    </div>

    {!edit ? (
      <div className="profile-info">
        <p>🎂 Age: {user.age || "N/A"}</p>
        <p>📍 City: {user.city || "N/A"}</p>
        <p>🆔 Aadhar: {user.aadhar || "N/A"}</p>

        <button className="btn-primary" onClick={() => setEdit(true)}>
          Edit Profile
        </button>
      </div>
    ) : (
      <div className="profile-form">
        <input placeholder="Name" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})}/>
        <input placeholder="Email" value={form.email || ""} onChange={e => setForm({...form, email: e.target.value})}/>
        <input placeholder="Age" value={form.age || ""} onChange={e => setForm({...form, age: e.target.value})}/>
        <input placeholder="City" value={form.city || ""} onChange={e => setForm({...form, city: e.target.value})}/>
        <input placeholder="Aadhar" value={form.aadhar || ""} onChange={e => setForm({...form, aadhar: e.target.value})}/>

        <div className="btn-group">
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-danger" onClick={() => setEdit(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>

  {/* STATS */}
  <div className="stats">

    <div className="stat-box total" onClick={() => navigate("/patient/my")}>
      <h3>{appointments.length}</h3>
      <p>Total Appointments</p>
    </div>

    <div className="stat-box pending" onClick={() => navigate("/patient/my")}>
      <h3>{appointments.filter(a => a.status === "pending").length}</h3>
      <p>Pending</p>
    </div>

    <div className="stat-box completed" onClick={() => navigate("/patient/my")}>
      <h3>{appointments.filter(a => a.status === "completed").length}</h3>
      <p>Completed</p>
    </div>

  </div>

</div>
  );
}

export default Dashboard;