const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");

exports.getUserCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart);

  if (!cart) {
    return next(new AppError("No cart found for the user!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
