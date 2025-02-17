const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cartRouter = require("./src/routes/cartRouter");
const userRouter = require("./src/routes/userRouter");
const reviewRouter = require("./src/routes/reviewRouter");
const productRouter = require("./src/routes/productRouter");
const paymentStripeRouter = require("./src/routes/paymentStripeRouter");
const { globalError } = require("./src/controllers/globalErrorController");
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: "https://cliconapp.netlify.app",
    credentials: true,
  })
);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/payment", paymentStripeRouter);
app.use("/api/v1/product", productRouter);
// Handle error
app.use("*", globalError);
module.exports = app;
