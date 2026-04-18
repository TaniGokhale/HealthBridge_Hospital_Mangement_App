import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Doctor.css";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchAppointments();
    fetchDoctor();
  }, []);

  // 🔥 GET APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 GET DOCTOR INFO
  const fetchDoctor = async () => {
    try {
      const res = await API.get("/doctors"); // simple fetch
      setDoctor(res.data[0]); // demo purpose
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/doctors/appointment/${id}`, { status });
    fetchAppointments();
  };

  // 🔥 ADD PRESCRIPTION
  const addPrescription = async (patientId) => {
    const text = prompt("Enter prescription");
    if (!text) return;

    await API.post("/doctors/prescription", {
      patientId,
      text,
    });

    alert("Prescription Added ✅");
  };

  return (
    <Layout>
      <div className="doctor-container">
        
        <h2 className="title">Doctor Dashboard 🩺</h2>

        {/* 🧑‍⚕️ Doctor Info */}
        {doctor && (
          <div className="doctor-info">
            <h3>Doctor Profile</h3>
            <p><b>Specialization:</b> {doctor.specialization}</p>
            <p><b>Experience:</b> {doctor.experience} yrs</p>
            <p><b>Fees:</b> ₹{doctor.fees}</p>
            <p><b>Available:</b> {doctor.available ? "Yes" : "No"}</p>
          </div>
        )}

        {/* 📭 Empty */}
        {appointments.length === 0 && (
          <div className="empty">
            <p>No Appointments Yet 📭</p>
          </div>
        )}

        {/* 📋 Appointments */}
        <div className="card-container">
          {appointments.map((a) => (
            <div className="card" key={a._id}>
              <h3>{a.patientId?.name || "Patient"}</h3>
              <p>Date: {new Date(a.date).toLocaleString()}</p>
              <p>Status: {a.status}</p>

              <div className="btn-group">
                <button
                  className="accept"
                  onClick={() => updateStatus(a._id, "approved")}
                >
                  Accept
                </button>

                <button
                  className="reject"
                  onClick={() => updateStatus(a._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="prescription"
                  onClick={() => addPrescription(a.patientId?._id)}
                >
                  Add Rx
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;