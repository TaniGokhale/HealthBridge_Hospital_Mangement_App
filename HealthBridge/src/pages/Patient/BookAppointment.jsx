import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Patient.css";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const book = async (id) => {
    try {
      await API.post("/appointments", {
        doctorId: id,
        date: new Date()
      });
      alert("Appointment Booked ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="patient-container">
        <h2 className="title">Book Appointment 🏥</h2>

        <div className="card-container">
          {doctors.map((d) => (
            <div className="card" key={d._id}>
              <h3>{d.specialization}</h3>
              <p>Experience: {d.experience} yrs</p>
              <p>Fees: ₹{d.fees}</p>

              <button onClick={() => book(d._id)}>
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default BookAppointment;