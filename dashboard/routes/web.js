/**
 * Module dependencies.
 */
import { Router } from "express";
import { version } from "discord.js";

/*
 * Initialize router.
 */
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200);
  res.render("pages/index", {
    discord: version,
    node: process.version,
    title: req.app.get("client").config.web.name,
    author: req.app.get("client").config.bot.author,
  });
});

/* GET docs page. */
router.get("/docs", function (req, res, next) {
  res.status(200);
  res.render("pages/docs", {
    title: req.app.get("client").config.web.name + " | Docs",
  });
});

/* GET discord page. */
router.get("/discord", function (req, res, next) {
  res.status(200);
  res.render("pages/discord", {
    title: req.app.get("client").config.web.name + " | Discord",
  });
});

export default router;

// Path: dashboard\routes\index.js
