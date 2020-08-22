const mongoose = require("mongoose");

const defaultSchema = {
  category: {
    type: mongoose.Schema.ObjectId,
    required: [true, "An item must belong to a menu category"],
  },
  category_name: {
    type: String,
    required: [true, "An item must belong to a menu category"],
  },
  name: {
    type: String,
    required: [true, "An item must have a name"],
  },
  description: {
    type: String,
    required: [true, "An item must have a description"],
  },
  fill: {
    type: String,
    required: [true, "An item's fill must be defined"],
  },
  image: {
    type: String,
    default: "default_itm_img.jpg",
  },
  price: {
    type: Number,
    required: [true, "An item must have a price"],
  },
  quantity: {
    type: Number,
    required: [true, "An item must have a definite quantity"],
    select: false,
  },
};

module.exports = defaultSchema;
