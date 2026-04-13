import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageDoctors() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get("/doctors").then(res => setData(res.data));
  }, []);

  const add = async () => {
    await API.post("/admin/doctor", form);
    alert("Added");
  };

  const remove = async (id) => {
    await API.delete(`/admin/doctor/${id}`);
    alert("Deleted");
  };

  return (
    <div>
      <h2>Doctors</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={add}>Add</button>

      {data.map(d=>(
        <div key={d._id}>
          <p>{d.userId?.name}</p>
          <button onClick={()=>remove(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default ManageDoctors;