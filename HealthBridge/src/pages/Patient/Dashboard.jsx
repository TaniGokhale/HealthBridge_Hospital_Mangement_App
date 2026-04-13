import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <Link to="/book">Book Appointment</Link><br/>
      <Link to="/my">My Appointments</Link>
    </div>
  );
}
export default Dashboard;