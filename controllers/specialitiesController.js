const Specialities = require("../models/specialitiesModel");
const handlerFactory = require("./handlerFactory");

exports.getAllItems = handlerFactory.getAll(Specialities);
exports.getItem = handlerFactory.getOne(Specialities);
exports.createItem = handlerFactory.createOne(Specialities);
exports.deleteItem = handlerFactory.deleteOne(Specialities);
exports.updateItem = handlerFactory.updateOne(Specialities);

exports.orderItem = handlerFactory.orderItem(Specialities);
exports.removeItem = handlerFactory.removeItemFromCart(Specialities);
