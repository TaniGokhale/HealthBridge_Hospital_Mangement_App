import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./patient.css";

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

      <h2>Patient Dashboard</h2>

      {/* PROFILE */}
      <div className="profile-card">
        <h3>Your Profile</h3>

        {!edit ? (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Age:</b> {user.age || "N/A"}</p>
            <p><b>City:</b> {user.city || "N/A"}</p>
            <p><b>Aadhar:</b> {user.aadhar || "N/A"}</p>

            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        ) : (
          <>
           <input
  placeholder="Enter Name"
  value={form.name || ""}
  onChange={e => setForm({ ...form, name: e.target.value })}
/>

<input
  placeholder="Enter Email"
  value={form.email || ""}
  onChange={e => setForm({ ...form, email: e.target.value })}
/>

<input
  placeholder="Enter Age"
  value={form.age || ""}
  onChange={e => setForm({ ...form, age: e.target.value })}
/>

<input
  placeholder="Enter City"
  value={form.city || ""}
  onChange={e => setForm({ ...form, city: e.target.value })}
/>

<input
  placeholder="Enter Aadhar Number"
  value={form.aadhar || ""}
  onChange={e => setForm({ ...form, aadhar: e.target.value })}
/>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </>
        )}
      </div>

      {/* STATS */}
      <div className="grid">

        <div className="card" onClick={() => navigate("/patient/my")}>
          <h3>{appointments.length}</h3>
          <p>Total</p>
        </div>

        <div className="card" onClick={() => navigate("/patient/my")}>
          <h3>{appointments.filter(a => a.status === "pending").length}</h3>
          <p>Pending</p>
        </div>

        <div className="card" onClick={() => navigate("/patient/my")}>
          <h3>{appointments.filter(a => a.status === "completed").length}</h3>
          <p>Completed</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;