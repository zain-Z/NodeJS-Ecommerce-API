import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRouter = express.Router();

ordersRouter.post('/', isLoggedIn, createOrderCtrl);
ordersRouter.get('/', isLoggedIn, getAllOrdersCtrl);

export default ordersRouter;
