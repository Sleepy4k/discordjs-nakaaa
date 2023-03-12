const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "say",
  description: "Say something.",
  cooldown: 1,
  options: [
    {
      name: "text",
      description: "Text to say.",
      type: 3,
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    interaction.reply({
      content: interaction.options.getString("text", true),
    });
  },
};
