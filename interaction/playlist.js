const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playlist",
  description: "See the playlist.",
  cooldown: 1,
  voiceChannel: true,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
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

    const methods = ["", "🔁", "🔂"];
    const songs = queue.tracks.length;
    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title} | ${track.author} - **${
          track.requestedBy.username
        }**`
    );
    const nextSongs =
      songs > 10
        ? `.. **${songs - 10}** more songs...`
        : `In the list there are **${songs}** songs...`;

    const embed = new EmbedBuilder()
      .setColor("RANDOM")
      .setTitle("Playlist")
      .setDescription(
        `${tracks.slice(0, 10).join("\n")}
${nextSongs}`
      )
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    return interaction.editReply({ embeds: [embed] });
  },
};
