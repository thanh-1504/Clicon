const express = require("express");
const paymentStripeController = require("../controllers/paymentStripeController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.protect);
router.post(
  "/",
  authController.authority("user"),
  paymentStripeController.paymentWithStripe
);
module.exports = router;
