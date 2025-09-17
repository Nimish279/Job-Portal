import express from 'express';
import {Job} from "../models/Job.js";
import upload from '../middlewares/multer.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import {
  deleteJob,
  getCurrentRecruiter,
  getProfile,
  loginRecruiter,
  myJobs,
  postInternship,
  postJob,
  recruiterLogout,
  registerRecruiter,
  seeCandidates,
  updateJob,
  closeJob,
  openJob,
  updateRecruiterProfile,
  getJobById,
  getRecruiterJobs,
  getAllJobs,
  getRecruiterInternships,
} from '../controllers/recruiterController.js';

const router = express.Router();

// Recruiter auth
router.post('/register', upload.single("panCardOrGstFile"), registerRecruiter);
router.post('/login', loginRecruiter);
router.post('/logout', protect, isRecruiter, recruiterLogout);

// Recruiter profile
router.get('/getProfile', protect, isRecruiter, getProfile);
router.get('/me', protect, isRecruiter, getCurrentRecruiter);
router.post('/update', protect, isRecruiter, updateRecruiterProfile);

// Job management
router.post('/postJob', protect, isRecruiter, postJob);
router.post('/postInternship', protect, isRecruiter, postInternship);
router.get('/myJobs', protect, isRecruiter, getRecruiterJobs); // keep only one
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', protect, getJobById);
router.put('/updateJob/:id', protect, isRecruiter, updateJob);
router.delete('/deleteJob/:id', protect, isRecruiter, deleteJob);
router.post('/closeJob/:id', protect, isRecruiter, closeJob);
router.post('/openJob/:id', protect, isRecruiter, openJob);
// Fetch all internships for the logged-in recruiter
router.get('/myInternships', protect, isRecruiter, getRecruiterInternships);

// Candidates
router.get('/job/:jobId/candidates', protect, isRecruiter, seeCandidates);

export default router;