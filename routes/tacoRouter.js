const express = require("express");
const tacoController = require("../controllers/tacoController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(tacoController.getAllItems)
  .post(tacoController.createItem);

router
  .route("/:id")
  .get(tacoController.getItem)
  .patch(tacoController.updateItem)
  .delete(tacoController.deleteItem)
  .post(authController.protect, tacoController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, tacoController.removeItem);

module.exports = router;
