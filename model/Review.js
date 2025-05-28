import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Review must belong to a product"]
    },
    message: {
        type: String,
        required: [true, "Please provide a review message"],
    },
    rating: {
        type: Number,
        required: [true, "Please provide a review rating"],
        min: 1,
        max: 5
    },
}, {
    timestamps: true
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
