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

const { dataMap } = require("./handler.js");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) =>
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;
    const command = await dataMap.get(commandName);

    if (command) command.exec(client, interaction);
  });
