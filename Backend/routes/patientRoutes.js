import express from "express";
import {
  myAppointments,
  cancelAppointment,
  getPatientProfile,
  updatePatientProfile
} from "../controllers/patientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/appointments", protect, myAppointments);
router.delete("/appointment/:id", protect, cancelAppointment);

router.get("/profile", protect, getPatientProfile);
router.put("/profile", protect, updatePatientProfile);

export default router;