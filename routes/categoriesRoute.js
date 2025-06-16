import express from 'express';
import { createCategoryCtrl,
         getAllCategoriesCtrl, 
         getCategoryCtrl,
         updateCategoryCtrl,
         deleteCategoryCtrl } from '../controllers/categoryCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { categoryFileUpload } from '../config/categoryUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, isAdmin, categoryFileUpload.single('image'), createCategoryCtrl);
categoriesRouter.get('/', getAllCategoriesCtrl);
categoriesRouter.get('/:id', getCategoryCtrl);
categoriesRouter.put('/:id', isLoggedIn, isAdmin, categoryFileUpload.single('image'), updateCategoryCtrl);
categoriesRouter.delete('/:id', isLoggedIn, isAdmin, deleteCategoryCtrl);

export default categoriesRouter;
