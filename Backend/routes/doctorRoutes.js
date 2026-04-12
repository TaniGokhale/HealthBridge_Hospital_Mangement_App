import express from "express";
import { updateAppointmentStatus, addPrescription, setAvailability } from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.put("/appointment/:id", protect, authorizeRoles("doctor"), updateAppointmentStatus);
router.post("/prescription", protect, authorizeRoles("doctor"), addPrescription);
router.put("/availability", protect, authorizeRoles("doctor"), setAvailability);

export default router;