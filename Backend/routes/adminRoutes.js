import express from "express";
import { addDoctor, deleteDoctor, getPatients, getDashboard } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/doctor", protect, authorizeRoles("admin"), addDoctor);
router.delete("/doctor/:id", protect, authorizeRoles("admin"), deleteDoctor);
router.get("/patients", protect, authorizeRoles("admin"), getPatients);
router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

export default router;