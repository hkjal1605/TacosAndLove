const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Dominos",
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
  },
  type: [String],
  delivery_radius: {
    type: Number,
    default: 25,
  },
  avg_delivery_time: Number,
  logo: String,
  opening_time: Number,
  closing_time: Number,
});

restaurantSchema.index({
  location: "2dsphere",
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
