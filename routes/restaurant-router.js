const express = require("express");
const restaurantController = require("../controllers/restaurant-controller");

const router = express.Router();

router
  .route("/")
  .get(restaurantController.getRestaurantDetails)
  .delete(restaurantController.deleteRestaurant);

router.route("/:id/radius").patch(restaurantController.updateDeliveryRadius);
router.route("/:id/timing").patch(restaurantController.updateRestaurantTiming);

module.exports = router;
