import express from 'express';
import { createProductCtrl, deleteProductCtrl, getAllProductsCtrl, getSingleProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';
import { upload } from '../config/fileUpload.js';
upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]);
const productsRouter = express.Router();


productsRouter.post('/', isLoggedIn, isAdmin, upload.single('image'), createProductCtrl);
productsRouter.get('/', getAllProductsCtrl);
productsRouter.get('/:id', getSingleProductCtrl);
productsRouter.put('/:id', isLoggedIn, isAdmin, upload.single('image'), updateProductCtrl);
productsRouter.delete('/:id/delete', isLoggedIn, isAdmin, deleteProductCtrl);

export default productsRouter;
