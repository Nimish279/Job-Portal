import express from 'express';
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
  updateRecruiterProfile
} from '../controllers/recruiterController.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', upload.single("panCardOrGstFile"), registerRecruiter);
router.post('/login', loginRecruiter);
router.post('/postJob', protect, isRecruiter, postJob);
router.post('/postInternship', protect, isRecruiter, postInternship);
router.get('/job/:id/candidates', protect, isRecruiter, seeCandidates);
router.put('/updateJob/:id', protect, isRecruiter, updateJob);
router.delete('/deleteJob/:id', protect, isRecruiter, deleteJob);
router.get('/myJobs', protect, isRecruiter, myJobs);
router.get('/getProfile', protect, isRecruiter, getProfile);
router.post('/logout', protect, isRecruiter, recruiterLogout);
router.get('/me', protect, isRecruiter, getCurrentRecruiter);
router.put('/update', protect, isRecruiter, upload.single("companyPanCardOrGstFile"), updateRecruiterProfile);

export default router;