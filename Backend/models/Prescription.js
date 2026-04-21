import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

  medicines: [
    {
      name: String,
      dosage: String,
      duration: String
    }
  ],

  notes: String,
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);