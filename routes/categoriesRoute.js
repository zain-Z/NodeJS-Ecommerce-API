import express from 'express';
import { createCategoryCtrl,
         getAllCategoriesCtrl, 
         getCategoryCtrl,
         updateCategoryCtrl,
         deleteCategoryCtrl } from '../controllers/categoryCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryCtrl);
categoriesRouter.get('/', getAllCategoriesCtrl);
categoriesRouter.get('/:id', getCategoryCtrl);
categoriesRouter.put('/:id', isLoggedIn, updateCategoryCtrl);
categoriesRouter.delete('/:id', isLoggedIn, deleteCategoryCtrl);

export default categoriesRouter;
