import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Admin.css";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    await API.delete(`/admin/doctor/${id}`);
    fetchDoctors();
  };

  return (
    <Layout>
      <div className="admin-container">
        <h2>Manage Doctors</h2>

        {doctors.map(d => (
          <div className="card" key={d._id}>
            <p>{d.specialization}</p>
            <button onClick={() => deleteDoctor(d._id)}>Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ManageDoctors;