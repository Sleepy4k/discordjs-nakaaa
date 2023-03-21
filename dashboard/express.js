/**
 * Module dependencies.
 */
import logger from "morgan";
import express from "express";
import createError from "http-errors";
import cookieSession from "cookie-session";

/**
 * Import routes
 */
import routes from "./routes/index.js";

/**
 * Create express app
 */
const app = express();

/**
 * Setup logger and middlewares
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    secret: "secret",
    httpOnly: true,
  })
);

/**
 * Routes initialization
 */
app.use("/", routes);

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).send({
    status: "error",
    message: err.message,
    data: {},
  });
});

export default app;

// Path: dashboard\express.js
