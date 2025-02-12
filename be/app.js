const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/userRouter");
const productRouter = require("./src/routes/productRouter");
const orderRouter = require("./src/routes/orderRouter");
const { globalError } = require("./src/controllers/globalErrorController");
const app = express();
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_KEY);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.post("/api/v1/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.data.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            images: item.product.listImage,
          },
          unit_amount: item.product.sellingPrice * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    // success_url: `http://localhost:5173/checkout-success`,
    success_url: `${req.protocol}://${req.get("host")}/checkout-success`,
    cancel_url: "http://localhost:5173/cart",
  });
  res.status(200).json({
    status: "success",
    url: session.url,
  });
});
// Handle error
app.use("*", globalError);
module.exports = app;
