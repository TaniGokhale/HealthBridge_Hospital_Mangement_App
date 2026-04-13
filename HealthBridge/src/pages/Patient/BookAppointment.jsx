import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorCard from "../../components/DoctorCard";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/doctors").then(res => setDoctors(res.data));
  }, []);

  const book = async (id) => {
    await API.post("/appointments", { doctorId: id, date: new Date() });
    alert("Booked");
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      {doctors.map(d => <DoctorCard key={d._id} doctor={d} onBook={book}/>)}
    </div>
  );
}
export default BookAppointment;