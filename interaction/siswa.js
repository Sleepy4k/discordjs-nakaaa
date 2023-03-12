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
  name: "siswa",
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
            name: "A. Fredy Fitriadi M",
            value: "Absen 1",
            inline: true,
          },
          {
            name: "Abid Alauddin",
            value: "Absen 2",
            inline: true,
          },
          {
            name: "Abshar Hifzhudin",
            value: "Absen 3",
            inline: true,
          },
          {
            name: "Achmad Shofiyudin F.A",
            value: "Absen 4",
            inline: true,
          },
          {
            name: "Adam Fadhil S",
            value: "Absen 5",
            inline: true,
          },
          {
            name: "Adam Putra P",
            value: "Absen 6",
            inline: true,
          },
          {
            name: "Aditya Eka R",
            value: "Absen 7",
            inline: true,
          },
          {
            name: "Afridho Nur Z",
            value: "Absen 8",
            inline: true,
          },
          {
            name: "Agung Malik I",
            value: "Absen 9",
            inline: true,
          },
          {
            name: "Ahmad Aufa G.D.S",
            value: "Absen 10",
            inline: true,
          },
          {
            name: "Ahmad Ichsan M",
            value: "Absen 11",
            inline: true,
          },
          {
            name: "Akmal Hikmah T",
            value: "Absen 12",
            inline: true,
          },
          {
            name: "Alben Nugroho",
            value: "Absen 13",
            inline: true,
          },
          {
            name: "Albert Jonathan S",
            value: "Absen 14",
            inline: true,
          },
          {
            name: "Alfath Ashkhabus S",
            value: "Absen 15",
            inline: true,
          },
          {
            name: "Alifa Oty S",
            value: "Absen 16",
            inline: true,
          },
          {
            name: "Alrefa Putri M",
            value: "Absen 17",
            inline: true,
          },
          {
            name: "Alvin Adam M.S",
            value: "Absen 18",
            inline: true,
          },
          {
            name: "Ananda Regita C",
            value: "Absen 19",
            inline: true,
          },
          {
            name: "Anandito Hani S",
            value: "Absen 20",
            inline: true,
          },
          {
            name: "Andika Neviantoro",
            value: "Absen 21",
            inline: true,
          },
          {
            name: "Angger Panji L",
            value: "Absen 22",
            inline: true,
          },
          {
            name: "Anggit Adi P",
            value: "Absen 23",
            inline: true,
          },
          {
            name: "Anggit Refiyan",
            value: "Absen 24",
            inline: true,
          },
          {
            name: "Anisa Az-Zahra",
            value: "Absen 25",
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
