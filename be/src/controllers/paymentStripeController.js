const dotenv = require("dotenv");
const catchAsync = require("../ultils/catchAsync");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_KEY);
exports.paymentWithStripe = catchAsync(async (req, res) => {
  console.log(req.body);
  let stripeCheckoutData = null;
  if (Array.isArray(req.body.data)) {
    stripeCheckoutData = req.body.data.map((item) => {
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
    });
  } else {
    stripeCheckoutData = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.data.name,
            images: req.body.data.listImage,
          },
          unit_amount: req.body.data.sellingPrice * 100,
        },
        quantity: 1,
      },
    ];
  }
  const session = await stripe.checkout.sessions.create({
    line_items: stripeCheckoutData,
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/checkout-success`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
  });

  res.status(200).json({
    status: "success",
    url: session.url,
  });
});
