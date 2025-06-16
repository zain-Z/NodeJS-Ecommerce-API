import express from 'express';
import {
    createColorCtrl, getAllColorsCtrl, getColorByIdCtrl, updateColorCtrl, deleteColorCtrl
} from '../controllers/colorCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorsRouter = express.Router();

colorsRouter.route('/').post(isLoggedIn, isAdmin, createColorCtrl).get(getAllColorsCtrl);
colorsRouter.route('/:id').get(getColorByIdCtrl).put(isLoggedIn, isAdmin, updateColorCtrl).delete(isLoggedIn, isAdmin, deleteColorCtrl);

export default colorsRouter;
