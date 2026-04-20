import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Layout & Protection
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDash from "./pages/Admin/Dashboard";
import ManageDoctors from "./pages/Admin/ManageDoctors";
import ManagePatients from "./pages/Admin/ManagePatients";
import ManageAppointments from "./pages/Admin/ManageAppointments";

// Doctor Pages
import DoctorDash from "./pages/Doctor/Dashboard";
import Appointments from "./pages/Doctor/Appointment";
import AddPrescription from "./pages/Doctor/AddPrescription";
import DoctorProfile from "./pages/Doctor/DoctorProfile"
// Patient Pages
import PatientDash from "./pages/Patient/Dashboard";
import Book from "./pages/Patient/BookAppointment";
import My from "./pages/Patient/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <Layout><AdminDash /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/doctors" element={
          <ProtectedRoute role="admin">
            <Layout><ManageDoctors /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/patients" element={
          <ProtectedRoute role="admin">
            <Layout><ManagePatients /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/admin/appointments" element={
          <ProtectedRoute role="admin">
            <Layout><ManageAppointments /></Layout>
          </ProtectedRoute>
        } />

        {/* ================= DOCTOR ================= */}
        <Route path="/doctor" element={
          <ProtectedRoute role="doctor">
            <Layout><DoctorDash /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/doctor/appointments" element={
          <ProtectedRoute role="doctor">
            <Layout><Appointments /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/doctor/prescription" element={
          <ProtectedRoute role="doctor">
            <Layout><AddPrescription /></Layout>
          </ProtectedRoute>
        } />

<Route path="/doctor/pending" element={<Layout><Appointments type="pending" /></Layout>} />
<Route path="/doctor/scheduled" element={<Layout><Appointments type="approved" /></Layout>} />
<Route path="/doctor/completed" element={<Layout><Appointments type="completed" /></Layout>} />
<Route path="/doctor/profile" element={<Layout><DoctorProfile /></Layout>} />
        {/* ================= PATIENT ================= */}
        <Route path="/patient" element={
          <ProtectedRoute role="patient">
            <Layout><PatientDash /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/patient/book" element={
          <ProtectedRoute role="patient">
            <Layout><Book /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/patient/my" element={
          <ProtectedRoute role="patient">
            <Layout><My /></Layout>
          </ProtectedRoute>
        } />

<Route path="/doctor/pending" element={
  <ProtectedRoute role="doctor">
    <Layout><Appointments type="pending" /></Layout>
  </ProtectedRoute>
} />

<Route path="/doctor/scheduled" element={
  <ProtectedRoute role="doctor">
    <Layout><Appointments type="approved" /></Layout>
  </ProtectedRoute>
} />

<Route path="/doctor/completed" element={
  <ProtectedRoute role="doctor">
    <Layout><Appointments type="completed" /></Layout>
  </ProtectedRoute>
} />

<Route path="/doctor/profile" element={
  <ProtectedRoute role="doctor">
    <Layout><DoctorProfile /></Layout>
  </ProtectedRoute>
} />
        {/* ================= DEFAULT / NOT FOUND ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;