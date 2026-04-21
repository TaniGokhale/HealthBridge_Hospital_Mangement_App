import { useEffect, useState } from "react";
import API from "../../services/api";
import "./patient.css";

function MyAppointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    API.get("/appointments/my")
      .then(res => setData(res.data))
      .catch(() => setData([]));
  };

  const cancel = async (id) => {
    try {
      await API.delete(`/patient/appointment/${id}`);
      alert("Cancelled ❌");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Cancel failed ❌");
    }
  };

  return (
    <div className="page">

      <h2>My Appointments</h2>

      {data.length === 0 && <p>No Appointments</p>}

      {data.map(a => (
        <div className="card" key={a._id}>

          {/* ✅ DOCTOR FULL INFO */}
          <h3>{a.doctor?.userId?.name}</h3>
          <p>Email: {a.doctor?.userId?.email}</p>
          <p>Specialization: {a.doctor?.specialization}</p>
          <p>Hospital: {a.doctor?.hospital}</p>
          <p>Fees: ₹{a.doctor?.fees}</p>

          <hr />

          <p><b>Status:</b> {a.status}</p>

          {/* APPROVED / COMPLETED */}
          {a.status !== "pending" && (
            <>
              <p>Date: {a.date}</p>
              <p>Time: {a.time}</p>
              <p>Consultation Fees: ₹{a.fees}</p>
            </>
          )}

          {/* MODE */}
          {a.mode === "online" && a.meetingLink && (
            <a href={a.meetingLink} target="_blank" rel="noreferrer">
              Join Meeting 💻
            </a>
          )}

          {a.mode === "offline" && (
            <p>Visit: {a.hospitalAddress}</p>
          )}

          {/* PRESCRIPTION */}
          {a.prescription && (
            <p><b>Prescription:</b> {a.prescription}</p>
          )}

          {/* PAYMENT */}
          <p><b>Payment:</b> {a.paymentStatus}</p>

          {/* ❌ CANCEL ONLY IF PENDING */}
          {a.status === "pending" && (
            <button onClick={() => cancel(a._id)}>
              Cancel Appointment ❌
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default MyAppointments;