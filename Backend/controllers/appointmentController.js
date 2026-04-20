import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


// ================= BOOK APPOINTMENT (PATIENT) =================
export const bookAppointment = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body.doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctor._id,
      status: "pending"
    });

    res.status(201).json(appointment);

  } catch (error) {
    console.log("BOOK ERROR:", error);
    res.status(500).json({ message: "Server Error while booking" });
  }
};


// ================= PATIENT APPOINTMENTS =================
export const getMyAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ patient: req.user._id })
      .populate({
        path: "doctor",
        populate: { path: "userId", select: "name email" }
      })
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {
    console.log("PATIENT FETCH ERROR:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};


// ================= DOCTOR APPOINTMENTS =================
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    // ❗ VERY IMPORTANT CHECK
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const data = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {
    console.log("DOCTOR FETCH ERROR:", error);
    res.status(500).json({ message: "Error fetching doctor appointments" });
  }
};


// ================= UPDATE APPOINTMENT =================
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // update fields safely
    const {
      status,
      date,
      time,
      meetingLink,
      fees,
      prescription
    } = req.body;

    if (status) appointment.status = status;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (meetingLink) appointment.meetingLink = meetingLink;
    if (fees) appointment.fees = fees;
    if (prescription) appointment.prescription = prescription;

    await appointment.save();

    res.json({
      message: "Appointment updated successfully",
      appointment
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Error updating appointment" });
  }
};