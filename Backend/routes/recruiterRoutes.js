import express from 'express';
import {deleteJob, getCurrentRecruiter, getProfile, loginRecruiter,  myJobs, postInternship, postJob, recruiterLogout, registerRecruiter,seeCandidates, updateJob,closeJob,openJob} from '../controllers/recruiterController.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { getRecruiterJobs } from '../controllers/recruiterController.js';
import { getAllJobs } from "../controllers/recruiterController.js";

const router = express.Router();

router.post('/register',upload.single("panCardOrGstFile"), registerRecruiter); // WOrking //GST or PAN added (by-tushar)
router.post('/login', loginRecruiter); // WOrking
router.post('/postJob',protect,isRecruiter,postJob) // WOrking
router.post('/postInternship', protect, isRecruiter, postInternship);
router.get('/job/:jobId/candidates',protect,isRecruiter,seeCandidates) 
router.put('/updateJob/:id',protect,isRecruiter,updateJob) 
router.delete('/deleteJob/:id',protect,isRecruiter,deleteJob) // WOrking
router.put('/job/:id/uploadDocs',protect,isRecruiter)
router.get('/myJobs',protect,isRecruiter,myJobs) // WOrking
router.get('/getProfile',protect,isRecruiter,getProfile)// WOrking
router.post('/logout',protect,isRecruiter,recruiterLogout)
router.get('/me',protect,isRecruiter,getCurrentRecruiter)
router.post('/closeJob/:id',protect,isRecruiter,closeJob)
router.post('/openJob/:id',protect,isRecruiter,openJob)
// router.delete('/deleteJob/:id',protect,isRecruiter,deleteJob)
router.get('/myJobs', protect, isRecruiter, myJobs);
router.get('/getProfile', protect, isRecruiter, getProfile);
router.get("/myJobs", protect, getRecruiterJobs);
router.get("/jobs", getAllJobs);
export default router;