import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  specialization: String,
  experience: Number,
  fees: Number,
  hospital: String,
  address: String,
  availableDays: String,
  timings: String,
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);