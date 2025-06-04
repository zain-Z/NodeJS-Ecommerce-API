import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getOrderByIdCtrl, updateOrderStatusCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRouter = express.Router();

ordersRouter.post('/', isLoggedIn, createOrderCtrl);
ordersRouter.get('/', isLoggedIn, getAllOrdersCtrl);
ordersRouter.get('/:id', isLoggedIn, getOrderByIdCtrl);
ordersRouter.put('/:id/status', isLoggedIn, updateOrderStatusCtrl);

export default ordersRouter;
