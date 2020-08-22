const express = require("express");
const quesadillaController = require("../controllers/quesadillaController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(quesadillaController.getAllItems)
  .post(quesadillaController.createItem);

router
  .route("/:id")
  .get(quesadillaController.getItem)
  .patch(quesadillaController.updateItem)
  .delete(quesadillaController.deleteItem)
  .post(authController.protect, quesadillaController.orderItem);

router
  .route("/remove/:id")
  .get(authController.protect, quesadillaController.removeItem);

module.exports = router;
