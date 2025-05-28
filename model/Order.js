import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Generate a unique random order number
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 9000);


const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [{
    type: Object,
    required: true,
  }],
    shippingAddress: {
        type: Object,
        required: true,
    },
    orderNumber: {
        type: String,
        default: `ORD-${randomTxt}-${randomNumbers}`,
        unique: true
    },
    // for stripe payment
    paymentStatus: {
        type: String,
        default: "Not Paid",
    },
    paymentMethod: {
        type: String,
        default: "Not specified",
    },
    currency: {
        type: String,
        default: "Not specified",
    },
    // for admin
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    deliveredAt: {
        type: Date,
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export default Order; 