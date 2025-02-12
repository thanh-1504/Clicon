const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.protect);
router.post(
  "/create-order",
  authController.authority("user"),
  orderController.createOrder
);
router.post(
  "/update-order/:id",
  authController.authority("user"),
  orderController.updateOrder
);
router.post(
  "/delete-order/:id",
  authController.authority("user"),
  orderController.deleteOrder
);
router.post("/delete-allOrder", orderController.deleteAllOrder);
router.get("/", authController.authority("user"), orderController.getAllOrder);
module.exports = router;
