import express from 'express';
import {deleteJob, getProfile, loginRecruiter,  myJobs, postInternship, postJob, recruiterLogout, registerRecruiter,seeCandidates, updateJob} from '../controllers/recruiterController.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

router.post('/register', upload.none(), registerRecruiter); // WOrking
router.post('/login', loginRecruiter); // WOrking
router.post('/postJob',protect,
    isRecruiter,
    postJob) // WOrking
router.post('/postInternship', protect, isRecruiter, postInternship);
router.get('/job/:jobId/candidates',protect,
    isRecruiter,
    seeCandidates) 
router.put('/updateJob/:id',protect,
    isRecruiter,
    updateJob) 
router.delete('/deleteJob/:id',protect,
    isRecruiter,
    deleteJob) // WOrking
router.put('/job/:id/uploadDocs',protect,isRecruiter)
router.get('/myJobs',protect,isRecruiter,myJobs) // WOrking
router.get('/getProfile',protect,isRecruiter,getProfile)// WOrking
router.post('/logout',protect,isRecruiter,recruiterLogout)
export default router;