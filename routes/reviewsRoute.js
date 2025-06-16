import express from 'express';
import { createReviewCtrl, getReviewsForProductCtrl, deleteReviewCtrl, updateReviewCtrl } from '../controllers/reviewCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const reviewRoutes = express.Router();

reviewRoutes.post('/:productID', isLoggedIn, createReviewCtrl);
reviewRoutes.get('/:productID', getReviewsForProductCtrl);
reviewRoutes.delete('/:reviewID', isLoggedIn, isAdmin, deleteReviewCtrl);
reviewRoutes.put('/:reviewID', isLoggedIn, isAdmin, updateReviewCtrl);

export default reviewRoutes;