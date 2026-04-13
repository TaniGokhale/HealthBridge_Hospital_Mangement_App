import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div style={{ width: 200, background: "#ddd", height: "100vh" }}>
      {user?.role === "admin" && (
        <>
          <Link to="/admin">Dashboard</Link><br/>
          <Link to="/admin/doctors">Doctors</Link><br/>
          <Link to="/admin/patients">Patients</Link><br/>
          <Link to="/admin/appointments">Appointments</Link>
        </>
      )}

      {user?.role === "doctor" && (
        <>
          <Link to="/doctor">Dashboard</Link><br/>
          <Link to="/doctor/appointments">Appointments</Link><br/>
          <Link to="/doctor/prescription">Prescription</Link>
        </>
      )}

      {user?.role === "patient" && (
        <>
          <Link to="/patient">Dashboard</Link><br/>
          <Link to="/book">Book</Link><br/>
          <Link to="/my">My Appointments</Link>
        </>
      )}
    </div>
  );
}
export default Sidebar;