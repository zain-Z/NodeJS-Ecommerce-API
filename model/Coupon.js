import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.__v;
                return ret;
            },
        },
    }
);

// check if coupon is expired
CouponSchema.virtual("isExpired").get(function () {
    return this.endDate < Date.now();
});

// check how many days are left
CouponSchema.virtual("daysLeft").get(function () {
    const daysLeft = this.endDate - Date.now();
    return Math.ceil(daysLeft / (1000 * 60 * 60 * 24));
});

// validation
CouponSchema.pre('validate', function(next){
    if(this.endDate < this.startDate){
        next(new Error('End date can not be less than the start date'));
    }
    next();
});

CouponSchema.pre('validate', function(next){
    if(this.discount <= 0 || this.discount > 100){
        next(new Error('Discount can not be less than or equal 0 or greater than 100'));
    }
});

CouponSchema.pre('validate', function(next){
    if(this.startDate < Date.now())
    next(new Error('Start date can not be less than today'));
});

CouponSchema.pre('validate', function(next){
    if(this.endDate < Date.now())
    next(new Error('end date can not be less than today'));
});

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
