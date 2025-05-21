import express from 'express';
import { createProductCtrl, deleteProductCtrl, getAllProductsCtrl, getSingleProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const productRoutes = express.Router();


productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getAllProductsCtrl);
productRoutes.get('/:id', getSingleProductCtrl);
productRoutes.put('/:id', isLoggedIn, updateProductCtrl);
productRoutes.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productRoutes;
