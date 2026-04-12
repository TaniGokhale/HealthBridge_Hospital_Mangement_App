import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

// Add Doctor
export const addDoctor = async (req, res) => {
  const { name, email, password, specialization, experience, fees } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role: "doctor"
  });

  const doctor = await Doctor.create({
    userId: user._id,
    specialization,
    experience,
    fees
  });

  res.json(doctor);
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  await User.findByIdAndDelete(doctor.userId);
  await doctor.deleteOne();

  res.json({ message: "Doctor removed" });
};

// Get All Patients
export const getPatients = async (req, res) => {
  const patients = await User.find({ role: "patient" });
  res.json(patients);
};

// Dashboard
export const getDashboard = async (req, res) => {
  const totalDoctors = await Doctor.countDocuments();
  const totalPatients = await User.countDocuments({ role: "patient" });
  const totalAppointments = await Appointment.countDocuments();

  res.json({
    totalDoctors,
    totalPatients,
    totalAppointments
  });
};