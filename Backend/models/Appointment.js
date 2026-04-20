import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

  status: {
    type: String,
    enum: ["pending", "approved", "completed"],
    default: "pending"
  },

  mode: {
    type: String,
    enum: ["online", "offline"]
  },

  date: String,
  time: String,

  meetingLink: String,
  hospitalAddress: String,

  fees: Number,

  prescription: String,

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);