const express = require("express");
const desertsController = require("../controllers/desertsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(desertsController.getAllItems)
  .post(desertsController.createItem);

router
  .route("/:id")
  .get(desertsController.getItem)
  .patch(desertsController.updateItem)
  .delete(desertsController.deleteItem)
  .post(authController.protect, desertsController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, desertsController.removeItem);

module.exports = router;
