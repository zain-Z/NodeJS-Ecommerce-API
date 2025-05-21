import express from 'express';
import { createProductCtrl, getAllProductsCtrl, getSingleProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const productRoutes = express.Router();


productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getAllProductsCtrl);
productRoutes.get('/:id', getSingleProductCtrl);

export default productRoutes;
