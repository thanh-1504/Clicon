const catchAsync = require("../ultils/catchAsync");
const Order = require("../models/orderModel");

exports.createOrder = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { product, quantity } = req.body;
  const isExisted = await Order.findOne({ userId, product });
  if (!isExisted) {
    const order = await Order.create({ userId, product, quantity });
    res.status(201).json({
      status: "success",
      order,
    });
  } else {
    const order = await Order.findByIdAndUpdate(
      isExisted._id,
      { quantity: isExisted.quantity + quantity },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      order,
    });
  }
});

exports.updateOrder = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    quantity: req.body.quantity,
  });
  res.status(200).json({
    status: "success",
    order,
  });
});

exports.deleteOrder = catchAsync(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "sucess",
    data: null,
  });
});

exports.deleteAllOrder = catchAsync(async (req, res) => {
  await Order.deleteMany();
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.getAllOrder = catchAsync(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).select(
    "-userId -__v"
  );
  res.status(200).json({
    status: "success",
    result: orders.length,
    orders,
  });
});
