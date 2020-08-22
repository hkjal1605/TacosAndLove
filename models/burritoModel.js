const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const burritoSchema = mongoose.Schema(defaultSchema);

const burritoModel = mongoose.model("Burrito", burritoSchema);

module.exports = burritoModel;
