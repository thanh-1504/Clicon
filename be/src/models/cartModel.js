const mongoose = require("mongoose");
const cartModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
cartModel.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "-__v -description -price -brand",
  });
  next();
});
const Cart = mongoose.model("Cart", cartModel);
module.exports = Cart;
