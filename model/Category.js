import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
    Products: [
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


const Category = mongoose.model("Category", categorySchema);

export default Category;
