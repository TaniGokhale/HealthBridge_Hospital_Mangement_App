import express from "express";
import { myAppointments, cancelAppointment } from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/appointments", protect, myAppointments);
router.delete("/appointment/:id", protect, cancelAppointment);

export default router;