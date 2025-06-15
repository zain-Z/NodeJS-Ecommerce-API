import express from 'express';
import { createCategoryCtrl,
         getAllCategoriesCtrl, 
         getCategoryCtrl,
         updateCategoryCtrl,
         deleteCategoryCtrl } from '../controllers/categoryCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { categoryFileUpload } from '../config/categoryUpload.js';

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, categoryFileUpload.single('image'), createCategoryCtrl);
categoriesRouter.get('/', getAllCategoriesCtrl);
categoriesRouter.get('/:id', getCategoryCtrl);
categoriesRouter.put('/:id', isLoggedIn, categoryFileUpload.single('image'), updateCategoryCtrl);
categoriesRouter.delete('/:id', isLoggedIn, deleteCategoryCtrl);

export default categoriesRouter;
