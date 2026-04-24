import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// ================= BOOK =================
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existing = await Appointment.findOne({
      patient: req.user._id,
      doctor: doctorId,
      status: { $in: ["pending", "approved"] }
    });

    if (existing) {
      return res.status(400).json({
        message: "Already booked with this doctor"
      });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      status: "pending"
    });

    res.status(201).json(appointment);

  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// ================= PATIENT =================
export const getMyAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ patient: req.user._id })
      .populate({
        path: "doctor",
        populate: { path: "userId", select: "name email" }
      })
      .sort({ createdAt: -1 });

    res.json(data);

  } catch {
    res.status(500).json({ message: "Fetch error" });
  }
};

// ================= DOCTOR =================
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const data = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json(data);

  } catch {
    res.status(500).json({ message: "Fetch error" });
  }
};

// ================= UPDATE =================
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }
if (req.body.mode) appointment.mode = req.body.mode;
if (req.body.hospitalAddress) appointment.hospitalAddress = req.body.hospitalAddress;
    const {
      status,
      date,
      time,
      meetingLink,
      fees,
      prescription,
      paymentStatus,
      mode,
      hospitalAddress
    } = req.body;

    if (status) appointment.status = status;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (meetingLink) appointment.meetingLink = meetingLink;
    if (fees) appointment.fees = fees;
    if (prescription) appointment.prescription = prescription;
    if (paymentStatus) appointment.paymentStatus = paymentStatus;
    if (mode) appointment.mode = mode;
    if (hospitalAddress) appointment.hospitalAddress = hospitalAddress;

    await appointment.save();

    res.json(appointment);

  } catch {
    res.status(500).json({ message: "Update error" });
  }
};