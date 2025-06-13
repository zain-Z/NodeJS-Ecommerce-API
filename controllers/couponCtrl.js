import Coupon from "../model/Coupon.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin
export const createCouponCtrl = asyncHandler(async (req, res) => {
    // Check if the user is an admin
    const { user } = req;
    if (!user || user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized");
    }

    // check if coupon is already exists
    const { code, startDate, endDate, discount } = req.body;

    // check if discount is a valid number
    if (isNaN(discount) || discount <= 0) {
        res.status(400);
        throw new Error("Invalid discount");
    }

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
        res.status(400);
        throw new Error("Coupon already exists");
    }

    const coupon = new Coupon({
        code,
        startDate,
        endDate,
        discount,
        user: req.userAuthId
    });

    const createdCoupon = await coupon.save();

  res.status(201).json(createdCoupon);
});

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin
export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json(coupons);
});


// @desc    Get coupon by ID
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin
export const getCouponByIdCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(200).json(coupon);
});

// @desc    Update coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin
export const updateCouponCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, discount, expiryDate } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(id, {
    name,
    discount,
    expiryDate,
  }, { new: true });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  res.status(200).json(coupon);
});


// @desc    Delete coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin
export const deleteCouponCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(204).json();
});
