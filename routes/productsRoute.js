import express from 'express';
import { createProductCtrl, deleteProductCtrl, getAllProductsCtrl, getSingleProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const productsRouter = express.Router();


productsRouter.post('/', isLoggedIn, createProductCtrl);
productsRouter.get('/', getAllProductsCtrl);
productsRouter.get('/:id', getSingleProductCtrl);
productsRouter.put('/:id', isLoggedIn, updateProductCtrl);
productsRouter.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productsRouter;
