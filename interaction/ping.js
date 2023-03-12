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

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Show your ping to the bot.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      const sent = await interaction.reply({
        fetchReply: true,
        ephemeral: true,
        content: "Pinging...",
      });

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Pong! 🏓")
        .setDescription(
          `Latency : ${Math.floor(
            sent.createdTimestamp - interaction.createdTimestamp
          )}ms\nAPI Latency : ${client.ws.ping}ms`
        )
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
