const Restaurant = require("../models/restaurantModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getRestaurantDetails = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.find();

  if (!restaurant) {
    return next(new AppError("The restaurant details couldnot be found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.updateDeliveryRadius = catchAsync(async (req, res, next) => {
  const doc = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("Document with given Id was not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      restaurant: doc,
    },
  });
});

exports.updateRestaurantTiming = catchAsync(async (req, res, next) => {
  const doc = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("Document with given Id was not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      restaurant: doc,
    },
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const doc = await Restaurant.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("Document with given Id was not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
