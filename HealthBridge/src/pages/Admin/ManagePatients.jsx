import { useEffect, useState } from "react";
import API from "../../services/api";

function ManagePatients() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/admin/patients").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      {data.map(p => (
        <div key={p._id}>
          <p>{p.name} - {p.email}</p>
        </div>
      ))}
    </div>
  );
}
export default ManagePatients;