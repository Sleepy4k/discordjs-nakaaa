const { QueryType } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "play",
  description:
    "Plays the specified song from YouTube, Soundcloud, Spotify etc.",
  cooldown: 1,
  options: [
    {
      name: "search",
      description: "Plays and enqueues track(s) of the query provided.",
      type: 3,
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    await interaction.deferReply();

    const song = interaction.options.getString("search");
    const result = await client.player.search(song, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!result || !result.tracks.length) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("No results were found!")
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.editReply({ embeds: [embed] });
    }

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: interaction.channel,
      initialVolume: 75,
      autoSelfDeaf: true,
      leaveOnEnd: false,
      leaveOnEndCooldown: 60000,
      leaveOnStop: false,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 60000,
      spotifyBridge: true,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await client.player.deleteQueue(interaction.guildId);
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Could not join your voice channel!")
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });

      return interaction.editReply({ embeds: [embed] });
    }

    await interaction.editReply({
      content: `Enqueued **${result.tracks[0].title}**`,
    });

    result.playlist
      ? queue.addTracks(result.tracks)
      : queue.addTrack(result.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
