import express from "express";
import {
  bookAppointment,
  getAppointments,
  getMyAppointments,
  cancelAppointment
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookAppointment);
router.get("/", protect, getAppointments);
router.get("/my", protect, getMyAppointments);
router.delete("/:id", protect, cancelAppointment);

export default router;