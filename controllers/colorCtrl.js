import Color from "../model/Color.js";
import asyncHandler from "express-async-handler";

// @desc Create new color
// @route POST /api/v1/colors
// @access Private/Admin
export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if color already exists
    const colorExists = await Color
        .findOne({ name })
        .populate("user", "name email");
    if (colorExists) {
        res.status(400);
        throw new Error("Color already exists");
    }

    // Create new color
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });


    res.status(201).json({
        status: "success",
        message: "Color created successfully",
        color,
    });
});


// @desc Get all colors
// @route GET /api/v1/colors
// @access Public
export const getAllColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find().populate("user", "name email");
    res.status(200).json({
        status: "success",
        results: colors.length,
        colors,
    });
});


// @desc Get single color
// @route GET /api/v1/colors/:id
// @access Public
export const getColorByIdCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id).populate("user", "name email");
    if (!color) {
        res.status(404);
        throw new Error("Color not found");
    }
    res.status(200).json({
        status: "success",
        color
    });
});


// @desc Update color
// @route PUT /api/v1/colors/:id
// @access Private/Admin
export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // Check if color exists
    const color = await Color.findByIdAndUpdate(req.params.id, { name: name.toLowerCase() }, { new: true });
    if (!color) {
        res.status(404);
        throw new Error("Color not found");
    }

    res.status(200).json({
        status: "success",
        message: "Color updated successfully",
        color,
    });
});


// @desc Delete color
// @route DELETE /api/v1/colors/:id
// @access Private/Admin
export const deleteColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
        res.status(404);
        throw new Error("Color not found");
    }
    res.status(200).json({
        status: "success",
        message: "Color deleted successfully",
    });
});