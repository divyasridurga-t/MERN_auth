import express from 'express';
import multer from 'multer';
import { postProducts, getProducts, getAllcategories, getProductsByCategory, getProductsById, UploadImage } from '../controller/productController.js';
let router = express();

const uploads = multer({ dest: 'image-upload/' });

router.post('/', postProducts);
router.get('/', getProducts);
router.get("/categories", getAllcategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductsById);
router.post('/upload/image', uploads.single("image"), UploadImage);

export default router;