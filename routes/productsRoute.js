import express from 'express';
import { createProductCtrl, getAllProductsCtrl, getSingleProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const productRoutes = express.Router();


productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getAllProductsCtrl);
productRoutes.get('/:id', getSingleProductCtrl);
productRoutes.put('/:id', isLoggedIn, updateProductCtrl);

export default productRoutes;
