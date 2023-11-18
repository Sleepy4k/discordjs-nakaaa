/**
 * Module dependencies.
 */
import logger from "morgan";
import express from "express";
import ejsMate from "ejs-mate";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { version } from "discord.js";
import createError from "http-errors";
import cookieSession from "cookie-session";

/**
 * Import routes
 */
import routes from "./routes/_index.js";

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
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use('/public', express.static(join(__dirname, "public")));

/**
 * Setup logger and middlewares
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  secret: "secret",
  httpOnly: true
}));

/**
 * Set locals
 */
app.use(function (req, res, next) {
  res.locals.data = {};
  res.locals.discord = version;
  res.locals.node = process.version;
  res.locals.title = req.app.get("client").config.web.name;
  res.locals.author = req.app.get("client").config.bot.author;
  res.locals.baseUrl = `${req.protocol}://${req.hostname}:${req.app.get("port")}`;
  next();
});

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
  res.render("pages/error");
});

export default app;

// Path: dashboard\express.js
