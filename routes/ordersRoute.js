import express from 'express';
import { createOrderCtrl } from '../controllers/orderCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const ordersRouter = express.Router();

ordersRouter.post('/', isLoggedIn, createOrderCtrl);

export default ordersRouter;
