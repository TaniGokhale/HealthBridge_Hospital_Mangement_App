import { useState } from "react";
import API from "../../services/api";

function AddPrescription() {
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      await API.post("/doctors/prescription", form);
      alert("Prescription Added");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Add Prescription</h2>
      <input placeholder="Patient ID" onChange={e=>setForm({...form,patientId:e.target.value})}/>
      <input placeholder="Medicines" onChange={e=>setForm({...form,medicines:e.target.value})}/>
      <input placeholder="Notes" onChange={e=>setForm({...form,notes:e.target.value})}/>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
export default AddPrescription;