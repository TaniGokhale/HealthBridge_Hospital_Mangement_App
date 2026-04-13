function DoctorCard({ doctor, onBook }) {
  return (
    <div style={{ border: "1px solid black", margin: 10, padding: 10 }}>
      <h3>{doctor.userId?.name}</h3>
      <p>{doctor.specialization}</p>
      <button onClick={() => onBook(doctor._id)}>Book</button>
    </div>
  );
}
export default DoctorCard;