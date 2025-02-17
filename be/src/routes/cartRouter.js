const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.protect);
router.post(
  "/add-cart",
  authController.authority("user"),
  cartController.addToCart
);
router.post(
  "/update-cart/:id",
  authController.authority("user"),
  cartController.updateCart
);
router.post(
  "/delete-cart/:id",
  authController.authority("user"),
  cartController.deleteProductInCart
);
router.post("/delete-cart", cartController.deleteAllProductInCart);
router.get(
  "/",
  authController.authority("user"),
  cartController.gelAllProductInCart
);
module.exports = router;
