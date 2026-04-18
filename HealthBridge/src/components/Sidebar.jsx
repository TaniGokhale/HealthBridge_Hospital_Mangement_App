import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar">
      <h2>HealthBridge</h2>

      {user?.role === "doctor" && (
        <>
          <Link to="/doctor">Dashboard</Link>
          <Link to="/doctor/appointments">Appointments</Link>
          <Link to="/doctor/prescription">Prescription</Link>
        </>
      )}

      {user?.role === "patient" && (
        <>
          <Link to="/patient">Dashboard</Link>
          <Link to="/patient/book">Book Appointment</Link>
          <Link to="/patient/my">My Appointments</Link>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/doctors">Manage Doctors</Link>
          <Link to="/admin/patients">Manage Patients</Link>
          <Link to="/admin/appointments">Appointments</Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;