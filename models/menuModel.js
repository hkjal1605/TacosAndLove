const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A menu must have a name"],
  },
  photo: {
    type: String,
    required: [true],
  },
  items: {
    type: Number,
    default: 0,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
