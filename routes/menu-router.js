const express = require("express");

const menuController = require("../controllers/menu-controller");

const router = express.Router();

router
  .route("/")
  .get(menuController.getCompleteMenu)
  .post(menuController.addMenuCategory);

router
  .route("/:id")
  .get(menuController.getMenuCategory)
  .patch(menuController.updateMenuCategory)
  .delete(menuController.deleteMenuCategory);

module.exports = router;
