const Burrito = require("../models/burritoModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Burrito);
exports.getItem = handlerFactory.getOne(Burrito);
exports.createItem = handlerFactory.createOne(Burrito);
exports.deleteItem = handlerFactory.deleteOne(Burrito);
exports.updateItem = handlerFactory.updateOne(Burrito);

exports.orderItem = handlerFactory.orderItem(Burrito);
exports.removeItem = handlerFactory.removeItemFromCart(Burrito);
