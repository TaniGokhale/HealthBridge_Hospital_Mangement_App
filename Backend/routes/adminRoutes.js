import express from "express";
import {
  addDoctor,
  deleteDoctor,
  getPatients,
  getAllAppointments,
  getStats
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/doctor", protect, authorizeRoles("admin"), addDoctor);
router.delete("/doctor/:id", protect, authorizeRoles("admin"), deleteDoctor);

router.get("/patients", protect, authorizeRoles("admin"), getPatients);
router.get("/appointments", protect, authorizeRoles("admin"), getAllAppointments);
router.get("/stats", protect, authorizeRoles("admin"), getStats);

export default router;