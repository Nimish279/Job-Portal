import express from 'express';
import {createJob, deleteJob, getProfile, loginRecruiter,  myJobs, recruiterLogout, registerRecruiter,seeCandidates, updateJob, updateJobDocs} from '../controllers/recruiterController.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

router.post('/register', upload.none(), registerRecruiter); // WOrking
router.post('/login', loginRecruiter); // WOrking
router.post('/createJob',protect,
    isRecruiter,
    upload.array('files',5),
    createJob) // WOrking
router.get('/job/:jobId/candidates',protect,
    isRecruiter,
    seeCandidates) 
router.put('/updateJob/:id',protect,
    isRecruiter,
    updateJob) 
router.delete('/deleteJob/:id',protect,
    isRecruiter,
    deleteJob) // WOrking
router.put('/job/:id/uploadDocs',protect,isRecruiter,updateJobDocs)
router.get('/myJobs',protect,isRecruiter,myJobs) // WOrking
router.get('/getProfile',protect,isRecruiter,getProfile)// WOrking
router.post('/logout',protect,isRecruiter,recruiterLogout)
export default router;