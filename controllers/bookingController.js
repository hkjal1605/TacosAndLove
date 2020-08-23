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

  res.status(200).json({
    status: "success",
    session,
  });
});

const createBookingCheckout = async (session) => {
  await Cart.findByIdAndUpdate(req.params.cartId, {
    total: 0,
    items: [],
  });

  console.log(session);
  // const tour = session.client_reference_id;
  // const user = (await User.findOne({ email: session.customer_email })).id;
  // const price = session.display_items[0].amount / 100;

  // await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};
