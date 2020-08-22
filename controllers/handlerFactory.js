const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError("A document with the given Id was not found", 404)
      );
    }

    res.status(204).json({
      status: "Success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError("A document with the given Id was not found", 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(200).json({
      status: "Success",
      data: {
        doc: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError("A document with the given Id was not found", 404)
      );
    }
    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: "succes",
      results: doc.length,
      data: {
        doc,
      },
    });
  });

exports.orderItem = (Model) =>
  catchAsync(async (req, res, next) => {
    const newItem = await Model.findById(req.params.id);

    if (!newItem) {
      return next(new AppError("Item with the given Id was not found!", 404));
    }

    const customerCart = await Cart.findById(req.user.cart);

    const total = customerCart.total;

    const itemArray = customerCart.items;

    let isItemPresent = false;

    itemArray.forEach((item) => {
      if (item._id.equals(newItem._id)) {
        item.quantity = item.quantity + 1;
        isItemPresent = true;
        return;
      }
    });

    if (!isItemPresent) {
      itemArray.push({
        _id: newItem._id,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
        category_name: newItem.category_name,
        quantity: 1,
      });
    }

    const cart = await Cart.findByIdAndUpdate(
      req.user.cart,
      {
        customer_id: req.user._id,
        items: itemArray,
        total: total + newItem.price,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  });

exports.removeItemFromCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const customerCart = await Cart.findById(req.user.cart);

    const newItem = await Model.findById(req.params.id);

    const total = customerCart.total;

    const itemArray = customerCart.items;

    itemArray.forEach((item, index) => {
      if (item._id.equals(req.params.id)) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
          itemArray.splice(index, 1);
        }
        return;
      }
    });

    const cart = await Cart.findByIdAndUpdate(
      req.user.cart,
      {
        items: itemArray,
        total: total - newItem.price,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  });
