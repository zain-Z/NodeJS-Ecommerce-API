import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        res.status(400);
        throw new Error("Category already exists");
    }

    // Create new category
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
        image: {
            public_id: req.file.filename,
            url: req.file.path,
        },
    });

    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        category,
    });
});

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        results: categories.length,
        msg: "Categories retrieved successfully",
        categories,
    });
});

// @desc    Get a single category
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json({
        status: "success",
        msg: "Category retrieved successfully",
        category
    });
});

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if category exists
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({
        status: "success",
        msg: "Category updated successfully",
        category
    });
});

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({
        status: "success",
        msg: "Category deleted successfully",
    });
});
