import { Link, useNavigate, useLocation } from "react-router-dom";
import "./slidebar.css";
import { useState } from "react";
import {
  FaHome,
  FaUserMd,
  FaUser,
  FaCalendar,
  FaSignOutAlt,
  FaBars,
  FaClock,
  FaCheckCircle,
  FaList
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* 🔝 TOP */}
      <div className="top">
        <h2>{collapsed ? "👤" : user?.name || "User"}</h2>
        <FaBars className="menu-btn" onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* ================= DOCTOR ================= */}
      {user?.role === "doctor" && (
        <>
          <Link to="/doctor" className={isActive("/doctor") ? "active" : ""}>
            <FaHome /> {!collapsed && "Dashboard"}
          </Link>

          <Link to="/doctor/pending" className={isActive("/doctor/pending") ? "active" : ""}>
            <FaClock /> {!collapsed && "Pending"}
          </Link>

          <Link to="/doctor/scheduled" className={isActive("/doctor/scheduled") ? "active" : ""}>
            <FaCalendar /> {!collapsed && "Scheduled"}
          </Link>

          <Link to="/doctor/completed" className={isActive("/doctor/completed") ? "active" : ""}>
            <FaCheckCircle /> {!collapsed && "Completed"}
          </Link>

          <Link to="/doctor/profile" className={isActive("/doctor/profile") ? "active" : ""}>
            <FaUser /> {!collapsed && "My Profile"}
          </Link>
        </>
      )}

      {/* ================= PATIENT ================= */}
      {user?.role === "patient" && (
        <>
          <Link to="/patient" className={isActive("/patient") ? "active" : ""}>
            <FaHome /> {!collapsed && "Dashboard"}
          </Link>

          <Link to="/patient/book" className={isActive("/patient/book") ? "active" : ""}>
            <FaUserMd /> {!collapsed && "Book Appointment"}
          </Link>

          <Link to="/patient/my" className={isActive("/patient/my") ? "active" : ""}>
            <FaList /> {!collapsed && "My Appointments"}
          </Link>
        </>
      )}

      {/* ================= ADMIN ================= */}
      {user?.role === "admin" && (
        <>
          <Link to="/admin" className={isActive("/admin") ? "active" : ""}>
            <FaHome /> {!collapsed && "Dashboard"}
          </Link>

          <Link to="/admin/doctors" className={isActive("/admin/doctors") ? "active" : ""}>
            <FaUserMd /> {!collapsed && "Doctors"}
          </Link>

          <Link to="/admin/patients" className={isActive("/admin/patients") ? "active" : ""}>
            <FaUser /> {!collapsed && "Patients"}
          </Link>

          <Link to="/admin/appointments" className={isActive("/admin/appointments") ? "active" : ""}>
            <FaCalendar /> {!collapsed && "Appointments"}
          </Link>
        </>
      )}

      {/* 🔚 LOGOUT */}
      <button className="logout" onClick={logout}>
        <FaSignOutAlt /> {!collapsed && "Logout"}
      </button>

    </div>
  );
}

export default Sidebar;