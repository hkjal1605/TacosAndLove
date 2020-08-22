const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
var ObjectID = require("bson-objectid");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A customer must have a name"],
  },
  email: {
    type: String,
    required: [true, "A customer must have an email"],
    unique: [true, "This email is already in use"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Customer must enter a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Customer must confirm the password"],
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
    default: "customer",
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    default: new ObjectID(),
  },
  orders: {
    type: mongoose.Schema.ObjectId,
    default: new ObjectID(),
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

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

customerSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

customerSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false,
    },
  });

  next();
});

customerSchema.methods.correctPassword = async function (
  candidatePAssword,
  userPassword
) {
  return await bcrypt.compare(candidatePAssword, userPassword);
};

customerSchema.methods.checkPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

customerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;
