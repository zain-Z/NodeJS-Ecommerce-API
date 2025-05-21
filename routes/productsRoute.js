import express from 'express';
import { createProductCtrl, getAllProductsCtrl  } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const productRoutes = express.Router();


productRoutes.post('/', isLoggedIn, createProductCtrl);
productRoutes.get('/', getAllProductsCtrl);

export default productRoutes;
