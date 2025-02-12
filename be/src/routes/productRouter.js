const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/category/:typeProduct", productController.getProductByCategory);
router.get("/filter", productController.filterProduct);
router.get("/:id", productController.getDetailProduct);
router.get("/", productController.getAllProduct);
router.use(authController.protect);
router.post("/add-product", productController.addProduct);
router.post(
  "/edit-product/:idProduct",
  authController.authority("ADMIN"),
  productController.editProduct
);
router.post(
  "/delete-product/:idProduct",
  authController.authority("ADMIN"),
  productController.deleteProduct
);
module.exports = router;
