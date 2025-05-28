import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import usersRouter from '../routes/usersRoute.js';
import productsRouter from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRoute.js';
import brandsRouter from '../routes/brandsRoute.js';
import colorsRouter from '../routes/colorsRoute.js';
import reviewsRouter from '../routes/reviewsRoute.js';
import ordersRouter from '../routes/ordersRoute.js';

import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';

// db connection
dbConnect();
const app = express();

// pass incoming requests to express
app.use(express.json());

// routes
app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorsRouter);
app.use('/api/v1/reviews/', reviewsRouter);
app.use('/api/v1/orders/', ordersRouter);

// err middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;