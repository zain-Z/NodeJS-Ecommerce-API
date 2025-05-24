import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";

// @desc Create new brand
// @route POST /api/v1/brands
// @access Private/Admin
export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if brand already exists
    const brandExists = await Brand
        .findOne({ name })
        .populate("user", "name email");
    if (brandExists) {
        res.status(400);
        throw new Error("Brand already exists");
    }

    // Create new brand
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });


    res.status(201).json({
        status: "success",
        message: "Brand created successfully",
        brand,
    });
});


// @desc Get all brands
// @route GET /api/v1/brands
// @access Public
export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find().populate("user", "name email");
    res.status(200).json({
        status: "success",
        results: brands.length,
        brands,
    });
});


// @desc Get single brand
// @route GET /api/v1/brands/:id
// @access Public
export const getBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id).populate("user", "name email");
    if (!brand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.status(200).json({
        status: "success",
        brand
    });
});


// @desc Update brand
// @route PUT /api/v1/brands/:id
// @access Private/Admin
export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if brand exists
    const brand = await Brand.findByIdAndUpdate(req.params.id, { name: name.toLowerCase() }, { new: true });
    if (!brand) {
        res.status(404);
        throw new Error("Brand not found");
    }

    res.status(200).json({
        status: "success",
        message: "Brand updated successfully",
        brand,
    });
});


// @desc Delete brand
// @route DELETE /api/v1/brands/:id
// @access Private/Admin
export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.status(200).json({
        status: "success",
        message: "Brand deleted successfully",
    });
});