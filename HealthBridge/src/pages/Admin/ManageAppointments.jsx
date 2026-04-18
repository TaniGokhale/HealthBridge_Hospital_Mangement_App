import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Admin.css";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Layout>
      <div className="admin-container">
        <h2>All Appointments</h2>

        {appointments.map(a => (
  <div key={a._id} className="card">
    <p>Patient: {a.patientId?.name}</p>
    <p>Doctor: {a.doctorId?.specialization}</p>
    <p>Status: {a.status}</p>
    <p>💰 Payment: {a.paymentStatus}</p>
  </div>
))}
      </div>
    </Layout>
  );
}

export default ManageAppointments;