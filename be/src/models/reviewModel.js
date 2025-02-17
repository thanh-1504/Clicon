const mongoose = require("mongoose");
const Product = require("./productModel");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        numberRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Product.findByIdAndUpdate(productId, {
    ratingAverage: stats[0].avgRating,
    ratingQuantity: stats[0].numberRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRating(this.review.product);
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
