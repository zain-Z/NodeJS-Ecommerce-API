import Review from "../model/Review.js";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler"; 

// @desc    Create a new review
// @route   POST /api/v1/reviews
// @access  Private/Admin
export const createReviewCtrl = asyncHandler(async (req, res) => {

    const { product, message, rating } = req.body; 
    const { productID } = req.params;
    const productFound = await Product.findById(productID);

    if (!productFound) {
        res.status(404);
        throw new Error("Product not found");
    }

    // if user already reviewed this product
    const existingReview = await Review.findOne({
        user: req.userAuthId,
        product: productID
    });
    if (existingReview) {
        res.status(400);
        throw new Error("You have already reviewed this product");
    }

    if (!message || !rating) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Create the review
    const review = await Review.create({
        user: req.userAuthId,
        product: productFound._id,
        message,
        rating
    });

    // push the review to the product's reviews array
    productFound.reviews.push(review._id);
    // resave the product with the new review
    await productFound.save();

    res.status(201).json({
        success: true,
        data: review,
        message: "Review created successfully"
    });
});

// @desc    Get all reviews for a product
// @route   GET /api/v1/reviews/:productID
// @access  Public
export const getReviewsForProductCtrl = asyncHandler(async (req, res) => {
    const { productID } = req.params;

    const product = await Product.findById(productID).populate("reviews");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json({
        success: true,
        data: product.reviews
    });
});

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:reviewID
// @access  Private
export const deleteReviewCtrl = asyncHandler(async (req, res) => {
    const { reviewID } = req.params;

    const review = await Review.findByIdAndDelete(reviewID);

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.userAuthId) {
        res.status(403);
        throw new Error("You are not authorized to delete this review");
    }

    await review.remove();

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});

// @desc    Update a review
// @route   PUT /api/v1/reviews/:reviewID
// @access  Private
export const updateReviewCtrl = asyncHandler(async (req, res) => {
    const { reviewID } = req.params;
    const { message, rating } = req.body;

    const review = await Review.findByIdAndUpdate(
        reviewID,
        { message, rating },
        { new: true }
    );

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    res.status(200).json({
        success: true,
        data: review
    });
});