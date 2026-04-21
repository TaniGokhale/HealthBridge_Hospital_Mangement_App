import { useEffect, useState } from "react";
import API from "../../services/api";

function DoctorProfile() {
  const [form, setForm] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    API.get("/doctors/me").then(res => setForm(res.data));
  }, []);

  const save = async () => {
    await API.put("/doctors/me", form);
    alert("Updated ✅");
    setEdit(false);
  };

  return (
    <div className="page">

      <h2>My Profile</h2>

      {!edit ? (
        <div className="card">
          <p><b>Specialization:</b> {form.specialization}</p>
          <p><b>Experience:</b> {form.experience}</p>
          <p><b>Fees:</b> ₹{form.fees}</p>
          <p><b>Hospital:</b> {form.hospital}</p>

          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      ) : (
        <div className="card">

          <input
            placeholder="Specialization"
            value={form.specialization || ""}
            onChange={e => setForm({...form, specialization: e.target.value})}
          />

          <input
            placeholder="Experience"
            value={form.experience || ""}
            onChange={e => setForm({...form, experience: e.target.value})}
          />

          <input
            placeholder="Fees"
            value={form.fees || ""}
            onChange={e => setForm({...form, fees: e.target.value})}
          />

          <input
            placeholder="Hospital"
            value={form.hospital || ""}
            onChange={e => setForm({...form, hospital: e.target.value})}
          />

          <button onClick={save}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>

        </div>
      )}

    </div>
  );
}

export default DoctorProfile;