const express = require("express");
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(authController.loginEmployee);
router.route("/logout").get(authController.logout);

router.use(authController.protect);

router.route("/:id").get(employeeController.getEmployee);

router.use(authController.restrictTo("owner"));

router
  .route("/")
  .post(employeeController.createEmployee)
  .get(employeeController.getAllEmployees);
router
  .route("/:id")
  .patch(employeeController.updateEmployee)
  .delete(employeeController.removeEmployee);

module.exports = router;
