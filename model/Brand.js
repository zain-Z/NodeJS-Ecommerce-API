import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
}, {
    timestamps: true
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;
