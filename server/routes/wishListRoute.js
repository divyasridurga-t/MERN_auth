import express from 'express';
import { createWishList, deleteWishList, getWishList, updateWishList } from '../controller/wishlistController.js';
import userMidAuth from '../middleware/userAuth.js';

let router = express.Router();

router.post('/products', userMidAuth, createWishList);
router.get('/products', userMidAuth, getWishList);
router.put('/products/:id', userMidAuth, updateWishList);
router.delete('/products/:id', userMidAuth, deleteWishList)

export default router;