const express = require("express");
const authController = require("../controllers/authController");
const customerController = require("../controllers/customerController");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").get(authController.logout);

router
  .route("/cart")
  .get(authController.protect, customerController.getUserCart);

module.exports = router;
