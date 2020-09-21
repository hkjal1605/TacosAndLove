const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Customer = require("../models/customerModel");
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

exports.getMe = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.updateCustomerPhoto = upload.single("photo");

exports.resizeCustomerPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `customer-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.filename}`);

  await fs.rename(
    `public/${req.file.filename}`,
    `client/public/img/user/${req.file.filename}`,
    function (err) {
      console.log(err);
    }
  );

  next();
});

const filterObject = (obj, ...fields) => {
  let newObj = {};

  Object.keys(obj).map((key) => {
    if (fields.includes(key)) newObj[key] = obj[key];
  });

  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for changing passwords!", 400));
  }

  const filteredBody = filterObject(req.body, "email", "name");

  if (req.file) filteredBody.photo = req.file.filename;

  const newUser = await Customer.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
