import Appointment from "../models/Appointment.js";

// ✅ BOOK
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user._id,
      date,
      status: "pending"
    });

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL (Doctor/Admin use)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "specialization");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET MY (Patient)
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id
    }).populate("doctorId");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ CANCEL
export const cancelAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};