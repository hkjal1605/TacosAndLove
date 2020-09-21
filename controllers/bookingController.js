const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cartModel");
const Booking = require("../models/bookingModel");
const handlerFactory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartId);

  const array = [];
  let tempObject = {};

  cart.items.map((item) => {
    tempObject.name = item.name;
    tempObject.images = [
      `https://tacosandlove.herokuapp.com/img/${item.image}`,
    ];
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
  console.log("reached here");
  const cart = await Cart.findByIdAndUpdate(
    session.client_reference_id,
    {
      total: 0,
      items: [],
    },
    {
      new: true,
      runValidators: true,
    }
  );

  let tempObject = {};

  const itemArray = [];

  session.display_items.map((item) => {
    tempObject.name = item.custom.name;
    tempObject.image = item.custom.images[0];
    tempObject.amount = item.amount / 100;
    tempObject.quantity = item.quantity;

    itemArray.push(tempObject);
    tempObject = {};
  });

  await Booking.create({
    items: itemArray,
    customer: cart.customer_id,
    amount: session.amount_total / 100,
  });
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
    return res.status(400).send(`Webkook Error: ${err.message}`);
  }

  console.log(event.type);

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ customer: req.user.id });

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

exports.getAllBookings = handlerFactory.getAll(Booking);
