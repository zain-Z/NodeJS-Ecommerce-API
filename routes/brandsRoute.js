import express from 'express';
import { createBrandCtrl, getAllBrandsCtrl, getBrandCtrl, updateBrandCtrl, deleteBrandCtrl } from '../controllers/brandCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandsRouter = express.Router();

brandsRouter.route('/').post(isLoggedIn, isAdmin, createBrandCtrl).get(getAllBrandsCtrl);
brandsRouter.route('/:id').get(getBrandCtrl).put(isLoggedIn, isAdmin, updateBrandCtrl).delete(isLoggedIn, isAdmin, deleteBrandCtrl);

export default brandsRouter;
