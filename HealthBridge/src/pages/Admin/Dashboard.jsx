import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Doctors: {data.totalDoctors}</p>
      <p>Patients: {data.totalPatients}</p>
      <p>Appointments: {data.totalAppointments}</p>
    </div>
  );
}

export default Dashboard;