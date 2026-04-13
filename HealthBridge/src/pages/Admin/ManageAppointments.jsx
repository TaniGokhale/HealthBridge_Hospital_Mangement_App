import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageAppointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/appointments").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>All Appointments</h2>
      {data.map(a => (
        <div key={a._id}>
          <p>{a.patient?.name} - {a.status}</p>
        </div>
      ))}
    </div>
  );
}
export default ManageAppointments;