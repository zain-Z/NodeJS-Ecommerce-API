import express from 'express';
import { createReviewCtrl, getReviewsForProductCtrl, deleteReviewCtrl, updateReviewCtrl } from '../controllers/reviewCtrl.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const reviewRoutes = express.Router();

reviewRoutes.post('/:productID', isLoggedIn, createReviewCtrl);
reviewRoutes.get('/:productID', getReviewsForProductCtrl);
reviewRoutes.delete('/:reviewID', isLoggedIn, deleteReviewCtrl);
reviewRoutes.put('/:reviewID', isLoggedIn, updateReviewCtrl);

export default reviewRoutes;