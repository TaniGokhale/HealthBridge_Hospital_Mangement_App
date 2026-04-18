import { useState } from "react";
import API from "../../services/api";
import "./Doctor.css";

function AddPrescription() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post("/doctors/prescription", form);
    alert("Prescription Added ✅");
  };

  return (
    <div className="doctor-container">
      <h2 className="title">Add Prescription 💊</h2>

      <div className="form-box">
        <input placeholder="Patient ID"
          onChange={e=>setForm({...form, patientId: e.target.value})}/>

        <textarea placeholder="Prescription"
          onChange={e=>setForm({...form, text: e.target.value})}/>

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default AddPrescription;