import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  const { doctorId, date } = req.body;

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    date
  });

  res.json(appointment);
};

export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name")
    .populate("doctor");

  res.json(appointments);
};