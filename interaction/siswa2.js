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
  name: "siswa2",
  description: "List of XII RPL 1 Students.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("XII RPL 1 Students")
        .setDescription("List of XII RPL 1 Students")
        .addFields(
          {
            name: "Apri Pandu W",
            value: "Absen 26",
            inline: false,
          },
          {
            name: "Ardia Alif R",
            value: "Absen 27",
            inline: true,
          },
          {
            name: "Ardzaricho Revansyah",
            value: "Absen 28",
            inline: true,
          },
          {
            name: "Ariella Lintang A",
            value: "Absen 29",
            inline: true,
          },
          {
            name: "Arif Dermawan",
            value: "Absen 30",
            inline: true,
          },
          {
            name: "Arina Intan R",
            value: "Absen 31",
            inline: true,
          },
          {
            name: "Arliey Januar A.P.M",
            value: "Absen 32",
            inline: true,
          },
          {
            name: "Arsya Fathiha R",
            value: "Absen 33",
            inline: true,
          },
          {
            name: "Arsyad Maulana A",
            value: "Absen 34",
            inline: true,
          }
        )
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        })
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
