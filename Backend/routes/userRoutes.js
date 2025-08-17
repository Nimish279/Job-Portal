import express from "express";
import {
  registerUser,
  loginUser,
  editProfile,
  userlogout,
  getJobs,
  applyToJobs,
  getAppliedJobs,
<<<<<<< HEAD
=======
  getCurrentUser,
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9
} from "../controllers/userController.js";
import { isSeeker, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/editProfile", protect, editProfile);
router.get("/getJobs", protect, isSeeker, getJobs);
router.post("/logout", protect, isSeeker, userlogout);
router.put("/applyJob", protect, isSeeker, applyToJobs);
router.get("/getAppliedJobs", protect, isSeeker, getAppliedJobs);
<<<<<<< HEAD
=======
router.get("/profile", protect, isSeeker, getCurrentUser);
router.put("/edit-profile", protect, isSeeker, editProfile);
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9

export default router;
