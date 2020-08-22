const Deserts = require("../models/desertsModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Deserts);
exports.getItem = handlerFactory.getOne(Deserts);
exports.createItem = handlerFactory.createOne(Deserts);
exports.deleteItem = handlerFactory.deleteOne(Deserts);
exports.updateItem = handlerFactory.updateOne(Deserts);

exports.orderItem = handlerFactory.orderItem(Deserts);
exports.removeItem = handlerFactory.removeItemFromCart(Deserts);
