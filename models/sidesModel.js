const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const sidesSchema = mongoose.Schema(defaultSchema);

const sidesModel = mongoose.model("Sides", sidesSchema);

module.exports = sidesModel;
