import Doctor from "../models/Doctor.js";

export const getMyProfile = async (req, res) => {
  let doctor = await Doctor.findOne({ userId: req.user._id });

  if (!doctor) {
    doctor = await Doctor.create({ userId: req.user._id });
  }

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