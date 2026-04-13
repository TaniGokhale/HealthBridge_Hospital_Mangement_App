import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <Link to="/doctor/appointments">Appointments</Link>
    </div>
  );
}
export default Dashboard;