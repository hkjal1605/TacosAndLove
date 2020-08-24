const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      image: [String],
      amount: Number,
      quantity: Number,
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "A booking must have belong to a user"],
  },
  amount: {
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
