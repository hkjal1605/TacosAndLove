const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

const Restaurant = require("../models/restaurantModel");
const Customers = require("../models/customerModel");
const Menu = require("../models/menuModel");
const Burrito = require("../models/burritoModel");
const Deserts = require("../models/desertsModel");
const Quesadilla = require("../models/quesadillaModel");
const Taco = require("../models/tacoModel");
const Sides = require("../models/sidesModel");
const Specialities = require("../models/specialitiesModel");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  });

const restaurant = JSON.parse(
  fs.readFileSync(`${__dirname}/data/restraunt.json`, "utf-8")
);
const menu = JSON.parse(
  fs.readFileSync(`${__dirname}/data/menu.json`, "utf-8")
);
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/customers.json`, "utf-8")
);
const burrito = JSON.parse(
  fs.readFileSync(`${__dirname}/data/burrito.json`, "utf-8")
);
const deserts = JSON.parse(
  fs.readFileSync(`${__dirname}/data/deserts.json`, "utf-8")
);
const quesadilla = JSON.parse(
  fs.readFileSync(`${__dirname}/data/quesadilla.json`, "utf-8")
);
const sides = JSON.parse(
  fs.readFileSync(`${__dirname}/data/sides.json`, "utf-8")
);
const specialities = JSON.parse(
  fs.readFileSync(`${__dirname}/data/specialities.json`, "utf-8")
);
const tacos = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tacos.json`, "utf-8")
);

const importData = async () => {
  try {
    await Restaurant.create(restaurant);
    await Menu.create(menu);
    await Customers.create(customers, {
      validateBeforeSave: false,
    });
    await Quesadilla.create(quesadilla);
    await Taco.create(tacos);
    await Sides.create(sides);
    await Specialities.create(specialities);
    await Deserts.create(deserts);
    await Burrito.create(burrito);

    console.log("Data loaded Succesfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Restaurant.deleteMany();
    await Menu.deleteMany();
    await Customers.deleteMany();
    await Taco.deleteMany();
    await Quesadilla.deleteMany();
    await Burrito.deleteMany();
    await Specialities.deleteMany();
    await Sides.deleteMany();
    await Deserts.deleteMany();

    console.log("Data deleted Succesfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
