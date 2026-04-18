import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  date: Date,
  status: {
    type: String,
    default: "pending"
  },
  paymentStatus: {
    type: String,
    default: "unpaid" // unpaid / paid
  }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);