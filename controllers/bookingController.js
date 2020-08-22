const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cartModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartId);

  const array = [];
  let tempObject = {};

  cart.items.map((item) => {
    tempObject.name = item.name;
    tempObject.amount = item.price * 100;
    tempObject.currency = "inr";
    tempObject.quantity = item.quantity;

    array.push(tempObject);
    tempObject = {};
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    line_items: array,
  });

  await Cart.findByIdAndUpdate(req.params.cartId, {
    total: 0,
    items: [],
  });

  res.status(200).json({
    status: "success",
    session,
  });
});
