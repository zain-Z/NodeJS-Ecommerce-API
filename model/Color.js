import mongoose from 'mongoose';
const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true,
    toJSON: { virtuals: true },
});

const Color = mongoose.model('Color', colorSchema);
export default Color;
