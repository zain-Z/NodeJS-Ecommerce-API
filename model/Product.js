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

const Product = mongoose.model("Product", ProductSchema);
export default Product;