const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A cart must belong to a customer"],
  },
  items: [
    {
      _id: mongoose.Schema.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      category_name: String,
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
