const Taco = require("../models/tacoModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Taco);
exports.getItem = handlerFactory.getOne(Taco);
exports.createItem = handlerFactory.createOne(Taco);
exports.deleteItem = handlerFactory.deleteOne(Taco);
exports.updateItem = handlerFactory.updateOne(Taco);

exports.orderItem = handlerFactory.orderItem(Taco);
exports.removeItem = handlerFactory.removeItemFromCart(Taco);
