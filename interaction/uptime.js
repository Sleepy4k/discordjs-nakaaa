const { EmbedBuilder } = require("discord.js");
const { parseDur } = require("../utils/parseDur");

module.exports = {
  name: "uptime",
  description: "Show bot uptime.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const duration = parseDur(client.uptime);

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Uptime")
      .setDescription(`Bot has been online for ${duration}`)
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
