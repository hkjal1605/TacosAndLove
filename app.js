const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const enforce = require("express-sslify");

const globalErrorHandler = require("./controllers/errorController");

const restaurantRouter = require("./routes/restaurant-router");
const customerRouter = require("./routes/customer-router");
const menuRouter = require("./routes/menu-router");
const tacoRouter = require("./routes/tacoRouter");
const burritoRouter = require("./routes/burritoRouter");
const quesadillaRouter = require("./routes/quesadillaRouter");
const desertsRouter = require("./routes/desertsRouter");
const sidesRouter = require("./routes/sidesRouter");
const specialitiesRouter = require("./routes/specialitiesRouter");
const bookingRouter = require("./routes/bookingRouter");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "*"],
      scriptSrc: ["'self'", "https://js.stripe.com/v3/", "'unsafe-inline'"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "*",
        "'unsafe-inline'",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(cookieParser());

app.use(express.json());

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/service-worker.js"));
});

app.use("/api/v1/admin/restaurant", restaurantRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/tacos", tacoRouter);
app.use("/api/v1/burritos", burritoRouter);
app.use("/api/v1/sides", sidesRouter);
app.use("/api/v1/quesadilla", quesadillaRouter);
app.use("/api/v1/specialities", specialitiesRouter);
app.use("/api/v1/deserts", desertsRouter);
app.use("/api/v1/booking", bookingRouter);

// Serving static files
if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(globalErrorHandler);

module.exports = app;
