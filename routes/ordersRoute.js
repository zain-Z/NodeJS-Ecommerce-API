import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getOrderByIdCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRouter = express.Router();

ordersRouter.post('/', isLoggedIn, createOrderCtrl);
ordersRouter.get('/', isLoggedIn, getAllOrdersCtrl);
ordersRouter.get('/:id', isLoggedIn, getOrderByIdCtrl);

export default ordersRouter;
