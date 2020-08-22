const Menu = require("../models/menuModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getCompleteMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.find();

  if (!menu) {
    return next(new AppError("The menu is empty!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      menu,
    },
  });
});

exports.getMenuCategory = catchAsync(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(
      new AppError("The menu category with the given Id doesnot exists!", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      menu,
    },
  });
});

exports.addMenuCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Menu.create(req.body);

  res.status(200).json({
    status: "success",
    data: { newCategory },
  });
});

exports.deleteMenuCategory = catchAsync(async (req, res, next) => {
  await Menu.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateMenuCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Menu.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCategory) {
    return next(new AppError("Document with the given id was not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedCategory,
    },
  });
});
