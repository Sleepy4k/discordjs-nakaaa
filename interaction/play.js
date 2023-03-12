const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "play",
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription(
      "Plays the specified song from YouTube, Soundcloud, Spotify etc."
    )
    .addStringOption((options) =>
      options
        .setName("search")
        .setRequired(true)
        .setDescription("Plays and enqueues track(s) of the query provided.")
    ),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const channel = interaction.member.voice.channel;
    if (!channel)
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
    const query = interaction.options.getString("search", true); // we need input/query to play
    const results = await client.player.search(query);

    if (!results.hasTracks())
      return interaction.reply("No tracks were found for your query");

    await interaction.deferReply();
    await interaction.editReply({
      content: `⏳ | Loading ${
        results.playlist ? "a playlist..." : "a track..."
      }`,
    });

    try {
      const { track } = await client.player.play(channel, results, {
        nodeOptions: {
          metadata: {
            channel: interaction.channel,
            client: interaction.guild.members.me,
            requestedBy: interaction.user,
          },
          skipOnNoStream: true,
          selfDeaf: true,
          volume: 100,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300000,
        },
      });
      await interaction.editReply({
        content: `Successfully enqueued${
          track.playlist
            ? ` **multiple tracks** from: **${track.playlist.title}**`
            : `: **${track.title}**`
        }`,
      });
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
