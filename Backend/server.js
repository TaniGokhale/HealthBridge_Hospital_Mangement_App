import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= ADMIN AUTO CREATE ================= */
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"
      });

      console.log("✅ Admin created");
    } else {
      console.log("⚠️ Admin already exists");
    }
  } catch (error) {
    console.log("Admin creation error:", error.message);
  }
};

createAdmin();

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});