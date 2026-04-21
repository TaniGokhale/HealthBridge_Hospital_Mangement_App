import express from "express";
import Doctor from "../models/Doctor.js";
import { getMyProfile, updateMyProfile } from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET ALL DOCTORS (PATIENT USE)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email");

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// PROFILE
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);

export default router;