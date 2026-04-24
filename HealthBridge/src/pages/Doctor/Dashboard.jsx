import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import "./Doctor.css";

function Dashboard() {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments/doctor");
    setData(res.data);
  };

  const openPopup = (a) => {
    setSelected(a);
    setPopup(true);
  };

  const accept = async () => {
    await API.put(`/appointments/${selected._id}`, {
      ...form,
      status: "approved"
    });

    setPopup(false);
    setForm({});
    fetchAppointments();
  };

  const complete = async (id) => {
    await API.put(`/appointments/${id}`, {
      prescription: form.prescription,
      status: "completed"
    });

    setForm({});
    fetchAppointments();
  };

  const markPaid = async (id) => {
    await API.put(`/appointments/${id}`, {
      paymentStatus: "paid"
    });

    fetchAppointments();
  };

  // 🔥 STATS
  const total = data.length;
  const pending = data.filter(a => a.status === "pending").length;
  const approved = data.filter(a => a.status === "approved").length;
  const completed = data.filter(a => a.status === "completed").length;

  // 🔥 CHART DATA (monthly)
  const chartData = [
    { month: "Jan", count: total / 4 || 0 },
    { month: "Feb", count: total / 3 || 0 },
    { month: "Mar", count: total / 2 || 0 },
    { month: "Apr", count: total || 0 }
  ];

  return (
    <div className="dashboard">

      <h2>Doctor Dashboard 🩺</h2>

      {/* 🔥 STATS */}
      <div className="stats">
        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total</p>
        </div>

        <div className="stat-card pending">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card approved">
          <h3>{approved}</h3>
          <p>Scheduled</p>
        </div>

        <div className="stat-card completed">
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* 🔥 CHART */}
      <div className="chart-box">
  <h3>Appointments Growth</h3>

  <LineChart width={600} height={250} data={chartData}>
    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
    <XAxis dataKey="month" stroke="#fff" />
    <YAxis stroke="#fff" />
    <Tooltip />
    <Line 
      type="monotone" 
      dataKey="count" 
      stroke="#22c55e" 
      strokeWidth={3} 
    />
  </LineChart>
</div>

      {/* 🔥 APPOINTMENTS */}
      <div className="appointment-list">
        {data.map(a => (
          <div className="card" key={a._id}>

            <h3>{a.patient?.name}</h3>
            <p>{a.patient?.email}</p>

            <span className={`status ${a.status}`}>
              {a.status}
            </span>

            {/* PENDING */}
            {a.status === "pending" && (
              <button onClick={() => openPopup(a)}>
                Accept
              </button>
            )}

            {/* APPROVED */}
            {a.status === "approved" && (
              <>
                <p>📅 {a.date}</p>
                <p>⏰ {a.time}</p>
                <p>💰 ₹{a.fees}</p>

                <textarea
                  placeholder="Write Prescription"
                  onChange={e =>
                    setForm({ ...form, prescription: e.target.value })
                  }
                />

                <button onClick={() => complete(a._id)}>
                  Complete
                </button>
              </>
            )}

            {/* COMPLETED */}
            {a.status === "completed" && (
              <>
                <p>Prescription: {a.prescription}</p>

                <p>
                  Payment:
                  {a.paymentStatus === "paid"
                    ? " ✅ Paid"
                    : " ❌ Pending"}
                </p>

                {a.paymentStatus !== "paid" && (
                  <button onClick={() => markPaid(a._id)}>
                    Mark Paid 💰
                  </button>
                )}
              </>
            )}

          </div>
        ))}
      </div>

      {/* 🔥 POPUP */}
      {popup && (
        <div className="popup">
          <div className="popup-box">

            <h3>Appointment Details</h3>

            <input
              type="date"
              onChange={e =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              type="time"
              onChange={e =>
                setForm({ ...form, time: e.target.value })
              }
            />

            <input
              placeholder="Fees"
              onChange={e =>
                setForm({ ...form, fees: e.target.value })
              }
            />

            <select
              onChange={e =>
                setForm({ ...form, mode: e.target.value })
              }
            >
              <option>Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            {form.mode === "online" && (
              <input
                placeholder="Meeting Link"
                onChange={e =>
                  setForm({
                    ...form,
                    meetingLink: e.target.value
                  })
                }
              />
            )}

            {form.mode === "offline" && (
              <input
                placeholder="Hospital Address"
                onChange={e =>
                  setForm({
                    ...form,
                    hospitalAddress: e.target.value
                  })
                }
              />
            )}

            <button onClick={accept}>Confirm</button>
            <button onClick={() => setPopup(false)}>Cancel</button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;