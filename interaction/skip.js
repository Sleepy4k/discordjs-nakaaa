const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  description: "skip a song.",
  cooldown: 1,
  voiceChannel: true,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Tidak ada musik yang diputar!")
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.reply({ embeds: [embed] });
    }

    const success = queue.skip();

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(
        success ? "Musik telah dilewati!" : "Tidak ada musik yang dilewati!"
      )
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    return interaction.reply({ embeds: [embed] });
  },
};
