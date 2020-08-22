const express = require("express");
const sidesController = require("../controllers/sidesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(sidesController.getAllItems)
  .post(sidesController.createItem);

router
  .route("/:id")
  .get(sidesController.getItem)
  .patch(sidesController.updateItem)
  .delete(sidesController.deleteItem)
  .post(authController.protect, sidesController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, sidesController.removeItem);

module.exports = router;
