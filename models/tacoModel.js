const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const tacoSchema = mongoose.Schema(defaultSchema);

const tacoModel = mongoose.model("Taco", tacoSchema);

module.exports = tacoModel;
