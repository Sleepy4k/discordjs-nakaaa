/**
 * Module dependencies.
 */
import logger from "morgan";
import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
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
 * Init dirname
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * View engine setup
 */
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "public")));

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

  res.status(err.status || 500);
  res.render("pages/error", {
    sub_title: "Error",
    title: req.app.get("client").config.options.name,
  });
});

export default app;

// Path: dashboard\express.js
