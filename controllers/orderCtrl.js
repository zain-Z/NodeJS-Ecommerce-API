import User from '../model/User.js';
import Product from '../model/Product.js';
import Order from '../model/Order.js';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
    // get the coupon
    const { coupon } = req?.query;
    // If coupon is provided, apply discount logic here
    const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() })
    // if coupon is expired
    if (couponFound.isExpired) {
        res.status(400);
        throw new Error('Coupon is expired');
    }
    // if coupon is not found
    if (!couponFound) {
        res.status(400);
        throw new Error('Coupon not found');
    }
    // if coupon is found, check if the user has used it before
    const userHasUsedCoupon = user.usedCoupons.includes(couponFound._id);
    if (userHasUsedCoupon) {
        res.status(400);
        throw new Error('User has already used this coupon');
    }
    // If the coupon is valid, apply the discount to the order
    if (couponFound) {
        // Assuming you want to apply the discount to the order total
        // You can adjust this logic based on your requirements
        req.body.discount = couponFound.discount/ 100; // Convert percentage to decimal
    }
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
    
    // Check if the user has a valid address
    if (!user.hasShippingAddress) {
        res.status(400);
        throw new Error('Please add a shipping address');
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
        currency,
        totalPrice: couponFound ? totalPrice * (1 - couponFound.discount / 100) : totalPrice,
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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const createdOrderItems = orderItems.map(item => ({
        price_data: {
            currency: "usd", // Assuming USD, change as needed
            product_data: {
                name: item.name,
                description: item.description || 'No description provided',
            },
            unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: item.qty,
    }));
    const session = await stripe.checkout.sessions.create({
        line_items: createdOrderItems,
        metadata: {
            orderId: JSON.stringify(order._id),
        },
        mode: 'payment',
        success_url: 'https://localhost:7000/success',
        cancel_url: 'https://localhost:7000/cancel',
    });

    res.redirect(303, session.url);

    // Payment webhook
    // Update the user order
    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
        user
    });
});


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({ 
        orders, 
        success: true,
        msg: 'Orders retrieved successfully' });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderByIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    res.status(200).json({
        order,
        success: true,
        msg: 'Order retrieved successfully'
    });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
export const updateOrderStatusCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    res.status(200).json({
        order,
        success: true,
        msg: 'Order status updated successfully'
    });
});
