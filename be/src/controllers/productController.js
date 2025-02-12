const Product = require("../models/productModel");
const AppError = require("../ultils/AppError");
const catchAsync = require("../ultils/catchAsync");
const FilterFeature = require("../ultils/FilterFeature");

const checkProductExistence = catchAsync(async (name, category) => {
  const product = await Product.findOne({ name, category });
  if (product) throw new AppError();
});

exports.addProduct = catchAsync(async (req, res) => {
  const { name, category, brand, price, sellingPrice, description, listImage } =
    req.body;
  const isExisted = await Product.findOne({ name, category });
  if (isExisted) throw new AppError(409, "Product is existed");
  const newProduct = await Product.create({
    name,
    category,
    brand,
    price,
    description,
    sellingPrice,
    listImage,
  });
  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});

exports.getAllProduct = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
});

exports.getDetailProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.getProductByCategory = catchAsync(async (req, res) => {
  const products = await Product.find({ category: req.params.typeProduct });
  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
});

exports.filterProduct = catchAsync(async (req, res) => {
  const feature = new FilterFeature(Product.find(), req.query)
    .filterByCategory()
    .filterByPriceRange()
    .filterByPrice()
    .pagination()
    .sortByPrice();
  const products = await feature.query;
  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
});

exports.editProduct = catchAsync(async (req, res) => {
  const { name, category, brand, price, sellingPrice, description, listImage } =
    req.body;
  const editedProduct = await Product.findByIdAndUpdate(req.params.idProduct, {
    name,
    description,
    brand,
    price,
    sellingPrice,
    category,
    listImage,
  });
  res.status(200).json({
    status: "success", 
    data: editedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.idProduct);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
