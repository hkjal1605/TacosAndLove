const express = require("express");
const bookingController = require("./../controllers/bookingController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:cartId", bookingController.getCheckoutSession);
router.get("/my-bookings", bookingController.getUserBookings);

router.use(authController.restrictTo("owner"));

router.get("/", bookingController.getAllBookings);

module.exports = router;
