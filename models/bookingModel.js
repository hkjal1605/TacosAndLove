const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  items: [
    {
      _id: mongoose.Schema.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "A booking must have belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "A booking must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("customer");

  next();
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
