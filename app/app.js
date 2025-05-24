import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import productRoutes from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRoute.js';
import brandRouter from '../routes/brandsRoute.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';

// db connection
dbConnect();
const app = express();

// pass incoming requests to express
app.use(express.json());

// routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRoutes);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandRouter);

// err middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;