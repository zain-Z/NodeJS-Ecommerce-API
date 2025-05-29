import mongoose from "mongoose";
import User from "./User.js";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        ref: 'Category'
    },
    price:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    images:[
        {
            type: String,
            default: "https://via.placeholder.com/150"
        }
    ],
    sizes:{
        type: [String],
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    colors:{
        type: [String],
        required: true,
    },
    totalQty:{
        type: Number,
        required: true,
        default: 0
    },
    totalSold:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

// virtuals

// qty left
ProductSchema.virtual("qtyLeft").get(function () {
    const product = this;
    return product?.totalQty - product?.totalSold;
});

// Total ratings
ProductSchema.virtual("totalReviews").get(function () {
    const product = this;
    return product?.reviews?.length;
});

// Average rating
ProductSchema.virtual("averageRating").get(function () {
    const product = this;
    if (product?.reviews?.length === 0) return 0;

    let ratingsTotal = 0;
    
    product?.reviews?.forEach(review => {
        ratingsTotal += review?.rating;
    });

    const averageRating = ratingsTotal / product.reviews.length;
    return Number(averageRating).toFixed(1);
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;