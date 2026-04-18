import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Patient.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      alert("Cancelled ❌");
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="patient-container">
        <h2 className="title">My Appointments 📅</h2>

        {appointments.length === 0 && (
          <div className="empty">No Appointments Yet 📭</div>
        )}

        <div className="card-container">
          {appointments.map((a) => (
            <div className="card" key={a._id}>
              <h3>{a.doctorId?.specialization}</h3>
              <p>Date: {new Date(a.date).toLocaleString()}</p>
              <p>Status: {a.status}</p>

              <button onClick={() => cancel(a._id)}>
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default MyAppointments;