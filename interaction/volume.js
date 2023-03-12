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
  name: "volume",
  description: "Adjust music volume.",
  cooldown: 1,
  options: [
    {
      name: "volume",
      description: "Volume to set.",
      type: 4,
      minValue: 0,
      maxValue: 100,
      required: true,
    },
  ],

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

    const volume = interaction.options.getInteger("volume");

    if (queue.volume === volume) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`Volume is already set to ${volume}!`)
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.reply({ embeds: [embed] });
    }

    const success = queue.setVolume(volume);

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(success ? `Volume set to ${volume}!` : "Something went wrong!")
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    return interaction.reply({ embeds: [embed] });
  },
};
