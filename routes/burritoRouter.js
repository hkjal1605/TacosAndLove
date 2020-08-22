const express = require("express");
const burritoController = require("../controllers/burritoController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(burritoController.getAllItems)
  .post(burritoController.createItem);

router
  .route("/:id")
  .get(burritoController.getItem)
  .patch(burritoController.updateItem)
  .delete(burritoController.deleteItem)
  .post(authController.protect, burritoController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, burritoController.removeItem);

module.exports = router;
