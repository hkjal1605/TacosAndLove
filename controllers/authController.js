const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const customer = await Customer.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  await Cart.create({
    _id: customer.cart,
    customer_id: customer._id,
    items: [],
    total: 0,
  });
  createSendToken(customer, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Please provide the email and password!", 400));
  }

  // Check if the user exists and the password is correct
  const customer = await Customer.findOne({
    email,
  }).select("+password");

  if (
    !customer ||
    !(await customer.correctPassword(password, customer.password))
  ) {
    return next(new AppError("Enter a valid email and password", 401));
  }

  // Send back the status
  createSendToken(customer, 200, res);
});

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "LoggedOut", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // Check if the token exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access", 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user credentials have not changed
  const freshUser = await Customer.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError("The user with the given token doesnot exist!", 401)
    );
  }

  // Check if the user has changed password after creating the token
  if (freshUser.checkPasswordAfter(decoded.iat)) {
    return next(
      new AppError("The user changed password! Please login again", 401)
    );
  }

  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have the permssions to perform this action!",
          403
        )
      );
    }

    next();
  };
};
