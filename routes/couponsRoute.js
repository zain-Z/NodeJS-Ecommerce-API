import express from 'express';
import {createCouponCtrl, getAllCouponsCtrl, getCouponByIdCtrl, updateCouponCtrl, deleteCouponCtrl} from '../controllers/couponCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const couponsRouter = express.Router();

couponsRouter.post('/', isLoggedIn, createCouponCtrl);
couponsRouter.get('/', isLoggedIn, getAllCouponsCtrl);
couponsRouter.get('/:id', isLoggedIn, getCouponByIdCtrl);
couponsRouter.put('/:id', isLoggedIn, updateCouponCtrl);
couponsRouter.delete('/:id', isLoggedIn, deleteCouponCtrl);

export default couponsRouter;
