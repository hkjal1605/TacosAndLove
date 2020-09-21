const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A employee must have a name"],
  },
  email: {
    type: String,
    required: [true, "A employee must have an email"],
    unique: [true, "This email is already in use"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  employeeId: {
    type: String,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "employee must enter a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "employee must confirm the password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
    select: false,
  },
  role: {
    type: String,
    required: [true, "An employee must have a role"],
    enum: ["owner", "chef", "head-chef", "waiter", "cleaner"],
  },
  salary: {
    type: Number,
    required: [true, "An employee must have a salary"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

employeeSchema.pre("save", function (next) {
  this.employeeId = `${this.role}--${this.name}`;

  next();
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

employeeSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

employeeSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false,
    },
  });

  next();
});

employeeSchema.methods.correctPassword = async function (
  candidatePAssword,
  userPassword
) {
  return await bcrypt.compare(candidatePAssword, userPassword);
};

employeeSchema.methods.checkPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

employeeSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
