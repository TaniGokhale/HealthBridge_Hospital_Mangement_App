import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Patient.css";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/doctors").then(res => setDoctors(res.data));
  }, []);

  const book = async (id) => {
    await API.post("/appointments", {
      doctorId: id,
      date: new Date()
    });
    alert("Appointment Booked ✅");
  };

  return (
    <div className="page">
      <h2>Book Appointment</h2>

      {doctors.length === 0 ? (
        <p className="empty">No doctors available</p>
      ) : (
        <div className="grid">
          {doctors.map(d => (
            <div key={d._id} className="card">
              <h3>{d.specialization}</h3>
              <p>Experience: {d.experience} yrs</p>
              <p>Fees: ₹{d.fees}</p>

              <button onClick={() => book(d._id)}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookAppointment;