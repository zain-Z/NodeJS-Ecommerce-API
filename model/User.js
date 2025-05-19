import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  wishLists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WishList',
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  hasShippingAddress: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String},
    city: {type: String},
    province: {type: String},
    postalCode: {type: String},
    country: {type: String},
    phone: {type: String},
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
