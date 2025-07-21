import express from 'express';
import multer from 'multer';
import { postProducts, getProducts, getAllcategories, getProductsByCategory, getProductsById, UploadImage, updateProduct, deletProductWithId } from '../controller/productController.js';
let router = express();
import userMidAuth from '../middleware/userAuth.js';

const uploads = multer({ dest: 'image-upload/' });

router.post('/',userMidAuth, postProducts);
router.get('/',userMidAuth, getProducts);
router.get("/categories",userMidAuth, getAllcategories);
router.get('/category/:category',userMidAuth, getProductsByCategory);
router.get('/:id',userMidAuth, getProductsById);
router.put('/:id',userMidAuth, updateProduct);
router.delete('/:id',userMidAuth, deletProductWithId);
router.post('/upload/image', uploads.single("image"), UploadImage);

export default router;