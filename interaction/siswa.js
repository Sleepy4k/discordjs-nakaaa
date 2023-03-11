const config = require("../config");

module.exports = {
  name: "siswa",
  data: config.interactions.siswa.data(),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    interaction.reply(config.interactions.siswa.message(client));
  },
};
