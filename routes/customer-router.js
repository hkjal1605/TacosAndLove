const express = require("express");
const authController = require("../controllers/authController");
const customerController = require("../controllers/customerController");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").get(authController.logout);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.use(authController.protect);

router.route("/cart").get(customerController.getUserCart);

router.route("/me").get(customerController.getMe);
router
  .route("/updateMe")
  .patch(
    customerController.updateCustomerPhoto,
    customerController.resizeCustomerPhoto,
    customerController.updateMe
  );

module.exports = router;
