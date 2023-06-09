/**
 * Module dependencies.
 */
import { Router } from "express";
import { version } from "discord.js";

/*
 * Initialize router.
 */
const router = Router();

/* Api Route. */
router.get("/", function (req, res, next) {
  res.status(200);
  res.render("pages/index", {
    discord: version,
    node: process.version,
    title: req.app.get("client").config.web.name,
    author: req.app.get("client").config.options.author,
  });
});

export default router;

// Path: dashboard\routes\index.js
