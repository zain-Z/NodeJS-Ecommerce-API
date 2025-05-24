import express from 'express';
import { createBrandCtrl, getAllBrandsCtrl, getBrandCtrl, updateBrandCtrl, deleteBrandCtrl } from '../controllers/brandCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const brandRouter = express.Router();

brandRouter.route('/').post(isLoggedIn, createBrandCtrl).get(getAllBrandsCtrl);
brandRouter.route('/:id').get(getBrandCtrl).put(isLoggedIn, updateBrandCtrl).delete(isLoggedIn, deleteBrandCtrl);

export default brandRouter;
