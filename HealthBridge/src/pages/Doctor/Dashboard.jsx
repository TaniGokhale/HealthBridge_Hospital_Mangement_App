import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await API.get("/doctors/me");
      setDoctor(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">

      <h2>Doctor Dashboard 🩺</h2>

      <div className="card">
        <h3>{doctor?.specialization}</h3>
        <p>Hospital: {doctor?.hospital}</p>
        <p>Fees: ₹{doctor?.fees}</p>
        <p>Experience: {doctor?.experience} yrs</p>
      </div>

    </div>
  );
}

export default Dashboard;