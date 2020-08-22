const Sides = require("../models/sidesModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Sides);
exports.getItem = handlerFactory.getOne(Sides);
exports.createItem = handlerFactory.createOne(Sides);
exports.deleteItem = handlerFactory.deleteOne(Sides);
exports.updateItem = handlerFactory.updateOne(Sides);

exports.orderItem = handlerFactory.orderItem(Sides);
exports.removeItem = handlerFactory.removeItemFromCart(Sides);
