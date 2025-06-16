import express from 'express';
import {createCouponCtrl, getAllCouponsCtrl, getCouponByIdCtrl, updateCouponCtrl, deleteCouponCtrl} from '../controllers/couponCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const couponsRouter = express.Router();

couponsRouter.post('/', isLoggedIn, isAdmin, createCouponCtrl);
couponsRouter.get('/', isLoggedIn, getAllCouponsCtrl);
couponsRouter.get('/:id', isLoggedIn, getCouponByIdCtrl);
couponsRouter.put('/:id', isLoggedIn, isAdmin, updateCouponCtrl);
couponsRouter.delete('/:id', isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponsRouter;
