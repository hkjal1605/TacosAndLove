const Quesadilla = require("../models/quesadillaModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Quesadilla);
exports.getItem = handlerFactory.getOne(Quesadilla);
exports.createItem = handlerFactory.createOne(Quesadilla);
exports.deleteItem = handlerFactory.deleteOne(Quesadilla);
exports.updateItem = handlerFactory.updateOne(Quesadilla);

exports.orderItem = handlerFactory.orderItem(Quesadilla);
exports.removeItem = handlerFactory.removeItemFromCart(Quesadilla);
