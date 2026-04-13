import { useEffect, useState } from "react";
import API from "../../services/api";

function MyAppointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/patient/appointments").then(res => setData(res.data));
  }, []);

  const cancel = async (id) => {
    await API.delete(`/patient/appointment/${id}`);
    alert("Cancelled");
  };

  return (
    <div>
      <h2>My Appointments</h2>
      {data.map(a => (
        <div key={a._id}>
          <p>{a.doctor?.specialization} - {a.status}</p>
          <button onClick={()=>cancel(a._id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
export default MyAppointments;