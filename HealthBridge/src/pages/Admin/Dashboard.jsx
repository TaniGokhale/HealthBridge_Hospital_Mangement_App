import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>👨‍⚕️ Doctors: {stats.doctors}</div>
        <div>🧑 Patients: {stats.patients}</div>
        <div>📅 Appointments: {stats.appointments}</div>
      </div>
    </div>
  );
}

export default Dashboard;