import express from 'express';
import {loginRecruiter, registerRecruiter} from '../controllers/recruiterController.js';

const router = express.Router();

router.post('/register', registerRecruiter);
router.post('/login', loginRecruiter);

export default router;