import express from 'express';
import { registerUser, loginUser, editProfile, seeJobs, userlogout } from '../controllers/userController.js';
import { isSeeker, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/editProfile',protect, editProfile);
router.get('/seeJobs',protect,isSeeker, seeJobs);
router.post('/logout',protect,isSeeker, userlogout);


export default router;