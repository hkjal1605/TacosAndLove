const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const desertsSchema = mongoose.Schema(defaultSchema);

const desertsModel = mongoose.model("Deserts", desertsSchema);

module.exports = desertsModel;
