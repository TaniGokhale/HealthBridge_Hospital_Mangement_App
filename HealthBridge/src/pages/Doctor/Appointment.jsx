import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Doctor.css";

function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/appointments").then(res => setData(res.data));
  }, []);

  return (
    <div className="doctor-container">
      <h2 className="title">All Appointments</h2>

      {data.map(a => (
        <div className="card" key={a._id}>
          <p>Patient: {a.patientId?.name}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Appointments;