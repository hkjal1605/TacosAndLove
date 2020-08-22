const mongoose = require("mongoose");
const defaultSchema = require("./defaultItemSchema");

const specilaitiesSchema = mongoose.Schema(defaultSchema);

const specilaitiesModel = mongoose.model("Specialities", specilaitiesSchema);

module.exports = specilaitiesModel;
