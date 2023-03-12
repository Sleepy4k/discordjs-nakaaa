const config = require("../config");

module.exports = {
  name: "profile",
  data: config.interactions.profile.data(),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    await interaction.reply(config.interactions.profile.message(client));
  },
};
