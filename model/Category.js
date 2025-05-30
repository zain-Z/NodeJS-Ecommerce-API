import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    image: {
        type: String,
        required: true,
        default: "https://picsum.photos/200/300" // Default image URL
    },
},
{
    timestamps: true
});


const Category = mongoose.model("Category", CategorySchema);

export default Category;
