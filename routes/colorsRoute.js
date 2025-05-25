import express from 'express';
import {
    createColorCtrl, getAllColorsCtrl, getColorByIdCtrl, updateColorCtrl, deleteColorCtrl
} from '../controllers/colorCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const colorsRouter = express.Router();

colorsRouter.route('/').post(isLoggedIn, createColorCtrl).get(getAllColorsCtrl);
colorsRouter.route('/:id').get(getColorByIdCtrl).put(isLoggedIn, updateColorCtrl).delete(isLoggedIn, deleteColorCtrl);

export default colorsRouter;
