import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";
import "./Admin.css";

function ManagePatients() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await API.get("/admin/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Layout>
      <div className="admin-container">
        <h2>Manage Patients</h2>

        {patients.map(p => (
          <div className="card" key={p._id}>
            <p>{p.name}</p>
            <p>{p.email}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ManagePatients;