import express from 'express';
import {createJob, deleteJob, loginRecruiter,  myJobs, recruiterLogout, registerRecruiter,seeCandidates, updateJob, updateJobDocs} from '../controllers/recruiterController.js';
import { isRecruiter, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

router.post('/register', upload.none(), registerRecruiter);
router.post('/login', loginRecruiter);
router.post('/createJob',protect,
    isRecruiter,
    upload.array('files',5),
    createJob)
router.get('/job/:jobId/candidates',protect,
    isRecruiter,
    seeCandidates)
router.put('/updateJob/:id',protect,
    isRecruiter,
    updateJob)
router.delete('/deleteJob/:id',protect,
    isRecruiter,
    deleteJob)
router.put('/job/:id/uploadDocs',protect,isRecruiter,updateJobDocs)
router.get('/myJobs',protect,isRecruiter,myJobs)
router.post('/logout',protect,isRecruiter,recruiterLogout)
export default router;