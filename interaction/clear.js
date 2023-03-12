const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear all music in queue.",
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
        .setColor("RED")
        .setTitle("Tidak ada musik yang diputar!")
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.editReply({ embeds: [embed] });
    }

    if (!queue.tracks[0]) {
      const embed = new EmbedBuilder()
        .setColor("RED")
        .setTitle("Tidak ada musik yang diputar!")
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.editReply({ embeds: [embed] });
    }

    await queue.clear();

    const embed = new EmbedBuilder()
      .setColor("RANDOM")
      .setTitle("Play queue has just been cleared!")
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    return interaction.editReply({ embeds: [embed] });
  },
};
