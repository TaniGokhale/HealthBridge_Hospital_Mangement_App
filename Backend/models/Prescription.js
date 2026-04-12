import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  medicines: String,
  notes: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Prescription", prescriptionSchema);