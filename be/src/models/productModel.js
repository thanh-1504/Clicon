const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
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
  listImage: [String],
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
