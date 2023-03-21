/**
 * Module dependencies.
 */
import { Router } from "express";
import parseDur from "../../utils/parseDur.js";

/*
 * Initialize router.
 */
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: "Welcome to the API",
  });
});

/* GET guild page. */
router.get("/guilds", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.guilds.cache.size} guilds!`,
    data: client.guilds.cache.map((guild) => guild.name),
  });
});

/* GET user page. */
router.get("/users", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.users.cache.size} users!`,
    data: client.users.cache.map((user) => user.username),
  });
});

/* GET channel page. */
router.get("/channels", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.channels.cache.size} channels!`,
    data: client.channels.cache.map((channel) => channel.name),
  });
});

/* GET ping page. */
router.get("/ping", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Pong! ${client.ws.ping}ms`,
  });
});

/* GET uptime page. */
router.get("/uptime", function (req, res, next) {
  const client = req.app.get("client");
  const uptime = parseDur(client.uptime);

  res.status(200).send({
    status: "success",
    message: `Uptime: ${uptime}`,
  });
});

/* GET invite page. */
router.get("/invite", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Invite me to your server!`,
    data: {
      invite: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`,
    },
  });
});

export default router;

// Path: dashboard\routes\index.js
