import express from 'express';
import getUserDetails from '../controller/userController.js';
import userMidAuth from '../middleware/userAuth.js';

let router = express.Router();

router.get('/data', userMidAuth, getUserDetails);

export default router;