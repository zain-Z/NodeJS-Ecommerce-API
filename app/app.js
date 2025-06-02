import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import usersRouter from '../routes/usersRoute.js';
import productsRouter from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRoute.js';
import brandsRouter from '../routes/brandsRoute.js';
import colorsRouter from '../routes/colorsRoute.js';
import reviewsRouter from '../routes/reviewsRoute.js';
import ordersRouter from '../routes/ordersRoute.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';

const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// db connection
dbConnect();
const app = express();

// Stripe webhook endpoint
app.post('/api/v1/payments/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    // update the order status in your database
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total / 100; // Convert cents to dollars
    const currency = session.currency;
    // find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(orderId, {
      paymentStatus,
      paymentMethod,
      totalAmount,
      currency
    }, { new: true });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent was successful!`);
      break;
    case 'payment_intent.payment_failed':
      const paymentError = event.data.object;
      console.log(`Payment failed: ${paymentError.last_payment_error.message}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// pass incoming requests to express
app.use(express.json());

// routes
app.use('/api/v1/users/', usersRouter);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorsRouter);
app.use('/api/v1/reviews/', reviewsRouter);
app.use('/api/v1/orders/', ordersRouter);


// err middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;