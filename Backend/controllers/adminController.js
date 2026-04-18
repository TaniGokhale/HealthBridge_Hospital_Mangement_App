import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

/* ================= ADD DOCTOR ================= */
export const addDoctor = async (req, res) => {
  const { specialization, experience, fees } = req.body;

  const doctor = await Doctor.create({
    specialization,
    experience,
    fees
  });

  res.json(doctor);
};

/* ================= DELETE DOCTOR ================= */
export const deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted" });
};

/* ================= GET PATIENTS ================= */
export const getPatients = async (req, res) => {
  const patients = await User.find({ role: "patient" });
  res.json(patients);
};

/* ================= GET ALL APPOINTMENTS ================= */
export const getAllAppointments = async (req, res) => {
  const data = await Appointment.find()
    .populate("patientId", "name email")
    .populate("doctorId");

  res.json(data);
};

/* ================= DASHBOARD STATS ================= */
export const getStats = async (req, res) => {
  const doctors = await Doctor.countDocuments();
  const patients = await User.countDocuments({ role: "patient" });
  const appointments = await Appointment.countDocuments();

  res.json({ doctors, patients, appointments });
};