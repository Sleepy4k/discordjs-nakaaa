/**
 * Module dependencies.
 */
import { Router } from "express";

/*
 * Initialize router.
 */
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200);
  res.render("pages/index");
});

/* GET docs page. */
router.get("/docs", function (req, res, next) {
  res.status(200);
  res.render("pages/docs", {
    title: req.app.get("client").config.web.name + " | Docs",
    frame: {
      url: "https://discord.js.org/#/docs/discord.js/14.7.1/general/welcome",
      border: "0",
    }
  });
});

/* GET discord page. */
router.get("/discord", function (req, res, next) {
  res.status(200);
  res.render("pages/discord", {
    title: req.app.get("client").config.web.name + " | Discord",
    frame: {
      url: "https://discordjs.guide/whats-new.html#site",
      border: "0",
    }
  });
});

export default router;

// Path: dashboard\routes\index.js
