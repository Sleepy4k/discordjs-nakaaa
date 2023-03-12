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
