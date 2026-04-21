import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// GET APPOINTMENTS
export const myAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ patient: req.user._id })
      .populate({
        path: "doctor",
        populate: { path: "userId", select: "name email" }
      })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

// CANCEL
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Not found" });

    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel" });
    }

    await appointment.deleteOne();

    res.json({ message: "Cancelled" });

  } catch {
    res.status(500).json({ message: "Cancel failed" });
  }
};

// GET PROFILE
export const getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

// UPDATE PROFILE
export const updatePatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age;
    user.city = req.body.city;
    user.aadhar = req.body.aadhar;

    await user.save();

    res.json(user);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};