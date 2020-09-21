const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const Employee = require("../models/employeeModel");
const Email = require("../utils/email");

exports.createEmployee = handlerFactory.createOne(Employee);
exports.getAllEmployees = handlerFactory.getAll(Employee);
exports.getEmployee = handlerFactory.getOne(Employee);

const filterObject = (obj, ...fields) => {
  let newObj = {};

  Object.keys(obj).map((key) => {
    if (fields.includes(key)) newObj[key] = obj[key];
  });

  return newObj;
};

exports.updateEmployee = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for changing passwords!", 400));
  }

  const filteredBody = filterObject(req.body, "email", "name");

  if (req.file) filteredBody.photo = req.file.filename;

  const employee = await Employee.findById(req.params.id);

  Object.keys(filteredBody).map((key) => {
    employee[key] = filteredBody[key];
  });

  await employee.save();

  res.status(200).send({
    status: "success",
    message: "Employee details successfully updated",
  });
});

exports.removeEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new AppError("No employee record found for the given ID!", 404)
    );
  }

  const doc = await Employee.findByIdAndDelete(req.params.id);

  new Email(employee).sendRemovalLetter;

  res.status(204).json({
    status: "success",
  });
});
