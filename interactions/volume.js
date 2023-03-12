const { usePlayer } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Changes the volume of the track and entire queue.",
  cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
  options: [
    {
      name: "volume",
      description: "The amount of volume you want to change to",
      type: 4,
      min_value: 0,
      max_value: 100,
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const volume = interaction.options.getInteger("volume");

    return interaction.reply(`Volume set to: ${volume}`);
  },
};
