import express from 'express';
import { postCartProducts, getCartProducts } from '../controller/cartController.js';
import userMidAuth from '../middleware/userAuth.js';

let router = express.Router();

router.post('/products', userMidAuth, postCartProducts);
router.get('/products', userMidAuth, getCartProducts);


export default router;