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
  name: "loop",
  description: "Enable or disable looping for the song or the entire queue.",
  cooldown: 1,
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

    switch (inter.options._hoistedOptions.map((x) => x.value).toString()) {
      case "enable_loop_queue": {
        if (queue.repeatMode === 1) {
          const embed = new EmbedBuilder()
            .setColor(0xed4245)
            .setTitle("Repeat mode is now enabled!")
            .setFooter({
              text: `XII RPL 1 | Bot by Nakaaaa#8558`,
              iconURL:
                "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
            });

          return interaction.reply({ embeds: [embed] });
        }

        const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(
            success
              ? "Repeat mode **Enabled** the entire playlist will repeat.n (You can end the cycle with '/loop disabled')"
              : "Something went wrong... try again?"
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        return interaction.reply({ embeds: [embed] });
        break;
      }

      case "disable_loop": {
        const success = queue.setRepeatMode(QueueRepeatMode.OFF);

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(
            success
              ? "Repeat mode **Disabled**"
              : "Something went wrong... try again?"
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        return interaction.reply({ embeds: [embed] });
        break;
      }

      case "enable_loop_song": {
        if (queue.repeatMode === 2) {
          const embed = new EmbedBuilder()
            .setColor(0xed4245)
            .setTitle("Repeat mode is now enabled!")
            .setFooter({
              text: `XII RPL 1 | Bot by Nakaaaa#8558`,
              iconURL:
                "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
            });

          return interaction.reply({ embeds: [embed] });
        }

        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(
            success
              ? "Repeat mode **Enabled** the current song will repeat.n (You can end the cycle with '/loop disabled')"
              : "Something went wrong... try again?"
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        return interaction.reply({ embeds: [embed] });
        break;
      }
    }
  },
};
