import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Doctor.css";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchAppointments();
    fetchDoctor();
  }, []);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments/doctor");
    setAppointments(res.data);
  };

  const fetchDoctor = async () => {
    const res = await API.get("/doctors/me");
    setDoctor(res.data || {});
  };

  const handleChange = (id, field, value) => {
    setForm(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const approve = async (id) => {
    await API.put(`/appointments/${id}`, {
      ...form[id],
      status: "approved"
    });
    fetchAppointments();
  };

  const complete = async (id) => {
    await API.put(`/appointments/${id}`, {
      prescription: form[id]?.prescription,
      status: "completed"
    });
    fetchAppointments();
  };

  const markPaid = async (id) => {
    await API.put(`/appointments/${id}`, {
      paymentStatus: "paid"
    });
    fetchAppointments();
  };

  return (
    <Layout>
      <div className="dashboard">

        <h2>Doctor Dashboard 🩺</h2>

        {/* PROFILE */}
        <div className="card profile-card">
          <h3>Your Profile</h3>
          <p>Specialization: {doctor?.specialization || "N/A"}</p>
          <p>Experience: {doctor?.experience || "N/A"}</p>
          <p>Fees: ₹{doctor?.fees || "N/A"}</p>
          <p>Hospital: {doctor?.hospital || "N/A"}</p>
        </div>

        {appointments.length === 0 && (
          <p>No Appointments</p>
        )}

        {/* APPOINTMENTS */}
        <div className="grid">
          {appointments.map(a => (
            <div className="card" key={a._id}>

              <h3>{a.patient?.name}</h3>
              <p>{a.patient?.email}</p>

              <span className={`badge ${a.status}`}>
                {a.status}
              </span>

              {/* PENDING */}
              {a.status === "pending" && (
                <>
                  <select
                    onChange={e => handleChange(a._id, "mode", e.target.value)}
                  >
                    <option>Select Mode</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>

                  <input type="date"
                    onChange={e => handleChange(a._id, "date", e.target.value)}
                  />

                  <input type="time"
                    onChange={e => handleChange(a._id, "time", e.target.value)}
                  />

                  <input placeholder="Fees"
                    onChange={e => handleChange(a._id, "fees", e.target.value)}
                  />

                  {form[a._id]?.mode === "online" && (
                    <input placeholder="Meeting Link"
                      onChange={e => handleChange(a._id, "meetingLink", e.target.value)}
                    />
                  )}

                  {form[a._id]?.mode === "offline" && (
                    <input placeholder="Hospital Address"
                      onChange={e => handleChange(a._id, "hospitalAddress", e.target.value)}
                    />
                  )}

                  <button onClick={() => approve(a._id)}>Approve</button>
                </>
              )}

              {/* APPROVED */}
              {a.status === "approved" && (
                <>
                  <p>Date: {a.date}</p>
                  <p>Time: {a.time}</p>
                  <p>Fees: ₹{a.fees}</p>

                  <textarea placeholder="Prescription"
                    onChange={e => handleChange(a._id, "prescription", e.target.value)}
                  />

                  <button onClick={() => complete(a._id)}>Complete</button>
                </>
              )}

              {/* COMPLETED */}
              {a.status === "completed" && (
                <>
                  <p><b>Prescription:</b> {a.prescription}</p>
                  <p><b>Payment:</b> {a.paymentStatus}</p>

                  {a.paymentStatus === "pending" && (
                    <button onClick={() => markPaid(a._id)}>
                      Mark Paid
                    </button>
                  )}
                </>
              )}

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;