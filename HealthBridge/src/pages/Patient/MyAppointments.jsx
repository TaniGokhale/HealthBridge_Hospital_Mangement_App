import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Patient.css";

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

      {data.length === 0 && <p className="empty">No Appointments</p>}

      <div className="grid">

        {data.map(a => (
          <div className="card modern-card" key={a._id}>

            <div className="card-header">
              <h3>{a.doctor?.userId?.name}</h3>
              <span className={`status ${a.status}`}>
                {a.status}
              </span>
            </div>

            <p>📧 {a.doctor?.userId?.email}</p>
            <p>🏥 {a.doctor?.hospital}</p>
            <p>💰 ₹{a.doctor?.fees}</p>

            {a.date && (
              <p>📅 {a.date} | ⏰ {a.time}</p>
            )}

            {a.mode === "online" && a.meetingLink && (
              <a
                className="join-btn"
                href={a.meetingLink}
                target="_blank"
                rel="noreferrer"
              >
                Join Meeting 💻
              </a>
            )}

            {a.mode === "offline" && (
              <p>📍 {a.hospitalAddress}</p>
            )}

            {a.prescription && (
              <p className="prescription">
                📝 {a.prescription}
              </p>
            )}

            <p>💳 Payment: {a.paymentStatus}</p>

            {a.status === "pending" && (
              <button
                className="btn-danger"
                onClick={() => cancel(a._id)}
              >
                Cancel ❌
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyAppointments; 