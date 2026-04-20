import { useEffect, useState } from "react";
import API from "../../services/api";
import Layout from "../../components/Layout";

function DoctorProfile() {
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get("/doctors/me").then(res => setForm(res.data));
  }, []);

  const updateProfile = async () => {
    await API.put("/doctors/me", form);
    alert("Profile Updated ✅");
  };

  return (
    <Layout>
      <div className="page">

        <h2>My Profile</h2>

        <input
          placeholder="Specialization"
          value={form.specialization || ""}
          onChange={e => setForm({...form, specialization:e.target.value})}
        />

        <input
          placeholder="Experience"
          value={form.experience || ""}
          onChange={e => setForm({...form, experience:e.target.value})}
        />

        <input
          placeholder="Fees"
          value={form.fees || ""}
          onChange={e => setForm({...form, fees:e.target.value})}
        />

        <input
          placeholder="Hospital"
          value={form.hospital || ""}
          onChange={e => setForm({...form, hospital:e.target.value})}
        />

        <button onClick={updateProfile}>Save</button>

      </div>
    </Layout>
  );
}

export default DoctorProfile;