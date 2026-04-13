import { useEffect, useState } from "react";
import API from "../../services/api";

function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/appointments").then(res => setData(res.data));
  }, []);

  const update = async (id, status) => {
    await API.put(`/doctors/appointment/${id}`, { status });
    alert("Updated");
  };

  return (
    <div>
      <h2>Appointments</h2>
      {data.map(a => (
        <div key={a._id}>
          <p>{a.patient?.name}</p>
          <button onClick={()=>update(a._id,"approved")}>Accept</button>
          <button onClick={()=>update(a._id,"rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
export default Appointments;