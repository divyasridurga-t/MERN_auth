import express from 'express';
import { postCartProducts, getCartProducts, updateCartProducts, deleteCartProducts } from '../controller/cartController.js';
import userMidAuth from '../middleware/userAuth.js';

let router = express.Router();

router.post('/products', userMidAuth, postCartProducts);
router.get('/products', userMidAuth, getCartProducts);
router.put('/products/:id', userMidAuth, updateCartProducts);
router.delete('/products/:id', userMidAuth, deleteCartProducts)


export default router;