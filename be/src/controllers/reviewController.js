const Review = require("../models/reviewModel");
const catchAsync = require("../ultils/catchAsync");
exports.getAllReview = catchAsync(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    result: reviews.length,
    reviews,
  });
});
exports.createReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    review,
  });
});
exports.updateReview = catchAsync(async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: "success",
    updatedReview,
  });
});
exports.deleteReview = catchAsync(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
