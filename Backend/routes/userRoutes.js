import express from "express";
import {
  registerUser,
  loginUser,
  editProfile,
  userlogout,
  getJobs,
  applyToJobs,
  applyToInternships,
  getAppliedJobs,
  getCurrentUser,
  removeSavedJob,
  getInternships,
  getInternshipById,
} from "../controllers/userController.js";
import { isSeeker, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/editProfile", protect, editProfile);
router.get("/getJobs", protect, isSeeker, getJobs);
router.post("/logout", protect, isSeeker, userlogout);
router.put("/applyJob", protect, isSeeker, applyToJobs);
router.get("/getAppliedJobs", protect, isSeeker, getAppliedJobs);
router.get("/profile", protect, isSeeker, getCurrentUser);
router.put("/edit-profile", protect, isSeeker, editProfile);
router.delete("/savedJobs/:jobId", protect, removeSavedJob);
router.get("/getInternships", protect, isSeeker, getInternships);
router.get("/internship/:id", protect, isSeeker, getInternshipById);
router.put("/applyInternship", protect, isSeeker, applyToInternships);
router.get('/me', protect,isSeeker, getCurrentUser);
export default router;
