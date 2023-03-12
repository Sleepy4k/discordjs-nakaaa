/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */

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
        type: ActivityType.WATCHING,
      });

    if (config.options.status.enable)
      client.user.setStatus(config.options.status.type);

    handler.loadInteraction(client);
  });
