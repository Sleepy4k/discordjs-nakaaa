const config = require("../config");
const handler = require("./handler.js");
const { ActivityType } = require("discord.js");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) =>
  client.on("ready", () => {
    console.log("I'm on you sir!");

    if (config.options.activity.enable)
      client.user.setActivity(config.options.activity.description, {
        type: ActivityType.LISTENING,
      });

    if (config.options.status.enable)
      client.user.setStatus(config.options.status.type);

    handler.loadInteraction(client);
  });
