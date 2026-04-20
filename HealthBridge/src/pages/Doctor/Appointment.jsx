import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";

function Appointments({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      const res = await API.get("/appointments/doctor");

      // 🔥 FILTER BASED ON TYPE
      if (type) {
        const filtered = res.data.filter(a => a.status === type);
        setData(filtered);
      } else {
        setData(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="page">

        <h2>{type ? type.toUpperCase() : "ALL"} Appointments</h2>

        {data.length === 0 && <p>No Appointments</p>}

        {data.map(a => (
          <div className="card" key={a._id}>
            <h3>{a.patient?.name}</h3>
            <p>Email: {a.patient?.email}</p>
            <p>Status: {a.status}</p>

            {a.date && <p>Date: {a.date}</p>}
            {a.time && <p>Time: {a.time}</p>}
            {a.fees && <p>Fees: ₹{a.fees}</p>}

            {a.mode === "online" && (
              <a href={a.meetingLink}>Join Meeting</a>
            )}

            {a.mode === "offline" && (
              <p>Address: {a.hospitalAddress}</p>
            )}

            {a.prescription && (
              <p>Prescription: {a.prescription}</p>
            )}

            <p>Payment: {a.paymentStatus}</p>

          </div>
        ))}

      </div>
    </Layout>
  );
}

export default Appointments;