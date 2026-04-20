import { useEffect, useState } from "react";
import API from "../../services/api";

function MyAppointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/appointments/my")
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  return (
    <div className="page">
      <h2>My Appointments</h2>

      {data.map(a => (
        <div className="card" key={a._id}>

          <h3>{a.doctor?.userId?.name}</h3>
          <p>Status: {a.status}</p>

          {a.status !== "pending" && (
            <>
              <p>Date: {a.date}</p>
              <p>Time: {a.time}</p>
              <p>Fees: ₹{a.fees}</p>
            </>
          )}

          {a.mode === "online" && (
            <a href={a.meetingLink}>Join Meeting</a>
          )}

          {a.mode === "offline" && (
            <p>Visit: {a.hospitalAddress}</p>
          )}

          {a.prescription && (
            <p>Prescription: {a.prescription}</p>
          )}

          <p>Payment: {a.paymentStatus}</p>

        </div>
      ))}
    </div>
  );
}

export default MyAppointments;