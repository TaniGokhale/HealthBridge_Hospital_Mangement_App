import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Patient.css";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
      setDoctors([]);
    }
  };

  // ✅ BOOK APPOINTMENT (FINAL)
  const book = async (id) => {
    if (!window.confirm("Book appointment with this doctor?")) return;

    try {
      setLoadingId(id);

      await API.post("/appointments", {
        doctorId: id
      });

      alert("Appointment Booked ✅");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Already booked ❌");
    } finally {
      setLoadingId(null);
    }
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

              {/* ✅ DOCTOR INFO */}
              <h3>{d.userId?.name}</h3>
              <p><b>Email:</b> {d.userId?.email}</p>
              <p><b>Specialization:</b> {d.specialization}</p>
              <p><b>Experience:</b> {d.experience} yrs</p>
              <p><b>Hospital:</b> {d.hospital || "Not set"}</p>
              <p><b>Fees:</b> ₹{d.fees}</p>

              {/* ✅ BOOK BUTTON */}
              <button
                disabled={loadingId === d._id}
                onClick={() => book(d._id)}
              >
                {loadingId === d._id ? "Booking..." : "Book Appointment"}
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default BookAppointment;