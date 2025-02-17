const catchAsync = require("../ultils/catchAsync");
const Cart = require("../models/cartModel");

exports.addToCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { product, quantity } = req.body;
  const isExisted = await Cart.findOne({ userId, product });
  if (!isExisted) {
    const cart = await Cart.create({ userId, product, quantity });
    res.status(201).json({
      status: "success",
      cart,
    });
  } else {
    const cart = await Cart.findByIdAndUpdate(
      isExisted._id,
      { quantity: isExisted.quantity + quantity },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      cart,
    });
  }
});

exports.updateCart = catchAsync(async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, {
    quantity: req.body.quantity,
  });
  res.status(200).json({
    status: "success",
    cart,
  });
});

exports.deleteProductInCart = catchAsync(async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "sucess",
    data: null,
  });
});

exports.deleteAllProductInCart = catchAsync(async (req, res) => {
  await Cart.deleteMany();
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.gelAllProductInCart = catchAsync(async (req, res) => {
  const cart = await Cart.find({ userId: req.user._id }).select("-userId -__v");
  res.status(200).json({
    status: "success",
    result: cart.length,
    cart,
  });
});
