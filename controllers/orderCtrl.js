import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, currency } = req.body;

    const order = new Order({
        user: req.userAuthId,
        orderItems,
        shippingAddress,
        paymentMethod,
        currency
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});
