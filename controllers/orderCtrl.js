import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrderCtrl = asyncHandler(async (req, res) => {

    // Get the payload(customer, order items, shipping address, payment method, currency)
    const { orderItems, shippingAddress, paymentMethod, currency } = req.body;
    if (!orderItems || !shippingAddress || !paymentMethod || !currency) {
        res.status(400);
        throw new Error('Missing required order information');
    }

    
    // find the user
    const user = await User.findById(req.userAuthId);
    if (!user) {
        res.status(401);
        throw new Error('Not authorized, no user found');
    }
    

    // Check if order items are an array and not empty
    if (!Array.isArray(req.body.orderItems) || req.body.orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items provided');
    }

    // Place / Create the order - Save to DB
    const order = new Order({
        user: req.userAuthId,
        orderItems,
        shippingAddress,
        paymentMethod,
        currency
    });

    const createdOrder = await order.save();
    if (!createdOrder) {
        res.status(500);
        throw new Error('Error creating order');
    }

    // Push order to user's orders array
    user.orders.push(createdOrder._id);
    await user.save();

    // Respond with the created order
    res.status(201).json(createdOrder);

    // Update product quantity and total sold
    const productIds = orderItems.map(item => item._id);
    const products = await Product.find({ _id: { $in: productIds } });
    await Promise.all(
    orderItems.map(async order => {
    const product = products.find(product =>
      product._id.toString() === order._id.toString()
    );

            if (product) {
                product.totalQty -= order.qty;
                product.totalSold += order.qty;
                await product.save();
            }
        })
    );

    // Make payment with Stripe
    // Payment webhook
    // Update the user order
    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
        user
    });
});
