const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
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
  // price: {
  //   type: Number,
  //   required: [true, "Order must have a price"],
  // },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "-__v -description -price -brand",
  });
  next();
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
