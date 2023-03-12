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

const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "cat",
  description: "Show random cat image.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      const response = await axios.get("https://some-random-api.ml/img/cat");
      const data = response.data;

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Cute Cat! 🐱")
        .setImage(data.link)
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
