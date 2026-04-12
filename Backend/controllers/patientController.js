import Appointment from "../models/Appointment.js";

// View Own Appointments
export const myAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id })
    .populate("doctor");

  res.json(appointments);
};

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) return res.status(404).json({ message: "Not found" });

  if (appointment.patient.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await appointment.deleteOne();
  res.json({ message: "Appointment cancelled" });
};