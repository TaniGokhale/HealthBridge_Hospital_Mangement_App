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
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u || {});
    setForm(u || {});

    // fetch appointments
   API.get("/appointments/my")
      .then(res => setAppointments(res.data))
      .catch(() => setAppointments([]));
  }, []);

  // SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setEdit(false);
  };

  return (
   <div className="dashboard">
      <h2>Patient Dashboard</h2>

      {/* ================= PROFILE ================= */}
      <div className="profile-card">
        <h3>👤 Your Profile</h3>

        {!edit ? (
          <>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Age:</strong> {user?.age || "N/A"}</p>
            <p><strong>City:</strong> {user?.city || "N/A"}</p>
            <p><strong>Aadhar:</strong> {user?.aadhar || "N/A"}</p>

            <button onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Name"
              value={form.name || ""}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              value={form.email || ""}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Age"
              value={form.age || ""}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />

            <input
              placeholder="City"
              value={form.city || ""}
              onChange={e => setForm({ ...form, city: e.target.value })}
            />

            <input
              placeholder="Aadhar"
              value={form.aadhar || ""}
              onChange={e => setForm({ ...form, aadhar: e.target.value })}
            />

            <div className="btn-group">
              <button onClick={handleSave}>Save</button>
              <button className="cancel" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* ================= STATS ================= */}
      <div className="grid">

        {/* TOTAL */}
        <div
          className="card stat clickable"
          onClick={() => navigate("/patient/my")}
        >
          <h3>{appointments.length}</h3>
          <p>Total Appointments</p>
        </div>

        {/* PENDING */}
        <div
          className="card stat clickable"
          onClick={() => navigate("/patient/my")}
        >
          <h3>
            {appointments.filter(a => a.status === "pending").length}
          </h3>
          <p>Pending</p>
        </div>

        {/* PAYMENT DONE (dummy logic) */}
        <div
          className="card stat clickable"
          onClick={() => navigate("/patient/my")}
        >
          <h3>
            {appointments.filter(a => a.status === "completed").length}
          </h3>
          <p>Payments Done</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;