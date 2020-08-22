const express = require("express");
const specialitiesController = require("../controllers/specialitiesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(specialitiesController.getAllItems)
  .post(specialitiesController.createItem);

router
  .route("/:id")
  .get(specialitiesController.getItem)
  .patch(specialitiesController.updateItem)
  .delete(specialitiesController.deleteItem)
  .post(authController.protect, specialitiesController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, specialitiesController.removeItem);

module.exports = router;
