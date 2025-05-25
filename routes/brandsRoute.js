import express from 'express';
import { createBrandCtrl, getAllBrandsCtrl, getBrandCtrl, updateBrandCtrl, deleteBrandCtrl } from '../controllers/brandCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const brandsRouter = express.Router();

brandsRouter.route('/').post(isLoggedIn, createBrandCtrl).get(getAllBrandsCtrl);
brandsRouter.route('/:id').get(getBrandCtrl).put(isLoggedIn, updateBrandCtrl).delete(isLoggedIn, deleteBrandCtrl);

export default brandsRouter;
