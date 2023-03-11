const config = require("../config");

module.exports = {
  name: "siswa2",
  data: config.interactions.siswa2.data(),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    interaction.reply(config.interactions.siswa2.message(client));
  },
};
