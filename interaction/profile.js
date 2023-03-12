const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "profile",
  description: "Show XII RPL 1 Profile.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("XII RPL 1 Profile")
      .setDescription("Ordanary Profile of XII RPL 1")
      .addFields({
        name: "Angkatan 28",
        value: "2020 - 2023",
        inline: false,
      })
      .addFields(
        {
          name: "Kelas",
          value: "XII RPL 1",
          inline: true,
        },
        {
          name: "Wali Kelas",
          value: "Agustina Dwi N, S.Pd",
          inline: true,
        },
        {
          name: "Jumlah Siswa",
          value: "34",
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
  },
};
