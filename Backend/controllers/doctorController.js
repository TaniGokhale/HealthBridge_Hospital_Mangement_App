// import Appointment from "../models/Appointment.js";
// import Prescription from "../models/Prescription.js";
// import Doctor from "../models/Doctor.js";

// // Accept / Reject Appointment
// export const updateAppointmentStatus = async (req, res) => {
//   const { status } = req.body;

//   const appointment = await Appointment.findById(req.params.id);
//   if (!appointment) return res.status(404).json({ message: "Not found" });

//   appointment.status = status;
//   await appointment.save();

//   res.json(appointment);
// };

// // Add Prescription
// export const addPrescription = async (req, res) => {
//   const { patientId, medicines, notes } = req.body;

//   const prescription = await Prescription.create({
//     patient: patientId,
//     doctor: req.user._id,
//     medicines,
//     notes
//   });

//   res.json(prescription);
// };

// // Set Availability
// export const setAvailability = async (req, res) => {
//   const { available } = req.body;

//   const doctor = await Doctor.findOne({ userId: req.user._id });
//   doctor.available = available;
//   await doctor.save();

//   res.json(doctor);
// };

import Doctor from "../models/Doctor.js";

export const getMyProfile = async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });
  res.json(doctor);
};

export const updateMyProfile = async (req, res) => {
  let doctor = await Doctor.findOne({ userId: req.user._id });

  if (!doctor) {
    doctor = await Doctor.create({ userId: req.user._id });
  }

  Object.assign(doctor, req.body);
  await doctor.save();

  res.json(doctor);
};