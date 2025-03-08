const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const express = require("express");
const cookieParser = require("cookie-parser");
const sanitizeHtml = require("sanitize-html");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cartRouter = require("./src/routes/cartRouter");
const userRouter = require("./src/routes/userRouter");
const reviewRouter = require("./src/routes/reviewRouter");
const productRouter = require("./src/routes/productRouter");
const paymentStripeRouter = require("./src/routes/paymentStripeRouter");
const { globalError } = require("./src/controllers/globalErrorController");
const app = express();
app.use(helmet());
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this ip, please try again in an hour!",
});
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(mongoSanitize());
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    }
  }
  next();
});
app.use(hpp());
// app.use("/api", limiter);
app.use(
  cors({
    // origin: ,
    origin: ["https://cliconapp.netlify.app", "https://clicon-abfr.onrender.com"],
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
