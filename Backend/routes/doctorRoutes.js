import express from "express";
import Doctor from "../models/Doctor.js";
import { updateAppointmentStatus, addPrescription, setAvailability } from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// ✅ GET ALL DOCTORS
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// Existing routes
router.put("/appointment/:id", protect, authorizeRoles("doctor"), updateAppointmentStatus);
router.post("/prescription", protect, authorizeRoles("doctor"), addPrescription);
router.put("/availability", protect, authorizeRoles("doctor"), setAvailability);

export default router;