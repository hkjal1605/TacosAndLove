const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const quesadillaSchema = mongoose.Schema(defaultSchema);

const quesadillaModel = mongoose.model("Quesadilla", quesadillaSchema);

module.exports = quesadillaModel;
