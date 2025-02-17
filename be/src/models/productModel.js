const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Product name is required!",
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 100,
    },
    sellingPrice: {
      type: Number,
      default: 100,
    },
    description: {
      type: String,
      default: "",
    },
    ratingAverage: {
      type: Number,
      default: 3,
      set: (val) => {
        return Math.round(val * 10) / 10;
      },
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    listImage: [String],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
