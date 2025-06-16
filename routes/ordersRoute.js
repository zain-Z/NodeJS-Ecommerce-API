import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getOrderByIdCtrl, updateOrderStatusCtrl, deleteOrderCtrl, getSalesSummaryCtrl, getTodaysSalesSummaryCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const ordersRouter = express.Router();

ordersRouter.post('/', isLoggedIn, isAdmin, createOrderCtrl);
ordersRouter.get('/', isLoggedIn, getAllOrdersCtrl);
ordersRouter.get('/:id', isLoggedIn, getOrderByIdCtrl);
ordersRouter.put('/:id/status', isLoggedIn, updateOrderStatusCtrl);
ordersRouter.delete('/:id', isLoggedIn, isAdmin, deleteOrderCtrl);
ordersRouter.get('/sales/summary', isLoggedIn, isAdmin, getSalesSummaryCtrl);
ordersRouter.get('/sales/summary/today', isLoggedIn, isAdmin, getTodaysSalesSummaryCtrl);

export default ordersRouter;
